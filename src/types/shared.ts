export enum DayOfWeek {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
}

export enum UserRole {
  SYSTEM_ADMIN = "system_admin",
  OWNER = "owner",
  STAFF = "staff",
}

export enum AppointmentStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface WeeklyAvailability {
  day: DayOfWeek;
  slots: TimeSlot[];
}

export interface Location {
  address: string;
  lat: number;
  lng: number;
}
