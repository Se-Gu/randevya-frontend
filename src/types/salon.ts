export interface Location {
  address: string
  lat: number
  lng: number
}

export interface Salon {
  id: string
  name: string
  phone?: string
  email?: string
  location?: Location
}
