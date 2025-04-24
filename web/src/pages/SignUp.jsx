import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

/**
 * SignUp — registration form for new users.
 *
 * Features:
 * - Fields: email, password, confirm password
 * - Client-side validation: password match, HTML5 email + minLength
 * - Calls backend:
 *     POST /api/users         → create new account
 *     POST /api/users/sign-in → obtain JWT
 * - On success: saves token via AuthContext and redirects to /products
 */
export default function SignUp() {
  // Controlled inputs for email, password, and confirmation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Local error message state
  const [error, setError] = useState('');

  // AuthContext provides `login()` to store the JWT
  const { login } = useContext(AuthContext);
  // useNavigate for post-signup redirect
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); // clear previous errors

    // Client-side: ensure passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // 1) Register new user
      await api.post('/users', { email, password });

      // 2) Immediately log them in to get a JWT
      const res = await api.post('/users/sign-in', { email, password });

      // 3) Save token in context (and localStorage via context)
      login(res.data.token);

      // 4) Redirect to protected product list
      navigate('/products');
    } catch (err) {
      // Display server-side validation or other errors
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 p-4"
    >
      {/* Email (HTML5 email validation) */}
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
      {/* Password (minLength enforces >=8 chars) */}
      <input
        type="password"
        name="password"
        minLength={8}
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        placeholder="Password (min 8 chars)"
        className="input"
      />
      <br></br>
      {/* Confirm Password */}
      <input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
        placeholder="Confirm Password"
        className="input"
      />
      <br></br>
      {/* Error feedback */}
      {error && (
        <p className="text-red-600" role="alert">
          {error}
        </p>
      )}

      {/* Submit button */}
      <button type="submit" className="btn-primary">
        Sign Up
      </button>
    </form>
  );
}
