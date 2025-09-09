"use client";
import BreathingExercise from '../../components/BreathingExercise';
import MoodCheck from '../../components/MoodCheck';
import StressJournal from '../../components/StressJournal';
import AIAssistant from '../../components/AIAssistant';
import PomodoroTimer from '../../components/PomodoroTimer';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardTopbar from '../../components/DashboardTopbar';
import { motion } from 'framer-motion';
import BottomNav from '../../components/BottomNav';

export default function DashboardPage() {
  return (
    <main className="min-h-screen pb-14 md:pb-0">
      <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr]">
        <DashboardSidebar />
        <div className="flex min-h-screen flex-col">
          <DashboardTopbar />
          <div className="px-6 py-6 space-y-6">
            <motion.section id="breathing" className="card p-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <BreathingExercise />
            </motion.section>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.section id="mood" className="card p-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}>
                <MoodCheck />
              </motion.section>
              <motion.section id="pomodoro" className="card p-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <PomodoroTimer />
              </motion.section>
            </div>
            <motion.section id="journal" className="card p-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
              <StressJournal />
            </motion.section>
            <motion.section id="ai" className="card p-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <AIAssistant />
            </motion.section>
          </div>
          <BottomNav />
        </div>
      </div>
    </main>
  );
}

