import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const QuestionsList = () => {
    const [questions, setQuestions] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [questionToEdit, setQuestionToEdit] = useState(null);

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

    const editQuestion = async (updatedQuestion) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/questions/${questionToEdit._id}`, updatedQuestion);
            setQuestions(questions.map(question => question._id === questionToEdit._id ? response.data : question));
            setEditModalOpen(false);
            setQuestionToEdit(null);
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    const handleEdit = (id) => {
        const question = questions.find(q => q._id === id);
        setQuestionToEdit(question);
        setEditModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            deleteQuestion(id);
        }
    };

  

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Sidebar />
                <div className="layout-page">
                    <Navbar />

                    
                    <div className="card m-3 p-3">
                        <h5 className="card-header">Liste des Questions</h5>
                        <div className="table-responsive text-nowrap">
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Question</th>
                                        <th>Options</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {questions.map((question) => (
                                        <tr key={question._id}>
                                            <td>{question.question}</td>
                                            <td>
                                                <ul className="list-unstyled m-0">
                                                    {question.options.map((option, index) => (
                                                        <li key={index}>{option}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>
                                                <div className="dropdown">
                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <a className="dropdown-item" href="javascript:void(0);" onClick={() => handleEdit(question._id)}>
                                                            <i className="bx bx-edit-alt me-1"></i> Edit
                                                        </a>
                                                        <a className="dropdown-item" href="javascript:void(0);" onClick={() => handleDelete(question._id)}>
                                                            <i className="bx bx-trash me-1"></i> Delete
                                                        </a>
                                                    </div>
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
            {isEditModalOpen && (
                <EditModal question={questionToEdit} onSave={editQuestion} onClose={() => setEditModalOpen(false)} />
            )}
        </div>
    );
};

const EditModal = ({ question, onSave, onClose }) => {
    const [updatedQuestion, setUpdatedQuestion] = useState(question);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedQuestion({ ...updatedQuestion, [name]: value });
    };

    const handleSave = () => {
        onSave(updatedQuestion);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h4>Edit Question</h4>
                <input
                    type="text"
                    name="question"
                    value={updatedQuestion.question}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="options"
                    value={updatedQuestion.options.join(',')}
                    onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, options: e.target.value.split(',') })}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default QuestionsList;