B7 FI Command Center v0.80.21 — Status Placement / Duplicate Shell Cleanup

Focused changes only:
- Keeps the working v0.80.20 Lead Alerts and System Status renderer/queues unchanged.
- Restores Command Center framework order: Center Navigation -> Lead Alerts -> System Status -> Page Actions -> page content.
- Removes legacy blank/duplicate status rows from both Live Status displays.
- Regular Live Status retains Return to B7 FI Command Center.
- Viewer-only Live Status retains no return link.
- Retired topActionBar/operationsBar DOM is kept outside layout for compatibility with older scripts.
- Browser/footer version set to v0.80.21.
