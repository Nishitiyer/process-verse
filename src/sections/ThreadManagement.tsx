import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GitBranch, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Zap, 
  Layers,
  Activity,
  ShieldCheck
} from 'lucide-react'
import { AlgorithmDeepDive } from '../components/AlgorithmDeepDive'
import { LiveCodeTracer, TraceLog } from '../components/LiveCodeTracer'
import { getNextThread, ThreadSchedulingAlgorithm, Thread as ThreadType } from '../logic/threadSim'

const THREAD_COLORS = ['#00f3ff', '#9d00ff', '#ff004c', '#00ff8a', '#ff8a00']

export type Thread = ThreadType;

export const ThreadManagement = () => {
  // Unified Simulation State
  const [simState, setSimState] = useState({
    threads: [] as Thread[],
    isRunning: false,
    currentTime: 0,
    cpuUsage: 0,
    nextId: 1, // Global counter for unique IDs
  })

  const [algorithm, setAlgorithm] = useState<ThreadSchedulingAlgorithm>('FCFS')
  const [quantum, setQuantum] = useState(2)
  const quantumRef = useRef(0)

  const { threads, isRunning, currentTime, cpuUsage } = simState
  const [logs, setLogs] = useState<TraceLog[]>([])
  const timerRef = useRef<any>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const tick = () => {
    setSimState(prev => {
      const nextTime = prev.currentTime + 1
      const nextThreads = prev.threads.map(t => ({ ...t }))
      const nextLogs: TraceLog[] = []
      
      const runningIdx = nextThreads.findIndex(t => t.state === 'running')
      
      if (runningIdx === -1) {
        // Scheduler Pick
        const picked = getNextThread(nextThreads, algorithm);
        if (picked) {
          const idx = nextThreads.findIndex(t => t.id === picked.id);
          nextThreads[idx].state = 'running'
          quantumRef.current = 0
          nextLogs.push({ 
            id: `run-${nextThreads[idx].id}-${nextTime}`, 
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11), 
            code: `pthread_mutex_lock(&cpu_lock); // Dispatch T${nextThreads[idx].id}`, 
            explanation: `Thread ${nextThreads[idx].id} scheduled using ${algorithm}.` 
          })
        }
      } else {
        const t = nextThreads[runningIdx]
        t.progress += (100 / t.burstTime) // Using burstTime for progress
        t.remainingTime = Math.max(0, t.remainingTime - 1)
        quantumRef.current += 1

        if (t.remainingTime <= 0) {
          t.state = 'terminated'
          t.progress = 100
          t.finishTime = nextTime
          t.turnaroundTime = nextTime - t.arrivalTime
          t.waitingTime = t.turnaroundTime - t.burstTime
          nextLogs.push({ 
            id: `term-${t.id}-${nextTime}`, 
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11), 
            code: `pthread_exit(NULL); // Terminated`, 
            explanation: `Thread ${t.id} completed at Time ${nextTime}.` 
          })
          quantumRef.current = 0
        } else if (algorithm === 'RR' && quantumRef.current >= quantum) {
          t.state = 'ready'
          nextLogs.push({ 
            id: `preempt-${t.id}-${nextTime}`, 
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11), 
            code: `pthread_yield(); // Preempted (RR)`, 
            explanation: `Time Slice expired for Thread ${t.id}.` 
          })
          quantumRef.current = 0
        }
      }

      if (nextLogs.length > 0) {
        setLogs(pl => [...pl.slice(-20), ...nextLogs])
      }

      return {
        ...prev,
        threads: nextThreads,
        currentTime: nextTime,
        cpuUsage: prev.isRunning ? (Math.floor(Math.random() * 30) + 40) : 0,
      }
    })
  }

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(tick, 500) // Slower for visibility
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning, algorithm, quantum])

  useEffect(() => {
    const hp = () => setSimState(s => ({ ...s, isRunning: !s.isRunning }))
    const hr = () => resetThreads()
    window.addEventListener('GLOBAL_PLAY_TOGGLE', hp)
    window.addEventListener('GLOBAL_RESET', hr)
    return () => {
      window.removeEventListener('GLOBAL_PLAY_TOGGLE', hp)
      window.removeEventListener('GLOBAL_RESET', hr)
    }
  }, [])

  // Form State
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBurst, setNewBurst] = useState(4)
  const [newPriority, setNewPriority] = useState(1)
  const [newArrivalTime, setNewArrivalTime] = useState(simState.currentTime)

  const submitThread = () => {
    setSimState(prev => {
      const newThread: Thread = {
        id: prev.nextId,
        processId: 1,
        state: 'ready',
        priority: Number(newPriority),
        color: THREAD_COLORS[prev.nextId % THREAD_COLORS.length],
        progress: 0,
        arrivalTime: Number(newArrivalTime),
        waitingTime: 0,
        turnaroundTime: 0,
        burstTime: Number(newBurst),
        remainingTime: Number(newBurst),
        load: Number(newBurst),
      }
      return {
        ...prev,
        threads: [...prev.threads, newThread],
        nextId: prev.nextId + 1
      }
    })
    setShowAddForm(false)
    setNewBurst(4)
    setNewPriority(1)
    setNewArrivalTime(currentTime)
  }

  const cycleAlgorithm = () => {
    const algos: ThreadSchedulingAlgorithm[] = ['FCFS', 'SJF', 'Priority', 'RR']
    const nextIdx = (algos.indexOf(algorithm) + 1) % algos.length
    setAlgorithm(algos[nextIdx])
    resetThreads()
  }

  const resetThreads = () => {
    setLogs([])
    quantumRef.current = 0
    setSimState({
      threads: [],
      isRunning: false,
      currentTime: 0,
      cpuUsage: 0,
      nextId: 1
    })
  }

  return (
    <div className="p-12 space-y-12 max-w-7xl mx-auto custom-scrollbar">
      <div className="flex items-center justify-between glass p-10 rounded-[3rem] border-white/[0.05] relative overflow-hidden">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[2rem] bg-secondary/10 flex items-center justify-center text-secondary outline outline-1 outline-secondary/30 shadow-[0_0_30px_rgba(157,0,255,0.15)]">
            <GitBranch size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Multi-Threading</h1>
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                 <Activity size={12} className="text-secondary" /> LWP Isolation: Active
               </span>
               <div className="h-1 w-1 rounded-full bg-slate-700" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                 <ShieldCheck size={12} className="text-green-500" /> Thread Safety: Verified
               </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-[2rem] border border-white/[0.05]">
           <div className="flex items-center gap-3 bg-black/40 px-6 py-2 rounded-2xl border border-white/10 font-mono mr-4">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Tick</span>
              <span className="text-secondary text-xl font-black">{currentTime}</span>
           </div>
          <button 
            onClick={() => setSimState(s => ({ ...s, isRunning: !s.isRunning }))}
            className={`px-8 py-4 rounded-2xl transition-all font-black text-sm flex items-center gap-3 ${isRunning ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'btn-secondary text-white'}`}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
            {isRunning ? 'SUSPEND' : 'EXECUTE'}
          </button>
          <button onClick={resetThreads} className="p-4 rounded-2xl glass hover:bg-white/10 text-slate-400 border-white/10">
            <RotateCcw size={22} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-8">
           <div className="glass-card flex flex-col gap-10">
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-6">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3">
                  <Layers size={18} className="text-secondary" /> Thread Pool
                </h3>
                <span className="mono text-[10px] text-secondary font-bold">{threads.length} Units</span>
              </div>

              <div className="space-y-6">
                 {!showAddForm ? (
                   <button 
                      onClick={() => setShowAddForm(true)} 
                      id="spawn-thread-btn"
                      className="w-full btn-secondary flex items-center justify-center gap-3 py-5 text-xs font-black uppercase tracking-widest hover:shadow-[0_0_25px_rgba(157,0,255,0.4)] active:scale-95"
                   >
                      <Plus size={18} />
                      SPAWN NEW THREAD
                   </button>
                 ) : (
                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-secondary/20 space-y-4 shadow-[0_0_20px_rgba(157,0,255,0.05)]">
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Arrival Time</span>
                          <div className="flex items-center gap-3">
                            <button onClick={() => setNewArrivalTime(Math.max(0, newArrivalTime - 1))} className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300">-</button>
                            <input 
                              type="number" 
                              value={newArrivalTime} 
                              onChange={(e) => setNewArrivalTime(parseInt(e.target.value) || 0)}
                              className="w-12 bg-transparent text-center font-mono text-secondary font-bold focus:outline-none"
                            />
                            <button onClick={() => setNewArrivalTime(newArrivalTime + 1)} className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300">+</button>
                          </div>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Burst Time (T)</span>
                          <div className="flex items-center gap-3">
                            <button onClick={() => setNewBurst(Math.max(1, newBurst - 1))} className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300">-</button>
                            <input 
                              type="number" 
                              value={newBurst} 
                              onChange={(e) => setNewBurst(parseInt(e.target.value) || 1)}
                              className="w-12 bg-transparent text-center font-mono text-secondary font-bold focus:outline-none"
                            />
                            <button onClick={() => setNewBurst(newBurst + 1)} className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300">+</button>
                          </div>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Priority (0=High)</span>
                          <div className="flex items-center gap-3">
                            <button onClick={() => setNewPriority(Math.max(0, newPriority - 1))} className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300">-</button>
                            <input 
                              type="number" 
                              value={newPriority} 
                              onChange={(e) => setNewPriority(parseInt(e.target.value) || 0)}
                              className="w-12 bg-transparent text-center font-mono text-accent font-bold focus:outline-none"
                            />
                            <button onClick={() => setNewPriority(newPriority + 1)} className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300">+</button>
                          </div>
                       </div>
                       <div className="flex gap-2 pt-2">
                          <button onClick={() => setShowAddForm(false)} className="flex-1 py-2 rounded-xl border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5">Cancel</button>
                          <button onClick={submitThread} className="flex-1 py-2 rounded-xl bg-secondary text-white text-xs font-black uppercase tracking-widest hover:shadow-[0_0_15px_rgba(157,0,255,0.4)]">Deploy</button>
                       </div>
                    </div>
                 )}

                 <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                       <span>Scheduler</span>
                       <button onClick={cycleAlgorithm} className="text-secondary font-mono bg-secondary/10 px-3 py-1.5 rounded hover:bg-secondary/20 transition-colors cursor-pointer">
                          {algorithm}
                       </button>
                    </div>
                    {algorithm === 'RR' && (
                       <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                          <span>Time Slice</span>
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => setQuantum(Math.max(1, quantum - 1))} className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-slate-400 font-bold">-</button>
                            <span className="text-secondary font-mono bg-secondary/10 px-2 py-0.5 rounded">{quantum}T</span>
                            <button onClick={() => setQuantum(quantum + 1)} className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-slate-400 font-bold">+</button>
                          </div>
                       </div>
                    )}
                 </div>

                 <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-secondary shadow-[0_0_15px_rgba(157,0,255,0.5)]" />
                    <div className="flex items-center justify-between mb-6">
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global CPU Load</span>
                       <span className="text-secondary font-black text-lg">{cpuUsage}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5">
                       <motion.div 
                         className="h-full bg-gradient-to-r from-secondary to-primary rounded-full shadow-[0_0_20px_rgba(157,0,255,0.4)]"
                         animate={{ width: `${cpuUsage}%` }}
                       />
                    </div>
                 </div>
              </div>

              <div className="p-6 rounded-3xl bg-secondary/5 border border-secondary/10">
                 <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-wider flex items-start gap-4">
                    <Zap size={20} className="text-secondary flex-shrink-0" />
                    Threads share process memory. Mutex locks are active for critical sections.
                 </p>
              </div>
           </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
           <div className="glass-card flex flex-col gap-10 overflow-hidden" style={{ maxHeight: '800px' }}>
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3">
                  <Activity size={18} className="text-primary" /> Runtime Monitor
                </h3>
                 <div className="flex gap-2">
                   {['READY', 'RUNNING', 'BLOCKED'].map(s => (
                     <span key={s} className="text-[8px] font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded tracking-tighter text-slate-500">{s}</span>
                   ))}
                </div>
              </div>

              <div ref={listRef} className="space-y-6 overflow-y-auto pr-4 custom-scrollbar" style={{ maxHeight: '600px' }}>
                <AnimatePresence initial={false}>
                  {threads.map((t) => (
                    <motion.div 
                      key={t.id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] flex flex-col gap-6 relative overflow-hidden hover:bg-white/[0.05] transition-all duration-500"
                    >
                       <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-6">
                             <div className="w-16 h-16 rounded-3xl flex items-center justify-center font-black text-xl shadow-inner relative" style={{ backgroundColor: `${t.color}15`, color: t.color, border: `1px solid ${t.color}30` }}>
                                T{t.id}
                                {t.state === 'running' && (
                                  <div className="absolute -inset-1 border border-dashed rounded-3xl animate-spin opacity-50" style={{ borderColor: t.color, animationDuration: '4s' }} />
                                )}
                             </div>
                             <div>
                                <h4 className="font-black text-lg tracking-tight flex items-center gap-2">
                                  Thread Worker #{t.id}
                                  {t.state === 'running' && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500 text-black uppercase animate-pulse">Running</span>}
                                  {t.state === 'terminated' && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700 text-slate-400 uppercase">Finished</span>}
                                </h4>
                                <div className="flex gap-4 mt-1 font-mono text-[10px] uppercase font-bold text-slate-500">
                                   <span>Priority: <span className={t.priority === 0 ? 'text-accent' : 'text-slate-400'}>{t.priority === 0 ? 'Urgent' : t.priority === 1 ? 'Normal' : 'Background'}</span></span>
                                   <span>State: <span className="text-white/70">{t.state}</span></span>
                                </div>
                             </div>
                          </div>
                          <div className="text-right text-3xl font-black italic text-white/20 group-hover:text-white/40 transition-colors uppercase tracking-tighter">
                             {t.progress}%
                          </div>
                       </div>
                       
                       <div className="relative h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                          <motion.div 
                            className="h-full rounded-full shadow-[0_0_15px_currentColor]"
                            style={{ backgroundColor: t.color, color: t.color }}
                            animate={{ width: `${t.progress}%` }}
                          />
                       </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {threads.length === 0 && <div className="p-20 text-center text-slate-800 italic uppercase font-black tracking-widest text-2xl opacity-20">No_Threads_Active</div>}
              </div>

              <div className="mt-4 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-2">
                   <Activity size={18} className="text-secondary" /> Analysis Report
                </h3>
                <div className="overflow-x-auto custom-scrollbar max-h-[300px]">
                  <table className="w-full text-left font-mono text-[10px]">
                    <thead>
                      <tr className="border-b border-white/5 text-slate-500">
                        <th className="pb-4">THREAD</th>
                        <th className="pb-4 text-center">SPAWN</th>
                        <th className="pb-4 text-center">BURST</th>
                        <th className="pb-4 text-center">FINISH</th>
                        <th className="pb-4 text-center text-primary">TAT</th>
                        <th className="pb-4 text-center text-accent">WT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {threads.map(t => (
                        <tr key={t.id} className="group hover:bg-white/[0.02]">
                          <td className="py-4 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                            <span className="font-bold text-white italic">T{t.id}</span>
                          </td>
                          <td className="py-4 text-center text-slate-400">{t.arrivalTime}</td>
                          <td className="py-4 text-center text-slate-400">{t.burstTime}</td>
                          <td className="py-4 text-center text-secondary">{t.state === 'terminated' ? t.finishTime : '-'}</td>
                          <td className="py-4 text-center text-primary font-bold">{t.state === 'terminated' ? t.turnaroundTime : '-'}</td>
                          <td className="py-4 text-center text-accent font-bold">{t.state === 'terminated' ? t.waitingTime : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <LiveCodeTracer logs={logs} />
           </div>
        </div>
      </div>
      <AlgorithmDeepDive algorithm="Threads" />
    </div>
  )
}
