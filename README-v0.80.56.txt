B7 FI Command Center v0.80.56 — Single Navigation Authority

Purpose
- Replace the visible secondary page navigation/action layer with one authoritative renderer.
- Keep older workflow toolbar logic available invisibly for compatibility, so existing Save/Edit workflows continue to work without rendering duplicate controls.
- Enforce exactly one active main Center at a time and keep header title/theme synchronized with the current Center.

Navigation convention
LEFT = pages/views in the active Center.
RIGHT = actions for the active page.
Edit mode = Save / Cancel (plus Delete Tool where applicable).

Priority: Weekday Priorities / Weekend Priorities.
Status: Weekday Morning Status / Leads Extra Status / Weekend Morning Status.
Shipping: actions only.
Meeting: meeting types on left; Start selected meeting on right; recurring-card navigation hidden.
Action: Add Alert on right.
Reference: FI Knowledge / Reference Files on left; contextual action on right.
Search: Screenshot / Report only on right; search bar remains in body.
Tool: CY26Q3 Tools / Tool Countdown / Tool Archive on left with contextual Add/Edit/Archive/Delete actions on right.

Important
The underlying tool data, backup/restore, alert generation, live-status data, and archive behavior are intentionally unchanged in this stabilization build.
