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

const THREAD_COLORS = ['#00f3ff', '#9d00ff', '#ff004c', '#00ff8a', '#ff8a00']

interface Thread {
  id: number
  state: 'running' | 'ready' | 'blocked' | 'terminated'
  priority: number
  color: string
  progress: number
}

export const ThreadManagement = () => {
  const [threads, setThreads] = useState<Thread[]>([
    { id: 1, state: 'ready', priority: 1, color: THREAD_COLORS[0], progress: 0 },
    { id: 2, state: 'ready', priority: 0, color: THREAD_COLORS[1], progress: 0 },
  ])
  const [isRunning, setIsRunning] = useState(false)
  const [cpuUsage, setCpuUsage] = useState(0)
  const timerRef = useRef<any>(null)

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setThreads(prev => {
          const next = prev.map(t => ({ ...t }))
          const runningIdx = next.findIndex(t => t.state === 'running')
          
          if (runningIdx === -1) {
            const readyIdx = next.findIndex(t => t.state === 'ready')
            if (readyIdx !== -1) next[readyIdx].state = 'running'
          } else {
            next[runningIdx].progress += 5
            if (next[runningIdx].progress >= 100) {
              next[runningIdx].state = 'terminated'
              next[runningIdx].progress = 100
            }
          }
          return next
        })
        setCpuUsage(Math.floor(Math.random() * 30) + 40)
      }, 200)
    } else {
      clearInterval(timerRef.current)
      setCpuUsage(0)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning, threads])

  useEffect(() => {
    const handlePlay = () => setIsRunning(r => !r)
    const handleReset = () => resetThreads()
    window.addEventListener('GLOBAL_PLAY_TOGGLE', handlePlay)
    window.addEventListener('GLOBAL_RESET', handleReset)
    return () => {
      window.removeEventListener('GLOBAL_PLAY_TOGGLE', handlePlay)
      window.removeEventListener('GLOBAL_RESET', handleReset)
    }
  }, [])

  const addThread = () => {
    const newId = threads.length + 1
    setThreads([...threads, {
      id: newId,
      state: 'ready',
      priority: Math.floor(Math.random() * 3),
      color: THREAD_COLORS[newId % THREAD_COLORS.length],
      progress: 0
    }])
  }

  const resetThreads = () => {
    setIsRunning(false)
    setThreads([
      { id: 1, state: 'ready', priority: 1, color: THREAD_COLORS[0], progress: 0 },
      { id: 2, state: 'ready', priority: 0, color: THREAD_COLORS[1], progress: 0 },
    ])
  }

  return (
    <div className="p-12 space-y-12 max-w-7xl mx-auto">
       {/* Header Section */}
      <div className="flex items-center justify-between glass p-10 rounded-[3rem] border-white/[0.05] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 text-primary/5 -z-10">
          <GitBranch size={160} />
        </div>
        
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[2rem] bg-secondary/10 flex items-center justify-center text-secondary shadow-[0_0_30px_rgba(157,0,255,0.15)] outline outline-1 outline-secondary/30">
            <GitBranch size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Multi-Threading</h1>
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                 <Activity size={12} className="text-secondary" /> 
                 LWP Isolation: Active
               </span>
               <div className="h-1 w-1 rounded-full bg-slate-700" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                 <ShieldCheck size={12} className="text-green-500" /> 
                 Thread Safety: Verified
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
            {isRunning ? 'SUSPEND' : 'EXECUTE'}
          </button>
          <button onClick={resetThreads} className="p-4 rounded-2xl glass hover:bg-white/10 text-slate-400 border-white/10">
            <RotateCcw size={22} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Pool Management */}
        <div className="lg:col-span-4 space-y-8">
           <div className="glass-card flex flex-col gap-10">
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-6">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3">
                  <Layers size={18} className="text-secondary" />
                  Thread Pool
                </h3>
                <span className="mono text-[10px] text-secondary font-bold">{threads.length} Units</span>
              </div>

              <div className="space-y-6">
                 <button onClick={addThread} className="w-full btn-secondary flex items-center justify-center gap-3 py-4 text-xs">
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
                    <div className="mt-4 flex justify-between text-[8px] font-mono text-slate-600 uppercase">
                       <span>Efficiency Optimal</span>
                       <span>Shared Memory Mode</span>
                    </div>
                 </div>
              </div>

              <div className="p-6 rounded-3xl bg-secondary/5 border border-secondary/10">
                 <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-secondary/20 text-secondary">
                       <Zap size={20} />
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-wider">
                      Shared resources are protected by mutex locks to prevent race conditions during execution.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Runtime Visualizer */}
        <div className="lg:col-span-8 space-y-8">
           <div className="glass-card min-h-[500px] flex flex-col gap-10">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3">
                  <Activity size={18} className="text-primary" />
                  Runtime Monitor
                </h3>
                <div className="flex gap-2">
                   {['READY', 'RUNNING', 'BLOCKED'].map(s => (
                     <span key={s} className="text-[8px] font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded tracking-tighter text-slate-500">{s}</span>
                   ))}
                </div>
              </div>

              <div className="space-y-6">
                <AnimatePresence>
                  {threads.map((t) => (
                    <motion.div 
                      key={t.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
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
                                </h4>
                                <div className="flex gap-4 mt-1 font-mono text-[10px] uppercase font-bold">
                                   <span className="text-slate-500">Priority: <span className={t.priority === 0 ? 'text-accent' : 'text-slate-400'}>{t.priority === 0 ? 'Urgent' : t.priority === 1 ? 'Normal' : 'Background'}</span></span>
                                   <span className="text-slate-500">State: <span className="text-white/70">{t.state}</span></span>
                                </div>
                             </div>
                          </div>
                          <div className="text-right">
                             <div className="text-3xl font-black italic text-white/20 group-hover:text-white/40 transition-colors uppercase tracking-tighter">{t.progress}%</div>
                          </div>
                       </div>
                       
                       <div className="relative h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5">
                          <motion.div 
                            className="h-full rounded-full transition-all duration-300"
                            style={{ backgroundColor: t.color, boxShadow: `0 0 15px ${t.color}55` }}
                            animate={{ width: `${t.progress}%` }}
                          />
                       </div>

                       {/* Hover Overlay */}
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {threads.length === 0 && <div className="p-20 text-center text-slate-800 italic uppercase font-black tracking-widest text-2xl opacity-20">No_Threads_Active</div>}
              </div>
           </div>
        </div>
      </div>
      
      <AlgorithmDeepDive algorithm="Threads" />
    </div>
  )
}
