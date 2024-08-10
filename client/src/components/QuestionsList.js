import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import '../assets/css/nucleo-icons.css';
import '../assets/css/nucleo-svg.css';
import '../assets/css/argon-dashboard.css?v=2.0.4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCog, faBell } from '@fortawesome/free-solid-svg-icons';

const QuestionsList = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const deleteQuestion = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/questions/${id}`);
            setQuestions(questions.filter(question => question._id !== id));
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    const handleEdit = async (id) => {
        const question = questions.find(q => q._id === id);

        const { value: updatedQuestion } = await Swal.fire({
            title: 'Edit Question',
            html: `
                <input id="question" class="swal2-input" placeholder="Question" value="${question.question}">
                <input id="options" class="swal2-input" placeholder="Options (comma-separated)" value="${question.options.join(',')}">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const questionText = Swal.getPopup().querySelector('#question').value;
                const optionsText = Swal.getPopup().querySelector('#options').value.split(',');
                return { question: questionText, options: optionsText };
            }
        });

        if (updatedQuestion) {
            try {
                const response = await axios.put(`http://localhost:5000/api/questions/${id}`, updatedQuestion);
                setQuestions(questions.map(question => question._id === id ? response.data.updatedQuestion : question));
                Swal.fire('Updated!', 'The question has been updated.', 'success');
            } catch (error) {
                console.error('Error updating question:', error);
                Swal.fire('Error!', 'There was an error updating the question.', 'error');
            }
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
                await deleteQuestion(id);
                Swal.fire('Deleted!', 'The question has been deleted.', 'success');
            }
        });
    };

    return (
        <div className="g-sidenav-show bg-gray-100">
            {/* Sidebar */}
            <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4">
                <div className="sidenav-header">
                    <img src="../assets/img/logo-ct-dark.png" alt="Logo" className="navbar-brand-img h-100" />
                    <span className="ms-1 font-weight-bold">Dashboard</span>
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

            {/* Navbar */}
            <main className="main-content position-relative border-radius-lg">
                <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="false">
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
                                    <h4 className="fw-bold py-3 mb-4">Questions List</h4>
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th>Question</th>
                                                <th>Options</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {questions.map((question) => (
                                                <tr key={question._id}>
                                                    <td>{question.question}</td>
                                                    <td>
                                                        <ul>
                                                            {question.options.map((option, index) => (
                                                                <li key={index}>{option}</li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(question._id)}>Delete</button>
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
            </main>
        </div>
    );
};

export default QuestionsList;
