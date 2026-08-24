B7 FI Command Center v0.51.0 — Friday Field-Test Consolidated

BASE
- Built directly from the user's latest GitHub repository uploaded Aug 21, 2026.
- Preserves the existing v0.50.0 and earlier workflow patches.

VISUAL / FRAMEWORK
- Adds the user's official KLA+ logo asset to the header on every page.
- Professional dark KLA+ / Command Center header treatment with page-colored title panel.
- Responsive navigation:
  large monitor = one row,
  laptop = clean wrapped/two-row navigation,
  small screen = horizontal scroll.
- Reinforces independent B7 FI Actions and Page Actions rows so controls do not overlap.
- Bottom Fleet Status explicitly follows active page accent.
- Final inactive Shared Data focus-outline cleanup.
- Screenshot Mode preserves a report-like max width instead of stretching extremely wide.
- Removes redundant B7 Weekend Tool Priorities heading.
- Slightly enlarges Tool Countdown report heading.
- Standardizes Tools-page card height.

MORNING STATUS / DAILY UPDATE
- Morning Quick Update follows saved Morning Status tool order.
- UTID and Model are locked; operational fields are editable:
  Customer, Sales Order, Ship Date, Location/Bay, SW, Assigned Lead/Driver,
  Actual Checklist, Micro Schedule Target, Lamp Hours/State, Latest Status and Notes.
- Morning updates write directly to the master Tool record used everywhere.
- Records change history for important changed fields.
- Per-tool Last Updated timestamp + overall Last Saved timestamp.
- Morning Status shows Micro Schedule Target / ahead-behind state inline.
- Save confirmation reports count and timestamp.

ACTION CENTER / STATUS BAR MEMORY
- Automatic Action Center items remain automatic; text/condition is not manually edited.
- Every automatic item can be assigned to a lead and given:
  Status Bar ON/OFF, individual display seconds, rotation order,
  display-until rule, Pin, Acknowledge/Working.
- Category-specific ticker styling:
  Critical red, Attention orange, Reminder gold, Information blue.
- Automatic aging engine for generated items:
  Reminder -> Attention Day 1 -> Critical Day 2;
  Attention -> Critical Day 1;
  Critical keeps aging.
- Day-2+ unresolved Critical items briefly pulse when they first appear on the ticker
  unless Acknowledge/Working is checked.
- Manual reminder creator can still choose category, including Information.

FI KNOWLEDGE BASE
- Reorganizes Knowledge Base into category sections.
- Notes are collapsed by default and expand like Meeting History.
- Favorites section and Recently Used section.
- Search expands matching notes.
- Keeps existing permanent Knowledge Base data.

REFERENCE CENTER
- Reference Files becomes an FI Reference Center.
- Adds editable permanent shortcut cards for:
  Wafer Log,
  Legacy B7 FI Status spreadsheet,
  Legacy FI Notes Word document.
- Keeps manager-supplied Shipping Tracker and Micro Schedule load/preview workflow.
- Adds prominent FI Knowledge Base entry point.
- Adds offline/local basic DOCX text/table preview + Search Legacy Notes using the loaded Word file.
  Open Original remains available for exact Word formatting.

LEAD WORKSPACE
- Removes the obsolete embedded Reference tab concept; FI Knowledge Base remains its dedicated page.

MEETING CENTER
- Adds a generic Meeting Center navigation page.
- Built-in recurring templates:
  Leads Meeting, ORB Meeting, FE Options Meeting, Cell Meeting.
- + Start Meeting Now supports any ad-hoc meeting.
- General meeting notes, tool-linked action creation, assigned lead,
  Lead Workspace integration, saved meeting history and reopen/edit.

TOOL ESCALATIONS
- Tool Detail adds Escalation Meetings / POA when an NC is escalated.
- Escalation meetings and POA revisions remain tied to Tool + NC history.

REPORT / HOME
- Home receives Meeting Center live-card access.
- Existing Full Report / PDF workflow remains intact.

MULTIUSER
- True simultaneous multiplayer is intentionally NOT claimed in this static build.
  The Shared Data / backend phase remains required for reliable multi-PC live editing and wallboard sync.

IMPORTANT TESTING
- Test Morning Status order -> Morning Quick Update -> Save -> verify values elsewhere.
- Test Action Center ON/OFF, 5/10/20 sec, assignment, order, Pin, Acknowledge.
- For aging tests, leave generated alerts unresolved across dates or alter firstSeen data in a disposable test backup.
- Test KLA+ header and navigation on both large monitor and laptop.
- Test Knowledge Base categories, expand/collapse, favorites and search.
- Test Reference Center SharePoint shortcuts and DOCX preview.
- Test Meeting Center Start Meeting Now and action creation.
- Test an escalated NC Tool Detail for meeting/POA history.
