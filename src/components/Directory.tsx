import { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Bell, 
  Star, 
  SlidersHorizontal,
  ThumbsUp,
  Map,
  List,
  ChevronDown,
  Clock,
  Heart,
  Shield,
  CheckCircle,
  AlertTriangle,
  Locate,
  HelpCircle
} from 'lucide-react';
import { ScreenId, TransitionType } from '../types';

interface DirectoryProps {
  onNavigate: (screen: ScreenId, transition: TransitionType) => void;
  onBookConsult: (doctorName: string, specialty: string) => void;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  facility: string;
  distance: number;
  rating: number;
  reviewsCount: number;
  tags: string[];
  insurance: string[];
  languages: string[];
  nextAvail: string;
  imgUrl: string;
}

export default function Directory({ onNavigate, onBookConsult }: DirectoryProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [checkedInsurances, setCheckedInsurances] = useState<string[]>(['MediCare+ Network']);
  const [maxDistance, setMaxDistance] = useState<number>(15);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [bookedDoctors, setBookedDoctors] = useState<Record<string, boolean>>({});

  const languages = ['English', 'Spanish', 'Mandarin', 'French'];

  const doctorsList = useMemo<Doctor[]>(() => [
    {
      id: "doc-sarah",
      name: "Dr. Sarah Chen, MD",
      specialty: "Cardiology",
      facility: "St. Mary's Medical Center",
      distance: 1.2,
      rating: 4.9,
      reviewsCount: 120,
      tags: ["Heart Failure", "Hypertension"],
      insurance: ["MediCare+ Network", "Global Shield"],
      languages: ["English", "Mandarin"],
      nextAvail: "Tomorrow",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUlpU_wwXvqsbJCJBoDeug6t3_dBTuZdvd0kwIjX_p40SUkDx2QlnPXVZgOFbGPgbv3xHids6DwxriJfrhSns8xOKLIxSdHs1ixqUYB_2PNJMQlm96L2W5ef4yUor9lsATew9kEV9OY6nvfq2QZBYRFHoHvVfaXbdkwLvxjMkHrBCVCt4arkPez6VN2j-R8sOSrewDshxWx8WjwAymzSo-o8QQrXEejYr35iZwb9wja-Iy85X8DvBmPpz1ZPCViVSQUbQNcZh81Ek"
    },
    {
      id: "doc-james",
      name: "Dr. James Miller, MD",
      specialty: "Pediatrics",
      facility: "Children's General",
      distance: 3.5,
      rating: 4.8,
      reviewsCount: 94,
      tags: ["Infant Care", "Immunology"],
      insurance: ["MediCare+ Network", "Apex Health"],
      languages: ["English", "Spanish"],
      nextAvail: "Mon",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-QTLOjQBNuY__vbejN0vi_WGFeejE0THcOkFGPU7FqMVKAsSBKbWtNcoRmKB5gmZBWEjwxt_whNHvvFB60y6DTpjDLEVbmjQaFJ0Pmy_DoSv_2UURvdXx0yo39vCIDH3g-5Sz7bkkzawmKnvlJuNDEoICKQSnEHPaJ75n_w42Kg5WiBX-7jkgLad-YCoyDUXYSkXD9XTLnooinVrrxD50HrOl9zVYBYt9fFTBxMI0pbFA74Lz2YORRTfGXv_U55vvwv_z06e5ydk"
    },
    {
      id: "doc-elena",
      name: "Dr. Elena Rodriguez",
      specialty: "Neurology",
      facility: "Advanced Neuro Institute",
      distance: 0.8,
      rating: 5.0,
      reviewsCount: 215,
      tags: ["Spine Surgery", "Trauma"],
      insurance: ["MediCare+ Network", "Global Shield", "Apex Health"],
      languages: ["English", "Spanish", "French"],
      nextAvail: "Today",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAruHxmaa75sQS8aZEJE2T28hEZdxNHIJ90NA9K5PAtNRsJE5J-g-ueGQ9Xy0vFkGL7DXZsJY9dZ352Rww4Z2FOrn4M5HKtLWbQ9KckxnddSTaC5xhUz4OkSOSLmKugdigDVPTsytKzMR2vw_ww-UuEaT2R7ascOBU2oFCOCI_4xfiRYkQh1ZBFqZPTFfqneaZVO5FMCJe0H1si6JKzceK7a5bQeQv-97caNpjmpHfR8YV947jS80CN3IkQkfVqCuAe5-GfepnHN0Y"
    }
  ], []);

  // Filter application
  const filteredDoctors = useMemo(() => {
    return doctorsList.filter(doc => {
      // Specialty Filter
      if (selectedSpecialty !== 'All Specialties' && doc.specialty !== selectedSpecialty) {
        return false;
      }
      // Search Box Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = doc.name.toLowerCase().includes(query);
        const matchesSpecialty = doc.specialty.toLowerCase().includes(query);
        const matchesFacility = doc.facility.toLowerCase().includes(query);
        if (!matchesName && !matchesSpecialty && !matchesFacility) {
          return false;
        }
      }
      // Distance Filter
      if (doc.distance > maxDistance) {
        return false;
      }
      // Insurance Filter
      if (checkedInsurances.length > 0) {
        const hasMatchingInsurance = checkedInsurances.some(ins => doc.insurance.includes(ins));
        if (!hasMatchingInsurance) {
          return false;
        }
      }
      // Language Filter
      if (selectedLanguage && !doc.languages.includes(selectedLanguage)) {
        return false;
      }
      return true;
    });
  }, [doctorsList, selectedSpecialty, searchQuery, maxDistance, checkedInsurances, selectedLanguage]);

  const handleInsuranceToggle = (ins: string) => {
    setCheckedInsurances(prev => {
      if (prev.includes(ins)) {
        return prev.filter(item => item !== ins);
      } else {
        return [...prev, ins];
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedSpecialty('All Specialties');
    setCheckedInsurances([]);
    setMaxDistance(15);
    setSelectedLanguage('English');
    setSearchQuery('');
  };

  const handleBookAppointment = (doctor: Doctor) => {
    onBookConsult(doctor.name, doctor.specialty);
    setBookedDoctors(prev => ({ ...prev, [doctor.id]: true }));
    setTimeout(() => {
      setBookedDoctors(prev => ({ ...prev, [doctor.id]: false }));
    }, 4000);
  };

  return (
    <div className="bg-surface min-h-screen text-on-surface">
      {/* Top Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-surface-container-lowest shadow-sm h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-12">
            <span 
              onClick={() => onNavigate('home', 'push_back')}
              className="font-sans text-2xl font-bold text-primary tracking-tight cursor-pointer selection:bg-transparent"
            >
              MediTrust Pro
            </span>
            <div className="hidden md:flex gap-8">
              <a className="text-primary font-bold border-b-2 border-primary pb-1 font-sans text-sm cursor-pointer">Find Care</a>
              <a 
                onClick={() => onNavigate('assessment', 'none')}
                className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 font-sans text-sm cursor-pointer"
              >
                Assessments
              </a>
              <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 font-sans text-sm cursor-pointer opacity-70">Resources</a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctors, clinics..." 
                className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary w-64 text-xs font-atkinson"
              />
            </div>
            <button 
              onClick={() => alert("Emergency SOS call generated back-end connection. Dispatching ambulance tracker.")}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-bold font-atkinson hover:opacity-90 active:scale-95 transition-all"
            >
              Emergency Call
            </button>
            <div className="flex gap-4 items-center">
              <Bell className="w-5 h-5 text-on-surface-variant cursor-pointer hover:text-primary transition-colors" />
              <div 
                onClick={() => onNavigate('dashboard', 'push')}
                className="w-8 h-8 rounded-full bg-surface-variant border border-outline-variant overflow-hidden cursor-pointer"
              >
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCHvfLupLy_UZukolEC_RlYCI_7J9McP0YN5qr_tOINp-WOTnP9oS73y44SB5q1CBdfGwdBs-n4XvUSZhf8ymm7jDXG7wIZx1BhwhPE0NYIPZu05UcCMuM7QKpj4NiL1pK2x1NNqg-quxnDiawRhc_ffHppjZyr_rAQ5Nog6srfJs7RU9mx4Hmn38mpnEornSKwVQzWTqK4m9LVA8K0yPHRhjoazEGZ3bWUQ5_qM5f4Yzm27YYcBYWKebBNwpKXINKdyjGdWFsy_M" 
                  alt="Avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16 flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar Filters */}
        <aside className="hidden lg:flex w-80 bg-surface-container-low flex-col p-6 gap-6 border-r border-outline-variant/10 fixed h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary font-sans leading-none flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" /> Filters
            </h2>
            <button 
              onClick={handleClearFilters}
              className="text-primary font-bold text-xs font-atkinson hover:underline cursor-pointer"
            >
              Clear all
            </button>
          </div>

          {/* Specialty Select */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-on-surface-variant font-atkinson">Specialty</label>
            <div className="relative">
              <select 
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg p-2.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
              >
                <option>All Specialties</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
            </div>
          </div>

          {/* Insurance */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-on-surface-variant font-atkinson">Insurance Provider</label>
            <div className="flex flex-col gap-2 bg-white/70 p-3 rounded-lg border border-outline-variant/30">
              {['MediCare+ Network', 'Global Shield', 'Apex Health'].map((ins) => (
                <label key={ins} className="flex items-center gap-2.5 cursor-pointer text-xs font-sans select-none">
                  <input 
                    type="checkbox" 
                    checked={checkedInsurances.includes(ins)}
                    onChange={() => handleInsuranceToggle(ins)}
                    className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                  />
                  <span>{ins}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-atkinson">
              <span className="font-semibold text-on-surface-variant">Distance</span>
              <span className="text-primary font-bold">{maxDistance} miles</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-primary h-1 bg-outline-variant rounded-lg cursor-pointer"
            />
          </div>

          {/* Languages */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-on-surface-variant font-atkinson">Language</label>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span 
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer font-atkinson transition-all ${
                    selectedLanguage === lang 
                      ? 'bg-primary-container text-on-primary-container shadow-sm' 
                      : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-variant'
                  }`}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-outline-variant/20">
            <div className="p-3 bg-primary/5 rounded-xl flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs font-bold text-primary font-sans">Need help?</p>
                <p className="text-[10px] text-on-surface-variant font-atkinson leading-normal">Speak with a care coordinator.</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 lg:ml-80 p-6 lg:p-8 bg-surface flex flex-col gap-6">
          {/* Header Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-on-surface font-sans tracking-tight">Find Nearby Care</h1>
              <p className="text-on-surface-variant text-xs mt-1 font-atkinson">
                Showing {filteredDoctors.length} results in New York, NY {selectedSpecialty !== 'All Specialties' ? `for ${selectedSpecialty}` : ''}
              </p>
            </div>
            
            <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-xl border border-outline-variant/20">
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm text-primary font-extrabold' 
                    : 'text-on-surface-variant'
                }`}
              >
                <List className="w-4 h-4" />
                <span>List View</span>
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'map' 
                    ? 'bg-white shadow-sm text-primary font-extrabold' 
                    : 'text-on-surface-variant'
                }`}
              >
                <Map className="w-4 h-4" />
                <span>Map View</span>
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Central Metro High-priority Hospital Card */}
              {maxDistance >= 3 && (
                <div className="col-span-1 md:col-span-2 xl:col-span-3 bg-white hover:bg-neutral-50/20 rounded-2xl p-6 flex flex-col lg:flex-row gap-6 hover:shadow-lg transition-all border-l-4 border-primary border-t border-r border-b border-outline-variant/30 relative">
                  <div className="w-full lg:w-72 h-44 rounded-xl overflow-hidden shrink-0 relative bg-surface-container">
                    <img 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxyb25FbWGNsdFJo6KQHNGot1iUDqiXbrqOCuV4jRacBRo2LZmV9oAZUJb-okzqY_AnuYGTxfr2OnSggUzxHsFNOp0ip6VrWLASMZtdFVYClXSGLKkvf_WAeByxBhJh8UCiLvpcWvVyoGx0Hogi8UpWvb34l5pycs5odpPAB5il7ljw3toq7ZBcYjZgw2A_Fccha6zTrjPb3wdcrwXtG1C_jqVI-6HvcpEKPQ5bqzMCY0FSjL-QwiaCBx-Q-DH-ljI7UvmQpUPreA" 
                      alt="Hospital external shot"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="px-2 py-0.5 bg-error-container text-on-error-container rounded text-[10px] font-bold uppercase font-atkinson tracking-wider">Level 1 Trauma</span>
                          <span className="text-[11px] text-on-surface-variant font-atkinson font-semibold">2.4 miles away</span>
                        </div>
                        <h3 className="text-xl font-bold text-on-surface font-sans">Central Metro Health System</h3>
                        <p className="text-on-surface-variant text-xs font-sans flex items-center gap-1 mt-1 font-atkinson">
                          <MapPin className="w-4 h-4 text-outline" />
                          450 West 57th St, New York, NY
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="bg-surface-container rounded-xl p-2.5 flex flex-col items-center border border-outline-variant/10 shadow-sm">
                          <span className="text-[9px] font-bold text-on-surface-variant uppercase font-atkinson tracking-wider">ER Wait Time</span>
                          <span className="text-xl font-black text-error font-sans leading-none mt-1">12 min</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-outline-variant/15">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-on-surface-variant font-atkinson font-semibold">ICU Availability</span>
                        <span className="text-xs font-extrabold text-secondary flex items-center gap-1.5 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                          14 Beds Open
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-on-surface-variant font-atkinson font-semibold">Cardiology Unit</span>
                        <span className="text-xs font-bold text-on-surface font-sans mt-0.5">High Capacity</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-on-surface-variant font-atkinson font-semibold">Insurance</span>
                        <span className="text-xs font-bold text-primary font-sans mt-0.5">Accepts MediCare+</span>
                      </div>
                      <div className="flex justify-end items-center col-span-2 lg:col-span-1">
                        <button 
                          onClick={() => alert("Loading granular facility status: Metro Health details panel triggered.")}
                          className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-xs font-bold font-atkinson w-full hover:bg-primary-container active:scale-97 cursor-pointer transition-all shadow-sm"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Loop Doctor Cards */}
              {filteredDoctors.map((doc) => (
                <div 
                  key={doc.id}
                  className="bg-white rounded-2xl p-5 flex flex-col gap-4 border border-outline-variant/30 hover:shadow-md transition-all group relative"
                >
                  <div className="flex justify-between items-start">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-surface-container bg-surface-container shrink-0">
                        <img className="w-full h-full object-cover" src={doc.imgUrl} alt={doc.name} />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-primary text-white p-0.5 rounded-full border border-white">
                        <CheckCircle className="w-3.5 h-3.5 fill-current text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex text-secondary items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-bold font-sans">{doc.rating}</span>
                        <span className="text-[10px] text-on-surface-variant font-atkinson">({doc.reviewsCount})</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant font-atkinson mt-1">Next avail: {doc.nextAvail}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors font-sans">{doc.name}</h4>
                    <p className="text-xs font-semibold text-on-surface-variant font-atkinson mt-0.5">{doc.specialty} Specialist</p>
                    <p className="text-[10px] text-outline mt-1 font-sans">{doc.facility} • {doc.distance} miles</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {doc.tags.map((t, idx) => (
                      <span key={idx} className="bg-surface-container-highest text-on-surface-variant rounded text-[9px] font-bold px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleBookAppointment(doc)}
                    className={`w-full mt-auto py-2.5 border-2 rounded-xl text-xs font-bold transition-all active:scale-97 cursor-pointer ${
                      bookedDoctors[doc.id] 
                        ? 'bg-secondary border-secondary text-white' 
                        : 'border-secondary text-secondary hover:bg-secondary hover:text-white'
                    }`}
                  >
                    {bookedDoctors[doc.id] ? 'Appointment Booked ✓' : 'Book Appointment'}
                  </button>
                </div>
              ))}

              {filteredDoctors.length === 0 && (
                <div className="col-span-full py-16 text-center text-on-surface-variant">
                  <AlertTriangle className="w-12 h-12 mx-auto text-outline mb-3" />
                  <p className="font-bold font-sans text-sm">No doctors match your criteria.</p>
                  <p className="text-xs mt-1 font-atkinson">Try loosening your physical filters or clearing search criteria.</p>
                  <button onClick={handleClearFilters} className="mt-4 bg-primary text-white px-5 py-2 rounded-lg text-xs font-bold font-atkinson">
                    Reset Filter Panel
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Interactive Map Mode */
            <div className="h-[520px] w-full rounded-2xl overflow-hidden relative border border-outline-variant/30 flex flex-col bg-surface-container-low">
              <div className="absolute inset-0 z-0">
                <img 
                  className="w-full h-full object-cover opacity-90" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhN9VnOs_ZOXwtmTk5RS-gB2enYqhfczt3NOK3Nnvv2CFASI6DD5hpAY7r2JyK7W802l8_4EYIZxaTxyIBNO-JSTSbPSS44hpBd_Z_jn3qBf_cWoT9B0-mHyFgNOcWKZPTqU7VhYEjVrAucOmBtnxxV1VCbI8ek1mhzEoz6Z6pnezz03WybdXm-oRGSrWRYAieaG_5Mdk-B1CEkqP7E2MBJhdA9BwveQJo_s-wgDU1xHzZWEWOm0aX4Hch0bHFaOAfrrNptjgzwFQ" 
                  alt="Clinical minimalist Map interface"
                />
              </div>

              {/* Floating Active Pins */}
              <div className="absolute top-1/4 left-1/4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-primary flex items-center gap-2.5 z-10 scale-95 hover:scale-100 transition-transform">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <div className="flex flex-col leading-none">
                  <span className="text-xs font-bold font-sans">Central Metro Health System</span>
                  <span className="text-[9px] text-on-surface-variant font-atkinson mt-0.5">2.4 miles away • 12m wait</span>
                </div>
              </div>

              <div className="absolute top-1/3 right-1/4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-secondary z-10 scale-95 hover:scale-100 transition-transform">
                <span className="w-3 h-3 rounded-full bg-secondary" />
                <div className="flex flex-col leading-none">
                  <span className="text-xs font-bold font-sans">St. Mary's Medical (Dr. Sarah Chen)</span>
                  <span className="text-[9px] text-on-surface-variant font-atkinson mt-0.5">1.2 miles away • Tomorrow</span>
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white hover:bg-neutral-50 shadow-md rounded-xl flex items-center justify-center font-bold text-primary active:scale-90 border border-outline-variant/20 cursor-pointer">+</button>
                <button className="w-10 h-10 bg-white hover:bg-neutral-50 shadow-md rounded-xl flex items-center justify-center font-bold text-primary active:scale-90 border border-outline-variant/20 cursor-pointer">-</button>
              </div>

              <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl max-w-sm border border-outline-variant/20">
                <p className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <Locate className="w-4 h-4" /> Live GPS Core Activated
                </p>
                <p className="text-[10px] text-on-surface-variant font-atkinson mt-1 leading-normal">
                  Showing hospital wait times and direct routes relative to coordinates: <b>New York, NY</b>.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container-highest w-full py-12 border-t border-outline-variant/20 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-bold text-lg text-on-surface font-sans">MediTrust Pro</span>
            <p className="text-on-surface-variant text-xs mt-1 font-atkinson">© 2026 MediTrust Healthcare. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-on-surface-variant text-xs hover:text-primary transition-opacity font-atkinson" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant text-xs hover:text-primary transition-opacity font-atkinson" href="#">Terms of Service</a>
            <a className="text-on-surface-variant text-xs hover:text-primary transition-opacity font-atkinson" href="#">HIPAA Compliance</a>
            <a className="text-on-surface-variant text-xs hover:text-primary transition-opacity font-atkinson" href="#">Accessibility</a>
            <a className="text-on-surface-variant text-xs hover:text-primary transition-opacity font-atkinson" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
