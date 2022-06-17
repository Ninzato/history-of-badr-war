(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter2_04_atlas_1", frames: [[0,1548,474,240],[0,1790,474,240],[476,1548,474,240],[952,1548,357,308],[1311,1548,357,308],[1670,1548,324,330],[0,1350,1779,196],[0,1082,1914,266],[0,0,1920,1080]]},
		{name:"LessonChapter2_04_atlas_2", frames: [[212,613,163,120],[377,631,163,120],[771,809,134,50],[542,631,132,102],[872,312,134,130],[436,312,434,84],[436,398,434,84],[0,310,434,155],[0,0,330,308],[332,0,327,292],[576,771,193,36],[186,792,193,36],[661,0,306,310],[381,792,193,36],[576,809,193,36],[0,811,122,50],[405,484,175,145],[0,467,202,144],[907,809,115,48],[582,484,175,145],[204,467,199,144],[676,700,193,69],[759,484,210,106],[186,753,193,37],[759,592,210,106],[381,753,193,37],[0,613,210,106],[93,721,91,87],[0,721,91,88],[871,700,110,107]]}
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



(lib.CachedBmp_2124 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2123 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2122 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2121 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2120 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2119 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2118 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2117 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2116 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2115 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2114 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2113 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2112 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2111 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2110 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2109 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2108 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2107 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2106 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2105 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2104 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2103 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2102 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2101 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2100 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2099 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2098 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2097 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2096 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2095 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2094 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2093 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2092 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2091 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2090 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter2_04_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.Chap2Scene4 = function() {
	this.initialize(ss["LessonChapter2_04_atlas_1"]);
	this.gotoAndStop(8);
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
	this.instance = new lib.CachedBmp_2123();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2124();
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
	this.instance = new lib.CachedBmp_2120();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_2122();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_2121();
	this.instance_2.setTransform(-33.05,-28.15,0.4875,0.4875);

	this.instance_3 = new lib.CompoundPath();
	this.instance_3.setTransform(-159.75,-154.3,3.5004,3.5004);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-159.7,-154.3,318.5,304.6);


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
	this.shape.graphics.f("#5C4734").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape.setTransform(1.4087,4.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_1.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-55.7,35.599999999999994,120.5);


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
	this.shape.graphics.f("#5C4734").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape.setTransform(-2.1913,53.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-7.1,35.6,120.5);


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
	this.instance = new lib.CachedBmp_2113();
	this.instance.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,165,154);


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
	this.shape.graphics.f("#453526").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape.graphics.f("#453526").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.shape.graphics.f("#453526").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
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
	this.shape.graphics.f("#453526").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
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
	this.shape.graphics.f("#453526").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
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
	this.instance = new lib.CachedBmp_2112();
	this.instance.setTransform(-78.4,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.4,-67.4,163.5,146);


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
	this.shape_2.graphics.f("#4F1006").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_2.setTransform(1.4087,4.525);

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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4F1006").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_1.setTransform(-2.1913,53.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

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
	this.instance_1 = new lib.CachedBmp_2111();
	this.instance_1.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,178.5,154);


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
	this.shape_1.graphics.f("#3D0C01").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape_1.graphics.f("#3D0C01").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.shape_1.graphics.f("#3D0C01").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
	this.shape_1.setTransform(0.4,19.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.9,-12.1,98.6,63.1);


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
	this.instance = new lib.CachedBmp_2110();
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
	this.instance = new lib.CachedBmp_2109();
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
	this.instance_1 = new lib.CachedBmp_2108();
	this.instance_1.setTransform(-73.85,-69.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.8,-69.6,153,155);


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
	this.shape.graphics.f("#00563E").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape.setTransform(1.4087,4.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_1.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-55.7,35.599999999999994,120.5);


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
	this.shape.graphics.f("#00563E").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape.setTransform(-2.1913,53.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-7.1,35.6,120.5);


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
	this.instance = new lib.CachedBmp_2107();
	this.instance.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,178.5,154);


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
	this.shape.graphics.f("#013221").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape.graphics.f("#013221").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.shape.graphics.f("#013221").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
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
	this.instance = new lib.CachedBmp_2106();
	this.instance.setTransform(-48.3,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-8.9,96.5,18);


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
	this.instance = new lib.CachedBmp_2105();
	this.instance.setTransform(-48.25,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-8.9,96.5,18);


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
	this.instance = new lib.CachedBmp_2104();
	this.instance.setTransform(-76.25,-80.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.2,-80.2,162,165);


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
	this.instance = new lib.CachedBmp_2101();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2103();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2102();
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
	this.instance = new lib.CachedBmp_2098();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2100();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2099();
	this.instance_2.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(216.45,-207.05,4.7384,4.7384,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


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
	this.instance = new lib.CachedBmp_2119();
	this.instance.setTransform(-104.45,-345.85,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2118();
	this.instance_1.setTransform(-114.3,-384.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(40));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_2.setTransform(-57.3,-22.95,0.9985,0.9985,-67.6741,0,0,35.7,0.4);

	this.instance_3 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_3.setTransform(-59.3,134.95,0.9983,0.9983,-110.4989,0,0,6.5,-1.2);

	this.instance_4 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_4.setTransform(-62.7,126.85,0.9985,0.9985,-120.7525,0,0,5.5,-8.7);

	this.instance_5 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_5.setTransform(-87.1,49.7,0.9985,0.9985,-107.408,0,0,40.2,0.1);

	this.instance_6 = new lib.ch1_headcopy2("synched",0);
	this.instance_6.setTransform(-0.5,-79.45,0.9991,0.9991,-2.0342,0,0,0.8,52.5);

	this.instance_7 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_7.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_8 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_8.setTransform(13.6,178.35,0.998,0.998,-11.9336,0,0,2.7,-54.2);

	this.instance_9 = new lib.ch1_neckcopy2("synched",0);
	this.instance_9.setTransform(-4.8,-58.3,0.9991,0.9991,10.2033,0,0,-0.7,8.6);

	this.instance_10 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_10.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_11 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_11.setTransform(-2.1,187.65,0.9977,0.9977,36.4575,0,0,3.8,-53.6);

	this.instance_12 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_12.setTransform(15.6,93.2,0.9977,0.9977,7.8124,0,0,-0.3,1.8);

	this.instance_13 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_13.setTransform(99.55,121.6,0.9984,0.9984,34.1068,0,0,-5.4,2.8);

	this.instance_14 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_14.setTransform(97.35,110.3,0.9985,0.9985,58.3925,0,0,-6.4,7.9);

	this.instance_15 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_15.setTransform(44.9,49.65,0.9985,0.9985,49.2991,0,0,-40.4,-1);

	this.instance_16 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_16.setTransform(45.35,-26.05,0.9985,0.9985,91.3407,0,0,-33.3,0.1);

	this.instance_17 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_17.setTransform(-25.45,90.25,0.998,0.998,-26.6677,0,0,2.5,-45.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{rotation:-26.6677,x:-25.45,y:90.25,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0.1,scaleX:0.9985,scaleY:0.9985,rotation:91.3407,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9985,scaleY:0.9985,rotation:49.2991,x:44.9,y:49.65,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:58.3925,x:97.35,y:110.3,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9984,scaleY:0.9984,rotation:34.1068,x:99.55,y:121.6}},{t:this.instance_12,p:{regX:-0.3,rotation:7.8124,x:15.6,y:93.2,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.6,scaleX:0.9977,scaleY:0.9977,rotation:36.4575,x:-2.1,y:187.65,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:10.2033,x:-4.8,y:-58.3,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.998,scaleY:0.998,rotation:-11.9336,x:13.6,y:178.35,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.0342,x:-0.5,y:-79.45,regY:52.5}},{t:this.instance_5,p:{regY:0.1,rotation:-107.408,x:-87.1,y:49.7,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9985,scaleY:0.9985,rotation:-120.7525,x:-62.7,y:126.85,regY:-8.7}},{t:this.instance_3,p:{regX:6.5,scaleX:0.9983,scaleY:0.9983,rotation:-110.4989,x:-59.3,y:134.95,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-67.6741,x:-57.3,y:-22.95,regY:0.4,regX:35.7}}]}).to({state:[{t:this.instance_17,p:{rotation:-25.0228,x:-25.3,y:90.15,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:92.2317,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:50.7149,x:43.65,y:49.65,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:59.8134,x:94.6,y:111.55,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:35.5388,x:96.6,y:122.9}},{t:this.instance_12,p:{regX:-0.2,rotation:6.6169,x:15.4,y:93.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:33.7858,x:-0.45,y:188.15,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2092,x:-4.75,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-10.491,x:11.1,y:179.4,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.9169,x:-0.4,y:-79.45,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-108.5382,x:-85.35,y:50.5,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-121.8751,x:-59.3,y:127.15,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-111.6186,x:-55.7,y:135.3,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.1497,x:-57.25,y:-23,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-23.3778,x:-25.1,y:90.3,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:93.1241,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:52.1319,x:42.55,y:49.6,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:61.2329,x:91.9,y:112.7,regY:7.8,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:36.9704,x:93.5,y:124.15}},{t:this.instance_12,p:{regX:-0.2,rotation:5.4229,x:15.05,y:93.45,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:31.1127,x:1.25,y:188.55,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2169,x:-4.75,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-9.0491,x:8.7,y:180.65,regY:-54.1,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.8013,x:-0.45,y:-79.45,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-109.6714,x:-83.55,y:51.05,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-122.9974,x:-55.9,y:127.35,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-112.7382,x:-52.2,y:135.35,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.6233,x:-57.2,y:-22.95,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-21.7326,x:-24.95,y:90.35,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:94.0147,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:53.5478,x:41.25,y:49.55,regY:-0.9,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:62.6533,x:89.2,y:113.8,regY:7.8,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:38.4014,x:90.5,y:125.4}},{t:this.instance_12,p:{regX:-0.2,rotation:4.2268,x:14.75,y:93.6,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:28.44,x:2.95,y:189,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2252,x:-4.8,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-7.6075,x:6.25,y:181.45,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6831,x:-0.35,y:-79.4,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-110.8025,x:-81.55,y:51.8,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-124.1212,x:-52.55,y:127.3,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-113.8579,x:-48.65,y:135.4,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-72.0973,x:-57.35,y:-23,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-20.0885,x:-24.8,y:90.35,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:94.908,x:45.4,y:-26,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:54.9638,x:40.15,y:49.55,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:64.0721,x:86.4,y:115.05,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:39.8327,x:87.45,y:126.5}},{t:this.instance_12,p:{regX:-0.2,rotation:3.0317,x:14.45,y:93.7,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:25.7674,x:4.6,y:189.4,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2313,x:-4.8,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-6.1639,x:3.9,y:182.45,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.5658,x:-0.35,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-111.9354,x:-79.75,y:52.35,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-125.2439,x:-49.05,y:127.35,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-114.9793,x:-45.1,y:135.35,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.5722,x:-57.25,y:-23.05,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-18.443,x:-24.65,y:90.45,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:95.7997,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:56.3804,x:38.95,y:49.4,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:65.4929,x:83.5,y:115.95,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:41.265,x:84.3,y:127.5}},{t:this.instance_12,p:{regX:-0.2,rotation:1.8362,x:14.15,y:93.8,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.6,scaleX:0.9976,scaleY:0.9976,rotation:23.0935,x:6.3,y:189.55,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2394,x:-4.8,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-4.7231,x:1.3,y:183.4,regY:-54.1,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.4485,x:-0.4,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-113.0672,x:-77.7,y:52.9,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-126.368,x:-45.65,y:127.3,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-116.0993,x:-41.5,y:135.2,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.0456,x:-57.35,y:-23,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-16.7986,x:-24.45,y:90.55,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:96.6922,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:57.7963,x:37.8,y:49.25,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:66.9129,x:80.7,y:116.95,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:42.6957,x:81.15,y:128.55}},{t:this.instance_12,p:{regX:-0.2,rotation:0.6415,x:13.85,y:93.95,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:20.4219,x:8,y:189.95,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2465,x:-4.75,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-3.2792,x:-1.15,y:184.05,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.3321,x:-0.4,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-114.1976,x:-75.75,y:53.5,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-127.4918,x:-42.2,y:127.2,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-117.2188,x:-37.85,y:134.9,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-76.5206,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-15.1535,x:-24.3,y:90.55,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:97.5826,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:59.2126,x:36.6,y:49.2,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:68.3319,x:77.85,y:117.8,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:44.128,x:78.1,y:129.45}},{t:this.instance_12,p:{regX:-0.2,rotation:-0.5503,x:13.5,y:94.05,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:17.7479,x:9.6,y:190.15,regX:3.7}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2537,x:-4.75,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-1.8366,x:-3.7,y:184.75,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.2156,x:-0.4,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-115.3299,x:-73.7,y:53.9,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-128.6147,x:-38.85,y:126.9,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-118.3385,x:-34.35,y:134.7,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.9958,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-13.508,x:-24.1,y:90.7,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:98.4767,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:60.6275,x:35.4,y:49.1,regY:-1,regX:-40.3}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:69.7516,x:75,y:118.7,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:45.5586,x:74.9,y:130.3}},{t:this.instance_12,p:{regX:-0.2,rotation:-1.7459,x:13.2,y:94.2,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.6,scaleX:0.9976,scaleY:0.9976,rotation:15.0753,x:11.4,y:190.2,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2616,x:-4.75,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.998,scaleY:0.998,rotation:-0.396,x:-6.1,y:185.4,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.0984,x:-0.35,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-116.4628,x:-71.85,y:54.2,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-129.7375,x:-35.45,y:126.6,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-119.4588,x:-30.7,y:134.25,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4689,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-11.8632,x:-23.95,y:90.75,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:99.3683,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:62.0438,x:34.3,y:48.8,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:71.1724,x:72.05,y:119.6,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:46.9913,x:71.75,y:131.1}},{t:this.instance_12,p:{regX:-0.2,rotation:-2.9405,x:12.9,y:94.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:12.4019,x:13.1,y:190.45,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2688,x:-4.75,y:-58.25,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.0426,x:-8.8,y:185.85,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9802,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-117.5946,x:-69.75,y:54.7,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-130.8601,x:-31.9,y:126.3,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-120.5791,x:-27.15,y:133.75,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.9432,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-10.2187,x:-23.8,y:90.65,regY:-45.7,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:100.2606,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:63.46,x:33.15,y:48.65,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:72.5921,x:69.1,y:120.2,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:48.4228,x:68.5,y:131.85}},{t:this.instance_12,p:{regX:-0.2,rotation:-4.1363,x:12.6,y:94.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:9.7289,x:14.7,y:190.6,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2767,x:-4.8,y:-58.3,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:2.4854,x:-11.4,y:186.35,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.8638,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-118.7263,x:-67.8,y:54.9,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-131.985,x:-28.5,y:125.7,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-121.6998,x:-23.55,y:133.2,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-82.4175,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-8.5734,x:-23.65,y:90.9,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:101.1519,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:64.8759,x:31.95,y:48.45,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:74.0125,x:66.15,y:120.85,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:49.8547,x:65.25,y:132.45}},{t:this.instance_12,p:{regX:-0.2,rotation:-5.3314,x:12.25,y:94.55,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:7.0577,x:16.35,y:190.65,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2839,x:-4.75,y:-58.3,regX:-0.7}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:3.9279,x:-13.95,y:186.9,regY:-54.1,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.7465,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-119.8601,x:-65.75,y:55.15,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-133.1068,x:-25.1,y:125.25,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-122.8197,x:-20,y:132.55,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-83.8922,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-6.9289,x:-23.4,y:90.95,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:102.0439,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:66.2914,x:30.75,y:48.2,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:75.4315,x:63.2,y:121.45,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:51.2858,x:62,y:133.05}},{t:this.instance_12,p:{regX:-0.2,rotation:-6.5271,x:11.95,y:94.65,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:4.3843,x:18.1,y:190.7,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.2909,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.3713,x:-16.6,y:187,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.6292,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-120.99,x:-63.75,y:55.35,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-134.2309,x:-21.75,y:124.55,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-123.9395,x:-16.45,y:131.8,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-85.3663,x:-57.3,y:-23.2,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-5.2838,x:-23.25,y:91,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:102.9356,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:67.708,x:29.6,y:48,regY:-1,regX:-40.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:76.8519,x:60.2,y:122.1,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:52.7183,x:58.8,y:133.65}},{t:this.instance_12,p:{regX:-0.2,rotation:-7.7219,x:11.65,y:94.8,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:1.7109,x:19.75,y:190.6,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.299,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:6.8129,x:-19.2,y:187.25,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.5128,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-122.1218,x:-61.75,y:55.5,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-135.3536,x:-18.3,y:123.95,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-125.0593,x:-12.95,y:131,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-86.8409,x:-57.35,y:-23.2,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-3.638,x:-23.1,y:91.05,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:103.8277,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:69.1236,x:28.5,y:47.7,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:78.2714,x:57.25,y:122.5,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:54.1496,x:55.45,y:134}},{t:this.instance_12,p:{regX:-0.2,rotation:-8.9185,x:11.35,y:94.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-0.9579,x:21.45,y:190.55,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.306,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:8.2559,x:-21.95,y:187.3,regY:-54.2,regX:2.6}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.3956,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-123.2556,x:-59.65,y:55.6,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-136.477,x:-15.05,y:123,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-126.1797,x:-9.45,y:130.1,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-88.315,x:-57.35,y:-23.2,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.9942,x:-22.95,y:91,regY:-45.7,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:104.7203,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:70.5404,x:27.35,y:47.45,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:79.6926,x:54.25,y:122.85,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:55.5807,x:52.25,y:134.45}},{t:this.instance_12,p:{regX:-0.2,rotation:-10.1134,x:10.95,y:95,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-3.6306,x:23.1,y:190.45,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3132,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:9.6974,x:-24.45,y:187.5,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.2792,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-124.3873,x:-57.7,y:55.65,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-137.5997,x:-11.6,y:122.2,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-127.3006,x:-5.95,y:129.15,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-89.7899,x:-57.35,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-0.3495,x:-22.8,y:91.2,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:105.6121,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:71.9563,x:26.15,y:47.15,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:81.1126,x:51.25,y:123.25,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:57.0119,x:48.8,y:134.6}},{t:this.instance_12,p:{regX:-0.2,rotation:-11.3087,x:10.65,y:95.1,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-6.3043,x:24.75,y:190.3,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3211,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.1405,x:-27,y:187.45,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.1619,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-125.5203,x:-55.6,y:55.65,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-138.7234,x:-8.5,y:121.35,regY:-8.8}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-128.4203,x:-2.6,y:128.1,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-91.2593,x:-57.4,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:1.2923,x:-22.45,y:91.2,regY:-45.6,regX:2.6}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:106.5034,x:45.4,y:-26.15,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:73.3722,x:24.9,y:46.85,regY:-0.9,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:82.5316,x:48.3,y:123.5,regY:7.8,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:58.4436,x:45.6,y:134.9}},{t:this.instance_12,p:{regX:-0.2,rotation:-12.5045,x:10.35,y:95.15,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-8.9759,x:26.4,y:190.05,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3292,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:12.5825,x:-29.45,y:187.35,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.0446,x:-0.25,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-126.6503,x:-53.65,y:55.55,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-139.8473,x:-5.1,y:120.25,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-129.5406,x:0.95,y:126.9,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-92.733,x:-57.3,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:2.936,x:-22.3,y:91.3,regY:-45.6,regX:2.6}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:107.3948,x:45.4,y:-26.15,regX:-33.4}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:74.789,x:23.85,y:46.55,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:83.9522,x:45.15,y:123.85,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:59.876,x:42.25,y:135.05}},{t:this.instance_12,p:{regX:-0.2,rotation:-13.6992,x:10.05,y:95.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-11.649,x:27.95,y:189.85,regX:3.7}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3352,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.025,x:-32.25,y:187.1,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:0.0674,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-127.7834,x:-51.6,y:55.45,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-140.97,x:-1.75,y:119.15,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-130.6608,x:4.3,y:125.75,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-94.2077,x:-57.3,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:4.5822,x:-22.2,y:91.35,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:108.2882,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:76.2055,x:22.8,y:46.2,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:85.3717,x:42.1,y:124.05,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:61.3062,x:38.9,y:135.15}},{t:this.instance_12,p:{regX:-0.2,rotation:-14.8947,x:9.65,y:95.4,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-14.3217,x:29.7,y:189.5,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3434,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:15.4673,x:-34.95,y:186.85,regY:-54.2,regX:2.6}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:0.1847,x:-0.25,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-128.9146,x:-49.55,y:55.25,regX:40.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-142.0938,x:1.5,y:118,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-131.781,x:7.65,y:124.5,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-95.6817,x:-57.3,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:3.0062,x:-22.4,y:91.3,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:107.4289,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:74.8589,x:23.8,y:46.55,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:84.0261,x:45,y:123.75,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:59.9607,x:42.15,y:135.05}},{t:this.instance_12,p:{regX:-0.2,rotation:-13.7487,x:10.05,y:95.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-11.7726,x:28.05,y:189.75,regX:3.7}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3419,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.0919,x:-32.5,y:187.1,regY:-54.2,regX:2.6}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:0.0884,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-127.8263,x:-51.5,y:55.4,regX:40.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-141.0049,x:-1.6,y:119.1,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-130.6905,x:4.45,y:125.7,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-94.2788,x:-57.3,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:1.4298,x:-22.55,y:91.25,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:106.5697,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:73.5119,x:24.9,y:46.8,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:82.6791,x:48.05,y:123.55,regY:7.8,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:58.6142,x:45.25,y:134.95}},{t:this.instance_12,p:{regX:-0.2,rotation:-12.6031,x:10.3,y:95.2,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-9.2226,x:26.6,y:189.95,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3398,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:12.7164,x:-29.8,y:187.35,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.0018,x:-0.25,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-126.7373,x:-53.45,y:55.55,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-139.9163,x:-4.8,y:120.15,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-129.6028,x:1.2,y:126.85,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-92.8742,x:-57.3,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-0.141,x:-22.7,y:91.25,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:105.7088,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:72.1646,x:26,y:47.15,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:81.3325,x:50.85,y:123.45,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:57.2677,x:48.4,y:134.7}},{t:this.instance_12,p:{regX:-0.2,rotation:-11.4572,x:10.6,y:95.1,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-6.6729,x:24.95,y:190.25,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3381,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3415,x:-27.3,y:187.45,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.0971,x:-0.25,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-125.6495,x:-55.4,y:55.65,regX:40.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-138.827,x:-7.95,y:121.2,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-128.5151,x:-2.2,y:128,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-91.4703,x:-57.3,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.7173,x:-22.85,y:91.15,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:104.8499,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:70.819,x:27.2,y:47.35,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:79.9862,x:53.7,y:122.95,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:55.9203,x:51.6,y:134.4}},{t:this.instance_12,p:{regX:-0.2,rotation:-10.311,x:10.9,y:95,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-4.1225,x:23.4,y:190.35,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3374,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:9.9667,x:-24.9,y:187.45,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.1925,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-124.5593,x:-57.25,y:55.65,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-137.7391,x:-11.1,y:122.15,regY:-8.8}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-127.4255,x:-5.45,y:129.1,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-90.0657,x:-57.3,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-3.2931,x:-22.95,y:91,regY:-45.6,regX:2.6}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:103.9902,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:69.4716,x:28.25,y:47.75,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:78.6396,x:56.55,y:122.6,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:54.5749,x:54.75,y:134.1}},{t:this.instance_12,p:{regX:-0.2,rotation:-9.1661,x:11.2,y:94.9,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:-1.5733,x:21.8,y:190.55,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3352,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:8.5925,x:-22.35,y:187.35,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.287,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-123.473,x:-59.2,y:55.6,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-136.6491,x:-14.25,y:122.9,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-126.337,x:-8.7,y:129.9,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-88.668,x:-57.3,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-4.8688,x:-23.1,y:91.05,regY:-45.6,regX:2.6}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:103.1315,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:68.1259,x:29.35,y:47.9,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:77.294,x:59.45,y:122.15,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:53.2266,x:57.9,y:133.7}},{t:this.instance_12,p:{regX:-0.2,rotation:-8.0192,x:11.55,y:94.85,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:0.9737,x:20.15,y:190.6,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3335,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:7.2162,x:-19.85,y:187.35,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.3824,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-122.3839,x:-61.15,y:55.5,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-135.5616,x:-17.5,y:123.75,regY:-8.8}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-125.2485,x:-12.05,y:130.85,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-87.2635,x:-57.3,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-6.4437,x:-23.25,y:90.95,regY:-45.6,regX:2.6}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:102.2707,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:66.7785,x:30.45,y:48.3,regY:-0.9,regX:-40.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:75.9457,x:62.25,y:121.65,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:51.8817,x:61.05,y:133.35}},{t:this.instance_12,p:{regX:-0.2,rotation:-6.8737,x:11.8,y:94.7,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:3.5216,x:18.55,y:190.7,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3321,x:-4.8,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.8414,x:-17.3,y:187.1,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.4778,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-121.2949,x:-63.1,y:55.45,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-134.4731,x:-20.7,y:124.45,regY:-8.7}},{t:this.instance_3,p:{regX:6.5,scaleX:0.9982,scaleY:0.9982,rotation:-124.1596,x:-15.5,y:131.55,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-85.8608,x:-57.35,y:-23.1,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-8.0191,x:-23.55,y:90.9,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:101.4116,x:45.45,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:65.4315,x:31.6,y:48.35,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:74.6002,x:65.2,y:121.25,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:50.5343,x:64.15,y:132.75}},{t:this.instance_12,p:{regX:-0.2,rotation:-5.7267,x:12.15,y:94.6,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:6.0715,x:16.85,y:190.7,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3309,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.4656,x:-14.85,y:186.9,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.5732,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-120.2057,x:-65.05,y:55.25,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-133.3843,x:-23.9,y:125,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-123.0699,x:-18.9,y:132.4,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-84.4565,x:-57.3,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-9.5964,x:-23.7,y:90.85,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:100.5526,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:64.0862,x:32.7,y:48.55,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:73.2544,x:67.9,y:120.55,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:49.1874,x:67.25,y:132.25}},{t:this.instance_12,p:{regX:-0.2,rotation:-4.5819,x:12.45,y:94.45,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:8.621,x:15.3,y:190.65,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3292,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:3.0915,x:-12.35,y:186.55,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.6686,x:-0.35,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-119.1167,x:-66.95,y:55.1,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.4,scaleX:0.9984,scaleY:0.9984,rotation:-132.2962,x:-27.15,y:125.65,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-121.9822,x:-22.2,y:133.05,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9985,rotation:-83.0523,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-11.1711,x:-23.85,y:90.65,regY:-45.7,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:99.6934,x:45.35,y:-26,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:62.7394,x:33.9,y:48.8,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:71.907,x:70.7,y:119.85,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:47.8411,x:70.3,y:131.6}},{t:this.instance_12,p:{regX:-0.2,rotation:-3.4345,x:12.75,y:94.35,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:11.1719,x:13.7,y:190.6,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3275,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.7156,x:-9.9,y:186.25,regY:-54.1,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.764,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-118.0278,x:-68.8,y:54.75,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-131.2072,x:-30.45,y:126.05,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-120.8938,x:-25.65,y:133.55,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-81.6475,x:-57.25,y:-23.05,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-12.7462,x:-24,y:90.7,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:98.8335,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:61.3926,x:35,y:48.95,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:70.5612,x:73.55,y:119.1,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:46.4951,x:73.2,y:130.7}},{t:this.instance_12,p:{regX:-0.2,rotation:-2.2887,x:13,y:94.25,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:13.7217,x:12.1,y:190.45,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3256,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3417,x:-7.45,y:185.55,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.8594,x:-0.3,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-116.9398,x:-70.8,y:54.4,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-130.1179,x:-33.75,y:126.5,regY:-8.7}},{t:this.instance_3,p:{regX:6.5,scaleX:0.9982,scaleY:0.9982,rotation:-119.8056,x:-29.05,y:133.95,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.2446,x:-57.3,y:-23.15,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-14.3231,x:-24.2,y:90.65,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:97.9742,x:45.4,y:-26,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:60.047,x:36.05,y:49.1,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:69.2141,x:76.3,y:118.4,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:45.1486,x:76.3,y:129.95}},{t:this.instance_12,p:{regX:-0.2,rotation:-1.1437,x:13.35,y:94.15,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:16.2714,x:10.55,y:190.25,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3239,x:-4.85,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-1.0294,x:-4.8,y:185,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-0.954,x:-0.4,y:-79.35,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-115.8512,x:-72.65,y:54.15,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-129.0295,x:-37,y:126.8,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-118.7163,x:-32.4,y:134.55,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-78.8412,x:-57.35,y:-23,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-15.8976,x:-24.3,y:90.6,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:97.1146,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:58.7003,x:37.1,y:49.35,regY:-0.9,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:67.8667,x:79.1,y:117.5,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:43.8023,x:79.35,y:129.15}},{t:this.instance_12,p:{regX:-0.2,rotation:0,x:13.65,y:94.05,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:18.8213,x:8.9,y:190.05,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3221,x:-4.9,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.4047,x:-2.4,y:184.45,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.0502,x:-0.35,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-114.7619,x:-74.55,y:53.6,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-127.9407,x:-40.3,y:127.1,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-117.6281,x:-35.85,y:134.85,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.4374,x:-57.35,y:-23.2,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-17.4744,x:-24.4,y:90.5,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:96.255,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:57.3534,x:38.3,y:49.4,regY:-0.9,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:66.5214,x:81.75,y:116.7,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:42.4553,x:82.4,y:128.25}},{t:this.instance_12,p:{regX:-0.2,rotation:1.1454,x:13.9,y:93.95,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:21.3711,x:7.3,y:189.9,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3203,x:-4.9,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-3.7804,x:-0.05,y:183.7,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.1456,x:-0.4,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-113.6732,x:-76.35,y:53.3,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-126.8526,x:-43.55,y:127.2,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-116.5384,x:-39.25,y:135.15,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-76.033,x:-57.35,y:-23.2,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-19.0497,x:-24.65,y:90.5,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:95.395,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:56.0078,x:39.55,y:49.45,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:65.1751,x:84.5,y:115.65,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:41.1086,x:85.25,y:127.25}},{t:this.instance_12,p:{regX:-0.2,rotation:2.2904,x:14.25,y:93.8,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:23.9201,x:5.65,y:189.6,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3185,x:-4.9,y:-58.35,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-5.1567,x:2.35,y:183,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.241,x:-0.35,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-112.5845,x:-78.2,y:52.85,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-125.7624,x:-46.95,y:127.5,regY:-8.8}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-115.4502,x:-42.75,y:135.4,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-74.6301,x:-57.4,y:-22.9,regY:0.3,regX:35.6}}]},1).to({state:[{t:this.instance_17,p:{rotation:-20.6252,x:-24.8,y:90.25,regY:-45.7,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:94.5363,x:45.35,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:54.6603,x:40.55,y:49.5,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:63.8285,x:87.15,y:114.75,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:39.7617,x:88.35,y:126.25}},{t:this.instance_12,p:{regX:-0.2,rotation:3.4372,x:14.55,y:93.65,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.6,scaleX:0.9976,scaleY:0.9976,rotation:26.4702,x:4.1,y:189.2,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3177,x:-4.9,y:-58.3,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-6.5297,x:4.65,y:182.1,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.3365,x:-0.35,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-111.4964,x:-80.15,y:52.15,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-124.6754,x:-50.2,y:127.55,regY:-8.8}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-114.3617,x:-46.25,y:135.55,regY:-1.3}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-73.225,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-22.2023,x:-25,y:90.3,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:93.676,x:45.4,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:53.3149,x:41.8,y:49.55,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:62.4822,x:89.85,y:113.7,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:38.4151,x:91.25,y:125.2}},{t:this.instance_12,p:{regX:-0.2,rotation:4.5828,x:14.8,y:93.55,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:29.0205,x:2.4,y:188.9,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3158,x:-4.9,y:-58.3,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-7.9065,x:6.85,y:181.35,regY:-54.1,regX:2.6}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.431,x:-0.4,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-110.407,x:-81.9,y:51.75,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-123.5866,x:-53.4,y:127.45,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-113.272,x:-49.5,y:135.5,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.8201,x:-57.35,y:-23,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-23.7764,x:-25,y:90.25,regY:-45.6,regX:2.6}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:92.8181,x:45.35,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:51.9678,x:42.95,y:49.65,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:61.1357,x:92.45,y:112.7,regY:7.9,regX:-6.3}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:37.0691,x:94.2,y:124.05}},{t:this.instance_12,p:{regX:-0.2,rotation:5.7285,x:15.1,y:93.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:31.5705,x:0.8,y:188.55,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3141,x:-4.85,y:-58.3,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-9.2817,x:9.35,y:180.2,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.5265,x:-0.35,y:-79.25,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-109.318,x:-83.8,y:51.05,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-122.4965,x:-56.75,y:127.3,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-112.1838,x:-52.95,y:135.5,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.418,x:-57.35,y:-23.05,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-25.352,x:-25.3,y:90.2,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:91.9583,x:45.4,y:-26.1,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:50.6204,x:44.05,y:49.6,regY:-1,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:59.7891,x:95.05,y:111.45,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:35.7226,x:96.95,y:122.8}},{t:this.instance_12,p:{regX:-0.2,rotation:6.8746,x:15.4,y:93.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:34.1198,x:-0.85,y:188.1,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3125,x:-4.85,y:-58.3,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-10.6568,x:11.65,y:179.2,regY:-54.2,regX:2.7}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6219,x:-0.4,y:-79.3,regY:52.6}},{t:this.instance_5,p:{regY:-0.1,rotation:-108.2298,x:-85.6,y:50.45,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-121.4092,x:-59.9,y:127.2,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-111.0955,x:-56.35,y:135.4,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.0139,x:-57.3,y:-23.1,regY:0.3,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-26.9282,x:-25.35,y:90.2,regY:-45.6,regX:2.5}},{t:this.instance_16,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:91.0999,x:45.3,y:-26.05,regX:-33.3}},{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:49.2747,x:45.1,y:49.7,regY:-0.9,regX:-40.4}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:58.442,x:97.6,y:110.25,regY:7.9,regX:-6.4}},{t:this.instance_13,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:34.377,x:99.9,y:121.6}},{t:this.instance_12,p:{regX:-0.2,rotation:8.0201,x:15.65,y:93.2,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_11,p:{regY:-53.5,scaleX:0.9976,scaleY:0.9976,rotation:36.6687,x:-2.5,y:187.6,regX:3.8}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:10.3105,x:-4.85,y:-58.3,regX:-0.8}},{t:this.instance_8,p:{scaleX:0.9979,scaleY:0.9979,rotation:-12.0302,x:14.05,y:178,regY:-54.2,regX:2.8}},{t:this.instance_7},{t:this.instance_6,p:{scaleX:0.999,scaleY:0.999,rotation:-1.7173,x:-0.4,y:-79.4,regY:52.5}},{t:this.instance_5,p:{regY:-0.1,rotation:-107.1415,x:-87.4,y:49.65,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_4,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-120.321,x:-63.2,y:126.9,regY:-8.7}},{t:this.instance_3,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-110.0077,x:-59.85,y:135.15,regY:-1.2}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.6108,x:-57.25,y:-23.05,regY:0.4,regX:35.7}}]},1).wait(1));

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
	this.instance = new lib.CachedBmp_2117();
	this.instance.setTransform(-108.05,-337.45,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2116();
	this.instance_1.setTransform(-117.9,-376.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(40));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_2.setTransform(-57.25,-23.35,0.9984,0.9984,-88.8791,0,0,36.2,0.3);

	this.instance_3 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_3.setTransform(8,115.8,0.9982,0.9982,-155.4659,0,0,6.3,-1.4);

	this.instance_4 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_4.setTransform(4.35,107.85,0.9983,0.9983,-122.9932,0,0,5.2,-8.7);

	this.instance_5 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_5.setTransform(-57.45,55.9,0.9984,0.9984,-140.7652,0,0,40,1.1);

	this.instance_6 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_6.setTransform(0.4,-79,0.999,0.999,-3.6465,0,0,1,52.8);

	this.instance_7 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_7.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_8 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_8.setTransform(-33,188,0.9983,0.9983,12.7243,0,0,3,-54.2);

	this.instance_9 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_9.setTransform(-4.95,-58.2,0.999,0.999,12.1106,0,0,-0.9,8.8);

	this.instance_10 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_10.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_11 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_11.setTransform(35.6,186.95,0.9978,0.9978,-6.9034,0,0,3.6,-53.9);

	this.instance_12 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_12.setTransform(14.2,93.8,0.9978,0.9978,-15.3987,0,0,-0.8,1.9);

	this.instance_13 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_13.setTransform(19.8,139,0.9983,0.9983,61.5907,0,0,-4.9,3.1);

	this.instance_14 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_14.setTransform(22.85,128.25,0.9983,0.9983,87.9153,0,0,-6.4,8.1);

	this.instance_15 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_15.setTransform(32.9,48.95,0.9984,0.9984,97.0969,0,0,-40,-1.1);

	this.instance_16 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_16.setTransform(45.25,-26.25,0.9984,0.9984,100.13,0,0,-33.5,-0.3);

	this.instance_17 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_17.setTransform(-20.25,91.2,0.9984,0.9984,5.251,0,0,2.4,-46.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{scaleX:0.9984,scaleY:0.9984,rotation:5.251,x:-20.25,y:91.2,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:100.13,x:45.25,y:-26.25,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:97.0969,x:32.9,y:48.95,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:87.9153,x:22.85,y:128.25}},{t:this.instance_13,p:{regX:-4.9,scaleX:0.9983,scaleY:0.9983,rotation:61.5907,x:19.8,y:139,regY:3.1}},{t:this.instance_12,p:{regY:1.9,scaleX:0.9978,scaleY:0.9978,rotation:-15.3987,y:93.8,x:14.2}},{t:this.instance_11,p:{regX:3.6,rotation:-6.9034,x:35.6,y:186.95,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:12.1106,x:-4.95,y:-58.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9983,scaleY:0.9983,rotation:12.7243,x:-33,y:188,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,rotation:-3.6465,x:0.4,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:40,regY:1.1,scaleX:0.9984,scaleY:0.9984,rotation:-140.7652,x:-57.45,y:55.9}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-122.9932,x:4.35,y:107.85,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9982,scaleY:0.9982,rotation:-155.4659,x:8,y:115.8,regY:-1.4}},{t:this.instance_2,p:{regX:36.2,regY:0.3,rotation:-88.8791,y:-23.35,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]}).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:3.7192,x:-20.3,y:91.25,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.7441,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:94.6508,x:33.3,y:49.05,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.3,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:85.47,x:26.95,y:128.7}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:59.1454,x:24.2,y:139.65,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-13.8552,y:93.75,x:14.2}},{t:this.instance_11,p:{regX:3.8,rotation:-5.358,x:33.25,y:187.45,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:12.0845,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.7179,x:-30.35,y:188.3,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.4679,x:0.6,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-138.643,x:-58.8,y:55.95}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-120.8705,x:1,y:110.05,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-153.3429,x:4.35,y:118.1,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-87.8777,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9984,scaleY:0.9984,rotation:2.1863,x:-20.4,y:91.2,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.3578,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:92.2047,x:33.85,y:49.1,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:83.0245,x:30.75,y:128.85}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:56.6991,x:28.55,y:140.05,regY:3.2}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-12.3105,y:93.75,x:14.25}},{t:this.instance_11,p:{regX:3.8,rotation:-3.8135,x:30.8,y:187.9,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:12.0597,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7099,x:-27.85,y:188.45,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.289,x:0.6,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-136.5198,x:-60.15,y:55.95}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-118.7468,x:-2.35,y:112.15,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-151.2199,x:0.7,y:120.35,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-86.8749,y:-23.55,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:0.6551,x:-20.5,y:91.35,regY:-46.5,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.9718,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:89.7636,x:34.4,y:49.1,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:80.5796,x:34.55,y:129.05}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:54.2537,x:32.95,y:140.2,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-10.7652,y:93.75,x:14.25}},{t:this.instance_11,p:{regX:3.7,rotation:-2.2682,x:28.2,y:188.25,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:12.0346,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:9.7015,x:-25.4,y:188.55,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.1092,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-134.3975,x:-61.55,y:55.85}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-116.6242,x:-5.9,y:114.15,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-149.0975,x:-3.15,y:122.6,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-85.8719,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-0.8714,x:-20.55,y:91.1,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.5855,x:45.2,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:87.3167,x:34.85,y:49.15,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:78.133,x:38.7,y:129}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:51.808,x:37.35,y:140.25,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-9.2204,y:93.75,x:14.3}},{t:this.instance_11,p:{regX:3.7,rotation:-0.7238,x:25.7,y:188.6,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:12.0087,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:8.6954,x:-22.9,y:188.6,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.9305,x:0.5,y:-78.85,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-132.2755,x:-62.95,y:55.8}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-114.5001,x:-9.55,y:116.15,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-146.9741,x:-7,y:124.55,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-84.8686,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-2.4029,x:-20.7,y:91.1,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.1977,x:45.1,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:84.8719,x:35.4,y:49.3,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:75.6874,x:42.5,y:128.75}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:49.3618,x:41.75,y:140.1,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-7.6746,y:93.75,x:14.4}},{t:this.instance_11,p:{regX:3.7,rotation:0.8167,x:23.2,y:188.85,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.9836,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:7.6875,x:-20.35,y:188.65,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.7517,x:0.55,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:40,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-130.1505,x:-64.4,y:55.55}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.3775,x:-13.15,y:117.95,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-144.8519,x:-10.9,y:126.55,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-83.8663,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-3.9351,x:-20.8,y:91.05,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.8123,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:82.4247,x:35.9,y:49.35,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:73.242,x:46.35,y:128.6}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:46.9159,x:46.15,y:139.8,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-6.1307,y:93.7,x:14.45}},{t:this.instance_11,p:{regX:3.7,rotation:2.3629,x:20.7,y:189.05,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9586,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:6.6795,x:-17.85,y:188.55,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.573,x:0.55,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-128.0281,x:-65.75,y:55.5}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.2546,x:-16.85,y:119.65,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-142.7279,x:-14.95,y:128.3,regY:-1.4}},{t:this.instance_2,p:{regX:36.2,regY:0.2,rotation:-82.8621,y:-23.4,scaleX:0.9983,scaleY:0.9983,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-5.4659,x:-20.85,y:91.05,regY:-46.5,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.4253,x:45.15,y:-26.3,regX:-33.4,regY:-0.3}},{t:this.instance_15,p:{rotation:79.9805,x:36.35,y:49.4,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:70.7962,x:50.25,y:128.1}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:44.4705,x:50.55,y:139.3,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-4.586,y:93.65,x:14.5}},{t:this.instance_11,p:{regX:3.7,rotation:3.9083,x:18.2,y:189.1,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9327,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.6724,x:-15.35,y:188.4,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.3952,x:0.55,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-125.9055,x:-67.05,y:55.35}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-108.1308,x:-20.6,y:121.25,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-140.6068,x:-19.15,y:129.95,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-81.8594,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-6.9971,x:-20.9,y:90.95,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.0378,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:77.534,x:36.9,y:49.4,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:68.3498,x:54.2,y:127.4}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:42.0235,x:54.85,y:138.7,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-3.0395,y:93.65,x:14.55}},{t:this.instance_11,p:{regX:3.7,rotation:5.453,x:15.7,y:189.15,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9084,x:-4.85,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:4.6637,x:-12.85,y:188.2,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.2147,x:0.5,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-123.7819,x:-68.45,y:55.2}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-106.0084,x:-24.5,y:122.7,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-138.483,x:-23.3,y:131.55,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-80.8566,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.5296,x:-21.25,y:90.9,regY:-46.6,regX:2.3}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.6523,x:45.1,y:-26.25,regX:-33.4,regY:-0.3}},{t:this.instance_15,p:{rotation:75.0867,x:37.4,y:49.45,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:65.904,x:58,y:126.7}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:39.5785,x:59.2,y:137.9,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9978,scaleY:0.9978,rotation:-1.4951,y:93.6,x:14.65}},{t:this.instance_11,p:{regX:3.7,rotation:6.9982,x:13.15,y:189.1,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8825,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:3.6573,x:-10.35,y:187.85,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.0361,x:0.45,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-121.6593,x:-69.8,y:55}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-103.8856,x:-28.4,y:124.05,regY:-8.7,regX:5.3}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-136.3609,x:-27.5,y:132.95,regY:-1.4}},{t:this.instance_2,p:{regX:36.2,regY:0.3,rotation:-79.8537,y:-23.35,scaleX:0.9984,scaleY:0.9984,x:-57.15}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-10.0623,x:-21.25,y:90.85,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.2663,x:45.2,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:72.6421,x:37.95,y:49.6,scaleX:0.9983,scaleY:0.9983,regX:-39.9,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:63.4584,x:61.8,y:125.75}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:37.1321,x:63.4,y:136.9,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:0.0447,y:93.6,x:14.7}},{t:this.instance_11,p:{regX:3.7,rotation:8.5414,x:10.75,y:189,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8568,x:-4.85,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:2.6486,x:-7.9,y:187.5,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.8566,x:0.55,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-119.5366,x:-71.2,y:54.75}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-101.7629,x:-32.25,y:125.35,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-134.2375,x:-31.8,y:134.15,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-78.8512,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.5931,x:-21.25,y:90.9,regY:-46.5,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.8787,x:45.1,y:-26.3,regX:-33.4,regY:-0.3}},{t:this.instance_15,p:{rotation:70.1958,x:38.5,y:49.65,scaleX:0.9983,scaleY:0.9983,regX:-39.9,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:61.0121,x:65.5,y:124.7}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:34.6861,x:67.6,y:135.8,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:1.5898,y:93.6,x:14.75}},{t:this.instance_11,p:{regX:3.7,rotation:10.0874,x:8.25,y:188.85,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8326,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:1.6424,x:-5.35,y:187.05,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.6788,x:0.55,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-117.4126,x:-72.55,y:54.5}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-99.6399,x:-36.35,y:126.45,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-132.115,x:-36.25,y:135.3,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-77.8471,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-13.1244,x:-21.4,y:90.8,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.4924,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:67.7494,x:38.9,y:49.6,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:58.5669,x:69.2,y:123.5}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:32.2406,x:71.75,y:134.55,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9978,scaleY:0.9978,rotation:3.1351,y:93.5,x:14.8}},{t:this.instance_11,p:{regX:3.7,rotation:11.6328,x:5.7,y:188.6,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.8067,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:0.6341,x:-2.9,y:186.55,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.4993,x:0.5,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-115.2905,x:-73.95,y:54.2}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.5167,x:-40.45,y:127.55,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-129.9908,x:-40.5,y:136.35,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-76.8446,y:-23.5,scaleX:0.9983,scaleY:0.9983,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-14.6565,x:-21.55,y:90.7,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.1063,x:45.1,y:-26.25,regX:-33.4,regY:-0.3}},{t:this.instance_15,p:{rotation:65.303,x:39.45,y:49.6,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9982,scaleY:0.9982,rotation:56.1202,x:72.75,y:122.25}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:29.7939,x:75.9,y:133.1,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:4.681,y:93.5,x:14.85}},{t:this.instance_11,p:{regX:3.7,rotation:13.1787,x:3.25,y:188.3,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7806,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-0.3687,x:-0.5,y:186,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.3199,x:0.45,y:-78.85,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-113.1679,x:-75.25,y:53.9}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-95.3933,x:-44.55,y:128.35,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-127.8675,x:-45.05,y:137.2,regY:-1.5}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-75.8416,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-16.189,x:-21.6,y:90.7,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.7195,x:45.1,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:62.8569,x:40,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:53.6752,x:76.4,y:120.8}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:27.3477,x:80,y:131.5,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:6.2258,y:93.45,x:14.95}},{t:this.instance_11,p:{regX:3.7,rotation:14.7235,x:0.7,y:188,scaleX:0.9978,scaleY:0.9978,regY:-53.8}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7564,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-1.376,x:1.85,y:185.4,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.1404,x:0.5,y:-78.8,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-111.0449,x:-76.55,y:53.5}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-93.2702,x:-48.65,y:129.1,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-125.746,x:-49.4,y:138,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-74.8384,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-17.7207,x:-21.7,y:90.7,regY:-46.5,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.3321,x:45.2,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:60.4116,x:40.5,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:51.2287,x:79.9,y:119.15}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:24.9029,x:83.9,y:129.75,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:7.7701,y:93.5,x:15}},{t:this.instance_11,p:{regX:3.7,rotation:16.2676,x:-1.75,y:187.45,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7304,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-2.3838,x:4.3,y:184.65,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.9619,x:0.55,y:-78.85,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-108.921,x:-77.95,y:53.3}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-91.1482,x:-52.9,y:129.65,regY:-8.7,regX:5.3}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-123.6218,x:-53.9,y:138.55,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-73.8356,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-19.2511,x:-21.8,y:90.6,regY:-46.5,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.9466,x:45.1,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:57.9664,x:41,y:49.75,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:48.7842,x:83.4,y:117.45}},{t:this.instance_13,p:{regX:-4.9,scaleX:0.9982,scaleY:0.9982,rotation:22.4562,x:87.7,y:127.8,regY:3.1}},{t:this.instance_12,p:{regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:9.3155,y:93.3,x:15.05}},{t:this.instance_11,p:{regX:3.7,rotation:17.8145,x:-4.2,y:186.95,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7056,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-3.3915,x:6.7,y:183.85,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.7833,x:0.5,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:40,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-106.8,x:-79.3,y:52.75}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-89.0287,x:-57.05,y:130.25,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-121.5002,x:-58.4,y:138.95,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-72.8326,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-20.7835,x:-21.9,y:90.55,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.5596,x:45.15,y:-26.5,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:55.5193,x:41.5,y:49.8,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:46.3378,x:86.7,y:115.6}},{t:this.instance_13,p:{regX:-4.9,scaleX:0.9982,scaleY:0.9982,rotation:20.0097,x:91.5,y:125.8,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:10.8607,y:93.4,x:15.05}},{t:this.instance_11,p:{regX:3.7,rotation:19.3582,x:-6.6,y:186.3,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.6805,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-4.4001,x:9.1,y:182.9,regY:-54.3,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.6039,x:0.45,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-104.6773,x:-80.65,y:52.45}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.9052,x:-61.1,y:130.65,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-119.3776,x:-62.9,y:139.3,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-71.8301,y:-23.55,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-22.3142,x:-22,y:90.4,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.1736,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:53.0732,x:42,y:49.8,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:43.892,x:89.95,y:113.6}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:17.5647,x:95.3,y:123.6,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:12.4049,y:93.4,x:15.1}},{t:this.instance_11,p:{regX:3.6,rotation:20.904,x:-9.2,y:185.6,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.6554,x:-5.05,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-5.4076,x:11.5,y:182.1,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.4253,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-102.5531,x:-81.9,y:52.1}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-84.7844,x:-65.5,y:130.85,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-117.2545,x:-67.45,y:139.45,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-70.8267,y:-23.55,scaleX:0.9983,scaleY:0.9983,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-23.846,x:-22.15,y:90.35,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.7869,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:50.6268,x:42.5,y:49.8,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:41.4461,x:93.2,y:111.55}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:15.1195,x:98.95,y:121.3,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:13.951,y:93.3,x:15.2}},{t:this.instance_11,p:{regX:3.6,rotation:22.4485,x:-11.6,y:184.9,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.6295,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.414,x:13.85,y:181.1,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.2459,x:0.5,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-100.4309,x:-83.1,y:51.65}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-82.6599,x:-69.7,y:130.95,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-115.1316,x:-72,y:139.55,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.3,rotation:-69.8235,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.1}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-22.3966,x:-22,y:90.45,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.1613,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:52.9663,x:42,y:49.75,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:43.7867,x:90.15,y:113.55}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:17.4575,x:95.5,y:123.5,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:12.4791,y:93.4,x:15.1}},{t:this.instance_11,p:{regX:3.7,rotation:20.9828,x:-9.2,y:185.6,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.6501,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-5.463,x:11.55,y:182.05,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.4341,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-102.4556,x:-82.05,y:52.05}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9983,rotation:-84.6869,x:-65.65,y:130.85,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-117.1679,x:-67.7,y:139.45,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.3,rotation:-70.7727,y:-23.45,scaleX:0.9983,scaleY:0.9983,x:-57.1}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-20.9462,x:-21.95,y:90.55,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.535,x:45.1,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:55.3053,x:41.5,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:46.1247,x:87,y:115.45}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:19.7942,x:91.95,y:125.6,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:11.0088,y:93.35,x:15}},{t:this.instance_11,p:{regX:3.7,rotation:19.5154,x:-6.9,y:186.3,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.6699,x:-5.05,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-4.5118,x:9.4,y:182.8,regY:-54.3,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.6223,x:0.45,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-104.4819,x:-80.7,y:52.5}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.7131,x:-61.6,y:130.6,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-119.2023,x:-63.3,y:139.35,regY:-1.4}},{t:this.instance_2,p:{regX:36.2,regY:0.2,rotation:-71.7221,y:-23.4,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-19.4951,x:-21.85,y:90.55,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.9089,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:57.6449,x:41.1,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:48.4647,x:83.75,y:117.2}},{t:this.instance_13,p:{regX:-4.9,scaleX:0.9982,scaleY:0.9982,rotation:22.133,x:88.15,y:127.5,regY:3.1}},{t:this.instance_12,p:{regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:9.5367,y:93.3,x:15.05}},{t:this.instance_11,p:{regX:3.7,rotation:18.0484,x:-4.6,y:186.85,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.6905,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-3.5599,x:7.15,y:183.7,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.8113,x:0.5,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-106.5074,x:-79.45,y:52.8}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-88.7396,x:-57.6,y:130.3,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-121.2385,x:-59.05,y:138.9,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-72.6712,y:-23.65,scaleX:0.9983,scaleY:0.9983,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-18.0447,x:-21.7,y:90.55,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.282,x:45.15,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:59.9832,x:40.5,y:49.65,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:50.8047,x:80.5,y:118.9}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:24.471,x:84.6,y:129.4,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:8.0655,y:93.5,x:14.95}},{t:this.instance_11,p:{regX:3.7,rotation:16.5828,x:-2.2,y:187.3,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7111,x:-5.05,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-2.61,x:4.85,y:184.45,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-0.9986,x:0.45,y:-78.85,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-108.533,x:-78.2,y:53.25}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-90.762,x:-53.65,y:129.85,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-123.2742,x:-54.75,y:138.65,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-73.6211,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-16.5944,x:-21.65,y:90.6,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.6571,x:45.1,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:62.3222,x:40,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9982,scaleY:0.9982,rotation:53.1443,x:77.05,y:120.5}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:26.8083,x:80.75,y:131.1,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:6.5945,y:93.45,x:14.9}},{t:this.instance_11,p:{regX:3.7,rotation:15.1172,x:0.15,y:187.8,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7296,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-1.659,x:2.55,y:185.05,regY:-54.3,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.1868,x:0.5,y:-78.8,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-110.5595,x:-77,y:53.5}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-92.7879,x:-49.6,y:129.15,regY:-8.6,regX:5.3}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-125.309,x:-50.5,y:138.1,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-74.5699,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-15.1448,x:-21.6,y:90.75,regY:-46.6,regX:2.3}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.0306,x:45.2,y:-26.25,regX:-33.4,regY:-0.4}},{t:this.instance_15,p:{rotation:64.6612,x:39.5,y:49.65,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9982,scaleY:0.9982,rotation:55.483,x:73.7,y:121.95}},{t:this.instance_13,p:{regX:-4.9,scaleX:0.9982,scaleY:0.9982,rotation:29.1476,x:76.9,y:132.6,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:5.1234,y:93.5,x:14.85}},{t:this.instance_11,p:{regX:3.8,rotation:13.6497,x:2.65,y:188.15,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7502,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:-0.7068,x:0.3,y:185.75,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.375,x:0.5,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:40,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-112.5846,x:-75.75,y:53.7}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-94.8147,x:-45.8,y:128.65,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-127.3454,x:-46.35,y:137.5,regY:-1.5}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-75.5199,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-13.6934,x:-21.45,y:90.75,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.4044,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:66.9995,x:38.95,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:57.8246,x:70.25,y:123.15}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:31.4857,x:72.95,y:134.15,regY:3.2}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:3.6521,y:93.5,x:14.8}},{t:this.instance_11,p:{regX:3.7,rotation:12.1834,x:4.9,y:188.6,scaleX:0.9978,scaleY:0.9978,regY:-53.8}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7699,x:-4.95,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:0.24,x:-2,y:186.35,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.5633,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-114.6127,x:-74.45,y:54.2}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-96.8404,x:-41.7,y:127.7,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-129.3807,x:-42.05,y:136.6,regY:-1.4}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-76.4684,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-12.2439,x:-21.35,y:90.8,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.7793,x:45.1,y:-26.25,regX:-33.4,regY:-0.3}},{t:this.instance_15,p:{rotation:69.338,x:38.65,y:49.7,scaleX:0.9983,scaleY:0.9983,regX:-39.9,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:60.1631,x:66.75,y:124.3}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:33.8242,x:69,y:135.35,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:2.1807,y:93.55,x:14.75}},{t:this.instance_11,p:{regX:3.8,rotation:10.7181,x:7.35,y:188.75,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.7895,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:1.1912,x:-4.4,y:186.85,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.7524,x:0.5,y:-79.05,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-116.6379,x:-73.1,y:54.35}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.8668,x:-37.95,y:126.85,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-131.4165,x:-37.85,y:135.65,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-77.4186,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-10.7933,x:-21.2,y:90.8,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.1526,x:45.3,y:-26.35,regX:-33.5,regY:-0.4}},{t:this.instance_15,p:{rotation:71.678,x:38.1,y:49.55,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9982,scaleY:0.9982,rotation:62.5023,x:63.15,y:125.5}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:36.1625,x:65,y:136.5,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:0.7089,y:93.55,x:14.75}},{t:this.instance_11,p:{regX:3.7,rotation:9.2519,x:9.65,y:188.95,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8101,x:-4.85,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:2.1419,x:-6.65,y:187.3,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-1.9389,x:0.55,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-118.6632,x:-71.8,y:54.55}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-100.8948,x:-34.15,y:125.85,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-133.452,x:-33.7,y:134.65,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-78.3672,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-9.3434,x:-21.2,y:90.85,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.5262,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:74.0172,x:37.6,y:49.45,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:64.842,x:59.6,y:126.25}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:38.4999,x:60.9,y:137.45,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-0.7571,y:93.6,x:14.7}},{t:this.instance_11,p:{regX:3.7,rotation:7.7846,x:11.95,y:189.05,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8305,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:3.0923,x:-9,y:187.7,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.1272,x:0.45,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-120.6888,x:-70.55,y:54.85}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-102.9206,x:-30.25,y:124.6,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-135.4887,x:-29.6,y:133.45,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-79.3176,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.3}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.8934,x:-21.2,y:90.95,regY:-46.6,regX:2.3}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.9009,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:76.3561,x:37.1,y:49.5,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:67.1824,x:55.95,y:127.05}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:40.8376,x:56.9,y:138.3,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-2.228,y:93.65,x:14.65}},{t:this.instance_11,p:{regX:3.6,rotation:6.319,x:14.15,y:189.2,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8503,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:4.0444,x:-11.4,y:188,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.3155,x:0.55,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-122.7155,x:-69.3,y:55.05}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-104.9473,x:-26.6,y:123.45,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-137.5242,x:-25.5,y:132.25,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.3,rotation:-80.2663,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.15}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-6.4424,x:-20.95,y:90.95,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.2743,x:45.2,y:-26.25,regX:-33.4,regY:-0.4}},{t:this.instance_15,p:{rotation:78.6947,x:36.55,y:49.4,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:69.5204,x:52.2,y:127.7}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:43.1758,x:52.7,y:138.95,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-3.7004,y:93.65,x:14.55}},{t:this.instance_11,p:{regX:3.7,rotation:4.8522,x:16.75,y:189.1,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8709,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:4.996,x:-13.75,y:188.25,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.5038,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-124.7421,x:-67.95,y:55.3}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-106.9736,x:-22.9,y:122.1,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-139.5596,x:-21.5,y:130.8,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-81.2148,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-4.9928,x:-20.8,y:91,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.6479,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:81.0345,x:36.15,y:49.4,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.3,regY:8,scaleX:0.9982,scaleY:0.9982,rotation:71.8608,x:48.6,y:128.3}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:45.5128,x:48.6,y:139.6,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-5.1709,y:93.6,x:14.5}},{t:this.instance_11,p:{regX:3.7,rotation:3.3859,x:19.2,y:189.05,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.8908,x:-4.9,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.9471,x:-16.05,y:188.45,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.6913,x:0.5,y:-78.95,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-126.7673,x:-66.65,y:55.4}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-108.9994,x:-19.3,y:120.65,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-141.5949,x:-17.55,y:129.3,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-82.166,y:-23.4,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-3.5428,x:-20.75,y:91,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.0226,x:45.15,y:-26.25,regX:-33.4,regY:-0.3}},{t:this.instance_15,p:{rotation:83.3726,x:35.65,y:49.35,scaleX:0.9983,scaleY:0.9983,regX:-39.9,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:74.2009,x:44.75,y:128.65}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:47.8519,x:44.35,y:139.95,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-6.6422,y:93.7,x:14.45}},{t:this.instance_11,p:{regX:3.7,rotation:1.9201,x:21.55,y:188.95,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9114,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:6.8982,x:-18.65,y:188.55,regY:-54.2,regX:2.9}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-2.8805,x:0.55,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-128.7922,x:-65.25,y:55.45}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-111.0268,x:-15.6,y:119.05,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-143.632,x:-13.7,y:127.7,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-83.1145,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.2}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9984,scaleY:0.9984,rotation:-2.0917,x:-20.65,y:91.1,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.3969,x:45.25,y:-26.35,regX:-33.5,regY:-0.4}},{t:this.instance_15,p:{rotation:85.7111,x:35.1,y:49.25,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:76.5398,x:41.15,y:128.85}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:50.1896,x:40.15,y:140.1,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-8.1134,y:93.75,x:14.4}},{t:this.instance_11,p:{regX:3.7,rotation:0.453,x:23.95,y:188.8,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9308,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:7.8493,x:-20.9,y:188.6,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.0681,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-130.8188,x:-64.1,y:55.7}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-113.0527,x:-12.15,y:117.35,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-145.6666,x:-9.85,y:125.9,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-84.0635,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:-0.641,x:-20.55,y:91.1,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.7707,x:45.15,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:88.0503,x:34.65,y:49.2,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.3,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:78.8797,x:37.4,y:129.1}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:52.5279,x:35.95,y:140.25,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-9.5836,y:93.75,x:14.35}},{t:this.instance_11,p:{regX:3.7,rotation:-1.0086,x:26.3,y:188.65,scaleX:0.9978,scaleY:0.9978,regY:-53.8}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9514,x:-4.85,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:8.7998,x:-23.25,y:188.65,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.2574,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-132.8451,x:-62.75,y:55.8}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-115.0793,x:-8.7,y:115.6,regY:-8.6,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-147.7026,x:-6.1,y:124.1,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-85.0135,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:0.8048,x:-20.5,y:91.3,regY:-46.5,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.144,x:45.2,y:-26.3,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:90.3853,x:34.1,y:49.1,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:81.2191,x:33.6,y:128.95}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:54.8656,x:31.7,y:140.2,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-11.0561,y:93.75,x:14.25}},{t:this.instance_11,p:{regX:3.8,rotation:-2.4743,x:28.8,y:188.2,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-0.9,rotation:11.9711,x:-4.9,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:9.7504,x:-25.6,y:188.6,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.445,x:0.5,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-134.8706,x:-61.45,y:55.8}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-117.1056,x:-5.35,y:113.75,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-149.7384,x:-2.6,y:122.05,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-85.9632,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9984,scaleY:0.9984,rotation:2.2538,x:-20.35,y:91.2,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.5185,x:45.2,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:92.7236,x:33.65,y:49,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:83.5589,x:29.9,y:128.8}},{t:this.instance_13,p:{regX:-4.9,scaleX:0.9982,scaleY:0.9982,rotation:57.2041,x:27.5,y:139.85,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-12.5269,y:93.75,x:14.2}},{t:this.instance_11,p:{regX:3.7,rotation:-3.9418,x:31.05,y:187.9,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:11.991,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7029,x:-27.95,y:188.45,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.6327,x:0.5,y:-78.85,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-136.8959,x:-60.1,y:55.9}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-119.1318,x:-2.1,y:111.75,regY:-8.7,regX:5.3}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-151.7746,x:1.1,y:120.1,regY:-1.5}},{t:this.instance_2,p:{regX:36.4,regY:0.2,rotation:-86.9126,y:-23.6,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:3.7052,x:-20.3,y:91.25,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.8925,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:95.0621,x:33.15,y:48.95,scaleX:0.9984,scaleY:0.9984,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:85.8978,x:26.2,y:128.55}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:59.542,x:23.4,y:139.45,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-13.998,y:93.8,x:14.25}},{t:this.instance_11,p:{regX:3.8,rotation:-5.4081,x:33.55,y:187.4,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:12.0114,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.6526,x:-30.3,y:188.25,regY:-54.2,regX:3}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-3.8204,x:0.5,y:-78.85,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-138.9229,x:-58.85,y:55.95}},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-121.1584,x:1.15,y:109.65,regY:-8.7,regX:5.3}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-153.8102,x:4.75,y:117.85,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-87.8611,y:-23.45,scaleX:0.9984,scaleY:0.9984,x:-57.25}}]},1).to({state:[{t:this.instance_17,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.1564,x:-20.15,y:91.2,regY:-46.6,regX:2.4}},{t:this.instance_16,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.2653,x:45.2,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_15,p:{rotation:97.4004,x:32.6,y:48.95,scaleX:0.9983,scaleY:0.9983,regX:-40,regY:-1.1}},{t:this.instance_14,p:{regX:-6.4,regY:8,scaleX:0.9983,scaleY:0.9983,rotation:88.2376,x:22.3,y:128.15}},{t:this.instance_13,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:61.8793,x:19.1,y:139,regY:3.1}},{t:this.instance_12,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4686,y:93.8,x:14.2}},{t:this.instance_11,p:{regX:3.6,rotation:-6.8738,x:35.6,y:186.9,scaleX:0.9978,scaleY:0.9978,regY:-53.9}},{t:this.instance_10},{t:this.instance_9,p:{regX:-1,rotation:12.032,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_8,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.6048,x:-32.8,y:188,regY:-54.2,regX:2.9}},{t:this.instance_7},{t:this.instance_6,p:{regX:1.1,rotation:-4.0081,x:0.5,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_5,p:{regX:39.9,regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-140.9481,x:-57.4,y:55.9}},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-123.1846,x:4.5,y:107.6,regY:-8.7,regX:5.2}},{t:this.instance_3,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-155.8448,x:8.2,y:115.55,regY:-1.4}},{t:this.instance_2,p:{regX:36.3,regY:0.2,rotation:-88.8116,y:-23.5,scaleX:0.9984,scaleY:0.9984,x:-57.3}}]},1).wait(1));

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
	this.instance = new lib.CachedBmp_2115();
	this.instance.setTransform(-115.4,-352.95,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2114();
	this.instance_1.setTransform(-125.25,-374.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(40));

	// Armature_1
	this.instance_2 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_2.setTransform(-57,-23.05,0.9986,0.9986,-90.7634,0,0,35.8,0.5);

	this.instance_3 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_3.setTransform(11.1,114.45,0.9982,0.9982,-148.1457,0,0,6.3,-1.4);

	this.instance_4 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_4.setTransform(7.55,106.25,0.9985,0.9985,-124.8057,0,0,5.5,-8.4);

	this.instance_5 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_5.setTransform(-54.55,55.85,0.9985,0.9985,-141.5699,0,0,39.8,1.1);

	this.instance_6 = new lib.ch1_headcopy("synched",0);
	this.instance_6.setTransform(0.25,-78.95,0.9991,0.9991,-3.6514,0,0,0.9,52.8);

	this.instance_7 = new lib.ch1_uBodycopy("synched",0);
	this.instance_7.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_8 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_8.setTransform(-23.75,189.1,0.9983,0.9983,16.8044,0,0,2.9,-54.7);

	this.instance_9 = new lib.ch1_neckcopy("synched",0);
	this.instance_9.setTransform(-4.8,-58.15,0.9991,0.9991,12.1133,0,0,-0.7,8.8);

	this.instance_10 = new lib.ch1_lBodycopy("synched",0);
	this.instance_10.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_11 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_11.setTransform(29,189.1,0.9979,0.9979,-11.5958,0,0,2.6,-54);

	this.instance_12 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_12.setTransform(9.55,95.3,0.9979,0.9979,-14.7224,0,0,-1,1.7);

	this.instance_13 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_13.setTransform(47.2,118.45,0.9985,0.9985,58.7128,0,0,-5.2,3.1);

	this.instance_14 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_14.setTransform(51.95,108.55,0.9986,0.9986,96.3932,0,0,-6.3,7.9);

	this.instance_15 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_15.setTransform(8.85,40.4,0.9985,0.9985,58.0387,0,0,-40.8,-0.7);

	this.instance_16 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_16.setTransform(45.2,-26.35,0.9985,0.9985,119.315,0,0,-33.9,-0.1);

	this.instance_17 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_17.setTransform(-16.95,92.7,0.9985,0.9985,1.8513,0,0,2.2,-46.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17,p:{rotation:1.8513,x:-16.95,y:92.7,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9985,scaleY:0.9985,rotation:119.315,x:45.2,y:-26.35,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.7,rotation:58.0387,x:8.85,y:40.4,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9986,scaleY:0.9986,rotation:96.3932,x:51.95,y:108.55,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:58.7128,x:47.2,y:118.45}},{t:this.instance_12,p:{regY:1.7,rotation:-14.7224,x:9.55,y:95.3,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.6,rotation:-11.5958,x:29,y:189.1,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:12.1133,x:-4.8,y:-58.15,regX:-0.7}},{t:this.instance_8,p:{regX:2.9,regY:-54.7,rotation:16.8044,x:-23.75,y:189.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:0.9,scaleX:0.9991,scaleY:0.9991,rotation:-3.6514,x:0.25,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9985,scaleY:0.9985,rotation:-141.5699,x:-54.55,y:55.85,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.4,rotation:-124.8057,x:7.55,y:106.25,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.4,scaleX:0.9982,scaleY:0.9982,rotation:-148.1457,x:11.1,y:114.45,regX:6.3}},{t:this.instance_2,p:{rotation:-90.7634,x:-57,y:-23.05,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]}).to({state:[{t:this.instance_17,p:{rotation:0.1734,x:-17.2,y:92.6,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:117.4752,x:45.15,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.7,regY:-0.6,rotation:58.1681,x:10.85,y:41.7,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:94.9243,x:53.95,y:109.7,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:57.0104,x:49.4,y:119.8}},{t:this.instance_12,p:{regY:1.8,rotation:-13.4504,x:9.85,y:95.2,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:-9.3397,x:27.25,y:189.35,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1197,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:15.5409,x:-21.05,y:189.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-3.4308,x:0.4,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-138.958,x:-55.8,y:55.8,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-122.1934,x:3.75,y:109,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.6,scaleX:0.9981,scaleY:0.9981,rotation:-145.5328,x:7,y:117.45,regX:6.3}},{t:this.instance_2,p:{rotation:-89.8354,x:-56.9,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.4975,x:-17.5,y:92.55,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:115.6357,x:45.15,y:-26.4,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.2959,x:13.05,y:42.65,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:93.4563,x:56.05,y:110.75,regX:-6.4,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:55.3073,x:51.8,y:121.05}},{t:this.instance_12,p:{regY:1.7,rotation:-12.178,x:10.25,y:94.95,regX:-1.1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:-7.084,x:25.65,y:189.55,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1267,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:14.2765,x:-18.5,y:189.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-3.2099,x:0.4,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-136.345,x:-57.1,y:55.8,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-119.5806,x:0,y:111.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-142.919,x:2.9,y:120.2,regX:6.3}},{t:this.instance_2,p:{rotation:-88.9003,x:-56.95,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-3.1758,x:-17.8,y:92.55,regY:-46.1,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:113.7957,x:45.2,y:-26.45,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.4257,x:15.2,y:43.65,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:91.9862,x:58,y:111.95,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:53.6037,x:54.05,y:122.25}},{t:this.instance_12,p:{regY:1.8,rotation:-10.9065,x:10.85,y:94.9,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:-4.8262,x:24,y:189.7,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1331,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:13.0119,x:-16,y:189.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.9873,x:0.4,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-133.7318,x:-58.35,y:55.8,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-116.9676,x:-3.9,y:114.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-140.3064,x:-1.45,y:122.8,regX:6.3}},{t:this.instance_2,p:{rotation:-87.9674,x:-56.9,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-4.8524,x:-18.1,y:92.35,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:111.9559,x:45.2,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.5542,x:17.55,y:44.55,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:90.5175,x:60.15,y:113,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:51.8997,x:56.5,y:123.3}},{t:this.instance_12,p:{regY:1.7,rotation:-9.6349,x:11.25,y:94.6,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:-2.5696,x:22.35,y:189.75,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1411,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:11.7484,x:-13.4,y:188.95,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.7682,x:0.45,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-131.119,x:-59.55,y:55.85,regX:39.7,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-114.3543,x:-7.9,y:116.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-137.694,x:-5.7,y:125.25,regX:6.3}},{t:this.instance_2,p:{rotation:-87.0341,x:-56.95,y:-23.1,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-6.5288,x:-18.4,y:92.25,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:110.1154,x:45.15,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.683,x:19.8,y:45.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:89.0526,x:62.3,y:113.95,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:50.1966,x:58.85,y:124.4}},{t:this.instance_12,p:{regY:1.8,rotation:-8.3645,x:11.7,y:94.6,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:-0.3145,x:20.65,y:189.9,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1482,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:10.4841,x:-10.9,y:188.7,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.5457,x:0.45,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-128.5062,x:-60.95,y:55.65,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-111.7408,x:-12.05,y:118.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-135.0811,x:-10.2,y:127.65,regX:6.3}},{t:this.instance_2,p:{rotation:-86.1009,x:-56.95,y:-23,scaleX:0.9986,scaleY:0.9986,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-8.2063,x:-18.8,y:92.15,regY:-46.2,regX:2.1,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.2749,x:45.15,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.8131,x:22.1,y:46.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:87.5835,x:64.45,y:114.8,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:48.4931,x:61.3,y:125.35}},{t:this.instance_12,p:{regY:1.8,rotation:-7.0912,x:12.2,y:94.4,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:1.9392,x:19,y:189.85,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:12.1552,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:9.2189,x:-8.35,y:188.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.325,x:0.4,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-125.8922,x:-62.15,y:55.6,regX:39.8,regY:1.2}},{t:this.instance_4,p:{regY:-8.5,rotation:-109.1275,x:-16.05,y:121,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-132.4678,x:-14.85,y:129.8,regX:6.3}},{t:this.instance_2,p:{rotation:-85.1674,x:-56.95,y:-23,scaleX:0.9986,scaleY:0.9986,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-9.8831,x:-18.95,y:92.05,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.4347,x:45.15,y:-26.4,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.9415,x:24.5,y:46.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:86.1139,x:66.65,y:115.55,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:46.7904,x:63.8,y:126.2}},{t:this.instance_12,p:{regY:1.8,rotation:-5.8207,x:12.65,y:94.2,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:4.1952,x:17.35,y:189.8,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1617,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:7.9548,x:-5.85,y:187.9,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.1034,x:0.45,y:-79,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-123.2794,x:-63.5,y:55.55,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-106.5154,x:-20.4,y:122.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-129.8542,x:-19.65,y:131.7,regX:6.4}},{t:this.instance_2,p:{rotation:-84.2344,x:-56.9,y:-23.1,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-11.5596,x:-19.3,y:91.95,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:104.5955,x:45.15,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.0696,x:26.8,y:47.5,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:84.6433,x:68.85,y:116.4,regX:-6.2,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:45.0867,x:66.25,y:126.95}},{t:this.instance_12,p:{regY:1.8,rotation:-4.5494,x:13.1,y:94.05,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:6.4516,x:15.65,y:189.6,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1688,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:2.9,regY:-54.6,rotation:6.6913,x:-3.4,y:187.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.8819,x:0.5,y:-79.05,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-120.6672,x:-64.8,y:55.35,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-103.9027,x:-24.85,y:124.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-127.2416,x:-24.4,y:133.6,regX:6.3}},{t:this.instance_2,p:{rotation:-83.3009,x:-56.95,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-13.2354,x:-19.55,y:91.85,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:102.7549,x:45.1,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.1996,x:29.25,y:48.05,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:83.1754,x:71.1,y:116.95,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:43.3831,x:68.75,y:127.75}},{t:this.instance_12,p:{regY:1.8,rotation:-3.2777,x:13.55,y:93.85,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:8.7089,x:13.95,y:189.5,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:12.1756,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:5.4275,x:-0.8,y:186.85,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.6612,x:0.5,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-118.0534,x:-66,y:55.4,regX:39.7,regY:1.1}},{t:this.instance_4,p:{regY:-8.4,rotation:-101.2888,x:-29.15,y:126.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-124.6278,x:-29.25,y:135.2,regX:6.3}},{t:this.instance_2,p:{rotation:-82.3672,x:-56.9,y:-23.2,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-14.9115,x:-19.9,y:91.85,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:100.9144,x:45.15,y:-26.65,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.3276,x:31.55,y:48.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:81.7056,x:73.4,y:117.6,regX:-6.2,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:41.6786,x:71.3,y:128.35}},{t:this.instance_12,p:{regY:1.8,rotation:-2.0059,x:14,y:93.65,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:10.9642,x:12.35,y:189.2,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1841,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:4.1628,x:1.7,y:186.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.4397,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.4406,x:-67.3,y:55.15,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-98.6765,x:-34,y:127.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-122.0148,x:-34.2,y:136.65,regX:6.3}},{t:this.instance_2,p:{rotation:-81.4342,x:-56.95,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-16.5894,x:-20.1,y:91.65,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:99.0756,x:45.15,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.4572,x:34,y:48.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:80.2374,x:75.7,y:118,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:39.9763,x:73.8,y:128.85}},{t:this.instance_12,p:{regY:1.8,rotation:-0.7342,x:14.4,y:93.45,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:13.2205,x:10.7,y:188.95,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1904,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:2.8984,x:4.1,y:185.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.2191,x:0.45,y:-78.8,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-112.8275,x:-68.55,y:54.9,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-96.0628,x:-38.65,y:129.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-119.403,x:-39.3,y:137.9,regX:6.3}},{t:this.instance_2,p:{rotation:-80.5005,x:-56.85,y:-23.1,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-18.266,x:-20.45,y:91.55,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:97.2355,x:45.1,y:-26.65,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.5866,x:36.5,y:49.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:78.7672,x:77.85,y:118.5,regX:-6.2,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:38.2727,x:76.35,y:129.4}},{t:this.instance_12,p:{regY:1.8,rotation:0.5336,x:14.9,y:93.25,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:15.4788,x:9,y:188.5,regY:-54.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1974,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:1.6336,x:6.5,y:184.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.9977,x:0.45,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-110.2158,x:-69.8,y:54.65,regX:39.8,regY:1.2}},{t:this.instance_4,p:{regY:-8.5,rotation:-93.4494,x:-43.1,y:130.1,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-116.7891,x:-44.4,y:138.9,regX:6.3}},{t:this.instance_2,p:{rotation:-79.5672,x:-56.95,y:-23.05,scaleX:0.9985,scaleY:0.9985,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-19.9434,x:-20.9,y:91.5,regY:-46.2,regX:2.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:95.3951,x:45.15,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.7146,x:38.85,y:49.45,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:77.2983,x:80.15,y:118.7,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:36.5685,x:78.9,y:129.7}},{t:this.instance_12,p:{regY:1.8,rotation:1.8052,x:15.35,y:92.95,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:17.7337,x:7.4,y:188.3,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2045,x:-4.65,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:0.3696,x:8.95,y:183.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.7771,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.6025,x:-71.1,y:54.45,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-90.8371,x:-48,y:131,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-114.1773,x:-49.55,y:139.7,regX:6.4}},{t:this.instance_2,p:{rotation:-78.6337,x:-56.9,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-21.6196,x:-21,y:91.3,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:93.5549,x:45.1,y:-26.65,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.8442,x:41.35,y:49.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:75.8289,x:82.4,y:119,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:34.8656,x:81.5,y:129.95}},{t:this.instance_12,p:{regY:1.8,rotation:3.0767,x:15.75,y:92.75,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:19.9908,x:5.7,y:187.85,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2119,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-0.8889,x:11.35,y:182.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.5548,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-104.9878,x:-72.45,y:54.2,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-88.2292,x:-52.75,y:131.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-111.5634,x:-54.65,y:140.4,regX:6.3}},{t:this.instance_2,p:{rotation:-77.7006,x:-56.9,y:-23.2,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-23.2974,x:-21.35,y:91.2,regY:-46.2,regX:2.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:91.7148,x:45.1,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.972,x:43.7,y:49.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:74.3594,x:84.75,y:119.25,regX:-6.2,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:33.1626,x:84.1,y:130.2}},{t:this.instance_12,p:{regY:1.8,rotation:4.3481,x:16.2,y:92.6,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:22.2478,x:4,y:187.45,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2197,x:-4.7,y:-58.15,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-2.1532,x:13.7,y:181.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.3334,x:0.55,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-102.3765,x:-73.6,y:54,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-85.6149,x:-57.5,y:132.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-108.951,x:-59.9,y:140.85,regX:6.3}},{t:this.instance_2,p:{rotation:-76.766,x:-56.85,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-24.9734,x:-21.65,y:91.05,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.8792,x:45.1,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.101,x:46.2,y:49.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:72.8901,x:87,y:119.2,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:31.4578,x:86.65,y:130.3}},{t:this.instance_12,p:{regY:1.8,rotation:5.62,x:16.65,y:92.4,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:24.5036,x:2.35,y:186.9,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2259,x:-4.7,y:-58.15,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-3.4185,x:16.05,y:180.25,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.112,x:0.55,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-99.7628,x:-74.85,y:53.75,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-83.0012,x:-62.35,y:132.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-106.3382,x:-65.2,y:140.95,regX:6.4}},{t:this.instance_2,p:{rotation:-75.8332,x:-56.85,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-26.6508,x:-21.85,y:90.9,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.039,x:45.1,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.23,x:48.6,y:49.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:71.4211,x:89.35,y:119.25,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:29.7555,x:89.2,y:130.25}},{t:this.instance_12,p:{regY:1.8,rotation:6.8917,x:17.1,y:92.15,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:26.7614,x:0.7,y:186.3,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2325,x:-4.7,y:-58.05,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-4.6811,x:18.4,y:179.05,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:0.1033,x:0.55,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-97.149,x:-76.1,y:53.35,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-80.3887,x:-67.2,y:132.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-103.7248,x:-70.35,y:141.15,regX:6.3}},{t:this.instance_2,p:{rotation:-74.8996,x:-56.85,y:-23.1,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-28.3279,x:-22.2,y:90.8,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.1995,x:45.1,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.3595,x:51.05,y:49.5,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:69.952,x:91.6,y:119.2,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:28.0521,x:91.8,y:130.2}},{t:this.instance_12,p:{regY:1.8,rotation:8.1634,x:17.5,y:91.9,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.6,rotation:29.0182,x:-0.9,y:185.75,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2397,x:-4.7,y:-58.05,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-5.9459,x:20.65,y:177.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:0.3256,x:0.55,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-94.5371,x:-77.35,y:53.05,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-77.7756,x:-72.1,y:132.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9982,scaleY:0.9982,rotation:-101.111,x:-75.6,y:141.1,regX:6.2}},{t:this.instance_2,p:{rotation:-73.966,x:-56.9,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-30.0026,x:-22.45,y:90.7,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:84.3586,x:45.05,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.4873,x:53.55,y:49.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:68.4818,x:93.85,y:119.05,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:26.3493,x:94.4,y:130.1}},{t:this.instance_12,p:{regY:1.8,rotation:9.435,x:17.85,y:91.55,regX:-1.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:31.2734,x:-2.65,y:185.05,regY:-54,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2465,x:-4.65,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:2.9,regY:-54.6,rotation:-7.2102,x:22.75,y:176.35,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:0.547,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-91.9242,x:-78.55,y:52.7,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-75.1637,x:-76.9,y:132.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.6,scaleX:0.9982,scaleY:0.9982,rotation:-98.4975,x:-80.95,y:140.65,regX:6.3}},{t:this.instance_2,p:{rotation:-73.0329,x:-56.85,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-28.4176,x:-22.15,y:90.85,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.1003,x:45.1,y:-26.45,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.3563,x:51.15,y:49.45,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:69.8711,x:91.75,y:119.15,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:27.9538,x:91.9,y:130.25}},{t:this.instance_12,p:{regY:1.8,rotation:8.2184,x:17.6,y:91.9,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:29.1084,x:-1,y:185.55,regY:-54.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2369,x:-4.7,y:-58.05,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-6.019,x:20.8,y:177.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:0.3185,x:0.55,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-94.4037,x:-77.4,y:53.05,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-77.6504,x:-72.5,y:132.8,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9982,scaleY:0.9982,rotation:-100.9932,x:-75.85,y:141.1,regX:6.2}},{t:this.instance_2,p:{rotation:-73.9078,x:-56.9,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-26.8313,x:-21.9,y:90.95,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.841,x:45.05,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.2261,x:48.9,y:49.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:71.2602,x:89.6,y:119.35,regX:-6.2,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:29.5583,x:89.55,y:130.3}},{t:this.instance_12,p:{regY:1.8,rotation:7.0012,x:17.15,y:92.1,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:26.9439,x:0.5,y:186.25,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2259,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-4.8269,x:18.6,y:178.9,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:0.0901,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-96.8827,x:-76.25,y:53.35,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-80.1375,x:-67.7,y:132.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-103.4869,x:-70.9,y:141.15,regX:6.3}},{t:this.instance_2,p:{rotation:-74.7824,x:-56.85,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-25.2449,x:-21.55,y:91.05,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.5823,x:45.1,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:60.0959,x:46.55,y:49.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:72.6499,x:87.3,y:119.25,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:31.1623,x:87.05,y:130.25}},{t:this.instance_12,p:{regY:1.8,rotation:5.7863,x:16.6,y:92.3,regX:-1.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:24.7781,x:2.15,y:186.85,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2144,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-3.6352,x:16.45,y:180.05,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.1321,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-99.3623,x:-75.05,y:53.65,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-82.6253,x:-63.05,y:132.7,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-105.9832,x:-65.95,y:141.1,regX:6.3}},{t:this.instance_2,p:{rotation:-75.658,x:-56.9,y:-23.2,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-23.6586,x:-21.35,y:91.2,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:91.318,x:45.1,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.9646,x:44.3,y:49.7,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:74.0381,x:85.15,y:119.05,regX:-6.4,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:32.7669,x:84.7,y:130.2}},{t:this.instance_12,p:{regY:1.8,rotation:4.5688,x:16.3,y:92.55,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:22.612,x:3.75,y:187.3,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.2038,x:-4.65,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-2.445,x:14.25,y:181.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.3606,x:0.55,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-101.8435,x:-74,y:53.85,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-85.1124,x:-58.55,y:132.45,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-108.4771,x:-61,y:140.9,regX:6.3}},{t:this.instance_2,p:{rotation:-76.5331,x:-56.85,y:-23.2,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-22.0728,x:-21.1,y:91.25,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:93.0601,x:45.1,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.8327,x:41.95,y:49.65,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:75.4269,x:82.95,y:119,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:34.3716,x:82.25,y:130}},{t:this.instance_12,p:{regY:1.8,rotation:3.3506,x:15.9,y:92.75,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:20.4465,x:5.4,y:187.65,regY:-54.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1938,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-1.2533,x:11.95,y:182.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.589,x:0.55,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-104.3238,x:-72.75,y:54.35,regX:39.7,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-87.6001,x:-53.95,y:131.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-110.9738,x:-56.05,y:140.65,regX:6.2}},{t:this.instance_2,p:{rotation:-77.4075,x:-56.9,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-20.4855,x:-20.85,y:91.45,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:94.8008,x:45.1,y:-26.65,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.7021,x:39.65,y:49.55,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:76.8158,x:80.8,y:118.85,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:35.9765,x:79.8,y:129.75}},{t:this.instance_12,p:{regY:1.8,rotation:2.1339,x:15.5,y:92.9,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:18.2809,x:6.9,y:188.2,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1832,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:-0.0604,x:9.75,y:183.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-0.8183,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-106.8023,x:-71.6,y:54.4,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-90.0823,x:-49.45,y:131.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-113.4674,x:-51.1,y:140.05,regX:6.2}},{t:this.instance_2,p:{rotation:-78.2822,x:-56.85,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-18.8999,x:-20.55,y:91.55,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:96.5423,x:45.1,y:-26.55,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.5713,x:37.3,y:49.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:78.2043,x:78.85,y:118.45,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:37.5813,x:77.4,y:129.4}},{t:this.instance_12,p:{regY:1.8,rotation:0.9174,x:15,y:93.15,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:16.1151,x:8.55,y:188.55,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1713,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:1.1246,x:7.4,y:184.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.045,x:0.5,y:-78.8,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-109.2831,x:-70.35,y:54.75,regX:39.7,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-92.57,x:-45.1,y:130.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-115.963,x:-46.3,y:139.2,regX:6.3}},{t:this.instance_2,p:{rotation:-79.1566,x:-56.95,y:-23.05,scaleX:0.9986,scaleY:0.9986,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-17.3126,x:-20.3,y:91.6,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:98.2828,x:45.15,y:-26.55,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.4402,x:35.05,y:49.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:79.5944,x:76.7,y:118,regX:-6.4,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:39.1858,x:75.05,y:129}},{t:this.instance_12,p:{regY:1.8,rotation:-0.2953,x:14.6,y:93.35,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:13.9495,x:10.15,y:188.85,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1599,x:-4.7,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:2.318,x:5.2,y:185,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.2734,x:0.45,y:-78.8,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-111.7625,x:-69.25,y:54.8,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-95.0572,x:-40.5,y:129.5,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.4,scaleX:0.9981,scaleY:0.9981,rotation:-118.4586,x:-41.35,y:138.25,regX:6.3}},{t:this.instance_2,p:{rotation:-80.0309,x:-56.95,y:-23,scaleX:0.9986,scaleY:0.9986,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-15.7281,x:-19.95,y:91.7,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:100.0241,x:45.1,y:-26.65,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.3099,x:32.8,y:48.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:80.9829,x:74.45,y:117.7,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:40.79,x:72.65,y:128.55}},{t:this.instance_12,p:{regY:1.8,rotation:-1.5115,x:14.2,y:93.55,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:11.7845,x:11.75,y:189.1,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1492,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:3.5096,x:2.85,y:185.75,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.501,x:0.5,y:-78.85,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-114.2418,x:-68,y:54.95,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.4,rotation:-97.5451,x:-36,y:128.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-120.9519,x:-36.8,y:137.1,regX:6.4}},{t:this.instance_2,p:{rotation:-80.906,x:-56.9,y:-23.1,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-14.1412,x:-19.7,y:91.75,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:101.7647,x:45.15,y:-26.65,regX:-34}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.178,x:30.5,y:48.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:82.3713,x:72.4,y:117.15,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:42.396,x:70.25,y:128}},{t:this.instance_12,p:{regY:1.8,rotation:-2.7285,x:13.8,y:93.7,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:9.6186,x:13.3,y:189.25,regY:-54.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1382,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:4.7004,x:0.55,y:186.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.7295,x:0.5,y:-79.05,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-116.7233,x:-66.8,y:55.15,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-100.0317,x:-31.75,y:127.05,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-123.4469,x:-31.9,y:136.1,regX:6.2}},{t:this.instance_2,p:{rotation:-81.782,x:-56.95,y:-23.2,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-12.5533,x:-19.4,y:91.85,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:103.5059,x:45.1,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:59.0472,x:28.25,y:47.8,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:83.7606,x:70.3,y:116.6,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:44.0006,x:67.85,y:127.4}},{t:this.instance_12,p:{regY:1.8,rotation:-3.9449,x:13.3,y:93.9,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:7.4532,x:14.85,y:189.4,regY:-54.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1278,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:5.8913,x:-1.8,y:187.05,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-1.9563,x:0.4,y:-79.05,regY:52.7}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-119.2023,x:-65.65,y:55.3,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-102.5193,x:-27.6,y:125.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-125.9414,x:-27.3,y:134.5,regX:6.3}},{t:this.instance_2,p:{rotation:-82.6559,x:-56.95,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-10.9685,x:-19.25,y:92,regY:-46.2,regX:2.1,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:105.2471,x:45.1,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.9164,x:25.95,y:47.25,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:85.1496,x:68.2,y:115.95,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:45.605,x:65.5,y:126.65}},{t:this.instance_12,p:{regY:1.8,rotation:-5.1605,x:12.9,y:94.1,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:5.2888,x:16.5,y:189.7,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.1176,x:-4.75,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.7,rotation:7.084,x:-4.15,y:187.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.1857,x:0.45,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-121.6819,x:-64.45,y:55.4,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-105.0068,x:-23.3,y:124,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.4,scaleX:0.9981,scaleY:0.9981,rotation:-128.4371,x:-22.65,y:132.8,regX:6.3}},{t:this.instance_2,p:{rotation:-83.5317,x:-56.9,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-9.3823,x:-18.9,y:92.1,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.9871,x:45.2,y:-26.45,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.7868,x:23.8,y:46.65,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:86.5385,x:66.15,y:115.25,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:47.2098,x:63.15,y:125.9}},{t:this.instance_12,p:{regY:1.8,rotation:-6.3785,x:12.45,y:94.25,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:3.1231,x:18.15,y:189.8,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:12.1077,x:-4.8,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.7,rotation:8.2751,x:-6.6,y:188,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.4135,x:0.35,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-124.1634,x:-63.25,y:55.55,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-107.4943,x:-19.2,y:122.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-130.933,x:-18.2,y:131.15,regX:6.3}},{t:this.instance_2,p:{rotation:-84.4061,x:-56.9,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-7.7953,x:-18.6,y:92.2,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.7285,x:45.1,y:-26.45,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.6544,x:21.5,y:45.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:87.9262,x:63.95,y:114.5,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:48.8151,x:60.9,y:125.05}},{t:this.instance_12,p:{regY:1.8,rotation:-7.5948,x:12.05,y:94.45,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:0.9576,x:19.7,y:189.85,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0963,x:-4.8,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:9.4658,x:-8.95,y:188.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.6412,x:0.45,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-126.642,x:-62.1,y:55.6,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-109.9819,x:-15.2,y:120.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-133.4266,x:-13.65,y:129.25,regX:6.2}},{t:this.instance_2,p:{rotation:-85.2816,x:-56.9,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-6.2098,x:-18.3,y:92.25,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:110.4695,x:45.15,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.5231,x:19.4,y:45.25,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:89.3162,x:62,y:113.65,regX:-6.3,regY:8}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:50.4198,x:58.55,y:124.1}},{t:this.instance_12,p:{regY:1.8,rotation:-8.812,x:11.5,y:94.55,regX:-1.1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:-1.2039,x:21.3,y:189.85,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0855,x:-4.8,y:-58.1,regX:-0.7}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:10.6577,x:-11.35,y:188.75,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-2.869,x:0.35,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-129.1229,x:-60.85,y:55.65,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-112.4686,x:-11.15,y:118.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.6,scaleX:0.9981,scaleY:0.9981,rotation:-135.9217,x:-9.35,y:127.25,regX:6.2}},{t:this.instance_2,p:{rotation:-86.1562,x:-56.95,y:-23,scaleX:0.9986,scaleY:0.9986,regX:35.7}}]},1).to({state:[{t:this.instance_17,p:{rotation:-4.623,x:-18.05,y:92.3,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:112.2112,x:45.2,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.3919,x:17.2,y:44.4,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:90.7005,x:60.05,y:112.7,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:52.0243,x:56.35,y:123.05}},{t:this.instance_12,p:{regY:1.7,rotation:-10.0287,x:11.15,y:94.6,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.6,rotation:-3.3698,x:23,y:189.75,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0749,x:-4.85,y:-58.1,regX:-0.8}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:11.8489,x:-13.7,y:188.95,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-3.0977,x:0.4,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-131.6023,x:-59.7,y:55.75,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-114.9562,x:-7.35,y:116.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-138.4172,x:-5.2,y:124.9,regX:6.3}},{t:this.instance_2,p:{rotation:-87.0314,x:-56.95,y:-23.1,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-3.0372,x:-17.75,y:92.55,regY:-46.1,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:113.9521,x:45.2,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.2616,x:15.05,y:43.55,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:92.0896,x:58.15,y:111.65,regX:-6.4,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:53.6299,x:54.05,y:122.05}},{t:this.instance_12,p:{regY:1.8,rotation:-11.2457,x:10.7,y:94.9,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:-5.5342,x:24.45,y:189.6,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0632,x:-4.9,y:-58.1,regX:-0.8}},{t:this.instance_8,p:{regX:2.9,regY:-54.6,rotation:13.04,x:-16.25,y:189.1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-3.3247,x:0.35,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-134.0811,x:-58.35,y:55.95,regX:39.7,regY:1.1}},{t:this.instance_4,p:{regY:-8.6,rotation:-117.4419,x:-3.7,y:113.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-140.9124,x:-1.15,y:122.45,regX:6.3}},{t:this.instance_2,p:{rotation:-87.9052,x:-56.95,y:-23.1,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:-1.4511,x:-17.45,y:92.55,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:115.6937,x:45.1,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.1307,x:12.95,y:42.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:93.479,x:56.2,y:110.6,regX:-6.4,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:55.2335,x:51.95,y:120.9}},{t:this.instance_12,p:{regY:1.8,rotation:-12.4623,x:10.35,y:95.05,regX:-1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_11,p:{regX:2.5,rotation:-7.6998,x:26,y:189.45,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0524,x:-4.9,y:-58.1,regX:-0.8}},{t:this.instance_8,p:{regX:2.9,regY:-54.7,rotation:14.2323,x:-18.7,y:189.05,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-3.5536,x:0.35,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-136.5612,x:-57.25,y:55.8,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-119.9304,x:0,y:111.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-143.4064,x:2.95,y:119.95,regX:6.3}},{t:this.instance_2,p:{rotation:-88.7803,x:-56.95,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:0.1305,x:-17.2,y:92.55,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:117.4337,x:45.15,y:-26.45,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:58.0002,x:10.85,y:41.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:94.867,x:54.25,y:109.75,regX:-6.2,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:56.8379,x:49.7,y:119.7}},{t:this.instance_12,p:{regY:1.8,rotation:-13.6797,x:9.85,y:95.25,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:-9.8656,x:27.6,y:189.2,regY:-54.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0418,x:-4.9,y:-58.1,regX:-0.8}},{t:this.instance_8,p:{regX:3,regY:-54.6,rotation:15.4245,x:-20.95,y:189.25,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-3.7815,x:0.35,y:-78.9,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-139.0411,x:-56.1,y:55.8,regX:39.8,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-122.4174,x:3.65,y:108.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-145.9028,x:6.9,y:117.25,regX:6.3}},{t:this.instance_2,p:{rotation:-89.655,x:-56.95,y:-23.15,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).to({state:[{t:this.instance_17,p:{rotation:1.7182,x:-16.9,y:92.7,regY:-46.2,regX:2.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_16,p:{scaleX:0.9984,scaleY:0.9984,rotation:119.1753,x:45.2,y:-26.5,regX:-33.9}},{t:this.instance_15,p:{regX:-40.8,regY:-0.6,rotation:57.8695,x:8.9,y:40.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:96.2562,x:52.25,y:108.5,regX:-6.3,regY:7.9}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:58.4423,x:47.6,y:118.4}},{t:this.instance_12,p:{regY:1.8,rotation:-14.8954,x:9.45,y:95.35,regX:-1,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_11,p:{regX:2.5,rotation:-12.0299,x:29.2,y:189,regY:-54,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_10},{t:this.instance_9,p:{scaleX:0.999,scaleY:0.999,rotation:12.0318,x:-4.85,y:-58.1,regX:-0.8}},{t:this.instance_8,p:{regX:2.9,regY:-54.6,rotation:16.6162,x:-23.5,y:189.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_7},{t:this.instance_6,p:{regX:1,scaleX:0.999,scaleY:0.999,rotation:-4.0079,x:0.3,y:-78.95,regY:52.8}},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,rotation:-141.5213,x:-54.75,y:55.85,regX:39.7,regY:1.1}},{t:this.instance_4,p:{regY:-8.5,rotation:-124.903,x:7.15,y:106.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_3,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-148.3972,x:10.75,y:114.5,regX:6.3}},{t:this.instance_2,p:{rotation:-90.5271,x:-56.95,y:-23.1,scaleX:0.9986,scaleY:0.9986,regX:35.8}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-125.2,-374.2,247.9,679);


// stage content:
(lib.LessonChapter2_04 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,289];
	this.streamSoundSymbolsList[0] = [{id:"DuringWar204wav",startFrame:0,endFrame:290,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("DuringWar204wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,290,1);
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
			document.location.replace("/LessonChapter2_05.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("/LessonChapter2_03.html");
			}, 500);
			
		}
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_289 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(289).call(this.frame_289).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_2091();
	this.instance.setTransform(195.55,582,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2090();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(290));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(290));

	// Interaction
	this.instance_2 = new lib.CachedBmp_2097();
	this.instance_2.setTransform(702.55,229.95,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_2096();
	this.instance_3.setTransform(697.9,220.55,0.5,0.5);

	this.instance_4 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_4.setTransform(773.1,376.45,0.4432,0.4432,0,90.7536,-89.2464,35.2,-0.1);

	this.instance_5 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_5.setTransform(742.85,437.45,0.443,0.443,0,148.1498,-31.8502,6,-1.9);

	this.instance_6 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_6.setTransform(744.4,433.9,0.4431,0.4431,0,124.8026,-55.1974,5,-8.8);

	this.instance_7 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_7.setTransform(772,411.55,0.4431,0.4431,0,141.5728,-38.4272,39.8,0.2);

	this.instance_8 = new lib.ch1_headcopy("synched",0);
	this.instance_8.setTransform(747.7,351.6,0.4434,0.4434,0,3.642,-176.358,0.2,52.9);

	this.instance_9 = new lib.ch1_uBodycopy("synched",0);
	this.instance_9.setTransform(751.05,377.6,0.4438,0.4438,0,0,180,-0.2,-23.4);

	this.instance_10 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_10.setTransform(758.35,470.65,0.4431,0.4431,0,-16.7949,163.2051,2.7,-54);

	this.instance_11 = new lib.ch1_neckcopy("synched",0);
	this.instance_11.setTransform(749.9,360.85,0.4434,0.4434,0,-12.1049,167.8951,-1.2,8.9);

	this.instance_12 = new lib.ch1_lBodycopy("synched",0);
	this.instance_12.setTransform(750.25,407.95,0.4438,0.4438,0,0,180,-0.7,-22.8);

	this.instance_13 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_13.setTransform(734.95,470.65,0.4429,0.4429,0,11.5891,-168.4109,2.3,-53.4);

	this.instance_14 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_14.setTransform(743.55,429.05,0.4429,0.4429,0,14.7118,-165.2882,-1.2,2.4);

	this.instance_15 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_15.setTransform(726.9,439.25,0.4431,0.4431,0,-58.7178,121.2822,-4.8,3.5);

	this.instance_16 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_16.setTransform(724.75,434.85,0.4432,0.4432,0,-96.3829,83.6171,-5.7,7.9);

	this.instance_17 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_17.setTransform(743.9,404.7,0.4431,0.4431,0,-58.0442,121.9558,-40.2,-0.2);

	this.instance_18 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_18.setTransform(727.8,375,0.4431,0.4431,0,-119.3085,60.6915,-33.3,-0.3);

	this.instance_19 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_19.setTransform(755.35,427.85,0.4432,0.4432,0,-1.8409,178.1591,2,-45.6);

	this.instance_20 = new lib.CachedBmp_2095();
	this.instance_20.setTransform(834.4,237.8,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_2094();
	this.instance_21.setTransform(829.85,220.6,0.5,0.5);

	this.instance_22 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_22.setTransform(908.35,377.3,0.4431,0.4431,0,88.8892,-91.1108,35.6,0.2);

	this.instance_23 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_23.setTransform(879.3,439.1,0.443,0.443,0,155.4734,-24.5266,6,-2);

	this.instance_24 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_24.setTransform(880.95,435.45,0.4431,0.4431,0,122.9906,-57.0094,4.8,-9);

	this.instance_25 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_25.setTransform(908.4,412.5,0.4431,0.4431,0,140.7667,-39.2333,39.6,0.6);

	this.instance_26 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_26.setTransform(882.7,352.55,0.4434,0.4434,0,3.6365,-176.3635,1,52.9);

	this.instance_27 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_27.setTransform(886.15,378.55,0.4438,0.4438,0,0,180,-0.2,-23.6);

	this.instance_28 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_28.setTransform(897.5,471.15,0.443,0.443,0,-12.7176,167.2824,3,-53.6);

	this.instance_29 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_29.setTransform(885.15,361.85,0.4434,0.4434,0,-12.1023,167.8977,-1,9);

	this.instance_30 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_30.setTransform(885.45,408.95,0.4438,0.4438,0,0,180,-0.4,-22.7);

	this.instance_31 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_31.setTransform(867.1,470.7,0.4429,0.4429,0,6.8944,-173.1056,3.5,-53.2);

	this.instance_32 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_32.setTransform(876.65,429.3,0.4428,0.4428,0,15.39,-164.61,-1,2.6);

	this.instance_33 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_33.setTransform(874.2,449.4,0.443,0.443,0,-61.5963,118.4037,-4.4,3.6);

	this.instance_34 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_34.setTransform(872.8,444.6,0.4431,0.4431,0,-87.9257,92.0743,-5.9,8.2);

	this.instance_35 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_35.setTransform(868.35,409.4,0.4431,0.4431,0,-97.0873,82.9127,-39.4,-1);

	this.instance_36 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_36.setTransform(862.85,376.05,0.4431,0.4431,0,-100.1211,79.8789,-32.8,-0.4);

	this.instance_37 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_37.setTransform(891.95,428.2,0.4431,0.4431,0,-5.2418,174.7582,2.2,-45.9);

	this.instance_38 = new lib.CachedBmp_2093();
	this.instance_38.setTransform(962.05,237.75,0.5,0.5);

	this.instance_39 = new lib.CachedBmp_2092();
	this.instance_39.setTransform(957.5,220.55,0.5,0.5);

	this.instance_40 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_40.setTransform(1037.6,381.15,0.4433,0.4433,0,67.6745,-112.3255,35.6,0.4);

	this.instance_41 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_41.setTransform(1038.55,451.3,0.4432,0.4432,0,110.499,-69.501,6.4,-1.4);

	this.instance_42 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_42.setTransform(1040,447.65,0.4432,0.4432,0,120.7517,-59.2483,5.5,-8.8);

	this.instance_43 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_43.setTransform(1050.9,413.4,0.4433,0.4433,0,107.4077,-72.5923,40.2,-0.1);

	this.instance_44 = new lib.ch1_headcopy2("synched",0);
	this.instance_44.setTransform(1012.35,356.1,0.4435,0.4435,0,2.0328,-177.9672,0.8,52.6);

	this.instance_45 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_45.setTransform(1015.4,382.25,0.4439,0.4439,0,0,180,-0.1,-24);

	this.instance_46 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_46.setTransform(1021.15,474.9,0.443,0.443,0,-9.0623,170.9377,2.6,-54.1);

	this.instance_47 = new lib.ch1_neckcopy2("synched",0);
	this.instance_47.setTransform(1014.3,365.45,0.4435,0.4435,0,-10.2019,169.7981,-0.7,8.6);

	this.instance_48 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_48.setTransform(1014.6,412.65,0.4439,0.4439,0,0,180,-0.1,-23.2);

	this.instance_49 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_49.setTransform(1004.15,475.15,0.4429,0.4429,0,-0.537,179.463,3.7,-53.2);

	this.instance_50 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_50.setTransform(1005.8,432.45,0.4429,0.4429,0,5.153,-174.847,-0.4,1.9);

	this.instance_51 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_51.setTransform(968,445.35,0.4432,0.4432,0,-34.1075,145.8925,-5.4,3);

	this.instance_52 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_52.setTransform(968.9,440.3,0.4433,0.4433,0,-58.3929,121.6071,-6.3,7.9);

	this.instance_53 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_53.setTransform(992.2,413.45,0.4432,0.4432,0,-49.2984,130.7016,-40.3,-0.9);

	this.instance_54 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_54.setTransform(992,379.85,0.4433,0.4433,0,-91.3394,88.6606,-33.1,0.1);

	this.instance_55 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_55.setTransform(1023.3,432.1,0.4431,0.4431,0,5.6705,-174.3295,2.4,-45.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]},289).wait(1));

	// alWalid
	this.instance_56 = new lib.CharacterBad_04();
	this.instance_56.setTransform(1182.65,333.25,0.3553,0.3553,0,0,180,-39.9,49.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_56).to({regY:49.5,scaleX:0.444,scaleY:0.444,x:1029.8,y:413.4},288).to({_off:true},1).wait(1));

	// syaibah
	this.instance_57 = new lib.CharacterBad_02();
	this.instance_57.setTransform(1070.15,325.4,0.3553,0.3553,0,0,180,-14.1,35.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_57).to({regX:-14.2,regY:35.7,scaleX:0.444,scaleY:0.444,x:889.2,y:403.55},288).to({_off:true},1).wait(1));

	// utbah
	this.instance_58 = new lib.CharacterBad_01();
	this.instance_58.setTransform(971.2,314.05,0.3553,0.3553,0,0,180,-39.7,5.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_58).to({regX:-39.8,regY:6,scaleX:0.444,scaleY:0.444,x:765.5,y:389.35},288).to({_off:true},1).wait(1));

	// Background
	this.instance_59 = new lib.Chap2Scene4();
	this.instance_59.setTransform(0,0,0.6667,0.6667);

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(290));

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
		{src:"images/LessonChapter2_04_atlas_1.png", id:"LessonChapter2_04_atlas_1"},
		{src:"images/LessonChapter2_04_atlas_2.png", id:"LessonChapter2_04_atlas_2"},
		{src:"sounds/DuringWar204wav.mp3", id:"DuringWar204wav"},
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