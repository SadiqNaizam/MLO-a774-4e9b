import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersistentBottomNavbar from '@/components/layout/PersistentBottomNavbar';
import AccountSummaryCard from '@/components/AccountSummaryCard';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2, ArrowRight } from 'lucide-react';

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const placeholderAccounts = [
    { accountId: 'acc123', accountType: 'Everyday Account', accountNumber: '**** 6789', balance: 1250.75, currencySymbol: '£' },
    { accountId: 'acc456', accountType: 'Savings Account', accountNumber: '**** 1234', balance: 8760.20, currencySymbol: '£' },
    { accountId: 'acc789', accountType: 'Credit Card', accountNumber: '**** 5555', balance: -350.00, currencySymbol: '£' },
  ];

  const handleViewDetails = (accountId: string) => {
    navigate(`/account-details/${accountId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header
        title="My Accounts"
        actions={
          <Link to="/profile">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="https://i.pravatar.cc/150?u=profile" alt="User Profile" />
              <AvatarFallback>
                <UserCircle2 className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
          </Link>
        }
      />
      <main className="flex-grow pt-4 pb-20 md:pb-4"> {/* Added pb-20 for bottom nav */}
        <ScrollArea className="h-[calc(100vh-56px-16px-80px)] md:h-[calc(100vh-56px-16px)]"> {/* Adjusted height for header and padding */}
          <div className="container px-4 mx-auto">
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Account Overview</h2>
              <div className="space-y-4">
                {placeholderAccounts.map(account => (
                  <AccountSummaryCard
                    key={account.accountId}
                    accountId={account.accountId}
                    accountType={account.accountType}
                    accountNumber={account.accountNumber}
                    balance={account.balance}
                    currencySymbol={account.currencySymbol}
                    onViewDetailsClick={handleViewDetails}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button size="lg" className="w-full justify-between bg-primary hover:bg-primary/90" onClick={() => navigate('/transfers')}>
                  New Transfer
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button size="lg" className="w-full justify-between bg-primary hover:bg-primary/90" onClick={() => navigate('/payments')}>
                  Make a Payment
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </section>
          </div>
        </ScrollArea>
      </main>
      <PersistentBottomNavbar />
    </div>
  );
};

export default DashboardPage;