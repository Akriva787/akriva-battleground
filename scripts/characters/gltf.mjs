// Minimal glTF reader: embedded base64 buffers, accessors as typed arrays.
import fs from 'node:fs';
const TYPES={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT4:16},CT={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array};
export function readGltf(file){const g=JSON.parse(fs.readFileSync(file,'utf8'));const buffers=g.buffers.map(b=>Buffer.from(b.uri.split(',')[1],'base64'));
 const accessor=i=>{const a=g.accessors[i],v=g.bufferViews[a.bufferView],n=TYPES[a.type],C=CT[a.componentType],stride=v.byteStride||n*C.BYTES_PER_ELEMENT,buf=buffers[v.buffer],off=(v.byteOffset||0)+(a.byteOffset||0),out=new Float32Array(a.count*n);const dv=new DataView(buf.buffer,buf.byteOffset);
  for(let k=0;k<a.count;k++)for(let c=0;c<n;c++){const p=off+k*stride+c*C.BYTES_PER_ELEMENT;let x;switch(a.componentType){case 5126:x=dv.getFloat32(p,true);break;case 5123:x=dv.getUint16(p,true);break;case 5121:x=dv.getUint8(p);break;case 5125:x=dv.getUint32(p,true);break;case 5122:x=dv.getInt16(p,true);break;default:x=dv.getInt8(p);}if(a.normalized&&a.componentType===5121)x/=255;if(a.normalized&&a.componentType===5123)x/=65535;out[k*n+c]=x;}return out;};
 return{g,accessor};}
