import{r as ue,j as e,m as b,C as F,a as E,G as A,A as C,S as $,T as re,L as O,b as de,c as o,B as fe,d as G,e as ge,f as P,g as be,P as W,h as U,R as q,i as xe,k as D,Z as R,l as ie,n as Y,D as ne,o as je,p as le,q as ye,s as ve,t as Ne,U as we,u as me,M as ke,v as Q,w as _e,x as X,X as Z,Y as ee,y as te,z as Se,E as Te,F as Le,H as Pe,I as oe,J as Ce,K as Ee,N as Ae}from"./vendor-BGgU9Mpb.js";(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const m of s)if(m.type==="childList")for(const l of m.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(s){const m={};return s.integrity&&(m.integrity=s.integrity),s.referrerPolicy&&(m.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?m.credentials="include":s.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function r(s){if(s.ep)return;s.ep=!0;const m=a(s);fetch(s.href,m)}})();var ae={},ce=ue;ae.createRoot=ce.createRoot,ae.hydrateRoot=ce.hydrateRoot;const Re=({onStart:t})=>{const d=[{label:"Processes",value:"24",icon:E,color:"text-primary"},{label:"Active Threads",value:"142",icon:A,color:"text-secondary"},{label:"Kernel Uptime",value:"99.9%",icon:C,color:"text-green-500"},{label:"Security",value:"Level 4",icon:$,color:"text-accent"}],a=[{title:"Process Management",desc:"Visualize scheduling algorithms with interactive Gantt charts.",icon:E,id:"processes"},{title:"Multithreading",desc:"Simulate thread lifecycle and resource contention.",icon:A,id:"threads"},{title:"Deadlock Control",desc:"Prevent resource starvation using Banker's algorithm.",icon:O,id:"deadlocks"}];return e.jsxs("div",{className:"p-12 space-y-16 max-w-7xl mx-auto",children:[e.jsxs("section",{className:"relative overflow-hidden rounded-[4rem] glass p-20 flex flex-col items-center text-center gap-10 border-white/[0.05]",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 -z-10"}),e.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"}),e.jsxs(b.div,{initial:{scale:.95,opacity:0},animate:{scale:1,opacity:1},transition:{duration:1,ease:[.23,1,.32,1]},className:"flex flex-col items-center",children:[e.jsx("div",{className:"px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 mb-8 mono",children:"Next-Gen Operating System Simulator"}),e.jsxs("h1",{className:"text-8xl md:text-9xl font-black tracking-tighter leading-none mb-4 italic",children:["PROCESS",e.jsx("span",{className:"text-primary",children:"VERSE"})]}),e.jsx("p",{className:"max-w-3xl text-xl text-slate-400 leading-relaxed font-medium",children:"Experience the internal mechanics of modern computing through a futuristic, high-fidelity simulator. Visualize, analyze, and master OS core concepts."})]}),e.jsxs("div",{className:"flex gap-6 mt-6",children:[e.jsxs("button",{onClick:t,className:"btn-primary flex items-center gap-4 text-base px-10 py-4",children:["Launch Core Simulator",e.jsx(F,{size:20})]}),e.jsx("button",{className:"btn-secondary text-base px-10 py-4",children:"Documentation"})]}),e.jsx("div",{className:"absolute -bottom-24 -left-24 w-80 h-80 bg-primary/10 blur-[100px] rounded-full"}),e.jsx("div",{className:"absolute -top-24 -right-24 w-80 h-80 bg-secondary/10 blur-[100px] rounded-full"})]}),e.jsx("section",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:d.map((r,s)=>e.jsxs(b.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.2+s*.1,duration:.6},className:"glass-card flex items-center gap-6",children:[e.jsx("div",{className:`p-5 rounded-3xl bg-white/[0.03] border border-white/[0.05] ${r.color} shadow-inner`,children:e.jsx(r.icon,{size:28})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1",children:r.label}),e.jsx("div",{className:"text-3xl font-black text-white",children:r.value})]})]},r.label))}),e.jsxs("section",{className:"space-y-10",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-white/[0.05] pb-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-3xl font-black tracking-tight uppercase italic",children:"Operational Modules"}),e.jsx("p",{className:"text-slate-500 text-sm mt-1",children:"Select a sector to begin deep-dive simulation."})]}),e.jsxs("div",{className:"flex items-center gap-3 text-primary font-mono text-[10px] bg-primary/5 px-4 py-2 rounded-full border border-primary/20",children:[e.jsx(re,{size:16}),e.jsx("span",{className:"tracking-[0.2em]",children:"ALL SYSTEMS OPTIMAL"})]})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-10",children:a.map((r,s)=>e.jsx(b.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{delay:.6+s*.1,duration:.8},className:"group cursor-pointer relative",children:e.jsxs("div",{className:"glass-card h-full space-y-8 flex flex-col hover:border-primary/30 group-hover:bg-primary/[0.02]",children:[e.jsx("div",{className:"w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-700 group-hover:rotate-[10deg]",children:e.jsx(r.icon,{size:32,className:"text-slate-500 group-hover:text-primary transition-colors"})}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-2xl font-bold mb-3 group-hover:text-primary transition-colors",children:r.title}),e.jsx("p",{className:"text-slate-400 leading-relaxed font-medium",children:r.desc})]}),e.jsxs("div",{className:"mt-auto pt-6 flex items-center justify-between opacity-30 group-hover:opacity-100 transition-all",children:[e.jsx("span",{className:"text-[10px] font-bold text-primary uppercase tracking-[0.3em]",children:"Initialize Sector"}),e.jsx(F,{size:20,className:"text-primary group-hover:translate-x-2 transition-transform"})]})]})},r.id))})]}),e.jsxs("section",{className:"glass rounded-[3rem] border-white/[0.05] overflow-hidden",children:[e.jsxs("div",{className:"bg-white/5 px-8 py-5 border-b border-white/[0.05] flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(de,{size:18,className:"text-primary"}),e.jsx("span",{className:"text-xs font-bold font-mono text-slate-400 tracking-widest uppercase",children:"Kernel Node Console (OS_V1.0)"})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"w-3 h-3 rounded-full bg-slate-800"}),e.jsx("div",{className:"w-3 h-3 rounded-full bg-slate-800"}),e.jsx("div",{className:"w-3 h-3 rounded-full bg-primary/40 shadow-[0_0_10px_rgba(0,243,255,0.5)]"})]})]}),e.jsxs("div",{className:"p-10 font-mono text-xs text-primary/60 space-y-3 bg-black/20",children:[e.jsxs("div",{className:"flex gap-6",children:[e.jsx("span",{className:"text-slate-600",children:"[0.000]"}),e.jsx("span",{className:"text-slate-300 italic",children:"Starting ProcessVerse Kernel..."}),e.jsx("span",{className:"ml-auto text-green-500 font-bold",children:"[ OK ]"})]}),e.jsxs("div",{className:"flex gap-6",children:[e.jsx("span",{className:"text-slate-600",children:"[0.002]"}),e.jsx("span",{className:"text-slate-300",children:"Memory Allocation (4096MB) - Sector 0-F"}),e.jsx("span",{className:"ml-auto text-green-500 font-bold",children:"[ SUCCESS ]"})]}),e.jsxs("div",{className:"flex gap-6",children:[e.jsx("span",{className:"text-slate-600",children:"[0.005]"}),e.jsx("span",{className:"text-slate-300",children:"Loading High-Fidelity UI Drivers..."}),e.jsx("span",{className:"ml-auto text-green-500 font-bold",children:"[ ACTIVE ]"})]}),e.jsxs("div",{className:"flex gap-6",children:[e.jsx("span",{className:"text-slate-600",children:"[0.008]"}),e.jsx("span",{className:"text-slate-300",children:"Establishing Secure Tunnels..."}),e.jsx("span",{className:"ml-auto text-primary font-bold",children:"[ TUNNEL_READY ]"})]}),e.jsxs("div",{className:"animate-pulse text-primary mt-4 font-black",children:["SYSTEM_ONLINE_ ",">"]})]})]})]})},ze=(t,d)=>{if(t.length===0)return null;switch(d){case"FCFS":return t.sort((a,r)=>a.arrivalTime-r.arrivalTime)[0];case"SJF":return t.sort((a,r)=>a.burstTime-r.burstTime||a.arrivalTime-r.arrivalTime)[0];case"Priority":return t.sort((a,r)=>a.priority-r.priority||a.arrivalTime-r.arrivalTime)[0];case"RR":return t[0];default:return t[0]}},Me={FCFS:{title:"First-Come, First-Served (FCFS)",description:"The simplest scheduling algorithm. Processes are dispatched according to their arrival time on the ready queue. Being a non-preemptive algorithm, once the CPU has been allocated to a process, that process keeps the CPU until it releases it, either by terminating or by requesting I/O.",formulas:["Completion Time (CT) = Time when process fully completes execution","Turnaround Time (TAT) = Completion Time - Arrival Time","Waiting Time (WT) = Turnaround Time - Burst Time"],code:`// FCFS Scheduling Algorithm (Menu Driven) in C
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
}`},SJF:{title:"Shortest Job First (SJF)",description:"A scheduling dispatch algorithm that selects the waiting process with the smallest execution (burst) time. SJF is proven to yield the absolute minimum average waiting time for a given set of processes. It can be preemptive (SRTF) or non-preemptive.",formulas:["Selection Criteria: Process with minimum Burst Time currently in Ready Queue","Turnaround Time (TAT) = Completion Time - Arrival Time","Waiting Time (WT) = Turnaround Time - Burst Time"],code:`// Non-Preemptive SJF Algorithm in C
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
}`},Priority:{title:"Priority Scheduling",description:"Each process is assigned a priority. The CPU is allocated to the process with the highest priority (often represented by the lowest integer value). If priorities are equal, FCFS rules apply. Preemptive priority scheduling can eject a running process if a higher priority one arrives.",formulas:["Selection Criteria: Min(Priority_Value) where 0 is highest priority","Turnaround Time (TAT) = Completion Time - Arrival Time","Waiting Time (WT) = Turnaround Time - Burst Time"],code:`// Priority Scheduling Algorithm in C
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
}`},RR:{title:"Round Robin (RR)",description:"Designed highly for timesharing systems. It passes the CPU sequentially across all ready processes, where each process is granted execution time equal to a static Time Quantum. If a process burst exceeds the quantum, it is preempted and sent to the back of the ready queue.",formulas:["Preemption Interval = Time Quantum (TQ)","Remaining Burst Time = Initial Burst - Executed TQ","Turnaround Time (TAT) = Completion Time - Arrival Time"],code:`// Round Robin Algorithm in C
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
}`},Banker:{title:"Banker's Algorithm",description:"A resource allocation and deadlock avoidance algorithm. It tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources. It makes an 's-state' check to test for possible deadlock conditions for all other pending activities before deciding whether allocation should be allowed to continue.",formulas:["Need Matrix = Max Matrix - Allocation Matrix","Safety Check: If Need[i] <= Available, Execute Process","Reclaim: Available = Available + Allocation[i] (Upon Completion)"],code:`// Banker's Algorithm in C
#include <stdio.h>

void executeBankers() {
    int n, r, i, j, k;
    printf("Enter number of processes: ");
    scanf("%d", &n);
    printf("Enter number of resources: ");
    scanf("%d", &r);
    
    int alloc[n][r], max[n][r], avail[r];
    
    printf("Enter Allocation Matrix:\\n");
    for(i = 0; i < n; i++)
        for(j = 0; j < r; j++)
            scanf("%d", &alloc[i][j]);
            
    printf("Enter Max Matrix:\\n");
    for(i = 0; i < n; i++)
        for(j = 0; j < r; j++)
            scanf("%d", &max[i][j]);
            
    printf("Enter Available Resources:\\n");
    for(j = 0; j < r; j++)
        scanf("%d", &avail[j]);
        
    int f[n], ans[n], ind = 0;
    for (k = 0; k < n; k++) f[k] = 0;
    
    int need[n][r];
    for (i = 0; i < n; i++) {
        for (j = 0; j < r; j++) {
            need[i][j] = max[i][j] - alloc[i][j];
        }
    }
    
    int y = 0;
    for (k = 0; k < 5; k++) {
        for (i = 0; i < n; i++) {
            if (f[i] == 0) {
                int flag = 0;
                for (j = 0; j < r; j++) {
                    if (need[i][j] > avail[j]){
                        flag = 1;
                        break;
                    }
                }
                if (flag == 0) {
                    ans[ind++] = i;
                    for (y = 0; y < r; y++)
                        avail[y] += alloc[i][y];
                    f[i] = 1;
                }
            }
        }
    }
    
    int flag = 1;
    for(int i = 0;i < n; i++) {
        if(f[i] == 0) {
            flag = 0;
            printf("System is NOT in a safe state! (Deadlock)\\n");
            break;
        }
    }
    
    if(flag == 1) {
        printf("System is in a SAFE STATE.\\nSafe Sequence is: ");
        for (i = 0; i < n - 1; i++) printf(" P%d ->", ans[i]);
        printf(" P%d\\n", ans[n - 1]);
    }
}

int main() {
    int choice;
    while(1) {
        printf("\\n--- Banker's Algorithm ---\\n1. Check Safe State\\n2. Exit\\nEnter: ");
        scanf("%d", &choice);
        if(choice == 1) executeBankers();
        else break;
    }
    return 0;
}`},philosophers:{title:"Dining Philosophers",description:"A classic synchronization problem illustrating issues with resource sharing. Five philosophers sit at a table doing one of two things: eating or thinking. While eating, they must hold both the fork on their left and the right. This inherently creates the potential for deadlock (if everyone grabs the left fork simultaneously).",formulas:["Mutex Lock(Fork[i]) : Protects left fork","Mutex Lock(Fork[(i+1)%N]) : Protects right fork","Deadlock Prevention: Enforce asymmetric pickup (Odd/Even logic)"],code:`// Dining Philosophers using Pthreads & Mutex
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

#define N 5
pthread_mutex_t forks[N];

void* philosopher(void* num) {
    int id = *(int*)num;
    printf("Philosopher %d is thinking.\\n", id);
    sleep(1);
    
    printf("Philosopher %d is hungry.\\n", id);
    
    // Simple implementation (prone to deadlock if all pick left simultaneously)
    pthread_mutex_lock(&forks[id]);
    pthread_mutex_lock(&forks[(id + 1) % N]);
    
    printf("Philosopher %d is eating.\\n", id);
    sleep(2);
    
    pthread_mutex_unlock(&forks[(id + 1) % N]);
    pthread_mutex_unlock(&forks[id]);
    
    printf("Philosopher %d finished eating.\\n", id);
    return NULL;
}

int main() {
    pthread_t phils[N];
    int ids[N];
    
    for(int i=0; i<N; i++) pthread_mutex_init(&forks[i], NULL);
    
    for(int i=0; i<N; i++) {
        ids[i] = i;
        pthread_create(&phils[i], NULL, philosopher, &ids[i]);
    }
    
    for(int i=0; i<N; i++) pthread_join(phils[i], NULL);
    for(int i=0; i<N; i++) pthread_mutex_destroy(&forks[i]);
    
    return 0;
}`},"producer-consumer":{title:"Producer-Consumer (Bounded Buffer)",description:"A multi-process synchronization problem proposing two entities, the producer and the consumer, who share a common, fixed-size buffer. The producer's job is to generate data and put it into the buffer. The consumer's job is to consume data. The problem mandates that the producer won't try to add data to the buffer if it's full and that the consumer won't try to remove data if it's empty.",formulas:["Semaphore empty_slots = N (Buffer Size)","Semaphore full_slots = 0","Mutex = 1 (Binary Semaphore for mutual exclusion)"],code:`// Producer-Consumer using Semaphores
#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define MAX 5
int buffer[MAX], in = 0, out = 0;
sem_t empty, full;
pthread_mutex_t mutex;

void* producer(void* arg) {
    for(int i = 0; i < 5; i++) {
        sem_wait(&empty);
        pthread_mutex_lock(&mutex);
        
        buffer[in] = i;
        printf("Produced Item %d at %d\\n", buffer[in], in);
        in = (in + 1) % MAX;
        
        pthread_mutex_unlock(&mutex);
        sem_post(&full);
        sleep(1);
    }
    return NULL;
}

void* consumer(void* arg) {
    for(int i = 0; i < 5; i++) {
        sem_wait(&full);
        pthread_mutex_lock(&mutex);
        
        int item = buffer[out];
        printf("Consumed Item %d from %d\\n", item, out);
        out = (out + 1) % MAX;
        
        pthread_mutex_unlock(&mutex);
        sem_post(&empty);
        sleep(1);
    }
    return NULL;
}

int main() {
    pthread_t prod, cons;
    pthread_mutex_init(&mutex, NULL);
    sem_init(&empty, 0, MAX);
    sem_init(&full, 0, 0);
    
    pthread_create(&prod, NULL, producer, NULL);
    pthread_create(&cons, NULL, consumer, NULL);
    
    pthread_join(prod, NULL);
    pthread_join(cons, NULL);
    
    pthread_mutex_destroy(&mutex);
    sem_destroy(&empty);
    sem_destroy(&full);
    return 0;
}`},"readers-writers":{title:"Readers-Writers Problem",description:"Models access to a database (or a section of memory). Many threads may read the data simultaneously, but if a thread wants to write to it, it MUST have exclusive access to the database (nobody else can read or write at that exact moment).",formulas:["Mutex: Protects the shared 'readers_count' integer variable","Write_Block: Mutex explicitly locking out writers","Rule: If readers_count > 0, write_block is firmly engaged."],code:`// Readers-Writers using Pthreads
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

pthread_mutex_t mutex, write_block;
int data = 0, readers = 0;

void* reader(void* arg) {
    int id = *(int*)arg;
    pthread_mutex_lock(&mutex);
    readers++;
    if(readers == 1) pthread_mutex_lock(&write_block);
    pthread_mutex_unlock(&mutex);
    
    printf("Reader %d reads data: %d\\n", id, data);
    sleep(1);
    
    pthread_mutex_lock(&mutex);
    readers--;
    if(readers == 0) pthread_mutex_unlock(&write_block);
    pthread_mutex_unlock(&mutex);
    return NULL;
}

void* writer(void* arg) {
    int id = *(int*)arg;
    pthread_mutex_lock(&write_block);
    
    data++;
    printf("Writer %d modified data to %d\\n", id, data);
    sleep(2);
    
    pthread_mutex_unlock(&write_block);
    return NULL;
}

int main() {
    pthread_t r[3], w[2];
    int id[3] = {1, 2, 3};
    
    pthread_mutex_init(&mutex, NULL);
    pthread_mutex_init(&write_block, NULL);
    
    for(int i=0; i<2; i++) pthread_create(&w[i], NULL, writer, &id[i]);
    for(int i=0; i<3; i++) pthread_create(&r[i], NULL, reader, &id[i]);
    
    for(int i=0; i<2; i++) pthread_join(w[i], NULL);
    for(int i=0; i<3; i++) pthread_join(r[i], NULL);
    
    return 0;
}`},Threads:{title:"Multi-Threading & Concurrency",description:"Demonstrates concurrent execution within a single process. Multiple threads operate over the same shared memory space, necessitating strict synchronization techniques like Mutex locks to prevent mathematical Race Conditions while operating inside a Critical Section.",formulas:["Context Overhead: Thread Switch << Process Switch","Critical Section: Shared memory block actively undergoing mutation","Mutex Lock: Engaged globally to prevent simultaneous writes"],code:`// Multi-threading with POSIX and Mutex
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

#define NUM_THREADS 3

// Shared memory resource
long shared_counter = 0;
pthread_mutex_t counter_mutex;

void* thread_work(void* arg) {
    long thread_id = (long)arg;
    
    printf("Thread %ld launched.\\n", thread_id);
    
    // Critical Section: Modifying shared memory
    for(int i = 0; i < 5; i++) {
        pthread_mutex_lock(&counter_mutex);
        
        long local_copy = shared_counter;
        local_copy++;
        
        // Simulating processing delay to force race condition if unlocked
        usleep(100000); 
        
        shared_counter = local_copy;
        printf("Thread %ld incremented counter to: %ld\\n", thread_id, shared_counter);
        
        pthread_mutex_unlock(&counter_mutex);
    }
    
    printf("Thread %ld completed.\\n", thread_id);
    pthread_exit(NULL);
}

int main() {
    pthread_t threads[NUM_THREADS];
    pthread_mutex_init(&counter_mutex, NULL);
    
    // Dispatch threads concurrently
    for(long t = 0; t < NUM_THREADS; t++) {
        printf("Dispatching Thread %ld...\\n", t);
        pthread_create(&threads[t], NULL, thread_work, (void*)t);
    }
    
    // Await thread completion gracefully
    for(long t = 0; t < NUM_THREADS; t++) {
        pthread_join(threads[t], NULL);
    }
    
    printf("\\nFinal Shared Counter Value: %ld\\n", shared_counter);
    pthread_mutex_destroy(&counter_mutex);
    return 0;
}`}},K=({algorithm:t})=>{const[d,a]=o.useState("theory"),r=Me[t];return e.jsx("div",{className:"mt-12 w-full mx-auto max-w-7xl",children:e.jsxs("div",{className:"glass-card flex flex-col overflow-hidden relative border-white/[0.05]",children:[e.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between p-8 border-b border-white/5 bg-black/20",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(0,243,255,0.15)]",children:e.jsx(fe,{size:24})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-black italic uppercase tracking-tighter",children:r.title}),e.jsxs("p",{className:"text-slate-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2",children:[e.jsx(F,{size:12,className:"text-primary"}),"Live Algorithm Deep Dive Breakdown"]})]})]}),e.jsxs("div",{className:"mt-6 md:mt-0 flex items-center bg-black/40 border border-white/5 p-1 rounded-2xl",children:[e.jsx("button",{onClick:()=>a("theory"),className:`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${d==="theory"?"bg-primary/20 text-primary scale-95 shadow-inner":"text-slate-400 hover:text-white"}`,children:e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(G,{size:14})," Theory & Logic"]})}),e.jsx("button",{onClick:()=>a("code"),className:`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${d==="code"?"bg-accent/20 text-accent scale-95 shadow-inner":"text-slate-400 hover:text-white"}`,children:e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(ge,{size:14})," C Program"]})})]})]}),e.jsx("div",{className:"p-8 relative min-h-[400px]",children:e.jsx(P,{mode:"wait",children:d==="theory"?e.jsxs(b.div,{initial:{opacity:0,x:-20,filter:"blur(10px)"},animate:{opacity:1,x:0,filter:"blur(0px)"},exit:{opacity:0,x:20,filter:"blur(10px)"},className:"grid grid-cols-1 md:grid-cols-2 gap-12",children:[e.jsxs("div",{className:"space-y-6",children:[e.jsxs("h3",{className:"text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2",children:[e.jsx(G,{size:16,className:"text-primary"})," Principles of Operation"]}),e.jsx("p",{className:"text-slate-300 leading-relaxed font-medium",children:r.description}),e.jsxs("div",{className:"pt-6 space-y-4",children:[e.jsxs("h3",{className:"text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2",children:[e.jsx(be,{size:16,className:"text-secondary"})," Applied Formulas"]}),e.jsx("div",{className:"space-y-3",children:r.formulas.map((s,m)=>e.jsxs("div",{className:"bg-slate-900/50 border border-white/5 px-4 py-3 rounded-xl font-mono text-xs text-primary/90 flex shadow-inner",children:[e.jsxs("span",{className:"text-slate-500 mr-3",children:["[",m+1,"]"]}),s]},m))})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-primary/5 to-transparent rounded-[2rem] border border-primary/10 overflow-hidden flex flex-col items-center justify-center p-8 text-center relative shadow-[inset_0_0_50px_rgba(0,243,255,0.05)]",children:[e.jsx(de,{size:48,className:"text-primary/20 mb-6"}),e.jsx("h4",{className:"text-primary font-black uppercase tracking-widest mb-2",children:"Algorithm Selected"}),e.jsx("div",{className:"text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 opacity-80",children:t}),e.jsx("p",{className:"text-slate-400 mt-4 text-xs max-w-xs font-mono",children:"Modify values in the actual Control Unit above. The live Gantt chart perfectly mirrors this core theory."})]})]},"theory-tab"):e.jsxs(b.div,{initial:{opacity:0,x:-20,filter:"blur(10px)"},animate:{opacity:1,x:0,filter:"blur(0px)"},exit:{opacity:0,x:20,filter:"blur(10px)"},className:"w-full relative",children:[e.jsxs("div",{className:"absolute top-0 right-0 px-4 py-2 bg-accent/10 border border-accent/20 rounded-bl-2xl rounded-tr-xl flex items-center gap-2",children:[e.jsx("div",{className:"w-2 h-2 rounded-full bg-accent animate-pulse"}),e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest text-accent",children:"Menu Driven C Code"})]}),e.jsx("pre",{className:"p-8 rounded-3xl bg-slate-950 border border-white/10 overflow-x-auto text-[13px] text-slate-300 font-mono shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] custom-scrollbar",children:e.jsx("code",{children:r.code})})]},"code-tab")})})]})})},Oe=()=>{const[t,d]=o.useState([{id:1,name:"Browser",arrivalTime:0,burstTime:6,remainingTime:6,priority:1,state:"new",color:"#00f3ff",waitingTime:0,turnaroundTime:0},{id:2,name:"System",arrivalTime:2,burstTime:4,remainingTime:4,priority:0,state:"new",color:"#9d00ff",waitingTime:0,turnaroundTime:0},{id:3,name:"Editor",arrivalTime:4,burstTime:3,remainingTime:3,priority:2,state:"new",color:"#ff004c",waitingTime:0,turnaroundTime:0}]),[a,r]=o.useState(null),[s,m]=o.useState([]),[l,w]=o.useState([]),[p,x]=o.useState("FCFS"),[f,n]=o.useState(2),[h]=o.useState(500),[y,g]=o.useState(!1),[_,T]=o.useState(0),z=o.useRef(null),S=o.useRef(0);o.useEffect(()=>(y?z.current=setInterval(()=>{V()},h):clearInterval(z.current),()=>clearInterval(z.current)),[y,t,a,s,_,p]);const V=()=>{T(L=>L+1);let u=[...t],k=[...s];u.forEach(L=>{L.arrivalTime===_&&L.state==="new"&&(L.state="ready",k.push(L))});let v=a,I=[...l];!v&&k.length>0?(v=ze(k,p),v&&(k=k.filter(L=>L.id!==v.id),v.state="running",S.current=0,I.push({pid:v.id,start:_,end:_+1,color:v.color}))):v&&(v.burstTime-=1,I[I.length-1].end=_+1,S.current+=1,v.burstTime<=0?(v.state="terminated",v.turnaroundTime=_+1-v.arrivalTime,v=null,S.current=0):p==="RR"&&S.current>=f&&(v.state="ready",k.push(v),v=null,S.current=0)),d(u),m(k),r(v),w(I)},[H,i]=o.useState(!1),[c,j]=o.useState(4),[N,B]=o.useState(1);o.useEffect(()=>{const u=()=>g(v=>!v),k=()=>J();return window.addEventListener("GLOBAL_PLAY_TOGGLE",u),window.addEventListener("GLOBAL_RESET",k),()=>{window.removeEventListener("GLOBAL_PLAY_TOGGLE",u),window.removeEventListener("GLOBAL_RESET",k)}},[]);const pe=()=>{const u=t.length+1,k={id:u,name:`Task-${u}`,arrivalTime:Math.max(0,_),burstTime:c,remainingTime:c,priority:N,state:"new",color:["#00f3ff","#9d00ff","#ff004c","#00ff8a","#ff8a00"][u%5],waitingTime:0,turnaroundTime:0};d([...t,k]),i(!1),j(4),B(1)},he=()=>{const u=["FCFS","SJF","Priority","RR"],k=(u.indexOf(p)+1)%u.length;x(u[k]),J()},J=()=>{g(!1),T(0),S.current=0,d([{id:1,name:"Browser",arrivalTime:0,burstTime:6,remainingTime:6,priority:1,state:"new",color:"#00f3ff",waitingTime:0,turnaroundTime:0},{id:2,name:"System",arrivalTime:2,burstTime:4,remainingTime:4,priority:0,state:"new",color:"#9d00ff",waitingTime:0,turnaroundTime:0},{id:3,name:"Editor",arrivalTime:4,burstTime:3,remainingTime:3,priority:2,state:"new",color:"#ff004c",waitingTime:0,turnaroundTime:0}]),r(null),m([]),w([])};return e.jsxs("div",{className:"p-12 space-y-12 max-w-7xl mx-auto custom-scrollbar",children:[e.jsxs("div",{className:"flex items-center justify-between glass p-8 rounded-[2.5rem] border-white/[0.05]",children:[e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsx("div",{className:"w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary group-hover:rotate-12 transition-all",children:e.jsx(E,{size:32})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-black italic uppercase italic tracking-tighter leading-none mb-1",children:"Process Lab"}),e.jsxs("p",{className:"text-slate-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2",children:[e.jsx(C,{size:12,className:"text-green-500"}),"Virtual CPU Isolation Active"]})]})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"flex items-center gap-3 bg-black/40 px-6 py-3 rounded-2xl border border-white/10 font-mono",children:[e.jsx("span",{className:"text-[10px] text-slate-500 uppercase tracking-widest font-bold",children:"Tick"}),e.jsx("span",{className:"text-primary text-xl font-black",children:_})]}),e.jsxs("div",{className:"flex items-center gap-2 bg-white/[0.03] p-2 rounded-2xl border border-white/[0.05]",children:[e.jsx("button",{onClick:()=>g(!y),className:`p-4 rounded-xl transition-all duration-300 ${y?"bg-amber-500/20 text-amber-500 border border-amber-500/30":"bg-primary text-black font-black"}`,children:y?e.jsx(W,{size:20}):e.jsx(U,{size:20,fill:"currentColor"})}),e.jsx("button",{onClick:J,className:"p-4 rounded-xl glass hover:bg-white/5 text-slate-400 border-white/5",children:e.jsx(q,{size:20})})]})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8",children:[e.jsx("div",{className:"lg:col-span-4 space-y-8",children:e.jsxs("div",{className:"glass-card flex flex-col gap-8",children:[e.jsx("h3",{className:"text-sm font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/5 pb-4",children:"Control Unit"}),e.jsxs("div",{className:"space-y-4",children:[H?e.jsxs("div",{className:"p-6 rounded-3xl bg-white/[0.02] border border-primary/20 space-y-4 shadow-[0_0_20px_rgba(0,243,255,0.05)]",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-[10px] uppercase font-bold text-slate-400",children:"Burst Time (T)"}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{onClick:()=>j(Math.max(1,c-1)),className:"w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300",children:"-"}),e.jsx("span",{className:"font-mono text-primary font-bold w-4 text-center",children:c}),e.jsx("button",{onClick:()=>j(c+1),className:"w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300",children:"+"})]})]}),p==="Priority"&&e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-[10px] uppercase font-bold text-slate-400",children:"Priority (0=High)"}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{onClick:()=>B(Math.max(0,N-1)),className:"w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300",children:"-"}),e.jsx("span",{className:"font-mono text-accent font-bold w-4 text-center",children:N}),e.jsx("button",{onClick:()=>B(N+1),className:"w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-slate-300",children:"+"})]})]}),e.jsxs("div",{className:"flex gap-2 pt-2",children:[e.jsx("button",{onClick:()=>i(!1),className:"flex-1 py-2 rounded-xl border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5",children:"Cancel"}),e.jsx("button",{onClick:pe,className:"flex-1 py-2 rounded-xl bg-primary text-black text-xs font-black uppercase tracking-widest hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]",children:"Deploy"})]})]}):e.jsxs("button",{onClick:()=>i(!0),className:"w-full sidebar-item border border-white/5 hover:border-primary/30 group",children:[e.jsx(xe,{size:20,className:"text-primary"}),e.jsx("span",{className:"font-bold text-sm",children:"Add New Process"})]}),e.jsxs("div",{className:"p-6 rounded-3xl bg-black/40 border border-white/5 space-y-4",children:[e.jsxs("div",{className:"flex justify-between items-center text-[10px] uppercase font-bold text-slate-500 tracking-widest",children:[e.jsx("span",{children:"Algorithm"}),e.jsxs("div",{className:"flex items-center gap-3",children:[p==="SJF"&&e.jsx("span",{className:"text-[8px] text-primary/70",children:"Shortest Burst First"}),p==="Priority"&&e.jsx("span",{className:"text-[8px] text-accent/70",children:"Lowest Priority ID First"}),e.jsx("button",{onClick:he,className:"text-primary font-mono bg-primary/10 px-3 py-1.5 rounded hover:bg-primary/20 transition-colors cursor-pointer",children:p})]})]}),p==="RR"?e.jsxs("div",{className:"flex justify-between items-center text-[10px] uppercase font-bold text-slate-500 tracking-widest",children:[e.jsx("span",{children:"Time Quantum"}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("button",{onClick:()=>n(Math.max(1,f-1)),className:"w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-slate-400 font-bold",children:"-"}),e.jsxs("span",{className:"text-secondary font-mono bg-secondary/10 px-2 py-0.5 rounded",children:[f,"T"]}),e.jsx("button",{onClick:()=>n(f+1),className:"w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-slate-400 font-bold",children:"+"})]})]}):e.jsxs("div",{className:"flex justify-between items-center text-[10px] uppercase font-bold text-slate-500 tracking-widest opacity-30",children:[e.jsx("span",{children:"Time Quantum"}),e.jsx("span",{className:"text-slate-500 font-mono",children:"N/A"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2",children:[e.jsx(re,{size:14,className:"text-green-500"}),"Load Distribution"]}),e.jsx("div",{className:"h-2 w-full bg-slate-900 rounded-full overflow-hidden",children:e.jsx("div",{className:"h-full w-[65%] bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_15px_rgba(0,243,255,0.4)]"})})]})]})}),e.jsxs("div",{className:"lg:col-span-8 space-y-8",children:[e.jsxs("div",{className:"glass-card",children:[e.jsxs("h3",{className:"text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-2",children:[e.jsx(D,{size:18,className:"text-primary"}),"Processing Pipeline (Gantt)"]}),e.jsxs("div",{className:"relative h-24 w-full bg-black/40 rounded-3xl p-3 flex gap-1 items-stretch overflow-x-auto custom-scrollbar border border-white/5 shadow-inner",children:[e.jsx(P,{children:l.map((u,k)=>e.jsxs(b.div,{initial:{scaleY:0,opacity:0},animate:{scaleY:1,opacity:1},className:"relative group min-w-[30px] rounded-xl flex items-center justify-center font-bold text-[10px]",style:{width:`${(u.end-u.start)*40}px`,backgroundColor:`${u.color}22`,border:`1px solid ${u.color}44`,color:u.color},children:["P",u.pid,e.jsx("div",{className:"absolute -bottom-6 left-0 text-[8px] font-bold text-slate-600 font-mono",children:u.start}),k===l.length-1&&e.jsx("div",{className:"absolute -bottom-6 right-0 text-[8px] font-bold text-slate-600 font-mono",children:u.end})]},`${u.pid}-${k}`))}),l.length===0&&e.jsx("div",{className:"flex-1 flex items-center justify-center text-slate-700 italic text-sm font-mono tracking-widest",children:"IDLE_STATE_ACTIVE"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[e.jsxs("div",{className:"glass p-8 rounded-[2rem] border-white/[0.05] relative overflow-hidden group",children:[e.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"}),e.jsx("h4",{className:"text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500 mb-8",children:"CPU_SOCKET_0"}),e.jsxs("div",{className:"flex flex-col items-center gap-6 py-6",children:[a?e.jsxs(b.div,{layoutId:`p-${a.id}`,className:"w-32 h-32 rounded-[2.5rem] bg-primary/10 border-2 border-primary/30 flex flex-col items-center justify-center relative group shadow-[0_0_40px_rgba(0,243,255,0.05)]",children:[e.jsx(R,{size:32,className:"text-primary mb-2 animate-pulse"}),e.jsxs("span",{className:"text-xl font-black text-white italic",children:["P",a.id]}),e.jsx("span",{className:"text-[10px] font-bold text-slate-500 uppercase",children:a.name}),e.jsx("svg",{className:"absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -rotate-90",children:e.jsx("circle",{cx:"50%",cy:"50%",r:"68",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"text-primary opacity-20"})})]}):e.jsx("div",{className:"w-32 h-32 rounded-[2.5rem] bg-white/[0.02] border-2 border-dashed border-white/5 flex items-center justify-center text-slate-700 italic text-xs tracking-tighter",children:"NO_LOAD"}),e.jsx("span",{className:"text-xs font-mono font-bold text-slate-500 uppercase tracking-[0.3em]",children:"Core Executing"})]})]}),e.jsxs("div",{className:"glass p-8 rounded-[2rem] border-white/[0.05]",children:[e.jsx("h4",{className:"text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500 mb-8",children:"Ready_Queue_Stack"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(P,{children:s.map(u=>e.jsxs(b.div,{initial:{x:20,opacity:0},animate:{x:0,opacity:1},exit:{x:-20,opacity:0},className:"p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:bg-white/[0.05] transition-all",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px]",style:{backgroundColor:`${u.color}22`,color:u.color,border:`1px solid ${u.color}44`},children:["P",u.id]}),e.jsx("span",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-widest",children:u.name})]}),e.jsxs("span",{className:"text-[10px] font-mono font-bold text-primary",children:[u.burstTime,"T REM"]})]},u.id))}),s.length===0&&e.jsx("p",{className:"text-center text-slate-700 italic text-xs py-10 font-mono uppercase tracking-widest",children:"Queue_Empty"})]})]})]})]})]}),e.jsx(K,{algorithm:p})]})},M=["#00f3ff","#9d00ff","#ff004c","#00ff8a","#ff8a00"],Be=()=>{const[t,d]=o.useState([{id:1,state:"ready",priority:1,color:M[0],progress:0},{id:2,state:"ready",priority:0,color:M[1],progress:0}]),[a,r]=o.useState(!1),[s,m]=o.useState(0),l=o.useRef(null);o.useEffect(()=>(a?l.current=setInterval(()=>{d(x=>{const f=x.map(h=>({...h})),n=f.findIndex(h=>h.state==="running");if(n===-1){const h=f.findIndex(y=>y.state==="ready");h!==-1&&(f[h].state="running")}else f[n].progress+=5,f[n].progress>=100&&(f[n].state="terminated",f[n].progress=100);return f}),m(Math.floor(Math.random()*30)+40)},200):(clearInterval(l.current),m(0)),()=>clearInterval(l.current)),[a,t]),o.useEffect(()=>{const x=()=>r(n=>!n),f=()=>p();return window.addEventListener("GLOBAL_PLAY_TOGGLE",x),window.addEventListener("GLOBAL_RESET",f),()=>{window.removeEventListener("GLOBAL_PLAY_TOGGLE",x),window.removeEventListener("GLOBAL_RESET",f)}},[]);const w=()=>{const x=t.length+1;d([...t,{id:x,state:"ready",priority:Math.floor(Math.random()*3),color:M[x%M.length],progress:0}])},p=()=>{r(!1),d([{id:1,state:"ready",priority:1,color:M[0],progress:0},{id:2,state:"ready",priority:0,color:M[1],progress:0}])};return e.jsxs("div",{className:"p-12 space-y-12 max-w-7xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between glass p-10 rounded-[3rem] border-white/[0.05] relative overflow-hidden",children:[e.jsx("div",{className:"absolute top-0 right-0 p-10 text-primary/5 -z-10",children:e.jsx(A,{size:160})}),e.jsxs("div",{className:"flex items-center gap-8",children:[e.jsx("div",{className:"w-20 h-20 rounded-[2rem] bg-secondary/10 flex items-center justify-center text-secondary shadow-[0_0_30px_rgba(157,0,255,0.15)] outline outline-1 outline-secondary/30",children:e.jsx(A,{size:40})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-4xl font-black italic uppercase tracking-tighter mb-2",children:"Multi-Threading"}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2",children:[e.jsx(C,{size:12,className:"text-secondary"}),"LWP Isolation: Active"]}),e.jsx("div",{className:"h-1 w-1 rounded-full bg-slate-700"}),e.jsxs("span",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2",children:[e.jsx($,{size:12,className:"text-green-500"}),"Thread Safety: Verified"]})]})]})]}),e.jsxs("div",{className:"flex items-center gap-3 bg-white/[0.03] p-3 rounded-[2rem] border border-white/[0.05]",children:[e.jsxs("button",{onClick:()=>r(!a),className:`px-8 py-4 rounded-2xl transition-all font-black text-sm flex items-center gap-3 ${a?"bg-amber-500/20 text-amber-500 border border-amber-500/30":"btn-primary"}`,children:[a?e.jsx(W,{size:20}):e.jsx(U,{size:20,fill:"currentColor"}),a?"SUSPEND":"EXECUTE"]}),e.jsx("button",{onClick:p,className:"p-4 rounded-2xl glass hover:bg-white/10 text-slate-400 border-white/10",children:e.jsx(q,{size:22})})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-10",children:[e.jsx("div",{className:"lg:col-span-4 space-y-8",children:e.jsxs("div",{className:"glass-card flex flex-col gap-10",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-white/[0.05] pb-6",children:[e.jsxs("h3",{className:"text-sm font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3",children:[e.jsx(D,{size:18,className:"text-secondary"}),"Thread Pool"]}),e.jsxs("span",{className:"mono text-[10px] text-secondary font-bold",children:[t.length," Units"]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("button",{onClick:w,className:"w-full btn-secondary flex items-center justify-center gap-3 py-4 text-xs",children:[e.jsx(xe,{size:18}),"SPAWN NEW THREAD"]}),e.jsxs("div",{className:"p-8 rounded-[2rem] bg-black/40 border border-white/5 relative overflow-hidden group",children:[e.jsx("div",{className:"absolute top-0 left-0 w-1 h-full bg-secondary shadow-[0_0_15px_rgba(157,0,255,0.5)]"}),e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsx("span",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-widest",children:"Global CPU Load"}),e.jsxs("span",{className:"text-secondary font-black text-lg",children:[s,"%"]})]}),e.jsx("div",{className:"h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5",children:e.jsx(b.div,{className:"h-full bg-gradient-to-r from-secondary to-primary rounded-full shadow-[0_0_20px_rgba(157,0,255,0.4)]",animate:{width:`${s}%`}})}),e.jsxs("div",{className:"mt-4 flex justify-between text-[8px] font-mono text-slate-600 uppercase",children:[e.jsx("span",{children:"Efficiency Optimal"}),e.jsx("span",{children:"Shared Memory Mode"})]})]})]}),e.jsx("div",{className:"p-6 rounded-3xl bg-secondary/5 border border-secondary/10",children:e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"p-3 rounded-xl bg-secondary/20 text-secondary",children:e.jsx(R,{size:20})}),e.jsx("p",{className:"text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-wider",children:"Shared resources are protected by mutex locks to prevent race conditions during execution."})]})})]})}),e.jsx("div",{className:"lg:col-span-8 space-y-8",children:e.jsxs("div",{className:"glass-card min-h-[500px] flex flex-col gap-10",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-white/5 pb-6",children:[e.jsxs("h3",{className:"text-sm font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3",children:[e.jsx(C,{size:18,className:"text-primary"}),"Runtime Monitor"]}),e.jsx("div",{className:"flex gap-2",children:["READY","RUNNING","BLOCKED"].map(x=>e.jsx("span",{className:"text-[8px] font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded tracking-tighter text-slate-500",children:x},x))})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx(P,{children:t.map(x=>e.jsxs(b.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},className:"group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] flex flex-col gap-6 relative overflow-hidden hover:bg-white/[0.05] transition-all duration-500",children:[e.jsxs("div",{className:"flex items-center justify-between relative z-10",children:[e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsxs("div",{className:"w-16 h-16 rounded-3xl flex items-center justify-center font-black text-xl shadow-inner relative",style:{backgroundColor:`${x.color}15`,color:x.color,border:`1px solid ${x.color}30`},children:["T",x.id,x.state==="running"&&e.jsx("div",{className:"absolute -inset-1 border border-dashed rounded-3xl animate-spin opacity-50",style:{borderColor:x.color,animationDuration:"4s"}})]}),e.jsxs("div",{children:[e.jsxs("h4",{className:"font-black text-lg tracking-tight flex items-center gap-2",children:["Thread Worker #",x.id,x.state==="running"&&e.jsx("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500 text-black uppercase animate-pulse",children:"Running"})]}),e.jsxs("div",{className:"flex gap-4 mt-1 font-mono text-[10px] uppercase font-bold",children:[e.jsxs("span",{className:"text-slate-500",children:["Priority: ",e.jsx("span",{className:x.priority===0?"text-accent":"text-slate-400",children:x.priority===0?"Urgent":x.priority===1?"Normal":"Background"})]}),e.jsxs("span",{className:"text-slate-500",children:["State: ",e.jsx("span",{className:"text-white/70",children:x.state})]})]})]})]}),e.jsx("div",{className:"text-right",children:e.jsxs("div",{className:"text-3xl font-black italic text-white/20 group-hover:text-white/40 transition-colors uppercase tracking-tighter",children:[x.progress,"%"]})})]}),e.jsx("div",{className:"relative h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5",children:e.jsx(b.div,{className:"h-full rounded-full transition-all duration-300",style:{backgroundColor:x.color,boxShadow:`0 0 15px ${x.color}55`},animate:{width:`${x.progress}%`}})}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"})]},x.id))}),t.length===0&&e.jsx("div",{className:"p-20 text-center text-slate-800 italic uppercase font-black tracking-widest text-2xl opacity-20",children:"No_Threads_Active"})]})]})})]}),e.jsx(K,{algorithm:"Threads"})]})},Fe=(t,d)=>{let a=[...d],r=new Array(t.length).fill(!1),s=[];for(let m=0;m<t.length;m++)for(let l=0;l<t.length;l++)if(!r[l]){let w=!0;for(let p=0;p<a.length;p++)if(t[l].need[p]>a[p]){w=!1;break}if(w){for(let p=0;p<a.length;p++)a[p]+=t[l].allocation[p];r[l]=!0,s.push(t[l].id)}}return{safe:r.every(m=>m),sequence:s}},Ue=()=>{const[t,d]=o.useState([{id:"1",name:"CPU",total:10,available:3,color:"#00f3ff"},{id:"2",name:"Memory",total:5,available:3,color:"#9d00ff"},{id:"3",name:"Disk",total:7,available:2,color:"#ff004c"}]),[a,r]=o.useState([{id:1,name:"P1",allocation:[0,1,0],max:[7,5,3],need:[7,4,3],color:"#00f3ff"},{id:2,name:"P2",allocation:[2,0,0],max:[3,2,2],need:[1,2,2],color:"#9d00ff"},{id:3,name:"P3",allocation:[3,0,2],max:[9,0,2],need:[6,0,0],color:"#ff004c"},{id:4,name:"P4",allocation:[2,1,1],max:[2,2,2],need:[0,1,1],color:"#00ff8a"},{id:5,name:"P5",allocation:[0,0,2],max:[4,3,3],need:[4,3,1],color:"#ff8a00"}]),[s,m]=o.useState(null),[l,w]=o.useState(!1),[p,x]=o.useState(!1),[f,n]=o.useState([0,0,0]),[h,y]=o.useState([0,0,0]),g=(i,c)=>{const j=[...f];j[i]=Math.max(0,c),n(j)},_=(i,c)=>{const j=[...h];j[i]=Math.max(0,c),y(j)},T=()=>{for(let N=0;N<3;N++){if(f[N]>h[N]){alert("Allocation cannot exceed Max claim for any resource.");return}if(f[N]>t[N].available){alert(`Not enough ${t[N].name} available!`);return}}const i=[...t];for(let N=0;N<3;N++)i[N].available-=f[N];const c=a.length+1,j={id:c,name:`P${c}`,allocation:[...f],max:[...h],need:h.map((N,B)=>N-f[B]),color:["#00f3ff","#9d00ff","#ff004c","#00ff8a","#ff8a00"][c%5]};d(i),r([...a,j]),x(!1),n([0,0,0]),y([0,0,0])};o.useEffect(()=>{const i=()=>z(),c=()=>S();return window.addEventListener("GLOBAL_PLAY_TOGGLE",i),window.addEventListener("GLOBAL_RESET",c),()=>{window.removeEventListener("GLOBAL_PLAY_TOGGLE",i),window.removeEventListener("GLOBAL_RESET",c)}},[a,t]);const z=()=>{const i=t.map(j=>j.available),c=Fe(a,i);m(c),w(!0)},S=()=>{m(null),w(!1)},V=()=>{S();const i=[{id:"0",name:"CPU",total:10,available:3,color:"#00f3ff"},{id:"1",name:"Memory",total:5,available:3,color:"#9d00ff"},{id:"2",name:"Disk",total:7,available:2,color:"#ff004c"}],c=[{id:0,name:"P0",color:"#00f3ff",allocation:[0,1,0],max:[7,5,3],need:[7,4,3]},{id:1,name:"P1",color:"#9d00ff",allocation:[2,0,0],max:[3,2,2],need:[1,2,2]},{id:2,name:"P2",color:"#ff004c",allocation:[3,0,2],max:[9,0,2],need:[6,0,0]},{id:3,name:"P3",color:"#00ff8a",allocation:[2,1,1],max:[2,2,2],need:[0,1,1]},{id:4,name:"P4",color:"#ff8a00",allocation:[0,0,2],max:[4,3,3],need:[4,3,1]}];d(i),r(c)},H=()=>{S();const i=[{id:"0",name:"CPU",total:10,available:0,color:"#00f3ff"},{id:"1",name:"Memory",total:5,available:1,color:"#9d00ff"},{id:"2",name:"Disk",total:7,available:1,color:"#ff004c"}],c=[{id:0,name:"P0",color:"#00f3ff",allocation:[4,2,3],max:[6,4,4],need:[2,2,1]},{id:1,name:"P1",color:"#ff004c",allocation:[4,1,1],max:[8,2,2],need:[4,1,1]},{id:2,name:"P2",color:"#ff8a00",allocation:[2,1,2],max:[3,2,3],need:[1,1,1]}];d(i),r(c)};return e.jsxs("div",{className:"p-12 space-y-12 max-w-7xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between glass p-10 rounded-[3rem] border-white/[0.05]",children:[e.jsxs("div",{className:"flex items-center gap-8",children:[e.jsx("div",{className:"w-20 h-20 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent shadow-[0_0_30px_rgba(255,0,76,0.15)] outline outline-1 outline-accent/30",children:e.jsx(O,{size:40})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-4xl font-black italic uppercase tracking-tighter mb-2",children:"Deadlock Shield"}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2",children:[e.jsx(ie,{size:12,className:"text-accent"}),"Banker's Protocol: Armed"]}),e.jsx("div",{className:"h-1 w-1 rounded-full bg-slate-700"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:V,className:"text-[10px] font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 active:scale-95 transition-all outline outline-1 outline-cyan-500/30",children:"Safe Set"}),e.jsx("button",{onClick:H,className:"text-[10px] font-bold text-red-500 uppercase tracking-widest px-3 py-1 bg-red-500/10 rounded-lg hover:bg-red-500/20 active:scale-95 transition-all outline outline-1 outline-red-500/30",children:"Deadlock Set"})]})]})]})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("button",{onClick:z,disabled:l,className:"btn-primary px-10 py-4 flex items-center gap-3 text-sm disabled:opacity-30 disabled:hover:scale-100",children:[e.jsx(U,{size:18,fill:"currentColor"}),"ANALYZE STATE"]}),e.jsx("button",{onClick:S,className:"p-4 rounded-2xl glass hover:bg-white/10 text-slate-400 border-white/10",children:e.jsx(Y,{size:22})})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-10",children:[e.jsx("div",{className:"lg:col-span-3 space-y-8",children:e.jsxs("div",{className:"glass-card flex flex-col gap-10",children:[e.jsxs("div",{className:"flex items-center gap-3 border-b border-white/5 pb-6",children:[e.jsx(ne,{size:20,className:"text-primary"}),e.jsx("h3",{className:"text-xs font-black uppercase tracking-[0.2em] text-slate-500",children:"System Resources"})]}),e.jsx("div",{className:"space-y-10",children:t.map(i=>e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex justify-between items-end",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("span",{className:"text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1",children:[i.name," Pool"]}),e.jsxs("span",{className:"text-white font-black text-xl italic",children:[i.available," ",e.jsxs("span",{className:"text-slate-600 text-xs not-italic",children:["/ ",i.total]})]})]}),e.jsx(je,{size:24,style:{color:i.color},className:"opacity-40"})]}),e.jsx("div",{className:"h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5",children:e.jsx(b.div,{className:"h-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]",style:{backgroundColor:i.color},initial:{width:0},animate:{width:`${i.available/i.total*100}%`}})})]},i.id))}),e.jsx("div",{className:"p-6 rounded-3xl bg-accent/5 border border-accent/10",children:e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"p-3 rounded-xl bg-accent/20 text-accent",children:e.jsx(ie,{size:20})}),e.jsx("p",{className:"text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-wider",children:"Circular wait & hold/wait conditions are monitored in real-time."})]})})]})}),e.jsxs("div",{className:"lg:col-span-9 space-y-10",children:[e.jsxs("div",{className:"glass-card",children:[e.jsxs("div",{className:"flex items-center justify-between mb-10 border-b border-white/5 pb-6",children:[e.jsxs("h3",{className:"text-sm font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3",children:[e.jsx(R,{size:18,className:"text-secondary"}),"Allocation Matrix"]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("button",{onClick:()=>x(!p),className:"text-xs font-bold text-slate-400 bg-white/5 px-4 py-2 hover:bg-white/10 hover:text-white rounded-xl transition-all border border-white/5",children:p?"CANCEL":"+ ADD CUSTOM PROCESS"}),e.jsx("span",{className:"mono text-[10px] text-slate-600 hidden md:inline",children:"SNAPSHOT_ID: 0x88AF"})]})]}),e.jsx(P,{children:p&&e.jsx(b.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},className:"overflow-hidden mb-8",children:e.jsxs("div",{className:"p-6 rounded-3xl bg-black/40 border border-white/10 space-y-6 shadow-inner shadow-black/50",children:[e.jsxs("h4",{className:"text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2",children:[e.jsx(ne,{size:12})," Inject New Process"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("span",{className:"text-[10px] font-bold text-accent tracking-widest uppercase",children:"Current Allocation Input"}),e.jsx("div",{className:"flex items-center gap-4",children:["CPU","Memory","Disk"].map((i,c)=>e.jsxs("div",{className:"flex flex-col gap-1 items-center",children:[e.jsx("span",{className:"text-[8px] text-slate-500 uppercase font-bold",children:i}),e.jsx("input",{type:"number",min:0,value:f[c],onChange:j=>g(c,parseInt(j.target.value)||0),className:"w-12 h-10 bg-slate-900 border border-white/10 rounded-xl text-center text-xs font-mono text-slate-300 focus:outline-none focus:border-accent/40"})]},`alloc-${c}`))})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("span",{className:"text-[10px] font-bold text-slate-400 tracking-widest uppercase",children:"Maximum Need Claim"}),e.jsx("div",{className:"flex items-center gap-4",children:["CPU","Memory","Disk"].map((i,c)=>e.jsxs("div",{className:"flex flex-col gap-1 items-center",children:[e.jsx("span",{className:"text-[8px] text-slate-500 uppercase font-bold",children:i}),e.jsx("input",{type:"number",min:0,value:h[c],onChange:j=>_(c,parseInt(j.target.value)||0),className:"w-12 h-10 bg-white/5 border border-white/10 rounded-xl text-center text-xs font-mono text-slate-300 focus:outline-none focus:border-white/30"})]},`max-${c}`))})]})]}),e.jsx("div",{className:"pt-2",children:e.jsx("button",{onClick:T,className:"w-full py-3 rounded-xl bg-accent/20 text-accent text-xs font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-all shadow-[0_0_15px_rgba(255,0,76,0.1)] hover:shadow-[0_0_20px_rgba(255,0,76,0.4)]",children:"+ Initialize Entity"})})]})})}),e.jsx("div",{className:"overflow-x-auto custom-scrollbar",children:e.jsxs("table",{className:"w-full text-left border-separate border-spacing-y-4",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mono",children:[e.jsx("th",{className:"pb-4 pl-6",children:"Unit ID"}),e.jsx("th",{className:"pb-4",children:"Allocated"}),e.jsx("th",{className:"pb-4",children:"Max Claim"}),e.jsx("th",{className:"pb-4",children:"Active Need"}),e.jsx("th",{className:"pb-4 pr-6",children:"Validation"})]})}),e.jsx("tbody",{children:a.map(i=>e.jsxs("tr",{className:"bg-white/[0.02] rounded-3xl group hover:bg-white/[0.04] transition-all duration-300",children:[e.jsx("td",{className:"py-6 pl-6 rounded-l-[2rem] border-l border-y border-white/5",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm italic",style:{backgroundColor:`${i.color}22`,color:i.color,border:`1px solid ${i.color}44`},children:["P",i.id]}),e.jsxs("span",{className:"text-xs font-bold text-slate-300 tracking-wider",children:["PROCESS_",i.id]})]})}),e.jsx("td",{className:"py-6 border-y border-white/5",children:e.jsx("div",{className:"flex gap-2",children:i.allocation.map((c,j)=>e.jsx("span",{className:"w-8 h-8 rounded-xl bg-slate-900 border border-white/5 text-[10px] flex items-center justify-center font-black text-slate-400 mono",children:c},j))})}),e.jsx("td",{className:"py-6 border-y border-white/5",children:e.jsx("div",{className:"flex gap-2",children:i.max.map((c,j)=>e.jsx("span",{className:"w-8 h-8 rounded-xl bg-white/[0.01] border border-white/5 text-[10px] flex items-center justify-center font-bold text-slate-600 font-mono",children:c},j))})}),e.jsx("td",{className:"py-6 border-y border-white/5",children:e.jsx("div",{className:"flex gap-2",children:i.need.map((c,j)=>e.jsx("span",{className:"w-8 h-8 rounded-xl bg-primary/5 text-primary border border-primary/20 text-[10px] flex items-center justify-center font-black shadow-inner shadow-primary/10 mono",children:c},j))})}),e.jsx("td",{className:"py-6 rounded-r-[2rem] border-r border-y border-white/5 pr-6",children:e.jsx(P,{children:s!=null&&s.sequence.includes(i.id)?e.jsxs(b.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},className:"flex items-center gap-2 text-[8px] font-black text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-full border border-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.1)] uppercase italic tracking-widest",children:[e.jsx(le,{size:12,strokeWidth:3}),"SECURED"]}):e.jsx("div",{className:"flex items-center gap-2 text-[8px] font-black text-slate-600 px-3 py-1.5 rounded-full border border-white/5 uppercase italic tracking-widest",children:"WAITING_SEQ"})})})]},i.id))})]})})]}),e.jsx(P,{children:s&&e.jsxs(b.div,{initial:{y:50,opacity:0,filter:"blur(20px)"},animate:{y:0,opacity:1,filter:"blur(0px)"},className:`p-12 rounded-[3.5rem] border-2 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative shadow-2xl ${s.safe?"bg-cyan-500/[0.02] border-cyan-500/20 shadow-cyan-500/10":"bg-red-500/[0.02] border-red-500/20 shadow-red-500/10"}`,children:[e.jsx("div",{className:`p-8 rounded-[2.5rem] shadow-inner ${s.safe?"bg-cyan-500/10 text-cyan-400 border border-cyan-400/20":"bg-red-500/10 text-red-400 border border-red-400/20"}`,children:s.safe?e.jsx(le,{size:48,strokeWidth:3}):e.jsx(ye,{size:48,strokeWidth:3})}),e.jsxs("div",{className:"flex-1 space-y-6 text-center md:text-left",children:[e.jsx("h2",{className:`text-4xl font-black uppercase italic tracking-tight ${s.safe?"text-cyan-400":"text-red-400"}`,children:s.safe?"Safe State Detected":"Deadlock Detected"}),e.jsx("p",{className:"text-slate-400 text-lg font-medium leading-relaxed max-w-2xl",children:s.safe?"No circular wait conditions found. The OS can fulfill all process requests in the following secure order:":"The current allocation results in an unsafe state. Mutual exclusion and hold conditions cannot be broken."}),s.safe&&e.jsx("div",{className:"flex items-center gap-6 justify-center md:justify-start flex-wrap mt-8 bg-black/40 p-6 rounded-[2rem] border border-white/5",children:s.sequence.map((i,c)=>e.jsxs(o.Fragment,{children:[e.jsxs("div",{className:"group relative",children:[e.jsxs("div",{className:"w-14 h-14 rounded-2xl bg-cyan-500 text-black flex items-center justify-center font-black text-xl italic shadow-[0_0_20px_rgba(0,243,255,0.4)] group-hover:scale-110 transition-transform",children:["P",i]}),e.jsxs("div",{className:"absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-cyan-400/50 uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity",children:["Node_",i]})]}),c<s.sequence.length-1&&e.jsx(F,{size:20,className:"text-slate-700 animate-pulse"})]},i))})]}),e.jsx("div",{className:`absolute -bottom-20 -right-20 w-80 h-80 blur-[120px] rounded-full -z-10 ${s.safe?"bg-cyan-500/10":"bg-red-500/10"}`})]})})]})]}),e.jsx(K,{algorithm:"Banker"})]})},De=()=>{const[t,d]=o.useState("philosophers"),[a,r]=o.useState([{id:0,status:"thinking",leftFork:0,rightFork:1},{id:1,status:"thinking",leftFork:1,rightFork:2},{id:2,status:"thinking",leftFork:2,rightFork:3},{id:3,status:"thinking",leftFork:3,rightFork:4},{id:4,status:"thinking",leftFork:4,rightFork:0}]),[s,m]=o.useState([!0,!0,!0,!0,!0]),[l,w]=o.useState(!1),p=o.useRef(null);o.useEffect(()=>{const n=()=>w(y=>!y),h=()=>f();return window.addEventListener("GLOBAL_PLAY_TOGGLE",n),window.addEventListener("GLOBAL_RESET",h),()=>{window.removeEventListener("GLOBAL_PLAY_TOGGLE",n),window.removeEventListener("GLOBAL_RESET",h)}},[]),o.useEffect(()=>(l?p.current=setInterval(()=>{x()},1e3):clearInterval(p.current),()=>clearInterval(p.current)),[l,a,s]);const x=()=>{const n=a.map(_=>({..._})),h=[...s],y=Math.floor(Math.random()*5),g=n[y];g.status==="thinking"?g.status="hungry":g.status==="hungry"?h[g.leftFork]&&h[g.rightFork]&&(h[g.leftFork]=!1,h[g.rightFork]=!1,g.status="eating"):g.status==="eating"&&(h[g.leftFork]=!0,h[g.rightFork]=!0,g.status="thinking"),r(n),m(h)},f=()=>{w(!1),r(a.map(n=>({...n,status:"thinking"}))),m([!0,!0,!0,!0,!0])};return e.jsxs("div",{className:"p-12 space-y-12 max-w-7xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between glass p-10 rounded-[3rem] border-white/[0.05]",children:[e.jsxs("div",{className:"flex items-center gap-8",children:[e.jsx("div",{className:"w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(0,243,255,0.15)] outline outline-1 outline-primary/30",children:e.jsx(Y,{size:40,className:l?"animate-spin":"",style:{animationDuration:"4s"}})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-4xl font-black italic uppercase tracking-tighter mb-2",children:"Sync Protocol"}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2",children:[e.jsx(O,{size:12,className:"text-primary"}),"Mutex Locks: Engaged"]}),e.jsx("div",{className:"h-1 w-1 rounded-full bg-slate-700"}),e.jsxs("span",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2",children:[e.jsx($,{size:12,className:"text-green-500"}),"Atomic State: Verified"]})]})]})]}),e.jsxs("div",{className:"flex items-center gap-3 bg-white/[0.03] p-3 rounded-[2rem] border border-white/[0.05]",children:[e.jsxs("button",{onClick:()=>w(!l),className:`px-8 py-4 rounded-2xl transition-all font-black text-sm flex items-center gap-3 ${l?"bg-amber-500/20 text-amber-500 border border-amber-500/30":"btn-primary"}`,children:[l?e.jsx(W,{size:20}):e.jsx(U,{size:20,fill:"currentColor"}),l?"FREEZE":"AUTORUN"]}),e.jsx("button",{onClick:f,className:"p-4 rounded-2xl glass hover:bg-white/10 text-slate-400 border-white/10",children:e.jsx(q,{size:22})})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-10",children:[e.jsxs("div",{className:"lg:col-span-3 space-y-6",children:[e.jsxs("div",{className:"glass-card flex flex-col gap-6 !p-6",children:[e.jsx("h3",{className:"text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-2",children:"Problem Sets"}),e.jsx("div",{className:"space-y-2",children:[{id:"philosophers",label:"Dining Philosophers",icon:ve},{id:"producer-consumer",label:"Bounded Buffer",icon:D},{id:"readers-writers",label:"Readers-Writers",icon:C}].map(n=>e.jsxs("button",{onClick:()=>d(n.id),className:`w-full sidebar-item !rounded-2xl ${t===n.id?"sidebar-item-active":"text-slate-500 hover:text-slate-200"}`,children:[e.jsx(n.icon,{size:18}),e.jsx("span",{className:"text-xs font-bold uppercase tracking-wider",children:n.label})]},n.id))})]}),e.jsxs("div",{className:"p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 space-y-6",children:[e.jsxs("div",{className:"flex items-center gap-3 text-primary",children:[e.jsx(R,{size:20,className:"drop-shadow-[0_0_8px_rgba(0,243,255,0.4)]"}),e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-[0.2em]",children:"Sync Insights"})]}),e.jsx("p",{className:"text-xs text-slate-400 leading-relaxed font-medium",children:"Synchronization prevents data inconsistency by ensuring only one process accesses the critical section at a time."}),e.jsxs("div",{className:"pt-4 border-t border-white/5 space-y-3",children:[e.jsxs("div",{className:"flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest",children:[e.jsx("span",{children:"Locks Active"}),e.jsxs("span",{className:"text-primary mono",children:[s.filter(n=>!n).length," units"]})]}),e.jsxs("div",{className:"flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest",children:[e.jsx("span",{children:"Wait Queue"}),e.jsx("span",{className:"text-secondary mono",children:"Empty"})]})]})]})]}),e.jsx("div",{className:"lg:col-span-9",children:e.jsxs("div",{className:"glass-card min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden",children:[e.jsxs("div",{className:"absolute top-0 left-0 p-10",children:[e.jsx("h3",{className:"text-lg font-black uppercase italic tracking-tighter text-slate-600 mb-1",children:"Sector_Sync_Table"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-green-500"}),e.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-slate-800"})]})]}),e.jsxs("div",{className:"relative w-[450px] h-[450px] border border-white/[0.03] rounded-full flex items-center justify-center",children:[e.jsx("div",{className:"absolute inset-20 border border-dashed border-white/[0.05] rounded-full animate-spin-slow opacity-20"}),s.map((n,h)=>{const y=(h*72+36)*(Math.PI/180),g=140,_=Math.cos(y)*g,T=Math.sin(y)*g;return e.jsxs(b.div,{className:`absolute w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${n?"bg-white/5 border-white/10 text-slate-500":"bg-primary/20 border-primary/40 text-primary shadow-[0_0_20px_rgba(0,243,255,0.15)] scale-110"}`,style:{left:`calc(50% + ${_}px - 24px)`,top:`calc(50% + ${T}px - 24px)`,rotate:`${h*72+36}deg`},children:[e.jsx(Ne,{size:20,className:n?"":"hidden"}),e.jsx(O,{size:20,className:n?"hidden":""})]},`fork-${h}`)}),a.map((n,h)=>{const y=h*72*(Math.PI/180),g=220,_=Math.cos(y)*g,T=Math.sin(y)*g;return e.jsxs(b.div,{className:`absolute w-32 h-32 rounded-[2rem] flex flex-col items-center justify-center gap-3 border-2 transition-all duration-700 shadow-2xl ${n.status==="eating"?"bg-secondary/10 border-secondary/40 shadow-secondary/10":n.status==="hungry"?"bg-accent/10 border-accent/40 shadow-accent/10":"bg-white/5 border-white/10"}`,style:{left:`calc(50% + ${_}px - 64px)`,top:`calc(50% + ${T}px - 64px)`},animate:n.status==="eating"?{scale:1.15}:{scale:1},children:[e.jsx("div",{className:`p-4 rounded-2xl bg-black/40 ${n.status==="eating"?"text-secondary":n.status==="hungry"?"text-accent":"text-slate-500"}`,children:e.jsx(we,{size:28})}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsxs("span",{className:"text-[10px] font-black uppercase tracking-widest text-white/40 mb-1",children:["Node ",n.id]}),e.jsx("span",{className:`text-[10px] font-black uppercase tracking-[0.2em] p-1 rounded-lg ${n.status==="eating"?"bg-secondary/20 text-secondary":n.status==="hungry"?"bg-accent/20 text-accent":"text-slate-600"}`,children:n.status})]})]},`phil-${n.id}`)})]}),e.jsx("div",{className:"absolute inset-0 -z-10 opacity-20 pointer-events-none",style:{backgroundImage:"radial-gradient(circle at 50% 50%, rgba(0, 243, 255, 0.05) 0%, transparent 70%)"}})]})})]}),e.jsx(K,{algorithm:t})]})},se=[{time:"00:00",cpu:12,memory:40,io:5},{time:"00:05",cpu:34,memory:42,io:12},{time:"00:10",cpu:25,memory:45,io:8},{time:"00:15",cpu:56,memory:48,io:25},{time:"00:20",cpu:45,memory:55,io:40},{time:"00:25",cpu:89,memory:60,io:70},{time:"00:30",cpu:65,memory:58,io:45}],Ie=()=>e.jsxs("div",{className:"p-12 space-y-12 max-w-7xl mx-auto custom-scrollbar",children:[e.jsxs("div",{className:"flex items-center justify-between glass p-10 rounded-[3rem] border-white/[0.05]",children:[e.jsxs("div",{className:"flex items-center gap-8",children:[e.jsx("div",{className:"w-20 h-20 rounded-[2rem] bg-secondary/10 flex items-center justify-center text-secondary shadow-[0_0_30px_rgba(157,0,255,0.15)]",children:e.jsx(me,{size:40})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-4xl font-black italic uppercase tracking-tighter mb-2",children:"Kernel Analytics"}),e.jsxs("p",{className:"text-slate-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2",children:[e.jsx(C,{size:12,className:"text-secondary"}),"Telemetry Stream: Live"]})]})]}),e.jsxs("div",{className:"flex gap-4",children:[e.jsxs("div",{className:"glass px-6 py-4 rounded-2xl flex flex-col items-center border-white/10 min-w-[120px]",children:[e.jsx("span",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-widest",children:"Global Load"}),e.jsx("span",{className:"text-2xl font-black text-primary",children:"64.2%"})]}),e.jsxs("div",{className:"glass px-6 py-4 rounded-2xl flex flex-col items-center border-white/10 min-w-[120px]",children:[e.jsx("span",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-widest",children:"Peak Freq"}),e.jsx("span",{className:"text-2xl font-black text-secondary",children:"4.2GHz"})]})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-10",children:[e.jsxs(b.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"glass-card !p-0 overflow-hidden group",children:[e.jsxs("div",{className:"p-8 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.02]",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"p-3 rounded-xl bg-primary/10 text-primary",children:e.jsx(E,{size:20})}),e.jsx("h3",{className:"text-lg font-black uppercase italic tracking-tighter",children:"CPU Load History"})]}),e.jsx(ke,{size:16,className:"text-slate-600 group-hover:text-primary transition-colors cursor-pointer"})]}),e.jsx("div",{className:"p-8 h-[350px]",children:e.jsx(Q,{width:"100%",height:"100%",children:e.jsxs(_e,{data:se,children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"cpuGradient",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"5%",stopColor:"#00f3ff",stopOpacity:.3}),e.jsx("stop",{offset:"95%",stopColor:"#00f3ff",stopOpacity:0})]})}),e.jsx(X,{strokeDasharray:"3 3",stroke:"#ffffff05",vertical:!1}),e.jsx(Z,{dataKey:"time",stroke:"#ffffff20",fontSize:10,tickLine:!1,axisLine:!1}),e.jsx(ee,{stroke:"#ffffff20",fontSize:10,tickLine:!1,axisLine:!1}),e.jsx(te,{contentStyle:{backgroundColor:"#1a1a2e",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"1rem",fontSize:"10px"},itemStyle:{color:"#00f3ff"}}),e.jsx(Se,{type:"monotone",dataKey:"cpu",stroke:"#00f3ff",strokeWidth:3,fillOpacity:1,fill:"url(#cpuGradient)"})]})})})]}),e.jsxs(b.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},className:"glass-card !p-0 overflow-hidden group",children:[e.jsxs("div",{className:"p-8 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.02]",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"p-3 rounded-xl bg-secondary/10 text-secondary",children:e.jsx(D,{size:20})}),e.jsx("h3",{className:"text-lg font-black uppercase italic tracking-tighter",children:"Memory Allocation"})]}),e.jsx(re,{size:16,className:"text-slate-600 group-hover:text-secondary transition-colors cursor-pointer"})]}),e.jsx("div",{className:"p-8 h-[350px]",children:e.jsx(Q,{width:"100%",height:"100%",children:e.jsxs(Te,{data:se,children:[e.jsx(X,{strokeDasharray:"3 3",stroke:"#ffffff05",vertical:!1}),e.jsx(Z,{dataKey:"time",stroke:"#ffffff20",fontSize:10,tickLine:!1,axisLine:!1}),e.jsx(ee,{stroke:"#ffffff20",fontSize:10,tickLine:!1,axisLine:!1}),e.jsx(te,{contentStyle:{backgroundColor:"#1a1a2e",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"1rem",fontSize:"10px"}}),e.jsx(Le,{type:"monotone",dataKey:"memory",stroke:"#9d00ff",strokeWidth:3,dot:{fill:"#9d00ff",strokeWidth:2,r:4},activeDot:{r:6,strokeWidth:0}})]})})})]}),e.jsxs(b.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},transition:{delay:.2},className:"lg:col-span-2 glass-card !p-0 overflow-hidden",children:[e.jsxs("div",{className:"p-8 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.02]",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"p-3 rounded-xl bg-accent/10 text-accent",children:e.jsx(R,{size:20})}),e.jsx("h3",{className:"text-lg font-black uppercase italic tracking-tighter",children:"I/O Throughput Stream"})]}),e.jsxs("div",{className:"flex gap-2 text-[10px] font-bold text-slate-500",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("div",{className:"w-2 h-2 rounded-full bg-accent"})," Write Ops"]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("div",{className:"w-2 h-2 rounded-full bg-primary"})," Read Ops"]})]})]}),e.jsx("div",{className:"p-10 h-[300px]",children:e.jsx(Q,{width:"100%",height:"100%",children:e.jsxs(Pe,{data:se,children:[e.jsx(X,{strokeDasharray:"3 3",stroke:"#ffffff01",vertical:!1}),e.jsx(Z,{dataKey:"time",hide:!0}),e.jsx(ee,{stroke:"#ffffff10",fontSize:10,axisLine:!1}),e.jsx(te,{cursor:{fill:"rgba(255,255,255,0.02)"},contentStyle:{backgroundColor:"#0a0a12",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"1rem"}}),e.jsx(oe,{dataKey:"io",fill:"#ff004c",radius:[10,10,0,0],barSize:40}),e.jsx(oe,{dataKey:"cpu",fill:"#00f3ff",radius:[10,10,0,0],barSize:20})]})})})]})]}),e.jsx("section",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[{label:"Network Bridge",val:"Connected",icon:C,color:"text-primary"},{label:"L3 Cache State",val:"Synchronized",icon:R,color:"text-secondary"},{label:"Virtual Disk",val:"Mounted",icon:A,color:"text-green-500"}].map((t,d)=>e.jsxs(b.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.4+d*.1},className:"glass p-8 rounded-[2.5rem] border-white/5 flex items-center gap-6",children:[e.jsx("div",{className:`p-4 rounded-2xl bg-black/40 ${t.color}`,children:e.jsx(t.icon,{size:24})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1",children:t.label}),e.jsx("div",{className:"text-xl font-black text-white italic",children:t.val})]})]},t.label))})]}),Ge=[{title:"Process Management",icon:E,color:"text-primary",bg:"bg-primary/10",desc:"Learn about PCB, context switching, and scheduling algorithms like FCFS, SJF, and Round Robin.",topics:["Process Life Cycle","Context Switching","Scheduling Metrics"]},{title:"Thread Engineering",icon:A,color:"text-secondary",bg:"bg-secondary/10",desc:"Explore Light Weight Processes (LWP), kernel-level vs user-level threads, and multi-core execution.",topics:["Hyperthreading","Thread Pools","Race Conditions"]},{title:"Deadlock Control",icon:O,color:"text-accent",bg:"bg-accent/10",desc:"Understand the four necessary conditions for deadlock and the Banker's avoidance algorithm.",topics:["Mutual Exclusion","Circular Wait","Safe States"]},{title:"Sync Mechanisms",icon:Y,color:"text-green-500",bg:"bg-green-500/10",desc:"Master semaphores, mutexes, and monitors. Solve the Dining Philosophers and Producer-Consumer problems.",topics:["Atomic Operations","Critical Sections","Condition Variables"]}],$e=()=>e.jsxs("div",{className:"p-12 space-y-16 max-w-7xl mx-auto custom-scrollbar",children:[e.jsxs("div",{className:"flex items-center justify-between glass p-10 rounded-[3rem] border-white/[0.05]",children:[e.jsxs("div",{className:"flex items-center gap-8",children:[e.jsx("div",{className:"w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(0,243,255,0.15)]",children:e.jsx(G,{size:40})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-4xl font-black italic uppercase tracking-tighter mb-2",children:"ProcessVerse Academy"}),e.jsxs("p",{className:"text-slate-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2",children:[e.jsx($,{size:12,className:"text-primary"}),"Curriculum Core: v2.0"]})]})]}),e.jsxs("div",{className:"flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-6 py-4 rounded-2xl border border-white/10",children:[e.jsx(C,{size:16,className:"text-primary animate-pulse"}),"Learning Pulse: Active"]})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-10",children:Ge.map((t,d)=>e.jsxs(b.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:d*.1},className:"glass-card flex flex-col gap-10 group",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:`p-5 rounded-3xl ${t.bg} ${t.color} shadow-inner`,children:e.jsx(t.icon,{size:32})}),e.jsxs("div",{className:"p-3 rounded-2xl glass border-white/5 text-slate-600 group-hover:text-primary transition-colors cursor-pointer",children:[e.jsx(We,{size:20,className:"hidden"}),e.jsx(F,{size:24})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-3xl font-black italic tracking-tight",children:t.title}),e.jsx("p",{className:"text-slate-400 font-medium leading-relaxed",children:t.desc})]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:t.topics.map(a=>e.jsx("span",{className:"px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:border-primary/20 group-hover:text-slate-300 transition-all",children:a},a))}),e.jsxs("div",{className:"pt-6 border-t border-white/5 flex items-center justify-between",children:[e.jsx("span",{className:"text-[10px] font-black uppercase tracking-[0.3em] text-primary/50 group-hover:text-primary transition-colors",children:"Start Module"}),e.jsx("div",{className:"flex gap-1",children:[1,2,3].map(a=>e.jsx("div",{className:"w-1 h-1 rounded-full bg-slate-800"},a))})]})]},t.title))}),e.jsxs("section",{className:"glass rounded-[3.5rem] p-16 border-white/[0.05] relative overflow-hidden group",children:[e.jsx("div",{className:"absolute top-0 right-0 p-16 text-primary/5 -z-10 group-hover:scale-110 transition-transform duration-1000",children:e.jsx(D,{size:200})}),e.jsxs("div",{className:"max-w-3xl space-y-10",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-[10px] font-black text-primary uppercase tracking-[0.4em] mono",children:"Advanced Engineering"}),e.jsx("h2",{className:"text-5xl font-black italic uppercase tracking-tighter italic",children:"Deep Dive Resources"}),e.jsx("p",{className:"text-slate-400 text-lg font-medium leading-relaxed",children:"Access peer-reviewed documentation, kernel source snippets, and advanced simulation parameters to extend your knowledge."})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-6",children:["Kernel Synchronization Primitives","Advanced Scheduler Architecture","Memory Subsystem Engineering","Distributed Systems Logic"].map(t=>e.jsxs("div",{className:"p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-between group/res cursor-pointer hover:bg-white/[0.05] transition-all",children:[e.jsx("span",{className:"text-xs font-bold text-slate-300 uppercase tracking-widest",children:t}),e.jsx(Ce,{size:16,className:"text-slate-600 group-hover/res:text-primary transition-colors"})]},t))}),e.jsxs("button",{className:"btn-primary px-10 py-4 flex items-center gap-3 text-sm",children:["Open Knowledge Base",e.jsx(R,{size:18,fill:"currentColor"})]})]}),e.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"})]})]}),We=({size:t,className:d})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:d,children:[e.jsx("polyline",{points:"15 3 21 3 21 9"}),e.jsx("polyline",{points:"9 21 3 21 3 15"}),e.jsx("line",{x1:"21",y1:"3",x2:"14",y2:"10"}),e.jsx("line",{x1:"3",y1:"21",x2:"10",y2:"14"})]});function qe(){var m;const[t,d]=o.useState("processes"),[a,r]=o.useState(!1);o.useEffect(()=>{const l=()=>r(p=>!p),w=()=>r(!1);return window.addEventListener("GLOBAL_PLAY_TOGGLE",l),window.addEventListener("GLOBAL_RESET",w),()=>{window.removeEventListener("GLOBAL_PLAY_TOGGLE",l),window.removeEventListener("GLOBAL_RESET",w)}},[]);const s=[{id:"dashboard",label:"Monitor",icon:Ee},{id:"processes",label:"Processes",icon:E},{id:"threads",label:"Threads",icon:A},{id:"deadlocks",label:"Deadlocks",icon:O},{id:"sync",label:"Synchronization",icon:Y},{id:"performance",label:"Analytics",icon:me},{id:"learn",label:"Academy",icon:G}];return e.jsxs("div",{className:"flex h-screen bg-[#0a0a12] text-slate-100 overflow-hidden",children:[e.jsxs("aside",{className:"w-72 bg-[#0c0c1e]/50 border-r border-white/[0.05] flex flex-col glass z-20",children:[e.jsx("div",{className:"p-8 mb-4",children:e.jsxs("div",{className:"flex items-center gap-3 group cursor-pointer",children:[e.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.3)] group-hover:rotate-12 transition-transform duration-500",children:e.jsx(E,{size:24,className:"text-black",strokeWidth:2.5})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-black tracking-tight neon-text-cyan leading-none",children:"PROCESS"}),e.jsx("span",{className:"text-[10px] font-bold tracking-[0.3em] text-secondary",children:"VERSE OS v1.0"})]})]})}),e.jsxs("nav",{className:"flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar",children:[e.jsx("div",{className:"px-4 mb-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]",children:"Core Systems"}),s.map(l=>e.jsxs("button",{onClick:()=>d(l.id),className:`sidebar-item group ${t===l.id?"sidebar-item-active":"text-slate-500 hover:text-slate-100 hover:bg-white/[0.03]"}`,children:[e.jsx("div",{className:`p-2 rounded-xl transition-colors ${t===l.id?"bg-primary/20 text-primary":"bg-slate-900/50 group-hover:bg-slate-800"}`,children:e.jsx(l.icon,{size:18})}),e.jsx("span",{className:"font-semibold text-sm tracking-wide",children:l.label}),t===l.id&&e.jsx(b.div,{layoutId:"active-pill",className:"absolute right-0 w-1 h-8 bg-primary rounded-l-full shadow-[0_0_15px_rgba(0,243,255,1)]"})]},l.id))]}),e.jsx("div",{className:"p-6",children:e.jsxs("div",{className:"glass-card p-4 rounded-3xl bg-primary/5 border-primary/10",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx("div",{className:"w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,243,255,1)]"}),e.jsx("span",{className:"text-[10px] font-bold text-primary uppercase tracking-widest",children:"System Stable"})]}),e.jsx("p",{className:"text-[10px] text-slate-400 font-medium",children:"Kernel: 5.15.0-generic"}),e.jsx("p",{className:"text-[10px] text-slate-400 font-medium",children:"Uptime: 14h 22m"})]})})]}),e.jsxs("main",{className:"flex-1 flex flex-col h-full relative overflow-hidden",children:[e.jsx("div",{className:"absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full -z-10"}),e.jsx("div",{className:"absolute bottom-[-10%] left-[10%] w-[30%] h-[30%] bg-secondary/5 blur-[120px] rounded-full -z-10"}),e.jsxs("header",{className:"h-20 border-b border-white/[0.05] flex items-center justify-between px-10 bg-[#0a0a12]/40 backdrop-blur-xl z-10",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("h2",{className:"text-2xl font-black text-white tracking-tight uppercase italic",children:(m=s.find(l=>l.id===t))==null?void 0:m.label}),e.jsx("div",{className:"h-4 w-px bg-slate-800 hidden md:block"}),e.jsx("span",{className:"text-xs font-mono text-slate-500 hidden md:block uppercase tracking-widest",children:"Environment / Lab_Sector_01"})]}),e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsxs("div",{className:"hidden lg:flex items-center gap-4 px-6 py-2 rounded-full bg-slate-900/50 border border-slate-800 font-mono text-[10px]",children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("span",{className:"text-slate-500 uppercase tracking-tighter",children:"CPU Load"}),e.jsx("span",{className:"text-primary font-bold",children:"12.4%"})]}),e.jsx("div",{className:"w-px h-6 bg-slate-800"}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("span",{className:"text-slate-500 uppercase tracking-tighter",children:"Memory"}),e.jsx("span",{className:"text-secondary font-bold",children:"4.2 GB"})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{onClick:()=>window.dispatchEvent(new CustomEvent("GLOBAL_RESET")),className:"w-10 h-10 rounded-2xl glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border-slate-800",children:e.jsx(q,{size:18})}),e.jsxs("button",{onClick:()=>window.dispatchEvent(new CustomEvent("GLOBAL_PLAY_TOGGLE")),className:`px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all flex items-center gap-2 active:scale-95 ${a?"bg-amber-500/20 text-amber-500 border border-amber-500/30":"bg-primary text-black"}`,children:[a?e.jsx(W,{size:14}):e.jsx(U,{size:14,fill:"currentColor"}),a?"PAUSE SYSTEM":"LIVE RUN TOGGLE"]})]})]})]}),e.jsx("div",{className:"flex-1 overflow-y-auto custom-scrollbar relative",children:e.jsx(P,{children:e.jsxs(b.div,{initial:{opacity:0,filter:"blur(10px)",y:20},animate:{opacity:1,filter:"blur(0px)",y:0},exit:{opacity:0,filter:"blur(10px)",y:-20},transition:{duration:.4,ease:[.23,1,.32,1]},className:"h-full",children:[t==="dashboard"&&e.jsx(Re,{onStart:()=>d("processes")}),t==="processes"&&e.jsx(Oe,{}),t==="threads"&&e.jsx(Be,{}),t==="deadlocks"&&e.jsx(Ue,{}),t==="sync"&&e.jsx(De,{}),t==="performance"&&e.jsx(Ie,{}),t==="learn"&&e.jsx($e,{})]},t)})})]})]})}ae.createRoot(document.getElementById("root")).render(e.jsx(Ae.StrictMode,{children:e.jsx(qe,{})}));
