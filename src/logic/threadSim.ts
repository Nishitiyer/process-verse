export type ThreadState = 'ready' | 'running' | 'blocked' | 'terminated';

export interface Thread {
  id: number;
  processId: number;
  state: ThreadState;
  progress: number; // 0 to 100
  color: string;
  load: number; // simulated work units
  resourceId?: string | null;
  arrivalTime: number;
  burstTime: number;
  remainingTime: number;
  priority: number;
  waitingTime: number;
  turnaroundTime: number;
  finishTime?: number;
}

export type ThreadSchedulingAlgorithm = 'FCFS' | 'SJF' | 'RR' | 'Priority';

export const getNextThread = (
  threads: Thread[], 
  algorithm: ThreadSchedulingAlgorithm
): Thread | null => {
  const readyThreads = threads.filter(t => t.state === 'ready');
  if (readyThreads.length === 0) return null;

  switch (algorithm) {
    case 'FCFS':
      return readyThreads.sort((a, b) => a.arrivalTime - b.arrivalTime)[0];
    case 'SJF':
      return readyThreads.sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime)[0];
    case 'Priority':
      return readyThreads.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime)[0];
    case 'RR':
      return readyThreads[0];
    default:
      return readyThreads[0];
  }
};

export const THREAD_COLORS = [
  '#00f3ff', // Cyan
  '#9d00ff', // Purple
  '#ff004c', // Red
  '#00ff8a', // Green
];

export const createThread = (id: number, processId: number, arrival: number, burst: number, priority: number): Thread => ({
  id,
  processId,
  state: 'ready',
  progress: 0,
  color: THREAD_COLORS[id % THREAD_COLORS.length],
  load: burst,
  arrivalTime: arrival,
  burstTime: burst,
  remainingTime: burst,
  priority: priority,
  waitingTime: 0,
  turnaroundTime: 0,
});
