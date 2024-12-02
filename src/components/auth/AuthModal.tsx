import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className={`bg-white rounded-xl p-8 max-w-md w-full relative ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-accent transition-colors"
          >
            <X size={20} />
          </button>
          
          <h2 className="text-2xl font-bold text-accent mb-6 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          
          <div className={`transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            {isLogin ? (
              <LoginForm 
                onToggle={() => setIsLogin(false)} 
                onSuccess={handleClose}
              />
            ) : (
              <RegisterForm 
                onToggle={() => setIsLogin(true)}
                onSuccess={handleClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;