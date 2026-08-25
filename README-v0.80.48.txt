B7 FI COMMAND CENTER v0.80.48

EMERGENCY RESPONSIVENESS HOTFIX
- Fixes the v0.80.47 page freeze/unresponsive condition.
- Root cause: a toolbar MutationObserver repeatedly re-triggered itself while rearranging toolbar nodes, creating a DOM mutation loop.
- Removed the self-triggering observer and retained deterministic toolbar normalization after actual page/view renders.
- Preserves clickable Lead Alerts and System Status messages.
- Preserves Tool Center left-navigation / right-actions convention.
- Preserves compact 8-box quarter summary layout and v0.80.46 archive/lifecycle behavior.
- Standalone Live Status remains read-only.
