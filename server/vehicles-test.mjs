import assert from 'node:assert/strict';import * as E from './engine.mjs';
for(const mode of ['solo','duo','squad']){
 const r=E.room('cars-'+mode,mode),p=E.join(r,'Driver','a'),other=E.join(r,'Observer','b');r.phase='playing';
 assert.equal(r.vehicles.length,36*7);
 for(const type of Object.keys(E.world.vehicleTypes)){
  const v=r.vehicles.find(v=>v.type===type),spec=E.world.vehicleTypes[type];p.x=v.x+spec.w/2+1;p.z=v.z;p.y=0;p.hp=100;
  E.command(r,p,{type:'vehicle'});assert.equal(p.vehicle,v.id,type+' enter');assert.equal(v.driver,p.id);const before={x:v.x,z:v.z},mag=p.inventory[p.weapon].mag;E.shoot(r,p);assert.equal(p.inventory[p.weapon].mag,mag,'No driver shooting');
  other.x=v.x;other.z=v.z;other.y=0;assert.throws(()=>E.command(r,other,{type:'vehicle'}),/NO_VEHICLE/,'No seat stealing');other.x=E.world.cities[1].x;other.z=E.world.cities[1].z;
  for(let n=0;n<15;n++){E.command(r,p,{type:'input',x:0,z:1,yaw:0,fire:false});E.step(r,.05);}assert(v.speed>0,type+' acceleration');assert(Math.hypot(v.x-before.x,v.z-before.z)>1);assert.equal(p.x,v.x);assert.equal(p.z,v.z);
  const h=v.heading;E.command(r,p,{type:'input',x:1,z:1});E.step(r,.1);assert.notEqual(v.heading,h,type+' steering');const speed=v.speed;E.command(r,p,{type:'input',x:0,z:0,brake:true});for(let n=0;n<5;n++)E.step(r,.05);assert(v.speed<speed*.2,type+' brake');
  const state=E.snapshot(r,p);assert.equal(state.you.vehicle,v.id);assert(state.vehicles.some(q=>q.id===v.id&&q.driver===p.id));const observer=E.snapshot(r,other);other.x=v.x+10;other.z=v.z;assert(E.snapshot(r,other).vehicles.some(q=>q.id===v.id&&q.driver===p.id),'Observers receive driving state');
  E.command(r,p,{type:'vehicle'});assert.equal(p.vehicle,null);assert.equal(v.driver,null);assert.equal(v.speed,0);assert(!E.blocked(p.x,p.z));
 }
 const v=r.vehicles[0];Object.assign(p,{x:v.x+2,z:v.z,y:0});E.command(r,p,{type:'vehicle'});E.remove(r,p.id);assert.equal(v.driver,null,'Disconnect releases vehicle');assert.equal(v.speed,0);
}
console.log('PASS: all seven types in Solo/Duo/Squad; server-owned entry, exclusive driver, acceleration, steering, brake, safe exit, observer snapshots, no driver shooting and disconnect release.');
