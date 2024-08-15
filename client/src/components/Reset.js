import React, { useState, useContext } from "react";
import { RecoveryContext } from "./App";
import axios from 'axios';
import "../styles/reset.css"

export default function Reset() {
  const { setPage ,email } = useContext(RecoveryContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null); // For handling errors
  const [loading, setLoading] = useState(false); // For loading state

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/reset-password', {
        recipient_email: email,
        newPassword: password,
      });
      console.log('newpassword',password);
      console.log('email',email);

      console.log(response.data);
      setPage("recovered");
    } catch (error) {
      console.error('Error resetting password:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'An error occurred while resetting the password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
  <section className="dark-mode">
    <div className="form-box">
      <h2 className="heading">Change Password</h2>
      <form className="form" onSubmit={handlePasswordReset}>
        <div>
          <label for="password" className="label">New Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="input-field"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label for="confirm-password" className="label">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="••••••••"
            className="input-field"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>} {/* Show error message */}
        <div className="checkbox-container">
          <input
            id="terms"
            aria-describedby="terms"
            type="checkbox"
            className="checkbox-input"
            required
          />
          <div className="terms-text">
            <label for="terms">
              I accept the{" "}
              <a className="terms-link" href="#">Terms and Conditions</a>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  </section>
</div>

  );
}
