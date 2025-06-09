import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash() {
  const { hash, pathname } = useLocation();
  const lastHash = useRef('');

  useEffect(() => {
    if (hash) {
      lastHash.current = hash.slice(1);
    }
    if (lastHash.current) {
      const el = document.getElementById(lastHash.current);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          lastHash.current = '';
        }, 50);
      }
    } else if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [hash, pathname]);

  return null;
}
