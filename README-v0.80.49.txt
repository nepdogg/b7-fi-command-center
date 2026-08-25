B7 FI Command Center v0.80.49

Tool Center / Live Status presentation update

- Standardizes the quarter KPI/status boxes across Tool Center, Operations Live Status, and standalone Live Status.
- Keeps all eight status boxes on one desktop row where space permits.
- Centers each status-box title and enlarges/centers the count for faster scanning.
- Full Live Status / Operations card identity is now:
    UTID
    Code Name / Tool Type
    Model
  Customer is no longer repeated in the identity header because it remains in the structured fields below.
- Adds CODE NAME as a dedicated boxed field while preserving every existing full-card field:
    UTID, Model, Code Name, Customer, Sales Order, Current Checklist,
    Ship Date, Driver, Cleanroom, Phase.
- Tool Center Mini Cards now use the same UTID -> Code Name -> Model identity language.
- Adds CODE NAME to the Mini Tool Card information grid without removing its existing fields.
- Does not change master tool data, alert routing, plan reversal, archive behavior, or save logic.
