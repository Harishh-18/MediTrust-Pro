import { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Bell, 
  Flame, 
  Radio, 
  Brain, 
  Activity, 
  Heart, 
  Clock, 
  BedDouble, 
  UserPlus, 
  ArrowRight, 
  Star, 
  Navigation,
  MessageSquare,
  X,
  Send,
  Sparkles
} from 'lucide-react';
import { ScreenId, TransitionType } from '../types';

interface HomeProps {
  onNavigate: (screen: ScreenId, transition: TransitionType) => void;
  onBookConsult: (doctorName: string, specialty: string) => void;
}

export default function Home({ onNavigate, onBookConsult }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot', text: string }>>([
    { sender: 'bot', text: "Hello! I'm your MediTrust Assistant. How can I assist you with your health inquiry today?" }
  ]);
  const [bookedStatus, setBookedStatus] = useState<Record<string, boolean>>({});

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    
    setTimeout(() => {
      let reply = "Thank you for sharing. Based on your input, you might want to complete our Health Assessment Tool or explore a Cardiologist or General Physician.";
      if (userMsg.toLowerCase().includes('heart') || userMsg.toLowerCase().includes('chest')) {
        reply = "Chest discomfort is a critical symptom. If you are experiencing an emergency, click the red 'Emergency Call' button immediately! If it's a routine inquiry, I recommend Dr. Elena Rodriguez (Cardiologist).";
      } else if (userMsg.toLowerCase().includes('brain') || userMsg.toLowerCase().includes('headache')) {
        reply = "Frequent head pressure or neuro questions are serviced by Dr. James Chen, our Neurological Surgeon. Would you like to schedule an assessment?";
      } else if (userMsg.toLowerCase().includes('child') || userMsg.toLowerCase().includes('kid')) {
        reply = "Dr. Sarah Miller specializes in pediatric care and vaccinations. You can view her availability under 'Find Care'.";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 1000);
  };

  const handleBook = (name: string, specialty: string) => {
    onBookConsult(name, specialty);
    setBookedStatus(prev => ({ ...prev, [name]: true }));
    setTimeout(() => {
      setBookedStatus(prev => ({ ...prev, [name]: false }));
    }, 3000);
  };

  const doctorsData = [
    {
      name: "Dr. Elena Rodriguez",
      specialty: "Senior Cardiologist",
      rating: "4.9 ★",
      tags: ["Heart Care", "Tele-Health"],
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrM1PXel146G_7nYR3_YBbyJlADDigzeHewqm0yxbYf0_cuK_Y5cagq9sD5XehdLnj4wGUhfK8hbgcRuG2_BbUnGuDMrtU3WB9vV97l45RM6kBrJApL_CDzEo1aEPUiUpxGPoN7u4GfrLcIqr9qGOUEzscHshTN5ChoJ5VBQTjN5urBny7NQPIgtbKhQEwGrT9mW3D_UNhh9-76LKVOZKyctiDHEKpz9McP37KL9jzBAn4kkv81_RabHMzYRVlK7HTH_uK5lRlKTk"
    },
    {
      name: "Dr. James Chen",
      specialty: "Neurological Surgeon",
      rating: "5.0 ★",
      tags: ["Brain Scan", "Post-Op"],
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXl4hcZqLn9GlRhunW3UtWpU91DGFmSTj8NCQIVTDZzr01HLNAqU4YGH2GOyZ9CWTuwgdDGlXHb5XciCwiOQ5H9FmYuEIVGAyQOzjCigMEqIcru52X2N18-A0oqxuy0Bw_M3HeYp-KAhRn0Fs7njp6nh25gIIJ-YFG88YYe6I_wRYTk5kKWLqHg1ovKYB7l9YOVMjXEe6qk5U8LfoNf57QNzcoMhrYplhjdGjzD4cVokmvqg-IWThN7ceNTAbNa8Btx3p8hrDk4yc"
    },
    {
      name: "Dr. Sarah Miller",
      specialty: "Pediatric Specialist",
      rating: "4.8 ★",
      tags: ["Child Health", "Vaccination"],
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6CZOhln-rzpBXaKJSet2BtGsufTC5piLROdxKmCUtYE4Jqr2AAuRmhp5_b2_PX7lgK3FN740j95L5LdeXhJZWunuY2SYA4-91iwTvQvr4EdJK3YHpmap9H2j90fLd76SX6oTEJdEAMfP2kPrCVpsuy4I2UftVKkwh_uFQ0FkmjtfwdJs-gBblz1M0_2ubyiov8UL-oq2DlGtbZq4ONZVaJRfCZfWWLPVizZw0MhSP4hpHi0AhnrkVzeTROECpA26WMf6rIz9F30U"
    },
    {
      name: "Dr. Marcus Thorne",
      specialty: "Orthopedic Specialist",
      rating: "4.9 ★",
      tags: ["Sports Med", "Recovery"],
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA7jcqn3oxzT8ATUPdG_oj-c1Os8ZnpPB8dJwH91zw8TZmXpGHtwpKWaYesCClKdRdid5ukRagrkQlzxYnXGtxYKv0SNs1jqAfdBD_Fc8ZULCabRP8QdCKpzIwIn_tWU6qiZOn0ymbDYbep4WLSmdsn3yoDkTrNghqU-3QhtD6qgRLFdgNfC-13vCLXDaiEGyEb0uT1Y1Z_U2s1IZu2NyxoNOolzwA0ZJFtIn8iGXyyzNW9vJwoFItVN0egDQrp_pdm4GRsDyMriU"
    }
  ];

  return (
    <div className="bg-surface font-sans text-on-surface">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-sm h-16">
        <nav className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center w-full">
          <div className="flex items-center gap-12">
            <span className="font-sans text-2xl font-bold text-primary tracking-tight">MediTrust Pro</span>
            <div className="hidden md:flex items-center gap-8">
              <a 
                onClick={() => onNavigate('directory', 'push')}
                className="text-primary font-bold border-b-2 border-primary pb-1 font-sans text-sm cursor-pointer transition-colors"
              >
                Find Care
              </a>
              <a 
                onClick={() => onNavigate('assessment', 'push')}
                className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 font-sans text-sm cursor-pointer"
              >
                Assessments
              </a>
              <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 font-sans text-sm cursor-pointer opacity-70">
                Resources
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 text-on-surface-variant font-medium hover:text-primary p-2 cursor-pointer transition-colors rounded-full hover:bg-surface-container">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('dashboard', 'push')}
              className="text-on-surface font-semibold hover:text-primary px-4 py-2 cursor-pointer transition-colors font-sans text-sm"
            >
              Login
            </button>
            <button 
              onClick={() => alert("Connecting to Emergency Services... Dispatching GPS coordinates 40.7128° N, 74.0060° W.")}
              className="bg-error text-on-error px-4 py-2 rounded-lg font-bold flex items-center gap-2 cursor-pointer hover:bg-red-700 transition-all shadow-sm text-sm"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              Emergency Call
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[750px] flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwa5wKIop6FyVi0a8YCjJvOPiWoWts0jzS6EbFEmfCVLlI-6_ZLPdaM1nsUozjYn_bbMdONKUdK6jALVyPJ3JRgYCPgxyoV0di_JsZRueZYz0aZTDeCdBX9YQHnC3K0ipHDIZ279JfpxG2N7rmA3JDevJ_X6UesYGYzVrJz8i5eHxB9d9I8ugqHrg35CVMpNmcx5s0-2w1iyTUkha44Ah33Vd1D9SfR0HgW1qx_6NBLdVzrnSazWgEdQCCCmirhnsbS7IIsOqvkSM')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/95 via-surface-container-lowest/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-extrabold mb-6 text-on-surface font-sans leading-tight tracking-tight">
              Next-Generation <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Clinical Care</span> Within Your Reach.
            </h1>
            <p className="text-lg text-on-surface-variant font-sans mb-8 leading-relaxed max-w-lg">
              Access world-class medical expertise, real-time hospital tracking, and AI-driven health predictions all in one secure platform.
            </p>

            {/* Search Bar */}
            <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-outline-variant/30 flex flex-col md:flex-row items-stretch gap-2">
              <div className="flex-1 flex items-center px-4 py-2 border-r border-outline-variant/30 gap-3">
                <Search className="w-5 h-5 text-outline shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none text-on-surface text-sm placeholder:text-outline" 
                  placeholder="Find a doctor, hospital, or specialty"
                />
              </div>
              <div className="flex items-center px-4 py-2 border-r border-outline-variant/30 gap-2 min-w-[180px]">
                <MapPin className="w-5 h-5 text-outline" />
                <span className="text-on-surface-variant text-xs font-semibold font-atkinson">New York, NY</span>
              </div>
              <button 
                onClick={() => onNavigate('directory', 'push')}
                className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:bg-primary-container transition-all shadow-md text-sm cursor-pointer whitespace-nowrap"
              >
                Search Now
              </button>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                <div 
                  className="w-10 h-10 rounded-full border-2 border-white bg-cover bg-center" 
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGlJs0A6cNnRJ98-oZkhALwpznA40y6nf661bzrbbTU30pS0TsHsuwx6SUR8fPGoTF4Yts8gLDJ9u0ddfppsiHt6wOLPn1BIXGSd87VBQ7kqm8Tmsyvog6YEzBdgDxJzCkcyWI4dkUQq3EcKeXXNPid1aJVby0NC_QTMQgqCzvvgvAjkGn8hLGwUfVxlNXFlJpB5N1gYnJcBYYLI6CCJsRrK0TJHZZ8GgBJLy-O42z5nyZk3XZxsaeduZPRbdts3kCelmVVqLY6m8')` }}
                />
                <div 
                  className="w-10 h-10 rounded-full border-2 border-white bg-cover bg-center" 
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjw8SBlqp7K8aasxqhs8NEpVoCWpwIdh-T6Tu94yhY6qjkSBYYxLmqXdA4nOM_p5JYDuHAV7whqu5H4NUCNN4XVt80bpnMwLZ6OiU2kRiM_Bya8SAEVYwxQsREg7vbvYgXxWyg_J3--TgjdpD96uE1UbIKZtvmbrybzA6l3qacxUs7ipzYx50EkKLG-dFldM2_11NG84id8ke_B7V4TSnfSA_SXI4ufb_LgfZFQSVM4PhOFaht0I2LvkfWBOEJiM0Jpx3ERHgKHXE')` }}
                />
                <div 
                  className="w-10 h-10 rounded-full border-2 border-white bg-cover bg-center" 
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxQ5uoELmCTQd2FMyZSbWFpNkabCzDXySOOdo7P-RgYVTlZitsYjUVtefdbL-MRH0lRI3cQEBFWaFm_htsoZs230z65A2V60izFLpbrjMGU8raJZj6oSD5SkxnccDAIs3s73KbfPoOyipyKyhFfvN6WNMXYgk77NCUpXkYU70hWfHRidhp-vf9Cz2IRSN7k6a4vWSxVD0YIUD2rW5gIdk1x8Rh66lDw6B6-uhwdfzkQ7Rk2bueHrjMBoWw0q0Tqg5ZYhnFR2OfGaA')` }}
                />
              </div>
              <p className="text-xs font-semibold text-on-surface-variant font-atkinson">
                <span className="font-extrabold text-on-surface text-sm">5,000+</span> Expert Doctors available 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Health Prediction Tools */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-secondary font-bold font-atkinson uppercase text-xs tracking-wider">Predictive Healthcare</span>
              <h2 className="text-3xl font-bold mt-2 font-sans tracking-tight text-on-surface">AI-Driven Health Insights</h2>
              <p className="text-sm text-on-surface-variant mt-3 font-sans leading-relaxed">
                Leveraging advanced machine learning to provide clinical precision in risk assessment and proactive wellness management.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('assessment', 'push')}
              className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm font-sans"
            >
              Explore All Tools <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
            {/* Main Cardiovascular Risk Card */}
            <div className="md:col-span-8 bg-surface-container-low rounded-2xl overflow-hidden relative group p-8 flex flex-col justify-end border border-outline-variant/30">
              <div className="absolute inset-0 z-0">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-102 transition-transform duration-750" 
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCOpjw5Rrn_IrdpSkQ4pbiLJMPvlyTOdnR6DIwmZglueuf3E_uOitQVDG7JpGf7FOEN06bMonwo1OzQj7P9bX4whTifmIwt-F0fXjCNaT6QZhSFOQ-dC4wx98cNpbM8uEb-bQ3eChIeqjNbkZKeV6Y57wCZNe8worT-HbdKQS1OF-4znq6HYy1VuLgJu2xwJm-RrQhSgEvMYILwyupsqzQcUgG8KumMSYlueMakBW4gf0ratv1iK98tGVreXQtZiVcjEfNwWrCC5b8')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/20 to-transparent" />
              </div>
              <div className="relative z-10 max-w-md">
                <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full inline-flex items-center gap-1.5 text-xs font-bold font-atkinson mb-3 shadow-sm shadow-secondary/10">
                  <Flame className="w-3.5 h-3.5 text-secondary" /> High Precision
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-2 tracking-tight">Cardiovascular Risk Predictor</h3>
                <p className="text-sm text-on-surface-variant font-sans leading-relaxed">
                  Our proprietary AI analyzes 50+ biomarkers to forecast heart health trends with 98.4% clinical accuracy.
                </p>
              </div>
            </div>

            {/* Side Grid */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="flex-1 bg-primary text-on-primary p-8 rounded-2xl flex flex-col justify-between shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform" />
                <Brain className="w-12 h-12 text-white/90" />
                <div>
                  <h4 className="text-xl font-bold mb-2 tracking-tight">Genomic Profiling</h4>
                  <p className="text-xs text-white/80 leading-relaxed font-sans">
                    Personalized medicine based on your unique DNA blueprint.
                  </p>
                </div>
              </div>

              <div className="flex-1 bg-surface-container-high border border-outline-variant/30 p-8 rounded-2xl flex flex-col justify-between">
                <Activity className="w-12 h-12 text-primary" />
                <div>
                  <h4 className="text-xl font-bold text-on-surface mb-2 tracking-tight">Neural Health Scan</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                    Early detection tools for cognitive performance and neuro-wellness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Hospital Tracking */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Container */}
            <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-surface-container-high">
              <div className="absolute inset-0">
                <div 
                  className="w-full h-full bg-cover bg-center grayscale-20"
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBp_nw8vWOJIEjZ45oFgEy_Mw3Ugaw9y2pUXWwJuOnCRXFVbIBKVJv4Xqo3bgfe8Sy4PjlNAYn7Nr6hFwVSgCnnE2iSnrKf9nJsg4zoDnVr9mTST36Ee1iRMBgFQ2WZukjS30-NSzlFRl5OqqCOfAVsy3pr-Vjmv2vhQg2xyVArL4ujPzE-vUlrxuURu-smDWApqh92bbOl83QgbVBhtc0Oepzs6dcy4geUXNCJsEs_ptrmsCLKBK0ewjwMx6ozIlwLsC1WkVVdL8E')` }}
                />
                <div className="absolute inset-0 bg-primary/5" />

                {/* Animated Markers */}
                <div className="absolute top-1/4 left-1/3 animate-bounce shadow-lg">
                  <div className="bg-white p-2.5 rounded-xl shadow-xl border border-primary flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                      <Heart className="w-4 h-4 fill-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary font-sans leading-none">St. Jude Medical</p>
                      <p className="text-[10px] text-secondary font-bold font-sans mt-1">8 min wait</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-1/3 right-1/4 animate-bounce delay-1500 shadow-lg">
                  <div className="bg-white p-2.5 rounded-xl shadow-xl border border-secondary flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center text-secondary">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-secondary font-sans leading-none">Central ER</p>
                      <p className="text-[10px] text-error font-bold font-sans mt-1">12 min wait</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between border border-outline-variant/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-md shrink-0">
                    <Navigation className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-atkinson">Nearest ER to you</p>
                    <p className="text-sm font-bold text-on-surface font-sans">4.2 miles • 12 mins driving</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Routing directions initialized to central ER via default navigation app.")}
                  className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold font-atkinson text-xs hover:bg-primary-container transition-all"
                >
                  Navigate
                </button>
              </div>
            </div>

            <div className="lg:pl-8">
              <span className="text-primary font-bold font-atkinson uppercase text-xs tracking-wider">Live Monitoring</span>
              <h2 className="text-3xl font-bold mt-2 mb-6 font-sans tracking-tight">Real-time Facility Tracking</h2>
              <p className="text-sm text-on-surface-variant mb-8 leading-relaxed font-sans">
                Stop waiting in uncertainty. Our live dashboard tracks emergency room capacity, specialist availability, and wait times across all MediTrust partner facilities in your area.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-4 p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-outline-variant/30">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface font-sans">Live Wait Times</h4>
                    <p className="text-xs text-on-surface-variant font-sans mt-0.5">Updated every 60 seconds from direct ER feeds.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4 p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-outline-variant/30">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
                    <BedDouble className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface font-sans">Bed Availability</h4>
                    <p className="text-xs text-on-surface-variant font-sans mt-0.5">Check real-time surgical and ICU bed occupancy.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4 p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-outline-variant/30">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface font-sans">On-call Specialists</h4>
                    <p className="text-xs text-on-surface-variant font-sans mt-0.5">Find out which world-class doctors are on-site right now.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Doctor Directory */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-sans tracking-tight text-on-surface">World-Class Expertise</h2>
            <p className="text-sm text-on-surface-variant mt-3 font-sans">Consult with the top 1% of board-certified specialists globally.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctorsData.map((doc, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-4 border border-outline-variant/30 hover:shadow-xl transition-all group duration-300"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-4 relative bg-surface-container">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={doc.imgUrl} 
                    alt={doc.name}
                  />
                </div>
                <div className="px-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-on-surface text-sm font-sans">{doc.name}</h4>
                      <p className="text-xs text-on-surface-variant font-sans mt-0.5">{doc.specialty}</p>
                    </div>
                    <div className="bg-secondary-fixed text-on-secondary-fixed text-[11px] px-2 py-0.5 rounded font-extrabold font-atkinson shrink-0">
                      {doc.rating}
                    </div>
                  </div>

                  <div className="flex gap-1.5 mt-4">
                    {doc.tags.map((t, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded font-bold text-[10px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleBook(doc.name, doc.specialty)}
                    className={`w-full mt-5 py-2.5 border-2 rounded-xl text-xs font-bold transition-all active:scale-97 cursor-pointer ${
                      bookedStatus[doc.name] 
                        ? 'bg-secondary border-secondary text-white' 
                        : 'border-primary text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    {bookedStatus[doc.name] ? 'Appointment Booked ✓' : 'Book Consult'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-primary-container rounded-3xl p-12 md:p-16 relative overflow-hidden text-center text-on-primary-container shadow-2xl">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-container/25 opacity-70" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl font-extrabold mb-6 font-sans tracking-tight">Your Health Journey, Reimagined.</h2>
              <p className="text-base text-on-primary-container/90 mb-10 max-w-lg mx-auto font-sans leading-relaxed">
                Join 2M+ patients who trust MediTrust Pro for their primary care and advanced clinical needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => onNavigate('assessment', 'push')}
                  className="bg-white text-primary-container px-10 py-4 rounded-xl font-bold font-atkinson text-sm hover:scale-102 transition-all shadow-lg active:scale-98 cursor-pointer"
                >
                  Get Started for Free
                </button>
                <button 
                  onClick={() => alert("Sales chat line connected. Please contact support at sales@meditrust-pro.com.")}
                  className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold font-atkinson text-sm hover:bg-white hover:text-primary transition-all active:scale-98 cursor-pointer"
                >
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-highest py-12 border-t border-outline-variant/25">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-xl font-bold text-on-surface block mb-1 font-sans">MediTrust Pro</span>
            <p className="text-xs text-on-surface-variant font-atkinson">© 2026 MediTrust Healthcare. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors font-atkinson">Privacy Policy</a>
            <a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors font-atkinson">Terms of Service</a>
            <a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors font-atkinson">HIPAA Compliance</a>
            <a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors font-atkinson">Accessibility</a>
            <a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors font-atkinson">Contact Support</a>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
        {chatOpen && (
          <div className="mb-4 w-[360px] bg-white rounded-2xl shadow-2xl border border-outline-variant/45 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
            <div className="bg-primary p-4 flex items-center justify-between text-on-primary">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm font-sans">MediTrust AI</p>
                  <p className="text-[10px] text-white/80">Online | Clinical Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-80 p-4 overflow-y-auto bg-surface-container-low/30 space-y-4">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-[11px] text-on-primary">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm font-sans ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white text-on-surface border border-outline-variant/20 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-outline-variant/20 flex gap-2 bg-white">
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type symptoms or questions..."
                className="flex-grow bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-primary text-on-primary p-2.5 rounded-xl transition-all hover:bg-primary-container active:scale-95 shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-primary text-on-primary w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
        >
          {chatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
