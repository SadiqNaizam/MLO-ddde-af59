import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BedDouble, CheckCircle2, AlertCircle, AlertTriangle, XCircle, ServerCrash } from 'lucide-react';

interface WardBedInfo {
  id: string;
  name: string;
  totalBeds: number;
  occupiedBeds: number;
}

interface BedAvailabilityGridProps {
  wards: WardBedInfo[];
  title?: string;
}

const BedAvailabilityGrid: React.FC<BedAvailabilityGridProps> = ({ wards, title = "Bed Availability" }) => {
  console.log('BedAvailabilityGrid loaded');

  if (!wards || wards.length === 0) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ServerCrash className="mr-2 h-6 w-6 text-yellow-500" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No bed availability data to display at the moment. Please check back later or contact support if this issue persists.</p>
        </CardContent>
      </Card>
    );
  }

  const getWardStatus = (occupiedBeds: number, totalBeds: number) => {
    if (totalBeds <= 0) { // Handles cases with zero or negative total beds as an error/misconfiguration
        return { 
            label: "Data Error", 
            colorClasses: "bg-gray-400 text-gray-50", 
            icon: <ServerCrash className="h-4 w-4" />,
            textColor: "text-gray-700"
        };
    }

    const availableBeds = totalBeds - occupiedBeds;
    
    if (availableBeds <= 0) {
      return { 
        label: "Full / Critical", 
        colorClasses: "bg-red-600 text-red-50", 
        icon: <XCircle className="h-4 w-4" />,
        textColor: "text-red-600"
      };
    }
    // Occupancy rate calculation should only happen if totalBeds > 0
    const occupancyRate = occupiedBeds / totalBeds;

    if (occupancyRate >= 0.9) { // 90% or more occupied
      return { 
        label: "Very High", 
        colorClasses: "bg-orange-500 text-orange-50", 
        icon: <AlertTriangle className="h-4 w-4" />,
        textColor: "text-orange-600"
      };
    }
    if (occupancyRate >= 0.75) { // 75% - 89% occupied
      return { 
        label: "High", 
        colorClasses: "bg-yellow-400 text-yellow-900", 
        icon: <AlertCircle className="h-4 w-4" />,
        textColor: "text-yellow-700" 
      };
    }
    return { 
      label: "Good", 
      colorClasses: "bg-green-500 text-green-50", 
      icon: <CheckCircle2 className="h-4 w-4" />,
      textColor: "text-green-600"
    };
  };

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {wards.map((ward) => {
          const status = getWardStatus(ward.occupiedBeds, ward.totalBeds);
          const availableBeds = Math.max(0, ward.totalBeds - ward.occupiedBeds); // Ensure availableBeds is not negative

          return (
            <Card key={ward.id} className="flex flex-col hover:shadow-md transition-shadow duration-200 ease-in-out dark:bg-gray-800">
              <CardHeader className="pb-3 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">{ward.name}</CardTitle>
                  <Badge variant="secondary" className={`${status.colorClasses} px-2 py-1 text-xs`}>
                    {status.icon}
                    <span className="ml-1.5 hidden sm:inline">{status.label}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-1 px-4 pb-4">
                <div className="flex items-baseline">
                  <p className={`text-2xl sm:text-3xl font-bold ${status.textColor}`}>
                    {availableBeds}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-1.5">Available Beds</p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <BedDouble className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                  <span>{ward.occupiedBeds} Occupied / {ward.totalBeds} Total</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BedAvailabilityGrid;