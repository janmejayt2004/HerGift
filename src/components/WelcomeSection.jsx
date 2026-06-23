import React from 'react';
import { motion } from 'framer-motion';

const WelcomeSection = ({ onNext }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center gradient-bg relative overflow-hidden">
      
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-10 left-10 w-20 h-20 bg-[var(--color-primary-blue)] rounded-full opacity-20 blur-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-32 h-32 bg-[var(--color-accent-red)] rounded-full opacity-10 blur-2xl"
        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
      >
        <img 
          src="/cute_duck.png" 
          alt="Cute Duck" 
          className="w-48 h-48 object-contain mb-6 animate-float drop-shadow-xl"
        />
      </motion.div>

      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-[var(--color-primary-blue)] mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Happy Birthday!
      </motion.h1>

      <motion.p 
        className="text-lg md:text-xl text-[var(--color-text-main)] mb-10 max-w-md font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        I made something special just for you. Are you ready to see it?
      </motion.p>

      <motion.button 
        className="cute-btn"
        onClick={onNext}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        Let's Go! 🦆
      </motion.button>
    </section>
  );
};

export default WelcomeSection;
