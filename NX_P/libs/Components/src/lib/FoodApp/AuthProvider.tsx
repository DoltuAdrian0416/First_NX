import { User } from '@./Models';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext<
  | {
      user: User | null;
      token: string | null;
      setCredentials: (token: string, user: User) => void;
      removeCredentials: () => void;
    }
  | undefined
>(undefined);

const userLocalStorage = 'user';
const tokenLocalStorage = 'token';

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [user, setUser] = useState<User | null>(() => {
    const localStorageUser = localStorage.getItem('user');
    return localStorageUser ? JSON.parse(localStorageUser) : null;
  });

  useEffect(() => {
    if (token) {
      // const header = new Headers({ Authorization: `${'Bearer ' + token} ` });
      localStorage.setItem(tokenLocalStorage, token);
      return;
    }
    localStorage.removeItem(tokenLocalStorage);
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(userLocalStorage, JSON.stringify(user));
      return;
    }
    localStorage.removeItem(userLocalStorage);
  }, [user]);

  const setCredentials = (token: string, user: User) => {
    setToken(token);
    setUser(user);
  };

  const removeCredentials = () => {
    setToken(null);
    setUser(null);
  };

  const contextValue = useMemo(
    () => ({
      user: user,
      token: token,
      setCredentials,
      removeCredentials,
    }),
    [token, user]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
