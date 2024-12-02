import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { walletSchema, WalletFormData } from '../../types/wallet';
import { useWalletStore } from '../../store/walletStore';
import { useAuthStore } from '../../store/authStore';
import { Copy, CheckCircle2, ExternalLink } from 'lucide-react';

const MARKETPLACE_ADDRESS = '0x04cb231d56400add4c8b81480308b5286c129afd989ea78a2927fae0a1bad7d2';
const WALLET_URL = 'chrome-extension://opcgpfmipidbgpenhmajoajpbobppdil/ui.html#/tokens';

const AddFundsForm = () => {
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addTransaction, setProcessing, addBalance } = useWalletStore();
  const { user } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<WalletFormData>({
    resolver: zodResolver(walletSchema)
  });

  const amount = watch('amount');

  const copyAddress = () => {
    navigator.clipboard.writeText(MARKETPLACE_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (data: WalletFormData) => {
    if (!user) return;
    
    setShowSuccess(true);
    setProcessing(true);
    
    addBalance(data.amount);
    
    addTransaction({
      amount: data.amount,
      timestamp: Date.now(),
      status: 'pending',
      senderAddress: user.suiAddress,
    });
  };

  if (showSuccess) {
    return (
      <div className="text-center">
        <div className="mb-8 transform animate-success-scale">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full scale-150 animate-pulse" />
            <CheckCircle2 className="w-24 h-24 mx-auto text-green-500 relative z-10" />
          </div>
        </div>
        <h3 className="text-2xl font-semibold text-green-500 mb-4 animate-fade-in">
          Balance Updated!
        </h3>
        <p className="text-gray-400 mb-6 animate-fade-in">
          Please complete your payment of {amount} SUI
        </p>
        <a
          href={WALLET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all duration-300 animate-fade-in"
        >
          <span>Make Payment</span>
          <ExternalLink size={18} />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Marketplace Address
        </label>
        <div className="flex items-center gap-2">
          <code className="flex-1 block p-3 bg-black/40 rounded-lg border border-accent/20 text-gray-300 font-mono text-sm break-all">
            {MARKETPLACE_ADDRESS}
          </code>
          <button
            type="button"
            onClick={copyAddress}
            className="p-3 text-accent hover:text-accent-hover transition-colors"
            title="Copy address"
          >
            <Copy size={20} />
          </button>
        </div>
        {copied && (
          <p className="mt-1 text-sm text-green-500 animate-fade-in">
            Address copied to clipboard!
          </p>
        )}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-200 mb-2">
          Amount (SUI)
        </label>
        <input
          {...register('amount', { valueAsNumber: true })}
          type="number"
          step="0.1"
          className="block w-full p-3 bg-black/40 rounded-lg border border-accent/20 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
          placeholder="Enter amount"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-500 animate-fade-in">
            {errors.amount.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all duration-300"
      >
        Confirm
      </button>
    </form>
  );
};

export default AddFundsForm;