B7 FI COMMAND CENTER v0.80.20
Alert System Stabilization — Independent Status Shell

This build intentionally separates the visible status-bar shell from all legacy status-bar DOM.

Key changes:
- New permanent Lead Alerts + System Status shell with independent IDs.
- Legacy #topActionBar / #operationsBar remain hidden for backward compatibility and cannot alter the visible bars.
- Same visible shell is mounted on the Command Center, regular Live Status, and standalone live-status-view.html.
- Empty Lead Alerts state: NORMAL / NO ACTIVE LEAD ALERTS / 0 OPEN.
- Empty System Status state: NORMAL / ALL ACTIVE SYSTEMS NORMAL / 0 OPEN.
- Severity controls the complete visible bar: border, dividers, beacon, severity word, and glow.
- Exactly one divider on each side of the center message.
- Lead Alert ON/OFF is read from the same saved state used by the Action Center.
- Save All saves only cards with unsaved changes.
- Manual actions show SAVE CHANGES / RESOLVE / DELETE.
- Automatic actions cannot be manually resolved/deleted and still clear only from their underlying workflow.
- Action Center checkbox/control alignment cleaned up.
- App/browser/footer version normalized to v0.80.20.

Recommended acceptance test:
1) Turn every Lead Alert OFF and save: Lead Alerts should show green NORMAL / NO ACTIVE LEAD ALERTS / 0 OPEN on all three displays.
2) Turn one Attention ON at 5 sec and save: only that alert should display orange.
3) Turn one Critical ON and save: Critical should display red and remain popup eligible in the editable Command Center only.
4) Turn both OFF: immediately return to the green Normal state.
