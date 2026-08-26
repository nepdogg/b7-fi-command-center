B7 FI Command Center v0.80.61 — Operations Center Completion

Changes:
- Added Tool Family Live Status summaries to Operations Center and standalone Live Status.
- Family rows show TOTAL / WAITING FI / IN FI / PACKING / SHIPPED.
- Lifecycle status boxes are color-coded consistently: Waiting red/pink, In FI amber, Packing cyan, Shipped green, Total blue.
- Added automatic product-image mapping for live carousel cards:
  * Zephyr -> assets/tool-zephyr.png
  * Regera / Celestiq -> assets/tool-regera-celestiq.png
  * Macan / Boxster / Panamera / Vanquish / Targa / Taycan -> assets/tool-29xx-family.png
- Product images use contain/no-crop behavior.
- Alias is shown on live card when present; UTID remains primary.
- Lead Alerts and System Status bar logic/markup intentionally not modified.

Testing focus:
1. Operations quarter boxes color coding.
2. Tool-family counts versus active tool records.
3. Carousel image mapping for each of the three product-image groups.
4. Carousel navigation and click-through to Tool Detail.
5. Standalone Live Status still loads and rotates correctly.
