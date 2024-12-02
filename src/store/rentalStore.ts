import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Rental } from '../types/rental';
import { useWalletStore } from './walletStore';
import { useAuthStore } from './authStore';

interface RentalStore {
  rentals: Rental[];
  isRenting: boolean;
  rentModel: (modelId: string, pricePerHour: number) => Promise<Rental>;
  getUserRentals: (userId: string) => Rental[];
  endRental: (rentalId: string) => void;
}

export const useRentalStore = create<RentalStore>()(
  persist(
    (set, get) => ({
      rentals: [],
      isRenting: false,

      rentModel: async (modelId: string, pricePerHour: number) => {
        const walletStore = useWalletStore.getState();
        const authStore = useAuthStore.getState();

        if (!authStore.user) {
          throw new Error('User not authenticated');
        }

        if (walletStore.balance < pricePerHour) {
          throw new Error('Insufficient balance');
        }

        set({ isRenting: true });

        try {
          // Deduct balance
          walletStore.addBalance(-pricePerHour);

          // Create rental record
          const rental: Rental = {
            id: crypto.randomUUID(),
            modelId,
            userId: authStore.user.suiAddress,
            startTime: Date.now(),
            endTime: null,
            pricePerHour,
            status: 'active',
          };

          // Add transaction record
          walletStore.addTransaction({
            amount: -pricePerHour,
            timestamp: Date.now(),
            status: 'completed',
            senderAddress: authStore.user.suiAddress,
          });

          // Update rentals state
          set((state) => ({
            rentals: [rental, ...state.rentals].sort((a, b) => b.startTime - a.startTime),
          }));

          return rental;
        } finally {
          set({ isRenting: false });
        }
      },

      getUserRentals: (userId: string) => {
        return get().rentals.filter(rental => rental.userId === userId);
      },

      endRental: (rentalId: string) => {
        set((state) => ({
          rentals: state.rentals.map(rental =>
            rental.id === rentalId
              ? { ...rental, endTime: Date.now(), status: 'completed' }
              : rental
          ),
        }));
      },
    }),
    {
      name: 'rental-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            rentals: Array.isArray(persistedState.rentals) ? persistedState.rentals : [],
          };
        }
        return persistedState as RentalStore;
      },
    }
  )
);