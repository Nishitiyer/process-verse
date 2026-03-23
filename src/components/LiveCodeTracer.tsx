import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Code2 } from 'lucide-react'
import { useEffect, useRef } from 'react'

export interface TraceLog {
  id: string
  code: string
  explanation: string
  timestamp: string
}

interface LiveCodeTracerProps {
  logs: TraceLog[]
}

export const LiveCodeTracer = ({ logs }: LiveCodeTracerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="w-full glass-card border-accent/20 overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-[2rem]">
      <div className="bg-black/60 border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <Terminal size={18} className="text-accent" />
           <span className="text-xs font-black uppercase tracking-widest text-slate-300">Live Hardware Trace</span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="p-6 h-64 overflow-y-auto font-mono space-y-4 bg-[#0a0a0f]"
        style={{ scrollBehavior: 'smooth' }}
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              className="border-l-2 border-accent/50 pl-4 py-1"
            >
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                 <span className="text-slate-600 text-[10px] whitespace-nowrap">[{log.timestamp}]</span>
                 <span className="text-accent font-bold tracking-tight bg-accent/10 px-2 py-0.5 rounded text-[13px]">{log.code}</span>
              </div>
              <div className="text-slate-400 text-[11px] flex items-start gap-2 leading-relaxed">
                 <Code2 size={12} className="text-secondary opacity-50 mt-0.5 flex-shrink-0" />
                 <span className="font-sans font-medium">{log.explanation}</span>
              </div>
            </motion.div>
          ))}
          {logs.length === 0 && (
             <div className="h-full flex items-center justify-center text-slate-600 font-black tracking-[0.2em] text-xs uppercase italic pt-12">
                Awaiting Hardware Execution Blocks...
             </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
