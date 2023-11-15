import { createContext, useState, ReactNode } from 'react';
import useToken from '../hooks/useToken';

interface AuthData {
  user: string | null;
  role: number;
  token: string | null;
};

interface AuthContextProps {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
};

export const AuthContext = createContext<AuthContextProps>({
  auth: {
    user: null,
    role: 1573,
    token: null,
  },
  setAuth: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { decryptToken } = useToken();

  const [auth, setAuth] = useState<AuthData>(decryptToken);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export {};