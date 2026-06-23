import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StorybookModal = ({ isOpen, onClose, children, title }) => {
  // Prevent clicks inside the modal from bubbling up and moving the duck or closing the modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content relative w-full max-w-4xl h-full max-h-[90vh] rounded-3xl shadow-[0_20px_50px_-10px_rgba(255,30,86,0.2)] border-8 border-white/90 overflow-y-auto transform-gpu"
            style={{ 
              backgroundColor: '#fffafb',
              backgroundImage: 'radial-gradient(#ffd0d6 2px, transparent 2px)',
              backgroundSize: '30px 30px'
            }}
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.8 }}
            onClick={handleContentClick}
          >
            {/* Header / Close Button */}
            <div className="sticky top-0 z-10 flex justify-between items-center p-4 md:p-6 bg-[#fffafb]/80 backdrop-blur-md border-b-2 border-pink-100/50 rounded-t-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-[var(--color-accent-red)] font-nunito flex items-center gap-2">
                {title}
              </h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white text-[var(--color-accent-red)] flex items-center justify-center font-bold hover:bg-[var(--color-accent-red)] hover:text-white hover:scale-110 transition-all shadow-sm border border-pink-100"
              >
                ✕
              </button>
            </div>
            
            {/* Content Body */}
            <div className="p-6 md:p-10 relative z-0">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StorybookModal;
