import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // For back button functionality

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  // TSB-specific: maybe a slot for right-side actions like Avatar
  actions?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackClick,
  actions,
}) => {
  const navigate = useNavigate();
  console.log("Rendering Header with title:", title, "Show back button:", showBackButton);

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
      console.log("Custom onBackClick triggered");
    } else {
      navigate(-1); // Default browser back action
      console.log("Default navigate(-1) triggered");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center flex-1">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackClick}
              className="mr-2 -ml-2" // Adjust margins for alignment
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-lg font-semibold truncate">{title}</h1>
        </div>
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </div>
    </header>
  );
};

export default Header;