import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCog, faBell } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/nucleo-icons.css';
import '../assets/css/nucleo-svg.css';
import '../assets/css/argon-dashboard.css?v=2.0.4';
import logo from '../assets/img/logo.png'; // Import the logo

const ResultsList = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/result');
                setResults(response.data || []);
            } catch (error) {
                console.error('Error fetching results:', error);
                setResults([]);
            }
        };

        fetchResults();
    }, []);

    const deleteResult = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/result/${id}`);
            setResults(results.filter(result => result._id !== id));
        } catch (error) {
            console.error('Error deleting result:', error);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteResult(id);
                Swal.fire(
                    'Deleted!',
                    'The result has been deleted.',
                    'success'
                );
            }
        });
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

            {/* Navbar */}    <main className="main-content position-relative border-radius-lg">
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
                                    <span className="input-group-text text-body"><FontAwesomeIcon icon={faSearch} /></span>
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
                                    <a href="#" className="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FontAwesomeIcon icon={faBell} className="cursor-pointer" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="container-fluid py-4">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body p-3">
                                    <h4 className="fw-bold py-3 mb-4">
                                        <span className="text-muted fw-light">Liste des Résultats /</span>
                                    </h4>
                                    <div className="card">
                                        <div className="card-body">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Username</th>
                                                        <th>Answers</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {results.length > 0 ? results.map((result) => (
                                                        <tr key={result._id}>
                                                            <td>{result.username}</td>
                                                            <td>
                                                                <ul className="list-unstyled m-0">
                                                                    {Array.isArray(result.answers) && result.answers.length > 0 ? result.answers.map((answer, index) => (
                                                                        <li key={index}>
                                                                            {answer.answer || 'No answer available'}
                                                                        </li>
                                                                    )) : 'No answers available'}
                                                                </ul>
                                                            </td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                                    </button>
                                                                    <ul className="dropdown-menu">
                                                                        <li>
                                                                            <button
                                                                                type="button"
                                                                                className="dropdown-item"
                                                                                onClick={() => handleDelete(result._id)}
                                                                            >
                                                                                <i className="bx bx-trash me-1"></i> Delete
                                                                            </button>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )) : (
                                                        <tr>
                                                            <td colSpan="3" className="text-center">No results found</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
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

export default ResultsList;
