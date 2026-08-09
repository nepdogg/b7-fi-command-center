# B7 FI Command Center v0.7

This prototype focuses on future-proofing the workflow and displaying progress in the same ordered way the FI checklist route works.

## New in v0.7
- Configurable Lead/Admin workflow builder.
  - Add tasks.
  - Rename existing tasks without losing their stable internal ID.
  - Reorder tasks with Up/Down controls.
  - Edit each task's dropdown choices.
  - Include/exclude a task from Lead/Admin progress.
  - Activate/deactivate or delete tasks.
- Configurable custom Tool fields.
  - Add and rename fields.
  - Choose Text / Number / Date / Dropdown.
  - Define dropdown choices.
  - Allow manual entry for dropdown-style fields.
  - Reorder fields.
  - Show/hide fields on the clean Tool Status report.
- Renameable display labels for protected core Tool fields. The underlying universal data field remains unchanged.
- Individual Tool Status now shows two complete ordered workflow lists:
  - FI Checklist Route with checkmarks for completed checklists, current checklist marker, and upcoming steps.
  - Lead/Admin Workflow with ordered task numbers, status, and checkmarks for completed tasks.
- Tools cards retain the compact two progress bars and now show completed/applicable counts.
- Tool Admin FI tab shows the full ordered FI route while editing.
- Tool Admin Lead/Admin tab follows the configured Lead/Admin order.
- Existing v0.6 browser data is migrated into v0.7 where possible.
- Screenshot Mode remains available on clean operational reports.

## Important design rule
Universal Tool fields are stored once. Updating a shared field from any editor changes the value used everywhere that field is displayed.

## Still intentionally configurable
The current Lead/Admin order is the workbook order supplied so far. It is a starting sequence, not a locked final sequence. Use Configuration to test and refine the real start-to-finish order.

All bundled tool/customer/NC data is fictional sample data for testing.
