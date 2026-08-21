B7 FI Command Center v0.49.1 — Header / Page Actions Final Layout Fix

Built directly from v0.49.0.

Targeted fix:
- B7 FI Actions occupies its own fixed 70px row.
- A true 10px grid spacer separates the ticker from Page Actions.
- Page Actions occupies its own 46px normal-flow row.
- Removed the v0.49.0 pseudo-element spacer that caused Page Actions to overlap the ticker.
- Removed top/bottom/transform positioning artifacts on the toolbar and its buttons.
- Kept the top and bottom ticker animations fully inside the B7 FI Actions row.
- Bottom ticker animation remains above the lower border.
- Page Actions label and buttons are explicitly forced visible and vertically centered.
- Main stylesheet cache version updated to v0491 so GitHub Pages/browser does not keep the v0.49.0 layout.
- All v0.49.0 Knowledge Base, Morning Meeting, Weekend, Tool, Action Center, Wallboard, Shared Data and Reference Files functionality is preserved.
