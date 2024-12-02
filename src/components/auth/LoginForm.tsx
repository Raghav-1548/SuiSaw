import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../../utils/validation';
import { useAuthStore } from '../../store/authStore';
import { AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

const LoginForm = ({ onToggle, onSuccess }: { onToggle: () => void; onSuccess: () => void }) => {
  const { register, handleSubmit, formState: { errors }, setError: setFormError } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });
  const { login, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await login(data);
      setIsSuccess(true);
      // Instead of reloading, close the modal
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid credentials. Please try again.');
      const formElement = document.querySelector('form');
      if (formElement) {
        formElement.classList.add('animate-shake');
        setTimeout(() => {
          formElement.classList.remove('animate-shake');
        }, 500);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 animate-success-scale">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold text-green-600">Login Successful!</h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center gap-2 text-red-600 animate-fade-in">
          <AlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="suiAddress" className="block text-sm font-medium text-gray-700">
          SUI Wallet Address
        </label>
        <input
          {...register('suiAddress')}
          type="text"
          className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 transition-all duration-300 ${
            errors.suiAddress 
              ? 'border-red-300 focus:border-red-300 focus:ring-red-200' 
              : 'border-accent/20 focus:border-accent focus:ring-accent'
          }`}
          placeholder="0x..."
        />
        {errors.suiAddress && (
          <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.suiAddress.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 transition-all duration-300 ${
            errors.password 
              ? 'border-red-300 focus:border-red-300 focus:ring-red-200' 
              : 'border-accent/20 focus:border-accent focus:ring-accent'
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-accent py-2 px-4 text-white hover:bg-accent-hover transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Logging in...</span>
          </>
        ) : (
          'Login'
        )}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onToggle}
          className="text-accent hover:text-accent-hover transition-colors duration-300"
        >
          Register
        </button>
      </p>
    </form>
  );
};

export default LoginForm;