B7 FI Command Center v0.80.63 — Operations Center Final Layout

Purpose
- Final visual/layout stabilization pass for Operations / Live Status Center.
- Keeps the v0.80.62 responsiveness hotfix and automatic product-image mapping.
- Does NOT change Lead Alerts/System Status behavior.

Operations changes
- Tool-family status tiles are smaller, vertical, centered, and use larger labels/numbers.
- Tool-family names are larger and centered.
- Quarter metrics, family summaries, progress bar and carousel use the full Operations content width.
- Product photos are enlarged to fill roughly 94% of the photo region while preserving aspect ratio/no crop.
- Artificial viewport stretching below the live carousel is removed so the footer follows content.
- Existing lifecycle color language remains: Waiting FI red/pink, In FI amber, Packing cyan, Shipped green, Total blue.
- Automatic photo mapping remains:
  Zephyr -> tool-zephyr.png
  Regera/Celestiq -> tool-regera-celestiq.png
  Macan/Boxster/Panamera/Vanquish/Targa/Taycan -> tool-29xx-family.png
  Unknown family -> existing placeholder.

Global page navigation stabilization
- Removes the duplicate secondary toolbar left over from the older v0.80.56 navigation layer.
- Keeps #floatingActions / v0.80.60 as the single visible page-navigation/action authority.
- Left = current Center views/subpages.
- Right = contextual actions.
- Update Center label is preserved.

Recommended verification
1. Navigate Operations -> Update -> Shipping -> Priority -> Status -> Meeting -> Action -> Reference -> Search and confirm only one page-navigation/action bar is visible.
2. Return to Operations and confirm family tiles and carousel span the same page rails as the status bars.
3. Cycle the carousel and confirm all 3 product image mappings.
4. Add a new tool; verify the quarter counts, family counts and live carousel update and the correct product image appears automatically.
5. Change the new tool lifecycle state and verify Waiting/In FI/Packing/Shipped totals update automatically.
