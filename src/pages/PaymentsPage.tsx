import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import PersistentBottomNavbar from '@/components/layout/PersistentBottomNavbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const paymentFormSchema = z.object({
  biller: z.string().min(1, "Please select a biller."),
  amount: z.coerce.number().positive("Amount must be positive."),
  paymentDate: z.date({ required_error: "Please select a payment date." }),
  reference: z.string().max(30, "Reference too long").optional(),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const PaymentsPage = () => {
  console.log('PaymentsPage loaded');
  const navigate = useNavigate();
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      biller: '',
      amount: 0,
      reference: '',
    },
  });

  const [paymentDetails, setPaymentDetails] = React.useState<PaymentFormValues | null>(null);

  const onSubmit: SubmitHandler<PaymentFormValues> = (data) => {
    console.log('Payment form submitted:', data);
    setPaymentDetails(data);
    // Trigger AlertDialog
  };

  const handleConfirmPayment = () => {
    console.log('Payment confirmed:', paymentDetails);
    toast({
      title: "Payment Scheduled!",
      description: `£${paymentDetails?.amount.toFixed(2)} to ${paymentDetails?.biller} on ${paymentDetails?.paymentDate ? format(paymentDetails.paymentDate, "PPP") : ''}.`,
    });
    form.reset();
    setPaymentDetails(null);
    // navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title="Make a Payment" showBackButton={true} onBackClick={() => navigate(-1)} />
      <main className="flex-grow pt-4 pb-20 md:pb-4"> {/* Added pb-20 for bottom nav */}
        <div className="container px-4 mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="biller"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Biller</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a biller" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="electric_co">Electricity Co.</SelectItem>
                        <SelectItem value="gas_ltd">Gas Ltd.</SelectItem>
                        <SelectItem value="water_corp">Water Corp.</SelectItem>
                        {/* TODO: Add option for 'New Biller' */}
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
                name="paymentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Payment Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) } // Disable past dates
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                      <Input placeholder="e.g., Invoice #123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                    Schedule Payment
                  </Button>
                </AlertDialogTrigger>
                 {paymentDetails && (
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                      <AlertDialogDescription>
                        Please review your payment details:
                        <ul className="mt-2 list-disc list-inside text-sm">
                          <li>Biller: {paymentDetails.biller}</li>
                          <li>Amount: £{paymentDetails.amount.toFixed(2)}</li>
                          <li>Date: {paymentDetails.paymentDate ? format(paymentDetails.paymentDate, "PPP") : ''}</li>
                          {paymentDetails.reference && <li>Reference: {paymentDetails.reference}</li>}
                        </ul>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setPaymentDetails(null)}>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleConfirmPayment}>Confirm Payment</AlertDialogAction>
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

export default PaymentsPage;