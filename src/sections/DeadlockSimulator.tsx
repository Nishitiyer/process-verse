import { useState, Fragment, useEffect } from 'react'
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
import { AlgorithmDeepDive } from '../components/AlgorithmDeepDive'
import { LiveCodeTracer, TraceLog } from '../components/LiveCodeTracer'

export const DeadlockSimulator = () => {
  const [resources, setResources] = useState<Resource[]>([
    { id: '1', name: 'CPU', total: 10, available: 3, color: '#00f3ff' },
    { id: '2', name: 'Memory', total: 5, available: 3, color: '#9d00ff' },
    { id: '3', name: 'Disk', total: 7, available: 2, color: '#ff004c' },
  ])

  const [processes, setProcesses] = useState<DeadlockProcess[]>([
    { id: 1, name: 'P1', allocation: [0, 1, 0], max: [7, 5, 3], need: [7, 4, 3], color: '#00f3ff' },
    { id: 2, name: 'P2', allocation: [2, 0, 0], max: [3, 2, 2], need: [1, 2, 2], color: '#9d00ff' },
    { id: 3, name: 'P3', allocation: [3, 0, 2], max: [9, 0, 2], need: [6, 0, 0], color: '#ff004c' },
    { id: 4, name: 'P4', allocation: [2, 1, 1], max: [2, 2, 2], need: [0, 1, 1], color: '#00ff8a' },
    { id: 5, name: 'P5', allocation: [0, 0, 2], max: [4, 3, 3], need: [4, 3, 1], color: '#ff8a00' },
  ])

  const [safeState, setSafeState] = useState<{ safe: boolean, sequence: number[], starved?: number[] } | null>(null)
  const [displaySimulation, setDisplaySimulation] = useState(false)
  const [logs, setLogs] = useState<TraceLog[]>([])
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAlloc, setNewAlloc] = useState([0, 0, 0])
  const [newMax, setNewMax] = useState([0, 0, 0])

  // Recalculate Available resources based on current totals and allocations
  const refreshAvailable = (currentResources: Resource[], currentProcesses: DeadlockProcess[]) => {
    return currentResources.map((res, i) => {
      const allocatedTotal = currentProcesses.reduce((sum, p) => sum + p.allocation[i], 0)
      return { ...res, available: Math.max(0, res.total - allocatedTotal) }
    })
  }

  const updateResourceTotal = (idx: number, newVal: number) => {
    setResources(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], total: Math.max(0, newVal) }
      return refreshAvailable(next, processes)
    })
    resetBanker()
  }

  const updateProcessValue = (pid: number, type: 'allocation' | 'max', resIdx: number, newVal: number) => {
    setProcesses(prev => {
      const next = prev.map(p => {
        if (p.id === pid) {
          const updated = { ...p }
          updated[type] = [...updated[type]]
          updated[type][resIdx] = Math.max(0, newVal)
          
          updated.need = updated.max.map((m, i) => Math.max(0, m - updated.allocation[i]))
          return updated
        }
        return p
      })
      
      if (type === 'allocation') {
        setResources(res => refreshAvailable(res, next))
      }
      
      return next
    })
    resetBanker()
  }

  const updateNewAlloc = (idx: number, val: number) => {
     const next = [...newAlloc]; next[idx] = Math.max(0, val); setNewAlloc(next)
  }
  const updateNewMax = (idx: number, val: number) => {
     const next = [...newMax]; next[idx] = Math.max(0, val); setNewMax(next)
  }

  const handleAddProcess = () => {
     const newId = processes.length + 1
     const p: DeadlockProcess = {
        id: newId,
        name: `P${newId}`,
        allocation: [...newAlloc],
        max: [...newMax],
        need: newMax.map((m, i) => Math.max(0, m - newAlloc[i])),
        color: ['#00f3ff', '#9d00ff', '#ff004c', '#00ff8a', '#ff8a00'][newId % 5]
     }
     
     const nextProcesses = [...processes, p]
     setProcesses(nextProcesses)
     setResources(res => refreshAvailable(res, nextProcesses))
     
     setShowAddForm(false)
     setNewAlloc([0,0,0])
     setNewMax([0,0,0])
     resetBanker()
  }

  useEffect(() => {
    const handlePlay = () => runBanker()
    const handleReset = () => resetBanker()
    window.addEventListener('GLOBAL_PLAY_TOGGLE', handlePlay)
    window.addEventListener('GLOBAL_RESET', handleReset)
    return () => {
      window.removeEventListener('GLOBAL_PLAY_TOGGLE', handlePlay)
      window.removeEventListener('GLOBAL_RESET', handleReset)
    }
  }, [processes, resources])
  
  const runBanker = () => {
    const available = resources.map(r => r.available)
    const result = checkSafeState(processes, available)
    
    let dynamicLogs: TraceLog[] = []
    dynamicLogs.push({ id: Date.now().toString() + "-init", timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `verify_safety_state(processes, available);`, explanation: `Banker's Algorithm instantiated to verify system safety.` })
    
    if (result.safe) {
       result.sequence.forEach((pid) => {
         dynamicLogs.push({ id: Date.now().toString() + "-" + pid, timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `if (Need[P${pid}] <= Available) { Execute(P${pid}); }`, explanation: `Process ${pid} requirement satisfied. Matrix returned to pool.` })
       })
    } else {
       dynamicLogs.push({ id: Date.now().toString() + "-fail", timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `return DEADLOCK_DETECTED;`, explanation: `No secure sequence found. Potential deadlock.` })
    }
    
    setLogs(dynamicLogs)
    setSafeState(result)
    setDisplaySimulation(true)
  }

  const resetBanker = () => {
    setSafeState(null)
    setDisplaySimulation(false)
    setLogs([])
  }

  const loadSafeScenario = () => {
    const safeProcesses: DeadlockProcess[] = [
      { id: 1, name: 'P1', color: '#00f3ff', allocation: [0, 1, 0], max: [7, 5, 3], need: [7, 4, 3] },
      { id: 2, name: 'P2', color: '#9d00ff', allocation: [2, 0, 0], max: [3, 2, 2], need: [1, 2, 2] },
      { id: 3, name: 'P3', color: '#ff004c', allocation: [3, 0, 2], max: [9, 0, 2], need: [6, 0, 0] },
      { id: 4, name: 'P4', color: '#00ff8a', allocation: [2, 1, 1], max: [2, 2, 2], need: [0, 1, 1] },
      { id: 5, name: 'P5', color: '#ff8a00', allocation: [0, 0, 2], max: [4, 3, 3], need: [4, 3, 1] }
    ]
    const baseRes = [
      { id: '1', name: 'CPU', total: 10, available: 3, color: '#00f3ff' },
      { id: '2', name: 'Memory', total: 5, available: 3, color: '#9d00ff' },
      { id: '3', name: 'Disk', total: 7, available: 2, color: '#ff004c' },
    ]
    setProcesses(safeProcesses)
    setResources(refreshAvailable(baseRes, safeProcesses))
    resetBanker()
  }

  const loadDeadlockScenario = () => {
    const deadlockProcesses: DeadlockProcess[] = [
      { id: 1, name: 'P1', color: '#00f3ff', allocation: [4, 2, 3], max: [6, 4, 4], need: [2, 2, 1] },
      { id: 2, name: 'P2', color: '#ff004c', allocation: [4, 1, 1], max: [8, 2, 2], need: [4, 1, 1] },
      { id: 3, name: 'P3', color: '#ff8a00', allocation: [2, 1, 2], max: [3, 2, 3], need: [1, 1, 1] },
    ]
    const baseRes = [
      { id: '1', name: 'CPU', total: 10, available: 0, color: '#00f3ff' },
      { id: '2', name: 'Memory', total: 5, available: 1, color: '#9d00ff' },
      { id: '3', name: 'Disk', total: 7, available: 1, color: '#ff004c' },
    ]
    setProcesses(deadlockProcesses)
    setResources(refreshAvailable(baseRes, deadlockProcesses))
    resetBanker()
  }

  return (
    <div className="p-4 md:p-12 space-y-8 md:space-y-12 max-w-7xl mx-auto custom-scrollbar">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between glass p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-white/[0.05] gap-6 md:gap-0">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent shadow-[0_0_30px_rgba(255,0,76,0.15)] outline outline-1 outline-accent/30">
            <Lock size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Deadlock Shield</h1>
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                 <ShieldAlert size={12} className="text-accent" /> 
                 Banker's Protocol: Armed
               </span>
               <div className="h-1 w-1 rounded-full bg-slate-700" />
               <div className="flex gap-2">
                 <button onClick={loadSafeScenario} className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 active:scale-95 transition-all outline outline-1 outline-cyan-500/30">Safe Set</button>
                 <button onClick={loadDeadlockScenario} className="text-[10px] font-bold text-red-500 uppercase tracking-widest px-3 py-1 bg-red-500/10 rounded-lg hover:bg-red-500/20 active:scale-95 transition-all outline outline-1 outline-red-500/30">Deadlock Set</button>
               </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={runBanker}
            disabled={displaySimulation}
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
                {resources.map((r, idx) => (
                   <div key={r.id} className="space-y-4">
                      <div className="flex justify-between items-end">
                         <div className="flex flex-col gap-2">
                            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">{r.name} Pool</span>
                            <div className="flex items-center gap-2">
                               <span className="text-white font-black text-xl italic">{r.available}</span>
                               <span className="text-slate-600 font-mono text-xs">/</span>
                               <input 
                                 type="number" 
                                 value={r.total} 
                                 onChange={(e) => updateResourceTotal(idx, parseInt(e.target.value) || 0)}
                                 className="w-12 bg-white/5 border border-white/10 rounded px-1 text-xs font-black text-primary text-center focus:outline-none focus:border-primary/50 placeholder:text-slate-700"
                               />
                            </div>
                         </div>
                         <Box size={24} style={{ color: r.color }} className="opacity-40" />
                      </div>
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                         <motion.div 
                           className="h-full rounded-full"
                           style={{ backgroundColor: r.color, boxShadow: `0 0 10px ${r.color}44` }}
                           animate={{ width: `${Math.min(100, (r.available / r.total) * 100)}%` }}
                         />
                      </div>
                   </div>
                ))}
             </div>

             <div className="p-6 rounded-3xl bg-accent/5 border border-accent/10">
                 <p className="text-[9px] text-slate-500 leading-relaxed font-bold uppercase tracking-widest flex items-start gap-3">
                    <ShieldAlert size={14} className="text-accent flex-shrink-0" />
                    Modify totals to test resource depletion scenarios.
                 </p>
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
               <button onClick={() => setShowAddForm(!showAddForm)} className="text-xs font-black text-slate-400 bg-white/5 px-6 py-3 hover:bg-white/10 hover:text-white rounded-2xl transition-all border border-white/5 tracking-widest uppercase">
                 {showAddForm ? 'DISCARD' : '+ ADD PROCESS'}
               </button>
            </div>

            <AnimatePresence>
              {showAddForm && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-8"
                >
                  <div className="p-8 rounded-[2.5rem] bg-black/40 border border-white/10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-4">
                         <span className="text-[10px] font-black text-accent tracking-widest uppercase">Allocated Units</span>
                         <div className="flex items-center gap-4">
                           {['CPU','MEM','DSK'].map((label, i) => (
                             <div key={label} className="flex flex-col gap-2 items-center">
                               <span className="text-[8px] text-slate-500 uppercase font-black">{label}</span>
                               <input type="number" min={0} value={newAlloc[i]} onChange={(e) => updateNewAlloc(i, parseInt(e.target.value) || 0)} className="w-14 h-12 bg-slate-900 border border-white/10 rounded-2xl text-center text-xs font-black text-slate-300 focus:border-accent/50 outline-none" />
                             </div>
                           ))}
                         </div>
                       </div>
                       <div className="space-y-4">
                         <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Max Claim</span>
                         <div className="flex items-center gap-4">
                           {['CPU','MEM','DSK'].map((label, i) => (
                             <div key={label} className="flex flex-col gap-2 items-center">
                               <span className="text-[8px] text-slate-500 uppercase font-black">{label}</span>
                               <input type="number" min={0} value={newMax[i]} onChange={(e) => updateNewMax(i, parseInt(e.target.value) || 0)} className="w-14 h-12 bg-white/5 border border-white/10 rounded-2xl text-center text-xs font-black text-slate-300 focus:border-white/30 outline-none" />
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>
                    <button onClick={handleAddProcess} className="w-full py-4 rounded-2xl bg-accent text-black text-xs font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,0,76,0.4)] transition-all">
                      Deploy Process Entity
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-separate border-spacing-y-4">
                <thead>
                  <tr className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mono">
                    <th className="pb-4 pl-6">Identifier</th>
                    <th className="pb-4">Allocated (Editable)</th>
                    <th className="pb-4">Max Claim (Editable)</th>
                    <th className="pb-4">Need (Auto)</th>
                    <th className="pb-4 pr-6">Validation</th>
                  </tr>
                </thead>
                <tbody>
                  {processes.map((p) => (
                    <tr key={p.id} className="bg-white/[0.02] rounded-3xl group hover:bg-white/[0.04] transition-all">
                      <td className="py-6 pl-6 rounded-l-[2.5rem] border-l border-y border-white/5">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm italic" style={{ backgroundColor: `${p.color}22`, color: p.color, border: `1px solid ${p.color}40` }}>
                             P{p.id}
                           </div>
                           <span className="text-xs font-black text-slate-400 tracking-tighter uppercase whitespace-nowrap">Entity_{p.id}</span>
                        </div>
                      </td>
                      <td className="py-6 border-y border-white/5">
                         <div className="flex gap-2">
                            {p.allocation.map((val, i) => (
                              <input 
                                key={`alloc-${p.id}-${i}`}
                                type="number"
                                value={val}
                                onChange={(e) => updateProcessValue(p.id, 'allocation', i, parseInt(e.target.value) || 0)}
                                className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 text-[10px] text-center font-black text-cyan-400 focus:border-cyan-400/50 outline-none"
                              />
                            ))}
                         </div>
                      </td>
                      <td className="py-6 border-y border-white/5">
                         <div className="flex gap-2">
                            {p.max.map((val, i) => (
                              <input 
                                key={`max-${p.id}-${i}`}
                                type="number"
                                value={val}
                                onChange={(e) => updateProcessValue(p.id, 'max', i, parseInt(e.target.value) || 0)}
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-[10px] text-center font-black text-slate-400 focus:border-white/30 outline-none"
                              />
                            ))}
                         </div>
                      </td>
                      <td className="py-6 border-y border-white/5">
                         <div className="flex gap-2">
                            {p.need.map((val, i) => (
                              <span key={`need-${p.id}-${i}`} className="w-10 h-10 rounded-xl bg-accent/5 text-accent border border-accent/20 text-[10px] flex items-center justify-center font-black shadow-inner mono">{val}</span>
                            ))}
                         </div>
                      </td>
                      <td className="py-6 rounded-r-[2.5rem] border-r border-y border-white/5 pr-6">
                         <AnimatePresence mode="wait">
                           {safeState?.sequence.includes(p.id) ? (
                             <motion.div 
                               initial={{ scale: 0.8, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               className="flex items-center gap-2 text-[8px] font-black text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-xl border border-cyan-400/20 shadow-[0_0_20px_rgba(0,243,255,0.1)] uppercase italic tracking-widest"
                             >
                               <CheckCircle2 size={12} strokeWidth={3} />
                               SECURED
                             </motion.div>
                           ) : (
                             <div className="flex items-center gap-2 text-[8px] font-black text-slate-600 px-4 py-2 rounded-xl border border-white/5 uppercase italic tracking-widest">
                               WAITING
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

          <AnimatePresence>
            {safeState && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border-2 flex flex-col md:flex-row items-center gap-6 md:gap-12 relative shadow-2xl ${
                  safeState.safe ? 'bg-cyan-500/[0.02] border-cyan-500/20 shadow-cyan-500/10' : 'bg-red-500/[0.02] border-red-500/20 shadow-red-500/10'
                }`}
              >
                <div className={`p-8 rounded-[3rem] ${safeState.safe ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20' : 'bg-red-500/10 text-red-400 border border-red-400/20'}`}>
                  {safeState.safe ? <CheckCircle2 size={48} strokeWidth={3} /> : <AlertTriangle size={48} strokeWidth={3} />}
                </div>
                
                <div className="flex-1 space-y-6">
                  <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${safeState.safe ? 'text-cyan-400' : 'text-red-400'}`}>
                    {safeState.safe ? 'Safe Sequence Guaranteed' : 'Deadlock State Verified'}
                  </h2>
                  <p className="text-slate-500 text-lg font-bold leading-tight uppercase tracking-widest opacity-80">
                    {safeState.safe 
                      ? 'The system can fulfill all process requests in the following secure order:' 
                      : 'Circular wait confirmed. No secure sequence exists for the current parameters.'}
                  </p>
                  
                  {safeState.safe && (
                    <div className="flex items-center gap-4 md:gap-6 flex-wrap mt-8 bg-black/40 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/5 justify-center md:justify-start">
                      {safeState.sequence.map((pid, idx) => (
                        <Fragment key={pid}>
                          <div className="w-16 h-16 rounded-[1.5rem] bg-cyan-500 text-black flex items-center justify-center font-black text-2xl italic shadow-[0_0_30px_rgba(0,243,255,0.5)]">
                            P{pid}
                          </div>
                          {idx < safeState.sequence.length - 1 && <ChevronRight size={24} className="text-slate-800" />}
                        </Fragment>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {displaySimulation && <LiveCodeTracer logs={logs} />}
        </div>
      </div>
      
      <AlgorithmDeepDive algorithm="Banker" />
    </div>
  )
}
