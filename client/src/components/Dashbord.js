import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import QuestionsList from "./QuestionsList";
import Admin from "./Admin";

function Dashboard() {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidebar />
        <div className='layout-page'>
          <Navbar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/questions" element={<QuestionsList />} />
              <Route path="/admin" element={<Admin />} />
              {/* Add other routes here */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
