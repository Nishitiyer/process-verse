import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  RotateCcw, 
  Play, 
  Pause, 
  User, 
  Lock, 
  Unlock, 
  Coffee, 
  ShieldCheck,
  Zap,
  RefreshCcw, 
  Activity,
  Layers
} from 'lucide-react'

type PhilosopherStatus = 'thinking' | 'hungry' | 'eating'

interface Philosopher {
  id: number
  status: PhilosopherStatus
  leftFork: number
  rightFork: number
}

export const SynchronizationLab = () => {
  const [activeLab, setActiveLab] = useState<'philosophers' | 'producer-consumer'>('philosophers')
  
  // Dining Philosophers State
  const [philosophers, setPhilosophers] = useState<Philosopher[]>([
    { id: 0, status: 'thinking', leftFork: 0, rightFork: 1 },
    { id: 1, status: 'thinking', leftFork: 1, rightFork: 2 },
    { id: 2, status: 'thinking', leftFork: 2, rightFork: 3 },
    { id: 3, status: 'thinking', leftFork: 3, rightFork: 4 },
    { id: 4, status: 'thinking', leftFork: 4, rightFork: 0 },
  ])
  const [forks, setForks] = useState<boolean[]>([true, true, true, true, true]) // true = available
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<any>(null)

  useEffect(() => {
    const handlePlay = () => setIsRunning(r => !r)
    const handleReset = () => resetSync()
    window.addEventListener('GLOBAL_PLAY_TOGGLE', handlePlay)
    window.addEventListener('GLOBAL_RESET', handleReset)
    return () => {
      window.removeEventListener('GLOBAL_PLAY_TOGGLE', handlePlay)
      window.removeEventListener('GLOBAL_RESET', handleReset)
    }
  }, [])

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        simulateStep()
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning, philosophers, forks])

  const simulateStep = () => {
    const nextPhils = [...philosophers]
    const nextForks = [...forks]
    const randomIdx = Math.floor(Math.random() * 5)
    const p = nextPhils[randomIdx]

    if (p.status === 'thinking') {
      p.status = 'hungry'
    } else if (p.status === 'hungry') {
      if (nextForks[p.leftFork] && nextForks[p.rightFork]) {
        nextForks[p.leftFork] = false
        nextForks[p.rightFork] = false
        p.status = 'eating'
      }
    } else if (p.status === 'eating') {
      nextForks[p.leftFork] = true
      nextForks[p.rightFork] = true
      p.status = 'thinking'
    }

    setPhilosophers(nextPhils)
    setForks(nextForks)
  }

  const resetSync = () => {
    setIsRunning(false)
    setPhilosophers(philosophers.map(p => ({ ...p, status: 'thinking' })))
    setForks([true, true, true, true, true])
  }

  return (
    <div className="p-12 space-y-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between glass p-10 rounded-[3rem] border-white/[0.05]">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(0,243,255,0.15)] outline outline-1 outline-primary/30">
            <RefreshCcw size={40} className={isRunning ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} />
          </div>
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Sync Protocol</h1>
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                 <Lock size={12} className="text-primary" /> 
                 Mutex Locks: Engaged
               </span>
               <div className="h-1 w-1 rounded-full bg-slate-700" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                 <ShieldCheck size={12} className="text-green-500" /> 
                 Atomic State: Verified
               </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-[2rem] border border-white/[0.05]">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-4 rounded-2xl transition-all font-black text-sm flex items-center gap-3 ${isRunning ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'btn-primary'}`}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
            {isRunning ? 'FREEZE' : 'AUTORUN'}
          </button>
          <button onClick={resetSync} className="p-4 rounded-2xl glass hover:bg-white/10 text-slate-400 border-white/10">
            <RotateCcw size={22} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Lab Selector */}
         <div className="lg:col-span-3 space-y-6">
            <div className="glass-card flex flex-col gap-6 !p-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-2">Problem Sets</h3>
               <div className="space-y-2">
                  {[
                    { id: 'philosophers', label: 'Dining Philosophers', icon: Coffee },
                    { id: 'producer-consumer', label: 'Bounded Buffer', icon: Layers },
                    { id: 'readers-writers', label: 'Readers-Writers', icon: Activity },
                  ].map(lab => (
                    <button 
                      key={lab.id}
                      onClick={() => setActiveLab(lab.id as any)}
                      className={`w-full sidebar-item !rounded-2xl ${activeLab === lab.id ? 'sidebar-item-active' : 'text-slate-500 hover:text-slate-200'}`}
                    >
                       <lab.icon size={18} />
                       <span className="text-xs font-bold uppercase tracking-wider">{lab.label}</span>
                    </button>
                  ))}
               </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 space-y-6">
                <div className="flex items-center gap-3 text-primary">
                   <Zap size={20} className="drop-shadow-[0_0_8px_rgba(0,243,255,0.4)]" />
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Sync Insights</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Synchronization prevents data inconsistency by ensuring only one process accesses the critical section at a time.
                </p>
                <div className="pt-4 border-t border-white/5 space-y-3">
                   <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span>Locks Active</span>
                      <span className="text-primary mono">{forks.filter(f => !f).length} units</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span>Wait Queue</span>
                      <span className="text-secondary mono">Empty</span>
                   </div>
                </div>
            </div>
         </div>

         {/* Visualizer Area */}
         <div className="lg:col-span-9">
            <div className="glass-card min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute top-0 left-0 p-10">
                  <h3 className="text-lg font-black uppercase italic tracking-tighter text-slate-600 mb-1">Sector_Sync_Table</h3>
                  <div className="flex gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  </div>
               </div>

               {/* Philosophers Circle */}
               <div className="relative w-[450px] h-[450px] border border-white/[0.03] rounded-full flex items-center justify-center">
                  <div className="absolute inset-20 border border-dashed border-white/[0.05] rounded-full animate-spin-slow opacity-20" />
                  
                  {/* Forks */}
                  {forks.map((isAvailable, i) => {
                    const angle = (i * 72 + 36) * (Math.PI / 180)
                    const radius = 140
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius
                    return (
                      <motion.div
                        key={`fork-${i}`}
                        className={`absolute w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${isAvailable ? 'bg-white/5 border-white/10 text-slate-500' : 'bg-primary/20 border-primary/40 text-primary shadow-[0_0_20px_rgba(0,243,255,0.15)] scale-110'}`}
                        style={{ left: `calc(50% + ${x}px - 24px)`, top: `calc(50% + ${y}px - 24px)`, rotate: `${i * 72 + 36}deg` }}
                      >
                         <Unlock size={20} className={isAvailable ? '' : 'hidden'} />
                         <Lock size={20} className={isAvailable ? 'hidden' : ''} />
                      </motion.div>
                    )
                  })}

                  {/* Philosophers */}
                  {philosophers.map((p, i) => {
                    const angle = (i * 72) * (Math.PI / 180)
                    const radius = 220
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius
                    return (
                      <motion.div
                        key={`phil-${p.id}`}
                        className={`absolute w-32 h-32 rounded-[2rem] flex flex-col items-center justify-center gap-3 border-2 transition-all duration-700 shadow-2xl ${
                          p.status === 'eating' ? 'bg-secondary/10 border-secondary/40 shadow-secondary/10' : 
                          p.status === 'hungry' ? 'bg-accent/10 border-accent/40 shadow-accent/10' : 
                          'bg-white/5 border-white/10'
                        }`}
                        style={{ left: `calc(50% + ${x}px - 64px)`, top: `calc(50% + ${y}px - 64px)` }}
                        animate={p.status === 'eating' ? { scale: 1.15 } : { scale: 1 }}
                      >
                        <div className={`p-4 rounded-2xl bg-black/40 ${p.status === 'eating' ? 'text-secondary' : p.status === 'hungry' ? 'text-accent' : 'text-slate-500'}`}>
                           <User size={28} />
                        </div>
                        <div className="flex flex-col items-center">
                           <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Node {p.id}</span>
                           <span className={`text-[10px] font-black uppercase tracking-[0.2em] p-1 rounded-lg ${
                             p.status === 'eating' ? 'bg-secondary/20 text-secondary' : 
                             p.status === 'hungry' ? 'bg-accent/20 text-accent' : 
                             'text-slate-600'
                           }`}>
                             {p.status}
                           </span>
                        </div>
                      </motion.div>
                    )
                  })}
               </div>

               {/* Background Decorators */}
               <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 243, 255, 0.05) 0%, transparent 70%)' }} />
            </div>
         </div>
      </div>
    </div>
  )
}
