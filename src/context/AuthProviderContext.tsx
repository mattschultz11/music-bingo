import { useSessionStorage } from "@uidotdev/usehooks";
import { HashMap, Option, Predicate } from "effect";
import { PropsWithChildren, createContext, useMemo } from "react";

import {
  AUTH_STORAGE_KEYS,
  AuthProviderContextType,
  AuthToken,
} from "../types/auth";

import { AUTH_PROVIDERS_BY_ID } from "../config/providers.config";

const AuthProviderContext = createContext<AuthProviderContextType>({
  provider: Option.none(),
});

function AuthProviderProvider(props: PropsWithChildren) {
  const { children } = props;

  const [storedToken] = useSessionStorage<AuthToken | undefined>(
    AUTH_STORAGE_KEYS.AUTH_TOKEN,
    undefined,
  );

  const provider = useMemo(() => {
    return Predicate.isNotNullable(storedToken?.providerId)
      ? HashMap.get(AUTH_PROVIDERS_BY_ID, storedToken?.providerId)
      : Option.none();
  }, [storedToken?.providerId]);

  const value = {
    provider,
  };

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export { AuthProviderContext, AuthProviderProvider };
