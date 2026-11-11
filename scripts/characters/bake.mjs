// Bakes Quaternius glTF characters into Akriva's frame format.
// Usage: node bake.mjs <out dir> <gltf files...>
// Output per character: <id>.bin (int16 positions + int8 normals per frame, float32 uvs, uint16 indices)
// and an entry in index.json with meta (clips, hands, head/chest anchors, palette, fit).
import fs from 'node:fs';
import path from 'node:path';
import {readGltf} from './gltf.mjs';

const CLIPS=[['idle','Idle',4],['walk','Walk',8],['run','Run',8]],HEIGHT=1.8;

const m4=()=>{const a=new Float64Array(16);a[0]=a[5]=a[10]=a[15]=1;return a;};
function mul(a,b){const r=new Float64Array(16);for(let c=0;c<4;c++)for(let row=0;row<4;row++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+row]*b[c*4+k];r[c*4+row]=s;}return r;}
function trs(t=[0,0,0],q=[0,0,0,1],s=[1,1,1]){const[x,y,z,w]=q,m=new Float64Array(16);m[0]=(1-2*(y*y+z*z))*s[0];m[1]=2*(x*y+z*w)*s[0];m[2]=2*(x*z-y*w)*s[0];m[4]=2*(x*y-z*w)*s[1];m[5]=(1-2*(x*x+z*z))*s[1];m[6]=2*(y*z+x*w)*s[1];m[8]=2*(x*z+y*w)*s[2];m[9]=2*(y*z-x*w)*s[2];m[10]=(1-2*(x*x+y*y))*s[2];m[12]=t[0];m[13]=t[1];m[14]=t[2];m[15]=1;return m;}
function slerp(a,b,t){let d=a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3];if(d<0){b=b.map(v=>-v);d=-d;}if(d>.9995){const r=a.map((v,i)=>v+(b[i]-v)*t),l=Math.hypot(...r);return r.map(v=>v/l);}const th=Math.acos(d),s=Math.sin(th),wa=Math.sin((1-t)*th)/s,wb=Math.sin(t*th)/s;return a.map((v,i)=>v*wa+b[i]*wb);}
const apply=(m,p)=>[m[0]*p[0]+m[4]*p[1]+m[8]*p[2]+m[12],m[1]*p[0]+m[5]*p[1]+m[9]*p[2]+m[13],m[2]*p[0]+m[6]*p[1]+m[10]*p[2]+m[14]];
const applyDir=(m,p)=>[m[0]*p[0]+m[4]*p[1]+m[8]*p[2],m[1]*p[0]+m[5]*p[1]+m[9]*p[2],m[2]*p[0]+m[6]*p[1]+m[10]*p[2]];
const srgb=c=>Math.round(255*Math.min(1,Math.max(0,c<=.0031308?c*12.92:1.055*Math.pow(c,1/2.4)-.055)));

function bake(file){
 const {g,accessor}=readGltf(file),nodes=g.nodes,skin=g.skins[0],joints=skin.joints,ibm=accessor(skin.inverseBindMatrices),parent=new Array(nodes.length).fill(-1);
 nodes.forEach((n,i)=>(n.children||[]).forEach(c=>parent[c]=i));
 const byName=Object.fromEntries(nodes.map((n,i)=>[n.name,i])),anim=Object.fromEntries(g.animations.map(a=>[a.name,a]));
 // Sample one clip at time t into per-node local TRS.
 function pose(name,t,override){const local=nodes.map(n=>({t:n.translation||[0,0,0],r:n.rotation||[0,0,0,1],s:n.scale||[1,1,1]}));
  for(const c of anim[name].channels){const s=anim[name].samplers[c.sampler],times=accessor(s.input),vals=accessor(s.output),n=c.target.path==='rotation'?4:3;let k=0;while(k<times.length-2&&times[k+1]<t)k++;const f=Math.min(1,Math.max(0,(t-times[k])/((times[k+1]-times[k])||1))),a=Array.from(vals.slice(k*n,k*n+n)),b=Array.from(vals.slice((k+1)*n,(k+1)*n+n));
   local[c.target.node][c.target.path==='translation'?'t':c.target.path==='rotation'?'r':'s']=n===4?slerp(a,b,f):a.map((v,i)=>v+(b[i]-v)*f);}
  if(override)for(const[node,r]of override)local[node].r=r;
  const world=new Array(nodes.length);const solve=i=>world[i]??=(parent[i]<0?trs(local[i].t,local[i].r,local[i].s):mul(solve(parent[i]),trs(local[i].t,local[i].r,local[i].s)));nodes.forEach((_,i)=>solve(i));return world;}
 // Weld vertices by material + bind position so the mesh is smooth-indexed; the shader draws flat faces from derivatives.
 const verts=[],index=[],key=new Map(),materials=g.materials.map(m=>(m.pbrMetallicRoughness?.baseColorFactor||[.8,.8,.8,1]).slice(0,3));
 for(const p of g.meshes[0].primitives){const P=accessor(p.attributes.POSITION),J=accessor(p.attributes.JOINTS_0),W=accessor(p.attributes.WEIGHTS_0),I=p.indices!==undefined?accessor(p.indices):P.map((_,i)=>i).filter(i=>i<P.length/3),local=[];
  for(let i=0;i<P.length/3;i++){const k=p.material+':'+P[i*3].toFixed(4)+','+P[i*3+1].toFixed(4)+','+P[i*3+2].toFixed(4);let v=key.get(k);if(v===undefined){v=verts.length;key.set(k,v);verts.push({p:[P[i*3],P[i*3+1],P[i*3+2]],j:Array.from(J.slice(i*4,i*4+4)),w:Array.from(W.slice(i*4,i*4+4)),m:p.material});}local.push(v);}
  for(let i=0;i<I.length;i+=3){const a=local[I[i]],b=local[I[i+1]],c=local[I[i+2]];if(a!==b&&b!==c&&a!==c)index.push(a,b,c);}}
 // Colours stay exactly as the pack ships them (dark skin, white face plate).
 const V=verts.length;if(V>65535)throw Error('too many vertices');
 const skinFrame=world=>{const jm=joints.map((j,k)=>mul(world[j],ibm.slice(k*16,k*16+16)));return verts.map(v=>{let o=[0,0,0];for(let k=0;k<4;k++){if(!v.w[k])continue;const q=apply(jm[v.j[k]],v.p);o=o.map((x,i)=>x+q[i]*v.w[k]);}return o;});};
 // Normalise: idle frame 0 stands HEIGHT tall with feet at y=0; rotate 180° so the character faces -z like the soldier.
 const idle0=pose('Idle',0),bind=skinFrame(idle0);let minY=1e9,maxY=-1e9;for(const p of bind){minY=Math.min(minY,p[1]);maxY=Math.max(maxY,p[1]);}
 const scale=HEIGHT/(maxY-minY),fix=p=>[-p[0]*scale,(p[1]-minY)*scale,-p[2]*scale];
 const jointPos=(world,name)=>fix(apply(world[byName[name]],[0,0,0]));
 // Gear fit: bounding boxes of the bind-pose vertices owned by the given joints (optionally a height band only).
 const owned=(names,band)=>{const js=names.map(n=>joints.indexOf(byName[n])),pts=bind.map(fix).filter((p,i)=>js.includes(verts[i].j[verts[i].w.indexOf(Math.max(...verts[i].w))])&&(!band||Math.abs(p[1]-band)<.08));const lo=[0,1,2].map(k=>Math.min(...pts.map(p=>p[k]))),hi=[0,1,2].map(k=>Math.max(...pts.map(p=>p[k])));return{lo,hi,c:lo.map((v,k)=>(v+hi[k])/2),h:hi.map((v,k)=>(v-lo[k])/2)};};
 // Head radius (helmets are modelled in head radii) ignores ears and hair tails by taking the narrower side; the vest wraps the trunk (not the arms) at chest height.
 const head=owned(['Head']),torso=owned(['Body','Hips','Abdomen','Torso','Neck','Shoulder.L','Shoulder.R'],jointPos(idle0,'Torso')[1]),headOffset=head.c.map((v,k)=>v-jointPos(idle0,'Head')[k]),chestOffset=torso.c.map((v,k)=>v-jointPos(idle0,'Torso')[k]);
 const frames=[],hands=[],anchors=[],clips={};let offset=0;
 for(const[id,name,count]of CLIPS){const times=accessor(anim[name].samplers[0].input),duration=times[times.length-1];clips[id]={offset,count,duration};offset+=count;
  for(let f=0;f<count;f++){const world=pose(name,duration*f/count),pos=skinFrame(world).map(fix);
   // Normals per vertex from the skinned faces (smooth; flat shading happens in the shader).
   const nrm=pos.map(()=>[0,0,0]);for(let i=0;i<index.length;i+=3){const[a,b,c]=[index[i],index[i+1],index[i+2]],u=pos[b].map((v,k)=>v-pos[a][k]),w=pos[c].map((v,k)=>v-pos[a][k]),n=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]];for(const x of[a,b,c])for(let k=0;k<3;k++)nrm[x][k]+=n[k];}
   frames.push({pos,nrm});hands.push([jointPos(world,'Fist.R'),jointPos(world,'Fist.L')].map(p=>p.map(v=>+v.toFixed(5))));
   anchors.push([...jointPos(world,'Head').map((v,k)=>v+headOffset[k]),...jointPos(world,'Torso').map((v,k)=>v+chestOffset[k])].map(v=>+v.toFixed(4)));}}
 // Binary layout matches soldier-data: per frame int16 xyz*1e4 then int8 normals, padded to even; then float32 uv; then uint16 indices.
 const posBytes=V*6,normalBytes=V*3,frameStride=posBytes+normalBytes+((posBytes+normalBytes)%2),uvOffset=frameStride*frames.length,indexOffset=uvOffset+V*8,buf=Buffer.alloc(indexOffset+index.length*2);
 frames.forEach((fr,f)=>{const base=f*frameStride;fr.pos.forEach((p,i)=>p.forEach((v,k)=>buf.writeInt16LE(Math.max(-32767,Math.min(32767,Math.round(v*1e4))),base+i*6+k*2)));fr.nrm.forEach((n,i)=>{const l=Math.hypot(...n)||1;n.forEach((v,k)=>buf.writeInt8(Math.round(v/l*127),base+posBytes+i*3+k));});});
 // Palette texture: one texel column per material in a 64x1 strip.
 const PAL=64;verts.forEach((v,i)=>{buf.writeFloatLE((v.m+.5)/PAL,uvOffset+i*8);buf.writeFloatLE(.5,uvOffset+i*8+4);});index.forEach((v,i)=>buf.writeUInt16LE(v,indexOffset+i*2));
 const meta={vertices:V,indices:index.length,frames:frames.length,frameStride,normalOffset:posBytes,uvOffset,indexOffset,clips,hands,anchors,height:HEIGHT,flat:true,palette:materials.map(c=>'#'+c.map(srgb).map(x=>x.toString(16).padStart(2,'0')).join('')),paletteWidth:PAL,fit:{head:+Math.min(head.h[0],head.h[2]).toFixed(3),hw:+torso.h[0].toFixed(3),hd:+torso.h[2].toFixed(3)}};
 return{meta,buf};}

const [out,...files]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});const indexFile=path.join(out,'index.json'),all=fs.existsSync(indexFile)?JSON.parse(fs.readFileSync(indexFile,'utf8')):{};
for(const file of files){const id=path.basename(file,'.gltf').toLowerCase().replace(/[^a-z0-9]+/g,'-');try{const{meta,buf}=bake(file);fs.writeFileSync(path.join(out,id+'.bin'),buf);all[id]=meta;console.log(id,meta.vertices,meta.indices/3,buf.length,JSON.stringify(meta.fit));}catch(e){console.log('FAIL',id,e.message);}}
fs.writeFileSync(indexFile,JSON.stringify(all));
