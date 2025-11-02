export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Africhicken Rwanda
          </h1>
          <p className="text-xl text-orange-500 font-semibold">
            Innovative Poultry in Rwanda
          </p>
        </div>

        <div className="bg-black rounded-2xl p-8 md:p-12 shadow-2xl mb-12">
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Africhicken Rwanda is revolutionizing the poultry industry in Rwanda by providing
            fresh, affordable, and hygienically processed chicken meat to Rwandan families.
            We are committed to delivering premium quality products that meet the highest
            standards of food safety and nutrition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-50 p-8 rounded-xl border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To make fresh, high-quality chicken accessible to every Rwandan household
              while maintaining sustainable and ethical farming practices.
            </p>
          </div>

          <div className="bg-orange-50 p-8 rounded-xl border-l-4 border-orange-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To become Rwanda's most trusted name in poultry, known for quality,
              freshness, and customer satisfaction.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Values</h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex gap-4">
              <span className="text-orange-500 font-bold text-xl">•</span>
              <span><strong>Quality:</strong> We never compromise on the quality of our products</span>
            </li>
            <li className="flex gap-4">
              <span className="text-orange-500 font-bold text-xl">•</span>
              <span><strong>Affordability:</strong> Premium quality at prices every family can afford</span>
            </li>
            <li className="flex gap-4">
              <span className="text-orange-500 font-bold text-xl">•</span>
              <span><strong>Sustainability:</strong> Environmentally responsible practices</span>
            </li>
            <li className="flex gap-4">
              <span className="text-orange-500 font-bold text-xl">•</span>
              <span><strong>Customer Focus:</strong> Your satisfaction is our priority</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
