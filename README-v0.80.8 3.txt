B7 FI Command Center v0.80.8
Dedicated View-Only Live Status

NEW ENTRY PAGE
- index.html: normal B7 FI Command Center. Operations Center > Live Status Center continues to open the read-only Live Status view in the same browser page and retains RETURN TO B7 FI COMMAND CENTER.
- live-status-view.html: direct view-only Live Status page intended for a shareable/bookmarkable status-display link. It opens directly into Live Status after refresh and does NOT show a Return to Command Center control.

BOTH LIVE STATUS MODES
- Use the same Live Status renderer, styling, tool carousel, progress calculations, special requirements, status bars, read-only tool detail, and data source.
- Remain read-only.
- Visual updates to the shared Live Status renderer apply to both entry modes.

SHAREPOINT TESTING
Place live-status-view.html in the same B7 FI Command Center directory as index.html, css/, js/, assets/, and the rest of the repository. The viewer URL can then be bookmarked separately from the Command Center URL.

IMPORTANT
Removing the return button is a UI separation, not an access-control boundary. If access to the editable Command Center needs to be restricted, enforce that with SharePoint permissions as well.
