export type SyncProblem = 'ProducerConsumer' | 'DiningPhilosophers' | 'MutexDemo' | 'ReadersWriters';

export interface SyncState {
  buffer: number[];
  bufferSize: number;
  mutex: boolean;
  empty: number;
  full: number;
}

export const initialSyncState: SyncState = {
  buffer: [],
  bufferSize: 8,
  mutex: false,
  empty: 8,
  full: 0
};
