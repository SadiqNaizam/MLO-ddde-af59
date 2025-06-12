import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Lucide Icons
import { Home, Search, Eye } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  avatarSrc?: string;
  avatarFallback: string;
  ward: string;
  admissionDate: string;
  condition: string;
  status: 'Stable' | 'Critical' | 'Observation' | 'Discharged';
}

const samplePatientsData: Patient[] = [
  { id: 'PID001', name: 'Alice Wonderland', avatarFallback: 'AW', ward: 'Cardiology A', admissionDate: 'Oct 15, 2023', condition: 'Myocardial Infarction', status: 'Stable', avatarSrc: 'https://i.pravatar.cc/40?u=PID001' },
  { id: 'PID002', name: 'Bob The Builder', avatarFallback: 'BB', ward: 'Orthopedics B', admissionDate: 'Oct 20, 2023', condition: 'Femur Fracture', status: 'Observation', avatarSrc: 'https://i.pravatar.cc/40?u=PID002' },
  { id: 'PID003', name: 'Charlie Brown', avatarFallback: 'CB', ward: 'Pediatrics', admissionDate: 'Oct 22, 2023', condition: 'Acute Bronchitis', status: 'Stable', avatarSrc: 'https://i.pravatar.cc/40?u=PID003' },
  { id: 'PID004', name: 'Diana Prince', avatarFallback: 'DP', ward: 'ICU 1', admissionDate: 'Oct 23, 2023', condition: 'Severe Sepsis', status: 'Critical', avatarSrc: 'https://i.pravatar.cc/40?u=PID004' },
  { id: 'PID005', name: 'Edward Scissorhands', avatarFallback: 'ES', ward: 'General Surgery', admissionDate: 'Sep 05, 2023', condition: 'Post-Appendectomy', status: 'Discharged', avatarSrc: 'https://i.pravatar.cc/40?u=PID005' },
  { id: 'PID006', name: 'Fiona Gallagher', avatarFallback: 'FG', ward: 'Maternity', admissionDate: 'Oct 25, 2023', condition: 'Pre-term Labor Watch', status: 'Observation', avatarSrc: 'https://i.pravatar.cc/40?u=PID006' },
  { id: 'PID007', name: 'George Jetson', avatarFallback: 'GJ', ward: 'Neurology', admissionDate: 'Oct 10, 2023', condition: 'Post-Stroke Recovery', status: 'Stable', avatarSrc: 'https://i.pravatar.cc/40?u=PID007' },
];

const PatientSummaryPage = () => {
  console.log('PatientSummaryPage loaded');

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredPatients, setFilteredPatients] = React.useState<Patient[]>(samplePatientsData);

  React.useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = samplePatientsData.filter(patient =>
      patient.name.toLowerCase().includes(lowercasedFilter) ||
      patient.id.toLowerCase().includes(lowercasedFilter) ||
      patient.ward.toLowerCase().includes(lowercasedFilter) ||
      patient.condition.toLowerCase().includes(lowercasedFilter) ||
      patient.status.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredPatients(filteredData);
  }, [searchTerm]);

  const getStatusBadgeVariant = (status: Patient['status']): "default" | "destructive" | "secondary" | "outline" => {
    switch (status) {
      case 'Stable':
        return 'default'; // Typically primary color (e.g., blue/green)
      case 'Critical':
        return 'destructive'; // Red
      case 'Observation':
        return 'secondary'; // Grayish
      case 'Discharged':
        return 'outline'; // Neutral or lighter
      default:
        return 'default';
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <Header />
      <DashboardSidebar />
      <main className="ml-0 md:ml-64 pt-16 min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="p-4 sm:p-6 md:p-8 flex-grow">
          {/* Page Title and Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Patient Summary</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mt-2">
              Patient Summary
            </h1>
          </div>

          {/* Filter/Search Section */}
          <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="relative flex-grow w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search patients by name, ID, ward, condition, status..."
                  className="pl-10 w-full bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                {/* This button is here as per layout_info, could be used for advanced filters in future */}
                Filters
              </Button>
            </div>
          </div>

          {/* Patient Table Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-700">
                <TableRow>
                  <TableHead className="w-[80px] sm:w-[100px]">Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Patient ID</TableHead>
                  <TableHead className="hidden lg:table-cell">Ward</TableHead>
                  <TableHead className="hidden sm:table-cell">Admitted</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <TableCell>
                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                          <AvatarImage src={patient.avatarSrc} alt={patient.name} />
                          <AvatarFallback>{patient.avatarFallback}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium text-slate-800 dark:text-slate-100">{patient.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-slate-600 dark:text-slate-300">{patient.id}</TableCell>
                      <TableCell className="hidden lg:table-cell text-slate-600 dark:text-slate-300">{patient.ward}</TableCell>
                      <TableCell className="hidden sm:table-cell text-slate-600 dark:text-slate-300">{patient.admissionDate}</TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-300">{patient.condition}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(patient.status)}>{patient.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          {/* In a real app, this would link to a detailed patient view, e.g., /patients/${patient.id} */}
                          <Link to="#" title="View Patient Details">
                            <Eye className="h-5 w-5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-slate-500 dark:text-slate-400">
                      No patients found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default PatientSummaryPage;