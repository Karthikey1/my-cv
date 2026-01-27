---
title: "Work"
date: 2026-01-27
draft: false
layout: "single"
---

{{< rawhtml >}}
<section>
    <p class="hero-bio" style="margin-bottom: 4rem;">
        A selection of my engineering work in kernel development, real-time systems, and lower-level infrastructure.
    </p>

    <div class="project-item">
        <div class="project-header">
            <a href="#" class="project-title">FMLP Implementation for RTEMS</a>
            <span class="project-meta">C / RTEMS Kernel</span>
        </div>
        <p class="project-desc">
            Implemented the Flexible Multiprocessor Locking Protocol (FMLP) for the RTEMS SMP environment. 
            Developed FMLP-Short (spin-based) and FMLP-Long (suspension-based) mechanisms utilizing atomic primitives to optimize resource sharing in multi-core real-time systems.
            This work involved deep understanding of the RTEMS scheduler and locking primitives.
        </p>
    </div>

    <div class="project-item">
        <div class="project-header">
            <a href="https://git.kernel.org" class="project-title">Linux Kernel Atomisp Driver Refactor</a>
            <span class="project-meta">C / Linux Staging</span>
        </div>
        <p class="project-desc">
            Active contributor to the Linux Kernel staging tree, specifically the Atomisp camera driver.
            Refactored legacy code, fixed coding style violations (checkpatch), optimized memory handling, and resolved sparse static analysis warnings.
            My patches have been accepted into the mainline kernel.
        </p>
    </div>

    <div class="project-item">
        <div class="project-header">
            <a href="#" class="project-title">Custom Memory Allocator</a>
            <span class="project-meta">C / System Internals</span>
        </div>
        <p class="project-desc">
            Designed and implemented a custom <code>malloc</code>/<code>free</code> replacement in C using a doubly linked free list with best-fit and first-fit strategies.
            Optimized for reduced fragmentation and analyzed heap performance metrics against the standard glibc allocator.
        </p>
    </div>

    <div class="project-item">
        <div class="project-header">
            <a href="#" class="project-title">Accident Prediction System</a>
            <span class="project-meta">Python / TensorFlow</span>
        </div>
        <p class="project-desc">
            Developed a predictive model for accident probabilities using traffic and weather data. 
            Achieved 85.3% accuracy in forecasting potential accident zones. This project was a finalist in the UYIR Road Safety Hackathon.
        </p>
    </div>
</section>
{{< /rawhtml >}}
