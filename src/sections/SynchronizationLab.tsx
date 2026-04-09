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
import { AlgorithmDeepDive, OSAlgorithm } from '../components/AlgorithmDeepDive'
import { LiveCodeTracer, TraceLog } from '../components/LiveCodeTracer'

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
  const [logs, setLogs] = useState<TraceLog[]>([])
  
  // Producer-Consumer State
  const [buffer, setBuffer] = useState<number[]>([])
  const [mutex, setMutex] = useState(false)
  
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
  }, [isRunning, philosophers, forks, buffer])

  const simulateStep = () => {
    if (activeLab === 'philosophers') {
      const nextPhils = philosophers.map(p => ({ ...p }))
      const nextForks = [...forks]
      const randomIdx = Math.floor(Math.random() * 5)
      const p = nextPhils[randomIdx]
      let newLog: TraceLog | null = null

      if (p.status === 'thinking') {
        p.status = 'hungry'
        newLog = { id: Date.now().toString() + Math.random(), timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `wait(fork[${p.leftFork}]); wait(fork[${p.rightFork}]);`, explanation: `Philosopher ${p.id} became HUNGRY and is requesting Mutex locks.` }
      } else if (p.status === 'hungry') {
        if (nextForks[p.leftFork] && nextForks[p.rightFork]) {
          nextForks[p.leftFork] = false
          nextForks[p.rightFork] = false
          p.status = 'eating'
          newLog = { id: Date.now().toString() + Math.random(), timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `mutex_lock(fork[${p.leftFork}]); mutex_lock(fork[${p.rightFork}]); // CS_ENTER`, explanation: `Philosopher ${p.id} successfully acquired both Mutexes and entered the Critical Section.` }
        } else {
          newLog = { id: Date.now().toString() + Math.random(), timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `// Blocked: Mutexes currently unavailable`, explanation: `Philosopher ${p.id} is blocked waiting for surrounding nodes to release locks.` }
        }
      } else if (p.status === 'eating') {
        nextForks[p.leftFork] = true
        nextForks[p.rightFork] = true
        p.status = 'thinking'
        newLog = { id: Date.now().toString() + Math.random(), timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `signal(fork[${p.leftFork}]); signal(fork[${p.rightFork}]); // CS_EXIT`, explanation: `Philosopher ${p.id} completed execution and triggered signal() to release both Mutexes.` }
      }

      if (newLog) setLogs(prev => [...prev.slice(-20), newLog!])
      setPhilosophers(nextPhils)
      setForks(nextForks)
    } else if (activeLab === 'producer-consumer') {
      const isProducer = Math.random() > 0.5
      let newLog: TraceLog | null = null
      
      if (isProducer) {
        if (buffer.length < 8) {
          setBuffer(prev => [...prev, 1])
          newLog = { id: Date.now().toString(), timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `wait(empty); wait(mutex); append(); signal(mutex); signal(full);`, explanation: `Producer added an item to the buffer. Slots filled: ${buffer.length + 1}/8.` }
        } else {
          newLog = { id: Date.now().toString(), timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `// PRODUCER_SLEEP: Buffer Full`, explanation: `Buffer index at capacity. Producer is blocked until Consumer frees a slot.` }
        }
      } else {
        if (buffer.length > 0) {
          setBuffer(prev => prev.slice(0, -1))
          newLog = { id: Date.now().toString(), timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `wait(full); wait(mutex); take(); signal(mutex); signal(empty);`, explanation: `Consumer removed an item. Slots remaining: ${buffer.length - 1}/8.` }
        } else {
          newLog = { id: Date.now().toString(), timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `// CONSUMER_SLEEP: Buffer Empty`, explanation: `No data available. Consumer is idling until Producer generates output.` }
        }
      }
      
      if (newLog) setLogs(prev => [...prev.slice(-20), newLog!])
    }
  }

  const resetSync = () => {
    setIsRunning(false)
    setPhilosophers(philosophers.map(p => ({ ...p, status: 'thinking' })))
    setForks([true, true, true, true, true])
    setBuffer([])
  }

  return (
    <div className="p-4 md:p-12 space-y-8 md:space-y-12 max-w-7xl mx-auto custom-scrollbar">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between glass p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-white/[0.05] gap-6 md:gap-0">
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
                      <span className="text-primary mono">{activeLab === 'philosophers' ? forks.filter(f => !f).length : buffer.length} units</span>
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
            <div className="glass-card min-h-[400px] md:min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute top-0 left-0 p-6 md:p-10">
                  <h3 className="text-lg font-black uppercase italic tracking-tighter text-slate-600 mb-1">Sector_Sync_Table</h3>
                  <div className="flex gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  </div>
               </div>

               {/* Philosophers Circle */}
               {activeLab === 'philosophers' ? (
                 <div className="relative scale-[0.5] sm:scale-75 md:scale-90 lg:scale-100 w-[450px] h-[450px] border border-white/[0.03] rounded-full flex items-center justify-center">
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
               ) : (
                 <div className="flex flex-col items-center gap-12 w-full max-w-2xl px-4 md:px-10">
                    <div className="flex items-center gap-8 md:gap-20">
                       <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary animate-pulse">
                             <RotateCcw size={30} className="animate-spin" style={{ animationDuration: '3s' }} />
                          </div>
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Producer</span>
                       </div>
                       
                       <div className="flex-1 flex gap-1 md:gap-3 h-24 md:h-32 p-2 md:p-4 glass rounded-[2rem] items-end">
                          <AnimatePresence>
                             {buffer.map((_, i) => (
                               <motion.div 
                                 key={i}
                                 initial={{ y: -50, opacity: 0 }}
                                 animate={{ y: 0, opacity: 1 }}
                                 exit={{ y: 50, opacity: 0 }}
                                 className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-lg shadow-[0_0_15px_rgba(157,0,255,0.3)]"
                                 style={{ height: `${20 + (i * 10)}%` }}
                               />
                             ))}
                          </AnimatePresence>
                          {buffer.length === 0 && <div className="flex-1 flex items-center justify-center text-slate-700 italic text-[10px] mb-8">BUFFER_EMPTY</div>}
                       </div>

                       <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary">
                             <Zap size={30} className="animate-pulse" />
                          </div>
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Consumer</span>
                       </div>
                    </div>
                    
                    <div className="w-full flex justify-between items-center px-4 md:px-10">
                       <div className="flex flex-col items-center">
                          <span className="text-[10px] font-bold text-slate-600 uppercase mb-2">Semaphore: Empty</span>
                          <span className="text-xl md:text-2xl font-black text-primary">{8 - buffer.length}</span>
                       </div>
                       <div className="flex flex-col items-center">
                          <span className="text-[10px] font-bold text-slate-600 uppercase mb-2">Semaphore: Full</span>
                          <span className="text-xl md:text-2xl font-black text-secondary">{buffer.length}</span>
                       </div>
                    </div>
                 </div>
               )}

               {/* Background Decorators */}
               <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 243, 255, 0.05) 0%, transparent 70%)' }} />
            </div>
            
            {/* Live Tracer Component */}
            <LiveCodeTracer logs={logs} />
         </div>
      </div>
      
      <AlgorithmDeepDive algorithm={activeLab as OSAlgorithm} />
    </div>
  )
}
