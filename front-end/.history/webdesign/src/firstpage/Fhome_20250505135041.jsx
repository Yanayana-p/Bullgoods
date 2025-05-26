import React, { useEffect, useState } from 'react';
import './Fhome.css';

function Fhome() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      // Set time using Asia/Manila time zone
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval); // Cleanup on unmount
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

  return (
    <div className="fhome-container">
      <h1 className="ph-time">{formattedTime}</h1>
      <p className="current-day">{currentDay}</p>
    </div>
  );
}

export default Fhome;
