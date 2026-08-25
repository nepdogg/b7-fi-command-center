B7 FI Command Center v0.80.9

Framework consistency update:
- ACTION STATUS is normalized to LEAD ALERTS everywhere.
- SYSTEM STATUS is restored on the standalone view-only Live Status page so both Live Status displays share the same two status bars.
- Tool Center, Shipping Center, Priority Center, and Status Center headers display the active calendar quarter (for example TOOL CENTER — CY26Q3).
- Active quarter defaults automatically from the current calendar date and can later accept an Administration manual override through B7_ACTIVE_QUARTER/state.config.activeQuarterOverride.
- Live Status CY quarter uses the same shared quarter source.
- Version is normalized to v0.80.9 after internal navigation.
- No MutationObserver, setInterval, or recurring polling was added.
