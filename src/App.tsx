import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Cpu, 
  GitBranch, 
  Lock, 
  RefreshCcw, 
  BarChart3, 
  BookOpen,
  Settings as SettingsIcon,
  Play,
  Pause,
  RotateCcw,
  SkipForward
} from 'lucide-react'

import { Dashboard } from './sections/Dashboard'
import { ProcessManagement } from './sections/ProcessManagement'
import { ThreadManagement } from './sections/ThreadManagement'
import { DeadlockSimulator } from './sections/DeadlockSimulator'
import { SynchronizationLab } from './sections/SynchronizationLab'
import { PerformanceGraphs } from './sections/PerformanceGraphs'
import { LearnPanel } from './sections/LearnPanel'

function App() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'processes', label: 'Processes', icon: Cpu },
    { id: 'threads', label: 'Threads', icon: GitBranch },
    { id: 'deadlocks', label: 'Deadlocks', icon: Lock },
    { id: 'sync', label: 'Synchronization', icon: RefreshCcw },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'learn', label: 'Learn', icon: BookOpen },
  ]

  return (
    <div className="flex h-screen bg-[#0a0a12] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-slate-800 flex flex-col glass">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Cpu size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-wider neon-text-cyan">ProcessVerse</h1>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                activeSection === item.id 
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,243,255,0.1)]' 
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
              }`}
            >
              <item.icon size={20} className={activeSection === item.id ? 'text-primary' : 'group-hover:text-slate-100'} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-colors">
            <SettingsIcon size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-sidebar/50 backdrop-blur-md z-10">
          <h2 className="text-lg font-semibold text-slate-300">
            {navItems.find(n => n.id === activeSection)?.label}
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-full px-4 py-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">System Online</span>
            </div>
            
            <div className="flex items-center gap-2 border-l border-slate-800 pl-4 ml-2">
              <button className="p-2 rounded-full hover:bg-white/5 text-slate-400 transition-colors" title="Reset Simulation">
                <RotateCcw size={18} />
              </button>
              <button className="p-2 rounded-full hover:bg-white/5 text-slate-400 transition-colors" title="Step Back">
                <RotateCcw size={18} className="transform scale-x-[-1]" />
              </button>
              <button className="w-10 h-10 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center hover:bg-primary/30 transition-all shadow-[0_0_20px_rgba(0,243,255,0.15)]">
                <Play size={20} fill="currentColor" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/5 text-slate-400 transition-colors" title="Step Forward">
                <SkipForward size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Section Content */}
        <div className="flex-1 overflow-y-auto bg-background custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeSection === 'dashboard' && <Dashboard onStart={() => setActiveSection('processes')} />}
              {activeSection === 'processes' && <ProcessManagement />}
              {activeSection === 'threads' && <ThreadManagement />}
              {activeSection === 'deadlocks' && <DeadlockSimulator />}
              {activeSection === 'sync' && <SynchronizationLab />}
              {activeSection === 'performance' && <PerformanceGraphs />}
              {activeSection === 'learn' && <LearnPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default App
