export interface CreateServiceDto {
  name: string;
  durationMinutes: number;
  price: number;
  salonId: string;
}

export interface UpdateServiceDto extends Partial<CreateServiceDto> {}

export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  salonId: string;
  createdAt: Date;
  updatedAt: Date;
}
