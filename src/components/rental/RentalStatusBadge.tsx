import React from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

interface RentalStatusBadgeProps {
  status: 'active' | 'completed' | 'failed';
}

const RentalStatusBadge = ({ status }: RentalStatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          icon: Clock,
          text: 'Active',
          className: 'bg-green-500/10 text-green-500',
        };
      case 'completed':
        return {
          icon: CheckCircle2,
          text: 'Completed',
          className: 'bg-accent/10 text-accent',
        };
      case 'failed':
        return {
          icon: XCircle,
          text: 'Failed',
          className: 'bg-red-500/10 text-red-500',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.className}`}>
      <Icon size={14} />
      <span className="text-sm font-medium">{config.text}</span>
    </div>
  );
};

export default RentalStatusBadge;