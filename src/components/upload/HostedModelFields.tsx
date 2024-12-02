import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ModelUploadFormData } from '../../types/model';

interface HostedModelFieldsProps {
  form: UseFormReturn<ModelUploadFormData>;
}

const HostedModelFields = ({ form }: HostedModelFieldsProps) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6 mt-6">
      <div>
        <label htmlFor="modelUrl" className="block text-sm font-medium text-gray-200">
          Model URL
        </label>
        <input
          {...register('modelUrl')}
          type="url"
          className="mt-1 block w-full rounded-md border border-accent/20 bg-black/60 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
          placeholder="https://api.example.com/model"
        />
        {errors.modelUrl && (
          <p className="mt-1 text-sm text-red-500">{errors.modelUrl.message}</p>
        )}
      </div>
    </div>
  );
};

export default HostedModelFields;