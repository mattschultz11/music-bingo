import { ButtonProps } from "@radix-ui/themes";
import { IconProps } from "@tabler/icons-react";
import { Option } from "effect";
import { FC } from "react";

interface AuthToken {
  providerId: string;
  accessToken: string;
  expiresAt: number;
}

interface SessionContextType {
  login: (provider: AuthProviderConfig) => Promise<void>;
  logout: () => void;
  handleCallback: (
    provider: AuthProviderConfig,
    params: {
      code: string | null;
      state: string | null;
      error: string | null;
    },
  ) => Promise<void>;
  isAuthenticated: boolean;
  token: Option.Option<AuthToken>;
}

interface PKCECodePair {
  codeVerifier: string;
  codeChallenge: string;
}

interface SessionTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

const AUTH_STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
};

type AuthProviderContextType = {
  provider: Option.Option<AuthProviderConfig>;
};

type AuthProviderConfig = {
  id: string;
  name: string;
  color: ButtonProps["color"];
  icon: FC<IconProps>;
  clientId: string;
  redirectUri: string;
  authEndpoint: string;
  tokenEndpoint: string;
  scopes: string[];
};

export { AUTH_STORAGE_KEYS };
export type {
  AuthToken,
  SessionContextType,
  PKCECodePair,
  SessionTokenResponse,
  AuthProviderConfig,
  AuthProviderContextType,
};
