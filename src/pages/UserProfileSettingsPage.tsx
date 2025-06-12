import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { UserRound, Bell, Palette, Save } from 'lucide-react';

// Placeholder data types for state
interface UserProfile {
  fullName: string;
  email: string;
  department: string;
  role: string;
  avatarUrl?: string;
  initials: string;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  inAppNotifications: boolean;
  smsAlerts: boolean;
}

interface DisplaySettings {
  darkMode: boolean;
  compactView: boolean;
}

const UserProfileSettingsPage: React.FC = () => {
  console.log('UserProfileSettingsPage loaded');

  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Dr. Olivia Reynolds',
    email: 'olivia.reynolds@hospital.com',
    department: 'Cardiology',
    role: 'Chief of Medicine',
    avatarUrl: 'https://i.pravatar.cc/150?u=olivia-reynolds', // Placeholder image
    initials: 'OR',
  });

  const [notifications, setNotifications] = useState<NotificationPreferences>({
    emailNotifications: true,
    inAppNotifications: true,
    smsAlerts: false,
  });

  const [display, setDisplay] = useState<DisplaySettings>({
    darkMode: false,
    compactView: true,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', { profile, notifications, display });
    // Add actual save logic here (e.g., API call)
    alert('Settings saved successfully! (Placeholder)');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex flex-1 pt-16"> {/* Adjust pt-16 for Header height */}
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-10 ml-0 md:ml-64 bg-muted/20 overflow-y-auto"> {/* Adjust ml-64 for Sidebar width */}
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                User Profile & Settings
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your account details, notification preferences, and interface settings.
              </p>
            </header>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
              {/* Profile Information Card */}
              <Card className="mb-8 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-3">
                  <UserRound className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">Profile Information</CardTitle>
                    <CardDescription>View and update your personal details.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
                      <AvatarFallback>{profile.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow space-y-1">
                      <Label htmlFor="avatarUpload" className="text-sm font-medium">Profile Picture</Label>
                      <Input id="avatarUpload" type="file" className="text-sm" />
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" name="fullName" value={profile.fullName} onChange={handleProfileChange} placeholder="Your full name" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" type="email" value={profile.email} onChange={handleProfileChange} placeholder="your.email@example.com" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" name="department" value={profile.department} onChange={handleProfileChange} placeholder="e.g., Cardiology" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" name="role" value={profile.role} onChange={handleProfileChange} placeholder="e.g., Senior Physician" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences Card */}
              <Card className="mb-8 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-3">
                  <Bell className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">Notification Preferences</CardTitle>
                    <CardDescription>Choose how you receive important updates.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                    <Label htmlFor="emailNotifications" className="flex-grow cursor-pointer">Email Notifications</Label>
                    <Switch
                      id="emailNotifications"
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                    <Label htmlFor="inAppNotifications" className="flex-grow cursor-pointer">In-App Notifications</Label>
                    <Switch
                      id="inAppNotifications"
                      checked={notifications.inAppNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, inAppNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                    <Label htmlFor="smsAlerts" className="flex-grow cursor-pointer">SMS Alerts (for critical updates)</Label>
                    <Switch
                      id="smsAlerts"
                      checked={notifications.smsAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Display Settings Card */}
              <Card className="mb-8 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-3">
                  <Palette className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">Display Settings</CardTitle>
                    <CardDescription>Customize the dashboard's appearance.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                    <Label htmlFor="darkMode" className="flex-grow cursor-pointer">Enable Dark Mode</Label>
                    <Switch
                      id="darkMode"
                      checked={display.darkMode}
                      onCheckedChange={(checked) => setDisplay({ ...display, darkMode: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                    <Label htmlFor="compactView" className="flex-grow cursor-pointer">Use Compact Layout</Label>
                    <Switch
                      id="compactView"
                      checked={display.compactView}
                      onCheckedChange={(checked) => setDisplay({ ...display, compactView: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end mt-8">
                <Button type="submit" size="lg">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfileSettingsPage;