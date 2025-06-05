import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // adjust the path as needed
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ use context

  const handleShopNowClick = () => {
    if (user) {
      navigate('/firstpage');
    } else {
      navigate('/loginpage');
    }
  };

  return (
    <div className="home-container">
      <section className="hero-section">
  <div className="image-container">
      <img src="homeicon2 (1).png" alt="Description" />
    </a>
    {/* New button below the image */}
    <button
  className="click-here-btn"
  onClick={() => window.open('https://www.facebook.com/groups/649122791129197', '_blank')}
>
  Click Here
</button>

  </div>
  <div className="text-container">
    <h1>Welcome to BullGoods</h1>
    <p>One Stop. Endless Shopping!</p>
    <button className="shop-now" onClick={handleShopNowClick}>
      Shop Now
    </button>
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
            <h3>Convenience</h3>
            <p>We value your time as a student so we made it easy for you.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
