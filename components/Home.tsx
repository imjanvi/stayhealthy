
import React from 'react';
import { Link } from 'react-router-dom';

interface HomeProps {
  onInstantConsultation: () => void;
}

const Home: React.FC<HomeProps> = ({ onInstantConsultation }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-32 text-center">
      <div className="space-y-10">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
          HEALTHCARE <br /> FOR EVERYONE.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
          StayHealthy Inc. is a non-profit initiative bringing digital medical access to remote areas. 
          Connect with specialists instantly, manage your records, and prioritize your well-being without distance barriers.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <Link 
            to="/doctors" 
            className="bg-black text-white py-5 px-10 font-bold text-sm tracking-widest uppercase hover:bg-gray-800 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none"
          >
            Find a Doctor
          </Link>
          <button 
            onClick={onInstantConsultation}
            className="border-2 border-black text-black py-5 px-10 font-bold text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3"
          >
            <i className="fas fa-bolt"></i> Instant Consultation
          </button>
        </div>
      </div>

      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-black pt-16 text-left">
        <div>
          <h3 className="font-black text-xs tracking-widest uppercase mb-4">The Gap</h3>
          <p className="text-sm text-gray-500 font-light leading-relaxed">Bridging the 50-mile medical facility void in remote sectors through high-speed digital connectivity.</p>
        </div>
        <div>
          <h3 className="font-black text-xs tracking-widest uppercase mb-4">The Access</h3>
          <p className="text-sm text-gray-500 font-light leading-relaxed">24/7 availability for general physicians and specialized consultants with zero waiting lists.</p>
        </div>
        <div>
          <h3 className="font-black text-xs tracking-widest uppercase mb-4">The Security</h3>
          <p className="text-sm text-gray-500 font-light leading-relaxed">End-to-end encrypted medical records accessible only by you and your designated medical officer.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
