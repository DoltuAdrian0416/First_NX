import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext<
  | {
      token: string | null;
      setToken: (token: string) => void;
      removeToken: () => void;
    }
  | undefined
>(undefined);

export function AuthProvider({ children }: any) {
  const [loggedUser, setLoggedUser] = useState<ImageBitmap>();
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem('token')
  );
  const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // const setToken = (newToken: string | null) => {
  //   setToken_(newToken);
  // };

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
      removeToken: () => {
        removeToken();
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
