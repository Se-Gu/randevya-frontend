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
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
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
    apiRequest<{ access_token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
};

// salons API
export const salonsApi = {
  getAll: () => apiRequest<any[]>("/salons"),
  getById: (id: string) => apiRequest<any>(`/salons/${id}`),
  getServices: (id: string) => apiRequest<any[]>(`/salons/${id}/services`),
  getAvailability: (id: string) =>
    apiRequest<any>(`/salons/${id}/availability`),
  getMe: () => apiRequest<any>("/salons/me"),
  update: (id: string, data: any) =>
    apiRequest<any>(`/salons/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};

// Services API
export const servicesApi = {
  getAll: () => apiRequest<any[]>("/services"),
  getById: (id: string) => apiRequest<any>(`/services/${id}`),
  getBySalon: (salonId: string) =>
    apiRequest<any[]>(`/services/salon/${salonId}`),
  create: (data: any) =>
    apiRequest<any>("/services", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest<any>(`/services/${id}`, {
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
  getAll: () => apiRequest<any[]>("/staff"),
  getById: (id: string) => apiRequest<any>(`/staff/${id}`),
  getBySalon: (salonId: string) => apiRequest<any[]>(`/staff/salon/${salonId}`),
  create: (data: any) =>
    apiRequest<any>("/staff", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest<any>(`/staff/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/staff/${id}`, {
      method: "DELETE",
    }),
};

// Appointments API
export const appointmentsApi = {
  getAll: () => apiRequest<any[]>("/appointments"),
  getById: (id: string) => apiRequest<any>(`/appointments/${id}`),
  getByToken: (token: string) =>
    apiRequest<any>(`/appointments/token/${token}`),
  create: (data: any) =>
    apiRequest<any>("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiRequest<any>(`/appointments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  cancel: (id: string, token: string) =>
    apiRequest<void>(`/appointments/${id}?token=${token}`, {
      method: "DELETE",
    }),
};
