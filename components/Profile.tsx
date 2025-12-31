
import React, { useState, useEffect } from 'react';
import { User, Appointment, Review } from '../types';

interface ProfileProps {
  user: User | null;
  appointments: Appointment[];
  onUpdateUser: (user: User) => void;
  onCancelAppointment: (id: string) => void;
  onAddReview: (doctorId: string, review: Review) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, appointments, onUpdateUser, onCancelAppointment, onAddReview }) => {
  const [formData, setFormData] = useState<User | null>(user);
  const [showReviewModal, setShowReviewModal] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState({ name: user?.name || '', comment: '', rating: 0 });
  const [submittedReviews, setSubmittedReviews] = useState<Set<string>>(new Set());

  // Keep form data in sync if user changes from outside
  useEffect(() => {
    if (user) {
      setFormData(user);
      setReviewForm(prev => ({ ...prev, name: user.name }));
    }
  }, [user]);

  if (!user) return <div className="max-w-6xl mx-auto px-6 py-24 text-center font-bold">PLEASE LOGIN</div>;

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onUpdateUser(formData);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showReviewModal) return;
    
    const appt = appointments.find(a => a.id === showReviewModal);
    if (appt) {
      const newReview: Review = {
        id: Math.random().toString(36).substr(2, 9),
        userName: reviewForm.name,
        comment: reviewForm.comment,
        rating: reviewForm.rating,
        date: new Date().toISOString().split('T')[0]
      };
      onAddReview(appt.doctorId, newReview);
      setSubmittedReviews(prev => new Set(prev).add(showReviewModal));
    }
    setShowReviewModal(null);
    setReviewForm({ name: user.name, comment: '', rating: 0 });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Profile Card - Dedicated for user details including name change */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">Your Profile</h2>
            
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Name:</label>
                <input 
                  className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={formData?.name || ''}
                  onChange={(e) => setFormData(prev => prev ? {...prev, name: e.target.value} : null)}
                  placeholder="Change your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Phone:</label>
                <input 
                  className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={formData?.phone || ''}
                  onChange={(e) => setFormData(prev => prev ? {...prev, phone: e.target.value} : null)}
                  placeholder="Enter your phone"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Email:</label>
                <input 
                  className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 cursor-not-allowed"
                  value={formData?.email || ''}
                  disabled
                />
                <p className="text-[10px] text-gray-400 mt-1 italic">Email cannot be changed.</p>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-3.5 rounded-md font-bold hover:bg-blue-700 transition-all shadow-md active:scale-[0.98]"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 className="text-2xl font-bold text-gray-800">Your Appointments</h2>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{appointments.length} Records Found</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Serial Number</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Doctor Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Speciality</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Provide feedback</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Review Given</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {appointments.length > 0 ? appointments.map((appt, index) => (
                    <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">{appt.doctorName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">General Physician</td>
                      <td className="px-6 py-4 text-center">
                        {!submittedReviews.has(appt.id) ? (
                          <button 
                            onClick={() => setShowReviewModal(appt.id)}
                            className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded shadow-sm hover:bg-blue-700 transition-colors"
                          >
                            Click Here
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded">Submitted</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className={`mx-auto w-24 h-8 border rounded flex items-center justify-center text-[10px] font-bold ${submittedReviews.has(appt.id) ? 'border-blue-500 text-blue-500 bg-blue-50' : 'border-red-500 text-red-500'}`}>
                          {submittedReviews.has(appt.id) ? 'REVIEWED' : ''}
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">No appointments booked yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Give Your Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl relative animate-slide-in">
            <button 
              onClick={() => setShowReviewModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Give Your Review</h3>
            
            <form className="space-y-6" onSubmit={handleReviewSubmit}>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Name:</label>
                <input 
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={reviewForm.name}
                  onChange={e => setReviewForm({...reviewForm, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Review:</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
                  value={reviewForm.comment}
                  onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                  placeholder="How was your consultation?"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Rating:</label>
                <div className="flex gap-2 text-3xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i 
                      key={star} 
                      className={`fas fa-star cursor-pointer transition-all ${star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                      onClick={() => setReviewForm({...reviewForm, rating: star})}
                    ></i>
                  ))}
                </div>
              </div>
              <button 
                type="submit"
                disabled={reviewForm.rating === 0}
                className={`w-full text-white font-bold py-4 rounded-md shadow-md transition-all ${reviewForm.rating > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
