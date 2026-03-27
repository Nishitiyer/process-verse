import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Cpu, 
  Activity,
  Layers,
  Zap,
  TrendingUp
} from 'lucide-react'
import { getNextProcess, Process } from '../logic/processSim'
import { AlgorithmDeepDive } from '../components/AlgorithmDeepDive'
import { LiveCodeTracer, TraceLog } from '../components/LiveCodeTracer'

export const ProcessManagement = () => {
  // Unified Simulation State
  const [simState, setSimState] = useState({
    processes: [] as Process[],
    runningProcess: null as Process | null,
    readyQueue: [] as Process[],
    currentTime: 0,
    ganttData: [] as {pid: number, start: number, end: number, color: string}[],
  })

  // Destructure for easier use in JSX
  const { processes, runningProcess, readyQueue, currentTime, ganttData } = simState

  const [algorithm, setAlgorithm] = useState<'FCFS'|'SJF'|'Priority'|'RR'>('FCFS')
  const [quantum, setQuantum] = useState(2)
  const [timeStep] = useState(500) // ms per tick

  const [isRunning, setIsRunning] = useState(false)
  const [logs, setLogs] = useState<TraceLog[]>([])
  const timerRef = useRef<any>(null)
  const quantumRef = useRef(0)

  // Stable Timer Effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        tick()
      }, timeStep)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning, timeStep, algorithm, quantum]) // Only recreate on config changes

  const tick = () => {
    setSimState(prev => {
      const nextTime = prev.currentTime + 1
      const nextProcesses = prev.processes.map(p => ({ ...p }))
      let nextReadyQueue = [...prev.readyQueue]
      let nextRunning = prev.runningProcess ? { ...prev.runningProcess } : null
      let nextGanttData = [...prev.ganttData]
      let nextLogs: TraceLog[] = []

      // 1. Handle Arrivals
      nextProcesses.forEach(p => {
        if (p.arrivalTime === prev.currentTime && p.state === 'new') {
          p.state = 'ready'
          nextReadyQueue.push({ ...p })
          nextLogs.push({ 
            id: `arr-${p.id}-${prev.currentTime}`, 
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11), 
            code: `enqueue(ready_queue, P${p.id});`, 
            explanation: `Process ${p.name} arrived at Time ${prev.currentTime}.` 
          })
        }
      })

      // 2. Execution Logic
      if (!nextRunning && nextReadyQueue.length > 0) {
        // Scheduler Pick
        const picked = getNextProcess(nextReadyQueue, algorithm)
        if (picked) {
          nextRunning = { ...picked, state: 'running' }
          nextReadyQueue = nextReadyQueue.filter(p => p.id !== picked.id)
          quantumRef.current = 0
          nextLogs.push({ 
            id: `sched-${picked.id}-${prev.currentTime}`, 
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11), 
            code: `dispatch(P${picked.id}, ${algorithm});`, 
            explanation: `Scheduler selected Process ${picked.id}.` 
          })
          nextGanttData.push({ pid: picked.id, start: prev.currentTime, end: nextTime, color: picked.color })
        }
      } else if (nextRunning) {
        // Continue Execution
        nextRunning.remainingTime -= 1
        if (nextGanttData.length > 0) nextGanttData[nextGanttData.length - 1].end = nextTime
        quantumRef.current += 1

        // Check Termination
        if (nextRunning.remainingTime <= 0) {
          nextRunning.state = 'terminated'
          nextRunning.finishTime = nextTime
          nextRunning.turnaroundTime = nextRunning.finishTime - nextRunning.arrivalTime
          nextRunning.waitingTime = nextRunning.turnaroundTime - nextRunning.burstTime
          
          // Update in main list
          const idx = nextProcesses.findIndex(px => px.id === nextRunning!.id)
          if (idx !== -1) nextProcesses[idx] = { ...nextRunning }
          
          nextLogs.push({ 
            id: `term-${nextRunning.id}-${prev.currentTime}`, 
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11), 
            code: `exit(P${nextRunning.id});`, 
            explanation: `Process ${nextRunning.id} completed at Time ${nextTime}.` 
          })
          nextRunning = null
          quantumRef.current = 0
        } 
        // Check Preemption (RR)
        else if (algorithm === 'RR' && quantumRef.current >= quantum) {
          nextRunning.state = 'ready'
          nextReadyQueue.push({ ...nextRunning })
          
          const idx = nextProcesses.findIndex(px => px.id === nextRunning!.id)
          if (idx !== -1) nextProcesses[idx] = { ...nextRunning }

          nextLogs.push({ 
            id: `preempt-${nextRunning.id}-${prev.currentTime}`, 
            timestamp: new Date().toISOString().split('T')[1].slice(0, 11), 
            code: `preempt(P${nextRunning.id});`, 
            explanation: `Time Quantum expired for P${nextRunning.id}.` 
          })
          nextRunning = null
          quantumRef.current = 0
        }
      }

      // Sync logs separately or return them?
      // Since logs are separate state, we can use a side effect or functional update
      if (nextLogs.length > 0) {
        setLogs(prevLogs => [...prevLogs.slice(-(20 - nextLogs.length)), ...nextLogs])
      }

      return {
        processes: nextProcesses,
        runningProcess: nextRunning,
        readyQueue: nextReadyQueue,
        currentTime: nextTime,
        ganttData: nextGanttData,
      }
    })
  }

  // Form State
  const [showAddForm, setShowAddForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newBurst, setNewBurst] = useState(4)
  const [newPriority, setNewPriority] = useState(1)
  const [newArrivalTime, setNewArrivalTime] = useState(0)

  const resetSim = () => {
    setIsRunning(false)
    quantumRef.current = 0
    setSimState({
      processes: [],
      runningProcess: null,
      readyQueue: [],
      currentTime: 0,
      ganttData: [],
    })
    setLogs([])
  }

  useEffect(() => {
    const handlePlay = () => setIsRunning(r => !r)
    const handleReset = () => resetSim()
    window.addEventListener('GLOBAL_PLAY_TOGGLE', handlePlay)
    window.addEventListener('GLOBAL_RESET', handleReset)
    return () => {
      window.removeEventListener('GLOBAL_PLAY_TOGGLE', handlePlay)
      window.removeEventListener('GLOBAL_RESET', handleReset)
    }
  }, [])

  const submitNewProcess = () => {
    const newId = processes.length + 1
    const p: Process = {
      id: newId,
      name: newName || `Task-${newId}`,
      arrivalTime: Number(newArrivalTime),
      burstTime: Number(newBurst),
      remainingTime: Number(newBurst),
      priority: Number(newPriority),
      state: 'new',
      color: ['#00f3ff', '#9d00ff', '#ff004c', '#00ff8a', '#ff8a00'][newId % 5],
      waitingTime: 0, turnaroundTime: 0
    }
    setSimState(prev => ({ ...prev, processes: [...prev.processes, p] }))
    setShowAddForm(false)
    
    // Reset form
    setNewName('')
    setNewBurst(4)
    setNewPriority(1)
    setNewArrivalTime(currentTime)
  }

  const cycleAlgorithm = () => {
    const algos: ('FCFS'|'SJF'|'Priority'|'RR')[] = ['FCFS', 'SJF', 'Priority', 'RR']
    const nextIdx = (algos.indexOf(algorithm) + 1) % algos.length
    setAlgorithm(algos[nextIdx])
    resetSim()
  }

  return (
    <div className="p-12 space-y-12 max-w-7xl mx-auto custom-scrollbar">
      {/* Simulation Header */}
      <div className="flex items-center justify-between glass p-8 rounded-[2.5rem] border-white/[0.05]">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary group-hover:rotate-12 transition-all">
            <Cpu size={32} />
          </div>
          <div>
             <h1 className="text-3xl font-black italic uppercase italic tracking-tighter leading-none mb-1">Process Lab</h1>
             <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
               <Activity size={12} className="text-green-500" /> 
               Virtual CPU Isolation Active
             </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-3 bg-black/40 px-6 py-3 rounded-2xl border border-white/10 font-mono">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Tick</span>
              <span className="text-primary text-xl font-black">{currentTime}</span>
           </div>
           
           <div className="flex items-center gap-2 bg-white/[0.03] p-2 rounded-2xl border border-white/[0.05]">
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className={`p-4 rounded-xl transition-all duration-300 ${isRunning ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'bg-primary text-black font-black'}`}
              >
                {isRunning ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
              </button>
              <button onClick={resetSim} className="p-4 rounded-xl glass hover:bg-white/5 text-slate-400 border-white/5">
                <RotateCcw size={20} />
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Process Controls */}
        <div className="lg:col-span-4 space-y-8">
           <div className="glass-card flex flex-col gap-8">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/5 pb-4">Control Unit</h3>
              
              <div className="space-y-4">
                 {!showAddForm ? (
                   <button onClick={() => setShowAddForm(true)} className="w-full sidebar-item border border-white/5 hover:border-primary/30 group">
                      <Plus size={20} className="text-primary" />
                      <span className="font-bold text-sm">Add New Process</span>
                   </button>
                 ) : (
                   <div className="p-6 rounded-3xl bg-white/[0.02] border border-primary/20 space-y-4 shadow-[0_0_20px_rgba(0,243,255,0.05)]">
                       <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-slate-400 px-1">Process Alias</label>
                          <input 
                            type="text" 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="e.g. Chrome Engine"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-primary/50 text-white"
                          />
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Arrival Time</span>
                          <div className="flex items-center gap-3">
                            <button onClick={() => setNewArrivalTime(Math.max(0, newArrivalTime - 1))} className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300">-</button>
                            <input 
                              type="number" 
                              value={newArrivalTime} 
                              onChange={(e) => setNewArrivalTime(parseInt(e.target.value) || 0)}
                              className="w-12 bg-transparent text-center font-mono text-primary font-bold focus:outline-none"
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
                              className="w-12 bg-transparent text-center font-mono text-primary font-bold focus:outline-none"
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
                         <button onClick={submitNewProcess} className="flex-1 py-2 rounded-xl bg-primary text-black text-xs font-black uppercase tracking-widest hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]">Deploy</button>
                      </div>
                   </div>
                 )}
                 
                 <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                       <span>Algorithm</span>
                       <div className="flex items-center gap-3">
                         {algorithm === 'SJF' && <span className="text-[8px] text-primary/70">Shortest Burst First</span>}
                         {algorithm === 'Priority' && <span className="text-[8px] text-accent/70">Lowest Priority ID First</span>}
                         <button onClick={cycleAlgorithm} className="text-primary font-mono bg-primary/10 px-3 py-1.5 rounded hover:bg-primary/20 transition-colors cursor-pointer">
                            {algorithm}
                         </button>
                       </div>
                    </div>
                    {algorithm === 'RR' ? (
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                         <span>Time Quantum</span>
                         <div className="flex items-center gap-1.5">
                           <button onClick={() => setQuantum(Math.max(1, quantum - 1))} className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-slate-400 font-bold">-</button>
                           <span className="text-secondary font-mono bg-secondary/10 px-2 py-0.5 rounded">{quantum}T</span>
                           <button onClick={() => setQuantum(quantum + 1)} className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-slate-400 font-bold">+</button>
                         </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-500 tracking-widest opacity-30">
                         <span>Time Quantum</span>
                         <span className="text-slate-500 font-mono">N/A</span>
                      </div>
                    )}
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                    <TrendingUp size={14} className="text-green-500" />
                    Load Distribution
                 </div>
                 <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_15px_rgba(0,243,255,0.4)]" />
                 </div>
              </div>
           </div>
        </div>

        {/* Visualizer Area */}
        <div className="lg:col-span-8 space-y-8">
           {/* Gantt Chart */}
           <div className="glass-card">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-2">
                 <Layers size={18} className="text-primary" />
                 Processing Pipeline (Gantt)
              </h3>
              
              <div className="relative h-24 w-full bg-black/40 rounded-3xl p-3 flex gap-1 items-stretch overflow-x-auto custom-scrollbar border border-white/5 shadow-inner">
                 <AnimatePresence>
                    {ganttData.map((seg, i) => (
                      <motion.div
                        key={`${seg.pid}-${i}`}
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        className="relative group min-w-[30px] rounded-xl flex items-center justify-center font-bold text-[10px]"
                        style={{ 
                          width: `${(seg.end - seg.start) * 40}px`,
                          backgroundColor: `${seg.color}22`,
                          border: `1px solid ${seg.color}44`,
                          color: seg.color
                        }}
                      >
                         P{seg.pid}
                         <div className="absolute -bottom-6 left-0 text-[8px] font-bold text-slate-600 font-mono">
                            {seg.start}
                         </div>
                         {i === ganttData.length - 1 && (
                            <div className="absolute -bottom-6 right-0 text-[8px] font-bold text-slate-600 font-mono">
                               {seg.end}
                            </div>
                         )}
                      </motion.div>
                    ))}
                 </AnimatePresence>
                 {ganttData.length === 0 && (
                   <div className="flex-1 flex items-center justify-center text-slate-700 italic text-sm font-mono tracking-widest">
                      IDLE_STATE_ACTIVE
                   </div>
                 )}
              </div>
           </div>

           {/* Running & Queue */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* CPU Core */}
              <div className="glass p-8 rounded-[2rem] border-white/[0.05] relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                 <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500 mb-8">CPU_SOCKET_0</h4>
                 
                 <div className="flex flex-col items-center gap-6 py-6" style={{ minHeight: '160px' }}>
                    {runningProcess ? (
                      <motion.div 
                        layoutId={`p-${runningProcess.id}`}
                        className="w-32 h-32 rounded-[2.5rem] bg-primary/10 border-2 border-primary/30 flex flex-col items-center justify-center relative group shadow-[0_0_40px_rgba(0,243,255,0.05)]"
                      >
                         <Zap size={32} className="text-primary mb-2 animate-pulse" />
                         <span className="text-xl font-black text-white italic">P{runningProcess.id}</span>
                         <span className="text-[10px] font-bold text-slate-500 uppercase">{runningProcess.name}</span>
                         
                         {/* Circle Progress */}
                         <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -rotate-90">
                            <circle 
                               cx="50%" cy="50%" r="68" 
                               fill="none" 
                               stroke="currentColor" 
                               strokeWidth="2" 
                               className="text-primary opacity-20"
                               strokeDasharray="427"
                               strokeDashoffset={427 - (427 * (runningProcess.burstTime - runningProcess.remainingTime)) / runningProcess.burstTime}
                            />
                         </svg>
                      </motion.div>
                    ) : (
                      <div className="w-32 h-32 rounded-[2.5rem] bg-white/[0.02] border-2 border-dashed border-white/5 flex items-center justify-center text-slate-700 italic text-xs tracking-tighter">
                         NO_LOAD
                      </div>
                    )}
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-[0.3em]">Core Executing</span>
                 </div>
              </div>

              {/* Ready Queue */}
              <div className="glass p-8 rounded-[2rem] border-white/[0.05]">
                 <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500 mb-8">Ready_Queue_Stack</h4>
                 <div className="space-y-4">
                    <AnimatePresence>
                       {readyQueue.map((p) => (
                         <motion.div 
                            key={p.id}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:bg-white/[0.05] transition-all"
                         >
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px]" style={{ backgroundColor: `${p.color}22`, color: p.color, border: `1px solid ${p.color}44` }}>
                                  P{p.id}
                               </div>
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.name}</span>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-primary">{p.remainingTime}T REM</span>
                         </motion.div>
                       ))}
                    </AnimatePresence>
                    {readyQueue.length === 0 && <p className="text-center text-slate-700 italic text-xs py-10 font-mono uppercase tracking-widest">Queue_Empty</p>}
                 </div>
              </div>
           </div>

           {/* Metrics Table */}
           <div className="glass-card">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-2">
                 <Activity size={18} className="text-primary" />
                 Simulation Analysis
              </h3>
              
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left font-mono text-[10px]">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-500">
                      <th className="pb-4 font-black">PROCESS</th>
                      <th className="pb-4 font-black text-center">ARRIVAL</th>
                      <th className="pb-4 font-black text-center">BURST</th>
                      <th className="pb-4 font-black text-center">FINISH</th>
                      <th className="pb-4 font-black text-center">TAT</th>
                      <th className="pb-4 font-black text-center">WT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {processes.map(p => (
                      <tr key={p.id} className="group hover:bg-white/[0.02]">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                            <span className="font-bold text-white italic">P{p.id} ({p.name})</span>
                          </div>
                        </td>
                        <td className="py-4 text-center text-slate-400">{p.arrivalTime}</td>
                        <td className="py-4 text-center text-slate-400">{p.burstTime}</td>
                        <td className="py-4 text-center font-bold text-primary">{p.state === 'terminated' ? p.finishTime : '-'}</td>
                        <td className="py-4 text-center font-bold text-secondary">{p.state === 'terminated' ? p.turnaroundTime : '-'}</td>
                        <td className="py-4 text-center font-bold text-accent">{p.state === 'terminated' ? p.waitingTime : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                  {processes.some(p => p.state === 'terminated') && (
                    <tfoot>
                      <tr className="border-t border-white/10 bg-white/[0.02]">
                        <td colSpan={4} className="py-4 font-black text-right pr-8 text-slate-500 uppercase tracking-widest">Averages</td>
                        <td className="py-4 text-center font-black text-secondary">
                          {(processes.filter(p => p.state === 'terminated').reduce((acc, p) => acc + p.turnaroundTime, 0) / processes.filter(p => p.state === 'terminated').length).toFixed(2)}
                        </td>
                        <td className="py-4 text-center font-black text-accent">
                          {(processes.filter(p => p.state === 'terminated').reduce((acc, p) => acc + p.waitingTime, 0) / processes.filter(p => p.state === 'terminated').length).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
           </div>
        </div>
      </div>
      
      {/* Live Code Tracer */}
      <LiveCodeTracer logs={logs} />

      <AlgorithmDeepDive algorithm={algorithm} />
    </div>
  )
}
