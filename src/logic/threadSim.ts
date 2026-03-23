export type ThreadState = 'ready' | 'running' | 'blocked' | 'terminated';

export interface Thread {
  id: number;
  processId: number;
  state: ThreadState;
  progress: number; // 0 to 100
  color: string;
  load: number; // simulated work units
  resourceId?: string | null;
}

export interface ThreadProcess {
  id: number;
  name: string;
  threads: Thread[];
  sharedMemory: number;
}

export const THREAD_COLORS = [
  '#00f3ff', // Cyan
  '#9d00ff', // Purple
  '#ff004c', // Red
  '#00ff8a', // Green
];

export const createThread = (id: number, processId: number): Thread => ({
  id,
  processId,
  state: 'ready',
  progress: 0,
  color: THREAD_COLORS[id % THREAD_COLORS.length],
  load: Math.random() * 50 + 20,
});
