import React from 'react';
import './Fcategory.css';

function Fcategory({ selectedCategory, onCategoryClick }) {
  const categories = ['All', 'Food', 'Clothes', 'Accessories', 'Appliances', 'Subscriptions'];

  return (
    <div className="category-buttons">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
          onClick={() => onCategoryClick(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Fcategory;
