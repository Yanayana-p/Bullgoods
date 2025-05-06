import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to Bullgoods</h1>
        <p>Your one-stop shop for amazing products!</p>
        <button className="shop-now">Shop Now</button>
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

