# Building 7 - Final Integration - Operations v0.21.0

## Local Production + SharePoint / Entra Migration Test Build

This build is based directly on the user's working v0.20.1 repository. It preserves all existing pages and local workflows, while adding a safer migration/testing layer for the approved KLA Entra / SharePoint integration work.

### New in v0.21.0
- Full Command Center JSON backup export.
- Full backup restore with an automatic safety export before replacement.
- Microsoft Lists migration CSV export from current local tools.
- Existing Microsoft Lists CSV import remains available.
- SharePoint/Entra integration configuration fields for Site URL, List Name, Tenant ID and Client/Application ID.
- No client secret is stored or requested by the browser app.
- Direct SharePoint REST diagnostic test using the current browser session.
- Open Microsoft List shortcut.
- Copy/downloadable diagnostic report with browser protocol, counts, site/list configuration and connection-test result.
- Operations status bar now clearly identifies Local Production Mode versus a successful SharePoint REST diagnostic.
- Local storage key upgraded to b7fi-v0210-state and automatically migrates v0.20.1 / v0.19 data.

### Tomorrow's one-shot test order
1. Copy the entire extracted v0.21.0 folder into the dedicated OneDrive - KLA Corporation / B7 FI Command Center folder.
2. Open index.html.
3. Verify Tool Countdown and Administration still show the expected local data.
4. Open Shared Data and immediately Export Full Backup JSON.
5. Confirm the prefilled SharePoint Site URL and Microsoft List name.
6. If IT has supplied Tenant ID / Client ID, enter them and Save Integration Configuration. Do NOT enter a secret.
7. Click Test Direct SharePoint REST.
8. Copy Diagnostic Report and save/screenshot the exact result.
9. If the direct test fails, use Open Microsoft List to confirm the list itself opens in the same browser session.
10. Optional fallback: Export the List to CSV and Import Microsoft List CSV to confirm mapping.

### Important
A successful direct REST diagnostic does not yet enable full live write synchronization. Authenticated production synchronization will be implemented only after the exact IT-provided Entra configuration is known. A failed direct REST test is also useful because it identifies browser/authentication/CORS limitations without risking production local data.

## v0.80.14 — Status System Stabilization
- Permanent Lead Alerts/System Status shells across rotating messages.
- Severity now owns border, divider, beacon, category text, and glow colors.
- Larger centered System Status and Lead Alerts message typography.
- Viewer-only Live Status retains both status bars.
- Moving pulse tracers remain removed; calm glow retained.
