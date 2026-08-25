B7 FI Command Center v0.74.1 — Responsiveness Hotfix

Fixes a lockup risk introduced in v0.74.0 by removing the continuous MutationObserver / recurring status-stack re-parent loop.

Kept:
- Fleet Status directly under Action Status
- shared status stack layout
- Fleet message centering
- polished global footer

Changed for stability:
- top status stack is positioned only during initial load (bounded retries only)
- no persistent observer watches the status stack
- no repeating 2.2 second shell mutation timer
- footer no longer duplicates the opsSync element id
