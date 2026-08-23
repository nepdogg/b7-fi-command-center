B7 FI COMMAND CENTER v0.77.0

Status / Footer / Page Navigation framework fix

- Action and Fleet Status use identical 68px geometry and divider positions.
- Status classification is the sole source for border, divider, beacon, glow and animation color.
- Replaces older tracer elements with two pure-CSS perimeter pulses moving in opposite directions.
- Action and Fleet animation phases are offset so they do not move in lock-step.
- Fleet center message is vertically and horizontally centered.
- Fleet right context now mirrors Action format: <- OPEN 1 OF N.
- Page Navigation is a full-width rail with edge-reaching top/bottom borders, not a rounded enclosure.
- Footer is restored to normal document flow at the bottom of the application shell; it cannot overlay page cards.
- Preserves the responsive/stability approach: no new MutationObserver and no recurring timer.
