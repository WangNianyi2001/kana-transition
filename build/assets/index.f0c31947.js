var N=Object.defineProperty;var I=(t,e,n)=>e in t?N(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var a=(t,e,n)=>(I(t,typeof e!="symbol"?e+"":e,n),n),v=(t,e,n)=>{if(!e.has(t))throw TypeError("Cannot "+n)};var o=(t,e,n)=>(v(t,e,"read from private field"),n?n.call(t):e.get(t)),l=(t,e,n)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,n)},c=(t,e,n,i)=>(v(t,e,"write to private field"),i?i.call(t,n):e.set(t,n),n);var w=(t,e,n)=>(v(t,e,"access private method"),n);const T=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const x of r.addedNodes)x.tagName==="LINK"&&x.rel==="modulepreload"&&i(x)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}};T();const u={puct:/、。？！「」『』（）・…/,hiragana:/ぁ-ん/,katakana:/ァ-ンｧ-ﾝﾞﾟ/,kana:/ぁ-んァ-ンｧ-ﾝﾞﾟ/,kanji:/一-龯/,Any:t=>new RegExp(`[${t.source}]`)};class L{constructor(e){a(this,"src","");a(this,"type","literal");a(this,"isKana",!1);a(this,"stiffness",0);a(this,"usual","");a(this,"unusual","");switch(this.src=e,this.stiffness=/^\**/.exec(e)[0].length,e=e.slice(this.stiffness),u.Any(u.kana).test(e)&&(this.type=e.includes("(")?"core":"particle",this.isKana=!0),this.type){default:this.usual=this.unusual=e;break;case"core":const n=/^([^\(]+)\((.*)\)$/.exec(e);[,this.usual,this.unusual]=n,this.isKana=u.Any(u.kana).test(this.usual)}}Normal(){return this.usual}Kana(e=!1){const n=e||this.stiffness==0;let i=this.usual;return n&&!this.isKana&&(i=this.unusual),i}NonKana(e=0,n=0){switch(this.type){case"literal":return this.usual;case"particle":return n<=1-this.stiffness?this.usual:"";case"core":if(!this.isKana)return this.usual;let i=this.usual;return e>=this.stiffness&&(i=this.isKana?this.unusual:this.usual),i}}}class S{constructor(){a(this,"tokenRegex",new RegExp(["(",[/\s+/,u.Any(u.puct),new RegExp(`\\**[^\\(\\)\\s\\*${u.puct.source}]+(?:\\([^)]*\\))?`)].map(e=>e.source).join("|"),")"].join("")))}Parse(e){const n=[];for(;e.length;){const i=this.tokenRegex.exec(e);if(i==null)throw new SyntaxError(e);if(i.index!==0)throw new SyntaxError("Index is "+i.index);let s=i==null?void 0:i[0];if(s.length===0)throw new SyntaxError("Token length is zero");e=e.slice(s.length),s[0]===" "&&(s=s.slice(1)),s.length&&n.push(s)}return n.map(i=>new L(i))}}var b=new S,E=[{description:"\u53EA\u7528\u5047\u540D",stringify(t){return t.map(e=>e.Kana(!0)).join("")}},{description:"\u591A\u7528\u5047\u540D",stringify(t){return t.map(e=>e.Kana()).join("")}},{description:"\u6B63\u5E38",stringify(t){return t.map(e=>e.usual).join("")}},{description:"\u591A\u7528\u5E38\u89C1\u6C49\u5B57",stringify(t){return t.map(e=>e.NonKana()).join("")}},{description:"\u6C49\u5B57-1",stringify(t){return t.map(e=>e.NonKana(1)).join("")}},{description:"\u6C49\u5B57-2",stringify(t){return t.map(e=>e.NonKana(2)).join("")}},{description:"\u7701\u7565\u4E0D\u5FC5\u8981\u7684\u6D3B\u7528",stringify(t){return t.map(e=>e.NonKana(2,1)).join("")}},{description:"\u53EA\u7528\u6C49\u5B57",stringify(t){return t.map(e=>e.NonKana(1/0,2)).join("")}}],h,d,p,g,f,m,k;class A extends HTMLElement{constructor(){super();l(this,m);l(this,h,"");l(this,d,void 0);l(this,p,0);l(this,g,void 0);l(this,f,void 0);c(this,g,this.attachShadow({mode:"open"})),c(this,f,document.createElement("span")),o(this,g).appendChild(o(this,f)),this.innerText=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML").get.call(this)}get levelIndex(){return o(this,p)}set levelIndex(n){n in E&&(c(this,p,n),w(this,m,k).call(this))}get level(){return E[this.levelIndex]}get innerText(){return o(this,h)}set innerText(n){try{w(this,m,k).call(this),c(this,h,n)}catch(i){console.error(i)}}}h=new WeakMap,d=new WeakMap,p=new WeakMap,g=new WeakMap,f=new WeakMap,m=new WeakSet,k=function(){c(this,d,b.Parse(o(this,h))),o(this,f).innerText=this.level.stringify(o(this,d))};customElements.define("na-tr",A);const y=document.getElementById("level-slider"),O=document.getElementById("level-description"),K=document.getElementsByTagName("na-tr")[0];y.setAttribute("max",E.length-1);function j(){K.levelIndex=+y.value,y.value=K.levelIndex,O.innerText=K.level.description}y.addEventListener("input",j);j();
