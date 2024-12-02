import { create } from 'zustand';
import { Model, ModelUploadFormData } from '../types/model';

interface ModelState {
  models: Model[];
  isUploading: boolean;
  uploadModel: (data: ModelUploadFormData, uploaderAddress: string) => Promise<Model>;
  getUserModels: (address: string) => Model[];
}

export const useModelStore = create<ModelState>((set, get) => ({
  models: JSON.parse(localStorage.getItem('models') || '[]'),
  isUploading: false,

  uploadModel: async (data, uploaderAddress) => {
    set({ isUploading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const model: Model = {
        modelId: crypto.randomUUID(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        uploaderAddress,
        status: 'active',
        ...data,
      };

      const models = [...get().models, model];
      localStorage.setItem('models', JSON.stringify(models));
      set({ models });

      return model;
    } finally {
      set({ isUploading: false });
    }
  },

  getUserModels: (address) => {
    return get().models.filter(model => model.uploaderAddress === address);
  },
}));