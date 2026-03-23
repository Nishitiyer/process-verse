import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, BookOpen, Terminal, ChevronRight, Binary, Calculator } from 'lucide-react'

interface AlgorithmDeepDiveProps {
  algorithm: 'FCFS' | 'SJF' | 'Priority' | 'RR'
}

type TheoryData = {
  title: string
  description: string
  formulas: string[]
  code: string
}

const THEORY_DICT: Record<'FCFS' | 'SJF' | 'Priority' | 'RR', TheoryData> = {
  FCFS: {
    title: 'First-Come, First-Served (FCFS)',
    description: 'The simplest scheduling algorithm. Processes are dispatched according to their arrival time on the ready queue. Being a non-preemptive algorithm, once the CPU has been allocated to a process, that process keeps the CPU until it releases it, either by terminating or by requesting I/O.',
    formulas: [
      'Completion Time (CT) = Time when process fully completes execution',
      'Turnaround Time (TAT) = Completion Time - Arrival Time',
      'Waiting Time (WT) = Turnaround Time - Burst Time',
    ],
    code: `// FCFS Scheduling Algorithm (Menu Driven) in C
#include <stdio.h>
#include <stdlib.h>

void executeFCFS() {
    int n;
    printf("Enter number of processes: ");
    scanf("%d", &n);
    
    int arrival[n], burst[n], waiting[n], turnaround[n], completion[n];
    int total_wt = 0, total_tat = 0;
    
    for(int i = 0; i < n; i++) {
        printf("Enter Arrival Time and Burst Time for P%d: ", i+1);
        scanf("%d %d", &arrival[i], &burst[i]);
    }
    
    // Sort by arrival time logic omitted for brevity
    
    completion[0] = arrival[0] + burst[0];
    turnaround[0] = completion[0] - arrival[0];
    waiting[0] = turnaround[0] - burst[0];
    
    for (int i = 1; i < n; i++) {
        int temp = completion[i-1] < arrival[i] ? arrival[i] : completion[i-1];
        completion[i] = temp + burst[i];
        turnaround[i] = completion[i] - arrival[i];
        waiting[i] = turnaround[i] - burst[i];
    }
    
    printf("\\nProcess\\t Arrival\\t Burst\\t Waiting\\t Turnaround\\n");
    for (int i = 0; i < n; i++) {
        total_wt += waiting[i];
        total_tat += turnaround[i];
        printf("P%d\\t %d\\t\\t %d\\t %d\\t\\t %d\\n", i+1, arrival[i], burst[i], waiting[i], turnaround[i]);
    }
    printf("\\nAverage Waiting Time: %.2f", (float)total_wt / n);
    printf("\\nAverage Turnaround Time: %.2f\\n", (float)total_tat / n);
}

int main() {
    int choice;
    while(1) {
        printf("\\n--- CPU Scheduling ---\\n1. Run FCFS\\n2. Exit\\nEnter choice: ");
        scanf("%d", &choice);
        if(choice == 1) executeFCFS();
        else break;
    }
    return 0;
}`
  },
  SJF: {
    title: 'Shortest Job First (SJF)',
    description: 'A scheduling dispatch algorithm that selects the waiting process with the smallest execution (burst) time. SJF is proven to yield the absolute minimum average waiting time for a given set of processes. It can be preemptive (SRTF) or non-preemptive.',
    formulas: [
      'Selection Criteria: Process with minimum Burst Time currently in Ready Queue',
      'Turnaround Time (TAT) = Completion Time - Arrival Time',
      'Waiting Time (WT) = Turnaround Time - Burst Time',
    ],
    code: `// Non-Preemptive SJF Algorithm in C
#include <stdio.h>

void executeSJF() {
    int n, temp, total_wt = 0, total_tat = 0;
    printf("Enter number of processes: ");
    scanf("%d", &n);
    
    int p[n], burst[n], waiting[n], turnaround[n];
    for (int i = 0; i < n; i++) {
        p[i] = i+1;
        printf("Enter Burst Time for P%d: ", i+1);
        scanf("%d", &burst[i]);
    }
    
    // Sorting burst times (Selection Sort)
    for (int i = 0; i < n; i++) {
        int pos = i;
        for (int j = i + 1; j < n; j++) {
            if (burst[j] < burst[pos]) pos = j;
        }
        
        temp = burst[i]; burst[i] = burst[pos]; burst[pos] = temp;
        temp = p[i]; p[i] = p[pos]; p[pos] = temp;
    }
    
    waiting[0] = 0; // First process waits 0
    for (int i = 1; i < n; i++) {
        waiting[i] = 0;
        for (int j = 0; j < i; j++) waiting[i] += burst[j];
    }
    
    printf("\\nProcess\\t Burst\\t Waiting\\t Turnaround\\n");
    for (int i = 0; i < n; i++) {
        turnaround[i] = burst[i] + waiting[i];
        total_wt += waiting[i];
        total_tat += turnaround[i];
        printf("P%d\\t %d\\t %d\\t\\t %d\\n", p[i], burst[i], waiting[i], turnaround[i]);
    }
    printf("\\nAverage Waiting Time: %.2f\\n", (float)total_wt / n);
}

int main() {
    int choice;
    while(1) {
        printf("\\n--- CPU Scheduling ---\\n1. Run SJF\\n2. Exit\\nEnter choice: ");
        scanf("%d", &choice);
        if(choice == 1) executeSJF();
        else break;
    }
    return 0;
}`
  },
  Priority: {
    title: 'Priority Scheduling',
    description: 'Each process is assigned a priority. The CPU is allocated to the process with the highest priority (often represented by the lowest integer value). If priorities are equal, FCFS rules apply. Preemptive priority scheduling can eject a running process if a higher priority one arrives.',
    formulas: [
      'Selection Criteria: Min(Priority_Value) where 0 is highest priority',
      'Turnaround Time (TAT) = Completion Time - Arrival Time',
      'Waiting Time (WT) = Turnaround Time - Burst Time',
    ],
    code: `// Priority Scheduling Algorithm in C
#include <stdio.h>

void executePriority() {
    int n, temp, total_wt = 0, total_tat = 0;
    printf("Enter number of processes: ");
    scanf("%d", &n);
    
    int p[n], burst[n], priority[n], waiting[n], turnaround[n];
    for (int i = 0; i < n; i++) {
        p[i] = i+1;
        printf("Enter Burst Time and Priority for P%d: ", i+1);
        scanf("%d %d", &burst[i], &priority[i]);
    }
    
    // Sorting by Priority
    for (int i = 0; i < n; i++) {
        int pos = i;
        for (int j = i + 1; j < n; j++) {
            if (priority[j] < priority[pos]) pos = j;
        }
        
        temp = priority[i]; priority[i] = priority[pos]; priority[pos] = temp;
        temp = burst[i]; burst[i] = burst[pos]; burst[pos] = temp;
        temp = p[i]; p[i] = p[pos]; p[pos] = temp;
    }
    
    waiting[0] = 0;
    for (int i = 1; i < n; i++) {
        waiting[i] = 0;
        for (int j = 0; j < i; j++) waiting[i] += burst[j];
    }
    
    printf("\\nProcess\\t Burst\\t Priority\\t Waiting\\t Turnaround\\n");
    for (int i = 0; i < n; i++) {
        turnaround[i] = burst[i] + waiting[i];
        total_wt += waiting[i];
        total_tat += turnaround[i];
        printf("P%d\\t %d\\t %d\\t\\t %d\\t\\t %d\\n", p[i], burst[i], priority[i], waiting[i], turnaround[i]);
    }
    printf("\\nAvg Waiting Time: %.2f", (float)total_wt / n);
}

int main() {
    int choice;
    while(1) {
        printf("\\n--- CPU Scheduling ---\\n1. Run Priority\\n2. Exit\\nEnter: ");
        scanf("%d", &choice);
        if(choice == 1) executePriority();
        else break;
    }
    return 0;
}`
  },
  RR: {
    title: 'Round Robin (RR)',
    description: 'Designed highly for timesharing systems. It passes the CPU sequentially across all ready processes, where each process is granted execution time equal to a static Time Quantum. If a process burst exceeds the quantum, it is preempted and sent to the back of the ready queue.',
    formulas: [
      'Preemption Interval = Time Quantum (TQ)',
      'Remaining Burst Time = Initial Burst - Executed TQ',
      'Turnaround Time (TAT) = Completion Time - Arrival Time',
    ],
    code: `// Round Robin Algorithm in C
#include <stdio.h>

void executeRR() {
    int n, quantum, count = 0, temp, sq = 0;
    float total_wt = 0, total_tat = 0;
    
    printf("Enter number of processes: ");
    scanf("%d", &n);
    int burst[n], rem_burst[n], waiting[n], turnaround[n];
    
    for (int i = 0; i < n; i++) {
        printf("Enter Burst Time for P%d: ", i+1);
        scanf("%d", &burst[i]);
        rem_burst[i] = burst[i];
    }
    
    printf("Enter Time Quantum: ");
    scanf("%d", &quantum);
    
    while(1) {
        int done = 1;
        for(int i = 0; i < n; i++) {
            if(rem_burst[i] > 0) {
                done = 0;
                if(rem_burst[i] > quantum) {
                    sq += quantum;
                    rem_burst[i] -= quantum;
                } else {
                    sq = sq + rem_burst[i];
                    waiting[i] = sq - burst[i];
                    rem_burst[i] = 0;
                }
            }
        }
        if(done == 1) break;
    }
    
    printf("\\nProcess\\t Burst\\t Waiting\\t Turnaround\\n");
    for(int i = 0; i < n; i++) {
        turnaround[i] = burst[i] + waiting[i];
        total_wt += waiting[i];
        total_tat += turnaround[i];
        printf("P%d\\t %d\\t %d\\t\\t %d\\n", i+1, burst[i], waiting[i], turnaround[i]);
    }
}

int main() {
    int ch;
    while(1) {
        printf("\\n--- CPU Scheduling ---\\n1. Run Round Robin\\n2. Exit\\nInput: ");
        scanf("%d", &ch);
        if(ch == 1) executeRR();
        else break;
    }
    return 0;
}`
  }
}

export const AlgorithmDeepDive = ({ algorithm }: AlgorithmDeepDiveProps) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'code'>('theory')
  const data = THEORY_DICT[algorithm]

  return (
    <div className="mt-12 w-full mx-auto max-w-7xl">
       <div className="glass-card flex flex-col overflow-hidden relative border-white/[0.05]">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between p-8 border-b border-white/5 bg-black/20">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(0,243,255,0.15)]">
                 <Binary size={24} />
               </div>
               <div>
                  <h2 className="text-xl font-black italic uppercase tracking-tighter">{data.title}</h2>
                  <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <ChevronRight size={12} className="text-primary" /> 
                    Live Algorithm Deep Dive Breakdown
                  </p>
               </div>
             </div>

             <div className="mt-6 md:mt-0 flex items-center bg-black/40 border border-white/5 p-1 rounded-2xl">
               <button 
                  onClick={() => setActiveTab('theory')}
                  className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'theory' ? 'bg-primary/20 text-primary scale-95 shadow-inner' : 'text-slate-400 hover:text-white'}`}
               >
                 <span className="flex items-center gap-2"><BookOpen size={14} /> Theory & Logic</span>
               </button>
               <button 
                  onClick={() => setActiveTab('code')}
                  className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'code' ? 'bg-accent/20 text-accent scale-95 shadow-inner' : 'text-slate-400 hover:text-white'}`}
               >
                 <span className="flex items-center gap-2"><Code2 size={14} /> C Program</span>
               </button>
             </div>
          </div>

          {/* Content Body */}
          <div className="p-8 relative min-h-[400px]">
             <AnimatePresence mode="wait">
                {activeTab === 'theory' ? (
                  <motion.div
                    key="theory-tab"
                    initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                  >
                     <div className="space-y-6">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                           <BookOpen size={16} className="text-primary" /> Principles of Operation
                        </h3>
                        <p className="text-slate-300 leading-relaxed font-medium">
                           {data.description}
                        </p>
                        
                        <div className="pt-6 space-y-4">
                           <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                             <Calculator size={16} className="text-secondary" /> Applied Formulas
                           </h3>
                           <div className="space-y-3">
                              {data.formulas.map((formula, idx) => (
                                <div key={idx} className="bg-slate-900/50 border border-white/5 px-4 py-3 rounded-xl font-mono text-xs text-primary/90 flex shadow-inner">
                                   <span className="text-slate-500 mr-3">[{idx + 1}]</span>
                                   {formula}
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>
                     <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-[2rem] border border-primary/10 overflow-hidden flex flex-col items-center justify-center p-8 text-center relative shadow-[inset_0_0_50px_rgba(0,243,255,0.05)]">
                        <Terminal size={48} className="text-primary/20 mb-6" />
                        <h4 className="text-primary font-black uppercase tracking-widest mb-2">Algorithm Selected</h4>
                        <div className="text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 opacity-80">
                           {algorithm}
                        </div>
                        <p className="text-slate-400 mt-4 text-xs max-w-xs font-mono">
                           Modify values in the actual Control Unit above. The live Gantt chart perfectly mirrors this core theory.
                        </p>
                     </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="code-tab"
                    initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                    className="w-full relative"
                  >
                     <div className="absolute top-0 right-0 px-4 py-2 bg-accent/10 border border-accent/20 rounded-bl-2xl rounded-tr-xl flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Menu Driven C Code</span>
                     </div>
                     <pre className="p-8 rounded-3xl bg-slate-950 border border-white/10 overflow-x-auto text-[13px] text-slate-300 font-mono shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] custom-scrollbar">
                        <code>{data.code}</code>
                     </pre>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
       </div>
    </div>
  )
}
