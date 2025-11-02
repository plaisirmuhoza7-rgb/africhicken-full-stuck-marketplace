import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>

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
            </div>

            <div className="mt-8 pt-8 border-t">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="text-green-500" />
                Quick Contact
              </h3>
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

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Business Hours</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="font-semibold">Monday - Friday</span>
                <span className="text-gray-600">6:00 AM - 9:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <span className="font-semibold">Saturday</span>
                <span className="text-gray-600">7:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <span className="font-semibold">Sunday</span>
                <span className="text-gray-600">7:00 AM - 8:00 PM</span>
              </div>
            </div>

            <div className="mt-8 bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Why Contact Us?</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Bulk order inquiries</li>
                <li>• Custom delivery arrangements</li>
                <li>• Product availability questions</li>
                <li>• Payment assistance</li>
                <li>• General inquiries</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
