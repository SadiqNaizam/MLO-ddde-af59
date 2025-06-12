import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import MetricDisplayCard from '@/components/MetricDisplayCard';
import EnhancedAnalyticsChart from '@/components/EnhancedAnalyticsChart';
import BedAvailabilityGrid from '@/components/BedAvailabilityGrid';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { type ChartConfig } from "@/components/ui/chart"; // Replaced ChartContainer with ChartConfig as per EnhancedAnalyticsChart usage

// Lucide Icons for Metric Cards
import { Users, TrendingUp, Bed, Briefcase, Search } from 'lucide-react';

// Recharts Components
import { BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, ResponsiveContainer } from 'recharts';

// Placeholder Data

// For MetricDisplayCards
const newAdmissionsData = {
  title: "New Admissions",
  value: "75",
  unit: "patients",
  trend: 'up' as 'up' | 'down' | 'neutral' | 'none',
  trendValue: "+12%",
  trendPeriod: "since yesterday",
  icon: Users,
};

const dischargeRateData = {
  title: "Discharge Rate",
  value: "62",
  unit: "%",
  trend: 'down' as 'up' | 'down' | 'neutral' | 'none',
  trendValue: "-1.5%",
  trendPeriod: "vs last week",
  icon: TrendingUp, // Assuming higher discharge rate is generally positive
};

const icuOccupancyData = {
  title: "ICU Occupancy",
  value: "85",
  unit: "%",
  trend: 'neutral' as 'up' | 'down' | 'neutral' | 'none',
  capacityCurrent: 17,
  capacityMax: 20,
  capacityUnit: "beds",
  icon: Bed,
};

// For EnhancedAnalyticsChart - Admissions Trend (Line Chart)
const admissionsTrendData = [
  { day: "Mon", admissions: 65 },
  { day: "Tue", admissions: 72 },
  { day: "Wed", admissions: 68 },
  { day: "Thu", admissions: 75 },
  { day: "Fri", admissions: 80 },
  { day: "Sat", admissions: 85 },
  { day: "Sun", admissions: 70 },
];
const admissionsTrendConfig: ChartConfig = {
  admissions: {
    label: "Admissions",
    color: "hsl(var(--chart-1))",
  },
};

// For EnhancedAnalyticsChart - Department Statistics (Bar Chart)
const departmentStatsData = [
  { department: "Cardiology", patients: 120, capacity: 150 },
  { department: "Orthopedics", patients: 95, capacity: 100 },
  { department: "Neurology", patients: 70, capacity: 80 },
  { department: "Pediatrics", patients: 110, capacity: 120 },
  { department: "Oncology", patients: 60, capacity: 70 },
];
const departmentStatsConfig: ChartConfig = {
  patients: {
    label: "Current Patients",
    color: "hsl(var(--chart-2))",
  },
  capacity: {
    label: "Capacity",
    color: "hsl(var(--chart-3))",
  }
};

// For BedAvailabilityGrid
const sampleWardsData = [
  { id: 'gw-a', name: 'General Ward A', totalBeds: 50, occupiedBeds: 35 },
  { id: 'gw-b', name: 'General Ward B', totalBeds: 40, occupiedBeds: 38 },
  { id: 'icu', name: 'ICU', totalBeds: 20, occupiedBeds: 17 },
  { id: 'maternity', name: 'Maternity Ward', totalBeds: 25, occupiedBeds: 15 },
  { id: 'pediatrics', name: 'Pediatric Unit', totalBeds: 30, occupiedBeds: 22 },
  { id: 'surgical', name: 'Surgical Ward', totalBeds: 35, occupiedBeds: 30 },
];

// For Staff On-Duty Table
const staffOnDutyData = [
  { id: 's001', name: 'Dr. Alice Wonderland', role: 'Cardiologist', department: 'Cardiology', status: 'On Duty' },
  { id: 's002', name: 'Dr. Bob The Builder', role: 'Orthopedic Surgeon', department: 'Orthopedics', status: 'On Call' },
  { id: 's003', name: 'Nurse Carol Danvers', role: 'Head Nurse', department: 'ICU', status: 'On Duty' },
  { id: 's004', name: 'Dr. David Banner', role: 'Neurologist', department: 'Neurology', status: 'On Duty' },
  { id: 's005', name: 'Nurse Eve Polastri', role: 'Pediatric Nurse', department: 'Pediatrics', status: 'Break' },
];

const DashboardOverviewPage: React.FC = () => {
  console.log('DashboardOverviewPage loaded');

  return (
    <div className="relative flex min-h-screen flex-col bg-muted/20 dark:bg-slate-950">
      <Header /> {/* Fixed, will overlay */}
      <div className="flex flex-1">
        <DashboardSidebar /> {/* Fixed, will overlay */}
        
        {/* Main content area needs to be offset for both fixed Header (h-16 -> 4rem) and Sidebar (w-64 -> 16rem) */}
        <main className="flex-1 pl-64 pt-16"> 
          <ScrollArea className="h-[calc(100vh-4rem)]"> {/* ScrollArea fills remaining viewport height after header */}
            <div className="p-6 space-y-8 md:p-8">

              {/* Page Title/Welcome */}
              <section>
                <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back, get a quick glance at hospital operations.</p>
              </section>

              {/* Section 1: Metric Cards */}
              <section aria-labelledby="metrics-title">
                <h2 id="metrics-title" className="sr-only">Key Performance Indicators</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <MetricDisplayCard {...newAdmissionsData} />
                  <MetricDisplayCard {...dischargeRateData} />
                  <MetricDisplayCard {...icuOccupancyData} />
                </div>
              </section>

              {/* Section 2: Charts */}
              <section aria-labelledby="analytics-charts-title">
                <h2 id="analytics-charts-title" className="sr-only">Analytical Charts</h2>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <EnhancedAnalyticsChart
                    title="Admissions Trend (Last 7 Days)"
                    description="Daily new patient admissions."
                    config={admissionsTrendConfig}
                    chartContainerClassName="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={admissionsTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                          labelStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="admissions" stroke={admissionsTrendConfig.admissions.color} strokeWidth={2} dot={{ r: 4, fill: admissionsTrendConfig.admissions.color }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </EnhancedAnalyticsChart>

                  <EnhancedAnalyticsChart
                    title="Department Statistics"
                    description="Current patient load by department."
                    config={departmentStatsConfig}
                    chartContainerClassName="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentStatsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="department" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                          labelStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Legend />
                        <Bar dataKey="patients" fill={departmentStatsConfig.patients.color} radius={[4, 4, 0, 0]} />
                         {/* <Bar dataKey="capacity" fill={departmentStatsConfig.capacity.color} radius={[4, 4, 0, 0]} /> */}
                      </BarChart>
                    </ResponsiveContainer>
                  </EnhancedAnalyticsChart>
                </div>
              </section>

              {/* Section 3: Bed Availability */}
              <section aria-labelledby="bed-availability-title">
                 <BedAvailabilityGrid wards={sampleWardsData} title="Live Bed Availability Status"/>
              </section>
              
              {/* Section 4: Staff On-Duty Table & Input example */}
              <section aria-labelledby="operations-tools-title" className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Briefcase className="mr-2 h-5 w-5 text-primary" />
                        Staff On-Duty Roster
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="hidden md:table-cell">Department</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {staffOnDutyData.map((staff) => (
                            <TableRow key={staff.id}>
                              <TableCell className="font-medium">{staff.name}</TableCell>
                              <TableCell>{staff.role}</TableCell>
                              <TableCell className="hidden md:table-cell">{staff.department}</TableCell>
                              <TableCell className="text-right">{staff.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="mt-4 text-center">
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/staff-directory">View Full Staff Directory</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="xl:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Search className="mr-2 h-5 w-5 text-primary" />
                                Quick Patient Search
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                                Enter Patient ID or Name for a quick lookup. (This is a placeholder Input field as per layout requirements)
                            </p>
                            <Input type="search" placeholder="Patient ID or Name..." />
                            <Button className="w-full">Search Patient</Button>
                        </CardContent>
                    </Card>
                </div>
              </section>

            </div>
            <Footer /> {/* Footer at the end of the scrollable content */}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;