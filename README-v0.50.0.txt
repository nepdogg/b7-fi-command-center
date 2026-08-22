B7 FI Command Center v0.50.0 — Home + Report Center + Meeting Actions + Exceptions QA

Built directly from v0.49.2.

NEW / TESTABLE
- New Home / Operations Overview page with live cards for Tool Countdown, Morning Meeting,
  Action Center, Weekday Priorities, Weekend Priorities, Shipping Schedule, Tools, Add Tool,
  FI Knowledge Base and Report Center.
- Tool Countdown gets Generate Full Report.
- Full report opens a visual dark-theme report with fleet summary, Action Center, fleet table,
  and an individual detail section for every current tool.
- Use PRINT / SAVE AS PDF in the generated report window to create a PDF with the browser.
- Morning Meeting tool note boxes now get + Action Item buttons.
- General Notes gets + General Action.
- Meeting actions are linked to the meeting source and also created in Lead Workspace so the
  existing Action Center pipeline can pick them up.
- Meeting History gets Edit Meeting and + Action controls for workflow testing.
- Initial Tool Exceptions / Special Conditions model included for no cables, no chiller,
  special packing, special wafers and customer-specific requirements.

PRESERVED
- v0.49.2 Action Center manual reminder assignment, ticker duration and Information category.
- v0.49.1 header/Page Actions correction.
- v0.49.0 FI Knowledge Base.
- Existing Tool Countdown, Customer Requirements, Shipping, Weekend, Shared Data and admin flows.

IMPORTANT QA / NEXT PHASE
- The full report is a first working browser-report generator. It intentionally uses browser
  Print / Save as PDF so it remains static-site friendly.
- DOCX inline preview is NOT falsely claimed fixed in this build; Open Original remains the
  reliable Word path until an offline-safe DOCX renderer is bundled.
- True simultaneous multiplayer remains a backend/shared-data project. This build does not
  pretend local static storage is real-time multi-user storage.
- Tool exception UI is an initial configurable model for continued simulation/testing.
