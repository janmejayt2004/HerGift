import { motion } from 'framer-motion'

export default function ZoomedVideo({ layoutId }) {
  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col relative overflow-hidden">
      
      {/* Header Area */}
      <div className="bg-[#222] px-8 py-6 flex justify-between items-center shrink-0 border-b border-[#333]">
        <motion.h2 
          layoutId={layoutId}
          className="font-caveat text-4xl text-blush-200 font-bold"
        >
          The Edit 🎬
        </motion.h2>
        <div className="w-12 h-12" /> {/* Spacer for close button */}
      </div>

      {/* Video Content */}
      <div className="flex-1 w-full h-full p-4 sm:p-12 flex flex-col items-center justify-center relative">
        
        <div className="w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl relative overflow-hidden border border-[#333] flex items-center justify-center group">
          
          {/* 
            VIDEO PLACEHOLDER
            Replace this entire inner div with your actual video or iframe
            e.g. <video src="your_video.mp4" controls className="w-full h-full object-cover" />
          */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#222] flex flex-col items-center justify-center">
            
            {/* Play Button */}
            <motion.button 
              className="w-20 h-20 bg-cherry-500 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>

            <p className="mt-6 font-quicksand text-gray-400">Your video edit goes here</p>
          </div>

        </div>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-caveat text-2xl text-blush-200 opacity-80">Grab some popcorn 🍿</p>
        </motion.div>

      </div>
      
    </div>
  )
}
