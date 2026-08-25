B7 FI Command Center v0.80.44

Repair + Tool Center status summary update

- Repairs malformed v0.80.43 stylesheet/script references that exposed ?v=0842 text in the page and prevented the latest Mini Tool Card layer from loading correctly.
- Restores v0.80.43 Mini Tool Card density, Model/Customer field-grid placement, and status-color behavior.
- Tool Center quarter summary now permanently reserves cards for:
  * Current-quarter tools
  * Waiting FI
  * In FI
  * Packing
  * Shipped
  * Pulled Into current quarter
  * Pushed Out
- Zero-count conditional cards stay visible but subdued; they automatically activate when a tool enters the state.
- Pulled In / Pushed Out counters derive from the same master tool plan-change/history data used by live card indicators.
- Main application version updated to v0.80.44.
