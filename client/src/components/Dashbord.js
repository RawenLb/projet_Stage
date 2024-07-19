import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Dashbord() {
  return (
    <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
      <Sidebar />
      <div className='layout-page'>
        <Navbar />
        </div>  
    </div>
    </div>
  );
}
export default Dashbord;