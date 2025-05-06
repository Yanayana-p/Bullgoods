// src/components/CategoryButtons.jsx
import React from 'react';
import './CategoryButtons.css'; // Create this CSS file too

function CategoryButtons() {
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

export default CategoryButtons;
