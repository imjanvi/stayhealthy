
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { User, Doctor, Appointment, Review, MedicalReport } from './types';
import { MOCK_DOCTORS, MOCK_REPORTS } from './constants';
import Navbar from './components/Navbar';
import Home from './components/Home';
import DoctorList from './components/DoctorList';
import Profile from './components/Profile';
import Reports from './components/Reports';
import Reviews from './components/Reviews';
import Login from './components/Login';
import Signup from './components/Signup';
import Notification from './components/Notification';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [notifications, setNotifications] = useState<{message: string, type: 'info' | 'success'}[]>([]);

  const addNotification = (message: string, type: 'info' | 'success' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.message !== message));
    }, 5000);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    addNotification(`Welcome back, ${user.name}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    addNotification('Logged out successfully');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    addNotification('Profile updated successfully!', 'success');
  };

  const bookAppointment = (doctor: Doctor, slot: string, isInstant: boolean = false) => {
    if (!currentUser) {
      addNotification('Please login to book an appointment', 'info');
      return;
    }
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientId: currentUser.id,
      timeSlot: slot,
      status: 'upcoming',
      isInstant
    };
    setAppointments([...appointments, newAppointment]);
    addNotification(
      isInstant 
        ? `Instant consultation started with ${doctor.name}` 
        : `Appointment confirmed with ${doctor.name} for ${slot}`,
      'success'
    );
  };

  const handleInstantConsultation = () => {
    if (!currentUser) {
      addNotification('Please login to start an instant consultation', 'info');
      return;
    }
    // Pick the first available doctor for instant consultation
    const doctor = doctors[0];
    bookAppointment(doctor, 'Immediate', true);
  };

  const cancelAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
    addNotification('Appointment cancelled');
  };

  const addReview = (doctorId: string, review: Review) => {
    setDoctors(prevDoctors => prevDoctors.map(doc => {
      if (doc.id === doctorId) {
        const newReviews = [...doc.reviews, review];
        const newRating = newReviews.reduce((acc, r) => acc + r.rating, 0) / newReviews.length;
        return { ...doc, reviews: newReviews, rating: parseFloat(newRating.toFixed(1)) };
      }
      return doc;
    }));
    addNotification('Thank you for your feedback!', 'success');
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#fcfcfc]">
        <Navbar 
          user={currentUser} 
          onLogout={handleLogout} 
          notifications={notifications}
          onInstantConsultation={handleInstantConsultation}
        />
        
        <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 pointer-events-none">
          {notifications.map((n, i) => (
            <Notification key={i} message={n.message} type={n.type} />
          ))}
        </div>

        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home onInstantConsultation={handleInstantConsultation} />} />
            <Route 
              path="/doctors" 
              element={
                <DoctorList 
                  doctors={doctors} 
                  onBook={bookAppointment} 
                  isLoggedIn={!!currentUser} 
                  currentUser={currentUser}
                />
              } 
            />
            <Route 
              path="/reviews" 
              element={
                <Reviews 
                  doctors={doctors} 
                  onAddReview={addReview} 
                  isLoggedIn={!!currentUser} 
                  currentUser={currentUser}
                />
              } 
            />
            <Route 
              path="/profile" 
              element={
                <Profile 
                  user={currentUser} 
                  appointments={appointments} 
                  onUpdateUser={handleUpdateUser} 
                  onCancelAppointment={cancelAppointment}
                  onAddReview={addReview}
                />
              } 
            />
            <Route 
              path="/reports" 
              element={<Reports user={currentUser} reports={MOCK_REPORTS} />} 
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
          </Routes>
        </main>

        <footer className="border-t border-gray-200 py-8 text-center text-sm font-light mt-12 bg-white">
          <p>All rights belong to Janhavi Kataria | StayHealthy @2025</p>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
