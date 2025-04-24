// web/src/context/AuthContext.jsx
import { createContext, useState } from 'react';

export const AuthContext = createContext();

/**
 * AuthProvider — wraps your app and
 * • holds the JWT token in state (and localStorage)
 * • exposes login(token) & logout() methods
 */
export function AuthProvider({ children }) {
  // read any existing token from localStorage
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = jwt => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// This code creates an authentication context using React's Context API. It provides a way to manage the authentication state (token) and offers login and logout functions. The token is stored in local storage, allowing it to persist across page reloads. The `AuthProvider` component wraps around the application, making the authentication state accessible to all components within it.