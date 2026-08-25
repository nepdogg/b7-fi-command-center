B7 FI Command Center v0.80.53 — Navigation / Archive Workflow Recovery

Purpose: narrow stabilization build after v0.80.52 page-action regression.

Changes:
- Restores secondary page navigation / page-action bars for Shipping, Priority, Status, Meeting, Action, Reference, and Search Centers.
- Tool Center remains navigation-left / actions-right.
- Tool Archive has ARCHIVE TOOL action and a bulk archive interface with CANCEL / SAVE acknowledgement.
- Tool Edit recovers CANCEL / SAVE TOOL / DELETE TOOL by preserving the canonical editor handlers before legacy toolbar patches can remove them.
- Tool Countdown continues to use the simplified table view.
- Administration/Data & Backup from v0.80.52 is preserved.
- No tool-data schema changes.

Recommended test order:
1. Verify navigation/action bars in every Center.
2. Open one Tool -> Edit -> change a harmless field -> SAVE TOOL.
3. Tool Archive -> ARCHIVE TOOL -> archive one tool -> SAVE.
4. Confirm archived tool disappears from active views and appears in Tool Archive.
5. Restore backup if desired, then proceed with Archive All test.
