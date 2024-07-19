import React from 'react';
// Uncomment and use if you're utilizing React Router for navigation
// import { Link } from 'react-router-dom';

const Navbar = () => {
  // Function to handle menu toggle
  const handleMenuToggle = (e) => {
    e.preventDefault();
    // Implement the toggle functionality here
  };

  return (
 
      <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <button className="nav-item nav-link px-0 me-xl-4" onClick={handleMenuToggle}>
            <i className="bx bx-menu bx-sm"></i>
          </button>
        </div>

        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <i className="bx bx-search fs-4 lh-0"></i>
              <input type="text" className="form-control border-0 shadow-none" placeholder="Search..." aria-label="Search..." />
            </div>
          </div>

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item lh-1 me-3">
              {/* Replace <a> with <Link> if using React Router */}
              <a className="github-button" href="https://github.com/themeselection/sneat-html-admin-template-free" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star themeselection/sneat-html-admin-template-free on GitHub">Star</a>
            </li>

            {/* User dropdown logic here */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a className="nav-link dropdown-toggle hide-arrow" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="avatar avatar-online">
                  <img src="#" alt="User" className="w-px-40 h-auto rounded-circle" />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img src="#" alt="Profile" className="w-px-40 h-auto rounded-circle" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-semibold d-block">John Doe</span>
                        <small className="text-muted">Admin</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-user me-2"></i>
                    <span className="align-middle">My Profile</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-cog me-2"></i>
                    <span className="align-middle">Settings</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <span className="d-flex align-items-center align-middle">
                      <i className="bx bx-credit-card me-2"></i>
                      <span className="align-middle">Billing</span>
                      <span className="badge bg-danger rounded-pill">4</span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                {/* Additional dropdown items */}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    
  );
}

export default Navbar;