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
  User,
  ShieldCheck
} from 'lucide-react'
import { Thread, createThread } from '../logic/threadSim'

export const ThreadManagement = () => {
  const [threads, setThreads] = useState<Thread[]>([
    createThread(1, 1),
    createThread(2, 1),
  ])
  const [isRunning, setIsRunning] = useState(false)
  const [activeThreadId, setActiveThreadId] = useState<number | null>(null)
  const [contextSwitches, setContextSwitches] = useState(0)
  const [sharedMemory, setSharedMemory] = useState(1024) // MB
  const [threadModel, setThreadModel] = useState<'OneToOne' | 'ManyToOne' | 'ManyToMany'>('OneToOne')

  const timerRef = useRef<any>(null)

  const resetSimulation = () => {
    setIsRunning(false)
    setThreads(threads.map(t => ({ ...t, progress: 0, state: 'ready' })))
    setActiveThreadId(null)
    setContextSwitches(0)
    setSharedMemory(1024)
  }

  const addThread = () => {
    if (threads.length >= 8) return
    const newT = createThread(threads.length + 1, 1)
    setThreads([...threads, newT])
  }

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        tick()
      }, 400)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning, threads, activeThreadId])

  const tick = () => {
    setThreads(prev => {
      // Pick a random thread if none is active or occasionally switch
      let updatedActiveId = activeThreadId
      let switchOccurred = false

      if (updatedActiveId === null || Math.random() > 0.7) {
        const available = prev.filter(t => t.state !== 'terminated')
        if (available.length > 0) {
          const next = available[Math.floor(Math.random() * available.length)]
          if (next.id !== updatedActiveId) {
            updatedActiveId = next.id
            switchOccurred = true
          }
        }
      }

      if (switchOccurred) {
        setContextSwitches(s => s + 1)
        setSharedMemory(m => m + (Math.random() * 10 - 5))
      }

      setActiveThreadId(updatedActiveId)

      return prev.map(t => {
        if (t.id === updatedActiveId) {
          const newProgress = Math.min(100, t.progress + (Math.random() * 10 + 5))
          return { 
            ...t, 
            state: newProgress >= 100 ? 'terminated' : 'running',
            progress: newProgress 
          }
        }
        return { ...t, state: t.state === 'running' ? 'ready' : t.state }
      })
    })

    // If all terminated, stop
    if (threads.every(t => t.state === 'terminated')) {
      setIsRunning(false)
      setActiveThreadId(null)
    }
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">Thread Management</h1>
          <p className="text-slate-400 mt-1">Multi-threaded execution and context switching visualizer.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 glass p-2 rounded-2xl border-slate-800">
           <div className="flex items-center gap-2 px-3 border-r border-slate-800">
            <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Model</label>
            <select 
              value={threadModel}
              onChange={(e) => setThreadModel(e.target.value as any)}
              className="bg-transparent text-sm font-semibold text-purple-400 outline-none cursor-pointer"
            >
              <option value="OneToOne">1:1 (Kernel)</option>
              <option value="ManyToOne">N:1 (User)</option>
              <option value="ManyToMany">N:M (Hybrid)</option>
            </select>
          </div>
          
          <div className="flex items-center gap-3 px-2">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isRunning ? 'bg-amber-500/20 text-amber-500' : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'}`}
            >
              {isRunning ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              <span className="text-xs font-bold uppercase tracking-widest">{isRunning ? 'Pause' : 'Start'}</span>
            </button>
            <button 
              onClick={resetSimulation}
              className="p-2 rounded-xl hover:bg-white/5 text-slate-400"
            >
              <RotateCcw size={18} />
            </button>
            <button 
              onClick={addThread}
              className="p-2 rounded-xl bg-white/5 text-slate-200 hover:bg-white/10"
              title="Add Thread"
              disabled={threads.length >= 8}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Thread Pool View */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="glass p-8 rounded-[2rem] border-slate-800 flex-1 relative overflow-hidden flex flex-col items-center">
            {/* Process Boundary */}
            <div className="absolute inset-8 border-2 border-dashed border-slate-800 rounded-[2.5rem] pointer-events-none" />
            <div className="absolute top-10 left-12 flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              <Layers size={14} className="text-purple-500" />
              <span className="text-[10px] font-mono text-slate-400">PROCESS_ID: 1024</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 w-full max-w-4xl">
              <AnimatePresence>
                {threads.map((t) => (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`relative p-6 rounded-3xl flex flex-col items-center gap-4 transition-all duration-300 ${
                      t.id === activeThreadId ? 'bg-white/5 scale-105 shadow-[0_0_30px_rgba(157,0,255,0.1)]' : 'opacity-60'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-2 border-slate-800 flex items-center justify-center bg-slate-900 group">
                        <User size={28} style={{ color: t.color }} />
                        {t.id === activeThreadId && (
                           <motion.div 
                             className="absolute inset-0 rounded-full border-2"
                             style={{ borderColor: t.color }}
                             animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                             transition={{ repeat: Infinity, duration: 1 }}
                           />
                        )}
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[8px] font-bold">
                        T{t.id}
                      </div>
                    </div>

                    <div className="w-full space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                        <span>Load</span>
                        <span>{Math.round(t.progress)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full rounded-full"
                          style={{ backgroundColor: t.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${t.progress}%` }}
                        />
                      </div>
                    </div>

                    <span className={`text-[8px] px-2 py-0.5 rounded-full uppercase font-bold ${
                       t.state === 'running' ? 'bg-purple-500/20 text-purple-400' : 
                       t.state === 'ready' ? 'bg-cyan-500/20 text-cyan-400' :
                       t.state === 'terminated' ? 'bg-slate-700 text-slate-400' : 'bg-slate-800 text-slate-500'
                     }`}>
                       {t.state}
                     </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Shared Memory Visualizer */}
            <div className="mt-auto w-full max-w-2xl bg-slate-900/50 rounded-2xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Shared Memory Heap</span>
                <span className="text-[10px] text-purple-500 font-mono">{Math.round(sharedMemory)} MB</span>
              </div>
              <div className="flex gap-1 h-3">
                {Array.from({length: 40}).map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-sm transition-all duration-500 ${
                      i < (sharedMemory / 20) ? 'bg-purple-500/40' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Stats & Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass p-6 rounded-3xl border-slate-800">
             <h3 className="text-sm font-semibold mb-6 flex items-center gap-2">
                <Activity size={18} className="text-purple-400" />
                Execution Metrics
             </h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase">Context Switches</span>
                    <span className="text-xl font-bold text-slate-200">{contextSwitches}</span>
                  </div>
                  <Zap size={24} className="text-amber-500/50" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase">Active Threads</span>
                    <span className="text-xl font-bold text-slate-200">{threads.filter(t => t.state === 'running').length}</span>
                  </div>
                  <GitBranch size={24} className="text-purple-500/50" />
                </div>
             </div>
          </div>

          <div className="glass p-6 rounded-3xl border-slate-800 bg-gradient-to-br from-purple-500/5 to-transparent">
             <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-cyan-400" />
                LWP vs User Threads
             </h3>
             <p className="text-xs text-slate-400 leading-relaxed">
               In the <strong>{threadModel}</strong> model, the kernel manages 
               {threadModel === 'OneToOne' ? ' a unique LWP for each user thread, providing maximum parallelism but higher overhead.' : 
                threadModel === 'ManyToOne' ? ' multiple user threads within a single process context. Efficient but blocks all threads if one makes a syscall.' :
                ' a pool of LWPs dynamically mapped to user threads, balancing efficiency and parallelism.'}
             </p>
             <div className="mt-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-around">
                <div className="flex flex-col items-center gap-2">
                   <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
                      U
                   </div>
                   <span className="text-[10px] text-slate-500">User</span>
                </div>
                <div className="h-[1px] w-8 bg-slate-800" />
                <div className="flex flex-col items-center gap-2">
                   <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                      K
                   </div>
                   <span className="text-[10px] text-slate-500">Kernel</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
