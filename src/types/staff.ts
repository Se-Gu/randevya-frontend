import { WeeklyAvailability } from "./shared";

export interface CreateStaffDto {
  name: string;
  workingHours: WeeklyAvailability[];
  salonId: string;
}

export interface UpdateStaffDto extends Partial<CreateStaffDto> {}

export interface Staff {
  id: string;
  name: string;
  workingHours: WeeklyAvailability[];
  salonId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StaffMetrics {
  appointmentCount: number;
  revenue: number;
  mostBookedService: {
    serviceId: string;
    name: string;
    count: number;
  } | null;
  utilizationRate: number;
}
