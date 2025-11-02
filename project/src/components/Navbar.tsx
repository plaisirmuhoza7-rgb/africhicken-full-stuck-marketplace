import { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigate('home')}
          >
            <ShoppingBag className="text-orange-500" size={32} />
            <span className="text-2xl font-bold">Africhicken</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <button
              onClick={() => handleNavigate('home')}
              className={`hover:text-orange-500 transition-colors ${
                currentPage === 'home' ? 'text-orange-500' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className={`hover:text-orange-500 transition-colors ${
                currentPage === 'about' ? 'text-orange-500' : ''
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigate('marketplace')}
              className={`hover:text-orange-500 transition-colors ${
                currentPage === 'marketplace' ? 'text-orange-500' : ''
              }`}
            >
              Marketplace
            </button>
            <button
              onClick={() => handleNavigate('contact')}
              className={`hover:text-orange-500 transition-colors ${
                currentPage === 'contact' ? 'text-orange-500' : ''
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => handleNavigate('admin')}
              className={`hover:text-orange-500 transition-colors ${
                currentPage === 'admin' ? 'text-orange-500' : ''
              }`}
            >
              Admin
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white hover:text-orange-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <button
              onClick={() => handleNavigate('home')}
              className={`block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors ${
                currentPage === 'home' ? 'bg-gray-800 text-orange-500' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className={`block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors ${
                currentPage === 'about' ? 'bg-gray-800 text-orange-500' : ''
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigate('marketplace')}
              className={`block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors ${
                currentPage === 'marketplace' ? 'bg-gray-800 text-orange-500' : ''
              }`}
            >
              Marketplace
            </button>
            <button
              onClick={() => handleNavigate('contact')}
              className={`block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors ${
                currentPage === 'contact' ? 'bg-gray-800 text-orange-500' : ''
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => handleNavigate('admin')}
              className={`block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors ${
                currentPage === 'admin' ? 'bg-gray-800 text-orange-500' : ''
              }`}
            >
              Admin
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
