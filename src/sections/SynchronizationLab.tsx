import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Layers,
  BookOpen
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
  const [activeLab, setActiveLab] = useState<'philosophers' | 'producer-consumer' | 'readers-writers'>('philosophers')
  
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
  const [pcIndices, setPcIndices] = useState({ in: 0, out: 0 })
  
  // Readers-Writers State
  const [rwState, setRwState] = useState({
    readers: 0,
    isWriting: false,
    waitingReaders: 0,
    waitingWriters: 0,
    database: 42
  })
  
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
      const action = Math.random() > 0.5 ? 'produce' : 'consume'
      let newLog: TraceLog | null = null
      
      if (action === 'produce') {
        if (buffer.length < 8) {
          const newItem = Math.floor(Math.random() * 100)
          setBuffer(prev => [...prev, newItem])
          setPcIndices(prev => ({ ...prev, in: (prev.in + 1) % 8 }))
          newLog = { 
            id: Date.now().toString(), 
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11), 
            code: `wait(empty); wait(mutex); buffer[in] = item; in = (in+1)%8; signal(mutex); signal(full);`, 
            explanation: `PRODUCER: Secured Mutex and Empty-Semaphore. Appended value ${newItem} at index ${pcIndices.in}.` 
          }
        } else {
          newLog = { 
            id: Date.now().toString(), 
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11), 
            code: `// BLOCKED: wait(empty);`, 
            explanation: `PRODUCER BLOCKED: All 8 slots are occupied. Producer is yielding CPU until Consumer clears space.` 
          }
        }
      } else {
        if (buffer.length > 0) {
          setBuffer(prev => prev.slice(1))
          setPcIndices(prev => ({ ...prev, out: (prev.out + 1) % 8 }))
          newLog = { 
            id: Date.now().toString(), 
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11), 
            code: `wait(full); wait(mutex); item = buffer[out]; out = (out+1)%8; signal(mutex); signal(empty);`, 
            explanation: `CONSUMER: Secured Mutex and Full-Semaphore. Removed item from index ${pcIndices.out}.` 
          }
        } else {
          newLog = { 
            id: Date.now().toString(), 
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11), 
            code: `// BLOCKED: wait(full);`, 
            explanation: `CONSUMER BLOCKED: Buffer underflow detected. Consumer is yielding until Producer generates data.` 
          }
        }
      }
      
      if (newLog) setLogs(prev => [...prev.slice(-20), newLog!])
    } else if (activeLab === 'readers-writers') {
      const action = Math.random() > 0.5 ? 'reader' : 'writer'
      const startAction = Math.random() > 0.3 // 70% chance to start/end vs stay same
      let newLog: TraceLog | null = null

      if (action === 'reader') {
        if (startAction && !rwState.isWriting) {
          // Reader enters
          setRwState(prev => ({ ...prev, readers: prev.readers + 1 }))
          newLog = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11),
            code: `wait(mutex); readcount++; if(readcount==1) wait(wrt); signal(mutex);`,
            explanation: `READER ENTERED: Reader count is now ${rwState.readers + 1}. First reader locks Writer access.`
          }
        } else if (!startAction && rwState.readers > 0) {
          // Reader leaves
          setRwState(prev => ({ ...prev, readers: prev.readers - 1 }))
          newLog = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11),
            code: `wait(mutex); readcount--; if(readcount==0) signal(wrt); signal(mutex);`,
            explanation: `READER LEFT: Reader count is now ${rwState.readers - 1}. Last reader releases Writer lock.`
          }
        } else if (startAction && rwState.isWriting) {
          newLog = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11),
            code: `// BLOCKED: Writer has exclusive lock`,
            explanation: `READER BLOCKED: A writer is currently updating the system. Readers must wait.`
          }
        }
      } else {
        if (startAction && rwState.readers === 0 && !rwState.isWriting) {
          // Writer enters
          setRwState(prev => ({ ...prev, isWriting: true, database: prev.database + 1 }))
          newLog = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11),
            code: `wait(wrt); // Critical Section: writing...`,
            explanation: `WRITER STARTED: Writer acquired exclusive 'wrt' lock. Database incremented to ${rwState.database + 1}.`
          }
        } else if (!startAction && rwState.isWriting) {
          // Writer leaves
          setRwState(prev => ({ ...prev, isWriting: false }))
          newLog = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11),
            code: `signal(wrt); // Exit CS`,
            explanation: `WRITER FINISHED: Writer released exclusive lock. System now available for Readers.`
          }
        } else if (startAction && (rwState.readers > 0 || rwState.isWriting)) {
          newLog = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11),
            code: `// BLOCKED: Consumers or other Writer active`,
            explanation: `WRITER BLOCKED: Cannot enter while readers (${rwState.readers}) or another writer are active.`
          }
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
    setPcIndices({ in: 0, out: 0 })
    setRwState({
      readers: 0,
      isWriting: false,
      waitingReaders: 0,
      waitingWriters: 0,
      database: 42
    })
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
                    { id: 'readers-writers', label: 'Readers-Writers', icon: BookOpen },
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
                      <span className="text-secondary mono">
                        {activeLab === 'philosophers' ? 'No Deadlock' : 
                         activeLab === 'producer-consumer' ? (buffer.length === 8 ? 'Producer Waiting' : buffer.length === 0 ? 'Consumer Waiting' : 'None') :
                         (rwState.isWriting ? 'Readers Blocked' : rwState.readers > 0 ? 'Writers Blocked' : 'Normal')}
                      </span>
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
                ) : activeLab === 'producer-consumer' ? (
                  <div className="flex flex-col items-center gap-12 w-full max-w-2xl px-4 md:px-10">
                     <div className="flex items-center gap-8 md:gap-20">
                        <div className="flex flex-col items-center gap-4">
                           <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary animate-pulse">
                              <RotateCcw size={30} className="animate-spin" style={{ animationDuration: '3s' }} />
                           </div>
                           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Producer</span>
                        </div>
                        
                        <div className="flex-1 flex gap-1 md:gap-3 h-24 md:h-32 p-2 md:p-4 glass rounded-[2rem] items-end border-white/5">
                           <AnimatePresence>
                              {buffer.map((val, i) => (
                                <motion.div 
                                  key={`${i}-${val}`}
                                  initial={{ y: -50, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: 50, opacity: 0 }}
                                  className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-lg shadow-[0_0_15px_rgba(38,0,255,0.3)] relative group"
                                  style={{ height: `${30 + (i * 8)}%` }}
                                >
                                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[8px] font-bold text-primary">ID: {val}</div>
                                </motion.div>
                              ))}
                           </AnimatePresence>
                           {buffer.length === 0 && <div className="flex-1 flex items-center justify-center text-slate-700 italic text-[10px] mb-8 uppercase tracking-widest">Buffer_Empty</div>}
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
                           <span className="text-[10px] font-bold text-slate-600 uppercase mb-2">Ptr: In / Out</span>
                           <span className="text-xl md:text-2xl font-black text-slate-400 font-mono italic">{pcIndices.in} / {pcIndices.out}</span>
                        </div>
                        <div className="flex flex-col items-center">
                           <span className="text-[10px] font-bold text-slate-600 uppercase mb-2">Semaphore: Full</span>
                           <span className="text-xl md:text-2xl font-black text-secondary">{buffer.length}</span>
                        </div>
                     </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-12 w-full max-w-4xl px-4">
                    <div className="grid grid-cols-3 gap-8 md:gap-16 w-full items-center">
                      {/* Readers Side */}
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Active Readers</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <motion.div
                              key={`reader-${i}`}
                              animate={i < rwState.readers ? { scale: 1.1, backgroundColor: 'rgba(0, 243, 255, 0.1)' } : { scale: 1 }}
                              className={`aspect-square rounded-2xl border flex items-center justify-center transition-all ${i < rwState.readers ? 'border-primary/40 text-primary shadow-[0_0_15px_rgba(0,243,255,0.1)]' : 'border-white/5 text-slate-700'}`}
                            >
                               <User size={16} />
                            </motion.div>
                          ))}
                        </div>
                        <div className="text-center">
                          <span className="text-3xl font-black text-primary italic tracking-tighter">{rwState.readers}</span>
                          <p className="text-[8px] font-bold text-slate-600 uppercase">Current Count</p>
                        </div>
                      </div>

                      {/* Shared Database */}
                      <div className="flex flex-col items-center justify-center relative">
                        <motion.div 
                          animate={rwState.isWriting ? { 
                            scale: [1, 1.05, 1],
                            borderColor: ['rgba(157,0,255,0.2)', 'rgba(157,0,255,0.6)', 'rgba(157,0,255,0.2)']
                          } : { scale: 1 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className={`w-32 h-32 md:w-48 md:h-48 rounded-[3rem] border-4 flex flex-col items-center justify-center gap-2 bg-black/40 relative z-10 transition-colors duration-500 ${rwState.isWriting ? 'border-secondary shadow-[0_0_40px_rgba(157,0,255,0.2)]' : rwState.readers > 0 ? 'border-primary/30 shadow-[0_0_40px_rgba(0,243,255,0.1)]' : 'border-white/10'}`}
                        >
                          <Layers size={rwState.isWriting ? 40 : 32} className={`transition-all duration-500 ${rwState.isWriting ? 'text-secondary' : rwState.readers > 0 ? 'text-primary' : 'text-slate-700'}`} />
                          <div className="text-center">
                            <span className={`text-2xl font-black italic tracking-tighter ${rwState.isWriting ? 'text-secondary' : 'text-white'}`}>{rwState.database}</span>
                            <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest mt-1">Shared_Store</p>
                          </div>
                          
                          {/* Pulsing rings */}
                          {rwState.isWriting && (
                            <>
                              <div className="absolute inset-0 rounded-[3rem] border border-secondary animate-ping opacity-20" />
                              <div className="absolute -inset-4 rounded-[4rem] border border-secondary/20 animate-pulse" />
                            </>
                          )}
                        </motion.div>
                        
                        {/* Lock Display */}
                        <div className="mt-8 flex gap-4">
                          <div className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${rwState.readers > 0 ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white/5 border-white/10 text-slate-600'}`}>
                            {rwState.readers > 0 ? <Lock size={12} /> : <Unlock size={12} />} Read_Lock
                          </div>
                          <div className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${rwState.isWriting ? 'bg-secondary/10 border-secondary/30 text-secondary' : 'bg-white/5 border-white/10 text-slate-600'}`}>
                             {rwState.isWriting ? <Lock size={12} /> : <Unlock size={12} />} Write_Lock
                          </div>
                        </div>
                      </div>

                      {/* Writer Side */}
                      <div className="flex flex-col items-center gap-6">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Active Writer</h4>
                        <motion.div
                          animate={rwState.isWriting ? { 
                            rotate: 360,
                            scale: 1.2
                          } : { rotate: 0, scale: 1 }}
                          transition={rwState.isWriting ? { repeat: Infinity, duration: 4, ease: "linear" } : {}}
                          className={`w-20 h-20 md:w-28 md:h-28 rounded-[2rem] border-2 flex items-center justify-center transition-all duration-500 ${rwState.isWriting ? 'bg-secondary/10 border-secondary text-secondary shadow-[0_0_30px_rgba(157,0,255,0.3)]' : 'bg-white/5 border-white/10 text-slate-800'}`}
                        >
                          <Zap size={rwState.isWriting ? 32 : 24} />
                        </motion.div>
                        <div className={`text-center transition-opacity ${rwState.isWriting ? 'opacity-100' : 'opacity-30'}`}>
                           <span className="text-[10px] font-black text-secondary uppercase tracking-widest animate-pulse italic">In_Critical_Section</span>
                        </div>
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
