import { Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-black text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-orange-500 mb-4">Africhicken Rwanda</h3>
            <p className="text-sm sm:text-base text-gray-300">
              Fresh, healthy, and affordable raw chicken meat delivered to your doorstep.
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-base sm:text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-orange-500 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="hover:text-orange-500 transition-colors cursor-pointer"
                >
                  Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-orange-500 transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-orange-500 transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left lg:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm sm:text-base text-gray-300">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Phone size={18} className="text-orange-500 flex-shrink-0" />
                <span>0732 336 152</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                <span className="break-all">africhicken.rwanda@gmail.com</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin size={18} className="text-orange-500 flex-shrink-0" />
                <span>Nyagatare, Rwanda</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm sm:text-base text-gray-400">
          <p>&copy; {new Date().getFullYear()} Africhicken Rwanda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
