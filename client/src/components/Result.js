import React, { useEffect, useState } from 'react';
import '../styles/Result.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';
import { getServerData } from '../helper/helper';

export default function Result() {
    const dispatch = useDispatch();
    const { result: { result, userId } } = useSelector(state => state);
    const [fetchedResult, setFetchedResult] = useState(null);
    const [loading, setLoading] = useState(true);

    usePublishResult({
        result,
        username: userId,
        answers: result
    });

    useEffect(() => {
        if (userId) {
            getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, data => {
                const userResult = data.find(res => res.username === userId);
                setFetchedResult(userResult);
                setLoading(false);
            });
        }
    }, [userId]);

    function onRestart() {
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }

    return (
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
