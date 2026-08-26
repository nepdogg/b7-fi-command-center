B7 FI Command Center v0.80.59 — Morning Operational Truth

- Current FI Checklist is a single authoritative master field.
- Micro Schedule Target is an independent authoritative master field.
- Current Lead/Admin Task is an authoritative master field.
- Morning / Shift Quick Update edits all three fields directly.
- Detailed FI checklist states and Lead/Admin task states remain on the Tool page as supporting lead tracking only; they no longer overwrite the master current positions.
- FI progress is derived from Current Checklist position in the ordered route.
- Lead/Admin progress is derived from Current Lead/Admin Task position.
- Micro Schedule ahead/behind compares Current Checklist to Micro Schedule Target.
- Morning Save provides the existing visible save confirmation and writes the master tool records used across Command Center.
- Built from v0.80.58 known-working recovery baseline to avoid reintroducing the broken v0.80.56 navigation runtime.
