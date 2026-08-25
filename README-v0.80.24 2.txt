B7 FI Command Center v0.80.24 — Frame Alignment / Dead-Space Cleanup

Focused changes only:
- Removed the historical reserved status-bar space below the new permanent status stack.
- Command Center order is now Header -> Main Navigation -> Lead Alerts -> System Status -> Page Actions -> Center content.
- Page Actions uses a fixed compact 50px row instead of inheriting historical status-stack heights.
- Center body is pulled directly under Page Actions.
- Header, status framework, page actions, body, and footer share the same 1680px application frame.
- Preserves v0.80.23 status-bar rendering, alert queues, beacon glow, Live Status logic, and Tool Editor behavior.
- Live Status spacing remains balanced around the two status bars.
- Version normalized to v0.80.24.

Primary test:
1. Open Operations Center and verify no dead band between System Status and Page Actions.
2. Verify the Center cards align to the same left/right frame as the header.
3. Navigate between Centers and confirm the alignment remains stable without refresh.
