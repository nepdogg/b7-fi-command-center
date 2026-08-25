B7 FI Command Center v0.80.35

Live Status card plan-change + Operations editing update.

- Adds automatic PLAN CHANGE indicator beside UTID/model on Operations Center and standalone Live Status cards.
- Nothing is displayed when no ship-plan change exists.
- Ship-date-only change: SHIP DATE CHANGED with old -> new date.
- Pull In: PULLED INTO <quarter> with old -> new quarter.
- Push Out: PUSHED OUT TO <quarter> with old -> new quarter.
- Uses Tool Countdown Plan Change changeHistory/original/current values; no separate live-card entry required.
- Operations Center carousel is interactive: click current tool card to open that tool's normal Tool Detail page, where EDIT THIS TOOL is available.
- Standalone Live Status remains read-only and keeps its read-only detail behavior.
- Customer Source / STR automatic mini-progress indicators from v0.80.34 remain unchanged.
