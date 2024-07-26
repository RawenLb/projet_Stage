import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import nécessaire pour Chart.js
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import QuestionsList from "./QuestionsList";
import Admin from "./Admin";
import '../styles/Dashboard.css';

function Dashboard() {
  const [ratingsData, setRatingsData] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/feedback/stats')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
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
          }],
        });
      })
      .catch(error => console.error('Error fetching ratings stats:', error));
  }, []);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidebar />
        <div className="layout-page">
          <Navbar />
          <div className="centered-container">
            <div className="statistics">
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
                      }
                    }} 
                  />
                </div>
              )}
            </div>
            <Routes>
            <Route path="/dash" element={<Dashboard />} />
              <Route path="/questions" element={<QuestionsList />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
