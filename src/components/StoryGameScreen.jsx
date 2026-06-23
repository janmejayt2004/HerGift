import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveDuck from './InteractiveDuck';
import FoodItem from './FoodItem';

import { STICKER_POSITIONS } from '../utils/layout';

export const ALL_GAME_ITEMS = [
  // 2 Correct on Left
  { id: 0, type: "Peas", imageSrc: "/game-stickers/peas.png", pos: { x: '12%', y: '50%' } },
  { id: 1, type: "Corn", imageSrc: "/game-stickers/corn.png", pos: { x: '86%', y: '50%' } },
  // 2 Correct on Right
  { id: 2, type: "Chocolate Bar", imageSrc: "/game-stickers/chocolate-bar.png", pos: { x: '35%', y: '85%' } },
  { id: 3, type: "Water", imageSrc: "/game-stickers/water.png", pos: { x: '70%', y: '35%' } },

  // 4 Decoys on Left
  { id: 4, type: "Decoy", imageSrc: "/game-stickers/carrots.png", pos: { x: '10%', y: '20%' } },
  { id: 5, type: "Decoy", imageSrc: "/game-stickers/cherry.png", pos: { x: '28%', y: '60%' } },
  { id: 7, type: "Decoy", imageSrc: "/game-stickers/french-fries.png", pos: { x: '10%', y: '80%' } },
  { id: 8, type: "Decoy", imageSrc: "/game-stickers/glass-of-milk.png", pos: { x: '85%', y: '20%' } },

  // 4 Decoys on Right
  { id: 9, type: "Decoy", imageSrc: "/game-stickers/ice-cream.png", pos: { x: '30%', y: '30%' } },
  { id: 10, type: "Decoy", imageSrc: "/game-stickers/lychee.png", pos: { x: '65%', y: '68%' } },
  { id: 11, type: "Decoy", imageSrc: "/game-stickers/mango.png", pos: { x: '90%', y: '80%' } },
  { id: 12, type: "Decoy", imageSrc: "/game-stickers/pizza.png", pos: { x: '77%', y: '85%' } }
];

const GAME_STAGES = [
  {
    id: 0,
    dialogue: "Time for your surprises! But first... you need to feed me! I need to eat peas 🫛",
    foodType: "Peas",
    stationId: 'poem'
  },
  {
    id: 1,
    dialogue: "Yummy! 😋 That was good. Now... I want some corn! 🌽",
    foodType: "Corn",
    stationId: 'gallery'
  },
  {
    id: 2,
    dialogue: "So crunchy! ✨ Now I'm craving some chocolate! 🍫",
    foodType: "Chocolate Bar",
    stationId: 'message'
  },
  {
    id: 3,
    dialogue: "Delicious! 💖 Now I'm a bit thirsty. Can I have some water? 💧",
    foodType: "Water",
    stationId: 'video'
  },
  {
    id: 4,
    dialogue: "I'm so full and happy! 🥰 Enjoy your surprises! (Pats please? 👉👈)",
    foodType: null,
    stationId: null
  }
];

const StoryGameScreen = ({ onStationUnlock }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [duckTarget, setDuckTarget] = useState(null);
  const [isDuckEating, setIsDuckEating] = useState(false);
  const [isDuckIdle, setIsDuckIdle] = useState(true);
  const [isDuckSad, setIsDuckSad] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const [idlePositionPct, setIdlePositionPct] = useState({ x: 0.5, y: 0.5 }); // Start exactly in center

  const currentStage = GAME_STAGES[currentStageIndex];

  // Dynamically calculate idle position so it perfectly updates on resize and hot-reload
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate the duck's actual resting pixel position based on the stored percentage
  const idlePosition = {
    x: windowSize.width * idlePositionPct.x,
    y: windowSize.height * idlePositionPct.y
  };

  // Calculate clamped bubble position and tail offset
  const duckX = duckTarget ? duckTarget.x : idlePosition.x;
  const duckY = duckTarget ? duckTarget.y : idlePosition.y;

  const bubbleHalfWidth = windowSize.width < 768 ? Math.min(windowSize.width * 0.45, 175) : 175;
  const bubbleLeft = Math.max(bubbleHalfWidth + 10, Math.min(windowSize.width - bubbleHalfWidth - 10, duckX));

  const tailOffset = duckX - bubbleLeft;
  const maxTailOffset = bubbleHalfWidth - 40;
  const clampedTailOffset = Math.max(-maxTailOffset, Math.min(maxTailOffset, tailOffset));

  const handleBackgroundClick = (e) => {
    // Prevent clicking on food or stickers from triggering this (they should call e.stopPropagation())
    if (e.target !== e.currentTarget && !e.currentTarget.classList.contains('bg-[var(--color-cream)]')) {
      return;
    }

    if (isDuckEating || !isDuckIdle) return;

    const x = e.clientX;
    const y = e.clientY;

    setDuckTarget({ x, y });
    setIsDuckIdle(false);

    // Walk for 2 seconds
    setTimeout(() => {
      setDuckTarget(null);
      setIsDuckIdle(true);
      setIdlePositionPct({
        x: x / window.innerWidth,
        y: y / window.innerHeight
      });
    }, 2000);
  };

  const handleDecoyClick = (e) => {
    e.stopPropagation();
    if (isDuckEating || !isDuckIdle) return;

    setIsDuckSad(true);
    setTimeout(() => setIsDuckSad(false), 2000);
  };

  const handleFoodClick = (e, index) => {
    e.stopPropagation(); // Stop background click from firing
    if (isDuckEating || !isDuckIdle) return;

    if (index < currentStageIndex) {
      // Already eaten, just open the modal directly!
      onStationUnlock(GAME_STAGES[index].stationId);
    } else if (index === currentStageIndex) {
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect) {
        const newTarget = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        setDuckTarget(newTarget);
        setIsDuckIdle(false);

        setTimeout(() => {
          setIsDuckEating(true);

          setTimeout(() => {
            setIsDuckEating(false);

            // Set the new idle position percentage to the food's position!
            const itemObj = ALL_GAME_ITEMS.find(i => i.type === GAME_STAGES[index].foodType);
            const foodPos = itemObj.pos;
            setIdlePositionPct({
              x: parseFloat(foodPos.x) / 100,
              y: parseFloat(foodPos.y) / 100
            });

            setDuckTarget(null);
            setIsDuckIdle(true);
            setCurrentStageIndex(prev => prev + 1); // Advance stage

            onStationUnlock(GAME_STAGES[index].stationId);
          }, 1000);
        }, 2000);
      }
    } else {
      setIsDuckSad(true);
      setTimeout(() => setIsDuckSad(false), 2000);
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden z-0"
      style={{
        backgroundColor: '#F3A895',
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 49px, rgba(140, 40, 40, 0.12) 49px, rgba(140, 40, 40, 0.12) 50px)'
      }}
      onClick={handleBackgroundClick}
    >
      {/* Game Progress UI */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border-2 border-[#6e1d25] shadow-lg flex items-center gap-4">
        <span className="text-[#6e1d25] font-bold font-nunito text-lg">
          Surprises Unlocked: {currentStageIndex < 4 ? currentStageIndex : 4} / 4
        </span>
        <div className="flex gap-2">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`w-4 h-4 rounded-full ${i < currentStageIndex ? 'bg-[#FF1E56]' : 'bg-gray-300'}`}></div>
          ))}
        </div>
      </div>

      {/* Background Decor - Enhancing the beauty to match reference */}
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-[#FFC0CB] rounded-full opacity-30 blur-3xl mix-blend-multiply pointer-events-none"></div>
      <div className="absolute top-10 -right-20 w-[500px] h-[500px] bg-[#E6E6FA] rounded-full opacity-30 blur-3xl mix-blend-multiply pointer-events-none"></div>

      {/* 4 Corner Bows */}
      {[
        { top: '20px', left: '20px', transform: 'rotate(-45deg)' },
        { top: '20px', right: '20px', transform: 'rotate(45deg)' },
        { bottom: '20px', left: '20px', transform: 'rotate(-135deg) scaleX(-1)' },
        { bottom: '20px', right: '20px', transform: 'rotate(135deg) scaleX(-1)' }
      ].map((pos, i) => (
        <svg key={i} className="absolute w-24 h-24 md:w-32 md:h-32 pointer-events-none drop-shadow-lg z-0" style={pos} viewBox="0 0 100 100" fill="#6e1d25">
          <path d="M 50 40 C 15 0, -10 40, 0 50 C -10 60, 15 100, 50 60 Z" />
          <path d="M 50 40 C 85 0, 110 40, 100 50 C 110 60, 85 100, 50 60 Z" />
          <ellipse cx="50" cy="50" rx="8" ry="12" />
          <path d="M 45 60 C 35 80, 20 100, 25 110 C 40 100, 50 80, 52 65 Z" />
          <path d="M 55 60 C 65 80, 80 100, 75 110 C 60 100, 50 80, 48 65 Z" />
        </svg>
      ))}

      {/* Clouds */}
      <svg className="absolute top-[25%] -left-12 w-48 h-32 pointer-events-none opacity-90 z-0 drop-shadow-md" viewBox="0 0 100 50" fill="white">
        <path d="M 20 40 A 15 15 0 0 1 20 10 A 20 20 0 0 1 60 10 A 15 15 0 0 1 80 15 A 15 15 0 0 1 80 40 Z" />
      </svg>
      <svg className="absolute bottom-[20%] -right-12 w-56 h-36 pointer-events-none opacity-90 z-0 drop-shadow-md" viewBox="0 0 100 50" fill="white">
        <path d="M 20 40 A 15 15 0 0 1 20 10 A 20 20 0 0 1 60 10 A 15 15 0 0 1 80 15 A 15 15 0 0 1 80 40 Z" />
      </svg>

      {/* The Parallax Scrapbook Background was moved to intro screen */}

      {/* Dialogue Box - Follows the Duck with Clamping */}
      <motion.div
        className="absolute z-30 w-[90%] max-w-[350px]"
        animate={{
          left: bubbleLeft,
          top: duckY - 120
        }}
        transition={{ duration: 2, ease: "easeInOut" }} // Match the duck's exact walking speed!
        style={{ transform: 'translate(-50%, -100%)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isDuckSad ? 'sad' : currentStageIndex}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="bg-[#F0F8FF]/95 backdrop-blur-sm p-6 rounded-[2.5rem] shadow-[0_15px_30px_rgba(0,0,0,0.15)] border-4 border-[#B0E0E6] text-center relative"
          >
            <p className="text-xl md:text-2xl font-bold text-[#5C4A47] font-nunito leading-snug">
              {isDuckSad
                ? (currentStage.foodType ? `I want ${currentStage.foodType} first! 🥺` : `I'm too full to eat that! 🥰`)
                : currentStage.dialogue}
            </p>
            {/* Thought bubble trail dynamically pointing to duck */}
            <div
              className="absolute -bottom-5 w-5 h-5 bg-[#F0F8FF] border-[3px] border-[#B0E0E6] rounded-full z-0 transition-all duration-700"
              style={{ left: `calc(50% + ${clampedTailOffset}px)`, transform: 'translateX(-50%)' }}
            ></div>
            <div
              className="absolute -bottom-10 w-3 h-3 bg-[#F0F8FF] border-[2px] border-[#B0E0E6] rounded-full z-0 transition-all duration-700"
              style={{ left: `calc(50% + ${clampedTailOffset + (clampedTailOffset > 0 ? 5 : -5)}px)`, transform: 'translateX(-50%)' }}
            ></div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {ALL_GAME_ITEMS.map((item, index) => {
        const stageIndex = GAME_STAGES.findIndex(s => s.foodType === item.type);
        const isDecoy = item.type === "Decoy";
        const isEaten = !isDecoy && stageIndex < currentStageIndex;
        const isLocked = !isDecoy && stageIndex > currentStageIndex;
        const isActive = !isDecoy && stageIndex === currentStageIndex;
        const isCurrentlyBeingEaten = isActive && isDuckEating;

        const pos = item.pos;

        return (
          <div
            key={item.id}
            id={`food-${item.id}`}
            className="absolute z-10"
            style={{
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.5s ease-in-out'
            }}
          >
            <FoodItem
              id={`draggable-food-${item.id}`}
              type={item.type}
              imageSrc={item.imageSrc}
              isEating={isCurrentlyBeingEaten}
              isEaten={isEaten}
              isLocked={isLocked}
              onClick={(e) => isDecoy ? handleDecoyClick(e) : handleFoodClick(e, stageIndex)}
            />
          </div>
        );
      })}

      {/* Interactive Duck */}
      <InteractiveDuck
        targetPosition={duckTarget || (idlePosition.x !== 0 ? idlePosition : null)}
        isEating={isDuckEating}
        isIdle={isDuckIdle}
        isSad={isDuckSad}
      />
    </div>
  );
};

export default StoryGameScreen;
