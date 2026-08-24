B7 FI Command Center v0.44.0 — Lifecycle Simulation Test

Built directly from v0.43.0.

Latest simulation-focused changes:
- Standardized all Tool Countdown cards to one physical desktop size.
- Added lifecycle color + shape language:
  Waiting for FI = red diamond
  In FI = gold circle
  Packing = cyan hexagon
  Shipped = green rounded square
- Status text remains visible inside every shape.
- Hover/focus glow is lifecycle-color matched; cards do not move or scale.
- Actual FI Progress bar now has a strong visible gold fill.
- Micro Schedule Target remains cyan and equally visible.
- Waiting-for-FI cards suppress FI progress, Micro Schedule, checklist/progress status.
- Removed the redundant Current Quarter Commitment by Tool Type heading.
- Restored semantic color coding on Total / Waiting FI / In FI / Shipped family counters.
- Preserved automatic badges for Reduced Process, Customer Source Required, STR Required,
  Packing Active, Pull-In/Push-Out, ship-date changes, customer changes and SO changes.
- Page Actions now uses a small protected gap below the Action bar followed by equal
  internal top/bottom spacing.
- Top and bottom Action-bar animations use the same visual geometry with opposite direction.
