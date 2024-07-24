import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const handleToggleMenu = (e) => {
    e.preventDefault();
    // Logic to toggle the menu
  };

  return (
    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
      <div className="app-brand demo">
        <a href="/quiz" className="app-brand-link">
          <span className="app-brand-logo demo">
            {/* Votre logo ici */}
          </span>
          <span className="app-brand-text demo menu-text fw-bolder ms-2">Dashboard</span>
        </a>
        <button onClick={handleToggleMenu} className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </button>
      </div>
      <div className="menu-inner-shadow"></div>
      <ul className="menu-inner py-1">
        <li className="menu-item">
          <Link to="/questions" className="menu-link">
            <i className="menu-icon tf-icons bx bx-list-ul"></i>
            <div data-i18n="Questions">Questions</div>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/admin" className="menu-link">
            <i className="menu-icon tf-icons bx bx-plus"></i>
            <div data-i18n="Add Question">Add Question</div>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
