B7 FI Command Center v0.80.37

Tool Center workflow correction:
- Restores Tool Center landing as the current-quarter live-card dashboard grouped by tool type.
- Tool Countdown is a separate quick-list view, not the Tool Center homepage.
- Tool Archive remains a separate Tool Center destination.
- Canonical purple Tool Detail is used from Tool Center, Operations carousel, and other tool links.
- Tool Detail toolbar is rebuilt with Back navigation left and actions right.
- Edit Tool keeps the core Save/Delete handlers and the v0.80.36 Ship Plan controls.
- Add Tool uses the same complete master editor with unknown fields allowed.
- Browser/session route preservation remains enabled.

Test: Tool Center -> live card -> Tool Detail -> Edit This Tool -> change MFG Ship/Plan -> Save -> return and verify Operations/Live Status.
