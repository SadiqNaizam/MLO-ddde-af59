import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search, Settings, LogOut, UserCircle, LayoutDashboard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Header: React.FC = () => {
  console.log('Header loaded');

  // Placeholder data
  const userName = "Dr. Smith";
  const userInitials = "DS";
  const notificationCount = 3;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      {/* Left Section - Logo/Brand */}
      <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
        <LayoutDashboard className="h-6 w-6 text-primary" />
        <span className="sr-only">Hospital Dashboard</span>
        <span className="hidden md:inline-block">Hospital Dashboard</span>
      </Link>

      {/* Middle Section - Global Search (optional, can be expanded) */}
      <div className="flex-1 md:flex-initial md:ml-auto">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients, staff, reports..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-muted/40"
            />
          </div>
        </form>
      </div>

      {/* Right Section - Notifications & User Profile */}
      <div className="ml-auto flex items-center gap-2 md:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 min-w-0 p-0.5 text-xs flex items-center justify-center"
                >
                  {notificationCount}
                </Badge>
              )}
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Placeholder notifications */}
            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <p className="font-semibold">New Lab Result: John Doe</p>
              <p className="text-xs text-muted-foreground">Critical value flagged. Awaiting review.</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <p className="font-semibold">Surgery Schedule Update</p>
              <p className="text-xs text-muted-foreground">OR2 rescheduled for 3 PM.</p>
            </DropdownMenuItem>
             <DropdownMenuItem className="flex flex-col items-start gap-1">
              <p className="font-semibold">Low Supply Alert</p>
              <p className="text-xs text-muted-foreground">Saline bags stock below threshold in Ward A.</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                 <Link to="#" className="w-full text-center text-sm text-primary hover:underline">
                    View all notifications
                 </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder-user.jpg" alt={userName} /> {/* Replace with actual user image if available */}
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                        doctor.smith@hospital.com
                    </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/user-profile-settings">
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/user-profile-settings"> {/* Assuming settings are part of user profile */}
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              {/* Add logout functionality here */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;