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

const THREAD_COLORS = ['#00f3ff', '#9d00ff', '#ff004c', '#00ff8a', '#ff8a00']

interface Thread {
  id: number
  state: 'running' | 'ready' | 'blocked' | 'terminated'
  priority: number
  color: string
  progress: number
  arrivalTime: number
  finishTime?: number
  waitingTime: number
  turnaroundTime: number
  burstTime: number
}

export const ThreadManagement = () => {
  // Unified Simulation State
  const [simState, setSimState] = useState({
    threads: [
      { id: 1, state: 'ready', priority: 1, color: THREAD_COLORS[0], progress: 0, arrivalTime: 0, waitingTime: 0, turnaroundTime: 0, burstTime: 20 },
      { id: 2, state: 'ready', priority: 0, color: THREAD_COLORS[1], progress: 0, arrivalTime: 0, waitingTime: 0, turnaroundTime: 0, burstTime: 20 },
    ] as Thread[],
    isRunning: false,
    currentTime: 0,
    cpuUsage: 0,
    nextId: 3, // Global counter for unique IDs
  })

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
        const readyIdx = nextThreads.findIndex(t => t.state === 'ready')
        if (readyIdx !== -1) {
          nextThreads[readyIdx].state = 'running'
          nextLogs.push({ 
            id: `run-${nextThreads[readyIdx].id}-${nextTime}`, 
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11), 
            code: `pthread_mutex_lock(&cpu_lock);`, 
            explanation: `Thread ${nextThreads[readyIdx].id} is now Running.` 
          })
        }
      } else {
        const t = nextThreads[runningIdx]
        t.progress += 5
        if (t.progress >= 100) {
          t.state = 'terminated'
          t.progress = 100
          t.finishTime = nextTime
          t.turnaroundTime = nextTime - t.arrivalTime
          t.waitingTime = t.turnaroundTime - t.burstTime
          nextLogs.push({ 
            id: `term-${t.id}-${nextTime}`, 
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11), 
            code: `pthread_exit(NULL);`, 
            explanation: `Thread ${t.id} finished at Time ${nextTime}.` 
          })
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
      timerRef.current = setInterval(tick, 200)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning])

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

  const addThread = () => {
    setSimState(prev => {
      const newThread: Thread = {
        id: prev.nextId,
        state: 'ready',
        priority: Math.floor(Math.random() * 3),
        color: THREAD_COLORS[prev.nextId % THREAD_COLORS.length],
        progress: 0,
        arrivalTime: prev.currentTime,
        waitingTime: 0,
        turnaroundTime: 0,
        burstTime: 20
      }
      return {
        ...prev,
        threads: [...prev.threads, newThread],
        nextId: prev.nextId + 1
      }
    })
    
    // Auto-scroll to bottom of list
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight
      }
    }, 100)
  }

  const resetThreads = () => {
    setLogs([])
    setSimState({
      threads: [
        { id: 1, state: 'ready', priority: 1, color: THREAD_COLORS[0], progress: 0, arrivalTime: 0, waitingTime: 0, turnaroundTime: 0, burstTime: 20 },
        { id: 2, state: 'ready', priority: 0, color: THREAD_COLORS[1], progress: 0, arrivalTime: 0, waitingTime: 0, turnaroundTime: 0, burstTime: 20 },
      ],
      isRunning: false,
      currentTime: 0,
      cpuUsage: 0,
      nextId: 3
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
                 <button 
                    onClick={addThread} 
                    id="spawn-thread-btn"
                    className="w-full btn-secondary flex items-center justify-center gap-3 py-5 text-xs font-black uppercase tracking-widest hover:shadow-[0_0_25px_rgba(157,0,255,0.4)] active:scale-95 z-20"
                 >
                    <Plus size={18} />
                    SPAWN NEW THREAD
                 </button>

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
