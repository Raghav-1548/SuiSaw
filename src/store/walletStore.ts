import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WalletState, Transaction } from '../types/wallet';

interface WalletStore extends WalletState {
  addBalance: (amount: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  setProcessing: (isProcessing: boolean) => void;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      balance: 0,
      transactions: [],
      isProcessing: false,

      addBalance: (amount) => {
        set((state) => ({
          balance: state.balance + amount,
        }));
      },

      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      setProcessing: (isProcessing) => {
        set({ isProcessing });
      },
    }),
    {
      name: 'wallet-storage',
    }
  )
);