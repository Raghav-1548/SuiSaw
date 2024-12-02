import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import AuthModal from '../auth/AuthModal';
import UploadForm from './UploadForm';

const UploadPage = () => {
  const { isAuthenticated } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = React.useState(!isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    setShowAuthModal(!isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-accent mb-8 animate-slide-up">
          Upload Your Model
        </h1>
        
        {isAuthenticated ? (
          <UploadForm onSuccess={() => navigate('/featured')} />
        ) : (
          <AuthModal 
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default UploadPage;