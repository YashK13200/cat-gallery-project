import React, { useState, useEffect } from 'react';
import GridLayout from './components/GridLayout';
import SingleColumnLayout from './components/SingleColumnLayout';
import Pagination from './components/Pagination';
import fetchCats from './api';
import './App.css';

const App = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [infiniteScroll, setInfiniteScroll] = useState(false); // Toggle for Level 3

  const loadCats = async (pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchCats(pageNum);
      if (infiniteScroll) {
        setCats((prevCats) => [...prevCats, ...response.data]); // Append data in infinite scroll
      } else {
        setCats(response.data); // Replace data for pagination
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  // Fetch initial data on load
  useEffect(() => {
    loadCats(page);
  }, [page]);

  // Infinite Scroll Listener
  useEffect(() => {
    if (infiniteScroll) {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        // Check if we're at the bottom
        if (scrollTop + windowHeight >= fullHeight - 50 && !loading) {  // Added a buffer of 50px
          setPage((prevPage) => prevPage + 1);
        }
      };

      // Attach scroll event
      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [infiniteScroll, loading]);

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Cat Gallery</h1>

      <div>
        <button onClick={() => setInfiniteScroll(!infiniteScroll)}>
          {infiniteScroll ? 'Switch to Pagination' : 'Switch to Infinite Scroll'}
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Render grid layout or single column layout based on infinite scroll */}
      {infiniteScroll ? (
        <SingleColumnLayout cats={cats} />
      ) : (
        <>
          <GridLayout cats={cats} />
          <Pagination page={page} handleNext={handleNext} handlePrev={handlePrev} />
        </>
      )}
    </div>
  );
};

export default App;
