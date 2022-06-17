(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter2_11_atlas_1", frames: [[1038,1484,330,308],[1370,1484,330,308],[0,1484,357,308],[1702,1484,318,310],[359,1484,357,308],[718,1484,318,330],[0,1350,1779,132],[0,1082,1914,266],[0,0,1920,1080]]},
		{name:"LessonChapter2_11_atlas_2", frames: [[1402,310,163,120],[1567,310,163,120],[195,601,134,50],[1225,457,132,102],[1811,439,134,130],[952,0,285,308],[1732,310,77,245],[1402,432,77,244],[303,0,315,292],[0,562,193,36],[195,563,193,36],[620,0,330,270],[390,563,193,36],[1718,571,193,36],[585,582,193,36],[780,582,193,36],[331,601,122,50],[1813,292,175,145],[1813,0,202,144],[455,601,115,48],[1225,310,175,145],[1813,146,199,144],[1239,0,285,308],[1526,0,285,308],[620,272,285,308],[0,315,77,245],[79,315,77,245],[158,315,77,245],[1481,432,77,244],[1560,432,77,244],[1639,432,77,244],[975,582,193,36],[0,600,193,36],[0,0,301,313],[907,310,316,270],[303,294,298,267],[1947,529,91,87],[1947,439,91,88],[1225,561,110,107]]}
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



(lib.CachedBmp_2415 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2414 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2413 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2412 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2411 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2410 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2409 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2408 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2407 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2406 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2405 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2404 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2403 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2402 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2401 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2400 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2399 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2398 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2397 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2396 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2395 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2394 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2393 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2392 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2391 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2390 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2389 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2388 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2387 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2386 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2385 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2384 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2383 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2382 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2381 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2380 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2379 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2378 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2377 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2376 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2375 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2374 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2373 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2372 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter2_11_atlas_2"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.Chap2Scene11 = function() {
	this.initialize(ss["LessonChapter2_11_atlas_1"]);
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
	this.instance = new lib.CachedBmp_2414();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2415();
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
	this.instance = new lib.CachedBmp_2411();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_2413();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_2412();
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
	this.instance = new lib.CachedBmp_2410();
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
	this.instance = new lib.CachedBmp_2409();
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
	this.instance = new lib.CachedBmp_2408();
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
	this.shape.graphics.f().s("#1D1D1B").ss(5).p("AoqFlQiZjRgRjFQgTjlCrivQCdiiE3hpQBsglB+AIIAeADQBVADByAtQBAAZB4A0QAtAdAeAcQAdAbAJAUIACADQAPAjgCAZQgDAagVASQBRBigBB3QgBBDgoBKQggA6g2A7QgBABgQADACwkfQAHgSghgeQgggdgzgWQg4gYgzgDQg9gDgrAcQhlBEgaBwQgFAVgHA8QgGApgJAQQgGAKgZAlQgbApgTApQgIATgHASQhIC/BBDUIABAFQACAHADAGIgGgSACwkfQAlgLAhgGQBzgiCDgVQA8gJAlgNQAngMATgRAAzgRQAXhdAfhBQAag0Arg3IACgFIAAAAAAzgRQAOAcAdAWQBIA5CqABQBrABB7gUIAFgBIABAAIALgCQgGAOgJAOIgGAIIgHAXQgIAegGAiQgVBvADB0QAECGhSBNQg8A5hYANQgOAChtATQhWAPg7AGQAXgSAUgVIAPgRQB/AaAIgLQAEgGgQgSQgZgbgSgTQhMhRglhOQg6h4APiEQARiNAXhggAmDISQhXgpguhAQgWghgMgjIAHgOQABgDABgBQAUgrAkg/QA8hnA2hHAAdLmQhuAOhMgHQhegIgxgnQgagjgZg0QgUgogQgtAmHIFIAEAN");
	this.shape.setTransform(3.5811,1.449);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BAA087").s().p("AidLtQhegIgxgnQgagjgZg0QgUgogQgtIgEgNIAEANQhXgpguhAQgWghgMgjIAHgOIACgEQAUgrAkg/QA8hnA2hHIgPAlQgmBlAABqQAABgAfBkQgfhkAAhgQAAhqAmhlIAPglQATgpAbgpIAfgvQAJgQAGgpQAHg8AFgVQAahwBlhEIACgBQAmgYA0AAIAAAAIAAAAIAGAAIAAAAIAGAAQAzADA4AYQAzAWAgAdQAbAZAAARIgBAGIABgGQAAgRgbgZQgggdgzgWQg4gYgzgDIgGAAIAAAAIgGAAIAAAAIAAAAQg0AAgmAYIgCABQhlBEgaBwQgFAVgHA8QgGApgJAQIgfAvQgbApgTApQg2BHg8BnQgkA/gUArIgCAEIgHAOQiZjRgRjFQgTjlCrivQCdiiE3hpQBsglB+AIIAeADQBVADByAtQBAAZB4A0QAtAdAeAcQAdAbAJAUIACADQAPAjgCAZQgDAagVASQBRBigBB3QgBBDgoBKQggA6g2A7IgRAEIgLACIgBAAIgFABIgHABQhxAShkAAIAAAAIAAAAIgKAAQiqgBhIg5QgdgWgOgcQAXhdAfhBQAag0Arg3IACgFIAAAAIAAAAIgCAFQgrA3gaA0QgfBBgXBdQAOAcAdAWQBIA5CqABIAKAAIAAAAIAAAAQBkAABxgSIAHgBIAFgBIABAAIALgCQgGAOgJAOIgGAIIgHAXQgIAegGAiQgVBvADB0QAECGhSBNQg8A5hYANIh7AVQhWAPg7AGQAXgSAUgVIAPgRIBAAMIAGABIALACIABAAIAEABIADAAIAAAAIABAAIACAAIABAAIACABIAAAAIAEAAIACAAIABAAIACABIABAAIADAAIABAAIACAAIACAAIADABIAEAAIAAAAQAMAAACgDIABgBIAAgDQAAgGgMgPIgrguQhMhRglhOQguheAAhlQAAgcADgdQARiNAXhgQgXBggRCNQgDAdAAAcQAABlAuBeQAlBOBMBRIArAuQAMAPAAAGIAAADIgBABQgCADgMAAIAAAAIgEAAIgDgBIgCAAIgCAAIgBAAIgDAAIgBAAIgCgBIgBAAIgCAAIgEAAIAAAAIgCgBIgBAAIgCAAIgBAAIAAAAIgDAAIgEgBIgBAAIgLgCIgGgBIhAgMIgPARQgUAVgXASQhIAJg6AAQgeAAgagCgAmMH4QACAHADAGIgGgSgAJNl9QglANg8AJQiDAVhzAiQghAGglALQAlgLAhgGQBzgiCDgVQA8gJAlgNQAngMATgRQgTARgnAMgAAzgRIAAAAg");
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
	this.shape_2.graphics.f("#5C4734").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
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
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5C4734").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_2.setTransform(-2.1913,53.125);

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
	this.instance_1 = new lib.CachedBmp_2407();
	this.instance_1.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,165,154);


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
	this.shape_1.graphics.f("#453526").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape_1.graphics.f("#453526").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.shape_1.graphics.f("#453526").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#453526").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_1.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-7.5,96.6,15);


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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#453526").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
	this.shape_1.setTransform(0.05,0.0188);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-7.4,96.6,14.9);


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
	this.instance = new lib.CachedBmp_2406();
	this.instance.setTransform(-78.4,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.4,-67.4,157.5,146);


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
	this.instance = new lib.CachedBmp_2405();
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
	this.instance = new lib.CachedBmp_2404();
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
	this.instance = new lib.CachedBmp_2403();
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
	this.instance = new lib.CachedBmp_2402();
	this.instance.setTransform(-78.05,-69.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78,-69.4,165,135);


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
	this.shape_4.graphics.f("#4F1006").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
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
	this.shape_3.graphics.f("#4F1006").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
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
	this.instance_2 = new lib.CachedBmp_2401();
	this.instance_2.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,178.5,154);


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
	this.shape_2.graphics.f("#3D0C01").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
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
	this.shape_2.graphics.f("#3D0C01").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
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
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#3D0C01").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
	this.shape_2.setTransform(0.4,19.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

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
	this.instance = new lib.CachedBmp_2400();
	this.instance.setTransform(-48.3,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-8.9,96.5,18);


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
	this.instance = new lib.CachedBmp_2399();
	this.instance.setTransform(-48.25,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-8.9,96.5,18);


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
	this.instance_1 = new lib.CachedBmp_2398();
	this.instance_1.setTransform(-73.85,-69.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.8,-69.6,159,155);


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
	this.instance_1 = new lib.CachedBmp_2397();
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
	this.instance_1 = new lib.CachedBmp_2396();
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
	this.instance_1 = new lib.CachedBmp_2395();
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
	this.instance_1 = new lib.CachedBmp_2394();
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
	this.instance = new lib.CachedBmp_2391();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2393();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2392();
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
	this.instance = new lib.CachedBmp_2388();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2390();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2389();
	this.instance_2.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(216.45,-207.05,4.7384,4.7384,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


(lib.ch1_uLeg_rcopy3 = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(1.4118,4.5254,0.5593,0.5593);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D3C2B2").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_1.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-55.7,35.599999999999994,120.5);


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
	this.shape_6.graphics.f("#BAA087").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape_6.setTransform(1.6972,4.4729,0.5589,0.5588);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#BAA087").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_7.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.1,-55.7,35.6,120.4);


(lib.ch1_uLeg_rcopy_2 = function(mode,startPosition,loop,reversed) {
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
	this.shape_4.graphics.f("#FBF6E0").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape_4.setTransform(2.3972,4.4729,0.5589,0.5588);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FBF6E0").s().p("Ag5IcQgUgUgCghQgGhWgPl2QgOlRgEiPQgBggAXgbIABgCQAjgqA9AAQA9AAAjAqQAYAcgCAjIgjHjIghHHQgDAigUATQgSARgYAAQgZAAgSgRg");
	this.shape_5.setTransform(0,-44.2,1,1,0,0,0,0,-44.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.4,-55.7,35.6,120.4);


(lib.ch1_uLeg_lcopy3 = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(-2.1882,53.1254,0.5593,0.5593);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-7.1,35.6,120.5);


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
	this.shape_4.graphics.f("#BAA087").s().p("Ai0P6QhBhBgGhvQgztggPrBQgDhwA9hZIADgGQAuhFBHglQBCgkBLAAQBMAABCAkQBHAlAuBFQAfAvAOA2QAPA3gDA5QgWGegiGRQgjGmgoFGQgNBwhFBAQg+A7hSAAQhSAAg7g7g");
	this.shape_4.setTransform(-1.2028,53.0729,0.5589,0.5588);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BAA087").s().p("AgxIsQgYAAgSgSQgTgVgCghQgDhWgCl2QgClQABiQQABghAXgaIACgCQAkgpA8ADQA9ACAjArQAWAdgEAjIgzHhIgxHGQgDAhgUASQgSAQgXAAIgDAAg");
	this.shape_5.setTransform(-0.8,6,1,1,0,0,0,-0.1,-42.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-7.1,35.6,120.39999999999999);


(lib.ch1_uLeg_lcopy_2 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_uBodycopy3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_2387();
	this.instance.setTransform(-68.4,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-83.6,142.5,154);


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
	this.instance_3 = new lib.CachedBmp_2386();
	this.instance_3.setTransform(-68.4,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-83.6,142.5,154);


(lib.ch1_uBodycopy_2 = function(mode,startPosition,loop,reversed) {
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
	this.instance_2 = new lib.CachedBmp_2385();
	this.instance_2.setTransform(-68.4,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-83.6,142.5,154);


(lib.ch1_uArm_rcopy3 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FBF6E0").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
	this.shape.setTransform(33,0,1,1,0,0,0,33,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


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
	this.shape_3.graphics.f("#EBC49D").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
	this.shape_3.setTransform(33,0,1,1,0,0,0,33,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_uArm_rcopy_2 = function(mode,startPosition,loop,reversed) {
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
	this.shape_2.graphics.f("#D3C2B2").s().p("AgyByQjCgPiugVQgfgEgSgWQgRgVgBgbQgBgbAPgUQARgXAfgEQC6gYCegPQC/gSBkAAQCMAAA/AbQBHAfAABLQAABMhDAZQg3AViYAAQhUAAiygOg");
	this.shape_2.setTransform(33,0,1,1,0,0,0,33,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_uArm_lcopy3 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FBF6E0").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
	this.shape.setTransform(-33.4,0,1,1,0,0,0,-33.4,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

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
	this.shape_3.graphics.f("#EBC49D").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
	this.shape_3.setTransform(-33.4,0,1,1,0,0,0,-33.4,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_uArm_lcopy_2 = function(mode,startPosition,loop,reversed) {
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
	this.shape_2.graphics.f("#D3C2B2").s().p("AmeBlQhHgfAAhLQAAhMBDgZQA3gVCYAAQBUAACxAOQDDAPCuAVQAfAEASAXQARAUABAbQABAbgPAUQgRAXgfAEQi9AYicAPQi/AShjAAQiMAAg/gbg");
	this.shape_2.setTransform(-33.4,0,1,1,0,0,0,-33.4,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-12.8,97.2,25.6);


(lib.ch1_thumb_rcopy3 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_thumb_rcopy_2 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_thumb_lcopy3 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_thumb_lcopy_2 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_neckcopy3 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_neckcopy_2 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_lLeg_rcopy3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_2384();
	this.instance.setTransform(-19.45,-61.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-61.7,38.5,122.5);


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
	this.instance_1 = new lib.CachedBmp_2383();
	this.instance_1.setTransform(-19.45,-61.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-61.7,38.5,122.5);


(lib.ch1_lLeg_rcopy_2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_2382();
	this.instance.setTransform(-19.1,-61.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.1,-61.7,38.5,122.5);


(lib.ch1_lLeg_lcopy3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_2381();
	this.instance.setTransform(-19.4,-60.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.4,-60.8,38.5,122);


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

	// Layer_1
	this.instance_1 = new lib.CachedBmp_2380();
	this.instance_1.setTransform(-19.15,-60.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.1,-60.8,38.5,122);


(lib.ch1_lLeg_lcopy_2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_2379();
	this.instance.setTransform(-19.15,-60.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.1,-60.8,38.5,122);


(lib.ch1_lBodycopy3 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FBF6E0").s().p("Aj6IgQlcgekVg8QAgk8gMl8QgHi/gNh/QGuAMGxATQNhAmASAkQAFAKAAArQAABtggE6QgWDdgaDUQj8BrmrAAQipAAjGgRg");
	this.shape.setTransform(0.409,19.4371,0.563,0.563);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#66FFCC").s().p("AkJKjQjcg/iKhzQh4hkgmkXQggjwAoiyQAxjcDvh2QDZhsEfAOQEhAODSCBQDnCOAlDlQAXCUgeCmQgfCjhKCNQhOCShtBXQh1BdiFAGQgoACgoAAQjcAAjKg7g");
	this.shape_1.setTransform(-0.05,-19.1,0.5738,0.5738,0,0,0,0,-33.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.9,-42.1,98.6,93.1);


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
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EBC49D").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
	this.shape_3.setTransform(0.4,19.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.9,-12.1,98.6,63.1);


(lib.ch1_lBodycopy_2 = function(mode,startPosition,loop,reversed) {
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
	this.shape_2.graphics.f("#D3C2B2").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
	this.shape_2.setTransform(0.4,19.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.9,-12.1,98.6,63.1);


(lib.ch1_lArm_rcopy3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_2378();
	this.instance.setTransform(-48.3,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-8.9,96.5,18);


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
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EBC49D").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_2.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-7.5,96.6,15);


(lib.ch1_lArm_rcopy_2 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_lArm_lcopy3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_2377();
	this.instance.setTransform(-48.25,-8.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-8.9,96.5,18);


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
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EBC49D").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
	this.shape_2.setTransform(0.05,0.0188);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-7.4,96.6,14.9);


(lib.ch1_lArm_lcopy_2 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_headcopy3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_2376();
	this.instance.setTransform(-71.35,-78.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.3,-78.6,150.5,156.5);


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
	this.instance_2 = new lib.CachedBmp_2375();
	this.instance_2.setTransform(-75.5,-71.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.5,-71.9,158,135);


(lib.ch1_headcopy_2 = function(mode,startPosition,loop,reversed) {
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
	this.instance_2 = new lib.CachedBmp_2374();
	this.instance_2.setTransform(-70.2,-72.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.2,-72.5,149,133.5);


(lib.ch1_hand_rcopy3 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_hand_rcopy_2 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_hand_lcopy3 = function(mode,startPosition,loop,reversed) {
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


(lib.ch1_hand_lcopy_2 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-55.85,-21.8,0.9981,0.9981,-94.2327,0,0,38,-0.2);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-77.5,144.1,0.998,0.998,0,112.605,-67.395,6.1,-1.4);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-75.6,135.2,0.9983,0.9983,0,112.5024,-67.4976,5.2,-8.3);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-49.35,58.3,0.9982,0.9982,-70.4779,0,0,40.4,0);

	this.instance_4 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_4.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_5 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_5.setTransform(-42.25,187.9,0.998,0.998,0,6.6569,-173.3431,2.9,-53.5);

	this.instance_6 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_6.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_7 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_7.setTransform(24.75,192.3,0.9978,0.9978,0,-2.4987,177.5013,2.3,-53.1);

	this.instance_8 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_8.setTransform(8.15,96.05,0.9978,0.9978,-8.4129,0,0,-1.9,2.1);

	this.instance_9 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_9.setTransform(47.7,-26.35,0.9983,0.9983,77.5688,0,0,-31.2,-1.4);

	this.instance_10 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_10.setTransform(-20.8,92.3,0.9983,0.9983,12.4498,0,0,1.6,-45.7);

	this.instance_11 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_11.setTransform(62.35,134.35,0.9982,0.9982,0,-94.9365,85.0635,-4.8,3.5);

	this.instance_12 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_12.setTransform(53.65,126.65,0.9983,0.9983,0,-118.793,61.207,-6.1,8);

	this.instance_13 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_13.setTransform(64.55,46.4,0.9982,0.9982,95.2641,0,0,-39.5,-0.1);

	this.instance_14 = new lib.ch1_headcopy2("synched",0);
	this.instance_14.setTransform(0,-76.85,0.9989,0.9989,0,0.5847,-179.4153,0.6,52.8);

	this.instance_15 = new lib.ch1_neckcopy2("synched",0);
	this.instance_15.setTransform(-6,-58,0.999,0.999,-0.098,0,0,-1.6,8.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-1.6,scaleX:0.999,scaleY:0.999,rotation:-0.098,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9989,scaleY:0.9989,skewX:0.5847,skewY:-179.4153,x:0,y:-76.85,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.2641,x:64.55,y:46.4}},{t:this.instance_12,p:{regX:-6.1,regY:8,scaleX:0.9983,scaleY:0.9983,skewX:-118.793,skewY:61.207,x:53.65,y:126.65}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,skewX:-94.9365,skewY:85.0635,x:62.35,y:134.35,regY:3.5}},{t:this.instance_10,p:{regY:-45.7,scaleX:0.9983,scaleY:0.9983,rotation:12.4498,x:-20.8,y:92.3}},{t:this.instance_9,p:{rotation:77.5688,y:-26.35,scaleX:0.9983,scaleY:0.9983,x:47.7,regX:-31.2}},{t:this.instance_8,p:{regY:2.1,scaleX:0.9978,scaleY:0.9978,rotation:-8.4129,x:8.15,y:96.05}},{t:this.instance_7,p:{regX:2.3,skewX:-2.4987,skewY:177.5013,x:24.75,y:192.3}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.998,scaleY:0.998,skewX:6.6569,skewY:-173.3431,y:187.9,x:-42.25}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-70.4779,x:-49.35,y:58.3,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:112.5024,skewY:-67.4976,x:-75.6,y:135.2,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.998,scaleY:0.998,skewX:112.605,skewY:-67.395,x:-77.5,y:144.1}},{t:this.instance,p:{regY:-0.2,rotation:-94.2327,x:-55.85,regX:38,y:-21.8,scaleX:0.9981,scaleY:0.9981}}]}).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0936,y:-57.95,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:0.4175,skewY:-179.5825,x:-0.05,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9981,scaleY:0.9981,rotation:95.0746,x:64.5,y:46.4}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-118.973,skewY:61.027,x:53.85,y:126.75}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,skewX:-95.1091,skewY:84.8909,x:62.55,y:134.45,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.454,x:-20.85,y:92.3}},{t:this.instance_9,p:{rotation:77.6425,y:-26.3,scaleX:0.9983,scaleY:0.9983,x:47.7,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.418,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.5076,skewY:177.4924,x:24.8,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.6,scaleX:0.9979,scaleY:0.9979,skewX:6.661,skewY:-173.339,y:187.8,x:-42.25}},{t:this.instance_4},{t:this.instance_3,p:{regY:0.1,scaleX:0.9981,scaleY:0.9981,rotation:-65.0981,x:-52.05,y:58.45,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:117.8754,skewY:-62.1246,x:-85.5,y:132.55,regY:-8.3}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9979,scaleY:0.9979,skewX:117.9741,skewY:-62.0259,x:-88.1,y:141.05}},{t:this.instance,p:{regY:-0.3,rotation:-92.2492,x:-55.9,regX:38,y:-21.8,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.091,y:-57.95,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:0.2495,skewY:-179.7505,x:-0.1,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9981,rotation:94.8856,x:64.4,y:46.35}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-119.1534,skewY:60.8466,x:54.1,y:126.85}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,skewX:-95.2815,skewY:84.7185,x:62.7,y:134.5,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.4595,x:-20.85,y:92.3}},{t:this.instance_9,p:{rotation:77.7168,y:-26.35,scaleX:0.9982,scaleY:0.9982,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.425,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.3,skewX:-2.5172,skewY:177.4827,x:24.65,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.6,scaleX:0.9979,scaleY:0.9979,skewX:6.6655,skewY:-173.3345,y:187.8,x:-42.25}},{t:this.instance_4},{t:this.instance_3,p:{regY:0.1,scaleX:0.9981,scaleY:0.9981,rotation:-59.7199,x:-54.8,y:58.55,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,skewX:123.2511,skewY:-56.7489,x:-95.05,y:129.15,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:123.3462,skewY:-56.6538,x:-98.6,y:137.45}},{t:this.instance,p:{regY:-0.3,rotation:-90.2654,x:-55.9,regX:38.1,y:-21.9,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0866,y:-57.95,x:-6.05}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:0.0814,skewY:-179.9186,x:0,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.6957,x:64.3,y:46.4}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-119.3341,skewY:60.6659,x:54.1,y:126.95}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-95.4557,skewY:84.5443,x:62.95,y:134.4,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.465,x:-20.8,y:92.3}},{t:this.instance_9,p:{rotation:77.7904,y:-26.35,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.4304,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.5269,skewY:177.4731,x:24.85,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.6,scaleX:0.998,scaleY:0.998,skewX:6.6697,skewY:-173.3303,y:187.8,x:-42.3}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-54.3402,x:-57.75,y:58.45,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,skewX:128.6268,skewY:-51.3732,x:-104.3,y:125.05,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:128.717,skewY:-51.283,x:-108.5,y:133}},{t:this.instance,p:{regY:-0.3,rotation:-88.2864,x:-55.85,regX:38,y:-21.85,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0831,y:-57.95,x:-6.05}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-0.0814,skewY:179.9186,x:-0.2,y:-76.8,regX:0.7,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9981,scaleY:0.9981,rotation:94.5059,x:64.2,y:46.45}},{t:this.instance_12,p:{regX:-6.1,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-119.5146,skewY:60.4854,x:54.3,y:126.85}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-95.6282,skewY:84.3718,x:63.1,y:134.4,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.4703,x:-20.8,y:92.3}},{t:this.instance_9,p:{rotation:77.8646,y:-26.35,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.4383,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.5366,skewY:177.4634,x:24.85,y:192.25}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.6,scaleX:0.9979,scaleY:0.9979,skewX:6.6743,skewY:-173.3257,y:187.85,x:-42.3}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-48.961,x:-60.5,y:58.35,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:134.001,skewY:-45.999,x:-113.15,y:120.3,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:134.0887,skewY:-45.9113,x:-118.1,y:127.8}},{t:this.instance,p:{regY:-0.3,rotation:-86.3027,x:-55.8,regX:38,y:-21.8,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0796,y:-57.95,x:-6.05}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-0.2477,skewY:179.7523,x:0,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.3169,x:64.1,y:46.45}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-119.6962,skewY:60.3038,x:54.5,y:127}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-95.8016,skewY:84.1984,x:63.25,y:134.45,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.4756,x:-20.85,y:92.3}},{t:this.instance_9,p:{rotation:77.9391,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.4436,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.5462,skewY:177.4538,x:24.85,y:192.25}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.6,scaleX:0.9979,scaleY:0.9979,skewX:6.6795,skewY:-173.3205,y:187.8,x:-42.3}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-43.5815,x:-63.3,y:58.1,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,skewX:139.3756,skewY:-40.6244,x:-121.45,y:114.9,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:139.4605,skewY:-40.5395,x:-127.15,y:121.85}},{t:this.instance,p:{regY:-0.3,rotation:-84.3197,x:-55.85,regX:38.1,y:-21.95,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0761,y:-57.95,x:-6.05}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-0.4158,skewY:179.5842,x:-0.1,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.1263,x:64,y:46.5}},{t:this.instance_12,p:{regX:-6,regY:8,scaleX:0.9982,scaleY:0.9982,skewX:-119.8762,skewY:60.1238,x:54.75,y:127}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-95.9751,skewY:84.0249,x:63.35,y:134.45,regY:3.4}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.482,x:-20.8,y:92.3}},{t:this.instance_9,p:{rotation:78.0133,y:-26.35,scaleX:0.9983,scaleY:0.9983,x:47.7,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.4498,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.5567,skewY:177.4433,x:24.85,y:192.25}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.6,scaleX:0.9979,scaleY:0.9979,skewX:6.6839,skewY:-173.3161,y:187.8,x:-42.35}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-38.2037,x:-66.05,y:57.8,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,skewX:144.7521,skewY:-35.2479,x:-129.25,y:108.85,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:144.8329,skewY:-35.1671,x:-135.6,y:115.35}},{t:this.instance,p:{regY:-0.3,rotation:-82.3371,x:-55.9,regX:38,y:-21.85,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0726,y:-57.95,x:-6.05}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-0.583,skewY:179.417,x:-0.05,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.9367,x:63.95,y:46.5}},{t:this.instance_12,p:{regX:-6,regY:8,scaleX:0.9982,scaleY:0.9982,skewX:-120.0571,skewY:59.9429,x:54.9,y:127.05}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,skewX:-96.1478,skewY:83.8522,x:63.65,y:134.6,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.4873,x:-20.8,y:92.3}},{t:this.instance_9,p:{rotation:78.0868,y:-26.35,scaleX:0.9983,scaleY:0.9983,x:47.7,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.4569,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.5664,skewY:177.4336,x:24.85,y:192.25}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.6884,skewY:-173.3116,y:187.9,x:-42.35}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-32.824,x:-68.75,y:57.4,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:150.1259,skewY:-29.8741,x:-136.55,y:102.3,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:150.2033,skewY:-29.7967,x:-143.35,y:108.15}},{t:this.instance,p:{regY:-0.3,rotation:-80.352,x:-55.85,regX:38,y:-21.85,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0691,y:-57.95,x:-6.05}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-0.7519,skewY:179.2481,x:0.05,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9981,scaleY:0.9981,rotation:93.7471,x:63.8,y:46.5}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-120.2372,skewY:59.7628,x:55.05,y:127.15}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-96.3213,skewY:83.6787,x:63.8,y:134.5,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.4919,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.1609,y:-26.45,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.4631,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.576,skewY:177.424,x:24.85,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.6,scaleX:0.998,scaleY:0.998,skewX:6.6926,skewY:-173.3074,y:187.8,x:-42.3}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-27.4445,x:-71.55,y:56.9,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:155.5012,skewY:-24.4988,x:-143.2,y:95.25,regY:-8.3}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9979,scaleY:0.9979,skewX:155.5747,skewY:-24.4253,x:-150.4,y:100.4}},{t:this.instance,p:{regY:-0.3,rotation:-78.3698,x:-55.85,regX:38,y:-21.85,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0656,y:-57.95,x:-6.05}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-0.9182,skewY:179.0818,x:0.05,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9981,scaleY:0.9981,rotation:93.5567,x:63.7,y:46.55}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-120.4182,skewY:59.5818,x:55.15,y:127.25}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-96.4949,skewY:83.5051,x:63.95,y:134.55,regY:3.4}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.4981,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.2351,y:-26.4,scaleX:0.9982,scaleY:0.9982,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.4693,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.5857,skewY:177.4143,x:24.9,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.6972,skewY:-173.3028,y:187.85,x:-42.3}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-22.0657,x:-74.25,y:56.35,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:160.8767,skewY:-19.1233,x:-149.2,y:87.85,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:160.9453,skewY:-19.0547,x:-157.05,y:92.2}},{t:this.instance,p:{regY:-0.3,rotation:-76.3855,x:-55.85,regX:38,y:-21.85,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0621,y:-57.95,x:-6.05}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-1.0863,skewY:178.9137,x:0.05,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9981,scaleY:0.9981,rotation:93.368,x:63.55,y:46.6}},{t:this.instance_12,p:{regX:-6,regY:8,scaleX:0.9982,scaleY:0.9982,skewX:-120.5992,skewY:59.4008,x:55.45,y:127.25}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-96.667,skewY:83.333,x:64.2,y:134.55,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5034,x:-20.8,y:92.35}},{t:this.instance_9,p:{rotation:78.3096,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.4765,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.5953,skewY:177.4047,x:24.9,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7007,skewY:-173.2993,y:187.85,x:-42.3}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-16.6866,x:-76.8,y:55.65,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:166.2512,skewY:-13.7488,x:-154.45,y:79.95,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:166.3182,skewY:-13.6818,x:-162.65,y:83.65}},{t:this.instance,p:{regY:-0.3,rotation:-74.4022,x:-55.85,regX:38.1,y:-22,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0586,y:-57.95,x:-6.05}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-1.2527,skewY:178.7473,x:-0.05,y:-76.85,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.1776,x:63.5,y:46.6}},{t:this.instance_12,p:{regX:-6,regY:8,scaleX:0.9982,scaleY:0.9982,skewX:-120.7795,skewY:59.2205,x:55.6,y:127.2}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-96.8407,skewY:83.1593,x:64.4,y:134.55,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.509,x:-20.8,y:92.35}},{t:this.instance_9,p:{rotation:78.3821,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.4827,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.605,skewY:177.395,x:24.95,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.706,skewY:-173.294,y:187.85,x:-42.3}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-11.3072,x:-79.55,y:54.9,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:171.6267,skewY:-8.3733,x:-159,y:71.85,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:171.6893,skewY:-8.3107,x:-167.6,y:74.7}},{t:this.instance,p:{regY:-0.3,rotation:-72.4188,x:-55.9,regX:38,y:-21.9,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0551,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-1.4199,skewY:178.5801,x:0,y:-76.85,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9981,scaleY:0.9981,rotation:92.9873,x:63.4,y:46.65}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-120.959,skewY:59.041,x:55.65,y:127.35}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-97.0145,skewY:82.9855,x:64.5,y:134.6,regY:3.4}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5151,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.4578,y:-26.4,scaleX:0.9982,scaleY:0.9982,x:47.6,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.4897,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.6146,skewY:177.3854,x:24.9,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7105,skewY:-173.2895,y:187.85,x:-42.35}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-5.9274,x:-82.25,y:54,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:177.0023,skewY:-2.9977,x:-162.9,y:63.4,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:177.0603,skewY:-2.9397,x:-171.75,y:65.5}},{t:this.instance,p:{regY:-0.3,rotation:-70.4356,x:-55.9,regX:38,y:-21.9,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0516,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-1.5871,skewY:178.4129,x:-0.05,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.7978,x:63.25,y:46.6}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-121.1405,skewY:58.8595,x:55.85,y:127.3}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-97.1859,skewY:82.8141,x:64.85,y:134.6,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5204,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.532,y:-26.4,scaleX:0.9982,scaleY:0.9982,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.4967,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.3,skewX:-2.6252,skewY:177.3748,x:24.8,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.998,scaleY:0.998,skewX:6.7147,skewY:-173.2853,y:187.85,x:-42.35}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-0.5475,x:-84.85,y:53.05,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-177.6275,skewY:2.3725,x:-166.05,y:54.85,regY:-8.3}},{t:this.instance_1,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-177.5726,skewY:2.4274,x:-174.85,y:56.05}},{t:this.instance,p:{regY:-0.3,rotation:-68.453,x:-55.8,regX:38,y:-21.85,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0481,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-1.7552,skewY:178.2448,x:0,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.6084,x:63.25,y:46.65}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-121.3212,skewY:58.6788,x:56.05,y:127.45}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-97.3605,skewY:82.6395,x:65,y:134.6,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5251,x:-20.8,y:92.3}},{t:this.instance_9,p:{rotation:78.6054,y:-26.45,scaleX:0.9983,scaleY:0.9983,x:47.7,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5021,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.6348,skewY:177.3652,x:24.9,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7193,skewY:-173.2807,y:187.85,x:-42.35}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:4.826,x:-87.35,y:52,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-172.253,skewY:7.747,x:-168.4,y:46.15,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-172.2007,skewY:7.7993,x:-177.45,y:46.65}},{t:this.instance,p:{regY:-0.2,rotation:-66.4697,x:-55.8,regX:38,y:-21.85,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0446,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-1.9234,skewY:178.0766,x:0,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.419,x:63.05,y:46.65}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-121.5009,skewY:58.4991,x:56.2,y:127.45}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-97.5336,skewY:82.4664,x:65.2,y:134.65,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5311,x:-20.75,y:92.3}},{t:this.instance_9,p:{rotation:78.6796,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.7,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5083,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.6445,skewY:177.3555,x:24.9,y:192.25}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7236,skewY:-173.2764,y:187.85,x:-42.35}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:10.205,x:-89.9,y:50.85,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-166.8772,skewY:13.1228,x:-170.1,y:37.45,regY:-8.3}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9979,scaleY:0.9979,skewX:-166.8297,skewY:13.1703,x:-179,y:37.05}},{t:this.instance,p:{regY:-0.3,rotation:-64.4849,x:-55.75,regX:38.1,y:-22,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0411,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-2.0907,skewY:177.9093,x:-0.1,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.2297,x:63,y:46.7}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-121.6822,skewY:58.3178,x:56.35,y:127.5}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-97.706,skewY:82.294,x:65.3,y:134.65,regY:3.4}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5368,x:-20.8,y:92.3}},{t:this.instance_9,p:{rotation:78.7536,y:-26.45,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5145,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.655,skewY:177.345,x:25,y:192.25}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7281,skewY:-173.2719,y:187.85,x:-42.35}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:15.5841,x:-92.4,y:49.65,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-161.5025,skewY:18.4975,x:-171.05,y:28.75,regY:-8.3}},{t:this.instance_1,p:{regX:6,scaleX:0.9979,scaleY:0.9979,skewX:-161.4578,skewY:18.5422,x:-179.95,y:27.4}},{t:this.instance,p:{regY:-0.3,rotation:-62.5022,x:-55.85,regX:38,y:-21.95,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0376,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9989,scaleY:0.9989,skewX:-2.2571,skewY:177.7429,x:0,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.0395,x:62.95,y:46.7}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-121.8626,skewY:58.1374,x:56.6,y:127.55}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-97.8802,skewY:82.1198,x:65.6,y:134.65,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5421,x:-20.8,y:92.3}},{t:this.instance_9,p:{rotation:78.8276,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.6,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5216,x:8.15,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.6646,skewY:177.3354,x:25,y:192.25}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7324,skewY:-173.2675,y:187.85,x:-42.35}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:20.9619,x:-94.85,y:48.35,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-156.1281,skewY:23.8719,x:-171.15,y:20.25,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-156.0879,skewY:23.9121,x:-179.95,y:18.05}},{t:this.instance,p:{regY:-0.3,rotation:-60.5179,x:-55.85,regX:38,y:-21.9,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0341,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9989,skewX:-2.4244,skewY:177.5756,x:-0.05,y:-76.6,regX:0.6,regY:52.9}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.8502,x:62.75,y:46.75}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-122.0436,skewY:57.9564,x:56.7,y:127.6}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.0527,skewY:81.9473,x:65.8,y:134.65,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5481,x:-20.75,y:92.3}},{t:this.instance_9,p:{rotation:78.902,y:-26.3,scaleX:0.9983,scaleY:0.9983,x:47.6,regX:-31.1}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5278,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.6742,skewY:177.3257,x:25.05,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.998,scaleY:0.998,skewX:6.7368,skewY:-173.2632,y:187.85,x:-42.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:26.3425,x:-97.25,y:46.95,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-150.7524,skewY:29.2476,x:-170.5,y:11.8,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-150.7167,skewY:29.2833,x:-179.1,y:8.85}},{t:this.instance,p:{regY:-0.3,rotation:-58.5357,x:-55.85,regX:38,y:-21.95,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0306,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-2.5918,skewY:177.4082,x:0,y:-76.6,regX:0.6,regY:52.9}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.66,x:62.75,y:46.75}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-122.2239,skewY:57.7761,x:56.85,y:127.7}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.2261,skewY:81.7739,x:65.85,y:134.7,regY:3.4}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5538,x:-20.75,y:92.3}},{t:this.instance_9,p:{rotation:78.976,y:-26.25,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.1}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5341,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.3,skewX:-2.6839,skewY:177.3161,x:24.85,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7413,skewY:-173.2587,y:187.85,x:-42.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:31.7214,x:-99.65,y:45.45,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-145.3785,skewY:34.6215,x:-169.3,y:3.65,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-145.346,skewY:34.654,x:-177.5,y:0}},{t:this.instance,p:{regY:-0.3,rotation:-56.5507,x:-55.85,regX:38,y:-21.95,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0271,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-2.7592,skewY:177.2408,x:-0.05,y:-76.6,regX:0.6,regY:52.9}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.4699,x:62.6,y:46.8}},{t:this.instance_12,p:{regX:-6.1,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-122.405,skewY:57.595,x:57.05,y:127.5}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.3997,skewY:81.6003,x:66.2,y:134.7,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5583,x:-20.8,y:92.3}},{t:this.instance_9,p:{rotation:79.0499,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5412,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.6944,skewY:177.3056,x:24.95,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7457,skewY:-173.2543,y:187.85,x:-42.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:37.0996,x:-101.95,y:43.9,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-140.0038,skewY:39.9962,x:-167.3,y:-4.2,regY:-8.3}},{t:this.instance_1,p:{regX:6,scaleX:0.9979,scaleY:0.9979,skewX:-139.9733,skewY:40.0267,x:-175.3,y:-8.8}},{t:this.instance,p:{regY:-0.3,rotation:-54.5686,x:-55.85,regX:38,y:-21.9,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0236,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-2.9274,skewY:177.0726,x:-0.05,y:-76.75,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.2807,x:62.5,y:46.8}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-122.5857,skewY:57.4143,x:57.2,y:127.7}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.5723,skewY:81.4277,x:66.4,y:134.7,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5644,x:-20.85,y:92.3}},{t:this.instance_9,p:{rotation:79.1229,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5474,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7041,skewY:177.2959,x:25,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.751,skewY:-173.249,y:187.85,x:-42.35}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:42.4795,x:-104.25,y:42.3,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,skewX:-134.6272,skewY:45.3728,x:-164.85,y:-11.8,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-134.6023,skewY:45.3977,x:-172.2,y:-16.9}},{t:this.instance,p:{regY:-0.3,rotation:-52.5851,x:-55.85,regX:38,y:-21.95,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0201,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.0948,skewY:176.9052,x:-0.1,y:-76.75,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.0905,x:62.45,y:46.85}},{t:this.instance_12,p:{regX:-6,regY:8,scaleX:0.9982,scaleY:0.9982,skewX:-122.765,skewY:57.235,x:57.45,y:127.7}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.7462,skewY:81.2538,x:66.55,y:134.65,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5699,x:-20.8,y:92.3}},{t:this.instance_9,p:{rotation:79.1969,y:-26.4,scaleX:0.9982,scaleY:0.9982,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5544,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7138,skewY:177.2862,x:25.05,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7554,skewY:-173.2446,y:187.8,x:-42.35}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:47.8584,x:-106.4,y:40.55,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-129.2528,skewY:50.7472,x:-161.6,y:-18.95,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-129.2315,skewY:50.7685,x:-168.55,y:-24.75}},{t:this.instance,p:{regY:-0.4,rotation:-50.6016,x:-55.95,regX:38,y:-22,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0166,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.2623,skewY:176.7377,x:-0.05,y:-76.75,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9981,scaleY:0.9981,rotation:90.9022,x:62.25,y:46.85}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-122.9458,skewY:57.0542,x:57.6,y:127.7}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.918,skewY:81.082,x:66.75,y:134.7,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5761,x:-20.85,y:92.3}},{t:this.instance_9,p:{rotation:79.272,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.6,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5615,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7234,skewY:177.2766,x:25.1,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.998,scaleY:0.998,skewX:6.7597,skewY:-173.2403,y:187.8,x:-42.35}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:53.2384,x:-108.5,y:38.75,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,skewX:-123.8774,skewY:56.1226,x:-158,y:-25.6,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-123.8597,skewY:56.1403,x:-164.25,y:-32.05}},{t:this.instance,p:{regY:-0.3,rotation:-48.6173,x:-55.8,regX:38,y:-21.95,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0131,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.4297,skewY:176.5702,x:-0.05,y:-76.7,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.7112,x:62.25,y:46.9}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-123.1267,skewY:56.8733,x:57.75,y:127.85}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-99.0918,skewY:80.9082,x:66.95,y:134.7,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5816,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:79.346,y:-26.45,scaleX:0.9982,scaleY:0.9982,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5668,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.3,skewX:-2.7321,skewY:177.2678,x:24.95,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7642,skewY:-173.2358,y:187.75,x:-42.35}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:58.6168,x:-110.65,y:36.9,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-118.5024,skewY:61.4976,x:-153.75,y:-31.85,regY:-8.3}},{t:this.instance_1,p:{regX:6,scaleX:0.9979,scaleY:0.9979,skewX:-118.4884,skewY:61.5116,x:-159.45,y:-39.05}},{t:this.instance,p:{regY:-0.2,rotation:-46.6336,x:-55.7,regX:38,y:-21.9,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0096,y:-58,x:-5.95}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.5972,skewY:176.4027,x:-0.1,y:-76.6,regX:0.6,regY:52.9}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.5212,x:62.15,y:46.9}},{t:this.instance_12,p:{regX:-6,regY:8,scaleX:0.9982,scaleY:0.9982,skewX:-123.3075,skewY:56.6925,x:57.9,y:127.8}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-99.2649,skewY:80.7351,x:67.15,y:134.7,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5869,x:-20.8,y:92.35}},{t:this.instance_9,p:{rotation:79.4197,y:-26.4,scaleX:0.9982,scaleY:0.9982,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.573,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7419,skewY:177.2581,x:25,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7695,skewY:-173.2305,y:187.8,x:-42.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:63.9971,x:-112.55,y:35.05,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-113.1277,skewY:66.8723,x:-149.1,y:-37.55,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-113.1167,skewY:66.8833,x:-154.1,y:-45.1}},{t:this.instance,p:{regY:-0.2,rotation:-44.6513,x:-55.75,regX:38,y:-21.9,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0061,y:-58,x:-5.95}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.7648,skewY:176.2352,x:-0.1,y:-76.75,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.3328,x:62,y:46.9}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-123.4885,skewY:56.5115,x:58.05,y:127.9}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-99.438,skewY:80.562,x:67.35,y:134.75,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5923,x:-20.8,y:92.35}},{t:this.instance_9,p:{rotation:79.4948,y:-26.35,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.1}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5792,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7515,skewY:177.2485,x:25.05,y:192.2}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.773,skewY:-173.227,y:187.8,x:-42.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:69.3749,x:-114.55,y:33.1,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-107.7522,skewY:72.2478,x:-144.1,y:-42.6,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-107.7445,skewY:72.2555,x:-148.4,y:-50.55}},{t:this.instance,p:{regY:-0.2,rotation:-42.6673,x:-55.8,regX:38,y:-21.95,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0026,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.9306,skewY:176.0694,x:-0.15,y:-76.75,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.1419,x:61.9,y:46.9}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-123.6692,skewY:56.3308,x:58.25,y:127.9}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,skewX:-99.6112,skewY:80.3888,x:67.55,y:134.75,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.5986,x:-20.8,y:92.35}},{t:this.instance_9,p:{rotation:79.5686,y:-26.5,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5861,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.762,skewY:177.238,x:25.05,y:192.15}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7784,skewY:-173.2216,y:187.75,x:-42.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:74.7546,x:-116.4,y:31,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-102.3776,skewY:77.6224,x:-138.8,y:-47.15,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-102.3733,skewY:77.6267,x:-142.25,y:-55.5}},{t:this.instance,p:{regY:-0.3,rotation:-40.6848,x:-55.85,regX:38,y:-22.05,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-4.0982,skewY:175.9018,x:-0.1,y:-76.75,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9981,scaleY:0.9981,rotation:89.958,x:61.8,y:46.85}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-123.8492,skewY:56.1508,x:58.35,y:127.9}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-99.7845,skewY:80.2155,x:67.8,y:134.75,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.8,y:92.35}},{t:this.instance_9,p:{rotation:79.6417,y:-26.45,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.75,x:-42.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:80.1329,x:-118.15,y:28.9,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-97.0016,skewY:82.9984,x:-133.1,y:-51.05,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-97.0025,skewY:82.9975,x:-135.75,y:-59.7}},{t:this.instance,p:{regY:-0.3,rotation:-38.7003,x:-55.8,regX:38,y:-22,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.884,skewY:176.1159,x:-0.15,y:-76.75,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.1839,x:61.95,y:46.9}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-123.6179,skewY:56.3821,x:58.2,y:127.85}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-99.5526,skewY:80.4474,x:67.55,y:134.75,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.8,y:92.35}},{t:this.instance_9,p:{rotation:79.5401,y:-26.45,scaleX:0.9983,scaleY:0.9983,x:47.6,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7708,skewY:177.2292,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.75,x:-42.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9981,scaleY:0.9981,rotation:80.5424,x:-132,y:3.35,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-96.5932,skewY:83.4068,x:-146.5,y:-76.65,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-96.5922,skewY:83.4078,x:-149.1,y:-85.3}},{t:this.instance,p:{regY:-0.4,rotation:-17.8499,x:-55.8,regX:38,y:-22,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.671,skewY:176.329,x:-0.1,y:-76.6,regX:0.6,regY:52.9}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.4152,x:62.15,y:46.85}},{t:this.instance_12,p:{regX:-6,regY:8,scaleX:0.9982,scaleY:0.9982,skewX:-123.3859,skewY:56.6141,x:58.1,y:127.8}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-99.3216,skewY:80.6784,x:67.25,y:134.7,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.8,y:92.35}},{t:this.instance_9,p:{rotation:79.4369,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.6,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7708,skewY:177.2292,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.781,skewY:-173.219,y:187.75,x:-42.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:80.9536,x:-136.1,y:-25.45,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-96.1834,skewY:83.8166,x:-149.9,y:-105.55,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-96.184,skewY:83.816,x:-152.4,y:-114.2}},{t:this.instance,p:{regY:-0.3,rotation:2.9962,x:-55.85,regX:38,y:-21.85,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.4561,skewY:176.5439,x:-0.05,y:-76.7,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.6455,x:62.25,y:46.85}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-123.1552,skewY:56.8448,x:57.8,y:127.85}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-99.0892,skewY:80.9108,x:67.05,y:134.7,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6022,x:-20.8,y:92.35}},{t:this.instance_9,p:{rotation:79.3326,y:-26.4,scaleX:0.9982,scaleY:0.9982,x:47.6,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7699,skewY:177.2301,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.781,skewY:-173.219,y:187.75,x:-42.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:81.3631,x:-129.55,y:-53.85,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-95.7738,skewY:84.2262,x:-142.85,y:-133.95,regY:-8.4}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-95.7753,skewY:84.2247,x:-145.15,y:-142.65}},{t:this.instance,p:{regY:-0.2,rotation:23.8469,x:-55.75,regX:38,y:-21.85,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-5.95}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.2413,skewY:176.7587,x:-0.15,y:-76.7,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.8776,x:62.4,y:46.85}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-122.9229,skewY:57.0771,x:57.65,y:127.75}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.8578,skewY:81.1422,x:66.75,y:134.7,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6022,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:79.2299,y:-26.35,scaleX:0.9982,scaleY:0.9982,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5916,x:8,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7699,skewY:177.2301,x:25.2,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7801,skewY:-173.2199,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:81.7712,x:-113.35,y:-77.85,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,skewX:-95.3648,skewY:84.6352,x:-125.9,y:-158.3,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-95.365,skewY:84.635,x:-128.3,y:-166.9}},{t:this.instance,p:{regY:-0.2,rotation:44.699,x:-55.8,regX:38,y:-21.8,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.2772,skewY:176.7228,x:-0.1,y:-76.7,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.8339,x:62.4,y:46.8}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-122.9671,skewY:57.0329,x:57.75,y:127.8}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.902,skewY:81.098,x:66.85,y:134.65,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6022,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:79.2105,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:7.95,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7699,skewY:177.2301,x:25.2,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7801,skewY:-173.2199,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:81.7926,x:-113.35,y:-77.85,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-95.3453,skewY:84.6547,x:-125.85,y:-158.3,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-95.344,skewY:84.656,x:-128.35,y:-166.9}},{t:this.instance,p:{regY:-0.2,rotation:44.6983,x:-55.8,regX:38,y:-21.8,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.3131,skewY:176.6869,x:-0.15,y:-76.7,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.7901,x:62.45,y:46.8}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-123.0116,skewY:56.9884,x:57.85,y:127.8}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.9464,skewY:81.0536,x:67,y:134.65,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6022,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:79.1897,y:-26.45,scaleX:0.9982,scaleY:0.9982,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:7.95,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7699,skewY:177.2301,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.781,skewY:-173.219,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:81.8129,x:-113.35,y:-77.85,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-95.3242,skewY:84.6758,x:-125.8,y:-158.3,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-95.3237,skewY:84.6763,x:-128.3,y:-166.9}},{t:this.instance,p:{regY:-0.2,rotation:44.6977,x:-55.8,regX:38,y:-21.8,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.3482,skewY:176.6518,x:-0.1,y:-76.7,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.7454,x:62.5,y:46.8}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-123.0558,skewY:56.9442,x:57.95,y:127.8}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.989,skewY:81.011,x:67.1,y:134.65,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6022,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:79.1694,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:7.95,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7699,skewY:177.2301,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.781,skewY:-173.219,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:81.8331,x:-113.35,y:-77.9,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-95.3031,skewY:84.6969,x:-125.8,y:-158.3,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-95.3035,skewY:84.6965,x:-128.3,y:-166.9}},{t:this.instance,p:{regY:-0.2,rotation:44.6965,x:-55.8,regX:38,y:-21.85,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.3841,skewY:176.6159,x:-0.1,y:-76.65,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.7016,x:62.55,y:46.8}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-123.0995,skewY:56.9005,x:58.05,y:127.75}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-99.0342,skewY:80.9658,x:67.2,y:134.65,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:79.149,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:7.95,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7708,skewY:177.2292,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.781,skewY:-173.219,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:81.8538,x:-113.35,y:-77.9,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-95.282,skewY:84.718,x:-125.8,y:-158.3,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-95.2824,skewY:84.7176,x:-128.2,y:-166.9}},{t:this.instance,p:{regY:-0.3,rotation:44.6953,x:-55.75,regX:38,y:-21.9,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.4192,skewY:176.5808,x:-0.15,y:-76.65,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.6569,x:62.5,y:46.8}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-123.1445,skewY:56.8555,x:58.15,y:127.75}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-99.0785,skewY:80.9215,x:67.3,y:134.6,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:79.1293,y:-26.45,scaleX:0.9983,scaleY:0.9983,x:47.7,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:7.95,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7708,skewY:177.2292,x:25.15,y:192.1}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.781,skewY:-173.219,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:81.8739,x:-113.35,y:-77.95,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-95.2618,skewY:84.7382,x:-125.8,y:-158.25,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-95.2622,skewY:84.7378,x:-128.2,y:-166.9}},{t:this.instance,p:{regY:-0.3,rotation:44.6946,x:-55.75,regX:38,y:-21.9,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.4552,skewY:176.5448,x:-0.1,y:-76.65,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.6131,x:62.5,y:46.8}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-123.1882,skewY:56.8118,x:58.2,y:127.75}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-99.1229,skewY:80.8771,x:67.4,y:134.6,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:79.1098,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:7.95,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7708,skewY:177.2292,x:25.15,y:192.1}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:81.8943,x:-113.35,y:-77.95,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-95.2424,skewY:84.7576,x:-125.8,y:-158.25,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-95.2411,skewY:84.7589,x:-128.2,y:-166.9}},{t:this.instance,p:{regY:-0.3,rotation:44.6934,x:-55.75,regX:38,y:-21.9,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.4911,skewY:176.5089,x:-0.15,y:-76.65,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.5693,x:62.6,y:46.8}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-123.2329,skewY:56.7671,x:58.3,y:127.75}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-99.1673,skewY:80.8327,x:67.5,y:134.65,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:79.0894,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.6,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:7.95,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7708,skewY:177.2292,x:25.15,y:192.1}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.75,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:81.9146,x:-113.4,y:-77.95,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-95.2204,skewY:84.7796,x:-125.75,y:-158.25,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-95.22,skewY:84.78,x:-128.15,y:-166.95}},{t:this.instance,p:{regY:-0.3,rotation:44.6922,x:-55.75,regX:38,y:-21.9,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.5262,skewY:176.4738,x:-0.1,y:-76.55,regX:0.6,regY:52.9}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.5255,x:62.6,y:46.75}},{t:this.instance_12,p:{regX:-6,regY:8,scaleX:0.9982,scaleY:0.9982,skewX:-123.2766,skewY:56.7234,x:58.45,y:127.65}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-99.2107,skewY:80.7893,x:67.6,y:134.6,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:79.0697,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.6,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:7.95,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.1}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.75,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:81.9351,x:-113.35,y:-77.95,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-95.2001,skewY:84.7999,x:-125.7,y:-158.3,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-95.2014,skewY:84.7986,x:-128.05,y:-166.9}},{t:this.instance,p:{regY:-0.3,rotation:44.6915,x:-55.75,regX:38,y:-21.85,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.3517,skewY:176.6483,x:-0.05,y:-76.7,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:90.7165,x:62.7,y:46.75}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-123.085,skewY:56.915,x:58.15,y:127.7}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-99.0199,skewY:80.9801,x:67.4,y:134.6,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.9982,y:-26.25,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.1}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:75.5845,x:-118.7,y:-71.8,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-101.5502,skewY:78.4498,x:-139.8,y:-150.35,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-101.5522,skewY:78.4478,x:-143.15,y:-158.7}},{t:this.instance,p:{regY:-0.4,rotation:38.9128,x:-55.65,regX:38,y:-21.95,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.1764,skewY:176.8236,x:-0.15,y:-76.7,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9981,scaleY:0.9981,rotation:90.9092,x:62.8,y:46.75}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-122.893,skewY:57.107,x:57.95,y:127.6}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.8301,skewY:81.1699,x:67.15,y:134.55,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.9261,y:-26.25,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.1}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:69.2335,x:-123.4,y:-65.2,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-107.902,skewY:72.098,x:-153.1,y:-140.9,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-107.9019,skewY:72.0981,x:-157.4,y:-148.9}},{t:this.instance,p:{regY:-0.2,rotation:33.1349,x:-55.8,regX:38,y:-21.8,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-3.0029,skewY:176.9971,x:-0.15,y:-76.7,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.0993,x:62.9,y:46.65}},{t:this.instance_12,p:{regX:-6,regY:8,scaleX:0.9982,scaleY:0.9982,skewX:-122.7035,skewY:57.2965,x:57.85,y:127.55}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.6387,skewY:81.3613,x:67,y:134.65,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.8546,y:-26.25,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.1}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:62.8838,x:-127.4,y:-58.2,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-114.2526,skewY:65.7474,x:-165.35,y:-130.1,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-114.2524,skewY:65.7476,x:-170.4,y:-137.55}},{t:this.instance,p:{regY:-0.3,rotation:27.358,x:-55.65,regX:38.1,y:-21.8,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-2.8266,skewY:177.1734,x:-0.1,y:-76.7,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.2894,x:62.95,y:46.7}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-122.5128,skewY:57.4872,x:57.7,y:127.55}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.4476,skewY:81.5524,x:66.8,y:134.6,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.783,y:-26.35,scaleX:0.9983,scaleY:0.9983,x:47.6,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:56.5332,x:-130.7,y:-50.8,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-120.6022,skewY:59.3978,x:-176.4,y:-118.15,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-120.602,skewY:59.398,x:-182.25,y:-124.95}},{t:this.instance,p:{regY:-0.3,rotation:21.5789,x:-55.75,regX:38,y:-21.9,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-2.6523,skewY:177.3477,x:-0.05,y:-76.6,regX:0.6,regY:52.9}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.4804,x:63.1,y:46.7}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-122.3211,skewY:57.6789,x:57.5,y:127.6}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.2562,skewY:81.7438,x:66.55,y:134.6,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.7098,y:-26.35,scaleX:0.9983,scaleY:0.9983,x:47.6,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:50.182,x:-133.25,y:-43.15,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-126.9538,skewY:53.0462,x:-186.05,y:-104.9,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-126.9537,skewY:53.0463,x:-192.65,y:-111.1}},{t:this.instance,p:{regY:-0.3,rotation:15.8022,x:-55.6,regX:38.1,y:-21.9,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-2.477,skewY:177.523,x:0,y:-76.6,regX:0.6,regY:52.9}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.6714,x:63.15,y:46.65}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-122.1299,skewY:57.8701,x:57.3,y:127.55}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-98.0651,skewY:81.9349,x:66.4,y:134.6,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.6394,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:43.8324,x:-134.95,y:-35.15,regX:40.5}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-133.304,skewY:46.696,x:-194.35,y:-90.75,regY:-8.3}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9979,scaleY:0.9979,skewX:-133.3055,skewY:46.6952,x:-201.45,y:-96.1}},{t:this.instance,p:{regY:-0.3,rotation:10.024,x:-55.75,regX:38,y:-21.9,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-2.3018,skewY:177.6982,x:-0.05,y:-76.75,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.8625,x:63.25,y:46.65}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-121.9394,skewY:58.0606,x:57.15,y:127.5}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-97.875,skewY:82.125,x:66.2,y:134.55,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.5686,y:-26.4,scaleX:0.9982,scaleY:0.9982,x:47.7,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:37.4815,x:-135.95,y:-27.1,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,skewX:-139.6558,skewY:40.3442,x:-201.05,y:-75.9,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-139.6557,skewY:40.3443,x:-208.8,y:-80.4}},{t:this.instance,p:{regY:-0.3,rotation:4.247,x:-55.8,regX:38,y:-21.9,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-2.1292,skewY:177.8708,x:-0.05,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.0544,x:63.3,y:46.6}},{t:this.instance_12,p:{regX:-6.1,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-121.7486,skewY:58.2514,x:56.9,y:127.35}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-97.683,skewY:82.317,x:65.85,y:134.55,regY:3.4}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.4948,y:-26.35,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.45}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:31.1296,x:-136.1,y:-19,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,skewX:-146.0058,skewY:33.9942,x:-206.25,y:-60.25,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-146.0055,skewY:33.9945,x:-214.4,y:-63.85}},{t:this.instance,p:{regY:-0.3,rotation:-1.5261,x:-55.75,regX:38,y:-21.8,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-1.954,skewY:178.0459,x:0,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.2446,x:63.45,y:46.6}},{t:this.instance_12,p:{regX:-6.1,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-121.5575,skewY:58.4425,x:56.65,y:127.25}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-97.4921,skewY:82.5079,x:65.8,y:134.6,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.4247,y:-26.4,scaleX:0.9982,scaleY:0.9982,x:47.6,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:24.7792,x:-135.4,y:-11,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-152.3565,skewY:27.6435,x:-209.65,y:-44.2,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-152.3571,skewY:27.6429,x:-218.2,y:-46.85}},{t:this.instance,p:{regY:-0.3,rotation:-7.3033,x:-55.85,regX:38,y:-21.85,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-1.7789,skewY:178.2211,x:0,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.4348,x:63.5,y:46.55}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-121.3669,skewY:58.6331,x:56.6,y:127.4}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-97.3005,skewY:82.6995,x:65.55,y:134.55,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.3534,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.6,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:18.4297,x:-133.9,y:-3,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,skewX:-158.7065,skewY:21.2935,x:-211.35,y:-27.8,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-158.7062,skewY:21.2938,x:-220.2,y:-29.55}},{t:this.instance,p:{regY:-0.3,rotation:-13.0808,x:-55.65,regX:38.1,y:-21.9,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-1.6038,skewY:178.3962,x:0,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.6268,x:63.6,y:46.55}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-121.1754,skewY:58.8246,x:56.45,y:127.35}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-97.1108,skewY:82.8892,x:65.2,y:134.6,regY:3.4}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.2818,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.6,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:12.0799,x:-131.55,y:4.8,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-165.0568,skewY:14.9432,x:-211.35,y:-11.3,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-165.0568,skewY:14.9432,x:-220.25,y:-12.05}},{t:this.instance,p:{regY:-0.3,rotation:-18.8585,x:-55.8,regX:38,y:-21.8,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-1.4295,skewY:178.5705,x:-0.05,y:-76.85,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.8179,x:63.75,y:46.5}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-120.9845,skewY:59.0155,x:56.25,y:127.25}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-96.9201,skewY:83.0799,x:65.1,y:134.55,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.2093,y:-26.45,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:5.7276,x:-128.6,y:12.15,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-171.4071,skewY:8.5929,x:-209.55,y:5.25,regY:-8.4}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:-171.4076,skewY:8.5924,x:-218.6,y:5.25}},{t:this.instance,p:{regY:-0.2,rotation:-24.6357,x:-55.8,regX:38,y:-21.75,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-1.2544,skewY:178.7456,x:-0.05,y:-76.85,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.0083,x:63.8,y:46.55}},{t:this.instance_12,p:{regX:-6.1,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-120.7936,skewY:59.2064,x:56.05,y:127.15}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-96.7287,skewY:83.2713,x:65,y:134.55,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.1377,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.7,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.05,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-0.6175,x:-124.75,y:19.3,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:-177.7572,skewY:2.2428,x:-205.95,y:21.2,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.998,scaleY:0.998,skewX:-177.7584,skewY:2.2416,x:-214.95,y:22.45}},{t:this.instance,p:{regY:-0.3,rotation:-30.4138,x:-55.85,regX:38,y:-21.85,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-1.0802,skewY:178.9198,x:0,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.1995,x:63.9,y:46.5}},{t:this.instance_12,p:{regX:-6,regY:8,scaleX:0.9982,scaleY:0.9982,skewX:-120.6024,skewY:59.3976,x:56,y:127.2}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-96.5382,skewY:83.4618,x:64.65,y:134.5,regY:3.4}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:78.0662,y:-26.35,scaleX:0.9983,scaleY:0.9983,x:47.7,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.8,x:-42.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-6.9686,x:-120.25,y:26.05,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:175.8965,skewY:-4.1034,x:-200.85,y:36.9,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.998,scaleY:0.9979,skewX:175.8964,skewY:-4.1035,x:-209.55,y:39.1}},{t:this.instance,p:{regY:-0.4,rotation:-36.1908,x:-55.85,regX:38,y:-21.95,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-0.9051,skewY:179.0949,x:0,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.3916,x:64.05,y:46.45}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-120.4116,skewY:59.5884,x:55.75,y:127.15}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-96.3469,skewY:83.6531,x:64.55,y:134.5,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:77.9953,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.85,x:-42.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-13.3199,x:-115.1,y:32.3,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:169.5454,skewY:-10.4546,x:-193.95,y:52,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:169.5447,skewY:-10.4553,x:-202.45,y:55.15}},{t:this.instance,p:{regY:-0.2,rotation:-41.9678,x:-55.75,regX:38,y:-21.85,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-0.7318,skewY:179.2682,x:0.05,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9981,scaleY:0.9981,rotation:93.5812,x:64.1,y:46.45}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-120.2211,skewY:59.7789,x:55.55,y:127.1}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,skewX:-96.1557,skewY:83.8443,x:64.4,y:134.55,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:77.923,y:-26.35,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.85,x:-42.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-19.6701,x:-109.35,y:38,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:163.1945,skewY:-16.8055,x:-185.6,y:66.3,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:163.1949,skewY:-16.8051,x:-193.55,y:70.35}},{t:this.instance,p:{regY:-0.2,rotation:-47.7463,x:-55.75,regX:38,y:-21.8,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-0.5558,skewY:179.4442,x:-0.05,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.7725,x:64.25,y:46.4}},{t:this.instance_12,p:{regX:-6,regY:8,scaleX:0.9982,scaleY:0.9982,skewX:-120.0288,skewY:59.9712,x:55.45,y:126.95}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-95.9645,skewY:84.0355,x:64.05,y:134.45,regY:3.4}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:77.8512,y:-26.35,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.85,x:-42.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-26.0197,x:-103.05,y:43.05,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:156.8436,skewY:-23.1564,x:-175.75,y:79.55,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:156.8433,skewY:-23.1567,x:-183.15,y:84.55}},{t:this.instance,p:{regY:-0.3,rotation:-53.5241,x:-55.85,regX:38,y:-21.9,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-0.3808,skewY:179.6192,x:-0.05,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.9639,x:64.25,y:46.4}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-119.8386,skewY:60.1614,x:55.25,y:127.05}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-95.7734,skewY:84.2266,x:63.95,y:134.45,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:77.7802,y:-26.4,scaleX:0.9982,scaleY:0.9982,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.85,x:-42.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-32.3722,x:-96.3,y:47.5,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:150.4939,skewY:-29.5061,x:-164.45,y:91.85,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:150.4947,skewY:-29.5053,x:-171.3,y:97.6}},{t:this.instance,p:{regY:-0.3,rotation:-59.3023,x:-55.85,regX:38,y:-21.85,scaleX:0.998,scaleY:0.998}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-0.2066,skewY:179.7934,x:0,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.1553,x:64.35,y:46.4}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-119.6475,skewY:60.3525,x:55,y:126.95}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-95.5833,skewY:84.4167,x:63.85,y:134.4,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:77.7079,y:-26.35,scaleX:0.9982,scaleY:0.9982,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.1,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.85,x:-42.55}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-38.7211,x:-89.15,y:51.3,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:144.1418,skewY:-35.8582,x:-151.95,y:102.85,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:144.1427,skewY:-35.8573,x:-158.2,y:109.4}},{t:this.instance,p:{regY:-0.3,rotation:-65.0789,x:-55.75,regX:38.1,y:-22,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:-0.0315,skewY:179.9685,x:0,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.3468,x:64.55,y:46.4}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-119.4561,skewY:60.5439,x:54.8,y:126.9}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,skewX:-95.3915,skewY:84.6085,x:63.55,y:134.45,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:77.6368,y:-26.35,scaleX:0.9982,scaleY:0.9982,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.15,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.85,x:-42.55}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-45.0718,x:-81.55,y:54.2,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:137.7918,skewY:-42.2082,x:-138.35,y:112.45,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:137.7919,skewY:-42.2081,x:-143.75,y:119.6}},{t:this.instance,p:{regY:-0.3,rotation:-70.8573,x:-55.85,regX:38,y:-21.9,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:0.1383,skewY:-179.8617,x:-0.05,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.5374,x:64.55,y:46.35}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-119.2651,skewY:60.7349,x:54.65,y:126.9}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,skewX:-95.1997,skewY:84.8003,x:63.3,y:134.5,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:77.5653,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.15,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.85,x:-42.55}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-51.4234,x:-73.8,y:56.5,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:131.4415,skewY:-48.5585,x:-123.75,y:120.6,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:131.4406,skewY:-48.5594,x:-128.35,y:128.3}},{t:this.instance,p:{regY:-0.3,rotation:-76.6353,x:-55.9,regX:38,y:-21.85,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:0.3142,skewY:-179.6858,x:-0.05,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.7281,x:64.65,y:46.3}},{t:this.instance_12,p:{regX:-6.1,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-119.0742,skewY:60.9258,x:54.45,y:126.7}},{t:this.instance_11,p:{regX:-4.7,scaleX:0.9981,scaleY:0.9981,skewX:-95.0097,skewY:84.9903,x:63.2,y:134.45,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:77.495,y:-26.4,scaleX:0.9982,scaleY:0.9982,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.15,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.9,x:-42.55}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-57.7738,x:-65.85,y:57.85,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,skewX:125.0902,skewY:-54.9098,x:-108.35,y:127.1,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:125.0908,skewY:-54.9092,x:-112.15,y:135.3}},{t:this.instance,p:{regY:-0.3,rotation:-82.413,x:-55.9,regX:38,y:-21.85,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9989,skewX:0.4884,skewY:-179.5116,x:-0.05,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.918,x:64.8,y:46.3}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-118.8833,skewY:61.1167,x:54.3,y:126.75}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-94.8189,skewY:85.1811,x:62.95,y:134.35,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:77.4234,y:-26.4,scaleX:0.9983,scaleY:0.9983,x:47.65,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.15,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.55}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.9,x:-42.55}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-64.1244,x:-57.8,y:58.4,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,skewX:118.7411,skewY:-61.2589,x:-92.4,y:132.05,regY:-8.3}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9979,scaleY:0.9979,skewX:118.7404,skewY:-61.2596,x:-95.2,y:140.45}},{t:this.instance,p:{regY:-0.3,rotation:-88.19,x:-55.8,regX:38,y:-21.8,scaleX:0.9981,scaleY:0.9981}}]},1).to({state:[{t:this.instance_15,p:{regX:-1.7,scaleX:0.9989,scaleY:0.9989,rotation:-0.0009,y:-58,x:-6}},{t:this.instance_14,p:{scaleX:0.9988,scaleY:0.9988,skewX:0.6617,skewY:-179.3383,x:0.1,y:-76.8,regX:0.6,regY:52.8}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.1097,x:64.8,y:46.3}},{t:this.instance_12,p:{regX:-6,regY:7.9,scaleX:0.9982,scaleY:0.9982,skewX:-118.6931,skewY:61.3069,x:54.1,y:126.75}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9981,scaleY:0.9981,skewX:-94.6291,skewY:85.3709,x:62.7,y:134.3,regY:3.5}},{t:this.instance_10,p:{regY:-45.6,scaleX:0.9982,scaleY:0.9982,rotation:12.6031,x:-20.85,y:92.35}},{t:this.instance_9,p:{rotation:77.3518,y:-26.45,scaleX:0.9983,scaleY:0.9983,x:47.7,regX:-31.2}},{t:this.instance_8,p:{regY:2.2,scaleX:0.9977,scaleY:0.9977,rotation:-8.5925,x:8.15,y:96.1}},{t:this.instance_7,p:{regX:2.2,skewX:-2.7717,skewY:177.2283,x:25.15,y:192.15}},{t:this.instance_6,p:{x:-5.6}},{t:this.instance_5,p:{regY:-53.5,scaleX:0.9979,scaleY:0.9979,skewX:6.7818,skewY:-173.2182,y:187.9,x:-42.55}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-70.4742,x:-49.75,y:58.25,regX:40.4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,skewX:112.39,skewY:-67.61,x:-75.95,y:135.25,regY:-8.3}},{t:this.instance_1,p:{regX:6.1,scaleX:0.9979,scaleY:0.9979,skewX:112.3902,skewY:-67.6098,x:-77.8,y:144}},{t:this.instance,p:{regY:-0.3,rotation:-93.9634,x:-55.9,regX:38.1,y:-21.9,scaleX:0.9981,scaleY:0.9981}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-245.1,-210.7,323.3,517.7);


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
	this.instance = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance.setTransform(-57.35,-23.05,0.9985,0.9985,-71.6944,0,0,35.7,0.3);

	this.instance_1 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1.setTransform(-70.8,140.75,0.9982,0.9982,-99.6371,0,0,6.4,-1.3);

	this.instance_2 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2.setTransform(-72.45,132.1,0.9984,0.9984,-109.8922,0,0,5.4,-8.7);

	this.instance_3 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_3.setTransform(-82.15,51.55,0.9985,0.9985,-96.5461,0,0,40.3,-0.1);

	this.instance_4 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_4.setTransform(-0.45,-79.55,0.999,0.999,-2.0316,0,0,0.8,52.4);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_6.setTransform(-32.1,187.35,0.9978,0.9978,10.0466,0,0,2.7,-53.8);

	this.instance_7 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_7.setTransform(-4.85,-58.35,0.999,0.999,10.2018,0,0,-0.8,8.6);

	this.instance_8 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_9.setTransform(19.3,190.95,0.9975,0.9975,-6.5954,0,0,3.6,-53.2);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(11.15,95.05,0.9975,0.9975,-7.7716,0,0,-0.2,2);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(49,140.1,0.9983,0.9983,71.0416,0,0,-5.2,2.8);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(54.05,129.8,0.9985,0.9984,95.3227,0,0,-6.2,7.8);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(48.55,49.6,0.9984,0.9984,86.2346,0,0,-40.4,-1);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(45.5,-26.15,0.9985,0.9985,88.6155,0,0,-33.3,-0.1);

	this.instance_15 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_15.setTransform(-23.25,91.3,0.9978,0.9978,2.4663,0,0,2.4,-45.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{rotation:2.4663,x:-23.25,y:91.3}},{t:this.instance_14,p:{scaleX:0.9985,scaleY:0.9985,rotation:88.6155,x:45.5,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.2346,x:48.55,y:49.6,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9985,rotation:95.3227,x:54.05,y:129.8,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:71.0416,x:49,y:140.1,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-7.7716,x:11.15,y:95.05}},{t:this.instance_9,p:{scaleX:0.9975,scaleY:0.9975,rotation:-6.5954,y:190.95,x:19.3,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.6,rotation:10.2018,x:-4.85,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.7,scaleX:0.9978,scaleY:0.9978,rotation:10.0466,y:187.35,x:-32.1,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.0316,y:-79.55,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.4}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9985,scaleY:0.9985,rotation:-96.5461,x:-82.15,y:51.55,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-109.8922,x:-72.45,y:132.1,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-99.6371,x:-70.8,y:140.75,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.7,regY:0.3,scaleX:0.9985,scaleY:0.9985,rotation:-71.6944,x:-57.35,y:-23.05}}]}).to({state:[{t:this.instance_15,p:{rotation:2.4586,x:-23.2,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.6014,x:45.45,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:86.4063,x:48.45,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:95.4982,x:53.75,y:129.75,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.2252,x:48.75,y:140.05,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.7802,x:11.05,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.6057,y:190.85,x:19.3,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:10.1597,x:-4.8,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:10.034,y:187.3,x:-32.1,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.9284,y:-79.5,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-96.8323,x:-81.9,y:51.75,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.1719,x:-71.9,y:132.05,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-99.916,x:-70.25,y:140.7,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-71.7594,x:-57.25,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.4516,x:-23.2,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5856,x:45.5,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.5783,x:48.55,y:49.6,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:95.6725,x:53.55,y:129.8,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.4091,x:48.5,y:140.05,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.7898,x:11.05,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.617,y:190.9,x:19.35,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:10.1189,x:-4.8,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:10.0216,y:187.35,x:-32.05,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.8233,y:-79.55,scaleX:0.9989,scaleY:0.9989,x:-0.45,regY:52.4}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9984,scaleY:0.9984,rotation:-97.1181,x:-81.85,y:51.65,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.4509,x:-71.55,y:132.05,regY:-8.8,regX:5.4}},{t:this.instance_1,p:{rotation:-100.1918,x:-69.75,y:140.7,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-71.8251,x:-57.35,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.4445,x:-23.15,y:91.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5707,x:45.45,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.7503,x:48.5,y:49.6,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:95.8466,x:53.3,y:129.75,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.5919,x:48.2,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.7996,x:11.05,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.6287,y:190.9,x:19.25,regX:3.5}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:10.0763,x:-4.8,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:10.0106,y:187.35,x:-32,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.72,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.4,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-97.4049,x:-81.75,y:51.8,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.7308,x:-70.9,y:131.95,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-100.4705,x:-69.2,y:140.65,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-71.8913,x:-57.4,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.4376,x:-23.2,y:91.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5558,x:45.45,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.9213,x:48.55,y:49.6,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:96.0227,x:53.05,y:129.8,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.7764,x:48.1,y:140,regY:2.7}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.8103,x:11.1,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.6391,y:190.9,x:19.25,regX:3.5}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:10.0354,x:-4.8,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.9975,y:187.35,x:-32.05,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.6149,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.35,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9985,rotation:-97.691,x:-81.65,y:51.8,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.0099,x:-70.45,y:131.85,regY:-8.7,regX:5.5}},{t:this.instance_1,p:{rotation:-100.7455,x:-68.6,y:140.6,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-71.9572,x:-57.35,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.4306,x:-23.2,y:91.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5401,x:45.45,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.0932,x:48.55,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:96.1954,x:52.75,y:129.8,regY:7.9,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.9592,x:47.75,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.82,x:11.05,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.6499,y:190.9,x:19.35,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.9944,x:-4.75,y:-58.45,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.9848,y:187.35,x:-32,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.5107,y:-79.3,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.5}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9984,scaleY:0.9984,rotation:-97.9785,x:-81.6,y:51.75,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.2891,x:-69.95,y:131.95,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-101.0246,x:-68.05,y:140.7,regX:6.3,regY:-1.2}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-72.0228,x:-57.25,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.4235,x:-23.2,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5252,x:45.45,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.265,x:48.6,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9983,rotation:96.3717,x:52.65,y:129.8,regY:7.8,scaleY:0.9983}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.1431,x:47.45,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.8296,x:11,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.6613,y:190.9,x:19.35,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.952,x:-4.75,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.9726,y:187.35,x:-32,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.4065,y:-79.3,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-98.2641,x:-81.5,y:51.9,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.5697,x:-69.55,y:131.95,regY:-8.8,regX:5.4}},{t:this.instance_1,p:{rotation:-101.3007,x:-67.6,y:140.55,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-72.089,x:-57.25,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.4165,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5103,x:45.45,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.4368,x:48.65,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:96.5461,x:52.45,y:129.8,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.3262,x:47.25,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.8394,x:11.05,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.6728,y:190.9,x:19.4,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.9101,x:-4.8,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.9608,y:187.4,x:-31.95,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.3024,y:-79.3,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.5}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9984,scaleY:0.9984,rotation:-98.55,x:-81.45,y:51.8,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.8494,x:-68.95,y:131.9,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-101.5777,x:-66.9,y:140.5,regX:6.4,regY:-1.2}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.1535,x:-57.4,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.4104,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.4945,x:45.45,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.6086,x:48.6,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:96.7224,x:52.05,y:129.8,regY:7.9,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.5101,x:47,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.8501,x:11,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.6834,y:190.85,x:19.25,regX:3.5}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.8702,x:-4.8,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.9477,y:187.35,x:-32,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.1982,y:-79.3,scaleX:0.999,scaleY:0.999,x:-0.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-98.8361,x:-81.3,y:51.95,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.1292,x:-68.5,y:131.7,regY:-8.7,regX:5.5}},{t:this.instance_1,p:{rotation:-101.8551,x:-66.5,y:140.4,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.2197,x:-57.35,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.4033,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.4796,x:45.4,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.7813,x:48.7,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:96.8953,x:52,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.6935,x:46.7,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.8598,x:11,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.6957,y:190.85,x:19.25,regX:3.5}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.8285,x:-4.8,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.936,y:187.35,x:-31.95,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.094,y:-79.3,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.5}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9984,scaleY:0.9984,rotation:-99.1243,x:-81.25,y:51.85,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.408,x:-68.05,y:131.7,regY:-8.7,regX:5.5}},{t:this.instance_1,p:{rotation:-102.1317,x:-65.95,y:140.35,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-72.2867,x:-57.25,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3955,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.4647,x:45.4,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.9522,x:48.65,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9983,rotation:97.0709,x:51.6,y:129.8,regY:7.9,scaleY:0.9983}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.8771,x:46.5,y:139.95,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.8695,x:11.05,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.7072,y:190.85,x:19.4,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.7858,x:-4.8,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.9236,y:187.35,x:-31.95,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.9899,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9984,scaleY:0.9985,rotation:-99.4089,x:-81.2,y:51.8,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.6884,x:-67.5,y:131.75,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-102.4095,x:-65.35,y:140.3,regX:6.4,regY:-1.2}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-72.3512,x:-57.2,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3885,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.449,x:45.4,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:88.1239,x:48.75,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:97.2465,x:51.55,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.0602,x:46.25,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.8809,x:11,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.7178,y:190.85,x:19.4,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.7459,x:-4.75,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.9121,y:187.35,x:-31.9,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.884,y:-79.4,scaleX:0.9989,scaleY:0.9989,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-99.6968,x:-81.05,y:52,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.9678,x:-67,y:131.7,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-102.687,x:-64.9,y:140.25,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.4166,x:-57.4,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3823,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.4341,x:45.45,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:88.2965,x:48.7,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:97.4205,x:51.4,y:129.8,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.2448,x:45.9,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.8899,x:10.95,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.7291,y:190.85,x:19.45,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.7051,x:-4.75,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.8987,y:187.25,x:-31.9,regY:-53.9}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.7807,y:-79.4,scaleX:0.9989,scaleY:0.9989,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-99.9813,x:-80.95,y:52,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.2476,x:-66.6,y:131.65,regY:-8.8,regX:5.4}},{t:this.instance_1,p:{rotation:-102.9643,x:-64.3,y:140.15,regX:6.4,regY:-1.2}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.4834,x:-57.35,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3753,x:-23.2,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.4192,x:45.45,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.4673,x:48.75,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:97.5962,x:51.1,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.4285,x:45.65,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9975,scaleY:0.9975,rotation:-7.8994,x:11,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.7399,y:190.85,x:19.3,regX:3.5}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.6632,x:-4.8,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.8863,y:187.35,x:-31.95,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.6765,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-100.2685,x:-80.9,y:52.05,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.5264,x:-66,y:131.55,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-103.2413,x:-63.8,y:140.35,regX:6.3,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.5487,x:-57.35,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3683,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.4034,x:45.4,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.639,x:48.75,y:49.65,regX:-40.3}},{t:this.instance_12,p:{scaleX:0.9984,rotation:97.7711,x:50.95,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.6114,x:45.45,y:139.95,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.9102,x:10.95,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.7504,y:190.85,x:19.4,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.6216,x:-4.8,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.8739,y:187.3,x:-31.9,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5724,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-100.5545,x:-80.8,y:52.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.8061,x:-65.55,y:131.45,regY:-8.7,regX:5.5}},{t:this.instance_1,p:{rotation:-103.5188,x:-63.3,y:140.1,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-72.6149,x:-57.25,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3612,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.3885,x:45.4,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.8107,x:48.8,y:49.65,regX:-40.3}},{t:this.instance_12,p:{scaleX:0.9984,rotation:97.9453,x:50.65,y:129.8,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.7957,x:45.15,y:139.95,regY:2.8}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9974,scaleY:0.9974,rotation:-7.9199,x:10.95,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.762,y:190.85,x:19.5,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.5807,x:-4.8,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.8622,y:187.3,x:-31.9,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.4682,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-100.8413,x:-80.7,y:52.15,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.0864,x:-65.1,y:131.55,regY:-8.8,regX:5.4}},{t:this.instance_1,p:{rotation:-103.7962,x:-62.8,y:140.05,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.6808,x:-57.35,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3542,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.3736,x:45.4,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.9824,x:48.8,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:98.1203,x:50.45,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.9789,x:44.9,y:139.9,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-7.9297,x:11.15,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.7734,y:190.85,x:19.5,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.539,x:-4.85,y:-58.5,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.8497,y:187.3,x:-31.85,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.3632,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.1269,x:-80.65,y:52.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.3655,x:-64.5,y:131.5,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-104.0732,x:-62.25,y:139.95,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.747,x:-57.3,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3472,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.3579,x:45.45,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.1549,x:48.85,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:98.2954,x:50.2,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.1622,x:44.7,y:139.9,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-7.9393,x:11.1,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.7848,y:190.85,x:19.5,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.4964,x:-4.85,y:-58.45,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.8373,y:187.3,x:-31.9,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.2599,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.4135,x:-80.55,y:52.15,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.6452,x:-64.1,y:131.4,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-104.3509,x:-61.65,y:139.85,regX:6.4,regY:-1.2}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.8129,x:-57.35,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3393,x:-23.15,y:91.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.343,x:45.45,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.3275,x:48.85,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:98.4689,x:50,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.3468,x:44.45,y:139.9,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-7.9509,x:11.05,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.7955,y:190.85,x:19.4,regX:3.5}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.4554,x:-4.85,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.8248,y:187.35,x:-31.85,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.1558,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.6999,x:-80.45,y:52.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.9258,x:-63.6,y:131.35,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-104.6274,x:-61.25,y:139.85,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-72.8789,x:-57.3,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3323,x:-23.15,y:91.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.329,x:45.45,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.4982,x:48.85,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:98.6444,x:49.8,y:129.95,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:74.5298,x:44.15,y:139.9,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-7.9598,x:11.1,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.807,y:190.75,x:19.45,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.4147,x:-4.85,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.8125,y:187.3,x:-31.85,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.0516,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.9864,x:-80.4,y:52.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.2043,x:-63.1,y:131.25,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-104.9049,x:-60.75,y:139.85,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.9431,x:-57.3,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3253,x:-23.1,y:91.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.3132,x:45.4,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.6699,x:48.8,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:98.8189,x:49.55,y:129.9,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.7132,x:43.95,y:139.9,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-7.9695,x:11.1,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8183,y:190.75,x:19.45,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.3723,x:-4.85,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7999,y:187.3,x:-31.8,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.0481,y:-79.45,scaleX:0.9989,scaleY:0.9989,x:-0.55,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.2722,x:-80.3,y:52.25,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.4837,x:-62.6,y:131.2,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-105.1821,x:-60.15,y:139.8,regX:6.3,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-73.0099,x:-57.3,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3183,x:-23.1,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.2983,x:45.4,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.8424,x:48.85,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:98.9943,x:49.35,y:129.95,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.8971,x:43.65,y:139.95,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-7.9792,x:11.05,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8282,y:190.75,x:19.5,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.3314,x:-4.85,y:-58.3,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7875,y:187.3,x:-31.85,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.1523,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.55,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.5592,x:-80.2,y:52.25,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.7641,x:-62.1,y:131.15,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-105.459,x:-59.65,y:139.6,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-73.0741,x:-57.3,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3113,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.2834,x:45.35,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:90.0079,x:48.85,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:99.1691,x:49.1,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:75.0811,x:43.4,y:139.85,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-7.9898,x:11.1,y:95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8397,y:190.75,x:19.5,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.2905,x:-4.8,y:-58.3,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7759,y:187.3,x:-31.8,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.2564,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.8447,x:-80.1,y:52.25,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.0434,x:-61.6,y:131.1,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-105.7363,x:-59.15,y:139.5,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-73.142,x:-57.4,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.3043,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.2676,x:45.4,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:90.1804,x:48.9,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:99.343,x:48.9,y:129.9,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:75.2634,x:43.2,y:139.8,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-7.9997,x:11.1,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8511,y:190.8,x:19.35,regX:3.5}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.2479,x:-4.8,y:-58.3,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7636,y:187.3,x:-31.8,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.3606,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.55,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-103.1315,x:-80,y:52.3,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.3222,x:-61.2,y:130.9,regY:-8.7,regX:5.5}},{t:this.instance_1,p:{rotation:-106.0141,x:-58.6,y:139.4,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-73.2077,x:-57.25,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2972,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.2527,x:45.4,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:90.352,x:48.9,y:49.45,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:99.5189,x:48.5,y:129.9,regY:7.9,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:75.448,x:42.95,y:139.85,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0092,x:11,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8617,y:190.75,x:19.5,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.2064,x:-4.85,y:-58.3,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.752,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.4656,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.6,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-103.4176,x:-79.9,y:52.35,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.6026,x:-60.65,y:130.95,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-106.2904,x:-58.1,y:139.35,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-73.2733,x:-57.3,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.2378,x:45.4,y:-26.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:90.5246,x:48.9,y:49.45,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:99.6928,x:48.45,y:129.9,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:75.6307,x:42.65,y:139.75,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.05,y:94.9}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.8,x:19.5,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.1665,x:-4.85,y:-58.3,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.3,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.5698,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.55,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-103.7041,x:-79.85,y:52.35,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.8827,x:-60.3,y:130.9,regY:-8.8,regX:5.4}},{t:this.instance_1,p:{rotation:-106.5701,x:-57.55,y:139.25,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-73.3384,x:-57.3,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.2554,x:45.4,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:90.3984,x:48.95,y:49.45,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:99.5684,x:48.65,y:129.9,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:75.5058,x:42.85,y:139.8,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.05,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.5,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.2018,x:-4.85,y:-58.3,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.3,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.498,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-103.4707,x:-79.9,y:52.35,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.65,x:-60.55,y:131,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-106.3356,x:-57.95,y:139.3,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-73.2863,x:-57.25,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.2729,x:45.4,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:90.2732,x:48.9,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:99.4435,x:48.65,y:129.85,regY:7.9,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:75.3792,x:43.05,y:139.85,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.1,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.5,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.2374,x:-4.8,y:-58.3,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.3,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.4262,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.55,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-103.2381,x:-80,y:52.35,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.4151,x:-61.05,y:130.9,regY:-8.7,regX:5.5}},{t:this.instance_1,p:{rotation:-106.1034,x:-58.4,y:139.4,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-73.2315,x:-57.3,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.2913,x:45.4,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:90.148,x:48.85,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:99.3172,x:48.85,y:129.95,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:75.2551,x:43.2,y:139.85,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.1,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.5,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.2737,x:-4.75,y:-58.3,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.3,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.3545,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.55,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-103.0062,x:-80.05,y:52.3,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.184,x:-61.5,y:131.1,regY:-8.8,regX:5.4}},{t:this.instance_1,p:{rotation:-105.8702,x:-58.8,y:139.5,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-73.1775,x:-57.3,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.3088,x:45.4,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:90.0219,x:48.8,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:99.1912,x:49.05,y:129.9,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:75.1283,x:43.35,y:139.85,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.1,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.55,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.3092,x:-4.75,y:-58.3,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.3,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.2827,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.55,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.7719,x:-80.1,y:52.25,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.9509,x:-61.75,y:131.1,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-105.6375,x:-59.25,y:139.55,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-73.1243,x:-57.3,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.3272,x:45.45,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.9028,x:48.85,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:99.0663,x:49.2,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:75.0051,x:43.55,y:139.85,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.1,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.55,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.3456,x:-4.8,y:-58.3,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.3,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.2109,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.5403,x:-80.3,y:52.3,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.7191,x:-62.1,y:131.1,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-105.4046,x:-59.65,y:139.6,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-73.0703,x:-57.3,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.3438,x:45.45,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.7776,x:48.8,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:98.942,x:49.35,y:129.9,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.8788,x:43.7,y:139.9,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.1,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.55,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.3802,x:-4.85,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.3,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.1392,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.55,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.3072,x:-80.25,y:52.25,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.486,x:-62.55,y:131.2,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-105.1713,x:-60.1,y:139.8,regX:6.3,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-73.0154,x:-57.3,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.3623,x:45.45,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.6515,x:48.8,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9983,rotation:98.8155,x:49.55,y:129.9,regY:7.8,scaleY:0.9983}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.7537,x:43.9,y:139.9,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.1,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.55,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.4174,x:-4.85,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.3,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.0674,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-102.0752,x:-80.35,y:52.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.2522,x:-62.95,y:131.2,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-104.9391,x:-60.45,y:139.8,regX:6.3,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-72.9622,x:-57.25,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.3798,x:45.4,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.5262,x:48.8,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:98.6904,x:49.7,y:129.9,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.6277,x:44.05,y:139.9,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.1,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.55,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:9.453,x:-4.85,y:-58.35,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.3,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.0009,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.8425,x:-80.45,y:52.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.0206,x:-63.3,y:131.15,regY:-8.7,regX:5.5}},{t:this.instance_1,p:{rotation:-104.7062,x:-61,y:139.8,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.9082,x:-57.35,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.3982,x:45.4,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.401,x:48.8,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:98.5655,x:49.85,y:129.9,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.5024,x:44.25,y:139.9,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.1,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.55,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.4884,x:-4.8,y:-58.45,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.3,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.07,y:-79.45,scaleX:0.9989,scaleY:0.9989,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.6089,x:-80.5,y:52.2,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.7875,x:-63.75,y:131.35,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-104.4736,x:-61.45,y:139.8,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-72.8559,x:-57.2,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.4157,x:45.45,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.2758,x:48.75,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:98.4397,x:49.95,y:129.9,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.3779,x:44.4,y:139.95,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.15,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.6,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.5246,x:-4.8,y:-58.45,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.3,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.1418,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.3759,x:-80.65,y:52.2,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.5547,x:-64.15,y:131.4,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-104.2404,x:-61.8,y:139.9,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.803,x:-57.35,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.4341,x:45.45,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9983,rotation:89.1505,x:48.7,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:98.315,x:50.1,y:129.9,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.2525,x:44.6,y:139.95,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.15,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.6,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.5593,x:-4.8,y:-58.45,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.2135,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-101.1437,x:-80.6,y:52.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.3215,x:-64.5,y:131.45,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-104.0082,x:-62.3,y:139.95,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.7478,x:-57.3,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.4516,x:45.4,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.0244,x:48.65,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:98.1886,x:50.3,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.1267,x:44.75,y:139.95,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.15,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.6,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.5967,x:-4.8,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.2853,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-100.9108,x:-80.75,y:52.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.0891,x:-65,y:131.6,regY:-8.8,regX:5.4}},{t:this.instance_1,p:{rotation:-103.7747,x:-62.7,y:140,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.6938,x:-57.35,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.47,x:45.4,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.8992,x:48.65,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:98.0637,x:50.4,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:74.0008,x:44.9,y:139.95,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.15,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.6,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.6322,x:-4.8,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.3562,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.4,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-100.6783,x:-80.8,y:52.1,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.8562,x:-65.35,y:131.45,regY:-8.7,regX:5.5}},{t:this.instance_1,p:{rotation:-103.5428,x:-63.1,y:140.1,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.6404,x:-57.4,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.4875,x:45.4,y:-26.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.7739,x:48.65,y:49.65,regX:-40.3}},{t:this.instance_12,p:{scaleX:0.9984,rotation:97.9374,x:50.55,y:129.8,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.8767,x:45.1,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.15,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.6,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.6676,x:-4.8,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.428,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.5,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-100.4439,x:-80.95,y:52.15,regY:-0.2}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.6241,x:-65.7,y:131.55,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-103.3097,x:-63.5,y:140.15,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.5864,x:-57.3,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5059,x:45.45,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.6478,x:48.6,y:49.7,regX:-40.3}},{t:this.instance_12,p:{scaleX:0.9984,rotation:97.8136,x:50.75,y:129.9,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.7508,x:45.3,y:139.95,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.15,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.6,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.704,x:-4.75,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.4997,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-100.2124,x:-80.9,y:52.05,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.3907,x:-66.1,y:131.65,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-103.0769,x:-63.95,y:140.25,regX:6.3,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-72.5332,x:-57.25,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5235,x:45.45,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5225,x:48.55,y:49.65,regX:-40.3}},{t:this.instance_12,p:{scaleX:0.9984,rotation:97.6881,x:50.95,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.625,x:45.45,y:139.95,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.15,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.6,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.7387,x:-4.75,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5715,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-99.9784,x:-80.95,y:52,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.1585,x:-66.45,y:131.65,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-102.8451,x:-64.3,y:140.15,regX:6.4,regY:-1.2}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.48,x:-57.35,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5418,x:45.45,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.3973,x:48.55,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:97.5618,x:51.1,y:129.9,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.5008,x:45.65,y:139.95,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.15,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.65,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.7741,x:-4.75,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.6433,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-99.7466,x:-81.05,y:52,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.9247,x:-66.9,y:131.75,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-102.6105,x:-64.8,y:140.25,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.426,x:-57.35,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5593,x:45.45,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.2728,x:48.55,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:97.4372,x:51.25,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.3756,x:45.8,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.2,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.65,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.8107,x:-4.85,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.715,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.4}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9984,scaleY:0.9984,rotation:-99.5146,x:-81.2,y:51.85,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.6928,x:-67.3,y:131.75,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-102.378,x:-65.2,y:140.3,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-72.3723,x:-57.25,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5769,x:45.45,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.1467,x:48.5,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:97.3127,x:51.4,y:129.8,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.2495,x:45.95,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.2,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.65,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.8452,x:-4.85,y:-58.45,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.7868,y:-79.4,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-99.2805,x:-81.15,y:51.95,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.4599,x:-67.75,y:131.7,regY:-8.7,regX:5.5}},{t:this.instance_1,p:{rotation:-102.1453,x:-65.7,y:140.35,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.3183,x:-57.35,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5953,x:45.5,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.0214,x:48.5,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:97.1865,x:51.45,y:129.85,regY:7.9,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:73.1232,x:46.2,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.2,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.65,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.8817,x:-4.85,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.8586,y:-79.4,scaleX:0.9989,scaleY:0.9989,x:-0.45,regY:52.4}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9984,scaleY:0.9984,rotation:-99.048,x:-81.3,y:51.85,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.2265,x:-68.15,y:131.8,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-101.913,x:-66.05,y:140.4,regX:6.4,regY:-1.2}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.2648,x:-57.3,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.6136,x:45.45,y:-26.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.896,x:48.45,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:97.0611,x:51.5,y:129.8,regY:7.9,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.9993,x:46.4,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.2,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.65,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.9181,x:-4.8,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.9295,y:-79.4,scaleX:0.9989,scaleY:0.9989,x:-0.45,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-98.8148,x:-81.35,y:51.95,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.9944,x:-68.5,y:131.8,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-101.6796,x:-66.6,y:140.45,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.2114,x:-57.35,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.6312,x:45.4,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.7717,x:48.45,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:96.9358,x:51.75,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.8741,x:46.5,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.2,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.65,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.9528,x:-4.75,y:-58.45,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.0013,y:-79.3,scaleX:0.9989,scaleY:0.9989,x:-0.4,regY:52.5}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9985,scaleY:0.9985,rotation:-98.5836,x:-81.4,y:51.8,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-111.7608,x:-68.9,y:131.9,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-101.4482,x:-66.9,y:140.5,regX:6.4,regY:-1.2}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.1574,x:-57.4,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.6487,x:45.4,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.6454,x:48.45,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:96.8106,x:51.95,y:129.8,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.7478,x:46.7,y:140.05,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.2,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.7,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.4,rotation:9.9901,x:-4.75,y:-58.45,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.073,y:-79.3,scaleX:0.999,scaleY:0.999,x:-0.35,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-98.3509,x:-81.5,y:51.9,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.5284,x:-69.4,y:131.9,regY:-8.8,regX:5.4}},{t:this.instance_1,p:{rotation:-101.2139,x:-67.4,y:140.55,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-72.1028,x:-57.25,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.6662,x:45.45,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.5201,x:48.4,y:49.5,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:96.6845,x:51.95,y:129.85,regY:7.9,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.6231,x:46.95,y:140.1,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.2,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.7,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:10.0256,x:-4.85,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.1448,y:-79.3,scaleX:0.999,scaleY:0.999,x:-0.4,regY:52.5}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9984,scaleY:0.9984,rotation:-98.1172,x:-81.6,y:51.75,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.2952,x:-69.7,y:131.95,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-100.9827,x:-67.75,y:140.65,regX:6.3,regY:-1.2}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-72.0494,x:-57.35,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.15,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.6837,x:45.45,y:-26.1}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.3956,x:48.35,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:96.5593,x:52.2,y:129.8,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.4973,x:47.05,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.2,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.7,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:10.0603,x:-4.85,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.2166,y:-79.3,scaleX:0.999,scaleY:0.999,x:-0.45,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-97.8856,x:-81.6,y:51.85,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.0626,x:-70.1,y:131.85,regY:-8.7,regX:5.5}},{t:this.instance_1,p:{rotation:-100.7493,x:-68.25,y:140.55,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-71.9951,x:-57.35,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.2,y:91.25}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.7021,x:45.45,y:-26.1}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:87.2694,x:48.4,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:96.4351,x:52.4,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.373,x:47.35,y:139.95,regY:2.7}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.25,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.7,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:10.0974,x:-4.85,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.2884,y:-79.3,scaleX:0.999,scaleY:0.999,x:-0.35,regY:52.5}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9984,scaleY:0.9984,rotation:-97.6522,x:-81.7,y:51.7,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.8303,x:-70.45,y:131.95,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-100.5177,x:-68.7,y:140.6,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-71.9419,x:-57.25,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.2,y:91.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.7196,x:45.45,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.144,x:48.35,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:96.3091,x:52.55,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.247,x:47.45,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.25,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.7,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:10.1321,x:-4.8,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.3593,y:-79.3,scaleX:0.999,scaleY:0.999,x:-0.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-97.4191,x:-81.75,y:51.8,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.5969,x:-70.95,y:132,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-100.2835,x:-69.25,y:140.7,regX:6.4,regY:-1.4}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-71.8877,x:-57.4,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.2,y:91.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.738,x:45.45,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.0195,x:48.3,y:49.55,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:96.1848,x:52.55,y:129.75,regY:7.9,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:72.122,x:47.55,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.25,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.7,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:10.1686,x:-4.8,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.4311,y:-79.3,scaleX:0.999,scaleY:0.999,x:-0.4,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-97.187,x:-81.8,y:51.8,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.365,x:-71.35,y:131.95,regY:-8.7,regX:5.5}},{t:this.instance_1,p:{rotation:-100.0511,x:-69.65,y:140.7,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-71.8342,x:-57.25,y:-22.9}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.2,y:91.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.7555,x:45.5,y:-26.1}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.8932,x:48.25,y:49.7,regX:-40.3}},{t:this.instance_12,p:{scaleX:0.9984,rotation:96.0589,x:52.85,y:129.85,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.9957,x:47.75,y:140.05,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.25,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.7,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:10.2032,x:-4.8,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.5029,y:-79.3,scaleX:0.999,scaleY:0.999,x:-0.35,regY:52.5}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9984,scaleY:0.9984,rotation:-96.9531,x:-81.9,y:51.65,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.1314,x:-71.75,y:132.1,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-99.819,x:-70.2,y:140.75,regX:6.4,regY:-1.4}},{t:this.instance,p:{regX:35.6,regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-71.7816,x:-57.25,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.2,y:91.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.7739,x:45.5,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.7687,x:48.35,y:49.6,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:95.9338,x:53,y:129.75,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.8705,x:48.1,y:140,regY:2.7}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.25,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.75,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:10.2389,x:-4.8,y:-58.35,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.5746,y:-79.35,scaleX:0.999,scaleY:0.999,x:-0.3,regY:52.5}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-96.7202,x:-81.95,y:51.75,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.8979,x:-72.15,y:132.05,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-99.5854,x:-70.5,y:140.65,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-71.7273,x:-57.35,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.2,y:91.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.7915,x:45.5,y:-26.15}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.6433,x:48.3,y:49.6,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:95.8079,x:53.15,y:129.8,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.7459,x:48.05,y:140.05,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.25,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.75,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:10.2753,x:-4.75,y:-58.4,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.6456,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.4,regY:52.4}},{t:this.instance_3,p:{regX:40.3,scaleX:0.9984,scaleY:0.9984,rotation:-96.4893,x:-82.1,y:51.55,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.6677,x:-72.6,y:131.9,regY:-8.7,regX:5.5}},{t:this.instance_1,p:{rotation:-99.3533,x:-71.1,y:140.8,regX:6.4,regY:-1.4}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-71.6758,x:-57.4,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:2.2902,x:-23.2,y:91.3}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.8098,x:45.45,y:-26.05}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:86.5187,x:48.3,y:49.6,regX:-40.4}},{t:this.instance_12,p:{scaleX:0.9984,rotation:95.6813,x:53.3,y:129.8,regY:7.8,scaleY:0.9984}},{t:this.instance_11,p:{scaleX:0.9982,scaleY:0.9982,rotation:71.6196,x:48.25,y:140,regY:2.8}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9974,scaleY:0.9974,rotation:-8.0208,x:11.25,y:94.95}},{t:this.instance_9,p:{scaleX:0.9974,scaleY:0.9974,rotation:-6.8741,y:190.75,x:19.75,regX:3.6}},{t:this.instance_8},{t:this.instance_7,p:{regY:8.5,rotation:10.311,x:-4.75,y:-58.4,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{regX:2.6,scaleX:0.9977,scaleY:0.9977,rotation:9.7385,y:187.35,x:-31.75,regY:-53.8}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.7182,y:-79.45,scaleX:0.999,scaleY:0.999,x:-0.35,regY:52.4}},{t:this.instance_3,p:{regX:40.2,scaleX:0.9984,scaleY:0.9984,rotation:-96.2567,x:-82.15,y:51.6,regY:-0.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.4344,x:-72.95,y:132.05,regY:-8.7,regX:5.4}},{t:this.instance_1,p:{rotation:-99.1202,x:-71.4,y:140.75,regX:6.4,regY:-1.3}},{t:this.instance,p:{regX:35.6,regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-71.621,x:-57.35,y:-23}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93.2,-201.9,172.10000000000002,506.1);


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
	this.instance.setTransform(-57.1,-23.1,0.9985,0.9985,-63.3484,0,0,35.7,0.4);

	this.instance_1 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1.setTransform(-90.3,133.9,0.9983,0.9983,-85.3198,0,0,6.5,-1.2);

	this.instance_2 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2.setTransform(-84.1,127.8,0.9984,0.9984,-52.9888,0,0,5.3,-8.6);

	this.instance_3 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_3.setTransform(-92.6,47.05,0.9984,0.9984,-95.6183,0,0,40.4,0);

	this.instance_4 = new lib.ch1_headcopy("synched",0);
	this.instance_4.setTransform(0.1,-79.4,0.999,0.999,-1.0791,0,0,1,52.5);

	this.instance_5 = new lib.ch1_uBodycopy("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_6.setTransform(-27.3,187.3,0.9979,0.9979,3.7883,0,0,2.6,-54.5);

	this.instance_7 = new lib.ch1_neckcopy("synched",0);
	this.instance_7.setTransform(-4.9,-58.3,0.999,0.999,10.7216,0,0,-0.9,8.7);

	this.instance_8 = new lib.ch1_lBodycopy("synched",0);
	this.instance_8.setTransform(-5.55,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_9.setTransform(23.7,185.9,0.9975,0.9975,6.8914,0,0,4.1,-53.5);

	this.instance_10 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_10.setTransform(21.75,90.1,0.9976,0.9976,-3.5893,0,0,-0.3,2.2);

	this.instance_11 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_11.setTransform(69.3,135.9,0.9984,0.9984,90.3082,0,0,-4.6,3.1);

	this.instance_12 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_12.setTransform(76,127,0.9984,0.9984,110.0082,0,0,-6.1,8.2);

	this.instance_13 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_13.setTransform(60.25,48.1,0.9985,0.9985,78.6197,0,0,-40.5,-0.8);

	this.instance_14 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_14.setTransform(45.25,-25.9,0.9984,0.9984,79.4568,0,0,-33.2,-0.1);

	this.instance_15 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_15.setTransform(-22.9,91,0.998,0.998,0.2926,0,0,1.8,-45.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{scaleX:0.998,scaleY:0.998,rotation:0.2926,x:-22.9,y:91}},{t:this.instance_14,p:{rotation:79.4568,x:45.25,y:-25.9,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9985,scaleY:0.9985,rotation:78.6197,x:60.25,y:48.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:110.0082,x:76,y:127,regX:-6.1}},{t:this.instance_11,p:{regX:-4.6,regY:3.1,rotation:90.3082,x:69.3,y:135.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.3,scaleX:0.9976,scaleY:0.9976,rotation:-3.5893,x:21.75,y:90.1}},{t:this.instance_9,p:{rotation:6.8914,x:23.7,y:185.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.7216,x:-4.9,y:-58.3,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7883,x:-27.3,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,rotation:-1.0791,x:0.1,y:-79.4,scaleX:0.999,scaleY:0.999,regY:52.5}},{t:this.instance_3,p:{rotation:-95.6183,x:-92.6,y:47.05,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9984,scaleY:0.9984,rotation:-52.9888,x:-84.1,y:127.8,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,rotation:-85.3198,x:-90.3,y:133.9,regX:6.5}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-63.3484,x:-57.1,y:-23.1,regY:0.4,regX:35.7}}]}).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.4703,x:45.15,y:-25.9,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,scaleX:0.9984,scaleY:0.9984,rotation:78.4259,x:60.3,y:48.15}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.8122,x:76.25,y:126.85,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:90.1121,x:69.7,y:135.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.6165,x:-4.95,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.975,x:0.15,y:-79.35,scaleX:0.999,scaleY:0.999,regY:52.5}},{t:this.instance_3,p:{rotation:-95.5544,x:-92.35,y:47.1,regY:0}},{t:this.instance_2,p:{regY:-8.5,scaleX:0.9983,scaleY:0.9983,rotation:-52.9259,x:-83.85,y:127.95,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-85.2572,x:-90.2,y:133.9,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-63.5419,x:-57.05,y:-23.15,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.4827,x:45.15,y:-25.95,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:78.231,x:60.25,y:47.95}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:109.6167,x:76.55,y:126.7,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:89.9212,x:70,y:135.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.5114,x:-5,y:-58.3,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.8717,x:0.2,y:-79.35,scaleX:0.9989,scaleY:0.9989,regY:52.5}},{t:this.instance_3,p:{rotation:-95.4901,x:-92.1,y:47.2,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.8626,x:-83.85,y:128,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-85.194,x:-90.05,y:134,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-63.7365,x:-57.2,y:-23.2,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.4952,x:45.15,y:-25.95,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,scaleX:0.9984,scaleY:0.9984,rotation:78.0351,x:60.25,y:48.15}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:109.4217,x:76.75,y:126.75,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:89.7268,x:70.3,y:135.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.4081,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.7676,x:0.15,y:-79.5,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.4268,x:-91.85,y:47.35,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.7994,x:-83.7,y:128.15,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-85.1297,x:-89.9,y:134.15,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-63.9315,x:-57.15,y:-23.15,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.5086,x:45.15,y:-25.95,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:77.8408,x:60.25,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:109.2259,x:76.95,y:126.65,regX:-6.1}},{t:this.instance_11,p:{regX:-4.6,regY:3,rotation:89.5297,x:70.55,y:135.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.3022,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.6625,x:0.1,y:-79.5,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.3636,x:-91.6,y:47.45,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.7351,x:-83.55,y:128.3,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-85.0665,x:-89.75,y:134.25,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.1266,x:-57.1,y:-23.2,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.521,x:45.3,y:-25.85,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:77.6445,x:60.2,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:109.0312,x:77.25,y:126.6,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:89.3353,x:70.85,y:135.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.198,x:-5.05,y:-58.3,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.5584,x:0,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.2994,x:-91.35,y:47.65,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.6719,x:-83.4,y:128.4,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-85.0048,x:-89.65,y:134.35,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.3208,x:-57.05,y:-23.2,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.5354,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,scaleX:0.9984,scaleY:0.9984,rotation:77.4491,x:60.2,y:48.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.8357,x:77.5,y:126.5,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:89.14,x:71.15,y:135.65,scaleX:0.9984,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.0941,x:-4.85,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.4542,x:-0.05,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.236,x:-91.25,y:47.75,regY:-0.1}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.6083,x:-83.2,y:128.55,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.9398,x:-89.5,y:134.5,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.5159,x:-57.05,y:-23.2,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.5469,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:77.2543,x:60.2,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.6407,x:77.75,y:126.6,regX:-6}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:88.9438,x:71.4,y:135.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:9.9892,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.3501,x:-0.05,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.1719,x:-90.9,y:47.85,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.5458,x:-83.05,y:128.65,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.8765,x:-89.25,y:134.6,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.7098,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.5601,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:77.0591,x:60.15,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.4449,x:78.05,y:126.35,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:88.7485,x:71.7,y:135.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.8846,x:-5.05,y:-58.3,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.2459,x:-0.05,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.1085,x:-90.65,y:48,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.482,x:-82.9,y:128.75,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.8131,x:-89.1,y:134.7,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.9052,x:-57.2,y:-23.25,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.5728,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:76.8632,x:60.15,y:47.95}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.2491,x:78.3,y:126.35,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:88.554,x:72,y:135.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.7797,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.1427,x:-0.05,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.0443,x:-90.4,y:48.05,regY:0}},{t:this.instance_2,p:{regY:-8.5,scaleX:0.9983,scaleY:0.9983,rotation:-52.419,x:-82.6,y:128.9,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.7497,x:-88.95,y:134.85,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.1003,x:-57.2,y:-23.25,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.5869,x:45.25,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:76.6691,x:60.15,y:47.95}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.0531,x:78.55,y:126.25,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3.1,rotation:88.3587,x:72.1,y:135.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.675,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.0385,x:-0.15,y:-79.55,scaleX:0.9989,scaleY:0.9989,regY:52.4}},{t:this.instance_3,p:{rotation:-94.9818,x:-90.2,y:48.15,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.3552,x:-82.55,y:129,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.6865,x:-88.8,y:134.95,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.2954,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.5984,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:76.4737,x:60.1,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:107.8595,x:78.75,y:126.25,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:88.1624,x:72.55,y:135.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.5702,x:-5,y:-58.25,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.0604,x:-0.15,y:-79.55,scaleX:0.9989,scaleY:0.9989,regY:52.4}},{t:this.instance_3,p:{rotation:-94.9186,x:-89.95,y:48.3,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.2909,x:-82.4,y:129.05,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.6223,x:-88.7,y:135.05,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.489,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.6111,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:76.2774,x:60.05,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:107.664,x:79.05,y:126.15,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:87.9679,x:72.8,y:135.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.4672,x:-4.9,y:-58.35,regX:-0.9,regY:8.6}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.1645,x:-0.2,y:-79.6,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.8545,x:-89.65,y:48.4,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.2286,x:-82.25,y:129.2,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.5598,x:-88.6,y:135.15,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.6838,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.6243,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:76.0833,x:60.05,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:107.4682,x:79.3,y:126.1,regX:-6.1}},{t:this.instance_11,p:{regX:-4.6,regY:3.1,rotation:87.7725,x:72.95,y:135.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.3626,x:-4.85,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.2687,x:-0.2,y:-79.6,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.7904,x:-89.4,y:48.5,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.1641,x:-82.1,y:129.3,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.4965,x:-88.45,y:135.25,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.8793,x:-57.2,y:-23.3,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.6376,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:75.8877,x:60.05,y:48}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:107.274,x:79.55,y:126.05,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:87.5761,x:73.4,y:135.35,scaleX:0.9984,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.2579,x:-4.9,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.3737,x:-0.3,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.7271,x:-89.15,y:48.6,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.1005,x:-81.95,y:129.5,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.434,x:-88.25,y:135.4,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.0726,x:-57.2,y:-23.3,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2917,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.6501,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:75.6917,x:59.95,y:47.95}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:107.0785,x:79.7,y:126.05,regX:-6}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:87.3807,x:73.6,y:135.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.891,x:23.65,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.1533,x:-4.95,y:-58.3,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.4779,x:-0.35,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.6639,x:-88.95,y:48.7,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.0364,x:-81.85,y:129.65,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.3689,x:-88.1,y:135.5,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.2679,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2909,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.6625,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:75.4974,x:59.9,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.8826,x:80.05,y:125.8,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:87.186,x:73.9,y:135.25,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8901,x:23.7,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.0478,x:-4.85,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.582,x:-0.35,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.5997,x:-88.7,y:48.85,regY:0}},{t:this.instance_2,p:{regY:-8.5,scaleX:0.9983,scaleY:0.9983,rotation:-51.9726,x:-81.6,y:129.75,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.3055,x:-87.95,y:135.6,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.4628,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2909,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.6759,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:75.3018,x:59.95,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.6876,x:80.25,y:125.8,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:86.9905,x:74.2,y:135.25,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8901,x:23.7,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.9433,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.6861,x:-0.4,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.5364,x:-88.45,y:48.95,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.9109,x:-81.5,y:129.85,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.2423,x:-87.8,y:135.7,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.6577,x:-57.2,y:-23.25,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2909,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.6893,x:45.3,y:-25.85,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:75.1053,x:59.95,y:47.95}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:106.4922,x:80.55,y:125.8,regX:-6.1}},{t:this.instance_11,p:{regX:-4.6,regY:3,rotation:86.7949,x:74.5,y:135.05,scaleX:0.9984,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8901,x:23.7,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.8387,x:-5,y:-58.25,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.7903,x:-0.35,y:-79.6,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.4722,x:-88.2,y:49.05,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.8468,x:-81.4,y:130,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.1795,x:-87.7,y:135.8,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.8522,x:-57.15,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2909,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.7008,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:74.9112,x:59.85,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.2969,x:80.7,y:125.7,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:86.6002,x:74.75,y:135.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8901,x:23.7,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.7343,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.8936,x:-0.45,y:-79.6,scaleX:0.9989,scaleY:0.9989,regY:52.4}},{t:this.instance_3,p:{rotation:-94.4099,x:-87.95,y:49.15,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.7831,x:-81.2,y:130.05,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.1154,x:-87.5,y:135.9,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.0472,x:-57.1,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2909,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.7142,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:74.7162,x:59.9,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.1009,x:81,y:125.65,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3.1,rotation:86.4037,x:74.9,y:135.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8901,x:23.7,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:8.6297,x:-4.85,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.9977,x:-0.45,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.3458,x:-87.7,y:49.25,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.72,x:-81,y:130.15,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.0518,x:-87.35,y:136.1,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.2419,x:-57.1,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2909,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.7276,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:74.5209,x:59.9,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:105.9058,x:81.2,y:125.6,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:86.2089,x:75.3,y:135.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8901,x:23.7,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.5262,x:-5,y:-58.3,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.1019,x:-0.5,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.2826,x:-87.5,y:49.35,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.6559,x:-80.85,y:130.25,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.9886,x:-87.2,y:136.15,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.4346,x:-57.1,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2909,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.7401,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:74.3255,x:59.85,y:48}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:105.7101,x:81.45,y:125.6,regX:-6}},{t:this.instance_11,p:{regX:-4.6,regY:3,rotation:86.0132,x:75.6,y:134.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8901,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:8.4199,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.2061,x:-0.55,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.2184,x:-87.2,y:49.5,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.5935,x:-80.7,y:130.35,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.9251,x:-87,y:136.15,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.6306,x:-57.15,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2909,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.7525,x:45.15,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:74.1298,x:59.8,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:105.5155,x:81.75,y:125.45,regX:-6.1}},{t:this.instance_11,p:{regX:-4.6,regY:3.1,rotation:85.8182,x:75.7,y:134.85,scaleX:0.9984,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5886,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8901,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.3156,x:-4.85,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.3094,x:-0.6,y:-79.6,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.1553,x:-86.9,y:49.55,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.5299,x:-80.5,y:130.45,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.8618,x:-86.85,y:136.25,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.8249,x:-57.15,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2909,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.7657,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:73.9349,x:59.85,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:105.3202,x:81.9,y:125.45,regX:-6}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:85.6233,x:76.1,y:134.95,scaleX:0.9984,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8901,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.2122,x:-5,y:-58.25,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.4127,x:-0.65,y:-79.45,scaleX:0.999,scaleY:0.999,regY:52.5}},{t:this.instance_3,p:{rotation:-94.0912,x:-86.6,y:49.65,regY:0.1}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.4663,x:-80.35,y:130.6,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.7983,x:-86.7,y:136.45,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.0189,x:-57.1,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2909,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.7783,x:45.3,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{regX:-40.4,scaleX:0.9984,scaleY:0.9984,rotation:73.7398,x:59.8,y:48.15}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:105.1244,x:82.2,y:125.2,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:85.4274,x:76.4,y:134.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8901,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.107,x:-4.85,y:-58.35,regX:-0.9,regY:8.6}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.5169,x:-0.65,y:-79.45,scaleX:0.999,scaleY:0.999,regY:52.5}},{t:this.instance_3,p:{rotation:-94.028,x:-86.45,y:49.75,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.4021,x:-80.2,y:130.7,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.7349,x:-86.55,y:136.45,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.215,x:-57.05,y:-23.3,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.29,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.7916,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:73.5447,x:59.8,y:47.95}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:104.9292,x:82.45,y:125.2,regX:-6.1}},{t:this.instance_11,p:{regX:-4.6,regY:3.1,rotation:85.2314,x:76.55,y:134.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8901,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.0026,x:-4.9,y:-58.4,regX:-0.9,regY:8.6}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.6211,x:-0.7,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.9638,x:-86.2,y:49.85,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.3391,x:-80,y:130.75,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.6723,x:-86.4,y:136.55,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.41,x:-57.15,y:-23.2,regY:0.3,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.29,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.804,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:73.3491,x:59.75,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:104.7346,x:82.75,y:125,regX:-6.2}},{t:this.instance_11,p:{regX:-4.6,regY:3,rotation:85.0372,x:76.9,y:134.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8901,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.8965,x:-4.85,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.7252,x:-0.75,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.8998,x:-85.95,y:49.9,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.2758,x:-79.85,y:130.85,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.6071,x:-86.3,y:136.65,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.6032,x:-57.1,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.29,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.8166,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:73.1536,x:59.75,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:104.5379,x:82.95,y:125.05,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:84.8412,x:77.25,y:134.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8901,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.7932,x:-4.9,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.8286,x:-0.8,y:-79.65,scaleX:0.9989,scaleY:0.9989,regY:52.4}},{t:this.instance_3,p:{rotation:-93.8375,x:-85.7,y:50,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.2129,x:-79.75,y:131,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.5445,x:-86.1,y:136.75,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.7981,x:-57.1,y:-23.3,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.29,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.8298,x:45.2,y:-25.95,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:72.9583,x:59.7,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:104.3436,x:83.2,y:124.95,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:84.645,x:77.55,y:134.7,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.6881,x:-4.9,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.9328,x:-0.75,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.7734,x:-85.5,y:50.1,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.1493,x:-79.6,y:131.15,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.481,x:-85.95,y:136.85,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.9933,x:-57.1,y:-23.2,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.29,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.8423,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:72.7633,x:59.65,y:48.05}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:104.1486,x:83.45,y:124.95,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3.1,rotation:84.4506,x:77.7,y:134.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:7.5839,x:-4.85,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.0369,x:-0.8,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.7094,x:-85.2,y:50.2,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.0857,x:-79.45,y:131.25,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.4184,x:-85.8,y:136.95,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.1868,x:-57.1,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.29,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.855,x:45.1,y:-25.95,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:72.5678,x:59.7,y:47.95}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:103.9524,x:83.65,y:124.95,regX:-6}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:84.2552,x:78.05,y:134.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:7.4797,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.1412,x:-0.85,y:-79.6,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.6462,x:-84.95,y:50.3,regY:0}},{t:this.instance_2,p:{regY:-8.5,scaleX:0.9983,scaleY:0.9983,rotation:-51.0222,x:-79.1,y:131.4,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.3541,x:-85.65,y:137.05,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.3825,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.29,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.8672,x:45.2,y:-26,regX:-33.2,regY:-0.2}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:72.3731,x:59.7,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:103.7578,x:83.95,y:124.8,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:84.0588,x:78.35,y:134.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:7.3746,x:-4.85,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.2454,x:-0.95,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.5831,x:-84.65,y:50.4,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.9587,x:-79,y:131.45,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.2905,x:-85.5,y:137.1,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.577,x:-57.05,y:-23.35,regY:0.4,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.29,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.8815,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9985,rotation:72.1776,x:59.6,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:103.5622,x:84.1,y:124.8,regX:-6}},{t:this.instance_11,p:{regX:-4.5,regY:3.1,rotation:83.8643,x:78.5,y:134.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.2706,x:-4.9,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.3497,x:-1.05,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.519,x:-84.45,y:50.45,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.8951,x:-78.8,y:131.45,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.2271,x:-85.35,y:137.2,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.772,x:-57.1,y:-23.3,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.29,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.8932,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:71.9818,x:59.65,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:103.3668,x:84.5,y:124.5,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3.1,rotation:83.6688,x:78.8,y:134.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.1665,x:-4.95,y:-58.2,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.4538,x:-1.05,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.4549,x:-84.2,y:50.55,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.831,x:-78.7,y:131.65,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.1635,x:-85.2,y:137.3,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.9671,x:-56.95,y:-23.4,regY:0.4,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.29,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.9064,x:45.15,y:-25.95,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:71.7871,x:59.6,y:48}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:103.1709,x:84.65,y:124.5,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:83.4748,x:79.1,y:134.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.0615,x:-4.85,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.5581,x:-1.1,y:-79.6,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.3917,x:-83.95,y:50.65,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.7688,x:-78.55,y:131.7,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.1009,x:-85,y:137.4,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.1618,x:-56.95,y:-23.35,regY:0.4,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2891,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.9189,x:45.1,y:-25.95,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:71.5914,x:59.6,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:102.9764,x:84.85,y:124.4,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:83.2782,x:79.4,y:134.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:6.9574,x:-4.9,y:-58.15,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.6615,x:-1.15,y:-79.65,scaleX:0.9989,scaleY:0.9989,regY:52.4}},{t:this.instance_3,p:{rotation:-93.3285,x:-83.75,y:50.75,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.7041,x:-78.4,y:131.8,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.0365,x:-84.85,y:137.5,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.3551,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2891,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.9323,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:71.3967,x:59.55,y:48.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:102.7809,x:85.1,y:124.3,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:83.0825,x:79.7,y:134.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:6.8525,x:-4.85,y:-58.15,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.7649,x:-1.25,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.2654,x:-83.5,y:50.85,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.6418,x:-78.25,y:131.9,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-82.9737,x:-84.7,y:137.55,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.5501,x:-57.05,y:-23.3,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2891,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.9447,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:71.2015,x:59.55,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:102.5857,x:85.4,y:124.2,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:82.8875,x:80,y:134.05,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.7,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:6.7485,x:-4.85,y:-58.15,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.8691,x:-1.25,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.2014,x:-83.15,y:50.95,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.5771,x:-78.1,y:132,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-82.9112,x:-84.55,y:137.65,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.7459,x:-57,y:-23.3,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2891,x:-22.8,y:90.9}},{t:this.instance_14,p:{rotation:79.9571,x:45.25,y:-26.05,regX:-33.2,regY:-0.2}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:71.0063,x:59.55,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:102.3902,x:85.6,y:124.15,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:82.6924,x:80.25,y:134.05,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5878,x:21.75,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.7,y:185.75,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:6.6437,x:-4.85,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7877,x:-27.2,y:187.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.9735,x:-1.2,y:-79.7,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.1374,x:-82.9,y:51,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.5149,x:-77.95,y:132.1,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-82.8466,x:-84.4,y:137.75,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.9398,x:-57,y:-23.4,regY:0.4,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.2944,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.951,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:71.1774,x:59.55,y:48.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:102.5642,x:85.4,y:124.2,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:82.8716,x:80.05,y:134,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5843,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.6,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:6.7344,x:-4.8,y:-58.15,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7912,x:-27.3,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.8858,x:-1.2,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.1917,x:-83.15,y:51,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.5728,x:-78.05,y:132,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-82.9016,x:-84.45,y:137.65,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.7833,x:-57,y:-23.3,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3005,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.9438,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:71.3482,x:59.55,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:102.7393,x:85.15,y:124.3,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:83.0499,x:79.8,y:134.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5808,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.6,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:6.8243,x:-5,y:-58.15,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.7955,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.7982,x:-1.15,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.2461,x:-83.35,y:50.95,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.632,x:-78.15,y:131.9,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-82.9543,x:-84.65,y:137.6,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.6282,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3066,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.9384,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:71.5205,x:59.55,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:102.9126,x:85,y:124.25,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:83.2289,x:79.55,y:134.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5781,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8892,x:23.6,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:6.9151,x:-4.9,y:-58.15,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.7999,x:-27.25,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.7106,x:-1.1,y:-79.65,scaleX:0.9989,scaleY:0.9989,regY:52.4}},{t:this.instance_3,p:{rotation:-93.3005,x:-83.55,y:50.8,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.6911,x:-78.3,y:131.85,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.0091,x:-84.7,y:137.55,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.4712,x:-56.95,y:-23.4,regY:0.4,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3128,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.9313,x:45.1,y:-25.95,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:71.6927,x:59.6,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:103.087,x:84.75,y:124.45,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:83.4079,x:79.3,y:134.25,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.5745,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8876,x:23.6,y:185.8,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.0042,x:-4.9,y:-58.15,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.8052,x:-27.3,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.6229,x:-1.1,y:-79.6,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.354,x:-83.7,y:50.75,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.75,x:-78.4,y:131.75,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.0602,x:-84.85,y:137.45,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.3158,x:-57,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.318,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.9242,x:45.1,y:-25.95,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:71.8641,x:59.55,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:103.2614,x:84.5,y:124.45,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:83.5867,x:79,y:134.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.571,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8876,x:23.6,y:185.8,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.0941,x:-4.85,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.8095,x:-27.3,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.5354,x:-1.05,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.4084,x:-83.95,y:50.7,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.8092,x:-78.5,y:131.7,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.1158,x:-84.95,y:137.4,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.1587,x:-56.95,y:-23.4,regY:0.4,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3242,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.9172,x:45.1,y:-25.95,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:72.0355,x:59.6,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:103.4352,x:84.3,y:124.7,regX:-6}},{t:this.instance_11,p:{regX:-4.5,regY:3.1,rotation:83.7656,x:78.6,y:134.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.5684,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8876,x:23.6,y:185.8,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.1849,x:-5,y:-58.2,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.814,x:-27.35,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.4477,x:-1.05,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.4618,x:-84.15,y:50.65,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.8678,x:-78.6,y:131.55,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.1687,x:-85.15,y:137.3,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-70.0034,x:-57,y:-23.4,regY:0.4,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3303,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.9109,x:45.1,y:-25.95,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:72.2067,x:59.6,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:103.6091,x:84.1,y:124.7,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3.1,rotation:83.9454,x:78.45,y:134.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.5649,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8867,x:23.6,y:185.8,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.2749,x:-4.9,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.8193,x:-27.35,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.3601,x:-1,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.5163,x:-84.3,y:50.5,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.9263,x:-78.75,y:131.55,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.2234,x:-85.25,y:137.25,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.8468,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3364,x:-22.9,y:90.95}},{t:this.instance_14,p:{rotation:79.9037,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:72.3778,x:59.65,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:103.785,x:83.9,y:124.75,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:84.1232,x:78.3,y:134.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5614,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8866,x:23.6,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.3649,x:-4.85,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.8237,x:-27.3,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.2717,x:-0.9,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.5707,x:-84.6,y:50.5,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-50.9861,x:-79,y:131.55,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.2764,x:-85.35,y:137.2,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.6909,x:-57.1,y:-23.35,regY:0.4,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3426,x:-22.9,y:90.95}},{t:this.instance_14,p:{rotation:79.8966,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:72.5495,x:59.6,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:103.9579,x:83.65,y:124.95,regX:-6}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:84.3036,x:78,y:134.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5588,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8857,x:23.6,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:7.4558,x:-4.85,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.8289,x:-27.3,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.1841,x:-0.9,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.6251,x:-84.75,y:50.4,regY:0}},{t:this.instance_2,p:{regY:-8.5,scaleX:0.9983,scaleY:0.9983,rotation:-51.0459,x:-78.95,y:131.45,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.331,x:-85.5,y:137.1,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.5337,x:-57,y:-23.4,regY:0.4,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3487,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.8904,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:72.722,x:59.65,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:104.1329,x:83.4,y:124.9,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3.1,rotation:84.4814,x:77.6,y:134.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5553,x:21.75,y:90.05}},{t:this.instance_9,p:{rotation:6.8857,x:23.6,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:7.5459,x:-4.85,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.8333,x:-27.35,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.0965,x:-0.8,y:-79.6,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.6796,x:-84.95,y:50.3,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.1032,x:-79.25,y:131.35,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.384,x:-85.55,y:137.05,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.3786,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3548,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.8832,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:72.8935,x:59.65,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:104.3064,x:83.2,y:125.1,regX:-6}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:84.66,x:77.55,y:134.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5518,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8857,x:23.6,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.6369,x:-4.85,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.8386,x:-27.4,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:2.009,x:-0.8,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.7331,x:-85.15,y:50.2,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.1629,x:-79.4,y:131.3,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.4386,x:-85.75,y:136.95,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.2214,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.361,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.877,x:45.2,y:-26.05,regX:-33.2,regY:-0.2}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:73.0655,x:59.6,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:104.481,x:82.95,y:125.05,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:84.8394,x:77.3,y:134.7,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.55,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8849,x:23.6,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.727,x:-4.85,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.843,x:-27.35,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.9205,x:-0.75,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.7875,x:-85.35,y:50.15,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.2222,x:-79.45,y:131.15,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.4915,x:-85.8,y:136.9,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-69.0665,x:-57.05,y:-23.35,regY:0.4,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3662,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.8701,x:45.2,y:-26,regX:-33.2,regY:-0.2}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:73.2367,x:59.65,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:104.6556,x:82.75,y:125.1,regX:-6.1}},{t:this.instance_11,p:{regX:-4.6,regY:3,rotation:85.0187,x:77,y:134.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5465,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8849,x:23.6,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.8171,x:-5,y:-58.25,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.8474,x:-27.4,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.8329,x:-0.7,y:-79.65,scaleX:0.9989,scaleY:0.9989,regY:52.4}},{t:this.instance_3,p:{rotation:-93.8419,x:-85.6,y:50.1,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.2812,x:-79.5,y:131,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.5453,x:-85.95,y:136.8,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.909,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3723,x:-22.85,y:90.95}},{t:this.instance_14,p:{rotation:79.8636,x:45.2,y:-26,regX:-33.2,regY:-0.2}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:73.4082,x:59.7,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:104.8295,x:82.5,y:125.15,regX:-6.1}},{t:this.instance_11,p:{regX:-4.6,regY:3.1,rotation:85.198,x:76.65,y:134.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.543,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8849,x:23.6,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.9063,x:-4.9,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.8526,x:-27.4,y:187.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.7463,x:-0.7,y:-79.65,scaleX:0.9989,scaleY:0.9989,regY:52.4}},{t:this.instance_3,p:{rotation:-93.8963,x:-85.75,y:49.95,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.3398,x:-79.65,y:130.9,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.5982,x:-86.1,y:136.75,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.7533,x:-57.1,y:-23.2,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3785,x:-22.9,y:90.95}},{t:this.instance_14,p:{rotation:79.8566,x:45.1,y:-25.95,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:73.5802,x:59.7,y:47.95}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:105.0044,x:82.35,y:125.3,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:85.3764,x:76.55,y:134.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5404,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.884,x:23.55,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:7.9973,x:-4.9,y:-58.4,regX:-0.9,regY:8.6}},{t:this.instance_6,p:{rotation:3.857,x:-27.4,y:187.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.6578,x:-0.7,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-93.9499,x:-85.9,y:49.9,regY:0.1}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.3978,x:-79.75,y:130.85,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.652,x:-86.2,y:136.65,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.5963,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3846,x:-22.9,y:90.95}},{t:this.instance_14,p:{rotation:79.8495,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,scaleX:0.9984,scaleY:0.9984,rotation:73.7507,x:59.7,y:48.2}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:105.1777,x:82.15,y:125.2,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:85.5556,x:76.25,y:134.9,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5369,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.884,x:23.55,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.0876,x:-4.9,y:-58.35,regX:-0.9,regY:8.6}},{t:this.instance_6,p:{rotation:3.8622,x:-27.5,y:187.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.5702,x:-0.7,y:-79.45,scaleX:0.999,scaleY:0.999,regY:52.5}},{t:this.instance_3,p:{rotation:-94.0034,x:-86.15,y:49.85,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.4575,x:-79.9,y:130.8,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.7065,x:-86.35,y:136.6,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.441,x:-57.1,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3907,x:-22.9,y:90.95}},{t:this.instance_14,p:{rotation:79.8432,x:45.15,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:73.923,x:59.7,y:48.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:105.3527,x:81.9,y:125.45,regX:-6}},{t:this.instance_11,p:{regX:-4.6,regY:3,rotation:85.7339,x:76.05,y:134.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.5333,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.884,x:23.55,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.1776,x:-5,y:-58.25,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.8667,x:-27.45,y:187.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.4827,x:-0.65,y:-79.45,scaleX:0.999,scaleY:0.999,regY:52.5}},{t:this.instance_3,p:{rotation:-94.0579,x:-86.35,y:49.7,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.5169,x:-80.05,y:130.7,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.7612,x:-86.4,y:136.6,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.2838,x:-57.1,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.3969,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.8363,x:45.2,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:74.0943,x:59.7,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:105.5265,x:81.65,y:125.5,regX:-6.1}},{t:this.instance_11,p:{regX:-4.6,regY:3,rotation:85.9139,x:75.75,y:134.8,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5307,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.883,x:23.55,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.2679,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.8711,x:-27.45,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.3943,x:-0.65,y:-79.5,scaleX:0.999,scaleY:0.999,regY:52.5}},{t:this.instance_3,p:{rotation:-94.1123,x:-86.6,y:49.65,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.5754,x:-80.2,y:130.6,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.8141,x:-86.55,y:136.45,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.129,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.403,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.8318,x:45.2,y:-26,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,scaleX:0.9984,scaleY:0.9984,rotation:74.2659,x:59.75,y:48.2}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:105.7001,x:81.35,y:125.6,regX:-6}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:86.0921,x:75.5,y:134.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5272,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.883,x:23.55,y:185.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.3581,x:-4.85,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.8764,x:-27.45,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.3068,x:-0.6,y:-79.6,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.1667,x:-86.8,y:49.6,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.6352,x:-80.3,y:130.55,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.8678,x:-86.7,y:136.35,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.9722,x:-57.15,y:-23.3,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4091,x:-22.85,y:90.9}},{t:this.instance_14,p:{rotation:79.8236,x:45.2,y:-25.95,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:74.4372,x:59.7,y:48.05}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:105.8759,x:81.2,y:125.6,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:86.2712,x:75.3,y:135,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5237,x:21.75,y:90}},{t:this.instance_9,p:{rotation:6.883,x:23.55,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.4483,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.8807,x:-27.45,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.2201,x:-0.55,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.2211,x:-86.95,y:49.55,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.6937,x:-80.45,y:130.5,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.9215,x:-86.75,y:136.25,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.8155,x:-57.15,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4144,x:-22.85,y:90.9}},{t:this.instance_14,p:{rotation:79.8176,x:45.2,y:-25.9,regX:-33.2,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:74.6091,x:59.7,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.0494,x:81.05,y:125.65,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3.1,rotation:86.4502,x:74.9,y:135.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.5211,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8821,x:23.55,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.5394,x:-4.95,y:-58.3,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.886,x:-27.5,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.1317,x:-0.55,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.2746,x:-87.15,y:49.45,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.7513,x:-80.5,y:130.3,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-83.9752,x:-86.9,y:136.2,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.6592,x:-57.1,y:-23.1,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4205,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.8104,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:74.7807,x:59.75,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.2237,x:80.8,y:125.7,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:86.63,x:74.85,y:135.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.5175,x:21.8,y:90}},{t:this.instance_9,p:{rotation:6.8821,x:23.55,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.6288,x:-4.85,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.8904,x:-27.45,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:1.0441,x:-0.5,y:-79.65,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.3291,x:-87.35,y:49.35,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.8111,x:-80.7,y:130.3,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.029,x:-87,y:136.25,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.5037,x:-57.05,y:-23.3,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4258,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.804,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:74.9522,x:59.75,y:48.05}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:106.3983,x:80.55,y:125.75,regX:-6.1}},{t:this.instance_11,p:{regX:-4.6,regY:3,rotation:86.8072,x:74.5,y:135.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.514,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8813,x:23.55,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.7183,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.8948,x:-27.5,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.9566,x:-0.45,y:-79.6,scaleX:0.9989,scaleY:0.9989,regY:52.4}},{t:this.instance_3,p:{rotation:-94.3835,x:-87.65,y:49.3,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.8705,x:-80.9,y:130.25,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.0818,x:-87.2,y:136.1,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.3475,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4319,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.797,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:75.1234,x:59.75,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.5723,x:80.35,y:125.7,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:86.987,x:74.3,y:135.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.5113,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8813,x:23.55,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.8095,x:-4.95,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.9,x:-27.5,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.87,x:-0.45,y:-79.6,scaleX:0.9989,scaleY:0.9989,regY:52.4}},{t:this.instance_3,p:{rotation:-94.4371,x:-87.75,y:49.25,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-51.9302,x:-80.95,y:130.1,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.1364,x:-87.25,y:136,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.1917,x:-57.15,y:-23.2,regY:0.3,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.438,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.7906,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:75.2956,x:59.8,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.7469,x:80.1,y:125.85,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:87.1659,x:74.05,y:135.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.5078,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8813,x:23.55,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.8999,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.9045,x:-27.5,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.7816,x:-0.35,y:-79.6,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.4907,x:-87.95,y:49.1,regY:0}},{t:this.instance_2,p:{regY:-8.5,scaleX:0.9983,scaleY:0.9983,rotation:-51.9882,x:-81,y:130.1,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.1901,x:-87.35,y:135.9,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.0359,x:-57.15,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4442,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.7846,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:75.4674,x:59.8,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:106.9211,x:79.9,y:125.85,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:87.3448,x:73.85,y:135.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.5043,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8805,x:23.55,y:185.85,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:8.9894,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.9097,x:-27.6,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.694,x:-0.35,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.5451,x:-88.15,y:49.05,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.0469,x:-81.2,y:129.95,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.2438,x:-87.5,y:135.85,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.8789,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4503,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.7765,x:45.3,y:-25.9,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:75.6384,x:59.75,y:48.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:107.094,x:79.65,y:126,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:87.5236,x:73.5,y:135.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.5017,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8805,x:23.55,y:185.85,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.0815,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.9141,x:-27.55,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.6065,x:-0.3,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.5997,x:-88.35,y:49,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.1068,x:-81.35,y:129.85,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.2984,x:-87.6,y:135.75,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.7231,x:-57.05,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4556,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.7702,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:75.8102,x:59.8,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:107.269,x:79.45,y:126.05,regX:-6.1}},{t:this.instance_11,p:{regX:-4.6,regY:3,rotation:87.7033,x:73.3,y:135.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.4982,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8805,x:23.55,y:185.85,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:9.1701,x:-5.05,y:-58.25,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.9185,x:-27.55,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.5181,x:-0.25,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.6533,x:-88.6,y:48.85,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.1655,x:-81.4,y:129.7,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.3512,x:-87.75,y:135.65,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.5671,x:-57.2,y:-23.15,regY:0.3,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4617,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.7623,x:45.25,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:75.9822,x:59.8,y:48}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:107.4438,x:79.25,y:126.15,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:87.8812,x:73.05,y:135.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.4947,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8796,x:23.55,y:185.85,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:9.2596,x:-4.85,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.9238,x:-27.6,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.4306,x:-0.25,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.7078,x:-88.75,y:48.75,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.2242,x:-81.5,y:129.6,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.4058,x:-87.85,y:135.6,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.4106,x:-57.15,y:-23.1,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4678,x:-22.95,y:90.9}},{t:this.instance_14,p:{rotation:79.757,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:76.1528,x:59.85,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:107.618,x:79,y:126.15,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:88.0608,x:72.8,y:135.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.4921,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8796,x:23.5,y:185.85,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.3511,x:-4.85,y:-58.2,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.9273,x:-27.6,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.3431,x:-0.2,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.7623,x:-88.95,y:48.7,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.2827,x:-81.7,y:129.55,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.4586,x:-87.9,y:135.5,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.2545,x:-57.15,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.474,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.7499,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:76.325,x:59.9,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:107.7925,x:78.75,y:126.2,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:88.2395,x:72.55,y:135.45,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.4885,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8795,x:23.5,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.4415,x:-4.85,y:-58.35,regX:-0.9,regY:8.6}},{t:this.instance_6,p:{rotation:3.9326,x:-27.6,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.2538,x:-0.2,y:-79.6,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.8167,x:-89.2,y:48.55,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.3421,x:-81.8,y:129.45,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.5123,x:-88.1,y:135.4,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.0977,x:-57.1,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4801,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.7436,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:76.4962,x:59.95,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:107.9661,x:78.55,y:126.15,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3.1,rotation:88.4182,x:72.2,y:135.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.485,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8787,x:23.55,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.532,x:-5,y:-58.25,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.9378,x:-27.6,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.1663,x:-0.15,y:-79.6,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.8703,x:-89.3,y:48.5,regY:0}},{t:this.instance_2,p:{regY:-8.5,scaleX:0.9983,scaleY:0.9983,rotation:-52.4009,x:-81.8,y:129.4,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.5668,x:-88.2,y:135.3,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.9421,x:-57.05,y:-23.2,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4862,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.7374,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:76.6682,x:59.95,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.1403,x:78.3,y:126.35,regX:-6.1}},{t:this.instance_11,p:{regX:-4.6,regY:3,rotation:88.5979,x:72.1,y:135.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.4825,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8787,x:23.55,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.6207,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.9422,x:-27.6,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:0.0788,x:-0.1,y:-79.55,scaleX:0.9989,scaleY:0.9989,regY:52.4}},{t:this.instance_3,p:{rotation:-94.9249,x:-89.55,y:48.45,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.4607,x:-82.05,y:129.25,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.6196,x:-88.35,y:135.25,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.7849,x:-57.2,y:-23.15,regY:0.3,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4924,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.7293,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:76.8383,x:59.9,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.3148,x:78.1,y:126.35,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:88.7765,x:71.75,y:135.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.4789,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8787,x:23.55,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.7114,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.9465,x:-27.6,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.0044,x:-0.1,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-94.9793,x:-89.75,y:48.35,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.52,x:-82.2,y:129.2,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.6732,x:-88.45,y:135.15,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.6289,x:-57.15,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.4976,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.7231,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:77.0117,x:59.9,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.4892,x:77.9,y:126.35,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:88.9552,x:71.5,y:135.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.4754,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8778,x:23.55,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.801,x:-4.95,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.951,x:-27.65,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.0919,x:-0.05,y:-79.55,scaleX:0.9989,scaleY:0.9989,regY:52.4}},{t:this.instance_3,p:{rotation:-95.0321,x:-89.95,y:48.2,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.5787,x:-82.3,y:129.1,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.7278,x:-88.5,y:135.05,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.4737,x:-57.1,y:-23.25,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.5038,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.7159,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:77.1833,x:59.95,y:48}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.6631,x:77.6,y:126.55,regX:-6}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:89.1356,x:71.35,y:135.7,scaleX:0.9984,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.4727,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8778,x:23.55,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.8925,x:-5.05,y:-58.3,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.9563,x:-27.7,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.1785,x:-0.05,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.0866,x:-90.15,y:48.2,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.6376,x:-82.4,y:129,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.7815,x:-88.65,y:134.95,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.3178,x:-57.05,y:-23.2,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.5099,x:-22.95,y:90.9}},{t:this.instance_14,p:{rotation:79.7097,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,scaleX:0.9984,scaleY:0.9984,rotation:77.3539,x:59.95,y:48.15}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:108.8376,x:77.35,y:126.55,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:89.3134,x:71,y:135.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.4692,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8778,x:23.55,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:9.9822,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.9606,x:-27.65,y:187.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.2669,x:0,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.141,x:-90.3,y:48.15,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.695,x:-82.6,y:128.95,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.8359,x:-88.7,y:134.9,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.1611,x:-57.2,y:-23.2,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.516,x:-22.95,y:90.9}},{t:this.instance_14,p:{rotation:79.7028,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:77.5262,x:59.95,y:48}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.0121,x:77.15,y:126.65,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:89.4921,x:70.75,y:135.75,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.4657,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8769,x:23.5,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.0728,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.966,x:-27.7,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.3545,x:0,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.1947,x:-90.5,y:48,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.7544,x:-82.75,y:128.85,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.8888,x:-88.85,y:134.8,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.0047,x:-57.1,y:-23.2,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.5222,x:-22.95,y:90.9}},{t:this.instance_14,p:{rotation:79.6963,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,scaleX:0.9984,scaleY:0.9984,rotation:77.6974,x:60.05,y:48.15}},{t:this.instance_12,p:{scaleX:0.9983,scaleY:0.9983,rotation:109.1863,x:76.9,y:126.65,regX:-6.1}},{t:this.instance_11,p:{regX:-4.6,regY:3.1,rotation:89.6716,x:70.45,y:135.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.4631,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8769,x:23.5,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1635,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.9703,x:-27.7,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.4428,x:0.05,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.2492,x:-90.8,y:47.95,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.8145,x:-82.8,y:128.7,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.9424,x:-89.05,y:134.7,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.8484,x:-57.1,y:-23.2,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.5283,x:-22.95,y:90.9}},{t:this.instance_14,p:{rotation:79.6901,x:45.35,y:-25.85,regX:-33.1,regY:-0.2}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:77.8695,x:59.95,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:109.3605,x:76.75,y:126.75,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:89.8502,x:70.35,y:135.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.4596,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8759,x:23.5,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.2533,x:-5,y:-58.3,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.9747,x:-27.7,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.5304,x:0.1,y:-79.55,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.3037,x:-90.95,y:47.85,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-52.8725,x:-82.9,y:128.6,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-84.9969,x:-89.1,y:134.6,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.6914,x:-57.05,y:-23.2,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.5344,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.6832,x:45.25,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.4,scaleX:0.9984,scaleY:0.9984,rotation:78.0406,x:60,y:48.2}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:109.535,x:76.55,y:126.65,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:90.0245,x:70,y:135.8,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.4561,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8759,x:23.5,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.3432,x:-4.85,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.98,x:-27.75,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.6179,x:0.1,y:-79.5,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.3573,x:-91.1,y:47.7,regY:0}},{t:this.instance_2,p:{regY:-8.5,scaleX:0.9983,scaleY:0.9983,rotation:-52.932,x:-82.9,y:128.6,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-85.0496,x:-89.25,y:134.5,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.5362,x:-57.25,y:-23.2,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.5406,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.6759,x:45.25,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:78.2123,x:60,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:109.7078,x:76.3,y:126.8,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:90.204,x:69.75,y:135.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.4535,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8759,x:23.5,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.4339,x:-4.85,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.9844,x:-27.7,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.7063,x:0.15,y:-79.5,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.4119,x:-91.35,y:47.6,regY:0}},{t:this.instance_2,p:{regY:-8.5,scaleX:0.9983,scaleY:0.9983,rotation:-52.9895,x:-83.1,y:128.5,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-85.1033,x:-89.35,y:134.4,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.3792,x:-57.2,y:-23.2,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.5458,x:-22.9,y:90.9}},{t:this.instance_14,p:{rotation:79.6697,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:78.384,x:60.05,y:48.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:109.8817,x:76.05,y:126.8,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:90.3818,x:69.55,y:135.9,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.4499,x:21.8,y:90.05}},{t:this.instance_9,p:{rotation:6.8751,x:23.5,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.5238,x:-5,y:-58.3,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:3.9896,x:-27.7,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.7947,x:0.2,y:-79.5,scaleX:0.999,scaleY:0.999,regY:52.4}},{t:this.instance_3,p:{rotation:-95.4665,x:-91.5,y:47.55,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-53.0495,x:-83.2,y:128.25,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-85.1578,x:-89.4,y:134.35,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.2237,x:-57.1,y:-23.2,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.552,x:-22.95,y:90.9}},{t:this.instance_14,p:{rotation:79.6625,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:78.5554,x:60.05,y:48.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:110.0568,x:75.75,y:127.05,regX:-6}},{t:this.instance_11,p:{regX:-4.6,regY:3,rotation:90.5605,x:69.2,y:135.85,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.4464,x:21.8,y:90.1}},{t:this.instance_9,p:{rotation:6.8751,x:23.45,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.6137,x:-4.95,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.9949,x:-27.7,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.8813,x:0.2,y:-79.35,scaleX:0.9989,scaleY:0.9989,regY:52.5}},{t:this.instance_3,p:{rotation:-95.5202,x:-91.7,y:47.4,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-53.1079,x:-83.35,y:128.2,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-85.2105,x:-89.55,y:134.25,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.0678,x:-57.05,y:-23.2,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.5581,x:-22.95,y:90.9}},{t:this.instance_14,p:{rotation:79.6554,x:45.2,y:-25.85,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:78.726,x:60,y:48.15}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:110.231,x:75.55,y:127,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:90.74,x:68.95,y:135.95,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.4438,x:21.8,y:90.1}},{t:this.instance_9,p:{rotation:6.8751,x:23.45,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.7045,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:3.9993,x:-27.75,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-0.9689,x:0.25,y:-79.35,scaleX:0.9989,scaleY:0.9989,regY:52.5}},{t:this.instance_3,p:{rotation:-95.5739,x:-91.85,y:47.3,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-53.1671,x:-83.55,y:128.2,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-85.265,x:-89.65,y:134.15,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-63.9119,x:-57.2,y:-23.15,regY:0.3,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.5651,x:-22.95,y:90.9}},{t:this.instance_14,p:{rotation:79.6494,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:78.8982,x:60,y:48.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:110.4051,x:75.35,y:127.05,regX:-6.1}},{t:this.instance_11,p:{regX:-4.5,regY:3.1,rotation:90.9187,x:68.6,y:136,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9975,scaleY:0.9975,rotation:-3.4403,x:21.8,y:90.15}},{t:this.instance_9,p:{rotation:6.8742,x:23.45,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.55}},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.7936,x:-4.9,y:-58.25,regX:-0.9,regY:8.7}},{t:this.instance_6,p:{rotation:4.0045,x:-27.8,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-1.0564,x:0.25,y:-79.35,scaleX:0.999,scaleY:0.999,regY:52.5}},{t:this.instance_3,p:{rotation:-95.6276,x:-92.05,y:47.25,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-53.2266,x:-83.6,y:128,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-85.3195,x:-89.75,y:134.05,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-63.7549,x:-57.1,y:-23.1,regY:0.4,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9979,scaleY:0.9979,rotation:0.5712,x:-22.95,y:90.9}},{t:this.instance_14,p:{rotation:79.6429,x:45.2,y:-25.8,regX:-33.1,regY:-0.1}},{t:this.instance_13,p:{regX:-40.5,scaleX:0.9984,scaleY:0.9984,rotation:79.0687,x:60.05,y:48.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:110.5791,x:75.15,y:126.9,regX:-6.2}},{t:this.instance_11,p:{regX:-4.5,regY:3,rotation:91.0973,x:68.5,y:136.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_10,p:{regX:-0.2,scaleX:0.9976,scaleY:0.9976,rotation:-3.4368,x:21.8,y:90.15}},{t:this.instance_9,p:{rotation:6.8742,x:23.45,y:185.85,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8,p:{x:-5.6}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.8844,x:-5,y:-58.35,regX:-1,regY:8.7}},{t:this.instance_6,p:{rotation:4.0089,x:-27.75,y:187.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-1.1431,x:0.25,y:-79.35,scaleX:0.999,scaleY:0.999,regY:52.5}},{t:this.instance_3,p:{rotation:-95.6812,x:-92.3,y:47.1,regY:0}},{t:this.instance_2,p:{regY:-8.6,scaleX:0.9983,scaleY:0.9983,rotation:-53.2848,x:-83.75,y:127.9,regX:5.3}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-85.3714,x:-89.95,y:133.95,regX:6.5}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-63.5986,x:-57.1,y:-23.1,regY:0.4,regX:35.7}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-102.2,-205.2,206.60000000000002,507.9);


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
	this.instance = new lib.ch1_uArm_rcopy2_2("synched",0);
	this.instance.setTransform(-57.35,-23.6,0.9983,0.9983,-76.526,0,0,36.3,0.1);

	this.instance_1 = new lib.ch1_hand_rcopy2_2("synched",0);
	this.instance_1.setTransform(-36.75,134.6,0.998,0.998,-133.0205,0,0,6.2,-1.7);

	this.instance_2 = new lib.ch1_thumb_rcopy2_2("synched",0);
	this.instance_2.setTransform(-37,125.55,0.9982,0.9982,-100.5486,0,0,5.2,-8.8);

	this.instance_3 = new lib.ch1_lArm_rcopy2_2("synched",0);
	this.instance_3.setTransform(-74.1,54.3,0.9982,0.9982,-118.3186,0,0,39.7,1);

	this.instance_4 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_4.setTransform(0.65,-78.7,0.9989,0.9989,-3.639,0,0,1.1,53.1);

	this.instance_5 = new lib.ch1_uBodycopy2_2("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2_2("synched",0);
	this.instance_6.setTransform(-33.05,188.2,0.9981,0.9981,12.7199,0,0,3,-54);

	this.instance_7 = new lib.ch1_neckcopy2_2("synched",0);
	this.instance_7.setTransform(-4.95,-58.2,0.9989,0.9989,12.1069,0,0,-1.1,8.8);

	this.instance_8 = new lib.ch1_lBodycopy2_2("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_2("synched",0);
	this.instance_9.setTransform(22.3,189.3,0.9977,0.9977,1.4469,0,0,3.9,-53.6);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_2("synched",0);
	this.instance_10.setTransform(14.25,93.95,0.9977,0.9977,-7.0388,0,0,-0.9,2.2);

	this.instance_11 = new lib.ch1_hand_lcopy2_2("synched",0);
	this.instance_11.setTransform(52.8,138.7,0.9981,0.9981,55.7913,0,0,-4.8,3.1);

	this.instance_12 = new lib.ch1_thumb_lcopy2_2("synched",0);
	this.instance_12.setTransform(55,127.85,0.9982,0.9982,82.1213,0,0,-6.2,7.9);

	this.instance_13 = new lib.ch1_lArm_lcopy2_2("synched",0);
	this.instance_13.setTransform(37.8,49.85,0.9983,0.9983,77.733,0,0,-39.8,-1);

	this.instance_14 = new lib.ch1_uArm_lcopy2_2("synched",0);
	this.instance_14.setTransform(45.25,-26.35,0.9983,0.9983,96.2762,0,0,-33.4,-0.4);

	this.instance_15 = new lib.ch1_uLeg_rcopy2_2("synched",0);
	this.instance_15.setTransform(-20.55,91.25,0.9983,0.9983,5.2453,0,0,2.1,-46.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2453,x:-20.55,y:91.25,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.2762,x:45.25,y:-26.35,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:77.733,x:37.8,y:49.85,regY:-1}},{t:this.instance_12,p:{regY:7.9,scaleX:0.9982,scaleY:0.9982,rotation:82.1213,x:55,y:127.85}},{t:this.instance_11,p:{rotation:55.7913,x:52.8,scaleX:0.9981,scaleY:0.9981,y:138.7,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9977,scaleY:0.9977,rotation:-7.0388,x:14.25,y:93.95,regX:-0.9}},{t:this.instance_9,p:{regX:3.9,scaleX:0.9977,scaleY:0.9977,rotation:1.4469,x:22.3,y:189.3}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.1069,y:-58.2,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.7199,x:-33.05,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.639,x:0.65,y:-78.7,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9982,scaleY:0.9982,rotation:-118.3186,x:-74.1,y:54.3,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-100.5486,x:-37,y:125.55,regX:5.2}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-133.0205,x:-36.75,y:134.6,regY:-1.7}},{t:this.instance,p:{regX:36.3,scaleX:0.9983,scaleY:0.9983,rotation:-76.526,y:-23.6,x:-57.35}}]}).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.243,x:-20.5,y:91.1,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:96.1365,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7365,x:37.95,y:49.75,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.1313,x:55.15,y:127.85}},{t:this.instance_11,p:{rotation:55.8007,x:52.9,scaleX:0.9981,scaleY:0.9981,y:138.7,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.0333,x:14.2,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.4531,x:22.35,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.1042,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.7162,x:-33.1,y:188.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-3.5244,x:0.8,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-118.2168,x:-74.4,y:54.2,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.4477,x:-37.3,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.9249,x:-37,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-76.3474,y:-23.5,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2406,x:-20.5,y:91.1,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.9982,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7427,x:38.15,y:49.8,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.1428,x:55.35,y:127.85}},{t:this.instance_11,p:{rotation:55.8109,x:53.05,scaleX:0.998,scaleY:0.998,y:138.7,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.0287,x:14.2,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.4602,x:22.3,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.1023,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.7126,x:-33.1,y:188.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-3.4104,x:0.75,y:-78.7,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-118.1165,x:-74.6,y:54.1,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.3472,x:-37.6,y:125.6,regX:5.1}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.83,x:-37.45,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.3,scaleX:0.9982,scaleY:0.9982,rotation:-76.1692,y:-23.65,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2387,x:-20.5,y:91.15,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.8581,x:45.2,y:-26.3,regX:-33.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7472,x:38.35,y:49.85,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.1525,x:55.55,y:127.85}},{t:this.instance_11,p:{rotation:55.8204,x:53.25,scaleX:0.998,scaleY:0.998,y:138.7,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.0245,x:14.2,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.4671,x:22.35,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.1006,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.71,x:-33,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.2964,x:0.75,y:-78.7,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-118.015,x:-74.8,y:54.05,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.2466,x:-38,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.7346,x:-37.75,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-75.9895,y:-23.5,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2361,x:-20.5,y:91.15,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.7183,x:45.2,y:-26.3,regX:-33.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7527,x:38.5,y:49.85,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.1631,x:55.7,y:127.85}},{t:this.instance_11,p:{rotation:55.8298,x:53.45,scaleX:0.998,scaleY:0.998,y:138.75,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.02,x:14.2,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.475,x:22.3,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0979,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.7064,x:-33.05,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.1824,x:0.75,y:-78.7,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.9143,x:-75.05,y:54,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.1471,x:-38.35,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.6391,x:-38.2,y:134.6,regY:-1.7}},{t:this.instance,p:{regX:36.3,scaleX:0.9982,scaleY:0.9982,rotation:-75.8095,y:-23.65,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2334,x:-20.4,y:91.15,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.5774,x:45.2,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7582,x:38.8,y:49.8,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.1738,x:55.9,y:127.85}},{t:this.instance_11,p:{rotation:55.8393,x:53.6,scaleX:0.998,scaleY:0.998,y:138.75,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.0153,x:14.2,y:93.95,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.4821,x:22.3,y:189.15}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0962,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.7026,x:-33.05,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.0694,x:0.8,y:-78.7,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.8152,x:-75.3,y:53.95,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.0454,x:-38.75,y:125.65,regX:5.1}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.5435,x:-38.55,y:134.6,regY:-1.7}},{t:this.instance,p:{regX:36.3,scaleX:0.9982,scaleY:0.9982,rotation:-75.6317,y:-23.55,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2308,x:-20.4,y:91.15,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.4384,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7633,x:38.95,y:49.8,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.1842,x:56.1,y:127.95}},{t:this.instance_11,p:{rotation:55.8488,x:53.8,scaleX:0.998,scaleY:0.998,y:138.7,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.0112,x:14.2,y:93.95,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.49,x:22.35,y:189.15}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0943,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.699,x:-32.95,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.9554,x:0.75,y:-78.7,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.7141,x:-75.55,y:53.8,regX:39.8,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.9449,x:-39.1,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.4475,x:-39.05,y:134.65,regY:-1.8}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-75.4525,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2282,x:-20.4,y:91.15,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.2985,x:45.25,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7678,x:39.1,y:49.8,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.1941,x:56.25,y:127.9}},{t:this.instance_11,p:{rotation:55.8595,x:53.95,scaleX:0.998,scaleY:0.998,y:138.8,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.0058,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.497,x:22.3,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0926,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.6966,x:-32.95,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.8415,x:0.85,y:-78.7,regX:1.2,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.613,x:-75.75,y:53.85,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.8445,x:-39.45,y:125.55,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.3527,x:-39.3,y:134.65,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-75.2734,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2255,x:-20.4,y:91.2,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.1578,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7733,x:39.3,y:49.75,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.2037,x:56.45,y:127.9}},{t:this.instance_11,p:{rotation:55.869,x:54.15,scaleX:0.998,scaleY:0.998,y:138.8,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.0023,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.504,x:22.3,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0898,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.693,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.7275,x:0.75,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.5123,x:-76.05,y:53.75,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.744,x:-39.8,y:125.65,regX:5.1}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.2577,x:-39.65,y:134.6,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-75.0947,y:-23.45,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2229,x:-20.35,y:91.2,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.0188,x:45.15,y:-26.3,regX:-33.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7788,x:39.5,y:49.8,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.2153,x:56.6,y:127.95}},{t:this.instance_11,p:{rotation:55.8787,x:54.3,scaleX:0.998,scaleY:0.998,y:138.8,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9971,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.511,x:22.3,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0881,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.6909,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.6137,x:0.8,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.4108,x:-76.35,y:53.6,regX:39.8,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.6445,x:-40.15,y:125.55,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.1623,x:-40.1,y:134.6,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-74.9154,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2204,x:-20.35,y:91.2,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.8773,x:45.25,y:-26.3,regX:-33.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7839,x:39.7,y:49.8,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.2259,x:56.8,y:128}},{t:this.instance_11,p:{rotation:55.8879,x:54.5,scaleX:0.998,scaleY:0.998,y:138.85,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9942,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.518,x:22.25,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.086,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.6873,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.4989,x:0.75,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.3097,x:-76.5,y:53.65,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.5432,x:-40.55,y:125.55,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.0655,x:-40.45,y:134.6,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-74.7354,y:-23.45,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2185,x:-20.35,y:91.2,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.7384,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7893,x:39.85,y:49.8,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.2365,x:56.95,y:128}},{t:this.instance_11,p:{rotation:55.8979,x:54.65,scaleX:0.998,scaleY:0.998,y:138.8,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.99,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.525,x:22.25,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0834,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:3,rotation:12.6847,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.385,x:0.75,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.2102,x:-76.7,y:53.55,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.442,x:-40.9,y:125.65,regX:5.1}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.9712,x:-40.8,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-74.5576,y:-23.5,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2158,x:-20.5,y:91.3,regX:2.1,regY:-46.5}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.5979,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7939,x:40.05,y:49.8,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.2471,x:57.2,y:127.95}},{t:this.instance_11,p:{rotation:55.9081,x:54.8,scaleX:0.998,scaleY:0.998,y:138.85,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9855,x:14.2,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.5329,x:22.25,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0817,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:3,rotation:12.6813,x:-32.85,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.2719,x:0.75,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.1092,x:-76.95,y:53.5,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.3417,x:-41.25,y:125.7,regX:5.1}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.8749,x:-41.2,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-74.3776,y:-23.45,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2132,x:-20.5,y:91.3,regX:2.1,regY:-46.5}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.459,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.7994,x:40.15,y:49.85,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.256,x:57.3,y:128}},{t:this.instance_11,p:{rotation:55.9171,x:55,scaleX:0.998,scaleY:0.998,y:138.9,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.981,x:14.2,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.5399,x:22.3,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.08,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:3,rotation:12.6792,x:-32.85,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.1581,x:0.8,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.0077,x:-77.2,y:53.45,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-99.2413,x:-41.65,y:125.55,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.7795,x:-41.55,y:134.6,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-74.1985,y:-23.4,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2106,x:-20.5,y:91.3,regX:2.1,regY:-46.5}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.3185,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8046,x:40.3,y:49.85,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.2664,x:57.55,y:128}},{t:this.instance_11,p:{rotation:55.9265,x:55.15,scaleX:0.998,scaleY:0.998,y:138.9,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9767,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.5478,x:22.3,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.079,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:3,rotation:12.6766,x:-32.85,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.0442,x:0.8,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.9078,x:-77.5,y:53.3,regX:39.8,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.1411,x:-41.95,y:125.55,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.6845,x:-42,y:134.65,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-74.02,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.208,x:-20.5,y:91.3,regX:2.1,regY:-46.5}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.178,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.809,x:40.55,y:49.9,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.2772,x:57.65,y:128.05}},{t:this.instance_11,p:{rotation:55.9377,x:55.35,scaleX:0.998,scaleY:0.998,y:138.9,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9722,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.5557,x:22.2,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0756,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.6732,x:-33,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.9304,x:0.8,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.8064,x:-77.65,y:53.3,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.04,x:-42.35,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.589,x:-42.3,y:134.6,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-73.8414,y:-23.5,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2061,x:-20.5,y:91.25,regX:2.1,regY:-46.5}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.0374,x:45.15,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8145,x:40.7,y:49.9,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.2887,x:57.9,y:128}},{t:this.instance_11,p:{rotation:55.9465,x:55.5,scaleX:0.998,scaleY:0.998,y:138.9,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9679,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.5627,x:22.25,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0747,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.6705,x:-33,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8165,x:0.8,y:-78.75,regX:1.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.7065,x:-77.9,y:53.2,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.9406,x:-42.75,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.4933,x:-42.75,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-73.6616,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2035,x:-20.45,y:91.25,regX:2.1,regY:-46.5}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9983,rotation:93.8986,x:45.15,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.82,x:40.9,y:49.95,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.2993,x:58,y:128.05}},{t:this.instance_11,p:{rotation:55.9559,x:55.7,scaleX:0.998,scaleY:0.998,y:138.95,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9635,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.5706,x:22.2,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0728,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.6669,x:-33,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7027,x:0.75,y:-78.75,regX:1.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.6054,x:-78.2,y:53.15,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.8388,x:-43.1,y:125.55,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.3972,x:-43.1,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-73.4842,y:-23.5,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.2009,x:-20.45,y:91.25,regX:2.1,regY:-46.5}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.7574,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8252,x:41.1,y:49.95,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.3099,x:58.25,y:128.05}},{t:this.instance_11,p:{rotation:55.9654,x:55.85,scaleX:0.998,scaleY:0.998,y:138.95,regX:-4.8}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9589,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.5776,x:22.15,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0696,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.6632,x:-32.95,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.588,x:0.8,y:-78.8,regX:1.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.5047,x:-78.55,y:53.15,regX:39.7,regY:0.9}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.7394,x:-43.5,y:125.55,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.3022,x:-43.5,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-73.3035,y:-23.5,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1982,x:-20.45,y:91.25,regX:2.1,regY:-46.5}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.6187,x:45.15,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8305,x:41.3,y:49.9,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.3195,x:58.35,y:128.1}},{t:this.instance_11,p:{rotation:55.9749,x:56.15,scaleX:0.998,scaleY:0.998,y:139,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9547,x:14.2,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.5846,x:22.25,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0675,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.6596,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.475,x:0.75,y:-78.8,regX:1.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.404,x:-78.65,y:53,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.6385,x:-43.85,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.2066,x:-43.95,y:134.6,regY:-1.8}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-73.124,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1965,x:-20.45,y:91.2,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.4783,x:45.15,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8351,x:41.5,y:49.9,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.3302,x:58.6,y:128.1}},{t:this.instance_11,p:{rotation:55.9844,x:56.3,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9501,x:14.2,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.5925,x:22.2,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0658,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.6571,x:-32.95,y:188.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.3612,x:0.75,y:-78.8,regX:1.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.303,x:-78.8,y:53.05,regX:39.6,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.5375,x:-44.2,y:125.55,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.111,x:-44.25,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.9464,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1939,x:-20.45,y:91.2,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.3388,x:45.15,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8396,x:41.7,y:49.9,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.3383,x:58.75,y:128.05}},{t:this.instance_11,p:{rotation:55.9938,x:56.5,scaleX:0.998,scaleY:0.998,y:139,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9459,x:14.2,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.5995,x:22.25,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0639,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.6537,x:-32.95,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.2474,x:0.75,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.2023,x:-79.1,y:52.9,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.4373,x:-44.55,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.0172,x:-44.7,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.7669,y:-23.45,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1913,x:-20.45,y:91.2,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.1985,x:45.2,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8449,x:41.9,y:49.95,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.3496,x:59,y:128.1}},{t:this.instance_11,p:{rotation:56.0038,x:56.65,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9414,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.6074,x:22.2,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0613,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.6516,x:-32.95,y:188.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.1336,x:0.85,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.102,x:-79.3,y:52.8,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.3363,x:-44.9,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.9197,x:-45.05,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.5871,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1895,x:-20.45,y:91.2,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.0573,x:45.2,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8511,x:42.05,y:49.95,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.3603,x:59.15,y:128.15}},{t:this.instance_11,p:{rotation:56.0142,x:56.85,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.936,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.6144,x:22.15,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0594,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.648,x:-32.85,y:188.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.0189,x:0.8,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.0006,x:-79.5,y:52.85,regX:39.6,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.2355,x:-45.3,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.8254,x:-45.45,y:134.45,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.4087,y:-23.5,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1877,x:-20.45,y:91.15,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.9187,x:45.15,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8568,x:42.25,y:49.95,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.3699,x:59.35,y:128.15}},{t:this.instance_11,p:{rotation:56.0235,x:57,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9317,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.6215,x:22.2,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0577,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.6454,x:-32.85,y:188.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.9051,x:0.8,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.9003,x:-79.75,y:52.65,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.1354,x:-45.65,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.7302,x:-45.8,y:134.45,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.2295,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1851,x:-20.5,y:91.15,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.7792,x:45.1,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8613,x:42.4,y:49.9,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.3815,x:59.5,y:128.1}},{t:this.instance_11,p:{rotation:56.0335,x:57.25,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9273,x:14.15,y:93.9,regX:-0.9}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.6293,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.055,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.6418,x:-32.8,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.7913,x:0.8,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.7992,x:-79.95,y:52.65,regX:39.6,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.0346,x:-46.05,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.6346,x:-46.25,y:134.45,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.0503,y:-23.55,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1825,x:-20.45,y:91.15,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.639,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8664,x:42.5,y:49.95,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.392,x:59.65,y:128.1}},{t:this.instance_11,p:{rotation:56.0429,x:57.35,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9219,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.6364,x:22.15,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0532,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.639,x:-32.8,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.6784,x:0.85,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.6981,x:-80.35,y:52.55,regX:39.7,regY:0.9}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.9338,x:-46.35,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.5395,x:-46.5,y:134.45,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.8716,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1798,x:-20.45,y:91.15,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.4995,x:45.2,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8717,x:42.75,y:50,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.4026,x:59.85,y:128.1}},{t:this.instance_11,p:{rotation:56.0531,x:57.6,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9184,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.6442,x:22.2,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.0512,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.6354,x:-32.8,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.5637,x:0.75,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.5978,x:-80.45,y:52.4,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.8347,x:-46.7,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.4432,x:-46.9,y:134.4,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.6925,y:-23.45,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.178,x:-20.45,y:91.15,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.3593,x:45.1,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8764,x:42.9,y:50,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.4125,x:60,y:128.15}},{t:this.instance_11,p:{rotation:56.0621,x:57.7,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9132,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.6512,x:22.15,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.0495,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.6318,x:-32.8,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.4499,x:0.75,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.4975,x:-80.7,y:52.35,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.734,x:-47.1,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.3487,x:-47.3,y:134.45,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.5133,y:-23.5,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1754,x:-20.45,y:91.1,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.2191,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8817,x:43.1,y:50.05,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.423,x:60.2,y:128.1}},{t:this.instance_11,p:{rotation:56.0716,x:57.95,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9087,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.6583,x:22.15,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0469,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.6284,x:-32.8,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.3361,x:0.8,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.396,x:-80.95,y:52.3,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.6331,x:-47.45,y:125.35,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.2524,x:-47.7,y:134.45,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.3349,y:-23.55,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1728,x:-20.45,y:91.1,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.0788,x:45.1,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.887,x:43.3,y:50.05,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.4327,x:60.4,y:128.15}},{t:this.instance_11,p:{rotation:56.0828,x:58.05,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9052,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.6662,x:22.15,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0452,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.6258,x:-32.8,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.2223,x:0.8,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.2953,x:-81.3,y:52.3,regX:39.7,regY:0.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.5325,x:-47.85,y:125.35,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.1554,x:-48.1,y:134.35,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.1557,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1702,x:-20.45,y:91.1,regX:2.1,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.9395,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8923,x:43.4,y:50.05,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.4433,x:60.55,y:128.1}},{t:this.instance_11,p:{rotation:56.0915,x:58.3,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9005,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.6732,x:22.1,y:189.15}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0433,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.6222,x:-32.75,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.1085,x:0.85,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.1946,x:-81.4,y:52.15,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.4318,x:-48.15,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.0621,x:-48.45,y:134.3,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.9754,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1683,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.7993,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.8978,x:43.6,y:50.05,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.4548,x:60.75,y:128.15}},{t:this.instance_11,p:{rotation:56.101,x:58.4,scaleX:0.998,scaleY:0.998,y:139.15,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8964,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.6802,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0416,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:3,rotation:12.6201,x:-32.8,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:0.0009,x:0.85,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.0947,x:-81.65,y:52.05,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.3321,x:-48.5,y:125.35,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-129.967,x:-48.85,y:134.35,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.7976,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1656,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.6591,x:45.15,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9032,x:43.8,y:50.05,regY:-1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.4654,x:60.9,y:128.15}},{t:this.instance_11,p:{rotation:56.1112,x:58.65,scaleX:0.998,scaleY:0.998,y:139.15,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8918,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.6881,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0388,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.6165,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:0.1147,x:0.8,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-114.9932,x:-81.95,y:52,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.2315,x:-48.9,y:125.3,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-129.87,x:-49.15,y:134.3,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.6184,y:-23.5,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.163,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.518,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9076,x:44.1,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.476,x:61.1,y:128.1}},{t:this.instance_11,p:{rotation:56.1207,x:58.75,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8884,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.6951,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.038,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.6139,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.2276,x:0.8,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-114.8925,x:-82.3,y:51.9,regX:39.7,regY:0.9}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.1315,x:-49.25,y:125.3,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-129.7761,x:-49.6,y:134.25,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.4388,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1604,x:-20.3,y:91.15,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.3796,x:45.1,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.913,x:44.3,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.4857,x:61.3,y:128.1}},{t:this.instance_11,p:{rotation:56.1306,x:58.95,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8831,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.703,x:22.15,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0361,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.6105,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.3422,x:0.8,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-114.7914,x:-82.4,y:51.85,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.0292,x:-49.6,y:125.3,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-129.6796,x:-49.95,y:134.25,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.2602,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.1587,x:-20.3,y:91.15,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.2394,x:45.1,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9186,x:44.45,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.4963,x:61.45,y:128.15}},{t:this.instance_11,p:{rotation:56.1401,x:59.1,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8786,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9976,scaleY:0.9976,rotation:1.71,x:22.05,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0335,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.6076,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.4569,x:0.8,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-114.6914,x:-82.65,y:51.8,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.9286,x:-50,y:125.3,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-129.5838,x:-50.35,y:134.3,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.0815,y:-23.5,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.15,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.0992,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:44.65,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:61.7,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:59.3,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.85,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.5707,x:0.7,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-114.5911,x:-82.9,y:51.6,regX:39.8,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.8281,x:-50.3,y:125.25,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-129.4886,x:-50.8,y:134.3,regY:-1.8}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-69.9017,y:-23.55,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.15,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.214,x:45.1,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:44.5,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:61.55,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:59.15,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.4814,x:0.7,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-114.6793,x:-82.6,y:51.75,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.9173,x:-50.05,y:125.25,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-129.5782,x:-50.4,y:134.25,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.0554,y:-23.5,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.15,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.3288,x:45.1,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:44.35,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:61.35,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:59,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.3921,x:0.8,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-114.7683,x:-82.45,y:51.7,regX:39.8,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.008,x:-49.7,y:125.3,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-129.6659,x:-50.1,y:134.3,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.2084,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.15,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.4426,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:44.2,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:61.2,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:58.85,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.302,x:0.8,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-114.858,x:-82.25,y:51.85,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.0971,x:-49.4,y:125.35,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-129.7555,x:-49.75,y:134.25,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.3599,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.15,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.5574,x:45.1,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:44.05,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:61.05,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:58.7,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:0.2136,x:0.85,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-114.947,x:-82,y:51.9,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9982,rotation:-97.1853,x:-49.1,y:125.35,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-129.8445,x:-49.35,y:134.25,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.5131,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.6722,x:45.15,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:43.9,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:60.9,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:58.55,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:0.1243,x:0.8,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.0367,x:-81.8,y:52,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.2737,x:-48.75,y:125.35,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-129.934,x:-49.05,y:134.3,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.6666,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.787,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:43.75,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:60.75,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:58.35,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:0.035,x:0.8,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.1253,x:-81.65,y:52.05,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.3629,x:-48.45,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.0242,x:-48.8,y:134.3,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.8194,y:-23.55,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:91.9018,x:45.1,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:43.6,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:60.6,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:58.2,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.049,x:0.8,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.2139,x:-81.55,y:52.15,regX:39.7,regY:0.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.4529,x:-48.1,y:125.35,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.1119,x:-48.45,y:134.35,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-70.9715,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.0157,x:45.1,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:43.45,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:60.45,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:58.05,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.1383,x:0.8,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.304,x:-81.35,y:52.25,regX:39.7,regY:0.9}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.5423,x:-47.85,y:125.35,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.2008,x:-48.1,y:134.3,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.1244,y:-23.5,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.1305,x:45.15,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:43.3,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:60.3,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:57.9,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.2276,x:0.75,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.3929,x:-81.05,y:52.3,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.6314,x:-47.55,y:125.35,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.2903,x:-47.75,y:134.35,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.2784,y:-23.5,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.2453,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:43.15,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:60.15,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:57.75,scaleX:0.998,scaleY:0.998,y:139.1,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.3169,x:0.8,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.4822,x:-80.9,y:52.35,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.7207,x:-47.2,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.3798,x:-47.4,y:134.4,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.4293,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.3602,x:45.1,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:43,y:50,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:60,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:57.6,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.4061,x:0.9,y:-78.6,regX:1.2,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.5716,x:-80.6,y:52.35,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.8083,x:-46.9,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.4693,x:-47.15,y:134.4,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.5825,y:-23.55,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.475,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:42.85,y:49.95,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:59.85,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:57.45,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.4945,x:0.75,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.6609,x:-80.35,y:52.5,regX:39.6,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-97.8975,x:-46.6,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.5582,x:-46.75,y:134.4,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.7357,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.589,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:42.7,y:49.95,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:59.7,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:57.3,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.5838,x:0.8,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.7494,x:-80.25,y:52.5,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.9877,x:-46.25,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.6489,x:-46.45,y:134.4,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-71.8891,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.7038,x:45.1,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:42.55,y:49.95,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:59.55,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:57.15,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.6731,x:0.8,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.838,x:-80,y:52.7,regX:39.6,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.0771,x:-46,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.7364,x:-46.15,y:134.35,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.0409,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.8187,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:42.4,y:49.95,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:59.4,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:57,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.7624,x:0.8,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.9273,x:-79.95,y:52.65,regX:39.7,regY:0.9}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.1657,x:-45.65,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.8254,x:-45.85,y:134.4,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.194,y:-23.5,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:92.9336,x:45.15,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:42.25,y:49.95,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:59.25,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:56.85,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.8508,x:0.85,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.0178,x:-79.8,y:52.75,regX:39.7,regY:0.9}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.2541,x:-45.35,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-130.9147,x:-45.45,y:134.4,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.3475,y:-23.45,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.0467,x:45.1,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:42.1,y:49.95,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:59.1,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:56.7,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-0.9401,x:0.75,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.1059,x:-79.45,y:52.8,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.3434,x:-45.05,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.0035,x:-45.15,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.4998,y:-23.5,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.1616,x:45.2,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:41.95,y:49.95,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:58.95,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:56.55,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.0294,x:0.75,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.1956,x:-79.25,y:52.85,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.433,x:-44.7,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.0935,x:-44.8,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.653,y:-23.45,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.2766,x:45.15,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:41.8,y:49.95,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:58.8,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:56.4,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.1187,x:0.8,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.283,x:-79,y:52.85,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.5231,x:-44.4,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.1836,x:-44.5,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.8054,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.3915,x:45.15,y:-26.5,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:41.65,y:49.95,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:58.65,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:56.25,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.208,x:0.75,y:-78.6,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.3735,x:-78.85,y:52.95,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.6117,x:-44.1,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.2705,x:-44.15,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-72.9583,y:-23.5,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.5055,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:41.5,y:49.9,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:58.5,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:56.1,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.2973,x:0.75,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.4624,x:-78.55,y:53.1,regX:39.6,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.6995,x:-43.8,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.3611,x:-43.8,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-73.1104,y:-23.45,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.6205,x:45.15,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:41.35,y:49.9,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:58.35,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:55.95,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.3866,x:0.75,y:-78.8,regX:1.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.5517,x:-78.4,y:53.05,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.789,x:-43.5,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.4481,x:-43.45,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-73.2639,y:-23.5,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.7355,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:41.2,y:49.9,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:58.15,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:55.8,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.4759,x:0.75,y:-78.8,regX:1.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.6407,x:-78.2,y:53.2,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.8785,x:-43.15,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.5381,x:-43.15,y:134.4,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-73.4169,y:-23.45,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.3,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.8496,x:45.15,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:41.05,y:49.9,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:58,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:55.65,scaleX:0.998,scaleY:0.998,y:139.05,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.5652,x:0.8,y:-78.8,regX:1.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.7296,x:-78.05,y:53.25,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.9674,x:-42.85,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.6287,x:-42.8,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-73.5695,y:-23.5,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:93.9646,x:45.15,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:40.9,y:49.9,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:57.85,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:55.5,scaleX:0.998,scaleY:0.998,y:139,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.6536,x:0.8,y:-78.8,regX:1.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.8185,x:-77.85,y:53.25,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.0577,x:-42.45,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.7168,x:-42.45,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-73.7217,y:-23.45,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.0788,x:45.15,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:40.75,y:49.9,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:57.7,y:128.15}},{t:this.instance_11,p:{rotation:56.1498,x:55.35,scaleX:0.998,scaleY:0.998,y:139,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.7421,x:0.8,y:-78.8,regX:1.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.9078,x:-77.65,y:53.25,regX:39.8,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.1464,x:-42.2,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.8061,x:-42.15,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-73.8752,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.1938,x:45.15,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:40.6,y:49.85,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:57.55,y:128.1}},{t:this.instance_11,p:{rotation:56.1498,x:55.2,scaleX:0.998,scaleY:0.998,y:139,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.8314,x:0.8,y:-78.8,regX:1.1,regY:53}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-116.996,x:-77.4,y:53.35,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-99.2342,x:-41.9,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.8955,x:-41.9,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-74.028,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.3071,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:40.45,y:49.85,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:57.4,y:128.1}},{t:this.instance_11,p:{rotation:56.1498,x:55.05,scaleX:0.998,scaleY:0.998,y:139,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-1.9216,x:0.85,y:-78.65,regX:1.2,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.0864,x:-77.3,y:53.35,regX:39.8,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-99.3239,x:-41.5,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-131.9842,x:-41.5,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-74.181,y:-23.45,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.423,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:40.3,y:49.85,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:57.25,y:128.1}},{t:this.instance_11,p:{rotation:56.1498,x:54.9,scaleX:0.998,scaleY:0.998,y:139,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.0101,x:0.75,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.1758,x:-77,y:53.55,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-99.4135,x:-41.2,y:125.6,regX:5.1}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.0735,x:-41.15,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-74.3332,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.5372,x:45.2,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:40.15,y:49.85,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:57.1,y:128.1}},{t:this.instance_11,p:{rotation:56.1498,x:54.75,scaleX:0.998,scaleY:0.998,y:138.95,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.0994,x:0.75,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.2647,x:-76.8,y:53.55,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.5025,x:-40.85,y:125.55,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.1622,x:-40.85,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-74.4866,y:-23.45,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.6514,x:45.15,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:40,y:49.85,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:56.95,y:128.1}},{t:this.instance_11,p:{rotation:56.1498,x:54.6,scaleX:0.998,scaleY:0.998,y:138.95,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.1887,x:0.7,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.3536,x:-76.6,y:53.6,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.5931,x:-40.6,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.2515,x:-40.5,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-74.6386,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.7666,x:45.2,y:-26.35,regX:-33.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:39.85,y:49.85,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:56.8,y:128.1}},{t:this.instance_11,p:{rotation:56.1498,x:54.45,scaleX:0.998,scaleY:0.998,y:138.95,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.2781,x:0.75,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.4422,x:-76.4,y:53.65,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.68,x:-40.3,y:125.65,regX:5.1}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.3408,x:-40.15,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-74.7926,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.8808,x:45.2,y:-26.3,regX:-33.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:39.7,y:49.85,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:56.65,y:128.05}},{t:this.instance_11,p:{rotation:56.1498,x:54.3,scaleX:0.998,scaleY:0.998,y:138.95,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.9}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.3665,x:0.75,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.5319,x:-76.15,y:53.7,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.7699,x:-39.9,y:125.65,regX:5.1}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.4307,x:-39.8,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-74.9443,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:94.996,x:45.15,y:-26.3,regX:-33.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:39.55,y:49.85,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:56.5,y:128.05}},{t:this.instance_11,p:{rotation:56.1498,x:54.15,scaleX:0.998,scaleY:0.998,y:138.95,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.4551,x:0.7,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.6212,x:-75.95,y:53.8,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.8596,x:-39.65,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.5194,x:-39.6,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-75.0975,y:-23.4,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.1103,x:45.15,y:-26.25,regX:-33.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:39.4,y:49.85,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:56.35,y:128.05}},{t:this.instance_11,p:{rotation:56.1498,x:54,scaleX:0.998,scaleY:0.998,y:138.9,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.5444,x:0.7,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.7102,x:-75.8,y:53.75,regX:39.8,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.9485,x:-39.35,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.6087,x:-39.2,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-75.2498,y:-23.5,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.2246,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:39.25,y:49.85,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:56.2,y:128.05}},{t:this.instance_11,p:{rotation:56.1498,x:53.85,scaleX:0.998,scaleY:0.998,y:138.9,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.25,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.6338,x:0.8,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.8003,x:-75.65,y:53.85,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.0376,x:-39.05,y:125.6,regX:5.1}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.698,x:-38.85,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-75.4027,y:-23.4,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.339,x:45.25,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:39.1,y:49.8,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:56.05,y:128.05}},{t:this.instance_11,p:{rotation:56.1498,x:53.7,scaleX:0.998,scaleY:0.998,y:138.9,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.7232,x:0.75,y:-78.65,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.8884,x:-75.4,y:53.95,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.1265,x:-38.7,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.7873,x:-38.55,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.3,scaleX:0.9982,scaleY:0.9982,rotation:-75.5557,y:-23.65,x:-57.25}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.4542,x:45.15,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:38.95,y:49.8,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:55.9,y:128}},{t:this.instance_11,p:{rotation:56.1498,x:53.55,scaleX:0.998,scaleY:0.998,y:138.9,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-2.8126,x:0.7,y:-78.7,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-117.9774,x:-75.15,y:54,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.2163,x:-38.4,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.8753,x:-38.2,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-75.7084,y:-23.45,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.5686,x:45.2,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:38.8,y:49.8,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:55.75,y:128}},{t:this.instance_11,p:{rotation:56.1498,x:53.4,scaleX:0.998,scaleY:0.998,y:138.85,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.9019,x:0.75,y:-78.7,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-118.0667,x:-74.95,y:54.05,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.3045,x:-38.15,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-132.9658,x:-37.85,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.3,scaleX:0.9982,scaleY:0.9982,rotation:-75.8614,y:-23.65,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.683,x:45.2,y:-26.45,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:38.65,y:49.8,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:55.6,y:128}},{t:this.instance_11,p:{rotation:56.1498,x:53.25,scaleX:0.998,scaleY:0.998,y:138.85,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.9904,x:0.7,y:-78.7,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-118.1561,x:-74.8,y:54.05,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.3935,x:-37.8,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-133.0532,x:-37.5,y:134.55,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-76.0147,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.7984,x:45.2,y:-26.25,regX:-33.3}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:38.5,y:49.75,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:55.45,y:128}},{t:this.instance_11,p:{rotation:56.1498,x:53.1,scaleX:0.998,scaleY:0.998,y:138.85,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.0799,x:0.7,y:-78.7,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-118.245,x:-74.6,y:54.2,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.4835,x:-37.5,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-133.1424,x:-37.3,y:134.65,regY:-1.8}},{t:this.instance,p:{regX:36.3,scaleX:0.9982,scaleY:0.9982,rotation:-76.167,y:-23.65,x:-57.35}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:95.9128,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:38.35,y:49.75,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:55.3,y:128}},{t:this.instance_11,p:{rotation:56.1498,x:52.95,scaleX:0.998,scaleY:0.998,y:138.8,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.1684,x:0.75,y:-78.7,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-118.3336,x:-74.35,y:54.25,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.5714,x:-37.15,y:125.5,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-133.231,x:-36.9,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9983,scaleY:0.9983,rotation:-76.32,y:-23.45,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:96.0263,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:38.2,y:49.75,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:55.15,y:127.95}},{t:this.instance_11,p:{rotation:56.1498,x:52.8,scaleX:0.998,scaleY:0.998,y:138.8,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-3.2579,x:0.7,y:-78.7,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-118.4226,x:-74.15,y:54.2,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.6606,x:-36.85,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-133.3209,x:-36.55,y:134.5,regY:-1.7}},{t:this.instance,p:{regX:36.3,scaleX:0.9982,scaleY:0.9982,rotation:-76.4727,y:-23.65,x:-57.3}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:96.1409,x:45.15,y:-26.35,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:38.05,y:49.7,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:55,y:127.95}},{t:this.instance_11,p:{rotation:56.1498,x:52.65,scaleX:0.998,scaleY:0.998,y:138.8,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.3472,x:0.7,y:-78.7,regX:1.1,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-118.5115,x:-73.85,y:54.35,regX:39.6,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.7489,x:-36.55,y:125.45,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-133.4096,x:-36.25,y:134.45,regY:-1.7}},{t:this.instance,p:{regX:36.2,scaleX:0.9982,scaleY:0.9982,rotation:-76.625,y:-23.4,x:-57.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.156,x:-20.35,y:91.1,regX:2.2,regY:-46.6}},{t:this.instance_14,p:{scaleX:0.9982,scaleY:0.9982,rotation:96.2555,x:45.2,y:-26.4,regX:-33.4}},{t:this.instance_13,p:{scaleX:0.9982,scaleY:0.9982,rotation:77.9238,x:37.9,y:49.7,regY:-1.1}},{t:this.instance_12,p:{regY:7.8,scaleX:0.9981,scaleY:0.9981,rotation:82.5061,x:54.85,y:127.95}},{t:this.instance_11,p:{rotation:56.1498,x:52.5,scaleX:0.998,scaleY:0.998,y:138.8,regX:-4.7}},{t:this.instance_10,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.8742,x:14.3,y:93.9,regX:-0.8}},{t:this.instance_9,p:{regX:4,scaleX:0.9977,scaleY:0.9977,rotation:1.717,x:22.1,y:189.2}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9988,scaleY:0.9988,rotation:12.0308,y:-58.15,x:-4.95}},{t:this.instance_6,p:{regX:2.9,rotation:12.604,x:-32.9,y:188.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.4358,x:0.85,y:-78.7,regX:1.2,regY:53.1}},{t:this.instance_3,p:{scaleX:0.9981,scaleY:0.9981,rotation:-118.6001,x:-73.8,y:54.3,regX:39.7,regY:1}},{t:this.instance_2,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.8389,x:-36.3,y:125.4,regX:5.2}},{t:this.instance_1,p:{scaleX:0.9979,scaleY:0.9979,rotation:-133.4988,x:-35.9,y:134.4,regY:-1.7}},{t:this.instance,p:{regX:36.3,scaleX:0.9982,scaleY:0.9982,rotation:-76.7769,y:-23.55,x:-57.3}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-95.4,-206.4,182,510.1);


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
	this.instance.setTransform(-57,-22.95,0.9985,0.9985,-79.6203,0,0,35.6,0.4);

	this.instance_1 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1.setTransform(-41.8,138.15,0.9981,0.9981,-118.4324,0,0,6.3,-1.4);

	this.instance_2 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_2.setTransform(-41.05,129.3,0.9984,0.9984,-95.0934,0,0,5.5,-8.7);

	this.instance_3 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_3.setTransform(-69.7,54.9,0.9984,0.9984,-111.8536,0,0,39.6,1.1);

	this.instance_4 = new lib.ch1_headcopy_1("synched",0);
	this.instance_4.setTransform(0.55,-78.85,0.999,0.999,-3.6465,0,0,1.1,52.9);

	this.instance_5 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_6.setTransform(-23.8,189.45,0.9982,0.9982,4.7282,0,0,3,-54.3);

	this.instance_7 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_7.setTransform(-4.95,-58.2,0.999,0.999,12.1106,0,0,-0.9,8.8);

	this.instance_8 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_9.setTransform(24.5,186.9,0.9978,0.9978,0.2042,0,0,2.8,-54.1);

	this.instance_10 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_10.setTransform(17.9,91.7,0.9977,0.9977,-6.7694,0,0,-1.2,1.9);

	this.instance_11 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_11.setTransform(43.95,136.7,0.9984,0.9984,84.2002,0,0,-5.2,3.2);

	this.instance_12 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_12.setTransform(52.65,129.9,0.9985,0.9985,121.8754,0,0,-6.3,7.9);

	this.instance_13 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_13.setTransform(42.85,49.7,0.9985,0.9985,83.5249,0,0,-40.8,-0.5);

	this.instance_14 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_14.setTransform(45.2,-26.55,0.9984,0.9984,92.443,0,0,-33.9,-0.1);

	this.instance_15 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_15.setTransform(-16.9,92.7,0.9984,0.9984,1.9146,0,0,2.2,-46.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{rotation:1.9146,x:-16.9,y:92.7}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.443,x:45.2,y:-26.55,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9985,scaleY:0.9985,rotation:83.5249,y:49.7,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9985,scaleY:0.9985,rotation:121.8754,x:52.65,y:129.9}},{t:this.instance_11,p:{rotation:84.2002,x:43.95,scaleX:0.9984,scaleY:0.9984,y:136.7,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9977,scaleY:0.9977,rotation:-6.7694,x:17.9,y:91.7}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:0.2042,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,rotation:12.1106,x:-4.95,y:-58.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:4.7282,x:-23.8,y:189.45,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.6465,x:0.55,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.6,scaleX:0.9984,scaleY:0.9984,rotation:-111.8536,y:54.9,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,rotation:-95.0934,x:-41.05,y:129.3,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-118.4324,x:-41.8,y:138.15,regY:-1.4,regX:6.3}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.6203,x:-57,y:-22.95}}]}).to({state:[{t:this.instance_15,p:{rotation:1.9138,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.4405,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.7,scaleX:0.9984,scaleY:0.9984,rotation:83.4064,y:49.8,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.8,scaleX:0.9984,scaleY:0.9984,rotation:121.756,x:52.85,y:129.95}},{t:this.instance_11,p:{rotation:84.081,x:44.1,scaleX:0.9984,scaleY:0.9984,y:136.7,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.1081,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.5301,x:0.7,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-111.4936,y:54.85,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-94.7324,x:-41.55,y:129.4,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-118.0712,x:-42.3,y:138.3,regY:-1.4,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.6124,x:-56.95,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9138,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.4388,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:83.2874,y:49.7,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:121.636,x:52.95,y:129.9}},{t:this.instance_11,p:{rotation:83.9621,x:44.3,scaleX:0.9983,scaleY:0.9983,y:136.7,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.1072,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.4152,x:0.65,y:-78.9,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-111.1333,y:54.85,x:-69.65,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,rotation:-94.3713,x:-41.95,y:129.55,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-117.7106,x:-42.9,y:138.55,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.6052,x:-56.9,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9138,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.4361,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:83.1675,y:49.75,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:121.5169,x:53.2,y:129.85}},{t:this.instance_11,p:{rotation:83.8423,x:44.45,scaleX:0.9983,scaleY:0.9983,y:136.65,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.1045,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.2986,x:0.65,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-110.7721,y:54.9,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-94.0105,x:-42.55,y:129.7,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-117.3494,x:-43.5,y:138.75,regY:-1.6,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5973,x:-57,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9138,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.4344,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:83.0475,y:49.65,regY:-0.6,x:42.9}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:121.397,x:53.4,y:129.75}},{t:this.instance_11,p:{rotation:83.7224,x:44.65,scaleX:0.9983,scaleY:0.9983,y:136.65,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.1026,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.1829,x:0.7,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-110.4102,y:54.85,x:-69.65,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-93.6498,x:-43.05,y:129.85,scaleX:0.9983,scaleY:0.9983,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-116.9889,x:-44,y:138.9,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5893,x:-57,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9138,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.4318,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.7,scaleX:0.9984,scaleY:0.9984,rotation:82.9276,y:49.85,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:121.2772,x:53.4,y:129.75}},{t:this.instance_11,p:{rotation:83.6027,x:44.85,scaleX:0.9983,scaleY:0.9983,y:136.65,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.1002,x:-5.05,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.0662,x:0.75,y:-78.85,regX:1.2,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-110.0492,y:54.85,x:-69.65,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,rotation:-93.29,x:-43.35,y:130.05,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-116.6281,x:-44.5,y:139,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5812,x:-56.95,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9138,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:92.43,x:45.2,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.7,scaleX:0.9984,scaleY:0.9984,rotation:82.8075,y:49.85,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:121.1573,x:53.6,y:129.75}},{t:this.instance_11,p:{rotation:83.4837,x:45.05,scaleX:0.9983,scaleY:0.9983,y:136.6,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0973,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.9498,x:0.6,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-109.6888,y:54.85,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-92.9287,x:-43.95,y:130.25,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-116.2669,x:-45.15,y:139.05,regY:-1.5,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5733,x:-56.95,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9138,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:92.4274,x:45.2,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:82.6891,y:49.7,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:121.0367,x:53.8,y:129.8}},{t:this.instance_11,p:{rotation:83.3638,x:45.25,scaleX:0.9983,scaleY:0.9983,y:136.6,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0947,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.834,x:0.7,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-109.3281,y:54.9,x:-69.65,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-92.5683,x:-44.55,y:130.4,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-115.9073,x:-45.6,y:139.3,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5644,x:-56.95,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9138,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:92.4256,x:45.2,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:82.5691,y:49.65,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.9181,x:54.1,y:129.65}},{t:this.instance_11,p:{rotation:83.2439,x:45.6,scaleX:0.9984,scaleY:0.9984,y:136.6,regY:3.1}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0928,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.7176,x:0.65,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-108.967,y:54.85,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-92.2064,x:-45,y:130.55,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-115.5468,x:-46.15,y:139.55,regY:-1.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5572,x:-56.95,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9138,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.423,x:45.2,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:82.449,y:49.65,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.7975,x:54.15,y:129.7}},{t:this.instance_11,p:{rotation:83.1238,x:45.75,scaleX:0.9983,scaleY:0.9983,y:136.65,regY:3.1}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0902,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.6028,x:0.65,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-108.6067,y:54.9,x:-69.75,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-91.8463,x:-45.5,y:130.75,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-115.1851,x:-46.7,y:139.55,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5492,x:-56.95,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9138,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:92.4212,x:45.2,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.7,scaleX:0.9984,scaleY:0.9984,rotation:82.3289,y:49.8,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.6781,x:54.25,y:129.7}},{t:this.instance_11,p:{rotation:83.0039,x:45.75,scaleX:0.9983,scaleY:0.9983,y:136.65,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0883,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.4863,x:0.7,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-108.2458,y:54.85,x:-69.75,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-91.4853,x:-46,y:130.9,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-114.8257,x:-47.25,y:139.75,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5412,x:-56.95,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:92.4186,x:45.2,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.7,scaleX:0.9984,scaleY:0.9984,rotation:82.2095,y:49.8,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.558,x:54.45,y:129.65}},{t:this.instance_11,p:{rotation:82.8848,x:45.95,scaleX:0.9983,scaleY:0.9983,y:136.65,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0858,x:-5.05,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.3698,x:0.65,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-107.8847,y:54.85,x:-69.75,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-91.1245,x:-46.4,y:131,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-114.4643,x:-47.8,y:139.9,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5322,x:-56.95,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:92.4169,x:45.3,y:-26.6,regY:-0.2}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:82.0902,y:49.65,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.4383,x:54.7,y:129.55}},{t:this.instance_11,p:{rotation:82.7647,x:46.15,scaleX:0.9983,scaleY:0.9983,y:136.65,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0837,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.2541,x:0.7,y:-78.9,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-107.5249,y:54.85,x:-69.75,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-90.7636,x:-46.95,y:131.15,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-114.104,x:-48.25,y:139.9,regY:-1.4,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5252,x:-56.95,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.4142,x:45.2,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:81.971,y:49.65,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.319,x:54.8,y:129.6}},{t:this.instance_11,p:{rotation:82.6456,x:46.45,scaleX:0.9984,scaleY:0.9983,y:136.55,regY:3.1}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0811,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.1377,x:0.7,y:-78.9,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-107.1645,y:54.85,x:-69.75,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-90.4037,x:-47.4,y:131.3,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.7416,x:-48.85,y:140.1,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5163,x:-56.95,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.4125,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.7,scaleX:0.9984,scaleY:0.9984,rotation:81.8506,y:49.8,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.1993,x:55,y:129.45}},{t:this.instance_11,p:{rotation:82.5253,x:46.5,scaleX:0.9983,scaleY:0.9983,y:136.55,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2033,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0794,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.0211,x:0.65,y:-78.9,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-106.8033,y:54.9,x:-69.75,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-90.042,x:-47.95,y:131.45,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.3811,x:-49.35,y:140.35,regY:-1.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5092,x:-56.95,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.4099,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.7,scaleX:0.9984,scaleY:0.9984,rotation:81.7303,y:49.8,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.0789,x:55.1,y:129.55}},{t:this.instance_11,p:{rotation:82.4062,x:46.75,scaleX:0.9983,scaleY:0.9983,y:136.55,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2024,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0767,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7268,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.9056,x:0.65,y:-78.9,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-106.4428,y:54.9,x:-69.75,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-89.6874,x:-48.45,y:131.6,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.0212,x:-49.95,y:140.4,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5012,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.4089,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:81.6117,y:49.65,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.9592,x:55.35,y:129.5}},{t:this.instance_11,p:{rotation:82.2869,x:46.9,scaleX:0.9983,scaleY:0.9983,y:136.6,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2024,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.075,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7259,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.7891,x:0.7,y:-78.9,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-106.0817,y:54.85,x:-69.75,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-89.3257,x:-48.95,y:131.7,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-112.66,x:-50.5,y:140.5,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4929,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.4063,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:81.4922,y:49.65,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.8392,x:55.5,y:129.55}},{t:this.instance_11,p:{rotation:82.1668,x:47.05,scaleX:0.9983,scaleY:0.9983,y:136.6,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2024,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0722,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7259,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.6745,x:0.65,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-105.7202,y:54.85,x:-69.8,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-88.9658,x:-49.45,y:131.85,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-112.2982,x:-51.2,y:140.7,regY:-1.6,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.485,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.4046,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.7,scaleX:0.9984,scaleY:0.9984,rotation:81.3717,y:49.8,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.7187,x:55.65,y:129.45}},{t:this.instance_11,p:{rotation:82.0474,x:47.35,scaleX:0.9983,scaleY:0.9983,y:136.55,regY:3.1}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2024,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0698,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7259,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.558,x:0.7,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-105.3594,y:54.9,x:-69.8,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-88.604,x:-49.85,y:132,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-111.9381,x:-51.65,y:140.7,regY:-1.5,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4771,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.4011,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:81.2522,y:49.6,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.8,scaleX:0.9984,scaleY:0.9984,rotation:119.5999,x:55.9,y:129.5}},{t:this.instance_11,p:{rotation:81.9272,x:47.4,scaleX:0.9983,scaleY:0.9983,y:136.5,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2024,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0686,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7257,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.4416,x:0.75,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-105,y:54.85,x:-69.8,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-88.244,x:-50.45,y:132.1,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-111.5779,x:-52.2,y:140.8,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4689,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3993,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:81.1325,y:49.65,regY:-0.6,x:43}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.4795,x:56.05,y:129.4}},{t:this.instance_11,p:{rotation:81.8086,x:47.6,scaleX:0.9983,scaleY:0.9983,y:136.5,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2024,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.066,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7257,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.3251,x:0.65,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-104.6376,y:54.85,x:-69.8,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-87.883,x:-50.95,y:132.25,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-111.2168,x:-52.85,y:141,regY:-1.6,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.461,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3976,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:81.0129,y:49.65,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.3607,x:56.2,y:129.35}},{t:this.instance_11,p:{rotation:81.6875,x:47.85,scaleX:0.9984,scaleY:0.9984,y:136.5,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2024,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0641,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7257,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.2096,x:0.65,y:-78.65,regX:1.1,regY:53}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-104.2767,y:54.9,x:-69.8,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-87.5219,x:-51.4,y:132.3,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-110.8549,x:-53.25,y:141,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4531,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3958,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.8923,y:49.65,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.2404,x:56.25,y:129.4}},{t:this.instance_11,p:{rotation:81.5687,x:48.1,scaleX:0.9983,scaleY:0.9983,y:136.5,regY:3.1}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2024,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0605,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7257,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.0931,x:0.7,y:-78.65,regX:1.1,regY:53}},{t:this.instance_3,p:{regX:39.6,scaleX:0.9983,scaleY:0.9983,rotation:-103.9173,y:54.8,x:-69.95,regY:1}},{t:this.instance_2,p:{regY:-8.8,rotation:-87.1625,x:-51.9,y:132.4,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-110.495,x:-53.85,y:141,regY:-1.5,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4448,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3932,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.7733,y:49.6,regY:-0.6,x:43}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.1203,x:56.45,y:129.3}},{t:this.instance_11,p:{rotation:81.4484,x:48.25,scaleX:0.9984,scaleY:0.9984,y:136.4,regY:3.1}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2024,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0588,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7257,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9767,x:0.65,y:-78.65,regX:1.1,regY:53}},{t:this.instance_3,p:{regX:39.6,scaleX:0.9983,scaleY:0.9983,rotation:-103.5549,y:54.75,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-86.8011,x:-52.35,y:132.55,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-110.1347,x:-54.35,y:141.25,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4369,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3914,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.6536,y:49.6,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.2,regY:7.8,scaleX:0.9984,scaleY:0.9984,rotation:119.0016,x:56.8,y:129.35}},{t:this.instance_11,p:{rotation:81.3279,x:48.3,scaleX:0.9984,scaleY:0.9984,y:136.45,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7679,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2015,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0561,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7257,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.8621,x:0.7,y:-78.65,regX:1.1,regY:53}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-103.1949,y:54.85,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,rotation:-86.4407,x:-52.75,y:132.65,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-109.7728,x:-55,y:141.35,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.429,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3897,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.5338,y:49.6,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:118.8817,x:56.8,y:129.3}},{t:this.instance_11,p:{rotation:81.21,x:48.5,scaleX:0.9983,scaleY:0.9983,y:136.5,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7671,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2015,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0544,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7257,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.7457,x:0.75,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-102.8352,y:54.85,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-86.079,x:-53.35,y:132.75,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-109.4132,x:-55.5,y:141.4,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4201,x:-56.85,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3862,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.4147,y:49.6,regY:-0.6,x:43}},{t:this.instance_12,p:{regX:-6.2,regY:7.8,scaleX:0.9984,scaleY:0.9984,rotation:118.7618,x:57.05,y:129.25}},{t:this.instance_11,p:{rotation:81.0902,x:48.75,scaleX:0.9983,scaleY:0.9983,y:136.4,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7671,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2015,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0516,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7257,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.6293,x:0.7,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-102.4738,y:54.85,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-85.7191,x:-53.85,y:132.85,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-109.0525,x:-56.05,y:141.55,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4129,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3844,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.2948,y:49.65,regY:-0.5,x:42.95}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:118.6418,x:57.2,y:129.2}},{t:this.instance_11,p:{rotation:80.9699,x:48.9,scaleX:0.9983,scaleY:0.9983,y:136.4,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7671,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2015,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0499,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7257,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.5129,x:0.65,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-102.1126,y:54.85,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-85.3589,x:-54.35,y:133.1,scaleX:0.9984,scaleY:0.9984,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-108.6909,x:-56.6,y:141.75,regY:-1.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4041,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3818,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.1749,y:49.6,regY:-0.5,x:42.85}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:118.5211,x:57.4,y:129.1}},{t:this.instance_11,p:{rotation:80.8501,x:49.05,scaleX:0.9983,scaleY:0.9983,y:136.4,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7671,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2015,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0471,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7257,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.3973,x:0.7,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-101.7515,y:54.9,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-84.9978,x:-54.9,y:133.2,scaleX:0.9984,scaleY:0.9984,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-108.3308,x:-57.2,y:141.65,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.3959,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.38,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.0548,y:49.6,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:118.4016,x:57.45,y:129.1}},{t:this.instance_11,p:{rotation:80.7312,x:49.2,scaleX:0.9984,scaleY:0.9983,y:136.4,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7671,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2015,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0454,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7257,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.2809,x:0.7,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-101.3907,y:54.9,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-84.6364,x:-55.45,y:133.3,scaleX:0.9984,scaleY:0.9984,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-107.9695,x:-57.7,y:141.6,regY:-1.5,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.388,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9129,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3774,x:45.15,y:-26.65,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.9358,y:49.6,regY:-0.5,x:42.95}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:118.2821,x:57.7,y:129.15}},{t:this.instance_11,p:{rotation:80.6104,x:49.4,scaleX:0.9983,scaleY:0.9983,y:136.35,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7671,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2015,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0427,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7257,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.1654,x:0.7,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-101.0308,y:54.9,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-84.2764,x:-55.95,y:133.35,scaleX:0.9984,scaleY:0.9984,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-107.6091,x:-58.25,y:141.8,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.3801,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.912,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3757,x:45.15,y:-26.65,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.8155,y:49.6,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:118.163,x:57.85,y:129.15}},{t:this.instance_11,p:{rotation:80.4916,x:49.65,scaleX:0.9984,scaleY:0.9984,y:136.45,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7671,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2015,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0411,x:-5.05,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7249,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.0481,x:0.75,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-100.6696,y:54.85,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-83.9155,x:-56.45,y:133.35,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-107.2476,x:-58.8,y:141.85,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.371,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.912,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.373,x:45.15,y:-26.65,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.6963,y:49.65,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.2,regY:7.8,scaleX:0.9984,scaleY:0.9984,rotation:118.0432,x:58.1,y:129.15}},{t:this.instance_11,p:{rotation:80.3717,x:49.8,scaleX:0.9983,scaleY:0.9983,y:136.35,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7671,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2015,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0382,x:-5.05,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7249,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.0621,x:0.75,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-100.3082,y:54.85,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-83.5534,x:-57,y:133.4,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-106.8879,x:-59.5,y:141.95,regY:-1.6,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.3639,x:-56.85,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.912,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3713,x:45.15,y:-26.65,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.5761,y:49.6,regY:-0.5,x:42.95}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:117.9229,x:58.2,y:129}},{t:this.instance_11,p:{rotation:80.2518,x:49.95,scaleX:0.9983,scaleY:0.9983,y:136.35,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7671,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2007,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0365,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7249,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:0.1785,x:0.7,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-99.9478,y:54.85,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,rotation:-83.1937,x:-57.35,y:133.5,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-106.5256,x:-60.1,y:142.05,regY:-1.6,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.3559,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.912,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3687,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.456,y:49.6,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:117.803,x:58.35,y:128.95}},{t:this.instance_11,p:{rotation:80.1327,x:50.15,scaleX:0.9983,scaleY:0.9983,y:136.35,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7671,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2007,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0338,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7249,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:0.2949,x:0.75,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-99.5879,y:54.85,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,rotation:-82.8329,x:-57.85,y:133.55,scaleX:0.9983,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-106.1658,x:-60.55,y:141.9,regY:-1.5,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.3478,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.912,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3669,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.3374,y:49.6,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:117.6839,x:58.5,y:128.9}},{t:this.instance_11,p:{rotation:80.0135,x:50.35,scaleX:0.9983,scaleY:0.9983,y:136.3,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7671,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2007,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0329,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7249,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:0.4113,x:0.7,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-99.2256,y:54.85,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-82.4725,x:-58.5,y:133.65,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-105.8049,x:-61.1,y:142.15,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.339,x:-56.85,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.912,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3643,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.2171,y:49.6,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:117.5637,x:58.75,y:128.85}},{t:this.instance_11,p:{rotation:79.8934,x:50.5,scaleX:0.9983,scaleY:0.9983,y:136.3,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7671,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2007,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0301,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7249,x:-23.75,y:189.35,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:0.526,x:0.6,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-98.8657,y:54.9,x:-69.9,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-82.1113,x:-58.95,y:133.7,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-105.4446,x:-61.6,y:142.15,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.331,x:-56.85,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.912,x:-16.8,y:92.6}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3625,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.0976,y:49.65,regY:-0.5,x:42.95}},{t:this.instance_12,p:{regX:-6.2,regY:7.8,scaleX:0.9984,scaleY:0.9984,rotation:117.4443,x:58.9,y:128.9}},{t:this.instance_11,p:{rotation:79.7732,x:50.7,scaleX:0.9983,scaleY:0.9983,y:136.25,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7671,x:17.75,y:91.6}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.2007,x:24.45,y:186.85,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0284,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7249,x:-23.7,y:189.35,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:0.6433,x:0.65,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-98.505,y:54.85,x:-69.95,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-81.7505,x:-59.45,y:133.8,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-105.0836,x:-62.3,y:142.35,regY:-1.6,regX:6.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.3229,x:-56.85,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9068,x:-16.8,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.359,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.2118,y:49.65,regY:-0.5,x:42.95}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:117.5586,x:58.75,y:128.85}},{t:this.instance_11,p:{rotation:79.8845,x:50.55,scaleX:0.9983,scaleY:0.9983,y:136.3,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.77,x:17.8,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1954,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0284,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7205,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:0.5094,x:0.65,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-98.8834,y:54.9,x:-69.9,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-82.1326,x:-58.95,y:133.7,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-105.4703,x:-61.7,y:142.25,regY:-1.6,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.3327,x:-56.85,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.9015,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3555,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.3248,y:49.55,regY:-0.5,x:42.95}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:117.6742,x:58.55,y:128.9}},{t:this.instance_11,p:{rotation:79.9958,x:50.35,scaleX:0.9984,scaleY:0.9984,y:136.35,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7726,x:17.8,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1902,x:24.55,y:186.9,regX:2.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0284,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.717,x:-23.75,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:0.3772,x:0.7,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-99.2595,y:54.85,x:-69.9,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-82.515,x:-58.4,y:133.65,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-105.8553,x:-61,y:142.1,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.3416,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8962,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.352,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.4382,y:49.6,regY:-0.5,x:42.95}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:117.7886,x:58.35,y:128.9}},{t:this.instance_11,p:{rotation:80.1068,x:50.2,scaleX:0.9983,scaleY:0.9983,y:136.3,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7752,x:17.8,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.184,x:24.4,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0284,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7126,x:-23.7,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:0.2442,x:0.7,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.6,scaleX:0.9983,scaleY:0.9983,rotation:-99.6385,y:54.75,x:-69.9,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-82.8946,x:-57.85,y:133.55,scaleX:0.9983,scaleY:0.9983,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-106.2413,x:-60.5,y:141.9,regY:-1.5,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.3514,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.891,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3485,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.5521,y:49.6,regY:-0.5,x:42.9}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:117.9033,x:58.3,y:129.05}},{t:this.instance_11,p:{rotation:80.2178,x:50,scaleX:0.9983,scaleY:0.9983,y:136.35,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7788,x:17.8,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1779,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0284,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7083,x:-23.7,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:0.1103,x:0.7,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.6,scaleX:0.9983,scaleY:0.9983,rotation:-100.0153,y:54.75,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-83.2776,x:-57.35,y:133.55,scaleX:0.9984,scaleY:0.9984,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-106.6279,x:-59.9,y:142.05,regY:-1.6,regX:6.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.3603,x:-56.85,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8849,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:92.345,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.667,y:49.6,regY:-0.5,x:42.95}},{t:this.instance_12,p:{regX:-6.3,regY:7.8,scaleX:0.9984,scaleY:0.9984,rotation:118.0193,x:58.2,y:129.05}},{t:this.instance_11,p:{rotation:80.3282,x:49.9,scaleX:0.9983,scaleY:0.9983,y:136.4,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7813,x:17.8,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1718,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0284,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7047,x:-23.7,y:189.45,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-0.0175,x:0.65,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-100.3945,y:54.85,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-83.66,x:-56.85,y:133.45,scaleX:0.9983,scaleY:0.9983,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-107.0142,x:-59.35,y:142,regY:-1.6,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.3693,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8796,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:92.3423,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.7808,y:49.6,regY:-0.6,x:43}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:118.1337,x:57.95,y:129.1}},{t:this.instance_11,p:{rotation:80.4392,x:49.7,scaleX:0.9983,scaleY:0.9983,y:136.45,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7849,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1656,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0284,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7004,x:-23.55,y:189.4,regX:3.1,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.1514,x:0.75,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-100.7703,y:54.85,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-84.0424,x:-56.25,y:133.3,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-107.4011,x:-58.75,y:141.95,regY:-1.6,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.3773,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8743,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:92.3388,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:79.8947,y:49.6,regY:-0.5,x:42.95}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:118.2484,x:57.8,y:129.1}},{t:this.instance_11,p:{rotation:80.5502,x:49.55,scaleX:0.9984,scaleY:0.9984,y:136.4,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7875,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1604,x:24.45,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0286,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6961,x:-23.55,y:189.4,regX:3.1,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.2836,x:0.7,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-101.1502,y:54.85,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-84.4243,x:-55.75,y:133.25,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-107.7873,x:-58.05,y:141.75,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.388,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8673,x:-16.8,y:92.7}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:92.3353,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.0077,y:49.6,regY:-0.5,x:42.95}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:118.3636,x:57.65,y:129.1}},{t:this.instance_11,p:{rotation:80.6611,x:49.35,scaleX:0.9983,scaleY:0.9983,y:136.4,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.791,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1542,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0286,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6924,x:-23.55,y:189.4,regX:3.1,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.4166,x:0.75,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-101.5272,y:54.85,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-84.8053,x:-55.25,y:133.1,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-108.1732,x:-57.4,y:141.75,regY:-1.4,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.3969,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8621,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:92.3318,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.1215,y:49.6,regY:-0.5,x:42.95}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:118.4784,x:57.55,y:129.1}},{t:this.instance_11,p:{rotation:80.7721,x:49.2,scaleX:0.9984,scaleY:0.9984,y:136.4,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7938,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.149,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0286,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6881,x:-23.5,y:189.4,regX:3.1,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.5496,x:0.7,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-101.9045,y:54.85,x:-69.9,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-85.1876,x:-54.7,y:133.05,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-108.5599,x:-56.8,y:141.75,regY:-1.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4057,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8568,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9983,rotation:92.3283,x:45.1,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.2354,y:49.65,regY:-0.5,x:42.95}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:118.5928,x:57.25,y:129.25}},{t:this.instance_11,p:{rotation:80.881,x:49.15,scaleX:0.9983,scaleY:0.9983,y:136.35,regY:3.1}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.7971,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1428,x:24.55,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0286,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6837,x:-23.55,y:189.4,regX:3.1,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.6835,x:0.75,y:-78.75,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-102.2835,y:54.9,x:-69.95,regY:1}},{t:this.instance_2,p:{regY:-8.8,rotation:-85.5689,x:-54.2,y:133,scaleX:0.9984,scaleY:0.9984,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-108.945,x:-56.35,y:141.55,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4155,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8507,x:-16.8,y:92.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3248,x:45.1,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.35,y:49.65,regY:-0.6,x:43.05}},{t:this.instance_12,p:{regX:-6.2,regY:7.8,scaleX:0.9984,scaleY:0.9984,rotation:118.7084,x:57.25,y:129.25}},{t:this.instance_11,p:{rotation:80.9929,x:48.9,scaleX:0.9983,scaleY:0.9983,y:136.45,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.8,x:17.75,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1367,x:24.6,y:186.9,regX:2.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0286,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.681,x:-23.6,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.8166,x:0.65,y:-78.65,regX:1.1,regY:53}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-102.6604,y:54.95,x:-69.95,regY:1}},{t:this.instance_2,p:{regY:-8.7,rotation:-85.9509,x:-53.5,y:132.85,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-109.3303,x:-55.8,y:141.5,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4237,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8454,x:-16.8,y:92.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3222,x:45.1,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.4635,y:49.7,regY:-0.5,x:43}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:118.8237,x:57,y:129.3}},{t:this.instance_11,p:{rotation:81.1046,x:48.7,scaleX:0.9983,scaleY:0.9983,y:136.45,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.8034,x:17.8,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1314,x:24.55,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0286,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6758,x:-23.6,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9487,x:0.7,y:-78.65,regX:1.1,regY:53}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-103.0375,y:54.9,x:-69.95,regY:1}},{t:this.instance_2,p:{regY:-8.8,rotation:-86.3327,x:-53.1,y:132.7,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-109.7182,x:-55.1,y:141.4,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4335,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8402,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3187,x:45.1,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.5764,y:49.65,regY:-0.5,x:43.05}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:118.9377,x:56.9,y:129.3}},{t:this.instance_11,p:{rotation:81.2154,x:48.6,scaleX:0.9983,scaleY:0.9983,y:136.5,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.8061,x:17.8,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1253,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0286,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6722,x:-23.6,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.0818,x:0.65,y:-78.65,regX:1.1,regY:53}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-103.4156,y:54.9,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-86.7135,x:-52.6,y:132.6,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-110.1045,x:-54.55,y:141.25,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4424,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.834,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3152,x:45.1,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.6909,y:49.6,regY:-0.5,x:43}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.053,x:56.7,y:129.3}},{t:this.instance_11,p:{rotation:81.3252,x:48.35,scaleX:0.9983,scaleY:0.9983,y:136.45,regY:3.2}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.8088,x:17.8,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1192,x:24.55,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0301,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6687,x:-23.55,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.2148,x:0.65,y:-78.65,regX:1.1,regY:53}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-103.793,y:54.9,x:-69.8,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,rotation:-87.0958,x:-51.95,y:132.45,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-110.4911,x:-54.1,y:141.05,regY:-1.5,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4522,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8288,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3117,x:45.1,y:-26.65,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.8044,y:49.65,regY:-0.5,x:43.05}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.1682,x:56.55,y:129.3}},{t:this.instance_11,p:{rotation:81.4369,x:48.35,scaleX:0.9984,scaleY:0.9984,y:136.45,regY:3.1}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.8122,x:17.8,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1139,x:24.5,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0301,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6643,x:-23.55,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.3479,x:0.65,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-104.1711,y:54.85,x:-69.8,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-87.4772,x:-51.55,y:132.35,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-110.8762,x:-53.35,y:141.2,regY:-1.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.461,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8235,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3082,x:45.1,y:-26.65,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:80.9189,y:49.65,regY:-0.6,x:43.1}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.2835,x:56.4,y:129.4}},{t:this.instance_11,p:{rotation:81.5475,x:48.15,scaleX:0.9984,scaleY:0.9984,y:136.45,regY:3.1}},{t:this.instance_10,p:{regX:-1.3,scaleX:0.9976,scaleY:0.9976,rotation:-6.8149,x:17.8,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1078,x:24.6,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0301,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6599,x:-23.6,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.4818,x:0.7,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-104.549,y:54.85,x:-69.8,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-87.8602,x:-51.05,y:132.2,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-111.2623,x:-53,y:141,regY:-1.6,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4689,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8174,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.3047,x:45.1,y:-26.65,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:81.0323,y:49.6,regY:-0.5,x:43.05}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.3975,x:56.3,y:129.35}},{t:this.instance_11,p:{rotation:81.6582,x:47.9,scaleX:0.9984,scaleY:0.9984,y:136.45,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8184,x:17.9,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.1025,x:24.55,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0301,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6564,x:-23.5,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.6149,x:0.7,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-104.9265,y:54.85,x:-69.8,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-88.2413,x:-50.55,y:132.15,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-111.6498,x:-52.25,y:140.9,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4787,x:-56.9,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8121,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.302,x:45.1,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:81.1458,y:49.6,regY:-0.5,x:43.05}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.5132,x:56.1,y:129.4}},{t:this.instance_11,p:{rotation:81.7697,x:47.7,scaleX:0.9983,scaleY:0.9983,y:136.5,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8201,x:17.9,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0964,x:24.6,y:186.85,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0301,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6521,x:-23.5,y:189.4,regX:3,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-1.7489,x:0.7,y:-78.9,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.6,scaleX:0.9983,scaleY:0.9983,rotation:-105.304,y:54.75,x:-69.85,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-88.6233,x:-49.95,y:131.95,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-112.0358,x:-51.75,y:140.7,regY:-1.5,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4885,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8069,x:-16.8,y:92.65}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2985,x:45.1,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:81.2601,y:49.65,regY:-0.5,x:43.05}},{t:this.instance_12,p:{regX:-6.2,regY:7.8,scaleX:0.9984,scaleY:0.9984,rotation:119.6274,x:56.05,y:129.45}},{t:this.instance_11,p:{rotation:81.8803,x:47.55,scaleX:0.9983,scaleY:0.9983,y:136.5,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8238,x:17.9,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0903,x:24.6,y:186.85,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0301,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6476,x:-23.45,y:189.4,regX:3.1,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.8802,x:0.7,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-105.6817,y:54.9,x:-69.75,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-89.0043,x:-49.45,y:131.85,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-112.4217,x:-51.1,y:140.65,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.4976,x:-56.9,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.8007,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.295,x:45.1,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.7,scaleX:0.9984,scaleY:0.9984,rotation:81.3735,y:49.8,regY:-0.5,x:43.05}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.7423,x:55.75,y:129.55}},{t:this.instance_11,p:{rotation:81.9909,x:47.5,scaleX:0.9983,scaleY:0.9983,y:136.55,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8273,x:17.95,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.085,x:24.7,y:186.9,regX:2.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0301,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6442,x:-23.4,y:189.4,regX:3.1,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.0133,x:0.65,y:-78.9,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-106.0596,y:54.85,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-89.387,x:-48.95,y:131.7,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-112.8084,x:-50.6,y:140.55,regY:-1.6,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5065,x:-56.95,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7955,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2915,x:45.1,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:81.4877,y:49.6,regY:-0.6,x:43.15}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.8572,x:55.7,y:129.5}},{t:this.instance_11,p:{rotation:82.1014,x:47.35,scaleX:0.9983,scaleY:0.9983,y:136.6,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8309,x:17.95,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0789,x:24.55,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.0301,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6397,x:-23.35,y:189.4,regX:3.1,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.1464,x:0.65,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-106.4373,y:54.9,x:-69.75,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-89.7697,x:-48.4,y:131.6,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.1947,x:-50.05,y:140.4,regY:-1.6,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5145,x:-56.95,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7902,x:-16.8,y:92.65}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.288,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:81.601,y:49.7,regY:-0.5,x:43.05}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:119.9725,x:55.45,y:129.55}},{t:this.instance_11,p:{rotation:82.2126,x:47.05,scaleX:0.9983,scaleY:0.9983,y:136.6,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8334,x:18,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0727,x:24.6,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.031,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6353,x:-23.4,y:189.4,regX:3.1,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.2795,x:0.65,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-106.8152,y:54.9,x:-69.75,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-90.1462,x:-47.9,y:131.45,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.5812,x:-49.3,y:140.35,regY:-1.4,regX:6.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5252,x:-56.95,y:-23.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7841,x:-16.8,y:92.65}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2845,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.7,scaleX:0.9984,scaleY:0.9984,rotation:81.7152,y:49.8,regY:-0.5,x:43.1}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.0879,x:55.4,y:129.55}},{t:this.instance_11,p:{rotation:82.324,x:46.95,scaleX:0.9984,scaleY:0.9983,y:136.6,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8371,x:18,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0675,x:24.6,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.031,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6318,x:-23.35,y:189.45,regX:3.1,regY:-54.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.4136,x:0.7,y:-78.85,regX:1.2,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-107.1933,y:54.9,x:-69.75,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-90.5289,x:-47.4,y:131.3,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.9679,x:-48.7,y:140.05,regY:-1.4,regX:6.3}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.5333,x:-56.95,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7788,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.281,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.7,scaleX:0.9984,scaleY:0.9984,rotation:81.8285,y:49.8,regY:-0.5,x:43}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.2032,x:55.2,y:129.45}},{t:this.instance_11,p:{rotation:82.4345,x:46.7,scaleX:0.9984,scaleY:0.9984,y:136.6,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8397,x:18,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0613,x:24.6,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.031,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6274,x:-23.5,y:189.55,regX:3,regY:-54.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.5459,x:0.7,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-107.5709,y:54.85,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-90.9099,x:-46.85,y:131.15,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-114.3526,x:-48.25,y:139.95,regY:-1.5,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.542,x:-56.95,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7736,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2784,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:81.9435,y:49.65,regY:-0.5,x:43.1}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.319,x:55.05,y:129.6}},{t:this.instance_11,p:{rotation:82.544,x:46.7,scaleX:0.9983,scaleY:0.9983,y:136.6,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8423,x:18,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0561,x:24.6,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.031,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6231,x:-23.5,y:189.55,regX:3,regY:-54.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-2.6781,x:0.65,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-107.9481,y:54.9,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-91.2909,x:-46.35,y:131,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-114.7391,x:-47.6,y:140,regY:-1.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5517,x:-56.95,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7675,x:-16.85,y:92.65}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2749,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:82.0565,y:49.7,regY:-0.6,x:43.1}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.4329,x:54.85,y:129.6}},{t:this.instance_11,p:{rotation:82.6562,x:46.5,scaleX:0.9983,scaleY:0.9983,y:136.6,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8458,x:18,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0499,x:24.6,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.031,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6195,x:-23.45,y:189.55,regX:3,regY:-54.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.8113,x:0.7,y:-78.8,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.6,scaleX:0.9983,scaleY:0.9983,rotation:-108.3278,y:54.75,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-91.6737,x:-45.85,y:130.85,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-115.1263,x:-47.05,y:139.7,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5599,x:-56.95,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7622,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2714,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:82.1706,y:49.75,regY:-0.5,x:43.1}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.547,x:54.75,y:129.65}},{t:this.instance_11,p:{rotation:82.7674,x:46.25,scaleX:0.9983,scaleY:0.9983,y:136.65,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8492,x:17.95,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0438,x:24.65,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.031,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6151,x:-23.45,y:189.6,regX:3,regY:-54.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.9445,x:0.65,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-108.7041,y:54.9,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-92.0548,x:-45.35,y:130.65,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-115.5115,x:-46.45,y:139.6,regY:-1.5,regX:6.2}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5688,x:-56.95,y:-23.05}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7569,x:-16.9,y:92.7}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2679,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.7,scaleX:0.9984,scaleY:0.9984,rotation:82.2838,y:49.85,regY:-0.5,x:43.05}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.6628,x:54.55,y:129.75}},{t:this.instance_11,p:{rotation:82.8787,x:46.1,scaleX:0.9983,scaleY:0.9983,y:136.65,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8529,x:17.95,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0386,x:24.65,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.031,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6107,x:-23.5,y:189.55,regX:3,regY:-54.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.0777,x:0.7,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-109.0819,y:54.9,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-92.4378,x:-44.85,y:130.5,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-115.8979,x:-45.95,y:139.4,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5786,x:-56.95,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7508,x:-16.9,y:92.7}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2644,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:82.3977,y:49.7,regY:-0.5,x:43.1}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.7771,x:54.4,y:129.65}},{t:this.instance_11,p:{rotation:82.9881,x:45.9,scaleX:0.9983,scaleY:0.9983,y:136.65,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8547,x:17.95,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0324,x:24.75,y:186.9,regX:2.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.031,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6072,x:-23.45,y:189.55,regX:3,regY:-54.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.2109,x:0.6,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-109.4608,y:54.85,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-92.8183,x:-44.2,y:130.35,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-116.2842,x:-45.45,y:139.1,regY:-1.5,regX:6.4}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5884,x:-57,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7455,x:-16.85,y:92.7}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2609,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:82.5117,y:49.75,regY:-0.5,x:43.05}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:120.8926,x:54.35,y:129.75}},{t:this.instance_11,p:{rotation:83.0992,x:45.85,scaleX:0.9983,scaleY:0.9983,y:136.6,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8582,x:17.95,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0272,x:24.7,y:186.9,regX:2.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.031,x:-5,y:-58.15,scaleX:0.999,scaleY:0.999}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.6029,x:-23.45,y:189.55,regX:3,regY:-54.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.3442,x:0.65,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-109.8378,y:54.9,x:-69.65,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,rotation:-93.2006,x:-43.65,y:130.2,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-116.6712,x:-44.8,y:139.15,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.5973,x:-57,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7403,x:-16.9,y:92.7}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2573,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:82.6265,y:49.7,regY:-0.5,x:43.1}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:121.0069,x:54.15,y:129.75}},{t:this.instance_11,p:{rotation:83.2103,x:45.7,scaleX:0.9983,scaleY:0.9983,y:136.6,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8609,x:17.95,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.021,x:24.65,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.032,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.5984,x:-23.4,y:189.55,regX:3,regY:-54.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.4775,x:0.6,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-110.2154,y:54.85,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-93.5831,x:-43.25,y:130,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-117.0579,x:-44.25,y:138.95,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.6063,x:-56.9,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7342,x:-16.85,y:92.75}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2547,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:82.7403,y:49.7,regY:-0.5,x:43.1}},{t:this.instance_12,p:{regX:-6.2,regY:7.8,scaleX:0.9984,scaleY:0.9984,rotation:121.1223,x:54.1,y:129.75}},{t:this.instance_11,p:{rotation:83.3206,x:45.5,scaleX:0.9983,scaleY:0.9983,y:136.6,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8644,x:17.95,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0149,x:24.65,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.032,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.5949,x:-23.3,y:189.55,regX:3.1,regY:-54.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-3.6099,x:0.65,y:-78.7,regX:1.1,regY:53}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-110.5945,y:54.9,x:-69.65,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-93.9639,x:-42.8,y:129.85,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-117.443,x:-43.7,y:138.8,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.615,x:-56.95,y:-23}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7289,x:-16.85,y:92.75}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2512,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.7,scaleX:0.9984,scaleY:0.9984,rotation:82.8534,y:49.8,regY:-0.5,x:43.15}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:121.2371,x:53.75,y:129.8}},{t:this.instance_11,p:{rotation:83.4317,x:45.25,scaleX:0.9983,scaleY:0.9983,y:136.65,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8671,x:18,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0096,x:24.65,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.032,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.5906,x:-23.35,y:189.55,regX:3.1,regY:-54.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.7422,x:0.55,y:-78.7,regX:1.1,regY:53}},{t:this.instance_3,p:{regX:39.5,scaleX:0.9983,scaleY:0.9983,rotation:-110.9712,y:54.9,x:-69.6,regY:1.1}},{t:this.instance_2,p:{regY:-8.7,rotation:-94.3459,x:-42.1,y:129.65,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-117.8294,x:-43.1,y:138.6,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-79.624,x:-56.95,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7236,x:-16.8,y:92.75}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2477,x:45.25,y:-26.6,regY:-0.2}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:82.9672,y:49.7,regY:-0.5,x:43.1}},{t:this.instance_12,p:{regX:-6.3,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:121.3535,x:53.7,y:129.75}},{t:this.instance_11,p:{rotation:83.5428,x:45.05,scaleX:0.9983,scaleY:0.9983,y:136.65,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8704,x:18,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0.0035,x:24.65,y:186.95,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.032,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.5861,x:-23.25,y:189.55,regX:3.1,regY:-54.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.8748,x:0.6,y:-78.85,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.6,scaleX:0.9983,scaleY:0.9983,rotation:-111.3488,y:54.8,x:-69.7,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-94.7281,x:-41.75,y:129.5,scaleX:0.9984,scaleY:0.9984,regX:5.5}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-118.2154,x:-42.4,y:138.35,regY:-1.4,regX:6.3}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.6329,x:-56.95,y:-22.95}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7175,x:-16.85,y:92.75}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.2442,x:45.15,y:-26.6,regY:-0.1}},{t:this.instance_13,p:{regX:-40.8,scaleX:0.9984,scaleY:0.9984,rotation:83.081,y:49.7,regY:-0.5,x:43.1}},{t:this.instance_12,p:{regX:-6.2,regY:7.9,scaleX:0.9984,scaleY:0.9984,rotation:121.4678,x:53.5,y:129.8}},{t:this.instance_11,p:{rotation:83.6528,x:44.9,scaleX:0.9983,scaleY:0.9983,y:136.65,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9976,scaleY:0.9976,rotation:-6.8732,x:18,y:91.65}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:0,x:24.75,y:186.9,regX:2.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,rotation:12.032,x:-5,y:-58.15,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.5826,x:-23.3,y:189.55,regX:3.1,regY:-54.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.0081,x:0.6,y:-78.9,regX:1.1,regY:52.9}},{t:this.instance_3,p:{regX:39.6,scaleX:0.9983,scaleY:0.9983,rotation:-111.7279,y:54.8,x:-69.65,regY:1.1}},{t:this.instance_2,p:{regY:-8.8,rotation:-95.1086,x:-41.2,y:129.45,scaleX:0.9984,scaleY:0.9984,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-118.6011,x:-41.9,y:138.35,regY:-1.5,regX:6.3}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.6418,x:-56.95,y:-22.95}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93.2,-217.2,178.5,521.8);


(lib.CharacterGood_04_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance_16 = new lib.ch1_uArm_rcopy2_3("synched",0);
	this.instance_16.setTransform(-55.75,-21.7,0.9982,0.9982,-98.6228,0,0,37.9,-0.1);

	this.instance_17 = new lib.ch1_hand_rcopy2_3("synched",0);
	this.instance_17.setTransform(-51.65,147.3,0.9981,0.9981,0,99.7345,-80.2655,6.3,-1.4);

	this.instance_18 = new lib.ch1_thumb_rcopy2_3("synched",0);
	this.instance_18.setTransform(-51.75,138.35,0.9983,0.9983,0,99.6328,-80.3672,5.3,-8.3);

	this.instance_19 = new lib.ch1_lArm_rcopy2_3("synched",0);
	this.instance_19.setTransform(-43.2,57.5,0.9983,0.9983,-83.3465,0,0,40.5,0.1);

	this.instance_20 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_20.setTransform(0.25,-76.8,0.9989,0.9989,0,0.5873,-179.4127,0.4,52.9);

	this.instance_21 = new lib.ch1_uBodycopy2_3("synched",0);
	this.instance_21.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_22 = new lib.ch1_lLeg_rcopy2_3("synched",0);
	this.instance_22.setTransform(-42.3,187.95,0.9981,0.9981,0,6.6609,-173.3391,2.9,-53.5);

	this.instance_23 = new lib.ch1_neckcopy2_3("synched",0);
	this.instance_23.setTransform(-5.8,-58,0.999,0.999,-0.1006,0,0,-1.4,8.8);

	this.instance_24 = new lib.ch1_lBodycopy2_3("synched",0);
	this.instance_24.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_25 = new lib.ch1_lLeg_lcopy2_3("synched",0);
	this.instance_25.setTransform(24.55,192.2,0.9979,0.9979,0,-2.5039,177.4961,2.5,-53.2);

	this.instance_26 = new lib.ch1_uLeg_lcopy2_3("synched",0);
	this.instance_26.setTransform(8.2,96.05,0.9979,0.9979,-8.4151,0,0,-1.9,2.1);

	this.instance_27 = new lib.ch1_uArm_lcopy2_3("synched",0);
	this.instance_27.setTransform(47.7,-26.55,0.9984,0.9984,92.9575,0,0,-31.4,-1.4);

	this.instance_28 = new lib.ch1_uLeg_rcopy2_3("synched",0);
	this.instance_28.setTransform(-20.6,92.25,0.9983,0.9983,12.4516,0,0,1.8,-45.8);

	this.instance_29 = new lib.ch1_hand_lcopy2_3("synched",0);
	this.instance_29.setTransform(-12.5,115.1,0.9982,0.9982,0,-56.0427,123.9573,-4.9,3.2);

	this.instance_30 = new lib.ch1_thumb_lcopy2_3("synched",0);
	this.instance_30.setTransform(-14.25,103.85,0.9984,0.9984,0,-79.8966,100.1034,-6.2,8);

	this.instance_31 = new lib.ch1_lArm_lcopy2_3("synched",0);
	this.instance_31.setTransform(44.75,48.2,0.9983,0.9983,134.1596,0,0,-39.6,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_31,p:{scaleX:0.9983,scaleY:0.9983,rotation:134.1596,x:44.75,y:48.2}},{t:this.instance_30,p:{scaleX:0.9984,scaleY:0.9984,skewX:-79.8966,skewY:100.1034,x:-14.25,y:103.85,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.2,skewX:-56.0427,skewY:123.9573,x:-12.5,y:115.1,regX:-4.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.8,rotation:12.4516,x:-20.6,y:92.25}},{t:this.instance_27,p:{regX:-31.4,rotation:92.9575,x:47.7,y:-26.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9979,scaleY:0.9979,rotation:-8.4151,y:96.05,x:8.2}},{t:this.instance_25,p:{scaleX:0.9979,scaleY:0.9979,skewX:-2.5039,skewY:177.4961,x:24.55,y:192.2,regX:2.5,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.4,rotation:-0.1006,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.9981,scaleY:0.9981,skewX:6.6609,skewY:-173.3391,y:187.95,regX:2.9,x:-42.3}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.4,skewX:0.5873,skewY:-179.4127,x:0.25,y:-76.8,regY:52.9}},{t:this.instance_19,p:{regY:0.1,scaleX:0.9983,scaleY:0.9983,rotation:-83.3465,x:-43.2,y:57.5,regX:40.5}},{t:this.instance_18,p:{regX:5.3,skewX:99.6328,skewY:-80.3672,x:-51.75,y:138.35,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,skewX:99.7345,skewY:-80.2655,x:-51.65,y:147.3}},{t:this.instance_16,p:{scaleX:0.9982,scaleY:0.9982,rotation:-98.6228,y:-21.7,x:-55.75,regX:37.9,regY:-0.1}}]}).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:133.7179,x:45.35,y:48.25}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-80.3296,skewY:99.6704,x:-13.1,y:104.3,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-56.469,skewY:123.531,x:-11.2,y:115.45,regX:-4.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.4551,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:92.3809,x:47.65,y:-26.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4199,y:96,x:8.2}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.5119,skewY:177.4881,x:24.5,y:192.15,regX:2.5,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0963,y:-57.95,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.664,skewY:-173.336,y:187.9,regX:2.9,x:-42.3}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:0.4691,skewY:-179.5309,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-77.1218,x:-46.85,y:57.95,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:105.8537,skewY:-74.1463,x:-64.05,y:137.35,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:105.9521,skewY:-74.0479,x:-64.9,y:146.35}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-96.0462,y:-21.65,x:-55.75,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:133.2762,x:46.15,y:48.2}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-80.7639,skewY:99.2361,x:-11.9,y:104.8,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-56.8966,skewY:123.1034,x:-9.95,y:116,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.4606,x:-20.6,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:91.8025,x:47.65,y:-26.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4261,y:96,x:8.2}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.5206,skewY:177.4794,x:24.6,y:192.15,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0936,y:-57.95,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.6675,skewY:-173.3325,y:187.9,regX:2.9,x:-42.3}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:0.351,skewY:-179.649,x:0.15,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-70.8948,x:-50.4,y:58.25,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:112.0756,skewY:-67.9244,x:-76.1,y:135.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:112.1703,skewY:-67.8297,x:-77.95,y:144.15}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.4681,y:-21.7,x:-55.75,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:132.8337,x:46.85,y:48.2}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-81.1982,skewY:98.8018,x:-10.7,y:105.2,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-57.323,skewY:122.677,x:-8.7,y:116.5,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.4659,x:-20.6,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:91.2252,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4323,y:96,x:8.2}},{t:this.instance_25,p:{scaleX:0.9979,scaleY:0.9979,skewX:-2.5294,skewY:177.4706,x:24.6,y:192.15,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0901,y:-57.95,x:-5.85,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.672,skewY:-173.328,y:187.9,regX:3,x:-42.4}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:0.2328,skewY:-179.7672,x:0.1,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-64.6712,x:-54.05,y:58.4,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:118.2984,skewY:-61.7016,x:-87.85,y:132.45,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:118.3897,skewY:-61.6103,x:-90.7,y:140.7}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-90.8917,y:-21.7,x:-55.75,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:132.3912,x:47.7,y:48.2}},{t:this.instance_30,p:{scaleX:0.9984,scaleY:0.9984,skewX:-81.6316,skewY:98.3684,x:-9.55,y:105.65,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-57.7487,skewY:122.2513,x:-7.35,y:116.9,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.4704,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:90.6463,x:47.65,y:-26.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4385,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.5382,skewY:177.4618,x:24.65,y:192.15,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0866,y:-57.95,x:-5.85,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.6764,skewY:-173.3236,y:187.9,regX:3,x:-42.45}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:0.1138,skewY:-179.8862,x:0.05,y:-76.8,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-58.4447,x:-57.65,y:58.45,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:124.5186,skewY:-55.4814,x:-99.35,y:128.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:124.6082,skewY:-55.3918,x:-103.05,y:136.4}},{t:this.instance_16,p:{scaleX:0.9982,scaleY:0.9982,rotation:-88.3189,y:-21.65,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:131.9496,x:48.35,y:48.2}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.0659,skewY:97.9341,x:-8.3,y:106.05,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.4,skewX:-58.1764,skewY:121.8236,x:-6,y:117.45,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.4757,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:90.0701,x:47.65,y:-26.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4447,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.5478,skewY:177.4522,x:24.65,y:192.15,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0831,y:-57.95,x:-5.85,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.6798,skewY:-173.3202,y:187.9,regX:3,x:-42.45}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:0,skewY:180,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-52.219,x:-61.25,y:58.2,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:130.741,skewY:-49.259,x:-110.2,y:123.05,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:130.8257,skewY:-49.1743,x:-114.85,y:130.75}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-85.7418,y:-21.55,x:-55.7,regX:37.8,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:131.5081,x:49.15,y:48.2}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.4989,skewY:97.5011,x:-7.1,y:106.5,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-58.6038,skewY:121.3962,x:-4.8,y:117.75,regX:-4.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_28,p:{regX:1.7,rotation:12.4812,x:-20.6,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:89.4965,x:47.7,y:-26.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4501,y:96,x:8.2}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.5566,skewY:177.4434,x:24.65,y:192.15,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0796,y:-57.95,x:-5.85,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.6843,skewY:-173.3157,y:187.9,regX:3,x:-42.45}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.1182,skewY:179.8818,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-45.9929,x:-64.7,y:57.85,regX:40.6}},{t:this.instance_18,p:{regX:5.3,skewX:136.9641,skewY:-43.0359,x:-120.55,y:116.95,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:137.0452,skewY:-42.9548,x:-126,y:124.2}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9982,rotation:-83.1658,y:-21.55,x:-55.75,regX:37.8,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:131.0649,x:49.9,y:48.2}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.9341,skewY:97.0659,x:-5.9,y:106.9,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.2,skewX:-59.0295,skewY:120.9705,x:-3.6,y:118.1,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.4865,x:-20.6,y:92.1}},{t:this.instance_27,p:{regX:-31.4,rotation:88.9184,x:47.6,y:-26.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4554,y:96,x:8.2}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.5654,skewY:177.4346,x:24.55,y:192.05,regX:2.5,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0761,y:-57.95,x:-5.85,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.6878,skewY:-173.3122,y:187.9,regX:3,x:-42.5}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.2363,skewY:179.7637,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-39.7667,x:-68.4,y:57.4,regX:40.5}},{t:this.instance_18,p:{regX:5.3,skewX:143.1855,skewY:-36.8145,x:-130.2,y:110.1,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:143.2638,skewY:-36.7362,x:-136.3,y:116.65}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-80.5891,y:-21.6,x:-55.75,regX:37.8,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:130.6222,x:50.7,y:48.1}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-83.3672,skewY:96.6328,x:-4.7,y:107.3,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-59.4564,skewY:120.5436,x:-2.1,y:118.45,regX:-4.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.491,x:-20.6,y:92.1}},{t:this.instance_27,p:{regX:-31.3,rotation:88.3421,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4616,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9979,skewX:-2.5741,skewY:177.4258,x:24.65,y:192.05,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0735,y:-57.95,x:-5.85,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.6922,skewY:-173.3078,y:187.9,regX:3,x:-42.5}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.3536,skewY:179.6464,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-33.5409,x:-71.85,y:56.75,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:149.4069,skewY:-30.5931,x:-139.05,y:102.55,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:149.4826,skewY:-30.5174,x:-145.9,y:108.35}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-78.0115,y:-21.7,x:-55.75,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:130.181,x:51.45,y:48.1}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-83.8007,skewY:96.1993,x:-3.55,y:107.7,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-59.8842,skewY:120.1158,x:-0.9,y:118.9,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.4955,x:-20.65,y:92.1}},{t:this.instance_27,p:{regX:-31.2,rotation:87.7646,x:47.65,y:-26.35,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4678,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9979,skewX:-2.5829,skewY:177.4171,x:24.65,y:192,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.07,y:-57.95,x:-5.85,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.6975,skewY:-173.3025,y:187.9,regX:3,x:-42.45}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.4718,skewY:179.5282,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-27.3152,x:-75.35,y:55.95,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:155.6296,skewY:-24.3704,x:-147.15,y:94.05,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:155.701,skewY:-24.299,x:-154.6,y:99.2}},{t:this.instance_16,p:{scaleX:0.9982,scaleY:0.9982,rotation:-75.4333,y:-21.75,x:-55.75,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:129.7377,x:52.15,y:48.05}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-84.2349,skewY:95.7651,x:-2.25,y:108.05,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-60.31,skewY:119.69,x:0.35,y:119.3,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5018,x:-20.6,y:92.1}},{t:this.instance_27,p:{regX:-31.2,rotation:87.186,x:47.6,y:-26.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4731,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.5926,skewY:177.4074,x:24.7,y:192,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0665,y:-57.95,x:-5.85,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.701,skewY:-173.299,y:187.9,regX:3,x:-42.5}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.5899,skewY:179.4101,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-21.0901,x:-78.85,y:55,regX:40.5}},{t:this.instance_18,p:{regX:5.3,skewX:161.8522,skewY:-18.1478,x:-154.2,y:85.05,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:161.9199,skewY:-18.0801,x:-162.15,y:89.4}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-72.8576,y:-21.7,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:129.296,x:52.95,y:47.95}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-84.6686,skewY:95.3314,x:-1.05,y:108.55,regX:-6.1,regY:8}},{t:this.instance_29,p:{regY:3.2,skewX:-60.7371,skewY:119.2629,x:1.65,y:119.55,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5063,x:-20.6,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:86.609,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4793,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.6013,skewY:177.3987,x:24.7,y:192,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.063,y:-57.95,x:-5.85,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7054,skewY:-173.2946,y:187.85,regX:2.9,x:-42.4}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.709,skewY:179.291,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-14.8635,x:-82.25,y:53.9,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:168.0726,skewY:-11.9274,x:-160.6,y:75.6,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:168.1379,skewY:-11.8621,x:-168.9,y:79.05}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-70.2794,y:-21.75,x:-55.75,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:128.8534,x:53.7,y:47.9}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-85.1031,skewY:94.8969,x:0,y:108.9,regX:-6.1,regY:7.9}},{t:this.instance_29,p:{regY:3.3,skewX:-61.1633,skewY:118.8367,x:3,y:119.95,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5116,x:-20.6,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:86.0307,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4855,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.6101,skewY:177.3899,x:24.7,y:192,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0595,y:-58,x:-5.85,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7098,skewY:-173.2902,y:187.85,regX:2.9,x:-42.4}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.8262,skewY:179.1737,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-8.6381,x:-85.6,y:52.65,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:174.2954,skewY:-5.7046,x:-165.9,y:65.85,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:174.3566,skewY:-5.6434,x:-174.5,y:68.25}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-67.704,y:-21.75,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:128.4109,x:54.4,y:47.85}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-85.5371,skewY:94.4629,x:1.4,y:109.1,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-61.5916,skewY:118.4084,x:4.3,y:120.25,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5171,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:85.4529,x:47.6,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4926,y:96,x:8.2}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.6189,skewY:177.3811,x:24.6,y:192,regX:2.5,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.056,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7133,skewY:-173.2867,y:187.85,regX:2.9,x:-42.4}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.9444,skewY:179.0556,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-2.4119,x:-88.9,y:51.15,regX:40.5}},{t:this.instance_18,p:{regX:5.3,skewX:-179.4868,skewY:0.5132,x:-170,y:55.5,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,skewX:-179.4297,skewY:0.5703,x:-178.9,y:57}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-65.127,y:-21.65,x:-55.75,regX:37.8,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:127.9705,x:55.15,y:47.8}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-85.9709,skewY:94.0291,x:2.65,y:109.45,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-62.0184,skewY:117.9816,x:5.55,y:120.55,regX:-4.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_28,p:{regX:1.7,rotation:12.5216,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.2,rotation:84.8754,x:47.6,y:-26.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.4979,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.6277,skewY:177.3723,x:24.7,y:192,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0525,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.717,skewY:-173.283,y:187.9,regX:2.9,x:-42.4}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.0635,skewY:178.9365,x:0.2,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:3.8092,x:-92.15,y:49.65,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-173.2646,skewY:6.7354,x:-173.35,y:45.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-173.2102,skewY:6.7898,x:-182.35,y:45.7}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-62.5496,y:-21.75,x:-55.8,regX:37.9,regY:-0.2}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:127.5273,x:55.95,y:47.75}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-86.4045,skewY:93.5955,x:3.85,y:109.75,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.2,skewX:-62.4451,skewY:117.5549,x:6.75,y:120.85,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5261,x:-20.6,y:92.1}},{t:this.instance_27,p:{regX:-31.3,rotation:84.2984,x:47.6,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5039,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.6373,skewY:177.3627,x:24.7,y:192,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0499,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7214,skewY:-173.2786,y:187.9,regX:2.9,x:-42.45}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.1817,skewY:178.8183,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:10.0332,x:-95.3,y:47.9,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-167.0429,skewY:12.9571,x:-175.55,y:34.6,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:-166.9932,skewY:13.0068,x:-184.45,y:34.2}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-59.9728,y:-21.6,x:-55.75,regX:37.8,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:127.0841,x:56.7,y:47.55}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-86.8379,skewY:93.1621,x:5.05,y:110.1,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.4,skewX:-62.8709,skewY:117.1291,x:8.2,y:121.25,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5322,x:-20.6,y:92.1}},{t:this.instance_27,p:{regX:-31.3,rotation:83.719,x:47.6,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5094,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.6461,skewY:177.3539,x:24.75,y:192,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0464,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7249,skewY:-173.2751,y:187.9,regX:3,x:-42.55}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.299,skewY:178.701,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:16.2607,x:-98.45,y:46,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-160.8223,skewY:19.1777,x:-176.7,y:24.2,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-160.775,skewY:19.225,x:-185.65,y:22.75}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-57.3959,y:-21.7,x:-55.7,regX:37.9,regY:-0.2}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:126.6425,x:57.4,y:47.5}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-87.2728,skewY:92.7272,x:6.35,y:110.35,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-63.2982,skewY:116.7018,x:9.5,y:121.45,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5369,x:-20.65,y:92.1}},{t:this.instance_27,p:{regX:-31.2,rotation:83.1425,x:47.6,y:-26.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5156,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.6548,skewY:177.3452,x:24.75,y:192,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0429,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7293,skewY:-173.2707,y:187.9,regX:3,x:-42.5}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.4172,skewY:178.5828,x:0.15,y:-76.9,regY:52.8}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:22.486,x:-101.4,y:44,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-154.6006,skewY:25.3994,x:-176.9,y:13.85,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-154.5558,skewY:25.4442,x:-185.6,y:11.4}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-54.8179,y:-21.7,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:126.2009,x:58.15,y:47.4}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-87.7058,skewY:92.2942,x:7.55,y:110.6,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.2,skewX:-63.7248,skewY:116.2752,x:10.65,y:121.65,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5422,x:-20.6,y:92.1}},{t:this.instance_27,p:{regX:-31.4,rotation:82.5653,x:47.6,y:-26.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5209,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9979,skewX:-2.6636,skewY:177.3364,x:24.75,y:192,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0394,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7336,skewY:-173.2664,y:187.9,regX:3,x:-42.55}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.5354,skewY:178.4646,x:0.05,y:-76.85,regY:52.8}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:28.7109,x:-104.3,y:41.9,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-148.3787,skewY:31.6213,x:-176.1,y:3.75,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-148.3381,skewY:31.6619,x:-184.5,y:0.5}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-52.2417,y:-21.7,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:125.7575,x:58.9,y:47.25}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-88.1396,skewY:91.8604,x:8.7,y:110.9,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-64.1522,skewY:115.8478,x:12.1,y:121.95,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5475,x:-20.55,y:92.1}},{t:this.instance_27,p:{regX:-31.3,rotation:81.9873,x:47.6,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5261,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.6724,skewY:177.3276,x:24.65,y:192,regX:2.5,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0359,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7372,skewY:-173.2628,y:187.9,regX:3,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.6527,skewY:178.3473,x:0.05,y:-76.85,regY:52.8}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:34.9386,x:-107.1,y:39.65,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-142.1558,skewY:37.8442,x:-174.35,y:-6.05,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-142.1186,skewY:37.8814,x:-182.25,y:-10.15}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-49.6653,y:-21.75,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:125.3168,x:59.6,y:47.15}},{t:this.instance_30,p:{scaleX:0.9984,scaleY:0.9984,skewX:-88.5733,skewY:91.4267,x:9.95,y:111.2,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-64.578,skewY:115.422,x:13.55,y:122.1,regX:-4.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5528,x:-20.55,y:92.1}},{t:this.instance_27,p:{regX:-31.3,rotation:81.4086,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5325,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.682,skewY:177.318,x:24.75,y:191.95,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0324,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7416,skewY:-173.2584,y:187.9,regX:3,x:-42.55}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.7718,skewY:178.2282,x:0.15,y:-76.85,regY:52.8}},{t:this.instance_19,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:41.1628,x:-109.8,y:37.3,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-135.9333,skewY:44.0667,x:-171.65,y:-15.5,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:-135.9,skewY:44.1,x:-179.1,y:-20.35}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-47.0878,y:-21.7,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:124.8743,x:60.35,y:47}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-89.0069,skewY:90.9931,x:11.15,y:111.45,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-65.0067,skewY:114.9933,x:14.8,y:122.4,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5566,x:-20.55,y:92.1}},{t:this.instance_27,p:{regX:-31.3,rotation:80.8317,x:47.55,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5378,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.6908,skewY:177.3092,x:24.75,y:191.95,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0289,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7451,skewY:-173.2549,y:187.9,regX:3,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.89,skewY:178.11,x:0.1,y:-76.85,regY:52.8}},{t:this.instance_19,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:47.3889,x:-112.45,y:34.8,regX:40.5}},{t:this.instance_18,p:{regX:5.3,skewX:-129.7113,skewY:50.2887,x:-168.05,y:-24.25,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-129.6821,skewY:50.3179,x:-175.05,y:-30.1}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-44.5101,y:-21.7,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:124.4322,x:61.1,y:46.9}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-89.4421,skewY:90.5579,x:12.4,y:111.7,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-65.4319,skewY:114.5681,x:16.1,y:122.6,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5626,x:-20.65,y:92.1}},{t:this.instance_27,p:{regX:-31.3,rotation:80.2545,x:47.55,y:-26.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.544,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.6996,skewY:177.3004,x:24.8,y:191.95,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0254,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7495,skewY:-173.2505,y:187.9,regX:3,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.0082,skewY:177.9918,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:53.6146,x:-114.9,y:32.3,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-123.4899,skewY:56.5101,x:-163.9,y:-32.65,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-123.4636,skewY:56.5364,x:-170.15,y:-39.15}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-41.9327,y:-21.7,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.9898,x:61.85,y:46.7}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-89.8756,skewY:90.1244,x:13.65,y:111.85,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-65.8599,skewY:114.1401,x:17.4,y:122.85,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5681,x:-20.6,y:92.1}},{t:this.instance_27,p:{regX:-31.3,rotation:79.6763,x:47.6,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5502,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7083,skewY:177.2917,x:24.8,y:192,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0228,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7541,skewY:-173.2459,y:187.9,regX:3,x:-42.55}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.1265,skewY:177.8735,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:59.8407,x:-117.3,y:29.55,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-117.2669,skewY:62.7331,x:-158.9,y:-40.35,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-117.244,skewY:62.756,x:-164.4,y:-47.4}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-39.3571,y:-21.7,x:-55.75,regX:37.8,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.5477,x:62.55,y:46.55}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.3039,skewY:89.6961,x:14.9,y:112.15,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-66.2854,skewY:113.7146,x:18.8,y:122.9,regX:-4.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5726,x:-20.6,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:79.099,x:47.55,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5564,y:96,x:8.05}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7171,skewY:177.2829,x:24.8,y:192,regX:2.4,regY:-53.3}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0193,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7583,skewY:-173.2417,y:187.9,regX:2.9,x:-42.5}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.2447,skewY:177.7553,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:66.0669,x:-119.5,y:26.75,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-111.0458,skewY:68.9542,x:-153.35,y:-47.2,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-111.0264,skewY:68.9736,x:-158.05,y:-54.85}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-36.7793,y:-21.7,x:-55.75,regX:37.8,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.1051,x:63.3,y:46.45}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.7383,skewY:89.2617,x:16.15,y:112.3,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.4,skewX:-66.7122,skewY:113.2878,x:20.15,y:123.25,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5781,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:78.5214,x:47.6,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5626,y:96,x:8.05}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7277,skewY:177.2723,x:24.7,y:192.1,regX:2.5,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0158,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.762,skewY:-173.238,y:187.9,regX:2.9,x:-42.5}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.363,skewY:177.637,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:72.2921,x:-121.6,y:23.85,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-104.8228,skewY:75.1772,x:-147.2,y:-53.45,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-104.8071,skewY:75.1929,x:-151.05,y:-61.5}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-34.2032,y:-21.65,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:122.663,x:64.1,y:46.25}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-91.1709,skewY:88.8291,x:17.35,y:112.5,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-67.1399,skewY:112.8601,x:21.45,y:123.35,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5834,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:77.9437,x:47.5,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5688,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9979,skewX:-2.7364,skewY:177.2636,x:24.8,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0123,y:-58,x:-5.75,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7662,skewY:-173.2338,y:187.9,regX:2.9,x:-42.45}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.4804,skewY:177.5196,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:78.5176,x:-123.55,y:20.8,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-98.6026,skewY:81.3974,x:-140.6,y:-58.65,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-98.5889,skewY:81.4111,x:-143.65,y:-67.25}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-31.6256,y:-21.65,x:-55.8,regX:37.8,regY:-0.2}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:122.2196,x:64.8,y:46.05}},{t:this.instance_30,p:{scaleX:0.9984,scaleY:0.9984,skewX:-91.6054,skewY:88.3946,x:18.65,y:112.7,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-67.5667,skewY:112.4333,x:22.8,y:123.45,regX:-4.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5879,x:-20.6,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:77.3655,x:47.5,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.575,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7444,skewY:177.2556,x:24.8,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0088,y:-58,x:-5.75,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7698,skewY:-173.2301,y:187.85,regX:2.9,x:-42.5}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.5978,skewY:177.4022,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:84.7436,x:-125.4,y:17.75,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-92.3801,skewY:87.6199,x:-133.95,y:-63.15,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-92.371,skewY:87.629,x:-135.75,y:-71.95}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-29.049,y:-21.6,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:121.7782,x:65.5,y:45.9}},{t:this.instance_30,p:{scaleX:0.9984,scaleY:0.9984,skewX:-92.0409,skewY:87.9591,x:19.9,y:112.85,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-67.9925,skewY:112.0075,x:24.05,y:123.7,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5925,x:-20.6,y:92.15}},{t:this.instance_27,p:{regX:-31.2,rotation:76.7883,x:47.55,y:-26.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5812,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7531,skewY:177.2469,x:24.85,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0053,y:-58,x:-5.75,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7742,skewY:-173.2257,y:187.85,regX:2.9,x:-42.55}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.716,skewY:177.284,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:90.9661,x:-127.15,y:14.5,regX:40.5}},{t:this.instance_18,p:{regX:5.3,skewX:-86.1629,skewY:93.8371,x:-126.65,y:-66.7,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-86.156,skewY:93.844,x:-127.7,y:-75.75}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-26.471,y:-21.6,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:121.3358,x:66.2,y:45.7}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-92.473,skewY:87.527,x:21.15,y:113,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.2,skewX:-68.4198,skewY:111.5802,x:25.3,y:123.75,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.5987,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:76.2103,x:47.55,y:-26.55,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5865,y:96,x:8.05}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7619,skewY:177.2381,x:24.85,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0018,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7785,skewY:-173.2214,y:187.85,regX:2.9,x:-42.5}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.8343,skewY:177.1657,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:97.1895,x:-128.65,y:11.35,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-79.9409,skewY:100.0591,x:-119.35,y:-69.5,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-79.9376,skewY:100.0624,x:-119.5,y:-78.5}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-23.8945,y:-21.6,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:120.893,x:66.95,y:45.55}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-92.907,skewY:87.093,x:22.4,y:113.15,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-68.8466,skewY:111.1534,x:26.7,y:123.9,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.6,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:75.6333,x:47.55,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.85,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.55}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.9526,skewY:177.0473,x:0,y:-76.85,regY:52.8}},{t:this.instance_19,p:{regY:0.1,scaleX:0.9982,scaleY:0.9982,rotation:103.4159,x:-130.2,y:7.95,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-73.7191,skewY:106.2809,x:-112.1,y:-71.3,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-73.7207,skewY:106.2793,x:-111.15,y:-80.3}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-21.3177,y:-21.65,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:121.5536,x:65.85,y:45.8}},{t:this.instance_30,p:{scaleX:0.9984,scaleY:0.9984,skewX:-92.2477,skewY:87.7523,x:20.5,y:112.9,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-68.1879,skewY:111.8121,x:24.7,y:123.6,regX:-4.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.6,y:92.15}},{t:this.instance_27,p:{regX:-31.4,rotation:76.4931,x:47.5,y:-26.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5909,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7706,skewY:177.2294,x:24.85,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.55}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.7712,skewY:177.2288,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:97.3167,x:-134.9,y:-10.1,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-79.8182,skewY:100.1818,x:-125.4,y:-90.95,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-79.8183,skewY:100.1817,x:-125.55,y:-99.95}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-7.8808,y:-21.6,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:122.2125,x:64.7,y:46}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-91.5897,skewY:88.4103,x:18.65,y:112.65,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-67.5286,skewY:112.4714,x:22.75,y:123.45,regX:-4.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6015,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:77.3529,x:47.5,y:-26.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5909,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7706,skewY:177.2294,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.55}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.589,skewY:177.411,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:91.2201,x:-135.4,y:-28.95,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-85.9154,skewY:94.0846,x:-134.6,y:-110.25,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-85.9153,skewY:94.0847,x:-135.65,y:-119.2}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5514,y:-21.65,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:122.8709,x:63.6,y:46.3}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.9292,skewY:89.0708,x:16.75,y:112.35,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.4,skewX:-66.8711,skewY:113.1289,x:20.8,y:123.35,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6015,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.4,rotation:78.213,x:47.45,y:-26.65,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5901,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7697,skewY:177.2303,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.55}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.4094,skewY:177.5906,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:85.1252,x:-131.45,y:-47.25,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-92.0094,skewY:87.9906,x:-139.35,y:-128.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-92.0099,skewY:87.9901,x:-141.35,y:-136.9}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:18.9875,y:-21.65,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.5307,x:62.5,y:46.5}},{t:this.instance_30,p:{scaleX:0.9984,scaleY:0.9984,skewX:-90.2697,skewY:89.7303,x:14.85,y:112.05,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-66.2105,skewY:113.7895,x:18.65,y:123.05,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6015,x:-20.7,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:79.0722,x:47.5,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5901,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7697,skewY:177.2303,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.75,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7803,skewY:-173.2196,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.2272,skewY:177.7728,x:0,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:79.0286,x:-123.5,y:-64.15,regX:40.5}},{t:this.instance_18,p:{regX:5.3,skewX:-98.1078,skewY:81.8922,x:-139.9,y:-143.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:-98.1088,skewY:81.8912,x:-142.75,y:-152.25}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:32.4248,y:-21.7,x:-55.65,regX:37.9,regY:-0.2}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.5552,x:62.5,y:46.45}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.2435,skewY:89.7565,x:14.85,y:112,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-66.1866,skewY:113.8134,x:18.65,y:123,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6015,x:-20.7,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:79.0722,x:47.5,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5901,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7697,skewY:177.2303,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.2447,skewY:177.7553,x:0,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:79.8714,x:-122.9,y:-65,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-97.2657,skewY:82.7343,x:-138.15,y:-144.9,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,skewX:-97.2655,skewY:82.7345,x:-140.95,y:-153.35}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:33.1401,y:-21.6,x:-55.65,regX:37.9,regY:-0.2}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.5805,x:62.55,y:46.45}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.2189,skewY:89.7811,x:14.85,y:112,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-66.1607,skewY:113.8393,x:18.6,y:123,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6015,x:-20.7,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:79.0713,x:47.5,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5901,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7697,skewY:177.2303,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.2614,skewY:177.7386,x:0.1,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:80.7145,x:-122.4,y:-65.85,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-96.4207,skewY:83.5793,x:-136.5,y:-146,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-96.4213,skewY:83.5787,x:-139.1,y:-154.55}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:33.857,y:-21.6,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.6065,x:62.55,y:46.55}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.1944,skewY:89.8056,x:14.85,y:111.95,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-66.134,skewY:113.866,x:18.55,y:122.95,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6015,x:-20.7,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:79.0712,x:47.5,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5901,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7697,skewY:177.2303,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.8,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.2789,skewY:177.7211,x:0.1,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:81.5586,x:-121.75,y:-66.7,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-95.5779,skewY:84.4221,x:-134.8,y:-147.05,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-95.5774,skewY:84.4226,x:-137.25,y:-155.65}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:34.5744,y:-21.65,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.6318,x:62.5,y:46.5}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.169,skewY:89.831,x:14.8,y:112,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-66.1089,skewY:113.8911,x:18.55,y:122.95,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6015,x:-20.7,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:79.0712,x:47.5,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5909,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7697,skewY:177.2303,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.8,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.2955,skewY:177.7045,x:0,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:82.4033,x:-121.25,y:-67.5,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-94.7319,skewY:85.2681,x:-133,y:-147.95,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-94.7339,skewY:85.2661,x:-135.35,y:-156.6}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:35.2915,y:-21.65,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.657,x:62.5,y:46.5}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.1436,skewY:89.8564,x:14.75,y:111.95,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-66.0846,skewY:113.9154,x:18.5,y:122.9,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6015,x:-20.7,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:79.0712,x:47.5,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5909,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7706,skewY:177.2294,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.8,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.313,skewY:177.687,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:83.2453,x:-120.7,y:-68.3,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-93.8888,skewY:86.1112,x:-131.25,y:-148.95,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-93.8897,skewY:86.1103,x:-133.5,y:-157.65}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:36.0071,y:-21.65,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.683,x:62.5,y:46.5}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.1173,skewY:89.8827,x:14.75,y:111.95,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-66.0583,skewY:113.9417,x:18.45,y:122.9,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:79.0712,x:47.5,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5909,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7706,skewY:177.2294,x:24.9,y:192.05,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.8,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.3296,skewY:177.6704,x:0.1,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:84.0897,x:-120.05,y:-69.05,regX:40.5}},{t:this.instance_18,p:{regX:5.3,skewX:-93.0456,skewY:86.9544,x:-129.4,y:-149.75,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-93.0463,skewY:86.9537,x:-131.5,y:-158.65}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:36.7231,y:-21.65,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.7076,x:62.55,y:46.45}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.0928,skewY:89.9072,x:14.7,y:111.9,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-66.0336,skewY:113.9664,x:18.45,y:122.85,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.1}},{t:this.instance_27,p:{regX:-31.3,rotation:79.0712,x:47.5,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7706,skewY:177.2294,x:24.9,y:192.05,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.8,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.3472,skewY:177.6528,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:84.9344,x:-119.45,y:-69.9,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-92.2013,skewY:87.7987,x:-127.65,y:-150.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-92.2027,skewY:87.7973,x:-129.6,y:-159.55}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:37.4405,y:-21.65,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.7335,x:62.5,y:46.5}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.0683,skewY:89.9317,x:14.7,y:111.9,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-66.0077,skewY:113.9923,x:18.4,y:122.85,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.1}},{t:this.instance_27,p:{regX:-31.3,rotation:79.0703,x:47.5,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7706,skewY:177.2294,x:24.9,y:192.05,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.8,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.3638,skewY:177.6362,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:85.7772,x:-118.8,y:-70.65,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-91.3576,skewY:88.6424,x:-126,y:-151.7,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,skewX:-91.3588,skewY:88.6412,x:-127.65,y:-160.4}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:38.1571,y:-21.65,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:123.7588,x:62.5,y:46.5}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-90.0429,skewY:89.9571,x:14.65,y:111.85,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-65.9818,skewY:114.0182,x:18.4,y:122.85,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.1}},{t:this.instance_27,p:{regX:-31.3,rotation:79.0703,x:47.5,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.05,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.8,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.3814,skewY:177.6186,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:86.6207,x:-118.2,y:-71.5,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-90.5141,skewY:89.4859,x:-124.05,y:-152.6,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-90.5142,skewY:89.4858,x:-125.75,y:-161.45}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:38.8739,y:-21.65,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:124.1404,x:61.9,y:46.65}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-89.6646,skewY:90.3354,x:13.6,y:111.7,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-65.5996,skewY:114.4004,x:17.25,y:122.7,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:79.5802,x:47.45,y:-26.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.8,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.2684,skewY:177.7316,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:80.3355,x:-122.45,y:-65.75,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-96.7989,skewY:83.2011,x:-137.2,y:-145.75,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-96.8005,skewY:83.1995,x:-139.75,y:-154.3}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:33.7824,y:-21.6,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:124.5223,x:61.25,y:46.75}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-89.2836,skewY:90.7164,x:12.5,y:111.5,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-65.2183,skewY:114.7817,x:16.05,y:122.5,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.4,rotation:80.0899,x:47.5,y:-26.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.8,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.1553,skewY:177.8447,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:74.0494,x:-126.1,y:-59.65,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-103.085,skewY:76.915,x:-149.4,y:-137.55,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-103.085,skewY:76.915,x:-152.95,y:-145.8}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:28.6934,y:-21.65,x:-55.6,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:124.9045,x:60.55,y:46.9}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-88.9018,skewY:91.0982,x:11.4,y:111.25,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-64.8358,skewY:115.1642,x:15,y:122.2,regX:-4.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.4,rotation:80.599,x:47.5,y:-26.65,scaleX:0.9984,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-2.0424,skewY:177.9576,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:67.7638,x:-129.2,y:-53.3,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-109.3705,skewY:70.6295,x:-160.85,y:-128.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-109.3705,skewY:70.6295,x:-165.35,y:-135.95}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:23.6039,y:-21.65,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:125.2867,x:59.95,y:47}},{t:this.instance_30,p:{scaleX:0.9984,scaleY:0.9984,skewX:-88.519,skewY:91.481,x:10.3,y:111.05,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.2,skewX:-64.4542,skewY:115.5458,x:13.7,y:122.1,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.2,rotation:81.1082,x:47.6,y:-26.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.9294,skewY:178.0706,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:61.4796,x:-131.7,y:-46.65,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-115.6564,skewY:64.3436,x:-171.4,y:-117.55,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-115.6558,skewY:64.3442,x:-176.65,y:-124.85}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:18.5133,y:-21.65,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:125.6685,x:59.3,y:47.15}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-88.1378,skewY:91.8622,x:9.2,y:110.85,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-64.0715,skewY:115.9285,x:12.65,y:121.9,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:81.6175,x:47.55,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.8165,skewY:178.1835,x:0.1,y:-76.85,regY:52.8}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:55.1936,x:-133.65,y:-39.75,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-121.9411,skewY:58.0589,x:-180.9,y:-105.95,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-121.942,skewY:58.058,x:-186.95,y:-112.6}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:13.4229,y:-21.7,x:-55.6,regX:37.9,regY:-0.2}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:126.0511,x:58.65,y:47.25}},{t:this.instance_30,p:{scaleX:0.9984,scaleY:0.9984,skewX:-87.7558,skewY:92.2442,x:8.25,y:110.6,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.2,skewX:-63.6907,skewY:116.3093,x:11.35,y:121.65,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:82.1269,x:47.5,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.05}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.7017,skewY:178.2982,x:0.1,y:-76.85,regY:52.8}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:48.9086,x:-134.95,y:-32.8,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-128.2259,skewY:51.7741,x:-189.15,y:-93.35,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-128.2269,skewY:51.7731,x:-195.85,y:-99.4}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:8.3321,y:-21.7,x:-55.6,regX:37.9,regY:-0.2}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:126.4322,x:58,y:47.35}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-87.3727,skewY:92.6273,x:7.2,y:110.4,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-63.3088,skewY:116.6912,x:10.3,y:121.5,regX:-4.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.4,rotation:82.6359,x:47.55,y:-26.65,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.05}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.5897,skewY:178.4103,x:0.05,y:-76.85,regY:52.8}},{t:this.instance_19,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:42.6229,x:-135.6,y:-25.65,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-134.5126,skewY:45.4874,x:-196.2,y:-79.9,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-134.5131,skewY:45.4869,x:-203.5,y:-85.2}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:3.2426,y:-21.6,x:-55.8,regX:37.8,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:126.8152,x:57.35,y:47.4}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-86.9914,skewY:93.0086,x:6.1,y:110.15,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.4,skewX:-62.9253,skewY:117.0747,x:9.25,y:121.3,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.2,rotation:83.1461,x:47.55,y:-26.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.05}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.4767,skewY:178.5233,x:0.05,y:-76.9,regY:52.8}},{t:this.instance_19,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:36.3377,x:-135.75,y:-18.6,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-140.7976,skewY:39.2024,x:-201.8,y:-66,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-140.799,skewY:39.201,x:-209.65,y:-70.3}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-1.8432,y:-21.6,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:127.1966,x:56.7,y:47.55}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-86.6098,skewY:93.3902,x:4.85,y:109.9,regX:-6.2,regY:7.9}},{t:this.instance_29,p:{regY:3.2,skewX:-62.5442,skewY:117.4558,x:7.95,y:121,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:83.6548,x:47.55,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.05}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.3638,skewY:178.6362,x:0.1,y:-76.8,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:30.0515,x:-135.1,y:-11.5,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-147.0831,skewY:32.9169,x:-206,y:-51.35,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-147.0838,skewY:32.9162,x:-214.25,y:-54.85}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.9323,y:-21.55,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:127.5792,x:56.1,y:47.6}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-86.228,skewY:93.772,x:3.85,y:109.6,regX:-6.2,regY:7.9}},{t:this.instance_29,p:{regY:3.3,skewX:-62.163,skewY:117.837,x:6.9,y:120.8,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:84.1638,x:47.55,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.05}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.2508,skewY:178.7492,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:23.7672,x:-133.85,y:-4.45,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-153.3676,skewY:26.6324,x:-208.75,y:-36.3,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-153.3691,skewY:26.6309,x:-217.35,y:-38.85}},{t:this.instance_16,p:{scaleX:0.9982,scaleY:0.9982,rotation:-12.0213,y:-21.6,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:127.9618,x:55.35,y:47.7}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-85.8453,skewY:94.1547,x:2.85,y:109.5,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-61.7802,skewY:118.2198,x:5.75,y:120.5,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:84.6732,x:47.55,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.1388,skewY:178.8612,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:17.4816,x:-132.05,y:2.45,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-159.6543,skewY:20.3457,x:-210,y:-21.15,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-159.6541,skewY:20.3459,x:-218.8,y:-22.65}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-17.1111,y:-21.6,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:128.3436,x:54.7,y:47.75}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-85.4633,skewY:94.5367,x:1.8,y:109.25,regX:-6.1,regY:8}},{t:this.instance_29,p:{regY:3.4,skewX:-61.3988,skewY:118.6012,x:4.8,y:120.3,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:85.1832,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-1.0259,skewY:178.9741,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:11.1955,x:-129.6,y:9,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-165.9387,skewY:14.0613,x:-209.55,y:-5.7,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:-165.94,skewY:14.06,x:-218.6,y:-6.35}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-22.2025,y:-21.65,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:128.7249,x:54.1,y:47.8}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-85.0819,skewY:94.9181,x:0.7,y:108.95,regX:-6.1,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-61.0158,skewY:118.9842,x:3.5,y:120,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:85.6909,x:47.55,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.9129,skewY:179.0871,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:4.9108,x:-126.6,y:15.4,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:-172.2239,skewY:7.7761,x:-207.7,y:9.4,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-172.2247,skewY:7.7753,x:-216.7,y:9.9}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-27.2917,y:-21.6,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:129.1068,x:53.45,y:47.9}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-84.6994,skewY:95.3006,x:-0.35,y:108.7,regX:-6.1,regY:8}},{t:this.instance_29,p:{regY:3.2,skewX:-60.6323,skewY:119.3677,x:2.3,y:119.6,regX:-4.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.4,rotation:86.2001,x:47.55,y:-26.6,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.8009,skewY:179.1991,x:0.2,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-1.37,x:-123.05,y:21.65,regX:40.5}},{t:this.instance_18,p:{regX:5.3,skewX:-178.5084,skewY:1.4916,x:-204.2,y:24.6,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:-178.5098,skewY:1.4902,x:-213.2,y:25.9}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-32.382,y:-21.65,x:-55.7,regX:37.9,regY:-0.2}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:129.4889,x:52.8,y:47.95}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-84.3176,skewY:95.6824,x:-1.4,y:108.3,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-60.2515,skewY:119.7485,x:1.3,y:119.4,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:86.7116,x:47.55,y:-26.5,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.688,skewY:179.312,x:0.15,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-7.6559,x:-119,y:27.4,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:175.21,skewY:-4.79,x:-199.45,y:39.2,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:175.2089,skewY:-4.7911,x:-208.1,y:41.55}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-37.4722,y:-21.7,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:129.8708,x:52.1,y:48}},{t:this.instance_30,p:{scaleX:0.9984,scaleY:0.9984,skewX:-83.9348,skewY:96.0652,x:-2.45,y:108,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-59.8713,skewY:120.1287,x:0.1,y:119.15,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.2,rotation:87.2202,x:47.6,y:-26.35,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.1}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.5742,skewY:179.4258,x:0.1,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-13.9411,x:-114.35,y:32.85,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:168.9242,skewY:-11.0758,x:-193.05,y:53.45,regY:-8.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,skewX:168.9244,skewY:-11.0756,x:-201.45,y:56.6}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-42.562,y:-21.7,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:130.2531,x:51.45,y:48.05}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-83.554,skewY:96.446,x:-3.5,y:107.65,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-59.4878,skewY:120.5122,x:-0.95,y:118.75,regX:-4.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.2,rotation:87.7296,x:47.6,y:-26.35,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.4613,skewY:179.5387,x:0,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-20.2265,x:-109.2,y:37.8,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:162.6386,skewY:-17.3614,x:-185.3,y:66.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:162.638,skewY:-17.362,x:-193.25,y:71}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-47.6531,y:-21.65,x:-55.65,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:130.6334,x:50.8,y:48.1}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-83.1713,skewY:96.8287,x:-4.55,y:107.25,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-59.1064,skewY:120.8936,x:-2.15,y:118.55,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:88.2395,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.3484,skewY:179.6516,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-26.5122,x:-103.8,y:42.35,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:156.3537,skewY:-23.6463,x:-176.1,y:79.5,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:156.3525,skewY:-23.6475,x:-183.6,y:84.5}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-52.7428,y:-21.7,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:131.0164,x:50.15,y:48.1}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.7893,skewY:97.2107,x:-5.7,y:106.95,regX:-6.2,regY:7.9}},{t:this.instance_29,p:{regY:3.3,skewX:-58.7241,skewY:121.2759,x:-3.25,y:118.15,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.4,rotation:88.7477,x:47.6,y:-26.6,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.2354,skewY:179.7646,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-32.7975,x:-97.85,y:46.35,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:150.0674,skewY:-29.9326,x:-165.7,y:91.25,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:150.0666,skewY:-29.9334,x:-172.65,y:97}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-57.8326,y:-21.7,x:-55.75,regX:37.9,regY:-0.2}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:131.3995,x:49.45,y:48.15}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.4078,skewY:97.5922,x:-6.8,y:106.6,regX:-6.2,regY:7.9}},{t:this.instance_29,p:{regY:3.3,skewX:-58.3412,skewY:121.6588,x:-4.45,y:117.85,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:89.2574,x:47.6,y:-26.45,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.1,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.1225,skewY:179.8775,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-39.0828,x:-91.65,y:49.8,regX:40.6}},{t:this.instance_18,p:{regX:5.3,skewX:143.7815,skewY:-36.2185,x:-154.15,y:101.8,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.3,scaleX:0.998,scaleY:0.998,skewX:143.7817,skewY:-36.2183,x:-160.35,y:108.35}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-62.923,y:-21.7,x:-55.75,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:131.781,x:48.8,y:48.15}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.0253,skewY:97.9747,x:-7.8,y:106.2,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-57.9596,skewY:122.0404,x:-5.55,y:117.5,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:89.7671,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.15,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:-0.0096,skewY:179.9904,x:0.05,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-45.3685,x:-85.25,y:52.8,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:137.4977,skewY:-42.5023,x:-141.6,y:111.3,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:137.4964,skewY:-42.5036,x:-147.15,y:118.5}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-68.012,y:-21.7,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:132.1624,x:48.15,y:48.25}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-81.6437,skewY:98.3563,x:-8.8,y:105.9,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-57.5778,skewY:122.4222,x:-6.65,y:117.15,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:90.2715,x:47.6,y:-26.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.15}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.15,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:0.098,skewY:-179.902,x:0.05,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-51.6529,x:-78.5,y:55.1,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:131.211,skewY:-48.789,x:-128.2,y:119.45,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:131.2113,skewY:-48.7887,x:-132.8,y:127.15}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-73.1025,y:-21.7,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:132.5443,x:47.5,y:48.2}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-81.2622,skewY:98.7378,x:-9.85,y:105.5,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-57.1949,skewY:122.8051,x:-7.75,y:116.8,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:90.7812,x:47.65,y:-26.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.2}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.15,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:0.2109,skewY:-179.7891,x:0.1,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9981,scaleY:0.9981,rotation:-57.9387,x:-71.6,y:56.85,regX:40.5}},{t:this.instance_18,p:{regX:5.3,skewX:124.9263,skewY:-55.0737,x:-113.85,y:126.15,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:124.9254,skewY:-55.0746,x:-117.75,y:134.4}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-78.1916,y:-21.65,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:132.9267,x:46.8,y:48.25}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-80.8792,skewY:99.1208,x:-10.85,y:105.1,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-56.814,skewY:123.186,x:-8.95,y:116.4,regX:-4.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:91.29,x:47.6,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.2}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.15,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:0.3247,skewY:-179.6753,x:0.15,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-64.2243,x:-64.6,y:57.9,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:118.6414,skewY:-61.3586,x:-99.05,y:131.55,regY:-8.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:118.6402,skewY:-61.3598,x:-101.9,y:140}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-83.2812,y:-21.55,x:-55.75,regX:37.8,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:133.309,x:46.15,y:48.2}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-80.4975,skewY:99.5025,x:-11.9,y:104.7,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-56.4319,skewY:123.5681,x:-10,y:115.9,regX:-4.9,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:91.7999,x:47.65,y:-26.55,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.2}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.15,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:0.4376,skewY:-179.5624,x:0.15,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-70.5106,x:-57.45,y:58.4,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:112.3557,skewY:-67.6443,x:-83.8,y:135.35,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:112.3546,skewY:-67.6454,x:-85.65,y:144.2}},{t:this.instance_16,p:{scaleX:0.9982,scaleY:0.9982,rotation:-88.3724,y:-21.65,x:-55.7,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:133.69,x:45.5,y:48.2}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-80.1154,skewY:99.8846,x:-13,y:104.3,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.4,skewX:-56.05,skewY:123.95,x:-11,y:115.7,regX:-4.8,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:92.3081,x:47.65,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.2}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.15,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.55}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:0.5505,skewY:-179.4495,x:0.15,y:-76.7,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-76.7952,x:-50.4,y:58.25,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:106.0694,skewY:-73.9306,x:-68,y:137.6,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:106.0697,skewY:-73.9303,x:-68.95,y:146.6}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-93.4576,y:-21.65,x:-55.75,regX:37.9,regY:-0.1}}]},1).to({state:[{t:this.instance_31,p:{scaleX:0.9982,scaleY:0.9982,rotation:134.0728,x:44.85,y:48.2}},{t:this.instance_30,p:{scaleX:0.9983,scaleY:0.9983,skewX:-79.7347,skewY:100.2653,x:-14.05,y:103.9,regX:-6.2,regY:8}},{t:this.instance_29,p:{regY:3.3,skewX:-55.6688,skewY:124.3312,x:-12.3,y:115.25,regX:-4.8,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_28,p:{regX:1.7,rotation:12.6025,x:-20.65,y:92.15}},{t:this.instance_27,p:{regX:-31.3,rotation:92.8183,x:47.65,y:-26.5,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_26,p:{scaleX:0.9978,scaleY:0.9978,rotation:-8.5918,y:96,x:8.2}},{t:this.instance_25,p:{scaleX:0.9978,scaleY:0.9978,skewX:-2.7715,skewY:177.2285,x:24.9,y:192.15,regX:2.4,regY:-53.2}},{t:this.instance_24,p:{x:-5.6}},{t:this.instance_23,p:{regX:-1.5,rotation:-0.0009,y:-58.05,x:-5.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_22,p:{scaleX:0.998,scaleY:0.998,skewX:6.7811,skewY:-173.2188,y:187.85,regX:2.9,x:-42.6}},{t:this.instance_21},{t:this.instance_20,p:{regX:0.5,skewX:0.6617,skewY:-179.3383,x:0.25,y:-76.75,regY:52.9}},{t:this.instance_19,p:{regY:0,scaleX:0.9982,scaleY:0.9982,rotation:-83.0804,x:-43.4,y:57.5,regX:40.5}},{t:this.instance_18,p:{regX:5.2,skewX:99.7835,skewY:-80.2165,x:-52.15,y:138.3,regY:-8.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_17,p:{regX:6.2,scaleX:0.998,scaleY:0.998,skewX:99.7832,skewY:-80.2168,x:-52.05,y:147.3}},{t:this.instance_16,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.5473,y:-21.65,x:-55.7,regX:37.9,regY:-0.1}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-243.7,-205.1,321.29999999999995,512.1);


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
	this.instance = new lib.ch1_uArm_rcopy_2("synched",0);
	this.instance.setTransform(-57.45,-23.05,0.9984,0.9984,-80.0335,0,0,35.4,0.1);

	this.instance_1 = new lib.ch1_hand_rcopy_2("synched",0);
	this.instance_1.setTransform(-93.5,139.55,0.9983,0.9983,0,92.9791,-87.0209,6.6,-1.4);

	this.instance_2 = new lib.ch1_thumb_rcopy_2("synched",0);
	this.instance_2.setTransform(-89.3,132.6,0.9984,0.9984,0,127.5628,-52.4372,5.5,-9.1);

	this.instance_3 = new lib.ch1_lArm_rcopy_2("synched",0);
	this.instance_3.setTransform(-69.85,49.95,0.9984,0.9984,-75.5577,0,0,44,0);

	this.instance_4 = new lib.ch1_uBodycopy_2("synched",0);
	this.instance_4.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_5 = new lib.ch1_lLeg_rcopy_2("synched",0);
	this.instance_5.setTransform(-36.85,184.7,0.9981,0.9981,0,-2.5559,177.4441,1.9,-55.4);

	this.instance_6 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_6.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_7 = new lib.ch1_lLeg_lcopy_2("synched",0);
	this.instance_7.setTransform(11.45,186.2,0.9978,0.9978,0,-7.1013,172.8987,3.1,-53.2);

	this.instance_8 = new lib.ch1_uLeg_lcopy_2("synched",0);
	this.instance_8.setTransform(21.45,89.6,0.9978,0.9978,4.8545,0,0,-0.9,1.7);

	this.instance_9 = new lib.ch1_hand_lcopy_2("synched",0);
	this.instance_9.setTransform(51,133.1,0.9984,0.9984,0,-76.9541,103.0459,-4.8,3.2);

	this.instance_10 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_10.setTransform(49.5,122.1,0.9985,0.9985,0,-80.1018,99.8982,-6,8.4);

	this.instance_11 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_11.setTransform(69.1,40.6,0.9984,0.9984,101.3374,0,0,-39.7,-1.2);

	this.instance_12 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_12.setTransform(47.9,-26.2,0.9984,0.9984,72.4612,0,0,-31.2,-1.4);

	this.instance_13 = new lib.ch1_uLeg_rcopy_2("synched",0);
	this.instance_13.setTransform(-26.4,90.05,0.9983,0.9983,5.8922,0,0,1.7,-45.9);

	this.instance_14 = new lib.ch1_headcopy_2("synched",0);
	this.instance_14.setTransform(-0.7,-79.5,0.999,0.999,0,-1.7208,178.2792,-0.1,52.8);

	this.instance_15 = new lib.ch1_neckcopy_2("synched",0);
	this.instance_15.setTransform(-5.65,-57.7,0.9991,0.9991,-1.6716,0,0,-1.2,9.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{rotation:-1.6716,y:-57.7,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.1,regY:52.8,scaleX:0.999,scaleY:0.999,skewX:-1.7208,skewY:178.2792,x:-0.7,y:-79.5}},{t:this.instance_13,p:{regX:1.7,scaleX:0.9983,scaleY:0.9983,rotation:5.8922,x:-26.4,y:90.05}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:72.4612,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:101.3374,x:69.1,y:40.6}},{t:this.instance_10,p:{scaleX:0.9985,scaleY:0.9985,skewX:-80.1018,skewY:99.8982,x:49.5,regY:8.4,y:122.1,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-76.9541,skewY:103.0459,regY:3.2,x:51,y:133.1,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8545,x:21.45,y:89.6,regY:1.7}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.1013,skewY:172.8987,x:11.45,y:186.2}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5559,skewY:177.4441,x:-36.85,y:184.7,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.5577,x:-69.85,y:49.95,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:127.5628,skewY:-52.4372,x:-89.3,y:132.6,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9983,scaleY:0.9983,skewX:92.9791,skewY:-87.0209,x:-93.5,y:139.55,regX:6.6}},{t:this.instance,p:{scaleX:0.9984,scaleY:0.9984,rotation:-80.0335,x:-57.45,y:-23.05,regY:0.1,regX:35.4}}]}).to({state:[{t:this.instance_15,p:{rotation:-1.6822,y:-57.65,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.7918,skewY:178.2082,x:-0.6,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8916,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.469,y:-26.15,x:47.9}},{t:this.instance_11,p:{regX:-39.6,scaleX:0.9983,scaleY:0.9983,rotation:101.3051,x:69.05,y:40.7}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.1333,skewY:99.8667,x:49.55,regY:8.4,y:122.1,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-76.9846,skewY:103.0154,regY:3.2,x:51,y:133.1,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8539,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1019,skewY:172.8981,x:11.4,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5551,skewY:177.4449,x:-36.8,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-70.7996,x:-71,y:49.65,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:132.3207,skewY:-47.6793,x:-97.3,y:130.4,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:97.7362,skewY:-82.2638,x:-102,y:137,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-79.0842,x:-57.35,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.6953,y:-57.65,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-1.8645,skewY:178.1355,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8916,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.4781,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:101.2758,x:69.05,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.1635,skewY:99.8365,x:49.55,regY:8.4,y:122.1,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.0158,skewY:102.9842,regY:3.2,x:51,y:133.1,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8539,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1019,skewY:172.8981,x:11.4,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5551,skewY:177.4449,x:-36.8,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.0402,x:-72.2,y:49.4,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:137.0812,skewY:-42.9188,x:-105.1,y:127.7,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:102.4959,skewY:-77.5041,x:-110.4,y:133.9,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-78.135,x:-57.4,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7094,y:-57.65,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-1.938,skewY:178.062,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8916,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.4862,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:101.2462,x:69.05,y:40.55}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.1938,skewY:99.8062,x:49.7,regY:8.5,y:122.15,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.0458,skewY:102.9542,regY:3.1,x:50.95,y:133.1,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8539,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1018,skewY:172.8982,x:11.4,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5551,skewY:177.4449,x:-36.8,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-61.2804,x:-73.5,y:49.2,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:141.8411,skewY:-38.1589,x:-112.75,y:124.45,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:107.2558,skewY:-72.7442,x:-118.45,y:130.1,regX:6.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-77.1854,x:-57.4,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7225,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.3,regY:9.1,x:-5.8}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-2.0107,skewY:177.9893,x:-0.6,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8916,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.4936,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9984,scaleY:0.9984,rotation:101.2156,x:69.1,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.223,skewY:99.777,x:49.7,regY:8.5,y:122.15,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.0755,skewY:102.9245,regY:3.1,x:51,y:133.1,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8539,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1018,skewY:172.8982,x:11.4,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5551,skewY:177.4449,x:-36.8,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-56.5208,x:-74.6,y:48.9,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:146.6012,skewY:-33.3988,x:-120,y:120.7,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:112.0158,skewY:-67.9842,x:-126.25,y:125.9,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-76.2354,x:-57.35,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7357,y:-57.65,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-2.0842,skewY:177.9158,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8916,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9984,scaleY:0.9984,rotation:72.5016,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9983,scaleY:0.9984,rotation:101.1854,x:69.1,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.2532,skewY:99.7468,x:49.75,regY:8.5,y:122.15,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.1061,skewY:102.8939,regY:3.1,x:51,y:133.15,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8539,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1018,skewY:172.8982,x:11.4,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5551,skewY:177.4449,x:-36.8,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-51.7603,x:-75.8,y:48.6,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:151.3603,skewY:-28.6397,x:-127.05,y:116.3,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:116.7758,skewY:-63.2242,x:-133.65,y:121.05,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-75.2872,x:-57.3,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7487,y:-57.65,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-2.157,skewY:177.843,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8916,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5094,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9983,scaleY:0.9983,rotation:101.1562,x:69.1,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.2834,skewY:99.7166,x:49.75,regY:8.5,y:122.3,regX:-5.9}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.1354,skewY:102.8646,regY:3.1,x:51.05,y:133.1,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8539,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.35,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5551,skewY:177.4449,x:-36.8,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-47.0005,x:-77,y:48.25,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:156.1203,skewY:-23.8797,x:-133.7,y:111.55,regX:5.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:121.5361,skewY:-58.4639,x:-140.6,y:115.75,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-74.3363,x:-57.3,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7619,y:-57.65,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-2.2296,skewY:177.7704,x:-0.6,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8916,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5183,y:-26.15,x:47.85}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9984,scaleY:0.9984,rotation:101.1258,x:69.05,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.3137,skewY:99.6863,x:49.8,regY:8.5,y:122.25,regX:-5.9}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.1653,skewY:102.8347,regY:3.1,x:51.1,y:133.2,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8539,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.35,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5542,skewY:177.4458,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-42.2415,x:-78.25,y:47.9,regY:-0.1,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:160.8802,skewY:-19.1198,x:-139.85,y:106.35,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:126.2953,skewY:-53.7047,x:-147.2,y:109.9,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-73.3873,x:-57.35,y:-23.05,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.775,y:-57.65,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-2.3024,skewY:177.6976,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8916,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5258,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9984,scaleY:0.9983,rotation:101.0946,x:69.05,y:40.4}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.3439,skewY:99.6561,x:49.85,regY:8.5,y:122.2,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.1957,skewY:102.8043,regY:3.2,x:51.25,y:133.15,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8539,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.35,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5542,skewY:177.4458,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-37.4826,x:-79.35,y:47.55,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:165.6401,skewY:-14.3599,x:-145.7,y:100.65,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:131.0554,skewY:-48.9446,x:-153.3,y:103.55,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-72.4369,x:-57.35,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7881,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-2.3768,skewY:177.6232,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8916,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5349,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9983,scaleY:0.9983,rotation:101.0661,x:69.05,y:40.5}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.374,skewY:99.626,x:49.85,regY:8.5,y:122.2,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.2255,skewY:102.7745,regY:3.2,x:51.2,y:133.2,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8531,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.35,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5542,skewY:177.4458,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-32.7217,x:-80.5,y:47.15,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:170.3996,skewY:-9.6004,x:-151,y:94.55,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:135.8151,skewY:-44.1849,x:-158.95,y:96.95,regX:6.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-71.4883,x:-57.35,y:-23.05,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.8013,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-2.4494,skewY:177.5506,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5426,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9984,scaleY:0.9984,rotation:101.0357,x:69,y:40.5}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.4051,skewY:99.5949,x:49.9,regY:8.5,y:122.2,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.2559,skewY:102.7441,regY:3.2,x:51.3,y:133.15,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8531,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5542,skewY:177.4458,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-27.9621,x:-81.65,y:46.8,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:175.1601,skewY:-4.8399,x:-156,y:88.15,regX:5.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:140.5754,skewY:-39.4246,x:-163.85,y:89.75,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-70.5395,x:-57.35,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.8152,y:-57.75,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-2.523,skewY:177.4769,x:-0.6,y:-79.5}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5518,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:101.0046,x:69.05,y:40.55}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.4326,skewY:99.5674,x:49.95,regY:8.5,y:122.25,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.2847,skewY:102.7144,regY:3.2,x:51.35,y:133.25,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8531,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5542,skewY:177.4458,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-23.2028,x:-82.8,y:46.4,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:179.9194,skewY:-0.0806,x:-160.1,y:81.45,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:145.3338,skewY:-34.6662,x:-168.2,y:82.4,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-69.589,x:-57.35,y:-23.05,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.8285,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.999,skewX:-2.5958,skewY:177.4042,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5587,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:100.9759,x:69,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.4628,skewY:99.5372,x:49.95,regY:8.5,y:122.2,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.3162,skewY:102.6838,regY:3.2,x:51.4,y:133.15,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8531,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5542,skewY:177.4458,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-18.4424,x:-83.95,y:45.95,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-175.3253,skewY:4.6747,x:-164.1,y:74.5,regX:5.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:150.095,skewY:-29.905,x:-172.05,y:74.7,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-68.6393,x:-57.3,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.8415,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.6}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-2.6685,skewY:177.3315,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5662,y:-26.15,x:47.9}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:100.9465,x:69,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.4929,skewY:99.5071,x:50,regY:8.5,y:122.25,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.3466,skewY:102.6534,regY:3.2,x:51.4,y:133.2,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8531,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5542,skewY:177.4458,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-13.6835,x:-85.05,y:45.45,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-170.5658,skewY:9.4342,x:-167.25,y:67.25,regX:5.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,skewX:154.8546,skewY:-25.1454,x:-175.25,y:66.9,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-67.6902,x:-57.3,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.8547,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-2.7404,skewY:177.2596,x:-0.6,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5748,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:100.9153,x:68.95,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.5233,skewY:99.4767,x:50.05,regY:8.5,y:122.25,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.3754,skewY:102.6246,regY:3.2,x:51.45,y:133.2,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8531,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5542,skewY:177.4458,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.9229,x:-86.2,y:45.05,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-165.8062,skewY:14.1938,x:-169.8,y:59.9,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:159.6142,skewY:-20.3858,x:-177.75,y:58.8,regX:6.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-66.7403,x:-57.3,y:-23.05,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.8678,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.8,scaleX:0.999,scaleY:0.999,skewX:-2.8148,skewY:177.1851,x:-0.55,y:-79.45}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5831,y:-26.2,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:100.8859,x:68.95,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.5537,skewY:99.4463,x:49.95,regY:8.4,y:122.3,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.405,skewY:102.595,regY:3.2,x:51.5,y:133.25,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8531,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5542,skewY:177.4458,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-4.1633,x:-87.3,y:44.5,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-161.0463,skewY:18.9537,x:-171.85,y:52.5,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:164.3744,skewY:-15.6256,x:-179.75,y:50.7,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-65.7906,x:-57.4,y:-23.2,regY:0,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.8801,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.8,scaleX:0.999,scaleY:0.999,skewX:-2.8875,skewY:177.1124,x:-0.55,y:-79.4}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5922,y:-26.25,x:47.85}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9984,scaleY:0.9984,rotation:100.8553,x:68.95,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.5836,skewY:99.4164,x:49.95,regY:8.4,y:122.35,regX:-5.9}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.4356,skewY:102.5644,regY:3.2,x:51.5,y:133.2,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8531,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5542,skewY:177.4458,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:0.592,x:-88.45,y:44,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-156.2874,skewY:23.7126,x:-173.3,y:44.85,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:169.1339,skewY:-10.8661,x:-181.25,y:42.5,regX:6.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-64.8419,x:-57.35,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.8932,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-2.9612,skewY:177.0388,x:-0.6,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5992,y:-26.25,x:47.85}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9983,scaleY:0.9983,rotation:100.8253,x:69,y:40.5}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.6138,skewY:99.3862,x:50,regY:8.4,y:122.4,regX:-5.9}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.466,skewY:102.534,regY:3.2,x:51.6,y:133.25,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8531,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5542,skewY:177.4458,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.3522,x:-89.5,y:43.55,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-151.5265,skewY:28.4735,x:-174.2,y:37.3,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:173.8942,skewY:-6.1058,x:-181.75,y:34.3,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-63.8928,x:-57.35,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.9063,y:-57.75,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-3.0339,skewY:176.9661,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6083,y:-26.3,x:47.85}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9983,scaleY:0.9983,rotation:100.7959,x:68.95,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.6441,skewY:99.3559,x:50.05,regY:8.4,y:122.4,regX:-5.9}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.4957,skewY:102.5043,regY:3.2,x:51.55,y:133.25,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8531,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5542,skewY:177.4458,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:10.1118,x:-90.6,y:42.95,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-146.7668,skewY:33.2332,x:-174.5,y:29.75,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:178.6537,skewY:-1.3463,x:-181.7,y:26.1,regX:6.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-62.9423,x:-57.25,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.9195,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-3.1067,skewY:176.8933,x:-0.55,y:-79.5}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6152,y:-26.3,x:47.85}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9983,scaleY:0.9983,rotation:100.7655,x:68.9,y:40.4}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.6733,skewY:99.3267,x:50.1,regY:8.4,y:122.4,regX:-5.9}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.5261,skewY:102.4739,regY:3.2,x:51.65,y:133.3,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8531,x:21.4,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5534,skewY:177.4466,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:14.8706,x:-91.7,y:42.4,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-142.0083,skewY:37.9917,x:-174.1,y:22.25,regX:5.5,regY:-9}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-176.5909,skewY:3.4091,x:-181.15,y:18.1,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-61.9931,x:-57.3,y:-23.05,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.9335,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-3.1794,skewY:176.8206,x:-0.6,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6243,y:-26.3,x:47.85}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9983,scaleY:0.9983,rotation:100.7342,x:68.9,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.7037,skewY:99.2963,x:50.15,regY:8.4,y:122.35,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.5558,skewY:102.4442,regY:3.2,x:51.7,y:133.25,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8522,x:21.45,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5534,skewY:177.4466,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:19.6291,x:-92.8,y:41.85,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-137.2485,skewY:42.7515,x:-173.25,y:14.95,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-171.8321,skewY:8.1679,x:-179.95,y:10.15,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-61.0432,x:-57.3,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.9475,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-3.253,skewY:176.747,x:-0.5,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6321,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9983,rotation:100.7057,x:68.85,y:40.55}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.7336,skewY:99.2664,x:50.3,regY:8.5,y:122.3,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.5871,skewY:102.4129,regY:3.2,x:51.75,y:133.35,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8522,x:21.45,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5534,skewY:177.4466,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:24.3894,x:-93.85,y:41.2,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-132.4881,skewY:47.5119,x:-171.9,y:7.85,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-167.0714,skewY:12.9286,x:-178.05,y:2.45,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-60.0935,x:-57.3,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.9606,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-3.3267,skewY:176.6733,x:-0.6,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6396,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:100.6755,x:68.9,y:40.5}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.7638,skewY:99.2362,x:50.35,regY:8.5,y:122.4,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.6158,skewY:102.3842,regY:3.2,x:51.75,y:133.35,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8522,x:21.45,y:89.55,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5534,skewY:177.4466,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:29.1488,x:-94.95,y:40.65,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-127.7277,skewY:52.2723,x:-169.9,y:0.85,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-162.3126,skewY:17.6874,x:-175.5,y:-4.9,regX:6.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-59.1439,x:-57.3,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.9738,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-3.3994,skewY:176.6005,x:-0.6,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6487,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:100.6444,x:68.85,y:40.55}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.7929,skewY:99.2071,x:50.35,regY:8.5,y:122.35,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.6463,skewY:102.3537,regY:3.2,x:51.75,y:133.35,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8522,x:21.45,y:89.5,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5534,skewY:177.4466,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:33.9091,x:-95.95,y:40,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-122.9689,skewY:57.0311,x:-167.45,y:-5.95,regX:5.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-157.5525,skewY:22.4475,x:-172.6,y:-12.1,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-58.1953,x:-57.3,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.9869,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-3.4722,skewY:176.5278,x:-0.5,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6562,y:-26.35,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:100.6147,x:68.85,y:40.55}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.824,skewY:99.176,x:50.5,regY:8.6,y:122.4,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.6759,skewY:102.3241,regY:3.1,x:51.7,y:133.3,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8522,x:21.45,y:89.5,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5534,skewY:177.4466,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:38.6686,x:-96.95,y:39.35,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-118.2091,skewY:61.7909,x:-164.35,y:-12.25,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-152.7925,skewY:27.2075,x:-169.05,y:-19,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-57.2451,x:-57.25,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-2,y:-57.75,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-3.5441,skewY:176.4559,x:-0.6,y:-79.5}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8907,x:-26.45,y:89.95}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6656,y:-26.35,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:100.5845,x:68.85,y:40.55}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.8542,skewY:99.1458,x:50.55,regY:8.6,y:122.45,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.7063,skewY:102.2937,regY:3.1,x:51.7,y:133.35,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8522,x:21.45,y:89.5,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5534,skewY:177.4466,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:43.4282,x:-98.05,y:38.65,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-113.4502,skewY:66.5498,x:-160.85,y:-18.35,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-148.032,skewY:31.968,x:-164.95,y:-25.4,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-56.2954,x:-57.25,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-2.0131,y:-57.75,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.1,x:-5.6}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-3.6178,skewY:176.3822,x:-0.6,y:-79.5}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6717,y:-26.3,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:100.5544,x:68.8,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.8843,skewY:99.1157,x:50.55,regY:8.6,y:122.45,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.7367,skewY:102.2633,regY:3.1,x:51.75,y:133.35,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8522,x:21.45,y:89.5,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5534,skewY:177.4466,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:48.1876,x:-99.05,y:38,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-108.69,skewY:71.31,x:-156.9,y:-24.05,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-143.2732,skewY:36.7268,x:-160.4,y:-31.45,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-55.3444,x:-57.25,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-2.0263,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.8,scaleX:0.999,scaleY:0.999,skewX:-3.6915,skewY:176.3085,x:-0.5,y:-79.45}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6809,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:100.5249,x:68.85,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.9137,skewY:99.0863,x:50.6,regY:8.6,y:122.45,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.7655,skewY:102.2345,regY:3.1,x:51.8,y:133.35,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8522,x:21.45,y:89.5,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5534,skewY:177.4466,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:52.9485,x:-100.05,y:37.3,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-103.9292,skewY:76.0708,x:-152.6,y:-29.3,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-138.5132,skewY:41.4868,x:-155.45,y:-36.95,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-54.3958,x:-57.3,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-2.0403,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.3,regY:9.1,x:-5.75}},{t:this.instance_14,p:{regX:-0.2,regY:52.8,scaleX:0.999,scaleY:0.999,skewX:-3.7642,skewY:176.2358,x:-0.6,y:-79.4}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6892,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:100.4945,x:68.85,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.9447,skewY:99.0553,x:50.65,regY:8.6,y:122.45,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.7968,skewY:102.2032,regY:3.1,x:51.85,y:133.4,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8522,x:21.45,y:89.5,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1008,skewY:172.8992,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5534,skewY:177.4466,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:57.7079,x:-101.05,y:36.7,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-99.1696,skewY:80.8304,x:-147.85,y:-34.2,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-133.7526,skewY:46.2474,x:-150.05,y:-42.05,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-53.4461,x:-57.2,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-2.0535,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.6}},{t:this.instance_14,p:{regX:-0.2,regY:52.8,scaleX:0.999,scaleY:0.999,skewX:-3.837,skewY:176.1629,x:-0.55,y:-79.4}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6977,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:100.4642,x:68.8,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.974,skewY:99.026,x:50.6,regY:8.6,y:122.6,regX:-5.9}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.8263,skewY:102.1737,regY:3.1,x:52,y:133.3,regX:-4.9}},{t:this.instance_8,p:{rotation:4.8522,x:21.45,y:89.5,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1009,skewY:172.8991,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5534,skewY:177.4466,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:62.4679,x:-102,y:35.95,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-94.4103,skewY:85.5897,x:-142.8,y:-38.55,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-128.9932,skewY:51.0068,x:-144.3,y:-46.6,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-52.4982,x:-57.25,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-2.0666,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.6}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-3.9098,skewY:176.0902,x:-0.5,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.7058,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9984,scaleY:0.9984,rotation:100.434,x:68.8,y:40.4}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-81.0032,skewY:98.9968,x:50.65,regY:8.6,y:122.55,regX:-5.9}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.8567,skewY:102.1433,regY:3.1,x:51.95,y:133.3,regX:-4.9}},{t:this.instance_8,p:{rotation:4.8522,x:21.45,y:89.5,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1009,skewY:172.8991,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5534,skewY:177.4466,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:67.2276,x:-102.95,y:35.2,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:-89.655,skewY:90.345,x:-137.45,y:-42.4,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-124.2328,skewY:55.7672,x:-138.3,y:-50.5,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-51.5474,x:-57.2,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-2.0797,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.6}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-3.9835,skewY:176.0165,x:-0.6,y:-79.5}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.713,y:-26.4,x:47.85}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9984,scaleY:0.9984,rotation:100.4053,x:68.8,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-81.0332,skewY:98.9668,x:50.7,regY:8.6,y:122.55,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.8871,skewY:102.1129,regY:3.1,x:52.05,y:133.3,regX:-4.9}},{t:this.instance_8,p:{rotation:4.8512,x:21.45,y:89.5,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1009,skewY:172.8991,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5534,skewY:177.4466,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:71.9874,x:-103.95,y:34.4,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-84.8954,skewY:95.1046,x:-131.85,y:-45.8,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-119.4723,skewY:60.5277,x:-132,y:-53.85,regX:6.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-50.5976,x:-57.25,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-2.0929,y:-57.75,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.1,x:-5.6}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-4.0564,skewY:175.9436,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.7221,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9984,scaleY:0.9984,rotation:100.3751,x:68.75,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-81.0634,skewY:98.9366,x:50.65,regY:8.5,y:122.5,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.916,skewY:102.084,regY:3.1,x:52,y:133.35,regX:-4.9}},{t:this.instance_8,p:{rotation:4.8512,x:21.45,y:89.5,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1009,skewY:172.8991,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5526,skewY:177.4474,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:76.7473,x:-104.85,y:33.6,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-80.1358,skewY:99.8642,x:-126,y:-48.6,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-114.7132,skewY:65.2868,x:-125.5,y:-56.65,regX:6.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-49.6495,x:-57.2,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-2.106,y:-57.75,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.1,x:-5.6}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-4.1301,skewY:175.8699,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.7296,y:-26.4,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:100.3447,x:68.75,y:40.55}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-81.0935,skewY:98.9065,x:50.7,regY:8.5,y:122.5,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.9473,skewY:102.0527,regY:3.1,x:52.1,y:133.45,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8512,x:21.45,y:89.5,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1009,skewY:172.8991,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5526,skewY:177.4474,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:81.5069,x:-105.75,y:32.85,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-75.3767,skewY:104.6233,x:-120,y:-51,regX:5.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-109.9538,skewY:70.0462,x:-118.9,y:-58.85,regX:6.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-48.6995,x:-57.3,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-2.1191,y:-57.75,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.1,x:-5.6}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-4.202,skewY:175.798,x:-0.6,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.7371,y:-26.4,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:100.3139,x:68.8,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-81.1237,skewY:98.8763,x:50.65,regY:8.5,y:122.55,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-77.9761,skewY:102.0239,regY:3.1,x:52.15,y:133.45,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8512,x:21.45,y:89.5,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1009,skewY:172.8991,x:11.3,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5526,skewY:177.4474,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9983,rotation:86.2659,x:-106.7,y:32.05,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-70.6151,skewY:109.3849,x:-113.9,y:-52.55,regX:5.5,regY:-9}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-105.1932,skewY:74.8068,x:-112.2,y:-60.6,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-47.7493,x:-57.25,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-2.1323,y:-57.75,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.1,x:-5.6}},{t:this.instance_14,p:{regX:-0.1,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-4.2757,skewY:175.7243,x:-0.65,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:72.7454,y:-26.4,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:100.2846,x:68.75,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-81.154,skewY:98.846,x:50.7,regY:8.5,y:122.55,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-78.0065,skewY:101.9935,regY:3.2,x:52.25,y:133.35,regX:-4.9}},{t:this.instance_8,p:{rotation:4.8512,x:21.45,y:89.45,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1009,skewY:172.8991,x:11.25,y:186.2}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5526,skewY:177.4474,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:91.022,x:-107.65,y:31.15,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-65.8565,skewY:114.1435,x:-107.85,y:-53.7,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-100.4332,skewY:79.5668,x:-105.3,y:-61.5,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-46.8005,x:-57.25,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-2.0158,y:-57.75,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.8,scaleX:0.9989,scaleY:0.9989,skewX:-3.6353,skewY:176.3647,x:-0.5,y:-79.4}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.8185,y:-26.35,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:98.9528,x:68.6,y:40.65}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-82.4853,skewY:97.5147,x:52.55,regY:8.5,y:122.95,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-79.3381,skewY:100.6619,regY:3.2,x:54.35,y:133.9,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8512,x:21.45,y:89.45,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1009,skewY:172.8991,x:11.25,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5526,skewY:177.4474,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:85.3449,x:-126.2,y:3.85,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-71.5379,skewY:108.4621,x:-134.7,y:-80.6,regX:5.5,regY:-9}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-106.1138,skewY:73.8862,x:-133.1,y:-88.55,regX:6.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-20.9847,x:-57.25,y:-23,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.8985,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.6}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-2.9962,skewY:177.0038,x:-0.4,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9984,scaleY:0.9984,rotation:72.8894,y:-26.25,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:97.622,x:68.6,y:40.65}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-83.8162,skewY:96.1838,x:54.4,regY:8.5,y:123.3,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.6701,skewY:99.3299,regY:3.2,x:56.4,y:134.05,regX:-4.9}},{t:this.instance_8,p:{rotation:4.8512,x:21.45,y:89.45,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1009,skewY:172.8991,x:11.25,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5526,skewY:177.4474,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:79.663,x:-131,y:-28.85,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-77.2185,skewY:102.7815,x:-147.95,y:-112,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-111.7946,skewY:68.2054,x:-147.1,y:-120.35,regX:6.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:4.824,x:-57.3,y:-23,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7829,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.6}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-2.3567,skewY:177.6433,x:-0.4,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:72.9609,y:-26.4,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:96.2888,x:68.45,y:40.65}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-85.1483,skewY:94.8517,x:56.2,regY:8.5,y:123.65,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.0017,skewY:97.9983,regY:3.1,x:58.35,y:134.4,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8503,x:21.45,y:89.45,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1009,skewY:172.8991,x:11.25,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5526,skewY:177.4474,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:73.9811,x:-121.1,y:-60.4,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.9005,skewY:97.0995,x:-146.2,y:-141.45,regX:5.5,regY:-9}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-117.4754,skewY:62.5246,x:-146.1,y:-149.7,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:30.6377,x:-57.25,y:-22.95,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.6664,y:-57.65,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.2,x:-5.6}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-1.7174,skewY:178.2826,x:-0.25,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.89,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:73.0321,y:-26.3,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:94.9567,x:68.3,y:40.7}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-86.4803,skewY:93.5197,x:57.9,regY:8.4,y:123.85,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-83.3339,skewY:96.6661,regY:3.1,x:60.4,y:134.7,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8503,x:21.45,y:89.45,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1009,skewY:172.8991,x:11.25,y:186.25}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.5517,skewY:177.4483,x:-36.85,y:184.65,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:68.2997,x:-98.45,y:-84.45,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-88.582,skewY:91.418,x:-131.55,y:-162.6,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-123.1566,skewY:56.8434,x:-132.2,y:-170.85,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:56.4525,x:-57.25,y:-22.9,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.6735,y:-57.65,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-1.7296,skewY:178.2704,x:-0.3,y:-79.55}},{t:this.instance_13,p:{regX:1.7,scaleX:0.9982,scaleY:0.9982,rotation:5.8671,x:-26.3,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:72.9936,y:-26.4,x:47.9}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:94.8985,x:68.4,y:40.65}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-86.5802,skewY:93.4198,x:58.05,regY:8.4,y:123.9,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-83.4733,skewY:96.5267,regY:3.2,x:60.7,y:134.65,regX:-4.8}},{t:this.instance_8,p:{rotation:4.8127,x:21.4,y:89.45,regY:1.7}},{t:this.instance_7,p:{regY:-53.1,scaleX:0.9977,scaleY:0.9977,skewX:-7.1619,skewY:172.8381,x:11.35,y:186.2}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.6086,skewY:177.3913,x:-36.8,y:184.65,scaleX:0.998,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:68.3651,x:-98.45,y:-84.45,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,skewX:-88.5453,skewY:91.4547,x:-131.4,y:-162.7,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-123.092,skewY:56.908,x:-132.05,y:-170.9,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:56.4911,x:-57.3,y:-23,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.6804,y:-57.65,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.7428,skewY:178.2572,x:-0.3,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8442,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:72.9559,y:-26.4,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:94.8371,x:68.45,y:40.65}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-86.6802,skewY:93.3198,x:58.3,regY:8.5,y:123.9,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-83.6143,skewY:96.3857,regY:3.2,x:60.85,y:134.7,regX:-4.8}},{t:this.instance_8,p:{rotation:4.7748,x:21.4,y:89.65,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9977,scaleY:0.9977,skewX:-7.2254,skewY:172.7746,x:11.35,y:186.1}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.6666,skewY:177.3334,x:-36.75,y:184.65,scaleX:0.998,scaleY:0.998}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:68.4306,x:-98.4,y:-84.45,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-88.5093,skewY:91.4907,x:-131.25,y:-162.75,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-123.0274,skewY:56.9726,x:-131.85,y:-171,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:56.5302,x:-57.25,y:-22.9,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.6874,y:-57.65,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.999,scaleY:0.999,skewX:-1.7559,skewY:178.2441,x:-0.25,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.8214,x:-26.4,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.9183,y:-26.35,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:94.7764,x:68.55,y:40.65}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-86.7812,skewY:93.2188,x:58.45,regY:8.5,y:123.9,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-83.7552,skewY:96.2448,regY:3.2,x:60.95,y:134.7,regX:-4.8}},{t:this.instance_8,p:{rotation:4.7361,x:21.35,y:89.6,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9977,scaleY:0.9977,skewX:-7.2882,skewY:172.7118,x:11.45,y:186.1}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.7236,skewY:177.2764,x:-36.75,y:184.65,scaleX:0.998,scaleY:0.998}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:68.4955,x:-98.3,y:-84.5,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-88.4734,skewY:91.5266,x:-131.1,y:-162.8,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-122.9615,skewY:57.0385,x:-131.65,y:-170.95,regX:6.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:56.5691,x:-57.3,y:-22.95,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.6944,y:-57.65,scaleX:0.9991,scaleY:0.9991,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.999,skewX:-1.7681,skewY:178.2318,x:-0.35,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.7975,x:-26.4,y:89.95}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9984,scaleY:0.9984,rotation:72.8794,y:-26.2,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:94.7176,x:68.5,y:40.65}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-86.8811,skewY:93.1189,x:58.5,regY:8.4,y:123.9,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-83.8962,skewY:96.1038,regY:3.2,x:61.15,y:134.7,regX:-4.8}},{t:this.instance_8,p:{rotation:4.6974,x:21.35,y:89.6,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9977,scaleY:0.9977,skewX:-7.35,skewY:172.65,x:11.5,y:186.05}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.7806,skewY:177.2194,x:-36.7,y:184.65,scaleX:0.998,scaleY:0.998}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:68.5612,x:-98.25,y:-84.5,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-88.4366,skewY:91.5634,x:-131.05,y:-162.9,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-122.8969,skewY:57.1031,x:-131.5,y:-170.95,regX:6.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:56.6072,x:-57.25,y:-22.95,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7024,y:-57.65,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.999,skewX:-1.7821,skewY:178.2179,x:-0.25,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.7746,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9984,scaleY:0.9984,rotation:72.8418,y:-26.25,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:94.657,x:68.6,y:40.65}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-86.982,skewY:93.018,x:58.65,regY:8.4,y:123.9,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-84.0362,skewY:95.9638,regY:3.2,x:61.35,y:134.7,regX:-4.8}},{t:this.instance_8,p:{rotation:4.6588,x:21.35,y:89.65,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.4135,skewY:172.5865,x:11.55,y:186.05}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.8384,skewY:177.1616,x:-36.65,y:184.7,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:68.6261,x:-98.25,y:-84.55,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-88.4016,skewY:91.5984,x:-130.9,y:-162.95,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-122.833,skewY:57.167,x:-131.5,y:-171.15,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:56.6459,x:-57.3,y:-23,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7094,y:-57.65,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.2,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.7953,skewY:178.2047,x:-0.3,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.7509,x:-26.4,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:72.8041,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:94.5962,x:68.65,y:40.55}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-87.0827,skewY:92.9173,x:58.85,regY:8.5,y:123.9,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-84.177,skewY:95.823,regY:3.2,x:61.5,y:134.65,regX:-4.8}},{t:this.instance_8,p:{rotation:4.6209,x:21.4,y:89.65,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9977,scaleY:0.9977,skewX:-7.4764,skewY:172.5236,x:11.65,y:186.05}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.8954,skewY:177.1046,x:-36.6,y:184.7,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:68.6921,x:-98.25,y:-84.6,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-88.3648,skewY:91.6352,x:-130.7,y:-163,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-122.7684,skewY:57.2316,x:-131.4,y:-171.2,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:56.685,x:-57.3,y:-22.9,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.35,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.7653,y:-26.35,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:94.5366,x:68.7,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-87.1828,skewY:92.8172,x:59.1,regY:8.6,y:123.85,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-84.3178,skewY:95.6822,regY:3.2,x:61.6,y:134.65,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.4,y:89.6,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.75,y:186.1}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:68.7562,x:-98.2,y:-84.6,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-88.3289,skewY:91.6711,x:-130.6,y:-163.05,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-122.7038,skewY:57.2962,x:-131.3,y:-171.3,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:56.7236,x:-57.25,y:-22.95,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.35,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.7371,y:-26.35,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:94.8679,x:68.7,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-86.8504,skewY:93.1496,x:58.55,regY:8.5,y:123.75,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-83.986,skewY:96.014,regY:3.2,x:61.15,y:134.6,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.4,y:89.6,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.75,y:186.1}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:61.157,x:-105.6,y:-79,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-95.9229,skewY:84.0771,x:-148.1,y:-152.55,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-130.3033,skewY:49.6967,x:-149.85,y:-160.55,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:49.5166,x:-57.25,y:-23,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.35,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.7066,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:95.2001,x:68.75,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-86.5188,skewY:93.4812,x:57.95,regY:8.4,y:123.7,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-83.653,skewY:96.347,regY:3.2,x:60.65,y:134.5,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.4,y:89.6,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.75,y:186.1}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:53.5568,x:-112.2,y:-72.5,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-103.5237,skewY:76.4763,x:-164.1,y:-139.75,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-137.9028,skewY:42.0972,x:-166.9,y:-147.5,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:42.309,x:-57.2,y:-23,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.35,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6753,y:-26.35,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:95.5308,x:68.75,y:40.55}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-86.1871,skewY:93.8129,x:57.65,regY:8.5,y:123.65,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-83.3234,skewY:96.6766,regY:3.1,x:59.95,y:134.45,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.6,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.75,y:186.1}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:45.9568,x:-118,y:-65.15,regY:0,regX:44.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-111.1231,skewY:68.8769,x:-178.25,y:-125.05,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-145.5024,skewY:34.4976,x:-182.05,y:-132.3,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:35.1011,x:-57.35,y:-23.05,regY:0.1,regX:35.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.4,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.646,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9984,scaleY:0.9984,rotation:95.8635,x:68.8,y:40.35}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-85.8553,skewY:94.1447,x:57.2,regY:8.5,y:123.6,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-82.9898,skewY:97.0102,regY:3.2,x:59.55,y:134.4,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.6,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.75,y:186.1}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:38.3574,x:-122.8,y:-57.35,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-118.7232,skewY:61.2768,x:-190.5,y:-108.6,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-153.1024,skewY:26.8976,x:-195.2,y:-115.2,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:27.8933,x:-57.25,y:-22.95,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.4,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.6152,y:-26.3,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:96.1955,x:68.95,y:40.55}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-85.5234,skewY:94.4766,x:56.75,regY:8.5,y:123.55,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-82.6589,skewY:97.3411,regY:3.1,x:58.95,y:134.35,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.6,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.75,y:186.1}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:30.7582,x:-126.65,y:-48.8,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-126.3232,skewY:53.6768,x:-200.45,y:-90.65,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-160.702,skewY:19.298,x:-206.05,y:-96.7,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:20.687,x:-57.35,y:-22.95,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.4,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5845,y:-26.2,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:96.5267,x:68.9,y:40.55}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-85.1922,skewY:94.8078,x:56.3,regY:8.5,y:123.45,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-82.3278,skewY:97.6722,regY:3.2,x:58.6,y:134.3,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.6,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.75,y:186.1}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:23.1578,x:-129.3,y:-40,regY:-0.1,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-133.9218,skewY:46.0782,x:-208.15,y:-71.7,regX:5.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-168.3015,skewY:11.6985,x:-214.4,y:-76.8,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:13.4791,x:-57.25,y:-22.95,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.45,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5554,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:96.8585,x:68.95,y:40.55}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-84.8616,skewY:95.1384,x:55.9,regY:8.5,y:123.4,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-81.9954,skewY:98.0046,regY:3.1,x:57.95,y:134.2,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.6,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.8,y:186.15}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:15.5584,x:-130.9,y:-30.65,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-141.5225,skewY:38.4775,x:-213.15,y:-51.8,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:-175.9019,skewY:4.0981,x:-220.15,y:-56.15,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:6.2724,x:-57.2,y:-22.95,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.45,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.5241,y:-26.2,x:47.9}},{t:this.instance_11,p:{regX:-39.6,scaleX:0.9983,scaleY:0.9983,rotation:97.1902,x:68.95,y:40.6}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-84.5284,skewY:95.4716,x:55.45,regY:8.5,y:123.3,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-81.6637,skewY:98.3363,regY:3.2,x:57.6,y:134.1,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.6,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.8,y:186.15}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:7.9594,x:-131.3,y:-21.35,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-149.1211,skewY:30.8789,x:-215.65,y:-31.45,regX:5.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:176.5049,skewY:-3.4951,x:-222.95,y:-34.8,regX:6.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-0.9318,x:-57.3,y:-22.95,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.45,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9983,scaleY:0.9983,rotation:72.4936,y:-26.2,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:97.5222,x:69.05,y:40.5}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-84.1957,skewY:95.8043,x:55,regY:8.5,y:123.15,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-81.3317,skewY:98.6683,regY:3.1,x:56.95,y:134,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.65,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.8,y:186.15}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:0.3599,x:-130.5,y:-12.15,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-156.72,skewY:23.28,x:-215.4,y:-10.9,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:168.9044,skewY:-11.0956,x:-223.4,y:-13.3,regX:6.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.1384,x:-57.25,y:-22.95,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.5,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.1,scaleX:0.9984,scaleY:0.9984,rotation:72.4645,y:-26.15,x:47.9}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:97.8534,x:69.05,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-83.8648,skewY:96.1352,x:54.7,regY:8.6,y:123.1,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-81.0001,skewY:98.9999,regY:3.2,x:56.55,y:133.9,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.65,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.8,y:186.15}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.2352,x:-128.45,y:-3.1,regY:0,regX:44.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-164.3197,skewY:15.6803,x:-212.55,y:9.45,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:161.3058,skewY:-18.6942,x:-220.6,y:8,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-15.3464,x:-57.2,y:-22.95,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.5,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:72.4343,y:-26.3,x:47.85}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9984,scaleY:0.9984,rotation:98.185,x:69.1,y:40.35}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-83.5334,skewY:96.4666,x:54.05,regY:8.5,y:123,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.6683,skewY:99.3309,regY:3.2,x:56.1,y:133.75,regX:-4.9}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.65,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.8,y:186.15}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-14.8353,x:-125.5,y:5.7,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-171.9198,skewY:8.0802,x:-207.15,y:29.1,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:153.706,skewY:-26.294,x:-215.45,y:28.95,regX:6.5}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-22.5549,x:-57.3,y:-22.9,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.5,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:72.4039,y:-26.3,x:47.9}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:98.5171,x:69.1,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-83.2019,skewY:96.7981,x:53.7,regY:8.5,y:122.9,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-80.3363,skewY:99.6637,regY:3.2,x:55.6,y:133.85,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.65,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.8,y:186.15}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-22.4343,x:-121.35,y:14.05,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:-179.5192,skewY:0.4808,x:-199.2,y:48.05,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,skewX:146.1054,skewY:-33.8946,x:-207.3,y:48.9,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-29.7614,x:-57.3,y:-22.95,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90.05}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:72.3745,y:-26.3,x:47.85}},{t:this.instance_11,p:{regX:-39.6,scaleX:0.9983,scaleY:0.9983,rotation:98.8484,x:69.2,y:40.65}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-82.8694,skewY:97.1306,x:53.25,regY:8.5,y:122.8,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.0056,skewY:99.9944,regY:3.2,x:55.15,y:133.75,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.65,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.8,y:186.15}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-30.0339,x:-116.2,y:21.7,regY:0,regX:44.1}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:172.8854,skewY:-7.1145,x:-188.8,y:65.7,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:138.5058,skewY:-41.4942,x:-196.75,y:67.7,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-36.9699,x:-57.35,y:-22.95,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90.05}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.3438,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:99.1807,x:69.2,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-82.5383,skewY:97.4617,x:52.7,regY:8.4,y:122.7,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-79.673,skewY:100.327,regY:3.2,x:54.55,y:133.6,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.65,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.8,y:186.15}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-37.6337,x:-110.05,y:28.9,regY:0.1,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:165.287,skewY:-14.713,x:-176.3,y:82,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:130.9064,skewY:-49.0936,x:-183.95,y:84.95,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-44.1776,x:-57.35,y:-23.15,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90.05}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:72.3147,y:-26.3,x:47.9}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:99.5127,x:69.25,y:40.4}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-82.2061,skewY:97.7939,x:52.35,regY:8.5,y:122.6,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-79.3424,skewY:100.6576,regY:3.2,x:54.15,y:133.55,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.7,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.85,y:186.15}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-45.2347,x:-103.2,y:34.95,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:157.6863,skewY:-22.3137,x:-161.75,y:96.45,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:123.3065,skewY:-56.6935,x:-168.95,y:100.45,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-51.3859,x:-57.35,y:-23.05,regY:0.1,regX:35.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.55,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90.05}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:72.2843,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:99.8443,x:69.35,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-81.8746,skewY:98.1254,x:51.95,regY:8.5,y:122.45,regX:-6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,skewX:-79.0097,skewY:100.9903,regY:3.2,x:53.6,y:133.45,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.7,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.85,y:186.15}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-52.8334,x:-95.6,y:40.3,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:150.0856,skewY:-29.9144,x:-145.6,y:109,regX:5.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,skewX:115.706,skewY:-64.294,x:-152,y:113.85,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-58.5923,x:-57.35,y:-23.05,regY:0.1,regX:35.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.65}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.6,y:-79.55}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90.05}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9983,scaleY:0.9983,rotation:72.2538,y:-26.35,x:47.8}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9984,scaleY:0.9984,rotation:100.1758,x:69.35,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-81.5438,skewY:98.4562,x:51.55,regY:8.5,y:122.3,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-78.678,skewY:101.322,regY:3.2,x:53.1,y:133.35,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.7,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.85,y:186.2}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.55,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-60.4325,x:-87.3,y:44.6,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:142.4864,skewY:-37.5136,x:-127.7,y:119.25,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:108.1073,skewY:-71.8927,x:-133.55,y:125,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-65.8004,x:-57.3,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.7}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.6,y:-79.6}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90.05}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:72.2247,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.7,scaleX:0.9983,scaleY:0.9983,rotation:100.5063,x:69.4,y:40.45}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-81.2116,skewY:98.7884,x:51.05,regY:8.5,y:122.25,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-78.3464,skewY:101.6536,regY:3.2,x:52.65,y:133.25,regX:-4.8}},{t:this.instance_8,p:{rotation:4.5822,x:21.45,y:89.7,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.85,y:186.2}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.5,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-68.0326,x:-78.65,y:47.8,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:134.8873,skewY:-45.1127,x:-108.8,y:127.15,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:100.507,skewY:-79.493,x:-113.85,y:133.6,regX:6.6}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-73.0078,x:-57.35,y:-23.1,regY:0.1,regX:35.4}}]},1).to({state:[{t:this.instance_15,p:{rotation:-1.7164,y:-57.75,scaleX:0.999,scaleY:0.999,regX:-1.2,regY:9.1,x:-5.7}},{t:this.instance_14,p:{regX:-0.2,regY:52.7,scaleX:0.9989,scaleY:0.9989,skewX:-1.8084,skewY:178.1916,x:-0.6,y:-79.6}},{t:this.instance_13,p:{regX:1.6,scaleX:0.9982,scaleY:0.9982,rotation:5.728,x:-26.45,y:90.05}},{t:this.instance_12,p:{regX:-31.2,scaleX:0.9984,scaleY:0.9984,rotation:72.1937,y:-26.35,x:47.85}},{t:this.instance_11,p:{regX:-39.8,scaleX:0.9983,scaleY:0.9983,rotation:100.8404,x:69.45,y:40.4}},{t:this.instance_10,p:{scaleX:0.9984,scaleY:0.9984,skewX:-80.8799,skewY:99.1201,x:50.75,regY:8.6,y:122.2,regX:-6}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,skewX:-78.0146,skewY:101.9854,regY:3.2,x:52.15,y:133,regX:-4.9}},{t:this.instance_8,p:{rotation:4.5822,x:21.5,y:89.7,regY:1.8}},{t:this.instance_7,p:{regY:-53.2,scaleX:0.9978,scaleY:0.9978,skewX:-7.5382,skewY:172.4618,x:11.85,y:186.2}},{t:this.instance_6},{t:this.instance_5,p:{skewX:-2.9533,skewY:177.0467,x:-36.5,y:184.75,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_4},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-75.6318,x:-69.6,y:49.95,regY:0,regX:44}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,skewX:127.2894,skewY:-52.7106,x:-88.9,y:132.65,regX:5.5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,skewX:92.9091,skewY:-87.0909,x:-93.15,y:139.55,regX:6.7}},{t:this.instance,p:{scaleX:0.9983,scaleY:0.9983,rotation:-80.216,x:-57.4,y:-23.05,regY:0.1,regX:35.4}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-251.7,-209.5,328.1,511);


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
	this.instance = new lib.ch1_uArm_rcopy3("synched",0);
	this.instance.setTransform(-57.3,-22.9,0.9988,0.9988,-95.0606,0,0,35.8,0.5);

	this.instance_1 = new lib.ch1_hand_rcopy3("synched",0);
	this.instance_1.setTransform(-80.05,140.4,0.9986,0.9986,0,104.851,-75.149,6.7,-0.9);

	this.instance_2 = new lib.ch1_thumb_rcopy3("synched",0);
	this.instance_2.setTransform(-81.05,131.7,0.9989,0.9989,0,92.6232,-87.3768,5.7,-8.3);

	this.instance_3 = new lib.ch1_lArm_rcopy3("synched",0);
	this.instance_3.setTransform(-50.9,51.45,0.9987,0.9987,-68.987,0,0,44.1,0);

	this.instance_4 = new lib.ch1_uBodycopy3("synched",0);
	this.instance_4.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_5 = new lib.ch1_lLeg_rcopy3("synched",0);
	this.instance_5.setTransform(-36.05,186.25,0.9985,0.9985,0,6.3488,-173.6512,3.5,-54.8);

	this.instance_6 = new lib.ch1_lBodycopy3("synched",0);
	this.instance_6.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_7 = new lib.ch1_lLeg_lcopy3("synched",0);
	this.instance_7.setTransform(23.3,188.2,0.9981,0.9981,0,-7.4527,172.5473,2.4,-54.1);

	this.instance_8 = new lib.ch1_uLeg_lcopy3("synched",0);
	this.instance_8.setTransform(19.6,90.85,0.9981,0.9981,-2.8399,0,0,-0.4,1.6);

	this.instance_9 = new lib.ch1_hand_lcopy3("synched",0);
	this.instance_9.setTransform(22.2,114.15,0.9988,0.9988,0,-49.5603,130.4397,-5.1,3.4);

	this.instance_10 = new lib.ch1_thumb_lcopy3("synched",0);
	this.instance_10.setTransform(27.55,104.15,0.9988,0.9988,0,-42.1671,137.8329,-6.4,8);

	this.instance_11 = new lib.ch1_lArm_lcopy3("synched",0);
	this.instance_11.setTransform(78.8,41.6,0.9988,0.9988,129.381,0,0,-40,-0.2);

	this.instance_12 = new lib.ch1_uArm_lcopy3("synched",0);
	this.instance_12.setTransform(47.5,-26.2,0.9988,0.9988,66.077,0,0,-31.9,-1);

	this.instance_13 = new lib.ch1_uLeg_rcopy3("synched",0);
	this.instance_13.setTransform(-23.3,91.35,0.9986,0.9986,5.8376,0,0,1.8,-45.6);

	this.instance_14 = new lib.ch1_headcopy3("synched",0);
	this.instance_14.setTransform(4.2,-78.6,0.9992,0.9993,0,-1.737,178.263,0.4,53.6);

	this.instance_15 = new lib.ch1_neckcopy3("synched",0);
	this.instance_15.setTransform(-4.95,-57.9,0.9993,0.9993,-1.6853,0,0,-0.5,9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{scaleX:0.9993,scaleY:0.9993,rotation:-1.6853,y:-57.9,x:-4.95,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9993,skewX:-1.737,skewY:178.263,x:4.2,regY:53.6,y:-78.6}},{t:this.instance_13,p:{scaleX:0.9986,scaleY:0.9986,rotation:5.8376,x:-23.3,y:91.35,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:66.077,x:47.5,y:-26.2,regY:-1}},{t:this.instance_11,p:{rotation:129.381,x:78.8,y:41.6,scaleX:0.9988,scaleY:0.9988,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9988,scaleY:0.9988,skewX:-42.1671,skewY:137.8329,x:27.55,y:104.15,regY:8,regX:-6.4}},{t:this.instance_9,p:{regX:-5.1,scaleX:0.9988,scaleY:0.9988,skewX:-49.5603,skewY:130.4397,x:22.2,y:114.15,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8399,x:19.6,y:90.85}},{t:this.instance_7,p:{scaleX:0.9981,scaleY:0.9981,skewX:-7.4527,skewY:172.5473,y:188.2,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9985,scaleY:0.9985,skewX:6.3488,skewY:-173.6512,x:-36.05,y:186.25,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9987,scaleY:0.9987,rotation:-68.987,x:-50.9,y:51.45,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9989,scaleY:0.9989,skewX:92.6232,skewY:-87.3768,x:-81.05,y:131.7,regY:-8.3}},{t:this.instance_1,p:{regY:-0.9,scaleX:0.9986,scaleY:0.9986,skewX:104.851,skewY:-75.149,x:-80.05,y:140.4,regX:6.7}},{t:this.instance,p:{rotation:-95.0606,x:-57.3,y:-22.9,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]}).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.6924,y:-57.85,x:-4.95,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-1.8597,skewY:178.1404,x:4.15,regY:53.6,y:-78.6}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8371,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:66.2132,x:47.45,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:128.9607,x:78.6,y:41.7,scaleX:0.9988,scaleY:0.9988,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-42.5883,skewY:137.4117,x:27.8,y:104.55,regY:8,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-49.9818,skewY:130.0182,x:22.45,y:114.75,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8383,x:19.55,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4522,skewY:172.5478,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3483,skewY:-173.6517,x:-36,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-63.1456,x:-53.15,y:51.45,regX:44.1}},{t:this.instance_2,p:{regX:5.8,scaleX:0.9988,scaleY:0.9988,skewX:98.4647,skewY:-81.5353,x:-91.25,y:128.2,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:110.6923,skewY:-69.3077,x:-91.2,y:137.05,regX:6.7}},{t:this.instance,p:{rotation:-93.3992,x:-57.2,y:-22.95,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7011,y:-57.85,x:-4.95,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-1.9857,skewY:178.0143,x:4.15,regY:53.5,y:-78.75}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8371,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:66.3492,x:47.45,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:128.5384,x:78.45,y:41.7,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-43.0101,skewY:136.9899,x:28.15,y:105.05,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-50.4038,skewY:129.5962,x:22.85,y:115.15,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8383,x:19.55,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4522,skewY:172.5478,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3483,skewY:-173.6517,x:-36,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-57.3023,x:-55.35,y:51.55,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:104.3086,skewY:-75.6914,x:-101.05,y:124.15,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:116.5361,skewY:-63.4639,x:-101.85,y:132.8,regX:6.7}},{t:this.instance,p:{rotation:-91.7378,x:-57.25,y:-22.95,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7107,y:-57.85,x:-4.95,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.1109,skewY:177.8891,x:4.1,regY:53.5,y:-78.75}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.837,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:66.4853,x:47.5,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:128.1165,x:78.25,y:41.75,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-43.4319,skewY:136.5681,x:28.5,y:105.45,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-50.8249,skewY:129.1751,x:23.25,y:115.75,regY:3.5}},{t:this.instance_8,p:{rotation:-2.8383,x:19.55,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4522,skewY:172.5478,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3483,skewY:-173.6517,x:-36,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-51.4591,x:-57.45,y:51.55,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:110.1508,skewY:-69.8492,x:-110.3,y:119.05,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:122.3794,skewY:-57.6206,x:-112.05,y:127.7,regX:6.7}},{t:this.instance,p:{rotation:-90.0762,x:-57.2,y:-22.95,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7204,y:-57.85,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.2361,skewY:177.7639,x:4.15,regY:53.5,y:-78.75}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.837,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:66.6224,x:47.5,y:-26.2,regY:-1}},{t:this.instance_11,p:{rotation:127.6949,x:78.1,y:41.8,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-43.8542,skewY:136.1458,x:28.7,y:105.95,regY:8,regX:-6.3}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-51.247,skewY:128.753,x:23.6,y:116.15,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8383,x:19.55,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4522,skewY:172.5478,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3483,skewY:-173.6517,x:-36,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-45.6153,x:-59.6,y:51.5,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:115.9935,skewY:-64.0065,x:-119.1,y:113.35,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:128.2224,skewY:-51.7776,x:-121.7,y:121.7,regX:6.6}},{t:this.instance,p:{rotation:-88.4215,x:-57.25,y:-23,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9993,scaleY:0.9993,rotation:-1.7291,y:-57.85,x:-4.95,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.3605,skewY:177.6395,x:4.1,regY:53.5,y:-78.75}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.837,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:66.7574,x:47.5,y:-26.2,regY:-1}},{t:this.instance_11,p:{rotation:127.2734,x:77.9,y:41.8,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-44.2751,skewY:135.7249,x:29.15,y:106.4,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-51.6686,skewY:128.3314,x:23.95,y:116.65,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8383,x:19.55,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4523,skewY:172.5477,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3483,skewY:-173.6517,x:-36,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-39.7718,x:-61.75,y:51.4,regX:44.1}},{t:this.instance_2,p:{regX:5.8,scaleX:0.9988,scaleY:0.9988,skewX:121.8361,skewY:-58.1639,x:-127.2,y:106.75,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:134.0651,skewY:-45.9349,x:-130.7,y:114.9,regX:6.6}},{t:this.instance,p:{rotation:-86.7604,x:-57.3,y:-22.95,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7388,y:-57.85,x:-4.95,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.4857,skewY:177.5143,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.837,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:66.8946,x:47.4,y:-26.2,regY:-0.9}},{t:this.instance_11,p:{rotation:126.8515,x:77.7,y:42,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-44.6979,skewY:135.3021,x:29.45,y:106.8,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-52.0902,skewY:127.9098,x:24.3,y:117.1,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8383,x:19.55,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4523,skewY:172.5477,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3483,skewY:-173.6517,x:-36,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-33.929,x:-63.95,y:51.15,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:127.6807,skewY:-52.3193,x:-134.7,y:99.7,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:139.9087,skewY:-40.0913,x:-138.9,y:107.35,regX:6.7}},{t:this.instance,p:{rotation:-85.099,x:-57.25,y:-22.85,scaleX:0.9988,scaleY:0.9988,regX:35.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7484,y:-57.85,x:-4.95,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.6119,skewY:177.3881,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.837,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:67.0311,x:47.35,y:-26.25,regY:-0.9}},{t:this.instance_11,p:{rotation:126.4292,x:77.5,y:42.05,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-45.1195,skewY:134.8805,x:29.65,y:107.15,regY:8,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-52.5114,skewY:127.4886,x:24.7,y:117.5,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8374,x:19.55,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4523,skewY:172.5477,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3483,skewY:-173.6517,x:-36,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-28.0859,x:-66.1,y:51,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:133.5249,skewY:-46.4751,x:-141.5,y:91.95,regY:-8.2}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:145.7519,skewY:-34.2481,x:-146.3,y:99.2,regX:6.7}},{t:this.instance,p:{rotation:-83.4381,x:-57.2,y:-22.95,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7571,y:-57.85,x:-4.85,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.737,skewY:177.263,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.837,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:67.1673,x:47.45,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:126.0083,x:77.4,y:42.05,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-45.5404,skewY:134.4596,x:30.05,y:107.6,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-52.9349,skewY:127.0651,x:25.05,y:118,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8374,x:19.55,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4523,skewY:172.5477,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3483,skewY:-173.6517,x:-36,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-22.2421,x:-68.25,y:50.7,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:139.3673,skewY:-40.6327,x:-147.35,y:83.85,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:151.5947,skewY:-28.4053,x:-152.95,y:90.45,regX:6.7}},{t:this.instance,p:{rotation:-81.7784,x:-57.25,y:-23,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7668,y:-57.85,x:-4.85,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.8614,skewY:177.1386,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.837,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:67.3045,x:47.45,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:125.5863,x:77.2,y:42.15,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-45.9632,skewY:134.0368,x:30.35,y:108.05,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-53.3558,skewY:126.6442,x:25.45,y:118.5,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8374,x:19.55,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4523,skewY:172.5477,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3483,skewY:-173.6517,x:-36,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-16.3986,x:-70.3,y:50.3,regX:44.1}},{t:this.instance_2,p:{regX:5.8,scaleX:0.9988,scaleY:0.9988,skewX:145.2098,skewY:-34.7902,x:-152.25,y:75.2,regY:-8.3}},{t:this.instance_1,p:{regY:-0.9,scaleX:0.9985,scaleY:0.9985,skewX:157.438,skewY:-22.562,x:-158.65,y:81.4,regX:6.7}},{t:this.instance,p:{rotation:-80.1173,x:-57.2,y:-22.9,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7764,y:-57.85,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.9877,skewY:177.0123,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.837,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9987,rotation:67.4399,x:47.45,y:-26.2,regY:-1}},{t:this.instance_11,p:{rotation:125.1651,x:77.05,y:42.2,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-46.3842,skewY:133.6158,x:30.55,y:108.5,regY:8,regX:-6.3}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-53.7777,skewY:126.2223,x:25.95,y:118.95,regY:3.5}},{t:this.instance_8,p:{rotation:-2.8374,x:19.55,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4523,skewY:172.5477,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3483,skewY:-173.6517,x:-36,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-10.5562,x:-72.35,y:49.95,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:151.0529,skewY:-28.9471,x:-156.6,y:66.35,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:163.2816,skewY:-16.7184,x:-163.45,y:71.7,regX:6.7}},{t:this.instance,p:{rotation:-78.4566,x:-57.25,y:-23,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7852,y:-57.85,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.1129,skewY:176.8871,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.837,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:67.5758,x:47.45,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:124.7426,x:76.9,y:42.25,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-46.8047,skewY:133.1953,x:31,y:108.85,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-54.1994,skewY:125.8006,x:26.25,y:119.3,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8374,x:19.55,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4523,skewY:172.5477,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3483,skewY:-173.6517,x:-36,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:-4.7134,x:-74.45,y:49.45,regX:44.1}},{t:this.instance_2,p:{regX:5.8,scaleX:0.9988,scaleY:0.9988,skewX:156.8957,skewY:-23.1043,x:-159.85,y:57.15,regY:-8.2}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:169.1245,skewY:-10.8755,x:-167.4,y:61.85,regX:6.6}},{t:this.instance,p:{rotation:-76.7952,x:-57.2,y:-22.95,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7957,y:-57.85,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.2382,skewY:176.7618,x:4.05,regY:53.5,y:-78.8}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8361,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:67.7124,x:47.4,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:124.3221,x:76.7,y:42.4,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-47.2284,skewY:132.7716,x:31.35,y:109.3,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-54.6211,skewY:125.3789,x:26.65,y:119.8,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8374,x:19.55,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4523,skewY:172.5477,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3474,skewY:-173.6526,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:1.1267,x:-76.55,y:48.9,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:162.7391,skewY:-17.2609,x:-162.3,y:47.9,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:174.9671,skewY:-5.0329,x:-170.3,y:51.75,regX:6.6}},{t:this.instance,p:{rotation:-75.1347,x:-57.25,y:-22.95,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8053,y:-57.85,x:-4.85,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.3645,skewY:176.6355,x:4.1,regY:53.5,y:-78.8}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8361,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:67.8491,x:47.5,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:123.8993,x:76.6,y:42.5,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-47.6496,skewY:132.3504,x:31.55,y:109.7,regY:8,regX:-6.4}},{t:this.instance_9,p:{regX:-5.1,scaleX:0.9987,scaleY:0.9987,skewX:-55.0432,skewY:124.9568,x:27.1,y:120.15,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8374,x:19.55,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4523,skewY:172.5477,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3474,skewY:-173.6526,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:6.9691,x:-78.65,y:48.35,regX:44.1}},{t:this.instance_2,p:{regX:5.8,scaleX:0.9988,scaleY:0.9988,skewX:168.5829,skewY:-11.4171,x:-163.7,y:38.65,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:-179.1936,skewY:0.8064,x:-172,y:41.6,regX:6.7}},{t:this.instance,p:{rotation:-73.4743,x:-57.25,y:-23.05,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8149,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.489,skewY:176.511,x:4.05,regY:53.5,y:-78.8}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8361,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:67.9856,x:47.5,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:123.4774,x:76.35,y:42.5,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-48.0717,skewY:131.9283,x:32,y:110.1,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-55.4647,skewY:124.5353,x:27.5,y:120.7,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8366,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4523,skewY:172.5477,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3474,skewY:-173.6526,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:12.8125,x:-80.7,y:47.6,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:174.4258,skewY:-5.5742,x:-164.55,y:29.35,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:-173.3503,skewY:6.6497,x:-172.95,y:31.5,regX:6.7}},{t:this.instance,p:{rotation:-71.8131,x:-57.2,y:-23,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8237,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.6143,skewY:176.3857,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8361,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.1224,x:47.5,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:123.0552,x:76.15,y:42.5,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-48.4927,skewY:131.5073,x:32.2,y:110.5,regY:8.1,regX:-6.3}},{t:this.instance_9,p:{regX:-5.1,scaleX:0.9987,scaleY:0.9987,skewX:-55.8848,skewY:124.1152,x:27.95,y:120.95,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8366,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4523,skewY:172.5477,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3473,skewY:-173.6527,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:18.6553,x:-82.65,y:46.95,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-179.7357,skewY:0.2643,x:-164.25,y:20.2,regY:-8.3}},{t:this.instance_1,p:{regY:-0.9,scaleX:0.9986,scaleY:0.9986,skewX:-167.5073,skewY:12.4927,x:-172.85,y:21.65,regX:6.7}},{t:this.instance,p:{rotation:-70.1515,x:-57.3,y:-23.05,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8333,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.7397,skewY:176.2603,x:4.05,regY:53.6,y:-78.6}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8361,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.2574,x:47.45,y:-26.2,regY:-1}},{t:this.instance_11,p:{rotation:122.6329,x:76,y:42.55,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-48.914,skewY:131.086,x:32.65,y:110.9,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-56.3082,skewY:123.6918,x:28.3,y:121.55,regY:3.5}},{t:this.instance_8,p:{rotation:-2.8366,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4523,skewY:172.5477,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3473,skewY:-173.6527,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9986,scaleY:0.9986,rotation:24.4986,x:-84.75,y:46.25,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-173.8934,skewY:6.1065,x:-163.1,y:11.25,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-161.6647,skewY:18.3353,x:-171.8,y:11.65,regX:6.7}},{t:this.instance,p:{rotation:-68.491,x:-57.25,y:-22.95,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.843,y:-57.8,x:-4.85,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.8651,skewY:176.1349,x:4.05,regY:53.6,y:-78.6}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8361,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.3941,x:47.5,y:-26.2,regY:-1}},{t:this.instance_11,p:{rotation:122.2118,x:75.85,y:42.65,scaleX:0.9988,scaleY:0.9988,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-49.3365,skewY:130.6635,x:32.95,y:111.25,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-56.7295,skewY:123.2705,x:28.75,y:121.9,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8366,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4514,skewY:172.5486,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3473,skewY:-173.6527,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:30.3401,x:-86.7,y:45.3,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-168.0501,skewY:11.9499,x:-161.15,y:2.7,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-155.8214,skewY:24.1786,x:-169.95,y:2.2,regX:6.6}},{t:this.instance,p:{rotation:-66.8306,x:-57.25,y:-23,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8517,y:-57.8,x:-4.85,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.9904,skewY:176.0095,x:4.1,regY:53.6,y:-78.6}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8361,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.5302,x:47.45,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:121.7907,x:75.6,y:42.85,scaleX:0.9988,scaleY:0.9988,regY:-0.1,regX:-39.9}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-49.7588,skewY:130.2412,x:33.3,y:111.6,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-57.152,skewY:122.848,x:29.1,y:122.3,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8366,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4514,skewY:172.5486,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3473,skewY:-173.6527,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:36.1842,x:-88.55,y:44.5,regX:44.2}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-162.2075,skewY:17.7925,x:-158.35,y:-5.55,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-149.9782,skewY:30.0218,x:-166.95,y:-6.9,regX:6.7}},{t:this.instance,p:{rotation:-65.1698,x:-57.25,y:-23,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8613,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.116,skewY:175.884,x:4.05,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8361,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.6669,x:47.45,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:121.3689,x:75.45,y:42.95,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-39.9}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-50.1788,skewY:129.8212,x:33.6,y:112.1,regY:8.1,regX:-6.3}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-57.572,skewY:122.428,x:29.5,y:122.65,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8366,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4514,skewY:172.5486,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3473,skewY:-173.6527,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:42.0279,x:-90.6,y:43.55,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-156.3636,skewY:23.6364,x:-154.8,y:-13.3,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-144.1351,skewY:35.8649,x:-163.2,y:-15.55,regX:6.7}},{t:this.instance,p:{rotation:-63.5093,x:-57.2,y:-23,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.871,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.2414,skewY:175.7586,x:4.05,regY:53.6,y:-78.6}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8353,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.803,x:47.45,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:120.946,x:75.35,y:42.95,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-39.9}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-50.6015,skewY:129.3985,x:34.05,y:112.4,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-57.9956,skewY:122.0044,x:29.95,y:123.05,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8366,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4514,skewY:172.5486,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3473,skewY:-173.6527,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:47.8705,x:-92.5,y:42.5,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-150.5208,skewY:29.4792,x:-150.6,y:-20.6,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-138.2917,skewY:41.7083,x:-158.75,y:-23.6,regX:6.7}},{t:this.instance,p:{rotation:-61.8478,x:-57.25,y:-23.05,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8797,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.3668,skewY:175.6332,x:4.05,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8353,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.9402,x:47.5,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:120.5252,x:75.1,y:43.05,scaleX:0.9988,scaleY:0.9988,regY:-0.2,regX:-39.9}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-51.0222,skewY:128.9778,x:34.35,y:112.8,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-58.4159,skewY:121.5841,x:30.3,y:123.55,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8357,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4514,skewY:172.5486,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3473,skewY:-173.6527,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:53.7137,x:-94.3,y:41.5,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-144.6763,skewY:35.3237,x:-145.75,y:-27.2,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-132.4484,skewY:47.5516,x:-153.5,y:-31.05,regX:6.7}},{t:this.instance,p:{rotation:-60.1875,x:-57.15,y:-22.95,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8893,y:-57.8,x:-4.85,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.4924,skewY:175.5076,x:4.05,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8353,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9988,scaleY:0.9988,rotation:69.0754,x:47.4,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:120.1035,x:75,y:43.2,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-39.9}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-51.4451,skewY:128.5549,x:34.75,y:113.15,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-58.8382,skewY:121.1618,x:30.8,y:123.9,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8357,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4514,skewY:172.5486,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3473,skewY:-173.6527,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:59.5572,x:-96.2,y:40.35,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-138.8342,skewY:41.1658,x:-140.3,y:-33.2,regY:-8.3}},{t:this.instance_1,p:{regY:-0.9,scaleX:0.9985,scaleY:0.9985,skewX:-126.6051,skewY:53.3949,x:-147.7,y:-37.75,regX:6.7}},{t:this.instance,p:{rotation:-58.5261,x:-57.15,y:-23,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.899,y:-57.8,x:-4.85,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.6161,skewY:175.3839,x:4,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8353,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:69.212,x:47.45,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:119.6811,x:74.85,y:43.2,scaleX:0.9988,scaleY:0.9988,regY:-0.2,regX:-39.9}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-51.8675,skewY:128.1325,x:34.95,y:113.45,regY:8,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-59.2599,skewY:120.7401,x:31.2,y:124.25,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8357,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4514,skewY:172.5486,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3464,skewY:-173.6535,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:65.3995,x:-97.95,y:39.4,regX:44.2}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-132.9911,skewY:47.0089,x:-134.3,y:-38.55,regY:-8.2}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-120.7627,skewY:59.2373,x:-141.25,y:-43.8,regX:6.7}},{t:this.instance,p:{rotation:-56.8657,x:-57.2,y:-23.05,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.9077,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.7408,skewY:175.2592,x:4.05,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8353,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:69.3494,x:47.5,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:119.2602,x:74.7,y:43.2,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-52.2886,skewY:127.7114,x:35.35,y:113.85,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-59.6821,skewY:120.3179,x:31.65,y:124.7,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8357,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4514,skewY:172.5486,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3464,skewY:-173.6535,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:71.2439,x:-99.8,y:38.1,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-127.1481,skewY:52.8519,x:-128.05,y:-42.95,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-114.9187,skewY:65.0813,x:-134.3,y:-49,regX:6.7}},{t:this.instance,p:{rotation:-55.2045,x:-57.2,y:-22.95,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.9173,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.8673,skewY:175.1327,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8353,x:-23.25,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:69.4848,x:47.45,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:118.8386,x:74.5,y:43.25,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-52.7108,skewY:127.2892,x:35.7,y:114.2,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-60.1034,skewY:119.8966,x:32.1,y:125.05,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8357,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4514,skewY:172.5486,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3464,skewY:-173.6535,x:-35.9,y:186.2,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:77.086,x:-101.55,y:36.95,regX:44.2}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-121.3044,skewY:58.6956,x:-121.45,y:-46.7,regY:-8.3}},{t:this.instance_1,p:{regY:-0.9,scaleX:0.9985,scaleY:0.9985,skewX:-109.0756,skewY:70.9244,x:-127.1,y:-53.3,regX:6.7}},{t:this.instance,p:{rotation:-53.5431,x:-57.2,y:-23,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.927,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.9928,skewY:175.0072,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8353,x:-23.2,y:91.25,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:69.6219,x:47.45,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:118.4167,x:74.4,y:43.25,scaleX:0.9988,scaleY:0.9988,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-53.1324,skewY:126.8676,x:36.1,y:114.55,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5.1,scaleX:0.9987,scaleY:0.9987,skewX:-60.5257,skewY:119.4743,x:32.5,y:125.3,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8357,x:19.5,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4514,skewY:172.5486,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3464,skewY:-173.6535,x:-35.85,y:186.15,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:82.9295,x:-103.25,y:35.55,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-115.4618,skewY:64.5382,x:-114.5,y:-49.55,regY:-8.3}},{t:this.instance_1,p:{regY:-0.9,scaleX:0.9985,scaleY:0.9985,skewX:-103.2329,skewY:76.7671,x:-119.4,y:-56.75,regX:6.7}},{t:this.instance,p:{rotation:-51.8829,x:-57.2,y:-23,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.9121,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.7795,skewY:175.2205,x:4.05,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8273,x:-23.4,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:69.3721,x:47.5,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:119.1168,x:74.55,y:43.2,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-39.9}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-52.4228,skewY:127.5772,x:35.45,y:113.8,regY:8,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-59.8207,skewY:120.1793,x:31.85,y:124.85,regY:3.5}},{t:this.instance_8,p:{rotation:-2.8366,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4559,skewY:172.5441,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3483,skewY:-173.6517,x:-35.95,y:186.15,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9987,scaleY:0.9987,rotation:86.0671,x:-121.35,y:15,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-112.3196,skewY:67.6804,x:-127.75,y:-70.65,regY:-8.3}},{t:this.instance_1,p:{regY:-0.9,scaleX:0.9986,scaleY:0.9986,skewX:-100.1043,skewY:79.8957,x:-132.45,y:-78.05,regX:6.7}},{t:this.instance,p:{rotation:-30.7215,x:-57.2,y:-22.85,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8981,y:-57.8,x:-4.85,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.5678,skewY:175.4322,x:3.95,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8204,x:-23.4,y:91.3,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:69.1228,x:47.45,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:119.8157,x:74.95,y:43,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-51.7136,skewY:128.2864,x:34.95,y:113.3,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-59.1143,skewY:120.8857,x:31.05,y:124.15,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8383,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4612,skewY:172.5388,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3509,skewY:-173.6491,x:-36,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:89.2068,x:-130.6,y:-10.7,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-109.176,skewY:70.824,x:-132.45,y:-96.6,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-96.9725,skewY:83.0275,x:-136.55,y:-104.2,regX:6.7}},{t:this.instance,p:{rotation:-9.5566,x:-57.25,y:-22.85,scaleX:0.9988,scaleY:0.9988,regX:35.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8841,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.3546,skewY:175.6454,x:3.95,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8125,x:-23.35,y:91.3,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.8745,x:47.45,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:120.517,x:75.25,y:42.95,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-39.9}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-51.0035,skewY:128.9965,x:34.4,y:112.65,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-58.4076,skewY:121.5924,x:30.4,y:123.5,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8392,x:19.55,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4664,skewY:172.5336,y:188.15,x:23.35,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3535,skewY:-173.6465,x:-36,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:92.3389,x:-130,y:-38,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-106.034,skewY:73.966,x:-127.15,y:-123.9,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:-93.8447,skewY:86.1553,x:-130.85,y:-131.7,regX:6.7}},{t:this.instance,p:{rotation:11.6006,x:-57.2,y:-22.9,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8692,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.1422,skewY:175.8577,x:3.9,regY:53.6,y:-78.7}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.8055,x:-23.35,y:91.3,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.6256,x:47.45,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:121.2158,x:75.55,y:42.75,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-50.2919,skewY:129.7081,x:33.85,y:111.95,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-57.7027,skewY:122.2973,x:29.6,y:122.85,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8401,x:19.6,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4717,skewY:172.5283,y:188.05,x:23.25,regY:-54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3562,skewY:-173.6438,x:-35.95,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:95.4764,x:-119.65,y:-63.25,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-102.8912,skewY:77.1088,x:-112.15,y:-148.85,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:-90.7153,skewY:89.2847,x:-115.3,y:-156.9,regX:6.7}},{t:this.instance,p:{rotation:32.7636,x:-57.3,y:-23,scaleX:0.9988,scaleY:0.9988,regX:35.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8473,y:-57.8,x:-4.85,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.136,skewY:175.8639,x:3.95,regY:53.6,y:-78.7}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.794,x:-23.3,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.6442,x:47.4,y:-26.2,regY:-1}},{t:this.instance_11,p:{rotation:121.2523,x:75.55,y:42.7,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-50.2416,skewY:129.7584,x:33.8,y:112,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-57.6573,skewY:122.3427,x:29.6,y:122.75,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8427,x:19.6,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4815,skewY:172.5185,y:188.05,x:23.25,regY:-54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3606,skewY:-173.6394,x:-35.9,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:94.2287,x:-118.9,y:-64.45,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-104.1335,skewY:75.8665,x:-113.2,y:-150.2,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:-91.9782,skewY:88.0218,x:-116.55,y:-158.1,regX:6.7}},{t:this.instance,p:{rotation:33.8527,x:-57.2,y:-22.95,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8263,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.1299,skewY:175.8701,x:3.95,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.7842,x:-23.3,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.6627,x:47.4,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:121.2873,x:75.5,y:42.7,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-50.1913,skewY:129.8087,x:33.75,y:112,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-57.6121,skewY:122.3879,x:29.5,y:122.8,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8462,x:19.6,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4912,skewY:172.5088,y:188.05,x:23.25,regY:-54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.366,skewY:-173.634,x:-35.95,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:92.9822,x:-118.1,y:-65.55,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-105.3756,skewY:74.6244,x:-114.3,y:-151.4,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:-93.2403,skewY:86.7597,x:-117.8,y:-159.3,regX:6.7}},{t:this.instance,p:{rotation:34.9422,x:-57.2,y:-22.9,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.8044,y:-57.8,x:-4.85,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.1238,skewY:175.8762,x:3.95,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.772,x:-23.15,y:91.3,regX:1.8}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.6811,x:47.4,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:121.3235,x:75.5,y:42.75,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-50.1415,skewY:129.8585,x:33.7,y:112.05,regY:8.1,regX:-6.3}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-57.5672,skewY:122.4328,x:29.5,y:122.7,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8497,x:19.6,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.4999,skewY:172.5001,y:188.05,x:23.25,regY:-54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3712,skewY:-173.6288,x:-35.9,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:91.7336,x:-117.25,y:-66.75,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-106.6183,skewY:73.3817,x:-115.3,y:-152.65,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:-94.504,skewY:85.496,x:-119.1,y:-160.6,regX:6.6}},{t:this.instance,p:{rotation:36.0321,x:-57.2,y:-22.9,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7817,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.1177,skewY:175.8823,x:4,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.7615,x:-23.35,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.7007,x:47.45,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:121.3599,x:75.45,y:42.85,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-39.9}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-50.0905,skewY:129.9095,x:33.55,y:112,regY:8.1,regX:-6.3}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-57.522,skewY:122.478,x:29.35,y:122.75,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8523,x:19.6,y:90.75}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.5089,skewY:172.4911,y:188.05,x:23.3,regY:-54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3756,skewY:-173.6244,x:-35.95,y:186.2,regX:3.5}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:90.4867,x:-116.35,y:-67.85,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-107.8603,skewY:72.1397,x:-116.35,y:-153.75,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:-95.7672,skewY:84.2328,x:-120.3,y:-161.55,regX:6.7}},{t:this.instance,p:{rotation:37.1197,x:-57.25,y:-22.9,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7598,y:-57.8,x:-4.95,regX:-0.6}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.1116,skewY:175.8884,x:4,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.7499,x:-23.35,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.7189,x:47.45,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:121.3949,x:75.45,y:42.75,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-50.0403,skewY:129.9597,x:33.45,y:111.9,regY:8,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-57.4783,skewY:122.5217,x:29.35,y:122.7,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8558,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.5186,skewY:172.4814,y:188,x:23.25,regY:-54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.381,skewY:-173.619,x:-35.7,y:186.25,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:89.2436,x:-115.55,y:-68.95,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-109.1032,skewY:70.8968,x:-117.35,y:-154.85,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-97.0289,skewY:82.9711,x:-121.4,y:-162.55,regX:6.7}},{t:this.instance,p:{rotation:38.2088,x:-57.15,y:-22.9,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.7379,y:-57.8,x:-4.95,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.1054,skewY:175.8946,x:4,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.7393,x:-23.35,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.7362,x:47.4,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:121.4311,x:75.35,y:42.7,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-49.9886,skewY:130.0114,x:33.5,y:111.9,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-57.4329,skewY:122.5671,x:29.25,y:122.75,regY:3.4}},{t:this.instance_8,p:{rotation:-2.8585,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.5282,skewY:172.4716,y:188.1,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3861,skewY:-173.6139,x:-35.75,y:186.25,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:87.994,x:-114.7,y:-70.1,regX:44.1}},{t:this.instance_2,p:{regX:5.8,scaleX:0.9988,scaleY:0.9988,skewX:-110.3458,skewY:69.6542,x:-118.25,y:-155.8,regY:-8.2}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:-98.2932,skewY:81.7068,x:-122.6,y:-163.65,regX:6.6}},{t:this.instance,p:{rotation:39.2998,x:-57.25,y:-22.9,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-4.0993,skewY:175.9007,x:3.95,regY:53.5,y:-78.75}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.3,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.755,x:47.4,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:121.468,x:75.35,y:42.85,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-49.9396,skewY:130.0611,x:33.4,y:111.85,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-57.3873,skewY:122.6127,x:29.2,y:122.65,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.3,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.7,y:186.25,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:86.7478,x:-113.8,y:-71.2,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-111.588,skewY:68.412,x:-119.3,y:-156.85,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:-99.556,skewY:80.444,x:-123.75,y:-164.4,regX:6.7}},{t:this.instance,p:{rotation:40.3898,x:-57.2,y:-22.9,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.9467,skewY:176.0533,x:4.05,regY:53.6,y:-78.6}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.3,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.5648,x:47.4,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:121.9641,x:75.55,y:42.7,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-49.4421,skewY:130.5579,x:33,y:111.5,regY:8.1,regX:-6.3}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-56.8895,skewY:123.1105,x:28.7,y:122.15,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.35,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.7,y:186.25,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:76.3797,x:-120.7,y:-61.75,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-121.9549,skewY:58.0451,x:-141.55,y:-145,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-109.9219,skewY:70.0781,x:-147.2,y:-151.65,regX:6.7}},{t:this.instance,p:{rotation:31.3556,x:-57.2,y:-22.85,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.7941,skewY:176.2059,x:4.05,regY:53.6,y:-78.6}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.35,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.3733,x:47.45,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:122.4613,x:75.85,y:42.7,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-39.9}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-48.945,skewY:131.055,x:32.7,y:111,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-56.3947,skewY:123.6053,x:28.35,y:121.75,regY:3.5}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.35,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.7,y:186.25,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:0,scaleX:0.9987,scaleY:0.9987,rotation:66.0124,x:-126.05,y:-51.15,regX:44.2}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9987,scaleY:0.9987,skewX:-132.322,skewY:47.678,x:-161.5,y:-129.45,regY:-8.3}},{t:this.instance_1,p:{regY:-0.9,scaleX:0.9986,scaleY:0.9986,skewX:-120.2914,skewY:59.7086,x:-168.4,y:-134.9,regX:6.7}},{t:this.instance,p:{rotation:22.3219,x:-57.1,y:-23,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.6406,skewY:176.3594,x:4,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.35,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:68.1809,x:47.4,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:122.9559,x:76.1,y:42.55,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-48.4474,skewY:131.5526,x:32.25,y:110.6,regY:8.1,regX:-6.3}},{t:this.instance_9,p:{regX:-5.1,scaleX:0.9987,scaleY:0.9987,skewX:-55.8967,skewY:124.1033,x:27.85,y:121.1,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.35,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.7,y:186.25,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:55.6454,x:-129.55,y:-40.15,regX:44.1}},{t:this.instance_2,p:{regX:5.8,scaleX:0.9988,scaleY:0.9988,skewX:-142.6901,skewY:37.3099,x:-178.5,y:-110.65,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-130.6577,skewY:49.3423,x:-186.25,y:-114.8,regX:6.7}},{t:this.instance,p:{rotation:13.2885,x:-57.15,y:-22.9,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.4881,skewY:176.5119,x:4,regY:53.5,y:-78.8}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.35,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:67.9915,x:47.5,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:123.4546,x:76.35,y:42.45,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-47.9515,skewY:132.0485,x:31.9,y:110.15,regY:8.1,regX:-6.3}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-55.4016,skewY:124.5984,x:27.45,y:120.7,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.35,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.7,y:186.25,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:45.2786,x:-131.45,y:-28.55,regX:44.1}},{t:this.instance_2,p:{regX:5.8,scaleX:0.9988,scaleY:0.9988,skewX:-153.058,skewY:26.942,x:-192.25,y:-89.1,regY:-8.3}},{t:this.instance_1,p:{regY:-0.9,scaleX:0.9985,scaleY:0.9985,skewX:-141.0245,skewY:38.9755,x:-200.6,y:-91.75,regX:6.7}},{t:this.instance,p:{rotation:4.2529,x:-57.25,y:-22.85,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.3356,skewY:176.6644,x:4,regY:53.5,y:-78.8}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.35,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:67.8003,x:47.45,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:123.9503,x:76.6,y:42.35,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-47.4557,skewY:132.5443,x:31.55,y:109.55,regY:8.1,regX:-6.3}},{t:this.instance_9,p:{regX:-5.1,scaleX:0.9987,scaleY:0.9987,skewX:-54.9043,skewY:125.0957,x:27.1,y:120.05,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.35,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.7,y:186.25,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:34.9095,x:-131.45,y:-16.85,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-163.4247,skewY:16.5753,x:-202.2,y:-65.5,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-151.3918,skewY:28.6082,x:-210.85,y:-66.65,regX:6.7}},{t:this.instance,p:{rotation:-4.7762,x:-57.2,y:-22.9,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.8,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.1831,skewY:176.8169,x:4,regY:53.5,y:-78.8}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.35,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:67.608,x:47.4,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:124.4461,x:76.8,y:42.2,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-46.9589,skewY:133.0411,x:31.25,y:109.1,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-54.4071,skewY:125.5929,x:26.55,y:119.65,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.35,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.7,y:186.3,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:24.544,x:-129.55,y:-5.3,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:-173.7922,skewY:6.2077,x:-207.95,y:-40.3,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:-161.7591,skewY:18.2409,x:-216.65,y:-39.95,regX:6.7}},{t:this.instance,p:{rotation:-13.8091,x:-57.35,y:-22.8,scaleX:0.9988,scaleY:0.9988,regX:35.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.85,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-3.0297,skewY:176.9703,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.35,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:67.4168,x:47.45,y:-26.3,regY:-1}},{t:this.instance_11,p:{rotation:124.9427,x:77.05,y:42.2,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-46.4616,skewY:133.5384,x:30.95,y:108.5,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-53.9105,skewY:126.0895,x:26.1,y:119.05,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.35,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.7,y:186.3,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:14.1777,x:-125.95,y:5.85,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:175.8464,skewY:-4.1535,x:-209.3,y:-14.55,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:-172.126,skewY:7.874,x:-217.75,y:-12.6,regX:6.7}},{t:this.instance,p:{rotation:-22.8431,x:-57.3,y:-22.85,scaleX:0.9988,scaleY:0.9988,regX:35.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.85,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.8772,skewY:177.1227,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.35,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:67.2276,x:47.4,y:-26.25,regY:-0.9}},{t:this.instance_11,p:{rotation:125.4396,x:77.25,y:42.1,scaleX:0.9988,scaleY:0.9988,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-45.9657,skewY:134.0343,x:30.6,y:108.1,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5.1,scaleX:0.9987,scaleY:0.9987,skewX:-53.4146,skewY:126.5854,x:25.75,y:118.4,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.35,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.75,y:186.3,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:3.81,x:-120.55,y:16.2,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:165.4797,skewY:-14.5203,x:-206.3,y:11.1,regY:-8.2}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:177.511,skewY:-2.489,x:-214.15,y:14.6,regX:6.7}},{t:this.instance,p:{rotation:-31.8764,x:-57.25,y:-22.9,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.85,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.7239,skewY:177.2761,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.35,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:67.0362,x:47.35,y:-26.25,regY:-0.9}},{t:this.instance_11,p:{rotation:125.9362,x:77.5,y:41.95,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-45.4692,skewY:134.5308,x:30.3,y:107.6,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-52.9181,skewY:127.0819,x:25.3,y:117.9,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.35,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.75,y:186.3,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:-6.553,x:-113.65,y:25.65,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:155.1118,skewY:-24.8882,x:-198.8,y:36.15,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:167.1454,skewY:-12.8546,x:-206.05,y:41,regX:6.7}},{t:this.instance,p:{rotation:-40.9106,x:-57.2,y:-22.95,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.85,x:-4.9,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.5715,skewY:177.4285,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.35,y:91.25,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:66.8449,x:47.35,y:-26.25,regY:-0.9}},{t:this.instance_11,p:{rotation:126.4331,x:77.8,y:41.9,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-44.9734,skewY:135.0266,x:29.9,y:107.1,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5.1,scaleX:0.9987,scaleY:0.9987,skewX:-52.4208,skewY:127.5792,x:24.95,y:117.3,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.35,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.75,y:186.3,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:-16.9213,x:-105.25,y:33.85,regX:44.2}},{t:this.instance_2,p:{regX:5.8,scaleX:0.9988,scaleY:0.9988,skewX:144.7455,skewY:-35.2545,x:-187.1,y:59.45,regY:-8.3}},{t:this.instance_1,p:{regY:-0.9,scaleX:0.9986,scaleY:0.9986,skewX:156.778,skewY:-23.222,x:-193.45,y:65.7,regX:6.7}},{t:this.instance,p:{rotation:-49.9456,x:-57.15,y:-22.95,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.85,x:-4.95,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.4183,skewY:177.5817,x:4.1,regY:53.6,y:-78.65}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.4,y:91.3,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:66.6546,x:47.5,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:126.9291,x:77.95,y:41.7,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-44.4763,skewY:135.5237,x:29.6,y:106.55,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-51.9255,skewY:128.0745,x:24.5,y:116.85,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.4,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.75,y:186.3,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-27.287,x:-95.7,y:40.7,regX:44.2}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:134.3773,skewY:-45.6227,x:-171.7,y:80.75,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9986,scaleY:0.9986,skewX:146.4102,skewY:-33.5898,x:-176.9,y:87.8,regX:6.7}},{t:this.instance,p:{rotation:-58.9798,x:-57.2,y:-23,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.85,x:-4.95,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.2668,skewY:177.7332,x:4.1,regY:53.5,y:-78.75}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.4,y:91.3,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:66.4629,x:47.45,y:-26.2,regY:-1}},{t:this.instance_11,p:{rotation:127.4265,x:78.25,y:41.6,scaleX:0.9987,scaleY:0.9987,regY:-0.1,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-43.9792,skewY:136.0208,x:29.25,y:106,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-51.4276,skewY:128.5724,x:24.05,y:116.3,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.4,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.75,y:186.3,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9987,scaleY:0.9987,rotation:-37.6536,x:-85.35,y:46.05,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:124.01,skewY:-55.99,x:-152.85,y:99.05,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:136.0426,skewY:-43.9574,x:-156.55,y:106.9,regX:6.7}},{t:this.instance,p:{rotation:-68.0134,x:-57.35,y:-22.95,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.85,x:-4.95,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-2.1136,skewY:177.8864,x:4.1,regY:53.5,y:-78.75}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.4,y:91.3,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:66.2724,x:47.45,y:-26.2,regY:-1}},{t:this.instance_11,p:{rotation:127.9232,x:78.5,y:41.65,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-43.4833,skewY:136.5167,x:28.95,y:105.5,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-50.9314,skewY:129.0686,x:23.75,y:115.75,regY:3.5}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.8}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.4,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.75,y:186.3,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-48.0217,x:-74.1,y:49.6,regX:44.2}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:113.6431,skewY:-66.3569,x:-131,y:113.85,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:125.6742,skewY:-54.3258,x:-133.25,y:122.25,regX:6.7}},{t:this.instance,p:{rotation:-77.0464,x:-57.25,y:-22.95,scaleX:0.9987,scaleY:0.9987,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.85,x:-4.95,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-1.9603,skewY:178.0397,x:4.15,regY:53.5,y:-78.75}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.4,y:91.3,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:66.0812,x:47.45,y:-26.2,regY:-1}},{t:this.instance_11,p:{rotation:128.42,x:78.8,y:41.5,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-40}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-42.9866,skewY:137.0134,x:28.65,y:105,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-50.4343,skewY:129.5657,x:23.3,y:115.15,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.85}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.4,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.75,y:186.3,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-58.3888,x:-62.6,y:51.35,regX:44.1}},{t:this.instance_2,p:{regX:5.7,scaleX:0.9988,scaleY:0.9988,skewX:103.2756,skewY:-76.7244,x:-107.1,y:124.8,regY:-8.2}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:115.3077,skewY:-64.6923,x:-107.65,y:133.5,regX:6.7}},{t:this.instance,p:{rotation:-86.0807,x:-57.25,y:-22.8,scaleX:0.9988,scaleY:0.9988,regX:35.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.716,y:-57.85,x:-4.95,regX:-0.5}},{t:this.instance_14,p:{scaleY:0.9992,skewX:-1.808,skewY:178.192,x:4.15,regY:53.6,y:-78.55}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:5.728,x:-23.4,y:91.3,regX:1.7}},{t:this.instance_12,p:{scaleX:0.9987,scaleY:0.9987,rotation:65.89,x:47.45,y:-26.25,regY:-1}},{t:this.instance_11,p:{rotation:128.9157,x:78.95,y:41.6,scaleX:0.9987,scaleY:0.9987,regY:-0.2,regX:-39.9}},{t:this.instance_10,p:{scaleX:0.9987,scaleY:0.9987,skewX:-42.4897,skewY:137.5103,x:28.25,y:104.4,regY:8.1,regX:-6.4}},{t:this.instance_9,p:{regX:-5,scaleX:0.9987,scaleY:0.9987,skewX:-49.9383,skewY:130.0617,x:22.85,y:114.6,regY:3.4}},{t:this.instance_8,p:{rotation:-2.862,x:19.6,y:90.85}},{t:this.instance_7,p:{scaleX:0.998,scaleY:0.998,skewX:-7.538,skewY:172.462,y:188.15,x:23.4,regY:-54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9984,scaleY:0.9984,skewX:6.3914,skewY:-173.6086,x:-35.75,y:186.3,regX:3.4}},{t:this.instance_4},{t:this.instance_3,p:{regY:-0.1,scaleX:0.9986,scaleY:0.9986,rotation:-68.7562,x:-50.95,y:51.3,regX:44.1}},{t:this.instance_2,p:{regX:5.8,scaleX:0.9988,scaleY:0.9988,skewX:92.909,skewY:-87.091,x:-81.3,y:131.35,regY:-8.3}},{t:this.instance_1,p:{regY:-0.8,scaleX:0.9985,scaleY:0.9985,skewX:104.9409,skewY:-75.0591,x:-80.45,y:140.2,regX:6.7}},{t:this.instance,p:{rotation:-95.1101,x:-57.3,y:-22.95,scaleX:0.9988,scaleY:0.9988,regX:35.8,regY:0.5}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-244.3,-216.5,335.3,521);


// stage content:
(lib.LessonChapter2_11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,183];
	this.streamSoundSymbolsList[0] = [{id:"DuringWar211wav",startFrame:0,endFrame:184,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("DuringWar211wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,184,1);
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
			document.location.replace("/LessonChapter2_12.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("/LessonChapter2_10.html");
			}, 500);
			
		}
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_183 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(183).call(this.frame_183).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_2373();
	this.instance.setTransform(195.55,597,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2372();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(184));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(184));

	// Layer_1
	this.instance_2 = new lib.CharacterBad_03();
	this.instance_2.setTransform(869.55,145.85,0.177,0.177,0,0,180,-3.4,48);

	this.instance_3 = new lib.CharacterBad_03();
	this.instance_3.setTransform(412.4,141.55,0.177,0.177,0,0,180,-3.4,48);

	this.instance_4 = new lib.CharacterBad_04();
	this.instance_4.setTransform(363.45,151.95,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_5 = new lib.CharacterBad_03();
	this.instance_5.setTransform(383.9,141.7,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_6 = new lib.CharacterBad_03();
	this.instance_6.setTransform(258.15,148.35,0.177,0.177,0,0,180,-3.1,48);

	this.instance_7 = new lib.CharacterBad_04();
	this.instance_7.setTransform(326.3,148.75,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_8 = new lib.CharacterBad_03();
	this.instance_8.setTransform(339.8,128.4,0.177,0.177,0,0,180,-3.4,48);

	this.instance_9 = new lib.CharacterBad_04();
	this.instance_9.setTransform(369.75,120,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_10 = new lib.CharacterBad_01();
	this.instance_10.setTransform(289.5,126.3,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_11 = new lib.CharacterBad_01();
	this.instance_11.setTransform(393.6,104.1,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_12 = new lib.CharacterBad_03();
	this.instance_12.setTransform(264.5,112.8,0.177,0.177,0,0,180,-3.4,48);

	this.instance_13 = new lib.CharacterBad_02();
	this.instance_13.setTransform(312.7,115.7,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_14 = new lib.CharacterBad_04();
	this.instance_14.setTransform(295.3,101.75,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_15 = new lib.CharacterBad_04();
	this.instance_15.setTransform(248.3,94.15,0.177,0.177,0,0,180,-39.6,48.9);

	this.instance_16 = new lib.CharacterBad_04();
	this.instance_16.setTransform(339.35,101.75,0.177,0.177,0,0,180,-39.6,48.9);

	this.instance_17 = new lib.CharacterBad_03();
	this.instance_17.setTransform(307.1,81.35,0.177,0.177,0,0,180,-3.4,48);

	this.instance_18 = new lib.CharacterBad_03();
	this.instance_18.setTransform(368.3,92.5,0.177,0.177,0,0,180,-3.4,48);

	this.instance_19 = new lib.CharacterBad_02();
	this.instance_19.setTransform(348.7,79.25,0.177,0.177,0,0,180,-14.1,35.9);

	this.instance_20 = new lib.CharacterBad_04();
	this.instance_20.setTransform(331.8,64.85,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_21 = new lib.CharacterBad_04();
	this.instance_21.setTransform(284.15,71.5,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_22 = new lib.CharacterBad_04();
	this.instance_22.setTransform(375.7,56.8,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_23 = new lib.CharacterBad_03();
	this.instance_23.setTransform(343.4,38.5,0.177,0.177,0,0,180,-3.4,48);

	this.instance_24 = new lib.CharacterBad_02();
	this.instance_24.setTransform(253.65,64.55,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_25 = new lib.CharacterBad_03();
	this.instance_25.setTransform(270.8,40.4,0.177,0.177,0,0,180,-3.4,48);

	this.instance_26 = new lib.CharacterBad_04();
	this.instance_26.setTransform(259.85,23.7,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_27 = new lib.CharacterBad_03();
	this.instance_27.setTransform(296.9,51.75,0.177,0.177,0,0,180,-3.1,48.3);

	this.instance_28 = new lib.CharacterBad_01();
	this.instance_28.setTransform(322.6,27.95,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_29 = new lib.CharacterBad_04();
	this.instance_29.setTransform(334.15,14.2,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_30 = new lib.CharacterBad_03();
	this.instance_30.setTransform(398.6,72.1,0.177,0.177,0,0,180,-3.4,48);

	this.instance_31 = new lib.CharacterBad_03();
	this.instance_31.setTransform(396.6,32.1,0.177,0.177,0,0,180,-3.4,48);

	this.instance_32 = new lib.CharacterBad_03();
	this.instance_32.setTransform(376.1,15.6,0.177,0.177,0,0,180,-3.4,48);

	this.instance_33 = new lib.CharacterBad_03();
	this.instance_33.setTransform(354.6,3.95,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_34 = new lib.CharacterBad_04();
	this.instance_34.setTransform(297,11,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_35 = new lib.CharacterBad_03();
	this.instance_35.setTransform(310.5,-9.35,0.177,0.177,0,0,180,-3.4,48);

	this.instance_36 = new lib.CharacterBad_04();
	this.instance_36.setTransform(340.45,-17.75,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_37 = new lib.CharacterBad_01();
	this.instance_37.setTransform(260.2,-11.45,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_38 = new lib.CharacterBad_04();
	this.instance_38.setTransform(675.5,147.3,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_39 = new lib.CharacterBad_03();
	this.instance_39.setTransform(648.55,119.1,0.177,0.177,0,0,180,-3.4,48);

	this.instance_40 = new lib.CharacterBad_04();
	this.instance_40.setTransform(452.85,149.15,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_41 = new lib.CharacterBad_03();
	this.instance_41.setTransform(425.9,120.95,0.177,0.177,0,0,180,-3.4,48);

	this.instance_42 = new lib.CharacterBad_04();
	this.instance_42.setTransform(601.7,151.05,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_43 = new lib.CharacterBad_03();
	this.instance_43.setTransform(622.15,140.8,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_44 = new lib.CharacterBad_03();
	this.instance_44.setTransform(496.4,147.45,0.177,0.177,0,0,180,-3.1,48);

	this.instance_45 = new lib.CharacterBad_04();
	this.instance_45.setTransform(480.25,139.25,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_46 = new lib.CharacterBad_03();
	this.instance_46.setTransform(461,120.1,0.177,0.177,0,0,180,-3.4,48);

	this.instance_47 = new lib.CharacterBad_04();
	this.instance_47.setTransform(564.55,147.85,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_48 = new lib.CharacterBad_03();
	this.instance_48.setTransform(578.05,127.5,0.177,0.177,0,0,180,-3.4,48);

	this.instance_49 = new lib.CharacterBad_04();
	this.instance_49.setTransform(608,119.1,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_50 = new lib.CharacterBad_01();
	this.instance_50.setTransform(527.75,125.4,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_51 = new lib.CharacterBad_01();
	this.instance_51.setTransform(631.85,103.2,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_52 = new lib.CharacterBad_03();
	this.instance_52.setTransform(502.75,111.9,0.177,0.177,0,0,180,-3.4,48);

	this.instance_53 = new lib.CharacterBad_02();
	this.instance_53.setTransform(550.95,114.8,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_54 = new lib.CharacterBad_04();
	this.instance_54.setTransform(533.55,100.85,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_55 = new lib.CharacterBad_04();
	this.instance_55.setTransform(486.55,93.25,0.177,0.177,0,0,180,-39.6,48.9);

	this.instance_56 = new lib.CharacterBad_04();
	this.instance_56.setTransform(577.6,100.85,0.177,0.177,0,0,180,-39.6,48.9);

	this.instance_57 = new lib.CharacterBad_03();
	this.instance_57.setTransform(545.35,80.45,0.177,0.177,0,0,180,-3.4,48);

	this.instance_58 = new lib.CharacterBad_03();
	this.instance_58.setTransform(606.55,91.6,0.177,0.177,0,0,180,-3.4,48);

	this.instance_59 = new lib.CharacterBad_02();
	this.instance_59.setTransform(586.95,78.35,0.177,0.177,0,0,180,-14.1,35.9);

	this.instance_60 = new lib.CharacterBad_04();
	this.instance_60.setTransform(570.05,63.95,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_61 = new lib.CharacterBad_04();
	this.instance_61.setTransform(522.4,70.6,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_62 = new lib.CharacterBad_01();
	this.instance_62.setTransform(452.35,89,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_63 = new lib.CharacterBad_04();
	this.instance_63.setTransform(432.1,83.95,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_64 = new lib.CharacterBad_02();
	this.instance_64.setTransform(463.9,73.85,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_65 = new lib.CharacterBad_03();
	this.instance_65.setTransform(440.95,64.85,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_66 = new lib.CharacterBad_03();
	this.instance_66.setTransform(432.9,33.9,0.177,0.177,0,0,180,-3.4,48);

	this.instance_67 = new lib.CharacterBad_02();
	this.instance_67.setTransform(491.9,63.65,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_68 = new lib.CharacterBad_03();
	this.instance_68.setTransform(509.05,39.5,0.177,0.177,0,0,180,-3.4,48);

	this.instance_69 = new lib.CharacterBad_03();
	this.instance_69.setTransform(535.15,50.85,0.177,0.177,0,0,180,-3.1,48.3);

	this.instance_70 = new lib.CharacterBad_04();
	this.instance_70.setTransform(472.85,43.2,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_71 = new lib.CharacterBad_04();
	this.instance_71.setTransform(493.1,20.4,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_72 = new lib.CharacterBad_01();
	this.instance_72.setTransform(560.85,27.05,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_73 = new lib.CharacterBad_04();
	this.instance_73.setTransform(824.35,149.2,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_74 = new lib.CharacterBad_03();
	this.instance_74.setTransform(844.8,138.95,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_75 = new lib.CharacterBad_03();
	this.instance_75.setTransform(719.05,145.6,0.177,0.177,0,0,180,-3.1,48);

	this.instance_76 = new lib.CharacterBad_04();
	this.instance_76.setTransform(702.9,137.4,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_77 = new lib.CharacterBad_03();
	this.instance_77.setTransform(683.65,118.25,0.177,0.177,0,0,180,-3.4,48);

	this.instance_78 = new lib.CharacterBad_04();
	this.instance_78.setTransform(787.2,146,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_79 = new lib.CharacterBad_03();
	this.instance_79.setTransform(800.7,125.65,0.177,0.177,0,0,180,-3.4,48);

	this.instance_80 = new lib.CharacterBad_04();
	this.instance_80.setTransform(830.65,117.25,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_81 = new lib.CharacterBad_01();
	this.instance_81.setTransform(750.4,123.55,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_82 = new lib.CharacterBad_01();
	this.instance_82.setTransform(854.5,101.35,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_83 = new lib.CharacterBad_03();
	this.instance_83.setTransform(725.4,110.05,0.177,0.177,0,0,180,-3.4,48);

	this.instance_84 = new lib.CharacterBad_02();
	this.instance_84.setTransform(773.6,112.95,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_85 = new lib.CharacterBad_04();
	this.instance_85.setTransform(756.2,99,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_86 = new lib.CharacterBad_04();
	this.instance_86.setTransform(709.2,91.4,0.177,0.177,0,0,180,-39.6,48.9);

	this.instance_87 = new lib.CharacterBad_04();
	this.instance_87.setTransform(800.25,99,0.177,0.177,0,0,180,-39.6,48.9);

	this.instance_88 = new lib.CharacterBad_03();
	this.instance_88.setTransform(768,78.6,0.177,0.177,0,0,180,-3.4,48);

	this.instance_89 = new lib.CharacterBad_03();
	this.instance_89.setTransform(829.2,89.75,0.177,0.177,0,0,180,-3.4,48);

	this.instance_90 = new lib.CharacterBad_02();
	this.instance_90.setTransform(809.6,76.5,0.177,0.177,0,0,180,-14.1,35.9);

	this.instance_91 = new lib.CharacterBad_04();
	this.instance_91.setTransform(792.7,62.1,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_92 = new lib.CharacterBad_04();
	this.instance_92.setTransform(745.05,68.75,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_93 = new lib.CharacterBad_01();
	this.instance_93.setTransform(675,87.15,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_94 = new lib.CharacterBad_02();
	this.instance_94.setTransform(686.55,72,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_95 = new lib.CharacterBad_04();
	this.instance_95.setTransform(654.75,82.1,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_96 = new lib.CharacterBad_03();
	this.instance_96.setTransform(663.6,63,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_97 = new lib.CharacterBad_03();
	this.instance_97.setTransform(653.5,32.95,0.177,0.177,0,0,180,-3.4,48);

	this.instance_98 = new lib.CharacterBad_04();
	this.instance_98.setTransform(836.6,54.05,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_99 = new lib.CharacterBad_03();
	this.instance_99.setTransform(804.3,35.75,0.177,0.177,0,0,180,-3.4,48);

	this.instance_100 = new lib.CharacterBad_02();
	this.instance_100.setTransform(714.55,61.8,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_101 = new lib.CharacterBad_03();
	this.instance_101.setTransform(731.7,37.65,0.177,0.177,0,0,180,-3.4,48);

	this.instance_102 = new lib.CharacterBad_04();
	this.instance_102.setTransform(720.75,20.95,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_103 = new lib.CharacterBad_03();
	this.instance_103.setTransform(757.8,49,0.177,0.177,0,0,180,-3.1,48.3);

	this.instance_104 = new lib.CharacterBad_04();
	this.instance_104.setTransform(695.5,41.35,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_105 = new lib.CharacterBad_01();
	this.instance_105.setTransform(783.5,25.2,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_106 = new lib.CharacterBad_03();
	this.instance_106.setTransform(625.65,70.1,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_107 = new lib.CharacterBad_04();
	this.instance_107.setTransform(607.95,55.9,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_108 = new lib.CharacterBad_03();
	this.instance_108.setTransform(584,37.65,0.177,0.177,0,0,180,-3.4,48);

	this.instance_109 = new lib.CharacterBad_03();
	this.instance_109.setTransform(619.25,25.25,0.177,0.177,0,0,180,-3.4,48);

	this.instance_110 = new lib.CharacterBad_04();
	this.instance_110.setTransform(646.2,9.55,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_111 = new lib.CharacterBad_03();
	this.instance_111.setTransform(619.25,-18.65,0.177,0.177,0,0,180,-3.4,48);

	this.instance_112 = new lib.CharacterBad_04();
	this.instance_112.setTransform(423.55,11.4,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_113 = new lib.CharacterBad_03();
	this.instance_113.setTransform(396.6,-16.8,0.177,0.177,0,0,180,-3.4,48);

	this.instance_114 = new lib.CharacterBad_04();
	this.instance_114.setTransform(572.4,13.3,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_115 = new lib.CharacterBad_03();
	this.instance_115.setTransform(592.85,3.05,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_116 = new lib.CharacterBad_03();
	this.instance_116.setTransform(467.1,9.7,0.177,0.177,0,0,180,-3.1,48);

	this.instance_117 = new lib.CharacterBad_04();
	this.instance_117.setTransform(450.95,1.5,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_118 = new lib.CharacterBad_03();
	this.instance_118.setTransform(431.7,-17.65,0.177,0.177,0,0,180,-3.4,48);

	this.instance_119 = new lib.CharacterBad_04();
	this.instance_119.setTransform(535.25,10.1,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_120 = new lib.CharacterBad_03();
	this.instance_120.setTransform(548.75,-10.25,0.177,0.177,0,0,180,-3.4,48);

	this.instance_121 = new lib.CharacterBad_04();
	this.instance_121.setTransform(578.7,-18.65,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_122 = new lib.CharacterBad_01();
	this.instance_122.setTransform(498.45,-12.35,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_123 = new lib.CharacterBad_02();
	this.instance_123.setTransform(521.65,-22.95,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_124 = new lib.CharacterBad_04();
	this.instance_124.setTransform(795.05,11.45,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_125 = new lib.CharacterBad_03();
	this.instance_125.setTransform(815.5,1.2,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_126 = new lib.CharacterBad_03();
	this.instance_126.setTransform(689.75,7.85,0.177,0.177,0,0,180,-3.1,48);

	this.instance_127 = new lib.CharacterBad_04();
	this.instance_127.setTransform(673.6,-0.35,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_128 = new lib.CharacterBad_03();
	this.instance_128.setTransform(654.35,-19.5,0.177,0.177,0,0,180,-3.4,48);

	this.instance_129 = new lib.CharacterBad_04();
	this.instance_129.setTransform(757.9,8.25,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_130 = new lib.CharacterBad_03();
	this.instance_130.setTransform(771.4,-12.1,0.177,0.177,0,0,180,-3.4,48);

	this.instance_131 = new lib.CharacterBad_04();
	this.instance_131.setTransform(801.35,-20.5,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_132 = new lib.CharacterBad_01();
	this.instance_132.setTransform(721.1,-14.2,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_133 = new lib.CharacterBad_04();
	this.instance_133.setTransform(1136.4,150.05,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_134 = new lib.CharacterBad_03();
	this.instance_134.setTransform(1109.45,121.85,0.177,0.177,0,0,180,-3.4,48);

	this.instance_135 = new lib.CharacterBad_04();
	this.instance_135.setTransform(913.75,151.9,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_136 = new lib.CharacterBad_03();
	this.instance_136.setTransform(886.8,123.7,0.177,0.177,0,0,180,-3.4,48);

	this.instance_137 = new lib.CharacterBad_04();
	this.instance_137.setTransform(1062.6,153.8,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_138 = new lib.CharacterBad_03();
	this.instance_138.setTransform(1083.05,143.55,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_139 = new lib.CharacterBad_03();
	this.instance_139.setTransform(957.3,150.2,0.177,0.177,0,0,180,-3.1,48);

	this.instance_140 = new lib.CharacterBad_04();
	this.instance_140.setTransform(941.15,142,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_141 = new lib.CharacterBad_03();
	this.instance_141.setTransform(921.9,122.85,0.177,0.177,0,0,180,-3.4,48);

	this.instance_142 = new lib.CharacterBad_04();
	this.instance_142.setTransform(1025.45,150.6,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_143 = new lib.CharacterBad_03();
	this.instance_143.setTransform(1038.95,130.25,0.177,0.177,0,0,180,-3.4,48);

	this.instance_144 = new lib.CharacterBad_04();
	this.instance_144.setTransform(1068.9,121.85,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_145 = new lib.CharacterBad_01();
	this.instance_145.setTransform(988.65,128.15,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_146 = new lib.CharacterBad_01();
	this.instance_146.setTransform(1092.75,105.95,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_147 = new lib.CharacterBad_03();
	this.instance_147.setTransform(963.65,114.65,0.177,0.177,0,0,180,-3.4,48);

	this.instance_148 = new lib.CharacterBad_02();
	this.instance_148.setTransform(1011.85,117.55,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_149 = new lib.CharacterBad_04();
	this.instance_149.setTransform(994.45,103.6,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_150 = new lib.CharacterBad_04();
	this.instance_150.setTransform(947.45,96,0.177,0.177,0,0,180,-39.6,48.9);

	this.instance_151 = new lib.CharacterBad_04();
	this.instance_151.setTransform(1038.5,103.6,0.177,0.177,0,0,180,-39.6,48.9);

	this.instance_152 = new lib.CharacterBad_03();
	this.instance_152.setTransform(1006.25,83.2,0.177,0.177,0,0,180,-3.4,48);

	this.instance_153 = new lib.CharacterBad_03();
	this.instance_153.setTransform(1067.45,94.35,0.177,0.177,0,0,180,-3.4,48);

	this.instance_154 = new lib.CharacterBad_02();
	this.instance_154.setTransform(1047.85,81.1,0.177,0.177,0,0,180,-14.1,35.9);

	this.instance_155 = new lib.CharacterBad_04();
	this.instance_155.setTransform(1030.95,66.7,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_156 = new lib.CharacterBad_04();
	this.instance_156.setTransform(983.3,73.35,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_157 = new lib.CharacterBad_01();
	this.instance_157.setTransform(913.25,91.75,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_158 = new lib.CharacterBad_02();
	this.instance_158.setTransform(924.8,76.6,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_159 = new lib.CharacterBad_04();
	this.instance_159.setTransform(893,86.7,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_160 = new lib.CharacterBad_03();
	this.instance_160.setTransform(863.65,83.2,0.177,0.177,0,0,180,-3.4,48);

	this.instance_161 = new lib.CharacterBad_03();
	this.instance_161.setTransform(865.55,48.95,0.177,0.177,0,0,180,-3.4,48);

	this.instance_162 = new lib.CharacterBad_03();
	this.instance_162.setTransform(847.5,21.05,0.177,0.177,0,0,180,-3.4,48);

	this.instance_163 = new lib.CharacterBad_03();
	this.instance_163.setTransform(901.85,67.6,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_164 = new lib.CharacterBad_03();
	this.instance_164.setTransform(893.8,36.65,0.177,0.177,0,0,180,-3.4,48);

	this.instance_165 = new lib.CharacterBad_02();
	this.instance_165.setTransform(952.8,66.4,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_166 = new lib.CharacterBad_03();
	this.instance_166.setTransform(969.95,42.25,0.177,0.177,0,0,180,-3.4,48);

	this.instance_167 = new lib.CharacterBad_03();
	this.instance_167.setTransform(996.05,53.6,0.177,0.177,0,0,180,-3.1,48.3);

	this.instance_168 = new lib.CharacterBad_04();
	this.instance_168.setTransform(933.75,45.95,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_169 = new lib.CharacterBad_04();
	this.instance_169.setTransform(954,23.15,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_170 = new lib.CharacterBad_01();
	this.instance_170.setTransform(1021.75,29.8,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_171 = new lib.CharacterBad_04();
	this.instance_171.setTransform(1285.25,151.95,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_172 = new lib.CharacterBad_03();
	this.instance_172.setTransform(1305.7,141.7,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_173 = new lib.CharacterBad_03();
	this.instance_173.setTransform(1179.95,148.35,0.177,0.177,0,0,180,-3.1,48);

	this.instance_174 = new lib.CharacterBad_04();
	this.instance_174.setTransform(1163.8,140.15,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_175 = new lib.CharacterBad_03();
	this.instance_175.setTransform(1144.55,121,0.177,0.177,0,0,180,-3.4,48);

	this.instance_176 = new lib.CharacterBad_04();
	this.instance_176.setTransform(1248.1,148.75,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_177 = new lib.CharacterBad_03();
	this.instance_177.setTransform(1261.6,128.4,0.177,0.177,0,0,180,-3.4,48);

	this.instance_178 = new lib.CharacterBad_04();
	this.instance_178.setTransform(1291.55,120,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_179 = new lib.CharacterBad_01();
	this.instance_179.setTransform(1211.3,126.3,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_180 = new lib.CharacterBad_01();
	this.instance_180.setTransform(1315.4,104.1,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_181 = new lib.CharacterBad_03();
	this.instance_181.setTransform(1186.3,112.8,0.177,0.177,0,0,180,-3.4,48);

	this.instance_182 = new lib.CharacterBad_02();
	this.instance_182.setTransform(1234.5,115.7,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_183 = new lib.CharacterBad_04();
	this.instance_183.setTransform(1217.1,101.75,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_184 = new lib.CharacterBad_04();
	this.instance_184.setTransform(1170.1,94.15,0.177,0.177,0,0,180,-39.6,48.9);

	this.instance_185 = new lib.CharacterBad_04();
	this.instance_185.setTransform(1261.15,101.75,0.177,0.177,0,0,180,-39.6,48.9);

	this.instance_186 = new lib.CharacterBad_03();
	this.instance_186.setTransform(1228.9,81.35,0.177,0.177,0,0,180,-3.4,48);

	this.instance_187 = new lib.CharacterBad_03();
	this.instance_187.setTransform(1290.1,92.5,0.177,0.177,0,0,180,-3.4,48);

	this.instance_188 = new lib.CharacterBad_02();
	this.instance_188.setTransform(1270.5,79.25,0.177,0.177,0,0,180,-14.1,35.9);

	this.instance_189 = new lib.CharacterBad_04();
	this.instance_189.setTransform(1253.6,64.85,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_190 = new lib.CharacterBad_04();
	this.instance_190.setTransform(1205.95,71.5,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_191 = new lib.CharacterBad_01();
	this.instance_191.setTransform(1135.9,89.9,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_192 = new lib.CharacterBad_02();
	this.instance_192.setTransform(1147.45,74.75,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_193 = new lib.CharacterBad_04();
	this.instance_193.setTransform(1115.65,84.85,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_194 = new lib.CharacterBad_03();
	this.instance_194.setTransform(1124.5,65.75,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_195 = new lib.CharacterBad_03();
	this.instance_195.setTransform(1114.4,35.7,0.177,0.177,0,0,180,-3.4,48);

	this.instance_196 = new lib.CharacterBad_04();
	this.instance_196.setTransform(1297.5,56.8,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_197 = new lib.CharacterBad_03();
	this.instance_197.setTransform(1265.2,38.5,0.177,0.177,0,0,180,-3.4,48);

	this.instance_198 = new lib.CharacterBad_02();
	this.instance_198.setTransform(1175.45,64.55,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_199 = new lib.CharacterBad_03();
	this.instance_199.setTransform(1192.6,40.4,0.177,0.177,0,0,180,-3.4,48);

	this.instance_200 = new lib.CharacterBad_04();
	this.instance_200.setTransform(1181.65,23.7,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_201 = new lib.CharacterBad_03();
	this.instance_201.setTransform(1218.7,51.75,0.177,0.177,0,0,180,-3.1,48.3);

	this.instance_202 = new lib.CharacterBad_04();
	this.instance_202.setTransform(1156.4,44.1,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_203 = new lib.CharacterBad_01();
	this.instance_203.setTransform(1244.4,27.95,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_204 = new lib.CharacterBad_03();
	this.instance_204.setTransform(1086.55,72.85,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_205 = new lib.CharacterBad_04();
	this.instance_205.setTransform(1068.85,58.65,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_206 = new lib.CharacterBad_03();
	this.instance_206.setTransform(1044.9,40.4,0.177,0.177,0,0,180,-3.4,48);

	this.instance_207 = new lib.CharacterBad_03();
	this.instance_207.setTransform(1080.15,28,0.177,0.177,0,0,180,-3.4,48);

	this.instance_208 = new lib.CharacterBad_04();
	this.instance_208.setTransform(1107.1,12.3,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_209 = new lib.CharacterBad_03();
	this.instance_209.setTransform(1080.15,-15.9,0.177,0.177,0,0,180,-3.4,48);

	this.instance_210 = new lib.CharacterBad_04();
	this.instance_210.setTransform(884.45,14.15,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_211 = new lib.CharacterBad_03();
	this.instance_211.setTransform(857.5,-14.05,0.177,0.177,0,0,180,-3.4,48);

	this.instance_212 = new lib.CharacterBad_04();
	this.instance_212.setTransform(1033.3,16.05,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_213 = new lib.CharacterBad_03();
	this.instance_213.setTransform(1053.75,5.8,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_214 = new lib.CharacterBad_03();
	this.instance_214.setTransform(928,12.45,0.177,0.177,0,0,180,-3.1,48);

	this.instance_215 = new lib.CharacterBad_04();
	this.instance_215.setTransform(911.85,4.25,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_216 = new lib.CharacterBad_03();
	this.instance_216.setTransform(892.6,-14.9,0.177,0.177,0,0,180,-3.4,48);

	this.instance_217 = new lib.CharacterBad_04();
	this.instance_217.setTransform(996.15,12.85,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_218 = new lib.CharacterBad_03();
	this.instance_218.setTransform(1009.65,-7.5,0.177,0.177,0,0,180,-3.4,48);

	this.instance_219 = new lib.CharacterBad_04();
	this.instance_219.setTransform(1039.6,-15.9,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_220 = new lib.CharacterBad_01();
	this.instance_220.setTransform(959.35,-9.6,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_221 = new lib.CharacterBad_02();
	this.instance_221.setTransform(982.55,-20.2,0.177,0.177,0,0,180,-14.1,35.6);

	this.instance_222 = new lib.CharacterBad_04();
	this.instance_222.setTransform(1255.95,14.2,0.177,0.177,0,0,180,-39.6,49.1);

	this.instance_223 = new lib.CharacterBad_03();
	this.instance_223.setTransform(1276.4,3.95,0.177,0.177,0,0,180,-3.4,47.8);

	this.instance_224 = new lib.CharacterBad_03();
	this.instance_224.setTransform(1150.65,10.6,0.177,0.177,0,0,180,-3.1,48);

	this.instance_225 = new lib.CharacterBad_04();
	this.instance_225.setTransform(1134.5,2.4,0.177,0.177,0,0,180,-39.8,49.1);

	this.instance_226 = new lib.CharacterBad_03();
	this.instance_226.setTransform(1115.25,-16.75,0.177,0.177,0,0,180,-3.4,48);

	this.instance_227 = new lib.CharacterBad_04();
	this.instance_227.setTransform(1218.8,11,0.177,0.177,0,0,180,-39.8,48.9);

	this.instance_228 = new lib.CharacterBad_03();
	this.instance_228.setTransform(1232.3,-9.35,0.177,0.177,0,0,180,-3.4,48);

	this.instance_229 = new lib.CharacterBad_04();
	this.instance_229.setTransform(1262.25,-17.75,0.177,0.177,0,0,180,-40.1,48.9);

	this.instance_230 = new lib.CharacterBad_01();
	this.instance_230.setTransform(1182,-11.45,0.177,0.177,0,0,180,-39.6,5.7);

	this.instance_231 = new lib.CharacterGood_04_1();
	this.instance_231.setTransform(223.35,742.35,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_232 = new lib.CharacterGood_01();
	this.instance_232.setTransform(5.65,726.5,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_233 = new lib.CharacterGood_02();
	this.instance_233.setTransform(481.85,704.6,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_234 = new lib.CharacterGood_04();
	this.instance_234.setTransform(506.45,677.15,0.3574,0.3574,0,0,180,37.5,49.5);

	this.instance_235 = new lib.CharacterGood_02();
	this.instance_235.setTransform(110.1,725.75,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_236 = new lib.CharacterGood_02();
	this.instance_236.setTransform(184.9,714.4,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_237 = new lib.CharacterGood_02();
	this.instance_237.setTransform(66.25,691.6,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_238 = new lib.CharacterGood_04_1();
	this.instance_238.setTransform(194.2,675.35,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_239 = new lib.CharacterGood_01();
	this.instance_239.setTransform(109.35,680.8,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_240 = new lib.CharacterGood_04_1();
	this.instance_240.setTransform(140.05,646.6,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_241 = new lib.CharacterGood_04_1();
	this.instance_241.setTransform(393.4,711.95,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_242 = new lib.CharacterGood_01();
	this.instance_242.setTransform(610.95,692.35,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_243 = new lib.CharacterGood_01();
	this.instance_243.setTransform(275.5,702.5,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_244 = new lib.CharacterGood_04();
	this.instance_244.setTransform(694.15,688.7,0.3574,0.3574,0,0,180,37.5,49.5);

	this.instance_245 = new lib.CharacterGood_02();
	this.instance_245.setTransform(804.3,694.95,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_246 = new lib.CharacterGood_02();
	this.instance_246.setTransform(257.65,643.3,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_247 = new lib.CharacterGood_01();
	this.instance_247.setTransform(336,680.8,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_248 = new lib.CharacterGood_02();
	this.instance_248.setTransform(410.25,652.35,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_249 = new lib.CharacterGood_04_1();
	this.instance_249.setTransform(313.1,630.35,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_250 = new lib.CharacterGood_04();
	this.instance_250.setTransform(362.6,581.25,0.3574,0.3574,0,0,180,37.5,49.5);

	this.instance_251 = new lib.CharacterGood_01();
	this.instance_251.setTransform(566.05,653.1,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_252 = new lib.CharacterGood_04_1();
	this.instance_252.setTransform(649.45,654.95,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_253 = new lib.CharacterGood_02();
	this.instance_253.setTransform(772.4,643.5,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_254 = new lib.CharacterGood_02();
	this.instance_254.setTransform(625.4,612.55,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_255 = new lib.CharacterGood_04_1();
	this.instance_255.setTransform(427.1,614.1,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_256 = new lib.CharacterGood_02();
	this.instance_256.setTransform(710.6,604.75,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_257 = new lib.CharacterGood_04();
	this.instance_257.setTransform(783.25,581.25,0.3574,0.3574,0,0,180,37.5,49.5);

	this.instance_258 = new lib.CharacterGood_02();
	this.instance_258.setTransform(750.35,566.85,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_259 = new lib.CharacterGood_02();
	this.instance_259.setTransform(804.3,512.8,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_260 = new lib.CharacterGood_02();
	this.instance_260.setTransform(515.55,615.35,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_261 = new lib.CharacterGood_04_1();
	this.instance_261.setTransform(536.95,585.75,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_262 = new lib.CharacterGood_04_1();
	this.instance_262.setTransform(478.15,559.9,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_263 = new lib.CharacterGood_01();
	this.instance_263.setTransform(648.65,575.15,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_264 = new lib.CharacterGood_01();
	this.instance_264.setTransform(589.05,543.2,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_265 = new lib.CharacterGood_02();
	this.instance_265.setTransform(547.75,515.65,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_266 = new lib.CharacterGood_04_1();
	this.instance_266.setTransform(682.3,524.7,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_267 = new lib.CharacterGood_04_1();
	this.instance_267.setTransform(731.6,478.85,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_268 = new lib.CharacterGood_02();
	this.instance_268.setTransform(431.5,545.8,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_269 = new lib.CharacterGood_01();
	this.instance_269.setTransform(452.8,522.85,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_270 = new lib.CharacterGood_04();
	this.instance_270.setTransform(620.75,506.15,0.3574,0.3574,0,0,180,37.5,49.5);

	this.instance_271 = new lib.CharacterGood_02();
	this.instance_271.setTransform(590.35,487.65,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_272 = new lib.CharacterGood_01();
	this.instance_272.setTransform(495.95,469.35,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_273 = new lib.CharacterGood_04();
	this.instance_273.setTransform(529.55,429.9,0.3574,0.3574,0,0,180,37.5,49.5);

	this.instance_274 = new lib.CharacterGood_02();
	this.instance_274.setTransform(678.3,458.9,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_275 = new lib.CharacterGood_04_1();
	this.instance_275.setTransform(601.85,430.05,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_276 = new lib.CharacterGood_01();
	this.instance_276.setTransform(706.55,428.2,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_277 = new lib.CharacterGood_02();
	this.instance_277.setTransform(795.8,432.8,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_278 = new lib.CharacterGood_02();
	this.instance_278.setTransform(204.75,612.55,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_279 = new lib.CharacterGood_04_1();
	this.instance_279.setTransform(17.3,630.35,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_280 = new lib.CharacterGood_02();
	this.instance_280.setTransform(289.95,604.75,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_281 = new lib.CharacterGood_02();
	this.instance_281.setTransform(329.7,566.85,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_282 = new lib.CharacterGood_02();
	this.instance_282.setTransform(383.65,512.8,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_283 = new lib.CharacterGood_04_1();
	this.instance_283.setTransform(393.4,471.2,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_284 = new lib.CharacterGood_02();
	this.instance_284.setTransform(94.9,615.35,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_285 = new lib.CharacterGood_04_1();
	this.instance_285.setTransform(116.3,585.75,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_286 = new lib.CharacterGood_04_1();
	this.instance_286.setTransform(57.5,559.9,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_287 = new lib.CharacterGood_01();
	this.instance_287.setTransform(228,575.15,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_288 = new lib.CharacterGood_01();
	this.instance_288.setTransform(168.4,543.2,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_289 = new lib.CharacterGood_02();
	this.instance_289.setTransform(10.85,590.15,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_290 = new lib.CharacterGood_02();
	this.instance_290.setTransform(127.1,515.65,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_291 = new lib.CharacterGood_04_1();
	this.instance_291.setTransform(261.65,524.7,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_292 = new lib.CharacterGood_04_1();
	this.instance_292.setTransform(310.95,478.85,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_293 = new lib.CharacterGood_01();
	this.instance_293.setTransform(32.15,522.85,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_294 = new lib.CharacterGood_04();
	this.instance_294.setTransform(200.1,506.15,0.3574,0.3574,0,0,180,37.5,49.5);

	this.instance_295 = new lib.CharacterGood_02();
	this.instance_295.setTransform(169.7,487.65,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_296 = new lib.CharacterGood_01();
	this.instance_296.setTransform(75.3,469.35,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_297 = new lib.CharacterGood_04();
	this.instance_297.setTransform(108.9,429.9,0.3574,0.3574,0,0,180,37.5,49.5);

	this.instance_298 = new lib.CharacterGood_04_1();
	this.instance_298.setTransform(-14.05,453.8,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_299 = new lib.CharacterGood_02();
	this.instance_299.setTransform(61.2,427.45,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_300 = new lib.CharacterGood_02();
	this.instance_300.setTransform(257.65,458.9,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_301 = new lib.CharacterGood_04_1();
	this.instance_301.setTransform(181.2,430.05,0.3736,0.3736,0,0,180,37.8,49.4);

	this.instance_302 = new lib.CharacterGood_01();
	this.instance_302.setTransform(285.9,428.2,0.3736,0.3736,0,0,180,12.2,41.9);

	this.instance_303 = new lib.CharacterGood_02();
	this.instance_303.setTransform(375.15,432.8,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.instance_304 = new lib.CharacterGood_02();
	this.instance_304.setTransform(467.25,439.65,0.3736,0.3736,0,0,180,-40.1,46.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_304},{t:this.instance_303},{t:this.instance_302},{t:this.instance_301},{t:this.instance_300},{t:this.instance_299},{t:this.instance_298},{t:this.instance_297},{t:this.instance_296},{t:this.instance_295},{t:this.instance_294},{t:this.instance_293},{t:this.instance_292},{t:this.instance_291},{t:this.instance_290},{t:this.instance_289},{t:this.instance_288},{t:this.instance_287},{t:this.instance_286},{t:this.instance_285},{t:this.instance_284},{t:this.instance_283},{t:this.instance_282},{t:this.instance_281},{t:this.instance_280},{t:this.instance_279},{t:this.instance_278},{t:this.instance_277},{t:this.instance_276},{t:this.instance_275},{t:this.instance_274},{t:this.instance_273},{t:this.instance_272},{t:this.instance_271},{t:this.instance_270},{t:this.instance_269},{t:this.instance_268},{t:this.instance_267},{t:this.instance_266},{t:this.instance_265},{t:this.instance_264},{t:this.instance_263},{t:this.instance_262},{t:this.instance_261},{t:this.instance_260},{t:this.instance_259},{t:this.instance_258},{t:this.instance_257},{t:this.instance_256},{t:this.instance_255},{t:this.instance_254},{t:this.instance_253},{t:this.instance_252},{t:this.instance_251},{t:this.instance_250},{t:this.instance_249},{t:this.instance_248},{t:this.instance_247},{t:this.instance_246},{t:this.instance_245},{t:this.instance_244},{t:this.instance_243},{t:this.instance_242},{t:this.instance_241},{t:this.instance_240},{t:this.instance_239},{t:this.instance_238},{t:this.instance_237},{t:this.instance_236},{t:this.instance_235},{t:this.instance_234},{t:this.instance_233},{t:this.instance_232},{t:this.instance_231},{t:this.instance_230},{t:this.instance_229},{t:this.instance_228},{t:this.instance_227},{t:this.instance_226},{t:this.instance_225},{t:this.instance_224},{t:this.instance_223},{t:this.instance_222},{t:this.instance_221},{t:this.instance_220},{t:this.instance_219},{t:this.instance_218},{t:this.instance_217},{t:this.instance_216},{t:this.instance_215},{t:this.instance_214},{t:this.instance_213},{t:this.instance_212},{t:this.instance_211},{t:this.instance_210},{t:this.instance_209},{t:this.instance_208},{t:this.instance_207},{t:this.instance_206},{t:this.instance_205},{t:this.instance_204},{t:this.instance_203},{t:this.instance_202},{t:this.instance_201},{t:this.instance_200},{t:this.instance_199},{t:this.instance_198},{t:this.instance_197},{t:this.instance_196},{t:this.instance_195},{t:this.instance_194},{t:this.instance_193},{t:this.instance_192},{t:this.instance_191},{t:this.instance_190},{t:this.instance_189},{t:this.instance_188},{t:this.instance_187},{t:this.instance_186},{t:this.instance_185},{t:this.instance_184},{t:this.instance_183},{t:this.instance_182},{t:this.instance_181},{t:this.instance_180},{t:this.instance_179},{t:this.instance_178},{t:this.instance_177},{t:this.instance_176},{t:this.instance_175},{t:this.instance_174},{t:this.instance_173},{t:this.instance_172},{t:this.instance_171},{t:this.instance_170},{t:this.instance_169},{t:this.instance_168},{t:this.instance_167},{t:this.instance_166},{t:this.instance_165},{t:this.instance_164},{t:this.instance_163},{t:this.instance_162},{t:this.instance_161},{t:this.instance_160},{t:this.instance_159},{t:this.instance_158},{t:this.instance_157},{t:this.instance_156},{t:this.instance_155},{t:this.instance_154},{t:this.instance_153},{t:this.instance_152},{t:this.instance_151},{t:this.instance_150},{t:this.instance_149},{t:this.instance_148},{t:this.instance_147},{t:this.instance_146},{t:this.instance_145},{t:this.instance_144},{t:this.instance_143},{t:this.instance_142},{t:this.instance_141},{t:this.instance_140},{t:this.instance_139},{t:this.instance_138},{t:this.instance_137},{t:this.instance_136},{t:this.instance_135},{t:this.instance_134},{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_123},{t:this.instance_122},{t:this.instance_121},{t:this.instance_120},{t:this.instance_119},{t:this.instance_118},{t:this.instance_117},{t:this.instance_116},{t:this.instance_115},{t:this.instance_114},{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101},{t:this.instance_100},{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94},{t:this.instance_93},{t:this.instance_92},{t:this.instance_91},{t:this.instance_90},{t:this.instance_89},{t:this.instance_88},{t:this.instance_87},{t:this.instance_86},{t:this.instance_85},{t:this.instance_84},{t:this.instance_83},{t:this.instance_82},{t:this.instance_81},{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65},{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]}).wait(184));

	// Background
	this.instance_305 = new lib.Chap2Scene11();
	this.instance_305.setTransform(0,0,0.6667,0.6667);

	this.timeline.addTween(cjs.Tween.get(this.instance_305).wait(184));

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
		{src:"images/LessonChapter2_11_atlas_1.png", id:"LessonChapter2_11_atlas_1"},
		{src:"images/LessonChapter2_11_atlas_2.png", id:"LessonChapter2_11_atlas_2"},
		{src:"sounds/DuringWar211wav.mp3", id:"DuringWar211wav"},
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