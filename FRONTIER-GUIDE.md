# Akriva Frontier Sector

Choose **Frontier Sector** in Deployment Mode, or **Explore Frontier Sector** in the Operations Hub. Deploy in the town plaza. This is offline exploration: no AI opponents, closing zone or time limit. Battle Royale vs bots remains in its original arena.

The fictional sector spans 910 game metres across and sits around the Delhi hub in the compressed India world. Its place names identify original game districts, not real locations or a reproduction of Erangel. The remaining India hubs and island transit are retained.

## Locations

- **Pochinki:** 20 enterable houses on a connected street grid.
- **Gatka:** six rural houses and farm lanes.
- **Military Base:** three open-door hangars, barracks, runway, helipad and lookout structures.
- **School:** three classroom wings around a court.
- **Hospital:** two medical wings, supplies and a driveable ambulance in the local fleet.
- **Farm:** barns and crop rows.
- **Power Station:** industrial hall, tanks and stacks.
- **Harbor:** stacked containers and a loading apron.
- **Quarry:** rock cover and a site building.
- **North Ridge:** walkable 32m summit with radio mast; two more hills stand east and southwest.

In total: 41 enterable buildings, 71 offline supply/weapon pickups, ten discoverable locations, roads, a canal and two driveable bridge crossings. Buildings have doorway and window collision. Upper stories, building destruction and swimming are not implemented. The airfield and helipad are scenery; aircraft are not controllable.

## Controls

- **N / minimap / Field atlas:** see the sector map. Toggle India overview for national transit.
- **Travel to location:** offline transit to any named district; parks seven vehicle types nearby. Transit does not refill collected supplies.
- **Drive / V:** enter or exit a nearby vehicle. Mobile pedals/steering or WASD move it; Brake / Space stops it.
- **Loot / E:** collect nearby weapon, ammunition or medical pickup. Medical crates restore missing health.
- Jump, crouch, prone, touch aim and landscape controls remain available.

## Online scope

Solo, Duo and Squad matches share the new geometry, hills, server collision and terrain-relative vehicle motion. The map is read-only during online play; there is no fast travel. Online team spawns, zone schedule and city supply rules are retained. The 71 offline pickups do not become authoritative online loot.

## Validation

- Client simulation: all ten POIs reachable and transit-safe; door/window/wall and bridge/canal collision; hill jump/landing; vehicle motion and safe exit on hills; hill shot occlusion.
- Server/client: matching collision data and sampled terrain heights; online hill jumping, driving and exit; all Solo/Duo/Squad spawn slots and vehicle types.
- Renderer: finite cached geometry across all ten districts; nearby district culling. Physical mobile performance is not yet measured.
- Local WebSocket simulation: 104 clients, 26 squads, capacity and authority checks. This is not a test with 104 human players or a production capacity guarantee.

Reference examined: [PUBG official Erangel map](https://www.pubg.com/en-asia/game-info/maps/erangel). This update adds original procedural environment geometry; it does not import Erangel map assets. Existing character/material attributions remain in ASSET-NOTICES.md.
