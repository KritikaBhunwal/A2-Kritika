import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Provides global auth state (token, login, logout)
import { AuthProvider } from './context/AuthContext';
// Wraps protected pages to require a valid JWT
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

/**
 * App — root component
 * - Wrapped in AuthProvider so all children can access auth context.
 * - Navbar will show "Sign In" and "Sign Up" when not authenticated, or "Log Out" when authenticated.
 * - Public routes: Home, Sign Up, Sign In.
 * - Protected routes: ProductList and ProductDetail (require login).
 */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Persistent navigation bar with auth links */}
        <Navbar />

        <Routes>
          {/* Public pages */}
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/sign-up"
            element={<SignUp />}
          />
          <Route
            path="/sign-in"
            element={<SignIn />}
          />

          {/* Protected pages: only visible if logged in */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
