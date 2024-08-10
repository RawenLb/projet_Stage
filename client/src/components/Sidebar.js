import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard, MdQuestionAnswer, MdAddCircle, MdAssessment } from 'react-icons/md';

const Sidebar = () => {
  const [pulse, setPulse] = useState(false);

  return (
<aside className="sidenav">
  <div className="sidenav-header">
    <img src="../../public/admin/img/logoo.jpg" alt="Logo" className="logo" />
    <h1 className="brand-name">Name</h1>
  </div>
  <hr />
  <ul className="navbar-nav">
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
  </ul>
</aside>
  );
};

export default Sidebar;
