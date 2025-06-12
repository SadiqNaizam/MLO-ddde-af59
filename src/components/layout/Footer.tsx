import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { HelpCircle, ShieldCheck, Info } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer component loaded');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border text-muted-foreground text-sm print:hidden">
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="text-center md:text-left">
            <p>&copy; {currentYear} Hospital Dashboard. All rights reserved.</p>
            <p className="text-xs mt-1">Version 1.0.0</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <p className="font-semibold text-foreground">System Information</p>
            <span className="text-xs">Status: <span className="text-green-500">Operational</span></span>
            <span className="text-xs">Last Update: {new Date().toLocaleDateString()}</span>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-2">
            <p className="font-semibold text-foreground">Quick Links</p>
            <nav className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 items-center md:items-baseline">
              <Link to="/help-center" className="hover:text-primary transition-colors flex items-center text-xs">
                <HelpCircle className="w-3 h-3 mr-1" />
                Help Center
              </Link>
              <Separator orientation="vertical" className="h-4 hidden md:block" />
              <Link to="/support" className="hover:text-primary transition-colors flex items-center text-xs">
                <Info className="w-3 h-3 mr-1" />
                Support
              </Link>
              <Separator orientation="vertical" className="h-4 hidden md:block" />
              <Link to="/privacy-policy" className="hover:text-primary transition-colors flex items-center text-xs">
                <ShieldCheck className="w-3 h-3 mr-1" />
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
        <Separator className="my-4" />
        <p className="text-center text-xs text-muted-foreground/80">
          This dashboard is intended for authorized personnel only.
        </p>
      </div>
    </footer>
  );
};

export default Footer;