import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useWalletStore } from '../store/walletStore';
import AddFundsForm from '../components/wallet/AddFundsForm';
import PaymentProcessing from '../components/wallet/PaymentProcessing';
import TransactionHistory from '../components/wallet/TransactionHistory';
import { Wallet } from 'lucide-react';

const WalletPage = () => {
  const { isAuthenticated } = useAuthStore();
  const { balance, isProcessing } = useWalletStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <Wallet className="w-8 h-8 text-accent" />
          <h1 className="text-4xl font-bold text-accent">Wallet</h1>
        </div>

        <div className="mb-8 p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-accent/10 animate-fade-in">
          <div className="text-center">
            <div className="text-gray-400 mb-2">Current Balance</div>
            <div className="text-4xl font-bold text-accent">
              {balance.toFixed(2)} SUI
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10 animate-fade-in">
            <h2 className="text-xl font-semibold text-accent mb-6">Add Funds</h2>
            <AddFundsForm />
          </div>

          {isProcessing && <PaymentProcessing />}

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10 animate-fade-in">
            <h2 className="text-xl font-semibold text-accent mb-6">Transaction History</h2>
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;