---
title: "GSoC 2026 Proposal: Formal Verification of SMP Lock Protocols"
date: 2026-01-27
draft: false
tags: ["GSoC", "Open Source", "Verification", "Promela"]
layout: "single"
---

As we move towards RTEMS 7, Symmetric Multiprocessing (SMP) support is becoming a first-class citizen. However, writing correct SMP locking code is notoriously difficult. A subtle race condition in a spinlock implementation might only manifest once in a million execution cycles—but in a mission-critical satellite or medical device, that one failure is unacceptable.

For Google Summer of Code 2026, I am drafting a proposal to **Formally Verify the RTEMS SMP Locking Protocols** using **Promela** and the **SPIN Model Checker**.

### The Objective

My goal is to create a mathematical model of the newly implemented Flexible Multiprocessor Locking Protocol (FMLP) and prove two critical properties:
1.  **Deadlock Freedom**: No strict circular dependency exists between tasks.
2.  **Starvation Freedom**: Every waiting task eventually acquires the lock.

### Methodology

I intend to model the RTEMS Scheduler and Mutex state machines in Promela.

```promela
/* Rough concept of a task model in Promela */
mtype = { LOCKED, UNLOCKED };
byte lock_state = UNLOCKED;

active proctype Task() {
    do
    :: atomic {         
           if
           :: (lock_state == UNLOCKED) -> 
               lock_state = LOCKED; 
               /* Critical Section */
               lock_state = UNLOCKED;
           :: else -> 
               /* Spin or suspend */
               skip 
           fi
       }
    od
}
```

### Why This Matters

Testing can show the presence of bugs, but only formal verification can prove their absence. By integrating model checking into the RTEMS development workflow, we can ensure that our synchronization primitives are mathematically robust, laying a foundation for safety-critical certification (like ECSS or DO-178C).

This proposal builds directly on my previous work implementing FMLP, closing the loop from implementation to validation.
