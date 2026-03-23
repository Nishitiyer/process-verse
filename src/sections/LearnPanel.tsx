import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Code2, ChevronRight, GraduationCap, Lightbulb } from 'lucide-react'

const theoryItems = [
  {
    id: 'process',
    title: 'Process Management',
    description: 'A process is an instance of a computer program that is being executed. It contains the program code and its current activity.',
    analogy: 'Think of a recipe (program) being cooked by a chef (CPU). The actual cooking session is the Process.',
    cCode: `#include <stdio.h>
#include <unistd.h>

int main() {
    pid_t pid = fork();
    if (pid < 0) {
        printf("Fork Failed\\n");
    } else if (pid == 0) {
        printf("Child Process: ID %d\\n", getpid());
    } else {
        printf("Parent Process: ID %d\\n", getpid());
    }
    return 0;
}`
  },
  {
    id: 'thread',
    title: 'Thread Management',
    description: 'Threads are the smallest unit of execution within a process. Multiple threads share the same address space but have their own stack.',
    analogy: 'Multiple workers in the same kitchen sharing the same ingredients but doing different tasks.',
    cCode: `#include <pthread.h>
#include <stdio.h>

void* print_hello(void* id) {
    printf("Thread %ld starting...\\n", (long)id);
    return NULL;
}

int main() {
    pthread_t threads[2];
    for (long i = 0; i < 2; i++)
        pthread_create(&threads[i], NULL, print_hello, (void*)i);
    for (int i = 0; i < 2; i++)
        pthread_join(threads[i], NULL);
    return 0;
}`
  },
  {
    id: 'deadlock',
    title: 'Deadlock & Banker\'s',
    description: 'Deadlock is a situation where a set of processes are blocked because each is holding a resource and waiting for another resource held by another process.',
    analogy: 'Two people trying to pass each other on a narrow bridge, neither willing to step back.',
    cCode: `// Banker's Algorithm Allocation Step
void allocate(int res[], int need[], int avail[]) {
    for (int i = 0; i < RESOURCES; i++) {
        if (need[i] <= avail[i]) {
            avail[i] += allocation[i];
            finish[i] = 1;
        }
    }
}`
  },
  {
    id: 'sync',
    title: 'Synchronization',
    description: 'Mechanism to ensure that two or more concurrent processes or threads do not simultaneously execute a critical section.',
    analogy: 'A key to a single bathroom - whoever has the key gets in; others must wait.',
    cCode: `#include <semaphore.h>
sem_t mutex;

void* thread_func(void* arg) {
    sem_wait(&mutex); // Lock
    // Critical Section
    sem_post(&mutex); // Unlock
}`
  }
]

export const LearnPanel = () => {
  const [selectedId, setSelectedId] = useState<string | null>(theoryItems[0].id)

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <GraduationCap size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-100 uppercase tracking-tight">Theory Academy</h1>
          <p className="text-slate-400">Master the fundamental concepts of Operating Systems.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-1 overflow-hidden">
        {/* Navigation List */}
        <div className="lg:col-span-4 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          {theoryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`w-full text-left p-6 rounded-3xl transition-all duration-300 group border ${
                selectedId === item.id 
                ? 'bg-indigo-500/10 border-indigo-500/30 shadow-lg' 
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className={`font-bold transition-colors ${selectedId === item.id ? 'text-indigo-400' : 'text-slate-400'}`}>
                  {item.title}
                </h3>
                <ChevronRight size={18} className={selectedId === item.id ? 'text-indigo-400' : 'text-slate-600'} />
              </div>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{item.description}</p>
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="lg:col-span-8 glass rounded-[2.5rem] border-slate-800 p-10 flex flex-col gap-10 overflow-hidden relative">
           <AnimatePresence mode="wait">
             {selectedId && (
               <motion.div 
                 key={selectedId}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="flex flex-col gap-10 h-full overflow-y-auto pr-4 custom-scrollbar"
               >
                  <div className="space-y-4">
                    <h2 className="text-4xl font-extrabold text-slate-100 flex items-center gap-4">
                       <BookOpen size={36} className="text-indigo-500" />
                       {theoryItems.find(t => t.id === selectedId)?.title}
                    </h2>
                    <p className="text-lg text-slate-300 leading-relaxed font-medium">
                      {theoryItems.find(t => t.id === selectedId)?.description}
                    </p>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden">
                     <Lightbulb className="absolute top-4 right-4 text-indigo-500/20" size={80} />
                     <h4 className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-3">Real-Life Analogy</h4>
                     <p className="text-slate-200 italic text-lg leading-relaxed relative z-10">
                       "{theoryItems.find(t => t.id === selectedId)?.analogy}"
                     </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-[0.2em]">
                          <Code2 size={16} />
                          C Implementation Example
                       </div>
                       <button className="text-[10px] uppercase font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Copy Snippet</button>
                    </div>
                    <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 font-mono text-sm leading-relaxed text-indigo-100 shadow-inner">
                       <pre className="whitespace-pre-wrap">
                          {theoryItems.find(t => t.id === selectedId)?.cCode}
                       </pre>
                    </div>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
