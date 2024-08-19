import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCog, faBell, faExclamationTriangle, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../assets/css/nucleo-icons.css';
import '../assets/css/nucleo-svg.css';
import '../assets/css/argon-dashboard.css?v=2.0.4';
import logo from '../assets/img/logo.png';

const Reclamations = () => {
    const [reclamations, setReclamations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReclamations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reclamations');
                setReclamations(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReclamations();
    }, []);

    const deleteReclamation = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/reclamations/${id}`);
            setReclamations(reclamations.filter(reclamation => reclamation._id !== id));
        } catch (error) {
            console.error('Error deleting reclamation:', error);
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteReclamation(id);
                Swal.fire('Deleted!', 'The reclamation has been deleted.', 'success');
            }
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
                            <h6 className="font-weight-bolder text-white mb-0">Reclamations</h6>
                        </nav>
                        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                            <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                <div className="input-group">
                                    <span className="input-group-text text-body"><FontAwesomeIcon icon={faSearch} /></span>
                                    <input type="text" className="form-control" placeholder="Search..." />
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
                            <div className="card shadow-sm">
                                <div className="card-body p-4">
                                    <h4 className="fw-bold py-3 mb-4">Liste des Réclamations</h4>
                                    <div className="table-responsive">
                                        <table className="table table-striped table-bordered align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Sujet</th>
                                                    <th>Date</th>
                                                    <th>Message</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reclamations.map((reclamation) => (
                                                    <tr key={reclamation._id}>
                                                        <td>{reclamation._id}</td>
                                                        <td>{reclamation.subject}</td>
                                                        <td>{new Date(reclamation.createdAt).toLocaleDateString()}</td>
                                                        <td>{reclamation.message}</td>
                                                        <td>
                                                            <div className="btn-group" role="group">
                                                                <button
                                                                    onClick={() => handleDelete(reclamation._id)}
                                                                    className="btn btn-outline-danger btn-sm"
                                                                >
                                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                                </button>
                                                                
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

export default Reclamations;


