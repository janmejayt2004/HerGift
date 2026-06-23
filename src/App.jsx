import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StoryGameScreen from './components/StoryGameScreen';
import StorybookModal from './components/StorybookModal';
import PoemSection from './components/PoemSection';
import MessageSection from './components/MessageSection';
import GallerySection from './components/GallerySection';
import VideoSection from './components/VideoSection';
import BirthdayCakeScreen from './components/BirthdayCakeScreen';
import PinScreen from './components/PinScreen';

function App() {
  const [currentPhase, setCurrentPhase] = useState('pin'); // 'pin', 'cake', 'foodGame'
  const [activeStation, setActiveStation] = useState(null);

  const renderStationContent = () => {
    switch (activeStation) {
      case 'poem':
        return <PoemSection />;
      case 'message':
        return <MessageSection />;
      case 'gallery':
        return <GallerySection />;
      case 'video':
        return <VideoSection />;
      default:
        return null;
    }
  };

  const getStationTitle = () => {
    switch (activeStation) {
      case 'poem': return 'A Little Poem For You 📜';
      case 'message': return 'A Special Message 💌';
      case 'gallery': return 'Beautiful Memories 📸';
      case 'video': return 'Surprise Video 🎬';
      default: return '';
    }
  };

  const handleModalClose = () => {
    setActiveStation(null);
  };

  return (
    <div className="w-full h-screen bg-[var(--color-cream)] relative overflow-hidden">
      
      <AnimatePresence mode="wait">
        {currentPhase === 'pin' && (
          <PinScreen key="pin" onUnlock={() => setCurrentPhase('cake')} />
        )}
        {currentPhase === 'cake' && (
          <BirthdayCakeScreen key="cake" onFinish={() => setCurrentPhase('foodGame')} />
        )}
        {currentPhase === 'foodGame' && (
          <StoryGameScreen key="game" onStationUnlock={(id) => setActiveStation(id)} />
        )}
      </AnimatePresence>

      {/* The Storybook Modal for Surprises */}
      <StorybookModal 
        isOpen={!!activeStation} 
        onClose={handleModalClose}
        title={getStationTitle()}
      >
        {renderStationContent()}
      </StorybookModal>
    </div>
  );
}

export default App;
