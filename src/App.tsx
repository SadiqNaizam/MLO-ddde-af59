import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import AdvancedAnalyticsPage from "./pages/AdvancedAnalyticsPage";
import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import PatientSummaryPage from "./pages/PatientSummaryPage";
import StaffDirectoryPage from "./pages/StaffDirectoryPage";
import UserProfileSettingsPage from "./pages/UserProfileSettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<DashboardOverviewPage />} />
          <Route path="/advanced-analytics" element={<AdvancedAnalyticsPage />} />
          <Route path="/patient-summary" element={<PatientSummaryPage />} />
          <Route path="/staff-directory" element={<StaffDirectoryPage />} />
          <Route path="/user-profile-settings" element={<UserProfileSettingsPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
