import React from 'react';
import { motion } from 'framer-motion';

const FoodItem = ({ id, type, emoji, imageSrc, onClick, isEating, isEaten, isLocked }) => {
  // Generate a consistent random rotation for this item based on its id/name length
  const randomRotation = ((type.length * 7) % 30) - 15; // Random between -15 and +15 degrees
  
  return (
    <motion.div
      id={id}
      className="relative z-40"
      style={{ transform: `rotate(${randomRotation}deg)` }}
    >
      <motion.div
        className="cursor-pointer flex flex-col items-center justify-center group transform-gpu"
        style={{ transform: 'translate(-50%, -50%)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isEating ? 0 : 1, 
          opacity: isEating ? 0 : 1,
          y: isEating || isEaten ? 0 : [0, -10, 0] 
        }}
        transition={{ 
          y: { repeat: isEaten ? 0 : Infinity, duration: 1.5, ease: "easeInOut" },
          scale: { type: 'spring', stiffness: 350, damping: 25 },
          opacity: { duration: 0.2 }
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!isEating) onClick(e);
        }}
        whileHover={!isLocked && !isEaten ? { scale: 1.08, y: -5 } : {}}
        whileTap={!isLocked && !isEaten ? { scale: 0.92 } : {}}
      >
        <div className={`w-36 h-36 md:w-44 md:h-44 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center text-8xl md:text-9xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] border-2 border-white/80 transition-colors relative transform-gpu ${isLocked ? 'border-gray-300' : 'group-hover:border-[#FF1E56]'}`}>
        
        {/* Heart Border Highlight for Eaten Items */}
        {isEaten && (
          <motion.div 
            className="absolute -inset-4 md:-inset-6 pointer-events-none rounded-full z-50 transform-gpu"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <div 
                key={angle} 
                className="absolute inset-0 flex justify-center items-start transform-gpu"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <motion.span 
                  className="text-2xl md:text-3xl drop-shadow-sm transform-gpu"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.2, ease: "easeInOut" }}
                  style={{ display: 'inline-block' }}
                >
                  💖
                </motion.span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Glow effect for active item only */}
        {!isEaten && !isLocked && type !== "Decoy" && <div className="absolute inset-0 bg-yellow-200 rounded-full opacity-30 blur-md animate-pulse z-0"></div>}
        {imageSrc ? (
          <img src={imageSrc} alt={type} className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-md pointer-events-none" />
        ) : (
          emoji
        )}
      </div>
      </motion.div>
    </motion.div>
  );
};

export default FoodItem;
