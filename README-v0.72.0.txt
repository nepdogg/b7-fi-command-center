B7 FI COMMAND CENTER v0.72.0
STATUS BEACON + PAGE NAVIGATION LOCK

- Action Status now mirrors Fleet Status: left beacon shows ACTION STATUS + current classification, center is the message, right is context/navigation.
- Removed CRITICAL/ATTENTION/etc. from the Action Status message region.
- Action Status and Fleet Status are locked to the exact same 62 px height and three-zone geometry.
- Both bars derive beacon, dividers, top/bottom borders, glow and moving edge sweeps from the current message status.
- Critical and Attention beacon lamps pulse using their own status color.
- Fleet Status classification remains visible directly under FLEET STATUS.
- Page Navigation is locked to a compact 42 px row immediately beneath Action Status with zero spacer/gap.
- Local page navigation remains on the left; Screenshot/Report and other page actions remain on the right.
- Existing Command Center data/workflows are preserved.
