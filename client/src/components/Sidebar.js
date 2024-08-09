import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard, MdQuestionAnswer, MdAddCircle, MdAssessment } from 'react-icons/md';
import '../styles/Dashboard.css'; // Ensure this path matches your actual file

const Sidebar = () => {
  const [pulse, setPulse] = useState(false);

  return (
    <aside className="sidenav">
      <div className="sidenav-header">
    

      </div>
      <hr />
      <div className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" to="/dash">
            <div className={`icon ${pulse ? 'pulse' : ''}`}>
              <MdDashboard className="animated-icon" />
            </div>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin">
            <div className={`icon ${pulse ? 'pulse' : ''}`}>
              <MdAddCircle className="animated-icon" />
            </div>
            <span>Add Questions</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/questions">
            <div className={`icon ${pulse ? 'pulse' : ''}`}>
              <MdQuestionAnswer className="animated-icon" />
            </div>
            <span>Questions</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/results">
            <div className={`icon ${pulse ? 'pulse' : ''}`}>
              <MdAssessment className="animated-icon" />
            </div>
            <span>Users</span>
          </Link>
        </li>
      </div>
    </aside>
  );
};

export default Sidebar;
