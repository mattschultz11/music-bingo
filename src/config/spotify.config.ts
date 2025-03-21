import { IconBrandSpotifyFilled } from "@tabler/icons-react";

import { AuthProviderConfig } from "../types/auth";

const SpotifyConfig: AuthProviderConfig = {
  id: "spotify",
  name: "Spotify",
  color: "green",
  icon: IconBrandSpotifyFilled,
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  redirectUri: `${window.location.origin}${import.meta.env.BASE_URL}callback/spotify`,
  authEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
  scopes: ["playlist-read-private", "playlist-read-collaborative"],
} as const;

export { SpotifyConfig };
