import { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RefreshCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Database,
  ShieldAlert,
  ChevronRight,
  Zap,
  Lock,
  Box
} from 'lucide-react'
import { 
  DeadlockProcess, 
  Resource, 
  checkSafeState 
} from '../logic/deadlockSim'

export const DeadlockSimulator = () => {
  const [resources] = useState<Resource[]>([
    { id: '1', name: 'CPU', total: 10, available: 3, color: '#00f3ff' },
    { id: '2', name: 'Memory', total: 5, available: 3, color: '#9d00ff' },
    { id: '3', name: 'Disk', total: 7, available: 2, color: '#ff004c' },
  ])

  const [processes] = useState<DeadlockProcess[]>([
    { id: 1, name: 'P1', allocation: [0, 1, 0], max: [7, 5, 3], need: [7, 4, 3], color: '#00f3ff' },
    { id: 2, name: 'P2', allocation: [2, 0, 0], max: [3, 2, 2], need: [1, 2, 2], color: '#9d00ff' },
    { id: 3, name: 'P3', allocation: [3, 0, 2], max: [9, 0, 2], need: [6, 0, 0], color: '#ff004c' },
    { id: 4, name: 'P4', allocation: [2, 1, 1], max: [2, 2, 2], need: [0, 1, 1], color: '#00ff8a' },
    { id: 5, name: 'P5', allocation: [0, 0, 2], max: [4, 3, 3], need: [4, 3, 1], color: '#ff8a00' },
  ])

  const [safeState, setSafeState] = useState<{ safe: boolean, sequence: number[] } | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)

  const runBanker = () => {
    const available = resources.map(r => r.available)
    const result = checkSafeState(processes, available)
    setSafeState(result)
    setIsSimulating(true)
  }

  const resetBanker = () => {
    setSafeState(null)
    setIsSimulating(false)
  }

  return (
    <div className="p-12 space-y-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between glass p-10 rounded-[3rem] border-white/[0.05]">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent shadow-[0_0_30px_rgba(255,0,76,0.15)] outline outline-1 outline-accent/30">
            <Lock size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Deadlock Shield</h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
              <ShieldAlert size={12} className="text-accent" /> 
              Avoidance Protocol: Banker's v2.1
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={runBanker}
            disabled={isSimulating}
            className="btn-primary px-10 py-4 flex items-center gap-3 text-sm disabled:opacity-30 disabled:hover:scale-100"
          >
            <Play size={18} fill="currentColor" />
            ANALYZE STATE
          </button>
          <button onClick={resetBanker} className="p-4 rounded-2xl glass hover:bg-white/10 text-slate-400 border-white/10">
            <RefreshCcw size={22} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Inventory */}
        <div className="lg:col-span-3 space-y-8">
          <div className="glass-card flex flex-col gap-10">
             <div className="flex items-center gap-3 border-b border-white/5 pb-6">
                <Database size={20} className="text-primary" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">System Resources</h3>
             </div>
             
             <div className="space-y-10">
                {resources.map((r) => (
                   <div key={r.id} className="space-y-4">
                      <div className="flex justify-between items-end">
                         <div className="flex flex-col">
                            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1">{r.name} Pool</span>
                            <span className="text-white font-black text-xl italic">{r.available} <span className="text-slate-600 text-xs not-italic">/ {r.total}</span></span>
                         </div>
                         <Box size={24} style={{ color: r.color }} className="opacity-40" />
                      </div>
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5">
                         <motion.div 
                           className="h-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                           style={{ backgroundColor: r.color }}
                           initial={{ width: 0 }}
                           animate={{ width: `${(r.available / r.total) * 100}%` }}
                         />
                      </div>
                   </div>
                ))}
             </div>

             <div className="p-6 rounded-3xl bg-accent/5 border border-accent/10">
                 <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/20 text-accent">
                       <ShieldAlert size={20} />
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-wider">
                      Circular wait & hold/wait conditions are monitored in real-time.
                    </p>
                 </div>
              </div>
          </div>
        </div>

        {/* Right: Matrix View */}
        <div className="lg:col-span-9 space-y-10">
          <div className="glass-card">
            <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
               <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3">
                 <Zap size={18} className="text-secondary" />
                 Allocation Matrix
               </h3>
               <span className="mono text-[10px] text-slate-600">SNAPSHOT_ID: 0x88AF</span>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-separate border-spacing-y-4">
                <thead>
                  <tr className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mono">
                    <th className="pb-4 pl-6">Unit ID</th>
                    <th className="pb-4">Allocated</th>
                    <th className="pb-4">Max Claim</th>
                    <th className="pb-4">Active Need</th>
                    <th className="pb-4 pr-6">Validation</th>
                  </tr>
                </thead>
                <tbody>
                  {processes.map((p) => (
                    <tr key={p.id} className="bg-white/[0.02] rounded-3xl group hover:bg-white/[0.04] transition-all duration-300">
                      <td className="py-6 pl-6 rounded-l-[2rem] border-l border-y border-white/5">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm italic" style={{ backgroundColor: `${p.color}22`, color: p.color, border: `1px solid ${p.color}44` }}>
                             P{p.id}
                           </div>
                           <span className="text-xs font-bold text-slate-300 tracking-wider">PROCESS_{p.id}</span>
                        </div>
                      </td>
                      <td className="py-6 border-y border-white/5">
                         <div className="flex gap-2">
                            {p.allocation.map((val, i) => (
                              <span key={i} className="w-8 h-8 rounded-xl bg-slate-900 border border-white/5 text-[10px] flex items-center justify-center font-black text-slate-400 mono">{val}</span>
                            ))}
                         </div>
                      </td>
                      <td className="py-6 border-y border-white/5">
                         <div className="flex gap-2">
                            {p.max.map((val, i) => (
                              <span key={i} className="w-8 h-8 rounded-xl bg-white/[0.01] border border-white/5 text-[10px] flex items-center justify-center font-bold text-slate-600 font-mono">{val}</span>
                            ))}
                         </div>
                      </td>
                      <td className="py-6 border-y border-white/5">
                         <div className="flex gap-2">
                            {p.need.map((val, i) => (
                              <span key={i} className="w-8 h-8 rounded-xl bg-primary/5 text-primary border border-primary/20 text-[10px] flex items-center justify-center font-black shadow-inner shadow-primary/10 mono">{val}</span>
                            ))}
                         </div>
                      </td>
                      <td className="py-6 rounded-r-[2rem] border-r border-y border-white/5 pr-6">
                         <AnimatePresence>
                           {safeState?.sequence.includes(p.id) ? (
                             <motion.div 
                               initial={{ scale: 0.8, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               className="flex items-center gap-2 text-[8px] font-black text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-full border border-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.1)] uppercase italic tracking-widest"
                             >
                               <CheckCircle2 size={12} strokeWidth={3} />
                               SECURED
                             </motion.div>
                           ) : (
                             <div className="flex items-center gap-2 text-[8px] font-black text-slate-600 px-3 py-1.5 rounded-full border border-white/5 uppercase italic tracking-widest">
                               WAITING_SEQ
                             </div>
                           )}
                         </AnimatePresence>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Safe Sequence Analysis Result */}
          <AnimatePresence>
            {safeState && (
              <motion.div 
                initial={{ y: 50, opacity: 0, filter: 'blur(20px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                className={`p-12 rounded-[3.5rem] border-2 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative shadow-2xl ${
                  safeState.safe ? 'bg-cyan-500/[0.02] border-cyan-500/20 shadow-cyan-500/10' : 'bg-red-500/[0.02] border-red-500/20 shadow-red-500/10'
                }`}
              >
                <div className={`p-8 rounded-[2.5rem] shadow-inner ${safeState.safe ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20' : 'bg-red-500/10 text-red-400 border border-red-400/20'}`}>
                  {safeState.safe ? <CheckCircle2 size={48} strokeWidth={3} /> : <AlertTriangle size={48} strokeWidth={3} />}
                </div>
                
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <h2 className={`text-4xl font-black uppercase italic tracking-tight ${safeState.safe ? 'text-cyan-400' : 'text-red-400'}`}>
                    {safeState.safe ? 'Safe State Detected' : 'Deadlock Detected'}
                  </h2>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
                    {safeState.safe 
                      ? 'No circular wait conditions found. The OS can fulfill all process requests in the following secure order:' 
                      : 'The current allocation results in an unsafe state. Mutual exclusion and hold conditions cannot be broken.'}
                  </p>
                  
                  {safeState.safe && (
                    <div className="flex items-center gap-6 justify-center md:justify-start flex-wrap mt-8 bg-black/40 p-6 rounded-[2rem] border border-white/5">
                      {safeState.sequence.map((pid, idx) => (
                        <Fragment key={pid}>
                          <div className="group relative">
                            <div className="w-14 h-14 rounded-2xl bg-cyan-500 text-black flex items-center justify-center font-black text-xl italic shadow-[0_0_20px_rgba(0,243,255,0.4)] group-hover:scale-110 transition-transform">
                              P{pid}
                            </div>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-cyan-400/50 uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Node_{pid}</div>
                          </div>
                          {idx < safeState.sequence.length - 1 && <ChevronRight size={20} className="text-slate-700 animate-pulse" />}
                        </Fragment>
                      ))}
                    </div>
                  )}
                </div>

                {/* Decorative Cyber Shapes */}
                <div className={`absolute -bottom-20 -right-20 w-80 h-80 blur-[120px] rounded-full -z-10 ${safeState.safe ? 'bg-cyan-500/10' : 'bg-red-500/10'}`} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
