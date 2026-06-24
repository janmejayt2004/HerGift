import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import BackgroundScrapbook from './BackgroundScrapbook';

const Candle = ({ isBlown, onClick }) => {
  return (
    <div
      className="relative flex flex-col items-center cursor-pointer transform hover:scale-110 transition-transform"
      onClick={onClick}
    >
      {/* Smoke */}
      {isBlown && (
        <motion.div
          initial={{ opacity: 1, y: 0, scale: 0.5 }}
          animate={{ opacity: 0, y: -40, scale: 1.5 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-10 w-4 h-6 bg-gray-300 rounded-full blur-sm z-[100]"
        />
      )}

      {/* Flame */}
      {!isBlown && (
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 0.4 }}
          className="absolute -top-8 w-4 h-8 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-100 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[0_0_15px_#facc15] z-[100]"
          style={{ filter: "blur(0.5px)" }}
        />
      )}

      {/* Wick */}
      <div className="w-1 h-2 bg-gray-800 rounded-t-sm z-[90]" />

      {/* Candle Body */}
      <div className="w-4 h-16 rounded-sm bg-gradient-to-b from-pink-100 to-pink-200 border border-pink-300 shadow-inner relative overflow-hidden z-[90]">
        {/* Stripes */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,105,180,0.4)_4px,rgba(255,105,180,0.4)_8px)]" />
      </div>
    </div>
  );
};

const TypingText = ({ text, className, style }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <motion.h1
      className={`flex flex-wrap justify-center ${className}`}
      style={style}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const EDITOR_MODE = false;

const BirthdayCakeScreen = ({ onFinish }) => {
  const [phase, setPhase] = useState(0);
  // 0: Initial Mount (Cake slides in)
  // 1: Stickers fade in + Typing Text
  // 2: Duck appears (Candles)
  // 3: Celebration
  // 4: The Question

  const [candlesBlown, setCandlesBlown] = useState([false, false, false]);
  const [allBlown, setAllBlown] = useState(false);
  const [duckMood, setDuckMood] = useState('normal'); // 'normal', 'sad', 'happy'
  const [showText, setShowText] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

  // Editor State
  const [editorPositions, setEditorPositions] = useState({ stickers: {}, text: {}, cake: {}, duck: {} });
  const [showExport, setShowExport] = useState(false);

  const handleUpdatePos = (id, type, event, info) => {
    if (!EDITOR_MODE) return;
    const rect = event.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const xPercent = ((centerX / window.innerWidth) * 100).toFixed(2) + '%';
    const yPercent = ((centerY / window.innerHeight) * 100).toFixed(2) + '%';

    setEditorPositions(prev => {
      const next = { ...prev };
      if (type === 'sticker') {
        next.stickers[id] = { x: xPercent, y: yPercent };
      } else {
        next[type] = { x: xPercent, y: yPercent };
      }
      return next;
    });
  };

  useEffect(() => {
    // Sequence the phases
    const t1 = setTimeout(() => { setPhase(1); setShowText(true); }, 2200); // Cake is in, start stickers & text
    // Fade out removed so text stays!
    const t2 = setTimeout(() => setPhase(2), 7900); // Wait for stickers and typing text, then duck

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleBlowCandle = (index) => {
    if (phase < 2 || candlesBlown[index] || allBlown) return;

    const newBlown = [...candlesBlown];
    newBlown[index] = true;
    setCandlesBlown(newBlown);

    if (newBlown.every((blown) => blown)) {
      setAllBlown(true);
      setPhase(3); // Celebration
    }
  };

  useEffect(() => {
    if (allBlown) {
      // Fire confetti!
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFB6C1', '#FF69B4', '#FF1493', '#FFF0F5', '#E6E6FA'],
          zIndex: 999
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFB6C1', '#FF69B4', '#FF1493', '#FFF0F5', '#E6E6FA'],
          zIndex: 999
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Proceed to next phase after a delay
      const t3 = setTimeout(() => {
        setPhase(4);
      }, 4000);

      return () => clearTimeout(t3);
    }
  }, [allBlown]);

  const handleSurpriseChoice = (choice) => {
    if (choice === 'no') {
      setDuckMood('sad');
    } else {
      setDuckMood('happy');
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, zIndex: 999 });
      setTimeout(() => onFinish(), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FFC0CB] to-[#D8BFD8] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#FFB6C1] rounded-full opacity-40 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#DDA0DD] rounded-full opacity-40 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-40 right-32 w-48 h-48 bg-[#FFDAB9] rounded-full opacity-40 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-56 h-56 bg-[#FFC0CB] rounded-full opacity-40 blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

      {/* Floating sparkles/stars */}
      <div className="absolute top-[20%] left-[15%] text-4xl opacity-60 animate-bounce z-10" style={{ animationDelay: '0.2s', animationDuration: '3s' }}>✨</div>
      <div className="absolute top-[8%] right-[5%] text-5xl opacity-60 animate-bounce z-10" style={{ animationDelay: '1.2s', animationDuration: '4s' }}>⭐</div>
      <div className="absolute bottom-[25%] left-[20%] text-4xl opacity-60 animate-bounce z-10" style={{ animationDelay: '0.8s', animationDuration: '2.5s' }}>💖</div>
      <div className="absolute top-[40%] right-[10%] text-4xl opacity-60 animate-bounce z-10" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}>🎈</div>
      <div className="absolute bottom-[40%] right-[25%] text-3xl opacity-60 animate-bounce z-10" style={{ animationDelay: '1.5s', animationDuration: '3s' }}>✨</div>
      <div className="absolute top-[85%] left-[5%] text-5xl opacity-60 animate-bounce z-10" style={{ animationDelay: '0.3s', animationDuration: '4.5s' }}>🎉</div>

      {/* Additional Girlie Emojis to fill blank spaces */}
      <div className="absolute top-[5%] left-[40%] text-4xl opacity-60 animate-bounce z-10" style={{ animationDelay: '1.0s', animationDuration: '4s' }}>🎀</div>
      <div className="absolute top-[50%] left-[2%] text-4xl opacity-60 animate-bounce z-10" style={{ animationDelay: '2.1s', animationDuration: '3.2s' }}>💄</div>
      <div className="absolute bottom-[5%] left-[45%] text-4xl opacity-60 animate-bounce z-10" style={{ animationDelay: '0.7s', animationDuration: '3.8s' }}>💅</div>
      <div className="absolute top-[70%] right-[5%] text-4xl opacity-60 animate-bounce z-10" style={{ animationDelay: '1.8s', animationDuration: '4.2s' }}>🌸</div>
      <div className="absolute bottom-[10%] right-[15%] text-4xl opacity-60 animate-bounce z-10" style={{ animationDelay: '0.4s', animationDuration: '3.6s' }}>👑</div>
      <div className="absolute top-[10%] left-[60%] text-4xl opacity-60 animate-bounce z-10" style={{ animationDelay: '0.9s', animationDuration: '3.5s' }}>💍</div>
      <div className="absolute top-[25%] left-[2%] text-4xl opacity-60 animate-bounce z-10" style={{ animationDelay: '1.4s', animationDuration: '3.1s' }}>👗</div>
      <div className="absolute bottom-[15%] left-[80%] text-4xl opacity-60 animate-bounce z-10" style={{ animationDelay: '2.0s', animationDuration: '4.5s' }}>👠</div>
      <div className="absolute top-[85%] right-[40%] text-4xl opacity-60 animate-bounce z-10" style={{ animationDelay: '1.1s', animationDuration: '3.9s' }}>👜</div>
      <div className="absolute top-[30%] right-[5%] text-4xl opacity-60 animate-bounce z-10" style={{ animationDelay: '0.6s', animationDuration: '2.8s' }}>💎</div>

      {/* Editor Controls */}
      {EDITOR_MODE && (
        <div className="absolute top-4 left-4 z-[9999] flex flex-col gap-2">
          <button
            onClick={() => setShowExport(!showExport)}
            className="bg-black text-green-400 font-mono px-4 py-2 rounded-lg shadow-2xl border-2 border-green-400 font-bold hover:bg-gray-900"
          >
            {showExport ? "HIDE EXPORT" : "EXPORT LAYOUT"}
          </button>
          {showExport && (
            <textarea
              readOnly
              className="w-[400px] h-[300px] bg-black text-green-400 font-mono text-xs p-3 rounded-lg shadow-2xl border-2 border-green-400 overflow-auto"
              value={JSON.stringify(editorPositions, null, 2)}
              onClick={e => e.target.select()}
            />
          )}
        </div>
      )}

      {/* Scrapbook Stickers (Phase 1+) */}
      {phase >= 1 && <BackgroundScrapbook animateIn={true} isEditorMode={EDITOR_MODE} onUpdatePos={handleUpdatePos} />}

      {/* Title */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, -8, 0], rotate: [-1, 1, -1] }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            transition={{ duration: 0.8, y: { repeat: Infinity, duration: 4, ease: "easeInOut" }, rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
            className="absolute top-[4%] md:top-[6%] w-full flex justify-center z-[100] pointer-events-none"
          >
            {/* Innovative Magical Sparkles */}
            <motion.div animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], rotate: 180 }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-6 left-[15%] md:left-[25%] text-4xl text-yellow-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">✨</motion.div>
            <motion.div animate={{ opacity: [0, 1, 0], scale: [0.8, 1.8, 0.8], rotate: -90 }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.8 }} className="absolute top-8 right-[10%] md:right-[20%] text-5xl text-pink-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">✨</motion.div>
            <motion.div animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: 45 }} transition={{ repeat: Infinity, duration: 1.8, delay: 1.5 }} className="absolute -bottom-8 left-[30%] md:left-[40%] text-3xl text-cyan-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">✨</motion.div>

            <div className="relative">
              {phase >= 3 ? (
                <motion.h1
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 leading-[1.1] pb-6 px-4 text-center"
                  style={{
                    fontFamily: '"Sniglet", cursive',
                    filter: "drop-shadow(3px 3px 0px rgba(255,255,255,1)) drop-shadow(6px 6px 0px rgba(255,105,180,0.6))"
                  }}
                >
                  Chatpati baddie<br />turns 21 today
                </motion.h1>
              ) : (
                <TypingText
                  text="Happy Birthday Suhani!"
                  className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 leading-[1.1] pb-6 px-4 text-center"
                  style={{
                    fontFamily: '"Sniglet", cursive',
                    backgroundSize: "200% 200%",
                    filter: "drop-shadow(3px 3px 0px rgba(255,255,255,1)) drop-shadow(6px 6px 0px rgba(255,105,180,0.6))"
                  }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Cake */}
      <div className="relative z-50 flex flex-col items-center mt-32 md:mt-40 scale-[1.1] md:scale-[1.4] pointer-events-none">
        <motion.div
          drag={EDITOR_MODE}
          dragMomentum={false}
          onDragEnd={(e, i) => handleUpdatePos('cake', 'cake', e, i)}
          initial={EDITOR_MODE ? { scale: 1.1, y: 0, opacity: 1 } : { scale: 0.8, y: 300, opacity: 0 }}
          animate={EDITOR_MODE ? {} : { scale: 1.1, y: 0, opacity: 1 }}
          transition={{ duration: 1.2, type: 'spring', damping: 15 }}
          className={`flex flex-col items-center pointer-events-auto ${EDITOR_MODE ? 'cursor-move' : ''}`}
        >
          {/* Candles Container */}
          <div className="flex gap-8 mb-[-10px] z-[70] relative">
            {candlesBlown.map((isBlown, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 + (i * 0.2) }}
              >
                <Candle isBlown={isBlown} onClick={() => handleBlowCandle(i)} />
              </motion.div>
            ))}
          </div>

          {/* Top Tier */}
          <div className="relative z-[60] flex flex-col items-center">
            {/* Top Surface */}
            <div className="w-32 h-12 bg-[#FFB6C1] rounded-[50%] border-4 border-white shadow-[inset_0_-10px_0_rgba(0,0,0,0.1)] relative flex justify-center z-20">
              {/* Strawberries sitting perfectly */}
              <div className="absolute -top-3 left-2 text-lg drop-shadow-sm z-30">🍓</div>
              <div className="absolute -top-3 left-12 text-lg drop-shadow-sm z-30">🍓</div>
              <div className="absolute -top-3 right-2 text-lg drop-shadow-sm z-30">🍓</div>
            </div>
            {/* Body */}
            <div className="w-32 h-16 bg-[#FFB6C1] border-x-4 border-b-4 border-[#FF69B4] -mt-6 relative z-10 overflow-hidden">
              {/* Sprinkles on Top Tier Body */}
              <div className="absolute top-8 left-4 w-2 h-1 bg-yellow-300 rounded-full rotate-45"></div>
              <div className="absolute top-10 left-12 w-2 h-1 bg-cyan-300 rounded-full -rotate-12"></div>
              <div className="absolute top-8 right-6 w-2 h-1 bg-purple-400 rounded-full rotate-90"></div>
              <div className="absolute top-12 left-8 w-2 h-1 bg-white rounded-full rotate-12"></div>
              <div className="absolute top-10 right-12 w-2 h-1 bg-red-400 rounded-full rotate-12"></div>
            </div>
          </div>

          {/* Middle Tier */}
          <div className="relative z-[50] flex flex-col items-center -mt-8">
            {/* Top Surface */}
            <div className="w-48 h-16 bg-[#FFC0CB] rounded-[50%] border-4 border-white shadow-[inset_0_-10px_0_rgba(0,0,0,0.1)] relative flex justify-center items-center z-20">
              <div className="absolute top-1 text-2xl drop-shadow-sm z-10">🎀</div>
              {/* Strawberries on the edge */}
              <div className="absolute -top-1 left-2 text-lg drop-shadow-sm">🍓</div>
              <div className="absolute -top-1 right-2 text-lg drop-shadow-sm">🍓</div>
              <div className="absolute top-2 left-10 text-lg drop-shadow-sm">🍓</div>
              <div className="absolute top-2 right-10 text-lg drop-shadow-sm">🍓</div>
            </div>
            {/* Body */}
            <div className="w-48 h-20 bg-[#FFC0CB] border-x-4 border-b-4 border-[#FF82AB] -mt-8 relative overflow-hidden z-10">
              {/* Stripes */}
              <div className="flex w-full h-full justify-around absolute inset-0">
                <div className="w-4 h-full bg-[#FF69B4] opacity-30 transform -skew-x-12"></div>
                <div className="w-4 h-full bg-[#FF69B4] opacity-30 transform -skew-x-12"></div>
                <div className="w-4 h-full bg-[#FF69B4] opacity-30 transform -skew-x-12"></div>
                <div className="w-4 h-full bg-[#FF69B4] opacity-30 transform -skew-x-12"></div>
                <div className="w-4 h-full bg-[#FF69B4] opacity-30 transform -skew-x-12"></div>
              </div>
              {/* Chocolate pieces and sprinkles */}
              <div className="absolute top-10 left-6 text-xs drop-shadow-sm">🍫</div>
              <div className="absolute top-14 right-8 text-xs drop-shadow-sm">🍫</div>
              <div className="absolute top-12 left-16 text-xs drop-shadow-sm">🍫</div>
              <div className="absolute top-10 right-16 w-2 h-1 bg-yellow-300 rounded-full rotate-45"></div>
              <div className="absolute top-14 left-20 w-2 h-1 bg-cyan-300 rounded-full -rotate-12"></div>
              <div className="absolute top-12 right-24 w-2 h-1 bg-white rounded-full rotate-90"></div>
            </div>
          </div>

          {/* Bottom Tier */}
          <div className="relative z-[40] flex flex-col items-center -mt-10">
            {/* Top Surface */}
            <div className="w-64 h-20 bg-[#FFE4E1] rounded-[50%] border-4 border-white shadow-[inset_0_-10px_0_rgba(0,0,0,0.1)] relative flex justify-center z-20">
              <div className="absolute top-1 left-4 text-lg drop-shadow-sm">🍓</div>
              <div className="absolute top-1 right-4 text-lg drop-shadow-sm">🍓</div>
              <div className="absolute top-4 left-16 text-lg drop-shadow-sm">🍓</div>
              <div className="absolute top-4 right-16 text-lg drop-shadow-sm">🍓</div>

              <div className="absolute top-4 left-24 text-sm drop-shadow-sm">🍫</div>
              <div className="absolute top-4 right-24 text-sm drop-shadow-sm">🍫</div>
              <div className="absolute top-8 left-32 text-sm drop-shadow-sm">🍫</div>
              <div className="absolute top-6 left-8 text-sm drop-shadow-sm">🍫</div>
              <div className="absolute top-6 right-8 text-sm drop-shadow-sm">🍫</div>
            </div>
            {/* Body */}
            <div className="w-64 h-24 bg-[#FFE4E1] border-x-4 border-b-4 border-[#FFB6C1] -mt-10 relative z-10 overflow-hidden">
              {/* Sprinkles absolute positioned to stay safely inside */}
              <div className="absolute top-10 left-6 w-2 h-6 bg-pink-400 rounded-full shadow-sm transform rotate-45"></div>
              <div className="absolute top-12 left-14 w-2 h-6 bg-yellow-400 rounded-full shadow-sm transform -rotate-12"></div>
              <div className="absolute top-14 left-24 w-2 h-6 bg-blue-400 rounded-full shadow-sm transform rotate-12"></div>
              <div className="absolute top-10 left-32 w-2 h-6 bg-red-400 rounded-full shadow-sm transform rotate-90"></div>
              <div className="absolute top-16 left-40 w-2 h-6 bg-white rounded-full shadow-sm transform -rotate-45"></div>
              <div className="absolute top-12 right-12 w-2 h-6 bg-purple-400 rounded-full shadow-sm transform rotate-[30deg]"></div>
              <div className="absolute top-10 right-6 w-2 h-6 bg-orange-400 rounded-full shadow-sm transform -rotate-[60deg]"></div>
              <div className="absolute top-16 right-24 w-2 h-6 bg-green-400 rounded-full shadow-sm transform rotate-12"></div>
              <div className="absolute top-12 right-32 w-2 h-6 bg-cyan-400 rounded-full shadow-sm transform -rotate-45"></div>

              {/* Extra chocolates */}
              <div className="absolute top-12 left-4 text-xs drop-shadow-sm">🍫</div>
              <div className="absolute top-16 right-4 text-xs drop-shadow-sm">🍫</div>
              <div className="absolute top-10 left-44 text-xs drop-shadow-sm">🍫</div>
            </div>
          </div>

          {/* Plate */}
          <div className="w-80 h-16 bg-[#E6E6FA] rounded-[50%] border-b-8 border-[#CBAACB] -mt-12 z-[30] relative shadow-[0_30px_40px_-5px_rgba(0,0,0,0.3)]"></div>
        </motion.div>
      </div>

      {/* Duck Character & Dialogue */}
      {phase >= 1 && (
        <div
          className="absolute flex items-end transform scale-[0.9] md:scale-[1.1] z-[100] pointer-events-none"
          style={{ right: '10%', bottom: '5%' }}
        >
          <motion.div
            drag={EDITOR_MODE}
            dragMomentum={false}
            onDragEnd={(e, i) => handleUpdatePos('duck', 'duck', e, i)}
            initial={EDITOR_MODE ? { x: 0, opacity: 1 } : { x: '-100vw', opacity: 1 }}
            animate={EDITOR_MODE ? {} : { x: 0, opacity: 1 }}
            transition={{ duration: 5.5, ease: [0.25, 1, 0.5, 1] }}
            className={`relative flex flex-col items-center pointer-events-auto ${EDITOR_MODE ? 'cursor-move' : ''}`}
          >
            {/* Dialogue Cloud Bubble */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20, x: '-50%' }}
                animate={phase === 3 ? { scale: [1, 1.05, 1], opacity: 1, y: 0, x: '-50%' } : { opacity: 1, scale: 1, y: 0, x: '-50%' }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.6 }}
                className="absolute bottom-[100%] left-[50%] bg-white px-5 py-4 rounded-[2.5rem] shadow-2xl border-4 border-sky-200 mb-4 w-max max-w-[260px] md:max-w-[300px] text-center"
              >
                {/* Extra Cloud Puffs for Fluffiness */}
                <div className="absolute -top-4 left-6 w-12 h-12 bg-white rounded-full z-0"></div>
                <div className="absolute -top-5 right-10 w-16 h-16 bg-white rounded-full z-0"></div>

                {/* Cloud Tail */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-r-4 border-b-4 border-sky-200 rotate-45 z-10"></div>

                <div className="relative z-20">
                  {phase === 2 && (
                    <p className="text-[#5C4A47] font-nunito font-bold text-[14px] leading-snug">
                      BabyDolll! ✨ Make a wish,<br />then tap candles to blow! 🎂
                    </p>
                  )}
                  {phase === 3 && (
                    <p className="text-[#5C4A47] font-nunito font-bold text-[14px] leading-snug">
                      Wooohoo! ✨ Your beautiful wish<br />is definitely coming true! 💫
                    </p>
                  )}
                  {phase === 4 && duckMood !== 'happy' && (
                    <div>
                      <p className="text-[#5C4A47] font-nunito font-bold text-[14px] leading-snug mb-3">
                        Do you want to see your surprises?
                      </p>
                      <div className="flex gap-3 justify-center relative">
                        <button
                          onClick={() => handleSurpriseChoice('yes')}
                          className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all z-10"
                        >
                          Yes! ✨
                        </button>
                        <motion.button
                          animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                          onHoverStart={() => {
                            const randomX = (Math.random() - 0.5) * 200;
                            const randomY = (Math.random() - 0.5) * 200;
                            setNoBtnPos({ x: randomX, y: randomY });
                            setDuckMood('sad'); // Make the duck look sad when she tries to say no!
                          }}
                          onClick={() => handleSurpriseChoice('no')}
                          className="bg-gray-200 text-gray-600 px-5 py-2 rounded-full text-sm font-bold shadow-sm z-20"
                        >
                          No
                        </motion.button>
                      </div>
                    </div>
                  )}
                  {phase === 4 && duckMood === 'happy' && (
                    <p className="text-[#5C4A47] font-nunito font-bold text-[14px] leading-snug">
                      Yay! Let's gooooo! 🥳
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Cute Static Duck with Party Hat */}
            <div className="w-24 h-24 relative mt-2">
              <motion.div
                animate={
                  duckMood === 'happy' || phase === 3 ? { y: [0, -20, 0] } :
                    duckMood === 'sad' ? { rotate: -10, y: 10 } :
                      { y: [0, -5, 0] }
                }
                transition={{ repeat: Infinity, duration: (duckMood === 'happy' || phase === 3) ? 0.6 : 2 }}
                className="absolute inset-0"
              >
                {/* Party Hat */}
                <div className="absolute -top-6 left-5 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-purple-400 rotate-12 z-30 drop-shadow-md">
                  <div className="absolute top-0 -left-1.5 w-3 h-3 bg-yellow-400 rounded-full transform -translate-y-full"></div>
                </div>

                <div className="absolute top-0 left-4 w-12 h-12 bg-white rounded-full border border-gray-200 shadow-sm z-10 overflow-hidden">
                  {/* Sad eye */}
                  {duckMood === 'sad' && <div className="absolute top-4 left-6 w-3 h-1 bg-gray-800 rotate-[-10deg]"></div>}
                  {/* Happy/Normal eye */}
                  {duckMood !== 'sad' && <div className="absolute top-4 left-6 w-2 h-2 bg-gray-800 rounded-full"></div>}

                  {/* Tears */}
                  {duckMood === 'sad' && (
                    <>
                      <motion.div animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute top-6 left-5 w-1 h-2 bg-blue-400 rounded-full"></motion.div>
                      <motion.div animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }} className="absolute top-7 left-7 w-1 h-2 bg-blue-400 rounded-full"></motion.div>
                    </>
                  )}
                </div>
                <div className="absolute top-3 left-12 w-6 h-4 bg-yellow-400 rounded-full z-10 shadow-sm"></div>
                {/* Blush */}
                <div className="absolute top-6 left-4 w-3 h-2 bg-pink-300 rounded-full z-20 opacity-70"></div>
                <div className="absolute top-8 left-0 w-20 h-14 bg-white rounded-full border border-gray-200 shadow-md z-0"></div>
                <div className="absolute top-6 left-0 w-8 h-8 bg-white rounded-t-full transform -rotate-45 z-0"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default BirthdayCakeScreen;
