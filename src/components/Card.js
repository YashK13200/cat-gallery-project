import React from 'react';
import './Card.css'; // Optional: Style the card here

const Card = ({ imageUrl }) => {
    return (
        <div className="card">
            <img src={imageUrl} alt="Cat" />
        </div>
    );
};

export default Card;
