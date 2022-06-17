(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter1_01_atlas_1", frames: [[0,1082,737,736],[0,0,1920,1080]]},
		{name:"LessonChapter1_01_atlas_2", frames: [[1240,986,163,120],[1405,986,163,120],[1079,587,249,249],[1330,587,249,249],[677,763,134,50],[1916,0,132,102],[1570,986,134,130],[1079,268,330,317],[1743,268,228,432],[0,986,327,292],[1916,213,122,50],[1581,702,175,145],[658,986,202,144],[813,763,115,48],[1063,986,175,145],[862,986,199,144],[1411,268,330,317],[1781,702,228,432],[329,986,327,292],[0,852,1779,132],[0,0,1914,266],[584,763,91,87],[1581,587,91,88],[1916,104,110,107],[0,268,582,582],[584,268,493,493]]}
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



(lib.CachedBmp_1580 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1579 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1578 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1577 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1576 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1575 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1574 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1573 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1572 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1571 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1570 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1569 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1568 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1567 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1566 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1565 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1564 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1563 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1562 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1561 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1560 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.Path_1_0 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Path_2_0 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.Path_3_0 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.Chap1Scene1 = function() {
	this.initialize(ss["LessonChapter1_01_atlas_1"]);
	this.gotoAndStop(1);
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
	this.instance = new lib.CachedBmp_1579();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1580();
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
	this.instance = new lib.CachedBmp_1574();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_1576();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_1575();
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
	this.shape.graphics.f("#5A4D3D").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
	this.shape.setTransform(-3.639,-3.9012);

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
	this.shape.graphics.f("#5A4D3D").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
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
	this.instance = new lib.CachedBmp_1573();
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
	this.shape.graphics.f("#5A4D3D").s().p("AEqDnIqVg8QhOgIg0g5Qg1g5AAhNQAAhPA4g4QA4g5BPgBIKVgKQBjgBBHBFQBHBFAABiQgBBkhJBEQhCA8hVAAIgYgBg");
	this.shape.setTransform(-7.6,10.9264);

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
	this.shape.graphics.f("#5A4D3D").s().p("AnYCsQhJhEgBhkQAAhiBHhFQBHhFBjABIKVAKQBPABA4A5QA3A4AABPQAABNg0A5Qg1A5hNAIIqVA8IgYABQhVAAhCg8g");
	this.shape.setTransform(6.05,15.6264);

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
	this.shape.graphics.f("#5A4D3D").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
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
	this.shape.graphics.f("#5A4D3D").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape.setTransform(-1.3874,-21.3426,0.5879,0.5879);

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
	this.instance = new lib.CachedBmp_1572();
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
	this.shape.graphics.f("#5A4D3D").s().p("AEUDHIrkgfIAAlDILmgrQBZgDA0A+QAuA2AABLQACBQg4BAQg4BBhMAAIgDAAg");
	this.shape.setTransform(13.6784,8.3188);

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
	this.shape.graphics.f("#5A4D3D").s().p("AmaCGQg4hAAChQQAAhLAug2QA0g+BZADILmArIAAFDIrkAfIgDAAQhMAAg4hBg");
	this.shape.setTransform(-13.6284,12.5688);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_1.setTransform(0.0758,4.22,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.1,-7.3,108.5,39.8);


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
	this.instance = new lib.CachedBmp_1571();
	this.instance.setTransform(-78.3,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.3,-67.4,163.5,146);


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
	this.instance = new lib.CachedBmp_1568();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1570();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1569();
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
	this.instance = new lib.CachedBmp_1565();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1567();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1566();
	this.instance_2.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(216.45,-207.05,4.7384,4.7384,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


(lib.Path_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_3_0();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3, new cjs.Rectangle(0,0,493,493), null);


(lib.Path_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_2_0();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,582,582), null);


(lib.Path_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_1_0();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,737,736), null);


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
	this.shape.graphics.f("#5A4D3D").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
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
	this.shape.graphics.f("#5A4D3D").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
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
	this.instance = new lib.CachedBmp_1564();
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
	this.shape.graphics.f("#5A4D3D").s().p("AEqDnIqVg8QhOgIg0g5Qg1g5AAhNQAAhPA4g4QA4g5BPgBIKVgKQBjgBBHBFQBHBFAABiQgBBkhJBEQhCA8hVAAIgYgBg");
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
	this.shape.graphics.f("#5A4D3D").s().p("AnYCsQhJhEgBhkQAAhiBHhFQBHhFBjABIKVAKQBPABA4A5QA3A4AABPQAABNg0A5Qg1A5hNAIIqVA8IgYABQhVAAhCg8g");
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
	this.shape.graphics.f("#5A4D3D").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape.setTransform(-0.4374,-21.3926,0.5879,0.5879);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B241C").s().p("AAaKGQghgCgQgTQgUgWAAgzQAAkcg9lpQhLmGgeiiIFRAAIgNR2QBqAzgMA0QgFAUgZANQgYANghAAg");
	this.shape_1.setTransform(0.8913,22.9945,0.5879,0.5879);

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
	this.shape.graphics.f("#5A4D3D").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape.setTransform(-1.3874,-21.3426,0.5879,0.5879);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B241C").s().p("AAaKGQghgCgQgTQgUgWAAgzQAAkcg9lpQhLmGgeiiIFRAAIgNR2QBqAzgMA0QgFAUgZANQgYANghAAg");
	this.shape_1.setTransform(-0.0587,23.0445,0.5879,0.5879);

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
	this.instance = new lib.CachedBmp_1563();
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
	this.shape.graphics.f("#5A4D3D").s().p("AEUDHIrkgfIAAlDILmgrQBZgDA0A+QAuA2AABLQACBQg4BAQg4BBhMAAIgDAAg");
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
	this.shape.graphics.f("#5A4D3D").s().p("AmaCGQg4hAAChQQAAhLAug2QA0g+BZADILmArIAAFDIrkAfIgDAAQhMAAg4hBg");
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
	this.instance = new lib.CachedBmp_1562();
	this.instance.setTransform(-78.3,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.3,-67.4,163.5,146);


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
	this.instance = new lib.Path();
	this.instance.setTransform(11.6,108.7,0.7148,0.7148);

	this.instance_1 = new lib.Path_3();
	this.instance_1.setTransform(109.4,204.7,0.4441,0.8301,0,0,0,246.3,246.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,219,409.2), null);


(lib.Rasulullah_icon = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// name
	this.instance = new lib.CachedBmp_1577();
	this.instance.setTransform(-62.35,-62.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(59));

	// small_star
	this.instance_1 = new lib.Path_2();
	this.instance_1.setTransform(0.8,-1.05,0.4441,0.4441,0,0,0,287.1,290.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:291,regY:291,scaleX:0.4447,scaleY:0.4447,rotation:2.5439,x:2.55,y:-0.9},0).wait(1).to({scaleX:0.4454,scaleY:0.4454,rotation:5.0879,y:-0.85},0).wait(1).to({scaleX:0.446,scaleY:0.446,rotation:7.6318,y:-0.75},0).wait(1).to({scaleX:0.4467,scaleY:0.4467,rotation:10.1758,y:-0.7},0).wait(1).to({scaleX:0.4473,scaleY:0.4473,rotation:12.7197,x:2.5,y:-0.65},0).wait(1).to({scaleX:0.4479,scaleY:0.4479,rotation:15.2637,y:-0.55},0).wait(1).to({scaleX:0.4486,scaleY:0.4486,rotation:17.8076,y:-0.45},0).wait(1).to({scaleX:0.4492,scaleY:0.4492,rotation:20.3516,x:2.45,y:-0.4},0).wait(1).to({scaleX:0.4499,scaleY:0.4499,rotation:22.8955,x:2.4,y:-0.3},0).wait(1).to({scaleX:0.4505,scaleY:0.4505,rotation:25.4395,y:-0.25},0).wait(1).to({scaleX:0.4512,scaleY:0.4512,rotation:27.9834,y:-0.15},0).wait(1).to({scaleX:0.4518,scaleY:0.4518,rotation:30.5274,x:2.3,y:-0.1},0).wait(1).to({scaleX:0.4524,scaleY:0.4524,rotation:33.0713,y:0},0).wait(1).to({scaleX:0.4531,scaleY:0.4531,rotation:35.6153,x:2.25,y:0.05},0).wait(1).to({scaleX:0.4537,scaleY:0.4537,rotation:38.1592,x:2.15,y:0.1},0).wait(1).to({scaleX:0.4544,scaleY:0.4544,rotation:40.7032,y:0.2},0).wait(1).to({scaleX:0.455,scaleY:0.455,rotation:43.2471,x:2.1},0).wait(1).to({scaleX:0.4557,scaleY:0.4557,rotation:45.7911,x:2,y:0.25},0).wait(1).to({scaleX:0.4563,scaleY:0.4563,rotation:48.335,x:1.9,y:0.3},0).wait(1).to({scaleX:0.457,scaleY:0.457,rotation:50.879,y:0.35},0).wait(1).to({scaleX:0.4576,scaleY:0.4576,rotation:53.4229,x:1.8,y:0.45},0).wait(1).to({scaleX:0.4582,scaleY:0.4582,rotation:55.9669,y:0.5},0).wait(1).to({scaleX:0.4589,scaleY:0.4589,rotation:58.5108,x:1.7},0).wait(1).to({scaleX:0.4595,scaleY:0.4595,rotation:61.0548,x:1.6},0).wait(1).to({scaleX:0.4602,scaleY:0.4602,rotation:63.5987,x:1.55,y:0.6},0).wait(1).to({scaleX:0.4608,scaleY:0.4608,rotation:66.1427,x:1.5,y:0.65},0).wait(1).to({scaleX:0.4615,scaleY:0.4615,rotation:68.6866,x:1.4},0).wait(1).to({scaleX:0.4621,scaleY:0.4621,rotation:71.2306,x:1.35},0).wait(1).to({scaleX:0.4628,scaleY:0.4628,rotation:73.7745,x:1.2,y:0.7},0).wait(1).to({scaleX:0.4634,scaleY:0.4634,rotation:76.3184},0).wait(1).to({scaleX:0.461,scaleY:0.461,rotation:78.8624,x:1.05,y:0.75},0).wait(1).to({scaleX:0.4587,scaleY:0.4587,rotation:81.4063},0).wait(1).to({scaleX:0.4563,scaleY:0.4563,rotation:83.9503,x:0.95},0).wait(1).to({scaleX:0.454,scaleY:0.454,rotation:86.4942,x:0.9},0).wait(1).to({scaleX:0.4516,scaleY:0.4516,rotation:89.0382,x:0.75},0).wait(1).to({scaleX:0.4493,scaleY:0.4493,rotation:91.5821,x:0.7},0).wait(1).to({scaleX:0.4469,scaleY:0.4469,rotation:94.1261,x:0.65,y:0.7},0).wait(1).to({scaleX:0.4445,scaleY:0.4445,rotation:96.67,x:0.55,y:0.75},0).wait(1).to({scaleX:0.4422,scaleY:0.4422,rotation:99.214,x:0.5,y:0.65},0).wait(1).to({scaleX:0.4398,scaleY:0.4398,rotation:101.7579,x:0.4},0).wait(1).to({scaleX:0.4375,scaleY:0.4375,rotation:104.3019,x:0.35,y:0.6},0).wait(1).to({scaleX:0.4351,scaleY:0.4351,rotation:106.8458,x:0.25},0).wait(1).to({scaleX:0.4328,scaleY:0.4328,rotation:109.3898,x:0.2},0).wait(1).to({scaleX:0.4304,scaleY:0.4304,rotation:111.9337,x:0.1,y:0.55},0).wait(1).to({scaleX:0.428,scaleY:0.428,rotation:114.4777,y:0.5},0).wait(1).to({scaleX:0.4257,scaleY:0.4257,rotation:117.0216,x:-0.05,y:0.45},0).wait(1).to({scaleX:0.4233,scaleY:0.4233,rotation:119.5656,x:-0.1,y:0.4},0).wait(1).to({scaleX:0.421,scaleY:0.421,rotation:122.1095,y:0.35},0).wait(1).to({scaleX:0.4186,scaleY:0.4186,rotation:124.6535,x:-0.15,y:0.3},0).wait(1).to({scaleX:0.4162,scaleY:0.4162,rotation:127.1974,x:-0.25,y:0.25},0).wait(1).to({scaleX:0.4139,scaleY:0.4139,rotation:129.7414,y:0.2},0).wait(1).to({scaleX:0.4115,scaleY:0.4115,rotation:132.2853,x:-0.3},0).wait(1).to({scaleX:0.4092,scaleY:0.4092,rotation:134.8293,x:-0.4,y:0.1},0).wait(1).to({scaleX:0.4068,scaleY:0.4068,rotation:137.3732,y:-0.05},0).wait(1).to({scaleX:0.4045,scaleY:0.4045,rotation:139.9172,x:-0.45},0).wait(1).to({scaleX:0.4021,scaleY:0.4021,rotation:142.4611,x:-0.5,y:-0.15},0).wait(1).to({scaleX:0.3997,scaleY:0.3997,rotation:145.0051,y:-0.2},0).wait(1).to({scaleX:0.3974,scaleY:0.3974,rotation:147.549,x:-0.55,y:-0.25},0).wait(1));

	// bigStar
	this.instance_2 = new lib.Path_1();
	this.instance_2.setTransform(0.8,-1.05,0.3313,0.3313,0,0,0,364.3,366.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:368.5,regY:368,scaleX:0.3333,scaleY:0.3333,rotation:-3.0648,x:2.2,y:-0.7},0).wait(1).to({scaleX:0.3354,scaleY:0.3354,rotation:-6.1296,y:-0.8},0).wait(1).to({scaleX:0.3374,scaleY:0.3374,rotation:-9.1943,x:2.25,y:-0.9},0).wait(1).to({scaleX:0.3394,scaleY:0.3394,rotation:-12.2591,y:-0.95},0).wait(1).to({scaleX:0.3414,scaleY:0.3414,rotation:-15.3239,x:2.3,y:-1},0).wait(1).to({scaleX:0.3435,scaleY:0.3435,rotation:-18.3887,y:-1.1},0).wait(1).to({scaleX:0.3455,scaleY:0.3455,rotation:-21.4534,y:-1.2},0).wait(1).to({scaleX:0.3475,scaleY:0.3475,rotation:-24.5182,x:2.25,y:-1.3},0).wait(1).to({scaleX:0.3495,scaleY:0.3495,rotation:-27.583,y:-1.4},0).wait(1).to({scaleX:0.3516,scaleY:0.3516,rotation:-30.6478,x:2.3,y:-1.45},0).wait(1).to({scaleX:0.3536,scaleY:0.3536,rotation:-33.7125,x:2.25,y:-1.5},0).wait(1).to({scaleX:0.3556,scaleY:0.3556,rotation:-36.7773,y:-1.6},0).wait(1).to({scaleX:0.3576,scaleY:0.3576,rotation:-39.8421,x:2.2,y:-1.7},0).wait(1).to({scaleX:0.3597,scaleY:0.3597,rotation:-42.9069,x:2.15},0).wait(1).to({scaleX:0.3617,scaleY:0.3617,rotation:-45.9716,x:2.2,y:-1.85},0).wait(1).to({scaleX:0.3637,scaleY:0.3637,rotation:-49.0364,x:2.1,y:-1.95},0).wait(1).to({scaleX:0.3657,scaleY:0.3657,rotation:-52.1012,y:-2.05},0).wait(1).to({scaleX:0.3678,scaleY:0.3678,rotation:-55.166,x:2.05,y:-2.15},0).wait(1).to({scaleX:0.3698,scaleY:0.3698,rotation:-58.2307,x:2,y:-2.2},0).wait(1).to({scaleX:0.3718,scaleY:0.3718,rotation:-61.2955,x:1.9,y:-2.25},0).wait(1).to({scaleX:0.3738,scaleY:0.3738,rotation:-64.3603,x:1.85,y:-2.35},0).wait(1).to({scaleX:0.3759,scaleY:0.3759,rotation:-67.4251,x:1.75,y:-2.4},0).wait(1).to({scaleX:0.3779,scaleY:0.3779,rotation:-70.4898,x:1.7},0).wait(1).to({scaleX:0.3799,scaleY:0.3799,rotation:-73.5546,y:-2.45},0).wait(1).to({scaleX:0.3819,scaleY:0.3819,rotation:-76.6194,x:1.6,y:-2.55},0).wait(1).to({scaleX:0.384,scaleY:0.384,rotation:-79.6842,x:1.55,y:-2.6},0).wait(1).to({scaleX:0.386,scaleY:0.386,rotation:-82.7489,x:1.45,y:-2.65},0).wait(1).to({scaleX:0.388,scaleY:0.388,rotation:-85.8137,x:1.35,y:-2.7},0).wait(1).to({scaleX:0.39,scaleY:0.39,rotation:-88.8785,x:1.25},0).wait(1).to({scaleX:0.392,scaleY:0.392,rotation:-91.9433,x:1.2,y:-2.75},0).wait(1).to({scaleX:0.3898,scaleY:0.3898,rotation:-95.0081,x:1.1},0).wait(1).to({scaleX:0.3875,scaleY:0.3875,rotation:-98.0728,x:1,y:-2.7},0).wait(1).to({scaleX:0.3853,scaleY:0.3853,rotation:-101.1376,x:0.95,y:-2.75},0).wait(1).to({scaleX:0.3831,scaleY:0.3831,rotation:-104.2024,x:0.8},0).wait(1).to({scaleX:0.3808,scaleY:0.3808,rotation:-107.2672,x:0.75},0).wait(1).to({scaleX:0.3786,scaleY:0.3786,rotation:-110.3319,x:0.65,y:-2.7},0).wait(1).to({scaleX:0.3763,scaleY:0.3763,rotation:-113.3967,x:0.6},0).wait(1).to({scaleX:0.3741,scaleY:0.3741,rotation:-116.4615,x:0.55},0).wait(1).to({scaleX:0.3718,scaleY:0.3718,rotation:-119.5263,x:0.4,y:-2.65},0).wait(1).to({scaleX:0.3696,scaleY:0.3696,rotation:-122.591,x:0.35,y:-2.6},0).wait(1).to({scaleX:0.3673,scaleY:0.3673,rotation:-125.6558,x:0.25},0).wait(1).to({scaleX:0.3651,scaleY:0.3651,rotation:-128.7206,x:0.15,y:-2.55},0).wait(1).to({scaleX:0.3628,scaleY:0.3628,rotation:-131.7854,x:0.1,y:-2.45},0).wait(1).to({scaleX:0.3606,scaleY:0.3606,rotation:-134.8501,x:0,y:-2.4},0).wait(1).to({scaleX:0.3583,scaleY:0.3583,rotation:-137.9149,x:-0.1,y:-2.35},0).wait(1).to({scaleX:0.3561,scaleY:0.3561,rotation:-140.9797,x:-0.15,y:-2.3},0).wait(1).to({scaleX:0.3538,scaleY:0.3538,rotation:-144.0445,x:-0.2,y:-2.25},0).wait(1).to({scaleX:0.3516,scaleY:0.3516,rotation:-147.1092,x:-0.3,y:-2.2},0).wait(1).to({scaleX:0.3493,scaleY:0.3493,rotation:-150.174,y:-2.1},0).wait(1).to({scaleX:0.3471,scaleY:0.3471,rotation:-153.2388,x:-0.4},0).wait(1).to({scaleX:0.3448,scaleY:0.3448,rotation:-156.3036,y:-2},0).wait(1).to({scaleX:0.3426,scaleY:0.3426,rotation:-159.3683,x:-0.5,y:-1.95},0).wait(1).to({scaleX:0.3403,scaleY:0.3403,rotation:-162.4331,x:-0.45,y:-1.85},0).wait(1).to({scaleX:0.3381,scaleY:0.3381,rotation:-165.4979,x:-0.5,y:-1.8},0).wait(1).to({scaleX:0.3358,scaleY:0.3358,rotation:-168.5627,x:-0.55,y:-1.75},0).wait(1).to({scaleX:0.3336,scaleY:0.3336,rotation:-171.6274,x:-0.6,y:-1.65},0).wait(1).to({scaleX:0.3313,scaleY:0.3313,rotation:-174.6922,x:-0.55,y:-1.55},0).wait(1).to({scaleX:0.3291,scaleY:0.3291,rotation:-177.757,y:-1.5},0).wait(1));

	// circles
	this.instance_3 = new lib.Symbol2();
	this.instance_3.setTransform(0.9,-1.1,1,1,0,0,0,109.5,204.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({scaleX:1.0017,scaleY:1.0017,x:0.95,y:-1.05},0).wait(1).to({scaleX:1.0034,scaleY:1.0034,x:0.9},0).wait(1).to({scaleX:1.0051,scaleY:1.0051},0).wait(1).to({scaleX:1.0067,scaleY:1.0067,x:0.95},0).wait(1).to({scaleX:1.0084,scaleY:1.0084,x:0.9,y:-1.1},0).wait(1).to({scaleX:1.0101,scaleY:1.0101},0).wait(1).to({scaleX:1.0118,scaleY:1.0118,x:0.95},0).wait(1).to({scaleX:1.0135,scaleY:1.0135,x:0.9},0).wait(1).to({scaleX:1.0152,scaleY:1.0152},0).wait(1).to({scaleX:1.0168,scaleY:1.0168,x:0.95,y:-1.05},0).wait(1).to({scaleX:1.0185,scaleY:1.0185},0).wait(1).to({scaleX:1.0202,scaleY:1.0202,x:0.9},0).wait(1).to({scaleX:1.0219,scaleY:1.0219,x:0.95},0).wait(1).to({scaleX:1.0236,scaleY:1.0236,y:-1.1},0).wait(1).to({scaleX:1.0253,scaleY:1.0253,x:0.9},0).wait(1).to({scaleX:1.0269,scaleY:1.0269,x:0.95},0).wait(1).to({scaleX:1.0286,scaleY:1.0286},0).wait(1).to({scaleX:1.0303,scaleY:1.0303,x:0.9},0).wait(1).to({scaleX:1.032,scaleY:1.032,y:-1.05},0).wait(1).to({scaleX:1.0337,scaleY:1.0337,x:0.95},0).wait(1).to({scaleX:1.0354,scaleY:1.0354,x:0.9},0).wait(1).to({scaleX:1.037,scaleY:1.037},0).wait(1).to({scaleX:1.0387,scaleY:1.0387,x:0.95,y:-1.1},0).wait(1).to({scaleX:1.0404,scaleY:1.0404,x:0.9},0).wait(1).to({scaleX:1.0421,scaleY:1.0421},0).wait(1).to({scaleX:1.0438,scaleY:1.0438,x:0.95},0).wait(1).to({scaleX:1.0455,scaleY:1.0455},0).wait(1).to({scaleX:1.0471,scaleY:1.0471,x:0.9,y:-1.05},0).wait(1).to({scaleX:1.0488,scaleY:1.0488,x:0.95},0).wait(1).to({scaleX:1.0505,scaleY:1.0505},0).wait(1).to({scaleX:1.0487,scaleY:1.0487,y:-1.1},0).wait(1).to({scaleX:1.0469,scaleY:1.0469,y:-1.05},0).wait(1).to({scaleX:1.0451,scaleY:1.0451},0).wait(1).to({scaleX:1.0433,scaleY:1.0433,y:-1.1},0).wait(1).to({scaleX:1.0415,scaleY:1.0415,y:-1.05},0).wait(1).to({scaleX:1.0397,scaleY:1.0397,y:-1.1},0).wait(1).to({scaleX:1.0379,scaleY:1.0379},0).wait(1).to({scaleX:1.0361,scaleY:1.0361,y:-1.05},0).wait(1).to({scaleX:1.0343,scaleY:1.0343,x:0.9,y:-1.1},0).wait(1).to({scaleX:1.0325,scaleY:1.0325,y:-1.05},0).wait(1).to({scaleX:1.0307,scaleY:1.0307,y:-1.1},0).wait(1).to({scaleX:1.0289,scaleY:1.0289},0).wait(1).to({scaleX:1.0271,scaleY:1.0271,y:-1.05},0).wait(1).to({scaleX:1.0253,scaleY:1.0253,y:-1.1},0).wait(1).to({scaleX:1.0235,scaleY:1.0235,y:-1.05},0).wait(1).to({scaleX:1.0216,scaleY:1.0216},0).wait(1).to({scaleX:1.0198,scaleY:1.0198,y:-1.1},0).wait(1).to({scaleX:1.018,scaleY:1.018,y:-1.05},0).wait(1).to({scaleX:1.0162,scaleY:1.0162,x:0.95,y:-1.1},0).wait(1).to({scaleX:1.0144,scaleY:1.0144},0).wait(1).to({scaleX:1.0126,scaleY:1.0126,y:-1.05},0).wait(1).to({scaleX:1.0108,scaleY:1.0108,y:-1.1},0).wait(1).to({scaleX:1.009,scaleY:1.009,y:-1.05},0).wait(1).to({scaleX:1.0072,scaleY:1.0072,y:-1.1},0).wait(1).to({scaleX:1.0054,scaleY:1.0054},0).wait(1).to({scaleX:1.0036,scaleY:1.0036,y:-1.05},0).wait(1).to({scaleX:1.0018,scaleY:1.0018,y:-1.1},0).wait(1).to({scaleX:1,scaleY:1,x:0.9},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-188.9,-216,380,429.9);


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
	this.instance_1 = new lib.ch1_headcopy("synched",0);
	this.instance_1.setTransform(-0.15,51.35,0.999,0.999,2.3215,0,0,0.9,52.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.2,-71.5,169.10000000000002,152.4);


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
	this.instance_1 = new lib.ch1_headcopy2("synched",0);
	this.instance_1.setTransform(-0.15,51.35,0.999,0.999,2.3215,0,0,0.9,52.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.2,-71.5,169.10000000000002,152.4);


(lib.Rasulullah_icon_button = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_1578();
	this.instance.setTransform(-62.6,-62.7,0.5,0.5);

	this.instance_1 = new lib.Path_2();
	this.instance_1.setTransform(0.55,-1.3,0.4441,0.4441,0,0,0,287.8,290.9);

	this.instance_2 = new lib.Path_1();
	this.instance_2.setTransform(0.55,-1.3,0.3313,0.3313,0,0,0,365.2,366.9);

	this.instance_3 = new lib.Symbol2();
	this.instance_3.setTransform(0.65,-1.35,1,1,0,0,0,109.5,204.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#564024").s().p("AktEtIAApaIJaAAIAAJag");

	this.instance_4 = new lib.Rasulullah_icon();
	this.instance_4.setTransform(1.95,-1.35,1,1,0,0,0,2.2,-1.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape},{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-127.2,-205.9,258.7,409.20000000000005);


(lib.CharacterCivilian_06_interact = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-59.8,-12.5,0.9973,0.9973,-91.1494,0,0,33.8,9.4);

	this.instance_1 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1.setTransform(-29.65,141.1,0.9967,0.9967,-129.5363,0,0,13.9,-1.1);

	this.instance_2 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2.setTransform(-28.55,141.3,0.997,0.997,-131.4522,0,0,3.8,-9.4);

	this.instance_3 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_3.setTransform(-60.3,60.3,0.997,0.997,-116.2584,0,0,44.1,7.2);

	this.instance_4 = new lib.ch1_headcopy_1("synched",0);
	this.instance_4.setTransform(-0.95,-81.9,0.9977,0.9977,-4.7356,0,0,2.2,50.6);

	this.instance_5 = new lib.ch1_uBodycopy("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_6.setTransform(25.45,88.35,0.9943,0.9943,-8.9577,0,0,1.4,4.8);

	this.instance_7 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_7.setTransform(-29.9,90.4,0.9951,0.9951,3.9196,0,0,1.4,-42.2);

	this.instance_8 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_8.setTransform(-41.4,185.45,0.9947,0.9947,6.1116,0,0,1.3,-51.3);

	this.instance_9 = new lib.ch1_neckcopy("synched",0);
	this.instance_9.setTransform(-5.05,-60.25,0.998,0.998,4.3888,0,0,-2.6,6.7);

	this.instance_10 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_10.setTransform(33.25,186.05,0.9944,0.9944,-7.2494,0,0,2.9,-50.2);

	this.instance_11 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_11.setTransform(75.9,133.35,0.9969,0.9969,83.1376,0,0,-9.8,10.6);

	this.instance_12 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_12.setTransform(77.95,130.85,0.9969,0.9969,113.8605,0,0,-7.2,13.8);

	this.instance_13 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_13.setTransform(47.85,50.05,0.9971,0.9971,75.0959,0,0,-44.8,12.8);

	this.instance_14 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_14.setTransform(48.1,-21.05,0.9973,0.9973,91.0397,0,0,-32.4,13.2);

	this.instance_15 = new lib.ch1_lBodycopy("synched",0);
	this.instance_15.setTransform(-10.75,49.2,0.9994,0.9994,1.7752,0,0,-5.5,-21.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7752,y:49.2,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.4,rotation:91.0397,x:48.1,y:-21.05,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:75.0959,x:47.85,y:50.05,regX:-44.8}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9969,scaleY:0.9969,rotation:113.8605,x:77.95,y:130.85,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:83.1376,x:75.9,y:133.35,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2494,x:33.25,y:186.05}},{t:this.instance_9,p:{regY:6.7,scaleX:0.998,scaleY:0.998,rotation:4.3888,y:-60.25,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.3,scaleX:0.9947,scaleY:0.9947,rotation:6.1116,y:185.45,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9196,x:-29.9,y:90.4}},{t:this.instance_6,p:{scaleX:0.9943,scaleY:0.9943,rotation:-8.9577,x:25.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-4.7356,y:-81.9,x:-0.95,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.997,scaleY:0.997,rotation:-116.2584,x:-60.3,y:60.3}},{t:this.instance_2,p:{scaleX:0.997,scaleY:0.997,rotation:-131.4522,x:-28.55,y:141.3,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.9,rotation:-129.5363,x:-29.65,y:141.1,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-91.1494,x:-59.8,regY:9.4,y:-12.5,regX:33.8}}]}).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7744,y:49.15,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.0468,x:48.05,y:-20.95,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:72.3853,x:47.9,y:49.9,regX:-44.8}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:108.022,x:81.7,y:129.25,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:78.286,x:79.9,y:132,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2491,x:33.2,y:186}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.3672,y:-60.3,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9191,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-5.0684,y:-81.8,x:-0.95,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-118.105,x:-61.4,y:60.25}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-134.0524,x:-27.1,y:140.25,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-132.1376,x:-28.1,y:140.1,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-90.2753,x:-59.65,regY:9.4,y:-12.5,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7744,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.0556,x:48.05,y:-20.95,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:69.6744,x:47.9,y:49.9,regX:-44.7}},{t:this.instance_12,p:{regX:-7,scaleX:0.9968,scaleY:0.9968,rotation:102.1838,x:85.35,y:127.7,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:73.4326,x:83.85,y:130.45,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2491,x:33.2,y:186}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.347,y:-60.3,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9191,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-5.401,y:-81.8,x:-0.9,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-119.9541,x:-62.55,y:60.2}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-136.6541,x:-25.6,y:139,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-134.7395,x:-26.7,y:139,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-89.4047,x:-59.65,regY:9.4,y:-12.5,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7744,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.0644,x:48.05,y:-21,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:66.9631,x:47.85,y:49.9,regX:-44.7}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:96.3463,x:89.05,y:125.6,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:68.5791,x:87.8,y:128.65,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2482,x:33.2,y:186}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.3267,y:-60.3,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9191,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.35,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-5.7356,y:-81.75,x:-0.95,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-121.802,x:-63.55,y:60.15}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-139.2562,x:-24.15,y:137.75,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-137.3409,x:-25.15,y:137.8,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-88.5313,x:-59.8,regY:9.3,y:-12.55,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7735,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.0731,x:48.05,y:-21,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:64.2507,x:47.85,y:49.9,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:90.5078,x:92.55,y:123.65,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:63.7264,x:91.7,y:126.8,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2481,x:33.2,y:186}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.3066,y:-60.3,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9191,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.0704,y:-81.8,x:-0.8,regX:2.3,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-123.6492,x:-64.7,y:60.1}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-141.8576,x:-22.85,y:136.35,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-139.9416,x:-23.85,y:136.45,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-87.6576,x:-59.6,regY:9.4,y:-12.6,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7735,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.081,x:48,y:-21,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:61.5405,x:47.85,y:49.85,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:84.6745,x:95.95,y:121.5,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:58.8733,x:95.35,y:124.6,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2481,x:33.2,y:186}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.2854,y:-60.3,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9191,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.4037,y:-81.8,x:-0.85,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-125.499,x:-65.85,y:60.05}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-144.4591,x:-21.5,y:134.85,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-142.5438,x:-22.45,y:135,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-86.7842,x:-59.6,regY:9.4,y:-12.4,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7735,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.0898,x:48,y:-20.95,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:58.8289,x:47.9,y:49.85,regX:-44.7}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:78.8354,x:99.3,y:119,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:54.02,x:99,y:122.3,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2481,x:33.2,y:186}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.2653,y:-60.3,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9191,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-6.737,y:-81.75,x:-0.95,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-127.3454,x:-66.85,y:59.95}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-147.0606,x:-20.2,y:133.3,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.9,rotation:-145.1447,x:-21.25,y:133.4,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-85.9101,x:-59.6,regY:9.4,y:-12.55,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7735,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.0986,x:48,y:-20.95,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:56.1163,x:47.85,y:49.85,regX:-44.7}},{t:this.instance_12,p:{regX:-7,scaleX:0.9968,scaleY:0.9968,rotation:72.998,x:102.55,y:116.7,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:49.1671,x:102.55,y:119.75,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2481,x:33.2,y:186}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.2442,y:-60.25,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9191,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.0698,y:-81.75,x:-0.9,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-129.1944,x:-68.05,y:59.85}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-149.6631,x:-18.9,y:131.65,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-147.7464,x:-19.95,y:131.9,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-85.0367,x:-59.6,regY:9.4,y:-12.6,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7727,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.1073,x:48,y:-20.95,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:53.4046,x:47.85,y:49.8,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:67.1591,x:105.55,y:113.9,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:44.3134,x:105.9,y:117,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2473,x:33.15,y:186}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.224,y:-60.25,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9191,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-7.4046,y:-81.8,x:-0.8,regX:2.3,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-131.0417,x:-69.1,y:59.7}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-152.2629,x:-17.7,y:129.95,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-150.3477,x:-18.7,y:130.1,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-84.1621,x:-59.65,regY:9.3,y:-12.55,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7727,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.1161,x:48.05,y:-21,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:50.6939,x:47.85,y:49.75,regX:-44.7}},{t:this.instance_12,p:{regX:-7,scaleX:0.9968,scaleY:0.9968,rotation:61.3207,x:108.6,y:111.2,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:39.4605,x:109.2,y:114.15,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2473,x:33.15,y:186}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.2029,y:-60.25,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-7.737,y:-81.8,x:-0.95,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-132.8911,x:-70.2,y:59.5}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-154.8643,x:-16.6,y:128.05,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-152.9497,x:-17.5,y:128.3,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-83.29,x:-59.6,regY:9.4,y:-12.5,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7727,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.1249,x:48,y:-21,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:47.9819,x:47.75,y:49.8,regX:-44.7}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:55.4831,x:111.3,y:108.05,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:34.6062,x:112.4,y:111.05,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:-7.2473,x:33.15,y:186}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.1827,y:-60.3,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.0706,y:-81.75,x:-0.95,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-134.7383,x:-71.25,y:59.35}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-157.4657,x:-15.5,y:126.1,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-155.551,x:-16.4,y:126.45,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-82.4152,x:-59.65,regY:9.4,y:-12.5,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7727,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.1336,x:48,y:-21,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:45.2716,x:47.9,y:49.9,regX:-44.6}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:49.646,x:113.95,y:105.05,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:29.7529,x:115.3,y:108,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2473,x:33.15,y:186}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.1616,y:-60.3,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.4054,y:-81.8,x:-0.9,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-136.5871,x:-72.35,y:59.2}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-160.0675,x:-14.45,y:124.1,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-158.1517,x:-15.25,y:124.45,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-81.5405,x:-59.65,regY:9.4,y:-12.55,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7718,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.1424,x:48,y:-20.95,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:42.5594,x:47.7,y:49.75,regX:-44.8}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:43.8061,x:116.6,y:101.85,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:24.8997,x:118.15,y:104.7,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2473,x:33.15,y:186}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:4.1423,y:-60.4,regX:-2.7,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.7395,y:-81.8,x:-0.9,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-138.4351,x:-73.45,y:59}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-162.6689,x:-13.45,y:121.95,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-160.7531,x:-14.3,y:122.4,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-80.6673,x:-59.6,regY:9.4,y:-12.6,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7718,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.1512,x:48,y:-20.95,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:39.8473,x:47.8,y:49.75,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:37.9686,x:118.85,y:98.6,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:20.0472,x:120.85,y:101.15,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2473,x:33.15,y:186}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:4.1203,y:-60.4,regX:-2.6,x:-4.95}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-9.0722,y:-81.75,x:-0.95,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-140.2835,x:-74.45,y:58.75}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-165.2695,x:-12.55,y:119.8,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-163.3556,x:-13.45,y:120.2,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-79.7933,x:-59.55,regY:9.4,y:-12.55,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7718,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.1599,x:47.95,y:-21.05,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:37.1361,x:47.75,y:49.7,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:32.1291,x:121.1,y:95.2,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:15.194,x:123.25,y:97.5,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2464,x:33.15,y:186}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:4.1001,y:-60.4,regX:-2.6,x:-4.95}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-9.4067,y:-81.75,x:-0.9,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-142.1312,x:-75.6,y:58.5}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-167.8722,x:-11.65,y:117.45,regY:-9.3,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-165.9563,x:-12.55,y:117.95,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.9193,x:-59.55,regY:9.4,y:-12.6,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7718,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.2,rotation:89.2127,x:47.9,y:-20.95,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:36.4062,x:50.25,y:49.65,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:30.1671,x:124.1,y:94.15,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:15.916,x:126.2,y:96.4,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2464,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:4.1458,y:-60.4,regX:-2.7,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.8663,y:-81.75,x:-0.85,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-140.0574,x:-75.7,y:58.45}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-165.7906,x:-13.9,y:119.9,regY:-9.5,regX:3.7}},{t:this.instance_1,p:{regX:13.9,rotation:-165.1038,x:-14.85,y:120.15,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.8326,x:-59.55,regY:9.4,y:-12.55,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7718,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.2,rotation:87.2593,x:47.9,y:-20.9,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:35.676,x:52.6,y:49.55,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:28.2025,x:127.1,y:93,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:16.6379,x:129.35,y:95.25,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2464,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.1915,y:-60.3,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.3274,y:-81.85,x:-0.9,regX:2.2,regY:50.5}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-137.9835,x:-75.8,y:58.35}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-163.7104,x:-16.35,y:121.95,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-164.2509,x:-17.1,y:122.3,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.7451,x:-59.6,regY:9.4,y:-12.5,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7718,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.2,rotation:85.3061,x:47.9,y:-21,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:34.9451,x:54.95,y:49.25,regX:-44.8}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:26.2391,x:130.05,y:91.9,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:17.3596,x:132.4,y:94.1,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2464,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.2372,y:-60.25,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.7883,y:-81.8,x:-0.9,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-135.9098,x:-75.9,y:58.4}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-161.6305,x:-18.75,y:124,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-163.3975,x:-19.55,y:124.4,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.6565,x:-59.6,regY:9.4,y:-12.6,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7718,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.4,rotation:83.3538,x:47.9,y:-21.25,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:34.2152,x:57.4,y:49.05,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:24.2761,x:132.9,y:90.75,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:18.0824,x:135.35,y:92.7,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2464,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.2829,y:-60.25,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.2482,y:-81.75,x:-0.8,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-133.8353,x:-76.05,y:58.4}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-159.5504,x:-21.15,y:126.1,regY:-9.4,regX:3.7}},{t:this.instance_1,p:{regX:13.8,rotation:-162.5451,x:-22.15,y:126.3,regY:-1.1,scaleX:0.9966,scaleY:0.9966}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.5688,x:-59.5,regY:9.4,y:-12.6,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7718,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:81.3997,x:48,y:-21.15,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:33.485,x:59.75,y:48.75,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:22.3132,x:135.9,y:89.35,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:18.8024,x:138.35,y:91.35,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2464,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.3277,y:-60.25,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-6.7087,y:-81.75,x:-0.65,regX:2.3,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-131.7625,x:-76.2,y:58.3}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-157.4693,x:-23.85,y:127.95,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-161.6918,x:-24.7,y:128.3,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.482,x:-59.5,regY:9.4,y:-12.65,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:79.4474,x:47.9,y:-21.1,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:32.7559,x:62.15,y:48.3,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:20.3504,x:138.7,y:87.9,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:19.5261,x:141.35,y:89.7,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:-7.2464,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.3742,y:-60.25,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.1691,y:-81.8,x:-0.8,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-129.6885,x:-76.25,y:58.3}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-155.3885,x:-26.5,y:129.65,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-160.8388,x:-27.35,y:130,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.3943,x:-59.55,regY:9.4,y:-12.45,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:77.4932,x:47.95,y:-21.1,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:32.0258,x:64.55,y:47.7,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:18.3867,x:141.55,y:86.35,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:20.247,x:144.3,y:88.2,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2464,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.4191,y:-60.2,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-5.6299,y:-81.75,x:-0.75,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-127.6145,x:-76.4,y:58.25}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-153.3071,x:-29.2,y:131.4,regY:-9.3,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-159.9859,x:-30.05,y:131.75,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.3075,x:-59.5,regY:9.4,y:-12.65,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:75.5408,x:47.95,y:-21.1,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:31.2948,x:66.8,y:47.1,regX:-44.8}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:16.4234,x:144.35,y:84.8,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:20.9694,x:147.15,y:86.5,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2464,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.4648,y:-60.2,regX:-2.6,x:-4.95}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-5.0903,y:-81.8,x:-0.75,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-125.5406,x:-76.4,y:58.3}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-151.2271,x:-32,y:133.05,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-159.1333,x:-32.9,y:133.3,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.2198,x:-59.5,regY:9.4,y:-12.65,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.4,rotation:73.5871,x:47.85,y:-21.25,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:30.5655,x:69.2,y:46.45,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:14.4598,x:147.2,y:83.1,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:21.691,x:149.95,y:84.7,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:-7.2464,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.5104,y:-60.2,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-4.5512,y:-81.9,x:-0.65,regX:2.2,regY:50.5}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-123.4665,x:-76.6,y:58.3}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-149.1477,x:-34.85,y:134.6,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-158.28,x:-35.7,y:134.75,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.1328,x:-59.65,regY:9.3,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:71.6349,x:47.9,y:-21.1,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:29.835,x:71.45,y:45.65,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:12.4964,x:149.95,y:81.35,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:22.4127,x:152.7,y:82.9,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2464,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.5561,y:-60.25,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-4.0116,y:-81.8,x:-0.5,regX:2.3,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-121.3929,x:-76.6,y:58.2}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-147.0654,x:-37.8,y:136,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-157.4274,x:-38.55,y:136.15,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.0451,x:-59.7,regY:9.3,y:-12.6,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:69.6809,x:47.9,y:-21.15,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:29.1055,x:73.7,y:44.75,regX:-44.7}},{t:this.instance_12,p:{regX:-7,scaleX:0.9968,scaleY:0.9968,rotation:10.5333,x:152.75,y:79.45,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:23.1367,x:155.4,y:80.9,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2464,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.6018,y:-60.25,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-3.4724,y:-81.8,x:-0.6,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-119.3189,x:-76.8,y:58.2}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-144.9849,x:-40.7,y:137.4,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-156.5748,x:-41.5,y:137.55,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.9572,x:-59.6,regY:9.3,y:-12.6,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:67.7291,x:47.85,y:-21.05,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:28.3759,x:75.9,y:43.85,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:8.5702,x:155.35,y:77.55,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:23.8576,x:158.2,y:78.9,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2464,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.6475,y:-60.25,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-2.9326,y:-81.8,x:-0.45,regX:2.3,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-117.2451,x:-76.9,y:58.1}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-142.9044,x:-43.65,y:138.5,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-155.7214,x:-44.55,y:138.75,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.8704,x:-59.6,regY:9.3,y:-12.65,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.2,rotation:65.7759,x:47.95,y:-21,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:27.6459,x:78.1,y:42.85,regX:-44.7}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:6.6066,x:157.8,y:75.5,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:24.5803,x:160.85,y:76.75,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.6932,y:-60.25,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-2.3931,y:-81.75,x:-0.55,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-115.1714,x:-76.95,y:58.05}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-140.8244,x:-46.7,y:139.65,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-154.8677,x:-47.55,y:139.8,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.7825,x:-59.6,regY:9.3,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:63.8227,x:47.9,y:-21.15,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:26.9149,x:80.2,y:41.85,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:4.6431,x:160.5,y:73.4,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:25.3011,x:163.4,y:74.6,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.739,y:-60.25,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-1.8546,y:-81.75,x:-0.55,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-113.0986,x:-77.1,y:58}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-138.7433,x:-49.8,y:140.7,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-154.0152,x:-50.65,y:140.7,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.6962,x:-59.6,regY:9.3,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:61.8692,x:47.9,y:-21.15,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:26.1839,x:82.4,y:40.65,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:2.6795,x:163.05,y:71.25,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:26.0237,x:166,y:72.35,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.7847,y:-60.25,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.35,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-1.3146,y:-81.75,x:-0.6,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-111.0233,x:-77.15,y:58}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-136.6622,x:-52.9,y:141.55,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-153.1627,x:-53.75,y:141.6,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.6075,x:-59.65,regY:9.3,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:63.3855,x:47.9,y:-21.15,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:29.3069,x:80.85,y:41.6,regX:-44.6}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:7.0342,x:159.6,y:76.5,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:27.6936,x:162.5,y:77.8,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.7117,y:-60.25,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-1.8494,y:-81.75,x:-0.4,regX:2.3,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-110.5636,x:-77.55,y:57.9}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-136.2062,x:-54,y:141.7,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-152.6535,x:-54.75,y:141.75,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.3479,x:-59.5,regY:9.4,y:-12.65,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.2,rotation:64.9023,x:48,y:-21,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:32.4287,x:79.1,y:42.4,regX:-44.7}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:11.3897,x:155.75,y:81.6,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:29.3621,x:158.65,y:83.1,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.6378,y:-60.25,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-2.3826,y:-81.8,x:-0.55,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-110.1013,x:-77.85,y:57.8}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-135.7485,x:-54.9,y:141.8,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-152.143,x:-55.7,y:141.8,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.0881,x:-59.45,regY:9.4,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:66.4204,x:47.85,y:-21.15,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:35.5509,x:77.45,y:43.3,regX:-44.6}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:15.7455,x:151.9,y:86.65,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:31.0325,x:154.7,y:88.25,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.5641,y:-60.25,regX:-2.6,x:-4.95}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-2.9168,y:-81.8,x:-0.65,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-109.6408,x:-78.15,y:57.8}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-135.2908,x:-55.9,y:141.95,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-151.6344,x:-56.65,y:141.9,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-76.8288,x:-59.5,regY:9.4,y:-12.5,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:67.9363,x:47.85,y:-21.15,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:38.6724,x:75.7,y:43.95,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:20.1002,x:147.7,y:91.25,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:32.7024,x:150.35,y:93.15,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.491,y:-60.2,regX:-2.6,x:-4.95}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-3.4504,y:-81.8,x:-0.6,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-109.1799,x:-78.5,y:57.65}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-134.8332,x:-56.85,y:142,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.9,rotation:-151.1249,x:-57.85,y:142,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-76.5683,x:-59.6,regY:9.3,y:-12.75,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7709,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:69.4534,x:47.85,y:-21.15,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:41.7951,x:73.95,y:44.65,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:24.4539,x:143.3,y:95.8,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:34.371,x:145.8,y:97.95,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.4173,y:-60.2,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-3.9862,y:-81.8,x:-0.6,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-108.7195,x:-78.75,y:57.55}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-134.3755,x:-57.85,y:142.1,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-150.6148,x:-58.8,y:142.25,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-76.3072,x:-59.55,regY:9.3,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.77,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:70.9709,x:47.9,y:-21.15,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:44.9163,x:72.25,y:45.4,regX:-44.6}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:28.8088,x:138.7,y:100.2,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:36.0407,x:140.95,y:102.45,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.3443,y:-60.25,regX:-2.6,x:-5.1}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-4.5204,y:-81.9,x:-0.7,regX:2.2,regY:50.5}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-108.2575,x:-79.15,y:57.5}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-133.9178,x:-58.9,y:142.15,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-150.1041,x:-59.65,y:142.25,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-76.0486,x:-59.5,regY:9.4,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.77,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:72.4883,x:47.9,y:-21.1,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:48.0385,x:70.4,y:45.9,regX:-44.7}},{t:this.instance_12,p:{regX:-7,scaleX:0.9968,scaleY:0.9968,rotation:33.1634,x:134,y:104.4,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:37.7104,x:135.95,y:106.8,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.2714,y:-60.25,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-5.0534,y:-81.8,x:-0.7,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-107.7963,x:-79.4,y:57.4}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-133.4613,x:-59.85,y:142.25,regY:-9.4,regX:3.7}},{t:this.instance_1,p:{regX:13.8,rotation:-149.5947,x:-60.65,y:142.3,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-75.7875,x:-59.5,regY:9.4,y:-12.65,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.77,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.2,rotation:74.0041,x:47.9,y:-21.05,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:51.1609,x:68.6,y:46.5,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:37.5184,x:128.8,y:108.3,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:39.3813,x:130.7,y:110.85,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.1976,y:-60.25,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-5.5876,y:-81.8,x:-0.8,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-107.3356,x:-79.75,y:57.35}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-133.0028,x:-60.9,y:142.3,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-149.0838,x:-61.6,y:142.4,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-75.5276,x:-59.5,regY:9.4,y:-12.75,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.77,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:75.5211,x:47.9,y:-21.15,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:54.2819,x:66.85,y:47,regX:-44.7}},{t:this.instance_12,p:{regX:-7,scaleX:0.9968,scaleY:0.9968,rotation:41.8746,x:123.6,y:112.1,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:41.0505,x:125.3,y:114.7,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:4.1238,y:-60.4,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.1215,y:-81.8,x:-0.65,regX:2.3,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-106.8748,x:-80.05,y:57.25}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-132.5454,x:-61.95,y:142.35,regY:-9.5,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-148.5741,x:-62.65,y:142.4,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-75.2684,x:-59.5,regY:9.4,y:-12.65,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.77,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:77.038,x:47.85,y:-21.2,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:57.4039,x:65.05,y:47.5,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:46.2299,x:118.1,y:115.5,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:42.7208,x:119.6,y:118.25,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.5,scaleX:0.998,scaleY:0.998,rotation:4.0508,y:-60.4,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-6.6566,y:-81.75,x:-0.8,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-106.4142,x:-80.4,y:57.1}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-132.0879,x:-62.75,y:142.45,regY:-9.4,regX:3.7}},{t:this.instance_1,p:{regX:13.8,rotation:-148.0653,x:-63.6,y:142.45,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-75.0083,x:-59.5,regY:9.4,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.77,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:78.5558,x:47.8,y:-21.15,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:60.5255,x:63.2,y:47.95,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:50.5843,x:112.5,y:118.75,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:44.3891,x:113.75,y:121.6,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.9771,y:-60.4,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.1899,y:-81.75,x:-0.8,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-105.9524,x:-80.7,y:57.1}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-131.6308,x:-63.85,y:142.4,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-147.5552,x:-64.65,y:142.55,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-74.7478,x:-59.55,regY:9.4,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.77,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.4,rotation:80.0727,x:47.85,y:-21.3,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:63.6475,x:61.3,y:48.2,regX:-44.8}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:54.9405,x:106.85,y:121.65,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:46.0593,x:107.8,y:124.65,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2455,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.9034,y:-60.4,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-7.7237,y:-81.8,x:-0.85,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-105.4913,x:-81,y:56.95}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-131.1746,x:-64.85,y:142.4,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-147.0454,x:-65.65,y:142.5,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-74.4877,x:-59.5,regY:9.4,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.77,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.2,rotation:81.5884,x:47.9,y:-21.05,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:66.7706,x:59.45,y:48.65,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:59.2951,x:100.85,y:124.35,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:47.7286,x:101.75,y:127.4,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2448,x:33.2,y:185.95}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.8305,y:-60.35,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.2592,y:-81.8,x:-0.85,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-105.0304,x:-81.3,y:56.85}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-130.7164,x:-65.85,y:142.45,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-146.5355,x:-66.6,y:142.5,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-74.2279,x:-59.55,regY:9.4,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.77,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:83.1065,x:47.9,y:-21.15,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:69.8922,x:57.65,y:48.9,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:63.6499,x:94.8,y:126.75,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:49.3978,x:95.5,y:129.95,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2448,x:33.2,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.7567,y:-60.3,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9566,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.7925,y:-81.8,x:-0.9,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-104.5695,x:-81.65,y:56.7}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-130.2592,x:-66.85,y:142.5,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-146.0263,x:-67.6,y:142.55,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.9675,x:-59.45,regY:9.4,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.77,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.2,rotation:84.6223,x:47.9,y:-21.05,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.9971,scaleY:0.9971,rotation:73.0138,x:55.85,y:49.25,regX:-44.6}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:68.0048,x:88.75,y:129,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:51.0669,x:89.05,y:132.1,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2448,x:33.2,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.683,y:-60.25,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1112,y:185.5,x:-41.3,regX:1.3}},{t:this.instance_7,p:{rotation:3.9182,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9574,x:25.2,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-9.3278,y:-81.8,x:-0.9,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-104.1081,x:-82,y:56.6}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-129.803,x:-67.85,y:142.5,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-145.5173,x:-68.65,y:142.55,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.7073,x:-59.45,regY:9.4,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7665,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:85.0554,x:47.85,y:-21.15,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:73.15,x:55.3,y:49.2,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:71.0727,x:88,y:129.1,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:53.2022,x:88.15,y:132.3,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.258,x:33.15,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.7444,y:-60.3,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1227,y:185.5,x:-41.25,regX:1.3}},{t:this.instance_7,p:{rotation:3.9235,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9698,x:25.3,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-9.0109,y:-81.8,x:-0.9,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-104.9224,x:-80.55,y:57}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-129.9331,x:-65.3,y:142.7,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-144.4862,x:-66.05,y:142.85,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-74.8675,x:-59.5,regY:9.4,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7631,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.2,rotation:85.4873,x:47.85,y:-21.05,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:73.2865,x:54.8,y:49.25,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:74.1406,x:87.15,y:129.25,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:55.3369,x:87.25,y:132.4,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2714,x:33.2,y:186}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.8033,y:-60.4,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1359,y:185.5,x:-41.4,regX:1.2}},{t:this.instance_7,p:{rotation:3.9306,x:-29.7,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9834,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.6943,y:-81.8,x:-0.9,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-105.7351,x:-79.15,y:57.45}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-130.0652,x:-62.55,y:143.05,regY:-9.4,regX:3.7}},{t:this.instance_1,p:{regX:13.8,rotation:-143.4562,x:-63.5,y:143.05,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-76.028,x:-59.4,regY:9.5,y:-12.6,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7595,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:85.9181,x:47.8,y:-21.2,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:73.4236,x:54.2,y:49.4,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:77.2089,x:86.55,y:129.45,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:57.4699,x:86.35,y:132.5,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2846,x:33.2,y:186}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.8639,y:-60.35,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1483,y:185.5,x:-41.4,regX:1.2}},{t:this.instance_7,p:{rotation:3.9367,x:-29.7,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9984,x:25.3,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.3778,y:-81.75,x:-0.95,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-106.548,x:-77.7,y:57.85}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-130.1982,x:-60,y:143.05,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-142.4255,x:-60.8,y:143.05,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.187,x:-59.5,regY:9.4,y:-12.5,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.756,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:86.3513,x:47.85,y:-21.1,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:73.5598,x:53.65,y:49.4,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:80.2767,x:85.8,y:129.45,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:59.6045,x:85.55,y:132.6,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:-7.2979,x:33.25,y:186}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.9227,y:-60.4,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1615,y:185.45,x:-41.5,regX:1.2}},{t:this.instance_7,p:{rotation:3.942,x:-29.7,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.0127,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-8.0607,y:-81.75,x:-0.9,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-107.3611,x:-76.3,y:58.2}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-130.329,x:-57.4,y:143.15,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-141.3951,x:-58.25,y:143.2,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.3469,x:-59.4,regY:9.5,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7525,y:49.15,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:86.7826,x:47.85,y:-21.1,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:73.6954,x:53.15,y:49.6,regX:-44.6}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:83.3439,x:85.15,y:129.65,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:61.7386,x:84.6,y:132.8,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.312,x:33.35,y:185.95}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.9824,y:-60.4,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.173,y:185.45,x:-41.4,regX:1.3}},{t:this.instance_7,p:{rotation:3.9481,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.026,x:25.25,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-7.7459,y:-81.8,x:-0.9,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-108.1754,x:-74.9,y:58.6}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-130.4615,x:-54.85,y:143.25,regY:-9.5,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-140.3657,x:-55.65,y:143.3,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-79.5066,x:-59.55,regY:9.4,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7491,y:49.1,x:-10.65,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_14,p:{regX:-32.2,rotation:87.2145,x:47.9,y:-21,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:73.8325,x:52.6,y:49.55,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:86.4122,x:84.25,y:129.85,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:63.8731,x:83.7,y:132.95,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.3253,x:33.4,y:185.95}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:4.043,y:-60.4,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1862,y:185.45,x:-41.5,regX:1.2}},{t:this.instance_7,p:{rotation:3.9543,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.0403,x:25.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-7.4293,y:-81.85,x:-0.8,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-108.9885,x:-73.4,y:58.85}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-130.5933,x:-52.1,y:143.2,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-139.3342,x:-53,y:143.3,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-80.6662,x:-59.55,regY:9.4,y:-12.7,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7455,y:49.1,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:87.6472,x:47.9,y:-21.15,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:73.9693,x:52.05,y:49.5,regX:-44.8}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:89.4799,x:83.7,y:129.9,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:66.0066,x:82.85,y:133.1,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.3387,x:33.4,y:185.95}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:4.1028,y:-60.4,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1995,y:185.55,x:-41.55,regX:1.2}},{t:this.instance_7,p:{rotation:3.9605,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.0535,x:25.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.1131,y:-81.8,x:-0.8,regX:2.3,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-109.802,x:-72.05,y:59.15}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-130.7246,x:-49.5,y:143.2,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.9,rotation:-138.3041,x:-50.55,y:143.15,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-81.8264,x:-59.45,regY:9.5,y:-12.6,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.742,y:49.15,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:88.0788,x:47.95,y:-21.05,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:74.1051,x:51.55,y:49.7,regX:-44.7}},{t:this.instance_12,p:{regX:-7,scaleX:0.9968,scaleY:0.9968,rotation:92.5435,x:83,y:130.2,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:68.1413,x:82,y:133.15,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.3518,x:33.45,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.1625,y:-60.3,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.2127,y:185.55,x:-41.6,regX:1.2}},{t:this.instance_7,p:{rotation:3.9667,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.0671,x:25.35,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-6.7961,y:-81.75,x:-0.85,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-110.6158,x:-70.6,y:59.35}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-130.8577,x:-46.9,y:143.15,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-137.2733,x:-47.8,y:143.1,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-82.9862,x:-59.55,regY:9.4,y:-12.6,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7385,y:49.15,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:88.5112,x:47.9,y:-21.05,scaleX:0.9973,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:74.2411,x:50.95,y:49.6,regX:-44.8}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:95.6109,x:82.25,y:130.2,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:70.2758,x:81.05,y:133.1,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.366,x:33.45,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.2231,y:-60.3,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.2243,y:185.5,x:-41.5,regX:1.3}},{t:this.instance_7,p:{rotation:3.9728,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.0811,x:25.3,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.4795,y:-81.8,x:-0.8,regX:2.3,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-111.4286,x:-69.05,y:59.6}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-130.9895,x:-44.15,y:143.05,regY:-9.4,regX:3.7}},{t:this.instance_1,p:{regX:13.8,rotation:-136.2431,x:-45.2,y:143,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-84.1446,x:-59.55,regY:9.4,y:-12.65,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7341,y:49.15,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:88.9435,x:47.95,y:-21,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:74.3785,x:50.5,y:49.9,regX:-44.6}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:98.6785,x:81.5,y:130.25,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:72.4096,x:80.25,y:133.2,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:-7.3793,x:33.45,y:185.95}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.2829,y:-60.3,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.2367,y:185.5,x:-41.5,regX:1.3}},{t:this.instance_7,p:{rotation:3.9781,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.0964,x:25.35,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.1639,y:-81.8,x:-0.85,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-112.2429,x:-67.65,y:59.75}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-131.1205,x:-41.65,y:142.8,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-135.2128,x:-42.55,y:142.8,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-85.3042,x:-59.55,regY:9.4,y:-12.6,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7306,y:49.15,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:89.374,x:48,y:-21.05,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:74.5148,x:49.9,y:49.8,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:101.747,x:80.8,y:130.4,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:74.5443,x:79.3,y:133.3,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.3926,x:33.5,y:185.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.3417,y:-60.3,regX:-2.6,x:-5.1}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.249,y:185.5,x:-41.6,regX:1.2}},{t:this.instance_7,p:{rotation:3.9843,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.1096,x:25.35,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-5.8475,y:-81.95,x:-0.8,regX:2.3,regY:50.5}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-113.0555,x:-66.15,y:59.9}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-131.253,x:-38.95,y:142.7,regY:-9.4,regX:3.7}},{t:this.instance_1,p:{regX:13.8,rotation:-134.1825,x:-39.95,y:142.55,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-86.4646,x:-59.55,regY:9.4,y:-12.6,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7271,y:49.15,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:89.8071,x:48,y:-21.05,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:74.6504,x:49.4,y:49.85,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:104.8153,x:80.05,y:130.5,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:76.6779,x:78.4,y:133.3,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.4051,x:33.5,y:185.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.4015,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.2614,y:185.55,x:-41.65,regX:1.2}},{t:this.instance_7,p:{rotation:3.9905,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.1232,x:25.35,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-5.5304,y:-81.8,x:-0.85,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-113.8693,x:-64.75,y:60.05}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-131.3847,x:-36.4,y:142.35,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-133.1525,x:-37.4,y:142.25,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-87.6242,x:-59.6,regY:9.4,y:-12.6,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7245,y:49.15,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:90.235,x:48.05,y:-21.05,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:74.7876,x:48.85,y:49.95,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:107.8822,x:79.25,y:130.55,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:78.8122,x:77.55,y:133.25,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.4192,x:33.55,y:185.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.4612,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.2755,y:185.5,x:-41.65,regX:1.2}},{t:this.instance_7,p:{rotation:3.9957,x:-29.75,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.1372,x:25.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-5.2153,y:-81.85,x:-0.75,regX:2.3,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-114.683,x:-63.3,y:60.15}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-131.5152,x:-33.75,y:142,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-132.122,x:-34.75,y:141.95,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-88.783,x:-59.75,regY:9.3,y:-12.55,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7202,y:49.2,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:90.6672,x:48,y:-20.95,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:74.9231,x:48.35,y:49.8,regX:-44.8}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:110.9502,x:78.65,y:130.75,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:80.947,x:76.65,y:133.25,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.4325,x:33.65,y:185.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.521,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.288,y:185.5,x:-41.5,regX:1.3}},{t:this.instance_7,p:{rotation:4.0019,x:-29.8,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.1525,x:25.35,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-4.8986,y:-81.8,x:-0.85,regX:2.2,regY:50.6}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-115.4955,x:-61.8,y:60.2}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-131.6475,x:-31.15,y:141.65,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-131.0923,x:-32.25,y:141.55,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-89.9439,x:-59.6,regY:9.4,y:-12.55,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.2,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{regX:-32.3,rotation:91.0977,x:48.05,y:-20.9,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_13,p:{scaleX:0.997,scaleY:0.997,rotation:75.0592,x:47.8,y:50,regX:-44.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:114.0178,x:77.95,y:130.85,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:83.0807,x:75.8,y:133.3,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.4458,x:33.7,y:185.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.5816,y:-60.35,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regY:-51.2,scaleX:0.9946,scaleY:0.9946,rotation:6.3013,y:185.5,x:-41.65,regX:1.2}},{t:this.instance_7,p:{rotation:4.0081,x:-29.85,y:90.35}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.1658,x:25.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-4.5829,y:-81.95,x:-0.7,regX:2.3,regY:50.5}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-116.3089,x:-60.4,y:60.25}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-131.7799,x:-28.6,y:141.3,regY:-9.4,regX:3.8}},{t:this.instance_1,p:{regX:13.8,rotation:-130.061,x:-29.65,y:141.15,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-91.0995,x:-59.8,regY:9.3,y:-12.6,regX:33.8}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-101.5,-209.5,302.2,506.8);


(lib.CharacterCivilian_06_btn = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(59.05,-13.9,0.9973,0.9973,0,91.1494,-88.8506,33.8,9.3);

	this.instance_1 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1.setTransform(28.75,139.8,0.9967,0.9967,0,129.5363,-50.4637,13.8,-1.1);

	this.instance_2 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2.setTransform(27.75,140.05,0.997,0.997,0,131.4522,-48.5478,3.7,-9.5);

	this.instance_3 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_3.setTransform(59.35,58.9,0.997,0.997,0,116.2584,-63.7416,44.1,7.3);

	this.instance_4 = new lib.ch1_headcopy_1("synched",0);
	this.instance_4.setTransform(0.1,-83.4,0.9977,0.9977,0,4.7356,-175.2644,2.2,50.5);

	this.instance_5 = new lib.ch1_uBodycopy("synched",0);
	this.instance_5.setTransform(6.5,-37.4,1,1,0,0,180,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_6.setTransform(-26.3,86.95,0.9943,0.9943,0,8.9577,-171.0423,1.4,4.8);

	this.instance_7 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_7.setTransform(29.05,89,0.9951,0.9951,0,-3.9196,176.0804,1.4,-42.2);

	this.instance_8 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_8.setTransform(40.6,184.15,0.9947,0.9947,0,-6.1116,173.8884,1.3,-51.2);

	this.instance_9 = new lib.ch1_neckcopy("synched",0);
	this.instance_9.setTransform(4.2,-61.85,0.998,0.998,0,-4.3888,175.6112,-2.6,6.5);

	this.instance_10 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_10.setTransform(-34.1,184.75,0.9944,0.9944,0,7.2494,-172.7506,2.9,-50.1);

	this.instance_11 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_11.setTransform(-76.85,131.95,0.9969,0.9969,0,-83.1376,96.8624,-9.8,10.5);

	this.instance_12 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_12.setTransform(-78.7,129.5,0.9969,0.9969,0,-113.8605,66.1395,-7.1,13.9);

	this.instance_13 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_13.setTransform(-48.75,48.85,0.9971,0.9971,0,-75.0959,104.9041,-44.6,12.8);

	this.instance_14 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_14.setTransform(-48.95,-22.45,0.9973,0.9973,0,-91.0397,88.9603,-32.4,13.2);

	this.instance_15 = new lib.ch1_lBodycopy("synched",0);
	this.instance_15.setTransform(10,47.8,0.9994,0.9994,0,-1.7752,178.2248,-5.6,-21.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_16 = new lib.CharacterCivilian_06_interact();
	this.instance_16.setTransform(-3.85,42.7,1,1,0,0,180,3,44.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#2D2318").ss(1,1,1).p("Ak8k8IJ5AAIAAJ5Ip5AAg");
	this.shape.setTransform(0.025,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1810").s().p("Ak8E9IAAp5IJ5AAIAAJ5g");
	this.shape_1.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_16}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-101.4,-205.2,193.8,501.59999999999997);


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
	this.instance = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance.setTransform(-59.8,-12.5,0.9973,0.9973,-91.1494,0,0,33.8,9.4);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-29.65,141.1,0.9967,0.9967,-129.5363,0,0,13.9,-1.1);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-28.55,141.3,0.997,0.997,-131.4522,0,0,3.8,-9.4);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-60.3,60.3,0.997,0.997,-116.2584,0,0,44.1,7.2);

	this.instance_4 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_4.setTransform(-0.95,-81.9,0.9977,0.9977,-4.7356,0,0,2.2,50.6);

	this.instance_5 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_6.setTransform(25.45,88.35,0.9943,0.9943,-8.9577,0,0,1.4,4.8);

	this.instance_7 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_7.setTransform(-29.9,90.4,0.9951,0.9951,3.9196,0,0,1.4,-42.2);

	this.instance_8 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_8.setTransform(-41.4,185.45,0.9947,0.9947,6.1116,0,0,1.3,-51.3);

	this.instance_9 = new lib.ch1_neckcopy2("synched",0);
	this.instance_9.setTransform(-5.05,-60.25,0.998,0.998,4.3888,0,0,-2.6,6.7);

	this.instance_10 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_10.setTransform(33.25,186.05,0.9944,0.9944,-7.2494,0,0,2.9,-50.2);

	this.instance_11 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_11.setTransform(75.9,133.35,0.9969,0.9969,83.1376,0,0,-9.8,10.6);

	this.instance_12 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_12.setTransform(77.95,130.85,0.9969,0.9969,113.8605,0,0,-7.2,13.8);

	this.instance_13 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_13.setTransform(47.85,50.05,0.9971,0.9971,75.0959,0,0,-44.8,12.8);

	this.instance_14 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_14.setTransform(48.1,-21.05,0.9973,0.9973,91.0397,0,0,-32.4,13.2);

	this.instance_15 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_15.setTransform(-10.75,49.2,0.9994,0.9994,1.7752,0,0,-5.5,-21.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7752,y:49.2,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9973,scaleY:0.9973,rotation:91.0397,y:-21.05,regX:-32.4,x:48.1}},{t:this.instance_13,p:{regX:-44.8,scaleX:0.9971,scaleY:0.9971,rotation:75.0959,x:47.85,y:50.05}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9969,scaleY:0.9969,rotation:113.8605,x:77.95,y:130.85,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:83.1376,x:75.9,y:133.35,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.2494,x:33.25,y:186.05,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.7,scaleX:0.998,scaleY:0.998,rotation:4.3888,y:-60.25,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9947,scaleY:0.9947,rotation:6.1116,x:-41.4,y:185.45,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.9196,x:-29.9,y:90.4,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9943,scaleY:0.9943,rotation:-8.9577,x:25.45,y:88.35,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-4.7356,y:-81.9,x:-0.95,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.997,scaleY:0.997,rotation:-116.2584,x:-60.3,y:60.3}},{t:this.instance_2,p:{scaleX:0.997,scaleY:0.997,rotation:-131.4522,x:-28.55,y:141.3,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.9,rotation:-129.5363,x:-29.65,y:141.1,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-91.1494,x:-59.8,y:-12.5,regY:9.4,regX:33.8}}]}).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7744,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:92.5977,y:-21.1,regX:-32.4,x:48.1}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:78.0799,x:45.9,y:50.05}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:116.8424,x:71.7,y:132.35,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:86.1204,x:69.5,y:134.7,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.0523,x:33.45,y:185.9,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.3066,y:-60.3,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:7.5693,x:-40.7,y:185.5,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.995,scaleY:0.995,rotation:3.5898,x:-29.55,y:90.5,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.0885,x:25.4,y:88.25,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-4.3912,y:-81.8,x:-0.95,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-120.9513,x:-59.1,y:60.3}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-134.4822,x:-20.9,y:138.45,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-133.5391,x:-21.9,y:138.4,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-92.0783,x:-59.65,y:-12.5,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7744,y:49.1,x:-10.75,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:94.1574,y:-21,regX:-32.3,x:48.05}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:81.0636,x:44.05,y:49.95}},{t:this.instance_12,p:{regX:-7,scaleX:0.9968,scaleY:0.9968,rotation:119.8271,x:65.3,y:133.5,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:89.1054,x:63.15,y:135.7,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-6.8548,x:33.85,y:185.75,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.2231,y:-60.3,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:9.0272,x:-39.9,y:185.8,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.995,scaleY:0.995,rotation:3.2588,x:-29.3,y:90.8,regY:-42.1}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.2184,x:25.45,y:88.2,regX:1.3,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-4.0477,y:-81.85,x:-0.95,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-125.645,x:-57.85,y:60.2}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-137.5123,x:-13.45,y:135,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-137.5427,x:-14.45,y:135,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-93.0094,x:-59.65,y:-12.45,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7744,y:49.1,x:-10.7,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:95.7177,y:-20.9,regX:-32.3,x:48.05}},{t:this.instance_13,p:{regX:-44.8,scaleX:0.9971,scaleY:0.9971,rotation:84.0468,x:42.05,y:49.7}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:122.8106,x:59.2,y:134.2,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:92.0844,x:56.7,y:136.4,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-6.6574,x:34.15,y:185.55,regY:-50.3,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:4.1414,y:-60.4,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:10.4883,x:-39.25,y:185.95,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:2.9297,x:-29.15,y:90.7,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.352,x:25.55,y:88.15,regX:1.3,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-3.7051,y:-81.9,x:-0.95,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-130.3396,x:-56.7,y:60.25}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-140.5426,x:-6.3,y:131.15,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-141.5457,x:-7.4,y:131.05,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-93.9405,x:-59.65,y:-12.45,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7744,y:49.1,x:-10.7,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:97.2769,y:-20.9,regX:-32.3,x:48.05}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:87.0304,x:40.15,y:49.6}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:125.794,x:52.8,y:134.9,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:95.0682,x:50.25,y:136.75,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:-6.46,x:34.45,y:185.6,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:4.058,y:-60.4,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:11.9462,x:-38.35,y:186.1,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:2.5998,x:-28.85,y:90.8,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9943,scaleY:0.9943,rotation:-9.482,x:25.7,y:88,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-3.3609,y:-81.85,x:-0.95,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-135.0341,x:-55.55,y:60.15}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-143.5737,x:0.6,y:126.75,regX:3.7,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-145.5482,x:-0.5,y:126.7,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-94.8707,x:-59.65,y:-12.55,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7744,y:49.1,x:-10.7,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:98.8362,y:-20.95,regX:-32.3,x:48.05}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:90.0096,x:38.25,y:49.45}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:128.7772,x:46.45,y:135.2,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:98.0517,x:43.85,y:137.1,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:-6.2636,x:34.75,y:185.45,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.9745,y:-60.4,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:13.4041,x:-37.65,y:186.3,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:2.2701,x:-28.6,y:90.95,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.6131,x:25.8,y:87.95,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-3.0178,y:-81.85,x:-1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-139.7288,x:-54.3,y:60.15}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-146.6023,x:7,y:121.65,regX:3.8,regY:-9.3}},{t:this.instance_1,p:{regX:13.8,rotation:-149.551,x:5.95,y:121.95,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-95.8016,x:-59.6,y:-12.55,regY:9.5,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7744,y:49.05,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:100.396,y:-21.1,regX:-32.4,x:48.05}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:92.9941,x:36.35,y:49.1}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:131.7603,x:39.9,y:135.15,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:101.0352,x:37.4,y:136.9,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:-6.0664,x:35.15,y:185.3,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.892,y:-60.4,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:14.8628,x:-36.8,y:186.45,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:1.9404,x:-28.4,y:91,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.7452,x:25.8,y:87.75,regX:1.4,regY:4.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-2.6729,y:-81.85,x:-1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-144.4236,x:-53.15,y:60}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-149.6349,x:12.95,y:116.45,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-153.5546,x:11.9,y:116.6,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-96.733,x:-59.7,y:-12.45,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7744,y:49.05,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:101.9564,y:-20.95,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:95.9771,x:34.4,y:48.75}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:134.7445,x:33.65,y:134.9,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:104.0184,x:30.85,y:136.45,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:-5.8684,x:35.4,y:185.25,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.8094,y:-60.4,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:16.3219,x:-36,y:186.6,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:1.6107,x:-28.1,y:91.3,regY:-42.1}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.8756,x:25.75,y:87.7,regX:1.3,regY:4.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-2.3291,y:-81.8,x:-1.1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-149.1179,x:-51.95,y:59.9}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-152.6643,x:18.55,y:110.65,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-157.5568,x:17.6,y:110.95,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-97.6635,x:-59.7,y:-12.5,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7735,y:49.05,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:103.5159,y:-21,regX:-32.3,x:48.05}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:98.9614,x:32.55,y:48.4}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:137.7274,x:27.25,y:134.35,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:107.0025,x:24.4,y:135.7,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:-5.6714,x:35.65,y:185.1,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.7269,y:-60.3,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:17.7814,x:-35.15,y:186.65,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:1.2785,x:-27.85,y:91.25,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-10.0069,x:25.9,y:87.7,regX:1.3,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-1.9853,y:-81.85,x:-1.1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-153.8126,x:-50.8,y:59.75}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-155.6939,x:23.65,y:104.6,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-161.5598,x:22.65,y:105.05,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.5943,x:-59.8,y:-12.55,regY:9.3,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7735,y:49.05,x:-10.6,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:105.0743,y:-20.95,regX:-32.3,x:48.05}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:101.9443,x:30.6,y:47.9}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:140.7121,x:20.95,y:133.5,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:109.9864,x:17.9,y:134.8,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-5.4744,x:36.05,y:184.85,regY:-50.3,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.6444,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:19.2403,x:-34.4,y:186.75,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.995,scaleY:0.995,rotation:0.9498,x:-27.7,y:91.25,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-10.1373,x:26.05,y:87.6,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-1.6416,y:-81.8,x:-1.15,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-158.5072,x:-49.6,y:59.6}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-158.7246,x:28.15,y:98.35,regX:3.8,regY:-9.5}},{t:this.instance_1,p:{regX:13.8,rotation:-165.5636,x:27.3,y:98.55,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.5266,x:-59.6,y:-12.55,regY:9.5,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7735,y:49.05,x:-10.6,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:106.6351,y:-20.85,regX:-32.2,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:104.928,x:28.75,y:47.4}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:143.6942,x:14.65,y:132.35,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:112.9694,x:11.5,y:133.6,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-5.2773,x:36.35,y:184.9,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.561,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:20.6994,x:-33.6,y:186.9,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.6203,x:-27.4,y:91.35,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-10.2684,x:26.15,y:87.5,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-1.298,y:-81.85,x:-1.1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-163.2012,x:-48.45,y:59.45}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-161.7553,x:32.3,y:91.55,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-169.5662,x:31.35,y:92.05,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.4567,x:-59.7,y:-12.55,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7735,y:49,x:-10.6,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:108.1946,y:-20.95,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.6,scaleX:0.997,scaleY:0.997,rotation:107.912,x:26.9,y:47}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:146.6782,x:8.15,y:130.9,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:115.9527,x:5.2,y:132,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-5.0796,x:36.65,y:184.8,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.4785,y:-60.3,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9945,scaleY:0.9945,rotation:22.1581,x:-32.85,y:187.05,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.2899,x:-27.15,y:91.45,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-10.3999,x:26.25,y:87.4,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-0.9544,y:-81.95,x:-1.1,regY:50.5,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-167.8965,x:-47.25,y:59.3}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-164.7855,x:35.85,y:84.65,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-173.5682,x:34.95,y:85.05,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.3873,x:-59.65,y:-12.5,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7735,y:49,x:-10.55,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:109.7539,y:-21,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:110.8954,x:25.1,y:46.25}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:149.6616,x:2.05,y:129.4,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:118.9364,x:-1,y:130.15,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-4.8819,x:36.95,y:184.65,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.3969,y:-60.3,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:23.6165,x:-32.05,y:187.2,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.995,scaleY:0.995,rotation:-0.0351,x:-26.95,y:91.55,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-10.5314,x:26.15,y:87.35,regX:1.3,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.6108,y:-81.8,x:-1.15,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-172.59,x:-46,y:59.05}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-167.8156,x:38.8,y:77.45,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-177.573,x:37.95,y:77.95,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.3189,x:-59.7,y:-12.5,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7735,y:49,x:-10.55,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:111.3141,y:-20.95,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:113.879,x:23.25,y:45.65}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:152.6446,x:-3.9,y:127.45,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:121.9211,x:-7.05,y:127.95,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-4.6853,x:37.25,y:184.45,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.7,scaleX:0.9979,scaleY:0.9979,rotation:3.3135,y:-60.15,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9946,scaleY:0.9946,rotation:25.0754,x:-31.1,y:187.35,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:-0.3655,x:-26.65,y:91.7,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-10.6629,x:26.3,y:87.25,regX:1.3,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.2664,y:-81.8,x:-1.15,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-177.2848,x:-44.9,y:58.8}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-170.8466,x:41.15,y:70.2,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:178.4288,x:40.4,y:70.95,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-103.2503,x:-59.7,y:-12.5,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7735,y:49,x:-10.5,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:112.8727,y:-21,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:116.8627,x:21.4,y:44.95}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:155.6293,x:-10,y:125.15,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:124.9045,x:-13.15,y:125.6,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-4.4876,x:37.55,y:184.35,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.231,y:-60.2,regX:-2.6,x:-4.95}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:26.5344,x:-30.4,y:187.45,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:-0.6959,x:-26.4,y:91.8,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-10.7927,x:26.45,y:87.15,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:0.0727,y:-81.8,x:-1.25,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:178.0247,x:-43.85,y:58.55}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-173.8775,x:43,y:62.85,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:174.4264,x:42.15,y:63.5,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-104.18,x:-59.65,y:-12.6,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.6,rotation:1.7718,y:49,x:-10.55,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:111.5979,y:-20.95,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:113.1949,x:22.9,y:45.5}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:150.4938,x:-3.35,y:127.6,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:120.0075,x:-6.4,y:128.35,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-3.9931,x:37.2,y:184.5,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.252,y:-60.2,regX:-2.6,x:-4.95}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:25.8083,x:-30.55,y:187.35,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:-0.6467,x:-26.45,y:91.75,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-10.646,x:26.3,y:87.25,regX:1.3,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.2427,y:-81.8,x:-1.2,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-178.9116,x:-45.05,y:58.85}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-170.8128,x:41.25,y:67.8,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:177.4993,x:40.45,y:68.4,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-103.0757,x:-59.6,y:-12.6,regY:9.5,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7692,y:49,x:-10.45,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:110.3227,y:-21,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:109.5281,x:24.4,y:46.1}},{t:this.instance_12,p:{regX:-7,scaleX:0.9968,scaleY:0.9968,rotation:145.3585,x:3.3,y:129.75,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:115.1108,x:0.4,y:130.6,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-3.498,x:36.85,y:184.6,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.7,scaleX:0.9979,scaleY:0.9979,rotation:3.274,y:-60.1,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9946,scaleY:0.9946,rotation:25.0821,x:-30.6,y:187.45,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:-0.5983,x:-26.5,y:91.8,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-10.4983,x:26.1,y:87.35,regX:1.3,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-0.5626,y:-81.8,x:-1.2,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-175.8439,x:-46.55,y:59.15}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-167.7482,x:39.25,y:72.7,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-179.4325,x:38.45,y:73.15,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.9719,x:-59.8,y:-12.45,regY:9.3,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7674,y:49,x:-10.45,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:109.0466,y:-21.05,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:105.8594,x:25.9,y:46.6}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:140.2224,x:10.35,y:131.3,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:110.2153,x:7.4,y:132.6,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-3.0021,x:36.7,y:184.8,regY:-50.2,regX:3}},{t:this.instance_9,p:{regY:6.7,scaleX:0.9979,scaleY:0.9979,rotation:3.2942,y:-60.15,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:24.356,x:-30.8,y:187.35,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:-0.55,x:-26.5,y:91.7,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-10.3498,x:26.1,y:87.45,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-0.8825,y:-81.85,x:-1.1,regY:50.6,regX:2.3}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-172.7757,x:-47.9,y:59.3}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-164.6832,x:37,y:77.5,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-176.359,x:36.1,y:78,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.8663,x:-59.7,y:-12.55,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7657,y:49,x:-10.45,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:107.7712,y:-20.9,regX:-32.2,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:102.1927,x:27.4,y:47}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:135.0887,x:17.2,y:132.55,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:105.3184,x:14.55,y:134.2,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-2.5083,x:36.2,y:184.9,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.7,scaleX:0.9979,scaleY:0.9979,rotation:3.3152,y:-60.15,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9946,scaleY:0.9946,rotation:23.6299,x:-30.85,y:187.35,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:-0.5017,x:-26.6,y:91.7,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-10.2025,x:26.1,y:87.5,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-1.2024,y:-81.85,x:-1.25,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-169.7088,x:-49.25,y:59.6}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-161.6175,x:34.55,y:82.25,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-173.2856,x:33.65,y:82.8,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.7633,x:-59.65,y:-12.5,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7639,y:49,x:-10.45,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:106.4961,y:-21.15,regX:-32.4,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:98.5248,x:28.95,y:47.45}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:129.9526,x:24.3,y:133.45,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:100.4218,x:21.65,y:135.35,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-2.0129,x:35.85,y:185,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.7,scaleX:0.9979,scaleY:0.9979,rotation:3.3363,y:-60.15,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9945,scaleY:0.9945,rotation:22.9041,x:-31,y:187.35,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:-0.4516,x:-26.6,y:91.75,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-10.054,x:25.85,y:87.6,regX:1.3,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-1.5215,y:-81.85,x:-1.15,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-166.6414,x:-50.65,y:59.75}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-158.553,x:31.8,y:86.85,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-170.2141,x:30.9,y:87.3,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.6573,x:-59.65,y:-12.4,regY:9.4,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7622,y:49,x:-10.45,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:105.2209,y:-21,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:94.8576,x:30.45,y:47.85}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:124.8174,x:31.35,y:134.05,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:95.5263,x:29.05,y:136.05,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:-1.5177,x:35.65,y:185.15,regY:-50.2,regX:3}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.3574,y:-60.25,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:22.1775,x:-31.15,y:187.3,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:-0.4033,x:-26.65,y:91.7,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.906,x:25.7,y:87.65,regX:1.3,regY:4.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-1.8424,y:-81.8,x:-1.15,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-163.573,x:-52.05,y:59.9}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-155.4874,x:28.8,y:91.5,regX:3.8,regY:-9.5}},{t:this.instance_1,p:{regX:13.8,rotation:-167.1414,x:27.95,y:91.75,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-97.5539,x:-59.6,y:-12.5,regY:9.5,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7604,y:49,x:-10.45,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:103.9452,y:-20.85,regX:-32.2,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:91.19,x:32.1,y:48.25}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:119.6825,x:38.4,y:134.15,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:90.6289,x:36.15,y:136.4,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-1.0226,x:35.1,y:185.25,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.3793,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:21.4516,x:-31.3,y:187.3,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:-0.355,x:-26.65,y:91.7,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.7578,x:25.7,y:87.7,regX:1.4,regY:4.7}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-2.1624,y:-81.85,x:-1.2,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-160.5062,x:-53.45,y:60.05}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-152.4222,x:25.6,y:95.85,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-164.0676,x:24.7,y:96.1,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-96.4479,x:-59.8,y:-12.55,regY:9.3,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7578,y:49,x:-10.45,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:102.6689,y:-21.1,regX:-32.4,x:48}},{t:this.instance_13,p:{regX:-44.6,scaleX:0.997,scaleY:0.997,rotation:87.5273,x:33.6,y:48.65}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:114.5481,x:45.5,y:133.75,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:85.7379,x:43.35,y:136.4,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-0.5275,x:34.85,y:185.4,regY:-50.2,regX:3}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.4004,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:20.7258,x:-31.4,y:187.2,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:-0.3058,x:-26.65,y:91.65,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.6105,x:25.65,y:87.85,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-2.4816,y:-81.8,x:-1.15,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-157.4382,x:-54.85,y:60.15}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-149.3569,x:22.15,y:100.15,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-160.9947,x:21.25,y:100.35,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-95.3453,x:-59.65,y:-12.45,regY:9.4,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.756,y:49,x:-10.45,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:101.3942,y:-20.95,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:83.8598,x:35.15,y:48.85}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:109.4141,x:52.45,y:133.3,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:80.8412,x:50.6,y:135.7,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:-0.0325,x:34.4,y:185.5,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.4214,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:19.9982,x:-31.5,y:187.25,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:-0.2566,x:-26.75,y:91.7,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.4616,x:25.55,y:87.95,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-2.8019,y:-81.85,x:-1.15,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-154.3704,x:-56.3,y:60.25}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-146.2929,x:18.5,y:104.35,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-157.9215,x:17.6,y:104.45,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-94.2393,x:-59.65,y:-12.5,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7543,y:49,x:-10.45,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:100.118,y:-20.95,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:80.1915,x:36.7,y:49.15}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:104.2787,x:59.35,y:132.25,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:75.9457,x:57.8,y:134.95,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:0.4589,x:34.1,y:185.55,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.4425,y:-60.3,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:19.2739,x:-31.55,y:187.25,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:-0.2074,x:-26.75,y:91.7,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.3139,x:25.35,y:88.1,regX:1.3,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-3.1213,y:-81.8,x:-1.1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-151.3037,x:-57.65,y:60.25}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-143.2276,x:14.65,y:108.25,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-154.8481,x:13.75,y:108.4,regY:-1.1,scaleX:0.9966,scaleY:0.9966}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-93.135,x:-59.65,y:-12.5,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7525,y:49.05,x:-10.45,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:98.8433,y:-21.05,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.8,scaleX:0.997,scaleY:0.997,rotation:76.5239,x:38.25,y:49.25}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:99.1437,x:66.05,y:130.8,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:71.0486,x:64.85,y:133.65,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:0.9531,x:33.85,y:185.75,regY:-50.2,regX:3}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.4627,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:18.5464,x:-31.7,y:187.2,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:-0.1608,x:-26.85,y:91.6,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.1658,x:25.35,y:88.2,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-3.4408,y:-81.85,x:-1.05,regY:50.6,regX:2.3}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-148.2355,x:-59.1,y:60.3}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-140.1628,x:10.6,y:112.05,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-151.7757,x:9.65,y:112.15,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-92.03,x:-59.65,y:-12.6,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7508,y:49.05,x:-10.45,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:97.5678,y:-21.1,regX:-32.4,x:48}},{t:this.instance_13,p:{regX:-44.8,scaleX:0.997,scaleY:0.997,rotation:72.8585,x:39.85,y:49.4}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:94.0089,x:72.95,y:129.1,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:66.153,x:71.95,y:132,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:1.4482,x:33.35,y:185.85,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.4838,y:-60.3,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:17.8201,x:-31.8,y:187.2,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.995,scaleY:0.995,rotation:-0.1116,x:-26.85,y:91.65,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.0188,x:25.2,y:88.25,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-3.7622,y:-81.85,x:-1.15,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-145.1674,x:-60.5,y:60.3}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-137.0978,x:6.3,y:115.7,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-148.7033,x:5.4,y:115.8,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-90.9267,x:-59.75,y:-12.6,regY:9.3,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7491,y:49,x:-10.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:96.2925,y:-21,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:69.1905,x:41.35,y:49.7}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:88.8773,x:79.5,y:126.85,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:61.2567,x:78.8,y:130.05,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:1.9434,x:32.95,y:185.95,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.5048,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9946,scaleY:0.9946,rotation:17.0947,x:-31.85,y:187.25,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.995,scaleY:0.995,rotation:-0.0615,x:-26.85,y:91.6,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.8712,x:25.15,y:88.35,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-4.0819,y:-81.85,x:-1.05,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-142.0999,x:-61.9,y:60.3}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-134.0332,x:1.8,y:119.25,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-145.629,x:0.95,y:119.2,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-89.8273,x:-59.7,y:-12.45,regY:9.3,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7473,y:49,x:-10.5,scaleX:0.9993,scaleY:0.9993}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:95.0177,y:-21.05,regX:-32.3,x:48.05}},{t:this.instance_13,p:{regX:-44.6,scaleX:0.997,scaleY:0.997,rotation:65.5232,x:43.05,y:49.9}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:83.7428,x:86,y:124.5,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:56.36,x:85.45,y:127.55,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:2.4388,x:32.7,y:186.1,regY:-50.2,regX:3}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.5268,y:-60.25,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:16.3694,x:-32.1,y:187.2,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.995,scaleY:0.995,rotation:-0.0123,x:-26.95,y:91.6,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.7234,x:25.05,y:88.4,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-4.4009,y:-81.8,x:-1.1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-139.0322,x:-63.3,y:60.3}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-130.9695,x:-2.9,y:122.55,regX:3.8,regY:-9.5}},{t:this.instance_1,p:{regX:13.8,rotation:-142.5575,x:-3.7,y:122.4,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-88.7216,x:-59.6,y:-12.65,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7446,y:49,x:-10.5,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:93.7409,y:-21.05,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:61.8559,x:44.6,y:49.85}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:78.6084,x:92.2,y:121.65,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:51.4632,x:92.05,y:124.85,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:2.9335,x:32.3,y:186.2,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.5478,y:-60.25,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:15.6416,x:-32.2,y:187.15,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.995,scaleY:0.995,rotation:0.0316,x:-27,y:91.6,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.5757,x:24.9,y:88.45,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-4.7209,y:-81.85,x:-1.1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-135.9643,x:-64.65,y:60.15}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-127.9043,x:-7.65,y:125.55,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-139.4836,x:-8.5,y:125.45,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-87.6173,x:-59.6,y:-12.65,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7429,y:49,x:-10.5,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:92.466,y:-21,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.6,scaleX:0.997,scaleY:0.997,rotation:58.1876,x:46.2,y:50.05}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:73.4731,x:98.3,y:118.5,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:46.5668,x:98.4,y:121.65,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:3.4292,x:32,y:186.2,regY:-50.3,regX:3}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.5689,y:-60.25,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:14.9164,x:-32.35,y:187.15,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.995,scaleY:0.995,rotation:0.08,x:-27,y:91.55,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.4272,x:24.8,y:88.55,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-5.0402,y:-81.85,x:-1.05,regY:50.6,regX:2.3}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-132.898,x:-66.1,y:60.05}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-124.8387,x:-12.6,y:128.45,regX:3.8,regY:-9.5}},{t:this.instance_1,p:{regX:13.8,rotation:-136.4112,x:-13.45,y:128.2,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-86.5129,x:-59.65,y:-12.65,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7411,y:49.05,x:-10.5,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:91.1906,y:-20.85,regX:-32.2,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:54.5199,x:47.75,y:49.95}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:68.3388,x:104.15,y:115.1,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:41.6708,x:104.45,y:118.15,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:3.9243,x:31.5,y:186.4,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.5899,y:-60.25,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:14.1897,x:-32.4,y:187.15,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.1292,x:-27,y:91.6,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.2798,x:24.75,y:88.65,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-5.3605,y:-81.85,x:-1.1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-129.8305,x:-67.5,y:59.9}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-121.7745,x:-17.6,y:131,regX:3.8,regY:-9.3}},{t:this.instance_1,p:{regX:13.8,rotation:-133.3381,x:-18.65,y:130.8,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-85.408,x:-59.55,y:-12.65,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7394,y:49.05,x:-10.5,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:89.9211,y:-21.05,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:50.8529,x:49.3,y:49.95}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:63.2031,x:109.8,y:111.3,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:36.7739,x:110.5,y:114.35,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:4.418,x:31.25,y:186.55,regY:-50.2,regX:3}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.611,y:-60.25,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:13.4647,x:-32.6,y:187.15,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.1784,x:-27,y:91.5,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.1313,x:24.6,y:88.75,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-5.6801,y:-81.85,x:-1.05,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-126.7619,x:-68.85,y:59.7}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-118.7089,x:-22.95,y:133.4,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-130.2644,x:-23.9,y:133.15,regY:-1.1,scaleX:0.9966,scaleY:0.9966}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-84.3033,x:-59.45,y:-12.6,regY:9.5,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7376,y:49.05,x:-10.5,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9973,scaleY:0.9973,rotation:88.6445,y:-21.05,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:47.1856,x:50.9,y:49.9}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:58.0675,x:115.2,y:107.3,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:31.877,x:116.05,y:110.25,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:4.9138,x:30.8,y:186.65,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.6321,y:-60.25,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:12.7373,x:-32.7,y:187.1,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.2258,x:-27.1,y:91.55,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-7.9822,x:24.45,y:88.85,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.0008,y:-81.85,x:-1.1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-123.6947,x:-70.3,y:59.45}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-115.6445,x:-28.4,y:135.55,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-127.1934,x:-29.25,y:135.2,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-83.2,x:-59.55,y:-12.55,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7359,y:49.05,x:-10.5,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.369,y:-21.2,regX:-32.4,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:43.5179,x:52.45,y:49.75}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:52.9328,x:120.35,y:103,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:26.98,x:121.45,y:105.9,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:5.4091,x:30.45,y:186.65,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.6532,y:-60.25,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:12.0111,x:-32.85,y:187.05,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.2741,x:-27.1,y:91.5,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-7.8356,x:24.4,y:88.95,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.3207,y:-81.85,x:-1.05,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-120.6273,x:-71.7,y:59.25}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-112.5791,x:-33.85,y:137.5,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.9,rotation:-124.1197,x:-34.8,y:137.05,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-82.0948,x:-59.45,y:-12.6,regY:9.5,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7341,y:49.05,x:-10.5,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.0939,y:-21.1,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:39.8497,x:54.05,y:49.65}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:47.7982,x:125.15,y:98.3,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:22.0846,x:126.55,y:101.2,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:5.9038,x:30.1,y:186.8,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.6751,y:-60.25,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:11.2858,x:-32.9,y:187.05,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.3242,x:-27.15,y:91.55,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-7.6866,x:24.25,y:89.05,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-6.6399,y:-81.8,x:-0.95,regY:50.6,regX:2.3}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-117.5605,x:-73.05,y:59.05}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-109.5147,x:-39.65,y:139.2,regX:3.7,regY:-9.5}},{t:this.instance_1,p:{regX:13.9,rotation:-121.0468,x:-40.45,y:138.65,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-80.9895,x:-59.65,y:-12.65,regY:9.3,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7315,y:49.05,x:-10.5,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.8186,y:-21.05,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:36.1835,x:55.6,y:49.55}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:42.6625,x:129.75,y:93.6,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:17.1887,x:131.4,y:96.25,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:6.3989,x:29.7,y:186.9,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.6962,y:-60.25,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:10.5588,x:-33.05,y:187,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.3725,x:-27.25,y:91.5,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-7.5393,x:24.25,y:89.1,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.9595,y:-81.8,x:-1.1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-114.4922,x:-74.4,y:58.7}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-106.4492,x:-45.2,y:140.5,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-117.9739,x:-46.05,y:140.05,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-79.8843,x:-59.6,y:-12.6,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7298,y:49.05,x:-10.5,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.5434,y:-21,regX:-32.2,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:32.5158,x:57.2,y:49.3}},{t:this.instance_12,p:{regX:-7,scaleX:0.9968,scaleY:0.9968,rotation:37.5279,x:134,y:88.6,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:12.2925,x:135.85,y:91,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:6.8947,x:29.35,y:187.1,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.7172,y:-60.25,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:9.8336,x:-33.15,y:187.05,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.4217,x:-27.2,y:91.5,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-7.392,x:24.05,y:89.2,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.2791,y:-81.95,x:-0.95,regY:50.5,regX:2.3}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-111.4251,x:-75.8,y:58.45}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-103.3849,x:-50.95,y:141.7,regX:3.8,regY:-9.3}},{t:this.instance_1,p:{regX:13.8,rotation:-114.9003,x:-51.85,y:141.15,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-78.7817,x:-59.55,y:-12.65,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.728,y:49.05,x:-10.5,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9973,scaleY:0.9973,rotation:82.2669,y:-21.05,regX:-32.3,x:47.9}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:28.8476,x:58.75,y:49.1}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:32.3917,x:137.8,y:83.25,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:7.3949,x:139.9,y:85.7,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:7.389,x:28.95,y:187.15,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.7391,y:-60.3,regX:-2.7,x:-5.2}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:9.1073,x:-33.3,y:186.95,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.4701,x:-27.25,y:91.5,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-7.243,x:23.95,y:89.3,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-7.5999,y:-81.8,x:-1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-108.357,x:-77.15,y:58.1}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-100.3197,x:-56.75,y:142.5,regX:3.8,regY:-9.3}},{t:this.instance_1,p:{regX:13.8,rotation:-111.828,x:-57.6,y:142,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.6766,x:-59.55,y:-12.6,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7263,y:49.05,x:-10.55,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:80.9917,y:-21.1,regX:-32.3,x:47.9}},{t:this.instance_13,p:{regX:-44.8,scaleX:0.997,scaleY:0.997,rotation:25.1802,x:60.2,y:48.8}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:27.2578,x:141.35,y:77.95,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:2.4996,x:143.7,y:79.95,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:7.884,x:28.65,y:187.25,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.7594,y:-60.3,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9946,scaleY:0.9946,rotation:8.3806,x:-33.3,y:186.95,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.5184,x:-27.25,y:91.4,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-7.0952,x:23.9,y:89.4,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.9202,y:-81.8,x:-1.05,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-105.2891,x:-78.6,y:57.75}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-97.2545,x:-62.7,y:143.3,regX:3.7,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-108.7559,x:-63.65,y:142.65,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-76.5719,x:-59.65,y:-12.7,regY:9.3,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7245,y:49.05,x:-10.55,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:79.7154,y:-21.05,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:21.5122,x:61.8,y:48.5}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:22.1236,x:144.65,y:72.4,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:-2.3933,x:147.1,y:74.3,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:8.3788,x:28.3,y:187.25,regY:-50.3,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:3.7804,y:-60.3,regX:-2.7,x:-5.2}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9946,scaleY:0.9946,rotation:7.6545,x:-33.35,y:187,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.5676,x:-27.35,y:91.45,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-6.9481,x:23.75,y:89.5,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.2388,y:-81.85,x:-1.05,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-102.2227,x:-79.95,y:57.4}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-94.1896,x:-68.7,y:143.5,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-105.6827,x:-69.4,y:142.85,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-75.467,x:-59.55,y:-12.6,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7236,y:49.05,x:-10.55,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:78.4413,y:-21.1,regX:-32.3,x:47.9}},{t:this.instance_13,p:{regX:-44.6,scaleX:0.997,scaleY:0.997,rotation:17.8449,x:63.45,y:48.2}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:16.9889,x:147.6,y:66.7,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:-7.2879,x:150.15,y:68.45,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:8.874,x:27.9,y:187.5,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.8015,y:-60.4,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:6.9278,x:-33.6,y:186.95,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.6168,x:-27.35,y:91.4,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-6.8002,x:23.6,y:89.6,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.5587,y:-81.95,x:-1.05,regY:50.5,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-99.1542,x:-81.2,y:56.95}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-91.1252,x:-74.5,y:143.55,regX:3.8,regY:-9.3}},{t:this.instance_1,p:{regX:13.8,rotation:-102.6092,x:-75.4,y:142.95,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-74.3628,x:-59.6,y:-12.45,regY:9.4,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.721,y:49.05,x:-10.55,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:77.1657,y:-21.1,regX:-32.3,x:47.9}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:14.1779,x:64.95,y:47.85}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:11.853,x:149.95,y:60.9,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:-12.1848,x:152.9,y:62.4,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:9.3685,x:27.6,y:187.55,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.8226,y:-60.4,regX:-2.7,x:-5.2}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:6.203,x:-33.7,y:187,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.666,x:-27.35,y:91.4,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9943,scaleY:0.9943,rotation:-6.6522,x:23.55,y:89.65,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.8795,y:-81.8,x:-1.05,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-96.0862,x:-82.55,y:56.55}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-88.0641,x:-80.5,y:143.35,regX:3.8,regY:-9.3}},{t:this.instance_1,p:{regX:13.8,rotation:-99.5369,x:-81.5,y:142.7,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.259,x:-59.55,y:-12.65,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7184,y:49.1,x:-10.55,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:75.8893,y:-21.15,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:10.5104,x:66.45,y:47.45}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:6.7179,x:152.3,y:55,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:-17.0813,x:155.15,y:56.2,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:9.8641,x:27.25,y:187.55,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.8446,y:-60.35,regX:-2.6,x:-5.05}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:5.4777,x:-33.85,y:186.8,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.7143,x:-27.5,y:91.35,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-6.5044,x:23.4,y:89.75,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-9.1991,y:-81.8,x:-1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-93.0199,x:-83.95,y:56}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-84.9992,x:-86.7,y:143,regX:3.7,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-96.4626,x:-87.3,y:142.1,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-72.1526,x:-59.6,y:-12.65,regY:9.3,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.1,x:-10.55,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:74.6139,y:-21.1,regX:-32.3,x:47.9}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:6.8429,x:68,y:47}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:1.5833,x:154.05,y:49.1,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:-21.9783,x:157.1,y:50.05,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:10.3598,x:26.9,y:187.65,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.8657,y:-60.35,regX:-2.6,x:-5.1}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:4.7504,x:-33.95,y:186.9,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.7618,x:-27.45,y:91.4,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-6.3566,x:23.3,y:89.85,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-9.5187,y:-81.75,x:-1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-89.9562,x:-85.2,y:55.55}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-81.934,x:-92.7,y:142.1,regX:3.8,regY:-9.5}},{t:this.instance_1,p:{regX:13.9,rotation:-93.3905,x:-93.15,y:141.25,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-71.0485,x:-59.55,y:-12.6,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.1,x:-10.55,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:75.7139,y:-21.05,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:11.3911,x:66.65,y:47.4}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:9.0798,x:152.25,y:56.4,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:-14.9733,x:155.1,y:57.65,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:9.1716,x:27.35,y:187.5,regY:-50.3,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.9122,y:-60.4,regX:-2.6,x:-5.1}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:4.8545,x:-34.5,y:186.75,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.9797,x:-27.6,y:91.35,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-6.5433,x:23.45,y:89.75,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-9.1902,y:-81.8,x:-1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-91.7095,x:-83.6,y:56.15}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-85.258,x:-88.35,y:142.9,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.9,rotation:-95.8353,x:-88.95,y:142.05,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-72.3855,x:-59.4,y:-12.6,regY:9.5,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.1,x:-10.55,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:76.8122,y:-21.1,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:15.9385,x:65.35,y:47.7}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:16.5752,x:150.05,y:63.55,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:-7.9702,x:152.7,y:65.1,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:7.9836,x:27.75,y:187.5,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:3.9605,y:-60.4,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:4.9569,x:-34.95,y:186.65,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:1.1959,x:-27.75,y:91.3,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9943,scaleY:0.9943,rotation:-6.731,x:23.6,y:89.65,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.8601,y:-81.8,x:-1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-93.4662,x:-82,y:56.65}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-88.5809,x:-84.1,y:143.5,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-98.2805,x:-84.9,y:142.85,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.722,x:-59.45,y:-12.55,regY:9.5,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.1,x:-10.55,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:77.9119,y:-21.1,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:20.4854,x:64.05,y:48.05}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:24.07,x:147.3,y:70.4,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:-0.9657,x:149.65,y:72.3,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:6.7972,x:28.15,y:187.4,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:4.0079,y:-60.4,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:5.061,x:-35.5,y:186.65,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:1.4129,x:-27.9,y:91.25,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-6.918,x:23.7,y:89.55,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-8.532,y:-81.95,x:-1,regY:50.5,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-95.2226,x:-80.35,y:57.2}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-91.8999,x:-79.7,y:144.05,regX:3.8,regY:-9.3}},{t:this.instance_1,p:{regX:13.8,rotation:-100.7247,x:-80.5,y:143.4,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-75.0589,x:-59.55,y:-12.65,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.1,x:-10.6,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:79.0116,y:-21.05,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:25.0346,x:62.65,y:48.35}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:31.5674,x:143.85,y:77.2,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:6.0331,x:146.1,y:79.45,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:5.6104,x:28.65,y:187.25,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:4.0562,y:-60.4,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:5.1651,x:-36,y:186.55,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:1.6274,x:-28.05,y:91.3,regY:-42.1}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-7.1049,x:23.85,y:89.45,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.2025,y:-81.8,x:-1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-96.9805,x:-78.8,y:57.7}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-95.2227,x:-75.65,y:144.5,regX:3.8,regY:-9.5}},{t:this.instance_1,p:{regX:13.8,rotation:-103.169,x:-76.25,y:143.9,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-76.3971,x:-59.55,y:-12.55,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.1,x:-10.6,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:80.1108,y:-21.2,regX:-32.4,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:29.5817,x:61.4,y:48.65}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:39.0629,x:140.1,y:83.9,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:13.0385,x:141.85,y:86.45,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:4.4224,x:29.15,y:187.15,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.5,scaleX:0.9979,scaleY:0.9979,rotation:4.1045,y:-60.4,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9946,scaleY:0.9946,rotation:5.2684,x:-36.45,y:186.45,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.995,scaleY:0.995,rotation:1.8446,x:-28.25,y:91.2,regY:-42.1}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-7.2935,x:24.05,y:89.3,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.8741,y:-81.8,x:-1,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-98.7368,x:-77.1,y:58.1}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-98.5463,x:-71.2,y:144.8,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-105.6142,x:-72,y:144.2,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.734,x:-59.6,y:-12.6,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.1,x:-10.6,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:81.2099,y:-21.1,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:34.1298,x:60.05,y:48.9}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:46.5587,x:135.65,y:90.2,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:20.0422,x:137.2,y:93.1,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:3.2354,x:29.6,y:187.05,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.152,y:-60.3,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:5.3717,x:-37.05,y:186.35,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:2.0617,x:-28.4,y:91.05,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-7.4807,x:24.1,y:89.25,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-7.5443,y:-81.8,x:-0.9,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-100.4944,x:-75.45,y:58.45}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-101.8703,x:-66.8,y:145.1,regX:3.7,regY:-9.3}},{t:this.instance_1,p:{regX:13.8,rotation:-108.0585,x:-67.85,y:144.4,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-79.0702,x:-59.6,y:-12.55,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.1,x:-10.6,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:82.3084,y:-21,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.8,scaleX:0.997,scaleY:0.997,rotation:38.6775,x:58.65,y:49.1}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:54.0544,x:130.75,y:96.25,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:27.0459,x:131.95,y:99.3,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:2.0472,x:30.2,y:186.95,regY:-50.2,regX:3}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.2003,y:-60.3,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:5.475,x:-37.6,y:186.2,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:2.2788,x:-28.55,y:91,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-7.668,x:24.35,y:89.15,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.2156,y:-81.85,x:-0.85,regY:50.6,regX:2.3}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-102.2525,x:-73.9,y:58.85}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-105.1943,x:-62.8,y:145.1,regX:3.8,regY:-9.5}},{t:this.instance_1,p:{regX:13.8,rotation:-110.5034,x:-63.55,y:144.55,regY:-1.2,scaleX:0.9966,scaleY:0.9966}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-80.4085,x:-59.6,y:-12.6,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.15,x:-10.6,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.4093,y:-21.1,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.6,scaleX:0.997,scaleY:0.997,rotation:43.2251,x:57.4,y:49.4}},{t:this.instance_12,p:{regX:-7,scaleX:0.9968,scaleY:0.9968,rotation:61.5503,x:125.55,y:102.15,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:34.0516,x:126.1,y:105.2,regX:-9.9,regY:10.6}},{t:this.instance_10,p:{rotation:0.8599,x:30.5,y:186.85,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.2477,y:-60.3,regX:-2.7,x:-5.15}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:5.5775,x:-38.05,y:186.05,regY:-51.3}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:2.4943,x:-28.7,y:90.85,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-7.8544,x:24.4,y:89.05,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-6.8852,y:-81.85,x:-0.8,regY:50.6,regX:2.3}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-104.0094,x:-72.2,y:59.2}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-108.5173,x:-58.45,y:145,regX:3.8,regY:-9.5}},{t:this.instance_1,p:{regX:13.8,rotation:-112.9492,x:-59.2,y:144.55,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-81.745,x:-59.5,y:-12.55,regY:9.5,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.15,x:-10.6,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.5078,y:-21.05,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:47.7727,x:56,y:49.55}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:69.0467,x:119.65,y:107.55,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:41.0549,x:120.1,y:110.7,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-0.3227,x:30.9,y:186.7,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.296,y:-60.3,regX:-2.6,x:-5.1}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:5.6809,x:-38.55,y:186.05,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.995,scaleY:0.995,rotation:2.7107,x:-28.9,y:90.8,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.0417,x:24.6,y:88.95,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-6.5571,y:-81.75,x:-0.9,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-105.7664,x:-70.5,y:59.45}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-111.8403,x:-54,y:144.9,regX:3.7,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-115.3932,x:-54.95,y:144.35,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-83.0815,x:-59.6,y:-12.45,regY:9.4,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.15,x:-10.6,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.6069,y:-21,regX:-32.3,x:48.05}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:52.3205,x:54.65,y:49.7}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:76.5424,x:113.6,y:112.4,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:48.059,x:113.45,y:115.75,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-1.5107,x:31.5,y:186.5,regY:-50.2,regX:3}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.3427,y:-60.3,regX:-2.6,x:-5.1}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9946,scaleY:0.9946,rotation:5.785,x:-39,y:186.05,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:2.928,x:-29.05,y:90.75,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.2301,x:24.7,y:88.8,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-6.2281,y:-81.8,x:-0.85,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-107.5236,x:-68.8,y:59.75}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-115.164,x:-49.8,y:144.6,regX:3.8,regY:-9.5}},{t:this.instance_1,p:{regX:13.8,rotation:-117.8381,x:-50.65,y:144.05,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-84.4177,x:-59.55,y:-12.55,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.15,x:-10.6,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.7062,y:-21.05,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.6,scaleX:0.997,scaleY:0.997,rotation:56.8688,x:53.35,y:49.9}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:84.0383,x:106.95,y:117.15,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:55.0634,x:106.55,y:120.3,regX:-9.8,regY:10.5}},{t:this.instance_10,p:{rotation:-2.6975,x:31.85,y:186.45,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.39,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.3,scaleX:0.9946,scaleY:0.9946,rotation:5.8884,x:-39.5,y:185.9,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.1435,x:-29.2,y:90.65,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.4166,x:24.9,y:88.7,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-5.8977,y:-81.95,x:-0.75,regY:50.5,regX:2.3}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-109.2816,x:-67.15,y:59.85}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-118.4876,x:-45.55,y:144.05,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-120.2826,x:-46.5,y:143.7,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-85.7554,x:-59.65,y:-12.5,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.15,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9973,scaleY:0.9973,rotation:87.8051,y:-21,regX:-32.3,x:47.95}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:61.4157,x:51.95,y:49.85}},{t:this.instance_12,p:{regX:-7,scaleX:0.9968,scaleY:0.9968,rotation:91.5306,x:100.2,y:121.4,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:62.0678,x:99.2,y:124.35,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-3.8847,x:32.25,y:186.3,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.4375,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:5.991,x:-40.15,y:185.75,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3609,x:-29.35,y:90.8,regY:-42.1}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.6042,x:24.95,y:88.6,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-5.57,y:-81.8,x:-0.85,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-111.0371,x:-65.5,y:60}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-121.8103,x:-41.15,y:143.5,regX:3.8,regY:-9.3}},{t:this.instance_1,p:{regX:13.8,rotation:-122.7276,x:-42.2,y:143.3,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-87.0924,x:-59.65,y:-12.4,regY:9.4,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.15,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:88.9049,y:-21.05,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:65.964,x:50.55,y:49.95}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:99.0264,x:93,y:124.95,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:69.0722,x:91.7,y:127.9,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-5.0717,x:32.75,y:186.25,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.4858,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:6.0944,x:-40.6,y:185.7,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.995,scaleY:0.995,rotation:3.5774,x:-29.55,y:90.65,regY:-42.1}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.7911,x:25.2,y:88.5,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-5.2408,y:-81.85,x:-0.9,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-112.7957,x:-63.8,y:60.05}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-125.1336,x:-37,y:142.95,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-125.1723,x:-38,y:142.65,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-88.4287,x:-59.75,y:-12.55,regY:9.3,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.15,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:90.0009,y:-21,regX:-32.3,x:48}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:70.5118,x:49.25,y:50}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9968,scaleY:0.9968,rotation:106.5225,x:85.5,y:128,regY:13.9}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:76.0765,x:83.85,y:130.9,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-6.26,x:33.15,y:186.05,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.5333,y:-60.3,regX:-2.6,x:-5}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:6.1978,x:-41.15,y:185.65,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.7923,x:-29.65,y:90.5,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-8.9779,x:25.25,y:88.4,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9977,scaleY:0.9977,rotation:-4.9117,y:-81.8,x:-0.9,regY:50.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-114.5519,x:-62,y:60.15}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-128.457,x:-32.8,y:142.2,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.9,rotation:-127.6176,x:-33.8,y:141.85,regY:-1.1,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-89.7659,x:-59.65,y:-12.55,regY:9.4,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-5.5,rotation:1.7167,y:49.2,x:-10.65,scaleX:0.9994,scaleY:0.9994}},{t:this.instance_14,p:{scaleX:0.9972,scaleY:0.9972,rotation:91.0977,y:-20.9,regX:-32.3,x:48.05}},{t:this.instance_13,p:{regX:-44.7,scaleX:0.997,scaleY:0.997,rotation:75.0592,x:47.8,y:50.05}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9968,scaleY:0.9968,rotation:114.0178,x:77.95,y:130.85,regY:13.8}},{t:this.instance_11,p:{scaleX:0.9968,scaleY:0.9968,rotation:83.0807,x:75.8,y:133.3,regX:-9.8,regY:10.6}},{t:this.instance_10,p:{rotation:-7.4458,x:33.7,y:185.9,regY:-50.2,regX:2.9}},{t:this.instance_9,p:{regY:6.6,scaleX:0.9979,scaleY:0.9979,rotation:4.5816,y:-60.35,regX:-2.7,x:-5.1}},{t:this.instance_8,p:{regX:1.2,scaleX:0.9946,scaleY:0.9946,rotation:6.3013,x:-41.6,y:185.5,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.0081,x:-29.85,y:90.35,regY:-42.2}},{t:this.instance_6,p:{scaleX:0.9942,scaleY:0.9942,rotation:-9.1658,x:25.4,y:88.35,regX:1.4,regY:4.8}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9976,scaleY:0.9976,rotation:-4.5829,y:-81.95,x:-0.7,regY:50.5,regX:2.3}},{t:this.instance_3,p:{scaleX:0.9969,scaleY:0.9969,rotation:-116.3089,x:-60.4,y:60.25}},{t:this.instance_2,p:{scaleX:0.9969,scaleY:0.9969,rotation:-131.7799,x:-28.6,y:141.3,regX:3.8,regY:-9.4}},{t:this.instance_1,p:{regX:13.8,rotation:-130.061,x:-29.65,y:141.15,regY:-1.2,scaleX:0.9967,scaleY:0.9967}},{t:this.instance,p:{scaleX:0.9972,scaleY:0.9972,rotation:-91.0995,x:-59.8,y:-12.6,regY:9.3,regX:33.8}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-105,-209.7,291.4,508.4);


// stage content:
(lib.LessonChapter1_01 = function(mode,startPosition,loop,reversed) {
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
	this.streamSoundSymbolsList[0] = [{id:"beforewar2edit_01wav",startFrame:0,endFrame:192,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("beforewar2edit_01wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,192,1);
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
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter1_02.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("https://ninzato.github.io/history-of-badr-war/LessonChapter1_00.html");
			}, 500);
			
		}
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_191 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(191).call(this.frame_191).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_1561();
	this.instance.setTransform(195.55,597,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1560();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(192));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(192));

	// Interaction
	this.instance_2 = new lib.Rasulullah_icon_button();
	this.instance_2.setTransform(443.3,321.6);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 1);

	this.instance_3 = new lib.CharacterCivilian_06_btn();
	this.instance_3.setTransform(839.3,321,0.8716,0.8715);
	new cjs.ButtonHelper(this.instance_3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},191).wait(1));

	// People
	this.instance_4 = new lib.CharacterCivilian_06();
	this.instance_4.setTransform(1191.95,355,0.8713,0.8713,0,0,180,-4.5,42.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({x:843.2},190).to({_off:true},1).wait(1));

	// Layer_2
	this.instance_5 = new lib.Rasulullah_icon();
	this.instance_5.setTransform(242.7,321.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({x:443.3,y:320.05},190).to({_off:true},1).wait(1));

	// Bg
	this.instance_6 = new lib.Chap1Scene1();
	this.instance_6.setTransform(0,0,0.6667,0.6667);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(192));

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
		{src:"images/LessonChapter1_01_atlas_1.png", id:"LessonChapter1_01_atlas_1"},
		{src:"images/LessonChapter1_01_atlas_2.png", id:"LessonChapter1_01_atlas_2"},
		{src:"sounds/beforewar2edit_01wav.mp3", id:"beforewar2edit_01wav"},
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