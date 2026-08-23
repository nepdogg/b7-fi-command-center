B7 FI Command Center v0.72.0 — Shared Status Bar + Page Navigation Framework

This build is based directly on the uploaded complete GitHub repository.

FIXES IN THIS BUILD
- Restores one fixed 48 px Page Navigation row on every Center.
- Keeps local page navigation on the left and page actions on the right.
- Removes page-specific top gaps by normalizing the first content block beneath the shared header framework.
- Makes Action Status and Fleet Status use the same 62 px desktop outer height.
- Centers both status messages vertically and horizontally.
- Prevents the Fleet Status right summary from being clipped by using a responsive summary region and wrapping when needed.
- Adds explicit Fleet Status classification: CRITICAL, ATTENTION, REMINDER, INFORMATION, ON TRACK, or NORMAL.
- Makes Action Status and Fleet Status borders, edge sweep/glow, beacon lamp, and beacon panel derive from the current message condition instead of the current Center color.
- Critical status uses a slow glow pulse; Attention uses a softer pulse. Neither changes layout dimensions.
- Preserves reduced-motion behavior.
- Preserves all existing v0.71.0 functionality and data.

TEST FOCUS
1. Move through every Center and confirm Page Navigation height never changes.
2. Confirm navigation buttons remain left and action buttons remain right.
3. Confirm the first page content begins at the same vertical position in every Center.
4. Cycle Action Status messages and verify beacon/border/glow colors follow severity.
5. Change Fleet Status text to examples containing blocked, behind, at risk, ahead, or on schedule and verify classification/color changes.
6. Confirm Fleet Status right-side summary remains fully readable at normal desktop widths.
7. Recheck Operations, Tool, Shipping, Priority, Status, Meeting, Action, and Reference Centers.
