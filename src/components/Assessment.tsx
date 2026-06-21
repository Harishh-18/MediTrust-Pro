import { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Sparkles, 
  User, 
  Settings, 
  ShieldAlert, 
  TrendingUp, 
  Heart, 
  CheckCircle,
  HelpCircle,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Shield,
  FileText,
  Clock,
  Activity
} from 'lucide-react';
import { ScreenId, TransitionType, AssessmentState } from '../types';

interface AssessmentProps {
  onNavigate: (screen: ScreenId, transition: TransitionType) => void;
  assessmentData: AssessmentState;
  onUpdateAssessment: (data: AssessmentState) => void;
}

export default function Assessment({ onNavigate, assessmentData, onUpdateAssessment }: AssessmentProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Local form states initialized with main screen state if it exists
  const [age, setAge] = useState(assessmentData.age || '');
  const [sex, setSex] = useState<'Male' | 'Female' | undefined>(assessmentData.biologicalSex);
  const [familyHistory, setFamilyHistory] = useState<string[]>(assessmentData.familyHistory || []);
  const [activity, setActivity] = useState<number>(assessmentData.physicalActivity || 30);
  const [sleep, setSleep] = useState<number>(assessmentData.sleepQuality || 7);
  const [smoking, setSmoking] = useState<string>(assessmentData.smokingHabit || 'Never Smoked');
  const [symptoms, setSymptoms] = useState<string[]>(assessmentData.symptoms || []);

  const handleToggleFamilyHistory = (illness: string) => {
    if (illness === 'None') {
      setFamilyHistory(['None']);
    } else {
      setFamilyHistory(prev => {
        const filtered = prev.filter(i => i !== 'None');
        if (filtered.includes(illness)) {
          return filtered.filter(i => i !== illness);
        } else {
          return [...filtered, illness];
        }
      });
    }
  };

  const handleToggleSymptom = (symptom: string) => {
    setSymptoms(prev => {
      if (prev.includes(symptom)) {
        return prev.filter(s => s !== symptom);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const updated: AssessmentState = {
      age,
      biologicalSex: sex,
      familyHistory,
      physicalActivity: activity,
      sleepQuality: sleep,
      smokingHabit: smoking,
      symptoms,
      completed: true,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    onUpdateAssessment(updated);
    alert("Analysis complete! Your personalized health scorecard has been compiled in your Patient Dashboard.");
    onNavigate('dashboard', 'push');
  };

  return (
    <div className="bg-background min-h-screen text-on-background flex flex-col pt-16">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-sm h-16">
        <nav className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center w-full">
          <div className="flex items-center gap-12">
            <span 
              onClick={() => onNavigate('home', 'push_back')}
              className="font-sans text-2xl font-bold text-primary tracking-tight cursor-pointer selection:bg-transparent"
            >
              MediTrust Pro
            </span>
            <div className="hidden md:flex gap-8">
              <a 
                onClick={() => onNavigate('directory', 'none')}
                className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 font-sans text-sm cursor-pointer"
              >
                Find Care
              </a>
              <a className="text-primary font-bold border-b-2 border-primary pb-1 font-sans text-sm cursor-pointer">
                Assessments
              </a>
              <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 font-sans text-sm cursor-pointer opacity-70">
                Resources
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined p-2 rounded-full hover:bg-surface-container transition-all">
              <Bell className="w-5 h-5 text-on-surface-variant" />
            </button>
            <div className="hidden md:flex gap-3">
              <button 
                onClick={() => alert("SOS dispatcher active. Standard protocols generated online.")}
                className="px-4 py-2 text-xs rounded-lg border border-primary text-primary font-bold hover:bg-primary/5 transition-all cursor-pointer"
              >
                Emergency Call
              </button>
              <button 
                onClick={() => onNavigate('dashboard', 'push')}
                className="px-4 py-2 text-xs rounded-lg bg-primary text-white font-bold hover:opacity-90 transition-all cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex flex-col items-center pt-8 px-6 pb-20 max-w-4xl mx-auto w-full">
        
        {/* Medical Disclaimer Box */}
        <div className="w-full mb-8">
          <div className="bg-error-container text-on-error-container p-4 rounded-xl flex gap-4 items-start border border-error/15">
            <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
            <div className="flex-grow">
              <p className="font-sans text-xs font-bold text-error tracking-wide uppercase mb-1">Medical Disclaimer</p>
              <p className="text-xs opacity-90 leading-relaxed font-sans">
                This health risk assessment tool is for educational purposes only and does not constitute medical advice, diagnosis, or treatment. If you are experiencing a medical emergency, please call emergency services immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Assessment Card Frame */}
        <div className="w-full bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/35 relative overflow-hidden">
          
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-3">
              <div>
                <h1 className="text-2xl font-bold font-sans text-primary tracking-tight">Health Risk Assessment</h1>
                <p className="text-xs text-on-surface-variant font-sans mt-1">Complete this 5-minute assessment to understand your health profile better.</p>
              </div>
              <span className="text-primary font-bold text-xs font-atkinson" id="progress-text">Step {currentStep} of {totalSteps}</span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-300 ease-out" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Steps Presentation */}
          <div className="min-h-[300px]">
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-right-5 duration-200">
                <h2 className="text-lg font-bold text-on-surface mb-6 font-sans">General Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Age */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-on-surface-variant font-atkinson">Your Age</label>
                    <input 
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter age"
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Biological Sex */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-on-surface-variant font-atkinson">Biological Sex</label>
                    <div className="flex gap-3 h-10">
                      <button 
                        type="button"
                        onClick={() => setSex('Male')}
                        className={`flex-1 rounded-lg text-xs font-bold border transition-all ${
                          sex === 'Male' 
                            ? 'bg-primary border-primary text-white shadow-sm' 
                            : 'bg-white border-outline-variant hover:bg-surface-variant hover:border-outline text-on-surface'
                        }`}
                      >
                        Male
                      </button>
                      <button 
                        type="button"
                        onClick={() => setSex('Female')}
                        className={`flex-1 rounded-lg text-xs font-bold border transition-all ${
                          sex === 'Female' 
                            ? 'bg-primary border-primary text-white shadow-sm' 
                            : 'bg-white border-outline-variant hover:bg-surface-variant hover:border-outline text-on-surface'
                        }`}
                      >
                        Female
                      </button>
                    </div>
                  </div>

                  {/* Family History */}
                  <div className="md:col-span-2 flex flex-col gap-2 mt-2">
                    <label className="text-xs font-semibold text-on-surface-variant font-atkinson">Do you have a family history of chronic illnesses?</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Diabetes', 'Heart Disease', 'Hypertension', 'None'].map((illness) => (
                        <div 
                          key={illness}
                          onClick={() => handleToggleFamilyHistory(illness)}
                          className={`flex items-center gap-2 px-4 py-3 bg-surface-container-low rounded-lg border cursor-pointer hover:border-primary transition-all select-none ${
                            familyHistory.includes(illness) ? 'border-primary bg-primary/5 font-extrabold text-primary' : 'border-outline-variant'
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            checked={familyHistory.includes(illness)}
                            readOnly
                            className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary pointer-events-none"
                          />
                          <span className="text-xs font-sans">{illness}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-5 duration-200 flex flex-col gap-6">
                <h2 className="text-lg font-bold text-on-surface font-sans">Lifestyle Habits</h2>
                
                {/* Physical Activity */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-atkinson">
                    <span className="font-semibold text-on-surface-variant">Daily Physical Activity</span>
                    <span className="text-primary font-bold">{activity} min</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="180" 
                    step="15"
                    value={activity}
                    onChange={(e) => setActivity(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-outline-variant rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-outline font-atkinson">
                    <span>Sedentary</span>
                    <span>Very Active</span>
                  </div>
                </div>

                {/* Sleep */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-atkinson">
                    <span className="font-semibold text-on-surface-variant">Sleep Quality</span>
                    <span className="text-primary font-bold">{sleep} hours/night</span>
                  </div>
                  <input 
                    type="range" 
                    min="4" 
                    max="12" 
                    step="0.5"
                    value={sleep}
                    onChange={(e) => setSleep(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-outline-variant rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-outline font-atkinson">
                    <span>Restless</span>
                    <span>Deep Sleep</span>
                  </div>
                </div>

                {/* Smoking */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-on-surface-variant font-atkinson">Smoking Habits</label>
                  <select 
                    value={smoking}
                    onChange={(e) => setSmoking(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-xs text-on-surface focus:ring-1 focus:ring-primary focus:outline-none appearance-none cursor-pointer"
                  >
                    <option>Never Smoked</option>
                    <option>Former Smoker</option>
                    <option>Occasional Smoker</option>
                    <option>Daily Smoker</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-right-5 duration-200">
                <h2 className="text-lg font-bold text-on-surface mb-2 font-sans">Current Symptoms</h2>
                <p className="text-xs text-on-surface-variant mb-6 font-sans">Select any symptoms you have experienced in the last 14 days.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Frequent Headaches", desc: "Occurring more than 3 times a week", icon: Activity },
                    { title: "Persistent Fatigue", desc: "Feeling tired even after deep rest", icon: Clock },
                    { title: "Shortness of Breath", desc: "Occurs during light daily activity", icon: FileText },
                    { title: "Chest Pain", desc: "Occasional sharp or dull central aches", icon: Heart }
                  ].map((symp) => {
                    const SymIcon = symp.icon;
                    const isActive = symptoms.includes(symp.title);
                    return (
                      <div 
                        key={symp.title}
                        onClick={() => handleToggleSymptom(symp.title)}
                        className={`p-4 border rounded-xl flex items-center justify-between cursor-pointer transition-all select-none hover:border-primary ${
                          isActive 
                            ? 'bg-primary-container text-white border-primary' 
                            : 'border-outline-variant bg-white text-on-surface'
                        }`}
                      >
                        <div className="text-left font-sans">
                          <p className="font-bold text-xs">{symp.title}</p>
                          <p className={`text-[10px] mt-0.5 ${isActive ? 'text-white/80' : 'text-on-surface-variant'}`}>{symp.desc}</p>
                        </div>
                        <SymIcon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-outline-variant'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-right-5 duration-200 flex flex-col items-center">
                <div className="w-16 h-16 bg-secondary/15 text-secondary rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-secondary fill-current" />
                </div>
                <h2 className="text-xl font-bold text-on-surface mb-2 font-sans text-center">Ready to Analyze</h2>
                <p className="text-xs text-on-surface-variant max-w-md mx-auto mb-6 text-center font-sans">
                  We have gathered enough clinical insights to formulate your preliminary health scorecard.
                </p>

                <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 text-left w-full max-w-md">
                  <h3 className="text-xs font-bold text-primary mb-3 flex items-center gap-2 font-sans uppercase tracking-wider">
                    <FileText className="w-4 h-4" /> Review details
                  </h3>
                  <ul className="space-y-2 text-xs text-on-surface-variant font-sans">
                    <li className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                      <span>Demographics:</span> 
                      <span className="text-on-surface font-semibold">{age ? `${age} years old` : 'Not specified'} · {sex || 'Not specified'}</span>
                    </li>
                    <li className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                      <span>Lifestyle Data:</span> 
                      <span className="text-on-surface font-semibold">Sleep: {sleep}h · Activity: {activity}m</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Symptoms Logged:</span> 
                      <span className="text-on-surface font-semibold">{symptoms.length} listed</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex justify-between items-center border-t border-outline-variant/25 pt-6">
            <button 
              type="button"
              disabled={currentStep === 1}
              onClick={handlePrevStep}
              className="flex items-center gap-1 text-xs text-on-surface-variant font-bold hover:text-primary transition-all disabled:opacity-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            {currentStep === totalSteps ? (
              <button 
                type="button"
                onClick={handleSubmit}
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:opacity-95 active:scale-97 cursor-pointer text-xs"
              >
                Submit Assessment <Sparkles className="w-4 h-4 text-white" />
              </button>
            ) : (
              <button 
                type="button"
                onClick={handleNextStep}
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:opacity-95 active:scale-97 cursor-pointer text-xs"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Bento Info boxes */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full font-sans">
          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 flex flex-col gap-2.5">
            <Shield className="w-7 h-7 text-primary" />
            <h4 className="font-bold text-xs text-on-surface">Data Privacy</h4>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Your health data is fully encrypted and HIPAA compliant. We never share your credentials or logs with third parties.
            </p>
          </div>
          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 flex flex-col gap-2.5">
            <CheckCircle className="w-7 h-7 text-secondary" />
            <h4 className="font-bold text-xs text-on-surface">Medical Validation</h4>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Assessment algorithms are evaluated weekly by board-certified clinical panels and primary care experts.
            </p>
          </div>
          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 flex flex-col gap-2.5">
            <Activity className="w-7 h-7 text-tertiary" />
            <h4 className="font-bold text-xs text-on-surface">Patient Care Priority</h4>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Formulated for ultimate cognitive clarity, focusing purely on zeroing medical jargon to put you first.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest mt-auto border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
          <span className="font-bold text-sm text-on-surface font-sans">MediTrust Pro</span>
          <div className="flex flex-wrap justify-center gap-6 font-atkinson">
            <a className="hover:text-primary transition-opacity" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-opacity" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-opacity" href="#">HIPAA Compliance</a>
            <a className="hover:text-primary transition-opacity" href="#">Accessibility</a>
            <a className="hover:text-primary transition-opacity" href="#">Contact Support</a>
          </div>
          <p>© 2026 MediTrust Healthcare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
