import { useSessionStorage } from "@uidotdev/usehooks";
import { DateTime, Option, Predicate } from "effect";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router";

import {
  AUTH_STORAGE_KEYS,
  AuthProviderConfig,
  AuthToken,
  SessionContextType,
} from "../types/auth";

import { AuthService } from "../services/auth.service";

const SessionContext = createContext<SessionContextType>({
  isAuthenticated: false,
  token: Option.none(),
  login: () => Promise.resolve(),
  logout: () => {},
  handleCallback: () => Promise.resolve(),
});

function SessionProvider(props: PropsWithChildren) {
  const { children } = props;

  const navigate = useNavigate();

  const [storedToken, setStoredToken] = useSessionStorage<
    AuthToken | undefined
  >(AUTH_STORAGE_KEYS.AUTH_TOKEN, undefined);

  const token = useMemo(() => Option.fromNullable(storedToken), [storedToken]);
  const isAuthenticated = Option.isSome(token);

  const loginWithSelectedProvider = useCallback(
    (provider: AuthProviderConfig) =>
      new AuthService(provider).generateUrl().then((authUrl) => {
        window.location.href = authUrl;
      }),
    [],
  );

  const handleCallback = useCallback(
    (
      provider: AuthProviderConfig,
      params: {
        code: string | null;
        state: string | null;
        error: string | null;
      },
    ) => {
      const { code, state, error } = params;
      if (Predicate.isNotNullable(error)) {
        return Promise.reject(error);
      } else if (Predicate.isNullable(code) || Predicate.isNullable(state)) {
        return Promise.reject("Invalid auth state");
      }

      return new AuthService(provider)
        .exchangeCodeForToken(code, state)
        .then((token) => {
          setStoredToken(token);
        });
    },
    [setStoredToken],
  );

  const login = useCallback(
    (provider: AuthProviderConfig) => {
      setStoredToken(undefined);
      return loginWithSelectedProvider(provider);
    },
    [loginWithSelectedProvider, setStoredToken],
  );

  const logout = useCallback(() => {
    setStoredToken(undefined);
  }, [setStoredToken]);

  // Check if token expired
  useEffect(() => {
    if (
      storedToken &&
      storedToken.expiresAt <= DateTime.unsafeNow().epochMillis
    ) {
      logout();
    }
  }, [logout, navigate, setStoredToken, storedToken]);

  const value = {
    isAuthenticated,
    token,
    login,
    logout,
    handleCallback,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export { SessionContext, SessionProvider };
