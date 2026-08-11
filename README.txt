# Building 7 - Final Integration - Operations v0.15

Focused stability update for home/work simulation testing.

## Fixed
- Read Only/Edit Mode controls moved into the sticky header.
- Enable Editing is visible at normal 100% browser zoom.
- Removed the bottom-right Read Only overlay that covered page controls.
- Removed the extra simulation-warning strip from page content.
- Centralized lifecycle page visibility with one pageTools() function.

## Lifecycle rules
- Waiting for FI: Tool Countdown only.
- In FI: Tool Countdown + Tools + Morning Status; eligible for selected priority/shipping views.
- Shipped: Tool Countdown + Tools, not Morning/Priority views.
- Archive: Archive only.

The same master Tool records now drive every page filter.

Important: Edit locking is still browser-local until a shared Microsoft 365 backend is implemented.
