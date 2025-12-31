
import { Doctor, MedicalReport } from './types';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialization: 'General Physician',
    rating: 4.8,
    reviews: [
      { id: 'r1', userName: 'John Doe', rating: 5, comment: 'Very helpful and attentive.', date: '2023-10-24' },
      { id: 'r2', userName: 'Alice Smith', rating: 4, comment: 'Good consultation.', date: '2023-10-20' }
    ],
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM']
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialization: 'Cardiologist',
    rating: 4.9,
    reviews: [
      { id: 'r3', userName: 'Bob Brown', rating: 5, comment: 'Highly expert in heart health.', date: '2023-10-22' }
    ],
    availableSlots: ['11:00 AM', '01:00 PM', '03:00 PM']
  },
  {
    id: '3',
    name: 'Dr. Elena Rodriguez',
    specialization: 'Pediatrician',
    rating: 4.7,
    reviews: [],
    availableSlots: ['08:00 AM', '09:30 AM', '12:00 PM']
  },
  {
    id: '4',
    name: 'Dr. David Chen',
    specialization: 'Dermatologist',
    rating: 4.6,
    reviews: [],
    availableSlots: ['10:00 AM', '02:30 PM', '05:00 PM']
  }
];

export const MOCK_REPORTS: MedicalReport[] = [
  {
    id: 'rep1',
    date: '2023-10-15',
    doctorName: 'Dr. Sarah Mitchell',
    diagnosis: 'Mild seasonal influenza',
    prescription: 'Paracetamol 500mg, Bed rest, Increased fluid intake',
    reportUrl: '#'
  },
  {
    id: 'rep2',
    date: '2023-09-12',
    doctorName: 'Dr. James Wilson',
    diagnosis: 'Routine Cardiac Checkup - Normal',
    prescription: 'Continue current diet and exercise routine',
    reportUrl: '#'
  }
];
