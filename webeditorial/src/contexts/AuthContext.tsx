import React, { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
interface User {
  email: string;
  name: string;
  role: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (data: Partial<User>) => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  const login = async (email: string, password: string) => {
    if (email === 'admin@editorial.com' && password === 'admin123') {
      const userData: User = {
        email,
        name: 'Administrador',
        role: 'admin'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/');
    } else {
      throw new Error('Credenciales inválidas');
    }
  };
  const updateProfile = async (data: Partial<User>) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...data
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };
  return <AuthContext.Provider value={{
    user,
    login,
    logout,
    isAuthenticated: !!user,
    updateProfile
  }}>
      {children}
    </AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}