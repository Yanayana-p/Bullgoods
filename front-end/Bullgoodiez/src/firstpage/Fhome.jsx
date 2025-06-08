import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Fhome.css';
import Fcategory from './Fcategory';
import Fproducts from './Fproducts';

function Fhome() {
  const [time, setTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  //const [selectedCategory, setSelectedCategory] = useState('All'); // <-- add state here

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-PH', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const currentDay = time.toLocaleDateString('en-PH', {
    timeZone: 'Asia/Manila',
    weekday: 'long',
  });

  const fullDate = time.toLocaleDateString('en-PH', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="fhome-container">
      <h1 className="time-day">
        <span className="ph-time">{formattedTime}</span>
      </h1>
      <p className="day-date">
        <span className="current-day">{currentDay}</span>, <span className="full-date">{fullDate}</span>
      </p>

      <img src="/searchbar.png" alt="Description" className="search-image" />

      <section className="search-section">
        <form onSubmit={handleSearchSubmit} className="search-wrapper">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="search-bar"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <FaSearch />
          </button>
        </form>
      </section>
    </div>
  );
}

export default Fhome;
