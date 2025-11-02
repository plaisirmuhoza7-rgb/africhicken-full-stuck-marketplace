import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import CheckoutPage from './pages/CheckoutPage';
import AboutUsPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import type { Product } from './pages/MarketplacePage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleNavigate = (page: string, product?: Product) => {
    setCurrentPage(page);
    if (product) {
      setSelectedProduct(product);
    }
    window.scrollTo(0, 0);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

        <main className="flex-grow">
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === 'marketplace' && <MarketplacePage onNavigate={handleNavigate} />}
          {currentPage === 'checkout' && selectedProduct && (
            <CheckoutPage product={selectedProduct} onNavigate={handleNavigate} />
          )}
          {currentPage === 'about' && <AboutUsPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'admin' && <AdminPage />}
        </main>

        {currentPage !== 'admin' && <Footer onNavigate={handleNavigate} />}
      </div>
    </AuthProvider>
  );
}

export default App;
