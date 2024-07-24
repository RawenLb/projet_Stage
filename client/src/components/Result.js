import React, { useEffect, useState } from 'react';
import '../styles/Result.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import axios from 'axios';

export default function Result() {
    const dispatch = useDispatch();
    const resultState = useSelector(state => state.result);
    const { result, userId } = resultState;
    const [fetchedResult, setFetchedResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/result');
                console.log('Fetched Results:', response.data);
                const userResult = response.data.find(res => res.username === userId);
                console.log('User Result:', userResult);
                setFetchedResult(userResult);
            } catch (error) {
                console.error('Error fetching results:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchResults();
        }
    }, [userId]);

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
