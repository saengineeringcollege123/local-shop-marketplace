import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Plus, Calendar, Clock } from 'lucide-react';
import { Shop, Offer } from '../types';
import { shopAPI, offerAPI } from '../services/api';
import OfferForm from '../components/OfferForm';

const ShopDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shop, setShop] = useState<Shop | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchShopDetails(id);
    }
  }, [id]);

  const fetchShopDetails = async (shopId: string) => {
    try {
      setLoading(true);
      const [shopData, offersData] = await Promise.all([
        shopAPI.getById(shopId),
        offerAPI.getByShopId(shopId)
      ]);
      setShop(shopData);
      setOffers(offersData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch shop details');
      console.error('Error fetching shop details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOfferCreated = (newOffer: Offer) => {
    setOffers(prev => [newOffer, ...prev]);
    setShowOfferForm(false);
  };

  const isOfferActive = (offer: Offer): boolean => {
    const now = new Date();
    const startDate = new Date(offer.startDate);
    const endDate = new Date(offer.endDate);
    return offer.isActive && startDate <= now && endDate >= now;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

  if (error || !shop) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop Not Found</h2>
        <p className="text-gray-600 mb-8">{error || 'The shop you are looking for does not exist.'}</p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Shops
        </Link>
      </div>
    );
  }

  const activeOffers = offers.filter(isOfferActive);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{shop.name}</h1>
      </div>

      {/* Active Offers Banner */}
      {activeOffers.length > 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-3">🎉 Active Offers</h3>
          <div className="space-y-2">
            {activeOffers.map((offer) => (
              <div key={offer._id} className="bg-white/20 rounded-lg p-3">
                <h4 className="font-semibold">{offer.title}</h4>
                <p className="text-sm opacity-90">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shop Information */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop Information</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Address</h3>
                <p className="text-gray-600 mt-1">{shop.address}</p>
                <a
                  href={shop.location?.mapLink || getGoogleMapsUrl(shop.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600 mt-1">{shop.contact.phone}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600 mt-1">{shop.contact.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Offers & Events</h2>
          <button
            onClick={() => setShowOfferForm(true)}
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Offer
          </button>
        </div>

        {offers.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No offers yet
            </h3>
            <p className="text-gray-500">
              Add the first offer for this shop to attract more customers!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <div
                key={offer._id}
                className={`relative overflow-hidden rounded-lg border-2 p-6 ${
                  isOfferActive(offer)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                {isOfferActive(offer) && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      Active
                    </span>
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{formatDate(offer.startDate)}</span>
                  <span>→</span>
                  <span>{formatDate(offer.endDate)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Offer Form Modal */}
      {showOfferForm && (
        <OfferForm
          shopId={shop._id}
          onClose={() => setShowOfferForm(false)}
          onOfferCreated={handleOfferCreated}
        />
      )}
    </div>
  );
};

export default ShopDetail;