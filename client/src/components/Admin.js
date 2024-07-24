import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Admin = () => {
    const [questionText, setQuestionText] = useState('');
    const [answerOptions, setAnswerOptions] = useState(['']);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleOptionChange = (index, event) => {
        const newOptions = [...answerOptions];
        newOptions[index] = event.target.value;
        setAnswerOptions(newOptions);
    };

    const handleAddOption = () => {
        setAnswerOptions([...answerOptions, '']);
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
            navigate('/questions'); // Adjust the path to your questions list route

        } catch (error) {
            console.error(error);
            alert('Failed to add the question. Please try again.');
        }
    };

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Sidebar />
                <div className='layout-page'>
                    <Navbar />
                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">                           
                            <h1>Admin Dashboard</h1>

                            <div className="w-100 d-flex justify-content-center">
                                <img 
                                    src="/admin/img/illustrations/Q&A.png" 
                                    className="img-fluid" 
                                    alt="Login illustration" 
                                    width="200" 
                                />
                            </div>

                            <form onSubmit={handleSubmit} className="mb-6">
                                <div className="mb-6">
                                    <label htmlFor="question" className="form-label">
                                        Question:
                                    </label>
                                    <input 
                                        type="text" 
                                        id="question" 
                                        value={questionText} 
                                        onChange={(e) => setQuestionText(e.target.value)} 
                                        className="form-control"
                                    />
                                </div>
                                {answerOptions.map((option, index) => (
                                    <div key={index} className="mb-6">
                                        <label htmlFor={`option-${index}`} className="form-label">
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
                                <center>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                    >
                                        Submit
                                    </button>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
