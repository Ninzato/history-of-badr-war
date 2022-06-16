(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter3_01_atlas_1", frames: [[1569,598,132,102],[1703,598,132,102],[1585,288,285,308],[1898,0,77,245],[1539,1188,77,244],[1585,0,311,286],[1282,329,285,308],[1898,247,77,245],[1618,1188,77,244],[874,1188,309,268],[0,1188,285,308],[1916,494,77,245],[1697,1188,77,244],[574,1188,298,287],[287,1188,285,308],[1916,741,77,245],[1776,1284,77,244],[1282,639,193,36],[1282,677,193,36],[1282,0,301,327],[1831,990,175,145],[1185,1188,175,144],[1831,1137,175,145],[1362,1188,175,144],[0,990,1829,196],[0,722,1914,266],[1948,1284,91,87],[1855,1284,91,88],[0,0,1280,720]]}
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



(lib.CachedBmp_320 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_319 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_318 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_317 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_316 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_315 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_314 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_313 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_312 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_311 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_310 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_309 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_308 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_307 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_306 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_305 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_304 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_303 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_302 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_301 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_300 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_299 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_298 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_297 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_296 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_295 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.Chap3Scene1 = function() {
	this.initialize(ss["LessonChapter3_01_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



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
	this.instance = new lib.CachedBmp_319();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_320();
	this.instance_1.setTransform(-33.05,-28.15,0.4875,0.4875);

	this.instance_2 = new lib.CompoundPath();
	this.instance_2.setTransform(-159.75,-154.3,3.5004,3.5004);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

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
	this.instance = new lib.CachedBmp_318();
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
	this.instance = new lib.CachedBmp_317();
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
	this.instance = new lib.CachedBmp_316();
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
	this.instance = new lib.CachedBmp_315();
	this.instance.setTransform(-69.8,-69.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.8,-69.7,155.5,143);


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
	this.shape.graphics.f("#D3C2B2").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape.setTransform(1.3972,4.4729,0.5589,0.5588);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_1.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-55.7,35.599999999999994,120.4);


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
	this.shape.graphics.f("#D3C2B2").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape.setTransform(-1.6528,53.0729,0.5589,0.5588);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("AgxIsQgYAAgSgSQgTgVgCghQgDhWgCl2QgClQABiQQABghAXgaIACgCQAkgpA8ADQA9ACAjArQAWAdgEAjIgzHhIgxHGQgDAhgUASQgSAQgXAAIgDAAg");
	this.shape_1.setTransform(-0.8,6,1,1,0,0,0,-0.1,-42.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-7.1,35.599999999999994,120.39999999999999);


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
	this.instance = new lib.CachedBmp_314();
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
	this.shape.graphics.f("#BAA087").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape.graphics.f("#BAA087").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.instance = new lib.CachedBmp_313();
	this.instance.setTransform(-19.15,-61.7,0.5,0.5);

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
	this.instance = new lib.CachedBmp_312();
	this.instance.setTransform(-18.45,-60.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-60.8,38.5,122);


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
	this.shape.graphics.f("#BAA087").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
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
	this.shape.graphics.f("#BAA087").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
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
	this.shape.graphics.f("#BAA087").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
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
	this.instance = new lib.CachedBmp_311();
	this.instance.setTransform(-75.8,-73.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.8,-73.2,154.5,134);


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
	this.shape_2.graphics.f("#FBF6E0").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape_2.setTransform(2.3972,4.4729,0.5589,0.5588);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FBF6E0").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_3.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.4,-55.7,35.6,120.4);


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
	this.shape_2.graphics.f("#FBF6E0").s().p("AgxIsQgYAAgSgSQgTgVgCghQgDhWgCl2QgClQABiQQABghAXgaIACgCQAkgpA8ADQA9ACAjArQAWAdgEAjIgzHhIgxHGQgDAhgUASQgSAQgXAAIgDAAg");
	this.shape_2.setTransform(-0.8,6,1,1,0,0,0,-0.1,-42.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FBF6E0").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape_3.setTransform(-1.8528,53.0729,0.5589,0.5588);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.6,-7.1,35.6,120.39999999999999);


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
	this.instance_1 = new lib.CachedBmp_310();
	this.instance_1.setTransform(-68.4,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-83.6,142.5,154);


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
	this.shape_1.graphics.f("#D3C2B2").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape_1.graphics.f("#D3C2B2").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.instance_1 = new lib.CachedBmp_309();
	this.instance_1.setTransform(-19.1,-61.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.1,-61.7,38.5,122.5);


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

	// Layer_1
	this.instance_1 = new lib.CachedBmp_308();
	this.instance_1.setTransform(-19.15,-60.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.1,-60.8,38.5,122);


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
	this.shape_1.graphics.f("#D3C2B2").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_1.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-7.5,96.6,15);


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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
	this.shape_1.setTransform(0.05,0.0188);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-7.4,96.6,14.9);


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
	this.instance_1 = new lib.CachedBmp_307();
	this.instance_1.setTransform(-70.3,-70.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.3,-70,149,143.5);


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
	this.instance_1 = new lib.CachedBmp_306();
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
	this.instance_1 = new lib.CachedBmp_305();
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
	this.instance_1 = new lib.CachedBmp_304();
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
	this.instance = new lib.CachedBmp_303();
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
	this.instance = new lib.CachedBmp_302();
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

	// Layer_1
	this.instance_1 = new lib.CachedBmp_301();
	this.instance_1.setTransform(-71.45,-78.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.4,-78.7,150.5,163.5);


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

	// Layer_2
	this.instance = new lib.CachedBmp_299();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_300();
	this.instance_1.setTransform(-43.45,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(-214.75,-207.05,4.7385,4.7385);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

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

	// Layer_2
	this.instance = new lib.CachedBmp_297();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_298();
	this.instance_1.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(216.45,-207.05,4.7384,4.7384,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

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

	// Armature_1
	this.instance = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance.setTransform(-55.75,-21.25,0.9982,0.9982,-72.2107,0,0,37.6,-0.1);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-65,143.9,0.9981,0.9981,-99.0159,0,0,6.2,-1.5);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-65.15,134.75,0.9983,0.9983,-98.9145,0,0,5.4,-8.7);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-79.55,54.95,0.9982,0.9982,-100.1729,0,0,40.6,0.1);

	this.instance_4 = new lib.ch1_headcopy2("synched",0);
	this.instance_4.setTransform(-4.95,-79.3,0.9989,0.9989,-0.5917,0,0,-0.2,52.8);

	this.instance_5 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_6.setTransform(-23.35,188.55,0.998,0.998,14.5058,0,0,3,-53.2);

	this.instance_7 = new lib.ch1_neckcopy2("synched",0);
	this.instance_7.setTransform(-5.75,-58,0.9989,0.9989,-0.1042,0,0,-1.4,8.8);

	this.instance_8 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_8.setTransform(-5.55,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_9.setTransform(30.95,189.25,0.9978,0.9978,-0.4889,0,0,2.6,-52.9);

	this.instance_10 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_10.setTransform(10.7,95.7,0.9977,0.9977,-14.8883,0,0,-1.8,2.4);

	this.instance_11 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_11.setTransform(105.75,128.25,0.9982,0.9982,33.856,0,0,-4.8,3.7);

	this.instance_12 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_12.setTransform(103.05,116.8,0.9983,0.9983,57.705,0,0,-6.4,8.2);

	this.instance_13 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_13.setTransform(69.95,44.85,0.9983,0.9983,66.0349,0,0,-39.5,0.2);

	this.instance_14 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_14.setTransform(47.6,-26.8,0.9984,0.9984,73.1404,0,0,-31.4,-1.6);

	this.instance_15 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_15.setTransform(-26.25,89.8,0.9983,0.9983,-3.8696,0,0,2,-45.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regY:-45.9,scaleX:0.9983,scaleY:0.9983,rotation:-3.8696,x:-26.25,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9984,scaleY:0.9984,rotation:73.1404,y:-26.8,regY:-1.6,x:47.6}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:66.0349,x:69.95,y:44.85,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:57.705,x:103.05,y:116.8,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.7,scaleX:0.9982,scaleY:0.9982,rotation:33.856,x:105.75,y:128.25,regX:-4.8}},{t:this.instance_10,p:{regY:2.4,rotation:-14.8883,x:10.7,y:95.7,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:-0.4889,x:30.95,y:189.25,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.4,rotation:-0.1042,x:-5.75,y:-58}},{t:this.instance_6,p:{scaleX:0.998,scaleY:0.998,rotation:14.5058,x:-23.35,y:188.55}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.2,scaleX:0.9989,scaleY:0.9989,rotation:-0.5917,x:-4.95,y:-79.3}},{t:this.instance_3,p:{regX:40.6,scaleX:0.9982,scaleY:0.9982,rotation:-100.1729,y:54.95,x:-79.55}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9983,scaleY:0.9983,rotation:-98.9145,x:-65.15,y:134.75,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.9981,scaleY:0.9981,rotation:-99.0159,x:-65,y:143.9,regX:6.2}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.2107,x:-55.75,y:-21.25}}]}).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8689,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:77.2285,y:-26.7,regY:-1.6,x:47.6}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:49.8968,x:64.8,y:46.25,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:41.5658,x:116.45,y:106.1,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:17.7156,x:122.35,y:116.4,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8873,x:10.65,y:95.55,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4872,x:30.9,y:189.2,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.1024,x:-5.8,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.3,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5909,x:-5,y:-79.25}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-101.0569,y:55.05,x:-79.55}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9982,scaleY:0.9982,rotation:-99.7985,x:-63.8,y:134.5,regX:5.4}},{t:this.instance_1,p:{regY:-1.4,scaleX:0.998,scaleY:0.998,rotation:-99.8993,x:-63.6,y:143.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-72.1146,x:-55.7,y:-21.25}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.868,x:-26.25,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:81.3178,y:-26.75,regY:-1.7,x:47.75}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:33.7552,x:59.5,y:47.25,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:25.4248,x:125.8,y:90.45,regY:8.3,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:1.5751,x:134.3,y:98.65,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8873,x:10.65,y:95.55,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4872,x:30.9,y:189.2,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.1024,x:-5.8,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.25,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.59,x:-5,y:-79.25}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-101.9428,y:54.95,x:-79.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-100.6842,x:-62.85,y:134.2,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-100.7854,x:-62.4,y:143.3,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-72.0177,x:-55.65,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.868,x:-26.25,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:85.407,y:-26.8,regY:-1.6,x:47.6}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:17.6156,x:54.15,y:47.85,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:9.2839,x:129.85,y:71,regY:8.3,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-14.5618,x:140.3,y:76.5,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8862,x:10.65,y:95.55,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4863,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.1015,x:-5.8,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.25,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.59,x:-5,y:-79.25}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-102.828,y:54.95,x:-79.75}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-101.5695,x:-61.75,y:133.85,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-101.6712,x:-61.15,y:142.9,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.9193,x:-55.65,y:-21.25}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8671,x:-26.25,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:89.4956,y:-26.75,regY:-1.6,x:47.6}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:1.4742,x:48.8,y:48.2,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-6.852,x:127.9,y:49.25,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.7,scaleX:0.9981,scaleY:0.9981,rotation:-30.703,x:139.5,y:51.65,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8862,x:10.65,y:95.5,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4863,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.1015,x:-5.8,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.2,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5891,x:-5,y:-79.25}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-103.7135,y:54.85,x:-79.95}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-102.4552,x:-60.65,y:133.5,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-102.5565,x:-59.95,y:142.6,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.8227,x:-55.65,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8671,x:-26.25,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:93.5807,y:-26.8,regY:-1.6,x:47.6}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-14.661,x:43.4,y:48,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-22.9918,x:119.75,y:27.15,regY:8.3,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-46.8436,x:131.5,y:26.25,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8862,x:10.65,y:95.5,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4855,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.1007,x:-5.8,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.2,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5891,x:-5,y:-79.25}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-104.599,y:54.75,x:-80.1}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-103.3401,x:-59.55,y:133.15,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-103.4422,x:-58.8,y:142.25,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.7232,x:-55.65,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8671,x:-26.25,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:97.6691,y:-26.7,regY:-1.6,x:47.55}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-30.8008,x:38.05,y:47.45,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-39.1318,x:105.45,y:6.3,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-62.9825,x:116.7,y:2.1,regX:-4.7}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8856,x:10.65,y:95.45,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4855,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.1007,x:-5.75,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5044,x:-23.2,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5882,x:-5,y:-79.25}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-105.4842,y:54.7,x:-80.2}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9982,scaleY:0.9982,rotation:-104.2259,x:-58.3,y:132.8,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-104.3265,x:-57.5,y:141.8,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.6277,x:-55.6,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8663,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:72.1023,y:-26.9,regY:-1.6,x:47.5}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-38.7093,x:71.05,y:44.3,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-47.0391,x:132.3,y:-5.8,regY:8.3,regX:-6.3}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-70.8897,x:142.7,y:-11.3,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8856,x:10.65,y:95.45,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4855,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.75,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5046,x:-23.15,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5882,x:-4.95,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-102.1836,y:54.75,x:-80.15}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-100.9257,x:-63,y:133.95,regX:5.4}},{t:this.instance_1,p:{regY:-1.4,scaleX:0.998,scaleY:0.998,rotation:-101.0261,x:-62.45,y:143,regX:6.1}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.6096,x:-55.6,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8663,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:46.531,y:-26.8,regY:-1.6,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-46.6154,x:99.35,y:27.25,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-54.9454,x:153.15,y:-30.8,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-78.7966,x:162.65,y:-37.8,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8856,x:10.65,y:95.45,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4846,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.75,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.15,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5882,x:-4.95,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-98.8847,y:54.65,x:-80.25}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-97.6256,x:-67.65,y:134.75,regX:5.4}},{t:this.instance_1,p:{regY:-1.6,scaleX:0.998,scaleY:0.998,rotation:-97.7255,x:-67.9,y:143.75,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.5919,x:-55.6,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8663,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:20.959,y:-26.75,regY:-1.6,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-54.5232,x:117.55,y:-0.55,regY:0.1,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-62.8529,x:162.85,y:-65.35,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-86.703,x:171.4,y:-73.6,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8856,x:10.65,y:95.45,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4846,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.75,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.15,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5882,x:-4.95,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-95.585,y:54.65,x:-80.25}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-94.3254,x:-72.25,y:135.3,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-94.4266,x:-72.9,y:144.4,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.5731,x:-55.65,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8663,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-4.6071,y:-26.75,regY:-1.6,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-62.431,x:122.15,y:-33.35,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-70.7599,x:157.95,y:-103.85,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-94.6062,x:165.3,y:-113.2,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8856,x:10.65,y:95.45,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4846,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.75,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.15,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5882,x:-4.95,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-92.2841,y:54.65,x:-80.25}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-91.0239,x:-76.95,y:135.55,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-91.1257,x:-78.05,y:144.65,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.5562,x:-55.7,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8663,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:-30.1773,y:-26.9,regY:-1.6,x:47.6}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-70.3377,x:111.95,y:-64.95,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9983,rotation:-78.6677,x:137.75,y:-139.8,regY:8.2,regX:-6.3}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-102.513,x:143.7,y:-149.95,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8856,x:10.65,y:95.4,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4846,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.1,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5874,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-88.9883,y:54.65,x:-80.3}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-87.7284,x:-81.7,y:135.65,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-87.8296,x:-83.25,y:144.65,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.5376,x:-55.6,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8663,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-30.4827,y:-26.85,regY:-1.7,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-70.2446,x:111.65,y:-65.25,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-78.5748,x:137.65,y:-140,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.7,scaleX:0.9981,scaleY:0.9981,rotation:-102.4206,x:143.55,y:-150.2,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8856,x:10.65,y:95.4,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4846,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.1,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5874,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-89.0706,y:54.65,x:-80.35}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-87.8116,x:-81.55,y:135.5,regX:5.5}},{t:this.instance_1,p:{regY:-1.6,scaleX:0.998,scaleY:0.998,rotation:-87.912,x:-83.25,y:144.55,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.5116,x:-55.6,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8654,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-30.7874,y:-26.75,regY:-1.6,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-70.1523,x:111.5,y:-65.55,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-78.481,x:137.45,y:-140.25,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-102.3271,x:143.55,y:-150.45,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8856,x:10.65,y:95.4,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4846,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.1,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5874,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-89.1538,y:54.65,x:-80.3}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-87.894,x:-81.45,y:135.6,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-87.9953,x:-83.1,y:144.55,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.4853,x:-55.65,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8654,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-31.0929,y:-26.75,regY:-1.6,x:47.5}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-70.0595,x:111.3,y:-66,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-78.3871,x:137.45,y:-140.55,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-102.2342,x:143.45,y:-150.75,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8856,x:10.65,y:95.4,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4846,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.1,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5874,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-89.2371,y:54.6,x:-80.35}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-87.9773,x:-81.35,y:135.65,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.0786,x:-83,y:144.6,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.459,x:-55.6,y:-21.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8654,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-31.398,y:-26.7,regY:-1.6,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-69.9659,x:111.1,y:-66.3,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-78.294,x:137.35,y:-140.85,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-102.1402,x:143.45,y:-151.1,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8856,x:10.65,y:95.4,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4846,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.1,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5874,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9982,scaleY:0.9982,rotation:-89.3203,y:54.6,x:-80.4}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.0597,x:-81.3,y:135.6,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.1609,x:-82.85,y:144.55,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.4324,x:-55.6,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8654,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-31.703,y:-26.75,regY:-1.6,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-69.8731,x:110.85,y:-66.7,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-78.2021,x:137.2,y:-141.15,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-102.0476,x:143.35,y:-151.4,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8856,x:10.65,y:95.4,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4837,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.1,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5874,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-89.4026,y:54.6,x:-80.45}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.142,x:-81.2,y:135.45,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.2433,x:-82.75,y:144.6,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.4063,x:-55.65,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8654,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-32.0071,y:-26.75,regY:-1.6,x:47.5}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-69.7797,x:110.55,y:-66.95,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-78.1081,x:137.2,y:-141.4,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-101.9547,x:143.3,y:-151.65,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8845,x:10.65,y:95.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4837,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.1,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5874,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-89.4858,y:54.6,x:-80.45}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.2253,x:-81.15,y:135.65,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.3266,x:-82.65,y:144.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.3806,x:-55.6,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8654,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-32.3137,y:-26.75,regY:-1.6,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-69.6863,x:110.35,y:-67.25,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-78.0157,x:137.05,y:-141.75,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.7,scaleX:0.9981,scaleY:0.9981,rotation:-101.8614,x:143.1,y:-151.9,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8845,x:10.65,y:95.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4837,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.1,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5874,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9982,scaleY:0.9982,rotation:-89.5682,y:54.6,x:-80.5}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.3085,x:-81.05,y:135.55,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.4089,x:-82.6,y:144.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.3548,x:-55.65,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8654,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-32.6176,y:-26.7,regY:-1.6,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-69.5945,x:110.2,y:-67.6,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-77.9224,x:136.95,y:-142,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.7,scaleX:0.9981,scaleY:0.9981,rotation:-101.7674,x:143.05,y:-152.2,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8845,x:10.65,y:95.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4837,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.1,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5874,x:-4.95,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-89.6505,y:54.55,x:-80.5}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.3909,x:-81,y:135.55,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.4922,x:-82.5,y:144.55,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.3296,x:-55.6,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8654,x:-26.2,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-32.923,y:-26.75,regY:-1.6,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-69.5012,x:109.95,y:-68,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-77.8295,x:136.85,y:-142.25,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.7,scaleX:0.9981,scaleY:0.9981,rotation:-101.6745,x:142.85,y:-152.45,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8845,x:10.65,y:95.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4837,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.1,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5874,x:-4.95,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9982,scaleY:0.9982,rotation:-89.7337,y:54.55,x:-80.5}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.4741,x:-80.85,y:135.45,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.5754,x:-82.4,y:144.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.303,x:-55.6,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8654,x:-26.2,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-33.2276,y:-26.8,regY:-1.7,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-69.4078,x:109.75,y:-68.35,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-77.7354,x:136.75,y:-142.55,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-101.5822,x:142.95,y:-152.75,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8845,x:10.65,y:95.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4837,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.1,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5874,x:-4.95,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-89.8169,y:54.55,x:-80.6}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.5565,x:-80.75,y:135.55,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.6578,x:-82.3,y:144.55,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.277,x:-55.6,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8654,x:-26.2,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-33.5334,y:-26.8,regY:-1.7,x:47.35}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-69.3141,x:109.45,y:-68.65,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-77.6429,x:136.65,y:-142.85,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-101.4884,x:142.8,y:-153.05,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8845,x:10.6,y:95.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4837,x:30.9,y:189.15,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.1,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5865,x:-4.95,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-89.9001,y:54.55,x:-80.6}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.6388,x:-80.7,y:135.5,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.7402,x:-82.2,y:144.45,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2501,x:-55.6,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8654,x:-26.2,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-33.8377,y:-26.8,regY:-1.6,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-69.2218,x:109.2,y:-68.95,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-77.5507,x:136.6,y:-143.1,regY:8.3,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-101.3965,x:142.75,y:-153.3,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8845,x:10.6,y:95.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4837,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23.1,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5865,x:-4.95,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-89.9834,y:54.5,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.722,x:-80.6,y:135.5,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.8234,x:-82.05,y:144.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2243,x:-55.6,y:-21.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8654,x:-26.2,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-34.1438,y:-26.7,regY:-1.6,x:47.5}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-69.1289,x:108.95,y:-69.25,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-77.4564,x:136.45,y:-143.35,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-101.3017,x:142.65,y:-153.55,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8845,x:10.6,y:95.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4837,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5046,x:-23.05,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5865,x:-4.95,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.5,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8053,x:-80.5,y:135.4,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9058,x:-82,y:144.45,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.1991,x:-55.6,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8654,x:-26.2,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-23.322,y:-26.75,regY:-1.6,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-67.1324,x:115.85,y:-56.9,regY:0.2,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.462,x:145.85,y:-130.1,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-99.3055,x:152.4,y:-140,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8845,x:10.6,y:95.35,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4837,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0998,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5046,x:-23.05,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5865,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.5,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8053,x:-80.5,y:135.4,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9067,x:-82,y:144.45,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.1991,x:-55.6,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8645,x:-26.2,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-12.5016,y:-26.7,regY:-1.6,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-65.1363,x:120.35,y:-43.55,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-73.4645,x:152.8,y:-115.6,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-97.3093,x:159.75,y:-125.5,regX:-4.7}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8845,x:10.6,y:95.35,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4837,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0989,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5046,x:-23.05,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5865,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.5,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8053,x:-80.5,y:135.4,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9067,x:-82,y:144.45,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.1991,x:-55.6,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8645,x:-26.2,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:-1.6799,y:-26.7,regY:-1.6,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-63.1408,x:122.25,y:-29.6,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-71.4684,x:157.2,y:-100.55,regY:8.2,regX:-6.3}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-95.3131,x:164.5,y:-109.9,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8837,x:10.6,y:95.35,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4837,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0989,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5046,x:-23.05,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5865,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.5,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8053,x:-80.5,y:135.4,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9067,x:-82,y:144.45,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.1991,x:-55.6,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8645,x:-26.2,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:9.1361,y:-26.7,regY:-1.6,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-61.1461,x:121.3,y:-15.5,regY:0.1,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-69.4736,x:158.75,y:-85.1,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-93.3181,x:166.45,y:-94.25,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8837,x:10.6,y:95.35,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4828,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0989,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5046,x:-23.05,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5865,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.5,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8062,x:-80.5,y:135.4,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9067,x:-82,y:144.4,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.1991,x:-55.55,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8645,x:-26.2,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:19.958,y:-26.7,regY:-1.6,x:47.5}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-59.1489,x:117.9,y:-1.8,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-67.4773,x:157.75,y:-70.05,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-91.3219,x:165.65,y:-79,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8837,x:10.6,y:95.35,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4828,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0989,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5046,x:-23.05,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5865,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.5,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8062,x:-80.5,y:135.4,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9075,x:-82,y:144.4,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.1991,x:-55.55,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8645,x:-26.2,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:30.7784,y:-26.7,regY:-1.6,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-57.1541,x:111.9,y:11.05,regY:0.2,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-65.4811,x:154.25,y:-55.95,regY:8.2,regX:-6.3}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-89.3299,x:162.45,y:-64.45,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8837,x:10.6,y:95.35,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4828,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0989,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5046,x:-23.05,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5865,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.5,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8062,x:-80.5,y:135.4,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9075,x:-82,y:144.4,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.1991,x:-55.55,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8645,x:-26.2,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:41.5988,y:-26.7,regY:-1.6,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-55.1582,x:103.65,y:22.4,regY:0.1,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-63.4851,x:148.25,y:-42.85,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-87.3336,x:156.75,y:-51.2,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8837,x:10.6,y:95.35,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4828,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0989,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5044,x:-23.05,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5865,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.5,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8062,x:-80.5,y:135.4,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9075,x:-82,y:144.4,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.1991,x:-55.55,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8645,x:-26.2,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:52.4197,y:-26.6,regY:-1.6,x:47.35}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-53.1613,x:93.45,y:32,regY:0.1,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-61.4895,x:140.25,y:-31.6,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-85.3366,x:149,y:-39.65,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8837,x:10.6,y:95.35,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4828,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0989,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5044,x:-23.05,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5865,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.5,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.807,x:-80.5,y:135.35,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9075,x:-82,y:144.4,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.1991,x:-55.55,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8645,x:-26.2,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:63.2411,y:-26.65,regY:-1.7,x:47.55}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-51.1662,x:81.65,y:39.75,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-59.4939,x:130.55,y:-22.3,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-83.341,x:139.65,y:-30.1,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8837,x:10.6,y:95.35,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4828,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0989,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5044,x:-23.05,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5856,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.5,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.807,x:-80.5,y:135.35,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9084,x:-82.05,y:144.4,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.1991,x:-55.55,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8645,x:-26.2,y:89.7,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:74.0613,y:-26.75,regY:-1.6,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-49.1706,x:68.45,y:45.05,regY:0.2,regX:-39.6}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-57.4991,x:119.55,y:-15.3,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-81.3445,x:128.9,y:-22.75,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8834,x:10.6,y:95.35,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4828,x:30.9,y:189.05,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0989,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5044,x:-23,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5856,x:-5,y:-79.1}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.45,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.807,x:-80.5,y:135.3,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9084,x:-82.1,y:144.35,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.1991,x:-55.55,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8645,x:-26.15,y:89.7,regX:2}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:73.9419,y:-26.8,regY:-1.6,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-39.5654,x:68.7,y:44.85,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-47.8928,x:129.05,y:-6,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.7,scaleX:0.9981,scaleY:0.9981,rotation:-71.739,x:139.4,y:-11.8,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8834,x:10.6,y:95.35,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4828,x:30.9,y:189.05,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0989,x:-5.65,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5044,x:-23,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5856,x:-5,y:-79.1}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.45,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.807,x:-80.45,y:135.3,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9084,x:-82.1,y:144.35,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2005,x:-55.5,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8645,x:-26.15,y:89.7,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:73.8233,y:-26.7,regY:-1.6,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-29.9596,x:68.85,y:44.8,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-38.2869,x:136.9,y:4.75,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-62.1347,x:148.1,y:0.8,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8826,x:10.6,y:95.35,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4828,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.098,x:-5.65,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5046,x:-23,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5856,x:-5,y:-79.1}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.45,x:-80.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.807,x:-80.45,y:135.3,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9084,x:-82.1,y:144.35,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2005,x:-55.5,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8637,x:-26.15,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:73.7038,y:-26.8,regY:-1.7,x:47.6}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-20.3547,x:68.95,y:44.75,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-28.6834,x:142.75,y:16.55,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-52.5304,x:154.55,y:14.5,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8826,x:10.6,y:95.35,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4828,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.098,x:-5.65,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5046,x:-23,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5856,x:-5,y:-79.1}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.45,x:-80.7}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.807,x:-80.45,y:135.3,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9084,x:-82.1,y:144.35,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2005,x:-55.5,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8637,x:-26.15,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:73.5838,y:-26.75,regY:-1.6,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.751,x:69.1,y:44.75,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-19.0781,x:146.65,y:29.25,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-42.9258,x:158.6,y:29.2,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8826,x:10.6,y:95.35,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.482,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.098,x:-5.65,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5046,x:-23,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5856,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.45,x:-80.7}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8079,x:-80.45,y:135.3,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9093,x:-82.1,y:144.35,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2005,x:-55.5,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8637,x:-26.15,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:73.4647,y:-26.7,regY:-1.6,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:-1.1457,x:69.3,y:44.7,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.473,x:148.3,y:42.3,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-33.3201,x:160.05,y:44.35,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8826,x:10.6,y:95.35,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.482,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.098,x:-5.65,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-23,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5856,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.45,x:-80.7}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8079,x:-80.45,y:135.3,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9093,x:-82.1,y:144.35,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2005,x:-55.5,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8637,x:-26.15,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:73.345,y:-26.8,regY:-1.7,x:47.5}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:8.4564,x:69.45,y:44.6,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:0.1287,x:147.75,y:55.65,regY:8.3,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-23.716,x:159.1,y:59.4,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8826,x:10.6,y:95.35,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.482,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.098,x:-5.65,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-22.95,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5856,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.45,x:-80.7}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8079,x:-80.45,y:135.3,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9093,x:-82.1,y:144.35,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2005,x:-55.5,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8637,x:-26.15,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:73.2261,y:-26.7,regY:-1.7,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:18.0602,x:69.6,y:44.6,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:9.7332,x:145,y:68.35,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-14.1097,x:155.5,y:74.1,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8826,x:10.6,y:95.35,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.482,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.098,x:-5.65,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-22.95,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5856,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.45,x:-80.7}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8079,x:-80.45,y:135.3,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9093,x:-82.1,y:144.35,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2013,x:-55.5,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8637,x:-26.15,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:73.1072,y:-26.75,regY:-1.6,x:47.35}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:27.665,x:69.8,y:44.6,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:19.3379,x:140.1,y:80.5,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:-4.5051,x:149.45,y:88.05,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8826,x:10.65,y:95.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.482,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.098,x:-5.65,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-22.95,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5856,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.45,x:-80.7}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8079,x:-80.45,y:135.3,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9093,x:-82.1,y:144.35,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2013,x:-55.5,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8637,x:-26.15,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:72.9879,y:-26.75,regY:-1.6,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:37.2709,x:69.9,y:44.5,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:28.9432,x:133.3,y:91.75,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:5.0959,x:141.35,y:100.6,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8826,x:10.65,y:95.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.482,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.098,x:-5.65,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-22.95,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5856,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.45,x:-80.7}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8079,x:-80.45,y:135.3,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9093,x:-82.1,y:144.35,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2013,x:-55.5,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8637,x:-26.15,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.869,y:-26.7,regY:-1.6,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:46.8756,x:70.05,y:44.4,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:38.5494,x:124.65,y:101.6,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:14.7004,x:131.05,y:111.65,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8826,x:10.65,y:95.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.482,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.098,x:-5.65,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-22.95,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5856,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.45,x:-80.7}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8088,x:-80.45,y:135.3,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9102,x:-82.1,y:144.35,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2013,x:-55.5,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8637,x:-26.15,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.7496,y:-26.75,regY:-1.7,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:56.4822,x:70.35,y:44.4,regY:0.1,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:48.155,x:114.45,y:109.95,regY:8.3,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:24.3069,x:119.15,y:120.85,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8826,x:10.65,y:95.3,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.482,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.098,x:-5.65,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-22.95,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5847,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.45,x:-80.7}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8088,x:-80.45,y:135.3,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9102,x:-82.1,y:144.35,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2013,x:-55.5,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8637,x:-26.1,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:72.6305,y:-26.75,regY:-1.6,x:47.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.0849,x:70.35,y:44.45,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.7585,x:103.1,y:116.3,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.9094,x:105.8,y:127.95,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.882,x:10.65,y:95.3,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.482,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.098,x:-5.6,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.5054,x:-22.95,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5847,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.0604,y:54.45,x:-80.7}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-88.8088,x:-80.4,y:135.3,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-88.9102,x:-82.1,y:144.35,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2013,x:-55.5,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8724,x:-26.1,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9983,scaleY:0.9983,rotation:72.6784,y:-26.85,regY:-1.6,x:47.25}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.1116,x:70.3,y:44.45,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.7663,x:103,y:116.4,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.9022,x:105.7,y:128,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8826,x:10.65,y:95.35,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4881,x:30.85,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.091,x:-5.65,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.4935,x:-22.9,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5839,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-90.741,y:54.45,x:-80.6}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-89.4964,x:-79.45,y:135.35,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-89.5909,x:-80.9,y:144.4,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.2678,x:-55.5,y:-21.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.882,x:-26.1,y:89.75,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:72.725,y:-26.8,regY:-1.6,x:47.35}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.136,x:70.25,y:44.5,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.7731,x:103,y:116.45,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.8963,x:105.65,y:128.1,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8837,x:10.65,y:95.35,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4925,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0849,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.481,x:-22.95,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.583,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9982,scaleY:0.9982,rotation:-91.4217,y:54.5,x:-80.5}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-90.1795,x:-78.35,y:135.45,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-90.2681,x:-79.75,y:144.4,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.3335,x:-55.55,y:-21.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.8917,x:-26.1,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.772,y:-26.7,regY:-1.6,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.161,x:70.2,y:44.55,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.7814,x:102.85,y:116.5,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.8888,x:105.6,y:128.15,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8845,x:10.65,y:95.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.4986,x:30.85,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0779,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.4691,x:-22.95,y:188.55}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5821,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-92.1018,y:54.5,x:-80.45}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-90.868,x:-77.35,y:135.5,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-90.9479,x:-78.6,y:144.45,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.3991,x:-55.55,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.9014,x:-26.1,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:72.8194,y:-26.8,regY:-1.6,x:47.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.1861,x:70.2,y:44.6,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.7884,x:102.8,y:116.55,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.881,x:105.6,y:128.15,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8856,x:10.65,y:95.4,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.5047,x:30.9,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0709,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.4566,x:-22.95,y:188.55}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5812,x:-5,y:-79.15}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-92.7821,y:54.55,x:-80.35}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-91.5548,x:-76.3,y:135.45,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-91.6296,x:-77.5,y:144.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.4656,x:-55.5,y:-21.4}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.9111,x:-26,y:89.8,regX:2.1}},{t:this.instance_14,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.8665,y:-26.7,regY:-1.6,x:47.45}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.2116,x:70.05,y:44.6,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.7955,x:102.8,y:116.6,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.8737,x:105.55,y:128.2,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8862,x:10.65,y:95.4,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.5109,x:30.85,y:189.1,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0648,x:-5.7,y:-57.9}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.4455,x:-22.95,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5804,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-93.4619,y:54.6,x:-80.3}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-92.2427,x:-75.25,y:135.45,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-92.3107,x:-76.35,y:144.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.5321,x:-55.55,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.9207,x:-26.15,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.9141,y:-26.7,regY:-1.6,x:47.5}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.2367,x:70.05,y:44.65,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.8033,x:102.75,y:116.65,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.8674,x:105.45,y:128.3,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8873,x:10.65,y:95.45,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.517,x:30.85,y:189.2,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0578,x:-5.7,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.4321,x:-22.95,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5795,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-94.1441,y:54.65,x:-80.25}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-92.9309,x:-74.25,y:135.4,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-92.9921,x:-75.15,y:144.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.5986,x:-55.55,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.9304,x:-26.15,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.9613,y:-26.75,regY:-1.6,x:47.55}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.2626,x:70.05,y:44.7,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.8113,x:102.65,y:116.7,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.8599,x:105.4,y:128.3,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8881,x:10.65,y:95.45,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.5223,x:30.8,y:189.2,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0516,x:-5.7,y:-57.95}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.4211,x:-23,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5786,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-94.8241,y:54.65,x:-80.15}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-93.6178,x:-73.15,y:135.45,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-93.6722,x:-74,y:144.45,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.665,x:-55.6,y:-21.25}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.9409,x:-26.1,y:89.85,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:73.0089,y:-26.8,regY:-1.6,x:47.55}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.2865,x:69.95,y:44.75,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.8176,x:102.6,y:116.75,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.8533,x:105.35,y:128.3,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.889,x:10.7,y:95.5,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.5284,x:30.9,y:189.2,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0446,x:-5.75,y:-58}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.4075,x:-23,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5777,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-95.5039,y:54.7,x:-80.05}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-94.3062,x:-72.15,y:135.35,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-94.3537,x:-72.85,y:144.45,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.7299,x:-55.6,y:-21.35}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.9506,x:-26.1,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:73.056,y:-26.85,regY:-1.7,x:47.65}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.3132,x:69.95,y:44.8,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.8258,x:102.55,y:116.8,regY:8.2,regX:-6.4}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.8472,x:105.3,y:128.4,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.89,x:10.7,y:95.5,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.5345,x:30.85,y:189.2,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0385,x:-5.75,y:-58}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.3956,x:-23,y:188.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5769,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-96.1847,y:54.75,x:-80}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-94.9942,x:-71.15,y:135.35,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-95.0339,x:-71.7,y:144.45,regX:6.1}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.7961,x:-55.6,y:-21.25}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.9611,x:-26.1,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:73.1034,y:-26.75,regY:-1.6,x:47.5}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.3379,x:69.9,y:44.8,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.8329,x:102.55,y:117,regY:8.2,regX:-6.3}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.8407,x:105.25,y:128.45,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8909,x:10.7,y:95.5,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.5407,x:30.9,y:189.2,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0315,x:-5.75,y:-58}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.3843,x:-22.95,y:188.6}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.576,x:-5,y:-79.2}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-96.8644,y:54.8,x:-79.9}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-95.6812,x:-70.1,y:135.25,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-95.7159,x:-70.55,y:144.25,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.8625,x:-55.6,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.9707,x:-26.1,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:73.1502,y:-26.6,regY:-1.6,x:47.55}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.3638,x:69.85,y:44.85,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.84,x:102.5,y:117.05,regY:8.2,regX:-6.3}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.8327,x:105.15,y:128.4,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8915,x:10.7,y:95.55,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.5468,x:30.85,y:189.2,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0254,x:-5.75,y:-58}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.3716,x:-23,y:188.55}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5751,x:-5,y:-79.25}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-97.545,y:54.85,x:-79.85}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-96.37,x:-69.15,y:135.15,regX:5.4}},{t:this.instance_1,p:{regY:-1.6,scaleX:0.998,scaleY:0.998,rotation:-96.396,x:-69.55,y:144.2,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.9296,x:-55.6,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.9804,x:-26,y:89.8,regX:2.1}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:73.197,y:-26.7,regY:-1.6,x:47.55}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.3881,x:69.75,y:44.85,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.8467,x:102.5,y:117.1,regY:8.2,regX:-6.3}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.8249,x:105.1,y:128.45,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8915,x:10.7,y:95.55,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.5521,x:30.9,y:189.2,regY:-52.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0184,x:-5.7,y:-58}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.3599,x:-23.05,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5742,x:-5,y:-79.25}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-98.2251,y:54.85,x:-79.75}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9982,scaleY:0.9982,rotation:-97.057,x:-67.9,y:135.1,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-97.078,x:-68.25,y:144.1,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-71.9958,x:-55.65,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.9892,x:-26.15,y:89.8,regX:2}},{t:this.instance_14,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:73.2452,y:-26.6,regY:-1.6,x:47.6}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.4148,x:69.75,y:44.9,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.8545,x:102.35,y:117.15,regY:8.2,regX:-6.3}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.8176,x:105.05,y:128.55,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8937,x:10.7,y:95.55,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.5582,x:30.85,y:189.05,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0123,x:-5.7,y:-58}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.3471,x:-23.05,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5734,x:-5,y:-79.25}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-98.9055,y:54.9,x:-79.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-97.745,x:-67.05,y:134.95,regX:5.4}},{t:this.instance_1,p:{regY:-1.6,scaleX:0.998,scaleY:0.998,rotation:-97.7582,x:-67.25,y:143.95,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-72.0612,x:-55.65,y:-21.3}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-3.9988,x:-26.15,y:89.85,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:73.2918,y:-26.8,regY:-1.6,x:47.6}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.4379,x:69.7,y:44.95,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9982,scaleY:0.9982,rotation:57.862,x:102.3,y:117.15,regY:8.2,regX:-6.3}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.8113,x:105,y:128.6,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8937,x:10.7,y:95.55,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.5643,x:30.9,y:189.05,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0053,x:-5.7,y:-58}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.3352,x:-23.05,y:188.5}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5725,x:-5,y:-79.25}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-99.5862,y:54.95,x:-79.65}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-98.4332,x:-66,y:134.7,regX:5.5}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-98.4395,x:-66,y:143.9,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-72.1276,x:-55.7,y:-21.2}}]},1).to({state:[{t:this.instance_15,p:{regY:-45.8,scaleX:0.9982,scaleY:0.9982,rotation:-4.0085,x:-26.15,y:89.85,regX:2}},{t:this.instance_14,p:{regX:-31.3,scaleX:0.9983,scaleY:0.9983,rotation:73.3386,y:-26.8,regY:-1.7,x:47.75}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:66.4634,x:69.6,y:45,regY:0.2,regX:-39.5}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:57.8688,x:102.3,y:117.15,regY:8.2,regX:-6.3}},{t:this.instance_11,p:{regY:3.8,scaleX:0.9981,scaleY:0.9981,rotation:33.8035,x:104.95,y:128.6,regX:-4.8}},{t:this.instance_10,p:{regY:2.3,rotation:-14.8951,x:10.7,y:95.55,scaleX:0.9977,scaleY:0.9977}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.5705,x:30.8,y:189,regY:-53}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1.5,rotation:-0.0009,x:-5.75,y:-58}},{t:this.instance_6,p:{scaleX:0.9979,scaleY:0.9979,rotation:14.3227,x:-23.05,y:188.55}},{t:this.instance_5},{t:this.instance_4,p:{regX:-0.3,scaleX:0.9988,scaleY:0.9988,rotation:-0.5716,x:-5,y:-79.25}},{t:this.instance_3,p:{regX:40.5,scaleX:0.9981,scaleY:0.9981,rotation:-100.2654,y:55,x:-79.45}},{t:this.instance_2,p:{regY:-8.7,scaleX:0.9982,scaleY:0.9982,rotation:-99.1192,x:-64.95,y:134.8,regX:5.4}},{t:this.instance_1,p:{regY:-1.5,scaleX:0.998,scaleY:0.998,rotation:-99.1194,x:-64.85,y:143.85,regX:6.2}},{t:this.instance,p:{scaleX:0.9981,scaleY:0.9981,rotation:-72.1939,x:-55.65,y:-21.3}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93.4,-202.5,274.20000000000005,505.8);


(lib.CharacterGood_03 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-57.2,-22.85,0.9985,0.9985,-79.6368,0,0,35.6,0.4);

	this.instance_1 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1.setTransform(-23.85,126.65,0.9984,0.9984,-108.7116,0,0,6.4,-1.2);

	this.instance_2 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2.setTransform(-21.6,117.75,0.9986,0.9986,-85.9218,0,0,5.7,-8.3);

	this.instance_3 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_3.setTransform(-71.1,53.7,0.9985,0.9985,-127.2457,0,0,40.6,0.1);

	this.instance_4 = new lib.ch1_headcopy("synched",0);
	this.instance_4.setTransform(-4.85,-79.15,0.9991,0.9991,-0.6012,0,0,0.2,53);

	this.instance_5 = new lib.ch1_uBodycopy("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_6.setTransform(-31.2,189.65,0.9986,0.9986,10.5316,0,0,3.3,-52.6);

	this.instance_7 = new lib.ch1_neckcopy("synched",0);
	this.instance_7.setTransform(-5.2,-58.05,0.9992,0.9992,-0.1129,0,0,-0.8,8.8);

	this.instance_8 = new lib.ch1_lBodycopy("synched",0);
	this.instance_8.setTransform(-5.55,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_9.setTransform(34.55,187.7,0.9981,0.9981,-9.1768,0,0,3.2,-53.4);

	this.instance_10 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_10.setTransform(15,93.6,0.9981,0.9981,-14.1255,0,0,-1.1,1.7);

	this.instance_11 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_11.setTransform(98.9,124.6,0.9985,0.9985,38.4202,0,0,-5,3);

	this.instance_12 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_12.setTransform(91.6,116.3,0.9986,0.9986,30.8322,0,0,-6,8);

	this.instance_13 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_13.setTransform(47.7,-26.1,0.9986,0.9986,89.1253,0,0,-31.4,-1.1);

	this.instance_14 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_14.setTransform(-22.1,91.75,0.9988,0.9988,3.3106,0,0,2.3,-45.6);

	this.instance_15 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_15.setTransform(50.15,48.35,0.9985,0.9985,59.2736,0,0,-39.8,-0.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9985,scaleY:0.9985,rotation:59.2736,x:50.15,y:48.35,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:3.3106,x:-22.1,y:91.75,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9986,scaleY:0.9986,rotation:89.1253,x:47.7,y:-26.1,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9986,scaleY:0.9986,rotation:30.8322,x:91.6,y:116.3,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:38.4202,x:98.9,y:124.6,regY:3}},{t:this.instance_10,p:{rotation:-14.1255,x:15,y:93.6,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1768,x:34.55,y:187.7}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.8,scaleX:0.9992,scaleY:0.9992,rotation:-0.1129,x:-5.2,y:-58.05}},{t:this.instance_6,p:{regX:3.3,rotation:10.5316,x:-31.2,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.6012,x:-4.85,y:-79.15,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-127.2457,x:-71.1,y:53.7,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9986,scaleY:0.9986,rotation:-85.9218,x:-21.6,y:117.75,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.2,rotation:-108.7116,x:-23.85,y:126.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.6368,x:-57.2,y:-22.85,regX:35.6}}]}).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:44.844,x:53.05,y:48.05,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3099,x:-22.05,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:86.9429,x:47.75,y:-26.15,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:16.404,x:110.05,y:103.6,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:23.9901,x:119.2,y:109.85,regY:3}},{t:this.instance_10,p:{rotation:-14.1253,x:14.95,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1762,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0796,x:-5.25,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:10.5314,x:-31.05,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.3465,x:-4.85,y:-79.15,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-125.7682,x:-71.05,y:53.65,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-84.4471,x:-23.3,y:119,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-107.235,x:-25.7,y:127.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.6228,x:-57.15,y:-22.9,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:30.4147,x:55.85,y:47.8,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3099,x:-22.05,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:84.7585,x:47.7,y:-26.2,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:1.9731,x:124.9,y:87.35,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:9.5601,x:135.3,y:91.1,regY:3}},{t:this.instance_10,p:{rotation:-14.1253,x:14.9,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1762,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0455,x:-5.2,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.5314,x:-31.05,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.0919,x:-4.75,y:-79.15,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-124.2931,x:-71.1,y:53.65,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-82.9697,x:-25.05,y:120.25,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-105.7583,x:-27.7,y:129,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.6068,x:-57.2,y:-22.9,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:15.9867,x:58.55,y:47.4,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3099,x:-22.05,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:82.5762,x:47.65,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-12.452,x:135.35,y:68.5,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-4.8657,x:146.4,y:69.5,regY:3}},{t:this.instance_10,p:{rotation:-14.1253,x:14.9,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1762,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0114,x:-5.15,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.5314,x:-31.05,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.1566,x:-4.8,y:-79.2,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-122.815,x:-71.1,y:53.65,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-81.4948,x:-26.75,y:121.35,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-104.2822,x:-29.65,y:130.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5907,x:-57.2,y:-22.95,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:1.5562,x:61.35,y:46.95,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.309,x:-22.05,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:80.3911,x:47.6,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-26.8834,x:141,y:48.2,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-19.2945,x:151.95,y:46.55,regY:3.1}},{t:this.instance_10,p:{rotation:-14.1253,x:14.9,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1762,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0175,x:-5.15,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.5305,x:-31.05,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.4113,x:-4.8,y:-79.15,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-121.3389,x:-71.05,y:53.65,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-80.0176,x:-28.5,y:122.5,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-102.8051,x:-31.65,y:131.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5747,x:-57.15,y:-22.95,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-12.8696,x:64.1,y:46.3,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.309,x:-22.05,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:78.2086,x:47.7,y:-26.25,regY:-1.2}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-41.3128,x:141.45,y:27.8,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-33.7263,x:151.6,y:23.35,regY:3}},{t:this.instance_10,p:{rotation:-14.1253,x:14.85,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1762,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0516,x:-5.2,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.5305,x:-31,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.6651,x:-4.7,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-119.8623,x:-71.05,y:53.7,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.5427,x:-30.3,y:123.5,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-101.3283,x:-33.7,y:132.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5596,x:-57.15,y:-22.95,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-27.3005,x:66.8,y:45.65,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.309,x:-22.05,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:76.0232,x:47.65,y:-26.2,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-55.7436,x:137.2,y:8.45,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-48.1551,x:145.9,y:1.65,regY:3}},{t:this.instance_10,p:{rotation:-14.1253,x:14.85,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1762,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0858,x:-5.2,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.5304,x:-31,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.9206,x:-4.7,y:-79.1,scaleX:0.999,scaleY:0.999,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-118.3848,x:-71.05,y:53.7,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-77.0649,x:-32.25,y:124.5,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.4,rotation:-99.8526,x:-35.9,y:132.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5436,x:-57.15,y:-23,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-41.7276,x:69.5,y:44.9,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3082,x:-22.05,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:73.8414,x:47.6,y:-26.2,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.1721,x:128.35,y:-8.6,regX:-6.1,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-62.584,x:135.15,y:-17.35,regY:3}},{t:this.instance_10,p:{rotation:-14.1244,x:14.8,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1756,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.1208,x:-5.15,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.5304,x:-30.95,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.1744,x:-4.7,y:-79.15,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-116.9093,x:-71.05,y:53.7,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-75.5896,x:-34.05,y:125.7,regY:-8.3,regX:5.6}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-98.3752,x:-37.85,y:134,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5266,x:-57.15,y:-23,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-56.1569,x:72.1,y:44.05,regX:-39.9}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3082,x:-22.05,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:71.6573,x:47.65,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-84.6025,x:115.85,y:-22.6,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.0142,x:120.2,y:-32.7,regY:3}},{t:this.instance_10,p:{rotation:-14.1244,x:14.8,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1756,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.1549,x:-5.15,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:10.5295,x:-30.95,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.4283,x:-4.65,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.4316,x:-71.05,y:53.7,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.1135,x:-35.85,y:126.55,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-96.8989,x:-39.95,y:134.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5115,x:-57.15,y:-23,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9985,rotation:-70.5864,x:74.8,y:42.95,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3073,x:-22.05,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:69.4721,x:47.6,y:-26.2,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-99.0273,x:100.55,y:-32.4,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:-91.4397,x:102.3,y:-43.3,regY:3.1}},{t:this.instance_10,p:{rotation:-14.1244,x:14.75,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1756,x:34.5,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.189,x:-5.2,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.5295,x:-30.9,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.6831,x:-4.6,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-113.956,x:-71.1,y:53.55,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-72.6361,x:-37.75,y:127.35,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-95.4225,x:-42.05,y:135.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4964,x:-57.1,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-70.6482,x:99.65,y:26.9,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3073,x:-22,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:46.4452,x:47.6,y:-26.1,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-99.0878,x:125.35,y:-48.55,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-91.501,x:127.15,y:-59.45,regY:3.1}},{t:this.instance_10,p:{rotation:-14.1244,x:14.75,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1756,x:34.5,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:0.0473,x:-5.2,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:10.5295,x:-30.9,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.1225,x:-4.65,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-114.3354,x:-73.6,y:53,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-73.0164,x:-39.9,y:126.65,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.4,rotation:-95.8018,x:-44.15,y:134.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.595,x:-57.05,y:-23,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:-70.7085,x:116.2,y:2.25,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3073,x:-22,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:23.4163,x:47.6,y:-26.15,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-99.1478,x:141.85,y:-73.2,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-91.5624,x:143.55,y:-84.15,regY:3}},{t:this.instance_10,p:{rotation:-14.1244,x:14.75,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1756,x:34.5,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0893,x:-5.25,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.5295,x:-30.9,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.9317,x:-4.8,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-114.7136,x:-76.1,y:52.5,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-73.3948,x:-41.85,y:125.85,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.4,rotation:-96.1797,x:-46.15,y:134,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.6942,x:-57.1,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:-70.7698,x:121.8,y:-26.95,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3073,x:-22,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9986,scaleY:0.9986,rotation:0.3905,x:47.5,y:-26.15,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-99.208,x:147.3,y:-102.4,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-91.6237,x:149,y:-113.3,regY:3}},{t:this.instance_10,p:{rotation:-14.1244,x:14.75,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1756,x:34.5,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.2284,x:-5.15,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.5295,x:-30.9,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.7411,x:-4.8,y:-78.9,scaleX:0.9991,scaleY:0.9991,regY:53.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.0936,x:-78.55,y:51.85,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-73.7746,x:-43.85,y:124.95,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-96.5594,x:-47.95,y:133.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.7944,x:-57.05,y:-23.15,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-70.831,x:115.6,y:-55.9,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3073,x:-22,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:-22.6333,x:47.5,y:-26.2,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-99.2684,x:141,y:-131.45,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-91.6832,x:142.75,y:-142.3,regY:3}},{t:this.instance_10,p:{rotation:-14.1244,x:14.75,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1756,x:34.5,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.3702,x:-5.25,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.5287,x:-30.9,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-5.5516,x:-4.85,y:-79,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.4716,x:-80.95,y:51.15,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.1543,x:-45.8,y:124,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-96.9385,x:-49.85,y:132.1,scaleX:0.9983,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.8937,x:-57,y:-23.2,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-70.8922,x:98.5,y:-80.2,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3073,x:-22,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:-45.66,x:47.45,y:-26.15,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-99.3289,x:123.8,y:-155.75,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-91.7437,x:125.5,y:-166.6,regY:3}},{t:this.instance_10,p:{rotation:-14.1244,x:14.7,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1747,x:34.5,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.5119,x:-5.2,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.5287,x:-30.85,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-7.3607,x:-4.9,y:-79.1,scaleX:0.999,scaleY:0.999,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.8511,x:-83.4,y:50.2,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.5329,x:-47.75,y:122.85,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3172,x:-51.75,y:131,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9934,x:-57.1,y:-23.15,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:-70.9143,x:98.45,y:-80.25,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3248,x:-22.1,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:-45.6854,x:47.5,y:-26.1,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-99.3813,x:123.8,y:-155.75,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-91.8155,x:125.45,y:-166.6,regY:3}},{t:this.instance_10,p:{rotation:-14.1527,x:14.7,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1739,x:34.5,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.5198,x:-5.15,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.5786,x:-30.9,y:189.55,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-7.373,x:-4.85,y:-79.1,scaleX:0.999,scaleY:0.999,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.8335,x:-83.4,y:50.2,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.5252,x:-47.8,y:122.85,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3287,x:-51.8,y:131,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9804,x:-57.1,y:-23.2,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:-70.9367,x:98.4,y:-80.25,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3432,x:-22.1,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:-45.7102,x:47.45,y:-26.05,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-99.4327,x:123.8,y:-155.8,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-91.8865,x:125.35,y:-166.65,regY:3}},{t:this.instance_10,p:{rotation:-14.1801,x:14.75,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.173,x:34.55,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.5285,x:-5.15,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:10.6303,x:-31,y:189.7,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-7.3862,x:-4.95,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.8182,x:-83.45,y:50.15,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.5183,x:-48,y:122.85,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3418,x:-51.8,y:131,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9665,x:-57.1,y:-23.15,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-70.9584,x:98.5,y:-80.3,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,rotation:3.3616,x:-22.1,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:-45.7356,x:47.4,y:-26.1,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-99.4851,x:123.75,y:-155.8,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-91.9592,x:125.3,y:-166.7,regY:3}},{t:this.instance_10,p:{rotation:-14.2079,x:14.75,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.171,x:34.6,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.5364,x:-5.15,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:10.681,x:-30.95,y:189.7,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-7.3976,x:-4.9,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.8026,x:-83.4,y:50.3,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.5119,x:-48,y:122.85,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3534,x:-51.8,y:130.95,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9547,x:-57.1,y:-23.15,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:-70.9802,x:98.4,y:-80.25,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3801,x:-22.1,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:-45.7616,x:47.5,y:-26.1,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-99.5375,x:123.65,y:-155.8,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-92.0293,x:125.4,y:-166.75,regY:3.1}},{t:this.instance_10,p:{rotation:-14.237,x:14.75,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1701,x:34.65,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.5452,x:-5.2,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:10.7318,x:-31,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-7.4101,x:-4.85,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.7857,x:-83.45,y:50.3,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.5064,x:-48,y:122.85,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3648,x:-51.9,y:130.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9413,x:-57.1,y:-23.2,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:-71.0027,x:98.35,y:-80.3,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3985,x:-22.15,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:-45.7869,x:47.5,y:-26.15,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-99.589,x:123.65,y:-155.95,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-92.102,x:125.2,y:-166.75,regY:3}},{t:this.instance_10,p:{rotation:-14.2646,x:14.75,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1684,x:34.7,y:187.55}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.5539,x:-5.2,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:10.7818,x:-31,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-7.4214,x:-4.85,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.7689,x:-83.5,y:50.25,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.4991,x:-48.05,y:122.85,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3772,x:-51.85,y:131,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.928,x:-57.05,y:-23.15,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-71.0256,x:98.4,y:-80.25,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.4169,x:-22.15,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:-45.8123,x:47.5,y:-26.05,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-99.6404,x:123.55,y:-155.9,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-92.1721,x:125.15,y:-166.8,regY:3}},{t:this.instance_10,p:{rotation:-14.2937,x:14.75,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1675,x:34.75,y:187.55}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.5618,x:-5.15,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:10.8326,x:-31.15,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-7.4339,x:-4.9,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.7528,x:-83.45,y:50.3,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.4928,x:-48.15,y:122.85,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3895,x:-51.95,y:131,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9142,x:-57.1,y:-23.15,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-71.0478,x:98.35,y:-80.3,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.4353,x:-22,y:91.65,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:-45.8371,x:47.5,y:-26.1,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-99.6928,x:123.35,y:-155.95,regX:-6,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-92.2449,x:125.1,y:-166.85,regY:3}},{t:this.instance_10,p:{rotation:-14.3216,x:14.75,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1667,x:34.8,y:187.55}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.5705,x:-5.15,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:10.8843,x:-31.1,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-7.4462,x:-4.95,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.7364,x:-83.6,y:50.35,regX:40.5,regY:0}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.4866,x:-48.15,y:122.85,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.4011,x:-52,y:131,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.902,x:-57.1,y:-23.1,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-68.123,x:108.25,y:-69.1,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.4239,x:-22.1,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:-34.2741,x:47.5,y:-26.15,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-96.7484,x:137.15,y:-143.3,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-89.2916,x:139.3,y:-154.1,regY:3}},{t:this.instance_10,p:{rotation:-14.3046,x:14.75,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1667,x:34.75,y:187.55}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.5285,x:-5.15,y:-58}},{t:this.instance_6,p:{regX:3.4,rotation:10.8513,x:-31.05,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-6.8227,x:-4.85,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.7477,x:-83.45,y:50.3,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.49,x:-48.1,y:122.85,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3949,x:-51.95,y:131,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9106,x:-57.1,y:-23.1,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-65.197,x:115.65,y:-56,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.4116,x:-22.1,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:-22.7098,x:47.6,y:-26.2,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-93.8038,x:148.2,y:-128.7,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-86.3346,x:151.15,y:-139.3,regY:3.1}},{t:this.instance_10,p:{rotation:-14.2857,x:14.75,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1675,x:34.75,y:187.55}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-1,scaleX:0.9991,scaleY:0.9991,rotation:-0.4857,x:-5.25,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.8192,x:-31.1,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-6.2008,x:-4.85,y:-78.9,scaleX:0.999,scaleY:0.999,regY:53.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.7575,x:-83.45,y:50.3,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.4947,x:-48.1,y:122.85,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.386,x:-51.95,y:131,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9189,x:-57.05,y:-23.2,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-62.2703,x:120.2,y:-41.75,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.4002,x:-22.1,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:-11.1463,x:47.5,y:-26.35,regY:-1.2}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-90.8599,x:156.55,y:-112.55,regX:-6.1,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-83.3775,x:159.8,y:-123.15,regY:3}},{t:this.instance_10,p:{rotation:-14.2676,x:14.75,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1684,x:34.7,y:187.55}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.4437,x:-5.15,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.7862,x:-31,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-5.578,x:-4.85,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.7673,x:-83.45,y:50.3,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.4991,x:-48.05,y:122.85,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3781,x:-51.9,y:131,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9272,x:-57.05,y:-23.2,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-59.3462,x:121.85,y:-26.8,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.388,x:-22.05,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:0.4115,x:47.5,y:-26.25,regY:-1.2}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-87.9191,x:161.8,y:-95.75,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.4212,x:165.55,y:-106.15,regY:3}},{t:this.instance_10,p:{rotation:-14.2502,x:14.7,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1693,x:34.7,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.4017,x:-5.15,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.755,x:-31,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.9548,x:-4.9,y:-79,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.7783,x:-83.45,y:50.3,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.5036,x:-48,y:122.8,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3702,x:-51.9,y:130.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9355,x:-57.05,y:-23.25,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-56.4202,x:120.4,y:-11.85,regX:-39.9}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3765,x:-22,y:91.65,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:11.9738,x:47.5,y:-26.15,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-84.9745,x:163.8,y:-78.8,regX:-6,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.4642,x:168.1,y:-88.95,regY:3}},{t:this.instance_10,p:{rotation:-14.2321,x:14.75,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1701,x:34.65,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.3597,x:-5.15,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.722,x:-30.95,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.3324,x:-4.8,y:-79,scaleX:0.999,scaleY:0.999,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.7889,x:-83.4,y:50.3,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.5074,x:-47.95,y:122.8,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.363,x:-51.85,y:130.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9441,x:-57.1,y:-23.2,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-53.494,x:116.15,y:2.4,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3643,x:-22.1,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:23.5375,x:47.45,y:-26.2,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-82.0298,x:162.85,y:-62.1,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-74.508,x:167.75,y:-72.05,regY:3}},{t:this.instance_10,p:{rotation:-14.2132,x:14.65,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1701,x:34.6,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.3177,x:-5.15,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.6897,x:-30.95,y:189.7,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.7095,x:-4.8,y:-78.9,scaleX:0.999,scaleY:0.999,regY:53.1,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.7986,x:-83.4,y:50.3,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.511,x:-47.95,y:122.8,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.356,x:-51.85,y:130.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9524,x:-57.1,y:-23.2,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-50.5685,x:108.95,y:15.55,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3528,x:-22.15,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:35.1004,x:47.6,y:-26.3,regY:-1.2}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.0852,x:159,y:-46.4,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.5498,x:164.35,y:-56.1,regY:3}},{t:this.instance_10,p:{rotation:-14.196,x:14.7,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.171,x:34.6,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.2748,x:-5.1,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.6569,x:-30.9,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.0862,x:-4.75,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.8108,x:-83.4,y:50.2,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.5155,x:-47.95,y:122.8,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3473,x:-51.8,y:130.9,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9607,x:-57.1,y:-23.2,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-47.643,x:99.4,y:27.05,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3406,x:-22.05,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:46.6638,x:47.55,y:-26.15,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-76.1398,x:152.45,y:-32.35,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.5936,x:158.4,y:-41.6,regY:3.1}},{t:this.instance_10,p:{rotation:-14.1779,x:14.7,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1721,x:34.55,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.2328,x:-5.1,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.6248,x:-30.85,y:189.7,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.4633,x:-4.75,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.8194,x:-83.4,y:50.2,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.5202,x:-47.85,y:122.8,regY:-8.4,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3393,x:-51.8,y:130.95,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9682,x:-57.1,y:-23.2,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:-44.717,x:87.5,y:36.2,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3292,x:-22.05,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:58.2285,x:47.6,y:-26.35,regY:-1.2}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-73.197,x:143.65,y:-20.25,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.6371,x:150.1,y:-29.2,regY:3.1}},{t:this.instance_10,p:{rotation:-14.159,x:14.7,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.173,x:34.55,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.1908,x:-5.1,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.592,x:-30.9,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.8415,x:-4.75,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.8292,x:-83.35,y:50.2,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.5246,x:-47.75,y:122.85,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3314,x:-51.7,y:130.95,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9776,x:-57.1,y:-23.2,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-41.7915,x:74.3,y:43.05,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3169,x:-22.05,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:69.7899,x:47.5,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.2522,x:133.15,y:-10.35,regX:-6.1,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-62.6803,x:139.85,y:-19.15,regY:3}},{t:this.instance_10,p:{rotation:-14.1418,x:14.7,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1739,x:34.5,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.1488,x:-5.15,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.5599,x:-30.8,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.2173,x:-4.8,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.1}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.8398,x:-83.35,y:50.2,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.5299,x:-47.7,y:122.85,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3242,x:-51.75,y:130.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9859,x:-57.1,y:-23.25,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-38.8651,x:59.85,y:47.05,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3064,x:-21.95,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:81.3543,x:47.65,y:-26.3,regY:-1.2}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-67.308,x:121.3,y:-3.45,regX:-6,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-59.723,x:128.6,y:-11.8,regY:3}},{t:this.instance_10,p:{rotation:-14.1244,x:14.65,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1747,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.1076,x:-5.1,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.528,x:-30.8,y:189.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5959,x:-4.7,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.8511,x:-83.3,y:50.2,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.5338,x:-47.65,y:122.85,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-97.3163,x:-51.7,y:130.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9942,x:-57.1,y:-23.2,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:-22.2993,x:61,y:46.85,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3055,x:-21.95,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:80.4533,x:47.5,y:-26.3,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-50.7419,x:134.4,y:15.9,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-43.1576,x:143.7,y:10,regY:3}},{t:this.instance_10,p:{rotation:-14.1244,x:14.6,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1739,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.1068,x:-5.1,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.528,x:-30.75,y:189.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5959,x:-4.7,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-113.867,x:-83.05,y:50.45,regX:40.5,regY:0}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-72.5486,x:-49.85,y:124.05,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-95.332,x:-54.2,y:132.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.2585,x:-57.1,y:-23.1,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:-5.7346,x:62.15,y:46.5,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3055,x:-21.95,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:79.5526,x:47.5,y:-26.3,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-34.1765,x:141.4,y:37.85,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-26.5925,x:152.05,y:34.95,regY:3.1}},{t:this.instance_10,p:{rotation:-14.1244,x:14.6,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1739,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.1068,x:-5.1,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.528,x:-30.75,y:189.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5959,x:-4.7,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-111.8829,x:-82.65,y:50.55,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-70.5657,x:-52.1,y:125.5,regY:-8.3,regX:5.6}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-93.3479,x:-56.65,y:133.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.5224,x:-57.05,y:-23.1,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:10.8287,x:63.3,y:46.3,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3055,x:-21.95,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:78.6528,x:47.6,y:-26.3,regY:-1.2}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-17.6098,x:141.65,y:60.6,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:-10.0248,x:152.75,y:60.7,regY:3}},{t:this.instance_10,p:{rotation:-14.1244,x:14.6,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1739,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.1068,x:-5.1,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.528,x:-30.75,y:189.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5959,x:-4.65,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-109.8989,x:-82.4,y:50.7,regX:40.5,regY:0}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9985,rotation:-68.583,x:-54.3,y:126.45,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-91.3645,x:-59.25,y:134.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.7872,x:-57.05,y:-23.15,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:27.3937,x:64.45,y:46.1,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3055,x:-21.95,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:77.7504,x:47.5,y:-26.3,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-1.0438,x:135.5,y:82.15,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:6.5361,x:146.1,y:85.5,regY:3.1}},{t:this.instance_10,p:{rotation:-14.1244,x:14.6,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1739,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.1068,x:-5.1,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.528,x:-30.75,y:189.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5959,x:-4.65,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.9146,x:-81.95,y:50.8,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-66.5974,x:-56.65,y:127.55,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-89.3852,x:-61.85,y:135.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.0503,x:-57.1,y:-23.15,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:43.9591,x:65.6,y:45.7,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3055,x:-21.95,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:76.851,x:47.4,y:-26.3,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:15.5177,x:123.35,y:100.6,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:23.1019,x:132.5,y:106.7,regY:3}},{t:this.instance_10,p:{rotation:-14.1244,x:14.6,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1739,x:34.5,y:187.65}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.1068,x:-5.1,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.528,x:-30.75,y:189.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5951,x:-4.65,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-105.9317,x:-81.65,y:50.75,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-64.6149,x:-59,y:128.6,regY:-8.3,regX:5.6}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-87.4,x:-64.4,y:135.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.3158,x:-57.1,y:-23.15,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:60.5257,x:66.7,y:45.55,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3055,x:-21.95,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:75.95,x:47.5,y:-26.3,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:32.0826,x:106.45,y:114.55,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:39.6679,x:113.55,y:123.05,regY:3}},{t:this.instance_10,p:{rotation:-14.1244,x:14.6,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1739,x:34.5,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.1068,x:-5.1,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.528,x:-30.75,y:189.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5951,x:-4.65,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-103.9468,x:-81.3,y:50.9,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-62.6302,x:-61.3,y:129.3,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-85.4161,x:-67,y:136.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.58,x:-57.1,y:-23.15,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:77.0909,x:67.8,y:45.1,regX:-39.9}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3055,x:-21.95,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:75.0487,x:47.45,y:-26.4,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:48.6494,x:86.3,y:122.7,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:56.2334,x:90.65,y:132.9,regY:3}},{t:this.instance_10,p:{rotation:-14.1244,x:14.55,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1739,x:34.5,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.1068,x:-5.1,y:-57.9}},{t:this.instance_6,p:{regX:3.4,rotation:10.5271,x:-30.75,y:189.6,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5951,x:-4.65,y:-79.05,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-101.9634,x:-80.95,y:51.05,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-60.6477,x:-63.65,y:130.05,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.4,rotation:-83.4318,x:-69.75,y:137.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-71.8447,x:-57.1,y:-23.2,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:76.0617,x:66.95,y:45.55,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3117,x:-22,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:75.8916,x:47.45,y:-26.3,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:47.607,x:86.65,y:122.75,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:55.1842,x:91.15,y:132.75,regY:3}},{t:this.instance_10,p:{rotation:-14.1346,x:14.65,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.173,x:34.5,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.1006,x:-5.1,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.5474,x:-30.85,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5942,x:-4.7,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-103.4475,x:-80.3,y:51.3,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-62.1344,x:-61.15,y:129.8,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-84.9284,x:-66.85,y:137,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-72.3028,x:-57.15,y:-23.2,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:75.0335,x:65.85,y:45.8,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3196,x:-22.05,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:76.7359,x:47.5,y:-26.3,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:46.5654,x:87.05,y:122.55,regX:-6,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:54.134,x:91.7,y:132.6,regY:3}},{t:this.instance_10,p:{rotation:-14.1465,x:14.65,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.173,x:34.5,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0945,x:-5.1,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.5688,x:-30.85,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5924,x:-4.7,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-104.9315,x:-79.8,y:51.45,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-63.6229,x:-58.4,y:129.4,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-86.4239,x:-64,y:136.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-72.7611,x:-57.1,y:-23.2,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:74.0031,x:64.75,y:46.15,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3275,x:-22.1,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:77.5783,x:47.45,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:45.5232,x:87.35,y:122.5,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:53.0849,x:92.25,y:132.4,regY:3}},{t:this.instance_10,p:{rotation:-14.1584,x:14.7,y:93.5,scaleX:0.998,scaleY:0.998}},{t:this.instance_9,p:{rotation:-9.1721,x:34.55,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0884,x:-5.15,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.5891,x:-30.85,y:189.55,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5907,x:-4.7,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-106.4158,x:-79.2,y:51.55,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-65.1112,x:-55.9,y:129.2,regY:-8.3,regX:5.6}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-87.9198,x:-61.2,y:136.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.2209,x:-57.05,y:-23.25,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:72.9738,x:63.65,y:46.4,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3354,x:-22.15,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:78.4224,x:47.55,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:44.4817,x:87.7,y:122.3,regX:-6,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:52.0355,x:92.75,y:132.15,regY:3}},{t:this.instance_10,p:{rotation:-14.1707,x:14.7,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1721,x:34.55,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0814,x:-5.15,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.6107,x:-30.9,y:189.7,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5898,x:-4.7,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.8997,x:-78.6,y:51.8,regX:40.5,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-66.5994,x:-53.35,y:128.65,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-89.4168,x:-58.45,y:136.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-73.6794,x:-57.1,y:-23.1,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:71.9441,x:62.65,y:46.6,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3432,x:-22.1,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:79.2657,x:47.5,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:43.4395,x:88,y:122.1,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:50.9848,x:93.2,y:131.85,regY:3}},{t:this.instance_10,p:{rotation:-14.1816,x:14.7,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.171,x:34.6,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0753,x:-5.15,y:-57.95}},{t:this.instance_6,p:{regX:3.4,rotation:10.632,x:-30.9,y:189.7,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5881,x:-4.7,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-109.3856,x:-78.05,y:51.85,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-68.0869,x:-50.75,y:128.1,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.3,rotation:-90.9081,x:-55.65,y:135.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-74.137,x:-57.15,y:-23.1,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:70.9146,x:61.6,y:46.85,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3502,x:-22.15,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:80.1086,x:47.55,y:-26.3,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:42.398,x:88.3,y:121.9,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:49.9349,x:93.75,y:131.55,regY:3}},{t:this.instance_10,p:{rotation:-14.1945,x:14.75,y:93.5,scaleX:0.998,scaleY:0.998}},{t:this.instance_9,p:{rotation:-9.171,x:34.6,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0691,x:-5.1,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.6525,x:-31,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5872,x:-4.75,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-110.8695,x:-77.5,y:52.05,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-69.5749,x:-48.2,y:127.55,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-92.4045,x:-52.9,y:135.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-74.597,x:-57.1,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.5,scaleX:0.9984,scaleY:0.9984,rotation:69.8846,x:60.6,y:47.05,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3582,x:-22.15,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:80.9511,x:47.6,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:41.3568,x:88.45,y:121.55,regX:-6.1,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:48.8847,x:94.2,y:131.1,regY:3}},{t:this.instance_10,p:{rotation:-14.206,x:14.8,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1701,x:34.65,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.063,x:-5.15,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.6739,x:-30.95,y:189.7,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5855,x:-4.8,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-112.3541,x:-76.9,y:52.25,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-71.0639,x:-45.65,y:126.9,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.4,rotation:-93.9007,x:-50.3,y:134.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.056,x:-57.15,y:-23.15,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:68.855,x:59.4,y:47.25,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.366,x:-22.15,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:81.7949,x:47.75,y:-26.3,regY:-1.2}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:40.3151,x:88.9,y:121.25,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:47.8352,x:94.7,y:130.7,regY:3}},{t:this.instance_10,p:{rotation:-14.2168,x:14.75,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1701,x:34.65,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.056,x:-5.15,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.6961,x:-31,y:189.7,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5837,x:-4.8,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-113.8392,x:-76.35,y:52.4,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-72.5514,x:-43.15,y:126.25,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-95.3971,x:-47.45,y:134.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.5135,x:-57.1,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:67.824,x:58.35,y:47.45,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.374,x:-22.1,y:91.7,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:82.638,x:47.7,y:-26.3,regY:-1.2}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:39.273,x:89.15,y:120.9,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:46.786,x:95.15,y:130.2,regY:3}},{t:this.instance_10,p:{rotation:-14.2294,x:14.8,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1693,x:34.7,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0499,x:-5.15,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.7158,x:-31.05,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5828,x:-4.8,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.3224,x:-75.75,y:52.5,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-74.0398,x:-40.65,y:125.55,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-96.8927,x:-44.75,y:133.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.9733,x:-57.1,y:-23.05,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:66.7957,x:57.3,y:47.65,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3818,x:-22.15,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:83.4804,x:47.6,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:38.2316,x:89.4,y:120.45,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:45.7356,x:95.5,y:129.75,regY:3.1}},{t:this.instance_10,p:{rotation:-14.2404,x:14.85,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1693,x:34.7,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0438,x:-5.2,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.7361,x:-31.1,y:189.7,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5811,x:-4.8,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-116.8059,x:-75.2,y:52.7,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-75.5282,x:-38.2,y:124.8,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.2,regY:-1.3,rotation:-98.3884,x:-42.05,y:133.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-76.4321,x:-57.15,y:-23,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:65.7656,x:56.2,y:47.75,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3889,x:-22.15,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:84.3249,x:47.65,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:37.1885,x:89.65,y:120.05,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:44.6861,x:96,y:129.15,regY:3}},{t:this.instance_10,p:{rotation:-14.2527,x:14.85,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1684,x:34.75,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0368,x:-5.2,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.7586,x:-31.15,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5793,x:-4.8,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-118.2911,x:-74.6,y:52.9,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-77.0161,x:-35.75,y:123.95,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.4,rotation:-99.8849,x:-39.5,y:132.25,scaleX:0.9983,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-76.8902,x:-57.15,y:-22.95,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:64.7356,x:55.15,y:47.9,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.3967,x:-22.25,y:91.7,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:85.1663,x:47.6,y:-26.3,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:36.148,x:89.85,y:119.45,regX:-6.1,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:43.6358,x:96.4,y:128.5,regY:3}},{t:this.instance_10,p:{rotation:-14.2638,x:14.9,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1684,x:34.75,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0306,x:-5.2,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.778,x:-31.15,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5785,x:-4.75,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-119.7756,x:-74.05,y:52.95,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.5044,x:-33.3,y:123,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-101.3809,x:-36.7,y:131.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.3501,x:-57.15,y:-23,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:63.7071,x:54,y:47.9,regX:-39.9}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.4047,x:-22.2,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9986,scaleY:0.9985,rotation:86.0112,x:47.65,y:-26.3,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:35.1061,x:90.1,y:119,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:42.5869,x:96.7,y:127.85,regY:3}},{t:this.instance_10,p:{rotation:-14.2765,x:14.85,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1675,x:34.75,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0245,x:-5.15,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.7996,x:-31.2,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5767,x:-4.75,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-121.2592,x:-73.45,y:53.2,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.9937,x:-30.9,y:122.1,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-102.8769,x:-34.1,y:130.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-77.8086,x:-57.05,y:-23.05,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:62.6748,x:53,y:48.1,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.4125,x:-22.2,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:86.8534,x:47.7,y:-26.25,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:34.0636,x:90.35,y:118.45,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:41.536,x:97.05,y:127.2,regY:3.1}},{t:this.instance_10,p:{rotation:-14.2876,x:14.95,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1675,x:34.8,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0175,x:-5.15,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.8209,x:-31.3,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5758,x:-4.75,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-122.7433,x:-72.85,y:53.3,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-81.4816,x:-28.55,y:121.05,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.2,rotation:-104.3733,x:-31.35,y:129.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-78.2668,x:-57.15,y:-22.95,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:61.6466,x:51.95,y:48.2,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.4204,x:-22.3,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:87.6966,x:47.7,y:-26.2,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:33.0217,x:90.55,y:117.9,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:40.4877,x:97.5,y:126.45,regY:3}},{t:this.instance_10,p:{rotation:-14.2984,x:14.95,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1675,x:34.8,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0114,x:-5.15,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.8415,x:-31.3,y:189.6,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5741,x:-4.75,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-124.229,x:-72.25,y:53.45,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-82.9688,x:-26.25,y:120.05,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.3,rotation:-105.8695,x:-28.95,y:128.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-78.726,x:-57.15,y:-22.9,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:60.6178,x:50.8,y:48.2,regX:-39.9}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.4274,x:-22.25,y:91.65,regX:2.2}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:88.5411,x:47.65,y:-26.2,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:31.9803,x:90.65,y:117.25,regX:-6,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:39.4372,x:97.9,y:125.7,regY:3}},{t:this.instance_10,p:{rotation:-14.3101,x:14.95,y:93.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1667,x:34.85,y:187.6}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0053,x:-5.15,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.8628,x:-31.3,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5723,x:-4.75,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-125.7124,x:-71.65,y:53.6,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-84.4585,x:-23.95,y:119,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.3,regY:-1.4,rotation:-107.3648,x:-26.55,y:127.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.1845,x:-57.15,y:-22.95,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-0.4,scaleX:0.9984,scaleY:0.9984,rotation:59.5877,x:49.8,y:48.35,regX:-39.8}},{t:this.instance_14,p:{scaleX:0.9987,scaleY:0.9987,rotation:3.4353,x:-22.1,y:91.65,regX:2.3}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:89.3827,x:47.75,y:-26.1,regY:-1.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:30.9391,x:90.85,y:116.45,regX:-6.1,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:38.3873,x:98.2,y:124.8,regY:3}},{t:this.instance_10,p:{rotation:-14.3216,x:15,y:93.55,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_9,p:{rotation:-9.1667,x:34.85,y:187.6}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9991,scaleY:0.9991,rotation:-0.0009,x:-5.2,y:-58.05}},{t:this.instance_6,p:{regX:3.4,rotation:10.8843,x:-31.35,y:189.65,scaleX:0.9986,scaleY:0.9986}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5715,x:-4.75,y:-79.1,scaleX:0.9991,scaleY:0.9991,regY:53,regX:0.2}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.1962,x:-71.1,y:53.7,regX:40.6,regY:0.1}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-85.9452,x:-21.6,y:117.75,regY:-8.3,regX:5.7}},{t:this.instance_1,p:{regX:6.4,regY:-1.4,rotation:-108.8609,x:-23.95,y:126.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.6424,x:-57.15,y:-22.85,regX:35.6}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-96.5,-214.2,276.7,518.2);


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

	// Armature_1
	this.instance = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance.setTransform(-38.25,139.7,0.9983,0.9983,-72.854,0,0,6.7,-1.6);

	this.instance_1 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_1.setTransform(-39.7,131.85,0.9984,0.9984,-107.4289,0,0,5.4,-9.2);

	this.instance_2 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_2.setTransform(-64.85,50.7,0.9985,0.9985,-107.1547,0,0,44.1,-0.2);

	this.instance_3 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_3.setTransform(-57.35,-23,0.9985,0.9985,-84.0975,0,0,35.4,0.2);

	this.instance_4 = new lib.ch1_headcopy_1("synched",0);
	this.instance_4.setTransform(-5.45,-79.35,0.999,0.999,1.7217,0,0,-0.1,52.8);

	this.instance_5 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_6.setTransform(-25.55,188.4,0.9983,0.9983,28.6177,0,0,1.9,-55.1);

	this.instance_7 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_7.setTransform(-5.6,-57.85,0.9991,0.9991,-1.6734,0,0,-1.2,9.1);

	this.instance_8 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_8.setTransform(-5.55,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_9.setTransform(40.55,185.5,0.998,0.998,-2.7694,0,0,3.4,-53.6);

	this.instance_10 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_10.setTransform(17.6,92.05,0.998,0.998,-16.3045,0,0,-1,1.4);

	this.instance_11 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_11.setTransform(77.15,109.2,0.9984,0.9984,10.6836,0,0,-5.2,3.2);

	this.instance_12 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_12.setTransform(68.3,103.4,0.9985,0.9985,13.8286,0,0,-6,8.4);

	this.instance_13 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_13.setTransform(21.85,38.85,0.9984,0.9984,54.066,0,0,-39.4,-1.2);

	this.instance_14 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_14.setTransform(47.8,-26.3,0.9985,0.9984,111.8855,0,0,-31.3,-1.2);

	this.instance_15 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_15.setTransform(-20.2,92.4,0.9984,0.9984,0.6673,0,0,2.1,-46.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regY:-46.1,rotation:0.6673,x:-20.2,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.3,regY:-1.2,scaleX:0.9985,scaleY:0.9984,rotation:111.8855,x:47.8,y:-26.3}},{t:this.instance_13,p:{regY:-1.2,scaleX:0.9984,scaleY:0.9984,rotation:54.066,x:21.85,y:38.85,regX:-39.4}},{t:this.instance_12,p:{rotation:13.8286,x:68.3,y:103.4,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.2,regY:3.2,scaleX:0.9984,scaleY:0.9984,rotation:10.6836,x:77.15,y:109.2}},{t:this.instance_10,p:{regY:1.4,scaleX:0.998,scaleY:0.998,rotation:-16.3045,x:17.6,y:92.05}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-2.7694,x:40.55,y:185.5}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-1.6734,x:-5.6,y:-57.85}},{t:this.instance_6,p:{regX:1.9,scaleX:0.9983,scaleY:0.9983,rotation:28.6177,x:-25.55,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,scaleX:0.999,scaleY:0.999,rotation:1.7217,x:-5.45,y:-79.35}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9985,scaleY:0.9985,rotation:-84.0975,x:-57.35,y:-23}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-107.1547,x:-64.85,y:50.7,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.4289,x:-39.7,y:131.85,regX:5.4}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-72.854,x:-38.25,y:139.7,regY:-1.6}}]}).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6655,x:-20.15,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.3,scaleX:0.9984,scaleY:0.9983,rotation:106.7717,x:47.95,y:-26.45}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:40.0295,x:27.7,y:40.85,regX:-39.4}},{t:this.instance_12,p:{rotation:-0.204,x:88.4,y:92.25,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-3.3481,x:98.5,y:95.75}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.304,x:17.5,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.7686,x:40.5,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6726,x:-5.55,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.4,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:1.7209,x:-5.4,y:-79.35}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.0988,x:-57.25,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1533,x:-64.8,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4285,x:-39.65,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8552,x:-38.2,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6655,x:-20.15,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:101.6576,x:47.75,y:-26.5}},{t:this.instance_13,p:{regY:-1.2,scaleX:0.9983,scaleY:0.9983,rotation:25.9929,x:33.8,y:42.25,regX:-39.4}},{t:this.instance_12,p:{rotation:-14.2401,x:105.1,y:77.5,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-17.3853,x:115.9,y:78.4}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.304,x:17.5,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.7686,x:40.5,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6726,x:-5.55,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.35,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:1.7209,x:-5.4,y:-79.35}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.0988,x:-57.25,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1533,x:-64.8,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4285,x:-39.65,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8552,x:-38.15,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6655,x:-20.15,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:96.5438,x:47.7,y:-26.5}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:11.955,x:39.9,y:43.45,regX:-39.4}},{t:this.instance_12,p:{rotation:-28.277,x:117.6,y:60.15,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.2,scaleX:0.9983,scaleY:0.9983,rotation:-31.4238,x:128.2,y:58.35}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.304,x:17.5,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.7686,x:40.5,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6717,x:-5.55,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.35,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:1.7209,x:-5.4,y:-79.35}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.0988,x:-57.25,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1524,x:-64.8,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4285,x:-39.65,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8552,x:-38.15,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6647,x:-20.15,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:91.4311,x:47.7,y:-26.55}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-2.0776,x:46.15,y:43.8,regX:-39.4}},{t:this.instance_12,p:{rotation:-42.3149,x:125.5,y:41.15,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-45.4595,x:135.45,y:37}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.304,x:17.45,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.7677,x:40.5,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6717,x:-5.55,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.35,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:1.7209,x:-5.4,y:-79.35}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.0988,x:-57.25,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1524,x:-64.8,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4285,x:-39.65,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8552,x:-38.15,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6647,x:-20.15,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:86.3194,x:47.7,y:-26.55}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-16.1134,x:52.35,y:43.7,regX:-39.4}},{t:this.instance_12,p:{rotation:-56.3517,x:128.8,y:21.85,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-59.497,x:137.3,y:15.35}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.304,x:17.45,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.7677,x:40.5,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6717,x:-5.55,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.35,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:1.72,x:-5.4,y:-79.35}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.0988,x:-57.25,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1524,x:-64.8,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4285,x:-39.65,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8552,x:-38.1,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6647,x:-20.15,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:81.2064,x:47.65,y:-26.6}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:-30.15,x:58.65,y:43,regX:-39.4}},{t:this.instance_12,p:{rotation:-70.3887,x:127.4,y:3.35,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-73.5347,x:134.15,y:-4.85}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.304,x:17.45,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.7669,x:40.5,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6708,x:-5.55,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.3,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:1.72,x:-5.4,y:-79.35}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.0997,x:-57.25,y:-22.9}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1516,x:-64.85,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4285,x:-39.65,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8561,x:-38.1,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6638,x:-20.15,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:76.0929,x:47.6,y:-26.65}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-44.1876,x:64.75,y:41.75,regX:-39.4}},{t:this.instance_12,p:{rotation:-84.4239,x:121.85,y:-13.4,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.4,scaleX:0.9984,scaleY:0.9984,rotation:-87.5709,x:126.5,y:-23.1}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.304,x:17.45,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.7669,x:40.5,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6708,x:-5.55,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.3,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:1.72,x:-5.4,y:-79.35}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.0997,x:-57.25,y:-22.9}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1516,x:-64.85,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4285,x:-39.6,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8561,x:-38.05,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6638,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:70.979,x:47.65,y:-26.6}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-58.2234,x:70.8,y:39.9,regX:-39.4}},{t:this.instance_12,p:{rotation:-98.4578,x:112.8,y:-27.35,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-101.6028,x:114.8,y:-37.9}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3032,x:17.45,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.7669,x:40.5,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6708,x:-5.55,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.3,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:1.72,x:-5.4,y:-79.4}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.0997,x:-57.25,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1513,x:-64.85,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4285,x:-39.6,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8561,x:-38.05,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6638,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.3,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:65.8647,x:47.65,y:-26.55}},{t:this.instance_13,p:{regY:-1.2,scaleX:0.9984,scaleY:0.9984,rotation:-72.2604,x:76.55,y:37.55,regX:-39.4}},{t:this.instance_12,p:{rotation:-112.4941,x:100.95,y:-37.85,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-115.6411,x:100.35,y:-48.65}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3032,x:17.45,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.45,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6699,x:-5.5,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.3,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:1.72,x:-5.35,y:-79.4}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.0997,x:-57.25,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1513,x:-64.8,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4285,x:-39.55,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8561,x:-38.05,y:139.7,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6638,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:47.8664,x:47.55,y:-26.55}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-71.6271,x:95,y:25.65,regX:-39.4}},{t:this.instance_12,p:{rotation:-111.8586,x:120.3,y:-49.65,scaleX:0.9984,scaleY:0.9984,regY:8.5}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-115.0057,x:119.8,y:-60.5}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3032,x:17.4,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.45,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6559,x:-5.55,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.25,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:0.8507,x:-5.35,y:-79.3}},{t:this.instance_3,p:{regX:35.4,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-82.136,x:-57.15,y:-23.05}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-108.2514,x:-67.25,y:50.3,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.5297,x:-40.5,y:131.05,regX:5.4}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-73.9575,x:-38.8,y:138.85,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6629,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:29.8669,x:47.5,y:-26.45}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:-70.9918,x:108.8,y:8.5,regX:-39.4}},{t:this.instance_12,p:{rotation:-111.2245,x:134.8,y:-66.5,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-114.3713,x:134.5,y:-77.35}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3032,x:17.4,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.45,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6411,x:-5.55,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.25,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.014,x:-5.3,y:-79.3}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-80.1704,x:-57.15,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-109.3538,x:-69.8,y:49.95,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.6297,x:-41.45,y:130.1,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-75.0599,x:-39.55,y:137.95,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6629,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:11.8688,x:47.45,y:-26.45}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-70.359,x:116.55,y:-12.05,regX:-39.4}},{t:this.instance_12,p:{rotation:-110.5898,x:143.4,y:-86.8,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-113.7366,x:143.1,y:-97.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3032,x:17.4,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.45,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6262,x:-5.5,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.25,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.884,x:-5.35,y:-79.3}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-78.2061,x:-57.25,y:-23.05}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-110.4541,x:-72.25,y:49.45,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.7316,x:-42.4,y:129.1,regX:5.4}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-76.1622,x:-40.35,y:136.85,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6629,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-6.1252,x:47.5,y:-26.4}},{t:this.instance_13,p:{regY:-1.2,scaleX:0.9984,scaleY:0.9984,rotation:-69.7243,x:117.5,y:-34.05,regX:-39.4}},{t:this.instance_12,p:{rotation:-109.9559,x:145.3,y:-108.45,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-113.1017,x:145.2,y:-119.3}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3026,x:17.4,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.45,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-1.6122,x:-5.5,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.25,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-1.7533,x:-5.25,y:-79.35}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-76.2405,x:-57.25,y:-23.1}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-111.5554,x:-74.7,y:48.9,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.8333,x:-43.45,y:127.9,regX:5.4}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-77.2636,x:-41.2,y:135.7,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6629,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-24.1259,x:47.5,y:-26.35}},{t:this.instance_13,p:{regY:-1.2,scaleX:0.9984,scaleY:0.9984,rotation:-69.0911,x:111.7,y:-55.3,regX:-39.4}},{t:this.instance_12,p:{rotation:-109.3205,x:140.25,y:-129.3,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-112.4662,x:140.3,y:-140.2}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3012,x:17.4,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.45,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.5982,x:-5.5,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.25,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-2.623,x:-5.25,y:-79.3}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9983,scaleY:0.9983,rotation:-74.2744,x:-57.2,y:-23.05}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-112.6571,x:-77.1,y:48.25,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.9348,x:-44.25,y:126.85,regX:5.3}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-78.3658,x:-41.8,y:134.4,regY:-1.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6629,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-42.1249,x:47.5,y:-26.3}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:-68.4559,x:99.7,y:-73.65,regX:-39.4}},{t:this.instance_12,p:{rotation:-108.6855,x:128.95,y:-147.5,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-111.8318,x:129.1,y:-158.35}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3012,x:17.4,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.5833,x:-5.5,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.25,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.4924,x:-5.25,y:-79.35}},{t:this.instance_3,p:{regX:35.3,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-72.3105,x:-57.25,y:-23}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-113.7587,x:-79.55,y:47.55,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.0354,x:-45.25,y:125.35,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-79.467,x:-42.75,y:132.95,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6629,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-42.4535,x:47.45,y:-26.3}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:-68.6378,x:99.45,y:-73.9,regX:-39.4}},{t:this.instance_12,p:{rotation:-108.8666,x:128.65,y:-147.9,scaleX:0.9984,scaleY:0.9984,regY:8.5}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-112.0144,x:128.5,y:-158.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3012,x:17.35,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6376,x:-5.55,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.2,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.4671,x:-5.25,y:-79.3}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-73.3811,x:-57.25,y:-23.05}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-113.1575,x:-78.2,y:47.95,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.435,x:-44.75,y:126.1,regX:5.4}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-78.867,x:-42.15,y:133.8,regY:-1.5}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6629,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-42.7844,x:47.45,y:-26.3}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-68.8191,x:99.2,y:-74.2,regX:-39.4}},{t:this.instance_12,p:{rotation:-109.0491,x:128,y:-148.25,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-112.1948,x:128,y:-159.2}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3004,x:17.35,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-1.6918,x:-5.55,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.2,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.4417,x:-5.3,y:-79.3}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-74.4537,x:-57.3,y:-23.05}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-112.5574,x:-76.85,y:48.45,regX:44}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.8336,x:-44.2,y:126.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-78.2646,x:-41.9,y:134.55,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6629,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-43.1134,x:47.45,y:-26.2}},{t:this.instance_13,p:{regY:-1.2,scaleX:0.9984,scaleY:0.9984,rotation:-68.9998,x:98.8,y:-74.6,regX:-39.4}},{t:this.instance_12,p:{rotation:-109.23,x:127.4,y:-148.6,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-112.3766,x:127.5,y:-159.45}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3004,x:17.35,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.7461,x:-5.5,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.2,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.4171,x:-5.3,y:-79.3}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-75.5256,x:-57.2,y:-23.05}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-111.9557,x:-75.6,y:48.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.2325,x:-43.7,y:127.6,regX:5.3}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-77.6648,x:-41.4,y:135.2,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.662,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.3,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-43.4436,x:47.5,y:-26.3}},{t:this.instance_13,p:{regY:-1.2,scaleX:0.9984,scaleY:0.9984,rotation:-69.1815,x:98.5,y:-74.9,regX:-39.4}},{t:this.instance_12,p:{rotation:-109.4108,x:127,y:-148.95,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-112.5581,x:127,y:-159.8}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3004,x:17.35,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.8013,x:-5.55,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.2,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.3916,x:-5.35,y:-79.3}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-76.5973,x:-57.25,y:-23.1}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-111.356,x:-74.2,y:49,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.6316,x:-43.15,y:128.3,regX:5.3}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-77.0624,x:-40.95,y:135.95,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.662,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-43.7744,x:47.4,y:-26.15}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:-69.3635,x:98.25,y:-75.15,regX:-39.4}},{t:this.instance_12,p:{rotation:-109.593,x:126.4,y:-149.3,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-112.7394,x:126.45,y:-160.15}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3004,x:17.35,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.8565,x:-5.55,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.2,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.3663,x:-5.3,y:-79.3}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-77.669,x:-57.25,y:-23.1}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-110.754,x:-72.85,y:49.35,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.0307,x:-42.7,y:128.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-76.4623,x:-40.55,y:136.6,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.662,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-44.1045,x:47.45,y:-26.25}},{t:this.instance_13,p:{regY:-1.2,scaleX:0.9984,scaleY:0.9984,rotation:-69.5461,x:97.95,y:-75.4,regX:-39.4}},{t:this.instance_12,p:{rotation:-109.7733,x:126.05,y:-149.7,scaleX:0.9984,scaleY:0.9984,regY:8.5}},{t:this.instance_11,p:{regX:-5.1,regY:3.4,scaleX:0.9983,scaleY:0.9983,rotation:-112.9211,x:126,y:-160.6}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3004,x:17.35,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-1.9107,x:-5.55,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.2,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.3408,x:-5.35,y:-79.3}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-78.7424,x:-57.3,y:-23.05}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-110.1529,x:-71.45,y:49.55,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.4296,x:-42.15,y:129.35,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-75.8624,x:-40.1,y:137.15,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.662,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.3,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-44.4359,x:47.5,y:-26.25}},{t:this.instance_13,p:{regY:-1.2,scaleX:0.9984,scaleY:0.9984,rotation:-69.7282,x:97.6,y:-75.7,regX:-39.4}},{t:this.instance_12,p:{rotation:-109.9559,x:125.45,y:-150.05,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-113.1028,x:125.35,y:-160.95}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3004,x:17.35,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.9668,x:-5.55,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.2,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.999,scaleY:0.999,rotation:-3.3153,x:-5.35,y:-79.4}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-79.8145,x:-57.25,y:-23.05}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-109.5524,x:-70.15,y:49.85,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.8305,x:-41.65,y:129.95,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-75.2602,x:-39.7,y:137.8,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.662,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-44.7647,x:47.4,y:-26.2}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-69.9083,x:97.4,y:-75.95,regX:-39.4}},{t:this.instance_12,p:{rotation:-110.1368,x:124.85,y:-150.5,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-113.284,x:124.8,y:-161.25}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3004,x:17.35,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.021,x:-5.55,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.2,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.29,x:-5.4,y:-79.35}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-80.8877,x:-57.25,y:-23}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.9514,x:-68.75,y:50.05,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.2287,x:-41.1,y:130.4,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-74.6605,x:-39.25,y:138.3,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.662,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.3,scaleX:0.9984,scaleY:0.9983,rotation:-45.0954,x:47.3,y:-26.3}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:-70.09,x:97.05,y:-76.1,regX:-39.5}},{t:this.instance_12,p:{rotation:-110.3174,x:124.4,y:-150.85,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-113.4653,x:124.15,y:-161.75}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3004,x:17.35,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-2.0762,x:-5.5,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.2,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2645,x:-5.4,y:-79.35}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-81.9586,x:-57.3,y:-23.05}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-108.3505,x:-67.4,y:50.3,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.6285,x:-40.55,y:131.1,regX:5.3}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-74.0604,x:-38.8,y:138.8,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.662,x:-20.1,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-45.4254,x:47.35,y:-26.15}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9984,rotation:-70.272,x:96.8,y:-76.45,regX:-39.5}},{t:this.instance_12,p:{rotation:-110.4997,x:123.8,y:-151.2,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-113.6468,x:123.6,y:-162.1}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3004,x:17.35,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.4}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1314,x:-5.5,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.2,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2391,x:-5.45,y:-79.35}},{t:this.instance_3,p:{regX:35.4,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-83.0315,x:-57.3,y:-23.1}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.7501,x:-65.95,y:50.45,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.027,x:-40.05,y:131.4,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-73.4595,x:-38.3,y:139.3,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.662,x:-20.1,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-45.7561,x:47.4,y:-26.2}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:-70.4526,x:96.45,y:-76.75,regX:-39.4}},{t:this.instance_12,p:{rotation:-110.6817,x:123.35,y:-151.5,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-113.828,x:123,y:-162.5}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.3004,x:17.3,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.4}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1866,x:-5.45,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.15,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2137,x:-5.4,y:-79.35}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1015,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.75,y:50.6,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4269,x:-39.6,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.858,x:-37.9,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.662,x:-20.1,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-31.6596,x:47.25,y:-26.2}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-69.7592,x:107.35,y:-63.35,regX:-39.4}},{t:this.instance_12,p:{rotation:-109.9855,x:135.05,y:-137.7,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-113.1334,x:134.9,y:-148.6}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.3,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.4}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1857,x:-5.45,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.15,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2137,x:-5.4,y:-79.3}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1015,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.7,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4269,x:-39.55,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.858,x:-37.9,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6612,x:-20.1,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-17.5637,x:47.25,y:-26.25}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-69.0647,x:114.5,y:-47.6,regX:-39.4}},{t:this.instance_12,p:{rotation:-109.2914,x:143.2,y:-121.7,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-112.4387,x:143.15,y:-132.6}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.3,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1857,x:-5.45,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.15,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2128,x:-5.4,y:-79.3}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1023,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.7,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4269,x:-39.55,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8588,x:-37.9,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6612,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:-3.4674,x:47.25,y:-26.3}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-68.3688,x:117.8,y:-30.7,regX:-39.4}},{t:this.instance_12,p:{rotation:-108.5955,x:147.25,y:-104.35,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-111.7434,x:147.35,y:-115.25}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.3,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1848,x:-5.45,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.15,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.212,x:-5.4,y:-79.25}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1023,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.7,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4269,x:-39.55,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8588,x:-37.9,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6612,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.3,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:10.6255,x:47.3,y:-26.35}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:-67.6743,x:116.65,y:-13.3,regX:-39.5}},{t:this.instance_12,p:{rotation:-107.9008,x:147.15,y:-86.8,scaleX:0.9984,scaleY:0.9984,regY:8.5}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-111.0481,x:147.3,y:-97.7}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.25,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1848,x:-5.45,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.1,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.212,x:-5.4,y:-79.25}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1023,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.7,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4277,x:-39.5,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8588,x:-37.85,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6603,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:24.7217,x:47.15,y:-26.35}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-66.9791,x:111.45,y:3.05,regX:-39.4}},{t:this.instance_12,p:{rotation:-107.206,x:142.65,y:-70,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-110.3528,x:143.15,y:-80.85}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.25,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.35,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1839,x:-5.45,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.1,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2111,x:-5.4,y:-79.2}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1032,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.7,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4277,x:-39.5,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8597,x:-37.85,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6603,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.3,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:38.8178,x:47.25,y:-26.4}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:-66.2852,x:102.4,y:17.8,regX:-39.4}},{t:this.instance_12,p:{rotation:-106.5118,x:134.5,y:-54.8,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-109.6582,x:135,y:-65.65}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.25,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.35,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1839,x:-5.45,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.1,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2102,x:-5.4,y:-79.2}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1032,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.7,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4277,x:-39.5,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8597,x:-37.85,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6603,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.3,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:52.9136,x:47.2,y:-26.35}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:-65.589,x:90,y:29.85,regX:-39.4}},{t:this.instance_12,p:{rotation:-105.816,x:122.9,y:-42.35,scaleX:0.9984,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-108.9633,x:123.6,y:-53.2}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.25,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.35,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1831,x:-5.4,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.1,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2102,x:-5.4,y:-79.2}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1032,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.148,x:-64.65,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4277,x:-39.45,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8597,x:-37.85,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6603,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:57.0738,x:47.15,y:-26.5}},{t:this.instance_13,p:{regY:-1.2,scaleX:0.9984,scaleY:0.9984,rotation:-49.4181,x:85.7,y:32.6,regX:-39.4}},{t:this.instance_12,p:{rotation:-89.6489,x:137.55,y:-27.3,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-92.792,x:141.2,y:-37.5}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.25,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.35,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1831,x:-5.45,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.1,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2102,x:-5.4,y:-79.2}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1032,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.65,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4277,x:-39.45,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8597,x:-37.85,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6603,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:61.2326,x:47.2,y:-26.6}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-33.2468,x:81.35,y:35.35,regX:-39.4}},{t:this.instance_12,p:{rotation:-73.4793,x:147.9,y:-7.85,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.2,scaleX:0.9983,scaleY:0.9983,rotation:-76.6264,x:154.15,y:-16.75}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.25,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.35,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1831,x:-5.45,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.1,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2102,x:-5.4,y:-79.2}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1032,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.65,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4277,x:-39.45,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8597,x:-37.85,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6603,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:65.3916,x:47.2,y:-26.6}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-17.0765,x:76.75,y:37.65,regX:-39.4}},{t:this.instance_12,p:{rotation:-57.3081,x:152.7,y:14.65,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-60.4548,x:161.3,y:7.85}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.25,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.35,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1831,x:-5.45,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.1,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2102,x:-5.4,y:-79.2}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1032,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.65,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4277,x:-39.45,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8597,x:-37.85,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6603,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:69.5511,x:47.2,y:-26.55}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:-0.9046,x:72,y:39.6,regX:-39.4}},{t:this.instance_12,p:{rotation:-41.1366,x:151.45,y:38.6,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-44.2841,x:161.55,y:34.5}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.25,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.35,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1839,x:-5.45,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.05,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2102,x:-5.4,y:-79.2}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1032,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.65,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4277,x:-39.45,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8597,x:-37.85,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6603,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:73.7115,x:47.2,y:-26.65}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:15.2629,x:67.15,y:41.25,regX:-39.4}},{t:this.instance_12,p:{rotation:-24.9652,x:143.65,y:62.35,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:-28.1118,x:154.55,y:61.25}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.25,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.35,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1839,x:-5.45,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.05,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2102,x:-5.4,y:-79.25}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1032,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.65,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4269,x:-39.5,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8597,x:-37.85,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6603,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:77.8706,x:47.2,y:-26.65}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:31.4346,x:62.2,y:42.5,regX:-39.4}},{t:this.instance_12,p:{rotation:-8.7941,x:129.85,y:84.05,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.2,scaleX:0.9984,scaleY:0.9984,rotation:-11.9409,x:140.45,y:85.95}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.2,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.35,y:185.45}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1839,x:-5.45,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.05,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2102,x:-5.4,y:-79.25}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1032,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.7,y:50.6,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4269,x:-39.55,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8588,x:-37.85,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6612,x:-20.1,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:82.0297,x:47.25,y:-26.6}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:47.6047,x:57.15,y:43.3,regX:-39.4}},{t:this.instance_12,p:{rotation:7.373,x:110.5,y:102.15,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9984,scaleY:0.9984,rotation:4.2257,x:120.15,y:107}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.2,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.4}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1839,x:-5.45,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.05,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2102,x:-5.4,y:-79.25}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1024,x:-57.2,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.7,y:50.6,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4269,x:-39.55,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8588,x:-37.85,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6612,x:-20.1,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:86.1887,x:47.3,y:-26.7}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:63.7757,x:51.95,y:43.7,regX:-39.5}},{t:this.instance_12,p:{rotation:23.5425,x:86.95,y:115.2,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5,regY:3.4,scaleX:0.9983,scaleY:0.9983,rotation:20.3966,x:94.95,y:122.7}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.2,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.4}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1839,x:-5.45,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.05,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2111,x:-5.4,y:-79.25}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1023,x:-57.15,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1505,x:-64.7,y:50.6,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4269,x:-39.55,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8588,x:-37.85,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6612,x:-20.1,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:90.3442,x:47.3,y:-26.65}},{t:this.instance_13,p:{regY:-1.2,scaleX:0.9984,scaleY:0.9984,rotation:79.9471,x:47.05,y:44,regX:-39.4}},{t:this.instance_12,p:{rotation:39.7141,x:60.55,y:122.3,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:36.5671,x:66.2,y:131.6}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2996,x:17.2,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.766,x:40.4,y:185.4}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1839,x:-5.45,y:-57.7}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6179,x:-25.05,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-3.2111,x:-5.4,y:-79.3}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1023,x:-57.15,y:-22.85}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1505,x:-64.7,y:50.6,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4269,x:-39.55,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8588,x:-37.85,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6524,x:-20.2,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:92.2881,x:47.3,y:-26.6}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:77.5756,x:44.6,y:44.05,regX:-39.4}},{t:this.instance_12,p:{rotation:37.3534,x:61.45,y:121.55,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:34.232,x:67.4,y:130.65}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2757,x:17.3,y:92.15}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.7239,x:40.4,y:185.5}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.1419,x:-5.45,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6191,x:-25.15,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-2.7614,x:-5.4,y:-79.25}},{t:this.instance_3,p:{regX:35.3,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-84.1137,x:-57.3,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1491,x:-64.7,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4011,x:-39.5,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8508,x:-37.95,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6454,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:94.2319,x:47.35,y:-26.6}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:75.2032,x:42.2,y:43.75,regX:-39.5}},{t:this.instance_12,p:{rotation:34.9924,x:62.35,y:120.65,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:31.8971,x:68.65,y:129.5}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.253,x:17.35,y:92.15}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.68,x:40.3,y:185.5}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.099,x:-5.45,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6211,x:-25.15,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.999,scaleY:0.999,rotation:-2.3138,x:-5.35,y:-79.3}},{t:this.instance_3,p:{regX:35.3,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-84.1252,x:-57.3,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1486,x:-64.7,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.3753,x:-39.5,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8433,x:-37.95,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6375,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.3,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:96.1764,x:47.4,y:-26.45}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:72.8326,x:39.9,y:43.65,regX:-39.4}},{t:this.instance_12,p:{rotation:32.6328,x:63.15,y:119.6,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.2,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:29.5625,x:69.75,y:128.05}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.23,x:17.35,y:92.15}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.6371,x:40.3,y:185.5}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-2.057,x:-5.45,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.625,x:-25.15,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-1.8645,x:-5.45,y:-79.3}},{t:this.instance_3,p:{regX:35.3,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-84.1367,x:-57.3,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1477,x:-64.7,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.3487,x:-39.5,y:131.75,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.835,x:-37.95,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6288,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:98.1198,x:47.5,y:-26.6}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:70.4592,x:37.65,y:43.35,regX:-39.4}},{t:this.instance_12,p:{rotation:30.2718,x:63.95,y:118.3,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:27.2285,x:70.9,y:126.5}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.2064,x:17.35,y:92.15}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.5933,x:40.35,y:185.55}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-2.014,x:-5.5,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.627,x:-25.15,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-1.4171,x:-5.4,y:-79.25}},{t:this.instance_3,p:{regX:35.3,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-84.1482,x:-57.3,y:-22.9}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1469,x:-64.7,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.3238,x:-39.55,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8259,x:-38,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6209,x:-20.1,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:100.0641,x:47.6,y:-26.55}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:68.0887,x:35.2,y:42.9,regX:-39.4}},{t:this.instance_12,p:{rotation:27.9119,x:64.7,y:116.75,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:24.8937,x:72.1,y:124.7}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.1826,x:17.4,y:92.15}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.5511,x:40.2,y:185.5}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-1.972,x:-5.5,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6309,x:-25.15,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.968,x:-5.4,y:-79.25}},{t:this.instance_3,p:{regX:35.3,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-84.1587,x:-57.3,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1469,x:-64.7,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.2975,x:-39.6,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8178,x:-37.95,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.613,x:-20.15,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:102.0074,x:47.55,y:-26.45}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:65.7172,x:33,y:42.45,regX:-39.4}},{t:this.instance_12,p:{rotation:25.5504,x:65.5,y:114.95,scaleX:0.9984,scaleY:0.9984,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:22.5581,x:73.15,y:122.6}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.1598,x:17.4,y:92.15}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.5064,x:40.25,y:185.6}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.9282,x:-5.5,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6332,x:-25.2,y:188.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.999,scaleY:0.999,rotation:-0.5199,x:-5.45,y:-79.3}},{t:this.instance_3,p:{regX:35.3,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-84.1701,x:-57.3,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1458,x:-64.65,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.2717,x:-39.55,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8084,x:-38,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.6042,x:-20.1,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:103.9523,x:47.65,y:-26.5}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:63.3449,x:30.75,y:41.9,regX:-39.4}},{t:this.instance_12,p:{rotation:23.1911,x:66.15,y:113.05,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.2,regY:3.4,scaleX:0.9983,scaleY:0.9983,rotation:20.2236,x:74.05,y:120.35}},{t:this.instance_10,p:{regY:1.5,scaleX:0.998,scaleY:0.998,rotation:-16.1352,x:17.4,y:92.1}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.4634,x:40.2,y:185.55}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.8853,x:-5.5,y:-57.75}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6367,x:-25.25,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0709,x:-5.4,y:-79.3}},{t:this.instance_3,p:{regX:35.3,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-84.1816,x:-57.25,y:-22.9}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.145,x:-64.65,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.246,x:-39.55,y:131.7,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.8012,x:-38,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.5964,x:-20,y:92.45,regX:2.2}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:105.8955,x:47.65,y:-26.45}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:60.9744,x:28.4,y:41.1,regX:-39.5}},{t:this.instance_12,p:{rotation:20.8308,x:66.85,y:110.95,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.4,scaleX:0.9983,scaleY:0.9983,rotation:17.8886,x:75.05,y:117.95}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.1116,x:17.4,y:92.15}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-2.4213,x:40.2,y:185.55}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.8442,x:-5.55,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6399,x:-25.2,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.999,scaleY:0.999,rotation:0.3728,x:-5.45,y:-79.3}},{t:this.instance_3,p:{regX:35.3,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-84.193,x:-57.35,y:-22.9}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1441,x:-64.65,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.2194,x:-39.6,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.7921,x:-38.05,y:139.6,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.5885,x:-20.2,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.3,scaleX:0.9984,scaleY:0.9983,rotation:107.8401,x:47.85,y:-26.45}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9983,scaleY:0.9983,rotation:58.6024,x:26.3,y:40.6,regX:-39.4}},{t:this.instance_12,p:{rotation:18.469,x:67.45,y:108.55,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:15.5534,x:75.95,y:115.1}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.088,x:17.45,y:92.15}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-2.3774,x:40.2,y:185.65}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.8013,x:-5.55,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6411,x:-25.2,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:0.8218,x:-5.4,y:-79.3}},{t:this.instance_3,p:{regX:35.3,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-84.2036,x:-57.35,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1433,x:-64.65,y:50.65,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.1939,x:-39.6,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.7846,x:-38.1,y:139.6,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.5797,x:-20.15,y:92.4,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:109.784,x:47.8,y:-26.4}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:56.23,x:24.1,y:39.75,regX:-39.4}},{t:this.instance_12,p:{rotation:16.1092,x:68.05,y:106,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5.1,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:13.2187,x:76.8,y:112.25}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.0659,x:17.5,y:92.15}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:-2.3346,x:40.1,y:185.6}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.7592,x:-5.55,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.645,x:-25.3,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:1.27,x:-5.4,y:-79.35}},{t:this.instance_3,p:{regX:35.3,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-84.2151,x:-57.35,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1422,x:-64.65,y:50.7,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.1681,x:-39.7,y:131.8,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.7754,x:-38.05,y:139.65,regY:-1.6}}]},1).to({state:[{t:this.instance_15,p:{regY:-46,rotation:0.5718,x:-20.2,y:92.45,regX:2.1}},{t:this.instance_14,p:{regX:-31.4,regY:-1.2,scaleX:0.9984,scaleY:0.9983,rotation:111.7284,x:47.85,y:-26.35}},{t:this.instance_13,p:{regY:-1.1,scaleX:0.9984,scaleY:0.9984,rotation:53.8596,x:21.95,y:38.85,regX:-39.4}},{t:this.instance_12,p:{rotation:13.7502,x:68.65,y:103.3,scaleX:0.9985,scaleY:0.9985,regY:8.4}},{t:this.instance_11,p:{regX:-5,regY:3.3,scaleX:0.9983,scaleY:0.9983,rotation:10.8842,x:77.7,y:109.15}},{t:this.instance_10,p:{regY:1.5,scaleX:0.9979,scaleY:0.9979,rotation:-16.0414,x:17.5,y:92.15}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-2.2907,x:40.15,y:185.65}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-1.7164,x:-5.6,y:-57.8}},{t:this.instance_6,p:{regX:2,scaleX:0.9982,scaleY:0.9982,rotation:28.6469,x:-25.3,y:188.45}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.7,scaleX:0.9989,scaleY:0.9989,rotation:1.7174,x:-5.45,y:-79.35}},{t:this.instance_3,p:{regX:35.3,regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-84.2265,x:-57.4,y:-22.95}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.1414,x:-64.65,y:50.7,regX:44.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.1424,x:-39.65,y:131.75,regX:5.4}},{t:this.instance,p:{scaleX:0.9982,scaleY:0.9982,rotation:-72.7671,x:-38.1,y:139.65,regY:-1.6}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99.3,-206.5,279.8,507.6);


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

	// Armature_1
	this.instance = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance.setTransform(-57.15,-22.7,0.9988,0.9988,-80.1526,0,0,35.6,0.6);

	this.instance_1 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1.setTransform(-50.55,141.65,0.9986,0.9987,-97.5949,0,0,6.8,-1.6);

	this.instance_2 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2.setTransform(-52.05,133.35,0.9989,0.9989,-110.6279,0,0,5.6,-8.7);

	this.instance_3 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_3.setTransform(-69.95,50.5,0.9988,0.9988,-102.1376,0,0,44.4,0.3);

	this.instance_4 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_4.setTransform(-5.35,-78.95,0.9993,0.9993,1.7378,0,0,0.5,53.2);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_6.setTransform(-15.4,187.1,0.9985,0.9985,7.9494,0,0,3.2,-54.6);

	this.instance_7 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_7.setTransform(-4.8,-58.05,0.9993,0.9993,-1.687,0,0,-0.4,8.9);

	this.instance_8 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_8.setTransform(-5.55,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_9.setTransform(30.1,184.4,0.9981,0.9981,-7.7528,0,0,3,-54.2);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(22.8,89.6,0.9981,0.9981,-7.1961,0,0,-0.3,1.9);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(81.15,133.65,0.9989,0.9989,81.2846,0,0,-5.2,2.8);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(81.4,122.3,0.9989,0.9989,73.8923,0,0,-6.7,7.8);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(52.9,48.1,0.9989,0.9989,69.7435,0,0,-40.1,-0.1);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(47.7,-25.95,0.9989,0.9989,86.8001,0,0,-31.5,-1.2);

	this.instance_15 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_15.setTransform(-23.5,91,0.9985,0.9985,-6.6764,0,0,2.2,-45.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:2.2,rotation:-6.6764,x:-23.5,y:91,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9989,scaleY:0.9989,rotation:86.8001,x:47.7,y:-25.95}},{t:this.instance_13,p:{regY:-0.1,scaleX:0.9989,scaleY:0.9989,rotation:69.7435,x:52.9,y:48.1,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9989,scaleY:0.9989,rotation:73.8923,x:81.4,y:122.3,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9989,scaleY:0.9989,rotation:81.2846,x:81.15,y:133.65,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.1961,x:22.8,y:89.6}},{t:this.instance_9,p:{regX:3,rotation:-7.7528,x:30.1,y:184.4,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.4,scaleX:0.9993,scaleY:0.9993,rotation:-1.687,x:-4.8,y:-58.05}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9985,scaleY:0.9985,rotation:7.9494,x:-15.4,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9993,scaleY:0.9993,rotation:1.7378,y:-78.95,x:-5.35,regY:53.2}},{t:this.instance_3,p:{regY:0.3,scaleX:0.9988,scaleY:0.9988,rotation:-102.1376,x:-69.95,y:50.5,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9989,scaleY:0.9989,rotation:-110.6279,x:-52.05,y:133.35,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9987,rotation:-97.5949,x:-50.55,y:141.65,regY:-1.6}},{t:this.instance,p:{scaleX:0.9988,scaleY:0.9988,rotation:-80.1526,x:-57.15,y:-22.7,regY:0.6}}]}).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.6,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.6,scaleX:0.9988,scaleY:0.9988,rotation:86.1554,x:47.6,y:-26.2}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:48.4609,x:53.75,y:47.95,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:52.6101,x:107.2,y:106.8,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:60.0028,x:111.05,y:117.5,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1957,x:22.75,y:89.55}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7524,x:30.15,y:184.35,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-1.8315,x:-4.85,y:-58}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9492,x:-15.4,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:1.4123,y:-78.9,x:-5.35,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.1374,x:-70,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6292,x:-52,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5945,x:-50.5,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1527,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.6,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:85.5076,x:47.6,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:27.1777,x:54.55,y:47.85,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:31.3267,x:125.7,y:83.25,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:38.7191,x:133.15,y:91.85,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1957,x:22.75,y:89.55}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7524,x:30.15,y:184.35,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-1.9778,x:-4.8,y:-58}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9483,x:-15.35,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:1.0876,y:-78.85,x:-5.4,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.1374,x:-70,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6292,x:-52,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5945,x:-50.5,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1527,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.6,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:84.8603,x:47.6,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:5.8935,x:55.35,y:47.8,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:10.0423,x:134.45,y:54.9,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:17.4353,x:144.55,y:60.2,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1957,x:22.75,y:89.55}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7524,x:30.15,y:184.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9993,scaleY:0.9993,rotation:-2.1231,x:-4.85,y:-58}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9483,x:-15.3,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:0.7612,y:-78.9,x:-5.45,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.1366,x:-70,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6292,x:-52,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5945,x:-50.5,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1536,x:-57.1,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.6,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9988,scaleY:0.9988,rotation:84.2122,x:47.55,y:-25.95}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-15.3856,x:56.1,y:47.65,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-11.2366,x:132.4,y:25.65,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-3.843,x:143.7,y:26.95,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1957,x:22.75,y:89.55}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9993,scaleY:0.9993,rotation:-2.2684,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9483,x:-15.3,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9993,scaleY:0.9993,rotation:0.4375,y:-78.85,x:-5.5,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.1366,x:-69.95,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6281,x:-51.95,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5945,x:-50.5,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1536,x:-57.1,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.6,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:83.566,x:47.55,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-36.668,x:56.95,y:47.5,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-32.5181,x:120.15,y:-0.6,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-25.1263,x:131.05,y:-3.4,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1957,x:22.75,y:89.55}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.4129,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9476,x:-15.25,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:0.112,y:-78.85,x:-5.55,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1364,x:-69.95,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6281,x:-51.95,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5945,x:-50.5,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1544,x:-57.1,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.6741,x:-23.6,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:82.9191,x:47.55,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-57.9523,x:57.75,y:47.4,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-53.802,x:99.2,y:-20.35,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-46.4102,x:108.3,y:-26.95,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1957,x:22.7,y:89.55}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9993,scaleY:0.9993,rotation:-2.5591,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9476,x:-15.25,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.2082,y:-78.8,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1355,x:-70,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6281,x:-51.95,y:133.25,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.5,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1544,x:-57.05,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.55,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:66.0618,x:47.6,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-58.8648,x:78.65,y:41.25,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-54.714,x:118.9,y:-27,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-47.3224,x:127.9,y:-33.85,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1957,x:22.7,y:89.55}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5995,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9476,x:-15.2,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.721,y:-78.8,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1355,x:-70,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6281,x:-51.9,y:133.25,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.5,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1544,x:-57.05,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.55,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:49.204,x:47.55,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-59.777,x:96.85,y:29.4,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-55.627,x:136.05,y:-39.6,regX:-6.7,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-48.234,x:144.95,y:-46.6,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1957,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.6398,x:-4.9,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9476,x:-15.2,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9993,scaleY:0.9993,rotation:-1.2329,y:-78.8,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1355,x:-70,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6281,x:-51.9,y:133.25,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.5,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1544,x:-57.05,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.55,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:32.3457,x:47.55,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-60.6897,x:110.8,y:12.7,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-56.5396,x:148.85,y:-56.9,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-49.147,x:157.65,y:-64,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1957,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.6809,x:-4.9,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9476,x:-15.2,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7467,y:-78.65,x:-5.65,regY:53.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1355,x:-70,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6281,x:-51.9,y:133.25,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.5,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1544,x:-57.05,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.55,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:15.4883,x:47.55,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-61.6034,x:119.25,y:-7.3,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-57.4527,x:156.25,y:-77.45,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-50.0593,x:164.95,y:-84.75,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1949,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9993,scaleY:0.9993,rotation:-2.7212,x:-4.9,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9476,x:-15.2,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-2.258,y:-78.75,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1355,x:-70,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6281,x:-51.9,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.5,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1544,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.55,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9989,scaleY:0.9989,rotation:-1.3647,x:47.55,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-62.5153,x:121.6,y:-28.9,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-58.3657,x:157.5,y:-99.7,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9988,rotation:-50.9733,x:166.05,y:-107.05,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1949,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.7616,x:-4.85,y:-57.9}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9476,x:-15.2,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-2.7694,y:-78.8,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1355,x:-70,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6281,x:-51.9,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1544,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.55,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-18.2215,x:47.55,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-63.4271,x:117.6,y:-50.35,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-59.2787,x:152.35,y:-121.6,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-51.8847,x:160.7,y:-129.1,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1949,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.8027,x:-4.85,y:-57.9}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9467,x:-15.2,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-3.2819,y:-78.8,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1355,x:-70,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6281,x:-51.9,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1553,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.55,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-35.0789,x:47.5,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-64.3393,x:107.5,y:-69.6,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-60.19,x:141.15,y:-141.65,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-52.7971,x:149.4,y:-149.1,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1949,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.25,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.8421,x:-4.8,y:-57.9}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9467,x:-15.2,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-3.7939,y:-78.75,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1355,x:-70,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6281,x:-51.9,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1553,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.5,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9987,scaleY:0.9987,rotation:-51.9364,x:47.5,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-65.2524,x:92.35,y:-85.15,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-61.104,x:124.7,y:-157.6,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-53.7091,x:133,y:-165.25,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1949,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.8825,x:-4.85,y:-57.85}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9467,x:-15.2,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-4.3071,y:-78.75,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1347,x:-70,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.85,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1553,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.5,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-51.9107,x:47.5,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-65.739,x:92.3,y:-85.1,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-61.5893,x:124.15,y:-157.75,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-54.1972,x:132.2,y:-165.6,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1949,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.8552,x:-4.85,y:-57.9}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9467,x:-15.15,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-4.1887,y:-78.75,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1347,x:-69.95,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.85,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1553,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.5,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-51.8846,x:47.5,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-66.226,x:92.35,y:-85.05,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-62.0761,x:123.55,y:-158.1,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-54.6841,x:131.6,y:-165.9,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1949,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.8299,x:-4.8,y:-57.9}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9467,x:-15.15,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-4.0711,y:-78.75,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1347,x:-69.95,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.85,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1553,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.5,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-51.8583,x:47.5,y:-26}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-66.7133,x:92.35,y:-85.05,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-62.5628,x:122.95,y:-158.25,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-55.1705,x:131,y:-166.25,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1949,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.8027,x:-4.85,y:-57.9}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9467,x:-15.15,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-3.9535,y:-78.7,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1347,x:-69.95,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.85,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1553,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.5,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-51.8315,x:47.45,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-67.1989,x:92.4,y:-85.05,regX:-40}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-63.0486,x:122.35,y:-158.45,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-55.6568,x:130.25,y:-166.45,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1949,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.7764,x:-4.85,y:-57.9}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9467,x:-15.15,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-3.8351,y:-78.7,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1347,x:-69.95,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.85,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1553,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.5,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-51.8065,x:47.45,y:-26}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-67.6851,x:92.45,y:-85,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-63.5359,x:121.7,y:-158.75,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-56.1446,x:129.6,y:-166.85,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1949,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.7492,x:-4.8,y:-57.9}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9467,x:-15.15,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-3.7176,y:-78.7,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1347,x:-69.95,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.85,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1553,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.5,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-51.779,x:47.5,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-68.1727,x:92.45,y:-84.9,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-64.0221,x:121.2,y:-159.05,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-56.6309,x:128.9,y:-167.05,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1949,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.723,x:-4.9,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9467,x:-15.15,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-3.5993,y:-78.7,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1347,x:-69.95,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.85,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1553,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.5,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-51.7529,x:47.4,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-68.6593,x:92.5,y:-84.9,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-64.5092,x:120.55,y:-159.2,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-57.1167,x:128.25,y:-167.4,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1949,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.6958,x:-4.9,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9467,x:-15.15,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-3.4826,y:-78.75,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1347,x:-69.95,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.85,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1553,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.5,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-51.7267,x:47.4,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-69.1461,x:92.5,y:-84.85,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-64.9955,x:119.9,y:-159.35,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-57.6029,x:127.45,y:-167.7,regY:2.7}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.194,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.6687,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9467,x:-15.15,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-3.3653,y:-78.75,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1347,x:-69.95,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.85,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1553,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.5,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-51.6999,x:47.45,y:-26}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-69.6326,x:92.45,y:-84.85,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-65.4827,x:119.4,y:-159.6,regX:-6.7,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-58.0903,x:126.9,y:-167.9,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.194,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.6424,x:-4.9,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9467,x:-15.15,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-3.247,y:-78.75,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1347,x:-69.95,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.85,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1553,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.5,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-51.6737,x:47.4,y:-26}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-70.1194,x:92.55,y:-84.85,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-65.9689,x:118.7,y:-159.95,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-58.5776,x:126.25,y:-168.15,regY:2.8}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.194,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.6152,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9467,x:-15.15,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-3.1286,y:-78.6,x:-5.6,regY:53.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1347,x:-69.95,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.85,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1562,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.5,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9988,scaleY:0.9988,rotation:-51.6475,x:47.45,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-70.6061,x:92.55,y:-84.8,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-66.4549,x:118.1,y:-160,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-59.0634,x:125.55,y:-168.4,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5889,x:-4.9,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9458,x:-15.15,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-3.0112,y:-78.6,x:-5.6,regY:53.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1347,x:-69.95,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.85,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1562,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.5,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-51.6221,x:47.4,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-71.0928,x:92.55,y:-84.8,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-66.9415,x:117.4,y:-160.25,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-59.5501,x:124.75,y:-168.7,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.7,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9993,scaleY:0.9993,rotation:-2.5618,x:-4.9,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9458,x:-15.15,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-2.8929,y:-78.6,x:-5.6,regY:53.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.1347,x:-69.95,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.85,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.45,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1562,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-51.5953,x:47.4,y:-26}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-71.5803,x:92.65,y:-84.8,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-67.4279,x:116.85,y:-160.35,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-60.0373,x:124.15,y:-169,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.7,y:89.45}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5347,x:-4.8,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9458,x:-15.15,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-2.7756,y:-78.55,x:-5.55,regY:53.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.134,x:-69.9,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.8,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.4,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1562,x:-57.1,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-39.7948,x:47.5,y:-26}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-66.2394,x:103.7,y:-74.45,regX:-40}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-62.089,x:134.9,y:-147.35,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-54.6972,x:142.95,y:-155.15,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.7,y:89.45}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5373,x:-4.8,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9458,x:-15.1,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-2.5408,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.134,x:-69.9,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.8,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.4,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1562,x:-57.1,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-27.996,x:47.45,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-60.8998,x:112.4,y:-61.85,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-56.7498,x:150.2,y:-131.65,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-49.3575,x:158.85,y:-138.7,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.7,y:89.45}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.539,x:-4.8,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9458,x:-15.1,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-2.3079,y:-78.65,x:-5.55,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.134,x:-69.9,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.8,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.4,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1562,x:-57.1,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-16.1975,x:47.45,y:-26}},{t:this.instance_13,p:{regY:-0.1,scaleX:0.9988,scaleY:0.9988,rotation:-55.5597,x:118.4,y:-47.7,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-51.409,x:162.5,y:-113.75,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-44.0176,x:171.8,y:-119.95,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.7,y:89.45}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5408,x:-4.8,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9458,x:-15.1,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-2.0732,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.134,x:-69.9,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.8,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.4,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1562,x:-57.1,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:-4.3984,x:47.45,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-50.2201,x:121.25,y:-32.85,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-46.0702,x:171.35,y:-94.4,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-38.6785,x:181.25,y:-99.7,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.7,y:89.45}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5425,x:-4.8,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9458,x:-15.1,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9993,scaleY:0.9993,rotation:-1.8403,y:-78.5,x:-5.6,regY:53.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.134,x:-69.9,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.8,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.4,y:141.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1562,x:-57.1,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:7.3951,x:47.4,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-44.8812,x:121.05,y:-17.6,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-40.7297,x:176.7,y:-74.2,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:-33.338,x:187.05,y:-78.6,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.7,y:89.45}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5443,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9458,x:-15.1,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.6049,y:-78.5,x:-5.55,regY:53.3}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.134,x:-69.9,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.8,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.4,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1562,x:-57.1,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:19.1959,x:47.45,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-39.5412,x:117.75,y:-2.7,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-35.3909,x:178.4,y:-53.9,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-27.9988,x:189.15,y:-57.3,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.7,y:89.45}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5469,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9458,x:-15.1,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.3703,y:-78.6,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.134,x:-69.9,y:50.45,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.8,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.4,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1562,x:-57.1,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:30.9941,x:47.4,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-34.2016,x:111.6,y:11.25,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-30.05,x:176.7,y:-34.05,regX:-6.7,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-22.6599,x:187.65,y:-36.5,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.7,y:89.45}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.15,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5487,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9458,x:-15.1,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.1375,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.134,x:-69.9,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.8,y:133.3,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.4,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1562,x:-57.1,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:42.7935,x:47.4,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-28.8631,x:102.55,y:23.45,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-24.7119,x:171.6,y:-15.5,regX:-6.7,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-17.3196,x:182.8,y:-16.9,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.7,y:89.45}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5505,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9458,x:-15.1,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.903,y:-78.65,x:-5.55,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.134,x:-69.9,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.8,y:133.25,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.4,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.1563,x:-57.05,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:54.5928,x:47.4,y:-26.2}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-23.5224,x:91.25,y:33.65,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-19.3708,x:163.75,y:1.25,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-11.9795,x:174.9,y:1.05,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.65,y:89.45}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5522,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9458,x:-15.1,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.6685,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.134,x:-69.9,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.8,y:133.25,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.4,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.157,x:-57.05,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.6,scaleX:0.9988,scaleY:0.9988,rotation:66.3929,x:47.35,y:-26.25}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-18.1842,x:78.05,y:41.35,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-14.0328,x:153.15,y:15.7,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-6.6411,x:164.4,y:16.55,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.65,y:89.45}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5548,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9458,x:-15.1,y:187.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.434,y:-78.65,x:-5.65,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.134,x:-69.9,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.8,y:133.25,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.4,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.157,x:-57.05,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:78.1909,x:47.35,y:-26.15}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-12.8454,x:63.6,y:46.2,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-8.6929,x:140.85,y:27.75,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.3009,x:151.85,y:29.5,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.65,y:89.45}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5566,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.945,x:-15.05,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.2004,y:-78.65,x:-5.55,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-102.134,x:-69.9,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.6272,x:-51.8,y:133.25,regX:5.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-97.5936,x:-50.4,y:141.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.157,x:-57.05,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:78.5938,x:47.35,y:-26.15}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:-5.5979,x:63.25,y:46.3,regX:-40}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.4462,x:141.9,y:37.65,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:5.9411,x:152.75,y:40.85,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.65,y:89.4}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5566,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.945,x:-15.05,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.1995,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-102.9615,x:-71.45,y:50.2,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-111.4552,x:-52.25,y:132.85,regX:5.5,regY:-8.8}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-98.4212,x:-50.75,y:141.15,regY:-1.7}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-78.8573,x:-57.2,y:-22.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.6,scaleX:0.9988,scaleY:0.9988,rotation:78.998,x:47.35,y:-26.35}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:1.6441,x:62.65,y:46.4,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:5.7957,x:141.95,y:47.75,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:13.1874,x:152.3,y:52.2,regY:2.7}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.65,y:89.4}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5566,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.945,x:-15.05,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.1995,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-103.791,x:-73.1,y:49.95,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-112.2847,x:-52.65,y:132.2,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-99.2494,x:-51.1,y:140.45,regY:-1.7}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-77.5559,x:-57.2,y:-22.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:79.4008,x:47.4,y:-26.2}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:8.8914,x:62.25,y:46.55,regX:-40}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:13.0424,x:140.8,y:57.95,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:20.435,x:150.3,y:63.65,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.65,y:89.4}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5566,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.945,x:-15.05,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.1995,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-104.6201,x:-74.75,y:49.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-113.1134,x:-53.05,y:131.5,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-100.0791,x:-51.3,y:139.75,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-76.2555,x:-57.15,y:-22.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9988,scaleY:0.9988,rotation:79.803,x:47.4,y:-26.05}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:16.1368,x:61.65,y:46.6,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:20.2888,x:138,y:67.85,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:27.6816,x:146.9,y:74.75,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.65,y:89.4}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5557,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.945,x:-15.05,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.1986,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-105.4478,x:-76.35,y:49.05,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-113.9425,x:-53.5,y:130.8,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-100.9073,x:-51.65,y:139,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-74.955,x:-57,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:80.2066,x:47.35,y:-26.15}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:23.384,x:61.15,y:46.65,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:27.5363,x:134.25,y:77.35,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:34.9283,x:142.15,y:85.45,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.65,y:89.4}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5557,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.945,x:-15.05,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.1986,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-106.2767,x:-78,y:48.65,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-114.7715,x:-53.95,y:129.95,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-101.737,x:-51.95,y:138.15,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-73.6538,x:-57.15,y:-22.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:80.6106,x:47.35,y:-26.15}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:30.6323,x:60.65,y:46.8,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:34.7828,x:129.3,y:86.45,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:42.1751,x:136.15,y:95.35,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.65,y:89.4}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5557,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.945,x:-15.05,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.1986,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-107.1053,x:-79.6,y:48.1,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-115.6008,x:-54.35,y:129.15,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-102.5671,x:-52.3,y:137.2,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-72.3532,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.6,scaleX:0.9988,scaleY:0.9988,rotation:81.013,x:47.3,y:-26.25}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:37.878,x:60.1,y:46.85,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:42.029,x:123.25,y:94.85,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9987,scaleY:0.9987,rotation:49.4214,x:128.85,y:104.6,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.65,y:89.4}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5557,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.945,x:-15.05,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.1986,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-107.9356,x:-81.2,y:47.55,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-116.4308,x:-54.8,y:128.25,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-103.3962,x:-52.55,y:136.3,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-71.0529,x:-57.2,y:-22.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:81.416,x:47.35,y:-26.2}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:45.1256,x:59.6,y:46.9,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:49.2759,x:116.25,y:102.55,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:56.6688,x:120.5,y:112.9,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.65,y:89.4}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5557,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.945,x:-15.05,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.1977,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-108.7635,x:-82.8,y:47,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9987,scaleY:0.9987,rotation:-117.2587,x:-55.15,y:127.3,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-104.225,x:-52.85,y:135.25,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-69.751,x:-57.2,y:-22.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:81.8194,x:47.25,y:-26.15}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:52.3712,x:59.1,y:47.05,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:56.5231,x:108.15,y:109.3,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:63.9145,x:111.2,y:120.2,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.65,y:89.4}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.15,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5557,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.945,x:-15.05,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.1977,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.3,scaleX:0.9987,scaleY:0.9987,rotation:-109.5932,x:-84.2,y:46.35,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-118.088,x:-55.6,y:126.3,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-105.0536,x:-53.15,y:134.3,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-68.4512,x:-57.2,y:-22.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.675,x:-23.45,y:90.9,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9988,scaleY:0.9988,rotation:82.2225,x:47.3,y:-26}},{t:this.instance_13,p:{regY:-0.1,scaleX:0.9988,scaleY:0.9988,rotation:59.6184,x:58.5,y:47.1,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:63.77,x:99.3,y:115.1,regX:-6.7,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:71.1617,x:101.05,y:126.25,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.193,x:22.65,y:89.4}},{t:this.instance_9,p:{regX:3.1,rotation:-7.7515,x:30.1,y:184.1,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.5557,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9441,x:-15.05,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:-0.1977,y:-78.65,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-110.4223,x:-85.85,y:45.75,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-118.9169,x:-56,y:125.2,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-105.8829,x:-53.45,y:133.2,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-67.1504,x:-57.15,y:-22.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.7033,x:-23.35,y:91,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:82.8361,x:47.4,y:-26.15}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:61.0056,x:57.8,y:47.2,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:65.1369,x:97.15,y:116.3,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:72.5375,x:98.6,y:127.35,regY:2.7}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.2293,x:22.7,y:89.45}},{t:this.instance_9,p:{regX:3,rotation:-7.7903,x:30.1,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.4357,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9545,x:-15,y:187.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:0.0717,y:-78.7,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-109.2164,x:-83.75,y:46.65,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-117.7254,x:-55.6,y:126.8,regX:5.5,regY:-8.8}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-104.6707,x:-53.05,y:134.75,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-69.0161,x:-57.15,y:-22.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.2,rotation:-6.7308,x:-23.25,y:90.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:83.4488,x:47.35,y:-26.15}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:62.3944,x:57.1,y:47.4,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:66.5038,x:94.7,y:117.3,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.9127,x:95.8,y:128.5,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.2646,x:22.75,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.8265,x:30.3,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.3158,x:-4.85,y:-57.95}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9661,x:-15,y:187.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:0.3465,y:-78.8,x:-5.6,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-108.0111,x:-81.45,y:47.5,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-116.5349,x:-54.95,y:128.2,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-103.4604,x:-52.7,y:136.2,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-70.8835,x:-57.2,y:-22.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.7598,x:-23.4,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:84.0626,x:47.45,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:63.7806,x:56.3,y:47.55,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:67.8711,x:92.3,y:118.35,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:75.288,x:93.1,y:129.65,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.3024,x:22.75,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.8664,x:30.35,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9993,scaleY:0.9993,rotation:-2.1966,x:-4.8,y:-58}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9759,x:-15.05,y:187.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:0.6212,y:-78.8,x:-5.55,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-106.806,x:-79.2,y:48.3,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-115.3432,x:-54.4,y:129.45,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-102.2478,x:-52.3,y:137.55,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-72.7505,x:-57.1,y:-22.7,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.2,rotation:-6.7887,x:-23.25,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:84.6774,x:47.5,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:65.167,x:55.6,y:47.7,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:69.2384,x:89.85,y:119.4,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:76.6631,x:90.45,y:130.7,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.3386,x:22.75,y:89.5}},{t:this.instance_9,p:{regX:3.1,rotation:-7.9035,x:30.4,y:184.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-2.0767,x:-4.9,y:-58}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9874,x:-15.05,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:0.8951,y:-78.8,x:-5.5,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-105.6003,x:-76.95,y:49.05,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-114.1525,x:-53.85,y:130.65,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-101.0357,x:-51.85,y:138.8,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-74.6167,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.8169,x:-23.45,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.5,scaleX:0.9988,scaleY:0.9988,rotation:85.2916,x:47.45,y:-26.1}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:66.5557,x:54.85,y:47.8,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:70.6059,x:87.35,y:120.4,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:78.0382,x:87.65,y:131.65,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.3739,x:22.75,y:89.5}},{t:this.instance_9,p:{regX:3,rotation:-7.9434,x:30.35,y:184.3,scaleX:0.998,scaleY:0.998}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-1.9568,x:-4.85,y:-58}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:7.9978,x:-15.1,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:1.1699,y:-78.85,x:-5.45,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-104.395,x:-74.6,y:49.55,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-112.9616,x:-53.3,y:131.75,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.9,scaleY:0.9986,rotation:-99.825,x:-51.45,y:139.75,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-76.4835,x:-57.2,y:-22.75,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{regX:2.2,rotation:-6.8452,x:-23.3,y:91,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.6,scaleX:0.9988,scaleY:0.9988,rotation:85.9053,x:47.5,y:-26.25}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:67.9423,x:54.1,y:47.95,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:71.9736,x:84.85,y:121.2,regX:-6.7,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:79.4147,x:84.95,y:132.6,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.4111,x:22.75,y:89.55}},{t:this.instance_9,p:{regX:3.1,rotation:-7.9807,x:30.5,y:184.25,scaleX:0.998,scaleY:0.998}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9992,scaleY:0.9992,rotation:-1.8368,x:-4.85,y:-58}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:8.0086,x:-15.05,y:187.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9993,scaleY:0.9993,rotation:1.4438,y:-78.9,x:-5.4,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9987,scaleY:0.9987,rotation:-103.1897,x:-72.3,y:50,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-111.7707,x:-52.7,y:132.65,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-98.6132,x:-51,y:140.95,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-78.3491,x:-57.1,y:-22.75,regY:0.6}}]},1).to({state:[{t:this.instance_15,p:{regX:2.1,rotation:-6.8736,x:-23.45,y:90.95,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_14,p:{regX:-31.4,scaleX:0.9988,scaleY:0.9988,rotation:86.5194,x:47.65,y:-25.95}},{t:this.instance_13,p:{regY:-0.2,scaleX:0.9988,scaleY:0.9988,rotation:69.329,x:53.3,y:48.1,regX:-40.1}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:73.3402,x:82.35,y:122.2,regX:-6.6,regY:7.8}},{t:this.instance_11,p:{scaleX:0.9988,scaleY:0.9988,rotation:80.7894,x:82.15,y:133.45,regY:2.8}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.4464,x:22.75,y:89.55}},{t:this.instance_9,p:{regX:3.1,rotation:-8.0196,x:30.6,y:184.25,scaleX:0.998,scaleY:0.998}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.5,scaleX:0.9993,scaleY:0.9993,rotation:-1.716,x:-4.85,y:-58}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9984,scaleY:0.9984,rotation:8.0201,x:-15.05,y:187.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9992,scaleY:0.9992,rotation:1.7169,y:-78.9,x:-5.35,regY:53.2}},{t:this.instance_3,p:{regY:0.2,scaleX:0.9988,scaleY:0.9988,rotation:-101.9851,x:-70,y:50.4,regX:44.4}},{t:this.instance_2,p:{scaleX:0.9988,scaleY:0.9988,rotation:-110.5804,x:-52.15,y:133.55,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.8,scaleY:0.9986,rotation:-97.4012,x:-50.6,y:141.75,regY:-1.6}},{t:this.instance,p:{scaleX:0.9987,scaleY:0.9987,rotation:-80.2157,x:-57.3,y:-22.7,regY:0.5}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-95.7,-216,306.8,519.4);


// stage content:
(lib.LessonChapter3_01 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,351];
	this.streamSoundSymbolsList[0] = [{id:"AfterWar201wav",startFrame:0,endFrame:352,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("AfterWar201wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,352,1);
	}
	this.frame_351 = function() {
		this.stop();
		
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter3_02.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter3_00.html");
			}, 500);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(351).call(this.frame_351).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_296();
	this.instance.setTransform(182.8,581,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_295();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(352));

	// Buttons
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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn}]}).wait(352));

	// Layer_1
	this.instance_2 = new lib.CharacterGood_02();
	this.instance_2.setTransform(370.8,345.2,0.387,0.387,0,0,180,-39.9,46.2);

	this.instance_3 = new lib.CharacterGood_03();
	this.instance_3.setTransform(70.95,482.95,0.387,0.387,0,0,180,0,0.1);

	this.instance_4 = new lib.CharacterGood_04();
	this.instance_4.setTransform(188.85,429.9,0.387,0.387,0,0,180,37.9,49.5);

	this.instance_5 = new lib.CharacterGood_03();
	this.instance_5.setTransform(277.2,330.2,0.387,0.387,0,0,180,-0.1,0);

	this.instance_6 = new lib.CharacterGood_01();
	this.instance_6.setTransform(-14.25,463.65,0.387,0.387,0,0,180,12.4,42.1);

	this.instance_7 = new lib.CharacterGood_04();
	this.instance_7.setTransform(99.75,412.2,0.387,0.387,0,0,180,38,49.5);

	this.instance_8 = new lib.CharacterGood_04();
	this.instance_8.setTransform(39.05,396.2,0.387,0.387,0,0,180,37.9,49.5);

	this.instance_9 = new lib.CharacterGood_02();
	this.instance_9.setTransform(184.75,340.6,0.387,0.387,0,0,180,-39.9,46.2);

	this.instance_10 = new lib.CharacterGood_02();
	this.instance_10.setTransform(23.25,340.65,0.387,0.387,0,0,180,-39.9,46.4);

	this.instance_11 = new lib.CharacterGood_02();
	this.instance_11.setTransform(121.6,309.4,0.387,0.387,0,0,180,-39.9,46.4);

	this.instance_12 = new lib.CharacterGood_04();
	this.instance_12.setTransform(310.4,299.15,0.387,0.387,0,0,180,37.9,49.5);

	this.instance_13 = new lib.CharacterGood_03();
	this.instance_13.setTransform(215.85,267.05,0.387,0.387,0,0,180,0,0.1);

	this.instance_14 = new lib.CharacterGood_04();
	this.instance_14.setTransform(1091.7,429.9,0.387,0.387,0,0,180,38,49.5);

	this.instance_15 = new lib.CharacterGood_04();
	this.instance_15.setTransform(1252.45,462.45,0.387,0.387,0,0,180,37.9,49.4);

	this.instance_16 = new lib.CharacterGood_01();
	this.instance_16.setTransform(934.05,390.8,0.387,0.387,0,0,180,12.2,42.1);

	this.instance_17 = new lib.CharacterGood_04();
	this.instance_17.setTransform(804.5,382.5,0.387,0.387,0,0,180,38,49.5);

	this.instance_18 = new lib.CharacterGood_04();
	this.instance_18.setTransform(875.95,323.95,0.387,0.387,0,0,180,37.9,49.5);

	this.instance_19 = new lib.CharacterGood_02();
	this.instance_19.setTransform(1213.95,419.15,0.387,0.387,0,0,180,-39.9,46.4);

	this.instance_20 = new lib.CharacterGood_03();
	this.instance_20.setTransform(1286.55,332.2,0.387,0.387,0,0,180);

	this.instance_21 = new lib.CharacterGood_02();
	this.instance_21.setTransform(1167.65,350.7,0.387,0.387,0,0,180,-39.9,46.2);

	this.instance_22 = new lib.CharacterGood_02();
	this.instance_22.setTransform(177.95,252.1,0.387,0.387,0,0,180,-39.9,46.2);

	this.instance_23 = new lib.CharacterGood_03();
	this.instance_23.setTransform(49.5,258.15,0.387,0.387,0,0,180,0,0.1);

	this.instance_24 = new lib.CharacterGood_02();
	this.instance_24.setTransform(290.5,234.85,0.387,0.387,0,0,180,-40.1,46.4);

	this.instance_25 = new lib.CharacterGood_01();
	this.instance_25.setTransform(659.45,374.4,0.387,0.387,0,0,180,12.2,42.1);

	this.instance_26 = new lib.CharacterGood_02();
	this.instance_26.setTransform(453.3,367.35,0.387,0.387,0,0,180,-39.9,46.2);

	this.instance_27 = new lib.CharacterGood_02();
	this.instance_27.setTransform(577.15,339.45,0.387,0.387,0,0,180,-39.9,46.4);

	this.instance_28 = new lib.CharacterGood_03();
	this.instance_28.setTransform(486.85,280.05,0.387,0.387,0,0,180,0,0.1);

	this.instance_29 = new lib.CharacterGood_04();
	this.instance_29.setTransform(581.25,259.75,0.387,0.387,0,0,180,37.9,49.5);

	this.instance_30 = new lib.CharacterGood_04();
	this.instance_30.setTransform(731.5,292.3,0.387,0.387,0,0,180,37.9,49.4);

	this.instance_31 = new lib.CharacterGood_04();
	this.instance_31.setTransform(377,282.2,0.387,0.387,0,0,180,38,49.5);

	this.instance_32 = new lib.CharacterGood_01();
	this.instance_32.setTransform(529.8,201.95,0.387,0.387,0,0,180,12.2,42.1);

	this.instance_33 = new lib.CharacterGood_04();
	this.instance_33.setTransform(425.25,215.85,0.387,0.387,0,0,180,38,49.5);

	this.instance_34 = new lib.CharacterGood_02();
	this.instance_34.setTransform(701.8,281.6,0.387,0.387,0,0,180,-39.9,46.4);

	this.instance_35 = new lib.CharacterGood_03();
	this.instance_35.setTransform(728.1,215.35,0.387,0.387,0,0,180);

	this.instance_36 = new lib.CharacterGood_02();
	this.instance_36.setTransform(655.5,206.15,0.387,0.387,0,0,180,-39.9,46.2);

	this.instance_37 = new lib.CharacterGood_02();
	this.instance_37.setTransform(1213.95,315,0.387,0.387,0,0,180,-39.9,46.4);

	this.instance_38 = new lib.CharacterGood_03();
	this.instance_38.setTransform(827.45,254.9,0.387,0.387,0,0,180,0,0.1);

	this.instance_39 = new lib.CharacterGood_04();
	this.instance_39.setTransform(954.6,260.3,0.387,0.387,0,0,180,37.9,49.5);

	this.instance_40 = new lib.CharacterGood_03();
	this.instance_40.setTransform(1064.2,295.8,0.387,0.387,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]}).wait(352));

	// Background
	this.instance_41 = new lib.Chap3Scene1();

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(352));

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
		{src:"images/LessonChapter3_01_atlas_1.png?1655397470941", id:"LessonChapter3_01_atlas_1"},
		{src:"sounds/AfterWar201wav.mp3?1655397471218", id:"AfterWar201wav"},
		{src:"sounds/popsound.mp3?1655397471218", id:"popsound"}
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