# Process-Verse: The Definitive OS Architecture Encyclopedia

## CHAPTER 1: PROCESS SCHEDULING (Theory & Strategy)

### 1.1 CPU vs I/O Bound Processes
- **CPU-Bound**: Processes that spend most of their time doing computations (e.g., video rendering, mathematical simulations).
- **I/O-Bound**: Processes that spend most of their time waiting for Input/Output (e.g., database queries, web browsers). 
*Our simulator focuses on CPU-Bound scheduling to demonstrate algorithm efficiency.*

### 1.2 The Scheduling Hierarchy
1.  **Long-Term (Job Scheduler)**: High-level selection of which processes enter the system.
2.  **Short-Term (CPU Scheduler)**: The "Fast" scheduler that picks the next process for the CPU (This is what `ProcessManagement.tsx` simulates).
3.  **Medium-Term**: Handles swapping processes between RAM and Disk (Swapping).

### 1.3 Detailed Examples

#### FCFS vs SJF Comparison
| Process | Arrival | Burst | FCFS Finish | SJF Finish |
|---------|---------|-------|-------------|------------|
| P1      | 0       | 10    | 10          | 10         |
| P2      | 2       | 2     | 12          | 4 (Preempt)|
| P3      | 2       | 1     | 13          | 5 (Preempt)|

**Conclusion**: SJF drastically reduces the **Average Waiting Time** by allowing short jobs to "jump" ahead of long ones.

---

## CHAPTER 2: DEADLOCKS (Advanced Logic)

### 2.1 Recovery vs Avoidance
- **Avoidance (Banker's)**: We check if granting a resource *could* lead to a deadlock. If so, we say "No."
- **Recovery**: We let the deadlock happen, then handle it by "Killing" a process or "Preempting" its resources.
- **Prevention**: We change the rules (e.g., "Processes must request all resources at once") so deadlocks are mathematically impossible.

### 2.2 Banker's Algorithm Real-World Analogy
Think of a **Construction Site**. 
- The **Banker** is the Site Manager. 
- The **Resources** are Cranes and Cement Mixers. 
- If Process A needs 2 Cranes to finish, but the Manager only has 1, the Manager makes A wait until someone else releases a Crane. If the Manager gives the Crane to B (who also can't finish), the whole site stalls.

---

## CHAPTER 3: SYNCHRONIZATION (Deep Concepts)

### 3.1 Requirements for Solution
To solve the Critical Section problem, 3 conditions must be met:
1.  **Mutual Exclusion**: Only one process inside.
2.  **Progress**: If no one is inside, and someone wants to enter, the decision cannot be delayed indefinitely.
3.  **Bounded Waiting**: There must be a limit on how many others can "jump the line" before you get your turn.

### 3.2 Synchronization Variations
- **Spinlock**: A process "spins" in a loop checking for a lock. (Used in multiprocessor systems).
- **Mutex**: A sleep-based lock. If you can't get in, you go to sleep.
- **Semaphores**: Can allow *N* processes to enter (Counting) or just 1 (Binary).

---

## CHAPTER 4: THE MASTER VIVA CHEAT SHEET (Detailed Answers)

### Q1: What is a "System Call"?
**Detailed Answer**: A system call is the programmatic way in which a computer program requests a service from the kernel of the operating system it is executed on. This may include hardware-related services (for example, accessing a hard disk drive), creation and execution of new processes, and communication with integral kernel services such as process scheduling. System calls provide an essential interface between a process and the operating system.

### Q2: Interrupts vs Traps?
**Detailed Answer**: An **Interrupt** is a hardware-generated signal sent to the CPU (like a timer or keyboard press). A **Trap** (or Exception) is a software-generated interrupt caused by an error (like division by zero) or a user request (like a system call).

### Q3: What is "Context Switch Overhead"?
**Detailed Answer**: It is the "wasted" time during which the CPU is doing context switching instead of executing user code. During this time, the kernel must save the PCB (Process Control Block) of the old process and load the PCB of the new one. High overhead (caused by a very small RR quantum) makes the system feel slow.

### Q4: Explain "Preemptive Scheduling" with an example.
**Detailed Answer**: Preemptive scheduling is when the OS forcibly takes the CPU away from a process to give it to another. **Example**: In our SRTF simulator, if P1 is running and has 8 seconds left, but P2 arrives and only needs 2 seconds, the OS "preempts" P1 and gives the CPU to P2 because it's shorter. 

### Q5: What is the "Critical Section Problem"?
**Detailed Answer**: It is the problem of designing a protocol that processes can use to cooperate. Each process must request permission to enter its critical section. The section of code that implements this request is the entry section. The critical section may be followed by an exit section. The remaining code is the remainder section.

### Q6: Can Deadlock happen with a single resource?
**Detailed Answer**: No. Deadlock requires at least the **Circular Wait** condition, which logically requires at least two processes and two resources (or two instances) where each is waiting for what the other holds.

### Q7: What is "Belady's Anomaly"?
**Detailed Answer**: Belady's Anomaly is the name given to the phenomenon where increasing the number of page frames results in an increase in the number of page faults for certain page-replacement algorithms. This is most commonly seen in the FIFO algorithm. It happens because FIFO doesn't consider the "frequency" or "recency" of page use.

### Q8: What is "Multilevel Feedback Queue" (MLFQ)?
**Detailed Answer**: It is a complex scheduling algorithm that moves processes between several queues based on their priority and CPU-burst behavior. If a process uses too much CPU time, it is moved to a lower-priority queue. If it waits too long in a lower queue, it is "Aged" and moved up. This handles both I/O-bound and CPU-bound processes efficiently.

### Q9: What is "Priority Inversion"?
**Detailed Answer**: This occurs when a higher-priority process is blocked by a lower-priority process that holds a required resource. If a medium-priority process then preempts the lower-priority one, the higher-priority process is effectively delayed by the medium-priority one. This was famously a bug with the **Mars Pathfinder** rover.

### Q10: Difference between "Starvation" and "Deadlock"?
**Detailed Answer**: **Starvation** is when a process is perpetually denied resources (the system keeps running, but one guy is left out). **Deadlock** is when a group of processes are all waiting for each other, and the entire system (or that specific part of it) stops moving entirely.

### Q11: What is "Safe State" in Banker's Algorithm?
**Detailed Answer**: A state is safe if the system can allocate resources to each process (up to its maximum) in some order and still avoid a deadlock. A safe state is not a deadlock state, and conversely, a deadlock state is an unsafe state. However, not all unsafe states are deadlocks.

### Q12: What is "Internal Fragmentation"?
**Detailed Answer**: This occurs when memory is allocated in fixed-size blocks (like Paging). If a process needs 7KB but the system only gives 8KB blocks, the 1KB left over "inside" the block is wasted.

### Q13: What is "External Fragmentation"?
**Detailed Answer**: This occurs when total memory space exists to satisfy a request, but it is not contiguous (it is broken into many small holes). We solve this using **Segmentation** or **Compaction**.

---

## CHAPTER 5: SOFTWARE ARCHITECTURE (Code Internals)

### 5.1 The Virtual Heartbeat (`tick()`)
The `tick()` function in `ProcessManagement.tsx` is the "Kernel Heartbeat." It runs on a 500ms interval and acts as the **Hardware Clock**.
1. It creates a **Snapshot** of the current state.
2. Performs **Arrival Detection**.
3. Performs **Preemption Logic**.
4. Updates **Gantt Segments**.

### 5.2 Simulation State (`simState`)
Acting as the **Virtual RAM**, `simState` stores the PCB (Process Control Block) for every process. Changes to this state trigger React to re-render the visually dense UI.
