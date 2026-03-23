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
  const [isSimulating, setIsSimulating] = useState(false)
  const [logs, setLogs] = useState<TraceLog[]>([])
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAlloc, setNewAlloc] = useState([0, 0, 0])
  const [newMax, setNewMax] = useState([0, 0, 0])

  const updateNewAlloc = (idx: number, val: number) => {
     const next = [...newAlloc]; next[idx] = Math.max(0, val); setNewAlloc(next)
  }
  const updateNewMax = (idx: number, val: number) => {
     const next = [...newMax]; next[idx] = Math.max(0, val); setNewMax(next)
  }

  const handleAddProcess = () => {
     for (let i = 0; i < 3; i++) {
        if (newAlloc[i] > newMax[i]) {
            alert("Allocation cannot exceed Max claim for any resource.")
            return;
        }
        if (newAlloc[i] > resources[i].available) {
            alert(`Not enough ${resources[i].name} available!`)
            return;
        }
     }
     
     const updatedRes = [...resources]
     for (let i = 0; i < 3; i++) {
        updatedRes[i].available -= newAlloc[i]
     }

     const newId = processes.length + 1
     const p: DeadlockProcess = {
        id: newId,
        name: `P${newId}`,
        allocation: [...newAlloc],
        max: [...newMax],
        need: newMax.map((m, i) => m - newAlloc[i]),
        color: ['#00f3ff', '#9d00ff', '#ff004c', '#00ff8a', '#ff8a00'][newId % 5]
     }
     
     setResources(updatedRes)
     setProcesses([...processes, p])
     setShowAddForm(false)
     setNewAlloc([0,0,0])
     setNewMax([0,0,0])
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
    
    // Generate TraceLogs dynamically based on the checkSafeState result
    let dynamicLogs: TraceLog[] = []
    dynamicLogs.push({ id: Date.now().toString() + "-init", timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `verify_safety_state(processes, available);`, explanation: `Banker's Algorithm instantiated to strictly verify Mutual Exclusion constraints.` })
    
    const baseWaitMs = 600
    
    if (result.safe) {
       result.sequence.forEach((pid, i) => {
         const p = processes.find(px => px.id === pid)
         dynamicLogs.push({ id: Date.now().toString() + "-" + i, timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `if (Need[${p?.need.join(',')}] <= Available) { Execute(P${pid}); }`, explanation: `Process ${pid} resource requirement satisfied. Matrix allocated and safely returned to pool.` })
       })
       dynamicLogs.push({ id: Date.now().toString() + "-end", timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `return SAFE_SEQUENCE;`, explanation: `Hardware allocation graph mathematically proven secure.` })
    } else {
       result.sequence.forEach((pid, i) => {
         const p = processes.find(px => px.id === pid)
         dynamicLogs.push({ id: Date.now().toString() + "-seq-" + i, timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `if (Need[${p?.need.join(',')}] <= Available) { Execute(P${pid}); }`, explanation: `Process ${pid} requirement locally satisfied and temporarily advanced.` })
       })
       result.starved?.forEach((pid, i) => {
         const p = processes.find(px => px.id === pid)
         dynamicLogs.push({ id: Date.now().toString() + "-st-" + i, timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `if (Need[${p?.need.join(',')}] > Available) { Block(P${pid}); }`, explanation: `Process ${pid} physically cannot execute. Need completely surpasses Available system pool.` })
       })
       dynamicLogs.push({ id: Date.now().toString() + "-fail", timestamp: new Date().toISOString().split('T')[1].slice(0, 11), code: `return DEADLOCK_DETECTED; // Circular Wait Verified`, explanation: `Mathematical Circular Wait condition permanently proven. System halting.` })
    }
    
    setLogs([])
    dynamicLogs.forEach((log, index) => {
       setTimeout(() => {
          setLogs(prev => [...prev, log])
       }, index * baseWaitMs)
    })
    
    setSafeState(result)
    setIsSimulating(true)
  }

  const resetBanker = () => {
    setSafeState(null)
    setIsSimulating(false)
    setLogs([])
  }

  const loadSafeScenario = () => {
    resetBanker()
    const safeResources: Resource[] = [
      { id: '0', name: 'CPU', total: 10, available: 3, color: '#00f3ff' },
      { id: '1', name: 'Memory', total: 5, available: 3, color: '#9d00ff' },
      { id: '2', name: 'Disk', total: 7, available: 2, color: '#ff004c' },
    ]
    const safeProcesses: DeadlockProcess[] = [
      { id: 0, name: 'P0', color: '#00f3ff', allocation: [0, 1, 0], max: [7, 5, 3], need: [7, 4, 3] },
      { id: 1, name: 'P1', color: '#9d00ff', allocation: [2, 0, 0], max: [3, 2, 2], need: [1, 2, 2] },
      { id: 2, name: 'P2', color: '#ff004c', allocation: [3, 0, 2], max: [9, 0, 2], need: [6, 0, 0] },
      { id: 3, name: 'P3', color: '#00ff8a', allocation: [2, 1, 1], max: [2, 2, 2], need: [0, 1, 1] },
      { id: 4, name: 'P4', color: '#ff8a00', allocation: [0, 0, 2], max: [4, 3, 3], need: [4, 3, 1] }
    ]
    setResources(safeResources)
    setProcesses(safeProcesses)
  }

  const loadDeadlockScenario = () => {
    resetBanker()
    const deadlockResources: Resource[] = [
      { id: '0', name: 'CPU', total: 10, available: 0, color: '#00f3ff' },
      { id: '1', name: 'Memory', total: 5, available: 1, color: '#9d00ff' },
      { id: '2', name: 'Disk', total: 7, available: 1, color: '#ff004c' },
    ]
    const deadlockProcesses: DeadlockProcess[] = [
      { id: 0, name: 'P0', color: '#00f3ff', allocation: [4, 2, 3], max: [6, 4, 4], need: [2, 2, 1] },
      { id: 1, name: 'P1', color: '#ff004c', allocation: [4, 1, 1], max: [8, 2, 2], need: [4, 1, 1] },
      { id: 2, name: 'P2', color: '#ff8a00', allocation: [2, 1, 2], max: [3, 2, 3], need: [1, 1, 1] },
    ]
    setResources(deadlockResources)
    setProcesses(deadlockProcesses)
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
               <div className="flex items-center gap-4">
                 <button onClick={() => setShowAddForm(!showAddForm)} className="text-xs font-bold text-slate-400 bg-white/5 px-4 py-2 hover:bg-white/10 hover:text-white rounded-xl transition-all border border-white/5">
                   {showAddForm ? 'CANCEL' : '+ ADD CUSTOM PROCESS'}
                 </button>
                 <span className="mono text-[10px] text-slate-600 hidden md:inline">SNAPSHOT_ID: 0x88AF</span>
               </div>
            </div>

            <AnimatePresence>
              {showAddForm && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-8"
                >
                  <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-6 shadow-inner shadow-black/50">
                    <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                       <Database size={12} /> Inject New Process
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                         <span className="text-[10px] font-bold text-accent tracking-widest uppercase">Current Allocation Input</span>
                         <div className="flex items-center gap-4">
                           {['CPU','Memory','Disk'].map((label, i) => (
                             <div key={`alloc-${i}`} className="flex flex-col gap-1 items-center">
                               <span className="text-[8px] text-slate-500 uppercase font-bold">{label}</span>
                               <input type="number" min={0} value={newAlloc[i]} onChange={(e) => updateNewAlloc(i, parseInt(e.target.value) || 0)} className="w-12 h-10 bg-slate-900 border border-white/10 rounded-xl text-center text-xs font-mono text-slate-300 focus:outline-none focus:border-accent/40" />
                             </div>
                           ))}
                         </div>
                       </div>
                       <div className="space-y-4">
                         <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Maximum Need Claim</span>
                         <div className="flex items-center gap-4">
                           {['CPU','Memory','Disk'].map((label, i) => (
                             <div key={`max-${i}`} className="flex flex-col gap-1 items-center">
                               <span className="text-[8px] text-slate-500 uppercase font-bold">{label}</span>
                               <input type="number" min={0} value={newMax[i]} onChange={(e) => updateNewMax(i, parseInt(e.target.value) || 0)} className="w-12 h-10 bg-white/5 border border-white/10 rounded-xl text-center text-xs font-mono text-slate-300 focus:outline-none focus:border-white/30" />
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>

                    <div className="pt-2">
                      <button onClick={handleAddProcess} className="w-full py-3 rounded-xl bg-accent/20 text-accent text-xs font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-all shadow-[0_0_15px_rgba(255,0,76,0.1)] hover:shadow-[0_0_20px_rgba(255,0,76,0.4)]">
                        + Initialize Entity
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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

                  {!safeState.safe && safeState.starved && (
                    <div className="mt-8">
                      <div className="p-6 rounded-[2rem] bg-red-500/10 border border-red-500/20">
                        <h4 className="text-red-400 font-bold uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2">
                           <ShieldAlert size={14} /> Diagnostic: Circular Wait Identified
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {safeState.starved.map(pid => {
                             const p = processes.find(p => p.id === pid)
                             return p ? (
                               <div key={pid} className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 text-xs font-mono border border-red-500/30">
                                 <span className="font-bold text-white pr-2">{p.name} Blocked:</span> Needs [{p.need.join(', ')}]
                               </div>
                             ) : null
                          })}
                        </div>
                        <div className="mt-4 p-4 rounded-xl bg-black/40 border border-red-500/10">
                           <p className="text-[11px] text-red-300/80 font-medium leading-relaxed">
                             <span className="text-red-400 font-bold">MATHEMATICAL FAILURE:</span> The system physically only holds <span className="text-white font-mono bg-red-500/20 px-1 rounded">[{resources.map(r => r.available).join(', ')}]</span> in its Available pool. Because NO remaining process's Need array can be wholly satisfied by this Available pool, no execution step can be taken to release holding blocks. This mathematically guarantees an unresolvable Circular Wait.
                           </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Decorative Cyber Shapes */}
                <div className={`absolute -bottom-20 -right-20 w-80 h-80 blur-[120px] rounded-full -z-10 ${safeState.safe ? 'bg-cyan-500/10' : 'bg-red-500/10'}`} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live Tracer Component */}
          {isSimulating && <LiveCodeTracer logs={logs} />}
        </div>
      </div>
      
      <AlgorithmDeepDive algorithm="Banker" />
    </div>
  )
}
