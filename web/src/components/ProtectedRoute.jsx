import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext); // Check for token

  if (!token) {
    return <Navigate to="/sign-in" />; // Redirect to sign-in if not authenticated
  }

  return children; // Render the protected component
}
