# B7 FI Command Center v0.2

GitHub-ready interactive prototype based on the revised **Status Pages + Admin Pages** architecture.

## Clean status pages
- Home
- System Shipping Countdown
- Daily Priorities
- Weekend Priorities
- Morning Meeting
- All Systems cards
- Individual System Status

## Administration
- Administration hub
- Universal Tool Admin (Add / Update / Delete)
- Quarter / Countdown Admin
- Daily Priorities Admin
- Weekend Priorities Admin
- Export / Import local backup

## Core behavior implemented
- One master record per system.
- The Universal Tool Admin is the complete editable system record.
- A system can be added with only the information known at the beginning of the quarter and filled in later.
- Shipping Countdown status page is read-only and focused on quarter planning/status.
- Quarter Admin is limited to quarter planning fields and allows adding a tool, changing ship dates/status, or moving a tool out of the quarter.
- Daily and Weekend Priority status pages are clean spreadsheet-style reports intended for screenshots.
- Daily and Weekend Priority Admin pages are minimal quick-update screens.
- Daily Priority and Weekend Priority are separate independent fields.
- Priority values 1-50 can only be used once within each list. Used numbers are disabled for other tools.
- The same system can be Daily Priority 1 and Weekend Priority 1.
- All Systems uses live cards with Tool Progress and Lead Admin Progress.
- Clicking a system card opens a complete read-only System Status page.
- System Status has a direct Edit Tool button.
- Contextual floating action navigation appears on status pages.
- Tool Progress is calculated automatically from the fixed 29XX / Celestiq / Regera checklist routes.
- Lead Admin Progress is calculated separately.
- Critical operational NCs / POAs can be tracked on the master tool record.
- Data is saved in browser `localStorage`.
- Backup export/import is available.

## GitHub Pages update
Upload the CONTENTS of this folder to the root of your existing `b7-fi-command-center` repository, replacing the previous version.

Your existing GitHub Pages configuration can remain the same (`main` branch, `/root`).

## Important
This repository contains fictional sample data only. Do not commit real internal company data, customer names, UTIDs, sales orders, NC details, or shipping information to GitHub. Information entered through the live prototype is stored only in that browser's local storage and is not written back to GitHub.
