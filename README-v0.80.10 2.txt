B7 FI Command Center v0.80.10

Standalone Live Status viewer hotfix:
- Fixes SYSTEM STATUS appearing briefly and disappearing after refresh.
- Removes the delayed viewer re-render that deleted re-parented status bars.
- Viewer-only Live Status now boots the shared Live Status renderer exactly once.
- LEAD ALERTS and SYSTEM STATUS remain mounted together.
- Viewer-only page still has no Return to B7 FI Command Center control.
- No MutationObserver, setInterval, or recurring polling added.
