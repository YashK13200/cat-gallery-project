import React from 'react';

const Pagination = ({ page, handleNext, handlePrev }) => {
    return (
        <div className="pagination">
            <button onClick={handlePrev} disabled={page === 1}>
                Previous
            </button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default Pagination;
