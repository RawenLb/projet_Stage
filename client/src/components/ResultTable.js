/*
import React, { useEffect, useState } from 'react';
import { getServerData } from '../helper/helper';
import '../styles/ResultTable.css'; // Assurez-vous d'avoir un fichier CSS pour styliser votre table

export default function ResultTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, (res) => {
            setData(res);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <h1 className='title'>Result Table</h1>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <th>Name</th>
                        <th>Answers</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5">Loading...</td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan="5">No Data Found</td>
                        </tr>
                    ) : (
                        data.map((v, i) => (
                            <tr className='table-body' key={i}>
                                <td>{v.username || ''}</td>
                                <td>{renderAnswers(v.answers)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
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
*/