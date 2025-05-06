import React from 'react';
import './Developers.css';  // Ensure this file is linked for the styles

function Developers() {
  // Example developer data
  const developers = [
    {
      name: 'Lovely Reyes',
      image: 'labli.jpg',
    },
    {
      name: 'Keith Peralta',
      image: 'keith.jpg',
    },
    {
        name: 'Diana Paray',
        image: 'diana.jpg',
    },
    {
      name: 'Michael Cayanan ',
      image: 'michael.jpg',
    }
  ];

  return (
    <section className="developers">
      {/* Rectangle with Text */}
      <div className="devrectangle">
        <span className="devrectangle-text">Meet Our Amazing Developers</span>
      </div>

      {/* Section Title */}
      <h2>Our Team</h2>

      {/* Developer Cards */}
      <div className="developer-cards">
        {developers.map((developer, index) => (
          <div key={index} className="developer-card">
            <img src={developer.image} alt={`${developer.name}'s profile`} />
            <h3>{developer.name}</h3>
            <p>{developer.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Developers;
