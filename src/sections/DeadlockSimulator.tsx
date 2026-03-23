import { useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RefreshCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Database,
  ArrowRight,
  ShieldAlert
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
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">Deadlock Simulator</h1>
          <p className="text-slate-400 mt-1">Visualize Resource Allocation Graphs and Banker's Algorithm.</p>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={runBanker}
            disabled={isSimulating}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] disabled:opacity-50"
          >
            <Play size={18} fill="currentColor" />
            Check Safe State
          </button>
          <button 
            onClick={resetBanker}
            className="p-3 rounded-2xl glass hover:bg-white/5 text-slate-400 border-slate-800"
          >
            <RefreshCcw size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Resource View */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-6 rounded-3xl border-slate-800">
             <h3 className="text-sm font-semibold mb-6 flex items-center gap-2">
                <Database size={18} className="text-primary" />
                Available Resources
             </h3>
             <div className="space-y-6">
                {resources.map((r) => (
                   <div key={r.id} className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                         <span className="text-slate-400">{r.name}</span>
                         <span className="text-primary font-bold">{r.available} / {r.total}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                         <motion.div 
                           className="h-full rounded-full"
                           style={{ backgroundColor: r.color }}
                           initial={{ width: 0 }}
                           animate={{ width: `${(r.available / r.total) * 100}%` }}
                         />
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div className="glass p-6 rounded-3xl border-slate-800 bg-red-500/5">
             <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-red-400">
                <ShieldAlert size={18} />
                Deadlock Warning
             </h3>
             <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest">
                Deadlock occurs when processes hold resources and wait for others in a circular chain.
             </p>
          </div>
        </div>

        {/* Matrix / Graph View */}
        <div className="lg:col-span-9 space-y-8">
          <div className="glass p-8 rounded-[2rem] border-slate-800 overflow-x-auto">
            <h3 className="text-sm font-extrabold mb-8 text-slate-500 uppercase tracking-[0.2em]">Banker's Allocation Matrix</h3>
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-xs text-slate-600 uppercase font-mono">
                  <th className="pb-4 pl-4">Process</th>
                  <th className="pb-4">Allocation</th>
                  <th className="pb-4">Maximum</th>
                  <th className="pb-4">Need</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((p) => (
                  <tr key={p.id} className="bg-slate-900/40 rounded-2xl group hover:bg-slate-900/60 transition-colors">
                    <td className="py-4 pl-4 rounded-l-2xl border-l border-y border-slate-800/50">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs" style={{ backgroundColor: `${p.color}22`, color: p.color, border: `1px solid ${p.color}44` }}>
                           P{p.id}
                         </div>
                      </div>
                    </td>
                    <td className="py-4 border-y border-slate-800/50">
                       <div className="flex gap-2">
                          {p.allocation.map((val, i) => (
                            <span key={i} className="w-6 h-6 rounded bg-slate-800 text-[10px] flex items-center justify-center font-mono text-slate-400">{val}</span>
                          ))}
                       </div>
                    </td>
                    <td className="py-4 border-y border-slate-800/50 text-slate-500 font-mono text-xs">
                       <div className="flex gap-2">
                          {p.max.map((val, i) => (
                            <span key={i} className="w-6 h-6 rounded bg-slate-800/30 text-[10px] flex items-center justify-center">{val}</span>
                          ))}
                       </div>
                    </td>
                    <td className="py-4 border-y border-slate-800/50">
                       <div className="flex gap-2">
                          {p.need.map((val, i) => (
                            <span key={i} className="w-6 h-6 rounded bg-primary/5 text-primary border border-primary/10 text-[10px] flex items-center justify-center font-bold">{val}</span>
                          ))}
                       </div>
                    </td>
                    <td className="py-4 rounded-r-2xl border-r border-y border-slate-800/50 px-4">
                       <AnimatePresence>
                         {safeState?.sequence.includes(p.id) && (
                           <motion.div 
                             initial={{ scale: 0, opacity: 0 }}
                             animate={{ scale: 1, opacity: 1 }}
                             className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full uppercase"
                           >
                             <CheckCircle2 size={12} />
                             ALLOCATED
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Safe Sequence Result */}
          <AnimatePresence>
            {safeState && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`p-10 rounded-[2.5rem] border flex items-center gap-10 overflow-hidden relative ${
                  safeState.safe ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-red-500/10 border-red-500/20'
                }`}
              >
                <div className={`p-6 rounded-3xl ${safeState.safe ? 'bg-cyan-500/20 text-cyan-400' : 'bg-red-500/20 text-red-400'}`}>
                  {safeState.safe ? <CheckCircle2 size={40} /> : <AlertTriangle size={40} />}
                </div>
                
                <div className="flex-1 space-y-4">
                  <h2 className={`text-2xl font-bold uppercase tracking-widest ${safeState.safe ? 'text-cyan-400' : 'text-red-400'}`}>
                    {safeState.safe ? 'Safe State Detected' : 'Unsafe State - Deadlock Detected'}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {safeState.safe 
                      ? 'The system can allocate resources to all processes without entering a deadlock. Following sequence ensures safety:' 
                      : 'No safe sequence exists. The system is in a deadlock state or approaching one.'}
                  </p>
                  
                  {safeState.safe && (
                    <div className="flex items-center gap-4 flex-wrap">
                      {safeState.sequence.map((pid, idx) => (
                        <Fragment key={pid}>
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-black flex items-center justify-center font-bold text-lg shadow-lg">
                              P{pid}
                            </div>
                          </div>
                          {idx < safeState.sequence.length - 1 && <ArrowRight size={20} className="text-slate-600" />}
                        </Fragment>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cyber Accents */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
