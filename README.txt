# B7 FI Command Center v0.3

Working visualization prototype for the evolving B7 FI Command Center.

## What changed in v0.3
- Finalized top-level prototype navigation:
  Home / Tool Countdown / Shipping Schedule / Daily Status / Morning Status / Weekend Priorities / Tools / Administration
- Added a dedicated Shipping Schedule status page and Shipping Schedule Admin.
- Kept Official Ship Date separate from the later FI Shipping Schedule.
- FI shipping dates automatically appear on each individual Tool Status page.
- Daily Status is now a generated/read-only report from master Tool data.
- Morning Status is now a generated/read-only manager meeting view.
- Daily and Weekend priority orders remain independent.
- Administration has its own secondary navigation.
- Added page-specific accent color coding while preserving semantic status colors.
- Expanded individual Tool Status into FI progress, critical NCs, shipping schedule, and Lead/Admin readiness.
- Added a Configuration placeholder for the final dropdown lists, custom-entry rules, graphics, and field definitions.
- Browser-local prototype storage remains enabled.

## Important
All included system/customer/NC data is fictional sample data for visualization and testing.
The field list is intentionally not final yet. v0.3 is meant to help define the final fields and dropdown selections before the production-oriented version.

## GitHub Pages
Upload the contents of this folder to the root of the repository and keep GitHub Pages pointed at the main/root branch.

## Local use
Open index.html in a modern browser. Data entered in this prototype is stored in browser localStorage. Use only approved data and approved storage methods in your work environment.
