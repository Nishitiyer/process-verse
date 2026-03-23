import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RotateCcw, 
  Play, 
  Pause, 
  Lock, 
  Unlock, 
  Box, 
  Users, 
  Zap,
  Coffee,
  AlertCircle
} from 'lucide-react'

export const SynchronizationLab = () => {
  const [activeLab, setActiveLab] = useState<'Mutex' | 'ProducerConsumer' | 'DiningPhilosophers'>('Mutex')
  const [isRunning, setIsRunning] = useState(false)
  
  // Mutex Lab State
  const [mutexLocked, setMutexLocked] = useState(false)
  const [threadsInQueue, setThreadsInQueue] = useState<number[]>([1, 2, 3])
  const [currentThreadInCS, setCurrentThreadInCS] = useState<number | null>(null)

  // Producer-Consumer State
  const [buffer, setBuffer] = useState<number[]>([])
  const [bufferSize] = useState(8)
  const [isProducing, setIsProducing] = useState(false)
  const [isConsuming, setIsConsuming] = useState(false)

  // Dining Philosophers State
  const [philosophers, setPhilosophers] = useState<('thinking' | 'hungry' | 'eating')[]>(new Array(5).fill('thinking'))
  const [forks, setForks] = useState<boolean[]>(new Array(5).fill(true)) // true = available

  const timerRef = useRef<any>(null)

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        if (activeLab === 'Mutex') runMutexTick()
        if (activeLab === 'ProducerConsumer') runPCTick()
        if (activeLab === 'DiningPhilosophers') runPhilosopherTick()
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning, activeLab, mutexLocked, threadsInQueue, buffer, philosophers, forks])

  const runMutexTick = () => {
    if (!mutexLocked && threadsInQueue.length > 0) {
      const next = threadsInQueue[0]
      setThreadsInQueue(prev => prev.slice(1))
      setCurrentThreadInCS(next)
      setMutexLocked(true)
    } else if (mutexLocked && currentThreadInCS !== null) {
      setThreadsInQueue(prev => [...prev, currentThreadInCS!])
      setCurrentThreadInCS(null)
      setMutexLocked(false)
    }
  }

  const runPCTick = () => {
    const chance = Math.random()
    if (chance > 0.6 && buffer.length < bufferSize) {
      // Produce
      setIsProducing(true)
      setTimeout(() => {
        setBuffer(prev => [...prev, Math.floor(Math.random() * 100)])
        setIsProducing(false)
      }, 500)
    } else if (chance < 0.4 && buffer.length > 0) {
      // Consume
      setIsConsuming(true)
      setTimeout(() => {
        setBuffer(prev => prev.slice(1))
        setIsConsuming(false)
      }, 500)
    }
  }

  const runPhilosopherTick = () => {
    setPhilosophers(prev => {
      const next = [...prev]
      const i = Math.floor(Math.random() * 5)
      
      if (next[i] === 'thinking') {
        next[i] = 'hungry'
      } else if (next[i] === 'hungry') {
        const left = i
        const right = (i + 1) % 5
        if (forks[left] && forks[right]) {
          setForks(f => {
            const nf = [...f]
            nf[left] = false
            nf[right] = false
            return nf
          })
          next[i] = 'eating'
        }
      } else if (next[i] === 'eating') {
        const left = i
        const right = (i + 1) % 5
        setForks(f => {
          const nf = [...f]
          nf[left] = true
          nf[right] = true
          return nf
        })
        next[i] = 'thinking'
      }
      return next
    })
  }

  const resetLab = () => {
    setIsRunning(false)
    setMutexLocked(false)
    setThreadsInQueue([1, 2, 3])
    setCurrentThreadInCS(null)
    setBuffer([])
    setPhilosophers(new Array(5).fill('thinking'))
    setForks(new Array(5).fill(true))
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Synchronization Lab</h1>
          <p className="text-slate-400 mt-1">Experimental space for concurrency and race conditions.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 glass p-2 rounded-2xl border-slate-800">
          <div className="flex bg-slate-900 rounded-xl p-1">
            {(['Mutex', 'ProducerConsumer', 'DiningPhilosophers'] as const).map((lab) => (
              <button
                key={lab}
                onClick={() => { setActiveLab(lab); resetLab(); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeLab === lab ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {lab}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-1 border-l border-slate-800 pl-3">
             <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`p-2 rounded-xl transition-all ${isRunning ? 'bg-amber-500/20 text-amber-500' : 'bg-primary/20 text-primary hover:bg-primary/30'}`}
            >
              {isRunning ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>
            <button onClick={resetLab} className="p-2 rounded-xl hover:bg-white/5 text-slate-400">
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Lab Canvas */}
        <div className="lg:col-span-12 glass p-10 rounded-[2.5rem] border-slate-800 min-h-[500px] flex items-center justify-center relative overflow-hidden">
           
           <AnimatePresence mode="wait">
             {activeLab === 'Mutex' && (
               <motion.div 
                 key="mutex" 
                 initial={{ opacity: 0, scale: 0.9 }} 
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 className="w-full max-w-4xl flex flex-col items-center gap-16"
               >
                  {/* Waiting Queue */}
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-[10px] uppercase font-mono text-slate-500 tracking-[0.3em]">Entry Queue</span>
                    <div className="flex gap-4 p-6 glass rounded-3xl border-slate-800 min-w-[300px] justify-center">
                       {threadsInQueue.map((id) => (
                         <motion.div 
                           key={id} 
                           layoutId={`thread-${id}`}
                           className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-xs border border-slate-700 text-slate-400"
                         >
                           T{id}
                         </motion.div>
                       ))}
                       {threadsInQueue.length === 0 && <span className="text-slate-700 italic text-sm">Empty</span>}
                    </div>
                  </div>

                  {/* Mutex Area */}
                  <div className="relative">
                    <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center transition-all duration-500 ${mutexLocked ? 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.1)]' : 'bg-cyan-500/10 border-cyan-500/30'}`}>
                       <div className="absolute -top-12 flex flex-col items-center gap-2">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">Critical Section</span>
                          {mutexLocked ? <Lock className="text-amber-500" size={24} /> : <Unlock className="text-cyan-500" size={24} />}
                       </div>
                       <AnimatePresence mode="wait">
                         {currentThreadInCS !== null && (
                           <motion.div
                             key={currentThreadInCS}
                             layoutId={`thread-${currentThreadInCS}`}
                             initial={{ y: 50, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             exit={{ y: -50, opacity: 0 }}
                             className="w-20 h-20 rounded-3xl bg-cyan-500 flex flex-col items-center justify-center text-black font-bold shadow-2xl z-10"
                           >
                             <Zap size={24} />
                             <span>T{currentThreadInCS}</span>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                    {/* Glow Ring */}
                    <div className={`absolute -inset-4 border-2 rounded-[3.5rem] opacity-20 border-dashed animate-spin ${mutexLocked ? 'border-amber-500' : 'border-cyan-500'}`} style={{ animationDuration: '8s' }} />
                  </div>
               </motion.div>
             )}

             {activeLab === 'ProducerConsumer' && (
               <motion.div 
                 key="pc"
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }}
                 className="w-full max-w-5xl flex items-center justify-between gap-12"
               >
                  {/* Producer */}
                  <div className="flex flex-col items-center gap-6">
                    <div className={`w-24 h-24 rounded-full glass flex items-center justify-center border-2 ${isProducing ? 'border-primary animate-pulse' : 'border-slate-800'}`}>
                       <Box size={32} className={isProducing ? 'text-primary' : 'text-slate-600'} />
                    </div>
                    <span className="text-xs font-bold font-mono text-slate-400">PRODUCER</span>
                  </div>

                  {/* Buffer */}
                  <div className="flex-1 flex flex-col gap-4">
                     <span className="text-center text-[10px] font-mono text-slate-600 uppercase tracking-widest">Bounded Buffer (8 slots)</span>
                     <div className="grid grid-cols-4 gap-4 p-8 glass rounded-[2rem] border-slate-800 border-2 border-dashed bg-slate-900/20">
                        {Array.from({length: bufferSize}).map((_, i) => (
                           <div key={i} className="aspect-square rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-center overflow-hidden">
                              {buffer[i] !== undefined && (
                                <motion.div 
                                  initial={{ scale: 0, rotate: -45 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  className="w-full h-full bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center text-primary font-mono text-xs font-bold"
                                >
                                   {buffer[i]}
                                </motion.div>
                              )}
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Consumer */}
                   <div className="flex flex-col items-center gap-6">
                    <div className={`w-24 h-24 rounded-full glass flex items-center justify-center border-2 ${isConsuming ? 'border-secondary animate-pulse' : 'border-slate-800'}`}>
                       <Users size={32} className={isConsuming ? 'text-secondary' : 'text-slate-600'} />
                    </div>
                    <span className="text-xs font-bold font-mono text-slate-400">CONSUMER</span>
                  </div>
               </motion.div>
             )}

             {activeLab === 'DiningPhilosophers' && (
               <motion.div 
                  key="dining"
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-[500px] h-[500px]"
               >
                  {/* Table */}
                  <div className="absolute inset-20 rounded-full border-4 border-slate-800 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] bg-slate-900/50" />
                  
                  {/* Philosophers */}
                  {[0, 1, 2, 3, 4].map((i) => {
                    const angle = (i * 72 * Math.PI) / 180
                    const x = 250 + Math.sin(angle) * 200
                    const y = 250 - Math.cos(angle) * 200
                    
                    return (
                      <motion.div 
                        key={i}
                        className="absolute w-20 h-20 rounded-full flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-xl border-2 transition-colors duration-500"
                        style={{ 
                          left: x, 
                          top: y,
                          backgroundColor: philosophers[i] === 'eating' ? '#00f3ff22' : philosophers[i] === 'hungry' ? '#ff004c22' : '#1e293b',
                          borderColor: philosophers[i] === 'eating' ? '#00f3ff' : philosophers[i] === 'hungry' ? '#ff004c' : '#334155'
                        }}
                      >
                         <Coffee size={24} className={philosophers[i] === 'eating' ? 'text-primary' : 'text-slate-400'} />
                         <span className="text-[10px] font-bold mt-1">P{i}</span>
                      </motion.div>
                    )
                  })}

                  {/* Forks */}
                  {[0, 1, 2, 3, 4].map((i) => {
                    const angle = ((i * 72 + 36) * Math.PI) / 180
                    const x = 250 + Math.sin(angle) * 120
                    const y = 250 - Math.cos(angle) * 120
                    
                    return (
                      <motion.div 
                        key={i}
                        className={`absolute w-1 h-12 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${forks[i] ? 'bg-slate-600' : 'bg-slate-900 opacity-20'}`}
                        style={{ 
                          left: x, 
                          top: y,
                          rotate: `${i * 72 + 36}deg`
                        }}
                      />
                    )
                  })}

                  {/* Warning if Deadlock */}
                  {philosophers.every(p => p === 'hungry') && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                       <motion.div 
                         animate={{ scale: [1, 1.1, 1] }}
                         transition={{ repeat: Infinity }}
                         className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-2xl font-bold shadow-2xl"
                       >
                         <AlertCircle />
                         DEADLOCK DETECTED
                       </motion.div>
                    </div>
                  )}
               </motion.div>
             )}
           </AnimatePresence>

           {/* Cyber Grid Background */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        {/* Legend / Info */}
        <div className="lg:col-span-12 glass p-8 rounded-3xl border-slate-800 flex justify-between items-center gap-8">
           <div className="flex-1 space-y-4">
              <h3 className="text-xl font-bold text-slate-100 uppercase tracking-tighter">Laboratory Controller</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
                Observe how synchronization primitives solve the <strong>Critical Section Problem</strong>. 
                {activeLab === 'Mutex' && ' Mutex ensures only one thread can execute in the protected region at a time.'}
                {activeLab === 'ProducerConsumer' && ' The Producer waits for empty slots, while the Consumer waits for items to be available.'}
                {activeLab === 'DiningPhilosophers' && ' Illustrates the Circular Wait condition. Notice how resources (forks) must be acquired in pairs.'}
              </p>
           </div>
           
           <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Latency</span>
                <span className="text-primary font-bold">12ms</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Stability</span>
                <span className="text-green-500 font-bold">99.8%</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
