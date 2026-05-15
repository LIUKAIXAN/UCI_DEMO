import React, { createContext, useContext, useState } from 'react';

type Role = 'User' | 'Admin';
type Language = 'en' | 'zh';

interface AppState {
  role: Role;
  language: Language;
  setRole: (role: Role) => void;
  setLanguage: (lang: Language) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('User');
  const [language, setLanguage] = useState<Language>('en');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Changed to false to show Login first

  return (
    <AppContext.Provider value={{ role, language, setRole, setLanguage, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
