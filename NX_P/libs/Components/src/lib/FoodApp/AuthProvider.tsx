import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext<
  | {
      token: string | null;
      setToken: (token: string) => void;
    }
  | undefined
>(undefined);
export function AuthProvider({ children }: any) {
  const [token, setToken_] = useState(localStorage.getItem('token'));

  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      const header = new Headers({ Authorization: `${'Bearer ' + token} ` });
      localStorage.setItem('token', token);
    }
  });

  const contextValue = useMemo(
    () => ({
      token: token,
      setToken: (token: string) => {
        setToken_(token);
      },
    }),
    [token]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;