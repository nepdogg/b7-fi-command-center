B7 FI COMMAND CENTER v0.80.18 — ALERT SYSTEM LOCKDOWN II

Focus: finalize Lead Alerts/System Status before other Center testing.

Changes:
- Permanent Lead Alerts and System Status shells on Command Center and both Live Status views.
- Empty queues render green NORMAL states instead of disappearing.
- Exactly one left and one right divider.
- Severity controls border/dividers/beacon/glow; primary text stays white.
- Larger mathematically centered center messages.
- Viewer-only page keeps both bars visible even when all Lead Alerts are OFF.
- Critical popup is rejected if its action is disabled, acknowledged, expired, or otherwise not in the active Lead Alerts queue.
- Action Center Save All immediately rebuilds the active Lead Alerts queue.
- Manual actions get explicit SAVE CHANGES / RESOLVE / DELETE controls.
- Automatic actions cannot be manually resolved/deleted and continue to clear from their underlying Tool/workflow.
- Application/browser/footer version unified to v0.80.18.
