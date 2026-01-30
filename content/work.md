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
            <a href="https://gitlab.rtems.org/rtems/rtos/rtems/-/merge_requests/882" class="project-title" target="_blank">FMLP Implementation for RTEMS <span style="font-size: 0.8em; color: var(--text-tertiary);">↗</span></a>
            <span class="project-meta">C / RTEMS Kernel</span>
        </div>
        <p class="project-desc">
            Ported the Flexible Multiprocessor Locking Protocol (FMLP) to RTEMS 7. implemented spin-based and suspension-based locking for SMP real-time systems.
        </p>
    </div>

    <div class="project-item">
        <div class="project-header">
            <a href="https://git.kernel.org/pub/scm/linux/kernel/git/gregkh/staging.git/commit/?id=44b225bf0738e7b0644be1cc638871e930ffe1e5" class="project-title" target="_blank">Linux Staging: Race Condition Fix <span style="font-size: 0.8em; color: var(--text-tertiary);">↗</span></a>
            <span class="project-meta">C / Linux Kernel</span>
        </div>
        <p class="project-desc">
            Fixed a critical race condition in the <code>rtl8723bs</code> driver where security and PHY info updates were non-atomic. Hardened the transmission path by implementing proper locking.
        </p>
    </div>


</section>
{{< /rawhtml >}}
