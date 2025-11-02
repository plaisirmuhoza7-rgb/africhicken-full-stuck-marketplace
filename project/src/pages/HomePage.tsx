import { ShoppingCart, Shield, Truck, Award, Phone, Mail, MapPin } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-85"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Fresh, Healthy & Affordable<br /> Chicken Meat
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Premium quality chicken delivered to your doorstep
          </p>
          <button
            onClick={() => onNavigate('marketplace')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </button>
        </div>
      </section>

      <section className="py-16 bg-gray-50" id="about">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">who we are</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Africhicken Rwanda is your trusted source for fresh, high-quality raw chicken meat.
              We are committed to providing healthy and affordable chicken products to families
              across Rwanda.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our chickens are carefully raised and processed to meet the highest standards of
              quality and food safety. We believe everyone deserves access to nutritious,
              affordable protein for their families.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" id="why-choose-us">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Assured</h3>
              <p className="text-gray-600">
                Fresh and healthy chicken meat that meets the highest quality standards
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Affordable Prices</h3>
              <p className="text-gray-600">
                Competitive pricing that makes quality chicken accessible to everyone
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery service right to your doorstep
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Ordering</h3>
              <p className="text-gray-600">
                Simple ordering process via WhatsApp or our online platform
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" id="contact">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">+250 732 336 152</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">africhicken.rwanda@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Location</h3>
                    <p className="text-gray-600">Nyagatare, Rwanda</p>
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href="https://wa.me/250732336152?text=Hello%20Africhicken,%20I%20have%20a%20question"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
