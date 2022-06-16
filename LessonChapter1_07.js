(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter1_07_atlas_1", frames: [[230,1868,132,102],[562,1852,133,102],[1282,0,330,317],[1781,990,228,432],[1124,1424,331,292],[1614,0,330,317],[664,1124,228,432],[562,1558,331,292],[1282,319,330,317],[332,1434,228,432],[1457,1424,317,265],[1614,319,330,317],[0,1443,228,432],[0,1124,330,317],[894,1124,228,432],[1457,1691,317,265],[1453,1124,315,292],[332,1124,330,308],[1124,1124,327,292],[895,1558,175,145],[1072,1718,175,144],[895,1705,175,145],[1249,1718,175,144],[0,990,1779,132],[0,722,1914,266],[364,1868,91,87],[562,1434,91,88],[0,0,1280,720]]}
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



(lib.CachedBmp_710 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_709 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_708 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_716 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_715 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_705 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_714 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_703 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_702 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_713 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_700 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_699 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_712 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_697 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_711 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_695 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_694 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_693 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_692 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_691 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_690 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_689 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_688 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_687 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_686 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.Chap1Scene7 = function() {
	this.initialize(ss["LessonChapter1_07_atlas_1"]);
	this.gotoAndStop(27);
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
	this.instance = new lib.CachedBmp_709();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_710();
	this.instance_1.setTransform(-33.05,-28.15,0.4875,0.4875);

	this.instance_2 = new lib.CompoundPath();
	this.instance_2.setTransform(-159.75,-154.3,3.5007,3.5007);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-159.7,-154.3,318.5,304.6);


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
	this.shape.graphics.f("#2B241C").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
	this.shape.setTransform(-3.639,-3.9012);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37,-90.1,66.8,172.39999999999998);


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
	this.shape.graphics.f("#2B241C").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
	this.shape.setTransform(-10.939,45.1488);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.3,-41,66.8,172.4);


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
	this.instance = new lib.CachedBmp_708();
	this.instance.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,165,158.5);


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

	// flash0_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2B241C").s().p("AEqDnIqVg8QhOgIg0g5Qg1g5AAhNQAAhPA4g4QA4g5BPgBIKVgKQBjgBBHBFQBHBFAABiQgBBkhJBEQhCA8hVAAIgYgBg");
	this.shape.setTransform(-7.6,10.9264);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.2,-12.2,109.30000000000001,46.3);


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
	this.shape.graphics.f("#2B241C").s().p("AnYCsQhJhEgBhkQAAhiBHhFQBHhFBjABIKVAKQBPABA4A5QA3A4AABPQAABNg0A5Qg1A5hNAIIqVA8IgYABQhVAAhCg8g");
	this.shape.setTransform(6.05,15.6264);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-7.5,109.30000000000001,46.3);


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
	this.shape.setTransform(-5.45,12.9,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-9.2,22.299999999999997,27.2);


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
	this.shape.graphics.f("#2B241C").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape.setTransform(-0.4374,-21.3926,0.5879,0.5879);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1810").s().p("AAQF8QgTgBgKgLQgMgOAAgdQAAiogkjTIg9lFIDFAAIgHKfQA+AegHAfQgDAMgPAHQgOAIgTAAg");
	this.shape_1.setTransform(0.8902,22.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.8,-86.3,64.8,147.3);


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
	this.shape.graphics.f("#2B241C").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape.setTransform(-1.3874,-21.3426,0.5879,0.5879);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1810").s().p("AAQF8QgTgBgKgLQgMgOAAgdQAAiogkjTIg9lFIDFAAIgHKfQA+AegHAfQgDAMgPAHQgOAIgTAAg");
	this.shape_1.setTransform(-0.0598,23.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.8,-86.2,64.9,147.2);


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

	// flash0_ai
	this.instance = new lib.CachedBmp_716();
	this.instance.setTransform(-56.95,-12.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.9,-12.2,114,216);


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

	// flash0_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2B241C").s().p("AEUDHIrkgfIAAlDILmgrQBZgDA0A+QAuA2AABLQACBQg4BAQg4BBhMAAIgDAAg");
	this.shape.setTransform(13.6784,8.3188);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_1.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-11.5,108.5,39.7);


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
	this.shape.graphics.f("#2B241C").s().p("AmaCGQg4hAAChQQAAhLAug2QA0g+BZADILmArIAAFDIrkAfIgDAAQhMAAg4hBg");
	this.shape.setTransform(-13.6284,12.5688);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_1.setTransform(0.0758,4.22,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.1,-7.3,108.5,39.8);


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
	this.instance = new lib.CachedBmp_715();
	this.instance.setTransform(-78.3,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.3,-67.4,165.5,146);


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
	this.shape.graphics.f("#7C6253").s().p("AjBBrQgOgMgBgjQAAgiALgmQAMgoAUgaQAWgeAYgBIBFgDQAzgCAmACQBxAHAhAsQBABXhuAVQggAGg/ACQg9ADgNACQgUAEgaANIgsAXQgdAOgUAAQgOAAgKgHg");
	this.shape.setTransform(14.8,-0.3,1,1,0,0,0,14.8,-0.3);

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
	this.shape.setTransform(-12.5,7.9,0.5738,0.5738,0,0,0,-26.2,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.2,-3.8,41.599999999999994,22.8);


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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4F1006").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
	this.shape_1.setTransform(-3.639,-3.9012);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37,-90.1,66.8,172.39999999999998);


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
	this.shape_1.graphics.f("#4F1006").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
	this.shape_1.setTransform(-10.939,45.1488);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.3,-41,66.8,172.4);


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
	this.instance_1 = new lib.CachedBmp_705();
	this.instance_1.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,165,158.5);


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

	// flash0_ai
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4F1006").s().p("AEqDnIqVg8QhOgIg0g5Qg1g5AAhNQAAhPA4g4QA4g5BPgBIKVgKQBjgBBHBFQBHBFAABiQgBBkhJBEQhCA8hVAAIgYgBg");
	this.shape_1.setTransform(-7.6,10.9264);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.2,-12.2,109.30000000000001,46.3);


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
	this.shape_1.graphics.f("#4F1006").s().p("AnYCsQhJhEgBhkQAAhiBHhFQBHhFBjABIKVAKQBPABA4A5QA3A4AABPQAABNg0A5Qg1A5hNAIIqVA8IgYABQhVAAhCg8g");
	this.shape_1.setTransform(6.05,15.6264);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-7.5,109.30000000000001,46.3);


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
	this.shape_1.setTransform(-5.45,12.9,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-9.2,22.299999999999997,27.2);


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
	this.shape_2.graphics.f("#4F1006").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape_2.setTransform(-0.4374,-21.3926,0.5879,0.5879);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2B241C").s().p("AAaKGQghgCgQgTQgUgWAAgzQAAkcg9lpQhLmGgeiiIFRAAIgNR2QBqAzgMA0QgFAUgZANQgYANghAAg");
	this.shape_3.setTransform(0.8913,22.9945,0.5879,0.5879);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.8,-86.3,64.8,147.3);


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
	this.shape_2.graphics.f("#4F1006").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape_2.setTransform(-1.3874,-21.3426,0.5879,0.5879);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2B241C").s().p("AAaKGQghgCgQgTQgUgWAAgzQAAkcg9lpQhLmGgeiiIFRAAIgNR2QBqAzgMA0QgFAUgZANQgYANghAAg");
	this.shape_3.setTransform(-0.0587,23.0445,0.5879,0.5879);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.8,-86.2,64.9,147.2);


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

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_714();
	this.instance_1.setTransform(-56.95,-12.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.9,-12.2,114,216);


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

	// flash0_ai
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4F1006").s().p("AEUDHIrkgfIAAlDILmgrQBZgDA0A+QAuA2AABLQACBQg4BAQg4BBhMAAIgDAAg");
	this.shape_2.setTransform(13.6784,8.3188);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_3.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-11.5,108.5,39.7);


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
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4F1006").s().p("AmaCGQg4hAAChQQAAhLAug2QA0g+BZADILmArIAAFDIrkAfIgDAAQhMAAg4hBg");
	this.shape_2.setTransform(-13.6284,12.5688);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_3.setTransform(0.0758,4.22,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.1,-7.3,108.5,39.8);


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
	this.instance_1 = new lib.CachedBmp_703();
	this.instance_1.setTransform(-78.3,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.3,-67.4,165.5,146);


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
	this.shape_1.graphics.f("#7C6253").s().p("AjBBrQgOgMgBgjQAAgiALgmQAMgoAUgaQAWgeAYgBIBFgDQAzgCAmACQBxAHAhAsQBABXhuAVQggAGg/ACQg9ADgNACQgUAEgaANIgsAXQgdAOgUAAQgOAAgKgHg");
	this.shape_1.setTransform(14.8,-0.3,1,1,0,0,0,14.8,-0.3);

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
	this.shape_1.setTransform(-12.5,7.9,0.5738,0.5738,0,0,0,-26.2,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.2,-3.8,41.599999999999994,22.8);


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
	this.shape.graphics.f("#D3C2B2").s().p("AmOToQijiqAKjqIA37rQAGjVCZiTQCaiTDTACIAKAAQDYACCXCcQCXCcgEDZQgHGBgBI3QAAHcAEFOQADDmiiCjQihCkjlAAQjrAAiiiqg");
	this.shape.setTransform(-3.6494,-3.9067,0.6048,0.6048);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37,-90.1,66.8,172.39999999999998);


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
	this.shape.graphics.f("#D3C2B2").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
	this.shape.setTransform(-10.939,45.1488);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.3,-41,66.8,172.4);


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
	this.instance = new lib.CachedBmp_702();
	this.instance.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,165,158.5);


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

	// flash0_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3C2B2").s().p("AIGGQIx8hoQiGgMhbhkQhbhjAAiGQAAiJBghiQBhhiCJgCIR7gRQCsgCB6B4QB6B4AACrQAACtiAB2QhxBniTAAQgVAAgUgCg");
	this.shape.setTransform(-7.6085,10.9141,0.5768,0.5768);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.2,-12.2,109.30000000000001,46.3);


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
	this.shape.graphics.f("#D3C2B2").s().p("AIGGQIx8hoQiGgMhbhkQhbhjAAiGQAAiJBghiQBhhiCJgCIR7gRQCsgCB6B4QB6B4AACrQAACtiAB2QhxBniTAAQgVAAgUgCg");
	this.shape.setTransform(6.0585,15.6141,0.5768,0.5768,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-7.5,109.30000000000001,46.3);


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
	this.shape.setTransform(-5.45,12.9,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-9.2,22.299999999999997,27.2);


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
	this.shape.graphics.f("#D3C2B2").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape.setTransform(-0.4374,-21.3926,0.5879,0.5879);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B241C").s().p("AAaKGQghgCgQgTQgUgWAAgzQAAkcg9lpQhLmGgeiiIFRAAIgNR2QBqAzgMA0QgFAUgZANQgYANghAAg");
	this.shape_1.setTransform(0.8913,22.9945,0.5879,0.5879);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.8,-86.3,64.8,147.3);


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
	this.shape.graphics.f("#D3C2B2").s().p("AAVKJQibAAi9gWQAMiDgDkzIgIn+QgBiHBfhgQBehgCHAAIAMAAQCJAABaBjQBaBjgGCLIgdO8QikAEhaAAIgUAAg");
	this.shape.setTransform(-1.3812,-21.3475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B241C").s().p("AAaKGQghgCgQgTQgUgWAAgzQAAkcg9lpQhLmGgeiiIFRAAIgNR2QBqAzgMA0QgFAUgZANQgYANghAAg");
	this.shape_1.setTransform(-0.0587,23.0445,0.5879,0.5879);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.8,-86.2,64.9,147.2);


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

	// flash0_ai
	this.instance = new lib.CachedBmp_713();
	this.instance.setTransform(-56.95,-12.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.9,-12.2,114,216);


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

	// flash0_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D3C2B2").s().p("AHYFUIzyg0IAAopIT1hJQCYgFBZBpQBOBcAACBQAECKhgBtQhfBuiCAAIgFAAg");
	this.shape.setTransform(13.6664,8.2992,0.5854,0.5854);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_1.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-11.5,108.5,39.7);


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
	this.shape.graphics.f("#D3C2B2").s().p("AmaCGQg4hAAChQQAAhLAug2QA0g+BZADILmArIAAFDIrkAfIgDAAQhMAAg4hBg");
	this.shape.setTransform(-13.6284,12.5688);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_1.setTransform(0.0758,4.22,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.1,-7.3,108.5,39.8);


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
	this.instance_2 = new lib.CachedBmp_700();
	this.instance_2.setTransform(-75.25,-66.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.2,-66.7,158.5,132.5);


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
	this.shape.graphics.f("#7C6253").s().p("AjBBrQgOgMgBgjQAAgiALgmQAMgoAUgaQAWgeAYgBIBFgDQAzgCAmACQBxAHAhAsQBABXhuAVQggAGg/ACQg9ADgNACQgUAEgaANIgsAXQgdAOgUAAQgOAAgKgHg");
	this.shape.setTransform(14.8,-0.3,1,1,0,0,0,14.8,-0.3);

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
	this.shape.setTransform(-12.5,7.9,0.5738,0.5738,0,0,0,-26.2,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.2,-3.8,41.599999999999994,22.8);


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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5A4D3D").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
	this.shape_1.setTransform(-3.639,-3.9012);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37,-90.1,66.8,172.39999999999998);


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
	this.shape_1.graphics.f("#5A4D3D").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
	this.shape_1.setTransform(-10.939,45.1488);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.3,-41,66.8,172.4);


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
	this.instance_1 = new lib.CachedBmp_699();
	this.instance_1.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,165,158.5);


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

	// flash0_ai
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5A4D3D").s().p("AEqDnIqVg8QhOgIg0g5Qg1g5AAhNQAAhPA4g4QA4g5BPgBIKVgKQBjgBBHBFQBHBFAABiQgBBkhJBEQhCA8hVAAIgYgBg");
	this.shape_1.setTransform(-7.6,10.9264);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.2,-12.2,109.30000000000001,46.3);


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
	this.shape_1.graphics.f("#5A4D3D").s().p("AnYCsQhJhEgBhkQAAhiBHhFQBHhFBjABIKVAKQBPABA4A5QA3A4AABPQAABNg0A5Qg1A5hNAIIqVA8IgYABQhVAAhCg8g");
	this.shape_1.setTransform(6.05,15.6264);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-7.5,109.30000000000001,46.3);


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
	this.shape_1.setTransform(-5.45,12.9,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-9.2,22.299999999999997,27.2);


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
	this.shape_2.graphics.f("#5A4D3D").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape_2.setTransform(-0.4374,-21.3926,0.5879,0.5879);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2B241C").s().p("AAaKGQghgCgQgTQgUgWAAgzQAAkcg9lpQhLmGgeiiIFRAAIgNR2QBqAzgMA0QgFAUgZANQgYANghAAg");
	this.shape_3.setTransform(0.8913,22.9945,0.5879,0.5879);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.8,-86.3,64.8,147.3);


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
	this.shape_2.graphics.f("#5A4D3D").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape_2.setTransform(-1.3874,-21.3426,0.5879,0.5879);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2B241C").s().p("AAaKGQghgCgQgTQgUgWAAgzQAAkcg9lpQhLmGgeiiIFRAAIgNR2QBqAzgMA0QgFAUgZANQgYANghAAg");
	this.shape_3.setTransform(-0.0587,23.0445,0.5879,0.5879);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.8,-86.2,64.9,147.2);


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

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_712();
	this.instance_1.setTransform(-56.95,-12.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.9,-12.2,114,216);


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

	// flash0_ai
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5A4D3D").s().p("AEUDHIrkgfIAAlDILmgrQBZgDA0A+QAuA2AABLQACBQg4BAQg4BBhMAAIgDAAg");
	this.shape_2.setTransform(13.6784,8.3188);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_3.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-11.5,108.5,39.7);


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
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5A4D3D").s().p("AmaCGQg4hAAChQQAAhLAug2QA0g+BZADILmArIAAFDIrkAfIgDAAQhMAAg4hBg");
	this.shape_2.setTransform(-13.6284,12.5688);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_3.setTransform(0.0758,4.22,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.1,-7.3,108.5,39.8);


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
	this.shape_1.graphics.f("#7C6253").s().p("AjBBrQgOgMgBgjQAAgiALgmQAMgoAUgaQAWgeAYgBIBFgDQAzgCAmACQBxAHAhAsQBABXhuAVQggAGg/ACQg9ADgNACQgUAEgaANIgsAXQgdAOgUAAQgOAAgKgHg");
	this.shape_1.setTransform(14.8,-0.3,1,1,0,0,0,14.8,-0.3);

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
	this.shape_1.setTransform(-12.5,7.9,0.5738,0.5738,0,0,0,-26.2,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.2,-3.8,41.599999999999994,22.8);


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
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00563E").s().p("AmOToQijiqAKjqIA37rQAGjVCZiTQCaiTDTACIAKAAQDYACCXCcQCXCcgEDZQgHGBgBI3QAAHcAEFOQADDmiiCjQihCkjlAAQjrAAiiiqg");
	this.shape_2.setTransform(-3.6494,-3.9067,0.6048,0.6048);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37,-90.1,66.8,172.39999999999998);


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
	this.shape_2.graphics.f("#00563E").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
	this.shape_2.setTransform(-10.939,45.1488);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.3,-41,66.8,172.4);


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
	this.instance_2 = new lib.CachedBmp_697();
	this.instance_2.setTransform(-86,-83.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-83.6,165,158.5);


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

	// flash0_ai
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00563E").s().p("AIGGQIx8hoQiGgMhbhkQhbhjAAiGQAAiJBghiQBhhiCJgCIR7gRQCsgCB6B4QB6B4AACrQAACtiAB2QhxBniTAAQgVAAgUgCg");
	this.shape_2.setTransform(-7.6085,10.9141,0.5768,0.5768);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.2,-12.2,109.30000000000001,46.3);


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
	this.shape_2.graphics.f("#00563E").s().p("AIGGQIx8hoQiGgMhbhkQhbhjAAiGQAAiJBghiQBhhiCJgCIR7gRQCsgCB6B4QB6B4AACrQAACtiAB2QhxBniTAAQgVAAgUgCg");
	this.shape_2.setTransform(6.0585,15.6141,0.5768,0.5768,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.6,-7.5,109.30000000000001,46.3);


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
	this.shape_2.setTransform(-5.45,12.9,0.5738,0.5738,0,0,0,-9.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.1,-9.2,22.299999999999997,27.2);


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
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00563E").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape_4.setTransform(-0.4374,-21.3926,0.5879,0.5879);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2B241C").s().p("AAaKGQghgCgQgTQgUgWAAgzQAAkcg9lpQhLmGgeiiIFRAAIgNR2QBqAzgMA0QgFAUgZANQgYANghAAg");
	this.shape_5.setTransform(0.8913,22.9945,0.5879,0.5879);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.8,-86.3,64.8,147.3);


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

	// flash0_ai
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00563E").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape_4.setTransform(-1.3874,-21.3426,0.5879,0.5879);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2B241C").s().p("AAaKGQghgCgQgTQgUgWAAgzQAAkcg9lpQhLmGgeiiIFRAAIgNR2QBqAzgMA0QgFAUgZANQgYANghAAg");
	this.shape_5.setTransform(-0.0587,23.0445,0.5879,0.5879);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.8,-86.2,64.9,147.2);


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

	// flash0_ai
	this.instance_2 = new lib.CachedBmp_711();
	this.instance_2.setTransform(-56.95,-12.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.9,-12.2,114,216);


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

	// flash0_ai
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00563E").s().p("AHYFUIzyg0IAAopIT1hJQCYgFBZBpQBOBcAACBQAECKhgBtQhfBuiCAAIgFAAg");
	this.shape_4.setTransform(13.6664,8.2992,0.5854,0.5854);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_5.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.3,-11.5,108.5,39.7);


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
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00563E").s().p("AHYFUIzyg0IAAopIT1hJQCYgFBZBpQBOBcAACBQAECKhgBtQhfBuiCAAIgFAAg");
	this.shape_4.setTransform(-13.6164,12.5492,0.5854,0.5854,0,0,180);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_5.setTransform(0.0758,4.22,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.1,-7.3,108.5,39.8);


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
	this.instance = new lib.CachedBmp_695();
	this.instance.setTransform(-75.25,-66.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.2,-66.7,158.5,132.5);


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
	this.shape_2.graphics.f("#7C6253").s().p("AjBBrQgOgMgBgjQAAgiALgmQAMgoAUgaQAWgeAYgBIBFgDQAzgCAmACQBxAHAhAsQBABXhuAVQggAGg/ACQg9ADgNACQgUAEgaANIgsAXQgdAOgUAAQgOAAgKgHg");
	this.shape_2.setTransform(14.8,-0.3,1,1,0,0,0,14.8,-0.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.8,-11.4,41.7,22.9);


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
	this.shape_2.setTransform(-12.5,7.9,0.5738,0.5738,0,0,0,-26.2,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.2,-3.8,41.599999999999994,22.8);


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
	this.instance_1 = new lib.CachedBmp_694();
	this.instance_1.setTransform(-78.3,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.3,-67.4,157.5,146);


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
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5C4734").s().p("AhlI5QgkgkgDg+QgdnjgImKQgCg/AigyIACgDQAagmAngVQAmgUApAAQAqAAAlAUQAoAUAaAnQARAaAIAfQAIAegBAgQgNDogTDgQgTDsgXC2QgHA+gmAlQgjAggtAAQgvAAghghg");
	this.shape_2.setTransform(-2.1913,53.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

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
	this.instance_2 = new lib.CachedBmp_693();
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
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5C4734").s().p("AhDF9QgUAAgYgRQgZgTgTgdQglg5AAhCQAAgTADgTQAWiOAah0QAhiTAcg0QARgeAhgWQAigXAlgCQBegGAiB3QAFARAACZQAACfAMA9QAGAjABAhQgBA/gZA2QgQAhgVAUQgWATgTAAg");
	this.shape_4.setTransform(-0.1786,-23.6143);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D2318").s().p("AATF2IgEgBQgTAAgJgMQgLgNAAgdQAAikgjjRQgsjhgRheIDCAAIgIKVQA+AdgIAeQgDAMgOAHQgOAIgTAAg");
	this.shape_5.setTransform(1.0158,23.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

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
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5C4734").s().p("AhCF9QgVAAgXgRQgZgTgUgdQgvhJANhYQAWiOAah0QAhiTAdg0QAQgeAhgWQAjgXAlgCQBdgGAiB3QAFARAACZQABCfALA9QAUBognBRQgPAhgWAUQgVATgUAAg");
	this.shape_4.setTransform(-0.174,-22.7143);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D2318").s().p("AAPFzQgTgBgJgLQgLgNAAgdQAAijgjjPQgsjggRhdIDCAAIgHKQQA9AdgHAdQgDAMgOAHQgOAIgTAAg");
	this.shape_5.setTransform(1.186,23.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#453526").s().p("AiNEyQjDgQicgiQASiygHjWQgEhrgHhIQDyAHD0ALQHnAVAJAUQADAGAAAYQAAA+gRCwQgNB8gOB4QiPA8jwAAQhfAAhwgKg");
	this.shape.setTransform(0.4,19.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

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
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453526").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_4.setTransform(-0.0258,-0.03);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

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
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#453526").s().p("Am5BCQgpgPAAgzQAAgyApgPQAWgIA7AAQC5gBCXAAQEgACCbAPQAeACASARQAQAQAAAVQAAAUgQAPQgSASgeADQjYAUozAAQg6AAgXgJg");
	this.shape_4.setTransform(0.05,0.0188);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-7.4,96.6,14.9);


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
	this.instance_3 = new lib.CachedBmp_692();
	this.instance_3.setTransform(-78.4,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.4,-67.4,163.5,146);


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
	this.instance = new lib.CachedBmp_690();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_691();
	this.instance_1.setTransform(-43.45,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(-214.75,-207.05,4.7387,4.7387);

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
	this.instance = new lib.CachedBmp_688();
	this.instance.setTransform(-43.7,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_689();
	this.instance_1.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(216.45,-207.05,4.7386,4.7386,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


(lib.CharacterCivilian_07 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-59.4,-12.45,0.9974,0.9974,-76.5654,0,0,33.4,9.9);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-96.15,141.65,0.9969,0.9969,-109.0268,0,0,14.3,0.2);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-96.6,141.55,0.9972,0.9972,-89.6344,0,0,4.5,-9);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-78.85,57.25,0.9971,0.9971,-83.4059,0,0,43.9,7.9);

	this.instance_4 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_4.setTransform(-6.05,-81.2,0.9981,0.9981,-3.8906,0,0,1.5,51.1);

	this.instance_5 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_6.setTransform(24.3,88.3,0.9945,0.9945,-8.9634,0,0,0.2,4.8);

	this.instance_7 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_7.setTransform(-30.2,91.05,0.9955,0.9955,3.9263,0,0,1.4,-41.6);

	this.instance_8 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_8.setTransform(-41.75,185.65,0.9949,0.9949,20.9075,0,0,1.1,-51.4);

	this.instance_9 = new lib.ch1_neckcopy2("synched",0);
	this.instance_9.setTransform(-4.25,-59.75,0.9981,0.9981,-6.7843,0,0,-1.4,7);

	this.instance_10 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_10.setTransform(34.4,185.15,0.9948,0.9948,-0.4113,0,0,4.1,-50.9);

	this.instance_11 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_11.setTransform(62.85,135.65,0.997,0.997,127.076,0,0,-10.1,11);

	this.instance_12 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_12.setTransform(66.3,135.05,0.997,0.997,146.8778,0,0,-7.3,13.2);

	this.instance_13 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_13.setTransform(54.4,49.25,0.9973,0.9973,87.6218,0,0,-45.6,12.2);

	this.instance_14 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_14.setTransform(48.55,-20.65,0.9975,0.9975,85.6856,0,0,-31.9,13.1);

	this.instance_15 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_15.setTransform(-10,49,0.9995,0.9995,1.7768,0,0,-4.7,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4.7,regY:-21.9,rotation:1.7768,x:-10,y:49}},{t:this.instance_14,p:{rotation:85.6856,x:48.55,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.65,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:87.6218,x:54.4,y:49.25,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:146.8778,x:66.3,y:135.05,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:127.076,x:62.85,y:135.65,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-50.9,rotation:-0.4113,x:34.4,y:185.15,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.7843,x:-4.25,y:-59.75}},{t:this.instance_8,p:{rotation:20.9075,x:-41.75,y:185.65,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9263,x:-30.2,y:91.05}},{t:this.instance_6,p:{regX:0.2,regY:4.8,rotation:-8.9634,x:24.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-3.8906,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.9,rotation:-83.4059,x:-78.85,y:57.25,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-89.6344,x:-96.6,y:141.55,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9969,scaleY:0.9969,rotation:-109.0268,x:-96.15,y:141.65,regY:0.2}},{t:this.instance,p:{regX:33.4,scaleX:0.9974,scaleY:0.9974,rotation:-76.5654,x:-59.4,regY:9.9,y:-12.45}}]}).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:87.7336,x:48.6,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.65,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.1744,x:51.9,y:49.45,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:142.0961,x:70.35,y:133.95,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10,scaleX:0.9969,scaleY:0.9969,rotation:121.7206,x:67,y:134.95,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4104,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7758,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.6503,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-85.8304,x:-79.2,y:57.2,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-8.9,rotation:-92.0556,x:-93.45,y:142.05,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.4514,x:-92.9,y:142.35,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-76.1774,x:-59.3,regY:9.9,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:89.7809,x:48.65,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.65,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:78.7263,x:49.35,y:49.5,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:137.313,x:74.35,y:132.4,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:116.3654,x:71.1,y:133.6,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4104,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.767,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.4116,x:-6,y:-81.25}},{t:this.instance_3,p:{regX:43.8,rotation:-88.2566,x:-79.65,y:57.05,scaleX:0.997,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-94.4796,x:-90.4,y:142.6,regX:4.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.8773,x:-89.75,y:142.55,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-75.7881,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:91.8234,x:48.55,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.65,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:74.2773,x:46.9,y:49.65,regX:-45.5,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:132.5299,x:78.15,y:130.2,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:111.0118,x:75.05,y:131.6,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7583,x:-4.25,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.1711,x:-6,y:-81.25}},{t:this.instance_3,p:{regX:43.8,rotation:-90.6769,x:-80,y:56.9,scaleX:0.9971,regY:8,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-96.9063,x:-87.25,y:142.75,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-116.3023,x:-86.6,y:142.75,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-75.3997,x:-59.45,regY:9.8,y:-12.55}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:93.8701,x:48.6,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.65,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:69.829,x:44.45,y:49.3,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:127.7472,x:81.85,y:127.45,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:105.6552,x:78.9,y:129.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7504,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.9325,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-93.103,x:-80.6,y:56.8,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-8.9,rotation:-99.3314,x:-84,y:142.75,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-118.7276,x:-83.45,y:142.85,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-75.0122,x:-59.4,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:95.9183,x:48.55,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.65,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.3805,x:42,y:49.15,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:122.9648,x:85.25,y:124.05,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:100.3007,x:82.5,y:126,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7416,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.6931,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-95.5294,x:-81.05,y:56.7,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-101.7567,x:-80.9,y:142.75,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-121.1536,x:-80.2,y:142.7,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-74.6237,x:-59.4,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:97.9659,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.65,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:60.9326,x:39.35,y:48.9,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:118.1815,x:88.5,y:120.25,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:94.9451,x:85.7,y:122.35,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7336,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.4545,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-97.9533,x:-81.55,y:56.5,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-104.1834,x:-77.7,y:142.5,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-123.5791,x:-77.1,y:142.45,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-74.2343,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:100.0142,x:48.6,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.65,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:56.4831,x:36.85,y:48.5,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:113.3993,x:91.3,y:115.8,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10,scaleX:0.997,scaleY:0.997,rotation:89.594,x:88.95,y:118.35,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7257,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.2143,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-100.379,x:-81.95,y:56.4,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-106.6072,x:-74.55,y:142.1,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-126.0053,x:-73.95,y:142.05,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-73.8456,x:-59.25,regY:9.9,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:102.0603,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.2,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:52.0348,x:34.4,y:48.05,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.9969,rotation:108.6174,x:93.9,y:110.9,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:84.2392,x:91.7,y:113.5,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7167,x:-4.2,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.975,x:-5.95,y:-81.25}},{t:this.instance_3,p:{regX:43.8,rotation:-102.8043,x:-82.45,y:56.2,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-109.033,x:-71.35,y:141.55,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-128.4304,x:-70.7,y:141.55,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-73.4566,x:-59.45,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:104.1085,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.65,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:47.5873,x:31.9,y:47.55,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:103.834,x:96.2,y:105.6,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:78.8835,x:94.15,y:108.25,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7088,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.7366,x:-5.95,y:-81.25}},{t:this.instance_3,p:{regX:43.8,rotation:-105.2309,x:-82.9,y:56.05,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-8.9,rotation:-111.459,x:-68.15,y:140.8,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-130.8555,x:-67.6,y:140.7,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-73.0683,x:-59.45,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:106.1562,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:43.138,x:29.5,y:46.9,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:99.0519,x:98,y:99.75,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:73.5288,x:96.3,y:102.65,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7001,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.4956,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-107.656,x:-83.4,y:55.85,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-113.8848,x:-65.1,y:140,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-133.2806,x:-64.45,y:139.85,regY:0.2}},{t:this.instance,p:{regX:33.4,scaleX:0.9973,scaleY:0.9973,rotation:-72.6793,x:-59.3,regY:9.9,y:-12.55}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:108.2041,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:38.6905,x:27.1,y:46.1,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:94.2686,x:99.65,y:93.65,regY:13.1,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:68.174,x:97.9,y:96.65,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6913,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.2572,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-110.0803,x:-83.85,y:55.75,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-8.9,rotation:-116.3094,x:-61.95,y:139,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-135.7052,x:-61.4,y:138.8,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-72.2906,x:-59.4,regY:9.8,y:-12.6}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:110.2502,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:34.2416,x:24.7,y:45.4,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:89.4905,x:100.65,y:86.85,regY:13.2,regX:-7.4}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:62.818,x:99.35,y:90.15,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6833,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.018,x:-6,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-112.5076,x:-84.2,y:55.5,scaleX:0.997,regY:8,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-118.7359,x:-58.95,y:137.75,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-138.1316,x:-58.25,y:137.65,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-71.9027,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:112.299,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:29.7925,x:22.5,y:44.5,regX:-45.5,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:84.708,x:101.4,y:80.05,regY:13.1,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.9969,rotation:57.4622,x:100.3,y:83.35,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6737,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.7788,x:-5.95,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-114.9311,x:-84.75,y:55.4,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-121.1607,x:-55.95,y:136.5,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-140.5574,x:-55.25,y:136.35,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-71.5138,x:-59.35,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:114.3466,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.85,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:25.344,x:20.05,y:43.5,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:79.9255,x:101.6,y:73,regY:13.1,regX:-7.2}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:52.1084,x:100.75,y:76.25,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6657,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.5379,x:-5.95,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-117.3564,x:-85.2,y:55.2,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-123.586,x:-53.05,y:135.05,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-142.9826,x:-52.4,y:134.75,regY:0.2}},{t:this.instance,p:{regX:33.2,scaleX:0.9973,scaleY:0.9973,rotation:-71.1248,x:-59.35,regY:9.9,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:116.3934,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:20.8963,x:17.75,y:42.45,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:75.1425,x:101.35,y:65.4,regY:13.1,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:46.7527,x:100.8,y:68.8,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6567,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.2996,x:-5.95,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-119.782,x:-85.65,y:55.05,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-8.9,rotation:-126.012,x:-50.05,y:133.3,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-145.4079,x:-49.55,y:133.2,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-70.7356,x:-59.4,regY:9.8,y:-12.55}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:118.4415,x:48.4,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:16.4481,x:15.5,y:41.3,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:70.3606,x:100.5,y:57.75,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:41.3979,x:100.35,y:61.2,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6488,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.0596,x:-5.95,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-122.2074,x:-86.1,y:54.85,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-128.4374,x:-47.3,y:131.75,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-147.8331,x:-46.65,y:131.35,regY:0.2}},{t:this.instance,p:{regX:33.2,scaleX:0.9973,scaleY:0.9973,rotation:-70.3471,x:-59.45,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:120.4881,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:11.9998,x:13.25,y:40.1,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:65.5768,x:99.3,y:49.85,regY:13.2,regX:-7.4}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:36.0434,x:99.45,y:53.3,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6401,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.65,y:185.55,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9623,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.1743,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-124.6335,x:-86.45,y:54.6,scaleX:0.997,regY:8,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-130.8637,x:-44.5,y:129.7,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-150.2589,x:-44,y:129.55,regY:0.1}},{t:this.instance,p:{regX:33.4,scaleX:0.9973,scaleY:0.9973,rotation:-69.9586,x:-59.3,regY:9.9,y:-12.55}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:110.9254,x:48.4,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:8.5191,x:23.9,y:45.05,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:61.7632,x:110.35,y:49.7,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:31.6568,x:110.75,y:53.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.632,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.65,y:185.55,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9623,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.4144,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-122.3307,x:-86.4,y:54.7,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-128.5609,x:-47.35,y:131.45,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-147.957,x:-46.9,y:131.25,regY:0.1}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-70.1134,x:-59.4,regY:9.8,y:-12.55}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:101.362,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:5.0389,x:35.2,y:48.1,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:57.9493,x:121.8,y:47.6,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:27.2694,x:122.4,y:50.95,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6242,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.65,y:185.55,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.6535,x:-5.95,y:-81.25}},{t:this.instance_3,p:{regX:43.8,rotation:-120.0283,x:-86.2,y:54.8,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-126.2574,x:-50.3,y:133.1,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-145.6539,x:-49.75,y:132.75,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-70.2662,x:-59.45,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:91.7989,x:48.5,scaleX:0.9975,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:1.559,x:46.85,y:49.35,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:54.135,x:133.25,y:43.6,regY:13.2,regX:-7.2}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:22.8831,x:134,y:46.9,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6154,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.65,y:185.55,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.8945,x:-5.9,y:-81.25}},{t:this.instance_3,p:{regX:43.8,rotation:-117.7267,x:-86.05,y:54.9,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-123.9544,x:-53.3,y:134.45,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-143.3499,x:-52.8,y:134.35,regY:0.1}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-70.4217,x:-59.4,regY:9.8,y:-12.6}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:82.2419,x:48.4,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.95,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-1.9168,x:58.5,y:48.65,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:50.3213,x:144.35,y:37.6,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:18.4951,x:145.4,y:40.8,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6075,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.65,y:185.55,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.1337,x:-5.85,y:-81.15}},{t:this.instance_3,p:{regX:43.9,rotation:-115.4242,x:-85.9,y:54.85,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-121.6518,x:-56.35,y:135.85,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-141.0475,x:-55.75,y:135.55,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-70.5753,x:-59.45,regY:9.8,y:-12.55}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:72.6777,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-5.3972,x:70.1,y:45.95,regX:-45.5,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:46.5058,x:155.1,y:29.6,regY:13.1,regX:-7.3}},{t:this.instance_11,p:{regX:-10,scaleX:0.9969,scaleY:0.9969,rotation:14.1094,x:156.35,y:32.95,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5986,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.65,y:185.55,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:1.3737,x:-5.75,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-113.12,x:-85.6,y:55.05,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-119.3501,x:-59.4,y:137,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-138.7449,x:-58.75,y:136.85,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-70.73,x:-59.4,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:63.1143,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.8,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-8.8773,x:80.7,y:41.45,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:42.692,x:164.6,y:20,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:9.7211,x:166.15,y:23.15,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5906,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.65,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.613,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-110.8175,x:-85.5,y:55.05,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-117.0477,x:-62.6,y:138.1,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-136.4427,x:-61.95,y:137.9,regY:0.2}},{t:this.instance,p:{regX:33.4,scaleX:0.9973,scaleY:0.9973,rotation:-70.8833,x:-59.3,regY:9.9,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:53.5515,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.8,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-12.3566,x:90.8,y:35.35,regX:-45.5,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:38.8784,x:173.15,y:8.8,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:5.3343,x:174.75,y:11.75,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5827,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.65,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.8531,x:-5.85,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-108.5148,x:-85.3,y:55.15,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-114.7446,x:-65.75,y:138.9,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-134.1392,x:-65.15,y:138.8,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-71.0383,x:-59.4,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:43.9884,x:48.55,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-15.8376,x:99.35,y:27.55,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:35.0632,x:180.1,y:-3.9,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:0.9489,x:181.9,y:-0.9,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.573,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.65,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.0933,x:-5.85,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-106.2119,x:-85.15,y:55.2,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-112.4432,x:-68.95,y:139.8,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-131.8355,x:-68.35,y:139.6,regY:0.2}},{t:this.instance,p:{regX:33.4,scaleX:0.9973,scaleY:0.9973,rotation:-71.193,x:-59.4,regY:9.8,y:-12.65}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:34.425,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.2,y:-20.65,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-19.3177,x:106.75,y:18.55,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:31.2488,x:185.45,y:-18,regY:13.1,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:-3.4335,x:187.35,y:-15.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5651,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.65,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:2.3318,x:-5.75,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-103.911,x:-84.95,y:55.25,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-110.1406,x:-72.2,y:140.45,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-129.5335,x:-71.55,y:140.3,regY:0.2}},{t:this.instance,p:{regX:33.2,scaleX:0.9973,scaleY:0.9973,rotation:-71.3469,x:-59.45,regY:9.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:24.8624,x:48.55,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.8,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-22.7983,x:112.5,y:8.2,regX:-45.5,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:27.4346,x:188.7,y:-32.75,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:-7.8212,x:190.9,y:-30.2,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5563,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.65,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.5721,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.9,rotation:-101.6073,x:-84.8,y:55.25,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-107.8383,x:-75.4,y:140.95,regX:4.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-127.2297,x:-74.75,y:141,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-71.501,x:-59.45,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:15.2987,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-26.2784,x:116.35,y:-2.8,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:23.6204,x:190.05,y:-48.35,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:-12.2081,x:192.4,y:-45.9,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5484,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.8115,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-99.3056,x:-84.6,y:55.4,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-105.5341,x:-78.7,y:141.25,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-124.9274,x:-78.05,y:141.25,regY:0.2}},{t:this.instance,p:{regX:33.2,scaleX:0.9973,scaleY:0.9973,rotation:-71.6554,x:-59.45,regY:9.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:5.7368,x:48.55,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.8,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-29.7579,x:118.45,y:-14.4,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:19.8053,x:189.1,y:-64.25,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10,scaleX:0.9969,scaleY:0.9969,rotation:-16.5958,x:191.8,y:-62,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5403,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.0518,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-97.0016,x:-84.5,y:55.5,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-103.2328,x:-81.95,y:141.65,regX:4.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-122.6253,x:-81.4,y:141.55,regY:0.1}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-71.8087,x:-59.45,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:-3.8226,x:48.45,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.8,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-33.239,x:118.45,y:-26,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:15.9904,x:186.05,y:-80.2,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:-20.9821,x:188.8,y:-77.95,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5325,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.2922,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-94.7,x:-84.3,y:55.6,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-100.9303,x:-85.2,y:141.55,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-120.323,x:-84.65,y:141.6,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-71.964,x:-59.4,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:-13.3849,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-36.7198,x:116.6,y:-37.55,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:12.1768,x:180.8,y:-95.85,regY:13.1,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:-25.3684,x:183.7,y:-93.8,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5236,x:-3.95,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.5318,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.9,rotation:-92.398,x:-84.1,y:55.45,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-8.9,rotation:-98.6274,x:-88.35,y:141.55,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-118.0196,x:-87.85,y:141.6,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-72.1176,x:-59.45,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:-22.9477,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.8,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-40.199,x:112.85,y:-48.7,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:8.3617,x:173.4,y:-110.6,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10,scaleX:0.9969,scaleY:0.9969,rotation:-29.7548,x:176.5,y:-108.9,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5157,x:-3.95,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.7706,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-90.0938,x:-83.75,y:55.7,scaleX:0.9971,regY:8,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-96.3247,x:-91.75,y:141.5,regX:4.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-115.7162,x:-91.15,y:141.45,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-72.2723,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:-32.5109,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.8,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-43.68,x:107.3,y:-58.95,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:4.5473,x:163.95,y:-124.65,regY:13.1,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:-34.1417,x:167.05,y:-122.9,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.507,x:-3.95,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.1,y:90.9}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:4.0103,x:-5.8,y:-81.25}},{t:this.instance_3,p:{regX:43.8,rotation:-87.796,x:-83.7,y:55.75,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-94.0233,x:-95,y:141,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.413,x:-94.4,y:141.05,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-72.427,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7725,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:-27.4929,x:48.55,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-39.5481,x:110.55,y:-53.65,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:8.9869,x:171.7,y:-115,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:-29.1693,x:174.7,y:-113.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4104,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5175,x:-3.95,y:-59.75}},{t:this.instance_8,p:{rotation:20.9146,x:-41.7,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-30.1,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9685,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.7812,x:-5.85,y:-81.15}},{t:this.instance_3,p:{regX:43.9,rotation:-87.6775,x:-83.65,y:55.65,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-93.9064,x:-95.05,y:141,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.3011,x:-94.45,y:141.1,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-72.552,x:-59.5,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7707,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:-22.4743,x:48.55,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.85,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-35.4168,x:113.1,y:-48.15,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:13.426,x:178.5,y:-104.85,regY:13.2,regX:-7.4}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:-24.1984,x:181.45,y:-102.75,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4157,x:34.45,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5282,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9232,x:-41.7,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9275,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9729,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.5529,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-87.5599,x:-83.45,y:55.85,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-93.7886,x:-95.05,y:141.1,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.1856,x:-94.4,y:141.2,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-72.6757,x:-59.3,regY:9.9,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.769,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:-17.4565,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.8,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-31.2852,x:115.25,y:-42.4,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:17.867,x:184.65,y:-94.3,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:-19.2256,x:187.35,y:-92,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4201,x:34.45,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5395,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9316,x:-41.7,y:185.55,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9292,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9792,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.3238,x:-5.85,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-87.4422,x:-83.3,y:55.9,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-93.6735,x:-95.1,y:141.1,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.0728,x:-94.5,y:141.25,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-72.8005,x:-59.45,regY:9.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7672,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:-12.4397,x:48.55,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-27.1548,x:116.9,y:-36.45,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:22.3062,x:189.75,y:-83.2,regY:13.2,regX:-7.4}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:-14.2538,x:192.3,y:-80.65,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4254,x:34.4,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5484,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9391,x:-41.7,y:185.55,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9319,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9836,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.0939,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-87.3229,x:-83.1,y:56,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-93.5567,x:-95.15,y:141.1,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.9585,x:-94.5,y:141.25,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-72.9252,x:-59.45,regY:9.8,y:-12.55}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7655,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:-7.4194,x:48.55,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-23.0227,x:118.05,y:-30.4,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:26.7462,x:194.1,y:-71.9,regY:13.1,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:-9.2818,x:196.35,y:-69.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4298,x:34.35,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5589,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.948,x:-41.7,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9345,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9899,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.865,x:-5.85,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-87.2043,x:-82.95,y:56,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-8.9,rotation:-93.4398,x:-95.1,y:141.15,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.8453,x:-94.55,y:141.25,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-73.0492,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7637,x:-10.1,y:48.95}},{t:this.instance_14,p:{rotation:-2.4032,x:48.45,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-18.8913,x:118.7,y:-24.3,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:31.1845,x:197.4,y:-60.05,regY:13.2,regX:-7.4}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:-4.3099,x:199.55,y:-57.2,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4351,x:34.35,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5696,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9561,x:-41.7,y:185.55,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9361,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9952,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.6361,x:-5.85,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-87.0858,x:-82.85,y:56.1,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-93.3248,x:-95.15,y:141.15,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.7309,x:-94.55,y:141.25,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-73.174,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.762,x:-10.1,y:48.95}},{t:this.instance_14,p:{rotation:2.6112,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.8,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-14.7611,x:118.7,y:-18.3,regX:-45.5,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:35.625,x:199.95,y:-48.1,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:0.6586,x:201.75,y:-45.2,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4395,x:34.35,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5801,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9644,x:-41.7,y:185.55,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9389,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0023,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.4063,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-86.9691,x:-82.7,y:56.05,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-93.208,x:-95.2,y:141.2,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.6172,x:-94.6,y:141.35,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-73.2982,x:-59.45,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7602,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:7.6289,x:48.35,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.75,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-10.628,x:118.15,y:-12,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:40.0647,x:201.4,y:-36.05,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:5.6302,x:202.95,y:-33,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4439,x:34.4,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5906,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.973,x:-41.7,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9416,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0085,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.1766,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-86.8487,x:-82.55,y:56.2,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-93.0912,x:-95.25,y:141.25,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.5032,x:-94.6,y:141.4,regY:0.2}},{t:this.instance,p:{regX:33.4,scaleX:0.9973,scaleY:0.9973,rotation:-73.4219,x:-59.4,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7593,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:12.6473,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-6.4965,x:117.1,y:-5.9,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:44.5039,x:201.85,y:-23.85,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:10.6022,x:203.2,y:-20.75,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4491,x:34.45,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6022,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9814,x:-41.7,y:185.55,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9433,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0139,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.9469,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-86.7302,x:-82.4,y:56.15,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-92.9753,x:-95.25,y:141.3,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.39,x:-94.65,y:141.35,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-73.547,x:-59.45,regY:9.8,y:-12.55}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7576,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:17.6655,x:48.55,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:-2.3661,x:115.6,y:0.05,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:48.9445,x:201.3,y:-11.85,regY:13.2,regX:-7.4}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:15.5752,x:202.45,y:-8.6,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4535,x:34.4,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.6117,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9895,x:-41.75,y:185.5,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9459,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0201,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.719,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-86.6134,x:-82.2,y:56.25,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-8.9,rotation:-92.8585,x:-95.15,y:141.25,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.2755,x:-94.65,y:141.4,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-73.6705,x:-59.35,regY:9.9,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7558,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:22.6833,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:1.7598,x:113.5,y:5.8,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:53.3834,x:199.95,y:0.15,regY:13.1,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:20.5474,x:200.75,y:3.5,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4579,x:34.5,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6225,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9967,x:-41.75,y:185.5,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9485,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0254,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:1.4886,x:-5.75,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-86.4939,x:-82.1,y:56.3,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-8.9,rotation:-92.7418,x:-95.2,y:141.25,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.1626,x:-94.7,y:141.45,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-73.7953,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7541,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:27.7015,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:5.8915,x:110.95,y:11.3,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:57.822,x:197.5,y:11.95,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:25.5194,x:198.1,y:15.3,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4623,x:34.55,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6329,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:21.0058,x:-41.7,y:185.5,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9503,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0318,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:1.2598,x:-5.8,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-86.377,x:-81.9,y:56.35,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-92.625,x:-95.4,y:141.3,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-112.0485,x:-94.65,y:141.6,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-73.9205,x:-59.45,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7523,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:32.7191,x:48.55,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:10.0221,x:107.85,y:16.7,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:62.2618,x:194.2,y:23.5,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:30.4915,x:194.5,y:26.95,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4676,x:34.55,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6427,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:21.014,x:-41.7,y:185.5,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.953,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0361,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.0303,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.9,rotation:-86.2576,x:-81.75,y:56.3,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-92.5091,x:-95.35,y:141.4,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.9348,x:-94.7,y:141.55,regY:0.2}},{t:this.instance,p:{regX:33.4,scaleX:0.9973,scaleY:0.9973,rotation:-74.0436,x:-59.35,regY:9.8,y:-12.55}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7506,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:37.737,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:14.1545,x:104.35,y:21.7,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:66.7009,x:189.9,y:34.75,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10,scaleX:0.9969,scaleY:0.9969,rotation:35.4642,x:190.15,y:38.25,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.472,x:34.6,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6533,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:21.0223,x:-41.7,y:185.5,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9548,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0425,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.8025,x:-5.95,y:-81.25}},{t:this.instance_3,p:{regX:43.8,rotation:-86.1389,x:-81.6,y:56.5,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-92.3925,x:-95.4,y:141.35,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.8223,x:-94.75,y:141.55,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-74.1685,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7488,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:42.7564,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:18.2852,x:100.4,y:26.45,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:71.1407,x:184.9,y:45.65,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:40.4356,x:184.7,y:49.05,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4764,x:34.55,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6638,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:21.0303,x:-41.75,y:185.5,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9574,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0477,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.5721,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-86.0203,x:-81.45,y:56.55,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-92.2758,x:-95.45,y:141.4,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.7069,x:-94.75,y:141.65,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-74.2934,x:-59.45,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7471,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:47.7747,x:48.4,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:22.4167,x:96.1,y:30.8,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:75.5811,x:178.95,y:56.05,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:45.408,x:178.5,y:59.45,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4816,x:34.45,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6745,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:21.0381,x:-41.8,y:185.5,scaleX:0.9948,scaleY:0.9948,regX:1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.96,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0549,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.3425,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-85.9025,x:-81.35,y:56.5,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-8.9,rotation:-92.1608,x:-95.3,y:141.4,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.5928,x:-94.75,y:141.65,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-74.4172,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7453,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:52.7919,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:26.5486,x:91.35,y:34.8,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:80.0208,x:172.2,y:65.95,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:50.3798,x:171.45,y:69.3,regY:11.1}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.486,x:34.5,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6851,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:21.0468,x:-41.75,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9617,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0602,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.113,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-85.7838,x:-81.15,y:56.65,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-8.9,rotation:-92.0433,x:-95.35,y:141.45,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.4794,x:-94.8,y:141.7,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-74.5421,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7445,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:57.8103,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:30.6796,x:86.45,y:38.25,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:84.4604,x:164.65,y:75.2,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:55.3523,x:163.8,y:78.45,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4904,x:34.45,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6957,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:21.0551,x:-41.75,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9644,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0665,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.1104,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-85.6651,x:-81,y:56.65,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-91.9266,x:-95.5,y:141.45,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.3656,x:-94.8,y:141.7,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-74.6665,x:-59.4,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7427,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:62.8277,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.8,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:34.8109,x:81.1,y:41.45,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:88.8994,x:156.55,y:83.8,regY:13.2,regX:-7.4}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:60.325,x:155.3,y:87.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4948,x:34.45,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7063,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:21.0638,x:-41.8,y:185.65,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.967,x:-30.15,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0719,x:24.4,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.3399,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-85.5472,x:-80.9,y:56.7,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-91.8108,x:-95.5,y:141.5,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.2529,x:-94.85,y:141.65,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-74.7902,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.741,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:64.2731,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.8,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:38.1137,x:79.45,y:42.2,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:92.5071,x:152.35,y:89.05,regY:13.2,regX:-7.2}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:64.4684,x:150.95,y:92,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5001,x:34.5,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7167,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:21.0721,x:-41.8,y:185.65,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9697,x:-30.15,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0773,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.5694,x:-5.95,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-85.4294,x:-80.65,y:56.75,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-91.6941,x:-95.55,y:141.5,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.139,x:-94.95,y:141.65,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-74.9144,x:-59.4,regY:9.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7392,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:65.7177,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.8,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:41.4163,x:77.95,y:43.05,regX:-45.5,regY:12.2}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:96.1186,x:147.95,y:93.85,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:68.6117,x:146.45,y:96.75,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5036,x:34.5,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7274,x:-4.1,y:-59.7}},{t:this.instance_8,p:{rotation:21.0807,x:-41.9,y:185.65,scaleX:0.9948,scaleY:0.9948,regX:1,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9723,x:-30.2,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0835,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.7998,x:-6,y:-81.15}},{t:this.instance_3,p:{regX:43.8,rotation:-85.3097,x:-80.55,y:56.8,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-8.9,rotation:-91.5784,x:-95.45,y:141.5,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.0252,x:-94.95,y:141.75,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-75.0386,x:-59.45,regY:9.8,y:-12.55}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7375,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:67.1627,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.8,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:44.721,x:76.35,y:43.75,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:99.73,x:143.4,y:98.65,regY:13.1,regX:-7.2}},{t:this.instance_11,p:{regX:-10,scaleX:0.9969,scaleY:0.9969,rotation:72.757,x:141.65,y:101.5,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5089,x:34.6,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7379,x:-4.1,y:-59.7}},{t:this.instance_8,p:{rotation:21.0904,x:-41.8,y:185.65,scaleX:0.9949,scaleY:0.9949,regX:1.1,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9749,x:-30.2,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0889,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.0285,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-85.191,x:-80.4,y:56.85,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-8.9,rotation:-91.4626,x:-95.5,y:141.55,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-110.9116,x:-94.95,y:141.8,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-75.1632,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7366,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:68.6076,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:48.0236,x:74.65,y:44.45,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:103.3414,x:138.5,y:102.8,regY:13.2,regX:-7.4}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:76.9005,x:136.45,y:105.75,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5133,x:34.65,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7478,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.0974,x:-41.85,y:185.65,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9775,x:-30.2,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0959,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.2572,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-85.073,x:-80.3,y:56.9,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-8.9,rotation:-91.3451,x:-95.55,y:141.5,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.7978,x:-95,y:141.7,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-75.2883,x:-59.4,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7357,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:70.052,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:51.3276,x:73,y:45.1,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:106.9525,x:133.25,y:107.3,regY:13.2,regX:-7.2}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:81.0436,x:131.2,y:109.8,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5186,x:34.65,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7583,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.106,x:-41.8,y:185.65,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9803,x:-30.2,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.102,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.4868,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-84.9551,x:-80.1,y:56.9,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-91.2302,x:-95.7,y:141.55,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.6834,x:-95.05,y:141.7,regY:0.2}},{t:this.instance,p:{regX:33.4,scaleX:0.9973,scaleY:0.9973,rotation:-75.4114,x:-59.4,regY:9.8,y:-12.65}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.734,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:71.4966,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:54.6309,x:71.4,y:45.6,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:110.5642,x:128,y:111.15,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:85.1887,x:125.5,y:113.65,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5229,x:34.7,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7687,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1144,x:-41.8,y:185.65,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9829,x:-30.1,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1074,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:-1.7173,x:-5.85,y:-81.25}},{t:this.instance_3,p:{regX:43.8,rotation:-84.838,x:-79.9,y:56.95,scaleX:0.997,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-91.1136,x:-95.75,y:141.6,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.5699,x:-95.1,y:141.75,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-75.5355,x:-59.4,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7322,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:72.9419,x:48.45,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:57.9345,x:69.75,y:46.15,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:114.1756,x:122.55,y:114.85,regY:13.1,regX:-7.3}},{t:this.instance_11,p:{regX:-10,scaleX:0.997,scaleY:0.997,rotation:89.3318,x:120,y:117.35,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5282,x:34.7,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7804,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.123,x:-41.8,y:185.65,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9856,x:-30.1,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1136,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.9452,x:-6,y:-81.25}},{t:this.instance_3,p:{regX:43.9,rotation:-84.7191,x:-79.75,y:56.9,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-90.996,x:-95.75,y:141.55,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.4559,x:-95.15,y:141.75,regY:0.2}},{t:this.instance,p:{regX:33.2,scaleX:0.9973,scaleY:0.9973,rotation:-75.6603,x:-59.5,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7304,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:74.387,x:48.35,scaleX:0.9974,scaleY:0.9974,regY:13.2,y:-20.8,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:61.2383,x:68.05,y:46.8,regX:-45.5,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:117.7872,x:116.65,y:118.25,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:93.4713,x:114.1,y:120.45,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5326,x:34.7,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7899,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1313,x:-41.9,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9881,x:-30.1,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1198,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.1758,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-84.6002,x:-79.65,y:57.05,scaleX:0.9971,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-8.9,rotation:-90.882,x:-95.65,y:141.6,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-110.3446,x:-95.1,y:141.85,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-75.7843,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7296,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:75.8309,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.5403,x:66.25,y:47.2,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:121.3983,x:110.75,y:121.5,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:97.6159,x:108.05,y:123.45,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5379,x:34.6,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8007,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.14,x:-41.9,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9899,x:-30.1,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1251,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.4037,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-84.4821,x:-79.55,y:57.1,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-8.9,rotation:-90.7654,x:-95.7,y:141.6,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.2294,x:-95.2,y:141.75,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-75.9091,x:-59.3,regY:9.9,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7278,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:77.2766,x:48.5,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.75,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:67.844,x:64.6,y:47.65,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:125.0097,x:104.8,y:124.35,regY:13.1,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:101.7597,x:101.85,y:126.15,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5423,x:34.6,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8111,x:-4.1,y:-59.7}},{t:this.instance_8,p:{rotation:21.1491,x:-41.8,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9926,x:-30.15,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1305,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.6334,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-84.3631,x:-79.35,y:57.15,scaleX:0.997,regY:7.9,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-90.6479,x:-95.85,y:141.6,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.1157,x:-95.2,y:141.75,regY:0.2}},{t:this.instance,p:{regX:33.4,scaleX:0.9973,scaleY:0.9973,rotation:-76.032,x:-59.4,regY:9.8,y:-12.6}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7261,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:78.7203,x:48.55,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:71.1475,x:62.85,y:48.05,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:128.6209,x:98.55,y:126.9,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.997,scaleY:0.997,rotation:105.9042,x:95.55,y:128.55,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5476,x:34.6,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8219,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1566,x:-41.8,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9953,x:-30.15,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.135,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.8632,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-84.2451,x:-79.1,y:57.2,scaleX:0.997,regY:8,scaleY:0.997}},{t:this.instance_2,p:{regY:-9,rotation:-90.5331,x:-95.9,y:141.7,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.0021,x:-95.3,y:141.8,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-76.157,x:-59.45,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7243,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:80.1663,x:48.5,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:74.4521,x:61.25,y:48.35,regX:-45.6,regY:12.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:132.2326,x:92.15,y:129.15,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:110.0469,x:89.1,y:130.6,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.552,x:34.65,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8324,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:21.1648,x:-41.85,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9979,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1412,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.0922,x:-6.05,y:-81.25}},{t:this.instance_3,p:{regX:43.8,rotation:-84.127,x:-79.05,y:57.2,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-90.4165,x:-95.9,y:141.6,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-109.8879,x:-95.3,y:141.75,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-76.2812,x:-59.3,regY:9.9,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7234,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:81.6108,x:48.55,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.85,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:77.7547,x:59.35,y:48.65,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:135.8434,x:85.65,y:131.2,regY:13.2,regX:-7.2}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:114.1909,x:82.6,y:132.35,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5564,x:34.65,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.842,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:21.1736,x:-41.85,y:185.6,scaleX:0.9948,scaleY:0.9948,regX:1.1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0004,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1483,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.3221,x:-6.05,y:-81.25}},{t:this.instance_3,p:{regX:43.9,rotation:-84.008,x:-78.9,y:57.15,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-8.9,rotation:-90.2999,x:-95.8,y:141.7,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.7741,x:-95.3,y:141.9,regY:0.2}},{t:this.instance,p:{regX:33.4,scaleX:0.9973,scaleY:0.9973,rotation:-76.4047,x:-59.4,regY:9.8,y:-12.6}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7217,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:83.056,x:48.55,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.65,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:81.0571,x:57.65,y:49.05,regX:-45.5,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:139.4563,x:79.25,y:132.7,regY:13.2,regX:-7.4}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:118.336,x:75.95,y:133.8,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5616,x:34.65,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8519,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1814,x:-41.85,y:185.5,scaleX:0.9948,scaleY:0.9948,regX:1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0031,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1536,x:24.5,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.5511,x:-6.1,y:-81.25}},{t:this.instance_3,p:{regX:43.8,rotation:-83.89,x:-78.8,y:57.35,scaleX:0.9971,regY:7.9,scaleY:0.9971}},{t:this.instance_2,p:{regY:-8.9,rotation:-90.1841,x:-95.85,y:141.65,regX:4.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.6615,x:-95.3,y:141.85,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-76.5291,x:-59.5,regY:9.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7199,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:84.5011,x:48.55,scaleX:0.9974,scaleY:0.9974,regY:13.1,y:-20.7,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.3606,x:55.9,y:49.1,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:143.0663,x:72.5,y:134.15,regY:13.2,regX:-7.2}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:122.4795,x:69.25,y:134.85,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.566,x:34.7,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8623,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1889,x:-41.85,y:185.5,scaleX:0.9948,scaleY:0.9948,regX:1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0058,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.16,x:24.5,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.7811,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-83.7708,x:-78.55,y:57.4,scaleX:0.997,regY:8,scaleY:0.997}},{t:this.instance_2,p:{regY:-8.9,rotation:-90.0675,x:-95.9,y:141.7,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-109.5466,x:-95.35,y:141.8,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-76.6535,x:-59.5,regY:9.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7182,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.9445,x:48.55,scaleX:0.9975,scaleY:0.9975,regY:13.1,y:-20.8,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.6638,x:54.1,y:49.25,regX:-45.6,regY:12.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:146.6784,x:65.9,y:135.05,regY:13.2,regX:-7.3}},{t:this.instance_11,p:{regX:-10.1,scaleX:0.9969,scaleY:0.9969,rotation:126.6244,x:62.55,y:135.65,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5713,x:34.85,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8728,x:-4.25,y:-59.7}},{t:this.instance_8,p:{rotation:21.1981,x:-41.9,y:185.55,scaleX:0.9948,scaleY:0.9948,regX:1,regY:-51.4}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0085,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1662,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-4.0086,x:-6.15,y:-81.2}},{t:this.instance_3,p:{regX:43.8,rotation:-83.6519,x:-78.4,y:57.4,scaleX:0.9971,regY:8,scaleY:0.9971}},{t:this.instance_2,p:{regY:-9,rotation:-89.9562,x:-96.05,y:141.65,regX:4.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-109.4351,x:-95.4,y:141.8,regY:0.2}},{t:this.instance,p:{regX:33.3,scaleX:0.9973,scaleY:0.9973,rotation:-76.777,x:-59.5,regY:9.8,y:-12.45}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-106.6,-204.2,344.6,500.7);


(lib.CharacterCivilian_04 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-59.1,-18.2,0.9977,0.9977,-74.6276,0,0,33.5,10.2);

	this.instance_1 = new lib.ch1_hand_rcopy_2("synched",0);
	this.instance_1.setTransform(-32.95,122.55,0.9972,0.9972,-131.1087,0,0,14.3,-0.5);

	this.instance_2 = new lib.ch1_thumb_rcopy_2("synched",0);
	this.instance_2.setTransform(-32.7,122.65,0.9975,0.9975,-110.4686,0,0,4.4,-9.1);

	this.instance_3 = new lib.ch1_lArm_rcopy_2("synched",0);
	this.instance_3.setTransform(-80.85,50.7,0.9975,0.9975,-128.9062,0,0,44.4,7.6);

	this.instance_4 = new lib.ch1_headcopy("synched",0);
	this.instance_4.setTransform(1.25,-81,0.9982,0.9982,-11.8622,0,0,1.9,50.9);

	this.instance_5 = new lib.ch1_uBodycopy_2("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy_2("synched",0);
	this.instance_6.setTransform(24,88.3,0.9948,0.9948,-8.9749,0,0,-0.2,4.5);

	this.instance_7 = new lib.ch1_uLeg_rcopy_2("synched",0);
	this.instance_7.setTransform(-30.2,90.05,0.9957,0.9957,3.9377,0,0,1.4,-42.6);

	this.instance_8 = new lib.ch1_lLeg_rcopy_2("synched",0);
	this.instance_8.setTransform(-41.95,185.95,0.9953,0.9953,2.5658,0,0,0.8,-51);

	this.instance_9 = new lib.ch1_neckcopy_2("synched",0);
	this.instance_9.setTransform(-4.15,-59.45,0.9983,0.9983,11.3524,0,0,-1.4,7.5);

	this.instance_10 = new lib.ch1_lLeg_lcopy_2("synched",0);
	this.instance_10.setTransform(33.6,185.6,0.995,0.995,-4.2609,0,0,3.2,-50.6);

	this.instance_11 = new lib.ch1_hand_lcopy_2("synched",0);
	this.instance_11.setTransform(83.45,134.45,0.9973,0.9973,55.1283,0,0,-10.5,10.8);

	this.instance_12 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_12.setTransform(82.85,130.8,0.9973,0.9973,65.9126,0,0,-7.9,13.5);

	this.instance_13 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_13.setTransform(54.5,49.65,0.9975,0.9975,76.1836,0,0,-45.6,12.6);

	this.instance_14 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_14.setTransform(47.75,-21.2,0.9978,0.9978,85.4705,0,0,-32.8,13.8);

	this.instance_15 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_15.setTransform(-9.3,49.05,0.9995,0.9995,1.7768,0,0,-4,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7768,y:49.05,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:85.4705,x:47.75,y:-21.2,regX:-32.8}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9975,scaleY:0.9975,rotation:76.1836,x:54.5,y:49.65,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:65.9126,x:82.85,y:130.8,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:55.1283,x:83.45,y:134.45,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2609,x:33.6,y:185.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.3524,y:-59.45,x:-4.15}},{t:this.instance_8,p:{regX:0.8,scaleX:0.9953,scaleY:0.9953,rotation:2.5658,y:185.95,x:-41.95}},{t:this.instance_7,p:{regX:1.4,regY:-42.6,scaleX:0.9957,scaleY:0.9957,rotation:3.9377,x:-30.2,y:90.05}},{t:this.instance_6,p:{rotation:-8.9749,x:24,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.9,scaleX:0.9982,scaleY:0.9982,rotation:-11.8622,x:1.25,y:-81}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-128.9062,x:-80.85,y:50.7,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-110.4686,x:-32.7,y:122.65,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-131.1087,x:-32.95,y:122.55,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.2,scaleX:0.9977,scaleY:0.9977,rotation:-74.6276,y:-18.2,x:-59.1}}]}).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:84.8221,x:47.8,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:70.0559,x:55.3,y:49.55,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:59.7891,x:92.15,y:127.15,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:49.3423,x:93.25,y:130.75,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.3238,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.937,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9747,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.669,x:1.4,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.2951,x:-82.25,y:50.2,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.8546,x:-34.8,y:122.65,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.4967,x:-35,y:122.45,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-73.4599,y:-18.25,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:84.1715,x:47.8,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:63.9293,x:56.1,y:49.45,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:53.6633,x:101.05,y:122.75,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:43.5573,x:102.5,y:126.1,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.2952,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.937,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9747,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.4747,x:1.45,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.6806,x:-83.6,y:49.7,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.2421,x:-36.95,y:122.65,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.8851,x:-37.15,y:122.5,regX:14.4,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-72.2906,y:-18.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:83.5211,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:57.8015,x:56.8,y:49.4,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:47.5381,x:109.35,y:117.4,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:37.7719,x:111.2,y:120.65,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.2675,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.2802,x:1.4,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.0676,x:-84.95,y:49.2,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.6306,x:-39.1,y:122.6,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.271,x:-39.25,y:122.5,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-71.1225,y:-18.25,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:82.8716,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:51.6749,x:57.7,y:49.25,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:41.4127,x:117.15,y:111.15,regY:13.4,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:31.9848,x:119.2,y:114.25,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.239,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.0863,x:1.4,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.4553,x:-86.3,y:48.6,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.0156,x:-41.25,y:122.6,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.6576,x:-41.45,y:122.45,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-69.9527,y:-18.3,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:82.2202,x:47.7,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:45.5461,x:58.5,y:49.1,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:35.2878,x:124.2,y:104.5,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:26.2,x:126.65,y:107.25,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.2112,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.8918,x:1.45,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.8431,x:-87.7,y:48.05,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.4029,x:-43.35,y:122.45,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.0452,x:-43.6,y:122.35,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-68.784,y:-18.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:81.5714,x:47.75,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:39.4174,x:59.25,y:49,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:29.1618,x:130.55,y:96.95,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:20.4131,x:133.35,y:99.45,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.1827,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.6975,x:1.4,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.2296,x:-88.95,y:47.5,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.791,x:-45.5,y:122.3,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.4321,x:-45.65,y:122.2,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-67.6151,y:-18.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:80.9206,x:47.75,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:33.2904,x:60.1,y:48.85,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:23.0373,x:136.1,y:88.95,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:14.6271,x:139,y:91.15,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.155,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.5039,x:1.4,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.6173,x:-90.35,y:46.8,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.1786,x:-47.6,y:122.25,regX:4.3,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.8206,x:-47.75,y:122,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-66.4456,y:-18.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:80.2696,x:47.8,y:-21.2,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:27.1636,x:60.75,y:48.75,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:16.9128,x:140.7,y:80.5,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:8.8404,x:143.95,y:82.35,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.1265,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.3091,x:1.3,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.0049,x:-91.65,y:46.15,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-105.5635,x:-49.8,y:121.95,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.2075,x:-49.9,y:121.85,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-65.2769,y:-18.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:79.62,x:47.75,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:21.0364,x:61.65,y:48.55,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:10.7873,x:144.45,y:71.6,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:3.0549,x:147.8,y:73.15,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.0997,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.1151,x:1.45,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-123.391,x:-92.9,y:45.55,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-104.9519,x:-51.85,y:121.75,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-125.594,x:-52.05,y:121.5,regX:14.4,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-64.1075,y:-18.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:78.9697,x:47.7,y:-21.25,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:14.9089,x:62.4,y:48.35,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:4.6621,x:147.2,y:62.3,regY:13.4,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-2.7257,x:150.75,y:63.6,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.071,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.9211,x:1.45,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-122.7784,x:-94.3,y:44.7,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-104.3385,x:-53.95,y:121.45,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-124.98,x:-54.1,y:121.35,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-62.9384,y:-18.3,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:78.3192,x:47.65,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:8.7803,x:63.2,y:48.1,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:-1.4581,x:149,y:53.1,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-8.5123,x:152.6,y:53.9,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.0434,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.7263,x:1.35,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-122.1663,x:-95.5,y:44,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-103.7244,x:-56.05,y:121.15,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-124.3683,x:-56.15,y:121.05,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-61.7702,y:-18.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:77.6696,x:47.75,y:-21.2,regX:-32.7}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9974,scaleY:0.9974,rotation:2.6524,x:63.85,y:48,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:-7.5833,x:149.8,y:43.7,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-14.2976,x:153.45,y:44.1,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.0148,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.5329,x:1.45,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-121.5534,x:-96.75,y:43.3,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-103.1114,x:-58.15,y:120.85,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-123.755,x:-58.25,y:120.65,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-60.6005,y:-18.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:77.0184,x:47.75,y:-21.4,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-3.4714,x:64.7,y:47.8,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:-13.7092,x:149.55,y:34.4,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-20.0833,x:153.25,y:34.4,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.988,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-9.3375,x:1.45,y:-80.85}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-120.9394,x:-97.95,y:42.5,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-102.5003,x:-60.15,y:120.4,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-123.1412,x:-60.35,y:120.2,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.2,scaleX:0.9976,scaleY:0.9976,rotation:-59.4312,y:-18.3,x:-59}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:76.3693,x:47.7,y:-21.4,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-9.5981,x:65.55,y:47.55,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-19.8332,x:148.45,y:25.2,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:-25.8695,x:152.15,y:24.75,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.9587,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.1431,x:1.3,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-120.3279,x:-99.15,y:41.65,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-101.886,x:-62.25,y:120,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-122.5293,x:-62.35,y:119.85,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-58.2626,y:-18.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:75.72,x:47.75,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-15.7251,x:66.25,y:47.35,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-25.9585,x:146.4,y:16.2,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-31.6548,x:150,y:15.4,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.931,y:-59.35,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.9,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.9487,x:1.45,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-119.7137,x:-100.35,y:40.9,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-101.273,x:-64.25,y:119.6,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-121.917,x:-64.35,y:119.4,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-57.0934,y:-18.3,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:71.6072,x:47.65,y:-21.4,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:-16.9003,x:71.15,y:45.85,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-27.13,x:150.6,y:13.25,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:-32.4883,x:154.1,y:12.2,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.9025,y:-59.35,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.9,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.7556,x:1.35,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-119.1025,x:-101.65,y:39.95,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-100.6598,x:-66.3,y:119.25,regX:4.3,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-121.303,x:-66.45,y:118.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-55.9239,y:-18.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:67.4951,x:47.65,y:-21.4,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-18.0757,x:75.85,y:44.05,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-28.303,x:154.65,y:9.65,regY:13.4,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:-33.3219,x:158.15,y:8.8,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.8748,y:-59.35,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.9,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.5624,x:1.45,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-118.4882,x:-102.75,y:39.15,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-100.0484,x:-68.35,y:118.75,regX:4.3,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-120.691,x:-68.55,y:118.45,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-54.7553,y:-18.4,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:63.3836,x:47.7,y:-21.4,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-19.2507,x:80.5,y:41.8,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-29.4759,x:158.55,y:5.95,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-34.1552,x:162.1,y:4.95,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.8463,y:-59.35,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.9,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.3674,x:1.45,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-117.8744,x:-104,y:38.2,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-99.4347,x:-70.35,y:118.05,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-120.0786,x:-70.5,y:117.8,regX:14.4,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-53.5858,y:-18.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:59.2722,x:47.7,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-20.4261,x:84.9,y:39.4,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-30.6476,x:162.15,y:1.9,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:-34.9879,x:165.75,y:0.7,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.8187,y:-59.35,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.9,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.1727,x:1.45,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-117.2621,x:-105.1,y:37.35,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-98.8213,x:-72.35,y:117.5,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-119.4656,x:-72.55,y:117.35,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-52.4169,y:-18.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:55.1598,x:47.6,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-21.6006,x:89.25,y:36.5,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-31.8206,x:165.7,y:-2.5,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:-35.8196,x:169.15,y:-3.6,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.791,y:-59.35,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.9,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.98,x:1.4,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-116.6501,x:-106.2,y:36.35,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-98.2088,x:-74.4,y:116.9,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-118.8525,x:-74.6,y:116.6,regX:14.4,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-51.2485,y:-18.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:51.0483,x:47.65,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-22.7756,x:93.15,y:33.35,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-32.9932,x:168.95,y:-7.25,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:-36.6532,x:172.4,y:-8.4,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7625,y:-59.35,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.9,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-7.7846,x:1.45,y:-80.85}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-116.037,x:-107.35,y:35.35,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-97.5956,x:-76.35,y:116.3,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-118.24,x:-76.55,y:116.1,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-50.0783,y:-18.4,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:46.9361,x:47.7,y:-21.2,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-23.9507,x:96.95,y:29.95,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:-34.1647,x:171.85,y:-12.2,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:-37.4862,x:175.25,y:-13.6,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7348,y:-59.35,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.591,x:1.4,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-115.4235,x:-108.4,y:34.4,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-96.9823,x:-78.3,y:115.6,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-117.6277,x:-78.55,y:115.4,regX:14.4,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-48.9096,y:-18.4,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:42.8246,x:47.7,y:-21.2,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-25.1263,x:100.55,y:26.4,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-35.3386,x:174.55,y:-17.35,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:-38.3196,x:178,y:-18.7,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7074,y:-59.35,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-7.3974,x:1.4,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-114.811,x:-109.45,y:33.35,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-96.3706,x:-80.25,y:114.9,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-117.014,x:-80.45,y:114.75,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-47.7408,y:-18.25,x:-59.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:38.7124,x:47.65,y:-21.2,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-26.3008,x:103.8,y:22.5,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-36.5103,x:176.85,y:-22.75,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:-39.1539,x:180.3,y:-24.25,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.6788,y:-59.35,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.2024,x:1.4,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-114.1967,x:-110.65,y:32.4,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-95.7572,x:-82.3,y:114.2,regX:4.4,regY:-9.2}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-116.4011,x:-82.3,y:114,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-46.5705,y:-18.2,x:-59.15}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:40.9666,x:47.6,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-21.6147,x:102.05,y:24.65,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-31.8214,x:178.6,y:-14.45,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-34.1275,x:182.05,y:-15.75,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.652,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.0089,x:1.4,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-114.4862,x:-109.4,y:33.45,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-96.0453,x:-80.65,y:115.2,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-116.6882,x:-80.85,y:114.8,regX:14.4,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-47.8518,y:-18.3,x:-59.15}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:43.2214,x:47.6,y:-21.2,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:-16.9289,x:100.2,y:26.65,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-27.1332,x:179.7,y:-5.95,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.099,x:183.3,y:-6.9,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.6227,y:-59.35,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.815,x:1.35,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-114.7733,x:-108.25,y:34.55,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-96.3327,x:-79.05,y:116.15,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-116.9764,x:-79.2,y:116,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-49.1315,y:-18.35,x:-59.15}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:45.4734,x:47.65,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-12.2432,x:98.3,y:28.7,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:-22.4456,x:180.2,y:2.6,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-24.0715,x:183.85,y:2.1,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.5959,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.621,x:1.3,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-115.0604,x:-107.05,y:35.75,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-96.6195,x:-77.4,y:117.1,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-117.2642,x:-77.6,y:116.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-50.4125,y:-18.4,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:47.7274,x:47.6,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:-7.5563,x:96.3,y:30.6,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:-17.7571,x:180.05,y:11.35,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-19.0435,x:183.7,y:11.1,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.5682,y:-59.35,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-6.427,x:1.35,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-115.347,x:-105.85,y:36.7,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-96.909,x:-75.8,y:118,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-117.5525,x:-76,y:117.85,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-51.6937,y:-18.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:49.9811,x:47.65,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:-2.87,x:94.2,y:32.5,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-13.0679,x:179.2,y:19.9,regY:13.4,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-14.0152,x:182.95,y:20.05,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.5397,y:-59.4,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.2314,x:1.3,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-115.6364,x:-104.6,y:37.7,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-97.1969,x:-74.15,y:118.9,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-117.8399,x:-74.3,y:118.7,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-52.9746,y:-18.4,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:52.234,x:47.65,y:-21.2,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:1.8103,x:92.1,y:34.3,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-8.3794,x:177.85,y:28.75,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-8.9867,x:181.4,y:29.15,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.5131,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.0383,x:1.3,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-115.9233,x:-103.35,y:38.8,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-97.4833,x:-72.45,y:119.75,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-118.1271,x:-72.65,y:119.55,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-54.2546,y:-18.3,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.9,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:54.4876,x:47.7,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:6.4975,x:89.85,y:35.95,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:-3.6899,x:175.8,y:37.5,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-3.9587,x:179.4,y:38.15,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.4837,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.8437,x:1.25,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-116.2111,x:-102.05,y:39.65,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-97.7716,x:-70.8,y:120.6,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-118.415,x:-70.95,y:120.35,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-55.5353,y:-18.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.9,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:56.7416,x:47.75,y:-21.2,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:11.1832,x:87.6,y:37.65,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:0.9933,x:173,y:46.15,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:1.0643,x:176.65,y:47.1,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.5,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.456,y:-59.4,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.6501,x:1.25,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-116.4976,x:-100.7,y:40.6,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-98.0592,x:-69.1,y:121.3,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-118.7034,x:-69.3,y:121.15,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-56.8158,y:-18.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.9,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:58.9943,x:47.7,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:15.8705,x:85.25,y:39.15,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:5.6824,x:169.65,y:54.6,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:6.093,x:173.25,y:55.85,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.5,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.4275,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.4556,x:1.2,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-116.7858,x:-99.5,y:41.6,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-98.347,x:-67.5,y:122.15,regX:4.4,regY:-9.2}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-118.9906,x:-67.5,y:121.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-58.0958,y:-18.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.9,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:61.2485,x:47.7,y:-21.4,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:20.5561,x:82.85,y:40.55,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:10.3715,x:165.75,y:62.95,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:11.1193,x:169.2,y:64.45,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.5,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.3999,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.2612,x:1.2,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-117.0735,x:-98.1,y:42.35,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-98.6351,x:-65.6,y:122.8,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-119.2783,x:-65.85,y:122.6,regX:14.4,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-59.3762,y:-18.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.9,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:63.5024,x:47.65,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:25.2427,x:80.4,y:41.85,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:15.0605,x:161.2,y:70.95,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:16.1475,x:164.5,y:72.75,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.5,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.3724,y:-59.45,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.0668,x:1.25,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-117.3616,x:-96.65,y:43.25,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-98.9224,x:-63.85,y:123.5,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-119.5646,x:-64,y:123.35,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.2,scaleX:0.9976,scaleY:0.9976,rotation:-60.657,y:-18.3,x:-59}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7734,y:48.9,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:65.7556,x:47.7,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:29.9287,x:77.9,y:43.15,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:19.7478,x:156.15,y:78.6,regY:13.4,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:21.1748,x:159.2,y:80.65,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.2577,x:33.5,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.3439,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-4.8724,x:1.2,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-117.6482,x:-95.4,y:44.15,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-99.2109,x:-62.05,y:124.2,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-119.8532,x:-62.25,y:124,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-61.9388,y:-18.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.9,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:68.0092,x:47.65,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:34.6142,x:75.35,y:44.25,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:24.4376,x:150.4,y:86.05,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:26.204,x:153.25,y:88.4,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.5,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.3162,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-4.6799,x:1.2,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-117.9372,x:-93.85,y:44.9,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-99.4979,x:-60.25,y:124.8,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-120.1415,x:-60.45,y:124.6,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-63.2186,y:-18.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.9,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:70.2625,x:47.7,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:39.3008,x:72.8,y:45.3,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:29.1254,x:144.15,y:93.05,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:31.2303,x:146.85,y:95.45,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.2577,x:33.5,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.2877,y:-59.5,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-4.4848,x:1.15,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-118.2246,x:-92.35,y:45.65,regX:44.3,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-99.785,x:-58.45,y:125.4,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-120.428,x:-58.6,y:125.15,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.2,scaleX:0.9976,scaleY:0.9976,rotation:-64.4995,y:-18.2,x:-58.95}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7716,y:48.9,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:70.7833,x:47.75,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:40.5727,x:72.3,y:45.55,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:30.3933,x:142.45,y:94.9,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:32.0503,x:145.05,y:97.55,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2682,x:33.55,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.3287,y:-59.45,x:-4.05}},{t:this.instance_8,p:{regX:0.8,scaleX:0.9952,scaleY:0.9952,rotation:2.5721,y:185.85,x:-41.85}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.937,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9792,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-4.7459,x:1.2,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-118.5929,x:-92,y:45.75,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-100.1581,x:-57.55,y:125.4,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-120.7999,x:-57.75,y:125.2,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-64.8437,y:-18.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7699,y:48.9,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:71.3048,x:47.7,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9974,scaleY:0.9974,rotation:41.8461,x:71.45,y:45.65,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:31.6615,x:140.75,y:96.65,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:32.8704,x:143.3,y:99.35,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2796,x:33.6,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.3688,y:-59.45,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5826,y:185.85,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9389,x:-30.3,y:90.05}},{t:this.instance_6,p:{rotation:-8.9854,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.0043,x:1.15,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-118.9616,x:-91.65,y:46.2,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-100.5303,x:-56.6,y:125.4,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-121.1735,x:-56.85,y:125.15,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-65.1887,y:-18.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7681,y:49,x:-9.4,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:71.825,x:47.7,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9974,scaleY:0.9974,rotation:43.1179,x:70.9,y:45.85,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:32.9292,x:139,y:98.45,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:33.6896,x:141.55,y:101.1,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2901,x:33.6,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.4097,y:-59.45,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5932,y:185.85,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9415,x:-30.3,y:90.05}},{t:this.instance_6,p:{rotation:-8.9917,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.2656,x:1.2,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-119.3305,x:-91.3,y:46.4,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-100.9025,x:-55.75,y:125.35,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-121.5437,x:-55.9,y:125.1,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-65.5323,y:-18.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7664,y:49,x:-9.4,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:72.3462,x:47.75,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:44.3907,x:70.3,y:46.25,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:34.1973,x:137.25,y:100.15,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:34.5102,x:139.55,y:102.85,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.3025,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.4497,y:-59.45,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6037,y:185.85,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9442,x:-30.3,y:90.05}},{t:this.instance_6,p:{rotation:-8.9987,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.5259,x:1.15,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-119.6991,x:-90.95,y:46.55,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-101.2749,x:-54.85,y:125.3,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-121.9155,x:-55,y:125.1,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-65.8766,y:-18.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7646,y:49.05,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:72.8687,x:47.7,y:-21.3,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:45.6638,x:69.8,y:46.4,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:35.4651,x:135.4,y:101.8,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:35.3301,x:137.65,y:104.65,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.314,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.4899,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6143,y:185.9,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9468,x:-30.3,y:90.05}},{t:this.instance_6,p:{rotation:-9.0059,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.7856,x:1.2,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-120.0678,x:-90.6,y:46.65,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-101.6469,x:-54.1,y:125.25,regX:4.4,regY:-9.2}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-122.2877,x:-54.15,y:125.05,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-66.2215,y:-18.35,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.762,y:49.05,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:73.3881,x:47.65,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:46.9367,x:69.05,y:46.65,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:36.7328,x:133.65,y:103.4,regY:13.4,regX:-7.8}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:36.1498,x:135.9,y:106.25,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.3255,x:33.6,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.5306,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6249,y:185.85,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9494,x:-30.3,y:90.05}},{t:this.instance_6,p:{rotation:-9.012,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.0471,x:1.25,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-120.4359,x:-90.1,y:46.75,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-102.0185,x:-53.1,y:125.2,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-122.6587,x:-53.2,y:124.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-66.5657,y:-18.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7602,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:73.9105,x:47.75,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:48.2085,x:68.55,y:46.8,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:37.9999,x:131.6,y:105.05,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:36.9695,x:133.85,y:107.95,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.3361,x:33.6,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.571,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6345,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.952,x:-30.3,y:90.1}},{t:this.instance_6,p:{rotation:-9.0192,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.3062,x:1.2,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-120.8046,x:-89.85,y:46.95,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-102.3916,x:-52.2,y:125.15,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-123.031,x:-52.3,y:124.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-66.9096,y:-18.3,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7585,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:74.4304,x:47.7,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:49.4813,x:67.9,y:46.95,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:39.2673,x:129.7,y:106.6,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:37.7894,x:131.95,y:109.6,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.3467,x:33.65,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.6119,y:-59.45,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6451,y:185.85,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9547,x:-30.3,y:90.1}},{t:this.instance_6,p:{rotation:-9.0245,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.5671,x:1.25,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-121.1745,x:-89.4,y:47.2,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-102.7642,x:-51.3,y:125.05,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-123.4029,x:-51.5,y:124.85,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-67.254,y:-18.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7567,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:74.9512,x:47.7,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:50.7547,x:67.3,y:47.15,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:40.5345,x:127.65,y:108.25,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:38.6091,x:129.85,y:111.15,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.3581,x:33.6,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.652,y:-59.45,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6556,y:185.85,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9573,x:-30.3,y:90.1}},{t:this.instance_6,p:{rotation:-9.0325,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.8273,x:1.3,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-121.5427,x:-89,y:47.35,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-103.1352,x:-50.45,y:125.05,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-123.7742,x:-50.5,y:124.75,regX:14.3,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-67.599,y:-18.25,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7541,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:75.4722,x:47.75,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:52.027,x:66.7,y:47.4,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:41.8033,x:125.75,y:109.75,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:39.4276,x:127.8,y:112.75,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.3696,x:33.65,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.6912,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6662,y:185.85,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9599,x:-30.3,y:90.1}},{t:this.instance_6,p:{rotation:-9.038,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.0875,x:1.25,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-121.9107,x:-88.6,y:47.55,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-103.5079,x:-49.55,y:124.95,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-124.1468,x:-49.65,y:124.8,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.2,scaleX:0.9976,scaleY:0.9976,rotation:-67.9437,y:-18.3,x:-58.95}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7523,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:75.9939,x:47.75,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:53.2989,x:66.05,y:47.5,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:43.0717,x:123.7,y:111.15,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:40.2485,x:125.65,y:114.3,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.3802,x:33.65,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7314,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6767,y:185.85,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9626,x:-30.3,y:90.1}},{t:this.instance_6,p:{rotation:-9.045,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.3482,x:1.3,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-122.2794,x:-88.25,y:47.7,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-103.8804,x:-48.6,y:125,regX:4.3,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-124.5181,x:-48.8,y:124.7,regX:14.3,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-68.2878,y:-18.3,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7506,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:76.5153,x:47.7,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:54.5732,x:65.4,y:47.65,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:44.3392,x:121.75,y:112.7,regY:13.5,regX:-7.8}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:41.0686,x:123.55,y:115.75,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.3916,x:33.7,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7723,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.8,scaleX:0.9952,scaleY:0.9952,rotation:2.6873,y:185.8,x:-41.85}},{t:this.instance_7,p:{regX:1.4,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9644,x:-30.15,y:90.1}},{t:this.instance_6,p:{rotation:-9.0513,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.6077,x:1.25,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-122.6485,x:-87.75,y:47.85,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-104.2518,x:-47.7,y:124.8,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-124.8895,x:-47.95,y:124.65,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.2,scaleX:0.9976,scaleY:0.9976,rotation:-68.6316,y:-18.25,x:-58.9}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7488,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:77.0356,x:47.75,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:55.8446,x:64.75,y:47.85,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:45.6069,x:119.6,y:113.95,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:41.8884,x:121.4,y:117.15,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.4021,x:33.7,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.8123,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6969,y:185.8,x:-42}},{t:this.instance_7,p:{regX:1.4,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9671,x:-30.15,y:90.1}},{t:this.instance_6,p:{rotation:-9.0583,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-7.8685,x:1.3,y:-80.85}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-123.0166,x:-87.5,y:48.1,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-104.6256,x:-46.85,y:124.7,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-125.2615,x:-47.05,y:124.45,regX:14.3,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-68.9765,y:-18.35,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7471,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:77.5566,x:47.75,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:57.1173,x:64.15,y:48,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:46.8743,x:117.4,y:115.4,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:42.7088,x:119.25,y:118.55,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.4145,x:33.75,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.8525,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7066,y:185.8,x:-42}},{t:this.instance_7,p:{regX:1.4,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9697,x:-30.15,y:90.1}},{t:this.instance_6,p:{rotation:-9.0646,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.1286,x:1.3,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-123.3859,x:-87.05,y:48.3,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-104.9974,x:-45.95,y:124.6,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-125.6323,x:-46.15,y:124.4,regX:14.4,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-69.3208,y:-18.25,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7445,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:78.0783,x:47.75,y:-21.2,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:58.3901,x:63.55,y:48.15,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:48.144,x:115.25,y:116.75,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:43.5275,x:117,y:119.9,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.4251,x:33.7,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.8936,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7172,y:185.8,x:-42}},{t:this.instance_7,p:{regX:1.4,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9723,x:-30.15,y:90.1}},{t:this.instance_6,p:{rotation:-9.0726,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.3889,x:1.3,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-123.7533,x:-86.6,y:48.5,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-105.3691,x:-45.05,y:124.5,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.0036,x:-45.15,y:124.3,regX:14.3,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-69.6652,y:-18.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7427,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:78.599,x:47.8,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:59.662,x:62.95,y:48.3,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:49.4107,x:113.1,y:117.95,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:44.3466,x:114.8,y:121.3,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.4365,x:33.75,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.9336,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7277,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.4,regY:-42.5,scaleX:0.9957,scaleY:0.9957,rotation:3.9748,x:-30.15,y:90.1}},{t:this.instance_6,p:{rotation:-9.0797,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.6483,x:1.15,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.1228,x:-86.15,y:48.7,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-105.7419,x:-44.35,y:124.45,regX:4.4,regY:-9.2}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.3763,x:-44.35,y:124.25,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-70.0079,y:-18.25,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.741,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:79.1197,x:47.7,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:60.9344,x:62.25,y:48.45,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:50.6785,x:111,y:119.2,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:45.168,x:112.4,y:122.5,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.448,x:33.75,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.9738,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7383,y:185.8,x:-42.1}},{t:this.instance_7,p:{regX:1.4,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9776,x:-30.15,y:90.1}},{t:this.instance_6,p:{rotation:-9.0859,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.9089,x:1.2,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.4919,x:-85.85,y:48.75,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.1146,x:-43.3,y:124.3,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.7484,x:-43.5,y:124.15,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.2,scaleX:0.9976,scaleY:0.9976,rotation:-70.3547,y:-18.25,x:-58.95}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7392,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:79.6413,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:62.2071,x:61.65,y:48.55,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:51.9452,x:108.75,y:120.4,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:45.9863,x:110.2,y:123.8,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.4585,x:33.8,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.0148,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7497,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9803,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.0922,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.1688,x:1.35,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.861,x:-85.45,y:48.95,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.4857,x:-42.4,y:124.3,regX:4.3,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.1193,x:-42.6,y:124.05,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-70.6981,y:-18.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7366,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:80.162,x:47.8,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:63.4792,x:61,y:48.7,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:53.2134,x:106.5,y:121.55,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:46.8067,x:108,y:124.9,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.4691,x:33.8,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.055,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7603,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9829,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.0984,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.4296,x:1.35,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.2299,x:-85,y:49.15,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.8587,x:-41.55,y:124.05,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.4909,x:-41.75,y:123.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-71.0424,y:-18.25,x:-59}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7357,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:80.6836,x:47.7,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:64.7514,x:60.45,y:48.8,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:54.4814,x:104.35,y:122.75,regY:13.5,regX:-7.8}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:47.6256,x:105.6,y:126.1,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.4805,x:33.8,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.0952,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7699,y:185.8,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9855,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1056,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.6893,x:1.3,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.5974,x:-84.7,y:49.3,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.231,x:-40.6,y:123.9,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.8627,x:-40.85,y:123.8,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-71.3869,y:-18.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.734,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:81.2044,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:66.0245,x:59.65,y:49,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:55.749,x:101.9,y:123.8,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:48.4469,x:103.3,y:127.2,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.492,x:33.8,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.1344,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7805,y:185.8,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9881,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1118,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.9505,x:1.25,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.9667,x:-84.2,y:49.4,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.6031,x:-39.75,y:123.75,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.2343,x:-39.95,y:123.65,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-71.7313,y:-18.25,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7322,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:81.7264,x:47.7,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:67.2967,x:59.1,y:49.05,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:57.0175,x:99.6,y:124.8,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:49.2652,x:100.85,y:128.3,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.5034,x:33.85,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.1754,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7902,y:185.8,x:-42.1}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9908,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1189,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.2101,x:1.4,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.3348,x:-83.9,y:49.6,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.9748,x:-38.95,y:123.65,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.6064,x:-39.1,y:123.5,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.2,scaleX:0.9976,scaleY:0.9976,rotation:-72.0755,y:-18.25,x:-58.95}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7304,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:82.2476,x:47.8,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:68.569,x:58.45,y:49.15,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:58.2852,x:97.35,y:125.8,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:50.0855,x:98.45,y:129.25,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.514,x:33.85,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.2156,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.8007,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9935,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1251,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.4711,x:1.25,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.7039,x:-83.4,y:49.7,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.3476,x:-38.05,y:123.5,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.9782,x:-38.2,y:123.3,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-72.4195,y:-18.25,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7278,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:82.7683,x:47.8,y:-21.2,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:69.8421,x:57.8,y:49.25,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:59.5521,x:95.1,y:126.6,regY:13.4,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:50.9052,x:96.05,y:130.2,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.5263,x:33.9,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.2558,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.8113,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9961,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1332,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.7305,x:1.4,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.072,x:-83,y:49.9,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.7193,x:-37.15,y:123.35,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.3501,x:-37.4,y:123.2,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-72.7638,y:-18.2,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7261,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:83.2891,x:47.8,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9974,scaleY:0.9974,rotation:71.1143,x:57.15,y:49.2,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:60.8197,x:92.7,y:127.5,regY:13.4,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:51.7253,x:93.5,y:131.2,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.5378,x:33.85,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.2969,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.8219,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9987,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1385,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.9918,x:1.4,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.4419,x:-82.65,y:50.1,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.0911,x:-36.3,y:123.2,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.7207,x:-36.5,y:123.05,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-73.1086,y:-18.25,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7243,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:83.8093,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:72.3872,x:56.45,y:49.45,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:62.0873,x:90.25,y:128.55,regY:13.5,regX:-7.8}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:52.5462,x:91.2,y:132.05,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.5493,x:33.9,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.3372,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.8315,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:4.0013,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1456,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.2515,x:1.45,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.8105,x:-82.2,y:50.05,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.4642,x:-35.4,y:123,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.093,x:-35.65,y:122.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-73.4535,y:-18.25,x:-59.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7226,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:84.3309,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:73.6593,x:55.95,y:49.5,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.3561,x:87.8,y:129.3,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:53.3656,x:88.6,y:132.95,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.5598,x:33.9,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.3766,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.8421,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:4.0031,x:-30.2,y:90.1}},{t:this.instance_6,p:{rotation:-9.1527,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.5116,x:1.25,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.1783,x:-81.75,y:50.3,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.8366,x:-34.55,y:122.85,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.4643,x:-34.7,y:122.75,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-73.798,y:-18.3,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7208,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:84.852,x:47.8,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.9322,x:55.25,y:49.55,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:64.6238,x:85.45,y:130.05,regY:13.5,regX:-7.8}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:54.1853,x:86,y:133.65,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.5705,x:33.95,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4168,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.8,scaleX:0.9952,scaleY:0.9952,rotation:2.8517,y:185.8,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:4.0057,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1589,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.7717,x:1.45,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.5471,x:-81.35,y:50.55,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-110.2078,x:-33.65,y:122.85,regX:4.3,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.8369,x:-33.8,y:122.65,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-74.1416,y:-18.25,x:-59.05}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7182,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:85.3727,x:47.85,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:76.204,x:54.6,y:49.7,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:65.8916,x:82.85,y:130.75,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:55.0046,x:83.6,y:134.45,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.5811,x:33.95,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.457,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9953,scaleY:0.9953,rotation:2.8623,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:4.0084,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-9.1661,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-12.0306,x:1.3,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.915,x:-81.05,y:50.7,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-110.5789,x:-32.9,y:122.65,regX:4.4,regY:-9.2}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-131.2072,x:-33.05,y:122.45,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-74.4865,y:-18.2,x:-59.1}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-132.3,-212.6,346.6,510.20000000000005);


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
	this.instance = new lib.ch1_uArm_rcopy2_2("synched",0);
	this.instance.setTransform(-57.25,-23.05,0.9985,0.9985,-62.7935,0,0,35.8,0.4);

	this.instance_1 = new lib.ch1_hand_rcopy2_2("synched",0);
	this.instance_1.setTransform(-36.75,116.85,0.9982,0.9982,-131.3487,0,0,6.3,-1.2);

	this.instance_2 = new lib.ch1_thumb_rcopy2_2("synched",0);
	this.instance_2.setTransform(-42.9,110.4,0.9984,0.9984,-141.6007,0,0,5.4,-8.8);

	this.instance_3 = new lib.ch1_lArm_rcopy2_2("synched",0);
	this.instance_3.setTransform(-93.2,46.9,0.9985,0.9985,-128.2556,0,0,40.2,0.1);

	this.instance_4 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_4.setTransform(-0.6,-79.3,0.9991,0.9991,-0.7928,0,0,0.8,52.6);

	this.instance_5 = new lib.ch1_uBodycopy2_2("synched",0);
	this.instance_5.setTransform(-7.35,-20.5,1,1,0,0,0,-0.1,-24.1);

	this.instance_6 = new lib.ch1_lLeg_rcopy2_2("synched",0);
	this.instance_6.setTransform(-39.85,185.95,0.9982,0.9982,0.1568,0,0,2.9,-54.6);

	this.instance_7 = new lib.ch1_neckcopy2_2("synched",0);
	this.instance_7.setTransform(-4.85,-58.3,0.9991,0.9991,9.8975,0,0,-0.7,8.6);

	this.instance_8 = new lib.ch1_lBodycopy2_2("synched",0);
	this.instance_8.setTransform(-5.6,47.95,1,1,0,0,0,-0.1,-23.3);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_2("synched",0);
	this.instance_9.setTransform(37.4,185.05,0.9978,0.9978,10.1757,0,0,3.8,-53.7);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_2("synched",0);
	this.instance_10.setTransform(20.15,90.65,0.9978,0.9978,-12.9734,0,0,-0.5,1.8);

	this.instance_11 = new lib.ch1_hand_lcopy2_2("synched",0);
	this.instance_11.setTransform(107.85,-16.35,0.9984,0.9984,-62.5272,0,0,-5.4,2.6);

	this.instance_12 = new lib.ch1_thumb_lcopy2_2("synched",0);
	this.instance_12.setTransform(98.95,-9.5,0.9985,0.9985,-55.647,0,0,-6.4,8.2);

	this.instance_13 = new lib.ch1_lArm_lcopy2_2("synched",0);
	this.instance_13.setTransform(45,49.9,0.9984,0.9984,-47.7761,0,0,-40.6,-0.8);

	this.instance_14 = new lib.ch1_uArm_lcopy2_2("synched",0);
	this.instance_14.setTransform(45.4,-26.15,0.9985,0.9985,91.0797,0,0,-33.4,0);

	this.instance_15 = new lib.ch1_uLeg_rcopy2_2("synched",0);
	this.instance_15.setTransform(-22.5,91.55,0.9983,0.9983,7.9054,0,0,2.6,-45.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:2.6,scaleX:0.9983,scaleY:0.9983,rotation:7.9054,y:91.55,x:-22.5}},{t:this.instance_14,p:{regY:0,scaleX:0.9985,scaleY:0.9985,rotation:91.0797,y:-26.15,regX:-33.4,x:45.4}},{t:this.instance_13,p:{regX:-40.6,rotation:-47.7761,x:45,y:49.9}},{t:this.instance_12,p:{scaleX:0.9985,scaleY:0.9985,rotation:-55.647,x:98.95,y:-9.5,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.4,regY:2.6,scaleX:0.9984,scaleY:0.9984,rotation:-62.5272,x:107.85,y:-16.35}},{t:this.instance_10,p:{regX:-0.5,regY:1.8,scaleX:0.9978,scaleY:0.9978,rotation:-12.9734,x:20.15,y:90.65}},{t:this.instance_9,p:{scaleX:0.9978,scaleY:0.9978,rotation:10.1757,x:37.4,y:185.05,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.7,scaleX:0.9991,scaleY:0.9991,rotation:9.8975,x:-4.85,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9982,scaleY:0.9982,rotation:0.1568,x:-39.85,y:185.95,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:-0.7928,y:-79.3,x:-0.6,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9985,scaleY:0.9985,rotation:-128.2556,x:-93.2,y:46.9,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-141.6007,x:-42.9,y:110.4,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-131.3487,x:-36.75,y:116.85,regX:6.3,regY:-1.2}},{t:this.instance,p:{regY:0.4,scaleX:0.9985,scaleY:0.9985,rotation:-62.7935,x:-57.25,y:-23.05,regX:35.8}}]}).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9049,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:86.2425,y:-26.2,regX:-33.4,x:45.4}},{t:this.instance_13,p:{regX:-40.5,rotation:-48.1862,x:51.4,y:49.5}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-56.0571,x:104.9,y:-10.15,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-62.9391,x:113.9,y:-17.05}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9735,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1754,x:37.35,y:185,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.8832,x:-4.85,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1559,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.2472,y:-79.25,x:-0.6,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-125.5141,x:-92.55,y:47.15,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.3,rotation:-138.8581,x:-45.3,y:113,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-128.6066,x:-39.55,y:119.7,regX:6.3,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-63.2908,x:-57.3,y:-23.15,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9049,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:81.4004,y:-26.1,regX:-33.3,x:45.45}},{t:this.instance_13,p:{regX:-40.5,rotation:-48.5968,x:57.75,y:48.85}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-56.4673,x:110.7,y:-11.25,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-63.3492,x:119.75,y:-18.2}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9735,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1754,x:37.35,y:185,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.8689,x:-4.8,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1559,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.7024,y:-79.25,x:-0.65,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-122.7732,x:-91.9,y:47.35,regY:0.2,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-136.1172,x:-48.05,y:115.45,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-125.8652,x:-42.4,y:122.6,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-63.787,x:-57.3,y:-23.05,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9049,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:76.561,y:-26.2,regX:-33.4,x:45.4}},{t:this.instance_13,p:{regX:-40.5,rotation:-49.007,x:64.05,y:47.5}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-56.879,x:116.55,y:-12.95,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-63.7588,x:125.5,y:-19.95}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9735,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1754,x:37.35,y:185,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.8555,x:-4.8,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1559,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.1577,y:-79.45,x:-0.65,regY:52.5}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-120.0314,x:-91.35,y:47.7,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-133.3756,x:-50.65,y:117.8,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-123.125,x:-45.45,y:125.1,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-64.2836,x:-57.35,y:-23,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9041,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:71.7196,y:-26.15,regX:-33.3,x:45.4}},{t:this.instance_13,p:{regX:-40.5,rotation:-49.4187,x:70.2,y:45.7}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-57.2887,x:122.3,y:-15.15,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.2,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-64.1713,x:131.3,y:-22.4}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9735,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1744,x:37.4,y:185,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.8396,x:-4.85,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1559,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.6132,y:-79.3,x:-0.6,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-117.2892,x:-90.75,y:48,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-130.6345,x:-53.4,y:119.85,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-120.3826,x:-48.6,y:127.5,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-64.7814,x:-57.3,y:-23.1,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9041,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:66.8784,y:-26.15,regX:-33.3,x:45.3}},{t:this.instance_13,p:{regX:-40.5,rotation:-49.8293,x:76.15,y:43.35}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-57.6995,x:127.8,y:-17.9,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.8,scaleX:0.9983,scaleY:0.9983,rotation:-64.5826,x:136.75,y:-25}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9735,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1744,x:37.4,y:185,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.8253,x:-4.8,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.155,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.0679,y:-79.4,x:-0.65,regY:52.5}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-114.549,x:-90.05,y:48.3,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.3,rotation:-127.8923,x:-56.25,y:121.9,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-117.6411,x:-51.85,y:129.65,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-65.2774,x:-57.4,y:-23.05,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9041,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:62.0376,y:-26.15,regX:-33.3,x:45.4}},{t:this.instance_13,p:{regX:-40.5,rotation:-50.2408,x:81.9,y:40.5}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-58.1101,x:133.1,y:-21.05,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-64.9927,x:141.9,y:-28.3}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1744,x:37.4,y:185,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.8112,x:-4.8,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.155,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.5229,y:-79.25,x:-0.6,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-111.8074,x:-89.5,y:48.6,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-125.1511,x:-59.2,y:123.7,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-114.899,x:-55.15,y:131.7,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-65.7747,x:-57.35,y:-23.2,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9041,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:57.1962,y:-26.3,regX:-33.4,x:45.4}},{t:this.instance_13,p:{regX:-40.5,rotation:-50.6513,x:87.35,y:37.15}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-58.521,x:138.2,y:-24.7,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.2,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-65.4046,x:146.95,y:-32.2}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1744,x:37.4,y:185,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.7978,x:-4.85,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1542,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.9781,y:-79.3,x:-0.65,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-109.0655,x:-88.85,y:48.8,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.3,rotation:-122.4093,x:-62.15,y:125.4,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-112.1576,x:-58.55,y:133.55,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-66.271,x:-57.3,y:-23.1,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9041,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:52.355,y:-26.3,regX:-33.4,x:45.4}},{t:this.instance_13,p:{regX:-40.5,rotation:-51.0616,x:92.55,y:33.4}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-58.932,x:142.9,y:-28.9,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-65.8153,x:151.6,y:-36.25}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1737,x:37.4,y:185,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.7827,x:-4.85,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1542,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.4335,y:-79.2,x:-0.65,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-106.3236,x:-88.2,y:49.15,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-119.6691,x:-65.3,y:126.75,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-109.416,x:-62.05,y:135.2,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-66.769,x:-57.2,y:-23.1,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:47.5134,y:-26.2,regX:-33.4,x:45.35}},{t:this.instance_13,p:{regX:-40.5,rotation:-51.4727,x:97.4,y:29.35}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-59.3427,x:147.3,y:-33.45,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.4,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-66.2254,x:155.95,y:-40.75}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1737,x:37.4,y:185,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.7675,x:-4.9,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1542,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.8883,y:-79.25,x:-0.65,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-103.5824,x:-87.55,y:49.4,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-116.9273,x:-68.4,y:128.05,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-106.6745,x:-65.55,y:136.55,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-67.2658,x:-57.25,y:-23.1,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.55}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:42.6725,y:-26.2,regX:-33.4,x:45.35}},{t:this.instance_13,p:{regX:-40.5,rotation:-51.8841,x:101.9,y:24.7}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-59.7541,x:151.35,y:-38.4,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.6,scaleX:0.9983,scaleY:0.9983,rotation:-66.6364,x:159.9,y:-45.9}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1737,x:37.4,y:185,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.7534,x:-4.9,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1533,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.3443,y:-79.25,x:-0.65,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-100.8413,x:-86.95,y:49.65,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-114.1852,x:-71.55,y:129.15,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-103.9332,x:-69.1,y:137.8,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-67.7628,x:-57.2,y:-23.2,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.55}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:37.8323,y:-26.25,regX:-33.4,x:45.25}},{t:this.instance_13,p:{regX:-40.5,rotation:-52.2947,x:105.95,y:19.8}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-60.1641,x:154.95,y:-43.7,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.2,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-67.048,x:163.6,y:-51.3}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1737,x:37.4,y:185,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.7401,x:-4.85,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1533,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.7998,y:-79.25,x:-0.6,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-98.0995,x:-86.3,y:49.85,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.3,rotation:-111.4432,x:-74.7,y:130.1,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-101.1918,x:-72.75,y:138.8,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-68.2594,x:-57.25,y:-23.15,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.55}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:32.9916,y:-26.25,regX:-33.4,x:45.35}},{t:this.instance_13,p:{regX:-40.5,rotation:-52.705,x:109.6,y:14.55}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-60.5751,x:158.2,y:-49.4,regX:-6.3,regY:8.2}},{t:this.instance_11,p:{regX:-5.4,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-67.4585,x:166.7,y:-56.8}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1737,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.7249,x:-4.9,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1533,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-6.2556,y:-79.2,x:-0.6,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-95.3573,x:-85.7,y:50.15,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.3,rotation:-108.7027,x:-77.9,y:130.75,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-98.451,x:-76.3,y:139.7,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.4,scaleX:0.9984,scaleY:0.9984,rotation:-68.756,x:-57.25,y:-23.1,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:29.9364,y:-26.3,regX:-33.4,x:45.3}},{t:this.instance_13,p:{regX:-40.5,rotation:-53.1972,x:111.7,y:11}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-61.0655,x:159.65,y:-53.2,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-67.9503,x:168.15,y:-60.95}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.3648,x:-4.9,regY:8.7,y:-58.15}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1533,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-6.0611,y:-79.25,x:-0.75,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-97.3451,x:-87.55,y:49.4,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-110.6886,x:-76.9,y:129.65,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-100.4375,x:-75.1,y:138.4,regX:6.3,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-67.3267,x:-57.25,y:-23.15,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:26.8834,y:-26.3,regX:-33.4,x:45.3}},{t:this.instance_13,p:{regX:-40.6,rotation:-53.6872,x:113.55,y:7.55}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-61.5577,x:161,y:-57.2,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-68.4407,x:169.4,y:-65}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.0074,x:-4.85,regY:8.7,y:-58.1}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1533,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9991,scaleY:0.9991,rotation:-5.8692,y:-79.45,x:-0.95,regY:52.5}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-99.3303,x:-89.25,y:48.65,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-112.676,x:-75.95,y:128.5,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-102.4239,x:-73.8,y:137.2,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-65.8958,x:-57.3,y:-23.2,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:23.8287,y:-26.25,regX:-33.4,x:45.25}},{t:this.instance_13,p:{regX:-40.5,rotation:-54.1792,x:115.3,y:3.8}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-62.0481,x:162.2,y:-61.35,regX:-6.3,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-68.9327,x:170.45,y:-69.15}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:8.648,x:-4.9,regY:8.6,y:-58.15}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1533,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.6758,y:-79.35,x:-1.05,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-101.318,x:-91.1,y:47.8,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-114.6622,x:-75.05,y:127.15,scaleX:0.9984,scaleY:0.9984,regY:-8.9}},{t:this.instance_1,p:{rotation:-104.4097,x:-72.5,y:135.8,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-64.4669,x:-57.35,y:-23,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:20.7738,y:-26.3,regX:-33.4,x:45.25}},{t:this.instance_13,p:{regX:-40.6,rotation:-54.6689,x:116.7,y:0.15}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-62.5393,x:163.05,y:-65.45,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-69.4232,x:171.3,y:-73.4}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:8.2869,x:-4.9,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1533,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.4841,y:-79.4,x:-1.2,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-103.3041,x:-92.8,y:46.95,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-116.6485,x:-73.95,y:125.7,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-106.3966,x:-71.25,y:134.2,regX:6.3,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-63.0363,x:-57.35,y:-23.1,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:17.7197,y:-26.25,regX:-33.4,x:45.3}},{t:this.instance_13,p:{regX:-40.5,rotation:-55.1623,x:118.05,y:-3.8}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-63.0304,x:163.8,y:-69.65,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.8,scaleX:0.9983,scaleY:0.9983,rotation:-69.9148,x:172.1,y:-77.7}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:7.9279,x:-4.85,regY:8.6,y:-58.25}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1533,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.2898,y:-79.35,x:-1.25,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-105.2896,x:-94.6,y:46,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-118.6345,x:-73.05,y:124.05,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-108.3829,x:-69.9,y:132.65,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-61.6074,x:-57.35,y:-23.25,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:14.6655,y:-26.25,regX:-33.4,x:45.3}},{t:this.instance_13,p:{regX:-40.5,rotation:-55.6522,x:119.15,y:-7.7}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-63.5223,x:164.35,y:-73.95,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.8,scaleX:0.9983,scaleY:0.9983,rotation:-70.4051,x:172.55,y:-81.95}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:7.5693,x:-4.9,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1524,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-5.0982,y:-79.35,x:-1.4,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-107.2774,x:-96.25,y:45.05,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-120.6218,x:-72,y:122.2,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-110.368,x:-68.65,y:130.65,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-60.1766,x:-57.25,y:-23.15,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:11.6123,y:-26.25,regX:-33.4,x:45.25}},{t:this.instance_13,p:{regX:-40.5,rotation:-56.1445,x:119.95,y:-11.65}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.0134,x:164.55,y:-78.3,regX:-6.4,regY:8.1}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-70.8968,x:172.65,y:-86.4}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:7.2102,x:-4.95,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1524,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.9041,y:-79.35,x:-1.55,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-109.2629,x:-97.95,y:44.05,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-122.6073,x:-71.05,y:120.45,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-112.356,x:-67.4,y:128.75,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-58.7484,x:-57.25,y:-23.2,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9985,scaleY:0.9985,rotation:8.5587,y:-26.25,regX:-33.4,x:45.2}},{t:this.instance_13,p:{regX:-40.5,rotation:-56.6349,x:120.65,y:-15.7}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.5049,x:164.6,y:-82.7,regX:-6.4,regY:8.1}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-71.3878,x:172.65,y:-90.85}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:6.8505,x:-4.85,regY:8.6,y:-58.25}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1524,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.7118,y:-79.4,x:-1.75,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-111.2503,x:-99.6,y:43.05,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-124.5939,x:-70.1,y:118.4,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-114.3416,x:-66.1,y:126.4,regX:6.3,regY:-1.1}},{t:this.instance,p:{regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-57.3169,x:-57.35,y:-23.25,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:5.5031,y:-26.25,regX:-33.4,x:45.15}},{t:this.instance_13,p:{regX:-40.5,rotation:-57.127,x:121.05,y:-19.75}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.9961,x:164.5,y:-87.15,regX:-6.4,regY:8.1}},{t:this.instance_11,p:{regX:-5.4,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-71.8797,x:172.4,y:-95.3}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:6.4917,x:-4.9,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1524,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.5194,y:-79.4,x:-1.85,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-113.2353,x:-101.25,y:41.95,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-126.58,x:-69.15,y:116.2,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-116.3281,x:-64.9,y:124.3,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-55.8871,x:-57.2,y:-23.25,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9985,scaleY:0.9985,rotation:2.449,y:-26.2,regX:-33.4,x:45.2}},{t:this.instance_13,p:{regX:-40.5,rotation:-57.6172,x:121.35,y:-23.75}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.4858,x:164.2,y:-91.45,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-72.3707,x:172.05,y:-99.8}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:6.1325,x:-4.9,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1524,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.3264,y:-79.45,x:-2,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-115.2213,x:-102.75,y:40.8,regY:0.2,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-128.5671,x:-68.1,y:114,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-118.3158,x:-63.65,y:121.8,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-54.4565,x:-57.25,y:-23.25,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9985,scaleY:0.9985,rotation:-0.5981,y:-26.25,regX:-33.4,x:45.15}},{t:this.instance_13,p:{regX:-40.6,rotation:-58.1087,x:121.3,y:-27.65}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.9777,x:163.65,y:-95.85,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.8,scaleX:0.9983,scaleY:0.9983,rotation:-72.8618,x:171.5,y:-104.35}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:5.7726,x:-4.85,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1524,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-4.1342,y:-79.4,x:-2.05,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-117.2077,x:-104.3,y:39.65,regY:0.2,regX:40.2}},{t:this.instance_2,p:{regX:5.3,rotation:-130.5532,x:-67.2,y:111.65,scaleX:0.9984,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-120.3018,x:-62.4,y:119.25,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-53.0269,x:-57.25,y:-23.1,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9985,scaleY:0.9985,rotation:-3.6538,y:-26.25,regX:-33.4,x:45.15}},{t:this.instance_13,p:{regX:-40.5,rotation:-58.5989,x:121.15,y:-31.8}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.4689,x:162.75,y:-100.3,regX:-6.4,regY:8.1}},{t:this.instance_11,p:{regX:-5.2,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-73.3533,x:170.6,y:-108.9}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:5.4148,x:-4.9,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1524,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.9394,y:-79.5,x:-2.2,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-119.1945,x:-105.95,y:38.5,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-132.5398,x:-66.25,y:109,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-122.2883,x:-61.25,y:116.55,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-51.5973,x:-57.25,y:-23.15,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9985,scaleY:0.9985,rotation:-6.7069,y:-26.2,regX:-33.4,x:45.2}},{t:this.instance_13,p:{regX:-40.5,rotation:-59.0905,x:120.75,y:-35.8}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.9596,x:161.85,y:-104.65,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.8,scaleX:0.9983,scaleY:0.9983,rotation:-73.8437,x:169.6,y:-113.2}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:5.0536,x:-4.9,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1524,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.7474,y:-79.5,x:-2.3,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-121.1821,x:-107.4,y:37.2,regY:0.2,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-134.5263,x:-65.45,y:106.3,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-124.2745,x:-60.15,y:113.75,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-50.1662,x:-57.2,y:-23.2,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:-9.7616,y:-26.2,regX:-33.4,x:45.2}},{t:this.instance_13,p:{regX:-40.5,rotation:-59.5825,x:120.1,y:-39.9}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.4509,x:160.5,y:-109.05,regX:-6.4,regY:8.1}},{t:this.instance_11,p:{regX:-5.4,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-74.3344,x:168.15,y:-117.5}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:4.6944,x:-4.85,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1524,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.5553,y:-79.5,x:-2.55,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-123.1674,x:-108.9,y:36.1,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-136.5123,x:-64.5,y:103.6,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-126.2608,x:-58.95,y:110.85,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-48.7364,x:-57.3,y:-23.2,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.8158,y:-26.25,regX:-33.3,x:45.25}},{t:this.instance_13,p:{regX:-40.5,rotation:-60.0737,x:119.25,y:-43.85}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.9426,x:159.2,y:-113.4,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-74.8256,x:166.65,y:-122}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:4.3353,x:-4.85,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1524,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.3616,y:-79.55,x:-2.65,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-125.1535,x:-110.45,y:34.65,regY:0.1,regX:40.3}},{t:this.instance_2,p:{regX:5.4,rotation:-138.4983,x:-63.65,y:100.75,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-128.2473,x:-57.85,y:107.75,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.2,scaleX:0.9984,scaleY:0.9984,rotation:-47.3071,x:-57.3,y:-23.25,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9034,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:-15.8691,y:-26.25,regX:-33.4,x:45.1}},{t:this.instance_13,p:{regX:-40.5,rotation:-60.5655,x:118.2,y:-47.75}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-68.4331,x:157.4,y:-117.65,regX:-6.4,regY:8.1}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-75.3172,x:164.95,y:-126.35}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9727,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1729,x:37.4,y:184.95,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:3.9754,x:-4.9,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1524,x:-39.75,y:185.85,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.1696,y:-79.6,x:-2.8,regY:52.5}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.1415,x:-111.9,y:33.45,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-140.4854,x:-62.8,y:97.7,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-130.2337,x:-56.75,y:104.6,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-45.8756,x:-57.25,y:-23.15,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9123,y:91.5,x:-22.55}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:-8.2278,y:-26.25,regX:-33.4,x:45.15}},{t:this.instance_13,p:{regX:-40.6,rotation:-59.6358,x:120.35,y:-37.8}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-67.5142,x:160.9,y:-107,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.2,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-74.3979,x:168.45,y:-115.8}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-12.9854,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1409,x:37.45,y:185,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:4.3879,x:-4.85,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1419,x:-39.75,y:185.95,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-3.025,y:-79.65,x:-2.6,regY:52.5}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.2263,x:-110.6,y:34.6,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-140.5606,x:-61.5,y:98.9,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-130.3033,x:-55.45,y:105.6,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-47.1008,x:-57.25,y:-23.25,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9203,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9985,scaleY:0.9985,rotation:-0.5858,y:-26.2,regX:-33.4,x:45.15}},{t:this.instance_13,p:{regX:-40.5,rotation:-58.7058,x:121.3,y:-27.75}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-66.5967,x:162.9,y:-96.3,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.2,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-73.4807,x:170.6,y:-104.9}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-13.0014,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.1115,x:37.45,y:185,regY:-53.7,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:4.7996,x:-4.9,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1314,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.8786,y:-79.5,x:-2.45,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.3119,x:-109.4,y:35.75,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-140.6341,x:-60.15,y:99.95,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-130.3729,x:-54.1,y:106.7,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-48.3263,x:-57.25,y:-23.15,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9282,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:7.0483,y:-26.2,regX:-33.4,x:45.2}},{t:this.instance_13,p:{regX:-40.5,rotation:-57.777,x:120.85,y:-17.7}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-65.6782,x:163.55,y:-85.5,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.6,scaleX:0.9983,scaleY:0.9983,rotation:-72.5607,x:171.3,y:-93.85}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-13.015,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.0802,x:37.45,y:185.05,regY:-53.6,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:5.2109,x:-4.9,regY:8.6,y:-58.25}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.12,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.7358,y:-79.45,x:-2.35,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.3988,x:-108.15,y:36.85,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-140.7082,x:-58.75,y:100.95,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-130.4425,x:-52.75,y:107.7,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-49.5516,x:-57.2,y:-23.2,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.936,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:14.6908,y:-26.15,regX:-33.4,x:45.2}},{t:this.instance_13,p:{regX:-40.5,rotation:-56.8479,x:119.1,y:-7.65}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-64.7602,x:162.9,y:-74.8,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-71.6423,x:170.8,y:-83.05}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-13.0303,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.0491,x:37.6,y:185.1,regY:-53.6,regX:3.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:5.6223,x:-4.9,regY:8.6,y:-58.25}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.1086,x:-39.8,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.5913,y:-79.5,x:-2.1,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.4844,x:-106.8,y:37.9,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-140.7822,x:-57.45,y:101.95,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-130.5121,x:-51.35,y:108.75,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-50.777,x:-57.25,y:-23.15,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9442,y:91.5,x:-22.45}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:22.3323,y:-26.15,regX:-33.4,x:45.25}},{t:this.instance_13,p:{regX:-40.5,rotation:-55.9187,x:116,y:1.95}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-63.8418,x:160.9,y:-64.5,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-70.7226,x:168.9,y:-72.6}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-13.0439,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:10.018,x:37.5,y:185.05,regY:-53.6,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:6.034,x:-4.85,regY:8.6,y:-58.25}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.0981,x:-39.85,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.4467,y:-79.5,x:-2.05,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.5699,x:-105.5,y:38.95,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-140.8556,x:-56.1,y:103.05,scaleX:0.9983,scaleY:0.9983,regY:-8.9}},{t:this.instance_1,p:{rotation:-130.5823,x:-49.95,y:109.6,regX:6.2,regY:-1.1}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-52.0008,x:-57.2,y:-23.15,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9521,y:91.5,x:-22.55}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:29.9733,y:-26.15,regX:-33.4,x:45.25}},{t:this.instance_13,p:{regX:-40.5,rotation:-54.9881,x:111.65,y:11.1}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-62.9239,x:157.6,y:-54.55,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-69.8037,x:165.75,y:-62.6}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-13.059,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:9.9867,x:37.6,y:185.1,regY:-53.6,regX:3.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:6.4451,x:-4.9,regY:8.6,y:-58.25}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.0867,x:-39.85,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.3004,y:-79.55,x:-1.9,regY:52.5}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.6556,x:-104.2,y:39.95,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-140.9296,x:-54.6,y:103.85,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-130.6518,x:-48.5,y:110.45,regX:6.2,regY:-1.1}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-53.2264,x:-57.2,y:-23.2,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9599,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:37.6144,y:-26.25,regX:-33.4,x:45.3}},{t:this.instance_13,p:{regX:-40.6,rotation:-54.0594,x:106,y:19.7}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-62.0054,x:153.15,y:-45.35,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-68.8855,x:161.45,y:-53.2}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-13.0734,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:9.9565,x:37.6,y:185.05,regY:-53.6,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:6.8574,x:-4.85,regY:8.6,y:-58.25}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.0762,x:-39.9,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.1568,y:-79.6,x:-1.75,regY:52.5}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.741,x:-102.9,y:40.85,regY:0.1,regX:40.3}},{t:this.instance_2,p:{regX:5.4,rotation:-141.0025,x:-53.15,y:104.8,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-130.7214,x:-47.05,y:111.35,regX:6.2,regY:-1.1}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-54.4521,x:-57.25,y:-23.25,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9688,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:45.2557,y:-26.15,regX:-33.4,x:45.25}},{t:this.instance_13,p:{regX:-40.5,rotation:-53.1301,x:99.5,y:27.25}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-61.0867,x:147.55,y:-36.9,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-67.9664,x:156,y:-44.65}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-13.0887,x:20.05,y:90.75}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:9.9255,x:37.65,y:185.05,regY:-53.6,regX:3.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:7.2701,x:-4.9,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.0648,x:-39.95,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-2.0124,y:-79.55,x:-1.6,regY:52.5}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.8278,x:-101.55,y:41.8,regY:0.1,regX:40.3}},{t:this.instance_2,p:{regX:5.4,rotation:-141.0772,x:-51.65,y:105.7,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-130.7909,x:-45.6,y:112.35,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-55.6765,x:-57.2,y:-23.2,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9769,y:91.5,x:-22.55}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:52.8972,y:-26.3,regX:-33.4,x:45.35}},{t:this.instance_13,p:{regX:-40.5,rotation:-52.201,x:91.95,y:33.85}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-60.1673,x:141.05,y:-29.4,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.2,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-67.048,x:149.7,y:-37.05}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-13.1032,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:9.8942,x:37.6,y:185.05,regY:-53.6,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:7.6807,x:-4.9,regY:8.6,y:-58.25}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.0534,x:-39.95,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.867,y:-79.45,x:-1.45,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.9125,x:-100.1,y:42.85,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-141.1515,x:-50.15,y:106.55,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-130.8599,x:-44.1,y:113.25,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-56.9021,x:-57.25,y:-23.2,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9864,y:91.45,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:60.5382,y:-26.25,regX:-33.4,x:45.3}},{t:this.instance_13,p:{regX:-40.5,rotation:-51.2726,x:83.6,y:39.5}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-59.2493,x:133.75,y:-22.9,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.4,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-66.1273,x:142.3,y:-30.25}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-13.1174,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:9.863,x:37.6,y:185.1,regY:-53.6,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:8.0932,x:-4.8,regY:8.6,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.0429,x:-39.95,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.7225,y:-79.35,x:-1.25,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-127.9994,x:-98.65,y:43.7,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-141.2249,x:-48.65,y:107.45,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-130.9301,x:-42.55,y:114.05,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-58.1264,x:-57.25,y:-23.15,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:7.9945,y:91.5,x:-22.55}},{t:this.instance_14,p:{regY:0,scaleX:0.9984,scaleY:0.9984,rotation:68.1796,y:-26.2,regX:-33.4,x:45.25}},{t:this.instance_13,p:{regX:-40.5,rotation:-50.3434,x:74.55,y:44.05}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-58.3307,x:125.65,y:-17.6,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.8,scaleX:0.9983,scaleY:0.9983,rotation:-65.2087,x:134.55,y:-24.9}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-13.1327,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:9.8318,x:37.65,y:185.05,regY:-53.6,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:8.5045,x:-4.85,regY:8.6,y:-58.25}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.0315,x:-39.85,y:185.9,regX:3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.5772,y:-79.35,x:-1.15,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-128.0842,x:-97.25,y:44.55,regY:0.1,regX:40.3}},{t:this.instance_2,p:{regX:5.3,rotation:-141.2996,x:-47.1,y:108.3,scaleX:0.9984,scaleY:0.9984,regY:-8.8}},{t:this.instance_1,p:{rotation:-130.9984,x:-41,y:114.85,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-59.3509,x:-57.25,y:-23.2,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:8.0043,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:75.8217,y:-26.25,regX:-33.4,x:45.4}},{t:this.instance_13,p:{regX:-40.5,rotation:-49.413,x:64.95,y:47.3}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-57.4136,x:117.1,y:-13.55,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.2,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-64.2907,x:126.05,y:-20.8}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-13.1472,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:9.8009,x:37.65,y:185.05,regY:-53.6,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:8.9163,x:-4.85,regY:8.7,y:-58.1}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.021,x:-39.95,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.4336,y:-79.3,x:-1.05,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-128.1702,x:-95.85,y:45.35,regY:0.1,regX:40.3}},{t:this.instance_2,p:{regX:5.4,rotation:-141.3732,x:-45.6,y:109.05,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-131.0685,x:-39.4,y:115.6,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-60.5762,x:-57.25,y:-23.2,regX:35.8}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:8.0113,y:91.5,x:-22.5}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:83.4631,y:-26.2,regX:-33.4,x:45.4}},{t:this.instance_13,p:{regX:-40.5,rotation:-48.4846,x:55.05,y:49.2}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-56.4938,x:108.2,y:-10.8,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-63.3719,x:117.25,y:-17.75}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-13.161,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:9.7698,x:37.75,y:185.05,regY:-53.6,regX:3.9}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.3284,x:-4.9,regY:8.7,y:-58.2}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.0096,x:-39.95,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.2892,y:-79.3,x:-0.8,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-128.255,x:-94.3,y:46.25,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-141.4467,x:-44.05,y:109.75,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-131.1381,x:-37.85,y:116.3,regX:6.2,regY:-1.2}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-61.8013,x:-57.25,y:-23.05,regX:35.7}}]},1).to({state:[{t:this.instance_15,p:{regX:2.5,scaleX:0.9982,scaleY:0.9982,rotation:8.0192,y:91.5,x:-22.55}},{t:this.instance_14,p:{regY:-0.1,scaleX:0.9984,scaleY:0.9984,rotation:91.0981,y:-26.15,regX:-33.4,x:45.4}},{t:this.instance_13,p:{regX:-40.5,rotation:-47.5563,x:44.95,y:49.8}},{t:this.instance_12,p:{scaleX:0.9984,scaleY:0.9984,rotation:-55.5772,x:99.1,y:-9.3,regX:-6.4,regY:8.2}},{t:this.instance_11,p:{regX:-5.3,regY:2.7,scaleX:0.9983,scaleY:0.9983,rotation:-62.4538,x:108.2,y:-16.2}},{t:this.instance_10,p:{regX:-0.6,regY:1.9,scaleX:0.9977,scaleY:0.9977,rotation:-13.1759,x:20.05,y:90.7}},{t:this.instance_9,p:{scaleX:0.9977,scaleY:0.9977,rotation:9.7385,x:37.75,y:185.05,regY:-53.6,regX:3.8}},{t:this.instance_8},{t:this.instance_7,p:{regX:-0.8,scaleX:0.999,scaleY:0.999,rotation:9.7401,x:-4.8,regY:8.6,y:-58.3}},{t:this.instance_6,p:{scaleX:0.9981,scaleY:0.9981,rotation:0.0009,x:-39.95,y:185.9,regX:2.9}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-1.1439,y:-79.3,x:-0.75,regY:52.6}},{t:this.instance_3,p:{scaleX:0.9984,scaleY:0.9984,rotation:-128.3423,x:-92.85,y:46.95,regY:0.1,regX:40.2}},{t:this.instance_2,p:{regX:5.4,rotation:-141.5209,x:-42.45,y:110.45,scaleX:0.9983,scaleY:0.9983,regY:-8.8}},{t:this.instance_1,p:{rotation:-131.2076,x:-36.3,y:116.9,regX:6.2,regY:-1.1}},{t:this.instance,p:{regY:0.3,scaleX:0.9984,scaleY:0.9984,rotation:-63.0253,x:-57.35,y:-23.15,regX:35.8}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-119.9,-207.5,306.3,508.8);


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
	this.instance_2 = new lib.ch1_headcopy2("synched",0);
	this.instance_2.setTransform(-0.15,51.35,0.999,0.999,2.3215,0,0,0.9,52.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.2,-71.5,171.10000000000002,152.5);


(lib.ch1_headcopy_3 = function(mode,startPosition,loop,reversed) {
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
	this.instance_3 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_3.setTransform(-0.15,51.35,0.999,0.999,2.3215,0,0,0.9,52.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.2,-71.5,171.10000000000002,152.5);


(lib.ch1_headcopy2_4 = function(mode,startPosition,loop,reversed) {
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
	this.instance_4 = new lib.ch1_headcopy_1("synched",0);
	this.instance_4.setTransform(-0.15,51.35,0.999,0.999,2.3215,0,0,0.9,52.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.2,-71.5,163.10000000000002,152.1);


(lib.CharacterCivilian_09 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-59.15,-12.15,0.9977,0.9977,-84.558,0,0,33.6,10.1);

	this.instance_1 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1.setTransform(-63.45,145.35,0.9973,0.9973,-122.4582,0,0,14.6,-0.1);

	this.instance_2 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2.setTransform(-63.5,145.3,0.9976,0.9976,-115.9556,0,0,4.9,-9);

	this.instance_3 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_3.setTransform(-68.5,59.3,0.9976,0.9976,-98.3943,0,0,44.6,7.5);

	this.instance_4 = new lib.ch1_headcopy_2("synched",0);
	this.instance_4.setTransform(1.35,-80.8,0.9983,0.9983,-11.8642,0,0,1.9,51.1);

	this.instance_5 = new lib.ch1_uBodycopy("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_6.setTransform(23.95,88.15,0.9948,0.9948,-8.9723,0,0,-0.2,4.4);

	this.instance_7 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_7.setTransform(-30,89.85,0.9957,0.9957,3.9378,0,0,1.4,-42.8);

	this.instance_8 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_8.setTransform(-41.35,185.45,0.9952,0.9952,6.4634,0,0,1.4,-51.5);

	this.instance_9 = new lib.ch1_neckcopy("synched",0);
	this.instance_9.setTransform(-4.15,-59.2,0.9983,0.9983,11.3553,0,0,-1.2,7.7);

	this.instance_10 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_10.setTransform(33.9,185.55,0.995,0.995,-3.3946,0,0,3.4,-50.6);

	this.instance_11 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_11.setTransform(29.15,138.4,0.9975,0.9975,118.0214,0,0,-10.4,10.6);

	this.instance_12 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_12.setTransform(29.7,135.05,0.9975,0.9975,82.7163,0,0,-7.7,13.3);

	this.instance_13 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_13.setTransform(44.5,49.95,0.9976,0.9976,105.8458,0,0,-45.8,13.1);

	this.instance_14 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_14.setTransform(47.8,-21.1,0.9979,0.9979,93.2312,0,0,-33,13.8);

	this.instance_15 = new lib.ch1_lBodycopy("synched",0);
	this.instance_15.setTransform(-9.3,49.05,0.9995,0.9995,1.7768,0,0,-4,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7768,x:-9.3,y:49.05,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9979,scaleY:0.9979,rotation:93.2312,y:-21.1,regY:13.8,x:47.8,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9976,scaleY:0.9976,rotation:105.8458,x:44.5,y:49.95,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:82.7163,x:29.7,y:135.05,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:118.0214,x:29.15,y:138.4,regX:-10.4,regY:10.6}},{t:this.instance_10,p:{scaleX:0.995,scaleY:0.995,rotation:-3.3946,x:33.9,y:185.55,regX:3.4}},{t:this.instance_9,p:{rotation:11.3553,x:-4.15,y:-59.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4634,x:-41.35,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.8,scaleX:0.9957,scaleY:0.9957,rotation:3.9378,y:89.85,x:-30}},{t:this.instance_6,p:{regX:-0.2,scaleX:0.9948,scaleY:0.9948,rotation:-8.9723,x:23.95,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.8642,x:1.35,y:-80.8}},{t:this.instance_3,p:{scaleX:0.9976,scaleY:0.9976,rotation:-98.3943,x:-68.5,y:59.3,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9976,scaleY:0.9976,rotation:-115.9556,x:-63.5,y:145.3,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9973,scaleY:0.9973,rotation:-122.4582,x:-63.45,y:145.35,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9977,scaleY:0.9977,rotation:-84.558,x:-59.15,y:-12.15,regY:10.1}}]}).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.2683,y:-21.05,regY:13.8,x:47.8,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:104.5645,x:44.6,y:49.95,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:81.4803,x:31.55,y:135.3,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:115.8155,x:31.1,y:138.6,regX:-10.4,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3551,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.7361,x:1.45,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-101.4418,x:-66.05,y:59.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-119.0011,x:-56.55,y:145.2,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-125.5061,x:-56.5,y:145.25,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-86.4099,x:-59.2,y:-12,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.3078,y:-21,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:103.2848,x:44.55,y:49.9,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:80.2427,x:33.45,y:135.6,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:113.6088,x:32.95,y:139,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3561,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.6081,x:1.4,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-104.489,x:-63.8,y:59.8,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-122.0483,x:-49.7,y:144.75,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-128.5531,x:-49.6,y:144.8,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-88.2594,x:-59.2,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.3482,y:-21,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:102.0039,x:44.45,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:79.0052,x:35.4,y:135.75,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:111.4025,x:34.85,y:139.25,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.357,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.481,x:1.4,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-107.5361,x:-61.45,y:59.85,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-125.0967,x:-42.9,y:144,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-131.6013,x:-42.75,y:144,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-90.1052,x:-59.05,y:-12,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.3877,y:-20.9,regY:13.7,x:47.95,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:100.7246,x:44.4,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:77.7681,x:37.25,y:135.9,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:109.1964,x:36.85,y:139.4,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3577,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.3542,x:1.4,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-110.5834,x:-59.15,y:59.85,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-128.1454,x:-36.1,y:142.9,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-134.6491,x:-36,y:142.95,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9977,scaleY:0.9977,rotation:-91.9545,x:-59.2,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.4272,y:-20.9,regY:13.7,x:47.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:99.4436,x:44.3,y:49.9,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:76.5314,x:39,y:136.15,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:106.9907,x:38.8,y:139.55,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3587,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.2268,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-113.6311,x:-56.85,y:59.9,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-131.1919,x:-29.4,y:141.5,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-137.6959,x:-29.25,y:141.55,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9977,scaleY:0.9977,rotation:-93.8052,x:-59.2,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.4676,y:-21.1,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:98.1638,x:44.3,y:49.9,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:75.2932,x:40.85,y:136.15,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:104.7833,x:40.85,y:139.55,regX:-10.4,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3604,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.0981,x:1.4,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-116.6791,x:-54.5,y:59.75,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-134.2396,x:-22.8,y:139.85,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-140.7442,x:-22.6,y:139.95,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-95.6555,x:-59.15,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.5071,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:96.8835,x:44.2,y:49.9,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:74.056,x:42.8,y:136.2,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:102.5775,x:42.75,y:139.65,regX:-10.4,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3613,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.9715,x:1.4,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-119.7263,x:-52.05,y:59.45,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-137.2881,x:-16.3,y:137.95,regY:-9.1,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-143.7919,x:-16,y:137.95,regX:14.5}},{t:this.instance,p:{regX:33.5,scaleX:0.9977,scaleY:0.9977,rotation:-97.5062,x:-59.05,y:-12.1,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.5475,y:-21,regY:13.7,x:47.95,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:95.6033,x:44.2,y:50.05,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:72.8177,x:44.75,y:136.2,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:100.3716,x:44.65,y:139.75,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3621,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.8448,x:1.4,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-122.7746,x:-49.85,y:59.3,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-140.3344,x:-9.85,y:135.55,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-146.84,x:-9.8,y:135.65,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9977,scaleY:0.9977,rotation:-99.3561,x:-59.15,y:-12.15,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:93.587,y:-21,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:94.3233,x:44.15,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:71.5822,x:46.5,y:136.15,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:98.1653,x:46.65,y:139.7,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3931,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3639,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.7164,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-125.8225,x:-47.6,y:58.95,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-143.3829,x:-3.6,y:133.05,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-149.887,x:-3.5,y:133.05,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9977,scaleY:0.9977,rotation:-101.2051,x:-59.15,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:93.6248,y:-21,regY:13.7,x:47.95,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:93.0436,x:44.1,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:70.3442,x:48.35,y:136.05,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:95.9598,x:48.6,y:139.6,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3931,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3642,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9981,scaleY:0.9981,rotation:-10.5891,x:1.4,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-128.8701,x:-45.15,y:58.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-146.4293,x:2.6,y:130.2,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-152.9346,x:2.7,y:130.2,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-103.0545,x:-59.15,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.666,y:-20.9,regY:13.7,x:47.85,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:91.7637,x:44.05,y:49.9,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:69.1062,x:50.25,y:136,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:93.7534,x:50.5,y:139.45,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3931,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3651,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.4625,x:1.4,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-131.9184,x:-42.95,y:58.1,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-149.4777,x:8.65,y:127.05,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-155.9832,x:8.7,y:127,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-104.9058,x:-59.05,y:-12.05,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.7055,y:-21.1,regY:13.8,x:47.85,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:90.4829,x:44.05,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:67.8701,x:52.1,y:135.8,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:91.5473,x:52.6,y:139.35,regX:-10.3,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3931,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3664,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.3344,x:1.4,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-134.9653,x:-40.7,y:57.45,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-152.5259,x:14.4,y:123.6,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-159.0307,x:14.55,y:123.65,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-106.7553,x:-59.15,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.7451,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:89.2077,x:43.9,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:66.6326,x:54,y:135.6,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:89.3452,x:54.55,y:139.05,regX:-10.3,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3676,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.2078,x:1.45,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-138.014,x:-38.4,y:56.9,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-155.5736,x:20.1,y:119.95,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-162.078,x:20.2,y:119.9,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-108.6057,x:-59.1,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.7855,y:-21.05,regY:13.8,x:47.8,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:87.9268,x:43.9,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:65.3946,x:55.9,y:135.35,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:87.1396,x:56.45,y:138.9,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3687,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.0789,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-141.0614,x:-36.25,y:56.15,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-158.6214,x:25.6,y:116.05,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-165.1264,x:25.7,y:116,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-110.4561,x:-59.1,y:-12,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.825,y:-21,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:86.6465,x:43.85,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:64.1558,x:57.7,y:135.05,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:84.9322,x:58.3,y:138.5,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3695,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.9526,x:1.4,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-144.109,x:-34.05,y:55.35,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-161.6701,x:30.9,y:111.9,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-168.1732,x:31.15,y:111.9,regX:14.5}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-112.3062,x:-59.15,y:-12,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.8654,y:-21.05,regY:13.8,x:47.8,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:85.3664,x:43.7,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:62.921,x:59.7,y:134.65,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:82.7264,x:60.2,y:138.15,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3711,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.8246,x:1.4,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-147.1564,x:-31.95,y:54.45,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-164.7163,x:36.05,y:107.45,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-171.2212,x:36.1,y:107.5,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-114.156,x:-59.1,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.9049,y:-21.05,regY:13.7,x:47.85,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:84.0865,x:43.7,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:61.6832,x:61.4,y:134.35,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:80.52,x:62.1,y:137.75,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3721,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.6973,x:1.45,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-150.205,x:-29.85,y:53.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-167.7639,x:40.75,y:102.85,regY:-9,regX:5}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-174.2689,x:40.95,y:102.85,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-116.0066,x:-59.05,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.4,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.9444,y:-21.1,regY:13.8,x:47.8,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:82.8064,x:43.75,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:60.4454,x:63.2,y:133.9,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:78.3136,x:64.05,y:137.35,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3731,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.5696,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-153.2519,x:-27.75,y:52.65,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-170.8114,x:45.35,y:98.1,regY:-9,regX:5}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-177.3171,x:45.6,y:98,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-117.8565,x:-59.1,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.4,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.9848,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:81.5262,x:43.6,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:59.2085,x:65.05,y:133.45,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:76.1068,x:66,y:136.9,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.374,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.4417,x:1.4,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-156.2991,x:-25.65,y:51.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-173.8592,x:49.85,y:93.2,regY:-9.1,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:179.6397,x:49.95,y:93,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-119.7071,x:-59.1,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.4,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.0234,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:80.2462,x:43.45,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:57.9708,x:66.9,y:132.95,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:73.9016,x:67.85,y:136.35,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3755,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.3163,x:1.4,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-159.3472,x:-23.6,y:50.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-176.9073,x:53.85,y:87.9,regY:-9,regX:5}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:176.5928,x:54.1,y:87.8,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-121.5561,x:-59.1,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.4,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.063,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:78.9656,x:43.35,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:56.7334,x:68.7,y:132.45,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:71.6951,x:69.65,y:135.75,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3774,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.1877,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-162.3949,x:-21.6,y:49.25,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-179.9553,x:57.9,y:82.65,regY:-9.1,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:173.546,x:58,y:82.45,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9976,scaleY:0.9976,rotation:-123.4067,x:-59.15,y:-12.15,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.4,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.1034,y:-21.05,regY:13.7,x:47.85,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:77.6858,x:43.5,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:55.496,x:70.45,y:131.8,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:69.4893,x:71.55,y:135.15,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3783,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.0609,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-165.443,x:-19.6,y:47.9,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:177.0012,x:61.4,y:77,regY:-9,regX:5}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:170.4975,x:61.6,y:76.95,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-125.257,x:-59.05,y:-12.1,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.1429,y:-21.1,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:76.4051,x:43.45,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:54.2586,x:72.25,y:131.15,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:67.2823,x:73.45,y:134.5,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3791,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.9324,x:1.4,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-168.4903,x:-17.75,y:46.55,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:173.9544,x:64.9,y:71.35,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:167.4503,x:64.95,y:71.25,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-127.1065,x:-59,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.1824,y:-21.1,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:75.1255,x:43.4,y:49.9,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:53.0211,x:74,y:130.5,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:65.0749,x:75.2,y:133.8,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3809,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.8056,x:1.4,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-171.537,x:-15.85,y:45.35,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:170.9065,x:67.85,y:65.55,regY:-9,regX:5}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:164.4011,x:68.1,y:65.45,regX:14.5}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-128.9569,x:-59,y:-12.15,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.222,y:-21.05,regY:13.8,x:47.75,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:73.845,x:43.35,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.7841,x:75.8,y:129.75,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:62.8705,x:77.05,y:133.05,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3821,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.678,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-174.5851,x:-14,y:43.9,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:167.859,x:70.65,y:59.75,regY:-9.1,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:161.3532,x:70.8,y:59.5,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-130.8073,x:-59,y:-12.2,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.2624,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:72.5657,x:43.3,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.5466,x:77.45,y:129.05,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:60.6639,x:78.95,y:132.25,regX:-10.3,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3829,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.5513,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-177.6338,x:-12.2,y:42.45,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:164.8101,x:73.25,y:53.6,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:158.3051,x:73.3,y:53.5,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9976,scaleY:0.9976,rotation:-132.6576,x:-59.15,y:-12.15,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.3019,y:-21.1,regY:13.8,x:47.7,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:71.2851,x:43.15,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.3092,x:79.25,y:128.25,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:58.4561,x:80.7,y:131.5,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3843,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.4238,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:179.3234,x:-10.5,y:40.85,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:161.7632,x:75.4,y:47.6,regY:-9.1,regX:5}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:155.2588,x:75.55,y:47.45,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-134.5074,x:-59.1,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.3424,y:-21.1,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:70.0039,x:43.2,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:48.072,x:80.95,y:127.4,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:56.2511,x:82.4,y:130.6,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3855,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.2961,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:176.2768,x:-8.85,y:39.3,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:158.7155,x:77.35,y:41.3,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:152.2112,x:77.4,y:41.2,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-136.3572,x:-59.1,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.3818,y:-21.15,regY:13.8,x:47.75,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:68.7243,x:43.1,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:46.8337,x:82.6,y:126.65,regY:13.3,regX:-7.6}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:54.0445,x:84.15,y:129.7,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3864,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.1679,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:173.2277,x:-7.2,y:37.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:155.6681,x:79,y:35.15,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:149.1634,x:79.05,y:34.95,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-138.2072,x:-59.1,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:94.4206,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:67.4445,x:43.1,y:49.7,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:45.5969,x:84.2,y:125.65,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.8385,x:85.9,y:128.75,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3874,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.0413,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:170.1813,x:-5.65,y:35.95,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:152.622,x:80.35,y:28.85,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:146.1166,x:80.3,y:28.7,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9976,scaleY:0.9976,rotation:-140.0581,x:-59.2,y:-12.15,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.461,y:-21.05,regY:13.8,x:47.75,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:66.1637,x:43,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:44.3591,x:85.85,y:124.7,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.6326,x:87.6,y:127.75,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3889,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.914,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:167.1338,x:-4.05,y:34.1,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:149.5739,x:81.4,y:22.65,regY:-9.1,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:143.0686,x:81.35,y:22.35,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9976,scaleY:0.9976,rotation:-141.908,x:-59.2,y:-12.15,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:94.5006,y:-20.9,regY:13.7,x:47.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:64.8834,x:42.95,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:43.1229,x:87.55,y:123.75,regY:13.3,regX:-7.6}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:47.4261,x:89.3,y:126.8,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.39,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.7858,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:164.0866,x:-2.6,y:32.35,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:146.526,x:82,y:16.25,regY:-9,regX:5}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:140.0199,x:82.1,y:16.05,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9976,scaleY:0.9976,rotation:-143.7578,x:-59.2,y:-12.15,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.5401,y:-21.05,regY:13.8,x:47.7,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:63.6039,x:42.95,y:49.7,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:41.8846,x:89.05,y:122.7,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:45.22,x:90.95,y:125.65,regX:-10.3,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3908,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.6593,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:161.0382,x:-1.15,y:30.45,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:143.4786,x:82.45,y:9.9,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:136.9725,x:82.5,y:9.8,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-145.608,x:-59.1,y:-12.15,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.5797,y:-21.05,regY:13.8,x:47.85,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:62.324,x:42.85,y:49.7,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:40.6479,x:90.6,y:121.65,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:43.0131,x:92.65,y:124.65,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3919,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.5313,x:1.5,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:157.9909,x:0.1,y:28.45,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:140.4309,x:82.65,y:3.6,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:133.925,x:82.6,y:3.45,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-147.4584,x:-59.1,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.6201,y:-21.1,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:61.0444,x:42.85,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:39.4104,x:92.15,y:120.55,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:40.8075,x:94.2,y:123.5,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3934,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.405,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:154.9422,x:1.5,y:26.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:137.383,x:82.5,y:-2.7,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:130.8781,x:82.55,y:-2.9,regX:14.5}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-149.3084,x:-59.1,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.6597,y:-20.95,regY:13.7,x:47.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:59.7621,x:42.8,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:38.1729,x:93.65,y:119.45,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:38.6008,x:95.75,y:122.25,regX:-10.3,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3944,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.277,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:151.8947,x:2.7,y:24.65,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:134.335,x:82,y:-8.95,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:127.8295,x:82.05,y:-9.2,regX:14.5}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-151.1585,x:-59.05,y:-12.2,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.7001,y:-20.9,regY:13.7,x:47.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:58.4829,x:42.7,y:49.8,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:36.9356,x:95.25,y:118.2,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:36.3945,x:97.4,y:121.05,regX:-10.3,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3953,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.149,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:148.8481,x:3.9,y:22.65,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:131.2877,x:81.25,y:-15.15,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:124.7812,x:81.3,y:-15.2,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-153.0085,x:-59.05,y:-12.15,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.7396,y:-21.05,regY:13.7,x:47.85,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:57.2026,x:42.65,y:49.65,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:35.6986,x:96.6,y:117,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:34.1889,x:98.85,y:119.9,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.397,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.462,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.021,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:145.8004,x:4.85,y:20.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:128.2396,x:80.2,y:-21.2,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:121.7351,x:80.25,y:-21.3,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-154.8585,x:-59,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.7793,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:55.9222,x:42.6,y:49.65,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:34.461,x:98.05,y:115.9,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:31.9827,x:100.4,y:118.55,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3979,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.462,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.8949,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:142.7525,x:5.95,y:18.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:125.1918,x:78.95,y:-27.25,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:118.6867,x:78.85,y:-27.4,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-156.7084,x:-59.05,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.8188,y:-21.1,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:54.6429,x:42.5,y:49.65,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:33.224,x:99.55,y:114.55,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:29.7761,x:101.85,y:117.3,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3989,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.462,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7678,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:139.7043,x:6.85,y:16.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:122.1448,x:77.3,y:-33.1,regY:-9,regX:5}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:115.6389,x:77.25,y:-33.3,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-158.5594,x:-59,y:-12.15,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.8584,y:-21.1,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:53.3624,x:42.4,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:31.9862,x:100.85,y:113.35,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:27.571,x:103.25,y:115.9,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3998,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.462,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.6399,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:136.6568,x:7.75,y:14.35,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:119.0964,x:75.5,y:-39.05,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:112.5912,x:75.4,y:-39.1,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-160.4082,x:-59.05,y:-12.15,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.898,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:52.0814,x:42.45,y:49.65,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:30.7494,x:102.15,y:111.9,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:25.3643,x:104.65,y:114.55,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3905,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4015,x:-4.05,y:-59.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.462,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9354,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.5111,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:133.6098,x:8.6,y:12.15,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:116.0492,x:73.35,y:-44.7,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:109.5432,x:73.3,y:-44.8,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9976,scaleY:0.9976,rotation:-162.2593,x:-59.15,y:-12.15,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.9376,y:-21.1,regY:13.7,x:47.85,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:50.8028,x:42.45,y:49.7,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:29.5115,x:103.5,y:110.55,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:23.1577,x:106.05,y:113.1,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3905,x:33.75,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4023,x:-4.05,y:-59.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.462,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.386,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:130.5612,x:9.35,y:9.9,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:113.001,x:71,y:-50.35,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:106.4955,x:70.9,y:-50.4,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-164.1088,x:-59.1,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7725,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.8945,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:52.335,x:42.5,y:49.65,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:30.9998,x:101.95,y:112.2,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:25.8096,x:104.3,y:114.8,regX:-10.4,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4042,x:-4.05,y:-59.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4568,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-8.9774,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.5411,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:134.1968,x:8.45,y:12.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:116.6317,x:73.8,y:-43.65,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:110.1319,x:73.75,y:-43.8,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-161.9056,x:-59.05,y:-12.2,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7707,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.8514,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:53.8683,x:42.6,y:49.8,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:32.4885,x:100.3,y:113.8,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:28.4596,x:102.65,y:116.45,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3931,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4053,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4523,x:-41.3,regY:-51.6,y:185.35,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.938,y:89.9,x:-30.05}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-8.9828,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.6981,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:137.8334,x:7.55,y:15.15,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:120.2627,x:76.25,y:-36.85,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:113.7672,x:76.2,y:-36.95,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9977,scaleY:0.9977,rotation:-159.703,x:-59.05,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.769,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.8091,y:-21.1,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:55.4015,x:42.6,y:49.7,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:33.9752,x:98.7,y:115.35,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:31.1111,x:100.85,y:118,regX:-10.4,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4068,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.448,x:-41.25,regY:-51.6,y:185.35,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9408,y:89.9,x:-30.05}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-8.9871,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.8552,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:141.4691,x:6.35,y:17.7,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:123.8918,x:78.3,y:-29.8,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:117.4041,x:78.25,y:-29.95,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-157.499,x:-59.05,y:-12.15,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7672,x:-9.5,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.766,y:-21.1,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:56.9347,x:42.7,y:49.65,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:35.4638,x:97,y:116.75,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:33.7628,x:99.1,y:119.6,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3949,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4078,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4436,x:-41.25,regY:-51.6,y:185.35,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9425,y:89.9,x:-30.05}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-8.9926,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.0113,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:145.1058,x:5.15,y:20.1,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:127.5238,x:79.9,y:-22.55,regY:-9,regX:5}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:121.0406,x:79.95,y:-22.8,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-155.2961,x:-59.1,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7664,x:-9.5,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.723,y:-21.1,regY:13.7,x:47.85,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:58.4688,x:42.7,y:49.7,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:36.9514,x:95.2,y:118.25,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:36.4139,x:97.4,y:121.05,regX:-10.3,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3966,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4089,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4391,x:-41.2,regY:-51.6,y:185.35,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9443,y:89.9,x:-30.05}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-8.9971,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.1684,x:1.5,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:148.7425,x:3.9,y:22.55,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:131.1529,x:81.25,y:-15.3,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:124.6759,x:81.2,y:-15.5,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-153.0932,x:-59.05,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7646,x:-9.5,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.6799,y:-20.95,regY:13.7,x:47.95,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:60.0016,x:42.75,y:49.8,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:38.44,x:93.4,y:119.65,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:39.0658,x:95.45,y:122.55,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3975,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4113,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4348,x:-41.2,regY:-51.6,y:185.4,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9469,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0033,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.3257,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:152.3789,x:2.5,y:24.9,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:134.7837,x:82.1,y:-8,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:128.3116,x:82.1,y:-8.15,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-150.8898,x:-59.1,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7629,x:-9.5,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.6368,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:61.5355,x:42.85,y:49.85,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:39.9289,x:91.6,y:120.9,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:41.717,x:93.5,y:123.9,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3984,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4123,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4302,x:-41.2,regY:-51.6,y:185.3,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9485,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0094,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.4819,x:1.5,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:156.0134,x:1.05,y:27.3,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:138.4143,x:82.6,y:-0.5,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:131.9478,x:82.5,y:-0.65,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-148.6865,x:-59.05,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7611,x:-9.5,y:48.95,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.5937,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:63.0692,x:42.85,y:49.65,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:41.4158,x:89.65,y:122.25,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:44.3684,x:91.55,y:125.25,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4002,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.414,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4267,x:-41.1,regY:-51.6,y:185.3,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9504,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0148,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.639,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:159.6492,x:-0.5,y:29.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:142.0443,x:82.6,y:7.05,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:135.584,x:82.6,y:6.85,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-146.4837,x:-59.1,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7602,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.5507,y:-21.05,regY:13.8,x:47.75,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:64.6015,x:42.95,y:49.8,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:42.904,x:87.7,y:123.45,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:47.0204,x:89.5,y:126.45,regX:-10.4,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.401,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4157,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4223,x:-41.1,regY:-51.6,y:185.3,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9531,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0202,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.7964,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:163.2865,x:-2.2,y:31.85,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:145.6755,x:82.15,y:14.45,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:139.2207,x:82.25,y:14.4,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-144.2805,x:-59.05,y:-12.15,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7585,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.5076,y:-20.9,regY:13.7,x:47.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:66.135,x:42.95,y:49.7,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:44.392,x:85.8,y:124.75,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.6711,x:87.55,y:127.75,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4028,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4178,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4179,x:-41.1,regY:-51.6,y:185.3,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9549,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0255,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.953,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:166.9214,x:-3.9,y:33.85,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:149.3064,x:81.4,y:22,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:142.8564,x:81.45,y:21.9,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-142.0767,x:-59,y:-12.15,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7567,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:94.4646,y:-21.05,regY:13.8,x:47.75,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:67.6693,x:42.95,y:49.85,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:45.8802,x:83.95,y:125.7,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:52.3226,x:85.5,y:128.9,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4037,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4192,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4135,x:-41.2,regY:-51.6,y:185.3,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9566,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0309,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.1095,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:170.5574,x:-5.8,y:36.05,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:152.9368,x:80.2,y:29.5,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:146.4925,x:80.2,y:29.5,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-139.8734,x:-59,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.755,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:94.4215,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:69.2007,x:43.1,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:47.3677,x:81.95,y:126.95,regY:13.3,regX:-7.6}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:54.9747,x:83.5,y:130,regX:-10.3,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4054,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4204,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4091,x:-41.2,regY:-51.6,y:185.3,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9592,y:89.9,x:-29.95}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0354,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.2671,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:174.194,x:-7.55,y:38.1,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:156.5659,x:78.4,y:37.15,regY:-9,regX:5}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:150.127,x:78.6,y:36.9,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-137.6711,x:-59.05,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7532,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.3793,y:-21.15,regY:13.8,x:47.75,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:70.7344,x:43.15,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:48.8556,x:79.85,y:127.9,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:57.6248,x:81.35,y:131.05,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4062,x:33.95,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4223,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4047,x:-41.25,regY:-51.6,y:185.3,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9609,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0407,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.4238,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:177.8285,x:-9.55,y:40.05,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:160.1958,x:76.45,y:44.5,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:153.7639,x:76.55,y:44.35,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-135.4672,x:-59.1,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7523,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.3362,y:-21.15,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:72.2679,x:43.15,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.3437,x:77.85,y:128.9,regY:13.3,regX:-7.6}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:60.2773,x:79.15,y:132.15,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4081,x:34,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4238,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4001,x:-41.25,regY:-51.6,y:185.35,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9627,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0461,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.5805,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-178.5397,x:-11.65,y:41.8,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:163.8267,x:73.95,y:51.7,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:157.3994,x:74.1,y:51.7,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-133.264,x:-59.05,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7506,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.2932,y:-21.1,regY:13.8,x:47.75,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:73.8009,x:43.25,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.8322,x:75.7,y:129.75,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:62.9285,x:77,y:133,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4089,x:34,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4257,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3958,x:-41.25,regY:-51.6,y:185.35,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9654,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0523,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.7373,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-174.9029,x:-13.75,y:43.7,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:167.4564,x:71.1,y:58.95,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:161.0355,x:71.25,y:58.8,regX:14.5}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-131.0608,x:-59.05,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7488,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.2501,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:75.335,x:43.25,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:53.3198,x:73.6,y:130.6,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:65.5797,x:74.8,y:133.9,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4099,x:34,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4267,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3913,x:-41.3,regY:-51.6,y:185.35,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9672,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0576,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.8943,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-171.2682,x:-15.9,y:45.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:171.0874,x:67.75,y:66.05,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:164.6712,x:67.85,y:65.9,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-128.8578,x:-59.05,y:-12,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7471,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.207,y:-21.05,regY:13.8,x:47.75,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:76.8689,x:43.3,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:54.8086,x:71.45,y:131.35,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:68.2308,x:72.65,y:134.7,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4116,x:34,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4283,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.387,x:-41.25,regY:-51.6,y:185.35,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9689,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0638,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.0512,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-167.632,x:-18.15,y:47.05,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:174.7173,x:64,y:72.95,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:168.3075,x:64.1,y:72.85,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-126.6545,x:-59,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7453,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.164,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:78.4016,x:43.35,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:56.2958,x:69.35,y:132.1,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:70.8829,x:70.4,y:135.5,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4125,x:34,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4302,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3826,x:-41.25,regY:-51.6,y:185.4,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9716,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0692,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.2082,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-163.9965,x:-20.45,y:48.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:178.3486,x:59.85,y:79.6,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:171.9443,x:60,y:79.5,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-124.4513,x:-59.1,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7445,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.121,y:-21.05,regY:13.8,x:47.7,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:79.9346,x:43.4,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:57.7838,x:67.3,y:132.75,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:73.5337,x:68.15,y:136.25,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4142,x:34,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4312,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3772,x:-41.25,regY:-51.6,y:185.4,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9733,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-9.0747,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.3653,x:1.45,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-160.3585,x:-22.9,y:50,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-178.0259,x:55.4,y:86.1,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:175.5804,x:55.5,y:86.05,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-122.2486,x:-59.15,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7427,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.0779,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:81.4677,x:43.5,y:49.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:59.2718,x:65.1,y:133.55,regY:13.3,regX:-7.6}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:76.1853,x:66,y:136.75,regX:-10.3,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4151,x:34.05,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4327,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3729,x:-41.25,regY:-51.6,y:185.35,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9759,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.079,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.5216,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-156.7237,x:-25.25,y:51.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-174.3958,x:50.5,y:92.3,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:179.2153,x:50.65,y:92.25,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-120.045,x:-59.15,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.741,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:94.034,y:-21.05,regY:13.8,x:47.8,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:83.0016,x:43.6,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:60.7606,x:62.8,y:134,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:78.8369,x:63.65,y:137.4,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4169,x:34.05,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4346,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3682,x:-41.15,regY:-51.6,y:185.35,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9777,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0843,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.6786,x:1.4,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-153.0877,x:-27.75,y:52.65,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9976,scaleY:0.9976,rotation:-170.7646,x:45.3,y:98.25,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-177.1521,x:45.45,y:98.3,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-117.8424,x:-59.1,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7392,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.9918,y:-21.1,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:84.5339,x:43.65,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:62.2483,x:60.6,y:134.5,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:81.4881,x:61.35,y:137.9,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4178,x:34.05,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4365,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3639,x:-41.15,regY:-51.6,y:185.35,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9794,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0897,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.8351,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-149.4517,x:-30.25,y:53.8,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-167.1345,x:39.75,y:104.05,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-173.5159,x:40,y:104,regX:14.5}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-115.6385,x:-59,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7384,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.9488,y:-21.1,regY:13.8,x:47.8,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:86.0677,x:43.5,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:63.7372,x:58.4,y:134.85,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:84.138,x:59.05,y:138.4,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4195,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4372,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3595,x:-41.15,regY:-51.6,y:185.35,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9821,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.095,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.9915,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-145.8155,x:-32.65,y:54.8,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-163.5053,x:33.9,y:109.35,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-169.8808,x:34,y:109.4,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-113.4352,x:-59.1,y:-12.1,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7366,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.9058,y:-21.05,regY:13.7,x:47.85,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:87.6013,x:43.75,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:65.2251,x:56.2,y:135.25,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:86.7911,x:56.7,y:138.75,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4203,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4391,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3551,x:-41.35,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9838,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1004,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.149,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-142.1794,x:-35.35,y:55.8,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-159.8736,x:27.65,y:114.5,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-166.2447,x:27.75,y:114.55,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-111.2325,x:-58.95,y:-12.15,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7357,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.8627,y:-21.05,regY:13.8,x:47.8,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:89.1349,x:43.75,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:66.713,x:53.95,y:135.65,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:89.4416,x:54.4,y:139.05,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4212,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.441,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3507,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9856,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1057,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.3057,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-138.5429,x:-37.95,y:56.7,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-156.2441,x:21.2,y:119.3,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-162.6081,x:21.3,y:119.25,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-109.0299,x:-59.05,y:-12.05,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.734,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.8197,y:-21,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:90.6635,x:43.9,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:68.2009,x:51.75,y:135.8,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:92.0892,x:52.15,y:139.3,regX:-10.3,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.423,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4417,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3472,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9882,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1128,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.4632,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-134.907,x:-40.65,y:57.45,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-152.613,x:14.35,y:123.6,regY:-9,regX:5}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-158.9724,x:14.55,y:123.7,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-106.8266,x:-59.1,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7322,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.7767,y:-21.05,regY:13.8,x:47.8,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:92.1961,x:43.85,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:69.6879,x:49.5,y:136,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:94.7414,x:49.7,y:139.5,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4239,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4436,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3419,x:-41.3,regY:-51.5,y:185.45,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9901,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1182,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.6192,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-131.2714,x:-43.35,y:58.1,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-148.9824,x:7.35,y:127.8,regY:-9.1,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-155.3373,x:7.5,y:127.7,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-104.6231,x:-59.2,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7313,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.7336,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:93.7302,x:43.85,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:71.177,x:47.25,y:136.25,regY:13.3,regX:-7.6}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:97.3912,x:47.3,y:139.7,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4257,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4454,x:-4.1,y:-59.15,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:6.3374,x:-41.3,regY:-51.5,y:185.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9918,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1235,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.7761,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-127.6363,x:-46.05,y:58.65,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-145.3521,x:0.3,y:131.35,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-151.7001,x:0.35,y:131.35,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-102.4192,x:-59.15,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7296,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.6906,y:-21.05,regY:13.8,x:47.75,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:95.2635,x:44,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:72.6653,x:45.05,y:136.1,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:100.0439,x:45.05,y:139.75,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4266,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.447,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3331,x:-41.3,regY:-51.5,y:185.5,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9945,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.128,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.9331,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-123.9983,x:-48.8,y:59.1,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-141.7222,x:-7.25,y:134.55,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-148.0649,x:-7,y:134.65,regX:14.5}},{t:this.instance,p:{regX:33.6,scaleX:0.9977,scaleY:0.9977,rotation:-100.2168,x:-59.2,y:-12.15,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7278,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.6467,y:-20.9,regY:13.7,x:47.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:96.797,x:44.05,y:49.9,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:74.1526,x:42.7,y:136.15,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:102.6951,x:42.65,y:139.75,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4283,x:34.3,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4472,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3285,x:-41.3,regY:-51.5,y:185.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9962,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1333,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.0902,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-120.3632,x:-51.55,y:59.45,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-138.091,x:-14.8,y:137.5,regY:-9.1,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-144.428,x:-14.65,y:137.45,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-98.0139,x:-59.05,y:-12.1,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7261,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.6054,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:98.3294,x:44,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:75.64,x:40.45,y:136.1,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:105.3461,x:40.3,y:139.65,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4292,x:34.3,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4491,x:-4.1,y:-59.15,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:6.3242,x:-41.3,regY:-51.5,y:185.55,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9988,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1387,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.2472,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-116.7269,x:-54.2,y:59.7,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-134.4608,x:-22.5,y:139.85,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-140.7921,x:-22.35,y:139.95,regX:14.5}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-95.8097,x:-59.25,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7243,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:93.5624,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:99.8632,x:44.1,y:50,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:77.1288,x:38.2,y:136.05,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:107.997,x:37.95,y:139.6,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.431,x:34.3,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4515,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3198,x:-41.35,regY:-51.5,y:185.55,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:4.0005,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.144,x:23.95,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.4035,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-113.0917,x:-57.05,y:59.85,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-130.8304,x:-30.45,y:141.8,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-137.1567,x:-30.25,y:141.85,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9976,scaleY:0.9976,rotation:-93.6068,x:-59.2,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7234,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.5194,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:101.3962,x:44.3,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:78.6172,x:36,y:135.8,regY:13.3,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:110.6491,x:35.6,y:139.35,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4318,x:34.4,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4516,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3154,x:-41.2,regY:-51.5,y:185.5,scaleX:0.9951,scaleY:0.9951,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:4.0033,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1494,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.5607,x:1.45,y:-80.8}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-109.4555,x:-59.8,y:59.9,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-127.1993,x:-38.5,y:143.4,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-133.5194,x:-38.35,y:143.4,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9977,scaleY:0.9977,rotation:-91.4049,x:-59.15,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7217,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.4755,y:-21.05,regY:13.7,x:47.9,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:102.9302,x:44.15,y:49.9,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:80.1041,x:33.75,y:135.7,regY:13.3,regX:-7.6}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:113.2999,x:33.4,y:139.1,regX:-10.3,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4327,x:34.4,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4535,x:-4.15,y:-59.15,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:6.311,x:-41.2,regY:-51.5,y:185.5,scaleX:0.9951,scaleY:0.9951,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:4.0059,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1547,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.7181,x:1.45,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-105.8196,x:-62.6,y:59.8,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-123.5707,x:-46.55,y:144.45,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-129.8836,x:-46.5,y:144.55,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9977,scaleY:0.9977,rotation:-89.2052,x:-59.15,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7199,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.4324,y:-20.9,regY:13.7,x:47.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:104.4637,x:44.3,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:81.5928,x:31.65,y:135.25,regY:13.2,regX:-7.7}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:115.9512,x:31,y:138.7,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4344,x:34.4,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4561,x:-4.15,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3064,x:-41.25,regY:-51.5,y:185.5,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:4.0077,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1609,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.8747,x:1.4,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-102.1832,x:-65.4,y:59.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-119.9398,x:-54.8,y:145.2,regY:-9.1,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-126.2476,x:-54.7,y:145.15,regX:14.6}},{t:this.instance,p:{regX:33.5,scaleX:0.9977,scaleY:0.9977,rotation:-87.0007,x:-59.2,y:-12.05,regY:10.1}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7182,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:93.3895,y:-20.9,regY:13.7,x:47.95,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:105.9955,x:44.35,y:50.1,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:83.0797,x:29.35,y:135.05,regY:13.2,regX:-7.6}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:118.6007,x:28.6,y:138.4,regX:-10.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4353,x:34.4,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.457,x:-4.15,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3022,x:-41.25,regY:-51.5,y:185.5,scaleX:0.9951,scaleY:0.9951,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:4.0085,y:89.85,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1663,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-12.0297,x:1.4,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.5473,x:-68.15,y:59.3,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-116.3083,x:-62.9,y:145.35,regY:-9,regX:4.9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.6118,x:-62.9,y:145.4,regX:14.6}},{t:this.instance,p:{regX:33.6,scaleX:0.9977,scaleY:0.9977,rotation:-84.7989,x:-59.1,y:-12.2,regY:10.2}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-98.5,-212.4,239.8,510);


(lib.CharacterCivilian_08 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-59,-12.25,0.9978,0.9978,-67.6913,0,0,33.8,10.3);

	this.instance_1 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1.setTransform(-14.75,98.4,0.9973,0.9973,-155.7627,0,0,14.4,-0.1);

	this.instance_2 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_2.setTransform(-14.8,98.2,0.9976,0.9976,-168.7722,0,0,4.7,-8.8);

	this.instance_3 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_3.setTransform(-89.1,53.45,0.9976,0.9976,-153.9425,0,0,44.9,7.6);

	this.instance_4 = new lib.ch1_headcopy_3("synched",0);
	this.instance_4.setTransform(1.45,-80.7,0.9983,0.9983,-11.4825,0,0,1.9,51.1);

	this.instance_5 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_6.setTransform(25.65,87.3,0.9948,0.9948,-11.3754,0,0,-0.2,5);

	this.instance_7 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_7.setTransform(-28.85,90.4,0.9956,0.9956,2.1369,0,0,1.4,-42.8);

	this.instance_8 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_8.setTransform(-37.3,186.2,0.9952,0.9952,8.009,0,0,1.1,-51.6);

	this.instance_9 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_9.setTransform(-4.15,-59.25,0.9984,0.9984,11.7954,0,0,-1.3,7.6);

	this.instance_10 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_10.setTransform(39.55,183.7,0.9949,0.9949,-2.6407,0,0,3.6,-50.5);

	this.instance_11 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_11.setTransform(87.95,131.55,0.9975,0.9975,53.3813,0,0,-10.5,10.6);

	this.instance_12 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_12.setTransform(86.15,128.4,0.9975,0.9975,49.1454,0,0,-8,13.6);

	this.instance_13 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_13.setTransform(50.7,50,0.9977,0.9977,71.3871,0,0,-45.7,13);

	this.instance_14 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_14.setTransform(47.9,-21.25,0.9979,0.9979,88.322,0,0,-33,13.7);

	this.instance_15 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_15.setTransform(-9.5,49,0.9995,0.9995,1.7768,0,0,-4.2,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{rotation:1.7768,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9979,scaleY:0.9979,rotation:88.322,x:47.9,y:-21.25}},{t:this.instance_13,p:{regY:13,scaleX:0.9977,scaleY:0.9977,rotation:71.3871,x:50.7,y:50,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:49.1454,x:86.15,y:128.4,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:53.3813,x:87.95,y:131.55,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9949,scaleY:0.9949,rotation:-2.6407,y:183.7,x:39.55}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,rotation:11.7954,y:-59.25,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9952,scaleY:0.9952,rotation:8.009,x:-37.3,y:186.2}},{t:this.instance_7,p:{regY:-42.8,rotation:2.1369,x:-28.85,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5,scaleX:0.9948,scaleY:0.9948,rotation:-11.3754,x:25.65,y:87.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.4825,x:1.45,y:-80.7}},{t:this.instance_3,p:{regY:7.6,rotation:-153.9425,x:-89.1,y:53.45,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.8,rotation:-168.7722,x:-14.8,y:98.2,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-155.7627,x:-14.75,y:98.4,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9978,scaleY:0.9978,rotation:-67.6913,x:-59,y:-12.25,regX:33.8,regY:10.3}}]}).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:79.3314,x:47.6,y:-21.3}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:62.7271,x:61.7,y:48.65,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:40.4858,x:108.5,y:120.85,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:44.7211,x:110.8,y:123.55,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.64,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7874,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1361,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.3403,x:1.55,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-153.3989,x:-89.25,y:53.4,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-168.2303,x:-15.35,y:98.9,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-155.2211,x:-15.25,y:99.05,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.6375,x:-58.95,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:70.3414,x:47.8,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:54.0672,x:72.45,y:45.55,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:31.8251,x:129.55,y:110.05,regY:13.7,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:36.0597,x:132.35,y:112.35,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.64,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7785,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1361,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.1983,x:1.55,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-152.8564,x:-89.25,y:53.4,regX:44.8,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.8,rotation:-167.6864,x:-15.85,y:99.5,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-154.6771,x:-15.75,y:99.65,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.5812,x:-58.95,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:61.3499,x:47.75,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:45.4059,x:82.65,y:40.9,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:23.1653,x:148.65,y:95.8,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:27.402,x:151.9,y:97.9,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.64,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7702,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1361,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.0556,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-152.312,x:-89.35,y:53.35,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-167.1438,x:-16.35,y:100.2,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-154.134,x:-16.2,y:100.4,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.5262,x:-58.95,y:-12.2,regX:33.7,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:52.3576,x:47.75,y:-21.2}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:36.7472,x:91.85,y:34.7,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:14.5048,x:165.6,y:79.1,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:18.7415,x:168.9,y:80.6,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7603,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.9128,x:1.55,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-151.7698,x:-89.35,y:53.3,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-9,rotation:-166.6012,x:-16.8,y:101.05,scaleX:0.9976,scaleY:0.9976,regX:4.6}},{t:this.instance_1,p:{rotation:-153.5902,x:-16.7,y:101.05,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.4712,x:-58.95,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:43.366,x:47.6,y:-21.15}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:28.0864,x:100.2,y:27.15,regX:-45.6}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:5.8451,x:179.55,y:59.95,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:10.0801,x:183.15,y:60.85,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7513,y:-59.2,x:-4.2,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.7704,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.6,rotation:-151.227,x:-89.3,y:53.25,regX:44.8,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-166.0564,x:-17.35,y:101.45,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-153.048,x:-17.25,y:101.7,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.417,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:34.3737,x:47.7,y:-21.25}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9976,scaleY:0.9976,rotation:19.4253,x:106.95,y:18.35,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:-2.8103,x:190.6,y:38.8,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:1.4193,x:194.2,y:39.25,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7424,y:-59.2,x:-4.2,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.6277,x:1.55,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-150.6824,x:-89.45,y:53.3,regX:44.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-165.5137,x:-17.85,y:102.2,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-152.503,x:-17.8,y:102.3,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.362,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.4,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:25.3828,x:47.7,y:-21.2}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:10.7659,x:112.45,y:8.6,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-11.4712,x:198.2,y:16.25,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-7.236,x:201.8,y:16.05,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7336,y:-59.2,x:-4.2,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.4842,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.6,rotation:-150.1392,x:-89.55,y:53.2,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-164.9713,x:-18.4,y:102.8,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-151.9618,x:-18.2,y:103.05,regX:14.3,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.3081,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.4,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:16.3919,x:47.65,y:-21.2}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:2.1056,x:116.3,y:-1.85,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-20.1315,x:202.15,y:-7.05,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-15.8972,x:205.8,y:-7.9,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7256,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.3417,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-149.5961,x:-89.65,y:53.25,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-164.4284,x:-18.95,y:103.45,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-151.4174,x:-18.75,y:103.65,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.252,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:7.3998,x:47.65,y:-21.2}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:-6.5505,x:118.5,y:-12.8,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-28.7917,x:202.7,y:-31,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-24.5568,x:206,y:-32.2,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7158,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.1994,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-149.0535,x:-89.65,y:53.15,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-163.884,x:-19.45,y:104.1,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-150.8751,x:-19.35,y:104.25,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.1967,x:-58.9,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:-1.587,x:47.7,y:-21.2}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:-15.2112,x:118.9,y:-24,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-37.4521,x:199.35,y:-54.65,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-33.2169,x:202.6,y:-56.15,regY:10.7,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7068,y:-59.2,x:-4.2,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.057,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-148.51,x:-89.65,y:53.1,regX:44.8,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-163.3427,x:-20,y:104.75,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-150.3315,x:-19.9,y:104.9,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.1416,x:-58.85,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:-10.5776,x:47.65,y:-21.15}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:-23.8707,x:117.6,y:-35.05,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-46.1113,x:192.55,y:-77.5,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-41.8763,x:195.4,y:-79.65,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6979,y:-59.2,x:-4.2,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.9137,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-147.9672,x:-89.8,y:53.05,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-9,rotation:-162.7979,x:-20.6,y:105.5,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-149.7883,x:-20.45,y:105.5,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.0863,x:-58.8,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:-19.5685,x:47.65,y:-21.1}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-32.5295,x:114.5,y:-45.75,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-54.7717,x:182.3,y:-99.05,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-50.5377,x:184.8,y:-101.6,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6888,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.7706,x:1.6,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-147.424,x:-89.8,y:53.1,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-162.2552,x:-21,y:105.95,scaleX:0.9976,scaleY:0.9976,regX:4.6}},{t:this.instance_1,p:{rotation:-149.2452,x:-21,y:106.1,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.0313,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:-28.5611,x:47.65,y:-21.2}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-41.1896,x:109.95,y:-56.05,regX:-45.6}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-63.4322,x:168.9,y:-118.7,regY:13.7,regX:-8}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-59.1973,x:170.95,y:-121.7,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6809,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.6285,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-146.8807,x:-89.85,y:53.05,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-9,rotation:-161.7122,x:-21.65,y:106.7,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-148.7014,x:-21.45,y:106.8,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.9768,x:-58.9,y:-12.45,regX:33.8,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:-37.5511,x:47.6,y:-21.2}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-49.8502,x:103.7,y:-65.25,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-72.0934,x:152.45,y:-136.25,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-67.8569,x:154.15,y:-139.45,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6709,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0059,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.4855,x:1.65,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-146.3372,x:-89.95,y:52.9,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-161.169,x:-22.2,y:107.25,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-148.1586,x:-22.15,y:107.35,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.9222,x:-58.8,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:-46.5429,x:47.55,y:-21.15}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-58.5111,x:96.2,y:-73.6,regX:-45.6}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:-80.7534,x:133.6,y:-150.9,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-76.5169,x:134.8,y:-154.4,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.662,y:-59.3,x:-4.05,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0059,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.3425,x:1.7,y:-80.55}},{t:this.instance_3,p:{regY:7.6,rotation:-145.7934,x:-90,y:52.85,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-160.6257,x:-22.75,y:107.85,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-147.6143,x:-22.7,y:108,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.8672,x:-58.85,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:-37.7274,x:47.6,y:-21.2}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-55.6896,x:103.5,y:-65.45,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-77.9316,x:144.9,y:-140.95,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-73.6966,x:146.2,y:-144.4,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6531,y:-59.3,x:-4.05,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0059,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.2006,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-145.2501,x:-90.1,y:52.85,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.8,rotation:-160.0827,x:-23.25,y:108.4,scaleX:0.9976,scaleY:0.9976,regX:4.6}},{t:this.instance_1,p:{rotation:-147.0717,x:-23.3,y:108.6,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.8119,x:-58.8,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:-28.9132,x:47.65,y:-21.25}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9976,scaleY:0.9976,rotation:-52.8691,x:109.7,y:-56.3,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:-75.1104,x:154.7,y:-129.75,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-70.8743,x:156.15,y:-133.1,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6438,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0059,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.0577,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-144.7074,x:-90.15,y:52.85,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-159.5386,x:-24,y:109,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-146.5285,x:-23.85,y:109.15,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.7565,x:-58.8,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:-20.0985,x:47.65,y:-21.2}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:-50.0474,x:114.4,y:-46.35,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-72.288,x:162.85,y:-117.4,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-68.0536,x:164.55,y:-120.75,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6352,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0059,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.9149,x:1.65,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-144.1638,x:-90.2,y:52.9,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-9,rotation:-158.9953,x:-24.6,y:109.75,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-145.9836,x:-24.45,y:109.75,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.702,x:-58.75,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:-11.2843,x:47.6,y:-21.2}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-47.226,x:117.35,y:-35.95,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-69.4674,x:169.45,y:-104.6,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-65.2307,x:171.15,y:-107.65,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6263,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.7722,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-143.6218,x:-90.2,y:52.85,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-158.4525,x:-25.15,y:110.25,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-145.4411,x:-25.1,y:110.4,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.6458,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:-2.4689,x:47.65,y:-21.25}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-44.4038,x:118.8,y:-25.1,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-66.6471,x:174.25,y:-90.95,regY:13.7,regX:-8.1}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-62.4102,x:176,y:-94.05,regY:10.6,regX:-10.6}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6191,y:-59.3,x:-4.05,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.6296,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-143.0768,x:-90.3,y:52.75,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-157.91,x:-25.85,y:110.85,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-144.8976,x:-25.65,y:110.95,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.5916,x:-58.8,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:6.3407,x:47.65,y:-21.25}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-41.5827,x:118.6,y:-14.1,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-63.8242,x:177.05,y:-77.3,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-59.5886,x:179.15,y:-80.2,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6093,y:-59.3,x:-4.05,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.4868,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-142.5338,x:-90.35,y:52.7,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-157.3658,x:-26.4,y:111.4,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-144.3542,x:-26.2,y:111.6,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.5371,x:-58.75,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:15.1554,x:47.65,y:-21.25}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-38.7607,x:116.6,y:-3.35,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-61.0027,x:178.3,y:-63.5,regY:13.7,regX:-8.1}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-56.7685,x:180.45,y:-66.4,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6004,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.3444,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-141.9916,x:-90.45,y:52.75,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-156.8226,x:-27.05,y:111.85,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-143.8118,x:-26.9,y:112.1,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.4818,x:-58.85,y:-12.3,regX:33.7,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:23.9698,x:47.65,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-35.9391,x:113.1,y:7.05,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:-58.1816,x:177.6,y:-50.05,regY:13.7,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-53.9459,x:179.9,y:-52.85,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5914,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.2,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.2019,x:1.7,y:-80.5}},{t:this.instance_3,p:{regY:7.5,rotation:-141.448,x:-90.55,y:52.75,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-9,rotation:-156.2789,x:-27.6,y:112.65,scaleX:0.9975,scaleY:0.9975,regX:4.6}},{t:this.instance_1,p:{rotation:-143.2684,x:-27.5,y:112.7,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.4272,x:-58.9,y:-12.4,regX:33.8,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:32.7848,x:47.65,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-33.1174,x:108,y:16.7,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-55.3616,x:175.1,y:-37.2,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-51.1239,x:177.75,y:-39.7,regY:10.7,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5825,y:-59.25,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.2,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.0595,x:1.65,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-140.9047,x:-90.55,y:52.7,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-155.7363,x:-28.3,y:113,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-142.7251,x:-28.15,y:113.2,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.3719,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:41.5997,x:47.7,y:-21.25}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-30.2959,x:101.45,y:25.5,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-52.5391,x:171.25,y:-25.05,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-48.3044,x:173.85,y:-27.5,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5736,y:-59.25,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.2,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.9162,x:1.7,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-140.3603,x:-90.7,y:52.7,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-155.1927,x:-28.8,y:113.55,scaleX:0.9975,scaleY:0.9975,regX:4.6}},{t:this.instance_1,p:{rotation:-142.1817,x:-28.8,y:113.8,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.3165,x:-58.8,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:50.4144,x:47.7,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:-27.4764,x:93.7,y:33.1,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-49.717,x:165.8,y:-13.9,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-45.4829,x:168.55,y:-16.3,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6373,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5655,y:-59.25,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.2,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.7739,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-139.8173,x:-90.6,y:52.6,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-154.6505,x:-29.55,y:114.1,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-141.6385,x:-29.35,y:114.45,regX:14.3,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.2608,x:-58.85,y:-12.25,regX:33.7,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:59.229,x:47.7,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:-24.6544,x:84.8,y:39.5,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-46.8969,x:159.15,y:-3.8,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-42.66,x:162,y:-6.1,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6373,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5555,y:-59.25,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.2,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.6316,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-139.2732,x:-90.7,y:52.6,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-154.1064,x:-30.25,y:114.7,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-141.0958,x:-30.1,y:114.9,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.2063,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:68.044,x:47.75,y:-21.4}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:-21.8328,x:75,y:44.4,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-44.074,x:151.45,y:4.8,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-39.839,x:154.4,y:2.7,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6373,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5476,y:-59.25,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.2,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.4886,x:1.7,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-138.7302,x:-90.75,y:52.55,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-153.5631,x:-30.9,y:115.2,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-140.5525,x:-30.6,y:115.55,regX:14.3,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.1514,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:76.8589,x:47.7,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-19.0111,x:64.6,y:47.8,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-41.2538,x:142.9,y:12,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-37.0186,x:146,y:10.1,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6373,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5387,y:-59.25,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.2,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.3464,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-138.1876,x:-90.85,y:52.55,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-153.021,x:-31.6,y:115.7,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-140.0084,x:-31.35,y:115.9,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.0969,x:-58.8,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:85.6729,x:47.65,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:-16.1906,x:53.7,y:49.6,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-38.4326,x:133.85,y:17.65,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-34.1967,x:137,y:15.9,regY:10.7,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6373,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5306,y:-59.25,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.2,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.2033,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-137.644,x:-90.9,y:52.4,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.8,rotation:-152.4766,x:-32.2,y:116.25,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-139.4659,x:-31.95,y:116.6,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.0412,x:-58.8,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:94.4836,x:47.65,y:-21.4}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-13.3698,x:42.95,y:49.7,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-35.6109,x:124.4,y:21.7,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-31.3754,x:127.6,y:20.05,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6373,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5205,y:-59.25,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.2,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.0612,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-137.1007,x:-90.9,y:52.5,regX:44.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-151.9328,x:-33,y:116.85,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-138.922,x:-32.7,y:117.05,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-65.9862,x:-58.85,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:103.2978,x:47.85,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:-10.5475,x:32.15,y:48.15,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-32.7891,x:114.9,y:24.05,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-28.5541,x:118.15,y:22.65,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6373,y:183.6,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5117,y:-59.25,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.2,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.9183,x:1.7,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-136.5575,x:-90.95,y:52.45,regX:44.8,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-151.3901,x:-33.5,y:117.4,scaleX:0.9975,scaleY:0.9975,regX:4.6}},{t:this.instance_1,p:{rotation:-138.3792,x:-33.4,y:117.5,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-65.9309,x:-58.85,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:102.8669,x:47.85,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:-8.2164,x:32.7,y:48.2,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-30.4609,x:116.3,y:27.6,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-26.2318,x:119.5,y:26.25,regY:10.6,regX:-10.6}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9949,scaleY:0.9949,rotation:-2.6435,y:183.6,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5272,y:-59.25,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1371,x:-28.85,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3756,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.048,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-135.0434,x:-91.7,y:52.05,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-149.8765,x:-36,y:118.55,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-136.8619,x:-35.8,y:118.7,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-65.3187,x:-58.8,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7707,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:102.4359,x:47.85,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:-5.8849,x:33.2,y:48.25,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-28.1328,x:117.55,y:31.1,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-23.9113,x:121.05,y:29.95,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6497,y:183.6,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5413,y:-59.25,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1414,x:-28.85,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3782,x:25.6,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.1777,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-133.528,x:-92.5,y:51.7,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-148.3639,x:-38.4,y:119.45,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-135.3447,x:-38.2,y:119.7,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-64.7079,x:-58.85,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.769,x:-9.45,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:102.0055,x:47.85,y:-21.35}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9976,scaleY:0.9976,rotation:-3.5535,x:33.7,y:48.55,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-25.8046,x:118.75,y:34.65,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-21.5891,x:122.2,y:33.65,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9949,scaleY:0.9949,rotation:-2.6566,y:183.6,x:39.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5566,y:-59.25,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1458,x:-28.85,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3799,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.3067,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-132.0129,x:-93.1,y:51.35,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-146.851,x:-40.95,y:120.65,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-133.8265,x:-40.75,y:120.8,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-64.0957,x:-58.8,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7672,x:-9.5,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:101.5751,x:47.8,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:-1.2218,x:34.25,y:48.5,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-23.4758,x:119.85,y:38.4,regY:13.7,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-19.2652,x:123.25,y:37.35,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.6629,y:183.6,x:39.45}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.571,y:-59.25,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1511,x:-28.85,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3828,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.4382,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-130.4993,x:-93.65,y:51,regX:44.8,scaleX:0.9976,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-145.3385,x:-43.45,y:121.55,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-132.3093,x:-43.2,y:121.8,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-63.4835,x:-58.8,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7655,x:-9.5,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:101.1451,x:47.8,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:1.1061,x:34.75,y:48.55,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-21.1471,x:120.6,y:41.9,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-16.9446,x:124.2,y:41.05,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.669,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5861,y:-59.25,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0085,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1546,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3856,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.5672,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-128.9845,x:-94.55,y:50.65,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-143.8264,x:-46.05,y:122.55,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-130.7908,x:-45.9,y:122.75,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-62.8718,x:-58.85,y:-12.2,regX:33.7,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7637,x:-9.5,y:48.95}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:100.7142,x:47.65,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:3.4367,x:35.25,y:48.75,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:-18.8194,x:121.35,y:45.4,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-14.6224,x:124.8,y:44.8,regY:10.6,regX:-10.6}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.6751,y:183.65,x:39.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6021,y:-59.25,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0085,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1599,x:-28.85,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3873,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.6961,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.6,rotation:-127.4692,x:-95.1,y:50.15,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-142.3134,x:-48.6,y:123.45,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-129.2737,x:-48.5,y:123.55,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-62.2588,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.762,x:-9.5,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:100.2837,x:47.85,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:5.7687,x:35.85,y:48.75,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-16.4913,x:121.95,y:49,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-12.3007,x:125.4,y:48.75,regY:10.7,regX:-10.6}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.6822,y:183.65,x:39.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6156,y:-59.25,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0085,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1643,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3901,x:25.6,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.8252,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-125.9556,x:-95.8,y:49.9,regX:44.8,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-140.8019,x:-51.3,y:124.2,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-127.757,x:-51.1,y:124.35,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-61.648,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7602,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:99.8538,x:47.8,y:-21.35}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9976,scaleY:0.9976,rotation:8.1005,x:36.2,y:49,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-14.1629,x:122.25,y:52.6,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-9.9794,x:126,y:52.3,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6884,y:183.65,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6308,y:-59.25,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0085,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1687,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3918,x:25.6,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.955,x:1.65,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-124.4405,x:-96.5,y:49.35,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-139.2888,x:-53.85,y:124.95,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-126.2396,x:-53.8,y:125.1,regX:14.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-61.0351,x:-58.85,y:-12.2,regX:33.7,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7585,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:99.4237,x:47.8,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:10.4299,x:36.85,y:48.95,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:-11.8335,x:122.75,y:56.25,regY:13.7,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-7.6568,x:126.2,y:56.1,regY:10.6,regX:-10.6}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6945,y:183.65,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.646,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0085,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1731,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3944,x:25.6,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.0851,x:1.65,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-122.9261,x:-97.1,y:49,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-137.775,x:-56.5,y:125.55,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-124.7223,x:-56.45,y:125.8,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-60.4242,x:-58.8,y:-12.45,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7567,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:98.9932,x:47.8,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:12.7625,x:37.55,y:49.1,regX:-45.6}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-9.5056,x:122.9,y:59.7,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-5.3346,x:126.45,y:59.75,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.7007,y:183.6,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6603,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0093,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1775,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.397,x:25.6,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.2143,x:1.7,y:-80.5}},{t:this.instance_3,p:{regY:7.6,rotation:-121.4118,x:-97.7,y:48.55,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-136.2625,x:-59.3,y:126.2,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-123.2045,x:-59.1,y:126.5,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-59.8122,x:-58.8,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.755,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:98.5623,x:47.85,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9976,scaleY:0.9976,rotation:15.094,x:38,y:49.15,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:-7.178,x:122.95,y:63.25,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-3.0124,x:126.5,y:63.4,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.7069,y:183.6,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6744,y:-59.2,x:-4.1,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0093,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1818,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3989,x:25.6,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.3445,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-119.8964,x:-98.45,y:48.1,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-134.7509,x:-61.9,y:126.8,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-121.6866,x:-61.9,y:127.1,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-59.2002,x:-58.8,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7532,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:98.132,x:47.7,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:17.425,x:38.35,y:49.1,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:-4.8485,x:122.75,y:66.75,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-0.6899,x:126.4,y:67.15,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.7139,y:183.6,x:39.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6897,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0093,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1863,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4015,x:25.6,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.4746,x:1.7,y:-80.55}},{t:this.instance_3,p:{regY:7.6,rotation:-118.3817,x:-99.05,y:47.65,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-133.2372,x:-64.7,y:127.4,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-120.1696,x:-64.55,y:127.55,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-58.5893,x:-58.9,y:-12.5,regX:33.8,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7515,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:97.7011,x:47.75,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:19.7571,x:39,y:49.25,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:-2.5199,x:122.5,y:70.3,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:1.628,x:126.1,y:70.75,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.72,y:183.6,x:39.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7039,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0102,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1906,x:-28.9,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4044,x:25.6,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.6039,x:1.75,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-116.868,x:-99.75,y:47.25,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-9,rotation:-131.7248,x:-67.5,y:127.9,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-118.6524,x:-67.35,y:128.05,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-57.9774,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7497,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:97.2709,x:47.75,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:22.088,x:39.4,y:49.25,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:-0.192,x:122.1,y:73.75,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:3.9494,x:125.7,y:74.5,regY:10.7,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.7262,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7202,y:-59.2,x:-4.1,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0102,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.1942,x:-28.75,y:90.35,regX:1.5}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4061,x:25.6,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.7333,x:1.7,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-115.3535,x:-100.45,y:46.8,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-9,rotation:-130.212,x:-70.3,y:128.25,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-117.1339,x:-70.1,y:128.35,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-57.3645,x:-58.8,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7488,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.84,x:47.75,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:24.419,x:40.15,y:49.35,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:2.1313,x:121.6,y:77.15,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:6.2712,x:125.2,y:77.9,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.7323,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7343,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0102,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.1985,x:-28.7,y:90.35,regX:1.5}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4089,x:25.6,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.8626,x:1.7,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-113.8376,x:-101.05,y:46.4,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-9,rotation:-128.699,x:-73.1,y:128.55,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-115.617,x:-72.9,y:128.75,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-56.7532,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7471,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.4095,x:47.75,y:-21.3}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:26.7508,x:40.55,y:49.5,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:4.4606,x:121,y:80.5,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:8.5937,x:124.4,y:81.4,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.7376,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7489,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0111,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2029,x:-28.85,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4115,x:25.65,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.9928,x:1.7,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-112.3246,x:-101.7,y:45.9,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.8,rotation:-127.1877,x:-75.75,y:128.65,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-114.099,x:-75.75,y:129,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-56.1405,x:-58.9,y:-12.25,regX:33.7,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7453,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.9794,x:47.75,y:-21.3}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:29.0822,x:41.05,y:49.6,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:6.7886,x:120.15,y:83.75,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:10.9144,x:123.55,y:84.8,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.7447,y:183.55,x:39.65}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,rotation:11.7645,y:-59.2,x:-4.1,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0111,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2073,x:-28.85,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4134,x:25.65,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.1225,x:1.7,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-110.8096,x:-102.25,y:45.55,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-125.6747,x:-78.5,y:129.05,scaleX:0.9975,scaleY:0.9975,regX:4.6}},{t:this.instance_1,p:{rotation:-112.582,x:-78.5,y:129.2,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-55.5293,x:-58.9,y:-12.5,regX:33.8,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7436,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.5488,x:47.8,y:-21.25}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:31.4138,x:41.7,y:49.6,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:9.1181,x:119.2,y:86.95,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:13.2373,x:122.65,y:88.2,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9949,scaleY:0.9949,rotation:-2.7508,y:183.55,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7785,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0112,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2117,x:-28.85,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4159,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.252,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-109.2958,x:-102.85,y:45.05,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-124.1614,x:-81.4,y:129.05,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-111.0651,x:-81.3,y:129.3,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-54.9164,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7419,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.1184,x:47.8,y:-21.3}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:33.7448,x:42.25,y:49.7,regX:-45.6}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:11.4459,x:118.15,y:90.1,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:15.5595,x:121.5,y:91.6,regY:10.7,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.757,y:183.55,x:39.7}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7936,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0121,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2161,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4187,x:25.7,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-9.3815,x:1.65,y:-80.5}},{t:this.instance_3,p:{regY:7.5,rotation:-111.9319,x:-102.1,y:45.55,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-126.7998,x:-76.75,y:128.5,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-113.6987,x:-76.75,y:128.8,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-55.6646,x:-58.85,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7401,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.6875,x:47.85,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:36.0771,x:42.7,y:49.65,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:13.7741,x:116.95,y:93.35,regY:13.7,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:17.8817,x:120.35,y:94.75,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.7632,y:183.55,x:39.75}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8078,y:-59.2,x:-4.1,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0121,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2205,x:-28.8,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4206,x:25.7,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-9.512,x:1.7,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-114.5697,x:-101.4,y:46.1,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-129.4403,x:-72.3,y:127.9,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-116.3322,x:-72.25,y:128.2,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-56.4103,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7392,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.2579,x:47.75,y:-21.25}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:38.4084,x:43.35,y:49.75,regX:-45.6}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:16.1024,x:115.7,y:96.3,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:20.2037,x:118.9,y:97.9,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9949,scaleY:0.9949,rotation:-2.7693,y:183.55,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8231,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0129,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2258,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4232,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.6417,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-117.2067,x:-100.65,y:46.7,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-132.0785,x:-67.8,y:126.95,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-118.9679,x:-67.75,y:127.25,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-57.1572,x:-58.8,y:-12.45,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7375,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:93.8274,x:47.75,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:40.7398,x:43.8,y:49.8,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:18.4319,x:114.25,y:99.2,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:22.5263,x:117.45,y:101,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.7764,y:183.55,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8382,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0129,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.231,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4259,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.7706,x:1.65,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-119.8435,x:-99.85,y:47.25,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-134.718,x:-63.4,y:125.95,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-121.6017,x:-63.3,y:126.15,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-57.9045,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7366,x:-9.5,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:93.3963,x:47.8,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:43.071,x:44.35,y:49.75,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:20.7603,x:112.75,y:102.05,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:24.847,x:115.85,y:104,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.7843,y:183.55,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8518,y:-59.2,x:-4,regX:-1.2,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0138,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2354,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4285,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.9005,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-122.4802,x:-99.05,y:47.75,regX:44.9,scaleX:0.9975,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-137.3575,x:-58.95,y:124.8,scaleX:0.9975,scaleY:0.9975,regX:4.6}},{t:this.instance_1,p:{rotation:-124.2342,x:-59,y:125,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-58.6499,x:-58.8,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7349,x:-9.45,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:92.9663,x:47.75,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:45.4022,x:44.9,y:49.85,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:23.0883,x:111.1,y:104.85,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:27.1699,x:114.15,y:106.8,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9949,scaleY:0.9949,rotation:-2.7904,y:183.55,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8661,y:-59.2,x:-4.05,regX:-1.2,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0138,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2398,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4304,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-10.0309,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-125.1187,x:-98.35,y:48.3,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-139.9951,x:-54.8,y:123.35,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-126.8694,x:-54.7,y:123.5,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-59.3971,x:-58.9,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.734,x:-9.45,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:92.5347,x:47.8,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:47.734,x:45.45,y:49.8,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:25.4161,x:109.35,y:107.55,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:29.4912,x:112.35,y:109.6,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.7975,y:183.55,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8814,y:-59.25,x:-4,regX:-1.2,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0147,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2442,x:-28.8,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.433,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.1611,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-127.7555,x:-97.55,y:48.85,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-142.6346,x:-50.6,y:121.7,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-129.5035,x:-50.55,y:121.9,regX:14.5,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-60.1436,x:-58.95,y:-12.45,regX:33.8,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7322,x:-9.45,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:92.105,x:47.8,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:50.0666,x:46,y:49.85,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:27.7454,x:107.5,y:110.15,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:31.8133,x:110.35,y:112.4,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.8036,y:183.5,x:39.75}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8958,y:-59.25,x:-4,regX:-1.2,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0147,x:-37.35,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2486,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4358,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.2901,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.6,rotation:-130.3918,x:-96.6,y:49.3,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-145.2736,x:-46.45,y:120.05,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-132.1386,x:-46.35,y:120.25,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-60.8903,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7304,x:-9.45,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:91.6755,x:47.8,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:52.3965,x:46.6,y:49.95,regX:-45.6}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:30.0728,x:105.5,y:112.6,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:34.1355,x:108.3,y:114.9,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9949,scaleY:0.9949,rotation:-2.8106,y:183.5,x:39.7}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.9118,y:-59.3,x:-4.15,regX:-1.3,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0155,x:-37.35,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2539,x:-28.8,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4383,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.4202,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-133.0295,x:-95.9,y:49.8,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-147.9128,x:-42.4,y:118.1,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-134.7725,x:-42.35,y:118.35,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-61.637,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7287,x:-9.45,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:91.2434,x:47.8,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:54.7287,x:47.15,y:50,regX:-45.6}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:32.4025,x:103.45,y:114.95,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:36.4579,x:106.1,y:117.4,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.8169,y:183.5,x:39.75}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.926,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0155,x:-37.35,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2583,x:-28.7,y:90.3,regX:1.5}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4402,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.5502,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-135.6681,x:-95.1,y:50.3,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-150.5525,x:-38.55,y:116.1,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-137.4072,x:-38.4,y:116.3,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-62.3827,x:-58.95,y:-12.4,regX:33.8,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7278,x:-9.45,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:90.8149,x:47.8,y:-21.3}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:57.0601,x:47.55,y:50,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:34.7311,x:101.3,y:117.15,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:38.7807,x:103.95,y:119.75,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9949,scaleY:0.9949,rotation:-2.8238,y:183.5,x:39.75}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.9403,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0164,x:-37.35,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2627,x:-28.65,y:90.3,regX:1.5}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.443,x:25.65,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.6802,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-138.3037,x:-94.3,y:50.8,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-153.19,x:-34.75,y:113.85,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-140.0407,x:-34.6,y:114.2,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-63.1297,x:-58.95,y:-12.45,regX:33.8,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7261,x:-9.45,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:90.3846,x:47.85,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:59.3902,x:48.15,y:49.9,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:37.0592,x:99.1,y:119.3,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:41.102,x:101.5,y:121.9,regY:10.6,regX:-10.6}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.83,y:183.5,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.9557,y:-59.35,x:-4.05,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0164,x:-37.4,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2671,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4456,x:25.65,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.8087,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-140.9413,x:-93.5,y:51.3,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-155.8289,x:-31.2,y:111.55,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-142.6749,x:-30.95,y:111.85,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-63.8766,x:-58.9,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7243,x:-9.45,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:89.9588,x:47.9,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:61.7223,x:48.65,y:49.95,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:39.3881,x:96.75,y:121.4,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:43.4254,x:99.1,y:124.1,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.8371,y:183.5,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.9707,y:-59.4,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0173,x:-37.4,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2715,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4483,x:25.7,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.9388,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-143.5792,x:-92.6,y:51.7,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-158.4689,x:-27.6,y:109.1,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-145.3093,x:-27.45,y:109.35,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-64.624,x:-58.85,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7226,x:-9.45,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:89.5277,x:47.85,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:64.0531,x:49.15,y:49.8,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:41.7164,x:94.25,y:123.35,regY:13.7,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:45.7469,x:96.55,y:126.1,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.8432,y:183.5,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.9861,y:-59.35,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0174,x:-37.4,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2767,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4501,x:25.7,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.069,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-146.2146,x:-91.8,y:52.15,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-161.108,x:-24.2,y:106.5,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-147.9429,x:-24,y:106.75,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-65.3697,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7217,x:-9.45,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:89.0975,x:47.85,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:66.3861,x:49.75,y:49.9,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:44.0436,x:91.75,y:125,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:48.0684,x:93.95,y:127.9,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.8502,y:183.45,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:12.0002,y:-59.4,x:-4.05,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0183,x:-37.4,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2812,x:-28.85,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4528,x:25.7,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.1985,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-148.8526,x:-91,y:52.6,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-163.7464,x:-20.95,y:103.75,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-150.5772,x:-20.8,y:103.95,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.1177,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7199,x:-9.45,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9979,scaleY:0.9978,rotation:88.6681,x:47.85,y:-21.3}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:68.7176,x:50.25,y:49.85,regX:-45.8}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:46.3742,x:89.25,y:126.6,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:50.3919,x:91.2,y:129.7,regY:10.7,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.8564,y:183.45,x:39.75}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:12.0165,y:-59.4,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0183,x:-37.45,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2856,x:-28.8,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4554,x:25.7,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.328,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-151.4894,x:-90,y:53.05,regX:44.8,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-166.3853,x:-17.85,y:100.9,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-153.2103,x:-17.6,y:101.1,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.8633,x:-58.95,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7182,x:-9.45,y:49}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:88.2386,x:47.85,y:-21.35}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:71.0482,x:50.85,y:49.9,regX:-45.7}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:48.7022,x:86.7,y:128.2,regY:13.6,regX:-8}},{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:52.7123,x:88.55,y:131.25,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9949,scaleY:0.9949,rotation:-2.8634,y:183.45,x:39.8}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:12.0306,y:-59.4,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0192,x:-37.45,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2899,x:-28.85,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4573,x:25.7,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.4575,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-154.1264,x:-89.2,y:53.45,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-169.0232,x:-14.75,y:97.85,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-155.8452,x:-14.65,y:98.1,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.6107,x:-58.95,y:-12.4,regX:33.8,regY:10.3}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124,-211.7,360.9,509.9);


(lib.CharacterCivilian_06 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-59.2,-12.4,0.9975,0.9975,-65.8894,0,0,33.8,10.1);

	this.instance_1 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1.setTransform(-59.05,132.8,0.9971,0.9971,-146.6781,0,0,14.3,-0.2);

	this.instance_2 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2.setTransform(-59.05,132.8,0.9973,0.9973,-131.782,0,0,4.5,-9);

	this.instance_3 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_3.setTransform(-91.15,52.7,0.9974,0.9974,-116.8826,0,0,44.2,7.5);

	this.instance_4 = new lib.ch1_headcopy2_4("synched",0);
	this.instance_4.setTransform(-0.65,-81.1,0.9981,0.9981,-12.0322,0,0,1.9,51.2);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_6.setTransform(24.35,88.25,0.9946,0.9946,-9.1657,0,0,0.1,4.6);

	this.instance_7 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_7.setTransform(-30.1,89.95,0.9956,0.9956,4.0087,0,0,1.4,-42.6);

	this.instance_8 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_8.setTransform(-42.25,185.75,0.9952,0.9952,3.4363,0,0,0.5,-51);

	this.instance_9 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_9.setTransform(-4.5,-59.65,0.9982,0.9982,5.7271,0,0,-1.7,7.2);

	this.instance_10 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(34.1,185.5,0.9948,0.9948,-2.2908,0,0,3.3,-50.6);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(64.05,138.85,0.9973,0.9973,65.5195,0,0,-10.1,10.3);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(63.85,135.2,0.9973,0.9973,72.3956,0,0,-7.7,13.7);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(51.2,50,0.9974,0.9974,87.2915,0,0,-45.4,13.3);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(47.85,-21,0.9977,0.9977,88.0998,0,0,-32.6,13.8);

	this.instance_15 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_15.setTransform(-9.55,49,0.9995,0.9995,1.7174,0,0,-4.3,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4.3,scaleX:0.9995,scaleY:0.9995,rotation:1.7174,x:-9.55,y:49}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:88.0998,x:47.85,y:-21,regY:13.8,regX:-32.6}},{t:this.instance_13,p:{rotation:87.2915,x:51.2,y:50,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:72.3956,x:63.85,y:135.2,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.3,scaleX:0.9973,scaleY:0.9973,rotation:65.5195,x:64.05,y:138.85,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.6,rotation:-2.2908,x:34.1,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.7271,y:-59.65,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9952,scaleY:0.9952,rotation:3.4363,x:-42.25,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.6,scaleX:0.9956,scaleY:0.9956,rotation:4.0087,x:-30.1,y:89.95}},{t:this.instance_6,p:{regY:4.6,rotation:-9.1657,x:24.35,y:88.25,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.9981,scaleY:0.9981,rotation:-12.0322,x:-0.65,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-116.8826,x:-91.15,y:52.7,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.782,x:-59.05,y:132.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-146.6781,x:-59.05,y:132.8,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10.1,scaleX:0.9975,scaleY:0.9975,rotation:-65.8894,y:-12.4,x:-59.2,regX:33.8}}]}).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7175,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:86.6873,x:47.7,y:-21.05,regY:13.8,regX:-32.6}},{t:this.instance_13,p:{rotation:78.4497,x:53,y:49.8,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:63.5565,x:78.55,y:131.95,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:56.6812,x:79.45,y:135.65,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.2909,x:34.15,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6993,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4303,x:-42.2,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.008,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1599,x:24.3,y:88.3,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-11.8855,x:-0.75,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.861,x:-91.4,y:52.5,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7662,x:-59.4,y:132.75,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-145.7759,x:-59.45,y:132.6,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-65.6173,y:-12.5,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7192,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:85.1373,x:47.85,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:69.2352,x:54.9,y:49.55,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:54.3479,x:93.25,y:126.55,regX:-7.8,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:47.4687,x:94.75,y:130.1,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.2927,x:34.15,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6702,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4251,x:-42.2,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.0055,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1536,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.7386,x:-0.65,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.8403,x:-91.7,y:52.25,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7513,x:-59.7,y:132.6,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-144.8741,x:-59.7,y:132.45,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-65.3463,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7209,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:83.5864,x:47.7,y:-21.1,regY:13.8,regX:-32.6}},{t:this.instance_13,p:{rotation:60.0202,x:56.75,y:49.45,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:45.1376,x:107.05,y:119.3,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:38.2578,x:109.05,y:122.45,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.2953,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6422,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4198,x:-42.05,y:185.7,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.0027,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1474,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.5927,x:-0.75,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.8187,x:-92,y:52.2,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7376,x:-60.05,y:132.5,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-143.9728,x:-60.1,y:132.35,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-65.0733,y:-12.55,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7218,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:82.0362,x:47.85,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:50.8059,x:58.7,y:49.15,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:35.9271,x:119.55,y:110.05,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:29.0476,x:122.05,y:112.9,regX:-10}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.2971,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6132,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4145,x:-42.2,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.0001,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1421,x:24.3,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.4462,x:-0.65,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7971,x:-92.25,y:52,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7227,x:-60.35,y:132.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-143.0694,x:-60.35,y:132.2,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-64.8004,y:-12.55,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7235,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:80.4855,x:47.7,y:-21.05,regY:13.8,regX:-32.6}},{t:this.instance_13,p:{rotation:41.5902,x:60.65,y:48.8,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:26.7168,x:130.35,y:99.2,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:19.8354,x:133.25,y:101.55,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.2988,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5833,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4101,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9983,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1351,x:24.3,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.2996,x:-0.7,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7764,x:-92.55,y:51.9,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7079,x:-60.75,y:132.15,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-142.1672,x:-60.65,y:132.05,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-64.5279,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7253,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:78.9338,x:47.85,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:32.3757,x:62.5,y:48.35,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:17.507,x:139.4,y:87.05,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:10.6248,x:142.6,y:88.9,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3006,x:34.05,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5541,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4048,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9957,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1298,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.1541,x:-0.6,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7548,x:-92.85,y:51.75,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6936,x:-61.05,y:132,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-141.2662,x:-60.95,y:131.95,regX:14.2,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-64.2554,y:-12.45,x:-59.15,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.727,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:77.3846,x:47.85,y:-21.2,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:23.1608,x:64.35,y:48,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:8.2969,x:146.5,y:73.75,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:1.4151,x:149.95,y:75.1,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3024,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5252,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4004,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9931,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1253,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.0084,x:-0.7,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7332,x:-93.15,y:51.55,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6786,x:-61.4,y:131.9,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-140.3632,x:-61.45,y:131.75,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.9822,y:-12.4,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7288,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:75.833,x:47.85,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:13.9457,x:66.15,y:47.5,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-0.9082,x:151.25,y:59.8,regX:-7.8,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-7.7921,x:155,y:60.55,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3041,x:33.95,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.497,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3951,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9904,x:-30.05,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1191,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.8612,x:-0.7,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7129,x:-93.4,y:51.35,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6644,x:-61.7,y:131.75,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-139.4601,x:-61.75,y:131.65,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.709,y:-12.6,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7305,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:74.2828,x:47.85,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:4.7316,x:68,y:46.85,regY:13.2,regX:-45.4}},{t:this.instance_12,p:{rotation:-10.1182,x:154.05,y:45.55,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-17.004,x:157.75,y:45.65,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3059,x:33.95,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4679,y:-59.6,x:-4.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3898,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9878,x:-30.05,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.112,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.715,x:-0.7,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6909,x:-93.7,y:51.15,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6513,x:-62.05,y:131.6,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-138.5589,x:-62.1,y:131.4,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.4365,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7315,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.7327,x:47.85,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-4.4776,x:69.8,y:46.4,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-19.3265,x:154.45,y:31.15,regX:-7.8,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-26.2138,x:158.25,y:30.75,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3085,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4381,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3846,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9852,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1058,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.5687,x:-0.85,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6693,x:-94.1,y:51.1,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6358,x:-62.35,y:131.45,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-137.6572,x:-62.35,y:131.35,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.1629,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7332,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:71.1826,x:47.75,y:-21.25,regY:13.7,regX:-32.7}},{t:this.instance_13,p:{rotation:-13.694,x:71.65,y:45.75,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-28.5375,x:152.85,y:17.15,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-35.425,x:156.45,y:16.15,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3103,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4089,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3784,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9825,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0994,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.4218,x:-0.7,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6478,x:-94.25,y:50.85,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6221,x:-62.65,y:131.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-136.7544,x:-62.65,y:131.2,regX:14.2,regY:-0.2}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-62.8928,y:-12.55,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.735,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:69.6317,x:47.9,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-22.9067,x:73.4,y:45,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-37.7457,x:149,y:3.95,regX:-7.7,scaleX:0.9972,scaleY:0.9972,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-44.6349,x:152.4,y:2.4,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.312,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.3808,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3731,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9807,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.094,x:24.2,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.2758,x:-0.85,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6266,x:-94.6,y:50.8,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6066,x:-63,y:131.1,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-135.8526,x:-63,y:131,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-62.6188,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7367,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:68.0816,x:47.8,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-32.1223,x:75.2,y:44.4,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-46.9567,x:143.15,y:-8.25,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-53.8485,x:146.2,y:-10.4,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3138,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.351,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3687,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9782,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0887,x:24.2,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.1297,x:-0.75,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6054,x:-94.95,y:50.7,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5923,x:-63.3,y:130.9,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-134.9504,x:-63.35,y:130.8,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-62.3463,y:-12.5,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7385,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:66.5311,x:47.85,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-41.3375,x:76.95,y:43.55,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-56.1667,x:135.5,y:-19.25,regX:-7.8,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-63.0586,x:138.3,y:-21.85,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3155,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.321,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3625,x:-41.95,y:185.7,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9755,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0824,x:24.2,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.9831,x:-0.85,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5839,x:-95.2,y:50.45,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5781,x:-63.6,y:130.75,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-134.0476,x:-63.7,y:130.65,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-62.0738,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7393,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:64.9801,x:47.75,y:-21.15,regY:13.8,regX:-32.6}},{t:this.instance_13,p:{rotation:-50.5529,x:78.75,y:42.9,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-65.3756,x:126.4,y:-28.6,regX:-7.8,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-72.2687,x:128.75,y:-31.6,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3173,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2928,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3582,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9737,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0762,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.8372,x:-0.75,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5627,x:-95.4,y:50.2,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5644,x:-63.95,y:130.65,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-133.1457,x:-64,y:130.5,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-61.8017,y:-12.6,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7411,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:63.4302,x:47.85,y:-21.2,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-59.7676,x:80.4,y:42,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-74.5856,x:116.1,y:-36.25,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-81.4805,x:117.9,y:-39.55,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3191,x:33.8,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2638,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3529,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.972,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0701,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.6915,x:-0.75,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5404,x:-95.8,y:50,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5495,x:-64.25,y:130.45,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-132.2434,x:-64.35,y:130.35,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-61.5279,y:-12.6,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7428,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:61.88,x:47.85,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-68.9822,x:82.2,y:41.1,regY:13.3,regX:-45.3}},{t:this.instance_12,p:{rotation:-83.7961,x:104.85,y:-41.75,regX:-7.8,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-90.6864,x:106,y:-45.4,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3208,x:33.8,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2357,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3475,x:-42.05,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9693,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.063,x:24.2,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.544,x:-0.9,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5196,x:-96.1,y:49.85,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5346,x:-64.55,y:130.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-131.3417,x:-64.65,y:130.2,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-61.2545,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7446,x:-9.55,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:60.3289,x:47.9,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-78.1972,x:83.8,y:40.1,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-93.0012,x:92.9,y:-45.4,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-99.8979,x:93.5,y:-49.1,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3235,x:33.75,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2066,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3423,x:-42.05,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9659,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0568,x:24.15,y:88.3,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.3982,x:-0.8,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.498,x:-96.35,y:49.75,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5209,x:-64.8,y:130.1,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-130.439,x:-64.95,y:130.05,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-60.983,y:-12.65,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7464,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:52.2143,x:47.85,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-76.6994,x:92.1,y:34.5,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-91.5001,x:103.45,y:-50.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-98.3972,x:104.15,y:-54.55,regX:-10}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3252,x:33.75,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.1767,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3371,x:-42,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9649,x:-29.95,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0515,x:24.2,y:88.3,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.2535,x:-0.85,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-114.0877,x:-96.95,y:49.3,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-129.1169,x:-68.8,y:131.05,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-127.1486,x:-68.9,y:130.95,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-60.5007,y:-12.65,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7481,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:44.0989,x:47.9,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-75.2012,x:99.55,y:27.75,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-90,x:113.05,y:-57.3,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-96.8969,x:113.9,y:-60.9,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.327,x:33.75,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.1477,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3317,x:-42,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9623,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0452,x:24.2,y:88.3,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.1062,x:-0.8,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-111.677,x:-97.45,y:49.05,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-126.7128,x:-72.8,y:131.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-123.8564,x:-72.9,y:131.7,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-60.0182,y:-12.55,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7499,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:35.9835,x:47.85,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-73.7043,x:105.9,y:19.75,regY:13.3,regX:-45.3}},{t:this.instance_12,p:{rotation:-88.4999,x:121.65,y:-64.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:-95.3961,x:122.7,y:-68.3,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3296,x:33.8,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.1187,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3265,x:-42,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9597,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0399,x:24.25,y:88.3,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-8.9597,x:-0.95,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-109.2666,x:-98.05,y:48.7,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-124.3086,x:-76.85,y:132.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-120.5655,x:-76.9,y:132.35,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-59.5343,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7516,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:27.8691,x:47.85,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-72.2079,x:111.1,y:11.15,regY:13.3,regX:-45.3}},{t:this.instance_12,p:{rotation:-86.9988,x:129.15,y:-72.9,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-93.8946,x:130.1,y:-76.45,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3314,x:33.75,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0905,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3212,x:-42,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9578,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0346,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.8145,x:-0.75,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-106.856,x:-98.55,y:48.35,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-121.9066,x:-80.75,y:132.9,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-117.2752,x:-81,y:132.9,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-59.052,y:-12.6,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7533,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:19.7534,x:47.9,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-70.7102,x:115,y:2,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-85.4963,x:135.2,y:-81.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-92.3949,x:136.25,y:-85.3,regX:-10}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.334,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0616,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3168,x:-42.05,y:185.65,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9553,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0282,x:24.2,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-8.668,x:-0.85,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-104.4451,x:-99.1,y:48,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-119.5024,x:-84.95,y:133.2,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-113.9847,x:-85.1,y:133.25,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-58.5707,y:-12.6,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7559,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:11.6386,x:47.8,y:-21,regY:13.8,regX:-32.6}},{t:this.instance_13,p:{rotation:-69.2135,x:117.6,y:-7.7,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-83.9943,x:140,y:-90.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9973,rotation:-90.8942,x:141.1,y:-94.35,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3358,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0325,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3115,x:-42,y:185.65,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9526,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.021,x:24.2,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.5211,x:-0.85,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-102.0351,x:-99.55,y:47.85,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-117.0975,x:-89.1,y:133.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-110.693,x:-89.3,y:133.4,regX:14.3,regY:-0.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-58.0873,y:-12.65,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7577,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:3.5235,x:47.85,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-67.7153,x:118.75,y:-17.7,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-82.4919,x:143.35,y:-100.2,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-89.3977,x:144.65,y:-103.8,regX:-10}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3375,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0026,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3063,x:-41.9,y:185.65,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9508,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0148,x:24.2,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.3759,x:-0.8,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-99.6249,x:-100.1,y:47.4,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-114.695,x:-93.1,y:133.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-107.4012,x:-93.3,y:133.45,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-57.6053,y:-12.6,x:-59.25,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7594,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-4.5856,x:47.85,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-66.2189,x:118.55,y:-27.75,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-80.9914,x:145.25,y:-109.5,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-87.8972,x:146.6,y:-113.05,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3402,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9736,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3009,x:-42.05,y:185.65,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9482,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0094,x:24.2,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.2298,x:-0.85,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-97.2144,x:-100.65,y:46.95,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-112.2913,x:-97.3,y:133.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-104.1098,x:-97.45,y:133.25,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-57.1219,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7612,x:-9.65,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-12.7015,x:47.8,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-64.7212,x:116.85,y:-37.7,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-79.4889,x:145.75,y:-118.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-86.3962,x:147.2,y:-122.2,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3419,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9446,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2957,x:-42.05,y:185.65,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9465,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0041,x:24.3,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.0829,x:-0.85,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-94.8034,x:-101.1,y:46.6,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-109.8866,x:-101.55,y:133.05,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-100.8191,x:-101.7,y:133,regX:14.3,regY:-0.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-56.6403,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.763,x:-9.65,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-20.8157,x:47.85,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-63.2229,x:113.85,y:-47.25,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-77.987,x:144.75,y:-127.55,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-84.8944,x:146.35,y:-130.95,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3446,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9165,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2913,x:-42.1,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9438,x:-29.95,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-8.9971,x:24.3,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.9378,x:-0.9,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-92.393,x:-101.65,y:46.25,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-107.4832,x:-105.6,y:132.55,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-97.5277,x:-105.65,y:132.55,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-56.1563,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7647,x:-9.65,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-28.9298,x:47.85,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-61.7275,x:109.5,y:-56.3,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-76.4847,x:142.55,y:-135.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-83.3953,x:144.2,y:-139.15,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3464,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8874,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.286,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9412,x:-30,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-8.9918,x:24.25,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.7909,x:-0.8,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-89.9869,x:-102.1,y:45.95,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-105.08,x:-109.6,y:131.9,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-94.2365,x:-109.8,y:131.9,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-55.6752,y:-12.7,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7665,x:-9.65,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-37.0455,x:47.8,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-60.2295,x:103.85,y:-64.7,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-74.9833,x:139,y:-143.25,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-81.8935,x:140.7,y:-146.6,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3481,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8576,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2807,x:-42.1,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9394,x:-30,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-8.9864,x:24.25,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.6442,x:-0.9,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-87.5772,x:-102.65,y:45.5,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-102.676,x:-113.85,y:131.15,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-90.9453,x:-113.9,y:131.2,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-55.1918,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7682,x:-9.6,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-45.1611,x:47.8,y:-21.05,regY:13.8,regX:-32.6}},{t:this.instance_13,p:{rotation:-58.7323,x:97.15,y:-72.15,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-73.4804,x:134.3,y:-149.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:-80.394,x:136.2,y:-153.05,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3507,x:33.8,y:185.45}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8285,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2755,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9368,x:-30,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-8.9802,x:24.25,y:88.4,scaleX:0.9945,scaleY:0.9945}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.4992,x:-0.95,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-85.1667,x:-103.15,y:45.3,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-100.2723,x:-117.85,y:130.25,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-87.6591,x:-117.95,y:130.25,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-54.7098,y:-12.6,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7708,x:-9.6,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-53.2763,x:47.8,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-57.2343,x:89.45,y:-78.55,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-71.9801,x:128.6,y:-155.15,regX:-7.8,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-78.8933,x:130.5,y:-158.4,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3525,x:33.85,y:185.45}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8004,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2719,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9341,x:-29.95,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-8.974,x:24.3,y:88.4,scaleX:0.9945,scaleY:0.9945}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.3527,x:-0.85,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-82.7555,x:-103.65,y:44.8,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-97.869,x:-121.95,y:129.2,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-84.3676,x:-122.05,y:129.2,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-54.2272,y:-12.6,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7726,x:-9.65,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-61.3898,x:47.8,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-55.7374,x:80.85,y:-83.95,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-70.478,x:122.15,y:-159.45,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.8}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-77.3917,x:124.05,y:-162.65,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3543,x:33.85,y:185.45}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7723,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2666,x:-42,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9323,x:-29.95,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-8.9678,x:24.3,y:88.4,scaleX:0.9945,scaleY:0.9945}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.206,x:-0.95,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-80.3449,x:-104.05,y:44.45,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-95.4654,x:-126,y:127.95,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-81.0761,x:-126.05,y:127.9,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-53.7435,y:-12.7,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7708,x:-9.6,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-56.8588,x:47.8,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-54.5554,x:85.75,y:-81.1,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-69.3001,x:128.55,y:-155.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.8}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-76.2138,x:130.5,y:-158.9,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3525,x:33.85,y:185.45}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.797,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.271,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9341,x:-29.95,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-8.974,x:24.3,y:88.4,scaleX:0.9945,scaleY:0.9945}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.3332,x:-0.9,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-81.3073,x:-103.8,y:44.8,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-96.4208,x:-124.2,y:128.55,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-82.8021,x:-124.35,y:128.6,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-54.0633,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7691,x:-9.6,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-52.328,x:47.8,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-53.375,x:90.4,y:-77.9,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-68.1237,x:134.7,y:-151.6,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.8}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-75.0356,x:136.75,y:-154.75,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3507,x:33.8,y:185.45}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8215,y:-59.6,x:-4.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2745,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9359,x:-30,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-8.9785,x:24.25,y:88.4,scaleX:0.9945,scaleY:0.9945}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.4603,x:-0.9,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-82.2684,x:-103.45,y:44.9,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-97.3763,x:-122.5,y:129.1,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-84.5297,x:-122.6,y:129.1,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-54.3842,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7673,x:-9.65,y:48.9}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:-47.7966,x:47.75,y:-21,regY:13.7,regX:-32.7}},{t:this.instance_13,p:{rotation:-52.1932,x:94.75,y:-74.3,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-66.9456,x:140.45,y:-147.3,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-73.8567,x:142.6,y:-150.25,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.349,x:33.8,y:185.45}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8461,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.279,x:-42.1,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9385,x:-30,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-8.9837,x:24.25,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.5867,x:-0.9,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-83.23,x:-103,y:45.35,regY:7.6,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-98.3322,x:-120.8,y:129.65,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-86.2566,x:-120.9,y:129.65,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-54.7035,y:-12.65,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7656,x:-9.65,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-43.2658,x:47.8,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-51.0108,x:98.75,y:-70.55,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-65.7687,x:146.05,y:-142.5,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-72.6788,x:148.3,y:-145.45,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3472,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8716,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2833,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9403,x:-30,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-8.989,x:24.25,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.714,x:-0.9,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9974,rotation:-84.1921,x:-102.75,y:45.4,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-99.2884,x:-118.9,y:130.2,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-87.9819,x:-119.1,y:130.2,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-55.0226,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7647,x:-9.65,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-38.7341,x:47.85,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-49.8291,x:102.55,y:-66.35,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-64.5916,x:151.3,y:-137.25,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-71.5002,x:153.55,y:-140.2,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3455,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.898,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2877,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9421,x:-29.95,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-8.9942,x:24.25,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.8413,x:-0.9,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-85.1535,x:-102.45,y:45.8,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-100.2436,x:-117.35,y:130.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-89.7089,x:-117.4,y:130.7,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-55.3423,y:-12.7,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.763,x:-9.65,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-34.2037,x:47.8,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-48.6482,x:105.9,y:-61.9,regY:13.2,regX:-45.4}},{t:this.instance_12,p:{rotation:-63.4138,x:156.05,y:-131.85,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-70.3224,x:158.5,y:-134.65,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3437,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9226,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2922,x:-42.1,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9446,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-8.9987,x:24.3,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.9686,x:-0.85,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-86.1136,x:-102.1,y:45.85,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-101.1994,x:-115.5,y:131.2,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-91.4303,x:-115.6,y:131.15,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-55.662,y:-12.6,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7612,x:-9.65,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-29.6714,x:47.8,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-47.4664,x:108.9,y:-57.2,regY:13.2,regX:-45.4}},{t:this.instance_12,p:{rotation:-62.2371,x:160.55,y:-126.05,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-69.1438,x:162.95,y:-128.9,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3419,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9472,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2966,x:-42.05,y:185.65,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9465,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0041,x:24.3,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.0942,x:-0.8,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-87.0761,x:-101.85,y:46.25,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-102.1555,x:-113.8,y:131.6,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-93.1565,x:-113.85,y:131.6,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-55.9812,y:-12.6,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7595,x:-9.65,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-25.1406,x:47.8,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-46.2862,x:111.65,y:-52.2,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-61.0596,x:164.65,y:-120.05,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:-67.9653,x:167.15,y:-122.7,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3402,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9728,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3009,x:-42.05,y:185.65,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9482,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0085,x:24.25,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.2218,x:-0.85,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-88.0378,x:-101.5,y:46.4,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-103.1105,x:-112,y:132.1,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-94.8831,x:-112.05,y:132.05,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-56.3009,y:-12.6,x:-59.05,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7577,x:-9.65,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-20.6088,x:47.8,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-45.1035,x:113.95,y:-47.05,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-59.8818,x:168.3,y:-113.75,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-66.7863,x:170.9,y:-116.5,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3384,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9974,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3063,x:-41.9,y:185.65,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9508,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.014,x:24.25,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.3491,x:-0.85,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-88.9997,x:-101.15,y:46.75,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-104.0656,x:-110.3,y:132.45,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-96.6105,x:-110.3,y:132.55,regX:14.2,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-56.6209,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7568,x:-9.6,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-16.0778,x:47.85,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-43.9227,x:115.75,y:-41.8,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-58.7049,x:171.5,y:-107.3,regX:-7.7,scaleX:0.9972,scaleY:0.9972,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-65.6087,x:174.05,y:-110.05,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3367,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0228,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3106,x:-42,y:185.65,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9526,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0194,x:24.25,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.4759,x:-0.8,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-89.9614,x:-100.7,y:46.85,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-105.0211,x:-108.4,y:132.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-98.3358,x:-108.55,y:132.85,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-56.9408,y:-12.55,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7551,x:-9.6,y:48.9}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-11.5469,x:47.85,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-42.7402,x:117.15,y:-36.3,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-57.5272,x:174.4,y:-100.65,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.8}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-64.4297,x:176.95,y:-103.3,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3349,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0492,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.315,x:-42.05,y:185.65,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9544,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0256,x:24.25,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-8.6026,x:-0.85,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-90.9187,x:-100.4,y:47.05,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-105.9777,x:-106.75,y:133.2,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.9971,rotation:-100.0619,x:-106.8,y:133.2,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-57.2608,y:-12.65,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7533,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.0152,x:47.7,y:-21.05,regY:13.7,regX:-32.7}},{t:this.instance_13,p:{rotation:-41.5592,x:118.1,y:-30.75,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-56.3501,x:176.55,y:-94,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:-63.2515,x:179.35,y:-96.5,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3331,x:33.75,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0738,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3195,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.957,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0309,x:24.3,y:88.4,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-8.7302,x:-0.9,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-91.8807,x:-100.1,y:47.3,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-106.9325,x:-105,y:133.5,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-101.7892,x:-104.95,y:133.5,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-57.5793,y:-12.65,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7516,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:-2.4844,x:47.8,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-40.378,x:118.7,y:-25.2,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-55.1724,x:178.35,y:-87.2,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-62.0724,x:181.15,y:-89.7,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3314,x:33.75,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0985,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3238,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9588,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0363,x:24.3,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.857,x:-0.95,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-92.8414,x:-99.9,y:47.55,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-107.888,x:-103.2,y:133.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-103.5158,x:-103.3,y:133.75,regX:14.3,regY:-0.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-57.8996,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7499,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:2.0415,x:47.8,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-39.196,x:118.85,y:-19.55,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-53.9951,x:179.8,y:-80.3,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-60.8951,x:182.6,y:-82.85,regX:-10}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3296,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.1239,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3282,x:-42.1,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9605,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0399,x:24.3,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-8.9839,x:-0.85,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-93.8029,x:-99.5,y:47.7,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-108.845,x:-101.45,y:134.1,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-105.2428,x:-101.45,y:134,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-58.2192,y:-12.55,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.749,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:6.5723,x:47.85,y:-21,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-38.0153,x:118.45,y:-14.1,regY:13.2,regX:-45.4}},{t:this.instance_12,p:{rotation:-52.818,x:180.65,y:-73.45,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-59.7163,x:183.5,y:-75.85,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3279,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.1486,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3326,x:-42.05,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9623,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0452,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.1105,x:-0.8,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-94.7638,x:-99.1,y:48,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-109.7995,x:-99.65,y:134.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-106.9688,x:-99.65,y:134.3,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-58.5388,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7472,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:11.1047,x:47.8,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-36.8329,x:117.6,y:-8.45,regY:13.2,regX:-45.4}},{t:this.instance_12,p:{rotation:-51.6415,x:181.1,y:-66.6,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-58.5387,x:184.05,y:-68.9,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3261,x:33.8,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.1741,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3371,x:-42.05,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9649,x:-29.95,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0506,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.2385,x:-0.9,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-95.726,x:-98.8,y:48.2,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-110.7551,x:-97.9,y:134.5,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-108.6956,x:-97.85,y:134.55,regX:14.2,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-58.859,y:-12.65,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7455,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:15.6353,x:47.8,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-35.6512,x:116.5,y:-2.9,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-50.4646,x:181.1,y:-59.75,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-57.359,x:183.95,y:-62.05,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3244,x:33.8,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2005,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3414,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9659,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0559,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.3653,x:-0.9,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-96.688,x:-98.45,y:48.4,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-111.7107,x:-96.1,y:134.75,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-110.4224,x:-96.05,y:134.8,regX:14.2,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-59.1778,y:-12.6,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7437,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:20.1657,x:47.8,y:-21,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-34.469,x:114.8,y:2.45,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-49.2869,x:180.6,y:-53.1,regX:-7.7,scaleX:0.9972,scaleY:0.9972,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-56.1815,x:183.55,y:-55.35,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3226,x:33.8,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2251,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3458,x:-42.05,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9684,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0613,x:24.25,y:88.3,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.4916,x:-0.7,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-97.6493,x:-98.1,y:48.55,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-112.6654,x:-94.25,y:134.9,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-112.1486,x:-94.4,y:134.9,regX:14.3,regY:-0.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-59.4982,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.742,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:24.6968,x:47.85,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-33.2889,x:112.8,y:7.65,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-48.1084,x:179.6,y:-46.5,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-55.0029,x:182.65,y:-48.65,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3208,x:33.8,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2498,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3503,x:-42.05,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.971,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0665,x:24.3,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.6186,x:-0.75,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-98.612,x:-97.75,y:48.8,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-113.6218,x:-92.45,y:135.05,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-113.8747,x:-92.45,y:134.95,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-59.8168,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7411,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:29.2296,x:47.85,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-32.1077,x:110.3,y:12.7,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-46.932,x:178.25,y:-40.05,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:-53.8246,x:181.45,y:-42.05,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3191,x:33.8,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2752,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3555,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9729,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0717,x:24.3,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.7456,x:-0.75,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-99.5724,x:-97.45,y:49.05,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-114.5781,x:-90.55,y:135.1,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-115.6019,x:-90.7,y:135.1,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-60.1372,y:-12.65,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7393,x:-9.55,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:33.7606,x:47.75,y:-21.05,regY:13.7,regX:-32.7}},{t:this.instance_13,p:{rotation:-30.926,x:107.45,y:17.5,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-45.7544,x:176.5,y:-33.75,regX:-7.7,scaleX:0.9972,scaleY:0.9972,regY:13.8}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-52.6458,x:179.65,y:-35.9,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3164,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2998,y:-59.6,x:-4.45}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3599,x:-42.1,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9737,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.077,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.8718,x:-0.85,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-100.5349,x:-97.05,y:49.25,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-115.5331,x:-88.9,y:135.25,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-117.327,x:-88.9,y:135.2,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-60.4564,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7376,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:36.9577,x:47.75,y:-21.05,regY:13.7,regX:-32.7}},{t:this.instance_13,p:{rotation:-23.9715,x:105.2,y:20.75,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-38.8038,x:179.95,y:-21.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-45.6949,x:183.3,y:-23.45,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3155,x:33.9,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.3245,y:-59.6,x:-4.45}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3643,x:-42,y:185.7,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9764,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0824,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.9991,x:-0.85,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-101.4961,x:-96.75,y:49.45,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-116.489,x:-87.1,y:135.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-119.0552,x:-87.05,y:135.3,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-60.7771,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7367,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:40.1525,x:47.8,y:-21,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-17.0164,x:102.8,y:23.95,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-31.8543,x:182.15,y:-9.3,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-38.7444,x:185.75,y:-10.55,regX:-10}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3138,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.351,y:-59.6,x:-4.45}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3687,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9782,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0877,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.1263,x:-0.65,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-102.4574,x:-96.45,y:49.65,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-117.4437,x:-85.2,y:135.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-120.7806,x:-85.3,y:135.25,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-61.096,y:-12.65,x:-59.05,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.735,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:43.3501,x:47.8,y:-20.9,regY:13.8,regX:-32.6}},{t:this.instance_13,p:{rotation:-10.0627,x:100.1,y:26.8,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-24.9045,x:183.05,y:3.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.8}},{t:this.instance_11,p:{regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:-31.7927,x:186.7,y:2.85,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.312,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.3756,y:-59.6,x:-4.45}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3731,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9799,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0931,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.2533,x:-0.7,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-103.4192,x:-96.05,y:49.8,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-118.4006,x:-83.6,y:135.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-122.5063,x:-83.45,y:135.4,regX:14.2,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-61.4158,y:-12.65,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7341,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:46.547,x:47.85,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:-3.108,x:97.45,y:29.65,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-17.9542,x:182.5,y:16.5,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-24.8416,x:186.1,y:16.25,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3103,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4002,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3774,x:-42.15,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9825,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.0976,x:24.3,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-10.3799,x:-0.7,y:-81.2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-104.3817,x:-95.7,y:50.05,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-119.3556,x:-81.8,y:135.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-124.2327,x:-81.75,y:135.2,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-61.7358,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7323,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:49.743,x:47.8,y:-20.9,regY:13.8,regX:-32.6}},{t:this.instance_13,p:{rotation:3.8404,x:94.5,y:32.4,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-11.0039,x:180.5,y:29.55,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.3,scaleX:0.9973,scaleY:0.9973,rotation:-17.8905,x:184.25,y:29.8,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3085,x:33.85,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4257,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3819,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9843,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1029,x:24.3,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.5074,x:-0.8,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-105.3431,x:-95.4,y:50.25,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-120.3122,x:-80,y:135.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-125.9602,x:-80,y:135.25,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-62.0554,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7306,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:52.9394,x:47.85,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:10.7945,x:91.45,y:34.9,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:-4.0544,x:177.15,y:42.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.8}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:-10.9399,x:180.9,y:43.1,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3068,x:33.9,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4503,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3881,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9861,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1083,x:24.3,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-10.6346,x:-0.7,y:-81.2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-106.3044,x:-94.95,y:50.45,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-121.2679,x:-78.3,y:135.25,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-127.6865,x:-78.2,y:135.1,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-62.3749,y:-12.6,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7297,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:56.1364,x:47.8,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:17.7505,x:88.25,y:37.3,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:2.8924,x:172.5,y:55.25,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:-3.9886,x:176.05,y:56.25,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3059,x:33.95,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4767,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3924,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9887,x:-30.05,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1136,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.7605,x:-0.6,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-107.2661,x:-94.65,y:50.65,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-122.223,x:-76.5,y:135.15,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-129.4138,x:-76.45,y:135.1,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-62.6937,y:-12.45,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7279,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:59.3326,x:47.85,y:-21,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:24.7027,x:84.95,y:39.45,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:9.8424,x:166.35,y:67.45,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:2.9574,x:169.8,y:68.9,regX:-10.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3041,x:33.95,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5023,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3969,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9913,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1198,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.8881,x:-0.7,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-108.2279,x:-94.35,y:50.85,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-123.1787,x:-74.75,y:135,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-131.1397,x:-74.75,y:134.95,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-63.0135,y:-12.55,x:-59,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.727,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:62.5291,x:47.8,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:31.6577,x:81.55,y:41.45,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:16.7927,x:158.9,y:79.2,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.8}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:9.9096,x:162.25,y:80.95,regX:-10}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,rotation:-2.3024,x:33.9,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5277,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4013,x:-42.2,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9939,x:-30.05,y:90.05}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1253,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.0156,x:-0.7,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-109.1901,x:-94,y:51.1,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-124.1353,x:-72.9,y:134.85,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-132.8659,x:-72.95,y:134.8,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.3342,y:-12.6,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7253,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:65.726,x:47.8,y:-21.25,regY:13.7,regX:-32.7}},{t:this.instance_13,p:{rotation:38.6113,x:77.95,y:43.2,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:23.7431,x:150.2,y:89.95,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:16.8609,x:153.2,y:92.2,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.3006,x:34.05,y:185.35}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5516,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4048,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9957,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1298,x:24.25,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.1424,x:-0.8,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-110.15,x:-93.65,y:51.25,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-125.0893,x:-71.25,y:134.75,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-134.5926,x:-71.2,y:134.7,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-63.6545,y:-12.45,x:-59.1,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7244,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:68.9217,x:47.8,y:-21.2,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:45.5665,x:74.45,y:44.85,regY:13.3,regX:-45.3}},{t:this.instance_12,p:{rotation:30.6934,x:140.45,y:99.95,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:23.8117,x:143.15,y:102.5,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.2988,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5771,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4092,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9975,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1343,x:24.3,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.2692,x:-0.65,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-111.1122,x:-93.25,y:51.45,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-126.0453,x:-69.55,y:134.55,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-136.319,x:-69.35,y:134.5,regX:14.2,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.9732,y:-12.45,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7227,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.1179,x:47.85,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:52.5207,x:70.65,y:46.1,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:37.6433,x:129.5,y:108.85,regX:-7.8,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:30.7632,x:131.95,y:111.8,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.2971,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6035,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4136,x:-42.25,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.0001,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1396,x:24.3,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.3962,x:-0.6,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-112.0739,x:-92.8,y:51.6,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-127.0016,x:-67.75,y:134.25,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-138.0459,x:-67.65,y:134.2,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-64.2927,y:-12.45,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7218,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:75.3155,x:47.85,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:59.4761,x:66.85,y:47.35,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:44.5933,x:117.8,y:116.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:37.7138,x:119.8,y:119.9,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.2962,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6281,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.418,x:-42.1,y:185.7,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.0018,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.145,x:24.3,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.5231,x:-0.65,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-113.0356,x:-92.55,y:51.85,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-127.9576,x:-65.95,y:133.95,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-139.7725,x:-65.95,y:134,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-64.6122,y:-12.45,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7201,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:78.5112,x:47.8,y:-21.1,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:66.4289,x:63.1,y:48.3,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:51.543,x:105.05,y:123.45,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.8}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:44.6659,x:106.75,y:126.75,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.2944,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6536,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4224,x:-42.05,y:185.7,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.0037,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1503,x:24.3,y:88.35,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.6499,x:-0.75,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-113.9986,x:-92.15,y:52.1,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9,rotation:-128.913,x:-64.2,y:133.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-141.4984,x:-64.15,y:133.7,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-64.9306,y:-12.55,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7183,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:81.7077,x:47.85,y:-21.25,regY:13.7,regX:-32.7}},{t:this.instance_13,p:{rotation:73.3835,x:59.15,y:49.05,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:58.4932,x:91.85,y:128.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:51.6174,x:93.15,y:132.25,regX:-10}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.2927,x:34.15,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6783,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4268,x:-42.2,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.0062,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1557,x:24.3,y:88.3,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-11.7771,x:-0.7,y:-81.2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-114.9591,x:-91.8,y:52.15,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-129.8684,x:-62.55,y:133.45,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-143.2246,x:-62.5,y:133.4,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-65.2522,y:-12.45,x:-59.15,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7175,x:-9.65,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:84.9042,x:47.85,y:-21.15,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:80.3387,x:55.25,y:49.55,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:65.4447,x:77.95,y:132.55,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.8}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:58.5682,x:78.8,y:136.2,regX:-10.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.2909,x:34.2,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.7028,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4312,x:-42.2,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.008,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.161,x:24.3,y:88.3,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.9042,x:-0.65,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-115.9213,x:-91.45,y:52.4,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-130.8245,x:-60.85,y:133.15,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-144.9513,x:-60.75,y:133.1,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-65.5711,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7165,x:-9.6,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:88.1006,x:47.85,y:-21.05,regY:13.7,regX:-32.6}},{t:this.instance_13,p:{rotation:87.2922,x:51.2,y:49.9,regY:13.3,regX:-45.4}},{t:this.instance_12,p:{rotation:72.394,x:63.85,y:135.1,regX:-7.7,scaleX:0.9973,scaleY:0.9973,regY:13.7}},{t:this.instance_11,p:{regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:65.5201,x:64.15,y:138.8,regX:-10}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,rotation:-2.29,x:34.15,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.7276,y:-59.6,x:-4.45}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4355,x:-42.2,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.009,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,rotation:-9.1664,x:24.3,y:88.3,scaleX:0.9946,scaleY:0.9946}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-12.0305,x:-0.6,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.8826,x:-91.1,y:52.6,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7811,x:-59.05,y:132.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-146.6779,x:-59,y:132.75,regX:14.3,regY:-0.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-65.8904,y:-12.45,x:-59.2,regX:33.8}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-140.8,-211.5,356.1,508.9);


(lib.CharacterBad_04_button = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(23,-12.4,0.4424,0.4422,0,62.7798,-117.1828,35.1,0.3);

	this.instance_1 = new lib.ch1_hand_rcopy2_2("synched",0);
	this.instance_1.setTransform(13.9,49.55,0.4422,0.4422,0,131.3684,-48.6748,6,-1.9);

	this.instance_2 = new lib.ch1_thumb_rcopy2_2("synched",0);
	this.instance_2.setTransform(16.65,46.75,0.4423,0.4423,0,141.6226,-38.4187,5.3,-9.7);

	this.instance_3 = new lib.ch1_lArm_rcopy2_2("synched",0);
	this.instance_3.setTransform(38.9,18.5,0.4423,0.4423,0,128.2751,-51.7658,40.1,-0.5);

	this.instance_4 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_4.setTransform(-2.05,-37.45,0.4424,0.4428,0,0.7819,-179.2175,0.8,52.4);

	this.instance_5 = new lib.ch1_uBodycopy2_2("synched",0);
	this.instance_5.setTransform(0.8,-11.35,0.4429,0.4432,0,0,180,-0.2,-24.2);

	this.instance_6 = new lib.ch1_lLeg_rcopy2_2("synched",0);
	this.instance_6.setTransform(15.2,80.1,0.442,0.4424,0,-0.1462,179.8536,2.7,-54.1);

	this.instance_7 = new lib.ch1_neckcopy2_2("synched",0);
	this.instance_7.setTransform(-0.25,-28.15,0.4424,0.4427,0,-9.8827,170.104,-0.7,8.4);

	this.instance_8 = new lib.ch1_lBodycopy2_2("synched",0);
	this.instance_8.setTransform(0.05,19,0.4429,0.4432,0,0,180,-0.1,-22.8);

	this.instance_9 = new lib.ch1_lLeg_lcopy2_2("synched",0);
	this.instance_9.setTransform(-19.05,79.9,0.4419,0.4422,0,-10.1609,169.8259,4.2,-53);

	this.instance_10 = new lib.ch1_uLeg_lcopy2_2("synched",0);
	this.instance_10.setTransform(-11.35,38.05,0.4419,0.4422,0,12.9558,-167.0263,-0.5,2.5);

	this.instance_11 = new lib.ch1_hand_lcopy2_2("synched",0);
	this.instance_11.setTransform(-50.3,-9.5,0.4424,0.4422,0,62.5162,-117.4497,-5.1,2.9);

	this.instance_12 = new lib.ch1_thumb_lcopy2_2("synched",0);
	this.instance_12.setTransform(-46.3,-6.45,0.4424,0.4423,0,55.6323,-124.3292,-6.1,8.3);

	this.instance_13 = new lib.ch1_lArm_lcopy2_2("synched",0);
	this.instance_13.setTransform(-22.45,19.9,0.4423,0.4423,0,47.756,-132.2023,-40.8,-0.2);

	this.instance_14 = new lib.ch1_uArm_lcopy2_2("synched",0);
	this.instance_14.setTransform(-22.6,-13.85,0.4425,0.4422,0,-91.0697,88.9312,-33,-0.4);

	this.instance_15 = new lib.ch1_uLeg_rcopy2_2("synched",0);
	this.instance_15.setTransform(7.5,38.35,0.4421,0.4424,0,-7.8903,172.0981,2.5,-45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_16 = new lib.CharacterBad_04();
	this.instance_16.setTransform(15.35,19.4,0.4427,0.4427,0,0,180,-40,48.9);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.8,-91,104.1,222.2);


(lib.CivilianQuraisy_angry_button = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ch1_uArm_rcopy_2("synched",0);
	this.instance.setTransform(253.05,61.1,0.4445,0.4445,-74.6428,0,0,33.9,10.1);

	this.instance_1 = new lib.ch1_hand_rcopy_2("synched",0);
	this.instance_1.setTransform(264.65,123.95,0.4443,0.4443,-131.1065,0,0,14.3,-0.4);

	this.instance_2 = new lib.ch1_thumb_rcopy_2("synched",0);
	this.instance_2.setTransform(264.75,123.95,0.4444,0.4444,-110.4589,0,0,4.4,-9.1);

	this.instance_3 = new lib.ch1_lArm_rcopy_2("synched",0);
	this.instance_3.setTransform(243.35,91.95,0.4444,0.4444,-128.9028,0,0,44.2,7.7);

	this.instance_4 = new lib.ch1_headcopy("synched",0);
	this.instance_4.setTransform(279.9,33.15,0.4448,0.4448,-11.8519,0,0,2.1,50.4);

	this.instance_5 = new lib.ch1_uBodycopy_2("synched",0);
	this.instance_5.setTransform(276.1,53.25,0.4456,0.4456,0,0,0,0,-39.7);

	this.instance_6 = new lib.ch1_uLeg_lcopy_2("synched",0);
	this.instance_6.setTransform(290.05,108.65,0.4433,0.4433,-8.9624,0,0,-0.1,4.5);

	this.instance_7 = new lib.ch1_uLeg_rcopy_2("synched",0);
	this.instance_7.setTransform(265.85,109.55,0.4437,0.4437,3.9243,0,0,1.4,-42.5);

	this.instance_8 = new lib.ch1_lLeg_rcopy_2("synched",0);
	this.instance_8.setTransform(260.6,152.25,0.4435,0.4435,2.5515,0,0,0.7,-50.8);

	this.instance_9 = new lib.ch1_neckcopy_2("synched",0);
	this.instance_9.setTransform(277.5,42.85,0.4448,0.4448,11.3415,0,0,-1.4,7.3);

	this.instance_10 = new lib.ch1_lLeg_lcopy_2("synched",0);
	this.instance_10.setTransform(294.35,152.1,0.4434,0.4434,-4.247,0,0,3.3,-50.6);

	this.instance_11 = new lib.ch1_hand_lcopy_2("synched",0);
	this.instance_11.setTransform(316.7,129.35,0.4444,0.4444,55.1318,0,0,-10.2,10.6);

	this.instance_12 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_12.setTransform(316.25,127.65,0.4444,0.4444,65.9214,0,0,-8,13.5);

	this.instance_13 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_13.setTransform(303.65,91.55,0.4445,0.4445,76.198,0,0,-45.4,12.6);

	this.instance_14 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_14.setTransform(300.65,59.85,0.4446,0.4446,85.4844,0,0,-33,13.8);

	this.instance_15 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_15.setTransform(275.2,91.25,0.4454,0.4454,1.763,0,0,-3.9,-21.7);

	this.instance_16 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_16.setTransform(211.65,40.05,0.4449,0.4445,-76.5591,0,0,33.5,10.1);

	this.instance_17 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_17.setTransform(195.25,108.8,0.4446,0.4443,-109.041,0,0,14.4,0.3);

	this.instance_18 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_18.setTransform(195.1,108.8,0.4448,0.4445,-89.64,0,0,4.5,-8.9);

	this.instance_19 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_19.setTransform(203.05,71.15,0.4448,0.4444,-83.4028,0,0,43.8,8.1);

	this.instance_20 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_20.setTransform(235.5,9.3,0.4448,0.4452,-3.8817,0,0,1.8,50.8);

	this.instance_21 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_21.setTransform(235,29.5,0.4457,0.446,0,0,0,0.4,-39.9);

	this.instance_22 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_22.setTransform(249.05,85,0.4432,0.4436,-8.9549,0,0,0.4,4.9);

	this.instance_23 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_23.setTransform(224.75,86.2,0.4437,0.444,3.9174,0,0,1.8,-41.8);

	this.instance_24 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_24.setTransform(219.6,128.35,0.4434,0.4437,20.8881,0,0,1.6,-51.6);

	this.instance_25 = new lib.ch1_neckcopy2("synched",0);
	this.instance_25.setTransform(236.2,18.9,0.4448,0.4452,-6.7755,0,0,-1.2,6.9);

	this.instance_26 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_26.setTransform(253.45,128.15,0.4433,0.4437,-0.4059,0,0,4.3,-50.9);

	this.instance_27 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_27.setTransform(266.15,106.1,0.4446,0.4445,127.0973,0,0,-10.3,11);

	this.instance_28 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_28.setTransform(267.7,105.8,0.4444,0.4446,146.9023,0,0,-7.6,13.3);

	this.instance_29 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_29.setTransform(262.4,67.6,0.4448,0.4445,87.6231,0,0,-45.5,12.1);

	this.instance_30 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_30.setTransform(259.75,36.35,0.4449,0.4446,85.6871,0,0,-32.2,12.9);

	this.instance_31 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_31.setTransform(233.7,67.55,0.4455,0.4458,1.769,0,0,-4.5,-21.9);

	this.instance_32 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_32.setTransform(123.75,63.55,0.4448,0.4447,-84.5603,0,0,33.6,10.2);

	this.instance_33 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_33.setTransform(121.8,133.7,0.4446,0.4445,-122.4594,0,0,14.6,-0.1);

	this.instance_34 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_34.setTransform(121.9,133.65,0.4447,0.4447,-115.9557,0,0,5,-8.8);

	this.instance_35 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_35.setTransform(119.65,95.4,0.4447,0.4447,-98.3917,0,0,44.6,7.6);

	this.instance_36 = new lib.ch1_headcopy_2("synched",0);
	this.instance_36.setTransform(150.7,32.9,0.445,0.445,-11.862,0,0,2,51);

	this.instance_37 = new lib.ch1_uBodycopy("synched",0);
	this.instance_37.setTransform(146.9,52.9,0.4458,0.4458,0,0,0,0,-39.7);

	this.instance_38 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_38.setTransform(160.85,108.2,0.4435,0.4435,-8.9704,0,0,-0.1,4.3);

	this.instance_39 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_39.setTransform(136.7,109.1,0.4438,0.4439,3.9366,0,0,1.4,-42.6);

	this.instance_40 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_40.setTransform(131.8,151.6,0.4436,0.4437,6.4612,0,0,1.6,-51.6);

	this.instance_41 = new lib.ch1_neckcopy("synched",0);
	this.instance_41.setTransform(148.3,42.5,0.445,0.445,11.3539,0,0,-1.2,7.5);

	this.instance_42 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_42.setTransform(165.25,151.65,0.4435,0.4436,-3.3941,0,0,3.5,-50.5);

	this.instance_43 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_43.setTransform(163.1,130.6,0.4447,0.4446,118.0214,0,0,-10.4,10.7);

	this.instance_44 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_44.setTransform(163.4,129.15,0.4447,0.4446,82.7169,0,0,-7.7,13.2);

	this.instance_45 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_45.setTransform(170,91.2,0.4447,0.4447,105.8433,0,0,-45.8,13);

	this.instance_46 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_46.setTransform(171.5,59.6,0.4449,0.4448,93.2291,0,0,-33,13.7);

	this.instance_47 = new lib.ch1_lBodycopy("synched",0);
	this.instance_47.setTransform(145.95,90.85,0.4455,0.4456,1.7759,0,0,-4,-21.9);

	this.instance_48 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_48.setTransform(-205.8,87.45,0.4445,0.4449,0,-65.921,-65.8634,33.9,10.2);

	this.instance_49 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_49.setTransform(-205.8,152.2,0.4447,0.4444,0,-146.6416,-146.7145,14.2,0);

	this.instance_50 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_50.setTransform(-205.75,152.1,0.4446,0.4447,0,-131.7411,-131.8213,4.5,-8.8);

	this.instance_51 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_51.setTransform(-219.95,116.5,0.4445,0.4449,0,-116.8507,-116.9143,44.1,7.8);

	this.instance_52 = new lib.ch1_headcopy2_4("synched",0);
	this.instance_52.setTransform(-179.7,56.8,0.4453,0.4447,-12.0456,0,0,1.9,51.2);

	this.instance_53 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_53.setTransform(-182.65,76.95,0.4462,0.4456,0,0,0,0,-39.6);

	this.instance_54 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_54.setTransform(-168.5,132.35,0.4438,0.4432,-9.1733,0,0,0.3,4.6);

	this.instance_55 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_55.setTransform(-192.9,133.1,0.4442,0.4436,4.0123,0,0,1.4,-42.6);

	this.instance_56 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_56.setTransform(-198.25,175.75,0.444,0.4434,3.4371,0,0,0.7,-51.1);

	this.instance_57 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_57.setTransform(-181.4,66.5,0.4453,0.4447,5.7341,0,0,-1.5,7.4);

	this.instance_58 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_58.setTransform(-164.15,175.6,0.4438,0.4432,-2.2927,0,0,3.6,-50.9);

	this.instance_59 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_59.setTransform(-150.8,154.85,0.4444,0.4448,0,65.551,65.493,-10.1,10.1);

	this.instance_60 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_60.setTransform(-150.95,153.25,0.4444,0.4449,72.4189,0,0,-7.7,13.5);

	this.instance_61 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_61.setTransform(-156.5,115.3,0.4444,0.445,87.2997,0,0,-45.5,13.2);

	this.instance_62 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_62.setTransform(-158.05,83.6,0.4445,0.4451,88.1062,0,0,-32.8,13.7);

	this.instance_63 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_63.setTransform(-183.65,114.9,0.4459,0.4453,1.7162,0,0,-4.2,-21.9);

	this.instance_64 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_64.setTransform(-295.15,56.65,0.4449,0.4445,-76.5591,0,0,33.5,10.1);

	this.instance_65 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_65.setTransform(-311.55,125.4,0.4446,0.4443,-109.041,0,0,14.4,0.3);

	this.instance_66 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_66.setTransform(-311.7,125.4,0.4448,0.4445,-89.64,0,0,4.5,-8.9);

	this.instance_67 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_67.setTransform(-303.75,87.75,0.4448,0.4444,-83.4028,0,0,43.8,8.1);

	this.instance_68 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_68.setTransform(-271.3,25.9,0.4448,0.4452,-3.8817,0,0,1.8,50.8);

	this.instance_69 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_69.setTransform(-271.8,46.1,0.4457,0.446,0,0,0,0.4,-39.9);

	this.instance_70 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_70.setTransform(-257.75,101.6,0.4432,0.4436,-8.9549,0,0,0.4,4.9);

	this.instance_71 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_71.setTransform(-282.05,102.8,0.4437,0.444,3.9174,0,0,1.8,-41.8);

	this.instance_72 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_72.setTransform(-287.2,144.95,0.4434,0.4437,20.8881,0,0,1.6,-51.6);

	this.instance_73 = new lib.ch1_neckcopy2("synched",0);
	this.instance_73.setTransform(-270.6,35.5,0.4448,0.4452,-6.7755,0,0,-1.2,6.9);

	this.instance_74 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_74.setTransform(-253.35,144.75,0.4433,0.4437,-0.4059,0,0,4.3,-50.9);

	this.instance_75 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_75.setTransform(-240.65,122.7,0.4446,0.4445,127.0973,0,0,-10.3,11);

	this.instance_76 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_76.setTransform(-239.1,122.4,0.4444,0.4446,146.9023,0,0,-7.6,13.3);

	this.instance_77 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_77.setTransform(-244.4,84.2,0.4448,0.4445,87.6231,0,0,-45.5,12.1);

	this.instance_78 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_78.setTransform(-247.05,52.95,0.4449,0.4446,85.6871,0,0,-32.2,12.9);

	this.instance_79 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_79.setTransform(-273.1,84.15,0.4455,0.4458,1.769,0,0,-4.5,-21.9);

	this.instance_80 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_80.setTransform(-249.55,15.85,0.4448,0.4447,-84.5603,0,0,33.6,10.2);

	this.instance_81 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_81.setTransform(-251.5,86,0.4446,0.4445,-122.4594,0,0,14.6,-0.1);

	this.instance_82 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_82.setTransform(-251.4,85.95,0.4447,0.4447,-115.9557,0,0,5,-8.8);

	this.instance_83 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_83.setTransform(-253.65,47.7,0.4447,0.4447,-98.3917,0,0,44.6,7.6);

	this.instance_84 = new lib.ch1_headcopy_2("synched",0);
	this.instance_84.setTransform(-222.6,-14.8,0.445,0.445,-11.862,0,0,2,51);

	this.instance_85 = new lib.ch1_uBodycopy("synched",0);
	this.instance_85.setTransform(-226.4,5.2,0.4458,0.4458,0,0,0,0,-39.7);

	this.instance_86 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_86.setTransform(-212.45,60.5,0.4435,0.4435,-8.9704,0,0,-0.1,4.3);

	this.instance_87 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_87.setTransform(-236.6,61.4,0.4438,0.4439,3.9366,0,0,1.4,-42.6);

	this.instance_88 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_88.setTransform(-241.5,103.9,0.4436,0.4437,6.4612,0,0,1.6,-51.6);

	this.instance_89 = new lib.ch1_neckcopy("synched",0);
	this.instance_89.setTransform(-225,-5.2,0.445,0.445,11.3539,0,0,-1.2,7.5);

	this.instance_90 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_90.setTransform(-208.05,103.95,0.4435,0.4436,-3.3941,0,0,3.5,-50.5);

	this.instance_91 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_91.setTransform(-210.2,82.9,0.4447,0.4446,118.0214,0,0,-10.4,10.7);

	this.instance_92 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_92.setTransform(-209.9,81.45,0.4447,0.4446,82.7169,0,0,-7.7,13.2);

	this.instance_93 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_93.setTransform(-203.3,43.5,0.4447,0.4447,105.8433,0,0,-45.8,13);

	this.instance_94 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_94.setTransform(-201.8,11.9,0.4449,0.4448,93.2291,0,0,-33,13.7);

	this.instance_95 = new lib.ch1_lBodycopy("synched",0);
	this.instance_95.setTransform(-227.35,43.15,0.4455,0.4456,1.7759,0,0,-4,-21.9);

	this.instance_96 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_96.setTransform(-165.05,63.55,0.4448,0.4447,-84.5603,0,0,33.6,10.2);

	this.instance_97 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_97.setTransform(-167,133.7,0.4446,0.4445,-122.4594,0,0,14.6,-0.1);

	this.instance_98 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_98.setTransform(-166.9,133.65,0.4447,0.4447,-115.9557,0,0,5,-8.8);

	this.instance_99 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_99.setTransform(-169.15,95.4,0.4447,0.4447,-98.3917,0,0,44.6,7.6);

	this.instance_100 = new lib.ch1_headcopy_2("synched",0);
	this.instance_100.setTransform(-138.1,32.9,0.445,0.445,-11.862,0,0,2,51);

	this.instance_101 = new lib.ch1_uBodycopy("synched",0);
	this.instance_101.setTransform(-141.9,52.9,0.4458,0.4458,0,0,0,0,-39.7);

	this.instance_102 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_102.setTransform(-127.95,108.2,0.4435,0.4435,-8.9704,0,0,-0.1,4.3);

	this.instance_103 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_103.setTransform(-152.1,109.1,0.4438,0.4439,3.9366,0,0,1.4,-42.6);

	this.instance_104 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_104.setTransform(-157,151.6,0.4436,0.4437,6.4612,0,0,1.6,-51.6);

	this.instance_105 = new lib.ch1_neckcopy("synched",0);
	this.instance_105.setTransform(-140.5,42.5,0.445,0.445,11.3539,0,0,-1.2,7.5);

	this.instance_106 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_106.setTransform(-123.55,151.65,0.4435,0.4436,-3.3941,0,0,3.5,-50.5);

	this.instance_107 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_107.setTransform(-125.7,130.6,0.4447,0.4446,118.0214,0,0,-10.4,10.7);

	this.instance_108 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_108.setTransform(-125.4,129.15,0.4447,0.4446,82.7169,0,0,-7.7,13.2);

	this.instance_109 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_109.setTransform(-118.8,91.2,0.4447,0.4447,105.8433,0,0,-45.8,13);

	this.instance_110 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_110.setTransform(-117.3,59.6,0.4449,0.4448,93.2291,0,0,-33,13.7);

	this.instance_111 = new lib.ch1_lBodycopy("synched",0);
	this.instance_111.setTransform(-142.85,90.85,0.4455,0.4456,1.7759,0,0,-4,-21.9);

	this.instance_112 = new lib.ch1_uArm_rcopy_2("synched",0);
	this.instance_112.setTransform(-178.7,13.4,0.4445,0.4445,-74.6428,0,0,33.8,9.8);

	this.instance_113 = new lib.ch1_hand_rcopy_2("synched",0);
	this.instance_113.setTransform(-167.05,76.25,0.4443,0.4443,-131.1065,0,0,14.3,-0.8);

	this.instance_114 = new lib.ch1_thumb_rcopy_2("synched",0);
	this.instance_114.setTransform(-166.95,76.3,0.4444,0.4444,-110.4589,0,0,4.5,-9.4);

	this.instance_115 = new lib.ch1_lArm_rcopy_2("synched",0);
	this.instance_115.setTransform(-188.4,44.25,0.4444,0.4444,-128.9028,0,0,44.5,7.4);

	this.instance_116 = new lib.ch1_headcopy("synched",0);
	this.instance_116.setTransform(-151.8,-14.55,0.4448,0.4448,-11.8519,0,0,1.9,50);

	this.instance_117 = new lib.ch1_uBodycopy_2("synched",0);
	this.instance_117.setTransform(-155.7,5.55,0.4456,0.4456,0,0,0,-0.4,-39.7);

	this.instance_118 = new lib.ch1_uLeg_lcopy_2("synched",0);
	this.instance_118.setTransform(-141.7,61,0.4433,0.4433,-8.9624,0,0,-0.5,4.5);

	this.instance_119 = new lib.ch1_uLeg_rcopy_2("synched",0);
	this.instance_119.setTransform(-165.85,61.85,0.4437,0.4437,3.9243,0,0,1.1,-42.5);

	this.instance_120 = new lib.ch1_lLeg_rcopy_2("synched",0);
	this.instance_120.setTransform(-171.1,104.55,0.4435,0.4435,2.5515,0,0,0.4,-50.8);

	this.instance_121 = new lib.ch1_neckcopy_2("synched",0);
	this.instance_121.setTransform(-154.25,-4.9,0.4448,0.4448,11.3415,0,0,-1.8,7);

	this.instance_122 = new lib.ch1_lLeg_lcopy_2("synched",0);
	this.instance_122.setTransform(-137.35,104.4,0.4434,0.4434,-4.247,0,0,3,-50.6);

	this.instance_123 = new lib.ch1_hand_lcopy_2("synched",0);
	this.instance_123.setTransform(-115.05,81.55,0.4444,0.4444,55.1318,0,0,-10.5,10.8);

	this.instance_124 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_124.setTransform(-115.45,79.95,0.4444,0.4444,65.9214,0,0,-7.8,13.9);

	this.instance_125 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_125.setTransform(-128.1,43.85,0.4445,0.4445,76.198,0,0,-45.5,13);

	this.instance_126 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_126.setTransform(-131.1,12.15,0.4446,0.4446,85.4844,0,0,-32.7,14.1);

	this.instance_127 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_127.setTransform(-156.5,43.55,0.4454,0.4454,1.763,0,0,-4.2,-21.7);

	this.instance_128 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_128.setTransform(-70.9,62.95,0.4449,0.4445,-76.5591,0,0,33.5,10.1);

	this.instance_129 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_129.setTransform(-87.3,131.7,0.4446,0.4443,-109.041,0,0,14.4,0.3);

	this.instance_130 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_130.setTransform(-87.45,131.7,0.4448,0.4445,-89.64,0,0,4.5,-8.9);

	this.instance_131 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_131.setTransform(-79.5,94.05,0.4448,0.4444,-83.4028,0,0,43.8,8.1);

	this.instance_132 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_132.setTransform(-47.05,32.2,0.4448,0.4452,-3.8817,0,0,1.8,50.8);

	this.instance_133 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_133.setTransform(-47.55,52.4,0.4457,0.446,0,0,0,0.4,-39.9);

	this.instance_134 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_134.setTransform(-33.5,107.9,0.4432,0.4436,-8.9549,0,0,0.4,4.9);

	this.instance_135 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_135.setTransform(-57.8,109.1,0.4437,0.444,3.9174,0,0,1.8,-41.8);

	this.instance_136 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_136.setTransform(-62.95,151.25,0.4434,0.4437,20.8881,0,0,1.6,-51.6);

	this.instance_137 = new lib.ch1_neckcopy2("synched",0);
	this.instance_137.setTransform(-46.35,41.8,0.4448,0.4452,-6.7755,0,0,-1.2,6.9);

	this.instance_138 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_138.setTransform(-29.1,151.05,0.4433,0.4437,-0.4059,0,0,4.3,-50.9);

	this.instance_139 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_139.setTransform(-16.4,129,0.4446,0.4445,127.0973,0,0,-10.3,11);

	this.instance_140 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_140.setTransform(-14.85,128.7,0.4444,0.4446,146.9023,0,0,-7.6,13.3);

	this.instance_141 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_141.setTransform(-20.15,90.5,0.4448,0.4445,87.6231,0,0,-45.5,12.1);

	this.instance_142 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_142.setTransform(-22.8,59.25,0.4449,0.4446,85.6871,0,0,-32.2,12.9);

	this.instance_143 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_143.setTransform(-48.85,90.45,0.4455,0.4458,1.769,0,0,-4.5,-21.9);

	this.instance_144 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_144.setTransform(-114.65,14.2,0.4449,0.4445,-76.5591,0,0,33.5,10.1);

	this.instance_145 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_145.setTransform(-131.05,82.95,0.4446,0.4443,-109.041,0,0,14.4,0.3);

	this.instance_146 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_146.setTransform(-131.2,82.95,0.4448,0.4445,-89.64,0,0,4.5,-8.9);

	this.instance_147 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_147.setTransform(-123.25,45.3,0.4448,0.4444,-83.4028,0,0,43.8,8.1);

	this.instance_148 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_148.setTransform(-90.8,-16.55,0.4448,0.4452,-3.8817,0,0,1.8,50.8);

	this.instance_149 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_149.setTransform(-91.3,3.65,0.4457,0.446,0,0,0,0.4,-39.9);

	this.instance_150 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_150.setTransform(-77.25,59.15,0.4432,0.4436,-8.9549,0,0,0.4,4.9);

	this.instance_151 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_151.setTransform(-101.55,60.35,0.4437,0.444,3.9174,0,0,1.8,-41.8);

	this.instance_152 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_152.setTransform(-106.7,102.5,0.4434,0.4437,20.8881,0,0,1.6,-51.6);

	this.instance_153 = new lib.ch1_neckcopy2("synched",0);
	this.instance_153.setTransform(-90.1,-6.95,0.4448,0.4452,-6.7755,0,0,-1.2,6.9);

	this.instance_154 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_154.setTransform(-72.85,102.3,0.4433,0.4437,-0.4059,0,0,4.3,-50.9);

	this.instance_155 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_155.setTransform(-60.15,80.25,0.4446,0.4445,127.0973,0,0,-10.3,11);

	this.instance_156 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_156.setTransform(-58.6,79.95,0.4444,0.4446,146.9023,0,0,-7.6,13.3);

	this.instance_157 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_157.setTransform(-63.9,41.75,0.4448,0.4445,87.6231,0,0,-45.5,12.1);

	this.instance_158 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_158.setTransform(-66.55,10.5,0.4449,0.4446,85.6871,0,0,-32.2,12.9);

	this.instance_159 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_159.setTransform(-92.6,41.7,0.4455,0.4458,1.769,0,0,-4.5,-21.9);

	this.instance_160 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_160.setTransform(35.7,86.3,0.4449,0.4448,-67.692,0,0,33.9,10.3);

	this.instance_161 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_161.setTransform(55.45,135.65,0.4446,0.4446,-155.764,0,0,14.4,-0.1);

	this.instance_162 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_162.setTransform(55.4,135.6,0.4448,0.4448,-168.7737,0,0,4.7,-8.8);

	this.instance_163 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_163.setTransform(22.3,115.6,0.4448,0.4448,-153.9439,0,0,44.8,7.7);

	this.instance_164 = new lib.ch1_headcopy_3("synched",0);
	this.instance_164.setTransform(62.65,55.8,0.4451,0.4451,-11.481,0,0,1.9,51);

	this.instance_165 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_165.setTransform(58.75,75.65,0.4458,0.4459,0,0,0,0,-39.8);

	this.instance_166 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_166.setTransform(73.45,130.65,0.4435,0.4435,-11.3733,0,0,-0.1,5);

	this.instance_167 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_167.setTransform(49.1,132.05,0.4439,0.4439,2.1354,0,0,1.4,-42.8);

	this.instance_168 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_168.setTransform(45.45,174.75,0.4437,0.4437,8.0081,0,0,1.2,-51.7);

	this.instance_169 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_169.setTransform(60.15,65.25,0.4451,0.4451,11.793,0,0,-1.4,7.4);

	this.instance_170 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_170.setTransform(79.65,173.65,0.4435,0.4436,-2.6401,0,0,3.7,-50.5);

	this.instance_171 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_171.setTransform(101.2,150.4,0.4447,0.4447,53.3806,0,0,-10.5,10.6);

	this.instance_172 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_172.setTransform(100.4,149.05,0.4447,0.4447,49.1433,0,0,-8.1,13.5);

	this.instance_173 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_173.setTransform(84.55,114.05,0.4448,0.4448,71.3879,0,0,-45.8,13);

	this.instance_174 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_174.setTransform(83.3,82.3,0.4449,0.4449,88.3235,0,0,-33.1,13.7);

	this.instance_175 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_175.setTransform(57.8,113.65,0.4456,0.4456,1.7758,0,0,-4,-21.9);

	this.instance_176 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_176.setTransform(-206.8,-50,0.4449,0.4448,-67.692,0,0,33.9,10.3);

	this.instance_177 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_177.setTransform(-187.05,-0.65,0.4446,0.4446,-155.764,0,0,14.4,-0.1);

	this.instance_178 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_178.setTransform(-187.1,-0.7,0.4448,0.4448,-168.7737,0,0,4.7,-8.8);

	this.instance_179 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_179.setTransform(-220.2,-20.7,0.4448,0.4448,-153.9439,0,0,44.8,7.7);

	this.instance_180 = new lib.ch1_headcopy_3("synched",0);
	this.instance_180.setTransform(-179.85,-80.5,0.4451,0.4451,-11.481,0,0,1.9,51);

	this.instance_181 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_181.setTransform(-183.75,-60.65,0.4458,0.4459,0,0,0,0,-39.8);

	this.instance_182 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_182.setTransform(-169.05,-5.65,0.4435,0.4435,-11.3733,0,0,-0.1,5);

	this.instance_183 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_183.setTransform(-193.4,-4.25,0.4439,0.4439,2.1354,0,0,1.4,-42.8);

	this.instance_184 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_184.setTransform(-197.05,38.45,0.4437,0.4437,8.0081,0,0,1.2,-51.7);

	this.instance_185 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_185.setTransform(-182.35,-71.05,0.4451,0.4451,11.793,0,0,-1.4,7.4);

	this.instance_186 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_186.setTransform(-162.85,37.35,0.4435,0.4436,-2.6401,0,0,3.7,-50.5);

	this.instance_187 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_187.setTransform(-141.3,14.1,0.4447,0.4447,53.3806,0,0,-10.5,10.6);

	this.instance_188 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_188.setTransform(-142.1,12.75,0.4447,0.4447,49.1433,0,0,-8.1,13.5);

	this.instance_189 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_189.setTransform(-157.95,-22.25,0.4448,0.4448,71.3879,0,0,-45.8,13);

	this.instance_190 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_190.setTransform(-159.2,-54,0.4449,0.4449,88.3235,0,0,-33.1,13.7);

	this.instance_191 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_191.setTransform(-184.7,-22.65,0.4456,0.4456,1.7758,0,0,-4,-21.9);

	this.instance_192 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_192.setTransform(-3.2,15.15,0.4445,0.4449,0,-65.921,-65.8634,33.9,10.2);

	this.instance_193 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_193.setTransform(-3.2,79.9,0.4447,0.4444,0,-146.6416,-146.7145,14.2,0);

	this.instance_194 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_194.setTransform(-3.15,79.8,0.4446,0.4447,0,-131.7411,-131.8213,4.5,-8.8);

	this.instance_195 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_195.setTransform(-17.35,44.2,0.4445,0.4449,0,-116.8507,-116.9143,44.1,7.8);

	this.instance_196 = new lib.ch1_headcopy2_4("synched",0);
	this.instance_196.setTransform(22.9,-15.5,0.4453,0.4447,-12.0456,0,0,1.9,51.2);

	this.instance_197 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_197.setTransform(19.95,4.65,0.4462,0.4456,0,0,0,0,-39.6);

	this.instance_198 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_198.setTransform(34.1,60.05,0.4438,0.4432,-9.1733,0,0,0.3,4.6);

	this.instance_199 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_199.setTransform(9.7,60.8,0.4442,0.4436,4.0123,0,0,1.4,-42.6);

	this.instance_200 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_200.setTransform(4.35,103.45,0.444,0.4434,3.4371,0,0,0.7,-51.1);

	this.instance_201 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_201.setTransform(21.2,-5.8,0.4453,0.4447,5.7341,0,0,-1.5,7.4);

	this.instance_202 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_202.setTransform(38.45,103.3,0.4438,0.4432,-2.2927,0,0,3.6,-50.9);

	this.instance_203 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_203.setTransform(51.8,82.55,0.4444,0.4448,0,65.551,65.493,-10.1,10.1);

	this.instance_204 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_204.setTransform(51.65,80.95,0.4444,0.4449,72.4189,0,0,-7.7,13.5);

	this.instance_205 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_205.setTransform(46.1,43,0.4444,0.445,87.2997,0,0,-45.5,13.2);

	this.instance_206 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_206.setTransform(44.55,11.3,0.4445,0.4451,88.1062,0,0,-32.8,13.7);

	this.instance_207 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_207.setTransform(18.95,42.6,0.4459,0.4453,1.7162,0,0,-4.2,-21.9);

	this.instance_208 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_208.setTransform(-137.55,-40.6,0.4445,0.4449,0,-65.921,-65.8634,33.9,10.2);

	this.instance_209 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_209.setTransform(-137.55,24.15,0.4447,0.4444,0,-146.6416,-146.7145,14.2,0);

	this.instance_210 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_210.setTransform(-137.5,24.05,0.4446,0.4447,0,-131.7411,-131.8213,4.5,-8.8);

	this.instance_211 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_211.setTransform(-151.7,-11.55,0.4445,0.4449,0,-116.8507,-116.9143,44.1,7.8);

	this.instance_212 = new lib.ch1_headcopy2_4("synched",0);
	this.instance_212.setTransform(-111.45,-71.25,0.4453,0.4447,-12.0456,0,0,1.9,51.2);

	this.instance_213 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_213.setTransform(-114.4,-51.1,0.4462,0.4456,0,0,0,0,-39.6);

	this.instance_214 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_214.setTransform(-100.25,4.3,0.4438,0.4432,-9.1733,0,0,0.3,4.6);

	this.instance_215 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_215.setTransform(-124.65,5.05,0.4442,0.4436,4.0123,0,0,1.4,-42.6);

	this.instance_216 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_216.setTransform(-130,47.7,0.444,0.4434,3.4371,0,0,0.7,-51.1);

	this.instance_217 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_217.setTransform(-113.15,-61.55,0.4453,0.4447,5.7341,0,0,-1.5,7.4);

	this.instance_218 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_218.setTransform(-95.9,47.55,0.4438,0.4432,-2.2927,0,0,3.6,-50.9);

	this.instance_219 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_219.setTransform(-82.55,26.8,0.4444,0.4448,0,65.551,65.493,-10.1,10.1);

	this.instance_220 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_220.setTransform(-82.7,25.2,0.4444,0.4449,72.4189,0,0,-7.7,13.5);

	this.instance_221 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_221.setTransform(-88.25,-12.75,0.4444,0.445,87.2997,0,0,-45.5,13.2);

	this.instance_222 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_222.setTransform(-89.8,-44.45,0.4445,0.4451,88.1062,0,0,-32.8,13.7);

	this.instance_223 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_223.setTransform(-115.4,-13.15,0.4459,0.4453,1.7162,0,0,-4.2,-21.9);

	this.instance_224 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_224.setTransform(-53.6,-45.5,0.4448,0.4447,-84.5603,0,0,33.6,10.2);

	this.instance_225 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_225.setTransform(-55.55,24.65,0.4446,0.4445,-122.4594,0,0,14.6,-0.1);

	this.instance_226 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_226.setTransform(-55.45,24.6,0.4447,0.4447,-115.9557,0,0,5,-8.8);

	this.instance_227 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_227.setTransform(-57.7,-13.65,0.4447,0.4447,-98.3917,0,0,44.6,7.6);

	this.instance_228 = new lib.ch1_headcopy_2("synched",0);
	this.instance_228.setTransform(-26.65,-76.15,0.445,0.445,-11.862,0,0,2,51);

	this.instance_229 = new lib.ch1_uBodycopy("synched",0);
	this.instance_229.setTransform(-30.45,-56.15,0.4458,0.4458,0,0,0,0,-39.7);

	this.instance_230 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_230.setTransform(-16.5,-0.85,0.4435,0.4435,-8.9704,0,0,-0.1,4.3);

	this.instance_231 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_231.setTransform(-40.65,0.05,0.4438,0.4439,3.9366,0,0,1.4,-42.6);

	this.instance_232 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_232.setTransform(-45.55,42.55,0.4436,0.4437,6.4612,0,0,1.6,-51.6);

	this.instance_233 = new lib.ch1_neckcopy("synched",0);
	this.instance_233.setTransform(-29.05,-66.55,0.445,0.445,11.3539,0,0,-1.2,7.5);

	this.instance_234 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_234.setTransform(-12.1,42.6,0.4435,0.4436,-3.3941,0,0,3.5,-50.5);

	this.instance_235 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_235.setTransform(-14.25,21.55,0.4447,0.4446,118.0214,0,0,-10.4,10.7);

	this.instance_236 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_236.setTransform(-13.95,20.1,0.4447,0.4446,82.7169,0,0,-7.7,13.2);

	this.instance_237 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_237.setTransform(-7.35,-17.85,0.4447,0.4447,105.8433,0,0,-45.8,13);

	this.instance_238 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_238.setTransform(-5.85,-49.45,0.4449,0.4448,93.2291,0,0,-33,13.7);

	this.instance_239 = new lib.ch1_lBodycopy("synched",0);
	this.instance_239.setTransform(-31.4,-18.2,0.4455,0.4456,1.7759,0,0,-4,-21.9);

	this.instance_240 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_240.setTransform(-344.75,-24.75,0.4448,0.4447,-84.5603,0,0,33.6,10.2);

	this.instance_241 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_241.setTransform(-346.7,45.4,0.4446,0.4445,-122.4594,0,0,14.6,-0.1);

	this.instance_242 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_242.setTransform(-346.6,45.35,0.4447,0.4447,-115.9557,0,0,5,-8.8);

	this.instance_243 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_243.setTransform(-348.85,7.1,0.4447,0.4447,-98.3917,0,0,44.6,7.6);

	this.instance_244 = new lib.ch1_headcopy_2("synched",0);
	this.instance_244.setTransform(-317.8,-55.4,0.445,0.445,-11.862,0,0,2,51);

	this.instance_245 = new lib.ch1_uBodycopy("synched",0);
	this.instance_245.setTransform(-321.6,-35.4,0.4458,0.4458,0,0,0,0,-39.7);

	this.instance_246 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_246.setTransform(-307.65,19.9,0.4435,0.4435,-8.9704,0,0,-0.1,4.3);

	this.instance_247 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_247.setTransform(-331.8,20.8,0.4438,0.4439,3.9366,0,0,1.4,-42.6);

	this.instance_248 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_248.setTransform(-336.7,63.3,0.4436,0.4437,6.4612,0,0,1.6,-51.6);

	this.instance_249 = new lib.ch1_neckcopy("synched",0);
	this.instance_249.setTransform(-320.2,-45.8,0.445,0.445,11.3539,0,0,-1.2,7.5);

	this.instance_250 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_250.setTransform(-303.25,63.35,0.4435,0.4436,-3.3941,0,0,3.5,-50.5);

	this.instance_251 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_251.setTransform(-305.4,42.3,0.4447,0.4446,118.0214,0,0,-10.4,10.7);

	this.instance_252 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_252.setTransform(-305.1,40.85,0.4447,0.4446,82.7169,0,0,-7.7,13.2);

	this.instance_253 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_253.setTransform(-298.5,2.9,0.4447,0.4447,105.8433,0,0,-45.8,13);

	this.instance_254 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_254.setTransform(-297,-28.7,0.4449,0.4448,93.2291,0,0,-33,13.7);

	this.instance_255 = new lib.ch1_lBodycopy("synched",0);
	this.instance_255.setTransform(-322.55,2.55,0.4455,0.4456,1.7759,0,0,-4,-21.9);

	this.instance_256 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_256.setTransform(267.65,-31.6,0.4449,0.4445,-76.5591,0,0,33.5,10.1);

	this.instance_257 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_257.setTransform(251.25,37.15,0.4446,0.4443,-109.041,0,0,14.4,0.3);

	this.instance_258 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_258.setTransform(251.1,37.15,0.4448,0.4445,-89.64,0,0,4.5,-8.9);

	this.instance_259 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_259.setTransform(259.05,-0.5,0.4448,0.4444,-83.4028,0,0,43.8,8.1);

	this.instance_260 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_260.setTransform(291.5,-62.35,0.4448,0.4452,-3.8817,0,0,1.8,50.8);

	this.instance_261 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_261.setTransform(291,-42.15,0.4457,0.446,0,0,0,0.4,-39.9);

	this.instance_262 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_262.setTransform(305.05,13.35,0.4432,0.4436,-8.9549,0,0,0.4,4.9);

	this.instance_263 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_263.setTransform(280.75,14.55,0.4437,0.444,3.9174,0,0,1.8,-41.8);

	this.instance_264 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_264.setTransform(275.6,56.7,0.4434,0.4437,20.8881,0,0,1.6,-51.6);

	this.instance_265 = new lib.ch1_neckcopy2("synched",0);
	this.instance_265.setTransform(292.2,-52.75,0.4448,0.4452,-6.7755,0,0,-1.2,6.9);

	this.instance_266 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_266.setTransform(309.45,56.5,0.4433,0.4437,-0.4059,0,0,4.3,-50.9);

	this.instance_267 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_267.setTransform(322.15,34.45,0.4446,0.4445,127.0973,0,0,-10.3,11);

	this.instance_268 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_268.setTransform(323.7,34.15,0.4444,0.4446,146.9023,0,0,-7.6,13.3);

	this.instance_269 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_269.setTransform(318.4,-4.05,0.4448,0.4445,87.6231,0,0,-45.5,12.1);

	this.instance_270 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_270.setTransform(315.75,-35.3,0.4449,0.4446,85.6871,0,0,-32.2,12.9);

	this.instance_271 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_271.setTransform(289.7,-4.1,0.4455,0.4458,1.769,0,0,-4.5,-21.9);

	this.instance_272 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_272.setTransform(79.2,8.2,0.4449,0.4445,-76.5591,0,0,33.5,10.1);

	this.instance_273 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_273.setTransform(62.8,76.95,0.4446,0.4443,-109.041,0,0,14.4,0.3);

	this.instance_274 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_274.setTransform(62.65,76.95,0.4448,0.4445,-89.64,0,0,4.5,-8.9);

	this.instance_275 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_275.setTransform(70.6,39.3,0.4448,0.4444,-83.4028,0,0,43.8,8.1);

	this.instance_276 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_276.setTransform(103.05,-22.55,0.4448,0.4452,-3.8817,0,0,1.8,50.8);

	this.instance_277 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_277.setTransform(102.55,-2.35,0.4457,0.446,0,0,0,0.4,-39.9);

	this.instance_278 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_278.setTransform(116.6,53.15,0.4432,0.4436,-8.9549,0,0,0.4,4.9);

	this.instance_279 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_279.setTransform(92.3,54.35,0.4437,0.444,3.9174,0,0,1.8,-41.8);

	this.instance_280 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_280.setTransform(87.15,96.5,0.4434,0.4437,20.8881,0,0,1.6,-51.6);

	this.instance_281 = new lib.ch1_neckcopy2("synched",0);
	this.instance_281.setTransform(103.75,-12.95,0.4448,0.4452,-6.7755,0,0,-1.2,6.9);

	this.instance_282 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_282.setTransform(121,96.3,0.4433,0.4437,-0.4059,0,0,4.3,-50.9);

	this.instance_283 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_283.setTransform(133.7,74.25,0.4446,0.4445,127.0973,0,0,-10.3,11);

	this.instance_284 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_284.setTransform(135.25,73.95,0.4444,0.4446,146.9023,0,0,-7.6,13.3);

	this.instance_285 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_285.setTransform(129.95,35.75,0.4448,0.4445,87.6231,0,0,-45.5,12.1);

	this.instance_286 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_286.setTransform(127.3,4.5,0.4449,0.4446,85.6871,0,0,-32.2,12.9);

	this.instance_287 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_287.setTransform(101.25,35.7,0.4455,0.4458,1.769,0,0,-4.5,-21.9);

	this.instance_288 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_288.setTransform(39.95,-31.6,0.4449,0.4445,-76.5591,0,0,33.5,10.1);

	this.instance_289 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_289.setTransform(23.55,37.15,0.4446,0.4443,-109.041,0,0,14.4,0.3);

	this.instance_290 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_290.setTransform(23.4,37.15,0.4448,0.4445,-89.64,0,0,4.5,-8.9);

	this.instance_291 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_291.setTransform(31.35,-0.5,0.4448,0.4444,-83.4028,0,0,43.8,8.1);

	this.instance_292 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_292.setTransform(63.8,-62.35,0.4448,0.4452,-3.8817,0,0,1.8,50.8);

	this.instance_293 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_293.setTransform(63.3,-42.15,0.4457,0.446,0,0,0,0.4,-39.9);

	this.instance_294 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_294.setTransform(77.35,13.35,0.4432,0.4436,-8.9549,0,0,0.4,4.9);

	this.instance_295 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_295.setTransform(53.05,14.55,0.4437,0.444,3.9174,0,0,1.8,-41.8);

	this.instance_296 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_296.setTransform(47.9,56.7,0.4434,0.4437,20.8881,0,0,1.6,-51.6);

	this.instance_297 = new lib.ch1_neckcopy2("synched",0);
	this.instance_297.setTransform(64.5,-52.75,0.4448,0.4452,-6.7755,0,0,-1.2,6.9);

	this.instance_298 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_298.setTransform(81.75,56.5,0.4433,0.4437,-0.4059,0,0,4.3,-50.9);

	this.instance_299 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_299.setTransform(94.45,34.45,0.4446,0.4445,127.0973,0,0,-10.3,11);

	this.instance_300 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_300.setTransform(96,34.15,0.4444,0.4446,146.9023,0,0,-7.6,13.3);

	this.instance_301 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_301.setTransform(90.7,-4.05,0.4448,0.4445,87.6231,0,0,-45.5,12.1);

	this.instance_302 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_302.setTransform(88.05,-35.3,0.4449,0.4446,85.6871,0,0,-32.2,12.9);

	this.instance_303 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_303.setTransform(62,-4.1,0.4455,0.4458,1.769,0,0,-4.5,-21.9);

	this.instance_304 = new lib.ch1_uArm_rcopy_2("synched",0);
	this.instance_304.setTransform(123.75,-27.15,0.4445,0.4445,-74.6428,0,0,33.9,10.1);

	this.instance_305 = new lib.ch1_hand_rcopy_2("synched",0);
	this.instance_305.setTransform(135.4,35.75,0.4443,0.4443,-131.1065,0,0,14.1,-0.6);

	this.instance_306 = new lib.ch1_thumb_rcopy_2("synched",0);
	this.instance_306.setTransform(135.5,35.75,0.4444,0.4444,-110.4589,0,0,4.2,-9.1);

	this.instance_307 = new lib.ch1_lArm_rcopy_2("synched",0);
	this.instance_307.setTransform(114.05,3.7,0.4444,0.4444,-128.9028,0,0,44.1,7.5);

	this.instance_308 = new lib.ch1_headcopy("synched",0);
	this.instance_308.setTransform(150.65,-55.1,0.4448,0.4448,-11.8519,0,0,2.2,50.1);

	this.instance_309 = new lib.ch1_uBodycopy_2("synched",0);
	this.instance_309.setTransform(146.8,-35.05,0.4456,0.4456,0,0,0,0,-39.9);

	this.instance_310 = new lib.ch1_uLeg_lcopy_2("synched",0);
	this.instance_310.setTransform(160.75,20.45,0.4433,0.4433,-8.9624,0,0,-0.2,4.8);

	this.instance_311 = new lib.ch1_uLeg_rcopy_2("synched",0);
	this.instance_311.setTransform(136.55,21.3,0.4437,0.4437,3.9243,0,0,1.4,-42.2);

	this.instance_312 = new lib.ch1_lLeg_rcopy_2("synched",0);
	this.instance_312.setTransform(131.3,64,0.4435,0.4435,2.5515,0,0,0.7,-50.7);

	this.instance_313 = new lib.ch1_neckcopy_2("synched",0);
	this.instance_313.setTransform(148.2,-45.4,0.4448,0.4448,11.3415,0,0,-1.4,7.3);

	this.instance_314 = new lib.ch1_lLeg_lcopy_2("synched",0);
	this.instance_314.setTransform(165.05,63.85,0.4434,0.4434,-4.247,0,0,3.3,-50.3);

	this.instance_315 = new lib.ch1_hand_lcopy_2("synched",0);
	this.instance_315.setTransform(187.35,41.05,0.4444,0.4444,55.1318,0,0,-10.1,10.8);

	this.instance_316 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_316.setTransform(187,39.4,0.4444,0.4444,65.9214,0,0,-7.7,13.6);

	this.instance_317 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_317.setTransform(174.3,3.35,0.4445,0.4445,76.198,0,0,-45.1,12.7);

	this.instance_318 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_318.setTransform(171.35,-28.4,0.4446,0.4446,85.4844,0,0,-33,13.8);

	this.instance_319 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_319.setTransform(145.9,3,0.4454,0.4454,1.763,0,0,-3.9,-21.6);

	this.instance_320 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_320.setTransform(176.6,-48.85,0.4445,0.4449,0,-65.921,-65.8634,33.9,10.2);

	this.instance_321 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_321.setTransform(176.6,15.9,0.4447,0.4444,0,-146.6416,-146.7145,14.2,0);

	this.instance_322 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_322.setTransform(176.65,15.8,0.4446,0.4447,0,-131.7411,-131.8213,4.5,-8.8);

	this.instance_323 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_323.setTransform(162.45,-19.8,0.4445,0.4449,0,-116.8507,-116.9143,44.1,7.8);

	this.instance_324 = new lib.ch1_headcopy2_4("synched",0);
	this.instance_324.setTransform(202.7,-79.5,0.4453,0.4447,-12.0456,0,0,1.9,51.2);

	this.instance_325 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_325.setTransform(199.75,-59.35,0.4462,0.4456,0,0,0,0,-39.6);

	this.instance_326 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_326.setTransform(213.9,-3.95,0.4438,0.4432,-9.1733,0,0,0.3,4.6);

	this.instance_327 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_327.setTransform(189.5,-3.2,0.4442,0.4436,4.0123,0,0,1.4,-42.6);

	this.instance_328 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_328.setTransform(184.15,39.45,0.444,0.4434,3.4371,0,0,0.7,-51.1);

	this.instance_329 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_329.setTransform(201,-69.8,0.4453,0.4447,5.7341,0,0,-1.5,7.4);

	this.instance_330 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_330.setTransform(218.25,39.3,0.4438,0.4432,-2.2927,0,0,3.6,-50.9);

	this.instance_331 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_331.setTransform(231.6,18.55,0.4444,0.4448,0,65.551,65.493,-10.1,10.1);

	this.instance_332 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_332.setTransform(231.45,16.95,0.4444,0.4449,72.4189,0,0,-7.7,13.5);

	this.instance_333 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_333.setTransform(225.9,-21,0.4444,0.445,87.2997,0,0,-45.5,13.2);

	this.instance_334 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_334.setTransform(224.35,-52.7,0.4445,0.4451,88.1062,0,0,-32.8,13.7);

	this.instance_335 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_335.setTransform(198.75,-21.4,0.4459,0.4453,1.7162,0,0,-4.2,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_335},{t:this.instance_334},{t:this.instance_333},{t:this.instance_332},{t:this.instance_331},{t:this.instance_330},{t:this.instance_329},{t:this.instance_328},{t:this.instance_327},{t:this.instance_326},{t:this.instance_325},{t:this.instance_324},{t:this.instance_323},{t:this.instance_322},{t:this.instance_321},{t:this.instance_320},{t:this.instance_319},{t:this.instance_318},{t:this.instance_317},{t:this.instance_316},{t:this.instance_315},{t:this.instance_314},{t:this.instance_313},{t:this.instance_312},{t:this.instance_311},{t:this.instance_310},{t:this.instance_309},{t:this.instance_308},{t:this.instance_307},{t:this.instance_306},{t:this.instance_305},{t:this.instance_304},{t:this.instance_303},{t:this.instance_302},{t:this.instance_301},{t:this.instance_300},{t:this.instance_299},{t:this.instance_298},{t:this.instance_297},{t:this.instance_296},{t:this.instance_295},{t:this.instance_294},{t:this.instance_293},{t:this.instance_292},{t:this.instance_291},{t:this.instance_290},{t:this.instance_289},{t:this.instance_288},{t:this.instance_287},{t:this.instance_286},{t:this.instance_285},{t:this.instance_284},{t:this.instance_283},{t:this.instance_282},{t:this.instance_281},{t:this.instance_280},{t:this.instance_279},{t:this.instance_278},{t:this.instance_277},{t:this.instance_276},{t:this.instance_275},{t:this.instance_274},{t:this.instance_273},{t:this.instance_272},{t:this.instance_271},{t:this.instance_270},{t:this.instance_269},{t:this.instance_268},{t:this.instance_267},{t:this.instance_266},{t:this.instance_265},{t:this.instance_264},{t:this.instance_263},{t:this.instance_262},{t:this.instance_261},{t:this.instance_260},{t:this.instance_259},{t:this.instance_258},{t:this.instance_257},{t:this.instance_256},{t:this.instance_255},{t:this.instance_254},{t:this.instance_253},{t:this.instance_252},{t:this.instance_251},{t:this.instance_250},{t:this.instance_249},{t:this.instance_248},{t:this.instance_247},{t:this.instance_246},{t:this.instance_245},{t:this.instance_244},{t:this.instance_243},{t:this.instance_242},{t:this.instance_241},{t:this.instance_240},{t:this.instance_239},{t:this.instance_238},{t:this.instance_237},{t:this.instance_236},{t:this.instance_235},{t:this.instance_234},{t:this.instance_233},{t:this.instance_232},{t:this.instance_231},{t:this.instance_230},{t:this.instance_229},{t:this.instance_228},{t:this.instance_227},{t:this.instance_226},{t:this.instance_225},{t:this.instance_224},{t:this.instance_223},{t:this.instance_222},{t:this.instance_221},{t:this.instance_220},{t:this.instance_219},{t:this.instance_218},{t:this.instance_217},{t:this.instance_216},{t:this.instance_215},{t:this.instance_214},{t:this.instance_213},{t:this.instance_212},{t:this.instance_211},{t:this.instance_210},{t:this.instance_209},{t:this.instance_208},{t:this.instance_207},{t:this.instance_206},{t:this.instance_205},{t:this.instance_204},{t:this.instance_203},{t:this.instance_202},{t:this.instance_201},{t:this.instance_200},{t:this.instance_199},{t:this.instance_198},{t:this.instance_197},{t:this.instance_196},{t:this.instance_195},{t:this.instance_194},{t:this.instance_193},{t:this.instance_192},{t:this.instance_191},{t:this.instance_190},{t:this.instance_189},{t:this.instance_188},{t:this.instance_187},{t:this.instance_186},{t:this.instance_185},{t:this.instance_184},{t:this.instance_183},{t:this.instance_182},{t:this.instance_181},{t:this.instance_180},{t:this.instance_179},{t:this.instance_178},{t:this.instance_177},{t:this.instance_176},{t:this.instance_175},{t:this.instance_174},{t:this.instance_173},{t:this.instance_172},{t:this.instance_171},{t:this.instance_170},{t:this.instance_169},{t:this.instance_168},{t:this.instance_167},{t:this.instance_166},{t:this.instance_165},{t:this.instance_164},{t:this.instance_163},{t:this.instance_162},{t:this.instance_161},{t:this.instance_160},{t:this.instance_159},{t:this.instance_158},{t:this.instance_157},{t:this.instance_156},{t:this.instance_155},{t:this.instance_154},{t:this.instance_153},{t:this.instance_152},{t:this.instance_151},{t:this.instance_150},{t:this.instance_149},{t:this.instance_148},{t:this.instance_147},{t:this.instance_146},{t:this.instance_145},{t:this.instance_144},{t:this.instance_143},{t:this.instance_142},{t:this.instance_141},{t:this.instance_140},{t:this.instance_139},{t:this.instance_138},{t:this.instance_137},{t:this.instance_136},{t:this.instance_135},{t:this.instance_134},{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_123},{t:this.instance_122},{t:this.instance_121},{t:this.instance_120},{t:this.instance_119},{t:this.instance_118},{t:this.instance_117},{t:this.instance_116},{t:this.instance_115},{t:this.instance_114},{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101},{t:this.instance_100},{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94},{t:this.instance_93},{t:this.instance_92},{t:this.instance_91},{t:this.instance_90},{t:this.instance_89},{t:this.instance_88},{t:this.instance_87},{t:this.instance_86},{t:this.instance_85},{t:this.instance_84},{t:this.instance_83},{t:this.instance_82},{t:this.instance_81},{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65},{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_336 = new lib.CharacterCivilian_06();
	this.instance_336.setTransform(-181.5,111.8,0.4457,0.4457,0,0,0,-4.7,42.3);

	this.instance_337 = new lib.CharacterCivilian_07();
	this.instance_337.setTransform(-270.75,81.05,0.4457,0.4457,0,0,0,-4.5,42.2);

	this.instance_338 = new lib.CharacterCivilian_04();
	this.instance_338.setTransform(269.2,90.25,0.4457,0.4457,0,0,0,-22.8,46.8);

	this.instance_339 = new lib.CharacterCivilian_09();
	this.instance_339.setTransform(-140.75,86.8,0.4457,0.4457,0,0,0,-4.6,40);

	this.instance_340 = new lib.CharacterCivilian_07();
	this.instance_340.setTransform(235.95,64.5,0.4457,0.4457,0,0,0,-4.6,42.3);

	this.instance_341 = new lib.CharacterCivilian_07();
	this.instance_341.setTransform(292.05,-7.2,0.4457,0.4457,0,0,0,-4.5,42.2);

	this.instance_342 = new lib.CharacterCivilian_08();
	this.instance_342.setTransform(59.9,109.65,0.4457,0.4457,0,0,0,-4.7,40);

	this.instance_343 = new lib.CharacterCivilian_09();
	this.instance_343.setTransform(148,86.8,0.4457,0.4457,0,0,0,-4.7,40);

	this.instance_344 = new lib.CharacterCivilian_07();
	this.instance_344.setTransform(-46.55,87.4,0.4457,0.4457,0,0,0,-4.6,42.3);

	this.instance_345 = new lib.CharacterCivilian_06();
	this.instance_345.setTransform(21,39.55,0.4457,0.4457,0,0,0,-4.7,42.2);

	this.instance_346 = new lib.CharacterCivilian_07();
	this.instance_346.setTransform(103.55,32.6,0.4457,0.4457,0,0,0,-4.5,42.2);

	this.instance_347 = new lib.CharacterCivilian_04();
	this.instance_347.setTransform(139.85,2.05,0.4457,0.4457,0,0,0,-22.8,46.9);

	this.instance_348 = new lib.CharacterCivilian_04();
	this.instance_348.setTransform(-162.5,42.6,0.4457,0.4457,0,0,0,-22.7,46.9);

	this.instance_349 = new lib.CharacterCivilian_07();
	this.instance_349.setTransform(-90.25,38.6,0.4457,0.4457,0,0,0,-4.5,42.2);

	this.instance_350 = new lib.CharacterCivilian_06();
	this.instance_350.setTransform(-113.3,-16.15,0.4457,0.4457,0,0,0,-4.6,42.3);

	this.instance_351 = new lib.CharacterCivilian_09();
	this.instance_351.setTransform(-225.25,39.1,0.4457,0.4457,0,0,0,-4.6,40);

	this.instance_352 = new lib.CharacterCivilian_09();
	this.instance_352.setTransform(-320.5,-1.45,0.4457,0.4457,0,0,0,-4.7,40);

	this.instance_353 = new lib.CharacterCivilian_07();
	this.instance_353.setTransform(64.3,-7.2,0.4457,0.4457,0,0,0,-4.5,42.2);

	this.instance_354 = new lib.CharacterCivilian_08();
	this.instance_354.setTransform(-182.55,-26.65,0.4457,0.4457,0,0,0,-4.6,40);

	this.instance_355 = new lib.CharacterCivilian_09();
	this.instance_355.setTransform(-29.3,-22.25,0.4457,0.4457,0,0,0,-4.6,40);

	this.instance_356 = new lib.CharacterCivilian_06();
	this.instance_356.setTransform(200.85,-24.5,0.4457,0.4457,0,0,0,-4.6,42.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_356},{t:this.instance_355},{t:this.instance_354},{t:this.instance_353},{t:this.instance_352},{t:this.instance_351},{t:this.instance_350},{t:this.instance_349},{t:this.instance_348},{t:this.instance_347},{t:this.instance_346},{t:this.instance_345},{t:this.instance_344},{t:this.instance_343},{t:this.instance_342},{t:this.instance_341},{t:this.instance_340},{t:this.instance_339},{t:this.instance_338},{t:this.instance_337},{t:this.instance_336}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-362.1,-138.8,692.6,364.4);


// stage content:
(lib.LessonChapter1_07 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,191];
	this.streamSoundSymbolsList[0] = [{id:"beforewar2edit_07wav",startFrame:0,endFrame:192,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("beforewar2edit_07wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,192,1);
	}
	this.frame_191 = function() {
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter1_08.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter1_06.html");
			}, 500);
			
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(191).call(this.frame_191).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_687();
	this.instance.setTransform(195.55,597,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_686();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(192));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn}]}).wait(192));

	// interaction
	this.instance_2 = new lib.CharacterBad_04_button();
	this.instance_2.setTransform(844.75,407.65,0.8701,0.8701);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 1);

	this.instance_3 = new lib.CivilianQuraisy_angry_button();
	this.instance_3.setTransform(354.7,371.3,0.8701,0.8701);
	new cjs.ButtonHelper(this.instance_3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},191).wait(1));

	// people
	this.instance_4 = new lib.CharacterBad_04();
	this.instance_4.setTransform(858,424.55,0.3852,0.3852,0,0,180,-40.1,49);

	this.instance_5 = new lib.CharacterCivilian_06();
	this.instance_5.setTransform(196.8,468.6,0.3878,0.3878,0,0,0,-4.7,42.3);

	this.instance_6 = new lib.CharacterCivilian_07();
	this.instance_6.setTransform(119.15,441.85,0.3878,0.3878,0,0,0,-4.4,42.1);

	this.instance_7 = new lib.CharacterCivilian_04();
	this.instance_7.setTransform(588.9,449.95,0.3878,0.3878,0,0,0,-22.7,47);

	this.instance_8 = new lib.CharacterCivilian_09();
	this.instance_8.setTransform(232.25,446.85,0.3878,0.3878,0,0,0,-4.5,40.1);

	this.instance_9 = new lib.CharacterCivilian_07();
	this.instance_9.setTransform(559.95,427.45,0.3878,0.3878,0,0,0,-4.7,42.3);

	this.instance_10 = new lib.CharacterCivilian_07();
	this.instance_10.setTransform(608.8,365.1,0.3878,0.3878,0,0,0,-4.4,42.3);

	this.instance_11 = new lib.CharacterCivilian_08();
	this.instance_11.setTransform(406.8,466.7,0.3878,0.3878,0,0,0,-4.7,40);

	this.instance_12 = new lib.CharacterCivilian_09();
	this.instance_12.setTransform(483.45,446.85,0.3878,0.3878,0,0,0,-4.7,40.1);

	this.instance_13 = new lib.CharacterCivilian_07();
	this.instance_13.setTransform(314.2,447.4,0.3878,0.3878,0,0,0,-4.5,42.4);

	this.instance_14 = new lib.CharacterCivilian_06();
	this.instance_14.setTransform(372.95,405.75,0.3878,0.3878,0,0,0,-4.7,42.1);

	this.instance_15 = new lib.CharacterCivilian_07();
	this.instance_15.setTransform(444.8,399.7,0.3878,0.3878,0,0,0,-4.4,42.1);

	this.instance_16 = new lib.CharacterCivilian_04();
	this.instance_16.setTransform(476.35,373.2,0.3878,0.3878,0,0,0,-22.7,47);

	this.instance_17 = new lib.CharacterCivilian_04();
	this.instance_17.setTransform(213.3,408.45,0.3878,0.3878,0,0,0,-22.6,47);

	this.instance_18 = new lib.CharacterCivilian_07();
	this.instance_18.setTransform(276.15,404.95,0.3878,0.3878,0,0,0,-4.5,42.3);

	this.instance_19 = new lib.CharacterCivilian_06();
	this.instance_19.setTransform(256.1,357.3,0.3878,0.3878,0,0,0,-4.5,42.3);

	this.instance_20 = new lib.CharacterCivilian_09();
	this.instance_20.setTransform(158.7,405.35,0.3878,0.3878,0,0,0,-4.5,40.1);

	this.instance_21 = new lib.CharacterCivilian_09();
	this.instance_21.setTransform(75.85,370.05,0.3878,0.3878,0,0,0,-4.7,40);

	this.instance_22 = new lib.CharacterCivilian_07();
	this.instance_22.setTransform(410.65,365.1,0.3878,0.3878,0,0,0,-4.4,42.3);

	this.instance_23 = new lib.CharacterCivilian_08();
	this.instance_23.setTransform(195.85,348.15,0.3878,0.3878,0,0,0,-4.5,40.1);

	this.instance_24 = new lib.CharacterCivilian_09();
	this.instance_24.setTransform(329.2,351.95,0.3878,0.3878,0,0,0,-4.5,40);

	this.instance_25 = new lib.CharacterCivilian_06();
	this.instance_25.setTransform(529.45,350.05,0.3878,0.3878,0,0,0,-4.5,42.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4}]}).to({state:[]},191).wait(1));

	// Background
	this.instance_26 = new lib.Chap1Scene7();

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(192));

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
		{src:"images/LessonChapter1_07_atlas_1.png?1655324351068", id:"LessonChapter1_07_atlas_1"},
		{src:"sounds/beforewar2edit_07wav.mp3?1655324351789", id:"beforewar2edit_07wav"},
		{src:"sounds/popsound.mp3?1655324351789", id:"popsound"}
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