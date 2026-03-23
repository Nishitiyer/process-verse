import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie
} from 'recharts'
import { BarChart3, TrendingUp, PieChart as PieIcon, Activity } from 'lucide-react'

const waitTimeData = [
  { name: 'FCFS', time: 12.4 },
  { name: 'SJF', time: 8.2 },
  { name: 'RR', time: 10.5 },
  { name: 'Priority', time: 9.8 },
]

const throughputData = [
  { time: '00:00', val: 4 },
  { time: '01:00', val: 7 },
  { time: '02:00', val: 5 },
  { time: '03:00', val: 12 },
  { time: '04:00', val: 8 },
  { time: '05:00', val: 15 },
]

const stateDistribution = [
  { name: 'Running', value: 4, color: '#00f3ff' },
  { name: 'Ready', value: 12, color: '#9d00ff' },
  { name: 'Blocked', value: 3, color: '#ff004c' },
  { name: 'Terminated', value: 25, color: '#1e293b' },
]

export const PerformanceGraphs = () => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Performance Analytics</h1>
        <p className="text-slate-400 mt-1">Comparative metrics across different scheduling and sync strategies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Waiting Time Comparison */}
        <div className="glass p-8 rounded-[2rem] border-slate-800">
           <h3 className="text-lg font-semibold mb-8 flex items-center gap-2">
              <BarChart3 size={20} className="text-primary" />
              Avg Waiting Time (Seconds)
           </h3>
           <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={waitTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    />
                    <Bar dataKey="time" radius={[8, 8, 0, 0]}>
                       {waitTimeData.map((_entry, index) => (
                         <Cell key={`cell-${index}`} fill={index === 1 ? '#00f3ff' : '#1e293b'} stroke={index === 1 ? '#00f3ff' : '#334155'} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Throughput Over Time */}
        <div className="glass p-8 rounded-[2rem] border-slate-800">
           <h3 className="text-lg font-semibold mb-8 flex items-center gap-2">
              <TrendingUp size={20} className="text-secondary" />
              System Throughput
           </h3>
           <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={throughputData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="val" 
                      stroke="#9d00ff" 
                      strokeWidth={4} 
                      dot={{ r: 6, fill: '#9d00ff', strokeWidth: 2, stroke: '#0a0a12' }}
                      activeDot={{ r: 8, stroke: '#9d00ff', strokeWidth: 2, fill: '#fff' }}
                    />
                 </LineChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* State Distribution Pie */}
        <div className="glass p-8 rounded-[2rem] border-slate-800 flex flex-col items-center">
           <h3 className="text-lg font-semibold mb-4 self-start flex items-center gap-2">
              <PieIcon size={20} className="text-accent" />
              Overall Process States
           </h3>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                       data={stateDistribution}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={100}
                       paddingAngle={5}
                       dataKey="value"
                    >
                        {stateDistribution.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={_entry.color} />
                        ))}
                    </Pie>
                    <RechartsTooltip />
                 </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="flex gap-4 mt-4">
              {stateDistribution.map(s => (
                <div key={s.name} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                   <span className="text-[10px] uppercase font-bold text-slate-500">{s.name}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Performance Summary Card */}
        <div className="glass p-10 rounded-[2.5rem] border-slate-800 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
           <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-3xl bg-primary/10 border border-primary/20 text-primary">
                  <Activity size={32} />
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-slate-100">Optimization Score</h2>
                   <p className="text-slate-400">System efficiency rating based on current load.</p>
                </div>
              </div>
              
              <div className="flex items-end gap-2">
                <span className="text-6xl font-black text-primary neon-text-cyan">94</span>
                <span className="text-xl font-bold text-slate-500 mb-2">/ 100</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono uppercase text-slate-500">
                   <span>Resource Utilization</span>
                   <span>Good</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full">
                   <div className="h-full w-[85%] bg-primary rounded-full shadow-[0_0_15px_rgba(0,243,255,0.5)]" />
                </div>
              </div>
           </div>

           {/* Decorator */}
           <div className="absolute top-0 right-0 p-12 text-slate-900/10 pointer-events-none">
              <BarChart3 size={200} />
           </div>
        </div>
      </div>
    </div>
  )
}
