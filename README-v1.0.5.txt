B7 FI Command Center v1.0.5 — Night Stabilization
======================================================

PURPOSE
-------
This is a focused stabilization patch for the current v1.0.4 runtime.

It fixes the problems seen in the Aug. 25 screenshots:
1. Header / page content / footer using different widths.
2. Old centered/narrow layout rules overriding newer full-width pages.
3. Sticky header not remaining sticky through the page navigation/action row.
4. Visible version reverting after navigation or re-render.
5. Page-specific layout rules being allowed to shrink the global shell.

IMPORTANT
---------
This patch intentionally DOES NOT change:
- Tool data
- Leads Alert logic
- System Status logic
- FI / Lead/Admin / Micro Schedule / Shipping calculations
- Morning Meeting data
- Action Center data
- Reference Center data
- Search data
- Shipping workflow logic
- Operations family flow logic

FILES TO UPLOAD TO THE EXISTING REPOSITORY
-----------------------------------------
index.html
css/v1.0.5-shell-hotfix.css
js/v1.0.5-shell-hotfix.js

The patch uses the existing:
css/app.v1.0.4.css
js/app.v1.0.4.js
assets/...

TEST TOMORROW MORNING
---------------------
After GitHub Pages finishes publishing:
1. Hard refresh with Ctrl+Shift+R.
2. Confirm browser tab says: B7 FI Command Center v1.0.5
3. Confirm footer says: B7 FI COMMAND CENTER V1.0.5 · BUILD 20260825-NIGHT
4. Open every Center.
5. Confirm header, status bars, page action/navigation bar, content, and footer all use the same full page rail.
6. Scroll a long page such as Status Center or Action Center and confirm the entire upper shell remains visible through the page action/navigation bar.
7. Navigate between several Centers without refreshing and confirm V1.0.5 does not revert.

NOTE
----
The tool-family completion/funny-photo feature is intentionally NOT included in this stabilization build.
That feature should be added only after the global shell is confirmed stable.
