import React from 'react';
import './Developers.css';

function Developers() {
  const developers = [
    { name: 'Lovely Reyes', image: 'labli.jpg' },
    { name: 'Keith Peralta', image: 'keith.jpg' },
    { name: 'Diana Paray', image: 'diana.jpg' },
    { name: 'Michael Cayanan', image: 'michael.jpg' }
  ];

  return (
    <section className="developers">
      <div className="devrectangle">
        {/* Replaced "THE DEVELOPERS" with "OUR TEAM" */}
        <span className="devrectangle-text">THE DEVELOPERS</span>
      </div>

      <div className="developer-cards">
        {developers.map((dev, index) => (
          <div key={index} className="developer-card">
            <div className="developer-image-wrapper">
              <img src={dev.image} alt={dev.name} />
            </div>
            <h3>{dev.name.toUpperCase()}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Developers;

