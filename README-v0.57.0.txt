B7 FI Command Center v0.57.0 — Authoritative Router + Theme Cleanup

WHY THIS BUILD
v0.52-v0.56 accumulated multiple route/theme wrappers and observers. They could render one page,
then recolor/reroute it again, causing flicker and broken Status/Reference Center navigation.
v0.57 removes those late shell scripts and replaces them with one authoritative router/theme controller.

CENTER COLORS
Operations Center = Gold
Tool Center = Purple
Shipping Center = Green
Priority Center = Blue
Status Center = Orange
Meeting Center = Cyan
Action Center = Red
Reference Center = Pink
Administration Center = Silver

ROUTING
- Operations Center
- Tool Center: current quarter tools / Tool Archive
- Shipping Center
- Priority Center: Weekday / Weekend
- Status Center: Morning Status / Leads Extra Status
- Meeting Center
- Action Center
- Reference Center: FI Knowledge / Reference Files
- Administration Center: Admin Home / Data & Backup / Wallboard Configuration

SHELL
- One explicit 42 / 16 / 42 header grid.
- B7 FI Command Center left, KLA+ centered on black, active Center right.
- Matching symmetric separator treatment around KLA+.
- Bottom alert/status animation restored as one dedicated border animation.
- Operations Center has no Page Actions bar.
- Obsolete legacy Page Action links removed on operational Centers.
- Administration Center is in the footer.
- Footer version now shows v0.57.0.

OPERATIONS CENTER
- Exactly 9 larger live cards.
- Tool Countdown renamed Tool Center.
- No passive top KPI cards.
- No duplicate cards.
- Every card uses the destination Center's color and hover glow.

Version 0.57.0
