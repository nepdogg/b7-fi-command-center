# B7 FI Command Center v0.5

Visualization prototype with the Quarter Tool Shipping Countdown now substantially defined.

## Quarter Tool Shipping Countdown — v0.5
The clean status page is structured like the physical wall countdown:

### Overall quarter level
- Quarter label (example: CY26Q3)
- Total Tools
- Need to Ship
- Shipped
- Overall % Shipped progress bar

### Automatic Tool Type breakdown
For each Tool Type (examples: 29XX, Regera, Celestiq):
- Total
- Need to Ship
- Waiting to be Handed to FI
- In FI
- Shipped
- Tool Type % Shipped progress bar
- Individual system status cards below the totals

### Tool Countdown Admin fields
Only these eight fields are exposed:
1. Quarter — manual text entry
2. Tool Type — dropdown
3. Tool Model — dependent dropdown based on Tool Type
4. Sales Order — manual entry
5. Customer — manual entry
6. UTID — manual entry
7. MFG Ship Date — date picker
8. Tool Status — Waiting to be Handed to FI / In FI / Shipped

All totals and progress percentages are calculated automatically.

## Prototype dropdowns
The Tool Type and Tool Model lists are still provisional. Replace them with the complete work list once supplied.

## Other Command Center pages
Shipping Schedule, Weekday Priorities, Morning Status, Weekend Priorities, Tools, and Administration remain in place for continued page-by-page field definition.

## Data and deployment
- Fictional sample data only.
- Browser-local storage for prototype testing.
- New v0.5 asset filenames are used to avoid stale GitHub Pages caching.
