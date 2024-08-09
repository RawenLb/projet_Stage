import React, { useState, useEffect } from 'react';
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
    const { userId } = resultState;
    const [fetchedResult, setFetchedResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');

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
        axios.post('http://localhost:5000/api/feedback', { userId, rating })
            .then(response => console.log('Feedback saved:', response.data))
            .catch(error => console.error('Error saving feedback:', error));
    };

    const handleFeedbackType = (type) => {
        setFeedbackType(type);
        setFeedbackModalOpen(true);
    };

    const handleFeedbackSubmit = (feedback) => {
        axios.post('http://localhost:5000/api/feedback', { userId, feedback, type: feedbackType })
            .then(response => {
                console.log('Feedback saved:', response.data);
                setFeedbackModalOpen(false);
            })
            .catch(error => {
                console.error('Error saving feedback:', error);
            });
    };
    

    function onRestart() {
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }

    const geminiResult = fetchedResult?.geminiResult?.answer || "No result found";

    return (
        <div className='centered-container'>
            <div className='container'>
                <h1 className='result-title'>Questionnaire Results</h1>
                <div className='result-details'>
                    <div className='result-item'>
                        <span className='result-label'>Username:</span>
                        <span className='result-value'>{userId || "N/A"}</span>
                    </div>
                    <div className='result-item'>
                        <span className='result-label'>Generated Faculties:</span>
                        <span className='result-value'>
                            {loading ? "Loading..." : geminiResult}
                        </span>
                    </div>
                </div>

                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    <h2>Rate Your Experience</h2>
                    <StarRating onRatingSelect={onRatingSelect} />
                    <button onClick={() => handleFeedbackType('Reclamation')}>Submit Reclamation</button>
                    <button onClick={() => handleFeedbackType('Commentaire')}>Submit Comment</button>
                </Modal>

                <Modal isOpen={feedbackModalOpen} onClose={() => setFeedbackModalOpen(false)}>
                    <h2>Provide Your {feedbackType}</h2>
                    <textarea 
                        placeholder={`Enter your ${feedbackType?.toLowerCase() || 'feedback'} here...`} 
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                    />
                    <button onClick={() => handleFeedbackSubmit(feedbackText)}>Submit</button>
                </Modal>

                <div className="result-action">
                    <Link className='result-btn' to={'/'} onClick={onRestart}>Restart Quiz</Link>
                </div>
            </div>
        </div>
    );
}
