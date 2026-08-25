B7 FI COMMAND CENTER v0.80.38

MASTER TOOL PAGE ARCHITECTURE
- One canonical purple Tool page is now used throughout the Command Center.
- Operations carousel, Tool Center cards, countdown rows, Shipping links and other tool links should resolve to the same master Tool page.
- Tool Detail and Edit Tool are collapsed into one editable, vertically scrolling page.
- Removed the second Tool sub-navigation/tabs from the canonical workflow.
- One Page Navigation bar only: Back/navigation left; Save/Delete/Screenshot/Report right.

MASTER TOOL PAGE SECTIONS
- Tool Information / Plan
- Quarter / Ship Plan with automatic change-history capture
- FI Testing / Micro Schedule
- Lead / Admin
- Customer Requirements (Customer Source + STR)
- Shipping / Packing
- NCs / Escalations
- Tool Plan Change History
- Custom-field definition/configuration remains an Administration Center responsibility.

DATA FLOW
- Tool record is the source of truth.
- Tool Countdown is a quick read-only quarter list.
- Shipping Center is generated from Tool records and sends edits to the selected Tool page.
- Morning Status remains the intentional quick-edit exception for daily high-frequency fields.
- Operations and Live Status are validation surfaces: saved Tool changes should propagate automatically.
- Standalone Live Status remains read-only.

VERSION
- Browser/footer build version: v0.80.38
