import React from 'react';
import './Fcategory.css';

function Fcategory() {
  const categories = ['Food', 'Clothes', 'Accessories', 'Appliances', 'Subscriptions'];

  return (
    <div className="category-buttons">
      {categories.map((cat) => (
        <button key={cat} className="category-button">
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Fcategory;
