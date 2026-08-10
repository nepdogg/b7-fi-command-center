# Building 7 - Final Integration - Operations v0.12

## Morning NC refinement
- Morning visibility and escalation are now separate controls for every NC.
- Existing escalated NCs can be de-escalated directly from Morning Quick Update.
- De-escalating changes the NC back to Open and clears its escalation day count without deleting the NC.
- Show Morning can be independently checked or unchecked.
- Escalated NCs remain manager-visible while escalated.
- Existing escalation day counts can be edited directly.

## Add NC improvements
- Add NC editor now has:
  - NC # field
  - Status field
  - full-width multi-line NC Description
  - Escalation Days field when Status = Escalated
- Creating an Escalated NC now captures the escalation day count during creation, matching the existing escalation workflow.
- Newly created NCs are added to the universal Tool record and selected for Morning Status by default.

## Other behavior
- Morning checklist quick-transition controls remain unchanged for continued simulation testing.
- v0.11 browser-local data migrates forward where possible.
- Browser-local data remains device-specific and does not automatically sync between PC and phone.
