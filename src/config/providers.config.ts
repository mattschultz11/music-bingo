import { HashMap } from "effect";

import { SpotifyConfig } from "./spotify.config";

const AUTH_PROVIDERS = [SpotifyConfig] as const;

const AUTH_PROVIDERS_BY_ID = HashMap.fromIterable(
  AUTH_PROVIDERS.map((config) => [config.id, config]),
);

export { AUTH_PROVIDERS, AUTH_PROVIDERS_BY_ID };
