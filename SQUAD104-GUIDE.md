# Squad 104 — multiplayer setup

104 real connection slots, arranged as 26 squads of four. Empty slots are not filled with bots. The first connected player is host; at least two different squads must join before the host starts.

## Your Netlify frontend

Frontend supplied: https://akriva-gaming-423fcf.netlify.app
On 9 November 2026 an unauthenticated check returned HTTP 401 (access protection). The live game and any existing backend could not be inspected. Updating these files does not deploy them automatically.

Static Netlify hosting serves the game but does not run the included persistent WebSocket server. Deploy the GitHub package's root Dockerfile on a persistent Node/WebSocket host, with HTTPS/WSS enabled, port 8787 or the host's PORT, and /health as health endpoint. For this separate Netlify frontend, set:

```
ALLOWED_ORIGINS=https://akriva-gaming-423fcf.netlify.app
```

Then open Squad 104 and enter the actual backend's `wss://` endpoint ending in `/ws`. A server URL has not been provisioned. Do not use the Netlify frontend's `/ws` unless a working WebSocket backend/proxy has actually been configured there.

Alternatively, the supplied server also serves the game itself, so a single backend deployment can host both. Its own page automatically selects its WebSocket address.

## Run the full package locally

Install Node.js 22 or newer, then from the repository root:

```sh
cd server
npm ci
npm start
```

Open http://localhost:8787 on the same computer. Localhost is not a public link. Friends use the same room code; four friends use the same optional squad code. Only Connect/Join opens a connection. Deploy starts the host's countdown.

## Scope

This is infantry multiplayer: server-managed movement, combat, four guns, ammo, reloads, two medkits, zone and squad victory. Existing India Expedition vehicles remain a separate mode. No synchronized online vehicles, voice, revival, accounts, reconnect/resume or persistent progression server are included. A disconnect eliminates that slot. Menus cannot pause an online match. The server requires hosting before this mode is publicly playable.

## Verification

A 30.63-second local synthetic workload connected 104 real WebSocket clients, assigned 26 squads of four and rejected slot 105. Authoritative combat and damage-tampering rejection passed. Server tick p95 was 12.41 ms; max 17.5 ms; outbound traffic about 1.432 MB/s on this run. These are synthetic clients on one machine, not 104 human players or a public-network/mobile FPS test.

Client checks passed for lobby, teams, snapshots, movement/fire/reload/weapon/medkit command routing, pause semantics and disconnect cleanup. India world/render and Operations Hub targeted checks also passed. Older regression suites have known failures described in OPERATIONS-VALIDATION.md; a complete regression pass is not claimed.

Retain ASSET-NOTICES.md, including Survey of India noncommercial map restrictions. No blanket license is granted to third-party assets.
