import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelUploadSchema, ModelUploadFormData } from '../../types/model';
import { useModelStore } from '../../store/modelStore';
import { useAuthStore } from '../../store/authStore';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import UploadTypeSelector from './UploadTypeSelector';
import DirectModelFields from './DirectModelFields';
import HostedModelFields from './HostedModelFields';
import CommonFields from './CommonFields';

interface UploadFormProps {
  onSuccess: () => void;
}

const COMMISSION_RATE = 0.06; // 6% commission

const UploadForm = ({ onSuccess }: UploadFormProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCommissionWarning, setShowCommissionWarning] = useState(false);
  const { uploadModel, isUploading } = useModelStore();
  const { user } = useAuthStore();
  const [uploadType, setUploadType] = useState<'direct' | 'hosted'>('direct');

  const form = useForm<ModelUploadFormData>({
    resolver: zodResolver(modelUploadSchema),
    defaultValues: {
      uploadType: 'direct',
      modelName: '',
      modelDescription: '',
      pricePerHour: 1,
    }
  });

  const pricePerHour = form.watch('pricePerHour');
  const commissionAmount = pricePerHour * COMMISSION_RATE;
  const finalEarnings = pricePerHour - commissionAmount;

  const onSubmit = async (data: ModelUploadFormData) => {
    try {
      if (!user) return;
      if (!showCommissionWarning) {
        setShowCommissionWarning(true);
        return;
      }
      await uploadModel(data, user.suiAddress);
      setIsSuccess(true);
      setTimeout(onSuccess, 1500);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-success-scale">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
        <h3 className="text-2xl font-semibold text-green-500">Upload Successful!</h3>
        <p className="text-gray-400 mt-2">Redirecting to Featured Models...</p>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
      <UploadTypeSelector 
        value={uploadType} 
        onChange={(type) => {
          setUploadType(type);
          form.setValue('uploadType', type);
        }} 
      />

      <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-accent/10">
        <CommonFields form={form} />
        
        {uploadType === 'direct' ? (
          <DirectModelFields form={form} />
        ) : (
          <HostedModelFields form={form} />
        )}

        {pricePerHour > 0 && (
          <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/10">
            <h4 className="text-sm font-medium text-accent mb-3">Commission Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Your Rate:</span>
                <span className="text-accent">{pricePerHour.toFixed(2)} SUI/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Platform Commission (6%):</span>
                <span className="text-accent">-{commissionAmount.toFixed(2)} SUI/hr</span>
              </div>
              <div className="border-t border-accent/10 pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-400">Your Final Earnings:</span>
                  <span className="text-accent">{finalEarnings.toFixed(2)} SUI/hr</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {showCommissionWarning && (
          <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/10 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-400">
                By proceeding, you agree to the 6% commission fee on your hourly rate. 
                This fee helps maintain and improve the platform for all users.
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isUploading}
          className="mt-8 w-full rounded-md bg-accent py-3 px-4 text-white hover:bg-accent-hover transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Uploading Model...</span>
            </>
          ) : showCommissionWarning ? (
            'Confirm Upload'
          ) : (
            'Review Commission & Upload'
          )}
        </button>
      </div>
    </form>
  );
};

export default UploadForm;