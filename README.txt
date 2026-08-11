# Building 7 - Final Integration - Operations v0.18

## Countdown lifecycle editing
Tool Status can now be changed directly from Administration > Countdown.

Lifecycle selections:
- Waiting for FI
- In FI
- Shipped
- Archive

Changing the lifecycle from Countdown Admin uses the same universal Tool record,
so page visibility updates everywhere immediately after Save Countdown Changes.

Tool Status intentionally remains a controlled list because these lifecycle values
drive Command Center behavior.

## Calendar date pickers
Date-oriented fields are rendered as browser calendar pickers wherever practical,
including:
- MFG Ship Date
- Pull-In Date
- Push-Out Date
- shipping handoff dates
- MST date
- IS handoff date
- other date-like fields detected by the UI

## Dropdown suggestions + manual entry
Reusable text fields continue to support both:
- suggested values through datalist pull-downs
- manually typed custom values

Examples:
- Code Name
- Model
- Customer
- Sales Order
- Tool Assignment / Driver
- Cleanroom Bay

This preserves speed without preventing one-off values.

All v0.16 automatic In-FI propagation remains unchanged.
