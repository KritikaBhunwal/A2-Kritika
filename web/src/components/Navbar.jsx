// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Navbar — displays site logo and auth links.
 *
 * - When not authenticated (no token): shows both Sign In and Sign Up.
 * - When authenticated (has token): shows Products link and Log Out button.
 */
export default function Navbar() {
  const { token, logout } = useContext(AuthContext); // Use token to check authentication

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Logo always links to home */}
      <Link to="/" className="text-2xl font-bold">
        Scarlet Ross
      </Link>

      {/* Auth/navigation links */}
      <div className="space-x-4 flex items-center">
        {token ? (
          <>
            {/* Once logged in, show Products and Log Out */}
            <Link to="/products" className="hover:text-blue-600">
              Products
            </Link>
            <button
              onClick={logout}
              className="hover:text-red-600"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            {/* When not logged in, show both Sign In and Sign Up */}
            <Link to="/sign-in" className="hover:text-blue-200">
              Sign In
            </Link><br></br>
            <Link to="/sign-up" className="hover:text-blue-200">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
