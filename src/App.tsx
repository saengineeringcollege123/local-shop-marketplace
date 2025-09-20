import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ShopList from './pages/ShopList';
import ShopDetail from './pages/ShopDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ShopList />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;