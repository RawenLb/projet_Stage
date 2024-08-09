import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import QuestionsList from './QuestionsList';
import Admin from './Admin';
import '../styles/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Dashboard() {
  const [ratingsData, setRatingsData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [showOfferBar, setShowOfferBar] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/feedback/stats')
      .then(response => response.json())
      .then(data => {
        setRatingsData(data);
        const labels = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];
        const counts = labels.map(label => {
          const rating = parseInt(label.split(' ')[0], 10);
          const ratingData = data.find(r => r._id === rating);
          return ratingData ? ratingData.count : 0;
        });
        setChartData({
          labels,
          datasets: [{
            label: 'Number of Ratings',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        });
      })
      .catch(error => console.error('Error fetching ratings stats:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/total-users')
        .then(response => response.json())
        .then(data => setTotalUsers(data.totalUsers))
        .catch(error => console.error('Error fetching total users:', error));

    fetch('http://localhost:5000/api/total-questions')
        .then(response => response.json())
        .then(data => setTotalQuestions(data.totalQuestions))
        .catch(error => console.error('Error fetching total questions:', error));
  }, []);

  const closeOfferBar = () => {
    setShowOfferBar(false);
    document.cookie = "view_offer_bar=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
  };

  useEffect(() => {
    const hasViewedOffer = document.cookie.includes("view_offer_bar=true");
    if (hasViewedOffer) {
      setShowOfferBar(false);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="content-section">
          <Routes>
            <Route path="/questions" element={<QuestionsList />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>

          <div className="container mt-4">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    Total Users
                  </div>
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <h5 className="font-weight-bolder">{totalUsers}</h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon text-center">
                          <i className="fas fa-users animated-icon" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    Total Questions
                  </div>
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <h5 className="font-weight-bolder">{totalQuestions}</h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon text-center">
                          <i className="fas fa-question animated-icon" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="statistics mt-4">
            <h2>User Ratings Distribution</h2>
            {chartData && chartData.labels && (
              <div className="chart-container">
                <Bar 
                  data={chartData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                              label += ': ';
                            }
                            if (context.parsed.y !== null) {
                              label += context.parsed.y;
                            }
                            return label;
                          }
                        }
                      }
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        }
                      },
                      y: {
                        grid: {
                          borderColor: '#e0e0e0',
                          borderWidth: 1,
                        },
                        ticks: {
                          beginAtZero: true,
                        }
                      }
                    }
                  }} 
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
