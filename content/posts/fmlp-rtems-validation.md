---
title: "Breaking the Scheduler: Validating FMLP for GSoC 2026 (Part 2)"
date: 2026-01-27
draft: false
tags: ["RTEMS", "Real-time", "C", "SMP", "Testing"]
layout: "single"
---

In the last post, I talked about how I modernized the FMLP implementation. But writing the code is only half the battle. Maintainers like **Gedare Bloom** and **Joel Sherrill** demanded proof that my changes didn't break the math.

### Validation Strategy: Beyond "It Works"

I couldn't just run a "happy path" test. I had to build a suite that actively tried to break the scheduler.

*   `spfmlp01`: Validates the Long (suspension) variant.
*   `spfmlp02`: Validates the Short (busy-wait) variant.

But the real beast was equal to **spfmlp03**.

### The "Tricky" Suite

This suite was specifically built to handle corner cases suggested by **Dr. Kuan-Hsun Chen**.

We tested **Duplicate Priorities**, ensuring strict FIFO ordering when multiple tasks have the same priority level. We also hammered the **Ceiling Boundaries**, testing the logic when tasks hit the exact priority ceiling of a resource.

All tests were verified on the **SIS/LEON3 simulator** using a **4-CPU Clustered SMP configuration**.

### Stakeholder Dynamics

This port wasn't just a coding task; it was an exercise in managing open-source stakeholders.

**Dr. Kuan-Hsun Chen** (Researcher) provided the "solid effort" endorsement but warned that regression tests are just "validation results" rather than "full verification".

**Dr. Junjie Shi** (Industry Expert) recommended future **formal verification (Frama-C)** to provide absolute confidence in the synchronization logic.

**Gedare Bloom** (Maintainer) used this project as a "capability audition" for my **GSoC 2026 application**.

### Future Work: The Distributed Leap

So what is next? **DFLP (Distributed FMLP)**.

Dr. Chen suggested this as the "perfect next step". Unlike standard FMLP, the distributed variant involves migrating a task requesting a shared resource to a **dedicated processor** where the resource owner lives.

That is the vision for GSoC 2026.

*[Read Part 1: Implementation Logic](/my-cv/posts/fmlp-rtems-implementation)*
