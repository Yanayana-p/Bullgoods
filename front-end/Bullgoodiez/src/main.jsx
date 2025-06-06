import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ProductProvider } from './context/ProductContext'; // ✅ import context

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider> {/* ✅ wrap App with ProductProvider */}
      <App />
    </ProductProvider>
  </StrictMode>
);
