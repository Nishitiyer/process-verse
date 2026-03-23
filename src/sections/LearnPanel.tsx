import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Cpu, 
  GitBranch, 
  Lock, 
  RefreshCcw, 
  Zap, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Activity,
  Layers
} from 'lucide-react'

const concepts = [
  {
    title: 'Process Management',
    icon: Cpu,
    color: 'text-primary',
    bg: 'bg-primary/10',
    desc: 'Learn about PCB, context switching, and scheduling algorithms like FCFS, SJF, and Round Robin.',
    topics: ['Process Life Cycle', 'Context Switching', 'Scheduling Metrics']
  },
  {
    title: 'Thread Engineering',
    icon: GitBranch,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    desc: 'Explore Light Weight Processes (LWP), kernel-level vs user-level threads, and multi-core execution.',
    topics: ['Hyperthreading', 'Thread Pools', 'Race Conditions']
  },
  {
    title: 'Deadlock Control',
    icon: Lock,
    color: 'text-accent',
    bg: 'bg-accent/10',
    desc: 'Understand the four necessary conditions for deadlock and the Banker\'s avoidance algorithm.',
    topics: ['Mutual Exclusion', 'Circular Wait', 'Safe States']
  },
  {
    title: 'Sync Mechanisms',
    icon: RefreshCcw,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    desc: 'Master semaphores, mutexes, and monitors. Solve the Dining Philosophers and Producer-Consumer problems.',
    topics: ['Atomic Operations', 'Critical Sections', 'Condition Variables']
  }
]

export const LearnPanel = () => {
  return (
    <div className="p-12 space-y-16 max-w-7xl mx-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between glass p-10 rounded-[3rem] border-white/[0.05]">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(0,243,255,0.15)]">
            <BookOpen size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">ProcessVerse Academy</h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={12} className="text-primary" /> 
              Curriculum Core: v2.0
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-6 py-4 rounded-2xl border border-white/10">
           <Activity size={16} className="text-primary animate-pulse" />
           Learning Pulse: Active
        </div>
      </div>

      {/* Concept Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {concepts.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card flex flex-col gap-10 group"
          >
             <div className="flex items-center justify-between">
                <div className={`p-5 rounded-3xl ${c.bg} ${c.color} shadow-inner`}>
                   <c.icon size={32} />
                </div>
                <div className="p-3 rounded-2xl glass border-white/5 text-slate-600 group-hover:text-primary transition-colors cursor-pointer">
                   <Maximize2 size={20} className="hidden" />
                   <ChevronRight size={24} />
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-3xl font-black italic tracking-tight">{c.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                   {c.desc}
                </p>
             </div>

             <div className="flex flex-wrap gap-2">
                {c.topics.map(topic => (
                  <span key={topic} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:border-primary/20 group-hover:text-slate-300 transition-all">
                     {topic}
                  </span>
                ))}
             </div>

             <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/50 group-hover:text-primary transition-colors">Start Module</span>
                <div className="flex gap-1">
                   {[1, 2, 3].map(dot => <div key={dot} className="w-1 h-1 rounded-full bg-slate-800" />)}
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Advanced Research Resources */}
      <section className="glass rounded-[3.5rem] p-16 border-white/[0.05] relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-16 text-primary/5 -z-10 group-hover:scale-110 transition-transform duration-1000">
            <Layers size={200} />
         </div>

         <div className="max-w-3xl space-y-10">
            <div className="space-y-4">
               <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mono">Advanced Engineering</h3>
               <h2 className="text-5xl font-black italic uppercase tracking-tighter italic">Deep Dive Resources</h2>
               <p className="text-slate-400 text-lg font-medium leading-relaxed">
                 Access peer-reviewed documentation, kernel source snippets, and advanced simulation parameters to extend your knowledge.
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[
                 'Kernel Synchronization Primitives',
                 'Advanced Scheduler Architecture',
                 'Memory Subsystem Engineering',
                 'Distributed Systems Logic'
               ].map((res) => (
                 <div key={res} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-between group/res cursor-pointer hover:bg-white/[0.05] transition-all">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{res}</span>
                    <ExternalLink size={16} className="text-slate-600 group-hover/res:text-primary transition-colors" />
                 </div>
               ))}
            </div>
            
            <button className="btn-primary px-10 py-4 flex items-center gap-3 text-sm">
               Open Knowledge Base
               <Zap size={18} fill="currentColor" />
            </button>
         </div>
         
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </section>
    </div>
  )
}

const Maximize2 = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
  </svg>
)
