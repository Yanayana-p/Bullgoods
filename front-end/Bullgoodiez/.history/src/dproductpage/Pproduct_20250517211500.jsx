import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Pproduct.css';

const sampleProducts = [
  {
    id: 1,
    name: 'Strawberry Cake',
    price: 100,
    description: 'Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look.',
    moreInfo: 'Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation...',
    image: '/product1.jpg',
  },
  {
    id: 2,
    name: 'Leather Jacket',
    price: 200,
    description: 'High quality leather jacket for winter season.',
    moreInfo: 'Limited edition leather with superior craftsmanship.',
    image: '/product2.jpg',
  },
];

function Pproduct() {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const product = sampleProducts.find(p => p.id === productId);

  const [image, setImage] = useState(product ? product.image : null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-card">
      <div className="image-section">
        <label className="upload-area">
          {image ? (
            <img src={image} alt={product.name} className="main-image" />
          ) : (
            <span className="upload-placeholder">+</span>
          )}
          <input type="file" onChange={handleImageChange} accept="image/*" hidden />
        </label>
        <div className="thumbnail-row">
          {[...Array(4)].map((_, i) => (
            <div className="thumbnail-box" key={i}></div>
          ))}
        </div>
      </div>
      <div className="details-section">
        <h2>{product.name}</h2>
        <h3 className="price">${product.price.toFixed(2)}</h3>
        <p>{product.description}</p>
        <p>{product.moreInfo}</p>
        <div className="button-row">
          <button className="btn">Wishlist</button>
          <button className="btn">Message Seller</button>
        </div>
      </div>
    </div>
  );
}

export default Pproduct;
