import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UploadPage from './components/upload/UploadPage';
import FeaturedPage from './pages/FeaturedPage';
import WalletPage from './pages/WalletPage';
import LLMChatPage from './pages/LLMChatPage';
import UserRentalsPage from './pages/UserRentalsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SuiExplorer from './components/SuiExplorer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/llm-chat" element={<LLMChatPage />} />
          <Route path="/rentals" element={<UserRentalsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
        <SuiExplorer />
      </div>
    </Router>
  );
}

export default App;