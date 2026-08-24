B7 FI COMMAND CENTER v0.80.41

Tool Center validation update
- Regular Tool Center live cards now display compact conditional badges from the same master Tool record used by Operations/Live Status:
  Pull In, Push Out, Ship Date Change, Customer Source, STR, and Packing.
- The lifecycle badge (Waiting / In FI / Shipped) remains the primary status; exception badges are secondary and can coexist.
- Master Tool editor now shows explicit save feedback: SAVED, UNSAVED CHANGES, SAVING, NO CHANGES TO SAVE, plus a confirmation toast after successful save/navigation.
- Latest saved plan change is displayed read-only in the editor. The Plan Change Type dropdown continues to represent a NEW change, not the historical state.
- Version advanced to v0.80.41.

Recommended test
1. Open a Tool and enable Customer Source and/or STR; Save.
2. Verify the Tool Center live card gains SOURCE/STR badges.
3. Verify Operations and standalone Live Status still show their richer progress indicators.
4. Open a tool with Pull In / Push Out / Ship Date Change history and confirm the small Tool Center badge appears.
5. On Edit Tool, change a field and confirm UNSAVED CHANGES -> SAVING -> Saved Tool #######.
6. Click Save again without editing and confirm NO CHANGES TO SAVE.
