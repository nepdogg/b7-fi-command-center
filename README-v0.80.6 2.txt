B7 FI Command Center v0.80.6

Live Status finalization / shell consistency hotfix:
- Removes the inherited phantom Page Navigation grid row from the Live Status status mount.
- Reduces System Status-to-summary-card spacing to a small intentional gap.
- Keeps Lead Alerts and System Status mounted as two compact read-only bars.
- Adds a bounded footer/version guard so internal Center navigation cannot leave an older footer version visible.
- Restores the final three-zone footer after legacy Center renderers: Administration left, KLA+ center, production/version right.
- No MutationObserver and no recurring performance timer added.
- Live Status remains read-only and independent from Tool Center presentation.
