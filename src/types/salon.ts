import { Location, WeeklyAvailability } from "./shared";

export interface CreateSalonDto {
  name: string;
  phone: string;
  email: string;
  location: Location;
  weeklyAvailability?: WeeklyAvailability[];
}

export interface UpdateSalonDto extends Partial<CreateSalonDto> {}

export interface Salon {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: Location;
  weeklyAvailability: WeeklyAvailability[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SalonMetrics {
  appointmentCount: number;
  revenue: number;
  mostBookedService: {
    serviceId: string;
    name: string;
    count: number;
  } | null;
  utilizationRate: number;
}
