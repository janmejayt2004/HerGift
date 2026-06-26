import { motion } from 'framer-motion'

export default function ZoomedPoem({ layoutId }) {
  return (
    <div className="w-full h-full bg-lav-50 flex flex-col relative overflow-hidden">
      
      {/* Diary Header Area */}
      <div className="bg-lav-100 px-8 py-6 border-b border-lav-200 flex justify-between items-center shrink-0">
        <motion.h2 
          layoutId={layoutId}
          className="font-caveat text-4xl text-lav-500 font-bold"
        >
          A little poem 🌸
        </motion.h2>
        <div className="w-12 h-12" /> {/* Spacer for close button */}
      </div>

      {/* Diary Pages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar flex justify-center bg-lav-50">
        
        <div className="w-full max-w-2xl bg-white rounded-r-2xl shadow-xl min-h-full border-l-[12px] border-lav-300 relative py-12 px-8 sm:px-16"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
            backgroundPosition: '0 12px'
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-4 right-8 text-3xl opacity-30">✨</div>
          <div className="absolute bottom-12 left-12 text-3xl opacity-30">🌸</div>

          <motion.h3 
            className="font-caveat text-3xl md:text-4xl text-text-dark text-center font-bold mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            "Tere Bare Mein"
          </motion.h3>

          <div className="space-y-8 font-caveat text-2xl md:text-3xl text-text-dark leading-relaxed text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Tere bare mein likhna kuch yun chahun,<br/>
              Teri shardiyo mein dhoop aur muskilo mein shukoon chahun,<br/>
              Tere raasto mein aai kaanto ko mein chumbh javun,<br/>
              Teri saari khwahish puri karneka junoon chahun.
            </motion.p>

            <motion.div 
              className="text-lav-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              ~ 🌸 ~
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Lekin tu khud hie itni kabil hai,<br/>
              Teri hasrate puri karneki tujhie mein gunjaish hai,<br/>
              Haan yeh sirf teri tareef hai,<br/>
              Teri kamiyabi ke sapne sakar ho uski numaish hai.
            </motion.p>

            <motion.div 
              className="text-lav-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              ~ 🌸 ~
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              Par tu Kitni pyaari hai, jese koi apsara swarg se aai hai,<br/>
              Jheel sie Ankhe, phool se hooth,<br/>
              Noor bhara chehra, Uda de kisike Hosh,<br/>
              Gulaab sie laali tu bin taiyar hui aai, Narm sie bolie teri sabko bhhai.
            </motion.p>

            <motion.div 
              className="text-lav-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1 }}
            >
              ~ 🌸 ~
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
            >
              Mere pass lafz kam aur khat hai adhura,<br/>
              Teri khoobshurati ka bayan na kar pau pura,<br/>
              Par jo bhi likhu, likhu sachai se,<br/>
              Aur haan yeh sach hai ki tujhe mein bhot achhai hai.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}
