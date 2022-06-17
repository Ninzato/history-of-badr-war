(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter3_05_atlas_1", frames: [[1282,0,580,592],[0,1188,569,546],[1864,294,163,120],[1864,416,163,120],[1714,594,134,50],[1282,594,132,102],[1864,538,134,130],[1714,646,122,50],[1864,0,175,145],[1831,990,202,144],[1838,670,115,48],[1864,147,175,145],[1831,1136,199,144],[0,990,1829,196],[0,722,1914,266],[1621,594,91,87],[1528,594,91,88],[1416,594,110,107],[0,0,1280,720]]}
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



(lib.CachedBmp_2651 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2650 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2649 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2648 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2647 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2646 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2645 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2644 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2643 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2642 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2641 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2640 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2639 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2638 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2637 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.Chap3GeneralScene = function() {
	this.initialize(ss["LessonChapter3_05_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol4 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.rf(["#FF8500","rgba(255,142,1,0.918)","rgba(255,181,3,0.588)","rgba(255,211,5,0.333)","rgba(255,233,6,0.145)","rgba(255,246,7,0.035)","rgba(255,250,7,0)"],[0,0.043,0.243,0.443,0.639,0.827,1],0,0,0,0,0,194.3).s().p("Ar0b+QlciTkNkNQkNkNiUldQiYloAAmMQAAmKCYlqQCUlcENkNQENkNFciUQFqiYGKAAQGMAAFoCYQFdCUENENQENENCTFcQCZFqAAGKQAAGMiZFoQiTFdkNENQkNENldCTQloCZmMAAQmKAAlqiZg");
	this.shape.setTransform(194.3,194.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(0,0,388.6,388.6), null);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.rf(["#FF8500","rgba(255,142,1,0.918)","rgba(255,181,3,0.588)","rgba(255,211,5,0.333)","rgba(255,233,6,0.145)","rgba(255,246,7,0.035)","rgba(255,250,7,0)"],[0,0.043,0.243,0.443,0.639,0.827,1],0,0,0,0,0,82.7).s().p("AlBL6QiUg/hzhyQhyhzg/iUQhBiaAAioQAAinBBiaQA/iUByhzQBzhyCUg/QCahBCnAAQCoAACaBBQCUA/ByByQBzBzA/CUQBBCaAACnQAACohBCaQg/CUhzBzQhyByiUA/QiaBBioAAQinAAiahBg");
	this.shape.setTransform(82.675,82.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,165.4,165.4), null);


(lib.Symbol2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_2651();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,290,296), null);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_2650();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,284.5,273), null);


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
	this.instance = new lib.CachedBmp_2648();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2649();
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
	this.instance = new lib.CachedBmp_2645();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_2647();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_2646();
	this.instance_2.setTransform(-33.05,-28.15,0.4875,0.4875);

	this.instance_3 = new lib.CompoundPath();
	this.instance_3.setTransform(-159.75,-154.3,3.5004,3.5004);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-159.7,-154.3,318.5,304.6);


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
	this.instance = new lib.CachedBmp_2642();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2644();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2643();
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
	this.instance = new lib.CachedBmp_2639();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2641();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2640();
	this.instance_2.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(216.45,-207.05,4.7384,4.7384,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


(lib.swordClash = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// one
	this.instance = new lib.Symbol1();
	this.instance.setTransform(91.95,-40.95,1,1,44.9994,0,0,141,136.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:142.3,regY:136.5,rotation:43.0431,x:89.45,y:-39.95},0).wait(1).to({rotation:41.0866,x:86.05,y:-40},0).wait(1).to({rotation:39.1301,x:82.7},0).wait(1).to({rotation:37.1736,x:79.35,y:-40.05},0).wait(1).to({rotation:35.2171,x:76,y:-40.1},0).wait(1).to({rotation:33.2606,x:72.65},0).wait(1).to({rotation:31.3041,x:69.3,y:-40.15},0).wait(1).to({rotation:29.3476,x:65.9},0).wait(1).to({rotation:27.3911,x:62.55,y:-40.25},0).wait(1).to({rotation:25.4346,x:59.2,y:-40.3},0).wait(1).to({rotation:23.4781,x:55.8},0).wait(1).to({rotation:21.5215,x:52.5,y:-40.35},0).wait(1).to({rotation:19.565,x:49.1,y:-40.4},0).wait(1).to({rotation:17.6085,x:45.7,y:-40.45},0).wait(1).to({rotation:15.652,x:42.3},0).wait(1).to({rotation:13.6955,x:38.95,y:-40.55},0).wait(1).to({rotation:11.739,x:35.6},0).wait(1).to({rotation:9.7825,x:32.2,y:-40.6},0).wait(1).to({rotation:7.826,x:28.8,y:-40.65},0).wait(1).to({rotation:5.8695,x:25.45,y:-40.7},0).wait(1).to({rotation:3.913,x:22.05,y:-40.75},0).wait(1).to({rotation:1.9565,x:18.65,y:-40.8},0).wait(1).to({rotation:0,x:15.3},0).wait(25).to({rotation:1.875,x:18.5,y:-40.75},0).wait(1).to({rotation:3.75,x:21.75},0).wait(1).to({rotation:5.625,x:25,y:-40.7},0).wait(1).to({rotation:7.4999,x:28.3,y:-40.65},0).wait(1).to({rotation:9.3749,x:31.5,y:-40.55},0).wait(1).to({rotation:11.2499,x:34.7},0).wait(1).to({rotation:13.1249,x:38},0).wait(1).to({rotation:14.9999,x:41.2,y:-40.45},0).wait(1).to({rotation:16.8749,x:44.45,y:-40.5},0).wait(1).to({rotation:18.7498,x:47.7,y:-40.4},0).wait(1).to({rotation:20.6248,x:50.9},0).wait(1).to({rotation:22.4998,x:54.1,y:-40.35},0).wait(1).to({rotation:24.3748,x:57.35,y:-40.25},0).wait(1).to({rotation:26.2498,x:60.6},0).wait(1).to({rotation:28.1248,x:63.8,y:-40.2},0).wait(1).to({rotation:29.9997,x:67},0).wait(1).to({rotation:31.8747,x:70.2,y:-40.15},0).wait(1).to({rotation:33.7497,x:73.4,y:-40.1},0).wait(1).to({rotation:35.6247,x:76.65,y:-40.05},0).wait(1).to({rotation:37.4997,x:79.9,y:-40},0).wait(1).to({rotation:39.3747,x:83.1,y:-40.05},0).wait(1).to({rotation:41.2496,x:86.35},0).wait(1).to({rotation:43.1246,x:89.55,y:-39.95},0).wait(1).to({rotation:44.9996,x:92.8},0).wait(1));

	// two
	this.instance_1 = new lib.Symbol2();
	this.instance_1.setTransform(-84.1,-52.4,1,1,-45,0,0,144.9,146.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:145,regY:148,rotation:-43.0431,x:-79.75,y:-51.5},0).wait(1).to({rotation:-41.0866,x:-76.4},0).wait(1).to({rotation:-39.1301,x:-73,y:-51.45},0).wait(1).to({rotation:-37.1736,x:-69.65,y:-51.4},0).wait(1).to({rotation:-35.2171,x:-66.3},0).wait(1).to({rotation:-33.2606,x:-62.95,y:-51.35},0).wait(1).to({rotation:-31.3041,x:-59.6},0).wait(1).to({rotation:-29.3476,x:-56.2,y:-51.3},0).wait(1).to({rotation:-27.3911,x:-52.85},0).wait(1).to({rotation:-25.4346,x:-49.55,y:-51.25},0).wait(1).to({rotation:-23.4781,x:-46.2,y:-51.2},0).wait(1).to({rotation:-21.5215,x:-42.8},0).wait(1).to({rotation:-19.565,x:-39.45},0).wait(1).to({rotation:-17.6085,x:-36.15},0).wait(1).to({rotation:-15.652,x:-32.8,y:-51.15},0).wait(1).to({rotation:-13.6955,x:-29.4},0).wait(1).to({rotation:-11.739,x:-26.1},0).wait(1).to({rotation:-9.7825,x:-22.75},0).wait(1).to({rotation:-7.826,x:-19.4},0).wait(1).to({rotation:-5.8695,x:-16.05},0).wait(1).to({rotation:-3.913,x:-12.7,y:-51.1},0).wait(1).to({rotation:-1.9565,x:-9.4},0).wait(1).to({rotation:0,x:-6},0).wait(25).to({rotation:-1.875,x:-9.25},0).wait(1).to({rotation:-3.75,x:-12.4},0).wait(1).to({rotation:-5.6249,x:-15.65},0).wait(1).to({rotation:-7.4999,x:-18.85},0).wait(1).to({rotation:-9.3749,x:-22.05},0).wait(1).to({rotation:-11.2499,x:-25.3,y:-51.15},0).wait(1).to({rotation:-13.1249,x:-28.5,y:-51.1},0).wait(1).to({rotation:-14.9999,x:-31.7,y:-51.2},0).wait(1).to({rotation:-16.8748,x:-34.9,y:-51.15},0).wait(1).to({rotation:-18.7498,x:-38.1,y:-51.2},0).wait(1).to({rotation:-20.6248,x:-41.3},0).wait(1).to({rotation:-22.4998,x:-44.5},0).wait(1).to({rotation:-24.3748,x:-47.75,y:-51.25},0).wait(1).to({rotation:-26.2498,x:-50.95},0).wait(1).to({rotation:-28.1247,x:-54.15,y:-51.3},0).wait(1).to({rotation:-29.9997,x:-57.4,y:-51.35},0).wait(1).to({rotation:-31.8747,x:-60.55,y:-51.3},0).wait(1).to({rotation:-33.7497,x:-63.8,y:-51.35},0).wait(1).to({rotation:-35.6247,x:-67,y:-51.4},0).wait(1).to({rotation:-37.4997,x:-70.2},0).wait(1).to({rotation:-39.3746,x:-73.4,y:-51.45},0).wait(1).to({rotation:-41.2496,x:-76.65,y:-51.5},0).wait(1).to({rotation:-43.1246,x:-79.85},0).wait(1).to({rotation:-44.9996,x:-83.05,y:-51.55},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-290.3,-258.7,580.2,415.79999999999995);


(lib.ransom = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// lightUp
	this.instance = new lib.Symbol3();
	this.instance.setTransform(0.5,19.6,1,1,0,0,0,82.7,82.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:0.993,scaleY:0.993,y:20.25},0).wait(1).to({scaleX:0.986,scaleY:0.986,x:0.55,y:20.95},0).wait(1).to({scaleX:0.979,scaleY:0.979,x:0.5,y:21.6},0).wait(1).to({scaleX:0.972,scaleY:0.972,x:0.55,y:22.3},0).wait(1).to({scaleX:0.965,scaleY:0.965,x:0.5,y:22.95},0).wait(1).to({scaleX:0.958,scaleY:0.958,x:0.55,y:23.65},0).wait(1).to({scaleX:0.9511,scaleY:0.9511,x:0.5,y:24.3},0).wait(1).to({scaleX:0.9441,scaleY:0.9441,y:24.95},0).wait(1).to({scaleX:0.9371,scaleY:0.9371,x:0.55,y:25.65},0).wait(1).to({scaleX:0.9301,scaleY:0.9301,x:0.5,y:26.3},0).wait(1).to({scaleX:0.9231,scaleY:0.9231,x:0.55,y:26.95},0).wait(1).to({scaleX:0.9161,scaleY:0.9161,x:0.5,y:27.6},0).wait(1).to({scaleX:0.9091,scaleY:0.9091,x:0.55,y:28.3},0).wait(1).to({scaleX:0.9021,scaleY:0.9021,x:0.5,y:28.95},0).wait(1).to({scaleX:0.8951,scaleY:0.8951,x:0.55,y:29.65},0).wait(1).to({scaleX:0.8881,scaleY:0.8881,x:0.5,y:30.3},0).wait(1).to({scaleX:0.8811,scaleY:0.8811,y:30.95},0).wait(1).to({scaleX:0.8741,scaleY:0.8741,x:0.55,y:31.65},0).wait(1).to({scaleX:0.8671,scaleY:0.8671,x:0.5,y:32.3},0).wait(1).to({scaleX:0.8601,scaleY:0.8601,x:0.55,y:33},0).wait(1).to({scaleX:0.8532,scaleY:0.8532,x:0.5,y:33.65},0).wait(1).to({scaleX:0.8462,scaleY:0.8462,x:0.55,y:34.3},0).wait(1).to({scaleX:0.8392,scaleY:0.8392,x:0.5,y:34.95},0).wait(25).to({scaleX:0.8459,scaleY:0.8459,y:34.3},0).wait(1).to({scaleX:0.8526,scaleY:0.8526,y:33.7},0).wait(1).to({scaleX:0.8593,scaleY:0.8593,y:33.05},0).wait(1).to({scaleX:0.866,scaleY:0.866,y:32.4},0).wait(1).to({scaleX:0.8727,scaleY:0.8727,y:31.75},0).wait(1).to({scaleX:0.8794,scaleY:0.8794,y:31.1},0).wait(1).to({scaleX:0.8861,scaleY:0.8861,x:0.55,y:30.5},0).wait(1).to({scaleX:0.8928,scaleY:0.8928,y:29.85},0).wait(1).to({scaleX:0.8995,scaleY:0.8995,y:29.25},0).wait(1).to({scaleX:0.9062,scaleY:0.9062,y:28.6},0).wait(1).to({scaleX:0.9129,scaleY:0.9129,y:27.95},0).wait(1).to({scaleX:0.9196,scaleY:0.9196,x:0.5,y:27.3},0).wait(1).to({scaleX:0.9263,scaleY:0.9263,y:26.65},0).wait(1).to({scaleX:0.933,scaleY:0.933,y:26},0).wait(1).to({scaleX:0.9397,scaleY:0.9397,y:25.35},0).wait(1).to({scaleX:0.9464,scaleY:0.9464,y:24.7},0).wait(1).to({scaleX:0.9531,scaleY:0.9531,y:24.1},0).wait(1).to({scaleX:0.9598,scaleY:0.9598,y:23.45},0).wait(1).to({scaleX:0.9665,scaleY:0.9665,x:0.55,y:22.85},0).wait(1).to({scaleX:0.9732,scaleY:0.9732,y:22.2},0).wait(1).to({scaleX:0.9799,scaleY:0.9799,y:21.55},0).wait(1).to({scaleX:0.9866,scaleY:0.9866,y:20.9},0).wait(1).to({scaleX:0.9933,scaleY:0.9933,y:20.25},0).wait(1).to({scaleX:1,scaleY:1,x:0.5,y:19.6},0).wait(1));

	// bag
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DD5F27").s().p("AkCM8QhWgRhdgwQhQgoiBhWQjJiHATjHQAHhHAlhiQAuhtASgxQATgzAQhrQARhxAUg7QBHjZEPiwQBJgvCZgcQCTgbBKAQQCIAfBMAwQCPBaA+C8QAbBUA+CAQBTCsAQAmQBtD/gfDbQgXCZg1BNQgwBEhUAaQg2AQiBAKQiUAKhRARQikAhhkAHQglADghAAQhGAAg6gMg");
	this.shape.setTransform(3.9919,11.926);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B84626").s().p("AhcBVQgIgKgDhHIgGhpQgEgggpggIgpgaQgigDgHgJQgHgIAPgKQAngXA1AOQAZAHBwgMQBegKAWAbQAWAbBCAFIAgADQAHACgPAHQgcAOgbAXIg4AyQgdAZgpCXQgUBLgPBHIg2ADQgniHgMgSg");
	this.shape_1.setTransform(1.7267,-84.5986);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(72));

	// lightBelow
	this.instance_1 = new lib.Symbol4();
	this.instance_1.setTransform(0.45,0.5,1,1,0,0,0,194.3,194.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({scaleX:0.993,scaleY:0.993,x:0.5,y:0.55},0).wait(1).to({scaleX:0.986,scaleY:0.986},0).wait(1).to({scaleX:0.979,scaleY:0.979,x:0.45,y:0.5},0).wait(1).to({scaleX:0.972,scaleY:0.972},0).wait(1).to({scaleX:0.965,scaleY:0.965},0).wait(1).to({scaleX:0.958,scaleY:0.958,x:0.5,y:0.55},0).wait(1).to({scaleX:0.9511,scaleY:0.9511},0).wait(1).to({scaleX:0.9441,scaleY:0.9441},0).wait(1).to({scaleX:0.9371,scaleY:0.9371,x:0.45,y:0.5},0).wait(1).to({scaleX:0.9301,scaleY:0.9301},0).wait(1).to({scaleX:0.9231,scaleY:0.9231},0).wait(1).to({scaleX:0.9161,scaleY:0.9161,x:0.5,y:0.55},0).wait(1).to({scaleX:0.9091,scaleY:0.9091},0).wait(1).to({scaleX:0.9021,scaleY:0.9021},0).wait(1).to({scaleX:0.8951,scaleY:0.8951,x:0.45,y:0.5},0).wait(1).to({scaleX:0.8881,scaleY:0.8881},0).wait(1).to({scaleX:0.8811,scaleY:0.8811},0).wait(1).to({scaleX:0.8741,scaleY:0.8741,x:0.5,y:0.55},0).wait(1).to({scaleX:0.8671,scaleY:0.8671},0).wait(1).to({scaleX:0.8601,scaleY:0.8601,x:0.45,y:0.5},0).wait(1).to({scaleX:0.8532,scaleY:0.8532},0).wait(1).to({scaleX:0.8462,scaleY:0.8462},0).wait(1).to({scaleX:0.8392,scaleY:0.8392},0).wait(25).to({scaleX:0.8459,scaleY:0.8459},0).wait(1).to({scaleX:0.8526,scaleY:0.8526},0).wait(1).to({scaleX:0.8593,scaleY:0.8593},0).wait(1).to({scaleX:0.866,scaleY:0.866},0).wait(1).to({scaleX:0.8727,scaleY:0.8727},0).wait(1).to({scaleX:0.8794,scaleY:0.8794},0).wait(1).to({scaleX:0.8861,scaleY:0.8861},0).wait(1).to({scaleX:0.8928,scaleY:0.8928},0).wait(1).to({scaleX:0.8995,scaleY:0.8995},0).wait(1).to({scaleX:0.9062,scaleY:0.9062},0).wait(1).to({scaleX:0.9129,scaleY:0.9129},0).wait(1).to({scaleX:0.9196,scaleY:0.9196},0).wait(1).to({scaleX:0.9263,scaleY:0.9263,x:0.5,y:0.55},0).wait(1).to({scaleX:0.933,scaleY:0.933},0).wait(1).to({scaleX:0.9397,scaleY:0.9397},0).wait(1).to({scaleX:0.9464,scaleY:0.9464},0).wait(1).to({scaleX:0.9531,scaleY:0.9531},0).wait(1).to({scaleX:0.9598,scaleY:0.9598},0).wait(1).to({scaleX:0.9665,scaleY:0.9665},0).wait(1).to({scaleX:0.9732,scaleY:0.9732},0).wait(1).to({scaleX:0.9799,scaleY:0.9799},0).wait(1).to({scaleX:0.9866,scaleY:0.9866},0).wait(1).to({scaleX:0.9933,scaleY:0.9933},0).wait(1).to({scaleX:1,scaleY:1,x:0.45,y:0.5},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-193.8,-193.8,388.6,388.6);


// stage content:
(lib.LessonChapter3_05 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,285];
	this.streamSoundSymbolsList[0] = [{id:"AfterWar205wav",startFrame:0,endFrame:286,loop:1,offset:4380}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("AfterWar205wav",0,4380);
		this.InsertIntoSoundStreamData(soundInstance,0,286,1,4380);
		this.homeBtn.addEventListener("click", fl_ClickToGoToHomePage);
		
		function fl_ClickToGoToHomePage() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/Home.html");
			}, 500);
		}
		
		this.nextBtn.addEventListener("click", fl_ClickToGoToWebPage);
		
		function fl_ClickToGoToWebPage() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter3_06.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter3_04.html");
			}, 500);
			
		}
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_285 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(285).call(this.frame_285).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_2638();
	this.instance.setTransform(182.8,581,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2637();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(286));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(286));

	// rid
	this.instance_2 = new lib.swordClash();
	this.instance_2.setTransform(881.1,335.45,0.7459,0.7459,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(286));

	// ransom
	this.instance_3 = new lib.ransom();
	this.instance_3.setTransform(374.75,324.6,0.7459,0.7459,0,0,0,0,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(286));

	// Background
	this.instance_4 = new lib.Chap3GeneralScene();

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(286));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(515.3,267.8,891.2,572.2);
// library properties:
lib.properties = {
	id: 'A6F1A483617F544186FFC32FE4892FD2',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/LessonChapter3_05_atlas_1.png", id:"LessonChapter3_05_atlas_1"},
		{src:"sounds/AfterWar205wav.mp3", id:"AfterWar205wav"},
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