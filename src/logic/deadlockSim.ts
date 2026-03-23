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
): { safe: boolean; sequence: number[] } => {
  let work = [...available];
  let finish = new Array(processes.length).fill(false);
  let safeSequence: number[] = [];

  for (let k = 0; k < processes.length; k++) {
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
        }
      }
    }
  }

  return {
    safe: finish.every(f => f),
    sequence: safeSequence
  };
};
