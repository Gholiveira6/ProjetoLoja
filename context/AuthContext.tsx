import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [email, setEmail] = useState<string | null>(null);

  const login = (email: string) => setEmail(email);
  const logout = () => setEmail(null);

  return (
    <AuthContext.Provider value={{ email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
