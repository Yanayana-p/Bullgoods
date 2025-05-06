import React, { useEffect, useState } from 'react';
import './Fhome.css';

function Fhome() {
  const [time, setTime] = useState(new Date());

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

  return (
    <div className="fhome-container">
      <h1 className="ph-time">{formattedTime}</h1>
      <p className="current-day">{currentDay}</p>
      <p className="full-date">{fullDate}</p>
    </div>
  );
}

export default Fhome;


export default Fhome;
