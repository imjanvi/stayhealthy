
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface SignupProps {
  onSignup: (user: User) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      address: '',
      phone: formData.phone,
      age: 18,
      bloodGroup: '',
      medicalHistory: ''
    };
    onSignup(newUser);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full p-12 bg-white rounded-lg border border-gray-100 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Sign Up</h2>
        
        <p className="text-sm text-gray-600 mb-8">
          Already a member? <a href="#/login" className="text-blue-500 hover:underline">Login</a>
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Name</label>
            <input 
              type="text"
              className="w-full border border-gray-200 rounded py-2 px-3 outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Phone</label>
            <input 
              type="tel"
              className="w-full border border-gray-200 rounded py-2 px-3 outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Email</label>
            <input 
              type="email"
              className="w-full border border-gray-200 rounded py-2 px-3 outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Password</label>
            <input 
              type="password"
              className="w-full border border-gray-200 rounded py-2 px-3 outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 transition-colors">
              Submit
            </button>
            <button 
              type="button" 
              onClick={() => setFormData({ name: '', email: '', password: '', phone: '' })}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded font-medium hover:bg-red-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
