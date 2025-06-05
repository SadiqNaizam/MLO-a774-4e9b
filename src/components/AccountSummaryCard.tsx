import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from 'lucide-react'; // For toggling balance visibility

interface AccountSummaryCardProps {
  accountId: string;
  accountType: string; // e.g., "Savings Account", "Current Account"
  accountNumber: string; // Masked or partial number, e.g., "**** 1234"
  balance: number;
  currencySymbol?: string;
  onViewDetailsClick?: (accountId: string) => void;
  // TSB-specific theme prop if needed
  // themeColor?: string; // e.g., '#00A8E1'
}

const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  accountId,
  accountType,
  accountNumber,
  balance,
  currencySymbol = "$",
  onViewDetailsClick,
  // themeColor = '#00A8E1' // TSB Blue
}) => {
  const [isBalanceVisible, setIsBalanceVisible] = React.useState(true);
  console.log("Rendering AccountSummaryCard for account:", accountId, "Balance visible:", isBalanceVisible);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
    console.log("Balance visibility toggled to:", !isBalanceVisible);
  };

  const formattedBalance = isBalanceVisible
    ? `${currencySymbol}${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `${currencySymbol}••••••`;

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      {/* Example of using themeColor if it were a prop: style={{ borderTopColor: themeColor, borderTopWidth: '4px' }} */}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">{accountType}</CardTitle>
            <CardDescription className="text-sm text-gray-500">{accountNumber}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleBalanceVisibility} aria-label={isBalanceVisible ? "Hide balance" : "Show balance"}>
            {isBalanceVisible ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <p className="text-xs text-gray-500 mb-1">Available Balance</p>
        <p className="text-2xl font-bold text-gray-900" /* style={{ color: themeColor }} */>
          {formattedBalance}
        </p>
      </CardContent>
      {onViewDetailsClick && (
        <CardFooter className="pt-0 pb-4">
          <Button
            variant="outline"
            className="w-full"
            // style={{ borderColor: themeColor, color: themeColor }}
            // onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = themeColor; e.currentTarget.style.color = 'white';}}
            // onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = themeColor;}}
            onClick={() => onViewDetailsClick(accountId)}
          >
            View Details
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AccountSummaryCard;