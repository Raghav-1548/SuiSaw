import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle2, Upload, ChevronDown, LogOut, Wallet, History, Bot, BarChart2 } from 'lucide-react';
import Logo from './Logo';
import AuthModal from './auth/AuthModal';
import { useAuthStore } from '../store/authStore';
import { useWalletStore } from '../store/walletStore';
import { useRentalStore } from '../store/rentalStore';
import { useModelStore } from '../store/modelStore';
import RentalPreview from './rental/RentalPreview';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { balance } = useWalletStore();
  const { getUserRentals } = useRentalStore();
  const { models } = useModelStore();
  const navigate = useNavigate();

  const rentals = user ? getUserRentals(user.suiAddress).slice(0, 3) : [];
  const hasActiveRentals = rentals.some(rental => rental.status === 'active');

  const handleUploadClick = () => {
    if (isAuthenticated) {
      navigate('/upload');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <nav className="fixed w-full bg-black/80 backdrop-blur-md border-b border-accent/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/">
                <Logo />
              </Link>
              <Link 
                to="/analytics" 
                className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
              >
                <BarChart2 size={20} />
                <span>Analytics</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={handleUploadClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white hover:bg-accent-hover transition-all duration-300 hover:scale-105 transform"
              >
                <Upload size={18} />
                <span>Upload Model</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => isAuthenticated ? setIsMenuOpen(!isMenuOpen) : setIsAuthModalOpen(true)}
                  className="flex items-center gap-3 text-accent hover:text-accent-hover transition-colors"
                >
                  <UserCircle2 size={24} />
                  {isAuthenticated ? (
                    <>
                      <span>{user?.username}</span>
                      {balance > 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-full">
                          <Wallet size={14} className="text-accent" />
                          <span className="text-sm font-medium text-accent">
                            {balance.toFixed(2)} SUI
                          </span>
                        </div>
                      )}
                      {hasActiveRentals && (
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      )}
                      <ChevronDown 
                        size={16} 
                        className={`transform transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
                      />
                    </>
                  ) : (
                    <span>Login</span>
                  )}
                </button>

                {isMenuOpen && isAuthenticated && (
                  <div className="absolute right-0 mt-2 w-80 bg-black/90 rounded-lg shadow-lg py-2 border border-accent/10 animate-fade-in">
                    {rentals.length > 0 && (
                      <>
                        <div className="px-4 py-2">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-accent">Recent Rentals</h3>
                            <Link 
                              to="/rentals"
                              className="text-xs text-accent hover:text-accent-hover transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              View All
                            </Link>
                          </div>
                          <div className="space-y-2">
                            {rentals.map((rental) => {
                              const model = models.find(m => m.modelId === rental.modelId);
                              if (!model) return null;
                              return (
                                <RentalPreview 
                                  key={rental.id} 
                                  rental={rental} 
                                  model={model} 
                                />
                              );
                            })}
                          </div>
                        </div>
                        <div className="border-t border-accent/10 my-2" />
                      </>
                    )}

                    <Link 
                      to="/wallet" 
                      className="flex items-center gap-2 px-4 py-2 text-accent hover:bg-accent/5 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Wallet size={16} />
                      <span>Wallet</span>
                    </Link>
                    <Link 
                      to="/rentals" 
                      className="flex items-center gap-2 px-4 py-2 text-accent hover:bg-accent/5 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <History size={16} />
                      <span>Rental History</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;