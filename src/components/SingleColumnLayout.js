import React from 'react';
import Card from './Card';
import './SingleColumnLayout.css';

const SingleColumnLayout = ({ cats }) => {
    return (
        <div className="single-column-layout">
            {cats.map((cat, index) => (
                <Card key={index} imageUrl={cat.url} />
            ))}
        </div>
    );
};

export default SingleColumnLayout;
