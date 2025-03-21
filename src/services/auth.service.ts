import axios, { AxiosResponse } from "axios";
import { DateTime } from "effect";

import { AuthProviderConfig, SessionTokenResponse } from "../types/auth";

class AuthService {
  private readonly CLIENT_ID: string;
  private readonly REDIRECT_URI: string;
  private readonly AUTH_ENDPOINT: string;
  private readonly TOKEN_ENDPOINT: string;
  private readonly SCOPES: string[];
  private readonly PROVIDER_ID: string;

  constructor(config: AuthProviderConfig) {
    this.PROVIDER_ID = config.id;
    this.CLIENT_ID = config.clientId;
    this.REDIRECT_URI = config.redirectUri;
    this.AUTH_ENDPOINT = config.authEndpoint;
    this.TOKEN_ENDPOINT = config.tokenEndpoint;
    this.SCOPES = config.scopes;
  }

  // Generate a random string for the state parameter
  private generateRandomState() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      "",
    );
  }

  // Generate a random code verifier
  private generateCodeVerifier() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return this.base64URLEncode(array);
  }

  // Create code challenge from verifier
  private async generateCodeChallenge(codeVerifier: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return this.base64URLEncode(new Uint8Array(digest));
  }

  // Generate PKCE code pair
  private async generatePKCEPair() {
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    return { codeVerifier, codeChallenge };
  }

  // Base64URL encode an array buffer
  private base64URLEncode(buffer: ArrayBuffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  // Create the authorization URL
  private createAuthUrl(codeChallenge: string, state: string) {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      response_type: "code",
      redirect_uri: this.REDIRECT_URI,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      state: `${state}`,
      scope: this.SCOPES.join(" "),
    });

    return `${this.AUTH_ENDPOINT}?${params.toString()}`;
  }

  private parseSessionTokenResponse(
    response: AxiosResponse<SessionTokenResponse>,
  ) {
    const { access_token: accessToken, expires_in: expiresIn } = response.data;
    const expiresAt = DateTime.unsafeNow().pipe(
      DateTime.add({
        seconds: expiresIn,
      }),
    ).epochMillis;

    return {
      providerId: this.PROVIDER_ID,
      accessToken,
      expiresAt,
    };
  }

  private setCodeVerifier(codeVerifier: string) {
    localStorage.setItem("codeVerifier", codeVerifier);
  }

  private getCodeVerifier() {
    const codeVerifier = localStorage.getItem("codeVerifier");
    if (codeVerifier === null) {
      throw new Error("Code verifier is undefined");
    }
    return codeVerifier;
  }

  private setState(state: string) {
    localStorage.setItem("state", state);
  }

  private getState() {
    return localStorage.getItem("state");
  }

  async generateUrl() {
    const { codeVerifier, codeChallenge } = await this.generatePKCEPair();
    this.setCodeVerifier(codeVerifier);
    const state = this.generateRandomState();
    this.setState(state);

    return this.createAuthUrl(codeChallenge, state);
  }

  // Exchange code for token
  async exchangeCodeForToken(code: string, state: string) {
    if (state !== this.getState()) {
      throw new Error("Invalid state");
    }

    const data = new URLSearchParams({
      client_id: this.CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: this.REDIRECT_URI,
      code_verifier: this.getCodeVerifier(),
    });

    const response = await axios.post<SessionTokenResponse>(
      this.TOKEN_ENDPOINT,
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );

    return this.parseSessionTokenResponse(response);
  }
}

export { AuthService };
