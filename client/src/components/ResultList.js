import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../styles/ResultsList.css'; // Import the new CSS file

const ResultsList = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/result');
                setResults(response.data || []);
            } catch (error) {
                console.error('Error fetching results:', error);
                setResults([]); // Ensure results is set to an empty array if fetching fails
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
        <div className="layout-wrapper">
            <div className="layout-container">
                <Sidebar />
                <div className="admin-content">
                    <Navbar />
                    <div className="container-xxl">
                        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Liste des Résultats /</span></h4>
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
    );
};

export default ResultsList;
