import React, { useState, useEffect } from 'react';
import '../styles/StarRating.css'; // Ensure this path is correct

export default function StarRating({ onRatingSelect }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [isRated, setIsRated] = useState(false);

    useEffect(() => {
        console.log('isRated changed:', isRated);
    }, [isRated]);

    const handleClick = (index) => {
        if (!isRated) {
            setRating(index);
            setIsRated(true);
            onRatingSelect(index);
            console.log('Rating selected:', index);
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
                            className={index <= (hover || rating) ? "on" : "off"}
                            onClick={() => handleClick(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            disabled={isRated} // Disable the buttons if already rated
                            aria-label={`${index} star`} // Accessibility improvement
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
