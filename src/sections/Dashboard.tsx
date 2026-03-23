import { motion } from 'framer-motion'
import { Activity, Cpu, Users, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts'

const StatCard = ({ icon: Icon, label, value, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
    className="glass p-5 rounded-2xl flex flex-col gap-3 group relative overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}/10 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-${color}/20 transition-all duration-500`}></div>
    <div className="flex items-center justify-between">
      <div className={`p-2.5 rounded-xl bg-${color}/10 text-${color} border border-${color}/20`}>
        <Icon size={20} />
      </div>
      <div className="flex items-center gap-1 text-xs text-green-500 font-medium">
        <Zap size={12} />
        +12.5%
      </div>
    </div>
    <div>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-slate-100 neon-text-cyan">{value}</h3>
    </div>
  </motion.div>
)

const systemData = [
  { time: '10:00', cpu: 34, mem: 45, wait: 2 },
  { time: '10:01', cpu: 45, mem: 48, wait: 3 },
  { time: '10:02', cpu: 67, mem: 52, wait: 5 },
  { time: '10:03', cpu: 55, mem: 55, wait: 4 },
  { time: '10:04', cpu: 89, mem: 60, wait: 8 },
  { time: '10:05', cpu: 92, mem: 62, wait: 12 },
  { time: '10:06', cpu: 78, mem: 58, wait: 6 },
]

export const Dashboard = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 rounded-[3.5rem] border-slate-800 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 relative overflow-hidden flex flex-col items-center text-center gap-6"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 absolute -top-32 -right-32 bg-primary/20 blur-[100px] rounded-full" 
        />
        
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">
             Next-Gen OS Lab
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
            Process<span className="text-primary neon-text-cyan">Verse</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Visualize Processes, Threads, Deadlocks, and Synchronization 
            like never before in a futuristic simulator environment.
          </p>
        </div>

        <div className="flex gap-6 relative z-10 mt-4">
           <button 
             onClick={onStart}
             className="px-10 py-5 rounded-3xl bg-primary text-black font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,243,255,0.4)]"
           >
              Launch Simulator
           </button>
           <button className="px-10 py-5 rounded-3xl glass border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-all">
              Explore Concepts
           </button>
        </div>
      </motion.div>

      {/* Welcome & System Pulse */}
      <div className="flex items-end justify-between pt-8 border-t border-slate-800/50">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">System Dashboard</h1>
          <p className="text-slate-400 mt-1">Real-time simulator metrics and process overview.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-3 border-cyan-500/20">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></div>
            <span className="text-sm font-mono text-cyan-500">KRNL_ACTIVE: 0x23F1</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Cpu} label="System Processes" value="24" color="cyan-500" delay={0.1} />
        <StatCard icon={Users} label="Active Threads" value="156" color="purple-500" delay={0.2} />
        <StatCard icon={Activity} label="Throughput" value="12.4 p/s" color="blue-500" delay={0.3} />
        <StatCard icon={AlertTriangle} label="Deadlock Risk" value="Low" color="green-500" delay={0.4} />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CPU Utilization Area Chart */}
        <div className="lg:col-span-2 glass p-6 rounded-3xl border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity size={18} className="text-primary" />
              Processor Utilization
            </h3>
            <select className="bg-slate-900 border border-slate-700 rounded-lg text-xs px-3 py-1 text-slate-400 outline-none">
              <option>Last 10 minutes</option>
              <option>Last hour</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={systemData}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#475569" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #1e293b',
                    borderRadius: '12px'
                  }}
                  itemStyle={{ color: '#00f3ff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="#00f3ff" 
                  fillOpacity={1} 
                  fill="url(#colorCpu)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="glass p-6 rounded-3xl border-slate-800 flex flex-col">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <AlertTriangle size={18} className="text-secondary" />
            System Alerts
          </h3>
          <div className="space-y-4 flex-1 overflow-y-auto">
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20 text-amber-500">
                <Users size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-200">High Thread Contention</span>
                <span className="text-xs text-slate-500">Zone-B resources are under heavy load.</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20 text-green-500">
                <CheckCircle2 size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-200">Sync Success</span>
                <span className="text-xs text-slate-500">All mutexes released successfully in Lab-4.</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 text-primary">
                <Zap size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-200">New Process Spawning</span>
                <span className="text-xs text-slate-500">Visualizing PID: 4092 allocation...</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-3 rounded-2xl border border-slate-800 text-slate-400 text-sm font-medium hover:bg-white/5 transition-colors">
            Clear Logs
          </button>
        </div>
      </div>
    </div>
  )
}
