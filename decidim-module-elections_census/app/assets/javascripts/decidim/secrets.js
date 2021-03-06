/*! secrets.js-grempe 2019-09-07 */

!function(t,e){"use strict";"function"==typeof define&&define.amd?define([],function(){return t.secrets=e()}):"object"==typeof exports?module.exports=e(require("crypto")):t.secrets=e(t.crypto)}(this,function(n){"use strict";var u,b,i,a,s;function h(){u={bits:8,radix:16,minBits:3,maxBits:20,bytesPerChar:2,maxBytesPerChar:6,primitivePolynomials:[null,null,1,3,3,5,3,3,29,17,9,5,83,27,43,3,45,9,39,39,9,5,3,33,27,9,71,39,9,5,83]},b={},i=new Array(1024).join("0"),a=!0,s=["nodeCryptoRandomBytes","browserCryptoGetRandomValues","testRandom"]}function f(){return!(!b||!b.rng||"function"!=typeof b.rng)}function g(t,e){var r;if(0===e||1===e)return t;if(e&&1024<e)throw new Error("Padding must be multiples of no larger than 1024 bits.");return e=e||b.bits,t&&(r=t.length%e),r?(i+t).slice(-(e-r+t.length)):t}function c(t){var e,r,n="";for(r=t.length-1;0<=r;r--){if(e=parseInt(t[r],16),isNaN(e))throw new Error("Invalid hex character.");n=g(e.toString(2),4)+n}return n}function m(t){var e,r,n="";for(r=(t=g(t,4)).length;4<=r;r-=4){if(e=parseInt(t.slice(r-4,r),2),isNaN(e))throw new Error("Invalid binary character.");n=e.toString(16)+n}return n}function o(){return!(!n||"object"!=typeof n||"function"!=typeof n.getRandomValues&&"object"!=typeof n.getRandomValues||"function"!=typeof Uint32Array&&"object"!=typeof Uint32Array)}function l(){return"object"==typeof n&&"function"==typeof n.randomBytes}function p(t){function a(t,e,r,n){var i,a=0,o="";for(e&&(i=e.length-1);a<i||o.length<t;)o+=g(Math.abs(parseInt(e[a],r)).toString(2),n),a++;return((o=o.substr(-t)).match(/0/g)||[]).length===o.length?null:o}function e(t){var e,r=null;for(16,4,e=Math.ceil(t/8);null===r;)r=a(t,n.randomBytes(e).toString("hex"),16,4);return r}function r(t){var e,r=null;for(10,32,e=Math.ceil(t/32);null===r;)r=a(t,n.getRandomValues(new Uint32Array(e)),10,32);return r}return t&&"testRandom"===t?(b.typeCSPRNG=t,function(t){var e,r,n=null;r=Math.ceil(t/32),e=new Uint32Array(r);for(var i=0;i<e.length;i++)e[i]=123456789;for(;null===n;)n=a(t,e,10,32);return n}):t&&"nodeCryptoRandomBytes"===t?(b.typeCSPRNG=t,e):t&&"browserCryptoGetRandomValues"===t?(b.typeCSPRNG=t,r):l()?(b.typeCSPRNG="nodeCryptoRandomBytes",e):o()?(b.typeCSPRNG="browserCryptoGetRandomValues",r):void 0}function d(t,e){var r,n=[];for(e&&(t=g(t,e)),r=t.length;r>b.bits;r-=b.bits)n.push(parseInt(t.slice(r-b.bits,r),2));return n.push(parseInt(t.slice(0,r),2)),n}function w(t,e){var r,n=b.logs[t],i=0;for(r=e.length-1;0<=r;r--)i=0!==i?b.exps[(n+b.logs[i])%b.maxShares]^e[r]:e[r];return i}function y(t,e,r){var n,i,a,o,s=0;for(a=0,n=e.length;a<n;a++)if(r[a]){for(i=b.logs[r[a]],o=0;o<n;o++)if(a!==o){if(t===e[o]){i=-1;break}i=(i+b.logs[t^e[o]]-b.logs[e[a]^e[o]]+b.maxShares)%b.maxShares}s=-1===i?s:s^b.exps[i]}return s}function x(t,e,r){var n,i,a=[],o=[t];for(n=1;n<r;n++)o[n]=parseInt(b.rng(b.bits),2);for(i=e+(n=1);n<i;n++)a[n-1]={x:n,y:w(n,o)};return a}function v(t,e,r){var n,i,a,o;if(e=parseInt(e,b.radix),n=(t=parseInt(t,10)||b.bits).toString(36).toUpperCase(),o=(a=Math.pow(2,t)-1).toString(b.radix).length,i=g(e.toString(b.radix),o),"number"!=typeof e||e%1!=0||e<1||a<e)throw new Error("Share id must be an integer between 1 and "+a+", inclusive.");return n+i+r}var t={init:function(t,e){var r,n,i=[],a=[],o=1;if(h(),t&&("number"!=typeof t||t%1!=0||t<u.minBits||t>u.maxBits))throw new Error("Number of bits must be an integer between "+u.minBits+" and "+u.maxBits+", inclusive.");if(e&&-1===s.indexOf(e))throw new Error("Invalid RNG type argument : '"+e+"'");for(b.radix=u.radix,b.bits=t||u.bits,b.size=Math.pow(2,b.bits),b.maxShares=b.size-1,r=u.primitivePolynomials[b.bits],n=0;n<b.size;n++)i[a[n]=o]=n,(o<<=1)>=b.size&&(o^=r,o&=b.maxShares);if(b.logs=i,b.exps=a,e&&this.setRNG(e),f()||this.setRNG(),!(f()&&b.bits&&b.size&&b.maxShares&&b.logs&&b.exps&&b.logs.length===b.size&&b.exps.length===b.size))throw new Error("Initialization failed.")},combine:function(t,e){var r,n,i,a,o,s,h,u="",f=[],l=[];for(e=e||0,r=0,i=t.length;r<i;r++){if(s=this.extractShareComponents(t[r]),void 0===o)o=s.bits;else if(s.bits!==o)throw new Error("Mismatched shares: Different bit settings.");if(b.bits!==o&&this.init(o),-1===f.indexOf(s.id))for(f.push(s.id),n=0,a=(h=d(c(s.data))).length;n<a;n++)l[n]=l[n]||[],l[n][f.length-1]=h[n]}for(r=0,i=l.length;r<i;r++)u=g(y(e,f,l[r]).toString(2))+u;return m(1<=e?u:u.slice(u.indexOf("1")+1))},getConfig:function(){var t={};return t.radix=b.radix,t.bits=b.bits,t.maxShares=b.maxShares,t.hasCSPRNG=f(),t.typeCSPRNG=b.typeCSPRNG,t},extractShareComponents:function(t){var e,r,n,i,a,o={};if((e=parseInt(t.substr(0,1),36))&&("number"!=typeof e||e%1!=0||e<u.minBits||e>u.maxBits))throw new Error("Invalid share : Number of bits must be an integer between "+u.minBits+" and "+u.maxBits+", inclusive.");if(i=Math.pow(2,e)-1,n=(Math.pow(2,e)-1).toString(b.radix).length,(a=new RegExp("^([a-kA-K3-9]{1})([a-fA-F0-9]{"+n+"})([a-fA-F0-9]+)$").exec(t))&&(r=parseInt(a[2],b.radix)),"number"!=typeof r||r%1!=0||r<1||i<r)throw new Error("Invalid share : Share id must be an integer between 1 and "+b.maxShares+", inclusive.");if(a&&a[3])return o.bits=e,o.id=r,o.data=a[3],o;throw new Error("The share data provided is invalid : "+t)},setRNG:function(t){var e="Random number generator is invalid ",r=" Supply an CSPRNG of the form function(bits){} that returns a string containing 'bits' number of random 1's and 0's.";if(t&&"string"==typeof t&&-1===s.indexOf(t))throw new Error("Invalid RNG type argument : '"+t+"'");if((t=t||p())&&"string"==typeof t&&(t=p(t)),a){if(t&&"function"!=typeof t)throw new Error(e+"(Not a function)."+r);if(t&&"string"!=typeof t(b.bits))throw new Error(e+"(Output is not a string)."+r);if(t&&!parseInt(t(b.bits),2))throw new Error(e+"(Binary string output not parseable to an Integer)."+r);if(t&&t(b.bits).length>b.bits)throw new Error(e+"(Output length is greater than config.bits)."+r);if(t&&t(b.bits).length<b.bits)throw new Error(e+"(Output length is less than config.bits)."+r)}return b.rng=t,!0},str2hex:function(t,e){var r,n,i,a,o,s,h="";if("string"!=typeof t)throw new Error("Input must be a character string.");if("number"!=typeof(e=e||u.bytesPerChar)||e<1||e>u.maxBytesPerChar||e%1!=0)throw new Error("Bytes per character must be an integer between 1 and "+u.maxBytesPerChar+", inclusive.");for(r=2*e,n=Math.pow(16,r)-1,o=0,s=t.length;o<s;o++){if(a=t[o].charCodeAt(),isNaN(a))throw new Error("Invalid character: "+t[o]);if(n<a)throw i=Math.ceil(Math.log(a+1)/Math.log(256)),new Error("Invalid character code ("+a+"). Maximum allowable is 256^bytes-1 ("+n+"). To convert this character, use at least "+i+" bytes.");h=g(a.toString(16),r)+h}return h},hex2str:function(t,e){var r,n,i,a="";if("string"!=typeof t)throw new Error("Input must be a hexadecimal string.");if("number"!=typeof(e=e||u.bytesPerChar)||e%1!=0||e<1||e>u.maxBytesPerChar)throw new Error("Bytes per character must be an integer between 1 and "+u.maxBytesPerChar+", inclusive.");for(n=0,i=(t=g(t,r=2*e)).length;n<i;n+=r)a=String.fromCharCode(parseInt(t.slice(n,n+r),16))+a;return a},random:function(t){if("number"!=typeof t||t%1!=0||t<2||65536<t)throw new Error("Number of bits must be an Integer between 1 and 65536.");return m(b.rng(t))},share:function(t,e,r,n){var i,a,o,s,h,u=new Array(e),f=new Array(e);if(n=n||128,"string"!=typeof t)throw new Error("Secret must be a string.");if("number"!=typeof e||e%1!=0||e<2)throw new Error("Number of shares must be an integer between 2 and 2^bits-1 ("+b.maxShares+"), inclusive.");if(e>b.maxShares)throw i=Math.ceil(Math.log(e+1)/Math.LN2),new Error("Number of shares must be an integer between 2 and 2^bits-1 ("+b.maxShares+"), inclusive. To create "+e+" shares, use at least "+i+" bits.");if("number"!=typeof r||r%1!=0||r<2)throw new Error("Threshold number of shares must be an integer between 2 and 2^bits-1 ("+b.maxShares+"), inclusive.");if(r>b.maxShares)throw i=Math.ceil(Math.log(r+1)/Math.LN2),new Error("Threshold number of shares must be an integer between 2 and 2^bits-1 ("+b.maxShares+"), inclusive.  To use a threshold of "+r+", use at least "+i+" bits.");if(e<r)throw new Error("Threshold number of shares was "+r+" but must be less than or equal to the "+e+" shares specified as the total to generate.");if("number"!=typeof n||n%1!=0||n<0||1024<n)throw new Error("Zero-pad length must be an integer between 0 and 1024 inclusive.");for(o=0,h=(t=d(t="1"+c(t),n)).length;o<h;o++)for(a=x(t[o],e,r),s=0;s<e;s++)u[s]=u[s]||a[s].x.toString(b.radix),f[s]=g(a[s].y.toString(2))+(f[s]||"");for(o=0;o<e;o++)u[o]=v(b.bits,u[o],m(f[o]));return u},newShare:function(t,e){var r;if(t&&"string"==typeof t&&(t=parseInt(t,b.radix)),r=t.toString(b.radix),t&&r&&e&&e[0])return v(this.extractShareComponents(e[0]).bits,r,this.combine(e,t));throw new Error("Invalid 'id' or 'shares' Array argument to newShare().")},_reset:h,_padLeft:g,_hex2bin:c,_bin2hex:m,_hasCryptoGetRandomValues:o,_hasCryptoRandomBytes:l,_getRNG:p,_isSetRNG:f,_splitNumStringToIntArray:d,_horner:w,_lagrange:y,_getShares:x,_constructPublicShareString:v};return t.init(),t});