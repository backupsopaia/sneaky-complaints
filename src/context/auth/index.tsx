import React, { createContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'super_admin';
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('@SneakyComplaints:user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredData = () => {
      const storedUser = localStorage.getItem('@SneakyComplaints:user');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    };

    loadStoredData();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Em produção, aqui seria feita uma chamada à API
      const mockUser: User = {
        id: '1',
        name: 'Super Admin',
        email,
        role: 'super_admin'
      };

      localStorage.setItem('@SneakyComplaints:user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Erro ao fazer login');
    }
  };

  const signOut = () => {
    localStorage.removeItem('@SneakyComplaints:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isSuperAdmin: user?.role === 'super_admin',
        isAdmin: user?.role === 'admin' || user?.role === 'super_admin',
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
