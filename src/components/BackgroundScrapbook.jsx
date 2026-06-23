import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CUTOUTS = [
  '/cutouts/image-Photoroom (1).png',
  '/cutouts/lipstick.png',
  '/cutouts/happy.png',
  '/cutouts/image-Photoroom.png',
  '/cutouts/image-Photoroom (10).png',
  '/cutouts/image-Photoroom (11).png',
  '/cutouts/image-Photoroom (2).png',
  '/cutouts/image-Photoroom (3).png',
  '/cutouts/image-Photoroom (4).png',
  '/cutouts/image-Photoroom (5).png',
  '/cutouts/image-Photoroom (6).png',
  '/cutouts/image-Photoroom (8).png',
  '/cutouts/image-Photoroom(9).png',
  '/cutouts/bow-tie.png',
  '/cutouts/flowers.png',
  '/cutouts/rose.png'
];

const ScrapbookItem = ({ id, src, rotate, scale, depth, mouseX, mouseY, delay, cellOffsetX, cellOffsetY }) => {
  const [clicked, setClicked] = useState(false);
  const [hearts, setHearts] = useState([]);

  // Very subtle parallax — small enough to never push items off-screen
  const parallaxFactor = depth * 0.08;
  const offsetX = useTransform(mouseX, v => v * parallaxFactor * -1);
  const offsetY = useTransform(mouseY, v => v * parallaxFactor * -1);

  const smoothX = useSpring(offsetX, { damping: 30, stiffness: 80 });
  const smoothY = useSpring(offsetY, { damping: 30, stiffness: 80 });

  const handleClick = (e) => {
    e.stopPropagation();
    setClicked(true);

    for (let i = 0; i < 3; i++) {
      setHearts(prev => [...prev, { id: Date.now() + i, rx: (Math.random() - 0.5) * 80, ry: Math.random() * -80 - 40 }]);
    }

    setTimeout(() => setClicked(false), 600);
    setTimeout(() => setHearts(prev => prev.slice(3)), 2000);
  };

  return (
    <div className="z-10 pointer-events-none flex items-center justify-center w-full h-full" style={{ transform: `translate(${cellOffsetX}px, ${cellOffsetY}px)` }}>
      <motion.div
        className="pointer-events-auto cursor-pointer"
        style={{ x: smoothX, y: smoothY }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: clicked ? scale * 0.8 : scale }}
        transition={{
          opacity: { duration: 1, delay },
          scale: { type: "spring", stiffness: 200, damping: 10 }
        }}
        onClick={handleClick}
        whileHover={{ scale: scale * 1.15, rotate: 0, zIndex: 20 }}
      >
        <AnimatePresence>
          {hearts.map(h => (
            <motion.div
              key={h.id}
              initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: h.ry, x: h.rx, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute pointer-events-none text-2xl z-30"
              style={{ top: '0%', left: '50%' }}
            >
              💖
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.img
          src={src}
          alt="scrapbook-cutout"
          draggable={false}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          style={{
            filter: 'url(#solid-white-border) drop-shadow(0 8px 10px rgba(0,0,0,0.15))',
            rotate: rotate
          }}
          className="w-[100px] h-[100px] md:w-[180px] md:h-[180px] object-contain pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

const DoodlesOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
    {/* Animated Sparkles */}
    <motion.svg className="absolute top-[12%] left-[18%] w-8 h-8 text-[#FFB6C1]" 
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
    </motion.svg>
    <motion.svg className="absolute top-[60%] right-[15%] w-10 h-10 text-[#FFD700]" 
      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4], rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
    </motion.svg>
    <motion.svg className="absolute bottom-[10%] left-[45%] w-6 h-6 text-[#CBAACB]" 
      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3], rotate: [0, -10, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
    </motion.svg>
    
    {/* Sketchy Swirls */}
    <svg className="absolute top-[25%] right-[25%] w-24 h-24 text-[#CBAACB] opacity-50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M10 50 C 30 10, 60 90, 90 50" />
    </svg>
    <svg className="absolute bottom-[20%] left-[30%] w-32 h-24 text-[#FFB6C1] opacity-40 rotate-[-15deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M10 80 Q 25 20, 50 50 T 90 20" />
    </svg>
    <svg className="absolute top-[5%] left-[50%] w-20 h-20 text-[#FFB6C1] opacity-40 rotate-[10deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M10 50 Q 30 70, 50 50 T 90 50" />
    </svg>

    {/* Hand-drawn Hearts */}
    <motion.svg className="absolute top-[75%] left-[10%] w-12 h-12 text-[#FF1E56] opacity-30 rotate-[-20deg]"
      animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 85 C20 55 10 35 25 20 C35 10 50 25 50 25 C50 25 65 10 75 20 C90 35 80 55 50 85 Z" />
    </motion.svg>
    <motion.svg className="absolute top-[15%] right-[5%] w-8 h-8 text-[#FF1E56] opacity-20 rotate-[15deg]"
      animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 85 C20 55 10 35 25 20 C35 10 50 25 50 25 C50 25 65 10 75 20 C90 35 80 55 50 85 Z" />
    </motion.svg>
    
    {/* Kisses / Crosses */}
    <svg className="absolute top-[35%] left-[8%] w-6 h-6 text-[#FF1E56] opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M6 6l12 12m0-12L6 18" />
    </svg>
    <svg className="absolute bottom-[40%] right-[8%] w-8 h-8 text-[#CBAACB] opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M6 6l12 12m0-12L6 18" />
    </svg>
    <svg className="absolute top-[45%] right-[40%] w-5 h-5 text-[#FFB6C1] opacity-50 rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M6 6l12 12m0-12L6 18" />
    </svg>

    {/* Trios of Dots */}
    <svg className="absolute top-[10%] right-[40%] w-12 h-12 text-[#FFB6C1] opacity-60" viewBox="0 0 40 40" fill="currentColor">
      <circle cx="10" cy="10" r="3" />
      <circle cx="30" cy="10" r="3" />
      <circle cx="20" cy="25" r="3" />
    </svg>
    <svg className="absolute bottom-[15%] right-[45%] w-10 h-10 text-[#CBAACB] opacity-60 rotate-[120deg]" viewBox="0 0 40 40" fill="currentColor">
      <circle cx="10" cy="10" r="2.5" />
      <circle cx="30" cy="10" r="2.5" />
      <circle cx="20" cy="25" r="2.5" />
    </svg>
  </div>
);

const BackgroundScrapbook = ({ animateIn = false }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 100);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 100);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Compute layout directly so it updates instantly during development (no useMemo)
  const layout = CUTOUTS.map((src, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    // Push the 2nd column (col 1) left and 3rd column (col 2) right to make room for the cake
    const extraX = col === 1 ? -160 : (col === 2 ? 160 : 0);

    return {
      id: i,
      src: src,
      // Randomize position slightly within the grid cell, and apply the extra spacing
      cellOffsetX: ((Math.random() - 0.5) * 40) + extraX,
      cellOffsetY: (Math.random() - 0.5) * 40,
      // Random rotation to make it look scattered
      rotate: (Math.random() - 0.5) * 20,
      // Slightly varied scale
      scale: 0.95 + (Math.random() * 0.15),
      depth: 0.5 + Math.random() * 0.5,
      delay: i * 0.2,
      hide: (row === 0 && (col === 1 || col === 2)) || (row === 3 && col === 3)
    };
  });

  return (
    <motion.div
      initial={animateIn ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, ease: 'easeOut' }}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* SVG Filter for Solid White Sticker Border */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="solid-white-border">
            <feMorphology in="SourceAlpha" operator="dilate" radius="2.5" result="DILATED" />
            <feFlood floodColor="white" floodOpacity="1" result="WHITE" />
            <feComposite in="WHITE" in2="DILATED" operator="in" result="OUTLINE" />
            <feMerge>
              <feMergeNode in="OUTLINE" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <DoodlesOverlay />

      <div className="w-full h-full pointer-events-auto grid grid-cols-4 grid-rows-4 p-4 gap-2">
        {layout.map(item => (
          item.hide ? <div key={item.id} /> :
            <ScrapbookItem
              key={item.id}
              {...item}
              mouseX={mouseX}
              mouseY={mouseY}
            />
        ))}
      </div>
    </motion.div>
  );
};

export default BackgroundScrapbook;
