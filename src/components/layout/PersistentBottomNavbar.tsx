import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // For conditional class names
import { Home, Repeat, CreditCard, User, Settings } from 'lucide-react'; // Example icons

export interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType; // Lucide icon component
}

interface PersistentBottomNavbarProps {
  navItems?: NavItem[];
}

// Default navigation items if not provided
const defaultNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/transfers', label: 'Transfers', icon: Repeat },
  { href: '/payments', label: 'Payments', icon: CreditCard },
  { href: '/profile', label: 'Profile', icon: User },
];

const PersistentBottomNavbar: React.FC<PersistentBottomNavbarProps> = ({
  navItems = defaultNavItems,
}) => {
  const location = useLocation();
  console.log("Rendering PersistentBottomNavbar, current path:", location.pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-t-md md:hidden z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname.startsWith(item.href);
          console.log(`Nav item: ${item.label}, href: ${item.href}, isActive: ${isActive}`);
          return (
            <Link
              to={item.href}
              key={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 p-2 text-xs font-medium rounded-md transition-colors",
                isActive
                  ? "text-primary bg-primary-foreground" // Or your TSB-specific active color
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <IconComponent className={cn("h-5 w-5 mb-0.5", isActive ? "text-primary" : "")} strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default PersistentBottomNavbar;