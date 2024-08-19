import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/argon-dashboard.css';
import { RecoveryContext } from './App'; // Import the context

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setEmail, setPage, setOTP } = useContext(RecoveryContext); // Use the context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });

      // Store JWT token in local storage
      localStorage.setItem('token', response.data.token);
      
      // Navigate to /main after successful login
      navigate('/main');
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  const nagigateToOtp = async () => {
    if (username) { // Assuming username is the email
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);
      setEmail(username); // Set the email in the context

      try {
        await axios.post('http://localhost:5000/send_recovery_email', {
          OTP,
          recipient_email: username,
        });
        setPage('otp'); // Navigate to OTP input page
        navigate('/otp');
      } catch (error) {
        console.error('Error sending recovery email:', error);
      }
    } else {
      alert('Please enter your email');
    }
  };

  return (
    <main className="main-content mt-0">
      <section>
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                <div className="card card-plain">
                  <div className="card-header pb-0 text-start">
                    <h4 className="font-weight-bolder">Sign In</h4>
                    <p className="mb-0">Enter your email and password to sign in</p>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Email or Username"
                          aria-label="Email or Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Password"
                          aria-label="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {error && <div className="alert alert-danger">{error}</div>}
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="rememberMe" />
                        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-lg btn-primary w-100 mt-4 mb-0">Sign In</button>
                      </div>
                    </form>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-4 text-sm mx-auto">
                        Don't have an account? <a href="/signup" className="text-primary text-gradient font-weight-bold">Sign up</a>
                      </p>
                      <p className="mb-0 text-sm mx-auto">
                        <a href="#" onClick={nagigateToOtp} className="text-primary text-gradient font-weight-bold">Forgot Password?</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                  style={{ backgroundImage: 'url(https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg)', backgroundSize: 'cover' }}>
                  <span className="mask bg-gradient-primary opacity-6"></span>
                  <h4 className="mt-5 text-white font-weight-bolder">"Attention is the new currency"</h4>
                  <p className="text-white">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>  
    </main>
  );
};

export default Login;