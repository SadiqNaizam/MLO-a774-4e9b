import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import PersistentBottomNavbar from '@/components/layout/PersistentBottomNavbar';
import SpendingSummaryChart from '@/components/SpendingSummaryChart';
import TransactionRow, { Transaction } from '@/components/TransactionRow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search } from 'lucide-react';

// Placeholder data
const accountDetailsData: { [key: string]: any } = {
  acc123: {
    type: 'Everyday Account',
    number: '**** 6789',
    balance: 1250.75,
    currency: '£',
    transactions: [
      { id: 'txn1', description: 'Tesco Groceries', date: '2024-07-20', amount: 55.20, type: 'debit', category: 'Groceries', status: 'completed' },
      { id: 'txn2', description: 'Salary Deposit', date: '2024-07-19', amount: 1800.00, type: 'credit', category: 'Income', status: 'completed' },
      { id: 'txn3', description: 'Coffee Shop', date: '2024-07-18', amount: 3.50, type: 'debit', category: 'Food & Drink', status: 'completed' },
    ],
    spending: [
      { name: 'Groceries', value: 150.70 },
      { name: 'Transport', value: 85.00 },
      { name: 'Entertainment', value: 120.50 },
      { name: 'Utilities', value: 75.25 },
    ]
  },
  acc456: {
    type: 'Savings Account',
    number: '**** 1234',
    balance: 8760.20,
    currency: '£',
    transactions: [
      { id: 'txn4', description: 'Interest Payment', date: '2024-07-01', amount: 12.50, type: 'credit', category: 'Interest', status: 'completed' },
      { id: 'txn5', description: 'Transfer from Everyday', date: '2024-06-15', amount: 500.00, type: 'transfer-in', category: 'Transfers', status: 'completed' },
    ],
    spending: [] // No spending for savings typically
  }
};

const AccountDetailsPage = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  console.log('AccountDetailsPage loaded for account:', accountId);

  const [searchTerm, setSearchTerm] = React.useState('');

  const account = accountId ? accountDetailsData[accountId] : null;

  if (!account) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Account Not Found" showBackButton={true} onBackClick={() => navigate('/dashboard')} />
        <main className="flex-grow flex items-center justify-center">
          <p>Sorry, the account details could not be found.</p>
        </main>
        <PersistentBottomNavbar />
      </div>
    );
  }

  const filteredTransactions = account.transactions.filter((tx: Transaction) =>
    tx.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title={account.type} showBackButton={true} onBackClick={() => navigate('/dashboard')} />
      <main className="flex-grow pt-4 pb-20 md:pb-4"> {/* Added pb-20 for bottom nav */}
        <div className="container px-4 mx-auto space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate('/dashboard')} className="cursor-pointer">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{account.type}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{account.type}</CardTitle>
              <CardDescription>{account.number}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{account.currency}{account.balance.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Available Balance</p>
            </CardContent>
          </Card>

          {account.spending && account.spending.length > 0 && (
            <SpendingSummaryChart data={account.spending} title="Monthly Spending Breakdown" />
          )}

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Recent Transactions</h2>
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Card>
              <ScrollArea className="h-[300px] lg:h-[400px]">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx: Transaction) => (
                    <TransactionRow key={tx.id} transaction={tx} currencySymbol={account.currency} />
                  ))
                ) : (
                  <p className="p-4 text-center text-muted-foreground">No transactions match your search.</p>
                )}
              </ScrollArea>
            </Card>
          </section>
        </div>
      </main>
      <PersistentBottomNavbar />
    </div>
  );
};

export default AccountDetailsPage;