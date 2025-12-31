
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: 'u123',
      name: 'Peter',
      email: email,
      address: '',
      phone: '1234567890',
      age: 28,
      bloodGroup: 'O+',
      medicalHistory: ''
    };
    onLogin(mockUser);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full p-12 bg-white rounded-lg border border-gray-100 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Login</h2>
        
        <p className="text-sm text-gray-600 mb-8">
          Are you a new member? <a href="#/signup" className="text-blue-500 hover:underline">Sign Up Here</a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Email</label>
            <input 
              type="email"
              className="w-full border border-gray-200 rounded py-2 px-3 outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Password</label>
            <input 
              type="password"
              className="w-full border border-gray-200 rounded py-2 px-3 outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 transition-colors">
              Login
            </button>
            <button 
              type="button" 
              onClick={() => { setEmail(''); setPassword(''); }}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded font-medium hover:bg-red-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
        
        <p className="mt-12 text-sm text-gray-600">
          Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default Login;
