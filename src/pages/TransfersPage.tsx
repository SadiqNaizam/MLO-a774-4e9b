import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import PersistentBottomNavbar from '@/components/layout/PersistentBottomNavbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast"; // or sonner

const transferFormSchema = z.object({
  sourceAccount: z.string().min(1, "Please select a source account."),
  beneficiary: z.string().min(1, "Please select a beneficiary."),
  amount: z.coerce.number().positive("Amount must be positive."),
  reference: z.string().max(50, "Reference is too long.").optional(),
});

type TransferFormValues = z.infer<typeof transferFormSchema>;

const TransfersPage = () => {
  console.log('TransfersPage loaded');
  const navigate = useNavigate();

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      sourceAccount: '',
      beneficiary: '',
      amount: 0,
      reference: '',
    },
  });

  const [transferDetails, setTransferDetails] = React.useState<TransferFormValues | null>(null);

  const onSubmit: SubmitHandler<TransferFormValues> = (data) => {
    console.log('Transfer form submitted:', data);
    setTransferDetails(data);
    // Trigger AlertDialog (or a state that shows it)
    // For now, we directly open it via state if AlertDialogTrigger is not used on the main button
  };
  
  const handleConfirmTransfer = () => {
    console.log('Transfer confirmed:', transferDetails);
    // Actual transfer logic would go here
    toast({
      title: "Transfer Successful!",
      description: `£${transferDetails?.amount} sent to ${transferDetails?.beneficiary}.`,
    });
    form.reset();
    setTransferDetails(null);
    // navigate('/dashboard'); // Optional: navigate after success
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title="Make a Transfer" showBackButton={true} onBackClick={() => navigate(-1)} />
      <main className="flex-grow pt-4 pb-20 md:pb-4"> {/* Added pb-20 for bottom nav */}
        <div className="container px-4 mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="sourceAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Account</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="acc123">Everyday Account (**** 6789) - £1,250.75</SelectItem>
                        <SelectItem value="acc456">Savings Account (**** 1234) - £8,760.20</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="beneficiary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Beneficiary</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select beneficiary" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="john_doe">John Doe (Sort: 00-11-22 Acc: 12345678)</SelectItem>
                        <SelectItem value="jane_smith">Jane Smith (Sort: 99-88-77 Acc: 87654321)</SelectItem>
                        {/* TODO: Add option for 'New Beneficiary' */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (£)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Rent payment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                   <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                    Continue
                  </Button>
                </AlertDialogTrigger>
                {transferDetails && ( // Only render content if details are set by successful form validation
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Transfer</AlertDialogTitle>
                      <AlertDialogDescription>
                        Please review the details before confirming:
                        <ul className="mt-2 list-disc list-inside text-sm">
                          <li>From: {transferDetails.sourceAccount === 'acc123' ? 'Everyday Account' : 'Savings Account'}</li>
                          <li>To: {transferDetails.beneficiary}</li>
                          <li>Amount: £{transferDetails.amount.toFixed(2)}</li>
                          {transferDetails.reference && <li>Reference: {transferDetails.reference}</li>}
                        </ul>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setTransferDetails(null)}>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleConfirmTransfer}>Confirm Transfer</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}
              </AlertDialog>

            </form>
          </Form>
        </div>
      </main>
      <PersistentBottomNavbar />
    </div>
  );
};

export default TransfersPage;