// ReclamationForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function ReclamationForm({ userId }) {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/reclamation', { userId, subject, message });
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting reclamation:', error);
        }
    };

    return (
        <div className='reclamation-container'>
            <h2>Submit a Reclamation</h2>
            {submitted ? (
                <div className='success-message'>Your reclamation has been submitted. Thank you!</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Subject:</label>
                        <input 
                            type='text' 
                            value={subject} 
                            onChange={(e) => setSubject(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='form-group'>
                        <label>Message:</label>
                        <textarea 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            required 
                        ></textarea>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            )}
        </div>
    );
}
