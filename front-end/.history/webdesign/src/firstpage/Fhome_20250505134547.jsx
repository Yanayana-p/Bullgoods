import React from 'react';
import './Fhome.css';

function Fhome() {
  const currentDay = new Date().toLocaleDateString('en-PH', { weekday: 'long' });

  return (
    <div className="fhome-container">
      <h1 className="ph-time">PH TIME</h1>
      <p className="current-day">{currentDay}</p>
    </div>
  );
}

export default Fhome;
