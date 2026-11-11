const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path'),ctx={};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'detailed-characters.js'),'utf8')+';this.assets=AKRIVA_DETAILED;',ctx);
for(const [id,a] of Object.entries(ctx.assets)){
 const m=a.meta,b=fs.readFileSync(path.join(__dirname,a.binaryUrl));
 assert(m.vertices>10000&&m.vertices<65536);assert.equal(b.length,m.indexOffset+m.indices*2);assert.equal(m.uvOffset,m.frames*m.frameStride);assert.equal(m.indexOffset,m.uvOffset+m.vertices*8);assert.equal(m.uvOffset%4,0);
 for(let f=0;f<m.frames;f++){assert.equal(f*m.frameStride%4,0);let low=Infinity,high=-Infinity;for(let i=0;i<m.vertices;i++){const y=b.readInt16LE(f*m.frameStride+i*6+2)*.0001;low=Math.min(low,y);high=Math.max(high,y);}assert(low>-.3&&high>1.5&&high<2.4,'Human bounds across every motion frame');}
 for(let p=m.indexOffset;p<b.length;p+=2)assert(b.readUInt16LE(p)<m.vertices);
 for(let p=m.uvOffset;p<m.indexOffset;p+=4){const v=b.readFloatLE(p);assert(Number.isFinite(v)&&v>=0&&v<=1);}
 for(const c of Object.values(m.clips))assert(c.offset+c.count<=m.frames);
 for(const v of m.hands.flat(2))assert(Number.isFinite(v));
 for(const file of[a.texture,a.normal])assert(fs.statSync(path.join(__dirname,file)).size>0);
 console.log('PASS',id,': animation alignment, human bounds, UVs, indices, clips, hands and textures.');
}
