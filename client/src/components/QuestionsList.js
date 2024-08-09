import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../styles/QuestionsList.css'; // Import the new CSS file

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
        <div className="layout-wrapper">
            <div className="layout-container">
                <Sidebar />
                
                <div className='admin-content'>
                    <Navbar />                   
                    <div className="container-xxl">
                        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Liste des Questions /</span></h4>
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-striped">
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
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    className="dropdown-item"
                                                                    onClick={() => handleEdit(question._id)}
                                                                >
                                                                    <i className="bx bx-edit-alt me-1"></i> Edit
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    className="dropdown-item"
                                                                    onClick={() => handleDelete(question._id)}
                                                                >
                                                                    <i className="bx bx-trash me-1"></i> Delete
                                                                </button>
                                                            </li>
                                                        </ul>
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
    );
};

export default QuestionsList;

