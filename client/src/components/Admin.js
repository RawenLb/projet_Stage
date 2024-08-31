import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCog, faBell, faQuestionCircle,faExclamationTriangle,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../assets/css/nucleo-icons.css';
import '../assets/css/nucleo-svg.css';
import '../assets/css/argon-dashboard.css?v=2.0.4';
import logo from '../assets/img/logo.png'; // Import the logo
import logoutIcon from '../assets/img/logout.png'; // Import the logout icon
import Swal from 'sweetalert2'; // Import SweetAlert2
const Admin = () => {
    const [questionText, setQuestionText] = useState('');
    const [answerOptions, setAnswerOptions] = useState(['']);
    const navigate = useNavigate();

    const handleOptionChange = (index, event) => {
        const newOptions = [...answerOptions];
        newOptions[index] = event.target.value;
        setAnswerOptions(newOptions);
    };

    const handleAddOption = () => {
        setAnswerOptions([...answerOptions, '']);
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out and redirected to the login page.",
            imageUrl: logoutIcon, // Use the custom logout icon
            imageWidth: 50, // Adjust the size as needed
            imageHeight: 50,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('authToken'); // Adjust as needed
                navigate('/'); // Ensure this matches your route setup
            }
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/questions', {
                question: questionText,
                options: answerOptions,
            });

            // Display success alert
            alert('Question added successfully!');

            // Redirect to the list of questions
            navigate('/questions');

        } catch (error) {
            console.error(error);
            alert('Failed to add the question. Please try again.');
        }
    };

    return (
        <div className="g-sidenav-show bg-gray-100">
                    <div className="min-height-300 bg-primary position-absolute w-100"></div>

            {/* Sidebar */}
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
                            <Link className="nav-link" to="/user">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="ni ni-single-02 text-dark text-sm opacity-10"></i>
                                </div>
                                <span>Users</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reclamations">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-danger text-sm opacity-10" />
                                </div>
                                <span>Reclamations</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Navbar */}
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
                            <h6 className="font-weight-bolder text-white mb-0">Add Question</h6>
                        </nav>
                        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                            <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                <div className="input-group">
                                    <span className="input-group-text text-body"><FontAwesomeIcon icon={faSearch} /></span>
                                    <input type="text" className="form-control" placeholder="Type here..." />
                                </div>
                            </div>
                            <ul className="navbar-nav justify-content-end">
                                <li className="nav-item d-flex align-items-center">
                                <button className="btn btn-link text-white font-weight-bold px-0" onClick={handleLogout}>
    <FontAwesomeIcon icon={faSignOutAlt} className="me-sm-1" />
    <span className="d-sm-inline d-none">Logout</span>
</button>
                                </li>
                               
                                
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="container-fluid py-4">
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body p-3">
                                    <h4 className="header">Add Question</h4>
                                    <div className="card">
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="question">Question:</label>
                                                    <input
                                                        type="text"
                                                        id="question"
                                                        value={questionText}
                                                        onChange={(e) => setQuestionText(e.target.value)}
                                                        className="form-control"
                                                    />
                                                </div>
                                                {answerOptions.map((option, index) => (
                                                    <div key={index} className="form-group">
                                                        <label htmlFor={`option-${index}`}>
                                                            Option {index + 1}:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id={`option-${index}`}
                                                            value={option}
                                                            onChange={(e) => handleOptionChange(index, e)}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={handleAddOption}
                                                    className="btn btn-secondary"
                                                >
                                                    Add Option
                                                </button>
                                                <hr />
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                >
                                                    Submit
                                                </button>
                                            </form>
                                        </div>
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

export default Admin;
