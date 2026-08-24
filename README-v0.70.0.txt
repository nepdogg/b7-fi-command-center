B7 FI COMMAND CENTER v0.70.0 — FRAMEWORK LOCK TEST BUILD

Primary changes:
- Action Status bar is now rendered atomically by the ticker owner to eliminate DOM observer feedback/shaking.
- Fixed Action Status geometry: beacon | centered message | ← OPEN X OF Y.
- Critical motion is limited to the beacon lamp glow only; no width/transform/padding animation.
- Fleet Status uses the same fixed-label / centered-message / fixed-summary geometry.
- Page toolbar preserves original button nodes/handlers and only classifies/reorders them.
- Page toolbar convention locked: local navigation left, page actions right.
- Operations page toolbar contains only Screenshot and Report.
- Reference Center toolbar restricted to FI Knowledge / Reference Files plus context-appropriate actions.
- Reference Files retains one universal File Access workspace for URL or local file input.
- Basic inline preview included for images, PDF, text/CSV/JSON/XML/Markdown; unsupported office formats fall back to Open/View.
- Main content remains in normal flow below the page toolbar; no toolbar/body overlap.
- Center is encoded in URL query string so browser refresh returns to the active Center.
- Version updated to v0.70.0.
