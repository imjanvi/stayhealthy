
import React, { useState } from 'react';
import { User, MedicalReport } from '../types';

interface ReportsProps {
  user: User | null;
  reports: MedicalReport[];
}

const Reports: React.FC<ReportsProps> = ({ user, reports }) => {
  const [activeReport, setActiveReport] = useState<MedicalReport | null>(null);

  if (!user) return <div className="max-w-6xl mx-auto px-6 py-24 text-center font-bold uppercase tracking-widest">PLEASE LOGIN TO VIEW REPORTS</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold tracking-tighter mb-12 uppercase">MEDICAL REPORTS</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 border-r border-black/20 pr-8">
          <div className="space-y-4">
            {reports.map(report => (
              <div 
                key={report.id} 
                onClick={() => setActiveReport(report)}
                className={`p-4 border border-black cursor-pointer transition-all ${activeReport?.id === report.id ? 'bg-black text-[#f5f5dc] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]' : 'hover:bg-black/5'}`}
              >
                <p className={`text-[10px] font-bold uppercase tracking-widest ${activeReport?.id === report.id ? 'opacity-70' : 'opacity-40'}`}>{report.date}</p>
                <p className="font-bold">{report.doctorName}</p>
                <p className="text-xs mt-1 truncate opacity-70">{report.diagnosis}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          {activeReport ? (
            <div className="border-2 border-black p-8 md:p-12 relative overflow-hidden bg-[#faf9f6] min-h-[600px] flex flex-col shadow-inner">
              {/* Report Watermark Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-black/[0.03] text-8xl font-black pointer-events-none select-none uppercase">
                StayHealthy Inc
              </div>

              {/* Header */}
              <div className="flex justify-between items-start mb-12 relative z-10 border-b-2 border-black pb-8">
                <div>
                  <h3 className="text-2xl font-black tracking-tighter mb-1 uppercase">Medical Report</h3>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-60">Ref ID: {activeReport.id.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm uppercase tracking-widest">StayHealthy Inc.</p>
                  <p className="text-[10px] uppercase font-bold opacity-40">Digital Health Division</p>
                </div>
              </div>

              {/* Body */}
              <div className="grid grid-cols-2 gap-8 mb-12 relative z-10">
                <div>
                  <label className="text-[10px] uppercase font-black tracking-widest block mb-2 opacity-50">Patient Details</label>
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-sm font-light">Age: {user.age} | Blood: {user.bloodGroup || 'N/A'}</p>
                </div>
                <div className="text-right">
                  <label className="text-[10px] uppercase font-black tracking-widest block mb-2 opacity-50">Consultant</label>
                  <p className="font-bold text-lg">{activeReport.doctorName}</p>
                  <p className="text-sm font-light italic">Certified Medical Professional</p>
                </div>
              </div>

              <div className="space-y-8 mb-12 relative z-10">
                <section>
                  <label className="text-[10px] uppercase font-black tracking-widest block mb-3 border-l-4 border-black pl-3">Clinical Diagnosis</label>
                  <p className="text-md font-medium leading-relaxed">{activeReport.diagnosis}</p>
                </section>
                <section>
                  <label className="text-[10px] uppercase font-black tracking-widest block mb-3 border-l-4 border-black pl-3">Prescription / Recommended Action</label>
                  <div className="bg-black/5 p-6 font-mono text-sm border border-black/10 text-black/80">
                    {activeReport.prescription}
                  </div>
                </section>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-8 border-t border-black/20 flex justify-between items-end relative z-10">
                <div className="text-[8px] uppercase font-bold max-w-xs leading-relaxed opacity-40">
                  This is a digitally generated report. No physical signature is required. For verification, contact support@stayhealthy.org
                </div>
                <button 
                  className="bg-black text-[#f5f5dc] px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center gap-2"
                  onClick={() => alert('Download starting...')}
                >
                  <i className="fas fa-download"></i> Download PDF
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-black/10 p-12 text-center bg-black/[0.01]">
              <i className="fas fa-file-prescription text-5xl text-black/10 mb-4"></i>
              <p className="text-black/30 font-bold text-xs uppercase tracking-[0.2em]">Select a report to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
