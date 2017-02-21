/*! Built with IMPACT - impactjs.com */

(function(window){"use strict";Number.prototype.map=function(istart,istop,ostart,ostop){return ostart+(ostop-ostart)*((this-istart)/(istop-istart));};Number.prototype.limit=function(min,max){return Math.min(max,Math.max(min,this));};Number.prototype.round=function(precision){precision=Math.pow(10,precision||0);return Math.round(this*precision)/precision;};Number.prototype.floor=function(){return Math.floor(this);};Number.prototype.ceil=function(){return Math.ceil(this);};Number.prototype.toInt=function(){return(this|0);};Number.prototype.toRad=function(){return(this/180)*Math.PI;};Number.prototype.toDeg=function(){return(this*180)/Math.PI;};Number.random=function(min,max){var rand=min+Math.random()*(max-min)
rand=Math.round(rand);return rand;}
Object.defineProperty(Array.prototype,'erase',{value:function(item){for(var i=this.length;i--;){if(this[i]===item){this.splice(i,1);}}
return this;}});Object.defineProperty(Array.prototype,'random',{value:function(item){return this[Math.floor(Math.random()*this.length)];}});Function.prototype.bind=Function.prototype.bind||function(oThis){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");}
var aArgs=Array.prototype.slice.call(arguments,1),fToBind=this,fNOP=function(){},fBound=function(){return fToBind.apply((this instanceof fNOP&&oThis?this:oThis),aArgs.concat(Array.prototype.slice.call(arguments)));};fNOP.prototype=this.prototype;fBound.prototype=new fNOP();return fBound;};window.ig={game:null,debug:null,version:'1.24',global:window,modules:{},resources:[],ready:false,baked:false,nocache:'',ua:{},prefix:(window.ImpactPrefix||''),lib:'lib/',_current:null,_loadQueue:[],_waitForOnload:0,$:function(selector){return selector.charAt(0)=='#'?document.getElementById(selector.substr(1)):document.getElementsByTagName(selector);},$new:function(name){return document.createElement(name);},copy:function(object){if(!object||typeof(object)!='object'||object instanceof HTMLElement||object instanceof ig.Class){return object;}
else if(object instanceof Array){var c=[];for(var i=0,l=object.length;i<l;i++){c[i]=ig.copy(object[i]);}
return c;}
else{var c={};for(var i in object){c[i]=ig.copy(object[i]);}
return c;}},merge:function(original,extended){for(var key in extended){var ext=extended[key];if(typeof(ext)!='object'||ext instanceof HTMLElement||ext instanceof ig.Class||ext===null){original[key]=ext;}
else{if(!original[key]||typeof(original[key])!='object'){original[key]=(ext instanceof Array)?[]:{};}
ig.merge(original[key],ext);}}
return original;},ksort:function(obj){if(!obj||typeof(obj)!='object'){return[];}
var keys=[],values=[];for(var i in obj){keys.push(i);}
keys.sort();for(var i=0;i<keys.length;i++){values.push(obj[keys[i]]);}
return values;},setVendorAttribute:function(el,attr,val){var uc=attr.charAt(0).toUpperCase()+attr.substr(1);el[attr]=el['ms'+uc]=el['moz'+uc]=el['webkit'+uc]=el['o'+uc]=val;},getVendorAttribute:function(el,attr){var uc=attr.charAt(0).toUpperCase()+attr.substr(1);return el[attr]||el['ms'+uc]||el['moz'+uc]||el['webkit'+uc]||el['o'+uc];},normalizeVendorAttribute:function(el,attr){var prefixedVal=ig.getVendorAttribute(el,attr);if(!el[attr]&&prefixedVal){el[attr]=prefixedVal;}},getImagePixels:function(image,x,y,width,height){var canvas=ig.$new('canvas');canvas.width=image.width;canvas.height=image.height;var ctx=canvas.getContext('2d');ig.System.SCALE.CRISP(canvas,ctx);var ratio=ig.getVendorAttribute(ctx,'backingStorePixelRatio')||1;ig.normalizeVendorAttribute(ctx,'getImageDataHD');var realWidth=image.width/ratio,realHeight=image.height/ratio;canvas.width=Math.ceil(realWidth);canvas.height=Math.ceil(realHeight);ctx.drawImage(image,0,0,realWidth,realHeight);return(ratio===1)?ctx.getImageData(x,y,width,height):ctx.getImageDataHD(x,y,width,height);},module:function(name){if(ig._current){throw("Module '"+ig._current.name+"' defines nothing");}
if(ig.modules[name]&&ig.modules[name].body){throw("Module '"+name+"' is already defined");}
ig._current={name:name,requires:[],loaded:false,body:null};ig.modules[name]=ig._current;ig._loadQueue.push(ig._current);return ig;},requires:function(){ig._current.requires=Array.prototype.slice.call(arguments);return ig;},defines:function(body){ig._current.body=body;ig._current=null;ig._initDOMReady();},addResource:function(resource){ig.resources.push(resource);},setNocache:function(set){ig.nocache=set?'?'+Date.now():'';},log:function(){},assert:function(condition,msg){},show:function(name,number){},mark:function(msg,color){},_loadScript:function(name,requiredFrom){ig.modules[name]={name:name,requires:[],loaded:false,body:null};ig._waitForOnload++;var path=ig.prefix+ig.lib+name.replace(/\./g,'/')+'.js'+ig.nocache;var script=ig.$new('script');script.type='text/javascript';script.src=path;script.onload=function(){ig._waitForOnload--;ig._execModules();};script.onerror=function(){throw('Failed to load module '+name+' at '+path+' '+'required from '+requiredFrom);};ig.$('head')[0].appendChild(script);},_execModules:function(){var modulesLoaded=false;for(var i=0;i<ig._loadQueue.length;i++){var m=ig._loadQueue[i];var dependenciesLoaded=true;for(var j=0;j<m.requires.length;j++){var name=m.requires[j];if(!ig.modules[name]){dependenciesLoaded=false;ig._loadScript(name,m.name);}
else if(!ig.modules[name].loaded){dependenciesLoaded=false;}}
if(dependenciesLoaded&&m.body){ig._loadQueue.splice(i,1);m.loaded=true;m.body();modulesLoaded=true;i--;}}
if(modulesLoaded){ig._execModules();}
else if(!ig.baked&&ig._waitForOnload==0&&ig._loadQueue.length!=0){var unresolved=[];for(var i=0;i<ig._loadQueue.length;i++){var unloaded=[];var requires=ig._loadQueue[i].requires;for(var j=0;j<requires.length;j++){var m=ig.modules[requires[j]];if(!m||!m.loaded){unloaded.push(requires[j]);}}
unresolved.push(ig._loadQueue[i].name+' (requires: '+unloaded.join(', ')+')');}
throw("Unresolved (or circular?) dependencies. "+"Most likely there's a name/path mismatch for one of the listed modules "+"or a previous syntax error prevents a module from loading:\n"+
unresolved.join('\n'));}},_DOMReady:function(){if(!ig.modules['dom.ready'].loaded){if(!document.body){return setTimeout(ig._DOMReady,13);}
ig.modules['dom.ready'].loaded=true;ig._waitForOnload--;ig._execModules();}
return 0;},_boot:function(){if(document.location.href.match(/\?nocache/)){ig.setNocache(true);}
ig.ua.pixelRatio=window.devicePixelRatio||1;ig.ua.viewport={width:window.innerWidth,height:window.innerHeight};ig.ua.screen={width:window.screen.availWidth*ig.ua.pixelRatio,height:window.screen.availHeight*ig.ua.pixelRatio};ig.ua.iPhone=/iPhone/i.test(navigator.userAgent);ig.ua.iPhone4=(ig.ua.iPhone&&ig.ua.pixelRatio==2);ig.ua.iPad=/iPad/i.test(navigator.userAgent);ig.ua.android=/android/i.test(navigator.userAgent);ig.ua.winPhone=/Windows Phone/i.test(navigator.userAgent);ig.ua.iOS=ig.ua.iPhone||ig.ua.iPad;ig.ua.mobile=ig.ua.iOS||ig.ua.android||ig.ua.winPhone||/mobile/i.test(navigator.userAgent);ig.ua.touchDevice=(('ontouchstart'in window)||(window.navigator.msMaxTouchPoints));},_initDOMReady:function(){if(ig.modules['dom.ready']){ig._execModules();return;}
ig._boot();ig.modules['dom.ready']={requires:[],loaded:false,body:null};ig._waitForOnload++;if(document.readyState==='complete'){ig._DOMReady();}
else{document.addEventListener('DOMContentLoaded',ig._DOMReady,false);window.addEventListener('load',ig._DOMReady,false);}}};ig.normalizeVendorAttribute(window,'requestAnimationFrame');if(window.requestAnimationFrame){var next=1,anims={};window.ig.setAnimation=function(callback,element){var current=next++;anims[current]=true;var animate=function(){if(!anims[current]){return;}
window.requestAnimationFrame(animate,element);callback();};window.requestAnimationFrame(animate,element);return current;};window.ig.clearAnimation=function(id){delete anims[id];};}
else{window.ig.setAnimation=function(callback,element){return window.setInterval(callback,1000/60);};window.ig.clearAnimation=function(id){window.clearInterval(id);};}
var initializing=false,fnTest=/xyz/.test(function(){xyz;})?/\bparent\b/:/.*/;var lastClassId=0;window.ig.Class=function(){};var inject=function(prop){var proto=this.prototype;var parent={};for(var name in prop){if(typeof(prop[name])=="function"&&typeof(proto[name])=="function"&&fnTest.test(prop[name])){parent[name]=proto[name];proto[name]=(function(name,fn){return function(){var tmp=this.parent;this.parent=parent[name];var ret=fn.apply(this,arguments);this.parent=tmp;return ret;};})(name,prop[name]);}
else{proto[name]=prop[name];}}};window.ig.Class.extend=function(prop){var parent=this.prototype;initializing=true;var prototype=new this();initializing=false;for(var name in prop){if(typeof(prop[name])=="function"&&typeof(parent[name])=="function"&&fnTest.test(prop[name])){prototype[name]=(function(name,fn){return function(){var tmp=this.parent;this.parent=parent[name];var ret=fn.apply(this,arguments);this.parent=tmp;return ret;};})(name,prop[name]);}
else{prototype[name]=prop[name];}}
function Class(){if(!initializing){if(this.staticInstantiate){var obj=this.staticInstantiate.apply(this,arguments);if(obj){return obj;}}
for(var p in this){if(typeof(this[p])=='object'){this[p]=ig.copy(this[p]);}}
if(this.init){this.init.apply(this,arguments);}}
return this;}
Class.prototype=prototype;Class.prototype.constructor=Class;Class.extend=window.ig.Class.extend;Class.inject=inject;Class.classId=prototype.classId=++lastClassId;return Class;};if(window.ImpactMixin){ig.merge(ig,window.ImpactMixin);}})(window);

// lib/impact/image.js
ig.baked=true;ig.module('impact.image').defines(function(){"use strict";ig.Image=ig.Class.extend({data:null,width:0,height:0,loaded:false,failed:false,loadCallback:null,path:'',staticInstantiate:function(path){return ig.Image.cache[path]||null;},init:function(path){this.path=path;this.load();},load:function(loadCallback){if(this.loaded){if(loadCallback){loadCallback(this.path,true);}
return;}
else if(!this.loaded&&ig.ready){this.loadCallback=loadCallback||null;this.data=new Image();this.data.onload=this.onload.bind(this);this.data.onerror=this.onerror.bind(this);this.data.src=ig.prefix+this.path+ig.nocache;}
else{ig.addResource(this);}
ig.Image.cache[this.path]=this;},reload:function(){this.loaded=false;this.data=new Image();this.data.onload=this.onload.bind(this);this.data.src=this.path+'?'+Date.now();},onload:function(event){this.width=this.data.width;this.height=this.data.height;this.loaded=true;if(ig.system.scale!=1){this.resize(ig.system.scale);}
if(this.loadCallback){this.loadCallback(this.path,true);}},onerror:function(event){this.failed=true;if(this.loadCallback){this.loadCallback(this.path,false);}},resize:function(scale){var origPixels=ig.getImagePixels(this.data,0,0,this.width,this.height);var widthScaled=this.width*scale;var heightScaled=this.height*scale;var scaled=ig.$new('canvas');scaled.width=widthScaled;scaled.height=heightScaled;var scaledCtx=scaled.getContext('2d');var scaledPixels=scaledCtx.getImageData(0,0,widthScaled,heightScaled);for(var y=0;y<heightScaled;y++){for(var x=0;x<widthScaled;x++){var index=(Math.floor(y/scale)*this.width+Math.floor(x/scale))*4;var indexScaled=(y*widthScaled+x)*4;scaledPixels.data[indexScaled]=origPixels.data[index];scaledPixels.data[indexScaled+1]=origPixels.data[index+1];scaledPixels.data[indexScaled+2]=origPixels.data[index+2];scaledPixels.data[indexScaled+3]=origPixels.data[index+3];}}
scaledCtx.putImageData(scaledPixels,0,0);this.data=scaled;},draw:function(targetX,targetY,sourceX,sourceY,width,height){if(!this.loaded){return;}
var scale=ig.system.scale;sourceX=sourceX?sourceX*scale:0;sourceY=sourceY?sourceY*scale:0;width=(width?width:this.width)*scale;height=(height?height:this.height)*scale;ig.system.context.drawImage(this.data,sourceX,sourceY,width,height,ig.system.getDrawPos(targetX),ig.system.getDrawPos(targetY),width,height);ig.Image.drawCount++;},drawTile:function(targetX,targetY,tile,tileWidth,tileHeight,flipX,flipY){tileHeight=tileHeight?tileHeight:tileWidth;if(!this.loaded||tileWidth>this.width||tileHeight>this.height){return;}
var scale=ig.system.scale;var tileWidthScaled=Math.floor(tileWidth*scale);var tileHeightScaled=Math.floor(tileHeight*scale);var scaleX=flipX?-1:1;var scaleY=flipY?-1:1;if(flipX||flipY){ig.system.context.save();ig.system.context.scale(scaleX,scaleY);}
ig.system.context.drawImage(this.data,(Math.floor(tile*tileWidth)%this.width)*scale,(Math.floor(tile*tileWidth/this.width)*tileHeight)*scale,tileWidthScaled,tileHeightScaled,ig.system.getDrawPos(targetX)*scaleX-(flipX?tileWidthScaled:0),ig.system.getDrawPos(targetY)*scaleY-(flipY?tileHeightScaled:0),tileWidthScaled,tileHeightScaled);if(flipX||flipY){ig.system.context.restore();}
ig.Image.drawCount++;}});ig.Image.drawCount=0;ig.Image.cache={};ig.Image.reloadCache=function(){for(var path in ig.Image.cache){ig.Image.cache[path].reload();}};});

// lib/impact/font.js
ig.baked=true;ig.module('impact.font').requires('impact.image').defines(function(){"use strict";ig.Font=ig.Image.extend({widthMap:[],indices:[],firstChar:32,alpha:1,letterSpacing:1,lineSpacing:0,onload:function(ev){this._loadMetrics(this.data);this.parent(ev);},widthForString:function(text){if(text.indexOf('\n')!==-1){var lines=text.split('\n');var width=0;for(var i=0;i<lines.length;i++){width=Math.max(width,this._widthForLine(lines[i]));}
return width;}
else{return this._widthForLine(text);}},_widthForLine:function(text){var width=0;for(var i=0;i<text.length;i++){width+=this.widthMap[text.charCodeAt(i)-this.firstChar]+this.letterSpacing;}
return width;},heightForString:function(text){return text.split('\n').length*(this.height+this.lineSpacing);},draw:function(text,x,y,align){if(typeof(text)!='string'){text=text.toString();}
if(text.indexOf('\n')!==-1){var lines=text.split('\n');var lineHeight=this.height+this.lineSpacing;for(var i=0;i<lines.length;i++){this.draw(lines[i],x,y+i*lineHeight,align);}
return;}
if(align==ig.Font.ALIGN.RIGHT||align==ig.Font.ALIGN.CENTER){var width=this._widthForLine(text);x-=align==ig.Font.ALIGN.CENTER?width/2:width;}
if(this.alpha!==1){ig.system.context.globalAlpha=this.alpha;}
for(var i=0;i<text.length;i++){var c=text.charCodeAt(i);x+=this._drawChar(c-this.firstChar,x,y);}
if(this.alpha!==1){ig.system.context.globalAlpha=1;}
ig.Image.drawCount+=text.length;},_drawChar:function(c,targetX,targetY){if(!this.loaded||c<0||c>=this.indices.length){return 0;}
var scale=ig.system.scale;var charX=this.indices[c]*scale;var charY=0;var charWidth=this.widthMap[c]*scale;var charHeight=(this.height-2)*scale;ig.system.context.drawImage(this.data,charX,charY,charWidth,charHeight,ig.system.getDrawPos(targetX),ig.system.getDrawPos(targetY),charWidth,charHeight);return this.widthMap[c]+this.letterSpacing;},_loadMetrics:function(image){this.height=image.height-1;this.widthMap=[];this.indices=[];var px=ig.getImagePixels(image,0,image.height-1,image.width,1);var currentChar=0;var currentWidth=0;for(var x=0;x<image.width;x++){var index=x*4+3;if(px.data[index]>127){currentWidth++;}
else if(px.data[index]<128&&currentWidth){this.widthMap.push(currentWidth);this.indices.push(x-currentWidth);currentChar++;currentWidth=0;}}
this.widthMap.push(currentWidth);this.indices.push(x-currentWidth);}});ig.Font.ALIGN={LEFT:0,RIGHT:1,CENTER:2};});

// lib/impact/sound.js
ig.baked=true;ig.module('impact.sound').defines(function(){"use strict";ig.SoundManager=ig.Class.extend({clips:{},volume:1,format:null,init:function(){if(!ig.Sound.enabled||!window.Audio){ig.Sound.enabled=false;return;}
var probe=new Audio();for(var i=0;i<ig.Sound.use.length;i++){var format=ig.Sound.use[i];if(probe.canPlayType(format.mime)){this.format=format;break;}}
if(!this.format){ig.Sound.enabled=false;}
if(ig.Sound.enabled&&ig.Sound.useWebAudio){this.audioContext=new AudioContext();this.boundWebAudioUnlock=this.unlockWebAudio.bind(this);document.addEventListener('touchstart',this.boundWebAudioUnlock,false);}},unlockWebAudio:function(){document.removeEventListener('touchstart',this.boundWebAudioUnlock,false);var buffer=this.audioContext.createBuffer(1,1,22050);var source=this.audioContext.createBufferSource();source.buffer=buffer;source.connect(this.audioContext.destination);source.start(0);},load:function(path,multiChannel,loadCallback){if(multiChannel&&ig.Sound.useWebAudio){return this.loadWebAudio(path,multiChannel,loadCallback);}
else{return this.loadHTML5Audio(path,multiChannel,loadCallback);}},loadWebAudio:function(path,multiChannel,loadCallback){var realPath=ig.prefix+path.replace(/[^\.]+$/,this.format.ext)+ig.nocache;if(this.clips[path]){return this.clips[path];}
var audioSource=new ig.Sound.WebAudioSource()
this.clips[path]=audioSource;var request=new XMLHttpRequest();request.open('GET',realPath,true);request.responseType='arraybuffer';var that=this;request.onload=function(ev){that.audioContext.decodeAudioData(request.response,function(buffer){audioSource.buffer=buffer;loadCallback(path,true,ev);},function(ev){loadCallback(path,false,ev);});};request.onerror=function(ev){loadCallback(path,false,ev);};request.send();return audioSource;},loadHTML5Audio:function(path,multiChannel,loadCallback){var realPath=ig.prefix+path.replace(/[^\.]+$/,this.format.ext)+ig.nocache;if(this.clips[path]){if(this.clips[path]instanceof ig.Sound.WebAudioSource){return this.clips[path];}
if(multiChannel&&this.clips[path].length<ig.Sound.channels){for(var i=this.clips[path].length;i<ig.Sound.channels;i++){var a=new Audio(realPath);a.load();this.clips[path].push(a);}}
return this.clips[path][0];}
var clip=new Audio(realPath);if(loadCallback){if(ig.ua.mobile){setTimeout(function(){loadCallback(path,true,null);},0);}
else{clip.addEventListener('canplaythrough',function cb(ev){clip.removeEventListener('canplaythrough',cb,false);loadCallback(path,true,ev);},false);clip.addEventListener('error',function(ev){loadCallback(path,false,ev);},false);}}
clip.preload='auto';clip.load();this.clips[path]=[clip];if(multiChannel){for(var i=1;i<ig.Sound.channels;i++){var a=new Audio(realPath);a.load();this.clips[path].push(a);}}
return clip;},get:function(path){var channels=this.clips[path];if(channels&&channels instanceof ig.Sound.WebAudioSource){return channels;}
for(var i=0,clip;clip=channels[i++];){if(clip.paused||clip.ended){if(clip.ended){clip.currentTime=0;}
return clip;}}
channels[0].pause();channels[0].currentTime=0;return channels[0];}});ig.Music=ig.Class.extend({tracks:[],namedTracks:{},currentTrack:null,currentIndex:0,random:false,_volume:1,_loop:false,_fadeInterval:0,_fadeTimer:null,_endedCallbackBound:null,init:function(){this._endedCallbackBound=this._endedCallback.bind(this);Object.defineProperty(this,"volume",{get:this.getVolume.bind(this),set:this.setVolume.bind(this)});Object.defineProperty(this,"loop",{get:this.getLooping.bind(this),set:this.setLooping.bind(this)});},add:function(music,name){if(!ig.Sound.enabled){return;}
var path=music instanceof ig.Sound?music.path:music;var track=ig.soundManager.load(path,false);if(track instanceof ig.Sound.WebAudioSource){ig.system.stopRunLoop();throw("Sound '"+path+"' loaded as Multichannel but used for Music. "+"Set the multiChannel param to false when loading, e.g.: new ig.Sound(path, false)");}
track.loop=this._loop;track.volume=this._volume;track.addEventListener('ended',this._endedCallbackBound,false);this.tracks.push(track);if(name){this.namedTracks[name]=track;}
if(!this.currentTrack){this.currentTrack=track;}},next:function(){if(!this.tracks.length){return;}
this.stop();this.currentIndex=this.random?Math.floor(Math.random()*this.tracks.length):(this.currentIndex+1)%this.tracks.length;this.currentTrack=this.tracks[this.currentIndex];this.play();},pause:function(){if(!this.currentTrack){return;}
this.currentTrack.pause();},stop:function(){if(!this.currentTrack){return;}
this.currentTrack.pause();this.currentTrack.currentTime=0;},play:function(name){if(name&&this.namedTracks[name]){var newTrack=this.namedTracks[name];if(newTrack!=this.currentTrack){this.stop();this.currentTrack=newTrack;}}
else if(!this.currentTrack){return;}
this.currentTrack.play();},getLooping:function(){return this._loop;},setLooping:function(l){this._loop=l;for(var i in this.tracks){this.tracks[i].loop=l;}},getVolume:function(){return this._volume;},setVolume:function(v){this._volume=v.limit(0,1);for(var i in this.tracks){this.tracks[i].volume=this._volume;}},fadeOut:function(time){if(!this.currentTrack){return;}
clearInterval(this._fadeInterval);this.fadeTimer=new ig.Timer(time);this._fadeInterval=setInterval(this._fadeStep.bind(this),50);},_fadeStep:function(){var v=this.fadeTimer.delta().map(-this.fadeTimer.target,0,1,0).limit(0,1)*this._volume;if(v<=0.01){this.stop();this.currentTrack.volume=this._volume;clearInterval(this._fadeInterval);}
else{this.currentTrack.volume=v;}},_endedCallback:function(){if(this._loop){this.play();}
else{this.next();}}});ig.Sound=ig.Class.extend({path:'',volume:1,currentClip:null,multiChannel:true,_loop:false,init:function(path,multiChannel){this.path=path;this.multiChannel=(multiChannel!==false);Object.defineProperty(this,"loop",{get:this.getLooping.bind(this),set:this.setLooping.bind(this)});this.load();},getLooping:function(){return this._loop;},setLooping:function(loop){this._loop=loop;if(this.currentClip){this.currentClip.loop=loop;}},load:function(loadCallback){if(!ig.Sound.enabled){if(loadCallback){loadCallback(this.path,true);}
return;}
if(ig.ready){ig.soundManager.load(this.path,this.multiChannel,loadCallback);}
else{ig.addResource(this);}},play:function(){if(!ig.Sound.enabled){return;}
this.currentClip=ig.soundManager.get(this.path);this.currentClip.loop=this._loop;this.currentClip.volume=ig.soundManager.volume*this.volume;this.currentClip.play();},stop:function(){if(this.currentClip){this.currentClip.pause();this.currentClip.currentTime=0;}}});ig.Sound.WebAudioSource=ig.Class.extend({sources:[],gain:null,buffer:null,_loop:false,init:function(){this.gain=ig.soundManager.audioContext.createGain();this.gain.connect(ig.soundManager.audioContext.destination);Object.defineProperty(this,"loop",{get:this.getLooping.bind(this),set:this.setLooping.bind(this)});Object.defineProperty(this,"volume",{get:this.getVolume.bind(this),set:this.setVolume.bind(this)});},play:function(){if(!this.buffer){return;}
var source=ig.soundManager.audioContext.createBufferSource();source.buffer=this.buffer;source.connect(this.gain);source.loop=this._loop;var that=this;this.sources.push(source);source.onended=function(){that.sources.erase(source);}
source.start(0);},pause:function(){for(var i=0;i<this.sources.length;i++){try{this.sources[i].stop();}catch(err){}}},getLooping:function(){return this._loop;},setLooping:function(loop){this._loop=loop;for(var i=0;i<this.sources.length;i++){this.sources[i].loop=loop;}},getVolume:function(){return this.gain.gain.value;},setVolume:function(volume){this.gain.gain.value=volume;}});ig.Sound.FORMAT={MP3:{ext:'mp3',mime:'audio/mpeg'},M4A:{ext:'m4a',mime:'audio/mp4; codecs=mp4a'},OGG:{ext:'ogg',mime:'audio/ogg; codecs=vorbis'},WEBM:{ext:'webm',mime:'audio/webm; codecs=vorbis'},CAF:{ext:'caf',mime:'audio/x-caf'}};ig.Sound.use=[ig.Sound.FORMAT.OGG,ig.Sound.FORMAT.MP3];ig.Sound.channels=4;ig.Sound.enabled=true;ig.normalizeVendorAttribute(window,'AudioContext');ig.Sound.useWebAudio=!!window.AudioContext&&!window.nwf;});

// lib/impact/loader.js
ig.baked=true;ig.module('impact.loader').requires('impact.image','impact.font','impact.sound').defines(function(){"use strict";ig.Loader=ig.Class.extend({resources:[],gameClass:null,status:0,done:false,_unloaded:[],_drawStatus:0,_intervalId:0,_loadCallbackBound:null,init:function(gameClass,resources){this.gameClass=gameClass;this.resources=resources;this._loadCallbackBound=this._loadCallback.bind(this);for(var i=0;i<this.resources.length;i++){this._unloaded.push(this.resources[i].path);}},load:function(){ig.system.clear('#000');if(!this.resources.length){this.end();return;}
for(var i=0;i<this.resources.length;i++){this.loadResource(this.resources[i]);}
this._intervalId=setInterval(this.draw.bind(this),16);},loadResource:function(res){res.load(this._loadCallbackBound);},end:function(){if(this.done){return;}
this.done=true;clearInterval(this._intervalId);ig.system.setGame(this.gameClass);},draw:function(){this._drawStatus+=(this.status-this._drawStatus)/5;var s=ig.system.scale;var w=ig.system.width*0.6;var h=ig.system.height*0.1;var x=ig.system.width*0.5-w/2;var y=ig.system.height*0.5-h/2;ig.system.context.fillStyle='#000';ig.system.context.fillRect(0,0,480,320);ig.system.context.fillStyle='#fff';ig.system.context.fillRect(x*s,y*s,w*s,h*s);ig.system.context.fillStyle='#000';ig.system.context.fillRect(x*s+s,y*s+s,w*s-s-s,h*s-s-s);ig.system.context.fillStyle='#fff';ig.system.context.fillRect(x*s,y*s,w*s*this._drawStatus,h*s);},_loadCallback:function(path,status){if(status){this._unloaded.erase(path);}
else{throw('Failed to load resource: '+path);}
this.status=1-(this._unloaded.length/this.resources.length);if(this._unloaded.length==0){setTimeout(this.end.bind(this),250);}}});});

// lib/impact/timer.js
ig.baked=true;ig.module('impact.timer').defines(function(){"use strict";ig.Timer=ig.Class.extend({target:0,base:0,last:0,pausedAt:0,init:function(seconds){this.base=ig.Timer.time;this.last=ig.Timer.time;this.target=seconds||0;},set:function(seconds){this.target=seconds||0;this.base=ig.Timer.time;this.pausedAt=0;},reset:function(){this.base=ig.Timer.time;this.pausedAt=0;},tick:function(){var delta=ig.Timer.time-this.last;this.last=ig.Timer.time;return(this.pausedAt?0:delta);},delta:function(){return(this.pausedAt||ig.Timer.time)-this.base-this.target;},pause:function(){if(!this.pausedAt){this.pausedAt=ig.Timer.time;}},unpause:function(){if(this.pausedAt){this.base+=ig.Timer.time-this.pausedAt;this.pausedAt=0;}}});ig.Timer._last=0;ig.Timer.time=Number.MIN_VALUE;ig.Timer.timeScale=1;ig.Timer.maxStep=0.05;ig.Timer.step=function(){var current=Date.now();var delta=(current-ig.Timer._last)/1000;ig.Timer.time+=Math.min(delta,ig.Timer.maxStep)*ig.Timer.timeScale;ig.Timer._last=current;};});

// lib/impact/system.js
ig.baked=true;ig.module('impact.system').requires('impact.timer','impact.image').defines(function(){"use strict";ig.System=ig.Class.extend({fps:30,width:320,height:240,realWidth:320,realHeight:240,scale:1,tick:0,animationId:0,newGameClass:null,running:false,delegate:null,clock:null,canvas:null,context:null,init:function(canvasId,fps,width,height,scale){this.fps=fps;this.clock=new ig.Timer();this.canvas=ig.$(canvasId);this.resize(width,height,scale);this.context=this.canvas.getContext('2d');this.getDrawPos=ig.System.drawMode;if(this.scale!=1){ig.System.scaleMode=ig.System.SCALE.CRISP;}
ig.System.scaleMode(this.canvas,this.context);},resize:function(width,height,scale){this.width=width;this.height=height;this.scale=scale||this.scale;this.realWidth=this.width*this.scale;this.realHeight=this.height*this.scale;this.canvas.width=this.realWidth;this.canvas.height=this.realHeight;},setGame:function(gameClass){if(this.running){this.newGameClass=gameClass;}
else{this.setGameNow(gameClass);}},setGameNow:function(gameClass){ig.game=new(gameClass)();ig.system.setDelegate(ig.game);},setDelegate:function(object){if(typeof(object.run)=='function'){this.delegate=object;this.startRunLoop();}else{throw('System.setDelegate: No run() function in object');}},stopRunLoop:function(){ig.clearAnimation(this.animationId);this.running=false;},startRunLoop:function(){this.stopRunLoop();this.animationId=ig.setAnimation(this.run.bind(this),this.canvas);this.running=true;},clear:function(color){this.context.fillStyle=color;this.context.fillRect(0,0,this.realWidth,this.realHeight);},run:function(){ig.Timer.step();this.tick=this.clock.tick();this.delegate.run();ig.input.clearPressed();if(this.newGameClass){this.setGameNow(this.newGameClass);this.newGameClass=null;}},getDrawPos:null});ig.System.DRAW={AUTHENTIC:function(p){return Math.round(p)*this.scale;},SMOOTH:function(p){return Math.round(p*this.scale);},SUBPIXEL:function(p){return p*this.scale;}};ig.System.drawMode=ig.System.DRAW.SMOOTH;ig.System.SCALE={CRISP:function(canvas,context){ig.setVendorAttribute(context,'imageSmoothingEnabled',false);canvas.style.imageRendering='-moz-crisp-edges';canvas.style.imageRendering='-o-crisp-edges';canvas.style.imageRendering='-webkit-optimize-contrast';canvas.style.imageRendering='crisp-edges';canvas.style.msInterpolationMode='nearest-neighbor';},SMOOTH:function(canvas,context){ig.setVendorAttribute(context,'imageSmoothingEnabled',true);canvas.style.imageRendering='';canvas.style.msInterpolationMode='';}};ig.System.scaleMode=ig.System.SCALE.SMOOTH;});

// lib/impact/input.js
ig.baked=true;ig.module('impact.input').defines(function(){"use strict";ig.KEY={'MOUSE1':-1,'MOUSE2':-3,'MWHEEL_UP':-4,'MWHEEL_DOWN':-5,'BACKSPACE':8,'TAB':9,'ENTER':13,'PAUSE':19,'CAPS':20,'ESC':27,'SPACE':32,'PAGE_UP':33,'PAGE_DOWN':34,'END':35,'HOME':36,'LEFT_ARROW':37,'UP_ARROW':38,'RIGHT_ARROW':39,'DOWN_ARROW':40,'INSERT':45,'DELETE':46,'_0':48,'_1':49,'_2':50,'_3':51,'_4':52,'_5':53,'_6':54,'_7':55,'_8':56,'_9':57,'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,'I':73,'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,'V':86,'W':87,'X':88,'Y':89,'Z':90,'NUMPAD_0':96,'NUMPAD_1':97,'NUMPAD_2':98,'NUMPAD_3':99,'NUMPAD_4':100,'NUMPAD_5':101,'NUMPAD_6':102,'NUMPAD_7':103,'NUMPAD_8':104,'NUMPAD_9':105,'MULTIPLY':106,'ADD':107,'SUBSTRACT':109,'DECIMAL':110,'DIVIDE':111,'F1':112,'F2':113,'F3':114,'F4':115,'F5':116,'F6':117,'F7':118,'F8':119,'F9':120,'F10':121,'F11':122,'F12':123,'SHIFT':16,'CTRL':17,'ALT':18,'PLUS':187,'COMMA':188,'MINUS':189,'PERIOD':190};ig.Input=ig.Class.extend({bindings:{},actions:{},presses:{},locks:{},delayedKeyup:{},isUsingMouse:false,isUsingKeyboard:false,isUsingAccelerometer:false,mouse:{x:0,y:0},accel:{x:0,y:0,z:0},initMouse:function(){if(this.isUsingMouse){return;}
this.isUsingMouse=true;var mouseWheelBound=this.mousewheel.bind(this);ig.system.canvas.addEventListener('mousewheel',mouseWheelBound,false);ig.system.canvas.addEventListener('DOMMouseScroll',mouseWheelBound,false);ig.system.canvas.addEventListener('contextmenu',this.contextmenu.bind(this),false);ig.system.canvas.addEventListener('mousedown',this.keydown.bind(this),false);ig.system.canvas.addEventListener('mouseup',this.keyup.bind(this),false);ig.system.canvas.addEventListener('mousemove',this.mousemove.bind(this),false);if(ig.ua.touchDevice){ig.system.canvas.addEventListener('touchstart',this.keydown.bind(this),false);ig.system.canvas.addEventListener('touchend',this.keyup.bind(this),false);ig.system.canvas.addEventListener('touchmove',this.mousemove.bind(this),false);ig.system.canvas.addEventListener('MSPointerDown',this.keydown.bind(this),false);ig.system.canvas.addEventListener('MSPointerUp',this.keyup.bind(this),false);ig.system.canvas.addEventListener('MSPointerMove',this.mousemove.bind(this),false);ig.system.canvas.style.msTouchAction='none';}},initKeyboard:function(){if(this.isUsingKeyboard){return;}
this.isUsingKeyboard=true;window.addEventListener('keydown',this.keydown.bind(this),false);window.addEventListener('keyup',this.keyup.bind(this),false);},initAccelerometer:function(){if(this.isUsingAccelerometer){return;}
this.isUsingAccelerometer=true;window.addEventListener('devicemotion',this.devicemotion.bind(this),false);},mousewheel:function(event){var delta=event.wheelDelta?event.wheelDelta:(event.detail*-1);var code=delta>0?ig.KEY.MWHEEL_UP:ig.KEY.MWHEEL_DOWN;var action=this.bindings[code];if(action){this.actions[action]=true;this.presses[action]=true;this.delayedKeyup[action]=true;event.stopPropagation();event.preventDefault();}},mousemove:function(event){var internalWidth=parseInt(ig.system.canvas.offsetWidth)||ig.system.realWidth;var scale=ig.system.scale*(internalWidth/ig.system.realWidth);var pos={left:0,top:0};if(ig.system.canvas.getBoundingClientRect){pos=ig.system.canvas.getBoundingClientRect();}
var ev=event.touches?event.touches[0]:event;this.mouse.x=(ev.clientX-pos.left)/scale;this.mouse.y=(ev.clientY-pos.top)/scale;},contextmenu:function(event){if(this.bindings[ig.KEY.MOUSE2]){event.stopPropagation();event.preventDefault();}},keydown:function(event){var tag=event.target.tagName;if(tag=='INPUT'||tag=='TEXTAREA'){return;}
var code=event.type=='keydown'?event.keyCode:(event.button==2?ig.KEY.MOUSE2:ig.KEY.MOUSE1);if(code<0&&!ig.ua.mobile){window.focus();}
if(event.type=='touchstart'||event.type=='mousedown'){this.mousemove(event);}
var action=this.bindings[code];if(action){this.actions[action]=true;if(!this.locks[action]){this.presses[action]=true;this.locks[action]=true;}
event.preventDefault();}},keyup:function(event){var tag=event.target.tagName;if(tag=='INPUT'||tag=='TEXTAREA'){return;}
var code=event.type=='keyup'?event.keyCode:(event.button==2?ig.KEY.MOUSE2:ig.KEY.MOUSE1);var action=this.bindings[code];if(action){this.delayedKeyup[action]=true;event.preventDefault();}},devicemotion:function(event){this.accel=event.accelerationIncludingGravity;},bind:function(key,action){if(key<0){this.initMouse();}
else if(key>0){this.initKeyboard();}
this.bindings[key]=action;},bindTouch:function(selector,action){var element=ig.$(selector);var that=this;element.addEventListener('touchstart',function(ev){that.touchStart(ev,action);},false);element.addEventListener('touchend',function(ev){that.touchEnd(ev,action);},false);element.addEventListener('MSPointerDown',function(ev){that.touchStart(ev,action);},false);element.addEventListener('MSPointerUp',function(ev){that.touchEnd(ev,action);},false);},unbind:function(key){var action=this.bindings[key];this.delayedKeyup[action]=true;this.bindings[key]=null;},unbindAll:function(){this.bindings={};this.actions={};this.presses={};this.locks={};this.delayedKeyup={};},state:function(action){return this.actions[action];},pressed:function(action){return this.presses[action];},released:function(action){return!!this.delayedKeyup[action];},clearPressed:function(){for(var action in this.delayedKeyup){this.actions[action]=false;this.locks[action]=false;}
this.delayedKeyup={};this.presses={};},touchStart:function(event,action){this.actions[action]=true;this.presses[action]=true;event.stopPropagation();event.preventDefault();return false;},touchEnd:function(event,action){this.delayedKeyup[action]=true;event.stopPropagation();event.preventDefault();return false;}});});

// lib/impact/impact.js
ig.baked=true;ig.module('impact.impact').requires('dom.ready','impact.loader','impact.system','impact.input','impact.sound').defines(function(){"use strict";ig.main=function(canvasId,gameClass,fps,width,height,scale,loaderClass){ig.system=new ig.System(canvasId,fps,width,height,scale||1);ig.input=new ig.Input();ig.soundManager=new ig.SoundManager();ig.music=new ig.Music();ig.ready=true;var loader=new(loaderClass||ig.Loader)(gameClass,ig.resources);loader.load();};});

// lib/impact/animation.js
ig.baked=true;ig.module('impact.animation').requires('impact.timer','impact.image').defines(function(){"use strict";ig.AnimationSheet=ig.Class.extend({width:8,height:8,image:null,init:function(path,width,height){this.width=width;this.height=height;this.image=new ig.Image(path);}});ig.Animation=ig.Class.extend({sheet:null,timer:null,sequence:[],flip:{x:false,y:false},pivot:{x:0,y:0},frame:0,tile:0,loopCount:0,alpha:1,angle:0,init:function(sheet,frameTime,sequence,stop){this.sheet=sheet;this.pivot={x:sheet.width/2,y:sheet.height/2};this.timer=new ig.Timer();this.frameTime=frameTime;this.sequence=sequence;this.stop=!!stop;this.tile=this.sequence[0];},rewind:function(){this.timer.set();this.loopCount=0;this.frame=0;this.tile=this.sequence[0];return this;},gotoFrame:function(f){this.timer.set(this.frameTime*-f-0.0001);this.update();},gotoRandomFrame:function(){this.gotoFrame(Math.floor(Math.random()*this.sequence.length))},update:function(){var frameTotal=Math.floor(this.timer.delta()/this.frameTime);this.loopCount=Math.floor(frameTotal/this.sequence.length);if(this.stop&&this.loopCount>0){this.frame=this.sequence.length-1;}
else{this.frame=frameTotal%this.sequence.length;}
this.tile=this.sequence[this.frame];},draw:function(targetX,targetY){var bbsize=Math.max(this.sheet.width,this.sheet.height);if(targetX>ig.system.width||targetY>ig.system.height||targetX+bbsize<0||targetY+bbsize<0){return;}
if(this.alpha!=1){ig.system.context.globalAlpha=this.alpha;}
if(this.angle==0){this.sheet.image.drawTile(targetX,targetY,this.tile,this.sheet.width,this.sheet.height,this.flip.x,this.flip.y);}
else{ig.system.context.save();ig.system.context.translate(ig.system.getDrawPos(targetX+this.pivot.x),ig.system.getDrawPos(targetY+this.pivot.y));ig.system.context.rotate(this.angle);this.sheet.image.drawTile(-this.pivot.x,-this.pivot.y,this.tile,this.sheet.width,this.sheet.height,this.flip.x,this.flip.y);ig.system.context.restore();}
if(this.alpha!=1){ig.system.context.globalAlpha=1;}}});});

// lib/impact/entity.js
ig.baked=true;ig.module('impact.entity').requires('impact.animation','impact.impact').defines(function(){"use strict";ig.Entity=ig.Class.extend({id:0,settings:{},size:{x:16,y:16},offset:{x:0,y:0},pos:{x:0,y:0},last:{x:0,y:0},vel:{x:0,y:0},accel:{x:0,y:0},friction:{x:0,y:0},maxVel:{x:100,y:100},zIndex:0,gravityFactor:1,standing:false,bounciness:0,minBounceVelocity:40,anims:{},animIds:{},animSheet:null,currentAnim:null,health:10,type:0,checkAgainst:0,collides:0,_killed:false,slopeStanding:{min:(44).toRad(),max:(136).toRad()},init:function(x,y,settings){this.id=++ig.Entity._lastId;this.pos.x=this.last.x=x;this.pos.y=this.last.y=y;ig.merge(this,settings);},reset:function(x,y,settings){var proto=this.constructor.prototype;this.pos.x=x;this.pos.y=y;this.last.x=x;this.last.y=y;this.vel.x=proto.vel.x;this.vel.y=proto.vel.y;this.accel.x=proto.accel.x;this.accel.y=proto.accel.y;this.health=proto.health;this._killed=proto._killed;this.standing=proto.standing;this.type=proto.type;this.checkAgainst=proto.checkAgainst;this.collides=proto.collides;ig.merge(this,settings);},addAnim:function(name,frameTime,sequence,stop){if(!this.animSheet){throw('No animSheet to add the animation '+name+' to.');}
var a=new ig.Animation(this.animSheet,frameTime,sequence,stop);this.anims[name]=a;this.animIds[name]=Object.keys(this.anims).length-1;if(!this.currentAnim){this.currentAnim=a;}
return a;},getAnimId:function(){for(var k in this.anims){if(this.anims[k]===this.currentAnim){return this.animIds[k];}}
return-1;},getAnimById:function(id){for(var k in this.animIds){if(this.animIds[k]===id){return this.anims[k];}}
return null;},getAnimFrame:function(){return this.currentAnim.frame;},update:function(){this.last.x=this.pos.x;this.last.y=this.pos.y;this.vel.y+=ig.game.gravity*ig.system.tick*this.gravityFactor;this.vel.x=this.getNewVelocity(this.vel.x,this.accel.x,this.friction.x,this.maxVel.x);this.vel.y=this.getNewVelocity(this.vel.y,this.accel.y,this.friction.y,this.maxVel.y);var mx=this.vel.x*ig.system.tick;var my=this.vel.y*ig.system.tick;var res=ig.game.collisionMap.trace(this.pos.x,this.pos.y,mx,my,this.size.x,this.size.y);this.handleMovementTrace(res);if(this.currentAnim){this.currentAnim.update();}},getNewVelocity:function(vel,accel,friction,max){if(accel){return(vel+accel*ig.system.tick).limit(-max,max);}
else if(friction){var delta=friction*ig.system.tick;if(vel-delta>0){return vel-delta;}
else if(vel+delta<0){return vel+delta;}
else{return 0;}}
return vel.limit(-max,max);},handleMovementTrace:function(res){this.standing=false;if(res.collision.y){if(this.bounciness>0&&Math.abs(this.vel.y)>this.minBounceVelocity){this.vel.y*=-this.bounciness;}
else{if(this.vel.y>0){this.standing=true;}
this.vel.y=0;}}
if(res.collision.x){if(this.bounciness>0&&Math.abs(this.vel.x)>this.minBounceVelocity){this.vel.x*=-this.bounciness;}
else{this.vel.x=0;}}
if(res.collision.slope){var s=res.collision.slope;if(this.bounciness>0){var proj=this.vel.x*s.nx+this.vel.y*s.ny;this.vel.x=(this.vel.x-s.nx*proj*2)*this.bounciness;this.vel.y=(this.vel.y-s.ny*proj*2)*this.bounciness;}
else{var lengthSquared=s.x*s.x+s.y*s.y;var dot=(this.vel.x*s.x+this.vel.y*s.y)/lengthSquared;this.vel.x=s.x*dot;this.vel.y=s.y*dot;var angle=Math.atan2(s.x,s.y);if(angle>this.slopeStanding.min&&angle<this.slopeStanding.max){this.standing=true;}}}
this.pos=res.pos;},draw:function(){if(this.currentAnim){this.currentAnim.draw(this.pos.x-this.offset.x-ig.game._rscreen.x,this.pos.y-this.offset.y-ig.game._rscreen.y);}},kill:function(){ig.game.removeEntity(this);},receiveDamage:function(amount,from){this.health-=amount;if(this.health<=0){this.kill();}},touches:function(other){return!(this.pos.x>=other.pos.x+other.size.x||this.pos.x+this.size.x<=other.pos.x||this.pos.y>=other.pos.y+other.size.y||this.pos.y+this.size.y<=other.pos.y);},distanceTo:function(other){var xd=(this.pos.x+this.size.x/2)-(other.pos.x+other.size.x/2);var yd=(this.pos.y+this.size.y/2)-(other.pos.y+other.size.y/2);return Math.sqrt(xd*xd+yd*yd);},angleTo:function(other){return Math.atan2((other.pos.y+other.size.y/2)-(this.pos.y+this.size.y/2),(other.pos.x+other.size.x/2)-(this.pos.x+this.size.x/2));},check:function(other){},collideWith:function(other,axis){},ready:function(){},erase:function(){}});ig.Entity._lastId=0;ig.Entity.COLLIDES={NEVER:0,LITE:1,PASSIVE:2,ACTIVE:4,FIXED:8};ig.Entity.TYPE={NONE:0,A:1,B:2,BOTH:3};ig.Entity.checkPair=function(a,b){if(a.checkAgainst&b.type){a.check(b);}
if(b.checkAgainst&a.type){b.check(a);}
if(a.collides&&b.collides&&a.collides+b.collides>ig.Entity.COLLIDES.ACTIVE){ig.Entity.solveCollision(a,b);}};ig.Entity.solveCollision=function(a,b){var weak=null;if(a.collides==ig.Entity.COLLIDES.LITE||b.collides==ig.Entity.COLLIDES.FIXED){weak=a;}
else if(b.collides==ig.Entity.COLLIDES.LITE||a.collides==ig.Entity.COLLIDES.FIXED){weak=b;}
if(a.last.x+a.size.x>b.last.x&&a.last.x<b.last.x+b.size.x){if(a.last.y<b.last.y){ig.Entity.seperateOnYAxis(a,b,weak);}
else{ig.Entity.seperateOnYAxis(b,a,weak);}
a.collideWith(b,'y');b.collideWith(a,'y');}
else if(a.last.y+a.size.y>b.last.y&&a.last.y<b.last.y+b.size.y){if(a.last.x<b.last.x){ig.Entity.seperateOnXAxis(a,b,weak);}
else{ig.Entity.seperateOnXAxis(b,a,weak);}
a.collideWith(b,'x');b.collideWith(a,'x');}};ig.Entity.seperateOnXAxis=function(left,right,weak){var nudge=(left.pos.x+left.size.x-right.pos.x);if(weak){var strong=left===weak?right:left;weak.vel.x=-weak.vel.x*weak.bounciness+strong.vel.x;var resWeak=ig.game.collisionMap.trace(weak.pos.x,weak.pos.y,weak==left?-nudge:nudge,0,weak.size.x,weak.size.y);weak.pos.x=resWeak.pos.x;}
else{var v2=(left.vel.x-right.vel.x)/2;left.vel.x=-v2;right.vel.x=v2;var resLeft=ig.game.collisionMap.trace(left.pos.x,left.pos.y,-nudge/2,0,left.size.x,left.size.y);left.pos.x=Math.floor(resLeft.pos.x);var resRight=ig.game.collisionMap.trace(right.pos.x,right.pos.y,nudge/2,0,right.size.x,right.size.y);right.pos.x=Math.ceil(resRight.pos.x);}};ig.Entity.seperateOnYAxis=function(top,bottom,weak){var nudge=(top.pos.y+top.size.y-bottom.pos.y);if(weak){var strong=top===weak?bottom:top;weak.vel.y=-weak.vel.y*weak.bounciness+strong.vel.y;var nudgeX=0;if(weak==top&&Math.abs(weak.vel.y-strong.vel.y)<weak.minBounceVelocity){weak.standing=true;nudgeX=strong.vel.x*ig.system.tick;}
var resWeak=ig.game.collisionMap.trace(weak.pos.x,weak.pos.y,nudgeX,weak==top?-nudge:nudge,weak.size.x,weak.size.y);weak.pos.y=resWeak.pos.y;weak.pos.x=resWeak.pos.x;}
else if(ig.game.gravity&&(bottom.standing||top.vel.y>0)){var resTop=ig.game.collisionMap.trace(top.pos.x,top.pos.y,0,-(top.pos.y+top.size.y-bottom.pos.y),top.size.x,top.size.y);top.pos.y=resTop.pos.y;if(top.bounciness>0&&top.vel.y>top.minBounceVelocity){top.vel.y*=-top.bounciness;}
else{top.standing=true;top.vel.y=0;}}
else{var v2=(top.vel.y-bottom.vel.y)/2;top.vel.y=-v2;bottom.vel.y=v2;var nudgeX=bottom.vel.x*ig.system.tick;var resTop=ig.game.collisionMap.trace(top.pos.x,top.pos.y,nudgeX,-nudge/2,top.size.x,top.size.y);top.pos.y=resTop.pos.y;var resBottom=ig.game.collisionMap.trace(bottom.pos.x,bottom.pos.y,0,nudge/2,bottom.size.x,bottom.size.y);bottom.pos.y=resBottom.pos.y;}};});

// lib/impact/map.js
ig.baked=true;ig.module('impact.map').defines(function(){"use strict";ig.Map=ig.Class.extend({tilesize:8,width:1,height:1,data:[[]],name:null,init:function(tilesize,data){this.tilesize=tilesize;this.data=data;this.height=data.length;this.width=data[0].length;this.pxWidth=this.width*this.tilesize;this.pxHeight=this.height*this.tilesize;},getTile:function(x,y){var tx=Math.floor(x/this.tilesize);var ty=Math.floor(y/this.tilesize);if((tx>=0&&tx<this.width)&&(ty>=0&&ty<this.height)){return this.data[ty][tx];}
else{return 0;}},setTile:function(x,y,tile){var tx=Math.floor(x/this.tilesize);var ty=Math.floor(y/this.tilesize);if((tx>=0&&tx<this.width)&&(ty>=0&&ty<this.height)){this.data[ty][tx]=tile;}}});});

// lib/impact/collision-map.js
ig.baked=true;ig.module('impact.collision-map').requires('impact.map').defines(function(){"use strict";ig.CollisionMap=ig.Map.extend({lastSlope:1,tiledef:null,init:function(tilesize,data,tiledef){this.parent(tilesize,data);this.tiledef=tiledef||ig.CollisionMap.defaultTileDef;for(var t in this.tiledef){if(t|0>this.lastSlope){this.lastSlope=t|0;}}},trace:function(x,y,vx,vy,objectWidth,objectHeight){var res={collision:{x:false,y:false,slope:false},pos:{x:x,y:y},tile:{x:0,y:0}};var steps=Math.ceil(Math.max(Math.abs(vx),Math.abs(vy))/this.tilesize);if(steps>1){var sx=vx/steps;var sy=vy/steps;for(var i=0;i<steps&&(sx||sy);i++){this._traceStep(res,x,y,sx,sy,objectWidth,objectHeight,vx,vy,i);x=res.pos.x;y=res.pos.y;if(res.collision.x){sx=0;vx=0;}
if(res.collision.y){sy=0;vy=0;}
if(res.collision.slope){break;}}}
else{this._traceStep(res,x,y,vx,vy,objectWidth,objectHeight,vx,vy,0);}
return res;},_traceStep:function(res,x,y,vx,vy,width,height,rvx,rvy,step){res.pos.x+=vx;res.pos.y+=vy;var t=0;if(vx){var pxOffsetX=(vx>0?width:0);var tileOffsetX=(vx<0?this.tilesize:0);var firstTileY=Math.max(Math.floor(y/this.tilesize),0);var lastTileY=Math.min(Math.ceil((y+height)/this.tilesize),this.height);var tileX=Math.floor((res.pos.x+pxOffsetX)/this.tilesize);var prevTileX=Math.floor((x+pxOffsetX)/this.tilesize);if(step>0||tileX==prevTileX||prevTileX<0||prevTileX>=this.width){prevTileX=-1;}
if(tileX>=0&&tileX<this.width){for(var tileY=firstTileY;tileY<lastTileY;tileY++){if(prevTileX!=-1){t=this.data[tileY][prevTileX];if(t>1&&t<=this.lastSlope&&this._checkTileDef(res,t,x,y,rvx,rvy,width,height,prevTileX,tileY)){break;}}
t=this.data[tileY][tileX];if(t==1||t>this.lastSlope||(t>1&&this._checkTileDef(res,t,x,y,rvx,rvy,width,height,tileX,tileY))){if(t>1&&t<=this.lastSlope&&res.collision.slope){break;}
res.collision.x=true;res.tile.x=t;x=res.pos.x=tileX*this.tilesize-pxOffsetX+tileOffsetX;rvx=0;break;}}}}
if(vy){var pxOffsetY=(vy>0?height:0);var tileOffsetY=(vy<0?this.tilesize:0);var firstTileX=Math.max(Math.floor(res.pos.x/this.tilesize),0);var lastTileX=Math.min(Math.ceil((res.pos.x+width)/this.tilesize),this.width);var tileY=Math.floor((res.pos.y+pxOffsetY)/this.tilesize);var prevTileY=Math.floor((y+pxOffsetY)/this.tilesize);if(step>0||tileY==prevTileY||prevTileY<0||prevTileY>=this.height){prevTileY=-1;}
if(tileY>=0&&tileY<this.height){for(var tileX=firstTileX;tileX<lastTileX;tileX++){if(prevTileY!=-1){t=this.data[prevTileY][tileX];if(t>1&&t<=this.lastSlope&&this._checkTileDef(res,t,x,y,rvx,rvy,width,height,tileX,prevTileY)){break;}}
t=this.data[tileY][tileX];if(t==1||t>this.lastSlope||(t>1&&this._checkTileDef(res,t,x,y,rvx,rvy,width,height,tileX,tileY))){if(t>1&&t<=this.lastSlope&&res.collision.slope){break;}
res.collision.y=true;res.tile.y=t;res.pos.y=tileY*this.tilesize-pxOffsetY+tileOffsetY;break;}}}}},_checkTileDef:function(res,t,x,y,vx,vy,width,height,tileX,tileY){var def=this.tiledef[t];if(!def){return false;}
var lx=(tileX+def[0])*this.tilesize,ly=(tileY+def[1])*this.tilesize,lvx=(def[2]-def[0])*this.tilesize,lvy=(def[3]-def[1])*this.tilesize,solid=def[4];var tx=x+vx+(lvy<0?width:0)-lx,ty=y+vy+(lvx>0?height:0)-ly;if(lvx*ty-lvy*tx>0){if(vx*-lvy+vy*lvx<0){return solid;}
var length=Math.sqrt(lvx*lvx+lvy*lvy);var nx=lvy/length,ny=-lvx/length;var proj=tx*nx+ty*ny;var px=nx*proj,py=ny*proj;if(px*px+py*py>=vx*vx+vy*vy){return solid||(lvx*(ty-vy)-lvy*(tx-vx)<0.5);}
res.pos.x=x+vx-px;res.pos.y=y+vy-py;res.collision.slope={x:lvx,y:lvy,nx:nx,ny:ny};return true;}
return false;}});var H=1/2,N=1/3,M=2/3,SOLID=true,NON_SOLID=false;ig.CollisionMap.defaultTileDef={5:[0,1,1,M,SOLID],6:[0,M,1,N,SOLID],7:[0,N,1,0,SOLID],3:[0,1,1,H,SOLID],4:[0,H,1,0,SOLID],2:[0,1,1,0,SOLID],10:[H,1,1,0,SOLID],21:[0,1,H,0,SOLID],32:[M,1,1,0,SOLID],43:[N,1,M,0,SOLID],54:[0,1,N,0,SOLID],27:[0,0,1,N,SOLID],28:[0,N,1,M,SOLID],29:[0,M,1,1,SOLID],25:[0,0,1,H,SOLID],26:[0,H,1,1,SOLID],24:[0,0,1,1,SOLID],11:[0,0,H,1,SOLID],22:[H,0,1,1,SOLID],33:[0,0,N,1,SOLID],44:[N,0,M,1,SOLID],55:[M,0,1,1,SOLID],16:[1,N,0,0,SOLID],17:[1,M,0,N,SOLID],18:[1,1,0,M,SOLID],14:[1,H,0,0,SOLID],15:[1,1,0,H,SOLID],13:[1,1,0,0,SOLID],8:[H,1,0,0,SOLID],19:[1,1,H,0,SOLID],30:[N,1,0,0,SOLID],41:[M,1,N,0,SOLID],52:[1,1,M,0,SOLID],38:[1,M,0,1,SOLID],39:[1,N,0,M,SOLID],40:[1,0,0,N,SOLID],36:[1,H,0,1,SOLID],37:[1,0,0,H,SOLID],35:[1,0,0,1,SOLID],9:[1,0,H,1,SOLID],20:[H,0,0,1,SOLID],31:[1,0,M,1,SOLID],42:[M,0,N,1,SOLID],53:[N,0,0,1,SOLID],12:[0,0,1,0,NON_SOLID],23:[1,1,0,1,NON_SOLID],34:[1,0,1,1,NON_SOLID],45:[0,1,0,0,NON_SOLID]};ig.CollisionMap.staticNoCollision={trace:function(x,y,vx,vy){return{collision:{x:false,y:false,slope:false},pos:{x:x+vx,y:y+vy},tile:{x:0,y:0}};}};});

// lib/impact/background-map.js
ig.baked=true;ig.module('impact.background-map').requires('impact.map','impact.image').defines(function(){"use strict";ig.BackgroundMap=ig.Map.extend({tiles:null,scroll:{x:0,y:0},distance:1,repeat:false,tilesetName:'',foreground:false,enabled:true,preRender:false,preRenderedChunks:null,chunkSize:512,debugChunks:false,anims:{},init:function(tilesize,data,tileset){this.parent(tilesize,data);this.setTileset(tileset);},setTileset:function(tileset){this.tilesetName=tileset instanceof ig.Image?tileset.path:tileset;this.tiles=new ig.Image(this.tilesetName);this.preRenderedChunks=null;},setScreenPos:function(x,y){this.scroll.x=x/this.distance;this.scroll.y=y/this.distance;},preRenderMapToChunks:function(){var totalWidth=this.width*this.tilesize*ig.system.scale,totalHeight=this.height*this.tilesize*ig.system.scale;this.chunkSize=Math.min(Math.max(totalWidth,totalHeight),this.chunkSize);var chunkCols=Math.ceil(totalWidth/this.chunkSize),chunkRows=Math.ceil(totalHeight/this.chunkSize);this.preRenderedChunks=[];for(var y=0;y<chunkRows;y++){this.preRenderedChunks[y]=[];for(var x=0;x<chunkCols;x++){var chunkWidth=(x==chunkCols-1)?totalWidth-x*this.chunkSize:this.chunkSize;var chunkHeight=(y==chunkRows-1)?totalHeight-y*this.chunkSize:this.chunkSize;this.preRenderedChunks[y][x]=this.preRenderChunk(x,y,chunkWidth,chunkHeight);}}},preRenderChunk:function(cx,cy,w,h){var tw=w/this.tilesize/ig.system.scale+1,th=h/this.tilesize/ig.system.scale+1;var nx=(cx*this.chunkSize/ig.system.scale)%this.tilesize,ny=(cy*this.chunkSize/ig.system.scale)%this.tilesize;var tx=Math.floor(cx*this.chunkSize/this.tilesize/ig.system.scale),ty=Math.floor(cy*this.chunkSize/this.tilesize/ig.system.scale);var chunk=ig.$new('canvas');chunk.width=w;chunk.height=h;chunk.retinaResolutionEnabled=false;var chunkContext=chunk.getContext('2d');ig.System.scaleMode(chunk,chunkContext);var screenContext=ig.system.context;ig.system.context=chunkContext;for(var x=0;x<tw;x++){for(var y=0;y<th;y++){if(x+tx<this.width&&y+ty<this.height){var tile=this.data[y+ty][x+tx];if(tile){this.tiles.drawTile(x*this.tilesize-nx,y*this.tilesize-ny,tile-1,this.tilesize);}}}}
ig.system.context=screenContext;return chunk;},draw:function(){if(!this.tiles.loaded||!this.enabled){return;}
if(this.preRender){this.drawPreRendered();}
else{this.drawTiled();}},drawPreRendered:function(){if(!this.preRenderedChunks){this.preRenderMapToChunks();}
var dx=ig.system.getDrawPos(this.scroll.x),dy=ig.system.getDrawPos(this.scroll.y);if(this.repeat){var w=this.width*this.tilesize*ig.system.scale;dx=(dx%w+w)%w;var h=this.height*this.tilesize*ig.system.scale;dy=(dy%h+h)%h;}
var minChunkX=Math.max(Math.floor(dx/this.chunkSize),0),minChunkY=Math.max(Math.floor(dy/this.chunkSize),0),maxChunkX=Math.ceil((dx+ig.system.realWidth)/this.chunkSize),maxChunkY=Math.ceil((dy+ig.system.realHeight)/this.chunkSize),maxRealChunkX=this.preRenderedChunks[0].length,maxRealChunkY=this.preRenderedChunks.length;if(!this.repeat){maxChunkX=Math.min(maxChunkX,maxRealChunkX);maxChunkY=Math.min(maxChunkY,maxRealChunkY);}
var nudgeY=0;for(var cy=minChunkY;cy<maxChunkY;cy++){var nudgeX=0;for(var cx=minChunkX;cx<maxChunkX;cx++){var chunk=this.preRenderedChunks[cy%maxRealChunkY][cx%maxRealChunkX];var x=-dx+cx*this.chunkSize-nudgeX;var y=-dy+cy*this.chunkSize-nudgeY;ig.system.context.drawImage(chunk,x,y);ig.Image.drawCount++;if(this.debugChunks){ig.system.context.strokeStyle='#f0f';ig.system.context.strokeRect(x,y,this.chunkSize,this.chunkSize);}
if(this.repeat&&chunk.width<this.chunkSize&&x+chunk.width<ig.system.realWidth){nudgeX+=this.chunkSize-chunk.width;maxChunkX++;}}
if(this.repeat&&chunk.height<this.chunkSize&&y+chunk.height<ig.system.realHeight){nudgeY+=this.chunkSize-chunk.height;maxChunkY++;}}},drawTiled:function(){var tile=0,anim=null,tileOffsetX=(this.scroll.x/this.tilesize).toInt(),tileOffsetY=(this.scroll.y/this.tilesize).toInt(),pxOffsetX=this.scroll.x%this.tilesize,pxOffsetY=this.scroll.y%this.tilesize,pxMinX=-pxOffsetX-this.tilesize,pxMinY=-pxOffsetY-this.tilesize,pxMaxX=ig.system.width+this.tilesize-pxOffsetX,pxMaxY=ig.system.height+this.tilesize-pxOffsetY;for(var mapY=-1,pxY=pxMinY;pxY<pxMaxY;mapY++,pxY+=this.tilesize){var tileY=mapY+tileOffsetY;if(tileY>=this.height||tileY<0){if(!this.repeat){continue;}
tileY=(tileY%this.height+this.height)%this.height;}
for(var mapX=-1,pxX=pxMinX;pxX<pxMaxX;mapX++,pxX+=this.tilesize){var tileX=mapX+tileOffsetX;if(tileX>=this.width||tileX<0){if(!this.repeat){continue;}
tileX=(tileX%this.width+this.width)%this.width;}
if((tile=this.data[tileY][tileX])){if((anim=this.anims[tile-1])){anim.draw(pxX,pxY);}
else{this.tiles.drawTile(pxX,pxY,tile-1,this.tilesize);}}}}}});});

// lib/impact/game.js
ig.baked=true;ig.module('impact.game').requires('impact.impact','impact.entity','impact.collision-map','impact.background-map').defines(function(){"use strict";ig.Game=ig.Class.extend({clearColor:'#000000',gravity:0,screen:{x:0,y:0},_rscreen:{x:0,y:0},entities:[],namedEntities:{},collisionMap:ig.CollisionMap.staticNoCollision,backgroundMaps:[],backgroundAnims:{},autoSort:false,sortBy:null,cellSize:64,_deferredKill:[],_levelToLoad:null,_doSortEntities:false,staticInstantiate:function(){this.sortBy=this.sortBy||ig.Game.SORT.Z_INDEX;ig.game=this;return null;},loadLevel:function(data){this.screen={x:0,y:0};this.entities=[];this.namedEntities={};for(var i=0;i<data.entities.length;i++){var ent=data.entities[i];this.spawnEntity(ent.type,ent.x,ent.y,ent.settings);}
this.sortEntities();this.collisionMap=ig.CollisionMap.staticNoCollision;this.backgroundMaps=[];for(var i=0;i<data.layer.length;i++){var ld=data.layer[i];if(ld.name=='collision'){this.collisionMap=new ig.CollisionMap(ld.tilesize,ld.data);}
else{var newMap=new ig.BackgroundMap(ld.tilesize,ld.data,ld.tilesetName);newMap.anims=this.backgroundAnims[ld.tilesetName]||{};newMap.repeat=ld.repeat;newMap.distance=ld.distance;newMap.foreground=!!ld.foreground;newMap.preRender=!!ld.preRender;newMap.name=ld.name;this.backgroundMaps.push(newMap);}}
for(var i=0;i<this.entities.length;i++){this.entities[i].ready();}},loadLevelDeferred:function(data){this._levelToLoad=data;},getMapByName:function(name){if(name=='collision'){return this.collisionMap;}
for(var i=0;i<this.backgroundMaps.length;i++){if(this.backgroundMaps[i].name==name){return this.backgroundMaps[i];}}
return null;},getEntityByName:function(name){return this.namedEntities[name];},getEntitiesByType:function(type){var entityClass=typeof(type)==='string'?ig.global[type]:type;var a=[];for(var i=0;i<this.entities.length;i++){var ent=this.entities[i];if(ent instanceof entityClass&&!ent._killed){a.push(ent);}}
return a;},spawnEntity:function(type,x,y,settings){var entityClass=typeof(type)==='string'?ig.global[type]:type;if(!entityClass){throw("Can't spawn entity of type "+type);}
var ent=new(entityClass)(x,y,settings||{});this.entities.push(ent);if(ent.name){this.namedEntities[ent.name]=ent;}
return ent;},sortEntities:function(){this.entities.sort(this.sortBy);},sortEntitiesDeferred:function(){this._doSortEntities=true;},removeEntity:function(ent){if(ent.name){delete this.namedEntities[ent.name];}
ent._killed=true;ent.type=ig.Entity.TYPE.NONE;ent.checkAgainst=ig.Entity.TYPE.NONE;ent.collides=ig.Entity.COLLIDES.NEVER;this._deferredKill.push(ent);},run:function(){this.update();this.draw();},update:function(){if(this._levelToLoad){this.loadLevel(this._levelToLoad);this._levelToLoad=null;}
this.updateEntities();this.checkEntities();for(var i=0;i<this._deferredKill.length;i++){this._deferredKill[i].erase();this.entities.erase(this._deferredKill[i]);}
this._deferredKill=[];if(this._doSortEntities||this.autoSort){this.sortEntities();this._doSortEntities=false;}
for(var tileset in this.backgroundAnims){var anims=this.backgroundAnims[tileset];for(var a in anims){anims[a].update();}}},updateEntities:function(){for(var i=0;i<this.entities.length;i++){var ent=this.entities[i];if(!ent._killed){ent.update();}}},draw:function(){if(this.clearColor){ig.system.clear(this.clearColor);}
this._rscreen.x=ig.system.getDrawPos(this.screen.x)/ig.system.scale;this._rscreen.y=ig.system.getDrawPos(this.screen.y)/ig.system.scale;var mapIndex;for(mapIndex=0;mapIndex<this.backgroundMaps.length;mapIndex++){var map=this.backgroundMaps[mapIndex];if(map.foreground){break;}
map.setScreenPos(this.screen.x,this.screen.y);map.draw();}
this.drawEntities();for(mapIndex;mapIndex<this.backgroundMaps.length;mapIndex++){var map=this.backgroundMaps[mapIndex];map.setScreenPos(this.screen.x,this.screen.y);map.draw();}},drawEntities:function(){for(var i=0;i<this.entities.length;i++){this.entities[i].draw();}},checkEntities:function(){var hash={};for(var e=0;e<this.entities.length;e++){var entity=this.entities[e];if(entity.type==ig.Entity.TYPE.NONE&&entity.checkAgainst==ig.Entity.TYPE.NONE&&entity.collides==ig.Entity.COLLIDES.NEVER){continue;}
var checked={},xmin=Math.floor(entity.pos.x/this.cellSize),ymin=Math.floor(entity.pos.y/this.cellSize),xmax=Math.floor((entity.pos.x+entity.size.x)/this.cellSize)+1,ymax=Math.floor((entity.pos.y+entity.size.y)/this.cellSize)+1;for(var x=xmin;x<xmax;x++){for(var y=ymin;y<ymax;y++){if(!hash[x]){hash[x]={};hash[x][y]=[entity];}
else if(!hash[x][y]){hash[x][y]=[entity];}
else{var cell=hash[x][y];for(var c=0;c<cell.length;c++){if(entity.touches(cell[c])&&!checked[cell[c].id]){checked[cell[c].id]=true;ig.Entity.checkPair(entity,cell[c]);}}
cell.push(entity);}}}}}});ig.Game.SORT={Z_INDEX:function(a,b){return a.zIndex-b.zIndex;},POS_X:function(a,b){return(a.pos.x+a.size.x)-(b.pos.x+b.size.x);},POS_Y:function(a,b){return(a.pos.y+a.size.y)-(b.pos.y+b.size.y);}};});

// lib/game/camera.js
ig.baked=true;ig.module('game.camera').defines(function(){Camera=ig.Class.extend({trap:{pos:{x:0,y:0},size:{x:16,y:16}},max:{x:0,y:0},offset:{x:0,y:0},pos:{x:0,y:0},damping:5,lookAhead:{x:0,y:0},currentLookAhead:{x:0,y:0},debug:false,init:function(offsetX,offsetY,damping){this.offset.x=offsetX;this.offset.y=offsetY;this.damping=damping;},set:function(entity){this.pos.x=entity.pos.x-this.offset.x;this.pos.y=entity.pos.y-this.offset.y;this.trap.pos.x=entity.pos.x-this.trap.size.x/2;this.trap.pos.y=entity.pos.y-this.trap.size.y;},follow:function(entity){this.pos.x=this.move('x',entity.pos.x,entity.size.x);this.pos.y=this.move('y',entity.pos.y,entity.size.y);ig.game.screen.x=this.pos.x;ig.game.screen.y=this.pos.y;},move:function(axis,pos,size){var lookAhead=0;if(pos<this.trap.pos[axis]){this.trap.pos[axis]=pos;this.currentLookAhead[axis]=this.lookAhead[axis];}else if(pos+size>this.trap.pos[axis]+this.trap.size[axis]){this.trap.pos[axis]=pos+size-this.trap.size[axis];this.currentLookAhead[axis]=-this.lookAhead[axis];}
return(this.pos[axis]-(this.pos[axis]-this.trap.pos[axis]+this.offset[axis]+this.currentLookAhead[axis])*ig.system.tick*this.damping).limit(0,this.max[axis]);},draw:function(){if(this.debug){ig.system.context.fillStyle='rgba(255,0,255,0.3)';ig.system.context.fillRect((this.trap.pos.x-this.pos.x)*ig.system.scale,(this.trap.pos.y-this.pos.y)*ig.system.scale,this.trap.size.x*ig.system.scale,this.trap.size.y*ig.system.scale);}}});});

// lib/game/entities/particle.js
ig.baked=true;ig.module('game.entities.particle').requires('impact.entity').defines(function(){EntityParticle=ig.Entity.extend({size:{x:4,y:4},offset:{x:0,y:0},maxVel:{x:160,y:160},minBounceVelocity:0,type:ig.Entity.TYPE.NONE,checkAgainst:ig.Entity.TYPE.NONE,collides:ig.Entity.COLLIDES.LITE,lifetime:5,fadetime:1,bounciness:0.6,friction:{x:20,y:0},init:function(x,y,settings){this.parent(x,y,settings);this.vel.x=(Math.random()*2-1)*this.vel.x;this.vel.y=(Math.random()*2-1)*this.vel.y;this.currentAnim.flip.x=(Math.random()>0.5);this.currentAnim.flip.y=(Math.random()>0.5);this.currentAnim.gotoRandomFrame();this.idleTimer=new ig.Timer();},update:function(){if(this.idleTimer.delta()>this.lifetime){this.kill();return;}
this.currentAnim.alpha=this.idleTimer.delta().map(this.lifetime-this.fadetime,this.lifetime,1,0);this.parent();}});});

// lib/game/entities/player.js





/*ig.baked=true;ig.module('game.entities.player').requires('impact.entity','game.entities.particle').defines(function(){EntityPlayer=ig.Entity.extend({MAX_WEAPONS:8,size:{x:8,y:14},offset:{x:4,y:2},maxVel:{x:60,y:240},accelDef:{ground:400,air:200},frictionDef:{ground:400,air:100},jump:120,bounciness:0,health:30,type:ig.Entity.TYPE.A,checkAgainst:ig.Entity.TYPE.NONE,collides:ig.Entity.COLLIDES.PASSIVE,flip:false,flippedAnimOffset:24,idle:false,moved:false,wasStanding:false,canHighJump:false,highJumpTimer:null,idleTimer:null,weaponsLeft:3,animSheet:null,init:function(x,y,settings){this.animSheet=new ig.AnimationSheet('media/sprites/player-red.png',16,16),this.friction.y=0;this.parent(x,y,settings);this.idleTimer=new ig.Timer();this.highJumpTimer=new ig.Timer();this.addAnim('idle',1,[0]);this.addAnim('scratch',0.3,[2,1,2,1,2],true);this.addAnim('shrug',0.3,[3,3,3,3,3,3,4,3,3],true);this.addAnim('run',0.07,[6,7,8,9,10,11]);this.addAnim('jump',1,[15]);this.addAnim('fall',0.4,[12,13]);this.addAnim('land',0.15,[14]);this.addAnim('die',0.07,[18,19,20,21,22,23,16,16,16]);this.addAnim('spawn',0.07,[16,16,16,23,22,21,20,19,18]);},update:function(){if(this.currentAnim==this.anims.spawn){this.currentAnim.update();if(this.currentAnim.loopCount){this.currentAnim=this.anims.idle.rewind();}else{return;}}
if(this.currentAnim==this.anims.die){this.currentAnim.update();if(this.currentAnim.loopCount){this.kill();}
return;}
this.moved=false;this.friction.x=this.standing?this.frictionDef.ground:this.frictionDef.air;if(ig.input.state('left')){this.accel.x=-(this.standing?this.accelDef.ground:this.accelDef.air);this.flip=true;this.moved=true;}else if(ig.input.state('right')){this.accel.x=(this.standing?this.accelDef.ground:this.accelDef.air);this.flip=false;this.moved=true;}else{this.accel.x=0;}
if(ig.input.pressed('shoot')){if(this.weaponsLeft>0){this.weaponsLeft--;ig.game.playerShoot();}}
this.wantsJump=this.wantsJump||ig.input.pressed('jump');if(this.standing&&(ig.input.pressed('jump')||(!this.wasStanding&&this.wantsJump&&ig.input.state('jump')))){ig.mark('jump');this.wantsJump=false;this.canHighJump=true;this.highJumpTimer.set(0.14);this.vel.y=-this.jump/4;}else if(this.canHighJump){var d=this.highJumpTimer.delta();if(ig.input.state('jump')){var f=Math.max(0,d>0?ig.system.tick-d:ig.system.tick);this.vel.y-=this.jump*f*6.5;}else{this.canHighJump=false;}
if(d>0){this.canHighJump=false;}}
this.wasStanding=this.standing;this.parent();this.setAnimation();},setAnimation:function(){if((!this.wasStanding&&this.standing)){this.currentAnim=this.anims.land.rewind();}else if(this.standing&&(this.currentAnim!=this.anims.land||this.currentAnim.loopCount>0)){if(this.moved){if(this.standing){this.currentAnim=this.anims.run;}
this.idle=false;}else{if(!this.idle||this.currentAnim.stop&&this.currentAnim.loopCount>0){this.idle=true;this.idleTimer.set(Math.random()*4+3);this.currentAnim=this.anims.idle;}
if(this.idleTimer.delta()>0){this.idleTimer.reset();this.currentAnim=[this.anims.scratch,this.anims.shrug].random().rewind();}}}else if(!this.standing){if(this.vel.y<0){this.currentAnim=this.anims.jump;}else{if(this.currentAnim!=this.anims.fall){this.anims.fall.rewind();}
this.currentAnim=this.anims.fall;}
this.idle=false;}
this.currentAnim.flip.x=this.flip;if(this.flip){this.currentAnim.tile+=this.flippedAnimOffset;}},collideWith:function(other,axis){if(axis=='y'&&this.standing&&this.currentAnim!=this.anims.die){this.currentAnim.update();this.setAnimation();}},receiveDamage:function(amount,from){this.health-=amount;if(this.health>0){return;}
if(from.userId){this.killerId=from.userId;}
if(this.currentAnim!=this.anims.die){this.currentAnim=this.anims.die.rewind();for(var i=0;i<3;i++){ig.game.spawnEntity(EntityPlayerGib,this.pos.x,this.pos.y);}
ig.game.spawnEntity(EntityPlayerGibGun,this.pos.x,this.pos.y);}},kill:function(){ig.game.playerDied(this.killerId);this.parent();},addWeapons:function(weaponsCount){this.weaponsLeft=Math.min(this.MAX_WEAPONS,this.weaponsLeft+weaponsCount);}});EntityPlayerGib=EntityParticle.extend({lifetime:0.8,fadetime:0.4,friction:{x:0,y:0},vel:{x:30,y:80},gravityFactor:0,animSheet:new ig.AnimationSheet('media/sprites/player-red.png',8,8),init:function(x,y,settings){this.addAnim('idle',7,[82,94]);this.parent(x,y,settings);},update:function(){this.parent();}});EntityPlayerGibGun=EntityParticle.extend({lifetime:2,fadetime:0.4,size:{x:8,y:8},friction:{x:30,y:0},vel:{x:60,y:50},animSheet:new ig.AnimationSheet('media/sprites/player-red.png',8,8),init:function(x,y,settings){this.addAnim('idle',0.5,[11]);this.parent(x,y,settings);this.currentAnim.flip.y=false;}});EntityProjectile=ig.Entity.extend({size:{x:6,y:3},offset:{x:1,y:2},maxVel:{x:200,y:0},gravityFactor:0,type:ig.Entity.TYPE.NONE,checkAgainst:ig.Entity.TYPE.B,collides:ig.Entity.COLLIDES.NEVER,flip:false,hasHit:false,animSheet:new ig.AnimationSheet('media/sprites/projectile.png',8,8),init:function(x,y,settings){this.parent(x,y,settings);this.vel.x=(settings.flip?-this.maxVel.x:this.maxVel.x);this.addAnim('idle',1,[0]);this.addAnim('hit',0.1,[0,1,2,3,4,5],true);},update:function(){if(this.hasHit&&this.currentAnim.loopCount>0){this.kill();}
this.parent();this.currentAnim.flip.x=this.flip;},handleMovementTrace:function(res){this.parent(res);if(res.collision.x||res.collision.y){this.currentAnim=this.anims.hit;this.hasHit=true;}},check:function(other){if(!this.hasHit){this.hasHit=true;this.currentAnim=this.anims.hit;this.vel.x=0;}}});EntityProjectileRemote=EntityProjectile.extend({checkAgainst:ig.Entity.TYPE.A,check:function(other){if(!this.hasHit){other.receiveDamage(10,this);this.hasHit=true;this.currentAnim=this.anims.hit;this.vel.x=0;}}});});
*/

// lib/game/entities/remote-player.js
ig.baked=true;ig.module('game.entities.remote-player').requires('impact.entity','game.entities.particle').defines(function(){EntityRemotePlayer=ig.Entity.extend({type:ig.Entity.TYPE.B,size:{x:8,y:14},offset:{x:4,y:2},stateUpdated:false,animSheet:new ig.AnimationSheet('media/sprites/player-blue.png',16,16),init:function(x,y,settings){this.parent(x,y,settings);this.addAnim('idle',1,[0]);this.addAnim('scratch',0.3,[2,1,2,1,2],true);this.addAnim('shrug',0.3,[3,3,3,3,3,3,4,3,3],true);this.addAnim('run',0.07,[6,7,8,9,10,11]);this.addAnim('jump',1,[15]);this.addAnim('fall',0.4,[12,13]);this.addAnim('land',0.15,[14]);this.addAnim('die',0.07,[18,19,20,21,22,23,16,16,16]);this.addAnim('spawn',0.07,[16,16,16,23,22,21,20,19,18]);},setState:function(state){var x=state.getX()/10;var y=state.getY()/10;this.dx=state.getVelX()/10;this.dy=state.getVelY()/10;this.pos={x:x,y:y};this.currentAnim=this.getAnimById(state.getAnim());this.currentAnim.frame=state.getFrame();this.currentAnim.flip.x=!!state.getFlip();this.stateUpdated=true;},update:function(){if(this.stateUpdated){this.stateUpdated=false;}else{this.pos.x+=this.dx;this.pos.y+=this.dy;if(this.currentAnim){this.currentAnim.update();}}},kill:function(){this.parent();}});});

// lib/game/entities/respawn-pod.js
ig.baked=true;ig.module('game.entities.respawn-pod').requires('impact.entity').defines(function(){EntityRespawnPod=ig.Entity.extend({size:{x:18,y:16},zIndex:-1,type:ig.Entity.TYPE.NONE,checkAgainst:ig.Entity.TYPE.NONE,collides:ig.Entity.COLLIDES.NEVER,animSheet:new ig.AnimationSheet('media/sprites/respawn-pod.png',18,16),init:function(x,y,settings){this.parent(x,y,settings);this.addAnim('idle',0.5,[0,1]);this.addAnim('activated',0.5,[2,3]);this.addAnim('respawn',0.1,[0,4]);},update:function(){if(this.currentAnim==this.anims.respawn&&this.currentAnim.loopCount>4){this.currentAnim=this.anims.activated;}
this.currentAnim.update();},getSpawnPos:function(){return{x:(this.pos.x+11),y:this.pos.y};},activate:function(){this.sound.play();this.active=true;this.currentAnim=this.anims.activated;ig.game.lastCheckpoint=this;},check:function(other){if(!this.active){this.activate();}}});});

// lib/game/entities/test-tube.js
ig.baked=true;ig.module('game.entities.test-tube').requires('impact.entity').defines(function(){EntityTestTube=ig.Entity.extend({size:{x:8,y:10},checkAgainst:ig.Entity.TYPE.A,animSheet:new ig.AnimationSheet('media/sprites/test-tube.png',8,10),init:function(x,y,settings){this.parent(x,y,settings);this.addAnim('idle',0.1,[0,0,0,1,2,3,0,0,0,2,0,0,1,0,0]);this.currentAnim.gotoRandomFrame();},check:function(other){ig.game.onPlayerCollectedWeapon(this);},update:function(){this.currentAnim.update();}});});

// lib/game/entities/acid.js
ig.baked=true;ig.module('game.entities.acid').requires('impact.entity').defines(function(){EntityAcid=ig.Entity.extend({damage:100,size:{x:8,y:8},checkAgainst:ig.Entity.TYPE.A,animSheet:new ig.AnimationSheet('media/sprites/acid.png',8,8),init:function(x,y,settings){this.parent(x,y,settings);this.addAnim('idle',0.1,[0,1,2,3,4,5,6,7]);this.currentAnim.gotoRandomFrame();},check:function(other){other.receiveDamage(this.damage,this);},update:function(){this.currentAnim.update();}});});

// lib/game/levels/main.js
ig.baked=true;ig.module('game.levels.main').requires('impact.image','game.entities.respawn-pod','game.entities.test-tube','game.entities.acid').defines(function(){LevelMain={"entities":[{"type":"EntityRespawnPod","x":24,"y":336},{"type":"EntityRespawnPod","x":460,"y":48},{"type":"EntityRespawnPod","x":420,"y":296},{"type":"EntityRespawnPod","x":12,"y":48},{"type":"EntityTestTube","x":248,"y":348,"settings":{"weaponId":10}},{"type":"EntityTestTube","x":68,"y":208,"settings":{"weaponId":6}},{"type":"EntityTestTube","x":496,"y":116,"settings":{"weaponId":5}},{"type":"EntityTestTube","x":68,"y":48,"settings":{"weaponId":1}},{"type":"EntityAcid","x":104,"y":160},{"type":"EntityAcid","x":120,"y":160},{"type":"EntityAcid","x":128,"y":160},{"type":"EntityAcid","x":152,"y":160},{"type":"EntityAcid","x":168,"y":160},{"type":"EntityAcid","x":240,"y":144},{"type":"EntityAcid","x":320,"y":144},{"type":"EntityAcid","x":336,"y":144},{"type":"EntityAcid","x":248,"y":144},{"type":"EntityAcid","x":264,"y":144},{"type":"EntityAcid","x":280,"y":144},{"type":"EntityAcid","x":296,"y":144},{"type":"EntityAcid","x":392,"y":368},{"type":"EntityAcid","x":408,"y":368},{"type":"EntityAcid","x":424,"y":368},{"type":"EntityAcid","x":352,"y":368},{"type":"EntityAcid","x":368,"y":368},{"type":"EntityAcid","x":304,"y":368},{"type":"EntityAcid","x":288,"y":368},{"type":"EntityAcid","x":232,"y":368},{"type":"EntityAcid","x":208,"y":368},{"type":"EntityAcid","x":192,"y":368},{"type":"EntityAcid","x":152,"y":368},{"type":"EntityAcid","x":136,"y":368},{"type":"EntityAcid","x":104,"y":368},{"type":"EntityAcid","x":128,"y":272},{"type":"EntityAcid","x":144,"y":272},{"type":"EntityAcid","x":272,"y":144},{"type":"EntityTestTube","x":264,"y":348,"settings":{"weaponId":12}},{"type":"EntityAcid","x":288,"y":144},{"type":"EntityAcid","x":136,"y":160},{"type":"EntityAcid","x":304,"y":144},{"type":"EntityTestTube","x":176,"y":300,"settings":{"weaponId":8}},{"type":"EntityAcid","x":400,"y":368},{"type":"EntityAcid","x":144,"y":160},{"type":"EntityAcid","x":416,"y":368},{"type":"EntityTestTube","x":180,"y":144,"settings":{"weaponId":3}},{"type":"EntityAcid","x":344,"y":368},{"type":"EntityAcid","x":160,"y":160},{"type":"EntityAcid","x":360,"y":368},{"type":"EntityTestTube","x":256,"y":40,"settings":{"weaponId":2}},{"type":"EntityAcid","x":312,"y":368},{"type":"EntityAcid","x":232,"y":144},{"type":"EntityAcid","x":296,"y":368},{"type":"EntityTestTube","x":344,"y":284,"settings":{"weaponId":9}},{"type":"EntityAcid","x":280,"y":368},{"type":"EntityAcid","x":312,"y":144},{"type":"EntityAcid","x":224,"y":372},{"type":"EntityTestTube","x":256,"y":348,"settings":{"weaponId":11}},{"type":"EntityAcid","x":200,"y":368},{"type":"EntityAcid","x":328,"y":144},{"type":"EntityAcid","x":160,"y":368},{"type":"EntityTestTube","x":280,"y":188,"settings":{"weaponId":7}},{"type":"EntityAcid","x":144,"y":368},{"type":"EntityAcid","x":344,"y":144},{"type":"EntityAcid","x":112,"y":368},{"type":"EntityTestTube","x":288,"y":100,"settings":{"weaponId":4}},{"type":"EntityAcid","x":96,"y":368},{"type":"EntityAcid","x":256,"y":144},{"type":"EntityAcid","x":112,"y":160},{"type":"EntityAcid","x":136,"y":272}],"layer":[{"name":"collision","width":64,"height":48,"linkWithCollision":false,"visible":0,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":8,"foreground":false,"data":[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],[1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1],[1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],[1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,1,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1],[1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,1],[1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]},{"name":"bg","width":30,"height":20,"linkWithCollision":false,"visible":0,"tilesetName":"media/tiles/biolab.png","repeat":true,"preRender":true,"distance":"3","tilesize":8,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,109,0,0,0,0,108,107,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,108,107,0,0,0,0,0,0,0,0,0,0,108,107,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,107,0,0,0,0,0,0,0,0,0,0,108,108,0,0,0],[0,0,0,0,108,107,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,108,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,107,0,0,0,0,0,0,0,0,0,0,108,107,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,108,0,0,0,0,0,107,107,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,108,0],[0,0,109,0,0,0,107,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,107,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,108,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,107,108,0,0,0,0,0,0,0,0,108,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,109,0,0,0,0,0,107,0,0,0,0,0,0,0,0,107,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,108,0,0,0,0,0,0,0,0,0,109,109,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,107,0,0,0,0,0,0,0,0,0,0,109,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,109,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"main","width":64,"height":48,"linkWithCollision":true,"visible":1,"tilesetName":"media/tiles/biolab.png","repeat":false,"preRender":false,"distance":"1","tilesize":8,"foreground":false,"data":[[17,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,6],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,19,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,19,19,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,13,14,15,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,19,19,19,6],[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,0,0,0,0,0,0,0,71,0,0,0,0,0,0,30,30,30,30,30,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,29,30,30,30,30,30,30,30,30,30,1],[1,48,0,0,0,0,0,0,0,0,0,0,0,0,46,47,0,0,0,0,0,29,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,31,0,0,0,0,0,0,0,47,46,0,0,0,0,0,46,47,47,1],[22,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[24,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[24,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,6],[24,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[24,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[24,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,29,30,30,30,30,31,0,0,0,0,43,0,0,0,0,0,44,0,0,0,0,29,30,30,30,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,46,52,34,56,34,47,0,0,0,0,46,0,0,0,0,0,47,0,0,0,0,0,35,55,35,46,0,0,0,0,0,0,0,0,0,0,0,0,0,23,1],[22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,44,44,43,0,0,0,0,0,52,34,56,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,55,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,46,45,0,0,0,0,0,52,34,56,34,70,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70,35,55,35,0,0,0,35,35,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,52,34,56,34,70,92,92,92,92,92,92,92,92,92,92,92,92,92,92,92,70,35,55,35,0,0,0,35,35,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,65,65,32,32,65,70,0,0,0,0,0,0,0,0,0,70,33,33,33,69,33,33,53,34,70,70,70,34,70,17,17,70,53,70,70,53,70,70,33,33,33,33,70,70,70,70,33,33,70,70,23,0,0,0,0,0,1],[1,0,0,0,0,0,23,70,60,60,63,63,59,62,89,89,89,89,89,89,89,62,59,60,60,60,60,60,78,98,98,77,77,77,77,77,77,98,77,77,77,98,77,77,77,98,77,77,77,77,77,98,77,77,77,77,77,23,23,0,0,0,0,1],[1,0,0,0,0,23,23,70,70,70,70,2,63,62,61,62,62,61,71,48,77,62,98,59,78,78,77,98,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6],[6,0,0,0,0,0,0,0,0,0,0,0,21,78,61,63,59,59,71,56,79,61,59,61,59,78,98,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[8,0,0,0,0,0,0,0,0,0,0,0,0,0,77,77,79,59,71,56,63,78,78,78,98,98,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,1],[24,6,0,0,0,0,0,0,0,0,0,0,0,0,0,21,79,77,71,56,63,98,77,77,98,0,0,0,0,0,0,0,0,29,30,30,30,31,0,0,0,0,0,0,0,0,5,21,21,5,21,21,5,21,21,5,5,0,0,0,0,0,0,1],[24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,0,71,59,77,0,0,0,0,0,0,0,0,0,0,0,0,0,36,35,36,47,0,0,0,0,0,0,0,0,21,68,65,68,70,55,71,52,53,70,21,0,0,0,0,0,0,1],[24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,35,2,0,0,0,0,0,0,0,0,2,21,2,2,2,2,55,71,52,53,70,21,2,0,0,0,0,0,1],[24,0,0,0,0,0,3,3,1,3,1,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,43,43,0,0,0,21,0,21,0,0,0,43,43,43,0,0,0,23,70,68,68,2,55,71,2,53,70,23,0,0,0,0,0,0,1],[24,23,0,0,0,0,0,3,0,46,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,46,0,46,0,0,0,2,35,2,0,0,0,46,0,46,0,0,0,0,23,70,70,2,55,71,2,53,2,0,0,0,0,0,0,2,1],[24,46,0,0,0,0,0,3,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,35,2,0,0,0,0,0,0,0,0,0,0,27,27,27,27,27,27,27,27,27,0,0,0,0,0,0,0,1],[24,0,0,0,0,0,0,1,0,0,0,24,31,0,0,0,0,0,0,0,0,2,21,2,0,0,0,0,0,0,0,0,0,29,21,35,2,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,1],[24,0,0,0,5,21,22,3,0,0,0,24,0,0,0,0,0,0,0,0,0,2,21,2,0,0,0,0,0,0,0,0,0,0,2,35,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,6],[6,0,0,0,0,3,22,3,0,0,0,24,0,0,0,0,0,0,0,0,0,2,35,2,0,0,0,0,0,0,0,0,0,0,18,35,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,21,22,1,0,0,0,22,44,42,42,44,0,0,0,3,2,2,2,2,0,0,0,0,21,2,21,4,4,21,5,35,21,21,4,21,4,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,1],[1,23,0,0,0,0,56,0,0,0,0,0,0,0,0,2,89,89,89,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,35,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,2,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,44,43,44,43,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,35,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,21,35,5,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1],[23,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,33,33,0,18,35,5,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,1],[1,0,0,0,0,0,0,0,21,21,2,2,21,33,2,1,2,1,1,33,1,1,1,2,2,2,2,2,2,2,2,33,33,33,33,33,33,33,33,2,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,46,0,0,46,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,47,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6],[23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,61,61,1,1,1,1],[5,63,63,55,63,20,2,2,6,5,0,0,0,0,0,6,0,0,0,0,0,0,21,0,0,0,0,56,0,0,0,20,20,20,0,0,0,0,0,0,0,21,0,0,0,0,0,20,1,0,0,0,0,0,0,4,58,58,58,58,58,58,5,1],[63,60,77,55,63,63,63,2,3,3,3,3,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,56,0,0,1,20,20,3,1,0,0,0,0,0,1,1,1,0,0,0,0,2,20,0,0,0,0,0,4,4,58,61,61,61,61,61,5,1],[63,77,77,55,78,63,63,63,79,77,79,77,78,79,78,79,78,78,79,78,78,78,79,79,79,78,78,56,78,2,2,2,2,2,2,2,78,79,79,78,79,78,79,78,78,79,78,79,78,78,78,79,78,78,63,63,63,63,61,77,77,63,63,63]]}]};LevelMainResources=[new ig.Image('media/tiles/biolab.png'),new ig.Image('media/tiles/biolab.png')];});

// lib/game/levels/main1.js
ig.baked=true;ig.module('game.levels.main1').requires('impact.image','game.entities.respawn-pod').defines(function(){LevelMain1={"entities":[{"type":"EntityRespawnPod","x":140,"y":112},{"type":"EntityRespawnPod","x":844,"y":96}],"layer":[{"name":"collision","width":128,"height":64,"linkWithCollision":false,"visible":0,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":8,"foreground":false,"data":[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1],[1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]},{"name":"main","width":128,"height":64,"linkWithCollision":true,"visible":1,"tilesetName":"media/tiles/biolab.png","repeat":false,"preRender":false,"distance":"1","tilesize":8,"foreground":false,"data":[[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,21],[21,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,21],[21,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,21],[21,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,21],[21,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,21],[21,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,21],[21,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,21],[21,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,21],[21,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,21],[21,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,21],[21,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,21],[21,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[21,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,1,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,87,87,87,87,87,87,1,1,5,5,5,5,5,5,5,5,1,1,1,5,5,1,1,5,1,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,1,24,1,5,1,59,59,19,59,59,58,58,58,62,62,62,62,62,62,62,62,59,59,62,59,59,59,59,59,59,59,59,59,19,57,57,57,59,59,59,62,59,59,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,1,5,59,59,59,59,59,19,58,58,58,59,59,62,59,62,58,62,58,58,62,59,59,59,59,59,59,78,59,59,59,78,57,19,57,57,62,57,62,62,59,59,59,78,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,1,4,78,78,78,59,59,59,59,59,59,59,59,59,59,59,62,59,59,62,59,62,62,62,62,78,59,59,59,63,59,59,59,59,59,62,59,59,59,59,59,59,78,78,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,40,4,0,0,78,78,78,78,62,78,78,78,78,78,78,78,78,0,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,63,63,63,63,63,63,63,63,78,78,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,1,1,40,4,0,0,0,0,0,78,78,78,78,0,0,0,78,78,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,78,78,78,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,21],[21,0,0,0,0,0,0,40,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,78,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,40,4,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,40,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,40,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,84,84,84,84,0,19,0,0,0,84,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,1,1,0,0,0,0,40,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,18,1,18,1,1,1,1,1,1,1,18,84,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,40,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,59,18,74,79,59,60,59,59,59,19,60,18,0,22,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,21],[21,0,0,0,0,0,0,40,4,0,0,0,0,0,0,0,0,0,0,0,0,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,0,0,0,0,0,0,5,59,74,59,74,74,60,74,74,74,74,19,74,74,60,74,22,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,40,4,0,0,0,0,0,0,0,0,0,0,0,0,1,76,76,76,76,76,76,76,76,76,76,76,76,76,76,76,76,76,76,76,76,76,76,76,76,1,0,0,0,0,0,0,5,59,74,74,60,79,79,59,59,59,60,19,74,59,60,74,1,5,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,40,4,0,0,0,0,0,0,0,0,0,0,0,0,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,0,0,0,0,0,0,5,59,74,74,60,60,59,59,60,60,60,19,60,59,60,79,74,5,59,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,4,4,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,5,59,74,74,59,60,60,60,60,59,79,19,60,79,79,79,74,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,1,1,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,74,74,74,74,74,74,74,74,74,74,60,19,79,79,79,74,74,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,21],[21,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,74,74,74,74,74,74,59,59,59,59,19,19,19,59,74,74,1,1,5,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,19,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,19,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,19,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,19,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,0,0,0,0,0,0,0,0,0,0,0,0,55,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,19,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[21,1,1,7,1,1,1,7,1,1,5,1,1,5,1,7,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,19,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,21],[21,75,75,57,75,57,59,57,60,57,59,57,75,55,71,75,57,57,75,5,89,89,89,89,89,89,89,1,1,1,1,89,89,89,89,89,89,1,89,89,89,89,89,89,89,1,1,1,89,89,89,89,89,89,89,89,1,89,89,89,89,1,19,1,89,89,89,89,89,1,89,89,89,89,89,89,89,89,89,89,89,1,89,89,89,89,89,89,89,89,89,1,89,89,89,89,89,89,89,89,1,89,89,89,89,89,89,89,89,89,1,89,89,89,89,89,89,89,89,89,89,89,89,89,89,89,89,21],[78,75,75,57,75,75,59,57,75,75,75,59,75,55,71,75,57,57,75,1,89,89,89,89,89,89,89,1,1,1,1,1,1,89,89,89,89,1,89,89,89,89,89,89,89,1,1,1,89,89,89,89,0,0,0,90,1,90,90,90,90,1,19,1,90,89,89,89,89,1,89,89,89,89,89,89,89,89,89,96,96,1,89,89,89,89,89,89,89,89,89,1,89,89,89,89,89,89,89,89,1,89,89,89,89,89,89,89,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21],[78,78,78,78,78,78,78,78,78,78,78,78,78,55,71,78,78,78,78,21,90,90,90,90,90,90,90,21,21,21,21,21,21,21,21,21,21,21,90,90,90,90,90,90,90,21,21,21,21,21,21,21,21,21,21,90,21,90,90,90,90,21,19,21,90,90,90,90,90,21,21,21,21,21,21,21,21,21,21,21,21,21,90,90,90,90,90,90,90,90,90,21,21,21,21,21,21,21,21,21,1,90,90,90,90,90,90,90,90,90,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21]]}]};LevelMain1Resources=[new ig.Image('media/tiles/biolab.png')];});

// lib/game/events.js
ig.baked=true;ig.module('game.events').defines(function(){EventEmitter=ig.Class.extend({lastToken:0,subscribers:null,init:function(){this.subscribers={};},destroy:function(){this.subscribers=null;},emit:function(event){var emitArgs=[].slice.call(arguments,1);for(var k in this.subscribers){scb=this.subscribers[k];if(scb.event===event){scb.subscriber.apply(scb.ctx,emitArgs);}}},on:function(event,subscriber,ctx){var token=++this.lastToken;this.subscribers[token]={event:event,subscriber:subscriber,ctx:ctx}
return token;},off:function(token){delete this.subscribers[token];}});Events={Emitter:EventEmitter,listen:function(){this._listen('addEventListener',arguments);},unlisten:function(){this._unlisten('removeEventListener',arguments);},on:function(){this._listen('on',arguments);},off:function(){this._unlisten('off',arguments);},_listen:function(method,argsObject){var args=[].slice.apply(argsObject);var object=args[0];var handlers=args[1];var context=args[2];var bindArgs=args.slice(2);for(var k in handlers){var bound=context[k+'_bound']=handlers[k].bind.apply(handlers[k],bindArgs);object[method](k,bound);}},_unlisten:function(method,args){var object=args[0];var handlers=args[1];var context=args[2];for(var k in handlers){object[method](k,context[k+'_bound']);}}};});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// lib/net/peer-connection.js
/*ig.baked=true;ig.module('net.peer-connection').requires('game.events').defines(function(){PeerConnection=Events.Emitter.extend({CHANNEL_NAME:'data',iceServers:[{url:'stun:stun.l.google.com:19302'},{url:'stun:stun.anyfirewall.com:3478'},{url:'turn:turn.bistri.com:80',credential:'homeo',username:'homeo'},{url:'turn:turn.anyfirewall.com:443?transport=tcp',credential:'webrtc',username:'webrtc'}],socket:null,isInitiator:false,dataChannelReady:false,peerConnection:null,dataChannel:null,remoteDescriptionReady:false,pendingCandidates:null,lastMessageOrd:null,init:function(socket,peerUser,isInitiator){this.parent();this.socket=socket;this.peerUser=peerUser;this.isInitiator=isInitiator;this.pendingCandidates=[];this.peerHandlers={'icecandidate':this.onLocalIceCandidate,'iceconnectionstatechange':this.onIceConnectionStateChanged,'datachannel':this.onDataChannel};this.dataChannelHandlers={'open':this.onDataChannelOpen,'close':this.onDataChannelClose,'message':this.onDataChannelMessage,}
this.connect();},destroy:function(){this.parent();this.closePeerConnection();},connect:function(){this.peerConnection=new RTCPeerConnection({iceServers:this.iceServers});Events.listen(this.peerConnection,this.peerHandlers,this);if(this.isInitiator){this.openDataChannel(this.peerConnection.createDataChannel(this.CHANNEL_NAME,{ordered:false}));}
if(this.isInitiator){this.setLocalDescriptionAndSend();}},closePeerConnection:function(){this.closeDataChannel();Events.unlisten(this.peerConnection,this.peerHandlers,this);if(this.peerConnection.signalingState!=='closed'){this.peerConnection.close();}},setSdp:function(sdp){var self=this;var rsd=new RTCSessionDescription(sdp);self.peerConnection.setRemoteDescription(rsd).then(function(){self.remoteDescriptionReady=true;self.log('Got SDP from remote peer','green');while(self.pendingCandidates.length){self.addRemoteCandidate(self.pendingCandidates.pop());}
if(!self.isInitiator){self.setLocalDescriptionAndSend();}});},setLocalDescriptionAndSend:function(){var self=this;self.getDescription().then(function(localDescription){self.peerConnection.setLocalDescription(localDescription).then(function(){self.log('Sending SDP','green');self.sendSdp(self.peerUser.userId,localDescription);});}).catch(function(error){self.log('onSdpError: '+error.message,'red');});},getDescription:function(){return this.isInitiator?this.peerConnection.createOffer():this.peerConnection.createAnswer();},addIceCandidate:function(candidate){if(this.remoteDescriptionReady){this.addRemoteCandidate(candidate);}else{this.pendingCandidates.push(candidate);}},addRemoteCandidate:function(candidate){try{this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));this.log('Added his ICE-candidate:'+candidate.candidate,'gray');}catch(err){this.log('Error adding remote ice candidate'+err.message,'red');}},onLocalIceCandidate:function(event){if(event.candidate){this.log('Send my ICE-candidate: '+event.candidate.candidate,'gray');this.sendIceCandidate(this.peerUser.userId,event.candidate);}else{this.log('No more candidates','gray');}},onIceConnectionStateChanged:function(event){this.log('Connection state: '+event.target.iceConnectionState,'green');},onDataChannel:function(event){if(!this.isInitiator){this.openDataChannel(event.channel);}},openDataChannel:function(channel){this.dataChannel=channel;Events.listen(this.dataChannel,this.dataChannelHandlers,this);},closeDataChannel:function(){Events.unlisten(this.dataChannel,this.dataChannelHandlers,this);this.dataChannel.close();},sendMessage:function(message){if(!this.dataChannelReady){return;}
this.dataChannel.send(message);},onDataChannelOpen:function(){this.dataChannelReady=true;this.emit('open');},onDataChannelMessage:function(event){this.emit('message',MessageBuilder.deserialize(event.data));},onDataChannelClose:function(){this.dataChannelReady=false;this.emit('closed');},sendSdp:function(userId,sdp){this.socket.emit('sdp',{userId:userId,sdp:sdp});},sendIceCandidate:function(userId,candidate){this.socket.emit('ice_candidate',{userId:userId,candidate:candidate});},log:function(message,color){console.log('%c[Peer-%d, %s] %s','color:'+color,this.peerUser.userId,this.peerConnection.signalingState,message);}});});
*/

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// lib/net/room-connection.js
/*ig.baked=true;ig.module('net.room-connection').requires('game.events','net.peer-connection').defines(function(){RoomConnection=Events.Emitter.extend({peers:null,socket:null,roomName:null,roomInfo:null,pendingSdp:null,pendidateCandidates:null,init:function(roomName,socket){this.parent();this.socket=socket;this.roomName=roomName;this.pendingSdp={};this.pendingCandidates={};this.socketHandlers={'sdp':this.onSdp,'ice_candidate':this.onIceCandidate,'room':this.onJoinedRoom,'user_join':this.onUserJoin,'user_ready':this.onUserReady,'user_leave':this.onUserLeave,'error':this.onError,};this.peerConnectionHandlers={'open':this.onPeerChannelOpen,'close':this.onPeerChannelClose,'message':this.onPeerMessage};Events.on(this.socket,this.socketHandlers,this);},destroy:function(){this.parent();Events.off(this.socket,this.socketHandlers,this);},connect:function(){this.sendJoin(this.roomName);console.log('giddyup!')},initPeerConnection:function(user,isInitiator){var cnt=new PeerConnection(this.socket,user,isInitiator);Events.on(cnt,this.peerConnectionHandlers,this,cnt,user);var userId=user.userId;var pendingSdp=this.pendingSdp[userId];if(pendingSdp){cnt.setSdp(pendingSdp);delete this.pendingSdp[userId];}
var pendingCandidates=this.pendingCandidates[userId];if(pendingCandidates){pendingCandidates.forEach(cnt.addIceCandidate,cnt);delete this.pendingCandidates[userId];}
return cnt;},onSdp:function(message){var userId=message.userId;if(!this.peers[userId]){this.log('Adding pending sdp from another player. id = '+userId,'gray');this.pendingSdp[userId]=message.sdp;return;}
this.peers[userId].setSdp(message.sdp);},onIceCandidate:function(message){var userId=message.userId;if(!this.peers[userId]){this.log('Adding pending candidate from another player. id ='+userId,'gray');if(!this.pendingCandidates[userId]){this.pendingCandidates[userId]=[];}
this.pendingCandidates[userId].push(message.candidate);return;}
this.peers[userId].addIceCandidate(message.candidate);},onJoinedRoom:function(roomInfo){this.emit('joined',roomInfo);this.roomInfo=roomInfo;this.peers={};for(var k in this.roomInfo.users){var user=this.roomInfo.users[k];if(user.userId!==this.roomInfo.userId){this.peers[user.userId]=this.initPeerConnection(this.roomInfo.users[k],true);}}},onError:function(error){this.log('Error connecting to room'+error.message,'red');},onUserJoin:function(user){this.log('Another player joined. id = '+user.userId,'orange');var peerConnection=this.initPeerConnection(user,false);this.roomInfo.users.push(user);this.peers[user.userId]=peerConnection},onUserReady:function(user){this.log('Another player ready. id = '+user.userId,'orange');this.emit('user_ready',user);},onPeerChannelOpen:function(peer,user){this.emit('peer_open',user,peer);},onPeerChannelClose:function(peer,user){this.emit('peer_close',user,peer);},onPeerMessage:function(peer,user,message){this.emit('peer_message',message,user,peer);},onUserLeave:function(goneUser){if(!this.peers[goneUser.userId]){return;}
var cnt=this.peers[goneUser.userId];Events.off(cnt,this.peerConnectionHandlers,this);cnt.destroy();delete this.peers[goneUser.userId];delete this.roomInfo.users[goneUser.userId];this.emit('user_leave',goneUser);},sendJoin:function(roomName){this.socket.emit('join',{roomName:roomName});},sendLeave:function(){this.socket.emit(MessageType.LEAVE);},broadcastMessage:function(message){this.broadcast(MessageBuilder.serialize(message));},sendMessageTo:function(userId,message){var peer=this.peers[userId];this.peerSend(peer,MessageBuilder.serialize(message));},broadcast:function(arrayBuffer){for(var p in this.peers){this.peerSend(this.peers[p],arrayBuffer);}},peerSend:function(peer,data){peer.sendMessage(data);},log:function(message,color,userId){console.log('%c%s','color:'+color,message);}});});
*/

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// lib/game/main.js
/*ig.baked=true;
ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.font',
    'game.camera',
    'game.entities.player',
    'game.entities.remote-player',
    'game.levels.main',
    'game.levels.main1',
    'game.events',
    'net.room-connection'
)
.defines(function(){
    
    var log=console.log.bind(console);
    var MESSAGE_STATE=0;
    var MESSAGE_SPAWN=1;
    var MESSAGE_DIED=2;
    var MESSAGE_SHOOT=3;
    var MESSAGE_COLLECT_WEAPON=4;
    var MESSAGE_FRAG_COUNT=5;
    var FIELD_ORD='ord';
    var FIELD_TYPE='type';
    var FIELD_X='x';
    var FIELD_Y='y';
    var FIELD_VEL_X='vel_x';
    var FIELD_VEL_Y='vel_y';
    var FIELD_ANIM='anim';
    var FIELD_FRAME='frame';
    var FIELD_FLIP='flip';
    var FIELD_WEAPON_ID='weapon_id';
    var FIELD_KILLER_ID='killer_id';
    var FIELD_FRAG_COUNT='frag_count';
    
MyGame=ig.Game.extend({
    WEAPON_RESPAWN_TIME:10,
    WEAPON_PER_TUBE:2,
    SHOW_MESSAGE_PERIOD:1.3,
    font:new ig.Font('media/04b03.font.png'),
    gravity:240,
    roomName:window.location.search,
    fragCount:0,
    connection:null,
    player:null,
    remotePlayers:{},
    spawnWeaponQueue:[],
    textMessage:'FIGHT!!!',
    textMessageTimer:0,
init:function(){
    console.log('game start');
    this.connection=gameRoom.roomConnection;
    this.connectionHandlers={
        'peer_message':this.onPeerMessage,
        'user_leave':this.onUserLeave
    };
    Events.on(this.connection,this.connectionHandlers,this);ig.input.bind(ig.KEY.LEFT_ARROW,'left');ig.input.bind(ig.KEY.RIGHT_ARROW,'right');ig.input.bind(ig.KEY.X,'jump');ig.input.bind(ig.KEY.C,'shoot');this.loadLevel(LevelMain);this.spawnPlayer();this.camera=new Camera(ig.system.width/4,ig.system.height/3,5);this.camera.trap.size.x=ig.system.width/10;this.camera.trap.size.y=ig.system.height/3;this.camera.lookAhead.x=ig.ua.mobile?ig.system.width/6:0;this.camera.max.x=this.collisionMap.width*this.collisionMap.tilesize-ig.system.width;this.camera.max.y=this.collisionMap.height*this.collisionMap.tilesize-ig.system.height;this.camera.set(this.player);},playerShoot:function(){var isFlip=this.player.flip;var x=this.player.pos.x+(isFlip?-3:5);var y=this.player.pos.y+6;ig.game.spawnEntity(EntityProjectile,x,y,{flip:isFlip});this.connection.broadcastMessage(MessageBuilder.createMessage(MESSAGE_SHOOT).setX(x).setY(y).setFlip(isFlip));},playerDied:function(killerId){var msg=MessageBuilder.createMessage(MESSAGE_DIED);if(killerId){msg.setKillerId(killerId);}
this.connection.broadcastMessage(msg);this.spawnPlayer();},spawnPlayer:function(){var spawnPos=this.getRandomSpawnPos();this.player=this.spawnEntity(EntityPlayer,spawnPos.x,spawnPos.y);},getRandomSpawnPos:function(){var pods=ig.game.getEntitiesByType(EntityRespawnPod);var pod=pods[0];return pod.getSpawnPos();},onUserLeave:function(user){var remotePlayer=this.remotePlayers[user.userId];if(remotePlayer){remotePlayer.kill();delete this.remotePlayers[user.userId];}},onPeerMessage:function(message,user,peer){var remotePlayer=this.remotePlayers[user.userId];if(!remotePlayer&&message.getType()===MESSAGE_STATE){log('%cCreated remote player for %d','color: blue;',user.userId);remotePlayer=this.spawnRemotePlayer(user,message.getX(),message.getY());}
switch(message.getType()){case MESSAGE_STATE:this.onPlayerState(remotePlayer,message);break;case MESSAGE_DIED:this.onPlayerDied(remotePlayer,message,user);break;case MESSAGE_SHOOT:this.onPlayerShoot(remotePlayer,message,user);break;case MESSAGE_COLLECT_WEAPON:this.onRemotePlayerCollectedWeapon(remotePlayer,message);break;case MESSAGE_FRAG_COUNT:this.onRemotePlayerFragCount(remotePlayer,message,user);break;}},spawnRemotePlayer:function(user,x,y){this.remotePlayers[user.userId]=this.spawnEntity(EntityRemotePlayer,x,y);return this.remotePlayers[user.userId];},onPlayerState:function(remotePlayer,message){remotePlayer.setState(message);},onPlayerDied:function(remotePlayer,message,user){if(message.getKillerId()===this.connection.roomInfo.userId){this.fragCount++;this.connection.broadcastMessage(MessageBuilder.createMessage(MESSAGE_FRAG_COUNT).setFragCount(this.fragCount));this.setTextMessage('Yeahh! '+this.fragCount+' frags!');}
if(remotePlayer){remotePlayer.kill();}
delete this.remotePlayers[user.userId];},onPlayerShoot:function(remotePlayer,message,user){ig.game.spawnEntity(EntityProjectileRemote,message.getX(),message.getY(),{flip:message.getFlip(),userId:user.userId});},onRemotePlayerCollectedWeapon:function(remotePlayer,message){this.onWeaponCollected(message.getWeaponId());},onRemotePlayerFragCount:function(remotePlayer,message,user){this.setTextMessage('Player '+user.userId+' has '+message.getFragCount()+' frags!!');},onPlayerCollectedWeapon:function(weapon){this.player.addWeapons(this.WEAPON_PER_TUBE);this.connection.broadcastMessage(MessageBuilder.createMessage(MESSAGE_COLLECT_WEAPON).setWeaponId(weapon.weaponId));this.onWeaponCollected(weapon.weaponId);},onWeaponCollected:function(weaponId){var weapon=ig.game.getEntitiesByType(EntityTestTube).find(function(weapon){return weapon.weaponId===weaponId;});if(weapon){weapon.kill();this.spawnWeaponQueue.push([weapon,ig.Timer.time]);}},spawnWeapons:function(){while(this.spawnWeaponQueue.length){var delta=ig.Timer.time-this.spawnWeaponQueue[0][1];if(delta<this.WEAPON_RESPAWN_TIME){break;}
var weapon=this.spawnWeaponQueue.pop()[0];ig.game.spawnEntity(EntityTestTube,weapon.pos.x,weapon.pos.y,{weaponId:weapon.weaponId});}},update:function(){this.camera.follow(this.player);this.parent();this.connection.broadcastMessage(MessageBuilder.createMessage(MESSAGE_STATE).setX(this.player.pos.x*10).setY(this.player.pos.y*10).setVelX((this.player.pos.x-this.player.last.x)*10).setVelY((this.player.pos.y-this.player.last.y)*10).setFrame(this.player.getAnimFrame()).setAnim(this.player.getAnimId()).setFlip(this.player.currentAnim.flip.x?1:0));this.updateText();this.spawnWeapons();},draw:function(){this.parent();this.camera.draw();this.drawText();},setTextMessage:function(message){this.textMessage=message;this.textMessageTimer=ig.Timer.time;},drawText:function(){if(this.textMessage){this.font.draw(this.textMessage,ig.system.width/2,8,ig.Font.ALIGN.CENTER);}},updateText:function(){if(!this.textMessage){return;}
if(ig.Timer.time-this.textMessageTimer>=this.SHOW_MESSAGE_PERIOD){this.textMessage='';}}});
GameRoom=ig.Class.extend({
    roomId:null,
    roomConnection:null,
    socket:null,
        
    init:function(socketUrl){
        this.roomId=window.location.search.slice(1);
        this.registerMessages();
        this.socket=io(socketUrl);
        this.roomConnection=new RoomConnection(this.roomId,this.socket);
        this.roomConnection.on('joined',this.onJoinedRoom,this);
        this.roomConnection.connect();
    },
    registerMessages:function(){
        MessageBuilder.registerMessageType(MESSAGE_STATE,[FIELD_TYPE,FIELD_X,FIELD_Y,FIELD_VEL_X,FIELD_VEL_Y,FIELD_FRAME,FIELD_ANIM,FIELD_FLIP]);
        MessageBuilder.registerMessageType(MESSAGE_DIED,[FIELD_TYPE,FIELD_KILLER_ID]);
        MessageBuilder.registerMessageType(MESSAGE_SHOOT,[FIELD_TYPE,FIELD_X,FIELD_Y,FIELD_FLIP]);
        MessageBuilder.registerMessageType(MESSAGE_COLLECT_WEAPON,[FIELD_TYPE,FIELD_WEAPON_ID]);
        MessageBuilder.registerMessageType(MESSAGE_FRAG_COUNT,[FIELD_TYPE,FIELD_FRAG_COUNT]);
    },
    onJoinedRoom:function(roomInfo){
        console.log('%cJoined room','color: green',roomInfo);
        ig.main('#canvas',MyGame,60,240,160,3);
    }
});
var gameRoom=new GameRoom('http://'+window.location.hostname+':8033');
});*/

ig.baked=true;
ig.module(
  'game.main'
)
.requires(
  'impact.game',
  'impact.font',

  'game.camera',
  'game.entities.player',
  'game.entities.remote-player',
  'game.levels.main',
  'game.levels.main1',
  'game.events',

  'net.room-connection'
)
.defines(function() {

var log = console.log.bind(console);

// Messages
var MESSAGE_STATE = 0;
var MESSAGE_DIED = 2;
var MESSAGE_SHOOT = 3;
var MESSAGE_COLLECT_WEAPON = 4;
var MESSAGE_FRAG_COUNT = 5;

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
var MESSAGE_PEER = 6;

// Fields
var FIELD_TYPE = 'type';
var FIELD_X = 'x';
var FIELD_Y = 'y';
var FIELD_VEL_X = 'vel_x';
var FIELD_VEL_Y = 'vel_y';
var FIELD_ANIM = 'anim';
var FIELD_FRAME = 'frame';
var FIELD_FLIP = 'flip';
var FIELD_WEAPON_ID = 'weapon_id';
var FIELD_KILLER_ID = 'killer_id';
var FIELD_FRAG_COUNT = 'frag_count';

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
var FIELD_MESSAGE = 'message';

MyGame = ig.Game.extend({

  WEAPON_RESPAWN_TIME: 10, //sec
  WEAPON_PER_TUBE: 2,

  SHOW_MESSAGE_PERIOD: 1.3,

  // Load a font
  font: new ig.Font('media/04b03.font.png'),

  gravity: 240,

  roomName: window.location.search,

  fragCount: 0,

  connection: null,

  player: null,
  remotePlayers: {},

  spawnWeaponQueue: [],

  textMessage: 'FIGHT!!!',
  textMessageTimer: 0,

  init: function() {
    
    window.game = this;
    //console.log('game create');
    
      
    this.connection = gameRoom.roomConnection;
    this.connectionHandlers = {
      'peer_message': this.onPeerMessage,
      'user_leave': this.onUserLeave
    };
    Events.on(this.connection, this.connectionHandlers, this);

    // input
    ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
    ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
    ig.input.bind(ig.KEY.X, 'jump');
    ig.input.bind(ig.KEY.C, 'shoot');
    ig.input.bind(ig.KEY.Q, 'message');
    this.loadLevel(LevelMain);

    // player
    this.spawnPlayer();

    // camera
    this.camera = new Camera(ig.system.width / 4,ig.system.height / 3,5);
    this.camera.trap.size.x = ig.system.width / 10;
    this.camera.trap.size.y = ig.system.height / 3;
    this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width / 6 : 0;
    this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
    this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
    this.camera.set(this.player);
  },

  playerShoot: function() {
    var isFlip = this.player.flip;
    var x = this.player.pos.x + (isFlip ? -3 : 5);
    var y = this.player.pos.y + 6;

    // Spawn an entity, and broadcast about it
    ig.game.spawnEntity(EntityProjectile, x, y, {
      flip: isFlip
    });
    this.connection.broadcastMessage(MessageBuilder.createMessage(MESSAGE_SHOOT)
      .setX(x)
      .setY(y)
      .setFlip(isFlip)
    );
  },
  
/////////////////////////////////////////////////////////////////////  
/////////////////////////////////////////////////////////////////////  
/////////////////////////////////////////////////////////////////////  
  /*sendMessage: function() {
    console.log('call sendMessage from game.main');
    var message = 'giddyup!';

    this.connection.broadcastMessage(MessageBuilder.createMessage(MESSAGE_PEER)
      .setMessage(message)
    );
  },*/
  sendMessage: function(message) {
    var msg = MessageBuilder.createMessage(MESSAGE_PEER);
    //msg.setMessage(message);
    msg.setMessage(message);
    console.log('MESSAGE');
    console.log(msg);
    this.connection.broadcastMessage(msg);
  },
  

  playerDied: function(killerId) {
    var msg = MessageBuilder.createMessage(MESSAGE_DIED);
    if (killerId) {
      msg.setKillerId(killerId);
    }
    this.connection.broadcastMessage(msg);
    this.spawnPlayer();
  },

  spawnPlayer: function() {
    var spawnPos = this.getRandomSpawnPos();
    this.player = this.spawnEntity(EntityPlayer, spawnPos.x, spawnPos.y);
  },

  getRandomSpawnPos: function() {
    var pods = ig.game.getEntitiesByType(EntityRespawnPod);
    var pod = pods[0/*Number.random(0, pods.length - 1)*/];
    return pod.getSpawnPos();
  },

  onUserLeave: function(user) {
    var remotePlayer = this.remotePlayers[user.userId];
    if (remotePlayer) {
      remotePlayer.kill();
      delete this.remotePlayers[user.userId];
    }
  },

  onPeerMessage: function(message, user, peer) {
    var remotePlayer = this.remotePlayers[user.userId];
    if (!remotePlayer && message.getType() === MESSAGE_STATE) {
      log('%cCreated remote player for %d', 'color: blue;', user.userId);
      remotePlayer = this.spawnRemotePlayer(user, message.getX(), message.getY());
    }
    switch (message.getType()) {
      case MESSAGE_STATE:
        this.onPlayerState(remotePlayer, message);
        break;

      case MESSAGE_DIED:
        this.onPlayerDied(remotePlayer, message, user);
        console.log('died detected');
        break;

      case MESSAGE_SHOOT:
        this.onPlayerShoot(remotePlayer, message, user);
        console.log('MESSAGE SHOOT');
        console.log(message);
        break;

      case MESSAGE_COLLECT_WEAPON:
        this.onRemotePlayerCollectedWeapon(remotePlayer, message);
        break;

      case MESSAGE_FRAG_COUNT:
        this.onRemotePlayerFragCount(remotePlayer, message, user);
        break;
        
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
      case MESSAGE_PEER:
        //this.onRemotePlayerFragCount(remotePlayer, message, user);
        console.log('Получено сообщение');
        console.log('remotePlayer');
        console.log(remotePlayer);
        console.log('message');
        console.log(message);
        console.log('user');
        console.log(user);
        break;
        
    }
  },

  spawnRemotePlayer: function(user, x, y) {
    this.remotePlayers[user.userId] =
      this.spawnEntity(EntityRemotePlayer, x, y);
    return this.remotePlayers[user.userId];
  },

  onPlayerState: function(remotePlayer, message) {
    remotePlayer.setState(message);
  },

  onPlayerDied: function(remotePlayer, message, user) {
    if (message.getKillerId() === this.connection.roomInfo.userId) {
      this.fragCount++;
      this.connection.broadcastMessage(MessageBuilder.createMessage(MESSAGE_FRAG_COUNT)
        .setFragCount(this.fragCount)
      );
      this.setTextMessage('Yeahh! ' + this.fragCount + ' frags!');
    }
    if (remotePlayer) {
      remotePlayer.kill();
    }
    delete this.remotePlayers[user.userId];
  },

  onPlayerShoot: function(remotePlayer, message, user) {
    ig.game.spawnEntity(EntityProjectileRemote, message.getX(), message.getY(), {
      flip: message.getFlip(),
      userId: user.userId
    });
  },

  onRemotePlayerCollectedWeapon: function(remotePlayer, message) {
    this.onWeaponCollected(message.getWeaponId());
  },

  onRemotePlayerFragCount: function(remotePlayer, message, user) {
    this.setTextMessage('Player ' + user.userId + ' has ' + message.getFragCount() + ' frags!!');
  },

  onPlayerCollectedWeapon: function(weapon) {
    this.player.addWeapons(this.WEAPON_PER_TUBE);
    this.connection.broadcastMessage(MessageBuilder.createMessage(MESSAGE_COLLECT_WEAPON)
      .setWeaponId(weapon.weaponId)
    );
    this.onWeaponCollected(weapon.weaponId);
  },

  onWeaponCollected: function(weaponId) {
    var weapon = ig.game.getEntitiesByType(EntityTestTube).find(function(weapon) {
      return weapon.weaponId === weaponId;
    });
    if (weapon) {
      weapon.kill();
      this.spawnWeaponQueue.push([weapon, ig.Timer.time]);
    }
  },

  spawnWeapons: function() {
    while (this.spawnWeaponQueue.length) {
      var delta = ig.Timer.time - this.spawnWeaponQueue[0][1];
      if (delta < this.WEAPON_RESPAWN_TIME) {
        break;
      }
      var weapon = this.spawnWeaponQueue.pop()[0];
      ig.game.spawnEntity(EntityTestTube, weapon.pos.x, weapon.pos.y, {
        weaponId: weapon.weaponId
      });
    }
  },

  /*update: function() {
    this.camera.follow(this.player);
    // Update all entities and backgroundMaps
    this.parent();

    // Broadcast state
    this.connection.broadcastMessage(MessageBuilder.createMessage(MESSAGE_STATE)
      .setX(this.player.pos.x * 10)
      .setY(this.player.pos.y * 10)
      .setVelX((this.player.pos.x - this.player.last.x) * 10)
      .setVelY((this.player.pos.y - this.player.last.y) * 10)
      .setFrame(this.player.getAnimFrame())
      .setAnim(this.player.getAnimId())
      .setFlip(this.player.currentAnim.flip.x ? 1 : 0));

    this.updateText();
    this.spawnWeapons();
  },*/

  draw: function() {
    // Draw all entities and backgroundMaps
    this.parent();
    this.camera.draw();
    this.drawText();
  },

  setTextMessage: function(message) {
    this.textMessage = message;
    this.textMessageTimer = ig.Timer.time;
  },

  drawText: function() {
    if (this.textMessage) {
      this.font.draw(this.textMessage, ig.system.width / 2, 8, ig.Font.ALIGN.CENTER);
    }
  },

  updateText: function() {
    if (!this.textMessage) {
      return;
    }
    if (ig.Timer.time - this.textMessageTimer >= this.SHOW_MESSAGE_PERIOD) {
      this.textMessage = '';
    }
  }
});

GameRoom = ig.Class.extend({
  roomId: null,
  roomConnection: null,
  socket: null,

  init: function(socketUrl) {
    console.log('Debug: GameRoom has been loaded');
    this.roomId = window.location.search.slice(1);
    this.roomId = 1;
    //this.registerMessages();
    this.socket = io(socketUrl);
    this.roomConnection = new RoomConnection(this.roomId, this.socket);
    this.roomConnection.on('joined', this.onJoinedRoom, this);
    this.roomConnection.connect();
  },

  /*registerMessages: function() {
    MessageBuilder.registerMessageType(MESSAGE_STATE, [
      FIELD_TYPE,
      FIELD_X,
      FIELD_Y,
      FIELD_VEL_X,
      FIELD_VEL_Y,
      FIELD_FRAME,
      FIELD_ANIM,
      FIELD_FLIP
    ]);
    MessageBuilder.registerMessageType(MESSAGE_DIED, [
      FIELD_TYPE,
      FIELD_KILLER_ID
    ]);
    MessageBuilder.registerMessageType(MESSAGE_SHOOT, [
      FIELD_TYPE,
      FIELD_X,
      FIELD_Y,
      FIELD_FLIP
    ]);
    MessageBuilder.registerMessageType(MESSAGE_COLLECT_WEAPON, [
      FIELD_TYPE,
      FIELD_WEAPON_ID
    ]);
    MessageBuilder.registerMessageType(MESSAGE_FRAG_COUNT, [
      FIELD_TYPE,
      FIELD_FRAG_COUNT
    ]);
    
    
//////////////////////////////////////    
//////////////////////////////////////    
//////////////////////////////////////    
    MessageBuilder.registerMessageType(MESSAGE_PEER, [
      FIELD_TYPE,
      FIELD_MESSAGE
    ]);
  },*/

  onJoinedRoom: function(roomInfo) {
    console.log('%cJoined room', 'color: green', roomInfo);
    //ig.main('#canvas', MyGame, 60, 240, 160, 3);
  }
});
//var gameRoom = new GameRoom('http://' + window.location.hostname + ':8033');
//var gameRoom = new GameRoom('http://' + window.location.hostname + ':3000');

//var gameRoom = new GameRoom('https://' + window.location.hostname); // Herokuapp
//var gameRoom = new GameRoom('http://' + window.location.hostname + ':3000'); // Local client + local server
var gameRoom = new GameRoom('https://fakeproject.herokuapp.com'); // Local client + remote server

});
