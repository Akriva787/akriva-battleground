import assert from 'node:assert/strict';
import {WEAPONS,room,join,command,shoot,step} from './engine.mjs';
assert.equal(Object.keys(WEAPONS).length,56);
for(const [id,w] of Object.entries(WEAPONS)){
 const r=room('weapons-'+id,'solo'),p=join(r,'Tester'),q=join(r,'Opponent');r.phase='playing';r.zone=9999;r.zoneStart=9999;r.zoneFinal=9999;r.center={x:0,z:0};p.x=0;p.z=0;q.x=50;q.z=50;
 command(r,p,{type:'weapon',weapon:id});assert.equal(p.weapon,id);shoot(r,p);assert.equal(p.inventory[id].mag,w.mag-1,id+' server fire');
 p.cooldown=0;p.inventory[id].mag=0;command(r,p,{type:'reload'});for(let t=0;t<w.reload+.1;t+=.05)step(r,.05);assert.equal(p.inventory[id].mag,w.mag,id+' server reload');
 p.reload=0;p.cooldown=0;p.inventory[id].mag=w.mag;p.fireLatch=false;
 for(let i=0;i<40;i++){command(r,p,{type:'input',fire:true});step(r,.05);}
 assert(w.auto?p.inventory[id].mag<w.mag-1:p.inventory[id].mag===w.mag-1,id+' trigger mode');
}
console.log('PASS: all 56 server weapons switch, consume ammo, reload and enforce held-auto versus single-shot triggers.');
