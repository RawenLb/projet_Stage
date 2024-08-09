import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../styles/Dashboard.css'; // Import the CSS for additional styling

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
        <div className="admin-container">
            <Sidebar />
            <div className='admin-content'>
                <Navbar />
                <div className="content-wrapper">
                    <div className="container-fluid">
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
    );
};

export default Admin;
