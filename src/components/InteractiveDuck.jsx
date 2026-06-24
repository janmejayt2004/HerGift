import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveDuck = ({ targetPosition, isEating, isIdle, isSad }) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 + 100 });
  const [isMoving, setIsMoving] = useState(false);
  const [isShy, setIsShy] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [facingRight, setFacingRight] = useState(true);

  const [randomGesture, setRandomGesture] = useState(null);

  // Initial centering, but lower down
  useEffect(() => {
    setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    
    const handleResize = () => {
      if (!targetPosition) {
        setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [targetPosition]);

  // Handle external target movements
  useEffect(() => {
    if (targetPosition) {
      const newX = targetPosition.x;
      if (newX > position.x) setFacingRight(true);
      else if (newX < position.x) setFacingRight(false);

      setPosition(targetPosition);
      setIsMoving(true);
      
      // Stop moving after reaching target
      const timeout = setTimeout(() => {
        setIsMoving(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [targetPosition]);

  // Random cute gestures when idle
  useEffect(() => {
    if (!isIdle || isMoving || isShy || isEating || isSad) return;

    const interval = setInterval(() => {
      // 40% chance to do a random gesture every 3.5 seconds
      if (Math.random() < 0.4) {
        const gestures = ['jump', 'flip', 'look'];
        const gesture = gestures[Math.floor(Math.random() * gestures.length)];
        setRandomGesture(gesture);
        
        setTimeout(() => {
          setRandomGesture(null);
        }, 1500); // Gestures last 1.5 seconds
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isIdle, isMoving, isShy, isEating, isSad]);

  const handleDuckClick = (e) => {
    e.stopPropagation(); 
    if (isEating || isMoving || isSad) return; // Don't interrupt eating, moving or sadness

    setIsShy(true);
    
    // Generate hearts
    for(let i=0; i<8; i++) {
      const newHeart = { 
        id: Date.now() + i, 
        x: position.x + (Math.random() * 100 - 50), 
        y: position.y - 100,
        delay: i * 0.1
      };
      setHearts(prev => [...prev, newHeart]);
    }

    setTimeout(() => {
      setIsShy(false);
    }, 2000);
    
    setTimeout(() => {
      setHearts(prev => prev.slice(8));
    }, 3500);
  };

  return (
    <>
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, y: heart.y, x: heart.x, scale: 0.5 }}
            animate={{ opacity: 0, y: heart.y - 250, x: heart.x + (Math.random() * 150 - 75), scale: 2.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: heart.delay }}
            className="fixed pointer-events-none z-[100] text-5xl"
            style={{ top: 0, left: 0 }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        className="fixed z-[60] cursor-pointer duck-container"
        style={{ top: 0, left: 0, originX: 0.5, originY: 0.5 }}
        animate={{
          x: position.x - 80, // Offset by half the width/height to center the duck on target
          y: position.y - 80,
          scaleX: facingRight ? 1 : -1
        }}
        transition={{
          x: { duration: 2, ease: [0.25, 1, 0.5, 1] },
          y: { duration: 2, ease: [0.25, 1, 0.5, 1] },
        }}
        onClick={handleDuckClick}
      >
        <motion.div
          animate={
            isEating ? { scale: [1, 1.1, 0.95, 1.05, 1], rotate: [-5, 5, -5, 5, 0] } :
            isSad ? { rotate: -10, y: 5 } :
            isShy ? { scale: [1, 0.98, 0.95, 0.98, 1], rotate: [0, -2, 2, -2, 0] } :
            isMoving ? { y: [0, -15, 0], rotate: [-3, 3, -3] } : 
            randomGesture === 'jump' ? { y: [0, -60, 0, -20, 0], scaleY: [1, 1.05, 0.95, 1, 1] } :
            randomGesture === 'flip' ? { rotate: [0, 360], scale: [1, 1.1, 1] } :
            randomGesture === 'look' ? { scaleX: [1, -1, -1, 1], rotate: [0, 3, -3, 0] } :
            { y: [0, -4, 0], rotate: [0, 1, -1, 1, 0] }
          }
          transition={{ 
            repeat: (isEating || isSad || isShy || randomGesture) ? 0 : Infinity, 
            duration: isEating ? 0.5 : isShy ? 0.5 : (isMoving ? 0.4 : (randomGesture ? 1.2 : 3)) 
          }}
          className="relative w-40 h-40 drop-shadow-2xl scale-[0.8] md:scale-100 transform-gpu"
        >
          {/* CSS DUCK */}
          {/* Head */}
          <div className="absolute top-4 left-12 w-20 h-20 bg-white rounded-full border-2 border-gray-100 shadow-sm z-10"></div>
          {/* Eye - closes when shy or eating or sad */}
          <div className="absolute top-8 left-24 w-4 h-4 bg-gray-800 rounded-full z-20 transition-all duration-300 flex items-center justify-center overflow-hidden">
             {(isShy || isEating || isSad || randomGesture === 'flip') && <div className="w-full h-full bg-white transform translate-y-1"></div>}
             {randomGesture === 'look' && <div className="absolute w-2 h-2 bg-white rounded-full top-0 left-0"></div>}
          </div>
          
          {/* Tears */}
          <AnimatePresence>
            {isSad && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: [0, 1, 0], y: [0, 15, 30] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute top-10 left-22 w-2 h-3 bg-blue-400 rounded-full z-30"
                />
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: [0, 1, 0], y: [0, 15, 30] }}
                  transition={{ duration: 0.8, delay: 0.4, repeat: Infinity }}
                  className="absolute top-11 left-26 w-2 h-3 bg-blue-400 rounded-full z-30"
                />
              </>
            )}
          </AnimatePresence>
          {/* Blush - darkens when shy */}
          <div className={`absolute top-12 left-20 w-6 h-4 rounded-full z-20 transition-colors duration-300 ${isShy ? 'bg-pink-400 opacity-90' : 'bg-pink-300 opacity-70'}`}></div>
          {/* Beak */}
          <motion.div 
            className="absolute top-10 left-28 w-12 h-8 bg-yellow-400 rounded-full z-10"
            animate={
              isEating ? { scaleY: [1, 1.8, 0.5, 1.8, 1], rotate: [-10, 20, -10, 20, 0] } : 
              (randomGesture === 'jump' || randomGesture === 'flip') ? { scaleY: [1, 2, 1] } :
              (isMoving ? { scaleY: [1, 1.5, 1] } : { scaleY: 1 })
            }
            transition={{ repeat: isEating ? 1 : Infinity, duration: isEating ? 0.5 : 0.2 }}
          ></motion.div>
          {/* Body */}
          <div className="absolute top-16 left-4 w-32 h-24 bg-white rounded-full border-2 border-gray-100 shadow-md z-0"></div>
          {/* Tail */}
          <div className="absolute top-12 left-2 w-12 h-12 bg-white rounded-t-full transform -rotate-45 z-0"></div>
          {/* Wing - pulls in when shy */}
          <motion.div 
            className="absolute top-20 left-12 w-16 h-10 bg-gray-100 rounded-full z-20 border-2 border-gray-200"
            style={{ transformOrigin: 'left center' }}
            animate={
              isShy ? { rotate: -15, scaleX: 0.9 } :
              (randomGesture === 'jump' || randomGesture === 'flip') ? { rotate: [-40, 20, -40, 20, -40] } :
              isMoving ? { rotate: [-20, 20, -20] } : 
              { rotate: 0 }
            }
            transition={{ repeat: (isMoving && !isShy) ? Infinity : 0, duration: randomGesture ? 0.3 : 0.2 }}
          ></motion.div>
          {/* Legs */}
          <motion.div 
            className="absolute top-36 left-12 w-4 h-8 bg-orange-400 z-0"
            animate={isMoving ? { rotate: [-20, 20, -20] } : { rotate: 0 }}
            style={{ transformOrigin: 'top center' }}
          ></motion.div>
          <motion.div 
            className="absolute top-36 left-20 w-4 h-8 bg-orange-400 z-0"
            animate={isMoving ? { rotate: [20, -20, 20] } : { rotate: 0 }}
            style={{ transformOrigin: 'top center' }}
          ></motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default InteractiveDuck;
