//import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Bullgoods</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li> {/* Use Link for routing */}
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
