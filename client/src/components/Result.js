import React, { useEffect, useState } from 'react';
import '../styles/Result.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';
import { getServerData } from '../helper/helper'; // Assurez-vous d'importer correctement votre fonction d'appel API

export default function Result() {
    const dispatch = useDispatch();
    const { questions: { queue, answers }, result: { result, userId } } = useSelector(state => state);
    const [fetchedResult, setFetchedResult] = useState(null);
    const [loading, setLoading] = useState(true);

    const totalPoints = queue.length * 10; 
    const attempts = result.length; // Modifier selon votre logique d'attempts
    const earnPoints = 10; // Modifier selon votre logique de points
    const flag = true; // Modifier selon votre logique de flag

    /** store user result */
    usePublishResult({ 
        result, 
        username: userId,
        attempts,
        points: earnPoints,
        achieved: flag ? "Passed" : "Failed",
        answers: result // Assurez-vous de passer les réponses réelles de l'utilisateur
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
