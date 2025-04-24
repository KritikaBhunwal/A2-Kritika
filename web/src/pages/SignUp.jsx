import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

/**
 * SignUp — registration form for new users.
 *
 * Features:
 * - Fields: email, password
 * - Client-side validation: HTML5 required + email format
 * - Calls backend POST /api/users/sign-up
 * - On success: redirects to /sign-in
 * - Displays error message on failure
 */
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      await api.post('/users/sign-up', { email, password });
      // Redirect to sign-in page after successful registration
      navigate('/sign-in');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Registration failed. Please try again.'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 p-4"
    >
      {/* Email input */}
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
        Sign Up
      </button>
    </form>
  );
}