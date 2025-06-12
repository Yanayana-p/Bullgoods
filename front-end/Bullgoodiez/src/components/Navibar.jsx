import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navibar.scss';

function Navibar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const developers = document.getElementById('developers');
      const footer = document.getElementById('footer');

      if (footer && footer.offsetTop <= scrollPosition) {
        setActiveSection('footer');
      } else if (developers && developers.offsetTop <= scrollPosition) {
        setActiveSection('developers');
      } else {
        setActiveSection('hero');
      }

      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAboutClick = (e) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      // Navigate to homepage first, then scroll after short delay
      navigate('/');
      setTimeout(() => {
        const target = document.getElementById('developers');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // slight delay to wait for navigation
    } else {
      const target = document.getElementById('developers');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }

    setMenuOpen(false);
  };

  return (
    <header className={`navibar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">Bullgoods</div>

      <nav className={menuOpen ? 'open' : ''}>
        <ul>
          <li>
            <Link to="/" className={activeSection === 'hero' ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <a href="#developers" onClick={handleAboutClick} className={activeSection === 'developers' ? 'active' : ''}>
              About Us
            </a>
          </li>
        </ul>
      </nav>

      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}

export default Navibar;
