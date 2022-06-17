(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter2_07_atlas_1", frames: [[0,1082,821,662],[823,1082,746,653],[0,1746,1914,266],[0,0,1920,1080]]},
		{name:"LessonChapter2_07_atlas_2", frames: [[1064,1256,163,120],[1273,1391,163,120],[1596,1557,134,50],[554,1421,132,102],[418,1421,134,130],[0,1241,417,147],[1425,134,471,238],[1679,1234,366,147],[1425,374,471,238],[287,998,295,147],[0,376,471,238],[419,1249,434,84],[0,134,473,240],[419,1335,434,84],[475,134,473,240],[1243,1234,434,155],[950,134,473,240],[1511,924,285,308],[1898,107,77,245],[1967,1383,77,244],[0,931,285,308],[1898,354,77,245],[1438,1391,77,244],[639,980,298,267],[956,946,285,308],[1888,1383,77,245],[1517,1391,77,244],[986,1552,193,36],[1181,1552,193,36],[0,616,317,313],[1511,614,330,308],[639,686,315,292],[473,376,357,308],[326,1553,193,36],[0,1564,193,36],[319,686,318,310],[832,376,357,308],[521,1576,193,36],[716,1579,193,36],[1191,614,318,330],[195,1564,122,50],[956,686,175,145],[1191,376,202,144],[1732,1579,115,48],[1843,760,175,145],[1843,614,199,144],[319,616,130,64],[1781,0,207,105],[986,1498,190,37],[956,833,207,105],[1191,522,190,68],[1798,924,207,105],[1596,1490,161,65],[1243,946,207,105],[1178,1513,190,37],[1798,1031,207,105],[1243,1160,184,65],[1243,1053,207,105],[1798,1138,190,68],[855,1256,207,105],[0,1497,161,65],[855,1363,207,105],[554,1537,190,37],[1679,1383,207,105],[688,1470,184,65],[0,1390,207,105],[287,1147,190,68],[209,1390,207,105],[163,1497,161,65],[1064,1391,207,105],[0,0,1779,132],[1759,1490,91,87],[479,1147,91,88],[874,1470,110,107]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_2286 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2285 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2284 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2283 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2282 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2281 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2280 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2279 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2278 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2277 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2276 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2275 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2274 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2273 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2272 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2271 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2270 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2269 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2268 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2267 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2266 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2265 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2264 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2263 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2262 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2261 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2260 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2259 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2258 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2257 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2256 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2255 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2254 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2253 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2252 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2251 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2250 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2249 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2248 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2247 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2246 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2245 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2244 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2243 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2242 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2241 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2240 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2239 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2238 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2237 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2236 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2235 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2234 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2233 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2232 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2231 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2230 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2229 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2228 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2227 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2226 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2225 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2224 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2223 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2222 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2221 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2220 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(64);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2219 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(65);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2218 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(66);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2217 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(67);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2216 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(68);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2215 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(69);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2214 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(70);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2213 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(71);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(72);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter2_07_atlas_2"]);
	this.gotoAndStop(73);
}).prototype = p = new cjs.Sprite();



(lib.Chap2Scene4 = function() {
	this.initialize(ss["LessonChapter2_07_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.replay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.instance = new lib.CachedBmp_2285();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2286();
	this.instance_1.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_2 = new lib.Path();
	this.instance_2.setTransform(-55,-72);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55,-72,110,107);


(lib.home_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.instance = new lib.CachedBmp_2282();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_2284();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_2283();
	this.instance_2.setTransform(-33.05,-28.15,0.4875,0.4875);

	this.instance_3 = new lib.CompoundPath();
	this.instance_3.setTransform(-159.75,-154.3,3.5004,3.5004);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-159.7,-154.3,318.5,304.6);


(lib.effect_fight = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.CachedBmp_2280();
	this.instance.setTransform(-181.35,-167.3,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2281();
	this.instance_1.setTransform(-213.3,-178.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},9).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-213.3,-178.5,410.5,337.7);


(lib.ch1_uLeg_rcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BAA087").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape.setTransform(1.6972,4.4729,0.5589,0.5588);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BAA087").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_1.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.1,-55.7,35.6,120.4);


(lib.ch1_uLeg_lcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BAA087").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape.setTransform(-1.2028,53.0729,0.5589,0.5588);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BAA087").s().p("AgxIsQgYAAgSgSQgTgVgCghQgDhWgCl2QgClQABiQQABghAXgaIACgCQAkgpA8ADQA9ACAjArQAWAdgEAjIgzHhIgxHGQgDAhgUASQgSAQgXAAIgDAAg");
	this.shape_1.setTransform(-0.8,6,1,1,0,0,0,-0.1,-42.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-7.1,35.6,120.39999999999999);


(lib.ch1_uBodycopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.CachedBmp_2267();
	this.instance.setTransform(-68.4,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-83.6,142.5,154);


(lib.ch1_uArm_rcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBC49D").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
	this.shape.setTransform(33,0,1,1,0,0,0,33,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_uArm_lcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBC49D").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
	this.shape.setTransform(-33.4,0,1,1,0,0,0,-33.4,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_thumb_rcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C6253").s().p("Ai1DWQgYgSAXgnQAKgSA1hAQAyg6ARgkQAcg3gTgqQgTgtAigiQAdggA2gHQA4gIAnAZQAtAcgBA8QAAA/gnBNQgmBMg6A7Qg8A/g9AUQgaAIgXAAQgmAAgggXg");
	this.shape.setTransform(5.35,-8.55,0.5738,0.5738,0,0,0,9.3,-14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.2,-13.6,22.4,27.2);


(lib.ch1_thumb_lcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C6253").s().p("AiVDaQgtgcABg8QABg/AnhNQAlhLA6g8QA9g/A8gUQBEgWAzAlQAYASgWAnQgLATg1A/QgxA7gSAkQgbA3ASAqQAUAsgiAjQgeAfg2AHQgOACgMAAQgoAAgdgTg");
	this.shape.setTransform(-5.45,8.55,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-13.6,22.299999999999997,27.2);


(lib.ch1_neckcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#19D1AE").s().p("AhWD/QgjgkAAgzIAAlPQAAgzAjgkQAkgjAyAAQAzAAAjAjQAkAkAAAzIAAFPQAAAzgkAkQgjAjgzAAQgyAAgkgjg");
	this.shape.setTransform(-0.05,10.05,0.5738,0.5738,0,0,0,-0.1,17.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-16.6,14,33.3);


(lib.ch1_lLeg_rcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.CachedBmp_2266();
	this.instance.setTransform(-19.45,-61.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-61.7,38.5,122.5);


(lib.ch1_lLeg_lcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_2265();
	this.instance.setTransform(-19.15,-60.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.1,-60.8,38.5,122);


(lib.ch1_lBodycopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBC49D").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
	this.shape.setTransform(0.4,19.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.9,-12.1,98.6,63.1);


(lib.ch1_lArm_rcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBC49D").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-7.5,96.6,15);


(lib.ch1_lArm_lcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EBC49D").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
	this.shape.setTransform(0.05,0.0188);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-7.4,96.6,14.9);


(lib.ch1_headcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#1D1D1B").ss(5).p("AoqFlQiZjRgRjFQgTjlCrivQCdiiE3hpQBsglB+AIIAeADQBVADByAtQBAAZB4A0QAtAdAeAcQAdAbAJAUIACADQAPAjgCAZQgDAagVASQBRBigBB3QgBBDgoBKQggA6g2A7QgBABgQADACwkfQAHgSghgeQgggdgzgWQg4gYgzgDQg9gDgrAcQhlBEgaBwQgFAVgHA8QgGApgJAQQgGAKgZAlQgbApgTApQgIATgHASQhIC/BBDUACwkfQAlgLAhgGQBzgiCDgVQA8gJAlgNQAngMATgRACwkfIAAAAIgCAFQgrA3gaA0QgfBBgXBdQAOAcAdAWQBIA5CqABQBrABB7gUIAFgBIABAAIALgCQgGAOgJAOIgGAIIgHAXQgIAegGAiQgVBvADB0QAECGhSBNQg8A5hYANQgOAChtATQhWAPg7AGQAXgSAUgVIAPgRQB/AaAIgLQAEgGgQgSQgZgbgSgTQhMhRglhOQg6h4APiEQARiNAXhgAmDISQhXgpguhAQgWghgMgjIAHgOQABgDABgBQAUgrAkg/QA8hnA2hHAmDISQAQAtAUAoQAZA0AaAjQAxAnBeAIQBMAHBugOAmHIFIAEANAmHIFIgGgSIABAFQACAHADAGg");
	this.shape.setTransform(3.5811,1.449);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BAA087").s().p("AidLtQhegIgxgnQgagjgZg0QgUgogQgtIgEgNIgGgSIABAFQACAHADAGIAEANQhXgpguhAQgWghgMgjIAHgOIACgEQAUgrAkg/QA8hnA2hHIgPAlQgmBlAABqQAABgAfBkQgfhkAAhgQAAhqAmhlIAPglQATgpAbgpIAfgvQAJgQAGgpQAHg8AFgVQAahwBlhEIACgBQAmgYA0AAIAAAAIAAAAIAGAAIAAAAIAGAAQAzADA4AYQAzAWAgAdQAbAZAAARIgBAGIAAAAIgCAFQgrA3gaA0QgfBBgXBdQAOAcAdAWQBIA5CqABIAKAAIAAAAIAAAAQBkAABxgSIAHgBIAFgBIABAAIALgCQgGAOgJAOIgGAIIgHAXQgIAegGAiQgVBvADB0QAECGhSBNQg8A5hYANIh7AVQhWAPg7AGQAXgSAUgVIAPgRIBAAMIAGABIALACIABAAIAEABIADAAIAAAAIABAAIACAAIABAAIACABIAAAAIAEAAIACAAIABAAIACABIABAAIADAAIABAAIACAAIACAAIADABIAEAAIAAAAQAMAAACgDIABgBIAAgDQAAgGgMgPIgrguQhMhRglhOQguheAAhlQAAgcADgdQARiNAXhgQgXBggRCNQgDAdAAAcQAABlAuBeQAlBOBMBRIArAuQAMAPAAAGIAAADIgBABQgCADgMAAIAAAAIgEAAIgDgBIgCAAIgCAAIgBAAIgDAAIgBAAIgCgBIgBAAIgCAAIgEAAIAAAAIgCgBIgBAAIgCAAIgBAAIAAAAIgDAAIgEgBIgBAAIgLgCIgGgBIhAgMIgPARQgUAVgXASQhIAJg6AAQgeAAgagCgAoqFlQiZjRgRjFQgTjlCrivQCdiiE3hpQBsglB+AIIAeADQBVADByAtQBAAZB4A0QAtAdAeAcQAdAbAJAUIACADQAPAjgCAZQgDAagVASQBRBigBB3QgBBDgoBKQggA6g2A7IgRAEIgLACIgBAAIgFABIgHABQhxAShkAAIAAAAIAAAAIgKAAQiqgBhIg5QgdgWgOgcQAXhdAfhBQAag0Arg3IACgFIAAAAQAlgLAhgGQBzgiCDgVQA8gJAlgNQAngMATgRQgTARgnAMQglANg8AJQiDAVhzAiQghAGglALIABgGQAAgRgbgZQgggdgzgWQg4gYgzgDIgGAAIAAAAIgGAAIAAAAIAAAAQg0AAgmAYIgCABQhlBEgaBwQgFAVgHA8QgGApgJAQIgfAvQgbApgTApQg2BHg8BnQgkA/gUArIgCAEIgHAOIAAAAgACwkfIAAAAg");
	this.shape_1.setTransform(3.5811,1.4151);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.4,-81.1,159.5,165.7);


(lib.ch1_hand_rcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C6253").s().p("AlRC5QgZgUAAg+QgBg6AUhDQAVhGAiguQAmgzAqgCIB5gGQBZgDBDAEQDFAMA4BNQBwCYi/AkQg5ALhsAEQhsAEgWAEQgjAHguAWQgbANgyAcQgyAZgiAAQgaAAgRgOg");
	this.shape.setTransform(14.8,-0.3,0.5738,0.5738,0,0,0,25.8,-0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.7,22.9);


(lib.ch1_hand_lcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C6253").s().p("AhDDGQjGgMg4hNQhviYC+glQA5gLBsgDQBsgEAWgEQAjgHAvgXQAagNAygbQBXgsAoAgQAZAVAAA9QABA6gUBDQgVBHghAuQgmAzgrACQitAFhFAAIgiAAg");
	this.shape.setTransform(-15.05,0.3,0.5738,0.5738,0,0,0,-26.2,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.6,22.8);


(lib.ch1_uLeg_rcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FBF6E0").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape.setTransform(2.3972,4.4729,0.5589,0.5588);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FBF6E0").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_1.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.4,-55.7,35.6,120.4);


(lib.ch1_uLeg_lcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FBF6E0").s().p("AgxIsQgYAAgSgSQgTgVgCghQgDhWgCl2QgClQABiQQABghAXgaIACgCQAkgpA8ADQA9ACAjArQAWAdgEAjIgzHhIgxHGQgDAhgUASQgSAQgXAAIgDAAg");
	this.shape.setTransform(-0.8,6,1,1,0,0,0,-0.1,-42.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FBF6E0").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape_1.setTransform(-1.8528,53.0729,0.5589,0.5588);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.6,-7.1,35.6,120.39999999999999);


(lib.ch1_uBodycopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.CachedBmp_2264();
	this.instance.setTransform(-68.4,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-83.6,142.5,154);


(lib.ch1_uArm_rcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3C2B2").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
	this.shape.setTransform(33,0,1,1,0,0,0,33,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_uArm_lcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3C2B2").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
	this.shape.setTransform(-33.4,0,1,1,0,0,0,-33.4,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_thumb_rcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C6253").s().p("Ai1DWQgYgSAXgnQAKgSA1hAQAyg6ARgkQAcg3gTgqQgTgtAigiQAdggA2gHQA4gIAnAZQAtAcgBA8QAAA/gnBNQgmBMg6A7Qg8A/g9AUQgaAIgXAAQgmAAgggXg");
	this.shape.setTransform(5.35,-8.55,0.5738,0.5738,0,0,0,9.3,-14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.2,-13.6,22.4,27.2);


(lib.ch1_thumb_lcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C6253").s().p("AiVDaQgtgcABg8QABg/AnhNQAlhLA6g8QA9g/A8gUQBEgWAzAlQAYASgWAnQgLATg1A/QgxA7gSAkQgbA3ASAqQAUAsgiAjQgeAfg2AHQgOACgMAAQgoAAgdgTg");
	this.shape.setTransform(-5.45,8.55,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-13.6,22.299999999999997,27.2);


(lib.ch1_neckcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#19D1AE").s().p("AhWD/QgjgkAAgzIAAlPQAAgzAjgkQAkgjAyAAQAzAAAjAjQAkAkAAAzIAAFPQAAAzgkAkQgjAjgzAAQgyAAgkgjg");
	this.shape.setTransform(-0.05,10.05,0.5738,0.5738,0,0,0,-0.1,17.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-16.6,14,33.3);


(lib.ch1_lLeg_rcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.CachedBmp_2263();
	this.instance.setTransform(-19.1,-61.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.1,-61.7,38.5,122.5);


(lib.ch1_lLeg_lcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_2262();
	this.instance.setTransform(-19.15,-60.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.1,-60.8,38.5,122);


(lib.ch1_lBodycopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3C2B2").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
	this.shape.setTransform(0.4,19.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.9,-12.1,98.6,63.1);


(lib.ch1_lArm_rcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3C2B2").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-7.5,96.6,15);


(lib.ch1_lArm_lcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3C2B2").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
	this.shape.setTransform(0.05,0.0188);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-7.4,96.6,14.9);


(lib.ch1_headcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.CachedBmp_2261();
	this.instance.setTransform(-70.2,-72.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.2,-72.5,149,133.5);


(lib.ch1_hand_rcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C6253").s().p("AlRC5QgZgUAAg+QgBg6AUhDQAVhGAiguQAmgzAqgCIB5gGQBZgDBDAEQDFAMA4BNQBwCYi/AkQg5ALhsAEQhsAEgWAEQgjAHguAWQgbANgyAcQgyAZgiAAQgaAAgRgOg");
	this.shape.setTransform(14.8,-0.3,0.5738,0.5738,0,0,0,25.8,-0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.7,22.9);


(lib.ch1_hand_lcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7C6253").s().p("AhDDGQjGgMg4hNQhviYC+glQA5gLBsgDQBsgEAWgEQAjgHAvgXQAagNAygbQBXgsAoAgQAZAVAAA9QABA6gUBDQgVBHghAuQgmAzgrACQitAFhFAAIgiAAg");
	this.shape.setTransform(-15.05,0.3,0.5738,0.5738,0,0,0,-26.2,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.6,22.8);


(lib.ch1_uLeg_rcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D3C2B2").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape_2.setTransform(1.4118,4.5254,0.5593,0.5593);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D3C2B2").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_3.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-55.7,35.599999999999994,120.5);


(lib.ch1_uLeg_lcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D3C2B2").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape_2.setTransform(-2.1882,53.1254,0.5593,0.5593);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-7.1,35.6,120.5);


(lib.ch1_uBodycopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_2260();
	this.instance_1.setTransform(-68.4,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-83.6,142.5,154);


(lib.ch1_uArm_rcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FBF6E0").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
	this.shape_1.setTransform(33,0,1,1,0,0,0,33,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_uArm_lcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FBF6E0").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
	this.shape_1.setTransform(-33.4,0,1,1,0,0,0,-33.4,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_thumb_rcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("Ai1DWQgYgSAXgnQAKgSA1hAQAyg6ARgkQAcg3gTgqQgTgtAigiQAdggA2gHQA4gIAnAZQAtAcgBA8QAAA/gnBNQgmBMg6A7Qg8A/g9AUQgaAIgXAAQgmAAgggXg");
	this.shape_1.setTransform(5.35,-8.55,0.5738,0.5738,0,0,0,9.3,-14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.2,-13.6,22.4,27.2);


(lib.ch1_thumb_lcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("AiVDaQgtgcABg8QABg/AnhNQAlhLA6g8QA9g/A8gUQBEgWAzAlQAYASgWAnQgLATg1A/QgxA7gSAkQgbA3ASAqQAUAsgiAjQgeAfg2AHQgOACgMAAQgoAAgdgTg");
	this.shape_1.setTransform(-5.45,8.55,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-13.6,22.299999999999997,27.2);


(lib.ch1_neckcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#19D1AE").s().p("AhWD/QgjgkAAgzIAAlPQAAgzAjgkQAkgjAyAAQAzAAAjAjQAkAkAAAzIAAFPQAAAzgkAkQgjAjgzAAQgyAAgkgjg");
	this.shape_1.setTransform(-0.05,10.05,0.5738,0.5738,0,0,0,-0.1,17.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-16.6,14,33.3);


(lib.ch1_lLeg_rcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_2259();
	this.instance_1.setTransform(-19.45,-61.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-61.7,38.5,122.5);


(lib.ch1_lLeg_lcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_2258();
	this.instance_1.setTransform(-19.4,-60.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-60.8,38.5,122);


(lib.ch1_lBodycopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FBF6E0").s().p("Aj6IgQlcgekVg8QAgk8gMl8QgHi/gNh/QGuAMGxATQNhAmASAkQAFAKAAArQAABtggE6QgWDdgaDUQj8BrmrAAQipAAjGgRg");
	this.shape_1.setTransform(0.409,19.4371,0.563,0.563);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#66FFCC").s().p("AkJKjQjcg/iKhzQh4hkgmkXQggjwAoiyQAxjcDvh2QDZhsEfAOQEhAODSCBQDnCOAlDlQAXCUgeCmQgfCjhKCNQhOCShtBXQh1BdiFAGQgoACgoAAQjcAAjKg7g");
	this.shape_2.setTransform(-0.05,-19.1,0.5738,0.5738,0,0,0,0,-33.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.9,-42.1,98.6,93.1);


(lib.ch1_lArm_rcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_2257();
	this.instance.setTransform(-48.3,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-8.9,96.5,18);


(lib.ch1_lArm_lcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_2256();
	this.instance.setTransform(-48.25,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-8.9,96.5,18);


(lib.ch1_headcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.CachedBmp_2255();
	this.instance.setTransform(-71.35,-78.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.3,-78.6,158.5,156.5);


(lib.ch1_hand_rcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("AlRC5QgZgUAAg+QgBg6AUhDQAVhGAiguQAmgzAqgCIB5gGQBZgDBDAEQDFAMA4BNQBwCYi/AkQg5ALhsAEQhsAEgWAEQgjAHguAWQgbANgyAcQgyAZgiAAQgaAAgRgOg");
	this.shape_1.setTransform(14.8,-0.3,0.5738,0.5738,0,0,0,25.8,-0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.7,22.9);


(lib.ch1_hand_lcopy2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("AhDDGQjGgMg4hNQhviYC+glQA5gLBsgDQBsgEAWgEQAjgHAvgXQAagNAygbQBXgsAoAgQAZAVAAA9QABA6gUBDQgVBHghAuQgmAzgrACQitAFhFAAIgiAAg");
	this.shape_1.setTransform(-15.05,0.3,0.5738,0.5738,0,0,0,-26.2,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.6,22.8);


(lib.ch1_uLeg_rcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5C4734").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_4.setTransform(1.4087,4.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D3C2B2").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_5.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-55.7,35.599999999999994,120.5);


(lib.ch1_uLeg_lcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#5C4734").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_3.setTransform(-2.1913,53.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-7.1,35.6,120.5);


(lib.ch1_uBodycopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance_2 = new lib.CachedBmp_2254();
	this.instance_2.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,165,154);


(lib.ch1_uArm_rcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453526").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
	this.shape_2.setTransform(33,0,1,1,0,0,0,33,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_uArm_lcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#453526").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
	this.shape_2.setTransform(-33.4,0,1,1,0,0,0,-33.4,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_thumb_rcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7C6253").s().p("Ai1DWQgYgSAXgnQAKgSA1hAQAyg6ARgkQAcg3gTgqQgTgtAigiQAdggA2gHQA4gIAnAZQAtAcgBA8QAAA/gnBNQgmBMg6A7Qg8A/g9AUQgaAIgXAAQgmAAgggXg");
	this.shape_2.setTransform(5.35,-8.55,0.5738,0.5738,0,0,0,9.3,-14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.2,-13.6,22.4,27.2);


(lib.ch1_thumb_lcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7C6253").s().p("AiVDaQgtgcABg8QABg/AnhNQAlhLA6g8QA9g/A8gUQBEgWAzAlQAYASgWAnQgLATg1A/QgxA7gSAkQgbA3ASAqQAUAsgiAjQgeAfg2AHQgOACgMAAQgoAAgdgTg");
	this.shape_2.setTransform(-5.45,8.55,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-13.6,22.299999999999997,27.2);


(lib.ch1_neckcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#19D1AE").s().p("AhWD/QgjgkAAgzIAAlPQAAgzAjgkQAkgjAyAAQAzAAAjAjQAkAkAAAzIAAFPQAAAzgkAkQgjAjgzAAQgyAAgkgjg");
	this.shape_2.setTransform(-0.05,10.05,0.5738,0.5738,0,0,0,-0.1,17.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-16.6,14,33.3);


(lib.ch1_lLeg_rcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5C4734").s().p("AhDF9QgUAAgYgRQgZgTgTgdQglg5AAhCQAAgTADgTQAWiOAah0QAhiTAcg0QARgeAhgWQAigXAlgCQBegGAiB3QAFARAACZQAACfAMA9QAGAjABAhQgBA/gZA2QgQAhgVAUQgWATgTAAg");
	this.shape.setTransform(-0.1786,-23.6143);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D2318").s().p("AATF2IgEgBQgTAAgJgMQgLgNAAgdQAAikgjjRQgsjhgRheIDCAAIgIKVQA+AdgIAeQgDAMgOAHQgOAIgTAAg");
	this.shape_1.setTransform(1.0158,23.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-61.7,38.5,122.7);


(lib.ch1_lLeg_lcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5C4734").s().p("AhCF9QgVAAgXgRQgZgTgUgdQgvhJANhYQAWiOAah0QAhiTAdg0QAQgeAhgWQAjgXAlgCQBdgGAiB3QAFARAACZQABCfALA9QAUBognBRQgPAhgWAUQgVATgUAAg");
	this.shape.setTransform(-0.174,-22.7143);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D2318").s().p("AAPFzQgTgBgJgLQgLgNAAgdQAAijgjjPQgsjggRhdIDCAAIgHKQQA9AdgHAdQgDAMgOAHQgOAIgTAAg");
	this.shape_1.setTransform(1.186,23.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-60.8,38.5,121.8);


(lib.ch1_lBodycopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#453526").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
	this.shape_3.setTransform(0.4,19.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.9,-12.1,98.6,63.1);


(lib.ch1_lArm_rcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#453526").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_1.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-7.5,96.6,15);


(lib.ch1_lArm_lcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#453526").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
	this.shape_1.setTransform(0.05,0.0188);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-7.4,96.6,14.9);


(lib.ch1_headcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_2253();
	this.instance_1.setTransform(-78.4,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.4,-67.4,157.5,146);


(lib.ch1_hand_rcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7C6253").s().p("AlRC5QgZgUAAg+QgBg6AUhDQAVhGAiguQAmgzAqgCIB5gGQBZgDBDAEQDFAMA4BNQBwCYi/AkQg5ALhsAEQhsAEgWAEQgjAHguAWQgbANgyAcQgyAZgiAAQgaAAgRgOg");
	this.shape_2.setTransform(14.8,-0.3,0.5738,0.5738,0,0,0,25.8,-0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.7,22.9);


(lib.ch1_hand_lcopy2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7C6253").s().p("AhDDGQjGgMg4hNQhviYC+glQA5gLBsgDQBsgEAWgEQAjgHAvgXQAagNAygbQBXgsAoAgQAZAVAAA9QABA6gUBDQgVBHghAuQgmAzgrACQitAFhFAAIgiAAg");
	this.shape_2.setTransform(-15.05,0.3,0.5738,0.5738,0,0,0,-26.2,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.6,22.8);


(lib.ch1_uLeg_rcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#4F1006").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_6.setTransform(1.4087,4.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#D3C2B2").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_7.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-55.7,35.599999999999994,120.5);


(lib.ch1_uLeg_lcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#4F1006").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_4.setTransform(-2.1913,53.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-7.1,35.6,120.5);


(lib.ch1_uBodycopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance_3 = new lib.CachedBmp_2252();
	this.instance_3.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,178.5,154);


(lib.ch1_uArm_rcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3D0C01").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
	this.shape_3.setTransform(33,0,1,1,0,0,0,33,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_uArm_lcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3D0C01").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
	this.shape_3.setTransform(-33.4,0,1,1,0,0,0,-33.4,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_thumb_rcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7C6253").s().p("Ai1DWQgYgSAXgnQAKgSA1hAQAyg6ARgkQAcg3gTgqQgTgtAigiQAdggA2gHQA4gIAnAZQAtAcgBA8QAAA/gnBNQgmBMg6A7Qg8A/g9AUQgaAIgXAAQgmAAgggXg");
	this.shape_3.setTransform(5.35,-8.55,0.5738,0.5738,0,0,0,9.3,-14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.2,-13.6,22.4,27.2);


(lib.ch1_thumb_lcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7C6253").s().p("AiVDaQgtgcABg8QABg/AnhNQAlhLA6g8QA9g/A8gUQBEgWAzAlQAYASgWAnQgLATg1A/QgxA7gSAkQgbA3ASAqQAUAsgiAjQgeAfg2AHQgOACgMAAQgoAAgdgTg");
	this.shape_3.setTransform(-5.45,8.55,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-13.6,22.299999999999997,27.2);


(lib.ch1_neckcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#19D1AE").s().p("AhWD/QgjgkAAgzIAAlPQAAgzAjgkQAkgjAyAAQAzAAAjAjQAkAkAAAzIAAFPQAAAzgkAkQgjAjgzAAQgyAAgkgjg");
	this.shape_3.setTransform(-0.05,10.05,0.5738,0.5738,0,0,0,-0.1,17.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-16.6,14,33.3);


(lib.ch1_lLeg_rcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4F1006").s().p("AhDF9QgUAAgYgRQgZgTgTgdQglg5AAhCQAAgTADgTQAWiOAah0QAhiTAcg0QARgeAhgWQAigXAlgCQBegGAiB3QAFARAACZQAACfAMA9QAGAjABAhQgBA/gZA2QgQAhgVAUQgWATgTAAg");
	this.shape_2.setTransform(-0.1786,-23.6143);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1B1810").s().p("AATF2IgEgBQgTAAgJgMQgLgNAAgdQAAikgjjRQgsjhgRheIDCAAIgIKVQA+AdgIAeQgDAMgOAHQgOAIgTAAg");
	this.shape_3.setTransform(1.0158,23.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-61.7,38.5,122.7);


(lib.ch1_lLeg_lcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4F1006").s().p("AhCF9QgVAAgXgRQgZgTgUgdQgvhJANhYQAWiOAah0QAhiTAdg0QAQgeAhgWQAjgXAlgCQBdgGAiB3QAFARAACZQABCfALA9QAUBognBRQgPAhgWAUQgVATgUAAg");
	this.shape_2.setTransform(-0.174,-22.7143);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1B1810").s().p("AAPFzQgTgBgJgLQgLgNAAgdQAAijgjjPQgsjggRhdIDCAAIgHKQQA9AdgHAdQgDAMgOAHQgOAIgTAAg");
	this.shape_3.setTransform(1.186,23.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-60.8,38.5,121.8);


(lib.ch1_lBodycopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3D0C01").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
	this.shape_4.setTransform(0.4,19.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.9,-12.1,98.6,63.1);


(lib.ch1_lArm_rcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance_1 = new lib.CachedBmp_2251();
	this.instance_1.setTransform(-48.3,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-8.9,96.5,18);


(lib.ch1_lArm_lcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance_1 = new lib.CachedBmp_2250();
	this.instance_1.setTransform(-48.25,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-8.9,96.5,18);


(lib.ch1_headcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance_2 = new lib.CachedBmp_2249();
	this.instance_2.setTransform(-73.85,-69.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.8,-69.6,159,155);


(lib.ch1_hand_rcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7C6253").s().p("AlRC5QgZgUAAg+QgBg6AUhDQAVhGAiguQAmgzAqgCIB5gGQBZgDBDAEQDFAMA4BNQBwCYi/AkQg5ALhsAEQhsAEgWAEQgjAHguAWQgbANgyAcQgyAZgiAAQgaAAgRgOg");
	this.shape_3.setTransform(14.8,-0.3,0.5738,0.5738,0,0,0,25.8,-0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.7,22.9);


(lib.ch1_hand_lcopy2_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7C6253").s().p("AhDDGQjGgMg4hNQhviYC+glQA5gLBsgDQBsgEAWgEQAjgHAvgXQAagNAygbQBXgsAoAgQAZAVAAA9QABA6gUBDQgVBHghAuQgmAzgrACQitAFhFAAIgiAAg");
	this.shape_3.setTransform(-15.05,0.3,0.5738,0.5738,0,0,0,-26.2,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.6,22.8);


(lib.ch1_uLeg_rcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00563E").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_2.setTransform(1.4087,4.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D3C2B2").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_3.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-55.7,35.599999999999994,120.5);


(lib.ch1_uLeg_lcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00563E").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_2.setTransform(-2.1913,53.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-7.1,35.6,120.5);


(lib.ch1_uBodycopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_2248();
	this.instance_1.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,178.5,154);


(lib.ch1_uArm_rcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#013221").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
	this.shape_1.setTransform(33,0,1,1,0,0,0,33,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_uArm_lcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#013221").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
	this.shape_1.setTransform(-33.4,0,1,1,0,0,0,-33.4,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_thumb_rcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("Ai1DWQgYgSAXgnQAKgSA1hAQAyg6ARgkQAcg3gTgqQgTgtAigiQAdggA2gHQA4gIAnAZQAtAcgBA8QAAA/gnBNQgmBMg6A7Qg8A/g9AUQgaAIgXAAQgmAAgggXg");
	this.shape_1.setTransform(5.35,-8.55,0.5738,0.5738,0,0,0,9.3,-14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.2,-13.6,22.4,27.2);


(lib.ch1_thumb_lcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("AiVDaQgtgcABg8QABg/AnhNQAlhLA6g8QA9g/A8gUQBEgWAzAlQAYASgWAnQgLATg1A/QgxA7gSAkQgbA3ASAqQAUAsgiAjQgeAfg2AHQgOACgMAAQgoAAgdgTg");
	this.shape_1.setTransform(-5.45,8.55,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-13.6,22.299999999999997,27.2);


(lib.ch1_neckcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#19D1AE").s().p("AhWD/QgjgkAAgzIAAlPQAAgzAjgkQAkgjAyAAQAzAAAjAjQAkAkAAAzIAAFPQAAAzgkAkQgjAjgzAAQgyAAgkgjg");
	this.shape_1.setTransform(-0.05,10.05,0.5738,0.5738,0,0,0,-0.1,17.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,-16.6,14,33.3);


(lib.ch1_lLeg_rcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00563E").s().p("AhDF9QgUAAgYgRQgZgTgTgdQglg5AAhCQAAgTADgTQAWiOAah0QAhiTAcg0QARgeAhgWQAigXAlgCQBegGAiB3QAFARAACZQAACfAMA9QAGAjABAhQgBA/gZA2QgQAhgVAUQgWATgTAAg");
	this.shape.setTransform(-0.1786,-23.6143);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1810").s().p("AATF2IgEgBQgTAAgJgMQgLgNAAgdQAAikgjjRQgsjhgRheIDCAAIgIKVQA+AdgIAeQgDAMgOAHQgOAIgTAAg");
	this.shape_1.setTransform(1.0158,23.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-61.7,38.5,122.7);


(lib.ch1_lLeg_lcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00563E").s().p("AhCF9QgVAAgXgRQgZgTgUgdQgvhJANhYQAWiOAah0QAhiTAdg0QAQgeAhgWQAjgXAlgCQBdgGAiB3QAFARAACZQABCfALA9QAUBognBRQgPAhgWAUQgVATgUAAg");
	this.shape.setTransform(-0.174,-22.7143);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1810").s().p("AAPFzQgTgBgJgLQgLgNAAgdQAAijgjjPQgsjggRhdIDCAAIgHKQQA9AdgHAdQgDAMgOAHQgOAIgTAAg");
	this.shape_1.setTransform(1.186,23.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-60.8,38.5,121.8);


(lib.ch1_lBodycopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#013221").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
	this.shape_1.setTransform(0.4,19.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.9,-12.1,98.6,63.1);


(lib.ch1_lArm_rcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_2247();
	this.instance.setTransform(-48.3,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-8.9,96.5,18);


(lib.ch1_lArm_lcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_2246();
	this.instance.setTransform(-48.25,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-8.9,96.5,18);


(lib.ch1_headcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_2245();
	this.instance_1.setTransform(-76.25,-80.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.2,-80.2,159,165);


(lib.ch1_hand_rcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("AlRC5QgZgUAAg+QgBg6AUhDQAVhGAiguQAmgzAqgCIB5gGQBZgDBDAEQDFAMA4BNQBwCYi/AkQg5ALhsAEQhsAEgWAEQgjAHguAWQgbANgyAcQgyAZgiAAQgaAAgRgOg");
	this.shape_1.setTransform(14.8,-0.3,0.5738,0.5738,0,0,0,25.8,-0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.7,22.9);


(lib.ch1_hand_lcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("AhDDGQjGgMg4hNQhviYC+glQA5gLBsgDQBsgEAWgEQAjgHAvgXQAagNAygbQBXgsAoAgQAZAVAAA9QABA6gUBDQgVBHghAuQgmAzgrACQitAFhFAAIgiAAg");
	this.shape_1.setTransform(-15.05,0.3,0.5738,0.5738,0,0,0,-26.2,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.6,22.8);


(lib.btn_prev = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.instance = new lib.CachedBmp_2242();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2244();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2243();
	this.instance_2.setTransform(-43.45,-36.05,0.5,0.5);

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(-214.75,-207.05,4.7385,4.7385);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


(lib.btn_next = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.instance = new lib.CachedBmp_2239();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2241();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2240();
	this.instance_2.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(216.45,-207.05,4.7384,4.7384,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


(lib.CharacterGood_04 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Character
	this.instance = new lib.CachedBmp_2279();
	this.instance.setTransform(-105.15,-346.15,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2278();
	this.instance_1.setTransform(-118.55,-369,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(42));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_2.setTransform(-55.75,-21.7,0.9982,0.9982,-98.6228,0,0,37.9,-0.1);

	this.instance_3 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_3.setTransform(-51.65,147.3,0.9981,0.9981,0,99.7345,-80.2655,6.3,-1.4);

	this.instance_4 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_4.setTransform(-51.75,138.35,0.9983,0.9983,0,99.6328,-80.3672,5.3,-8.3);

	this.instance_5 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_5.setTransform(-43.2,57.5,0.9983,0.9983,-83.3464,0,0,40.5,0.1);

	this.instance_6 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_6.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_7 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_7.setTransform(-42.3,187.95,0.9981,0.9981,0,6.6609,-173.3391,2.9,-53.5);

	this.instance_8 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_9.setTransform(24.55,192.2,0.9979,0.9979,0,-2.5039,177.4961,2.5,-53.2);

	this.instance_10 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_10.setTransform(8.2,96.05,0.9979,0.9979,-8.4151,0,0,-1.9,2.1);

	this.instance_11 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_11.setTransform(47.7,-26.55,0.9984,0.9984,92.9576,0,0,-31.4,-1.4);

	this.instance_12 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_12.setTransform(-20.6,92.25,0.9983,0.9983,12.4516,0,0,1.8,-45.8);

	this.instance_13 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_13.setTransform(-12.5,115.1,0.9982,0.9982,0,-56.0427,123.9573,-4.9,3.2);

	this.instance_14 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_14.setTransform(-14.25,103.85,0.9984,0.9984,0,-79.8968,100.1032,-6.2,8);

	this.instance_15 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_15.setTransform(44.75,48.2,0.9983,0.9983,134.1596,0,0,-39.6,-0.1);

	this.instance_16 = new lib.ch1_headcopy2("synched",0);
	this.instance_16.setTransform(0.25,-76.8,0.9989,0.9989,0,0.5873,-179.4127,0.4,52.9);

	this.instance_17 = new lib.ch1_neckcopy2("synched",0);
	this.instance_17.setTransform(-5.8,-58,0.999,0.999,-0.1006,0,0,-1.4,8.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{regX:-1.4,scaleX:0.999,scaleY:0.999,rotation:-0.1006,x:-5.8,y:-58}},{t:this.instance_16,p:{regX:0.4,skewX:0.5873,skewY:-179.4127,x:0.25,y:-76.8,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:134.1596,x:44.75,y:48.2}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,skewX:-79.8968,skewY:100.1032,x:-14.25,y:103.85,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.9,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-56.0427,skewY:123.9573,x:-12.5,y:115.1}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:12.4516,y:92.25,x:-20.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:92.9576,x:47.7,y:-26.55,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9979,scaleY:0.9979,rotation:-8.4151,x:8.2,y:96.05}},{t:this.instance_9,p:{regX:2.5,skewX:-2.5039,skewY:177.4961,x:24.55,y:192.2,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:2.9,scaleX:0.9981,scaleY:0.9981,skewX:6.6609,skewY:-173.3391,x:-42.3,y:187.95,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0.1,scaleX:0.9983,scaleY:0.9983,rotation:-83.3464,x:-43.2,y:57.5,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:99.6328,skewY:-80.3672,x:-51.75,y:138.35,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,skewX:99.7345,skewY:-80.2655,x:-51.65,y:147.3}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.6228,x:-55.75,y:-21.7,regY:-0.1}}]}).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.9989,scaleY:0.9989,rotation:-0.1076,x:-5.9,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:0.3904,skewY:-179.6096,x:0.15,y:-76.7,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:132.8325,x:45.8,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-81.2249,skewY:98.7751,x:-11.8,y:105.25,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-57.3706,skewY:122.6294,x:-9.8,y:116.5}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:11.1755,y:92.3,x:-20.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:92.0916,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:-7.0687,x:8.35,y:96.1}},{t:this.instance_9,p:{regX:2.4,skewX:-1.9945,skewY:178.0055,x:22.7,y:192.4,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:5.3849,skewY:-174.6151,x:-40.3,y:188.4,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-81.5488,x:-43.75,y:57.5,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:101.4302,skewY:-78.5698,x:-54.75,y:138.1,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:101.5329,skewY:-78.4671,x:-54.95,y:147.1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.2568,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1164,x:-5.9,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:0.1926,skewY:-179.8074,x:0.1,y:-76.8,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:131.5031,x:46.95,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.5527,skewY:97.4473,x:-9.4,y:106.6,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-58.6993,skewY:121.3007,x:-7.05,y:117.7}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:9.9009,y:92.15,x:-20.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:91.2243,x:47.6,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-5.7224,x:8.7,y:95.9}},{t:this.instance_9,p:{regX:2.5,skewX:-1.4844,skewY:178.5156,x:20.65,y:192.6,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:4.1085,skewY:-175.8915,x:-38.1,y:188.9,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-79.751,x:-44.3,y:57.55,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:103.2286,skewY:-76.7714,x:-57.8,y:137.75,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:103.3307,skewY:-76.6693,x:-58.3,y:146.7}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.8914,x:-55.7,y:-21.65,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1252,x:-5.9,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:0,skewY:180,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:130.1754,x:48.15,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-83.8818,skewY:96.1182,x:-6.85,y:107.85,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-60.0275,skewY:119.9725,x:-4.3,y:119}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:8.6248,y:92.15,x:-20.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:90.3582,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-4.3775,x:9.15,y:95.75}},{t:this.instance_9,p:{regX:2.4,skewX:-0.9735,skewY:179.0265,x:18.85,y:192.75,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:2.8333,skewY:-177.1667,x:-35.9,y:189.15,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-77.9533,x:-44.8,y:57.7,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:105.0268,skewY:-74.9732,x:-60.8,y:137.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:105.129,skewY:-74.871,x:-61.65,y:146.35}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.5263,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1339,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.1952,skewY:179.8048,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:128.8477,x:49.25,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-85.2102,skewY:94.7898,x:-4.35,y:109.1,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-61.3565,skewY:118.6435,x:-1.5,y:120.2}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:7.3487,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:89.4956,x:47.7,y:-26.45,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-3.0304,x:9.55,y:95.65}},{t:this.instance_9,p:{regX:2.5,skewX:-0.4635,skewY:179.5365,x:16.8,y:192.75,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:1.5586,skewY:-178.4414,x:-33.75,y:189.5,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-76.1532,x:-45.3,y:57.75,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:106.8262,skewY:-73.1738,x:-63.85,y:136.95,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:106.9275,skewY:-73.0725,x:-64.9,y:145.85}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.1609,x:-55.65,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1435,x:-5.9,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.3912,skewY:179.6088,x:0,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:127.5193,x:50.35,y:48.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-86.5378,skewY:93.4622,x:-1.9,y:110.25,regY:7.9,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-62.684,skewY:117.316,x:1.3,y:121.35}},{t:this.instance_12,p:{regX:1.8,regY:-45.7,rotation:6.0735,y:92.3,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:88.6285,x:47.65,y:-26.6,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-1.6843,x:9.9,y:95.45}},{t:this.instance_9,p:{regX:2.4,skewX:0.0412,skewY:-179.9588,x:15,y:192.9,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:0.2821,skewY:-179.7179,x:-31.6,y:189.85,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-74.3561,x:-45.8,y:57.75,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:108.6244,skewY:-71.3756,x:-66.85,y:136.35,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:108.7255,skewY:-71.2745,x:-68.1,y:145.25}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.7946,x:-55.75,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.6,scaleX:0.999,scaleY:0.999,rotation:-0.1523,x:-6,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.5882,skewY:179.4118,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:126.1897,x:51.5,y:48.1}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,skewX:-87.8671,skewY:92.1329,x:0.85,y:111.45,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-64.0127,skewY:115.9873,x:4.1,y:122.35}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:4.7978,y:92.2,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:87.762,x:47.65,y:-26.35,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-0.3391,x:10.15,y:95.35}},{t:this.instance_9,p:{regX:2.4,skewX:0.552,skewY:-179.448,x:13,y:192.9,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-0.989,skewY:179.011,x:-29.4,y:190.05,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-72.5558,x:-46.35,y:57.85,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:110.4225,skewY:-69.5775,x:-69.75,y:135.7,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:110.5252,skewY:-69.4748,x:-71.35,y:144.6}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.4295,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.6,scaleX:0.999,scaleY:0.999,rotation:-0.161,x:-6,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.786,skewY:179.214,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:124.861,x:52.65,y:48.05}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-89.196,skewY:90.804,x:3.4,y:112.45,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-65.3417,skewY:114.6583,x:6.9,y:123.35}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:3.5228,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:86.8949,x:47.6,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:1.0024,x:10.5,y:95.2}},{t:this.instance_9,p:{regX:2.4,skewX:1.062,skewY:-178.938,x:11.1,y:192.65,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-2.2642,skewY:177.7358,x:-27.2,y:190.15,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-70.7582,x:-46.85,y:57.9,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:112.2216,skewY:-67.7784,x:-72.75,y:135,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:112.3228,skewY:-67.6772,x:-74.55,y:143.85}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.0638,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1698,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.9821,skewY:179.0179,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.5331,x:53.75,y:47.95}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,skewX:-90.5202,skewY:89.4798,x:6.1,y:113.6,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-66.6702,skewY:113.3298,x:9.75,y:124.35}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:2.2469,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:86.0289,x:47.65,y:-26.45,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:2.348,x:10.85,y:95.1}},{t:this.instance_9,p:{regX:2.4,skewX:1.572,skewY:-178.428,x:9.2,y:192.7,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-3.5396,skewY:176.4604,x:-25,y:190.35,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-68.9606,x:-47.35,y:57.95,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:114.0188,skewY:-65.9812,x:-75.7,y:134.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:114.1217,skewY:-65.8783,x:-77.75,y:142.75}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-95.6984,x:-55.65,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1785,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.179,skewY:178.821,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:122.2042,x:54.85,y:47.85}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-91.849,skewY:88.151,x:8.65,y:114.5,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-67.9989,skewY:112.0011,x:12.7,y:125.3}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:0.9721,y:92.3,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:85.1612,x:47.6,y:-26.55,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:3.694,x:11.15,y:95.05}},{t:this.instance_9,p:{regX:2.4,skewX:2.0813,skewY:-177.9187,x:7.2,y:192.45,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-4.8159,skewY:175.1841,x:-22.85,y:190.35,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-67.1615,x:-47.85,y:58,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:115.8177,skewY:-64.1823,x:-78.45,y:133.4,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:115.9198,skewY:-64.0802,x:-80.95,y:141.95}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-95.3323,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1873,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.3743,skewY:178.6257,x:0.1,y:-76.8,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:120.8748,x:56,y:47.75}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-93.1779,skewY:86.8221,x:11.2,y:115.4,regY:7.9,regX:-6.2}},{t:this.instance_13,p:{regX:-4.9,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-69.326,skewY:110.674,x:15.7,y:126}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:-0.2995,y:92.3,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:84.2949,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:5.0412,x:11.5,y:95}},{t:this.instance_9,p:{regX:2.4,skewX:2.5917,skewY:-177.4083,x:5.25,y:192.2,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-6.0911,skewY:173.9089,x:-20.65,y:190.4,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-65.3637,x:-48.3,y:58.1,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:117.6159,skewY:-62.3841,x:-81.35,y:132.25,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:117.7181,skewY:-62.2819,x:-84.05,y:140.95}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.9683,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1969,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.5713,skewY:178.4287,x:0.1,y:-76.85,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:119.5479,x:57.1,y:47.6}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-94.505,skewY:85.495,x:13.9,y:116.45,regY:7.9,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-70.6551,skewY:109.3449,x:18.6,y:126.9}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-1.5748,y:92.2,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:83.4272,x:47.65,y:-26.5,scaleY:0.9983,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:6.3869,x:11.8,y:94.85}},{t:this.instance_9,p:{regX:2.4,skewX:3.1023,skewY:-176.8977,x:3.3,y:191.9,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-7.3666,skewY:172.6334,x:-18.35,y:190.55,regY:-53.4}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-63.5642,x:-48.85,y:58.1,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:119.4152,skewY:-60.5848,x:-84.25,y:131.35,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:119.517,skewY:-60.483,x:-87.2,y:139.8}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.6017,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2057,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.7674,skewY:178.2326,x:0.15,y:-76.9,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:118.2198,x:58.2,y:47.45}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-95.8347,skewY:84.1653,x:16.7,y:117.15,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.4,scaleX:0.9982,scaleY:0.9982,skewX:-71.983,skewY:108.017,x:21.75,y:127.6}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:-2.8509,y:92.25,x:-20.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:82.5609,x:47.6,y:-26.65,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:7.7316,x:12.1,y:94.7}},{t:this.instance_9,p:{regX:2.4,skewX:3.6113,skewY:-176.3887,x:1.35,y:191.5,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:-8.6423,skewY:171.3577,x:-16.05,y:190.35,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-61.7665,x:-49.35,y:58.15,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:121.2134,skewY:-58.7866,x:-86.95,y:130.2,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:121.3157,skewY:-58.6843,x:-90.25,y:138.65}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.2371,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2144,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.9653,skewY:178.0347,x:0.05,y:-76.8,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:116.8898,x:59.35,y:47.35}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-97.1629,skewY:82.8371,x:19.5,y:117.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-73.3128,skewY:106.6872,x:24.6,y:128.25}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-4.1267,y:92.25,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:81.6947,x:47.7,y:-26.35,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:9.0779,x:12.5,y:94.4}},{t:this.instance_9,p:{regX:2.5,skewX:4.1224,skewY:-175.8776,x:-0.6,y:191.1,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-9.9176,skewY:170.0823,x:-14,y:190.2,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-59.9686,x:-49.85,y:58.15,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:123.0119,skewY:-56.9881,x:-89.75,y:129.05,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:123.1138,skewY:-56.8862,x:-93.25,y:137.3}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9982,rotation:-93.87,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2232,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.1615,skewY:177.8385,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:115.5627,x:60.4,y:47.1}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-98.4915,skewY:81.5085,x:22.3,y:118.7,regY:8,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-74.6398,skewY:105.3602,x:27.6,y:128.85}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:-5.4018,y:92.3,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:80.8271,x:47.6,y:-26.5,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:10.4239,x:12.9,y:94.25}},{t:this.instance_9,p:{regX:2.4,skewX:4.6321,skewY:-175.3679,x:-2.4,y:190.65,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-11.1929,skewY:168.8071,x:-11.95,y:190.05,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-58.1696,x:-50.4,y:58.2,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:124.8106,skewY:-55.1894,x:-92.45,y:127.85,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:124.9122,skewY:-55.0878,x:-96.15,y:136.05}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.5049,x:-55.65,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2319,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.3586,skewY:177.6414,x:0,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:114.2335,x:61.5,y:46.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-99.8195,skewY:80.1805,x:25.05,y:119.35,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-75.9689,skewY:104.0311,x:30.65,y:129.4}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-6.6771,y:92.25,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:79.9611,x:47.65,y:-26.5,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:11.7713,x:13.2,y:94.15}},{t:this.instance_9,p:{regX:2.4,skewX:5.1422,skewY:-174.8578,x:-4.35,y:190.2,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:-12.4695,skewY:167.5305,x:-9.65,y:189.8,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-56.3714,x:-50.9,y:58.25,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:126.6093,skewY:-53.3907,x:-95.1,y:126.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:126.7112,skewY:-53.2888,x:-99.15,y:134.6}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.1399,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2415,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.554,skewY:177.446,x:0,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:112.9058,x:62.65,y:46.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-101.1485,skewY:78.8515,x:27.85,y:119.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-77.2967,skewY:102.7033,x:33.65,y:129.85}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:-7.9521,y:92.2,x:-20.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:79.0935,x:47.6,y:-26.5,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:13.1154,x:13.45,y:94}},{t:this.instance_9,p:{regX:2.4,skewX:5.6525,skewY:-174.3475,x:-6.2,y:189.4,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:-13.7449,skewY:166.2551,x:-7.45,y:189.6,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-54.573,x:-51.4,y:58.25,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:128.4068,skewY:-51.5932,x:-97.75,y:125.15,regY:-8.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:128.5089,skewY:-51.4911,x:-101.95,y:132.9}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-92.7742,x:-55.65,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2503,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.7502,skewY:177.2498,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:111.5773,x:63.75,y:46.45}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-102.4764,skewY:77.5236,x:30.65,y:120.35,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-78.625,skewY:101.375,x:36.7,y:130.3}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:-9.2284,y:92.15,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:78.2272,x:47.55,y:-26.65,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:14.4628,x:13.8,y:93.8}},{t:this.instance_9,p:{regX:2.4,skewX:6.1625,skewY:-173.8375,x:-8.15,y:188.95,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-15.0206,skewY:164.9794,x:-5.45,y:189.35,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-52.7743,x:-51.95,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:130.2049,skewY:-49.7951,x:-100.3,y:123.65,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:130.3076,skewY:-49.6924,x:-104.85,y:131.45}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-92.4076,x:-55.7,y:-21.8,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2591,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.9473,skewY:177.0526,x:0.05,y:-76.85,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:110.2488,x:64.85,y:46.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-103.8054,skewY:76.1946,x:33.5,y:120.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-79.9539,skewY:100.0461,x:39.75,y:130.65}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-10.5033,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:77.36,x:47.55,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:15.8089,x:14.2,y:93.75}},{t:this.instance_9,p:{regX:2.5,skewX:6.6723,skewY:-173.3277,x:-10.15,y:188.2,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-16.2953,skewY:163.7047,x:-3.25,y:188.95,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-50.9758,x:-52.45,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:132.0038,skewY:-47.9962,x:-102.95,y:122.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:132.1055,skewY:-47.8945,x:-107.55,y:129.75}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-92.0439,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2678,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-3.1438,skewY:176.8562,x:0.05,y:-76.8,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:108.9194,x:65.9,y:45.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-105.1342,skewY:74.8658,x:36.35,y:121.35,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-81.2821,skewY:98.7179,x:42.8,y:130.9}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-11.7797,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:76.4931,x:47.6,y:-26.65,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:17.1539,x:14.5,y:93.65}},{t:this.instance_9,p:{regX:2.4,skewX:7.1823,skewY:-172.8177,x:-11.9,y:187.5,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-17.5714,skewY:162.4286,x:-1.05,y:188.5,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-49.178,x:-52.95,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:133.8022,skewY:-46.1978,x:-105.25,y:120.45,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:133.9048,skewY:-46.0952,x:-110.3,y:127.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-91.6785,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2766,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-3.341,skewY:176.659,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:107.5904,x:67.05,y:45.6}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-106.4619,skewY:73.5381,x:39.2,y:121.75,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-82.6118,skewY:97.3882,x:45.8,y:131.15}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-13.0551,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:75.6271,x:47.6,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:18.5003,x:14.75,y:93.5}},{t:this.instance_9,p:{regX:2.4,skewX:7.6923,skewY:-172.3077,x:-13.75,y:186.75,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-18.8466,skewY:161.1534,x:1.1,y:187.95,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-47.3783,x:-53.45,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:135.6007,skewY:-44.3993,x:-107.8,y:118.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:135.7037,skewY:-44.2963,x:-113,y:126.2}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-91.3122,x:-55.6,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2862,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-3.5383,skewY:176.4617,x:0,y:-76.7,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:106.2636,x:68.05,y:45.35}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-107.7897,skewY:72.2103,x:41.95,y:122.05,regY:7.9,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-83.9399,skewY:96.0601,x:49,y:131.3}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-14.3304,y:92.25,x:-20.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:74.76,x:47.6,y:-26.5,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9977,scaleY:0.9977,rotation:19.846,x:15,y:93.2}},{t:this.instance_9,p:{regX:2.4,skewX:8.2026,skewY:-171.7974,x:-15.6,y:185.8,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-20.1237,skewY:159.8763,x:3.25,y:187.5,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-45.581,x:-53.9,y:58.35,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:137.3998,skewY:-42.6002,x:-110.25,y:117.15,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:137.5014,skewY:-42.4986,x:-115.65,y:124.3}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-90.9478,x:-55.65,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2713,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-3.327,skewY:176.673,x:-0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:107.6536,x:66.95,y:45.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-106.386,skewY:73.614,x:38.95,y:121.7,regY:7.9,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-82.5268,skewY:97.4732,x:45.65,y:131.1}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-12.9839,y:92.15,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:75.6634,x:47.55,y:-26.65,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.2,scaleX:0.9978,scaleY:0.9978,rotation:18.4244,x:14.75,y:93.5}},{t:this.instance_9,p:{regX:2.4,skewX:7.6534,skewY:-172.3466,x:-13.65,y:186.75,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-18.7782,skewY:161.2218,x:0.9,y:188.05,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-47.4564,x:-53.4,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:135.519,skewY:-44.481,x:-107.6,y:119,regY:-8.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:135.6157,skewY:-44.3843,x:-112.85,y:126.25}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-91.328,x:-55.75,y:-21.75,regY:-0.2}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2573,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-3.1166,skewY:176.8834,x:-0.05,y:-76.85,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:109.0443,x:65.8,y:45.95}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-104.9844,skewY:75.0156,x:36.1,y:121.25,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.9,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-81.1121,skewY:98.8879,x:42.55,y:130.8}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-11.6366,y:92.2,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:76.5663,x:47.65,y:-26.55,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:17.0015,x:14.45,y:93.55}},{t:this.instance_9,p:{regX:2.5,skewX:7.1037,skewY:-172.8963,x:-11.8,y:187.55,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-17.4315,skewY:162.5685,x:-1.35,y:188.55,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-49.3314,x:-52.9,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:133.6381,skewY:-46.3619,x:-105.1,y:120.65,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:133.7301,skewY:-46.2699,x:-110.1,y:128.2}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-91.7065,x:-55.8,y:-21.75,regY:-0.2}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2424,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.9062,skewY:177.0938,x:0,y:-76.85,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:110.4336,x:64.7,y:46.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-103.5813,skewY:76.4187,x:33,y:120.95,regY:7.9,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-79.6986,skewY:100.3014,x:39.3,y:130.6}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-10.2896,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:77.4696,x:47.55,y:-26.55,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:15.5793,x:14.15,y:93.7}},{t:this.instance_9,p:{regX:2.5,skewX:6.5558,skewY:-173.4442,x:-9.8,y:188.35,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-16.0868,skewY:163.9132,x:-3.6,y:189,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-51.2042,x:-52.35,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:131.7575,skewY:-48.2425,x:-102.55,y:122.3,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:131.8443,skewY:-48.1557,x:-107.25,y:129.95}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-92.086,x:-55.8,y:-21.75,regY:-0.2}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2284,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.6959,skewY:177.3041,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:111.825,x:63.55,y:46.5}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-102.1778,skewY:77.8222,x:30.15,y:120.3,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.9,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-78.2861,skewY:101.7139,x:36.2,y:130.05}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:-8.9421,y:92.35,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:78.3732,x:47.6,y:-26.55,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:14.157,x:13.75,y:93.9}},{t:this.instance_9,p:{regX:2.5,skewX:6.0067,skewY:-173.9933,x:-7.8,y:189.05,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-14.7408,skewY:165.2592,x:-5.85,y:189.35,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-53.08,x:-51.85,y:58.3,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:129.8767,skewY:-50.1233,x:-99.9,y:123.85,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:129.9577,skewY:-50.0423,x:-104.4,y:131.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-92.4664,x:-55.65,y:-21.8,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.2135,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.4865,skewY:177.5135,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:113.215,x:62.4,y:46.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-100.7739,skewY:79.2261,x:27.25,y:119.7,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-76.8726,skewY:103.1274,x:32.95,y:129.75}},{t:this.instance_12,p:{regX:1.7,regY:-45.7,rotation:-7.5959,y:92.4,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:79.2754,x:47.6,y:-26.55,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:12.7345,x:13.45,y:94.1}},{t:this.instance_9,p:{regX:2.4,skewX:5.4572,skewY:-174.5428,x:-5.7,y:189.6,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-13.3942,skewY:166.6058,x:-8.15,y:189.65,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-54.9562,x:-51.35,y:58.25,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:127.9953,skewY:-52.0047,x:-97.2,y:125.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:128.0717,skewY:-51.9283,x:-101.45,y:133.35}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-92.8478,x:-55.7,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1995,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.2771,skewY:177.7229,x:0.1,y:-76.7,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:114.6055,x:61.25,y:46.95}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-99.3721,skewY:80.6279,x:24.35,y:119.1,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-75.4584,skewY:104.5416,x:29.8,y:129.25}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:-6.2489,y:92.2,x:-20.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_11,p:{regX:-31.3,rotation:80.1779,x:47.6,y:-26.55,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:11.3127,x:13.1,y:94.2}},{t:this.instance_9,p:{regX:2.4,skewX:4.909,skewY:-175.091,x:-3.65,y:190.3,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-12.0499,skewY:167.9501,x:-10.5,y:190,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-56.8303,x:-50.75,y:58.2,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:126.1149,skewY:-53.8851,x:-94.45,y:126.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:126.1863,skewY:-53.8137,x:-98.3,y:134.8}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.2268,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1847,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-2.066,skewY:177.934,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:115.9955,x:60.1,y:47.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-97.9696,skewY:82.0304,x:21.4,y:118.35,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-74.0437,skewY:105.9563,x:26.45,y:128.7}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-4.9015,y:92.2,x:-20.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:81.0825,x:47.65,y:-26.35,scaleY:0.9983,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:9.8897,x:12.75,y:94.25}},{t:this.instance_9,p:{regX:2.4,skewX:4.3596,skewY:-175.6403,x:-1.6,y:190.7,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-10.7038,skewY:169.2962,x:-12.75,y:190.15,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-58.7052,x:-50.25,y:58.2,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:124.2346,skewY:-55.7654,x:-91.7,y:128.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:124.3006,skewY:-55.6994,x:-95.3,y:136.45}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.6067,x:-55.75,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1707,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.8558,skewY:178.1441,x:0.05,y:-76.9,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:117.3872,x:58.95,y:47.35}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-96.5659,skewY:83.4341,x:18.55,y:117.65,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.4,scaleX:0.9982,scaleY:0.9982,skewX:-72.6304,skewY:107.3696,x:23.6,y:128.05}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-3.5554,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:81.9848,x:47.65,y:-26.5,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:8.4696,x:12.4,y:94.45}},{t:this.instance_9,p:{regX:2.4,skewX:3.8106,skewY:-176.1894,x:0.45,y:191.35,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:-9.3598,skewY:170.6402,x:-14.95,y:190.25,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-60.5802,x:-49.7,y:58.2,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:122.3543,skewY:-57.6457,x:-88.7,y:129.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:122.414,skewY:-57.586,x:-92.15,y:137.8}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.9868,x:-55.75,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.6,scaleX:0.999,scaleY:0.999,rotation:-0.1558,x:-6,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.6448,skewY:178.3552,x:0.05,y:-76.9,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:118.7779,x:57.8,y:47.55}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-95.1634,skewY:84.8366,x:15.65,y:116.9,regY:8,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-71.2169,skewY:108.7831,x:20.35,y:127.25}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-2.2075,y:92.2,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:82.8885,x:47.65,y:-26.35,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:7.0468,x:12.05,y:94.7}},{t:this.instance_9,p:{regX:2.5,skewX:3.2619,skewY:-176.738,x:2.25,y:191.7,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-8.0136,skewY:171.9864,x:-17.35,y:190.4,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-62.4553,x:-49.2,y:58.15,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:120.4734,skewY:-59.5266,x:-85.75,y:130.75,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:120.5281,skewY:-59.4719,x:-89.05,y:139.1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.3663,x:-55.85,y:-21.75,regY:-0.2}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1418,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.4347,skewY:178.5653,x:0.05,y:-76.9,regY:52.8}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:120.1678,x:56.6,y:47.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-93.7596,skewY:86.2404,x:12.8,y:115.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-69.8046,skewY:110.1954,x:17.3,y:126.55}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:-0.8609,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:83.7913,x:47.6,y:-26.5,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:5.6247,x:11.7,y:94.85}},{t:this.instance_9,p:{regX:2.4,skewX:2.7127,skewY:-177.2873,x:4.4,y:192.1,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-6.6675,skewY:173.3325,x:-19.65,y:190.45,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-64.3308,x:-48.6,y:58.05,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:118.5919,skewY:-61.4081,x:-82.95,y:131.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:118.643,skewY:-61.357,x:-85.8,y:140.25}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-94.7484,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1269,x:-5.9,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.2254,skewY:178.7746,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:121.558,x:55.45,y:47.85}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-92.3564,skewY:87.6436,x:10.05,y:114.95,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-68.3899,skewY:111.6101,x:14.1,y:125.7}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:0.4817,y:92.25,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:84.6943,x:47.6,y:-26.5,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:4.2017,x:11.35,y:94.95}},{t:this.instance_9,p:{regX:2.4,skewX:2.1637,skewY:-177.8363,x:6.5,y:192.4,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-5.3216,skewY:174.6784,x:-21.95,y:190.45,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-66.2058,x:-48.1,y:58.05,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:116.7108,skewY:-63.2892,x:-80.05,y:132.8,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:116.7562,skewY:-63.2438,x:-82.55,y:141.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-95.1274,x:-55.75,y:-21.75,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.1129,x:-5.9,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-1.0145,skewY:178.9855,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:122.9494,x:54.3,y:48}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.9537,skewY:89.0463,x:7.35,y:113.95,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-66.9774,skewY:113.0226,x:11.1,y:124.8}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:1.8281,y:92.15,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:85.5979,x:47.65,y:-26.45,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:2.7804,x:11.05,y:95.1}},{t:this.instance_9,p:{regX:2.4,skewX:1.6159,skewY:-178.3841,x:8.55,y:192.65,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-3.9758,skewY:176.0242,x:-24.3,y:190.4,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-68.0816,x:-47.6,y:58,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:114.8301,skewY:-65.1699,x:-77.05,y:133.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:114.8713,skewY:-65.1287,x:-79.3,y:142.5}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-95.5074,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.0989,x:-5.8,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.8053,skewY:179.1947,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:124.3396,x:53.15,y:48}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,skewX:-89.5551,skewY:90.4449,x:4.55,y:112.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-65.562,skewY:114.438,x:8.15,y:123.8}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:3.1754,y:92.2,x:-20.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:86.5011,x:47.65,y:-26.55,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:1.3574,x:10.7,y:95.2}},{t:this.instance_9,p:{regX:2.4,skewX:1.0663,skewY:-178.9337,x:10.6,y:192.6,scaleX:0.9978,scaleY:0.9978,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-2.6316,skewY:177.3684,x:-26.6,y:190.2,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-69.9556,x:-47.1,y:57.9,regX:40.5}},{t:this.instance_4,p:{regX:5.3,skewX:112.95,skewY:-67.05,x:-74,y:134.6,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:112.9852,skewY:-67.0148,x:-76,y:143.45}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-95.8876,x:-55.7,y:-21.8,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.0858,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.5943,skewY:179.4057,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:125.73,x:52,y:48.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-88.1519,skewY:91.8481,x:1.85,y:111.75,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-64.1494,skewY:115.8506,x:5.05,y:122.75}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:4.5228,y:92.15,x:-20.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.2,rotation:87.4035,x:47.65,y:-26.35,scaleY:0.9983,scaleX:0.9983}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-0.0596,x:10.3,y:95.35}},{t:this.instance_9,p:{regX:2.4,skewX:0.5169,skewY:-179.4831,x:12.7,y:192.85,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:-1.2861,skewY:178.7139,x:-28.85,y:190.05,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-71.8309,x:-46.55,y:57.85,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:111.0694,skewY:-68.9306,x:-70.9,y:135.45,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:111.0996,skewY:-68.9004,x:-72.65,y:144.3}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.2674,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.0709,x:-5.85,y:-57.95}},{t:this.instance_16,p:{regX:0.5,skewX:-0.3834,skewY:179.6166,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:127.1211,x:50.8,y:48.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-86.7492,skewY:93.2508,x:-0.95,y:110.6,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-62.7361,skewY:117.2639,x:2.2,y:121.65}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:5.8693,y:92.15,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:88.3079,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-1.4818,x:9.95,y:95.45}},{t:this.instance_9,p:{regX:2.5,skewX:-0.0272,skewY:179.9728,x:14.65,y:192.85,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:0.0552,skewY:-179.9448,x:-31.2,y:189.8,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-73.7057,x:-46,y:57.8,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:109.1877,skewY:-70.8123,x:-67.85,y:136.1,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:109.2128,skewY:-70.7872,x:-69.3,y:144.95}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.6482,x:-55.75,y:-21.65,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.056,x:-5.8,y:-58}},{t:this.instance_16,p:{regX:0.5,skewX:-0.1742,skewY:179.8258,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:128.5113,x:49.6,y:48.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-85.3455,skewY:94.6545,x:-3.6,y:109.55,regY:8,regX:-6.1}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9981,scaleY:0.9981,skewX:-61.3228,skewY:118.6772,x:-0.75,y:120.5}},{t:this.instance_12,p:{regX:1.8,regY:-45.8,rotation:7.2163,y:92.25,x:-20.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:89.2101,x:47.6,y:-26.45,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-2.9041,x:9.6,y:95.6}},{t:this.instance_9,p:{regX:2.4,skewX:-0.5774,skewY:179.4226,x:16.75,y:192.7,scaleX:0.9979,scaleY:0.9979,regY:-53.3}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:1.4009,skewY:-178.5991,x:-33.55,y:189.6,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-75.5803,x:-45.5,y:57.8,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:107.3074,skewY:-72.6926,x:-64.8,y:136.7,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:107.3271,skewY:-72.6729,x:-65.9,y:145.6}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.0276,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.042,x:-5.8,y:-58}},{t:this.instance_16,p:{regX:0.5,skewX:0.0315,skewY:-179.9685,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:129.9012,x:48.45,y:48.3}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-83.9425,skewY:96.0575,x:-6.25,y:108.15,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-59.9086,skewY:120.0914,x:-3.65,y:119.25}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:8.5627,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:90.1086,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-4.3264,x:9.2,y:95.75}},{t:this.instance_9,p:{regX:2.4,skewX:-1.1251,skewY:178.8749,x:18.8,y:192.75,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:2.7456,skewY:-177.2544,x:-35.85,y:189.2,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-77.4558,x:-44.95,y:57.75,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:105.427,skewY:-74.573,x:-61.6,y:137.25,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:105.4416,skewY:-74.5584,x:-62.5,y:146.2}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.4081,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.9989,scaleY:0.9989,rotation:-0.028,x:-5.8,y:-58}},{t:this.instance_16,p:{regX:0.5,skewX:0.2424,skewY:-179.7576,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:131.2915,x:47.3,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.5394,skewY:97.4606,x:-8.9,y:106.75,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.2,scaleX:0.9982,scaleY:0.9982,skewX:-58.4953,skewY:121.5047,x:-6.7,y:117.9}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:9.9107,y:92.15,x:-20.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.4,rotation:91.0124,x:47.65,y:-26.6,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-5.7488,x:8.75,y:95.85}},{t:this.instance_9,p:{regX:2.4,skewX:-1.6737,skewY:178.3263,x:20.85,y:192.55,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:4.0919,skewY:-175.9081,x:-38.1,y:188.85,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-79.3308,x:-44.45,y:57.5,regX:40.6}},{t:this.instance_4,p:{regX:5.2,skewX:103.5462,skewY:-76.4538,x:-58.6,y:137.75,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:103.555,skewY:-76.445,x:-59.05,y:146.65}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.7887,x:-55.75,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.9989,scaleY:0.9989,rotation:-0.0131,x:-5.75,y:-58}},{t:this.instance_16,p:{regX:0.5,skewX:0.4534,skewY:-179.5466,x:0.1,y:-76.7,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:132.6825,x:46.05,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-81.1363,skewY:98.8637,x:-11.45,y:105.4,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-57.0817,skewY:122.9183,x:-9.45,y:116.65}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:11.2569,y:92.15,x:-20.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:91.9147,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-2,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-7.1712,x:8.45,y:95.95}},{t:this.instance_9,p:{regX:2.4,skewX:-2.2225,skewY:177.7775,x:22.9,y:192.35,scaleX:0.9979,scaleY:0.9979,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:3,scaleX:0.998,scaleY:0.998,skewX:5.4368,skewY:-174.5632,x:-40.4,y:188.4,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-81.2054,x:-43.9,y:57.5,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:101.6651,skewY:-78.3349,x:-55.45,y:138.05,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:101.669,skewY:-78.331,x:-55.6,y:147.05}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.1683,x:-55.7,y:-21.7,regY:-0.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.5,scaleX:0.999,scaleY:0.999,rotation:-0.0009,x:-5.8,y:-58.05}},{t:this.instance_16,p:{regX:0.5,skewX:0.6617,skewY:-179.3383,x:0.25,y:-76.75,regY:52.9}},{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:134.0728,x:44.9,y:48.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,skewX:-79.7347,skewY:100.2653,x:-14.05,y:103.9,regY:8,regX:-6.2}},{t:this.instance_13,p:{regX:-4.8,regY:3.3,scaleX:0.9982,scaleY:0.9982,skewX:-55.6688,skewY:124.3312,x:-12.3,y:115.25}},{t:this.instance_12,p:{regX:1.7,regY:-45.8,rotation:12.6025,y:92.15,x:-20.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-31.3,rotation:92.8183,x:47.65,y:-26.5,scaleY:0.9984,scaleX:0.9984}},{t:this.instance_10,p:{regX:-1.9,regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,x:8.2,y:96}},{t:this.instance_9,p:{regX:2.4,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.15,scaleX:0.9978,scaleY:0.9978,regY:-53.2}},{t:this.instance_8},{t:this.instance_7,p:{regX:2.9,scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,x:-42.6,y:187.85,regY:-53.5}},{t:this.instance_6},{t:this.instance_5,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-83.0804,x:-43.4,y:57.5,regX:40.5}},{t:this.instance_4,p:{regX:5.2,skewX:99.7835,skewY:-80.2165,x:-52.15,y:138.3,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_3,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:99.7832,skewY:-80.2168,x:-52.05,y:147.3}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.5473,x:-55.7,y:-21.65,regY:-0.1}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-142.6,-369,259.6,676.4);


(lib.CharacterGood_02 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Character
	this.instance = new lib.CachedBmp_2277();
	this.instance.setTransform(-94.5,-342.4,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2276();
	this.instance_1.setTransform(-120.9,-365.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(42));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_2.setTransform(-57.45,-22.95,0.9984,0.9984,-96.0919,0,0,35.4,0.1);

	this.instance_3 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_3.setTransform(-116.4,114.45,0.9983,0.9983,0,124.6947,-55.3053,6.6,-1.5);

	this.instance_4 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_4.setTransform(-109.2,110.65,0.9984,0.9984,0,159.2764,-20.7236,5.5,-9.1);

	this.instance_5 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_5.setTransform(-49.2,50.55,0.9985,0.9985,-43.8427,0,0,44,0);

	this.instance_6 = new lib.ch1_uBodycopy("synched",0);
	this.instance_6.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_7 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_7.setTransform(-3.65,182.2,0.9983,0.9983,0,-22.7945,157.2055,1.8,-55.5);

	this.instance_8 = new lib.ch1_lBodycopy("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_9.setTransform(-23.15,181.55,0.9979,0.9979,0,10.6596,-169.3404,3.1,-53.4);

	this.instance_10 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_10.setTransform(15.9,92.55,0.998,0.998,22.6213,0,0,-1,1.4);

	this.instance_11 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_11.setTransform(84.45,133.25,0.9985,0.9985,0,-96.4018,83.5982,-4.9,3.2);

	this.instance_12 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_12.setTransform(79.35,123.45,0.9985,0.9985,0,-99.5494,80.4506,-6,8.4);

	this.instance_13 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_13.setTransform(70.5,40.05,0.9984,0.9984,81.8892,0,0,-39.7,-1);

	this.instance_14 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_14.setTransform(47.9,-26.2,0.9984,0.9984,71.1253,0,0,-31.2,-1.4);

	this.instance_15 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_15.setTransform(-26.65,89.85,0.9984,0.9984,-14.3425,0,0,1.8,-46);

	this.instance_16 = new lib.ch1_headcopy("synched",0);
	this.instance_16.setTransform(-0.7,-79.45,0.9991,0.9991,0,-1.7225,178.2775,-0.1,52.8);

	this.instance_17 = new lib.ch1_neckcopy("synched",0);
	this.instance_17.setTransform(-5.6,-57.7,0.9991,0.9991,-1.6733,0,0,-1.1,9.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{regX:-1.1,rotation:-1.6733,x:-5.6,y:-57.7,regY:9.2}},{t:this.instance_16,p:{scaleX:0.9991,scaleY:0.9991,skewX:-1.7225,skewY:178.2775,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-46,scaleX:0.9984,scaleY:0.9984,rotation:-14.3425,x:-26.65,y:89.85,regX:1.8}},{t:this.instance_14,p:{rotation:71.1253,x:47.9,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1,rotation:81.8892,x:70.5,y:40.05}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9985,scaleY:0.9985,skewX:-99.5494,skewY:80.4506,x:79.35,y:123.45,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9985,scaleY:0.9985,skewX:-96.4018,skewY:83.5982,x:84.45,y:133.25,regX:-4.9}},{t:this.instance_10,p:{regY:1.4,scaleX:0.998,scaleY:0.998,rotation:22.6213,x:15.9,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.4,scaleX:0.9979,scaleY:0.9979,skewX:10.6596,skewY:-169.3404,x:-23.15,y:181.55,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9983,scaleY:0.9983,skewX:-22.7945,skewY:157.2055,x:-3.65,y:182.2,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9985,scaleY:0.9985,rotation:-43.8427,x:-49.2,y:50.55,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:159.2764,skewY:-20.7236,x:-109.2,y:110.65,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:124.6947,skewY:-55.3053,x:-116.4,y:114.45,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-96.0919,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]}).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.7128,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-1.9721,skewY:178.0279,x:-0.65,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-13.063,x:-26.9,y:89.75,regX:1.8}},{t:this.instance_14,p:{rotation:71.6102,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.6,regY:-1.1,rotation:83.411,x:70,y:40.35}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-98.0288,skewY:81.9712,x:76.6,y:123.75,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-94.8789,skewY:85.1211,x:81.45,y:133.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:21.3034,x:15.8,y:92.75,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:9.341,skewY:-170.659,x:-20.95,y:182.4,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-21.5147,skewY:158.4853,x:-6,y:182.5,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-45.9858,x:-47.7,y:50.4,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:157.1349,skewY:-22.8651,x:-105.35,y:112.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:122.5522,skewY:-57.4478,x:-112.5,y:116.7,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-97.2386,x:-57.4,y:-22.9,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.7548,x:-5.65,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.2235,skewY:177.7765,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-11.7831,x:-27.1,y:89.65,regX:1.8}},{t:this.instance_14,p:{rotation:72.0929,x:47.95,regX:-31.3,y:-26.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:84.9338,x:69.45,y:40.35}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-96.5078,skewY:83.4922,x:74,y:124.15,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-93.3583,skewY:86.6417,x:78.25,y:134.15,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:19.9842,x:15.85,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:8.0212,skewY:-171.9788,x:-18.9,y:183.2,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-20.235,skewY:159.765,x:-8.4,y:182.8,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-48.1285,x:-46.2,y:50.2,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:154.9923,skewY:-25.0077,x:-101.5,y:114.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:120.4091,skewY:-59.5909,x:-108.4,y:118.8,regX:6.7,regY:-1.5}},{t:this.instance_2,p:{rotation:-98.3858,x:-57.45,y:-22.85,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.7969,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.4748,skewY:177.5252,x:-0.65,y:-79.4}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-10.5033,x:-27.3,y:89.5,regX:1.8}},{t:this.instance_14,p:{rotation:72.5753,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.6,regY:-1.1,rotation:86.4539,x:68.9,y:40.75}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-94.9861,skewY:85.0139,x:71.1,y:124.4,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-91.8374,skewY:88.1626,x:75.2,y:134.6,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:18.6657,x:15.85,y:92.6,regX:-1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:6.7031,skewY:-173.2969,x:-16.75,y:184.05,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-18.9543,skewY:161.0457,x:-10.8,y:183.1,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-50.2712,x:-44.65,y:49.9,regX:44.1,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:152.8483,skewY:-27.1517,x:-97.6,y:116.35,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:118.2656,skewY:-61.7344,x:-104.5,y:120.85,regX:6.6,regY:-1.4}},{t:this.instance_2,p:{rotation:-99.5332,x:-57.45,y:-22.9,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.8388,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.7254,skewY:177.2746,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:-9.2232,x:-27.6,y:89.3,regX:1.8}},{t:this.instance_14,p:{rotation:73.0586,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:87.975,x:68.3,y:40.8}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-93.4652,skewY:86.5348,x:68.3,y:124.6,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-90.3161,skewY:89.6839,x:72.15,y:134.9,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:17.3463,x:15.95,y:92.6,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:5.385,skewY:-174.615,x:-14.6,y:184.65,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-17.6763,skewY:162.3237,x:-13.05,y:183.3,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-52.4139,x:-43.25,y:49.65,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:150.7062,skewY:-29.2938,x:-93.6,y:117.95,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:116.1228,skewY:-63.8772,x:-100.2,y:122.8,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-100.6817,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.8817,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.9769,skewY:177.0231,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-7.9441,x:-27.8,y:89.25,regX:1.8}},{t:this.instance_14,p:{rotation:73.5412,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:89.4956,x:67.75,y:40.9}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-91.9434,skewY:88.0566,x:65.55,y:124.7,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-88.7994,skewY:91.2006,x:69.1,y:135.1,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:16.0275,x:16,y:92.5,regX:-1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9979,scaleY:0.9979,skewX:4.0653,skewY:-175.9347,x:-12.6,y:185.45,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-16.3957,skewY:163.6043,x:-15.4,y:183.5,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-54.5576,x:-41.95,y:49.35,regX:44,regY:-0.1}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:148.563,skewY:-31.437,x:-89.55,y:119.55,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:113.9795,skewY:-66.0205,x:-96.05,y:124.6,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-101.8279,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.9238,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.2276,skewY:176.7724,x:-0.8,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-6.6648,x:-27.9,y:89.2,regX:1.9}},{t:this.instance_14,p:{rotation:74.0251,x:47.95,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:91.0132,x:67.1,y:40.95}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-90.4221,skewY:89.5779,x:62.7,y:124.8,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-87.2774,skewY:92.7226,x:66.15,y:135.3,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:14.7082,x:16,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:2.747,skewY:-177.253,x:-10.3,y:186,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-15.1161,skewY:164.8839,x:-17.7,y:183.55,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-56.6997,x:-40.35,y:49.1,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:146.4197,skewY:-33.5803,x:-85.55,y:120.9,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:111.8352,skewY:-68.1648,x:-91.7,y:126.25,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-102.9757,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.9658,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.48,skewY:176.52,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-5.3843,x:-28.25,y:89.05,regX:1.8}},{t:this.instance_14,p:{rotation:74.5075,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:92.5333,x:66.6,y:41.3}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-88.9063,skewY:91.0937,x:59.95,y:124.8,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-85.757,skewY:94.243,x:62.95,y:135.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.4,scaleX:0.9979,scaleY:0.9979,rotation:13.3896,x:16.05,y:92.4,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:1.4274,skewY:-178.5726,x:-8.2,y:186.55,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-13.8359,skewY:166.1641,x:-20,y:183.7,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-58.8439,x:-38.9,y:48.7,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:144.2763,skewY:-35.7237,x:-81.35,y:122.25,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:109.693,skewY:-70.307,x:-87.5,y:127.75,regX:6.6,regY:-1.4}},{t:this.instance_2,p:{rotation:-104.1233,x:-57.45,y:-22.9,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.007,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.7308,skewY:176.2692,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-4.1039,x:-28.5,y:88.9,regX:1.8}},{t:this.instance_14,p:{rotation:74.9914,x:47.95,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:94.0542,x:66.05,y:41.35}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-87.3853,skewY:92.6147,x:57.15,y:124.75,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-84.2363,skewY:95.7637,x:60,y:135.6,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:12.0703,x:16,y:92.5,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:0.1086,skewY:-179.8914,x:-5.9,y:187.05,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-12.5557,skewY:167.4441,x:-22.4,y:183.75,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-60.9858,x:-37.5,y:48.35,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:142.1326,skewY:-37.8674,x:-77.05,y:123.35,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:107.5503,skewY:-72.4497,x:-82.85,y:129.05,regX:6.7,regY:-1.6}},{t:this.instance_2,p:{rotation:-105.2714,x:-57.45,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.0499,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.9817,skewY:176.0183,x:-0.8,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-2.8246,x:-28.7,y:88.8,regX:1.8}},{t:this.instance_14,p:{rotation:75.4731,x:47.9,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:95.5764,x:65.45,y:41.6}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-85.8634,skewY:94.1366,x:54.35,y:124.65,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-82.714,skewY:97.286,x:56.75,y:135.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.4,scaleX:0.9979,scaleY:0.9979,rotation:10.7517,x:15.95,y:92.35,regX:-1.1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-1.2057,skewY:178.7943,x:-3.75,y:187.5,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-11.2775,skewY:168.7225,x:-24.75,y:183.65,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-63.1303,x:-36.1,y:47.9,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:139.9898,skewY:-40.0102,x:-72.9,y:124.3,regY:-9}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:105.4075,skewY:-74.5925,x:-78.45,y:130.4,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-106.4183,x:-57.4,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.0919,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.2335,skewY:175.7665,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-1.545,x:-28.95,y:88.65,regX:1.8}},{t:this.instance_14,p:{rotation:75.9576,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:97.0971,x:64.9,y:41.75}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-84.3412,skewY:95.6588,x:51.6,y:124.5,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-81.1929,skewY:98.8071,x:53.75,y:135.25,regX:-4.9}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:9.4321,x:16.1,y:92.6,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-2.5233,skewY:177.4767,x:-1.5,y:187.9,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-9.997,skewY:170.003,x:-27.1,y:183.6,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.2739,x:-34.7,y:47.45,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:137.8465,skewY:-42.1535,x:-68.6,y:125.15,regY:-9}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:103.2643,skewY:-76.7357,x:-73.95,y:131.45,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-107.5659,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.1339,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.4854,skewY:175.5146,x:-0.8,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-0.2653,x:-29.2,y:88.55,regX:1.8}},{t:this.instance_14,p:{rotation:76.4393,x:47.9,regX:-31.3,y:-26.35,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:98.6184,x:64.3,y:41.85}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-82.821,skewY:97.179,x:48.8,y:124.25,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-79.6733,skewY:100.3267,x:50.65,y:135.2,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:8.1137,x:16.15,y:92.45,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-3.8431,skewY:176.1569,x:0.7,y:188.3,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-8.7169,skewY:171.2831,x:-29.55,y:183.5,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.4158,x:-33.25,y:47.05,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:135.7035,skewY:-44.2965,x:-64.2,y:126,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:101.1215,skewY:-78.8785,x:-69.5,y:132.5,regX:6.5,regY:-1.4}},{t:this.instance_2,p:{rotation:-108.7133,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.1759,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.7365,skewY:175.2635,x:-0.75,y:-79.5}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:1.0107,x:-29.45,y:88.4,regX:1.8}},{t:this.instance_14,p:{rotation:76.9231,x:47.85,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:100.1407,x:63.7,y:42.05}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-81.2986,skewY:98.7014,x:46.05,y:124.05,regX:-5.9}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-78.1512,skewY:101.8488,x:47.65,y:134.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:6.7954,x:16,y:92.45,regX:-1.1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-5.1615,skewY:174.8385,x:2.85,y:188.75,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-7.4377,skewY:172.5623,x:-31.8,y:183.3,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.5593,x:-31.8,y:46.55,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:133.5614,skewY:-46.4386,x:-59.8,y:126.55,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:98.978,skewY:-81.022,x:-64.6,y:133.15,regX:6.6,regY:-1.6}},{t:this.instance_2,p:{rotation:-109.8618,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.218,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.9876,skewY:175.0124,x:-0.8,y:-79.4}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:2.2907,x:-29.6,y:88.1,regX:1.8}},{t:this.instance_14,p:{rotation:77.4073,x:47.85,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:101.6611,x:63.1,y:42.15}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-79.7787,skewY:100.2213,x:43.3,y:123.55,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-76.6294,skewY:103.3706,x:44.6,y:134.5,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:5.4762,x:16.15,y:92.4,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-6.4809,skewY:173.5191,x:5.25,y:188.8,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-6.1586,skewY:173.8414,x:-34.25,y:183.05,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.7035,x:-30.45,y:46,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:131.4173,skewY:-48.5827,x:-55.45,y:127.15,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:96.8344,skewY:-83.1656,x:-59.95,y:133.8,regX:6.6,regY:-1.6}},{t:this.instance_2,p:{rotation:-111.0093,x:-57.4,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.2591,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.2389,skewY:174.761,x:-0.85,y:-79.4}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:3.5693,x:-29.85,y:88,regX:1.8}},{t:this.instance_14,p:{rotation:77.8904,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:103.1829,x:62.55,y:42.25}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-78.2578,skewY:101.7422,x:40.5,y:123.25,regX:-5.9}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-75.1085,skewY:104.8915,x:41.6,y:134,regX:-4.9}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:4.1573,x:16.2,y:92.5,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-7.8,skewY:172.2,x:7.5,y:189.05,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-4.8782,skewY:175.1218,x:-36.5,y:182.8,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.846,x:-29.1,y:45.4,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:129.275,skewY:-50.725,x:-50.95,y:127.4,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:94.6917,skewY:-85.3083,x:-55.4,y:134.3,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-112.1575,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.3012,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.4904,skewY:174.5096,x:-0.8,y:-79.4}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:4.8487,x:-30.1,y:88,regX:1.8}},{t:this.instance_14,p:{rotation:78.3731,x:47.9,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1,rotation:104.7031,x:61.85,y:42.3}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-76.7358,skewY:103.2642,x:37.7,y:122.55,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-73.5878,skewY:106.4122,x:38.55,y:133.6,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:2.838,x:16.25,y:92.35,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-9.1182,skewY:170.8818,x:9.7,y:189.2,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-3.5977,skewY:176.4022,x:-38.9,y:182.45,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.9884,x:-27.65,y:44.9,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:127.1316,skewY:-52.8684,x:-46.65,y:127.45,regY:-9}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:92.5486,skewY:-87.4514,x:-50.7,y:134.5,regX:6.7,regY:-1.5}},{t:this.instance_2,p:{rotation:-113.3041,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.3432,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.7419,skewY:174.2581,x:-0.85,y:-79.4}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:6.1297,x:-30.3,y:87.85,regX:1.8}},{t:this.instance_14,p:{rotation:78.8551,x:47.85,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1,rotation:106.2249,x:61.25,y:42.5}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-75.2149,skewY:104.7851,x:35.05,y:122.05,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-72.0671,skewY:107.9329,x:35.55,y:133.05,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:1.5185,x:16.25,y:92.3,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9979,skewX:-10.4365,skewY:169.5633,x:11.95,y:189.35,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-2.3181,skewY:177.6819,x:-41.25,y:182.1,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-78.1314,x:-26.35,y:44.2,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:124.9881,skewY:-55.0119,x:-42.1,y:127.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:90.4055,skewY:-89.5945,x:-45.95,y:134.85,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-114.4517,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.3853,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.9927,skewY:174.0073,x:-0.85,y:-79.4}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:7.4104,x:-30.55,y:87.65,regX:1.8}},{t:this.instance_14,p:{rotation:79.3385,x:47.85,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:107.7462,x:60.8,y:42.55}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-73.6933,skewY:106.3067,x:32.5,y:121.5,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-70.5454,skewY:109.4546,x:32.55,y:132.6,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:0.1998,x:16.3,y:92.3,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-11.7565,skewY:168.2435,x:14.15,y:189.4,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-1.0379,skewY:178.9621,x:-43.55,y:181.7,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.2755,x:-25,y:43.65,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:122.8441,skewY:-57.1559,x:-37.6,y:127.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:88.2665,skewY:-91.7335,x:-41.25,y:134.8,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-115.5996,x:-57.35,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.4273,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-6.2443,skewY:173.7557,x:-0.85,y:-79.4}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:8.6884,x:-30.7,y:87.4,regX:1.8}},{t:this.instance_14,p:{rotation:79.8227,x:47.9,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:109.2671,x:60.3,y:42.7}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-72.1734,skewY:107.8266,x:29.8,y:120.8,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-69.0244,skewY:110.9756,x:29.75,y:131.85,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-1.1145,x:16.35,y:92.3,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-13.0744,skewY:166.9256,x:16.5,y:189.4,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:0.2365,skewY:-179.7635,x:-45.85,y:181.25,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-82.418,x:-23.65,y:42.95,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:120.7015,skewY:-59.2985,x:-33.15,y:127.3,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:86.1234,skewY:-93.8766,x:-36.5,y:134.8,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-116.7464,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.4693,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-6.4953,skewY:173.5047,x:-0.85,y:-79.45}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:9.9681,x:-31,y:87.25,regX:1.8}},{t:this.instance_14,p:{rotation:80.3048,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:110.7875,x:59.65,y:42.85}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-70.6518,skewY:109.3482,x:27,y:120.05,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-67.5021,skewY:112.4979,x:26.65,y:131.05,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-2.4346,x:16.35,y:92.3,regX:-1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-14.393,skewY:165.607,x:18.8,y:189.45,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:1.5163,skewY:-178.4837,x:-48.25,y:180.7,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-84.5608,x:-22.35,y:42.25,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:118.5589,skewY:-61.4411,x:-28.7,y:126.9,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:83.9799,skewY:-96.0201,x:-31.7,y:134.5,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-117.8952,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.4352,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-6.2831,skewY:173.7169,x:-0.9,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:8.8648,x:-30.8,y:87.55,regX:1.8}},{t:this.instance_14,p:{rotation:79.8834,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:109.4751,x:60.15,y:42.75}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-71.9765,skewY:108.0235,x:29.35,y:120.75,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-68.8395,skewY:111.1605,x:29.25,y:131.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-1.3073,x:16.35,y:92.25,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-13.2742,skewY:166.7258,x:16.85,y:189.4,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:0.402,skewY:-179.598,x:-46.2,y:181.15,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-82.7228,x:-23.45,y:42.85,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:120.3882,skewY:-59.6118,x:-32.5,y:127.2,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:85.8187,skewY:-94.1813,x:-35.75,y:134.8,regX:6.5,regY:-1.5}},{t:this.instance_2,p:{rotation:-116.9113,x:-57.35,y:-22.85,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.401,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-6.07,skewY:173.93,x:-0.85,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:7.7604,x:-30.45,y:87.65,regX:1.9}},{t:this.instance_14,p:{rotation:79.4639,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.6,regY:-1.1,rotation:108.1639,x:60.65,y:42.75}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-73.3007,skewY:106.6993,x:31.7,y:121.3,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-70.1784,skewY:109.8216,x:31.8,y:132.3,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-0.1805,x:16.35,y:92.3,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-12.1547,skewY:167.8453,x:14.95,y:189.4,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-0.7086,skewY:179.2914,x:-44.2,y:181.55,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.8853,x:-24.6,y:43.45,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:122.2168,skewY:-57.7832,x:-36.3,y:127.5,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:87.6574,skewY:-92.3426,x:-39.85,y:134.85,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-115.9267,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.3669,x:-5.65,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.8563,skewY:174.1437,x:-0.85,y:-79.5}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:6.6551,x:-30.4,y:87.75,regX:1.8}},{t:this.instance_14,p:{rotation:79.0433,x:47.85,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:106.8527,x:61.15,y:42.5}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-74.6252,skewY:105.3748,x:34.1,y:121.85,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-71.516,skewY:108.484,x:34.45,y:132.9,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:0.941,x:16.3,y:92.35,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-11.036,skewY:168.964,x:12.85,y:189.4,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-1.8238,skewY:178.1762,x:-42.15,y:181.95,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.0461,x:-25.8,y:43.95,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:124.0466,skewY:-55.9534,x:-40.2,y:127.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:89.4955,skewY:-90.5045,x:-43.95,y:134.9,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-114.9435,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.3328,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.6424,skewY:174.3575,x:-0.8,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:5.5514,x:-30.1,y:87.95,regX:1.9}},{t:this.instance_14,p:{rotation:78.6221,x:47.9,regX:-31.3,y:-26.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1,rotation:105.5405,x:61.55,y:42.35}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-75.9497,skewY:104.0503,x:36.5,y:122.4,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-72.8525,skewY:107.1475,x:36.95,y:133.35,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:2.068,x:16.3,y:92.35,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-9.9176,skewY:170.0824,x:11.1,y:189.3,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-2.9398,skewY:177.0602,x:-40.2,y:182.25,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.2082,x:-26.9,y:44.5,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:125.8763,skewY:-54.1237,x:-44.1,y:127.6,regY:-9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:91.3296,skewY:-88.6704,x:-47.95,y:134.75,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-113.9602,x:-57.45,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.2985,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.4298,skewY:174.5702,x:-0.8,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:4.4463,x:-30,y:88.05,regX:1.8}},{t:this.instance_14,p:{rotation:78.2011,x:47.9,regX:-31.3,y:-26.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:104.2293,x:62.2,y:42.35}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-77.274,skewY:102.726,x:38.7,y:122.8,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-74.1903,skewY:105.8097,x:39.5,y:133.8,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:3.1942,x:16.2,y:92.35,regX:-1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-8.798,skewY:171.202,x:9.2,y:189.3,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-4.0542,skewY:175.9458,x:-38.1,y:182.8,regX:1.8,regY:-55.4}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.3693,x:-28.1,y:45,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:127.7045,skewY:-52.2955,x:-47.85,y:127.5,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:93.1686,skewY:-86.8314,x:-52.05,y:134.6,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-112.9766,x:-57.4,y:-23.05,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.2644,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.2179,skewY:174.7821,x:-0.85,y:-79.4}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:3.3429,x:-29.8,y:88.15,regX:1.8}},{t:this.instance_14,p:{rotation:77.7802,x:47.85,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1,rotation:102.9186,x:62.5,y:42.15}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-78.5966,skewY:101.4034,x:40.9,y:123.3,regX:-5.9}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-75.5277,skewY:104.4723,x:42.15,y:134.15,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:4.3206,x:16.2,y:92.35,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-7.6789,skewY:172.3211,x:7.2,y:189.05,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-5.1684,skewY:174.8316,x:-36.2,y:182.85,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.5304,x:-29.3,y:45.5,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:129.5339,skewY:-50.4661,x:-51.65,y:127.35,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:95.0073,skewY:-84.9927,x:-56,y:134.35,regX:6.5,regY:-1.6}},{t:this.instance_2,p:{rotation:-111.993,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.2294,x:-5.7,y:-57.7,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-5.0043,skewY:174.9957,x:-0.85,y:-79.4}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:2.2373,x:-29.6,y:88.15,regX:1.8}},{t:this.instance_14,p:{rotation:77.3599,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:101.6057,x:63.2,y:42.05}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-79.9237,skewY:100.0763,x:43.4,y:123.65,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-76.863,skewY:103.137,x:44.75,y:134.65,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:5.4481,x:16.15,y:92.4,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-6.5602,skewY:173.4398,x:5.25,y:188.8,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-6.2836,skewY:173.7163,x:-34.05,y:183.1,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.6924,x:-30.4,y:46,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:131.3639,skewY:-48.6361,x:-55.45,y:127.15,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,skewX:96.845,skewY:-83.155,x:-59.95,y:133.85,regX:6.6,regY:-1.6}},{t:this.instance_2,p:{rotation:-111.0093,x:-57.4,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.1961,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.7909,skewY:175.209,x:-0.85,y:-79.5}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:1.1333,x:-29.4,y:88.4,regX:1.8}},{t:this.instance_14,p:{rotation:76.9393,x:47.85,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:100.2946,x:63.75,y:42}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-81.2472,skewY:98.7528,x:45.75,y:124,regX:-5.9}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-78.202,skewY:101.798,x:47.5,y:134.75,regX:-4.9}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:6.574,x:16.15,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-5.4413,skewY:174.5587,x:3.2,y:188.6,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-7.3995,skewY:172.6003,x:-32.15,y:183.35,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.8543,x:-31.6,y:46.45,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:133.1928,skewY:-46.8072,x:-59.3,y:126.65,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:98.6845,skewY:-81.3155,x:-63.95,y:133.4,regX:6.5,regY:-1.6}},{t:this.instance_2,p:{rotation:-110.0258,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.1619,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.5766,skewY:175.4234,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:0.028,x:-29.25,y:88.5,regX:1.8}},{t:this.instance_14,p:{rotation:76.5181,x:47.85,regX:-31.3,y:-26.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:98.9835,x:64.25,y:41.9}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-82.5712,skewY:97.4288,x:48.05,y:124.15,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-79.5398,skewY:100.4602,x:50.15,y:135.05,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:7.6998,x:16.15,y:92.45,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:-4.3218,skewY:175.6782,x:1.4,y:188.4,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-8.5131,skewY:171.4869,x:-30.1,y:183.45,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.0166,x:-32.8,y:46.85,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:135.0217,skewY:-44.9783,x:-63,y:126.2,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:100.5234,skewY:-79.4766,x:-68.2,y:132.5,regX:6.7,regY:-1.4}},{t:this.instance_2,p:{rotation:-109.042,x:-57.4,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.1278,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.3651,skewY:175.6349,x:-0.75,y:-79.4}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-1.0702,x:-29.05,y:88.6,regX:1.8}},{t:this.instance_14,p:{rotation:76.0973,x:47.9,regX:-31.3,y:-26.35,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:97.6702,x:64.75,y:41.75}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-83.8958,skewY:96.1042,x:50.65,y:124.4,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-80.8764,skewY:99.1236,x:52.7,y:135.1,regX:-4.9}},{t:this.instance_10,p:{regY:1.6,scaleX:0.9979,scaleY:0.9979,rotation:8.8268,x:15.95,y:92.55,regX:-1.1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9979,scaleY:0.9979,skewX:-3.2031,skewY:176.7968,x:-0.5,y:188.2,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-9.6291,skewY:170.3709,x:-27.95,y:183.65,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.1781,x:-34,y:47.3,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:136.8512,skewY:-43.1488,x:-66.75,y:125.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:102.3615,skewY:-77.6385,x:-72.05,y:131.7,regX:6.7,regY:-1.4}},{t:this.instance_2,p:{rotation:-108.0586,x:-57.4,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.0937,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-4.1519,skewY:175.8481,x:-0.8,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-2.1742,x:-28.85,y:88.75,regX:1.8}},{t:this.instance_14,p:{rotation:75.6768,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:96.3582,x:65.25,y:41.5}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-85.2213,skewY:94.7787,x:52.95,y:124.55,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-82.2132,skewY:97.7868,x:55.3,y:135.35,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:9.9528,x:16.05,y:92.45,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9979,scaleY:0.9979,skewX:-2.0831,skewY:177.9169,x:-2.55,y:187.75,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-10.7439,skewY:169.2561,x:-25.95,y:183.65,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.3384,x:-35.3,y:47.65,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:138.6795,skewY:-41.3205,x:-70.5,y:124.8,regY:-9}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:104.2,skewY:-75.8,x:-75.8,y:130.9,regX:6.7,regY:-1.5}},{t:this.instance_2,p:{rotation:-107.0754,x:-57.45,y:-23,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.0595,x:-5.65,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.9378,skewY:176.0622,x:-0.8,y:-79.5}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-3.2798,x:-28.45,y:88.85,regX:1.9}},{t:this.instance_14,p:{rotation:75.255,x:47.85,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:95.0469,x:65.7,y:41.5}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-86.5453,skewY:93.4547,x:55.25,y:124.65,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-83.5511,skewY:96.4489,x:57.95,y:135.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:11.0809,x:15.9,y:92.45,regX:-1.1}},{t:this.instance_9,p:{regY:-53.4,scaleX:0.9978,scaleY:0.9978,skewX:-0.9647,skewY:179.0353,x:-4.15,y:187.3,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-11.8603,skewY:168.1395,x:-23.9,y:183.75,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-62.5013,x:-36.45,y:48.05,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:140.509,skewY:-39.491,x:-74.1,y:124.05,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:106.0383,skewY:-73.9617,x:-79.7,y:129.85,regX:6.7,regY:-1.5}},{t:this.instance_2,p:{rotation:-106.0915,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-2.0245,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.7255,skewY:176.2745,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-4.3831,x:-28.45,y:88.9,regX:1.8}},{t:this.instance_14,p:{rotation:74.8344,x:47.9,regX:-31.2,y:-26.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:93.7347,x:66.2,y:41.35}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-87.87,skewY:92.13,x:57.8,y:124.75,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-84.889,skewY:95.111,x:60.75,y:135.5,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:12.2062,x:16,y:92.45,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:0.1498,skewY:-179.8502,x:-6.1,y:187,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-12.9745,skewY:167.0255,x:-21.9,y:183.7,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-60.6628,x:-37.7,y:48.4,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:142.3393,skewY:-37.6607,x:-77.75,y:123.2,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:107.8769,skewY:-72.1231,x:-83.6,y:128.9,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-105.108,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.9894,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.5133,skewY:176.4867,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-5.4879,x:-28.2,y:89.1,regX:1.8}},{t:this.instance_14,p:{rotation:74.414,x:47.85,regX:-31.3,y:-26.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:92.4228,x:66.7,y:41.25}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-89.1944,skewY:90.8056,x:60.35,y:124.75,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-86.2249,skewY:93.7751,x:63.25,y:135.35,regX:-4.9}},{t:this.instance_10,p:{regY:1.4,scaleX:0.9979,scaleY:0.9979,rotation:13.3327,x:16.05,y:92.35,regX:-1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:1.2679,skewY:-178.7321,x:-7.95,y:186.7,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-14.0896,skewY:165.9102,x:-19.85,y:183.65,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-58.8245,x:-38.95,y:48.7,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:144.1682,skewY:-35.8318,x:-81.35,y:122.2,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:109.7152,skewY:-70.2848,x:-87.5,y:127.7,regX:6.6,regY:-1.4}},{t:this.instance_2,p:{rotation:-104.1233,x:-57.45,y:-22.9,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.9562,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.3003,skewY:176.6997,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-6.5923,x:-28.05,y:89.2,regX:1.8}},{t:this.instance_14,p:{rotation:73.9933,x:47.9,regX:-31.2,y:-26.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:91.1113,x:67.15,y:41}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-90.514,skewY:89.486,x:62.65,y:124.75,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-87.5641,skewY:92.4359,x:65.95,y:135.3,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:14.4593,x:16,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.4,scaleX:0.9979,scaleY:0.9979,skewX:2.3873,skewY:-177.6127,x:-10,y:185.95,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-15.2049,skewY:164.7951,x:-17.8,y:183.6,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-56.9863,x:-40.15,y:49,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:145.9973,skewY:-34.0027,x:-84.9,y:121.2,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:111.5526,skewY:-68.4474,x:-91.15,y:126.4,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-103.1403,x:-57.4,y:-22.8,regX:35.3,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.922,x:-5.7,y:-57.75,regY:9.1}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-3.0864,skewY:176.9136,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-7.6976,x:-27.85,y:89.25,regX:1.8}},{t:this.instance_14,p:{rotation:73.5714,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:89.8047,x:67.65,y:40.95}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-91.8382,skewY:88.1618,x:65.05,y:124.75,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-88.8992,skewY:91.1008,x:68.6,y:135.1,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:15.5859,x:15.95,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:3.5059,skewY:-176.4941,x:-11.75,y:185.5,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-16.319,skewY:163.681,x:-15.85,y:183.55,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-55.1477,x:-41.35,y:49.3,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:147.8259,skewY:-32.1741,x:-88.45,y:120,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:113.392,skewY:-66.608,x:-94.9,y:125,regX:6.6,regY:-1.4}},{t:this.instance_2,p:{rotation:-102.1565,x:-57.45,y:-22.9,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.8878,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.8735,skewY:177.1265,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-8.8019,x:-27.5,y:89.35,regX:1.9}},{t:this.instance_14,p:{rotation:73.1517,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:88.4919,x:68.2,y:40.85}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9985,scaleY:0.9985,skewX:-93.1626,skewY:86.8374,x:67.3,y:124.7,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-90.2338,skewY:89.7662,x:71.25,y:134.9,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:16.7125,x:15.9,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:4.6259,skewY:-175.3741,x:-13.6,y:185.05,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-17.4337,skewY:162.5663,x:-13.8,y:183.4,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-53.3096,x:-42.65,y:49.5,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:149.6553,skewY:-30.3447,x:-91.9,y:118.65,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:115.2309,skewY:-64.7691,x:-98.5,y:123.6,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-101.1739,x:-57.45,y:-22.8,regX:35.3,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.8537,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.6614,skewY:177.3386,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-9.9061,x:-27.5,y:89.45,regX:1.8}},{t:this.instance_14,p:{rotation:72.7312,x:47.95,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:87.1818,x:68.65,y:40.65}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-94.487,skewY:85.513,x:69.85,y:124.6,regX:-5.9}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-91.5703,skewY:88.4297,x:73.85,y:134.65,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:17.839,x:15.9,y:92.55,regX:-1}},{t:this.instance_9,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:5.7459,skewY:-174.2541,x:-15.55,y:184.5,regX:3.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-18.5491,skewY:161.4509,x:-11.75,y:183.2,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-51.4701,x:-43.9,y:49.85,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:151.4854,skewY:-28.5146,x:-95.4,y:117.3,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:117.0699,skewY:-62.9301,x:-102,y:122.05,regX:6.6,regY:-1.6}},{t:this.instance_2,p:{rotation:-100.1891,x:-57.4,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.8196,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.4476,skewY:177.5524,x:-0.75,y:-79.45}},{t:this.instance_15,p:{regY:-46,scaleX:0.9983,scaleY:0.9983,rotation:-11.0113,x:-27.25,y:89.5,regX:1.8}},{t:this.instance_14,p:{rotation:72.3091,x:48,regX:-31.2,y:-26.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.8,regY:-1.1,rotation:85.8694,x:69.2,y:40.4}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9985,scaleY:0.9985,skewX:-95.8111,skewY:84.1889,x:72.3,y:124.3,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-92.9085,skewY:87.0915,x:76.55,y:134.4,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:18.9655,x:15.9,y:92.6,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:6.8645,skewY:-173.1355,x:-17.25,y:183.85,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-19.6643,skewY:160.3357,x:-9.9,y:183.05,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-49.6329,x:-45.15,y:50.05,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,skewX:153.3143,skewY:-26.6857,x:-98.75,y:115.8,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:118.9079,skewY:-61.0921,x:-105.6,y:120.3,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-99.2056,x:-57.45,y:-22.95,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.7854,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.2339,skewY:177.7661,x:-0.7,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-12.1145,x:-27.05,y:89.65,regX:1.8}},{t:this.instance_14,p:{rotation:71.8877,x:47.9,regX:-31.2,y:-26.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:84.5574,x:69.7,y:40.4}},{t:this.instance_12,p:{regY:8.4,scaleX:0.9984,scaleY:0.9984,skewX:-97.1358,skewY:82.8642,x:74.55,y:124,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-94.2447,skewY:85.7553,x:79.25,y:134.05,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:20.0914,x:15.85,y:92.6,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:7.9831,skewY:-172.0169,x:-19.05,y:183.15,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-20.7796,skewY:159.2204,x:-7.85,y:182.75,regX:1.9,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-47.7937,x:-46.4,y:50.2,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:155.1435,skewY:-24.8565,x:-102.1,y:114.25,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:120.7464,skewY:-59.2536,x:-109.1,y:118.55,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-98.223,x:-57.45,y:-23,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.7504,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-2.0211,skewY:177.9789,x:-0.65,y:-79.5}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-13.2193,x:-26.8,y:89.8,regX:1.8}},{t:this.instance_14,p:{rotation:71.4679,x:48,regX:-31.2,y:-26.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{regX:-39.6,regY:-1.1,rotation:83.2452,x:70.15,y:40.3}},{t:this.instance_12,p:{regY:8.6,scaleX:0.9984,scaleY:0.9984,skewX:-98.4605,skewY:81.5395,x:77.15,y:123.7,regX:-6}},{t:this.instance_11,p:{regY:3.3,scaleX:0.9984,scaleY:0.9984,skewX:-95.5833,skewY:84.4167,x:82,y:133.75,regX:-4.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:21.2188,x:15.8,y:92.6,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:9.1032,skewY:-170.8968,x:-20.85,y:182.45,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-21.8948,skewY:158.1052,x:-5.75,y:182.45,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-45.9555,x:-47.65,y:50.4,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:156.972,skewY:-23.028,x:-105.4,y:112.6,regY:-9.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:122.5853,skewY:-57.4147,x:-112.5,y:116.65,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-97.2386,x:-57.4,y:-22.9,regX:35.4,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_17,p:{regX:-1.2,rotation:-1.7163,x:-5.7,y:-57.65,regY:9.2}},{t:this.instance_16,p:{scaleX:0.999,scaleY:0.999,skewX:-1.8083,skewY:178.1917,x:-0.65,y:-79.45}},{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-14.323,x:-26.6,y:89.9,regX:1.8}},{t:this.instance_14,p:{rotation:71.0486,x:47.9,regX:-31.2,y:-26.25,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_13,p:{regX:-39.7,regY:-1.1,rotation:81.9339,x:70.7,y:40.05}},{t:this.instance_12,p:{regY:8.5,scaleX:0.9984,scaleY:0.9984,skewX:-99.7846,skewY:80.2154,x:79.55,y:123.35,regX:-6}},{t:this.instance_11,p:{regY:3.2,scaleX:0.9984,scaleY:0.9984,skewX:-96.9189,skewY:83.0811,x:84.45,y:133.1,regX:-4.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:22.3445,x:15.85,y:92.65,regX:-1}},{t:this.instance_9,p:{regY:-53.3,scaleX:0.9978,scaleY:0.9978,skewX:10.2212,skewY:-169.7788,x:-22.65,y:181.75,regX:3.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9982,scaleY:0.9982,skewX:-23.0093,skewY:156.9907,x:-3.7,y:182.2,regX:1.8,regY:-55.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-44.1164,x:-48.95,y:50.55,regX:44,regY:0}},{t:this.instance_4,p:{scaleX:0.9984,scaleY:0.9984,skewX:158.8022,skewY:-21.1978,x:-108.7,y:110.8,regY:-9}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,skewX:124.4237,skewY:-55.5763,x:-115.85,y:114.7,regX:6.6,regY:-1.5}},{t:this.instance_2,p:{rotation:-96.2554,x:-57.5,y:-22.95,regX:35.4,scaleX:0.9983,scaleY:0.9983}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-141.1,-365.2,255.7,669.8);


(lib.CharacterGood_01 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.CachedBmp_2275();
	this.instance.setTransform(-83.05,-348,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2274();
	this.instance_1.setTransform(-127.05,-370.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(50));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_2.setTransform(-57.25,-22.95,0.9989,0.9989,-110.0609,0,0,35.8,0.6);

	this.instance_3 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_3.setTransform(-52.95,138.2,0.9987,0.9987,0,99.828,-80.172,6.9,-1);

	this.instance_4 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_4.setTransform(-54.9,129.75,0.9989,0.9989,0,87.6012,-92.3988,5.8,-8.3);

	this.instance_5 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_5.setTransform(-31.8,47.25,0.9988,0.9988,-74.011,0,0,44.2,0.1);

	this.instance_6 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_6.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_7 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_7.setTransform(-45.95,184.5,0.9986,0.9986,0,12.4089,-167.5911,3.4,-54.8);

	this.instance_8 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_9.setTransform(27.8,188.85,0.9982,0.9982,0,-11.6011,168.3989,2.5,-54.4);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(17.05,92.2,0.9982,0.9982,-6.9871,0,0,-0.5,1.4);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(22.95,130.65,0.9989,0.9989,0,-62.822,117.178,-5.2,3.2);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(26.15,119.8,0.9989,0.9989,0,-55.4302,124.5698,-6.5,8);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(61.5,47.15,0.9989,0.9989,116.1188,0,0,-40.1,-0.1);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(47.55,-26.2,0.9989,0.9989,80.0654,0,0,-31.9,-1);

	this.instance_15 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_15.setTransform(-23.15,91.2,0.9987,0.9987,11.8968,0,0,1.9,-45.8);

	this.instance_16 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_16.setTransform(4.3,-78.6,0.9993,0.9993,0,-1.7395,178.2605,0.4,53.6);

	this.instance_17 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_17.setTransform(-4.75,-57.9,0.9993,0.9993,-1.6878,0,0,-0.3,9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{regX:-0.3,rotation:-1.6878,x:-4.75,y:-57.9}},{t:this.instance_16,p:{skewX:-1.7395,skewY:178.2605,x:4.3,y:-78.6,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9987,scaleY:0.9987,rotation:11.8968,y:91.2,x:-23.15}},{t:this.instance_14,p:{scaleX:0.9989,scaleY:0.9989,rotation:80.0654,x:47.55,y:-26.2,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:116.1188,x:61.5,y:47.15}},{t:this.instance_12,p:{scaleX:0.9989,scaleY:0.9989,skewX:-55.4302,skewY:124.5698,x:26.15,y:119.8,regY:8}},{t:this.instance_11,p:{regX:-5.2,regY:3.2,scaleX:0.9989,scaleY:0.9989,skewX:-62.822,skewY:117.178,x:22.95,y:130.65}},{t:this.instance_10,p:{rotation:-6.9871,x:17.05,y:92.2,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,skewX:-11.6011,skewY:168.3989,x:27.8,y:188.85,regY:-54.4,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.4,scaleX:0.9986,scaleY:0.9986,skewX:12.4089,skewY:-167.5911,x:-45.95,y:184.5,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-74.011,x:-31.8,y:47.25,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:87.6012,skewY:-92.3988,x:-54.9,y:129.75,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:99.828,skewY:-80.172,x:-52.95,y:138.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_2,p:{regX:35.8,regY:0.6,scaleX:0.9989,scaleY:0.9989,rotation:-110.0609,x:-57.25,y:-22.95}}]}).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.7229,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-2.0381,skewY:177.9619,x:4.25,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:11.198,y:91.25,x:-23.15}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.45,x:47.5,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:115.0727,x:62.25,y:46.95}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-56.4748,skewY:123.5252,x:28.2,y:120.3,regY:8}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-63.8683,skewY:116.1317,x:25.3,y:131.25}},{t:this.instance_10,p:{rotation:-5.678,x:17.1,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-10.8233,skewY:169.1767,x:25.55,y:189.05,regY:-54.4,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:11.03,skewY:-168.97,x:-44.95,y:184.8,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-72.8825,x:-32.95,y:47.65,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:88.7308,skewY:-91.2692,x:-57.65,y:129.6,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1.1,skewX:100.9573,skewY:-79.0427,x:-55.8,y:138.35,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-109.1175,x:-57.3,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.7588,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-2.3367,skewY:177.6633,x:4.2,y:-78.75,regY:53.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,scaleX:0.9986,scaleY:0.9986,rotation:10.4983,y:91.3,x:-23.2}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:78.8351,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:114.0266,x:62.95,y:46.8}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-57.521,skewY:122.479,x:30.25,y:120.65,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-64.9133,skewY:115.0867,x:27.65,y:131.8}},{t:this.instance_10,p:{rotation:-4.3687,x:17.1,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-10.0457,skewY:169.9543,x:23.35,y:189.45,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:9.6487,skewY:-170.3513,x:-43.85,y:185,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-71.7519,x:-34.1,y:48,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:89.8617,skewY:-90.1383,x:-60.4,y:129.55,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:102.0886,skewY:-77.9114,x:-58.9,y:138.2,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-108.1748,x:-57.3,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.7947,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-2.6353,skewY:177.3647,x:4.15,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:9.7983,y:91.2,x:-23.3}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:78.2197,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:112.9807,x:63.75,y:46.65}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-58.5668,skewY:121.4332,x:32.45,y:121.05,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-65.9595,skewY:114.0405,x:30,y:132.2}},{t:this.instance_10,p:{rotation:-3.06,x:17.1,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-9.2682,skewY:170.7318,x:21.1,y:189.45,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:8.2687,skewY:-171.7313,x:-42.7,y:185.25,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-70.6211,x:-35.3,y:48.35,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:90.9864,skewY:-89.0136,x:-63.15,y:129.3,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:103.2173,skewY:-76.7827,x:-61.85,y:138.1,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-107.2319,x:-57.15,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.8306,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-2.9331,skewY:177.0668,x:4.15,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:9.0986,y:91.2,x:-23.3}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:77.6056,x:47.5,y:-26.2,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:111.9348,x:64.5,y:46.45}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-59.6131,skewY:120.3869,x:34.6,y:121.5,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-67.0058,skewY:112.9942,x:32.4,y:132.6}},{t:this.instance_10,p:{rotation:-1.7503,x:17.1,y:92.05,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-8.4907,skewY:171.5093,x:18.95,y:189.5,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:6.8879,skewY:-173.1121,x:-41.55,y:185.55,regY:-54.7}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-69.4905,x:-36.5,y:48.7,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:92.1177,skewY:-87.8823,x:-66,y:129.15,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:104.3486,skewY:-75.6514,x:-64.8,y:137.85,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-106.2904,x:-57.25,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.8665,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.2328,skewY:176.7672,x:4.15,y:-78.75,regY:53.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:8.399,y:91.15,x:-23.35}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.99,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:110.8886,x:65.3,y:46.3}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-60.6597,skewY:119.3403,x:36.8,y:121.85,regY:8}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-68.0529,skewY:111.9471,x:34.65,y:133.1}},{t:this.instance_10,p:{rotation:-0.4414,x:17.15,y:92.05,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-7.7129,skewY:172.287,x:16.9,y:189.55,regY:-54.2,regX:2.4}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:5.5086,skewY:-174.4914,x:-40.5,y:185.65,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-68.3607,x:-37.6,y:49,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:93.2472,skewY:-86.7528,x:-68.55,y:128.85,regY:-8.4,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:105.4789,skewY:-74.5211,x:-67.75,y:137.6,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-105.346,x:-57.2,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.9024,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.5317,skewY:176.4683,x:4.1,y:-78.8,regY:53.5,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:7.7005,y:91.1,x:-23.3}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.375,x:47.35,y:-26.25,regY:-0.9}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:109.8425,x:66.15,y:46.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-61.7056,skewY:118.2944,x:39,y:122.2,regY:8}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-69.0985,skewY:110.9015,x:37.1,y:133.5}},{t:this.instance_10,p:{rotation:0.8645,x:17.2,y:92.05,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-6.9359,skewY:173.0641,x:14.5,y:189.45,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:4.1292,skewY:-175.8708,x:-39.35,y:185.85,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-67.2306,x:-38.8,y:49.4,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:94.3779,skewY:-85.6221,x:-71.45,y:128.55,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:106.6088,skewY:-73.3912,x:-70.65,y:137.35,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-104.4031,x:-57.2,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.9382,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-3.8289,skewY:176.1711,x:4.1,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:7.0013,y:91.1,x:-23.4}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:75.7589,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:108.7975,x:66.85,y:45.9}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-62.7515,skewY:117.2485,x:41,y:122.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-70.1446,skewY:109.8554,x:39.5,y:133.55}},{t:this.instance_10,p:{rotation:2.1727,x:17.2,y:92,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-6.159,skewY:173.841,x:12.35,y:189.2,regY:-54.4,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:2.7477,skewY:-177.2523,x:-38.25,y:186.05,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-66.1006,x:-40,y:49.65,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:95.5085,skewY:-84.4915,x:-74.2,y:128.15,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:107.7403,skewY:-72.2597,x:-73.65,y:137,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_2,p:{regX:35.8,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-103.4594,x:-57.15,y:-22.95}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.9741,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-4.1288,skewY:175.8712,x:4.05,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:6.3015,y:91.1,x:-23.45}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:75.1441,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:107.7504,x:67.65,y:45.65}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-63.7986,skewY:116.2014,x:43.15,y:122.75,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-71.1911,skewY:108.8089,x:41.75,y:133.95}},{t:this.instance_10,p:{rotation:3.482,x:17.2,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-5.3807,skewY:174.6192,x:10.1,y:189.3,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:1.3668,skewY:-178.6332,x:-37.1,y:186.15,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-64.9705,x:-41.15,y:49.95,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:96.6389,skewY:-83.3611,x:-76.95,y:127.8,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:108.8702,skewY:-71.1298,x:-76.45,y:136.5,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-102.5173,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.0109,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-4.4272,skewY:175.5728,x:4.1,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,scaleX:0.9986,scaleY:0.9986,rotation:5.6017,y:91.15,x:-23.45}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.53,x:47.45,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:106.7045,x:68.35,y:45.5}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-64.8447,skewY:115.1553,x:45.4,y:122.85,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-72.236,skewY:107.764,x:44.15,y:134.15}},{t:this.instance_10,p:{rotation:4.7914,x:17.25,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-4.6035,skewY:175.3965,x:7.95,y:189.05,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-0.0079,skewY:179.9921,x:-35.95,y:186.35,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-63.8397,x:-42.4,y:50.3,regX:44.1,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:97.7689,skewY:-82.2311,x:-79.65,y:127.25,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:109.9999,skewY:-70.0001,x:-79.45,y:136.1,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-101.5758,x:-57.2,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.0468,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-4.7264,skewY:175.2736,x:4.1,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:4.9017,y:91,x:-23.45}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.9141,x:47.3,y:-26.3,regY:-0.9}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:105.6577,x:69.15,y:45.25}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-65.8897,skewY:114.1103,x:47.5,y:123.05,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.2,scaleX:0.9988,scaleY:0.9988,skewX:-73.2826,skewY:106.7174,x:46.45,y:134.3}},{t:this.instance_10,p:{rotation:6.0998,x:17.2,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-3.8263,skewY:176.1737,x:5.7,y:188.6,regY:-54.4,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:-1.387,skewY:178.613,x:-34.8,y:186.45,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-62.7103,x:-43.6,y:50.35,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:98.8995,skewY:-81.1005,x:-82.35,y:126.95,regY:-8.4,regX:5.7,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:111.1297,skewY:-68.8703,x:-82.25,y:135.45,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-100.632,x:-57.2,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.0827,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-5.0241,skewY:174.9759,x:4.15,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:4.2027,y:91,x:-23.5}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.2994,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:104.6128,x:69.9,y:45.05}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-66.9355,skewY:113.0645,x:49.7,y:123.25,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-74.3295,skewY:105.6705,x:48.95,y:134.5}},{t:this.instance_10,p:{rotation:7.4088,x:17.25,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-3.0487,skewY:176.9513,x:3.55,y:188.6,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-2.7678,skewY:177.2322,x:-33.75,y:186.6,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-61.5787,x:-44.8,y:50.65,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:100.03,skewY:-79.97,x:-85.1,y:126.25,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:112.2602,skewY:-67.7398,x:-85.2,y:135.05,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-99.6885,x:-57.25,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.1186,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-5.3228,skewY:174.6772,x:4.1,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:3.5033,y:91,x:-23.55}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:72.6842,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:103.5662,x:70.65,y:44.6}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-67.9829,skewY:112.0171,x:51.9,y:123.35,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-75.3755,skewY:104.6245,x:51.4,y:134.6}},{t:this.instance_10,p:{rotation:8.7197,x:17.3,y:91.9,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-2.2718,skewY:177.7282,x:1.3,y:188.1,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9986,skewX:-4.1476,skewY:175.8524,x:-32.6,y:186.65,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-60.4483,x:-46,y:50.8,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:101.1601,skewY:-78.8399,x:-87.85,y:125.55,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:113.3909,skewY:-66.6091,x:-88.05,y:134.4,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-98.746,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.1545,x:-4.7,y:-57.85}},{t:this.instance_16,p:{skewX:-5.6226,skewY:174.3774,x:4.1,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:2.8036,y:90.95,x:-23.55}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:72.0688,x:47.45,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:102.5195,x:71.4,y:44.4}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-69.0282,skewY:110.9718,x:54.1,y:123.35,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-76.4213,skewY:103.5787,x:53.8,y:134.7}},{t:this.instance_10,p:{rotation:10.0274,x:17.3,y:91.9,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,skewX:-1.4936,skewY:178.5064,x:-0.8,y:187.55,regY:-54.4,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-5.529,skewY:174.471,x:-31.4,y:186.85,regY:-54.7}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-59.3186,x:-47.15,y:50.95,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:102.2901,skewY:-77.7099,x:-90.5,y:125,regY:-8.3,regX:5.7,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:114.5213,skewY:-65.4787,x:-90.95,y:133.7,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-97.8031,x:-57.2,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.1904,x:-4.7,y:-57.85}},{t:this.instance_16,p:{skewX:-5.9206,skewY:174.0794,x:4.1,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:2.1034,y:90.9,x:-23.65}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:71.4549,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:101.4732,x:72.15,y:44.15}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-70.0743,skewY:109.9257,x:56.25,y:123.45,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-77.4682,skewY:102.5318,x:56.15,y:134.75}},{t:this.instance_10,p:{rotation:11.336,x:17.35,y:91.9,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9982,skewX:-0.7165,skewY:179.2835,x:-3,y:187.25,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-6.91,skewY:173.09,x:-30.3,y:186.8,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-58.1882,x:-48.45,y:51.1,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:103.4212,skewY:-76.5788,x:-93.2,y:124.2,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1.1,skewX:115.6512,skewY:-64.3488,x:-93.7,y:133.1,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-96.8604,x:-57.2,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.2263,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-6.2189,skewY:173.7811,x:4.05,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,scaleX:0.9986,scaleY:0.9986,rotation:1.4044,y:91.05,x:-23.7}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:70.8385,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:100.4276,x:72.95,y:43.85}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-71.1199,skewY:108.8801,x:58.5,y:123.45,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-78.5134,skewY:101.4866,x:58.6,y:134.75}},{t:this.instance_10,p:{rotation:12.6461,x:17.3,y:91.9,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:0.0561,skewY:-179.9439,x:-5.05,y:186.75,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-8.2882,skewY:171.7118,x:-29.2,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-57.0577,x:-49.65,y:51.3,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:104.5504,skewY:-75.4496,x:-95.8,y:123.45,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:116.782,skewY:-63.218,x:-96.6,y:132.2,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-95.918,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.2622,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-6.5183,skewY:173.4817,x:4.1,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:0.7048,y:90.8,x:-23.7}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:70.2244,x:47.45,y:-26.4,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:99.381,x:73.7,y:43.65}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-72.166,skewY:107.834,x:60.75,y:123.35,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-79.5592,skewY:100.4408,x:61,y:134.75}},{t:this.instance_10,p:{rotation:13.9545,x:17.35,y:91.85,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:0.8339,skewY:-179.1661,x:-7.15,y:186.1,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-9.6682,skewY:170.3318,x:-28,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-55.9273,x:-50.8,y:51.35,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:105.6802,skewY:-74.3198,x:-98.45,y:122.6,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1.1,skewX:117.912,skewY:-62.088,x:-99.25,y:131.3,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-94.9745,x:-57.2,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.2981,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-6.8169,skewY:173.1831,x:4.05,y:-78.6,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:0.0044,y:90.85,x:-23.75}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:69.6097,x:47.5,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:98.3357,x:74.45,y:43.25}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-73.2122,skewY:106.7878,x:63.05,y:123.35,regY:8}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-80.606,skewY:99.394,x:63.45,y:134.65}},{t:this.instance_10,p:{rotation:15.2653,x:17.4,y:91.75,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,skewX:1.611,skewY:-178.389,x:-9.3,y:185.55,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-11.0498,skewY:168.9502,x:-26.95,y:186.95,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-54.797,x:-52.05,y:51.5,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:106.8106,skewY:-73.1894,x:-101.05,y:121.8,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:119.043,skewY:-60.957,x:-102.2,y:130.5,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-94.0315,x:-57.15,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.3331,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-7.1156,skewY:172.8844,x:4.1,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-0.6899,y:90.85,x:-23.8}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:68.9944,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:97.2887,x:75.25,y:42.9}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-74.2588,skewY:105.7412,x:65.1,y:123.2,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-81.6525,skewY:98.3475,x:65.85,y:134.55}},{t:this.instance_10,p:{rotation:16.5742,x:17.4,y:91.75,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:2.3893,skewY:-177.6107,x:-11.45,y:184.95,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.4,scaleX:0.9985,scaleY:0.9985,skewX:-12.4287,skewY:167.5713,x:-25.65,y:186.95,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-53.6663,x:-53.3,y:51.5,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:107.9414,skewY:-72.0586,x:-103.65,y:120.85,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:120.1729,skewY:-59.8271,x:-105.05,y:129.5,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-93.0896,x:-57.15,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.369,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-7.4148,skewY:172.5852,x:4,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-1.3895,y:90.85,x:-23.8}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:68.3792,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:96.2441,x:75.9,y:42.75}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-75.3039,skewY:104.6961,x:67.35,y:123.05,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-82.6986,skewY:97.3014,x:68.25,y:134.35}},{t:this.instance_10,p:{rotation:17.884,x:17.45,y:91.75,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:3.1663,skewY:-176.8337,x:-13.55,y:184.2,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-13.8086,skewY:166.1914,x:-24.6,y:186.95,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-52.5359,x:-54.55,y:51.55,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:109.0716,skewY:-70.9284,x:-106.1,y:119.95,regY:-8.4,regX:5.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:121.3035,skewY:-58.6965,x:-107.7,y:128.5,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-92.1468,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.4049,x:-4.7,y:-57.8}},{t:this.instance_16,p:{skewX:-7.7122,skewY:172.2878,x:4,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-2.0885,y:90.85,x:-23.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:67.7622,x:47.4,y:-26.4,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:95.1966,x:76.65,y:42.4}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-76.3503,skewY:103.6497,x:69.6,y:122.9,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-83.7439,skewY:96.2561,x:70.7,y:134.2}},{t:this.instance_10,p:{rotation:19.1931,x:17.5,y:91.75,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:3.9439,skewY:-176.0561,x:-15.6,y:183.6,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.4,scaleX:0.9985,scaleY:0.9985,skewX:-15.1896,skewY:164.8104,x:-23.45,y:186.85,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-51.4068,x:-55.75,y:51.6,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:110.2022,skewY:-69.7978,x:-108.7,y:118.95,regY:-8.4,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:122.4332,skewY:-57.5668,x:-110.45,y:127.5,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-91.2028,x:-57.2,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.4408,x:-4.7,y:-57.8}},{t:this.instance_16,p:{skewX:-8.0107,skewY:171.9893,x:3.95,y:-78.7,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:-2.7887,y:90.65,x:-23.95}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:67.1497,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:94.1507,x:77.35,y:42.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-77.3975,skewY:102.6025,x:71.8,y:122.7,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-84.7891,skewY:95.2109,x:73.1,y:134}},{t:this.instance_10,p:{rotation:20.5019,x:17.45,y:91.7,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:4.7213,skewY:-175.2787,x:-17.7,y:182.7,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-16.5698,skewY:163.4299,x:-22.3,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-50.2756,x:-57,y:51.6,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:111.3325,skewY:-68.6675,x:-111.4,y:117.85,regY:-8.3,regX:5.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:123.5636,skewY:-56.4364,x:-113.15,y:126.4,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-90.26,x:-57.1,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.4767,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-8.3103,skewY:171.6897,x:4.05,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-3.4875,y:90.8,x:-24}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:66.5336,x:47.45,y:-26.4,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:93.1052,x:78.1,y:41.8}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-78.4422,skewY:101.5578,x:73.95,y:122.55,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-85.836,skewY:94.164,x:75.45,y:133.7}},{t:this.instance_10,p:{rotation:21.8108,x:17.65,y:91.75,scaleX:0.9981,scaleY:0.9981,regX:-0.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:5.4987,skewY:-174.5013,x:-19.7,y:181.85,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-17.9496,skewY:162.0504,x:-21.15,y:186.85,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-49.1452,x:-58.2,y:51.55,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:112.4625,skewY:-67.5375,x:-113.85,y:116.75,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:124.6932,skewY:-55.3068,x:-115.9,y:125.2,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-89.3216,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.5126,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-8.6092,skewY:171.3907,x:3.95,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-4.1877,y:90.75,x:-24}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:65.9179,x:47.4,y:-26.4,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:92.059,x:78.9,y:41.45}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-79.4892,skewY:100.5108,x:76.15,y:122.25,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.4,scaleX:0.9988,scaleY:0.9988,skewX:-86.8823,skewY:93.1177,x:78.05,y:133.4}},{t:this.instance_10,p:{rotation:23.1206,x:17.5,y:91.65,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:6.2755,skewY:-173.7245,x:-21.8,y:181.1,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-19.3301,skewY:160.6699,x:-20.15,y:186.75,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-48.0151,x:-59.45,y:51.55,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:113.5935,skewY:-66.4065,x:-116.35,y:115.65,regY:-8.3,regX:5.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:125.8244,skewY:-54.1756,x:-118.6,y:124.15,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-88.3796,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.5494,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-8.9059,skewY:171.0941,x:3.95,y:-78.7,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.6,scaleX:0.9986,scaleY:0.9986,rotation:-4.8869,y:90.9,x:-24}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:65.3037,x:47.4,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:91.0127,x:79.6,y:41.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-80.5352,skewY:99.4648,x:78.4,y:121.9,regY:7.9}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-87.9277,skewY:92.0723,x:80.3,y:132.9}},{t:this.instance_10,p:{rotation:24.4294,x:17.45,y:91.65,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:7.0542,skewY:-172.9458,x:-23.8,y:180,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-20.7092,skewY:159.2908,x:-18.95,y:186.65,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-46.8851,x:-60.7,y:51.55,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:114.7234,skewY:-65.2766,x:-118.75,y:114.5,regY:-8.4,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:126.9538,skewY:-53.0462,x:-121.15,y:122.8,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-87.4363,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.5152,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-8.6236,skewY:171.3764,x:3.95,y:-78.7,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-4.2106,y:90.8,x:-23.95}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:65.9006,x:47.4,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:92.0249,x:78.85,y:41.5}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-79.5175,skewY:100.4825,x:76.25,y:122.2,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-86.9139,skewY:93.0861,x:77.95,y:133.4}},{t:this.instance_10,p:{rotation:23.1759,x:17.45,y:91.65,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:6.3089,skewY:-173.6911,x:-21.9,y:181,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-19.3736,skewY:160.6264,x:-20.15,y:186.75,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-47.9656,x:-59.55,y:51.6,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:113.6449,skewY:-66.3551,x:-116.5,y:115.6,regY:-8.3,regX:5.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:125.8671,skewY:-54.1329,x:-118.65,y:124.05,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-88.3393,x:-57.1,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.4819,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-8.3386,skewY:171.6614,x:3.95,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-3.5331,y:90.8,x:-23.95}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:66.4975,x:47.4,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:93.0368,x:78.15,y:41.75}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-78.4994,skewY:101.5006,x:74.1,y:122.45,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-85.8983,skewY:94.1017,x:75.65,y:133.7}},{t:this.instance_10,p:{rotation:21.9245,x:17.65,y:91.7,scaleX:0.9982,scaleY:0.9982,regX:-0.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:5.5648,skewY:-174.4352,x:-19.95,y:181.75,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-18.0371,skewY:161.9629,x:-21.05,y:186.8,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-49.0471,x:-58.3,y:51.55,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:112.5649,skewY:-67.4351,x:-114.15,y:116.7,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:124.7806,skewY:-55.2194,x:-116.2,y:125.15,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-89.242,x:-57.15,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.4487,x:-4.7,y:-57.8}},{t:this.instance_16,p:{skewX:-8.0557,skewY:171.9443,x:3.95,y:-78.7,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:-2.8562,y:90.65,x:-23.95}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:67.0928,x:47.35,y:-26.35,regY:-0.9}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:94.048,x:77.4,y:42.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-77.4825,skewY:102.5175,x:72,y:122.65,regY:7.9}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-84.8832,skewY:95.1168,x:73.35,y:134.05}},{t:this.instance_10,p:{rotation:20.6727,x:17.5,y:91.65,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:4.8207,skewY:-175.1793,x:-18,y:182.6,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-16.7008,skewY:163.2992,x:-22.2,y:186.85,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-50.1289,x:-57.15,y:51.55,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:111.4874,skewY:-68.5126,x:-111.7,y:117.75,regY:-8.3,regX:5.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:123.6935,skewY:-56.3065,x:-113.5,y:126.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-90.14,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.4154,x:-4.7,y:-57.8}},{t:this.instance_16,p:{skewX:-7.7705,skewY:172.2295,x:4,y:-78.7,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-2.1797,y:90.8,x:-23.9}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:67.69,x:47.4,y:-26.4,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:95.0604,x:76.75,y:42.4}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-76.4648,skewY:103.5352,x:69.8,y:122.9,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.4,scaleX:0.9988,scaleY:0.9988,skewX:-83.8681,skewY:96.1319,x:71.1,y:134.2}},{t:this.instance_10,p:{rotation:19.4205,x:17.55,y:91.75,scaleX:0.9982,scaleY:0.9982,regX:-0.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:4.0764,skewY:-175.9236,x:-16,y:183.45,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-15.3638,skewY:164.6362,x:-23.3,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-51.2106,x:-55.9,y:51.6,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:110.4074,skewY:-69.5926,x:-109.3,y:118.75,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:122.6076,skewY:-57.3924,x:-110.95,y:127.3,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-91.0434,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.3821,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-7.488,skewY:172.512,x:4.05,y:-78.7,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-1.5025,y:90.85,x:-23.85}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:68.286,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:96.0725,x:76.05,y:42.6}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-75.447,skewY:104.553,x:67.8,y:123.05,regY:8}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-82.8521,skewY:97.1479,x:68.6,y:134.35}},{t:this.instance_10,p:{rotation:18.1677,x:17.45,y:91.75,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:3.3321,skewY:-176.6679,x:-13.95,y:184,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-14.028,skewY:165.972,x:-24.4,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-52.2913,x:-54.75,y:51.6,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:109.3287,skewY:-70.6713,x:-106.8,y:119.7,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:121.52,skewY:-58.48,x:-108.25,y:128.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-91.947,x:-57.15,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.3489,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-7.2038,skewY:172.7962,x:4.05,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:-0.8247,y:90.75,x:-23.85}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:68.8819,x:47.45,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:97.0832,x:75.3,y:43}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-74.4297,skewY:105.5703,x:65.55,y:123.25,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.2,scaleX:0.9988,scaleY:0.9988,skewX:-81.8362,skewY:98.1638,x:66.2,y:134.5}},{t:this.instance_10,p:{rotation:16.9153,x:17.4,y:91.8,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:2.5874,skewY:-177.4126,x:-12,y:184.75,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.4,scaleX:0.9985,scaleY:0.9985,skewX:-12.6913,skewY:167.3087,x:-25.4,y:186.85,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-53.3715,x:-53.6,y:51.5,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:108.2501,skewY:-71.7499,x:-104.35,y:120.65,regY:-8.3,regX:5.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:120.4327,skewY:-59.5673,x:-105.7,y:129.3,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.8,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-92.8503,x:-57.15,y:-22.95}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.3165,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-6.9191,skewY:173.0809,x:4.1,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:-0.1488,y:90.85,x:-23.8}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:69.4787,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:98.0961,x:74.6,y:43.25}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-73.4124,skewY:106.5876,x:63.45,y:123.35,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-80.8197,skewY:99.1803,x:63.95,y:134.65}},{t:this.instance_10,p:{rotation:15.6635,x:17.35,y:91.75,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.8441,skewY:-178.1559,x:-9.95,y:185.35,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-11.3558,skewY:168.6442,x:-26.6,y:186.95,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-54.4523,x:-52.45,y:51.45,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:107.1711,skewY:-72.8289,x:-101.85,y:121.5,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:119.3479,skewY:-60.6521,x:-103.05,y:130.2,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-93.7533,x:-57.2,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.2832,x:-4.75,y:-57.8}},{t:this.instance_16,p:{skewX:-6.6355,skewY:173.3645,x:4.05,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:0.5244,y:90.8,x:-23.75}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:70.0746,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:99.1079,x:73.8,y:43.6}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-72.3941,skewY:107.6059,x:61.25,y:123.35,regY:7.9}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-79.8058,skewY:100.1942,x:61.65,y:134.85}},{t:this.instance_10,p:{rotation:14.4108,x:17.3,y:91.85,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:1.0993,skewY:-178.9007,x:-7.95,y:185.95,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:-10.0182,skewY:169.9818,x:-27.75,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-55.534,x:-51.2,y:51.35,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:106.0933,skewY:-73.9067,x:-99.35,y:122.35,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:118.2598,skewY:-61.7402,x:-100.35,y:131,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-94.6556,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.2499,x:-4.8,y:-57.8}},{t:this.instance_16,p:{skewX:-6.3518,skewY:173.6481,x:4.1,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:1.2013,y:90.9,x:-23.7}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:70.6729,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:100.1198,x:73.15,y:43.75}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-71.3771,skewY:108.6229,x:59.15,y:123.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.4,scaleX:0.9988,scaleY:0.9988,skewX:-78.7895,skewY:101.2105,x:59.45,y:134.75}},{t:this.instance_10,p:{rotation:13.1591,x:17.4,y:91.85,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:0.3547,skewY:-179.6453,x:-5.85,y:186.55,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-8.6811,skewY:171.3189,x:-28.85,y:186.9,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-56.6151,x:-50.1,y:51.3,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:105.013,skewY:-74.987,x:-96.8,y:123.15,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:117.1727,skewY:-62.8273,x:-97.65,y:131.85,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-95.559,x:-57.2,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.2166,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-6.0683,skewY:173.9316,x:4.05,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:1.8774,y:90.95,x:-23.65}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:71.2683,x:47.4,y:-26.3,regY:-0.9}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:101.1316,x:72.35,y:44.15}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-70.359,skewY:109.641,x:57.15,y:123.45,regY:8}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-77.7745,skewY:102.2255,x:56.95,y:134.75}},{t:this.instance_10,p:{rotation:11.9055,x:17.35,y:91.85,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-0.3854,skewY:179.6146,x:-3.85,y:187,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-7.3459,skewY:172.6541,x:-29.95,y:186.95,regY:-54.7}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-57.6966,x:-48.95,y:51.2,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:103.9337,skewY:-76.0663,x:-94.15,y:123.9,regY:-8.4,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:116.0862,skewY:-63.9138,x:-94.95,y:132.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-96.4621,x:-57.2,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.1834,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-5.7843,skewY:174.2157,x:4.1,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:2.5547,y:90.95,x:-23.6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:71.8645,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:102.144,x:71.7,y:44.4}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-69.3418,skewY:110.6582,x:55,y:123.4,regY:8}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-76.7597,skewY:103.2403,x:54.6,y:134.75}},{t:this.instance_10,p:{rotation:10.6543,x:17.35,y:91.85,scaleX:0.9981,scaleY:0.9981,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,skewX:-1.1291,skewY:178.8709,x:-1.8,y:187.4,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-6.0103,skewY:173.9897,x:-31.05,y:186.75,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-58.7773,x:-47.8,y:51,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:102.8559,skewY:-77.1441,x:-91.6,y:124.55,regY:-8.4,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:115.0003,skewY:-64.9997,x:-92.3,y:133.35,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.8,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-97.365,x:-57.2,y:-22.95}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.1501,x:-4.7,y:-57.85}},{t:this.instance_16,p:{skewX:-5.4995,skewY:174.5005,x:4.1,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:3.2306,y:90.95,x:-23.6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:72.4613,x:47.45,y:-26.35,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:103.1544,x:70.95,y:44.65}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-68.3242,skewY:111.6758,x:52.8,y:123.35,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-75.7449,skewY:104.2551,x:52.3,y:134.65}},{t:this.instance_10,p:{rotation:9.401,x:17.3,y:91.9,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-1.8739,skewY:178.1261,x:0.2,y:188,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-4.6736,skewY:175.3264,x:-32.15,y:186.7,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-59.8597,x:-46.65,y:50.9,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:101.7763,skewY:-78.2237,x:-89.25,y:125.35,regY:-8.3,regX:5.7,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:113.9132,skewY:-66.0868,x:-89.55,y:134.05,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-98.268,x:-57.2,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.1168,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-5.2157,skewY:174.7843,x:4.1,y:-78.65,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:3.9078,y:91.05,x:-23.6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.058,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40.1,scaleX:0.9989,scaleY:0.9989,rotation:104.1666,x:70.2,y:44.7}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-67.3067,skewY:112.6933,x:50.65,y:123.25,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.4,scaleX:0.9988,scaleY:0.9988,skewX:-74.7283,skewY:105.2717,x:50.1,y:134.65}},{t:this.instance_10,p:{rotation:8.1495,x:17.25,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-2.6182,skewY:177.3818,x:2.3,y:188.2,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-3.336,skewY:176.664,x:-33.25,y:186.55,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-60.9401,x:-45.45,y:50.75,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:100.6973,skewY:-79.3027,x:-86.65,y:125.85,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:112.8266,skewY:-67.1734,x:-86.85,y:134.7,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-99.1712,x:-57.15,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.0836,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-4.9327,skewY:175.0672,x:4.15,y:-78.7,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:4.5846,y:91,x:-23.55}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.6542,x:47.45,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:105.1799,x:69.5,y:45.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-66.2882,skewY:113.7118,x:48.45,y:123.1,regY:7.9}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-73.7135,skewY:106.2865,x:47.65,y:134.3}},{t:this.instance_10,p:{rotation:6.8967,x:17.3,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-3.3619,skewY:176.6381,x:4.4,y:188.5,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9986,skewX:-1.9993,skewY:178.0007,x:-34.35,y:186.45,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-62.0212,x:-44.35,y:50.5,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:99.6186,skewY:-80.3814,x:-84.05,y:126.45,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:111.7398,skewY:-68.2602,x:-84.1,y:135.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-100.0732,x:-57.15,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.0503,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-4.6483,skewY:175.3517,x:4.05,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:5.2622,y:90.95,x:-23.5}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.2501,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:106.1919,x:68.75,y:45.4}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-65.2704,skewY:114.7296,x:46.35,y:123,regY:7.9}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-72.6983,skewY:107.3017,x:45.25,y:134.4}},{t:this.instance_10,p:{rotation:5.6446,x:17.25,y:92,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-4.1063,skewY:175.8937,x:6.5,y:188.9,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:-0.6637,skewY:179.3363,x:-35.4,y:186.5,regY:-54.7}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-63.1022,x:-43.2,y:50.35,regX:44.1,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:98.5392,skewY:-81.4608,x:-81.45,y:126.95,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:110.6533,skewY:-69.3467,x:-81.25,y:135.8,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-100.9767,x:-57.1,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-2.017,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-4.3639,skewY:175.6361,x:4.1,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:5.9386,y:91.05,x:-23.45}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:74.8485,x:47.3,y:-26.3,regY:-0.9}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:107.2032,x:67.95,y:45.6}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-64.2535,skewY:115.7465,x:44.3,y:122.8,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-71.683,skewY:108.317,x:43,y:134.05}},{t:this.instance_10,p:{rotation:4.3925,x:17.25,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-4.8505,skewY:175.1495,x:8.6,y:189,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:0.6672,skewY:-179.3328,x:-36.5,y:186.25,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-64.1842,x:-42.05,y:50.1,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:97.4599,skewY:-82.5401,x:-78.85,y:127.45,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:109.5657,skewY:-70.4343,x:-78.5,y:136.25,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-101.8797,x:-57.1,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.9838,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-4.0798,skewY:175.9202,x:4.1,y:-78.8,regY:53.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:6.6159,y:90.95,x:-23.45}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:75.4445,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:108.2152,x:67.3,y:45.75}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-63.2361,skewY:116.7639,x:42.15,y:122.6,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-70.6662,skewY:109.3338,x:40.65,y:133.85}},{t:this.instance_10,p:{rotation:3.1398,x:17.2,y:91.95,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-5.5955,skewY:174.4045,x:10.7,y:189.25,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9986,skewX:2.0036,skewY:-177.9963,x:-37.6,y:186.1,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-65.2646,x:-40.9,y:49.9,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:96.3816,skewY:-83.6184,x:-76.15,y:127.95,regY:-8.4,regX:5.7,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:108.4784,skewY:-71.5216,x:-75.75,y:136.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.8,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-102.7821,x:-57.1,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.9496,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.7947,skewY:176.2053,x:4.15,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:7.2926,y:91.15,x:-23.35}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.0398,x:47.35,y:-26.25,regY:-0.9}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:109.2271,x:66.5,y:45.95}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-62.219,skewY:117.781,x:40.15,y:122.3,regY:8}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-69.6522,skewY:110.3478,x:38.35,y:133.5}},{t:this.instance_10,p:{rotation:1.8869,x:17.2,y:92,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-6.3388,skewY:173.6612,x:12.8,y:189.35,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:3.3412,skewY:-176.6588,x:-38.7,y:185.95,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-66.3464,x:-39.75,y:49.55,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:95.3028,skewY:-84.6972,x:-73.6,y:128.3,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:107.3917,skewY:-72.6083,x:-72.9,y:137.05,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-103.6857,x:-57.1,y:-23.1}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.9164,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.5124,skewY:176.4876,x:4.1,y:-78.8,regY:53.5,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:7.9693,y:91,x:-23.25}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.6367,x:47.45,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:110.238,x:65.75,y:46.15}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-61.2008,skewY:118.7992,x:37.95,y:122,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.2,scaleX:0.9988,scaleY:0.9988,skewX:-68.6363,skewY:111.3637,x:36.05,y:133.2}},{t:this.instance_10,p:{rotation:0.6342,x:17.2,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-7.0833,skewY:172.9167,x:14.85,y:189.45,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:4.678,skewY:-175.322,x:-39.75,y:185.75,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-67.4261,x:-38.55,y:49.35,regX:44.2,scaleX:0.9987,scaleY:0.9987}},{t:this.instance_4,p:{skewX:94.2235,skewY:-85.7765,x:-70.95,y:128.6,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:106.3058,skewY:-73.6942,x:-70.15,y:137.4,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-104.5884,x:-57.1,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.8831,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-3.2285,skewY:176.7715,x:4.1,y:-78.8,regY:53.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.6,scaleX:0.9986,scaleY:0.9986,rotation:8.6461,y:91.25,x:-23.3}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:77.2334,x:47.45,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:111.2515,x:65.05,y:46.3}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-60.1838,skewY:119.8162,x:35.9,y:121.7,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-67.6206,skewY:112.3794,x:33.85,y:132.9}},{t:this.instance_10,p:{rotation:-0.6122,x:17.15,y:92.05,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-7.8279,skewY:172.1721,x:17.05,y:189.5,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9986,scaleY:0.9986,skewX:6.0146,skewY:-173.9854,x:-40.9,y:185.75,regY:-54.7}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-68.5076,x:-37.45,y:49.05,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:93.1455,skewY:-86.8545,x:-68.3,y:128.9,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:105.218,skewY:-74.782,x:-67.35,y:137.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-105.493,x:-57.2,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.8498,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-2.9436,skewY:177.0564,x:4.15,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:9.3231,y:91.15,x:-23.3}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:77.8295,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:112.2627,x:64.25,y:46.55}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-59.1646,skewY:120.8354,x:33.9,y:121.5,regY:8}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-66.6053,skewY:113.3947,x:31.6,y:132.4}},{t:this.instance_10,p:{rotation:-1.8651,x:17.15,y:92.05,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-8.5721,skewY:171.4279,x:19.1,y:189.45,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:7.3511,skewY:-172.6489,x:-41.95,y:185.4,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-69.5885,x:-36.4,y:48.75,regX:44.1,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:92.066,skewY:-87.934,x:-65.7,y:129.15,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:104.1326,skewY:-75.8674,x:-64.55,y:137.85,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.6,scaleX:0.9988,scaleY:0.9988,rotation:-106.3959,x:-57.15,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.8157,x:-4.75,y:-57.85}},{t:this.instance_16,p:{skewX:-2.6598,skewY:177.3402,x:4.15,y:-78.65,regY:53.6,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:10.0008,y:91.25,x:-23.2}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:78.4254,x:47.5,y:-26.2,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:113.274,x:63.55,y:46.75}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-58.1484,skewY:121.8516,x:31.8,y:121.05,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-65.5897,skewY:114.4103,x:29.25,y:132.05}},{t:this.instance_10,p:{rotation:-3.1171,x:17.15,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-9.3153,skewY:170.6847,x:21.35,y:189.4,regY:-54.3,regX:2.4}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:8.6855,skewY:-171.3145,x:-43.05,y:185.15,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-70.6701,x:-35.2,y:48.35,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:90.9864,skewY:-89.0136,x:-63.05,y:129.3,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:103.0446,skewY:-76.9554,x:-61.7,y:138.15,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-107.2978,x:-57.25,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.7824,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-2.3761,skewY:177.6239,x:4.15,y:-78.75,regY:53.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:10.6772,y:91.2,x:-23.25}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.0215,x:47.5,y:-26.25,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:114.2867,x:62.75,y:46.9}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-57.13,skewY:122.87,x:29.65,y:120.65,regY:7.9}},{t:this.instance_11,p:{regX:-5.2,regY:3.4,scaleX:0.9988,scaleY:0.9988,skewX:-64.5753,skewY:115.4247,x:27.1,y:131.55}},{t:this.instance_10,p:{rotation:-4.3696,x:17.1,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-10.0606,skewY:169.9394,x:23.35,y:189.45,regY:-54.2,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9986,skewX:10.0227,skewY:-169.9772,x:-44.1,y:184.95,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-71.7519,x:-34.05,y:48,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:89.9125,skewY:-90.0875,x:-60.35,y:129.5,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1,skewX:101.9579,skewY:-78.0421,x:-58.85,y:138.15,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-108.2002,x:-57.25,y:-23}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.7492,x:-4.85,y:-57.85}},{t:this.instance_16,p:{skewX:-2.0924,skewY:177.9076,x:4.15,y:-78.75,regY:53.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_15,p:{regY:-45.8,scaleX:0.9986,scaleY:0.9986,rotation:11.3542,y:91.1,x:-23.15}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.62,x:47.5,y:-26.3,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9989,scaleY:0.9989,rotation:115.2971,x:61.95,y:47.05}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-56.1121,skewY:123.8879,x:27.55,y:120.1,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-63.5602,skewY:116.4398,x:24.7,y:131.2}},{t:this.instance_10,p:{rotation:-5.6217,x:17.1,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-10.8054,skewY:169.1946,x:25.45,y:189.15,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:11.3584,skewY:-168.6416,x:-45.15,y:184.7,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-72.8318,x:-32.9,y:47.65,regX:44.2,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:88.8341,skewY:-91.1659,x:-57.6,y:129.65,regY:-8.4,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.8,regY:-1.1,skewX:100.8709,skewY:-79.1291,x:-55.9,y:138.35,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-109.1037,x:-57.3,y:-23.05}}]},1).to({state:[{t:this.instance_17,p:{regX:-0.4,rotation:-1.7159,x:-4.8,y:-57.85}},{t:this.instance_16,p:{skewX:-1.8079,skewY:178.1921,x:4.2,y:-78.55,regY:53.6,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_15,p:{regY:-45.7,scaleX:0.9986,scaleY:0.9986,rotation:12.0302,y:91.2,x:-23.2}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:80.2149,x:47.55,y:-26.2,regY:-1}},{t:this.instance_13,p:{regX:-40,scaleX:0.9988,scaleY:0.9988,rotation:116.3094,x:61.2,y:47.2}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,skewX:-55.0963,skewY:124.9037,x:25.5,y:119.7,regY:7.9}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9988,scaleY:0.9988,skewX:-62.5459,skewY:117.4541,x:22.5,y:130.65}},{t:this.instance_10,p:{rotation:-6.8737,x:17.05,y:92.1,scaleX:0.9982,scaleY:0.9982,regX:-0.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,skewX:-11.5492,skewY:168.4508,x:27.6,y:188.95,regY:-54.3,regX:2.5}},{t:this.instance_8},{t:this.instance_7,p:{regX:3.5,scaleX:0.9985,scaleY:0.9985,skewX:12.6942,skewY:-167.3058,x:-46.3,y:184.45,regY:-54.8}},{t:this.instance_6},{t:this.instance_5,p:{rotation:-73.9136,x:-31.9,y:47.4,regX:44.1,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_4,p:{skewX:87.7544,skewY:-92.2456,x:-55.15,y:129.7,regY:-8.3,regX:5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:6.9,regY:-1,skewX:99.7851,skewY:-80.2149,x:-53.2,y:138.2,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_2,p:{regX:35.9,regY:0.5,scaleX:0.9988,scaleY:0.9988,rotation:-110.0076,x:-57.35,y:-23}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-146.2,-370.8,254.7,676.8);


(lib.CharacterBad_04 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Character
	this.instance = new lib.CachedBmp_2273();
	this.instance.setTransform(-104.45,-345.85,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2272();
	this.instance_1.setTransform(-114.3,-384.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(40));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy2_2("synched",0);
	this.instance_2.setTransform(-57.3,-22.95,0.9985,0.9985,-67.6741,0,0,35.7,0.4);

	this.instance_3 = new lib.ch1_hand_rcopy2_2("synched",0);
	this.instance_3.setTransform(-59.3,134.95,0.9983,0.9983,-110.4989,0,0,6.5,-1.2);

	this.instance_4 = new lib.ch1_thumb_rcopy2_2("synched",0);
	this.instance_4.setTransform(-62.7,126.85,0.9985,0.9985,-120.7525,0,0,5.5,-8.7);

	this.instance_5 = new lib.ch1_lArm_rcopy2_2("synched",0);
	this.instance_5.setTransform(-87.1,49.7,0.9985,0.9985,-107.408,0,0,40.2,0.1);

	this.instance_6 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_6.setTransform(-0.5,-79.45,0.9991,0.9991,-2.0341,0,0,0.8,52.5);

	this.instance_7 = new lib.ch1_uBodycopy2_2("synched",0);
	this.instance_7.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_8 = new lib.ch1_lLeg_rcopy2_2("synched",0);
	this.instance_8.setTransform(13.6,178.35,0.998,0.998,-11.9336,0,0,2.7,-54.2);

	this.instance_9 = new lib.ch1_neckcopy2_2("synched",0);
	this.instance_9.setTransform(-4.8,-58.3,0.9991,0.9991,10.2033,0,0,-0.7,8.6);

	this.instance_10 = new lib.ch1_lBodycopy2_2("synched",0);
	this.instance_10.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_11 = new lib.ch1_lLeg_lcopy2_2("synched",0);
	this.instance_11.setTransform(-2.1,187.65,0.9977,0.9977,36.4575,0,0,3.8,-53.6);

	this.instance_12 = new lib.ch1_uLeg_lcopy2_2("synched",0);
	this.instance_12.setTransform(15.6,93.2,0.9977,0.9977,7.8124,0,0,-0.3,1.8);

	this.instance_13 = new lib.ch1_hand_lcopy2_2("synched",0);
	this.instance_13.setTransform(99.55,121.6,0.9984,0.9984,34.1068,0,0,-5.4,2.8);

	this.instance_14 = new lib.ch1_thumb_lcopy2_2("synched",0);
	this.instance_14.setTransform(97.35,110.3,0.9985,0.9985,58.3925,0,0,-6.4,7.9);

	this.instance_15 = new lib.ch1_lArm_lcopy2_2("synched",0);
	this.instance_15.setTransform(44.9,49.65,0.9985,0.9985,49.2991,0,0,-40.4,-1);

	this.instance_16 = new lib.ch1_uArm_lcopy2_2("synched",0);
	this.instance_16.setTransform(45.35,-26.05,0.9985,0.9985,91.3407,0,0,-33.3,0.1);

	this.instance_17 = new lib.ch1_uLeg_rcopy2_2("synched",0);
	this.instance_17.setTransform(-25.45,90.25,0.998,0.998,-26.6677,0,0,2.5,-45.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{rotation:-26.6677,x:-25.45,y:90.25,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0.1,scaleX:0.9985,scaleY:0.9985,rotation:91.3407,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9985,scaleY:0.9985,rotation:49.2991,x:44.9,y:49.65,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:58.3925,x:97.35,y:110.3,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9984,scaleY:0.9984,rotation:34.1068,x:99.55,y:121.6}},{t:this.instance_12,p:{regX:-0.3,rotation:7.8124,x:15.6,y:93.2,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.6,scaleX:0.9977,scaleY:0.9977,rotation:36.4575,x:-2.1,y:187.65,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:10.2033,x:-4.8,y:-58.3,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.998,scaleY:0.998,rotation:-11.9336,x:13.6,y:178.35,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.0341,x:-0.5,y:-79.45,regY:52.5}},{t:this.instance_5,p:{regY:0.1,rotation:-107.408,x:-87.1,y:49.7,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9985,scaleY:0.9985,rotation:-120.7525,x:-62.7,y:126.85,regY:-8.7}},{t:this.instance_3,p:{regX:6.5,scaleX:0.9983,scaleY:0.9983,rotation:-110.4989,x:-59.3,y:134.95,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-67.6741,x:-57.3,y:-22.95,regY:0.4,regX:35.7}}]}).to({state:[{t:this.instance_17,p:{rotation:-25.0228,x:-25.3,y:90.15,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:92.2317,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:50.7149,x:43.65,y:49.65,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:59.8134,x:94.6,y:111.55,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:35.5388,x:96.6,y:122.9}},{t:this.instance_12,p:{regX:-0.2,rotation:6.6169,x:15.4,y:93.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:33.7858,x:-0.45,y:188.15,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2092,x:-4.75,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-10.491,x:11.1,y:179.4,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.9169,x:-0.4,y:-79.45,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-108.5382,x:-85.35,y:50.5,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-121.8751,x:-59.3,y:127.15,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-111.6186,x:-55.7,y:135.3,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.1497,x:-57.25,y:-23,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-23.3778,x:-25.1,y:90.3,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:93.1241,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:52.1319,x:42.55,y:49.6,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:61.2329,x:91.9,y:112.7,regY:7.8,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:36.9704,x:93.5,y:124.15}},{t:this.instance_12,p:{regX:-0.2,rotation:5.4229,x:15.05,y:93.45,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:31.1127,x:1.25,y:188.55,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2169,x:-4.75,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-9.0491,x:8.7,y:180.65,regY:-54.1,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.8013,x:-0.45,y:-79.45,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-109.6714,x:-83.55,y:51.05,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-122.9974,x:-55.9,y:127.35,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-112.7382,x:-52.2,y:135.35,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.6233,x:-57.2,y:-22.95,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-21.7326,x:-24.95,y:90.35,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:94.0147,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:53.5478,x:41.25,y:49.55,regY:-0.9,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:62.6533,x:89.2,y:113.8,regY:7.8,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:38.4014,x:90.5,y:125.4}},{t:this.instance_12,p:{regX:-0.2,rotation:4.2268,x:14.75,y:93.6,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:28.44,x:2.95,y:189,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2252,x:-4.8,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-7.6075,x:6.25,y:181.45,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6831,x:-0.35,y:-79.4,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-110.8025,x:-81.55,y:51.8,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-124.1212,x:-52.55,y:127.3,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-113.8579,x:-48.65,y:135.4,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-72.0973,x:-57.35,y:-23,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-20.0893,x:-24.8,y:90.35,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:94.908,x:45.4,y:-26,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:54.9638,x:40.15,y:49.55,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:64.0721,x:86.4,y:115.05,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:39.8327,x:87.45,y:126.5}},{t:this.instance_12,p:{regX:-0.2,rotation:3.0317,x:14.45,y:93.7,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:25.7674,x:4.6,y:189.4,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2313,x:-4.8,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-6.1639,x:3.9,y:182.45,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.5658,x:-0.35,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-111.9354,x:-79.75,y:52.35,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-125.2439,x:-49.05,y:127.35,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-114.9793,x:-45.1,y:135.35,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.5722,x:-57.25,y:-23.05,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-18.443,x:-24.65,y:90.45,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:95.7997,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:56.3804,x:38.95,y:49.4,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:65.4929,x:83.5,y:115.95,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:41.265,x:84.3,y:127.5}},{t:this.instance_12,p:{regX:-0.2,rotation:1.8362,x:14.15,y:93.8,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.6,scaleX:0.9976,scaleY:0.9976,rotation:23.0935,x:6.3,y:189.55,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2394,x:-4.8,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-4.7231,x:1.3,y:183.4,regY:-54.1,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.4485,x:-0.4,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-113.0672,x:-77.7,y:52.9,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-126.368,x:-45.65,y:127.3,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-116.0993,x:-41.5,y:135.2,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.0456,x:-57.35,y:-23,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-16.7986,x:-24.45,y:90.55,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:96.6922,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:57.7963,x:37.8,y:49.25,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:66.9129,x:80.7,y:116.95,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:42.6957,x:81.15,y:128.55}},{t:this.instance_12,p:{regX:-0.2,rotation:0.6415,x:13.85,y:93.95,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:20.4219,x:8,y:189.95,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2465,x:-4.75,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-3.2792,x:-1.15,y:184.05,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.3321,x:-0.4,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-114.1976,x:-75.75,y:53.5,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-127.4918,x:-42.2,y:127.2,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-117.2188,x:-37.85,y:134.9,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-76.5206,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-15.1535,x:-24.3,y:90.55,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:97.5826,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:59.2126,x:36.6,y:49.2,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:68.3319,x:77.85,y:117.8,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:44.128,x:78.1,y:129.45}},{t:this.instance_12,p:{regX:-0.2,rotation:-0.5503,x:13.5,y:94.05,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:17.7479,x:9.6,y:190.15,regX:3.7}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2537,x:-4.75,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-1.8366,x:-3.7,y:184.75,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.2157,x:-0.4,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-115.3299,x:-73.7,y:53.9,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-128.6147,x:-38.85,y:126.9,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-118.3385,x:-34.35,y:134.7,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.9958,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-13.508,x:-24.1,y:90.7,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:98.4767,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:60.6275,x:35.4,y:49.1,regY:-1,regX:-40.3}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:69.7516,x:75,y:118.7,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:45.5586,x:74.9,y:130.3}},{t:this.instance_12,p:{regX:-0.2,rotation:-1.7459,x:13.2,y:94.2,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.6,scaleX:0.9976,scaleY:0.9976,rotation:15.0753,x:11.4,y:190.2,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2616,x:-4.75,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.998,scaleY:0.998,rotation:-0.396,x:-6.1,y:185.4,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.0984,x:-0.35,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-116.4628,x:-71.85,y:54.2,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-129.7375,x:-35.45,y:126.6,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-119.4588,x:-30.7,y:134.25,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4689,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-11.8632,x:-23.95,y:90.75,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:99.3683,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:62.0438,x:34.3,y:48.8,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:71.1724,x:72.05,y:119.6,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:46.9913,x:71.75,y:131.1}},{t:this.instance_12,p:{regX:-0.2,rotation:-2.9405,x:12.9,y:94.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:12.4017,x:13.1,y:190.45,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2688,x:-4.75,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.0426,x:-8.8,y:185.85,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9802,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-117.5946,x:-69.75,y:54.7,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-130.8601,x:-31.9,y:126.3,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-120.5791,x:-27.15,y:133.75,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.9432,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-10.2187,x:-23.8,y:90.65,regY:-45.7,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:100.2606,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:63.46,x:33.15,y:48.65,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:72.5921,x:69.1,y:120.2,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:48.4228,x:68.5,y:131.85}},{t:this.instance_12,p:{regX:-0.2,rotation:-4.1363,x:12.6,y:94.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:9.7289,x:14.7,y:190.6,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2767,x:-4.8,y:-58.3,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:2.4854,x:-11.4,y:186.35,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.8638,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-118.7263,x:-67.8,y:54.9,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-131.985,x:-28.5,y:125.7,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-121.6998,x:-23.55,y:133.2,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-82.4175,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-8.5733,x:-23.65,y:90.9,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:101.1519,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:64.8759,x:31.95,y:48.45,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:74.0125,x:66.15,y:120.85,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:49.8547,x:65.25,y:132.45}},{t:this.instance_12,p:{regX:-0.2,rotation:-5.3314,x:12.25,y:94.55,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:7.0577,x:16.35,y:190.65,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2839,x:-4.75,y:-58.3,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:3.9279,x:-13.95,y:186.9,regY:-54.1,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.7465,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-119.8601,x:-65.75,y:55.15,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-133.1068,x:-25.1,y:125.25,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-122.8197,x:-20,y:132.55,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-83.8922,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-6.9289,x:-23.4,y:90.95,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:102.0439,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:66.2914,x:30.75,y:48.2,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:75.4315,x:63.2,y:121.45,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:51.2858,x:62,y:133.05}},{t:this.instance_12,p:{regX:-0.2,rotation:-6.5271,x:11.95,y:94.65,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:4.3843,x:18.1,y:190.7,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2909,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.3712,x:-16.6,y:187,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.6292,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-120.99,x:-63.75,y:55.35,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-134.2309,x:-21.75,y:124.55,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-123.9395,x:-16.45,y:131.8,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-85.3663,x:-57.3,y:-23.2,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-5.2838,x:-23.25,y:91,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:102.9356,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:67.708,x:29.6,y:48,regY:-1,regX:-40.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:76.8519,x:60.2,y:122.1,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:52.7183,x:58.8,y:133.65}},{t:this.instance_12,p:{regX:-0.2,rotation:-7.7219,x:11.65,y:94.8,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:1.7109,x:19.75,y:190.6,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2988,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:6.8128,x:-19.2,y:187.25,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.5128,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-122.1218,x:-61.75,y:55.5,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-135.3536,x:-18.3,y:123.95,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-125.0593,x:-12.95,y:131,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-86.8409,x:-57.35,y:-23.2,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-3.638,x:-23.1,y:91.05,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:103.8277,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:69.1236,x:28.5,y:47.7,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:78.2714,x:57.25,y:122.5,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:54.1496,x:55.45,y:134}},{t:this.instance_12,p:{regX:-0.2,rotation:-8.9185,x:11.35,y:94.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-0.9579,x:21.45,y:190.55,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.306,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:8.2559,x:-21.95,y:187.3,regY:-54.2,regX:2.6}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.3956,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-123.2556,x:-59.65,y:55.6,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-136.477,x:-15.05,y:123,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-126.1797,x:-9.45,y:130.1,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-88.315,x:-57.35,y:-23.2,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.9943,x:-22.95,y:91,regY:-45.7,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:104.7203,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:70.5404,x:27.35,y:47.45,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:79.6926,x:54.25,y:122.85,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:55.5807,x:52.25,y:134.45}},{t:this.instance_12,p:{regX:-0.2,rotation:-10.1134,x:10.95,y:95,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-3.6306,x:23.1,y:190.45,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3132,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:9.6972,x:-24.45,y:187.5,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.2792,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-124.3873,x:-57.7,y:55.65,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-137.5997,x:-11.6,y:122.2,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-127.3006,x:-5.95,y:129.15,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-89.7899,x:-57.35,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-0.3495,x:-22.8,y:91.2,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:105.6121,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:71.9563,x:26.15,y:47.15,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:81.1126,x:51.25,y:123.25,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:57.0119,x:48.8,y:134.6}},{t:this.instance_12,p:{regX:-0.2,rotation:-11.3087,x:10.65,y:95.1,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-6.3043,x:24.75,y:190.3,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3211,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.1405,x:-27,y:187.45,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.1619,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-125.5203,x:-55.6,y:55.65,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-138.7234,x:-8.5,y:121.35,regY:-8.8}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-128.4203,x:-2.6,y:128.1,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-91.2593,x:-57.4,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:1.2923,x:-22.45,y:91.2,regY:-45.6,regX:2.6}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:106.5034,x:45.4,y:-26.15,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:73.3722,x:24.9,y:46.85,regY:-0.9,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:82.5316,x:48.3,y:123.5,regY:7.8,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:58.4436,x:45.6,y:134.9}},{t:this.instance_12,p:{regX:-0.2,rotation:-12.5045,x:10.35,y:95.15,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-8.9758,x:26.4,y:190.05,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3292,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:12.5825,x:-29.45,y:187.35,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.0446,x:-0.25,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-126.6503,x:-53.65,y:55.55,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-139.8473,x:-5.1,y:120.25,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-129.5406,x:0.95,y:126.9,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-92.733,x:-57.3,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:2.936,x:-22.3,y:91.3,regY:-45.6,regX:2.6}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:107.3948,x:45.4,y:-26.15,regX:-33.4}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:74.789,x:23.85,y:46.55,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:83.9522,x:45.15,y:123.85,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:59.876,x:42.25,y:135.05}},{t:this.instance_12,p:{regX:-0.2,rotation:-13.6992,x:10.05,y:95.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-11.649,x:27.95,y:189.85,regX:3.7}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3354,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.025,x:-32.25,y:187.1,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:0.0674,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-127.7834,x:-51.6,y:55.45,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-140.97,x:-1.75,y:119.15,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-130.6608,x:4.3,y:125.75,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-94.2077,x:-57.3,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:4.5822,x:-22.2,y:91.35,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:108.2882,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:76.2055,x:22.8,y:46.2,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:85.3717,x:42.1,y:124.05,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:61.3062,x:38.9,y:135.15}},{t:this.instance_12,p:{regX:-0.2,rotation:-14.8947,x:9.65,y:95.4,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-14.3217,x:29.7,y:189.5,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3434,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:15.4673,x:-34.95,y:186.85,regY:-54.2,regX:2.6}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:0.1847,x:-0.25,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-128.9146,x:-49.55,y:55.25,regX:40.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-142.0938,x:1.5,y:118,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-131.781,x:7.65,y:124.5,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-95.6816,x:-57.3,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:3.0062,x:-22.4,y:91.3,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:107.4289,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:74.8589,x:23.8,y:46.55,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:84.0261,x:45,y:123.75,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:59.9607,x:42.15,y:135.05}},{t:this.instance_12,p:{regX:-0.2,rotation:-13.7487,x:10.05,y:95.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-11.7726,x:28.05,y:189.75,regX:3.7}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3419,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.0919,x:-32.5,y:187.1,regY:-54.2,regX:2.6}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:0.0884,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-127.8263,x:-51.5,y:55.4,regX:40.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-141.0049,x:-1.6,y:119.1,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-130.6905,x:4.45,y:125.7,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-94.2788,x:-57.3,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:1.4298,x:-22.55,y:91.25,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:106.5697,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:73.5119,x:24.9,y:46.8,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9984,rotation:82.6791,x:48.05,y:123.55,regY:7.8,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:58.6142,x:45.25,y:134.95}},{t:this.instance_12,p:{regX:-0.2,rotation:-12.6031,x:10.3,y:95.2,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-9.2224,x:26.6,y:189.95,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3398,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:12.7164,x:-29.8,y:187.35,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.0018,x:-0.25,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-126.7373,x:-53.45,y:55.55,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-139.9163,x:-4.8,y:120.15,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-129.6028,x:1.2,y:126.85,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-92.8742,x:-57.3,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-0.141,x:-22.7,y:91.25,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:105.7088,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:72.1646,x:26,y:47.15,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:81.3325,x:50.85,y:123.45,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:57.2677,x:48.4,y:134.7}},{t:this.instance_12,p:{regX:-0.2,rotation:-11.4572,x:10.6,y:95.1,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-6.6729,x:24.95,y:190.25,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3381,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3415,x:-27.3,y:187.45,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.0971,x:-0.25,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-125.6495,x:-55.4,y:55.65,regX:40.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-138.827,x:-7.95,y:121.2,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-128.5151,x:-2.2,y:128,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-91.4703,x:-57.3,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.7173,x:-22.85,y:91.15,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:104.8499,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:70.819,x:27.2,y:47.35,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:79.9862,x:53.7,y:122.95,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:55.9203,x:51.6,y:134.4}},{t:this.instance_12,p:{regX:-0.2,rotation:-10.311,x:10.9,y:95,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-4.1225,x:23.4,y:190.35,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3374,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:9.9667,x:-24.9,y:187.45,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.1925,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-124.5593,x:-57.25,y:55.65,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-137.7391,x:-11.1,y:122.15,regY:-8.8}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-127.4255,x:-5.45,y:129.1,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-90.0657,x:-57.3,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-3.2931,x:-22.95,y:91,regY:-45.6,regX:2.6}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:103.9902,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:69.4708,x:28.25,y:47.75,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:78.6396,x:56.55,y:122.6,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:54.5749,x:54.75,y:134.1}},{t:this.instance_12,p:{regX:-0.2,rotation:-9.1661,x:11.2,y:94.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-1.5733,x:21.8,y:190.55,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3354,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:8.5925,x:-22.35,y:187.35,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.287,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-123.473,x:-59.2,y:55.6,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-136.6491,x:-14.25,y:122.9,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-126.337,x:-8.7,y:129.9,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-88.6681,x:-57.3,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-4.8688,x:-23.1,y:91.05,regY:-45.6,regX:2.6}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:103.1315,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:68.1259,x:29.35,y:47.9,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:77.294,x:59.45,y:122.15,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:53.2266,x:57.9,y:133.7}},{t:this.instance_12,p:{regX:-0.2,rotation:-8.0192,x:11.55,y:94.85,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:0.9737,x:20.15,y:190.6,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3337,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:7.2162,x:-19.85,y:187.35,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.3824,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-122.3839,x:-61.15,y:55.5,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-135.5616,x:-17.5,y:123.75,regY:-8.8}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-125.2485,x:-12.05,y:130.85,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-87.2635,x:-57.3,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-6.4437,x:-23.25,y:90.95,regY:-45.6,regX:2.6}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:102.2707,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:66.7785,x:30.45,y:48.3,regY:-0.9,regX:-40.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:75.9457,x:62.25,y:121.65,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:51.8817,x:61.05,y:133.35}},{t:this.instance_12,p:{regX:-0.2,rotation:-6.8737,x:11.8,y:94.7,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:3.5217,x:18.55,y:190.7,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3321,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.8414,x:-17.3,y:187.1,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.4778,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-121.2949,x:-63.1,y:55.45,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-134.4731,x:-20.7,y:124.45,regY:-8.7}},{t:this.instance_3,p:{regX:6.5,scaleX:0.9982,scaleY:0.9982,rotation:-124.1596,x:-15.5,y:131.55,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-85.8608,x:-57.35,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-8.019,x:-23.55,y:90.9,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:101.4116,x:45.45,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:65.4315,x:31.6,y:48.35,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:74.6002,x:65.2,y:121.25,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:50.5343,x:64.15,y:132.75}},{t:this.instance_12,p:{regX:-0.2,rotation:-5.7267,x:12.15,y:94.6,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:6.0715,x:16.85,y:190.7,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3309,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.4656,x:-14.85,y:186.9,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.5732,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-120.2057,x:-65.05,y:55.25,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-133.3843,x:-23.9,y:125,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-123.0699,x:-18.9,y:132.4,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-84.4565,x:-57.3,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-9.5964,x:-23.7,y:90.85,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:100.5526,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:64.0862,x:32.7,y:48.55,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:73.2544,x:67.9,y:120.55,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:49.1874,x:67.25,y:132.25}},{t:this.instance_12,p:{regX:-0.2,rotation:-4.5819,x:12.45,y:94.45,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:8.621,x:15.3,y:190.65,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3292,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.998,scaleY:0.998,rotation:3.0914,x:-12.35,y:186.55,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.6686,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-119.1167,x:-66.95,y:55.1,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-132.2962,x:-27.15,y:125.65,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-121.9822,x:-22.2,y:133.05,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9985,rotation:-83.0523,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-11.1711,x:-23.85,y:90.65,regY:-45.7,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:99.6934,x:45.35,y:-26,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:62.7394,x:33.9,y:48.8,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:71.907,x:70.7,y:119.85,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:47.8411,x:70.3,y:131.6}},{t:this.instance_12,p:{regX:-0.2,rotation:-3.4345,x:12.75,y:94.35,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:11.1719,x:13.7,y:190.6,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3276,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.7156,x:-9.9,y:186.25,regY:-54.1,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.764,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-118.0278,x:-68.8,y:54.75,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-131.2072,x:-30.45,y:126.05,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-120.8938,x:-25.65,y:133.55,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-81.6475,x:-57.25,y:-23.05,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-12.7462,x:-24,y:90.7,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:98.8335,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:61.3926,x:35,y:48.95,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:70.5612,x:73.55,y:119.1,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:46.4951,x:73.2,y:130.7}},{t:this.instance_12,p:{regX:-0.2,rotation:-2.2887,x:13,y:94.25,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:13.7217,x:12.1,y:190.45,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3256,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3417,x:-7.45,y:185.55,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.8594,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-116.9398,x:-70.8,y:54.4,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-130.1179,x:-33.75,y:126.5,regY:-8.7}},{t:this.instance_3,p:{regX:6.5,scaleX:0.9982,scaleY:0.9982,rotation:-119.8056,x:-29.05,y:133.95,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.2446,x:-57.3,y:-23.15,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-14.3231,x:-24.2,y:90.65,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:97.9742,x:45.4,y:-26,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:60.047,x:36.05,y:49.1,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:69.2141,x:76.3,y:118.4,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:45.1486,x:76.3,y:129.95}},{t:this.instance_12,p:{regX:-0.2,rotation:-1.1437,x:13.35,y:94.15,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:16.2714,x:10.55,y:190.25,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3239,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-1.0294,x:-4.8,y:185,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.954,x:-0.4,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-115.8512,x:-72.65,y:54.15,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-129.0295,x:-37,y:126.8,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-118.7163,x:-32.4,y:134.55,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-78.8412,x:-57.35,y:-23,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-15.8976,x:-24.3,y:90.6,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:97.1146,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:58.7003,x:37.1,y:49.35,regY:-0.9,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:67.8667,x:79.1,y:117.5,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:43.8023,x:79.35,y:129.15}},{t:this.instance_12,p:{regX:-0.2,rotation:0,x:13.65,y:94.05,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:18.8213,x:8.9,y:190.05,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3221,x:-4.9,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.4047,x:-2.4,y:184.45,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.0502,x:-0.35,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-114.7619,x:-74.55,y:53.6,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-127.9407,x:-40.3,y:127.1,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-117.6281,x:-35.85,y:134.85,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.4374,x:-57.35,y:-23.2,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-17.4744,x:-24.4,y:90.5,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:96.255,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:57.3534,x:38.3,y:49.4,regY:-0.9,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:66.5214,x:81.75,y:116.7,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:42.4553,x:82.4,y:128.25}},{t:this.instance_12,p:{regX:-0.2,rotation:1.1454,x:13.9,y:93.95,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:21.3711,x:7.3,y:189.9,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3203,x:-4.9,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-3.7804,x:-0.05,y:183.7,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.1456,x:-0.4,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-113.6732,x:-76.35,y:53.3,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-126.8526,x:-43.55,y:127.2,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-116.5384,x:-39.25,y:135.15,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-76.033,x:-57.35,y:-23.2,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-19.0497,x:-24.65,y:90.5,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:95.395,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:56.0078,x:39.55,y:49.45,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:65.1751,x:84.5,y:115.65,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:41.1086,x:85.25,y:127.25}},{t:this.instance_12,p:{regX:-0.2,rotation:2.2904,x:14.25,y:93.8,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:23.9201,x:5.65,y:189.6,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3185,x:-4.9,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-5.1567,x:2.35,y:183,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.241,x:-0.35,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-112.5845,x:-78.2,y:52.85,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-125.7624,x:-46.95,y:127.5,regY:-8.8}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-115.4502,x:-42.75,y:135.4,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-74.6301,x:-57.4,y:-22.9,regY:0.3,regX:35.6}}]},1).to({state:[{t:this.instance_17,p:{rotation:-20.6252,x:-24.8,y:90.25,regY:-45.7,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:94.5363,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:54.6603,x:40.55,y:49.5,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:63.8285,x:87.15,y:114.75,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:39.7617,x:88.35,y:126.25}},{t:this.instance_12,p:{regX:-0.2,rotation:3.4372,x:14.55,y:93.65,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.6,scaleX:0.9976,scaleY:0.9976,rotation:26.4702,x:4.1,y:189.2,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3177,x:-4.9,y:-58.3,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-6.5297,x:4.65,y:182.1,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.3365,x:-0.35,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-111.4964,x:-80.15,y:52.15,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-124.6754,x:-50.2,y:127.55,regY:-8.8}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-114.3617,x:-46.25,y:135.55,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-73.225,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-22.2023,x:-25,y:90.3,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:93.676,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:53.3149,x:41.8,y:49.55,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:62.4822,x:89.85,y:113.7,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:38.4151,x:91.25,y:125.2}},{t:this.instance_12,p:{regX:-0.2,rotation:4.5828,x:14.8,y:93.55,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:29.0205,x:2.4,y:188.9,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3158,x:-4.9,y:-58.3,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-7.9065,x:6.85,y:181.35,regY:-54.1,regX:2.6}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.431,x:-0.4,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-110.407,x:-81.9,y:51.75,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-123.5866,x:-53.4,y:127.45,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-113.272,x:-49.5,y:135.5,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.8201,x:-57.35,y:-23,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-23.7764,x:-25,y:90.25,regY:-45.6,regX:2.6}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:92.8181,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:51.9678,x:42.95,y:49.65,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:61.1357,x:92.45,y:112.7,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:37.0691,x:94.2,y:124.05}},{t:this.instance_12,p:{regX:-0.2,rotation:5.7285,x:15.1,y:93.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:31.5705,x:0.8,y:188.55,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3141,x:-4.85,y:-58.3,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-9.2817,x:9.35,y:180.2,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.5265,x:-0.35,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-109.318,x:-83.8,y:51.05,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-122.4965,x:-56.75,y:127.3,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-112.1838,x:-52.95,y:135.5,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.418,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-25.352,x:-25.3,y:90.2,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:91.9583,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:50.6204,x:44.05,y:49.6,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:59.7891,x:95.05,y:111.45,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:35.7226,x:96.95,y:122.8}},{t:this.instance_12,p:{regX:-0.2,rotation:6.8746,x:15.4,y:93.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:34.1198,x:-0.85,y:188.1,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3125,x:-4.85,y:-58.3,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-10.6568,x:11.65,y:179.2,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6219,x:-0.4,y:-79.3,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-108.2298,x:-85.6,y:50.45,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-121.4092,x:-59.9,y:127.2,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-111.0955,x:-56.35,y:135.4,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.0139,x:-57.3,y:-23.1,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-26.9282,x:-25.35,y:90.2,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:91.0999,x:45.3,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:49.2747,x:45.1,y:49.7,regY:-0.9,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:58.442,x:97.6,y:110.25,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:34.377,x:99.9,y:121.6}},{t:this.instance_12,p:{regX:-0.2,rotation:8.0201,x:15.65,y:93.2,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:36.6687,x:-2.5,y:187.6,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3105,x:-4.85,y:-58.3,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-12.0302,x:14.05,y:178,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.7173,x:-0.4,y:-79.4,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-107.1415,x:-87.4,y:49.65,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-120.321,x:-63.2,y:126.9,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-110.0077,x:-59.85,y:135.15,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.6108,x:-57.25,y:-23.05,regY:0.4,regX:35.7}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-114.3,-384.7,242.2,689.7);


(lib.CharacterBad_02 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Character
	this.instance = new lib.CachedBmp_2271();
	this.instance.setTransform(-108.05,-337.45,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2270();
	this.instance_1.setTransform(-117.9,-376.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(40));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy2_3("synched",0);
	this.instance_2.setTransform(-57.25,-23.35,0.9984,0.9984,-88.8791,0,0,36.2,0.3);

	this.instance_3 = new lib.ch1_hand_rcopy2_3("synched",0);
	this.instance_3.setTransform(8,115.8,0.9982,0.9982,-155.4659,0,0,6.3,-1.4);

	this.instance_4 = new lib.ch1_thumb_rcopy2_3("synched",0);
	this.instance_4.setTransform(4.35,107.85,0.9983,0.9983,-122.9932,0,0,5.2,-8.7);

	this.instance_5 = new lib.ch1_lArm_rcopy2_3("synched",0);
	this.instance_5.setTransform(-57.45,55.9,0.9984,0.9984,-140.7652,0,0,40,1.1);

	this.instance_6 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_6.setTransform(0.4,-79,0.999,0.999,-3.6465,0,0,1,52.8);

	this.instance_7 = new lib.ch1_uBodycopy2_3("synched",0);
	this.instance_7.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_8 = new lib.ch1_lLeg_rcopy2_3("synched",0);
	this.instance_8.setTransform(-33,188,0.9983,0.9983,12.7243,0,0,3,-54.2);

	this.instance_9 = new lib.ch1_neckcopy2_3("synched",0);
	this.instance_9.setTransform(-4.95,-58.2,0.999,0.999,12.1106,0,0,-0.9,8.8);

	this.instance_10 = new lib.ch1_lBodycopy2_3("synched",0);
	this.instance_10.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_11 = new lib.ch1_lLeg_lcopy2_3("synched",0);
	this.instance_11.setTransform(35.6,186.95,0.9978,0.9978,-6.9034,0,0,3.6,-53.9);

	this.instance_12 = new lib.ch1_uLeg_lcopy2_3("synched",0);
	this.instance_12.setTransform(14.2,93.8,0.9978,0.9978,-15.399,0,0,-0.8,1.9);

	this.instance_13 = new lib.ch1_hand_lcopy2_3("synched",0);
	this.instance_13.setTransform(19.8,139,0.9983,0.9983,61.5907,0,0,-4.9,3.1);

	this.instance_14 = new lib.ch1_thumb_lcopy2_3("synched",0);
	this.instance_14.setTransform(22.85,128.25,0.9983,0.9983,87.9153,0,0,-6.4,8.1);

	this.instance_15 = new lib.ch1_lArm_lcopy2_3("synched",0);
	this.instance_15.setTransform(32.9,48.95,0.9984,0.9984,97.0969,0,0,-40,-1.1);

	this.instance_16 = new lib.ch1_uArm_lcopy2_3("synched",0);
	this.instance_16.setTransform(45.25,-26.25,0.9984,0.9984,100.13,0,0,-33.5,-0.3);

	this.instance_17 = new lib.ch1_uLeg_rcopy2_3("synched",0);
	this.instance_17.setTransform(-20.25,91.2,0.9984,0.9984,5.251,0,0,2.4,-46.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{scaleX:0.9984,scaleY:0.9984,rotation:5.251,x:-20.25,y:91.2,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:100.13,x:45.25,y:-26.25,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:97.0969,x:32.9,y:48.95,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:87.9153,x:22.85,y:128.25}},{t:this.instance_13,p:{regX:-4.9,scaleX:0.9983,scaleY:0.9983,rotation:61.5907,x:19.8,y:139,regY:3.1}},{t:this.instance_12,p:{regY:1.9,scaleX:0.9978,scaleY:0.9978,rotation:-15.399,y:93.8,x:14.2}},{t:this.instance_11,p:{regX:3.6,rotation:-6.9034,x:35.6,y:186.95,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:12.1106,x:-4.95,y:-58.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9983,scaleY:0.9983,rotation:12.7243,x:-33,y:188,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,rotation:-3.6465,x:0.4,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:40,regY:1.1,scaleX:0.9984,scaleY:0.9984,rotation:-140.7652,x:-57.45,y:55.9}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-122.9932,x:4.35,y:107.85,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9982,scaleY:0.9982,rotation:-155.4659,x:8,y:115.8,regY:-1.4}},{t:this.instance_2,p:{regX:36.2,regY:0.3,rotation:-88.8791,y:-23.35,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]}).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:3.7192,x:-20.3,y:91.25,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.7441,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:94.6508,x:33.3,y:49.05,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.3,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:85.47,x:26.95,y:128.7}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:59.1454,x:24.2,y:139.65,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-13.8552,y:93.75,x:14.2}},{t:this.instance_11,p:{regX:3.8,rotation:-5.358,x:33.25,y:187.45,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:12.0845,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.7179,x:-30.35,y:188.3,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.4679,x:0.6,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-138.643,x:-58.8,y:55.95}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-120.8705,x:1,y:110.05,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-153.3429,x:4.35,y:118.1,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-87.8777,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9984,scaleY:0.9984,rotation:2.1863,x:-20.4,y:91.2,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.3578,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:92.2047,x:33.85,y:49.1,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9982,rotation:83.0245,x:30.75,y:128.85}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:56.6991,x:28.55,y:140.05,regY:3.2}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-12.3105,y:93.75,x:14.25}},{t:this.instance_11,p:{regX:3.8,rotation:-3.8135,x:30.8,y:187.9,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:12.0597,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7099,x:-27.85,y:188.45,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.289,x:0.6,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-136.5198,x:-60.15,y:55.95}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-118.7468,x:-2.35,y:112.15,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-151.2199,x:0.7,y:120.35,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-86.8749,y:-23.55,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:0.6551,x:-20.5,y:91.35,regY:-46.5,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.9718,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:89.7636,x:34.4,y:49.1,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:80.5796,x:34.55,y:129.05}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:54.2537,x:32.95,y:140.2,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-10.7652,y:93.75,x:14.25}},{t:this.instance_11,p:{regX:3.7,rotation:-2.2682,x:28.2,y:188.25,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:12.0346,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:9.7015,x:-25.4,y:188.55,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.1092,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-134.3975,x:-61.55,y:55.85}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-116.6242,x:-5.9,y:114.15,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-149.0975,x:-3.15,y:122.6,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-85.8719,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-0.8714,x:-20.55,y:91.1,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.5855,x:45.2,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:87.3167,x:34.85,y:49.15,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:78.133,x:38.7,y:129}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:51.808,x:37.35,y:140.25,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-9.2204,y:93.75,x:14.3}},{t:this.instance_11,p:{regX:3.7,rotation:-0.7238,x:25.7,y:188.6,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:12.0087,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:8.6954,x:-22.9,y:188.6,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.9305,x:0.5,y:-78.85,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-132.2755,x:-62.95,y:55.8}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-114.5001,x:-9.55,y:116.15,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-146.9741,x:-7,y:124.55,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-84.8686,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-2.4029,x:-20.7,y:91.1,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.1977,x:45.1,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:84.8719,x:35.4,y:49.3,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:75.6874,x:42.5,y:128.75}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:49.3618,x:41.75,y:140.1,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-7.6746,y:93.75,x:14.4}},{t:this.instance_11,p:{regX:3.7,rotation:0.8167,x:23.2,y:188.85,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.9836,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:7.6875,x:-20.35,y:188.65,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.7517,x:0.55,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:40,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-130.1505,x:-64.4,y:55.55}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.3775,x:-13.15,y:117.95,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-144.8519,x:-10.9,y:126.55,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-83.8663,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-3.9351,x:-20.8,y:91.05,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.8123,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:82.4247,x:35.9,y:49.35,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:73.242,x:46.35,y:128.6}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:46.9159,x:46.15,y:139.8,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-6.1307,y:93.7,x:14.45}},{t:this.instance_11,p:{regX:3.7,rotation:2.3629,x:20.7,y:189.05,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9586,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:6.6795,x:-17.85,y:188.55,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.573,x:0.55,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-128.0281,x:-65.75,y:55.5}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.2546,x:-16.85,y:119.65,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-142.7279,x:-14.95,y:128.3,regY:-1.4}},{t:this.instance_2,p:{regX:36.2,regY:0.2,rotation:-82.8621,y:-23.4,scaleX:0.9983,scaleY:0.9983,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-5.4659,x:-20.85,y:91.05,regY:-46.5,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.4253,x:45.15,y:-26.3,regX:-33.4,regY:-0.3}},{t:this.instance_15,p:{rotation:79.9805,x:36.35,y:49.4,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:70.7962,x:50.25,y:128.1}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:44.4705,x:50.55,y:139.3,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-4.586,y:93.65,x:14.5}},{t:this.instance_11,p:{regX:3.7,rotation:3.9083,x:18.2,y:189.1,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9327,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.6724,x:-15.35,y:188.4,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.3952,x:0.55,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-125.9055,x:-67.05,y:55.35}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-108.1308,x:-20.6,y:121.25,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-140.6068,x:-19.15,y:129.95,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-81.8594,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-6.9971,x:-20.9,y:90.95,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.0378,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:77.534,x:36.9,y:49.4,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:68.3498,x:54.2,y:127.4}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:42.0235,x:54.85,y:138.7,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-3.0395,y:93.65,x:14.55}},{t:this.instance_11,p:{regX:3.7,rotation:5.453,x:15.7,y:189.15,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9084,x:-4.85,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:4.6637,x:-12.85,y:188.2,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.2147,x:0.5,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-123.7819,x:-68.45,y:55.2}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-106.0084,x:-24.5,y:122.7,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-138.483,x:-23.3,y:131.55,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-80.8566,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.5296,x:-21.25,y:90.9,regY:-46.6,regX:2.3}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.6523,x:45.1,y:-26.25,regX:-33.4,regY:-0.3}},{t:this.instance_15,p:{rotation:75.0867,x:37.4,y:49.45,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:65.904,x:58,y:126.7}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:39.5785,x:59.2,y:137.9,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-1.4951,y:93.6,x:14.65}},{t:this.instance_11,p:{regX:3.7,rotation:6.9982,x:13.15,y:189.1,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8825,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:3.6573,x:-10.35,y:187.85,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.0361,x:0.45,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-121.6593,x:-69.8,y:55}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-103.8865,x:-28.4,y:124.05,regY:-8.7,regX:5.3}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-136.3609,x:-27.5,y:132.95,regY:-1.4}},{t:this.instance_2,p:{regX:36.2,regY:0.3,rotation:-79.8537,y:-23.35,scaleX:0.9984,scaleY:0.9984,x:-57.15}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-10.0623,x:-21.25,y:90.85,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.2663,x:45.2,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:72.6421,x:37.95,y:49.6,scaleX:0.9983,scaleY:0.9983,regX:-39.9,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:63.4584,x:61.8,y:125.75}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:37.1321,x:63.4,y:136.9,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:0.0447,y:93.6,x:14.7}},{t:this.instance_11,p:{regX:3.7,rotation:8.5414,x:10.75,y:189,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8568,x:-4.85,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:2.6486,x:-7.9,y:187.5,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.8566,x:0.55,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-119.5366,x:-71.2,y:54.75}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-101.7629,x:-32.25,y:125.35,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-134.2375,x:-31.8,y:134.15,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-78.8512,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.5931,x:-21.25,y:90.9,regY:-46.5,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.8787,x:45.1,y:-26.3,regX:-33.4,regY:-0.3}},{t:this.instance_15,p:{rotation:70.1958,x:38.5,y:49.65,scaleX:0.9983,scaleY:0.9983,regX:-39.9,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:61.0121,x:65.5,y:124.7}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:34.6861,x:67.6,y:135.8,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:1.5898,y:93.6,x:14.75}},{t:this.instance_11,p:{regX:3.7,rotation:10.0874,x:8.25,y:188.85,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8326,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:1.6424,x:-5.35,y:187.05,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.6788,x:0.55,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-117.4126,x:-72.55,y:54.5}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-99.6399,x:-36.35,y:126.45,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-132.115,x:-36.25,y:135.3,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-77.8471,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-13.1244,x:-21.4,y:90.8,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.4924,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:67.7494,x:38.9,y:49.6,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:58.5669,x:69.2,y:123.5}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:32.2406,x:71.75,y:134.55,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9978,scaleY:0.9978,rotation:3.1351,y:93.5,x:14.8}},{t:this.instance_11,p:{regX:3.7,rotation:11.6328,x:5.7,y:188.6,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.8067,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:0.6341,x:-2.9,y:186.55,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.4993,x:0.5,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-115.2905,x:-73.95,y:54.2}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.5167,x:-40.45,y:127.55,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-129.9908,x:-40.5,y:136.35,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-76.8448,y:-23.5,scaleX:0.9983,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-14.6565,x:-21.55,y:90.7,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.1063,x:45.1,y:-26.25,regX:-33.4,regY:-0.3}},{t:this.instance_15,p:{rotation:65.303,x:39.45,y:49.6,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9982,scaleY:0.9982,rotation:56.1202,x:72.75,y:122.25}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:29.7939,x:75.9,y:133.1,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:4.6809,y:93.5,x:14.85}},{t:this.instance_11,p:{regX:3.7,rotation:13.1787,x:3.25,y:188.3,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7804,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-0.3687,x:-0.5,y:186,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.3199,x:0.45,y:-78.85,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-113.1679,x:-75.25,y:53.9}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-95.3933,x:-44.55,y:128.35,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-127.8675,x:-45.05,y:137.2,regY:-1.5}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-75.8416,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-16.189,x:-21.6,y:90.7,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.7195,x:45.1,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:62.8569,x:40,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:53.6752,x:76.4,y:120.8}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:27.3477,x:80,y:131.5,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:6.2259,y:93.45,x:14.95}},{t:this.instance_11,p:{regX:3.7,rotation:14.7235,x:0.7,y:188,scaleX:0.9978,scaleY:0.9978,regY:-53.8}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7564,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-1.376,x:1.85,y:185.4,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.1404,x:0.5,y:-78.8,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-111.0449,x:-76.55,y:53.5}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-93.2702,x:-48.65,y:129.1,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-125.746,x:-49.4,y:138,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-74.8384,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-17.7207,x:-21.7,y:90.7,regY:-46.5,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.3321,x:45.2,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:60.4116,x:40.5,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:51.2287,x:79.9,y:119.15}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:24.9029,x:83.9,y:129.75,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:7.7701,y:93.5,x:15}},{t:this.instance_11,p:{regX:3.7,rotation:16.2676,x:-1.75,y:187.45,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7304,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-2.3838,x:4.3,y:184.65,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.9619,x:0.55,y:-78.85,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-108.921,x:-77.95,y:53.3}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-91.1482,x:-52.9,y:129.65,regY:-8.7,regX:5.3}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-123.6218,x:-53.9,y:138.55,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-73.8356,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-19.2511,x:-21.8,y:90.6,regY:-46.5,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.9466,x:45.1,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:57.9664,x:41,y:49.75,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:48.7842,x:83.4,y:117.45}},{t:this.instance_13,p:{regX:-4.9,scaleX:0.9982,scaleY:0.9982,rotation:22.4562,x:87.7,y:127.8,regY:3.1}},{t:this.instance_12,p:{regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:9.3155,y:93.3,x:15.05}},{t:this.instance_11,p:{regX:3.7,rotation:17.8145,x:-4.2,y:186.95,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7056,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-3.3914,x:6.7,y:183.85,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.7833,x:0.5,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:40,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-106.8,x:-79.3,y:52.75}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-89.0287,x:-57.05,y:130.25,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-121.5002,x:-58.4,y:138.95,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-72.8318,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-20.7835,x:-21.9,y:90.55,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.5596,x:45.15,y:-26.5,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:55.5193,x:41.5,y:49.8,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:46.3378,x:86.7,y:115.6}},{t:this.instance_13,p:{regX:-4.9,scaleX:0.9982,scaleY:0.9982,rotation:20.0097,x:91.5,y:125.8,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:10.8607,y:93.4,x:15.05}},{t:this.instance_11,p:{regX:3.7,rotation:19.3582,x:-6.6,y:186.3,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.6805,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-4.4001,x:9.1,y:182.9,regY:-54.3,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.6039,x:0.45,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-104.6764,x:-80.65,y:52.45}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.9052,x:-61.1,y:130.65,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-119.3776,x:-62.9,y:139.3,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-71.8301,y:-23.55,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-22.3142,x:-22,y:90.4,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.1736,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:53.0732,x:42,y:49.8,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:43.892,x:89.95,y:113.6}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:17.5644,x:95.3,y:123.6,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:12.4049,y:93.4,x:15.1}},{t:this.instance_11,p:{regX:3.6,rotation:20.904,x:-9.2,y:185.6,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.6554,x:-5.05,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-5.4076,x:11.5,y:182.1,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.4253,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-102.5531,x:-81.9,y:52.1}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-84.7844,x:-65.5,y:130.85,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-117.2545,x:-67.45,y:139.45,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-70.8267,y:-23.55,scaleX:0.9983,scaleY:0.9983,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-23.846,x:-22.15,y:90.35,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.7869,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:50.6268,x:42.5,y:49.8,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:41.4461,x:93.2,y:111.55}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:15.1195,x:98.95,y:121.3,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:13.951,y:93.3,x:15.2}},{t:this.instance_11,p:{regX:3.6,rotation:22.4485,x:-11.6,y:184.9,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.6295,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.414,x:13.85,y:181.1,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.2459,x:0.5,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-100.4309,x:-83.1,y:51.65}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-82.6599,x:-69.7,y:130.95,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-115.1316,x:-72,y:139.55,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.3,rotation:-69.8235,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.1}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-22.3966,x:-22,y:90.45,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.1613,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:52.9663,x:42,y:49.75,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:43.7867,x:90.15,y:113.55}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:17.4575,x:95.5,y:123.5,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:12.4791,y:93.4,x:15.1}},{t:this.instance_11,p:{regX:3.7,rotation:20.9828,x:-9.2,y:185.6,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.6501,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-5.463,x:11.55,y:182.05,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.4341,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-102.4556,x:-82.05,y:52.05}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.6868,x:-65.65,y:130.85,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-117.1679,x:-67.7,y:139.45,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.3,rotation:-70.7727,y:-23.45,scaleX:0.9983,scaleY:0.9983,x:-57.1}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-20.9462,x:-21.95,y:90.55,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.535,x:45.1,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:55.3053,x:41.5,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:46.1247,x:87,y:115.45}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:19.7942,x:91.95,y:125.6,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:11.0088,y:93.35,x:15}},{t:this.instance_11,p:{regX:3.7,rotation:19.5154,x:-6.9,y:186.3,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.6699,x:-5.05,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-4.5118,x:9.4,y:182.8,regY:-54.3,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.6223,x:0.45,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-104.4819,x:-80.7,y:52.5}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.7131,x:-61.6,y:130.6,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-119.2023,x:-63.3,y:139.35,regY:-1.4}},{t:this.instance_2,p:{regX:36.2,regY:0.2,rotation:-71.7221,y:-23.4,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-19.4951,x:-21.85,y:90.55,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.9089,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:57.6449,x:41.1,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:48.4647,x:83.75,y:117.2}},{t:this.instance_13,p:{regX:-4.9,scaleX:0.9982,scaleY:0.9982,rotation:22.133,x:88.15,y:127.5,regY:3.1}},{t:this.instance_12,p:{regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:9.5367,y:93.3,x:15.05}},{t:this.instance_11,p:{regX:3.7,rotation:18.0484,x:-4.6,y:186.85,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.6905,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-3.5599,x:7.15,y:183.7,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.8113,x:0.5,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-106.5074,x:-79.45,y:52.8}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-88.7396,x:-57.6,y:130.3,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-121.2385,x:-59.05,y:138.9,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-72.6712,y:-23.65,scaleX:0.9983,scaleY:0.9983,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.0447,x:-21.7,y:90.55,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.282,x:45.15,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:59.9832,x:40.5,y:49.65,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:50.8047,x:80.5,y:118.9}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:24.471,x:84.6,y:129.4,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:8.0655,y:93.5,x:14.95}},{t:this.instance_11,p:{regX:3.7,rotation:16.5828,x:-2.2,y:187.3,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7111,x:-5.05,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-2.61,x:4.85,y:184.45,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.9986,x:0.45,y:-78.85,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-108.533,x:-78.2,y:53.25}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-90.7619,x:-53.65,y:129.85,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-123.2742,x:-54.75,y:138.65,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-73.6211,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-16.5944,x:-21.65,y:90.6,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.6571,x:45.1,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:62.3222,x:40,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9982,scaleY:0.9982,rotation:53.1443,x:77.05,y:120.5}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:26.8083,x:80.75,y:131.1,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:6.5945,y:93.45,x:14.9}},{t:this.instance_11,p:{regX:3.7,rotation:15.1172,x:0.15,y:187.8,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7296,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-1.659,x:2.55,y:185.05,regY:-54.3,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.1868,x:0.5,y:-78.8,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-110.5595,x:-77,y:53.5}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-92.7879,x:-49.6,y:129.15,regY:-8.6,regX:5.3}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-125.309,x:-50.5,y:138.1,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-74.5699,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-15.1448,x:-21.6,y:90.75,regY:-46.6,regX:2.3}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.0306,x:45.2,y:-26.25,regX:-33.4,regY:-0.4}},{t:this.instance_15,p:{rotation:64.6612,x:39.5,y:49.65,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9982,scaleY:0.9982,rotation:55.483,x:73.7,y:121.95}},{t:this.instance_13,p:{regX:-4.9,scaleX:0.9982,scaleY:0.9982,rotation:29.1476,x:76.9,y:132.6,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:5.1233,y:93.5,x:14.85}},{t:this.instance_11,p:{regX:3.8,rotation:13.6497,x:2.65,y:188.15,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7502,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-0.7068,x:0.3,y:185.75,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.375,x:0.5,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:40,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-112.5846,x:-75.75,y:53.7}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-94.8147,x:-45.8,y:128.65,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-127.3454,x:-46.35,y:137.5,regY:-1.5}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-75.5199,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-13.6934,x:-21.45,y:90.75,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.4044,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:66.9995,x:38.95,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:57.8246,x:70.25,y:123.15}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:31.4857,x:72.95,y:134.15,regY:3.2}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:3.6521,y:93.5,x:14.8}},{t:this.instance_11,p:{regX:3.7,rotation:12.1834,x:4.9,y:188.6,scaleX:0.9978,scaleY:0.9978,regY:-53.8}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7699,x:-4.95,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:0.24,x:-2,y:186.35,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.5633,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-114.6127,x:-74.45,y:54.2}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-96.8413,x:-41.7,y:127.7,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-129.3807,x:-42.05,y:136.6,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-76.4684,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-12.2439,x:-21.35,y:90.8,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.7801,x:45.1,y:-26.25,regX:-33.4,regY:-0.3}},{t:this.instance_15,p:{rotation:69.338,x:38.65,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-39.9,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:60.1631,x:66.75,y:124.3}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:33.8242,x:69,y:135.35,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:2.1807,y:93.55,x:14.75}},{t:this.instance_11,p:{regX:3.8,rotation:10.7181,x:7.35,y:188.75,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7904,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:1.1912,x:-4.4,y:186.85,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.7524,x:0.5,y:-79.05,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-116.6379,x:-73.1,y:54.35}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.8668,x:-37.95,y:126.85,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-131.4165,x:-37.85,y:135.65,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-77.4186,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-10.7933,x:-21.2,y:90.8,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.1526,x:45.3,y:-26.35,regX:-33.5,regY:-0.4}},{t:this.instance_15,p:{rotation:71.678,x:38.1,y:49.55,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9982,scaleY:0.9982,rotation:62.5023,x:63.15,y:125.5}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:36.1625,x:65,y:136.5,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:0.7089,y:93.55,x:14.75}},{t:this.instance_11,p:{regX:3.7,rotation:9.2519,x:9.65,y:188.95,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8101,x:-4.85,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:2.1419,x:-6.65,y:187.3,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.9389,x:0.55,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-118.6632,x:-71.8,y:54.55}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-100.8948,x:-34.15,y:125.85,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-133.452,x:-33.7,y:134.65,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-78.3672,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-9.3434,x:-21.2,y:90.85,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.5262,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:74.0172,x:37.6,y:49.45,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:64.842,x:59.6,y:126.25}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:38.4999,x:60.9,y:137.45,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-0.7571,y:93.6,x:14.7}},{t:this.instance_11,p:{regX:3.7,rotation:7.7846,x:11.95,y:189.05,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8305,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9983,scaleY:0.9983,rotation:3.0922,x:-9,y:187.65,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.1272,x:0.45,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-120.6888,x:-70.55,y:54.85}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-102.9206,x:-30.25,y:124.6,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-135.4887,x:-29.6,y:133.45,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-79.3176,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.8934,x:-21.2,y:90.95,regY:-46.6,regX:2.3}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.9009,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:76.3561,x:37.1,y:49.5,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:67.1824,x:55.95,y:127.05}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:40.8376,x:56.9,y:138.3,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-2.228,y:93.65,x:14.65}},{t:this.instance_11,p:{regX:3.6,rotation:6.3189,x:14.15,y:189.2,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8503,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:4.0444,x:-11.4,y:188,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.3155,x:0.55,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-122.7155,x:-69.3,y:55.05}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-104.9473,x:-26.6,y:123.45,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-137.5242,x:-25.5,y:132.25,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.3,rotation:-80.2663,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.15}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-6.4424,x:-20.95,y:90.95,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.2743,x:45.2,y:-26.25,regX:-33.4,regY:-0.4}},{t:this.instance_15,p:{rotation:78.6947,x:36.55,y:49.4,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:69.5204,x:52.2,y:127.7}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:43.1758,x:52.7,y:138.95,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-3.7004,y:93.65,x:14.55}},{t:this.instance_11,p:{regX:3.7,rotation:4.8522,x:16.75,y:189.1,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8709,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:4.996,x:-13.75,y:188.25,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.5038,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-124.7421,x:-67.95,y:55.3}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-106.9736,x:-22.9,y:122.1,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-139.5596,x:-21.5,y:130.8,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-81.2148,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-4.9928,x:-20.8,y:91,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.6479,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:81.0345,x:36.15,y:49.4,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.3,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:71.8608,x:48.6,y:128.3}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:45.5128,x:48.6,y:139.6,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-5.1709,y:93.6,x:14.5}},{t:this.instance_11,p:{regX:3.7,rotation:3.3859,x:19.2,y:189.05,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8908,x:-4.9,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.9471,x:-16.05,y:188.45,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.6913,x:0.5,y:-78.95,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-126.7673,x:-66.65,y:55.4}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-108.9994,x:-19.3,y:120.65,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-141.5949,x:-17.55,y:129.3,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-82.166,y:-23.4,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-3.5429,x:-20.75,y:91,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.0226,x:45.15,y:-26.25,regX:-33.4,regY:-0.3}},{t:this.instance_15,p:{rotation:83.3726,x:35.65,y:49.35,scaleX:0.9983,scaleY:0.9983,regX:-39.9,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:74.2009,x:44.75,y:128.65}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:47.8519,x:44.35,y:139.95,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-6.6422,y:93.7,x:14.45}},{t:this.instance_11,p:{regX:3.7,rotation:1.9201,x:21.55,y:188.95,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9114,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:6.8981,x:-18.65,y:188.55,regY:-54.2,regX:2.9}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.8805,x:0.55,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-128.7922,x:-65.25,y:55.45}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-111.0268,x:-15.6,y:119.05,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-143.632,x:-13.7,y:127.7,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-83.1145,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9984,scaleY:0.9984,rotation:-2.0917,x:-20.65,y:91.1,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.3969,x:45.25,y:-26.35,regX:-33.5,regY:-0.4}},{t:this.instance_15,p:{rotation:85.7111,x:35.1,y:49.25,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:76.5398,x:41.15,y:128.85}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:50.1896,x:40.15,y:140.1,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-8.1134,y:93.75,x:14.4}},{t:this.instance_11,p:{regX:3.7,rotation:0.453,x:23.95,y:188.8,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9308,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:7.8493,x:-20.9,y:188.6,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.0681,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-130.8188,x:-64.1,y:55.7}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-113.0527,x:-12.15,y:117.35,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-145.6666,x:-9.85,y:125.9,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-84.0635,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-0.641,x:-20.55,y:91.1,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.7707,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:88.0503,x:34.65,y:49.2,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.3,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:78.8797,x:37.4,y:129.1}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:52.5279,x:35.95,y:140.25,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-9.5836,y:93.75,x:14.35}},{t:this.instance_11,p:{regX:3.7,rotation:-1.0086,x:26.3,y:188.65,scaleX:0.9978,scaleY:0.9978,regY:-53.8}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9514,x:-4.85,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:8.7998,x:-23.25,y:188.65,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.2574,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-132.8451,x:-62.75,y:55.8}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-115.0793,x:-8.7,y:115.6,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-147.7026,x:-6.1,y:124.1,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-85.0135,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:0.8048,x:-20.5,y:91.3,regY:-46.5,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.144,x:45.2,y:-26.3,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:90.3853,x:34.1,y:49.1,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:81.2191,x:33.6,y:128.95}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:54.8656,x:31.7,y:140.2,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-11.0559,y:93.75,x:14.25}},{t:this.instance_11,p:{regX:3.8,rotation:-2.4743,x:28.8,y:188.2,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9711,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:9.7504,x:-25.6,y:188.6,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.445,x:0.5,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-134.8706,x:-61.45,y:55.8}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-117.1056,x:-5.35,y:113.75,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-149.7384,x:-2.6,y:122.05,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-85.9632,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9984,scaleY:0.9984,rotation:2.2538,x:-20.35,y:91.2,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.5185,x:45.2,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:92.7236,x:33.65,y:49,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:83.5589,x:29.9,y:128.8}},{t:this.instance_13,p:{regX:-4.9,scaleX:0.9982,scaleY:0.9982,rotation:57.2041,x:27.5,y:139.85,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-12.5269,y:93.75,x:14.2}},{t:this.instance_11,p:{regX:3.7,rotation:-3.9418,x:31.05,y:187.9,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.991,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7029,x:-27.95,y:188.45,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.6326,x:0.5,y:-78.85,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-136.8959,x:-60.1,y:55.9}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-119.1318,x:-2.1,y:111.75,regY:-8.7,regX:5.3}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-151.7746,x:1.1,y:120.1,regY:-1.5}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-86.9126,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:3.7052,x:-20.3,y:91.25,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.8925,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:95.0621,x:33.15,y:48.95,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:85.8978,x:26.2,y:128.55}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:59.542,x:23.4,y:139.45,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-13.998,y:93.8,x:14.25}},{t:this.instance_11,p:{regX:3.8,rotation:-5.4081,x:33.55,y:187.4,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:12.0114,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.6526,x:-30.3,y:188.25,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.8204,x:0.5,y:-78.85,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-138.9229,x:-58.85,y:55.95}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-121.1584,x:1.15,y:109.65,regY:-8.7,regX:5.3}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-153.8102,x:4.75,y:117.85,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-87.8611,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.1564,x:-20.15,y:91.2,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.2653,x:45.2,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:97.4004,x:32.6,y:48.95,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:88.2376,x:22.3,y:128.15}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:61.8793,x:19.1,y:139,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4686,y:93.8,x:14.2}},{t:this.instance_11,p:{regX:3.6,rotation:-6.8738,x:35.6,y:186.9,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:12.032,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.6048,x:-32.8,y:188,regY:-54.2,regX:2.9}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-4.0081,x:0.5,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-140.9481,x:-57.4,y:55.9}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-123.1846,x:4.5,y:107.6,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-155.8448,x:8.2,y:115.55,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-88.8116,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.3}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-117.9,-376.3,244.3,680.1);


(lib.CharacterBad_01 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Character
	this.instance = new lib.CachedBmp_2269();
	this.instance.setTransform(-115.4,-352.95,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2268();
	this.instance_1.setTransform(-125.25,-374.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(40));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_2.setTransform(-57,-23.05,0.9986,0.9986,-90.7634,0,0,35.8,0.5);

	this.instance_3 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_3.setTransform(11.1,114.45,0.9982,0.9982,-148.1457,0,0,6.3,-1.4);

	this.instance_4 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_4.setTransform(7.55,106.25,0.9985,0.9985,-124.8057,0,0,5.5,-8.4);

	this.instance_5 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_5.setTransform(-54.55,55.85,0.9985,0.9985,-141.5699,0,0,39.8,1.1);

	this.instance_6 = new lib.ch1_headcopy_1("synched",0);
	this.instance_6.setTransform(0.25,-78.95,0.9991,0.9991,-3.6514,0,0,0.9,52.8);

	this.instance_7 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_7.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_8 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_8.setTransform(-23.75,189.1,0.9983,0.9983,16.8044,0,0,2.9,-54.7);

	this.instance_9 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_9.setTransform(-4.8,-58.15,0.9991,0.9991,12.1133,0,0,-0.7,8.8);

	this.instance_10 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_10.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_11 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_11.setTransform(29,189.1,0.9979,0.9979,-11.5958,0,0,2.6,-54);

	this.instance_12 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_12.setTransform(9.55,95.3,0.9979,0.9979,-14.7232,0,0,-1,1.7);

	this.instance_13 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_13.setTransform(47.2,118.45,0.9985,0.9985,58.7128,0,0,-5.2,3.1);

	this.instance_14 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_14.setTransform(51.95,108.55,0.9986,0.9986,96.3932,0,0,-6.3,7.9);

	this.instance_15 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_15.setTransform(8.85,40.4,0.9985,0.9985,58.0387,0,0,-40.8,-0.7);

	this.instance_16 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_16.setTransform(45.2,-26.35,0.9985,0.9985,119.315,0,0,-33.9,-0.1);

	this.instance_17 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_17.setTransform(-16.95,92.7,0.9985,0.9985,1.8513,0,0,2.2,-46.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{rotation:1.8513,x:-16.95,y:92.7,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9985,scaleY:0.9985,rotation:119.315,x:45.2,y:-26.35,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.7,rotation:58.0387,x:8.85,y:40.4,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9986,scaleY:0.9986,rotation:96.3932,x:51.95,y:108.55,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:58.7128,x:47.2,y:118.45}},{t:this.instance_12,p:{regY:1.7,rotation:-14.7232,x:9.55,y:95.3,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.6,rotation:-11.5958,x:29,y:189.1,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:12.1133,x:-4.8,y:-58.15,regX:-0.7}},{t:this.instance_8,p:{regX:2.9,regY:-54.7,rotation:16.8044,x:-23.75,y:189.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.9,scaleX:0.9991,scaleY:0.9991,rotation:-3.6514,x:0.25,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9985,scaleY:0.9985,rotation:-141.5699,x:-54.55,y:55.85,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.4,rotation:-124.8057,x:7.55,y:106.25,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.4,scaleX:0.9982,scaleY:0.9982,rotation:-148.1457,x:11.1,y:114.45,regX:6.3}},{t:this.instance_2,p:{rotation:-90.7634,x:-57,y:-23.05,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]}).to({state:[{t:this.instance_17,p:{rotation:0.1734,x:-17.2,y:92.6,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:117.4752,x:45.15,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.7,regY:-0.6,rotation:58.1681,x:10.85,y:41.7,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:94.9243,x:53.95,y:109.7,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:57.0104,x:49.4,y:119.8}},{t:this.instance_12,p:{regY:1.8,rotation:-13.4504,x:9.85,y:95.2,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:-9.3397,x:27.25,y:189.35,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1197,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:15.5409,x:-21.05,y:189.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-3.4308,x:0.4,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-138.958,x:-55.8,y:55.8,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-122.1934,x:3.75,y:109,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.6,scaleX:0.9981,scaleY:0.9981,rotation:-145.5328,x:7,y:117.45,regX:6.3}},{t:this.instance_2,p:{rotation:-89.8354,x:-56.9,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.4975,x:-17.5,y:92.55,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:115.6357,x:45.15,y:-26.4,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.2959,x:13.05,y:42.65,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:93.4563,x:56.05,y:110.75,regX:-6.4,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:55.3073,x:51.8,y:121.05}},{t:this.instance_12,p:{regY:1.7,rotation:-12.178,x:10.25,y:94.95,regX:-1.1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:-7.084,x:25.65,y:189.55,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1267,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:14.2765,x:-18.5,y:189.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-3.2099,x:0.4,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-136.345,x:-57.1,y:55.8,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-119.5806,x:0,y:111.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-142.919,x:2.9,y:120.2,regX:6.3}},{t:this.instance_2,p:{rotation:-88.9003,x:-56.95,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-3.1758,x:-17.8,y:92.55,regY:-46.1,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:113.7957,x:45.2,y:-26.45,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.4257,x:15.2,y:43.65,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:91.9862,x:58,y:111.95,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:53.6037,x:54.05,y:122.25}},{t:this.instance_12,p:{regY:1.8,rotation:-10.9065,x:10.85,y:94.9,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:-4.8262,x:24,y:189.7,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1331,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:13.0119,x:-16,y:189.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.9873,x:0.4,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-133.7318,x:-58.35,y:55.8,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-116.9676,x:-3.9,y:114.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-140.3064,x:-1.45,y:122.8,regX:6.3}},{t:this.instance_2,p:{rotation:-87.9674,x:-56.9,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-4.8524,x:-18.1,y:92.35,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:111.9559,x:45.2,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.5542,x:17.55,y:44.55,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9986,scaleY:0.9985,rotation:90.5175,x:60.15,y:113,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:51.8997,x:56.5,y:123.3}},{t:this.instance_12,p:{regY:1.7,rotation:-9.6349,x:11.25,y:94.6,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:-2.5696,x:22.35,y:189.75,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1411,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:11.7484,x:-13.4,y:188.95,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.7682,x:0.45,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-131.119,x:-59.55,y:55.85,regX:39.7,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-114.3543,x:-7.9,y:116.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-137.694,x:-5.7,y:125.25,regX:6.3}},{t:this.instance_2,p:{rotation:-87.0341,x:-56.95,y:-23.1,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-6.5288,x:-18.4,y:92.25,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:110.1154,x:45.15,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.683,x:19.8,y:45.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:89.0526,x:62.3,y:113.95,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:50.1966,x:58.85,y:124.4}},{t:this.instance_12,p:{regY:1.8,rotation:-8.3645,x:11.7,y:94.6,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:-0.3145,x:20.65,y:189.9,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1482,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:10.4839,x:-10.9,y:188.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.5457,x:0.45,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-128.5062,x:-60.95,y:55.65,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-111.7408,x:-12.05,y:118.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-135.0811,x:-10.2,y:127.65,regX:6.3}},{t:this.instance_2,p:{rotation:-86.1009,x:-56.95,y:-23,scaleX:0.9986,scaleY:0.9986,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-8.2063,x:-18.8,y:92.15,regY:-46.2,regX:2.1,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.2749,x:45.15,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.8131,x:22.1,y:46.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:87.5835,x:64.45,y:114.8,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:48.4931,x:61.3,y:125.35}},{t:this.instance_12,p:{regY:1.8,rotation:-7.0912,x:12.2,y:94.4,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:1.9392,x:19,y:189.85,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:12.1552,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:9.2189,x:-8.35,y:188.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.325,x:0.4,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-125.8922,x:-62.15,y:55.6,regX:39.8,regY:1.2}},{t:this.instance_4,p:{regY:-8.5,rotation:-109.1275,x:-16.05,y:121,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-132.4678,x:-14.85,y:129.8,regX:6.3}},{t:this.instance_2,p:{rotation:-85.1674,x:-56.95,y:-23,scaleX:0.9986,scaleY:0.9986,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-9.8831,x:-18.95,y:92.05,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.4347,x:45.15,y:-26.4,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.9415,x:24.5,y:46.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:86.1139,x:66.65,y:115.55,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:46.7904,x:63.8,y:126.2}},{t:this.instance_12,p:{regY:1.8,rotation:-5.8207,x:12.65,y:94.2,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:4.1952,x:17.35,y:189.8,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1617,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:7.9548,x:-5.85,y:187.9,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.1034,x:0.45,y:-79,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-123.2794,x:-63.5,y:55.55,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-106.5154,x:-20.4,y:122.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-129.8542,x:-19.65,y:131.7,regX:6.4}},{t:this.instance_2,p:{rotation:-84.2344,x:-56.9,y:-23.1,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-11.5596,x:-19.3,y:91.95,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:104.5955,x:45.15,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.0696,x:26.8,y:47.5,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:84.6433,x:68.85,y:116.4,regX:-6.2,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:45.0867,x:66.25,y:126.95}},{t:this.instance_12,p:{regY:1.8,rotation:-4.5494,x:13.1,y:94.05,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:6.4516,x:15.65,y:189.6,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1688,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:2.9,regY:-54.6,rotation:6.6913,x:-3.4,y:187.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.8818,x:0.5,y:-79.05,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-120.6672,x:-64.8,y:55.35,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-103.9027,x:-24.85,y:124.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-127.2416,x:-24.4,y:133.6,regX:6.3}},{t:this.instance_2,p:{rotation:-83.3009,x:-56.95,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-13.2354,x:-19.55,y:91.85,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:102.7549,x:45.1,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.1996,x:29.25,y:48.05,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:83.1754,x:71.1,y:116.95,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:43.3831,x:68.75,y:127.75}},{t:this.instance_12,p:{regY:1.8,rotation:-3.2777,x:13.55,y:93.85,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:8.7089,x:13.95,y:189.5,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:12.1756,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:5.4275,x:-0.8,y:186.85,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.6612,x:0.5,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-118.0534,x:-66,y:55.4,regX:39.7,regY:1.1}},{t:this.instance_4,p:{regY:-8.4,rotation:-101.2888,x:-29.15,y:126.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-124.6278,x:-29.25,y:135.2,regX:6.3}},{t:this.instance_2,p:{rotation:-82.3672,x:-56.9,y:-23.2,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-14.9115,x:-19.9,y:91.85,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:100.9144,x:45.15,y:-26.65,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.3276,x:31.55,y:48.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:81.7056,x:73.4,y:117.6,regX:-6.2,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:41.6786,x:71.3,y:128.35}},{t:this.instance_12,p:{regY:1.8,rotation:-2.0059,x:14,y:93.65,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:10.9642,x:12.35,y:189.2,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1841,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:4.1628,x:1.7,y:186.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.4397,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.4406,x:-67.3,y:55.15,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-98.6765,x:-34,y:127.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-122.0148,x:-34.2,y:136.65,regX:6.3}},{t:this.instance_2,p:{rotation:-81.4342,x:-56.95,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-16.5894,x:-20.1,y:91.65,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:99.0756,x:45.15,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.4572,x:34,y:48.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:80.2374,x:75.7,y:118,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:39.9763,x:73.8,y:128.85}},{t:this.instance_12,p:{regY:1.8,rotation:-0.7342,x:14.4,y:93.45,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:13.2205,x:10.7,y:188.95,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1904,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:2.8984,x:4.1,y:185.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.2191,x:0.45,y:-78.8,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-112.8275,x:-68.55,y:54.9,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-96.0628,x:-38.65,y:129.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-119.403,x:-39.3,y:137.9,regX:6.3}},{t:this.instance_2,p:{rotation:-80.5005,x:-56.85,y:-23.1,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-18.266,x:-20.45,y:91.55,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:97.2355,x:45.1,y:-26.65,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.5866,x:36.5,y:49.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:78.7672,x:77.85,y:118.5,regX:-6.2,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:38.2727,x:76.35,y:129.4}},{t:this.instance_12,p:{regY:1.8,rotation:0.5336,x:14.9,y:93.25,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:15.4788,x:9,y:188.5,regY:-54.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1974,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:1.6336,x:6.5,y:184.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.9977,x:0.45,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-110.2158,x:-69.8,y:54.65,regX:39.8,regY:1.2}},{t:this.instance_4,p:{regY:-8.5,rotation:-93.4494,x:-43.1,y:130.1,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-116.7891,x:-44.4,y:138.9,regX:6.3}},{t:this.instance_2,p:{rotation:-79.5672,x:-56.95,y:-23.05,scaleX:0.9985,scaleY:0.9985,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-19.9434,x:-20.9,y:91.5,regY:-46.2,regX:2.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:95.3951,x:45.15,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.7146,x:38.85,y:49.45,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:77.2983,x:80.15,y:118.7,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:36.5685,x:78.9,y:129.7}},{t:this.instance_12,p:{regY:1.8,rotation:1.8052,x:15.35,y:92.95,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:17.7337,x:7.4,y:188.3,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2045,x:-4.65,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:0.3696,x:8.95,y:183.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.7771,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.6025,x:-71.1,y:54.45,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-90.8371,x:-48,y:131,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-114.1773,x:-49.55,y:139.7,regX:6.4}},{t:this.instance_2,p:{rotation:-78.6337,x:-56.9,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-21.6196,x:-21,y:91.3,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:93.5549,x:45.1,y:-26.65,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.8442,x:41.35,y:49.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:75.8289,x:82.4,y:119,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:34.8656,x:81.5,y:129.95}},{t:this.instance_12,p:{regY:1.8,rotation:3.0767,x:15.75,y:92.75,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:19.9908,x:5.7,y:187.85,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2119,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-0.8889,x:11.35,y:182.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.5548,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-104.9878,x:-72.45,y:54.2,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-88.2292,x:-52.75,y:131.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-111.5634,x:-54.65,y:140.4,regX:6.3}},{t:this.instance_2,p:{rotation:-77.7006,x:-56.9,y:-23.2,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-23.2974,x:-21.35,y:91.2,regY:-46.2,regX:2.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:91.7148,x:45.1,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.972,x:43.7,y:49.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:74.3594,x:84.75,y:119.25,regX:-6.2,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:33.1626,x:84.1,y:130.2}},{t:this.instance_12,p:{regY:1.8,rotation:4.3481,x:16.2,y:92.6,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:22.2478,x:4,y:187.45,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2197,x:-4.7,y:-58.15,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-2.1532,x:13.7,y:181.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.3334,x:0.55,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-102.3765,x:-73.6,y:54,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-85.6149,x:-57.5,y:132.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-108.951,x:-59.9,y:140.85,regX:6.3}},{t:this.instance_2,p:{rotation:-76.766,x:-56.85,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-24.9734,x:-21.65,y:91.05,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.8792,x:45.1,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.101,x:46.2,y:49.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:72.8901,x:87,y:119.2,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:31.4578,x:86.65,y:130.3}},{t:this.instance_12,p:{regY:1.8,rotation:5.62,x:16.65,y:92.4,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:24.5036,x:2.35,y:186.9,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:12.2257,x:-4.7,y:-58.15,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-3.4185,x:16.05,y:180.25,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.112,x:0.55,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-99.7628,x:-74.85,y:53.75,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-83.0012,x:-62.35,y:132.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-106.3382,x:-65.2,y:140.95,regX:6.4}},{t:this.instance_2,p:{rotation:-75.8323,x:-56.85,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-26.6508,x:-21.85,y:90.9,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.039,x:45.1,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.23,x:48.6,y:49.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:71.4211,x:89.35,y:119.25,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:29.7555,x:89.2,y:130.25}},{t:this.instance_12,p:{regY:1.8,rotation:6.8917,x:17.1,y:92.15,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:26.7614,x:0.7,y:186.3,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2325,x:-4.7,y:-58.05,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-4.6811,x:18.4,y:179.05,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:0.1033,x:0.55,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-97.149,x:-76.1,y:53.35,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-80.3887,x:-67.2,y:132.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-103.7248,x:-70.35,y:141.15,regX:6.3}},{t:this.instance_2,p:{rotation:-74.8996,x:-56.85,y:-23.1,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-28.3279,x:-22.2,y:90.8,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.1995,x:45.1,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.3595,x:51.05,y:49.5,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:69.952,x:91.6,y:119.2,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:28.0521,x:91.8,y:130.2}},{t:this.instance_12,p:{regY:1.8,rotation:8.1634,x:17.5,y:91.9,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.6,rotation:29.0182,x:-0.9,y:185.75,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2397,x:-4.7,y:-58.05,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-5.9459,x:20.65,y:177.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:0.3256,x:0.55,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-94.5371,x:-77.35,y:53.05,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-77.7756,x:-72.1,y:132.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9982,scaleY:0.9982,rotation:-101.111,x:-75.6,y:141.1,regX:6.2}},{t:this.instance_2,p:{rotation:-73.966,x:-56.9,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-30.0026,x:-22.45,y:90.7,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:84.3586,x:45.05,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.4873,x:53.55,y:49.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:68.4818,x:93.85,y:119.05,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:26.3493,x:94.4,y:130.1}},{t:this.instance_12,p:{regY:1.8,rotation:9.435,x:17.85,y:91.55,regX:-1.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:31.2734,x:-2.65,y:185.05,regY:-54,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2465,x:-4.65,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:2.9,regY:-54.6,rotation:-7.2102,x:22.75,y:176.35,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:0.547,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-91.9242,x:-78.55,y:52.7,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-75.1637,x:-76.9,y:132.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.6,scaleX:0.9982,scaleY:0.9982,rotation:-98.4975,x:-80.95,y:140.65,regX:6.3}},{t:this.instance_2,p:{rotation:-73.0329,x:-56.85,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-28.4176,x:-22.15,y:90.85,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.1003,x:45.1,y:-26.45,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.3563,x:51.15,y:49.45,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:69.8711,x:91.75,y:119.15,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:27.9538,x:91.9,y:130.25}},{t:this.instance_12,p:{regY:1.8,rotation:8.2184,x:17.6,y:91.9,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:29.1084,x:-1,y:185.55,regY:-54.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2369,x:-4.7,y:-58.05,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-6.019,x:20.8,y:177.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:0.3185,x:0.55,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-94.4037,x:-77.4,y:53.05,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-77.6504,x:-72.5,y:132.8,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9982,scaleY:0.9982,rotation:-100.9932,x:-75.85,y:141.1,regX:6.2}},{t:this.instance_2,p:{rotation:-73.9078,x:-56.9,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-26.8313,x:-21.9,y:90.95,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.841,x:45.05,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.2261,x:48.9,y:49.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:71.2602,x:89.6,y:119.35,regX:-6.2,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:29.5583,x:89.55,y:130.3}},{t:this.instance_12,p:{regY:1.8,rotation:7.0012,x:17.15,y:92.1,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:26.9439,x:0.5,y:186.25,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:12.2257,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-4.8269,x:18.6,y:178.9,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:0.0901,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-96.8827,x:-76.25,y:53.35,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-80.1376,x:-67.7,y:132.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-103.4869,x:-70.9,y:141.15,regX:6.3}},{t:this.instance_2,p:{rotation:-74.7824,x:-56.85,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-25.2449,x:-21.55,y:91.05,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.5823,x:45.1,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.0959,x:46.55,y:49.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:72.6499,x:87.3,y:119.25,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:31.1623,x:87.05,y:130.25}},{t:this.instance_12,p:{regY:1.8,rotation:5.7863,x:16.6,y:92.3,regX:-1.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:24.7781,x:2.15,y:186.85,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2144,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-3.6352,x:16.45,y:180.05,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.1321,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-99.3623,x:-75.05,y:53.65,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-82.6253,x:-63.05,y:132.7,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-105.9832,x:-65.95,y:141.1,regX:6.3}},{t:this.instance_2,p:{rotation:-75.658,x:-56.9,y:-23.2,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-23.6586,x:-21.35,y:91.2,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:91.318,x:45.1,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.9646,x:44.3,y:49.7,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:74.0381,x:85.15,y:119.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:32.7669,x:84.7,y:130.2}},{t:this.instance_12,p:{regY:1.8,rotation:4.5688,x:16.3,y:92.55,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:22.612,x:3.75,y:187.3,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2038,x:-4.65,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-2.445,x:14.25,y:181.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.3606,x:0.55,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-101.8435,x:-74,y:53.85,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-85.1125,x:-58.55,y:132.45,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-108.4771,x:-61,y:140.9,regX:6.3}},{t:this.instance_2,p:{rotation:-76.5331,x:-56.85,y:-23.2,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-22.0728,x:-21.1,y:91.25,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:93.0601,x:45.1,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.8327,x:41.95,y:49.65,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:75.4269,x:82.95,y:119,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:34.3716,x:82.25,y:130}},{t:this.instance_12,p:{regY:1.8,rotation:3.3506,x:15.9,y:92.75,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:20.4465,x:5.4,y:187.65,regY:-54.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1938,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-1.2533,x:11.95,y:182.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.589,x:0.55,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-104.3238,x:-72.75,y:54.35,regX:39.7,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-87.6001,x:-53.95,y:131.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-110.9738,x:-56.05,y:140.65,regX:6.2}},{t:this.instance_2,p:{rotation:-77.4075,x:-56.9,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-20.4855,x:-20.85,y:91.45,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:94.8008,x:45.1,y:-26.65,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.7021,x:39.65,y:49.55,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:76.8158,x:80.8,y:118.85,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:35.9765,x:79.8,y:129.75}},{t:this.instance_12,p:{regY:1.8,rotation:2.1339,x:15.5,y:92.9,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:18.2809,x:6.9,y:188.2,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1832,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-0.0604,x:9.75,y:183.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.8183,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-106.8023,x:-71.6,y:54.4,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-90.0823,x:-49.45,y:131.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-113.4674,x:-51.1,y:140.05,regX:6.2}},{t:this.instance_2,p:{rotation:-78.2822,x:-56.85,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-18.8999,x:-20.55,y:91.55,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:96.5423,x:45.1,y:-26.55,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.5713,x:37.3,y:49.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:78.2043,x:78.85,y:118.45,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:37.5813,x:77.4,y:129.4}},{t:this.instance_12,p:{regY:1.8,rotation:0.9174,x:15,y:93.15,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:16.1151,x:8.55,y:188.55,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1713,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:1.1246,x:7.4,y:184.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.045,x:0.5,y:-78.8,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-109.2831,x:-70.35,y:54.75,regX:39.7,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-92.57,x:-45.1,y:130.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-115.963,x:-46.3,y:139.2,regX:6.3}},{t:this.instance_2,p:{rotation:-79.1566,x:-56.95,y:-23.05,scaleX:0.9986,scaleY:0.9986,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-17.3126,x:-20.3,y:91.6,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:98.2828,x:45.15,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.4402,x:35.05,y:49.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:79.5944,x:76.7,y:118,regX:-6.4,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:39.1858,x:75.05,y:129}},{t:this.instance_12,p:{regY:1.8,rotation:-0.2953,x:14.6,y:93.35,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:13.9495,x:10.15,y:188.85,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1599,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:2.318,x:5.2,y:185,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.2734,x:0.45,y:-78.8,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-111.7625,x:-69.25,y:54.8,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-95.0572,x:-40.5,y:129.5,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.4,scaleX:0.9981,scaleY:0.9981,rotation:-118.4586,x:-41.35,y:138.25,regX:6.3}},{t:this.instance_2,p:{rotation:-80.0309,x:-56.95,y:-23,scaleX:0.9986,scaleY:0.9986,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-15.7281,x:-19.95,y:91.7,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:100.0241,x:45.1,y:-26.65,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.3099,x:32.8,y:48.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:80.9829,x:74.45,y:117.7,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:40.79,x:72.65,y:128.55}},{t:this.instance_12,p:{regY:1.8,rotation:-1.5115,x:14.2,y:93.55,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:11.7845,x:11.75,y:189.1,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1492,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:3.5097,x:2.85,y:185.75,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.501,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-114.2418,x:-68,y:54.95,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.4,rotation:-97.5451,x:-36,y:128.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-120.9519,x:-36.8,y:137.1,regX:6.4}},{t:this.instance_2,p:{rotation:-80.906,x:-56.9,y:-23.1,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-14.1412,x:-19.7,y:91.75,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:101.7647,x:45.15,y:-26.65,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.178,x:30.5,y:48.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:82.3713,x:72.4,y:117.15,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:42.396,x:70.25,y:128}},{t:this.instance_12,p:{regY:1.8,rotation:-2.7285,x:13.8,y:93.7,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:9.6186,x:13.3,y:189.25,regY:-54.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1382,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:4.7004,x:0.55,y:186.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.7295,x:0.5,y:-79.05,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-116.7233,x:-66.8,y:55.15,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-100.0317,x:-31.75,y:127.05,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-123.4469,x:-31.9,y:136.1,regX:6.2}},{t:this.instance_2,p:{rotation:-81.782,x:-56.95,y:-23.2,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-12.5533,x:-19.4,y:91.85,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:103.5059,x:45.1,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.0472,x:28.25,y:47.8,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:83.7606,x:70.3,y:116.6,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:44.0006,x:67.85,y:127.4}},{t:this.instance_12,p:{regY:1.8,rotation:-3.9449,x:13.3,y:93.9,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:7.4532,x:14.85,y:189.4,regY:-54.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1278,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:5.8913,x:-1.8,y:187.05,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.9563,x:0.4,y:-79.05,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-119.2023,x:-65.65,y:55.3,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-102.5193,x:-27.6,y:125.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-125.9414,x:-27.3,y:134.5,regX:6.3}},{t:this.instance_2,p:{rotation:-82.6559,x:-56.95,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-10.9685,x:-19.25,y:92,regY:-46.2,regX:2.1,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:105.2471,x:45.1,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.9164,x:25.95,y:47.25,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:85.1496,x:68.2,y:115.95,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:45.605,x:65.5,y:126.65}},{t:this.instance_12,p:{regY:1.8,rotation:-5.1605,x:12.9,y:94.1,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:5.2888,x:16.5,y:189.7,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1176,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.7,rotation:7.084,x:-4.15,y:187.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.9991,scaleY:0.9991,rotation:-2.1857,x:0.45,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-121.6819,x:-64.45,y:55.4,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-105.0068,x:-23.3,y:124,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.4,scaleX:0.9981,scaleY:0.9981,rotation:-128.4371,x:-22.65,y:132.8,regX:6.3}},{t:this.instance_2,p:{rotation:-83.5317,x:-56.9,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-9.3823,x:-18.9,y:92.1,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.9871,x:45.2,y:-26.45,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.7868,x:23.8,y:46.65,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:86.5385,x:66.15,y:115.25,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:47.2098,x:63.15,y:125.9}},{t:this.instance_12,p:{regY:1.8,rotation:-6.3785,x:12.45,y:94.25,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:3.1232,x:18.15,y:189.8,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:12.1077,x:-4.8,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.7,rotation:8.2751,x:-6.6,y:188,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.4135,x:0.35,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-124.1634,x:-63.25,y:55.55,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-107.4943,x:-19.2,y:122.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-130.933,x:-18.2,y:131.15,regX:6.3}},{t:this.instance_2,p:{rotation:-84.4061,x:-56.9,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-7.7953,x:-18.6,y:92.2,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.7285,x:45.1,y:-26.45,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.6544,x:21.5,y:45.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:87.9262,x:63.95,y:114.5,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:48.8151,x:60.9,y:125.05}},{t:this.instance_12,p:{regY:1.8,rotation:-7.5948,x:12.05,y:94.45,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:0.9576,x:19.7,y:189.85,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0963,x:-4.8,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:9.4658,x:-8.95,y:188.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.6412,x:0.45,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-126.642,x:-62.1,y:55.6,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-109.9819,x:-15.2,y:120.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-133.4266,x:-13.65,y:129.25,regX:6.2}},{t:this.instance_2,p:{rotation:-85.2816,x:-56.9,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-6.2098,x:-18.3,y:92.25,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:110.4695,x:45.15,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.5231,x:19.4,y:45.25,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:89.3162,x:62,y:113.65,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:50.4198,x:58.55,y:124.1}},{t:this.instance_12,p:{regY:1.8,rotation:-8.812,x:11.5,y:94.55,regX:-1.1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:-1.2039,x:21.3,y:189.85,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0855,x:-4.8,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:10.6577,x:-11.35,y:188.75,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.869,x:0.35,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-129.1229,x:-60.85,y:55.65,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-112.4686,x:-11.15,y:118.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.6,scaleX:0.9981,scaleY:0.9981,rotation:-135.9217,x:-9.35,y:127.25,regX:6.2}},{t:this.instance_2,p:{rotation:-86.1562,x:-56.95,y:-23,scaleX:0.9986,scaleY:0.9986,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-4.623,x:-18.05,y:92.3,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:112.2112,x:45.2,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.3919,x:17.2,y:44.4,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:90.7005,x:60.05,y:112.7,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:52.0243,x:56.35,y:123.05}},{t:this.instance_12,p:{regY:1.7,rotation:-10.0287,x:11.15,y:94.6,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.6,rotation:-3.3698,x:23,y:189.75,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0749,x:-4.85,y:-58.1,regX:-0.8}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:11.8489,x:-13.7,y:188.95,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.9991,scaleY:0.9991,rotation:-3.0976,x:0.4,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-131.6023,x:-59.7,y:55.75,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-114.9562,x:-7.35,y:116.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-138.4172,x:-5.2,y:124.9,regX:6.3}},{t:this.instance_2,p:{rotation:-87.0314,x:-56.95,y:-23.1,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-3.0372,x:-17.75,y:92.55,regY:-46.1,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:113.9521,x:45.2,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.2616,x:15.05,y:43.55,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:92.0896,x:58.15,y:111.65,regX:-6.4,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:53.6299,x:54.05,y:122.05}},{t:this.instance_12,p:{regY:1.8,rotation:-11.2457,x:10.7,y:94.9,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:-5.5342,x:24.45,y:189.6,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0632,x:-4.9,y:-58.1,regX:-0.8}},{t:this.instance_8,p:{regX:2.9,regY:-54.6,rotation:13.04,x:-16.25,y:189.1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-3.3247,x:0.35,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-134.0811,x:-58.35,y:55.95,regX:39.7,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-117.4419,x:-3.7,y:113.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-140.9124,x:-1.15,y:122.45,regX:6.3}},{t:this.instance_2,p:{rotation:-87.9052,x:-56.95,y:-23.1,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.4511,x:-17.45,y:92.55,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:115.6937,x:45.1,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.1307,x:12.95,y:42.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:93.479,x:56.2,y:110.6,regX:-6.4,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:55.2335,x:51.95,y:120.9}},{t:this.instance_12,p:{regY:1.8,rotation:-12.4623,x:10.35,y:95.05,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:-7.6998,x:26,y:189.45,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0524,x:-4.9,y:-58.1,regX:-0.8}},{t:this.instance_8,p:{regX:2.9,regY:-54.7,rotation:14.2323,x:-18.7,y:189.05,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-3.5536,x:0.35,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-136.5612,x:-57.25,y:55.8,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-119.9304,x:0,y:111.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-143.4064,x:2.95,y:119.95,regX:6.3}},{t:this.instance_2,p:{rotation:-88.7803,x:-56.95,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:0.1305,x:-17.2,y:92.55,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:117.4337,x:45.15,y:-26.45,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.0002,x:10.85,y:41.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:94.867,x:54.25,y:109.75,regX:-6.2,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:56.8379,x:49.7,y:119.7}},{t:this.instance_12,p:{regY:1.8,rotation:-13.6797,x:9.85,y:95.25,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:-9.8656,x:27.6,y:189.2,regY:-54.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0418,x:-4.9,y:-58.1,regX:-0.8}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:15.4245,x:-20.95,y:189.25,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-3.7815,x:0.35,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-139.0411,x:-56.1,y:55.8,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-122.4174,x:3.65,y:108.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-145.9028,x:6.9,y:117.25,regX:6.3}},{t:this.instance_2,p:{rotation:-89.655,x:-56.95,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:1.7182,x:-16.9,y:92.7,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:119.1753,x:45.2,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:57.8695,x:8.9,y:40.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:96.2562,x:52.25,y:108.5,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:58.4423,x:47.6,y:118.4}},{t:this.instance_12,p:{regY:1.8,rotation:-14.8954,x:9.45,y:95.35,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:-12.0299,x:29.2,y:189,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0318,x:-4.85,y:-58.1,regX:-0.8}},{t:this.instance_8,p:{regX:2.9,regY:-54.6,rotation:16.6162,x:-23.5,y:189.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-4.0079,x:0.3,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-141.5213,x:-54.75,y:55.85,regX:39.7,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-124.903,x:7.15,y:106.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-148.3972,x:10.75,y:114.5,regX:6.3}},{t:this.instance_2,p:{rotation:-90.5271,x:-56.95,y:-23.1,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-125.2,-374.2,247.9,679);


// stage content:
(lib.LessonChapter2_07 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,217];
	this.streamSoundSymbolsList[0] = [{id:"DuringWar207wav",startFrame:0,endFrame:218,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("DuringWar207wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,218,1);
		this.homeBtn.addEventListener("click", fl_ClickToGoToHomePage);
		
		function fl_ClickToGoToHomePage() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("/Home.html");
			}, 500);
		}
		
		
		this.nextBtn.addEventListener("click", fl_ClickToGoToWebPage);
		
		function fl_ClickToGoToWebPage() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("/LessonChapter2_08.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("/LessonChapter2_06.html");
			}, 500);
			
		}
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_217 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(217).call(this.frame_217).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_2214();
	this.instance.setTransform(195.55,597,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2213();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(218));

	// Buttons
	this.replaybtn = new lib.replay();
	this.replaybtn.name = "replaybtn";
	this.replaybtn.setTransform(1062.2,527.2);
	new cjs.ButtonHelper(this.replaybtn, 0, 1, 1);

	this.nextBtn = new lib.btn_next();
	this.nextBtn.name = "nextBtn";
	this.nextBtn.setTransform(1190,630);
	new cjs.ButtonHelper(this.nextBtn, 0, 1, 1);

	this.prevBtn = new lib.btn_prev();
	this.prevBtn.name = "prevBtn";
	this.prevBtn.setTransform(90,630);
	new cjs.ButtonHelper(this.prevBtn, 0, 1, 1);

	this.homeBtn = new lib.home_btn();
	this.homeBtn.name = "homeBtn";
	this.homeBtn.setTransform(74.95,66,1.0256,1.0256);
	new cjs.ButtonHelper(this.homeBtn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(218));

	// ali
	this.instance_2 = new lib.CharacterGood_01();
	this.instance_2.setTransform(749.95,437.55,0.4812,0.4812,0,0,180,11.8,42.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regY:42.2,scaleX:0.4464,scaleY:0.4464,x:767.7,y:410.05},78).to({regX:12,regY:42,scaleX:0.3849,scaleY:0.3849,x:798.9,y:361.3},138).to({_off:true},1).wait(1));

	// hamzah
	this.instance_3 = new lib.CharacterGood_04();
	this.instance_3.setTransform(561.4,440.25,0.4812,0.4812,0,0,180,37.3,49.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({scaleX:0.433,scaleY:0.433,x:587.15,y:401.95},72).to({regX:37.4,scaleX:0.3849,scaleY:0.3849,x:612.8,y:363.55},72).to({_off:true},1).wait(73));

	// ubaidah
	this.instance_4 = new lib.CharacterGood_02();
	this.instance_4.setTransform(406.7,436.95,0.4812,0.4812,0,0,180,-40.2,46.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({scaleX:0.4798,scaleY:0.4798,x:407.65,y:435.85},1).to({regX:-40.1,scaleX:0.3849,scaleY:0.3849,x:471.05,y:360.85},70).to({_off:true},1).wait(146));

	// utbah
	this.instance_5 = new lib.CharacterBad_01();
	this.instance_5.setTransform(518.5,254.75,0.306,0.306,0,0,180,-39.9,6);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regX:-39.8,scaleX:0.3825,scaleY:0.3826,x:486.6,y:347.85},71).to({_off:true},1).wait(146));

	// syaibah
	this.instance_6 = new lib.CharacterBad_02();
	this.instance_6.setTransform(685.25,264.5,0.306,0.306,0,0,180,-14.4,35.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({regX:-14.6,regY:36,scaleX:0.3474,scaleY:0.3475,x:665.6,y:316.3},78).to({regX:-14.2,regY:35.7,scaleX:0.3825,scaleY:0.3826,x:648.85,y:360},66).to({_off:true},1).wait(73));

	// alWalid
	this.instance_7 = new lib.CharacterBad_04();
	this.instance_7.setTransform(868.5,271.3,0.306,0.306,0,0,180,-39.9,49.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({regX:-40,regY:49.6,scaleX:0.3336,scaleY:0.3336,x:856.7,y:306.45},78).to({regX:-39.9,scaleX:0.3825,scaleY:0.3826,x:835.65,y:368.6},138).to({_off:true},1).wait(1));

	// Layer_1
	this.instance_8 = new lib.CachedBmp_2218();
	this.instance_8.setTransform(416.55,220.3,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_2217();
	this.instance_9.setTransform(412.2,211,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_2216();
	this.instance_10.setTransform(423.85,369.05,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_2215();
	this.instance_11.setTransform(411.95,359,0.5,0.5);

	this.instance_12 = new lib.effect_fight();
	this.instance_12.setTransform(462.65,307.7,0.3574,0.3574);

	this.instance_13 = new lib.CachedBmp_2226();
	this.instance_13.setTransform(416.55,220.3,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_2225();
	this.instance_14.setTransform(412.2,211,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_2224();
	this.instance_15.setTransform(423.85,369.05,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_2223();
	this.instance_16.setTransform(411.95,359,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_2222();
	this.instance_17.setTransform(592.5,228,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_2221();
	this.instance_18.setTransform(587.7,211,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_2220();
	this.instance_19.setTransform(594.1,369.05,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_2219();
	this.instance_20.setTransform(588.25,359,0.5,0.5);

	this.instance_21 = new lib.effect_fight();
	this.instance_21.setTransform(638.2,307.7,0.3574,0.3574);

	this.instance_22 = new lib.CachedBmp_2238();
	this.instance_22.setTransform(782.7,369,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_2237();
	this.instance_23.setTransform(763.1,358.95,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_2236();
	this.instance_24.setTransform(767.65,228,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_2235();
	this.instance_25.setTransform(763.4,211,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_2234();
	this.instance_26.setTransform(416.55,220.3,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_2233();
	this.instance_27.setTransform(412.2,211,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_2232();
	this.instance_28.setTransform(423.85,369.05,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_2231();
	this.instance_29.setTransform(412,359,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_2230();
	this.instance_30.setTransform(592.5,228,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_2229();
	this.instance_31.setTransform(587.65,211,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_2228();
	this.instance_32.setTransform(594.1,369.05,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_2227();
	this.instance_33.setTransform(588.3,359,0.5,0.5);

	this.instance_34 = new lib.effect_fight();
	this.instance_34.setTransform(462.65,307.7,0.3574,0.3574);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_12,p:{x:462.65}},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8}]},72).to({state:[{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_12,p:{x:462.65}},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13}]},73).to({state:[{t:this.instance_34},{t:this.instance_21},{t:this.instance_12,p:{x:813.75}},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22}]},72).wait(1));

	// Background
	this.instance_35 = new lib.Chap2Scene4();
	this.instance_35.setTransform(-479,-269,0.9163,0.9163);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(218));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(161,91,1245.5,749);
// library properties:
lib.properties = {
	id: 'A6F1A483617F544186FFC32FE4892FD2',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/LessonChapter2_07_atlas_1.png", id:"LessonChapter2_07_atlas_1"},
		{src:"images/LessonChapter2_07_atlas_2.png", id:"LessonChapter2_07_atlas_2"},
		{src:"sounds/DuringWar207wav.mp3", id:"DuringWar207wav"},
		{src:"sounds/popsound.mp3", id:"popsound"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['A6F1A483617F544186FFC32FE4892FD2'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;