import { motion } from 'framer-motion'

export default function Step2_Reject({ onTryAgain }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center vignette-bg">
      <motion.h1 
        className="font-sniglet text-4xl sm:text-5xl md:text-6xl text-text-dark tracking-wide mb-12 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.6 }}
      >
        WHY DID YOU CLICK NO!
      </motion.h1>

      <motion.div 
        className="relative w-48 h-48 mb-16 flex items-center justify-center"
        initial={{ rotate: -90, y: -50, opacity: 0 }}
        animate={{ rotate: -90, y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.4 }}
      >
        {/* Sad flipped duck */}
        <span className="text-8xl md:text-9xl drop-shadow-xl select-none" style={{ filter: 'grayscale(30%)' }}>
          🦆
        </span>
        {/* Tear drops */}
        <motion.div 
          className="absolute text-blue-300 text-2xl -bottom-4 right-10"
          animate={{ y: [0, 20], opacity: [1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >💧</motion.div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button className="cute-btn" onClick={onTryAgain}>
          TRY AGAIN
        </button>
      </motion.div>
    </div>
  )
}
