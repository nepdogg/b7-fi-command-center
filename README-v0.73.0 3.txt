B7 FI Command Center v0.73.0

Status Rail + Page Navigation visual-lock update.

Changes:
- Action Status and Fleet Status use identical 72px geometry and equal left/right columns.
- Fleet right section is reduced to a concise fleet-message total.
- Both status classifications drive beacon, thick dividers, top/bottom rails, glow, and moving sweeps.
- Critical = red; Attention = orange; Reminder = yellow; Information = blue; On Track = green.
- Animation now uses explicit sweep elements rather than legacy pseudo-elements.
- Page Navigation is hard-locked to 54px and directly follows Action Status with no spacer.
- New v0730 CSS/JS filenames force browsers to load the update instead of stale cached v072x assets.
