B7 FI COMMAND CENTER v0.80.22
STATUS PLACEMENT + LIVE STATUS PARITY + TOOL EDITOR RECOVERY

Focused fixes only:
- Keeps v0.80.20 Lead Alerts/System Status queue logic unchanged.
- Removes all legacy status spacer/pseudo rows from the Command Center shell.
- Places the working status pair directly below main Center navigation and above Page Actions.
- Forces regular Live Status and view-only Live Status to use the same v0.80.20 status-bar geometry.
- Reduces Live Status gap between System Status and the five summary boxes to 12 px.
- Keeps only one Lead Alerts + System Status pair in Live Status mounts.
- Restores Tool editor tabs hidden by the older v0.61 focused-editor layer:
  Tool Information / Tool Progress / Lead-Admin / Shipping / NCs / Custom Fields.
- Restores access to checklist state editing so System Status clearing can be tested from Tool workflow.
- No new interval, MutationObserver, or alert-engine rewrite.
