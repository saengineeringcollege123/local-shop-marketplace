import mongoose, { Schema, Document } from 'mongoose';

export interface IShop extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ShopSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    }
  },
  location: {
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    mapLink: {
      type: String
    }
  }
}, {
  timestamps: true
});

export default mongoose.model<IShop>('Shop', ShopSchema);