import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const ResultsList = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/result'); // Adjust the URL as needed
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        fetchResults();
    }, []);

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Sidebar />
                <div className="layout-page">
                    <Navbar />
                    <div className="container-xxl flex-grow-1 container-p-y">
                        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Liste des Résultats /</span></h4>
                        <div className="card">
                            <div className="table-responsive text-nowrap">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Results</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                        {results.map((result) => (
                                            <tr key={result._id}>
                                                <td>{result.username}</td>
                                                <td>
                                                    <ul className="list-unstyled m-0">
                                                        {result.answers.map((answer, index) => (
                                                            <li key={index}>{answer.answer}</li>
                                                        ))}
                                                    </ul>
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
    );
};

export default ResultsList;
