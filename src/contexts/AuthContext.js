import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function (to be replaced with actual API call)
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // This is a mock implementation
      if (email && password) {
        const user = { id: '123', email };
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    });
  };

  // Mock register function (to be replaced with actual API call)
  const register = (email, password) => {
    return new Promise((resolve, reject) => {
      // This is a mock implementation
      if (email && password) {
        const user = { id: '123', email };
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Registration failed'));
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 