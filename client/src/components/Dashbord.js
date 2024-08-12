import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../assets/css/nucleo-icons.css';
import '../assets/css/nucleo-svg.css';
import '../assets/css/argon-dashboard.css?v=2.0.4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCog, faBell, faQuestion } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/img/logo.png'; // Import the logo


const Dashboard = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/feedback/stats')
      .then((response) => response.json())
      .then((data) => {
        const labels = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];
        const counts = labels.map((label) => {
          const rating = parseInt(label.split(' ')[0], 10);
          const ratingData = data.find((r) => r._id === rating);
          return ratingData ? ratingData.count : 0;
        });
        setChartData({
          labels,
          datasets: [
            {
              label: 'Number of Ratings',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error('Error fetching ratings stats:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/total-users')
      .then((response) => response.json())
      .then((data) => setTotalUsers(data.totalUsers))
      .catch((error) => console.error('Error fetching total users:', error));

    fetch('http://localhost:5000/api/total-questions')
      .then((response) => response.json())
      .then((data) => setTotalQuestions(data.totalQuestions))
      .catch((error) => console.error('Error fetching total questions:', error));
  }, []);

  return (
    <div className="g-sidenav-show bg-gray-100">
      <div className="min-height-300 bg-primary position-absolute w-100"></div>

      <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4">
      <div className="sidenav-header">
     
        <img src={logo} alt="Logo" className="navbar-brand-img logo-custom" /> 
        </div>
        <hr className="horizontal dark mt-0" />
        <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/dash">
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                </div>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/questions">
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
                </div>
                <span>Questions</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="ni ni-calendar-grid-58 text-danger text-sm opacity-10"></i>
                </div>
                <span>Add Questions</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/results">
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="ni ni-single-02 text-dark text-sm opacity-10"></i>
                </div>
                <span>Users</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <main className="main-content position-relative border-radius-lg">
        <div className="min-height-300 bg-primary position-absolute w-100"></div>

        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          data-scroll="false"
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <h6 className="font-weight-bolder text-white mb-0">Dashboard</h6>
            </nav>
            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <div className="input-group">
                  <span className="input-group-text text-body">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                  <input type="text" className="form-control" placeholder="Type here..." />
                </div>
              </div>
              <ul className="navbar-nav justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <a href="#" className="nav-link text-white font-weight-bold px-0">
                    <FontAwesomeIcon icon={faUser} className="me-sm-1" />
                    <span className="d-sm-inline d-none">Sign In</span>
                  </a>
                </li>
                <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                  <a href="#" className="nav-link text-white p-0" id="iconNavbarSidenav">
                    <div className="sidenav-toggler-inner">
                      <div className="sidenav-toggler-line bg-white"></div>
                      <div className="sidenav-toggler-line bg-white"></div>
                      <div className="sidenav-toggler-line bg-white"></div>
                    </div>
                  </a>
                </li>
                <li className="nav-item px-3 d-flex align-items-center">
                  <a href="#" className="nav-link text-white p-0">
                    <FontAwesomeIcon icon={faCog} className="fixed-plugin-button-nav cursor-pointer" />
                  </a>
                </li>
                <li className="nav-item dropdown pe-2 d-flex align-items-center">
                  <a
                    href="#"
                    className="nav-link text-white p-0"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faBell} className="cursor-pointer" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid py-4">
          <div className="row">
            {/* Card for Total Questions */}
            <div className="col-xl-3 col-sm-6 mb-4">
              <div className="card" style={{ padding: '20px', fontSize: '18px' }}>
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-uppercase font-weight-bold">Total Questions</p>
                        <h5 className="font-weight-bolder">{totalQuestions}</h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-info shadow-primary text-center rounded-circle">
                        <FontAwesomeIcon icon={faQuestion} className="text-white text-lg opacity-10" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card for Total Users */}
            <div className="col-xl-3 col-sm-6 mb-4">
              <div className="card" style={{ padding: '20px', fontSize: '18px' }}>
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-uppercase font-weight-bold">Total Users</p>
                        <h5 className="font-weight-bolder">{totalUsers}</h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                        <FontAwesomeIcon icon={faUser} className="text-white text-lg opacity-10" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-7 mb-lg-0 mb-4">
              <div className="card">
                <div className="card-header pb-0">
                  <h6>Feedback Ratings</h6>
                </div>
                <div className="card-body p-3">
                  <div className="chart">
                    <Bar data={chartData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default Dashboard;
