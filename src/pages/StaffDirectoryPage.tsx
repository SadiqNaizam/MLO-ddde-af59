import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Lucide Icons
import { Home, Search, Filter, Users, Mail, Phone } from 'lucide-react';

type StaffStatus = 'On Duty' | 'Off Duty' | 'On Call' | 'On Leave';

interface StaffMember {
  id: string;
  name: string;
  avatarUrl?: string;
  avatarFallback: string;
  department: string;
  role: string;
  status: StaffStatus;
  email: string;
  phone: string;
}

const initialStaffData: StaffMember[] = [
  {
    id: 'S001',
    name: 'Dr. Emily Carter',
    avatarUrl: 'https://i.pravatar.cc/150?u=emilycarter',
    avatarFallback: 'EC',
    department: 'Cardiology',
    role: 'Consultant Cardiologist',
    status: 'On Duty',
    email: 'emily.carter@hospital.com',
    phone: '555-0101',
  },
  {
    id: 'S002',
    name: 'James Rodriguez',
    avatarUrl: 'https://i.pravatar.cc/150?u=jamesrodriguez',
    avatarFallback: 'JR',
    department: 'ICU',
    role: 'Lead Nurse',
    status: 'On Call',
    email: 'james.rodriguez@hospital.com',
    phone: '555-0102',
  },
  {
    id: 'S003',
    name: 'Dr. Aisha Khan',
    avatarFallback: 'AK', // No avatar URL
    department: 'Pediatrics',
    role: 'Pediatrician',
    status: 'Off Duty',
    email: 'aisha.khan@hospital.com',
    phone: '555-0103',
  },
  {
    id: 'S004',
    name: 'Michael Brown',
    avatarUrl: 'https://i.pravatar.cc/150?u=michaelbrown',
    avatarFallback: 'MB',
    department: 'Surgery',
    role: 'Surgical Technician',
    status: 'On Duty',
    email: 'michael.brown@hospital.com',
    phone: '555-0104',
  },
  {
    id: 'S005',
    name: 'Sarah Miller',
    avatarUrl: 'https://i.pravatar.cc/150?u=sarahmiller',
    avatarFallback: 'SM',
    department: 'Administration',
    role: 'Hospital Administrator',
    status: 'On Leave',
    email: 'sarah.miller@hospital.com',
    phone: '555-0105',
  },
  {
    id: 'S006',
    name: 'David Wilson',
    avatarFallback: 'DW',
    department: 'Radiology',
    role: 'Radiologist',
    status: 'On Duty',
    email: 'david.wilson@hospital.com',
    phone: '555-0106',
  },
  {
    id: 'S007',
    name: 'Linda Garcia',
    avatarUrl: 'https://i.pravatar.cc/150?u=lindagarcia',
    avatarFallback: 'LG',
    department: 'Pharmacy',
    role: 'Pharmacist',
    status: 'On Call',
    email: 'linda.garcia@hospital.com',
    phone: '555-0107',
  },
];

const StaffDirectoryPage = () => {
  console.log('StaffDirectoryPage loaded');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadgeVariant = (status: StaffStatus): 'default' | 'secondary' | 'outline' | 'destructive' => {
    switch (status) {
      case 'On Duty':
        return 'default'; // Primary color (e.g., blue)
      case 'On Call':
        return 'secondary'; // Muted color (e.g., gray)
      case 'Off Duty':
        return 'outline';
      case 'On Leave':
        return 'outline'; // Could also use 'secondary' if 'On Call' is 'default' or another color
      default:
        return 'outline';
    }
  };

  const filteredStaff = initialStaffData.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <div className="flex flex-1 pt-16"> {/* Adjust pt-16 based on actual Header height */}
        <DashboardSidebar />
        <div className="flex flex-col flex-1 ml-64"> {/* Adjust ml-64 based on actual Sidebar width */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/"><Home className="h-4 w-4" /></Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Staff Directory</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="text-2xl flex items-center">
                    <Users className="mr-2 h-6 w-6" /> Staff Directory
                  </CardTitle>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search staff (name, dept, role)..."
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption className="mt-4">
                    {filteredStaff.length > 0 
                      ? `A list of ${filteredStaff.length} staff member(s).`
                      : "No staff members found matching your criteria."}
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Avatar</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell>
                          <Avatar className="h-10 w-10">
                            {staff.avatarUrl && <AvatarImage src={staff.avatarUrl} alt={staff.name} />}
                            <AvatarFallback>{staff.avatarFallback}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{staff.name}</TableCell>
                        <TableCell>{staff.department}</TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(staff.status)}>{staff.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col text-xs">
                            <a href={`mailto:${staff.email}`} className="flex items-center hover:underline text-blue-600">
                              <Mail className="h-3 w-3 mr-1.5" /> {staff.email}
                            </a>
                            <span className="flex items-center mt-0.5 text-muted-foreground">
                              <Phone className="h-3 w-3 mr-1.5" /> {staff.phone}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default StaffDirectoryPage;