# AKRIVA Squad 104 dedicated server

104 actual WebSocket player slots per room, 26 squads of four. No AI participants. This is a runnable, in-memory multiplayer prototype, not an already deployed public service.

## Run

Node.js 22 or newer is required (Node 24 is used in the supplied Dockerfile).

```sh
cd server
npm ci
npm start
```

Open `http://localhost:8787` on the same computer. The parent folder must contain the game runtime files supplied in this package. The server serves only allowlisted game files and `/health`; it does not serve arbitrary local files or environment files.

Choose **Squad 104** in Operations Hub. The WebSocket URL is filled automatically when using the server-hosted game. Enter a player name and a shared room code. Optional squad code: give the same code to the four members of your squad. Empty squad code uses automatic four-player allocation. The first connected player is the host. Only the host can start, with at least two different squads connected. Empty slots remain empty; a match is not falsely labelled as full.

The match deploys after a ten-second countdown. No new players can join a started room. Last surviving squad wins. The zone begins closing after two minutes. A twenty-minute timeout ends the match without declaring a winner if more than one squad remains.

## Public deployment

Deploy the repository root Dockerfile to a host with persistent Node processes, WebSocket upgrades and HTTPS/WSS termination. Expose port 8787, or set `PORT` to the platform-provided port. The server listens on `0.0.0.0`. Use `/health` as the health endpoint. A public URL exists only after your host has actually deployed the server.

If the game and server use the same public origin, the game auto-fills the correct `wss://…/ws` URL. If you separately serve the game from Netlify/GitHub Pages, set `ALLOWED_ORIGINS` to the exact frontend origin, for example `https://your-game.example`, and enter your actual server's WSS URL in the lobby. Multiple permitted origins are comma-separated. The server rejects unrelated browser origins by default. Example domains are documentation only, not deployed addresses.

Netlify/GitHub Pages static hosting alone cannot run this persistent multiplayer process. Do not place access tokens or passwords in the client code. No external hosting subscription or billable service has been provisioned by this package.

## Server authority and limits

The server owns player positions, movement speed, collisions, shooting cadence, ammo, reloads, weapon selection, damage, medkits, zone damage and victory. Client-supplied health, position or damage claims are not accepted. Friendly fire is disabled. Match participants are real connected clients, not bots.

Player state is simulated at 20 Hz. Snapshots are sent at 10 Hz, using nearby-player interest filtering and compact actor records. Squad members remain visible in state outside the nearby radius. Combat events are sent once per recipient. Incoming messages are limited to 2 KiB and 60 messages per second per connection; slow consumers are disconnected, and heartbeat failures are cleaned up. Four rooms maximum per server process by default.

This first version uses anonymous player names and room/squad codes. It has no accounts, matchmaking service, voice chat, durable match database, server clustering, revive system or production anti-cheat service. Losing a connection eliminates that slot; reconnect/resume is not implemented. Player names identify sessions, not verified human identities. Menus cannot pause the server match.

Squad 104 is infantry-only. Vehicles and region transit remain available in India Expedition and are not synchronized into this mode. Everyone receives four server-managed guns and two medkits. Reload with R; switch guns with 1–4; use M for medkit; use E within a hub pad to resupply (20-second cooldown).

The country map uses the supplied Survey of India-derived noncommercial prototype data. Retain `ASSET-NOTICES.md` and its usage restrictions.

## Test

```sh
npm test
```

The test opens 104 real local WebSocket connections (synthetic clients, not 104 human players), checks four-person team assignment, rejects slot 105, checks host-only start, tests server damage and tamper rejection, and runs a thirty-second movement/shooting workload. The generated `load-test-result.json` records timings and bandwidth for that one machine/run. It is not a WAN latency, browser GPU or mobile FPS benchmark.

Dependency: `ws`, MIT, https://github.com/websockets/ws . Version and integrity are pinned in `package-lock.json`.

## Solo, Duo and Squad

Online 104 offers Solo (1 player/team, 104 teams), Duo (2/team, 52 teams), and Squad (4/team, 26 teams). Choose before connecting; a room keeps its original mode. A conflicting mode is rejected by the server. Invite links/codes retain the mode; older two-part codes default to Squad. In Solo, invitees join as opponents, never teammates. Match start requires at least two opposing teams.

For one person playing immediately, Play solo vs bots starts the existing offline Battle Royale mode without a multiplayer connection. It uses the classic arena and AI opponents; online modes keep the India map and real connections. The team-size selector is locked while connected. Leave before changing mode.
