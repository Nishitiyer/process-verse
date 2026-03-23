import { motion } from 'framer-motion'
import { 
  ShieldCheck, 
  Activity, 
  Terminal, 
  Cpu, 
  GitBranch, 
  Lock, 
  ChevronRight,
  TrendingUp
} from 'lucide-react'

interface DashboardProps {
  onStart: () => void
}

export const Dashboard = ({ onStart }: DashboardProps) => {
  const stats = [
    { label: 'Processes', value: '24', icon: Cpu, color: 'text-primary' },
    { label: 'Active Threads', value: '142', icon: GitBranch, color: 'text-secondary' },
    { label: 'Kernel Uptime', value: '99.9%', icon: Activity, color: 'text-green-500' },
    { label: 'Security', value: 'Level 4', icon: ShieldCheck, color: 'text-accent' },
  ]

  const features = [
    {
      title: 'Process Management',
      desc: 'Visualize scheduling algorithms with interactive Gantt charts.',
      icon: Cpu,
      id: 'processes'
    },
    {
      title: 'Multithreading',
      desc: 'Simulate thread lifecycle and resource contention.',
      icon: GitBranch,
      id: 'threads'
    },
    {
      title: 'Deadlock Control',
      desc: 'Prevent resource starvation using Banker\'s algorithm.',
      icon: Lock,
      id: 'deadlocks'
    }
  ]

  return (
    <div className="p-12 space-y-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[4rem] glass p-20 flex flex-col items-center text-center gap-10 border-white/[0.05]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 -z-10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center"
        >
          <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 mb-8 mono">
            Next-Gen Operating System Simulator
          </div>
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter leading-none mb-4 italic">
            PROCESS<span className="text-primary">VERSE</span>
          </h1>
          <p className="max-w-3xl text-xl text-slate-400 leading-relaxed font-medium">
            Experience the internal mechanics of modern computing through a futuristic, high-fidelity simulator. Visualize, analyze, and master OS core concepts.
          </p>
        </motion.div>

        <div className="flex gap-6 mt-6">
          <button 
            onClick={onStart}
            className="btn-primary flex items-center gap-4 text-base px-10 py-4"
          >
            Launch Core Simulator
            <ChevronRight size={20} />
          </button>
          <button className="btn-secondary text-base px-10 py-4">
            Documentation
          </button>
        </div>

        {/* Decorators */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-secondary/10 blur-[100px] rounded-full" />
      </section>

      {/* Real-time Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            className="glass-card flex items-center gap-6"
          >
            <div className={`p-5 rounded-3xl bg-white/[0.03] border border-white/[0.05] ${stat.color} shadow-inner`}>
              <stat.icon size={28} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</div>
              <div className="text-3xl font-black text-white">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Operational Modules */}
      <section className="space-y-10">
        <div className="flex items-center justify-between border-b border-white/[0.05] pb-6">
          <div>
            <h3 className="text-3xl font-black tracking-tight uppercase italic">Operational Modules</h3>
            <p className="text-slate-500 text-sm mt-1">Select a sector to begin deep-dive simulation.</p>
          </div>
          <div className="flex items-center gap-3 text-primary font-mono text-[10px] bg-primary/5 px-4 py-2 rounded-full border border-primary/20">
            <TrendingUp size={16} />
            <span className="tracking-[0.2em]">ALL SYSTEMS OPTIMAL</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
              className="group cursor-pointer relative"
            >
              <div className="glass-card h-full space-y-8 flex flex-col hover:border-primary/30 group-hover:bg-primary/[0.02]">
                <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-700 group-hover:rotate-[10deg]">
                  <f.icon size={32} className="text-slate-500 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{f.title}</h4>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </div>
                <div className="mt-auto pt-6 flex items-center justify-between opacity-30 group-hover:opacity-100 transition-all">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Initialize Sector</span>
                  <ChevronRight size={20} className="text-primary group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Terminal View */}
      <section className="glass rounded-[3rem] border-white/[0.05] overflow-hidden">
        <div className="bg-white/5 px-8 py-5 border-b border-white/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal size={18} className="text-primary" />
            <span className="text-xs font-bold font-mono text-slate-400 tracking-widest uppercase">Kernel Node Console (OS_V1.0)</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-800" />
            <div className="w-3 h-3 rounded-full bg-slate-800" />
            <div className="w-3 h-3 rounded-full bg-primary/40 shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
          </div>
        </div>
        <div className="p-10 font-mono text-xs text-primary/60 space-y-3 bg-black/20">
          <div className="flex gap-6">
            <span className="text-slate-600">[0.000]</span>
            <span className="text-slate-300 italic">Starting ProcessVerse Kernel...</span>
            <span className="ml-auto text-green-500 font-bold">[ OK ]</span>
          </div>
          <div className="flex gap-6">
            <span className="text-slate-600">[0.002]</span>
            <span className="text-slate-300">Memory Allocation (4096MB) - Sector 0-F</span>
            <span className="ml-auto text-green-500 font-bold">[ SUCCESS ]</span>
          </div>
          <div className="flex gap-6">
            <span className="text-slate-600">[0.005]</span>
            <span className="text-slate-300">Loading High-Fidelity UI Drivers...</span>
            <span className="ml-auto text-green-500 font-bold">[ ACTIVE ]</span>
          </div>
          <div className="flex gap-6">
            <span className="text-slate-600">[0.008]</span>
            <span className="text-slate-300">Establishing Secure Tunnels...</span>
            <span className="ml-auto text-primary font-bold">[ TUNNEL_READY ]</span>
          </div>
          <div className="animate-pulse text-primary mt-4 font-black">SYSTEM_ONLINE_ {'>'}</div>
        </div>
      </section>
    </div>
  )
}
