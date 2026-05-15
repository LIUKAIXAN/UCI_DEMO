import React from 'react';
import { cn } from '../../lib/utils';

export type OrderStatus = 
  | 'Drafting' 
  | 'Submitted' 
  | 'Application' 
  | 'Accepted Testing' 
  | 'Report Released';

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export const statusColors: Record<OrderStatus, { bg: string, text: string, dot: string }> = {
  'Drafting': { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
  'Submitted': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Application': { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  'Accepted Testing': { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  'Report Released': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const colors = statusColors[status] || statusColors['Drafting'];

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-transparent font-sans shadow-sm", colors.bg, colors.text, className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
      {status}
    </span>
  );
};
