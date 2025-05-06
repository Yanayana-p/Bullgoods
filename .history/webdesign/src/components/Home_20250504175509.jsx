import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
    <section className="hero-section">
        <div className="image-container">
            <img src="shopping phone.png" alt="Description" />
    </div>
    <div className="text-container">
        <h1>Your Heading</h1>
        <p>Your paragraph goes here. You can add some description or text.</p>
    </div>
    </section>
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>High Quality</h3>
            <p>We only offer the best quality products.</p>
          </div>
          <div className="feature-card">
            <h3>Affordable</h3>
            <p>Shop your favorite products at affordable prices.</p>
          </div>
          <div className="feature-card">
            <h3>Fast Delivery</h3>
            <p>Get your products delivered at lightning speed.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

