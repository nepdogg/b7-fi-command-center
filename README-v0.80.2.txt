B7 FI Command Center v0.80.2

Live Status refinement
- KLA+ remains the only top branding.
- Removed Live Status title/tagline and Tools Carousel header.
- Lead Alerts and System Status are moved into Live Status below KLA+ using the same live status components as the main Command Center.
- Return button renamed to RETURN TO B7 FI COMMAND CENTER.
- Carousel Previous / Pause-Resume / Next controls moved into the bottom status rail, centered between Live Local Data and the carousel counter.
- Clicking the displayed tool opens a large read-only Tool Detail overlay.
- Tool Detail overlay closes with X, Escape, or click outside the modal.
- Carousel pauses while Tool Detail is open and resumes from the same tool when appropriate.
- Live Status and its Tool Detail overlay remain display-only; no data editing or save controls are exposed.
- Official tool-type image mapping remains supported through window.B7_PRODUCT_IMAGES with KLA+ fallback.
- Footer/version updated to v0.80.2.

Performance
- No MutationObserver added.
- Only one bounded 12-second Live Status rotation timeout is active while Live Status is open.
- Rotation stops while the tab is hidden or Tool Detail is open.
