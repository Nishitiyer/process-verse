import { motion } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts'
import { 
  Activity, 
  Cpu, 
  Zap, 
  TrendingUp, 
  Maximize2,
  GitBranch,
  Layers,
  BarChart3
} from 'lucide-react'

const performanceData = [
  { time: '00:00', cpu: 12, memory: 40, io: 5 },
  { time: '00:05', cpu: 34, memory: 42, io: 12 },
  { time: '00:10', cpu: 25, memory: 45, io: 8 },
  { time: '00:15', cpu: 56, memory: 48, io: 25 },
  { time: '00:20', cpu: 45, memory: 55, io: 40 },
  { time: '00:25', cpu: 89, memory: 60, io: 70 },
  { time: '00:30', cpu: 65, memory: 58, io: 45 },
]

export const PerformanceGraphs = () => {
  return (
    <div className="p-12 space-y-12 max-w-7xl mx-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between glass p-10 rounded-[3rem] border-white/[0.05]">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[2rem] bg-secondary/10 flex items-center justify-center text-secondary shadow-[0_0_30px_rgba(157,0,255,0.15)]">
            <BarChart3 size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Kernel Analytics</h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
              <Activity size={12} className="text-secondary" /> 
              Telemetry Stream: Live
            </p>
          </div>
        </div>
        <div className="flex gap-4">
           <div className="glass px-6 py-4 rounded-2xl flex flex-col items-center border-white/10 min-w-[120px]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Load</span>
              <span className="text-2xl font-black text-primary">64.2%</span>
           </div>
           <div className="glass px-6 py-4 rounded-2xl flex flex-col items-center border-white/10 min-w-[120px]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Peak Freq</span>
              <span className="text-2xl font-black text-secondary">4.2GHz</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* CPU Utilization */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card !p-0 overflow-hidden group"
        >
          <div className="p-8 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.02]">
             <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                   <Cpu size={20} />
                </div>
                <h3 className="text-lg font-black uppercase italic tracking-tighter">CPU Load History</h3>
             </div>
             <Maximize2 size={16} className="text-slate-600 group-hover:text-primary transition-colors cursor-pointer" />
          </div>
          <div className="p-8 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', fontSize: '10px' }}
                  itemStyle={{ color: '#00f3ff' }}
                />
                <Area type="monotone" dataKey="cpu" stroke="#00f3ff" strokeWidth={3} fillOpacity={1} fill="url(#cpuGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Memory Allocation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card !p-0 overflow-hidden group"
        >
           <div className="p-8 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.02]">
             <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                   <Layers size={20} />
                </div>
                <h3 className="text-lg font-black uppercase italic tracking-tighter">Memory Allocation</h3>
             </div>
             <TrendingUp size={16} className="text-slate-600 group-hover:text-secondary transition-colors cursor-pointer" />
          </div>
          <div className="p-8 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', fontSize: '10px' }}
                />
                <Line type="monotone" dataKey="memory" stroke="#9d00ff" strokeWidth={3} dot={{ fill: '#9d00ff', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* I/O Throughput */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-card !p-0 overflow-hidden"
        >
          <div className="p-8 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.02]">
             <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent">
                   <Zap size={20} />
                </div>
                <h3 className="text-lg font-black uppercase italic tracking-tighter">I/O Throughput Stream</h3>
             </div>
             <div className="flex gap-2 text-[10px] font-bold text-slate-500">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accent" /> Write Ops</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> Read Ops</span>
             </div>
          </div>
          <div className="p-10 h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={performanceData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff01" vertical={false} />
                 <XAxis dataKey="time" hide />
                 <YAxis stroke="#ffffff10" fontSize={10} axisLine={false} />
                 <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#0a0a12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem' }} />
                 <Bar dataKey="io" fill="#ff004c" radius={[10, 10, 0, 0]} barSize={40} />
                 <Bar dataKey="cpu" fill="#00f3ff" radius={[10, 10, 0, 0]} barSize={20} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* System Node Distribution */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: 'Network Bridge', val: 'Connected', icon: Activity, color: 'text-primary' },
           { label: 'L3 Cache State', val: 'Synchronized', icon: Zap, color: 'text-secondary' },
           { label: 'Virtual Disk', val: 'Mounted', icon: GitBranch, color: 'text-green-500' },
         ].map((node, i) => (
           <motion.div 
              key={node.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass p-8 rounded-[2.5rem] border-white/5 flex items-center gap-6"
           >
              <div className={`p-4 rounded-2xl bg-black/40 ${node.color}`}>
                 <node.icon size={24} />
              </div>
              <div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{node.label}</div>
                 <div className="text-xl font-black text-white italic">{node.val}</div>
              </div>
           </motion.div>
         ))}
      </section>
    </div>
  )
}
