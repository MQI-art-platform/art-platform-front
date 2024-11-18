// SessionContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import SessionManager from './session.manager';

interface SessionContextType {
  isLoggedIn: boolean;
  user: any | null;
  login: (authToken: string, userData: any) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

// SessionProvider Component
export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(SessionManager.isLoggedIn());
  const [user, setUser] = useState<any | null>(SessionManager.getUserData());

  // Function to log in the user
  const login = (authToken: string, userData: any) => {
    SessionManager.saveSession(authToken, userData);
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Function to log out the user
  const logout = () => {
    SessionManager.clearSession();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook to use the session context
export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
