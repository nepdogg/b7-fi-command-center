B7 FI COMMAND CENTER v0.78.0
STATUS / FOOTER CLEANUP PASS

- Fleet Status geometry is the master geometry for both status bars.
- Action/Fleet now share identical label, message, and counter columns.
- Severity color is derived from each bar's own beacon classification using CSS :has().
- Center/theme colors can no longer drive status borders, dividers, glow, or tracers.
- Replaced older status animation layers with two real perimeter tracers:
  clockwise + counter-clockwise, with Fleet phase-shifted from Action.
- Fleet right region mirrors Action: "← OPEN 1 OF N".
- Fleet center message uses the exact same centering/typography as Action.
- Footer is structurally placed immediately after main page content and remains in normal flow.
- Footer restored to five-region design and version source updated to v0.78.0.
- Page Navigation remains a full-width rail without an enclosing rounded container.
- No MutationObserver and no recurring JavaScript interval introduced.
