export interface Resource {
  id: string;
  name: string;
  total: number;
  available: number;
  color: string;
}

export interface DeadlockProcess {
  id: number;
  name: string;
  allocation: number[];
  max: number[];
  need: number[];
  color: string;
}

export const checkSafeState = (
  processes: DeadlockProcess[],
  available: number[]
): { safe: boolean; sequence: number[]; starved: number[] } => {
  let work = [...available];
  let finish = new Array(processes.length).fill(false);
  let safeSequence: number[] = [];

  // Repeatedly try to find a process that can finish
  let progress = true;
  while (progress) {
    progress = false;
    for (let i = 0; i < processes.length; i++) {
      if (!finish[i]) {
        let canAllocate = true;
        for (let j = 0; j < work.length; j++) {
          if (processes[i].need[j] > work[j]) {
            canAllocate = false;
            break;
          }
        }

        if (canAllocate) {
          for (let j = 0; j < work.length; j++) {
            work[j] += processes[i].allocation[j];
          }
          finish[i] = true;
          safeSequence.push(processes[i].id);
          progress = true; // We made progress, check everything again
        }
      }
    }
  }

  // Any process where finish[i] is false is starved
  let starved: number[] = [];
  for (let i = 0; i < processes.length; i++) {
    if (!finish[i]) {
      starved.push(processes[i].id);
    }
  }

  return {
    safe: finish.every(f => f),
    sequence: safeSequence,
    starved
  };
};
