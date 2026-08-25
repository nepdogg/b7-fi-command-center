B7 FI Command Center v0.80.11 — Standalone Live Status Viewer Route Lock

- Fixes SYSTEM STATUS appearing briefly and then disappearing on live-status-view.html.
- Viewer-only page now has one legal route: Live Status.
- Delayed legacy Command Center startup code can no longer route the viewer back to Operations/Home and move System Status out of the Live Status mount.
- LEAD ALERTS and SYSTEM STATUS are re-parented into the same shared Live Status status mount.
- No MutationObserver, setInterval, or recurring polling added.
