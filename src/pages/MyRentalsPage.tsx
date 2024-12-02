import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import RentalsList from '../components/rental/RentalsList';
import { Clock } from 'lucide-react';

const MyRentalsPage = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <Clock className="w-8 h-8 text-accent" />
          <h1 className="text-4xl font-bold text-accent">My Rentals</h1>
        </div>
        
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10">
          <RentalsList userId={user.suiAddress} />
        </div>
      </div>
    </div>
  );
};

export default MyRentalsPage;