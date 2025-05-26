import React from 'react';
import './Ufooter.css';

const Ffooter = () => {
  return (
    <div id="footer" className="footer"> {/* <-- Added id="footer" here */}
      <div className="footer-left">
        <h2>BullGoods</h2>
        <div className="social-icons">
          <a href="https://www.facebook.com"><img src="fb-icon.png" alt="Facebook" /></a>
          <a href="https://www.linkedin.com"><img src="linkedin-icon.png" alt="LinkedIn" /></a>
          <a href="https://www.youtube.com"><img src="youtube-icon.png" alt="YouTube" /></a>
          <a href="https://www.instagram.com"><img src="instagram-icon.png" alt="Instagram" /></a>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-column">
          <h4>Topic</h4>
          <ul>
            <li>Page</li>
            <li>Page</li>
            <li>Page</li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>Topic</h4>
          <ul>
            <li>Page</li>
            <li>Page</li>
            <li>Page</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Topic</h4>
          <ul>
            <li>Page</li>
            <li>Page</li>
            <li>Page</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Ffooter;