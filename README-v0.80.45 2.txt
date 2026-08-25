B7 FI Command Center v0.80.45

PLAN STATE / REVERSAL
- Adds explicit REVERSE LATEST PLAN CHANGE on the Master Tool editor when a current active plan delta exists.
- Reversal restores the immediately previous MFG ship date / quarter.
- Reversal never deletes history. The previous change is marked reversed and a new Reversal audit entry is added.
- Pull In / Push Out / Ship Date Change badges are now derived from current plan delta vs the original plan, so a reversed change no longer remains live.

QUARTER SUMMARY
- Adds PLANNED <CURRENT QUARTER> TOOLS.
- Baseline <CURRENT QUARTER> TOOLS remains the original quarter plan.
- Planned tools = baseline + currently pulled in - currently pushed out.
- Pulled In / Pushed Out counters reflect current active state, not old historical events.
- Conditional metrics remain visible as dim placeholders at zero and activate when non-zero.
- Same expanded metric set is applied to Operations and standalone Live Status summary rows.

TEST SUGGESTION
1. Pull a tool into the active quarter.
2. Verify Pull In badge, Pulled In count and Planned Tools count.
3. Open the tool and click Reverse Latest Plan Change.
4. Verify badge disappears, Pulled In count decrements and Planned Tools returns appropriately.
5. Repeat with Push Out and Ship Date Change.
