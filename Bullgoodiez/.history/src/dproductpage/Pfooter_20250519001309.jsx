import React from 'react';
import './Pfooter.css';

const Ffooter = () => {
  return (
    <div id="footer" className="footer"> 
      <div className="footer-left">
        <h2>BullGoods</h2>
        <div className="social-icons">
          <a href="https://www.facebook.com/NationalUniversityPhilippines"><img src="/fb-icon.png" alt="Facebook" /></a>
          <a href="https://www.linkedin.com"><img src="/linkedin-icon.png" alt="LinkedIn" /></a>
          <a href="https://www.youtube.com/shorts/mLPEuB3rZbw"><img src="/youtube-icon.png" alt="YouTube" /></a>
          <a href="https://www.instagram.com"><img src="/instagram-icon.png" alt="Instagram" /></a>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-column">
                    <h4>Who We Serve</h4>
          <ul>
            <li><a href="https://onlineapp.national-u.edu.ph/portal/services.php" target="_blank" rel="noopener noreferrer">Students</a></li>
            <li><a href="https://www.merriam-webster.com/dictionary/community" target="_blank" rel="noopener noreferrer">Community</a></li>
            <li><a href="https://digido.ph/articles/small-businesses-in-the-philippines" target="_blank" rel="noopener noreferrer">Small Business</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>Where We Are</h4>
          <ul>
            <li><a href="https://national-u.edu.ph/" target="_blank" rel="noopener noreferrer">NU - Manila</a></li>
            <li><a href="https://national-u.edu.ph/nu-nazareth/" target="_blank" rel="noopener noreferrer">NU - Nazareth</a></li>
            <li><a href="https://national-u.edu.ph/nu-moa/" target="_blank" rel="noopener noreferrer">NU - MoA</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Folow Us On</h4>
          <ul>
            <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">X</a></li>
            <li><a href="https://telegram.org/" target="_blank" rel="noopener noreferrer">Telegram</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Ffooter;