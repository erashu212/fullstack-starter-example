import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import Button from "src/components/Button";

type Context = {
  isAuthenticated: Boolean;
  handleAuthentication: (token?: string) => void;
};

export const AuthContext = createContext<Context>({
  isAuthenticated: false,
  handleAuthentication: () => {},
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("user_auth_token")
  );

  const handleAuthentication = useCallback((token?: string) => {
    sessionStorage.setItem("user_auth_token", token as string);
    setIsAuthenticated((prevAuth) => !prevAuth);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
