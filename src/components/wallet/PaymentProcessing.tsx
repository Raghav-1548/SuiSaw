import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { useWalletStore } from '../../store/walletStore';

const PaymentProcessing = () => {
  const { transactions } = useWalletStore();
  const latestTransaction = transactions[0];

  if (!latestTransaction) return null;

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10 animate-fade-in">
      <div className="flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-semibold text-orange-500 mb-2">
            Processing Payment
          </h3>
          <div className="space-y-4 text-gray-300">
            <p>
              We are verifying your payment. Ensure you send SUI from the same address you provided above, 
              otherwise it will be refunded back to source.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock size={16} />
              <span>ETA: 5 minutes</span>
            </div>
            <div className="bg-black/60 rounded-lg p-4 space-y-2 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">From:</span>
                <span className="text-accent">{latestTransaction.senderAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span className="text-accent">{latestTransaction.amount} SUI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Time:</span>
                <span className="text-accent">
                  {new Date(latestTransaction.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;