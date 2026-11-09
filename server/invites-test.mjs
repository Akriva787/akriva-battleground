import assert from 'node:assert/strict';
import * as E from './engine.mjs';
const r=E.room('invite-test'),leader=E.join(r,'Leader','friends123');const code=E.snapshot(r,leader).squadCode;assert.equal(code,'friends123');assert.equal(E.snapshot(r,leader).room,'invite-test');
for(let i=0;i<3;i++)assert.equal(E.join(r,'Friend '+i,code).team,leader.team);
assert.throws(()=>E.join(r,'Fifth',code),/SQUAD_FULL/);const rival=E.join(r,'Rival','rival123');assert.notEqual(rival.team,leader.team);assert.throws(()=>E.command(r,rival,{type:'start'}),/HOST_ONLY/);E.command(r,leader,{type:'start'});assert.equal(r.phase,'countdown');assert.throws(()=>E.join(r,'Late',code),/MATCH_RUNNING/);
const auto=E.room('auto-test'),player=E.join(auto,'Auto');const generated=E.snapshot(auto,player).squadCode;assert.match(generated,/^[a-f0-9]{10}$/);assert.equal(E.join(auto,'Invited',generated).team,player.team);for(const id of [...auto.players.keys()])E.remove(auto,id);assert.equal(auto.teamCodes.size,0);
console.log('PASS: stable per-squad invitation codes, same-team joins, four-player cap, host-only start, started-room rejection, auto-assigned squad invitations and code cleanup.');
