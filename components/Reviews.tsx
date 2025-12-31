
import React, { useState } from 'react';
import { Doctor, Review, User } from '../types';

interface ReviewsProps {
  doctors: Doctor[];
  onAddReview: (doctorId: string, review: Review) => void;
  isLoggedIn: boolean;
  currentUser: User | null;
}

const Reviews: React.FC<ReviewsProps> = ({ doctors, onAddReview, isLoggedIn, currentUser }) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [reviewForm, setReviewForm] = useState({ name: currentUser?.name || '', comment: '', rating: 0 });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctorId || !isLoggedIn) return;

    const newReview: Review = {
      id: Math.random().toString(36).substr(2, 9),
      userName: reviewForm.name,
      comment: reviewForm.comment,
      rating: reviewForm.rating,
      date: new Date().toISOString().split('T')[0]
    };

    onAddReview(selectedDoctorId, newReview);
    setReviewForm({ name: currentUser?.name || '', comment: '', rating: 0 });
    setSelectedDoctorId('');
  };

  const allReviews = doctors.flatMap(doc => doc.reviews.map(r => ({ ...r, doctorName: doc.name, specialization: doc.specialization })))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Review Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm sticky top-24">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Give Your Review</h3>
            
            {!isLoggedIn ? (
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <p className="text-sm text-blue-600 font-medium mb-4">Please login to share your experience with our doctors.</p>
                <a href="#/login" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-bold text-xs uppercase">Login Now</a>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Select Doctor:</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedDoctorId}
                    onChange={e => setSelectedDoctorId(e.target.value)}
                    required
                  >
                    <option value="">Choose a doctor...</option>
                    {doctors.map(doc => (
                      <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialization}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name:</label>
                  <input 
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                    value={reviewForm.name}
                    onChange={e => setReviewForm({...reviewForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Review:</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Describe your experience..."
                    value={reviewForm.comment}
                    onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Rating:</label>
                  <div className="flex gap-2 text-2xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i 
                        key={star} 
                        className={`fas fa-star cursor-pointer transition-colors ${star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                        onClick={() => setReviewForm({...reviewForm, rating: star})}
                      ></i>
                    ))}
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={!selectedDoctorId || reviewForm.rating === 0}
                  className={`w-full text-white font-bold py-4 rounded-md shadow-md transition-all ${selectedDoctorId && reviewForm.rating > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Reviews Feed Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Patient Feedback</h2>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{allReviews.length} TOTAL REVIEWS</div>
          </div>
          
          <div className="space-y-6">
            {allReviews.length > 0 ? allReviews.map((review) => (
              <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all animate-slide-in">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{review.userName}</h4>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Reviewed: {review.doctorName}</p>
                    <p className="text-[10px] text-gray-400 italic">{review.specialization}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex text-yellow-400 text-sm mb-1">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < review.rating ? '' : 'text-gray-200'}`}></i>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{review.date}</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg relative">
                  <i className="fas fa-quote-left text-blue-100 absolute top-2 left-2 text-2xl"></i>
                  <p className="text-gray-700 leading-relaxed italic relative z-10 pl-6 pr-4">
                    "{review.comment}"
                  </p>
                </div>
              </div>
            )) : (
              <div className="bg-white border border-gray-100 rounded-xl p-20 text-center">
                <i className="fas fa-comment-slash text-5xl text-gray-100 mb-4 block"></i>
                <p className="text-gray-400 font-bold uppercase tracking-widest">No reviews found in the system.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
