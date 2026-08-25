B7 FI COMMAND CENTER v0.76.0

STATUS / SHELL / FOOTER STABILITY POLISH
- Restored centered 1600px command-center application shell with consistent browser gutters.
- Action Status and Fleet Status use exact same 68px height and exact same 220 / flexible / 260 column geometry.
- Matched typography, divider thickness, label sizing, message sizing, and right-side count sizing.
- Removed inherited Shipping/Center-theme divider/border artifacts from Fleet Status (including the unwanted green line).
- Added 10px breathing room around and between Action Status, Fleet Status, and Page Navigation.
- Severity status continues to control beacon, dividers, base perimeter border, and glow.
- Replaced single perimeter pulse with TWO pure-CSS perimeter tracers:
  * top tracer travels clockwise
  * bottom tracer travels counter-clockwise
  * Fleet is phase-shifted so the two bars do not animate in lockstep
- No new MutationObserver or recurring timer was introduced.
- Restored the approved global footer as a fixed shell element:
  Administration Center / version / KLA+ / Local Production + SharePoint / Building 7 context.
- Header titles reduced slightly and padding rebalanced.

TEST FIRST
1. Rapidly switch Centers and verify responsiveness remains normal.
2. Confirm both status bars have identical geometry and aligned dividers.
3. Confirm no green divider appears inside Fleet Status unless green is actually the Fleet message severity.
4. Watch both perimeter tracers on each bar and verify opposite directions plus Action/Fleet phase offset.
5. Confirm footer remains visible on every Center.
6. Confirm shell keeps consistent left/right browser margins.
