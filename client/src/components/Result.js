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
    const {  result: { result, userId } } = useSelector(state => state);
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
        <div className='container'>
            <h1 className='title text-light'>Questionnaire</h1>
            <div className='result flex-center'>
                <div className='flex'>
                    <span>Username</span>
                    <span className='bold'>{userId || ""}</span>
                </div>
              
                <div className='flex'>
                    <span>Answers:</span>
                    <span className='bold'>{loading ? "Loading..." : fetchedResult ? renderAnswers(fetchedResult.answers) : "No result found"}</span>
                </div>
            </div>
            <div className="start">
                <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
            </div>
        </div>
    );
}

function renderAnswers(answers) {
    return (
        <ul>
            {answers.map((answer, index) => (
                <li key={index}>
                    {typeof answer === 'object' ? answer.answer : answer}
                </li>
            ))}
        </ul>
    );
}
