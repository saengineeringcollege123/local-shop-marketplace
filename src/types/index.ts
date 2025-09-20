export interface Shop {
  _id: string;
  name: string;
  address: string;
  contact: {
    phone: string;
    email: string;
  };
  location: {
    coordinates?: [number, number];
    mapLink?: string;
  };
  createdAt: string;
  updatedAt: string;
  offers?: Offer[];
}

export interface Offer {
  _id: string;
  shopId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateShopData {
  name: string;
  address: string;
  contact: {
    phone: string;
    email: string;
  };
  location: {
    coordinates?: [number, number];
    mapLink?: string;
  };
}

export interface CreateOfferData {
  shopId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}