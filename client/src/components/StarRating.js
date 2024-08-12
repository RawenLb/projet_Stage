import React, { useState } from 'react';
import axios from 'axios';
import '../styles/StarRating.css';

export default function StarRating({ userId, onRatingSelect }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [isRated, setIsRated] = useState(false);

    const handleClick = (index) => {
        if (!isRated) {
            setRating(index);
            setIsRated(true);
            onRatingSelect(index);

            // Send rating to the backend
            axios.post('http://localhost:5000/api/feedback', { userId, rating: index })
                .then(response => {
                    console.log('Feedback saved:', response.data);
                })
                .catch(error => {
                    console.error('Error saving feedback:', error);
                });
        }
    };

    return (
        <div className="star-rating">
            <div className="stars-container">
                {[...Array(5)].map((_, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? 'on' : 'off'}
                            onClick={() => handleClick(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            disabled={isRated}
                            aria-label={`${index} star`}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                    );
                })}
            </div>
            {isRated && <div className="rating-message">Thank you for your feedback!</div>}
        </div>
    );
}

