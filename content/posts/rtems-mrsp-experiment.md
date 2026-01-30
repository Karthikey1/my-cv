---
title: "How I Crashed RTEMS: The MrsP Experiment"
date: 2026-01-20
draft: false
tags: ["RTEMS", "MrsP", "Debugging", "SuperCore"]
layout: "single"
---

Before I could even think about implementing FMLP, I had to understand the beast I was dealing with. The RTEMS 7 SMP SuperCore is strict. Very strict.

I decided to start with a "simple" homework assignment: Verify the existing **Multiprocessor Resource Sharing Protocol (MrsP)** implementation using the `smpmrsp01` test suite on the SIS/Leon3 simulator.

### The Experiment

I wanted to see what happens when you break the rules. I modified the `init.c` taskset to intentionally misconfigure the priorities:
*   **Main Task Priority**: Set to 1 (Very High).
*   **MrsP Ceiling**: Set to 5 (Lower).

### The Crash

The result was immediate and violent.

```text
fatal error: assertion failed: 
mrsp_obtain_and_release_with_help: line 1411
```

A terminal assertion failure. The kernel didn't just warn me; it panicked.

### The Lesson

Digging into the switch logs, I realized this wasn't just a bug. It was a feature. RTEMS 7 monitors task-to-processor affinity and priority elevation with an iron fist. The mismatch I created violated the fundamental invariants of the MrsP protocol.

This failure was the best thing that could have happened. It forced me to dive deep into `Thread_queue` and `ISR_Lock` primitives before I wrote a single line of FMLP code. You can't misuse the SuperCore and get away with it.
