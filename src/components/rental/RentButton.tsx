import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useRentalStore } from '../../store/rentalStore';
import { useWalletStore } from '../../store/walletStore';

interface RentButtonProps {
  modelId: string;
  pricePerHour: number;
}

const RentButton = ({ modelId, pricePerHour }: RentButtonProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { balance } = useWalletStore();
  const { rentModel, isRenting } = useRentalStore();
  const [error, setError] = useState<string | null>(null);

  const handleRent = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setError(null);
      await rentModel(modelId, pricePerHour);
      navigate(`/llm-chat?modelId=${modelId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rent model');
    }
  };

  if (error) {
    return (
      <div className="text-center">
        <button
          onClick={handleRent}
          className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg w-full hover:bg-red-500/20 transition-colors duration-300"
        >
          {error}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleRent}
      disabled={isRenting}
      className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {isRenting ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        'Rent Model'
      )}
    </button>
  );
};

export default RentButton;