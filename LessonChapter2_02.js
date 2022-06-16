(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter2_02_atlas_1", frames: [[1038,1484,330,308],[1370,1484,330,308],[0,1484,357,308],[1702,1484,318,310],[359,1484,357,308],[718,1484,318,330],[0,1350,1779,132],[0,1082,1914,266],[0,0,1920,1080]]},
		{name:"LessonChapter2_02_atlas_2", frames: [[317,272,133,102],[452,272,133,102],[0,0,315,292],[587,293,193,36],[782,293,193,36],[317,0,330,270],[587,331,193,36],[782,331,193,36],[587,369,193,36],[782,369,193,36],[649,0,175,145],[649,147,175,144],[826,0,175,145],[826,147,175,144],[93,294,91,87],[0,294,91,88]]}
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



(lib.CachedBmp_971 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_970 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_969 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_968 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_967 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_966 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_965 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_964 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_963 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_962 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_961 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_960 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_959 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_958 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_957 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_956 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_955 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_954 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_953 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_952 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_951 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_950 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.Chap2Scene2 = function() {
	this.initialize(ss["LessonChapter2_02_atlas_1"]);
	this.gotoAndStop(8);
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
	this.instance = new lib.CachedBmp_970();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_971();
	this.instance_1.setTransform(-33.05,-28.15,0.4875,0.4875);

	this.instance_2 = new lib.CompoundPath();
	this.instance_2.setTransform(-159.75,-154.3,3.5006,3.5006);

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
	this.instance = new lib.CachedBmp_969();
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
	this.instance = new lib.CachedBmp_968();
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
	this.instance = new lib.CachedBmp_967();
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
	this.instance = new lib.CachedBmp_966();
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
	this.instance = new lib.CachedBmp_965();
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
	this.instance = new lib.CachedBmp_964();
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
	this.instance_1 = new lib.CachedBmp_963();
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
	this.instance = new lib.CachedBmp_962();
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
	this.instance = new lib.CachedBmp_961();
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
	this.instance_1 = new lib.CachedBmp_960();
	this.instance_1.setTransform(-73.85,-69.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.8,-69.6,159,155);


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
	this.instance_1 = new lib.CachedBmp_959();
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
	this.instance_1 = new lib.CachedBmp_958();
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
	this.instance_1 = new lib.CachedBmp_957();
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
	this.instance_1 = new lib.CachedBmp_956();
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

	// Layer_2
	this.instance = new lib.CachedBmp_954();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_955();
	this.instance_1.setTransform(-43.45,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(-214.75,-207.05,4.7386,4.7386);

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
	this.instance = new lib.CachedBmp_952();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_953();
	this.instance_1.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(216.45,-207.05,4.7386,4.7386,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

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
	this.instance.setTransform(-57.3,-22.95,0.9985,0.9985,-67.6741,0,0,35.7,0.4);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-59.3,134.95,0.9983,0.9983,-110.4989,0,0,6.5,-1.2);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-62.7,126.85,0.9985,0.9985,-120.7525,0,0,5.5,-8.7);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-87.1,49.7,0.9985,0.9985,-107.408,0,0,40.2,0.1);

	this.instance_4 = new lib.ch1_headcopy2("synched",0);
	this.instance_4.setTransform(-0.5,-79.45,0.9991,0.9991,-2.0342,0,0,0.8,52.5);

	this.instance_5 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_6.setTransform(-21.5,186.15,0.9979,0.9979,14.8669,0,0,2.7,-54.1);

	this.instance_7 = new lib.ch1_neckcopy2("synched",0);
	this.instance_7.setTransform(-4.8,-58.3,0.9991,0.9991,10.2033,0,0,-0.7,8.6);

	this.instance_8 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_9.setTransform(25.7,188.75,0.9975,0.9975,-3.6669,0,0,4,-53.5);

	this.instance_10 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_10.setTransform(15.95,93.05,0.9976,0.9976,-8.5862,0,0,-0.1,1.8);

	this.instance_11 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_11.setTransform(99.55,121.6,0.9984,0.9984,34.1068,0,0,-5.4,2.8);

	this.instance_12 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_12.setTransform(97.35,110.3,0.9985,0.9985,58.3925,0,0,-6.4,7.9);

	this.instance_13 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_13.setTransform(44.9,49.65,0.9985,0.9985,49.2991,0,0,-40.4,-1);

	this.instance_14 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_14.setTransform(45.35,-26.05,0.9985,0.9985,91.3407,0,0,-33.3,0.1);

	this.instance_15 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_15.setTransform(-26.25,89.8,0.9979,0.9979,-5.5437,0,0,2.4,-45.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:2.4,rotation:-5.5437,x:-26.25,y:89.8}},{t:this.instance_14,p:{regY:0.1,scaleX:0.9985,scaleY:0.9985,rotation:91.3407,y:-26.05,x:45.35}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:49.2991,x:44.9,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:58.3925,x:97.35,y:110.3,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.4,scaleX:0.9984,scaleY:0.9984,rotation:34.1068,x:99.55,y:121.6,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5862,y:93.05,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6669,x:25.7,y:188.75,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:10.2033,y:-58.3,x:-4.8,regX:-0.7}},{t:this.instance_6,p:{regY:-54.1,scaleX:0.9979,scaleY:0.9979,rotation:14.8669,y:186.15,x:-21.5,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.0342,x:-0.5,y:-79.45,regY:52.5}},{t:this.instance_3,p:{regY:0.1,rotation:-107.408,x:-87.1,y:49.7,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9985,scaleY:0.9985,rotation:-120.7525,x:-62.7,y:126.85,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.5,scaleX:0.9983,scaleY:0.9983,rotation:-110.4989,x:-59.3,y:134.95,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9985,scaleY:0.9985,rotation:-67.6741,x:-57.3,y:-22.95,regY:0.4}}]}).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5432,x:-26.3,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:91.212,y:-26.15,x:45.35}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:51.1669,x:45.05,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:60.2598,x:95.45,y:111.9,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:35.9741,x:97.3,y:123.35,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5868,y:93,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6662,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1906,y:-58.25,x:-4.8,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8661,y:186.2,x:-21.5,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.3916,x:-0.45,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-108.1174,x:-87.35,y:49.65,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-121.4626,x:-61.85,y:126.45,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-111.2092,x:-58.3,y:134.7,regY:-1.2}},{t:this.instance,p:{regX:35.8,scaleX:0.9984,scaleY:0.9984,rotation:-67.522,x:-57.2,y:-23.15,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5432,x:-26.3,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:91.0833,y:-26.15,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:53.034,x:45.2,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:62.1269,x:93.55,y:113.55,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:37.8419,x:95.05,y:125.05,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5868,y:93,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6662,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1791,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8661,y:186.2,x:-21.5,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.7481,x:-0.45,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regY:0,rotation:-108.829,x:-87.4,y:49.5,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-122.1737,x:-61.05,y:126.15,regX:5.4,regY:-8.7}},{t:this.instance_1,p:{regX:6.5,scaleX:0.9982,scaleY:0.9982,rotation:-111.9201,x:-57.45,y:134.15,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-67.3709,x:-57.3,y:-23.1,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5432,x:-26.3,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.9536,y:-26.15,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:54.9021,x:45.35,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:63.9934,x:91.6,y:115.05,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:39.7107,x:92.7,y:126.6,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5868,y:93,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6662,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1666,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8661,y:186.2,x:-21.5,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.1057,x:-0.5,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-109.5393,x:-87.75,y:49.45,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-122.884,x:-60.4,y:125.6,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-112.6302,x:-56.6,y:133.75,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-67.2171,x:-57.3,y:-23.1,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5432,x:-26.3,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.8249,y:-26.15,x:45.35}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:56.769,x:45.5,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:65.8612,x:89.65,y:116.55,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:41.5759,x:90.4,y:128.15,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5868,y:92.95,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6662,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1551,y:-58.25,x:-4.8,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8661,y:186.2,x:-21.5,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.4642,x:-0.45,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-110.2492,x:-87.9,y:49.45,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-123.5936,x:-59.65,y:125.2,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-113.3414,x:-55.9,y:133.3,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-67.0637,x:-57.2,y:-23.05,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5423,x:-26.35,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9985,scaleY:0.9984,rotation:90.697,y:-26.15,x:45.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:58.6366,x:45.65,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:67.7285,x:87.65,y:117.95,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:43.4442,x:88,y:129.55,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5868,y:92.95,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6662,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1426,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8667,y:186.2,x:-21.5,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.8211,x:-0.45,y:-79.3,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-110.9608,x:-88.15,y:49.2,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-124.306,x:-58.85,y:124.75,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.5,scaleX:0.9982,scaleY:0.9982,rotation:-114.0524,x:-54.95,y:132.7,regY:-1.2}},{t:this.instance,p:{regX:35.8,scaleX:0.9984,scaleY:0.9984,rotation:-66.9102,x:-57.2,y:-23.15,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5423,x:-26.35,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.5683,y:-26.15,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:60.5032,x:45.85,regX:-40.3,y:49.75,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:69.597,x:85.5,y:119.25,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:45.3109,x:85.5,y:130.9,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5868,y:92.95,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6662,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1304,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8667,y:186.2,x:-21.45,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.1798,x:-0.45,y:-79.3,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-111.6705,x:-88.25,y:49.25,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-125.0165,x:-58.1,y:124.4,regX:5.4,regY:-8.7}},{t:this.instance_1,p:{regX:6.5,scaleX:0.9982,scaleY:0.9982,rotation:-114.763,x:-54.2,y:132.25,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-66.7579,x:-57.3,y:-23.1,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5423,x:-26.35,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.4396,y:-26.15,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:62.3705,x:46,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:71.4643,x:83.4,y:120.5,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:47.1785,x:82.95,y:132.15,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5868,y:92.95,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6653,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1185,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8667,y:186.2,x:-21.45,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.538,x:-0.45,y:-79.15,regY:52.6}},{t:this.instance_3,p:{regY:-0.1,rotation:-112.3816,x:-88.55,y:49.15,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-125.7262,x:-57.4,y:123.8,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-115.4742,x:-53.3,y:131.8,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-66.6054,x:-57.35,y:-23.1,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5423,x:-26.35,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.31,y:-26.15,x:45.35}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:64.2382,x:46.2,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:73.3311,x:81.25,y:121.75,regX:-6.3,regY:7.9}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:49.0459,x:80.55,y:133.45,regY:2.8}},{t:this.instance_10,p:{rotation:-8.585,y:92.95,x:15.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6653,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1062,y:-58.25,x:-4.8,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8667,y:186.2,x:-21.45,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.8937,x:-0.45,y:-79.25,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-113.0935,x:-88.75,y:49.15,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-126.4382,x:-56.65,y:123.35,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-116.1847,x:-52.35,y:131.25,regY:-1.2}},{t:this.instance,p:{regX:35.8,scaleX:0.9984,scaleY:0.9984,rotation:-66.4513,x:-57.3,y:-23.2,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5423,x:-26.35,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.1813,y:-26.15,x:45.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:66.1048,x:46.3,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:75.1988,x:78.95,y:122.75,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:50.9133,x:77.9,y:134.4,regY:2.8}},{t:this.instance_10,p:{rotation:-8.585,y:92.95,x:15.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6653,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.0945,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8667,y:186.2,x:-21.45,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.2522,x:-0.4,y:-79.2,regY:52.6}},{t:this.instance_3,p:{regY:-0.1,rotation:-113.8037,x:-88.9,y:49.05,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.1482,x:-55.9,y:122.85,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-116.896,x:-51.55,y:130.7,regY:-1.2}},{t:this.instance,p:{regX:35.8,scaleX:0.9984,scaleY:0.9984,rotation:-66.2971,x:-57.35,y:-23.2,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5423,x:-26.35,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.0534,y:-26.2,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:67.9739,x:46.5,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:77.0648,x:76.8,y:123.75,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:52.7808,x:75.15,y:135.45,regY:2.9}},{t:this.instance_10,p:{rotation:-8.585,y:92.95,x:15.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6653,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.0821,y:-58.25,x:-4.7,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8661,y:186.2,x:-21.45,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.6091,x:-0.4,y:-79.2,regY:52.6}},{t:this.instance_3,p:{regY:-0.1,rotation:-114.5139,x:-89.1,y:48.95,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.8596,x:-55.15,y:122.35,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-117.6066,x:-50.7,y:130.15,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-66.1451,x:-57.35,y:-23.1,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5415,x:-26.35,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.9291,y:-26.2,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:69.8407,x:46.65,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:78.9324,x:74.55,y:124.75,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:54.6473,x:72.6,y:136.25,regY:2.8}},{t:this.instance_10,p:{rotation:-8.585,y:92.95,x:15.85,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6653,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.0698,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8661,y:186.2,x:-21.45,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.968,x:-0.4,y:-79.3,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-115.2261,x:-89.35,y:48.75,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-128.5705,x:-54.45,y:121.85,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-118.3165,x:-50.05,y:129.6,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-65.9922,x:-57.4,y:-23.05,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5415,x:-26.35,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.8004,y:-26.2,x:45.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:71.7079,x:46.8,regX:-40.4,y:49.6,regY:-1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:80.8005,x:72.25,y:125.6,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:56.5152,x:69.95,y:137.1,regY:2.8}},{t:this.instance_10,p:{rotation:-8.585,y:92.95,x:15.85,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6653,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.0581,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8661,y:186.2,x:-21.4,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-6.3253,x:-0.4,y:-79.25,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-115.9369,x:-89.55,y:48.65,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-129.2803,x:-53.75,y:121.35,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-119.0279,x:-49.1,y:129,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-65.8377,x:-57.3,y:-23.1,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5415,x:-26.35,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.6708,y:-26.2,x:45.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:73.5756,x:47,regX:-40.4,y:49.6,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:82.6675,x:70.1,y:126.35,regX:-6.4,regY:7.8}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:58.3827,x:67.2,y:137.75,regY:2.8}},{t:this.instance_10,p:{rotation:-8.585,y:92.95,x:15.85,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6653,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.0468,y:-58.25,x:-4.7,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8661,y:186.2,x:-21.4,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-6.682,x:-0.35,y:-79.3,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-116.6469,x:-89.65,y:48.7,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-129.9911,x:-52.95,y:120.85,regX:5.4,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-119.7397,x:-48.3,y:128.4,regY:-1.2}},{t:this.instance,p:{regX:35.8,scaleX:0.9984,scaleY:0.9984,rotation:-65.6857,x:-57.25,y:-23.2,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5415,x:-26.35,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.542,y:-26.2,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:75.443,x:47,regX:-40.4,y:49.65,regY:-0.9}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9984,rotation:84.5348,x:67.55,y:127.1,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:60.2499,x:64.4,y:138.45,regY:2.9}},{t:this.instance_10,p:{rotation:-8.585,y:92.95,x:15.85,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6653,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.035,y:-58.25,x:-4.7,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8661,y:186.2,x:-21.4,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-7.04,x:-0.35,y:-79.25,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-117.3569,x:-89.9,y:48.6,regX:40.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-130.7019,x:-52.4,y:120.25,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-120.4504,x:-47.6,y:127.85,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-65.5325,x:-57.4,y:-23.1,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5415,x:-26.35,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.4142,y:-26.2,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:77.3102,x:47.35,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.4023,x:65.25,y:127.65,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:62.1165,x:61.85,y:138.85,regY:2.8}},{t:this.instance_10,p:{rotation:-8.585,y:92.95,x:15.85,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6644,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.0226,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8661,y:186.2,x:-21.4,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-7.3971,x:-0.4,y:-79.25,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-118.0673,x:-90.1,y:48.5,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-131.4132,x:-51.65,y:119.7,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-121.1604,x:-46.75,y:127.15,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-65.3792,x:-57.35,y:-23.1,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5406,x:-26.35,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.2854,y:-26.2,x:45.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:79.178,x:47.5,regX:-40.4,y:49.6,regY:-1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:88.2695,x:62.8,y:128.2,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:63.9841,x:59,y:139.45,regY:2.8}},{t:this.instance_10,p:{rotation:-8.585,y:92.95,x:15.85,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6644,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.0092,y:-58.25,x:-4.7,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8661,y:186.2,x:-21.4,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-7.7548,x:-0.3,y:-79.25,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-118.7796,x:-90.25,y:48.35,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-132.1239,x:-51,y:119.15,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-121.8713,x:-45.9,y:126.5,regY:-1.2}},{t:this.instance,p:{regX:35.6,scaleX:0.9984,scaleY:0.9984,rotation:-65.226,x:-57.35,y:-22.95,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5406,x:-26.35,y:89.8}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.1567,y:-26.25,x:45.2}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:81.0446,x:47.6,regX:-40.4,y:49.6,regY:-1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:90.1331,x:60.4,y:128.7,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:65.8522,x:56.25,y:139.6,regY:2.8}},{t:this.instance_10,p:{rotation:-8.585,y:92.95,x:15.85,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6644,x:25.65,y:188.65,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:9.9986,y:-58.3,x:-4.8,regX:-0.8}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8661,y:186.2,x:-21.35,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-8.1135,x:-0.35,y:-79.25,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-119.4891,x:-90.5,y:48.15,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-132.8335,x:-50.25,y:118.5,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.5,scaleX:0.9982,scaleY:0.9982,rotation:-122.5826,x:-45.2,y:125.8,regY:-1.2}},{t:this.instance,p:{regX:35.6,scaleX:0.9984,scaleY:0.9984,rotation:-65.0736,x:-57.3,y:-23,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5511,x:-26.3,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.2714,y:-26.2,x:45.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:79.1761,x:47.55,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:88.2721,x:62.85,y:128.2,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:64.0005,x:59.1,y:139.45,regY:2.8}},{t:this.instance_10,p:{rotation:-8.585,y:92.95,x:15.85,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6513,x:25.6,y:188.65,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.0173,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8672,y:186.2,x:-21.4,regX:2.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-7.7371,x:-0.35,y:-79.25,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-118.7631,x:-90.25,y:48.35,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-132.0972,x:-51,y:119.1,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-121.8426,x:-45.9,y:126.55,regY:-1.2}},{t:this.instance,p:{regX:35.6,scaleX:0.9984,scaleY:0.9984,rotation:-65.2229,x:-57.35,y:-22.95,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5616,x:-26.3,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.3862,y:-26.2,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:77.3076,x:47.4,regX:-40.4,y:49.6,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.4094,x:65.25,y:127.65,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:62.1483,x:61.85,y:138.85,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5868,y:92.95,x:15.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6381,x:25.6,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.035,y:-58.25,x:-4.7,regX:-0.7}},{t:this.instance_6,p:{regY:-54.1,scaleX:0.9978,scaleY:0.9978,rotation:14.8689,y:186.15,x:-21.25,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-7.3611,x:-0.35,y:-79.25,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-118.0368,x:-90.05,y:48.5,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-131.3616,x:-51.75,y:119.75,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-121.1027,x:-46.8,y:127.2,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-65.3726,x:-57.35,y:-23.1,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,rotation:-5.5732,x:-26.15,y:89.8}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.4991,y:-26.15,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:75.4387,x:47.1,regX:-40.4,y:49.65,regY:-0.9}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:84.5436,x:67.7,y:127.15,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:60.2966,x:64.55,y:138.4,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5868,y:92.95,x:15.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6241,x:25.65,y:188.75,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.0537,y:-58.25,x:-4.7,regX:-0.7}},{t:this.instance_6,p:{regY:-54.1,scaleX:0.9978,scaleY:0.9978,rotation:14.8708,y:186.15,x:-21.2,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-6.9853,x:-0.4,y:-79.25,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-117.3103,x:-89.85,y:48.6,regX:40.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-130.6248,x:-52.45,y:120.3,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-120.3632,x:-47.7,y:127.85,regY:-1.3}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-65.5215,x:-57.4,y:-23.1,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.5837,x:-26.3,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.6138,y:-26.15,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:73.5695,x:47.05,regX:-40.4,y:49.55,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:82.6791,x:70.1,y:126.35,regX:-6.4,regY:7.8}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:58.4464,x:67.3,y:137.75,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5868,y:92.95,x:15.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.6118,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.0717,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54.1,scaleX:0.9978,scaleY:0.9978,rotation:14.8725,y:186.15,x:-21.2,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-6.608,x:-0.35,y:-79.25,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-116.5842,x:-89.7,y:48.55,regX:40.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-129.8892,x:-53.15,y:120.8,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-119.6232,x:-48.4,y:128.45,regY:-1.2}},{t:this.instance,p:{regX:35.8,scaleX:0.9984,scaleY:0.9984,rotation:-65.6704,x:-57.3,y:-23.15,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.596,x:-26.3,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.7294,y:-26.2,x:45.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:71.7005,x:46.95,regX:-40.4,y:49.6,regY:-1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:80.8148,x:72.4,y:125.6,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:56.5944,x:70,y:137.1,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5868,y:92.95,x:15.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.5986,x:25.65,y:188.7,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.0902,y:-58.25,x:-4.7,regX:-0.7}},{t:this.instance_6,p:{regY:-54.1,scaleX:0.9978,scaleY:0.9978,rotation:14.8744,y:186.15,x:-21.2,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-6.2328,x:-0.35,y:-79.25,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-115.8582,x:-89.45,y:48.75,regX:40.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-129.1546,x:-53.95,y:121.45,regX:5.5,regY:-8.8}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-118.8833,x:-49.25,y:129.05,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-65.8185,x:-57.3,y:-23.1,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.6066,x:-26.25,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.8441,y:-26.2,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:69.8316,x:46.75,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:78.9494,x:74.7,y:124.75,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:54.7428,x:72.7,y:136.25,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5877,y:92.95,x:15.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.5845,x:25.6,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1088,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54.1,scaleX:0.9978,scaleY:0.9978,rotation:14.8761,y:186.15,x:-21.2,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.8553,x:-0.35,y:-79.3,regY:52.5}},{t:this.instance_3,p:{regY:0,rotation:-115.1309,x:-89.3,y:48.7,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-128.4177,x:-54.6,y:121.9,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-118.1445,x:-50.05,y:129.6,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-65.9683,x:-57.4,y:-23.1,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.6181,x:-26.25,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:89.9588,y:-26.2,x:45.35}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:67.9625,x:46.65,regX:-40.4,y:49.6,regY:-1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:77.0858,x:76.95,y:123.75,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:52.8915,x:75.3,y:135.45,regY:2.9}},{t:this.instance_10,p:{rotation:-8.5887,y:92.95,x:15.95,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_9,p:{rotation:-3.5714,x:25.6,y:188.7,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1266,y:-58.25,x:-4.7,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.878,y:186.25,x:-21.15,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.479,x:-0.45,y:-79.3,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-114.4045,x:-89.15,y:48.9,regX:40.2,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.6804,x:-55.35,y:122.4,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-117.4041,x:-50.95,y:130.2,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-66.1188,x:-57.3,y:-23.1,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,rotation:-5.6278,x:-26.1,y:89.8}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.0683,y:-26.1,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:66.0934,x:46.5,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:75.2215,x:79.15,y:122.75,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:51.0397,x:78.05,y:134.4,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5887,y:92.95,x:15.95,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_9,p:{rotation:-3.5574,x:25.6,y:188.7,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1455,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54.1,scaleX:0.9978,scaleY:0.9978,rotation:14.8795,y:186.15,x:-21.2,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.1028,x:-0.45,y:-79.15,regY:52.6}},{t:this.instance_3,p:{regY:-0.1,rotation:-113.6787,x:-88.95,y:49,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-126.9457,x:-56.15,y:122.9,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-116.6641,x:-51.75,y:130.8,regY:-1.2}},{t:this.instance,p:{regX:35.8,scaleX:0.9984,scaleY:0.9984,rotation:-66.267,x:-57.35,y:-23.2,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,rotation:-5.6392,x:-26.15,y:89.8}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.1821,y:-26.15,x:45.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:64.2241,x:46.3,regX:-40.4,y:49.7,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:73.3585,x:81.45,y:121.75,regX:-6.3,regY:7.9}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:49.1874,x:80.65,y:133.4,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5896,y:92.95,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.5442,x:25.65,y:188.7,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1639,y:-58.25,x:-4.7,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8816,y:186.25,x:-21.2,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.726,x:-0.4,y:-79.25,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-112.9527,x:-88.7,y:49.05,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-126.2096,x:-56.9,y:123.4,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-115.925,x:-52.7,y:131.3,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-66.4172,x:-57.35,y:-23.1,regY:0.2}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.6506,x:-26.25,y:89.8}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.2968,y:-26.15,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:62.3556,x:46.2,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:71.4942,x:83.6,y:120.5,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:47.3371,x:83.2,y:132.15,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5896,y:92.95,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.531,x:25.65,y:188.7,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.1826,y:-58.25,x:-4.7,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8831,y:186.25,x:-21.15,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.3502,x:-0.35,y:-79.3,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-112.2256,x:-88.6,y:49.15,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-125.4732,x:-57.65,y:123.9,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-115.1862,x:-53.5,y:131.8,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-66.5654,x:-57.3,y:-23.1,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.6612,x:-26.3,y:89.8}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.4124,y:-26.15,x:45.35}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:60.4871,x:46.1,regX:-40.3,y:49.75,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:69.6283,x:85.75,y:119.25,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:45.4849,x:85.7,y:130.9,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5903,y:92.95,x:15.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.517,x:25.65,y:188.75,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.2013,y:-58.25,x:-4.8,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8861,y:186.25,x:-21.15,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.9746,x:-0.45,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-111.4996,x:-88.45,y:49.1,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-124.7366,x:-58.45,y:124.35,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-114.4452,x:-54.4,y:132.4,regY:-1.2}},{t:this.instance,p:{regX:35.8,scaleX:0.9984,scaleY:0.9984,rotation:-66.716,x:-57.25,y:-23.15,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.6727,x:-26.25,y:89.8}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.5272,y:-26.15,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:58.6186,x:45.95,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:67.7635,x:87.85,y:117.95,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.4,scaleX:0.9983,scaleY:0.9983,rotation:43.6338,x:88.05,y:129.5,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5903,y:92.95,x:15.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.5047,x:25.65,y:188.75,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.218,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.888,y:186.25,x:-21.15,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.5992,x:-0.4,y:-79.3,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-110.7734,x:-88.2,y:49.3,regX:40.3,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-124.0007,x:-59.15,y:124.8,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-113.705,x:-55.25,y:132.9,regY:-1.2}},{t:this.instance,p:{regX:35.8,scaleX:0.9984,scaleY:0.9984,rotation:-66.8635,x:-57.2,y:-23.2,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,rotation:-5.6832,x:-26.2,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.641,y:-26.1,x:45.25}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:56.75,x:45.8,regX:-40.4,y:49.6,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:65.8989,x:89.9,y:116.5,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:41.7825,x:90.65,y:128.1,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5912,y:92.95,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.4914,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.2367,y:-58.25,x:-4.8,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8897,y:186.25,x:-21.1,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.2223,x:-0.4,y:-79.4,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-110.0475,x:-88,y:49.45,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-123.2643,x:-59.95,y:125.25,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-112.9655,x:-56.15,y:133.35,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-67.0134,x:-57.35,y:-23.1,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,rotation:-5.6946,x:-26.1,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.7557,y:-26.15,x:45.35}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:54.8821,x:45.55,regX:-40.4,y:49.7,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:64.0341,x:91.9,y:115.05,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:39.9303,x:93.05,y:126.6,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5912,y:93,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.4766,x:25.6,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.2554,y:-58.25,x:-4.75,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8908,y:186.25,x:-21.1,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.8454,x:-0.45,y:-79.3,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-109.321,x:-87.85,y:49.5,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-122.5283,x:-60.7,y:125.65,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-112.2254,x:-57,y:133.85,regY:-1.2}},{t:this.instance,p:{regX:35.8,scaleX:0.9984,scaleY:0.9984,rotation:-67.1624,x:-57.2,y:-23.15,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{regX:2.4,rotation:-5.7052,x:-26.15,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.8696,y:-26.15,x:45.35}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:53.0126,x:45.5,regX:-40.4,y:49.65,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:62.1708,x:93.85,y:113.55,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.2,scaleX:0.9983,scaleY:0.9983,rotation:38.0796,x:95.45,y:125.1,regY:2.8}},{t:this.instance_10,p:{rotation:-8.5922,y:93,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.4633,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.2741,y:-58.3,x:-4.8,regX:-0.7}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8925,y:186.25,x:-21.15,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.4695,x:-0.45,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-108.5933,x:-87.65,y:49.55,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-121.7925,x:-61.55,y:126.25,regX:5.4,regY:-8.8}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-111.4857,x:-57.95,y:134.3,regY:-1.2}},{t:this.instance,p:{regX:35.8,scaleX:0.9984,scaleY:0.9984,rotation:-67.3132,x:-57.25,y:-23.15,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.7177,x:-26.25,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:90.9851,y:-26.15,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:51.1433,x:45.4,regX:-40.3,y:49.75,regY:-1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:60.3065,x:95.8,y:111.9,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:36.2279,x:97.7,y:123.35,regY:2.8}},{t:this.instance_10,p:{rotation:-8.593,y:93,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.4501,x:25.6,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.2929,y:-58.35,x:-4.85,regX:-0.8}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8944,y:186.25,x:-21.15,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.0921,x:-0.45,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-107.8676,x:-87.4,y:49.65,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-121.056,x:-62.3,y:126.65,regX:5.4,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-110.7465,x:-58.75,y:134.75,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-67.4612,x:-57.3,y:-23.1,regY:0.3}}]},1).to({state:[{t:this.instance_15,p:{regX:2.3,rotation:-5.7281,x:-26.3,y:89.85}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:91.0999,y:-26.05,x:45.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:49.2747,x:45.1,regX:-40.4,y:49.7,regY:-0.9}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:58.442,x:97.6,y:110.25,regX:-6.4,regY:7.9}},{t:this.instance_11,p:{regX:-5.3,scaleX:0.9983,scaleY:0.9983,rotation:34.377,x:99.9,y:121.6,regY:2.8}},{t:this.instance_10,p:{rotation:-8.593,y:93,x:15.95,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_9,p:{rotation:-3.4361,x:25.65,y:188.7,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.3105,y:-58.3,x:-4.85,regX:-0.8}},{t:this.instance_6,p:{regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:14.8961,y:186.25,x:-21.1,regX:2.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.7173,x:-0.4,y:-79.35,regY:52.5}},{t:this.instance_3,p:{regY:-0.1,rotation:-107.1415,x:-87.35,y:49.65,regX:40.2,scaleX:0.9985,scaleY:0.9985}},{t:this.instance_2,p:{scaleX:0.9984,scaleY:0.9984,rotation:-120.321,x:-63.2,y:126.85,regX:5.5,regY:-8.7}},{t:this.instance_1,p:{regX:6.4,scaleX:0.9982,scaleY:0.9982,rotation:-110.0077,x:-59.8,y:135.15,regY:-1.2}},{t:this.instance,p:{regX:35.7,scaleX:0.9984,scaleY:0.9984,rotation:-67.6108,x:-57.25,y:-23.05,regY:0.4}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-98.2,-208.8,226.10000000000002,511.7);


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
	this.instance.setTransform(-57.05,-23.05,0.9984,0.9984,-77.1986,0,0,35.6,0.4);

	this.instance_1 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1.setTransform(-29.7,127.85,0.9982,0.9982,-115.0059,0,0,6.4,-1.2);

	this.instance_2 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2.setTransform(-27.35,119.45,0.9983,0.9983,-82.6793,0,0,5.3,-8.6);

	this.instance_3 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_3.setTransform(-74.65,53.55,0.9984,0.9984,-125.3054,0,0,40.3,0);

	this.instance_4 = new lib.ch1_headcopy("synched",0);
	this.instance_4.setTransform(0.2,-79.4,0.999,0.999,-1.0765,0,0,1.1,52.5);

	this.instance_5 = new lib.ch1_uBodycopy("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_6.setTransform(-30.15,187.5,0.9979,0.9979,16.2949,0,0,2.6,-54.4);

	this.instance_7 = new lib.ch1_neckcopy("synched",0);
	this.instance_7.setTransform(-4.85,-58.3,0.999,0.999,10.7202,0,0,-0.9,8.7);

	this.instance_8 = new lib.ch1_lBodycopy("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_9.setTransform(20.3,191.05,0.9975,0.9975,-3.2675,0,0,4.1,-53.7);

	this.instance_10 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_10.setTransform(7.4,96.2,0.9976,0.9976,-10.0742,0,0,-0.4,2.1);

	this.instance_11 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_11.setTransform(45.9,136.3,0.9984,0.9984,88.5033,0,0,-4.5,3);

	this.instance_12 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_12.setTransform(52.1,127.15,0.9984,0.9984,108.2021,0,0,-6,8.2);

	this.instance_13 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_13.setTransform(34.05,48.85,0.9984,0.9984,76.816,0,0,-40.4,-0.8);

	this.instance_14 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_14.setTransform(45.35,-25.85,0.9984,0.9984,99.4545,0,0,-33.1,-0.2);

	this.instance_15 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_15.setTransform(-22.1,91.45,0.998,0.998,2.3905,0,0,1.9,-45.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:1.9,regY:-45.7,scaleX:0.998,scaleY:0.998,rotation:2.3905,y:91.45,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9984,scaleY:0.9984,rotation:99.4545,x:45.35,y:-25.85,regY:-0.2}},{t:this.instance_13,p:{regY:-0.8,rotation:76.816,x:34.05,y:48.85,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9984,scaleY:0.9984,rotation:108.2021,x:52.1,y:127.15,regX:-6}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.5033,x:45.9,y:136.3,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.4,scaleX:0.9976,scaleY:0.9976,rotation:-10.0742,x:7.4,y:96.2}},{t:this.instance_9,p:{regX:4.1,scaleX:0.9975,scaleY:0.9975,rotation:-3.2675,x:20.3,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.7202,y:-58.3,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2949,x:-30.15,y:187.5,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,regY:52.5,scaleX:0.999,scaleY:0.999,rotation:-1.0765,x:0.2,y:-79.4}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-125.3054,x:-74.65,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-82.6793,x:-27.35,y:119.45,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-115.0059,x:-29.7,y:127.85,regX:6.4}},{t:this.instance,p:{rotation:-77.1986,x:-57.05,y:-23.05,regY:0.4,regX:35.6}}]}).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3898,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:99.165,x:45.2,y:-25.8,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:76.28,x:34.5,y:48.75,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:107.6648,x:53.35,y:127.05,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:87.967,x:47.1,y:136.1,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.074,x:7.25,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2677,x:20.4,y:191.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.7432,y:-58.25,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{rotation:16.295,x:-30.1,y:187.35,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-1.4154,x:0.35,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-124.0255,x:-74.7,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.4,rotation:-81.4007,x:-28.85,y:120.3,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-113.7263,x:-31.4,y:128.85,regX:6.4}},{t:this.instance,p:{rotation:-77.2148,x:-57,y:-23.1,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3898,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:98.8742,x:45.25,y:-25.95,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:75.742,x:34.75,y:48.85,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:107.1269,x:54.4,y:126.95,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:87.4297,x:48.25,y:136.05,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.074,x:7.25,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2668,x:20.35,y:191.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.7672,y:-58.25,x:-4.8,regX:-0.9}},{t:this.instance_6,p:{rotation:16.295,x:-30.1,y:187.4,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-1.7542,x:0.3,y:-79.55}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-122.7479,x:-74.65,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.2,rotation:-80.1222,x:-30.3,y:121.55,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-112.4476,x:-33.05,y:129.75,regX:6.4}},{t:this.instance,p:{rotation:-77.2303,x:-57,y:-23.1,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3898,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:98.5854,x:45.3,y:-25.9,regY:-0.3}},{t:this.instance_13,p:{regY:-0.9,rotation:75.2049,x:35.2,y:48.85,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:106.5899,x:55.5,y:126.75,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:86.8931,x:49.4,y:136,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.074,x:7.25,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2668,x:20.35,y:191.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.7914,y:-58.25,x:-4.9,regX:-0.9}},{t:this.instance_6,p:{rotation:16.295,x:-30.05,y:187.4,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-2.0948,x:0.35,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-121.4685,x:-74.65,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-78.844,x:-31.8,y:122.45,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-111.1687,x:-34.65,y:130.7,regX:6.4}},{t:this.instance,p:{rotation:-77.2473,x:-56.9,y:-23.05,regY:0.5,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3889,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:98.2941,x:45.2,y:-25.95,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:74.6681,x:35.55,y:48.9,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:106.0521,x:56.6,y:126.65,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:86.3562,x:50.6,y:135.95,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.074,x:7.2,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2668,x:20.35,y:191.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.8154,y:-58.25,x:-4.8,regX:-0.9}},{t:this.instance_6,p:{rotation:16.295,x:-30.05,y:187.4,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-2.4347,x:0.35,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-120.1895,x:-74.7,regY:-0.1,y:53.6,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-77.5645,x:-33.3,y:123.4,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-109.8896,x:-36.45,y:131.55,regX:6.4}},{t:this.instance,p:{rotation:-77.2633,x:-57.05,y:-23,regY:0.4,regX:35.5}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3889,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:98.0048,x:45.25,y:-25.85,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:74.1313,x:35.9,y:48.95,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:105.5156,x:57.7,y:126.5,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:85.819,x:51.75,y:135.75,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.074,x:7.2,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2668,x:20.35,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.8394,y:-58.3,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{rotation:16.295,x:-30.05,y:187.4,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-2.7746,x:0.35,y:-79.45}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-118.9113,x:-74.55,regY:0,y:53.5,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-76.2851,x:-34.85,y:124.25,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-108.6119,x:-38.2,y:132.4,regX:6.4}},{t:this.instance,p:{rotation:-77.2794,x:-57.05,y:-23,regY:0.4,regX:35.5}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3889,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:97.7141,x:45.25,y:-25.9,regY:-0.2}},{t:this.instance_13,p:{regY:-0.8,rotation:73.5937,x:36.2,y:49,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:104.977,x:58.8,y:126.3,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:85.2814,x:53.05,y:135.65,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.0731,x:7.2,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2668,x:20.35,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:10.8631,y:-58.35,x:-4.9,regX:-1}},{t:this.instance_6,p:{rotation:16.295,x:-30.05,y:187.4,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-3.1146,x:0.45,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-117.632,x:-74.5,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-75.0074,x:-36.5,y:125.2,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-107.333,x:-39.85,y:133.15,regX:6.4}},{t:this.instance,p:{rotation:-77.2956,x:-57.05,y:-22.95,regY:0.4,regX:35.5}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3889,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:97.4243,x:45.25,y:-25.8,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:73.0562,x:36.7,y:49.05,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:104.4402,x:59.9,y:126.05,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:84.7443,x:54.25,y:135.55,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.0731,x:7.2,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2668,x:20.35,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.8875,y:-58.35,x:-4.9,regX:-1}},{t:this.instance_6,p:{rotation:16.2936,x:-30.05,y:187.4,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-3.4531,x:0.4,y:-79.4}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.3532,x:-74.5,regY:0,y:53.5,regX:40.3}},{t:this.instance_2,p:{regX:5.4,rotation:-73.728,x:-38,y:125.9,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-106.0536,x:-41.65,y:133.9,regX:6.4}},{t:this.instance,p:{rotation:-77.3117,x:-57.05,y:-23.05,regY:0.4,regX:35.5}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3889,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:97.1338,x:45.2,y:-26,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:72.5188,x:37.05,y:49.25,regX:-40.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:103.9029,x:61,y:126,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:84.2067,x:55.4,y:135.45,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.0731,x:7.15,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2668,x:20.35,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.9115,y:-58.3,x:-4.8,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2936,x:-30.05,y:187.4,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-3.7933,x:0.45,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.0739,x:-74.45,regY:0,y:53.5,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-72.4491,x:-39.6,y:126.75,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-104.7745,x:-43.45,y:134.6,regX:6.5}},{t:this.instance,p:{rotation:-77.3279,x:-57.05,y:-23.1,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3881,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:96.8444,x:45.25,y:-25.85,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:71.9821,x:37.4,y:49.15,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:103.3667,x:62.15,y:125.65,regX:-6.1}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:83.6703,x:56.6,y:135.35,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.0731,x:7.15,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2668,x:20.35,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.9354,y:-58.3,x:-4.75,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2936,x:-30.05,y:187.4,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-4.1346,x:0.45,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.7954,x:-74.5,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-71.1712,x:-41.3,y:127.55,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-103.4949,x:-45.15,y:135.3,regX:6.4}},{t:this.instance,p:{rotation:-77.3451,x:-56.95,y:-23.15,regY:0.5,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3881,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:96.5542,x:45.2,y:-26,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:71.4443,x:37.8,y:49.15,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:102.828,x:63.2,y:125.55,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:83.1316,x:57.8,y:135.15,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.0731,x:7.15,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2668,x:20.35,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.9596,y:-58.3,x:-4.75,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2936,x:-30,y:187.45,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-4.4742,x:0.45,y:-79.4}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.5171,x:-74.4,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-69.8917,x:-42.9,y:128.3,scaleX:0.9982,scaleY:0.9982,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-102.2158,x:-47,y:135.95,regX:6.4}},{t:this.instance,p:{rotation:-77.3612,x:-57,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.388,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:96.2644,x:45.25,y:-26,regY:-0.2}},{t:this.instance_13,p:{regY:-0.8,rotation:70.9076,x:38.15,y:49.3,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:102.2915,x:64.3,y:125.3,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:82.5949,x:59.15,y:135.1,regX:-4.4,regY:2.9}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.0731,x:7.15,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2668,x:20.35,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.9847,y:-58.3,x:-4.7,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2936,x:-30,y:187.45,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-4.8141,x:0.5,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.2376,x:-74.4,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-68.6128,x:-44.5,y:128.9,scaleX:0.9982,scaleY:0.9982,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-100.938,x:-48.85,y:136.6,regX:6.4}},{t:this.instance,p:{rotation:-77.3773,x:-57.05,y:-23.1,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.388,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:95.9738,x:45.2,y:-25.85,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:70.3695,x:38.55,y:49.25,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:101.7542,x:65.45,y:125.15,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:82.0578,x:60.3,y:134.9,regX:-4.5,regY:2.9}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.0731,x:7.1,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2668,x:20.35,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.008,y:-58.3,x:-4.75,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2936,x:-30,y:187.45,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-5.1531,x:0.5,y:-79.45}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.9586,x:-74.35,regY:0,y:53.6,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-67.3347,x:-46.1,y:129.55,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.6597,x:-50.65,y:137.05,regX:6.4}},{t:this.instance,p:{rotation:-77.3935,x:-57.05,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.388,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:95.6841,x:45.25,y:-26,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:69.8321,x:39,y:49.3,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:101.2162,x:66.4,y:124.85,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:81.5208,x:61.3,y:134.65,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.0731,x:7.1,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2668,x:20.35,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.032,y:-58.3,x:-4.65,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2936,x:-30,y:187.45,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-5.4933,x:0.55,y:-79.45}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.6798,x:-74.4,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-66.0557,x:-47.9,y:130.2,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.379,x:-52.55,y:137.65,regX:6.4}},{t:this.instance,p:{rotation:-77.4096,x:-57,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.388,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:95.3946,x:45.2,y:-26,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:69.2945,x:39.35,y:49.3,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:100.6803,x:67.55,y:124.65,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:80.9837,x:62.5,y:134.45,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.0731,x:7.1,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2668,x:20.35,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.0552,y:-58.3,x:-4.7,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2936,x:-30,y:187.45,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-5.8337,x:0.55,y:-79.45}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.4014,x:-74.35,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.4,rotation:-64.7769,x:-49.5,y:130.7,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.1008,x:-54.35,y:138.05,regX:6.4}},{t:this.instance,p:{rotation:-77.4266,x:-56.9,y:-23.1,regY:0.5,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3871,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:95.1044,x:45.2,y:-26,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:68.7582,x:39.8,y:49.3,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:100.1416,x:68.65,y:124.4,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:80.4467,x:63.7,y:134.25,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.0731,x:7.1,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2659,x:20.35,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.0799,y:-58.3,x:-4.65,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2927,x:-30,y:187.45,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:-6.1735,x:0.55,y:-79.35}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-106.1222,x:-74.25,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-63.4976,x:-51.25,y:131.25,scaleX:0.9982,scaleY:0.9982,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-95.8217,x:-56.2,y:138.45,regX:6.4}},{t:this.instance,p:{rotation:-77.4428,x:-56.95,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3871,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:94.8152,x:45.25,y:-26,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:68.2207,x:40.15,y:49.35,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:99.6037,x:69.7,y:124.15,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:79.9092,x:64.85,y:134.1,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.0723,x:7.1,y:96.15}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2659,x:20.35,y:191}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.1033,y:-58.3,x:-4.65,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2927,x:-29.95,y:187.45,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-6.5125,x:0.6,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-104.843,x:-74.25,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.4,rotation:-62.2191,x:-52.9,y:131.75,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-94.5429,x:-58.05,y:138.9,regX:6.4}},{t:this.instance,p:{rotation:-77.46,x:-56.95,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3819,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:95.071,x:45.2,y:-26.05,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:68.6708,x:39.8,y:49.35,regX:-40.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:100.0605,x:68.8,y:124.35,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:80.3783,x:63.85,y:134.3,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.0838,x:7.1,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2747,x:20.4,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.0926,y:-58.3,x:-4.7,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2797,x:-30,y:187.5,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:-6.2298,x:0.6,y:-79.35}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-105.9293,x:-74.25,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.4,rotation:-63.3167,x:-51.45,y:131.3,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-95.6289,x:-56.5,y:138.6,regX:6.4}},{t:this.instance,p:{rotation:-77.4534,x:-57,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3775,y:91.4,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:95.3287,x:45.2,y:-26,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:69.1221,x:39.45,y:49.35,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:100.519,x:67.85,y:124.45,regX:-6.1}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:80.8471,x:62.9,y:134.4,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.0972,x:7.1,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2835,x:20.45,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.0808,y:-58.3,x:-4.65,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2667,x:-29.9,y:187.45,regX:2.7,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-5.9472,x:0.55,y:-79.45}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-107.0152,x:-74.3,regY:0,y:53.7,regX:40.2}},{t:this.instance_2,p:{regX:5.3,rotation:-64.4157,x:-50,y:130.95,scaleX:0.9982,scaleY:0.9982,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9982,scaleY:0.9982,rotation:-96.7134,x:-54.9,y:138.2,regX:6.4}},{t:this.instance,p:{rotation:-77.4473,x:-57,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3723,y:91.4,x:-22.15}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:95.5847,x:45.25,y:-26,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:69.5722,x:39.05,y:49.3,regX:-40.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:100.9743,x:66.9,y:124.75,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:81.3153,x:61.95,y:134.6,regX:-4.5,regY:2.9}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.1087,x:7.15,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.2923,x:20.4,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.0695,y:-58.3,x:-4.65,regX:-0.9}},{t:this.instance_6,p:{rotation:16.254,x:-29.9,y:187.45,regX:2.7,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-5.6649,x:0.55,y:-79.45}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-108.101,x:-74.3,regY:0,y:53.5,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-65.5132,x:-48.6,y:130.5,scaleX:0.9982,scaleY:0.9982,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-97.7978,x:-53.35,y:137.75,regX:6.5}},{t:this.instance,p:{rotation:-77.4419,x:-56.95,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.367,y:91.45,x:-22.1}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:95.8417,x:45.2,y:-25.85,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:70.0221,x:38.75,y:49.3,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:101.4324,x:66.1,y:125,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:81.7844,x:60.85,y:134.75,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.1213,x:7.1,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.3011,x:20.4,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.0569,y:-58.3,x:-4.7,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2398,x:-30,y:187.55,regX:2.6,regY:-54.3,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-5.3817,x:0.55,y:-79.45}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-109.1874,x:-74.3,regY:0,y:53.5,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-66.6107,x:-47.2,y:129.95,scaleX:0.9982,scaleY:0.9982,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-98.8839,x:-51.7,y:137.5,regX:6.4}},{t:this.instance,p:{rotation:-77.4358,x:-56.95,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.9,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3617,y:91.5,x:-22}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:96.0979,x:45.2,y:-25.9,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:70.4722,x:38.4,y:49.25,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:101.8886,x:65.1,y:125.1,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:82.2521,x:59.85,y:134.85,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.1336,x:7.1,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.3107,x:20.45,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.0463,y:-58.3,x:-4.75,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2279,x:-30,y:187.5,regX:2.6,regY:-54.3,scaleX:0.9978,scaleY:0.9978}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-5.0996,x:0.55,y:-79.45}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-110.273,x:-74.3,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-67.7092,x:-45.7,y:129.45,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-99.9699,x:-50.15,y:137,regX:6.4}},{t:this.instance,p:{rotation:-77.4303,x:-56.95,y:-23.1,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3565,y:91.45,x:-22.15}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:96.3551,x:45.25,y:-26.05,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:70.9226,x:38.05,y:49.2,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:102.347,x:64.15,y:125.35,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:82.7203,x:59,y:134.95,regX:-4.5,regY:2.9}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.1462,x:7.15,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.3196,x:20.5,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.0346,y:-58.3,x:-4.7,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2138,x:-30,y:187.45,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-4.8176,x:0.55,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-111.3604,x:-74.35,regY:0,y:53.6,regX:40.3}},{t:this.instance_2,p:{regX:5.4,rotation:-68.8075,x:-44.25,y:128.75,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-101.055,x:-48.6,y:136.6,regX:6.4}},{t:this.instance,p:{rotation:-77.4249,x:-56.9,y:-23.1,regY:0.5,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3513,y:91.45,x:-22.15}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:96.6125,x:45.2,y:-25.85,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:71.374,x:37.7,y:49.2,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:102.8038,x:63.2,y:125.5,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:83.1881,x:57.85,y:135.15,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.1597,x:7.15,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.3283,x:20.55,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.0231,y:-58.3,x:-4.7,regX:-0.9}},{t:this.instance_6,p:{rotation:16.2002,x:-29.85,y:187.4,regX:2.7,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-4.534,x:0.55,y:-79.45}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-112.4453,x:-74.3,regY:0,y:53.5,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-69.9045,x:-42.85,y:128.3,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-102.1386,x:-46.95,y:136,regX:6.4}},{t:this.instance,p:{rotation:-77.4194,x:-56.9,y:-23.1,regY:0.5,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3468,y:91.45,x:-22.1}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:96.87,x:45.25,y:-25.85,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:71.8237,x:37.45,y:49.15,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:103.2614,x:62.3,y:125.65,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:83.658,x:56.8,y:135.4,regX:-4.4,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.172,x:7.15,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.3371,x:20.55,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.0114,y:-58.3,x:-4.75,regX:-0.9}},{t:this.instance_6,p:{rotation:16.1877,x:-29.9,y:187.35,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-4.2522,x:0.5,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-113.5318,x:-74.3,regY:0,y:53.5,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-71.0028,x:-41.5,y:127.7,scaleX:0.9982,scaleY:0.9982,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-103.2241,x:-45.45,y:135.5,regX:6.4}},{t:this.instance,p:{rotation:-77.4131,x:-56.95,y:-23.15,regY:0.5,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3424,y:91.45,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:97.125,x:45.2,y:-26,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:72.2734,x:37.15,y:49.25,regX:-40.3,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:103.717,x:61.3,y:125.8,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:84.1265,x:55.75,y:135.35,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.1845,x:7.15,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.3467,x:20.5,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:11.0006,y:-58.3,x:-4.8,regX:-0.9}},{t:this.instance_6,p:{rotation:16.1741,x:-29.95,y:187.35,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.999,scaleY:0.999,rotation:-3.9687,x:0.4,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-114.6178,x:-74.3,regY:0,y:53.65,regX:40.2}},{t:this.instance_2,p:{regX:5.3,rotation:-72.1015,x:-40,y:127.1,scaleX:0.9983,scaleY:0.9983,regY:-8.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-104.3099,x:-43.95,y:134.95,regX:6.4}},{t:this.instance,p:{rotation:-77.4069,x:-57.05,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3372,y:91.45,x:-22.1}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:97.3836,x:45.25,y:-25.8,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:72.7241,x:36.75,y:49.2,regX:-40.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:104.1745,x:60.35,y:126,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:84.5947,x:54.8,y:135.6,regX:-4.4,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.1969,x:7.2,y:96.2}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.3555,x:20.6,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.9893,y:-58.3,x:-4.75,regX:-0.9}},{t:this.instance_6,p:{rotation:16.1611,x:-29.95,y:187.4,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:-3.6872,x:0.4,y:-79.4}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-115.703,x:-74.35,regY:0,y:53.6,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-73.199,x:-38.6,y:126.5,scaleX:0.9983,scaleY:0.9983,regY:-8.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-105.3958,x:-42.4,y:134.3,regX:6.4}},{t:this.instance,p:{rotation:-77.4014,x:-57.05,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.332,y:91.45,x:-22.15}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:97.6388,x:45.2,y:-25.9,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:73.1761,x:36.45,y:49.05,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.1,scaleX:0.9983,scaleY:0.9983,rotation:104.6312,x:59.55,y:126.15,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:85.0625,x:53.75,y:135.55,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.2103,x:7.2,y:96.25}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.3644,x:20.65,y:191.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.9775,y:-58.3,x:-4.75,regX:-0.9}},{t:this.instance_6,p:{rotation:16.1481,x:-29.8,y:187.4,regX:2.7,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-3.4039,x:0.4,y:-79.45}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-116.7887,x:-74.4,regY:0,y:53.6,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-74.2974,x:-37.2,y:125.75,scaleX:0.9982,scaleY:0.9982,regY:-8.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-106.4809,x:-40.85,y:133.7,regX:6.4}},{t:this.instance,p:{rotation:-77.3952,x:-57.05,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3267,y:91.45,x:-22.05}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:97.896,x:45.25,y:-25.95,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:73.6258,x:36.1,y:49,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:105.0896,x:58.5,y:126.2,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:85.5317,x:52.75,y:135.65,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.2227,x:7.2,y:96.25}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.373,x:20.65,y:191.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.966,y:-58.3,x:-4.8,regX:-0.9}},{t:this.instance_6,p:{rotation:16.1339,x:-29.9,y:187.35,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-3.1225,x:0.4,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-117.8752,x:-74.35,regY:0,y:53.6,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-75.3951,x:-35.85,y:125.05,scaleX:0.9983,scaleY:0.9983,regY:-8.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-107.5663,x:-39.45,y:132.95,regX:6.5}},{t:this.instance,p:{rotation:-77.3907,x:-57.05,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3205,y:91.45,x:-22.05}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:98.1534,x:45.25,y:-25.95,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:74.0757,x:35.8,y:48.95,regX:-40.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:105.5464,x:57.55,y:126.45,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:86.0007,x:51.7,y:135.7,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.2354,x:7.2,y:96.25}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.3827,x:20.65,y:191.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.9543,y:-58.3,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{rotation:16.1219,x:-29.95,y:187.35,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:-2.8386,x:0.4,y:-79.35}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-118.961,x:-74.4,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-76.4931,x:-34.65,y:124.3,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-108.651,x:-37.95,y:132.45,regX:6.4}},{t:this.instance,p:{rotation:-77.3846,x:-57.05,y:-23.1,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3153,y:91.45,x:-22.05}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9984,scaleY:0.9984,rotation:98.4091,x:45.3,y:-25.9,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:74.527,x:35.4,y:48.9,regX:-40.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:106.003,x:56.6,y:126.55,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:86.4676,x:50.65,y:135.85,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.2468,x:7.2,y:96.25}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.3915,x:20.7,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.9428,y:-58.3,x:-4.8,regX:-0.9}},{t:this.instance_6,p:{rotation:16.1073,x:-29.95,y:187.35,regX:2.6,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-2.5564,x:0.4,y:-79.45}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-120.0474,x:-74.4,regY:0,y:53.6,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-77.5913,x:-33.35,y:123.5,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-109.7372,x:-36.45,y:131.65,regX:6.4}},{t:this.instance,p:{rotation:-77.3782,x:-57.1,y:-23.1,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3109,y:91.45,x:-22.1}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:98.6686,x:45.3,y:-25.8,regY:-0.3}},{t:this.instance_13,p:{regY:-0.9,rotation:74.9763,x:35.1,y:48.85,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:106.4611,x:55.7,y:126.7,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:86.9369,x:49.6,y:135.95,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.2612,x:7.25,y:96.25}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.4003,x:20.7,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.9311,y:-58.3,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{rotation:16.0953,x:-29.85,y:187.45,regX:2.7,regY:-54.4,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-2.2744,x:0.4,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-121.1326,x:-74.4,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-78.6894,x:-31.95,y:122.7,scaleX:0.9983,scaleY:0.9983,regY:-8.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-110.823,x:-34.9,y:130.95,regX:6.4}},{t:this.instance,p:{rotation:-77.3718,x:-57.1,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3056,y:91.45,x:-22.05}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:98.9239,x:45.4,y:-25.9,regY:-0.3}},{t:this.instance_13,p:{regY:-0.9,rotation:75.4277,x:34.7,y:48.75,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:106.9166,x:54.75,y:126.75,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:87.4043,x:48.55,y:135.95,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.2736,x:7.25,y:96.25}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.4091,x:20.75,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.9196,y:-58.3,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{rotation:16.0823,x:-30,y:187.45,regX:2.6,regY:-54.3,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-1.9906,x:0.35,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-122.2187,x:-74.45,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-79.7858,x:-30.75,y:121.9,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-111.9078,x:-33.55,y:130.15,regX:6.4}},{t:this.instance,p:{rotation:-77.3665,x:-57.1,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.9,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.3003,y:91.5,x:-21.95}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:99.1801,x:45.2,y:-25.8,regY:-0.2}},{t:this.instance_13,p:{regY:-0.8,rotation:75.8777,x:34.3,y:48.8,regX:-40.4,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:107.3748,x:53.8,y:126.85,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:87.8741,x:47.55,y:136,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.2852,x:7.25,y:96.25}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.4187,x:20.7,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.9079,y:-58.3,x:-4.85,regX:-0.9}},{t:this.instance_6,p:{rotation:16.0696,x:-30,y:187.45,regX:2.6,regY:-54.3,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-1.7087,x:0.35,y:-79.55}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-123.3061,x:-74.45,regY:0,y:53.55,regX:40.3}},{t:this.instance_2,p:{regX:5.2,rotation:-80.8841,x:-29.5,y:121.1,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-112.9938,x:-32.15,y:129.3,regX:6.5}},{t:this.instance,p:{rotation:-77.3612,x:-57.05,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.2951,y:91.45,x:-22.1}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9983,scaleY:0.9983,rotation:99.4367,x:45.25,y:-25.9,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:76.3276,x:34.05,y:48.7,regX:-40.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:107.8312,x:52.85,y:127,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:88.342,x:46.5,y:136.15,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.2985,x:7.25,y:96.25}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.4275,x:20.75,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.8963,y:-58.35,x:-4.95,regX:-1}},{t:this.instance_6,p:{rotation:16.0562,x:-29.95,y:187.45,regX:2.6,regY:-54.3,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.4,scaleX:0.9989,scaleY:0.9989,rotation:-1.4267,x:0.35,y:-79.5}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-124.3916,x:-74.45,regY:0,y:53.6,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-81.9824,x:-28.2,y:120.15,scaleX:0.9983,scaleY:0.9983,regY:-8.6}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-114.078,x:-30.65,y:128.6,regX:6.4}},{t:this.instance,p:{rotation:-77.3557,x:-57.05,y:-23.15,regY:0.4,regX:35.6}}]},1).to({state:[{t:this.instance_15,p:{regX:1.8,regY:-45.6,scaleX:0.9979,scaleY:0.9979,rotation:2.2899,y:91.45,x:-22.15}},{t:this.instance_14,p:{regX:-33,scaleX:0.9983,scaleY:0.9983,rotation:99.694,x:45.25,y:-25.75,regY:-0.2}},{t:this.instance_13,p:{regY:-0.9,rotation:76.7781,x:33.75,y:48.75,regX:-40.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_12,p:{regY:8.2,scaleX:0.9983,scaleY:0.9983,rotation:108.2873,x:51.9,y:127.15,regX:-6}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:88.8098,x:45.5,y:136.2,regX:-4.5,regY:3}},{t:this.instance_10,p:{regX:-0.5,scaleX:0.9975,scaleY:0.9975,rotation:-10.311,x:7.25,y:96.25}},{t:this.instance_9,p:{regX:4.2,scaleX:0.9974,scaleY:0.9974,rotation:-3.4363,x:20.85,y:191.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9989,scaleY:0.9989,rotation:10.8849,y:-58.35,x:-5,regX:-1}},{t:this.instance_6,p:{rotation:16.0435,x:-29.85,y:187.5,regX:2.7,regY:-54.3,scaleX:0.9979,scaleY:0.9979}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.2,regY:52.5,scaleX:0.9989,scaleY:0.9989,rotation:-1.1431,x:0.3,y:-79.35}},{t:this.instance_3,p:{scaleX:0.9983,scaleY:0.9983,rotation:-125.4766,x:-74.45,regY:0,y:53.6,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-83.0802,x:-26.85,y:119.4,scaleX:0.9983,scaleY:0.9983,regY:-8.5}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-115.1634,x:-29.3,y:127.8,regX:6.4}},{t:this.instance,p:{rotation:-77.3506,x:-57.05,y:-23.15,regY:0.4,regX:35.6}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93.2,-210,182.4,515.4);


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
	this.instance.setTransform(-57.25,-23.35,0.9984,0.9985,-88.8791,0,0,36.2,0.3);

	this.instance_1 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1.setTransform(8,115.8,0.9982,0.9982,-155.4659,0,0,6.3,-1.4);

	this.instance_2 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2.setTransform(4.35,107.85,0.9983,0.9983,-122.9932,0,0,5.2,-8.7);

	this.instance_3 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_3.setTransform(-57.45,55.9,0.9984,0.9984,-140.7652,0,0,40,1.1);

	this.instance_4 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_4.setTransform(0.4,-79,0.999,0.999,-3.6465,0,0,1,52.8);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_6.setTransform(-33,188,0.9983,0.9983,12.7243,0,0,3,-54.2);

	this.instance_7 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_7.setTransform(-4.95,-58.2,0.999,0.999,12.1114,0,0,-0.9,8.8);

	this.instance_8 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_9.setTransform(35.6,186.95,0.9978,0.9978,-6.9034,0,0,3.6,-53.9);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(14.2,93.8,0.9978,0.9978,-15.3987,0,0,-0.8,1.9);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(19.8,139,0.9983,0.9983,61.5907,0,0,-4.9,3.1);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(22.85,128.25,0.9983,0.9983,87.9153,0,0,-6.4,8.1);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(32.9,48.95,0.9984,0.9984,97.0969,0,0,-40,-1.1);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(45.25,-26.25,0.9984,0.9984,100.1309,0,0,-33.5,-0.3);

	this.instance_15 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_15.setTransform(-20.25,91.2,0.9984,0.9984,5.251,0,0,2.4,-46.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:5.251,x:-20.25,y:91.2}},{t:this.instance_14,p:{scaleX:0.9984,scaleY:0.9984,rotation:100.1309,x:45.25,y:-26.25,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:97.0969,x:32.9,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8.1,rotation:87.9153,x:22.85,y:128.25,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.9,scaleX:0.9983,scaleY:0.9983,rotation:61.5907,x:19.8,y:139,regY:3.1}},{t:this.instance_10,p:{regY:1.9,scaleX:0.9978,scaleY:0.9978,rotation:-15.3987,x:14.2}},{t:this.instance_9,p:{regX:3.6,rotation:-6.9034,x:35.6,y:186.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.999,scaleY:0.999,rotation:12.1114,y:-58.2,x:-4.95}},{t:this.instance_6,p:{scaleX:0.9983,scaleY:0.9983,rotation:12.7243,x:-33,y:188,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1,rotation:-3.6465,x:0.4,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:40,regY:1.1,scaleX:0.9984,scaleY:0.9984,rotation:-140.7652,x:-57.45,y:55.9}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-122.9932,x:4.35,y:107.85,regY:-8.7}},{t:this.instance_1,p:{regX:6.3,scaleX:0.9982,scaleY:0.9982,rotation:-155.4659,x:8,y:115.8,regY:-1.4}},{t:this.instance,p:{regX:36.2,regY:0.3,scaleY:0.9985,rotation:-88.8791,x:-57.25,y:-23.35}}]}).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2504,x:-20.2,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.0659,x:45.2,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.0009,x:32.85,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:86.821,x:24.65,y:128.35,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:60.4948,x:21.65,y:139.25,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3987,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.9029,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,scaleX:0.9989,scaleY:0.9989,rotation:12.1198,y:-58.15,x:-4.95}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.724,x:-32.9,y:187.95,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-3.9441,x:0.55,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-139.1091,x:-58.65,y:55.9}},{t:this.instance_2,p:{regX:5.3,scaleX:0.9982,scaleY:0.9982,rotation:-121.3357,x:1.55,y:109.45,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-153.8094,x:5.05,y:117.65,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-87.9811,x:-57.2,y:-23.45}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2504,x:-20.2,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.0001,x:45.2,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.9048,x:33,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:85.7248,x:26.25,y:128.7,regX:-6.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:59.3991,x:23.5,y:139.5,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3987,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.9029,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.999,scaleY:0.999,rotation:12.1304,y:-58.15,x:-4.9}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.724,x:-32.9,y:187.95,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-4.2423,x:0.55,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-137.4523,x:-59.8,y:55.8}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-119.6784,x:-1.25,y:111.25,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-152.1527,x:2,y:119.45,regY:-1.5}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-87.0818,x:-57.25,y:-23.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2504,x:-20.2,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.9334,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:93.8087,x:33.1,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:84.6287,x:27.8,y:128.65,regX:-6.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_11,p:{regX:-4.9,scaleX:0.9982,scaleY:0.9982,rotation:58.3029,x:25.2,y:139.6,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3987,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.9029,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9989,scaleY:0.9989,rotation:12.1412,y:-58.15,x:-4.9}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.724,x:-32.9,y:187.95,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-4.5407,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-135.7951,x:-61.1,y:55.9}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-118.0203,x:-4.1,y:112.75,regY:-8.6}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-150.4969,x:-1.15,y:121.1,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-86.181,x:-57.25,y:-23.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2495,x:-20.2,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.8685,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:92.7131,x:33.15,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:83.5325,x:29.45,y:128.75,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.9,scaleX:0.9982,scaleY:0.9982,rotation:57.2066,x:27,y:139.7,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3985,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.9029,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.999,scaleY:0.999,rotation:12.151,y:-58.15,x:-4.9}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.724,x:-32.9,y:187.95,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-4.8394,x:0.6,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:40,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-134.1386,x:-62.45,y:55.75}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-116.3645,x:-7.05,y:114.35,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-148.8386,x:-4.3,y:122.8,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-85.2817,x:-57.2,y:-23.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2495,x:-20.2,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.8028,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:91.6168,x:33.25,regX:-39.9,y:49.1}},{t:this.instance_12,p:{regY:8,rotation:82.4366,x:31.05,y:128.8,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:56.1107,x:28.9,y:139.95,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3985,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.902,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9989,scaleY:0.9989,rotation:12.1618,y:-58.15,x:-4.85}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.724,x:-32.85,y:187.95,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-5.1381,x:0.6,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-132.4807,x:-63.6,y:55.7}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-114.7078,x:-10,y:115.95,regY:-8.7}},{t:this.instance_1,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-147.1819,x:-7.5,y:124.25,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-84.382,x:-57.25,y:-23.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2495,x:-20.2,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.7372,x:45.15,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:90.5202,x:33.35,regX:-40,y:48.9}},{t:this.instance_12,p:{regY:8,rotation:81.3414,x:32.65,y:128.85,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.9,scaleX:0.9982,scaleY:0.9982,rotation:55.0146,x:30.65,y:139.9,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3985,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.902,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.999,scaleY:0.999,rotation:12.1716,y:-58.15,x:-4.85}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.724,x:-32.85,y:187.95,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-5.4359,x:0.55,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-130.8239,x:-64.85,y:55.55}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-113.0504,x:-13,y:117.3,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-145.5247,x:-10.7,y:125.85,regY:-1.4}},{t:this.instance,p:{regX:36.2,regY:0.2,scaleY:0.9984,rotation:-83.4822,x:-57.2,y:-23.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2494,x:-20.2,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.673,x:45.1,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:89.4281,x:33.45,regX:-40,y:49}},{t:this.instance_12,p:{regY:8,rotation:80.2447,x:34.25,y:128.85,regX:-6.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:53.9184,x:32.55,y:140.05,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3985,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.902,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.999,scaleY:0.999,rotation:12.1841,y:-58.15,x:-4.85}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.724,x:-32.85,y:187.9,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-5.7342,x:0.6,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:40,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-129.1671,x:-66.1,y:55.4}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-111.3934,x:-16.1,y:118.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-143.8677,x:-14.05,y:127.15,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-82.5823,x:-57.2,y:-23.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2494,x:-20.2,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.6064,x:45.15,y:-26.4,regX:-33.4,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:88.3324,x:33.55,regX:-40,y:49}},{t:this.instance_12,p:{regY:8,rotation:79.1488,x:35.85,y:128.85,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:52.822,x:34.35,y:140,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3985,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.902,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.999,scaleY:0.999,rotation:12.1922,y:-58.15,x:-4.85}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.724,x:-32.85,y:187.9,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-6.0333,x:0.65,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-127.5104,x:-67.3,y:55.3}},{t:this.instance_2,p:{regX:5.3,scaleX:0.9982,scaleY:0.9982,rotation:-109.7365,x:-19.15,y:119.8,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-142.2117,x:-17.35,y:128.65,regY:-1.5}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-81.6833,x:-57.2,y:-23.45}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2485,x:-20.2,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.5415,x:45.2,y:-26.5,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:87.2352,x:33.55,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:78.0535,x:37.45,y:128.8,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:51.7258,x:36.15,y:139.95,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3985,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.9011,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9989,scaleY:0.9989,rotation:12.203,y:-58.15,x:-4.8}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.724,x:-32.8,y:187.9,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-6.3316,x:0.6,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:40,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-125.8538,x:-68.6,y:55.05}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-108.0793,x:-22.2,y:121.1,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-140.5552,x:-20.75,y:129.75,regY:-1.4}},{t:this.instance,p:{regX:36.2,regY:0.2,scaleY:0.9984,rotation:-80.783,x:-57.25,y:-23.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2485,x:-20.2,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.4759,x:45.1,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.1396,x:33.7,regX:-40,y:49.05}},{t:this.instance_12,p:{regY:8.1,rotation:76.9581,x:38.95,y:128.75,regX:-6.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:50.6294,x:37.9,y:140,regY:3.2}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3985,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.9011,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9989,scaleY:0.9989,rotation:12.2145,y:-58.15,x:-4.85}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.7227,x:-32.8,y:187.95,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-6.6295,x:0.7,y:-78.9,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-124.197,x:-69.8,y:54.95}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-106.4222,x:-25.4,y:122.2,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-138.8976,x:-24.1,y:130.95,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-79.8831,x:-57.2,y:-23.55}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2485,x:-20.2,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.4102,x:45.1,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:85.0425,x:33.8,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:75.8626,x:40.7,y:128.6,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:49.5338,x:39.8,y:139.85,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3976,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.9011,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9989,scaleY:0.9989,rotation:12.2238,y:-58.15,x:-4.85}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.7227,x:-32.8,y:187.95,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-6.9282,x:0.7,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:40,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-122.5404,x:-71.05,y:54.65}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-104.7653,x:-28.6,y:123.25,regY:-8.7}},{t:this.instance_1,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-137.2409,x:-27.65,y:131.95,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.3,scaleY:0.9984,rotation:-78.9832,x:-57.1,y:-23.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2485,x:-20.2,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.3444,x:45.15,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:83.9454,x:33.9,regX:-40,y:49.05}},{t:this.instance_12,p:{regY:8,rotation:74.7659,x:42.25,y:128.45,regX:-6.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:48.4375,x:41.6,y:139.75,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3976,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.901,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9989,scaleY:0.9989,rotation:12.2342,y:-58.1,x:-4.85}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.7227,x:-32.8,y:187.95,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-7.2263,x:0.7,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-120.8836,x:-72.25,y:54.55}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-103.1077,x:-31.9,y:124.2,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-135.5841,x:-31.05,y:132.9,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-78.0837,x:-57.2,y:-23.55}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2485,x:-20.15,y:91.1}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.2788,x:45.1,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:82.8496,x:33.95,regX:-40,y:49.05}},{t:this.instance_12,p:{regY:8,rotation:73.6704,x:43.85,y:128.25,regX:-6.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:47.3411,x:43.4,y:139.6,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.3976,x:14.15}},{t:this.instance_9,p:{regX:3.7,rotation:-6.9002,x:35.65,y:186.85}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9989,scaleY:0.9989,rotation:12.2442,y:-58.1,x:-4.8}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.7227,x:-32.8,y:187.95,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-7.5246,x:0.75,y:-78.9,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-119.2253,x:-73.5,y:54.25}},{t:this.instance_2,p:{regX:5.3,scaleX:0.9982,scaleY:0.9982,rotation:-101.4509,x:-35.2,y:124.95,regY:-8.7}},{t:this.instance_1,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-133.9272,x:-34.65,y:133.75,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-77.1841,x:-57.2,y:-23.55}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2417,x:-20.2,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.349,x:45.15,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9983,rotation:83.8899,x:33.8,regX:-40,y:49.05}},{t:this.instance_12,p:{regY:8,rotation:74.7106,x:42.35,y:128.5,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:48.3791,x:41.7,y:139.7,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4023,x:14.25}},{t:this.instance_9,p:{regX:3.7,rotation:-6.8984,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9989,scaleY:0.9989,rotation:12.2289,y:-58.1,x:-4.85}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.7146,x:-32.9,y:187.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-7.273,x:0.7,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-120.7775,x:-72.3,y:54.6}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-103.0043,x:-32.1,y:124.3,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-135.4936,x:-31.3,y:133,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.3,scaleY:0.9984,rotation:-78.0146,x:-57.1,y:-23.55}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2354,x:-20.2,y:91.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.4207,x:45.1,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:84.93,x:33.7,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:75.7524,x:40.85,y:128.6,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:49.4183,x:39.95,y:139.85,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4068,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.8968,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9989,scaleY:0.9989,rotation:12.2145,y:-58.1,x:-4.85}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.7066,x:-32.9,y:187.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-7.0224,x:0.7,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-122.3285,x:-71.15,y:54.7}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-104.5554,x:-29.05,y:123.45,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-137.0587,x:-28.05,y:132.1,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-78.845,x:-57.2,y:-23.55}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2284,x:-20.15,y:91.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.4901,x:45.15,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:85.9701,x:33.7,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:76.7916,x:39.35,y:128.65,regX:-6.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:50.4576,x:38.2,y:139.9,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4125,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.8949,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9989,scaleY:0.9989,rotation:12.1987,y:-58.15,x:-4.8}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.6966,x:-32.85,y:187.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-6.7712,x:0.65,y:-78.8,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-123.881,x:-70,y:55}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-106.1088,x:-26.1,y:122.4,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-138.6239,x:-24.9,y:131.15,regY:-1.5}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-79.6757,x:-57.2,y:-23.55}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2214,x:-20.15,y:91.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.5611,x:45.15,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:87.0098,x:33.6,regX:-40,y:49}},{t:this.instance_12,p:{regY:8,rotation:77.8323,x:37.75,y:128.8,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:51.4952,x:36.5,y:140,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4176,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.8931,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.999,scaleY:0.999,rotation:12.1841,y:-58.15,x:-4.85}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.6894,x:-32.8,y:187.9,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-6.5202,x:0.7,y:-78.9,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:40,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-125.4321,x:-69,y:54.95}},{t:this.instance_2,p:{regX:5.3,scaleX:0.9983,scaleY:0.9983,rotation:-107.6614,x:-23.15,y:121.3,regY:-8.7}},{t:this.instance_1,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-140.1901,x:-21.75,y:129.95,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.3,scaleY:0.9984,rotation:-80.506,x:-57.05,y:-23.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.2152,x:-20.15,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.6322,x:45.2,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:88.0485,x:33.5,regX:-40,y:49}},{t:this.instance_12,p:{regY:8,rotation:78.8732,x:36.25,y:128.95,regX:-6.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:52.5335,x:34.75,y:140.05,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.422,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.8905,x:35.65,y:186.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.999,scaleY:0.999,rotation:12.168,y:-58.15,x:-4.85}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.6813,x:-32.8,y:187.95,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-6.2684,x:0.6,y:-78.8,regY:52.9,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-126.985,x:-67.75,y:55.3}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-109.2132,x:-20.2,y:120.3,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-141.7556,x:-18.45,y:128.85,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-81.336,x:-57.25,y:-23.55}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.209,x:-20.15,y:91.15}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.7015,x:45.25,y:-26.4,regX:-33.5,regY:-0.4}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:89.0883,x:33.4,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:79.9139,x:34.7,y:128.8,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:53.5717,x:33,y:140,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4276,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.8888,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9989,scaleY:0.9989,rotation:12.1529,y:-58.15,x:-4.9}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.6722,x:-32.75,y:187.95,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-6.0192,x:0.65,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-128.5362,x:-66.6,y:55.4}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-110.7659,x:-17.25,y:119.1,regY:-8.6}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-143.3202,x:-15.35,y:127.65,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-82.167,x:-57.2,y:-23.45}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.202,x:-20.2,y:91.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.7726,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:90.1244,x:33.3,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:80.9539,x:33.15,y:128.85,regX:-6.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:54.611,x:31.3,y:140,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.434,x:14.25}},{t:this.instance_9,p:{regX:3.7,rotation:-6.887,x:35.65,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.9,scaleX:0.9989,scaleY:0.9989,rotation:12.1385,y:-58.15,x:-4.9}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.6641,x:-32.85,y:187.95,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-5.7666,x:0.55,y:-78.85,regY:52.9,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-130.087,x:-65.5,y:55.5}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-112.3178,x:-14.45,y:117.9,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-144.8871,x:-12.25,y:126.4,regY:-1.4}},{t:this.instance,p:{regX:36.2,regY:0.2,scaleY:0.9984,rotation:-82.9972,x:-57.25,y:-23.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.1959,x:-20.2,y:91.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.8427,x:45.1,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:91.163,x:33.15,regX:-40,y:48.9}},{t:this.instance_12,p:{regY:8,rotation:81.9947,x:31.55,y:128.8,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:55.6492,x:29.55,y:139.95,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4376,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.8852,x:35.65,y:186.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,scaleX:0.999,scaleY:0.999,rotation:12.1223,y:-58.15,x:-4.95}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.656,x:-32.85,y:187.95,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-5.5151,x:0.6,y:-78.95,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-131.638,x:-64.35,y:55.65}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-113.8709,x:-11.6,y:116.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-146.4523,x:-9.15,y:125.05,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-83.8284,x:-57.2,y:-23.55}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.1897,x:-20.2,y:91.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.9138,x:45.15,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:92.203,x:33.1,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:83.0352,x:30.1,y:128.75,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:56.6877,x:27.7,y:139.85,regY:3.2}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4431,x:14.2}},{t:this.instance_9,p:{regX:3.7,rotation:-6.8834,x:35.7,y:186.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,scaleX:0.999,scaleY:0.999,rotation:12.1081,y:-58.15,x:-5}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.6479,x:-32.8,y:187.95,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-5.2646,x:0.55,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-133.1902,x:-63.15,y:55.65}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-115.4232,x:-8.95,y:115.25,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-148.018,x:-6.2,y:123.65,regY:-1.4}},{t:this.instance,p:{regX:36.4,regY:0.2,scaleY:0.9984,rotation:-84.6584,x:-57.2,y:-23.65}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.1826,x:-20.15,y:91.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:99.9832,x:45.2,y:-26.45,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:93.2428,x:33,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:84.0761,x:28.55,y:128.7,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:57.7256,x:26.15,y:139.7,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4478,x:14.2}},{t:this.instance_9,p:{regX:3.6,rotation:-6.8818,x:35.6,y:186.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,scaleX:0.999,scaleY:0.999,rotation:12.0928,y:-58.15,x:-5.05}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.639,x:-32.7,y:188.05,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-5.0133,x:0.55,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-134.7418,x:-62.1,y:55.8}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-116.9744,x:-6.15,y:113.85,regY:-8.7}},{t:this.instance_1,p:{regX:6.3,scaleX:0.9981,scaleY:0.9981,rotation:-149.5834,x:-3.4,y:122.15,regY:-1.5}},{t:this.instance,p:{regX:36.4,regY:0.2,scaleY:0.9984,rotation:-85.489,x:-57.25,y:-23.65}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.1757,x:-20.15,y:91.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.0552,x:45.2,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:94.2837,x:32.9,regX:-39.9,y:49.1}},{t:this.instance_12,p:{regY:8,rotation:85.1167,x:27,y:128.75,regX:-6.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:58.7647,x:24.2,y:139.6,regY:3.2}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4531,x:14.2}},{t:this.instance_9,p:{regX:3.6,rotation:-6.8791,x:35.6,y:186.95}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,scaleX:0.999,scaleY:0.999,rotation:12.0767,y:-58.15,x:-5}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.6301,x:-32.7,y:188,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-4.7621,x:0.5,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-136.2931,x:-60.95,y:55.9}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-118.5281,x:-3.5,y:112.35,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-151.1482,x:-0.35,y:120.55,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-86.3195,x:-57.25,y:-23.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.1695,x:-20.15,y:91.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.1255,x:45.2,y:-26.35,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:95.3233,x:32.85,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:86.1568,x:25.55,y:128.55,regX:-6.3,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:59.8031,x:22.65,y:139.35,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4595,x:14.2}},{t:this.instance_9,p:{regX:3.6,rotation:-6.8781,x:35.6,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,scaleX:0.9989,scaleY:0.9989,rotation:12.0626,y:-58.15,x:-5.05}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.622,x:-32.75,y:188,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-4.5101,x:0.55,y:-79,regY:52.8,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regX:40,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-137.8448,x:-59.9,y:55.85}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-120.081,x:-0.75,y:110.85,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-152.7149,x:2.5,y:119,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-87.1502,x:-57.25,y:-23.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.1624,x:-20.15,y:91.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.1959,x:45.2,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:96.362,x:32.7,regX:-40,y:48.85}},{t:this.instance_12,p:{regY:8,rotation:87.1972,x:23.95,y:128.25,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:60.8419,x:20.9,y:139.15,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4631,x:14.25}},{t:this.instance_9,p:{regX:3.6,rotation:-6.8764,x:35.6,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,scaleX:0.999,scaleY:0.999,rotation:12.0463,y:-58.15,x:-5.05}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.6139,x:-32.7,y:188,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-4.26,x:0.45,y:-79,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-139.3967,x:-58.6,y:55.95}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-121.6329,x:1.85,y:109.25,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-154.2803,x:5.4,y:117.35,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-87.9803,x:-57.2,y:-23.45}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9983,scaleY:0.9983,rotation:5.1564,x:-20.15,y:91.2}},{t:this.instance_14,p:{scaleX:0.9983,scaleY:0.9983,rotation:100.2653,x:45.2,y:-26.4,regX:-33.5,regY:-0.3}},{t:this.instance_13,p:{scaleX:0.9983,scaleY:0.9983,rotation:97.4004,x:32.6,regX:-40,y:48.95}},{t:this.instance_12,p:{regY:8,rotation:88.2376,x:22.3,y:128.15,regX:-6.4,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_11,p:{regX:-4.8,scaleX:0.9982,scaleY:0.9982,rotation:61.8793,x:19.1,y:139,regY:3.1}},{t:this.instance_10,p:{regY:2,scaleX:0.9977,scaleY:0.9977,rotation:-15.4686,x:14.2}},{t:this.instance_9,p:{regX:3.6,rotation:-6.8738,x:35.6,y:186.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-1,scaleX:0.9989,scaleY:0.9989,rotation:12.032,y:-58.15,x:-5}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:12.6048,x:-32.8,y:188,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.1,rotation:-4.0081,x:0.5,y:-79.05,regY:52.8,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regX:39.9,regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-140.9481,x:-57.4,y:55.9}},{t:this.instance_2,p:{regX:5.2,scaleX:0.9982,scaleY:0.9982,rotation:-123.1846,x:4.5,y:107.6,regY:-8.7}},{t:this.instance_1,p:{regX:6.2,scaleX:0.9981,scaleY:0.9981,rotation:-155.8448,x:8.2,y:115.55,regY:-1.4}},{t:this.instance,p:{regX:36.3,regY:0.2,scaleY:0.9984,rotation:-88.8116,x:-57.3,y:-23.5}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93.2,-211.1,181.5,512.6);


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
	this.instance.setTransform(-57,-23.15,0.9986,0.9986,-79.612,0,0,35.8,0.4);

	this.instance_1 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1.setTransform(-25.6,131,0.9981,0.9981,-130.1166,0,0,6.2,-1.6);

	this.instance_2 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_2.setTransform(-26.4,122.05,0.9984,0.9984,-106.7769,0,0,5.4,-8.5);

	this.instance_3 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_3.setTransform(-69.85,54.8,0.9984,0.9984,-123.5395,0,0,39.8,1.1);

	this.instance_4 = new lib.ch1_headcopy_1("synched",0);
	this.instance_4.setTransform(0.55,-78.95,0.999,0.999,-3.6481,0,0,1.1,52.8);

	this.instance_5 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_6.setTransform(-23.7,189.2,0.9983,0.9983,16.8029,0,0,3,-54.6);

	this.instance_7 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_7.setTransform(-4.85,-58.15,0.9991,0.9991,12.1111,0,0,-0.8,8.8);

	this.instance_8 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_9.setTransform(28.8,189,0.9979,0.9979,-11.5929,0,0,2.4,-54.1);

	this.instance_10 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_10.setTransform(9.45,95.55,0.9979,0.9979,-14.7203,0,0,-1.1,1.9);

	this.instance_11 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_11.setTransform(36.3,136.4,0.9985,0.9985,86.8619,0,0,-5.2,3.2);

	this.instance_12 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_12.setTransform(45.35,130.05,0.9985,0.9985,124.5381,0,0,-6.3,7.9);

	this.instance_13 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_13.setTransform(39.3,49.5,0.9985,0.9985,86.1874,0,0,-40.8,-0.5);

	this.instance_14 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_14.setTransform(45.15,-26.5,0.9984,0.9984,95.1005,0,0,-33.9,-0.1);

	this.instance_15 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_15.setTransform(-16.95,92.7,0.9985,0.9985,1.8487,0,0,2.2,-46.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{scaleX:0.9985,scaleY:0.9985,rotation:1.8487,x:-16.95,y:92.7}},{t:this.instance_14,p:{rotation:95.1005,y:-26.5,x:45.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9985,scaleY:0.9985,rotation:86.1874,x:39.3,y:49.5,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9985,scaleY:0.9985,rotation:124.5381,x:45.35,y:130.05,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9985,scaleY:0.9985,rotation:86.8619,x:36.3,y:136.4,regY:3.2}},{t:this.instance_10,p:{regX:-1.1,scaleX:0.9979,scaleY:0.9979,rotation:-14.7203,x:9.45,y:95.55}},{t:this.instance_9,p:{regX:2.4,regY:-54.1,scaleX:0.9979,scaleY:0.9979,rotation:-11.5929,x:28.8,y:189}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:12.1111,x:-4.85,y:-58.15,regX:-0.8}},{t:this.instance_6,p:{regY:-54.6,scaleX:0.9983,scaleY:0.9983,rotation:16.8029,x:-23.7,y:189.2,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-3.6481,y:-78.95,x:0.55,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1.1,scaleX:0.9984,scaleY:0.9984,rotation:-123.5395,x:-69.85,y:54.8}},{t:this.instance_2,p:{regY:-8.5,rotation:-106.7769,x:-26.4,y:122.05,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-130.1166,x:-25.6,y:131,regY:-1.6}},{t:this.instance,p:{scaleX:0.9986,scaleY:0.9986,rotation:-79.612,x:-57,y:-23.15,regX:35.8,regY:0.4}}]}).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.848,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:94.83,y:-26.55,x:45.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:85.2361,x:39.6,y:49.5,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:123.5881,x:47,y:130,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:85.9106,x:38.2,y:136.5,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7189,x:9.3,y:95.45}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.5928,x:28.65,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1209,x:-4.8,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.8023,x:-23.65,y:189.25,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-4.2406,y:-78.85,x:0.55,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-121.7006,x:-70.1,y:54.8}},{t:this.instance_2,p:{regY:-8.6,rotation:-104.9381,x:-28.9,y:123.3,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-128.2776,x:-28.3,y:132.3,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.4189,x:-56.95,y:-23.25,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8471,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:94.5576,y:-26.55,x:45.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:84.2847,x:40,y:49.5,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:122.6353,x:48.7,y:129.9,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:84.9601,x:39.95,y:136.5,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7189,x:9.25,y:95.45}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.5928,x:28.65,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1307,x:-4.8,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.8023,x:-23.65,y:189.25,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-4.8341,y:-78.85,x:0.65,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-119.8607,x:-70.4,y:54.7}},{t:this.instance_2,p:{regY:-8.6,rotation:-103.0966,x:-31.3,y:124.55,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-126.437,x:-31.1,y:133.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.2234,x:-56.95,y:-23.25,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8471,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:94.2871,y:-26.55,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:83.3325,x:40.35,y:49.55,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:121.6827,x:50.4,y:129.75,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:84.008,x:41.75,y:136.5,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7189,x:9.25,y:95.45}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.5926,x:28.65,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1407,x:-4.8,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.8023,x:-23.6,y:189.25,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-5.4281,y:-78.85,x:0.65,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-118.0214,x:-70.6,y:54.65}},{t:this.instance_2,p:{regY:-8.6,rotation:-101.2567,x:-33.85,y:125.7,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-124.598,x:-33.9,y:134.7,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.0292,x:-56.95,y:-23.25,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8471,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:94.014,y:-26.55,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:82.382,x:40.7,y:49.6,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:120.7307,x:52.05,y:129.6,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:83.0562,x:43.6,y:136.5,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7182,x:9.2,y:95.45}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.5926,x:28.65,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1513,x:-4.8,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.8023,x:-23.6,y:189.25,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-6.0225,y:-78.8,x:0.7,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-116.1812,x:-70.9,y:54.6}},{t:this.instance_2,p:{regY:-8.5,rotation:-99.4173,x:-36.3,y:126.9,regX:5.3}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-122.7571,x:-36.75,y:135.8,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.8338,x:-57,y:-23.1,regX:35.7,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8462,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:93.7428,y:-26.55,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:81.4293,x:41.2,y:49.55,regY:-0.6,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:119.7775,x:53.7,y:129.45,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:82.1051,x:45.5,y:136.45,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7182,x:9.2,y:95.45}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.5926,x:28.65,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1621,x:-4.75,y:-58.05,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.8023,x:-23.55,y:189.25,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-6.616,y:-78.8,x:0.75,regX:1.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-114.3415,x:-71.2,y:54.55}},{t:this.instance_2,p:{regY:-8.6,rotation:-97.5775,x:-39.05,y:127.85,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-120.9181,x:-39.6,y:136.75,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.6391,x:-56.8,y:-23.2,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8462,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:93.4708,y:-26.6,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:80.4779,x:41.4,y:49.6,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:118.826,x:55.45,y:129.2,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:81.1518,x:47.2,y:136.4,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7189,x:9.2,y:95.45}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.5926,x:28.6,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1719,x:-4.8,y:-58.05,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.802,x:-23.55,y:189.25,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-7.2095,y:-78.75,x:0.8,regX:1.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-112.5006,x:-71.45,y:54.5}},{t:this.instance_2,p:{regY:-8.6,rotation:-95.7366,x:-41.7,y:128.8,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-119.0782,x:-42.55,y:137.75,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.4452,x:-56.95,y:-23.15,regX:35.7,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8462,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:93.1997,y:-26.6,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:79.5263,x:41.8,y:49.6,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:117.8735,x:57.15,y:128.95,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:80.2005,x:48.95,y:136.3,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7189,x:9.15,y:95.45}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.5926,x:28.6,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1819,x:-4.8,y:-58.05,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.802,x:-23.55,y:189.25,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-7.8045,y:-78.75,x:0.8,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-110.6613,x:-71.55,y:54.35}},{t:this.instance_2,p:{regY:-8.5,rotation:-93.8971,x:-44.25,y:129.65,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-117.2389,x:-45.5,y:138.6,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.2506,x:-56.9,y:-23.25,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8462,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:92.9287,y:-26.55,x:45.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:78.5748,x:42.25,y:49.55,regY:-0.6,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:116.9218,x:58.75,y:128.75,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:79.2493,x:50.8,y:136.2,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7189,x:9.15,y:95.45}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.5926,x:28.6,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1933,x:-4.8,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.802,x:-23.5,y:189.25,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-8.3986,y:-78.7,x:0.75,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-108.8216,x:-71.95,y:54.35}},{t:this.instance_2,p:{regY:-8.6,rotation:-92.0583,x:-47.1,y:130.4,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-115.3987,x:-48.45,y:139.3,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.0556,x:-56.8,y:-23.1,regX:35.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8454,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:92.657,y:-26.55,x:45.05,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:77.6227,x:42.45,y:49.6,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:115.9702,x:60.4,y:128.4,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:78.2975,x:52.55,y:135.95,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.718,x:9.1,y:95.45}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.5926,x:28.55,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2033,x:-4.75,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.802,x:-23.5,y:189.25,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-8.9917,y:-78.7,x:0.8,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-106.9817,x:-72.2,y:54.35}},{t:this.instance_2,p:{regY:-8.6,rotation:-90.218,x:-49.8,y:131.15,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.5582,x:-51.4,y:140,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-77.8613,x:-56.95,y:-23.25,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8454,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:92.3853,y:-26.55,x:45.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:76.6706,x:42.85,y:49.6,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:115.0196,x:62.1,y:128.1,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:77.3459,x:54.4,y:135.85,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.718,x:9.1,y:95.45}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.5926,x:28.55,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2131,x:-4.8,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.802,x:-23.5,y:189.25,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-9.5858,y:-78.7,x:0.95,regX:1.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-105.1417,x:-72.5,y:54.3}},{t:this.instance_2,p:{regY:-8.6,rotation:-88.3815,x:-52.6,y:131.7,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-111.7188,x:-54.65,y:140.6,regY:-1.7}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-77.6657,x:-56.85,y:-23.1,regX:35.7,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8454,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:92.1135,y:-26.6,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:75.7202,x:43.2,y:49.6,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:114.0654,x:63.75,y:127.8,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:76.3945,x:56.3,y:135.65,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.718,x:9.05,y:95.5}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.5926,x:28.5,y:189.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2239,x:-4.8,y:-58.05,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.802,x:-23.45,y:189.25,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-10.18,y:-78.65,x:1,regX:1.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-103.3021,x:-72.8,y:54.2}},{t:this.instance_2,p:{regY:-8.6,rotation:-86.5425,x:-55.3,y:132.3,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-109.8792,x:-57.5,y:141.05,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-77.4713,x:-56.9,y:-23.25,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8375,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:92.3002,y:-26.55,x:45.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:76.3586,x:42.95,y:49.6,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:114.7074,x:62.65,y:128,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:77.0272,x:55.1,y:135.8,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7272,x:9.15,y:95.45}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.6187,x:28.65,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.2114,x:-4.8,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.7893,x:-23.55,y:189.25,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-9.7944,y:-78.65,x:0.9,regX:1.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-104.5806,x:-72.6,y:54.2}},{t:this.instance_2,p:{regY:-8.6,rotation:-87.8295,x:-53.4,y:131.9,regX:5.4}},{t:this.instance_1,p:{scaleX:0.9981,scaleY:0.9981,rotation:-111.1773,x:-55.6,y:140.75,regY:-1.7}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-77.6066,x:-56.95,y:-23.15,regX:35.7,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8296,x:-16.95,y:92.7}},{t:this.instance_14,p:{rotation:92.4886,y:-26.55,x:45.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:76.9979,x:42.8,y:49.55,regY:-0.6,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:115.3498,x:61.45,y:128.15,regY:8}},{t:this.instance_11,p:{scaleX:0.9983,scaleY:0.9983,rotation:77.6599,x:53.8,y:135.95,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7397,x:9.1,y:95.45}},{t:this.instance_9,p:{regX:2.2,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.6447,x:28.5,y:189.15}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1997,x:-4.75,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.7784,x:-23.55,y:189.3,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-9.4084,y:-78.7,x:0.95,regX:1.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-105.8594,x:-72.4,y:54.3}},{t:this.instance_2,p:{regY:-8.6,rotation:-89.1173,x:-51.5,y:131.5,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-112.4736,x:-53.35,y:140.35,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-77.7428,x:-56.8,y:-23.25,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8208,x:-16.9,y:92.7}},{t:this.instance_14,p:{rotation:92.6754,y:-26.55,x:45.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:77.6369,x:42.6,y:49.55,regY:-0.6,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:115.9913,x:60.35,y:128.45,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:78.2921,x:52.5,y:135.95,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7497,x:9.1,y:95.45}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.6734,x:28.65,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1872,x:-4.8,y:-58.05,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.7657,x:-23.45,y:189.3,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-9.0228,y:-78.7,x:0.85,regX:1.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-107.1385,x:-72.2,y:54.35}},{t:this.instance_2,p:{regY:-8.6,rotation:-90.4011,x:-49.55,y:131.05,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-113.7715,x:-51.2,y:139.95,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-77.879,x:-56.95,y:-23.25,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8129,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:92.863,y:-26.55,x:45.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:78.2764,x:42.2,y:49.6,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:116.6324,x:59.35,y:128.55,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:78.9255,x:51.3,y:136.05,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7616,x:9.15,y:95.45}},{t:this.instance_9,p:{regX:2.2,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.701,x:28.6,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1755,x:-4.8,y:-58.05,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.7546,x:-23.4,y:189.3,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-8.6373,y:-78.8,x:0.9,regX:1.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-108.4158,x:-72,y:54.35}},{t:this.instance_2,p:{regY:-8.6,rotation:-91.6886,x:-47.65,y:130.6,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-115.0684,x:-49.1,y:139.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.0142,x:-56.95,y:-23.1,regX:35.7,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.8059,x:-16.85,y:92.65}},{t:this.instance_14,p:{rotation:93.0506,y:-26.55,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:78.9149,x:41.95,y:49.6,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:117.2746,x:58.15,y:128.85,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:79.5584,x:50.1,y:136.2,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7724,x:9.15,y:95.45}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.7278,x:28.7,y:189.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.163,x:-4.75,y:-58.05,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.743,x:-23.55,y:189.3,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-8.2507,y:-78.75,x:0.9,regX:1.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-109.6946,x:-71.9,y:54.35}},{t:this.instance_2,p:{regY:-8.6,rotation:-92.9761,x:-45.8,y:130.05,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-116.3656,x:-47.05,y:138.95,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.1495,x:-56.85,y:-23.25,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.7981,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:93.2374,y:-26.6,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:79.5532,x:41.7,y:49.6,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:117.9162,x:57.05,y:128.95,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:80.1909,x:48.9,y:136.3,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7841,x:9.2,y:95.5}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.7557,x:28.7,y:189.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1504,x:-4.8,y:-58.05,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.731,x:-23.55,y:189.3,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-7.8661,y:-78.75,x:0.8,regX:1.2,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-110.9731,x:-71.5,y:54.4}},{t:this.instance_2,p:{regY:-8.6,rotation:-94.2641,x:-43.9,y:129.5,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-117.6624,x:-44.9,y:138.4,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.2855,x:-56.95,y:-23.25,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.7902,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:93.4234,y:-26.6,x:45.05,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:80.1927,x:41.45,y:49.45,regY:-0.5,regX:-40.9}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:118.5571,x:55.85,y:129.1,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:80.8239,x:47.65,y:136.35,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.7941,x:9.15,y:95.5}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.7835,x:28.8,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1388,x:-4.8,y:-58.05,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.7191,x:-23.4,y:189.3,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-7.4793,y:-78.75,x:0.75,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-112.252,x:-71.5,y:54.5}},{t:this.instance_2,p:{regY:-8.6,rotation:-95.5535,x:-42.1,y:129.05,regX:5.3}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-118.9597,x:-42.9,y:137.8,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.4212,x:-56.95,y:-23.1,regX:35.7,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.7823,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:93.6121,y:-26.6,x:45.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:80.8329,x:41.2,y:49.55,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:119.1983,x:54.7,y:129.25,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:81.4566,x:46.6,y:136.4,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.8058,x:9.2,y:95.5}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.8112,x:28.75,y:189}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1262,x:-4.8,y:-58.05,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.7081,x:-23.4,y:189.35,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-7.0948,y:-78.75,x:0.7,regX:1.1,scaleX:0.9989,scaleY:0.9989}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-113.5302,x:-71.3,y:54.5}},{t:this.instance_2,p:{regY:-8.6,rotation:-96.8403,x:-40.2,y:128.25,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-120.2568,x:-40.9,y:137.2,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.5578,x:-56.85,y:-23.25,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.7735,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:93.7999,y:-26.6,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:81.472,x:41,y:49.6,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:119.8414,x:53.65,y:129.45,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:82.0892,x:45.4,y:136.4,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.8177,x:9.25,y:95.5}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.8382,x:28.8,y:189.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1158,x:-4.8,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.6961,x:-23.35,y:189.35,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-6.7086,y:-78.75,x:0.65,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-114.8098,x:-71.05,y:54.6}},{t:this.instance_2,p:{regY:-8.6,rotation:-98.1273,x:-38.4,y:127.55,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-121.554,x:-38.85,y:136.6,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.6926,x:-56.95,y:-23.2,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.7656,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:93.9859,y:-26.55,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:82.1106,x:40.8,y:49.6,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:120.4818,x:52.4,y:129.45,regY:8}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:82.7226,x:44.15,y:136.45,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.8285,x:9.2,y:95.5}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.8665,x:28.9,y:189.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.1033,x:-4.85,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.6842,x:-23.55,y:189.35,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-6.3219,y:-78.8,x:0.65,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-116.0876,x:-70.8,y:54.55}},{t:this.instance_2,p:{regY:-8.5,rotation:-99.4158,x:-36.4,y:127,regX:5.3}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-122.8516,x:-36.85,y:135.85,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.8283,x:-57,y:-23.1,regX:35.7,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.7577,x:-16.95,y:92.65}},{t:this.instance_14,p:{rotation:94.1729,y:-26.55,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:82.7493,x:40.5,y:49.6,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:121.1238,x:51.4,y:129.5,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:83.3544,x:42.95,y:136.45,regY:3.1}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.8394,x:9.25,y:95.5}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.8935,x:28.9,y:189.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0914,x:-4.85,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.6734,x:-23.45,y:189.35,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-5.9373,y:-78.8,x:0.6,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1.1,scaleX:0.9983,scaleY:0.9983,rotation:-117.3664,x:-70.6,y:54.6}},{t:this.instance_2,p:{regY:-8.6,rotation:-100.7028,x:-34.85,y:126.1,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-124.1488,x:-34.8,y:135.15,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-78.964,x:-56.85,y:-23.2,regX:35.8,regY:0.5}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.7498,x:-16.95,y:92.65}},{t:this.instance_14,p:{rotation:94.3608,y:-26.55,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:83.3888,x:40.3,y:49.55,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:121.766,x:50.2,y:129.7,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:83.9878,x:41.55,y:136.55,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.8494,x:9.3,y:95.5}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.9203,x:28.9,y:189.1}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0797,x:-4.8,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.6629,x:-23.4,y:189.35,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-5.5503,y:-78.8,x:0.55,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-118.6448,x:-70.5,y:54.7}},{t:this.instance_2,p:{regY:-8.6,rotation:-101.9916,x:-33,y:125.35,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-125.4471,x:-32.9,y:134.35,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.1005,x:-56.95,y:-23.2,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.742,x:-16.9,y:92.65}},{t:this.instance_14,p:{rotation:94.5471,y:-26.6,x:45.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:84.0285,x:40,y:49.55,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:122.4069,x:49.05,y:129.75,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:84.6207,x:40.3,y:136.55,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.8621,x:9.25,y:95.5}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-11.948,x:29,y:189}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0672,x:-4.8,y:-58.1,regX:-0.8}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.6502,x:-23.4,y:189.35,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-5.1661,y:-78.8,x:0.6,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-119.9247,x:-70.35,y:54.65}},{t:this.instance_2,p:{regY:-8.6,rotation:-103.2795,x:-31.25,y:124.5,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-126.7431,x:-30.95,y:133.5,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.2351,x:-56.95,y:-23.25,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.7341,x:-16.95,y:92.7}},{t:this.instance_14,p:{rotation:94.7351,y:-26.55,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:84.6674,x:39.75,y:49.55,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:123.0496,x:47.95,y:129.85,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:85.2536,x:39.15,y:136.5,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9977,scaleY:0.9977,rotation:-14.8732,x:9.3,y:95.5}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9979,scaleY:0.9979,rotation:-11.9765,x:28.95,y:189}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0547,x:-4.95,y:-58.15,regX:-0.9}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.6393,x:-23.4,y:189.35,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-4.7796,y:-78.85,x:0.6,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-121.2026,x:-70.2,y:54.75}},{t:this.instance_2,p:{regY:-8.6,rotation:-104.5668,x:-29.5,y:123.65,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-128.0405,x:-28.95,y:132.65,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.3715,x:-56.9,y:-23.25,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.7253,x:-16.95,y:92.7}},{t:this.instance_14,p:{rotation:94.9214,y:-26.55,x:45.15,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:85.3073,x:39.5,y:49.5,regY:-0.5,regX:-40.8}},{t:this.instance_12,p:{regX:-6.3,scaleX:0.9984,scaleY:0.9984,rotation:123.6898,x:46.9,y:129.85,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:85.8859,x:37.95,y:136.45,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.8838,x:9.3,y:95.5}},{t:this.instance_9,p:{regX:2.3,regY:-54,scaleX:0.9978,scaleY:0.9978,rotation:-12.0036,x:29,y:189.05}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0438,x:-4.95,y:-58.15,regX:-0.9}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.6266,x:-23.55,y:189.3,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.9,rotation:-4.3941,y:-78.85,x:0.55,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-122.4813,x:-70,y:54.8}},{t:this.instance_2,p:{regY:-8.6,rotation:-105.8546,x:-27.85,y:122.75,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-129.3374,x:-27.05,y:131.7,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.5077,x:-57,y:-23.25,regX:35.8,regY:0.4}}]},1).to({state:[{t:this.instance_15,p:{scaleX:0.9984,scaleY:0.9984,rotation:1.7175,x:-16.9,y:92.7}},{t:this.instance_14,p:{rotation:95.1086,y:-26.5,x:45.1,scaleX:0.9984,scaleY:0.9984}},{t:this.instance_13,p:{scaleX:0.9984,scaleY:0.9984,rotation:85.9466,x:39.25,y:49.35,regY:-0.5,regX:-40.9}},{t:this.instance_12,p:{regX:-6.2,scaleX:0.9984,scaleY:0.9984,rotation:124.3325,x:45.7,y:130.05,regY:7.9}},{t:this.instance_11,p:{scaleX:0.9984,scaleY:0.9984,rotation:86.5196,x:36.75,y:136.45,regY:3.2}},{t:this.instance_10,p:{regX:-1.2,scaleX:0.9978,scaleY:0.9978,rotation:-14.8946,x:9.3,y:95.5}},{t:this.instance_9,p:{regX:2.3,regY:-54.1,scaleX:0.9978,scaleY:0.9978,rotation:-12.0304,x:29.05,y:188.85}},{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:12.0305,x:-4.9,y:-58.15,regX:-0.9}},{t:this.instance_6,p:{regY:-54.5,scaleX:0.9982,scaleY:0.9982,rotation:16.6158,x:-23.5,y:189.3,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{regY:52.8,rotation:-4.008,y:-79,x:0.55,regX:1.1,scaleX:0.999,scaleY:0.999}},{t:this.instance_3,p:{regY:1,scaleX:0.9983,scaleY:0.9983,rotation:-123.7583,x:-69.75,y:54.85}},{t:this.instance_2,p:{regY:-8.5,rotation:-107.1414,x:-26,y:121.85,regX:5.4}},{t:this.instance_1,p:{scaleX:0.998,scaleY:0.998,rotation:-130.6332,x:-25.15,y:130.85,regY:-1.6}},{t:this.instance,p:{scaleX:0.9985,scaleY:0.9985,rotation:-79.6421,x:-56.95,y:-23.15,regX:35.8,regY:0.4}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-98.6,-223.9,185.5,525.5);


// stage content:
(lib.LessonChapter2_02 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,229];
	this.streamSoundSymbolsList[0] = [{id:"DuringWar202wav",startFrame:0,endFrame:230,loop:1,offset:584}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("DuringWar202wav",0,584);
		this.InsertIntoSoundStreamData(soundInstance,0,230,1,584);
	}
	this.frame_229 = function() {
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter2_03.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter2_01.html");
			}, 500);
			
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(229).call(this.frame_229).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_951();
	this.instance.setTransform(195.55,597,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_950();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(230));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn}]}).wait(230));

	// Interaction
	this.instance_2 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_2.setTransform(-32.2,450.2,0.1767,0.1767,-90.7176,0,0,35.1,1.3);

	this.instance_3 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_3.setTransform(-20.1,474.55,0.1766,0.1766,-148.1547,0,0,5.5,-1.8);

	this.instance_4 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_4.setTransform(-20.8,473.1,0.1766,0.1766,-124.7888,0,0,4.7,-8.2);

	this.instance_5 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_5.setTransform(-31.75,464.2,0.1765,0.1765,-141.5799,0,0,38.9,1.7);

	this.instance_6 = new lib.ch1_headcopy_1("synched",0);
	this.instance_6.setTransform(-22.05,440.35,0.1767,0.1767,-3.6038,0,0,1.9,54.2);

	this.instance_7 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_7.setTransform(-23.45,450.65,0.1769,0.1769,0,0,0,0,-22.9);

	this.instance_8 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_8.setTransform(-26.3,487.8,0.1766,0.1766,16.7765,0,0,4.1,-54.1);

	this.instance_9 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_9.setTransform(-22.95,444,0.1767,0.1767,12.0764,0,0,-0.1,9.2);

	this.instance_10 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_10.setTransform(-23.15,462.8,0.1769,0.1769,0,0,0,0.6,-22.4);

	this.instance_11 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_11.setTransform(-17,487.8,0.1765,0.1765,-11.5596,0,0,3.1,-53.5);

	this.instance_12 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_12.setTransform(-20.4,471.2,0.1765,0.1765,-14.6886,0,0,-0.5,2.8);

	this.instance_13 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_13.setTransform(-13.8,475.3,0.1766,0.1766,58.7246,0,0,-4.2,3.1);

	this.instance_14 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_14.setTransform(-12.95,473.55,0.1766,0.1766,96.3533,0,0,-5.5,7.2);

	this.instance_15 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_15.setTransform(-20.55,461.45,0.1766,0.1766,58.0487,0,0,-39.5,-0.9);

	this.instance_16 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_16.setTransform(-14.15,449.65,0.1766,0.1766,119.3003,0,0,-33.4,-1.1);

	this.instance_17 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_17.setTransform(-25.1,470.7,0.1766,0.1766,1.802,0,0,2.8,-45.7);

	this.instance_18 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_18.setTransform(319.35,488.65,0.1765,0.1765,-63.3641,0,0,35.6,0.8);

	this.instance_19 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_19.setTransform(313.5,516.45,0.1765,0.1765,-85.3627,0,0,6.2,-0.8);

	this.instance_20 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_20.setTransform(314.55,515.35,0.1764,0.1764,-53.0013,0,0,4.8,-7.9);

	this.instance_21 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_21.setTransform(313.1,501.1,0.1765,0.1765,-95.581,0,0,39.3,-0.1);

	this.instance_22 = new lib.ch1_headcopy("synched",0);
	this.instance_22.setTransform(329.5,478.65,0.1766,0.1766,-1.0346,0,0,1.3,52.7);

	this.instance_23 = new lib.ch1_uBodycopy("synched",0);
	this.instance_23.setTransform(328.15,489.15,0.1768,0.1768,0,0,0,0,-23.4);

	this.instance_24 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_24.setTransform(331.05,525.05,0.1764,0.1764,-17.6325,0,0,3.4,-53.6);

	this.instance_25 = new lib.ch1_neckcopy("synched",0);
	this.instance_25.setTransform(328.6,482.45,0.1766,0.1766,10.6905,0,0,-0.7,8.8);

	this.instance_26 = new lib.ch1_lBodycopy("synched",0);
	this.instance_26.setTransform(328.5,501.2,0.1768,0.1768,0,0,0,0.3,-22.9);

	this.instance_27 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_27.setTransform(331.25,526.7,0.1763,0.1763,30.7086,0,0,4.4,-53.1);

	this.instance_28 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_28.setTransform(330.9,509.75,0.1764,0.1764,-3.3577,0,0,0.1,2.3);

	this.instance_29 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_29.setTransform(341.7,516.8,0.1765,0.1765,90.2625,0,0,-4.2,2.3);

	this.instance_30 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_30.setTransform(342.9,515.2,0.1765,0.1765,109.9844,0,0,-5.9,7);

	this.instance_31 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_31.setTransform(340.1,501.25,0.1765,0.1765,78.6532,0,0,-39.9,-1.4);

	this.instance_32 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_32.setTransform(337.45,488.2,0.1765,0.1765,79.4896,0,0,-32.5,0);

	this.instance_33 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_33.setTransform(325.55,508.9,0.1764,0.1764,-21.1297,0,0,1.9,-45.8);

	this.instance_34 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_34.setTransform(294.55,474.3,0.1767,0.1767,-90.7176,0,0,35.1,3);

	this.instance_35 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_35.setTransform(306.6,498.65,0.1766,0.1766,-148.1547,0,0,5.3,-1.7);

	this.instance_36 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_36.setTransform(305.95,497.2,0.1766,0.1766,-124.7888,0,0,4.5,-8);

	this.instance_37 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_37.setTransform(295,488.3,0.1765,0.1765,-141.5799,0,0,38.2,2.2);

	this.instance_38 = new lib.ch1_headcopy_1("synched",0);
	this.instance_38.setTransform(304.7,464.45,0.1767,0.1767,-3.6038,0,0,3.9,56.1);

	this.instance_39 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_39.setTransform(303.3,474.75,0.1769,0.1769,0,0,0,0,-22.9);

	this.instance_40 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_40.setTransform(300.45,511.85,0.1766,0.1766,16.7765,0,0,6.2,-54);

	this.instance_41 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_41.setTransform(303.8,468.1,0.1767,0.1767,12.0764,0,0,0.1,10.1);

	this.instance_42 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_42.setTransform(303.6,486.9,0.1769,0.1769,0,0,0,1.7,-20.7);

	this.instance_43 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_43.setTransform(309.75,511.9,0.1765,0.1765,-11.5596,0,0,4,-53.2);

	this.instance_44 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_44.setTransform(306.35,495.3,0.1765,0.1765,-14.6886,0,0,1.4,3.3);

	this.instance_45 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_45.setTransform(312.95,499.45,0.1766,0.1766,58.7246,0,0,-3.1,1.4);

	this.instance_46 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_46.setTransform(313.8,497.65,0.1766,0.1766,96.3533,0,0,-5.5,6.9);

	this.instance_47 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_47.setTransform(306.2,485.55,0.1766,0.1766,58.0487,0,0,-37.7,-2.1);

	this.instance_48 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_48.setTransform(312.6,473.75,0.1766,0.1766,119.3003,0,0,-34.2,-2.6);

	this.instance_49 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_49.setTransform(301.65,494.8,0.1766,0.1766,1.802,0,0,2.8,-45.7);

	this.instance_50 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_50.setTransform(257.7,488.9,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_51 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_51.setTransform(257.3,516.9,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_52 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_52.setTransform(256.75,515.45,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_53 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_53.setTransform(252.35,501.75,0.1767,0.1767,-107.3785,0,0,40,0.1);

	this.instance_54 = new lib.ch1_headcopy2("synched",0);
	this.instance_54.setTransform(267.7,478.9,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_55 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_55.setTransform(266.5,489.35,0.177,0.177,0,0,0,0,-23.8);

	this.instance_56 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_56.setTransform(270.2,524.55,0.1766,0.1766,-11.9004,0,0,3,-53.8);

	this.instance_57 = new lib.ch1_neckcopy2("synched",0);
	this.instance_57.setTransform(267,482.65,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_58 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_58.setTransform(266.85,501.45,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_59 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_59.setTransform(267.4,526.2,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_60 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_60.setTransform(270.55,509.45,0.1765,0.1765,7.775,0,0,-0.3,2);

	this.instance_61 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_61.setTransform(285.45,514.55,0.1766,0.1766,34.1034,0,0,-4.4,2.6);

	this.instance_62 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_62.setTransform(285.05,512.5,0.1766,0.1766,58.397,0,0,-5.5,7.9);

	this.instance_63 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_63.setTransform(275.75,501.75,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_64 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_64.setTransform(275.85,488.35,0.1767,0.1767,91.2967,0,0,-32.5,-0.7);

	this.instance_65 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_65.setTransform(263.3,508.95,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_66 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_66.setTransform(288.7,442,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_67 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_67.setTransform(288.3,470,0.1766,0.1766,-110.4784,0,0,5.5,-1.6);

	this.instance_68 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_68.setTransform(287.7,468.55,0.1766,0.1766,-120.7456,0,0,3.6,-9.4);

	this.instance_69 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_69.setTransform(283.35,454.85,0.1767,0.1767,-107.3785,0,0,40,0.1);

	this.instance_70 = new lib.ch1_headcopy2("synched",0);
	this.instance_70.setTransform(298.7,432,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_71 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_71.setTransform(297.5,442.45,0.177,0.177,0,0,0,0,-22.1);

	this.instance_72 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_72.setTransform(301.2,477.65,0.1766,0.1766,-11.9004,0,0,2.6,-53.9);

	this.instance_73 = new lib.ch1_neckcopy2("synched",0);
	this.instance_73.setTransform(298,435.75,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_74 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_74.setTransform(297.85,454.55,0.177,0.177,0,0,0,0.3,-22.3);

	this.instance_75 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_75.setTransform(298.4,479.3,0.1765,0.1765,36.4478,0,0,4.8,-52.1);

	this.instance_76 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_76.setTransform(301.55,462.55,0.1765,0.1765,7.775,0,0,-0.1,3.8);

	this.instance_77 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_77.setTransform(316.45,467.65,0.1766,0.1766,34.1034,0,0,-3.6,4.2);

	this.instance_78 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_78.setTransform(316,465.6,0.1766,0.1766,58.397,0,0,-5.7,8.2);

	this.instance_79 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_79.setTransform(306.75,454.85,0.1766,0.1766,49.3031,0,0,-39,0.1);

	this.instance_80 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_80.setTransform(306.85,441.45,0.1767,0.1767,91.2967,0,0,-31.7,-0.4);

	this.instance_81 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_81.setTransform(294.3,462.05,0.1766,0.1766,-26.6492,0,0,1.7,-43.8);

	this.instance_82 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_82.setTransform(266.65,458.2,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_83 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_83.setTransform(278.25,482.8,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_84 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_84.setTransform(277.6,481.4,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_85 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_85.setTransform(266.7,472.2,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_86 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_86.setTransform(276.9,448.35,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_87 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_87.setTransform(275.5,458.65,0.177,0.177,0,0,0,0,-24);

	this.instance_88 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_88.setTransform(271,495.65,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_89 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_89.setTransform(275.9,452,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_90 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_90.setTransform(275.85,470.8,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_91 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_91.setTransform(283.15,495.4,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_92 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_92.setTransform(279.35,478.85,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_93 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_93.setTransform(280.35,486.95,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_94 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_94.setTransform(280.9,485,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_95 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_95.setTransform(282.6,470.95,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_96 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_96.setTransform(284.85,457.65,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_97 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_97.setTransform(273.25,478.5,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_98 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_98.setTransform(312.9,453.1,0.1765,0.1765,-63.3663,0,0,35.6,0.8);

	this.instance_99 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_99.setTransform(307.05,480.9,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_100 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_100.setTransform(308.1,479.85,0.1764,0.1764,-53.0022,0,0,4.5,-7.7);

	this.instance_101 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_101.setTransform(306.6,465.55,0.1765,0.1765,-95.577,0,0,39,-0.2);

	this.instance_102 = new lib.ch1_headcopy("synched",0);
	this.instance_102.setTransform(323.05,443.1,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_103 = new lib.ch1_uBodycopy("synched",0);
	this.instance_103.setTransform(321.7,453.6,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_104 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_104.setTransform(324.6,489.5,0.1764,0.1764,-17.6293,0,0,3.4,-53.6);

	this.instance_105 = new lib.ch1_neckcopy("synched",0);
	this.instance_105.setTransform(322.15,446.9,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_106 = new lib.ch1_lBodycopy("synched",0);
	this.instance_106.setTransform(322.05,465.65,0.1768,0.1768,0,0,0,0.3,-22.9);

	this.instance_107 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_107.setTransform(324.8,491.15,0.1763,0.1763,30.7069,0,0,4.4,-53.1);

	this.instance_108 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_108.setTransform(324.45,474.2,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_109 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_109.setTransform(335.25,481.25,0.1765,0.1765,90.2576,0,0,-4.2,2.3);

	this.instance_110 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_110.setTransform(336.45,479.65,0.1765,0.1765,109.9814,0,0,-5.9,7);

	this.instance_111 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_111.setTransform(333.65,465.7,0.1765,0.1765,78.657,0,0,-39.9,-1.4);

	this.instance_112 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_112.setTransform(331,452.65,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_113 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_113.setTransform(319.1,473.35,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_114 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_114.setTransform(369.4,490.25,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_115 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_115.setTransform(369,518.25,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_116 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_116.setTransform(368.45,516.8,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_117 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_117.setTransform(364,503.1,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_118 = new lib.ch1_headcopy2("synched",0);
	this.instance_118.setTransform(379.4,480.25,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_119 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_119.setTransform(378.2,490.7,0.177,0.177,0,0,0,0,-24);

	this.instance_120 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_120.setTransform(381.9,525.9,0.1766,0.1766,-11.9004,0,0,4.7,-53.7);

	this.instance_121 = new lib.ch1_neckcopy2("synched",0);
	this.instance_121.setTransform(378.7,484,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_122 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_122.setTransform(378.55,502.8,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_123 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_123.setTransform(379.1,527.55,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_124 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_124.setTransform(382.25,510.8,0.1765,0.1765,7.775,0,0,1.7,1.5);

	this.instance_125 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_125.setTransform(397.15,515.9,0.1766,0.1766,34.1034,0,0,-3,1.7);

	this.instance_126 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_126.setTransform(396.75,513.85,0.1766,0.1766,58.397,0,0,-4.9,6.3);

	this.instance_127 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_127.setTransform(387.45,503.1,0.1766,0.1766,49.3031,0,0,-39,-2.5);

	this.instance_128 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_128.setTransform(387.55,489.7,0.1767,0.1767,91.2967,0,0,-32.9,-2.4);

	this.instance_129 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_129.setTransform(375,510.3,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_130 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_130.setTransform(389.85,462.25,0.1765,0.1765,-63.3663,0,0,35.6,0.8);

	this.instance_131 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_131.setTransform(384,490.05,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_132 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_132.setTransform(385.05,488.95,0.1764,0.1764,-53.0022,0,0,4.8,-7.9);

	this.instance_133 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_133.setTransform(383.6,474.7,0.1765,0.1765,-95.577,0,0,39.3,-0.1);

	this.instance_134 = new lib.ch1_headcopy("synched",0);
	this.instance_134.setTransform(400,452.25,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_135 = new lib.ch1_uBodycopy("synched",0);
	this.instance_135.setTransform(398.65,462.75,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_136 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_136.setTransform(401.55,498.65,0.1764,0.1764,-17.6293,0,0,5,-53.1);

	this.instance_137 = new lib.ch1_neckcopy("synched",0);
	this.instance_137.setTransform(399.1,456.05,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_138 = new lib.ch1_lBodycopy("synched",0);
	this.instance_138.setTransform(399,474.8,0.1768,0.1768,0,0,0,0.3,-22.9);

	this.instance_139 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_139.setTransform(401.75,500.3,0.1763,0.1763,30.7069,0,0,4.4,-53.1);

	this.instance_140 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_140.setTransform(401.4,483.35,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_141 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_141.setTransform(412.2,490.4,0.1765,0.1765,90.2576,0,0,-4.2,1.4);

	this.instance_142 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_142.setTransform(413.4,488.75,0.1765,0.1765,109.9814,0,0,-6.5,5.4);

	this.instance_143 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_143.setTransform(410.6,474.85,0.1765,0.1765,78.657,0,0,-39.5,-3.3);

	this.instance_144 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_144.setTransform(407.95,461.8,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_145 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_145.setTransform(396.05,482.5,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_146 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_146.setTransform(96.65,486.85,0.1765,0.1765,-63.3663,0,0,35.4,1);

	this.instance_147 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_147.setTransform(90.8,514.65,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_148 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_148.setTransform(91.85,513.6,0.1764,0.1764,-53.0022,0,0,4.5,-7.7);

	this.instance_149 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_149.setTransform(90.35,499.3,0.1765,0.1765,-95.577,0,0,39,-0.2);

	this.instance_150 = new lib.ch1_headcopy("synched",0);
	this.instance_150.setTransform(106.8,476.85,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_151 = new lib.ch1_uBodycopy("synched",0);
	this.instance_151.setTransform(105.45,487.35,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_152 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_152.setTransform(108.35,523.25,0.1764,0.1764,-17.6293,0,0,4.1,-53.1);

	this.instance_153 = new lib.ch1_neckcopy("synched",0);
	this.instance_153.setTransform(105.9,480.65,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_154 = new lib.ch1_lBodycopy("synched",0);
	this.instance_154.setTransform(105.8,499.4,0.1768,0.1768,0,0,0,0.3,-22.7);

	this.instance_155 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_155.setTransform(108.55,524.9,0.1763,0.1763,30.7069,0,0,4.4,-53.1);

	this.instance_156 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_156.setTransform(108.2,507.95,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_157 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_157.setTransform(119,515,0.1765,0.1765,90.2576,0,0,-4.2,2.3);

	this.instance_158 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_158.setTransform(120.15,513.4,0.1765,0.1765,109.9814,0,0,-6.2,5.3);

	this.instance_159 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_159.setTransform(117.4,499.45,0.1765,0.1765,78.657,0,0,-39.6,-3);

	this.instance_160 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_160.setTransform(114.75,486.4,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_161 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_161.setTransform(102.85,507.1,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_162 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_162.setTransform(-2.3,490.3,0.1766,0.1766,-67.6958,0,0,34.8,-1.1);

	this.instance_163 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_163.setTransform(-2.65,518.3,0.1766,0.1766,-110.4755,0,0,6.9,-3.1);

	this.instance_164 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_164.setTransform(-3.2,516.8,0.1766,0.1766,-120.7464,0,0,6.1,-10.2);

	this.instance_165 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_165.setTransform(-7.6,503.15,0.1766,0.1766,-107.3768,0,0,40.9,-1.8);

	this.instance_166 = new lib.ch1_headcopy2("synched",0);
	this.instance_166.setTransform(7.75,480.3,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_167 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_167.setTransform(6.55,490.75,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_168 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_168.setTransform(10.25,525.95,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_169 = new lib.ch1_neckcopy2("synched",0);
	this.instance_169.setTransform(7.05,484.05,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_170 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_170.setTransform(6.9,502.85,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_171 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_171.setTransform(7.45,527.6,0.1764,0.1764,36.4467,0,0,3.8,-53.6);

	this.instance_172 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_172.setTransform(10.6,510.85,0.1765,0.1765,7.7707,0,0,-0.3,2);

	this.instance_173 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_173.setTransform(25.5,515.95,0.1766,0.1766,34.102,0,0,-4.4,2.6);

	this.instance_174 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_174.setTransform(25.05,513.9,0.1766,0.1766,58.3987,0,0,-5.7,8.2);

	this.instance_175 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_175.setTransform(15.8,503.15,0.1766,0.1766,49.3036,0,0,-40.2,-1);

	this.instance_176 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_176.setTransform(15.9,489.75,0.1767,0.1767,91.2918,0,0,-32.5,-0.7);

	this.instance_177 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_177.setTransform(3.35,510.35,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_178 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_178.setTransform(34.95,487.1,0.1766,0.1766,-67.6958,0,0,33.6,1.5);

	this.instance_179 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_179.setTransform(34.6,515.05,0.1766,0.1766,-110.4755,0,0,4.4,-2);

	this.instance_180 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_180.setTransform(34.05,513.65,0.1766,0.1766,-120.7464,0,0,3.4,-9.6);

	this.instance_181 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_181.setTransform(29.65,499.95,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_182 = new lib.ch1_headcopy2("synched",0);
	this.instance_182.setTransform(45,477.1,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_183 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_183.setTransform(43.8,487.55,0.1769,0.1769,0,0,0,0,-21.8);

	this.instance_184 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_184.setTransform(47.5,522.75,0.1765,0.1765,-11.8966,0,0,2.6,-51.9);

	this.instance_185 = new lib.ch1_neckcopy2("synched",0);
	this.instance_185.setTransform(44.3,480.85,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_186 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_186.setTransform(44.15,499.65,0.1769,0.1769,0,0,0,0.3,-21.2);

	this.instance_187 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_187.setTransform(44.7,524.35,0.1764,0.1764,36.4467,0,0,5,-52);

	this.instance_188 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_188.setTransform(47.85,507.65,0.1765,0.1765,7.7707,0,0,-0.1,4);

	this.instance_189 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_189.setTransform(62.8,512.75,0.1766,0.1766,34.102,0,0,-3.2,4.2);

	this.instance_190 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_190.setTransform(62.35,510.7,0.1766,0.1766,58.3987,0,0,-4.1,8.8);

	this.instance_191 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_191.setTransform(53.05,499.95,0.1766,0.1766,49.3036,0,0,-38.8,0.3);

	this.instance_192 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_192.setTransform(53.1,486.55,0.1767,0.1767,91.2918,0,0,-30.9,-0.7);

	this.instance_193 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_193.setTransform(40.6,507.1,0.1765,0.1765,-26.647,0,0,1.6,-43.6);

	this.instance_194 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_194.setTransform(119.25,478.55,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_195 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_195.setTransform(118.85,506.55,0.1766,0.1766,-110.4755,0,0,6.2,-1.3);

	this.instance_196 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_196.setTransform(118.3,505.1,0.1766,0.1766,-120.7464,0,0,5,-8.5);

	this.instance_197 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_197.setTransform(113.85,491.4,0.1766,0.1766,-107.3768,0,0,40.3,0.1);

	this.instance_198 = new lib.ch1_headcopy2("synched",0);
	this.instance_198.setTransform(129.25,468.55,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_199 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_199.setTransform(128.05,479,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_200 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_200.setTransform(131.75,514.2,0.1765,0.1765,-11.8966,0,0,3,-54.1);

	this.instance_201 = new lib.ch1_neckcopy2("synched",0);
	this.instance_201.setTransform(128.55,472.3,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_202 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_202.setTransform(128.4,491.1,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_203 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_203.setTransform(128.95,515.85,0.1764,0.1764,36.4467,0,0,3.8,-53.6);

	this.instance_204 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_204.setTransform(132.1,499.1,0.1765,0.1765,7.7707,0,0,-0.3,2);

	this.instance_205 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_205.setTransform(147,504.2,0.1766,0.1766,34.102,0,0,-4.4,2.6);

	this.instance_206 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_206.setTransform(146.6,502.15,0.1766,0.1766,58.3987,0,0,-5.8,7.8);

	this.instance_207 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_207.setTransform(137.3,491.4,0.1766,0.1766,49.3036,0,0,-40.2,-1);

	this.instance_208 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_208.setTransform(137.4,478,0.1767,0.1767,91.2918,0,0,-32.9,-0.7);

	this.instance_209 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_209.setTransform(124.85,498.6,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_210 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_210.setTransform(146.7,488.45,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_211 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_211.setTransform(146.3,516.45,0.1766,0.1766,-110.4755,0,0,6.2,-1.3);

	this.instance_212 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_212.setTransform(145.75,515,0.1766,0.1766,-120.7464,0,0,5,-8.5);

	this.instance_213 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_213.setTransform(141.3,501.3,0.1766,0.1766,-107.3768,0,0,40.3,0.1);

	this.instance_214 = new lib.ch1_headcopy2("synched",0);
	this.instance_214.setTransform(156.7,478.45,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_215 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_215.setTransform(155.5,488.9,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_216 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_216.setTransform(159.2,524.1,0.1765,0.1765,-11.8966,0,0,3,-54.1);

	this.instance_217 = new lib.ch1_neckcopy2("synched",0);
	this.instance_217.setTransform(156,482.2,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_218 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_218.setTransform(155.85,501,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_219 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_219.setTransform(156.4,525.75,0.1764,0.1764,36.4467,0,0,3.8,-53.6);

	this.instance_220 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_220.setTransform(159.55,509,0.1765,0.1765,7.7707,0,0,0.2,1.9);

	this.instance_221 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_221.setTransform(174.45,514.1,0.1766,0.1766,34.102,0,0,-4.4,2.6);

	this.instance_222 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_222.setTransform(174.05,512.05,0.1766,0.1766,58.3987,0,0,-5.8,7.8);

	this.instance_223 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_223.setTransform(164.75,501.3,0.1766,0.1766,49.3036,0,0,-39.9,-1.4);

	this.instance_224 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_224.setTransform(164.85,487.9,0.1767,0.1767,91.2918,0,0,-32.5,-0.7);

	this.instance_225 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_225.setTransform(152.3,508.5,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_226 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_226.setTransform(193.6,482.15,0.1765,0.1765,-63.3663,0,0,35.4,1);

	this.instance_227 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_227.setTransform(187.8,509.95,0.1764,0.1764,-85.3672,0,0,5.4,-0.7);

	this.instance_228 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_228.setTransform(188.8,508.9,0.1764,0.1764,-53.0022,0,0,3.1,-6.7);

	this.instance_229 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_229.setTransform(187.3,494.6,0.1765,0.1765,-95.577,0,0,37.3,-0.4);

	this.instance_230 = new lib.ch1_headcopy("synched",0);
	this.instance_230.setTransform(203.75,472.15,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_231 = new lib.ch1_uBodycopy("synched",0);
	this.instance_231.setTransform(202.4,482.65,0.1768,0.1768,0,0,0,0,-21.8);

	this.instance_232 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_232.setTransform(205.3,518.55,0.1764,0.1764,-17.6293,0,0,2.5,-51.9);

	this.instance_233 = new lib.ch1_neckcopy("synched",0);
	this.instance_233.setTransform(202.85,475.95,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_234 = new lib.ch1_lBodycopy("synched",0);
	this.instance_234.setTransform(202.75,494.7,0.1768,0.1768,0,0,0,0.3,-22.7);

	this.instance_235 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_235.setTransform(205.55,520.2,0.1763,0.1763,30.7069,0,0,5.5,-51.4);

	this.instance_236 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_236.setTransform(205.15,503.25,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_237 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_237.setTransform(215.95,510.3,0.1765,0.1765,90.2576,0,0,-3.4,2.3);

	this.instance_238 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_238.setTransform(217.15,508.7,0.1765,0.1765,109.9814,0,0,-4,6.3);

	this.instance_239 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_239.setTransform(214.35,494.75,0.1765,0.1765,78.657,0,0,-39.9,-1.4);

	this.instance_240 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_240.setTransform(211.7,481.7,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_241 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_241.setTransform(199.8,502.4,0.1764,0.1764,-21.1286,0,0,1.2,-44.2);

	this.instance_242 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_242.setTransform(220.45,492.1,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_243 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_243.setTransform(220.05,520.1,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_244 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_244.setTransform(219.5,518.65,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_245 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_245.setTransform(215.05,504.95,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_246 = new lib.ch1_headcopy2("synched",0);
	this.instance_246.setTransform(230.45,482.1,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_247 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_247.setTransform(229.25,492.55,0.177,0.177,0,0,0,0,-24);

	this.instance_248 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_248.setTransform(232.95,527.75,0.1766,0.1766,-11.9004,0,0,2.7,-54.1);

	this.instance_249 = new lib.ch1_neckcopy2("synched",0);
	this.instance_249.setTransform(229.75,485.85,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_250 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_250.setTransform(229.6,504.65,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_251 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_251.setTransform(230.15,529.4,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_252 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_252.setTransform(233.3,512.65,0.1765,0.1765,7.775,0,0,-0.4,1.8);

	this.instance_253 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_253.setTransform(248.2,517.75,0.1766,0.1766,34.1034,0,0,-4.6,2.8);

	this.instance_254 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_254.setTransform(247.8,515.7,0.1766,0.1766,58.397,0,0,-5.9,8);

	this.instance_255 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_255.setTransform(238.5,504.95,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_256 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_256.setTransform(238.6,491.55,0.1767,0.1767,91.2967,0,0,-32.9,-0.4);

	this.instance_257 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_257.setTransform(226.05,512.15,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_258 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_258.setTransform(341.95,480.35,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_259 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_259.setTransform(341.55,508.35,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_260 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_260.setTransform(341,506.9,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_261 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_261.setTransform(336.55,493.2,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_262 = new lib.ch1_headcopy2("synched",0);
	this.instance_262.setTransform(351.95,470.35,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_263 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_263.setTransform(350.75,480.8,0.177,0.177,0,0,0,0,-24);

	this.instance_264 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_264.setTransform(354.45,516,0.1766,0.1766,-11.9004,0,0,3.9,-53.9);

	this.instance_265 = new lib.ch1_neckcopy2("synched",0);
	this.instance_265.setTransform(351.25,474.1,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_266 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_266.setTransform(351.1,492.9,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_267 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_267.setTransform(351.65,517.65,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_268 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_268.setTransform(354.8,500.9,0.1765,0.1765,7.775,0,0,-0.4,1.8);

	this.instance_269 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_269.setTransform(369.7,506,0.1766,0.1766,34.1034,0,0,-3,1.7);

	this.instance_270 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_270.setTransform(369.3,503.95,0.1766,0.1766,58.397,0,0,-6,7.6);

	this.instance_271 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_271.setTransform(360,493.2,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_272 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_272.setTransform(360.1,479.8,0.1767,0.1767,91.2967,0,0,-32.9,-1.5);

	this.instance_273 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_273.setTransform(347.55,500.4,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_274 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_274.setTransform(354.75,461.6,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_275 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_275.setTransform(348.95,489.4,0.1764,0.1764,-85.3717,0,0,5.4,-0.7);

	this.instance_276 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_276.setTransform(349.95,488.35,0.1764,0.1764,-53.0042,0,0,4.5,-7.7);

	this.instance_277 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_277.setTransform(348.45,474.05,0.1765,0.1765,-95.5726,0,0,39,-0.2);

	this.instance_278 = new lib.ch1_headcopy("synched",0);
	this.instance_278.setTransform(364.9,451.6,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_279 = new lib.ch1_uBodycopy("synched",0);
	this.instance_279.setTransform(363.55,462.1,0.1767,0.1767,0,0,0,0,-22.7);

	this.instance_280 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_280.setTransform(366.45,498,0.1764,0.1764,-17.6276,0,0,3,-53.5);

	this.instance_281 = new lib.ch1_neckcopy("synched",0);
	this.instance_281.setTransform(364,455.4,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_282 = new lib.ch1_lBodycopy("synched",0);
	this.instance_282.setTransform(363.9,474.15,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_283 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_283.setTransform(366.65,499.65,0.1763,0.1763,30.7052,0,0,4.9,-52.4);

	this.instance_284 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_284.setTransform(366.3,482.7,0.1763,0.1763,-3.3484,0,0,0.1,2.3);

	this.instance_285 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_285.setTransform(377.1,489.75,0.1765,0.1765,90.2527,0,0,-3.4,2.3);

	this.instance_286 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_286.setTransform(378.3,488.15,0.1764,0.1764,109.9801,0,0,-5.7,6.9);

	this.instance_287 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_287.setTransform(375.5,474.2,0.1765,0.1765,78.6599,0,0,-39.9,-1.4);

	this.instance_288 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_288.setTransform(372.85,461.15,0.1764,0.1764,79.4966,0,0,-32.5,0);

	this.instance_289 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_289.setTransform(360.95,481.85,0.1764,0.1764,-21.1258,0,0,1.6,-45);

	this.instance_290 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_290.setTransform(369.95,437.85,0.1767,0.1767,-90.7176,0,0,35.1,1.3);

	this.instance_291 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_291.setTransform(382,462.2,0.1766,0.1766,-148.1547,0,0,5.3,-1.7);

	this.instance_292 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_292.setTransform(381.35,460.75,0.1766,0.1766,-124.7888,0,0,4.5,-8);

	this.instance_293 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_293.setTransform(370.4,451.85,0.1765,0.1765,-141.5799,0,0,38.9,1.7);

	this.instance_294 = new lib.ch1_headcopy_1("synched",0);
	this.instance_294.setTransform(380.1,428,0.1767,0.1767,-3.6038,0,0,2,54);

	this.instance_295 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_295.setTransform(378.7,438.3,0.1769,0.1769,0,0,0,0,-23.2);

	this.instance_296 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_296.setTransform(375.85,475.45,0.1766,0.1766,16.7765,0,0,4.4,-54.2);

	this.instance_297 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_297.setTransform(379.2,431.65,0.1767,0.1767,12.0764,0,0,-0.1,9.2);

	this.instance_298 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_298.setTransform(379,450.45,0.1769,0.1769,0,0,0,0.8,-22.6);

	this.instance_299 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_299.setTransform(385.15,475.45,0.1765,0.1765,-11.5596,0,0,3.1,-53.5);

	this.instance_300 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_300.setTransform(381.75,458.85,0.1765,0.1765,-14.6886,0,0,-0.5,2.8);

	this.instance_301 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_301.setTransform(388.35,462.95,0.1766,0.1766,58.7246,0,0,-4.2,3.1);

	this.instance_302 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_302.setTransform(389.2,461.2,0.1766,0.1766,96.3533,0,0,-5.5,7.2);

	this.instance_303 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_303.setTransform(381.6,449.1,0.1766,0.1766,58.0487,0,0,-39.6,-1.3);

	this.instance_304 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_304.setTransform(388,437.3,0.1766,0.1766,119.3003,0,0,-33.4,-1.1);

	this.instance_305 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_305.setTransform(377.05,458.35,0.1766,0.1766,1.802,0,0,2.8,-45.7);

	this.instance_306 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_306.setTransform(335.55,434.4,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_307 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_307.setTransform(335.15,462.4,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_308 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_308.setTransform(334.6,460.95,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_309 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_309.setTransform(330.15,447.25,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_310 = new lib.ch1_headcopy2("synched",0);
	this.instance_310.setTransform(345.55,424.4,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_311 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_311.setTransform(344.35,434.85,0.177,0.177,0,0,0,0,-24);

	this.instance_312 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_312.setTransform(348.05,470.05,0.1766,0.1766,-11.9004,0,0,3,-54.1);

	this.instance_313 = new lib.ch1_neckcopy2("synched",0);
	this.instance_313.setTransform(344.85,428.15,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_314 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_314.setTransform(344.7,446.95,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_315 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_315.setTransform(345.25,471.7,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_316 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_316.setTransform(348.4,454.95,0.1765,0.1765,7.775,0,0,-0.4,1.8);

	this.instance_317 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_317.setTransform(363.3,460.05,0.1766,0.1766,34.1034,0,0,-4.4,2.6);

	this.instance_318 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_318.setTransform(362.9,458,0.1766,0.1766,58.397,0,0,-6.2,7.9);

	this.instance_319 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_319.setTransform(353.6,447.25,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_320 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_320.setTransform(353.7,433.85,0.1767,0.1767,91.2967,0,0,-33.1,-0.7);

	this.instance_321 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_321.setTransform(341.15,454.45,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_322 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_322.setTransform(353.65,417.2,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_323 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_323.setTransform(365.25,441.8,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_324 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_324.setTransform(364.6,440.4,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_325 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_325.setTransform(353.7,431.2,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_326 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_326.setTransform(363.9,407.35,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_327 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_327.setTransform(362.5,417.65,0.177,0.177,0,0,0,0,-24);

	this.instance_328 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_328.setTransform(358,454.65,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_329 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_329.setTransform(362.9,411,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_330 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_330.setTransform(362.85,429.8,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_331 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_331.setTransform(370.15,454.4,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_332 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_332.setTransform(366.35,437.85,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_333 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_333.setTransform(367.35,445.95,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_334 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_334.setTransform(367.9,444,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_335 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_335.setTransform(369.6,429.95,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_336 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_336.setTransform(371.85,416.65,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_337 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_337.setTransform(360.25,437.5,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_338 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_338.setTransform(71.85,472.45,0.1767,0.1767,-90.7176,0,0,35.1,3.2);

	this.instance_339 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_339.setTransform(83.95,496.8,0.1766,0.1766,-148.1547,0,0,3.9,-0.8);

	this.instance_340 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_340.setTransform(83.3,495.35,0.1766,0.1766,-124.7888,0,0,3.5,-6.5);

	this.instance_341 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_341.setTransform(72.35,486.45,0.1765,0.1765,-141.5799,0,0,37.4,2.9);

	this.instance_342 = new lib.ch1_headcopy_1("synched",0);
	this.instance_342.setTransform(82.05,462.6,0.1767,0.1767,-3.6038,0,0,4,54.4);

	this.instance_343 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_343.setTransform(80.65,472.9,0.1769,0.1769,0,0,0,2,-22.9);

	this.instance_344 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_344.setTransform(77.8,510.05,0.1766,0.1766,16.7765,0,0,6,-54.8);

	this.instance_345 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_345.setTransform(81.15,466.2,0.1767,0.1767,12.0764,0,0,1.9,8.8);

	this.instance_346 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_346.setTransform(80.95,485.05,0.1769,0.1769,0,0,0,2.6,-22.4);

	this.instance_347 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_347.setTransform(87.05,510,0.1765,0.1765,-11.5596,0,0,5,-53.1);

	this.instance_348 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_348.setTransform(83.7,493.45,0.1765,0.1765,-14.6886,0,0,1.4,3.3);

	this.instance_349 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_349.setTransform(90.3,497.6,0.1766,0.1766,58.7246,0,0,-3.1,1.4);

	this.instance_350 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_350.setTransform(91.15,495.8,0.1766,0.1766,96.3533,0,0,-5.7,5.2);

	this.instance_351 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_351.setTransform(83.55,483.7,0.1766,0.1766,58.0487,0,0,-38.4,-2.6);

	this.instance_352 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_352.setTransform(89.95,471.9,0.1766,0.1766,119.3003,0,0,-34.4,-2.8);

	this.instance_353 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_353.setTransform(79,492.95,0.1766,0.1766,1.802,0,0,4.8,-45.8);

	this.instance_354 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_354.setTransform(-8.55,458.35,0.1766,0.1766,-67.6958,0,0,34.8,-1.1);

	this.instance_355 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_355.setTransform(-8.9,486.35,0.1766,0.1766,-110.4755,0,0,6.9,-3.1);

	this.instance_356 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_356.setTransform(-9.45,484.85,0.1766,0.1766,-120.7464,0,0,6.1,-10.2);

	this.instance_357 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_357.setTransform(-13.85,471.2,0.1766,0.1766,-107.3768,0,0,40.9,-1.8);

	this.instance_358 = new lib.ch1_headcopy2("synched",0);
	this.instance_358.setTransform(1.5,448.35,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_359 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_359.setTransform(0.3,458.8,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_360 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_360.setTransform(4,494,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_361 = new lib.ch1_neckcopy2("synched",0);
	this.instance_361.setTransform(0.8,452.1,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_362 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_362.setTransform(0.65,470.9,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_363 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_363.setTransform(1.2,495.65,0.1764,0.1764,36.4467,0,0,2.2,-52.4);

	this.instance_364 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_364.setTransform(4.35,478.9,0.1765,0.1765,7.7707,0,0,0.2,1.9);

	this.instance_365 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_365.setTransform(19.25,484,0.1766,0.1766,34.102,0,0,-4.4,2.6);

	this.instance_366 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_366.setTransform(18.85,481.95,0.1766,0.1766,58.3987,0,0,-5.8,7.8);

	this.instance_367 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_367.setTransform(9.55,471.2,0.1766,0.1766,49.3036,0,0,-39.9,-1.4);

	this.instance_368 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_368.setTransform(9.65,457.8,0.1767,0.1767,91.2918,0,0,-32.5,-0.7);

	this.instance_369 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_369.setTransform(-2.9,478.4,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_370 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_370.setTransform(-13.55,431.05,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_371 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_371.setTransform(-19.4,458.85,0.1764,0.1764,-85.3717,0,0,6.2,-0.8);

	this.instance_372 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_372.setTransform(-18.35,457.8,0.1764,0.1764,-53.0042,0,0,3.1,-6.7);

	this.instance_373 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_373.setTransform(-19.85,443.5,0.1765,0.1765,-95.5726,0,0,37.4,-0.4);

	this.instance_374 = new lib.ch1_headcopy("synched",0);
	this.instance_374.setTransform(-3.4,421.05,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_375 = new lib.ch1_uBodycopy("synched",0);
	this.instance_375.setTransform(-4.75,431.55,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_376 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_376.setTransform(-1.85,467.45,0.1764,0.1764,-17.6276,0,0,5.2,-52.8);

	this.instance_377 = new lib.ch1_neckcopy("synched",0);
	this.instance_377.setTransform(-4.3,424.85,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_378 = new lib.ch1_lBodycopy("synched",0);
	this.instance_378.setTransform(-4.4,443.6,0.1767,0.1767,0,0,0,0,-22.7);

	this.instance_379 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_379.setTransform(-1.65,469.1,0.1763,0.1763,30.7052,0,0,4.9,-52.4);

	this.instance_380 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_380.setTransform(-2,452.15,0.1763,0.1763,-3.3484,0,0,0.1,2.3);

	this.instance_381 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_381.setTransform(8.8,459.2,0.1765,0.1765,90.2527,0,0,-4.2,0.3);

	this.instance_382 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_382.setTransform(10,457.6,0.1764,0.1764,109.9801,0,0,-6.3,5);

	this.instance_383 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_383.setTransform(7.2,443.65,0.1765,0.1765,78.6599,0,0,-39.5,-3.3);

	this.instance_384 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_384.setTransform(4.55,430.6,0.1764,0.1764,79.4966,0,0,-32.2,-1.9);

	this.instance_385 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_385.setTransform(-7.35,451.3,0.1764,0.1764,-21.1258,0,0,1.9,-45.8);

	this.instance_386 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_386.setTransform(15,466.95,0.1764,0.1764,-63.3662,0,0,33.9,1.8);

	this.instance_387 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_387.setTransform(9.1,494.75,0.1764,0.1764,-85.3717,0,0,4.2,-0.7);

	this.instance_388 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_388.setTransform(10.15,493.7,0.1764,0.1764,-53.0042,0,0,3,-6.5);

	this.instance_389 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_389.setTransform(8.65,479.4,0.1765,0.1765,-95.5726,0,0,37.1,-0.4);

	this.instance_390 = new lib.ch1_headcopy("synched",0);
	this.instance_390.setTransform(25.1,456.95,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_391 = new lib.ch1_uBodycopy("synched",0);
	this.instance_391.setTransform(23.75,467.45,0.1767,0.1767,0,0,0,0,-21.5);

	this.instance_392 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_392.setTransform(26.65,503.35,0.1764,0.1764,-17.6276,0,0,2.7,-51.5);

	this.instance_393 = new lib.ch1_neckcopy("synched",0);
	this.instance_393.setTransform(24.2,460.75,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_394 = new lib.ch1_lBodycopy("synched",0);
	this.instance_394.setTransform(24.1,479.5,0.1767,0.1767,0,0,0,0.3,-20.9);

	this.instance_395 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_395.setTransform(26.9,505,0.1763,0.1763,30.7052,0,0,5.5,-51.4);

	this.instance_396 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_396.setTransform(26.5,488.05,0.1763,0.1763,-3.3484,0,0,0.1,2.3);

	this.instance_397 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_397.setTransform(37.3,495.1,0.1765,0.1765,90.2527,0,0,-2.2,2.3);

	this.instance_398 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_398.setTransform(38.5,493.5,0.1764,0.1764,109.9801,0,0,-3.8,6.2);

	this.instance_399 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_399.setTransform(35.7,479.55,0.1765,0.1765,78.6599,0,0,-39.9,-1.4);

	this.instance_400 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_400.setTransform(33.05,466.5,0.1764,0.1764,79.4966,0,0,-32.5,0);

	this.instance_401 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_401.setTransform(21.15,487.2,0.1764,0.1764,-21.1258,0,0,1.2,-43.9);

	this.instance_402 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_402.setTransform(90.2,451.3,0.1764,0.1764,-63.3662,0,0,34.6,1.4);

	this.instance_403 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_403.setTransform(84.35,479.1,0.1764,0.1764,-85.3717,0,0,4.5,-0.7);

	this.instance_404 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_404.setTransform(85.4,478.05,0.1764,0.1764,-53.0042,0,0,3,-6.5);

	this.instance_405 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_405.setTransform(83.9,463.75,0.1765,0.1765,-95.5726,0,0,37.1,-0.4);

	this.instance_406 = new lib.ch1_headcopy("synched",0);
	this.instance_406.setTransform(100.35,441.3,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_407 = new lib.ch1_uBodycopy("synched",0);
	this.instance_407.setTransform(99,451.8,0.1767,0.1767,0,0,0,0,-21.5);

	this.instance_408 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_408.setTransform(101.9,487.7,0.1764,0.1764,-17.6276,0,0,4.4,-51.2);

	this.instance_409 = new lib.ch1_neckcopy("synched",0);
	this.instance_409.setTransform(99.45,445.1,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_410 = new lib.ch1_lBodycopy("synched",0);
	this.instance_410.setTransform(99.35,463.85,0.1767,0.1767,0,0,0,0.3,-21.8);

	this.instance_411 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_411.setTransform(102.15,489.35,0.1763,0.1763,30.7052,0,0,5.5,-51.4);

	this.instance_412 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_412.setTransform(101.8,472.4,0.1763,0.1763,-3.3484,0,0,1,2.4);

	this.instance_413 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_413.setTransform(112.55,479.45,0.1765,0.1765,90.2527,0,0,-2.6,1.4);

	this.instance_414 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_414.setTransform(113.75,477.85,0.1764,0.1764,109.9801,0,0,-4.7,4.5);

	this.instance_415 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_415.setTransform(110.95,463.9,0.1765,0.1765,78.6599,0,0,-39.5,-3.3);

	this.instance_416 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_416.setTransform(108.3,450.85,0.1764,0.1764,79.4966,0,0,-32.5,0);

	this.instance_417 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_417.setTransform(96.4,471.55,0.1764,0.1764,-21.1258,0,0,1.2,-43.9);

	this.instance_418 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_418.setTransform(44,456.35,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_419 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_419.setTransform(55.6,480.95,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_420 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_420.setTransform(54.95,479.55,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_421 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_421.setTransform(44.05,470.35,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_422 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_422.setTransform(54.25,446.5,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_423 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_423.setTransform(52.85,456.8,0.177,0.177,0,0,0,0,-24);

	this.instance_424 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_424.setTransform(48.35,493.8,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_425 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_425.setTransform(53.25,450.15,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_426 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_426.setTransform(53.2,468.95,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_427 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_427.setTransform(60.5,493.55,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_428 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_428.setTransform(56.7,477,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_429 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_429.setTransform(57.7,485.1,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_430 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_430.setTransform(58.25,483.15,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_431 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_431.setTransform(59.95,469.1,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_432 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_432.setTransform(62.2,455.8,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_433 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_433.setTransform(50.6,476.65,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_434 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_434.setTransform(66.1,440.1,0.1766,0.1766,-67.6966,0,0,35.5,0.8);

	this.instance_435 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_435.setTransform(65.7,468.1,0.1765,0.1765,-110.4743,0,0,6.2,-1.3);

	this.instance_436 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_436.setTransform(65.15,466.65,0.1766,0.1766,-120.7447,0,0,5,-8.5);

	this.instance_437 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_437.setTransform(60.7,452.95,0.1766,0.1766,-107.3735,0,0,40.3,0.1);

	this.instance_438 = new lib.ch1_headcopy2("synched",0);
	this.instance_438.setTransform(76.1,430.1,0.1767,0.1767,-1.9792,0,0,1,52.7);

	this.instance_439 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_439.setTransform(74.9,440.55,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_440 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_440.setTransform(78.6,475.75,0.1765,0.1765,-11.8938,0,0,3,-54.1);

	this.instance_441 = new lib.ch1_neckcopy2("synched",0);
	this.instance_441.setTransform(75.4,433.85,0.1767,0.1767,10.161,0,0,-0.1,9);

	this.instance_442 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_442.setTransform(75.25,452.65,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_443 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_443.setTransform(75.8,477.4,0.1764,0.1764,36.4446,0,0,3.8,-53.6);

	this.instance_444 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_444.setTransform(78.95,460.65,0.1765,0.1765,7.7672,0,0,-0.3,2);

	this.instance_445 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_445.setTransform(93.85,465.75,0.1766,0.1766,34.1007,0,0,-4.4,2.6);

	this.instance_446 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_446.setTransform(93.45,463.7,0.1766,0.1766,58.4003,0,0,-5.8,7.8);

	this.instance_447 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_447.setTransform(84.15,452.95,0.1765,0.1765,49.3047,0,0,-40.2,-1);

	this.instance_448 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_448.setTransform(84.25,439.55,0.1766,0.1766,91.287,0,0,-32.9,-0.7);

	this.instance_449 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_449.setTransform(71.7,460.15,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_450 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_450.setTransform(77.2,409.85,0.1766,0.1766,-67.6966,0,0,35.5,0.8);

	this.instance_451 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_451.setTransform(76.8,437.85,0.1765,0.1765,-110.4743,0,0,6.2,-1.3);

	this.instance_452 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_452.setTransform(76.25,436.4,0.1766,0.1766,-120.7447,0,0,5,-8.5);

	this.instance_453 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_453.setTransform(71.8,422.7,0.1766,0.1766,-107.3735,0,0,40.3,0.1);

	this.instance_454 = new lib.ch1_headcopy2("synched",0);
	this.instance_454.setTransform(87.2,399.85,0.1767,0.1767,-1.9792,0,0,1,52.7);

	this.instance_455 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_455.setTransform(86,410.3,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_456 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_456.setTransform(89.7,445.5,0.1765,0.1765,-11.8938,0,0,3,-54.1);

	this.instance_457 = new lib.ch1_neckcopy2("synched",0);
	this.instance_457.setTransform(86.5,403.6,0.1767,0.1767,10.161,0,0,-0.1,9);

	this.instance_458 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_458.setTransform(86.35,422.4,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_459 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_459.setTransform(86.9,447.15,0.1764,0.1764,36.4446,0,0,3.8,-53.6);

	this.instance_460 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_460.setTransform(90.05,430.4,0.1765,0.1765,7.7672,0,0,-0.3,2);

	this.instance_461 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_461.setTransform(104.95,435.5,0.1766,0.1766,34.1007,0,0,-4.4,2.6);

	this.instance_462 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_462.setTransform(104.55,433.45,0.1766,0.1766,58.4003,0,0,-5.8,7.8);

	this.instance_463 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_463.setTransform(95.25,422.7,0.1765,0.1765,49.3047,0,0,-40.2,-1);

	this.instance_464 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_464.setTransform(95.35,409.3,0.1766,0.1766,91.287,0,0,-32.9,-0.7);

	this.instance_465 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_465.setTransform(82.8,429.9,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_466 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_466.setTransform(167.15,460.45,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_467 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_467.setTransform(161.3,488.25,0.1764,0.1764,-85.3717,0,0,6.2,-0.8);

	this.instance_468 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_468.setTransform(162.35,487.2,0.1764,0.1764,-53.0042,0,0,4.5,-7.7);

	this.instance_469 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_469.setTransform(160.85,472.9,0.1765,0.1765,-95.5726,0,0,39,-0.2);

	this.instance_470 = new lib.ch1_headcopy("synched",0);
	this.instance_470.setTransform(177.3,450.45,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_471 = new lib.ch1_uBodycopy("synched",0);
	this.instance_471.setTransform(175.95,460.95,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_472 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_472.setTransform(178.85,496.85,0.1764,0.1764,-17.6276,0,0,3.3,-53.4);

	this.instance_473 = new lib.ch1_neckcopy("synched",0);
	this.instance_473.setTransform(176.4,454.25,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_474 = new lib.ch1_lBodycopy("synched",0);
	this.instance_474.setTransform(176.3,473,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_475 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_475.setTransform(179.05,498.5,0.1763,0.1763,30.7052,0,0,4.4,-53.1);

	this.instance_476 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_476.setTransform(178.7,481.55,0.1763,0.1763,-3.3484,0,0,0.1,2.3);

	this.instance_477 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_477.setTransform(189.5,488.6,0.1765,0.1765,90.2527,0,0,-4.2,2);

	this.instance_478 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_478.setTransform(190.7,487,0.1764,0.1764,109.9801,0,0,-5.7,6.9);

	this.instance_479 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_479.setTransform(187.9,473.05,0.1765,0.1765,78.6599,0,0,-39.9,-1.7);

	this.instance_480 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_480.setTransform(185.25,460,0.1764,0.1764,79.4966,0,0,-32.5,0);

	this.instance_481 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_481.setTransform(173.35,480.7,0.1764,0.1764,-21.1258,0,0,1.9,-45.8);

	this.instance_482 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_482.setTransform(21.85,440.2,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_483 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_483.setTransform(21.45,468.2,0.1766,0.1766,-110.4755,0,0,6,-1.4);

	this.instance_484 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_484.setTransform(20.9,466.75,0.1766,0.1766,-120.7464,0,0,4.8,-8.7);

	this.instance_485 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_485.setTransform(16.5,453.05,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_486 = new lib.ch1_headcopy2("synched",0);
	this.instance_486.setTransform(31.85,430.2,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_487 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_487.setTransform(30.65,440.65,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_488 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_488.setTransform(34.35,475.85,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_489 = new lib.ch1_neckcopy2("synched",0);
	this.instance_489.setTransform(31.15,433.95,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_490 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_490.setTransform(31,452.75,0.1769,0.1769,0,0,0,0.3,-22.9);

	this.instance_491 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_491.setTransform(31.55,477.5,0.1764,0.1764,36.4467,0,0,4,-53.3);

	this.instance_492 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_492.setTransform(34.7,460.75,0.1765,0.1765,7.7707,0,0,-0.3,2);

	this.instance_493 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_493.setTransform(49.6,465.85,0.1766,0.1766,34.102,0,0,-4.2,2.9);

	this.instance_494 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_494.setTransform(49.2,463.8,0.1766,0.1766,58.3987,0,0,-5.8,7.8);

	this.instance_495 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_495.setTransform(39.9,453.05,0.1766,0.1766,49.3036,0,0,-40,-0.8);

	this.instance_496 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_496.setTransform(40,439.65,0.1767,0.1767,91.2918,0,0,-32.9,-0.7);

	this.instance_497 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_497.setTransform(27.45,460.25,0.1765,0.1765,-26.647,0,0,2.2,-44.9);

	this.instance_498 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_498.setTransform(7.95,419.9,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_499 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_499.setTransform(19.55,444.5,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_500 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_500.setTransform(18.9,443.1,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_501 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_501.setTransform(8,433.9,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_502 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_502.setTransform(18.2,410.05,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_503 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_503.setTransform(16.8,420.35,0.177,0.177,0,0,0,0,-24);

	this.instance_504 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_504.setTransform(12.3,457.35,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_505 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_505.setTransform(17.2,413.7,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_506 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_506.setTransform(17.15,432.5,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_507 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_507.setTransform(24.45,457.1,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_508 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_508.setTransform(20.65,440.55,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_509 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_509.setTransform(21.65,448.65,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_510 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_510.setTransform(22.2,446.7,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_511 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_511.setTransform(23.9,432.65,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_512 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_512.setTransform(26.15,419.35,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_513 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_513.setTransform(14.55,440.2,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_514 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_514.setTransform(-14.4,395.15,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_515 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_515.setTransform(-14.8,423.15,0.1766,0.1766,-110.4755,0,0,6.2,-1.3);

	this.instance_516 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_516.setTransform(-15.35,421.7,0.1766,0.1766,-120.7464,0,0,5.2,-8.8);

	this.instance_517 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_517.setTransform(-19.8,408,0.1766,0.1766,-107.3768,0,0,40.3,0.1);

	this.instance_518 = new lib.ch1_headcopy2("synched",0);
	this.instance_518.setTransform(-4.4,385.15,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_519 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_519.setTransform(-5.6,395.6,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_520 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_520.setTransform(-1.9,430.8,0.1765,0.1765,-11.8966,0,0,3,-54.1);

	this.instance_521 = new lib.ch1_neckcopy2("synched",0);
	this.instance_521.setTransform(-5.1,388.9,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_522 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_522.setTransform(-5.25,407.7,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_523 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_523.setTransform(-4.7,432.45,0.1764,0.1764,36.4467,0,0,3.8,-53.6);

	this.instance_524 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_524.setTransform(-1.55,415.7,0.1765,0.1765,7.7707,0,0,0,2);

	this.instance_525 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_525.setTransform(13.35,420.75,0.1766,0.1766,34.102,0,0,-2.8,1.5);

	this.instance_526 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_526.setTransform(12.95,418.75,0.1766,0.1766,58.3987,0,0,-4.8,6);

	this.instance_527 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_527.setTransform(3.65,408,0.1766,0.1766,49.3036,0,0,-38.8,-2.7);

	this.instance_528 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_528.setTransform(3.75,394.6,0.1767,0.1767,91.2918,0,0,-32.9,-2.6);

	this.instance_529 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_529.setTransform(-8.8,415.2,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_530 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_530.setTransform(132.15,459.65,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_531 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_531.setTransform(126.3,487.45,0.1764,0.1764,-85.3717,0,0,5.9,-0.8);

	this.instance_532 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_532.setTransform(127.35,486.4,0.1764,0.1764,-53.0042,0,0,4.5,-7.7);

	this.instance_533 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_533.setTransform(125.85,472.1,0.1765,0.1765,-95.5726,0,0,39,-0.2);

	this.instance_534 = new lib.ch1_headcopy("synched",0);
	this.instance_534.setTransform(142.3,449.65,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_535 = new lib.ch1_uBodycopy("synched",0);
	this.instance_535.setTransform(140.95,460.15,0.1767,0.1767,0,0,0,0,-23.2);

	this.instance_536 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_536.setTransform(143.85,496.05,0.1764,0.1764,-17.6276,0,0,3,-53.5);

	this.instance_537 = new lib.ch1_neckcopy("synched",0);
	this.instance_537.setTransform(141.4,453.45,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_538 = new lib.ch1_lBodycopy("synched",0);
	this.instance_538.setTransform(141.3,472.2,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_539 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_539.setTransform(144.05,497.7,0.1763,0.1763,30.7052,0,0,4.5,-52.9);

	this.instance_540 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_540.setTransform(143.7,480.75,0.1763,0.1763,-3.3484,0,0,0.1,2.3);

	this.instance_541 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_541.setTransform(154.5,487.8,0.1765,0.1765,90.2527,0,0,-4,2.3);

	this.instance_542 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_542.setTransform(155.7,486.2,0.1764,0.1764,109.9801,0,0,-5.7,6.9);

	this.instance_543 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_543.setTransform(152.9,472.25,0.1765,0.1765,78.6599,0,0,-39.9,-1.4);

	this.instance_544 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_544.setTransform(150.25,459.2,0.1764,0.1764,79.4966,0,0,-32.5,0);

	this.instance_545 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_545.setTransform(138.35,479.9,0.1764,0.1764,-21.1258,0,0,1.8,-45.5);

	this.instance_546 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_546.setTransform(147.3,436.05,0.1767,0.1767,-90.7176,0,0,35.1,1.3);

	this.instance_547 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_547.setTransform(159.4,460.4,0.1766,0.1766,-148.1547,0,0,5.5,-1.8);

	this.instance_548 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_548.setTransform(158.7,458.95,0.1766,0.1766,-124.7888,0,0,4.7,-8.2);

	this.instance_549 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_549.setTransform(147.75,450.05,0.1765,0.1765,-141.5799,0,0,38.9,1.7);

	this.instance_550 = new lib.ch1_headcopy_1("synched",0);
	this.instance_550.setTransform(157.45,426.2,0.1767,0.1767,-3.6038,0,0,1.9,54.2);

	this.instance_551 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_551.setTransform(156.05,436.5,0.1769,0.1769,0,0,0,0,-22.9);

	this.instance_552 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_552.setTransform(153.2,473.65,0.1766,0.1766,16.7765,0,0,4.4,-54.2);

	this.instance_553 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_553.setTransform(156.55,429.85,0.1767,0.1767,12.0764,0,0,-0.1,9.2);

	this.instance_554 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_554.setTransform(156.35,448.65,0.1769,0.1769,0,0,0,0.6,-22.4);

	this.instance_555 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_555.setTransform(162.5,473.65,0.1765,0.1765,-11.5596,0,0,3.1,-53.5);

	this.instance_556 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_556.setTransform(159.1,457.05,0.1765,0.1765,-14.6886,0,0,-0.5,2.8);

	this.instance_557 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_557.setTransform(165.7,461.15,0.1766,0.1766,58.7246,0,0,-4.2,3.1);

	this.instance_558 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_558.setTransform(166.55,459.4,0.1766,0.1766,96.3533,0,0,-5.5,7.2);

	this.instance_559 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_559.setTransform(159,447.3,0.1766,0.1766,58.0487,0,0,-39.3,-1.2);

	this.instance_560 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_560.setTransform(165.35,435.5,0.1766,0.1766,119.3003,0,0,-33.4,-1.1);

	this.instance_561 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_561.setTransform(154.4,456.55,0.1766,0.1766,1.802,0,0,2.8,-45.7);

	this.instance_562 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_562.setTransform(167.45,423.3,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_563 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_563.setTransform(167.05,451.3,0.1766,0.1766,-110.4755,0,0,6.2,-1.3);

	this.instance_564 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_564.setTransform(166.5,449.85,0.1766,0.1766,-120.7464,0,0,5,-8.5);

	this.instance_565 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_565.setTransform(162.05,436.15,0.1766,0.1766,-107.3768,0,0,40.3,0.1);

	this.instance_566 = new lib.ch1_headcopy2("synched",0);
	this.instance_566.setTransform(177.45,413.3,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_567 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_567.setTransform(176.25,423.75,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_568 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_568.setTransform(179.95,458.95,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_569 = new lib.ch1_neckcopy2("synched",0);
	this.instance_569.setTransform(176.75,417.05,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_570 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_570.setTransform(176.6,435.85,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_571 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_571.setTransform(177.15,460.6,0.1764,0.1764,36.4467,0,0,3.8,-53.6);

	this.instance_572 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_572.setTransform(180.3,443.85,0.1765,0.1765,7.7707,0,0,0.2,1.9);

	this.instance_573 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_573.setTransform(195.2,448.95,0.1766,0.1766,34.102,0,0,-4.4,2.6);

	this.instance_574 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_574.setTransform(194.8,446.9,0.1766,0.1766,58.3987,0,0,-5.8,7.8);

	this.instance_575 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_575.setTransform(185.5,436.15,0.1766,0.1766,49.3036,0,0,-40.2,-1);

	this.instance_576 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_576.setTransform(185.6,422.75,0.1767,0.1767,91.2918,0,0,-32.5,-0.7);

	this.instance_577 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_577.setTransform(173.05,443.35,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_578 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_578.setTransform(112.85,432.6,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_579 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_579.setTransform(112.45,460.6,0.1766,0.1766,-110.4755,0,0,6.2,-1.3);

	this.instance_580 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_580.setTransform(111.9,459.15,0.1766,0.1766,-120.7464,0,0,5,-8.5);

	this.instance_581 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_581.setTransform(107.45,445.45,0.1766,0.1766,-107.3768,0,0,40.3,0.1);

	this.instance_582 = new lib.ch1_headcopy2("synched",0);
	this.instance_582.setTransform(122.85,422.6,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_583 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_583.setTransform(121.65,433.05,0.1769,0.1769,0,0,0,0,-24);

	this.instance_584 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_584.setTransform(125.35,468.25,0.1765,0.1765,-11.8966,0,0,5,-53.6);

	this.instance_585 = new lib.ch1_neckcopy2("synched",0);
	this.instance_585.setTransform(122.15,426.35,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_586 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_586.setTransform(122,445.15,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_587 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_587.setTransform(122.55,469.9,0.1764,0.1764,36.4467,0,0,3.8,-53.6);

	this.instance_588 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_588.setTransform(125.7,453.15,0.1765,0.1765,7.7707,0,0,0.6,1.9);

	this.instance_589 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_589.setTransform(140.6,458.2,0.1766,0.1766,34.102,0,0,-2.8,1.5);

	this.instance_590 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_590.setTransform(140.2,456.2,0.1766,0.1766,58.3987,0,0,-5.8,7.8);

	this.instance_591 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_591.setTransform(130.9,445.45,0.1766,0.1766,49.3036,0,0,-40.2,-1);

	this.instance_592 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_592.setTransform(131,432.05,0.1767,0.1767,91.2918,0,0,-32.9,-2.4);

	this.instance_593 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_593.setTransform(118.45,452.65,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_594 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_594.setTransform(390.15,425.1,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_595 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_595.setTransform(389.75,453.1,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_596 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_596.setTransform(389.2,451.65,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_597 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_597.setTransform(384.75,437.95,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_598 = new lib.ch1_headcopy2("synched",0);
	this.instance_598.setTransform(400.15,415.1,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_599 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_599.setTransform(398.95,425.55,0.177,0.177,0,0,0,0,-24);

	this.instance_600 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_600.setTransform(402.65,460.75,0.1766,0.1766,-11.9004,0,0,4.7,-53.7);

	this.instance_601 = new lib.ch1_neckcopy2("synched",0);
	this.instance_601.setTransform(399.45,418.85,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_602 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_602.setTransform(399.3,437.65,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_603 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_603.setTransform(399.85,462.4,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_604 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_604.setTransform(403,445.65,0.1765,0.1765,7.775,0,0,0.5,1.7);

	this.instance_605 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_605.setTransform(417.9,450.75,0.1766,0.1766,34.1034,0,0,-3,1.7);

	this.instance_606 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_606.setTransform(417.5,448.7,0.1766,0.1766,58.397,0,0,-5.8,7.8);

	this.instance_607 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_607.setTransform(408.2,437.95,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_608 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_608.setTransform(408.3,424.55,0.1767,0.1767,91.2967,0,0,-32.9,-1.5);

	this.instance_609 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_609.setTransform(395.75,445.15,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_610 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_610.setTransform(374.85,406.15,0.1765,0.1765,-63.3663,0,0,35.6,0.8);

	this.instance_611 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_611.setTransform(369,433.95,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_612 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_612.setTransform(370.05,432.85,0.1764,0.1764,-53.0022,0,0,4.8,-7.9);

	this.instance_613 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_613.setTransform(368.6,418.6,0.1765,0.1765,-95.577,0,0,39.3,-0.1);

	this.instance_614 = new lib.ch1_headcopy("synched",0);
	this.instance_614.setTransform(385,396.15,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_615 = new lib.ch1_uBodycopy("synched",0);
	this.instance_615.setTransform(383.65,406.65,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_616 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_616.setTransform(386.55,442.55,0.1764,0.1764,-17.6293,0,0,3.1,-53.8);

	this.instance_617 = new lib.ch1_neckcopy("synched",0);
	this.instance_617.setTransform(384.1,399.95,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_618 = new lib.ch1_lBodycopy("synched",0);
	this.instance_618.setTransform(384,418.7,0.1768,0.1768,0,0,0,0.3,-22.9);

	this.instance_619 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_619.setTransform(386.75,444.2,0.1763,0.1763,30.7069,0,0,4.4,-53.1);

	this.instance_620 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_620.setTransform(386.4,427.25,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_621 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_621.setTransform(397.2,434.3,0.1765,0.1765,90.2576,0,0,-4.2,2.3);

	this.instance_622 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_622.setTransform(398.4,432.7,0.1765,0.1765,109.9814,0,0,-5.9,7);

	this.instance_623 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_623.setTransform(395.6,418.75,0.1765,0.1765,78.657,0,0,-39.9,-1.4);

	this.instance_624 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_624.setTransform(392.95,405.7,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_625 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_625.setTransform(381.05,426.4,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_626 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_626.setTransform(237.65,468.75,0.1765,0.1765,-63.3663,0,0,35.6,0.8);

	this.instance_627 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_627.setTransform(231.8,496.55,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_628 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_628.setTransform(232.85,495.5,0.1764,0.1764,-53.0022,0,0,4.5,-7.7);

	this.instance_629 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_629.setTransform(231.35,481.2,0.1765,0.1765,-95.577,0,0,39,-0.2);

	this.instance_630 = new lib.ch1_headcopy("synched",0);
	this.instance_630.setTransform(247.8,458.75,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_631 = new lib.ch1_uBodycopy("synched",0);
	this.instance_631.setTransform(246.45,469.25,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_632 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_632.setTransform(249.35,505.15,0.1764,0.1764,-17.6293,0,0,3,-53.5);

	this.instance_633 = new lib.ch1_neckcopy("synched",0);
	this.instance_633.setTransform(246.9,462.55,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_634 = new lib.ch1_lBodycopy("synched",0);
	this.instance_634.setTransform(246.8,481.3,0.1768,0.1768,0,0,0,0.3,-22.9);

	this.instance_635 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_635.setTransform(249.55,506.8,0.1763,0.1763,30.7069,0,0,4.4,-53.1);

	this.instance_636 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_636.setTransform(249.2,489.85,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_637 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_637.setTransform(260,496.9,0.1765,0.1765,90.2576,0,0,-4.2,2.3);

	this.instance_638 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_638.setTransform(261.2,495.3,0.1765,0.1765,109.9814,0,0,-5.5,7.2);

	this.instance_639 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_639.setTransform(258.4,481.35,0.1765,0.1765,78.657,0,0,-39.9,-1.4);

	this.instance_640 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_640.setTransform(255.75,468.3,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_641 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_641.setTransform(243.85,489,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_642 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_642.setTransform(325.65,407.05,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_643 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_643.setTransform(337.25,431.65,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_644 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_644.setTransform(336.6,430.25,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_645 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_645.setTransform(325.7,421.05,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_646 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_646.setTransform(335.9,397.2,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_647 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_647.setTransform(334.5,407.5,0.177,0.177,0,0,0,0,-24);

	this.instance_648 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_648.setTransform(330,444.5,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_649 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_649.setTransform(334.9,400.85,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_650 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_650.setTransform(334.85,419.65,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_651 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_651.setTransform(342.15,444.25,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_652 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_652.setTransform(338.35,427.7,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_653 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_653.setTransform(339.35,435.8,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_654 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_654.setTransform(339.9,433.85,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_655 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_655.setTransform(341.6,419.8,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_656 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_656.setTransform(343.85,406.5,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_657 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_657.setTransform(332.25,427.35,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_658 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_658.setTransform(349.35,384.3,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_659 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_659.setTransform(348.95,412.3,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_660 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_660.setTransform(348.4,410.85,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_661 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_661.setTransform(344,397.15,0.1767,0.1767,-107.3785,0,0,40,0.1);

	this.instance_662 = new lib.ch1_headcopy2("synched",0);
	this.instance_662.setTransform(359.35,374.3,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_663 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_663.setTransform(358.15,384.75,0.177,0.177,0,0,0,0,-23.8);

	this.instance_664 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_664.setTransform(361.85,419.95,0.1766,0.1766,-11.9004,0,0,2.6,-53.9);

	this.instance_665 = new lib.ch1_neckcopy2("synched",0);
	this.instance_665.setTransform(358.65,378.05,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_666 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_666.setTransform(358.5,396.85,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_667 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_667.setTransform(359.05,421.6,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_668 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_668.setTransform(362.2,404.85,0.1765,0.1765,7.775,0,0,-0.3,2);

	this.instance_669 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_669.setTransform(377.1,409.95,0.1766,0.1766,34.1034,0,0,-4.6,2.8);

	this.instance_670 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_670.setTransform(376.65,407.9,0.1766,0.1766,58.397,0,0,-5.7,8.2);

	this.instance_671 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_671.setTransform(367.4,397.15,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_672 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_672.setTransform(367.5,383.75,0.1767,0.1767,91.2967,0,0,-32.5,-0.4);

	this.instance_673 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_673.setTransform(354.95,404.35,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_674 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_674.setTransform(299.8,411.65,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_675 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_675.setTransform(299.4,439.65,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_676 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_676.setTransform(298.85,438.2,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_677 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_677.setTransform(294.4,424.5,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_678 = new lib.ch1_headcopy2("synched",0);
	this.instance_678.setTransform(309.8,401.65,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_679 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_679.setTransform(308.6,412.1,0.177,0.177,0,0,0,0,-24);

	this.instance_680 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_680.setTransform(312.3,447.3,0.1766,0.1766,-11.9004,0,0,3,-54.1);

	this.instance_681 = new lib.ch1_neckcopy2("synched",0);
	this.instance_681.setTransform(309.1,405.4,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_682 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_682.setTransform(308.95,424.2,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_683 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_683.setTransform(309.5,448.95,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_684 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_684.setTransform(312.65,432.2,0.1765,0.1765,7.775,0,0,-0.4,1.8);

	this.instance_685 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_685.setTransform(327.55,437.3,0.1766,0.1766,34.1034,0,0,-4.4,2.6);

	this.instance_686 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_686.setTransform(327.15,435.25,0.1766,0.1766,58.397,0,0,-6,7.6);

	this.instance_687 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_687.setTransform(317.85,424.5,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_688 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_688.setTransform(317.95,411.1,0.1767,0.1767,91.2967,0,0,-32.9,-0.7);

	this.instance_689 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_689.setTransform(305.4,431.7,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_690 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_690.setTransform(244.55,442,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_691 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_691.setTransform(244.15,470,0.1766,0.1766,-110.4784,0,0,5.5,-1.6);

	this.instance_692 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_692.setTransform(243.55,468.55,0.1766,0.1766,-120.7456,0,0,3.6,-9.4);

	this.instance_693 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_693.setTransform(239.2,454.85,0.1767,0.1767,-107.3785,0,0,40,0.1);

	this.instance_694 = new lib.ch1_headcopy2("synched",0);
	this.instance_694.setTransform(254.55,432,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_695 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_695.setTransform(253.35,442.45,0.177,0.177,0,0,0,0,-22.1);

	this.instance_696 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_696.setTransform(257.05,477.65,0.1766,0.1766,-11.9004,0,0,3,-53.8);

	this.instance_697 = new lib.ch1_neckcopy2("synched",0);
	this.instance_697.setTransform(253.85,435.75,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_698 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_698.setTransform(253.7,454.55,0.177,0.177,0,0,0,0.3,-22.3);

	this.instance_699 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_699.setTransform(254.25,479.3,0.1765,0.1765,36.4478,0,0,4.8,-52.1);

	this.instance_700 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_700.setTransform(257.4,462.55,0.1765,0.1765,7.775,0,0,-0.1,3.8);

	this.instance_701 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_701.setTransform(272.3,467.65,0.1766,0.1766,34.1034,0,0,-3.5,4);

	this.instance_702 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_702.setTransform(271.9,465.6,0.1766,0.1766,58.397,0,0,-5.5,7.9);

	this.instance_703 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_703.setTransform(262.6,454.85,0.1766,0.1766,49.3031,0,0,-39,0.1);

	this.instance_704 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_704.setTransform(262.7,441.45,0.1767,0.1767,91.2967,0,0,-31.7,-0.7);

	this.instance_705 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_705.setTransform(250.15,462.05,0.1766,0.1766,-26.6492,0,0,1.7,-43.8);

	this.instance_706 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_706.setTransform(190.5,452.05,0.1767,0.1767,-90.7176,0,0,35.1,1.3);

	this.instance_707 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_707.setTransform(202.55,476.4,0.1766,0.1766,-148.1547,0,0,5.3,-1.7);

	this.instance_708 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_708.setTransform(201.9,474.95,0.1766,0.1766,-124.7888,0,0,4.5,-8);

	this.instance_709 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_709.setTransform(190.95,466.05,0.1765,0.1765,-141.5799,0,0,38.9,1.7);

	this.instance_710 = new lib.ch1_headcopy_1("synched",0);
	this.instance_710.setTransform(200.65,442.2,0.1767,0.1767,-3.6038,0,0,1.9,54.2);

	this.instance_711 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_711.setTransform(199.25,452.5,0.1769,0.1769,0,0,0,0,-22.9);

	this.instance_712 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_712.setTransform(196.4,489.65,0.1766,0.1766,16.7765,0,0,4.4,-54.2);

	this.instance_713 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_713.setTransform(199.75,445.85,0.1767,0.1767,12.0764,0,0,-0.1,9.2);

	this.instance_714 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_714.setTransform(199.55,464.65,0.1769,0.1769,0,0,0,0.8,-22.4);

	this.instance_715 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_715.setTransform(205.7,489.65,0.1765,0.1765,-11.5596,0,0,3.1,-53.5);

	this.instance_716 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_716.setTransform(202.3,473.05,0.1765,0.1765,-14.6886,0,0,-0.5,2.8);

	this.instance_717 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_717.setTransform(208.9,477.15,0.1766,0.1766,58.7246,0,0,-4.2,3.1);

	this.instance_718 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_718.setTransform(209.75,475.4,0.1766,0.1766,96.3533,0,0,-5.5,6.9);

	this.instance_719 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_719.setTransform(202.15,463.25,0.1766,0.1766,58.0487,0,0,-38.9,-1.9);

	this.instance_720 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_720.setTransform(208.55,451.5,0.1766,0.1766,119.3003,0,0,-33.4,-1.1);

	this.instance_721 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_721.setTransform(197.6,472.55,0.1766,0.1766,1.802,0,0,2.8,-45.7);

	this.instance_722 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_722.setTransform(214.2,460.15,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_723 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_723.setTransform(213.8,488.15,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_724 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_724.setTransform(213.25,486.7,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_725 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_725.setTransform(208.8,473,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_726 = new lib.ch1_headcopy2("synched",0);
	this.instance_726.setTransform(224.2,450.15,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_727 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_727.setTransform(223,460.6,0.177,0.177,0,0,0,0,-24);

	this.instance_728 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_728.setTransform(226.7,495.8,0.1766,0.1766,-11.9004,0,0,4.7,-53.7);

	this.instance_729 = new lib.ch1_neckcopy2("synched",0);
	this.instance_729.setTransform(223.5,453.9,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_730 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_730.setTransform(223.35,472.7,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_731 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_731.setTransform(223.9,497.45,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_732 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_732.setTransform(227.05,480.7,0.1765,0.1765,7.775,0,0,1.7,1.5);

	this.instance_733 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_733.setTransform(241.95,485.8,0.1766,0.1766,34.1034,0,0,-3,1.7);

	this.instance_734 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_734.setTransform(241.55,483.75,0.1766,0.1766,58.397,0,0,-5.3,7);

	this.instance_735 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_735.setTransform(232.3,473,0.1766,0.1766,49.3031,0,0,-39.7,-1.7);

	this.instance_736 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_736.setTransform(232.35,459.6,0.1767,0.1767,91.2967,0,0,-32.9,-2.4);

	this.instance_737 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_737.setTransform(219.8,480.2,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_738 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_738.setTransform(131,415.4,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_739 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_739.setTransform(142.6,440,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_740 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_740.setTransform(141.95,438.6,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_741 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_741.setTransform(131.05,429.4,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_742 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_742.setTransform(141.25,405.55,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_743 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_743.setTransform(139.85,415.85,0.177,0.177,0,0,0,0,-24);

	this.instance_744 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_744.setTransform(135.35,452.85,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_745 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_745.setTransform(140.25,409.2,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_746 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_746.setTransform(140.2,428,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_747 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_747.setTransform(147.5,452.6,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_748 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_748.setTransform(143.7,436.05,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_749 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_749.setTransform(144.7,444.15,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_750 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_750.setTransform(145.25,442.2,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_751 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_751.setTransform(146.95,428.15,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_752 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_752.setTransform(149.2,414.85,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_753 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_753.setTransform(137.6,435.7,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_754 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_754.setTransform(103,405.2,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_755 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_755.setTransform(114.6,429.8,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_756 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_756.setTransform(113.95,428.4,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_757 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_757.setTransform(103.05,419.2,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_758 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_758.setTransform(113.25,395.35,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_759 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_759.setTransform(111.85,405.65,0.177,0.177,0,0,0,0,-24);

	this.instance_760 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_760.setTransform(107.35,442.65,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_761 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_761.setTransform(112.25,399,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_762 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_762.setTransform(112.2,417.8,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_763 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_763.setTransform(119.5,442.4,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_764 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_764.setTransform(115.7,425.85,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_765 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_765.setTransform(116.7,433.95,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_766 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_766.setTransform(117.25,432,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_767 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_767.setTransform(118.95,417.95,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_768 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_768.setTransform(121.2,404.65,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_769 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_769.setTransform(109.6,425.5,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_770 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_770.setTransform(209.15,432.85,0.1765,0.1765,-63.3663,0,0,35.6,0.8);

	this.instance_771 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_771.setTransform(203.3,460.65,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_772 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_772.setTransform(204.35,459.55,0.1764,0.1764,-53.0022,0,0,4.8,-7.9);

	this.instance_773 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_773.setTransform(202.9,445.3,0.1765,0.1765,-95.577,0,0,39.3,-0.1);

	this.instance_774 = new lib.ch1_headcopy("synched",0);
	this.instance_774.setTransform(219.3,422.85,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_775 = new lib.ch1_uBodycopy("synched",0);
	this.instance_775.setTransform(217.95,433.35,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_776 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_776.setTransform(220.85,469.25,0.1764,0.1764,-17.6293,0,0,3.4,-53.6);

	this.instance_777 = new lib.ch1_neckcopy("synched",0);
	this.instance_777.setTransform(218.4,426.65,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_778 = new lib.ch1_lBodycopy("synched",0);
	this.instance_778.setTransform(218.3,445.4,0.1768,0.1768,0,0,0,0.3,-22.9);

	this.instance_779 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_779.setTransform(221.05,470.9,0.1763,0.1763,30.7069,0,0,4.4,-53.1);

	this.instance_780 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_780.setTransform(220.7,453.95,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_781 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_781.setTransform(231.5,461,0.1765,0.1765,90.2576,0,0,-4.2,2.3);

	this.instance_782 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_782.setTransform(232.7,459.35,0.1765,0.1765,109.9814,0,0,-6.5,5.4);

	this.instance_783 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_783.setTransform(229.9,445.45,0.1765,0.1765,78.657,0,0,-39.9,-1.4);

	this.instance_784 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_784.setTransform(227.25,432.4,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_785 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_785.setTransform(215.35,453.1,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_786 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_786.setTransform(230.55,421.75,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_787 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_787.setTransform(242.15,446.35,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_788 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_788.setTransform(241.5,444.95,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_789 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_789.setTransform(230.6,435.75,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_790 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_790.setTransform(240.8,411.9,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_791 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_791.setTransform(239.4,422.2,0.177,0.177,0,0,0,0,-24);

	this.instance_792 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_792.setTransform(234.9,459.2,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_793 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_793.setTransform(239.8,415.55,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_794 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_794.setTransform(239.75,434.35,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_795 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_795.setTransform(247.05,458.95,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_796 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_796.setTransform(243.25,442.4,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_797 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_797.setTransform(244.25,450.5,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_798 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_798.setTransform(244.8,448.55,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_799 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_799.setTransform(246.5,434.5,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_800 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_800.setTransform(248.75,421.2,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_801 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_801.setTransform(237.15,442.05,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_802 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_802.setTransform(190.05,411.4,0.1764,0.1764,-63.3685,0,0,35.4,1);

	this.instance_803 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_803.setTransform(184.25,439.2,0.1764,0.1764,-85.3759,0,0,5.4,-0.7);

	this.instance_804 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_804.setTransform(185.25,438.15,0.1763,0.1763,-53.0052,0,0,2.7,-6.3);

	this.instance_805 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_805.setTransform(183.75,423.85,0.1764,0.1764,-95.5681,0,0,36.8,-0.4);

	this.instance_806 = new lib.ch1_headcopy("synched",0);
	this.instance_806.setTransform(200.2,401.4,0.1766,0.1766,-1.0201,0,0,1.4,52.7);

	this.instance_807 = new lib.ch1_uBodycopy("synched",0);
	this.instance_807.setTransform(198.85,411.9,0.1767,0.1767,0,0,0,0,-21.8);

	this.instance_808 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_808.setTransform(201.75,447.8,0.1763,0.1763,-17.6244,0,0,2.8,-51.8);

	this.instance_809 = new lib.ch1_neckcopy("synched",0);
	this.instance_809.setTransform(199.3,405.2,0.1765,0.1765,10.6796,0,0,-0.7,8.8);

	this.instance_810 = new lib.ch1_lBodycopy("synched",0);
	this.instance_810.setTransform(199.2,423.95,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_811 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_811.setTransform(201.95,449.45,0.1762,0.1762,30.706,0,0,5.6,-51.1);

	this.instance_812 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_812.setTransform(201.6,432.5,0.1763,0.1763,-3.344,0,0,0.1,2.3);

	this.instance_813 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_813.setTransform(212.4,439.55,0.1764,0.1764,90.2478,0,0,-3.4,2.3);

	this.instance_814 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_814.setTransform(213.6,437.95,0.1764,0.1764,109.9772,0,0,-4,6.3);

	this.instance_815 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_815.setTransform(210.8,424,0.1764,0.1764,78.6638,0,0,-39.9,-1.4);

	this.instance_816 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_816.setTransform(208.15,410.95,0.1764,0.1764,79.5006,0,0,-32.5,0);

	this.instance_817 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_817.setTransform(196.25,431.65,0.1764,0.1764,-21.1229,0,0,1.2,-44.2);

	this.instance_818 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_818.setTransform(214.2,397,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_819 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_819.setTransform(213.8,425,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_820 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_820.setTransform(213.25,423.55,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_821 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_821.setTransform(208.8,409.85,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_822 = new lib.ch1_headcopy2("synched",0);
	this.instance_822.setTransform(224.2,387,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_823 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_823.setTransform(223,397.45,0.177,0.177,0,0,0,0,-23.8);

	this.instance_824 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_824.setTransform(226.7,432.65,0.1766,0.1766,-11.9004,0,0,4.7,-53.7);

	this.instance_825 = new lib.ch1_neckcopy2("synched",0);
	this.instance_825.setTransform(223.5,390.75,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_826 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_826.setTransform(223.35,409.55,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_827 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_827.setTransform(223.9,434.3,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_828 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_828.setTransform(227.05,417.55,0.1765,0.1765,7.775,0,0,1.7,1.8);

	this.instance_829 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_829.setTransform(241.95,422.65,0.1766,0.1766,34.1034,0,0,-3,1.7);

	this.instance_830 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_830.setTransform(241.55,420.6,0.1766,0.1766,58.397,0,0,-5.3,7);

	this.instance_831 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_831.setTransform(232.3,409.85,0.1766,0.1766,49.3031,0,0,-39.7,-1.7);

	this.instance_832 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_832.setTransform(232.35,396.45,0.1767,0.1767,91.2967,0,0,-32.9,-2.4);

	this.instance_833 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_833.setTransform(219.8,417.05,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_834 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_834.setTransform(196.5,366.5,0.1764,0.1764,-63.3685,0,0,33.6,1.9);

	this.instance_835 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_835.setTransform(190.65,394.3,0.1764,0.1764,-85.3759,0,0,4,-0.6);

	this.instance_836 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_836.setTransform(191.7,393.25,0.1763,0.1763,-53.0052,0,0,2.7,-6.3);

	this.instance_837 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_837.setTransform(190.2,378.95,0.1764,0.1764,-95.5681,0,0,36.8,-0.4);

	this.instance_838 = new lib.ch1_headcopy("synched",0);
	this.instance_838.setTransform(206.65,356.5,0.1766,0.1766,-1.0201,0,0,1.4,52.7);

	this.instance_839 = new lib.ch1_uBodycopy("synched",0);
	this.instance_839.setTransform(205.3,367,0.1767,0.1767,0,0,0,0,-21.2);

	this.instance_840 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_840.setTransform(208.2,402.9,0.1763,0.1763,-17.6244,0,0,2.7,-51.5);

	this.instance_841 = new lib.ch1_neckcopy("synched",0);
	this.instance_841.setTransform(205.75,360.3,0.1765,0.1765,10.6796,0,0,-0.7,8.8);

	this.instance_842 = new lib.ch1_lBodycopy("synched",0);
	this.instance_842.setTransform(205.65,379.05,0.1767,0.1767,0,0,0,0.3,-20.7);

	this.instance_843 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_843.setTransform(208.4,404.55,0.1762,0.1762,30.706,0,0,5.6,-51.1);

	this.instance_844 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_844.setTransform(208.1,387.6,0.1763,0.1763,-3.344,0,0,0.1,4.2);

	this.instance_845 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_845.setTransform(218.85,394.65,0.1764,0.1764,90.2478,0,0,-1.9,2.3);

	this.instance_846 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_846.setTransform(220.05,393.05,0.1764,0.1764,109.9772,0,0,-3.8,6.2);

	this.instance_847 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_847.setTransform(217.25,379.1,0.1764,0.1764,78.6638,0,0,-38,-1);

	this.instance_848 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_848.setTransform(214.6,366.05,0.1764,0.1764,79.5006,0,0,-30.6,0.4);

	this.instance_849 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_849.setTransform(202.75,386.8,0.1764,0.1764,-21.1229,0,0,1.1,-43.6);

	this.instance_850 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_850.setTransform(306.7,380.8,0.1765,0.1765,-63.3663,0,0,35.4,1);

	this.instance_851 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_851.setTransform(300.85,408.6,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_852 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_852.setTransform(301.9,407.55,0.1764,0.1764,-53.0022,0,0,4.5,-7.7);

	this.instance_853 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_853.setTransform(300.4,393.25,0.1765,0.1765,-95.577,0,0,39,-0.2);

	this.instance_854 = new lib.ch1_headcopy("synched",0);
	this.instance_854.setTransform(316.85,370.8,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_855 = new lib.ch1_uBodycopy("synched",0);
	this.instance_855.setTransform(315.5,381.3,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_856 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_856.setTransform(318.4,417.15,0.1764,0.1764,-17.6293,0,0,3.3,-53.4);

	this.instance_857 = new lib.ch1_neckcopy("synched",0);
	this.instance_857.setTransform(315.95,374.6,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_858 = new lib.ch1_lBodycopy("synched",0);
	this.instance_858.setTransform(315.85,393.35,0.1768,0.1768,0,0,0,0.3,-22.7);

	this.instance_859 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_859.setTransform(318.6,418.85,0.1763,0.1763,30.7069,0,0,4.4,-53.1);

	this.instance_860 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_860.setTransform(318.25,401.9,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_861 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_861.setTransform(329.05,408.95,0.1765,0.1765,90.2576,0,0,-4.2,2.3);

	this.instance_862 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_862.setTransform(330.25,407.35,0.1765,0.1765,109.9814,0,0,-5.7,6.9);

	this.instance_863 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_863.setTransform(327.45,393.4,0.1765,0.1765,78.657,0,0,-39.9,-1.4);

	this.instance_864 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_864.setTransform(324.8,380.35,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_865 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_865.setTransform(312.9,401.05,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_866 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_866.setTransform(270.35,421.7,0.1765,0.1765,-63.3663,0,0,35.4,1);

	this.instance_867 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_867.setTransform(264.5,449.5,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_868 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_868.setTransform(265.55,448.45,0.1764,0.1764,-53.0022,0,0,4.5,-7.7);

	this.instance_869 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_869.setTransform(264.05,434.15,0.1765,0.1765,-95.577,0,0,39,-0.2);

	this.instance_870 = new lib.ch1_headcopy("synched",0);
	this.instance_870.setTransform(280.5,411.7,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_871 = new lib.ch1_uBodycopy("synched",0);
	this.instance_871.setTransform(279.15,422.2,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_872 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_872.setTransform(282.05,458.1,0.1764,0.1764,-17.6293,0,0,3,-53.5);

	this.instance_873 = new lib.ch1_neckcopy("synched",0);
	this.instance_873.setTransform(279.6,415.5,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_874 = new lib.ch1_lBodycopy("synched",0);
	this.instance_874.setTransform(279.5,434.25,0.1768,0.1768,0,0,0,0.3,-22.7);

	this.instance_875 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_875.setTransform(282.25,459.75,0.1763,0.1763,30.7069,0,0,4.4,-53.1);

	this.instance_876 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_876.setTransform(281.9,442.8,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_877 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_877.setTransform(292.7,449.85,0.1765,0.1765,90.2576,0,0,-4.2,2.3);

	this.instance_878 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_878.setTransform(293.9,448.25,0.1765,0.1765,109.9814,0,0,-5.5,7.2);

	this.instance_879 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_879.setTransform(291.1,434.3,0.1765,0.1765,78.657,0,0,-39.9,-1.4);

	this.instance_880 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_880.setTransform(288.45,421.25,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_881 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_881.setTransform(276.55,441.95,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_882 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_882.setTransform(280.5,392.1,0.1765,0.1765,-63.3663,0,0,35.6,0.8);

	this.instance_883 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_883.setTransform(274.65,419.9,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_884 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_884.setTransform(275.7,418.85,0.1764,0.1764,-53.0022,0,0,4.5,-7.7);

	this.instance_885 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_885.setTransform(274.2,404.55,0.1765,0.1765,-95.577,0,0,39,-0.2);

	this.instance_886 = new lib.ch1_headcopy("synched",0);
	this.instance_886.setTransform(290.65,382.1,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_887 = new lib.ch1_uBodycopy("synched",0);
	this.instance_887.setTransform(289.3,392.6,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_888 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_888.setTransform(292.2,428.5,0.1764,0.1764,-17.6293,0,0,5,-53.1);

	this.instance_889 = new lib.ch1_neckcopy("synched",0);
	this.instance_889.setTransform(289.75,385.9,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_890 = new lib.ch1_lBodycopy("synched",0);
	this.instance_890.setTransform(289.65,404.65,0.1768,0.1768,0,0,0,0.3,-22.9);

	this.instance_891 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_891.setTransform(292.4,430.15,0.1763,0.1763,30.7069,0,0,4.4,-53.1);

	this.instance_892 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_892.setTransform(292.1,413.2,0.1764,0.1764,-3.3531,0,0,1,2.4);

	this.instance_893 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_893.setTransform(302.85,420.25,0.1765,0.1765,90.2576,0,0,-4.2,0.6);

	this.instance_894 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_894.setTransform(304.05,418.6,0.1765,0.1765,109.9814,0,0,-6.5,5.4);

	this.instance_895 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_895.setTransform(301.25,404.7,0.1765,0.1765,78.657,0,0,-39.5,-3.3);

	this.instance_896 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_896.setTransform(298.6,391.65,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_897 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_897.setTransform(286.7,412.35,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_898 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_898.setTransform(252.2,405.05,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_899 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_899.setTransform(251.8,433.05,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_900 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_900.setTransform(251.25,431.6,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_901 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_901.setTransform(246.8,417.9,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_902 = new lib.ch1_headcopy2("synched",0);
	this.instance_902.setTransform(262.2,395.05,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_903 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_903.setTransform(261,405.5,0.177,0.177,0,0,0,0,-23.8);

	this.instance_904 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_904.setTransform(264.7,440.7,0.1766,0.1766,-11.9004,0,0,4.7,-53.7);

	this.instance_905 = new lib.ch1_neckcopy2("synched",0);
	this.instance_905.setTransform(261.5,398.8,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_906 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_906.setTransform(261.35,417.6,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_907 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_907.setTransform(261.9,442.35,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_908 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_908.setTransform(265.05,425.6,0.1765,0.1765,7.775,0,0,-0.3,2);

	this.instance_909 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_909.setTransform(279.95,430.7,0.1766,0.1766,34.1034,0,0,-3,1.7);

	this.instance_910 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_910.setTransform(279.55,428.65,0.1766,0.1766,58.397,0,0,-5.8,7.8);

	this.instance_911 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_911.setTransform(270.25,417.9,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_912 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_912.setTransform(270.35,404.5,0.1767,0.1767,91.2967,0,0,-32.9,-1.5);

	this.instance_913 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_913.setTransform(257.8,425.1,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_914 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_914.setTransform(231.8,378.9,0.1764,0.1764,-63.3685,0,0,35.4,1);

	this.instance_915 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_915.setTransform(225.95,406.7,0.1764,0.1764,-85.3759,0,0,5.7,-0.8);

	this.instance_916 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_916.setTransform(227,405.65,0.1763,0.1763,-53.0052,0,0,3.9,-7.2);

	this.instance_917 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_917.setTransform(225.5,391.35,0.1764,0.1764,-95.5681,0,0,38.5,-0.2);

	this.instance_918 = new lib.ch1_headcopy("synched",0);
	this.instance_918.setTransform(241.95,368.9,0.1766,0.1766,-1.0201,0,0,1.4,52.7);

	this.instance_919 = new lib.ch1_uBodycopy("synched",0);
	this.instance_919.setTransform(240.6,379.4,0.1767,0.1767,0,0,0,0,-22.9);

	this.instance_920 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_920.setTransform(243.5,415.3,0.1763,0.1763,-17.6244,0,0,3.3,-53.4);

	this.instance_921 = new lib.ch1_neckcopy("synched",0);
	this.instance_921.setTransform(241.05,372.7,0.1765,0.1765,10.6796,0,0,-0.7,8.8);

	this.instance_922 = new lib.ch1_lBodycopy("synched",0);
	this.instance_922.setTransform(240.95,391.45,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_923 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_923.setTransform(243.7,416.95,0.1762,0.1762,30.706,0,0,4.7,-52.6);

	this.instance_924 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_924.setTransform(243.35,400,0.1763,0.1763,-3.344,0,0,0.1,2.3);

	this.instance_925 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_925.setTransform(254.15,407.05,0.1764,0.1764,90.2478,0,0,-3.6,2.3);

	this.instance_926 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_926.setTransform(255.35,405.45,0.1764,0.1764,109.9772,0,0,-5.7,6.9);

	this.instance_927 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_927.setTransform(252.55,391.5,0.1764,0.1764,78.6638,0,0,-39.9,-1.4);

	this.instance_928 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_928.setTransform(249.9,378.45,0.1764,0.1764,79.5006,0,0,-32.5,0);

	this.instance_929 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_929.setTransform(238.05,399.15,0.1764,0.1764,-21.1229,0,0,1.7,-45.2);

	this.instance_930 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_930.setTransform(261.5,375.95,0.1767,0.1767,-90.7176,0,0,34.2,1.3);

	this.instance_931 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_931.setTransform(273.55,400.25,0.1766,0.1766,-148.1547,0,0,5.1,-2.5);

	this.instance_932 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_932.setTransform(272.9,398.85,0.1766,0.1766,-124.7888,0,0,4.7,-8.2);

	this.instance_933 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_933.setTransform(261.95,389.95,0.1765,0.1765,-141.5799,0,0,38.9,1.7);

	this.instance_934 = new lib.ch1_headcopy_1("synched",0);
	this.instance_934.setTransform(271.65,366.15,0.1767,0.1767,-3.6038,0,0,1.9,56);

	this.instance_935 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_935.setTransform(270.25,376.4,0.1769,0.1769,0,0,0,0,-22.1);

	this.instance_936 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_936.setTransform(267.4,413.6,0.1766,0.1766,16.7765,0,0,4.7,-52.2);

	this.instance_937 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_937.setTransform(270.75,369.75,0.1767,0.1767,12.0764,0,0,0.4,11.2);

	this.instance_938 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_938.setTransform(270.55,388.55,0.1769,0.1769,0,0,0,0.6,-20.7);

	this.instance_939 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_939.setTransform(276.7,413.55,0.1765,0.1765,-11.5596,0,0,3.1,-53.5);

	this.instance_940 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_940.setTransform(273.3,396.95,0.1765,0.1765,-14.6886,0,0,-0.9,4.5);

	this.instance_941 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_941.setTransform(279.9,401.05,0.1766,0.1766,58.7246,0,0,-2.8,4);

	this.instance_942 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_942.setTransform(280.75,399.3,0.1766,0.1766,96.3533,0,0,-5.5,7.2);

	this.instance_943 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_943.setTransform(273.15,387.2,0.1766,0.1766,58.0487,0,0,-37.9,-0.2);

	this.instance_944 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_944.setTransform(279.55,375.45,0.1766,0.1766,119.3003,0,0,-32.6,-1.5);

	this.instance_945 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_945.setTransform(268.6,396.45,0.1766,0.1766,1.802,0,0,2.8,-45.7);

	this.instance_946 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_946.setTransform(249.75,354.35,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_947 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_947.setTransform(249.35,382.35,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_948 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_948.setTransform(248.8,380.9,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_949 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_949.setTransform(244.4,367.2,0.1767,0.1767,-107.3785,0,0,40,0.1);

	this.instance_950 = new lib.ch1_headcopy2("synched",0);
	this.instance_950.setTransform(259.75,344.35,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_951 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_951.setTransform(258.55,354.8,0.177,0.177,0,0,0,0,-23.8);

	this.instance_952 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_952.setTransform(262.25,390,0.1766,0.1766,-11.9004,0,0,3,-53.8);

	this.instance_953 = new lib.ch1_neckcopy2("synched",0);
	this.instance_953.setTransform(259.05,348.1,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_954 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_954.setTransform(258.9,366.9,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_955 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_955.setTransform(259.45,391.65,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_956 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_956.setTransform(262.6,374.9,0.1765,0.1765,7.775,0,0,-0.2,2.9);

	this.instance_957 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_957.setTransform(277.5,380,0.1766,0.1766,34.1034,0,0,-4.4,2.6);

	this.instance_958 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_958.setTransform(277.05,377.95,0.1766,0.1766,58.397,0,0,-5.7,8.2);

	this.instance_959 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_959.setTransform(267.8,367.2,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_960 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_960.setTransform(267.9,353.8,0.1767,0.1767,91.2967,0,0,-32.5,-0.7);

	this.instance_961 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_961.setTransform(255.35,374.4,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_962 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_962.setTransform(382.85,375.15,0.1765,0.1765,-63.3663,0,0,35.6,0.8);

	this.instance_963 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_963.setTransform(377,402.95,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_964 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_964.setTransform(378.05,401.85,0.1764,0.1764,-53.0022,0,0,4.8,-7.9);

	this.instance_965 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_965.setTransform(376.6,387.6,0.1765,0.1765,-95.577,0,0,39.3,-0.1);

	this.instance_966 = new lib.ch1_headcopy("synched",0);
	this.instance_966.setTransform(393,365.15,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_967 = new lib.ch1_uBodycopy("synched",0);
	this.instance_967.setTransform(391.65,375.65,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_968 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_968.setTransform(394.55,411.55,0.1764,0.1764,-17.6293,0,0,3.1,-53.8);

	this.instance_969 = new lib.ch1_neckcopy("synched",0);
	this.instance_969.setTransform(392.1,368.95,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_970 = new lib.ch1_lBodycopy("synched",0);
	this.instance_970.setTransform(392,387.7,0.1768,0.1768,0,0,0,0.3,-22.9);

	this.instance_971 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_971.setTransform(394.75,413.2,0.1763,0.1763,30.7069,0,0,4.4,-53.1);

	this.instance_972 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_972.setTransform(394.4,396.25,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_973 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_973.setTransform(405.2,403.3,0.1765,0.1765,90.2576,0,0,-4.2,2.3);

	this.instance_974 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_974.setTransform(406.4,401.7,0.1765,0.1765,109.9814,0,0,-5.8,7.2);

	this.instance_975 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_975.setTransform(403.6,387.75,0.1765,0.1765,78.657,0,0,-39.9,-1.4);

	this.instance_976 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_976.setTransform(400.95,374.7,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_977 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_977.setTransform(389.05,395.4,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_978 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_978.setTransform(329.1,361.5,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_979 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_979.setTransform(328.7,389.5,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_980 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_980.setTransform(328.15,388.05,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_981 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_981.setTransform(323.7,374.35,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_982 = new lib.ch1_headcopy2("synched",0);
	this.instance_982.setTransform(339.1,351.5,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_983 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_983.setTransform(337.9,361.95,0.177,0.177,0,0,0,0,-24);

	this.instance_984 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_984.setTransform(341.6,397.15,0.1766,0.1766,-11.9004,0,0,4.7,-53.7);

	this.instance_985 = new lib.ch1_neckcopy2("synched",0);
	this.instance_985.setTransform(338.4,355.25,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_986 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_986.setTransform(338.25,374.05,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_987 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_987.setTransform(338.8,398.8,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_988 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_988.setTransform(341.95,382.1,0.1765,0.1765,7.775,0,0,1.4,1.6);

	this.instance_989 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_989.setTransform(356.85,387.15,0.1766,0.1766,34.1034,0,0,-3,1.7);

	this.instance_990 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_990.setTransform(356.45,385.1,0.1766,0.1766,58.397,0,0,-5.8,7.8);

	this.instance_991 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_991.setTransform(347.15,374.35,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_992 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_992.setTransform(347.25,360.95,0.1767,0.1767,91.2967,0,0,-32.9,-2.4);

	this.instance_993 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_993.setTransform(334.7,381.55,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_994 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_994.setTransform(323.8,336.45,0.1767,0.1767,-90.7225,0,0,35.1,1.3);

	this.instance_995 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_995.setTransform(335.9,360.8,0.1766,0.1766,-148.1531,0,0,5.5,-1.8);

	this.instance_996 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_996.setTransform(335.2,359.35,0.1766,0.1766,-124.7872,0,0,4.7,-8.2);

	this.instance_997 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_997.setTransform(324.25,350.45,0.1766,0.1766,-141.5791,0,0,38.9,1.7);

	this.instance_998 = new lib.ch1_headcopy_1("synched",0);
	this.instance_998.setTransform(333.95,326.6,0.1768,0.1768,-3.6081,0,0,1.9,55.6);

	this.instance_999 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_999.setTransform(332.55,336.9,0.1769,0.1769,0,0,0,0,-22.9);

	this.instance_1000 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_1000.setTransform(329.75,374.05,0.1766,0.1766,16.7784,0,0,4.6,-53.5);

	this.instance_1001 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_1001.setTransform(333.05,330.25,0.1767,0.1767,12.0802,0,0,0.1,10.1);

	this.instance_1002 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_1002.setTransform(332.85,349.05,0.1769,0.1769,0,0,0,0.8,-20.9);

	this.instance_1003 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_1003.setTransform(339,374.05,0.1765,0.1765,-11.5634,0,0,3.1,-53.4);

	this.instance_1004 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_1004.setTransform(335.6,357.45,0.1765,0.1765,-14.6921,0,0,-0.7,3.6);

	this.instance_1005 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_1005.setTransform(342.2,361.55,0.1766,0.1766,58.7255,0,0,-4.2,3.1);

	this.instance_1006 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_1006.setTransform(343.05,359.8,0.1767,0.1767,96.3577,0,0,-5.5,7.2);

	this.instance_1007 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_1007.setTransform(335.45,347.7,0.1766,0.1766,58.0497,0,0,-38.6,-0.7);

	this.instance_1008 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_1008.setTransform(341.85,335.9,0.1766,0.1766,119.3022,0,0,-33.4,-1.1);

	this.instance_1009 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_1009.setTransform(330.9,356.95,0.1766,0.1766,1.8068,0,0,2.8,-45.7);

	this.instance_1010 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1010.setTransform(286.95,351.25,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_1011 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1011.setTransform(286.55,379.25,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_1012 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1012.setTransform(286,377.8,0.1766,0.1766,-120.7456,0,0,4.4,-9);

	this.instance_1013 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1013.setTransform(281.6,364.1,0.1767,0.1767,-107.3785,0,0,40,0.1);

	this.instance_1014 = new lib.ch1_headcopy2("synched",0);
	this.instance_1014.setTransform(296.95,341.25,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_1015 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1015.setTransform(295.75,351.7,0.177,0.177,0,0,0,0,-22.9);

	this.instance_1016 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1016.setTransform(299.45,386.9,0.1766,0.1766,-11.9004,0,0,3,-53.8);

	this.instance_1017 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1017.setTransform(296.25,345,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_1018 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1018.setTransform(296.1,363.8,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_1019 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1019.setTransform(296.65,388.55,0.1765,0.1765,36.4478,0,0,4.3,-52.9);

	this.instance_1020 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1020.setTransform(299.8,371.8,0.1765,0.1765,7.775,0,0,-0.1,3.8);

	this.instance_1021 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1021.setTransform(314.7,376.9,0.1766,0.1766,34.1034,0,0,-4.4,2.6);

	this.instance_1022 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1022.setTransform(314.3,374.85,0.1766,0.1766,58.397,0,0,-5.5,7.9);

	this.instance_1023 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1023.setTransform(305,364.1,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_1024 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1024.setTransform(305.1,350.7,0.1767,0.1767,91.2967,0,0,-32.5,-0.7);

	this.instance_1025 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1025.setTransform(292.55,371.3,0.1766,0.1766,-26.6492,0,0,2.1,-44.6);

	this.instance_1026 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1026.setTransform(266.85,331.1,0.1764,0.1764,-63.3662,0,0,35.6,0.8);

	this.instance_1027 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1027.setTransform(261,358.9,0.1764,0.1764,-85.3717,0,0,6.2,-0.8);

	this.instance_1028 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1028.setTransform(262.05,357.8,0.1764,0.1764,-53.0042,0,0,4.8,-7.9);

	this.instance_1029 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1029.setTransform(260.6,343.55,0.1765,0.1765,-95.5726,0,0,39.3,-0.1);

	this.instance_1030 = new lib.ch1_headcopy("synched",0);
	this.instance_1030.setTransform(277,321.1,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1031 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1031.setTransform(275.65,331.6,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_1032 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1032.setTransform(278.55,367.5,0.1764,0.1764,-17.6276,0,0,3.4,-53.6);

	this.instance_1033 = new lib.ch1_neckcopy("synched",0);
	this.instance_1033.setTransform(276.1,324.9,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1034 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1034.setTransform(276,343.65,0.1767,0.1767,0,0,0,0.3,-22.9);

	this.instance_1035 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1035.setTransform(278.75,369.15,0.1763,0.1763,30.7052,0,0,4.4,-53.1);

	this.instance_1036 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1036.setTransform(278.45,352.2,0.1763,0.1763,-3.3484,0,0,1,2.4);

	this.instance_1037 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1037.setTransform(289.2,359.25,0.1765,0.1765,90.2527,0,0,-4.2,1.4);

	this.instance_1038 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1038.setTransform(290.4,357.65,0.1764,0.1764,109.9801,0,0,-6.6,5.1);

	this.instance_1039 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1039.setTransform(287.6,343.65,0.1765,0.1765,78.6599,0,0,-39.8,-2.2);

	this.instance_1040 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1040.setTransform(284.95,330.65,0.1764,0.1764,79.4966,0,0,-32.4,-0.8);

	this.instance_1041 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1041.setTransform(273.05,351.35,0.1764,0.1764,-21.1258,0,0,1.9,-45.8);

	this.instance_1042 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1042.setTransform(348.65,351,0.1765,0.1765,-63.3663,0,0,33.9,1.8);

	this.instance_1043 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1043.setTransform(342.75,378.8,0.1764,0.1764,-85.3672,0,0,4.2,-0.7);

	this.instance_1044 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1044.setTransform(343.8,377.75,0.1764,0.1764,-53.0022,0,0,3.1,-6.7);

	this.instance_1045 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1045.setTransform(342.3,363.45,0.1765,0.1765,-95.577,0,0,37.3,-0.4);

	this.instance_1046 = new lib.ch1_headcopy("synched",0);
	this.instance_1046.setTransform(358.75,341,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_1047 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1047.setTransform(357.4,351.5,0.1768,0.1768,0,0,0,0,-21.5);

	this.instance_1048 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1048.setTransform(360.3,387.4,0.1764,0.1764,-17.6293,0,0,2.5,-51.9);

	this.instance_1049 = new lib.ch1_neckcopy("synched",0);
	this.instance_1049.setTransform(357.85,344.8,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_1050 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1050.setTransform(357.75,363.55,0.1768,0.1768,0,0,0,0.3,-20.9);

	this.instance_1051 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1051.setTransform(360.55,389.05,0.1763,0.1763,30.7069,0,0,5.5,-51.4);

	this.instance_1052 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1052.setTransform(360.2,372.1,0.1764,0.1764,-3.3531,0,0,0.1,4.2);

	this.instance_1053 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1053.setTransform(370.95,379.15,0.1765,0.1765,90.2576,0,0,-2.2,2.3);

	this.instance_1054 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1054.setTransform(372.15,377.55,0.1765,0.1765,109.9814,0,0,-4,6.3);

	this.instance_1055 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1055.setTransform(369.35,363.55,0.1765,0.1765,78.657,0,0,-38,-1);

	this.instance_1056 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1056.setTransform(366.7,350.55,0.1765,0.1765,79.4926,0,0,-30.6,0.4);

	this.instance_1057 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1057.setTransform(354.8,371.25,0.1764,0.1764,-21.1286,0,0,1.2,-43.9);

	this.instance_1058 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1058.setTransform(371.25,342.6,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_1059 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1059.setTransform(370.85,370.6,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_1060 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1060.setTransform(370.3,369.15,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_1061 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1061.setTransform(365.85,355.45,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_1062 = new lib.ch1_headcopy2("synched",0);
	this.instance_1062.setTransform(381.25,332.6,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_1063 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1063.setTransform(380.05,343.05,0.177,0.177,0,0,0,0,-23.8);

	this.instance_1064 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1064.setTransform(383.75,378.25,0.1766,0.1766,-11.9004,0,0,2.6,-53.9);

	this.instance_1065 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1065.setTransform(380.55,336.35,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_1066 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1066.setTransform(380.4,355.15,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_1067 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1067.setTransform(380.95,379.9,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_1068 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1068.setTransform(384.1,363.15,0.1765,0.1765,7.775,0,0,-0.3,2);

	this.instance_1069 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1069.setTransform(399,368.25,0.1766,0.1766,34.1034,0,0,-4.6,2.8);

	this.instance_1070 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1070.setTransform(398.6,366.2,0.1766,0.1766,58.397,0,0,-5.9,8);

	this.instance_1071 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1071.setTransform(389.3,355.45,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_1072 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1072.setTransform(389.4,342.05,0.1767,0.1767,91.2967,0,0,-32.5,-0.4);

	this.instance_1073 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1073.setTransform(376.85,362.65,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_1074 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1074.setTransform(398.6,352.6,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_1075 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1075.setTransform(398.2,380.6,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_1076 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1076.setTransform(397.65,379.15,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_1077 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1077.setTransform(393.2,365.45,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_1078 = new lib.ch1_headcopy2("synched",0);
	this.instance_1078.setTransform(408.6,342.6,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_1079 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1079.setTransform(407.4,353.05,0.177,0.177,0,0,0,0,-24);

	this.instance_1080 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1080.setTransform(411.1,388.25,0.1766,0.1766,-11.9004,0,0,3,-54.1);

	this.instance_1081 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1081.setTransform(407.9,346.35,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_1082 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1082.setTransform(407.75,365.15,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_1083 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1083.setTransform(408.3,389.9,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_1084 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1084.setTransform(411.45,373.15,0.1765,0.1765,7.775,0,0,-0.4,1.8);

	this.instance_1085 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1085.setTransform(426.35,378.25,0.1766,0.1766,34.1034,0,0,-4.4,2.6);

	this.instance_1086 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1086.setTransform(425.95,376.2,0.1766,0.1766,58.397,0,0,-5.8,7.8);

	this.instance_1087 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1087.setTransform(416.65,365.45,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_1088 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1088.setTransform(416.75,352.05,0.1767,0.1767,91.2967,0,0,-32.9,-0.7);

	this.instance_1089 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1089.setTransform(404.2,372.65,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_1090 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1090.setTransform(342.35,315.4,0.1765,0.1765,-63.3663,0,0,33.9,1.8);

	this.instance_1091 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1091.setTransform(336.45,343.2,0.1764,0.1764,-85.3672,0,0,4.2,-0.7);

	this.instance_1092 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1092.setTransform(337.5,342.15,0.1764,0.1764,-53.0022,0,0,3.1,-6.7);

	this.instance_1093 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1093.setTransform(336,327.85,0.1765,0.1765,-95.577,0,0,37.3,-0.4);

	this.instance_1094 = new lib.ch1_headcopy("synched",0);
	this.instance_1094.setTransform(352.45,305.4,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_1095 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1095.setTransform(351.1,315.9,0.1768,0.1768,0,0,0,0,-21.5);

	this.instance_1096 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1096.setTransform(354,351.8,0.1764,0.1764,-17.6293,0,0,2.8,-51.8);

	this.instance_1097 = new lib.ch1_neckcopy("synched",0);
	this.instance_1097.setTransform(351.55,309.2,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_1098 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1098.setTransform(351.45,327.95,0.1768,0.1768,0,0,0,0.3,-20.9);

	this.instance_1099 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1099.setTransform(354.25,353.45,0.1763,0.1763,30.7069,0,0,5.5,-51.4);

	this.instance_1100 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1100.setTransform(353.85,336.5,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_1101 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1101.setTransform(364.65,343.55,0.1765,0.1765,90.2576,0,0,-2.2,2.3);

	this.instance_1102 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1102.setTransform(365.85,341.95,0.1765,0.1765,109.9814,0,0,-4,6.3);

	this.instance_1103 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1103.setTransform(363.05,328,0.1765,0.1765,78.657,0,0,-39.9,-1.4);

	this.instance_1104 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1104.setTransform(360.4,314.95,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_1105 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1105.setTransform(348.5,335.65,0.1764,0.1764,-21.1286,0,0,1.2,-43.9);

	this.instance_1106 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1106.setTransform(383.95,323.5,0.1764,0.1764,-63.3662,0,0,35.6,0.8);

	this.instance_1107 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1107.setTransform(378.1,351.3,0.1764,0.1764,-85.3717,0,0,6.2,-0.8);

	this.instance_1108 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1108.setTransform(379.15,350.25,0.1764,0.1764,-53.0042,0,0,4.5,-7.7);

	this.instance_1109 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1109.setTransform(377.65,335.95,0.1765,0.1765,-95.5726,0,0,39,-0.2);

	this.instance_1110 = new lib.ch1_headcopy("synched",0);
	this.instance_1110.setTransform(394.1,313.5,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1111 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1111.setTransform(392.75,324,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_1112 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1112.setTransform(395.65,359.9,0.1764,0.1764,-17.6276,0,0,3.4,-53.6);

	this.instance_1113 = new lib.ch1_neckcopy("synched",0);
	this.instance_1113.setTransform(393.2,317.3,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1114 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1114.setTransform(393.1,336.05,0.1767,0.1767,0,0,0,0.3,-22.9);

	this.instance_1115 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1115.setTransform(395.85,361.55,0.1763,0.1763,30.7052,0,0,4.4,-53.1);

	this.instance_1116 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1116.setTransform(395.55,344.6,0.1763,0.1763,-3.3484,0,0,1,2.4);

	this.instance_1117 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1117.setTransform(406.3,351.65,0.1765,0.1765,90.2527,0,0,-4.2,1.4);

	this.instance_1118 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1118.setTransform(407.5,350,0.1764,0.1764,109.9801,0,0,-6.5,5.4);

	this.instance_1119 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1119.setTransform(404.7,336.05,0.1765,0.1765,78.6599,0,0,-39.8,-2.2);

	this.instance_1120 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1120.setTransform(402.05,323.05,0.1764,0.1764,79.4966,0,0,-32.4,-0.8);

	this.instance_1121 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1121.setTransform(390.15,343.75,0.1764,0.1764,-21.1258,0,0,1.9,-45.8);

	this.instance_1122 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1122.setTransform(364.85,296.7,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_1123 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1123.setTransform(364.45,324.7,0.1766,0.1766,-110.4784,0,0,5.5,-1.6);

	this.instance_1124 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1124.setTransform(363.9,323.25,0.1766,0.1766,-120.7456,0,0,4.4,-9);

	this.instance_1125 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1125.setTransform(359.5,309.55,0.1767,0.1767,-107.3785,0,0,40,0.1);

	this.instance_1126 = new lib.ch1_headcopy2("synched",0);
	this.instance_1126.setTransform(374.85,286.7,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_1127 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1127.setTransform(373.65,297.15,0.177,0.177,0,0,0,0,-22.1);

	this.instance_1128 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1128.setTransform(377.35,332.35,0.1766,0.1766,-11.9004,0,0,4.6,-53.5);

	this.instance_1129 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1129.setTransform(374.15,290.45,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_1130 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1130.setTransform(374,309.25,0.177,0.177,0,0,0,0.3,-22.3);

	this.instance_1131 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1131.setTransform(374.55,334,0.1765,0.1765,36.4478,0,0,4.3,-52.9);

	this.instance_1132 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1132.setTransform(377.7,317.25,0.1765,0.1765,7.775,0,0,0.8,3.6);

	this.instance_1133 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1133.setTransform(392.6,322.35,0.1766,0.1766,34.1034,0,0,-2.5,2.4);

	this.instance_1134 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1134.setTransform(392.2,320.3,0.1766,0.1766,58.397,0,0,-5.5,7.9);

	this.instance_1135 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1135.setTransform(382.9,309.55,0.1766,0.1766,49.3031,0,0,-39.6,-0.5);

	this.instance_1136 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1136.setTransform(383.05,296.15,0.1767,0.1767,91.2967,0,0,-32.6,-1.6);

	this.instance_1137 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1137.setTransform(370.45,316.75,0.1766,0.1766,-26.6492,0,0,1.7,-43.8);

	this.instance_1138 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_1138.setTransform(295.95,320.45,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_1139 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1139.setTransform(307.55,345.05,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_1140 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_1140.setTransform(306.9,343.65,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_1141 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_1141.setTransform(296,334.45,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_1142 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_1142.setTransform(306.2,310.6,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_1143 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_1143.setTransform(304.8,320.9,0.177,0.177,0,0,0,0,-24);

	this.instance_1144 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_1144.setTransform(300.3,357.9,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_1145 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_1145.setTransform(305.2,314.25,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_1146 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_1146.setTransform(305.15,333.05,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_1147 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_1147.setTransform(312.45,357.65,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_1148 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_1148.setTransform(308.65,341.1,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_1149 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_1149.setTransform(309.65,349.2,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_1150 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_1150.setTransform(310.2,347.25,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_1151 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_1151.setTransform(311.9,333.2,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_1152 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_1152.setTransform(314.15,319.9,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_1153 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_1153.setTransform(302.55,340.75,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_1154 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1154.setTransform(318.05,304.2,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_1155 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1155.setTransform(317.65,332.15,0.1766,0.1766,-110.4784,0,0,4.7,-1.9);

	this.instance_1156 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1156.setTransform(317.05,330.75,0.1766,0.1766,-120.7456,0,0,3.6,-9.4);

	this.instance_1157 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1157.setTransform(312.7,317.05,0.1767,0.1767,-107.3785,0,0,40,0.1);

	this.instance_1158 = new lib.ch1_headcopy2("synched",0);
	this.instance_1158.setTransform(328.05,294.2,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_1159 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1159.setTransform(326.85,304.65,0.177,0.177,0,0,0,0,-22.1);

	this.instance_1160 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1160.setTransform(330.55,339.85,0.1766,0.1766,-11.9004,0,0,2.8,-53);

	this.instance_1161 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1161.setTransform(327.35,297.95,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_1162 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1162.setTransform(327.2,316.75,0.177,0.177,0,0,0,0.3,-21.4);

	this.instance_1163 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1163.setTransform(327.75,341.5,0.1765,0.1765,36.4478,0,0,4.8,-52.1);

	this.instance_1164 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1164.setTransform(330.9,324.75,0.1765,0.1765,7.775,0,0,-0.1,3.8);

	this.instance_1165 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1165.setTransform(345.8,329.85,0.1766,0.1766,34.1034,0,0,-3.5,4);

	this.instance_1166 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1166.setTransform(345.4,327.8,0.1766,0.1766,58.397,0,0,-5.5,7.9);

	this.instance_1167 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1167.setTransform(336.1,317.05,0.1766,0.1766,49.3031,0,0,-39,0.1);

	this.instance_1168 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1168.setTransform(336.15,303.65,0.1767,0.1767,91.2967,0,0,-31.2,-0.7);

	this.instance_1169 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1169.setTransform(323.65,324.2,0.1766,0.1766,-26.6492,0,0,1.6,-43.6);

	this.instance_1170 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1170.setTransform(273.85,304.2,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_1171 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1171.setTransform(273.45,332.15,0.1766,0.1766,-110.4784,0,0,4.7,-1.9);

	this.instance_1172 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1172.setTransform(272.85,330.75,0.1766,0.1766,-120.7456,0,0,3.6,-9.4);

	this.instance_1173 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1173.setTransform(268.5,317.05,0.1767,0.1767,-107.3785,0,0,40,0.1);

	this.instance_1174 = new lib.ch1_headcopy2("synched",0);
	this.instance_1174.setTransform(283.85,294.2,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_1175 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1175.setTransform(282.65,304.65,0.177,0.177,0,0,0,0,-22.1);

	this.instance_1176 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1176.setTransform(286.4,339.85,0.1766,0.1766,-11.9004,0,0,4.5,-52.6);

	this.instance_1177 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1177.setTransform(283.15,297.95,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_1178 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1178.setTransform(283,316.75,0.177,0.177,0,0,0,0.3,-21.4);

	this.instance_1179 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1179.setTransform(283.55,341.5,0.1765,0.1765,36.4478,0,0,4.8,-52.1);

	this.instance_1180 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1180.setTransform(286.7,324.75,0.1765,0.1765,7.775,0,0,1.9,3.5);

	this.instance_1181 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1181.setTransform(301.6,329.85,0.1766,0.1766,34.1034,0,0,-2,3.1);

	this.instance_1182 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1182.setTransform(301.15,327.8,0.1766,0.1766,58.397,0,0,-4.7,6.5);

	this.instance_1183 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1183.setTransform(291.9,317.05,0.1766,0.1766,49.3031,0,0,-37.6,-1.4);

	this.instance_1184 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1184.setTransform(291.95,303.65,0.1767,0.1767,91.2967,0,0,-31.2,-2.4);

	this.instance_1185 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1185.setTransform(279.45,324.2,0.1766,0.1766,-26.6492,0,0,1.6,-43.6);

	this.instance_1186 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1186.setTransform(222.95,344.35,0.1764,0.1764,-63.3685,0,0,35.4,1);

	this.instance_1187 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1187.setTransform(217.15,372.15,0.1764,0.1764,-85.3759,0,0,5.4,-0.7);

	this.instance_1188 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1188.setTransform(218.15,371.1,0.1763,0.1763,-53.0052,0,0,3.9,-7.2);

	this.instance_1189 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1189.setTransform(216.65,356.8,0.1764,0.1764,-95.5681,0,0,38.2,-0.2);

	this.instance_1190 = new lib.ch1_headcopy("synched",0);
	this.instance_1190.setTransform(233.1,334.35,0.1766,0.1766,-1.0201,0,0,1.4,52.7);

	this.instance_1191 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1191.setTransform(231.75,344.85,0.1767,0.1767,0,0,0,0,-22.7);

	this.instance_1192 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1192.setTransform(234.65,380.75,0.1763,0.1763,-17.6244,0,0,4.9,-52.9);

	this.instance_1193 = new lib.ch1_neckcopy("synched",0);
	this.instance_1193.setTransform(232.2,338.15,0.1765,0.1765,10.6796,0,0,-0.7,8.8);

	this.instance_1194 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1194.setTransform(232.1,356.9,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_1195 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1195.setTransform(234.85,382.4,0.1762,0.1762,30.706,0,0,4.9,-52.4);

	this.instance_1196 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1196.setTransform(234.55,365.45,0.1763,0.1763,-3.344,0,0,1,2.4);

	this.instance_1197 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1197.setTransform(245.3,372.5,0.1764,0.1764,90.2478,0,0,-3.4,0.6);

	this.instance_1198 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1198.setTransform(246.5,370.9,0.1764,0.1764,109.9772,0,0,-6.3,5);

	this.instance_1199 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1199.setTransform(243.7,356.95,0.1764,0.1764,78.6638,0,0,-39.5,-3.3);

	this.instance_1200 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1200.setTransform(241.05,343.9,0.1764,0.1764,79.5006,0,0,-32.5,0);

	this.instance_1201 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1201.setTransform(229.15,364.6,0.1764,0.1764,-21.1229,0,0,1.6,-45);

	this.instance_1202 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1202.setTransform(243.55,322.5,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_1203 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1203.setTransform(243.15,350.5,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_1204 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1204.setTransform(242.6,349.05,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_1205 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1205.setTransform(238.15,335.35,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_1206 = new lib.ch1_headcopy2("synched",0);
	this.instance_1206.setTransform(253.55,312.5,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_1207 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1207.setTransform(252.35,322.95,0.177,0.177,0,0,0,0,-23.8);

	this.instance_1208 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1208.setTransform(256.05,358.15,0.1766,0.1766,-11.9004,0,0,3,-54.1);

	this.instance_1209 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1209.setTransform(252.85,316.25,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_1210 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1210.setTransform(252.7,335.05,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_1211 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1211.setTransform(253.25,359.8,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_1212 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1212.setTransform(256.4,343.05,0.1765,0.1765,7.775,0,0,-0.3,2);

	this.instance_1213 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1213.setTransform(271.3,348.15,0.1766,0.1766,34.1034,0,0,-4.4,2.6);

	this.instance_1214 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1214.setTransform(270.9,346.1,0.1766,0.1766,58.397,0,0,-5.8,7.8);

	this.instance_1215 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1215.setTransform(261.6,335.35,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_1216 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1216.setTransform(261.7,321.95,0.1767,0.1767,91.2967,0,0,-32.9,-0.7);

	this.instance_1217 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1217.setTransform(249.15,342.55,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_1218 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1218.setTransform(299.7,283.95,0.1765,0.1765,-63.3663,0,0,35.4,1);

	this.instance_1219 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1219.setTransform(293.85,311.75,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_1220 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1220.setTransform(294.9,310.7,0.1764,0.1764,-53.0022,0,0,3.1,-6.7);

	this.instance_1221 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1221.setTransform(293.4,296.4,0.1765,0.1765,-95.577,0,0,37.3,-0.4);

	this.instance_1222 = new lib.ch1_headcopy("synched",0);
	this.instance_1222.setTransform(309.85,273.95,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_1223 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1223.setTransform(308.5,284.45,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_1224 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1224.setTransform(311.4,320.3,0.1764,0.1764,-17.6293,0,0,3.3,-53.4);

	this.instance_1225 = new lib.ch1_neckcopy("synched",0);
	this.instance_1225.setTransform(308.95,277.75,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_1226 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1226.setTransform(308.85,296.5,0.1768,0.1768,0,0,0,0.3,-22.7);

	this.instance_1227 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1227.setTransform(311.6,322,0.1763,0.1763,30.7069,0,0,4.9,-52.4);

	this.instance_1228 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1228.setTransform(311.25,305.05,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_1229 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1229.setTransform(322.05,312.1,0.1765,0.1765,90.2576,0,0,-4.2,2.3);

	this.instance_1230 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1230.setTransform(323.25,310.5,0.1765,0.1765,109.9814,0,0,-6,6.1);

	this.instance_1231 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1231.setTransform(320.45,296.55,0.1765,0.1765,78.657,0,0,-39.9,-1.4);

	this.instance_1232 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1232.setTransform(317.8,283.5,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_1233 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1233.setTransform(305.9,304.2,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_1234 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1234.setTransform(329.1,273.9,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_1235 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1235.setTransform(328.7,301.9,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_1236 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1236.setTransform(328.15,300.45,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_1237 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1237.setTransform(323.7,286.75,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_1238 = new lib.ch1_headcopy2("synched",0);
	this.instance_1238.setTransform(339.1,263.9,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_1239 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1239.setTransform(337.9,274.35,0.177,0.177,0,0,0,0,-23.8);

	this.instance_1240 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1240.setTransform(341.6,309.55,0.1766,0.1766,-11.9004,0,0,4.7,-53.7);

	this.instance_1241 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1241.setTransform(338.4,267.65,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_1242 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1242.setTransform(338.25,286.45,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_1243 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1243.setTransform(338.8,311.2,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_1244 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1244.setTransform(341.95,294.45,0.1765,0.1765,7.775,0,0,1.4,1.8);

	this.instance_1245 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1245.setTransform(356.85,299.55,0.1766,0.1766,34.1034,0,0,-3,1.7);

	this.instance_1246 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1246.setTransform(356.45,297.5,0.1766,0.1766,58.397,0,0,-5.8,7.8);

	this.instance_1247 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1247.setTransform(347.15,286.75,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_1248 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1248.setTransform(347.25,273.35,0.1767,0.1767,91.2967,0,0,-32.6,-2.4);

	this.instance_1249 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1249.setTransform(334.7,293.95,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_1250 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_1250.setTransform(355,269.35,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_1251 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1251.setTransform(366.6,293.95,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_1252 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_1252.setTransform(365.95,292.55,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_1253 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_1253.setTransform(355.05,283.35,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_1254 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_1254.setTransform(365.25,259.5,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_1255 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_1255.setTransform(363.85,269.8,0.177,0.177,0,0,0,0,-24);

	this.instance_1256 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_1256.setTransform(359.35,306.8,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_1257 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_1257.setTransform(364.25,263.15,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_1258 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_1258.setTransform(364.2,281.95,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_1259 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_1259.setTransform(371.5,306.55,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_1260 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_1260.setTransform(367.7,290,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_1261 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_1261.setTransform(368.7,298.1,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_1262 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_1262.setTransform(369.25,296.15,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_1263 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_1263.setTransform(370.95,282.1,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_1264 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_1264.setTransform(373.2,268.8,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_1265 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_1265.setTransform(361.6,289.65,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_1266 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1266.setTransform(335.95,243,0.1765,0.1765,-63.3663,0,0,35.6,0.8);

	this.instance_1267 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1267.setTransform(330.1,270.8,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_1268 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1268.setTransform(331.15,269.75,0.1764,0.1764,-53.0022,0,0,4.5,-7.7);

	this.instance_1269 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1269.setTransform(329.65,255.45,0.1765,0.1765,-95.577,0,0,39,-0.2);

	this.instance_1270 = new lib.ch1_headcopy("synched",0);
	this.instance_1270.setTransform(346.1,233,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_1271 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1271.setTransform(344.75,243.5,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_1272 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1272.setTransform(347.65,279.4,0.1764,0.1764,-17.6293,0,0,3.1,-53.8);

	this.instance_1273 = new lib.ch1_neckcopy("synched",0);
	this.instance_1273.setTransform(345.2,236.8,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_1274 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1274.setTransform(345.1,255.55,0.1768,0.1768,0,0,0,0.3,-22.9);

	this.instance_1275 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1275.setTransform(347.85,281.05,0.1763,0.1763,30.7069,0,0,4.4,-53.1);

	this.instance_1276 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1276.setTransform(347.5,264.1,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_1277 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1277.setTransform(358.3,271.15,0.1765,0.1765,90.2576,0,0,-4.2,2.3);

	this.instance_1278 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1278.setTransform(359.5,269.55,0.1765,0.1765,109.9814,0,0,-5.8,7.2);

	this.instance_1279 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1279.setTransform(356.7,255.6,0.1765,0.1765,78.657,0,0,-39.9,-1.4);

	this.instance_1280 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1280.setTransform(354.05,242.55,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_1281 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1281.setTransform(342.15,263.25,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_1282 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1282.setTransform(419.15,324.5,0.1765,0.1765,-63.3663,0,0,35.6,0.8);

	this.instance_1283 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1283.setTransform(413.3,352.3,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_1284 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1284.setTransform(414.35,351.2,0.1764,0.1764,-53.0022,0,0,4.8,-7.9);

	this.instance_1285 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1285.setTransform(412.9,336.95,0.1765,0.1765,-95.577,0,0,39.3,-0.1);

	this.instance_1286 = new lib.ch1_headcopy("synched",0);
	this.instance_1286.setTransform(429.3,314.5,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_1287 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1287.setTransform(427.95,325,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_1288 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1288.setTransform(430.85,360.9,0.1764,0.1764,-17.6293,0,0,5,-53.1);

	this.instance_1289 = new lib.ch1_neckcopy("synched",0);
	this.instance_1289.setTransform(428.4,318.3,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_1290 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1290.setTransform(428.3,337.05,0.1768,0.1768,0,0,0,0.3,-22.9);

	this.instance_1291 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1291.setTransform(431.05,362.55,0.1763,0.1763,30.7069,0,0,4.4,-53.1);

	this.instance_1292 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1292.setTransform(430.7,345.6,0.1764,0.1764,-3.3531,0,0,2.1,2.4);

	this.instance_1293 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1293.setTransform(441.5,352.65,0.1765,0.1765,90.2576,0,0,-4.2,0.3);

	this.instance_1294 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1294.setTransform(442.7,351,0.1765,0.1765,109.9814,0,0,-6.5,5.4);

	this.instance_1295 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1295.setTransform(439.9,337.1,0.1765,0.1765,78.657,0,0,-39.5,-3.3);

	this.instance_1296 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1296.setTransform(437.25,324.05,0.1765,0.1765,79.4926,0,0,-32.2,-1.9);

	this.instance_1297 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1297.setTransform(425.35,344.75,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_1298 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_1298.setTransform(399.2,299.95,0.1767,0.1767,-90.7274,0,0,33.6,2.7);

	this.instance_1299 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1299.setTransform(411.2,324.3,0.1766,0.1766,-148.1515,0,0,3.9,-2.4);

	this.instance_1300 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_1300.setTransform(410.55,322.85,0.1766,0.1766,-124.7925,0,0,3.3,-7.7);

	this.instance_1301 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_1301.setTransform(399.6,313.95,0.1766,0.1766,-141.5745,0,0,37.8,2.6);

	this.instance_1302 = new lib.ch1_headcopy_1("synched",0);
	this.instance_1302.setTransform(409.3,290.1,0.1768,0.1768,-3.6127,0,0,3.3,55.5);

	this.instance_1303 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_1303.setTransform(407.9,300.4,0.177,0.177,0,0,0,0,-22.1);

	this.instance_1304 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_1304.setTransform(405.05,337.55,0.1766,0.1766,16.7817,0,0,5.9,-53.2);

	this.instance_1305 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_1305.setTransform(408.4,293.75,0.1768,0.1768,12.084,0,0,0.2,10.7);

	this.instance_1306 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_1306.setTransform(408.2,312.55,0.177,0.177,0,0,0,1.7,-21.2);

	this.instance_1307 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_1307.setTransform(414.35,337.55,0.1765,0.1765,-11.5673,0,0,4.8,-53.1);

	this.instance_1308 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_1308.setTransform(410.95,320.95,0.1765,0.1765,-14.6957,0,0,0.8,4.6);

	this.instance_1309 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_1309.setTransform(417.55,325.05,0.1766,0.1766,58.7239,0,0,-2.1,2.4);

	this.instance_1310 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_1310.setTransform(418.4,323.25,0.1767,0.1767,96.3621,0,0,-4.7,6.8);

	this.instance_1311 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_1311.setTransform(410.8,311.2,0.1766,0.1766,58.0481,0,0,-37.8,-1.6);

	this.instance_1312 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_1312.setTransform(417.2,299.4,0.1766,0.1766,119.3041,0,0,-33,-3.2);

	this.instance_1313 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_1313.setTransform(406.25,320.45,0.1767,0.1767,1.8114,0,0,3.6,-45.7);

	this.instance_1314 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1314.setTransform(419.4,287.4,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_1315 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1315.setTransform(419,315.4,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_1316 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1316.setTransform(418.45,313.95,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_1317 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1317.setTransform(414,300.25,0.1767,0.1767,-107.3785,0,0,40.3,0.1);

	this.instance_1318 = new lib.ch1_headcopy2("synched",0);
	this.instance_1318.setTransform(429.4,277.4,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_1319 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1319.setTransform(428.2,287.85,0.177,0.177,0,0,0,0,-24);

	this.instance_1320 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1320.setTransform(431.9,323.05,0.1766,0.1766,-11.9004,0,0,3.9,-53.9);

	this.instance_1321 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1321.setTransform(428.7,281.15,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_1322 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1322.setTransform(428.55,299.95,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_1323 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1323.setTransform(429.1,324.7,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_1324 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1324.setTransform(432.25,307.95,0.1765,0.1765,7.775,0,0,-0.4,1.8);

	this.instance_1325 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1325.setTransform(447.15,313.05,0.1766,0.1766,34.1034,0,0,-3.7,2.1);

	this.instance_1326 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1326.setTransform(446.75,311,0.1766,0.1766,58.397,0,0,-6,7.6);

	this.instance_1327 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1327.setTransform(437.45,300.25,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_1328 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1328.setTransform(437.55,286.85,0.1767,0.1767,91.2967,0,0,-33.1,-0.7);

	this.instance_1329 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1329.setTransform(425,307.45,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_1330 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_1330.setTransform(382.95,279.5,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_1331 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1331.setTransform(394.55,304.1,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_1332 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_1332.setTransform(393.9,302.7,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_1333 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_1333.setTransform(383,293.5,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_1334 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_1334.setTransform(393.2,269.65,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_1335 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_1335.setTransform(391.8,279.95,0.177,0.177,0,0,0,0,-24);

	this.instance_1336 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_1336.setTransform(387.3,316.95,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_1337 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_1337.setTransform(392.2,273.3,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_1338 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_1338.setTransform(392.15,292.1,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_1339 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_1339.setTransform(399.45,316.7,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_1340 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_1340.setTransform(395.65,300.15,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_1341 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_1341.setTransform(396.65,308.25,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_1342 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_1342.setTransform(397.2,306.3,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_1343 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_1343.setTransform(398.9,292.25,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_1344 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_1344.setTransform(401.15,278.95,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_1345 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_1345.setTransform(389.55,299.8,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_1346 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1346.setTransform(404.05,268.45,0.1765,0.1765,-63.3663,0,0,35.4,1);

	this.instance_1347 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1347.setTransform(398.2,296.25,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_1348 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1348.setTransform(399.25,295.2,0.1764,0.1764,-53.0022,0,0,3.1,-6.7);

	this.instance_1349 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1349.setTransform(397.75,280.9,0.1765,0.1765,-95.577,0,0,37.3,-0.4);

	this.instance_1350 = new lib.ch1_headcopy("synched",0);
	this.instance_1350.setTransform(414.2,258.45,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_1351 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1351.setTransform(412.85,268.95,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_1352 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1352.setTransform(415.75,304.85,0.1764,0.1764,-17.6293,0,0,4.1,-53.1);

	this.instance_1353 = new lib.ch1_neckcopy("synched",0);
	this.instance_1353.setTransform(413.3,262.25,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_1354 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1354.setTransform(413.2,281,0.1768,0.1768,0,0,0,0.3,-22.7);

	this.instance_1355 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1355.setTransform(415.95,306.5,0.1763,0.1763,30.7069,0,0,4.9,-52.4);

	this.instance_1356 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1356.setTransform(415.6,289.55,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_1357 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1357.setTransform(426.4,296.6,0.1765,0.1765,90.2576,0,0,-4.2,2.3);

	this.instance_1358 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1358.setTransform(427.55,295,0.1765,0.1765,109.9814,0,0,-6.2,5.3);

	this.instance_1359 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1359.setTransform(424.8,281.05,0.1765,0.1765,78.657,0,0,-39.6,-3);

	this.instance_1360 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1360.setTransform(422.15,268,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_1361 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1361.setTransform(410.25,288.7,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_1362 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1362.setTransform(378.6,246.5,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_1363 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1363.setTransform(378.2,274.5,0.1766,0.1766,-110.4784,0,0,6.2,-1.3);

	this.instance_1364 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1364.setTransform(377.65,273.05,0.1766,0.1766,-120.7456,0,0,5,-8.5);

	this.instance_1365 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1365.setTransform(373.25,259.35,0.1767,0.1767,-107.3785,0,0,40,0.1);

	this.instance_1366 = new lib.ch1_headcopy2("synched",0);
	this.instance_1366.setTransform(388.6,236.5,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_1367 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1367.setTransform(387.4,246.95,0.177,0.177,0,0,0,0,-23.8);

	this.instance_1368 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1368.setTransform(391.1,282.15,0.1766,0.1766,-11.9004,0,0,2.6,-53.9);

	this.instance_1369 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1369.setTransform(387.9,240.25,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_1370 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1370.setTransform(387.75,259.05,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_1371 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1371.setTransform(388.3,283.8,0.1765,0.1765,36.4478,0,0,3.8,-53.6);

	this.instance_1372 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1372.setTransform(391.45,267.05,0.1765,0.1765,7.775,0,0,-0.3,2);

	this.instance_1373 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1373.setTransform(406.35,272.15,0.1766,0.1766,34.1034,0,0,-4.6,2.8);

	this.instance_1374 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1374.setTransform(405.9,270.1,0.1766,0.1766,58.397,0,0,-5.7,8.2);

	this.instance_1375 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1375.setTransform(396.65,259.35,0.1766,0.1766,49.3031,0,0,-40.2,-1);

	this.instance_1376 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1376.setTransform(396.75,245.95,0.1767,0.1767,91.2967,0,0,-32.5,-0.4);

	this.instance_1377 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1377.setTransform(384.2,266.55,0.1766,0.1766,-26.6492,0,0,2.5,-45.4);

	this.instance_1378 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1378.setTransform(152.15,404.35,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_1379 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1379.setTransform(146.3,432.15,0.1764,0.1764,-85.3717,0,0,6.2,-0.8);

	this.instance_1380 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1380.setTransform(147.35,431.1,0.1764,0.1764,-53.0042,0,0,3.9,-7.2);

	this.instance_1381 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1381.setTransform(145.85,416.8,0.1765,0.1765,-95.5726,0,0,38.1,-0.2);

	this.instance_1382 = new lib.ch1_headcopy("synched",0);
	this.instance_1382.setTransform(162.3,394.35,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1383 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1383.setTransform(160.95,404.85,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_1384 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1384.setTransform(163.85,440.75,0.1764,0.1764,-17.6276,0,0,3.3,-53.4);

	this.instance_1385 = new lib.ch1_neckcopy("synched",0);
	this.instance_1385.setTransform(161.4,398.15,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1386 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1386.setTransform(161.3,416.9,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_1387 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1387.setTransform(164.05,442.4,0.1763,0.1763,30.7052,0,0,4.4,-53.1);

	this.instance_1388 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1388.setTransform(163.7,425.45,0.1763,0.1763,-3.3484,0,0,0.1,2.3);

	this.instance_1389 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1389.setTransform(174.5,432.5,0.1765,0.1765,90.2527,0,0,-4.2,2.3);

	this.instance_1390 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1390.setTransform(175.7,430.9,0.1764,0.1764,109.9801,0,0,-5.7,6.9);

	this.instance_1391 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1391.setTransform(172.9,416.95,0.1765,0.1765,78.6599,0,0,-39.9,-1.4);

	this.instance_1392 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1392.setTransform(170.25,403.9,0.1764,0.1764,79.4966,0,0,-32.5,0);

	this.instance_1393 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1393.setTransform(158.35,424.6,0.1764,0.1764,-21.1258,0,0,1.9,-45.8);

	this.instance_1394 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1394.setTransform(84,379,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_1395 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1395.setTransform(78.15,406.8,0.1764,0.1764,-85.3717,0,0,6.2,-0.8);

	this.instance_1396 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1396.setTransform(79.2,405.75,0.1764,0.1764,-53.0042,0,0,4.5,-7.7);

	this.instance_1397 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1397.setTransform(77.7,391.45,0.1765,0.1765,-95.5726,0,0,39,-0.2);

	this.instance_1398 = new lib.ch1_headcopy("synched",0);
	this.instance_1398.setTransform(94.15,369,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1399 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1399.setTransform(92.8,379.5,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_1400 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1400.setTransform(95.7,415.4,0.1764,0.1764,-17.6276,0,0,3.3,-53.4);

	this.instance_1401 = new lib.ch1_neckcopy("synched",0);
	this.instance_1401.setTransform(93.25,372.8,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1402 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1402.setTransform(93.15,391.55,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_1403 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1403.setTransform(95.9,417.05,0.1763,0.1763,30.7052,0,0,4.4,-53.1);

	this.instance_1404 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1404.setTransform(95.55,400.1,0.1763,0.1763,-3.3484,0,0,0.1,2.3);

	this.instance_1405 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1405.setTransform(106.35,407.15,0.1765,0.1765,90.2527,0,0,-4.2,2.3);

	this.instance_1406 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1406.setTransform(107.55,405.55,0.1764,0.1764,109.9801,0,0,-5.7,6.9);

	this.instance_1407 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1407.setTransform(104.75,391.6,0.1765,0.1765,78.6599,0,0,-39.9,-1.4);

	this.instance_1408 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1408.setTransform(102.1,378.55,0.1764,0.1764,79.4966,0,0,-32.5,0);

	this.instance_1409 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1409.setTransform(90.2,399.25,0.1764,0.1764,-21.1258,0,0,1.9,-45.8);

	this.instance_1410 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1410.setTransform(47.7,419.8,0.1764,0.1764,-63.3662,0,0,35.6,0.8);

	this.instance_1411 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1411.setTransform(41.85,447.6,0.1764,0.1764,-85.3717,0,0,6.2,-0.8);

	this.instance_1412 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1412.setTransform(42.9,446.55,0.1764,0.1764,-53.0042,0,0,4.5,-7.7);

	this.instance_1413 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1413.setTransform(41.4,432.25,0.1765,0.1765,-95.5726,0,0,39,-0.2);

	this.instance_1414 = new lib.ch1_headcopy("synched",0);
	this.instance_1414.setTransform(57.85,409.8,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1415 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1415.setTransform(56.5,420.3,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_1416 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1416.setTransform(59.4,456.2,0.1764,0.1764,-17.6276,0,0,3.4,-53.6);

	this.instance_1417 = new lib.ch1_neckcopy("synched",0);
	this.instance_1417.setTransform(56.95,413.6,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1418 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1418.setTransform(56.85,432.35,0.1767,0.1767,0,0,0,0.3,-22.9);

	this.instance_1419 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1419.setTransform(59.6,457.85,0.1763,0.1763,30.7052,0,0,4.4,-53.1);

	this.instance_1420 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1420.setTransform(59.3,440.9,0.1763,0.1763,-3.3484,0,0,1,2.4);

	this.instance_1421 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1421.setTransform(70.05,447.95,0.1765,0.1765,90.2527,0,0,-4.2,1.4);

	this.instance_1422 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1422.setTransform(71.25,446.3,0.1764,0.1764,109.9801,0,0,-6.5,5.4);

	this.instance_1423 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1423.setTransform(68.45,432.35,0.1765,0.1765,78.6599,0,0,-39.8,-2.2);

	this.instance_1424 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1424.setTransform(65.8,419.35,0.1764,0.1764,79.4966,0,0,-32.4,-0.8);

	this.instance_1425 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1425.setTransform(53.9,440.05,0.1764,0.1764,-21.1258,0,0,1.9,-45.8);

	this.instance_1426 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1426.setTransform(57.8,390.3,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_1427 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1427.setTransform(52,418.1,0.1764,0.1764,-85.3717,0,0,5.4,-0.7);

	this.instance_1428 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1428.setTransform(53,417.05,0.1764,0.1764,-53.0042,0,0,3,-6.5);

	this.instance_1429 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1429.setTransform(51.5,402.75,0.1765,0.1765,-95.5726,0,0,37.1,-0.4);

	this.instance_1430 = new lib.ch1_headcopy("synched",0);
	this.instance_1430.setTransform(67.95,380.3,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1431 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1431.setTransform(66.6,390.8,0.1767,0.1767,0,0,0,0,-22.7);

	this.instance_1432 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1432.setTransform(69.5,426.7,0.1764,0.1764,-17.6276,0,0,3,-52.6);

	this.instance_1433 = new lib.ch1_neckcopy("synched",0);
	this.instance_1433.setTransform(67.05,384.1,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1434 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1434.setTransform(66.95,402.85,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_1435 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1435.setTransform(69.7,428.4,0.1763,0.1763,30.7052,0,0,5.3,-51.6);

	this.instance_1436 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1436.setTransform(69.4,411.4,0.1763,0.1763,-3.3484,0,0,0.5,2.3);

	this.instance_1437 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1437.setTransform(80.15,418.45,0.1765,0.1765,90.2527,0,0,-3.4,2);

	this.instance_1438 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1438.setTransform(81.35,416.85,0.1764,0.1764,109.9801,0,0,-4,6.3);

	this.instance_1439 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1439.setTransform(78.55,402.9,0.1765,0.1765,78.6599,0,0,-39.8,-1.9);

	this.instance_1440 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1440.setTransform(75.9,389.85,0.1764,0.1764,79.4966,0,0,-32.5,0);

	this.instance_1441 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1441.setTransform(64,410.55,0.1764,0.1764,-21.1258,0,0,1.2,-44.2);

	this.instance_1442 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1442.setTransform(126.65,382.5,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_1443 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1443.setTransform(126.25,410.45,0.1766,0.1766,-110.4755,0,0,4.7,-1.9);

	this.instance_1444 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1444.setTransform(125.7,409.05,0.1766,0.1766,-120.7464,0,0,3.6,-9.4);

	this.instance_1445 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1445.setTransform(121.3,395.35,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_1446 = new lib.ch1_headcopy2("synched",0);
	this.instance_1446.setTransform(136.65,372.5,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1447 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1447.setTransform(135.45,382.95,0.1769,0.1769,0,0,0,0,-21.8);

	this.instance_1448 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1448.setTransform(139.15,418.15,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_1449 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1449.setTransform(135.95,376.25,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1450 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1450.setTransform(135.8,395.05,0.1769,0.1769,0,0,0,0.3,-21.5);

	this.instance_1451 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1451.setTransform(136.35,419.8,0.1764,0.1764,36.4467,0,0,4.8,-52.1);

	this.instance_1452 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1452.setTransform(139.5,403.05,0.1765,0.1765,7.7707,0,0,-0.1,4);

	this.instance_1453 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1453.setTransform(154.4,408.15,0.1766,0.1766,34.102,0,0,-3.5,4);

	this.instance_1454 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1454.setTransform(153.95,406.1,0.1766,0.1766,58.3987,0,0,-5.7,8.2);

	this.instance_1455 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1455.setTransform(144.7,395.35,0.1766,0.1766,49.3036,0,0,-39,0.1);

	this.instance_1456 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1456.setTransform(144.8,381.95,0.1767,0.1767,91.2918,0,0,-31.7,-0.7);

	this.instance_1457 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1457.setTransform(132.25,402.55,0.1765,0.1765,-26.647,0,0,1.7,-43.8);

	this.instance_1458 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1458.setTransform(29.5,403.25,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_1459 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1459.setTransform(29.1,431.25,0.1766,0.1766,-110.4755,0,0,6.2,-1.3);

	this.instance_1460 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1460.setTransform(28.55,429.8,0.1766,0.1766,-120.7464,0,0,5,-8.5);

	this.instance_1461 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1461.setTransform(24.15,416.1,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_1462 = new lib.ch1_headcopy2("synched",0);
	this.instance_1462.setTransform(39.5,393.25,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1463 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1463.setTransform(38.3,403.7,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_1464 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1464.setTransform(42,438.9,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_1465 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1465.setTransform(38.8,397,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1466 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1466.setTransform(38.65,415.8,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_1467 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1467.setTransform(39.2,440.55,0.1764,0.1764,36.4467,0,0,3.8,-53.6);

	this.instance_1468 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1468.setTransform(42.35,423.8,0.1765,0.1765,7.7707,0,0,-0.3,2);

	this.instance_1469 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1469.setTransform(57.25,428.9,0.1766,0.1766,34.102,0,0,-4.4,2.6);

	this.instance_1470 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1470.setTransform(56.85,426.85,0.1766,0.1766,58.3987,0,0,-5.5,7.9);

	this.instance_1471 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1471.setTransform(47.55,416.1,0.1766,0.1766,49.3036,0,0,-40.2,-1);

	this.instance_1472 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1472.setTransform(47.65,402.7,0.1767,0.1767,91.2918,0,0,-32.5,-0.7);

	this.instance_1473 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1473.setTransform(35.1,423.3,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_1474 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1474.setTransform(11.45,377.25,0.1764,0.1764,-63.3662,0,0,34.6,1.4);

	this.instance_1475 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1475.setTransform(5.6,405.05,0.1764,0.1764,-85.3717,0,0,4.5,-0.7);

	this.instance_1476 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1476.setTransform(6.65,404,0.1764,0.1764,-53.0042,0,0,3.1,-6.7);

	this.instance_1477 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1477.setTransform(5.15,389.7,0.1765,0.1765,-95.5726,0,0,37.4,-0.4);

	this.instance_1478 = new lib.ch1_headcopy("synched",0);
	this.instance_1478.setTransform(21.6,367.25,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1479 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1479.setTransform(20.25,377.75,0.1767,0.1767,0,0,0,0,-21.5);

	this.instance_1480 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1480.setTransform(23.15,413.65,0.1764,0.1764,-17.6276,0,0,2.8,-51.8);

	this.instance_1481 = new lib.ch1_neckcopy("synched",0);
	this.instance_1481.setTransform(20.7,371.05,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1482 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1482.setTransform(20.6,389.8,0.1767,0.1767,0,0,0,0.3,-21.8);

	this.instance_1483 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1483.setTransform(23.4,415.3,0.1763,0.1763,30.7052,0,0,5.5,-51.4);

	this.instance_1484 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1484.setTransform(23.05,398.35,0.1763,0.1763,-3.3484,0,0,0.5,2.3);

	this.instance_1485 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1485.setTransform(33.8,405.4,0.1765,0.1765,90.2527,0,0,-2.6,2);

	this.instance_1486 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1486.setTransform(35,403.8,0.1764,0.1764,109.9801,0,0,-4,6.3);

	this.instance_1487 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1487.setTransform(32.2,389.85,0.1765,0.1765,78.6599,0,0,-39.8,-1.9);

	this.instance_1488 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1488.setTransform(29.55,376.8,0.1764,0.1764,79.4966,0,0,-32.5,-0.2);

	this.instance_1489 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1489.setTransform(17.65,397.5,0.1764,0.1764,-21.1258,0,0,1.2,-43.9);

	this.instance_1490 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1490.setTransform(160.15,373.35,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_1491 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1491.setTransform(154.3,401.15,0.1764,0.1764,-85.3717,0,0,6.2,-0.8);

	this.instance_1492 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1492.setTransform(155.35,400.1,0.1764,0.1764,-53.0042,0,0,3.9,-7.2);

	this.instance_1493 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1493.setTransform(153.85,385.8,0.1765,0.1765,-95.5726,0,0,38.1,-0.2);

	this.instance_1494 = new lib.ch1_headcopy("synched",0);
	this.instance_1494.setTransform(170.3,363.35,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1495 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1495.setTransform(168.95,373.85,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_1496 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1496.setTransform(171.85,409.75,0.1764,0.1764,-17.6276,0,0,3,-53.5);

	this.instance_1497 = new lib.ch1_neckcopy("synched",0);
	this.instance_1497.setTransform(169.4,367.15,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1498 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1498.setTransform(169.3,385.9,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_1499 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1499.setTransform(172.05,411.4,0.1763,0.1763,30.7052,0,0,4.4,-53.1);

	this.instance_1500 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1500.setTransform(171.7,394.45,0.1763,0.1763,-3.3484,0,0,0.1,2.3);

	this.instance_1501 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1501.setTransform(182.5,401.5,0.1765,0.1765,90.2527,0,0,-4.2,2.3);

	this.instance_1502 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1502.setTransform(183.7,399.9,0.1764,0.1764,109.9801,0,0,-5.5,7.2);

	this.instance_1503 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1503.setTransform(180.9,385.95,0.1765,0.1765,78.6599,0,0,-39.9,-1.4);

	this.instance_1504 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1504.setTransform(178.25,372.9,0.1764,0.1764,79.4966,0,0,-32.5,0);

	this.instance_1505 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1505.setTransform(166.35,393.6,0.1764,0.1764,-21.1258,0,0,1.9,-45.8);

	this.instance_1506 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_1506.setTransform(38.75,374.05,0.1767,0.1767,-90.7176,0,0,35.1,3.2);

	this.instance_1507 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1507.setTransform(50.85,398.4,0.1766,0.1766,-148.1547,0,0,3.9,-0.8);

	this.instance_1508 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_1508.setTransform(50.2,396.95,0.1766,0.1766,-124.7888,0,0,3.5,-6.5);

	this.instance_1509 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_1509.setTransform(39.25,388.05,0.1765,0.1765,-141.5799,0,0,37.4,2.9);

	this.instance_1510 = new lib.ch1_headcopy_1("synched",0);
	this.instance_1510.setTransform(48.95,364.2,0.1767,0.1767,-3.6038,0,0,4,54.4);

	this.instance_1511 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_1511.setTransform(47.55,374.5,0.1769,0.1769,0,0,0,2,-23.2);

	this.instance_1512 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_1512.setTransform(44.7,411.65,0.1766,0.1766,16.7765,0,0,6,-54.8);

	this.instance_1513 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_1513.setTransform(48.05,367.8,0.1767,0.1767,12.0764,0,0,1.9,8.8);

	this.instance_1514 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_1514.setTransform(47.85,386.65,0.1769,0.1769,0,0,0,2.6,-22.4);

	this.instance_1515 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_1515.setTransform(53.95,411.6,0.1765,0.1765,-11.5596,0,0,5,-53.1);

	this.instance_1516 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_1516.setTransform(50.6,395.05,0.1765,0.1765,-14.6886,0,0,1.4,3.3);

	this.instance_1517 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_1517.setTransform(57.2,399.2,0.1766,0.1766,58.7246,0,0,-3.1,1.4);

	this.instance_1518 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_1518.setTransform(58.05,397.4,0.1766,0.1766,96.3533,0,0,-5.7,5.2);

	this.instance_1519 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_1519.setTransform(50.45,385.3,0.1766,0.1766,58.0487,0,0,-38.4,-2.6);

	this.instance_1520 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_1520.setTransform(56.85,373.5,0.1766,0.1766,119.3003,0,0,-34.4,-2.8);

	this.instance_1521 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_1521.setTransform(45.9,394.55,0.1766,0.1766,1.802,0,0,4.8,-45.8);

	this.instance_1522 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1522.setTransform(27,352.55,0.1766,0.1766,-67.6958,0,0,33.6,1.5);

	this.instance_1523 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1523.setTransform(26.65,380.5,0.1766,0.1766,-110.4755,0,0,4.4,-2);

	this.instance_1524 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1524.setTransform(26.1,379.1,0.1766,0.1766,-120.7464,0,0,3.4,-9.6);

	this.instance_1525 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1525.setTransform(21.7,365.45,0.1766,0.1766,-107.3768,0,0,38.1,-0.6);

	this.instance_1526 = new lib.ch1_headcopy2("synched",0);
	this.instance_1526.setTransform(37.05,342.55,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1527 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1527.setTransform(35.85,353,0.1769,0.1769,0,0,0,0,-21.8);

	this.instance_1528 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1528.setTransform(39.6,388.2,0.1765,0.1765,-11.8966,0,0,4.2,-51.5);

	this.instance_1529 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1529.setTransform(36.35,346.3,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1530 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1530.setTransform(36.2,365.1,0.1769,0.1769,0,0,0,0.3,-21.2);

	this.instance_1531 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1531.setTransform(36.75,389.8,0.1764,0.1764,36.4467,0,0,5,-52);

	this.instance_1532 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1532.setTransform(39.9,373.1,0.1765,0.1765,7.7707,0,0,0.8,3.9);

	this.instance_1533 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1533.setTransform(54.75,378.2,0.1766,0.1766,34.102,0,0,-1.9,3.3);

	this.instance_1534 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1534.setTransform(54.4,376.15,0.1766,0.1766,58.3987,0,0,-4.1,8.8);

	this.instance_1535 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1535.setTransform(45.1,365.4,0.1766,0.1766,49.3036,0,0,-38.8,0.3);

	this.instance_1536 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1536.setTransform(45.2,352,0.1767,0.1767,91.2918,0,0,-30.9,-1.6);

	this.instance_1537 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1537.setTransform(32.65,372.55,0.1765,0.1765,-26.647,0,0,1.6,-43.6);

	this.instance_1538 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1538.setTransform(64.25,349.45,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_1539 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1539.setTransform(63.85,377.45,0.1766,0.1766,-110.4755,0,0,6.2,-1.3);

	this.instance_1540 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1540.setTransform(63.3,376,0.1766,0.1766,-120.7464,0,0,4.8,-8.7);

	this.instance_1541 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1541.setTransform(58.9,362.3,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_1542 = new lib.ch1_headcopy2("synched",0);
	this.instance_1542.setTransform(74.25,339.45,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1543 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1543.setTransform(73.05,349.9,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_1544 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1544.setTransform(76.75,385.1,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_1545 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1545.setTransform(73.55,343.2,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1546 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1546.setTransform(73.4,362,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_1547 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1547.setTransform(73.95,386.75,0.1764,0.1764,36.4467,0,0,4,-53.3);

	this.instance_1548 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1548.setTransform(77.1,370,0.1765,0.1765,7.7707,0,0,-0.3,2);

	this.instance_1549 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1549.setTransform(92,375.1,0.1766,0.1766,34.102,0,0,-4.4,2.6);

	this.instance_1550 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1550.setTransform(91.6,373.05,0.1766,0.1766,58.3987,0,0,-5.8,7.8);

	this.instance_1551 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1551.setTransform(82.3,362.3,0.1766,0.1766,49.3036,0,0,-40.2,-1);

	this.instance_1552 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1552.setTransform(82.4,348.9,0.1767,0.1767,91.2918,0,0,-32.9,-0.7);

	this.instance_1553 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1553.setTransform(69.9,369.5,0.1765,0.1765,-26.647,0,0,2.4,-45.1);

	this.instance_1554 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1554.setTransform(106.4,359.7,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_1555 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1555.setTransform(106,387.7,0.1766,0.1766,-110.4755,0,0,6.2,-1.3);

	this.instance_1556 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1556.setTransform(105.45,386.25,0.1766,0.1766,-120.7464,0,0,5,-8.5);

	this.instance_1557 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1557.setTransform(101,372.55,0.1766,0.1766,-107.3768,0,0,40.3,0.1);

	this.instance_1558 = new lib.ch1_headcopy2("synched",0);
	this.instance_1558.setTransform(116.4,349.7,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1559 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1559.setTransform(115.2,360.15,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_1560 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1560.setTransform(118.9,395.35,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_1561 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1561.setTransform(115.7,353.45,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1562 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1562.setTransform(115.55,372.25,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_1563 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1563.setTransform(116.1,397,0.1764,0.1764,36.4467,0,0,3.8,-53.6);

	this.instance_1564 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1564.setTransform(119.25,380.25,0.1765,0.1765,7.7707,0,0,0.2,1.9);

	this.instance_1565 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1565.setTransform(134.15,385.35,0.1766,0.1766,34.102,0,0,-4.4,2.6);

	this.instance_1566 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1566.setTransform(133.75,383.3,0.1766,0.1766,58.3987,0,0,-5.8,7.8);

	this.instance_1567 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1567.setTransform(124.45,372.55,0.1766,0.1766,49.3036,0,0,-40.2,-1);

	this.instance_1568 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1568.setTransform(124.55,359.15,0.1767,0.1767,91.2918,0,0,-32.5,-0.7);

	this.instance_1569 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1569.setTransform(112,379.75,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_1570 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1570.setTransform(125.9,349.2,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_1571 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1571.setTransform(120.05,377,0.1764,0.1764,-85.3717,0,0,5.7,-0.8);

	this.instance_1572 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1572.setTransform(121.1,375.95,0.1764,0.1764,-53.0042,0,0,4.5,-7.7);

	this.instance_1573 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1573.setTransform(119.6,361.65,0.1765,0.1765,-95.5726,0,0,39,-0.2);

	this.instance_1574 = new lib.ch1_headcopy("synched",0);
	this.instance_1574.setTransform(136.05,339.2,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1575 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1575.setTransform(134.7,349.7,0.1767,0.1767,0,0,0,0,-22.9);

	this.instance_1576 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1576.setTransform(137.6,385.6,0.1764,0.1764,-17.6276,0,0,3.3,-53.4);

	this.instance_1577 = new lib.ch1_neckcopy("synched",0);
	this.instance_1577.setTransform(135.15,343,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1578 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1578.setTransform(135.05,361.75,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_1579 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1579.setTransform(137.8,387.25,0.1763,0.1763,30.7052,0,0,4.7,-52.6);

	this.instance_1580 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1580.setTransform(137.5,370.3,0.1763,0.1763,-3.3484,0,0,0.1,2.9);

	this.instance_1581 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1581.setTransform(148.25,377.35,0.1765,0.1765,90.2527,0,0,-3.6,2.3);

	this.instance_1582 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1582.setTransform(149.45,375.75,0.1764,0.1764,109.9801,0,0,-5.7,6.9);

	this.instance_1583 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1583.setTransform(146.65,361.8,0.1765,0.1765,78.6599,0,0,-39.4,-1.2);

	this.instance_1584 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1584.setTransform(144,348.75,0.1764,0.1764,79.4966,0,0,-32,0.1);

	this.instance_1585 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1585.setTransform(132.15,369.45,0.1764,0.1764,-21.1258,0,0,1.7,-45.2);

	this.instance_1586 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1586.setTransform(175.9,350.8,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_1587 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1587.setTransform(175.5,378.8,0.1766,0.1766,-110.4755,0,0,6.2,-1.3);

	this.instance_1588 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1588.setTransform(174.95,377.35,0.1766,0.1766,-120.7464,0,0,5,-8.5);

	this.instance_1589 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1589.setTransform(170.55,363.65,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_1590 = new lib.ch1_headcopy2("synched",0);
	this.instance_1590.setTransform(185.9,340.8,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1591 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1591.setTransform(184.7,351.25,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_1592 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1592.setTransform(188.4,386.45,0.1765,0.1765,-11.8966,0,0,4.9,-53.4);

	this.instance_1593 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1593.setTransform(185.2,344.55,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1594 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1594.setTransform(185.05,363.35,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_1595 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1595.setTransform(185.6,388.1,0.1764,0.1764,36.4467,0,0,3.8,-53.6);

	this.instance_1596 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1596.setTransform(188.75,371.35,0.1765,0.1765,7.7707,0,0,1.7,1.8);

	this.instance_1597 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1597.setTransform(203.65,376.4,0.1766,0.1766,34.102,0,0,-2.8,1.5);

	this.instance_1598 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1598.setTransform(203.25,374.4,0.1766,0.1766,58.3987,0,0,-5.1,7.2);

	this.instance_1599 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1599.setTransform(193.95,363.65,0.1766,0.1766,49.3036,0,0,-39,-2.5);

	this.instance_1600 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1600.setTransform(194.05,350.25,0.1767,0.1767,91.2918,0,0,-32.6,-2.6);

	this.instance_1601 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1601.setTransform(181.5,370.85,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_1602 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1602.setTransform(148.55,340.8,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_1603 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1603.setTransform(148.15,368.8,0.1766,0.1766,-110.4755,0,0,5.5,-1.6);

	this.instance_1604 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1604.setTransform(147.6,367.35,0.1766,0.1766,-120.7464,0,0,3.6,-9.4);

	this.instance_1605 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1605.setTransform(143.2,353.65,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_1606 = new lib.ch1_headcopy2("synched",0);
	this.instance_1606.setTransform(158.55,330.8,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1607 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1607.setTransform(157.35,341.25,0.1769,0.1769,0,0,0,0,-21.8);

	this.instance_1608 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1608.setTransform(161.05,376.45,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_1609 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1609.setTransform(157.85,334.55,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1610 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1610.setTransform(157.7,353.35,0.1769,0.1769,0,0,0,0.3,-22.4);

	this.instance_1611 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1611.setTransform(158.25,378.1,0.1764,0.1764,36.4467,0,0,4.8,-52.1);

	this.instance_1612 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1612.setTransform(161.4,361.35,0.1765,0.1765,7.7707,0,0,-0.1,4);

	this.instance_1613 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1613.setTransform(176.3,366.45,0.1766,0.1766,34.102,0,0,-3.9,3.4);

	this.instance_1614 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1614.setTransform(175.85,364.4,0.1766,0.1766,58.3987,0,0,-5.7,8.2);

	this.instance_1615 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1615.setTransform(166.6,353.65,0.1766,0.1766,49.3036,0,0,-39.6,-0.5);

	this.instance_1616 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1616.setTransform(166.7,340.25,0.1767,0.1767,91.2918,0,0,-31.7,-0.7);

	this.instance_1617 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1617.setTransform(154.15,360.85,0.1765,0.1765,-26.647,0,0,1.7,-43.8);

	this.instance_1618 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1618.setTransform(161.35,321.85,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_1619 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1619.setTransform(155.5,349.65,0.1764,0.1764,-85.3717,0,0,4.5,-0.7);

	this.instance_1620 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1620.setTransform(156.55,348.6,0.1764,0.1764,-53.0042,0,0,3.1,-6.7);

	this.instance_1621 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1621.setTransform(155.05,334.3,0.1765,0.1765,-95.5726,0,0,37.4,-0.4);

	this.instance_1622 = new lib.ch1_headcopy("synched",0);
	this.instance_1622.setTransform(171.5,311.85,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1623 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1623.setTransform(170.15,322.35,0.1767,0.1767,0,0,0,0,-21.8);

	this.instance_1624 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1624.setTransform(173.05,358.25,0.1764,0.1764,-17.6276,0,0,2.8,-51.8);

	this.instance_1625 = new lib.ch1_neckcopy("synched",0);
	this.instance_1625.setTransform(170.6,315.65,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1626 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1626.setTransform(170.5,334.4,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_1627 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1627.setTransform(173.3,359.9,0.1763,0.1763,30.7052,0,0,5.5,-51.4);

	this.instance_1628 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1628.setTransform(172.95,342.95,0.1763,0.1763,-3.3484,0,0,1,2.4);

	this.instance_1629 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1629.setTransform(183.7,350,0.1765,0.1765,90.2527,0,0,-2.6,1.4);

	this.instance_1630 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1630.setTransform(184.9,348.4,0.1764,0.1764,109.9801,0,0,-4,6.3);

	this.instance_1631 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1631.setTransform(182.1,334.4,0.1765,0.1765,78.6599,0,0,-39.8,-2.2);

	this.instance_1632 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1632.setTransform(179.45,321.4,0.1764,0.1764,79.4966,0,0,-32.4,-0.8);

	this.instance_1633 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1633.setTransform(167.55,342.1,0.1764,0.1764,-21.1258,0,0,1.2,-44.2);

	this.instance_1634 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_1634.setTransform(73.25,318.6,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_1635 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1635.setTransform(84.85,343.2,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_1636 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_1636.setTransform(84.2,341.8,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_1637 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_1637.setTransform(73.3,332.6,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_1638 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_1638.setTransform(83.5,308.75,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_1639 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_1639.setTransform(82.1,319.05,0.177,0.177,0,0,0,0,-24);

	this.instance_1640 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_1640.setTransform(77.6,356.05,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_1641 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_1641.setTransform(82.5,312.4,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_1642 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_1642.setTransform(82.45,331.2,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_1643 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_1643.setTransform(89.75,355.8,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_1644 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_1644.setTransform(85.95,339.25,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_1645 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_1645.setTransform(86.95,347.35,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_1646 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_1646.setTransform(87.5,345.4,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_1647 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_1647.setTransform(89.2,331.35,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_1648 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_1648.setTransform(91.45,318.05,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_1649 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_1649.setTransform(79.85,338.9,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_1650 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1650.setTransform(44.4,328.9,0.1764,0.1764,-63.3662,0,0,33.9,1.8);

	this.instance_1651 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1651.setTransform(38.5,356.7,0.1764,0.1764,-85.3717,0,0,4.2,-0.7);

	this.instance_1652 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1652.setTransform(39.55,355.65,0.1764,0.1764,-53.0042,0,0,3.1,-6.7);

	this.instance_1653 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1653.setTransform(38.05,341.35,0.1765,0.1765,-95.5726,0,0,37.4,-0.4);

	this.instance_1654 = new lib.ch1_headcopy("synched",0);
	this.instance_1654.setTransform(54.5,318.9,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1655 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1655.setTransform(53.15,329.4,0.1767,0.1767,0,0,0,0,-21.5);

	this.instance_1656 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1656.setTransform(56.05,365.3,0.1764,0.1764,-17.6276,0,0,2.8,-51.8);

	this.instance_1657 = new lib.ch1_neckcopy("synched",0);
	this.instance_1657.setTransform(53.6,322.7,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1658 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1658.setTransform(53.5,341.45,0.1767,0.1767,0,0,0,0.3,-20.9);

	this.instance_1659 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1659.setTransform(56.3,366.95,0.1763,0.1763,30.7052,0,0,5.5,-51.4);

	this.instance_1660 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1660.setTransform(55.95,350,0.1763,0.1763,-3.3484,0,0,0.6,4.3);

	this.instance_1661 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1661.setTransform(66.7,357.05,0.1765,0.1765,90.2527,0,0,-2.2,1.7);

	this.instance_1662 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1662.setTransform(67.9,355.45,0.1764,0.1764,109.9801,0,0,-4,6.3);

	this.instance_1663 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1663.setTransform(65.1,341.5,0.1765,0.1765,78.6599,0,0,-37.9,-1.5);

	this.instance_1664 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1664.setTransform(62.45,328.45,0.1764,0.1764,79.4966,0,0,-30.5,-0.2);

	this.instance_1665 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1665.setTransform(50.55,349.15,0.1764,0.1764,-21.1258,0,0,1.2,-43.9);

	this.instance_1666 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1666.setTransform(51.15,302.4,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_1667 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1667.setTransform(50.75,330.4,0.1766,0.1766,-110.4755,0,0,5.7,-1.5);

	this.instance_1668 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1668.setTransform(50.2,328.95,0.1766,0.1766,-120.7464,0,0,4.6,-8.8);

	this.instance_1669 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1669.setTransform(45.8,315.25,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_1670 = new lib.ch1_headcopy2("synched",0);
	this.instance_1670.setTransform(61.15,292.4,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1671 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1671.setTransform(59.95,302.85,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_1672 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1672.setTransform(63.65,338.05,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_1673 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1673.setTransform(60.45,296.15,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1674 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1674.setTransform(60.3,314.95,0.1769,0.1769,0,0,0,0.3,-22.9);

	this.instance_1675 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1675.setTransform(60.85,339.7,0.1764,0.1764,36.4467,0,0,4.2,-53.1);

	this.instance_1676 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1676.setTransform(64,322.95,0.1765,0.1765,7.7707,0,0,0.2,1.9);

	this.instance_1677 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1677.setTransform(78.9,328.05,0.1766,0.1766,34.102,0,0,-4,3.1);

	this.instance_1678 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1678.setTransform(78.5,326,0.1766,0.1766,58.3987,0,0,-5.8,7.8);

	this.instance_1679 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1679.setTransform(69.2,315.2,0.1766,0.1766,49.3036,0,0,-39.5,-1.1);

	this.instance_1680 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1680.setTransform(69.3,301.85,0.1767,0.1767,91.2918,0,0,-32.9,-0.7);

	this.instance_1681 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1681.setTransform(56.75,322.45,0.1765,0.1765,-26.647,0,0,2.2,-44.9);

	this.instance_1682 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1682.setTransform(0.25,342.35,0.1764,0.1764,-63.3662,0,0,34.5,-0.8);

	this.instance_1683 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1683.setTransform(-5.6,370.15,0.1764,0.1764,-85.3717,0,0,6,-2.8);

	this.instance_1684 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1684.setTransform(-4.55,369.1,0.1764,0.1764,-53.0042,0,0,2.6,-8.8);

	this.instance_1685 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1685.setTransform(-6.05,354.8,0.1765,0.1765,-95.5726,0,0,38.4,-2.2);

	this.instance_1686 = new lib.ch1_headcopy("synched",0);
	this.instance_1686.setTransform(10.4,332.35,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1687 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1687.setTransform(9.05,342.85,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_1688 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1688.setTransform(11.95,378.75,0.1764,0.1764,-17.6276,0,0,3.3,-53.4);

	this.instance_1689 = new lib.ch1_neckcopy("synched",0);
	this.instance_1689.setTransform(9.5,336.15,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1690 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1690.setTransform(9.4,354.9,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_1691 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1691.setTransform(12.15,380.4,0.1763,0.1763,30.7052,0,0,4.4,-53.1);

	this.instance_1692 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1692.setTransform(11.85,363.45,0.1763,0.1763,-3.3484,0,0,0.5,2.3);

	this.instance_1693 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1693.setTransform(22.6,370.5,0.1765,0.1765,90.2527,0,0,-4.2,2);

	this.instance_1694 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1694.setTransform(23.8,368.9,0.1764,0.1764,109.9801,0,0,-5.7,6.9);

	this.instance_1695 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1695.setTransform(21,354.95,0.1765,0.1765,78.6599,0,0,-39.9,-1.7);

	this.instance_1696 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1696.setTransform(18.35,341.9,0.1764,0.1764,79.4966,0,0,-32.5,-0.2);

	this.instance_1697 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1697.setTransform(6.45,362.6,0.1764,0.1764,-21.1258,0,0,1.9,-45.8);

	this.instance_1698 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1698.setTransform(20.85,320.7,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_1699 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1699.setTransform(20.45,348.7,0.1766,0.1766,-110.4755,0,0,6.2,-1.3);

	this.instance_1700 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1700.setTransform(19.9,347.25,0.1766,0.1766,-120.7464,0,0,5,-8.5);

	this.instance_1701 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1701.setTransform(15.5,333.55,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_1702 = new lib.ch1_headcopy2("synched",0);
	this.instance_1702.setTransform(30.85,310.7,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1703 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1703.setTransform(29.65,321.15,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_1704 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1704.setTransform(33.35,356.35,0.1765,0.1765,-11.8966,0,0,4.9,-53.4);

	this.instance_1705 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1705.setTransform(30.15,314.45,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1706 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1706.setTransform(30,333.25,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_1707 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1707.setTransform(30.55,358,0.1764,0.1764,36.4467,0,0,3.8,-53.6);

	this.instance_1708 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1708.setTransform(33.7,341.25,0.1765,0.1765,7.7707,0,0,1.7,1.8);

	this.instance_1709 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1709.setTransform(48.6,346.3,0.1766,0.1766,34.102,0,0,-2.8,1.5);

	this.instance_1710 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1710.setTransform(48.2,344.3,0.1766,0.1766,58.3987,0,0,-5.1,7.2);

	this.instance_1711 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1711.setTransform(38.9,333.55,0.1766,0.1766,49.3036,0,0,-39,-2.5);

	this.instance_1712 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1712.setTransform(39,320.15,0.1767,0.1767,91.2918,0,0,-32.6,-2.6);

	this.instance_1713 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1713.setTransform(26.45,340.75,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_1714 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_1714.setTransform(101.15,334.7,0.1767,0.1767,-90.7176,0,0,35.1,3.2);

	this.instance_1715 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1715.setTransform(113.25,359.05,0.1766,0.1766,-148.1547,0,0,3.9,-0.8);

	this.instance_1716 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_1716.setTransform(112.6,357.6,0.1766,0.1766,-124.7888,0,0,3.5,-6.5);

	this.instance_1717 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_1717.setTransform(101.65,348.7,0.1765,0.1765,-141.5799,0,0,37.4,2.9);

	this.instance_1718 = new lib.ch1_headcopy_1("synched",0);
	this.instance_1718.setTransform(111.35,324.85,0.1767,0.1767,-3.6038,0,0,4,54.4);

	this.instance_1719 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_1719.setTransform(109.95,335.15,0.1769,0.1769,0,0,0,2,-23.2);

	this.instance_1720 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_1720.setTransform(107.1,372.3,0.1766,0.1766,16.7765,0,0,6,-54.8);

	this.instance_1721 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_1721.setTransform(110.45,328.45,0.1767,0.1767,12.0764,0,0,1.9,8.8);

	this.instance_1722 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_1722.setTransform(110.25,347.3,0.1769,0.1769,0,0,0,2.6,-22.4);

	this.instance_1723 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_1723.setTransform(116.35,372.25,0.1765,0.1765,-11.5596,0,0,5,-53.1);

	this.instance_1724 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_1724.setTransform(113,355.7,0.1765,0.1765,-14.6886,0,0,1.4,3.3);

	this.instance_1725 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_1725.setTransform(119.6,359.85,0.1766,0.1766,58.7246,0,0,-3.1,1.4);

	this.instance_1726 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_1726.setTransform(120.45,358.05,0.1766,0.1766,96.3533,0,0,-5.7,5.2);

	this.instance_1727 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_1727.setTransform(112.85,345.95,0.1766,0.1766,58.0487,0,0,-38.4,-2.6);

	this.instance_1728 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_1728.setTransform(119.25,334.15,0.1766,0.1766,119.3003,0,0,-34.4,-2.8);

	this.instance_1729 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_1729.setTransform(108.3,355.2,0.1766,0.1766,1.802,0,0,4.8,-45.8);

	this.instance_1730 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_1730.setTransform(-2.9,312.45,0.1767,0.1767,-90.7176,0,0,35.1,1.3);

	this.instance_1731 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1731.setTransform(9.15,336.8,0.1766,0.1766,-148.1547,0,0,3.9,-0.8);

	this.instance_1732 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_1732.setTransform(8.5,335.35,0.1766,0.1766,-124.7888,0,0,3.5,-6.5);

	this.instance_1733 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_1733.setTransform(-2.45,326.45,0.1765,0.1765,-141.5799,0,0,37.4,2.9);

	this.instance_1734 = new lib.ch1_headcopy_1("synched",0);
	this.instance_1734.setTransform(7.25,302.6,0.1767,0.1767,-3.6038,0,0,4,54.1);

	this.instance_1735 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_1735.setTransform(5.85,312.9,0.1769,0.1769,0,0,0,2,-23.2);

	this.instance_1736 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_1736.setTransform(3,350.05,0.1766,0.1766,16.7765,0,0,4.1,-54.1);

	this.instance_1737 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_1737.setTransform(6.35,306.2,0.1767,0.1767,12.0764,0,0,1.9,8.8);

	this.instance_1738 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_1738.setTransform(6.15,325.05,0.1769,0.1769,0,0,0,2.6,-22.6);

	this.instance_1739 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_1739.setTransform(12.25,350,0.1765,0.1765,-11.5596,0,0,5,-53.1);

	this.instance_1740 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_1740.setTransform(8.9,333.45,0.1765,0.1765,-14.6886,0,0,1.4,3.3);

	this.instance_1741 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_1741.setTransform(15.5,337.6,0.1766,0.1766,58.7246,0,0,-3.1,1.4);

	this.instance_1742 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_1742.setTransform(16.35,335.8,0.1766,0.1766,96.3533,0,0,-5.7,5.2);

	this.instance_1743 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_1743.setTransform(8.75,323.7,0.1766,0.1766,58.0487,0,0,-38.6,-2.8);

	this.instance_1744 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_1744.setTransform(15.15,311.9,0.1766,0.1766,119.3003,0,0,-34.4,-2.8);

	this.instance_1745 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_1745.setTransform(4.2,332.95,0.1766,0.1766,1.802,0,0,4.8,-45.8);

	this.instance_1746 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1746.setTransform(196.45,322.7,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_1747 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1747.setTransform(190.6,350.5,0.1764,0.1764,-85.3717,0,0,6.2,-0.8);

	this.instance_1748 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1748.setTransform(191.65,349.45,0.1764,0.1764,-53.0042,0,0,3.1,-6.7);

	this.instance_1749 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1749.setTransform(190.15,335.15,0.1765,0.1765,-95.5726,0,0,37.4,-0.4);

	this.instance_1750 = new lib.ch1_headcopy("synched",0);
	this.instance_1750.setTransform(206.6,312.7,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1751 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1751.setTransform(205.25,323.2,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_1752 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1752.setTransform(208.15,359.1,0.1764,0.1764,-17.6276,0,0,3.3,-53.4);

	this.instance_1753 = new lib.ch1_neckcopy("synched",0);
	this.instance_1753.setTransform(205.7,316.5,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1754 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1754.setTransform(205.6,335.25,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_1755 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1755.setTransform(208.35,360.75,0.1763,0.1763,30.7052,0,0,4.9,-52.4);

	this.instance_1756 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1756.setTransform(208,343.8,0.1763,0.1763,-3.3484,0,0,0.7,2.3);

	this.instance_1757 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1757.setTransform(218.8,350.85,0.1765,0.1765,90.2527,0,0,-4.2,1.7);

	this.instance_1758 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1758.setTransform(220,349.25,0.1764,0.1764,109.9801,0,0,-4.9,6.6);

	this.instance_1759 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1759.setTransform(217.2,335.3,0.1765,0.1765,78.6599,0,0,-39.8,-1.9);

	this.instance_1760 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1760.setTransform(214.55,322.25,0.1764,0.1764,79.4966,0,0,-32.5,-0.2);

	this.instance_1761 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1761.setTransform(202.65,342.95,0.1764,0.1764,-21.1258,0,0,1.6,-45);

	this.instance_1762 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_1762.setTransform(219.75,314.35,0.1767,0.1767,-90.7176,0,0,35.1,1.3);

	this.instance_1763 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1763.setTransform(231.85,338.7,0.1766,0.1766,-148.1547,0,0,5.5,-1.8);

	this.instance_1764 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_1764.setTransform(231.15,337.25,0.1766,0.1766,-124.7888,0,0,4.7,-8.2);

	this.instance_1765 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_1765.setTransform(220.2,328.35,0.1765,0.1765,-141.5799,0,0,38.9,1.7);

	this.instance_1766 = new lib.ch1_headcopy_1("synched",0);
	this.instance_1766.setTransform(229.9,304.5,0.1767,0.1767,-3.6038,0,0,1.9,54.2);

	this.instance_1767 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_1767.setTransform(228.5,314.8,0.1769,0.1769,0,0,0,0,-22.9);

	this.instance_1768 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_1768.setTransform(225.65,351.95,0.1766,0.1766,16.7765,0,0,4.1,-54.1);

	this.instance_1769 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_1769.setTransform(229,308.15,0.1767,0.1767,12.0764,0,0,-0.1,9.2);

	this.instance_1770 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_1770.setTransform(228.8,326.95,0.1769,0.1769,0,0,0,0.6,-22.4);

	this.instance_1771 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_1771.setTransform(234.95,351.95,0.1765,0.1765,-11.5596,0,0,3.1,-53.5);

	this.instance_1772 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_1772.setTransform(231.55,335.35,0.1765,0.1765,-14.6886,0,0,-0.5,2.8);

	this.instance_1773 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_1773.setTransform(238.15,339.45,0.1766,0.1766,58.7246,0,0,-4.2,3.1);

	this.instance_1774 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_1774.setTransform(239,337.7,0.1766,0.1766,96.3533,0,0,-5.5,7.2);

	this.instance_1775 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_1775.setTransform(231.45,325.6,0.1766,0.1766,58.0487,0,0,-39.3,-1.2);

	this.instance_1776 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_1776.setTransform(237.8,313.8,0.1766,0.1766,119.3003,0,0,-33.4,-1.1);

	this.instance_1777 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_1777.setTransform(226.85,334.85,0.1766,0.1766,1.802,0,0,2.8,-45.7);

	this.instance_1778 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1778.setTransform(238.4,295.1,0.1764,0.1764,-63.3662,0,0,35.6,0.8);

	this.instance_1779 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1779.setTransform(232.55,322.9,0.1764,0.1764,-85.3717,0,0,6.2,-0.8);

	this.instance_1780 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1780.setTransform(233.6,321.85,0.1764,0.1764,-53.0042,0,0,4.5,-7.7);

	this.instance_1781 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1781.setTransform(232.1,307.55,0.1765,0.1765,-95.5726,0,0,39,-0.2);

	this.instance_1782 = new lib.ch1_headcopy("synched",0);
	this.instance_1782.setTransform(248.55,285.1,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1783 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1783.setTransform(247.2,295.6,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_1784 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1784.setTransform(250.1,331.5,0.1764,0.1764,-17.6276,0,0,3.3,-53.4);

	this.instance_1785 = new lib.ch1_neckcopy("synched",0);
	this.instance_1785.setTransform(247.65,288.9,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1786 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1786.setTransform(247.55,307.65,0.1767,0.1767,0,0,0,0.3,-22.9);

	this.instance_1787 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1787.setTransform(250.3,333.15,0.1763,0.1763,30.7052,0,0,4.4,-53.1);

	this.instance_1788 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1788.setTransform(249.95,316.2,0.1763,0.1763,-3.3484,0,0,0.7,2.3);

	this.instance_1789 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1789.setTransform(260.75,323.25,0.1765,0.1765,90.2527,0,0,-4.2,1.4);

	this.instance_1790 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1790.setTransform(261.95,321.65,0.1764,0.1764,109.9801,0,0,-5.7,6.9);

	this.instance_1791 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1791.setTransform(259.15,307.65,0.1765,0.1765,78.6599,0,0,-39.8,-2.2);

	this.instance_1792 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1792.setTransform(256.5,294.65,0.1764,0.1764,79.4966,0,0,-32.5,-0.6);

	this.instance_1793 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1793.setTransform(244.6,315.35,0.1764,0.1764,-21.1258,0,0,1.9,-45.8);

	this.instance_1794 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_1794.setTransform(259.9,283.9,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_1795 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1795.setTransform(271.5,308.5,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_1796 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_1796.setTransform(270.85,307.1,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_1797 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_1797.setTransform(259.95,297.9,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_1798 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_1798.setTransform(270.15,274.05,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_1799 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_1799.setTransform(268.75,284.35,0.177,0.177,0,0,0,0,-24);

	this.instance_1800 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_1800.setTransform(264.25,321.35,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_1801 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_1801.setTransform(269.15,277.7,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_1802 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_1802.setTransform(269.1,296.5,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_1803 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_1803.setTransform(276.4,321.1,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_1804 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_1804.setTransform(272.6,304.55,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_1805 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_1805.setTransform(273.6,312.65,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_1806 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_1806.setTransform(274.15,310.7,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_1807 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_1807.setTransform(275.85,296.65,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_1808 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_1808.setTransform(278.1,283.35,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_1809 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_1809.setTransform(266.5,304.2,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_1810 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1810.setTransform(281.45,267.3,0.1766,0.1766,-67.6931,0,0,35.5,0.8);

	this.instance_1811 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1811.setTransform(281.05,295.3,0.1766,0.1766,-110.4784,0,0,5.5,-1.6);

	this.instance_1812 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1812.setTransform(280.5,293.85,0.1766,0.1766,-120.7456,0,0,4.4,-9);

	this.instance_1813 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1813.setTransform(276.1,280.15,0.1767,0.1767,-107.3785,0,0,40,0.1);

	this.instance_1814 = new lib.ch1_headcopy2("synched",0);
	this.instance_1814.setTransform(291.45,257.3,0.1768,0.1768,-1.9886,0,0,1,52.7);

	this.instance_1815 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1815.setTransform(290.25,267.75,0.177,0.177,0,0,0,0,-22.1);

	this.instance_1816 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1816.setTransform(293.95,302.95,0.1766,0.1766,-11.9004,0,0,3.8,-53.6);

	this.instance_1817 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1817.setTransform(290.75,261.05,0.1768,0.1768,10.1681,0,0,-0.1,9);

	this.instance_1818 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1818.setTransform(290.6,279.85,0.177,0.177,0,0,0,0.3,-22.3);

	this.instance_1819 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1819.setTransform(291.15,304.6,0.1765,0.1765,36.4478,0,0,4.3,-52.9);

	this.instance_1820 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1820.setTransform(294.3,287.85,0.1765,0.1765,7.775,0,0,-0.1,3.8);

	this.instance_1821 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1821.setTransform(309.2,292.95,0.1766,0.1766,34.1034,0,0,-3.2,2.9);

	this.instance_1822 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1822.setTransform(308.8,290.9,0.1766,0.1766,58.397,0,0,-5.5,7.9);

	this.instance_1823 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1823.setTransform(299.5,280.15,0.1766,0.1766,49.3031,0,0,-39.6,-0.5);

	this.instance_1824 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1824.setTransform(299.6,266.75,0.1767,0.1767,91.2967,0,0,-32.5,-0.7);

	this.instance_1825 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1825.setTransform(287.05,287.35,0.1766,0.1766,-26.6492,0,0,2.1,-44.6);

	this.instance_1826 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1826.setTransform(95.35,302.4,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_1827 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1827.setTransform(94.95,330.4,0.1766,0.1766,-110.4755,0,0,5.7,-1.5);

	this.instance_1828 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1828.setTransform(94.4,328.95,0.1766,0.1766,-120.7464,0,0,4.6,-8.8);

	this.instance_1829 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1829.setTransform(90,315.25,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_1830 = new lib.ch1_headcopy2("synched",0);
	this.instance_1830.setTransform(105.35,292.4,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1831 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1831.setTransform(104.15,302.85,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_1832 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1832.setTransform(107.85,338.05,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_1833 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1833.setTransform(104.65,296.15,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1834 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1834.setTransform(104.5,314.95,0.1769,0.1769,0,0,0,0.3,-22.9);

	this.instance_1835 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1835.setTransform(105.05,339.7,0.1764,0.1764,36.4467,0,0,4.2,-53.1);

	this.instance_1836 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1836.setTransform(108.2,322.95,0.1765,0.1765,7.7707,0,0,-0.3,2);

	this.instance_1837 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1837.setTransform(123.1,328.05,0.1766,0.1766,34.102,0,0,-4,3.1);

	this.instance_1838 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1838.setTransform(122.7,326,0.1766,0.1766,58.3987,0,0,-5.8,7.8);

	this.instance_1839 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1839.setTransform(113.4,315.25,0.1766,0.1766,49.3036,0,0,-39.8,-0.6);

	this.instance_1840 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1840.setTransform(113.5,301.85,0.1767,0.1767,91.2918,0,0,-32.9,-0.7);

	this.instance_1841 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1841.setTransform(100.95,322.45,0.1765,0.1765,-26.647,0,0,2.2,-44.9);

	this.instance_1842 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1842.setTransform(119.6,313.6,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_1843 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1843.setTransform(113.75,341.4,0.1764,0.1764,-85.3717,0,0,5.7,-0.8);

	this.instance_1844 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1844.setTransform(114.8,340.35,0.1764,0.1764,-53.0042,0,0,4.5,-7.7);

	this.instance_1845 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1845.setTransform(113.3,326.05,0.1765,0.1765,-95.5726,0,0,39,-0.2);

	this.instance_1846 = new lib.ch1_headcopy("synched",0);
	this.instance_1846.setTransform(129.75,303.6,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1847 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1847.setTransform(128.4,314.1,0.1767,0.1767,0,0,0,0,-22.9);

	this.instance_1848 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1848.setTransform(131.3,350,0.1764,0.1764,-17.6276,0,0,3.3,-53.4);

	this.instance_1849 = new lib.ch1_neckcopy("synched",0);
	this.instance_1849.setTransform(128.85,307.4,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1850 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1850.setTransform(128.75,326.15,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_1851 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1851.setTransform(131.5,351.65,0.1763,0.1763,30.7052,0,0,4.7,-52.6);

	this.instance_1852 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1852.setTransform(131.15,334.7,0.1763,0.1763,-3.3484,0,0,0.1,2.3);

	this.instance_1853 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1853.setTransform(141.95,341.75,0.1765,0.1765,90.2527,0,0,-3.6,2.3);

	this.instance_1854 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1854.setTransform(143.1,340.15,0.1764,0.1764,109.9801,0,0,-6.2,5.3);

	this.instance_1855 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1855.setTransform(140.35,326.2,0.1765,0.1765,78.6599,0,0,-39.9,-1.4);

	this.instance_1856 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1856.setTransform(137.7,313.15,0.1764,0.1764,79.4966,0,0,-32.5,0);

	this.instance_1857 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1857.setTransform(125.85,333.85,0.1764,0.1764,-21.1258,0,0,1.7,-45.2);

	this.instance_1858 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1858.setTransform(142.15,294.9,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_1859 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1859.setTransform(141.75,322.9,0.1766,0.1766,-110.4755,0,0,6,-1.4);

	this.instance_1860 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1860.setTransform(141.2,321.45,0.1766,0.1766,-120.7464,0,0,4.8,-8.7);

	this.instance_1861 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1861.setTransform(136.8,307.75,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_1862 = new lib.ch1_headcopy2("synched",0);
	this.instance_1862.setTransform(152.15,284.9,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1863 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1863.setTransform(150.95,295.35,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_1864 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1864.setTransform(154.65,330.55,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_1865 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1865.setTransform(151.45,288.65,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1866 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1866.setTransform(151.3,307.45,0.1769,0.1769,0,0,0,0.3,-22.9);

	this.instance_1867 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1867.setTransform(151.85,332.2,0.1764,0.1764,36.4467,0,0,4,-53.3);

	this.instance_1868 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1868.setTransform(155,315.45,0.1765,0.1765,7.7707,0,0,0.2,1.9);

	this.instance_1869 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1869.setTransform(169.9,320.55,0.1766,0.1766,34.102,0,0,-4.2,2.9);

	this.instance_1870 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1870.setTransform(169.5,318.5,0.1766,0.1766,58.3987,0,0,-5.8,7.8);

	this.instance_1871 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1871.setTransform(160.2,307.75,0.1766,0.1766,49.3036,0,0,-40,-0.8);

	this.instance_1872 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1872.setTransform(160.3,294.35,0.1767,0.1767,91.2918,0,0,-32.9,-0.7);

	this.instance_1873 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1873.setTransform(147.8,314.95,0.1765,0.1765,-26.647,0,0,2.4,-45.1);

	this.instance_1874 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_1874.setTransform(176.65,298.25,0.1767,0.1767,-90.7176,0,0,33.4,2.1);

	this.instance_1875 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1875.setTransform(188.7,322.6,0.1766,0.1766,-148.1547,0,0,4.4,-3.1);

	this.instance_1876 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_1876.setTransform(188.05,321.15,0.1766,0.1766,-124.7888,0,0,3.8,-8.4);

	this.instance_1877 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_1877.setTransform(177.1,312.25,0.1765,0.1765,-141.5799,0,0,38.2,2.2);

	this.instance_1878 = new lib.ch1_headcopy_1("synched",0);
	this.instance_1878.setTransform(186.8,288.4,0.1767,0.1767,-3.6038,0,0,3.6,56.1);

	this.instance_1879 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_1879.setTransform(185.4,298.7,0.1769,0.1769,0,0,0,0,-22.1);

	this.instance_1880 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_1880.setTransform(182.55,335.85,0.1766,0.1766,16.7765,0,0,6.5,-52.9);

	this.instance_1881 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_1881.setTransform(185.9,292.05,0.1767,0.1767,12.0764,0,0,0.4,11.2);

	this.instance_1882 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_1882.setTransform(185.7,310.85,0.1769,0.1769,0,0,0,0.8,-20.7);

	this.instance_1883 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_1883.setTransform(191.85,335.85,0.1765,0.1765,-11.5596,0,0,4,-53.2);

	this.instance_1884 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_1884.setTransform(188.45,319.25,0.1765,0.1765,-14.6886,0,0,1.1,5);

	this.instance_1885 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_1885.setTransform(195.05,323.35,0.1766,0.1766,58.7246,0,0,-1.9,2.5);

	this.instance_1886 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_1886.setTransform(195.9,321.6,0.1766,0.1766,96.3533,0,0,-4.9,5.1);

	this.instance_1887 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_1887.setTransform(188.3,309.5,0.1766,0.1766,58.0487,0,0,-37,-1.7);

	this.instance_1888 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_1888.setTransform(194.7,297.7,0.1766,0.1766,119.3003,0,0,-33.5,-3);

	this.instance_1889 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_1889.setTransform(183.75,318.75,0.1766,0.1766,1.802,0,0,2.8,-45.7);

	this.instance_1890 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1890.setTransform(196.7,285.6,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_1891 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1891.setTransform(196.3,313.6,0.1766,0.1766,-110.4755,0,0,6.2,-1.3);

	this.instance_1892 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1892.setTransform(195.75,312.15,0.1766,0.1766,-120.7464,0,0,5,-8.5);

	this.instance_1893 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1893.setTransform(191.3,298.45,0.1766,0.1766,-107.3768,0,0,40.3,0.1);

	this.instance_1894 = new lib.ch1_headcopy2("synched",0);
	this.instance_1894.setTransform(206.7,275.6,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1895 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1895.setTransform(205.5,286.05,0.1769,0.1769,0,0,0,0,-24);

	this.instance_1896 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1896.setTransform(209.2,321.25,0.1765,0.1765,-11.8966,0,0,3,-54.1);

	this.instance_1897 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1897.setTransform(206,279.35,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1898 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1898.setTransform(205.85,298.15,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_1899 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1899.setTransform(206.4,322.9,0.1764,0.1764,36.4467,0,0,3.8,-53.6);

	this.instance_1900 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1900.setTransform(209.55,306.15,0.1765,0.1765,7.7707,0,0,-0.4,1.8);

	this.instance_1901 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1901.setTransform(224.45,311.25,0.1766,0.1766,34.102,0,0,-4.4,2.6);

	this.instance_1902 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1902.setTransform(224.05,309.2,0.1766,0.1766,58.3987,0,0,-5.8,7.8);

	this.instance_1903 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1903.setTransform(214.75,298.45,0.1766,0.1766,49.3036,0,0,-40.2,-1);

	this.instance_1904 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1904.setTransform(214.85,285.05,0.1767,0.1767,91.2918,0,0,-32.9,-0.7);

	this.instance_1905 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1905.setTransform(202.3,305.65,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_1906 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1906.setTransform(77,282.15,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_1907 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1907.setTransform(71.15,309.95,0.1764,0.1764,-85.3717,0,0,6.2,-0.8);

	this.instance_1908 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1908.setTransform(72.2,308.9,0.1764,0.1764,-53.0042,0,0,4.5,-7.7);

	this.instance_1909 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1909.setTransform(70.7,294.6,0.1765,0.1765,-95.5726,0,0,39,-0.2);

	this.instance_1910 = new lib.ch1_headcopy("synched",0);
	this.instance_1910.setTransform(87.15,272.15,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1911 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1911.setTransform(85.8,282.65,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_1912 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1912.setTransform(88.7,318.55,0.1764,0.1764,-17.6276,0,0,5.2,-52.8);

	this.instance_1913 = new lib.ch1_neckcopy("synched",0);
	this.instance_1913.setTransform(86.25,275.95,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1914 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1914.setTransform(86.15,294.7,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_1915 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1915.setTransform(88.9,320.2,0.1763,0.1763,30.7052,0,0,4.7,-52.6);

	this.instance_1916 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1916.setTransform(88.6,303.25,0.1763,0.1763,-3.3484,0,0,1,2.4);

	this.instance_1917 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1917.setTransform(99.35,310.3,0.1765,0.1765,90.2527,0,0,-4.2,0.6);

	this.instance_1918 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1918.setTransform(100.55,308.7,0.1764,0.1764,109.9801,0,0,-6.3,5);

	this.instance_1919 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1919.setTransform(97.75,294.75,0.1765,0.1765,78.6599,0,0,-39.5,-3.3);

	this.instance_1920 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1920.setTransform(95.1,281.7,0.1764,0.1764,79.4966,0,0,-32.5,0);

	this.instance_1921 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1921.setTransform(83.2,302.4,0.1764,0.1764,-21.1258,0,0,1.9,-45.8);

	this.instance_1922 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1922.setTransform(106.4,272.1,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_1923 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1923.setTransform(106,300.1,0.1766,0.1766,-110.4755,0,0,6.2,-1.3);

	this.instance_1924 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1924.setTransform(105.45,298.65,0.1766,0.1766,-120.7464,0,0,4.4,-9);

	this.instance_1925 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1925.setTransform(101.05,284.95,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_1926 = new lib.ch1_headcopy2("synched",0);
	this.instance_1926.setTransform(116.4,262.1,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1927 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1927.setTransform(115.2,272.55,0.1769,0.1769,0,0,0,0,-22.9);

	this.instance_1928 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1928.setTransform(118.9,307.75,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_1929 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1929.setTransform(115.7,265.85,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1930 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1930.setTransform(115.55,284.65,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_1931 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1931.setTransform(116.1,309.4,0.1764,0.1764,36.4467,0,0,4.3,-52.9);

	this.instance_1932 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1932.setTransform(119.25,292.65,0.1765,0.1765,7.7707,0,0,0.5,3.6);

	this.instance_1933 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1933.setTransform(134.15,297.75,0.1766,0.1766,34.102,0,0,-4.4,2.6);

	this.instance_1934 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1934.setTransform(133.75,295.7,0.1766,0.1766,58.3987,0,0,-5.5,7.9);

	this.instance_1935 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1935.setTransform(124.45,284.95,0.1766,0.1766,49.3036,0,0,-40.2,-1);

	this.instance_1936 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1936.setTransform(124.55,271.55,0.1767,0.1767,91.2918,0,0,-32.5,-0.7);

	this.instance_1937 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1937.setTransform(112,292.15,0.1765,0.1765,-26.647,0,0,2.1,-44.6);

	this.instance_1938 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1938.setTransform(15.95,293.35,0.1764,0.1764,-63.3662,0,0,35.6,0.8);

	this.instance_1939 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1939.setTransform(10.1,321.15,0.1764,0.1764,-85.3717,0,0,6.2,-0.8);

	this.instance_1940 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1940.setTransform(11.15,320.05,0.1764,0.1764,-53.0042,0,0,4.8,-7.9);

	this.instance_1941 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1941.setTransform(9.7,305.8,0.1765,0.1765,-95.5726,0,0,39.3,-0.1);

	this.instance_1942 = new lib.ch1_headcopy("synched",0);
	this.instance_1942.setTransform(26.1,283.35,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1943 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1943.setTransform(24.75,293.85,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_1944 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1944.setTransform(27.65,329.75,0.1764,0.1764,-17.6276,0,0,3.4,-53.6);

	this.instance_1945 = new lib.ch1_neckcopy("synched",0);
	this.instance_1945.setTransform(25.2,287.15,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1946 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1946.setTransform(25.1,305.9,0.1767,0.1767,0,0,0,0.3,-22.9);

	this.instance_1947 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1947.setTransform(27.85,331.4,0.1763,0.1763,30.7052,0,0,4.4,-53.1);

	this.instance_1948 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1948.setTransform(27.5,314.45,0.1763,0.1763,-3.3484,0,0,0.7,2.3);

	this.instance_1949 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1949.setTransform(38.3,321.5,0.1765,0.1765,90.2527,0,0,-4.2,1.7);

	this.instance_1950 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1950.setTransform(39.5,319.9,0.1764,0.1764,109.9801,0,0,-5.9,7);

	this.instance_1951 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1951.setTransform(36.7,305.9,0.1765,0.1765,78.6599,0,0,-39.8,-2.2);

	this.instance_1952 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_1952.setTransform(34.05,292.9,0.1764,0.1764,79.4966,0,0,-32.5,-0.6);

	this.instance_1953 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_1953.setTransform(22.15,313.6,0.1764,0.1764,-21.1258,0,0,1.9,-45.8);

	this.instance_1954 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_1954.setTransform(37.3,282.15,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_1955 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1955.setTransform(48.9,306.75,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_1956 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_1956.setTransform(48.25,305.35,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_1957 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_1957.setTransform(37.35,296.15,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_1958 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_1958.setTransform(47.55,272.3,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_1959 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_1959.setTransform(46.15,282.6,0.177,0.177,0,0,0,0,-24);

	this.instance_1960 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_1960.setTransform(41.65,319.6,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_1961 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_1961.setTransform(46.55,275.95,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_1962 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_1962.setTransform(46.5,294.75,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_1963 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_1963.setTransform(53.8,319.35,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_1964 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_1964.setTransform(50,302.8,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_1965 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_1965.setTransform(51,310.9,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_1966 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_1966.setTransform(51.55,308.95,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_1967 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_1967.setTransform(53.25,294.9,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_1968 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_1968.setTransform(55.5,281.6,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_1969 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_1969.setTransform(43.9,302.45,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_1970 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_1970.setTransform(58.75,265.5,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_1971 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1971.setTransform(58.35,293.5,0.1766,0.1766,-110.4755,0,0,6,-1.4);

	this.instance_1972 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_1972.setTransform(57.8,292.05,0.1766,0.1766,-120.7464,0,0,4.8,-8.7);

	this.instance_1973 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_1973.setTransform(53.4,278.35,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_1974 = new lib.ch1_headcopy2("synched",0);
	this.instance_1974.setTransform(68.75,255.5,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_1975 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_1975.setTransform(67.55,265.95,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_1976 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_1976.setTransform(71.25,301.15,0.1765,0.1765,-11.8966,0,0,3,-53.8);

	this.instance_1977 = new lib.ch1_neckcopy2("synched",0);
	this.instance_1977.setTransform(68.05,259.25,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_1978 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_1978.setTransform(67.9,278.05,0.1769,0.1769,0,0,0,0.3,-22.9);

	this.instance_1979 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_1979.setTransform(68.45,302.8,0.1764,0.1764,36.4467,0,0,4,-53.3);

	this.instance_1980 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_1980.setTransform(71.6,286.05,0.1765,0.1765,7.7707,0,0,-0.3,2);

	this.instance_1981 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_1981.setTransform(86.5,291.15,0.1766,0.1766,34.102,0,0,-4.2,2.9);

	this.instance_1982 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_1982.setTransform(86.1,289.1,0.1766,0.1766,58.3987,0,0,-5.8,7.8);

	this.instance_1983 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_1983.setTransform(76.8,278.35,0.1766,0.1766,49.3036,0,0,-40,-0.8);

	this.instance_1984 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_1984.setTransform(76.9,264.95,0.1767,0.1767,91.2918,0,0,-32.9,-0.7);

	this.instance_1985 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_1985.setTransform(64.4,285.55,0.1765,0.1765,-26.647,0,0,2.4,-45.1);

	this.instance_1986 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_1986.setTransform(87.1,252.55,0.1764,0.1764,-63.3662,0,0,33.6,1.9);

	this.instance_1987 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1987.setTransform(81.25,280.35,0.1764,0.1764,-85.3717,0,0,4.2,-0.7);

	this.instance_1988 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_1988.setTransform(82.3,279.3,0.1764,0.1764,-53.0042,0,0,3,-6.5);

	this.instance_1989 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_1989.setTransform(80.8,265,0.1765,0.1765,-95.5726,0,0,37.1,-0.4);

	this.instance_1990 = new lib.ch1_headcopy("synched",0);
	this.instance_1990.setTransform(97.25,242.55,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_1991 = new lib.ch1_uBodycopy("synched",0);
	this.instance_1991.setTransform(95.9,253.05,0.1767,0.1767,0,0,0,0,-21.5);

	this.instance_1992 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_1992.setTransform(98.8,288.95,0.1764,0.1764,-17.6276,0,0,2.4,-51.6);

	this.instance_1993 = new lib.ch1_neckcopy("synched",0);
	this.instance_1993.setTransform(96.35,246.35,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_1994 = new lib.ch1_lBodycopy("synched",0);
	this.instance_1994.setTransform(96.25,265.1,0.1767,0.1767,0,0,0,0.3,-20.9);

	this.instance_1995 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_1995.setTransform(99.05,290.6,0.1763,0.1763,30.7052,0,0,5.5,-51.4);

	this.instance_1996 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_1996.setTransform(98.7,273.65,0.1763,0.1763,-3.3484,0,0,0.1,4.2);

	this.instance_1997 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_1997.setTransform(109.45,280.7,0.1765,0.1765,90.2527,0,0,-2.2,2.3);

	this.instance_1998 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_1998.setTransform(110.6,279.1,0.1764,0.1764,109.9801,0,0,-3.7,6.5);

	this.instance_1999 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_1999.setTransform(107.85,265.15,0.1765,0.1765,78.6599,0,0,-38,-1);

	this.instance_2000 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_2000.setTransform(105.2,252.1,0.1764,0.1764,79.4966,0,0,-30.6,0.4);

	this.instance_2001 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_2001.setTransform(93.3,272.8,0.1764,0.1764,-21.1258,0,0,1.2,-43.9);

	this.instance_2002 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_2002.setTransform(132.3,267.45,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_2003 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_2003.setTransform(143.9,292.05,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_2004 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2004.setTransform(143.25,290.65,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_2005 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_2005.setTransform(132.35,281.45,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_2006 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_2006.setTransform(142.55,257.6,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_2007 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_2007.setTransform(141.15,267.9,0.177,0.177,0,0,0,0,-24);

	this.instance_2008 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_2008.setTransform(136.65,304.9,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_2009 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_2009.setTransform(141.55,261.25,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_2010 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_2010.setTransform(141.5,280.05,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_2011 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_2011.setTransform(148.8,304.65,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_2012 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_2012.setTransform(145,288.1,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_2013 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_2013.setTransform(146,296.2,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_2014 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_2014.setTransform(146.55,294.25,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_2015 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_2015.setTransform(148.25,280.2,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_2016 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_2016.setTransform(150.5,266.9,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_2017 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_2017.setTransform(138.9,287.75,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_2018 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_2018.setTransform(160.35,277.65,0.1767,0.1767,-88.8816,0,0,36,0.7);

	this.instance_2019 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_2019.setTransform(171.95,302.25,0.1766,0.1766,-155.4696,0,0,5.8,-1.7);

	this.instance_2020 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2020.setTransform(171.3,300.85,0.1767,0.1767,-122.9901,0,0,4.7,-8.8);

	this.instance_2021 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_2021.setTransform(160.4,291.65,0.1767,0.1767,-140.7729,0,0,39.3,1.2);

	this.instance_2022 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_2022.setTransform(170.6,267.8,0.1768,0.1768,-3.6424,0,0,1.2,53.1);

	this.instance_2023 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_2023.setTransform(169.2,278.1,0.177,0.177,0,0,0,0,-24);

	this.instance_2024 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_2024.setTransform(164.7,315.1,0.1766,0.1766,12.7205,0,0,3.5,-54.1);

	this.instance_2025 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_2025.setTransform(169.6,271.45,0.1768,0.1768,12.1062,0,0,-0.5,8.8);

	this.instance_2026 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_2026.setTransform(169.55,290.25,0.177,0.177,0,0,0,0.3,-23.2);

	this.instance_2027 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_2027.setTransform(176.85,314.85,0.1766,0.1766,-6.8996,0,0,4,-53.7);

	this.instance_2028 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_2028.setTransform(173.05,298.3,0.1766,0.1766,-15.3958,0,0,-0.4,2.2);

	this.instance_2029 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_2029.setTransform(174.05,306.4,0.1766,0.1766,61.5953,0,0,-4.5,3);

	this.instance_2030 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_2030.setTransform(174.6,304.45,0.1766,0.1766,87.9209,0,0,-6.2,7.7);

	this.instance_2031 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_2031.setTransform(176.3,290.4,0.1767,0.1767,97.0894,0,0,-39.5,-1.1);

	this.instance_2032 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_2032.setTransform(178.55,277.1,0.1766,0.1766,100.1295,0,0,-33.5,-0.7);

	this.instance_2033 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_2033.setTransform(166.95,297.95,0.1767,0.1767,5.2428,0,0,2.9,-46);

	this.instance_2034 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_2034.setTransform(68.05,236.3,0.1767,0.1767,-90.7176,0,0,35.1,3.2);

	this.instance_2035 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_2035.setTransform(80.15,260.65,0.1766,0.1766,-148.1547,0,0,3.9,-0.8);

	this.instance_2036 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_2036.setTransform(79.5,259.2,0.1766,0.1766,-124.7888,0,0,3.5,-6.5);

	this.instance_2037 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_2037.setTransform(68.55,250.3,0.1765,0.1765,-141.5799,0,0,37.4,2.9);

	this.instance_2038 = new lib.ch1_headcopy_1("synched",0);
	this.instance_2038.setTransform(78.25,226.45,0.1767,0.1767,-3.6038,0,0,4,54.1);

	this.instance_2039 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_2039.setTransform(76.85,236.75,0.1769,0.1769,0,0,0,2,-23.2);

	this.instance_2040 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_2040.setTransform(74,273.9,0.1766,0.1766,16.7765,0,0,6,-54.8);

	this.instance_2041 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_2041.setTransform(77.35,230.05,0.1767,0.1767,12.0764,0,0,1.9,8.8);

	this.instance_2042 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_2042.setTransform(77.15,248.9,0.1769,0.1769,0,0,0,2.6,-22.6);

	this.instance_2043 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_2043.setTransform(83.25,273.85,0.1765,0.1765,-11.5596,0,0,5,-53.1);

	this.instance_2044 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_2044.setTransform(79.9,257.3,0.1765,0.1765,-14.6886,0,0,1.4,3.3);

	this.instance_2045 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_2045.setTransform(86.5,261.45,0.1766,0.1766,58.7246,0,0,-3.1,1.4);

	this.instance_2046 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_2046.setTransform(87.35,259.65,0.1766,0.1766,96.3533,0,0,-5.7,5.2);

	this.instance_2047 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_2047.setTransform(79.75,247.55,0.1766,0.1766,58.0487,0,0,-38.6,-2.8);

	this.instance_2048 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_2048.setTransform(86.15,235.75,0.1766,0.1766,119.3003,0,0,-34.4,-2.8);

	this.instance_2049 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_2049.setTransform(75.2,256.8,0.1766,0.1766,1.802,0,0,4.8,-45.8);

	this.instance_2050 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_2050.setTransform(181.35,266.65,0.1764,0.1764,-63.3662,0,0,35.4,1);

	this.instance_2051 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_2051.setTransform(175.5,294.45,0.1764,0.1764,-85.3717,0,0,6.2,-0.8);

	this.instance_2052 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2052.setTransform(176.55,293.4,0.1764,0.1764,-53.0042,0,0,4.5,-7.7);

	this.instance_2053 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_2053.setTransform(175.05,279.1,0.1765,0.1765,-95.5726,0,0,39,-0.2);

	this.instance_2054 = new lib.ch1_headcopy("synched",0);
	this.instance_2054.setTransform(191.5,256.65,0.1766,0.1766,-1.025,0,0,1.3,52.7);

	this.instance_2055 = new lib.ch1_uBodycopy("synched",0);
	this.instance_2055.setTransform(190.15,267.15,0.1767,0.1767,0,0,0,0,-23.5);

	this.instance_2056 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_2056.setTransform(193.05,303.05,0.1764,0.1764,-17.6276,0,0,3.3,-53.4);

	this.instance_2057 = new lib.ch1_neckcopy("synched",0);
	this.instance_2057.setTransform(190.6,260.45,0.1766,0.1766,10.6835,0,0,-0.7,8.8);

	this.instance_2058 = new lib.ch1_lBodycopy("synched",0);
	this.instance_2058.setTransform(190.5,279.2,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_2059 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_2059.setTransform(193.25,304.7,0.1763,0.1763,30.7052,0,0,4.7,-52.6);

	this.instance_2060 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_2060.setTransform(192.9,287.75,0.1763,0.1763,-3.3484,0,0,0.1,2.3);

	this.instance_2061 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_2061.setTransform(203.7,294.8,0.1765,0.1765,90.2527,0,0,-4.2,2.3);

	this.instance_2062 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_2062.setTransform(204.9,293.2,0.1764,0.1764,109.9801,0,0,-5.7,6.9);

	this.instance_2063 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_2063.setTransform(202.1,279.25,0.1765,0.1765,78.6599,0,0,-39.9,-1.7);

	this.instance_2064 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_2064.setTransform(199.45,266.2,0.1764,0.1764,79.4966,0,0,-32.5,0);

	this.instance_2065 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_2065.setTransform(187.55,286.9,0.1764,0.1764,-21.1258,0,0,1.9,-45.8);

	this.instance_2066 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_2066.setTransform(155.9,244.7,0.1766,0.1766,-67.6958,0,0,35.5,0.8);

	this.instance_2067 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_2067.setTransform(155.5,272.65,0.1766,0.1766,-110.4755,0,0,4.4,-2);

	this.instance_2068 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2068.setTransform(154.95,271.25,0.1766,0.1766,-120.7464,0,0,3.4,-9.6);

	this.instance_2069 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_2069.setTransform(150.55,257.55,0.1766,0.1766,-107.3768,0,0,40,0.1);

	this.instance_2070 = new lib.ch1_headcopy2("synched",0);
	this.instance_2070.setTransform(165.9,234.7,0.1768,0.1768,-1.9838,0,0,1,52.7);

	this.instance_2071 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_2071.setTransform(164.7,245.15,0.1769,0.1769,0,0,0,0,-21.8);

	this.instance_2072 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_2072.setTransform(168.4,280.35,0.1765,0.1765,-11.8966,0,0,2.8,-53);

	this.instance_2073 = new lib.ch1_neckcopy2("synched",0);
	this.instance_2073.setTransform(165.2,238.45,0.1767,0.1767,10.1642,0,0,-0.1,9);

	this.instance_2074 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_2074.setTransform(165.05,257.25,0.1769,0.1769,0,0,0,0.3,-21.5);

	this.instance_2075 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_2075.setTransform(165.6,281.95,0.1764,0.1764,36.4467,0,0,5,-52);

	this.instance_2076 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_2076.setTransform(168.75,265.25,0.1765,0.1765,7.7707,0,0,-0.1,4);

	this.instance_2077 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_2077.setTransform(183.7,270.35,0.1766,0.1766,34.102,0,0,-3.2,4.2);

	this.instance_2078 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_2078.setTransform(183.2,268.3,0.1766,0.1766,58.3987,0,0,-5.7,8.2);

	this.instance_2079 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_2079.setTransform(173.95,257.55,0.1766,0.1766,49.3036,0,0,-38.8,0.3);

	this.instance_2080 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_2080.setTransform(174,244.15,0.1767,0.1767,91.2918,0,0,-30.9,-0.7);

	this.instance_2081 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_2081.setTransform(161.5,264.7,0.1765,0.1765,-26.647,0,0,1.6,-43.6);

	this.instance_2082 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_2082.setTransform(15,257.45,0.1766,0.1766,-67.6966,0,0,35.5,0.8);

	this.instance_2083 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_2083.setTransform(14.6,285.45,0.1765,0.1765,-110.4743,0,0,6.2,-1.3);

	this.instance_2084 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2084.setTransform(14.05,284,0.1766,0.1766,-120.7447,0,0,5,-8.5);

	this.instance_2085 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_2085.setTransform(9.6,270.3,0.1766,0.1766,-107.3735,0,0,40.3,0.1);

	this.instance_2086 = new lib.ch1_headcopy2("synched",0);
	this.instance_2086.setTransform(25,247.45,0.1767,0.1767,-1.9792,0,0,1,52.7);

	this.instance_2087 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_2087.setTransform(23.8,257.9,0.1769,0.1769,0,0,0,0,-23.8);

	this.instance_2088 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_2088.setTransform(27.5,293.1,0.1765,0.1765,-11.8938,0,0,3,-54.1);

	this.instance_2089 = new lib.ch1_neckcopy2("synched",0);
	this.instance_2089.setTransform(24.3,251.2,0.1767,0.1767,10.161,0,0,-0.1,9);

	this.instance_2090 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_2090.setTransform(24.15,270,0.1769,0.1769,0,0,0,0.3,-23.2);

	this.instance_2091 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_2091.setTransform(24.7,294.75,0.1764,0.1764,36.4446,0,0,3.8,-53.6);

	this.instance_2092 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_2092.setTransform(27.85,278,0.1765,0.1765,7.7672,0,0,-0.3,2);

	this.instance_2093 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_2093.setTransform(42.75,283.1,0.1766,0.1766,34.1007,0,0,-4.4,2.6);

	this.instance_2094 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_2094.setTransform(42.35,281.05,0.1766,0.1766,58.4003,0,0,-5.8,7.8);

	this.instance_2095 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_2095.setTransform(33.05,270.3,0.1765,0.1765,49.3047,0,0,-40.2,-1);

	this.instance_2096 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_2096.setTransform(33.15,256.9,0.1766,0.1766,91.287,0,0,-32.9,-0.7);

	this.instance_2097 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_2097.setTransform(20.6,277.5,0.1765,0.1765,-26.647,0,0,2.5,-45.4);

	this.instance_2098 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_2098.setTransform(113.4,241.05,0.1764,0.1764,-63.3685,0,0,35.4,1);

	this.instance_2099 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_2099.setTransform(107.6,268.85,0.1764,0.1764,-85.3759,0,0,5.4,-0.7);

	this.instance_2100 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2100.setTransform(108.6,267.8,0.1763,0.1763,-53.0052,0,0,2.7,-6.3);

	this.instance_2101 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_2101.setTransform(107.1,253.5,0.1764,0.1764,-95.5681,0,0,36.8,-0.4);

	this.instance_2102 = new lib.ch1_headcopy("synched",0);
	this.instance_2102.setTransform(123.55,231.05,0.1766,0.1766,-1.0201,0,0,1.4,52.7);

	this.instance_2103 = new lib.ch1_uBodycopy("synched",0);
	this.instance_2103.setTransform(122.2,241.55,0.1767,0.1767,0,0,0,0,-21.8);

	this.instance_2104 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_2104.setTransform(125.1,277.45,0.1763,0.1763,-17.6244,0,0,2.8,-51.8);

	this.instance_2105 = new lib.ch1_neckcopy("synched",0);
	this.instance_2105.setTransform(122.65,234.85,0.1765,0.1765,10.6796,0,0,-0.7,8.8);

	this.instance_2106 = new lib.ch1_lBodycopy("synched",0);
	this.instance_2106.setTransform(122.55,253.6,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_2107 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_2107.setTransform(125.3,279.1,0.1762,0.1762,30.706,0,0,5.6,-51.1);

	this.instance_2108 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_2108.setTransform(124.95,262.15,0.1763,0.1763,-3.344,0,0,0.1,2.3);

	this.instance_2109 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_2109.setTransform(135.75,269.2,0.1764,0.1764,90.2478,0,0,-3.4,2.3);

	this.instance_2110 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_2110.setTransform(136.95,267.6,0.1764,0.1764,109.9772,0,0,-4,6.3);

	this.instance_2111 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_2111.setTransform(134.15,253.65,0.1764,0.1764,78.6638,0,0,-39.9,-1.4);

	this.instance_2112 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_2112.setTransform(131.5,240.6,0.1764,0.1764,79.5006,0,0,-32.5,0);

	this.instance_2113 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_2113.setTransform(119.6,261.3,0.1764,0.1764,-21.1229,0,0,1.2,-44.2);

	this.instance_2114 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_2114.setTransform(219.4,273.75,0.1764,0.1764,-63.3685,0,0,35.4,1);

	this.instance_2115 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_2115.setTransform(213.6,301.55,0.1764,0.1764,-85.3759,0,0,5.4,-0.7);

	this.instance_2116 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2116.setTransform(214.6,300.5,0.1763,0.1763,-53.0052,0,0,3.9,-7.2);

	this.instance_2117 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_2117.setTransform(213.1,286.2,0.1764,0.1764,-95.5681,0,0,38.2,-0.2);

	this.instance_2118 = new lib.ch1_headcopy("synched",0);
	this.instance_2118.setTransform(229.55,263.75,0.1766,0.1766,-1.0201,0,0,1.4,52.7);

	this.instance_2119 = new lib.ch1_uBodycopy("synched",0);
	this.instance_2119.setTransform(228.2,274.25,0.1767,0.1767,0,0,0,0,-22.7);

	this.instance_2120 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_2120.setTransform(231.1,310.15,0.1763,0.1763,-17.6244,0,0,3.3,-53.4);

	this.instance_2121 = new lib.ch1_neckcopy("synched",0);
	this.instance_2121.setTransform(228.65,267.55,0.1765,0.1765,10.6796,0,0,-0.7,8.8);

	this.instance_2122 = new lib.ch1_lBodycopy("synched",0);
	this.instance_2122.setTransform(228.55,286.3,0.1767,0.1767,0,0,0,0.3,-22.7);

	this.instance_2123 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_2123.setTransform(231.3,311.8,0.1762,0.1762,30.706,0,0,4.9,-52.4);

	this.instance_2124 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_2124.setTransform(230.95,294.85,0.1763,0.1763,-3.344,0,0,0.1,2.3);

	this.instance_2125 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_2125.setTransform(241.75,301.9,0.1764,0.1764,90.2478,0,0,-3.4,2.3);

	this.instance_2126 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_2126.setTransform(242.95,300.3,0.1764,0.1764,109.9772,0,0,-5.7,6.9);

	this.instance_2127 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_2127.setTransform(240.15,286.35,0.1764,0.1764,78.6638,0,0,-39.9,-1.4);

	this.instance_2128 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_2128.setTransform(237.5,273.3,0.1764,0.1764,79.5006,0,0,-32.5,0);

	this.instance_2129 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_2129.setTransform(225.6,294,0.1764,0.1764,-21.1229,0,0,1.6,-45);

	this.instance_2130 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_2130.setTransform(243.55,259.25,0.1766,0.1766,-67.6966,0,0,35.5,0.8);

	this.instance_2131 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_2131.setTransform(243.15,287.2,0.1765,0.1765,-110.4743,0,0,4.7,-1.9);

	this.instance_2132 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2132.setTransform(242.6,285.8,0.1766,0.1766,-120.7447,0,0,3.6,-9.4);

	this.instance_2133 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_2133.setTransform(238.2,272.1,0.1766,0.1766,-107.3735,0,0,40.1,0.1);

	this.instance_2134 = new lib.ch1_headcopy2("synched",0);
	this.instance_2134.setTransform(253.55,249.25,0.1767,0.1767,-1.9792,0,0,1,52.7);

	this.instance_2135 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_2135.setTransform(252.35,259.7,0.1769,0.1769,0,0,0,0,-21.8);

	this.instance_2136 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_2136.setTransform(256.05,294.9,0.1765,0.1765,-11.8938,0,0,3,-53.8);

	this.instance_2137 = new lib.ch1_neckcopy2("synched",0);
	this.instance_2137.setTransform(252.85,253,0.1767,0.1767,10.161,0,0,-0.1,9);

	this.instance_2138 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_2138.setTransform(252.7,271.8,0.1769,0.1769,0,0,0,0.3,-22.4);

	this.instance_2139 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_2139.setTransform(253.25,296.55,0.1764,0.1764,36.4446,0,0,4.8,-52.2);

	this.instance_2140 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_2140.setTransform(256.4,279.8,0.1765,0.1765,7.7672,0,0,-0.1,4);

	this.instance_2141 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_2141.setTransform(271.3,284.9,0.1766,0.1766,34.1007,0,0,-3.5,4);

	this.instance_2142 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_2142.setTransform(270.9,282.85,0.1766,0.1766,58.4003,0,0,-5.5,7.9);

	this.instance_2143 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_2143.setTransform(261.6,272.1,0.1765,0.1765,49.3047,0,0,-39,0.1);

	this.instance_2144 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_2144.setTransform(261.7,258.7,0.1766,0.1766,91.287,0,0,-31.8,-0.7);

	this.instance_2145 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_2145.setTransform(249.1,279.25,0.1765,0.1765,-26.647,0,0,1.7,-43.9);

	this.instance_2146 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_2146.setTransform(309.8,254.35,0.1765,0.1765,-63.3663,0,0,35.4,1);

	this.instance_2147 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_2147.setTransform(303.95,282.15,0.1764,0.1764,-85.3672,0,0,6.2,-0.8);

	this.instance_2148 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2148.setTransform(305,281.1,0.1764,0.1764,-53.0022,0,0,4.5,-7.7);

	this.instance_2149 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_2149.setTransform(303.5,266.8,0.1765,0.1765,-95.577,0,0,39,-0.2);

	this.instance_2150 = new lib.ch1_headcopy("synched",0);
	this.instance_2150.setTransform(319.95,244.35,0.1766,0.1766,-1.0298,0,0,1.3,52.7);

	this.instance_2151 = new lib.ch1_uBodycopy("synched",0);
	this.instance_2151.setTransform(318.6,254.85,0.1768,0.1768,0,0,0,0,-23.5);

	this.instance_2152 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_2152.setTransform(321.5,290.75,0.1764,0.1764,-17.6293,0,0,3,-53.5);

	this.instance_2153 = new lib.ch1_neckcopy("synched",0);
	this.instance_2153.setTransform(319.05,248.15,0.1766,0.1766,10.6875,0,0,-0.7,8.8);

	this.instance_2154 = new lib.ch1_lBodycopy("synched",0);
	this.instance_2154.setTransform(318.95,266.9,0.1768,0.1768,0,0,0,0.3,-22.9);

	this.instance_2155 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_2155.setTransform(321.7,292.4,0.1763,0.1763,30.7069,0,0,4.4,-53.1);

	this.instance_2156 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_2156.setTransform(321.35,275.45,0.1764,0.1764,-3.3531,0,0,0.1,2.3);

	this.instance_2157 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_2157.setTransform(332.15,282.5,0.1765,0.1765,90.2576,0,0,-4.2,2.3);

	this.instance_2158 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_2158.setTransform(333.35,280.9,0.1765,0.1765,109.9814,0,0,-5.5,7.2);

	this.instance_2159 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_2159.setTransform(330.55,266.95,0.1765,0.1765,78.657,0,0,-39.9,-1.4);

	this.instance_2160 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_2160.setTransform(327.9,253.9,0.1765,0.1765,79.4926,0,0,-32.5,0);

	this.instance_2161 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_2161.setTransform(316,274.6,0.1764,0.1764,-21.1286,0,0,1.9,-45.8);

	this.instance_2162 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_2162.setTransform(290.7,238.15,0.1767,0.1767,-90.7176,0,0,35.1,1.3);

	this.instance_2163 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_2163.setTransform(302.75,262.5,0.1766,0.1766,-148.1547,0,0,5.3,-1.7);

	this.instance_2164 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_2164.setTransform(302.1,261.05,0.1766,0.1766,-124.7888,0,0,4.5,-8);

	this.instance_2165 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_2165.setTransform(291.15,252.15,0.1765,0.1765,-141.5799,0,0,38.9,1.7);

	this.instance_2166 = new lib.ch1_headcopy_1("synched",0);
	this.instance_2166.setTransform(300.85,228.3,0.1767,0.1767,-3.6038,0,0,2,54);

	this.instance_2167 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_2167.setTransform(299.45,238.6,0.1769,0.1769,0,0,0,0,-23.2);

	this.instance_2168 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_2168.setTransform(296.6,275.75,0.1766,0.1766,16.7765,0,0,4.4,-54.2);

	this.instance_2169 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_2169.setTransform(299.95,231.95,0.1767,0.1767,12.0764,0,0,-0.1,9.2);

	this.instance_2170 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_2170.setTransform(299.75,250.75,0.1769,0.1769,0,0,0,0.8,-22.6);

	this.instance_2171 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_2171.setTransform(305.9,275.75,0.1765,0.1765,-11.5596,0,0,3.1,-53.5);

	this.instance_2172 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_2172.setTransform(302.5,259.15,0.1765,0.1765,-14.6886,0,0,-0.5,2.8);

	this.instance_2173 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_2173.setTransform(309.1,263.25,0.1766,0.1766,58.7246,0,0,-4.2,3.1);

	this.instance_2174 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_2174.setTransform(309.95,261.5,0.1766,0.1766,96.3533,0,0,-5.5,6.9);

	this.instance_2175 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_2175.setTransform(302.35,249.4,0.1766,0.1766,58.0487,0,0,-39.6,-1.3);

	this.instance_2176 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_2176.setTransform(308.75,237.6,0.1766,0.1766,119.3003,0,0,-33.4,-1.1);

	this.instance_2177 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_2177.setTransform(297.8,258.65,0.1766,0.1766,1.802,0,0,2.8,-45.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2177},{t:this.instance_2176},{t:this.instance_2175},{t:this.instance_2174},{t:this.instance_2173},{t:this.instance_2172},{t:this.instance_2171},{t:this.instance_2170},{t:this.instance_2169},{t:this.instance_2168},{t:this.instance_2167},{t:this.instance_2166},{t:this.instance_2165},{t:this.instance_2164},{t:this.instance_2163},{t:this.instance_2162},{t:this.instance_2161},{t:this.instance_2160},{t:this.instance_2159},{t:this.instance_2158},{t:this.instance_2157},{t:this.instance_2156},{t:this.instance_2155},{t:this.instance_2154},{t:this.instance_2153},{t:this.instance_2152},{t:this.instance_2151},{t:this.instance_2150},{t:this.instance_2149},{t:this.instance_2148},{t:this.instance_2147},{t:this.instance_2146},{t:this.instance_2145},{t:this.instance_2144},{t:this.instance_2143},{t:this.instance_2142},{t:this.instance_2141},{t:this.instance_2140},{t:this.instance_2139},{t:this.instance_2138},{t:this.instance_2137},{t:this.instance_2136},{t:this.instance_2135},{t:this.instance_2134},{t:this.instance_2133},{t:this.instance_2132},{t:this.instance_2131},{t:this.instance_2130},{t:this.instance_2129},{t:this.instance_2128},{t:this.instance_2127},{t:this.instance_2126},{t:this.instance_2125},{t:this.instance_2124},{t:this.instance_2123},{t:this.instance_2122},{t:this.instance_2121},{t:this.instance_2120},{t:this.instance_2119},{t:this.instance_2118},{t:this.instance_2117},{t:this.instance_2116},{t:this.instance_2115},{t:this.instance_2114},{t:this.instance_2113},{t:this.instance_2112},{t:this.instance_2111},{t:this.instance_2110},{t:this.instance_2109},{t:this.instance_2108},{t:this.instance_2107},{t:this.instance_2106},{t:this.instance_2105},{t:this.instance_2104},{t:this.instance_2103},{t:this.instance_2102},{t:this.instance_2101},{t:this.instance_2100},{t:this.instance_2099},{t:this.instance_2098},{t:this.instance_2097},{t:this.instance_2096},{t:this.instance_2095},{t:this.instance_2094},{t:this.instance_2093},{t:this.instance_2092},{t:this.instance_2091},{t:this.instance_2090},{t:this.instance_2089},{t:this.instance_2088},{t:this.instance_2087},{t:this.instance_2086},{t:this.instance_2085},{t:this.instance_2084},{t:this.instance_2083},{t:this.instance_2082},{t:this.instance_2081},{t:this.instance_2080},{t:this.instance_2079},{t:this.instance_2078},{t:this.instance_2077},{t:this.instance_2076},{t:this.instance_2075},{t:this.instance_2074},{t:this.instance_2073},{t:this.instance_2072},{t:this.instance_2071},{t:this.instance_2070},{t:this.instance_2069},{t:this.instance_2068},{t:this.instance_2067},{t:this.instance_2066},{t:this.instance_2065},{t:this.instance_2064},{t:this.instance_2063},{t:this.instance_2062},{t:this.instance_2061},{t:this.instance_2060},{t:this.instance_2059},{t:this.instance_2058},{t:this.instance_2057},{t:this.instance_2056},{t:this.instance_2055},{t:this.instance_2054},{t:this.instance_2053},{t:this.instance_2052},{t:this.instance_2051},{t:this.instance_2050},{t:this.instance_2049},{t:this.instance_2048},{t:this.instance_2047},{t:this.instance_2046},{t:this.instance_2045},{t:this.instance_2044},{t:this.instance_2043},{t:this.instance_2042},{t:this.instance_2041},{t:this.instance_2040},{t:this.instance_2039},{t:this.instance_2038},{t:this.instance_2037},{t:this.instance_2036},{t:this.instance_2035},{t:this.instance_2034},{t:this.instance_2033},{t:this.instance_2032},{t:this.instance_2031},{t:this.instance_2030},{t:this.instance_2029},{t:this.instance_2028},{t:this.instance_2027},{t:this.instance_2026},{t:this.instance_2025},{t:this.instance_2024},{t:this.instance_2023},{t:this.instance_2022},{t:this.instance_2021},{t:this.instance_2020},{t:this.instance_2019},{t:this.instance_2018},{t:this.instance_2017},{t:this.instance_2016},{t:this.instance_2015},{t:this.instance_2014},{t:this.instance_2013},{t:this.instance_2012},{t:this.instance_2011},{t:this.instance_2010},{t:this.instance_2009},{t:this.instance_2008},{t:this.instance_2007},{t:this.instance_2006},{t:this.instance_2005},{t:this.instance_2004},{t:this.instance_2003},{t:this.instance_2002},{t:this.instance_2001},{t:this.instance_2000},{t:this.instance_1999},{t:this.instance_1998},{t:this.instance_1997},{t:this.instance_1996},{t:this.instance_1995},{t:this.instance_1994},{t:this.instance_1993},{t:this.instance_1992},{t:this.instance_1991},{t:this.instance_1990},{t:this.instance_1989},{t:this.instance_1988},{t:this.instance_1987},{t:this.instance_1986},{t:this.instance_1985},{t:this.instance_1984},{t:this.instance_1983},{t:this.instance_1982},{t:this.instance_1981},{t:this.instance_1980},{t:this.instance_1979},{t:this.instance_1978},{t:this.instance_1977},{t:this.instance_1976},{t:this.instance_1975},{t:this.instance_1974},{t:this.instance_1973},{t:this.instance_1972},{t:this.instance_1971},{t:this.instance_1970},{t:this.instance_1969},{t:this.instance_1968},{t:this.instance_1967},{t:this.instance_1966},{t:this.instance_1965},{t:this.instance_1964},{t:this.instance_1963},{t:this.instance_1962},{t:this.instance_1961},{t:this.instance_1960},{t:this.instance_1959},{t:this.instance_1958},{t:this.instance_1957},{t:this.instance_1956},{t:this.instance_1955},{t:this.instance_1954},{t:this.instance_1953},{t:this.instance_1952},{t:this.instance_1951},{t:this.instance_1950},{t:this.instance_1949},{t:this.instance_1948},{t:this.instance_1947},{t:this.instance_1946},{t:this.instance_1945},{t:this.instance_1944},{t:this.instance_1943},{t:this.instance_1942},{t:this.instance_1941},{t:this.instance_1940},{t:this.instance_1939},{t:this.instance_1938},{t:this.instance_1937},{t:this.instance_1936},{t:this.instance_1935},{t:this.instance_1934},{t:this.instance_1933},{t:this.instance_1932},{t:this.instance_1931},{t:this.instance_1930},{t:this.instance_1929},{t:this.instance_1928},{t:this.instance_1927},{t:this.instance_1926},{t:this.instance_1925},{t:this.instance_1924},{t:this.instance_1923},{t:this.instance_1922},{t:this.instance_1921},{t:this.instance_1920},{t:this.instance_1919},{t:this.instance_1918},{t:this.instance_1917},{t:this.instance_1916},{t:this.instance_1915},{t:this.instance_1914},{t:this.instance_1913},{t:this.instance_1912},{t:this.instance_1911},{t:this.instance_1910},{t:this.instance_1909},{t:this.instance_1908},{t:this.instance_1907},{t:this.instance_1906},{t:this.instance_1905},{t:this.instance_1904},{t:this.instance_1903},{t:this.instance_1902},{t:this.instance_1901},{t:this.instance_1900},{t:this.instance_1899},{t:this.instance_1898},{t:this.instance_1897},{t:this.instance_1896},{t:this.instance_1895},{t:this.instance_1894},{t:this.instance_1893},{t:this.instance_1892},{t:this.instance_1891},{t:this.instance_1890},{t:this.instance_1889},{t:this.instance_1888},{t:this.instance_1887},{t:this.instance_1886},{t:this.instance_1885},{t:this.instance_1884},{t:this.instance_1883},{t:this.instance_1882},{t:this.instance_1881},{t:this.instance_1880},{t:this.instance_1879},{t:this.instance_1878},{t:this.instance_1877},{t:this.instance_1876},{t:this.instance_1875},{t:this.instance_1874},{t:this.instance_1873},{t:this.instance_1872},{t:this.instance_1871},{t:this.instance_1870},{t:this.instance_1869},{t:this.instance_1868},{t:this.instance_1867},{t:this.instance_1866},{t:this.instance_1865},{t:this.instance_1864},{t:this.instance_1863},{t:this.instance_1862},{t:this.instance_1861},{t:this.instance_1860},{t:this.instance_1859},{t:this.instance_1858},{t:this.instance_1857},{t:this.instance_1856},{t:this.instance_1855},{t:this.instance_1854},{t:this.instance_1853},{t:this.instance_1852},{t:this.instance_1851},{t:this.instance_1850},{t:this.instance_1849},{t:this.instance_1848},{t:this.instance_1847},{t:this.instance_1846},{t:this.instance_1845},{t:this.instance_1844},{t:this.instance_1843},{t:this.instance_1842},{t:this.instance_1841},{t:this.instance_1840},{t:this.instance_1839},{t:this.instance_1838},{t:this.instance_1837},{t:this.instance_1836},{t:this.instance_1835},{t:this.instance_1834},{t:this.instance_1833},{t:this.instance_1832},{t:this.instance_1831},{t:this.instance_1830},{t:this.instance_1829},{t:this.instance_1828},{t:this.instance_1827},{t:this.instance_1826},{t:this.instance_1825},{t:this.instance_1824},{t:this.instance_1823},{t:this.instance_1822},{t:this.instance_1821},{t:this.instance_1820},{t:this.instance_1819},{t:this.instance_1818},{t:this.instance_1817},{t:this.instance_1816},{t:this.instance_1815},{t:this.instance_1814},{t:this.instance_1813},{t:this.instance_1812},{t:this.instance_1811},{t:this.instance_1810},{t:this.instance_1809},{t:this.instance_1808},{t:this.instance_1807},{t:this.instance_1806},{t:this.instance_1805},{t:this.instance_1804},{t:this.instance_1803},{t:this.instance_1802},{t:this.instance_1801},{t:this.instance_1800},{t:this.instance_1799},{t:this.instance_1798},{t:this.instance_1797},{t:this.instance_1796},{t:this.instance_1795},{t:this.instance_1794},{t:this.instance_1793},{t:this.instance_1792},{t:this.instance_1791},{t:this.instance_1790},{t:this.instance_1789},{t:this.instance_1788},{t:this.instance_1787},{t:this.instance_1786},{t:this.instance_1785},{t:this.instance_1784},{t:this.instance_1783},{t:this.instance_1782},{t:this.instance_1781},{t:this.instance_1780},{t:this.instance_1779},{t:this.instance_1778},{t:this.instance_1777},{t:this.instance_1776},{t:this.instance_1775},{t:this.instance_1774},{t:this.instance_1773},{t:this.instance_1772},{t:this.instance_1771},{t:this.instance_1770},{t:this.instance_1769},{t:this.instance_1768},{t:this.instance_1767},{t:this.instance_1766},{t:this.instance_1765},{t:this.instance_1764},{t:this.instance_1763},{t:this.instance_1762},{t:this.instance_1761},{t:this.instance_1760},{t:this.instance_1759},{t:this.instance_1758},{t:this.instance_1757},{t:this.instance_1756},{t:this.instance_1755},{t:this.instance_1754},{t:this.instance_1753},{t:this.instance_1752},{t:this.instance_1751},{t:this.instance_1750},{t:this.instance_1749},{t:this.instance_1748},{t:this.instance_1747},{t:this.instance_1746},{t:this.instance_1745},{t:this.instance_1744},{t:this.instance_1743},{t:this.instance_1742},{t:this.instance_1741},{t:this.instance_1740},{t:this.instance_1739},{t:this.instance_1738},{t:this.instance_1737},{t:this.instance_1736},{t:this.instance_1735},{t:this.instance_1734},{t:this.instance_1733},{t:this.instance_1732},{t:this.instance_1731},{t:this.instance_1730},{t:this.instance_1729},{t:this.instance_1728},{t:this.instance_1727},{t:this.instance_1726},{t:this.instance_1725},{t:this.instance_1724},{t:this.instance_1723},{t:this.instance_1722},{t:this.instance_1721},{t:this.instance_1720},{t:this.instance_1719},{t:this.instance_1718},{t:this.instance_1717},{t:this.instance_1716},{t:this.instance_1715},{t:this.instance_1714},{t:this.instance_1713},{t:this.instance_1712},{t:this.instance_1711},{t:this.instance_1710},{t:this.instance_1709},{t:this.instance_1708},{t:this.instance_1707},{t:this.instance_1706},{t:this.instance_1705},{t:this.instance_1704},{t:this.instance_1703},{t:this.instance_1702},{t:this.instance_1701},{t:this.instance_1700},{t:this.instance_1699},{t:this.instance_1698},{t:this.instance_1697},{t:this.instance_1696},{t:this.instance_1695},{t:this.instance_1694},{t:this.instance_1693},{t:this.instance_1692},{t:this.instance_1691},{t:this.instance_1690},{t:this.instance_1689},{t:this.instance_1688},{t:this.instance_1687},{t:this.instance_1686},{t:this.instance_1685},{t:this.instance_1684},{t:this.instance_1683},{t:this.instance_1682},{t:this.instance_1681},{t:this.instance_1680},{t:this.instance_1679},{t:this.instance_1678},{t:this.instance_1677},{t:this.instance_1676},{t:this.instance_1675},{t:this.instance_1674},{t:this.instance_1673},{t:this.instance_1672},{t:this.instance_1671},{t:this.instance_1670},{t:this.instance_1669},{t:this.instance_1668},{t:this.instance_1667},{t:this.instance_1666},{t:this.instance_1665},{t:this.instance_1664},{t:this.instance_1663},{t:this.instance_1662},{t:this.instance_1661},{t:this.instance_1660},{t:this.instance_1659},{t:this.instance_1658},{t:this.instance_1657},{t:this.instance_1656},{t:this.instance_1655},{t:this.instance_1654},{t:this.instance_1653},{t:this.instance_1652},{t:this.instance_1651},{t:this.instance_1650},{t:this.instance_1649},{t:this.instance_1648},{t:this.instance_1647},{t:this.instance_1646},{t:this.instance_1645},{t:this.instance_1644},{t:this.instance_1643},{t:this.instance_1642},{t:this.instance_1641},{t:this.instance_1640},{t:this.instance_1639},{t:this.instance_1638},{t:this.instance_1637},{t:this.instance_1636},{t:this.instance_1635},{t:this.instance_1634},{t:this.instance_1633},{t:this.instance_1632},{t:this.instance_1631},{t:this.instance_1630},{t:this.instance_1629},{t:this.instance_1628},{t:this.instance_1627},{t:this.instance_1626},{t:this.instance_1625},{t:this.instance_1624},{t:this.instance_1623},{t:this.instance_1622},{t:this.instance_1621},{t:this.instance_1620},{t:this.instance_1619},{t:this.instance_1618},{t:this.instance_1617},{t:this.instance_1616},{t:this.instance_1615},{t:this.instance_1614},{t:this.instance_1613},{t:this.instance_1612},{t:this.instance_1611},{t:this.instance_1610},{t:this.instance_1609},{t:this.instance_1608},{t:this.instance_1607},{t:this.instance_1606},{t:this.instance_1605},{t:this.instance_1604},{t:this.instance_1603},{t:this.instance_1602},{t:this.instance_1601},{t:this.instance_1600},{t:this.instance_1599},{t:this.instance_1598},{t:this.instance_1597},{t:this.instance_1596},{t:this.instance_1595},{t:this.instance_1594},{t:this.instance_1593},{t:this.instance_1592},{t:this.instance_1591},{t:this.instance_1590},{t:this.instance_1589},{t:this.instance_1588},{t:this.instance_1587},{t:this.instance_1586},{t:this.instance_1585},{t:this.instance_1584},{t:this.instance_1583},{t:this.instance_1582},{t:this.instance_1581},{t:this.instance_1580},{t:this.instance_1579},{t:this.instance_1578},{t:this.instance_1577},{t:this.instance_1576},{t:this.instance_1575},{t:this.instance_1574},{t:this.instance_1573},{t:this.instance_1572},{t:this.instance_1571},{t:this.instance_1570},{t:this.instance_1569},{t:this.instance_1568},{t:this.instance_1567},{t:this.instance_1566},{t:this.instance_1565},{t:this.instance_1564},{t:this.instance_1563},{t:this.instance_1562},{t:this.instance_1561},{t:this.instance_1560},{t:this.instance_1559},{t:this.instance_1558},{t:this.instance_1557},{t:this.instance_1556},{t:this.instance_1555},{t:this.instance_1554},{t:this.instance_1553},{t:this.instance_1552},{t:this.instance_1551},{t:this.instance_1550},{t:this.instance_1549},{t:this.instance_1548},{t:this.instance_1547},{t:this.instance_1546},{t:this.instance_1545},{t:this.instance_1544},{t:this.instance_1543},{t:this.instance_1542},{t:this.instance_1541},{t:this.instance_1540},{t:this.instance_1539},{t:this.instance_1538},{t:this.instance_1537},{t:this.instance_1536},{t:this.instance_1535},{t:this.instance_1534},{t:this.instance_1533},{t:this.instance_1532},{t:this.instance_1531},{t:this.instance_1530},{t:this.instance_1529},{t:this.instance_1528},{t:this.instance_1527},{t:this.instance_1526},{t:this.instance_1525},{t:this.instance_1524},{t:this.instance_1523},{t:this.instance_1522},{t:this.instance_1521},{t:this.instance_1520},{t:this.instance_1519},{t:this.instance_1518},{t:this.instance_1517},{t:this.instance_1516},{t:this.instance_1515},{t:this.instance_1514},{t:this.instance_1513},{t:this.instance_1512},{t:this.instance_1511},{t:this.instance_1510},{t:this.instance_1509},{t:this.instance_1508},{t:this.instance_1507},{t:this.instance_1506},{t:this.instance_1505},{t:this.instance_1504},{t:this.instance_1503},{t:this.instance_1502},{t:this.instance_1501},{t:this.instance_1500},{t:this.instance_1499},{t:this.instance_1498},{t:this.instance_1497},{t:this.instance_1496},{t:this.instance_1495},{t:this.instance_1494},{t:this.instance_1493},{t:this.instance_1492},{t:this.instance_1491},{t:this.instance_1490},{t:this.instance_1489},{t:this.instance_1488},{t:this.instance_1487},{t:this.instance_1486},{t:this.instance_1485},{t:this.instance_1484},{t:this.instance_1483},{t:this.instance_1482},{t:this.instance_1481},{t:this.instance_1480},{t:this.instance_1479},{t:this.instance_1478},{t:this.instance_1477},{t:this.instance_1476},{t:this.instance_1475},{t:this.instance_1474},{t:this.instance_1473},{t:this.instance_1472},{t:this.instance_1471},{t:this.instance_1470},{t:this.instance_1469},{t:this.instance_1468},{t:this.instance_1467},{t:this.instance_1466},{t:this.instance_1465},{t:this.instance_1464},{t:this.instance_1463},{t:this.instance_1462},{t:this.instance_1461},{t:this.instance_1460},{t:this.instance_1459},{t:this.instance_1458},{t:this.instance_1457},{t:this.instance_1456},{t:this.instance_1455},{t:this.instance_1454},{t:this.instance_1453},{t:this.instance_1452},{t:this.instance_1451},{t:this.instance_1450},{t:this.instance_1449},{t:this.instance_1448},{t:this.instance_1447},{t:this.instance_1446},{t:this.instance_1445},{t:this.instance_1444},{t:this.instance_1443},{t:this.instance_1442},{t:this.instance_1441},{t:this.instance_1440},{t:this.instance_1439},{t:this.instance_1438},{t:this.instance_1437},{t:this.instance_1436},{t:this.instance_1435},{t:this.instance_1434},{t:this.instance_1433},{t:this.instance_1432},{t:this.instance_1431},{t:this.instance_1430},{t:this.instance_1429},{t:this.instance_1428},{t:this.instance_1427},{t:this.instance_1426},{t:this.instance_1425},{t:this.instance_1424},{t:this.instance_1423},{t:this.instance_1422},{t:this.instance_1421},{t:this.instance_1420},{t:this.instance_1419},{t:this.instance_1418},{t:this.instance_1417},{t:this.instance_1416},{t:this.instance_1415},{t:this.instance_1414},{t:this.instance_1413},{t:this.instance_1412},{t:this.instance_1411},{t:this.instance_1410},{t:this.instance_1409},{t:this.instance_1408},{t:this.instance_1407},{t:this.instance_1406},{t:this.instance_1405},{t:this.instance_1404},{t:this.instance_1403},{t:this.instance_1402},{t:this.instance_1401},{t:this.instance_1400},{t:this.instance_1399},{t:this.instance_1398},{t:this.instance_1397},{t:this.instance_1396},{t:this.instance_1395},{t:this.instance_1394},{t:this.instance_1393},{t:this.instance_1392},{t:this.instance_1391},{t:this.instance_1390},{t:this.instance_1389},{t:this.instance_1388},{t:this.instance_1387},{t:this.instance_1386},{t:this.instance_1385},{t:this.instance_1384},{t:this.instance_1383},{t:this.instance_1382},{t:this.instance_1381},{t:this.instance_1380},{t:this.instance_1379},{t:this.instance_1378},{t:this.instance_1377},{t:this.instance_1376},{t:this.instance_1375},{t:this.instance_1374},{t:this.instance_1373},{t:this.instance_1372},{t:this.instance_1371},{t:this.instance_1370},{t:this.instance_1369},{t:this.instance_1368},{t:this.instance_1367},{t:this.instance_1366},{t:this.instance_1365},{t:this.instance_1364},{t:this.instance_1363},{t:this.instance_1362},{t:this.instance_1361},{t:this.instance_1360},{t:this.instance_1359},{t:this.instance_1358},{t:this.instance_1357},{t:this.instance_1356},{t:this.instance_1355},{t:this.instance_1354},{t:this.instance_1353},{t:this.instance_1352},{t:this.instance_1351},{t:this.instance_1350},{t:this.instance_1349},{t:this.instance_1348},{t:this.instance_1347},{t:this.instance_1346},{t:this.instance_1345},{t:this.instance_1344},{t:this.instance_1343},{t:this.instance_1342},{t:this.instance_1341},{t:this.instance_1340},{t:this.instance_1339},{t:this.instance_1338},{t:this.instance_1337},{t:this.instance_1336},{t:this.instance_1335},{t:this.instance_1334},{t:this.instance_1333},{t:this.instance_1332},{t:this.instance_1331},{t:this.instance_1330},{t:this.instance_1329},{t:this.instance_1328},{t:this.instance_1327},{t:this.instance_1326},{t:this.instance_1325},{t:this.instance_1324},{t:this.instance_1323},{t:this.instance_1322},{t:this.instance_1321},{t:this.instance_1320},{t:this.instance_1319},{t:this.instance_1318},{t:this.instance_1317},{t:this.instance_1316},{t:this.instance_1315},{t:this.instance_1314},{t:this.instance_1313},{t:this.instance_1312},{t:this.instance_1311},{t:this.instance_1310},{t:this.instance_1309},{t:this.instance_1308},{t:this.instance_1307},{t:this.instance_1306},{t:this.instance_1305},{t:this.instance_1304},{t:this.instance_1303},{t:this.instance_1302},{t:this.instance_1301},{t:this.instance_1300},{t:this.instance_1299},{t:this.instance_1298},{t:this.instance_1297},{t:this.instance_1296},{t:this.instance_1295},{t:this.instance_1294},{t:this.instance_1293},{t:this.instance_1292},{t:this.instance_1291},{t:this.instance_1290},{t:this.instance_1289},{t:this.instance_1288},{t:this.instance_1287},{t:this.instance_1286},{t:this.instance_1285},{t:this.instance_1284},{t:this.instance_1283},{t:this.instance_1282},{t:this.instance_1281},{t:this.instance_1280},{t:this.instance_1279},{t:this.instance_1278},{t:this.instance_1277},{t:this.instance_1276},{t:this.instance_1275},{t:this.instance_1274},{t:this.instance_1273},{t:this.instance_1272},{t:this.instance_1271},{t:this.instance_1270},{t:this.instance_1269},{t:this.instance_1268},{t:this.instance_1267},{t:this.instance_1266},{t:this.instance_1265},{t:this.instance_1264},{t:this.instance_1263},{t:this.instance_1262},{t:this.instance_1261},{t:this.instance_1260},{t:this.instance_1259},{t:this.instance_1258},{t:this.instance_1257},{t:this.instance_1256},{t:this.instance_1255},{t:this.instance_1254},{t:this.instance_1253},{t:this.instance_1252},{t:this.instance_1251},{t:this.instance_1250},{t:this.instance_1249},{t:this.instance_1248},{t:this.instance_1247},{t:this.instance_1246},{t:this.instance_1245},{t:this.instance_1244},{t:this.instance_1243},{t:this.instance_1242},{t:this.instance_1241},{t:this.instance_1240},{t:this.instance_1239},{t:this.instance_1238},{t:this.instance_1237},{t:this.instance_1236},{t:this.instance_1235},{t:this.instance_1234},{t:this.instance_1233},{t:this.instance_1232},{t:this.instance_1231},{t:this.instance_1230},{t:this.instance_1229},{t:this.instance_1228},{t:this.instance_1227},{t:this.instance_1226},{t:this.instance_1225},{t:this.instance_1224},{t:this.instance_1223},{t:this.instance_1222},{t:this.instance_1221},{t:this.instance_1220},{t:this.instance_1219},{t:this.instance_1218},{t:this.instance_1217},{t:this.instance_1216},{t:this.instance_1215},{t:this.instance_1214},{t:this.instance_1213},{t:this.instance_1212},{t:this.instance_1211},{t:this.instance_1210},{t:this.instance_1209},{t:this.instance_1208},{t:this.instance_1207},{t:this.instance_1206},{t:this.instance_1205},{t:this.instance_1204},{t:this.instance_1203},{t:this.instance_1202},{t:this.instance_1201},{t:this.instance_1200},{t:this.instance_1199},{t:this.instance_1198},{t:this.instance_1197},{t:this.instance_1196},{t:this.instance_1195},{t:this.instance_1194},{t:this.instance_1193},{t:this.instance_1192},{t:this.instance_1191},{t:this.instance_1190},{t:this.instance_1189},{t:this.instance_1188},{t:this.instance_1187},{t:this.instance_1186},{t:this.instance_1185},{t:this.instance_1184},{t:this.instance_1183},{t:this.instance_1182},{t:this.instance_1181},{t:this.instance_1180},{t:this.instance_1179},{t:this.instance_1178},{t:this.instance_1177},{t:this.instance_1176},{t:this.instance_1175},{t:this.instance_1174},{t:this.instance_1173},{t:this.instance_1172},{t:this.instance_1171},{t:this.instance_1170},{t:this.instance_1169},{t:this.instance_1168},{t:this.instance_1167},{t:this.instance_1166},{t:this.instance_1165},{t:this.instance_1164},{t:this.instance_1163},{t:this.instance_1162},{t:this.instance_1161},{t:this.instance_1160},{t:this.instance_1159},{t:this.instance_1158},{t:this.instance_1157},{t:this.instance_1156},{t:this.instance_1155},{t:this.instance_1154},{t:this.instance_1153},{t:this.instance_1152},{t:this.instance_1151},{t:this.instance_1150},{t:this.instance_1149},{t:this.instance_1148},{t:this.instance_1147},{t:this.instance_1146},{t:this.instance_1145},{t:this.instance_1144},{t:this.instance_1143},{t:this.instance_1142},{t:this.instance_1141},{t:this.instance_1140},{t:this.instance_1139},{t:this.instance_1138},{t:this.instance_1137},{t:this.instance_1136},{t:this.instance_1135},{t:this.instance_1134},{t:this.instance_1133},{t:this.instance_1132},{t:this.instance_1131},{t:this.instance_1130},{t:this.instance_1129},{t:this.instance_1128},{t:this.instance_1127},{t:this.instance_1126},{t:this.instance_1125},{t:this.instance_1124},{t:this.instance_1123},{t:this.instance_1122},{t:this.instance_1121},{t:this.instance_1120},{t:this.instance_1119},{t:this.instance_1118},{t:this.instance_1117},{t:this.instance_1116},{t:this.instance_1115},{t:this.instance_1114},{t:this.instance_1113},{t:this.instance_1112},{t:this.instance_1111},{t:this.instance_1110},{t:this.instance_1109},{t:this.instance_1108},{t:this.instance_1107},{t:this.instance_1106},{t:this.instance_1105},{t:this.instance_1104},{t:this.instance_1103},{t:this.instance_1102},{t:this.instance_1101},{t:this.instance_1100},{t:this.instance_1099},{t:this.instance_1098},{t:this.instance_1097},{t:this.instance_1096},{t:this.instance_1095},{t:this.instance_1094},{t:this.instance_1093},{t:this.instance_1092},{t:this.instance_1091},{t:this.instance_1090},{t:this.instance_1089},{t:this.instance_1088},{t:this.instance_1087},{t:this.instance_1086},{t:this.instance_1085},{t:this.instance_1084},{t:this.instance_1083},{t:this.instance_1082},{t:this.instance_1081},{t:this.instance_1080},{t:this.instance_1079},{t:this.instance_1078},{t:this.instance_1077},{t:this.instance_1076},{t:this.instance_1075},{t:this.instance_1074},{t:this.instance_1073},{t:this.instance_1072},{t:this.instance_1071},{t:this.instance_1070},{t:this.instance_1069},{t:this.instance_1068},{t:this.instance_1067},{t:this.instance_1066},{t:this.instance_1065},{t:this.instance_1064},{t:this.instance_1063},{t:this.instance_1062},{t:this.instance_1061},{t:this.instance_1060},{t:this.instance_1059},{t:this.instance_1058},{t:this.instance_1057},{t:this.instance_1056},{t:this.instance_1055},{t:this.instance_1054},{t:this.instance_1053},{t:this.instance_1052},{t:this.instance_1051},{t:this.instance_1050},{t:this.instance_1049},{t:this.instance_1048},{t:this.instance_1047},{t:this.instance_1046},{t:this.instance_1045},{t:this.instance_1044},{t:this.instance_1043},{t:this.instance_1042},{t:this.instance_1041},{t:this.instance_1040},{t:this.instance_1039},{t:this.instance_1038},{t:this.instance_1037},{t:this.instance_1036},{t:this.instance_1035},{t:this.instance_1034},{t:this.instance_1033},{t:this.instance_1032},{t:this.instance_1031},{t:this.instance_1030},{t:this.instance_1029},{t:this.instance_1028},{t:this.instance_1027},{t:this.instance_1026},{t:this.instance_1025},{t:this.instance_1024},{t:this.instance_1023},{t:this.instance_1022},{t:this.instance_1021},{t:this.instance_1020},{t:this.instance_1019},{t:this.instance_1018},{t:this.instance_1017},{t:this.instance_1016},{t:this.instance_1015},{t:this.instance_1014},{t:this.instance_1013},{t:this.instance_1012},{t:this.instance_1011},{t:this.instance_1010},{t:this.instance_1009},{t:this.instance_1008},{t:this.instance_1007},{t:this.instance_1006},{t:this.instance_1005},{t:this.instance_1004},{t:this.instance_1003},{t:this.instance_1002},{t:this.instance_1001},{t:this.instance_1000},{t:this.instance_999},{t:this.instance_998},{t:this.instance_997},{t:this.instance_996},{t:this.instance_995},{t:this.instance_994},{t:this.instance_993},{t:this.instance_992},{t:this.instance_991},{t:this.instance_990},{t:this.instance_989},{t:this.instance_988},{t:this.instance_987},{t:this.instance_986},{t:this.instance_985},{t:this.instance_984},{t:this.instance_983},{t:this.instance_982},{t:this.instance_981},{t:this.instance_980},{t:this.instance_979},{t:this.instance_978},{t:this.instance_977},{t:this.instance_976},{t:this.instance_975},{t:this.instance_974},{t:this.instance_973},{t:this.instance_972},{t:this.instance_971},{t:this.instance_970},{t:this.instance_969},{t:this.instance_968},{t:this.instance_967},{t:this.instance_966},{t:this.instance_965},{t:this.instance_964},{t:this.instance_963},{t:this.instance_962},{t:this.instance_961},{t:this.instance_960},{t:this.instance_959},{t:this.instance_958},{t:this.instance_957},{t:this.instance_956},{t:this.instance_955},{t:this.instance_954},{t:this.instance_953},{t:this.instance_952},{t:this.instance_951},{t:this.instance_950},{t:this.instance_949},{t:this.instance_948},{t:this.instance_947},{t:this.instance_946},{t:this.instance_945},{t:this.instance_944},{t:this.instance_943},{t:this.instance_942},{t:this.instance_941},{t:this.instance_940},{t:this.instance_939},{t:this.instance_938},{t:this.instance_937},{t:this.instance_936},{t:this.instance_935},{t:this.instance_934},{t:this.instance_933},{t:this.instance_932},{t:this.instance_931},{t:this.instance_930},{t:this.instance_929},{t:this.instance_928},{t:this.instance_927},{t:this.instance_926},{t:this.instance_925},{t:this.instance_924},{t:this.instance_923},{t:this.instance_922},{t:this.instance_921},{t:this.instance_920},{t:this.instance_919},{t:this.instance_918},{t:this.instance_917},{t:this.instance_916},{t:this.instance_915},{t:this.instance_914},{t:this.instance_913},{t:this.instance_912},{t:this.instance_911},{t:this.instance_910},{t:this.instance_909},{t:this.instance_908},{t:this.instance_907},{t:this.instance_906},{t:this.instance_905},{t:this.instance_904},{t:this.instance_903},{t:this.instance_902},{t:this.instance_901},{t:this.instance_900},{t:this.instance_899},{t:this.instance_898},{t:this.instance_897},{t:this.instance_896},{t:this.instance_895},{t:this.instance_894},{t:this.instance_893},{t:this.instance_892},{t:this.instance_891},{t:this.instance_890},{t:this.instance_889},{t:this.instance_888},{t:this.instance_887},{t:this.instance_886},{t:this.instance_885},{t:this.instance_884},{t:this.instance_883},{t:this.instance_882},{t:this.instance_881},{t:this.instance_880},{t:this.instance_879},{t:this.instance_878},{t:this.instance_877},{t:this.instance_876},{t:this.instance_875},{t:this.instance_874},{t:this.instance_873},{t:this.instance_872},{t:this.instance_871},{t:this.instance_870},{t:this.instance_869},{t:this.instance_868},{t:this.instance_867},{t:this.instance_866},{t:this.instance_865},{t:this.instance_864},{t:this.instance_863},{t:this.instance_862},{t:this.instance_861},{t:this.instance_860},{t:this.instance_859},{t:this.instance_858},{t:this.instance_857},{t:this.instance_856},{t:this.instance_855},{t:this.instance_854},{t:this.instance_853},{t:this.instance_852},{t:this.instance_851},{t:this.instance_850},{t:this.instance_849},{t:this.instance_848},{t:this.instance_847},{t:this.instance_846},{t:this.instance_845},{t:this.instance_844},{t:this.instance_843},{t:this.instance_842},{t:this.instance_841},{t:this.instance_840},{t:this.instance_839},{t:this.instance_838},{t:this.instance_837},{t:this.instance_836},{t:this.instance_835},{t:this.instance_834},{t:this.instance_833},{t:this.instance_832},{t:this.instance_831},{t:this.instance_830},{t:this.instance_829},{t:this.instance_828},{t:this.instance_827},{t:this.instance_826},{t:this.instance_825},{t:this.instance_824},{t:this.instance_823},{t:this.instance_822},{t:this.instance_821},{t:this.instance_820},{t:this.instance_819},{t:this.instance_818},{t:this.instance_817},{t:this.instance_816},{t:this.instance_815},{t:this.instance_814},{t:this.instance_813},{t:this.instance_812},{t:this.instance_811},{t:this.instance_810},{t:this.instance_809},{t:this.instance_808},{t:this.instance_807},{t:this.instance_806},{t:this.instance_805},{t:this.instance_804},{t:this.instance_803},{t:this.instance_802},{t:this.instance_801},{t:this.instance_800},{t:this.instance_799},{t:this.instance_798},{t:this.instance_797},{t:this.instance_796},{t:this.instance_795},{t:this.instance_794},{t:this.instance_793},{t:this.instance_792},{t:this.instance_791},{t:this.instance_790},{t:this.instance_789},{t:this.instance_788},{t:this.instance_787},{t:this.instance_786},{t:this.instance_785},{t:this.instance_784},{t:this.instance_783},{t:this.instance_782},{t:this.instance_781},{t:this.instance_780},{t:this.instance_779},{t:this.instance_778},{t:this.instance_777},{t:this.instance_776},{t:this.instance_775},{t:this.instance_774},{t:this.instance_773},{t:this.instance_772},{t:this.instance_771},{t:this.instance_770},{t:this.instance_769},{t:this.instance_768},{t:this.instance_767},{t:this.instance_766},{t:this.instance_765},{t:this.instance_764},{t:this.instance_763},{t:this.instance_762},{t:this.instance_761},{t:this.instance_760},{t:this.instance_759},{t:this.instance_758},{t:this.instance_757},{t:this.instance_756},{t:this.instance_755},{t:this.instance_754},{t:this.instance_753},{t:this.instance_752},{t:this.instance_751},{t:this.instance_750},{t:this.instance_749},{t:this.instance_748},{t:this.instance_747},{t:this.instance_746},{t:this.instance_745},{t:this.instance_744},{t:this.instance_743},{t:this.instance_742},{t:this.instance_741},{t:this.instance_740},{t:this.instance_739},{t:this.instance_738},{t:this.instance_737},{t:this.instance_736},{t:this.instance_735},{t:this.instance_734},{t:this.instance_733},{t:this.instance_732},{t:this.instance_731},{t:this.instance_730},{t:this.instance_729},{t:this.instance_728},{t:this.instance_727},{t:this.instance_726},{t:this.instance_725},{t:this.instance_724},{t:this.instance_723},{t:this.instance_722},{t:this.instance_721},{t:this.instance_720},{t:this.instance_719},{t:this.instance_718},{t:this.instance_717},{t:this.instance_716},{t:this.instance_715},{t:this.instance_714},{t:this.instance_713},{t:this.instance_712},{t:this.instance_711},{t:this.instance_710},{t:this.instance_709},{t:this.instance_708},{t:this.instance_707},{t:this.instance_706},{t:this.instance_705},{t:this.instance_704},{t:this.instance_703},{t:this.instance_702},{t:this.instance_701},{t:this.instance_700},{t:this.instance_699},{t:this.instance_698},{t:this.instance_697},{t:this.instance_696},{t:this.instance_695},{t:this.instance_694},{t:this.instance_693},{t:this.instance_692},{t:this.instance_691},{t:this.instance_690},{t:this.instance_689},{t:this.instance_688},{t:this.instance_687},{t:this.instance_686},{t:this.instance_685},{t:this.instance_684},{t:this.instance_683},{t:this.instance_682},{t:this.instance_681},{t:this.instance_680},{t:this.instance_679},{t:this.instance_678},{t:this.instance_677},{t:this.instance_676},{t:this.instance_675},{t:this.instance_674},{t:this.instance_673},{t:this.instance_672},{t:this.instance_671},{t:this.instance_670},{t:this.instance_669},{t:this.instance_668},{t:this.instance_667},{t:this.instance_666},{t:this.instance_665},{t:this.instance_664},{t:this.instance_663},{t:this.instance_662},{t:this.instance_661},{t:this.instance_660},{t:this.instance_659},{t:this.instance_658},{t:this.instance_657},{t:this.instance_656},{t:this.instance_655},{t:this.instance_654},{t:this.instance_653},{t:this.instance_652},{t:this.instance_651},{t:this.instance_650},{t:this.instance_649},{t:this.instance_648},{t:this.instance_647},{t:this.instance_646},{t:this.instance_645},{t:this.instance_644},{t:this.instance_643},{t:this.instance_642},{t:this.instance_641},{t:this.instance_640},{t:this.instance_639},{t:this.instance_638},{t:this.instance_637},{t:this.instance_636},{t:this.instance_635},{t:this.instance_634},{t:this.instance_633},{t:this.instance_632},{t:this.instance_631},{t:this.instance_630},{t:this.instance_629},{t:this.instance_628},{t:this.instance_627},{t:this.instance_626},{t:this.instance_625},{t:this.instance_624},{t:this.instance_623},{t:this.instance_622},{t:this.instance_621},{t:this.instance_620},{t:this.instance_619},{t:this.instance_618},{t:this.instance_617},{t:this.instance_616},{t:this.instance_615},{t:this.instance_614},{t:this.instance_613},{t:this.instance_612},{t:this.instance_611},{t:this.instance_610},{t:this.instance_609},{t:this.instance_608},{t:this.instance_607},{t:this.instance_606},{t:this.instance_605},{t:this.instance_604},{t:this.instance_603},{t:this.instance_602},{t:this.instance_601},{t:this.instance_600},{t:this.instance_599},{t:this.instance_598},{t:this.instance_597},{t:this.instance_596},{t:this.instance_595},{t:this.instance_594},{t:this.instance_593},{t:this.instance_592},{t:this.instance_591},{t:this.instance_590},{t:this.instance_589},{t:this.instance_588},{t:this.instance_587},{t:this.instance_586},{t:this.instance_585},{t:this.instance_584},{t:this.instance_583},{t:this.instance_582},{t:this.instance_581},{t:this.instance_580},{t:this.instance_579},{t:this.instance_578},{t:this.instance_577},{t:this.instance_576},{t:this.instance_575},{t:this.instance_574},{t:this.instance_573},{t:this.instance_572},{t:this.instance_571},{t:this.instance_570},{t:this.instance_569},{t:this.instance_568},{t:this.instance_567},{t:this.instance_566},{t:this.instance_565},{t:this.instance_564},{t:this.instance_563},{t:this.instance_562},{t:this.instance_561},{t:this.instance_560},{t:this.instance_559},{t:this.instance_558},{t:this.instance_557},{t:this.instance_556},{t:this.instance_555},{t:this.instance_554},{t:this.instance_553},{t:this.instance_552},{t:this.instance_551},{t:this.instance_550},{t:this.instance_549},{t:this.instance_548},{t:this.instance_547},{t:this.instance_546},{t:this.instance_545},{t:this.instance_544},{t:this.instance_543},{t:this.instance_542},{t:this.instance_541},{t:this.instance_540},{t:this.instance_539},{t:this.instance_538},{t:this.instance_537},{t:this.instance_536},{t:this.instance_535},{t:this.instance_534},{t:this.instance_533},{t:this.instance_532},{t:this.instance_531},{t:this.instance_530},{t:this.instance_529},{t:this.instance_528},{t:this.instance_527},{t:this.instance_526},{t:this.instance_525},{t:this.instance_524},{t:this.instance_523},{t:this.instance_522},{t:this.instance_521},{t:this.instance_520},{t:this.instance_519},{t:this.instance_518},{t:this.instance_517},{t:this.instance_516},{t:this.instance_515},{t:this.instance_514},{t:this.instance_513},{t:this.instance_512},{t:this.instance_511},{t:this.instance_510},{t:this.instance_509},{t:this.instance_508},{t:this.instance_507},{t:this.instance_506},{t:this.instance_505},{t:this.instance_504},{t:this.instance_503},{t:this.instance_502},{t:this.instance_501},{t:this.instance_500},{t:this.instance_499},{t:this.instance_498},{t:this.instance_497},{t:this.instance_496},{t:this.instance_495},{t:this.instance_494},{t:this.instance_493},{t:this.instance_492},{t:this.instance_491},{t:this.instance_490},{t:this.instance_489},{t:this.instance_488},{t:this.instance_487},{t:this.instance_486},{t:this.instance_485},{t:this.instance_484},{t:this.instance_483},{t:this.instance_482},{t:this.instance_481},{t:this.instance_480},{t:this.instance_479},{t:this.instance_478},{t:this.instance_477},{t:this.instance_476},{t:this.instance_475},{t:this.instance_474},{t:this.instance_473},{t:this.instance_472},{t:this.instance_471},{t:this.instance_470},{t:this.instance_469},{t:this.instance_468},{t:this.instance_467},{t:this.instance_466},{t:this.instance_465},{t:this.instance_464},{t:this.instance_463},{t:this.instance_462},{t:this.instance_461},{t:this.instance_460},{t:this.instance_459},{t:this.instance_458},{t:this.instance_457},{t:this.instance_456},{t:this.instance_455},{t:this.instance_454},{t:this.instance_453},{t:this.instance_452},{t:this.instance_451},{t:this.instance_450},{t:this.instance_449},{t:this.instance_448},{t:this.instance_447},{t:this.instance_446},{t:this.instance_445},{t:this.instance_444},{t:this.instance_443},{t:this.instance_442},{t:this.instance_441},{t:this.instance_440},{t:this.instance_439},{t:this.instance_438},{t:this.instance_437},{t:this.instance_436},{t:this.instance_435},{t:this.instance_434},{t:this.instance_433},{t:this.instance_432},{t:this.instance_431},{t:this.instance_430},{t:this.instance_429},{t:this.instance_428},{t:this.instance_427},{t:this.instance_426},{t:this.instance_425},{t:this.instance_424},{t:this.instance_423},{t:this.instance_422},{t:this.instance_421},{t:this.instance_420},{t:this.instance_419},{t:this.instance_418},{t:this.instance_417},{t:this.instance_416},{t:this.instance_415},{t:this.instance_414},{t:this.instance_413},{t:this.instance_412},{t:this.instance_411},{t:this.instance_410},{t:this.instance_409},{t:this.instance_408},{t:this.instance_407},{t:this.instance_406},{t:this.instance_405},{t:this.instance_404},{t:this.instance_403},{t:this.instance_402},{t:this.instance_401},{t:this.instance_400},{t:this.instance_399},{t:this.instance_398},{t:this.instance_397},{t:this.instance_396},{t:this.instance_395},{t:this.instance_394},{t:this.instance_393},{t:this.instance_392},{t:this.instance_391},{t:this.instance_390},{t:this.instance_389},{t:this.instance_388},{t:this.instance_387},{t:this.instance_386},{t:this.instance_385},{t:this.instance_384},{t:this.instance_383},{t:this.instance_382},{t:this.instance_381},{t:this.instance_380},{t:this.instance_379},{t:this.instance_378},{t:this.instance_377},{t:this.instance_376},{t:this.instance_375},{t:this.instance_374},{t:this.instance_373},{t:this.instance_372},{t:this.instance_371},{t:this.instance_370},{t:this.instance_369},{t:this.instance_368},{t:this.instance_367},{t:this.instance_366},{t:this.instance_365},{t:this.instance_364},{t:this.instance_363},{t:this.instance_362},{t:this.instance_361},{t:this.instance_360},{t:this.instance_359},{t:this.instance_358},{t:this.instance_357},{t:this.instance_356},{t:this.instance_355},{t:this.instance_354},{t:this.instance_353},{t:this.instance_352},{t:this.instance_351},{t:this.instance_350},{t:this.instance_349},{t:this.instance_348},{t:this.instance_347},{t:this.instance_346},{t:this.instance_345},{t:this.instance_344},{t:this.instance_343},{t:this.instance_342},{t:this.instance_341},{t:this.instance_340},{t:this.instance_339},{t:this.instance_338},{t:this.instance_337},{t:this.instance_336},{t:this.instance_335},{t:this.instance_334},{t:this.instance_333},{t:this.instance_332},{t:this.instance_331},{t:this.instance_330},{t:this.instance_329},{t:this.instance_328},{t:this.instance_327},{t:this.instance_326},{t:this.instance_325},{t:this.instance_324},{t:this.instance_323},{t:this.instance_322},{t:this.instance_321},{t:this.instance_320},{t:this.instance_319},{t:this.instance_318},{t:this.instance_317},{t:this.instance_316},{t:this.instance_315},{t:this.instance_314},{t:this.instance_313},{t:this.instance_312},{t:this.instance_311},{t:this.instance_310},{t:this.instance_309},{t:this.instance_308},{t:this.instance_307},{t:this.instance_306},{t:this.instance_305},{t:this.instance_304},{t:this.instance_303},{t:this.instance_302},{t:this.instance_301},{t:this.instance_300},{t:this.instance_299},{t:this.instance_298},{t:this.instance_297},{t:this.instance_296},{t:this.instance_295},{t:this.instance_294},{t:this.instance_293},{t:this.instance_292},{t:this.instance_291},{t:this.instance_290},{t:this.instance_289},{t:this.instance_288},{t:this.instance_287},{t:this.instance_286},{t:this.instance_285},{t:this.instance_284},{t:this.instance_283},{t:this.instance_282},{t:this.instance_281},{t:this.instance_280},{t:this.instance_279},{t:this.instance_278},{t:this.instance_277},{t:this.instance_276},{t:this.instance_275},{t:this.instance_274},{t:this.instance_273},{t:this.instance_272},{t:this.instance_271},{t:this.instance_270},{t:this.instance_269},{t:this.instance_268},{t:this.instance_267},{t:this.instance_266},{t:this.instance_265},{t:this.instance_264},{t:this.instance_263},{t:this.instance_262},{t:this.instance_261},{t:this.instance_260},{t:this.instance_259},{t:this.instance_258},{t:this.instance_257},{t:this.instance_256},{t:this.instance_255},{t:this.instance_254},{t:this.instance_253},{t:this.instance_252},{t:this.instance_251},{t:this.instance_250},{t:this.instance_249},{t:this.instance_248},{t:this.instance_247},{t:this.instance_246},{t:this.instance_245},{t:this.instance_244},{t:this.instance_243},{t:this.instance_242},{t:this.instance_241},{t:this.instance_240},{t:this.instance_239},{t:this.instance_238},{t:this.instance_237},{t:this.instance_236},{t:this.instance_235},{t:this.instance_234},{t:this.instance_233},{t:this.instance_232},{t:this.instance_231},{t:this.instance_230},{t:this.instance_229},{t:this.instance_228},{t:this.instance_227},{t:this.instance_226},{t:this.instance_225},{t:this.instance_224},{t:this.instance_223},{t:this.instance_222},{t:this.instance_221},{t:this.instance_220},{t:this.instance_219},{t:this.instance_218},{t:this.instance_217},{t:this.instance_216},{t:this.instance_215},{t:this.instance_214},{t:this.instance_213},{t:this.instance_212},{t:this.instance_211},{t:this.instance_210},{t:this.instance_209},{t:this.instance_208},{t:this.instance_207},{t:this.instance_206},{t:this.instance_205},{t:this.instance_204},{t:this.instance_203},{t:this.instance_202},{t:this.instance_201},{t:this.instance_200},{t:this.instance_199},{t:this.instance_198},{t:this.instance_197},{t:this.instance_196},{t:this.instance_195},{t:this.instance_194},{t:this.instance_193},{t:this.instance_192},{t:this.instance_191},{t:this.instance_190},{t:this.instance_189},{t:this.instance_188},{t:this.instance_187},{t:this.instance_186},{t:this.instance_185},{t:this.instance_184},{t:this.instance_183},{t:this.instance_182},{t:this.instance_181},{t:this.instance_180},{t:this.instance_179},{t:this.instance_178},{t:this.instance_177},{t:this.instance_176},{t:this.instance_175},{t:this.instance_174},{t:this.instance_173},{t:this.instance_172},{t:this.instance_171},{t:this.instance_170},{t:this.instance_169},{t:this.instance_168},{t:this.instance_167},{t:this.instance_166},{t:this.instance_165},{t:this.instance_164},{t:this.instance_163},{t:this.instance_162},{t:this.instance_161},{t:this.instance_160},{t:this.instance_159},{t:this.instance_158},{t:this.instance_157},{t:this.instance_156},{t:this.instance_155},{t:this.instance_154},{t:this.instance_153},{t:this.instance_152},{t:this.instance_151},{t:this.instance_150},{t:this.instance_149},{t:this.instance_148},{t:this.instance_147},{t:this.instance_146},{t:this.instance_145},{t:this.instance_144},{t:this.instance_143},{t:this.instance_142},{t:this.instance_141},{t:this.instance_140},{t:this.instance_139},{t:this.instance_138},{t:this.instance_137},{t:this.instance_136},{t:this.instance_135},{t:this.instance_134},{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_123},{t:this.instance_122},{t:this.instance_121},{t:this.instance_120},{t:this.instance_119},{t:this.instance_118},{t:this.instance_117},{t:this.instance_116},{t:this.instance_115},{t:this.instance_114},{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101},{t:this.instance_100},{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94},{t:this.instance_93},{t:this.instance_92},{t:this.instance_91},{t:this.instance_90},{t:this.instance_89},{t:this.instance_88},{t:this.instance_87},{t:this.instance_86},{t:this.instance_85},{t:this.instance_84},{t:this.instance_83},{t:this.instance_82},{t:this.instance_81},{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65},{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]},229).wait(1));

	// Layer_1
	this.instance_2178 = new lib.CharacterBad_04();
	this.instance_2178.setTransform(149.55,501.1,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2179 = new lib.CharacterBad_03();
	this.instance_2179.setTransform(176.5,472.9,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2180 = new lib.CharacterBad_04();
	this.instance_2180.setTransform(379.25,494.3,0.177,0.177);

	this.instance_2181 = new lib.CharacterBad_03();
	this.instance_2181.setTransform(399.15,474.75,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2182 = new lib.CharacterBad_04();
	this.instance_2182.setTransform(223.35,504.85,0.177,0.177,0,0,0,-39.6,49.1);

	this.instance_2183 = new lib.CharacterBad_03();
	this.instance_2183.setTransform(202.9,494.6,0.177,0.177,0,0,0,-3.4,47.8);

	this.instance_2184 = new lib.CharacterBad_03();
	this.instance_2184.setTransform(328.65,501.25,0.177,0.177,0,0,0,-3.1,48);

	this.instance_2185 = new lib.CharacterBad_04();
	this.instance_2185.setTransform(344.8,493.05,0.177,0.177,0,0,0,-39.8,49.1);

	this.instance_2186 = new lib.CharacterBad_03();
	this.instance_2186.setTransform(364.05,473.9,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2187 = new lib.CharacterBad_04();
	this.instance_2187.setTransform(260.5,501.65,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2188 = new lib.CharacterBad_03();
	this.instance_2188.setTransform(247,481.3,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2189 = new lib.CharacterBad_04();
	this.instance_2189.setTransform(217.05,472.9,0.177,0.177,0,0,0,-40.1,48.9);

	this.instance_2190 = new lib.CharacterBad_01();
	this.instance_2190.setTransform(297.3,479.2,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2191 = new lib.CharacterBad_01();
	this.instance_2191.setTransform(193.2,457,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2192 = new lib.CharacterBad_03();
	this.instance_2192.setTransform(322.3,465.7,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2193 = new lib.CharacterBad_02();
	this.instance_2193.setTransform(274.1,468.6,0.177,0.177,0,0,0,-14.1,35.6);

	this.instance_2194 = new lib.CharacterBad_04();
	this.instance_2194.setTransform(291.5,454.65,0.177,0.177,0,0,0,-40.1,48.9);

	this.instance_2195 = new lib.CharacterBad_04();
	this.instance_2195.setTransform(338.5,447.05,0.177,0.177,0,0,0,-39.6,48.9);

	this.instance_2196 = new lib.CharacterBad_04();
	this.instance_2196.setTransform(247.45,454.65,0.177,0.177,0,0,0,-39.6,48.9);

	this.instance_2197 = new lib.CharacterBad_03();
	this.instance_2197.setTransform(279.7,434.25,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2198 = new lib.CharacterBad_03();
	this.instance_2198.setTransform(218.5,445.4,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2199 = new lib.CharacterBad_02();
	this.instance_2199.setTransform(238.1,432.15,0.177,0.177,0,0,0,-14.1,35.9);

	this.instance_2200 = new lib.CharacterBad_04();
	this.instance_2200.setTransform(255,417.75,0.177,0.177,0,0,0,-39.8,49.1);

	this.instance_2201 = new lib.CharacterBad_04();
	this.instance_2201.setTransform(302.65,424.4,0.177,0.177,0,0,0,-39.8,49.1);

	this.instance_2202 = new lib.CharacterBad_01();
	this.instance_2202.setTransform(372.7,442.8,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2203 = new lib.CharacterBad_02();
	this.instance_2203.setTransform(361.15,427.65,0.177,0.177,0,0,0,-14.1,35.6);

	this.instance_2204 = new lib.CharacterBad_04();
	this.instance_2204.setTransform(392.95,437.75,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2205 = new lib.CharacterBad_03();
	this.instance_2205.setTransform(384.1,418.65,0.177,0.177,0,0,0,-3.4,47.8);

	this.instance_2206 = new lib.CharacterBad_03();
	this.instance_2206.setTransform(392.15,387.7,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2207 = new lib.CharacterBad_02();
	this.instance_2207.setTransform(333.15,417.45,0.177,0.177,0,0,0,-14.1,35.6);

	this.instance_2208 = new lib.CharacterBad_03();
	this.instance_2208.setTransform(316,393.3,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2209 = new lib.CharacterBad_03();
	this.instance_2209.setTransform(289.9,404.65,0.177,0.177,0,0,0,-3.1,48.3);

	this.instance_2210 = new lib.CharacterBad_04();
	this.instance_2210.setTransform(352.2,397,0.177,0.177,0,0,0,-39.6,49.1);

	this.instance_2211 = new lib.CharacterBad_04();
	this.instance_2211.setTransform(331.95,374.2,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2212 = new lib.CharacterBad_01();
	this.instance_2212.setTransform(264.2,380.85,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2213 = new lib.CharacterBad_04();
	this.instance_2213.setTransform(0.7,503,0.177,0.177,0,0,0,-39.6,49.1);

	this.instance_2214 = new lib.CharacterBad_03();
	this.instance_2214.setTransform(-19.75,492.75,0.177,0.177,0,0,0,-3.4,47.8);

	this.instance_2215 = new lib.CharacterBad_03();
	this.instance_2215.setTransform(106,499.4,0.177,0.177,0,0,0,-3.1,48);

	this.instance_2216 = new lib.CharacterBad_04();
	this.instance_2216.setTransform(122.15,491.2,0.177,0.177,0,0,0,-39.8,49.1);

	this.instance_2217 = new lib.CharacterBad_03();
	this.instance_2217.setTransform(141.4,472.05,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2218 = new lib.CharacterBad_04();
	this.instance_2218.setTransform(37.85,499.8,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2219 = new lib.CharacterBad_03();
	this.instance_2219.setTransform(24.35,479.45,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2220 = new lib.CharacterBad_04();
	this.instance_2220.setTransform(-5.6,471.05,0.177,0.177,0,0,0,-40.1,48.9);

	this.instance_2221 = new lib.CharacterBad_01();
	this.instance_2221.setTransform(74.65,477.35,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2222 = new lib.CharacterBad_01();
	this.instance_2222.setTransform(-29.45,455.15,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2223 = new lib.CharacterBad_03();
	this.instance_2223.setTransform(99.65,463.85,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2224 = new lib.CharacterBad_02();
	this.instance_2224.setTransform(51.45,466.75,0.177,0.177,0,0,0,-14.1,35.6);

	this.instance_2225 = new lib.CharacterBad_04();
	this.instance_2225.setTransform(68.85,452.8,0.177,0.177,0,0,0,-40.1,48.9);

	this.instance_2226 = new lib.CharacterBad_04();
	this.instance_2226.setTransform(115.85,445.2,0.177,0.177,0,0,0,-39.6,48.9);

	this.instance_2227 = new lib.CharacterBad_04();
	this.instance_2227.setTransform(24.8,452.8,0.177,0.177,0,0,0,-39.6,48.9);

	this.instance_2228 = new lib.CharacterBad_03();
	this.instance_2228.setTransform(57.05,432.4,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2229 = new lib.CharacterBad_03();
	this.instance_2229.setTransform(-4.15,443.55,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2230 = new lib.CharacterBad_02();
	this.instance_2230.setTransform(15.45,430.3,0.177,0.177,0,0,0,-14.1,35.9);

	this.instance_2231 = new lib.CharacterBad_04();
	this.instance_2231.setTransform(32.35,415.9,0.177,0.177,0,0,0,-39.8,49.1);

	this.instance_2232 = new lib.CharacterBad_04();
	this.instance_2232.setTransform(80,422.55,0.177,0.177,0,0,0,-39.8,49.1);

	this.instance_2233 = new lib.CharacterBad_01();
	this.instance_2233.setTransform(150.05,440.95,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2234 = new lib.CharacterBad_02();
	this.instance_2234.setTransform(138.5,425.8,0.177,0.177,0,0,0,-14.1,35.6);

	this.instance_2235 = new lib.CharacterBad_04();
	this.instance_2235.setTransform(170.3,435.9,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2236 = new lib.CharacterBad_03();
	this.instance_2236.setTransform(161.45,416.8,0.177,0.177,0,0,0,-3.4,47.8);

	this.instance_2237 = new lib.CharacterBad_03();
	this.instance_2237.setTransform(171.55,386.75,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2238 = new lib.CharacterBad_04();
	this.instance_2238.setTransform(-11.55,407.85,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2239 = new lib.CharacterBad_03();
	this.instance_2239.setTransform(20.75,389.55,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2240 = new lib.CharacterBad_02();
	this.instance_2240.setTransform(110.5,415.6,0.177,0.177,0,0,0,-14.1,35.6);

	this.instance_2241 = new lib.CharacterBad_03();
	this.instance_2241.setTransform(93.35,391.45,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2242 = new lib.CharacterBad_04();
	this.instance_2242.setTransform(104.3,374.75,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2243 = new lib.CharacterBad_03();
	this.instance_2243.setTransform(67.25,402.8,0.177,0.177,0,0,0,-3.1,48.3);

	this.instance_2244 = new lib.CharacterBad_04();
	this.instance_2244.setTransform(129.55,395.15,0.177,0.177,0,0,0,-39.6,49.1);

	this.instance_2245 = new lib.CharacterBad_01();
	this.instance_2245.setTransform(41.55,379,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2246 = new lib.CharacterBad_03();
	this.instance_2246.setTransform(199.4,423.9,0.177,0.177,0,0,0,-3.4,47.8);

	this.instance_2247 = new lib.CharacterBad_04();
	this.instance_2247.setTransform(217.1,409.7,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2248 = new lib.CharacterBad_03();
	this.instance_2248.setTransform(241.05,391.45,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2249 = new lib.CharacterBad_03();
	this.instance_2249.setTransform(205.8,379.05,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2250 = new lib.CharacterBad_04();
	this.instance_2250.setTransform(178.85,363.35,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2251 = new lib.CharacterBad_03();
	this.instance_2251.setTransform(205.8,335.15,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2252 = new lib.CharacterBad_04();
	this.instance_2252.setTransform(401.5,365.2,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2253 = new lib.CharacterBad_03();
	this.instance_2253.setTransform(428.45,337,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2254 = new lib.CharacterBad_04();
	this.instance_2254.setTransform(252.65,367.1,0.177,0.177,0,0,0,-39.6,49.1);

	this.instance_2255 = new lib.CharacterBad_03();
	this.instance_2255.setTransform(232.2,356.85,0.177,0.177,0,0,0,-3.4,47.8);

	this.instance_2256 = new lib.CharacterBad_03();
	this.instance_2256.setTransform(357.95,363.5,0.177,0.177,0,0,0,-3.1,48);

	this.instance_2257 = new lib.CharacterBad_04();
	this.instance_2257.setTransform(374.1,355.3,0.177,0.177,0,0,0,-39.8,49.1);

	this.instance_2258 = new lib.CharacterBad_03();
	this.instance_2258.setTransform(393.35,336.15,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2259 = new lib.CharacterBad_04();
	this.instance_2259.setTransform(289.8,363.9,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2260 = new lib.CharacterBad_03();
	this.instance_2260.setTransform(276.3,343.55,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2261 = new lib.CharacterBad_04();
	this.instance_2261.setTransform(246.35,335.15,0.177,0.177,0,0,0,-40.1,48.9);

	this.instance_2262 = new lib.CharacterBad_01();
	this.instance_2262.setTransform(326.6,341.45,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2263 = new lib.CharacterBad_01();
	this.instance_2263.setTransform(222.5,319.25,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2264 = new lib.CharacterBad_03();
	this.instance_2264.setTransform(351.6,327.95,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2265 = new lib.CharacterBad_02();
	this.instance_2265.setTransform(303.4,330.85,0.177,0.177,0,0,0,-14.1,35.6);

	this.instance_2266 = new lib.CharacterBad_04();
	this.instance_2266.setTransform(320.8,316.9,0.177,0.177,0,0,0,-40.1,48.9);

	this.instance_2267 = new lib.CharacterBad_04();
	this.instance_2267.setTransform(367.8,309.3,0.177,0.177,0,0,0,-39.6,48.9);

	this.instance_2268 = new lib.CharacterBad_04();
	this.instance_2268.setTransform(276.75,316.9,0.177,0.177,0,0,0,-39.6,48.9);

	this.instance_2269 = new lib.CharacterBad_03();
	this.instance_2269.setTransform(309,296.5,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2270 = new lib.CharacterBad_03();
	this.instance_2270.setTransform(247.8,307.65,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2271 = new lib.CharacterBad_02();
	this.instance_2271.setTransform(267.4,294.4,0.177,0.177,0,0,0,-14.1,35.9);

	this.instance_2272 = new lib.CharacterBad_04();
	this.instance_2272.setTransform(284.3,280,0.177,0.177,0,0,0,-39.8,49.1);

	this.instance_2273 = new lib.CharacterBad_04();
	this.instance_2273.setTransform(331.95,286.65,0.177,0.177,0,0,0,-39.8,49.1);

	this.instance_2274 = new lib.CharacterBad_01();
	this.instance_2274.setTransform(402,305.05,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2275 = new lib.CharacterBad_02();
	this.instance_2275.setTransform(390.45,289.9,0.177,0.177,0,0,0,-14.1,35.6);

	this.instance_2276 = new lib.CharacterBad_04();
	this.instance_2276.setTransform(422.25,300,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2277 = new lib.CharacterBad_03();
	this.instance_2277.setTransform(413.4,280.9,0.177,0.177,0,0,0,-3.4,47.8);

	this.instance_2278 = new lib.CharacterBad_02();
	this.instance_2278.setTransform(362.45,279.7,0.177,0.177,0,0,0,-14.1,35.6);

	this.instance_2279 = new lib.CharacterBad_03();
	this.instance_2279.setTransform(345.3,255.55,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2280 = new lib.CharacterBad_03();
	this.instance_2280.setTransform(319.2,266.9,0.177,0.177,0,0,0,-3.1,48.3);

	this.instance_2281 = new lib.CharacterBad_04();
	this.instance_2281.setTransform(381.5,259.25,0.177,0.177,0,0,0,-39.6,49.1);

	this.instance_2282 = new lib.CharacterBad_01();
	this.instance_2282.setTransform(293.5,243.1,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2283 = new lib.CharacterBad_04();
	this.instance_2283.setTransform(30,365.25,0.177,0.177,0,0,0,-39.6,49.1);

	this.instance_2284 = new lib.CharacterBad_03();
	this.instance_2284.setTransform(9.55,355,0.177,0.177,0,0,0,-3.4,47.8);

	this.instance_2285 = new lib.CharacterBad_03();
	this.instance_2285.setTransform(135.3,361.65,0.177,0.177,0,0,0,-3.1,48);

	this.instance_2286 = new lib.CharacterBad_04();
	this.instance_2286.setTransform(151.45,353.45,0.177,0.177,0,0,0,-39.8,49.1);

	this.instance_2287 = new lib.CharacterBad_03();
	this.instance_2287.setTransform(170.7,334.3,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2288 = new lib.CharacterBad_04();
	this.instance_2288.setTransform(67.15,362.05,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2289 = new lib.CharacterBad_03();
	this.instance_2289.setTransform(53.65,341.7,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2290 = new lib.CharacterBad_04();
	this.instance_2290.setTransform(23.7,333.3,0.177,0.177,0,0,0,-40.1,48.9);

	this.instance_2291 = new lib.CharacterBad_01();
	this.instance_2291.setTransform(103.95,339.6,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2292 = new lib.CharacterBad_01();
	this.instance_2292.setTransform(-0.15,317.4,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2293 = new lib.CharacterBad_03();
	this.instance_2293.setTransform(128.95,326.1,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2294 = new lib.CharacterBad_02();
	this.instance_2294.setTransform(80.75,329,0.177,0.177,0,0,0,-14.1,35.6);

	this.instance_2295 = new lib.CharacterBad_04();
	this.instance_2295.setTransform(98.15,315.05,0.177,0.177,0,0,0,-40.1,48.9);

	this.instance_2296 = new lib.CharacterBad_04();
	this.instance_2296.setTransform(145.15,307.45,0.177,0.177,0,0,0,-39.6,48.9);

	this.instance_2297 = new lib.CharacterBad_04();
	this.instance_2297.setTransform(54.1,315.05,0.177,0.177,0,0,0,-39.6,48.9);

	this.instance_2298 = new lib.CharacterBad_03();
	this.instance_2298.setTransform(86.35,294.65,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2299 = new lib.CharacterBad_03();
	this.instance_2299.setTransform(25.15,305.8,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2300 = new lib.CharacterBad_02();
	this.instance_2300.setTransform(44.75,292.55,0.177,0.177,0,0,0,-14.1,35.9);

	this.instance_2301 = new lib.CharacterBad_04();
	this.instance_2301.setTransform(61.65,278.15,0.177,0.177,0,0,0,-39.8,49.1);

	this.instance_2302 = new lib.CharacterBad_04();
	this.instance_2302.setTransform(109.3,284.8,0.177,0.177,0,0,0,-39.8,49.1);

	this.instance_2303 = new lib.CharacterBad_01();
	this.instance_2303.setTransform(179.35,303.2,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2304 = new lib.CharacterBad_02();
	this.instance_2304.setTransform(167.8,288.05,0.177,0.177,0,0,0,-14.1,35.6);

	this.instance_2305 = new lib.CharacterBad_04();
	this.instance_2305.setTransform(199.6,298.15,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2306 = new lib.CharacterBad_03();
	this.instance_2306.setTransform(190.75,279.05,0.177,0.177,0,0,0,-3.4,47.8);

	this.instance_2307 = new lib.CharacterBad_04();
	this.instance_2307.setTransform(17.75,270.1,0.177,0.177,0,0,0,-39.8,48.9);

	this.instance_2308 = new lib.CharacterBad_02();
	this.instance_2308.setTransform(139.8,277.85,0.177,0.177,0,0,0,-14.1,35.6);

	this.instance_2309 = new lib.CharacterBad_03();
	this.instance_2309.setTransform(122.65,253.7,0.177,0.177,0,0,0,-3.4,48);

	this.instance_2310 = new lib.CharacterBad_03();
	this.instance_2310.setTransform(96.55,265.05,0.177,0.177,0,0,0,-3.1,48.3);

	this.instance_2311 = new lib.CharacterBad_04();
	this.instance_2311.setTransform(158.85,257.4,0.177,0.177,0,0,0,-39.6,49.1);

	this.instance_2312 = new lib.CharacterBad_01();
	this.instance_2312.setTransform(70.85,241.25,0.177,0.177,0,0,0,-39.6,5.7);

	this.instance_2313 = new lib.CharacterBad_03();
	this.instance_2313.setTransform(228.7,286.15,0.177,0.177,0,0,0,-3.4,47.8);

	this.instance_2314 = new lib.CharacterBad_04();
	this.instance_2314.setTransform(246.4,271.95,0.177,0.177,0,0,0,-39.8,48.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2314},{t:this.instance_2313},{t:this.instance_2312},{t:this.instance_2311},{t:this.instance_2310},{t:this.instance_2309},{t:this.instance_2308},{t:this.instance_2307},{t:this.instance_2306},{t:this.instance_2305},{t:this.instance_2304},{t:this.instance_2303},{t:this.instance_2302},{t:this.instance_2301},{t:this.instance_2300},{t:this.instance_2299},{t:this.instance_2298},{t:this.instance_2297},{t:this.instance_2296},{t:this.instance_2295},{t:this.instance_2294},{t:this.instance_2293},{t:this.instance_2292},{t:this.instance_2291},{t:this.instance_2290},{t:this.instance_2289},{t:this.instance_2288},{t:this.instance_2287},{t:this.instance_2286},{t:this.instance_2285},{t:this.instance_2284},{t:this.instance_2283},{t:this.instance_2282},{t:this.instance_2281},{t:this.instance_2280},{t:this.instance_2279},{t:this.instance_2278},{t:this.instance_2277},{t:this.instance_2276},{t:this.instance_2275},{t:this.instance_2274},{t:this.instance_2273},{t:this.instance_2272},{t:this.instance_2271},{t:this.instance_2270},{t:this.instance_2269},{t:this.instance_2268},{t:this.instance_2267},{t:this.instance_2266},{t:this.instance_2265},{t:this.instance_2264},{t:this.instance_2263},{t:this.instance_2262},{t:this.instance_2261},{t:this.instance_2260},{t:this.instance_2259},{t:this.instance_2258},{t:this.instance_2257},{t:this.instance_2256},{t:this.instance_2255},{t:this.instance_2254},{t:this.instance_2253},{t:this.instance_2252},{t:this.instance_2251},{t:this.instance_2250},{t:this.instance_2249},{t:this.instance_2248},{t:this.instance_2247},{t:this.instance_2246},{t:this.instance_2245},{t:this.instance_2244},{t:this.instance_2243},{t:this.instance_2242},{t:this.instance_2241},{t:this.instance_2240},{t:this.instance_2239},{t:this.instance_2238},{t:this.instance_2237},{t:this.instance_2236},{t:this.instance_2235},{t:this.instance_2234},{t:this.instance_2233},{t:this.instance_2232},{t:this.instance_2231},{t:this.instance_2230},{t:this.instance_2229},{t:this.instance_2228},{t:this.instance_2227},{t:this.instance_2226},{t:this.instance_2225},{t:this.instance_2224},{t:this.instance_2223},{t:this.instance_2222},{t:this.instance_2221},{t:this.instance_2220},{t:this.instance_2219},{t:this.instance_2218},{t:this.instance_2217},{t:this.instance_2216},{t:this.instance_2215},{t:this.instance_2214},{t:this.instance_2213},{t:this.instance_2212},{t:this.instance_2211},{t:this.instance_2210},{t:this.instance_2209},{t:this.instance_2208},{t:this.instance_2207},{t:this.instance_2206},{t:this.instance_2205},{t:this.instance_2204},{t:this.instance_2203},{t:this.instance_2202},{t:this.instance_2201},{t:this.instance_2200},{t:this.instance_2199},{t:this.instance_2198},{t:this.instance_2197},{t:this.instance_2196},{t:this.instance_2195},{t:this.instance_2194},{t:this.instance_2193},{t:this.instance_2192},{t:this.instance_2191},{t:this.instance_2190},{t:this.instance_2189},{t:this.instance_2188},{t:this.instance_2187},{t:this.instance_2186},{t:this.instance_2185},{t:this.instance_2184},{t:this.instance_2183},{t:this.instance_2182},{t:this.instance_2181},{t:this.instance_2180},{t:this.instance_2179},{t:this.instance_2178}]}).to({state:[]},229).wait(1));

	// Background
	this.instance_2315 = new lib.Chap2Scene2();
	this.instance_2315.setTransform(0,0,0.6667,0.6667);

	this.timeline.addTween(cjs.Tween.get(this.instance_2315).wait(230));

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
		{src:"images/LessonChapter2_02_atlas_1.png?1655325457284", id:"LessonChapter2_02_atlas_1"},
		{src:"images/LessonChapter2_02_atlas_2.png?1655325457284", id:"LessonChapter2_02_atlas_2"},
		{src:"sounds/DuringWar202wav.mp3?1655325460705", id:"DuringWar202wav"},
		{src:"sounds/popsound.mp3?1655325460705", id:"popsound"}
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