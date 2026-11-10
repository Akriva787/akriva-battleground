# AKRIVA GAMINING BATTLEGROUND

A mobile-friendly, third-person browser game built with HTML, CSS, JavaScript and WebGL. Solo and AI modes run in a static browser build. Squad 104 requires the included dedicated server; older party modes require a compatible host-provided room service; ordinary static hosting does not provide that multiplayer service. There are no payments or account backend in this package.

## Run locally

No npm installation or build is required. From this folder run:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000 in a WebGL-enabled browser. Keep the terminal running while playing. This localhost address only works on the same computer; deploy to a host for a public link.

## Upload to GitHub

1. Create a new repository, for example `akriva-gamining-battleground`.
2. Extract this ZIP and upload the **contents** of this folder into the repository root. Do not upload just the ZIP. `index.html` must be at the root.
3. Include `soldier-data.js`, `tactical-theme.wav`, `style.css` and `game.js`; the game needs these files.
4. Include the asset notices alongside the game.

## GitHub Pages

In the repository open **Settings → Pages**, choose **Deploy from a branch**, select your branch (usually `main`) and **/(root)**, then save. GitHub will show the published URL once deployment finishes. GitHub Pages availability depends on your account/repository settings. There is no Jekyll build or server-side code required.

## Netlify

Import this GitHub repository into Netlify. Leave the build command empty and set the publish directory to `.`. `netlify.toml` contains the static publish configuration. Once deployed, use Netlify's domain settings to choose your preferred available site name. A name is not reserved by this package.

## Controls

| Action | Desktop | Mobile |
| --- | --- | --- |
| Move | WASD / arrow keys | Left joystick |
| Aim camera | Mouse / drag | Swipe scene |
| Fire | Left click | Hold FIRE |
| Aim/zoom | Right click / Aim | Aim |
| Jump | Space | Jump |
| Crouch | C | Crouch |
| Prone / stand | Z | Prone |
| Reload | R | Reload |
| Objective interaction | Hold F | Hold INTERACT |
| Loot | E | Support → Loot |
| Missile | G | Support → Missile |
| Ambulance | H | Support → Ambulance |
| Enter/exit vehicle | V | Support → Enter/exit |
| Medkit | M | Support → Medkit |
| Switch weapon | 1–4 / Gun selector | Settings → Gun |
| Cycle carried guns | Q | Support → Switch gun |
| Pick up gun / loot | E | Support → Loot |
| Squad scoreboard | Hold Tab | Tap the team score bar |

**Online Co-op (claude.ai link only):** choose *Online Co-op · up to 4 friends*, type the same party code as your friends, then deploy. Friends must be signed in to claude.ai and have access to the shared artifact.
| Pause | P / Esc | Pause / Settings |

Jumping is unavailable while driving. Land before jumping again. Prone mode supports slow movement and firing. All deployments start in TPP.

## Files

- `index.html`: screens, menus and control buttons.
- `style.css`: interface and touch layout.
- `game.js`: WebGL renderer, movement, camera, combat, bots, missions, equipment, audio and input.
- `soldier-data.js`: embedded, transformed soldier animation and texture data, plus the terrain texture.
- `tactical-theme.wav`: original background music loop.
- `ASSET-NOTICES.md`: third-party asset credits and source links.
- `scripts/build-single-file.py`: optional offline single-file HTML exporter.
- `.nojekyll`: GitHub Pages static-file marker.
- `netlify.toml`: Netlify publish configuration.

## Optional single-file export

```sh
python3 scripts/build-single-file.py
```

This writes `dist/index.html` with embedded code, textures and music. The normal source files above already run without this export.

## Validation and limits

Targeted Squad 104 client integration, India world/render and Operations Hub checks passed. The dedicated server passed a 104-connection synthetic local workload. These do not establish real-device FPS or a deployed 104-human match. Known older regression failures remain documented in OPERATIONS-VALIDATION.md.

## Asset rights

Keep `ASSET-NOTICES.md`. Third-party soldier/animation/texture data retains its source terms; no blanket open-source license is applied to those assets by this package. This is a runnable game source export, not a standalone asset library. Review the linked source terms before relicensing or redistributing assets separately. No BGMI assets are included.

## Operations Hub update
The game opens on a contract board with Signal Rush, Operation Blackout and Battle Royale. Signal Rush adds a four-minute relay-and-extraction challenge. XP, rank, insignia and the last eight results persist in local browser storage. `platform.js` is required and must be uploaded along with `game.js`. Squad/Party options remain in the deployment selector. See `OPERATIONS-GUIDE.md` for rewards and rules and `OPERATIONS-VALIDATION.md` for current test limits.

## India Expedition — 7 November 2026
New default exploration option with the full generalized India outline, islands and 36 region hubs. Six road vehicle types have throttle, reverse, steering, brake and entry/exit controls. Include `india-data.js` and `india.js` when deploying. N or Support → India Atlas opens travel/ferry transit. This mode has no shrinking zone or AI combat; classic modes retain their original arena. See `INDIA-GUIDE.md` for controls, validation and noncommercial SoI map usage restrictions.

## Squad 104 dedicated online mode

Includes `online104.js`, `server/`, a root Dockerfile and a pinned dependency lock. See SQUAD104-GUIDE.md and server/README.md. There are 104 actual connection slots, 26 squads of four, server-owned combat and a shared India map. No AI fillers. All seven vehicle types are now synchronized in online matches. Static Netlify/GitHub Pages hosting alone cannot run this server. Deploy the backend separately or serve the entire game from it. No public backend has been deployed by this package.

## Squad invitations
Create my squad connects with a new squad code. Share invite uses the device share sheet when supported; Copy link/Copy code are fallbacks. Friends open the link, enter a callsign and Accept invitation, or paste the invite/code in Join squad. Four live squad slots update as members join or leave. Invitations do not auto-connect, change server URLs or send messages automatically. There are no account friend lists or offline notifications. Rooms are in memory; started/full squads reject joins. Invite links are bearer codes, not identity checks.

## Solo, Duo and Squad

Online 104 offers Solo (1 player/team, 104 teams), Duo (2/team, 52 teams), and Squad (4/team, 26 teams). Choose before connecting; a room keeps its original mode. A conflicting mode is rejected by the server. Invite links/codes retain the mode; older two-part codes default to Squad. In Solo, invitees join as opponents, never teammates. Match start requires at least two opposing teams.

For one person playing immediately, Play solo vs bots starts the existing offline Battle Royale mode without a multiplayer connection. It uses the classic arena and AI opponents; online modes keep the India map and real connections. The team-size selector is locked while connected. Leave before changing mode.

## Vehicle graphics and driving

Seven original procedural designs: hatchback, 4x4 SUV, pickup, motorbike, scooter, auto rickshaw and ambulance. Bevelled body/cabin geometry, reflective-shaded windows, mirrors, grilles, separate tyre and alloy geometry, rotating/steering wheels and a rider pose for two-wheelers replace the simple block/ball models. Geometry is cached and reused. These are custom browser-game models, not licensed manufacturer models or a claim of photorealistic BGMI assets.

Vehicle Garage on the deployment screen offers one-click test drives in India Expedition. Every online city hub also has all seven types. Online Solo/Duo/Squad share server-owned entry, one exclusive driver seat per vehicle, speed/steering/brakes/collisions, movement snapshots, exit and disconnect release. Walk within 4m and press V / Drive. WASD/left joystick drives; Space/Brake stops; V/Exit gets out. Drivers cannot fire. Passenger seats, vehicle damage, fuel and online ambulance healing are not included.

## Frontier Sector update

New: ten connected districts, enterable towns, military airfield, school, hospital, farms, harbor, quarry, walkable hills and two bridge crossings. Choose Frontier Sector in the Operations Hub. See [FRONTIER-GUIDE.md](FRONTIER-GUIDE.md) for controls, online scope and validation limits.
