# AKRIVA Operations Hub

Open **Operations Hub** above Deploy. Choose a contract, review equipment, then deploy. Existing Squad/Party options remain in the deployment selector.

## Contracts

- **Signal Rush:** synchronize the western relay, disable the guard uplink, transmit at the eastern relay, then extract in the south. You have four minutes of active gameplay. Hold F or INTERACT at each station. Pause stops the clock; the match fails at the deadline. The minimap marks the current objective.
- **Operation Blackout:** classic infiltration, with no deadline.
- **Battle Royale:** solo survival against bots and the closing zone.

## Operator progression

A completed match earns 100 XP after 20 seconds played, 20 per elimination, 80 per mission objective, and 250 for victory. Signal Rush victory adds 150. Instant failed runs earn no XP. Every 500 XP advances one level. Rank titles advance every three levels through Recruit, Pathfinder, Ranger, Vanguard and Sentinel. Rank is local progression, not an online competitive rating.

Earn insignia for your first victory, Blackout victory with peak alert below 25, Signal Rush victory, and three headshots in a single match. The field journal keeps the last eight match results. XP does not spend or replace in-match equipment credits.

Progress is saved in this browser's local storage. It is not synchronized between devices, and clearing browser data removes it. If storage is unavailable, progress stays for the current session.

## Source

`platform.js` owns the local profile and hub. `game.js` owns actual objectives, timing, combat and results. The source ZIP includes both files. Existing party mode requires its host-provided room capability; normal static hosting does not supply multiplayer infrastructure.
