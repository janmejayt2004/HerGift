import React from 'react';
import { motion } from 'framer-motion';
import BackgroundScrapbook from './BackgroundScrapbook';

const ScrapbookIntroScreen = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      {/* Trendy Paper Background */}
      <div className="absolute inset-0 bg-[#FFF5F7]" 
           style={{
             backgroundImage: 'radial-gradient(#FFB6C1 1px, transparent 1px)',
             backgroundSize: '24px 24px'
           }}
      ></div>

      {/* The Parallax Scrapbook Background with new big stickers */}
      <BackgroundScrapbook />

      {/* Decorative Washi Tape */}
      <div className="absolute top-4 left-10 w-32 h-8 bg-pink-300/40 rotate-[-5deg] z-20 backdrop-blur-sm" />
      <div className="absolute top-8 right-12 w-24 h-8 bg-purple-300/40 rotate-[10deg] z-20 backdrop-blur-sm" />
      <div className="absolute bottom-12 left-20 w-40 h-10 bg-yellow-200/40 rotate-[-3deg] z-20 backdrop-blur-sm" />

      {/* Center Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: -5 }}
          transition={{ type: "spring", damping: 12, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border-4 border-white shadow-2xl relative max-w-2xl w-[90%] text-center pointer-events-auto"
        >
          {/* Internal corner tapes */}
          <div className="absolute -top-4 -left-4 w-12 h-4 bg-pink-400/50 rotate-[-45deg]" />
          <div className="absolute -bottom-4 -right-4 w-12 h-4 bg-pink-400/50 rotate-[-45deg]" />

          <motion.h1 
            className="font-caveat text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-400 to-purple-500 drop-shadow-sm leading-tight"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Chatpati Baddie turns 21 Today! ✨
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 font-quicksand text-xl md:text-2xl text-gray-600 font-semibold"
          >
            A whole era of gorgeousness begins now. 💖
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="mt-10"
          >
            <button 
              onClick={onNext}
              className="cute-btn flex items-center gap-2 mx-auto text-xl shadow-[0_0_20px_rgba(255,30,86,0.5)] hover:shadow-[0_0_30px_rgba(255,30,86,0.7)]"
            >
              Start the Surprises! <span className="animate-bounce inline-block">🦆</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default ScrapbookIntroScreen;
