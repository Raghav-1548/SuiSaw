import React from 'react';
import { useWalletStore } from '../../store/walletStore';
import { Clock, ArrowUpRight, CheckCircle2, XCircle } from 'lucide-react';

const TransactionHistory = () => {
  const { transactions } = useWalletStore();

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-accent/10 flex items-center justify-between animate-fade-in"
        >
          <div className="flex items-center gap-4">
            {tx.status === 'pending' && (
              <Clock className="w-5 h-5 text-orange-500" />
            )}
            {tx.status === 'completed' && (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
            {tx.status === 'failed' && (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-accent font-medium">{tx.amount} SUI</span>
                <ArrowUpRight size={14} className="text-gray-400" />
              </div>
              <div className="text-sm text-gray-400">
                {new Date(tx.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-mono text-gray-400">
              {tx.senderAddress.slice(0, 6)}...{tx.senderAddress.slice(-4)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;