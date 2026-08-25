B7 FI COMMAND CENTER v0.80.34

LIVE STATUS CONDITIONAL REQUIREMENTS UPDATE

- Applies to BOTH the regular Operations Center live tool carousel and the standalone Live Status page.
- Leaves the four primary progress bars unchanged in the upper-right:
  FI Testing / Lead-Admin / Micro Schedule / Packing-Shipping.
- Moves Customer Source and STR into the open area directly under the UTID/model identity.
- Customer Source and STR are read-only summaries driven automatically from Tool Center fields:
  sourceRequired, sourceStatus, strRequired, strStatus.
- Required = No -> NOT REQUIRED, no progress bar.
- Required = TBD -> TBD, no progress bar.
- Required = Yes -> compact status/progress bar appears and uses the current Tool Center dropdown status.
- Customer Source stages map from Not Started through Returned to FI (100%).
- STR stages map from Not Started through Complete (100%).
- Removes the older full-width Special Requirements panel from live tool cards.
- Keeps the current shared photo bay, primary progress stack, card detail grid and one-screen viewer layout.
- Sets both Command Center and standalone viewer to authoritative version 0.80.34.
