import { useState, useEffect } from 'react';
import { 
  Bell, 
  Lock, 
  TrendingDown, 
  CheckCircle, 
  Moon, 
  Activity, 
  Calendar, 
  MapPin, 
  Video, 
  ShieldCheck, 
  Download, 
  Printer, 
  FileText, 
  ArrowRight, 
  HelpCircle, 
  LogOut, 
  User, 
  Heart,
  Plus,
  Sparkles,
  Award,
  Clock
} from 'lucide-react';
import { ScreenId, TransitionType, AssessmentState, Booking } from '../types';

interface DashboardProps {
  onNavigate: (screen: ScreenId, transition: TransitionType) => void;
  assessmentData: AssessmentState;
  bookings: Booking[];
}

export default function Dashboard({ onNavigate, assessmentData, bookings }: DashboardProps) {
  const [radialProgress, setRadialProgress] = useState(0);

  // Default health index calculation based on assessment or default mock value 72
  const healthIndex = assessmentData.completed 
    ? Math.min(100, Math.max(50, 70 + (assessmentData.sleepQuality ? (assessmentData.sleepQuality - 6) * 5 : 0) + (assessmentData.symptoms ? -assessmentData.symptoms.length * 8 : 0))) 
    : 72;

  useEffect(() => {
    // Soft gauge animation
    const timer = setTimeout(() => {
      setRadialProgress(healthIndex);
    }, 200);
    return () => clearTimeout(timer);
  }, [healthIndex]);

  return (
    <div className="bg-[#f9f9ff] min-h-screen font-sans text-[#091c35] flex">
      
      {/* SideNavBar */}
      <aside className="w-64 fixed left-0 top-0 bottom-0 bg-surface-container-low flex flex-col p-6 gap-6 border-r border-outline-variant/15 z-50">
        <div className="mb-4">
          <h1 
            onClick={() => onNavigate('home', 'push_back')} 
            className="text-2xl font-extrabold text-primary cursor-pointer tracking-tight whitespace-nowrap active:opacity-85 select-none"
          >
            MediTrust Pro
          </h1>
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-3 px-1">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container border border-white flex items-center justify-center shrink-0">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5AjzT6dlSd1XifPxGFXtdgXuaDeKE6gqBqlzK4kzfAyM9ffexKffvDoj8w0NBCd5KCr0Ies1l4DbbSthDsJ4N_mTFtiv0I09Zz-lbov7EzT20Db7ZR-VqkVttMnn_-qrx5UcypnQWcutHqXtkKtA3qm012RckK2RCq4mGZrhC9e6113ii7EGDgyuH9lySklZmmFQisQ4jb_tscUOZE8UHJXOzlbJMVuWIBYs77sycYnn6sqwpHJ_it8lTtRNwUn8MMVST23mbzdg" 
                alt="Patient Profile" 
              />
            </div>
            <div>
              <p className="text-[10px] text-on-surface-variant font-atkinson">Welcome back,</p>
              <p className="font-bold text-xs text-on-surface font-sans">Alex Johnson</p>
            </div>
          </div>

          <div className="bg-primary/5 px-3 py-1.5 rounded-lg flex items-center gap-1.5 self-start shadow-sm border border-primary/5">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary fill-current" />
            <span className="text-[10px] text-secondary font-bold font-atkinson">Health Status: {assessmentData.completed && (assessmentData.symptoms?.length || 0) > 2 ? 'Under Review' : 'Stable'}</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-grow space-y-1">
          <a className="flex items-center gap-3 px-4 py-2.5 bg-primary-container text-on-primary-container font-bold rounded-lg cursor-pointer text-xs" href="#">
            <span className="material-symbols-outlined text-sm">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a onClick={() => onNavigate('directory', 'none')} className="flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-variant rounded-lg cursor-pointer text-xs" href="#">
            <span className="material-symbols-outlined text-sm">medical_services</span>
            <span>Health Records</span>
          </a>
          <a onClick={() => onNavigate('assessment', 'none')} className="flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-variant rounded-lg cursor-pointer text-[#434654] text-xs" href="#">
            <span className="material-symbols-outlined text-sm">event</span>
            <span>Assessments</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-variant rounded-lg cursor-pointer text-[#434654] opacity-50 text-xs" href="#">
            <span className="material-symbols-outlined text-sm">mail</span>
            <span>Messages</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:bg-surface-variant rounded-lg cursor-pointer text-[#434654] opacity-50 text-xs" href="#">
            <span className="material-symbols-outlined text-sm">settings</span>
            <span>Settings</span>
          </a>
        </nav>

        <button 
          onClick={() => onNavigate('directory', 'push')}
          className="bg-secondary text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-97 transition-all mt-4 shrink-0 shadow-md cursor-pointer mb-2"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Book New Appt</span>
        </button>

        <div className="mt-auto space-y-1 pt-4 border-t border-outline-variant/15 font-sans">
          <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all text-xs opacity-80" href="#">
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </a>
          {/* Logout trigger - xpath matches //span[contains(text(), 'Logout')]/.. */}
          <div 
            onClick={() => {
              alert("Logging out from Alex Johnson's profile...");
              onNavigate('home', 'push_back');
            }} 
            className="flex items-center gap-3 px-3 py-2 text-error hover:bg-error-container/10 rounded-lg transition-all text-xs font-bold cursor-pointer select-none"
          >
            <LogOut className="w-4 h-4 text-error" />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content Layout */}
      <main className="ml-64 flex-grow p-8 bg-[#f9f9ff] min-h-screen flex flex-col font-sans">
        
        {/* Top App Bar inside main */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-primary tracking-tight font-sans">Patient Dashboard</h2>
            <div className="flex items-center gap-1.5 text-on-surface-variant mt-1.5 select-all">
              <Lock className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span className="text-[11px] font-atkinson">End-to-end encrypted medical data access (HIPAA Compliant)</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative">
              <button className="p-2.5 bg-surface-container-highest rounded-full text-on-surface hover:bg-surface-variant transition-all cursor-pointer relative shadow-sm border border-outline-variant/10">
                <Bell className="w-4 h-4 text-on-surface" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border border-white" />
              </button>
            </div>
            <div className="h-8 w-[1px] bg-outline-variant/30" />
            <div className="flex flex-col items-end text-xs">
              <span className="font-bold text-on-background font-sans">MediTrust ID</span>
              <span className="text-[10px] text-on-surface-variant font-atkinson">MT-8842-192</span>
            </div>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6 flex-grow">
          
          {/* Health Assessment & Risk Visualization Card */}
          <section className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="flex justify-between items-start gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-on-surface font-sans">Recent Health Assessment</h3>
                <p className="text-xs text-on-surface-variant font-atkinson mt-0.5">
                  {assessmentData.completed 
                    ? `Completed on ${assessmentData.timestamp}` 
                    : 'Generated from baseline metrics until Assessment completion.'
                  }
                </p>
              </div>
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-bold text-[10px] uppercase font-atkinson rounded-full border border-secondary/15 tracking-wider shrink-0">
                Action Recommended
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-grow">
              
              {/* Radial Gauge */}
              <div className="md:col-span-5 flex justify-center py-4 relative">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      className="text-surface-container" 
                      cx="80" 
                      cy="80" 
                      fill="none" 
                      r="68" 
                      stroke="currentColor" 
                      strokeWidth="10" 
                    />
                    <circle 
                      className="text-secondary transition-all duration-1000 ease-out" 
                      cx="80" 
                      cy="80" 
                      fill="none" 
                      r="68" 
                      stroke="currentColor" 
                      strokeWidth="10" 
                      strokeDasharray={2 * Math.PI * 68}
                      strokeDashoffset={2 * Math.PI * 68 * (1 - radialProgress / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center leading-none">
                    <span className="text-4xl font-extrabold text-[#00677d] font-sans">{healthIndex}</span>
                    <span className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold font-atkinson mt-1.5">Health Index</span>
                  </div>
                </div>
              </div>

              {/* Assessment details */}
              <div className="md:col-span-7 grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#f9f9ff] rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                  <p className="text-[10px] font-semibold text-on-surface-variant font-atkinson">Cardiovascular Risk</p>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-base font-bold text-on-surface font-sans">
                      {assessmentData.completed && assessmentData.symptoms?.includes('Chest Pain') ? 'Moderate' : 'Low'}
                    </span>
                    <TrendingDown className="w-5 h-5 text-secondary" />
                  </div>
                </div>

                <div className="p-3 bg-[#f9f9ff] rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                  <p className="text-[10px] font-semibold text-on-surface-variant font-atkinson">Metabolic Health</p>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-base font-bold text-on-surface font-sans">Stable</span>
                    <CheckCircle className="w-4 h-4 text-primary fill-primary text-white shrink-0" />
                  </div>
                </div>

                <div className="p-3 bg-[#f9f9ff] rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                  <p className="text-[10px] font-semibold text-on-surface-variant font-atkinson">Sleep Quality</p>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-base font-bold text-on-surface font-sans">
                      {assessmentData.completed && assessmentData.sleepQuality ? `${assessmentData.sleepQuality}h` : '7.2h'}
                    </span>
                    <Moon className="w-4 h-4 text-on-surface-variant fill-current" />
                  </div>
                </div>

                <div className="p-3 bg-[#f9f9ff] rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                  <p className="text-[10px] font-semibold text-on-surface-variant font-atkinson">Physical Activity</p>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-base font-bold text-on-surface font-sans">
                      {assessmentData.completed && assessmentData.physicalActivity ? `${assessmentData.physicalActivity}m` : '8.4k'}
                    </span>
                    <Activity className="w-4 h-4 text-[#00677d]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Upcoming Appointments Tall Card */}
          <section className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-5 gap-4 shrink-0">
              <h3 className="text-lg font-bold text-on-surface font-sans">Appointments</h3>
              <button 
                onClick={() => alert("Redirecting to granular Calendar scheduling engine.")}
                className="text-primary font-bold text-xs font-atkinson hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Scrollable list */}
            <div className="space-y-3 flex-grow overflow-y-auto pr-1 max-h-[220px]">
              
              {/* Dynamic booked appointments */}
              {bookings.map((book) => (
                <div key={book.id} className="p-3 bg-secondary/5 rounded-xl border border-secondary/10 flex gap-3 relative animate-in fade-in transition-all">
                  <div className="flex-shrink-0 w-11 h-11 bg-secondary text-white rounded-lg flex flex-col items-center justify-center font-sans tracking-tight">
                    <span className="text-[9px] uppercase leading-none font-bold">{book.month}</span>
                    <span className="text-lg font-extrabold leading-tight mt-0.5">{book.date}</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-xs font-bold text-on-surface font-sans truncate">{book.doctorName}</p>
                    <p className="text-[10px] text-on-surface-variant font-atkinson truncate mt-0.5">{book.specialty} Appt</p>
                    <div className="flex items-center gap-1 mt-1 text-secondary">
                      <Clock className="w-3 h-3 text-secondary" />
                      <span className="text-[10px] font-semibold">{book.time} - {book.room}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Standard Placeholder Appointments */}
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 flex gap-3 relative">
                <div className="flex-shrink-0 w-11 h-11 bg-primary text-white rounded-lg flex flex-col items-center justify-center font-sans tracking-tight">
                  <span className="text-[9px] uppercase leading-none font-bold">Oct</span>
                  <span className="text-lg font-extrabold leading-tight mt-0.5">28</span>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-xs font-bold text-on-surface font-sans truncate">Dr. Sarah Miller</p>
                  <p className="text-[10px] text-on-surface-variant font-atkinson truncate mt-0.5 font-semibold">General Cardiology Checkup</p>
                  <div className="flex items-center gap-1 mt-1 text-secondary">
                    <Clock className="w-3 h-3 text-secondary" />
                    <span className="text-[10px] font-semibold">09:30 AM - Room 402</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-outline-variant/30 flex gap-3 opacity-90">
                <div className="flex-shrink-0 w-11 h-11 bg-surface-container-high text-on-surface-variant rounded-lg flex flex-col items-center justify-center font-sans tracking-tight">
                  <span className="text-[9px] uppercase leading-none font-bold">Nov</span>
                  <span className="text-lg font-extrabold leading-tight mt-0.5">05</span>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-xs font-bold text-on-surface font-sans truncate">Annual Lab Work</p>
                  <p className="text-[10px] text-on-surface-variant font-atkinson truncate mt-0.5">Fasting required</p>
                  <div className="flex items-center gap-1 mt-1 text-on-surface-variant">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[10px] font-semibold">Central Lab Facility</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-outline-variant/15 shrink-0">
              <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-xl border border-secondary/5">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-secondary" />
                  <span className="text-[10px] font-bold text-secondary font-atkinson">Telehealth Bridge Ready</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping" />
              </div>
            </div>
          </section>

          {/* Talk to AI Triage CTA Card */}
          <section className="col-span-12 md:col-span-5 bg-gradient-to-br from-primary to-primary-container rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 opacity-20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-32 h-32 text-white" />
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-sans">AI Triage Assistant</h3>
                </div>
                <p className="text-xs text-white/95 leading-relaxed font-sans mb-6">
                  Feeling unwell? Describe your symptoms to our medical AI for instataneous risk assessments and immediate specialist routing schedules.
                </p>
              </div>
              
              <button 
                onClick={() => {
                  alert("Triage diagnostics active: MediTrust AI chat session triggered. Type your symptoms in the clinical chatbot widget located on the Home screen!");
                  onNavigate('home', 'push_back');
                }}
                className="bg-white text-primary font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 self-start hover:bg-neutral-100 transition-colors cursor-pointer active:scale-97 shadow"
              >
                <span>Start Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* Medical Records Summary compact table list */}
          <section className="col-span-12 md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-5 gap-4">
              <h3 className="text-lg font-bold text-on-surface font-sans">Medical Records Summary</h3>
              <div className="flex gap-1.5">
                <button 
                  onClick={() => alert("Downloading digital clinical bundle: records.pdf archived.")}
                  className="p-1.5 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container-high transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => window.print()}
                  className="p-1.5 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container-high transition-colors"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-outline-variant/20 flex-grow">
              <table className="w-full text-left font-sans text-xs">
                <thead className="bg-[#f0f3ff] text-on-surface-variant font-semibold">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Document Type</th>
                    <th className="px-4 py-3 font-semibold">Provider</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr className="hover:bg-[#f9f9ff] transition-colors cursor-pointer">
                    <td className="px-4 py-3 flex items-center gap-2.5 font-bold font-sans">
                      <FileText className="w-4 h-4 text-secondary shrink-0" />
                      <span>Blood Panel Analysis</span>
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant font-atkinson font-semibold">Quest Diagnostics</td>
                    <td className="px-4 py-3 text-on-surface-variant font-atkinson font-semibold">Oct 12, 2024</td>
                    <td className="px-4 py-3 text-right">
                      <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-[10px] font-bold shadow-sm shadow-tertiary/5">Verified</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#f9f9ff] transition-colors cursor-pointer">
                    <td className="px-4 py-3 flex items-center gap-2.5 font-bold font-sans">
                      <FileText className="w-4 h-4 text-secondary shrink-0" />
                      <span>Chest X-Ray Imaging</span>
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant font-atkinson font-semibold">City Medical Imaging</td>
                    <td className="px-4 py-3 text-on-surface-variant font-atkinson font-semibold">Sep 28, 2024</td>
                    <td className="px-4 py-3 text-right">
                      <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-[10px] font-bold shadow-sm shadow-tertiary/5">Verified</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#f9f9ff] transition-colors cursor-pointer">
                    <td className="px-4 py-3 flex items-center gap-2.5 font-bold font-sans">
                      <FileText className="w-4 h-4 text-secondary shrink-0" />
                      <span>Influenza Vaccination</span>
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant font-atkinson font-semibold">CVS Pharmacy #4421</td>
                    <td className="px-4 py-3 text-on-surface-variant font-atkinson font-semibold">Sep 15, 2024</td>
                    <td className="px-4 py-3 text-right">
                      <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-[10px] font-bold shadow-sm shadow-tertiary/5">Verified</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Security Sticky Footer */}
        <footer className="mt-12 border-t border-outline-variant/20 pt-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
          <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
            <div className="flex items-center gap-1 text-primary">
              <ShieldCheck className="w-5 h-5 text-primary fill-primary text-white" />
              <span className="font-extrabold uppercase tracking-widest font-atkinson text-[10px]">Secured by MediShield™</span>
            </div>
            <div className="h-4 w-[1px] bg-outline-variant/30 hidden md:block" />
            <span className="font-atkinson text-[11px]">Last account activity: 14 minutes ago from London, UK</span>
          </div>
          <div className="flex gap-4 font-atkinson text-[11px] font-semibold underline">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">HIPAA Disclosure</a>
            <a className="hover:text-primary transition-colors" href="#">Request Data Export</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
