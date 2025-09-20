import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { Shop } from '../types';
import { shopAPI } from '../services/api';
import ShopForm from '../components/ShopForm';

const ShopList: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const data = await shopAPI.getAll();
      setShops(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch shops. Please make sure the backend server is running.');
      console.error('Error fetching shops:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShopCreated = (newShop: Shop) => {
    setShops(prev => [newShop, ...prev]);
    setShowForm(false);
  };

  const getGoogleMapsUrl = (address: string) => {
    return `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Local Shop Marketplace
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover local shops and their amazing offers
        </p>
        
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Shop
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {shops.length === 0 && !loading ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <Store className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No shops yet
          </h3>
          <p className="text-gray-500">
            Be the first to add a local shop to the marketplace!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <div
              key={shop._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {shop.name}
                  </h3>
                  <Link
                    to={`/shop/${shop._id}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{shop.address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{shop.contact.phone}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{shop.contact.email}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    to={`/shop/${shop._id}`}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                  
                  <a
                    href={shop.location?.mapLink || getGoogleMapsUrl(shop.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <ShopForm
          onClose={() => setShowForm(false)}
          onShopCreated={handleShopCreated}
        />
      )}
    </div>
  );
};

export default ShopList;