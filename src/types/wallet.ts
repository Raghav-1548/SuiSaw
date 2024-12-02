import { z } from 'zod';

export const walletSchema = z.object({
  amount: z.number()
    .min(0.1, 'Minimum amount is 0.1 SUI')
    .max(1000, 'Maximum amount is 1000 SUI')
});

export type WalletFormData = z.infer<typeof walletSchema>;

export interface Transaction {
  id: string;
  amount: number;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  senderAddress: string;
}

export interface WalletState {
  balance: number;
  transactions: Transaction[];
  isProcessing: boolean;
}