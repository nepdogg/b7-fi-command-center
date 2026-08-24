B7 FI Command Center v0.80.23 — Status Bar Finalization Pass

Focused changes:
- Status bars mounted directly under main Center navigation (outside legacy header-status-stack spacer/grid).
- Page Actions remains directly below the two status bars.
- Regular Live Status and standalone Live Status use identical status-bar geometry.
- Balanced 14px spacing above and below the Live Status status stack.
- Legacy/duplicate status nodes hidden from Live Status layout.
- Severity-driven beacon dots now visibly glow; Reminder/Attention/Critical pulse progressively stronger/faster while Normal/Information remain calmer.
- Existing Lead Alerts/System Status queues and alert logic are intentionally unchanged.
- Tool Editor recovery from v0.80.22 is preserved.

Testing note:
For the standalone live-status-view.html to display the same saved browser data as the hosted Command Center, test both pages from the same web origin (for example both on GitHub Pages/SharePoint or both from the same local web server). Opening live-status-view.html via file:// uses a different browser storage origin and will not share localStorage with an https:// Command Center tab.
