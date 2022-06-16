(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter3_04_atlas_1", frames: [[0,1202,1280,720],[0,0,1600,1200]]},
		{name:"LessonChapter3_04_atlas_2", frames: [[0,268,427,994],[429,268,427,994],[858,268,427,994],[1287,268,427,994],[0,0,1914,266]]},
		{name:"LessonChapter3_04_atlas_3", frames: [[0,0,427,994],[0,996,427,994],[429,0,427,994],[429,996,427,994],[858,0,427,994]]},
		{name:"LessonChapter3_04_atlas_4", frames: [[1563,510,132,102],[1697,510,132,102],[1032,198,330,308],[0,508,315,292],[1364,198,330,308],[1831,147,193,36],[649,530,193,36],[317,508,330,275],[0,198,356,308],[649,568,193,36],[1831,600,193,36],[1696,198,306,310],[358,198,356,308],[649,606,193,36],[1563,614,193,36],[716,198,314,330],[1831,0,175,145],[1209,508,175,144],[1032,508,175,145],[1386,508,175,144],[0,0,1829,196],[1924,510,91,87],[1831,510,91,88]]}
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



(lib.CachedBmp_182 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_181 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_180 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_179 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_178 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_177 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_176 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_175 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_174 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_173 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_172 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_171 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_170 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_169 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_168 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_167 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_166 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_165 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_164 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_163 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_162 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_161 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_160 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_159 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_158 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_157 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_156 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_155 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_154 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_153 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_152 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_4"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.Chap3Scene3 = function() {
	this.initialize(ss["LessonChapter3_04_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.ColorCode_Interface = function() {
	this.initialize(ss["LessonChapter3_04_atlas_1"]);
	this.gotoAndStop(1);
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
	this.instance = new lib.CachedBmp_181();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_182();
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
	this.instance = new lib.CachedBmp_180();
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
	this.instance = new lib.CachedBmp_179();
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
	this.instance = new lib.CachedBmp_178();
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
	this.instance = new lib.CachedBmp_177();
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
	this.instance = new lib.CachedBmp_176();
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
	this.instance = new lib.CachedBmp_175();
	this.instance.setTransform(-78.05,-69.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78,-69.4,165,137.5);


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
	this.instance_1 = new lib.CachedBmp_174();
	this.instance_1.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,178,154);


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
	this.instance = new lib.CachedBmp_173();
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
	this.instance = new lib.CachedBmp_172();
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
	this.instance_1 = new lib.CachedBmp_171();
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
	this.instance_1 = new lib.CachedBmp_170();
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
	this.instance_1 = new lib.CachedBmp_169();
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
	this.instance_1 = new lib.CachedBmp_168();
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
	this.instance_1 = new lib.CachedBmp_167();
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

	// Layer_2
	this.instance = new lib.CachedBmp_165();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_166();
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
	this.instance = new lib.CachedBmp_163();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_164();
	this.instance_1.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(216.45,-207.05,4.7384,4.7384,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


// stage content:
(lib.LessonChapter3_04 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,143,250];
	this.streamSoundSymbolsList[0] = [{id:"AfterWar204wav",startFrame:0,endFrame:143,loop:1,offset:0}];
	this.streamSoundSymbolsList[143] = [{id:"AfterWar205wav",startFrame:143,endFrame:251,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("AfterWar204wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,143,1);
	}
	this.frame_143 = function() {
		var soundInstance = playSound("AfterWar205wav",0);
		this.InsertIntoSoundStreamData(soundInstance,143,251,1);
	}
	this.frame_250 = function() {
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter3_05.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter3_03.html");
			}, 500);
			
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(143).call(this.frame_143).wait(107).call(this.frame_250).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_153();
	this.instance.setTransform(182.8,582.4,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_152();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(251));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn}]}).wait(251));

	// Layer_2
	this.instance_2 = new lib.CachedBmp_154();
	this.instance_2.setTransform(235.85,80.45,0.5,0.5);

	this.instance_3 = new lib.ColorCode_Interface();
	this.instance_3.setTransform(592,830);

	this.instance_4 = new lib.CachedBmp_156();
	this.instance_4.setTransform(529.25,80.45,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_155();
	this.instance_5.setTransform(235.85,80.45,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_159();
	this.instance_6.setTransform(822.65,80.45,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_158();
	this.instance_7.setTransform(529.25,80.45,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_157();
	this.instance_8.setTransform(235.85,80.45,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_162();
	this.instance_9.setTransform(822.65,80.45,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_161();
	this.instance_10.setTransform(529.25,80.45,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_160();
	this.instance_11.setTransform(235.85,80.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},141).to({state:[{t:this.instance_3},{t:this.instance_5},{t:this.instance_4}]},36).to({state:[{t:this.instance_3},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6}]},37).to({state:[{t:this.instance_3},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9}]},36).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(10,72,12,0)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape.setTransform(640.675,367.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(10,72,12,0.004)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_1.setTransform(640.675,367.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(10,72,12,0.012)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_2.setTransform(640.675,367.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(10,72,12,0.016)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_3.setTransform(640.675,367.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(10,72,12,0.02)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_4.setTransform(640.675,367.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(10,72,12,0.024)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_5.setTransform(640.675,367.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(10,72,12,0.031)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_6.setTransform(640.675,367.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(10,72,12,0.035)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_7.setTransform(640.675,367.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(10,72,12,0.039)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_8.setTransform(640.675,367.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(10,72,12,0.043)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_9.setTransform(640.675,367.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(10,72,12,0.051)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_10.setTransform(640.675,367.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(10,72,12,0.055)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_11.setTransform(640.675,367.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(10,72,12,0.059)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_12.setTransform(640.675,367.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(10,72,12,0.067)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_13.setTransform(640.675,367.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(10,72,12,0.071)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_14.setTransform(640.675,367.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(10,72,12,0.075)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_15.setTransform(640.675,367.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(10,72,12,0.078)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_16.setTransform(640.675,367.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(10,72,12,0.086)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_17.setTransform(640.675,367.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(10,72,12,0.09)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_18.setTransform(640.675,367.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(10,72,12,0.094)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_19.setTransform(640.675,367.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(10,72,12,0.098)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_20.setTransform(640.675,367.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(10,72,12,0.106)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_21.setTransform(640.675,367.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(10,72,12,0.11)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_22.setTransform(640.675,367.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(10,72,12,0.114)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_23.setTransform(640.675,367.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(10,72,12,0.122)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_24.setTransform(640.675,367.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(10,72,12,0.125)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_25.setTransform(640.675,367.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(10,72,12,0.129)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_26.setTransform(640.675,367.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(10,72,12,0.133)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_27.setTransform(640.675,367.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(10,72,12,0.141)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_28.setTransform(640.675,367.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(10,72,12,0.145)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_29.setTransform(640.675,367.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(10,72,12,0.149)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_30.setTransform(640.675,367.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(10,72,12,0.153)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_31.setTransform(640.675,367.3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(10,72,12,0.161)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_32.setTransform(640.675,367.3);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("rgba(10,72,12,0.165)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_33.setTransform(640.675,367.3);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("rgba(10,72,12,0.169)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_34.setTransform(640.675,367.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("rgba(10,72,12,0.176)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_35.setTransform(640.675,367.3);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("rgba(10,72,12,0.18)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_36.setTransform(640.675,367.3);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("rgba(10,72,12,0.184)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_37.setTransform(640.675,367.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("rgba(10,72,12,0.188)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_38.setTransform(640.675,367.3);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("rgba(10,72,12,0.196)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_39.setTransform(640.675,367.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(10,72,12,0.2)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_40.setTransform(640.675,367.3);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("rgba(10,72,12,0.204)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_41.setTransform(640.675,367.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("rgba(10,72,12,0.208)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_42.setTransform(640.675,367.3);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("rgba(10,72,12,0.216)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_43.setTransform(640.675,367.3);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("rgba(10,72,12,0.22)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_44.setTransform(640.675,367.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("rgba(10,72,12,0.224)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_45.setTransform(640.675,367.3);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("rgba(10,72,12,0.231)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_46.setTransform(640.675,367.3);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("rgba(10,72,12,0.235)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_47.setTransform(640.675,367.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("rgba(10,72,12,0.239)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_48.setTransform(640.675,367.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("rgba(10,72,12,0.243)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_49.setTransform(640.675,367.3);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("rgba(10,72,12,0.251)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_50.setTransform(640.675,367.3);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("rgba(10,72,12,0.255)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_51.setTransform(640.675,367.3);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("rgba(10,72,12,0.259)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_52.setTransform(640.675,367.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("rgba(10,72,12,0.263)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_53.setTransform(640.675,367.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("rgba(10,72,12,0.271)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_54.setTransform(640.675,367.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("rgba(10,72,12,0.275)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_55.setTransform(640.675,367.3);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("rgba(10,72,12,0.278)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_56.setTransform(640.675,367.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("rgba(10,72,12,0.286)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_57.setTransform(640.675,367.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("rgba(10,72,12,0.29)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_58.setTransform(640.675,367.3);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("rgba(10,72,12,0.294)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_59.setTransform(640.675,367.3);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("rgba(10,72,12,0.298)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_60.setTransform(640.675,367.3);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("rgba(10,72,12,0.306)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_61.setTransform(640.675,367.3);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("rgba(10,72,12,0.31)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_62.setTransform(640.675,367.3);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("rgba(10,72,12,0.314)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_63.setTransform(640.675,367.3);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("rgba(10,72,12,0.318)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_64.setTransform(640.675,367.3);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("rgba(10,72,12,0.325)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_65.setTransform(640.675,367.3);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("rgba(10,72,12,0.329)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_66.setTransform(640.675,367.3);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("rgba(10,72,12,0.333)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_67.setTransform(640.675,367.3);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("rgba(10,72,12,0.341)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_68.setTransform(640.675,367.3);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("rgba(10,72,12,0.345)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_69.setTransform(640.675,367.3);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("rgba(10,72,12,0.349)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_70.setTransform(640.675,367.3);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("rgba(10,72,12,0.353)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_71.setTransform(640.675,367.3);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("rgba(10,72,12,0.361)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_72.setTransform(640.675,367.3);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("rgba(10,72,12,0.365)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_73.setTransform(640.675,367.3);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("rgba(10,72,12,0.369)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_74.setTransform(640.675,367.3);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("rgba(10,72,12,0.373)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_75.setTransform(640.675,367.3);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("rgba(10,72,12,0.38)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_76.setTransform(640.675,367.3);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("rgba(10,72,12,0.384)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_77.setTransform(640.675,367.3);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("rgba(10,72,12,0.388)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_78.setTransform(640.675,367.3);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("rgba(10,72,12,0.396)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_79.setTransform(640.675,367.3);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("rgba(10,72,12,0.4)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_80.setTransform(640.675,367.3);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("rgba(10,72,12,0.404)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_81.setTransform(640.675,367.3);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("rgba(10,72,12,0.408)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_82.setTransform(640.675,367.3);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("rgba(10,72,12,0.416)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_83.setTransform(640.675,367.3);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("rgba(10,72,12,0.42)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_84.setTransform(640.675,367.3);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("rgba(10,72,12,0.424)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_85.setTransform(640.675,367.3);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("rgba(10,72,12,0.427)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_86.setTransform(640.675,367.3);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("rgba(10,72,12,0.435)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_87.setTransform(640.675,367.3);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("rgba(10,72,12,0.439)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_88.setTransform(640.675,367.3);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("rgba(10,72,12,0.443)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_89.setTransform(640.675,367.3);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("rgba(10,72,12,0.451)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_90.setTransform(640.675,367.3);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("rgba(10,72,12,0.455)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_91.setTransform(640.675,367.3);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("rgba(10,72,12,0.459)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_92.setTransform(640.675,367.3);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("rgba(10,72,12,0.463)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_93.setTransform(640.675,367.3);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("rgba(10,72,12,0.471)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_94.setTransform(640.675,367.3);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("rgba(10,72,12,0.475)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_95.setTransform(640.675,367.3);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("rgba(10,72,12,0.478)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_96.setTransform(640.675,367.3);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("rgba(10,72,12,0.482)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_97.setTransform(640.675,367.3);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("rgba(10,72,12,0.49)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_98.setTransform(640.675,367.3);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("rgba(10,72,12,0.494)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_99.setTransform(640.675,367.3);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("rgba(10,72,12,0.498)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_100.setTransform(640.675,367.3);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("rgba(10,72,12,0.502)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_101.setTransform(640.675,367.3);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("rgba(10,72,12,0.51)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_102.setTransform(640.675,367.3);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("rgba(10,72,12,0.514)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_103.setTransform(640.675,367.3);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("rgba(10,72,12,0.518)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_104.setTransform(640.675,367.3);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("rgba(10,72,12,0.525)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_105.setTransform(640.675,367.3);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("rgba(10,72,12,0.529)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_106.setTransform(640.675,367.3);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("rgba(10,72,12,0.533)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_107.setTransform(640.675,367.3);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("rgba(10,72,12,0.537)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_108.setTransform(640.675,367.3);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("rgba(10,72,12,0.545)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_109.setTransform(640.675,367.3);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("rgba(10,72,12,0.549)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_110.setTransform(640.675,367.3);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("rgba(10,72,12,0.553)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_111.setTransform(640.675,367.3);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("rgba(10,72,12,0.557)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_112.setTransform(640.675,367.3);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("rgba(10,72,12,0.565)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_113.setTransform(640.675,367.3);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("rgba(10,72,12,0.569)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_114.setTransform(640.675,367.3);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("rgba(10,72,12,0.573)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_115.setTransform(640.675,367.3);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("rgba(10,72,12,0.58)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_116.setTransform(640.675,367.3);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("rgba(10,72,12,0.584)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_117.setTransform(640.675,367.3);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("rgba(10,72,12,0.588)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_118.setTransform(640.675,367.3);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("rgba(10,72,12,0.592)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_119.setTransform(640.675,367.3);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("rgba(10,72,12,0.6)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_120.setTransform(640.675,367.3);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("rgba(10,72,12,0.604)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_121.setTransform(640.675,367.3);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("rgba(10,72,12,0.608)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_122.setTransform(640.675,367.3);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("rgba(10,72,12,0.612)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_123.setTransform(640.675,367.3);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("rgba(10,72,12,0.62)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_124.setTransform(640.675,367.3);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("rgba(10,72,12,0.624)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_125.setTransform(640.675,367.3);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("rgba(10,72,12,0.627)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_126.setTransform(640.675,367.3);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("rgba(10,72,12,0.635)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_127.setTransform(640.675,367.3);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("rgba(10,72,12,0.639)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_128.setTransform(640.675,367.3);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("rgba(10,72,12,0.643)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_129.setTransform(640.675,367.3);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("rgba(10,72,12,0.647)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_130.setTransform(640.675,367.3);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("rgba(10,72,12,0.655)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_131.setTransform(640.675,367.3);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("rgba(10,72,12,0.659)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_132.setTransform(640.675,367.3);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("rgba(10,72,12,0.663)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_133.setTransform(640.675,367.3);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("rgba(10,72,12,0.667)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_134.setTransform(640.675,367.3);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("rgba(10,72,12,0.675)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_135.setTransform(640.675,367.3);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("rgba(10,72,12,0.678)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_136.setTransform(640.675,367.3);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("rgba(10,72,12,0.682)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_137.setTransform(640.675,367.3);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("rgba(10,72,12,0.69)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_138.setTransform(640.675,367.3);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("rgba(10,72,12,0.694)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_139.setTransform(640.675,367.3);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("rgba(10,72,12,0.698)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_140.setTransform(640.675,367.3);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("rgba(10,72,12,0.702)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_141.setTransform(640.675,367.3);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("rgba(10,72,12,0.71)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_142.setTransform(640.675,367.3);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("rgba(10,72,12,0.714)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_143.setTransform(640.675,367.3);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("rgba(10,72,12,0.718)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_144.setTransform(640.675,367.3);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("rgba(10,72,12,0.722)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_145.setTransform(640.675,367.3);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("rgba(10,72,12,0.729)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_146.setTransform(640.675,367.3);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("rgba(10,72,12,0.733)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_147.setTransform(640.675,367.3);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("rgba(10,72,12,0.737)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_148.setTransform(640.675,367.3);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("rgba(10,72,12,0.745)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_149.setTransform(640.675,367.3);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("rgba(10,72,12,0.749)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_150.setTransform(640.675,367.3);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("rgba(10,72,12,0.753)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_151.setTransform(640.675,367.3);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("rgba(10,72,12,0.757)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_152.setTransform(640.675,367.3);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("rgba(10,72,12,0.765)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_153.setTransform(640.675,367.3);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("rgba(10,72,12,0.769)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_154.setTransform(640.675,367.3);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("rgba(10,72,12,0.773)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_155.setTransform(640.675,367.3);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("rgba(10,72,12,0.776)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_156.setTransform(640.675,367.3);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("rgba(10,72,12,0.784)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_157.setTransform(640.675,367.3);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("rgba(10,72,12,0.788)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_158.setTransform(640.675,367.3);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("rgba(10,72,12,0.792)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_159.setTransform(640.675,367.3);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("rgba(10,72,12,0.8)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_160.setTransform(640.675,367.3);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("rgba(10,72,12,0.804)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_161.setTransform(640.675,367.3);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("rgba(10,72,12,0.808)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_162.setTransform(640.675,367.3);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("rgba(10,72,12,0.812)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_163.setTransform(640.675,367.3);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("rgba(10,72,12,0.82)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_164.setTransform(640.675,367.3);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("rgba(10,72,12,0.824)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_165.setTransform(640.675,367.3);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("rgba(10,72,12,0.827)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_166.setTransform(640.675,367.3);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("rgba(10,72,12,0.831)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_167.setTransform(640.675,367.3);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("rgba(10,72,12,0.839)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_168.setTransform(640.675,367.3);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("rgba(10,72,12,0.843)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_169.setTransform(640.675,367.3);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("rgba(10,72,12,0.847)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_170.setTransform(640.675,367.3);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("rgba(10,72,12,0.855)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_171.setTransform(640.675,367.3);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("rgba(10,72,12,0.859)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_172.setTransform(640.675,367.3);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("rgba(10,72,12,0.863)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_173.setTransform(640.675,367.3);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("rgba(10,72,12,0.867)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_174.setTransform(640.675,367.3);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("rgba(10,72,12,0.875)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_175.setTransform(640.675,367.3);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("rgba(10,72,12,0.878)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_176.setTransform(640.675,367.3);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("rgba(10,72,12,0.882)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_177.setTransform(640.675,367.3);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("rgba(10,72,12,0.886)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_178.setTransform(640.675,367.3);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("rgba(10,72,12,0.894)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_179.setTransform(640.675,367.3);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("rgba(10,72,12,0.898)").s().p("EhqdA9EMAAAh6HMDU7AAAMAAAB6Hg");
	this.shape_180.setTransform(640.675,367.3);
	this.shape_180._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_180).wait(180).to({_off:false},0).wait(71));

	// Layer_1
	this.instance_12 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_12.setTransform(888.05,295.65,0.548,0.548,0,96.6471,-83.3529,36,-0.4);

	this.instance_13 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_13.setTransform(853.05,377.8,0.5478,0.5478,0,144.8228,-35.1772,6.4,-2);

	this.instance_14 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_14.setTransform(854.15,373.05,0.5479,0.5479,0,112.3315,-67.6685,5,-9.4);

	this.instance_15 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_15.setTransform(882.1,338.85,0.5479,0.5479,0,130.1127,-49.8873,39.8,0.4);

	this.instance_16 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_16.setTransform(852.65,266.7,0.5483,0.5483,0,-16.141,163.8586,1.1,53.2);

	this.instance_17 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_17.setTransform(860.7,297.25,0.5489,0.5489,0,0,180,-0.6,-23.5);

	this.instance_18 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_18.setTransform(874.65,411.7,0.5478,0.5478,0,-12.7066,167.2934,2.4,-53.8);

	this.instance_19 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_19.setTransform(859.2,276.65,0.5482,0.5482,0,-31.9082,148.0918,-0.8,9.2);

	this.instance_20 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_20.setTransform(859.7,334.8,0.5489,0.5489,0,0,180,-0.8,-22.9);

	this.instance_21 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_21.setTransform(836.95,411.1,0.5476,0.5476,0,6.891,-173.109,3.6,-53.6);

	this.instance_22 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_22.setTransform(848.85,360,0.5476,0.5476,0,15.3851,-164.6149,-1.3,2.4);

	this.instance_23 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_23.setTransform(835.55,382.35,0.5478,0.5478,0,-41.1062,138.8938,-4.7,3.6);

	this.instance_24 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_24.setTransform(835.8,376.1,0.5479,0.5479,0,-67.4403,112.5597,-5.7,8.2);

	this.instance_25 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_25.setTransform(846.2,333.6,0.5479,0.5479,0,-76.6275,103.3725,-39.3,-0.7);

	this.instance_26 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_26.setTransform(831.75,294.2,0.5479,0.5479,0,-110.6929,69.3071,-33,-0.5);

	this.instance_27 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_27.setTransform(867.65,358.75,0.548,0.548,0,-5.2342,174.7658,1.9,-46);

	this.instance_28 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_28.setTransform(765.45,336.1,0.5704,0.5704,0,88.1742,-91.8258,35,-0.1);

	this.instance_29 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_29.setTransform(749.25,428.65,0.5701,0.5701,0,119.1893,-60.8107,5.4,-2.4);

	this.instance_30 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_30.setTransform(748.95,423.6,0.5703,0.5703,0,95.8384,-84.1616,4.5,-9.2);

	this.instance_31 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_31.setTransform(766,381.15,0.5703,0.5703,0,112.608,-67.392,38.9,0.4);

	this.instance_32 = new lib.ch1_headcopy_1("synched",0);
	this.instance_32.setTransform(733.25,303.85,0.5706,0.5706,0,-10.9524,169.0476,0.4,53.1);

	this.instance_33 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_33.setTransform(737.05,337.5,0.5712,0.5712,0,0,180,-0.7,-23.4);

	this.instance_34 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_34.setTransform(746.3,457.35,0.5702,0.5702,0,-16.7887,163.2113,2.8,-53.6);

	this.instance_35 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_35.setTransform(735.45,316,0.5707,0.5707,0,-9.8222,170.1778,-1,9.3);

	this.instance_36 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_36.setTransform(736,376.6,0.5712,0.5712,0,0,180,-0.5,-22.3);

	this.instance_37 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_37.setTransform(716.3,457.25,0.57,0.57,0,11.577,-168.423,1.7,-53.1);

	this.instance_38 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_38.setTransform(727.45,403.7,0.57,0.57,0,14.71,-165.29,-1.7,2.7);

	this.instance_39 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_39.setTransform(704.65,423.9,0.5703,0.5703,0,-68.8414,111.1586,-4.2,4);

	this.instance_40 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_40.setTransform(700.9,418.6,0.5703,0.5703,0,-106.499,73.501,-5.5,7.9);

	this.instance_41 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_41.setTransform(718.45,376.3,0.5703,0.5703,0,-68.1696,111.8304,-39.8,0.4);

	this.instance_42 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_42.setTransform(707,334.15,0.5703,0.5703,0,-106.0136,73.9864,-33.3,0.2);

	this.instance_43 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_43.setTransform(742.45,402.2,0.5703,0.5703,0,-1.8321,178.1679,1.8,-45.2);

	this.instance_44 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_44.setTransform(593.4,341.75,0.6099,0.6099,0,85.0293,-94.9707,35.1,-0.5);

	this.instance_45 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_45.setTransform(586.95,443.5,0.6097,0.6097,0,103.4759,-76.5241,5.8,-2.4);

	this.instance_46 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_46.setTransform(588.55,438.35,0.6097,0.6097,0,113.7346,-66.2654,5.3,-10.1);

	this.instance_47 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_47.setTransform(597.65,389.4,0.6099,0.6099,0,100.3852,-79.6148,40.1,-1.2);

	this.instance_48 = new lib.ch1_headcopy2("synched",0);
	this.instance_48.setTransform(558.85,307.25,0.6102,0.6102,0,-10.3916,169.6084,0.1,53.1);

	this.instance_49 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_49.setTransform(562.7,343.3,0.6109,0.6109,0,0,180,-0.9,-23.4);

	this.instance_50 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_50.setTransform(549.95,464.75,0.6095,0.6095,0,11.9147,-168.0853,2.4,-53.6);

	this.instance_51 = new lib.ch1_neckcopy2("synched",0);
	this.instance_51.setTransform(561.45,320.2,0.6102,0.6102,0,-10.1664,169.8336,-1.8,9.2);

	this.instance_52 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_52.setTransform(561.7,385.2,0.6109,0.6109,0,0,180,-1.2,-22.4);

	this.instance_53 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_53.setTransform(559.65,470.45,0.6092,0.6092,0,-36.4523,143.5477,3.4,-52.4);

	this.instance_54 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_54.setTransform(548.65,412.75,0.6094,0.6094,0,-7.7973,172.2027,-0.1,2.5);

	this.instance_55 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_55.setTransform(521.55,440.4,0.6097,0.6097,0,-60.4509,119.5491,-5,3.6);

	this.instance_56 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_56.setTransform(519.65,433.65,0.6099,0.6099,0,-84.7489,95.2511,-5.5,8.2);

	this.instance_57 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_57.setTransform(531.9,386.35,0.6098,0.6098,0,-75.6546,104.3454,-39.5,-0.4);

	this.instance_58 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_58.setTransform(530.5,339.9,0.6098,0.6098,0,-92.6718,87.3282,-32.4,0.2);

	this.instance_59 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_59.setTransform(573.95,410.8,0.6095,0.6095,0,26.6555,-153.3445,1.2,-45.6);

	this.instance_60 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_60.setTransform(69,480.05,0.8916,0.8916,0,96.6534,-83.3466,36.1,0.1);

	this.instance_61 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_61.setTransform(12.1,613.8,0.8913,0.8913,0,144.8204,-35.1796,6.2,-1.9);

	this.instance_62 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_62.setTransform(13.85,606,0.8915,0.8915,0,112.3374,-67.6626,5,-8.9);

	this.instance_63 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_63.setTransform(59.4,550.3,0.8915,0.8915,0,130.1136,-49.8864,39.9,0.7);

	this.instance_64 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_64.setTransform(11.8,433.15,0.8921,0.8921,0,-16.1495,163.8503,1.3,53.1);

	this.instance_65 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_65.setTransform(24.4,482.55,0.8931,0.8931,0,0,180,-0.1,-24);

	this.instance_66 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_66.setTransform(47.35,668.75,0.8915,0.8915,0,-12.7172,167.2828,2.9,-54.1);

	this.instance_67 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_67.setTransform(22.25,449.05,0.8921,0.8921,0,-31.9129,148.0871,-0.8,9);

	this.instance_68 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_68.setTransform(22.75,543.65,0.8931,0.8931,0,0,180,-0.1,-23.3);

	this.instance_69 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_69.setTransform(-14,667.9,0.8911,0.8911,0,6.8974,-173.1026,4.2,-53.6);

	this.instance_70 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_70.setTransform(5.2,584.6,0.891,0.891,0,15.3943,-164.6057,-0.9,2.1);

	this.instance_71 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_71.setTransform(-16.3,620.95,0.8914,0.8914,0,-41.1052,138.8948,-4.5,3.1);

	this.instance_72 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_72.setTransform(-15.9,610.95,0.8915,0.8915,0,-67.4346,112.5654,-5.9,7.6);

	this.instance_73 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_73.setTransform(0.85,541.5,0.8916,0.8916,0,-76.6199,103.3801,-39.7,-1.4);

	this.instance_74 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_74.setTransform(-22.5,477.5,0.8916,0.8916,0,-110.6977,69.3023,-33.5,-0.8);

	this.instance_75 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_75.setTransform(36,582.5,0.8916,0.8916,0,-5.2447,174.7553,2,-46.4);

	this.instance_76 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_76.setTransform(259.45,412.7,0.7882,0.7882,0,88.164,-91.836,35.6,0.2);

	this.instance_77 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_77.setTransform(237.25,540.7,0.7878,0.7878,0,119.1947,-60.8053,5.8,-2);

	this.instance_78 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_78.setTransform(236.65,533.65,0.7881,0.7881,0,95.8499,-84.1501,4.9,-8.8);

	this.instance_79 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_79.setTransform(260.15,475.05,0.7881,0.7881,0,112.6176,-67.3824,39.3,0.8);

	this.instance_80 = new lib.ch1_headcopy_1("synched",0);
	this.instance_80.setTransform(214.8,368.25,0.7886,0.7886,0,-10.9638,169.0362,0.8,52.8);

	this.instance_81 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_81.setTransform(220.05,414.65,0.7894,0.7894,0,0,180,-0.2,-23.7);

	this.instance_82 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_82.setTransform(233.05,580.25,0.788,0.788,0,-16.7969,163.2031,2.9,-54.2);

	this.instance_83 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_83.setTransform(218.1,384.95,0.7886,0.7886,0,-9.8268,170.1732,-0.9,9.2);

	this.instance_84 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_84.setTransform(218.65,468.75,0.7894,0.7894,0,0,180,-0.1,-22.8);

	this.instance_85 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_85.setTransform(191.65,580.15,0.7877,0.7877,0,11.587,-168.413,2.1,-53.8);

	this.instance_86 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_86.setTransform(206.8,506.15,0.7876,0.7876,0,14.7166,-165.2834,-1.2,2.2);

	this.instance_87 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_87.setTransform(175.5,534.1,0.7881,0.7881,0,-68.8362,111.1638,-4.7,3.5);

	this.instance_88 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_88.setTransform(170.3,526.95,0.7882,0.7882,0,-106.5075,73.4925,-6,7.9);

	this.instance_89 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_89.setTransform(194.45,468.15,0.7881,0.7881,0,-68.1625,111.8375,-40.4,-0.3);

	this.instance_90 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_90.setTransform(178.6,410.05,0.7881,0.7881,0,-106.021,73.979,-33.6,-0.1);

	this.instance_91 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_91.setTransform(227.65,504,0.7881,0.7881,0,-1.8428,178.1572,2.1,-46);

	this.instance_92 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_92.setTransform(995.7,268,0.506,0.506,0,85.0363,-94.9637,34.3,-0.3);

	this.instance_93 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_93.setTransform(990.4,352.5,0.5058,0.5058,0,103.4653,-76.5347,5,-2.4);

	this.instance_94 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_94.setTransform(991.95,348.15,0.5059,0.5059,0,113.7296,-66.2704,5.4,-11);

	this.instance_95 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_95.setTransform(999.3,307.55,0.506,0.506,0,100.3804,-79.6196,39.4,-1.7);

	this.instance_96 = new lib.ch1_headcopy2("synched",0);
	this.instance_96.setTransform(966.95,239.4,0.5063,0.5063,0,-10.389,169.611,0.1,53.2);

	this.instance_97 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_97.setTransform(970.45,269.2,0.5069,0.5069,0,0,180,-1.8,-22.9);

	this.instance_98 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_98.setTransform(959.65,370.15,0.5057,0.5057,0,11.9053,-168.0947,2.2,-53.3);

	this.instance_99 = new lib.ch1_neckcopy2("synched",0);
	this.instance_99.setTransform(969.1,250.1,0.5063,0.5063,0,-10.1661,169.8339,-1.4,9.4);

	this.instance_100 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_100.setTransform(969.35,304.05,0.5069,0.5069,0,0,180,-1,-21.7);

	this.instance_101 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_101.setTransform(967.6,374.85,0.5054,0.5054,0,-36.4468,143.5532,3.9,-52.3);

	this.instance_102 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_102.setTransform(958.6,326.95,0.5056,0.5056,0,-7.7919,172.2081,-0.2,3.4);

	this.instance_103 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_103.setTransform(936.1,349.9,0.5059,0.5059,0,-60.4525,119.5475,-4.2,4.3);

	this.instance_104 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_104.setTransform(934.45,344.3,0.506,0.506,0,-84.7558,95.2442,-5.3,8.2);

	this.instance_105 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_105.setTransform(945,305,0.5059,0.5059,0,-75.6616,104.3384,-38.9,0.5);

	this.instance_106 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_106.setTransform(943.5,266.5,0.506,0.506,0,-92.6654,87.3346,-31.9,0.4);

	this.instance_107 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_107.setTransform(979.5,325.35,0.5057,0.5057,0,26.6524,-153.3476,0.5,-45);

	this.instance_108 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_108.setTransform(669.75,294.2,0.5893,0.5893,0,96.6416,-83.3584,35.7,-1.2);

	this.instance_109 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_109.setTransform(632.15,382.5,0.5891,0.5891,0,144.8243,-35.1757,6.5,-2.4);

	this.instance_110 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_110.setTransform(633.4,377.55,0.5892,0.5892,0,112.328,-67.672,4.7,-10);

	this.instance_111 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_111.setTransform(663.4,340.85,0.5892,0.5892,0,130.1118,-49.8882,39.8,-0.5);

	this.instance_112 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_112.setTransform(631.75,263.2,0.5896,0.5896,0,-16.1362,163.8638,0.8,53.7);

	this.instance_113 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_113.setTransform(640.25,295.85,0.5904,0.5904,0,0,180,-1.4,-23.4);

	this.instance_114 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_114.setTransform(655.4,419.05,0.5892,0.5892,0,-12.7026,167.2974,1.9,-53.2);

	this.instance_115 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_115.setTransform(638.7,273.65,0.5896,0.5896,0,-31.9045,148.0955,-0.9,9.5);

	this.instance_116 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_116.setTransform(639.15,336.3,0.5904,0.5904,0,0,180,-0.7,-22.6);

	this.instance_117 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_117.setTransform(614.85,418.4,0.5889,0.5889,0,6.8868,-173.1132,3.1,-53.1);

	this.instance_118 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_118.setTransform(627.5,363.4,0.5889,0.5889,0,15.3812,-164.6188,-1.5,2.6);

	this.instance_119 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_119.setTransform(613.3,387.35,0.5891,0.5891,0,-41.1017,138.8983,-4.7,4);

	this.instance_120 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_120.setTransform(613.7,380.8,0.5892,0.5892,0,-67.4455,112.5545,-5.8,8.6);

	this.instance_121 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_121.setTransform(624.65,334.8,0.5892,0.5892,0,-76.6309,103.3691,-39.4,-0.4);

	this.instance_122 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_122.setTransform(609.1,292.45,0.5892,0.5892,0,-110.6918,69.3082,-32.9,-0.4);

	this.instance_123 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_123.setTransform(647.8,361.9,0.5893,0.5893,0,-5.2296,174.7704,1.5,-46);

	this.instance_124 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_124.setTransform(1263.1,220.45,0.4023,0.4023,0,77.7758,-102.2242,34.4,-0.1);

	this.instance_125 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_125.setTransform(1260.3,285.05,0.4022,0.4022,0,99.6846,-80.3154,5,-2.3);

	this.instance_126 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_126.setTransform(1258.4,282,0.4022,0.4022,0,67.4091,-112.5909,4,-8.9);

	this.instance_127 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_127.setTransform(1269.95,251.4,0.4022,0.4022,0,109.9864,-70.0136,39.4,-1.4);

	this.instance_128 = new lib.ch1_headcopy("synched",0);
	this.instance_128.setTransform(1240.15,197.6,0.4025,0.4025,0,-12.9583,167.0417,0.7,53.8);

	this.instance_129 = new lib.ch1_uBodycopy("synched",0);
	this.instance_129.setTransform(1243.05,221.45,0.403,0.403,0,0,180,-1.1,-22.9);

	this.instance_130 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_130.setTransform(1236.4,303.4,0.4021,0.4021,0,17.6242,-162.3758,1.4,-53.5);

	this.instance_131 = new lib.ch1_neckcopy("synched",0);
	this.instance_131.setTransform(1242.05,206.15,0.4025,0.4025,0,-9.1995,170.8005,-1.8,10.1);

	this.instance_132 = new lib.ch1_lBodycopy("synched",0);
	this.instance_132.setTransform(1242.2,249.1,0.403,0.403,0,0,180,-0.8,-21.9);

	this.instance_133 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_133.setTransform(1235.95,307.1,0.4018,0.4018,0,-30.7029,149.2971,3.8,-52.4);

	this.instance_134 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_134.setTransform(1236.55,268.55,0.402,0.402,0,3.3621,-176.6379,-1.3,3.4);

	this.instance_135 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_135.setTransform(1211.95,284.6,0.4023,0.4023,0,-90.2716,89.7284,-2.9,3.6);

	this.instance_136 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_136.setTransform(1209.3,281,0.4022,0.4022,0,-109.9783,70.0217,-4.2,8);

	this.instance_137 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_137.setTransform(1215.75,249.2,0.4023,0.4023,0,-78.6513,101.3487,-39.2,0.1);

	this.instance_138 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_138.setTransform(1221.8,219.4,0.4022,0.4022,0,-79.4885,100.5115,-31.9,0.5);

	this.instance_139 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_139.setTransform(1248.95,266.45,0.4021,0.4021,0,21.1348,-158.8652,0.6,-45.4);

	this.instance_140 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_140.setTransform(1292.25,111.75,0.3722,0.3722,0,85.0395,-94.9605,34.8,-0.3);

	this.instance_141 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_141.setTransform(1288.3,173.9,0.3721,0.3721,0,103.4658,-76.5342,5.2,-2.4);

	this.instance_142 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_142.setTransform(1289.3,170.7,0.3721,0.3721,0,113.7265,-66.2735,5,-10.1);

	this.instance_143 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_143.setTransform(1294.85,140.85,0.3722,0.3722,0,100.3756,-79.6244,39.9,-0.8);

	this.instance_144 = new lib.ch1_headcopy2("synched",0);
	this.instance_144.setTransform(1271.05,90.7,0.3724,0.3724,0,-10.3844,169.6156,0.1,53.2);

	this.instance_145 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_145.setTransform(1273.5,112.65,0.3728,0.3728,0,0,180,-0.8,-23.4);

	this.instance_146 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_146.setTransform(1265.75,186.9,0.372,0.372,0,11.9078,-168.0922,2.1,-53);

	this.instance_147 = new lib.ch1_neckcopy2("synched",0);
	this.instance_147.setTransform(1272.7,98.55,0.3724,0.3724,0,-10.1606,169.8394,-1.6,9.4);

	this.instance_148 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_148.setTransform(1272.9,138.25,0.3728,0.3728,0,0,180,-1,-22);

	this.instance_149 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_149.setTransform(1271.6,190.35,0.3717,0.3717,0,-36.447,143.553,3.9,-52.2);

	this.instance_150 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_150.setTransform(1265,155.1,0.3719,0.3719,0,-7.787,172.213,-0.4,3.1);

	this.instance_151 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_151.setTransform(1248.4,172,0.3721,0.3721,0,-60.4565,119.5435,-4.6,4);

	this.instance_152 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_152.setTransform(1247.25,167.85,0.3722,0.3722,0,-84.7592,95.2408,-5.2,8.3);

	this.instance_153 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_153.setTransform(1254.8,138.95,0.3721,0.3721,0,-75.6612,104.3388,-39.4,-0.2);

	this.instance_154 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_154.setTransform(1253.9,110.65,0.3721,0.3721,0,-92.6603,87.3397,-32.2,0.4);

	this.instance_155 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_155.setTransform(1280.4,153.9,0.3719,0.3719,0,26.6502,-153.3498,1,-45.4);

	this.instance_156 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_156.setTransform(1162.3,228.2,0.4446,0.4446,0,85.0347,-94.9653,35,-0.4);

	this.instance_157 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_157.setTransform(1157.55,302.4,0.4445,0.4445,0,103.469,-76.531,5.7,-2);

	this.instance_158 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_158.setTransform(1158.75,298.6,0.4445,0.4445,0,113.7306,-66.2694,5.2,-10.2);

	this.instance_159 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_159.setTransform(1165.35,262.95,0.4446,0.4446,0,100.3817,-79.6183,39.9,-0.7);

	this.instance_160 = new lib.ch1_headcopy2("synched",0);
	this.instance_160.setTransform(1137,203.05,0.4449,0.4449,0,-10.3996,169.6004,0.1,53.1);

	this.instance_161 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_161.setTransform(1139.85,229.25,0.4454,0.4454,0,0,180,-0.7,-23.6);

	this.instance_162 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_162.setTransform(1130.6,317.95,0.4444,0.4444,0,11.9119,-168.0881,2.3,-53.4);

	this.instance_163 = new lib.ch1_neckcopy2("synched",0);
	this.instance_163.setTransform(1138.95,212.4,0.4448,0.4448,0,-10.167,169.833,-1.6,9.3);

	this.instance_164 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_164.setTransform(1139.1,259.85,0.4454,0.4454,0,0,180,-0.9,-22.4);

	this.instance_165 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_165.setTransform(1137.6,322.05,0.4441,0.4441,0,-36.4498,143.5502,3.8,-52.5);

	this.instance_166 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_166.setTransform(1129.65,279.95,0.4443,0.4443,0,-7.7934,172.2066,-0.2,2.6);

	this.instance_167 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_167.setTransform(1109.85,300.15,0.4445,0.4445,0,-60.4449,119.5551,-4.8,3.8);

	this.instance_168 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_168.setTransform(1108.45,295.3,0.4446,0.4446,0,-84.7527,95.2473,-5.2,8.2);

	this.instance_169 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_169.setTransform(1117.45,260.7,0.4446,0.4446,0,-75.658,104.342,-39.4,-0.3);

	this.instance_170 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_170.setTransform(1116.45,226.8,0.4446,0.4446,0,-92.6674,87.3326,-32.6,0.3);

	this.instance_171 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_171.setTransform(1148.1,278.55,0.4443,0.4443,0,26.6539,-153.3461,1.3,-45.5);

	this.instance_172 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_172.setTransform(942.75,201.35,0.4823,0.4823,0,77.7686,-102.2314,34.7,0.1);

	this.instance_173 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_173.setTransform(939.4,278.8,0.4823,0.4823,0,99.6924,-80.3076,5,-2);

	this.instance_174 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_174.setTransform(937.1,275.2,0.4823,0.4823,0,67.4031,-112.5969,4.3,-8.8);

	this.instance_175 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_175.setTransform(950.95,238.5,0.4823,0.4823,0,109.9966,-70.0034,39.7,-0.9);

	this.instance_176 = new lib.ch1_headcopy("synched",0);
	this.instance_176.setTransform(915.25,173.95,0.4826,0.4826,0,-12.9628,167.0372,0.8,53.3);

	this.instance_177 = new lib.ch1_uBodycopy("synched",0);
	this.instance_177.setTransform(918.75,202.6,0.4832,0.4832,0,0,180,-0.8,-22.8);

	this.instance_178 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_178.setTransform(910.75,300.75,0.4821,0.4821,0,17.6338,-162.3662,1.8,-53.9);

	this.instance_179 = new lib.ch1_neckcopy("synched",0);
	this.instance_179.setTransform(917.5,184.15,0.4826,0.4826,0,-9.2077,170.7923,-1.4,10);

	this.instance_180 = new lib.ch1_lBodycopy("synched",0);
	this.instance_180.setTransform(917.8,235.65,0.4832,0.4832,0,0,180,-0.6,-21.9);

	this.instance_181 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_181.setTransform(910.2,305.2,0.4819,0.4819,0,-30.7058,149.2942,4.1,-52.6);

	this.instance_182 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_182.setTransform(910.95,258.95,0.482,0.482,0,3.372,-176.628,-0.8,2.9);

	this.instance_183 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_183.setTransform(881.55,278.25,0.4824,0.4824,0,-90.2809,89.7191,-2.8,3.4);

	this.instance_184 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_184.setTransform(878.35,273.85,0.4823,0.4823,0,-109.9898,70.0102,-5,8);

	this.instance_185 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_185.setTransform(886,235.75,0.4824,0.4824,0,-78.6414,101.3586,-39.1,-0.2);

	this.instance_186 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_186.setTransform(893.25,200,0.4823,0.4823,0,-79.4803,100.5197,-31.8,0.3);

	this.instance_187 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_187.setTransform(925.75,256.55,0.4822,0.4822,0,21.1378,-158.8622,1.1,-45.5);

	this.instance_188 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_188.setTransform(810.35,237.9,0.5496,0.5496,0,77.7644,-102.2356,34.9,0.1);

	this.instance_189 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_189.setTransform(806.45,326.2,0.5495,0.5495,0,99.698,-80.302,5.5,-1.8);

	this.instance_190 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_190.setTransform(803.95,322.05,0.5495,0.5495,0,67.4014,-112.5986,4.5,-8.7);

	this.instance_191 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_191.setTransform(819.6,280.2,0.5495,0.5495,0,109.9993,-70.0007,39.9,-0.7);

	this.instance_192 = new lib.ch1_headcopy("synched",0);
	this.instance_192.setTransform(778.95,206.7,0.5499,0.5499,0,-12.968,167.032,1,53.1);

	this.instance_193 = new lib.ch1_uBodycopy("synched",0);
	this.instance_193.setTransform(782.95,239.35,0.5505,0.5505,0,0,180,-0.7,-23.4);

	this.instance_194 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_194.setTransform(773.9,351.25,0.5493,0.5493,0,17.6372,-162.3628,1.9,-53.9);

	this.instance_195 = new lib.ch1_neckcopy("synched",0);
	this.instance_195.setTransform(781.55,218.35,0.5499,0.5499,0,-9.2117,170.7883,-1.4,9.2);

	this.instance_196 = new lib.ch1_lBodycopy("synched",0);
	this.instance_196.setTransform(781.8,277,0.5505,0.5505,0,0,180,-0.4,-22.4);

	this.instance_197 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_197.setTransform(773.15,356.2,0.5491,0.5491,0,-30.7073,149.2927,4,-53.1);

	this.instance_198 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_198.setTransform(774.05,303.5,0.5492,0.5492,0,3.3768,-176.6232,-0.6,2.7);

	this.instance_199 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_199.setTransform(740.5,325.5,0.5496,0.5496,0,-90.2847,89.7153,-3.5,3.1);

	this.instance_200 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_200.setTransform(736.9,320.5,0.5495,0.5495,0,-109.9933,70.0067,-5.2,8);

	this.instance_201 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_201.setTransform(745.6,277.1,0.5496,0.5496,0,-78.6411,101.3589,-39.8,-0.6);

	this.instance_202 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_202.setTransform(753.9,236.4,0.5496,0.5496,0,-79.4779,100.5221,-32.4,0.1);

	this.instance_203 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_203.setTransform(790.95,300.85,0.5494,0.5494,0,21.1403,-158.8597,1.2,-45.5);

	this.instance_204 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_204.setTransform(464.35,329.3,0.6475,0.6475,0,77.7595,-102.2405,34.9,0.2);

	this.instance_205 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_205.setTransform(459.8,433.3,0.6474,0.6474,0,99.7016,-80.2984,6,-1.4);

	this.instance_206 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_206.setTransform(456.9,428.45,0.6474,0.6474,0,67.3979,-112.6021,4.7,-8.6);

	this.instance_207 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_207.setTransform(475.2,379.25,0.6475,0.6475,0,110.0056,-69.9944,39.6,-0.6);

	this.instance_208 = new lib.ch1_headcopy("synched",0);
	this.instance_208.setTransform(427.5,292.6,0.6479,0.6479,0,-12.9742,167.0258,1,52.9);

	this.instance_209 = new lib.ch1_uBodycopy("synched",0);
	this.instance_209.setTransform(432,331.1,0.6486,0.6486,0,0,180,-0.4,-23.6);

	this.instance_210 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_210.setTransform(421.35,462.75,0.6472,0.6472,0,17.6447,-162.3553,2.4,-54.2);

	this.instance_211 = new lib.ch1_neckcopy("synched",0);
	this.instance_211.setTransform(430.4,306.5,0.6479,0.6479,0,-9.2145,170.7855,-1.2,9.2);

	this.instance_212 = new lib.ch1_lBodycopy("synched",0);
	this.instance_212.setTransform(430.65,375.35,0.6486,0.6486,0,0,180,-0.1,-22.6);

	this.instance_213 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_213.setTransform(420.55,468.8,0.6469,0.6469,0,-30.7116,149.2884,4.1,-53.3);

	this.instance_214 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_214.setTransform(421.65,406.65,0.6471,0.6471,0,3.3838,-176.6162,-0.5,2.5);

	this.instance_215 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_215.setTransform(382.2,432.55,0.6475,0.6475,0,-90.2916,89.7084,-4,3);

	this.instance_216 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_216.setTransform(377.9,426.6,0.6475,0.6475,0,-109.9967,70.0033,-5.4,7.9);

	this.instance_217 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_217.setTransform(388.1,375.55,0.6475,0.6475,0,-78.6345,101.3655,-39.6,-0.7);

	this.instance_218 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_218.setTransform(397.8,327.6,0.6475,0.6475,0,-79.4728,100.5272,-32.6,-0.2);

	this.instance_219 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_219.setTransform(441.5,403.5,0.6473,0.6473,0,21.1453,-158.8547,1.4,-45.7);

	this.instance_220 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_220.setTransform(348.5,346.85,0.7147,0.7147,0,77.7563,-102.2437,35.4,0.2);

	this.instance_221 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_221.setTransform(343.5,461.75,0.7146,0.7146,0,99.7047,-80.2953,5.9,-1.4);

	this.instance_222 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_222.setTransform(340.3,456.25,0.7146,0.7146,0,67.395,-112.605,5,-8.7);

	this.instance_223 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_223.setTransform(360.6,402.05,0.7147,0.7147,0,110.0081,-69.9919,39.9,-0.5);

	this.instance_224 = new lib.ch1_headcopy("synched",0);
	this.instance_224.setTransform(307.85,306.25,0.7151,0.7151,0,-12.9749,167.0251,1,52.5);

	this.instance_225 = new lib.ch1_uBodycopy("synched",0);
	this.instance_225.setTransform(312.75,348.85,0.7159,0.7159,0,0,180,-0.3,-23.6);

	this.instance_226 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_226.setTransform(301,494.2,0.7144,0.7144,0,17.6477,-162.3523,2.5,-54.1);

	this.instance_227 = new lib.ch1_neckcopy("synched",0);
	this.instance_227.setTransform(311.1,321.7,0.7151,0.7151,0,-9.2167,170.7833,-1.2,9.2);

	this.instance_228 = new lib.ch1_lBodycopy("synched",0);
	this.instance_228.setTransform(311.35,397.6,0.7159,0.7159,0,0,180,-0.1,-23.1);

	this.instance_229 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_229.setTransform(300.2,500.75,0.714,0.714,0,-30.7109,149.2891,4,-53.3);

	this.instance_230 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_230.setTransform(301.45,432.3,0.7142,0.7142,0,3.3867,-176.6133,-0.5,2.6);

	this.instance_231 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_231.setTransform(257.85,460.85,0.7147,0.7147,0,-90.2948,89.7052,-4,3);

	this.instance_232 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_232.setTransform(253.05,454.2,0.7146,0.7146,0,-109.9989,70.0011,-5.9,8);

	this.instance_233 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_233.setTransform(264.4,397.9,0.7147,0.7147,0,-78.6311,101.3689,-40,-0.8);

	this.instance_234 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_234.setTransform(275.1,344.9,0.7147,0.7147,0,-79.4707,100.5293,-32.7,-0.2);

	this.instance_235 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_235.setTransform(323.3,428.9,0.7144,0.7144,0,21.1465,-158.8535,1.4,-45.6);

	this.instance_236 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_236.setTransform(378.95,247.35,0.6964,0.6964,0,96.6524,-83.3476,35.9,-0.5);

	this.instance_237 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_237.setTransform(334.45,351.65,0.6962,0.6962,0,144.8207,-35.1793,6.2,-1.9);

	this.instance_238 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_238.setTransform(335.85,345.8,0.6963,0.6963,0,112.3347,-67.6653,4.5,-9.2);

	this.instance_239 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_239.setTransform(371.45,302.25,0.6963,0.6963,0,130.1144,-49.8856,39.7,0.1);

	this.instance_240 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_240.setTransform(334.05,210.6,0.6968,0.6968,0,-16.1465,163.8531,1.1,53);

	this.instance_241 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_241.setTransform(344.05,249.35,0.6976,0.6976,0,0,180,-0.6,-23.6);

	this.instance_242 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_242.setTransform(362,394.8,0.6962,0.6962,0,-12.7125,167.2875,2.5,-53.5);

	this.instance_243 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_243.setTransform(342.35,223.1,0.6967,0.6967,0,-31.9111,148.0889,-0.8,8.9);

	this.instance_244 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_244.setTransform(342.9,297.05,0.6976,0.6976,0,0,180,-0.7,-22.9);

	this.instance_245 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_245.setTransform(314,394.1,0.696,0.696,0,6.8955,-173.1045,3.8,-53.4);

	this.instance_246 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_246.setTransform(329.1,329.15,0.6959,0.6959,0,15.3889,-164.6111,-1.1,2.6);

	this.instance_247 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_247.setTransform(312.15,357.5,0.6962,0.6962,0,-41.1052,138.8948,-4.3,3.6);

	this.instance_248 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_248.setTransform(312.6,349.6,0.6963,0.6963,0,-67.4363,112.5637,-5.6,8.1);

	this.instance_249 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_249.setTransform(325.6,295.45,0.6963,0.6963,0,-76.623,103.377,-39.5,-1);

	this.instance_250 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_250.setTransform(307.4,245.3,0.6963,0.6963,0,-110.6951,69.3049,-33.4,-0.5);

	this.instance_251 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_251.setTransform(353.1,327.3,0.6963,0.6963,0,-5.2402,174.7598,1.7,-46.4);

	this.instance_252 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_252.setTransform(135.85,379.75,0.7983,0.7983,0,85.0175,-94.9825,35.5,0.1);

	this.instance_253 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_253.setTransform(127.5,512.95,0.7982,0.7982,0,103.4844,-76.5156,6.1,-1.6);

	this.instance_254 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_254.setTransform(129.25,505.95,0.7982,0.7982,0,113.7411,-66.2589,5.4,-8.8);

	this.instance_255 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_255.setTransform(141.2,442.2,0.7984,0.7984,0,100.3922,-79.6078,40.2,-0.2);

	this.instance_256 = new lib.ch1_headcopy2("synched",0);
	this.instance_256.setTransform(90.35,334.6,0.7988,0.7988,0,-10.3989,169.6011,0.6,52.6);

	this.instance_257 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_257.setTransform(95.7,381.75,0.7996,0.7996,0,0,180,-0.2,-23.8);

	this.instance_258 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_258.setTransform(78.9,540.75,0.7979,0.7979,0,11.9249,-168.0751,2.8,-53.9);

	this.instance_259 = new lib.ch1_neckcopy2("synched",0);
	this.instance_259.setTransform(93.8,351.5,0.7988,0.7988,0,-10.178,169.822,-1,8.7);

	this.instance_260 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_260.setTransform(94.35,436.5,0.7996,0.7996,0,0,180,-0.5,-23.1);

	this.instance_261 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_261.setTransform(91.5,548.2,0.7976,0.7976,0,-36.4553,143.5447,3.8,-53.2);

	this.instance_262 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_262.setTransform(77.1,472.6,0.7977,0.7977,0,-7.8045,172.1955,0.1,1.9);

	this.instance_263 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_263.setTransform(41.8,508.7,0.7982,0.7982,0,-60.4471,119.5529,-5.4,3.1);

	this.instance_264 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_264.setTransform(39,500,0.7983,0.7983,0,-84.7361,95.2639,-6,7.7);

	this.instance_265 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_265.setTransform(55.4,437.95,0.7983,0.7983,0,-75.6442,104.3558,-40.1,-0.8);

	this.instance_266 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_266.setTransform(53.35,377.3,0.7983,0.7983,0,-92.6818,87.3182,-33,-0.1);

	this.instance_267 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_267.setTransform(110.25,470.3,0.7979,0.7979,0,26.6626,-153.3374,2.2,-45.4);

	this.instance_268 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_268.setTransform(1230.75,169.7,0.4027,0.4027,0,88.1871,-91.8129,34.8,-0.4);

	this.instance_269 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_269.setTransform(1219.3,235.05,0.4025,0.4025,0,119.182,-60.818,5.8,-2.6);

	this.instance_270 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_270.setTransform(1219.15,231.5,0.4027,0.4027,0,95.8285,-84.1715,4.4,-9.6);

	this.instance_271 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_271.setTransform(1231.05,201.6,0.4026,0.4026,0,112.5987,-67.4013,38.9,0.1);

	this.instance_272 = new lib.ch1_headcopy_1("synched",0);
	this.instance_272.setTransform(1207.95,146.9,0.4029,0.4029,0,-10.9431,169.0569,0.2,53.6);

	this.instance_273 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_273.setTransform(1210.6,170.75,0.4033,0.4033,0,0,180,-0.8,-22.8);

	this.instance_274 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_274.setTransform(1217.25,255.35,0.4026,0.4026,0,-16.7797,163.2203,2.5,-53.7);

	this.instance_275 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_275.setTransform(1209.6,155.55,0.4029,0.4029,0,-9.8123,170.1877,-1.2,9.9);

	this.instance_276 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_276.setTransform(1209.9,198.35,0.4033,0.4033,0,0,180,-0.6,-22.6);

	this.instance_277 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_277.setTransform(1196.1,255.3,0.4025,0.4025,0,11.5694,-168.4306,1.4,-53);

	this.instance_278 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_278.setTransform(1203.9,217.55,0.4024,0.4024,0,14.6976,-165.3024,-1.9,3);

	this.instance_279 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_279.setTransform(1187.75,231.7,0.4026,0.4026,0,-68.849,111.151,-4.4,4.3);

	this.instance_280 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_280.setTransform(1185.2,228.05,0.4027,0.4027,0,-106.4882,73.5118,-5.2,8.1);

	this.instance_281 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_281.setTransform(1197.55,198.1,0.4026,0.4026,0,-68.178,111.822,-39.9,0.7);

	this.instance_282 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_282.setTransform(1189.5,168.35,0.4026,0.4026,0,-106.0015,73.9985,-32.6,0.3);

	this.instance_283 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_283.setTransform(1214.5,216.4,0.4027,0.4027,0,-1.8174,178.1826,1.4,-45.2);

	this.instance_284 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_284.setTransform(1017.85,142.9,0.4445,0.4445,0,88.1823,-91.8177,34.3,-0.2);

	this.instance_285 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_285.setTransform(1005.25,215.05,0.4442,0.4442,0,119.1846,-60.8154,5.2,-2.8);

	this.instance_286 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_286.setTransform(1004.95,211.1,0.4444,0.4444,0,95.8331,-84.1669,3.9,-9.3);

	this.instance_287 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_287.setTransform(1018.25,178.05,0.4444,0.4444,0,112.6034,-67.3966,38.5,0.1);

	this.instance_288 = new lib.ch1_headcopy_1("synched",0);
	this.instance_288.setTransform(992.7,117.75,0.4446,0.4446,0,-10.9459,169.0541,0.4,53.9);

	this.instance_289 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_289.setTransform(995.65,144,0.4451,0.4451,0,0,180,-0.7,-22.6);

	this.instance_290 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_290.setTransform(1002.95,237.4,0.4443,0.4443,0,-16.7846,163.2154,2.6,-53.2);

	this.instance_291 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_291.setTransform(994.45,127.2,0.4447,0.4447,0,-9.8149,170.1851,-1,10.2);

	this.instance_292 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_292.setTransform(994.85,174.5,0.4451,0.4451,0,0,180,-0.6,-22);

	this.instance_293 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_293.setTransform(979.6,237.35,0.4442,0.4442,0,11.5732,-168.4268,1.4,-52.6);

	this.instance_294 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_294.setTransform(988.15,195.65,0.4441,0.4441,0,14.7023,-165.2977,-1.9,3.4);

	this.instance_295 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_295.setTransform(970.4,211.3,0.4444,0.4444,0,-68.8464,111.1536,-4,4.2);

	this.instance_296 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_296.setTransform(967.45,207.2,0.4444,0.4444,0,-106.4937,73.5063,-5,7.8);

	this.instance_297 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_297.setTransform(981.2,174.2,0.4444,0.4444,0,-68.1763,111.8237,-39.4,0.7);

	this.instance_298 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_298.setTransform(972.3,141.45,0.4444,0.4444,0,-106.0054,73.9946,-32.2,0.1);

	this.instance_299 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_299.setTransform(999.9,194.35,0.4445,0.4445,0,-1.8238,178.1762,1.6,-44.9);

	this.instance_300 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_300.setTransform(1088.2,281.25,0.5086,0.5086,0,88.1776,-91.8224,35.1,-0.1);

	this.instance_301 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_301.setTransform(1073.75,363.8,0.5083,0.5083,0,119.1874,-60.8126,5.8,-2.3);

	this.instance_302 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_302.setTransform(1073.45,359.2,0.5085,0.5085,0,95.8367,-84.1633,4.6,-9.1);

	this.instance_303 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_303.setTransform(1088.7,321.45,0.5085,0.5085,0,112.6064,-67.3936,38.8,0.2);

	this.instance_304 = new lib.ch1_headcopy_1("synched",0);
	this.instance_304.setTransform(1059.45,252.45,0.5088,0.5088,0,-10.9504,169.0496,0.4,53.1);

	this.instance_305 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_305.setTransform(1062.85,282.55,0.5094,0.5094,0,0,180,-0.7,-22.9);

	this.instance_306 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_306.setTransform(1071.15,389.35,0.5084,0.5084,0,-16.786,163.214,2.6,-54);

	this.instance_307 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_307.setTransform(1061.45,263.35,0.5088,0.5088,0,-9.8194,170.1806,-1.1,9.5);

	this.instance_308 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_308.setTransform(1061.9,317.35,0.5094,0.5094,0,0,180,-0.5,-22.8);

	this.instance_309 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_309.setTransform(1044.35,389.3,0.5082,0.5082,0,11.5727,-168.4273,1.7,-53.2);

	this.instance_310 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_310.setTransform(1054.3,341.75,0.5082,0.5082,0,14.7068,-165.2932,-1.9,3.4);

	this.instance_311 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_311.setTransform(1033.95,359.5,0.5085,0.5085,0,-68.8432,111.1568,-4.7,3.9);

	this.instance_312 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_312.setTransform(1030.65,354.85,0.5085,0.5085,0,-106.4959,73.5041,-5.2,7.9);

	this.instance_313 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_313.setTransform(1046.3,317.05,0.5085,0.5085,0,-68.1715,111.8285,-39.7,0.5);

	this.instance_314 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_314.setTransform(1036.1,279.5,0.5085,0.5085,0,-106.0103,73.9897,-32.8,0.1);

	this.instance_315 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_315.setTransform(1067.7,340.15,0.5085,0.5085,0,-1.8295,178.1705,1.7,-45.6);

	this.instance_316 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_316.setTransform(53.05,313.3,0.7601,0.7601,0,77.7545,-102.2455,35.6,0.1);

	this.instance_317 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_317.setTransform(47.7,435.5,0.7599,0.7599,0,99.708,-80.292,6.2,-1.4);

	this.instance_318 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_318.setTransform(44.25,429.75,0.76,0.76,0,67.3934,-112.6066,5.2,-8.7);

	this.instance_319 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_319.setTransform(65.75,371.95,0.76,0.76,0,110.0117,-69.9883,40.1,-0.2);

	this.instance_320 = new lib.ch1_headcopy("synched",0);
	this.instance_320.setTransform(9.75,270.25,0.7605,0.7605,0,-12.9786,167.0214,1,52.4);

	this.instance_321 = new lib.ch1_uBodycopy("synched",0);
	this.instance_321.setTransform(14.95,315.45,0.7613,0.7613,0,0,180,-0.2,-23.8);

	this.instance_322 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_322.setTransform(2.55,470,0.7597,0.7597,0,17.6511,-162.3489,3,-54.3);

	this.instance_323 = new lib.ch1_neckcopy("synched",0);
	this.instance_323.setTransform(13.25,286.6,0.7605,0.7605,0,-9.221,170.779,-1.2,8.9);

	this.instance_324 = new lib.ch1_lBodycopy("synched",0);
	this.instance_324.setTransform(13.55,367.5,0.7613,0.7613,0,0,180,-0.1,-23.1);

	this.instance_325 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_325.setTransform(1.7,477.15,0.7594,0.7594,0,-30.7134,149.2866,4,-53.2);

	this.instance_326 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_326.setTransform(2.9,404.2,0.7595,0.7595,0,3.3897,-176.6103,-0.4,2.3);

	this.instance_327 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_327.setTransform(-43.45,434.55,0.76,0.76,0,-90.2979,89.7021,-4.2,2.5);

	this.instance_328 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_328.setTransform(-48.45,427.6,0.76,0.76,0,-110.0005,69.9995,-6,7.6);

	this.instance_329 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_329.setTransform(-36.6,367.6,0.7601,0.7601,0,-78.6287,101.3713,-40.1,-1.4);

	this.instance_330 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_330.setTransform(-25.1,311.25,0.7601,0.7601,0,-79.4663,100.5337,-32.9,-0.8);

	this.instance_331 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_331.setTransform(26.15,400.5,0.7598,0.7598,0,21.1495,-158.8505,1.6,-45.8);

	this.instance_332 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_332.setTransform(-32.15,406.55,0.8463,0.8463,0,85.0155,-94.9845,35.6,0.4);

	this.instance_333 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_333.setTransform(-41,547.7,0.8461,0.8461,0,103.4874,-76.5126,6.1,-1.4);

	this.instance_334 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_334.setTransform(-39.05,540.25,0.8462,0.8462,0,113.7431,-66.2569,5.4,-8.6);

	this.instance_335 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_335.setTransform(-26.25,472.7,0.8464,0.8464,0,100.3959,-79.6041,40.2,-0.1);

	this.instance_336 = new lib.ch1_headcopy2("synched",0);
	this.instance_336.setTransform(-80.25,358.7,0.8468,0.8468,0,-10.4015,169.5985,0.8,52.6);

	this.instance_337 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_337.setTransform(-74.7,408.55,0.8477,0.8477,0,0,180,0.2,-24.1);

	this.instance_338 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_338.setTransform(-92.25,577.15,0.8459,0.8459,0,11.928,-168.072,2.7,-54);

	this.instance_339 = new lib.ch1_neckcopy2("synched",0);
	this.instance_339.setTransform(-76.6,376.5,0.8468,0.8468,0,-10.1812,169.8188,-1,8.6);

	this.instance_340 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_340.setTransform(-76.1,466.6,0.8477,0.8477,0,0,180,-0.1,-23.3);

	this.instance_341 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_341.setTransform(-79,585,0.8455,0.8455,0,-36.4557,143.5443,3.8,-53.5);

	this.instance_342 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_342.setTransform(-94.2,504.95,0.8456,0.8456,0,-7.806,172.194,0.1,1.9);

	this.instance_343 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_343.setTransform(-131.8,543.3,0.8462,0.8462,0,-60.4454,119.5546,-5.2,2.9);

	this.instance_344 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_344.setTransform(-134.65,534,0.8463,0.8463,0,-84.7334,95.2666,-6,7.5);

	this.instance_345 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_345.setTransform(-117.35,468.15,0.8462,0.8462,0,-75.6415,104.3585,-40,-1);

	this.instance_346 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_346.setTransform(-119.25,403.85,0.8463,0.8463,0,-92.6848,87.3152,-33,-0.1);

	this.instance_347 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_347.setTransform(-59.2,502.55,0.8459,0.8459,0,26.6644,-153.3356,2.4,-45.2);

	this.instance_348 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_348.setTransform(184.9,296.95,0.76,0.76,0,77.7565,-102.2435,35.2,0.3);

	this.instance_349 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_349.setTransform(179.6,419.05,0.7599,0.7599,0,99.7073,-80.2927,5.8,-1.5);

	this.instance_350 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_350.setTransform(176.1,413.4,0.7599,0.7599,0,67.3951,-112.6049,4.7,-8.4);

	this.instance_351 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_351.setTransform(197.7,355.6,0.76,0.76,0,110.0103,-69.9897,39.8,-0.4);

	this.instance_352 = new lib.ch1_headcopy("synched",0);
	this.instance_352.setTransform(141.65,253.8,0.7604,0.7604,0,-12.9769,167.0231,1.1,52.7);

	this.instance_353 = new lib.ch1_uBodycopy("synched",0);
	this.instance_353.setTransform(146.85,299.1,0.7613,0.7613,0,0,180,-0.2,-23.4);

	this.instance_354 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_354.setTransform(134.45,453.55,0.7597,0.7597,0,17.6496,-162.3504,2.5,-54);

	this.instance_355 = new lib.ch1_neckcopy("synched",0);
	this.instance_355.setTransform(145.2,270.15,0.7604,0.7604,0,-9.2202,170.7798,-1.2,9.4);

	this.instance_356 = new lib.ch1_lBodycopy("synched",0);
	this.instance_356.setTransform(145.45,351,0.7613,0.7613,0,0,180,-0.1,-22.7);

	this.instance_357 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_357.setTransform(133.5,460.7,0.7593,0.7593,0,-30.713,149.287,4.2,-53.1);

	this.instance_358 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_358.setTransform(134.8,387.75,0.7595,0.7595,0,3.3886,-176.6114,-0.4,2.7);

	this.instance_359 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_359.setTransform(88.45,418.1,0.76,0.76,0,-90.2968,89.7032,-3.8,2.9);

	this.instance_360 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_360.setTransform(83.45,411.2,0.76,0.76,0,-109.9998,70.0002,-5.6,7.9);

	this.instance_361 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_361.setTransform(95.4,351.25,0.76,0.76,0,-78.6303,101.3697,-39.7,-0.8);

	this.instance_362 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_362.setTransform(106.85,294.9,0.76,0.76,0,-79.4673,100.5327,-32.4,-0.2);

	this.instance_363 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_363.setTransform(158.1,384.1,0.7597,0.7597,0,21.1477,-158.8523,1.4,-45.4);

	this.instance_364 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_364.setTransform(245.3,186.35,0.6647,0.6647,0,85.0206,-94.9794,35.1,0.2);

	this.instance_365 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_365.setTransform(238.3,297.35,0.6645,0.6645,0,103.4817,-76.5183,5.6,-1.8);

	this.instance_366 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_366.setTransform(239.9,291.5,0.6646,0.6646,0,113.7382,-66.2618,5,-9.2);

	this.instance_367 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_367.setTransform(249.9,238.35,0.6647,0.6647,0,100.388,-79.612,39.8,-0.5);

	this.instance_368 = new lib.ch1_headcopy2("synched",0);
	this.instance_368.setTransform(207.45,148.9,0.6651,0.6651,0,-10.3962,169.6038,0.5,52.8);

	this.instance_369 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_369.setTransform(211.75,188,0.6658,0.6658,0,0,180,-0.1,-23.4);

	this.instance_370 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_370.setTransform(197.95,320.45,0.6643,0.6643,0,11.9209,-168.0791,2.6,-53.5);

	this.instance_371 = new lib.ch1_neckcopy2("synched",0);
	this.instance_371.setTransform(210.35,162.85,0.665,0.665,0,-10.1747,169.8253,-1.1,8.8);

	this.instance_372 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_372.setTransform(210.75,233.6,0.6658,0.6658,0,0,180,-0.5,-22.6);

	this.instance_373 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_373.setTransform(208.35,326.65,0.664,0.664,0,-36.4544,143.5456,4.1,-52.8);

	this.instance_374 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_374.setTransform(196.6,263.75,0.6642,0.6642,0,-7.8034,172.1966,-0.1,2.5);

	this.instance_375 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_375.setTransform(167,293.8,0.6646,0.6646,0,-60.4472,119.5528,-5,3.4);

	this.instance_376 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_376.setTransform(164.8,286.55,0.6647,0.6647,0,-84.7407,95.2593,-5.5,7.9);

	this.instance_377 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_377.setTransform(178.25,234.85,0.6646,0.6646,0,-75.6476,104.3524,-39.6,-0.7);

	this.instance_378 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_378.setTransform(176.7,184.35,0.6647,0.6647,0,-92.679,87.321,-32.5,-0.1);

	this.instance_379 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_379.setTransform(224.05,261.8,0.6643,0.6643,0,26.6586,-153.3414,1.8,-45);

	this.instance_380 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_380.setTransform(648.6,119.95,0.4548,0.4548,0,96.6427,-83.3573,35.7,-0.6);

	this.instance_381 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_381.setTransform(619.55,188.1,0.4546,0.4546,0,144.8233,-35.1767,6.5,-2.2);

	this.instance_382 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_382.setTransform(620.55,184.25,0.4547,0.4547,0,112.3281,-67.6719,4.9,-9.7);

	this.instance_383 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_383.setTransform(643.6,155.9,0.4547,0.4547,0,130.1118,-49.8882,39.6,0.1);

	this.instance_384 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_384.setTransform(619.25,95.95,0.455,0.455,0,-16.1383,163.8617,0.9,53.4);

	this.instance_385 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_385.setTransform(625.8,121.25,0.4556,0.4556,0,0,180,-0.7,-23.4);

	this.instance_386 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_386.setTransform(637.5,216.25,0.4547,0.4547,0,-12.7038,167.2962,2.6,-53.6);

	this.instance_387 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_387.setTransform(624.6,104.1,0.455,0.455,0,-31.9062,148.0938,-0.8,9.2);

	this.instance_388 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_388.setTransform(624.95,152.35,0.4556,0.4556,0,0,180,-0.6,-22.9);

	this.instance_389 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_389.setTransform(606.15,215.8,0.4545,0.4545,0,6.8872,-173.1128,3.4,-53.2);

	this.instance_390 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_390.setTransform(616,173.3,0.4545,0.4545,0,15.3828,-164.6172,-1.4,2.5);

	this.instance_391 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_391.setTransform(605.05,191.85,0.4547,0.4547,0,-41.1029,138.8971,-4.7,4);

	this.instance_392 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_392.setTransform(605.35,186.7,0.4547,0.4547,0,-67.4442,112.5558,-5.9,8.4);

	this.instance_393 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_393.setTransform(613.8,151.35,0.4548,0.4548,0,-76.631,103.369,-39.4,-0.6);

	this.instance_394 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_394.setTransform(601.8,118.65,0.4548,0.4548,0,-110.6904,69.3096,-33,-0.5);

	this.instance_395 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_395.setTransform(631.65,172.2,0.4548,0.4548,0,-5.2322,174.7678,1.8,-46.2);

	this.instance_396 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_396.setTransform(521.55,253.7,0.5932,0.5932,0,77.7623,-102.2377,35.1,0.2);

	this.instance_397 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_397.setTransform(517.4,348.9,0.5931,0.5931,0,99.7005,-80.2995,5.9,-1.6);

	this.instance_398 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_398.setTransform(514.65,344.45,0.5932,0.5932,0,67.4002,-112.5998,4.8,-8.7);

	this.instance_399 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_399.setTransform(531.55,299.3,0.5932,0.5932,0,110.0025,-69.9975,40,-0.6);

	this.instance_400 = new lib.ch1_headcopy("synched",0);
	this.instance_400.setTransform(487.75,219.9,0.5936,0.5936,0,-12.9699,167.0301,0.9,52.7);

	this.instance_401 = new lib.ch1_uBodycopy("synched",0);
	this.instance_401.setTransform(491.9,255.25,0.5943,0.5943,0,0,180,-0.4,-23.6);

	this.instance_402 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_402.setTransform(482.25,376,0.593,0.593,0,17.6414,-162.3586,2,-54);

	this.instance_403 = new lib.ch1_neckcopy("synched",0);
	this.instance_403.setTransform(490.4,232.65,0.5936,0.5936,0,-9.2141,170.7859,-1.2,9.2);

	this.instance_404 = new lib.ch1_lBodycopy("synched",0);
	this.instance_404.setTransform(490.7,295.85,0.5943,0.5943,0,0,180,-0.2,-22.8);

	this.instance_405 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_405.setTransform(481.45,381.4,0.5927,0.5927,0,-30.7093,149.2907,4,-53.2);

	this.instance_406 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_406.setTransform(482.4,324.5,0.5929,0.5929,0,3.3805,-176.6195,-0.6,2.6);

	this.instance_407 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_407.setTransform(446.25,348.3,0.5933,0.5933,0,-90.2888,89.7112,-3.7,3);

	this.instance_408 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_408.setTransform(442.3,342.85,0.5932,0.5932,0,-109.9956,70.0044,-5.5,8);

	this.instance_409 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_409.setTransform(451.7,295.95,0.5933,0.5933,0,-78.636,101.364,-40,-0.7);

	this.instance_410 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_410.setTransform(460.6,252.1,0.5932,0.5932,0,-79.4762,100.5238,-32.4,0);

	this.instance_411 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_411.setTransform(500.7,321.7,0.593,0.593,0,21.1422,-158.8578,1.2,-45.6);

	this.instance_412 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_412.setTransform(580.5,190.35,0.5464,0.5464,0,88.171,-91.829,34.9,0.1);

	this.instance_413 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_413.setTransform(565,279.1,0.5461,0.5461,0,119.1919,-60.8081,5.5,-2.3);

	this.instance_414 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_414.setTransform(564.7,274.15,0.5464,0.5464,0,95.8429,-84.1571,4.6,-9.1);

	this.instance_415 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_415.setTransform(580.95,233.55,0.5463,0.5463,0,112.6106,-67.3894,39,0.6);

	this.instance_416 = new lib.ch1_headcopy_1("synched",0);
	this.instance_416.setTransform(549.55,159.45,0.5467,0.5467,0,-10.9561,169.0439,0.7,53.4);

	this.instance_417 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_417.setTransform(553.3,191.7,0.5473,0.5473,0,0,180,-0.6,-23.3);

	this.instance_418 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_418.setTransform(562.2,306.45,0.5463,0.5463,0,-16.7914,163.2086,2.9,-53.8);

	this.instance_419 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_419.setTransform(551.85,171.1,0.5467,0.5467,0,-9.8241,170.1759,-1,9.7);

	this.instance_420 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_420.setTransform(552.15,229.15,0.5473,0.5473,0,0,180,-0.2,-22.5);

	this.instance_421 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_421.setTransform(533.45,306.45,0.5461,0.5461,0,11.5822,-168.4178,1.9,-53.2);

	this.instance_422 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_422.setTransform(544,255.1,0.546,0.546,0,14.7097,-165.2903,-1.4,2.6);

	this.instance_423 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_423.setTransform(522.25,274.45,0.5463,0.5463,0,-68.839,111.161,-4.4,3.8);

	this.instance_424 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_424.setTransform(518.8,269.45,0.5464,0.5464,0,-106.5002,73.4998,-5.5,8);

	this.instance_425 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_425.setTransform(535.5,228.8,0.5463,0.5463,0,-68.1686,111.8314,-40,0.2);

	this.instance_426 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_426.setTransform(524.5,188.5,0.5463,0.5463,0,-106.0153,73.9847,-33,-0.1);

	this.instance_427 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_427.setTransform(558.45,253.65,0.5464,0.5464,0,-1.8356,178.1644,1.9,-45.4);

	this.instance_428 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_428.setTransform(467,139.3,0.5105,0.5105,0,85.0271,-94.9729,35.2,0);

	this.instance_429 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_429.setTransform(461.65,224.4,0.5103,0.5103,0,103.4757,-76.5243,5.9,-1.8);

	this.instance_430 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_430.setTransform(462.95,220.35,0.5104,0.5104,0,113.7355,-66.2645,4.8,-9.7);

	this.instance_431 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_431.setTransform(470.6,179.15,0.5105,0.5105,0,100.3866,-79.6134,40.1,-0.6);

	this.instance_432 = new lib.ch1_headcopy2("synched",0);
	this.instance_432.setTransform(438.1,110.45,0.5108,0.5108,0,-10.3935,169.6065,0.1,53);

	this.instance_433 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_433.setTransform(441.3,140.55,0.5113,0.5113,0,0,180,-0.3,-23.7);

	this.instance_434 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_434.setTransform(430.65,242.3,0.5102,0.5102,0,11.9142,-168.0858,2.5,-53.6);

	this.instance_435 = new lib.ch1_neckcopy2("synched",0);
	this.instance_435.setTransform(440.2,121.2,0.5108,0.5108,0,-10.1715,169.8285,-1.2,9);

	this.instance_436 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_436.setTransform(440.45,175.75,0.5113,0.5113,0,0,180,-0.6,-22.4);

	this.instance_437 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_437.setTransform(438.9,247.15,0.5099,0.5099,0,-36.4533,143.5467,3.6,-52.4);

	this.instance_438 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_438.setTransform(429.55,198.7,0.5101,0.5101,0,-7.7987,172.2013,-0.1,2.5);

	this.instance_439 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_439.setTransform(406.9,221.8,0.5104,0.5104,0,-60.4512,119.5488,-4.9,3.6);

	this.instance_440 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_440.setTransform(405.5,216.2,0.5105,0.5105,0,-84.7473,95.2527,-5.6,8.7);

	this.instance_441 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_441.setTransform(415.55,176.8,0.5104,0.5104,0,-75.6526,104.3474,-39.2,-0.4);

	this.instance_442 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_442.setTransform(414.55,137.85,0.5105,0.5105,0,-92.6727,87.3273,-32.5,0.5);

	this.instance_443 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_443.setTransform(450.7,197.15,0.5102,0.5102,0,26.6578,-153.3422,1.7,-45.3);

	this.instance_444 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_444.setTransform(740.85,165.35,0.5105,0.5105,0,85.0286,-94.9714,34.6,-0.5);

	this.instance_445 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_445.setTransform(735.5,250.4,0.5103,0.5103,0,103.4749,-76.5251,5.9,-1.8);

	this.instance_446 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_446.setTransform(736.75,246.1,0.5103,0.5103,0,113.7346,-66.2654,5.4,-10.1);

	this.instance_447 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_447.setTransform(744.45,205.15,0.5105,0.5105,0,100.3856,-79.6144,40.1,-0.6);

	this.instance_448 = new lib.ch1_headcopy2("synched",0);
	this.instance_448.setTransform(711.95,136.4,0.5108,0.5108,0,-10.3924,169.6076,0.1,53);

	this.instance_449 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_449.setTransform(715.15,166.55,0.5113,0.5113,0,0,180,-0.3,-23.4);

	this.instance_450 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_450.setTransform(704.5,268.3,0.5102,0.5102,0,11.9132,-168.0868,2.5,-53.6);

	this.instance_451 = new lib.ch1_neckcopy2("synched",0);
	this.instance_451.setTransform(714.05,147.2,0.5107,0.5107,0,-10.1701,169.8299,-1.2,9);

	this.instance_452 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_452.setTransform(714.3,201.65,0.5113,0.5113,0,0,180,-0.6,-22.3);

	this.instance_453 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_453.setTransform(712.55,273.1,0.5099,0.5099,0,-36.4526,143.5474,3.6,-52.2);

	this.instance_454 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_454.setTransform(703.45,224.7,0.5101,0.5101,0,-7.7973,172.2027,-0.1,3);

	this.instance_455 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_455.setTransform(680.75,247.85,0.5103,0.5103,0,-60.451,119.549,-4.5,3.8);

	this.instance_456 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_456.setTransform(679.1,242.2,0.5105,0.5105,0,-84.7487,95.2513,-5.1,8.2);

	this.instance_457 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_457.setTransform(689.4,202.55,0.5104,0.5104,0,-75.6555,104.3445,-39.2,-0.4);

	this.instance_458 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_458.setTransform(688.15,163.8,0.5105,0.5105,0,-92.6711,87.3289,-32.6,0.1);

	this.instance_459 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_459.setTransform(724.55,223.15,0.5101,0.5101,0,26.6563,-153.3437,1.7,-45.3);

	this.instance_460 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_460.setTransform(861.1,150.2,0.4672,0.4672,0,96.6417,-83.3583,35.6,-0.5);

	this.instance_461 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_461.setTransform(831.25,220.35,0.4669,0.4669,0,144.8251,-35.1749,6.2,-2.6);

	this.instance_462 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_462.setTransform(832.25,216.2,0.4671,0.4671,0,112.3287,-67.6713,4.7,-9.7);

	this.instance_463 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_463.setTransform(856.05,187,0.467,0.467,0,130.1126,-49.8874,40,-0.1);

	this.instance_464 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_464.setTransform(830.9,125.55,0.4674,0.4674,0,-16.1358,163.8632,1.1,53.6);

	this.instance_465 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_465.setTransform(837.7,151.6,0.468,0.468,0,0,180,-0.8,-23.2);

	this.instance_466 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_466.setTransform(849.7,249.05,0.467,0.467,0,-12.7004,167.2996,2.5,-53.7);

	this.instance_467 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_467.setTransform(836.5,134,0.4674,0.4674,0,-31.9076,148.0924,-0.8,9.6);

	this.instance_468 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_468.setTransform(836.9,183.55,0.468,0.468,0,0,180,-0.8,-22.7);

	this.instance_469 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_469.setTransform(817.55,248.6,0.4669,0.4669,0,6.8869,-173.1131,3.4,-53.3);

	this.instance_470 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_470.setTransform(827.7,205,0.4668,0.4668,0,15.3804,-164.6196,-1.6,2.4);

	this.instance_471 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_471.setTransform(816.3,224.05,0.467,0.467,0,-41.1053,138.8947,-4.7,3.8);

	this.instance_472 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_472.setTransform(816.55,218.8,0.4671,0.4671,0,-67.4439,112.5561,-5.5,8.4);

	this.instance_473 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_473.setTransform(825.4,182.5,0.4671,0.4671,0,-76.6333,103.3667,-39.2,-0.6);

	this.instance_474 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_474.setTransform(813.1,148.8,0.4671,0.4671,0,-110.6895,69.3105,-33,-0.4);

	this.instance_475 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_475.setTransform(843.75,203.85,0.4671,0.4671,0,-5.229,174.771,1.7,-45.9);

	this.instance_476 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_476.setTransform(1160.95,93.85,0.3987,0.3987,0,96.6363,-83.3637,34.9,-1.4);

	this.instance_477 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_477.setTransform(1135.5,153.75,0.3985,0.3985,0,144.8295,-35.1705,5.9,-3.4);

	this.instance_478 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_478.setTransform(1136.3,150.25,0.3986,0.3986,0,112.3219,-67.6781,4.6,-9.9);

	this.instance_479 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_479.setTransform(1156.65,125.35,0.3986,0.3986,0,130.1119,-49.8881,39.2,-0.8);

	this.instance_480 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_480.setTransform(1135.3,72.85,0.3989,0.3989,0,-16.1293,163.8701,0.7,53.8);

	this.instance_481 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_481.setTransform(1141.05,95.05,0.3994,0.3994,0,0,180,-1.7,-22.4);

	this.instance_482 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_482.setTransform(1151.25,178.3,0.3986,0.3986,0,-12.6972,167.3028,2.2,-53.5);

	this.instance_483 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_483.setTransform(1140.05,80,0.3989,0.3989,0,-31.9043,148.0957,-1,9.8);

	this.instance_484 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_484.setTransform(1140.35,122.3,0.3994,0.3994,0,0,180,-1.8,-22.6);

	this.instance_485 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_485.setTransform(1123.85,177.9,0.3985,0.3985,0,6.8815,-173.1185,3.2,-53.2);

	this.instance_486 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_486.setTransform(1132.5,140.6,0.3984,0.3984,0,15.3748,-164.6252,-1.8,2.4);

	this.instance_487 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_487.setTransform(1122.75,156.9,0.3986,0.3986,0,-41.1011,138.8989,-4.3,4.6);

	this.instance_488 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_488.setTransform(1122.9,152.45,0.3986,0.3986,0,-67.45,112.55,-4.6,8.8);

	this.instance_489 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_489.setTransform(1130.5,121.45,0.3987,0.3987,0,-76.6366,103.3634,-38.4,-0.2);

	this.instance_490 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_490.setTransform(1120,92.75,0.3986,0.3986,0,-110.6867,69.3133,-31.9,-0.6);

	this.instance_491 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_491.setTransform(1146.15,139.8,0.3987,0.3987,0,-5.2216,174.7784,1,-44.8);

	this.instance_492 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_492.setTransform(1105.25,151.95,0.418,0.418,0,77.7725,-102.2275,34,0.1);

	this.instance_493 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_493.setTransform(1102.3,219.2,0.4179,0.4179,0,99.6876,-80.3124,4.5,-2.2);

	this.instance_494 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_494.setTransform(1100.35,215.95,0.418,0.418,0,67.4073,-112.5927,3.6,-8.6);

	this.instance_495 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_495.setTransform(1112.35,184.2,0.418,0.418,0,109.9915,-70.0085,39.1,-1.3);

	this.instance_496 = new lib.ch1_headcopy("synched",0);
	this.instance_496.setTransform(1081.45,128.3,0.4183,0.4183,0,-12.9609,167.0391,0.8,54.1);

	this.instance_497 = new lib.ch1_uBodycopy("synched",0);
	this.instance_497.setTransform(1084.45,153.05,0.4187,0.4187,0,0,180,-1,-22.4);

	this.instance_498 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_498.setTransform(1077.55,238.15,0.4178,0.4178,0,17.6309,-162.3691,1.4,-53.1);

	this.instance_499 = new lib.ch1_neckcopy("synched",0);
	this.instance_499.setTransform(1083.4,137.2,0.4182,0.4182,0,-9.2036,170.7964,-1.4,10.6);

	this.instance_500 = new lib.ch1_lBodycopy("synched",0);
	this.instance_500.setTransform(1083.6,181.75,0.4187,0.4187,0,0,180,-0.7,-21.5);

	this.instance_501 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_501.setTransform(1077.05,242.05,0.4176,0.4176,0,-30.7052,149.2948,4.2,-52);

	this.instance_502 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_502.setTransform(1077.7,201.95,0.4177,0.4177,0,3.3652,-176.6348,-1.1,3.6);

	this.instance_503 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_503.setTransform(1052.15,218.7,0.4181,0.4181,0,-90.2761,89.7239,-2.5,3.5);

	this.instance_504 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_504.setTransform(1049.45,214.9,0.418,0.418,0,-109.9836,70.0164,-4,7.9);

	this.instance_505 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_505.setTransform(1056.05,181.85,0.418,0.418,0,-78.6466,101.3534,-38.8,0);

	this.instance_506 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_506.setTransform(1062.35,150.85,0.418,0.418,0,-79.4851,100.5149,-31.5,0.5);

	this.instance_507 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_507.setTransform(1090.55,199.85,0.4178,0.4178,0,21.1362,-158.8638,0.7,-44.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_507},{t:this.instance_506},{t:this.instance_505},{t:this.instance_504},{t:this.instance_503},{t:this.instance_502},{t:this.instance_501},{t:this.instance_500},{t:this.instance_499},{t:this.instance_498},{t:this.instance_497},{t:this.instance_496},{t:this.instance_495},{t:this.instance_494},{t:this.instance_493},{t:this.instance_492},{t:this.instance_491},{t:this.instance_490},{t:this.instance_489},{t:this.instance_488},{t:this.instance_487},{t:this.instance_486},{t:this.instance_485},{t:this.instance_484},{t:this.instance_483},{t:this.instance_482},{t:this.instance_481},{t:this.instance_480},{t:this.instance_479},{t:this.instance_478},{t:this.instance_477},{t:this.instance_476},{t:this.instance_475},{t:this.instance_474},{t:this.instance_473},{t:this.instance_472},{t:this.instance_471},{t:this.instance_470},{t:this.instance_469},{t:this.instance_468},{t:this.instance_467},{t:this.instance_466},{t:this.instance_465},{t:this.instance_464},{t:this.instance_463},{t:this.instance_462},{t:this.instance_461},{t:this.instance_460},{t:this.instance_459},{t:this.instance_458},{t:this.instance_457},{t:this.instance_456},{t:this.instance_455},{t:this.instance_454},{t:this.instance_453},{t:this.instance_452},{t:this.instance_451},{t:this.instance_450},{t:this.instance_449},{t:this.instance_448},{t:this.instance_447},{t:this.instance_446},{t:this.instance_445},{t:this.instance_444},{t:this.instance_443},{t:this.instance_442},{t:this.instance_441},{t:this.instance_440},{t:this.instance_439},{t:this.instance_438},{t:this.instance_437},{t:this.instance_436},{t:this.instance_435},{t:this.instance_434},{t:this.instance_433},{t:this.instance_432},{t:this.instance_431},{t:this.instance_430},{t:this.instance_429},{t:this.instance_428},{t:this.instance_427},{t:this.instance_426},{t:this.instance_425},{t:this.instance_424},{t:this.instance_423},{t:this.instance_422},{t:this.instance_421},{t:this.instance_420},{t:this.instance_419},{t:this.instance_418},{t:this.instance_417},{t:this.instance_416},{t:this.instance_415},{t:this.instance_414},{t:this.instance_413},{t:this.instance_412},{t:this.instance_411},{t:this.instance_410},{t:this.instance_409},{t:this.instance_408},{t:this.instance_407},{t:this.instance_406},{t:this.instance_405},{t:this.instance_404},{t:this.instance_403},{t:this.instance_402},{t:this.instance_401},{t:this.instance_400},{t:this.instance_399},{t:this.instance_398},{t:this.instance_397},{t:this.instance_396},{t:this.instance_395},{t:this.instance_394},{t:this.instance_393},{t:this.instance_392},{t:this.instance_391},{t:this.instance_390},{t:this.instance_389},{t:this.instance_388},{t:this.instance_387},{t:this.instance_386},{t:this.instance_385},{t:this.instance_384},{t:this.instance_383},{t:this.instance_382},{t:this.instance_381},{t:this.instance_380},{t:this.instance_379},{t:this.instance_378},{t:this.instance_377},{t:this.instance_376},{t:this.instance_375},{t:this.instance_374},{t:this.instance_373},{t:this.instance_372},{t:this.instance_371},{t:this.instance_370},{t:this.instance_369},{t:this.instance_368},{t:this.instance_367},{t:this.instance_366},{t:this.instance_365},{t:this.instance_364},{t:this.instance_363},{t:this.instance_362},{t:this.instance_361},{t:this.instance_360},{t:this.instance_359},{t:this.instance_358},{t:this.instance_357},{t:this.instance_356},{t:this.instance_355},{t:this.instance_354},{t:this.instance_353},{t:this.instance_352},{t:this.instance_351},{t:this.instance_350},{t:this.instance_349},{t:this.instance_348},{t:this.instance_347},{t:this.instance_346},{t:this.instance_345},{t:this.instance_344},{t:this.instance_343},{t:this.instance_342},{t:this.instance_341},{t:this.instance_340},{t:this.instance_339},{t:this.instance_338},{t:this.instance_337},{t:this.instance_336},{t:this.instance_335},{t:this.instance_334},{t:this.instance_333},{t:this.instance_332},{t:this.instance_331},{t:this.instance_330},{t:this.instance_329},{t:this.instance_328},{t:this.instance_327},{t:this.instance_326},{t:this.instance_325},{t:this.instance_324},{t:this.instance_323},{t:this.instance_322},{t:this.instance_321},{t:this.instance_320},{t:this.instance_319},{t:this.instance_318},{t:this.instance_317},{t:this.instance_316},{t:this.instance_315},{t:this.instance_314},{t:this.instance_313},{t:this.instance_312},{t:this.instance_311},{t:this.instance_310},{t:this.instance_309},{t:this.instance_308},{t:this.instance_307},{t:this.instance_306},{t:this.instance_305},{t:this.instance_304},{t:this.instance_303},{t:this.instance_302},{t:this.instance_301},{t:this.instance_300},{t:this.instance_299},{t:this.instance_298},{t:this.instance_297},{t:this.instance_296},{t:this.instance_295},{t:this.instance_294},{t:this.instance_293},{t:this.instance_292},{t:this.instance_291},{t:this.instance_290},{t:this.instance_289},{t:this.instance_288},{t:this.instance_287},{t:this.instance_286},{t:this.instance_285},{t:this.instance_284},{t:this.instance_283},{t:this.instance_282},{t:this.instance_281},{t:this.instance_280},{t:this.instance_279},{t:this.instance_278},{t:this.instance_277},{t:this.instance_276},{t:this.instance_275},{t:this.instance_274},{t:this.instance_273},{t:this.instance_272},{t:this.instance_271},{t:this.instance_270},{t:this.instance_269},{t:this.instance_268},{t:this.instance_267},{t:this.instance_266},{t:this.instance_265},{t:this.instance_264},{t:this.instance_263},{t:this.instance_262},{t:this.instance_261},{t:this.instance_260},{t:this.instance_259},{t:this.instance_258},{t:this.instance_257},{t:this.instance_256},{t:this.instance_255},{t:this.instance_254},{t:this.instance_253},{t:this.instance_252},{t:this.instance_251},{t:this.instance_250},{t:this.instance_249},{t:this.instance_248},{t:this.instance_247},{t:this.instance_246},{t:this.instance_245},{t:this.instance_244},{t:this.instance_243},{t:this.instance_242},{t:this.instance_241},{t:this.instance_240},{t:this.instance_239},{t:this.instance_238},{t:this.instance_237},{t:this.instance_236},{t:this.instance_235},{t:this.instance_234},{t:this.instance_233},{t:this.instance_232},{t:this.instance_231},{t:this.instance_230},{t:this.instance_229},{t:this.instance_228},{t:this.instance_227},{t:this.instance_226},{t:this.instance_225},{t:this.instance_224},{t:this.instance_223},{t:this.instance_222},{t:this.instance_221},{t:this.instance_220},{t:this.instance_219},{t:this.instance_218},{t:this.instance_217},{t:this.instance_216},{t:this.instance_215},{t:this.instance_214},{t:this.instance_213},{t:this.instance_212},{t:this.instance_211},{t:this.instance_210},{t:this.instance_209},{t:this.instance_208},{t:this.instance_207},{t:this.instance_206},{t:this.instance_205},{t:this.instance_204},{t:this.instance_203},{t:this.instance_202},{t:this.instance_201},{t:this.instance_200},{t:this.instance_199},{t:this.instance_198},{t:this.instance_197},{t:this.instance_196},{t:this.instance_195},{t:this.instance_194},{t:this.instance_193},{t:this.instance_192},{t:this.instance_191},{t:this.instance_190},{t:this.instance_189},{t:this.instance_188},{t:this.instance_187},{t:this.instance_186},{t:this.instance_185},{t:this.instance_184},{t:this.instance_183},{t:this.instance_182},{t:this.instance_181},{t:this.instance_180},{t:this.instance_179},{t:this.instance_178},{t:this.instance_177},{t:this.instance_176},{t:this.instance_175},{t:this.instance_174},{t:this.instance_173},{t:this.instance_172},{t:this.instance_171},{t:this.instance_170},{t:this.instance_169},{t:this.instance_168},{t:this.instance_167},{t:this.instance_166},{t:this.instance_165},{t:this.instance_164},{t:this.instance_163},{t:this.instance_162},{t:this.instance_161},{t:this.instance_160},{t:this.instance_159},{t:this.instance_158},{t:this.instance_157},{t:this.instance_156},{t:this.instance_155},{t:this.instance_154},{t:this.instance_153},{t:this.instance_152},{t:this.instance_151},{t:this.instance_150},{t:this.instance_149},{t:this.instance_148},{t:this.instance_147},{t:this.instance_146},{t:this.instance_145},{t:this.instance_144},{t:this.instance_143},{t:this.instance_142},{t:this.instance_141},{t:this.instance_140},{t:this.instance_139},{t:this.instance_138},{t:this.instance_137},{t:this.instance_136},{t:this.instance_135},{t:this.instance_134},{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_123},{t:this.instance_122},{t:this.instance_121},{t:this.instance_120},{t:this.instance_119},{t:this.instance_118},{t:this.instance_117},{t:this.instance_116},{t:this.instance_115},{t:this.instance_114},{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101},{t:this.instance_100},{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94},{t:this.instance_93},{t:this.instance_92},{t:this.instance_91},{t:this.instance_90},{t:this.instance_89},{t:this.instance_88},{t:this.instance_87},{t:this.instance_86},{t:this.instance_85},{t:this.instance_84},{t:this.instance_83},{t:this.instance_82},{t:this.instance_81},{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65},{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12}]}).wait(251));

	// Background
	this.instance_508 = new lib.Chap3Scene3();

	this.timeline.addTween(cjs.Tween.get(this.instance_508).wait(251));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(476.2,267.8,1715.8,1762.2);
// library properties:
lib.properties = {
	id: 'A6F1A483617F544186FFC32FE4892FD2',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/LessonChapter3_04_atlas_1.png?1655397314590", id:"LessonChapter3_04_atlas_1"},
		{src:"images/LessonChapter3_04_atlas_2.png?1655397314590", id:"LessonChapter3_04_atlas_2"},
		{src:"images/LessonChapter3_04_atlas_3.png?1655397314591", id:"LessonChapter3_04_atlas_3"},
		{src:"images/LessonChapter3_04_atlas_4.png?1655397314591", id:"LessonChapter3_04_atlas_4"},
		{src:"sounds/AfterWar204wav.mp3?1655397314797", id:"AfterWar204wav"},
		{src:"sounds/AfterWar205wav.mp3?1655397314797", id:"AfterWar205wav"},
		{src:"sounds/popsound.mp3?1655397314797", id:"popsound"}
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