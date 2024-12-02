import { z } from 'zod';

export interface Rental {
  id: string;
  modelId: string;
  userId: string;
  startTime: number;
  endTime: number | null;
  pricePerHour: number;
  status: 'active' | 'completed' | 'failed';
}

export const rentalSchema = z.object({
  modelId: z.string().min(1, 'Model ID is required'),
  userId: z.string().min(1, 'User ID is required'),
  pricePerHour: z.number().min(0.1, 'Price must be at least 0.1 SUI'),
});