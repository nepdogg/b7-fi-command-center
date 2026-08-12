# Building 7 - Final Integration - Operations v0.20.1

## Microsoft Lists Test Build

This build preserves the v0.18 Command Center UI and adds a Shared Data page for the first Microsoft Lists integration tests.

### Ready now
- Import a CSV exported from the B7 FI Command Center Microsoft List.
- Map core List columns into the existing universal tool records.
- Verify imported tools automatically appear on Tool Countdown, Tools, Morning Status, priorities, and other pages according to FI Status.
- Download a column-header template matching the List structure being built.
- Keep local browser data as a fallback while Microsoft 365 authorization is investigated.

### Not yet live
Direct automatic Microsoft Lists synchronization and active-user presence require an authenticated Microsoft Graph connection. A JavaScript web app must be registered/authorized in the organization's Microsoft identity environment before it can securely read/write SharePoint/Microsoft Lists through Graph. v0.20 deliberately does not embed credentials or pretend this authorization exists.

### Tomorrow's test
1. Add a test tool to Microsoft Lists.
2. Export the List to CSV.
3. Open Shared Data in the Command Center.
4. Import the CSV.
5. Verify the tool appears in the correct Command Center pages.


## v0.20 Operations Framework
- Restored persistent sticky title/header and main navigation on all pages.
- Moved contextual page actions from the lower-right floating panel to a toolbar directly below the main navigation.
- Added a persistent bottom Operations Status Bar.
- Added rotating Lead/Admin pending-work ticker generated from Workspace tasks, per-tool Lead/Admin workflow items, blocking NCs, and escalated NCs.
- Added honest shared-data/sync status placeholders for the Microsoft Lists test layer; live user presence remains pending the authenticated live Lists connection.
- Preserved the existing page designs and Microsoft Lists CSV test bridge.


## v0.20.1 Navigation Polish
- Main navigation active state now uses a solid page-accent fill.
- Main navigation has stronger visual priority over Page Actions.
- Page Actions buttons are smaller and the toolbar is slightly more compact.
- Sticky header, Operations Status Bar, ticker, and v0.20 framework are preserved.
