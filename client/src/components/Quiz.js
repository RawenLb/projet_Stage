import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Questions from './Questions';
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';
import axios from 'axios';

export default function Quiz() {
    const [check, setChecked] = useState(undefined);
    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch();
    const username = useSelector(state => state.result.userId);

    function onNext() {
        if (check !== undefined) {
            if (trace < queue.length) {
                dispatch(MoveNextQuestion());
                if (result.length <= trace) {
                    dispatch(PushAnswer({ questionId: queue[trace]._id, answer: check }));
                }
            }
            setChecked(undefined);
        } else {
            alert('Please select an answer before proceeding.');
        }
    }

    function onPrev() {
        if (trace > 0) {
            dispatch(MovePrevQuestion());
        }
    }

    useEffect(() => {
        if (result.length && result.length >= queue.length) {
            async function storeResults() {
                try {
                    const response = await axios.post('/api/store-result', {
                        username,
                        answers: result
                    });
                    console.log('Store result response:', response.data);
                } catch (error) {
                    console.error('Failed to store results:', error);
                }
            }
            storeResults();
        }
    }, [result.length, queue.length, username, result]);

    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace={true}></Navigate>;
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Questionnaire</h1>
            <Questions onChecked={setChecked} />

            <div className='grid'>
                {trace > 0 ? <button className='btn prev' onClick={onPrev}>Previous</button> : <div></div>}
                <button className='btn next' onClick={onNext}>Next</button>
            </div>
        </div>
    );
}
