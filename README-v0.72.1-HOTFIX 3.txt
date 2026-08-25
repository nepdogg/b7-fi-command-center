B7 FI Command Center v0.72.1 HOTFIX

Fixes a runaway MutationObserver loop introduced in v0.72.0 that could make every page unresponsive.

Changes:
- Status data attributes are only updated when their value actually changes.
- The status observer no longer watches the same attributes that the status painter writes.
- Preserves the v0.72.0 unified Action/Fleet status layout and Page Navigation styling.
- Cache-busts the v0.72 assets so browsers load the repaired script.
