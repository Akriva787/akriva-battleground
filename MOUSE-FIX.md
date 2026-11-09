# Mouse stability update — 21 October 2026

- A denied mouse-lock request keeps the current fallback drag active.
- Mouse dragging uses pointer capture so it continues outside the scene.
- Pointer-lock handover does not clear held fire/aim inputs.
- Mouse movement with released buttons recovers a missed release event.
- Releasing the left button does not cancel a still-held right-button aim.
- Invalid or extreme movement deltas are ignored.

All 12 automated suites passed, including the extended mouse regression cases. Physical mouse/browser gameplay testing remains unverified because access to the local file page was blocked.
