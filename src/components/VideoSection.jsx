import React from 'react';

const VideoSection = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl border-4 border-[var(--color-accent-red)] flex items-center justify-center relative mb-6">
        <video 
          src="/video/herreel.MOV" 
          className="w-full h-full object-cover" 
          controls 
          playsInline
        />
      </div>

      {/* Cute instructions */}
      <div className="bg-pink-100 text-pink-600 px-6 py-3 rounded-full mb-6 shadow-sm border border-pink-200 text-center animate-pulse">
        <p className="font-bold text-sm md:text-base">
          🎧 Oyyyy... Turn up the volume and watch in full screen! 🍿✨
        </p>
      </div>
      
      <p className="text-xl font-bold text-[var(--color-accent-red)]">Made with ❤️</p>
      <p className="text-gray-500 text-sm mt-1">Hope you have the best day ever!</p>
    </div>
  );
};

export default VideoSection;
