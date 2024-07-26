import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import axios from 'axios';
import StarRating from './StarRating';
import Modal from './Modal';

export default function Result() {
    const dispatch = useDispatch();
    const resultState = useSelector(state => state.result);
    const { result, userId } = resultState;
    const [fetchedResult, setFetchedResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/result');
                const userResult = response.data.find(res => res.username === userId);
                setFetchedResult(userResult);
            } catch (error) {
                console.error('Error fetching results:', error);
            } finally {
                setLoading(false);
                setTimeout(() => setModalOpen(true), 5000); // Open modal after 5 seconds
            }
        };

        if (userId) {
            fetchResults();
        }
    }, [userId]);

    const onRatingSelect = (rating) => {
        // Enregistrez la note dans le backend
        axios.post('http://localhost:5000/api/feedback', { userId, rating })
            .then(response => console.log('Feedback saved:', response.data))
            .catch(error => console.error('Error saving feedback:', error));
    };

    function onRestart() {
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }

    return (
        <div className='centered-container'>
            <div className='result-container'>
                <h1 className='result-title'>Questionnaire Results</h1>
                <div className='result-details'>
                    <div className='result-item'>
                        <span className='result-label'>Username:</span>
                        <span className='result-value'>{userId || "N/A"}</span>
                    </div>
                    <div className='result-item'>
                        <span className='result-label'>Answers:</span>
                        <span className='result-value'>
                            {loading ? "Loading..." : fetchedResult && fetchedResult.answers ? renderAnswers(fetchedResult.answers) : "No result found"}
                        </span>
                    </div>
                </div>
                
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    <h2>Rate Your Experience</h2>
                    <StarRating onRatingSelect={onRatingSelect} />
                </Modal>

                <div className="result-action">
                    <Link className='result-btn' to={'/'} onClick={onRestart}>Restart Quiz</Link>
                </div>
            </div>
            
        </div>
    );
}

function renderAnswers(answers) {
    if (!Array.isArray(answers)) {
        return <div>No valid answers found.</div>;
    }
    return (
        <ul>
            {answers.map((answer, index) => (
                <li key={index}>
                    {typeof answer === 'object' && answer !== null ? answer.answer : answer}
                </li>
            ))}
        </ul>
    );
}
