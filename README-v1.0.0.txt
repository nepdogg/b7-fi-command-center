B7 FI COMMAND CENTER v1.0.0 — CLEAN RUNTIME / OPERATIONS FINAL TEST

Purpose
- Establish one authoritative application version (1.0.0).
- Hide intermediate legacy render passes so refresh reveals only the final UI.
- Remove the two most recent navigation observer/repair layers from startup.
- Add one final runtime authority for main navigation and page navigation conventions.
- Keep existing business/data workflows available during migration.
- Finalize Operations Center family process display and photo sizing.

Operations Center
- Quarter totals + overall shipping progress retained.
- Tool family display is a lifecycle/process flow:
  TOTAL → WAITING FI → IN FI → PACKING → SHIPPED
- Family names, labels, and values enlarged and centered.
- Operations content uses one full-width page rail.
- Product images enlarged and remain automatic for new tools based on code name.

Version Authority
- js/version-v1000.js is the only intended active version source.
- Browser title and footer are enforced from that value.
- A narrow version guard corrects legacy scripts if they attempt to rewrite those two labels.

Navigation
- Main navigation buttons are replaced at boot with clean v1 handlers.
- One page toolbar owns the Left = Views / Right = Actions convention.
- Legacy duplicate #b7PageToolbar is hidden.

Important
This is the first clean-runtime migration build, not yet the final codebase purge.
It deliberately preserves the mature legacy business/data functions so existing backups and tool records remain usable while ownership of startup/version/navigation is moved to the v1 runtime.
