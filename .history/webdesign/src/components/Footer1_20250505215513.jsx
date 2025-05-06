import React from 'react';
import './Footer1.css';

const Footer = () => {
  return (
    <div id="footer" className="footer"> {/* <-- Added id="footer" here */}
      <div className="footer-left">
        <h2>BullGoods</h2>
        <div className="social-icons">
          
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

export default Footer;