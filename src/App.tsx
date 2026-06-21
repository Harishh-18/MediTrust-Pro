import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Home from './components/Home';
import Directory from './components/Directory';
import Assessment from './components/Assessment';
import Dashboard from './components/Dashboard';
import { ScreenId, TransitionType, AssessmentState, Booking } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [transitionType, setTransitionType] = useState<TransitionType>('none');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [assessmentData, setAssessmentData] = useState<AssessmentState>({
    familyHistory: [],
    symptoms: [],
    completed: false
  });

  const handleNavigate = (target: ScreenId, transition: TransitionType) => {
    setTransitionType(transition);
    setActiveScreen(target);
  };

  const handleBookConsult = (doctorName: string, specialty: string) => {
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    const randomDate = Math.floor(Math.random() * 20) + 10;
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomRoom = `Room ${Math.floor(Math.random() * 500) + 101}`;
    const times = ['08:00 AM', '10:15 AM', '01:30 PM', '03:45 PM'];
    const randomTime = times[Math.floor(Math.random() * times.length)];

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      doctorName,
      specialty,
      time: randomTime,
      room: randomRoom,
      date: String(randomDate),
      month: randomMonth,
      status: 'Verified'
    };
    
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleUpdateAssessment = (data: AssessmentState) => {
    setAssessmentData(data);
  };

  // Switch display logic
  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return (
          <Home 
            onNavigate={handleNavigate} 
            onBookConsult={handleBookConsult} 
          />
        );
      case 'directory':
        return (
          <Directory 
            onNavigate={handleNavigate} 
            onBookConsult={handleBookConsult} 
          />
        );
      case 'assessment':
        return (
          <Assessment 
            onNavigate={handleNavigate} 
            assessmentData={assessmentData}
            onUpdateAssessment={handleUpdateAssessment}
          />
        );
      case 'dashboard':
        return (
          <Dashboard 
            onNavigate={handleNavigate} 
            assessmentData={assessmentData}
            bookings={bookings}
          />
        );
      default:
        return <div className="text-center p-20">Screen not found.</div>;
    }
  };

  // Motion variants supporting slider and fade transitions
  const screenVariants = {
    initial: (type: TransitionType) => {
      if (type === 'none') {
        return { opacity: 0, x: 0 };
      }
      return {
        x: type === 'push' ? '100vw' : '-100vw',
        opacity: 0
      };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.35,
        opacity: { duration: 0.25 }
      }
    },
    exit: (type: TransitionType) => {
      if (type === 'none') {
        return { opacity: 0, x: 0, transition: { duration: 0.15 } };
      }
      return {
        x: type === 'push' ? '-100vw' : '100vw',
        opacity: 0,
        transition: {
          type: 'tween',
          ease: 'easeInOut',
          duration: 0.35,
          opacity: { duration: 0.25 }
        }
      };
    }
  };

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-background">
      <AnimatePresence mode="wait" initial={false} custom={transitionType}>
        <motion.div
          key={activeScreen}
          custom={transitionType}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
