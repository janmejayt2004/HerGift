import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

const photos = [
  { id: 1, caption: 'That one time... 😂' },
  { id: 2, caption: 'Core memory unlocked 🌸' },
  { id: 3, caption: 'Us being us ✨' },
  { id: 4, caption: 'Can\'t stop laughing 😭' },
  { id: 5, caption: 'Best day ever 🎉' },
]

export default function ZoomedGallery({ layoutId }) {
  const containerRef = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth)
    }
  }, [])

  return (
    <div className="w-full h-full bg-soft-gray p-8 flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-center mb-8 shrink-0">
        <motion.h2 
          layoutId={layoutId}
          className="font-caveat text-4xl text-text-dark font-bold ml-4"
        >
          Memories 📸
        </motion.h2>
        <div className="w-12 h-12" /> {/* Spacer for close button */}
      </div>

      <div className="flex-1 w-full overflow-hidden flex items-center" ref={containerRef}>
        <motion.div 
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-8 px-8 cursor-grab active:cursor-grabbing pb-8"
        >
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              className="shrink-0 w-[280px] sm:w-[320px] bg-white p-4 pb-16 rounded shadow-lg relative"
              initial={{ opacity: 0, y: 50, rotate: -5 + Math.random() * 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              {/* Photo Tape */}
              <div className="washi-tape washi-tape-lav w-20 h-5 -top-2 left-1/2 -translate-x-1/2 -rotate-2" />

              {/* Image Placeholder */}
              <div className="w-full aspect-[4/5] bg-lav-100 rounded-sm flex items-center justify-center border border-lav-200">
                <span className="text-5xl opacity-40">🖼️</span>
              </div>
              
              {/* Caption */}
              <p className="absolute bottom-5 left-0 w-full text-center font-caveat text-2xl text-text-dark font-bold px-4">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="shrink-0 text-center pb-2">
        <p className="font-quicksand text-text-light text-sm">Drag left and right to view</p>
      </div>
    </div>
  )
}
