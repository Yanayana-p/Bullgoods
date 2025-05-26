import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import search icon
import './Fhome.css';

function Fhome() {
  const [time, setTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

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
    // Add your search handling logic here
  };

  return (
    <div className="fhome-container">
      <h1 className="time-day">
        <span className="ph-time">{formattedTime}</span>
      </h1>
      <p className="day-date">
        <span className="current-day">{currentDay}</span>, <span className="full-date">{fullDate}</span>
      </p>

      {/* Image Above the Search */}
      <img 
        <img src="homeicon2 (1).png" alt="Description" />
      />

      {/* Search Bar Section */}
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
