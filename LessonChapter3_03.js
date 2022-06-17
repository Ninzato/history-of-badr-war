(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter3_03_atlas_1", frames: [[1859,1136,163,120],[1304,1206,163,120],[1682,1060,134,50],[1916,642,132,102],[1469,1207,134,130],[0,1060,330,308],[664,1060,315,292],[332,1060,330,308],[1684,642,193,36],[1684,680,193,36],[981,1060,321,270],[1598,322,324,318],[1282,642,199,37],[1483,642,199,37],[1640,0,326,320],[1282,0,356,308],[1282,681,193,36],[1477,681,193,36],[1282,310,314,330],[1916,746,122,50],[1505,1060,175,145],[1831,990,202,144],[1916,798,115,48],[1682,1136,175,145],[1304,1060,199,144],[0,990,1829,68],[0,722,1914,266],[1924,521,91,87],[1924,431,91,88],[1924,322,110,107],[0,0,1280,720]]}
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



(lib.CachedBmp_2600 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2599 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2598 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2597 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2596 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2595 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2594 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2593 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2592 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2591 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2590 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2589 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2588 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2587 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2586 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2585 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2584 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2583 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2582 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2581 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2580 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2579 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2578 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2577 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2576 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2575 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2574 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.Chap3Scene3 = function() {
	this.initialize(ss["LessonChapter3_03_atlas_1"]);
	this.gotoAndStop(30);
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
	this.instance = new lib.CachedBmp_2599();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2600();
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
	this.instance = new lib.CachedBmp_2596();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_2598();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_2597();
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
	this.instance = new lib.CachedBmp_2595();
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
	this.instance = new lib.CachedBmp_2594();
	this.instance.setTransform(-78.4,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.4,-67.4,157.5,146);


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
	this.shape.graphics.f("#28251E").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
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
	this.shape.graphics.f("#28251E").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
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
	this.instance = new lib.CachedBmp_2593();
	this.instance.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,165,154);


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
	this.shape.graphics.f("#2D2318").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape.graphics.f("#2D2318").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.shape.graphics.f("#28251E").s().p("AhDF9QgUAAgYgRQgZgTgTgdQglg5AAhCQAAgTADgTQAWiOAah0QAhiTAcg0QARgeAhgWQAigXAlgCQBegGAiB3QAFARAACZQAACfAMA9QAGAjABAhQgBA/gZA2QgQAhgVAUQgWATgTAAg");
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
	this.shape.graphics.f("#28251E").s().p("AhCF9QgVAAgXgRQgZgTgUgdQgvhJANhYQAWiOAah0QAhiTAdg0QAQgeAhgWQAjgXAlgCQBdgGAiB3QAFARAACZQABCfALA9QAUBognBRQgPAhgWAUQgVATgUAAg");
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
	this.shape.graphics.f("#2D2318").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
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
	this.instance = new lib.CachedBmp_2592();
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
	this.instance = new lib.CachedBmp_2591();
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
	this.instance = new lib.CachedBmp_2590();
	this.instance.setTransform(-78.05,-69.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78,-69.4,160.5,135);


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
	this.instance_1 = new lib.CachedBmp_2589();
	this.instance_1.setTransform(-79.45,-83.6,0.4852,0.4852);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-79.4,-83.6,157.2,154.3);


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
	this.instance = new lib.CachedBmp_2588();
	this.instance.setTransform(-48.25,-8.9,0.486,0.486);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-8.9,96.7,18);


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
	this.instance = new lib.CachedBmp_2587();
	this.instance.setTransform(-48.25,-8.9,0.486,0.486);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-8.9,96.7,18);


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
	this.instance_1 = new lib.CachedBmp_2586();
	this.instance_1.setTransform(-79.25,-70.05,0.4857,0.4857);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-79.2,-70,158.3,155.4);


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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00563E").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_1.setTransform(-2.1913,53.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

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
	this.instance_1 = new lib.CachedBmp_2585();
	this.instance_1.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,178,154);


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
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00563E").s().p("AhDF9QgUAAgYgRQgZgTgTgdQglg5AAhCQAAgTADgTQAWiOAah0QAhiTAcg0QARgeAhgWQAigXAlgCQBegGAiB3QAFARAACZQAACfAMA9QAGAjABAhQgBA/gZA2QgQAhgVAUQgWATgTAAg");
	this.shape_2.setTransform(-0.1786,-23.6143);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1B1810").s().p("AATF2IgEgBQgTAAgJgMQgLgNAAgdQAAikgjjRQgsjhgRheIDCAAIgIKVQA+AdgIAeQgDAMgOAHQgOAIgTAAg");
	this.shape_3.setTransform(1.0158,23.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

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
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00563E").s().p("AhCF9QgVAAgXgRQgZgTgUgdQgvhJANhYQAWiOAah0QAhiTAdg0QAQgeAhgWQAjgXAlgCQBdgGAiB3QAFARAACZQABCfALA9QAUBognBRQgPAhgWAUQgVATgUAAg");
	this.shape_2.setTransform(-0.174,-22.7143);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1B1810").s().p("AAPFzQgTgBgJgLQgLgNAAgdQAAijgjjPQgsjggRhdIDCAAIgHKQQA9AdgHAdQgDAMgOAHQgOAIgTAAg");
	this.shape_3.setTransform(1.186,23.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

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
	this.instance_1 = new lib.CachedBmp_2584();
	this.instance_1.setTransform(-48.3,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

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
	this.instance_1 = new lib.CachedBmp_2583();
	this.instance_1.setTransform(-48.25,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

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
	this.instance_1 = new lib.CachedBmp_2582();
	this.instance_1.setTransform(-76.25,-80.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.2,-80.2,157,165);


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
	this.instance = new lib.CachedBmp_2579();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2581();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2580();
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
	this.instance = new lib.CachedBmp_2576();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2578();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2577();
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

	// Armature_1
	this.instance = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance.setTransform(-57.45,-22.95,0.9984,0.9985,-85.0096,0,0,35.6,0.2);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-46.9,143.45,0.9982,0.9982,-103.4922,0,0,6.4,-1.2);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-49.35,134.75,0.9984,0.9984,-113.7462,0,0,5.5,-8.7);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-64.25,55.1,0.9985,0.9985,-100.4016,0,0,40.3,-0.1);

	this.instance_4 = new lib.ch1_headcopy2("synched",0);
	this.instance_4.setTransform(-0.65,-79.35,0.999,0.999,10.4097,0,0,0.7,52.5);

	this.instance_5 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_6.setTransform(13.5,178.35,0.9979,0.9979,-11.9338,0,0,2.6,-54.1);

	this.instance_7 = new lib.ch1_neckcopy2("synched",0);
	this.instance_7.setTransform(-4.85,-58.35,0.999,0.999,10.1882,0,0,-0.8,8.5);

	this.instance_8 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_8.setTransform(-5.55,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_9.setTransform(-2.15,187.7,0.9976,0.9976,36.4585,0,0,3.8,-53.5);

	this.instance_10 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_10.setTransform(15.75,93.2,0.9976,0.9976,7.8131,0,0,-0.1,1.8);

	this.instance_11 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_11.setTransform(60.25,138.4,0.9983,0.9983,60.4428,0,0,-5.3,2.8);

	this.instance_12 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_12.setTransform(63.5,127.4,0.9984,0.9984,84.7272,0,0,-6.2,7.7);

	this.instance_13 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_13.setTransform(43.05,49.7,0.9984,0.9984,75.6345,0,0,-40.4,-0.9);

	this.instance_14 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_14.setTransform(45.45,-25.95,0.9984,0.9984,92.6911,0,0,-33.2,-0.1);

	this.instance_15 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_15.setTransform(-25.4,90.2,0.9979,0.9979,-26.6677,0,0,2.5,-45.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-45.6,rotation:-26.6677,x:-25.4,y:90.2,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.6911,y:-25.95,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-0.9,scaleX:0.9984,scaleY:0.9984,rotation:75.6345,x:43.05,y:49.7}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.7272,x:63.5,scaleX:0.9984,y:127.4}},{t:this.instance_11,p:{regY:2.8,scaleX:0.9983,scaleY:0.9983,rotation:60.4428,x:60.25,y:138.4,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:7.8131,x:15.75,y:93.2,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9976,scaleY:0.9976,rotation:36.4585,x:-2.15,y:187.7,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.8,regY:8.5,scaleX:0.999,scaleY:0.999,rotation:10.1882,x:-4.85,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-11.9338,x:13.5,y:178.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.7,scaleX:0.999,scaleY:0.999,rotation:10.4097,x:-0.65,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9985,scaleY:0.9985,rotation:-100.4016,x:-64.25,y:55.1,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9984,scaleY:0.9984,rotation:-113.7462,x:-49.35,y:134.75,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.2,rotation:-103.4922,x:-46.9,scaleX:0.9982,scaleY:0.9982,y:143.45}},{t:this.instance,p:{scaleY:0.9985,rotation:-85.0096,x:-57.45,y:-22.95,regX:35.6,scaleX:0.9984,regY:0.2}}]}).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-25.023,x:-25.3,y:90.3,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.1674,y:-26,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.6488,x:42.6,y:49.75}},{t:this.instance_12,p:{scaleY:0.9983,rotation:84.7453,x:62.75,scaleX:0.9984,y:127.4}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:60.4703,x:59.55,y:138.4,regX:-5.3}},{t:this.instance_10,p:{regY:1.9,rotation:6.6175,x:15.45,y:93.35,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:33.7856,x:-0.45,y:188.1,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:10.0954,x:-5,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-10.491,x:11,y:179.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:10.2767,x:-0.8,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-100.6848,x:-64.3,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.4,scaleX:0.9983,scaleY:0.9983,rotation:-114.0192,x:-48.95,y:134.85,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-103.7618,x:-46.5,scaleX:0.9982,scaleY:0.9982,y:143.45}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.9601,x:-57.5,y:-23.05,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-45.5,rotation:-23.3783,x:-25.05,y:90.3,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.6437,y:-26,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.6623,x:41.9,y:49.6}},{t:this.instance_12,p:{scaleY:0.9983,rotation:84.7638,x:62.1,scaleX:0.9983,y:127.35}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:60.5013,x:58.85,y:138.45,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:5.4226,x:15.1,y:93.4,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:31.1124,x:1.25,y:188.5,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:10.0038,x:-4.9,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-9.0491,x:8.55,y:180.55}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:10.1426,x:-0.85,y:-79.45,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-100.9665,x:-64.4,y:55.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-114.2928,x:-48.6,y:134.65,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-104.0326,x:-46.15,scaleX:0.9981,scaleY:0.9981,y:143.35}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.9091,x:-57.45,y:-23.05,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.6,rotation:-21.7332,x:-25.05,y:90.3,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.1195,y:-25.95,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.6768,x:41.25,y:49.5}},{t:this.instance_12,p:{scaleY:0.9983,rotation:84.7831,x:61.45,scaleX:0.9983,y:127.3}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.5304,x:58.25,y:138.3,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:4.2264,x:14.8,y:93.55,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:28.4387,x:2.95,y:188.95,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.9105,x:-4.9,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-7.6065,x:6.15,y:181.55}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.7,scaleX:0.9989,scaleY:0.9989,rotation:10.0098,x:-0.75,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.2485,x:-64.45,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-114.5664,x:-48.3,y:134.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-104.3029,x:-45.8,scaleX:0.9981,scaleY:0.9981,y:143.15}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.8581,x:-57.45,y:-23.15,regX:35.7,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-20.0889,x:-24.8,y:90.5,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:94.5954,y:-26,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.6904,x:40.65,y:49.45}},{t:this.instance_12,p:{scaleY:0.9983,rotation:84.7999,x:60.8,scaleX:0.9983,y:127.3}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.5614,x:57.6,y:138.3,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:3.0311,x:14.5,y:93.65,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:25.7666,x:4.6,y:189.3,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.8182,x:-5,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.1644,x:3.65,y:182.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:9.8759,x:-0.9,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.5298,x:-64.35,y:55.2,regY:0}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-114.8415,x:-48.05,y:134.5,regY:-8.8}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-104.5741,x:-45.4,scaleX:0.9981,scaleY:0.9981,y:143.15}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.807,x:-57.4,y:-23.15,regX:35.7,scaleX:0.9983,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-18.4435,x:-24.65,y:90.55,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.0719,y:-25.95,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-0.9,scaleX:0.9983,scaleY:0.9983,rotation:75.7048,x:39.9,y:49.5}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.8183,x:60.15,scaleX:0.9984,y:127.25}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:60.5911,x:56.95,y:138.3,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:1.8355,x:14.2,y:93.8,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:23.0935,x:6.35,y:189.65,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.7259,x:-4.95,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-4.7218,x:1.15,y:183.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.7,scaleX:0.9989,scaleY:0.9989,rotation:9.7412,x:-0.8,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.8131,x:-64.5,y:55.2,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-115.113,x:-47.65,y:134.4,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-104.8442,x:-45.05,scaleX:0.9981,scaleY:0.9981,y:143.1}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.757,x:-57.45,y:-23.15,regX:35.7,scaleX:0.9983,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-45.5,rotation:-16.7995,x:-24.4,y:90.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:95.5485,y:-26,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.7184,x:39.4,y:49.35}},{t:this.instance_12,p:{scaleY:0.9983,rotation:84.8367,x:59.45,scaleX:0.9983,y:127.2}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:60.6202,x:56.25,y:138.2,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:0.6407,x:13.9,y:93.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:20.4212,x:8,y:189.9,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.6335,x:-4.85,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-3.2795,x:-1.25,y:184.05}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:9.6087,x:-0.95,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.096,x:-64.6,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-115.3888,x:-47.3,y:134.3,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.4,rotation:-105.1151,x:-44.75,scaleX:0.9981,scaleY:0.9981,y:143.05}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.7059,x:-57.4,y:-23.15,regX:35.7,scaleX:0.9983,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-15.1534,x:-24.3,y:90.65,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.0248,y:-26,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.7337,x:38.75,y:49.3}},{t:this.instance_12,p:{scaleY:0.9983,rotation:84.8552,x:58.8,scaleX:0.9983,y:127.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:60.6504,x:55.6,y:138.15,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-0.5504,x:13.55,y:94.05,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:17.7481,x:9.65,y:190.15,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.5422,x:-4.9,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-1.8367,x:-3.8,y:184.75}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:9.4748,x:-0.95,y:-79.3,regY:52.6}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.3773,x:-64.65,y:55.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-115.6611,x:-47,y:134.15,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-105.3858,x:-44.3,scaleX:0.9981,scaleY:0.9981,y:142.9}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.6549,x:-57.45,y:-23.15,regX:35.7,scaleX:0.9983,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-45.5,rotation:-13.5088,x:-24,y:90.7,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.5005,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.7473,x:38.1,y:49.25}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.8729,x:58.2,scaleX:0.9984,y:127.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:60.6798,x:54.95,y:138.15,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-1.7461,x:13.25,y:94.2,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:15.0754,x:11.4,y:190.35,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.5,scaleX:0.9989,scaleY:0.9989,rotation:9.4489,x:-4.9,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-0.3951,x:-6.35,y:185.4}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:9.3409,x:-0.95,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.6607,x:-64.7,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-115.9353,x:-46.7,y:134.05,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-105.6557,x:-43.9,scaleX:0.9981,scaleY:0.9981,y:142.8}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.6039,x:-57.35,y:-23.2,regX:35.7,scaleX:0.9983,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.6,rotation:-11.8642,x:-24.05,y:90.65,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.9767,y:-26,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.7628,x:37.55,y:49.25}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.8914,x:57.55,scaleX:0.9984,y:126.95}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.71,x:54.3,y:138.05,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-2.9407,x:12.95,y:94.3,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:12.4024,x:13.05,y:190.5,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.3576,x:-4.85,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:1.0436,x:-8.85,y:185.95}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:9.2066,x:-1.05,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.9437,x:-64.8,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-116.2086,x:-46.35,y:133.95,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-105.9263,x:-43.55,scaleX:0.9981,scaleY:0.9981,y:142.7}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.5537,x:-57.35,y:-23.2,regX:35.7,scaleX:0.9983,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-10.2179,x:-23.85,y:90.85,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.4543,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-0.9,scaleX:0.9983,scaleY:0.9983,rotation:75.7764,x:36.75,y:49.2}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.9098,x:56.9,scaleX:0.9984,y:126.95}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:60.739,x:53.6,y:137.95,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-4.1367,x:12.6,y:94.4,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:9.729,x:14.65,y:190.6,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.2636,x:-4.9,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:2.4856,x:-11.45,y:186.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.7,scaleX:0.9989,scaleY:0.9989,rotation:9.074,x:-0.95,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-103.2251,x:-64.9,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-116.482,x:-45.95,y:133.9,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-106.1966,x:-43.3,scaleX:0.9981,scaleY:0.9981,y:142.55}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.5028,x:-57.4,y:-23.15,regX:35.7,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-8.5733,x:-23.7,y:90.9,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.9296,y:-26,x:45.3,regY:0}},{t:this.instance_13,p:{regX:-40.4,regY:-0.9,scaleX:0.9983,scaleY:0.9983,rotation:75.7906,x:36.1,y:49.1}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.9283,x:56.25,scaleX:0.9984,y:126.8}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:60.77,x:52.9,y:137.95,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-5.3318,x:12.25,y:94.55,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:7.0558,x:16.4,y:190.65,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.1731,x:-4.9,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:3.9282,x:-14.1,y:186.75}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:8.94,x:-1.1,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-103.5087,x:-64.85,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-116.7554,x:-45.65,y:133.8,regY:-8.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-106.4679,x:-42.9,scaleX:0.9981,scaleY:0.9981,y:142.35}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.4517,x:-57.4,y:-23,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-6.9286,x:-23.5,y:91,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.4057,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.8042,x:35.65,y:49.05}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.9458,x:55.55,scaleX:0.9984,y:126.8}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.7986,x:52.3,y:137.85,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-6.5275,x:11.95,y:94.7,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:4.3839,x:18.2,y:190.65,regX:3.9,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.08,x:-4.95,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:5.3709,x:-16.7,y:187.05}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:8.806,x:-1.15,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-103.7892,x:-65,y:55.2,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-117.03,x:-45.35,y:133.65,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-106.7373,x:-42.5,scaleX:0.9981,scaleY:0.9981,y:142.3}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.4016,x:-57.4,y:-23,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-5.2836,x:-23.35,y:91.05,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.8823,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.8195,x:35,y:49.05}},{t:this.instance_12,p:{scaleY:0.9983,rotation:84.9642,x:54.9,scaleX:0.9983,y:126.65}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.8296,x:51.6,y:137.75,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-7.7234,x:11.65,y:94.75,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:1.7111,x:19.8,y:190.6,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:8.9871,x:-4.8,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:6.8134,x:-19.3,y:187.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:8.6735,x:-1.1,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-104.0721,x:-65,y:55.2,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-117.3033,x:-44.95,y:133.55,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-107.0083,x:-42.1,scaleX:0.9981,scaleY:0.9981,y:142.25}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.3514,x:-57.35,y:-23,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-3.6392,x:-23.15,y:91.1,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.3585,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.8331,x:34.35,y:48.9}},{t:this.instance_12,p:{scaleY:0.9983,rotation:84.9827,x:54.3,scaleX:0.9983,y:126.55}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:60.8582,x:51,y:137.7,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-8.9184,x:11.35,y:94.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-0.9589,x:21.45,y:190.55,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:8.895,x:-4.9,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:8.2567,x:-21.9,y:187.4}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:8.5389,x:-1.15,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-104.3546,x:-65.1,y:55.2,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-117.5772,x:-44.75,y:133.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-107.279,x:-41.75,scaleX:0.9981,scaleY:0.9981,y:142.15}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.3004,x:-57.3,y:-23.05,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.6,rotation:-1.9944,x:-23.05,y:91,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.8338,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-0.9,scaleX:0.9983,scaleY:0.9983,rotation:75.8484,x:33.6,y:48.85}},{t:this.instance_12,p:{scaleY:0.9984,rotation:85.0012,x:53.65,scaleX:0.9984,y:126.5}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.8876,x:50.35,y:137.6,regX:-5.2}},{t:this.instance_10,p:{regY:1.8,rotation:-10.1136,x:10.95,y:95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-3.6311,x:23.15,y:190.35,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:8.8026,x:-4.9,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:9.6991,x:-24.5,y:187.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.7,scaleX:0.9989,scaleY:0.9989,rotation:8.4053,x:-1.05,y:-79.25,regY:52.6}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-104.6379,x:-65.15,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-117.8514,x:-44.4,y:133.4,regY:-8.8}},{t:this.instance_1,p:{regX:6.2,regY:-1.4,rotation:-107.5502,x:-41.5,scaleX:0.9981,scaleY:0.9981,y:142}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.2485,x:-57.4,y:-23.1,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-0.3496,x:-22.8,y:91.25,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.3121,y:-26.05,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-0.9,scaleX:0.9983,scaleY:0.9983,rotation:75.8612,x:33,y:48.75}},{t:this.instance_12,p:{scaleY:0.9984,rotation:85.0188,x:53,scaleX:0.9984,y:126.4}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.9178,x:49.8,y:137.5,regX:-5.2}},{t:this.instance_10,p:{regY:1.8,rotation:-11.3087,x:10.6,y:95.05,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-6.3042,x:24.75,y:190.2,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:8.7098,x:-4.95,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:11.1414,x:-27.1,y:187.4}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:8.2717,x:-1.15,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-104.9187,x:-65.25,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-118.1245,x:-44,y:133.25,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-107.82,x:-41.05,scaleX:0.9981,scaleY:0.9981,y:141.85}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.1992,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:1.2915,x:-22.7,y:91.25,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.7878,y:-26.05,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.8765,x:32.5,y:48.65}},{t:this.instance_12,p:{scaleY:0.9984,rotation:85.0372,x:52.35,scaleX:0.9984,y:126.25}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.9473,x:49.1,y:137.45,regX:-5.2}},{t:this.instance_10,p:{regY:1.8,rotation:-12.5048,x:10.35,y:95.2,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-8.9769,x:26.4,y:190.05,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:8.6187,x:-4.85,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:12.5819,x:-29.7,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.7,scaleX:0.9989,scaleY:0.9989,rotation:8.139,x:-1.05,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-105.2025,x:-65.15,y:55.2,regY:0}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-118.3979,x:-43.7,y:133.15,regY:-8.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-108.0918,x:-40.7,scaleX:0.9981,scaleY:0.9981,y:141.65}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.1482,x:-57.3,y:-23.05,regX:35.6,scaleX:0.9984,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-45.6,rotation:2.9363,x:-22.4,y:91.25,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:101.2641,y:-26.05,x:45.35,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.8901,x:31.9,y:48.5}},{t:this.instance_12,p:{scaleY:0.9984,rotation:85.0557,x:51.75,scaleX:0.9983,y:126.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.977,x:48.45,y:137.2,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-13.7002,x:10.05,y:95.3,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-11.6498,x:28.1,y:189.95,regX:3.8,regY:-53.4}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:8.5248,x:-4.85,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:14.0254,x:-32.25,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:8.0046,x:-1.25,y:-79.25,regY:52.6}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-105.4853,x:-65.3,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-118.6715,x:-43.4,y:133.05,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-108.3599,x:-40.3,scaleX:0.9981,scaleY:0.9981,y:141.65}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.0971,x:-57.3,y:-23.1,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-45.5,rotation:4.5809,x:-22.15,y:91.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:101.7405,y:-26.05,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.9053,x:31.25,y:48.4}},{t:this.instance_12,p:{scaleY:0.9984,rotation:85.0742,x:51.05,scaleX:0.9984,y:126.05}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:61.008,x:47.75,y:137.1,regX:-5.3}},{t:this.instance_10,p:{regY:1.9,rotation:-14.8948,x:9.75,y:95.55,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-14.3213,x:29.75,y:189.5,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:8.4325,x:-5,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:15.4668,x:-34.9,y:186.8}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:7.8713,x:-1.3,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-105.7679,x:-65.4,y:55.35,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-118.9467,x:-43.05,y:132.9,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.4,rotation:-108.6316,x:-40,scaleX:0.9981,scaleY:0.9981,y:141.55}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.046,x:-57.3,y:-23.1,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-45.5,rotation:3.0048,x:-22.4,y:91.35,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:101.2946,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.8909,x:31.85,y:48.5}},{t:this.instance_12,p:{scaleY:0.9984,rotation:85.0601,x:51.7,scaleX:0.9984,y:126.15}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.9939,x:48.4,y:137.25,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-13.7493,x:10.05,y:95.3,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-11.7728,x:28.2,y:189.8,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:8.5264,x:-4.85,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:14.0932,x:-32.45,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:7.9932,x:-1.25,y:-79.25,regY:52.6}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-105.4923,x:-65.2,y:55.2,regY:0}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-118.6703,x:-43.4,y:133.05,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-108.3552,x:-40.3,scaleX:0.9981,scaleY:0.9981,y:141.65}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.0839,x:-57.35,y:-23.1,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:1.43,x:-22.6,y:91.25,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.8486,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.8775,x:32.4,y:48.65}},{t:this.instance_12,p:{scaleY:0.9984,rotation:85.0461,x:52.3,scaleX:0.9984,y:126.25}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.9802,x:49,y:137.3,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-12.6024,x:10.35,y:95.2,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-9.2234,x:26.6,y:190.05,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:8.6211,x:-4.85,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:12.7177,x:-29.9,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:8.115,x:-1.25,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-105.2161,x:-65.3,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-118.396,x:-43.7,y:133.1,regY:-8.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-108.0812,x:-40.7,scaleX:0.9981,scaleY:0.9981,y:141.6}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.1217,x:-57.3,y:-23.05,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-0.1411,x:-22.8,y:91.25,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.4013,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-0.9,scaleX:0.9983,scaleY:0.9983,rotation:75.8639,x:32.9,y:48.8}},{t:this.instance_12,p:{scaleY:0.9984,rotation:85.0329,x:52.85,scaleX:0.9984,y:126.35}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.9661,x:49.55,y:137.4,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-11.4572,x:10.6,y:95.15,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-6.6727,x:24.95,y:190.25,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:8.7151,x:-4.95,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:11.3426,x:-27.45,y:187.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:8.2382,x:-1.2,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-104.9423,x:-65.25,y:55.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-118.1201,x:-44.05,y:133.25,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-107.8056,x:-41.05,scaleX:0.9981,scaleY:0.9981,y:141.85}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.1596,x:-57.4,y:-23.1,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-1.7166,x:-22.95,y:91.15,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.9556,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-0.9,scaleX:0.9983,scaleY:0.9983,rotation:75.8495,x:33.45,y:48.85}},{t:this.instance_12,p:{scaleY:0.9984,rotation:85.0188,x:53.5,scaleX:0.9984,y:126.45}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.9527,x:50.25,y:137.6,regX:-5.2}},{t:this.instance_10,p:{regY:1.8,rotation:-10.3111,x:10.9,y:95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-4.123,x:23.4,y:190.4,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:8.8089,x:-4.9,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:9.9668,x:-24.95,y:187.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.7,scaleX:0.9989,scaleY:0.9989,rotation:8.3585,x:-1,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-104.667,x:-65.2,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-117.8451,x:-44.5,y:133.4,regY:-8.8}},{t:this.instance_1,p:{regX:6.2,regY:-1.4,rotation:-107.5314,x:-41.5,scaleX:0.9981,scaleY:0.9981,y:142}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.1975,x:-57.4,y:-23.1,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.6,rotation:-3.2934,x:-23.1,y:91,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.5094,y:-26.05,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.837,x:34.15,y:48.85}},{t:this.instance_12,p:{scaleY:0.9984,rotation:85.0047,x:54.1,scaleX:0.9984,y:126.55}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.939,x:50.9,y:137.7,regX:-5.2}},{t:this.instance_10,p:{regY:1.8,rotation:-9.1661,x:11.25,y:94.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-1.5743,x:21.95,y:190.55,regX:3.9,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:8.9027,x:-4.9,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:8.5924,x:-22.4,y:187.4}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:8.4813,x:-1.15,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-104.3911,x:-65.2,y:55.2,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-117.5701,x:-44.7,y:133.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-107.256,x:-41.8,scaleX:0.9981,scaleY:0.9981,y:142.1}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.2353,x:-57.4,y:-23.1,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-4.8692,x:-23.3,y:91.05,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.0638,y:-26.05,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.8231,x:34.75,y:49}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.9915,x:54.7,scaleX:0.9984,y:126.65}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.9249,x:51.5,y:137.75,regX:-5.2}},{t:this.instance_10,p:{regY:1.8,rotation:-8.019,x:11.55,y:94.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:0.9729,x:20.2,y:190.55,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:8.9968,x:-4.85,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:7.216,x:-19.95,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:8.6034,x:-1.1,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-104.1174,x:-65.15,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-117.2955,x:-45,y:133.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-106.9817,x:-42.15,scaleX:0.9981,scaleY:0.9981,y:142.25}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.2722,x:-57.4,y:-23.05,regX:35.6,scaleX:0.9983,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-6.4445,x:-23.45,y:91.05,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.6173,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.8087,x:35.35,y:49.1}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.9775,x:55.3,scaleX:0.9984,y:126.7}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.912,x:52.1,y:137.85,regX:-5.2}},{t:this.instance_10,p:{regY:1.8,rotation:-6.8734,x:11.8,y:94.7,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:3.5212,x:18.5,y:190.8,regX:3.8,regY:-53.4}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.0907,x:-5,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:5.842,x:-17.45,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:8.7249,x:-1.1,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-103.8421,x:-65.15,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-117.0206,x:-45.4,y:133.7,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-106.7055,x:-42.55,scaleX:0.9981,scaleY:0.9981,y:142.3}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.3092,x:-57.35,y:-23,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-8.0217,x:-23.65,y:91,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.1702,y:-26.05,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.7953,x:35.95,y:49.1}},{t:this.instance_12,p:{scaleY:0.9983,rotation:84.9642,x:55.9,scaleX:0.9983,y:126.8}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.8978,x:52.7,y:137.95,regX:-5.2}},{t:this.instance_10,p:{regY:1.8,rotation:-5.7272,x:12.1,y:94.55,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:6.0703,x:16.9,y:190.65,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.1838,x:-4.9,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:4.466,x:-14.95,y:186.8}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:8.8479,x:-1.05,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-103.5671,x:-65,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-116.7448,x:-45.7,y:133.8,regY:-8.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-106.4311,x:-42.95,scaleX:0.9981,scaleY:0.9981,y:142.3}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.348,x:-57.35,y:-23.05,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-9.5964,x:-23.8,y:90.95,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.7245,y:-26,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-0.9,scaleX:0.9983,scaleY:0.9983,rotation:75.7817,x:36.4,y:49.15}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.9503,x:56.55,scaleX:0.9984,y:126.9}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.8837,x:53.25,y:138,regX:-5.2}},{t:this.instance_10,p:{regY:1.8,rotation:-4.5815,x:12.45,y:94.5,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:8.621,x:15.3,y:190.6,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.2777,x:-4.9,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:3.0918,x:-12.5,y:186.55}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:8.9701,x:-1,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-103.291,x:-65.05,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-116.4699,x:-46.05,y:133.9,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-106.1556,x:-43.25,scaleX:0.9981,scaleY:0.9981,y:142.55}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.3859,x:-57.4,y:-23.05,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-11.1713,x:-23.9,y:90.85,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.2786,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.7681,x:37.1,y:49.2}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.9362,x:57.15,scaleX:0.9984,y:127}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.8704,x:53.8,y:138,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-3.4348,x:12.75,y:94.35,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:11.1712,x:13.75,y:190.55,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.3728,x:-4.8,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:1.7158,x:-10,y:186.15}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:9.0925,x:-1.05,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-103.0174,x:-64.95,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-116.1949,x:-46.35,y:133.95,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-105.8814,x:-43.65,scaleX:0.9981,scaleY:0.9981,y:142.65}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.4235,x:-57.4,y:-23.05,regX:35.6,scaleX:0.9983,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-45.6,rotation:-12.7467,x:-23.95,y:90.65,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.8321,y:-26,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.7545,x:37.7,y:49.25}},{t:this.instance_12,p:{scaleY:0.9983,rotation:84.9229,x:57.7,scaleX:0.9983,y:127.05}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.8574,x:54.45,y:138.1,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-2.2889,x:13.05,y:94.25,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:13.7214,x:12.15,y:190.4,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.5,scaleX:0.9989,scaleY:0.9989,rotation:9.4668,x:-4.9,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3408,x:-7.55,y:185.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:9.213,x:-0.95,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.7419,x:-64.9,y:55.2,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-115.92,x:-46.7,y:134.05,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-105.6057,x:-44,scaleX:0.9981,scaleY:0.9981,y:142.75}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.4606,x:-57.4,y:-23.05,regX:35.6,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.6,rotation:-14.3229,x:-24.25,y:90.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.3859,y:-26,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.7409,x:38.25,y:49.25}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.909,x:58.35,scaleX:0.9984,y:127.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.8425,x:55.05,y:138.1,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:-1.1429,x:13.4,y:94.1,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:16.2714,x:10.5,y:190.2,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.5609,x:-4.9,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-1.0296,x:-5.05,y:185.1}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:9.3356,x:-0.95,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.4661,x:-64.85,y:55.2,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-115.6446,x:-47.15,y:134.1,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-105.3312,x:-44.4,scaleX:0.9981,scaleY:0.9981,y:142.9}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.4976,x:-57.45,y:-23.15,regX:35.7,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-15.8982,x:-24.4,y:90.65,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.9411,y:-25.95,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.7256,x:38.85,y:49.35}},{t:this.instance_12,p:{scaleY:0.9983,rotation:84.8956,x:58.95,scaleX:0.9983,y:127.1}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.8304,x:55.6,y:138.15,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:0,x:13.65,y:94.05,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:18.8202,x:8.9,y:190.05,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.655,x:-4.9,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-2.4049,x:-2.6,y:184.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.7,scaleX:0.9989,scaleY:0.9989,rotation:9.4587,x:-0.8,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.191,x:-64.9,y:55.2,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-115.3696,x:-47.4,y:134.2,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-105.056,x:-44.75,scaleX:0.9981,scaleY:0.9981,y:142.95}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.5354,x:-57.35,y:-23.2,regX:35.7,scaleX:0.9983,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-17.4752,x:-24.55,y:90.6,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.4941,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-0.9,scaleX:0.9983,scaleY:0.9983,rotation:75.7129,x:39.35,y:49.45}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.8817,x:59.55,scaleX:0.9984,y:127.2}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:60.8151,x:56.3,y:138.25,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:1.1437,x:13.95,y:93.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:21.3701,x:7.35,y:189.85,regX:3.9,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.7482,x:-4.95,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-3.7799,x:-0.3,y:183.8}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:9.5803,x:-0.9,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.916,x:-64.8,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-115.095,x:-47.75,y:134.35,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-104.7809,x:-45.15,scaleX:0.9981,scaleY:0.9981,y:143.05}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.5732,x:-57.4,y:-23.15,regX:35.7,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-19.05,x:-24.7,y:90.5,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.0473,y:-26,x:45.4,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.6997,x:40.05,y:49.45}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.8676,x:60.2,scaleX:0.9984,y:127.25}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:60.8009,x:56.9,y:138.25,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:2.2897,x:14.3,y:93.8,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:23.9214,x:5.65,y:189.5,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.842,x:-4.9,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-5.1553,x:2.15,y:183}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:9.7029,x:-0.9,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.6416,x:-64.75,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-114.8192,x:-48.15,y:134.5,regY:-8.8}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-104.5059,x:-45.5,scaleX:0.9981,scaleY:0.9982,y:143.15}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.611,x:-57.4,y:-23.15,regX:35.7,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-20.6257,x:-24.85,y:90.45,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.6026,y:-26,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.6859,x:40.65,y:49.45}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.8544,x:60.8,scaleX:0.9984,y:127.3}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.7892,x:57.45,y:138.3,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:3.4358,x:14.55,y:93.6,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:26.4702,x:4,y:189.3,regX:3.8,regY:-53.4}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:9.9364,x:-4.85,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-6.5302,x:4.5,y:182.15}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:9.8245,x:-0.8,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.3659,x:-64.7,y:55.2,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-114.5444,x:-48.45,y:134.45,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-104.2298,x:-45.9,scaleX:0.9981,scaleY:0.9981,y:143.15}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.6488,x:-57.45,y:-23.15,regX:35.7,scaleX:0.9983,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-22.2015,x:-25,y:90.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.1564,y:-25.95,x:45.5,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.6715,x:41.2,y:49.5}},{t:this.instance_12,p:{scaleY:0.9983,rotation:84.8403,x:61.4,scaleX:0.9983,y:127.3}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:60.7747,x:58.15,y:138.35,regX:-5.3}},{t:this.instance_10,p:{regY:1.8,rotation:4.5822,x:14.85,y:93.5,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:29.0192,x:2.35,y:188.9,regX:3.8,regY:-53.4}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:10.0294,x:-4.9,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-7.9055,x:6.85,y:181.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:9.9468,x:-0.8,y:-79.45,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.0915,x:-64.65,y:55.2,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-114.2697,x:-48.8,y:134.55,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-103.9559,x:-46.3,scaleX:0.9981,scaleY:0.9981,y:143.35}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.6867,x:-57.45,y:-23.1,regX:35.7,scaleX:0.9983,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.5,rotation:-23.7777,x:-25.15,y:90.35,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.7104,y:-25.95,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.6587,x:41.8,y:49.6}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.8263,x:62.05,scaleX:0.9984,y:127.35}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9981,scaleY:0.9981,rotation:60.7605,x:58.75,y:138.35,regX:-5.3}},{t:this.instance_10,p:{regY:1.9,rotation:5.7281,x:15.15,y:93.45,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:31.5695,x:0.8,y:188.6,regX:3.9,regY:-53.4}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:10.1239,x:-4.95,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-9.2808,x:9.25,y:180.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.7,scaleX:0.9989,scaleY:0.9989,rotation:10.0687,x:-0.7,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-100.8164,x:-64.65,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.4,scaleX:0.9983,scaleY:0.9983,rotation:-113.9941,x:-49.15,y:134.8,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-103.6798,x:-46.65,scaleX:0.9982,scaleY:0.9982,y:143.45}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.7245,x:-57.45,y:-23.15,regX:35.7,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,regY:-45.6,rotation:-25.3531,x:-25.4,y:90.15,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:93.2621,y:-26,x:45.45,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-1,scaleX:0.9983,scaleY:0.9983,rotation:75.6443,x:42.45,y:49.75}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.8131,x:62.6,scaleX:0.9984,y:127.35}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.7473,x:59.3,y:138.4,regX:-5.3}},{t:this.instance_10,p:{regY:1.9,rotation:6.8743,x:15.35,y:93.4,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:34.1199,x:-0.85,y:188,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:10.2172,x:-4.9,y:-58.4}},{t:this.instance_6,p:{scaleX:0.9978,scaleY:0.9978,rotation:-10.6561,x:11.5,y:179.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.999,scaleY:0.999,rotation:10.1894,x:-0.8,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-100.5412,x:-64.6,y:55.25,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-113.7201,x:-49.5,y:134.7,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-103.4061,x:-47.1,scaleX:0.9981,scaleY:0.9981,y:143.55}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.7614,x:-57.45,y:-23.15,regX:35.7,scaleX:0.9984,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,regY:-45.5,rotation:-26.9283,x:-25.35,y:90.15,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.8174,y:-26,x:45.5,regY:-0.1}},{t:this.instance_13,p:{regX:-40.3,regY:-0.9,scaleX:0.9983,scaleY:0.9983,rotation:75.6326,x:42.95,y:49.75}},{t:this.instance_12,p:{scaleY:0.9984,rotation:84.799,x:63.25,scaleX:0.9984,y:127.4}},{t:this.instance_11,p:{regY:2.9,scaleX:0.9982,scaleY:0.9982,rotation:60.7331,x:59.9,y:138.4,regX:-5.3}},{t:this.instance_10,p:{regY:1.9,rotation:8.0199,x:15.7,y:93.3,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:36.6683,x:-2.5,y:187.55,regX:3.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,regY:8.4,scaleX:0.9989,scaleY:0.9989,rotation:10.3114,x:-4.85,y:-58.45}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-12.0303,x:13.8,y:178.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.6,scaleX:0.9989,scaleY:0.9989,rotation:10.3124,x:-0.75,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-100.2671,x:-64.5,y:55.15,regY:-0.1}},{t:this.instance_2,p:{regX:5.5,scaleX:0.9983,scaleY:0.9983,rotation:-113.4459,x:-49.85,y:134.75,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.2,rotation:-103.1297,x:-47.35,scaleX:0.9981,scaleY:0.9981,y:143.5}},{t:this.instance,p:{scaleY:0.9984,rotation:-84.7992,x:-57.4,y:-23.15,regX:35.7,scaleX:0.9984,regY:0.2}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93.2,-211.4,191.3,516.4);


(lib.CharacterBad_03 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_1
	this.instance = new lib.ch1_uArm_rcopy("synched",0);
	this.instance.setTransform(-57.1,-23.15,0.9984,0.9984,-77.7476,0,0,35.7,0.4);

	this.instance_1 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1.setTransform(-50.25,137.1,0.9982,0.9982,-99.7175,0,0,6.5,-1.2);

	this.instance_2 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2.setTransform(-45.65,129.75,0.9983,0.9983,-67.3882,0,0,5.3,-8.5);

	this.instance_3 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_3.setTransform(-74,53.65,0.9984,0.9984,-110.0174,0,0,40.4,0);

	this.instance_4 = new lib.ch1_headcopy("synched",0);
	this.instance_4.setTransform(-0.55,-79.8,0.999,0.999,12.9846,0,0,1,52.3);

	this.instance_5 = new lib.ch1_uBodycopy("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_6.setTransform(9,182.5,0.998,0.998,-17.6593,0,0,2.6,-54.6);

	this.instance_7 = new lib.ch1_neckcopy("synched",0);
	this.instance_7.setTransform(-5,-58.3,0.999,0.999,9.2291,0,0,-1,8.7);

	this.instance_8 = new lib.ch1_lBodycopy("synched",0);
	this.instance_8.setTransform(-5.55,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_9.setTransform(10.15,191.9,0.9975,0.9975,30.717,0,0,4,-53.5);

	this.instance_10 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_10.setTransform(8.55,96.15,0.9977,0.9977,-3.3977,0,0,-0.3,2.2);

	this.instance_11 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_11.setTransform(69.35,135.9,0.9984,0.9984,90.3074,0,0,-4.5,3.1);

	this.instance_12 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_12.setTransform(76,126.9,0.9984,0.9984,110.0078,0,0,-6.1,8.2);

	this.instance_13 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_13.setTransform(60.3,48.1,0.9984,0.9984,78.6198,0,0,-40.4,-0.8);

	this.instance_14 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_14.setTransform(45.25,-25.9,0.9984,0.9984,79.4571,0,0,-33.1,-0.2);

	this.instance_15 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_15.setTransform(-22,91.3,0.998,0.998,-21.154,0,0,1.9,-45.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-21.154,x:-22,y:91.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:79.4571,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.6198,x:60.3,y:48.1,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:110.0078,x:76,y:126.9,regX:-6.1,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:90.3074,x:69.35,y:135.9,regY:3.1}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9977,scaleY:0.9977,rotation:-3.3977,x:8.55,y:96.15,regY:2.2}},{t:this.instance_9,p:{rotation:30.717,x:10.15,y:191.9,regY:-53.5}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regY:8.7,scaleX:0.999,scaleY:0.999,rotation:9.2291,x:-5,y:-58.3}},{t:this.instance_6,p:{scaleX:0.998,scaleY:0.998,rotation:-17.6593,x:9,y:182.5,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.3,scaleX:0.999,scaleY:0.999,rotation:12.9846,x:-0.55,y:-79.8}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-110.0174,x:-74,y:53.65,regX:40.4,regY:0}},{t:this.instance_2,p:{regX:5.3,scaleX:0.9983,scaleY:0.9983,rotation:-67.3882,x:-45.65,y:129.75,regY:-8.5}},{t:this.instance_1,p:{regX:6.5,scaleX:0.9982,scaleY:0.9982,rotation:-99.7175,x:-50.25,y:137.1}},{t:this.instance,p:{regX:35.7,rotation:-77.7476,y:-23.15,x:-57.1,scaleX:0.9984,scaleY:0.9984}}]}).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.9979,scaleY:0.9979,rotation:-19.8604,x:-21.6,y:91.25,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:80.4843,x:45.3,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.5755,x:58.95,y:48.25,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.9691,x:74.75,y:127.1,regX:-6.1,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.2811,x:68.1,y:136.1,regY:3.1}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-4.0022,x:8.4,y:96.1,regY:2.2}},{t:this.instance_9,p:{rotation:28.4359,x:11,y:191.9,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.2387,x:-4.95,y:-58.15}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-16.0057,x:7.25,y:183.3,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:12.799,x:-0.6,y:-79.8}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.3171,x:-73.65,y:53.75,regX:40.4,regY:0}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-67.7014,x:-44.95,y:129.8,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-100.0172,x:-49.35,y:137.15}},{t:this.instance,p:{regX:35.6,rotation:-78.029,y:-23,x:-57.1,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-18.5657,x:-21.3,y:91.45,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:81.5111,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.5307,x:57.75,y:48.4,regY:-0.9,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.9309,x:73.4,y:127.35,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.2548,x:66.9,y:136.35,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-4.6069,x:8.3,y:96.15,regY:2.2}},{t:this.instance_9,p:{rotation:26.157,x:11.95,y:191.9,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.2494,x:-4.95,y:-58.15}},{t:this.instance_6,p:{scaleX:0.998,scaleY:0.998,rotation:-14.3535,x:5.45,y:184,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:12.6132,x:-0.55,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.6175,x:-73.35,y:53.95,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-68.0134,x:-44.1,y:129.65,regY:-8.5}},{t:this.instance_1,p:{regX:6.5,scaleX:0.9981,scaleY:0.9981,rotation:-100.317,x:-48.55,y:137}},{t:this.instance,p:{regX:35.6,rotation:-78.3079,y:-23.05,x:-57.1,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.9979,scaleY:0.9979,rotation:-17.2713,x:-21.05,y:91.55,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:82.5378,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.4859,x:56.3,y:48.85,regY:-0.8,regX:-40.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.8918,x:72.15,y:127.55,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.2277,x:65.6,y:136.5,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-5.2121,x:8.2,y:96.2,regY:2.2}},{t:this.instance_9,p:{rotation:23.8763,x:12.85,y:191.9,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.2592,x:-4.95,y:-58.15}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-12.6992,x:3.7,y:184.75,regY:-54.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:12.4285,x:-0.45,y:-79.8}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.9177,x:-73,y:53.95,regX:40.4,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-68.3254,x:-43.4,y:129.6,regY:-8.5}},{t:this.instance_1,p:{regX:6.5,scaleX:0.9981,scaleY:0.9981,rotation:-100.6171,x:-47.75,y:136.95}},{t:this.instance,p:{regX:35.7,rotation:-78.5879,y:-23.15,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-15.9772,x:-20.75,y:91.65,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:83.5638,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.4412,x:55.05,y:48.95,regY:-0.9,regX:-40.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.8539,x:70.85,y:127.75,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.1997,x:64.4,y:136.75,regY:3}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9976,scaleY:0.9976,rotation:-5.8179,x:7.95,y:96.25,regY:2.2}},{t:this.instance_9,p:{rotation:21.5962,x:13.7,y:191.9,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.2705,x:-4.95,y:-58.15}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-11.0455,x:1.8,y:185.3,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:12.2422,x:-0.45,y:-79.8}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.2182,x:-72.6,y:54.05,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-68.6397,x:-42.6,y:129.5,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-100.915,x:-46.9,y:137.05}},{t:this.instance,p:{regX:35.6,rotation:-78.868,y:-23,x:-57.15,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-14.6826,x:-20.35,y:91.75,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:84.5914,x:45.3,y:-25.85,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.3966,x:53.55,y:49.2,regY:-0.8,regX:-40.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.8162,x:69.5,y:127.95,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.1734,x:63.05,y:136.9,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.4226,x:7.9,y:96.3,regY:2.2}},{t:this.instance_9,p:{rotation:19.3161,x:14.6,y:191.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.2813,x:-4.9,y:-58.15}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-9.3925,x:-0.05,y:186.05,regY:-54.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:12.0568,x:-0.6,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.5188,x:-72.25,y:54.05,regX:40.4,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-68.9508,x:-41.75,y:129.5,regY:-8.4}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-101.2148,x:-46.05,y:136.95}},{t:this.instance,p:{regX:35.6,rotation:-79.1481,y:-23.05,x:-57.05,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.9979,scaleY:0.9979,rotation:-13.3888,x:-20.1,y:91.85,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:85.618,x:45.3,y:-25.85,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.3511,x:52.3,y:49.35,regY:-0.8,regX:-40.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.7785,x:68.3,y:128.1,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.1463,x:61.8,y:137,regY:3}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9976,scaleY:0.9976,rotation:-7.0278,x:7.6,y:96.4,regY:2.2}},{t:this.instance_9,p:{rotation:17.0355,x:15.4,y:191.85,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.2921,x:-4.9,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-7.7392,x:-1.9,y:186.4,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:11.8716,x:-0.55,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.819,x:-71.75,y:54.2,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-69.2641,x:-41.05,y:129.35,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-101.5149,x:-45.25,y:136.95}},{t:this.instance,p:{regX:35.7,rotation:-79.4291,y:-23.2,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.998,scaleY:0.998,rotation:-12.0934,x:-19.85,y:91.8,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:86.6458,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.3064,x:51,y:49.4,regY:-0.9,regX:-40.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.7403,x:66.95,y:128.2,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.1191,x:60.55,y:137.1,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-7.6332,x:7.65,y:96.35,regY:2.2}},{t:this.instance_9,p:{rotation:14.7548,x:16.35,y:191.7,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.3027,x:-4.9,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-6.0871,x:-3.55,y:186.9,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:11.6857,x:-0.45,y:-79.8}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.1197,x:-71.4,y:54.25,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-69.5756,x:-40.15,y:129.35,regY:-8.4}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-101.8146,x:-44.4,y:136.8}},{t:this.instance,p:{regX:35.6,rotation:-79.7077,y:-23.05,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-10.7988,x:-19.6,y:92.05,regX:1.8}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:87.6717,x:45.25,y:-25.75,regX:-33,regY:-0.2}},{t:this.instance_13,p:{rotation:78.2618,x:49.5,y:49.45,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.701,x:65.7,y:128.15,regX:-6.1,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.0928,x:59.25,y:137.2,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-8.2376,x:7.45,y:96.35,regY:2.2}},{t:this.instance_9,p:{rotation:12.4747,x:17.15,y:191.7,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.3117,x:-4.9,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-4.4321,x:-5.45,y:187.5,regY:-54.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:11.4998,x:-0.5,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.4201,x:-71.1,y:54.2,regX:40.4,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-69.8889,x:-39.35,y:129.2,regY:-8.4}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-102.1144,x:-43.7,y:136.75}},{t:this.instance,p:{regX:35.6,rotation:-79.989,y:-23.15,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-9.5039,x:-19.2,y:92.15,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.6995,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.2169,x:48.15,y:49.5,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.6619,x:64.4,y:128.15,regX:-6.1,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.0657,x:57.9,y:137.25,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-8.8438,x:7.35,y:96.4,regY:2.2}},{t:this.instance_9,p:{rotation:10.1942,x:17.95,y:191.65,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.3222,x:-4.85,y:-58.25}},{t:this.instance_6,p:{scaleX:0.998,scaleY:0.998,rotation:-2.7791,x:-7.3,y:187.75,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:11.3141,x:-0.6,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.7198,x:-70.7,y:54.45,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.202,x:-38.75,y:129.1,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-102.414,x:-42.85,y:136.7}},{t:this.instance,p:{regX:35.7,rotation:-80.2689,y:-23.25,x:-57.05,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-8.2103,x:-18.85,y:92.25,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.7259,x:45.25,y:-25.85,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.1723,x:46.95,y:49.5,regY:-0.9,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.6248,x:63.1,y:128.15,regX:-6.1,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.0385,x:56.7,y:137.25,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-9.4482,x:7.25,y:96.45,regY:2.2}},{t:this.instance_9,p:{rotation:7.9142,x:18.85,y:191.55,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.3337,x:-4.95,y:-58.25}},{t:this.instance_6,p:{scaleX:0.998,scaleY:0.998,rotation:-1.1267,x:-9.15,y:188,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.1,scaleX:0.9989,scaleY:0.9989,rotation:11.1285,x:-0.5,y:-79.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.0207,x:-70.3,y:54.45,regX:40.4,regY:-0.1}},{t:this.instance_2,p:{regX:5.3,scaleX:0.9982,scaleY:0.9982,rotation:-70.5137,x:-37.9,y:128.9,regY:-8.5}},{t:this.instance_1,p:{regX:6.5,scaleX:0.9981,scaleY:0.9981,rotation:-102.7128,x:-42.05,y:136.45}},{t:this.instance,p:{regX:35.6,rotation:-80.5478,y:-23.1,x:-57.1,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-6.9157,x:-18.6,y:92.25,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.7488,x:45.3,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.1283,x:45.4,y:49.7,regY:-0.8,regX:-40.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.5849,x:61.85,y:128.15,regX:-6.1,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.0123,x:55.4,y:137.3,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-10.0538,x:7.05,y:96.5,regY:2.2}},{t:this.instance_9,p:{rotation:5.6341,x:19.75,y:191.5,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.3443,x:-4.9,y:-58.35}},{t:this.instance_6,p:{scaleX:0.998,scaleY:0.998,rotation:0.5221,x:-11,y:188.3,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:10.9421,x:-0.55,y:-79.8}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.3208,x:-69.95,y:54.45,regX:40.4,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.8275,x:-37.15,y:128.85,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-103.0137,x:-41.2,y:136.55}},{t:this.instance,p:{regX:35.6,rotation:-80.8281,y:-23.1,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.998,scaleY:0.998,rotation:-5.6211,x:-18.3,y:92.25,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:91.7762,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.0837,x:44.2,y:49.55,regY:-0.9,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.5475,x:60.5,y:128.25,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:89.9904,x:54.05,y:137.25,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-10.6588,x:6.95,y:96.5,regY:2.2}},{t:this.instance_9,p:{rotation:3.3543,x:20.6,y:191.4,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.355,x:-4.9,y:-58.35}},{t:this.instance_6,p:{scaleX:0.998,scaleY:0.998,rotation:2.1749,x:-12.9,y:188.6,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:10.7576,x:-0.5,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.6209,x:-69.5,y:54.6,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.1394,x:-36.4,y:128.8,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-103.3133,x:-40.4,y:136.5}},{t:this.instance,p:{regX:35.6,rotation:-81.1092,y:-23.15,x:-57.1,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.998,scaleY:0.998,rotation:-4.3274,x:-17.95,y:92.3,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.8017,x:45.25,y:-25.85,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.0369,x:42.7,y:49.55,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.5093,x:59.2,y:128.2,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:89.9632,x:52.75,y:137.2,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-11.264,x:6.85,y:96.5,regY:2.2}},{t:this.instance_9,p:{rotation:1.0737,x:21.5,y:191.25,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.3655,x:-4.85,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:3.8296,x:-14.75,y:188.7,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.1,scaleX:0.9989,scaleY:0.9989,rotation:10.5715,x:-0.4,y:-79.85}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.9217,x:-69.1,y:54.55,regX:40.4,regY:0}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-71.4512,x:-35.65,y:128.65,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-103.6116,x:-39.6,y:136.4}},{t:this.instance,p:{regX:35.6,rotation:-81.3874,y:-23.1,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-3.0325,x:-17.65,y:92.5,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:93.8298,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:77.9921,x:41.4,y:49.5,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.4705,x:57.9,y:128.15,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:89.9369,x:51.55,y:137.15,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-11.8696,x:6.65,y:96.55,regY:2.2}},{t:this.instance_9,p:{rotation:-1.2017,x:22.4,y:191.1,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.3761,x:-4.9,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:5.483,x:-16.6,y:188.85,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:10.3863,x:-0.5,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.2215,x:-68.8,y:54.65,regX:40.4,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.7633,x:-34.85,y:128.5,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-103.9126,x:-38.75,y:136.3}},{t:this.instance,p:{regX:35.6,rotation:-81.6682,y:-23.1,x:-57.1,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.9979,scaleY:0.9979,rotation:-1.7384,x:-17.4,y:92.6,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.8574,x:45.25,y:-25.95,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:77.9474,x:40.15,y:49.3,regY:-0.9,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.4323,x:56.65,y:128.1,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:89.9098,x:50.25,y:137.05,regY:3}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9976,scaleY:0.9976,rotation:-12.4748,x:6.45,y:96.6,regY:2.2}},{t:this.instance_9,p:{rotation:-3.4825,x:23.25,y:191,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.3851,x:-4.9,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:7.1356,x:-18.55,y:188.9,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.1,scaleX:0.9989,scaleY:0.9989,rotation:10.2003,x:-0.5,y:-79.85}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.5222,x:-68.4,y:54.75,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.0774,x:-34.05,y:128.4,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-104.2115,x:-37.9,y:136.15}},{t:this.instance,p:{regX:35.6,rotation:-81.9487,y:-23.15,x:-57,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-0.4433,x:-17.1,y:92.7,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.8839,x:45.25,y:-25.8,regX:-33,regY:-0.2}},{t:this.instance_13,p:{rotation:77.9035,x:38.65,y:49.25,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.3935,x:55.35,y:128,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:89.8826,x:48.9,y:136.95,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-13.0795,x:6.4,y:96.6,regY:2.2}},{t:this.instance_9,p:{rotation:-5.7619,x:24.05,y:190.85,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.3966,x:-4.9,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:8.789,x:-20.35,y:189,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:10.0146,x:-0.35,y:-79.7}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.8223,x:-68,y:54.9,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-72.3893,x:-33.35,y:128.3,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-104.5119,x:-37.2,y:136}},{t:this.instance,p:{regX:35.6,rotation:-82.2278,y:-23.15,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:0.8472,x:-16.7,y:92.75,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.9115,x:45.35,y:-25.85,regX:-33.1,regY:-0.3}},{t:this.instance_13,p:{rotation:77.8588,x:37.4,y:49.05,regY:-0.9,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.3553,x:54.05,y:127.85,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:89.8555,x:47.65,y:136.8,regY:3}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9976,scaleY:0.9976,rotation:-13.6849,x:6.1,y:96.65,regY:2.2}},{t:this.instance_9,p:{rotation:-8.0425,x:24.95,y:190.7,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.4072,x:-4.8,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.4428,x:-22.25,y:188.9,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:9.829,x:-0.5,y:-79.7}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.1232,x:-67.65,y:54.8,regX:40.4,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.702,x:-32.55,y:128.2,regY:-8.5}},{t:this.instance_1,p:{regX:6.5,scaleX:0.9981,scaleY:0.9981,rotation:-104.8106,x:-36.35,y:135.9}},{t:this.instance,p:{regX:35.6,rotation:-82.5071,y:-23.1,x:-57,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:2.1416,x:-16.5,y:92.8,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:97.9375,x:45.25,y:-25.85,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:77.8131,x:36.1,y:48.95,regY:-0.9,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.317,x:52.7,y:127.6,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:89.8292,x:46.4,y:136.65,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-14.2903,x:6.1,y:96.75,regY:2.2}},{t:this.instance_9,p:{rotation:-10.3236,x:25.85,y:190.5,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.4179,x:-4.8,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:12.0957,x:-24.1,y:188.8,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:9.6435,x:-0.45,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.4225,x:-67.15,y:54.8,regX:40.4,regY:0}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-73.0137,x:-31.65,y:128.05,regY:-8.4}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9982,rotation:-105.1102,x:-35.5,y:135.85}},{t:this.instance,p:{regX:35.6,rotation:-82.788,y:-23.1,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:3.4344,x:-16.1,y:92.9,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.9636,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:77.7692,x:34.6,y:48.85,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.2802,x:51.45,y:127.4,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:89.8021,x:45.05,y:136.4,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-14.8956,x:6,y:96.55,regY:2.1}},{t:this.instance_9,p:{rotation:-12.6033,x:26.65,y:190.35,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.4285,x:-4.85,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:13.7485,x:-25.95,y:188.75,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:9.4587,x:-0.4,y:-79.7}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.7237,x:-66.8,y:55,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-73.3259,x:-31,y:127.9,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-105.41,x:-34.7,y:135.75}},{t:this.instance,p:{regX:35.6,rotation:-83.0684,y:-23.2,x:-57,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:2.2029,x:-16.45,y:92.8,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.9986,x:45.25,y:-25.7,regX:-33,regY:-0.2}},{t:this.instance_13,p:{rotation:77.8336,x:35.85,y:49,regY:-0.8,regX:-40.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.3437,x:52.65,y:127.6,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:89.8669,x:46.25,y:136.65,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-14.3219,x:6.1,y:96.7,regY:2.2}},{t:this.instance_9,p:{rotation:-10.4259,x:25.85,y:190.45,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.4154,x:-4.8,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:12.1737,x:-24.2,y:188.9,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:9.6435,x:-0.45,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.4378,x:-67.25,y:54.9,regX:40.4,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-73.0403,x:-31.6,y:128.05,regY:-8.4}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-105.1242,x:-35.45,y:135.85}},{t:this.instance,p:{regX:35.6,rotation:-82.8108,y:-23.15,x:-57.05,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:0.9716,x:-16.7,y:92.8,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.0323,x:45.25,y:-25.85,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:77.899,x:37.1,y:49.1,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.409,x:53.85,y:127.8,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:89.9326,x:47.45,y:136.8,regY:3}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9976,scaleY:0.9976,rotation:-13.7499,x:6.1,y:96.65,regY:2.2}},{t:this.instance_9,p:{rotation:-8.2487,x:25.05,y:190.8,regY:-53.4}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.4019,x:-4.8,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.5978,x:-22.4,y:189.05,regY:-54.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:9.8298,x:-0.5,y:-79.7}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.1526,x:-67.55,y:54.95,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.7552,x:-32.45,y:128.15,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-104.8378,x:-36.3,y:135.9}},{t:this.instance,p:{regX:35.6,rotation:-82.554,y:-23.1,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-0.2558,x:-17.05,y:92.75,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.0652,x:45.25,y:-25.8,regX:-33,regY:-0.2}},{t:this.instance_13,p:{rotation:77.9636,x:38.5,y:49.25,regY:-0.9,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.4744,x:55,y:127.9,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:89.9974,x:48.6,y:136.9,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-13.1758,x:6.35,y:96.65,regY:2.2}},{t:this.instance_9,p:{rotation:-6.0711,x:24.2,y:190.9,regY:-53.4}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.3897,x:-4.9,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:9.0223,x:-20.65,y:189,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:10.0154,x:-0.35,y:-79.7}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.8658,x:-67.85,y:54.9,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.4699,x:-33.2,y:128.3,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-104.5523,x:-36.95,y:136.05}},{t:this.instance,p:{regX:35.6,rotation:-82.296,y:-23.1,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-1.4886,x:-17.35,y:92.65,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.0983,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.0289,x:39.8,y:49.3,regY:-0.9,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.5392,x:56.15,y:128.05,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.0578,x:49.8,y:137.05,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-12.6032,x:6.55,y:96.6,regY:2.2}},{t:this.instance_9,p:{rotation:-3.8936,x:23.45,y:190.95,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.3761,x:-4.9,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:7.4457,x:-18.9,y:188.95,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.1,scaleX:0.9989,scaleY:0.9989,rotation:10.2012,x:-0.5,y:-79.85}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.5801,x:-68.35,y:54.65,regX:40.4,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-72.1824,x:-33.95,y:128.35,regY:-8.6}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-104.2659,x:-37.7,y:136.15}},{t:this.instance,p:{regX:35.6,rotation:-82.0397,y:-23.15,x:-57.05,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-2.7194,x:-17.6,y:92.6,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:94.1317,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.0934,x:41.1,y:49.45,regY:-0.9,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.6046,x:57.45,y:128.1,regX:-6.1,regY:8.1}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.1226,x:50.9,y:137.15,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-12.0299,x:6.65,y:96.55,regY:2.2}},{t:this.instance_9,p:{rotation:-1.7163,x:22.6,y:191.1,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.363,x:-4.85,y:-58.35}},{t:this.instance_6,p:{scaleX:0.998,scaleY:0.998,rotation:5.8694,x:-17.1,y:188.9,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:10.3873,x:-0.5,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.2944,x:-68.55,y:54.8,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.3,scaleX:0.9982,scaleY:0.9982,rotation:-71.8977,x:-34.55,y:128.4,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-103.9808,x:-38.55,y:136.25}},{t:this.instance,p:{regX:35.7,rotation:-81.7823,y:-23.2,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-3.9524,x:-17.9,y:92.45,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.1665,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.1597,x:42.35,y:49.45,regY:-0.9,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.6688,x:58.6,y:128.15,regX:-6.1,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.1874,x:52.05,y:137.25,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-11.4571,x:6.75,y:96.55,regY:2.2}},{t:this.instance_9,p:{rotation:0.4566,x:21.75,y:191.35,regY:-53.4}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.7,scaleX:0.9989,scaleY:0.9989,rotation:9.3497,x:-4.9,y:-58.35}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:4.2942,x:-15.3,y:188.8,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.1,scaleX:0.9989,scaleY:0.9989,rotation:10.5734,x:-0.4,y:-79.85}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.0083,x:-68.95,y:54.7,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.613,x:-35.3,y:128.65,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-103.6953,x:-39.25,y:136.4}},{t:this.instance,p:{regX:35.6,rotation:-81.5249,y:-23.1,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.9979,scaleY:0.9979,rotation:-5.1838,x:-18.2,y:92.45,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.1986,x:45.25,y:-25.8,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.224,x:43.6,y:49.5,regY:-0.9,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.7336,x:59.7,y:128.3,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.254,x:53.25,y:137.3,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-10.8845,x:6.9,y:96.55,regY:2.2}},{t:this.instance_9,p:{rotation:2.6346,x:20.95,y:191.45,regY:-53.4}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.3363,x:-4.95,y:-58.25}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:2.7177,x:-13.45,y:188.6,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:10.7593,x:-0.5,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.7217,x:-69.4,y:54.55,regX:40.4,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.3266,x:-36.05,y:128.8,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-103.4095,x:-40,y:136.5}},{t:this.instance,p:{regX:35.6,rotation:-81.2678,y:-23.1,x:-57.05,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-6.4156,x:-18.45,y:92.35,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:91.2331,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.2901,x:44.8,y:49.6,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.7999,x:60.95,y:128.3,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.317,x:54.35,y:137.3,regY:3.1}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-10.3111,x:7,y:96.5,regY:2.2}},{t:this.instance_9,p:{rotation:4.8113,x:20.15,y:191.4,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.3232,x:-4.85,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:1.1434,x:-11.7,y:188.45,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:10.9447,x:-0.55,y:-79.8}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.4373,x:-69.7,y:54.6,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.0399,x:-36.7,y:128.95,regY:-8.4}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-103.1234,x:-40.8,y:136.55}},{t:this.instance,p:{regX:35.6,rotation:-81.0099,y:-23.15,x:-57.05,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-7.6489,x:-18.8,y:92.25,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:90.268,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.3547,x:46.15,y:49.7,regY:-0.8,regX:-40.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.8633,x:62.1,y:128.3,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.3827,x:55.7,y:137.3,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-9.7379,x:7.15,y:96.5,regY:2.2}},{t:this.instance_9,p:{rotation:6.9886,x:19.25,y:191.65,regY:-53.4}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.3105,x:-4.9,y:-58.2}},{t:this.instance_6,p:{scaleX:0.998,scaleY:0.998,rotation:-0.4284,x:-9.95,y:188.2,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.1,scaleX:0.9989,scaleY:0.9989,rotation:11.1312,x:-0.4,y:-79.85}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.1502,x:-70,y:54.5,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-70.7536,x:-37.4,y:129,regY:-8.4}},{t:this.instance_1,p:{regX:6.5,scaleX:0.9981,scaleY:0.9981,rotation:-102.8378,x:-41.55,y:136.45}},{t:this.instance,p:{regX:35.6,rotation:-80.7538,y:-23.15,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-8.8802,x:-19.1,y:92.15,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.3047,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.4189,x:47.35,y:49.65,regY:-0.8,regX:-40.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.9284,x:63.3,y:128.3,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.4475,x:56.85,y:137.3,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-9.1668,x:7.25,y:96.4,regY:2.2}},{t:this.instance_9,p:{rotation:9.1664,x:18.45,y:191.6,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.2983,x:-4.9,y:-58.2}},{t:this.instance_6,p:{scaleX:0.998,scaleY:0.998,rotation:-2.004,x:-8.2,y:187.85,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:11.3177,x:-0.6,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.8668,x:-70.4,y:54.5,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.4682,x:-38.2,y:129.05,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-102.5522,x:-42.35,y:136.65}},{t:this.instance,p:{regX:35.6,rotation:-80.4962,y:-23.1,x:-57.1,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-10.1122,x:-19.5,y:92.15,regX:1.8}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:88.3394,x:45.25,y:-25.85,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.4835,x:48.65,y:49.55,regY:-0.8,regX:-40.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.9946,x:64.55,y:128.3,regX:-6.1,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.5123,x:58,y:137.25,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-8.5919,x:7.45,y:96.35,regY:2.2}},{t:this.instance_9,p:{rotation:11.3433,x:17.65,y:191.7,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.284,x:-4.9,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-3.5793,x:-6.45,y:187.5,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:11.5041,x:-0.5,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.5791,x:-70.7,y:54.4,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.3,scaleX:0.9982,scaleY:0.9982,rotation:-70.1818,x:-38.9,y:129,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-102.2659,x:-43,y:136.75}},{t:this.instance,p:{regX:35.7,rotation:-80.2378,y:-23.15,x:-57.05,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-11.3445,x:-19.6,y:92,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:87.3719,x:45.3,y:-25.85,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.5496,x:49.95,y:49.4,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:110.0581,x:65.65,y:128.3,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.5771,x:59.15,y:137.15,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-8.0198,x:7.5,y:96.35,regY:2.2}},{t:this.instance_9,p:{rotation:13.521,x:16.85,y:191.75,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.2705,x:-4.95,y:-58.15}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-5.1557,x:-4.65,y:187.2,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:11.6901,x:-0.45,y:-79.8}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.294,x:-71.05,y:54.4,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-69.8972,x:-39.55,y:129.35,regY:-8.4}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-101.9801,x:-43.85,y:136.85}},{t:this.instance,p:{regX:35.6,rotation:-79.9817,y:-23.1,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-12.5751,x:-19.95,y:91.95,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:86.4063,x:45.3,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.6136,x:51.2,y:49.25,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:110.1243,x:66.85,y:128.25,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.642,x:60.35,y:137.1,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-7.4457,x:7.7,y:96.35,regY:2.2}},{t:this.instance_9,p:{rotation:15.6986,x:16.1,y:191.85,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.2566,x:-4.95,y:-58.15}},{t:this.instance_6,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7314,x:-3,y:186.8,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:11.8752,x:-0.55,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.0076,x:-71.45,y:54.2,regX:40.4,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-69.6107,x:-40.3,y:129.4,regY:-8.4}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-101.6939,x:-44.55,y:136.9}},{t:this.instance,p:{regX:35.6,rotation:-79.7245,y:-23.1,x:-57.1,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.998,scaleY:0.998,rotation:-13.8078,x:-20.25,y:91.75,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:85.4396,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.6791,x:52.5,y:49.2,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:110.1894,x:68,y:128.1,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.7076,x:61.55,y:136.95,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8734,x:7.75,y:96.3,regY:2.2}},{t:this.instance_9,p:{rotation:17.8754,x:15.25,y:191.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.2449,x:-4.95,y:-58.15}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-8.3072,x:-1.2,y:186.4,regY:-54.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:12.0613,x:-0.6,y:-79.75}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.7224,x:-71.75,y:54.2,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-69.3256,x:-41.1,y:129.45,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-101.4087,x:-45.3,y:137}},{t:this.instance,p:{regX:35.6,rotation:-79.4681,y:-23.15,x:-57.05,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,scaleX:0.998,scaleY:0.998,rotation:-15.0388,x:-20.5,y:91.65,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:84.4734,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.7433,x:53.85,y:49.1,regY:-0.9,regX:-40.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:110.254,x:69.2,y:128,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.7733,x:62.7,y:136.9,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.3009,x:7.9,y:96.25,regY:2.2}},{t:this.instance_9,p:{rotation:20.0535,x:14.4,y:191.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.2318,x:-4.95,y:-58.15}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-9.8822,x:0.5,y:185.7,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:12.2475,x:-0.45,y:-79.8}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.4361,x:-72.15,y:54.15,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-69.0381,x:-41.8,y:129.5,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-101.1229,x:-46.2,y:137.05}},{t:this.instance,p:{regX:35.6,rotation:-79.2087,y:-23.05,x:-57.1,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-16.2716,x:-20.9,y:91.65,regX:1.8}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:83.5074,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.8091,x:55.15,y:49.05,regY:-0.9,regX:-40.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:110.3191,x:70.4,y:127.85,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.8373,x:63.85,y:136.75,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-5.7272,x:8.05,y:96.25,regY:2.2}},{t:this.instance_9,p:{rotation:22.2304,x:13.6,y:191.85,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.2193,x:-5,y:-58.15}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-11.4575,x:2.3,y:185.2,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:12.434,x:-0.65,y:-79.8}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.1506,x:-72.45,y:54.1,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-68.7537,x:-42.55,y:129.65,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-100.8355,x:-46.9,y:137.15}},{t:this.instance,p:{regX:35.7,rotation:-78.9523,y:-23.15,x:-57.05,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.9979,scaleY:0.9979,rotation:-17.5043,x:-21.25,y:91.6,regX:1.8}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:82.5413,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.8737,x:56.35,y:48.65,regY:-0.9,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:110.3845,x:71.6,y:127.7,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.903,x:64.9,y:136.6,regY:3.1}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-5.1549,x:8.15,y:96.2,regY:2.2}},{t:this.instance_9,p:{rotation:24.4075,x:12.75,y:191.9,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.2058,x:-5,y:-58.15}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-13.0343,x:4,y:184.55,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:12.6187,x:-0.55,y:-79.8}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.8638,x:-72.8,y:53.9,regX:40.4,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-68.4674,x:-43.25,y:129.65,regY:-8.5}},{t:this.instance_1,p:{regX:6.5,scaleX:0.9981,scaleY:0.9981,rotation:-100.5503,x:-47.7,y:137}},{t:this.instance,p:{regX:35.6,rotation:-78.6959,y:-23,x:-57.1,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-18.7353,x:-21.3,y:91.45,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:81.575,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:78.9386,x:57.5,y:48.55,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:110.4493,x:72.75,y:127.6,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:90.9678,x:66.25,y:136.45,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-4.5813,x:8.3,y:96.15,regY:2.2}},{t:this.instance_9,p:{rotation:26.5866,x:11.85,y:191.95,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.1918,x:-4.95,y:-58.15}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-14.6097,x:5.65,y:183.95,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:12.8052,x:-0.55,y:-79.8}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.5787,x:-73.15,y:53.95,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-68.1812,x:-43.95,y:129.75,regY:-8.5}},{t:this.instance_1,p:{regX:6.5,scaleX:0.9981,scaleY:0.9981,rotation:-100.2654,x:-48.4,y:137.05}},{t:this.instance,p:{regX:35.6,rotation:-78.4376,y:-23.05,x:-57.15,scaleX:0.9983,scaleY:0.9983}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-19.9669,x:-21.6,y:91.4,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:80.6078,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:79.0028,x:58.8,y:48.3,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:110.5136,x:73.95,y:127.45,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:91.0335,x:67.4,y:136.25,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-4.0084,x:8.45,y:96.1,regY:2.2}},{t:this.instance_9,p:{rotation:28.7622,x:11.1,y:191.8,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.1793,x:-5,y:-58.15}},{t:this.instance_6,p:{scaleX:0.998,scaleY:0.998,rotation:-16.1851,x:7.35,y:183.2,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,regY:52.2,scaleX:0.9989,scaleY:0.9989,rotation:12.9903,x:-0.5,y:-79.8}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.2927,x:-73.55,y:53.75,regX:40.4,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-67.8959,x:-44.7,y:129.8,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-99.9797,x:-49.15,y:137.25}},{t:this.instance,p:{regX:35.7,rotation:-78.1812,y:-23.15,x:-57.1,scaleX:0.9984,scaleY:0.9984}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.998,scaleY:0.998,rotation:-21.198,x:-21.85,y:91.25,regX:1.9}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:79.6423,x:45.25,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{rotation:79.0689,x:60,y:48.15,regY:-0.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:110.5782,x:75.05,y:127.15,regX:-6,regY:8.2}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:91.0974,x:68.5,y:136,regY:3}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.4348,x:8.6,y:96.1,regY:2.2}},{t:this.instance_9,p:{rotation:30.939,x:10.15,y:191.95,regY:-53.5}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regY:8.8,scaleX:0.9989,scaleY:0.9989,rotation:9.1678,x:-5,y:-58.15}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:-17.7609,x:9.1,y:182.4,regY:-54.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,regY:52.1,scaleX:0.9989,scaleY:0.9989,rotation:13.1771,x:-0.55,y:-79.95}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.0082,x:-73.85,y:53.75,regX:40.3,regY:-0.1}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-67.61,x:-45.4,y:129.85,regY:-8.5}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9981,scaleY:0.9981,rotation:-99.6933,x:-50,y:137.25}},{t:this.instance,p:{regX:35.6,rotation:-77.9234,y:-23.05,x:-57.1,scaleX:0.9984,scaleY:0.9984}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93.2,-216,199.60000000000002,521.7);


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

	// Armature_1
	this.instance = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance.setTransform(-57.3,-23.45,0.9984,0.9984,-96.6617,0,0,36.3,0.1);

	this.instance_1 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1.setTransform(6.7,126.15,0.9981,0.9981,-144.8164,0,0,6.2,-1.4);

	this.instance_2 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2.setTransform(4.55,117.55,0.9982,0.9982,-112.3425,0,0,5.2,-8.7);

	this.instance_3 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_3.setTransform(-46.55,55.25,0.9982,0.9982,-130.1153,0,0,39.8,1);

	this.instance_4 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_4.setTransform(7,-76,0.9989,0.9989,16.1549,0,0,0.9,52.9);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_6.setTransform(-32.95,188,0.9982,0.9982,12.7246,0,0,3,-54.2);

	this.instance_7 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_7.setTransform(-4.9,-58.15,0.9989,0.9989,31.9146,0,0,-0.9,8.7);

	this.instance_8 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_8.setTransform(-5.55,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_9.setTransform(35.75,186.9,0.9977,0.9977,-6.9041,0,0,3.8,-53.9);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(14.2,93.7,0.9977,0.9977,-15.3998,0,0,-0.8,2);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(38.45,134.4,0.9982,0.9982,41.1058,0,0,-4.8,3.2);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(37.75,123.2,0.9982,0.9982,67.4298,0,0,-6.2,8);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(19.2,45.5,0.9983,0.9983,76.6146,0,0,-39.9,-1.1);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(45.2,-26.3,0.9983,0.9983,110.7028,0,0,-33.5,-0.3);

	this.instance_15 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_15.setTransform(-20.35,91.35,0.9983,0.9983,5.2506,0,0,2.2,-46.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2506,x:-20.35,y:91.35,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:110.7028,x:45.2,y:-26.3,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:76.6146,x:19.2,y:45.5,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9982,scaleY:0.9982,rotation:67.4298,x:37.75,y:123.2,regX:-6.2}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:41.1058,x:38.45,y:134.4,regY:3.2}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3998,y:93.7,x:14.2,regX:-0.8}},{t:this.instance_9,p:{rotation:-6.9041,x:35.75,y:186.9,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9989,scaleY:0.9989,rotation:31.9146,x:-4.9,y:-58.15,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.7246,x:-32.95,y:188,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,rotation:16.1549,x:7,y:-76,regY:52.9,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-130.1153,x:-46.55,y:55.25,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-112.3425,x:4.55,y:117.55}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-144.8164,x:6.7,y:126.15,regY:-1.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-96.6617,x:-57.3,y:-23.45,regX:36.3}}]}).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:3.7188,x:-20.4,y:91.35,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:109.8379,x:45.15,y:-26.3,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:76.191,x:20.2,y:45.75,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:67.0077,x:39.3,y:123.45,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:40.6813,x:40.25,y:134.65,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-13.8547,y:93.85,x:14.2,regX:-0.8}},{t:this.instance_9,p:{rotation:-5.3577,x:33.25,y:187.45,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:30.6848,x:-5.05,y:-58.15,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:11.7181,x:-30.35,y:188.3,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:15.8301,x:6.55,y:-76.25,regY:52.9,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-129.5403,x:-47.45,y:55.3,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.1,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-111.7676,x:3,y:118.15}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-144.2418,x:5.15,y:126.8,regY:-1.4}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-96.0058,x:-57.2,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:2.1865,x:-20.5,y:91.25,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:108.9742,x:45.15,y:-26.3,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:75.7666,x:21.3,y:46.2,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:66.5816,x:41,y:123.65,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:40.257,x:42,y:134.85,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-12.3099,y:93.75,x:14.2,regX:-0.8}},{t:this.instance_9,p:{rotation:-3.814,x:30.8,y:187.95,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:29.4549,x:-5,y:-58.2,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:10.709,x:-27.9,y:188.45,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:15.5058,x:6.15,y:-76.65,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-128.9658,x:-48.25,y:55.35,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-111.1926,x:1.4,y:118.7}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-143.6675,x:3.4,y:127.5,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-95.3502,x:-57.3,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:0.656,x:-20.55,y:91.25,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:108.1095,x:45.15,y:-26.35,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:75.3416,x:22.35,y:46.5,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:66.1572,x:42.6,y:123.9,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:39.8329,x:43.75,y:135.05,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-10.7644,y:93.75,x:14.25,regX:-0.8}},{t:this.instance_9,p:{rotation:-2.2685,x:28.3,y:188.3,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:28.2259,x:-5,y:-58.1,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:9.7025,x:-25.4,y:188.6,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:15.1807,x:5.75,y:-76.8,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-128.3906,x:-49.1,y:55.55,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.1,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-110.6176,x:-0.1,y:119.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-143.0921,x:1.75,y:128.1,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-94.6933,x:-57.2,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-0.8724,x:-20.65,y:91.15,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:107.2445,x:45.15,y:-26.35,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.9165,x:23.5,y:46.8,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9981,scaleY:0.9981,rotation:65.7322,x:44.4,y:124.05,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:39.4074,x:45.5,y:135.2,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-9.2197,y:93.75,x:14.35,regX:-0.8}},{t:this.instance_9,p:{rotation:-0.7239,x:25.8,y:188.65,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:26.9945,x:-5.05,y:-58.1,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:8.6952,x:-22.9,y:188.6,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:14.8563,x:5.4,y:-77,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-127.8148,x:-50.05,y:55.65,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9982,rotation:-110.0427,x:-1.7,y:119.85}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-142.5174,x:0.15,y:128.65,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-94.0371,x:-57.25,y:-23.45,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-2.4031,x:-20.8,y:91.05,regY:-46.7,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:106.3801,x:45.25,y:-26.4,regY:-0.4}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:74.4918,x:24.65,y:47.15,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:65.3081,x:45.9,y:124.3,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:38.9835,x:47.25,y:135.4,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-7.6745,y:93.75,x:14.4,regX:-0.8}},{t:this.instance_9,p:{rotation:0.8167,x:23.25,y:188.9,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:25.7645,x:-5.05,y:-58.15,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:7.6874,x:-20.4,y:188.7,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:14.5319,x:4.9,y:-77.2,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-127.2414,x:-50.95,y:55.65,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-109.4679,x:-3.3,y:120.45}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-141.9423,x:-1.5,y:129.3,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-93.3808,x:-57.3,y:-23.4,regX:36.2}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-3.9355,x:-20.9,y:91.15,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:105.5163,x:45.3,y:-26.35,regY:-0.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.0665,x:25.7,y:47.45,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:64.8848,x:47.6,y:124.4,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:38.5586,x:49.05,y:135.55,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-6.1296,y:93.7,x:14.35,regX:-0.9}},{t:this.instance_9,p:{rotation:2.3623,x:20.75,y:189,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:24.5345,x:-5,y:-58.15,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:6.68,x:-17.9,y:188.5,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:14.2071,x:4.55,y:-77.4,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-126.6653,x:-51.9,y:55.75,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.1,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-108.892,x:-4.8,y:121.05}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-141.3669,x:-3.2,y:129.8,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-92.7239,x:-57.25,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-5.4665,x:-21,y:91.05,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:104.6504,x:45.15,y:-26.35,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.6427,x:26.85,y:47.9,regX:-39.8,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:64.4593,x:49.3,y:124.45,regX:-6.3}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:38.1338,x:50.8,y:135.6,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-4.5838,y:93.65,x:14.5,regX:-0.8}},{t:this.instance_9,p:{rotation:3.9079,x:18.25,y:189.15,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9988,scaleY:0.9988,rotation:23.304,x:-4.9,y:-58.05,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6722,x:-15.35,y:188.35,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:13.8823,x:4.15,y:-77.65,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-126.0911,x:-52.85,y:55.85,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-108.3164,x:-6.4,y:121.45}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-140.7924,x:-4.85,y:130.35,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-92.069,x:-57.25,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.9979,x:-21.05,y:91.05,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:103.7864,x:45.1,y:-26.45,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.2179,x:28,y:48,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9982,scaleY:0.9982,rotation:64.0339,x:51.05,y:124.6,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:37.7089,x:52.6,y:135.75,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-3.0389,y:93.65,x:14.55,regX:-0.8}},{t:this.instance_9,p:{rotation:5.4537,x:15.6,y:189.15,regX:3.7,scaleX:0.9976,scaleY:0.9976,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:22.0755,x:-5,y:-58.15,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6642,x:-12.85,y:188.25,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,rotation:13.559,x:3.85,y:-77.85,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-125.5162,x:-53.8,y:55.85,regX:39.9,regY:0.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.7,scaleX:0.9981,scaleY:0.9981,rotation:-107.7433,x:-7.85,y:121.95}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-140.2173,x:-6.35,y:130.85,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-91.4128,x:-57.25,y:-23.55,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.5305,x:-21.15,y:91,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:102.9214,x:45.2,y:-26.45,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:72.794,x:29.1,y:48.35,regX:-39.8,regY:-1.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9981,scaleY:0.9981,rotation:63.6108,x:52.75,y:124.6,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:37.2853,x:54.35,y:135.75,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-1.4952,y:93.6,x:14.65,regX:-0.8}},{t:this.instance_9,p:{rotation:6.9982,x:13.2,y:189.2,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:20.845,x:-4.95,y:-58.2,regY:8.6}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:3.6577,x:-10.35,y:187.9,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,rotation:13.2342,x:3.5,y:-77.95,regY:52.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{rotation:-124.941,x:-54.6,y:55.9,regX:39.8,regY:1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regX:5.1,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-107.1676,x:-9.5,y:122.6}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-139.6422,x:-7.95,y:131.4,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-90.7567,x:-57.3,y:-23.55,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.0616,x:-21.35,y:90.9,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:102.0576,x:45.15,y:-26.4,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.3677,x:30.2,y:48.45,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9981,scaleY:0.9981,rotation:63.1858,x:54.4,y:124.7,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:36.8601,x:56.15,y:135.85,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:0.0456,y:93.6,x:14.65,regX:-0.8}},{t:this.instance_9,p:{rotation:8.5426,x:10.8,y:189,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:19.6156,x:-5,y:-58.05,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:2.6489,x:-7.85,y:187.5,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:12.9096,x:2.95,y:-78.2,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-124.3657,x:-55.5,y:55.9,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.7,scaleX:0.9981,scaleY:0.9981,rotation:-106.5921,x:-11,y:122.95}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-139.0681,x:-9.65,y:131.85,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-90.0998,x:-57.25,y:-23.55,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.5935,x:-21.4,y:90.95,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:101.1928,x:45.2,y:-26.4,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.9428,x:31.3,y:48.65,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:62.7616,x:56,y:124.75,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:36.4356,x:57.95,y:135.8,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:1.5908,y:93.6,x:14.75,regX:-0.8}},{t:this.instance_9,p:{rotation:10.0877,x:8.25,y:188.9,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:18.3854,x:-5,y:-58.05,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:1.6417,x:-5.4,y:187.05,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:12.5856,x:2.5,y:-78.35,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-123.7904,x:-56.4,y:55.95,regX:39.8,regY:1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9982,scaleY:0.9982,rotation:-106.0167,x:-12.7,y:123.35}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-138.4921,x:-11.35,y:132.3,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-89.4482,x:-57.25,y:-23.55,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-13.1251,x:-21.5,y:90.85,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.3283,x:45.15,y:-26.4,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.5191,x:32.45,y:48.95,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:62.3365,x:57.75,y:124.75,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:36.0113,x:59.65,y:135.85,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:3.1354,y:93.5,x:14.75,regX:-0.8}},{t:this.instance_9,p:{rotation:11.6332,x:5.75,y:188.6,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:17.1543,x:-5,y:-58.2,regY:8.6}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.635,x:-2.95,y:186.6,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,rotation:12.2602,x:2.2,y:-78.35,regY:52.9,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-123.2159,x:-57.35,y:55.95,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.1,regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-105.4427,x:-14.05,y:123.9}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-137.9177,x:-13.05,y:132.75,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-88.7922,x:-57.3,y:-23.55,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-14.6572,x:-21.6,y:90.85,regY:-46.6,regX:2.1}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:99.464,x:45.1,y:-26.4,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.0953,x:33.6,y:49.05,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:61.9133,x:59.4,y:124.75,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:35.5866,x:61.45,y:135.75,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:4.6805,y:93.5,x:14.9,regX:-0.8}},{t:this.instance_9,p:{rotation:13.1786,x:3.2,y:188.25,regX:3.8,scaleX:0.9976,scaleY:0.9976,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9988,scaleY:0.9988,rotation:15.9233,x:-4.9,y:-58.1,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:-0.3696,x:-0.5,y:186.05,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,rotation:11.9372,x:1.75,y:-78.55,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-122.6408,x:-58.35,y:55.95,regX:39.8,regY:0.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.1,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-104.8667,x:-15.8,y:124.35}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-137.3428,x:-14.75,y:133.2,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-88.136,x:-57.25,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-16.1879,x:-21.8,y:90.8,regY:-46.6,regX:2.1}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.5985,x:45.1,y:-26.4,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:70.6702,x:34.85,y:49.2,regX:-39.9,regY:-1.2}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:61.4873,x:61.2,y:124.7,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:35.1617,x:63.25,y:135.7,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:6.2257,y:93.45,x:14.8,regX:-0.9}},{t:this.instance_9,p:{rotation:14.7228,x:0.75,y:187.9,regX:3.8,scaleX:0.9976,scaleY:0.9976,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:14.6935,x:-5,y:-58.1,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:-1.377,x:1.85,y:185.35,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,rotation:11.6108,x:1.35,y:-78.7,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-122.0656,x:-59.2,y:55.95,regX:39.8,regY:1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regX:5.2,regY:-8.7,scaleX:0.9981,scaleY:0.9981,rotation:-104.2918,x:-17.35,y:124.6}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-136.7669,x:-16.45,y:133.6,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-87.4804,x:-57.25,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-17.7201,x:-21.75,y:90.8,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.7349,x:45.15,y:-26.45,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:70.2447,x:35.95,y:49.35,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:61.0636,x:62.85,y:124.65,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:34.7372,x:65.05,y:135.65,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:7.7708,y:93.5,x:14.9,regX:-0.8}},{t:this.instance_9,p:{rotation:16.2685,x:-1.7,y:187.45,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9988,scaleY:0.9988,rotation:13.4645,x:-4.85,y:-58,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:-2.384,x:4.3,y:184.65,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,rotation:11.2874,x:0.85,y:-78.9,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-121.4906,x:-60.1,y:55.9,regX:39.9,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9982,scaleY:0.9982,rotation:-103.7174,x:-19.05,y:125.05}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-136.1931,x:-18.1,y:134,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.8245,x:-57.3,y:-23.55,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-19.2512,x:-21.95,y:90.7,regY:-46.6,regX:2.1}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.8696,x:45.1,y:-26.45,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:69.8188,x:37.1,y:49.5,regX:-39.9,regY:-1.2}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:60.6386,x:64.5,y:124.55,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:34.3127,x:66.8,y:135.55,regY:3.2}},{t:this.instance_10,p:{regY:2,scaleX:0.9976,scaleY:0.9976,rotation:9.3172,y:93.3,x:14.9,regX:-0.9}},{t:this.instance_9,p:{rotation:17.8139,x:-4.2,y:186.95,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:12.2337,x:-5.05,y:-58.05,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:-3.3909,x:6.7,y:183.9,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:10.9622,x:0.3,y:-79,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-120.916,x:-61.05,y:55.85,regX:39.9,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-103.1421,x:-20.65,y:125.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-135.6176,x:-19.75,y:134.25,regY:-1.4}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.1683,x:-57.25,y:-23.45,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-20.7829,x:-22.05,y:90.55,regY:-46.7,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.0058,x:45.1,y:-26.45,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:69.3957,x:38.25,y:49.55,regX:-39.9,regY:-1.2}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9982,scaleY:0.9982,rotation:60.2142,x:66.25,y:124.5,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:33.8883,x:68.55,y:135.45,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:10.8607,y:93.4,x:15.05,regX:-0.8}},{t:this.instance_9,p:{rotation:19.3589,x:-6.65,y:186.3,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:11.004,x:-4.95,y:-58.1,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:-4.3997,x:9.15,y:182.95,regY:-54.3,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:10.6377,x:-0.15,y:-79.1,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-120.3411,x:-61.9,y:55.8,regX:39.9,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.1,regY:-8.7,scaleX:0.9981,scaleY:0.9981,rotation:-102.5662,x:-22.15,y:125.85}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-135.0427,x:-21.55,y:134.75,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-85.5122,x:-57.25,y:-23.6,regX:36.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-22.3141,x:-22.1,y:90.45,regY:-46.7,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.1408,x:45.1,y:-26.45,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:68.9702,x:39.25,y:49.7,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:59.7911,x:67.95,y:124.35,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:33.4636,x:70.4,y:135.3,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:12.4062,y:93.4,x:15.15,regX:-0.8}},{t:this.instance_9,p:{rotation:20.9049,x:-9.1,y:185.7,regX:3.8,scaleX:0.9976,scaleY:0.9976,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:9.7739,x:-5,y:-58.1,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:-5.4062,x:11.45,y:182.1,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:10.3138,x:-0.55,y:-79.2,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-119.7653,x:-62.75,y:55.75,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-101.9917,x:-23.9,y:126}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-134.4685,x:-23.15,y:135.1,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-84.8548,x:-57.2,y:-23.55,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-23.8461,x:-22.2,y:90.45,regY:-46.7,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.277,x:45.1,y:-26.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:68.5453,x:40.45,y:49.8,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:59.3651,x:69.6,y:124.25,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:33.0385,x:72.1,y:135.2,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:13.9514,y:93.3,x:15.25,regX:-0.8}},{t:this.instance_9,p:{rotation:22.4493,x:-11.55,y:185.1,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:8.5442,x:-5,y:-58.05,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.4147,x:13.85,y:181.15,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:9.9891,x:-1.05,y:-79.25,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-119.1916,x:-63.75,y:55.7,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.7,scaleX:0.9981,scaleY:0.9981,rotation:-101.4175,x:-25.4,y:126.3}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-133.8924,x:-24.95,y:135.45,regY:-1.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-84.1993,x:-57.3,y:-23.55,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-22.3957,x:-22.05,y:90.55,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.0925,x:45.1,y:-26.4,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:68.9583,x:39.4,y:49.7,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:59.7777,x:68,y:124.35,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:33.4491,x:70.5,y:135.35,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:12.4789,y:93.35,x:15.1,regX:-0.8}},{t:this.instance_9,p:{rotation:20.9837,x:-9.2,y:185.7,regX:3.8,scaleX:0.9976,scaleY:0.9976,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:9.7198,x:-5,y:-58.05,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:-5.4625,x:11.55,y:182.05,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,rotation:10.2915,x:-0.45,y:-79.2,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-119.7348,x:-62.85,y:55.8,regX:39.8,regY:0.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-101.9605,x:-23.95,y:126.05}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-134.4462,x:-23.25,y:135.1,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-84.831,x:-57.25,y:-23.55,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-20.9459,x:-22.05,y:90.55,regY:-46.7,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.9073,x:45.15,y:-26.45,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:69.3696,x:38.35,y:49.65,regX:-39.9,regY:-1.2}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:60.1906,x:66.35,y:124.5,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:33.8604,x:68.7,y:135.45,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:11.009,y:93.4,x:15.1,regX:-0.8}},{t:this.instance_9,p:{rotation:19.5161,x:-6.9,y:186.25,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:10.8979,x:-5.05,y:-58.05,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:-4.5122,x:9.35,y:182.85,regY:-54.3,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:10.5941,x:-0.2,y:-79.15,regY:52.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{rotation:-120.2786,x:-62.05,y:55.8,regX:39.9,regY:0.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-102.5054,x:-22.45,y:125.8}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-134.9994,x:-21.7,y:134.75,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-85.4631,x:-57.3,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-19.4947,x:-21.95,y:90.55,regY:-46.7,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.7223,x:45.15,y:-26.4,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:69.7806,x:37.35,y:49.5,regX:-39.9,regY:-1.2}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:60.6025,x:64.8,y:124.55,regX:-6.2}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,rotation:34.271,x:66.9,y:135.55,regY:3.3}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:9.5367,y:93.4,x:15,regX:-0.8}},{t:this.instance_9,p:{rotation:18.0489,x:-4.6,y:186.8,regX:3.8,scaleX:0.9976,scaleY:0.9976,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:12.0751,x:-5,y:-58.05,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:-3.5603,x:7.1,y:183.7,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,rotation:10.8976,x:0.4,y:-79.05,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-120.8209,x:-61.1,y:55.95,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9982,scaleY:0.9982,rotation:-103.0494,x:-20.8,y:125.45}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-135.5519,x:-20,y:134.35,regY:-1.4}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.0945,x:-57.25,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-18.0458,x:-21.85,y:90.6,regY:-46.7,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:97.538,x:45.15,y:-26.45,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:70.1926,x:36.15,y:49.45,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:61.0138,x:63.2,y:124.65,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:34.6818,x:65.35,y:135.75,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:8.0663,y:93.45,x:14.95,regX:-0.8}},{t:this.instance_9,p:{rotation:16.5837,x:-2.15,y:187.4,regX:3.8,scaleX:0.9976,scaleY:0.9976,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:13.2531,x:-5,y:-58.15,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:-2.6103,x:4.8,y:184.45,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:11.1992,x:0.7,y:-78.9,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-121.3648,x:-60.3,y:56,regX:39.8,regY:0.9,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-103.5933,x:-19.3,y:125.1}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-136.1058,x:-18.45,y:134.1,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-86.7253,x:-57.25,y:-23.65,regX:36.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-16.5945,x:-21.7,y:90.65,regY:-46.7,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:98.3516,x:45.1,y:-26.4,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:70.6037,x:35.1,y:49.4,regX:-39.8,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:61.4266,x:61.55,y:124.7,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:35.0927,x:63.6,y:135.7,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:6.5951,y:93.45,x:14.85,regX:-0.8}},{t:this.instance_9,p:{rotation:15.1162,x:0.15,y:187.9,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:14.4294,x:-4.95,y:-58.2,regY:8.6}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:-1.6583,x:2.55,y:185.1,regY:-54.3,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,rotation:11.5018,x:1.25,y:-78.75,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-121.9089,x:-59.3,y:55.95,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-104.1374,x:-17.75,y:124.75}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-136.6591,x:-16.85,y:133.7,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-87.3586,x:-57.3,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-15.1447,x:-21.65,y:90.85,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.1676,x:45.25,y:-26.45,regY:-0.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.0161,x:34.05,y:49.15,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:61.8393,x:59.9,y:124.75,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:35.503,x:61.9,y:135.9,regY:3.3}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:5.1239,y:93.5,x:14.85,regX:-0.8}},{t:this.instance_9,p:{rotation:13.6505,x:2.55,y:188.2,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9988,scaleY:0.9988,rotation:15.606,x:-4.85,y:-58.2,regY:8.6}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:-0.7069,x:0.3,y:185.8,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:11.8057,x:1.55,y:-78.75,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-122.4513,x:-58.45,y:55.95,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-104.6827,x:-16.25,y:124.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-137.2132,x:-15.2,y:133.35,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-87.9896,x:-57.3,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-13.694,x:-21.5,y:90.85,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:99.983,x:45.15,y:-26.4,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.426,x:33,y:48.95,regX:-39.9,regY:-1.2}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:62.2511,x:58.35,y:124.75,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:35.914,x:60.3,y:135.85,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:3.6534,y:93.5,x:14.8,regX:-0.8}},{t:this.instance_9,p:{rotation:12.1849,x:4.9,y:188.55,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:16.7833,x:-4.95,y:-58.15,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:0.2391,x:-2,y:186.35,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,rotation:12.1081,x:2,y:-78.5,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-122.9955,x:-57.65,y:56,regX:39.8,regY:0.9,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9982,scaleY:0.9982,rotation:-105.2255,x:-14.75,y:124}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-137.765,x:-13.6,y:132.95,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-88.6214,x:-57.3,y:-23.65,regX:36.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-12.2435,x:-21.45,y:90.9,regY:-46.6,regX:2.1}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:100.7977,x:45.1,y:-26.45,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.8367,x:31.85,y:48.8,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:62.6632,x:56.65,y:124.8,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:36.324,x:58.6,y:135.8,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:2.1817,y:93.55,x:14.75,regX:-0.8}},{t:this.instance_9,p:{rotation:10.7185,x:7.3,y:188.8,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:17.9602,x:-4.95,y:-58.15,regY:8.6}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:1.1913,x:-4.3,y:186.75,regY:-54.3,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:12.4099,x:2.35,y:-78.4,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-123.5385,x:-56.65,y:55.95,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-105.7694,x:-13.2,y:123.6}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-138.319,x:-12,y:132.5,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-89.2529,x:-57.3,y:-23.55,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.7934,x:-21.35,y:90.9,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:101.6136,x:45.15,y:-26.4,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.2511,x:30.75,y:48.6,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:63.0746,x:55.15,y:124.8,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:36.7361,x:56.9,y:135.85,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:0.7107,y:93.6,x:14.6,regX:-0.9}},{t:this.instance_9,p:{rotation:9.2513,x:9.7,y:189.05,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:19.137,x:-4.95,y:-58.1,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:2.142,x:-6.65,y:187.3,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,rotation:12.713,x:2.85,y:-78.25,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-124.0824,x:-55.75,y:55.95,regX:39.8,regY:1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-106.3136,x:-11.7,y:123.1}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-138.8732,x:-10.45,y:132.1,regY:-1.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-89.8844,x:-57.3,y:-23.55,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.3428,x:-21.25,y:91,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:102.427,x:45.15,y:-26.4,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.6624,x:29.75,y:48.4,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:63.4878,x:53.5,y:124.7,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:37.1458,x:55.15,y:135.8,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-0.7563,y:93.6,x:14.7,regX:-0.8}},{t:this.instance_9,p:{rotation:7.7856,x:12,y:189.1,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:20.3148,x:-4.95,y:-58.1,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:3.0926,x:-9.05,y:187.7,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:13.0157,x:3.15,y:-78,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-124.6278,x:-55,y:55.9,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.1,regY:-8.8,scaleX:0.9982,scaleY:0.9982,rotation:-106.8579,x:-10.15,y:122.85}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-139.426,x:-8.8,y:131.65,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-90.5123,x:-57.25,y:-23.55,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.8925,x:-21.1,y:90.95,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:103.2437,x:45.15,y:-26.35,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.0741,x:28.7,y:48.15,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:63.9003,x:51.95,y:124.7,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:37.557,x:53.5,y:135.8,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-2.2282,y:93.65,x:14.55,regX:-0.8}},{t:this.instance_9,p:{rotation:6.3188,x:14.25,y:189.15,regX:3.7,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:21.4906,x:-5.05,y:-58.1,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.044,x:-11.4,y:188,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:13.3187,x:3.55,y:-77.95,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-125.1694,x:-54.15,y:55.95,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-107.4015,x:-8.75,y:122.3}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-139.9792,x:-7.15,y:131.15,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-91.1439,x:-57.25,y:-23.55,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.4422,x:-20.95,y:91.05,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:104.059,x:45.1,y:-26.45,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.4836,x:27.6,y:47.95,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:64.3124,x:50.25,y:124.6,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:37.9673,x:51.8,y:135.7,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-3.6999,y:93.65,x:14.55,regX:-0.8}},{t:this.instance_9,p:{rotation:4.8528,x:16.85,y:189.15,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:22.6693,x:-5,y:-58.15,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9955,x:-13.75,y:188.25,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.9,rotation:13.6212,x:4.05,y:-77.7,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-125.7138,x:-53.3,y:55.9,regX:39.8,regY:0.9,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9982,scaleY:0.9982,rotation:-107.9455,x:-7.25,y:121.8}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-140.5328,x:-5.7,y:130.65,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-91.7755,x:-57.25,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-4.9925,x:-20.95,y:91.05,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:104.8743,x:45.25,y:-26.3,regY:-0.4}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:73.8974,x:26.55,y:47.7,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:64.7242,x:48.65,y:124.5,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:38.379,x:50.05,y:135.65,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-5.1705,y:93.65,x:14.5,regX:-0.8}},{t:this.instance_9,p:{rotation:3.3863,x:19.25,y:189.05,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:23.8462,x:-5,y:-58.15,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.9468,x:-16.1,y:188.45,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:13.9229,x:4.35,y:-77.55,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-126.2577,x:-52.35,y:55.75,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9982,scaleY:0.9982,rotation:-108.4903,x:-5.75,y:121.35}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-141.0856,x:-4.1,y:130.15,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-92.4065,x:-57.25,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-3.5415,x:-20.9,y:90.95,regY:-46.7,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:105.689,x:45.2,y:-26.35,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.3082,x:25.5,y:47.4,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:65.1368,x:47.05,y:124.45,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:38.7891,x:48.45,y:135.55,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-6.6419,y:93.7,x:14.45,regX:-0.8}},{t:this.instance_9,p:{rotation:1.9195,x:21.6,y:189,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:25.0233,x:-5.05,y:-58.15,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:6.8971,x:-18.65,y:188.55,regY:-54.2,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:14.226,x:4.75,y:-77.4,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-126.7998,x:-51.6,y:55.75,regX:39.8,regY:0.9,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-109.0338,x:-4.25,y:120.8}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-141.6391,x:-2.55,y:129.6,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-93.0395,x:-57.25,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:-2.091,x:-20.75,y:91,regY:-46.7,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:106.5042,x:45.15,y:-26.3,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.7193,x:24.45,y:47.1,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:65.5484,x:45.55,y:124.25,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:39.1996,x:46.75,y:135.45,regY:3.2}},{t:this.instance_10,p:{regY:2,scaleX:0.9976,scaleY:0.9976,rotation:-8.1132,y:93.65,x:14.4,regX:-0.8}},{t:this.instance_9,p:{rotation:0.4531,x:24.05,y:188.95,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:26.2006,x:-5.05,y:-58.15,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:7.8492,x:-20.9,y:188.6,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:14.5285,x:5.05,y:-77.15,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-127.3432,x:-50.6,y:55.6,regX:39.9,regY:1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-109.5776,x:-2.75,y:120.3}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-142.192,x:-1,y:129.15,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-93.6704,x:-57.25,y:-23.45,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:-0.642,x:-20.6,y:91.2,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:107.3188,x:45.15,y:-26.35,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:75.1304,x:23.4,y:46.8,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:65.9624,x:43.9,y:124.05,regX:-6.3}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:39.6109,x:45.05,y:135.25,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-9.5835,y:93.75,x:14.25,regX:-0.8}},{t:this.instance_9,p:{rotation:-1.0087,x:26.4,y:188.7,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:27.3774,x:-4.95,y:-58.2,regY:8.6}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:8.7989,x:-23.3,y:188.65,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:14.8311,x:5.5,y:-76.9,regY:52.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{rotation:-127.8867,x:-49.7,y:55.55,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-110.122,x:-1.15,y:119.75}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-142.7455,x:0.55,y:128.6,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-94.3016,x:-57.25,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:0.804,x:-20.6,y:91.3,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:108.1345,x:45.15,y:-26.3,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:75.5425,x:22.4,y:46.65,regX:-39.8,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:66.3733,x:42.35,y:124,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:40.0202,x:43.35,y:135.2,regY:3.3}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-11.0554,y:93.75,x:14.25,regX:-0.8}},{t:this.instance_9,p:{rotation:-2.4746,x:28.8,y:188.35,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:28.5537,x:-5.1,y:-58.15,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:9.7513,x:-25.65,y:188.6,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:15.1336,x:5.85,y:-76.75,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-128.4305,x:-48.8,y:55.55,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.1,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-110.6664,x:0.3,y:119.35}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-143.299,x:2.15,y:128,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-94.9332,x:-57.25,y:-23.5,regX:36.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:2.2541,x:-20.45,y:91.3,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:108.9501,x:45.15,y:-26.35,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:75.9553,x:21.35,y:46.2,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:66.786,x:40.7,y:123.7,regX:-6.3}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:40.4322,x:41.75,y:134.95,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-12.5265,y:93.85,x:14.1,regX:-0.9}},{t:this.instance_9,p:{rotation:-3.9413,x:31.2,y:187.85,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:29.7328,x:-5.1,y:-58.15,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:10.702,x:-28,y:188.45,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:15.4368,x:6.25,y:-76.4,regY:52.9,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-128.9751,x:-48,y:55.35,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-111.2111,x:1.7,y:118.65}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-143.8516,x:3.65,y:127.4,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-95.5657,x:-57.25,y:-23.4,regX:36.2}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:3.7047,x:-20.4,y:91.3,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:109.7656,x:45.15,y:-26.25,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:76.3665,x:20.35,y:45.85,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8,scaleX:0.9981,scaleY:0.9981,rotation:67.1977,x:39.3,y:123.5,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:40.8428,x:40.05,y:134.75,regY:3.2}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-13.9969,y:93.8,x:14.2,regX:-0.8}},{t:this.instance_9,p:{rotation:-5.4071,x:33.5,y:187.45,regX:3.8,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:30.907,x:-5.05,y:-58.1,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:11.6526,x:-30.3,y:188.25,regY:-54.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:15.7392,x:6.65,y:-76.3,regY:52.8,scaleX:0.9988,scaleY:0.9988}},{t:this.instance_3,p:{rotation:-129.5186,x:-47.15,y:55.3,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.1,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-111.7542,x:3.2,y:118.15}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-144.4057,x:5.25,y:126.8,regY:-1.5}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-96.197,x:-57.2,y:-23.35,regX:36.2}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.25,y:91.3,regY:-46.6,regX:2.2}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:110.5796,x:45.2,y:-26.35,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:76.7773,x:19.35,y:45.55,regX:-39.9,regY:-1.1}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9981,scaleY:0.9981,rotation:67.6085,x:37.6,y:123.4,regX:-6.2}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,rotation:41.2532,x:38.4,y:134.7,regY:3.3}},{t:this.instance_10,p:{regY:2.1,scaleX:0.9976,scaleY:0.9976,rotation:-15.4675,y:93.75,x:14.15,regX:-0.8}},{t:this.instance_9,p:{rotation:-6.8736,x:35.7,y:186.9,regX:3.7,scaleX:0.9977,scaleY:0.9977,regY:-53.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-1,scaleX:0.9988,scaleY:0.9988,rotation:32.0839,x:-5.05,y:-58.2,regY:8.7}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:12.6036,x:-32.8,y:188,regY:-54.2,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regX:0.8,rotation:16.0423,x:6.9,y:-76,regY:52.9,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{rotation:-130.0615,x:-46.25,y:55.2,regX:39.8,regY:1,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_2,p:{regX:5.2,regY:-8.8,scaleX:0.9981,scaleY:0.9981,rotation:-112.2988,x:4.6,y:117.55}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-144.9587,x:6.85,y:126.25,regY:-1.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-96.8273,x:-57.3,y:-23.4,regX:36.3}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.7,-216.2,202.9,520.0999999999999);


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

	// Armature_1
	this.instance = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance.setTransform(-57.15,-23.1,0.9985,0.9985,-88.1557,0,0,35.8,0.3);

	this.instance_1 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1.setTransform(-28.95,139.1,0.9981,0.9981,-119.1969,0,0,6.2,-1.6);

	this.instance_2 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_2.setTransform(-28.25,130.15,0.9984,0.9984,-95.8571,0,0,5.4,-8.6);

	this.instance_3 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_3.setTransform(-58.05,55.95,0.9984,0.9984,-112.6207,0,0,39.7,1.1);

	this.instance_4 = new lib.ch1_headcopy_1("synched",0);
	this.instance_4.setTransform(-0.65,-79.35,0.999,0.999,10.9713,0,0,0.9,52.6);

	this.instance_5 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_6.setTransform(-23.8,189.15,0.9982,0.9982,16.8043,0,0,2.9,-54.6);

	this.instance_7 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_7.setTransform(-4.8,-58.15,0.999,0.999,9.8339,0,0,-0.8,8.8);

	this.instance_8 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_8.setTransform(-5.55,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_9.setTransform(28.8,188.95,0.9979,0.9979,-11.5959,0,0,2.4,-54.1);

	this.instance_10 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_10.setTransform(9.5,95.35,0.9978,0.9978,-14.7222,0,0,-1,1.8);

	this.instance_11 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_11.setTransform(49.15,130.6,0.9984,0.9984,68.832,0,0,-5.2,3.2);

	this.instance_12 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_12.setTransform(55.7,121.5,0.9985,0.9985,106.5132,0,0,-6.4,7.9);

	this.instance_13 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_13.setTransform(25.2,47.15,0.9984,0.9984,68.1583,0,0,-40.7,-0.6);

	this.instance_14 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_14.setTransform(45.2,-26.4,0.9984,0.9984,106.0278,0,0,-33.9,-0.1);

	this.instance_15 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_15.setTransform(-16.9,92.65,0.9984,0.9984,1.8506,0,0,2.2,-46.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{rotation:1.8506,x:-16.9,y:92.65,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.0278,y:-26.4,x:45.2,regX:-33.9}},{t:this.instance_13,p:{regX:-40.7,rotation:68.1583,x:25.2,y:47.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.4,regY:7.9,scaleX:0.9985,scaleY:0.9985,rotation:106.5132,x:55.7,y:121.5}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9984,scaleY:0.9984,rotation:68.832,x:49.15,y:130.6,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9978,scaleY:0.9978,rotation:-14.7222,x:9.5,y:95.35,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.4,regY:-54.1,scaleX:0.9979,scaleY:0.9979,rotation:-11.5959,x:28.8,y:188.95}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:9.8339,y:-58.15,regY:8.8,x:-4.8,regX:-0.8}},{t:this.instance_6,p:{regX:2.9,regY:-54.6,scaleX:0.9982,scaleY:0.9982,rotation:16.8043,x:-23.8,y:189.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.6,scaleX:0.999,scaleY:0.999,rotation:10.9713,x:-0.65,y:-79.35,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-112.6207,x:-58.05,y:55.95,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9984,scaleY:0.9984,rotation:-95.8571,x:-28.25,y:130.15,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-119.1969,x:-28.95,y:139.1,regY:-1.6}},{t:this.instance,p:{regY:0.3,rotation:-88.1557,x:-57.15,y:-23.1,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]}).to({state:[{t:this.instance_15,p:{rotation:0.1743,x:-17.2,y:92.6,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:105.5103,y:-26.4,x:45.2,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:68.377,x:25.8,y:47.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.8,scaleX:0.9984,scaleY:0.9984,rotation:105.135,x:56.15,y:121.95}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:67.2194,x:49.85,y:131.05,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-13.4509,x:9.85,y:95.15,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.2,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-9.3399,x:26.95,y:189.45}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.6946,y:-58.1,regY:8.8,x:-4.8,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:15.5398,x:-21.15,y:189.3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:10.811,x:-0.75,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.966,x:-58.55,y:55.85,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-95.2038,x:-29.7,y:130.35,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-118.5423,x:-30.4,y:139.25,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-87.7955,x:-57.2,y:-23.1,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.4976,x:-17.5,y:92.6,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:104.9923,y:-26.45,x:45.2,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:68.5976,x:26.4,y:47.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:103.7569,x:56.45,y:122.2}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:65.6079,x:50.45,y:131.45,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-12.1797,x:10.3,y:94.95,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-7.083,x:25.45,y:189.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.556,y:-58.2,regY:8.7,x:-4.75,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:14.2763,x:-18.6,y:189.35}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:10.6505,x:-0.8,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.3135,x:-59.05,y:55.85,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-94.549,x:-31.05,y:130.65,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-117.8885,x:-31.9,y:139.6,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-87.4353,x:-57.2,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-3.176,x:-17.8,y:92.55,regY:-46.1,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:104.4757,y:-26.45,x:45.15,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:68.8186,x:27.1,y:47.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.4,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:102.3777,x:56.8,y:122.4}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:63.9954,x:51,y:131.9,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-10.908,x:10.8,y:94.85,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-4.8275,x:23.8,y:189.7}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.4167,y:-58.2,regY:8.7,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:13.0114,x:-16.05,y:189.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:10.4876,x:-0.9,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.6591,x:-59.5,y:55.8,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-93.8948,x:-32.2,y:131,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-117.2338,x:-33.35,y:139.9,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-87.075,x:-57.2,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-4.852,x:-18.1,y:92.35,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:103.9591,y:-26.6,x:45.15,regX:-34}},{t:this.instance_13,p:{regX:-40.6,rotation:69.0379,x:27.75,y:47.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:101.0006,x:57.15,y:122.8}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:62.3825,x:51.6,y:132.35,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-9.6359,x:11.25,y:94.65,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.4,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-2.5708,x:22.25,y:189.75}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.2783,y:-58.05,regY:8.8,x:-4.75,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:11.748,x:-13.4,y:189.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:10.3264,x:-0.9,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.0043,x:-60,y:55.75,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-93.241,x:-33.6,y:131.2,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-116.5799,x:-34.85,y:140.15,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-86.7146,x:-57.15,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-6.5286,x:-18.4,y:92.35,regY:-46.1,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:103.4426,y:-26.45,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:69.2582,x:28.45,y:47.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:99.6228,x:57.5,y:123.05}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:60.7703,x:52.15,y:132.6,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-8.3647,x:11.65,y:94.55,regX:-1.1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-0.3146,x:20.5,y:189.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.1393,y:-58.05,regY:8.8,x:-4.8,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:10.4833,x:-10.95,y:188.75}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:10.1655,x:-0.9,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.3503,x:-60.5,y:55.8,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-92.5877,x:-35.1,y:131.5,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-115.9265,x:-36.3,y:140.45,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-86.354,x:-57.2,y:-23.15,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-8.2053,x:-18.8,y:92.2,regY:-46.2,regX:2.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:102.9246,y:-26.6,x:45.15,regX:-34}},{t:this.instance_13,p:{regX:-40.6,rotation:69.4783,x:29.1,y:48.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:98.2433,x:57.9,y:123.35}},{t:this.instance_11,p:{regX:-5,scaleX:0.9983,scaleY:0.9983,rotation:59.158,x:52.9,y:133.2,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-7.0922,x:12.1,y:94.35,regX:-1.1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:1.9394,x:18.8,y:189.85}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.0002,y:-58.05,regY:8.8,x:-4.8,regX:-0.8}},{t:this.instance_6,p:{regX:2.9,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:9.219,x:-8.5,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:10.0053,x:-0.85,y:-79.4,regX:1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.6972,x:-61,y:55.75,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-91.9331,x:-36.5,y:131.75,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-115.2721,x:-37.75,y:140.7,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-85.9934,x:-57.15,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-9.8831,x:-19,y:92.05,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:102.4085,y:-26.5,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:69.6977,x:29.75,y:48.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:96.8653,x:58.25,y:123.55}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:57.5463,x:53.4,y:133.35,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-5.8215,x:12.65,y:94.2,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54.1,scaleX:0.9978,scaleY:0.9978,rotation:4.1945,x:17.15,y:189.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.8619,y:-57.95,regY:8.8,x:-4.75,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.6,scaleX:0.9982,scaleY:0.9982,rotation:7.9548,x:-5.9,y:187.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:9.8438,x:-0.9,y:-79.4,regX:1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.0431,x:-61.45,y:55.75,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9984,scaleY:0.9984,rotation:-91.2795,x:-37.85,y:132,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-114.6192,x:-39.2,y:140.85,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-85.6317,x:-57.15,y:-23.2,scaleX:0.9984,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-11.5588,x:-19.3,y:91.95,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:101.8915,y:-26.45,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:69.918,x:30.5,y:48.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:95.4876,x:58.7,y:123.8}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:55.9327,x:54.15,y:133.85,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-4.5499,x:13.15,y:94.05,regX:-1,regY:1.9}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:6.4511,x:15.5,y:189.65}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.7227,y:-58,regY:8.8,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:6.6912,x:-3.4,y:187.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:9.6823,x:-1,y:-79.35,regX:1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.3903,x:-61.95,y:55.75,regX:39.6,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9984,scaleY:0.9984,rotation:-90.6244,x:-39.15,y:132.25,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.964,x:-40.65,y:141.1,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-85.2724,x:-57.15,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-13.2366,x:-19.5,y:91.85,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:101.3747,y:-26.55,x:45.15,regX:-34}},{t:this.instance_13,p:{regX:-40.6,rotation:70.1371,x:31.1,y:48.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:94.1088,x:59.1,y:124.15}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:54.3212,x:54.9,y:134.05,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-3.2782,x:13.5,y:93.8,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:8.7079,x:13.8,y:189.45}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:8.5836,y:-58,regY:8.8,x:-4.8,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:5.4263,x:-0.8,y:186.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:9.5216,x:-0.95,y:-79.4,regX:1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-106.7354,x:-62.45,y:55.7,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-89.9764,x:-40.55,y:132.45,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.3113,x:-42.15,y:141.3,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-84.9102,x:-57.15,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-14.9128,x:-19.9,y:91.9,regY:-46.1,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.8572,y:-26.6,x:45.2,regX:-34}},{t:this.instance_13,p:{regX:-40.6,rotation:70.3573,x:31.8,y:48.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:92.7306,x:59.45,y:124.2}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:52.7082,x:55.35,y:134.5,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-2.0053,x:14,y:93.65,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:10.9633,x:12.25,y:189.3}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:8.4446,y:-58,regY:8.8,x:-4.75,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:4.1623,x:1.65,y:186.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:9.3593,x:-1.15,y:-79.35,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-106.0814,x:-63,y:55.55,regX:39.8,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9984,scaleY:0.9984,rotation:-89.3222,x:-41.95,y:132.65,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-112.6561,x:-43.65,y:141.45,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-84.5514,x:-57.1,y:-23.2,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-16.5892,x:-20.15,y:91.65,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.3393,y:-26.5,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:70.5775,x:32.45,y:48.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.4,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:91.3522,x:59.85,y:124.3}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:51.0969,x:55.95,y:134.8,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.7352,x:14.3,y:93.35,regX:-1.1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:13.2219,x:10.55,y:189}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.3051,y:-58.05,regY:8.8,x:-4.7,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:2.8986,x:4.1,y:185.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:9.1986,x:-1.25,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-105.4274,x:-63.45,y:55.55,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9984,rotation:-88.6688,x:-43.3,y:132.85,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-112.0033,x:-45.1,y:141.6,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-84.1908,x:-57.15,y:-23.1,scaleX:0.9985,scaleY:0.9985,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{rotation:-18.2655,x:-20.4,y:91.6,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.8236,y:-26.5,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.7,rotation:70.7966,x:33.1,y:48.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:89.979,x:60.25,y:124.65}},{t:this.instance_11,p:{regX:-5,scaleX:0.9983,scaleY:0.9983,rotation:49.483,x:56.65,y:135.2,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9978,scaleY:0.9978,rotation:0.5336,x:14.9,y:93.2,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54.1,scaleX:0.9978,scaleY:0.9978,rotation:15.4777,x:8.9,y:188.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.1662,y:-58,regY:8.8,x:-4.75,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:1.6337,x:6.45,y:184.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:9.0373,x:-1.25,y:-79.35,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-104.7733,x:-63.95,y:55.55,regX:39.6,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-88.0143,x:-44.7,y:133.05,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-111.3493,x:-46.6,y:141.8,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-83.8298,x:-57.1,y:-23.2,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-19.9424,x:-20.85,y:91.5,regY:-46.2,regX:2.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.3064,y:-26.5,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.7,rotation:71.0173,x:33.85,y:48.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:88.6005,x:60.65,y:124.85}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:47.8708,x:57.4,y:135.3,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:1.8045,x:15.35,y:92.95,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:17.7336,x:7.2,y:188.3}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.0284,y:-58,regY:8.8,x:-4.75,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:0.3696,x:8.9,y:183.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:8.877,x:-1.25,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-104.1195,x:-64.45,y:55.45,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-87.3605,x:-46.15,y:133.2,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-110.6949,x:-48.1,y:141.9,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-83.4685,x:-57.1,y:-23.1,scaleX:0.9985,scaleY:0.9985,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{rotation:-21.6196,x:-21.05,y:91.35,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.7895,y:-26.55,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.7,rotation:71.2375,x:34.5,y:49,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9983,scaleY:0.9983,rotation:87.2212,x:61.05,y:125.05}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:46.2584,x:58.05,y:135.6,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9978,scaleY:0.9978,rotation:3.0763,x:15.75,y:92.75,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.2,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:19.991,x:5.4,y:187.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.8878,y:-58,regY:8.8,x:-4.7,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:-0.8899,x:11.3,y:182.6}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.6,scaleX:0.9989,scaleY:0.9989,rotation:8.7158,x:-1.3,y:-79.25,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-103.4668,x:-65.05,y:55.4,regX:39.7,regY:1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-86.7063,x:-47.5,y:133.35,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-110.041,x:-49.5,y:142.05,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-83.1071,x:-57.05,y:-23.2,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-23.2959,x:-21.4,y:91.2,regY:-46.2,regX:2.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.2724,y:-26.5,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.7,rotation:71.4573,x:35.15,y:49.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:85.8438,x:61.4,y:125.25}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:44.647,x:58.75,y:135.85,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.3478,x:16.25,y:92.5,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:22.2477,x:3.85,y:187.35}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.7499,y:-58,regY:8.8,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:-2.1543,x:13.75,y:181.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:8.5539,x:-1.35,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-102.8121,x:-65.55,y:55.3,regX:39.8,regY:1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-86.0526,x:-48.8,y:133.4,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-109.3877,x:-51.05,y:142.15,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-82.747,x:-57.1,y:-23.05,scaleX:0.9984,scaleY:0.9984,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{rotation:-24.9732,x:-21.55,y:91.1,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.7551,y:-26.65,x:45.2,regX:-34}},{t:this.instance_13,p:{regX:-40.7,rotation:71.6775,x:35.9,y:49.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:84.4649,x:61.85,y:125.45}},{t:this.instance_11,p:{regX:-5,scaleX:0.9983,scaleY:0.9983,rotation:43.0341,x:59.3,y:136.25,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:5.6188,x:16.5,y:92.35,regX:-1.1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54.1,scaleX:0.9978,scaleY:0.9978,rotation:24.5042,x:2.25,y:186.75}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:7.6104,y:-58,regY:8.8,x:-4.7,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:-3.4179,x:16.05,y:180.3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.6,scaleX:0.9989,scaleY:0.9989,rotation:8.3937,x:-1.45,y:-79.25,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-102.1581,x:-66,y:55.3,regX:39.7,regY:1}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-85.3992,x:-50.15,y:133.65,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-108.7333,x:-52.55,y:142.2,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-82.3877,x:-57.05,y:-23.25,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-26.6496,x:-22,y:91.05,regY:-46.2,regX:2.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.2382,y:-26.45,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:71.8974,x:36.6,y:49.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:83.0871,x:62.2,y:125.65}},{t:this.instance_11,p:{regX:-5,scaleX:0.9983,scaleY:0.9983,rotation:41.4215,x:60,y:136.5,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:6.8908,x:17.1,y:92.25,regX:-1,regY:1.9}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:26.761,x:0.55,y:186.3}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.4727,y:-58,regY:8.8,x:-4.7,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:-4.6824,x:18.4,y:179.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:8.2327,x:-1.45,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-101.5038,x:-66.35,y:55.25,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-84.7435,x:-51.65,y:133.75,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-108.0795,x:-53.95,y:142.35,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-82.0262,x:-57.05,y:-23.15,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-28.3269,x:-22.15,y:90.8,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.7212,y:-26.55,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:72.1164,x:37.2,y:49.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:81.7089,x:62.6,y:125.9}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:39.8092,x:60.55,y:136.65,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:8.1629,x:17.55,y:91.85,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:29.0184,x:-1.1,y:185.65}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.3324,y:-58,regY:8.8,x:-4.75,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:-5.9465,x:20.65,y:177.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:8.0708,x:-1.45,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-100.8496,x:-66.85,y:55.25,regX:39.6,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-84.0906,x:-53,y:133.85,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-107.4257,x:-55.45,y:142.45,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-81.6661,x:-57.1,y:-23.1,scaleX:0.9985,scaleY:0.9985,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{rotation:-30.003,x:-22.45,y:90.75,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.2038,y:-26.5,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:72.3371,x:37.9,y:49.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:80.3311,x:63.05,y:125.9}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:38.1968,x:61.05,y:136.8,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:9.4344,x:17.95,y:91.65,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:31.2735,x:-2.8,y:185}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.1938,y:-58.05,regY:8.8,x:-4.7,regX:-0.8}},{t:this.instance_6,p:{regX:2.9,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:-7.211,x:22.8,y:176.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:7.9099,x:-1.5,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-100.1968,x:-67.35,y:55.05,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-83.4369,x:-54.45,y:133.95,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-106.7715,x:-57.1,y:142.45,regY:-1.7}},{t:this.instance,p:{regY:0.2,rotation:-81.304,x:-57.05,y:-23.2,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-28.4174,x:-22.15,y:90.9,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.693,y:-26.5,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:72.1292,x:37.3,y:49.35,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:81.6434,x:62.65,y:125.95}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:39.7245,x:60.6,y:136.65,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:8.2177,x:17.55,y:91.9,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:29.1079,x:-1.2,y:185.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.3207,y:-58,regY:8.8,x:-4.7,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:-6.0196,x:20.8,y:177.7}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:8.0586,x:-1.5,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-100.8301,x:-66.9,y:55.1,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-84.0791,x:-53.1,y:133.85,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-107.4213,x:-55.55,y:142.45,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-81.6521,x:-57.05,y:-23.05,scaleX:0.9985,scaleY:0.9985,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{rotation:-26.831,x:-21.9,y:91,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.1827,y:-26.55,x:45.1,regX:-34}},{t:this.instance_13,p:{regX:-40.7,rotation:71.9217,x:36.6,y:49.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:82.9556,x:62.2,y:125.65}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:41.2521,x:59.9,y:136.45,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:7.0004,x:17.1,y:92.2,regX:-1,regY:1.9}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:26.9436,x:0.4,y:186.2}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.4497,y:-58,regY:8.8,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:-4.8283,x:18.65,y:178.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:8.207,x:-1.45,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-101.4636,x:-66.45,y:55.2,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-84.7189,x:-51.7,y:133.75,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-108.0685,x:-54.1,y:142.35,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-81.9977,x:-57.05,y:-23.15,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-25.244,x:-21.6,y:91.1,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.6728,y:-26.55,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.7,rotation:71.7143,x:35.9,y:49.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:84.2677,x:61.8,y:125.5}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:42.7807,x:59.3,y:136.25,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:5.7853,x:16.75,y:92.3,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.4,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:24.7775,x:2.1,y:186.85}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:7.5768,y:-58,regY:8.8,x:-4.7,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:-3.6365,x:16.45,y:180.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.6,scaleX:0.9989,scaleY:0.9989,rotation:8.3556,x:-1.35,y:-79.25,regX:1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-102.0971,x:-66,y:55.25,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-85.3605,x:-50.35,y:133.7,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-108.7186,x:-52.7,y:142.25,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-82.3443,x:-57.1,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-23.6583,x:-21.4,y:91.15,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.1618,y:-26.5,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:71.5066,x:35.35,y:49.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9983,scaleY:0.9983,rotation:85.5785,x:61.45,y:125.35}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:44.3083,x:58.7,y:136,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5675,x:16.35,y:92.55,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.2,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:22.6116,x:3.5,y:187.25}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.7031,y:-58.05,regY:8.8,x:-4.75,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:-2.4444,x:14.25,y:181.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:8.5043,x:-1.4,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-102.732,x:-65.65,y:55.4,regX:39.7,regY:1}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-86.0008,x:-48.95,y:133.5,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-109.3663,x:-51.25,y:142.15,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-82.6923,x:-57.05,y:-23.15,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-22.0715,x:-21.05,y:91.25,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:98.6514,y:-26.5,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:71.2984,x:34.65,y:49.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.4,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:86.8915,x:61.05,y:125.05}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:45.836,x:58.1,y:135.75,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:3.3501,x:15.9,y:92.7,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.2,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:20.447,x:5,y:187.7}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.8304,y:-58,regY:8.8,x:-4.75,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:-1.2535,x:12,y:182.35}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:8.6539,x:-1.4,y:-79.35,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-103.3659,x:-65.05,y:55.4,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-86.6432,x:-47.7,y:133.4,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-110.0158,x:-49.8,y:142.05,regY:-1.6}},{t:this.instance,p:{regY:0.3,rotation:-83.0391,x:-56.95,y:-23.15,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-20.4857,x:-20.8,y:91.5,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.1415,y:-26.5,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:71.0901,x:34,y:49,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:88.2037,x:60.7,y:124.95}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:47.3644,x:57.45,y:135.45,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9978,scaleY:0.9978,rotation:2.1342,x:15.55,y:92.9,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:18.2806,x:6.8,y:188.2}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.9568,y:-58,regY:8.8,x:-4.7,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:-0.0613,x:9.7,y:183.3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:8.8026,x:-1.3,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-103.9993,x:-64.7,y:55.45,regX:39.7,regY:1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-87.2842,x:-46.35,y:133.25,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-110.6649,x:-48.35,y:141.95,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-83.3857,x:-57.1,y:-23.1,scaleX:0.9984,scaleY:0.9984,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{rotation:-18.8991,x:-20.55,y:91.5,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.6305,y:-26.45,x:45.15,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:70.8827,x:33.45,y:48.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.4,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:89.5157,x:60.4,y:124.65}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:48.8925,x:56.9,y:135.2,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.9175,x:15.05,y:93.1,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:16.1149,x:8.4,y:188.55}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.0849,y:-58.05,regY:8.8,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:1.1247,x:7.4,y:184.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:8.9505,x:-1.25,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-104.634,x:-64.1,y:55.5,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-87.9249,x:-45,y:133.1,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-111.3136,x:-46.95,y:141.85,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-83.7318,x:-57.1,y:-23.2,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-17.3133,x:-20.3,y:91.65,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.1196,y:-26.5,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:70.675,x:32.75,y:48.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:90.8232,x:60.05,y:124.55}},{t:this.instance_11,p:{regX:-5,scaleX:0.9983,scaleY:0.9983,rotation:50.4209,x:56.3,y:135,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9978,scaleY:0.9978,rotation:-0.2962,x:14.6,y:93.3,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.4,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:13.9508,x:10.1,y:188.85}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.2123,y:-58,regY:8.8,x:-4.75,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:2.3173,x:5.2,y:185.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:9.0994,x:-1.2,y:-79.3,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-105.2659,x:-63.65,y:55.4,regX:39.8,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-88.5663,x:-43.7,y:132.9,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-111.962,x:-45.5,y:141.65,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-84.0781,x:-57.1,y:-23.1,scaleX:0.9985,scaleY:0.9985,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{rotation:-15.7269,x:-20,y:91.7,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.61,y:-26.5,x:45.15,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:70.467,x:32.1,y:48.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:92.1363,x:59.65,y:124.35}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:51.9477,x:55.7,y:134.6,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9978,scaleY:0.9978,rotation:-1.5126,x:14.25,y:93.65,regX:-1,regY:1.9}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:11.7841,x:11.6,y:189.1}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.3405,y:-58.05,regY:8.8,x:-4.7,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:3.5083,x:2.9,y:185.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:9.2484,x:-1.2,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-105.9002,x:-63.15,y:55.6,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9984,rotation:-89.2075,x:-42.4,y:132.75,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-112.6106,x:-44.1,y:141.5,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-84.4249,x:-57.15,y:-23.15,scaleX:0.9984,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-14.1405,x:-19.65,y:91.75,regY:-46.2,regX:2.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:101.1013,y:-26.5,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:70.2601,x:31.5,y:48.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.8,scaleX:0.9984,scaleY:0.9984,rotation:93.4479,x:59.45,y:124.15}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:53.476,x:55.05,y:134.3,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-2.7297,x:13.75,y:93.65,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:9.6186,x:13.1,y:189.4}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:8.4668,y:-58.05,regY:8.8,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:4.7,x:0.55,y:186.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:9.3974,x:-1.05,y:-79.35,regX:1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-106.5342,x:-62.7,y:55.65,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-89.8485,x:-41.1,y:132.6,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.2599,x:-42.65,y:141.35,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-84.7722,x:-57.15,y:-23.2,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-12.5538,x:-19.4,y:91.95,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:101.5909,y:-26.5,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:70.0515,x:30.85,y:48.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:94.7606,x:58.9,y:123.9}},{t:this.instance_11,p:{regX:-5,scaleX:0.9983,scaleY:0.9983,rotation:55.004,x:54.5,y:134.1,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-3.9455,x:13.25,y:93.9,regX:-1.1,regY:1.8}},{t:this.instance_9,p:{regX:2.4,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:7.4531,x:14.8,y:189.55}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.5943,y:-58,regY:8.8,x:-4.75,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:5.8911,x:-1.85,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:9.5455,x:-1.1,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.1676,x:-62.2,y:55.75,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9984,scaleY:0.9984,rotation:-90.486,x:-39.75,y:132.2,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.9083,x:-41.2,y:141.15,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-85.1186,x:-57.1,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-10.9685,x:-19.3,y:92.05,regY:-46.2,regX:2.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:102.0796,y:-26.6,x:45.15,regX:-34}},{t:this.instance_13,p:{regX:-40.6,rotation:69.8443,x:30.2,y:48.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:96.0729,x:58.55,y:123.7}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:56.5327,x:53.95,y:133.65,regY:3.1}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-5.1612,x:12.95,y:94.1,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:5.2876,x:16.3,y:189.7}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.7217,y:-58.05,regY:8.8,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{regX:2.9,regY:-54.6,scaleX:0.9981,scaleY:0.9981,rotation:7.083,x:-4.3,y:187.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:9.6957,x:-1.05,y:-79.35,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.8019,x:-61.75,y:55.65,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9984,scaleY:0.9984,rotation:-91.1254,x:-38.4,y:132,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-114.5576,x:-39.75,y:140.9,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-85.4648,x:-57.1,y:-23.2,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-9.3821,x:-18.85,y:92.1,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:102.569,y:-26.6,x:45.2,regX:-34}},{t:this.instance_13,p:{regX:-40.6,rotation:69.6362,x:29.55,y:48.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:97.3833,x:58.2,y:123.4}},{t:this.instance_11,p:{regX:-5,scaleX:0.9983,scaleY:0.9983,rotation:58.06,x:53.3,y:133.4,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-6.3784,x:12.45,y:94.25,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:3.1235,x:18,y:189.85}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.8485,y:-57.95,regY:8.8,x:-4.75,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.6,scaleX:0.9982,scaleY:0.9982,rotation:8.2743,x:-6.6,y:188.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:9.8438,x:-0.9,y:-79.4,regX:1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.4358,x:-61.25,y:55.75,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-91.7675,x:-37.05,y:131.75,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-115.2055,x:-38.45,y:140.7,regY:-1.7}},{t:this.instance,p:{regY:0.2,rotation:-85.8116,x:-57.15,y:-23.15,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-7.7951,x:-18.6,y:92.2,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:103.0576,y:-26.5,x:45.15,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:69.4284,x:28.95,y:48.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:98.6966,x:57.8,y:123.25}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:59.5888,x:52.65,y:132.85,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9978,scaleY:0.9978,rotation:-7.5957,x:12.05,y:94.55,regX:-1,regY:1.9}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:0.9577,x:19.5,y:189.9}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.9753,y:-58,regY:8.8,x:-4.75,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:9.4658,x:-8.95,y:188.55}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:9.993,x:-1,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.0694,x:-60.75,y:55.8,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-92.4089,x:-35.8,y:131.55,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-115.8559,x:-37,y:140.55,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-86.1575,x:-57.15,y:-23.2,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-6.2086,x:-18.3,y:92.3,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:103.5477,y:-26.65,x:45.15,regX:-34}},{t:this.instance_13,p:{regX:-40.6,rotation:69.2208,x:28.3,y:47.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.8,scaleX:0.9984,scaleY:0.9984,rotation:100.0092,x:57.6,y:123}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:61.117,x:52.05,y:132.65,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-8.8122,x:11.6,y:94.55,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-1.204,x:21.1,y:189.8}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.1029,y:-58.05,regY:8.8,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:10.6577,x:-11.45,y:188.85}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:10.1425,x:-0.95,y:-79.45,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.7023,x:-60.25,y:55.8,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-93.0507,x:-34.45,y:131.2,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-116.5039,x:-35.5,y:140.25,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-86.5041,x:-57.15,y:-23.2,scaleX:0.9984,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-4.6234,x:-18.05,y:92.3,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:104.0377,y:-26.6,x:45.15,regX:-34}},{t:this.instance_13,p:{regX:-40.6,rotation:69.0127,x:27.65,y:47.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:101.3211,x:57.05,y:122.75}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:62.6434,x:51.5,y:132.25,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9978,scaleY:0.9978,rotation:-10.0289,x:11.1,y:94.7,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.4,regY:-54.1,scaleX:0.9978,scaleY:0.9978,rotation:-3.3701,x:22.85,y:189.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.2305,y:-58.05,regY:8.8,x:-4.8,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:11.8483,x:-13.85,y:189.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:10.2893,x:-0.85,y:-79.35,regX:1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.3365,x:-59.8,y:55.9,regX:39.6,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-93.6912,x:-33.1,y:130.95,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-117.1531,x:-34.05,y:140.05,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-86.8514,x:-57.2,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-3.0375,x:-17.75,y:92.55,regY:-46.1,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:104.5275,y:-26.4,x:45.15,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:68.8058,x:27,y:47.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:102.6333,x:56.75,y:122.5}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:64.1717,x:50.9,y:131.9,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-11.2463,x:10.75,y:94.85,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-5.5358,x:24.35,y:189.7}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.3583,y:-58.2,regY:8.7,x:-4.8,regX:-0.8}},{t:this.instance_6,p:{regX:2.9,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:13.0403,x:-16.4,y:189.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:10.4386,x:-0.85,y:-79.45,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.97,x:-59.35,y:55.85,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-94.3329,x:-31.75,y:130.65,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-117.802,x:-32.65,y:139.75,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-87.1977,x:-57.15,y:-23.15,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.4503,x:-17.45,y:92.55,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:105.0157,y:-26.45,x:45.1,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:68.5976,x:26.35,y:47.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:103.9451,x:56.4,y:122.2}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:65.7004,x:50.35,y:131.4,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-12.4631,x:10.35,y:95,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-7.7005,x:25.9,y:189.55}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.4851,y:-58.2,regY:8.7,x:-4.9,regX:-0.9}},{t:this.instance_6,p:{regX:2.9,regY:-54.6,scaleX:0.9982,scaleY:0.9982,rotation:14.2319,x:-18.75,y:189.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:10.5873,x:-0.85,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.6037,x:-58.95,y:55.8,regX:39.8,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-94.9726,x:-30.45,y:130.5,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-118.4501,x:-31.25,y:139.45,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-87.5449,x:-57.15,y:-23.15,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:0.1314,x:-17.2,y:92.6,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:105.5067,y:-26.4,x:45.2,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:68.3897,x:25.8,y:47.35,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:105.2576,x:56,y:122.05}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:67.2285,x:49.75,y:131.05,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-13.6794,x:9.85,y:95.2,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54.1,scaleX:0.9978,scaleY:0.9978,rotation:-9.8658,x:27.4,y:189.15}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.6128,y:-58.2,regY:8.7,x:-4.8,regX:-0.8}},{t:this.instance_6,p:{regX:3,regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:15.4234,x:-21,y:189.3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:10.7368,x:-0.65,y:-79.35,regX:1}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.2379,x:-58.45,y:55.75,regX:39.8,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-95.6154,x:-29.2,y:130.2,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-119.0983,x:-29.8,y:139.15,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-87.8901,x:-57.2,y:-23.1,scaleX:0.9985,scaleY:0.9985,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7175,x:-16.9,y:92.65,regY:-46.2,regX:2.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:105.9963,y:-26.45,x:45.2,regX:-33.9}},{t:this.instance_13,p:{regX:-40.6,rotation:68.1825,x:25.2,y:47.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regX:-6.4,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:106.5687,x:55.65,y:121.55}},{t:this.instance_11,p:{regX:-5.1,scaleX:0.9983,scaleY:0.9983,rotation:68.7561,x:49.15,y:130.6,regY:3.2}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-14.8957,x:9.45,y:95.3,regX:-1,regY:1.8}},{t:this.instance_9,p:{regX:2.3,regY:-54.1,scaleX:0.9978,scaleY:0.9978,rotation:-12.0299,x:29,y:188.85}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.7397,y:-58.1,regY:8.8,x:-4.9,regX:-0.9}},{t:this.instance_6,p:{regX:2.9,regY:-54.5,scaleX:0.9981,scaleY:0.9981,rotation:16.6154,x:-23.6,y:189.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:10.8867,x:-0.75,y:-79.4,regX:0.9}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.8707,x:-57.9,y:55.9,regX:39.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-96.2556,x:-27.9,y:129.95,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-119.7474,x:-28.45,y:138.95,regY:-1.6}},{t:this.instance,p:{regY:0.2,rotation:-88.2371,x:-57.25,y:-23.1,scaleX:0.9984,scaleY:0.9984,regX:35.8}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93.2,-224.2,196.10000000000002,529);


(lib.Tween2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CharacterBad_03();
	this.instance.setTransform(-770.4,-170.4,0.4679,0.4678,0,0,0,-2.6,48.8);

	this.instance_1 = new lib.CharacterBad_01();
	this.instance_1.setTransform(-750.25,-248.25,0.4659,0.4658,0,0,0,-39.1,6.2);

	this.instance_2 = new lib.CharacterBad_02();
	this.instance_2.setTransform(-859.55,-247.6,0.4382,0.438,0,0,0,-14.4,36.6);

	this.instance_3 = new lib.CharacterBad_04();
	this.instance_3.setTransform(-822,-298.5,0.4296,0.4295,0,0,0,-39.6,49.8);

	this.instance_4 = new lib.CharacterBad_02();
	this.instance_4.setTransform(-334.45,-78.85,0.636,0.6361,0,0,0,-13.8,36);

	this.instance_5 = new lib.CharacterBad_01();
	this.instance_5.setTransform(-208.05,-50.05,0.6673,0.6674,0,0,0,-38.9,6);

	this.instance_6 = new lib.CharacterBad_03();
	this.instance_6.setTransform(-237.15,-137.75,0.636,0.6361,0,0,0,-2.5,48.4);

	this.instance_7 = new lib.CharacterBad_02();
	this.instance_7.setTransform(-306.95,-253.9,0.5377,0.5378,0,0,0,-13.8,36);

	this.instance_8 = new lib.CharacterBad_04();
	this.instance_8.setTransform(-475.9,-106.1,0.5887,0.5889,0,0,0,-39.6,49);

	this.instance_9 = new lib.CharacterBad_03();
	this.instance_9.setTransform(-394.7,-185.55,0.5642,0.5643,0,0,0,-2.6,48.4);

	this.instance_10 = new lib.CharacterBad_04();
	this.instance_10.setTransform(-7.3,-12.5,0.7099,0.7101,0,0,0,-39.5,49.4);

	this.instance_11 = new lib.CharacterBad_02();
	this.instance_11.setTransform(631.65,157.95,1.0305,1.0305,0,0,0,-14.1,36);

	this.instance_12 = new lib.CharacterBad_04();
	this.instance_12.setTransform(526.85,48.25,0.9316,0.9316,0,0,0,-39.1,49.4);

	this.instance_13 = new lib.CharacterBad_04();
	this.instance_13.setTransform(720.9,84.2,0.9926,0.9926,0,0,0,-39.5,49);

	this.instance_14 = new lib.CharacterBad_01();
	this.instance_14.setTransform(383.3,44.45,0.9049,0.9049,0,0,0,-39.2,5.9);

	this.instance_15 = new lib.CharacterBad_03();
	this.instance_15.setTransform(653.15,-30.55,0.8995,0.8995,0,0,0,-2.9,48.4);

	this.instance_16 = new lib.CharacterBad_03();
	this.instance_16.setTransform(501.1,-53.85,0.8728,0.8728,0,0,0,-2.6,48.4);

	this.instance_17 = new lib.CharacterBad_01();
	this.instance_17.setTransform(759.8,-178.2,0.844,0.844,0,0,0,-39.1,6.1);

	this.instance_18 = new lib.CharacterBad_01();
	this.instance_18.setTransform(-502.1,-278.7,0.5153,0.5154,0,0,0,-38.8,6.2);

	this.instance_19 = new lib.CharacterBad_03();
	this.instance_19.setTransform(308.15,0.7,0.8244,0.8245,0,0,0,-2.8,48.2);

	this.instance_20 = new lib.CharacterBad_03();
	this.instance_20.setTransform(169.9,-23.45,0.7518,0.752,0,0,0,-2.6,48.5);

	this.instance_21 = new lib.CharacterBad_04();
	this.instance_21.setTransform(396.35,-186,0.7816,0.7816,0,0,0,-39.3,49.2);

	this.instance_22 = new lib.CharacterBad_02();
	this.instance_22.setTransform(263.2,-124.7,0.8077,0.8077,0,0,0,-14.1,36.1);

	this.instance_23 = new lib.CharacterBad_03();
	this.instance_23.setTransform(100.25,-116.4,0.687,0.6872,0,0,0,-2.7,48.5);

	this.instance_24 = new lib.CharacterBad_02();
	this.instance_24.setTransform(-79.35,-77.45,0.687,0.6872,0,0,0,-14.1,36.1);

	this.instance_25 = new lib.CharacterBad_04();
	this.instance_25.setTransform(-180.85,-224.4,0.5965,0.5966,0,0,0,-39.3,49);

	this.instance_26 = new lib.CharacterBad_01();
	this.instance_26.setTransform(-582.7,-115.6,0.5886,0.5884,0,0,0,-39.1,6.1);

	this.instance_27 = new lib.CharacterBad_04();
	this.instance_27.setTransform(-670.2,-157.6,0.5155,0.5154,0,0,0,-39.5,49.6);

	this.instance_28 = new lib.CharacterBad_03();
	this.instance_28.setTransform(-586.6,-249.25,0.4827,0.4825,0,0,0,-2.3,48.7);

	this.instance_29 = new lib.CharacterBad_02();
	this.instance_29.setTransform(-658.05,-322.9,0.4631,0.463,0,0,0,-14.2,36.3);

	this.instance_30 = new lib.CharacterBad_01();
	this.instance_30.setTransform(6.1,-220.35,0.6316,0.6317,0,0,0,-39.2,6.2);

	this.instance_31 = new lib.CharacterBad_04();
	this.instance_31.setTransform(137.15,-254.45,0.5876,0.5877,0,0,0,-39.3,49.5);

	this.instance_32 = new lib.CharacterBad_02();
	this.instance_32.setTransform(-62,-287.6,0.5376,0.5378,0,0,0,-13.8,36.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-891.2,-439.8,1770.9,872.3);


// stage content:
(lib.LessonChapter3_03 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,141];
	this.streamSoundSymbolsList[0] = [{id:"AfterWar203wav",startFrame:0,endFrame:142,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("AfterWar203wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,142,1);
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
			document.location.replace("/LessonChapter3_04.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("/LessonChapter3_02.html");
			}, 500);
		
		}
		
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_141 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(141).call(this.frame_141).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_2575();
	this.instance.setTransform(182.8,614.4,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2574();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(142));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(142));

	// interaction
	this.instance_2 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_2.setTransform(888.05,295.65,0.548,0.548,0,96.6497,-83.3503,36,-0.4);

	this.instance_3 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_3.setTransform(853.05,377.8,0.5478,0.5478,0,144.823,-35.177,6.4,-2);

	this.instance_4 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_4.setTransform(854.15,373.05,0.5479,0.5479,0,112.3347,-67.6653,5,-9.4);

	this.instance_5 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_5.setTransform(882.1,338.85,0.5479,0.5479,0,130.112,-49.888,39.8,0.4);

	this.instance_6 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_6.setTransform(852.65,266.7,0.5483,0.5483,0,-16.1427,163.8568,1.1,53.2);

	this.instance_7 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_7.setTransform(860.7,297.25,0.549,0.549,0,0,180,-0.6,-23.5);

	this.instance_8 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_8.setTransform(874.65,411.7,0.5479,0.5479,0,-12.7086,167.2914,2.4,-53.8);

	this.instance_9 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_9.setTransform(859.2,276.65,0.5483,0.5483,0,-31.9097,148.0903,-0.8,9.2);

	this.instance_10 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_10.setTransform(859.7,334.8,0.549,0.549,0,0,180,-0.8,-22.9);

	this.instance_11 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_11.setTransform(836.95,411.1,0.5477,0.5477,0,6.8936,-173.1064,3.6,-53.6);

	this.instance_12 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_12.setTransform(848.85,360,0.5476,0.5476,0,15.3873,-164.6127,-1.3,2.4);

	this.instance_13 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_13.setTransform(835.55,382.35,0.5479,0.5479,0,-41.1065,138.8935,-4.7,3.6);

	this.instance_14 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_14.setTransform(835.8,376.1,0.5479,0.5479,0,-67.4377,112.5623,-5.7,8.2);

	this.instance_15 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_15.setTransform(846.2,333.6,0.548,0.548,0,-76.6255,103.3745,-39.3,-0.7);

	this.instance_16 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_16.setTransform(831.75,294.2,0.548,0.548,0,-110.6948,69.3052,-33,-0.5);

	this.instance_17 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_17.setTransform(867.65,358.75,0.548,0.548,0,-5.237,174.763,1.9,-46);

	this.instance_18 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_18.setTransform(765.45,336.1,0.5704,0.5704,0,88.1713,-91.8287,35,-0.1);

	this.instance_19 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_19.setTransform(749.3,428.7,0.5701,0.5701,0,119.1904,-60.8096,5.5,-2.4);

	this.instance_20 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_20.setTransform(748.9,423.6,0.5704,0.5704,0,95.841,-84.159,4.7,-9.1);

	this.instance_21 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_21.setTransform(765.95,381.2,0.5703,0.5703,0,112.611,-67.389,39,0.5);

	this.instance_22 = new lib.ch1_headcopy_1("synched",0);
	this.instance_22.setTransform(733.25,303.85,0.5707,0.5707,0,-10.9545,169.0455,0.4,53.1);

	this.instance_23 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_23.setTransform(737.05,337.5,0.5713,0.5713,0,0,180,-0.7,-23.4);

	this.instance_24 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_24.setTransform(746.3,457.35,0.5703,0.5703,0,-16.7922,163.2078,2.8,-53.8);

	this.instance_25 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_25.setTransform(735.45,316,0.5707,0.5707,0,-9.8245,170.1755,-1,9.3);

	this.instance_26 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_26.setTransform(736,376.6,0.5713,0.5713,0,0,180,-0.5,-22.5);

	this.instance_27 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_27.setTransform(716.35,457.25,0.5701,0.5701,0,11.5794,-168.4206,1.7,-53.3);

	this.instance_28 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_28.setTransform(727.45,403.75,0.57,0.57,0,14.7122,-165.2878,-1.7,2.6);

	this.instance_29 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_29.setTransform(704.65,423.85,0.5703,0.5703,0,-68.8388,111.1612,-4.5,3.9);

	this.instance_30 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_30.setTransform(701,418.65,0.5704,0.5704,0,-106.5021,73.4979,-5.6,8);

	this.instance_31 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_31.setTransform(718.45,376.2,0.5704,0.5704,0,-68.167,111.833,-40,0.3);

	this.instance_32 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_32.setTransform(707,334.15,0.5703,0.5703,0,-106.0168,73.9832,-33.3,0.2);

	this.instance_33 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_33.setTransform(742.4,402.15,0.5704,0.5704,0,-1.8351,178.1649,1.8,-45.4);

	this.instance_34 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_34.setTransform(593.45,341.75,0.6099,0.6099,0,85.0267,-94.9733,35.1,-0.4);

	this.instance_35 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_35.setTransform(586.95,443.45,0.6097,0.6097,0,103.4791,-76.5209,5.8,-2.2);

	this.instance_36 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_36.setTransform(588.55,438.35,0.6098,0.6098,0,113.7368,-66.2632,5.2,-9.9);

	this.instance_37 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_37.setTransform(597.65,389.4,0.6099,0.6099,0,100.3873,-79.6127,40,-1);

	this.instance_38 = new lib.ch1_headcopy2("synched",0);
	this.instance_38.setTransform(558.85,307.25,0.6102,0.6102,0,-10.3939,169.6061,0.1,53.1);

	this.instance_39 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_39.setTransform(562.75,343.3,0.6109,0.6109,0,0,180,-0.8,-23.4);

	this.instance_40 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_40.setTransform(549.95,464.75,0.6096,0.6096,0,11.9184,-168.0816,2.4,-53.6);

	this.instance_41 = new lib.ch1_neckcopy2("synched",0);
	this.instance_41.setTransform(561.4,320.15,0.6102,0.6102,0,-10.1699,169.8301,-1.6,9.1);

	this.instance_42 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_42.setTransform(561.7,385.2,0.6109,0.6109,0,0,180,-1.1,-22.4);

	this.instance_43 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_43.setTransform(559.6,470.45,0.6092,0.6092,0,-36.4529,143.5471,3.6,-52.5);

	this.instance_44 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_44.setTransform(548.65,412.75,0.6094,0.6094,0,-7.7996,172.2004,-0.1,2.5);

	this.instance_45 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_45.setTransform(521.55,440.4,0.6097,0.6097,0,-60.4506,119.5494,-5,3.6);

	this.instance_46 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_46.setTransform(519.65,433.65,0.6099,0.6099,0,-84.7463,95.2537,-5.5,8.2);

	this.instance_47 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_47.setTransform(531.9,386.35,0.6098,0.6098,0,-75.6529,104.3471,-39.5,-0.4);

	this.instance_48 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_48.setTransform(530.5,339.9,0.6099,0.6099,0,-92.6744,87.3256,-32.4,0.2);

	this.instance_49 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_49.setTransform(574,410.8,0.6095,0.6095,0,26.6581,-153.3419,1.3,-45.6);

	this.instance_50 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_50.setTransform(69,480.05,0.8917,0.8917,0,96.6559,-83.3441,36.1,0.1);

	this.instance_51 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_51.setTransform(12.2,613.75,0.8914,0.8914,0,144.8191,-35.1809,6.3,-1.9);

	this.instance_52 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_52.setTransform(13.85,606,0.8915,0.8915,0,112.3384,-67.6616,5,-8.9);

	this.instance_53 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_53.setTransform(59.4,550.3,0.8915,0.8915,0,130.1146,-49.8854,39.9,0.7);

	this.instance_54 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_54.setTransform(11.7,433.15,0.8922,0.8922,0,-16.1515,163.8483,1.2,53.1);

	this.instance_55 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_55.setTransform(24.4,482.55,0.8932,0.8932,0,0,180,-0.1,-24);

	this.instance_56 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_56.setTransform(47.35,668.75,0.8915,0.8915,0,-12.7187,167.2813,2.9,-54.1);

	this.instance_57 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_57.setTransform(22.25,449.05,0.8921,0.8921,0,-31.913,148.087,-0.8,9);

	this.instance_58 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_58.setTransform(22.75,543.65,0.8932,0.8932,0,0,180,-0.1,-23.3);

	this.instance_59 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_59.setTransform(-14,667.9,0.8911,0.8911,0,6.899,-173.101,4,-53.6);

	this.instance_60 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_60.setTransform(5.2,584.6,0.8911,0.8911,0,15.3954,-164.6046,-0.9,2.1);

	this.instance_61 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_61.setTransform(-16.25,620.9,0.8915,0.8915,0,-41.1054,138.8946,-4.7,3.2);

	this.instance_62 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_62.setTransform(-15.9,611,0.8915,0.8915,0,-67.433,112.567,-5.9,7.8);

	this.instance_63 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_63.setTransform(0.85,541.55,0.8916,0.8916,0,-76.6187,103.3813,-39.7,-1.2);

	this.instance_64 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_64.setTransform(-22.6,477.5,0.8916,0.8916,0,-110.6994,69.3006,-33.5,-0.8);

	this.instance_65 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_65.setTransform(36,582.5,0.8916,0.8916,0,-5.2465,174.7535,2,-46.4);

	this.instance_66 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_66.setTransform(259.45,412.7,0.7883,0.7883,0,88.1619,-91.8381,35.6,0.2);

	this.instance_67 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_67.setTransform(237.15,540.75,0.7879,0.7879,0,119.1945,-60.8055,5.9,-1.9);

	this.instance_68 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_68.setTransform(236.65,533.7,0.7882,0.7882,0,95.8517,-84.1483,5,-8.8);

	this.instance_69 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_69.setTransform(260.15,475.1,0.7881,0.7881,0,112.619,-67.381,39.4,0.9);

	this.instance_70 = new lib.ch1_headcopy_1("synched",0);
	this.instance_70.setTransform(214.8,368.25,0.7887,0.7887,0,-10.9651,169.0349,0.8,52.8);

	this.instance_71 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_71.setTransform(220.05,414.65,0.7895,0.7895,0,0,180,-0.2,-23.8);

	this.instance_72 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_72.setTransform(233.05,580.25,0.788,0.788,0,-16.7988,163.2012,2.9,-54.2);

	this.instance_73 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_73.setTransform(218.2,384.9,0.7887,0.7887,0,-9.8286,170.1714,-1,9.1);

	this.instance_74 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_74.setTransform(218.65,468.75,0.7895,0.7895,0,0,180,-0.1,-22.9);

	this.instance_75 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_75.setTransform(191.65,580.15,0.7878,0.7878,0,11.5885,-168.4115,2.1,-53.8);

	this.instance_76 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_76.setTransform(206.85,506.15,0.7877,0.7877,0,14.7176,-165.2824,-1.2,2.1);

	this.instance_77 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_77.setTransform(175.5,534.1,0.7882,0.7882,0,-68.8347,111.1653,-4.8,3.5);

	this.instance_78 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_78.setTransform(170.3,526.95,0.7882,0.7882,0,-106.5083,73.4917,-6,7.9);

	this.instance_79 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_79.setTransform(194.45,468.15,0.7882,0.7882,0,-68.1621,111.8379,-40.4,-0.3);

	this.instance_80 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_80.setTransform(178.6,410.05,0.7882,0.7882,0,-106.023,73.977,-33.6,-0.1);

	this.instance_81 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_81.setTransform(227.7,504,0.7882,0.7882,0,-1.8449,178.1551,2,-46);

	this.instance_82 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_82.setTransform(995.7,268,0.506,0.506,0,85.0333,-94.9667,34.5,-0.3);

	this.instance_83 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_83.setTransform(990.4,352.5,0.5059,0.5059,0,103.4691,-76.5309,5.2,-2.4);

	this.instance_84 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_84.setTransform(991.85,348.15,0.5059,0.5059,0,113.7314,-66.2686,5.3,-10.8);

	this.instance_85 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_85.setTransform(999.3,307.55,0.5061,0.5061,0,100.3829,-79.6171,39.6,-1.5);

	this.instance_86 = new lib.ch1_headcopy2("synched",0);
	this.instance_86.setTransform(966.95,239.4,0.5063,0.5063,0,-10.3915,169.6085,0.1,53.2);

	this.instance_87 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_87.setTransform(970.35,269.2,0.5069,0.5069,0,0,180,-1.4,-23.1);

	this.instance_88 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_88.setTransform(959.65,370.1,0.5058,0.5058,0,11.908,-168.092,2.2,-53.3);

	this.instance_89 = new lib.ch1_neckcopy2("synched",0);
	this.instance_89.setTransform(969.1,250.1,0.5063,0.5063,0,-10.1689,169.8311,-1.4,9.4);

	this.instance_90 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_90.setTransform(969.35,304.05,0.5069,0.5069,0,0,180,-1,-21.9);

	this.instance_91 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_91.setTransform(967.6,374.85,0.5055,0.5055,0,-36.4489,143.5511,3.9,-52.3);

	this.instance_92 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_92.setTransform(958.55,326.9,0.5056,0.5056,0,-7.7946,172.2054,-0.2,3.1);

	this.instance_93 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_93.setTransform(936.1,349.9,0.5059,0.5059,0,-60.4512,119.5488,-4.4,4.2);

	this.instance_94 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_94.setTransform(934.45,344.3,0.5061,0.5061,0,-84.7529,95.2471,-5.3,8.2);

	this.instance_95 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_95.setTransform(944.9,305.05,0.506,0.506,0,-75.6578,104.3422,-39,0.2);

	this.instance_96 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_96.setTransform(943.5,266.45,0.506,0.506,0,-92.6686,87.3314,-32.1,0.4);

	this.instance_97 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_97.setTransform(979.55,325.3,0.5057,0.5057,0,26.654,-153.346,0.8,-45.1);

	this.instance_98 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_98.setTransform(669.8,294.25,0.5894,0.5894,0,96.6441,-83.3559,35.6,-1.1);

	this.instance_99 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_99.setTransform(632.15,382.5,0.5891,0.5891,0,144.8236,-35.1764,6.5,-2.4);

	this.instance_100 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_100.setTransform(633.4,377.55,0.5892,0.5892,0,112.3296,-67.6704,4.7,-10);

	this.instance_101 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_101.setTransform(663.4,340.85,0.5892,0.5892,0,130.1112,-49.8888,39.8,-0.5);

	this.instance_102 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_102.setTransform(631.75,263.2,0.5897,0.5897,0,-16.1393,163.8607,0.8,53.7);

	this.instance_103 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_103.setTransform(640.2,295.85,0.5904,0.5904,0,0,180,-1.2,-23.4);

	this.instance_104 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_104.setTransform(655.4,419,0.5892,0.5892,0,-12.7063,167.2937,2.1,-53.2);

	this.instance_105 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_105.setTransform(638.7,273.65,0.5896,0.5896,0,-31.9046,148.0954,-0.9,9.5);

	this.instance_106 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_106.setTransform(639.15,336.3,0.5904,0.5904,0,0,180,-0.7,-22.6);

	this.instance_107 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_107.setTransform(614.85,418.4,0.589,0.589,0,6.8892,-173.1108,3.1,-53.1);

	this.instance_108 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_108.setTransform(627.5,363.4,0.589,0.589,0,15.3832,-164.6168,-1.5,2.6);

	this.instance_109 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_109.setTransform(613.3,387.35,0.5892,0.5892,0,-41.102,138.898,-4.7,4);

	this.instance_110 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_110.setTransform(613.7,380.8,0.5893,0.5893,0,-67.4426,112.5574,-5.8,8.6);

	this.instance_111 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_111.setTransform(624.65,334.8,0.5893,0.5893,0,-76.6291,103.3709,-39.4,-0.4);

	this.instance_112 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_112.setTransform(609.1,292.45,0.5893,0.5893,0,-110.693,69.307,-32.9,-0.4);

	this.instance_113 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_113.setTransform(647.8,361.9,0.5893,0.5893,0,-5.2322,174.7678,1.5,-46);

	this.instance_114 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_114.setTransform(1263.15,220.45,0.4023,0.4023,0,77.7724,-102.2276,34.3,-0.1);

	this.instance_115 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_115.setTransform(1260.3,285.05,0.4022,0.4022,0,99.6878,-80.3122,5,-2.3);

	this.instance_116 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_116.setTransform(1258.4,282,0.4023,0.4023,0,67.4047,-112.5953,4,-8.9);

	this.instance_117 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_117.setTransform(1269.95,251.4,0.4023,0.4023,0,109.9911,-70.0089,39.4,-1.4);

	this.instance_118 = new lib.ch1_headcopy("synched",0);
	this.instance_118.setTransform(1240.15,197.6,0.4025,0.4025,0,-12.9611,167.0389,0.7,53.8);

	this.instance_119 = new lib.ch1_uBodycopy("synched",0);
	this.instance_119.setTransform(1243.05,221.45,0.403,0.403,0,0,180,-1.1,-22.9);

	this.instance_120 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_120.setTransform(1236.4,303.4,0.4021,0.4021,0,17.6291,-162.3709,1.4,-53.5);

	this.instance_121 = new lib.ch1_neckcopy("synched",0);
	this.instance_121.setTransform(1242.05,206.15,0.4025,0.4025,0,-9.2027,170.7973,-1.8,10.1);

	this.instance_122 = new lib.ch1_lBodycopy("synched",0);
	this.instance_122.setTransform(1242.2,249.1,0.403,0.403,0,0,180,-0.8,-21.9);

	this.instance_123 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_123.setTransform(1235.95,307.15,0.4019,0.4019,0,-30.7052,149.2948,3.8,-52.3);

	this.instance_124 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_124.setTransform(1236.55,268.55,0.402,0.402,0,3.3661,-176.6339,-1.3,3.4);

	this.instance_125 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_125.setTransform(1211.95,284.6,0.4023,0.4023,0,-90.276,89.724,-2.9,3.6);

	this.instance_126 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_126.setTransform(1209.3,281,0.4023,0.4023,0,-109.9829,70.0171,-4.2,8);

	this.instance_127 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_127.setTransform(1215.75,249.2,0.4023,0.4023,0,-78.6479,101.3521,-39.2,0.1);

	this.instance_128 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_128.setTransform(1221.8,219.4,0.4023,0.4023,0,-79.4854,100.5146,-31.9,0.5);

	this.instance_129 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_129.setTransform(1248.95,266.45,0.4021,0.4021,0,21.1365,-158.8635,0.6,-45.4);

	this.instance_130 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_130.setTransform(1292.25,111.75,0.3722,0.3722,0,85.0354,-94.9646,34.8,-0.3);

	this.instance_131 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_131.setTransform(1288.3,173.9,0.3721,0.3721,0,103.4692,-76.5308,5.2,-2.4);

	this.instance_132 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_132.setTransform(1289.3,170.7,0.3721,0.3721,0,113.7301,-66.2699,5,-10.1);

	this.instance_133 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_133.setTransform(1294.9,140.85,0.3722,0.3722,0,100.3794,-79.6206,39.9,-0.8);

	this.instance_134 = new lib.ch1_headcopy2("synched",0);
	this.instance_134.setTransform(1271.05,90.7,0.3724,0.3724,0,-10.3882,169.6118,0.1,53.2);

	this.instance_135 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_135.setTransform(1273.5,112.65,0.3728,0.3728,0,0,180,-0.8,-23.4);

	this.instance_136 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_136.setTransform(1265.75,186.9,0.372,0.372,0,11.9114,-168.0886,2.1,-53);

	this.instance_137 = new lib.ch1_neckcopy2("synched",0);
	this.instance_137.setTransform(1272.7,98.55,0.3724,0.3724,0,-10.1644,169.8356,-1.6,9.4);

	this.instance_138 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_138.setTransform(1272.9,138.25,0.3728,0.3728,0,0,180,-1,-22);

	this.instance_139 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_139.setTransform(1271.6,190.35,0.3718,0.3718,0,-36.448,143.552,3.9,-52.2);

	this.instance_140 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_140.setTransform(1265,155.1,0.3719,0.3719,0,-7.7907,172.2093,-0.4,3.1);

	this.instance_141 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_141.setTransform(1248.4,172,0.3721,0.3721,0,-60.4527,119.5473,-4.6,4);

	this.instance_142 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_142.setTransform(1247.25,167.85,0.3722,0.3722,0,-84.7552,95.2448,-5.2,8.3);

	this.instance_143 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_143.setTransform(1254.8,138.95,0.3722,0.3722,0,-75.6578,104.3422,-39.4,-0.2);

	this.instance_144 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_144.setTransform(1253.95,110.65,0.3722,0.3722,0,-92.6646,87.3354,-32.2,0.5);

	this.instance_145 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_145.setTransform(1280.45,153.9,0.372,0.372,0,26.6523,-153.3477,1,-45.4);

	this.instance_146 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_146.setTransform(1162.3,228.2,0.4447,0.4447,0,85.0311,-94.9689,35,-0.4);

	this.instance_147 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_147.setTransform(1157.55,302.4,0.4445,0.4445,0,103.4719,-76.5281,5.7,-2);

	this.instance_148 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_148.setTransform(1158.75,298.6,0.4446,0.4446,0,113.7337,-66.2663,5.2,-10.2);

	this.instance_149 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_149.setTransform(1165.35,262.95,0.4447,0.4447,0,100.3845,-79.6155,39.9,-0.7);

	this.instance_150 = new lib.ch1_headcopy2("synched",0);
	this.instance_150.setTransform(1137,203.05,0.4449,0.4449,0,-10.3989,169.6011,0.1,53.1);

	this.instance_151 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_151.setTransform(1139.85,229.25,0.4454,0.4454,0,0,180,-0.7,-23.6);

	this.instance_152 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_152.setTransform(1130.6,317.95,0.4444,0.4444,0,11.9145,-168.0855,2.3,-53.4);

	this.instance_153 = new lib.ch1_neckcopy2("synched",0);
	this.instance_153.setTransform(1138.95,212.4,0.4449,0.4449,0,-10.1699,169.8301,-1.6,9.3);

	this.instance_154 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_154.setTransform(1139.1,259.85,0.4454,0.4454,0,0,180,-0.9,-22.4);

	this.instance_155 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_155.setTransform(1137.6,322.05,0.4442,0.4442,0,-36.4507,143.5493,3.8,-52.5);

	this.instance_156 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_156.setTransform(1129.65,279.95,0.4443,0.4443,0,-7.7964,172.2036,-0.2,2.6);

	this.instance_157 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_157.setTransform(1109.85,300.15,0.4446,0.4446,0,-60.4478,119.5522,-4.8,3.8);

	this.instance_158 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_158.setTransform(1108.45,295.3,0.4447,0.4447,0,-84.7493,95.2507,-5.2,8.2);

	this.instance_159 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_159.setTransform(1117.45,260.7,0.4446,0.4446,0,-75.6557,104.3443,-39.4,-0.3);

	this.instance_160 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_160.setTransform(1116.4,226.8,0.4446,0.4446,0,-92.671,87.329,-32.6,0.3);

	this.instance_161 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_161.setTransform(1148.1,278.55,0.4444,0.4444,0,26.6574,-153.3426,1.3,-45.5);

	this.instance_162 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_162.setTransform(942.75,201.35,0.4824,0.4824,0,77.7659,-102.2341,34.7,0.1);

	this.instance_163 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_163.setTransform(939.35,278.85,0.4823,0.4823,0,99.6951,-80.3049,5,-1.9);

	this.instance_164 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_164.setTransform(937.1,275.2,0.4823,0.4823,0,67.4012,-112.5988,4.3,-8.8);

	this.instance_165 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_165.setTransform(950.95,238.5,0.4824,0.4824,0,109.9981,-70.0019,39.7,-0.9);

	this.instance_166 = new lib.ch1_headcopy("synched",0);
	this.instance_166.setTransform(915.25,173.95,0.4827,0.4827,0,-12.9669,167.0331,0.8,53.3);

	this.instance_167 = new lib.ch1_uBodycopy("synched",0);
	this.instance_167.setTransform(918.75,202.6,0.4832,0.4832,0,0,180,-0.8,-22.9);

	this.instance_168 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_168.setTransform(910.75,300.75,0.4822,0.4822,0,17.6373,-162.3627,1.8,-53.9);

	this.instance_169 = new lib.ch1_neckcopy("synched",0);
	this.instance_169.setTransform(917.5,184.15,0.4827,0.4827,0,-9.2107,170.7893,-1.4,9.9);

	this.instance_170 = new lib.ch1_lBodycopy("synched",0);
	this.instance_170.setTransform(917.8,235.65,0.4832,0.4832,0,0,180,-0.6,-21.9);

	this.instance_171 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_171.setTransform(910.2,305.2,0.4819,0.4819,0,-30.7086,149.2914,4.1,-52.6);

	this.instance_172 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_172.setTransform(910.95,258.95,0.4821,0.4821,0,3.3753,-176.6247,-0.8,2.9);

	this.instance_173 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_173.setTransform(881.55,278.25,0.4824,0.4824,0,-90.2845,89.7155,-3,3.4);

	this.instance_174 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_174.setTransform(878.35,273.85,0.4823,0.4823,0,-109.9913,70.0087,-5,8);

	this.instance_175 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_175.setTransform(886,235.75,0.4824,0.4824,0,-78.6385,101.3615,-39.2,-0.3);

	this.instance_176 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_176.setTransform(893.25,200,0.4824,0.4824,0,-79.4778,100.5222,-31.9,0.3);

	this.instance_177 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_177.setTransform(925.75,256.55,0.4822,0.4822,0,21.1415,-158.8585,1.1,-45.5);

	this.instance_178 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_178.setTransform(810.35,237.9,0.5496,0.5496,0,77.7623,-102.2377,34.9,0.1);

	this.instance_179 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_179.setTransform(806.45,326.2,0.5495,0.5495,0,99.7003,-80.2997,5.5,-1.8);

	this.instance_180 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_180.setTransform(803.95,322.05,0.5495,0.5495,0,67.3989,-112.6011,4.5,-8.7);

	this.instance_181 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_181.setTransform(819.6,280.2,0.5496,0.5496,0,110.0006,-69.9994,39.9,-0.7);

	this.instance_182 = new lib.ch1_headcopy("synched",0);
	this.instance_182.setTransform(778.95,206.7,0.5499,0.5499,0,-12.9716,167.0284,1,53.1);

	this.instance_183 = new lib.ch1_uBodycopy("synched",0);
	this.instance_183.setTransform(782.95,239.35,0.5506,0.5506,0,0,180,-0.7,-23.4);

	this.instance_184 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_184.setTransform(773.9,351.25,0.5493,0.5493,0,17.6403,-162.3597,1.9,-53.9);

	this.instance_185 = new lib.ch1_neckcopy("synched",0);
	this.instance_185.setTransform(781.55,218.35,0.5499,0.5499,0,-9.2143,170.7857,-1.4,9.2);

	this.instance_186 = new lib.ch1_lBodycopy("synched",0);
	this.instance_186.setTransform(781.8,277,0.5506,0.5506,0,0,180,-0.4,-22.4);

	this.instance_187 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_187.setTransform(773.15,356.2,0.5491,0.5491,0,-30.709,149.291,4,-53.1);

	this.instance_188 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_188.setTransform(774.05,303.5,0.5492,0.5492,0,3.3798,-176.6202,-0.6,2.7);

	this.instance_189 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_189.setTransform(740.5,325.5,0.5497,0.5497,0,-90.2879,89.7121,-3.5,3.1);

	this.instance_190 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_190.setTransform(736.9,320.5,0.5496,0.5496,0,-109.9947,70.0053,-5.2,8);

	this.instance_191 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_191.setTransform(745.6,277.1,0.5496,0.5496,0,-78.637,101.363,-39.8,-0.6);

	this.instance_192 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_192.setTransform(753.9,236.4,0.5496,0.5496,0,-79.4756,100.5244,-32.4,0.1);

	this.instance_193 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_193.setTransform(790.95,300.85,0.5494,0.5494,0,21.1422,-158.8578,1.2,-45.5);

	this.instance_194 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_194.setTransform(464.35,329.3,0.6476,0.6476,0,77.7578,-102.2422,35.1,0.2);

	this.instance_195 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_195.setTransform(459.8,433.3,0.6475,0.6475,0,99.705,-80.295,6,-1.4);

	this.instance_196 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_196.setTransform(456.9,428.45,0.6475,0.6475,0,67.3957,-112.6043,4.7,-8.6);

	this.instance_197 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_197.setTransform(475.25,379.25,0.6475,0.6475,0,110.0072,-69.9928,39.8,-0.6);

	this.instance_198 = new lib.ch1_headcopy("synched",0);
	this.instance_198.setTransform(427.5,292.6,0.6479,0.6479,0,-12.9762,167.0238,1,52.9);

	this.instance_199 = new lib.ch1_uBodycopy("synched",0);
	this.instance_199.setTransform(432,331.1,0.6487,0.6487,0,0,180,-0.4,-23.6);

	this.instance_200 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_200.setTransform(421.35,462.75,0.6473,0.6473,0,17.6464,-162.3536,2.4,-54.2);

	this.instance_201 = new lib.ch1_neckcopy("synched",0);
	this.instance_201.setTransform(430.4,306.5,0.6479,0.6479,0,-9.2179,170.7821,-1.2,9.2);

	this.instance_202 = new lib.ch1_lBodycopy("synched",0);
	this.instance_202.setTransform(430.65,375.3,0.6487,0.6487,0,0,180,-0.1,-22.8);

	this.instance_203 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_203.setTransform(420.55,468.8,0.647,0.647,0,-30.7118,149.2882,4.1,-53.3);

	this.instance_204 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_204.setTransform(421.65,406.65,0.6471,0.6471,0,3.3863,-176.6137,-0.5,2.5);

	this.instance_205 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_205.setTransform(382.2,432.55,0.6476,0.6476,0,-90.2943,89.7057,-4,3);

	this.instance_206 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_206.setTransform(377.9,426.65,0.6475,0.6475,0,-109.9996,70.0004,-5.5,7.9);

	this.instance_207 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_207.setTransform(388.15,375.55,0.6476,0.6476,0,-78.631,101.369,-39.8,-0.7);

	this.instance_208 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_208.setTransform(397.8,327.6,0.6476,0.6476,0,-79.4707,100.5293,-32.6,-0.2);

	this.instance_209 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_209.setTransform(441.5,403.5,0.6473,0.6473,0,21.1476,-158.8524,1.4,-45.7);

	this.instance_210 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_210.setTransform(348.5,346.8,0.7147,0.7147,0,77.7545,-102.2455,35.4,0.2);

	this.instance_211 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_211.setTransform(343.5,461.75,0.7146,0.7146,0,99.7077,-80.2923,5.9,-1.4);

	this.instance_212 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_212.setTransform(340.3,456.25,0.7147,0.7147,0,67.3942,-112.6058,5,-8.7);

	this.instance_213 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_213.setTransform(360.6,402.05,0.7147,0.7147,0,110.0095,-69.9905,39.9,-0.5);

	this.instance_214 = new lib.ch1_headcopy("synched",0);
	this.instance_214.setTransform(307.85,306.25,0.7151,0.7151,0,-12.9777,167.0223,1,52.5);

	this.instance_215 = new lib.ch1_uBodycopy("synched",0);
	this.instance_215.setTransform(312.75,348.85,0.7159,0.7159,0,0,180,-0.3,-23.6);

	this.instance_216 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_216.setTransform(301,494.2,0.7144,0.7144,0,17.6493,-162.3507,2.5,-54.1);

	this.instance_217 = new lib.ch1_neckcopy("synched",0);
	this.instance_217.setTransform(311.1,321.7,0.7151,0.7151,0,-9.2197,170.7803,-1.2,9.2);

	this.instance_218 = new lib.ch1_lBodycopy("synched",0);
	this.instance_218.setTransform(311.35,397.6,0.7159,0.7159,0,0,180,-0.1,-23.1);

	this.instance_219 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_219.setTransform(300.2,500.75,0.7141,0.7141,0,-30.7128,149.2872,4,-53.3);

	this.instance_220 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_220.setTransform(301.45,432.3,0.7142,0.7142,0,3.389,-176.611,-0.5,2.6);

	this.instance_221 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_221.setTransform(257.85,460.85,0.7147,0.7147,0,-90.2972,89.7028,-4,3);

	this.instance_222 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_222.setTransform(253.05,454.2,0.7147,0.7147,0,-110.0004,69.9996,-5.9,8);

	this.instance_223 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_223.setTransform(264.4,397.9,0.7147,0.7147,0,-78.6294,101.3706,-40,-0.8);

	this.instance_224 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_224.setTransform(275.1,344.9,0.7147,0.7147,0,-79.4676,100.5324,-32.7,-0.2);

	this.instance_225 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_225.setTransform(323.3,428.9,0.7145,0.7145,0,21.1486,-158.8514,1.4,-45.6);

	this.instance_226 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_226.setTransform(379,247.35,0.6964,0.6964,0,96.6545,-83.3455,35.9,-0.4);

	this.instance_227 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_227.setTransform(334.45,351.65,0.6962,0.6962,0,144.8208,-35.1792,6.2,-1.9);

	this.instance_228 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_228.setTransform(335.9,345.75,0.6963,0.6963,0,112.336,-67.664,4.7,-9.2);

	this.instance_229 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_229.setTransform(371.5,302.2,0.6963,0.6963,0,130.1147,-49.8853,39.8,0.3);

	this.instance_230 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_230.setTransform(334.05,210.6,0.6968,0.6968,0,-16.1491,163.8506,1.1,53);

	this.instance_231 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_231.setTransform(344.1,249.3,0.6976,0.6976,0,0,180,-0.5,-23.7);

	this.instance_232 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_232.setTransform(362.05,394.85,0.6963,0.6963,0,-12.7142,167.2858,2.6,-53.6);

	this.instance_233 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_233.setTransform(342.35,223.1,0.6968,0.6968,0,-31.9119,148.0881,-0.8,8.9);

	this.instance_234 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_234.setTransform(342.85,297.05,0.6976,0.6976,0,0,180,-0.5,-23);

	this.instance_235 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_235.setTransform(314,394.1,0.696,0.696,0,6.8977,-173.1023,3.8,-53.4);

	this.instance_236 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_236.setTransform(329.15,329.15,0.696,0.696,0,15.3918,-164.6082,-1.1,2.5);

	this.instance_237 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_237.setTransform(312.15,357.5,0.6963,0.6963,0,-41.1064,138.8936,-4.4,3.5);

	this.instance_238 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_238.setTransform(312.65,349.55,0.6963,0.6963,0,-67.4355,112.5645,-5.8,8.1);

	this.instance_239 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_239.setTransform(325.6,295.45,0.6964,0.6964,0,-76.6199,103.3801,-39.5,-1);

	this.instance_240 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_240.setTransform(307.4,245.3,0.6964,0.6964,0,-110.6973,69.3027,-33.4,-0.5);

	this.instance_241 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_241.setTransform(353.15,327.3,0.6964,0.6964,0,-5.2425,174.7575,1.8,-46.4);

	this.instance_242 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_242.setTransform(135.85,379.75,0.7984,0.7984,0,85.0155,-94.9845,35.5,0.1);

	this.instance_243 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_243.setTransform(127.5,512.95,0.7982,0.7982,0,103.4861,-76.5139,6.1,-1.6);

	this.instance_244 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_244.setTransform(129.25,505.95,0.7983,0.7983,0,113.7422,-66.2578,5.4,-8.8);

	this.instance_245 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_245.setTransform(141.2,442.2,0.7984,0.7984,0,100.3949,-79.6051,40.2,-0.2);

	this.instance_246 = new lib.ch1_headcopy2("synched",0);
	this.instance_246.setTransform(90.35,334.65,0.7988,0.7988,0,-10.4007,169.5993,0.6,52.6);

	this.instance_247 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_247.setTransform(95.7,381.75,0.7997,0.7997,0,0,180,-0.2,-23.8);

	this.instance_248 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_248.setTransform(78.9,540.75,0.798,0.798,0,11.9264,-168.0736,2.8,-53.9);

	this.instance_249 = new lib.ch1_neckcopy2("synched",0);
	this.instance_249.setTransform(93.8,351.5,0.7988,0.7988,0,-10.1806,169.8194,-1,8.7);

	this.instance_250 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_250.setTransform(94.35,436.5,0.7997,0.7997,0,0,180,-0.5,-23.1);

	this.instance_251 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_251.setTransform(91.5,548.2,0.7976,0.7976,0,-36.4567,143.5433,3.8,-53.2);

	this.instance_252 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_252.setTransform(77.1,472.6,0.7978,0.7978,0,-7.8073,172.1927,0.1,1.9);

	this.instance_253 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_253.setTransform(41.8,508.7,0.7982,0.7982,0,-60.4463,119.5537,-5.4,3.1);

	this.instance_254 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_254.setTransform(39,500,0.7984,0.7984,0,-84.7342,95.2658,-6,7.7);

	this.instance_255 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_255.setTransform(55.4,437.95,0.7983,0.7983,0,-75.6416,104.3584,-40.1,-0.8);

	this.instance_256 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_256.setTransform(53.35,377.3,0.7984,0.7984,0,-92.6839,87.3161,-33,-0.1);

	this.instance_257 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_257.setTransform(110.25,470.3,0.798,0.798,0,26.663,-153.337,2.2,-45.4);

	this.instance_258 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_258.setTransform(1230.75,169.7,0.4028,0.4028,0,88.1829,-91.8171,34.8,-0.4);

	this.instance_259 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_259.setTransform(1219.3,235.05,0.4025,0.4025,0,119.1837,-60.8163,5.8,-2.6);

	this.instance_260 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_260.setTransform(1219.15,231.5,0.4027,0.4027,0,95.8322,-84.1678,4.4,-9.6);

	this.instance_261 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_261.setTransform(1231.05,201.6,0.4027,0.4027,0,112.6022,-67.3978,38.9,0.1);

	this.instance_262 = new lib.ch1_headcopy_1("synched",0);
	this.instance_262.setTransform(1207.95,146.9,0.4029,0.4029,0,-10.9461,169.0539,0.2,53.6);

	this.instance_263 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_263.setTransform(1210.6,170.75,0.4034,0.4034,0,0,180,-0.8,-22.8);

	this.instance_264 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_264.setTransform(1217.25,255.4,0.4026,0.4026,0,-16.7826,163.2174,2.5,-53.6);

	this.instance_265 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_265.setTransform(1209.6,155.55,0.403,0.403,0,-9.8154,170.1846,-1.2,9.9);

	this.instance_266 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_266.setTransform(1209.9,198.35,0.4034,0.4034,0,0,180,-0.6,-22.6);

	this.instance_267 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_267.setTransform(1196.1,255.3,0.4025,0.4025,0,11.5728,-168.4272,1.4,-53);

	this.instance_268 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_268.setTransform(1203.9,217.55,0.4024,0.4024,0,14.7028,-165.2972,-1.9,3);

	this.instance_269 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_269.setTransform(1187.75,231.7,0.4027,0.4027,0,-68.8465,111.1535,-4.4,4.3);

	this.instance_270 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_270.setTransform(1185.2,228.05,0.4027,0.4027,0,-106.4932,73.5068,-5.2,8.1);

	this.instance_271 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_271.setTransform(1197.55,198.1,0.4027,0.4027,0,-68.1756,111.8244,-39.9,0.7);

	this.instance_272 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_272.setTransform(1189.5,168.35,0.4027,0.4027,0,-106.0065,73.9935,-32.6,0.3);

	this.instance_273 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_273.setTransform(1214.5,216.4,0.4028,0.4028,0,-1.8215,178.1785,1.4,-45.2);

	this.instance_274 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_274.setTransform(1017.85,142.9,0.4445,0.4445,0,88.1785,-91.8215,34.6,-0.2);

	this.instance_275 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_275.setTransform(1005.2,215.05,0.4443,0.4443,0,119.1869,-60.8131,5.4,-2.7);

	this.instance_276 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_276.setTransform(1004.95,211.1,0.4445,0.4445,0,95.8364,-84.1636,4.1,-9.3);

	this.instance_277 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_277.setTransform(1018.2,178.05,0.4444,0.4444,0,112.6055,-67.3945,38.6,0.2);

	this.instance_278 = new lib.ch1_headcopy_1("synched",0);
	this.instance_278.setTransform(992.7,117.7,0.4447,0.4447,0,-10.949,169.051,0.3,53.6);

	this.instance_279 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_279.setTransform(995.65,144,0.4452,0.4452,0,0,180,-0.7,-22.8);

	this.instance_280 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_280.setTransform(1002.95,237.4,0.4444,0.4444,0,-16.7867,163.2133,2.6,-53.5);

	this.instance_281 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_281.setTransform(994.45,127.25,0.4447,0.4447,0,-9.8181,170.1819,-1,10);

	this.instance_282 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_282.setTransform(994.85,174.5,0.4452,0.4452,0,0,180,-0.6,-22.2);

	this.instance_283 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_283.setTransform(979.55,237.3,0.4442,0.4442,0,11.5759,-168.4241,1.5,-52.8);

	this.instance_284 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_284.setTransform(988.2,195.65,0.4442,0.4442,0,14.707,-165.293,-1.9,3.1);

	this.instance_285 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_285.setTransform(970.4,211.3,0.4444,0.4444,0,-68.8448,111.1552,-4.2,4.2);

	this.instance_286 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_286.setTransform(967.5,207.25,0.4445,0.4445,0,-106.4958,73.5042,-5.2,7.9);

	this.instance_287 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_287.setTransform(981.2,174.2,0.4445,0.4445,0,-68.1723,111.8277,-39.6,0.6);

	this.instance_288 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_288.setTransform(972.3,141.4,0.4444,0.4444,0,-106.0094,73.9906,-32.5,0.2);

	this.instance_289 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_289.setTransform(999.9,194.35,0.4445,0.4445,0,-1.8276,178.1724,1.6,-45.1);

	this.instance_290 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_290.setTransform(1088.2,281.25,0.5086,0.5086,0,88.1743,-91.8257,35.1,-0.1);

	this.instance_291 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_291.setTransform(1073.75,363.8,0.5084,0.5084,0,119.1879,-60.8121,5.8,-2.3);

	this.instance_292 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_292.setTransform(1073.45,359.2,0.5086,0.5086,0,95.8397,-84.1603,4.6,-9.1);

	this.instance_293 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_293.setTransform(1088.6,321.4,0.5085,0.5085,0,112.6076,-67.3924,39,0.4);

	this.instance_294 = new lib.ch1_headcopy_1("synched",0);
	this.instance_294.setTransform(1059.45,252.5,0.5088,0.5088,0,-10.9531,169.0469,0.4,53.1);

	this.instance_295 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_295.setTransform(1062.85,282.5,0.5094,0.5094,0,0,180,-0.7,-23.1);

	this.instance_296 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_296.setTransform(1071.15,389.35,0.5085,0.5085,0,-16.79,163.21,2.6,-54);

	this.instance_297 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_297.setTransform(1061.45,263.35,0.5089,0.5089,0,-9.8219,170.1781,-1.1,9.5);

	this.instance_298 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_298.setTransform(1061.9,317.35,0.5094,0.5094,0,0,180,-0.5,-22.8);

	this.instance_299 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_299.setTransform(1044.4,389.3,0.5083,0.5083,0,11.5768,-168.4232,1.7,-53.2);

	this.instance_300 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_300.setTransform(1054.35,341.75,0.5082,0.5082,0,14.7109,-165.2891,-1.9,3.2);

	this.instance_301 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_301.setTransform(1033.95,359.5,0.5085,0.5085,0,-68.8397,111.1603,-4.7,3.9);

	this.instance_302 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_302.setTransform(1030.65,354.8,0.5086,0.5086,0,-106.4994,73.5006,-5.5,8);

	this.instance_303 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_303.setTransform(1046.35,317.05,0.5086,0.5086,0,-68.1686,111.8314,-39.9,0.5);

	this.instance_304 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_304.setTransform(1036.1,279.5,0.5085,0.5085,0,-106.0139,73.9861,-32.9,0.1);

	this.instance_305 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_305.setTransform(1067.7,340.15,0.5086,0.5086,0,-1.8328,178.1672,1.7,-45.6);

	this.instance_306 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_306.setTransform(53.05,313.3,0.7601,0.7601,0,77.7528,-102.2472,35.6,0.1);

	this.instance_307 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_307.setTransform(47.7,435.5,0.76,0.76,0,99.711,-80.289,6.2,-1.4);

	this.instance_308 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_308.setTransform(44.25,429.75,0.76,0.76,0,67.3926,-112.6074,5.2,-8.7);

	this.instance_309 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_309.setTransform(65.75,371.95,0.7601,0.7601,0,110.0131,-69.9869,40.1,-0.2);

	this.instance_310 = new lib.ch1_headcopy("synched",0);
	this.instance_310.setTransform(9.75,270.25,0.7605,0.7605,0,-12.9803,167.0197,1,52.4);

	this.instance_311 = new lib.ch1_uBodycopy("synched",0);
	this.instance_311.setTransform(14.95,315.45,0.7613,0.7613,0,0,180,-0.2,-23.8);

	this.instance_312 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_312.setTransform(2.55,469.95,0.7598,0.7598,0,17.6526,-162.3474,2.8,-54.4);

	this.instance_313 = new lib.ch1_neckcopy("synched",0);
	this.instance_313.setTransform(13.25,286.6,0.7605,0.7605,0,-9.224,170.776,-1.2,8.9);

	this.instance_314 = new lib.ch1_lBodycopy("synched",0);
	this.instance_314.setTransform(13.55,367.5,0.7613,0.7613,0,0,180,-0.1,-23.1);

	this.instance_315 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_315.setTransform(1.7,477.15,0.7594,0.7594,0,-30.7146,149.2854,4,-53.2);

	this.instance_316 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_316.setTransform(2.9,404.2,0.7596,0.7596,0,3.3918,-176.6082,-0.4,2.3);

	this.instance_317 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_317.setTransform(-43.5,434.55,0.7601,0.7601,0,-90.3002,89.6998,-4.2,2.6);

	this.instance_318 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_318.setTransform(-48.5,427.6,0.76,0.76,0,-110.0026,69.9974,-6,7.7);

	this.instance_319 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_319.setTransform(-36.55,367.6,0.7601,0.7601,0,-78.6269,101.3731,-40.1,-1.2);

	this.instance_320 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_320.setTransform(-25.1,311.25,0.7601,0.7601,0,-79.4636,100.5364,-32.9,-0.6);

	this.instance_321 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_321.setTransform(26.15,400.5,0.7598,0.7598,0,21.1504,-158.8496,1.6,-45.8);

	this.instance_322 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_322.setTransform(-32.15,406.55,0.8464,0.8464,0,85.0137,-94.9863,35.6,0.4);

	this.instance_323 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_323.setTransform(-41,547.7,0.8462,0.8462,0,103.4889,-76.5111,6.1,-1.4);

	this.instance_324 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_324.setTransform(-39.05,540.25,0.8463,0.8463,0,113.7434,-66.2566,5.4,-8.6);

	this.instance_325 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_325.setTransform(-26.25,472.7,0.8464,0.8464,0,100.3975,-79.6025,40.2,-0.1);

	this.instance_326 = new lib.ch1_headcopy2("synched",0);
	this.instance_326.setTransform(-80.25,358.7,0.8468,0.8468,0,-10.4038,169.5962,0.8,52.6);

	this.instance_327 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_327.setTransform(-74.7,408.55,0.8477,0.8477,0,0,180,0.2,-24.1);

	this.instance_328 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_328.setTransform(-92.25,577.15,0.8459,0.8459,0,11.9294,-168.0706,2.7,-54);

	this.instance_329 = new lib.ch1_neckcopy2("synched",0);
	this.instance_329.setTransform(-76.6,376.5,0.8468,0.8468,0,-10.1827,169.8173,-1,8.6);

	this.instance_330 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_330.setTransform(-76.1,466.6,0.8477,0.8477,0,0,180,-0.1,-23.3);

	this.instance_331 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_331.setTransform(-79,585,0.8456,0.8456,0,-36.4569,143.5431,3.8,-53.5);

	this.instance_332 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_332.setTransform(-94.2,504.95,0.8457,0.8457,0,-7.8086,172.1914,0.1,1.9);

	this.instance_333 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_333.setTransform(-131.8,543.3,0.8462,0.8462,0,-60.4452,119.5548,-5.2,2.9);

	this.instance_334 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_334.setTransform(-134.65,534,0.8463,0.8463,0,-84.7315,95.2685,-6,7.5);

	this.instance_335 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_335.setTransform(-117.35,468.15,0.8463,0.8463,0,-75.6403,104.3597,-40,-1);

	this.instance_336 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_336.setTransform(-119.25,403.9,0.8463,0.8463,0,-92.6868,87.3132,-33,-0.1);

	this.instance_337 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_337.setTransform(-59.2,502.55,0.8459,0.8459,0,26.6649,-153.3351,2.4,-45.2);

	this.instance_338 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_338.setTransform(184.9,296.9,0.7601,0.7601,0,77.7536,-102.2464,35.4,0.2);

	this.instance_339 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_339.setTransform(179.55,419.1,0.7599,0.7599,0,99.709,-80.291,5.9,-1.4);

	this.instance_340 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_340.setTransform(176.1,413.4,0.76,0.76,0,67.3928,-112.6072,4.8,-8.5);

	this.instance_341 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_341.setTransform(197.65,355.55,0.76,0.76,0,110.0124,-69.9876,40,-0.3);

	this.instance_342 = new lib.ch1_headcopy("synched",0);
	this.instance_342.setTransform(141.65,253.85,0.7605,0.7605,0,-12.9795,167.0205,1.1,52.6);

	this.instance_343 = new lib.ch1_uBodycopy("synched",0);
	this.instance_343.setTransform(146.85,299.05,0.7613,0.7613,0,0,180,-0.2,-23.6);

	this.instance_344 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_344.setTransform(134.45,453.6,0.7597,0.7597,0,17.6518,-162.3482,2.5,-54.1);

	this.instance_345 = new lib.ch1_neckcopy("synched",0);
	this.instance_345.setTransform(145.15,270.1,0.7605,0.7605,0,-9.2219,170.7781,-1.2,9.2);

	this.instance_346 = new lib.ch1_lBodycopy("synched",0);
	this.instance_346.setTransform(145.45,351,0.7613,0.7613,0,0,180,-0.1,-22.9);

	this.instance_347 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_347.setTransform(133.55,460.75,0.7594,0.7594,0,-30.7138,149.2862,4.1,-53.1);

	this.instance_348 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_348.setTransform(134.8,387.75,0.7595,0.7595,0,3.3907,-176.6093,-0.4,2.6);

	this.instance_349 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_349.setTransform(88.45,418.1,0.76,0.76,0,-90.2991,89.7009,-4,2.9);

	this.instance_350 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_350.setTransform(83.4,411.15,0.76,0.76,0,-110.0023,69.9977,-5.8,7.9);

	this.instance_351 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_351.setTransform(95.4,351.2,0.7601,0.7601,0,-78.6278,101.3722,-39.9,-0.9);

	this.instance_352 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_352.setTransform(106.9,294.9,0.7601,0.7601,0,-79.4656,100.5344,-32.6,-0.2);

	this.instance_353 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_353.setTransform(158.15,384.1,0.7598,0.7598,0,21.1501,-158.8499,1.4,-45.6);

	this.instance_354 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_354.setTransform(245.25,186.4,0.6647,0.6647,0,85.0182,-94.9818,35.2,0.2);

	this.instance_355 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_355.setTransform(238.3,297.25,0.6646,0.6646,0,103.4833,-76.5167,5.8,-1.7);

	this.instance_356 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_356.setTransform(239.9,291.55,0.6646,0.6646,0,113.7396,-66.2604,5.1,-9.2);

	this.instance_357 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_357.setTransform(249.85,238.35,0.6648,0.6648,0,100.3914,-79.6086,39.9,-0.4);

	this.instance_358 = new lib.ch1_headcopy2("synched",0);
	this.instance_358.setTransform(207.45,148.9,0.6651,0.6651,0,-10.3983,169.6017,0.5,52.8);

	this.instance_359 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_359.setTransform(211.75,188.05,0.6658,0.6658,0,0,180,-0.1,-23.5);

	this.instance_360 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_360.setTransform(197.95,320.45,0.6644,0.6644,0,11.9226,-168.0774,2.6,-53.6);

	this.instance_361 = new lib.ch1_neckcopy2("synched",0);
	this.instance_361.setTransform(210.35,162.85,0.6651,0.6651,0,-10.1779,169.8221,-1.1,8.8);

	this.instance_362 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_362.setTransform(210.75,233.65,0.6658,0.6658,0,0,180,-0.5,-22.7);

	this.instance_363 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_363.setTransform(208.4,326.7,0.6641,0.6641,0,-36.4541,143.5459,4,-52.9);

	this.instance_364 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_364.setTransform(196.55,263.8,0.6642,0.6642,0,-7.8057,172.1943,-0.1,2.4);

	this.instance_365 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_365.setTransform(166.9,293.85,0.6646,0.6646,0,-60.4468,119.5532,-5,3.2);

	this.instance_366 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_366.setTransform(164.8,286.55,0.6647,0.6647,0,-84.7384,95.2616,-5.7,7.9);

	this.instance_367 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_367.setTransform(178.3,234.8,0.6647,0.6647,0,-75.6457,104.3543,-39.8,-0.7);

	this.instance_368 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_368.setTransform(176.7,184.35,0.6647,0.6647,0,-92.6815,87.3185,-32.7,-0.1);

	this.instance_369 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_369.setTransform(224,261.8,0.6644,0.6644,0,26.661,-153.339,1.9,-45.1);

	this.instance_370 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_370.setTransform(648.6,119.95,0.4549,0.4549,0,96.6458,-83.3542,35.7,-0.6);

	this.instance_371 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_371.setTransform(619.55,188.1,0.4547,0.4547,0,144.8235,-35.1765,6.5,-2.2);

	this.instance_372 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_372.setTransform(620.55,184.25,0.4547,0.4547,0,112.3301,-67.6699,4.9,-9.7);

	this.instance_373 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_373.setTransform(643.6,155.9,0.4548,0.4548,0,130.1125,-49.8875,39.6,0.1);

	this.instance_374 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_374.setTransform(619.25,95.95,0.4551,0.4551,0,-16.1404,163.8596,0.9,53.4);

	this.instance_375 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_375.setTransform(625.8,121.25,0.4556,0.4556,0,0,180,-0.7,-23.4);

	this.instance_376 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_376.setTransform(637.5,216.2,0.4547,0.4547,0,-12.7067,167.2933,2.6,-53.6);

	this.instance_377 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_377.setTransform(624.6,104.1,0.4551,0.4551,0,-31.9064,148.0936,-0.8,9.2);

	this.instance_378 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_378.setTransform(624.95,152.4,0.4556,0.4556,0,0,180,-0.6,-22.8);

	this.instance_379 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_379.setTransform(606.15,215.8,0.4546,0.4546,0,6.8905,-173.1095,3.4,-53.2);

	this.instance_380 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_380.setTransform(616,173.3,0.4545,0.4545,0,15.385,-164.615,-1.4,2.5);

	this.instance_381 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_381.setTransform(605.05,191.85,0.4547,0.4547,0,-41.1033,138.8967,-4.7,4);

	this.instance_382 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_382.setTransform(605.35,186.7,0.4548,0.4548,0,-67.4403,112.5597,-5.9,8.4);

	this.instance_383 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_383.setTransform(613.8,151.35,0.4548,0.4548,0,-76.6267,103.3733,-39.4,-0.6);

	this.instance_384 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_384.setTransform(601.8,118.65,0.4548,0.4548,0,-110.6944,69.3056,-33,-0.5);

	this.instance_385 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_385.setTransform(631.65,172.15,0.4548,0.4548,0,-5.2357,174.7643,1.8,-46.2);

	this.instance_386 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_386.setTransform(521.55,253.7,0.5933,0.5933,0,77.7603,-102.2397,35.1,0.2);

	this.instance_387 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_387.setTransform(517.4,348.9,0.5932,0.5932,0,99.7029,-80.2971,5.9,-1.6);

	this.instance_388 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_388.setTransform(514.65,344.45,0.5932,0.5932,0,67.3973,-112.6027,4.8,-8.7);

	this.instance_389 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_389.setTransform(531.55,299.3,0.5933,0.5933,0,110.0051,-69.9949,40,-0.6);

	this.instance_390 = new lib.ch1_headcopy("synched",0);
	this.instance_390.setTransform(487.75,219.9,0.5936,0.5936,0,-12.9735,167.0265,0.9,52.7);

	this.instance_391 = new lib.ch1_uBodycopy("synched",0);
	this.instance_391.setTransform(491.9,255.2,0.5943,0.5943,0,0,180,-0.4,-23.6);

	this.instance_392 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_392.setTransform(482.25,376,0.593,0.593,0,17.6433,-162.3567,2,-54);

	this.instance_393 = new lib.ch1_neckcopy("synched",0);
	this.instance_393.setTransform(490.4,232.65,0.5936,0.5936,0,-9.2163,170.7837,-1.2,9.2);

	this.instance_394 = new lib.ch1_lBodycopy("synched",0);
	this.instance_394.setTransform(490.7,295.85,0.5943,0.5943,0,0,180,-0.2,-22.8);

	this.instance_395 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_395.setTransform(481.45,381.4,0.5927,0.5927,0,-30.7103,149.2897,4,-53.2);

	this.instance_396 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_396.setTransform(482.4,324.5,0.5929,0.5929,0,3.3833,-176.6167,-0.6,2.6);

	this.instance_397 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_397.setTransform(446.25,348.3,0.5933,0.5933,0,-90.2918,89.7082,-3.7,3);

	this.instance_398 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_398.setTransform(442.3,342.85,0.5932,0.5932,0,-109.9968,70.0032,-5.5,8);

	this.instance_399 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_399.setTransform(451.7,295.95,0.5933,0.5933,0,-78.634,101.366,-40,-0.7);

	this.instance_400 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_400.setTransform(460.6,252.1,0.5933,0.5933,0,-79.4739,100.5261,-32.4,0);

	this.instance_401 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_401.setTransform(500.7,321.7,0.5931,0.5931,0,21.1453,-158.8547,1.2,-45.6);

	this.instance_402 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_402.setTransform(580.5,190.35,0.5465,0.5465,0,88.1679,-91.8321,35.1,0.1);

	this.instance_403 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_403.setTransform(565,279.1,0.5462,0.5462,0,119.1923,-60.8077,5.7,-2.2);

	this.instance_404 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_404.setTransform(564.7,274.15,0.5464,0.5464,0,95.8456,-84.1544,4.8,-9.1);

	this.instance_405 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_405.setTransform(580.95,233.55,0.5464,0.5464,0,112.6117,-67.3883,39.2,0.7);

	this.instance_406 = new lib.ch1_headcopy_1("synched",0);
	this.instance_406.setTransform(549.6,159.4,0.5467,0.5467,0,-10.9587,169.0413,0.6,53.1);

	this.instance_407 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_407.setTransform(553.3,191.7,0.5473,0.5473,0,0,180,-0.6,-23.5);

	this.instance_408 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_408.setTransform(562.2,306.5,0.5463,0.5463,0,-16.795,163.205,2.9,-53.9);

	this.instance_409 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_409.setTransform(551.85,171.1,0.5467,0.5467,0,-9.8264,170.1736,-1,9.5);

	this.instance_410 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_410.setTransform(552.15,229.15,0.5473,0.5473,0,0,180,-0.2,-22.7);

	this.instance_411 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_411.setTransform(533.45,306.4,0.5461,0.5461,0,11.5843,-168.4157,1.9,-53.5);

	this.instance_412 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_412.setTransform(544,255.1,0.5461,0.5461,0,14.7131,-165.2869,-1.4,2.4);

	this.instance_413 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_413.setTransform(522.25,274.45,0.5464,0.5464,0,-68.8377,111.1623,-4.6,3.7);

	this.instance_414 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_414.setTransform(518.75,269.4,0.5464,0.5464,0,-106.5039,73.4961,-5.8,8);

	this.instance_415 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_415.setTransform(535.45,228.75,0.5464,0.5464,0,-68.1653,111.8347,-40.2,0.1);

	this.instance_416 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_416.setTransform(524.5,188.5,0.5464,0.5464,0,-106.0186,73.9814,-33.2,0);

	this.instance_417 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_417.setTransform(558.45,253.65,0.5464,0.5464,0,-1.8387,178.1613,1.9,-45.6);

	this.instance_418 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_418.setTransform(467,139.3,0.5105,0.5105,0,85.024,-94.976,35.2,0);

	this.instance_419 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_419.setTransform(461.65,224.4,0.5104,0.5104,0,103.4799,-76.5201,5.9,-1.8);

	this.instance_420 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_420.setTransform(462.95,220.2,0.5104,0.5104,0,113.7381,-66.2619,5,-9.6);

	this.instance_421 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_421.setTransform(470.6,179.2,0.5106,0.5106,0,100.3894,-79.6106,40,-0.6);

	this.instance_422 = new lib.ch1_headcopy2("synched",0);
	this.instance_422.setTransform(438.1,110.45,0.5108,0.5108,0,-10.3962,169.6038,0.1,53);

	this.instance_423 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_423.setTransform(441.3,140.55,0.5114,0.5114,0,0,180,-0.3,-23.7);

	this.instance_424 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_424.setTransform(430.65,242.3,0.5103,0.5103,0,11.9185,-168.0815,2.5,-53.6);

	this.instance_425 = new lib.ch1_neckcopy2("synched",0);
	this.instance_425.setTransform(440.2,121.2,0.5108,0.5108,0,-10.174,169.826,-1.2,9);

	this.instance_426 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_426.setTransform(440.45,175.75,0.5114,0.5114,0,0,180,-0.6,-22.4);

	this.instance_427 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_427.setTransform(438.85,247.15,0.51,0.51,0,-36.454,143.546,3.8,-52.5);

	this.instance_428 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_428.setTransform(429.55,198.7,0.5101,0.5101,0,-7.8014,172.1986,-0.1,2.5);

	this.instance_429 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_429.setTransform(406.9,221.8,0.5104,0.5104,0,-60.4485,119.5515,-4.9,3.6);

	this.instance_430 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_430.setTransform(405.35,216.2,0.5106,0.5106,0,-84.7442,95.2558,-5.6,8.4);

	this.instance_431 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_431.setTransform(415.6,176.65,0.5105,0.5105,0,-75.6506,104.3494,-39.5,-0.4);

	this.instance_432 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_432.setTransform(414.55,137.85,0.5105,0.5105,0,-92.6759,87.3241,-32.5,0.5);

	this.instance_433 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_433.setTransform(450.7,197.15,0.5102,0.5102,0,26.6593,-153.3407,1.7,-45.3);

	this.instance_434 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_434.setTransform(740.8,165.3,0.5105,0.5105,0,85.0256,-94.9744,34.8,-0.2);

	this.instance_435 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_435.setTransform(735.5,250.4,0.5104,0.5104,0,103.477,-76.523,5.9,-1.8);

	this.instance_436 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_436.setTransform(736.75,246.05,0.5104,0.5104,0,113.738,-66.262,5.3,-9.8);

	this.instance_437 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_437.setTransform(744.45,205.2,0.5105,0.5105,0,100.388,-79.612,40,-0.6);

	this.instance_438 = new lib.ch1_headcopy2("synched",0);
	this.instance_438.setTransform(711.95,136.45,0.5108,0.5108,0,-10.3949,169.6051,0.1,53);

	this.instance_439 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_439.setTransform(715.15,166.55,0.5114,0.5114,0,0,180,-0.3,-23.4);

	this.instance_440 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_440.setTransform(704.5,268.3,0.5102,0.5102,0,11.9172,-168.0828,2.5,-53.6);

	this.instance_441 = new lib.ch1_neckcopy2("synched",0);
	this.instance_441.setTransform(714.05,147.2,0.5108,0.5108,0,-10.1729,169.8271,-1.2,9);

	this.instance_442 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_442.setTransform(714.3,201.65,0.5114,0.5114,0,0,180,-0.6,-22.3);

	this.instance_443 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_443.setTransform(712.5,273.05,0.51,0.51,0,-36.4536,143.5464,3.8,-52.4);

	this.instance_444 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_444.setTransform(703.45,224.7,0.5101,0.5101,0,-7.8,172.2,-0.1,2.8);

	this.instance_445 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_445.setTransform(680.7,247.8,0.5104,0.5104,0,-60.4491,119.5509,-4.7,3.6);

	this.instance_446 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_446.setTransform(679.1,242.2,0.5105,0.5105,0,-84.7457,95.2543,-5.3,8.2);

	this.instance_447 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_447.setTransform(689.45,202.5,0.5105,0.5105,0,-75.6518,104.3482,-39.4,-0.4);

	this.instance_448 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_448.setTransform(688.15,163.8,0.5105,0.5105,0,-92.6743,87.3257,-32.6,0.1);

	this.instance_449 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_449.setTransform(724.55,223.15,0.5102,0.5102,0,26.6585,-153.3415,1.7,-45.3);

	this.instance_450 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_450.setTransform(861.1,150.2,0.4672,0.4672,0,96.6448,-83.3552,35.6,-0.5);

	this.instance_451 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_451.setTransform(831.25,220.35,0.467,0.467,0,144.8253,-35.1747,6.2,-2.6);

	this.instance_452 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_452.setTransform(832.25,216.2,0.4671,0.4671,0,112.33,-67.67,4.7,-9.7);

	this.instance_453 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_453.setTransform(856.05,187,0.4671,0.4671,0,130.113,-49.887,40,-0.1);

	this.instance_454 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_454.setTransform(830.9,125.55,0.4674,0.4675,0,-16.1383,163.8611,1.1,53.6);

	this.instance_455 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_455.setTransform(837.7,151.6,0.468,0.468,0,0,180,-0.8,-23.2);

	this.instance_456 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_456.setTransform(849.7,249.1,0.4671,0.4671,0,-12.7028,167.2972,2.5,-53.6);

	this.instance_457 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_457.setTransform(836.5,134,0.4674,0.4674,0,-31.9088,148.0912,-0.8,9.6);

	this.instance_458 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_458.setTransform(836.9,183.55,0.468,0.468,0,0,180,-0.8,-22.7);

	this.instance_459 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_459.setTransform(817.55,248.6,0.4669,0.4669,0,6.8902,-173.1098,3.4,-53.3);

	this.instance_460 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_460.setTransform(827.7,205,0.4669,0.4669,0,15.3849,-164.6151,-1.6,2.4);

	this.instance_461 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_461.setTransform(816.3,224.05,0.4671,0.4671,0,-41.1058,138.8942,-4.7,3.8);

	this.instance_462 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_462.setTransform(816.55,218.8,0.4671,0.4671,0,-67.4426,112.5574,-5.5,8.4);

	this.instance_463 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_463.setTransform(825.4,182.5,0.4672,0.4672,0,-76.631,103.369,-39.2,-0.6);

	this.instance_464 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_464.setTransform(813.1,148.8,0.4671,0.4671,0,-110.6934,69.3066,-33,-0.4);

	this.instance_465 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_465.setTransform(843.75,203.85,0.4672,0.4672,0,-5.2322,174.7678,1.7,-45.9);

	this.instance_466 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_466.setTransform(1160.95,93.85,0.3988,0.3988,0,96.6402,-83.3598,35.1,-1.1);

	this.instance_467 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_467.setTransform(1135.5,153.75,0.3986,0.3986,0,144.8297,-35.1703,6,-3.2);

	this.instance_468 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_468.setTransform(1136.3,150.25,0.3987,0.3987,0,112.3255,-67.6745,4.6,-9.9);

	this.instance_469 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_469.setTransform(1156.65,125.35,0.3987,0.3987,0,130.1127,-49.8873,39.4,-0.6);

	this.instance_470 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_470.setTransform(1135.3,72.85,0.399,0.399,0,-16.1338,163.8656,0.7,53.8);

	this.instance_471 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_471.setTransform(1141,95.05,0.3995,0.3995,0,0,180,-1.4,-22.7);

	this.instance_472 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_472.setTransform(1151.25,178.3,0.3987,0.3987,0,-12.7005,167.2995,2.2,-53.5);

	this.instance_473 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_473.setTransform(1140.05,80,0.3989,0.3989,0,-31.9064,148.0936,-1,9.8);

	this.instance_474 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_474.setTransform(1140.35,122.3,0.3995,0.3995,0,0,180,-1.5,-22.6);

	this.instance_475 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_475.setTransform(1123.85,177.9,0.3985,0.3985,0,6.885,-173.115,3.2,-53.2);

	this.instance_476 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_476.setTransform(1132.5,140.6,0.3985,0.3985,0,15.38,-164.62,-1.8,2.4);

	this.instance_477 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_477.setTransform(1122.75,156.85,0.3986,0.3986,0,-41.1015,138.8985,-4.5,4.4);

	this.instance_478 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_478.setTransform(1122.9,152.45,0.3987,0.3987,0,-67.4464,112.5536,-4.9,8.7);

	this.instance_479 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_479.setTransform(1130.5,121.45,0.3987,0.3987,0,-76.6333,103.3667,-38.6,-0.3);

	this.instance_480 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_480.setTransform(1120,92.75,0.3987,0.3987,0,-110.6893,69.3107,-32.1,-0.5);

	this.instance_481 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_481.setTransform(1146.1,139.8,0.3987,0.3987,0,-5.2256,174.7744,1.2,-45.1);

	this.instance_482 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_482.setTransform(1105.25,152,0.418,0.418,0,77.7693,-102.2307,34.1,0.1);

	this.instance_483 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_483.setTransform(1102.35,219.15,0.418,0.418,0,99.6906,-80.3094,4.8,-2.2);

	this.instance_484 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_484.setTransform(1100.4,216,0.418,0.418,0,67.4031,-112.5969,3.8,-8.7);

	this.instance_485 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_485.setTransform(1112.3,184.2,0.418,0.418,0,109.9933,-70.0067,39.2,-1.2);

	this.instance_486 = new lib.ch1_headcopy("synched",0);
	this.instance_486.setTransform(1081.4,128.3,0.4183,0.4183,0,-12.9641,167.0359,0.8,53.9);

	this.instance_487 = new lib.ch1_uBodycopy("synched",0);
	this.instance_487.setTransform(1084.45,153.1,0.4188,0.4188,0,0,180,-1,-22.6);

	this.instance_488 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_488.setTransform(1077.55,238.2,0.4178,0.4178,0,17.633,-162.367,1.5,-53.2);

	this.instance_489 = new lib.ch1_neckcopy("synched",0);
	this.instance_489.setTransform(1083.4,137.15,0.4183,0.4183,0,-9.207,170.793,-1.5,10.3);

	this.instance_490 = new lib.ch1_lBodycopy("synched",0);
	this.instance_490.setTransform(1083.6,181.7,0.4188,0.4188,0,0,180,-0.7,-21.8);

	this.instance_491 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_491.setTransform(1077.1,242.05,0.4176,0.4176,0,-30.7074,149.2926,4.1,-52.1);

	this.instance_492 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_492.setTransform(1077.7,201.95,0.4178,0.4178,0,3.3692,-176.6308,-1.1,3.4);

	this.instance_493 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_493.setTransform(1052.15,218.7,0.4181,0.4181,0,-90.2802,89.7198,-2.8,3.5);

	this.instance_494 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_494.setTransform(1049.4,214.9,0.418,0.418,0,-109.9854,70.0146,-4.2,7.9);

	this.instance_495 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_495.setTransform(1056,181.8,0.4181,0.4181,0,-78.6437,101.3563,-39.1,-0.1);

	this.instance_496 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_496.setTransform(1062.35,150.85,0.418,0.418,0,-79.4817,100.5183,-31.7,0.5);

	this.instance_497 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_497.setTransform(1090.55,199.85,0.4179,0.4179,0,21.1406,-158.8594,0.8,-45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_497},{t:this.instance_496},{t:this.instance_495},{t:this.instance_494},{t:this.instance_493},{t:this.instance_492},{t:this.instance_491},{t:this.instance_490},{t:this.instance_489},{t:this.instance_488},{t:this.instance_487},{t:this.instance_486},{t:this.instance_485},{t:this.instance_484},{t:this.instance_483},{t:this.instance_482},{t:this.instance_481},{t:this.instance_480},{t:this.instance_479},{t:this.instance_478},{t:this.instance_477},{t:this.instance_476},{t:this.instance_475},{t:this.instance_474},{t:this.instance_473},{t:this.instance_472},{t:this.instance_471},{t:this.instance_470},{t:this.instance_469},{t:this.instance_468},{t:this.instance_467},{t:this.instance_466},{t:this.instance_465},{t:this.instance_464},{t:this.instance_463},{t:this.instance_462},{t:this.instance_461},{t:this.instance_460},{t:this.instance_459},{t:this.instance_458},{t:this.instance_457},{t:this.instance_456},{t:this.instance_455},{t:this.instance_454},{t:this.instance_453},{t:this.instance_452},{t:this.instance_451},{t:this.instance_450},{t:this.instance_449},{t:this.instance_448},{t:this.instance_447},{t:this.instance_446},{t:this.instance_445},{t:this.instance_444},{t:this.instance_443},{t:this.instance_442},{t:this.instance_441},{t:this.instance_440},{t:this.instance_439},{t:this.instance_438},{t:this.instance_437},{t:this.instance_436},{t:this.instance_435},{t:this.instance_434},{t:this.instance_433},{t:this.instance_432},{t:this.instance_431},{t:this.instance_430},{t:this.instance_429},{t:this.instance_428},{t:this.instance_427},{t:this.instance_426},{t:this.instance_425},{t:this.instance_424},{t:this.instance_423},{t:this.instance_422},{t:this.instance_421},{t:this.instance_420},{t:this.instance_419},{t:this.instance_418},{t:this.instance_417},{t:this.instance_416},{t:this.instance_415},{t:this.instance_414},{t:this.instance_413},{t:this.instance_412},{t:this.instance_411},{t:this.instance_410},{t:this.instance_409},{t:this.instance_408},{t:this.instance_407},{t:this.instance_406},{t:this.instance_405},{t:this.instance_404},{t:this.instance_403},{t:this.instance_402},{t:this.instance_401},{t:this.instance_400},{t:this.instance_399},{t:this.instance_398},{t:this.instance_397},{t:this.instance_396},{t:this.instance_395},{t:this.instance_394},{t:this.instance_393},{t:this.instance_392},{t:this.instance_391},{t:this.instance_390},{t:this.instance_389},{t:this.instance_388},{t:this.instance_387},{t:this.instance_386},{t:this.instance_385},{t:this.instance_384},{t:this.instance_383},{t:this.instance_382},{t:this.instance_381},{t:this.instance_380},{t:this.instance_379},{t:this.instance_378},{t:this.instance_377},{t:this.instance_376},{t:this.instance_375},{t:this.instance_374},{t:this.instance_373},{t:this.instance_372},{t:this.instance_371},{t:this.instance_370},{t:this.instance_369},{t:this.instance_368},{t:this.instance_367},{t:this.instance_366},{t:this.instance_365},{t:this.instance_364},{t:this.instance_363},{t:this.instance_362},{t:this.instance_361},{t:this.instance_360},{t:this.instance_359},{t:this.instance_358},{t:this.instance_357},{t:this.instance_356},{t:this.instance_355},{t:this.instance_354},{t:this.instance_353},{t:this.instance_352},{t:this.instance_351},{t:this.instance_350},{t:this.instance_349},{t:this.instance_348},{t:this.instance_347},{t:this.instance_346},{t:this.instance_345},{t:this.instance_344},{t:this.instance_343},{t:this.instance_342},{t:this.instance_341},{t:this.instance_340},{t:this.instance_339},{t:this.instance_338},{t:this.instance_337},{t:this.instance_336},{t:this.instance_335},{t:this.instance_334},{t:this.instance_333},{t:this.instance_332},{t:this.instance_331},{t:this.instance_330},{t:this.instance_329},{t:this.instance_328},{t:this.instance_327},{t:this.instance_326},{t:this.instance_325},{t:this.instance_324},{t:this.instance_323},{t:this.instance_322},{t:this.instance_321},{t:this.instance_320},{t:this.instance_319},{t:this.instance_318},{t:this.instance_317},{t:this.instance_316},{t:this.instance_315},{t:this.instance_314},{t:this.instance_313},{t:this.instance_312},{t:this.instance_311},{t:this.instance_310},{t:this.instance_309},{t:this.instance_308},{t:this.instance_307},{t:this.instance_306},{t:this.instance_305},{t:this.instance_304},{t:this.instance_303},{t:this.instance_302},{t:this.instance_301},{t:this.instance_300},{t:this.instance_299},{t:this.instance_298},{t:this.instance_297},{t:this.instance_296},{t:this.instance_295},{t:this.instance_294},{t:this.instance_293},{t:this.instance_292},{t:this.instance_291},{t:this.instance_290},{t:this.instance_289},{t:this.instance_288},{t:this.instance_287},{t:this.instance_286},{t:this.instance_285},{t:this.instance_284},{t:this.instance_283},{t:this.instance_282},{t:this.instance_281},{t:this.instance_280},{t:this.instance_279},{t:this.instance_278},{t:this.instance_277},{t:this.instance_276},{t:this.instance_275},{t:this.instance_274},{t:this.instance_273},{t:this.instance_272},{t:this.instance_271},{t:this.instance_270},{t:this.instance_269},{t:this.instance_268},{t:this.instance_267},{t:this.instance_266},{t:this.instance_265},{t:this.instance_264},{t:this.instance_263},{t:this.instance_262},{t:this.instance_261},{t:this.instance_260},{t:this.instance_259},{t:this.instance_258},{t:this.instance_257},{t:this.instance_256},{t:this.instance_255},{t:this.instance_254},{t:this.instance_253},{t:this.instance_252},{t:this.instance_251},{t:this.instance_250},{t:this.instance_249},{t:this.instance_248},{t:this.instance_247},{t:this.instance_246},{t:this.instance_245},{t:this.instance_244},{t:this.instance_243},{t:this.instance_242},{t:this.instance_241},{t:this.instance_240},{t:this.instance_239},{t:this.instance_238},{t:this.instance_237},{t:this.instance_236},{t:this.instance_235},{t:this.instance_234},{t:this.instance_233},{t:this.instance_232},{t:this.instance_231},{t:this.instance_230},{t:this.instance_229},{t:this.instance_228},{t:this.instance_227},{t:this.instance_226},{t:this.instance_225},{t:this.instance_224},{t:this.instance_223},{t:this.instance_222},{t:this.instance_221},{t:this.instance_220},{t:this.instance_219},{t:this.instance_218},{t:this.instance_217},{t:this.instance_216},{t:this.instance_215},{t:this.instance_214},{t:this.instance_213},{t:this.instance_212},{t:this.instance_211},{t:this.instance_210},{t:this.instance_209},{t:this.instance_208},{t:this.instance_207},{t:this.instance_206},{t:this.instance_205},{t:this.instance_204},{t:this.instance_203},{t:this.instance_202},{t:this.instance_201},{t:this.instance_200},{t:this.instance_199},{t:this.instance_198},{t:this.instance_197},{t:this.instance_196},{t:this.instance_195},{t:this.instance_194},{t:this.instance_193},{t:this.instance_192},{t:this.instance_191},{t:this.instance_190},{t:this.instance_189},{t:this.instance_188},{t:this.instance_187},{t:this.instance_186},{t:this.instance_185},{t:this.instance_184},{t:this.instance_183},{t:this.instance_182},{t:this.instance_181},{t:this.instance_180},{t:this.instance_179},{t:this.instance_178},{t:this.instance_177},{t:this.instance_176},{t:this.instance_175},{t:this.instance_174},{t:this.instance_173},{t:this.instance_172},{t:this.instance_171},{t:this.instance_170},{t:this.instance_169},{t:this.instance_168},{t:this.instance_167},{t:this.instance_166},{t:this.instance_165},{t:this.instance_164},{t:this.instance_163},{t:this.instance_162},{t:this.instance_161},{t:this.instance_160},{t:this.instance_159},{t:this.instance_158},{t:this.instance_157},{t:this.instance_156},{t:this.instance_155},{t:this.instance_154},{t:this.instance_153},{t:this.instance_152},{t:this.instance_151},{t:this.instance_150},{t:this.instance_149},{t:this.instance_148},{t:this.instance_147},{t:this.instance_146},{t:this.instance_145},{t:this.instance_144},{t:this.instance_143},{t:this.instance_142},{t:this.instance_141},{t:this.instance_140},{t:this.instance_139},{t:this.instance_138},{t:this.instance_137},{t:this.instance_136},{t:this.instance_135},{t:this.instance_134},{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_123},{t:this.instance_122},{t:this.instance_121},{t:this.instance_120},{t:this.instance_119},{t:this.instance_118},{t:this.instance_117},{t:this.instance_116},{t:this.instance_115},{t:this.instance_114},{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101},{t:this.instance_100},{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94},{t:this.instance_93},{t:this.instance_92},{t:this.instance_91},{t:this.instance_90},{t:this.instance_89},{t:this.instance_88},{t:this.instance_87},{t:this.instance_86},{t:this.instance_85},{t:this.instance_84},{t:this.instance_83},{t:this.instance_82},{t:this.instance_81},{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65},{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]},141).wait(1));

	// Layer_1
	this.instance_498 = new lib.Tween2("synched",0);
	this.instance_498.setTransform(945.55,267.6,0.7767,0.7767,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_498).to({scaleX:0.8631,scaleY:0.8631,x:575.55,y:396.15},140).to({_off:true},1).wait(1));

	// Background
	this.instance_499 = new lib.Chap3Scene3();

	this.timeline.addTween(cjs.Tween.get(this.instance_499).wait(142));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(456.4,267.8,1181.3000000000002,572.2);
// library properties:
lib.properties = {
	id: 'A6F1A483617F544186FFC32FE4892FD2',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/LessonChapter3_03_atlas_1.png", id:"LessonChapter3_03_atlas_1"},
		{src:"sounds/AfterWar203wav.mp3", id:"AfterWar203wav"},
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