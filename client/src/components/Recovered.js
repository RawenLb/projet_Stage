import React from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/argon-dashboard.css'; // Assurez-vous d'avoir les styles nécessaires

const Recovered = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/'); // Redirection vers la page de connexion
  };

  return (
    <main className="main-content mt-0">
      <section className="d-flex justify-content-center align-items-center min-vh-100 bg-image">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <h1 className="text-white font-weight-bolder mb-4">Password Successfully Reset</h1>
              <p className="text-white mb-4">Your password has been updated successfully. You can now log in with your new password.</p>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                alt="Success"
                className="img-fluid mb-4"
                style={{ maxWidth: '300px', height: 'auto' }}
              />
              <h3 className="text-white mb-3">Welcome Back!</h3>
              <p className="text-white mb-4">We're glad to have you back. If you encounter any issues, feel free to contact support.</p>
              <button
                onClick={handleLoginRedirect}
                className="btn btn-lg btn-primary mt-4"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        .bg-image {
          background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          height: 100vh;
        }
      `}</style>
    </main>
  );
};

export default Recovered;
