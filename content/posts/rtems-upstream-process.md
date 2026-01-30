---
title: "The Upstream Game: Refining the FMLP Port"
date: 2026-01-28
draft: false
tags: ["RTEMS", "Open Source", "Git", "Licensing"]
layout: "single"
---

Writing code is easy. getting it merged is hard.

After getting FMLP working, I faced the reality of upstreaming code to a major open-source project like RTEMS. The initial feedback on my Merge Request (!882) wasn't about the logic; it was about the *process*.

### The "Import vs. Port" Dilemma

My first commit was a giant blob of changes. That is a rookie mistake.

Reviewers pointed out that I needed to respect the history of the original research code. So, I split the work into two distinct commits:
1.  **The Import**: Bringing in the original research findings from Junjie Shi et al. cleanly.
2.  **The Port**: My specific adaptations for RTEMS 7 (the "modernization" logic).

This structure allows maintainers to see exactly what I changed versus what was original research.

### Licensing & Attribution

You cannot just copy-paste code and call it a day. I spent hours verifying that the original research authorship and copyrights were preserved in every single file. Open source runs on credit.

### The Final Polish

I also had to clean house on formatting. Research code is notoriously messy with whitespace. I sanitized the core logic and test suites to meet the strict RTEMS coding standards.

It is tedious work, but it is the difference between a "hack" and a "product".
