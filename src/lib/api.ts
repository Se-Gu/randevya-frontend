import type {
  CreateUserDto,
  LoginResponse,
  User,
  Salon,
  CreateSalonDto,
  UpdateSalonDto,
  Service,
  CreateServiceDto,
  UpdateServiceDto,
  Staff,
  CreateStaffDto,
  UpdateStaffDto,
  StaffMetrics,
  SalonMetrics,
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export class ApiError extends Error {
  constructor(message: string, public status: number, public data?: any) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="))
    ?.split("=")[1];

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return response.text() as unknown as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Network error occurred", 0);
  }
}

// Auth API
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (userData: CreateUserDto) =>
    apiRequest<LoginResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
};

// Salons API
export const salonsApi = {
  getAll: () => apiRequest<Salon[]>("/salons"),
  getById: (id: string) => apiRequest<Salon>(`/salons/${id}`),
  getServices: (id: string) => apiRequest<Service[]>(`/salons/${id}/services`),
  getAvailability: (id: string) =>
    apiRequest<any>(`/salons/${id}/availability`),
  getMe: () => apiRequest<Salon>("/salons/me"),
  create: (data: CreateSalonDto) =>
    apiRequest<Salon>("/salons", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: UpdateSalonDto) =>
    apiRequest<Salon>(`/salons/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/salons/${id}`, {
      method: "DELETE",
    }),
  getMetrics: (id: string) => apiRequest<SalonMetrics>(`/salons/${id}/metrics`),
  getCalendar: (id: string, range: string, date: string) =>
    apiRequest<Appointment[]>(`/salons/${id}/calendar?range=${range}&date=${date}`),
};

// Services API
export const servicesApi = {
  getAll: () => apiRequest<Service[]>("/services"),
  getById: (id: string) => apiRequest<Service>(`/services/${id}`),
  getBySalon: (salonId: string) =>
    apiRequest<Service[]>(`/services/salon/${salonId}`),
  create: (data: CreateServiceDto) =>
    apiRequest<Service>("/services", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: UpdateServiceDto) =>
    apiRequest<Service>(`/services/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/services/${id}`, {
      method: "DELETE",
    }),
};

// Staff API
export const staffApi = {
  getAll: () => apiRequest<Staff[]>("/staff"),
  getById: (id: string) => apiRequest<Staff>(`/staff/${id}`),
  getBySalon: (salonId: string) =>
    apiRequest<Staff[]>(`/staff/salon/${salonId}`),
  create: (data: CreateStaffDto) =>
    apiRequest<Staff>("/staff", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: UpdateStaffDto) =>
    apiRequest<Staff>(`/staff/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/staff/${id}`, {
      method: "DELETE",
    }),
  getMetrics: (id: string) => apiRequest<StaffMetrics>(`/staff/${id}/metrics`),
  getCalendar: (id: string, range: string, date: string) =>
    apiRequest<Appointment[]>(
      `/staff/${id}/calendar?range=${range}&date=${date}`
    ),
};

// Appointments API
export const appointmentsApi = {
  getAll: () => apiRequest<Appointment[]>("/appointments"),
  getById: (id: string) => apiRequest<Appointment>(`/appointments/${id}`),
  getByToken: (token: string) =>
    apiRequest<Appointment>(`/appointments/token/${token}`),
  create: (data: CreateAppointmentDto) =>
    apiRequest<Appointment>("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: UpdateAppointmentDto) =>
    apiRequest<Appointment>(`/appointments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  cancel: (id: string, token: string) =>
    apiRequest<void>(`/appointments/${id}?token=${token}`, {
      method: "DELETE",
    }),
};

// Users API
export const usersApi = {
  getAll: () => apiRequest<User[]>("/users"),
  getById: (id: string) => apiRequest<User>(`/users/${id}`),
  create: (data: CreateUserDto) =>
    apiRequest<User>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<CreateUserDto>) =>
    apiRequest<User>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/users/${id}`, {
      method: "DELETE",
    }),
};

// Admin API
export const adminApi = {
  getAllUsers: () => apiRequest<User[]>("/admin/users"),
  getAllSalons: () => apiRequest<Salon[]>("/admin/salons"),
  deleteUser: (id: string) =>
    apiRequest<void>(`/admin/users/${id}`, {
      method: "DELETE",
    }),
  deleteSalon: (id: string) =>
    apiRequest<void>(`/admin/salons/${id}`, {
      method: "DELETE",
    }),
};
