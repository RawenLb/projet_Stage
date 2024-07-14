import React, { useEffect, useState } from 'react';
import '../styles/Result.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult, getServerData } from '../helper/helper';

/** import actions  */
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';

export default function Result() {
    const dispatch = useDispatch();
    const { questions: { queue, answers }, result: { result, userId } } = useSelector(state => state);
    const [fetchedResult, setFetchedResult] = useState(null);
    const [loading, setLoading] = useState(true);

    const totalPoints = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints);

    /** store user result */
    usePublishResult({ 
        result, 
        username: userId,
        attempts,
        points: earnPoints,
        achieved: flag ? "Passed" : "Failed",
        answers: answers 
    });

    useEffect(() => {
        if (userId) {
            getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, data => {
                console.log("Fetched data:", data); // Debug log
                const userResult = data.find(res => res.username === userId);
                console.log("Filtered user result:", userResult); // Debug log
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
                    <span className='bold'>{loading ? "Loading..." : fetchedResult ? JSON.stringify(fetchedResult.answers) : "No result found"}</span>
                </div>
            </div>
            <div className="start">
                <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
            </div>
        </div>
    );
}
