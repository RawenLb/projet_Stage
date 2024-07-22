import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionsList = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Fonction pour récupérer les questions depuis l'API
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('/api/questions'); // Assurez-vous que l'URL est correcte
                console.log(response.data);
                setQuestions(response.data); // Met à jour le state avec les données récupérées
            } catch (error) {
                console.error('Erreur lors de la récupération des questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    return (
        <div className="card">
            <h5 className="card-header">Liste des Questions</h5>
            <div className="table-responsive text-nowrap">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {questions.map((question) => (
                            <tr key={question._id} className="table-default">
                                <td>{question.question}</td>
                                <td>
                                    <ul className="list-unstyled m-0">
                                        {question.options.map((option, index) => (
                                            <li key={index}>{option}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuestionsList;
