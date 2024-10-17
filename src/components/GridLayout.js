import React from 'react';
import Card from './Card';
import './GridLayout.css';

const GridLayout = ({ cats }) => {
    return (
        <div className="grid-layout">
            {cats.map((cat, index) => (
                <Card key={index} imageUrl={cat.url} />
            ))}
        </div>
    );
};

export default GridLayout;
