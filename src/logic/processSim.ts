export type ProcessState = 'new' | 'ready' | 'running' | 'waiting' | 'terminated';

export interface Process {
  id: number;
  name: string;
  arrivalTime: number;
  burstTime: number;
  remainingTime: number;
  priority: number;
  state: ProcessState;
  startTime?: number;
  finishTime?: number;
  waitingTime: number;
  turnaroundTime: number;
  color: string;
}

export type SchedulingAlgorithm = 'FCFS' | 'SJF' | 'RR' | 'Priority';

export const COLORS = [
  '#00f3ff', // Cyan
  '#9d00ff', // Purple
  '#ff004c', // Red
  '#ff8a00', // Orange
  '#00ff8a', // Green
  '#0066ff', // Blue
];

export const createProcess = (id: number, arrival: number, burst: number, priority: number): Process => ({
  id,
  name: `P${id}`,
  arrivalTime: arrival,
  burstTime: burst,
  remainingTime: burst,
  priority,
  state: 'new',
  waitingTime: 0,
  turnaroundTime: 0,
  color: COLORS[id % COLORS.length],
});

// Scheduling logic (simplified for simulation steps)
export const getNextProcess = (
  readyQueue: Process[], 
  algorithm: SchedulingAlgorithm,
  _currentTime: number
): Process | null => {
  if (readyQueue.length === 0) return null;

  switch (algorithm) {
    case 'FCFS':
      return readyQueue.sort((a, b) => a.arrivalTime - b.arrivalTime)[0];
    case 'SJF':
      return readyQueue.sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime)[0];
    case 'Priority':
      return readyQueue.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime)[0];
    case 'RR':
      return readyQueue[0]; // Round Robin usually takes the head
    default:
      return readyQueue[0];
  }
};
