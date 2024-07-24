import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchQestion } from '../hooks/FetchQuestion';
import { updateResult } from '../hooks/setResult';

export default function Questions({ onChecked }) {
    const [checked, setChecked] = useState(undefined);
    const { trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{ isLoading, apiData, serverError }] = useFetchQestion();
    const dispatch = useDispatch();
    
    const questions = apiData || []; // Assurez-vous que apiData est un tableau

    useEffect(() => {
        dispatch(updateResult({ trace, checked }));
    }, [checked, dispatch, trace]);

    function onSelect(i) {
        onChecked(i);
        setChecked(i);
        dispatch(updateResult({ trace, checked }));
    }

    if (isLoading) return <h3 className='text-light'>Loading...</h3>;
    if (serverError) return <h3 className='text-light'>{serverError.message || "Unknown Error"}</h3>;
    
    if (!questions.length) return <h3 className='text-light'>No questions available</h3>;

    return (
        <div className='questions'>
            <h2 className='text-light'>{questions[trace]?.question}</h2>
            <ul key={questions[trace]?.id}>
                {questions[trace]?.options.map((q, i) => (
                    <li key={i}>
                        <input
                            type="radio"
                            value={i}
                            name="options"
                            id={`q${i}-option`}
                            className="option-input"
                            onChange={() => onSelect(i)}
                        />
                        <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                        <div className={`check ${result[trace] === i ? 'checked' : ''}`}></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
