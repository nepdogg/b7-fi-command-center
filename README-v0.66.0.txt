B7 FI COMMAND CENTER v0.66.0
FINAL SHARED-SHELL FRAMEWORK PASS

This build focuses on the common framework used by every Center:
- Full-height viewport shell: short pages push Fleet Status/footer to browser bottom; long pages scroll naturally.
- Operations Center now keeps the same page-navigation layer as every other Center.
- Operations page bar: OVERVIEW on left; SCREENSHOT and REPORT on right.
- ACTION STATUS label added to the upper operational status bar.
- ACTION STATUS and FLEET STATUS now use matching themed top/bottom borders and animation geometry.
- Internal status-bar separators are short centered divider lines instead of full-height borders.
- No gap between ACTION STATUS and the sticky page-navigation bar.
- Page navigation is raised to the highest interactive shell layer and pointer events are explicitly enabled.
- Footer redesigned to mirror the header: Administration/version on left, KLA+ centered, Command Center/SharePoint/Building information on right.
- Footer and Fleet Status span the full Command Center shell width.
- KLA+ logo and header titles enlarged within the existing header height.
- Nine-center global navigation redistributed so OPERATIONS CENTER is not clipped.
- Search Center remains intentionally simple until category filters are actually implemented.

Administration Center itself is still reserved for the later dedicated redesign.
