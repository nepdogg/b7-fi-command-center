B7 FI COMMAND CENTER v0.80.52 — TOOL CENTER / ADMINISTRATION STABILIZATION

Changes
- Restored Administration Center landing page with direct access to Data & Backup and Entra / SharePoint settings.
- Preserved the existing full backup export / restore workflow and integration configuration renderer.
- Tool Countdown removes the redundant in-page title/helper copy while keeping the countdown table.
- Tool Archive is a clean archived-tools list with no redundant content header/description.
- Added ARCHIVE TOOL action on Tool Archive.
- ARCHIVE TOOL enters selection mode; page actions become CANCEL / SAVE.
- SAVE changes the master tool lifecycle status to Archive, records archive date, and acknowledges the move.
- Tool Center sub-navigation remains on the left; page actions remain on the right.
- Existing v0.80.51 behavior is preserved underneath this stabilization patch.

Recommended test sequence
1. Open Administration Center and export a Full Backup JSON.
2. Confirm Entra / SharePoint settings are visible under Data & Backup.
3. Open Tool Countdown and verify the redundant heading/helper are gone.
4. Open Tool Archive and verify ARCHIVE TOOL appears on the right.
5. Archive one tool, SAVE, and verify it appears in Tool Archive and disappears from active Tool Center views.
6. Restore the backup before performing Archive All / Delete All destructive tests if desired.
