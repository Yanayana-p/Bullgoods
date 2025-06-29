import React from 'react';
import { Link } from 'react-router-dom'; 
import './Mission1.css';

const Mission = () => {
  return (
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
  );
};

export default Mission;
