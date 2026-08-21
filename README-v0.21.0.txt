BUILDING 7 - FINAL INTEGRATION - OPERATIONS v0.21.0
WORKFLOW REALITY TEST BUILD

Base: v0.20.1 Navigation Polish

Major additions from real-use testing:

1. MORNING STATUS / MORNING MEETING
- Default order = Code Name / Model / serial number.
- Persistent Up / Down manual meeting-order controls.
- Reset to default order.
- Latest Status now renders as separate dash-prefixed lines.
- Meeting Notes workspace at bottom of Morning Status.
- Add meeting notes directly for a specific Tool.
- Convert meeting actions into central Action Center tasks.
- End / Save Meeting Snapshot and Meeting History.

2. CENTRAL ACTION CENTER / LEAD WORKSPACE
- Priority: Critical / High / Normal / Low / Info.
- Assigned lead.
- Due date.
- Status: Open / In Progress / Waiting / Blocked / Completed.
- Optional display on top Command Center ticker.
- Manual ticker order.
- Per-task display duration: 5 / 8 / 10 / 15 / 30 sec.
- Color-coded urgency.

3. FI TESTING VS 200 PACKING
- FI Testing progress now stops at the end of the 190 route.
- 200 checklists no longer reduce the FI Testing percentage.
- Once testing is complete, Tool enters 200 PACKING.
- Separate Packing / Shipping progress is based on physical handoff milestones.
- Tool cards show FI Testing + Packing + Lead/Admin where applicable.
- Tool Detail shows a 200 PACKING ACTIVE notice and direct Shipping Schedule link.

4. SHIPPING SCHEDULE / PACKING CONTROL
- Packing milestones: Subsystems, Accessories, Cables, MAT, IS.
- Regera / Celestiq use MAT Installed wording.
- Each milestone has scheduled date + delivered checkbox.
- Progress is based on delivered physical handoffs.
- Due Today / Overdue / Upcoming visual states.
- Today's Packing Priorities across all packing Tools.

5. CUSTOMER SOURCE + STR
- New Customer Requirements navigation page.
- Source Required = TBD / Yes / No.
- STR Required = TBD / Yes / No.
- Source status and CA handoff dates.
- STR status, due date and notes.
- Source / STR lead-admin follow-up tasks become N/A when not required.
- Small Source / STR indicators on Tool cards.

6. TOOL PLAN CHANGES / QUARTER COUNTDOWN
- Original Ship Date, Customer and Sales Order are preserved.
- Changes are recorded in per-Tool Change History.
- Automatic Pull-In / Push-Out classification.
- Automatic quarter movement when Ship Date crosses quarter boundaries.
- Current-quarter countdown shows Original Plan, Current Plan, Need to Ship,
  Shipped, Pulled Into Quarter and Pushed Out.
- Tools pushed to another quarter stay active in FI, but are removed from the
  current-quarter shipping commitment.
- Tool cards show Pull-In / Push-Out / Change badges.

IMPORTANT TESTING NOTE
This is still a browser/local-data prototype. Shared multi-user persistence is
not solved by this build; Microsoft Lists / Graph remains the intended shared
data direction. Test the workflow, field behavior and calculations first.
