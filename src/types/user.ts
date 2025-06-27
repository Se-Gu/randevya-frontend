import { UserRole } from "./shared";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  salonId: string;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  salonId: string;
}
