B7 FI Command Center v0.80.64 — Responsiveness Hotfix

Fixes the v0.80.63 freeze caused by a global MutationObserver repeatedly rewriting the UPDATE CENTER navigation label. The observer has been removed and replaced with event-driven, idempotent navigation settling.

Preserved from v0.80.63:
- Operations Center family live-status layout
- Color-coded lifecycle tiles
- Automatic product-image mapping
- Larger carousel product images
- Edge-to-edge Operations layout refinements
- Duplicate secondary toolbar suppression

Protected / unchanged:
- Lead Alerts behavior
- System Status behavior
