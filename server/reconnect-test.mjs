import assert from 'node:assert/strict';import WebSocket from 'ws';
// Short grace and countdown keep this test fast; set before the engine is imported.
process.env.RECONNECT_GRACE_MS='1500';process.env.COUNTDOWN_SECONDS='1';
const E=await import('./engine.mjs'),{createServer}=await import('./server.mjs');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

// Small lobbies spawn inside the Frontier Sector with a zone sized to the teams.
{const r=E.room('arrange-test','solo');const a=E.join(r,'A'),b=E.join(r,'B');E.command(r,a,{type:'start'});
 assert(r.zoneStart<2600&&r.zoneStart>=240,'small lobby zone '+r.zoneStart);
 for(const p of [a,b])assert(Math.hypot(p.x-r.center.x,p.z-r.center.z)<r.zoneStart,'spawn inside zone');
 assert(Math.hypot(a.x-b.x,a.z-b.z)<2*r.zoneStart);assert(!E.blocked(a.x,a.z)&&!E.blocked(b.x,b.z));}

const app=createServer();await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const url='ws://127.0.0.1:'+app.server.address().port+'/ws';
function client(){const ws=new WebSocket(url,{headers:{origin:'http://127.0.0.1:'+app.server.address().port}});const box={ws,messages:[],state:null,welcome:null};ws.on('message',d=>{const m=JSON.parse(d);box.messages.push(m);if(m.type==='welcome')box.welcome=m;if(m.type==='state')box.state=m;});return new Promise(r=>ws.on('open',()=>r(box)));}
async function until(test,ms=5000){const end=Date.now()+ms;while(Date.now()<end){if(test())return;await sleep(25);}throw Error('timeout');}

const a=await client(),b=await client();a.ws.send(JSON.stringify({type:'join',room:'resume-room',mode:'solo',name:'Alpha'}));await until(()=>a.welcome);b.ws.send(JSON.stringify({type:'join',room:'resume-room',mode:'solo',name:'Bravo'}));await until(()=>b.welcome);
assert(a.welcome.token&&b.welcome.token,'welcome carries a resume token');
a.ws.send(JSON.stringify({type:'start'}));await until(()=>a.state?.phase==='playing');
const room=app.rooms.get('resume-room'),alpha=room.players.get(a.welcome.id);

// Drop Alpha: the slot survives with full health and the match keeps running.
a.ws.terminate();await until(()=>!alpha.connected);await sleep(200);
assert.equal(room.phase,'playing');assert.equal(alpha.hp,100);assert(app.rooms.has('resume-room'));

// A wrong token is refused; the right token resumes the same slot.
const thief=await client();thief.ws.send(JSON.stringify({type:'resume',room:'resume-room',id:a.welcome.id,token:'nope'}));await until(()=>thief.messages.some(m=>m.code==='RESUME_FAILED'));thief.ws.close();
const back=await client();back.ws.send(JSON.stringify({type:'resume',room:'resume-room',id:a.welcome.id,token:a.welcome.token}));await until(()=>back.welcome?.resumed);
assert.equal(back.welcome.id,a.welcome.id);assert(alpha.connected);await until(()=>back.state?.you?.hp===100);

// Drop again and stay away past the grace period: Alpha is eliminated and Bravo wins.
back.ws.terminate();await until(()=>room.phase==='finished',4000);assert.equal(alpha.hp,0);assert.equal(room.winner,b.welcome.team);
b.ws.close();await app.close();console.log('reconnect-test ok');
