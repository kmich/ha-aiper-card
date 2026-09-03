function t(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}var e,i;"function"==typeof SuppressedError&&SuppressedError,function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(e||(e={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(i||(i={}));var s=function(t,e,i,s){s=s||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return r.detail=i,t.dispatchEvent(r),r};const r=globalThis,n=r.ShadowRoot&&(void 0===r.ShadyCSS||r.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),a=new WeakMap;let c=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(n&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const l=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new c("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:h,defineProperty:d,getOwnPropertyDescriptor:p,getOwnPropertyNames:u,getOwnPropertySymbols:m,getPrototypeOf:_}=Object,f=globalThis,g=f.trustedTypes,v=g?g.emptyScript:"",$=f.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!h(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...m(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(n)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),s=r.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??w)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[y("elementProperties")]=new Map,A[y("finalized")]=new Map,$?.({ReactiveElement:A}),(f.reactiveElementVersions??=[]).push("2.1.2");const S=globalThis,E=t=>t,C=S.trustedTypes,k=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,M="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+P,O=`<${N}>`,R=document,U=()=>R.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,z="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,j=/>/g,D=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,q=/"/g,B=/^(?:script|style|textarea|title)$/i,V=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),K=V(1),F=V(2),J=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),Q=new WeakMap,G=R.createTreeWalker(R,129);function Y(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=I;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(o.lastIndex=h,c=o.exec(i),null!==c);)h=o.lastIndex,o===I?"!--"===c[1]?o=L:void 0!==c[1]?o=j:void 0!==c[2]?(B.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=D):void 0!==c[3]&&(o=D):o===D?">"===c[0]?(o=r??I,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?D:'"'===c[3]?q:W):o===q||o===W?o=D:o===L||o===j?o=I:(o=D,r=void 0);const d=o===D&&t[e+1].startsWith("/>")?" ":"";n+=o===I?i+O:l>=0?(s.push(a),i.slice(0,l)+M+i.slice(l)+P+d):i+P+(-2===l?e:d)}return[Y(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class tt{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[c,l]=X(t,e);if(this.el=tt.createElement(c,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(M)){const e=l[n++],i=s.getAttribute(t).split(P),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?nt:"?"===o[1]?ot:"@"===o[1]?at:rt}),s.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(P),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),G.nextNode(),a.push({type:2,index:++r});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===N)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)a.push({type:7,index:r}),t+=P.length-1}r++}}static createElement(t,e){const i=R.createElement("template");return i.innerHTML=t,i}}function et(t,e,i=t,s){if(e===J)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=H(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=et(t,r._$AS(t,e.values),r,s)),e}class it{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);G.currentNode=s;let r=G.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new st(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ct(r,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(r=G.nextNode(),n++)}return G.currentNode=R,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class st{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=et(this,t,e),H(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==J&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=tt.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new it(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new tt(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new st(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class rt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=et(this,t,e,0),n=!H(t)||t!==this._$AH&&t!==J,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=et(this,s[i+o],e,o),a===J&&(a=this._$AH[o]),n||=!H(a)||a!==this._$AH[o],a===Z?t=Z:t!==Z&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class nt extends rt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class ot extends rt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class at extends rt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=et(this,t,e,0)??Z)===J)return;const i=this._$AH,s=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==Z&&(i===Z||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ct{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){et(this,t)}}const lt=S.litHtmlPolyfillSupport;lt?.(tt,st),(S.litHtmlVersions??=[]).push("3.3.3");const ht=globalThis;let dt=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new st(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}};dt._$litElement$=!0,dt.finalized=!0,ht.litElementHydrateSupport?.({LitElement:dt});const pt=ht.litElementPolyfillSupport;pt?.({LitElement:dt}),(ht.litElementVersions??=[]).push("4.2.2");const ut=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},mt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},_t=(t=mt,e,i)=>{const{kind:s,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ft(t){return(e,i)=>"object"==typeof i?_t(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return ft({...t,state:!0,attribute:!1})}const vt=1;class $t{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const yt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends $t{constructor(t){if(super(t),t.type!==vt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return J}}),bt="aiper-cleaner-card",wt="aiper-monitor-card",xt="aiper-card-editor",At="aiper",St={idle:{icon:"mdi:robot-vacuum",color:"var(--disabled-text-color)"},cleaning:{icon:"mdi:robot-vacuum",color:"var(--info-color, #039be5)",active:!0},returning:{icon:"mdi:home-import-outline",color:"var(--info-color, #039be5)",active:!0},charging:{icon:"mdi:battery-charging",color:"var(--success-color, #43a047)"},charged:{icon:"mdi:battery",color:"var(--success-color, #43a047)"},error:{icon:"mdi:robot-vacuum-alert",color:"var(--error-color, #db4437)"},sleeping:{icon:"mdi:sleep",color:"var(--disabled-text-color)"}},Et={icon:"mdi:robot-vacuum",color:"var(--primary-text-color)"},Ct={smart:"mdi:auto-fix",auto:"mdi:auto-fix",floor:"mdi:screen-rotation",wall:"mdi:wall",waterline:"mdi:waves",scheduled:"mdi:calendar-clock"},kt={"s-shaped":"mdi:sine-wave",adaptive:"mdi:map-marker-path"},Mt={status:"status",battery:"battery",mode:"mode",warning:"warning",online:"online",charging:"charging",solar_charging:"solar_charging",in_water:"in_water",running_switch:"running",wifi:"wifi",runtime:"runtime",mode_select:"mode_selection",clean_path_select:"clean_path",refresh_shadow:"refresh_shadow",refresh_metadata:"refresh_metadata",roller_brush:"roller_brush",micromesh_filter:"micromesh_filter",caterpillar_tread:"caterpillar_tread",propeller:"propeller"},Pt={mode_select:["cleaning_mode"],wifi:["wifi_connected"]},Nt={chlorine:["free_chlorine"],score:["water_quality_score"],result:["water_quality_result"],temperature:["water_temperature"],sample_time:["water_sample_time"]},Ot={running_switch:"switch",mode_select:"select",clean_path_select:"select",refresh_shadow:"button",refresh_metadata:"button",status:"sensor",battery:"sensor",mode:"sensor",warning:"sensor",online:"binary_sensor",charging:"binary_sensor",solar_charging:"binary_sensor",in_water:"binary_sensor",wifi:"binary_sensor"},Rt={ph:"ph",orp:"orp",ec:"ec",tds:"tds",chlorine:"rcl",score:"water_quality_score",result:"water_quality_result",temperature:"temperature",warning:"warning",online:"online",sample_time:"wqs_sample_time"},Ut={ph:{min:6.2,max:8.4,unit:"",good:[7.2,7.6],warn:[7,7.8]},orp:{min:400,max:900,unit:"mV",good:[650,750],warn:[600,800]},chlorine:{min:0,max:5,unit:"mg/L",good:[1,3],warn:[.5,4]},tds:{min:0,max:2e3,unit:"ppm",good:[0,1e3],warn:[0,1500]},ec:{min:0,max:3e3,unit:"µS/cm",good:[0,1500],warn:[0,2200]}};let Ht;async function Tt(t,e){const i=e.device??function(t,e){if(e)return t.entities?.[e]?.device_id??void 0}(t,e.anchorEntity),s=function(t,e){if(!e)return;const i=t.devices?.[e];if(i)for(const t of i.identifiers??[])if(Array.isArray(t)&&t[0]===At&&t[1])return String(t[1])}(t,i),r=i?t.devices?.[i]:void 0,n=r?.name_by_user||r?.name||void 0,o={};for(const[i,s]of Object.entries(e.overrides??{}))s&&t.states[s]&&(o[i]=s);const a=Object.keys(e.keys).filter(t=>!o[t]);if(0===a.length||!i&&!e.anchorEntity)return{map:o,serial:s,deviceName:n};let c=[];try{c=await async function(t){const e=Date.now();if(Ht&&e-Ht.ts<6e4)return Ht.entries;const i=await t.callWS({type:"config/entity_registry/list"});return Ht={ts:e,entries:i},i}(t)}catch{}const l=c.filter(t=>i&&t.device_id===i);for(const i of a){const r=e.keys[i],n=e.domains?.[i],a=t=>!n||t.startsWith(`${n}.`);if(s){const e=`${s}_${r}`,n=l.find(t=>(t.unique_id===e||t.unique_id?.endsWith(`_${e}`))&&a(t.entity_id));if(n&&t.states[n.entity_id]){o[i]=n.entity_id;continue}}const c=l.length>0?l.map(t=>t.entity_id):Object.keys(t.states),h=[`_${r}`,...e.idHints?.[i]?.map(t=>`_${t}`)??[]],d=c.find(e=>h.some(t=>e.endsWith(t))&&a(e)&&t.states[e]);d&&(o[i]=d)}return{map:o,serial:s,deviceName:n}}const zt=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new c(i,t,o)})`
  :host {
    --aiper-gap: 12px;
    --aiper-radius: var(--ha-card-border-radius, 12px);
  }
  ha-card {
    overflow: hidden;
    padding: 0;
  }
  .header {
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: 16px;
    gap: 12px;
    background: var(--aiper-header-bg, var(--card-background-color));
  }
  .header.has-image {
    min-height: 96px;
  }
  .header img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.28;
    pointer-events: none;
  }
  .title {
    position: relative;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.2;
  }
  .subtitle {
    position: relative;
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }
  .body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: var(--aiper-gap);
  }
  .row {
    display: flex;
    align-items: center;
    gap: var(--aiper-gap);
  }
  .row.wrap {
    flex-wrap: wrap;
  }
  .spacer {
    flex: 1;
  }
  .statusline {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .status-icon {
    --mdc-icon-size: 34px;
    flex: 0 0 auto;
  }
  .status-icon.active {
    animation: aiper-pulse 1.8s ease-in-out infinite;
  }
  @keyframes aiper-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.45;
    }
  }
  .status-text {
    font-size: 1.05rem;
    font-weight: 500;
  }
  .battery {
    display: flex;
    align-items: center;
    gap: 6px;
    font-variant-numeric: tabular-nums;
    color: var(--secondary-text-color);
  }
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 0.78rem;
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
  }
  .pill.on {
    background: color-mix(in srgb, var(--info-color, #039be5) 22%, transparent);
    color: var(--primary-text-color);
  }
  .pill.warn {
    background: color-mix(in srgb, var(--error-color, #db4437) 22%, transparent);
    color: var(--primary-text-color);
  }
  .pill ha-icon {
    --mdc-icon-size: 15px;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-size: 0.85rem;
    cursor: pointer;
    user-select: none;
  }
  .chip[disabled] {
    opacity: 0.5;
    cursor: default;
  }
  .chip.selected {
    border-color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 16%, transparent);
  }
  .chip ha-icon {
    --mdc-icon-size: 17px;
  }
  .label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--secondary-text-color);
  }
  .wear {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1 1 140px;
  }
  .wear .bar {
    height: 6px;
    border-radius: 3px;
    background: var(--divider-color);
    overflow: hidden;
  }
  .wear .bar > span {
    display: block;
    height: 100%;
    background: var(--primary-color);
  }
  .wear .bar.low > span {
    background: var(--error-color, #db4437);
  }
  .footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-top: 1px solid var(--divider-color);
    color: var(--secondary-text-color);
    font-size: 0.78rem;
  }
  .footer ha-icon-button {
    --mdc-icon-button-size: 36px;
    --mdc-icon-size: 20px;
  }
  .alert {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--error-color, #db4437) 16%, transparent);
    color: var(--primary-text-color);
    font-size: 0.85rem;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
    gap: var(--aiper-gap);
  }
  .gauge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
  }
  .gauge .val {
    font-size: 1.1rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .gauge .unit {
    font-size: 0.7rem;
    color: var(--secondary-text-color);
  }
  .gauge svg {
    width: 76px;
    height: 46px;
  }
  .warning-banner {
    margin: 0 16px 12px;
  }
  .meta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }
  .meta ha-icon {
    --mdc-icon-size: 16px;
  }
  .unavailable {
    padding: 24px 16px;
    text-align: center;
    color: var(--secondary-text-color);
  }
`,It=["roller_brush","micromesh_filter","caterpillar_tread","propeller"];let Lt=class extends dt{constructor(){super(...arguments),this._resolveKey=""}static async getConfigElement(){return await Promise.resolve().then(function(){return Bt}),document.createElement(xt)}static getStubConfig(){return{type:`custom:${bt}`}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.device&&!t.entity&&!t.entities)throw new Error("Set a `device:` (or an `entity:` / `entities:` override)");this._config={show_footer:!0,...t},this._resolveKey=""}getCardSize(){return 4}updated(){if(!this.hass||!this._config)return;const t=`${this._config.device??""}|${this._config.entity??""}|${JSON.stringify(this._config.entities??{})}`;t!==this._resolveKey&&(this._resolveKey=t,this._resolve())}async _resolve(){this.hass&&this._config&&(this._resolved=await Tt(this.hass,{device:this._config.device,anchorEntity:this._config.entity,keys:Mt,domains:Ot,idHints:Pt,overrides:this._config.entities}))}_state(t){const e=this._resolved?.map[t];return e?this.hass?.states[e]:void 0}_moreInfo(t){const e=this._resolved?.map[t];e&&s(this,"hass-more-info",{entityId:e})}_select(t,e){const i=this._resolved?.map[t];i&&this.hass&&this.hass.callService("select","select_option",{entity_id:i,option:e})}_toggleRunning(t){const e=this._resolved?.map.running_switch;e&&this.hass&&this.hass.callService("switch",t?"turn_on":"turn_off",{entity_id:e})}_press(t){const e=this._resolved?.map[t];e&&this.hass&&this.hass.callService("button","press",{entity_id:e})}render(){if(!this.hass||!this._config)return Z;const t=this._state("status");if(!this._resolved)return K`<ha-card><div class="unavailable">Loading…</div></ha-card>`;if(!t)return K`<ha-card
        ><div class="unavailable">
          No Aiper cleaner entities found. Check the <code>device</code> in the card config.
        </div></ha-card
      >`;const e=this._config.name||this._resolved.deviceName||t.attributes.friendly_name||"Aiper",i=String(t.state??"").toLowerCase(),s=St[i]??Et,r=this._config.image??t.attributes.entity_picture;return K`
      <ha-card>
        ${this._config.compact?Z:K`<div class=${yt({header:!0,"has-image":!!r})}>
              ${r?K`<img src=${r} alt="" />`:Z}
              <div>
                <div class="title">${e}</div>
                <div class="subtitle">${t.state}</div>
              </div>
            </div>`}
        <div class="body">
          ${this._renderStatusLine(t,s)} ${this._renderPills()} ${this._renderWarning()}
          ${this._renderModes()} ${this._renderCleanPath()} ${this._renderRunning()}
          ${this._renderConsumables()}
        </div>
        ${this._config.show_footer?this._renderFooter():Z}
      </ha-card>
    `}_renderStatusLine(t,e){const i=this._state("battery"),s=this._state("charging"),r="on"===s?.state?"mdi:battery-charging":i?this._batteryIcon(Number(i.state)):"mdi:battery-unknown";return K`
      <div class="statusline">
        <ha-icon
          class=${yt({"status-icon":!0,active:!!e.active})}
          style=${`color:${e.color}`}
          .icon=${e.icon}
          @click=${()=>this._moreInfo("status")}
        ></ha-icon>
        <div class="status-text" @click=${()=>this._moreInfo("status")}>${t.state}</div>
        <div class="spacer"></div>
        ${i?K`<div class="battery" @click=${()=>this._moreInfo("battery")}>
              <ha-icon .icon=${r}></ha-icon>${Math.round(Number(i.state))}%
            </div>`:Z}
      </div>
    `}_batteryIcon(t){if(isNaN(t))return"mdi:battery-unknown";const e=10*Math.round(t/10);return e<=5?"mdi:battery-alert-variant-outline":e>=100?"mdi:battery":`mdi:battery-${e}`}_renderPills(){const t=[["online","mdi:cloud-check","Online"],["in_water","mdi:water","In water"],["solar_charging","mdi:solar-power","Solar"],["wifi","mdi:wifi","WiFi"]].map(([t,e,i])=>{const s=this._state(t);if(!s||"unavailable"===s.state||"unknown"===s.state)return null;const r="on"===s.state;return K`<span
          class=${yt({pill:!0,on:r})}
          @click=${()=>this._moreInfo(t)}
        >
          <ha-icon .icon=${e}></ha-icon>${i}
        </span>`}).filter(Boolean);return t.length?K`<div class="pills">${t}</div>`:Z}_renderWarning(){const t=this._state("warning");if(!t)return Z;const e=String(t.state);return["no warning","none","ok","unknown","unavailable",""].includes(e.toLowerCase())?Z:K`<div class="alert" @click=${()=>this._moreInfo("warning")}>
      <ha-icon icon="mdi:alert"></ha-icon>${e}
    </div>`}_renderModes(){if(!1===this._config?.show_mode)return Z;const t=this._state("mode_select");if(!t)return Z;const e=t.attributes.options??[],i=t.state,s="unavailable"===t.state;return K`
      <div>
        <div class="label">Cleaning mode</div>
        <div class="chips">
          ${e.map(t=>K`<button
              class=${yt({chip:!0,selected:t===i})}
              ?disabled=${s}
              @click=${()=>this._select("mode_select",t)}
            >
              <ha-icon .icon=${Ct[t.toLowerCase()]??"mdi:tune-variant"}></ha-icon>${t}
            </button>`)}
        </div>
      </div>
    `}_renderCleanPath(){if(!1===this._config?.show_clean_path)return Z;const t=this._state("clean_path_select");if(!t)return Z;const e=t.attributes.options??[],i=t.state,s="unavailable"===t.state;return K`
      <div>
        <div class="label">Clean path</div>
        <div class="chips">
          ${e.map(t=>K`<button
              class=${yt({chip:!0,selected:t===i})}
              ?disabled=${s}
              @click=${()=>this._select("clean_path_select",t)}
            >
              <ha-icon .icon=${kt[t.toLowerCase()]??"mdi:map-marker-path"}></ha-icon
              >${t}
            </button>`)}
        </div>
      </div>
    `}_renderRunning(){const t=this._state("running_switch");if(!t)return Z;const e="on"===t.state,i="unavailable"===t.state;return K`
      <div class="row">
        <ha-icon icon="mdi:pool"></ha-icon>
        <span>Cleaning</span>
        <div class="spacer"></div>
        <ha-switch
          .checked=${e}
          .disabled=${i}
          @change=${t=>this._toggleRunning(t.target.checked)}
        ></ha-switch>
      </div>
    `}_renderConsumables(){if(!1===this._config?.show_consumables)return Z;const t=this._resolved?.deviceName,e=It.map(e=>{const i=this._state(e);if(!i||isNaN(Number(i.state)))return null;const s=Math.max(0,Math.min(100,Number(i.state)));let r=i.attributes.friendly_name??e.replace(/_/g," ");return t&&r.startsWith(`${t} `)&&(r=r.slice(t.length+1)),K`<div class="wear" @click=${()=>this._moreInfo(e)}>
        <div class="row" style="justify-content:space-between">
          <span>${r}</span><span>${Math.round(s)}%</span>
        </div>
        <div class=${yt({bar:!0,low:s<10})}>
          <span style=${`width:${s}%`}></span>
        </div>
      </div>`}).filter(Boolean);return e.length?K`<div class="row wrap">${e}</div>`:Z}_renderFooter(){const t=this._resolved?.map.refresh_shadow,e=this._resolved?.map.refresh_metadata;return t||e?K`
      <div class="footer">
        <span>Force sync</span>
        <div class="spacer"></div>
        ${t?K`<ha-icon-button
              .path=${"M17.65 6.35A7.958 7.958 0 0 0 12 4a8 8 0 1 0 7.73 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z"}
              title="Refresh shadow (MQTT)"
              @click=${()=>this._press("refresh_shadow")}
            ></ha-icon-button>`:Z}
        ${e?K`<ha-icon-button
              .path=${"M12 4V1L8 5l4 4V6a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8Z"}
              title="Refresh metadata (REST)"
              @click=${()=>this._press("refresh_metadata")}
            ></ha-icon-button>`:Z}
      </div>
    `:Z}};Lt.styles=zt,t([ft({attribute:!1})],Lt.prototype,"hass",void 0),t([gt()],Lt.prototype,"_config",void 0),t([gt()],Lt.prototype,"_resolved",void 0),Lt=t([ut(bt)],Lt),window.customCards=window.customCards||[],window.customCards.push({type:bt,name:"Aiper Cleaner Card",description:"Status, battery, mode and clean-path controls for an Aiper pool cleaner.",preview:!0,documentationURL:"https://github.com/kmich/ha-aiper-card"}),console.info("%c AIPER-CARD %c 0.1.0 ","background:#039be5;color:#fff","color:#039be5");const jt=["ph","orp","chlorine"],Dt={ph:"pH",orp:"ORP",chlorine:"Chlorine",tds:"TDS",ec:"EC"};let Wt=class extends dt{constructor(){super(...arguments),this._resolveKey=""}static async getConfigElement(){return await Promise.resolve().then(function(){return Bt}),document.createElement(xt)}static getStubConfig(){return{type:`custom:${wt}`}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.device&&!t.entity&&!t.entities)throw new Error("Set a `device:` (or an `entity:` / `entities:` override)");this._config={show_score:!0,show_meta:!0,...t},this._resolveKey=""}getCardSize(){return 3}updated(){if(!this.hass||!this._config)return;const t=`${this._config.device??""}|${this._config.entity??""}|${JSON.stringify(this._config.entities??{})}`;t!==this._resolveKey&&(this._resolveKey=t,this._resolve())}async _resolve(){this.hass&&this._config&&(this._resolved=await Tt(this.hass,{device:this._config.device,anchorEntity:this._config.entity,keys:Rt,idHints:Nt,overrides:this._config.entities}))}_state(t){const e=this._resolved?.map[t];return e?this.hass?.states[e]:void 0}_moreInfo(t){const e=this._resolved?.map[t];e&&s(this,"hass-more-info",{entityId:e})}render(){if(!this.hass||!this._config)return Z;if(!this._resolved)return K`<ha-card><div class="unavailable">Loading…</div></ha-card>`;const t=["ph","orp","ec","tds","chlorine","score"].some(t=>this._state(t));if(!t)return K`<ha-card
        ><div class="unavailable">
          No Aiper water-quality entities found. Check the <code>device</code> in the card config.
        </div></ha-card
      >`;const e=this._config.name||this._resolved.deviceName||this._state("ph")?.attributes.friendly_name||"Aiper Water Quality",i=this._config.gauges?.length?this._config.gauges:jt;return K`
      <ha-card>
        <div class="header" style="min-height:0">
          <div><div class="title">${e}</div>${this._renderResult()}</div>
        </div>
        ${this._renderWarning()}
        <div class="body">
          ${!1!==this._config.show_score?this._renderScore():Z}
          <div class="grid">${i.map(t=>this._renderGauge(t))}</div>
          ${!1!==this._config.show_meta?this._renderMeta():Z}
        </div>
      </ha-card>
    `}_renderResult(){const t=this._state("result");return!t||["unknown","unavailable"].includes(t.state)?Z:K`<div class="subtitle">${t.state}</div>`}_renderWarning(){const t=this._state("warning");if(!t)return Z;const e=String(t.state);return["no warning","none","ok","unknown","unavailable",""].includes(e.toLowerCase())?Z:K`<div class="alert warning-banner" @click=${()=>this._moreInfo("warning")}>
      <ha-icon icon="mdi:alert"></ha-icon>${e}
    </div>`}_renderScore(){const t=this._state("score");if(!t||isNaN(Number(t.state)))return Z;const e=Number(t.state),i=Math.max(0,Math.min(100,e)),s=i>=80?"var(--success-color, #43a047)":i>=50?"var(--warning-color, #ffa600)":"var(--error-color, #db4437)",r=2*Math.PI*26;return K`
      <div class="row" @click=${()=>this._moreInfo("score")} style="cursor:pointer">
        <svg width="72" height="72" viewBox="0 0 72 72">
          ${F`
            <circle cx="36" cy="36" r="${26}" fill="none" stroke="var(--divider-color)" stroke-width="7" />
            <circle cx="36" cy="36" r="${26}" fill="none" stroke="${s}" stroke-width="7"
              stroke-linecap="round" stroke-dasharray="${r}"
              stroke-dashoffset="${r*(1-i/100)}" transform="rotate(-90 36 36)" />
            <text x="36" y="41" text-anchor="middle" font-size="16" fill="var(--primary-text-color)">${Math.round(e)}</text>`}
        </svg>
        <div>
          <div class="label">Water quality score</div>
          <div>${t.attributes.friendly_name??"Score"}</div>
        </div>
      </div>
    `}_renderGauge(t){const e=this._state(t);if(!e||isNaN(Number(e.state)))return Z;const i=Number(e.state),s=Ut[t],r=e.attributes.unit_of_measurement??s?.unit??"",n=s?.min??0,o=s?.max??100,a=Math.max(0,Math.min(1,(i-n)/(o-n||1)));let c="var(--success-color, #43a047)";s&&(i<s.warn[0]||i>s.warn[1]?c="var(--error-color, #db4437)":(i<s.good[0]||i>s.good[1])&&(c="var(--warning-color, #ffa600)"));const l=Math.PI*(1-a),h=38+30*Math.cos(l),d=40-30*Math.sin(l);return K`
      <div class="gauge" @click=${()=>this._moreInfo(t)} style="cursor:pointer">
        <svg viewBox="0 0 76 46">
          ${F`
            <path d="M8 40 A30 30 0 0 1 68 40" fill="none" stroke="var(--divider-color)" stroke-width="6" stroke-linecap="round"/>
            <path d="M8 40 A30 30 0 0 1 ${h} ${d}" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`}
        </svg>
        <div class="val">${i}</div>
        <div class="unit">${Dt[t]}${r?` · ${r}`:""}</div>
      </div>
    `}_renderMeta(){const t=this._state("temperature"),e=this._state("sample_time");if(!t&&!e)return Z;const i=t?`${t.state}${t.attributes.unit_of_measurement??""}`:"",s=e?this._rel(String(e.state)):"";return K`
      <div class="row wrap" style="color: var(--secondary-text-color); font-size: 0.8rem">
        ${t?K`<span class="meta" @click=${()=>this._moreInfo("temperature")}>
              <ha-icon icon="mdi:thermometer"></ha-icon><span>${i}</span>
            </span>`:Z}
        ${e?K`<span class="meta" @click=${()=>this._moreInfo("sample_time")}>
              <ha-icon icon="mdi:clock-outline"></ha-icon><span>${s}</span>
            </span>`:Z}
      </div>
    `}_rel(t){const e=Date.parse(t);if(isNaN(e))return t;const i=Math.round((Date.now()-e)/1e3);return i<90?"just now":i<5400?`${Math.round(i/60)} min ago`:i<172800?`${Math.round(i/3600)} h ago`:`${Math.round(i/86400)} d ago`}};Wt.styles=zt,t([ft({attribute:!1})],Wt.prototype,"hass",void 0),t([gt()],Wt.prototype,"_config",void 0),t([gt()],Wt.prototype,"_resolved",void 0),Wt=t([ut(wt)],Wt),window.customCards=window.customCards||[],window.customCards.push({type:wt,name:"Aiper Water Quality Card",description:"pH, ORP, chlorine and score gauges for an Aiper HydroComm monitor.",preview:!0,documentationURL:"https://github.com/kmich/ha-aiper-card"});let qt=class extends dt{constructor(){super(...arguments),this._computeLabel=t=>({device:"Aiper device",name:"Name (optional)",image:"Header image URL (optional)",gauges:"Chemistry gauges",show_mode:"Show mode selector",show_clean_path:"Show clean-path selector",show_consumables:"Show consumable wear",show_footer:"Show footer",show_score:"Show score ring",show_meta:"Show temperature / sample time",compact:"Compact (hide header image)"}[t.name]??t.name)}setConfig(t){this._config=t}get _isMonitor(){return(this._config?.type??"").includes(wt)}_schema(){const t=[{name:"device",selector:{device:{integration:At}}},{name:"name",selector:{text:{}}}];return this._isMonitor?[...t,{name:"gauges",selector:{select:{multiple:!0,mode:"list",options:[{value:"ph",label:"pH"},{value:"orp",label:"ORP"},{value:"chlorine",label:"Chlorine"},{value:"tds",label:"TDS"},{value:"ec",label:"EC"}]}}},{type:"grid",schema:[{name:"show_score",selector:{boolean:{}}},{name:"show_meta",selector:{boolean:{}}}]}]:[...t,{name:"image",selector:{text:{}}},{type:"grid",schema:[{name:"show_mode",selector:{boolean:{}}},{name:"show_clean_path",selector:{boolean:{}}},{name:"show_consumables",selector:{boolean:{}}},{name:"show_footer",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}}]}]}_valueChanged(t){this._config&&s(this,"config-changed",{config:{...this._config,...t.detail.value}})}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <p style="color:var(--secondary-text-color);font-size:.8rem;margin:.5em 4px 0">
        Advanced per-entity overrides can be set with an <code>entities:</code> map in YAML.
      </p>
    `:Z}};t([ft({attribute:!1})],qt.prototype,"hass",void 0),t([gt()],qt.prototype,"_config",void 0),qt=t([ut(xt)],qt);var Bt=Object.freeze({__proto__:null,get AiperCardEditor(){return qt}});export{Lt as AiperCleanerCard,Wt as AiperMonitorCard};
