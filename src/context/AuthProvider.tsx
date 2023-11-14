import { createContext, useState, ReactNode } from 'react';

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
  const [auth, setAuth] = useState<AuthData>({
    user: null,
    role: 1573,
    token: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
};

export {};