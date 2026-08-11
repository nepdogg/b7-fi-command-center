# Building 7 - Final Integration - Operations v0.16

## Automatic In-FI propagation

Changing a Tool from Waiting for FI to In FI now automatically makes that same Tool appear on every active FI page:

- Tool Countdown
- Tools
- Morning Status
- Weekday Priorities
- Weekend Priorities
- Shipping Schedule

No separate page activation is required.

### Waiting for FI
Only appears on Tool Countdown.

### In FI
Appears automatically on every active FI page.

Weekday/Weekend:
- new tools appear as Unprioritized until a priority number is assigned
- Tool Assignment is reused when available
- otherwise the row can remain Unassigned

Shipping:
- a placeholder Shipping Plan appears immediately
- Publish = N/A
- Schedule Status = N/A
- unentered handoff dates display N/A
- MST stays N/A for tools where MST is not applicable

### Shipped
Remains on Tool Countdown and Tools.
Leaves Morning / Weekday / Weekend active work views.
A completed/historical Shipping Plan can remain visible.

### Archive
Archive page only.

All v0.15 sticky-header and Edit Mode fixes remain.
