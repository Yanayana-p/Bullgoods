// src/dproductpage/Pproduct.jsx
import React from 'react';
import './Pproduct.css';

const sampleProducts = [
  { id: 1, name: 'Strawberry Cake', price: 100, description: 'Tasty layered cake with fresh strawberries and cream.', image: '/product1.jpg' },
  { id: 2, name: 'Leather Jacket', price: 200, description: 'Premium black leather jacket, stylish and warm.', image: '/product2.jpg' },
  { id: 3, name: 'Nu ID Lace', price: 150, description: 'Pre-loved ID Lace. Used but not abused! Dm me if interested.', image: '/product3.jpg' },
  { id: 4, name: 'iPhone 15 pro', price: 59000, description: 'Selling my 3 months-old phone. No issue. Can do meet up around NU - Manila only. No to Joyjoy, irereport ko!', image: '/product4.jpg' },
  { id: 5, name: '3 months Canva', price: 250, description: 'Selling a pro access to Canva for a very affordable price. This is a share account kung maarte, wag na mag-message. Thank u!', image: '/product5.jpg' },
  { id: 6, name: 'Pasta in a Box', price: 150, description: 'Hi guyzz, bili na kayo, nasa school ako mon-fri. Sa garden na lang pick-up. Dm me for reservation. No cancellation, ako magca-cancel sainyo!', image: '/product6.jpg' },
  { id: 7, name: 'Traditional Uniform', price: 750, description: 'Trying this app habang may access pa ako sa NU account ko. Bilhin niyo na to guys di ko naman pwede to gamitin sa work pslplspls. Pwede rin separate bilhin. Naga-accept din negotiation!', image: '/product7.jpg' },
  { id: 8, name: 'Phone charm', price: 75, description: 'Selling phone charm, guys. Marami akong design kahit gumawa pa ako on the spot. Di kayo luge rito. Hindi rin mabilis mapigtas, promise. Sa iba 150 pa to. ', image: '/product8.jpg' },
  { id: 9, name: 'Drawing pad', price: 20000, description: 'For sale! Never been used kasi hiniwalayan ako nung pagbibigyan ko. Di naman ako marunong mag-drawing. Bilhin niyo na para may pang tuition ako. Ibato ko na lang to.', image: '/product9.jpg' },
  { id: 10, name: 'Spotify Premium', price: 125, description: 'Pagod ka na ba mag-commute? Avail ka na para di ka na pagod. May libreng dalawang kiss pag nag-avail. Limited offer!', image: '/product10.jpg' },
];

function Pproduct({ productId }) {
  const id = Number(productId);
  const product = sampleProducts.find(p => p.id === id);

  if (!product) return <div className="product-not-found">Product not found</div>;

  return (
    <div className="page-container">
      <div className="product-container">
        <div className="image-section">
          <img src={product.image} alt={product.name} className="main-image" />
        </div>
        <div className="details-section">
          <h2>{product.name}</h2>
          <h3 className="price">₱ {product.price.toFixed(2)}</h3>
          <p>{product.description}</p>
          <div className="button-row">
            <button className="btn">Add to Wishlist</button>
            <button className="btn">Contact Seller</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pproduct;
