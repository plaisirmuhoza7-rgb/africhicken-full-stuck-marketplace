import { ShoppingCart } from 'lucide-react';

interface MarketplacePageProps {
  onNavigate: (page: string, product?: Product) => void;
}

export interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Economy package',
    weight: '0.5 kg',
    price: 2500,
    image:'/Screenshot 2025-10-23 151611.png',
  },
  {
    id: '2',
    name: 'Standard package',
    weight: '1 kg',
    price: 4000,
   image: '/Screenshot 2025-10-23 151611.png',
  },
  {
    id: '3',
    name: 'Premium package',
    weight: '2 kg',
    price: 7500,
    image:'/Screenshot 2025-10-23 151611.png',

  },
];

export default function MarketplacePage({ onNavigate }: MarketplacePageProps) {
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Our Products</h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Choose from our selection of fresh, quality chicken meat
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-lg">{product.weight}</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-orange-500">
                    {product.price.toLocaleString()} RWF
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('checkout', product)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart size={20} />
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
