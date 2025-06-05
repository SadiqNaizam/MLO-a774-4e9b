import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import PersistentBottomNavbar from '@/components/layout/PersistentBottomNavbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserCircle2, LogOut, ChevronRight } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";


const ProfileSettingsPage = () => {
  console.log('ProfileSettingsPage loaded');
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+44 7700 900000',
    address: '123 Banking Lane, London, UK',
  });
  const [prefs, setPrefs] = React.useState({
    emailNotifications: true,
    smsAlerts: false,
    faceId: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: keyof typeof prefs) => (checked: boolean) => {
    setPrefs(prev => ({ ...prev, [name]: checked }));
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", { user, prefs });
    toast({ title: "Settings Saved", description: "Your profile and preferences have been updated."});
  };
  
  const handleLogout = () => {
    console.log("User logging out");
    toast({ title: "Logged Out", description: "You have been successfully logged out."});
    // Actual logout logic (clear session, redirect to login)
    navigate('/'); // Redirect to a public page like homepage or login
  };


  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header title="Profile & Settings" showBackButton={true} onBackClick={() => navigate(-1)} />
      <main className="flex-grow pt-4 pb-20 md:pb-4"> {/* Added pb-20 for bottom nav */}
        <ScrollArea className="h-[calc(100vh-56px-16px-80px)] md:h-[calc(100vh-56px-16px)]">
          <div className="container px-4 mx-auto space-y-6">
            <div className="flex flex-col items-center space-y-2 pt-4">
              <Avatar className="h-24 w-24 cursor-pointer">
                <AvatarImage src="https://i.pravatar.cc/150?u=profile" alt="User Profile" />
                <AvatarFallback><UserCircle2 className="h-16 w-16" /></AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
                <CardDescription>Manage your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={user.name} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" value={user.phone} onChange={handleInputChange} />
                </div>
                 <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={user.address} onChange={handleInputChange} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your security settings and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="faceId" className="flex-grow">Enable Face ID / Biometrics</Label>
                  <Switch id="faceId" checked={prefs.faceId} onCheckedChange={handleSwitchChange('faceId')} />
                </div>
                <Button variant="outline" className="w-full justify-between">
                  Change Password <ChevronRight className="h-4 w-4" />
                </Button>
                 <Button variant="outline" className="w-full justify-between">
                  Manage Devices <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Adjust your notification settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications" className="flex-grow">Email Notifications</Label>
                  <Switch id="emailNotifications" checked={prefs.emailNotifications} onCheckedChange={handleSwitchChange('emailNotifications')} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="smsAlerts" className="flex-grow">SMS Alerts</Label>
                  <Switch id="smsAlerts" checked={prefs.smsAlerts} onCheckedChange={handleSwitchChange('smsAlerts')} />
                </div>
              </CardContent>
            </Card>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Help & Support</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p><a href="#" className="text-primary hover:underline">FAQs</a></p>
                  <p><a href="#" className="text-primary hover:underline">Contact Us</a></p>
                  <p><a href="#" className="text-primary hover:underline">Terms & Conditions</a></p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-3 pt-2">
              <Button onClick={handleSaveChanges} className="w-full bg-primary hover:bg-primary/90">Save Changes</Button>
              <Button variant="destructive" onClick={handleLogout} className="w-full">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>

          </div>
        </ScrollArea>
      </main>
      <PersistentBottomNavbar />
    </div>
  );
};

export default ProfileSettingsPage;