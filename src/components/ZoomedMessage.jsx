import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ZoomedMessage({ layoutId }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full h-full bg-blush-50 p-8 flex flex-col items-center justify-center relative">
      <motion.h2 
        layoutId={layoutId}
        className="absolute top-8 font-caveat text-4xl text-blush-500 font-bold"
      >
        Open me 💌
      </motion.h2>

      <div className="relative w-full max-w-md mt-16 h-[400px] flex justify-center items-end pb-8">
        {/* Envelope back */}
        <div className="absolute bottom-8 w-[90%] h-[200px] bg-blush-200 rounded-lg shadow-sm" />

        {/* Letter sliding up */}
        <motion.div 
          className="absolute w-[85%] bg-white rounded p-6 shadow-md border border-blush-100 flex flex-col"
          initial={{ bottom: 8, height: 180 }}
          animate={{ 
            bottom: isOpen ? 120 : 8,
            height: isOpen ? 350 : 180,
            zIndex: isOpen ? 30 : 10
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="font-outfit font-bold text-xl text-blush-500 mb-4">Dear [Name],</h3>
            <p className="font-quicksand text-text-dark leading-relaxed mb-4">
              HAPPY BIRTHDAY!! 🌸 I wanted to make something truly special for you, something that felt like a beautiful little world just for us.
            </p>
            <p className="font-quicksand text-text-dark leading-relaxed mb-4">
              [Replace this paragraph with your heartfelt message. Talk about a funny memory, an inside joke, or just how much you appreciate having them in your life. Be yourself — that's what makes it special.]
            </p>
            <p className="font-quicksand text-text-dark leading-relaxed mb-4">
              [Add another paragraph here with your birthday wishes. What do you hope for them? Drop in some inside jokes if you can. They deserve it.]
            </p>
            <p className="font-quicksand text-text-dark leading-relaxed">
              [Final paragraph: wrap it up with something warm. A "thank you for being you" moment.]
            </p>
            
            <div className="mt-8 pt-4 border-t border-blush-100">
              <p className="font-caveat text-2xl text-blush-400 font-bold">
                — With love, [Your Name]
              </p>
            </div>
          </div>
        </motion.div>

        {/* Envelope front flaps */}
        <div 
          className="absolute bottom-8 w-[90%] h-[200px] z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, var(--color-blush-100) 0%, var(--color-blush-50) 100%)',
            clipPath: 'polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
          }}
        />

        {/* Clickable wax seal / open button */}
        {!isOpen && (
          <motion.button
            className="absolute bottom-28 z-40 w-16 h-16 bg-cherry-400 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-cherry-500 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
          >
            <span className="text-2xl">🌸</span>
          </motion.button>
        )}
      </div>

      {!isOpen && (
        <p className="mt-8 font-quicksand text-text-light animate-pulse">Tap the seal to open</p>
      )}
    </div>
  )
}
