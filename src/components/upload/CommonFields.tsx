import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ModelUploadFormData } from '../../types/model';

interface CommonFieldsProps {
  form: UseFormReturn<ModelUploadFormData>;
}

const CommonFields = ({ form }: CommonFieldsProps) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="modelName" className="block text-sm font-medium text-gray-200">
          Model Name
        </label>
        <input
          {...register('modelName')}
          type="text"
          className="mt-1 block w-full rounded-md border border-accent/20 bg-black/60 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
          placeholder="Enter your model's name"
        />
        {errors.modelName && (
          <p className="mt-1 text-sm text-red-500">{errors.modelName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="modelDescription" className="block text-sm font-medium text-gray-200">
          Model Description
        </label>
        <textarea
          {...register('modelDescription')}
          rows={4}
          className="mt-1 block w-full rounded-md border border-accent/20 bg-black/60 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
          placeholder="Describe your model's capabilities and use cases (min 50 characters)"
        />
        {errors.modelDescription && (
          <p className="mt-1 text-sm text-red-500">{errors.modelDescription.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-200">
          Price per Hour (SUI)
        </label>
        <input
          {...register('pricePerHour', { valueAsNumber: true })}
          type="number"
          step="0.1"
          className="mt-1 block w-full rounded-md border border-accent/20 bg-black/60 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
          placeholder="1.0"
        />
        {errors.pricePerHour && (
          <p className="mt-1 text-sm text-red-500">{errors.pricePerHour.message}</p>
        )}
      </div>
    </div>
  );
};

export default CommonFields;