import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    
    // Navigate to /main after successful login
    navigate('/main');
  };

  return (
    <div className="loginBody">
      <div className="login-container">
        <div className="login-box">
          <div className="logo">
            <img src="logo.png" alt="Logo" />
          </div>
          <h2 className="mb-2">Welcome to NAME 👋</h2>
          <p>Please sign in to your account and start the adventure</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email or Username</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email or username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="options">
              <label>
                <input type="checkbox" name="remember-me" /> Remember Me
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="btn btn-primary d-grid w-100">
              Sign in
            </button>
            <p className="signup-link">
              New on our platform? <a href="#">Create an account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;