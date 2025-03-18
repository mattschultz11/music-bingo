import { Option } from "effect";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  isAuthenticated: Option.Option<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: Option.none(),
  logout: () => {},
});

function AuthProvider(props: PropsWithChildren) {
  const { children } = props;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      const timeout = setTimeout(() => {
        setIsAuthenticated(true);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: Option.fromNullable(isAuthenticated), logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
