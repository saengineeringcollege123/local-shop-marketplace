import { Shop, Offer, CreateShopData, CreateOfferData } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

export const shopAPI = {
  // Get all shops
  getAll: (): Promise<Shop[]> => apiCall('/shops'),
  
  // Get single shop with offers
  getById: (id: string): Promise<Shop> => apiCall(`/shops/${id}`),
  
  // Create new shop
  create: (shopData: CreateShopData): Promise<Shop> => 
    apiCall('/shops', {
      method: 'POST',
      body: JSON.stringify(shopData),
    }),
  
  // Update shop
  update: (id: string, shopData: Partial<CreateShopData>): Promise<Shop> =>
    apiCall(`/shops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(shopData),
    }),
  
  // Delete shop
  delete: (id: string): Promise<{ message: string }> =>
    apiCall(`/shops/${id}`, {
      method: 'DELETE',
    }),
};

export const offerAPI = {
  // Get all offers for a shop
  getByShopId: (shopId: string): Promise<Offer[]> => apiCall(`/offers/${shopId}`),
  
  // Get active offers for a shop
  getActiveByShopId: (shopId: string): Promise<Offer[]> => apiCall(`/offers/active/${shopId}`),
  
  // Create new offer
  create: (offerData: CreateOfferData): Promise<Offer> =>
    apiCall('/offers', {
      method: 'POST',
      body: JSON.stringify(offerData),
    }),
  
  // Update offer
  update: (id: string, offerData: Partial<CreateOfferData>): Promise<Offer> =>
    apiCall(`/offers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(offerData),
    }),
  
  // Delete offer
  delete: (id: string): Promise<{ message: string }> =>
    apiCall(`/offers/${id}`, {
      method: 'DELETE',
    }),
};