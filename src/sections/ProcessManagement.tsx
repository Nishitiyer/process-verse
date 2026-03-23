import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Cpu, 
  Clock, 
  ArrowRight,
  ChevronRight
} from 'lucide-react'
import { 
  Process, 
  SchedulingAlgorithm, 
  createProcess, 
  getNextProcess 
} from '../logic/processSim'

export const ProcessManagement = () => {
  const [processes, setProcesses] = useState<Process[]>([
    createProcess(1, 0, 8, 3),
    createProcess(2, 1, 4, 1),
    createProcess(3, 2, 9, 2),
    createProcess(4, 3, 5, 4),
  ])
  const [algorithm, setAlgorithm] = useState<SchedulingAlgorithm>('FCFS')
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [runningProcess, setRunningProcess] = useState<Process | null>(null)
  const [readyQueue, setReadyQueue] = useState<Process[]>([])
  const [terminatedProcesses, setTerminatedProcesses] = useState<Process[]>([])
  const [ganttData, setGanttData] = useState<{pid: number, start: number, end: number, color: string}[]>([])
  const [quantum, setQuantum] = useState(2)
  const [timeStep, setTimeStep] = useState(500) // ms per tick

  const timerRef = useRef<any>(null)

  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentTime(0)
    setRunningProcess(null)
    setReadyQueue([])
    setTerminatedProcesses([])
    setGanttData([])
    setProcesses(processes.map(p => ({
      ...p,
      remainingTime: p.burstTime,
      state: 'new',
      waitingTime: 0,
      turnaroundTime: 0
    })))
  }

  const addProcess = () => {
    const id = processes.length + terminatedProcesses.length + 1
    const newP = createProcess(id, currentTime, Math.floor(Math.random() * 8) + 2, Math.floor(Math.random() * 5) + 1)
    setProcesses([...processes, newP])
  }

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        tick()
      }, timeStep)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning, currentTime, runningProcess, readyQueue, processes, algorithm])

  const tick = () => {
    // 1. Check for newly arrived processes
    const newArrivals = processes.filter(p => p.arrivalTime === currentTime && p.state === 'new')
    let updatedReadyQueue = [...readyQueue]
    
    newArrivals.forEach(p => {
      p.state = 'ready'
      updatedReadyQueue.push(p)
    })

    let updatedRunningProcess = runningProcess
    let updatedGantt = [...ganttData]
    let remainingProcesses = processes.filter(p => p.state !== 'ready' && p.state !== 'new')

    // 2. If no process is running, pick one from ready queue
    if (!updatedRunningProcess && updatedReadyQueue.length > 0) {
      const next = getNextProcess(updatedReadyQueue, algorithm, currentTime)
      if (next) {
        updatedRunningProcess = { ...next, state: 'running' }
        updatedReadyQueue = updatedReadyQueue.filter(p => p.id !== next.id)
      }
    } else if (updatedRunningProcess && algorithm === 'RR') {
      // Round Robin preemption
      const burstSoFar = (currentTime - (updatedGantt.filter(g => g.pid === updatedRunningProcess?.id).slice(-1)[0]?.start || 0))
      if (burstSoFar >= quantum && updatedReadyQueue.length > 0) {
        updatedRunningProcess.state = 'ready'
        updatedReadyQueue.push(updatedRunningProcess)
        const next = updatedReadyQueue.shift()!
        updatedRunningProcess = { ...next, state: 'running' }
      }
    }

    // 3. Execution step
    if (updatedRunningProcess) {
      // Update Gantt Chart
      const lastGantt = updatedGantt[updatedGantt.length - 1]
      if (lastGantt && lastGantt.pid === updatedRunningProcess.id && lastGantt.end === currentTime) {
        lastGantt.end += 1
      } else {
        updatedGantt.push({
          pid: updatedRunningProcess.id,
          start: currentTime,
          end: currentTime + 1,
          color: updatedRunningProcess.color
        })
      }

      updatedRunningProcess.remainingTime -= 1
      
      if (updatedRunningProcess.remainingTime === 0) {
        updatedRunningProcess.state = 'terminated'
        updatedRunningProcess.finishTime = currentTime + 1
        updatedRunningProcess.turnaroundTime = updatedRunningProcess.finishTime - updatedRunningProcess.arrivalTime
        updatedRunningProcess.waitingTime = updatedRunningProcess.turnaroundTime - updatedRunningProcess.burstTime
        setTerminatedProcesses(prev => [...prev, updatedRunningProcess!])
        updatedRunningProcess = null
      }
    }

    setRunningProcess(updatedRunningProcess)
    setReadyQueue(updatedReadyQueue)
    setGanttData(updatedGantt)
    setCurrentTime(prev => prev + 1)
    
    // Check if all done
    if (updatedReadyQueue.length === 0 && !updatedRunningProcess && processes.every(p => p.state === 'new' ? p.arrivalTime > currentTime : p.state === 'terminated')) {
      // Wait a bit to ensure last arrivals are caught if simulation continues
      if (processes.every(p => p.state === 'terminated')) {
         setIsRunning(false)
      }
    }
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">Process Scheduling</h1>
          <p className="text-slate-400 mt-1">Visualize CPU scheduling algorithms in real-time.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 glass p-2 rounded-2xl border-slate-800">
          <div className="flex items-center gap-2 px-3 border-r border-slate-800">
            <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Algorithm</label>
            <select 
              value={algorithm}
              onChange={(e) => { setAlgorithm(e.target.value as SchedulingAlgorithm); resetSimulation(); }}
              className="bg-transparent text-sm font-semibold text-primary outline-none cursor-pointer"
            >
              <option value="FCFS">FCFS</option>
              <option value="SJF">SJF (Non-Preemptive)</option>
              <option value="Priority">Priority</option>
              <option value="RR">Round Robin</option>
            </select>
          </div>

          {algorithm === 'RR' && (
            <div className="flex items-center gap-2 px-3 border-r border-slate-800">
              <label className="text-xs font-mono text-slate-500 uppercase">Quantum</label>
              <input 
                type="number" 
                value={quantum}
                onChange={(e) => setQuantum(parseInt(e.target.value) || 1)}
                className="w-12 bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-xs text-center"
              />
            </div>
          )}

          <div className="flex items-center gap-1 px-2">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`p-2 rounded-xl transition-all ${isRunning ? 'bg-amber-500/20 text-amber-500' : 'bg-primary/20 text-primary hover:bg-primary/30'}`}
            >
              {isRunning ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>
            <button 
              onClick={resetSimulation}
              className="p-2 rounded-xl hover:bg-white/5 text-slate-400"
            >
              <RotateCcw size={20} />
            </button>
            <button 
              onClick={addProcess}
              className="p-2 rounded-xl bg-white/5 text-slate-200 hover:bg-white/10"
              title="Add Random Process"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Input & Queues */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-5 rounded-3xl border-slate-800 overflow-hidden">
            <h3 className="text-sm font-semibold mb-4 text-slate-400 flex items-center gap-2">
              <Clock size={16} />
              Process Control Block
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {processes.map((p) => (
                <div key={p.id} className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs" style={{ backgroundColor: `${p.color}22`, color: p.color, border: `1px solid ${p.color}44` }}>
                      P{p.id}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-300 font-medium">Burst: {p.burstTime}s</span>
                      <span className="text-[10px] text-slate-500">Arrival: {p.arrivalTime}s</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                       p.state === 'running' ? 'bg-primary/20 text-primary' : 
                       p.state === 'ready' ? 'bg-purple-500/20 text-purple-500' :
                       p.state === 'terminated' ? 'bg-slate-700 text-slate-400' : 'bg-slate-800 text-slate-500'
                     }`}>
                       {p.state}
                     </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass p-5 rounded-3xl border-slate-800">
             <div className="flex items-center justify-between mb-2">
               <span className="text-xs font-mono text-slate-500 uppercase">Average Metrics</span>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                  <p className="text-[10px] text-slate-500 uppercase">Wait Time</p>
                  <p className="text-xl font-bold text-indigo-400">
                    {terminatedProcesses.length ? (terminatedProcesses.reduce((a, b) => a + b.waitingTime, 0) / terminatedProcesses.length).toFixed(1) : '0.0'}s
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                  <p className="text-[10px] text-slate-500 uppercase">Turnaround</p>
                  <p className="text-xl font-bold text-cyan-400">
                    {terminatedProcesses.length ? (terminatedProcesses.reduce((a, b) => a + b.turnaroundTime, 0) / terminatedProcesses.length).toFixed(1) : '0.0'}s
                  </p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Visualizer Canvas */}
        <div className="lg:col-span-3 space-y-8">
          {/* Main Simulation Lane */}
          <div className="glass p-8 rounded-[2rem] border-slate-800 min-h-[400px] relative flex flex-col justify-center items-center gap-12 overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
              <div className="text-4xl font-mono font-bold text-slate-800">T = {currentTime}s</div>
            </div>

            {/* Ready Queue */}
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest pl-2">
                Ready Queue <ChevronRight size={14} />
              </div>
              <div className="h-24 w-full bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-800 flex items-center px-6 gap-4 overflow-x-auto overflow-y-hidden">
                <AnimatePresence>
                  {readyQueue.map((p, idx) => (
                    <motion.div
                      key={p.id}
                      layoutId={`process-${p.id}`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="w-16 h-16 rounded-2xl shrink-0 flex flex-col items-center justify-center relative shadow-lg"
                      style={{ backgroundColor: p.color, border: '2px solid rgba(255,255,255,0.2)' }}
                    >
                      <span className="text-xs font-bold text-black font-mono">P{p.id}</span>
                      <span className="text-[10px] font-bold text-black/60">{p.remainingTime}s</span>
                      {idx === 0 && (
                        <motion.div 
                          className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center animate-bounce"
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                        >
                          <div className="w-1.5 h-1.5 bg-black rounded-full" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {readyQueue.length === 0 && <span className="text-slate-700 font-mono text-sm italic">Queue Empty</span>}
              </div>
            </div>

            {/* CPU Lane */}
            <div className="flex items-center gap-12 w-full justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                  <ArrowRight size={24} />
                </div>
                <span className="text-[10px] font-mono text-slate-600 uppercase">Dispatch</span>
              </div>

              <div className="w-48 h-48 rounded-[3rem] glass flex items-center justify-center relative group">
                <div className="absolute inset-0 rounded-[3rem] bg-primary/5 group-hover:bg-primary/10 transition-colors animate-pulse-glow" />
                <AnimatePresence mode="wait">
                  {runningProcess ? (
                    <motion.div
                      key={runningProcess.id}
                      layoutId={`process-${runningProcess.id}`}
                      initial={{ scale: 0.5, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 1.2, opacity: 0 }}
                      className="w-32 h-32 rounded-3xl flex flex-col items-center justify-center z-10 shadow-2xl"
                      style={{ backgroundColor: runningProcess.color, border: '4px solid rgba(255,255,255,0.3)' }}
                    >
                      <Cpu size={32} className="text-black/30 mb-2" />
                      <span className="text-xl font-bold text-black">P{runningProcess.id}</span>
                      <span className="text-sm font-mono text-black font-bold">REMAIN: {runningProcess.remainingTime}s</span>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-primary animate-spin" />
                      <span className="text-xs text-slate-500 font-mono">CPU IDLE</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="p-4 rounded-2xl bg-green-500/10 text-green-500 border border-green-500/20">
                  <CheckCircle2 size={24} />
                </div>
                <span className="text-[10px] font-mono text-slate-600 uppercase">Complete</span>
              </div>
            </div>

            {/* Gantt Chart Container */}
            <div className="w-full mt-4">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Execution Timeline (Gantt)</div>
                <div className="text-xs text-slate-500 font-mono">Real-time update</div>
              </div>
              <div className="h-16 w-full glass rounded-2xl border-slate-800 flex overflow-hidden">
                {ganttData.map((g, i) => (
                  <motion.div
                    key={`${g.pid}-${i}`}
                    className="h-full border-r border-black/20 relative flex items-center justify-center group"
                    style={{ 
                      width: `${(g.end - g.start) * 20}px`, 
                      minWidth: '20px',
                      backgroundColor: g.color 
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-[10px] font-bold text-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                      P{g.pid}
                    </span>
                    <div className="absolute -bottom-5 left-0 text-[8px] font-mono text-slate-500">{g.start}</div>
                    {i === ganttData.length - 1 && (
                      <div className="absolute -bottom-5 right-0 text-[8px] font-mono text-slate-500">{g.end}</div>
                    )}
                  </motion.div>
                ))}
                {ganttData.length === 0 && <div className="flex-1 flex items-center justify-center text-slate-700 text-xs font-mono uppercase">Timeline Waiting...</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CheckCircle2 = ({ size, className }: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)
