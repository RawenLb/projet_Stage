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
      <section className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto text-center">
              <div className="card card-plain">
                <div className="card-header pb-0 text-start">
                  <h2 className="font-weight-bolder">Password Successfully Reset</h2>
                  <p className="mb-4">Your password has been updated successfully. You can now log in with your new password.</p>
                </div>
                <div className="card-body">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="Success"
                    className="img-fluid mb-4"
                    style={{ maxWidth: '300px', height: 'auto' }}
                  />
                  <h3 className="mt-4 mb-3">Welcome Back!</h3>
                  <p>We're glad to have you back. If you encounter any issues, feel free to contact support.</p>
                  <button
                    onClick={handleLoginRedirect}
                    className="btn btn-lg btn-primary mt-4"
                  >
                    Go to Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Recovered;
