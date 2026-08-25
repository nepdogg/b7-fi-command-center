B7 FI Command Center v0.80.1 — Performance + Live Status Hotfix

Changes
- Removed legacy continuous DOM observers/status painters from loaded framework patches that were causing repeated work and sluggish refresh/navigation.
- Keeps bounded one-time normalization passes for compatibility.
- Reduced status tracer paint cost and pauses decorative animation while the tab is hidden.
- Corrected the global/footer version to v0.80.1.
- Added a real dedicated Live Status Center instead of routing to Wallboard Configuration.
- Live Status uses KLA+ as the only top branding and provides a read-only Tools Carousel.
- Carousel rotates active tools every 12 seconds and includes Previous, Pause/Resume, Next, and Command Center exit controls.
- Tool product images can later be supplied through window.B7_PRODUCT_IMAGES; KLA+ is the current fallback.
- No MutationObserver or recurring polling loop was added by v0.80.1.
