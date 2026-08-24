B7 FI Command Center v0.40.0 — Unified Master Merge

This build combines the two development branches:

FUNCTIONAL / WORKFLOW BASELINE — v0.21.1 Weekend Operations Test
- Morning Status ordering, meeting notes, action conversion and history
- Latest Status dash-line formatting
- FI Testing completion through the 190 series
- Separate 200 Packing phase and physical Shipping Schedule handoffs
- Customer Source + STR workflows
- Lead Workspace priority / assignee / due date / ticker controls
- Ship-plan pull-in / push-out and change history
- Saturday / Sunday weekend volunteer separation

VISUAL / APPLICATION FRAMEWORK — v0.31.8 Consolidated Test Build
- B7 FI Command Center 50/50 page-colored header
- Page color system and active navigation styling
- Full-width B7 FI Actions top bar
- Action Center page and persistent top action ticker
- Fleet Status bottom bar
- Wallboard mode
- Reference Files browser preview framework
- Leads Extra Status page
- Overall page-actions / navigation framework
- Backup / restore framework

MERGE NOTES
- v0.21.1 workflow logic takes precedence when both branches edit the same operational page.
- v0.31.8 owns the global header, status bars, Action Center, Wallboard, Reference Files and application framework.
- A compatibility layer keeps all navigation routes available and enriches Action Center with v0.21.1 Lead Workspace priority / owner / due-date information plus Source / STR alerts.
- Existing localStorage data remains the data source for this test build.
- Multi-user SharePoint / Microsoft Lists synchronization remains the next major architecture milestone.
