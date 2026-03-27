import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Cpu, 
  GitBranch, 
  Lock, 
  RefreshCcw, 
  BarChart3, 
  BookOpen,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

import { Dashboard } from './sections/Dashboard'
import { ProcessManagement } from './sections/ProcessManagement'
import { ThreadManagement } from './sections/ThreadManagement'
import { DeadlockSimulator } from './sections/DeadlockSimulator'
import { SynchronizationLab } from './sections/SynchronizationLab'
import { PerformanceGraphs } from './sections/PerformanceGraphs'
import { LearnPanel } from './sections/LearnPanel'

function App() {
  const [activeSection, setActiveSection] = useState('processes')
  const [isGlobalPlaying, setIsGlobalPlaying] = useState(false)

  useEffect(() => {
    const handleToggle = () => setIsGlobalPlaying(p => !p)
    const handleReset = () => setIsGlobalPlaying(false)
    window.addEventListener('GLOBAL_PLAY_TOGGLE', handleToggle)
    window.addEventListener('GLOBAL_RESET', handleReset)
    return () => {
      window.removeEventListener('GLOBAL_PLAY_TOGGLE', handleToggle)
      window.removeEventListener('GLOBAL_RESET', handleReset)
    }
  }, [])

  const navItems = [
    { id: 'dashboard', label: 'Monitor', icon: LayoutDashboard },
    { id: 'processes', label: 'Processes', icon: Cpu },
    { id: 'threads', label: 'Threads', icon: GitBranch },
    { id: 'deadlocks', label: 'Deadlocks', icon: Lock },
    { id: 'sync', label: 'Synchronization', icon: RefreshCcw },
    { id: 'performance', label: 'Analytics', icon: BarChart3 },
    { id: 'learn', label: 'Academy', icon: BookOpen },
  ]

  return (
    <div className="flex h-screen bg-[#0a0a12] text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0c0c1e]/50 border-r border-white/[0.05] flex flex-col glass z-20">
        <div className="p-8 mb-4">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.3)] group-hover:rotate-12 transition-transform duration-500">
              <Cpu size={24} className="text-black" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight neon-text-cyan leading-none">PROCESS</h1>
              <span className="text-[10px] font-bold tracking-[0.3em] text-secondary">VERSE OS v1.0</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          <div className="px-4 mb-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Core Systems</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`sidebar-item group ${
                activeSection === item.id 
                ? 'sidebar-item-active' 
                : 'text-slate-500 hover:text-slate-100 hover:bg-white/[0.03]'
              }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${activeSection === item.id ? 'bg-primary/20 text-primary' : 'bg-slate-900/50 group-hover:bg-slate-800'}`}>
                <item.icon size={18} />
              </div>
              <span className="font-semibold text-sm tracking-wide">{item.label}</span>
              {activeSection === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute right-0 w-1 h-8 bg-primary rounded-l-full shadow-[0_0_15px_rgba(0,243,255,1)]"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <div className="glass-card p-4 rounded-3xl bg-primary/5 border-primary/10">
             <div className="flex items-center gap-3 mb-3">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,243,255,1)]" />
               <span className="text-[10px] font-bold text-primary uppercase tracking-widest">System Stable</span>
             </div>
             <p className="text-[10px] text-slate-400 font-medium">Kernel: 5.15.0-generic</p>
             <p className="text-[10px] text-slate-400 font-medium">Uptime: 14h 22m</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Background Decorators */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-[-10%] left-[10%] w-[30%] h-[30%] bg-secondary/5 blur-[120px] rounded-full -z-10" />

        {/* Header */}
        <header className="h-20 border-b border-white/[0.05] flex items-center justify-between px-10 bg-[#0a0a12]/40 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">
              {navItems.find(n => n.id === activeSection)?.label}
            </h2>
            <div className="h-4 w-px bg-slate-800 hidden md:block" />
            <span className="text-xs font-mono text-slate-500 hidden md:block uppercase tracking-widest">Environment / Lab_Sector_01</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 px-6 py-2 rounded-full bg-slate-900/50 border border-slate-800 font-mono text-[10px]">
              <div className="flex flex-col items-center">
                <span className="text-slate-500 uppercase tracking-tighter">CPU Load</span>
                <span className="text-primary font-bold">12.4%</span>
              </div>
              <div className="w-px h-6 bg-slate-800" />
              <div className="flex flex-col items-center">
                <span className="text-slate-500 uppercase tracking-tighter">Memory</span>
                <span className="text-secondary font-bold">4.2 GB</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('GLOBAL_RESET'))}
                className="w-10 h-10 rounded-2xl glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border-slate-800"
              >
                <RotateCcw size={18} />
              </button>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('GLOBAL_PLAY_TOGGLE'))}
                className={`px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all flex items-center gap-2 active:scale-95 ${isGlobalPlaying ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'bg-primary text-black'}`}
              >
                {isGlobalPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                {isGlobalPlaying ? 'PAUSE SYSTEM' : 'LIVE RUN TOGGLE'}
              </button>
            </div>
          </div>
        </header>

        {/* Section Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative p-0 m-0">
          {activeSection === 'dashboard' && <Dashboard onStart={() => setActiveSection('processes')} />}
          {activeSection === 'processes' && <ProcessManagement />}
          {activeSection === 'threads' && <ThreadManagement />}
          {activeSection === 'deadlocks' && <DeadlockSimulator />}
          {activeSection === 'sync' && <SynchronizationLab />}
          {activeSection === 'performance' && <PerformanceGraphs />}
          {activeSection === 'learn' && <LearnPanel onNavigate={setActiveSection} />}
          {!navItems.find(n => n.id === activeSection) && <Dashboard onStart={() => setActiveSection('processes')} />}
        </div>
      </main>
    </div>
  )
}

export default App
