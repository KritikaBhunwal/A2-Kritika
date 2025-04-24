import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

/**
 * SignIn — login form for existing users.
 *
 * Features:
 * - Fields: email, password
 * - Client-side validation: HTML5 required + email format
 * - Calls backend POST /api/users/sign-in
 * - On success: saves JWT via AuthContext and redirects to /products
 * - Displays error message on failure
 */
export default function SignIn() {
  // Controlled inputs for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Local error message state
  const [error, setError] = useState('');

  // AuthContext provides `login()` to store the JWT token
  const { login } = useContext(AuthContext);
  // useNavigate for redirecting after successful login
  const navigate = useNavigate();

  /**
   * Handles form submission:
   * 1. Prevent default form action.
   * 2. Clear any existing error.
   * 3. Send credentials to the server.
   * 4. On success, store token and redirect.
   * 5. On failure, display error message.
   */
  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const res = await api.post('/users/sign-in', {
        email,
        password
      });
      // Save the JWT (and persist to localStorage via context)
      login(res.data.token);
      // Redirect to protected product list
      navigate('/products');
    } catch (err) {
      // Show server-side or network errors
      setError(
        err.response?.data?.message ||
        'Login failed. Please check your credentials and try again.'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 p-4"
    >
      {/* Email input with HTML5 email validation */}
      <input
        type="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        placeholder="Email"
        className="input"
      />
      <br></br>

      {/* Password input */}
      <input
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        placeholder="Password"
        className="input"
      />

      {/* Display any error messages */}
      {error && (
        <p className="text-red-600" role="alert">
          {error}
        </p>
      )}
      <br></br>
      {/* Submit button */}
      <button type="submit" className="btn-primary">
        Log In
      </button>
    </form>
  );
}
