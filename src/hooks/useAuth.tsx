import React, { createContext, useContext, useEffect, useState } from 'react';
import { RefreshResponse } from 'src/types/Responses';
import { fetchData } from '@utils/fetchData';
import { isTokenExpired } from '@utils/isTokenExpired';

interface AuthContextType {
  token: string | null;
  authLoading: boolean;
  initial: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setInitial: React.Dispatch<React.SetStateAction<string | null>>;
  signout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [initial, setInitial] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUserState() {
      const storedToken = localStorage.getItem('token');
      const storedInitial = localStorage.getItem('initial');

      if (storedToken && isTokenExpired(storedToken)) {
        const newToken = await refreshToken();
        if (!newToken) signout();
      } else {
        setToken(storedToken);
        setInitial(storedInitial);
      }
      setAuthLoading(false);
    }

    void loadUserState();
  }, []);

  async function refreshToken(): Promise<string | null> {
    const reqOptions = {
      method: 'POST',
    };

    try {
      const data = (await fetchData(
        `${process.env.ENDPOINT}/user/refresh`,
        reqOptions
      )) as RefreshResponse;

      const newToken = data.token;

      if (newToken) {
        localStorage.setItem('token', newToken);
        setToken(newToken);

        setInitial((data.user?.username.split('')[0] as string) || initial);
        return newToken;
      }
    } catch (err) {
      return null;
    }
  }

  function signout() {
    localStorage.removeItem('token');
    localStorage.removeItem('initial');
    setToken(null);
    setInitial(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, setToken, initial, setInitial, authLoading, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
