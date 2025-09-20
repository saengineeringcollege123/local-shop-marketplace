# Local Shop Marketplace

A full-stack web application for managing local shops and their offers, built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

### Shop Management
- ➕ Add new shops with detailed information
- 📍 Location integration with Google Maps
- 📱 Responsive shop card layouts
- 🔍 View individual shop details

### Offers/Events Management
- 🏷️ Create time-bound offers for shops
- 🎯 Visual active offer indicators
- 📅 Date validation and management
- 🎉 Active offers banner display

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **TypeScript** throughout
- **CORS** enabled for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (recommended) or local MongoDB installation

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

3. Set up environment variables:
```bash
# The backend/.env file already exists, just add your MongoDB connection string
```

4. **Important**: Add your MongoDB connection string to `backend/.env`:
```env
# Get your connection string from MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shop-marketplace
```

**To get a MongoDB connection string:**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Go to "Connect" → "Connect your application"
4. Copy the connection string and replace `<password>` with your database password
5. Add it to the `MONGODB_URI` variable in `backend/.env`

### Running the Application

#### Development Mode (Both Frontend & Backend)
```bash
npm run dev:fullstack
```

#### Frontend Only
```bash
npm run dev
```

#### Backend Only
```bash
npm run dev:backend
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Shops
- `GET /api/shops` - Get all shops
- `GET /api/shops/:id` - Get single shop with offers
- `POST /api/shops` - Create new shop
- `PUT /api/shops/:id` - Update shop
- `DELETE /api/shops/:id` - Delete shop

### Offers
- `GET /api/offers/:shopId` - Get all offers for a shop
- `GET /api/offers/active/:shopId` - Get active offers for a shop
- `POST /api/offers` - Create new offer
- `PUT /api/offers/:id` - Update offer
- `DELETE /api/offers/:id` - Delete offer

## Project Structure

```
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routes
│   │   └── server.ts       # Main server file
│   ├── package.json
│   └── tsconfig.json
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Main pages
│   ├── services/          # API integration
│   ├── types/             # TypeScript definitions
│   └── App.tsx            # Main app component
└── package.json           # Frontend dependencies
```

## Database Schema

### Shop
- `name`: String (required)
- `address`: String (required)
- `contact`: Object with phone and email
- `location`: Object with coordinates and mapLink
- `timestamps`: Auto-generated

### Offer
- `shopId`: ObjectId reference to Shop
- `title`: String (required)
- `description`: String (required)
- `startDate`: Date (required)
- `endDate`: Date (required)
- `isActive`: Boolean (default: true)
- `timestamps`: Auto-generated

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.