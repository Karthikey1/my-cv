---
title: "Inside the Kernel: Architecting FMLP for RTEMS 7"
date: 2026-01-27
draft: false
tags: ["RTEMS", "Kernel Hacking", "C", "SuperCore"]
layout: "single"
---

The goal was clear: Introduce the **Flexible Multiprocessor Locking Protocol (FMLP)** into the RTEMS 7 SMP SuperCore. But bridging the gap between a 2020 research patch and a 2026 production kernel required a massive architectural overhaul.

### The SuperCore Logic

I had to introduce two new control structures into `cpukit/score`:
*   `FMLPS_Control`: Manages the metadata for the **Short** (busy-wait) variant.
*   `FMLPL_Control`: Manages the state for the **Long** (suspension) variant.

Unlike the research code which used ad-hoc locking, I aligned everything with the modern `Thread_queue_Context`. This ensures that every state transition - whether it is enqueuing a thread or handing off a lock - is atomic and SMP-safe across clustered configurations.

### The Wait Discipline: Strict FIFO

Standard RTEMS queues are priority-sorted. But FMLP demands predictability. I implemented a **FIFO wait-queue discipline** for both variants.

Why? In multiprocessor resource sharing, you often want to minimize the worst-case blocking time rather than greedily serving the highest priority. FIFO gives us those theoretical bounds.

### API & Observability

It is not real if the user cannot see it.

**Classic API**: I extended the Semaphore Manager. Users can now explicitly select their locking protocol:
*   `RTEMS_FLEXIBLE_MULTIPROCESSOR_LOCKING_SHORT`
*   `RTEMS_FLEXIBLE_MULTIPROCESSOR_LOCKING_LONG`

**Monitor**: I patched `cpukit/libmisc/monitor/mon-sema.c`. Now, when you are debugging a system crash at 2 AM, the monitor will correctly identify and display these new semaphore types instead of showing "Unknown".

This was not just a port. It was a modernization.
