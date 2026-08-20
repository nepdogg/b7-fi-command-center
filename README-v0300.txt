B7 FI COMMAND CENTER v0.30.0 — CONSOLIDATION BUILD

Major additions:
- Official B7 FI Command Center header with dynamic page title and page color coding
- Persistent top Action Center bar and expanded Action Center page
- Redesigned Tool Countdown and Tools cards
- Tool identity banner on every Tool editor
- Redesigned Tool Status page with larger Tool Information / FI Status and full-width Shipping Schedule
- Supplemental checklist support (Lamp Swap / Daily Monitor starter configuration)
- Bulk Morning / Shift Quick Update with Notes and Lamp ON/OFF
- Rapid Tool Intake on Countdown Admin
- Unique Weekday / Weekend priority enforcement
- Leads Extra Status display + editor
- Reference Files page for Micro Schedule, Shipping Tracker and B7 FI Status
- Backup format preserved and extended to include new data

Reference file note:
Local file:// pages cannot guarantee an embedded Excel renderer. The Reference Files page lets you select a workbook, attempt an in-page preview, and open the real workbook for worksheet tabs, filters and sorting.


v0.30.1 Reference Files browser preview test:
- Replaces iframe XLSX preview with an in-browser spreadsheet reader.
- Supports .xlsx, .xls, .xlsm through SheetJS loaded from the official SheetJS CDN when Preview is used.
- Supports .csv and .tsv without the external library.
- Adds worksheet tabs and a visible-row text filter.
- Preview is read-only. Open Original remains available for full Excel features.
