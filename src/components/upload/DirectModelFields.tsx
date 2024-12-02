import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ModelUploadFormData } from '../../types/model';

interface DirectModelFieldsProps {
  form: UseFormReturn<ModelUploadFormData>;
}

const DirectModelFields = ({ form }: DirectModelFieldsProps) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6 mt-6">
      <div>
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-200">
          API Key
        </label>
        <input
          {...register('apiKey')}
          type="password"
          className="mt-1 block w-full rounded-md border border-accent/20 bg-black/60 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
          placeholder="Enter your API key"
        />
        {errors.apiKey && (
          <p className="mt-1 text-sm text-red-500">{errors.apiKey.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="systemInstructions" className="block text-sm font-medium text-gray-200">
          System Instructions
        </label>
        <textarea
          {...register('systemInstructions')}
          rows={4}
          className="mt-1 block w-full rounded-md border border-accent/20 bg-black/60 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
          placeholder="Enter system instructions for your model"
        />
        {errors.systemInstructions && (
          <p className="mt-1 text-sm text-red-500">{errors.systemInstructions.message}</p>
        )}
      </div>
    </div>
  );
};

export default DirectModelFields;