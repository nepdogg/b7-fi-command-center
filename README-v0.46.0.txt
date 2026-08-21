B7 FI Command Center v0.46.0 — Framework + Weekend Operations Polish

Built directly from v0.45.0.

Framework:
- Restores the B7 FI Actions ticker messages and 7-second rotation.
- Restores matched top/bottom ticker sweeps; bottom sweep sits inside the status bar above its border.
- Keeps an 8px protected spacer before Page Actions.
- Bottom Fleet Status now inherits the active page accent instead of remaining orange.
- Removes stray browser-blue navigation outlines while retaining page-color keyboard focus.
- Keeps page-specific header/navigation/action colors.

Tool Detail:
- Tool Information / FI Status = approximately 31/69.
- Micro Schedule / Customer Requirements = approximately 31/69.
- Latest Status, Notes, and Open/Escalated NC areas each have room for roughly 5–6 lines.
- Top metric cards are shorter/denser and preserve mini progress bars.
- Micro Schedule controls fit the narrower left panel.
- Customer Requirements uses the wider right panel.

Countdown:
- Cleans up legacy border artifacts around the Waiting-for-FI diamond.
- Existing lifecycle card logic and simulation badges remain unchanged.

Weekend Operations:
- Adds one Weekend Date selector that resolves automatically to Saturday/Sunday.
- Automatically generates Weekend Volunteers Needed — <date range> subject text.
- Weekend page now has separate Saturday Volunteers and Sunday Volunteers sections.
- Weekend Administration now has separate Add Saturday Volunteer and Add Sunday Volunteer sections.
- Existing combined volunteer data remains compatible and is merged by name on save.
- B7 Weekend Tool Priorities remain below the volunteer coverage.
