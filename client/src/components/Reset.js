import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../assets/css/argon-dashboard.css';
import { RecoveryContext } from "./App";

const Reset = () => {
  const { setPage, email } = useContext(RecoveryContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      
      console.log('newpassword', password);
      console.log('email', email);

      console.log(response.data);
      setPage("recovered");
      navigate('/recovered'); // Navigate to recovered after successful reset
    } catch (error) {
      console.error('Error resetting password:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'An error occurred while resetting the password.');
    } finally {
      setLoading(false);
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
                    <h4 className="font-weight-bolder">Change Password</h4>
                    <p className="mb-0">Enter your new password below</p>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handlePasswordReset}>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="New Password"
                          aria-label="New Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Confirm Password"
                          aria-label="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      {error && <div className="alert alert-danger">{error}</div>}
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-lg btn-primary w-100 mt-4 mb-0"
                          disabled={loading}
                        >
                          {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                      </div>
                    </form>
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

export default Reset;
