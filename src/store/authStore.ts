import { create } from 'zustand';
import { AuthStore, Credentials } from '../types/auth';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (credentials: Credentials) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would be an actual API call
      const storedUser = localStorage.getItem(credentials.suiAddress);
      if (!storedUser) {
        throw new Error('User not found. Please check your wallet address.');
      }

      const userData = JSON.parse(storedUser);
      if (userData.password !== credentials.password) {
        throw new Error('Invalid password. Please try again.');
      }

      const user = {
        suiAddress: credentials.suiAddress,
        username: userData.username,
        models: userData.models || [],
        rentals: userData.rentals || [],
      };

      set({
        user,
        isAuthenticated: true,
      });

      return user;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  register: async (credentials) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (localStorage.getItem(credentials.suiAddress)) {
        throw new Error('This wallet address is already registered.');
      }

      const userData = {
        username: credentials.username,
        password: credentials.password,
        models: [],
        rentals: [],
      };

      // Store user data (in production, this would be in a secure database)
      localStorage.setItem(credentials.suiAddress, JSON.stringify(userData));

      const user = {
        suiAddress: credentials.suiAddress,
        username: credentials.username,
        models: [],
        rentals: [],
      };

      set({
        user,
        isAuthenticated: true,
      });

      return user;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));