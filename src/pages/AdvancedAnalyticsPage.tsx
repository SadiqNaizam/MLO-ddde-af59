import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';

// Custom UI Components
import EnhancedAnalyticsChart from '@/components/EnhancedAnalyticsChart';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type ChartConfig } from "@/components/ui/chart"; // For EnhancedAnalyticsChart config typing

// Recharts for Chart Content
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

// Lucide Icons
import { Download, Filter, Home, BarChart3, ChevronRight } from 'lucide-react';

// Placeholder data for Selects
const timeRangeOptions = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "ytd", label: "Year to Date" },
  { value: "custom", label: "Custom Range" }
];

const metricTypeOptions = [
  { value: "admissions", label: "Admissions Data" },
  { value: "occupancy", label: "Occupancy Rates" },
  { value: "wait_times", label: "Patient Wait Times" },
  { value: "resource_util", label: "Resource Utilization" },
  { value: "financials", label: "Financial Performance" }
];

const departmentOptions = [
  { value: "all", label: "All Departments" },
  { value: "icu", label: "Intensive Care Unit (ICU)" },
  { value: "emergency", label: "Emergency Department" },
  { value: "cardiology", label: "Cardiology" },
  { value: "surgery", label: "Surgery" },
  { value: "pediatrics", label: "Pediatrics" }
];

// Placeholder data for Chart
const sampleChartData = [
  { date: 'Jul 01', admissions: 30, icu_admissions: 5, occupancy_rate: 65 },
  { date: 'Jul 02', admissions: 45, icu_admissions: 8, occupancy_rate: 70 },
  { date: 'Jul 03', admissions: 38, icu_admissions: 6, occupancy_rate: 68 },
  { date: 'Jul 04', admissions: 52, icu_admissions: 10, occupancy_rate: 75 },
  { date: 'Jul 05', admissions: 48, icu_admissions: 7, occupancy_rate: 72 },
  { date: 'Jul 06', admissions: 60, icu_admissions: 12, occupancy_rate: 80 },
  { date: 'Jul 07', admissions: 55, icu_admissions: 9, occupancy_rate: 77 },
];

const analyticsChartConfig = {
  admissions: { label: "Total Admissions", color: "hsl(var(--chart-1))" },
  icu_admissions: { label: "ICU Admissions", color: "hsl(var(--chart-2))" },
  occupancy_rate: { label: "Occupancy Rate (%)", color: "hsl(var(--chart-3))" }
} satisfies ChartConfig;

// Placeholder data for Table
interface AnalyticsDataRow {
  id: string;
  metricName: string;
  currentValue: string | number;
  previousValue?: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const sampleTableData: AnalyticsDataRow[] = [
  { id: '1', metricName: 'Total Patient Admissions (Selected Period)', currentValue: 1250, previousValue: 1180, change: '+5.93%', trend: 'up' },
  { id: '2', metricName: 'Average Length of Stay (Days)', currentValue: '4.2', previousValue: '4.5', change: '-6.67%', trend: 'down' },
  { id: '3', metricName: 'ICU Occupancy Rate', currentValue: '78%', previousValue: '72%', change: '+8.33%', trend: 'up' },
  { id: '4', metricName: 'Emergency Room Wait Time (Avg Min)', currentValue: 22, previousValue: 28, change: '-21.43%', trend: 'down' },
  { id: '5', metricName: 'Readmission Rate (30-day)', currentValue: '12%', previousValue: '12.5%', change: '-4.00%', trend: 'down' },
  { id: '6', metricName: 'Staff Overtime Hours', currentValue: 320, previousValue: 280, change: '+14.29%', trend: 'up'},
];

const AdvancedAnalyticsPage: React.FC = () => {
  console.log('AdvancedAnalyticsPage loaded');

  return (
    <div className="bg-muted/40 min-h-screen">
      <Header />
      <DashboardSidebar />
      
      <div className="ml-0 md:ml-64 pt-16 h-screen flex flex-col"> {/* Adjust ml-0 for small screens if sidebar becomes a drawer */}
        <ScrollArea className="flex-1">
          <main className="p-4 sm:p-6 space-y-6">
            {/* Breadcrumbs and Page Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/"><Home className="h-4 w-4" /></Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">Dashboard</Link> {/* Path from App.tsx */}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Advanced Analytics</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>

            {/* Filters Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Data Filters & Analysis Options</CardTitle>
                <CardDescription>
                  Select criteria to refine the analytics view. Changes will update the chart and table below.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-wrap xl:items-end xl:gap-3">
                <div className="space-y-1.5 min-w-[180px] flex-grow">
                  <Label htmlFor="timeRangeSelect">Time Range</Label>
                  <Select defaultValue="30d">
                    <SelectTrigger id="timeRangeSelect">
                      <SelectValue placeholder="Select Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeRangeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 min-w-[180px] flex-grow">
                  <Label htmlFor="metricTypeSelect">Metric Type</Label>
                  <Select defaultValue="admissions">
                    <SelectTrigger id="metricTypeSelect">
                      <SelectValue placeholder="Select Metric Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {metricTypeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 min-w-[180px] flex-grow">
                  <Label htmlFor="departmentSelect">Department</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="departmentSelect">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full sm:w-auto xl:mt-auto">
                  <Filter className="mr-2 h-4 w-4" /> Apply Filters
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Analytics Chart Section */}
            <EnhancedAnalyticsChart
              title="Hospital Performance Trends"
              description="Visual representation of key metrics over the selected period."
              config={analyticsChartConfig}
              chartContainerClassName="h-[350px] w-full"
              className="shadow-lg"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} dy={10} />
                  <YAxis 
                    yAxisId="left" 
                    orientation="left" 
                    stroke="hsl(var(--chart-1))" 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="hsl(var(--chart-3))" 
                    tickLine={false} 
                    axisLine={false}
                    domain={[0, 100]} // For percentage based metrics like occupancy
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend iconType="circle" />
                  <Line yAxisId="left" type="monotone" dataKey="admissions" stroke="var(--color-admissions)" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                  <Line yAxisId="left" type="monotone" dataKey="icu_admissions" stroke="var(--color-icu_admissions)" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                  <Line yAxisId="right" type="monotone" dataKey="occupancy_rate" name="Occupancy Rate" stroke="var(--color-occupancy_rate)" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </EnhancedAnalyticsChart>

            {/* Detailed Data Table Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Detailed Metrics Breakdown</CardTitle>
                <CardDescription>
                  Tabular view of key performance indicators based on the applied filters.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Showing data for the selected period and filters.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">Metric Name</TableHead>
                      <TableHead className="text-right">Current Value</TableHead>
                      <TableHead className="text-right hidden sm:table-cell">Previous Value</TableHead>
                      <TableHead className="text-right hidden sm:table-cell">Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleTableData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.metricName}</TableCell>
                        <TableCell className="text-right">{row.currentValue}</TableCell>
                        <TableCell className="text-right hidden sm:table-cell">{row.previousValue ?? 'N/A'}</TableCell>
                        <TableCell className={`text-right hidden sm:table-cell ${row.trend === 'up' ? 'text-red-600' : row.trend === 'down' ? 'text-green-600' : ''}`}>
                          {row.change ?? 'N/A'}
                          {/* Trend icon could be added here if desired */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
             <div className="h-8"></div> {/* Spacer before footer */}
          </main>
        </ScrollArea>
        <Footer />
      </div>
    </div>
  );
};

export default AdvancedAnalyticsPage;