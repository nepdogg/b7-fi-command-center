B7 FI Command Center v0.80.16

Alert / Action stabilization build.

- One authoritative Lead Alerts rotation queue.
- Lead Alerts OFF is honored immediately after Save / Save All.
- Each message uses its saved Display Time exactly.
- Legacy competing ticker intervals disabled.
- System Status uses one queue and never shows Loading during normal rotation.
- System Status falls back to a deliberate NORMAL message when no conditions exist.
- Unified stable status-bar shell: name/severity, centered message, counter, severity color/glow.
- Automatic actions cannot be resolved/deleted manually; they clear from Tool/workflow data.
- Manual actions gain Save, Resolve, Delete, History, and Reopen.
- Action cards reflow controls so they remain inside their cards.
- Queue diagnostic added for testing.
- Standalone Live Status viewer uses the same Lead Alerts/System Status engine.
