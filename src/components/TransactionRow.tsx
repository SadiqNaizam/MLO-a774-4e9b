import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, TrendingUp, TrendingDown } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

export interface Transaction {
  id: string | number;
  description: string;
  date: string | Date; // Can be string or Date object
  amount: number;
  currencySymbol?: string;
  type: 'debit' | 'credit' | 'transfer-in' | 'transfer-out'; // More specific types
  category?: string; // Optional category
  status?: 'pending' | 'completed' | 'failed'; // Optional status
}

interface TransactionRowProps {
  transaction: Transaction;
  onRowClick?: (transactionId: string | number) => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  onRowClick,
}) => {
  console.log("Rendering TransactionRow for transaction ID:", transaction.id);

  const { id, description, date, amount, currencySymbol = "$", type, status } = transaction;

  const formattedDate = typeof date === 'string' ? date : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  const formattedAmount = `${type === 'debit' || type === 'transfer-out' ? '-' : '+'}${currencySymbol}${Math.abs(amount).toFixed(2)}`;

  let IconComponent;
  let amountColorClass = '';

  switch (type) {
    case 'credit':
    case 'transfer-in':
      IconComponent = TrendingUp; // Or ArrowDownCircle if it's money received
      amountColorClass = 'text-green-600 dark:text-green-500';
      break;
    case 'debit':
    case 'transfer-out':
      IconComponent = TrendingDown; // Or ArrowUpCircle if it's money sent
      amountColorClass = 'text-red-600 dark:text-red-500';
      break;
    default:
      IconComponent = TrendingUp; // Default icon
  }
  
  // Adjust color for status
  if (status === 'pending') amountColorClass = 'text-yellow-600 dark:text-yellow-500';
  if (status === 'failed') amountColorClass = 'text-gray-500 line-through';


  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 sm:p-4 border-b border-border last:border-b-0",
        onRowClick ? "cursor-pointer hover:bg-accent transition-colors" : ""
      )}
      onClick={onRowClick ? () => onRowClick(id) : undefined}
      role={onRowClick ? "button" : undefined}
      tabIndex={onRowClick ? 0 : undefined}
      onKeyDown={onRowClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onRowClick(id) : undefined}
    >
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className={cn("p-2 rounded-full bg-muted", amountColorClass.includes('green') ? 'bg-green-100 dark:bg-green-900' : amountColorClass.includes('red') ? 'bg-red-100 dark:bg-red-900' : 'bg-gray-100 dark:bg-gray-800')}>
          <IconComponent className={cn("h-5 w-5 sm:h-6 sm:w-6", amountColorClass)} />
        </div>
        <div className="flex-grow">
          <p className="text-sm font-medium text-foreground truncate max-w-[120px] sm:max-w-xs">{description}</p>
          <p className="text-xs text-muted-foreground">{formattedDate} {status && `(${status})`}</p>
        </div>
      </div>
      <div className={cn("text-sm sm:text-base font-semibold", amountColorClass)}>
        {formattedAmount}
      </div>
    </div>
  );
};

export default TransactionRow;