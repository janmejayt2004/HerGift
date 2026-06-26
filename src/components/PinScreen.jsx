import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PinScreen = ({ onUnlock, correctPin = "7777" }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);

  const handleInput = (index, value) => {
    // Only allow numbers
    if (value && !/^[0-9]*$/.test(value)) return;
    
    // Take the last character if they pasted or typed quickly
    const char = value.slice(-1);

    const newPin = [...pin];
    newPin[index] = char;
    setPin(newPin);
    setError(false);

    // Auto-focus next input
    if (char !== '' && index < 3) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Check if complete
    if (newPin.every(digit => digit !== '')) {
      const enteredPin = newPin.join('');
      if (enteredPin === correctPin) {
        // Success!
        setTimeout(() => onUnlock(), 300); // slight delay for visual feedback
      } else {
        // Fail
        setError(true);
        setTimeout(() => {
          setPin(['', '', '', '']);
          setError(false);
          const firstInput = document.getElementById(`pin-input-0`);
          if (firstInput) firstInput.focus();
        }, 600);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (pin[index] === '' && index > 0) {
        // Go back to previous input if empty
        const prevInput = document.getElementById(`pin-input-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
          const newPin = [...pin];
          newPin[index - 1] = '';
          setPin(newPin);
        }
      } else {
        // Clear current
        const newPin = [...pin];
        newPin[index] = '';
        setPin(newPin);
      }
    }
  };

  // Auto focus first input on mount
  useEffect(() => {
    const firstInput = document.getElementById(`pin-input-0`);
    if (firstInput) firstInput.focus();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-cream)] px-4"
    >
      <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-[var(--color-accent)]/20 text-center max-w-sm w-full relative overflow-hidden">
        
        {/* Decorative corner circles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-2xl"></div>

        <h2 className="text-3xl font-serif text-[var(--color-dark)] mb-3 relative z-10">Private Gift 🎁</h2>
        <p className="text-[var(--color-dark)]/70 mb-8 relative z-10 text-sm md:text-base">
          This surprise is locked. Please enter your 4-digit PIN to continue.
        </p>
        
        <motion.div 
          className="flex justify-center gap-3 md:gap-4 mb-4 relative z-10"
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {pin.map((digit, i) => (
            <input
              key={i}
              id={`pin-input-${i}`}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={digit}
              onChange={(e) => handleInput(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-12 h-14 md:w-14 md:h-16 text-center text-2xl md:text-3xl font-bold rounded-xl border-2 outline-none transition-all ${
                error 
                  ? 'border-red-400 bg-red-50 text-red-600' 
                  : digit !== '' 
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-dark)]'
                    : 'border-[var(--color-accent)]/30 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 bg-white/50'
              }`}
            />
          ))}
        </motion.div>
        
        <div className="h-6 relative z-10">
          {error && (
            <motion.span 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm font-medium"
            >
              Incorrect PIN, try again!
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PinScreen;
