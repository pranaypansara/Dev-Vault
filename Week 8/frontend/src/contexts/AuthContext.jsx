import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  useEffect(() => {
    if (userToken) {
      localStorage.setItem('userToken', userToken);
    } else {
      localStorage.removeItem('userToken');
    }
  }, [userToken]);

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem('adminToken', adminToken);
    } else {
      localStorage.removeItem('adminToken');
    }
  }, [adminToken]);

  const loginUser = (token) => {
    setAdminToken(null);
    setUserToken(token);
  };

  const loginAdmin = (token) => {
    setUserToken(null);
    setAdminToken(token);
  };

  const logout = () => {
    setUserToken(null);
    setAdminToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        adminToken,
        isUser: !!userToken,
        isAdmin: !!adminToken,
        loginUser,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
