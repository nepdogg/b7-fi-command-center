B7 FI COMMAND CENTER v0.80.19 — ALERT SYSTEM / ACTION CENTER STABILIZATION

This build replaces the competing recent alert engines with one authoritative v0.80.19 engine.

Alert System
- Permanent LEAD ALERTS and SYSTEM STATUS shells on Command Center and both Live Status views.
- Empty state remains visible: NORMAL / green / 0 OPEN.
- One severity source controls border, dividers, beacon, severity label and glow.
- No moving perimeter pulses.
- One Lead Alerts queue, one timer, per-message saved display duration.
- One System Status queue, one timer; no Loading system status during rotation.
- Critical popup reads the SAME active Lead Alerts queue, so Lead Alerts OFF also disables popup eligibility.

Action Center
- Lead Alerts ON/OFF is authoritative after Save.
- Dirty-state tracking: SAVE ALL CHANGES saves only changed cards.
- Confirmation reports Saved 1 changed alert / Saved N changed alerts / No changes to save.
- Manual alerts: SAVE CHANGES, RESOLVE, DELETE.
- Automatic alerts cannot be deleted/resolved manually; they clear from the Tool/workflow source.
- Manual Add Task stores display settings under the canonical manual:<id> key.
- Controls reflow inside cards and checkbox alignment is corrected.
- Active Lead Alerts diagnostic shows exactly how many messages are feeding the bar by category.

Version
- Main page and standalone Live Status use v0.80.19 as the active visible version/title.
