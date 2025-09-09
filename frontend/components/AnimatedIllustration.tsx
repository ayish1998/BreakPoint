"use client";
import { motion } from 'framer-motion';

export default function AnimatedIllustration() {
  return (
    <div className="relative">
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="grid grid-cols-2 gap-4">
          {['from-brand/20', 'from-emerald-400/20', 'from-orange-400/20', 'from-pink-400/20'].map((c, i) => (
            <motion.div
              key={i}
              className={`rounded-lg bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            >
              <div className="text-sm text-gray-500">{['Breathing','Mood','Journal','Pomodoro'][i]}</div>
              <motion.div
                className={`mt-2 h-24 rounded-lg bg-gradient-to-br ${c} to-transparent`}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

