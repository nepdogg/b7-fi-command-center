B7 FI Command Center v0.80.25 — Operations Live Dashboard + Shared Viewer Data

Changes:
- Operations Center is now the live operational dashboard instead of redundant navigation cards.
- Operations keeps the standard Command Center framework: header, Center navigation, Lead Alerts, System Status, Page Actions, content, footer.
- Page Actions includes CURRENT SYSTEM, SCREENSHOT, and REPORT for the carousel tool.
- Existing live tool carousel/progress/special-requirements card is reused in Operations Center.
- Standalone live-status-view.html now synchronizes from the same canonical Command Center state on the same browser origin.
- BroadcastChannel plus storage events refresh viewer tabs when Command Center data is saved.
- Viewer does not create a separate live-data snapshot; if shared data is unavailable it reports that instead of silently creating a different data instance.
- Application/version labels updated to v0.80.25.

Testing:
1. Open index.html and live-status-view.html from the same GitHub Pages origin/profile.
2. Change a tool/action in Command Center and save.
3. Verify standalone Live Status updates to the same tools/Lead Alerts/System Status data.
4. Verify Operations Center shows live metrics + carousel and retains normal navigation/status/page-actions framework.
