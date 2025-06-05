import { AppointmentStatus } from "./shared";

export interface CreateAppointmentDto {
  salonId: string;
  serviceId: string;
  staffId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string;
  time: string;
}

export interface UpdateAppointmentDto extends Partial<CreateAppointmentDto> {}

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  accessToken: string;
  salonId: string;
  serviceId: string;
  staffId?: string;
  createdAt: Date;
  updatedAt: Date;
}
