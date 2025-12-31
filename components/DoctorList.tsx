
import React, { useState } from 'react';
import { Doctor, User } from '../types';

interface DoctorListProps {
  doctors: Doctor[];
  onBook: (doctor: Doctor, slot: string, isInstant: boolean) => void;
  isLoggedIn: boolean;
  currentUser?: User | null;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, onBook, isLoggedIn, currentUser }) => {
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingStep, setBookingStep] = useState<'form' | 'success'>('form');
  const [patientInfo, setPatientInfo] = useState({ name: currentUser?.name || '', phone: currentUser?.phone || '' });
  const [viewingReviews, setViewingReviews] = useState<string | null>(null);

  const filteredDoctors = doctors.filter(d => 
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;
    onBook(selectedDoctor, 'Morning Slot', false);
    setBookingStep('success');
  };

  const closeBooking = () => {
    setSelectedDoctor(null);
    setBookingStep('form');
    setPatientInfo({ name: currentUser?.name || '', phone: currentUser?.phone || '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center mb-10">
        <div className="max-w-xl mx-auto relative mb-6">
          <input 
            type="text"
            placeholder="Search doctors by specialty"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 bg-white"
          />
          <i className="fas fa-search absolute right-4 top-4 text-gray-400"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{filteredDoctors.length} doctors available</h2>
        <p className="text-gray-500 font-medium">Book appointments with minimum wait-time & verified doctor details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.map((doctor, idx) => (
          <div key={doctor.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col items-center p-8 transition-all hover:shadow-lg">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-50 bg-blue-50 flex items-center justify-center">
               <img 
                 src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.name}&backgroundColor=b6e3f4`}
                 alt={doctor.name}
                 className="w-full h-full object-cover"
               />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
            <p className="text-gray-500 text-sm mb-1 font-medium">{doctor.specialization}</p>
            <p className="text-gray-400 text-xs mb-3">{idx + 5} years experience</p>
            
            <div className="flex items-center gap-1 mb-4">
              <span className="text-xs font-bold text-gray-700 mr-1">Ratings:</span>
              <div className="flex text-yellow-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < Math.floor(doctor.rating) ? '' : 'text-gray-200'}`}></i>
                ))}
              </div>
              <span className="text-[10px] text-gray-400 ml-1">({doctor.reviews.length})</span>
            </div>

            <div className="w-full space-y-3">
              <button 
                onClick={() => setSelectedDoctor(doctor)}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors flex flex-col items-center shadow-sm"
              >
                <span>Book Appointment</span>
                <span className="text-[10px] opacity-80 font-normal">No Booking Fee</span>
              </button>
              
              <button 
                onClick={() => setViewingReviews(viewingReviews === doctor.id ? null : doctor.id)}
                className="w-full py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded transition-colors uppercase tracking-wider"
              >
                {viewingReviews === doctor.id ? 'Hide Reviews' : 'View Patient Reviews'}
              </button>
            </div>

            {viewingReviews === doctor.id && (
              <div className="mt-6 w-full border-t border-gray-100 pt-4 space-y-4 animate-slide-in max-h-48 overflow-y-auto pr-2">
                {doctor.reviews.length > 0 ? doctor.reviews.map(review => (
                  <div key={review.id} className="bg-gray-50 p-3 rounded text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-800">{review.userName}</span>
                      <div className="flex text-yellow-400 text-[10px]">
                        {[...Array(review.rating)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{review.comment}"</p>
                    <p className="text-gray-400 text-[9px] mt-1 text-right">{review.date}</p>
                  </div>
                )) : (
                  <p className="text-xs text-center text-gray-400 italic py-4">No reviews yet for this consultant.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl relative animate-slide-in">
            <button 
              onClick={closeBooking}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-50">
                 <img 
                   src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedDoctor.name}&backgroundColor=b6e3f4`}
                   alt={selectedDoctor.name}
                   className="w-full h-full object-cover"
                 />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{selectedDoctor.name}</h3>
              <p className="text-gray-500 text-sm">{selectedDoctor.specialization}</p>
            </div>

            {bookingStep === 'form' ? (
              <form onSubmit={handleBookNow} className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name:</label>
                  <input 
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                    value={patientInfo.name}
                    onChange={e => setPatientInfo({...patientInfo, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number:</label>
                  <input 
                    type="tel"
                    required
                    className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                    value={patientInfo.phone}
                    onChange={e => setPatientInfo({...patientInfo, phone: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md"
                >
                  Book Now
                </button>
              </form>
            ) : (
              <div className="text-center p-6 bg-blue-50 rounded-lg animate-slide-in">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-2xl"></i>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked!</h4>
                <div className="text-left mb-6 p-4 bg-white rounded border border-blue-100 space-y-2">
                  <p className="text-gray-700 text-sm"><span className="font-bold">Name:</span> {patientInfo.name}</p>
                  <p className="text-gray-700 text-sm"><span className="font-bold">Phone Number:</span> {patientInfo.phone}</p>
                </div>
                <button 
                  onClick={closeBooking}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
