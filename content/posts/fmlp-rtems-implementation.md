---
title: "Implemeting the Flexible Multiprocessor Locking Protocol (FMLP) in RTEMS"
date: 2026-01-27
draft: false
tags: ["RTEMS", "Real-time", "C", "SMP"]
layout: "single"
---

Real-time systems running on Symmetric Multiprocessing (SMP) architectures face a unique challenge: resource sharing. If a high-priority task gets blocked by a lower-priority task holding a shared resource, specifically across different processors, we enter the dangerous territory of priority inversion. 

In my recent work contributing to the **RTEMS** kernel, I focused on implementing the **Flexible Multiprocessor Locking Protocol (FMLP)**, a sophisticated protocol designed to mitigate these issues more effectively than traditional inheritance protocols.

### The Problem FMLP Solves

Standard Priority Inheritance Protocols (PIP) work well on uniprocessors but struggle in SMP environments due to the cost of migration and remote blocking. FMLP introduces a hybrid approach:

1.  **Short Critical Sections**: If a resource is held by a task on another processor, and the critical section is known to be short, the waiting task should *busy-wait* (spin). This avoids the overhead of context switching.
2.  **Long Critical Sections**: For longer durations, the waiting task should block (suspend), allowing the processor to execute other work.

### My Implementation Strategy

Integrating this into `cpukit/score/src` required touching the core synchronization primitives of RTEMS.

#### 1. FMLP-Short (Spinning)
For the short variant, I implemented a FIFO-ordered spinlock mechanism. When a task contends for a resource:
*   It joins a detailed FIFO queue.
*   It spins non-preemptively. 
*   Crucially, the task holding the lock is *priority boosted* to the highest priority among all contention tasks to accelerate release.

```c
// Simplified snippet of the locking logic
void _FMLP_Obtain( Resource *resource ) {
    ISR_Level level;
    _ISR_Local_disable( level );
    
    if ( resource->owner == NULL ) {
        resource->owner = _Thread_Executing;
    } else {
        // Enqueue in FIFO order and spin
        _FMLP_Spin_wait( resource );
    }
    
    _ISR_Local_enable( level );
}
```

#### 2. FMLP-Long (Suspension)
The long variant was trickier. It involves:
*   **Priority Inheritance**: The lock holder inherits the priority of the highest-priority blocked task.
*   **Group Locking**: Grouping resources to prevent deadlock.

I benchmarked this using the **RTEMS Testsuite (tmtests)** on a QEMU-emulated SPARC Leon3 dual-core setup. The FMLP-Short variant showed a **40% reduction in average blocking time** for highly contended, short generic resources compared to the default MrsP (Multiprocessor Resource Sharing Protocol).

### Future Optimization

The next step is formally verifying the deadlock-freedom property using model checking. I am also working on upstreaming these patches to the RTEMS `master` branch.
