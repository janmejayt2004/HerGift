import { motion } from 'framer-motion'

export default function Step1_Accept({ onYes, onNo }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center vignette-bg">
      <motion.h1 
        className="font-sniglet text-4xl sm:text-5xl md:text-6xl text-text-dark tracking-wide mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        PLS ACCEPT THE GIFT
      </motion.h1>

      <motion.div 
        className="relative w-48 h-48 mb-16 flex items-center justify-center animate-float"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
      >
        {/* Floating background hearts */}
        <motion.div 
          className="absolute text-pastel-pink text-3xl -left-4 top-4"
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >🤍</motion.div>
        <motion.div 
          className="absolute text-pastel-pink text-2xl -left-8 top-16"
          animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >🤍</motion.div>

        {/* Cute Duck Character */}
        <span className="text-8xl md:text-9xl drop-shadow-xl z-10 select-none">
          🦆
        </span>
      </motion.div>

      <motion.div 
        className="flex gap-6 sm:gap-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button className="cute-btn" onClick={onYes}>
          YES
        </button>
        <button className="cute-btn" onClick={onNo}>
          NO
        </button>
      </motion.div>
    </div>
  )
}
