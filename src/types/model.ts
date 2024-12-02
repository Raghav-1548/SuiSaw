import { z } from 'zod';

export const modelUploadSchema = z.object({
  modelName: z.string()
    .min(1, 'Model name is required')
    .max(50, 'Model name must not exceed 50 characters'),
  modelDescription: z.string()
    .min(50, 'Description must be at least 50 characters')
    .max(500, 'Description must not exceed 500 characters'),
  pricePerHour: z.number()
    .min(0.1, 'Price must be at least 0.1 SUI')
    .max(1000, 'Price cannot exceed 1000 SUI'),
  uploadType: z.enum(['direct', 'hosted']),
  apiKey: z.string().optional(),
  systemInstructions: z.string()
    .max(1000, 'System instructions must not exceed 1000 characters')
    .optional(),
  modelUrl: z.string().url('Please enter a valid URL').optional(),
});

export type ModelUploadFormData = z.infer<typeof modelUploadSchema>;

export interface Model {
  modelId: string;
  createdAt: number;
  updatedAt: number;
  uploaderAddress: string;
  modelName: string;
  modelDescription: string;
  systemInstructions?: string;
  apiKey?: string;
  modelUrl?: string;
  pricePerHour: number;
  status: 'active' | 'inactive';
}