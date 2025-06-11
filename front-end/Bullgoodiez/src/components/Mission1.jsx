import React from 'react';
import { Link } from 'react-router-dom'; 
import './Mission1.css';

const Mission = () => {
  return (
    <>
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          At BullGoods, our mission is to empower students by providing affordable, accessible, and student-friendly products that support academic success and campus life. 
          We aim to create a reliable marketplace where students can easily find and sell essentials — from gadgets and books to everyday needs — all in one trusted platform designed specifically for our nationalian needs.
        </p>
        <Link to="/adminlogin">
          <button className="admin-button">Admin Dashboard</button>
        </Link>
      </section>

      <section className="contact-us">
        <h2>Contact Us</h2>
        <p className="contact-subtitle">Nationalians, We're here to help!</p>
        <div className="contact-boxes">
          <div className="contact-box">
            <div className="contact-icon">📞</div>
            <h3>Call Us</h3>
            <p><a href="tel:1-844-GSA-4111"># 8-7000</a></p>
          </div>
          <div className="contact-box">
            <div className="contact-icon">💬</div>
            <h3>Chat Live</h3>
            <p>Send us a feedback or file a report.</p>
            <a href="bullgoods@gmail.com">bullgoods@gmail.com</a>
          </div>
          <div className="contact-box">
            <div className="contact-icon">🏠︎</div>
            <h3>Location</h3>
            <p>551 F Jhocson St, Sampaloc, City Of Manila, 1008 Metro Manila</p>
            <a>Opens 8 AM - 5 PM</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Mission;
