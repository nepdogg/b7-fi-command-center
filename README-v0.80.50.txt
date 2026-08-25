B7 FI COMMAND CENTER v0.80.50 — TOOL CENTER WORKFLOW LOCK

This build finalizes the Tool Center framework while preserving the working v0.80.49 card/status logic.

Tool Center navigation convention
- Left: CY26Q3 TOOLS | TOOL COUNTDOWN | TOOL ARCHIVE
- Right on Tools/Countdown: ADD TOOL | SCREENSHOT | REPORT
- Right on Archive: ARCHIVE TOOLS | SCREENSHOT | REPORT
- Right on Tool Detail: EDIT TOOL | SCREENSHOT | REPORT
- Right on Add/Edit: CANCEL | SAVE TOOL | DELETE TOOL (Delete only when editing)
- Duplicate/centered Tool Center toolbar buttons are removed by rebuilding the toolbar from the canonical state.

Three Tool Center workflows
1. Quarter Setup: Add Tool / rapid intake for the quarter queue.
2. Active FI Operations: Mini Tool Card -> Master Tool Page -> Edit Tool.
3. Quarter Closeout: ARCHIVE TOOLS bulk-archives currently Shipped tools while retaining their Tool records/history.

Universal Tool record
- Existing tools[] Master Tool records remain the single source of truth.
- The central save operation now emits b7fi:tool-records-updated so dependent UI can reconcile from the same Tool records.

Shared Tool Status summary
- Tool Center, Operations/Live Status and standalone Live Status use the same eight KPI boxes.
- Titles/counts are centered with larger values.
- Colored border language: Total blue, Planned purple, Waiting red, In FI gold, Packing cyan, Shipped green, Pulled In teal, Pushed Out red/orange.
- Conditional zero-state boxes remain present but muted.

Navigation stabilization
- Restores OPERATIONS CENTER — active quarter header.
- Meeting Center top navigation is routed explicitly through the mature Meeting Center renderer.
