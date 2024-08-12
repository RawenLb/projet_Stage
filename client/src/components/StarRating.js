import React, { useState } from 'react';
import '../styles/StarRating.css'; // Add your own styles

export default function StarRating({ onRatingSelect }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [isRated, setIsRated] = useState(false); // Track if the rating has been given

    const handleClick = (index) => {
        if (!isRated) {
            setRating(index);
            setIsRated(true);
            onRatingSelect(index);
        }
    };

    return (
        <div className="star-rating">
            <div className="stars-container">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? "on" : "off"}
                            onClick={() => handleClick(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            disabled={isRated} // Disable buttons if already rated
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