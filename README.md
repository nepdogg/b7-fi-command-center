# Building 7 - Final Integration - Operations v0.14

## Read Only / Edit Mode simulation
The Command Center now opens in Read Only mode.

- Enable Editing: prompts for an editor name and unlocks changes.
- Release Editing: returns to Read Only mode.
- Editing In Use: appears if another session in the same browser profile owns the local lock.
- Heartbeat refreshes every 30 seconds.
- Stale local locks expire after 2 minutes.

Important: this v0.14 lock is a browser-local simulation. It cannot coordinate separate computers yet because the live data and lock are still stored in localStorage. True cross-computer locking requires a shared Microsoft 365 data/lock backend.

All v0.13 functionality is retained.
