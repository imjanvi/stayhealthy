
export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  age: number;
  bloodGroup: string;
  medicalHistory: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviews: Review[];
  availableSlots: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  timeSlot: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  isInstant?: boolean;
}

export interface MedicalReport {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  prescription: string;
  reportUrl: string;
}
