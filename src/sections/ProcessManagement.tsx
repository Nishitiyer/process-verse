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

export const ProcessManagement = () => {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 1, name: 'Browser', arrivalTime: 0, burstTime: 6, remainingTime: 6, priority: 1, state: 'new', color: '#00f3ff', waitingTime: 0, turnaroundTime: 0 },
    { id: 2, name: 'System', arrivalTime: 2, burstTime: 4, remainingTime: 4, priority: 0, state: 'new', color: '#9d00ff', waitingTime: 0, turnaroundTime: 0 },
    { id: 3, name: 'Editor', arrivalTime: 4, burstTime: 3, remainingTime: 3, priority: 2, state: 'new', color: '#ff004c', waitingTime: 0, turnaroundTime: 0 },
  ])
  const [runningProcess, setRunningProcess] = useState<Process | null>(null)
  const [readyQueue, setReadyQueue] = useState<Process[]>([])
  const [ganttData, setGanttData] = useState<{pid: number, start: number, end: number, color: string}[]>([])
  const [algorithm, setAlgorithm] = useState<'FCFS'|'SJF'|'Priority'|'RR'>('FCFS')
  const [quantum, setQuantum] = useState(2)
  const [timeStep] = useState(500) // ms per tick

  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const timerRef = useRef<any>(null)
  const quantumRef = useRef(0)

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        tick()
      }, timeStep)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning, processes, runningProcess, readyQueue, currentTime, algorithm])

  const tick = () => {
    setCurrentTime(prev => prev + 1)
    
    let updatedProcesses = [...processes]
    let updatedReadyQueue = [...readyQueue]
    
    // 1. Handle arrivals
    updatedProcesses.forEach(p => {
      if (p.arrivalTime === currentTime && p.state === 'new') {
        p.state = 'ready'
        updatedReadyQueue.push(p)
      }
    })

    let updatedRunningProcess = runningProcess
    let updatedGantt = [...ganttData]

    // 2. If no process is running, pick one from ready queue
    if (!updatedRunningProcess && updatedReadyQueue.length > 0) {
      updatedRunningProcess = getNextProcess(updatedReadyQueue, algorithm)
      if (updatedRunningProcess) {
        updatedReadyQueue = updatedReadyQueue.filter(p => p.id !== updatedRunningProcess!.id)
        updatedRunningProcess.state = 'running'
        quantumRef.current = 0
        
        updatedGantt.push({
          pid: updatedRunningProcess.id,
          start: currentTime,
          end: currentTime + 1,
          color: updatedRunningProcess.color
        })
      }
    } else if (updatedRunningProcess) {
      // 3. Process is running
      updatedRunningProcess.burstTime -= 1
      updatedGantt[updatedGantt.length - 1].end = currentTime + 1
      quantumRef.current += 1

      if (updatedRunningProcess.burstTime <= 0) {
        updatedRunningProcess.state = 'terminated'
        updatedRunningProcess.turnaroundTime = (currentTime + 1) - updatedRunningProcess.arrivalTime
        updatedRunningProcess = null
        quantumRef.current = 0
      } else if (algorithm === 'RR' && quantumRef.current >= quantum) {
        // Preempt for Round Robin
        updatedRunningProcess.state = 'ready'
        updatedReadyQueue.push(updatedRunningProcess)
        updatedRunningProcess = null
        quantumRef.current = 0
      }
    }

    setProcesses(updatedProcesses)
    setReadyQueue(updatedReadyQueue)
    setRunningProcess(updatedRunningProcess)
    setGanttData(updatedGantt)
  }

  // Form State
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBurst, setNewBurst] = useState(4)
  const [newPriority, setNewPriority] = useState(1)

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
      name: `Task-${newId}`,
      arrivalTime: Math.max(0, currentTime), // enters at current tick
      burstTime: newBurst,
      remainingTime: newBurst,
      priority: newPriority,
      state: 'new',
      color: ['#00f3ff', '#9d00ff', '#ff004c', '#00ff8a', '#ff8a00'][newId % 5],
      waitingTime: 0, turnaroundTime: 0
    }
    setProcesses([...processes, p])
    setShowAddForm(false)
    
    // Reset form
    setNewBurst(4)
    setNewPriority(1)
  }

  const cycleAlgorithm = () => {
    const algos: ('FCFS'|'SJF'|'Priority'|'RR')[] = ['FCFS', 'SJF', 'Priority', 'RR']
    const nextIdx = (algos.indexOf(algorithm) + 1) % algos.length
    setAlgorithm(algos[nextIdx])
    resetSim()
  }

  const resetSim = () => {
    setIsRunning(false)
    setCurrentTime(0)
    quantumRef.current = 0
    setProcesses([
      { id: 1, name: 'Browser', arrivalTime: 0, burstTime: 6, remainingTime: 6, priority: 1, state: 'new', color: '#00f3ff', waitingTime: 0, turnaroundTime: 0 },
      { id: 2, name: 'System', arrivalTime: 2, burstTime: 4, remainingTime: 4, priority: 0, state: 'new', color: '#9d00ff', waitingTime: 0, turnaroundTime: 0 },
      { id: 3, name: 'Editor', arrivalTime: 4, burstTime: 3, remainingTime: 3, priority: 2, state: 'new', color: '#ff004c', waitingTime: 0, turnaroundTime: 0 },
    ])
    setRunningProcess(null)
    setReadyQueue([])
    setGanttData([])
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
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] uppercase font-bold text-slate-400">Burst Time (T)</span>
                         <div className="flex items-center gap-3">
                           <button onClick={() => setNewBurst(Math.max(1, newBurst - 1))} className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300">-</button>
                           <span className="font-mono text-primary font-bold w-4 text-center">{newBurst}</span>
                           <button onClick={() => setNewBurst(newBurst + 1)} className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300">+</button>
                         </div>
                      </div>
                      {algorithm === 'Priority' && (
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] uppercase font-bold text-slate-400">Priority (0=High)</span>
                           <div className="flex items-center gap-3">
                             <button onClick={() => setNewPriority(Math.max(0, newPriority - 1))} className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300">-</button>
                             <span className="font-mono text-accent font-bold w-4 text-center">{newPriority}</span>
                             <button onClick={() => setNewPriority(newPriority + 1)} className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300">+</button>
                           </div>
                        </div>
                      )}
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
                 
                 <div className="flex flex-col items-center gap-6 py-6">
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
                            <span className="text-[10px] font-mono font-bold text-primary">{p.burstTime}T REM</span>
                         </motion.div>
                       ))}
                    </AnimatePresence>
                    {readyQueue.length === 0 && <p className="text-center text-slate-700 italic text-xs py-10 font-mono uppercase tracking-widest">Queue_Empty</p>}
                 </div>
              </div>
           </div>
        </div>
      </div>
      
      <AlgorithmDeepDive algorithm={algorithm} />
    </div>
  )
}
