# AKRIVA — India Expedition & vehicle update

## Play

Reload the game and select **India Expedition** in Operations Hub. The region is geographically compressed into a playable world approximately 3.7 × 3.7 km across the bounding square, compared with the earlier 240 × 240 m arena. This is a free-roam mode without a closing zone or AI combat. Battle Royale, Signal Rush, Blackout and existing squad options retain their arena and rules.

The full-country outline contains mainland India plus island outlines, including Lakshadweep and Andaman and Nicobar. There is one approximate hub for each of 28 states and eight union territories. State-border polygons, real street networks and a real-scale recreation of every city are not included. Roads, districts and hub pads are fictional gameplay geometry.

## Vehicles

| Vehicle | Class | Maximum forward speed |
| --- | --- | --- |
| Hatchback | Four wheels | 34 game m/s |
| 4×4 SUV | Four wheels | 39 game m/s |
| Pickup | Four wheels | 33 game m/s |
| Motorbike | Two wheels | 44 game m/s |
| Scooter | Two wheels | 25 game m/s |
| Auto rickshaw | Three wheels | 23 game m/s |

A fleet is parked ahead of each arrival hub. Walk within 4m, then press **V** or **Drive / enter**. Use **W/S** to accelerate/reverse and **A/D** to steer. The mobile left joystick provides both axes. **Space / Jump** becomes **Brake** while driving. **V / Exit** parks and exits when there is a clear place to stand. Mouse/swiping changes the camera without changing vehicle heading. Hold steering input to turn the vehicle. Speed is shown on the HUD.

Buildings, parked vehicles and coastline block driving. Jump/prone and weapon fire stay unavailable while driving. Ambulance support remains available in configured loadouts. Six road vehicles are also parked near the spawn in the classic arena.

## National Atlas

Press **N**, tap the minimap, or choose **Support → India Atlas**. Opening it pauses active gameplay. Select a region and choose **Travel to hub**. Transit handles distant mainland locations and island/ferry connections; vehicles do not drive across the sea. Transit parks your current vehicle, moves your operator and creates a fresh local fleet. Close the Atlas to resume. Discovered-region count is tracked for the current expedition.

## Source and usage

Source: Survey of India, Government of India.

- Outline download: https://surveyofindia.gov.in/pages/outline-maps-of-india
- Vector file: https://surveyofindia.gov.in/documents/Outline_of_India.zip
- Usage notice: https://www.surveyofindia.gov.in/documents/ibd-vectorformat.pdf

The supplied generalized outline is simplified and compressed from its Lambert Conformal Conic coordinates. 1,151 outline rings and 5,577 terrain triangles are embedded in `india-data.js`; no map server/API is needed during play. City coordinates and hub positions are approximate. The Survey of India notice excludes commercial usage of its copyright vector product. This build is a noncommercial prototype and does not grant a blanket open-source license to map data.

## Verification

India integration checks cover all 36 hubs, six vehicle types, acceleration, steering, braking, coast collision, entry/exit, pause/transit, no premature match completion, and preservation of classic arena bounds. A mocked WebGL rendering check reports finite cached land, roads, buildings and vehicle geometry with 62 submissions in the tested spawn scene. Native world shader compilation passed. These are not browser screenshots or phone FPS measurements. The older full regression suite still has previously recorded failures; no all-tests-pass claim is made.
