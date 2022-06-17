(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter1_02_atlas_1", frames: [[0,1724,330,317],[1781,1006,228,432],[332,1724,330,317],[1781,1440,228,432],[664,1724,330,317],[1079,1006,228,432],[996,1724,330,317],[1309,1006,228,432],[1328,1724,330,317],[1539,1006,228,432],[0,1590,1779,132],[0,738,1914,266],[1282,0,737,736],[0,1006,582,582],[584,1006,493,493],[0,0,1280,720]]},
		{name:"LessonChapter1_02_atlas_2", frames: [[177,707,163,120],[342,708,163,120],[638,294,249,249],[638,545,249,249],[643,796,134,50],[889,294,132,102],[507,796,134,130],[0,0,331,292],[333,0,331,292],[0,294,317,265],[319,294,317,265],[666,0,315,292],[889,686,122,50],[405,561,175,145],[0,561,202,144],[507,708,115,48],[0,707,175,145],[204,561,199,144],[889,597,91,87],[889,507,91,88],[889,398,110,107]]}
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



(lib.CachedBmp_1610 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1609 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1608 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1607 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1606 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1605 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1604 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1603 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1602 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1601 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1600 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1599 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1598 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1597 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1596 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1595 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1594 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1593 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1592 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1591 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1590 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1589 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1588 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1587 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1586 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1585 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1584 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1583 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1582 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1581 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter1_02_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.Path_1_0 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.Path_2_0 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.Path_3_0 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.Chap1Scene2 = function() {
	this.initialize(ss["LessonChapter1_02_atlas_1"]);
	this.gotoAndStop(15);
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
	this.instance = new lib.CachedBmp_1609();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1610();
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
	this.instance = new lib.CachedBmp_1604();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_1606();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_1605();
	this.instance_2.setTransform(-33.1,-28.15,0.4875,0.4875);

	this.instance_3 = new lib.CompoundPath();
	this.instance_3.setTransform(-159.75,-154.3,3.5003,3.5003);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-159.7,-154.3,318.5,304.5);


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
	this.instance = new lib.CachedBmp_1603();
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
	this.instance = new lib.CachedBmp_1602();
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
	this.instance = new lib.CachedBmp_1601();
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
	this.instance_1 = new lib.CachedBmp_1600();
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
	this.instance_1 = new lib.CachedBmp_1599();
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
	this.instance_1 = new lib.CachedBmp_1598();
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
	this.instance = new lib.CachedBmp_1597();
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
	this.instance = new lib.CachedBmp_1596();
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
	this.instance_2 = new lib.CachedBmp_1595();
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
	this.instance_1 = new lib.CachedBmp_1594();
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
	this.instance_1 = new lib.CachedBmp_1593();
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
	this.instance_2 = new lib.CachedBmp_1592();
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
	this.instance_2 = new lib.CachedBmp_1591();
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
	this.instance = new lib.CachedBmp_1590();
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
	this.instance_1 = new lib.CachedBmp_1589();
	this.instance_1.setTransform(-78.3,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.3,-67.4,157.5,146);


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
	this.instance = new lib.CachedBmp_1586();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1588();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1587();
	this.instance_2.setTransform(-43.45,-36.05,0.5,0.5);

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(-214.75,-207.05,4.7384,4.7384);

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
	this.instance = new lib.CachedBmp_1583();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1585();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1584();
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
	this.instance = new lib.CachedBmp_1607();
	this.instance.setTransform(-62.35,-62.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(59));

	// small_star
	this.instance_1 = new lib.Path_2();
	this.instance_1.setTransform(0.8,-1.05,0.4441,0.4441,0,0,0,287.2,290.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:291,regY:291,scaleX:0.4447,scaleY:0.4447,rotation:2.5439,x:2.5,y:-0.9},0).wait(1).to({scaleX:0.4454,scaleY:0.4454,rotation:5.0879,y:-0.85},0).wait(1).to({scaleX:0.446,scaleY:0.446,rotation:7.6318,y:-0.75},0).wait(1).to({scaleX:0.4467,scaleY:0.4467,rotation:10.1758,y:-0.7},0).wait(1).to({scaleX:0.4473,scaleY:0.4473,rotation:12.7197,x:2.45,y:-0.65},0).wait(1).to({scaleX:0.4479,scaleY:0.4479,rotation:15.2637,y:-0.6},0).wait(1).to({scaleX:0.4486,scaleY:0.4486,rotation:17.8076,y:-0.5},0).wait(1).to({scaleX:0.4492,scaleY:0.4492,rotation:20.3516,x:2.4,y:-0.45},0).wait(1).to({scaleX:0.4499,scaleY:0.4499,rotation:22.8955,x:2.35,y:-0.3},0).wait(1).to({scaleX:0.4505,scaleY:0.4505,rotation:25.4395,x:2.4},0).wait(1).to({scaleX:0.4512,scaleY:0.4512,rotation:27.9834,x:2.35,y:-0.2},0).wait(1).to({scaleX:0.4518,scaleY:0.4518,rotation:30.5274,x:2.25,y:-0.1},0).wait(1).to({scaleX:0.4524,scaleY:0.4524,rotation:33.0713,y:-0.05},0).wait(1).to({scaleX:0.4531,scaleY:0.4531,rotation:35.6153,x:2.2,y:0},0).wait(1).to({scaleX:0.4537,scaleY:0.4537,rotation:38.1592,x:2.1,y:0.05},0).wait(1).to({scaleX:0.4544,scaleY:0.4544,rotation:40.7032,y:0.15},0).wait(1).to({scaleX:0.455,scaleY:0.455,rotation:43.2471},0).wait(1).to({scaleX:0.4557,scaleY:0.4557,rotation:45.7911,x:1.95,y:0.2},0).wait(1).to({scaleX:0.4563,scaleY:0.4563,rotation:48.335,x:1.9,y:0.25},0).wait(1).to({scaleX:0.457,scaleY:0.457,rotation:50.879,x:1.85,y:0.3},0).wait(1).to({scaleX:0.4576,scaleY:0.4576,rotation:53.4229,x:1.75,y:0.4},0).wait(1).to({scaleX:0.4582,scaleY:0.4582,rotation:55.9669,y:0.45},0).wait(1).to({scaleX:0.4589,scaleY:0.4589,rotation:58.5108,x:1.7},0).wait(1).to({scaleX:0.4595,scaleY:0.4595,rotation:61.0548,x:1.6},0).wait(1).to({scaleX:0.4602,scaleY:0.4602,rotation:63.5987,x:1.55,y:0.55},0).wait(1).to({scaleX:0.4608,scaleY:0.4608,rotation:66.1427,x:1.45,y:0.6},0).wait(1).to({scaleX:0.4615,scaleY:0.4615,rotation:68.6866,x:1.4},0).wait(1).to({scaleX:0.4621,scaleY:0.4621,rotation:71.2306,x:1.35},0).wait(1).to({scaleX:0.4628,scaleY:0.4628,rotation:73.7745,x:1.2,y:0.65},0).wait(1).to({scaleX:0.4634,scaleY:0.4634,rotation:76.3184},0).wait(1).to({scaleX:0.461,scaleY:0.461,rotation:78.8624,x:1.05,y:0.7},0).wait(1).to({scaleX:0.4587,scaleY:0.4587,rotation:81.4063,y:0.65},0).wait(1).to({scaleX:0.4563,scaleY:0.4563,rotation:83.9503,x:0.95,y:0.7},0).wait(1).to({scaleX:0.454,scaleY:0.454,rotation:86.4942,x:0.9},0).wait(1).to({scaleX:0.4516,scaleY:0.4516,rotation:89.0382,x:0.8,y:0.65},0).wait(1).to({scaleX:0.4493,scaleY:0.4493,rotation:91.5821,x:0.7,y:0.7},0).wait(1).to({scaleX:0.4469,scaleY:0.4469,rotation:94.1261,x:0.65,y:0.65},0).wait(1).to({scaleX:0.4445,scaleY:0.4445,rotation:96.67,x:0.6},0).wait(1).to({scaleX:0.4422,scaleY:0.4422,rotation:99.214,x:0.5,y:0.6},0).wait(1).to({scaleX:0.4398,scaleY:0.4398,rotation:101.7579,x:0.4,y:0.55},0).wait(1).to({scaleX:0.4375,scaleY:0.4375,rotation:104.3019,x:0.35},0).wait(1).to({scaleX:0.4351,scaleY:0.4351,rotation:106.8458,x:0.25},0).wait(1).to({scaleX:0.4328,scaleY:0.4328,rotation:109.3898,x:0.2,y:0.5},0).wait(1).to({scaleX:0.4304,scaleY:0.4304,rotation:111.9337,x:0.1,y:0.45},0).wait(1).to({scaleX:0.428,scaleY:0.428,rotation:114.4777},0).wait(1).to({scaleX:0.4257,scaleY:0.4257,rotation:117.0216,x:0,y:0.35},0).wait(1).to({scaleX:0.4233,scaleY:0.4233,rotation:119.5656,x:-0.05},0).wait(1).to({scaleX:0.421,scaleY:0.421,rotation:122.1095,y:0.3},0).wait(1).to({scaleX:0.4186,scaleY:0.4186,rotation:124.6535,x:-0.1,y:0.25},0).wait(1).to({scaleX:0.4162,scaleY:0.4162,rotation:127.1974,x:-0.2,y:0.2},0).wait(1).to({scaleX:0.4139,scaleY:0.4139,rotation:129.7414,y:0.15},0).wait(1).to({scaleX:0.4115,scaleY:0.4115,rotation:132.2853,x:-0.25},0).wait(1).to({scaleX:0.4092,scaleY:0.4092,rotation:134.8293,x:-0.3,y:0.05},0).wait(1).to({scaleX:0.4068,scaleY:0.4068,rotation:137.3732,y:-0.05},0).wait(1).to({scaleX:0.4045,scaleY:0.4045,rotation:139.9172,x:-0.4,y:-0.1},0).wait(1).to({scaleX:0.4021,scaleY:0.4021,rotation:142.4611,x:-0.45,y:-0.2},0).wait(1).to({scaleX:0.3997,scaleY:0.3997,rotation:145.0051,y:-0.25},0).wait(1).to({scaleX:0.3974,scaleY:0.3974,rotation:147.549,x:-0.5,y:-0.3},0).wait(1));

	// bigStar
	this.instance_2 = new lib.Path_1();
	this.instance_2.setTransform(0.8,-1.05,0.3313,0.3313,0,0,0,364.4,366.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:368.5,regY:368,scaleX:0.3333,scaleY:0.3333,rotation:-3.0648,x:2.15,y:-0.7},0).wait(1).to({scaleX:0.3354,scaleY:0.3354,rotation:-6.1296,y:-0.8},0).wait(1).to({scaleX:0.3374,scaleY:0.3374,rotation:-9.1943,x:2.2,y:-0.85},0).wait(1).to({scaleX:0.3394,scaleY:0.3394,rotation:-12.2591,y:-0.95},0).wait(1).to({scaleX:0.3414,scaleY:0.3414,rotation:-15.3239,x:2.25,y:-1},0).wait(1).to({scaleX:0.3435,scaleY:0.3435,rotation:-18.3887,y:-1.05},0).wait(1).to({scaleX:0.3455,scaleY:0.3455,rotation:-21.4534,y:-1.2},0).wait(1).to({scaleX:0.3475,scaleY:0.3475,rotation:-24.5182,y:-1.25},0).wait(1).to({scaleX:0.3495,scaleY:0.3495,rotation:-27.583,y:-1.35},0).wait(1).to({scaleX:0.3516,scaleY:0.3516,rotation:-30.6478,y:-1.45},0).wait(1).to({scaleX:0.3536,scaleY:0.3536,rotation:-33.7125,x:2.2},0).wait(1).to({scaleX:0.3556,scaleY:0.3556,rotation:-36.7773,y:-1.6},0).wait(1).to({scaleX:0.3576,scaleY:0.3576,rotation:-39.8421,y:-1.65},0).wait(1).to({scaleX:0.3597,scaleY:0.3597,rotation:-42.9069,x:2.1,y:-1.7},0).wait(1).to({scaleX:0.3617,scaleY:0.3617,rotation:-45.9716,x:2.15,y:-1.85},0).wait(1).to({scaleX:0.3637,scaleY:0.3637,rotation:-49.0364,x:2.05,y:-1.9},0).wait(1).to({scaleX:0.3657,scaleY:0.3657,rotation:-52.1012,y:-2},0).wait(1).to({scaleX:0.3678,scaleY:0.3678,rotation:-55.166,x:2,y:-2.1},0).wait(1).to({scaleX:0.3698,scaleY:0.3698,rotation:-58.2307,x:1.95,y:-2.15},0).wait(1).to({scaleX:0.3718,scaleY:0.3718,rotation:-61.2955,x:1.9,y:-2.2},0).wait(1).to({scaleX:0.3738,scaleY:0.3738,rotation:-64.3603,x:1.8,y:-2.3},0).wait(1).to({scaleX:0.3759,scaleY:0.3759,rotation:-67.4251,x:1.75,y:-2.35},0).wait(1).to({scaleX:0.3779,scaleY:0.3779,rotation:-70.4898,x:1.7},0).wait(1).to({scaleX:0.3799,scaleY:0.3799,rotation:-73.5546,y:-2.4},0).wait(1).to({scaleX:0.3819,scaleY:0.3819,rotation:-76.6194,x:1.6,y:-2.5},0).wait(1).to({scaleX:0.384,scaleY:0.384,rotation:-79.6842,x:1.5,y:-2.55},0).wait(1).to({scaleX:0.386,scaleY:0.386,rotation:-82.7489,x:1.45,y:-2.6},0).wait(1).to({scaleX:0.388,scaleY:0.388,rotation:-85.8137,x:1.35,y:-2.65},0).wait(1).to({scaleX:0.39,scaleY:0.39,rotation:-88.8785,x:1.25},0).wait(1).to({scaleX:0.392,scaleY:0.392,rotation:-91.9433,x:1.2,y:-2.7},0).wait(1).to({scaleX:0.3898,scaleY:0.3898,rotation:-95.0081,x:1.1,y:-2.65},0).wait(1).to({scaleX:0.3875,scaleY:0.3875,rotation:-98.0728,x:1},0).wait(1).to({scaleX:0.3853,scaleY:0.3853,rotation:-101.1376,x:0.95,y:-2.7},0).wait(1).to({scaleX:0.3831,scaleY:0.3831,rotation:-104.2024,x:0.8},0).wait(1).to({scaleX:0.3808,scaleY:0.3808,rotation:-107.2672,x:0.75,y:-2.65},0).wait(1).to({scaleX:0.3786,scaleY:0.3786,rotation:-110.3319,x:0.65},0).wait(1).to({scaleX:0.3763,scaleY:0.3763,rotation:-113.3967,x:0.6},0).wait(1).to({scaleX:0.3741,scaleY:0.3741,rotation:-116.4615,x:0.55},0).wait(1).to({scaleX:0.3718,scaleY:0.3718,rotation:-119.5263,x:0.45,y:-2.6},0).wait(1).to({scaleX:0.3696,scaleY:0.3696,rotation:-122.591,x:0.35,y:-2.55},0).wait(1).to({scaleX:0.3673,scaleY:0.3673,rotation:-125.6558,x:0.3},0).wait(1).to({scaleX:0.3651,scaleY:0.3651,rotation:-128.7206,x:0.2,y:-2.5},0).wait(1).to({scaleX:0.3628,scaleY:0.3628,rotation:-131.7854,x:0.1,y:-2.45},0).wait(1).to({scaleX:0.3606,scaleY:0.3606,rotation:-134.8501,x:0.05,y:-2.35},0).wait(1).to({scaleX:0.3583,scaleY:0.3583,rotation:-137.9149,x:-0.1},0).wait(1).to({scaleX:0.3561,scaleY:0.3561,rotation:-140.9797,y:-2.3},0).wait(1).to({scaleX:0.3538,scaleY:0.3538,rotation:-144.0445,x:-0.2,y:-2.25},0).wait(1).to({scaleX:0.3516,scaleY:0.3516,rotation:-147.1092,x:-0.25,y:-2.2},0).wait(1).to({scaleX:0.3493,scaleY:0.3493,rotation:-150.174,y:-2.05},0).wait(1).to({scaleX:0.3471,scaleY:0.3471,rotation:-153.2388,x:-0.35},0).wait(1).to({scaleX:0.3448,scaleY:0.3448,rotation:-156.3036,y:-1.95},0).wait(1).to({scaleX:0.3426,scaleY:0.3426,rotation:-159.3683,x:-0.45},0).wait(1).to({scaleX:0.3403,scaleY:0.3403,rotation:-162.4331,x:-0.4,y:-1.85},0).wait(1).to({scaleX:0.3381,scaleY:0.3381,rotation:-165.4979,x:-0.45,y:-1.8},0).wait(1).to({scaleX:0.3358,scaleY:0.3358,rotation:-168.5627,x:-0.5,y:-1.75},0).wait(1).to({scaleX:0.3336,scaleY:0.3336,rotation:-171.6274,x:-0.55,y:-1.65},0).wait(1).to({scaleX:0.3313,scaleY:0.3313,rotation:-174.6922,x:-0.5,y:-1.55},0).wait(1).to({scaleX:0.3291,scaleY:0.3291,rotation:-177.757,y:-1.5},0).wait(1));

	// circles
	this.instance_3 = new lib.Symbol2();
	this.instance_3.setTransform(0.9,-1.1,1,1,0,0,0,109.5,204.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({scaleX:1.0017,scaleY:1.0017,x:0.95,y:-1.05},0).wait(1).to({scaleX:1.0034,scaleY:1.0034,x:0.9},0).wait(1).to({scaleX:1.0051,scaleY:1.0051},0).wait(1).to({scaleX:1.0067,scaleY:1.0067,x:0.95},0).wait(1).to({scaleX:1.0084,scaleY:1.0084,x:0.9,y:-1.1},0).wait(1).to({scaleX:1.0101,scaleY:1.0101},0).wait(1).to({scaleX:1.0118,scaleY:1.0118,x:0.95},0).wait(1).to({scaleX:1.0135,scaleY:1.0135,x:0.9},0).wait(1).to({scaleX:1.0152,scaleY:1.0152},0).wait(1).to({scaleX:1.0168,scaleY:1.0168,x:0.95,y:-1.05},0).wait(1).to({scaleX:1.0185,scaleY:1.0185},0).wait(1).to({scaleX:1.0202,scaleY:1.0202,x:0.9},0).wait(1).to({scaleX:1.0219,scaleY:1.0219,x:0.95},0).wait(1).to({scaleX:1.0236,scaleY:1.0236,y:-1.1},0).wait(1).to({scaleX:1.0253,scaleY:1.0253,x:0.9},0).wait(1).to({scaleX:1.0269,scaleY:1.0269,x:0.95},0).wait(1).to({scaleX:1.0286,scaleY:1.0286},0).wait(1).to({scaleX:1.0303,scaleY:1.0303,x:0.9},0).wait(1).to({scaleX:1.032,scaleY:1.032,y:-1.05},0).wait(1).to({scaleX:1.0337,scaleY:1.0337,x:0.95},0).wait(1).to({scaleX:1.0354,scaleY:1.0354,x:0.9},0).wait(1).to({scaleX:1.037,scaleY:1.037},0).wait(1).to({scaleX:1.0387,scaleY:1.0387,x:0.95,y:-1.1},0).wait(1).to({scaleX:1.0404,scaleY:1.0404,x:0.9},0).wait(1).to({scaleX:1.0421,scaleY:1.0421},0).wait(1).to({scaleX:1.0438,scaleY:1.0438,x:0.95},0).wait(1).to({scaleX:1.0455,scaleY:1.0455},0).wait(1).to({scaleX:1.0471,scaleY:1.0471,x:0.9,y:-1.05},0).wait(1).to({scaleX:1.0488,scaleY:1.0488,x:0.95},0).wait(1).to({scaleX:1.0505,scaleY:1.0505},0).wait(1).to({scaleX:1.0487,scaleY:1.0487,y:-1.1},0).wait(1).to({scaleX:1.0469,scaleY:1.0469,y:-1.05},0).wait(1).to({scaleX:1.0451,scaleY:1.0451},0).wait(1).to({scaleX:1.0433,scaleY:1.0433,y:-1.1},0).wait(1).to({scaleX:1.0415,scaleY:1.0415,y:-1.05},0).wait(1).to({scaleX:1.0397,scaleY:1.0397,y:-1.1},0).wait(1).to({scaleX:1.0379,scaleY:1.0379},0).wait(1).to({scaleX:1.0361,scaleY:1.0361,y:-1.05},0).wait(1).to({scaleX:1.0343,scaleY:1.0343,x:0.9,y:-1.1},0).wait(1).to({scaleX:1.0325,scaleY:1.0325,y:-1.05},0).wait(1).to({scaleX:1.0307,scaleY:1.0307,y:-1.1},0).wait(1).to({scaleX:1.0289,scaleY:1.0289},0).wait(1).to({scaleX:1.0271,scaleY:1.0271,y:-1.05},0).wait(1).to({scaleX:1.0253,scaleY:1.0253,y:-1.1},0).wait(1).to({scaleX:1.0235,scaleY:1.0235,y:-1.05},0).wait(1).to({scaleX:1.0216,scaleY:1.0216},0).wait(1).to({scaleX:1.0198,scaleY:1.0198,y:-1.1},0).wait(1).to({scaleX:1.018,scaleY:1.018,y:-1.05},0).wait(1).to({scaleX:1.0162,scaleY:1.0162,x:0.95,y:-1.1},0).wait(1).to({scaleX:1.0144,scaleY:1.0144},0).wait(1).to({scaleX:1.0126,scaleY:1.0126,y:-1.05},0).wait(1).to({scaleX:1.0108,scaleY:1.0108,y:-1.1},0).wait(1).to({scaleX:1.009,scaleY:1.009,y:-1.05},0).wait(1).to({scaleX:1.0072,scaleY:1.0072,y:-1.1},0).wait(1).to({scaleX:1.0054,scaleY:1.0054},0).wait(1).to({scaleX:1.0036,scaleY:1.0036,y:-1.05},0).wait(1).to({scaleX:1.0018,scaleY:1.0018,y:-1.1},0).wait(1).to({scaleX:1,scaleY:1,x:0.9},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-188.8,-216,379.8,429.9);


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
	this.instance_7.setTransform(-30.2,91.05,0.9955,0.9955,3.9262,0,0,1.4,-41.6);

	this.instance_8 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_8.setTransform(-41.75,185.65,0.9949,0.9949,20.9078,0,0,1.1,-51.4);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4.7,regY:-21.9,rotation:1.7768,x:-10,y:49}},{t:this.instance_14,p:{rotation:85.6856,x:48.55,y:-20.65,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:87.6218,x:54.4,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:146.8778,x:66.3,y:135.05,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:127.076,x:62.85,y:135.65,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-50.9,rotation:-0.4113,x:34.4,y:185.15,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:-6.7843,x:-4.25,y:-59.75}},{t:this.instance_8,p:{rotation:20.9078,x:-41.75,y:185.65,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9262,x:-30.2,y:91.05}},{t:this.instance_6,p:{regX:0.2,regY:4.8,rotation:-8.9634,x:24.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.9981,scaleY:0.9981,rotation:-3.8906,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-83.4059,x:-78.85,y:57.25,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-89.6344,x:-96.6,y:141.55,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9969,scaleY:0.9969,rotation:-109.0268,x:-96.15,y:141.65}},{t:this.instance,p:{regY:9.9,scaleX:0.9974,scaleY:0.9974,rotation:-76.5654,y:-12.45,regX:33.4,x:-59.4}}]}).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.6756,x:48.5,y:-20.7,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.4707,x:54.45,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:146.3919,x:66.45,y:134.95,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:126.0178,x:63.15,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4104,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7758,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.6503,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:8,rotation:-83.5671,x:-78.8,y:57.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-89.7957,x:-96.65,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.1871,x:-95.95,y:141.75}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-76.3922,y:-12.5,regX:33.4,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.665,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.3189,x:54.55,regY:12.1,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:145.9057,x:66.8,y:134.9,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:124.9595,x:63.4,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4104,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.767,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.4107,x:-6,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-83.7286,x:-79.15,y:57.25,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-89.957,x:-96.6,y:141.5,scaleX:0.9971,scaleY:0.9971,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.3489,x:-95.95,y:141.75}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-76.218,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.6536,x:48.55,y:-20.65,scaleX:0.9975,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.1679,x:54.45,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:145.4207,x:67,y:134.9,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:123.9005,x:63.6,y:135.65,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4104,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7591,x:-4.25,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.1711,x:-6.05,y:-81.3}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-83.8916,x:-79.35,y:57.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.1149,x:-96.45,y:141.45,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-109.5098,x:-95.95,y:141.65}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-76.0429,y:-12.6,regX:33.4,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.643,x:48.55,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.0152,x:54.5,regY:12.2,regX:-45.5,y:49.4}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:144.9336,x:67.2,y:134.9,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:122.8419,x:63.85,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7504,x:-4.25,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.9316,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:8,rotation:-84.0514,x:-79.45,y:57.05,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.2762,x:-96.45,y:141.45,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.6718,x:-95.85,y:141.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.8685,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.6307,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.8633,x:54.45,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:144.4487,x:67.45,y:134.8,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:121.7841,x:64.15,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7416,x:-4.25,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.6914,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.2142,x:-79.8,y:57.05,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-90.4384,x:-96.5,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-109.8326,x:-95.9,y:141.65}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.6939,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.6202,x:48.45,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.7122,x:54.5,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:143.9617,x:67.75,y:134.75,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:120.7255,x:64.25,y:135.65,regX:-10,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7345,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.4537,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:8,rotation:-84.3747,x:-79.85,y:57.05,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-90.5988,x:-96.45,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.9949,x:-95.8,y:141.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.52,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.6088,x:48.45,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.5594,x:54.45,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:143.4762,x:67.9,y:134.8,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:119.6672,x:64.55,y:135.5,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7257,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.2134,x:-6,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.5368,x:-80.25,y:56.9,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.761,x:-96.35,y:141.4,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.1559,x:-95.8,y:141.55}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.3461,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5982,x:48.45,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.4084,x:54.5,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:142.9898,x:68.2,y:134.7,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:118.6091,x:64.85,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7177,x:-4.2,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.9732,x:-6,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.6988,x:-80.4,y:56.8,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-90.9224,x:-96.3,y:141.4,scaleX:0.9971,scaleY:0.9971,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-110.3174,x:-95.75,y:141.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.1713,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5868,x:48.55,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.2564,x:54.55,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:142.5036,x:68.4,y:134.65,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:117.5506,x:65.15,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7088,x:-4.2,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.7348,x:-5.95,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.8608,x:-80.65,y:56.75,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-91.0846,x:-96.4,y:141.35,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.4795,x:-95.75,y:141.55}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.9978,y:-12.5,regX:33.3,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5771,x:48.55,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.1044,x:54.5,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:142.0173,x:68.7,y:134.55,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:116.4913,x:65.35,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7008,x:-4.2,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.4938,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.021,x:-80.85,y:56.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.2469,x:-96.4,y:141.4,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.6404,x:-95.7,y:141.5}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.8228,y:-12.55,regX:33.4,x:-59.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5657,x:48.5,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.9524,x:54.55,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:141.5321,x:68.85,y:134.6,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:115.4335,x:65.55,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6921,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.2546,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.1821,x:-81.1,y:56.6,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.4073,x:-96.2,y:141.3,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.8017,x:-95.7,y:141.45}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.6492,y:-12.35,regX:33.2,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5551,x:48.5,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.8019,x:54.55,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:141.0461,x:69.15,y:134.55,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:114.3754,x:65.8,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4096,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6842,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.0154,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.3441,x:-81.25,y:56.55,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.5687,x:-96.15,y:141.3,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-110.9641,x:-95.6,y:141.6}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.4746,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5437,x:48.4,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.649,x:54.55,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:140.5599,x:69.3,y:134.6,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:113.3157,x:66.15,y:135.5,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6745,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.7762,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-85.5051,x:-81.45,y:56.35,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.731,x:-96.25,y:141.3,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.1257,x:-95.6,y:141.4}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.3006,y:-12.4,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5331,x:48.35,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.4977,x:54.55,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:140.0742,x:69.65,y:134.55,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:112.2575,x:66.35,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6666,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:-0.5353,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.6677,x:-81.7,y:56.4,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-91.8924,x:-96.2,y:141.25,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.2867,x:-95.55,y:141.4}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.1258,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5217,x:48.35,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.3456,x:54.55,regY:12.2,regX:-45.5,y:49.35}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:139.5887,x:69.85,y:134.5,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:111.1992,x:66.65,y:135.5,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6577,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.2961,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.8286,x:-81.9,y:56.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.0538,x:-96.05,y:141.2,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.4475,x:-95.55,y:141.5}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-73.9515,y:-12.45,regX:33.3,x:-59.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.5112,x:48.35,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.1943,x:54.75,regY:12.1,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:139.1024,x:70.05,y:134.4,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:110.141,x:66.75,y:135.45,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6498,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.0561,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.9905,x:-82.1,y:56.35,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.2152,x:-96,y:141.2,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.6089,x:-95.5,y:141.45}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-73.7762,y:-12.5,regX:33.3,x:-59.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.05,y:49.05}},{t:this.instance_14,p:{rotation:85.4997,x:48.35,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.0421,x:54.6,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:138.617,x:70.35,y:134.4,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:109.0817,x:67.1,y:135.45,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6417,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.1778,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.1522,x:-82.35,y:56.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.3767,x:-96.15,y:141.15,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.77,x:-95.5,y:141.3}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.6028,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4892,x:48.45,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.8907,x:54.7,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:138.1306,x:70.45,y:134.35,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:108.0242,x:67.25,y:135.45,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6339,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.4179,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-86.3147,x:-82.55,y:56.05,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-92.5391,x:-96.05,y:141.1,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.932,x:-95.45,y:141.35}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.4283,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4769,x:48.45,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.7383,x:54.75,regY:12.1,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:137.6444,x:70.85,y:134.3,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:106.965,x:67.45,y:135.35,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6251,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9071,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.6579,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.4745,x:-82.75,y:56.1,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-92.6997,x:-95.95,y:141.05,scaleX:0.9971,scaleY:0.9971,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-112.0946,x:-95.35,y:141.35}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.2544,y:-12.4,regX:33.2,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4663,x:48.5,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.586,x:54.65,regY:12.2,regX:-45.5,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:137.1585,x:71.1,y:134.3,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:105.907,x:67.75,y:135.4,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4087,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6163,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.8971,x:-5.9,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.638,x:-82.95,y:56.05,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.862,x:-95.9,y:141.05,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.2547,x:-95.4,y:141.15}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.0794,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4549,x:48.45,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.4345,x:54.65,regY:12.2,regX:-45.5,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:136.6727,x:71.25,y:134.2,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:104.8481,x:68.05,y:135.4,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6084,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.1363,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.7978,x:-83.15,y:55.95,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.0227,x:-96.05,y:141,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.4167,x:-95.35,y:141.05}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.9053,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4443,x:48.4,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.2821,x:54.65,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:136.187,x:71.5,y:134.1,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:103.7904,x:68.3,y:135.4,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5996,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:1.3764,x:-5.8,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.9611,x:-83.4,y:55.85,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.1851,x:-95.95,y:140.95,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.5775,x:-95.3,y:141.1}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.7309,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4329,x:48.5,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.1314,x:54.7,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:135.6995,x:71.8,y:134.1,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:102.7306,x:68.55,y:135.5,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5925,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.6148,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.121,x:-83.6,y:55.85,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.3459,x:-95.95,y:140.9,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.7399,x:-95.25,y:141.05}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.5564,y:-12.5,regX:33.3,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4241,x:48.5,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.979,x:54.7,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:135.2139,x:72,y:134,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:101.6726,x:68.7,y:135.45,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5827,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.8549,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.2842,x:-83.8,y:55.75,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-93.5093,x:-95.75,y:140.9,scaleX:0.9971,scaleY:0.9971,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.9,x:-95.25,y:141}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.3818,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4127,x:48.5,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.8274,x:54.7,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:134.7278,x:72.2,y:133.95,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:100.6146,x:69,y:135.35,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5739,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.0951,x:-5.85,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.4449,x:-84,y:55.65,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.67,x:-95.85,y:140.85,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.0626,x:-95.25,y:141}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.2077,y:-12.4,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4021,x:48.5,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.6756,x:54.7,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:134.2428,x:72.45,y:133.95,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:99.5565,x:69.3,y:135.25,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5651,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.3344,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.6055,x:-84.25,y:55.55,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.8308,x:-95.8,y:140.8,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.2237,x:-95.15,y:140.95}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.0327,y:-12.55,regX:33.3,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3907,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.5239,x:54.75,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:133.7566,x:72.75,y:133.95,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:98.4988,x:69.5,y:135.4,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5572,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.5738,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.767,x:-84.4,y:55.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.9934,x:-95.75,y:140.75,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.3852,x:-95.15,y:140.85}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.8592,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3801,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.3729,x:54.7,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:133.2696,x:72.95,y:133.85,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:97.4389,x:69.75,y:135.3,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4078,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5484,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.8124,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.9285,x:-84.6,y:55.45,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.1543,x:-95.8,y:140.7,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.547,x:-95.1,y:140.85}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-71.684,y:-12.45,regX:33.3,x:-59.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3687,x:48.55,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.2202,x:54.75,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:132.785,x:73.25,y:133.75,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:96.3807,x:69.95,y:135.4,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5413,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.0527,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.0907,x:-84.85,y:55.35,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.3169,x:-95.7,y:140.8,scaleX:0.9971,scaleY:0.9971,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.7076,x:-95.1,y:140.8}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.5102,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3581,x:48.55,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.0683,x:54.75,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:132.2985,x:73.4,y:133.7,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.9969,rotation:95.321,x:70.3,y:135.15,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5325,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.2931,x:-5.95,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.2513,x:-85,y:55.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.477,x:-95.65,y:140.75,scaleX:0.9971,scaleY:0.9971,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.8702,x:-95,y:140.75}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.3361,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3467,x:48.5,y:-20.7,scaleX:0.9975,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:82.9164,x:54.9,regY:12.1,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:131.8128,x:73.65,y:133.75,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:94.2632,x:70.5,y:135.15,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5236,x:-3.95,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.5318,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.4136,x:-85.25,y:55.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.6404,x:-95.6,y:140.65,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-114.0308,x:-95,y:140.65}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.1614,y:-12.6,regX:33.4,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3362,x:48.5,y:-20.7,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:82.7645,x:54.9,regY:12.1,regX:-45.5,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:131.3252,x:73.9,y:133.65,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:93.206,x:70.7,y:135.2,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5157,x:-3.95,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.7715,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.575,x:-85.45,y:55.1,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.8016,x:-95.55,y:140.65,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-114.1933,x:-94.9,y:140.65}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-70.9873,y:-12.45,regX:33.3,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3238,x:48.5,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:82.6142,x:54.85,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:130.8416,x:74.15,y:133.65,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:92.1464,x:71,y:135.15,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4069,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.507,x:-3.95,y:-59.75}},{t:this.instance_8,p:{rotation:20.9074,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.923,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9631,x:24.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:4.0103,x:-5.8,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.7364,x:-85.65,y:55.05,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.9625,x:-95.55,y:140.55,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-114.3539,x:-94.95,y:140.6}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-70.8126,y:-12.35,regX:33.2,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7725,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3432,x:48.5,y:-20.7,scaleX:0.9975,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:82.7573,x:54.8,regY:12.2,regX:-45.5,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:131.2929,x:73.85,y:133.65,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:93.1314,x:70.75,y:135.2,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4104,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5175,x:-3.95,y:-59.75}},{t:this.instance_8,p:{rotation:20.9146,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9685,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.7811,x:-5.85,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.5908,x:-85.5,y:55.15,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.82,x:-95.55,y:140.55,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-114.2133,x:-94.95,y:140.6}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-70.9818,y:-12.5,regX:33.3,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7707,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3608,x:48.55,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:82.9014,x:54.9,regY:12.1,regX:-45.5,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:131.7458,x:73.65,y:133.65,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:94.1164,x:70.4,y:135.15,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4157,x:34.45,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5282,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9232,x:-41.7,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9275,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9729,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.5529,x:-5.9,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.446,x:-85.25,y:55.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.6775,x:-95.55,y:140.7,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-114.0724,x:-94.95,y:140.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.1542,y:-12.6,regX:33.4,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.769,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.3784,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.0454,x:54.7,regY:12.2,regX:-45.6,y:49.1}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:132.1979,x:73.4,y:133.7,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:95.1026,x:70.25,y:135.2,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4201,x:34.45,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5395,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9316,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9301,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9792,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.3238,x:-5.85,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.3004,x:-85.05,y:55.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.5323,x:-95.6,y:140.65,scaleX:0.9971,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.9327,x:-95,y:140.75}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.3239,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7672,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.396,x:48.5,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.1903,x:54.65,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:132.6504,x:73.25,y:133.8,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:96.0869,x:70.05,y:135.35,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4254,x:34.4,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5484,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9399,x:-41.7,y:185.6,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9327,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9845,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:3.0939,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-88.1557,x:-84.85,y:55.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.3899,x:-95.6,y:140.85,scaleX:0.9971,scaleY:0.9971,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.7909,x:-95,y:140.8}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.4946,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7655,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4135,x:48.5,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.3341,x:54.65,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:133.1021,x:72.95,y:133.85,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:97.0712,x:69.8,y:135.25,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4307,x:34.35,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5589,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9485,x:-41.7,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9345,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9907,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.865,x:-5.85,y:-81.15}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-88.01,x:-84.65,y:55.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.2474,x:-95.65,y:140.75,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.6511,x:-95,y:140.85}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.6646,y:-12.4,regX:33.2,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7646,x:-10.1,y:49.05}},{t:this.instance_14,p:{rotation:85.4311,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.4789,x:54.65,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:133.5562,x:72.75,y:133.9,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:98.0567,x:69.55,y:135.3,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4351,x:34.35,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5696,x:-4,y:-59.75}},{t:this.instance_8,p:{rotation:20.9561,x:-41.7,y:185.55,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.937,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-8.9961,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.6361,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.8653,x:-84.45,y:55.5,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-94.1024,x:-95.6,y:140.75,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.5105,x:-95.05,y:140.9}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-71.8353,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7637,x:-10.1,y:48.95}},{t:this.instance_14,p:{rotation:85.4479,x:48.35,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.6236,x:54.65,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:134.0078,x:72.5,y:133.9,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:99.0428,x:69.1,y:135.4,regX:-10,regY:11.1}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4403,x:34.4,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5801,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.965,x:-41.7,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9398,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0023,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.4063,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-87.7197,x:-84.25,y:55.45,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.9609,x:-95.65,y:140.8,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.3698,x:-95.05,y:140.95}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.0061,y:-12.55,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.8,rotation:1.7611,x:-10.1,y:49.1}},{t:this.instance_14,p:{rotation:85.4654,x:48.45,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.7683,x:54.6,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:134.4605,x:72.25,y:133.95,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:100.0265,x:69.1,y:135.3,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4447,x:34.4,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5925,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.973,x:-41.7,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9424,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0085,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:2.1766,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.5748,x:-84.05,y:55.6,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.8168,x:-95.7,y:140.85,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.2296,x:-95.05,y:140.95}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.1763,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7593,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.4839,x:48.45,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:83.913,x:54.65,regY:12.2,regX:-45.5,y:49.35}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:134.9126,x:72.05,y:134,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:101.0127,x:68.85,y:135.35,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4491,x:34.45,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6022,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9814,x:-41.75,y:185.55,scaleX:0.9949,scaleY:0.9949,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9451,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0139,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.9469,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-87.43,x:-83.85,y:55.6,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.6744,x:-95.7,y:140.95,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-113.0881,x:-95.1,y:141}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.3468,y:-12.35,regX:33.2,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7576,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.5023,x:48.45,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.0565,x:54.6,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:135.3652,x:71.85,y:134,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:101.998,x:68.6,y:135.35,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4544,x:34.4,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6136,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:20.9895,x:-41.75,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9468,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0201,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.719,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.2852,x:-83.65,y:55.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.5312,x:-95.6,y:140.95,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.9482,x:-95.1,y:141}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.5182,y:-12.55,regX:33.4,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7558,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.52,x:48.35,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.2019,x:54.55,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:135.8186,x:71.5,y:134.2,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:102.9825,x:68.3,y:135.5,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4588,x:34.55,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6233,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:20.9978,x:-41.75,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9494,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0264,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:1.4886,x:-5.8,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-87.1385,x:-83.45,y:55.9,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.3872,x:-95.7,y:141,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.8071,x:-95.15,y:141.05}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-72.6876,y:-12.5,regX:33.4,x:-59.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.755,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.5376,x:48.35,y:-20.75,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.3455,x:54.55,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:136.2701,x:71.3,y:134.15,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:103.9665,x:68.1,y:135.55,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4632,x:34.55,y:185,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6339,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:21.0062,x:-41.7,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9521,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0318,x:24.35,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:1.2598,x:-5.85,y:-81.15}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.9936,x:-83.2,y:55.9,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.2449,x:-95.75,y:141,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.6668,x:-95.15,y:141.1}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-72.8584,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7532,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.5551,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.4901,x:54.55,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:136.7242,x:71.1,y:134.2,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:104.9517,x:67.85,y:135.4,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4685,x:34.55,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6437,x:-4.05,y:-59.75}},{t:this.instance_8,p:{rotation:21.0148,x:-41.75,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9548,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0371,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:1.0294,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.8478,x:-83,y:56.05,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-93.1009,x:-95.75,y:141.1,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.526,x:-95.05,y:141.15}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.0273,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7515,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.5736,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.6336,x:54.55,regY:12.2,regX:-45.5,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:137.1752,x:70.9,y:134.3,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:105.9372,x:67.55,y:135.45,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4729,x:34.65,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6533,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:21.0228,x:-41.75,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9574,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0425,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.8016,x:-5.95,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.7029,x:-82.85,y:56.1,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.9586,x:-95.8,y:141.1,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.3856,x:-95.15,y:141.15}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.1995,y:-12.5,regX:33.3,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7497,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.5903,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.7779,x:54.5,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:137.6277,x:70.65,y:134.3,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:106.922,x:67.3,y:135.45,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.4781,x:34.6,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6638,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:21.0318,x:-41.75,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9591,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0487,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.5712,x:-5.9,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-86.558,x:-82.6,y:56,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-92.8156,x:-95.7,y:141.15,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.246,x:-95.15,y:141.2}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.3681,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.748,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.6079,x:48.4,y:-20.65,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.9215,x:54.65,regY:12.1,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:138.0809,x:70.35,y:134.35,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:107.9072,x:67.15,y:135.5,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4825,x:34.45,y:185,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6745,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:21.0393,x:-41.75,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9617,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0559,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.3425,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.4131,x:-82.4,y:56.2,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-92.6716,x:-95.8,y:141.15,scaleX:0.9971,scaleY:0.9971,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-112.106,x:-95.15,y:141.25}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.5398,y:-12.45,regX:33.3,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7462,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.6254,x:48.4,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.0667,x:54.6,regY:12.1,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:138.5325,x:70.1,y:134.45,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:108.8934,x:66.85,y:135.45,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4869,x:34.5,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6858,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:21.0476,x:-41.75,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9643,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0612,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:0.113,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.9,regY:7.9,rotation:-86.2672,x:-82.2,y:56.1,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.5285,x:-95.85,y:141.25,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.9651,x:-95.15,y:141.45}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.7098,y:-12.5,regX:33.4,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7453,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.6439,x:48.55,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.2111,x:54.45,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:138.9862,x:69.95,y:134.35,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:109.8777,x:66.65,y:135.5,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4922,x:34.5,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.6966,x:-4.1,y:-59.75}},{t:this.instance_8,p:{rotation:21.0563,x:-41.85,y:185.65,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9671,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0675,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.1113,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-86.1222,x:-82,y:56.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.3846,x:-95.85,y:141.25,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.8234,x:-95.2,y:141.4}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-73.8802,y:-12.4,regX:33.2,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7436,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.6624,x:48.55,y:-20.7,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.3553,x:54.45,regY:12.2,regX:-45.5,y:49.4}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:139.4382,x:69.8,y:134.4,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:110.863,x:66.45,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.4966,x:34.55,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7071,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:21.0646,x:-41.8,y:185.7,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9688,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0728,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.3408,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.9772,x:-81.8,y:56.45,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.2425,x:-95.8,y:141.3,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.6825,x:-95.2,y:141.55}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.0509,y:-12.55,regX:33.4,x:-59.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7419,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.6799,x:48.5,y:-20.7,scaleX:0.9974,scaleY:0.9974,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.4995,x:54.4,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:139.8899,x:69.4,y:134.5,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:111.8477,x:66.1,y:135.45,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5001,x:34.5,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7177,x:-4.15,y:-59.75}},{t:this.instance_8,p:{rotation:21.0729,x:-41.8,y:185.7,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9715,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0782,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.5694,x:-5.95,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.8313,x:-81.6,y:56.45,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-92.0994,x:-95.75,y:141.3,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.5428,x:-95.2,y:141.6}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.2207,y:-12.5,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7401,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.6967,x:48.4,y:-20.65,scaleX:0.9975,scaleY:0.9975,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.6437,x:54.4,regY:12.2,regX:-45.6,y:49.15}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:140.3425,x:69.2,y:134.45,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:112.832,x:65.95,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5054,x:34.55,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7283,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.0816,x:-41.85,y:185.7,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.974,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0835,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-0.7998,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.6862,x:-81.4,y:56.55,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.9555,x:-95.9,y:141.35,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-111.4022,x:-95.2,y:141.6}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.3917,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7384,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.7142,x:48.4,y:-20.65,scaleX:0.9975,scaleY:0.9975,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.7888,x:54.35,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:140.7954,x:69,y:134.6,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:113.8175,x:65.65,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5098,x:34.6,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7388,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.0899,x:-41.85,y:185.7,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9767,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0896,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.0294,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.5411,x:-81.15,y:56.55,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-91.8134,x:-95.9,y:141.4,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.2615,x:-95.25,y:141.5}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.5629,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7366,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.7327,x:48.55,y:-20.75,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.9321,x:54.3,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:141.2482,x:68.85,y:134.7,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:114.8035,x:65.4,y:135.55,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5142,x:34.65,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7486,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:21.0985,x:-41.85,y:185.7,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9794,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.0967,x:24.4,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.2581,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.3969,x:-80.95,y:56.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.6687,x:-95.95,y:141.4,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.1201,x:-95.3,y:141.6}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-74.7328,y:-12.5,regX:33.3,x:-59.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7366,x:-10.1,y:49}},{t:this.instance_14,p:{rotation:85.7494,x:48.55,y:-20.75,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.0771,x:54.3,regY:12.2,regX:-45.5,y:49.4}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:141.7012,x:68.5,y:134.6,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:115.7881,x:65.15,y:135.65,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5194,x:34.7,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7591,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:21.1069,x:-41.8,y:185.65,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9812,x:-30.2,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.102,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.4868,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-85.2507,x:-80.75,y:56.75,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-91.5266,x:-95.8,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-110.9794,x:-95.25,y:141.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-74.9036,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7349,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.767,x:48.55,y:-20.8,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.2203,x:54.3,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:142.1528,x:68.25,y:134.7,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:116.7725,x:64.85,y:135.5,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5238,x:34.7,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7698,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1144,x:-41.8,y:185.65,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9838,x:-30.1,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1082,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.5,scaleX:0.998,scaleY:0.998,rotation:-1.7173,x:-5.85,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:8,rotation:-85.1064,x:-80.45,y:56.85,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-91.3837,x:-95.8,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-110.8392,x:-95.3,y:141.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.0733,y:-12.55,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7331,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.7837,x:48.55,y:-20.75,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.3653,x:54.25,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:142.6055,x:68.05,y:134.8,regX:-7.3,regY:13.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:117.7578,x:64.7,y:135.7,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5291,x:34.7,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7804,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1233,x:-41.85,y:185.65,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9864,x:-30.1,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1134,x:24.45,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-1.9452,x:-6.05,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.9603,x:-80.35,y:56.85,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-91.2407,x:-95.95,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.6984,x:-95.35,y:141.6}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.2447,y:-12.4,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7313,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.803,x:48.45,y:-20.8,scaleX:0.9975,scaleY:0.9975,regY:13.2,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.5094,x:54.3,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:143.0582,x:67.7,y:134.85,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:118.7422,x:64.45,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5335,x:34.8,y:184.95,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.7908,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1313,x:-41.9,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.989,x:-30.1,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1198,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.1758,x:-6,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.8159,x:-80.15,y:56.95,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-91.0969,x:-95.95,y:141.5,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.5583,x:-95.3,y:141.7}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.4141,y:-12.55,regX:33.4,x:-59.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7296,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.8206,x:48.55,y:-20.7,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.6543,x:54.25,regY:12.2,regX:-45.6,y:49.2}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:143.5105,x:67.5,y:134.75,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:119.7277,x:64.25,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5379,x:34.6,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8007,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:21.14,x:-41.9,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.3,regX:1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9917,x:-30.1,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.126,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.4037,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.6689,x:-79.9,y:56.95,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-90.9531,x:-95.9,y:141.55,scaleX:0.9971,scaleY:0.9971,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-110.4176,x:-95.25,y:141.8}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.5853,y:-12.35,regX:33.2,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7278,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.8382,x:48.55,y:-20.6,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.7983,x:54.2,regY:12.2,regX:-45.6,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:143.9624,x:67.35,y:134.75,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:120.7124,x:63.85,y:135.65,regX:-10,regY:11.1}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5432,x:34.6,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8111,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1491,x:-41.8,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9935,x:-30.2,y:91}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1303,x:24.4,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.6334,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.5244,x:-79.7,y:57.1,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-90.811,x:-95.85,y:141.6,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9969,rotation:-110.2768,x:-95.3,y:141.8}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-75.7554,y:-12.45,regX:33.3,x:-59.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7261,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.8557,x:48.6,y:-20.65,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:86.9432,x:54.3,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:144.4151,x:67,y:134.9,regX:-7.2,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:121.6989,x:63.65,y:135.7,regX:-10,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5476,x:34.6,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8219,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1566,x:-41.8,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9961,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1358,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-2.8632,x:-6,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:8,rotation:-84.379,x:-79.4,y:57.1,scaleX:0.997,scaleY:0.997}},{t:this.instance_2,p:{rotation:-90.6664,x:-95.85,y:141.6,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.1362,x:-95.35,y:141.75}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-75.9263,y:-12.45,regX:33.3,x:-59.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7252,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.8742,x:48.6,y:-20.6,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.0872,x:54.2,regY:12.2,regX:-45.6,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:144.8669,x:66.85,y:134.9,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:122.6833,x:63.5,y:135.7,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.552,x:34.65,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8324,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:21.1653,x:-41.85,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9988,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1412,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.0922,x:-6.1,y:-81.3}},{t:this.instance_3,p:{regX:43.8,regY:8,rotation:-84.2345,x:-79.2,y:57.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.5243,x:-96,y:141.6,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.9961,x:-95.35,y:141.85}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-76.0962,y:-12.55,regX:33.4,x:-59.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7235,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.8918,x:48.5,y:-20.65,scaleX:0.9975,scaleY:0.9975,regY:13.2,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.2311,x:54.15,regY:12.2,regX:-45.5,y:49.4}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:145.3209,x:66.65,y:134.9,regX:-7.4,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:123.6689,x:63.2,y:135.55,regX:-10.1,regY:11.1}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5572,x:34.65,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.842,x:-4.2,y:-59.7}},{t:this.instance_8,p:{rotation:21.1736,x:-41.85,y:185.6,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1.1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0013,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1483,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.3221,x:-6.05,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-84.0892,x:-79.1,y:57.25,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.3814,x:-96,y:141.6,scaleX:0.9972,scaleY:0.9972,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-109.8551,x:-95.4,y:141.8}},{t:this.instance,p:{regY:9.9,scaleX:0.9973,scaleY:0.9973,rotation:-76.2665,y:-12.45,regX:33.3,x:-59.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7217,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.9093,x:48.65,y:-20.65,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.3759,x:54.2,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:145.7739,x:66.35,y:134.95,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:124.6533,x:63.05,y:135.6,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.5616,x:34.65,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8519,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1826,x:-41.85,y:185.5,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0041,x:-30.2,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1536,x:24.5,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.5511,x:-6.1,y:-81.25}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-83.9437,x:-78.95,y:57.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.2385,x:-95.95,y:141.7,scaleX:0.9972,scaleY:0.9972,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.2,scaleX:0.9968,scaleY:0.9968,rotation:-109.7153,x:-95.35,y:141.85}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-76.4373,y:-12.45,regX:33.3,x:-59.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.72,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.9261,x:48.65,y:-20.6,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-31.9}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.5199,x:54.15,regY:12.2,regX:-45.6,y:49.3}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:146.2255,x:66.15,y:135,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:125.6382,x:62.75,y:135.65,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.1,regY:-51,rotation:-0.566,x:34.7,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8623,x:-4.15,y:-59.7}},{t:this.instance_8,p:{rotation:21.1889,x:-41.85,y:185.5,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0058,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.16,x:24.5,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-3.7811,x:-6.05,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:7.9,rotation:-83.7983,x:-78.75,y:57.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-90.0947,x:-95.9,y:141.65,scaleX:0.9971,scaleY:0.9971,regY:-8.9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-109.5738,x:-95.45,y:141.8}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-76.6067,y:-12.3,regX:33.2,x:-59.55}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.8,regY:-21.9,rotation:1.7182,x:-10.05,y:49}},{t:this.instance_14,p:{rotation:85.9445,x:48.55,y:-20.8,scaleX:0.9975,scaleY:0.9975,regY:13.1,regX:-32}},{t:this.instance_13,p:{scaleX:0.9972,scaleY:0.9972,rotation:87.6638,x:54.1,regY:12.2,regX:-45.6,y:49.25}},{t:this.instance_12,p:{scaleX:0.9969,scaleY:0.9969,rotation:146.6784,x:65.9,y:135.05,regX:-7.3,regY:13.2}},{t:this.instance_11,p:{scaleX:0.9969,scaleY:0.9969,rotation:126.6244,x:62.55,y:135.65,regX:-10.1,regY:11}},{t:this.instance_10,p:{regX:4.2,regY:-51,rotation:-0.5713,x:34.85,y:184.95,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:-6.8729,x:-4.25,y:-59.7}},{t:this.instance_8,p:{rotation:21.1981,x:-41.9,y:185.55,scaleX:0.9948,scaleY:0.9948,regY:-51.4,regX:1}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0085,x:-30.15,y:90.95}},{t:this.instance_6,p:{regX:0.3,regY:4.9,rotation:-9.1662,x:24.45,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.4,scaleX:0.998,scaleY:0.998,rotation:-4.0086,x:-6.15,y:-81.2}},{t:this.instance_3,p:{regX:43.8,regY:8,rotation:-83.6527,x:-78.4,y:57.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_2,p:{rotation:-89.9562,x:-96.05,y:141.65,scaleX:0.9971,scaleY:0.9971,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-109.4351,x:-95.4,y:141.8}},{t:this.instance,p:{regY:9.8,scaleX:0.9973,scaleY:0.9973,rotation:-76.777,y:-12.45,regX:33.3,x:-59.5}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-106.6,-204.2,191.2,500.7);


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
	this.instance_11.setTransform(83.45,134.45,0.9973,0.9973,55.1278,0,0,-10.5,10.8);

	this.instance_12 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_12.setTransform(82.85,130.8,0.9973,0.9973,65.9126,0,0,-7.9,13.5);

	this.instance_13 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_13.setTransform(54.5,49.65,0.9975,0.9975,76.1836,0,0,-45.6,12.6);

	this.instance_14 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_14.setTransform(47.75,-21.2,0.9978,0.9978,85.4705,0,0,-32.8,13.8);

	this.instance_15 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_15.setTransform(-9.3,49.05,0.9995,0.9995,1.7768,0,0,-4,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7768,y:49.05,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:85.4705,x:47.75,y:-21.2,regX:-32.8}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9975,scaleY:0.9975,rotation:76.1836,x:54.5,y:49.65,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:65.9126,x:82.85,y:130.8,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:55.1278,x:83.45,y:134.45,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2609,x:33.6,y:185.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.3524,y:-59.45,x:-4.15}},{t:this.instance_8,p:{regX:0.8,scaleX:0.9953,scaleY:0.9953,rotation:2.5658,y:185.95,x:-41.95}},{t:this.instance_7,p:{regX:1.4,regY:-42.6,scaleX:0.9957,scaleY:0.9957,rotation:3.9377,x:-30.2,y:90.05}},{t:this.instance_6,p:{rotation:-8.9749,x:24,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.9,scaleX:0.9982,scaleY:0.9982,rotation:-11.8622,x:1.25,y:-81}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-128.9062,x:-80.85,y:50.7,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-110.4686,x:-32.7,regX:4.4,y:122.65,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-131.1087,x:-32.95,y:122.55,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.2,scaleX:0.9977,scaleY:0.9977,rotation:-74.6276,x:-59.1,y:-18.2}}]}).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:85.7576,x:47.8,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:76.1098,x:54.15,y:49.65,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.8418,x:82.6,y:130.75,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:55.3957,x:83.25,y:134.4,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2603,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.3237,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.937,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9747,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.669,x:1.4,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.7673,x:-81.1,y:50.55,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-110.3285,x:-32.95,regX:4.4,y:122.65,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.9711,x:-33.3,y:122.55,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-74.4166,x:-59.05,y:-18.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:86.0457,x:47.8,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:76.0358,x:53.8,y:49.7,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.7707,x:82.25,y:130.65,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:55.6631,x:83,y:134.5,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2603,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.296,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.937,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9747,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.475,x:1.4,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.6282,x:-81.3,y:50.45,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-110.1901,x:-33.4,regX:4.3,y:122.75,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.8313,x:-33.65,y:122.6,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-74.2052,x:-59.05,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:86.3321,x:47.8,y:-21.15,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.9618,x:53.45,y:49.7,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.6985,x:82.15,y:130.7,regY:13.4,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:55.9318,x:82.8,y:134.5,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.2675,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.937,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9747,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.2802,x:1.35,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.488,x:-81.55,y:50.55,regX:44.3,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-110.0501,x:-33.9,regX:4.4,y:122.7,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.6925,x:-34.15,y:122.65,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-73.9924,x:-59.05,y:-18.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:86.6183,x:47.8,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.8876,x:53.1,y:49.75,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.6276,x:81.9,y:130.65,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:56.1986,x:82.5,y:134.45,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.2399,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.937,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9747,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.0863,x:1.4,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.3495,x:-81.85,y:50.3,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.9114,x:-34.4,regX:4.4,y:122.7,regY:-9.2}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.5533,x:-34.5,y:122.6,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-73.7805,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:86.9053,x:47.85,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.8137,x:52.75,y:49.8,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.5561,x:81.65,y:130.7,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:56.467,x:82.15,y:134.35,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.2122,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.937,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9747,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.8918,x:1.4,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.2108,x:-82.05,y:50.2,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.7733,x:-34.75,regX:4.4,y:122.7,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.4134,x:-35,y:122.65,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-73.5683,x:-59.05,y:-18.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:87.194,x:47.85,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.7405,x:52.2,y:49.8,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.4847,x:81.35,y:130.75,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:56.733,x:82,y:134.4,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.1833,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.937,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9747,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.6984,x:1.3,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.0703,x:-82.4,y:50.25,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.6339,x:-35.1,regX:4.4,y:122.7,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.2746,x:-35.35,y:122.6,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-73.3565,x:-59.1,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:87.479,x:47.8,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:75.6655,x:51.9,y:49.85,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:65.4129,x:81.1,y:130.75,regY:13.5,regX:-7.8}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:57.001,x:81.75,y:134.35,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.1559,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9747,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.5049,x:1.35,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.9311,x:-82.55,y:50.05,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.4933,x:-35.55,regX:4.4,y:122.85,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.1365,x:-35.85,y:122.7,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-73.1433,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:87.7658,x:47.8,y:-21.2,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:75.5913,x:51.65,y:49.85,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:65.3407,x:80.85,y:130.65,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:57.2692,x:81.55,y:134.35,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.1273,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.3101,x:1.2,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.793,x:-82.8,y:49.95,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.3555,x:-35.95,regX:4.4,y:122.85,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.9965,x:-36.2,y:122.75,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-72.9315,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:88.0526,x:47.85,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:75.5171,x:51.3,y:49.85,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.2705,x:80.55,y:130.6,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:57.5365,x:81.3,y:134.3,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.1005,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.116,x:1.35,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.653,x:-83.05,y:49.85,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.2153,x:-36.4,regX:4.4,y:122.9,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.8582,x:-36.65,y:122.75,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-72.72,x:-59.05,y:-18.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:88.3401,x:47.85,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9974,scaleY:0.9974,rotation:75.4427,x:50.9,y:49.8,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:65.1983,x:80.35,y:130.6,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:57.8045,x:80.95,y:134.3,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.072,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.565,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.922,x:1.35,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.5143,x:-83.35,y:49.75,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.0761,x:-36.85,regX:4.4,y:122.9,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.7176,x:-37.1,y:122.75,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-72.5068,x:-59.05,y:-18.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:88.6268,x:47.8,y:-21.1,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.3694,x:50.6,y:49.85,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.1266,x:80.15,y:130.5,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:58.0723,x:80.7,y:134.2,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.0442,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.7273,x:1.2,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.375,x:-83.6,y:49.7,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.9372,x:-37.25,regX:4.4,y:122.95,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.5795,x:-37.5,y:122.8,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-72.2962,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9977,rotation:88.9134,x:47.85,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.296,x:50.25,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.0548,x:79.9,y:130.55,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:58.3404,x:80.55,y:134.25,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.0166,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.5337,x:1.3,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.236,x:-83.8,y:49.6,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.7972,x:-37.7,regX:4.4,y:122.9,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.4393,x:-37.95,y:122.8,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.2,scaleX:0.9976,scaleY:0.9976,rotation:-72.0836,x:-58.9,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:89.2008,x:47.8,y:-21.15,regX:-32.7}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9974,scaleY:0.9974,rotation:75.2216,x:49.85,y:49.75,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.9838,x:79.65,y:130.4,regY:13.4,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:58.6068,x:80.25,y:134.2,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.988,y:-59.4,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-9.3383,x:1.3,y:-80.9}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.0971,x:-84.1,y:49.55,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.6592,x:-38.1,regX:4.4,y:122.95,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.3003,x:-38.35,y:122.75,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.2,scaleX:0.9976,scaleY:0.9976,rotation:-71.8716,x:-59,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:89.4874,x:47.85,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.1472,x:49.5,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.912,x:79.3,y:130.45,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:58.874,x:80,y:134.15,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.9604,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.1439,x:1.2,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.9576,x:-84.35,y:49.4,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.5187,x:-38.55,regX:4.4,y:122.95,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.162,x:-38.8,y:122.85,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-71.6584,x:-59.1,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:89.7739,x:47.75,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.0721,x:49.15,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.8403,x:79.05,y:130.4,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:59.1428,x:79.8,y:134.1,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.9327,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.9515,x:1.3,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.8187,x:-84.55,y:49.3,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.3801,x:-39,regX:4.4,y:123,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.0217,x:-39.2,y:122.85,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-71.4473,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:90.0561,x:47.85,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.9986,x:48.8,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.7697,x:78.75,y:130.4,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:59.4106,x:79.5,y:134.15,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.9042,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.7564,x:1.15,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.6795,x:-84.7,y:49.15,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.2406,x:-39.4,regX:4.3,y:123.15,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.8826,x:-39.6,y:122.85,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-71.2341,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:90.3444,x:47.8,y:-21.2,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.925,x:48.4,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.6963,x:78.55,y:130.4,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:59.6782,x:79.2,y:134,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2594,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.8757,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.5632,x:1.25,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.5405,x:-85.05,y:49.1,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.1015,x:-39.85,regX:4.4,y:123,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.7443,x:-40.05,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-71.023,x:-59.05,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:90.6309,x:47.85,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.8506,x:48.05,y:49.95,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:64.6257,x:78.3,y:130.4,regY:13.5,regX:-7.8}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:59.9458,x:79,y:134.05,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.848,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9982,scaleY:0.9982,rotation:-8.3683,x:1.3,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.4008,x:-85.35,y:49,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.9629,x:-40.3,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.6045,x:-40.45,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-70.8095,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:90.9175,x:47.75,y:-21.15,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.7768,x:47.7,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.5544,x:78.05,y:130.3,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:60.214,x:78.8,y:133.95,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.8195,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.1736,x:1.3,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.2609,x:-85.55,y:48.9,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.8232,x:-40.85,regX:4.4,y:123.05,regY:-9.2}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.4647,x:-40.9,y:122.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-70.5978,x:-59.05,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7751,y:48.95,x:-9.3,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:91.2041,x:47.8,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.7032,x:47.4,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.483,x:77.85,y:130.3,regY:13.5,regX:-7.8}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:60.4802,x:78.5,y:133.95,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7919,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.98,x:1.25,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.1234,x:-85.85,y:48.9,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.6846,x:-41.15,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.3268,x:-41.35,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-70.3866,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:91.4916,x:47.8,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.6288,x:47,y:49.95,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.4116,x:77.5,y:130.2,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:60.7479,x:78.3,y:133.85,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7642,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9362,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-7.7846,x:1.3,y:-80.9}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.983,x:-86.05,y:48.7,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.5451,x:-41.55,regX:4.4,y:123.1,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.187,x:-41.7,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-70.1737,x:-59,y:-18.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:91.7782,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.555,x:46.65,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:64.3399,x:77.25,y:130.1,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:61.0168,x:78.05,y:133.8,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7359,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.591,x:1.3,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.8436,x:-86.35,y:48.6,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.4049,x:-41.95,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.047,x:-42.2,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-69.9622,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:92.0649,x:47.8,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9974,scaleY:0.9974,rotation:74.4806,x:46.3,y:49.8,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.2685,x:77.05,y:130.1,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:61.284,x:77.7,y:133.75,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7082,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-7.3974,x:1.3,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.7049,x:-86.45,y:48.6,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.2668,x:-42.4,regX:4.4,y:123.1,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.9091,x:-42.55,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-69.75,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:92.3526,x:47.8,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.4062,x:45.9,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.1964,x:76.8,y:130,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:61.5515,x:77.55,y:133.75,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.6797,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.2031,x:1.25,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.566,x:-86.8,y:48.5,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.1265,x:-42.8,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.7697,x:-43.05,y:122.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-69.5379,x:-59.05,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:92.6385,x:47.8,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.3332,x:45.55,y:49.85,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.1254,x:76.6,y:129.95,regY:13.4,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:61.8198,x:77.2,y:133.6,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.6529,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5642,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9738,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.009,x:1.25,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.4271,x:-86.95,y:48.2,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.9871,x:-43.3,regX:4.4,y:123.1,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.6303,x:-43.5,y:122.85,regX:14.4,regY:-0.5}},{t:this.instance,p:{regY:10.2,scaleX:0.9976,scaleY:0.9976,rotation:-69.3252,x:-59,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:92.9254,x:47.8,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9974,scaleY:0.9974,rotation:74.2586,x:45.2,y:49.7,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.0529,x:76.25,y:129.9,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:62.0873,x:77.1,y:133.55,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.6234,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.815,x:1.25,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.2877,x:-87.3,y:48.1,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.8487,x:-43.65,regX:4.4,y:123.15,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.4909,x:-43.85,y:122.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-69.1136,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:93.2123,x:47.8,y:-21.15,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.1848,x:44.85,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.9819,x:76.05,y:129.85,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:62.3544,x:76.8,y:133.45,regX:-10.6,regY:10.7}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.5967,y:-59.45,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.621,x:1.2,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.1479,x:-87.5,y:48.15,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.7097,x:-44.1,regX:4.4,y:123.1,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.3525,x:-44.3,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-68.9013,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:93.4994,x:47.75,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.1101,x:44.35,y:49.85,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:63.9101,x:75.8,y:129.75,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:62.6222,x:76.5,y:133.5,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.5682,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-6.427,x:1.25,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.0083,x:-87.8,y:48,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.5697,x:-44.5,regX:4.4,y:123.15,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.2131,x:-44.65,y:122.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-68.6891,x:-59.05,y:-18.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:93.7865,x:47.7,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9975,scaleY:0.9975,rotation:74.0363,x:44,y:49.75,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.8396,x:75.5,y:129.75,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:62.8904,x:76.3,y:133.45,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.5407,y:-59.45,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.2314,x:1.2,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.8704,x:-87.95,y:47.85,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.4307,x:-44.9,regX:4.4,y:123.1,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.0742,x:-45.1,y:122.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-68.4762,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:94.0728,x:47.7,y:-21.35,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:73.9623,x:43.75,y:49.8,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:63.7674,x:75.25,y:129.75,regY:13.5,regX:-7.8}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.1578,x:76,y:133.35,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.5131,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.0383,x:1.25,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.7299,x:-88.1,y:47.85,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.2918,x:-45.3,regX:4.3,y:123.2,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.9344,x:-45.55,y:122.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-68.2653,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:94.3593,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:73.8885,x:43.45,y:49.75,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.6957,x:75.1,y:129.6,regY:13.4,regX:-7.8}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.4248,x:75.75,y:133.3,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.4846,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.8437,x:1.2,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.5908,x:-88.4,y:47.75,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.1531,x:-45.75,regX:4.3,y:123.25,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.7955,x:-45.85,y:122.9,regX:14.3,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-68.0526,x:-59.05,y:-18.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:94.6467,x:47.75,y:-21.15,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:73.8144,x:43.1,y:49.7,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.6255,x:74.8,y:129.6,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:63.6933,x:75.55,y:133.2,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2585,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.456,y:-59.45,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.6501,x:1.2,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.4522,x:-88.6,y:47.45,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.0138,x:-46.2,regX:4.4,y:123.1,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.6565,x:-46.3,y:122.8,regX:14.4,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-67.8407,x:-59.05,y:-18.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:94.9334,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:73.7398,x:42.7,y:49.75,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.5522,x:74.55,y:129.5,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.9607,x:75.25,y:133.2,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.4284,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.4556,x:1.2,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.3127,x:-89.05,y:47.45,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-105.8732,x:-46.7,regX:4.3,y:123.2,regY:-9.2}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.516,x:-46.8,y:122.9,regX:14.3,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-67.6277,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:95.2202,x:47.75,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:73.6657,x:42.35,y:49.7,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.4808,x:74.25,y:129.4,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.2277,x:75,y:133.05,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.3999,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.2611,x:1.2,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.1731,x:-89.25,y:47.3,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-105.7355,x:-47.2,regX:4.4,y:123.1,regY:-9.2}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.3775,x:-47.25,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-67.4163,x:-59.05,y:-18.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:95.5071,x:47.8,y:-21.1,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:73.5917,x:42,y:49.65,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.4099,x:73.95,y:129.35,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:64.4947,x:74.8,y:133,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.3722,y:-59.45,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9353,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.0668,x:1.2,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.0338,x:-89.45,y:47.2,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-105.5962,x:-47.5,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.2389,x:-47.65,y:122.8,regX:14.3,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-67.2045,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:95.7951,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:73.5176,x:41.6,y:49.6,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.3381,x:73.7,y:129.2,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.7638,x:74.5,y:132.95,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.3439,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-4.8724,x:1.15,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-123.8943,x:-89.7,y:47.05,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-105.4563,x:-47.9,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.0995,x:-48.15,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-66.9924,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:96.0814,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:73.4436,x:41.15,y:49.6,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.2664,x:73.55,y:129.15,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.0305,x:74.4,y:132.8,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.3162,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-8.9729,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-4.6799,x:1.2,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-123.7564,x:-89.9,y:46.95,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-105.3181,x:-48.3,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-125.9596,x:-48.4,y:122.85,regX:14.3,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-66.7805,x:-59.05,y:-18.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7742,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:96.3679,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:73.3695,x:40.9,y:49.55,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.1942,x:73.3,y:129,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.2988,x:74,y:132.8,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2577,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.2877,y:-59.5,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5633,y:185.9,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9345,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-8.9729,x:23.9,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-4.4848,x:1.15,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-123.6162,x:-90.15,y:46.8,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-105.1782,x:-48.7,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-125.8201,x:-48.9,y:122.8,regX:14.3,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-66.5677,x:-59.05,y:-18.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7716,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:95.9888,x:47.7,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:73.4674,x:41.4,y:49.65,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:63.2875,x:73.55,y:129.15,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.9434,x:74.35,y:132.85,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2682,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.3287,y:-59.45,x:-4.05}},{t:this.instance_8,p:{regX:0.8,scaleX:0.9952,scaleY:0.9952,rotation:2.5721,y:185.9,x:-41.85}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.937,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-8.9792,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-4.7459,x:1.2,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-123.799,x:-89.85,y:47.05,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-105.3653,x:-48.2,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.0067,x:-48.4,y:122.85,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-66.8409,x:-59.05,y:-18.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7699,y:48.95,x:-9.35,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:95.6093,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9974,scaleY:0.9974,rotation:73.5651,x:41.85,y:49.6,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.3797,x:73.9,y:129.35,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.5885,x:74.65,y:132.95,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2796,x:33.6,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.3688,y:-59.45,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5826,y:185.9,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9389,x:-30.3,y:90.1}},{t:this.instance_6,p:{rotation:-8.9854,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.0043,x:1.15,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-123.982,x:-89.45,y:47.1,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-105.5507,x:-47.7,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.1925,x:-47.85,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-67.1142,x:-59.05,y:-18.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7681,y:49.05,x:-9.4,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:95.2299,x:47.8,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:73.6629,x:42.35,y:49.7,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.4742,x:74.25,y:129.35,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.2328,x:75,y:133.05,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.2902,x:33.6,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.4097,y:-59.45,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.5932,y:185.9,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9415,x:-30.3,y:90.05}},{t:this.instance_6,p:{rotation:-8.9917,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.2655,x:1.2,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.1644,x:-89.25,y:47.35,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-105.7372,x:-47.25,regX:4.4,y:123.15,regY:-9.2}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.3775,x:-47.25,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-67.3868,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7664,y:49.05,x:-9.4,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9977,rotation:94.8507,x:47.8,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:73.7606,x:42.8,y:49.7,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.5667,x:74.55,y:129.5,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.8784,x:75.4,y:133.2,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.3025,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.4499,y:-59.45,x:-4.05}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6037,y:185.9,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9442,x:-30.3,y:90.05}},{t:this.instance_6,p:{rotation:-8.9987,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.5259,x:1.15,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.3479,x:-89,y:47.4,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-105.9223,x:-46.65,regX:4.4,y:123.1,regY:-9.2}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.563,x:-46.7,y:122.8,regX:14.3,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-67.6599,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7646,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:94.4718,x:47.7,y:-21.2,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:73.8585,x:43.3,y:49.75,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:63.66,x:75,y:129.7,regY:13.4,regX:-7.8}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.5239,x:75.7,y:133.3,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.314,x:33.55,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.4899,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6143,y:185.9,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9468,x:-30.3,y:90.05}},{t:this.instance_6,p:{rotation:-9.0059,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-5.7856,x:1.2,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.5303,x:-88.5,y:47.5,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.1103,x:-46,regX:4.4,y:123.1,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.7505,x:-46.2,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-67.9335,x:-59.05,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.762,y:49.1,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:94.0922,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:73.9567,x:43.65,y:49.8,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:63.7529,x:75.35,y:129.7,regY:13.5,regX:-7.8}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.1683,x:76,y:133.35,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.3255,x:33.6,y:185.55}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.5308,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6249,y:185.85,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9494,x:-30.3,y:90.05}},{t:this.instance_6,p:{rotation:-9.0121,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.0471,x:1.25,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.7136,x:-88.25,y:47.8,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.2948,x:-45.4,regX:4.3,y:123.2,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.9351,x:-45.55,y:122.9,regX:14.3,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-68.2067,x:-59.05,y:-18.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7602,y:49.15,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:93.7127,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.0535,x:44.2,y:49.8,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:63.8466,x:75.6,y:129.8,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:62.8135,x:76.3,y:133.45,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.3361,x:33.6,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.571,y:-59.45,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6345,y:185.85,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9521,x:-30.3,y:90.1}},{t:this.instance_6,p:{rotation:-9.0192,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.3061,x:1.2,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-124.8955,x:-88,y:47.8,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.4829,x:-44.95,regX:4.3,y:123.2,regY:-9.2}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.1212,x:-45.1,y:122.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-68.479,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7585,y:49.15,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:93.3335,x:47.75,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:74.1522,x:44.7,y:49.85,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:63.9384,x:75.95,y:129.8,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:62.4586,x:76.65,y:133.55,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.3467,x:33.65,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.6119,y:-59.45,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6451,y:185.85,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9547,x:-30.3,y:90.1}},{t:this.instance_6,p:{rotation:-9.0245,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.5671,x:1.25,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.0781,x:-87.7,y:48,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.6684,x:-44.3,regX:4.4,y:123.1,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.3069,x:-44.5,y:122.85,regX:14.3,regY:-0.4}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-68.7529,x:-59.05,y:-18.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7567,y:49.15,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:92.9543,x:47.8,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9974,scaleY:0.9974,rotation:74.2494,x:45.15,y:49.75,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.0317,x:76.25,y:129.85,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:62.1038,x:77.05,y:133.55,regX:-10.5,regY:10.7}},{t:this.instance_10,p:{rotation:-4.3581,x:33.6,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.652,y:-59.45,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6556,y:185.85,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9574,x:-30.3,y:90.1}},{t:this.instance_6,p:{rotation:-9.0325,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-6.8282,x:1.3,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.2612,x:-87.3,y:48.15,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-106.8551,x:-43.75,regX:4.4,y:123.1,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.4928,x:-44,y:122.95,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-69.0253,x:-59.1,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7541,y:49.15,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:92.5753,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.3462,x:45.65,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.1242,x:76.65,y:129.95,regY:13.4,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:61.7481,x:77.35,y:133.7,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.3695,x:33.65,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.6912,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6662,y:185.85,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.96,x:-30.3,y:90.1}},{t:this.instance_6,p:{rotation:-9.038,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.0876,x:1.25,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.4434,x:-87.05,y:48.2,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.0411,x:-43.25,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.6783,x:-43.45,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-69.2983,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7523,y:49.15,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:92.1956,x:47.75,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.4451,x:46.15,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.2171,x:76.9,y:130.05,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:61.3938,x:77.7,y:133.75,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.3802,x:33.65,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7314,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6767,y:185.85,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9626,x:-30.3,y:90.1}},{t:this.instance_6,p:{rotation:-9.045,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.3482,x:1.3,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.6263,x:-86.75,y:48.4,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.2283,x:-42.65,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.8646,x:-42.9,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-69.5715,x:-59.05,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7506,y:49.15,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:91.8168,x:47.85,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.5425,x:46.6,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.3101,x:77.3,y:130.1,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:61.0391,x:78.05,y:133.8,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.3916,x:33.7,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.7723,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.8,scaleX:0.9952,scaleY:0.9952,rotation:2.6872,y:185.85,x:-41.85}},{t:this.instance_7,p:{regX:1.4,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9644,x:-30.15,y:90.1}},{t:this.instance_6,p:{rotation:-9.0513,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-7.6077,x:1.25,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.809,x:-86.45,y:48.55,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.4137,x:-42.15,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.0496,x:-42.4,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-69.8446,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7488,y:49.15,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:91.4372,x:47.75,y:-21.2,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.6405,x:47.1,y:49.95,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.4034,x:77.55,y:130.2,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:60.6843,x:78.25,y:133.8,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.4021,x:33.7,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.8123,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.6969,y:185.85,x:-42}},{t:this.instance_7,p:{regX:1.4,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9671,x:-30.15,y:90.1}},{t:this.instance_6,p:{rotation:-9.0583,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.9,scaleX:0.9981,scaleY:0.9981,rotation:-7.8685,x:1.3,y:-80.85}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-125.9917,x:-86.05,y:48.65,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.6003,x:-41.65,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.2356,x:-41.75,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-70.118,x:-59.1,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7471,y:49.15,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:91.0577,x:47.8,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.7379,x:47.55,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:64.4971,x:78,y:130.25,regY:13.4,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:60.3291,x:78.65,y:133.95,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.4145,x:33.75,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.8525,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7066,y:185.85,x:-42}},{t:this.instance_7,p:{regX:1.4,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9697,x:-30.15,y:90.1}},{t:this.instance_6,p:{rotation:-9.0646,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.1286,x:1.3,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.1751,x:-85.9,y:48.9,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.7863,x:-41.1,regX:4.4,y:122.95,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.4218,x:-41.25,y:122.9,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-70.3904,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7445,y:49.15,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:90.6782,x:47.8,y:-21.15,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.8359,x:48,y:49.95,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:64.5904,x:78.25,y:130.3,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:59.974,x:79,y:134.05,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.4251,x:33.7,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.8936,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7172,y:185.85,x:-42}},{t:this.instance_7,p:{regX:1.4,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9723,x:-30.15,y:90.1}},{t:this.instance_6,p:{rotation:-9.0726,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.3889,x:1.3,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.3575,x:-85.4,y:49,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.9732,x:-40.55,regX:4.4,y:123.05,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.607,x:-40.7,y:122.85,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-70.664,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7427,y:49.15,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:90.2988,x:47.8,y:-21.2,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:74.9339,x:48.5,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.6826,x:78.65,y:130.4,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:59.6193,x:79.25,y:134,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.4365,x:33.75,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.9336,y:-59.4,x:-4.1}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7277,y:185.85,x:-42.05}},{t:this.instance_7,p:{regX:1.4,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9749,x:-30.15,y:90.1}},{t:this.instance_6,p:{rotation:-9.0797,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.6483,x:1.15,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.54,x:-85.15,y:49.05,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.1578,x:-39.9,regX:4.3,y:123.1,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.7935,x:-40.15,y:122.8,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-70.9368,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.741,y:49.15,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:89.9246,x:47.85,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.0319,x:49,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.7752,x:78.95,y:130.4,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:59.2636,x:79.65,y:134.1,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.448,x:33.75,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:10.9738,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7383,y:185.85,x:-42.1}},{t:this.instance_7,p:{regX:1.4,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9776,x:-30.15,y:90.1}},{t:this.instance_6,p:{rotation:-9.0859,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-8.9089,x:1.2,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.7233,x:-84.75,y:49.1,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.3449,x:-39.4,regX:4.4,y:123,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.978,x:-39.55,y:122.75,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-71.2092,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7392,y:49.15,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:89.5452,x:47.85,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.1291,x:49.45,y:49.95,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.8681,x:79.25,y:130.45,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:58.9086,x:80,y:134.15,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.4585,x:33.8,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.0148,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7497,y:185.85,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9803,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.0922,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.1688,x:1.35,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-126.9064,x:-84.5,y:49.35,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.5317,x:-38.85,regX:4.4,y:122.95,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.1644,x:-39.05,y:122.8,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-71.483,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7366,y:49.15,x:-9.3,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:89.1658,x:47.85,y:-21.2,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.2271,x:49.95,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:64.9614,x:79.55,y:130.45,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:58.5526,x:80.25,y:134.2,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.4691,x:33.8,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.055,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7603,y:185.85,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9829,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.0984,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.4296,x:1.35,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.089,x:-84.25,y:49.45,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.7177,x:-38.3,regX:4.4,y:122.9,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.3501,x:-38.55,y:122.75,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-71.7552,x:-59.1,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7357,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:88.7863,x:47.8,y:-21.15,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.3249,x:50.4,y:49.9,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.0544,x:80,y:130.6,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:58.1983,x:80.65,y:134.3,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.4805,x:33.8,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.0952,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7699,y:185.85,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9855,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1056,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.6893,x:1.3,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.271,x:-83.85,y:49.55,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-108.9028,x:-37.75,regX:4.4,y:122.9,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.5365,x:-37.95,y:122.75,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-72.0284,x:-59.05,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.734,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:88.4067,x:47.8,y:-21.15,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.4219,x:50.9,y:49.95,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.1478,x:80.3,y:130.6,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:57.8439,x:80.95,y:134.35,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.492,x:33.8,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.1344,y:-59.35,x:-4.2}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7805,y:185.85,x:-42}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9881,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1118,x:23.95,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-9.9505,x:1.25,y:-80.95}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.4537,x:-83.7,y:49.75,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.09,x:-37.25,regX:4.4,y:122.85,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.7219,x:-37.4,y:122.7,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-72.3025,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7322,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9977,rotation:88.028,x:47.85,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.5205,x:51.35,y:49.85,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.2404,x:80.6,y:130.65,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:57.4888,x:81.2,y:134.25,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.5034,x:33.85,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.1754,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.7902,y:185.85,x:-42.1}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9908,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1189,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.2101,x:1.4,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.6362,x:-83.15,y:49.75,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.2757,x:-36.65,regX:4.4,y:122.8,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.9081,x:-36.9,y:122.65,regX:14.4,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-72.5747,x:-59.1,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7305,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:87.6474,x:47.85,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.6183,x:51.85,y:49.8,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.3333,x:80.9,y:130.6,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:57.1345,x:81.5,y:134.2,regX:-10.6,regY:10.8}},{t:this.instance_10,p:{rotation:-4.514,x:33.85,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.2156,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.8007,y:185.85,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9935,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1251,x:24,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.4711,x:1.25,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-127.8192,x:-82.85,y:49.85,regX:44.4,regY:7.7}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.4625,x:-36.1,regX:4.4,y:122.75,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.0935,x:-36.3,y:122.65,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-72.848,x:-59.05,y:-18.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7278,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:87.2685,x:47.8,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.6,scaleX:0.9975,scaleY:0.9975,rotation:75.7161,x:52.25,y:49.7,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.4259,x:81.3,y:130.8,regY:13.5,regX:-7.8}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:56.7787,x:81.95,y:134.4,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.5263,x:33.9,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.2557,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.8113,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9961,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1332,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.7305,x:1.4,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.0023,x:-82.7,y:50.1,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.6494,x:-35.6,regX:4.4,y:122.75,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.279,x:-35.75,y:122.55,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-73.1214,x:-59.05,y:-18.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7261,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:86.8895,x:47.8,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.8137,x:52.75,y:49.8,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.5193,x:81.65,y:130.75,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:56.4242,x:82.3,y:134.45,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.5378,x:33.85,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.2969,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.8218,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:3.9987,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1385,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-10.9916,x:1.4,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.1859,x:-82.3,y:50.1,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-109.8366,x:-35,regX:4.4,y:122.7,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.4643,x:-35.15,y:122.6,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-73.3942,x:-59.05,y:-18.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7243,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:86.5094,x:47.8,y:-21.1,regX:-32.7}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:75.9112,x:53.2,y:49.75,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.6126,x:81.95,y:130.7,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:56.069,x:82.6,y:134.4,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.5493,x:33.9,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.3372,y:-59.35,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9953,scaleY:0.9953,rotation:2.8315,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:4.0013,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1456,x:23.95,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.2515,x:1.45,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.3674,x:-81.95,y:50.3,regX:44.4,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-110.022,x:-34.45,regX:4.4,y:122.7,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.6503,x:-34.7,y:122.55,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-73.6665,x:-59.05,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7226,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:86.1301,x:47.85,y:-21.25,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:76.0097,x:53.7,y:49.7,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.7044,x:82.3,y:130.65,regY:13.4,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:55.7147,x:82.95,y:134.45,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.5599,x:33.9,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.3766,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9952,scaleY:0.9952,rotation:2.8421,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:4.0031,x:-30.2,y:90.1}},{t:this.instance_6,p:{rotation:-9.1527,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.5116,x:1.25,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.5503,x:-81.6,y:50.5,regX:44.3,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-110.2078,x:-33.85,regX:4.3,y:122.75,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-130.8369,x:-34.05,y:122.55,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.2,scaleX:0.9976,scaleY:0.9976,rotation:-73.9402,x:-58.95,y:-18.2}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7208,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:85.7514,x:47.8,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9974,scaleY:0.9974,rotation:76.1073,x:54.15,y:49.65,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:65.7986,x:82.6,y:130.7,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:55.3599,x:83.3,y:134.45,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.5705,x:33.95,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.4168,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.8,scaleX:0.9952,scaleY:0.9952,rotation:2.8517,y:185.8,x:-41.95}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:4.0057,x:-30.25,y:90.1}},{t:this.instance_6,p:{rotation:-9.1589,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:2,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-11.7717,x:1.45,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.7336,x:-81.4,y:50.5,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-110.3939,x:-33.35,regX:4.4,y:122.6,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-131.022,x:-33.5,y:122.5,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-74.2135,x:-59.05,y:-18.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7182,y:49.15,x:-9.25,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9977,scaleY:0.9977,rotation:85.3727,x:47.85,y:-21.3,regX:-32.8}},{t:this.instance_13,p:{regX:-45.5,scaleX:0.9975,scaleY:0.9975,rotation:76.204,x:54.6,y:49.7,regY:12.6}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:65.8916,x:82.85,y:130.75,regY:13.5,regX:-7.9}},{t:this.instance_11,p:{scaleX:0.9972,scaleY:0.9972,rotation:55.0046,x:83.6,y:134.45,regX:-10.5,regY:10.8}},{t:this.instance_10,p:{rotation:-4.5811,x:33.95,y:185.45}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:11.457,y:-59.4,x:-4.15}},{t:this.instance_8,p:{regX:0.7,scaleX:0.9953,scaleY:0.9953,rotation:2.8623,y:185.8,x:-42.05}},{t:this.instance_7,p:{regX:1.3,regY:-42.5,scaleX:0.9956,scaleY:0.9956,rotation:4.0084,x:-30.25,y:90.05}},{t:this.instance_6,p:{rotation:-9.1661,x:24,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:50.8,scaleX:0.9981,scaleY:0.9981,rotation:-12.0306,x:1.3,y:-81}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-128.915,x:-81.05,y:50.7,regX:44.4,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-110.5789,x:-32.9,regX:4.4,y:122.65,regY:-9.2}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-131.2072,x:-33,y:122.45,regX:14.3,regY:-0.5}},{t:this.instance,p:{regY:10.1,scaleX:0.9976,scaleY:0.9976,rotation:-74.4865,x:-59.1,y:-18.2}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-110.6,-212.6,224,510.20000000000005);


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
	this.instance_3 = new lib.ch1_headcopy_1("synched",0);
	this.instance_3.setTransform(-0.15,51.35,0.999,0.999,2.3215,0,0,0.9,52.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.2,-71.5,163.10000000000002,152.1);


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
	this.instance = new lib.CachedBmp_1608();
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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4,rotation:1.7768,x:-9.3,y:49.05,regY:-21.9}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9979,scaleY:0.9979,rotation:93.2312,x:47.8,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9976,scaleY:0.9976,rotation:105.8458,x:44.5,y:49.95,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9975,scaleY:0.9975,rotation:82.7163,x:29.7,y:135.05,regY:13.3}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9975,scaleY:0.9975,rotation:118.0214,x:29.15,y:138.4,regY:10.6}},{t:this.instance_10,p:{scaleX:0.995,scaleY:0.995,rotation:-3.3946,x:33.9,y:185.55,regX:3.4}},{t:this.instance_9,p:{rotation:11.3553,x:-4.15,y:-59.2,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4634,x:-41.35,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.8,scaleX:0.9957,scaleY:0.9957,rotation:3.9378,y:89.85,x:-30}},{t:this.instance_6,p:{regX:-0.2,scaleX:0.9948,scaleY:0.9948,rotation:-8.9723,x:23.95,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.8642,x:1.35,y:-80.8}},{t:this.instance_3,p:{scaleX:0.9976,scaleY:0.9976,rotation:-98.3943,x:-68.5,y:59.3}},{t:this.instance_2,p:{scaleX:0.9976,scaleY:0.9976,rotation:-115.9556,x:-63.5,y:145.3,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9973,scaleY:0.9973,rotation:-122.4582,x:-63.45,y:145.35}},{t:this.instance,p:{regX:33.6,regY:10.1,rotation:-84.558,x:-59.15,y:-12.15,scaleX:0.9977,scaleY:0.9977}}]}).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:93.3324,x:47.9,y:-21,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:105.382,x:44.45,y:49.85,regX:-45.8}},{t:this.instance_12,p:{regX:-7.6,scaleX:0.9974,scaleY:0.9974,rotation:82.2976,x:30.25,y:135.25,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:116.6325,x:29.7,y:138.5,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3551,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.7361,x:1.45,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.3727,x:-68.7,y:59.25}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.9336,x:-63.75,y:145.25,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.4374,x:-63.7,y:145.3}},{t:this.instance,p:{regX:33.5,regY:10.2,rotation:-84.3491,x:-59,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:93.4369,x:47.9,y:-20.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:104.9197,x:44.35,y:49.9,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:81.8772,x:30.75,y:135.15,regY:13.3}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9974,scaleY:0.9974,rotation:115.2443,x:30.3,y:138.5,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3561,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.6081,x:1.4,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.3523,x:-68.95,y:59.2}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.9124,x:-64.05,y:145.15,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.417,x:-63.95,y:145.25}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-84.1367,x:-59.15,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:93.5404,x:47.95,y:-21,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:104.4567,x:44.2,y:49.85,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9975,scaleY:0.9975,rotation:81.4574,x:31.35,y:135.2,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:113.8557,x:30.9,y:138.7,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.357,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.4812,x:1.4,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.332,x:-69.2,y:59.2}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.8913,x:-64.5,y:145.1,regX:5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.3949,x:-64.25,y:145.25}},{t:this.instance,p:{regX:33.6,regY:10.1,rotation:-83.9252,x:-59.2,y:-12.3,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:93.6432,x:47.95,y:-20.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:103.9956,x:44.1,y:49.85,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:81.0387,x:31.9,y:135.3,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:112.4675,x:31.5,y:138.85,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3577,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.3544,x:1.4,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.309,x:-69.5,y:59.1}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.8705,x:-64.8,y:145.1,regX:5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.3752,x:-64.55,y:145.25}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-83.7145,x:-59.15,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:93.7477,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:103.5327,x:43.95,y:49.9,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9975,scaleY:0.9975,rotation:80.6189,x:32.45,y:135.4,regY:13.3}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9974,scaleY:0.9974,rotation:111.0789,x:32.1,y:138.85,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3587,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.2268,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.2886,x:-69.7,y:59.15}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.8489,x:-65,y:145.05,regX:5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.3543,x:-64.85,y:145.2}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-83.5037,x:-59.15,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:93.8513,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:103.0696,x:43.75,y:49.85,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:80.1992,x:33.1,y:135.5,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:109.6913,x:32.7,y:139.05,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3606,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.0981,x:1.4,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.2673,x:-70,y:59}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.8274,x:-65.3,y:145.05,regX:5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.3319,x:-65.1,y:145.15}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-83.2923,x:-59.15,y:-12.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:93.9558,x:47.8,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:102.6078,x:43.65,y:49.85,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:79.779,x:33.65,y:135.65,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:108.3008,x:33.25,y:139.1,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3615,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.9715,x:1.4,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.2461,x:-70.25,y:59.05}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.807,x:-65.6,y:145.1,regX:4.9,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.311,x:-65.4,y:145.15}},{t:this.instance,p:{regX:33.6,regY:10.1,rotation:-83.0803,x:-59.1,y:-12.25,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.0586,x:47.95,y:-21,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:102.1457,x:43.45,y:49.85,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:79.36,x:34.2,y:135.65,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:106.9127,x:33.85,y:139.15,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3621,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.8448,x:1.4,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.2248,x:-70.5,y:58.95}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.7858,x:-65.85,y:145.05,regX:4.9,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.2893,x:-65.75,y:145.1}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-82.8701,x:-59.15,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.1631,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:101.6822,x:43.45,y:49.8,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:78.9407,x:34.9,y:135.75,regY:13.2}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:105.5243,x:34.4,y:139.2,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3931,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.364,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.7164,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.2051,x:-70.75,y:58.95}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.7639,x:-66.05,y:145,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.2684,x:-65.95,y:145.1}},{t:this.instance,p:{regX:33.5,regY:10.2,rotation:-82.6599,x:-59.05,y:-12.15,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.2668,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:101.2192,x:43.3,y:49.9,regX:-45.7}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:78.5206,x:35.3,y:135.8,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:104.1351,x:35,y:139.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3931,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3642,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9981,scaleY:0.9981,rotation:-10.5891,x:1.4,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.1832,x:-71.05,y:58.85}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.7427,x:-66.35,y:144.95,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.2472,x:-66.25,y:145}},{t:this.instance,p:{regX:33.6,regY:10.1,rotation:-82.4469,x:-59.1,y:-12.25,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:94.3714,x:47.8,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:100.7576,x:43.1,y:49.8,regX:-45.8}},{t:this.instance_12,p:{regX:-7.6,scaleX:0.9974,scaleY:0.9974,rotation:78.1016,x:35.85,y:136,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:102.748,x:35.65,y:139.4,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3931,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3651,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.4625,x:1.4,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.162,x:-71.25,y:58.85}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.7219,x:-66.65,y:144.9,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.227,x:-66.55,y:144.95}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-82.2375,x:-59.2,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:94.4741,x:47.8,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:100.2949,x:43.05,y:49.8,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:77.682,x:36.35,y:135.95,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:101.3588,x:36.25,y:139.45,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3931,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3666,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.3344,x:1.4,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.1415,x:-71.55,y:58.8}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.7019,x:-66.95,y:144.85,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.2061,x:-66.85,y:144.95}},{t:this.instance,p:{regX:33.5,regY:10.2,rotation:-82.0251,x:-59,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:94.5771,x:47.85,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:99.8321,x:42.9,y:49.9,regX:-45.7}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:77.2611,x:36.9,y:135.9,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:99.97,x:36.9,y:139.5,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3676,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.2078,x:1.45,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.1204,x:-71.85,y:58.8}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.68,x:-67.25,y:144.8,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.1845,x:-67.15,y:144.9}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-81.8134,x:-59.15,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.6825,x:47.95,y:-20.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:99.3698,x:42.8,y:49.75,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:76.8411,x:37.55,y:135.9,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:98.5827,x:37.35,y:139.5,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3687,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.0789,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.0981,x:-72.05,y:58.7}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.6588,x:-67.55,y:144.8,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.1636,x:-67.5,y:144.85}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-81.6037,x:-59.15,y:-12.15,scaleX:0.9976,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.7862,x:47.95,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:98.9074,x:42.6,y:49.7,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:76.4221,x:38.1,y:135.95,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:97.1942,x:37.95,y:139.55,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3695,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.9526,x:1.4,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.0779,x:-72.35,y:58.7}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.638,x:-67.85,y:144.7,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.1426,x:-67.75,y:144.75}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-81.3919,x:-59.2,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.8892,x:47.95,y:-21,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:98.4454,x:42.4,y:49.7,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:76.0022,x:38.7,y:136.05,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:95.8057,x:38.65,y:139.55,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3711,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.8246,x:1.4,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.0565,x:-72.6,y:58.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.6169,x:-68.15,y:144.7,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.121,x:-68,y:144.7}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-81.1807,x:-59.2,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.9938,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:97.9824,x:42.4,y:49.7,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:75.5828,x:39.25,y:136.05,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:94.4159,x:39.15,y:139.6,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3721,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.6973,x:1.45,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.0345,x:-72.8,y:58.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.5965,x:-68.45,y:144.65,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.0998,x:-68.3,y:144.65}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-80.9696,x:-59.15,y:-12.05,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.0976,x:47.95,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:97.5205,x:42.25,y:49.75,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:75.1642,x:39.9,y:136.05,regY:13.2}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:93.0281,x:39.75,y:139.55,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3731,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.5696,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.0132,x:-73.1,y:58.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.5745,x:-68.75,y:144.6,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.0794,x:-68.6,y:144.6}},{t:this.instance,p:{regX:33.6,regY:10.1,rotation:-80.7584,x:-59.1,y:-12.25,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.2015,x:47.95,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:97.0575,x:42.15,y:49.65,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:74.743,x:40.4,y:136.1,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:91.6393,x:40.35,y:139.6,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.374,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.4417,x:1.4,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.9929,x:-73.4,y:58.45}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.553,x:-69,y:144.5,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.0587,x:-68.9,y:144.55}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-80.5463,x:-59.1,y:-12.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.3044,x:47.95,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:96.5957,x:41.95,y:49.7,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:74.3238,x:40.95,y:136,regY:13.2}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:90.2507,x:41.05,y:139.6,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.393,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3755,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9732,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.3163,x:1.4,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.9707,x:-73.6,y:58.35}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.5326,x:-69.3,y:144.4,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.0363,x:-69.2,y:144.5}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-80.3355,x:-59.1,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.4091,x:47.9,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:96.1312,x:41.75,y:49.65,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:73.9046,x:41.5,y:136,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:88.8657,x:41.55,y:139.55,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3776,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.1877,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.9494,x:-73.9,y:58.35}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.5102,x:-69.55,y:144.4,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.0162,x:-69.45,y:144.45}},{t:this.instance,p:{regX:33.5,regY:10.2,rotation:-80.1249,x:-59,y:-12.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.513,x:47.85,y:-20.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:95.6702,x:41.75,y:49.65,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:73.4844,x:42.2,y:136,regY:13.2}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:87.4783,x:42.1,y:139.55,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3785,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.0609,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.9299,x:-74.15,y:58.25}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.4906,x:-69.85,y:144.35,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.9947,x:-69.75,y:144.4}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-79.913,x:-59.15,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7751,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.6169,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:95.2072,x:41.65,y:49.6,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:73.0645,x:42.65,y:136,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:86.0894,x:42.7,y:139.5,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3793,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.9324,x:1.4,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.9089,x:-74.4,y:58.25}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.4687,x:-70.15,y:144.3,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.9741,x:-70,y:144.35}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-79.7019,x:-59.15,y:-12.15,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.7199,x:47.85,y:-21,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:94.7444,x:41.55,y:49.6,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:72.6461,x:43.25,y:136,regY:13.3}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9974,scaleY:0.9974,rotation:84.7008,x:43.25,y:139.4,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.381,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.8056,x:1.4,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.8875,x:-74.65,y:58.2}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.4475,x:-70.45,y:144.25,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.9517,x:-70.3,y:144.3}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-79.4901,x:-59.2,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.8239,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:94.2829,x:41.35,y:49.75,regX:-45.7}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:72.2259,x:43.75,y:136,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:83.3126,x:43.9,y:139.5,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3821,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.678,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.8672,x:-74.9,y:58.2}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.4267,x:-70.75,y:144.2,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.9308,x:-70.6,y:144.25}},{t:this.instance,p:{regX:33.6,regY:10.1,rotation:-79.2803,x:-59.1,y:-12.25,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.9278,x:47.9,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:93.8198,x:41.25,y:49.65,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:71.807,x:44.35,y:135.95,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:81.9232,x:44.5,y:139.45,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3829,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9363,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.5513,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.8459,x:-75.15,y:58.1}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.4044,x:-71,y:144.15,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.9096,x:-70.95,y:144.2}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-79.068,x:-59.15,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.0309,x:47.9,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:93.357,x:41,y:49.6,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:71.3863,x:44.95,y:135.85,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:80.5352,x:45.1,y:139.4,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3845,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.4238,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.8238,x:-75.4,y:58}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.3832,x:-71.3,y:144.1,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.8887,x:-71.25,y:144.15}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-78.8575,x:-59.15,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.1349,x:47.85,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:92.8944,x:41,y:49.55,regX:-45.8}},{t:this.instance_12,p:{regX:-7.6,scaleX:0.9974,scaleY:0.9974,rotation:70.9669,x:45.55,y:135.95,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:79.1468,x:45.7,y:139.35,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.85,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3855,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.2962,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.8024,x:-75.7,y:57.95}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.3628,x:-71.65,y:144.05,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.867,x:-71.5,y:144.1}},{t:this.instance,p:{regX:33.5,regY:10.2,rotation:-78.6456,x:-59,y:-12.05,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9977,scaleY:0.9977,rotation:96.2389,x:47.8,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:92.4329,x:40.8,y:49.55,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:70.5472,x:46.05,y:135.7,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:77.7581,x:46.2,y:139.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3864,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.1679,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.7822,x:-75.9,y:57.85}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.3417,x:-71.95,y:144,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.8468,x:-71.75,y:144}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-78.4357,x:-59.15,y:-12.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.342,x:47.9,y:-20.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:91.9697,x:40.7,y:49.6,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:70.1271,x:46.6,y:135.75,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:76.3696,x:46.9,y:139.2,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3874,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.0413,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.7611,x:-76.15,y:57.8}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.3197,x:-72.2,y:143.95,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.8256,x:-72.05,y:143.95}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-78.2226,x:-59.15,y:-12.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.4461,x:47.85,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:91.5068,x:40.55,y:49.55,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:69.7076,x:47.15,y:135.6,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:74.9809,x:47.45,y:139.2,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3889,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.914,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.7389,x:-76.45,y:57.7}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.2993,x:-72.5,y:143.85,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.8047,x:-72.3,y:143.9}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-78.0131,x:-59.15,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.5501,x:47.85,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:91.0457,x:40.5,y:49.45,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:69.2871,x:47.8,y:135.55,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:73.5914,x:48.05,y:139.1,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.39,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.7858,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.7176,x:-76.7,y:57.7}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.2778,x:-72.8,y:143.8,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.7835,x:-72.6,y:143.8}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-77.7996,x:-59.15,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:96.6542,x:47.75,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:90.5829,x:40.35,y:49.45,regX:-45.8}},{t:this.instance_12,p:{regX:-7.6,scaleX:0.9974,scaleY:0.9974,rotation:68.8687,x:48.35,y:135.6,regY:13.3}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9974,scaleY:0.9974,rotation:72.2034,x:48.8,y:138.85,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3908,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.6593,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.6972,x:-76.95,y:57.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.257,x:-73.05,y:143.75,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.7626,x:-72.95,y:143.8}},{t:this.instance,p:{regX:33.6,regY:10.1,rotation:-77.5897,x:-59.15,y:-12.25,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.7583,x:47.9,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:90.1201,x:40.2,y:49.5,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:68.448,x:48.9,y:135.35,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:70.8136,x:49.2,y:138.95,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3919,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.5313,x:1.5,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.6753,x:-77.2,y:57.55}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.2354,x:-73.35,y:143.7,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.7414,x:-73.2,y:143.65}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-77.3788,x:-59.15,y:-12.15,scaleX:0.9976,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.8615,x:47.95,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:89.6617,x:40.05,y:49.5,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:68.0278,x:49.45,y:135.3,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:69.4266,x:49.8,y:138.85,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3934,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.405,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.654,x:-77.5,y:57.45}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.215,x:-73.6,y:143.5,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.721,x:-73.45,y:143.6}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-77.1677,x:-59.2,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.9648,x:47.85,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:89.1998,x:39.9,y:49.45,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:67.6099,x:50,y:135.25,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:68.0384,x:50.4,y:138.7,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3944,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4629,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.277,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.6337,x:-77.7,y:57.4}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.1935,x:-73.9,y:143.5,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.6989,x:-73.75,y:143.55}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-76.9562,x:-59.15,y:-12.15,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:97.0698,x:47.9,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:88.7369,x:39.8,y:49.5,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:67.1891,x:50.55,y:135.1,regY:13.3}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9974,scaleY:0.9974,rotation:66.6479,x:50.95,y:138.6,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3953,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.462,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.149,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.6124,x:-78,y:57.3}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.1727,x:-74.2,y:143.4,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.6792,x:-74.05,y:143.45}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-76.7451,x:-59.15,y:-12.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:97.174,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:88.274,x:39.7,y:49.5,regX:-45.7}},{t:this.instance_12,p:{regX:-7.6,scaleX:0.9974,scaleY:0.9974,rotation:66.7708,x:51.15,y:135.1,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:65.26,x:51.7,y:138.5,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.397,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.462,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.0219,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.5904,x:-78.25,y:57.3}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.1515,x:-74.55,y:143.45,regX:4.9,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.6568,x:-74.35,y:143.4}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-76.534,x:-59.15,y:-12.15,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:97.2765,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:87.8119,x:39.55,y:49.45,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:66.3503,x:51.7,y:134.85,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:63.8716,x:52.25,y:138.4,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3979,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.462,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.8949,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.5691,x:-78.5,y:57.15}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.1296,x:-74.85,y:143.25,regX:5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.6359,x:-74.7,y:143.35}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-76.3223,x:-59.15,y:-12.05,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:97.3807,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:87.3495,x:39.45,y:49.4,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:65.9308,x:52.25,y:134.75,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:62.4831,x:52.7,y:138.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3989,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.462,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.7678,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.5489,x:-78.75,y:57.15}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.1088,x:-75.1,y:143.15,regX:5,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.6147,x:-74.95,y:143.3}},{t:this.instance,p:{regX:33.6,regY:10.2,rotation:-76.1121,x:-59,y:-12.25,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:97.485,x:47.85,y:-21.15,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:86.8871,x:39.25,y:49.35,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:65.5114,x:52.85,y:134.6,regY:13.2}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:61.0948,x:53.35,y:138.15,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3912,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.3998,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.462,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.6408,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.5293,x:-79,y:57}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.0876,x:-75.4,y:143.1,regX:5,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.593,x:-75.2,y:143.2}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-75.8998,x:-59.2,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:97.5893,x:47.9,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:86.4235,x:39.15,y:49.3,regX:-45.8}},{t:this.instance_12,p:{regX:-7.6,scaleX:0.9974,scaleY:0.9974,rotation:65.0918,x:53.4,y:134.6,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:59.706,x:53.9,y:138.05,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3905,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4015,x:-4.05,y:-59.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.462,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9355,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.5111,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.5072,x:-79.25,y:57}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.066,x:-75.65,y:143,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.5721,x:-75.45,y:143.15}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-75.6891,x:-59.2,y:-12.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7742,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:97.6918,x:47.85,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:85.9623,x:39.05,y:49.3,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:64.6714,x:53.9,y:134.4,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:58.318,x:54.5,y:137.9,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3905,x:33.75,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4023,x:-4.05,y:-59.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.462,x:-41.25,y:185.4,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9346,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-8.9722,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.386,x:1.5,y:-80.55}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.4868,x:-79.5,y:56.9}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.0452,x:-75.95,y:143,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.5509,x:-75.75,y:143.05}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-75.4772,x:-59.1,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7725,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:97.5733,x:47.9,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:86.5192,x:39.15,y:49.35,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:65.1835,x:53.25,y:134.55,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:59.9919,x:53.9,y:138,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3921,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4042,x:-4.05,y:-59.1,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4568,x:-41.25,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9372,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-8.9774,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.541,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.5152,x:-79.2,y:57}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.0809,x:-75.6,y:143.1,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.5804,x:-75.4,y:143.15}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-75.737,x:-59.15,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7707,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:97.4532,x:47.85,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:87.0758,x:39.3,y:49.35,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:65.6942,x:52.6,y:134.65,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:61.6671,x:53.05,y:138.2,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3931,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4053,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4523,x:-41.3,y:185.35,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9381,y:89.9,x:-30.05}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-8.9828,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.6981,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.5461,x:-78.9,y:57.1}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.1154,x:-75.25,y:143.05,regX:5,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.6111,x:-75.05,y:143.25}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-75.9946,x:-59.15,y:-12.15,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.769,x:-9.45,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:97.3339,x:47.85,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:87.6329,x:39.5,y:49.4,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:66.2054,x:51.9,y:134.8,regY:13.3}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9974,scaleY:0.9974,rotation:63.3413,x:52.35,y:138.35,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.394,x:33.8,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4068,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.448,x:-41.25,y:185.35,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9408,y:89.9,x:-30.05}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-8.988,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.856,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.5736,x:-78.55,y:57.15}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.1511,x:-74.95,y:143.35,regX:4.9,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.6395,x:-74.7,y:143.3}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-76.2547,x:-59.15,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7672,x:-9.5,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:97.2147,x:47.85,y:-20.95,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:88.189,x:39.65,y:49.4,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:66.7174,x:51.2,y:135.05,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:65.0169,x:51.65,y:138.5,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3949,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4078,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4436,x:-41.25,y:185.35,regY:-51.6,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9425,y:89.9,x:-30.05}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-8.9926,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.0113,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.6037,x:-78.3,y:57.25}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.1856,x:-74.5,y:143.35,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.6697,x:-74.35,y:143.4}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-76.5143,x:-59.2,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7664,x:-9.5,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9977,scaleY:0.9977,rotation:97.0946,x:47.9,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:88.7448,x:39.8,y:49.4,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:67.2283,x:50.55,y:135.1,regY:13.3}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9974,scaleY:0.9974,rotation:66.6915,x:50.9,y:138.6,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3966,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4089,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4391,x:-41.2,y:185.35,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9443,y:89.9,x:-30.05}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-8.9979,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.1684,x:1.5,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.6337,x:-77.95,y:57.35}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.2209,x:-74.15,y:143.45,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.6989,x:-74,y:143.5}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-76.7721,x:-59.2,y:-12.15,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7646,x:-9.5,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.9754,x:47.85,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:89.3015,x:39.95,y:49.45,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:67.7396,x:49.85,y:135.25,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:68.3666,x:50.25,y:138.75,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3975,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4113,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4348,x:-41.2,y:185.4,regY:-51.6,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9469,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0033,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.3257,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.6619,x:-77.65,y:57.4}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.257,x:-73.75,y:143.55,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.7288,x:-73.6,y:143.55}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-77.0308,x:-59.15,y:-12.15,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7637,x:-9.5,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.8544,x:47.95,y:-21.15,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:89.858,x:40.1,y:49.45,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:68.2517,x:49.2,y:135.3,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:70.0403,x:49.5,y:138.85,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.3984,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4123,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4302,x:-41.2,y:185.3,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9486,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0086,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.4819,x:1.5,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.6928,x:-77.3,y:57.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.2915,x:-73.4,y:143.65,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.7585,x:-73.25,y:143.65}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-77.2908,x:-59.1,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.2,rotation:1.7611,x:-9.5,y:48.95,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.7363,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:90.4093,x:40.25,y:49.5,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:68.7616,x:48.45,y:135.45,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:71.7158,x:48.85,y:138.95,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4002,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.414,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4267,x:-41.1,y:185.3,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9504,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0148,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.639,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.7211,x:-77.05,y:57.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.3256,x:-73.05,y:143.65,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.7875,x:-72.9,y:143.75}},{t:this.instance,p:{regX:33.6,regY:10.1,rotation:-77.5493,x:-59.1,y:-12.25,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7602,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.6171,x:47.85,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:90.9677,x:40.4,y:49.5,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:69.2741,x:47.8,y:135.5,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:73.3898,x:48.05,y:139.05,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.401,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4159,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4223,x:-41.1,y:185.3,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9531,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0202,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.7964,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.7512,x:-76.7,y:57.7}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.3609,x:-72.75,y:143.8,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.8169,x:-72.65,y:143.85}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-77.8079,x:-59.15,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7585,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:96.4972,x:47.8,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:91.5235,x:40.55,y:49.5,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:69.7861,x:47.1,y:135.65,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:75.0634,x:47.35,y:139.15,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4028,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4178,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4179,x:-41.1,y:185.3,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9549,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0255,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.953,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.7813,x:-76.35,y:57.7}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.3965,x:-72.4,y:143.85,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.8461,x:-72.2,y:143.9}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-78.0677,x:-59.15,y:-12.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7567,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.378,x:47.85,y:-20.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:92.0803,x:40.7,y:49.65,regX:-45.7}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:70.2968,x:46.4,y:135.65,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:76.7391,x:46.6,y:139.25,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4037,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4193,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4135,x:-41.2,y:185.3,regY:-51.6,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9566,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0307,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.1095,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.8097,x:-76.1,y:57.8}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.4314,x:-71.95,y:143.9,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.8757,x:-71.85,y:144}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-78.3264,x:-59.2,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.755,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9977,scaleY:0.9977,rotation:96.2582,x:47.85,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:92.6364,x:40.8,y:49.5,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:70.8083,x:45.75,y:135.75,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:78.415,x:46,y:139.3,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4054,x:33.9,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4212,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4091,x:-41.2,y:185.3,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9592,y:89.9,x:-29.95}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0354,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.2671,x:1.5,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.8406,x:-75.75,y:58}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.4667,x:-71.6,y:144,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.9045,x:-71.5,y:144.05}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-78.5849,x:-59.15,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7532,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9977,scaleY:0.9977,rotation:96.1384,x:47.85,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:93.1937,x:41,y:49.75,regX:-45.7}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:71.32,x:45.05,y:135.85,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:80.0878,x:45.2,y:139.35,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4062,x:33.95,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4223,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4038,x:-41.25,y:185.3,regY:-51.6,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9609,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0407,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.4238,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.8698,x:-75.4,y:58.05}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.5024,x:-71.25,y:144.05,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.9347,x:-71.15,y:144.1}},{t:this.instance,p:{regX:33.5,regY:10.2,rotation:-78.8447,x:-59.1,y:-12.15,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7523,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:96.0193,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:93.7504,x:41.15,y:49.55,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:71.8306,x:44.35,y:135.9,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:81.7637,x:44.5,y:139.45,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4081,x:34,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4238,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.4001,x:-41.25,y:185.3,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9627,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0461,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.5805,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.8989,x:-75.1,y:58.05}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.5377,x:-70.95,y:144.15,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.9638,x:-70.8,y:144.25}},{t:this.instance,p:{regX:33.5,regY:10.2,rotation:-79.1019,x:-59.05,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7506,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.8996,x:47.85,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:94.3065,x:41.2,y:49.75,regX:-45.7}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:72.3418,x:43.65,y:135.9,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:83.4372,x:43.75,y:139.45,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4089,x:34,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4266,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3958,x:-41.25,y:185.35,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9654,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0523,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.7373,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.9283,x:-74.8,y:58.15}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.5725,x:-70.55,y:144.25,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.993,x:-70.4,y:144.25}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-79.3617,x:-59.15,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7488,x:-9.4,y:49,regY:-21.9}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.7798,x:47.9,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:94.8641,x:41.35,y:49.7,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:72.8535,x:42.95,y:136,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:85.1127,x:43,y:139.45,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4099,x:34,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4267,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3913,x:-41.3,y:185.35,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9672,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0576,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.8943,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.9576,x:-74.5,y:58.25}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.6071,x:-70.15,y:144.3,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.0237,x:-70.05,y:144.3}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-79.6211,x:-59.15,y:-12.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7471,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.6599,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:95.4203,x:41.5,y:49.7,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:73.3654,x:42.3,y:136,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:86.7876,x:42.3,y:139.55,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4116,x:34,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4283,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.387,x:-41.25,y:185.35,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9698,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0638,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.0512,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-97.9876,x:-74.2,y:58.25}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.6423,x:-69.8,y:144.3,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.0521,x:-69.7,y:144.4}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-79.88,x:-59.2,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7453,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.5412,x:47.9,y:-20.95,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:95.9769,x:41.65,y:49.7,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:73.8763,x:41.55,y:136,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:88.4615,x:41.55,y:139.55,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4125,x:34,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4302,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3826,x:-41.25,y:185.4,regY:-51.6,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9716,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0692,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.2082,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.0159,x:-73.85,y:58.3}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.6784,x:-69.5,y:144.45,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.0821,x:-69.35,y:144.45}},{t:this.instance,p:{regX:33.5,regY:10.2,rotation:-80.139,x:-59.05,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7445,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9977,rotation:95.4215,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:96.5332,x:41.85,y:49.6,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:74.3876,x:40.9,y:136.05,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:90.1324,x:40.85,y:139.6,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4142,x:34,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4312,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3772,x:-41.25,y:185.4,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9733,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9947,scaleY:0.9947,rotation:-9.0747,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.3653,x:1.45,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.0459,x:-73.55,y:58.45}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.7129,x:-69.15,y:144.5,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.112,x:-69,y:144.5}},{t:this.instance,p:{regX:33.5,regY:10.2,rotation:-80.3987,x:-59.05,y:-12.15,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7427,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9977,scaleY:0.9977,rotation:95.3018,x:47.95,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:97.0902,x:42.05,y:49.7,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:74.8978,x:40.2,y:136,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:91.8077,x:40.2,y:139.55,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4151,x:34.05,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4327,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3729,x:-41.25,y:185.35,regY:-51.6,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9759,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.079,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.5216,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.0759,x:-73.25,y:58.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.7486,x:-68.7,y:144.5,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.1419,x:-68.6,y:144.55}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-80.6565,x:-59.15,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.741,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.183,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:97.6469,x:42.05,y:49.65,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:75.41,x:39.5,y:136,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:93.4811,x:39.5,y:139.5,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4169,x:34.05,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4346,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3683,x:-41.15,y:185.35,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9777,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0843,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.6786,x:1.4,y:-80.6}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.1052,x:-72.9,y:58.5}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.7835,x:-68.45,y:144.65,regX:4.9,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.1711,x:-68.25,y:144.7}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-80.9154,x:-59.1,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7392,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:95.0624,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:98.2027,x:42.3,y:49.7,regX:-45.8}},{t:this.instance_12,p:{regX:-7.6,scaleX:0.9974,scaleY:0.9974,rotation:75.921,x:38.85,y:136.1,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:95.1567,x:38.65,y:139.5,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4178,x:34.05,y:185.5,regX:3.4}},{t:this.instance_9,p:{rotation:11.4365,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.364,x:-41.15,y:185.35,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9794,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.0897,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.8351,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.1353,x:-72.6,y:58.6}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.8176,x:-68.1,y:144.6,regX:5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.2003,x:-67.95,y:144.75}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-81.1754,x:-59.15,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7384,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.9437,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:98.76,x:42.5,y:49.85,regX:-45.7}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:76.4329,x:38.15,y:136,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:96.8313,x:37.95,y:139.5,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4195,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4372,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3595,x:-41.15,y:185.35,regY:-51.6,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9821,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.095,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.9916,x:1.45,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.1637,x:-72.25,y:58.7}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.8528,x:-67.8,y:144.6,regX:5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.2309,x:-67.55,y:144.8}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-81.4325,x:-59.1,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7366,x:-9.4,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.8232,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:99.3174,x:42.55,y:49.7,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:76.9447,x:37.5,y:135.85,regY:13.2}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:98.5057,x:37.35,y:139.45,regY:10.5}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4203,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4391,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3551,x:-41.35,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9838,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1004,x:24.05,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.149,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.1947,x:-71.95,y:58.75}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.8889,x:-67.45,y:144.7,regX:5,regY:-9.1}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.2586,x:-67.15,y:144.85}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-81.6922,x:-59.15,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7357,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.7046,x:47.95,y:-20.9,regX:-32.9}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:99.873,x:42.6,y:49.85,regX:-45.7}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:77.4552,x:36.8,y:135.9,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:100.1803,x:36.5,y:139.45,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4212,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.441,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3507,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9856,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1057,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.3057,x:1.5,y:-80.65}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.2238,x:-71.6,y:58.75}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.923,x:-66.9,y:144.8,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.2888,x:-66.85,y:144.9}},{t:this.instance,p:{regX:33.5,regY:10.2,rotation:-81.9516,x:-59,y:-12.15,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.734,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.584,x:47.9,y:-21,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:100.4305,x:42.85,y:49.75,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:77.9672,x:36.1,y:135.85,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:101.8556,x:35.8,y:139.35,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.423,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4417,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3472,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9882,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1128,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.4632,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.2531,x:-71.35,y:58.85}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.9575,x:-66.55,y:144.85,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.3185,x:-66.5,y:144.95}},{t:this.instance,p:{regX:33.5,regY:10.2,rotation:-82.2099,x:-59.05,y:-12.05,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7322,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9977,scaleY:0.9977,rotation:94.4654,x:47.8,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:100.9871,x:43,y:49.85,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:78.4786,x:35.5,y:135.75,regY:13.2}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:103.5303,x:35.05,y:139.3,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4239,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4436,x:-4.05,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3419,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9901,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1182,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.6191,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.2824,x:-70.95,y:58.9}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-115.9932,x:-66.25,y:144.95,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.3477,x:-66.1,y:145}},{t:this.instance,p:{regX:33.6,regY:10.1,rotation:-82.4682,x:-59.1,y:-12.3,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7313,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.3459,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:101.5428,x:43.2,y:49.8,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:78.989,x:34.85,y:135.65,regY:13.2}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:105.2045,x:34.4,y:139.25,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4256,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4454,x:-4.1,y:-59.15,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:6.3373,x:-41.3,y:185.45,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9918,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1235,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.7761,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.3108,x:-70.65,y:58.95}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-116.0277,x:-65.85,y:145,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.3768,x:-65.75,y:145.05}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-82.728,x:-59.15,y:-12.05,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7296,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:94.2255,x:47.8,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:102.1,x:43.2,y:49.95,regX:-45.7}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:79.5018,x:34,y:135.7,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:106.8789,x:33.7,y:139.15,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4265,x:34.25,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.447,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3331,x:-41.3,y:185.5,regY:-51.5,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9945,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.128,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.9331,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.3417,x:-70.35,y:59}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-116.0629,x:-65.45,y:145.05,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.4063,x:-65.35,y:145.1}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-82.9868,x:-59.1,y:-12.05,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7278,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:94.1069,x:47.85,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:102.6563,x:43.45,y:49.85,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:80.0131,x:33.4,y:135.65,regY:13.2}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:108.5547,x:32.95,y:139.05,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4283,x:34.3,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4472,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3285,x:-41.3,y:185.5,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9962,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1333,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.0902,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.3702,x:-70.05,y:59.1}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-116.0978,x:-65.1,y:145.05,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.4355,x:-65.05,y:145.15}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-83.2464,x:-59.1,y:-12.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7261,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:93.9874,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:103.2129,x:43.7,y:49.85,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:80.5246,x:32.65,y:135.5,regY:13.3}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9974,scaleY:0.9974,rotation:110.2292,x:32.3,y:138.85,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4292,x:34.3,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4491,x:-4.1,y:-59.15,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:6.3251,x:-41.3,y:185.55,regY:-51.5,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:3.9988,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1387,x:24,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.2471,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.4002,x:-69.7,y:59.15}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-116.1327,x:-64.7,y:145.1,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.4654,x:-64.65,y:145.2}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-83.5056,x:-59.15,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7243,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9978,scaleY:0.9978,rotation:93.8679,x:47.8,y:-20.95,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:103.769,x:43.75,y:49.9,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9975,scaleY:0.9975,rotation:81.0354,x:32,y:135.35,regY:13.3}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9974,scaleY:0.9974,rotation:111.9041,x:31.55,y:138.75,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4309,x:34.3,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4515,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3198,x:-41.35,y:185.55,regY:-51.5,scaleX:0.9951,scaleY:0.9951,regX:1.4}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:4.0005,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.144,x:23.95,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.4035,x:1.45,y:-80.7}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.4286,x:-69.4,y:59.15}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-116.1676,x:-64.4,y:145.15,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.4939,x:-64.25,y:145.2}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-83.7639,x:-59.1,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7235,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:93.7486,x:47.9,y:-21.1,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:104.3266,x:44,y:49.85,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:81.5467,x:31.4,y:135.3,regY:13.2}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:113.579,x:30.75,y:138.7,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4318,x:34.4,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4516,x:-4.1,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3154,x:-41.2,y:185.5,regY:-51.5,scaleX:0.9951,scaleY:0.9951,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:4.0033,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1494,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.5607,x:1.45,y:-80.8}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.4587,x:-69.1,y:59.25}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-116.2033,x:-64.05,y:145.2,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.5233,x:-63.95,y:145.3}},{t:this.instance,p:{regX:33.5,regY:10.1,rotation:-84.0222,x:-59.1,y:-12.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7217,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9977,scaleY:0.9977,rotation:93.6274,x:47.95,y:-21,regX:-33}},{t:this.instance_13,p:{regY:13.1,scaleX:0.9975,scaleY:0.9975,rotation:104.8817,x:43.95,y:49.85,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:82.057,x:30.6,y:135.15,regY:13.3}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9974,scaleY:0.9974,rotation:115.2541,x:30.15,y:138.5,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4327,x:34.4,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4535,x:-4.15,y:-59.15,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:6.311,x:-41.2,y:185.5,regY:-51.5,scaleX:0.9951,scaleY:0.9951,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:4.0059,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1547,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.7181,x:1.45,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.4888,x:-68.75,y:59.25}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-116.2378,x:-63.7,y:145.15,regX:5,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.5537,x:-63.6,y:145.35}},{t:this.instance,p:{regX:33.5,regY:10.2,rotation:-84.2821,x:-59,y:-12.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.72,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:93.5097,x:47.9,y:-21.05,regX:-33}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:105.4402,x:44.2,y:49.85,regX:-45.8}},{t:this.instance_12,p:{regX:-7.7,scaleX:0.9974,scaleY:0.9974,rotation:82.5699,x:29.95,y:135,regY:13.3}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:116.9269,x:29.35,y:138.45,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4344,x:34.4,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.4561,x:-4.15,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3064,x:-41.25,y:185.5,regY:-51.5,scaleX:0.9952,scaleY:0.9952,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:4.0077,y:89.9,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1609,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.8747,x:1.4,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.5172,x:-68.45,y:59.25}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-116.2738,x:-63.3,y:145.2,regX:5,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.5821,x:-63.25,y:145.4}},{t:this.instance,p:{regX:33.5,regY:10.2,rotation:-84.541,x:-59.05,y:-12.1,scaleX:0.9976,scaleY:0.9976}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.1,rotation:1.7182,x:-9.35,y:49.15,regY:-21.8}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9978,scaleY:0.9978,rotation:93.3895,x:47.95,y:-20.9,regX:-32.9}},{t:this.instance_13,p:{regY:13,scaleX:0.9975,scaleY:0.9975,rotation:105.9955,x:44.35,y:50.1,regX:-45.7}},{t:this.instance_12,p:{regX:-7.6,scaleX:0.9974,scaleY:0.9974,rotation:83.0788,x:29.35,y:135.05,regY:13.2}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9974,scaleY:0.9974,rotation:118.6007,x:28.6,y:138.4,regY:10.6}},{t:this.instance_10,p:{scaleX:0.9949,scaleY:0.9949,rotation:-3.4353,x:34.4,y:185.5,regX:3.5}},{t:this.instance_9,p:{rotation:11.457,x:-4.15,y:-59.15,scaleX:0.9983,scaleY:0.9983}},{t:this.instance_8,p:{rotation:6.3022,x:-41.25,y:185.5,regY:-51.5,scaleX:0.9951,scaleY:0.9951,regX:1.5}},{t:this.instance_7,p:{regY:-42.7,scaleX:0.9956,scaleY:0.9956,rotation:4.0085,y:89.85,x:-30}},{t:this.instance_6,p:{regX:-0.1,scaleX:0.9948,scaleY:0.9948,rotation:-9.1663,x:24,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-12.0297,x:1.4,y:-80.75}},{t:this.instance_3,p:{scaleX:0.9975,scaleY:0.9975,rotation:-98.5473,x:-68.15,y:59.3}},{t:this.instance_2,p:{scaleX:0.9975,scaleY:0.9975,rotation:-116.3083,x:-62.9,y:145.35,regX:4.9,regY:-9}},{t:this.instance_1,p:{scaleX:0.9972,scaleY:0.9972,rotation:-122.6118,x:-62.9,y:145.4}},{t:this.instance,p:{regX:33.6,regY:10.2,rotation:-84.7989,x:-59.1,y:-12.2,scaleX:0.9977,scaleY:0.9977}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99.5,-212.4,188.2,510);


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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{rotation:1.7768,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9979,scaleY:0.9979,rotation:88.322,x:47.9,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9977,scaleY:0.9977,rotation:71.3871,x:50.7,y:50,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9975,scaleY:0.9975,rotation:49.1454,x:86.15,y:128.4,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9975,scaleY:0.9975,rotation:53.3813,x:87.95,y:131.55,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9949,scaleY:0.9949,rotation:-2.6407,y:183.7,x:39.55}},{t:this.instance_9,p:{scaleX:0.9984,scaleY:0.9984,rotation:11.7954,y:-59.25,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9952,scaleY:0.9952,rotation:8.009,x:-37.3,y:186.2}},{t:this.instance_7,p:{regY:-42.8,rotation:2.1369,x:-28.85,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5,scaleX:0.9948,scaleY:0.9948,rotation:-11.3754,x:25.65,y:87.3}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.4825,x:1.45,y:-80.7}},{t:this.instance_3,p:{regY:7.6,rotation:-153.9425,x:-89.1,y:53.45,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.8,rotation:-168.7722,x:-14.8,y:98.2,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-155.7627,x:-14.75,y:98.4,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9978,scaleY:0.9978,rotation:-67.6913,x:-59,y:-12.25,regX:33.8,regY:10.3}}]}).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.3456,x:47.8,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:71.4678,x:50.65,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.2265,x:85.95,y:128.45,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.7,scaleX:0.9974,scaleY:0.9974,rotation:53.463,x:87.7,y:131.65,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.64,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7874,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1361,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.3403,x:1.55,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-153.3989,x:-89.25,y:53.4,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-168.2303,x:-15.4,y:98.9,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-155.2211,x:-15.25,y:99.05,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.6375,x:-58.95,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.3684,x:47.8,y:-21.2}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:71.5498,x:50.55,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.3078,x:85.75,y:128.5,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:53.5446,x:87.65,y:131.65,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.64,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7785,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1361,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.1983,x:1.5,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-152.8564,x:-89.25,y:53.4,regX:44.8,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.8,rotation:-167.6864,x:-15.85,y:99.5,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-154.6771,x:-15.75,y:99.65,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.5812,x:-58.95,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.392,x:47.85,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:71.6318,x:50.6,y:50.1,regX:-45.6,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.39,x:85.6,y:128.65,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:53.6273,x:87.5,y:131.65,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.64,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7702,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1361,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.0556,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-152.312,x:-89.35,y:53.4,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-167.1438,x:-16.4,y:100.2,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-154.134,x:-16.2,y:100.4,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.5262,x:-58.95,y:-12.2,regX:33.7,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.4165,x:47.8,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:71.7133,x:50.5,y:49.8,regX:-45.8,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.4726,x:85.45,y:128.65,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:53.7074,x:87.3,y:131.7,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.64,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7603,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1361,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.9128,x:1.5,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-151.7682,x:-89.35,y:53.35,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-9,rotation:-166.6012,x:-16.8,y:101.05,scaleX:0.9976,scaleY:0.9976,regX:4.6}},{t:this.instance_1,p:{rotation:-153.5902,x:-16.7,y:101.05,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.4712,x:-58.95,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.4402,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:71.7962,x:50.55,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.5546,x:85.3,y:128.75,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.7,scaleX:0.9974,scaleY:0.9974,rotation:53.7902,x:87.05,y:131.85,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7513,y:-59.2,x:-4.2,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1361,x:-28.8,y:90.4,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.7704,x:1.6,y:-80.7}},{t:this.instance_3,p:{regY:7.6,rotation:-151.2258,x:-89.3,y:53.25,regX:44.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-166.0564,x:-17.4,y:101.45,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-153.048,x:-17.25,y:101.7,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.417,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.4639,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:71.8782,x:50.45,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.6368,x:85.2,y:128.75,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:53.8717,x:87,y:131.85,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7424,y:-59.2,x:-4.2,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1361,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.6277,x:1.55,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-150.6824,x:-89.45,y:53.3,regX:44.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-165.5137,x:-17.9,y:102.2,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-152.5038,x:-17.8,y:102.35,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.362,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.4876,x:47.9,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:71.9586,x:50.45,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.7182,x:85.05,y:128.8,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:53.9534,x:86.9,y:131.9,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7336,y:-59.2,x:-4.2,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1361,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.4851,x:1.6,y:-80.7}},{t:this.instance_3,p:{regY:7.6,rotation:-150.1392,x:-89.55,y:53.2,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-164.9713,x:-18.45,y:102.8,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-151.9618,x:-18.25,y:103.05,regX:14.3,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.3067,x:-58.85,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.4,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.5103,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.0398,x:50.45,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.7984,x:84.9,y:128.8,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:54.0357,x:86.75,y:131.85,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7256,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-10.3425,x:1.55,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-149.5961,x:-89.7,y:53.25,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-164.4276,x:-19,y:103.45,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-151.4174,x:-18.75,y:103.65,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.252,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.4,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.534,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.1227,x:50.35,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.8818,x:84.75,y:128.85,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:54.1167,x:86.6,y:131.95,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7158,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-10.2001,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-149.0531,x:-89.65,y:53.2,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-163.8846,x:-19.5,y:104.1,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-150.8747,x:-19.35,y:104.3,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.1967,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.4,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.5577,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.2047,x:50.35,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.9627,x:84.5,y:129,regY:13.7,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:54.1989,x:86.4,y:132.05,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7075,y:-59.2,x:-4.2,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.057,x:1.55,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-148.5091,x:-89.65,y:53.15,regX:44.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-163.3419,x:-20.1,y:104.75,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-150.3315,x:-19.95,y:104.95,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.1413,x:-58.9,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.4,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.5813,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.2865,x:50.3,y:49.85,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.0454,x:84.5,y:129,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:54.2811,x:86.25,y:132.1,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6988,y:-59.2,x:-4.2,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.9137,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-147.9653,x:-89.8,y:53.1,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-9,rotation:-162.7971,x:-20.65,y:105.45,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-149.7883,x:-20.45,y:105.5,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.0863,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.4,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.605,x:47.8,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.3677,x:50.35,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.1275,x:84.35,y:129.1,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:54.3634,x:86.1,y:132.15,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6898,y:-59.2,x:-4.2,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.7716,x:1.55,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-147.4225,x:-89.85,y:53.15,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-162.2543,x:-21.05,y:105.95,scaleX:0.9976,scaleY:0.9976,regX:4.6}},{t:this.instance_1,p:{rotation:-149.2452,x:-21,y:106.1,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.031,x:-58.95,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.4,y:48.95}},{t:this.instance_14,p:{scaleX:0.9979,scaleY:0.9978,rotation:88.6287,x:47.8,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.4494,x:50.25,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.2085,x:84.15,y:129.1,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:54.4451,x:85.95,y:132.2,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6818,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.6293,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-146.8807,x:-89.9,y:53.1,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-9,rotation:-161.7108,x:-21.75,y:106.7,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-148.7014,x:-21.45,y:106.85,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.9768,x:-58.95,y:-12.4,regX:33.8,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.4,y:48.95}},{t:this.instance_14,p:{scaleX:0.9979,scaleY:0.9978,rotation:88.6523,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.5312,x:50.25,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.2899,x:83.95,y:129,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:54.5261,x:85.85,y:132.25,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.672,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.4864,x:1.55,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-146.3364,x:-90,y:52.95,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-161.1676,x:-22.35,y:107.25,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-148.1586,x:-22.15,y:107.4,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.9222,x:-58.9,y:-12.25,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.4,y:48.95}},{t:this.instance_14,p:{scaleX:0.9979,scaleY:0.9978,rotation:88.676,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:72.6138,x:50.2,y:50,regX:-45.6,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.3715,x:83.9,y:129.15,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:54.6071,x:85.75,y:132.25,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6391,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6631,y:-59.3,x:-4.05,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.3434,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.6,rotation:-145.7929,x:-90.05,y:52.9,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-160.6241,x:-22.85,y:107.85,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-147.6143,x:-22.75,y:108,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.8661,x:-58.9,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.4,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.6979,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.6956,x:50.1,y:49.85,regX:-45.8,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.4543,x:83.7,y:129.2,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:54.6896,x:85.55,y:132.3,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6541,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-9.2014,x:1.55,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-145.2496,x:-90.1,y:52.9,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-160.0813,x:-23.35,y:108.4,scaleX:0.9975,scaleY:0.9975,regX:4.6}},{t:this.instance_1,p:{rotation:-147.0717,x:-23.3,y:108.65,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.8111,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.4,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.7216,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.7763,x:50.15,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.5359,x:83.65,y:129.3,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:54.772,x:85.4,y:132.4,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.646,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.0586,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-144.7074,x:-90.15,y:52.9,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-159.537,x:-24.05,y:109,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-146.5285,x:-23.85,y:109.2,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.7557,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.7452,x:47.9,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.8594,x:50.05,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.6181,x:83.45,y:129.35,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.7,scaleX:0.9973,scaleY:0.9973,rotation:54.8532,x:85.1,y:132.5,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6361,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.915,x:1.55,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-144.1631,x:-90.2,y:52.95,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-9,rotation:-158.9945,x:-24.7,y:109.7,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-145.9836,x:-24.45,y:109.8,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.702,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.7689,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.9404,x:50.1,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.6984,x:83.3,y:129.35,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:54.9354,x:85.1,y:132.5,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6272,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1353,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.7722,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-143.6198,x:-90.25,y:52.85,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-158.4517,x:-25.25,y:110.25,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-145.4411,x:-25.1,y:110.4,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.6458,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.7925,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.0216,x:50.1,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.7807,x:83.2,y:129.4,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.0167,x:84.95,y:132.5,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6182,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.6305,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-143.077,x:-90.3,y:52.8,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-157.9089,x:-25.95,y:110.85,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-144.8976,x:-25.7,y:111,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.5916,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.8162,x:47.8,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.1042,x:50,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.8623,x:83.05,y:129.4,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.0991,x:84.8,y:132.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6095,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.4877,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-142.5338,x:-90.4,y:52.75,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-157.3653,x:-26.5,y:111.4,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-144.3542,x:-26.2,y:111.65,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.5367,x:-58.8,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.8399,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.186,x:50,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.9446,x:82.8,y:129.55,regY:13.7,regX:-8}},{t:this.instance_11,p:{regY:10.7,scaleX:0.9973,scaleY:0.9973,rotation:55.18,x:84.55,y:132.7,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6004,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.3445,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-141.9903,x:-90.45,y:52.75,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.8,rotation:-156.8222,x:-27.1,y:111.85,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-143.8118,x:-26.9,y:112.1,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.4818,x:-58.9,y:-12.3,regX:33.7,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.8635,x:47.8,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.2673,x:49.9,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.0256,x:82.75,y:129.6,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.2618,x:84.5,y:132.65,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5914,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.2028,x:1.7,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-141.4475,x:-90.6,y:52.75,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-9,rotation:-156.2789,x:-27.65,y:112.6,scaleX:0.9975,scaleY:0.9975,regX:4.6}},{t:this.instance_1,p:{rotation:-143.2684,x:-27.5,y:112.7,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.4272,x:-58.95,y:-12.35,regX:33.8,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.8863,x:47.8,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:73.3494,x:49.9,y:49.75,regX:-45.8,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.1078,x:82.6,y:129.55,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.3428,x:84.4,y:132.75,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5834,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.0595,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-140.9033,x:-90.55,y:52.7,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-155.7348,x:-28.3,y:113,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-142.7251,x:-28.15,y:113.2,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.3711,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.91,x:47.8,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.4311,x:49.9,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.19,x:82.45,y:129.65,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.4254,x:84.25,y:132.8,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5744,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.9171,x:1.7,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-140.3603,x:-90.7,y:52.7,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-155.1924,x:-28.85,y:113.55,scaleX:0.9975,scaleY:0.9975,regX:4.6}},{t:this.instance_1,p:{rotation:-142.1817,x:-28.8,y:113.85,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.3162,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.9336,x:47.9,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.5126,x:49.7,y:49.95,regX:-45.7,regY:13.1}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.2717,x:82.25,y:129.8,regY:13.7,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:55.5074,x:84.1,y:132.85,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5664,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.7739,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-139.8172,x:-90.6,y:52.6,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-154.6497,x:-29.6,y:114.1,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-141.6385,x:-29.35,y:114.45,regX:14.3,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.2608,x:-58.85,y:-12.25,regX:33.7,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.9573,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.5939,x:49.8,y:49.75,regX:-45.8,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.3535,x:82.1,y:129.65,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:55.5888,x:84,y:132.8,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6382,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5566,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.6324,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-139.2732,x:-90.7,y:52.6,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-154.1064,x:-30.25,y:114.7,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-141.0958,x:-30.1,y:114.9,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.2063,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.981,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.6771,x:49.85,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.4352,x:82,y:129.75,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:55.6715,x:83.75,y:132.9,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6373,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5476,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.4886,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-138.7302,x:-90.75,y:52.55,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-153.5623,x:-30.9,y:115.2,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-140.5525,x:-30.6,y:115.55,regX:14.3,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.1514,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:89.0046,x:47.9,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.7583,x:49.8,y:50.05,regX:-45.6,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.5164,x:81.9,y:129.8,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.7527,x:83.6,y:133,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6373,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5387,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.3464,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-138.1876,x:-90.85,y:52.55,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-153.0203,x:-31.6,y:115.7,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-140.0084,x:-31.35,y:115.9,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.0969,x:-58.85,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:89.0283,x:47.9,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.8404,x:49.75,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.598,x:81.65,y:129.95,regY:13.7,regX:-8}},{t:this.instance_11,p:{regY:10.7,scaleX:0.9974,scaleY:0.9974,rotation:55.8341,x:83.35,y:133.1,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6373,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5306,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1344,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3747,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.2033,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-137.644,x:-90.9,y:52.45,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.8,rotation:-152.4762,x:-32.25,y:116.25,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-139.4659,x:-31.95,y:116.6,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.0412,x:-58.8,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:89.0519,x:47.8,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.9217,x:49.65,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.6798,x:81.55,y:129.95,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.9161,x:83.3,y:133,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6373,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5207,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3739,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.0612,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-137.1007,x:-90.9,y:52.5,regX:44.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-151.9328,x:-33,y:116.85,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-138.922,x:-32.7,y:117.05,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-65.9862,x:-58.9,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:89.0756,x:47.8,y:-21.35}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:74.0038,x:49.7,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.7615,x:81.45,y:129.95,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:55.9978,x:83.15,y:133.1,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6373,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5117,y:-59.3,x:-3.9,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0067,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1335,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3739,x:25.55,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-6.9183,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-136.5575,x:-90.95,y:52.45,regX:44.8,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-151.3901,x:-33.5,y:117.4,scaleX:0.9975,scaleY:0.9975,regX:4.6}},{t:this.instance_1,p:{rotation:-138.3792,x:-33.4,y:117.5,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-65.9309,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:89.0511,x:47.8,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.9189,x:49.65,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.6748,x:81.6,y:129.95,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.9037,x:83.4,y:133.1,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9949,scaleY:0.9949,rotation:-2.6435,y:183.65,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5272,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1379,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3756,x:25.55,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.048,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-137.0598,x:-91,y:52.45,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-151.8932,x:-33.05,y:116.9,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-138.8792,x:-32.7,y:117.15,regX:14.3,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-65.9795,x:-58.85,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7707,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:89.0274,x:47.9,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.8349,x:49.75,y:49.85,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.5862,x:81.7,y:129.95,regY:13.7,regX:-8}},{t:this.instance_11,p:{regY:10.7,scaleX:0.9974,scaleY:0.9974,rotation:55.8096,x:83.35,y:133.1,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6506,y:183.6,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5413,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1423,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3784,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.1777,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.6,rotation:-137.5615,x:-90.8,y:52.45,regX:44.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-152.3974,x:-32.3,y:116.35,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-139.377,x:-32.05,y:116.65,regX:14.3,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.027,x:-58.85,y:-12.25,regX:33.7,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.769,x:-9.45,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:89.0029,x:47.9,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.7506,x:49.8,y:50.05,regX:-45.6,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.5001,x:81.85,y:129.85,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.7174,x:83.65,y:132.95,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9949,scaleY:0.9949,rotation:-2.6566,y:183.6,x:39.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5566,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0076,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1467,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3801,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.3084,x:1.7,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-138.0635,x:-90.85,y:52.55,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-152.9019,x:-31.7,y:115.9,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-139.8764,x:-31.55,y:116.1,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.0757,x:-58.85,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7672,x:-9.5,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.9792,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.666,x:49.8,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.4127,x:81.9,y:129.7,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.6233,x:83.7,y:132.8,regX:-10.6}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.6637,y:183.6,x:39.45}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5717,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0085,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1511,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3828,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.4373,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-138.5651,x:-90.85,y:52.5,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-153.4052,x:-31.1,y:115.45,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-140.3762,x:-30.85,y:115.7,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.1227,x:-58.8,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7655,x:-9.5,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.9556,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.5811,x:49.8,y:49.75,regX:-45.8,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.3249,x:82.1,y:129.75,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.5288,x:83.95,y:132.9,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.6699,y:183.65,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.5861,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0085,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1555,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3856,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.5672,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-139.0675,x:-90.75,y:52.6,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.8,rotation:-153.91,x:-30.45,y:114.8,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-140.8751,x:-30.35,y:115.15,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.171,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7646,x:-9.5,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.931,x:47.9,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:73.4969,x:49.9,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.2381,x:82.2,y:129.8,regY:13.7,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.4349,x:84.05,y:132.85,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.676,y:183.65,x:39.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6021,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0085,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1599,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3882,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-7.6961,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-139.5696,x:-90.75,y:52.55,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-154.4125,x:-29.95,y:114.45,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-141.3746,x:-29.65,y:114.7,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.2188,x:-58.9,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7637,x:-9.5,y:48.95}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.9074,x:47.8,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:73.4128,x:49.85,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.1495,x:82.45,y:129.65,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:55.3406,x:84.3,y:132.8,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.6831,y:183.65,x:39.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6156,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0085,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1643,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3901,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.8269,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-140.0716,x:-90.65,y:52.6,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-154.9159,x:-29.35,y:113.9,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-141.8732,x:-29.05,y:114.15,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.2667,x:-58.85,y:-12.25,regX:33.7,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7611,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.8837,x:47.8,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:73.3275,x:49.9,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.063,x:82.65,y:129.6,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.2472,x:84.4,y:132.75,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6893,y:183.65,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6308,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0085,x:-37.25,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1687,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3927,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-7.956,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-140.5733,x:-90.55,y:52.7,regX:44.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-155.421,x:-28.7,y:113.35,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-142.3711,x:-28.5,y:113.6,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.3154,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7593,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.8591,x:47.8,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.2437,x:50,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.9751,x:82.8,y:129.55,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.7,scaleX:0.9973,scaleY:0.9973,rotation:55.1528,x:84.5,y:132.7,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.6954,y:183.65,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6469,y:-59.3,x:-3.95,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0093,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1731,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3963,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.086,x:1.65,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-141.0753,x:-90.45,y:52.8,regX:44.8,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-155.9242,x:-28.2,y:112.85,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-142.8696,x:-27.9,y:113.15,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.3624,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7576,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.8355,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.1583,x:50.05,y:49.85,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.8872,x:82.9,y:129.45,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:55.0595,x:84.7,y:132.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.7024,y:183.6,x:39.7}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6603,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0093,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1775,x:-28.8,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3972,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.2152,x:1.65,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-141.5766,x:-90.55,y:52.75,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-156.428,x:-27.6,y:112.4,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-143.37,x:-27.35,y:112.6,regX:14.3,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.4115,x:-58.95,y:-12.45,regX:33.8,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7558,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.8109,x:47.8,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:73.0751,x:50,y:50.05,regX:-45.6,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.8,x:83.05,y:129.35,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:54.9651,x:84.9,y:132.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.7086,y:183.6,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6754,y:-59.2,x:-4.1,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0102,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1827,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.3999,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.3445,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-142.0785,x:-90.55,y:52.75,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-156.9325,x:-27.05,y:111.8,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-143.869,x:-26.75,y:112.1,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.459,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.755,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.7873,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.9897,x:50.05,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.7127,x:83.25,y:129.4,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.7,scaleX:0.9974,scaleY:0.9974,rotation:54.8712,x:84.85,y:132.6,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.7156,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.6898,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0102,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.7,rotation:2.1871,x:-28.85,y:90.45,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4023,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-8.4746,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.6,rotation:-142.5813,x:-90.35,y:52.7,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-157.4361,x:-26.5,y:111.3,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-144.3675,x:-26.2,y:111.55,regX:14.3,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.5068,x:-58.9,y:-12.4,regX:33.8,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7532,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.7636,x:47.9,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.9055,x:50.1,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.6262,x:83.4,y:129.4,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:54.7771,x:85.15,y:132.45,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.7218,y:183.6,x:39.5}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.705,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0102,x:-37.35,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.1915,x:-28.7,y:90.35,regX:1.5}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4044,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.6047,x:1.7,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-143.0831,x:-90.35,y:52.75,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-157.94,x:-25.95,y:110.8,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-144.8662,x:-25.7,y:110.95,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.5555,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7515,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.7391,x:47.9,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.8212,x:50.1,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.5384,x:83.55,y:129.3,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:54.6835,x:85.25,y:132.3,regX:-10.6}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.728,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7211,y:-59.2,x:-4.1,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0111,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.195,x:-28.7,y:90.35,regX:1.5}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4078,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.7342,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-143.5848,x:-90.3,y:52.85,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-158.443,x:-25.3,y:110.25,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-145.366,x:-25.1,y:110.45,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.603,x:-58.85,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7497,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.7154,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.7358,x:50.05,y:49.9,regX:-45.7,regY:13.1}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.4501,x:83.65,y:129.3,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:54.5891,x:85.55,y:132.4,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9949,scaleY:0.9949,rotation:-2.735,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7343,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0112,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.1994,x:-28.7,y:90.35,regX:1.5}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4097,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.8635,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-144.0872,x:-90.3,y:52.85,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-9,rotation:-158.9473,x:-24.85,y:109.8,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-145.8655,x:-24.6,y:109.9,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.6501,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.748,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9979,scaleY:0.9978,rotation:88.6926,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:72.6529,x:50.1,y:49.95,regX:-45.7,regY:13.1}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.3622,x:83.8,y:129.2,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:54.4965,x:85.6,y:132.3,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.7403,y:183.6,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7498,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0121,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2038,x:-28.85,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4115,x:25.65,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-8.9938,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-144.589,x:-90.2,y:52.85,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.8,rotation:-159.4527,x:-24.25,y:109,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-146.3639,x:-24,y:109.35,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.6988,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7462,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9979,scaleY:0.9978,rotation:88.6681,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:72.5676,x:50.2,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.275,x:83.85,y:129.1,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:54.4018,x:85.75,y:132.25,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.7465,y:183.55,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7647,y:-59.2,x:-4.1,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0121,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2082,x:-28.85,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.414,x:25.65,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.1234,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-145.0913,x:-90.15,y:52.9,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-159.9554,x:-23.7,y:108.6,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-146.8631,x:-23.5,y:108.7,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.7459,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7453,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9979,scaleY:0.9978,rotation:88.6444,x:47.8,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:72.483,x:50.3,y:50,regX:-45.6,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.1885,x:84.1,y:129.1,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:54.3079,x:85.95,y:132.2,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9949,scaleY:0.9949,rotation:-2.7534,y:183.55,x:39.7}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7793,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0129,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2126,x:-28.85,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.417,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.2528,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-145.5938,x:-90.15,y:53,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-160.4589,x:-23.05,y:107.95,scaleX:0.9976,scaleY:0.9976,regX:4.6}},{t:this.instance_1,p:{rotation:-147.3621,x:-23,y:108.15,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.7954,x:-58.85,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7436,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.6199,x:47.8,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.3987,x:50.3,y:49.85,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.1014,x:84.3,y:129.1,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:54.2138,x:86.05,y:132.2,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.7588,y:183.55,x:39.7}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.7943,y:-59.2,x:-4.15,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0129,x:-37.3,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.217,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4196,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-9.3824,x:1.55,y:-80.55}},{t:this.instance_3,p:{regY:7.5,rotation:-146.0958,x:-90.05,y:53,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-9,rotation:-160.9636,x:-22.7,y:107.55,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-147.8612,x:-22.45,y:107.65,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.8425,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7419,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.5962,x:47.8,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.3142,x:50.3,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.0136,x:84.4,y:129,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:54.1203,x:86.25,y:132.05,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.7649,y:183.55,x:39.75}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8078,y:-59.2,x:-4.1,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0129,x:-37.35,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2232,x:-28.8,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4215,x:25.65,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.5121,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.6,rotation:-146.597,x:-90,y:52.95,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-161.4672,x:-22.1,y:106.85,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-148.3603,x:-21.95,y:107.05,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.89,x:-58.9,y:-12.2,regX:33.7,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7401,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.5726,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.2297,x:50.3,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.9254,x:84.5,y:129.05,regY:13.7,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:54.0269,x:86.4,y:132,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9949,scaleY:0.9949,rotation:-2.7719,y:183.6,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8229,y:-59.2,x:-4.1,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0138,x:-37.35,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2275,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.424,x:25.6,y:87.25}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.6436,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-147.0985,x:-89.9,y:53.05,regX:44.8,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-161.9711,x:-21.6,y:106.3,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-148.8587,x:-21.45,y:106.45,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.9387,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7384,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.548,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:72.1457,x:50.25,y:49.95,regX:-45.7,regY:13.1}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.8382,x:84.7,y:128.9,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:53.9332,x:86.6,y:132,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.7781,y:183.55,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8382,y:-59.2,x:-4.1,regX:-1.3,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0138,x:-37.35,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2319,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4268,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.7716,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-147.6015,x:-89.95,y:53.05,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.8,rotation:-162.475,x:-20.95,y:105.65,scaleX:0.9976,scaleY:0.9976,regX:4.6}},{t:this.instance_1,p:{rotation:-149.358,x:-20.9,y:105.95,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-66.987,x:-58.95,y:-12.4,regX:33.8,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7366,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.5244,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:72.0606,x:50.25,y:49.9,regX:-45.7,regY:13.1}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.7506,x:84.85,y:128.85,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.7,scaleX:0.9973,scaleY:0.9973,rotation:53.8386,x:86.65,y:132,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9949,scaleY:0.9949,rotation:-2.786,y:183.55,x:39.55}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8527,y:-59.2,x:-3.95,regX:-1.2,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0147,x:-37.35,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2363,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4285,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-9.9013,x:1.55,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-148.1039,x:-89.95,y:53.15,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-162.9778,x:-20.55,y:105.2,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-149.8567,x:-20.35,y:105.4,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.0341,x:-58.95,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7366,x:-9.5,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.5007,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:71.9758,x:50.45,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.6635,x:85,y:128.8,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:53.7451,x:86.9,y:131.9,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9949,scaleY:0.9949,rotation:-2.7921,y:183.55,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8669,y:-59.2,x:-4,regX:-1.2,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0147,x:-37.35,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2407,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4313,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.0312,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-148.6047,x:-89.85,y:53.05,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-163.4819,x:-20.05,y:104.55,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-150.3554,x:-19.9,y:104.75,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.0824,x:-58.85,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7349,x:-9.45,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.4762,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:71.8921,x:50.5,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.5764,x:85.1,y:128.8,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:53.651,x:87.1,y:131.8,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.7984,y:183.5,x:39.7}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8814,y:-59.25,x:-3.95,regX:-1.2,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0147,x:-37.35,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2451,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4339,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.1611,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-149.1069,x:-89.75,y:53.2,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-163.9861,x:-19.55,y:104,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-150.8551,x:-19.4,y:104.2,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.1299,x:-58.95,y:-12.25,regX:33.7,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7331,x:-9.45,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.4525,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:71.8073,x:50.45,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.4887,x:85.3,y:128.65,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:53.5572,x:87.2,y:131.85,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9949,scaleY:0.9949,rotation:-2.8054,y:183.5,x:39.7}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.8965,y:-59.25,x:-4,regX:-1.2,regY:7.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0155,x:-37.4,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2495,x:-28.85,y:90.3,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4358,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.2901,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-149.6091,x:-89.7,y:53.2,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-164.4894,x:-18.9,y:103.3,scaleX:0.9975,scaleY:0.9975,regX:4.6}},{t:this.instance_1,p:{rotation:-151.3534,x:-18.9,y:103.6,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.1781,x:-58.95,y:-12.35,regX:33.8,regY:10.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7313,x:-9.45,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.428,x:47.8,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:71.7225,x:50.55,y:49.85,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.4005,x:85.4,y:128.7,regY:13.7,regX:-8}},{t:this.instance_11,p:{regY:10.7,scaleX:0.9974,scaleY:0.9974,rotation:53.463,x:87.3,y:131.75,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9949,scaleY:0.9949,rotation:-2.8115,y:183.5,x:39.7}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.9118,y:-59.3,x:-4.15,regX:-1.3,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0155,x:-37.4,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2539,x:-28.8,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4383,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.4202,x:1.6,y:-80.7}},{t:this.instance_3,p:{regY:7.5,rotation:-150.111,x:-89.65,y:53.2,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-9,rotation:-164.9949,x:-18.6,y:102.9,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-151.8528,x:-18.3,y:102.95,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.2264,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7296,x:-9.45,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.4034,x:47.85,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:71.6377,x:50.6,y:50.1,regX:-45.6,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.3134,x:85.65,y:128.6,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:53.3698,x:87.45,y:131.65,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.8177,y:183.55,x:39.7}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.926,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0164,x:-37.4,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2583,x:-28.7,y:90.35,regX:1.5}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4411,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.5502,x:1.65,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-150.6134,x:-89.7,y:53.2,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-165.498,x:-18.05,y:102.25,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-152.3528,x:-17.8,y:102.45,regX:14.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.2744,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7278,x:-9.45,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.3797,x:47.8,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:71.5542,x:50.6,y:49.95,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.2265,x:85.8,y:128.5,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:53.2763,x:87.65,y:131.5,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9949,scaleY:0.9949,rotation:-2.8247,y:183.55,x:39.75}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.9411,y:-59.3,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0164,x:-37.4,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2636,x:-28.7,y:90.35,regX:1.5}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.443,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.6802,x:1.6,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-151.1148,x:-89.5,y:53.25,regX:44.8,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-166.0007,x:-17.6,y:101.6,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-152.8508,x:-17.45,y:101.8,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.3228,x:-58.85,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7261,x:-9.45,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.3561,x:47.8,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:71.4697,x:50.6,y:49.85,regX:-45.8,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.1389,x:85.95,y:128.4,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:53.1829,x:87.8,y:131.5,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.8309,y:183.55,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.9557,y:-59.35,x:-4.05,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0173,x:-37.4,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.268,x:-28.85,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4456,x:25.6,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.8096,x:1.6,y:-80.7}},{t:this.instance_3,p:{regY:7.5,rotation:-151.6168,x:-89.5,y:53.3,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-166.5049,x:-17,y:101.1,scaleX:0.9976,scaleY:0.9976,regX:4.6}},{t:this.instance_1,p:{rotation:-153.351,x:-17,y:101.2,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.3703,x:-58.85,y:-12.4,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7252,x:-9.45,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.3333,x:47.8,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:71.3863,x:50.65,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.0525,x:85.95,y:128.3,regY:13.6,regX:-8.1}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:53.0884,x:87.95,y:131.5,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.8371,y:183.55,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.9707,y:-59.4,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0173,x:-37.4,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2724,x:-28.85,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4483,x:25.65,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-10.9388,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-152.1183,x:-89.45,y:53.3,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-167.0094,x:-16.65,y:100.35,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-153.8501,x:-16.55,y:100.55,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.4185,x:-58.95,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7235,x:-9.45,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.3105,x:47.9,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:71.3015,x:50.7,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:48.9655,x:86.1,y:128.4,regY:13.7,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:52.9939,x:88.1,y:131.4,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.8441,y:183.55,x:39.6}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:11.9861,y:-59.35,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0174,x:-37.4,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2767,x:-28.85,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4501,x:25.65,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9983,scaleY:0.9983,rotation:-11.069,x:1.6,y:-80.7}},{t:this.instance_3,p:{regY:7.5,rotation:-152.6205,x:-89.35,y:53.35,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.9,rotation:-167.5123,x:-16.2,y:99.8,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-154.3485,x:-16.05,y:100,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.4657,x:-58.95,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7217,x:-9.45,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.286,x:47.85,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:71.217,x:50.7,y:49.95,regX:-45.7,regY:13.1}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:48.8767,x:86.4,y:128.3,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:52.9008,x:88.3,y:131.4,regX:-10.5}},{t:this.instance_10,p:{regX:3.6,scaleX:0.9948,scaleY:0.9948,rotation:-2.8502,y:183.5,x:39.65}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:12.0002,y:-59.4,x:-4.05,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0183,x:-37.45,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2812,x:-28.85,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4528,x:25.65,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.1993,x:1.6,y:-80.6}},{t:this.instance_3,p:{regY:7.5,rotation:-153.123,x:-89.35,y:53.35,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-9,rotation:-168.0165,x:-15.75,y:99.3,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-154.8485,x:-15.6,y:99.35,regX:14.4,scaleX:0.9972,scaleY:0.9972}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.514,x:-58.9,y:-12.35,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.72,x:-9.45,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.2623,x:47.85,y:-21.35}},{t:this.instance_13,p:{scaleX:0.9976,scaleY:0.9976,rotation:71.1327,x:50.8,y:49.85,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:48.7891,x:86.55,y:128.25,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9973,scaleY:0.9973,rotation:52.8063,x:88.4,y:131.25,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.8573,y:183.5,x:39.75}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:12.0157,y:-59.4,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0183,x:-37.45,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2856,x:-28.8,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4554,x:25.7,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.328,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-153.625,x:-89.35,y:53.4,regX:44.9,scaleX:0.9976,scaleY:0.9976}},{t:this.instance_2,p:{regY:-8.9,rotation:-168.5213,x:-15.25,y:98.55,scaleX:0.9975,scaleY:0.9975,regX:4.7}},{t:this.instance_1,p:{rotation:-155.3458,x:-15.15,y:98.7,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.5631,x:-58.95,y:-12.3,regX:33.8,regY:10.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7182,x:-9.45,y:49}},{t:this.instance_14,p:{scaleX:0.9978,scaleY:0.9978,rotation:88.2386,x:47.85,y:-21.35}},{t:this.instance_13,p:{scaleX:0.9975,scaleY:0.9975,rotation:71.0482,x:50.85,y:49.9,regX:-45.7,regY:13}},{t:this.instance_12,p:{scaleX:0.9974,scaleY:0.9974,rotation:48.7022,x:86.7,y:128.2,regY:13.6,regX:-8}},{t:this.instance_11,p:{regY:10.6,scaleX:0.9974,scaleY:0.9974,rotation:52.7123,x:88.55,y:131.25,regX:-10.5}},{t:this.instance_10,p:{regX:3.7,scaleX:0.9949,scaleY:0.9949,rotation:-2.8634,y:183.45,x:39.8}},{t:this.instance_9,p:{scaleX:0.9983,scaleY:0.9983,rotation:12.0306,y:-59.4,x:-4,regX:-1.2,regY:7.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:8.0192,x:-37.45,y:186.15}},{t:this.instance_7,p:{regY:-42.8,rotation:2.2899,x:-28.85,y:90.35,regX:1.4}},{t:this.instance_6,p:{regY:5.1,scaleX:0.9947,scaleY:0.9947,rotation:-11.4573,x:25.7,y:87.2}},{t:this.instance_5},{t:this.instance_4,p:{scaleX:0.9982,scaleY:0.9982,rotation:-11.4573,x:1.65,y:-80.65}},{t:this.instance_3,p:{regY:7.5,rotation:-154.1264,x:-89.2,y:53.45,regX:44.9,scaleX:0.9975,scaleY:0.9975}},{t:this.instance_2,p:{regY:-8.8,rotation:-169.0232,x:-14.75,y:97.85,scaleX:0.9976,scaleY:0.9976,regX:4.7}},{t:this.instance_1,p:{rotation:-155.8452,x:-14.65,y:98.1,regX:14.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:-67.6107,x:-58.95,y:-12.4,regX:33.8,regY:10.3}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-111.5,-211.7,230.5,509.9);


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

	this.instance_4 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_4.setTransform(-0.65,-81.1,0.9981,0.9981,-12.0322,0,0,1.9,51.2);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_6.setTransform(24.35,88.25,0.9947,0.9947,-9.1655,0,0,0.1,4.6);

	this.instance_7 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_7.setTransform(-30.1,89.95,0.9956,0.9956,4.0086,0,0,1.4,-42.6);

	this.instance_8 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_8.setTransform(-42.25,185.75,0.9952,0.9952,3.4363,0,0,0.5,-51);

	this.instance_9 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_9.setTransform(-4.5,-59.65,0.9982,0.9982,5.7271,0,0,-1.7,7.2);

	this.instance_10 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(34.1,185.5,0.9949,0.9949,-2.2908,0,0,3.3,-50.6);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4.3,scaleX:0.9995,scaleY:0.9995,rotation:1.7174,x:-9.55,y:49}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9977,scaleY:0.9977,rotation:88.0998,x:47.85,y:-21,regX:-32.6}},{t:this.instance_13,p:{rotation:87.2915,x:51.2,y:50,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:72.3956,x:63.85,y:135.2,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.3,scaleX:0.9973,scaleY:0.9973,rotation:65.5195,x:64.05,y:138.85}},{t:this.instance_10,p:{regX:3.3,regY:-50.6,scaleX:0.9949,scaleY:0.9949,rotation:-2.2908,x:34.1,y:185.5}},{t:this.instance_9,p:{scaleX:0.9982,scaleY:0.9982,rotation:5.7271,y:-59.65,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9952,scaleY:0.9952,rotation:3.4363,x:-42.25,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.6,scaleX:0.9956,scaleY:0.9956,rotation:4.0086,x:-30.1,y:89.95}},{t:this.instance_6,p:{regY:4.6,scaleX:0.9947,scaleY:0.9947,rotation:-9.1655,x:24.35,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.9981,scaleY:0.9981,rotation:-12.0322,x:-0.65,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-116.8826,x:-91.15,y:52.7,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.782,x:-59.05,y:132.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.9971,scaleY:0.9971,rotation:-146.6781,x:-59.05,y:132.8,regX:14.3}},{t:this.instance,p:{regY:10.1,scaleX:0.9975,scaleY:0.9975,rotation:-65.8894,y:-12.4,x:-59.2,regX:33.8}}]}).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7175,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:88.1891,x:47.9,y:-21.05,regX:-32.6}},{t:this.instance_13,p:{rotation:87.2501,x:51.15,y:49.9,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:72.3574,x:63.8,y:135.1,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:65.48,x:64.15,y:138.8}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.2909,x:34.2,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6993,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4303,x:-42.2,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.008,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1599,x:24.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-11.8855,x:-0.75,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.861,x:-91.4,y:52.5,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7662,x:-59.4,y:132.75,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-145.7759,x:-59.45,y:132.6,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-65.6173,y:-12.5,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7192,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:88.14,x:47.9,y:-21.05,regX:-32.6}},{t:this.instance_13,p:{rotation:86.8358,x:51.2,y:50,regX:-45.3,regY:13.3}},{t:this.instance_12,p:{rotation:71.9471,x:64.35,y:134.95,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:65.0697,x:64.85,y:138.65}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.2936,x:34.15,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6703,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4259,x:-42.25,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.0055,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1536,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.7386,x:-0.65,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.8403,x:-91.7,y:52.25,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7513,x:-59.75,y:132.6,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-144.8741,x:-59.7,y:132.45,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-65.3463,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7209,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:88.0944,x:47.85,y:-21.05,regX:-32.6}},{t:this.instance_13,p:{rotation:86.4205,x:51.2,y:49.9,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:71.5362,x:65.15,y:134.8,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.3,scaleX:0.9973,scaleY:0.9973,rotation:64.6575,x:65.4,y:138.6}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.2953,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6422,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4206,x:-42.05,y:185.75,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.0027,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1473,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.5929,x:-0.75,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.8187,x:-92,y:52.2,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7376,x:-60.05,y:132.5,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-143.9728,x:-60.1,y:132.35,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-65.0733,y:-12.55,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7227,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:88.0462,x:47.9,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:86.005,x:51.35,y:49.85,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:71.1262,x:65.75,y:134.8,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:64.247,x:66.25,y:138.45}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.2971,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6132,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4154,x:-42.2,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.001,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1421,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.4462,x:-0.65,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7971,x:-92.25,y:52,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7227,x:-60.4,y:132.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-143.0694,x:-60.35,y:132.2,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-64.8004,y:-12.55,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7244,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.998,x:47.9,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:85.5901,x:51.35,y:49.85,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:70.7162,x:66.5,y:134.6,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:63.836,x:66.9,y:138.35}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.2997,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5833,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.411,x:-42.2,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9983,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1367,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.2996,x:-0.7,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7764,x:-92.55,y:51.9,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7079,x:-60.75,y:132.15,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-142.1672,x:-60.7,y:132.05,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-64.5275,y:-12.55,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7262,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.9497,x:47.9,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:85.1768,x:51.45,y:49.9,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:70.3069,x:67.2,y:134.45,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:63.4255,x:67.6,y:138.2}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3015,x:33.95,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5541,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4057,x:-42.2,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9957,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1307,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.1541,x:-0.65,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7548,x:-92.9,y:51.75,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6923,x:-61.1,y:132,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-141.2662,x:-60.95,y:131.95,regX:14.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-64.2554,y:-12.45,x:-59.15,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7279,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.9015,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:84.7615,x:51.55,y:49.85,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:69.8968,x:67.8,y:134.45,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:63.0143,x:68.4,y:138.05}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3033,x:33.95,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5252,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4013,x:-42.25,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9939,x:-30.05,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1253,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.0077,x:-0.7,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7332,x:-93.2,y:51.55,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6786,x:-61.4,y:131.9,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-140.3639,x:-61.5,y:131.75,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.9822,y:-12.4,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7297,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.8524,x:47.85,y:-21.15,regX:-32.6}},{t:this.instance_13,p:{rotation:84.3459,x:51.55,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:69.4868,x:68.5,y:134.25,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:62.6029,x:69,y:137.95}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.305,x:33.95,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.497,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.396,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9904,x:-30.05,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1191,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.861,x:-0.7,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7129,x:-93.4,y:51.35,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6644,x:-61.75,y:131.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-139.4601,x:-61.8,y:131.65,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.709,y:-12.55,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7315,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.805,x:47.85,y:-21.25,regX:-32.7}},{t:this.instance_13,p:{rotation:83.9317,x:51.6,y:49.85,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:69.077,x:69.2,y:134.15,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:62.1908,x:69.65,y:137.85}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3068,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4679,y:-59.6,x:-4.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3907,x:-42.2,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9878,x:-30.05,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.112,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.7158,x:-0.7,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6909,x:-93.75,y:51.1,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.65,x:-62.1,y:131.55,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-138.5601,x:-62.1,y:131.4,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.4365,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7332,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.7577,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:83.5165,x:51.65,y:49.85,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:68.6663,x:69.8,y:133.9,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:61.7802,x:70.45,y:137.7}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3094,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4381,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3854,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9852,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1067,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.5689,x:-0.85,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6693,x:-94.15,y:51.05,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6358,x:-62.4,y:131.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-137.6566,x:-62.4,y:131.3,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.1629,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.735,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.7095,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:83.1025,x:51.75,y:49.85,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:68.257,x:70.45,y:133.7,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:61.3679,x:71.05,y:137.5}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3112,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4089,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3793,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9834,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1005,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.4227,x:-0.75,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6478,x:-94.3,y:50.85,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6221,x:-62.75,y:131.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-136.7556,x:-62.7,y:131.2,regX:14.2}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-62.8916,y:-12.5,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7367,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.6621,x:47.85,y:-21.15,regX:-32.6}},{t:this.instance_13,p:{rotation:82.6873,x:51.8,y:49.9,regX:-45.3,regY:13.3}},{t:this.instance_12,p:{rotation:67.8468,x:71.2,y:133.7,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:60.9575,x:71.8,y:137.4}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3129,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.3808,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3749,x:-42.15,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9807,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0941,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.2766,x:-0.9,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6266,x:-94.65,y:50.8,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6072,x:-63.05,y:131.1,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-135.8526,x:-63.05,y:131,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-62.6188,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7385,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.6139,x:47.85,y:-21.15,regX:-32.6}},{t:this.instance_13,p:{rotation:82.2727,x:51.9,y:50,regX:-45.3,regY:13.3}},{t:this.instance_12,p:{rotation:67.4372,x:71.9,y:133.55,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:60.5465,x:72.55,y:137.25}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3155,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.3518,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3696,x:-42.1,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9782,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0887,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.1304,x:-0.75,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6054,x:-95,y:50.7,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5923,x:-63.35,y:130.9,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-134.9504,x:-63.4,y:130.8,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-62.3463,y:-12.45,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7402,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.5647,x:47.8,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:81.8576,x:51.95,y:49.85,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:67.0262,x:72.45,y:133.45,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:60.1351,x:73.2,y:137.05}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3173,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.3219,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3643,x:-42.05,y:185.7,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9764,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0834,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.984,x:-0.9,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5839,x:-95.25,y:50.4,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5768,x:-63.7,y:130.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-134.0488,x:-63.75,y:130.7,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-62.0738,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.742,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.5173,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:81.443,x:51.95,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:66.6177,x:73.15,y:133.1,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:59.7238,x:73.85,y:136.95}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3191,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2937,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.359,x:-42.15,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9737,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.077,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.8381,x:-0.8,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5627,x:-95.45,y:50.15,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5637,x:-64,y:130.55,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-133.1457,x:-64.05,y:130.5,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-61.8005,y:-12.55,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7428,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.4691,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:81.0288,x:52.1,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:66.2071,x:73.75,y:133.05,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:59.313,x:74.55,y:136.8}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3208,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2646,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3538,x:-42.2,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.972,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0708,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.6923,x:-0.8,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5404,x:-95.9,y:50,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5495,x:-64.35,y:130.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-132.2434,x:-64.4,y:130.35,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-61.5279,y:-12.55,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7446,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.4209,x:47.85,y:-21.25,regX:-32.7}},{t:this.instance_13,p:{rotation:80.6142,x:52.05,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:65.7966,x:74.5,y:132.9,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:58.9018,x:75.25,y:136.55}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3226,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2366,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3485,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9702,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0638,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.5456,x:-0.95,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5196,x:-96.2,y:49.8,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5345,x:-64.65,y:130.25,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-131.3423,x:-64.7,y:130.2,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-61.2545,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7464,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.3735,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:80.199,x:52.2,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:65.3866,x:75.2,y:132.8,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:58.4903,x:76,y:136.4}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3252,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2075,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3432,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9667,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0577,x:24.25,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.3991,x:-0.85,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.498,x:-96.45,y:49.7,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5196,x:-64.9,y:130.05,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-130.4397,x:-65.05,y:130.05,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-60.983,y:-12.6,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7481,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.3253,x:47.85,y:-21.05,regX:-32.6}},{t:this.instance_13,p:{rotation:79.7841,x:52.2,y:49.85,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:64.9779,x:75.75,y:132.6,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:58.0794,x:76.6,y:136.2}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.327,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.1776,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3379,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9649,x:-29.95,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0523,x:24.25,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.2536,x:-0.9,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.4768,x:-96.75,y:49.45,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.506,x:-65.25,y:129.95,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-129.5371,x:-65.4,y:129.85,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-60.7103,y:-12.5,x:-59.15,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7499,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.2769,x:47.8,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:79.3688,x:52.25,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:64.5673,x:76.4,y:132.3,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:57.6685,x:77.3,y:136.05}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3288,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.1486,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3325,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9632,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0461,x:24.25,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.1072,x:-0.85,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.4561,x:-97.15,y:49.35,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.4911,x:-65.55,y:129.75,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-128.6364,x:-65.6,y:129.7,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-60.4371,y:-12.6,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7516,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.2296,x:47.8,y:-21.25,regX:-32.7}},{t:this.instance_13,p:{rotation:78.9539,x:52.45,y:49.7,regX:-45.4,regY:13.2}},{t:this.instance_12,p:{rotation:64.1564,x:77.15,y:132.2,regY:13.7,regX:-7.7,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:57.2566,x:77.95,y:135.9}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3314,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.1196,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3282,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9605,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0399,x:24.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-8.9608,x:-0.95,y:-81.2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.4333,x:-97.35,y:49.2,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.4768,x:-65.85,y:129.55,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-127.7347,x:-66,y:129.5,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-60.1651,y:-12.65,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7533,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.1814,x:47.85,y:-21.25,regX:-32.7}},{t:this.instance_13,p:{rotation:78.54,x:52.45,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:63.7474,x:77.75,y:132,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:56.8458,x:78.65,y:135.65}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3331,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0914,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.323,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9578,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0346,x:24.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.8154,x:-0.8,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.4133,x:-97.65,y:48.95,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.4613,x:-66.2,y:129.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-126.8324,x:-66.25,y:129.4,regX:14.3}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-59.8918,y:-12.55,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7551,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.1331,x:47.8,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:78.1247,x:52.5,y:49.95,regX:-45.3,regY:13.3}},{t:this.instance_12,p:{rotation:63.3373,x:78.45,y:131.85,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:56.4352,x:79.35,y:135.4}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3349,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0624,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3176,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.956,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0292,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-8.6682,x:-0.9,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.3922,x:-97.95,y:48.85,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.447,x:-66.5,y:129.15,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-125.9305,x:-66.6,y:129.2,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-59.6188,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7568,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.0849,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:77.7114,x:52.55,y:49.7,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:62.9268,x:79.1,y:131.6,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:56.0242,x:79.95,y:135.25}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3367,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0325,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3123,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9535,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.023,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.522,x:-0.85,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.3698,x:-98.25,y:48.6,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.4333,x:-66.75,y:129,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-125.0271,x:-66.95,y:129,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-59.348,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7586,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.0365,x:47.85,y:-21.25,regX:-32.7}},{t:this.instance_13,p:{rotation:77.2951,x:52.6,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:62.5159,x:79.75,y:131.45,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:55.6128,x:80.7,y:135.1}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3384,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0035,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3071,x:-41.95,y:185.7,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9508,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0156,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.3768,x:-0.85,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.3494,x:-98.5,y:48.45,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.4184,x:-67.1,y:128.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-124.1254,x:-67.25,y:128.85,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-59.0737,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7603,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.9892,x:47.8,y:-21.25,regX:-32.7}},{t:this.instance_13,p:{rotation:76.8805,x:52.7,y:49.8,regX:-45.4,regY:13.2}},{t:this.instance_12,p:{rotation:62.1066,x:80.3,y:131.3,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:55.2013,x:81.35,y:134.85}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3411,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9744,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3018,x:-42.1,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9481,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0094,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.2298,x:-0.9,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.3267,x:-98.8,y:48.25,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.4029,x:-67.45,y:128.65,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-123.2238,x:-67.55,y:128.7,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-58.8011,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7621,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.9409,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:76.4668,x:52.65,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:61.6967,x:80.95,y:131.1,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:54.7901,x:82.05,y:134.55}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3428,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9455,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2966,x:-42.1,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9464,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0032,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.0838,x:-0.85,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.3063,x:-99.1,y:48.1,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.3886,x:-67.7,y:128.45,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-122.3209,x:-67.75,y:128.6,regX:14.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-58.5286,y:-12.6,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7638,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.8927,x:47.85,y:-21.05,regX:-32.6}},{t:this.instance_13,p:{rotation:76.0526,x:52.85,y:49.75,regX:-45.4,regY:13.2}},{t:this.instance_12,p:{rotation:61.2872,x:81.6,y:130.75,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:54.379,x:82.8,y:134.35}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3446,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9165,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2913,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9438,x:-29.95,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-8.9979,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.9387,x:-0.9,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.284,x:-99.35,y:47.9,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.3744,x:-68,y:128.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-121.4194,x:-68.15,y:128.35,regX:14.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-58.2559,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7656,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.8453,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:75.6368,x:52.85,y:49.85,regX:-45.3,regY:13.3}},{t:this.instance_12,p:{rotation:60.8783,x:82.25,y:130.65,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:53.9672,x:83.4,y:134.15}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3472,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8874,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.286,x:-42.05,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9411,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-8.9918,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.791,x:-0.85,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.2632,x:-99.65,y:47.65,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.3607,x:-68.4,y:128.1,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-120.5164,x:-68.55,y:128.15,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-57.9835,y:-12.65,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7673,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.7961,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:75.222,x:52.9,y:49.75,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:60.4669,x:82.95,y:130.4,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:53.5562,x:84.05,y:133.9}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.349,x:33.8,y:185.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8576,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2807,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9394,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-8.9864,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.6451,x:-0.9,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.2416,x:-100,y:47.5,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.3452,x:-68.7,y:128,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-119.6147,x:-68.85,y:128,regX:14.3}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-57.7116,y:-12.6,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7691,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.7487,x:47.85,y:-21.05,regX:-32.6}},{t:this.instance_13,p:{rotation:74.8072,x:53,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:60.0582,x:83.55,y:130.05,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:53.1452,x:84.65,y:133.75}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3507,x:33.8,y:185.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8285,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2763,x:-42.05,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9368,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9945,scaleY:0.9945,rotation:-8.9802,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.4992,x:-0.95,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.2201,x:-100.25,y:47.25,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.3321,x:-69,y:127.85,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-118.7138,x:-69.15,y:127.85,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-57.4366,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7708,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.7004,x:47.8,y:-21.05,regX:-32.6}},{t:this.instance_13,p:{rotation:74.3921,x:52.95,y:49.7,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:59.6461,x:84.2,y:129.85,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:52.7345,x:85.4,y:133.5}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3525,x:33.85,y:185.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8003,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2719,x:-42.05,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9341,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9945,scaleY:0.9945,rotation:-8.974,x:24.3,y:88.4}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.3527,x:-0.85,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.1997,x:-100.45,y:47.25,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.3178,x:-69.3,y:127.6,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-117.8118,x:-69.5,y:127.65,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-57.165,y:-12.7,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7726,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.6522,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:73.9781,x:53.05,y:49.75,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:59.2374,x:84.75,y:129.75,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:52.3232,x:86.1,y:133.2}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3543,x:33.85,y:185.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.7723,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2666,x:-42,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9323,x:-29.95,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9945,scaleY:0.9945,rotation:-8.9678,x:24.3,y:88.4}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.206,x:-0.95,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.1773,x:-100.8,y:46.9,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.3029,x:-69.6,y:127.45,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-116.9094,x:-69.8,y:127.45,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-56.8927,y:-12.65,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7708,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.8,scaleX:0.9976,scaleY:0.9976,rotation:86.6907,x:47.65,y:-21.05,regX:-32.6}},{t:this.instance_13,p:{rotation:74.3283,x:53.15,y:49.75,regX:-45.3,regY:13.2}},{t:this.instance_12,p:{rotation:59.5837,x:84.3,y:129.95,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:52.6702,x:85.45,y:133.5}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3534,x:33.85,y:185.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.797,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.271,x:-42.05,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9341,x:-29.95,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9945,scaleY:0.9945,rotation:-8.974,x:24.3,y:88.4}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.3331,x:-0.9,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.1969,x:-100.5,y:47.2,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.3153,x:-69.4,y:127.6,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-117.693,x:-69.55,y:127.6,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-57.1287,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7691,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.7285,x:47.85,y:-21.05,regX:-32.6}},{t:this.instance_13,p:{rotation:74.6792,x:52.95,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:59.9293,x:83.85,y:130.1,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:53.0175,x:84.95,y:133.6}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3516,x:33.85,y:185.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8215,y:-59.6,x:-4.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2745,x:-42.05,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9359,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9945,scaleY:0.9945,rotation:-8.9793,x:24.25,y:88.4}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.4603,x:-0.9,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.2153,x:-100.25,y:47.15,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.3283,x:-69.05,y:127.75,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-118.476,x:-69.3,y:127.7,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-57.3653,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7682,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.7671,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:75.0289,x:52.95,y:49.75,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:60.2758,x:83.3,y:130.3,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:53.3638,x:84.45,y:133.75}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3499,x:33.8,y:185.5}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8461,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.279,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9385,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-8.9837,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.5867,x:-0.9,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.2338,x:-100.1,y:47.45,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.3402,x:-68.8,y:127.9,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-119.2589,x:-68.95,y:127.85,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-57.6029,y:-12.6,x:-59.25,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7665,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.804,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:75.3806,x:52.8,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:60.622,x:82.75,y:130.45,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:53.7117,x:83.85,y:134}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3481,x:33.8,y:185.45}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.8716,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2833,x:-42.05,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9403,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-8.9899,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.714,x:-0.9,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.2522,x:-99.85,y:47.55,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.3533,x:-68.5,y:128,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-120.042,x:-68.7,y:128.05,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-57.8393,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7647,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.8435,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:75.7299,x:52.85,y:49.75,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:60.9681,x:82.1,y:130.75,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:54.06,x:83.25,y:134.35}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3464,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.898,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2877,x:-42.05,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.942,x:-29.95,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-8.9942,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.8413,x:-0.9,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.271,x:-99.45,y:47.7,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.3663,x:-68.2,y:128.15,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-120.8262,x:-68.35,y:128.25,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-58.0759,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7638,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.8812,x:47.85,y:-21.05,regX:-32.6}},{t:this.instance_13,p:{rotation:76.0798,x:52.75,y:49.75,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:61.3143,x:81.6,y:130.75,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:54.4072,x:82.7,y:134.4}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3446,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9226,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2922,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9446,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-8.9987,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-7.9686,x:-0.85,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.2898,x:-99.3,y:47.9,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.378,x:-67.95,y:128.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-121.608,x:-68.05,y:128.5,regX:14.2}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-58.3126,y:-12.6,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7621,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.9199,x:47.85,y:-21.05,regX:-32.6}},{t:this.instance_13,p:{rotation:76.4308,x:52.7,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:61.661,x:81.05,y:131.1,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:54.7543,x:82.15,y:134.55}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3428,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9472,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.2974,x:-42.1,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9464,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0041,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.0953,x:-0.8,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.3075,x:-99.1,y:48.1,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.3904,x:-67.7,y:128.5,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-122.3922,x:-67.9,y:128.55,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-58.5507,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7603,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.9575,x:47.8,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:76.7806,x:52.65,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:62.0069,x:80.6,y:131.15,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:55.1019,x:81.55,y:134.85}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3411,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9728,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3018,x:-42.1,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9481,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0094,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.2218,x:-0.9,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.3267,x:-98.85,y:48.25,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.4035,x:-67.45,y:128.65,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-123.1754,x:-67.6,y:128.7,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-58.7865,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7586,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:86.9962,x:47.8,y:-21.25,regX:-32.7}},{t:this.instance_13,p:{rotation:77.1312,x:52.6,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:62.3536,x:80.05,y:131.4,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:55.4482,x:80.95,y:134.95}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3393,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:4.9982,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3062,x:-41.95,y:185.7,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9508,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0148,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.3491,x:-0.9,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.3443,x:-98.55,y:48.45,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.4159,x:-67.15,y:128.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-123.9595,x:-67.3,y:128.8,regX:14.3}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-59.0226,y:-12.55,x:-59.05,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7577,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.0322,x:47.85,y:-21.25,regX:-32.7}},{t:this.instance_13,p:{rotation:77.4825,x:52.6,y:49.85,regX:-45.3,regY:13.3}},{t:this.instance_12,p:{rotation:62.701,x:79.5,y:131.55,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:55.7964,x:80.5,y:135.05}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3375,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0228,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3106,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9525,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0201,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.476,x:-0.85,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.3639,x:-98.25,y:48.5,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.4284,x:-66.85,y:128.95,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-124.7422,x:-66.95,y:129,regX:14.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-59.2608,y:-12.65,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7559,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.0717,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:77.8317,x:52.55,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:63.0464,x:78.85,y:131.75,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:56.1424,x:79.8,y:135.35}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3358,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0492,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.315,x:-42.05,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9544,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0263,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-8.6026,x:-0.9,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.3824,x:-98.1,y:48.75,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.4402,x:-66.6,y:129.1,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-125.5266,x:-66.8,y:129.1,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-59.4965,y:-12.65,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7542,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.1094,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:78.1829,x:52.5,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:63.3922,x:78.4,y:131.85,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:56.4896,x:79.25,y:135.45}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.334,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0747,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3195,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9569,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0309,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-8.7302,x:-0.95,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.4008,x:-97.8,y:48.8,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9,rotation:-131.4532,x:-66.3,y:129.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-126.3103,x:-66.5,y:129.2,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-59.7347,y:-12.5,x:-59.15,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7533,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.148,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:78.5329,x:52.4,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:63.7388,x:77.85,y:132,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:56.8368,x:78.75,y:135.6}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3323,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.0985,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3238,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9588,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0363,x:24.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-8.857,x:-1,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.4192,x:-97.45,y:49,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.465,x:-66.1,y:129.45,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-127.093,x:-66.2,y:129.4,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-59.9699,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7516,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.1857,x:47.85,y:-21.25,regX:-32.7}},{t:this.instance_13,p:{rotation:78.8831,x:52.5,y:49.75,regX:-45.4,regY:13.2}},{t:this.instance_12,p:{rotation:64.0842,x:77.3,y:132.15,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:57.1848,x:78.1,y:135.85}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3305,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.124,y:-59.6,x:-4.6}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3282,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9605,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0408,x:24.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-8.9839,x:-0.9,y:-81.2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.4372,x:-97.3,y:49.15,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.478,x:-65.8,y:129.6,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-127.8758,x:-65.95,y:129.55,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-60.2071,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7499,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.2243,x:47.8,y:-21.25,regX:-32.7}},{t:this.instance_13,p:{rotation:79.2333,x:52.35,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:64.4312,x:76.8,y:132.3,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:57.5316,x:77.6,y:135.95}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3288,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.1495,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3334,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9632,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0461,x:24.25,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.1116,x:-0.85,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.4561,x:-97.1,y:49.35,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.4911,x:-65.55,y:129.75,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-128.6601,x:-65.6,y:129.65,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-60.4442,y:-12.65,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.749,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.263,x:47.85,y:-21.15,regX:-32.6}},{t:this.instance_13,p:{rotation:79.5835,x:52.25,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:64.7763,x:76.25,y:132.45,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:57.8797,x:77.05,y:136.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.327,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.1741,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3379,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9649,x:-29.95,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0515,x:24.25,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.2385,x:-0.95,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.4741,x:-96.8,y:49.45,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5041,x:-65.25,y:129.9,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-129.4432,x:-65.4,y:129.85,regX:14.3}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-60.6813,y:-12.55,x:-59.05,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7472,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.2998,x:47.8,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:79.9346,x:52.3,y:49.75,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:65.123,x:75.5,y:132.7,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:58.2266,x:76.35,y:136.3}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3252,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2005,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3423,x:-42.1,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9659,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0568,x:24.25,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.3653,x:-0.95,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.4921,x:-96.55,y:49.65,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5159,x:-65,y:130.05,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-130.2269,x:-65.1,y:130.05,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-60.9179,y:-12.5,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7455,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.3393,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:80.2842,x:52.2,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:65.469,x:75,y:132.65,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:58.5733,x:75.85,y:136.45}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3235,x:33.8,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.226,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3467,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9693,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0622,x:24.25,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.4916,x:-0.75,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5117,x:-96.3,y:49.75,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5296,x:-64.75,y:130.15,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-131.0092,x:-64.75,y:130.2,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-61.1537,y:-12.65,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7437,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.377,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:80.6355,x:52.2,y:49.75,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:65.8158,x:74.55,y:132.95,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:58.9215,x:75.25,y:136.55}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3217,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2498,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3511,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.971,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0684,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.6186,x:-0.8,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5302,x:-96.05,y:49.95,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5407,x:-64.5,y:130.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-131.794,x:-64.55,y:130.25,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-61.3922,y:-12.5,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7428,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.4147,x:47.85,y:-21.25,regX:-32.7}},{t:this.instance_13,p:{rotation:80.9863,x:52.1,y:49.95,regX:-45.3,regY:13.3}},{t:this.instance_12,p:{rotation:66.1619,x:74,y:133.05,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:59.2679,x:74.65,y:136.7}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3199,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.2752,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3555,x:-42.15,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9729,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0737,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.7465,x:-0.8,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5482,x:-95.8,y:50.05,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5537,x:-64.2,y:130.45,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-132.5786,x:-64.25,y:130.4,regX:14.3}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-61.6283,y:-12.5,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7411,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.4525,x:47.85,y:-21.15,regX:-32.6}},{t:this.instance_13,p:{rotation:81.3356,x:52.25,y:49.85,regX:-45.4,regY:13.2}},{t:this.instance_12,p:{rotation:66.5086,x:73.4,y:133.2,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:59.6162,x:74.15,y:136.85}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3182,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.3008,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3599,x:-42.15,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9746,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0789,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-9.8728,x:-0.9,y:-81}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5678,x:-95.4,y:50.25,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5669,x:-63.95,y:130.65,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-133.3604,x:-63.95,y:130.6,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-61.8644,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7393,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.491,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:81.6867,x:52,y:49.75,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:66.8541,x:72.9,y:133.35,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:59.963,x:73.5,y:137.05}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3173,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.3254,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3643,x:-42.05,y:185.7,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9764,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0834,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10,x:-0.9,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5858,x:-95.25,y:50.45,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5793,x:-63.7,y:130.75,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-134.1443,x:-63.75,y:130.65,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-62.1028,y:-12.6,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7385,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.5288,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:82.0372,x:51.95,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:67.201,x:72.25,y:133.4,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:60.3106,x:72.95,y:137.15}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3155,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.351,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3687,x:-42.1,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9782,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0887,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.127,x:-0.7,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6043,x:-95,y:50.7,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.5923,x:-63.4,y:130.85,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-134.9268,x:-63.4,y:130.85,regX:14.3}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-62.3385,y:-12.5,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7367,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.5664,x:47.8,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:82.3868,x:51.9,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:67.5472,x:71.65,y:133.5,regY:13.8,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:60.6572,x:72.4,y:137.3}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3138,x:33.85,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.3765,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.374,x:-42.15,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9807,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.094,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.2543,x:-0.75,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6223,x:-94.7,y:50.75,regY:7.5,regX:44.1}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6047,x:-63.1,y:131.05,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-135.71,x:-63.1,y:131.05,regX:14.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-62.5749,y:-12.55,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.735,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.6051,x:47.85,y:-21.25,regX:-32.7}},{t:this.instance_13,p:{rotation:82.7377,x:51.9,y:50,regX:-45.3,regY:13.3}},{t:this.instance_12,p:{rotation:67.8932,x:71.2,y:133.8,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:61.005,x:71.8,y:137.4}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.312,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4002,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3784,x:-42.15,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9825,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.0984,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-10.3799,x:-0.75,y:-81.2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6419,x:-94.4,y:50.8,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6177,x:-62.8,y:131.2,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-136.4939,x:-62.7,y:131.2,regX:14.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-62.8124,y:-12.6,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7341,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.6436,x:47.85,y:-21.15,regX:-32.6}},{t:this.instance_13,p:{rotation:83.0884,x:51.9,y:49.85,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:68.239,x:70.55,y:133.75,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:61.3518,x:71.15,y:137.55}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3103,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4257,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3837,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9843,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1038,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.5074,x:-0.85,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6607,x:-94.25,y:50.95,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6302,x:-62.55,y:131.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-137.278,x:-62.5,y:131.35,regX:14.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.0492,y:-12.55,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7323,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.6823,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:83.4387,x:51.8,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:68.5852,x:70.1,y:133.95,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:61.6998,x:70.65,y:137.7}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3085,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4512,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3881,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9869,x:-30,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1091,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-10.6346,x:-0.75,y:-81.2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.6784,x:-93.9,y:51.1,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6432,x:-62.25,y:131.45,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-138.0614,x:-62.3,y:131.4,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.2864,y:-12.4,x:-59.2,regX:33.7}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7306,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.72,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:83.7889,x:51.75,y:50,regX:-45.3,regY:13.3}},{t:this.instance_12,p:{rotation:68.931,x:69.55,y:134.1,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:62.0461,x:70.05,y:137.8}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3068,x:33.9,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.4776,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3924,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9887,x:-30.05,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1145,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.7613,x:-0.65,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.698,x:-93.7,y:51.15,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6544,x:-61.95,y:131.6,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-138.8441,x:-62,y:131.5,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.5228,y:-12.6,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7297,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.7586,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:84.1397,x:51.7,y:49.8,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:69.2785,x:68.95,y:134.15,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:62.3955,x:69.5,y:137.8}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.305,x:33.95,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5023,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.3969,x:-42.15,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9913,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1207,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-10.8881,x:-0.75,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7164,x:-93.35,y:51.4,regY:7.6,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6675,x:-61.7,y:131.75,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-139.6281,x:-61.7,y:131.65,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.7595,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7279,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.7954,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:84.4894,x:51.65,y:49.85,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:69.6241,x:68.45,y:134.3,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.3,scaleX:0.9972,scaleY:0.9972,rotation:62.7421,x:68.8,y:138.05}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3033,x:33.95,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5277,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4013,x:-42.25,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9939,x:-30.05,y:90.05}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1253,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.0156,x:-0.75,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7348,x:-93.2,y:51.55,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6799,x:-61.4,y:131.9,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-140.4106,x:-61.45,y:131.75,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-63.9967,y:-12.6,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7262,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.834,x:47.8,y:-21.15,regX:-32.6}},{t:this.instance_13,p:{rotation:84.8407,x:51.7,y:49.85,regX:-45.4,regY:13.2}},{t:this.instance_12,p:{rotation:69.9702,x:67.7,y:134.4,regY:13.8,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:63.0891,x:68.35,y:138.1}},{t:this.instance_10,p:{regX:3.3,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.3015,x:33.95,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5524,y:-59.6,x:-4.55}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4048,x:-42.2,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9957,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1298,x:24.25,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.1424,x:-0.85,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.754,x:-92.9,y:51.75,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.6923,x:-61.15,y:132,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-141.1946,x:-61.1,y:131.85,regX:14.3}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-64.2339,y:-12.5,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7244,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.8708,x:47.85,y:-21.15,regX:-32.6}},{t:this.instance_13,p:{rotation:85.1901,x:51.55,y:49.85,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:70.3175,x:67.25,y:134.45,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:63.4353,x:67.75,y:138.2}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.2997,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.5771,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4101,x:-42.2,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:3.9975,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1343,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.2692,x:-0.7,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7724,x:-92.65,y:51.8,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7053,x:-60.85,y:132.1,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-141.978,x:-60.8,y:132,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-64.4707,y:-12.5,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7236,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.9103,x:47.85,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:85.5401,x:51.55,y:49.9,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:70.6629,x:66.65,y:134.45,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:63.7831,x:67.1,y:138.3}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.298,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6035,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4136,x:-42.25,y:185.75,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.0001,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1395,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.3962,x:-0.65,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.7905,x:-92.35,y:52,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7172,x:-60.5,y:132.25,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-142.7606,x:-60.55,y:132.1,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-64.7071,y:-12.55,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7218,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.948,x:47.9,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:85.8899,x:51.4,y:49.85,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:71.0092,x:66.15,y:134.7,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:64.1301,x:66.55,y:138.45}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.2962,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6289,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.418,x:-42.1,y:185.7,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.0018,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.145,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.5238,x:-0.7,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.8089,x:-92.15,y:52.05,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7302,x:-60.2,y:132.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-143.5449,x:-60.15,y:132.35,regX:14.2}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-64.9439,y:-12.6,x:-59.1,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7201,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:87.9866,x:47.9,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:86.2413,x:51.4,y:49.85,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:71.3549,x:65.55,y:134.65,regY:13.7,regX:-7.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:64.4787,x:65.9,y:138.5}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.2944,x:34.1,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6536,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4224,x:-42.1,y:185.7,regX:0.6}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.0037,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1503,x:24.3,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.8,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.6499,x:-0.8,y:-81.05}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.8265,x:-91.9,y:52.2,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7426,x:-59.95,y:132.55,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-144.3284,x:-59.95,y:132.35,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-65.1808,y:-12.55,x:-59.15,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7192,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:88.0252,x:47.9,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:86.5909,x:51.35,y:49.9,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:71.7012,x:65.05,y:134.85,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:64.8258,x:65.4,y:138.65}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.2927,x:34.15,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.6783,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4268,x:-42.2,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.0062,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1555,x:24.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-11.7771,x:-0.7,y:-81.2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.8458,x:-91.65,y:52.3,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.755,x:-59.65,y:132.6,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-145.1109,x:-59.65,y:132.5,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-65.4169,y:-12.55,x:-59.2,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7175,x:-9.65,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:88.0629,x:47.9,y:-21.1,regX:-32.6}},{t:this.instance_13,p:{rotation:86.9412,x:51.3,y:49.9,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:72.0477,x:64.45,y:134.95,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10.1,regY:10.2,scaleX:0.9973,scaleY:0.9973,rotation:65.1724,x:64.75,y:138.65}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.2909,x:34.2,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.7028,y:-59.6,x:-4.5}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4312,x:-42.2,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.008,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.161,x:24.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.2,scaleX:0.998,scaleY:0.998,rotation:-11.9042,x:-0.65,y:-81.1}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.8642,x:-91.35,y:52.5,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7681,x:-59.35,y:132.75,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-145.8953,x:-59.35,y:132.6,regX:14.3}},{t:this.instance,p:{regY:10.1,scaleX:0.9974,scaleY:0.9974,rotation:-65.6546,y:-12.45,x:-59.05,regX:33.8}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.4,scaleX:0.9994,scaleY:0.9994,rotation:1.7166,x:-9.6,y:48.95}},{t:this.instance_14,p:{regY:13.7,scaleX:0.9976,scaleY:0.9976,rotation:88.1006,x:47.85,y:-21.05,regX:-32.6}},{t:this.instance_13,p:{rotation:87.2922,x:51.2,y:49.9,regX:-45.4,regY:13.3}},{t:this.instance_12,p:{rotation:72.394,x:63.85,y:135.1,regY:13.7,regX:-7.7,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_11,p:{regX:-10,regY:10.2,scaleX:0.9972,scaleY:0.9972,rotation:65.5201,x:64.15,y:138.8}},{t:this.instance_10,p:{regX:3.4,regY:-50.7,scaleX:0.9948,scaleY:0.9948,rotation:-2.29,x:34.15,y:185.4}},{t:this.instance_9,p:{scaleX:0.9981,scaleY:0.9981,rotation:5.7276,y:-59.6,x:-4.45}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:3.4355,x:-42.2,y:185.7,regX:0.5}},{t:this.instance_7,p:{regY:-42.5,scaleX:0.9955,scaleY:0.9955,rotation:4.009,x:-30.05,y:90}},{t:this.instance_6,p:{regY:4.7,scaleX:0.9946,scaleY:0.9946,rotation:-9.1664,x:24.3,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regX:1.9,regY:51.1,scaleX:0.998,scaleY:0.998,rotation:-12.0305,x:-0.6,y:-81.15}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.8826,x:-91.1,y:52.6,regY:7.5,regX:44.2}},{t:this.instance_2,p:{regY:-9.1,rotation:-131.7811,x:-59.05,y:132.8,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_1,p:{scaleX:0.997,scaleY:0.997,rotation:-146.6779,x:-59,y:132.75,regX:14.3}},{t:this.instance,p:{regY:10,scaleX:0.9974,scaleY:0.9974,rotation:-65.8904,y:-12.45,x:-59.2,regX:33.8}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-121.9,-211.5,238,508.9);


(lib.companions_button = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance.setTransform(366.4,270.3,0.4449,0.4445,0,76.5591,-103.4194,33.5,10.1);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(382.8,339.05,0.4446,0.4443,0,109.041,-70.9911,14.4,0.3);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(382.95,339.05,0.4448,0.4445,0,89.64,-90.3597,4.5,-8.9);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(375,301.4,0.4448,0.4444,0,83.4028,-96.5859,43.8,8.1);

	this.instance_4 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_4.setTransform(342.55,239.55,0.4448,0.4452,0,3.8817,-176.111,1.8,50.8);

	this.instance_5 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_5.setTransform(343.05,259.75,0.4457,0.446,0,0,180,0.4,-39.9);

	this.instance_6 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_6.setTransform(329,315.25,0.4432,0.4436,0,8.9549,-171.0299,0.4,4.9);

	this.instance_7 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_7.setTransform(353.3,316.45,0.4437,0.444,0,-3.9174,176.0754,1.8,-41.8);

	this.instance_8 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_8.setTransform(358.45,358.6,0.4434,0.4437,0,-20.8881,159.0803,1.6,-51.6);

	this.instance_9 = new lib.ch1_neckcopy2("synched",0);
	this.instance_9.setTransform(341.85,249.15,0.4448,0.4452,0,6.7755,-173.2131,-1.2,6.9);

	this.instance_10 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_10.setTransform(324.6,358.4,0.4433,0.4437,0,0.4059,-179.5918,4.3,-50.9);

	this.instance_11 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_11.setTransform(311.9,336.35,0.4446,0.4445,0,-127.0973,52.9515,-10.3,11);

	this.instance_12 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_12.setTransform(310.35,336.05,0.4444,0.4446,0,-146.9023,33.1423,-7.6,13.3);

	this.instance_13 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_13.setTransform(315.65,297.85,0.4448,0.4445,0,-87.6231,92.3729,-45.5,12.1);

	this.instance_14 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_14.setTransform(318.3,266.6,0.4449,0.4446,0,-85.6873,94.3054,-32.2,12.9);

	this.instance_15 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_15.setTransform(344.35,297.8,0.4455,0.4458,0,-1.7691,178.2276,-4.5,-21.9);

	this.instance_16 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_16.setTransform(265,311.6,0.4449,0.4448,0,67.692,-112.3072,33.9,10.3);

	this.instance_17 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_17.setTransform(245.25,360.95,0.4446,0.4446,0,155.764,-24.2368,14.4,-0.1);

	this.instance_18 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_18.setTransform(245.3,360.9,0.4448,0.4448,0,168.7737,-11.227,4.7,-8.8);

	this.instance_19 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_19.setTransform(278.4,340.9,0.4448,0.4448,0,153.9439,-26.0587,44.8,7.7);

	this.instance_20 = new lib.ch1_headcopy_3("synched",0);
	this.instance_20.setTransform(238.05,281.1,0.4451,0.4451,0,11.481,-168.5182,1.9,51);

	this.instance_21 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_21.setTransform(241.95,300.95,0.4458,0.4459,0,0,180,0,-39.8);

	this.instance_22 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_22.setTransform(227.25,355.95,0.4435,0.4435,0,11.3733,-168.6243,-0.1,5);

	this.instance_23 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_23.setTransform(251.6,357.35,0.4439,0.4439,0,-2.1354,177.8643,1.4,-42.8);

	this.instance_24 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_24.setTransform(255.25,400.05,0.4437,0.4437,0,-8.0081,171.9931,1.2,-51.7);

	this.instance_25 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_25.setTransform(240.55,290.55,0.4451,0.4451,0,-11.793,168.2043,-1.4,7.4);

	this.instance_26 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_26.setTransform(221.05,398.95,0.4435,0.4436,0,2.6401,-177.3597,3.7,-50.5);

	this.instance_27 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_27.setTransform(199.5,375.7,0.4447,0.4447,0,-53.3806,126.6167,-10.5,10.6);

	this.instance_28 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_28.setTransform(200.3,374.35,0.4447,0.4447,0,-49.1433,130.8538,-8.1,13.5);

	this.instance_29 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_29.setTransform(216.15,339.35,0.4448,0.4448,0,-71.3879,108.6121,-45.8,13);

	this.instance_30 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_30.setTransform(217.4,307.6,0.4449,0.4449,0,-88.3235,91.6765,-33.1,13.7);

	this.instance_31 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_31.setTransform(242.9,338.95,0.4456,0.4456,0,-1.7758,178.2241,-4,-21.9);

	this.instance_32 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_32.setTransform(298.65,222.5,0.4445,0.4449,0,65.921,-114.1366,33.9,10.2);

	this.instance_33 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_33.setTransform(298.65,287.25,0.4447,0.4444,0,146.6416,-33.2855,14.2,0);

	this.instance_34 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_34.setTransform(298.6,287.15,0.4446,0.4447,0,131.7411,-48.1787,4.5,-8.8);

	this.instance_35 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_35.setTransform(312.8,251.55,0.4445,0.4449,0,116.8507,-63.0857,44.1,7.8);

	this.instance_36 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_36.setTransform(272.55,191.85,0.4453,0.4447,0,12.0456,-167.9881,1.9,51.2);

	this.instance_37 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_37.setTransform(275.5,212,0.4462,0.4456,0,0,180,0,-39.6);

	this.instance_38 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_38.setTransform(261.35,267.4,0.4438,0.4432,0,9.1733,-170.8489,0.3,4.6);

	this.instance_39 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_39.setTransform(285.75,268.15,0.4442,0.4436,0,-4.0123,175.9991,1.4,-42.6);

	this.instance_40 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_40.setTransform(291.1,310.8,0.444,0.4434,0,-3.4371,176.5716,0.7,-51.1);

	this.instance_41 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_41.setTransform(274.25,201.55,0.4453,0.4447,0,-5.7341,174.2816,-1.5,7.4);

	this.instance_42 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_42.setTransform(257,310.65,0.4438,0.4432,0,2.2927,-177.7144,3.6,-50.9);

	this.instance_43 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_43.setTransform(243.65,289.9,0.4444,0.4448,0,-65.551,114.507,-10.1,10.1);

	this.instance_44 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_44.setTransform(243.8,288.3,0.4444,0.4449,0,-72.4189,107.6256,-7.7,13.5);

	this.instance_45 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_45.setTransform(249.35,250.35,0.4444,0.445,0,-87.2997,92.708,-45.5,13.2);

	this.instance_46 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_46.setTransform(250.9,218.65,0.4445,0.4451,0,-88.1062,91.9003,-32.8,13.7);

	this.instance_47 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_47.setTransform(276.5,249.95,0.4459,0.4453,0,-1.7162,178.2882,-4.2,-21.9);

	this.instance_48 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_48.setTransform(171.75,270.85,0.4448,0.4447,0,84.5603,-95.4411,33.6,10.2);

	this.instance_49 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_49.setTransform(173.7,341,0.4446,0.4445,0,122.4594,-57.5443,14.6,-0.1);

	this.instance_50 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_50.setTransform(173.6,340.95,0.4447,0.4447,0,115.9557,-64.0469,5,-8.8);

	this.instance_51 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_51.setTransform(175.85,302.7,0.4447,0.4447,0,98.3917,-81.6069,44.6,7.6);

	this.instance_52 = new lib.ch1_headcopy_2("synched",0);
	this.instance_52.setTransform(144.8,240.2,0.445,0.445,0,11.862,-168.1367,2,51);

	this.instance_53 = new lib.ch1_uBodycopy("synched",0);
	this.instance_53.setTransform(148.6,260.2,0.4458,0.4458,0,0,180,0,-39.7);

	this.instance_54 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_54.setTransform(134.65,315.5,0.4435,0.4435,0,8.9704,-171.0287,-0.1,4.3);

	this.instance_55 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_55.setTransform(158.8,316.4,0.4438,0.4439,0,-3.9366,176.0629,1.4,-42.6);

	this.instance_56 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_56.setTransform(163.7,358.9,0.4436,0.4437,0,-6.4612,173.5379,1.6,-51.6);

	this.instance_57 = new lib.ch1_neckcopy("synched",0);
	this.instance_57.setTransform(147.2,249.8,0.445,0.445,0,-11.3539,168.6454,-1.2,7.5);

	this.instance_58 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_58.setTransform(130.25,358.95,0.4435,0.4436,0,3.3941,-176.6075,3.5,-50.5);

	this.instance_59 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_59.setTransform(132.4,337.9,0.4447,0.4446,0,-118.0214,61.9805,-10.4,10.7);

	this.instance_60 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_60.setTransform(132.1,336.45,0.4447,0.4446,0,-82.7169,97.2821,-7.7,13.2);

	this.instance_61 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_61.setTransform(125.5,298.5,0.4447,0.4447,0,-105.8433,74.1572,-45.8,13);

	this.instance_62 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_62.setTransform(124,266.9,0.4449,0.4448,0,-93.2291,86.7693,-33,13.7);

	this.instance_63 = new lib.ch1_lBodycopy("synched",0);
	this.instance_63.setTransform(149.55,298.15,0.4455,0.4456,0,-1.7759,178.2238,-4,-21.9);

	this.instance_64 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_64.setTransform(216.3,215.55,0.4449,0.4445,0,76.5591,-103.4194,33.5,10.1);

	this.instance_65 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_65.setTransform(232.7,284.3,0.4446,0.4443,0,109.041,-70.9911,14.4,0.3);

	this.instance_66 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_66.setTransform(232.85,284.3,0.4448,0.4445,0,89.64,-90.3597,4.5,-8.9);

	this.instance_67 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_67.setTransform(224.9,246.65,0.4448,0.4444,0,83.4028,-96.5859,43.8,8.1);

	this.instance_68 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_68.setTransform(192.45,184.8,0.4448,0.4452,0,3.8817,-176.111,1.8,50.8);

	this.instance_69 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_69.setTransform(192.95,205,0.4457,0.446,0,0,180,0.4,-39.9);

	this.instance_70 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_70.setTransform(178.9,260.5,0.4432,0.4436,0,8.9549,-171.0299,0.4,4.9);

	this.instance_71 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_71.setTransform(203.2,261.7,0.4437,0.444,0,-3.9174,176.0754,1.8,-41.8);

	this.instance_72 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_72.setTransform(208.35,303.85,0.4434,0.4437,0,-20.8881,159.0803,1.6,-51.6);

	this.instance_73 = new lib.ch1_neckcopy2("synched",0);
	this.instance_73.setTransform(191.75,194.4,0.4448,0.4452,0,6.7755,-173.2131,-1.2,6.9);

	this.instance_74 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_74.setTransform(174.5,303.65,0.4433,0.4437,0,0.4059,-179.5918,4.3,-50.9);

	this.instance_75 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_75.setTransform(161.8,281.6,0.4446,0.4445,0,-127.0973,52.9515,-10.3,11);

	this.instance_76 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_76.setTransform(160.25,281.3,0.4444,0.4446,0,-146.9023,33.1423,-7.6,13.3);

	this.instance_77 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_77.setTransform(165.55,243.1,0.4448,0.4445,0,-87.6231,92.3729,-45.5,12.1);

	this.instance_78 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_78.setTransform(168.2,211.85,0.4449,0.4446,0,-85.6873,94.3054,-32.2,12.9);

	this.instance_79 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_79.setTransform(194.25,243.05,0.4455,0.4458,0,-1.7691,178.2276,-4.5,-21.9);

	this.instance_80 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_80.setTransform(240.55,161.8,0.4448,0.4447,0,84.5603,-95.4411,33.6,10.2);

	this.instance_81 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_81.setTransform(242.5,231.95,0.4446,0.4445,0,122.4594,-57.5443,14.6,-0.1);

	this.instance_82 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_82.setTransform(242.4,231.9,0.4447,0.4447,0,115.9557,-64.0469,5,-8.8);

	this.instance_83 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_83.setTransform(244.65,193.65,0.4447,0.4447,0,98.3917,-81.6069,44.6,7.6);

	this.instance_84 = new lib.ch1_headcopy_2("synched",0);
	this.instance_84.setTransform(213.6,131.15,0.445,0.445,0,11.862,-168.1367,2,51);

	this.instance_85 = new lib.ch1_uBodycopy("synched",0);
	this.instance_85.setTransform(217.4,151.15,0.4458,0.4458,0,0,180,0,-39.7);

	this.instance_86 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_86.setTransform(203.45,206.45,0.4435,0.4435,0,8.9704,-171.0287,-0.1,4.3);

	this.instance_87 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_87.setTransform(227.6,207.35,0.4438,0.4439,0,-3.9366,176.0629,1.4,-42.6);

	this.instance_88 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_88.setTransform(232.5,249.85,0.4436,0.4437,0,-6.4612,173.5379,1.6,-51.6);

	this.instance_89 = new lib.ch1_neckcopy("synched",0);
	this.instance_89.setTransform(216,140.75,0.445,0.445,0,-11.3539,168.6454,-1.2,7.5);

	this.instance_90 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_90.setTransform(199.05,249.9,0.4435,0.4436,0,3.3941,-176.6075,3.5,-50.5);

	this.instance_91 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_91.setTransform(201.2,228.85,0.4447,0.4446,0,-118.0214,61.9805,-10.4,10.7);

	this.instance_92 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_92.setTransform(200.9,227.4,0.4447,0.4446,0,-82.7169,97.2821,-7.7,13.2);

	this.instance_93 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_93.setTransform(194.3,189.45,0.4447,0.4447,0,-105.8433,74.1572,-45.8,13);

	this.instance_94 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_94.setTransform(192.8,157.85,0.4449,0.4448,0,-93.2291,86.7693,-33,13.7);

	this.instance_95 = new lib.ch1_lBodycopy("synched",0);
	this.instance_95.setTransform(218.35,189.1,0.4455,0.4456,0,-1.7759,178.2238,-4,-21.9);

	this.instance_96 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_96.setTransform(293.1,100.5,0.4449,0.4448,0,67.692,-112.3072,33.9,10.3);

	this.instance_97 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_97.setTransform(273.35,149.85,0.4446,0.4446,0,155.764,-24.2368,14.4,-0.1);

	this.instance_98 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_98.setTransform(273.4,149.8,0.4448,0.4448,0,168.7737,-11.227,4.7,-8.8);

	this.instance_99 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_99.setTransform(306.5,129.8,0.4448,0.4448,0,153.9439,-26.0587,44.8,7.7);

	this.instance_100 = new lib.ch1_headcopy_3("synched",0);
	this.instance_100.setTransform(266.15,70,0.4451,0.4451,0,11.481,-168.5182,1.9,51);

	this.instance_101 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_101.setTransform(270.05,89.85,0.4458,0.4459,0,0,180,0,-39.8);

	this.instance_102 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_102.setTransform(255.35,144.85,0.4435,0.4435,0,11.3733,-168.6243,-0.1,5);

	this.instance_103 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_103.setTransform(279.7,146.25,0.4439,0.4439,0,-2.1354,177.8643,1.4,-42.8);

	this.instance_104 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_104.setTransform(283.35,188.95,0.4437,0.4437,0,-8.0081,171.9931,1.2,-51.7);

	this.instance_105 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_105.setTransform(268.65,79.45,0.4451,0.4451,0,-11.793,168.2043,-1.4,7.4);

	this.instance_106 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_106.setTransform(249.15,187.85,0.4435,0.4436,0,2.6401,-177.3597,3.7,-50.5);

	this.instance_107 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_107.setTransform(227.6,164.6,0.4447,0.4447,0,-53.3806,126.6167,-10.5,10.6);

	this.instance_108 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_108.setTransform(228.4,163.25,0.4447,0.4447,0,-49.1433,130.8538,-8.1,13.5);

	this.instance_109 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_109.setTransform(244.25,128.25,0.4448,0.4448,0,-71.3879,108.6121,-45.8,13);

	this.instance_110 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_110.setTransform(245.5,96.5,0.4449,0.4449,0,-88.3235,91.6765,-33.1,13.7);

	this.instance_111 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_111.setTransform(271,127.85,0.4456,0.4456,0,-1.7758,178.2241,-4,-21.9);

	this.instance_112 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_112.setTransform(359.25,94.6,0.4448,0.4447,0,84.5603,-95.4411,33.6,10.2);

	this.instance_113 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_113.setTransform(361.2,164.75,0.4446,0.4445,0,122.4594,-57.5443,14.6,-0.1);

	this.instance_114 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_114.setTransform(361.1,164.7,0.4447,0.4447,0,115.9557,-64.0469,5,-8.8);

	this.instance_115 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_115.setTransform(363.35,126.45,0.4447,0.4447,0,98.3917,-81.6069,44.6,7.6);

	this.instance_116 = new lib.ch1_headcopy_2("synched",0);
	this.instance_116.setTransform(332.3,63.95,0.445,0.445,0,11.862,-168.1367,2,51);

	this.instance_117 = new lib.ch1_uBodycopy("synched",0);
	this.instance_117.setTransform(336.1,83.95,0.4458,0.4458,0,0,180,0,-39.7);

	this.instance_118 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_118.setTransform(322.15,139.25,0.4435,0.4435,0,8.9704,-171.0287,-0.1,4.3);

	this.instance_119 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_119.setTransform(346.3,140.15,0.4438,0.4439,0,-3.9366,176.0629,1.4,-42.6);

	this.instance_120 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_120.setTransform(351.2,182.65,0.4436,0.4437,0,-6.4612,173.5379,1.6,-51.6);

	this.instance_121 = new lib.ch1_neckcopy("synched",0);
	this.instance_121.setTransform(334.7,73.55,0.445,0.445,0,-11.3539,168.6454,-1.2,7.5);

	this.instance_122 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_122.setTransform(317.75,182.7,0.4435,0.4436,0,3.3941,-176.6075,3.5,-50.5);

	this.instance_123 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_123.setTransform(319.9,161.65,0.4447,0.4446,0,-118.0214,61.9805,-10.4,10.7);

	this.instance_124 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_124.setTransform(319.6,160.2,0.4447,0.4446,0,-82.7169,97.2821,-7.7,13.2);

	this.instance_125 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_125.setTransform(313,122.25,0.4447,0.4447,0,-105.8433,74.1572,-45.8,13);

	this.instance_126 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_126.setTransform(311.5,90.65,0.4449,0.4448,0,-93.2291,86.7693,-33,13.7);

	this.instance_127 = new lib.ch1_lBodycopy("synched",0);
	this.instance_127.setTransform(337.05,121.9,0.4455,0.4456,0,-1.7759,178.2238,-4,-21.9);

	this.instance_128 = new lib.ch1_uArm_rcopy_2("synched",0);
	this.instance_128.setTransform(192.6,121.5,0.4446,0.4446,0,74.6386,-105.3608,33.2,9.7);

	this.instance_129 = new lib.ch1_hand_rcopy_2("synched",0);
	this.instance_129.setTransform(180.9,184.3,0.4444,0.4443,0,131.1071,-48.8942,14.3,-1);

	this.instance_130 = new lib.ch1_thumb_rcopy_2("synched",0);
	this.instance_130.setTransform(180.75,184.4,0.4445,0.4445,0,110.4605,-69.542,4.2,-9.6);

	this.instance_131 = new lib.ch1_lArm_rcopy_2("synched",0);
	this.instance_131.setTransform(202.25,152.3,0.4445,0.4445,0,128.9037,-51.0975,44.6,7.2);

	this.instance_132 = new lib.ch1_headcopy("synched",0);
	this.instance_132.setTransform(165.6,93.6,0.4448,0.4448,0,11.855,-168.1446,1.7,50.6);

	this.instance_133 = new lib.ch1_uBodycopy_2("synched",0);
	this.instance_133.setTransform(169.45,113.65,0.4456,0.4457,0,0,180,-0.5,-39.2);

	this.instance_134 = new lib.ch1_uLeg_lcopy_2("synched",0);
	this.instance_134.setTransform(155.5,169.05,0.4433,0.4434,0,8.9653,-171.034,-0.7,4.9);

	this.instance_135 = new lib.ch1_uLeg_rcopy_2("synched",0);
	this.instance_135.setTransform(179.65,169.9,0.4437,0.4437,0,-3.928,176.0719,1,-42);

	this.instance_136 = new lib.ch1_lLeg_rcopy_2("synched",0);
	this.instance_136.setTransform(184.95,212.6,0.4435,0.4436,0,-2.5552,177.4446,0.2,-50.8);

	this.instance_137 = new lib.ch1_neckcopy_2("synched",0);
	this.instance_137.setTransform(168.05,103.2,0.4449,0.4449,0,-11.3442,168.6558,-1.8,7.5);

	this.instance_138 = new lib.ch1_lLeg_lcopy_2("synched",0);
	this.instance_138.setTransform(151.15,212.4,0.4434,0.4435,0,4.2505,-175.7493,2.9,-50.6);

	this.instance_139 = new lib.ch1_hand_lcopy_2("synched",0);
	this.instance_139.setTransform(128.9,189.65,0.4444,0.4444,0,-55.1319,124.8654,-10.2,11.3);

	this.instance_140 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_140.setTransform(129.25,188,0.4444,0.4444,0,-65.9203,114.0789,-7.8,14.1);

	this.instance_141 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_141.setTransform(141.95,151.9,0.4445,0.4445,0,-76.1956,103.8078,-45.1,13.2);

	this.instance_142 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_142.setTransform(144.9,120.25,0.4447,0.4446,0,-85.481,94.5189,-32.6,14.2);

	this.instance_143 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_143.setTransform(170.35,151.6,0.4454,0.4454,0,-1.7667,178.2333,-4.4,-21.4);

	this.instance_144 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_144.setTransform(239.6,34.8,0.4449,0.4445,0,76.5591,-103.4194,33.5,10.1);

	this.instance_145 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_145.setTransform(256,103.55,0.4446,0.4443,0,109.041,-70.9911,14.4,0.3);

	this.instance_146 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_146.setTransform(256.15,103.55,0.4448,0.4445,0,89.64,-90.3597,4.5,-8.9);

	this.instance_147 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_147.setTransform(248.2,65.9,0.4448,0.4444,0,83.4028,-96.5859,43.8,8.1);

	this.instance_148 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_148.setTransform(215.75,4.05,0.4448,0.4452,0,3.8817,-176.111,1.8,50.8);

	this.instance_149 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_149.setTransform(216.25,24.25,0.4457,0.446,0,0,180,0.4,-39.9);

	this.instance_150 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_150.setTransform(202.2,79.75,0.4432,0.4436,0,8.9549,-171.0299,0.4,4.9);

	this.instance_151 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_151.setTransform(226.5,80.95,0.4437,0.444,0,-3.9174,176.0754,1.8,-41.8);

	this.instance_152 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_152.setTransform(231.65,123.1,0.4434,0.4437,0,-20.8881,159.0803,1.6,-51.6);

	this.instance_153 = new lib.ch1_neckcopy2("synched",0);
	this.instance_153.setTransform(215.05,13.65,0.4448,0.4452,0,6.7755,-173.2131,-1.2,6.9);

	this.instance_154 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_154.setTransform(197.8,122.9,0.4433,0.4437,0,0.4059,-179.5918,4.3,-50.9);

	this.instance_155 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_155.setTransform(185.1,100.85,0.4446,0.4445,0,-127.0973,52.9515,-10.3,11);

	this.instance_156 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_156.setTransform(183.55,100.55,0.4444,0.4446,0,-146.9023,33.1423,-7.6,13.3);

	this.instance_157 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_157.setTransform(188.85,62.35,0.4448,0.4445,0,-87.6231,92.3729,-45.5,12.1);

	this.instance_158 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_158.setTransform(191.5,31.1,0.4449,0.4446,0,-85.6873,94.3054,-32.2,12.9);

	this.instance_159 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_159.setTransform(217.55,62.3,0.4455,0.4458,0,-1.7691,178.2276,-4.5,-21.9);

	this.instance_160 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_160.setTransform(288.25,-14.3,0.4449,0.4445,0,76.5591,-103.4194,33.5,10.1);

	this.instance_161 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_161.setTransform(304.65,54.45,0.4446,0.4443,0,109.041,-70.9911,14.4,0.3);

	this.instance_162 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_162.setTransform(304.8,54.45,0.4448,0.4445,0,89.64,-90.3597,4.5,-8.9);

	this.instance_163 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_163.setTransform(296.85,16.8,0.4448,0.4444,0,83.4028,-96.5859,43.8,8.1);

	this.instance_164 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_164.setTransform(264.4,-45.05,0.4448,0.4452,0,3.8817,-176.111,1.8,50.8);

	this.instance_165 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_165.setTransform(264.9,-24.85,0.4457,0.446,0,0,180,0.4,-39.9);

	this.instance_166 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_166.setTransform(250.85,30.65,0.4432,0.4436,0,8.9549,-171.0299,0.4,4.9);

	this.instance_167 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_167.setTransform(275.15,31.85,0.4437,0.444,0,-3.9174,176.0754,1.8,-41.8);

	this.instance_168 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_168.setTransform(280.3,74,0.4434,0.4437,0,-20.8881,159.0803,1.6,-51.6);

	this.instance_169 = new lib.ch1_neckcopy2("synched",0);
	this.instance_169.setTransform(263.7,-35.45,0.4448,0.4452,0,6.7755,-173.2131,-1.2,6.9);

	this.instance_170 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_170.setTransform(246.45,73.8,0.4433,0.4437,0,0.4059,-179.5918,4.3,-50.9);

	this.instance_171 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_171.setTransform(233.75,51.75,0.4446,0.4445,0,-127.0973,52.9515,-10.3,11);

	this.instance_172 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_172.setTransform(232.2,51.45,0.4444,0.4446,0,-146.9023,33.1423,-7.6,13.3);

	this.instance_173 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_173.setTransform(237.5,13.25,0.4448,0.4445,0,-87.6231,92.3729,-45.5,12.1);

	this.instance_174 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_174.setTransform(240.15,-18,0.4449,0.4446,0,-85.6873,94.3054,-32.2,12.9);

	this.instance_175 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_175.setTransform(266.2,13.2,0.4455,0.4458,0,-1.7691,178.2276,-4.5,-21.9);

	this.instance_176 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_176.setTransform(83.85,247.4,0.4449,0.4445,0,76.5591,-103.4194,33.5,10.1);

	this.instance_177 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_177.setTransform(100.25,316.15,0.4446,0.4443,0,109.041,-70.9911,14.4,0.3);

	this.instance_178 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_178.setTransform(100.4,316.15,0.4448,0.4445,0,89.64,-90.3597,4.5,-8.9);

	this.instance_179 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_179.setTransform(92.45,278.5,0.4448,0.4444,0,83.4028,-96.5859,43.8,8.1);

	this.instance_180 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_180.setTransform(60,216.65,0.4448,0.4452,0,3.8817,-176.111,1.8,50.8);

	this.instance_181 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_181.setTransform(60.5,236.85,0.4457,0.446,0,0,180,0.4,-39.9);

	this.instance_182 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_182.setTransform(46.45,292.35,0.4432,0.4436,0,8.9549,-171.0299,0.4,4.9);

	this.instance_183 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_183.setTransform(70.75,293.55,0.4437,0.444,0,-3.9174,176.0754,1.8,-41.8);

	this.instance_184 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_184.setTransform(75.9,335.7,0.4434,0.4437,0,-20.8881,159.0803,1.6,-51.6);

	this.instance_185 = new lib.ch1_neckcopy2("synched",0);
	this.instance_185.setTransform(59.3,226.25,0.4448,0.4452,0,6.7755,-173.2131,-1.2,6.9);

	this.instance_186 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_186.setTransform(42.05,335.5,0.4433,0.4437,0,0.4059,-179.5918,4.3,-50.9);

	this.instance_187 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_187.setTransform(29.35,313.45,0.4446,0.4445,0,-127.0973,52.9515,-10.3,11);

	this.instance_188 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_188.setTransform(27.8,313.15,0.4444,0.4446,0,-146.9023,33.1423,-7.6,13.3);

	this.instance_189 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_189.setTransform(33.1,274.95,0.4448,0.4445,0,-87.6231,92.3729,-45.5,12.1);

	this.instance_190 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_190.setTransform(35.75,243.7,0.4449,0.4446,0,-85.6873,94.3054,-32.2,12.9);

	this.instance_191 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_191.setTransform(61.8,274.9,0.4455,0.4458,0,-1.7691,178.2276,-4.5,-21.9);

	this.instance_192 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_192.setTransform(27.85,75.9,0.4449,0.4445,0,76.5591,-103.4194,33.5,10.1);

	this.instance_193 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_193.setTransform(44.25,144.65,0.4446,0.4443,0,109.041,-70.9911,14.4,0.3);

	this.instance_194 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_194.setTransform(44.4,144.65,0.4448,0.4445,0,89.64,-90.3597,4.5,-8.9);

	this.instance_195 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_195.setTransform(36.45,107,0.4448,0.4444,0,83.4028,-96.5859,43.8,8.1);

	this.instance_196 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_196.setTransform(4,45.15,0.4448,0.4452,0,3.8817,-176.111,1.8,50.8);

	this.instance_197 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_197.setTransform(4.5,65.35,0.4457,0.446,0,0,180,0.4,-39.9);

	this.instance_198 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_198.setTransform(-9.55,120.85,0.4432,0.4436,0,8.9549,-171.0299,0.4,4.9);

	this.instance_199 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_199.setTransform(14.75,122.05,0.4437,0.444,0,-3.9174,176.0754,1.8,-41.8);

	this.instance_200 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_200.setTransform(19.9,164.2,0.4434,0.4437,0,-20.8881,159.0803,1.6,-51.6);

	this.instance_201 = new lib.ch1_neckcopy2("synched",0);
	this.instance_201.setTransform(3.3,54.75,0.4448,0.4452,0,6.7755,-173.2131,-1.2,6.9);

	this.instance_202 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_202.setTransform(-13.95,164,0.4433,0.4437,0,0.4059,-179.5918,4.3,-50.9);

	this.instance_203 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_203.setTransform(-26.65,141.95,0.4446,0.4445,0,-127.0973,52.9515,-10.3,11);

	this.instance_204 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_204.setTransform(-28.2,141.65,0.4444,0.4446,0,-146.9023,33.1423,-7.6,13.3);

	this.instance_205 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_205.setTransform(-22.9,103.45,0.4448,0.4445,0,-87.6231,92.3729,-45.5,12.1);

	this.instance_206 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_206.setTransform(-20.25,72.2,0.4449,0.4446,0,-85.6873,94.3054,-32.2,12.9);

	this.instance_207 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_207.setTransform(5.8,103.4,0.4455,0.4458,0,-1.7691,178.2276,-4.5,-21.9);

	this.instance_208 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_208.setTransform(-42.95,-50.3,0.4449,0.4445,0,76.5591,-103.4194,33.5,10.1);

	this.instance_209 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_209.setTransform(-26.55,18.45,0.4446,0.4443,0,109.041,-70.9911,14.4,0.3);

	this.instance_210 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_210.setTransform(-26.4,18.45,0.4448,0.4445,0,89.64,-90.3597,4.5,-8.9);

	this.instance_211 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_211.setTransform(-34.35,-19.2,0.4448,0.4444,0,83.4028,-96.5859,43.8,8.1);

	this.instance_212 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_212.setTransform(-66.8,-81.05,0.4448,0.4452,0,3.8817,-176.111,1.8,50.8);

	this.instance_213 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_213.setTransform(-66.3,-60.85,0.4457,0.446,0,0,180,0.4,-39.9);

	this.instance_214 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_214.setTransform(-80.35,-5.35,0.4432,0.4436,0,8.9549,-171.0299,0.4,4.9);

	this.instance_215 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_215.setTransform(-56.05,-4.15,0.4437,0.444,0,-3.9174,176.0754,1.8,-41.8);

	this.instance_216 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_216.setTransform(-50.9,38,0.4434,0.4437,0,-20.8881,159.0803,1.6,-51.6);

	this.instance_217 = new lib.ch1_neckcopy2("synched",0);
	this.instance_217.setTransform(-67.5,-71.45,0.4448,0.4452,0,6.7755,-173.2131,-1.2,6.9);

	this.instance_218 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_218.setTransform(-84.75,37.8,0.4433,0.4437,0,0.4059,-179.5918,4.3,-50.9);

	this.instance_219 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_219.setTransform(-97.45,15.75,0.4446,0.4445,0,-127.0973,52.9515,-10.3,11);

	this.instance_220 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_220.setTransform(-99,15.45,0.4444,0.4446,0,-146.9023,33.1423,-7.6,13.3);

	this.instance_221 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_221.setTransform(-93.7,-22.75,0.4448,0.4445,0,-87.6231,92.3729,-45.5,12.1);

	this.instance_222 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_222.setTransform(-91.05,-54,0.4449,0.4446,0,-85.6873,94.3054,-32.2,12.9);

	this.instance_223 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_223.setTransform(-65,-22.8,0.4455,0.4458,0,-1.7691,178.2276,-4.5,-21.9);

	this.instance_224 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_224.setTransform(-97.9,154.45,0.4449,0.4448,0,67.692,-112.3072,33.9,10.3);

	this.instance_225 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_225.setTransform(-117.65,203.8,0.4446,0.4446,0,155.764,-24.2368,14.4,-0.1);

	this.instance_226 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_226.setTransform(-117.6,203.75,0.4448,0.4448,0,168.7737,-11.227,4.7,-8.8);

	this.instance_227 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_227.setTransform(-84.5,183.75,0.4448,0.4448,0,153.9439,-26.0587,44.8,7.7);

	this.instance_228 = new lib.ch1_headcopy_3("synched",0);
	this.instance_228.setTransform(-124.85,123.95,0.4451,0.4451,0,11.481,-168.5182,1.9,51);

	this.instance_229 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_229.setTransform(-120.95,143.8,0.4458,0.4459,0,0,180,0,-39.8);

	this.instance_230 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_230.setTransform(-135.65,198.8,0.4435,0.4435,0,11.3733,-168.6243,-0.1,5);

	this.instance_231 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_231.setTransform(-111.3,200.2,0.4439,0.4439,0,-2.1354,177.8643,1.4,-42.8);

	this.instance_232 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_232.setTransform(-107.65,242.9,0.4437,0.4437,0,-8.0081,171.9931,1.2,-51.7);

	this.instance_233 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_233.setTransform(-122.35,133.4,0.4451,0.4451,0,-11.793,168.2043,-1.4,7.4);

	this.instance_234 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_234.setTransform(-141.85,241.8,0.4435,0.4436,0,2.6401,-177.3597,3.7,-50.5);

	this.instance_235 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_235.setTransform(-163.4,218.55,0.4447,0.4447,0,-53.3806,126.6167,-10.5,10.6);

	this.instance_236 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_236.setTransform(-162.6,217.2,0.4447,0.4447,0,-49.1433,130.8538,-8.1,13.5);

	this.instance_237 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_237.setTransform(-146.75,182.2,0.4448,0.4448,0,-71.3879,108.6121,-45.8,13);

	this.instance_238 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_238.setTransform(-145.5,150.45,0.4449,0.4449,0,-88.3235,91.6765,-33.1,13.7);

	this.instance_239 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_239.setTransform(-120,181.8,0.4456,0.4456,0,-1.7758,178.2241,-4,-21.9);

	this.instance_240 = new lib.ch1_uArm_rcopy_2("synched",0);
	this.instance_240.setTransform(-112.15,84.2,0.4446,0.4446,0,74.6386,-105.3608,33.8,10);

	this.instance_241 = new lib.ch1_hand_rcopy_2("synched",0);
	this.instance_241.setTransform(-123.8,147,0.4444,0.4443,0,131.1071,-48.8942,14.3,-0.4);

	this.instance_242 = new lib.ch1_thumb_rcopy_2("synched",0);
	this.instance_242.setTransform(-123.95,147.1,0.4445,0.4445,0,110.4605,-69.542,4.2,-9.1);

	this.instance_243 = new lib.ch1_lArm_rcopy_2("synched",0);
	this.instance_243.setTransform(-102.45,115,0.4445,0.4445,0,128.9037,-51.0975,44.4,7.6);

	this.instance_244 = new lib.ch1_headcopy("synched",0);
	this.instance_244.setTransform(-139.05,56.25,0.4448,0.4448,0,11.855,-168.1446,2.1,50.6);

	this.instance_245 = new lib.ch1_uBodycopy_2("synched",0);
	this.instance_245.setTransform(-135.25,76.3,0.4456,0.4457,0,0,180,0,-39.7);

	this.instance_246 = new lib.ch1_uLeg_lcopy_2("synched",0);
	this.instance_246.setTransform(-149.2,131.7,0.4433,0.4434,0,8.9653,-171.034,-0.1,4.5);

	this.instance_247 = new lib.ch1_uLeg_rcopy_2("synched",0);
	this.instance_247.setTransform(-125,132.6,0.4437,0.4437,0,-3.928,176.0719,1.4,-42.5);

	this.instance_248 = new lib.ch1_lLeg_rcopy_2("synched",0);
	this.instance_248.setTransform(-119.75,175.3,0.4435,0.4436,0,-2.5552,177.4446,0.7,-50.8);

	this.instance_249 = new lib.ch1_neckcopy_2("synched",0);
	this.instance_249.setTransform(-136.65,65.95,0.4449,0.4449,0,-11.3442,168.6558,-1.4,7.4);

	this.instance_250 = new lib.ch1_lLeg_lcopy_2("synched",0);
	this.instance_250.setTransform(-153.5,175.15,0.4434,0.4435,0,4.2505,-175.7493,3.3,-50.5);

	this.instance_251 = new lib.ch1_hand_lcopy_2("synched",0);
	this.instance_251.setTransform(-175.75,152.4,0.4444,0.4444,0,-55.1319,124.8654,-10.3,10.8);

	this.instance_252 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_252.setTransform(-175.4,150.7,0.4444,0.4444,0,-65.9203,114.0789,-8,13.5);

	this.instance_253 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_253.setTransform(-162.8,114.6,0.4445,0.4445,0,-76.1956,103.8078,-45.4,12.6);

	this.instance_254 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_254.setTransform(-159.8,82.95,0.4447,0.4446,0,-85.481,94.5189,-32.9,13.8);

	this.instance_255 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_255.setTransform(-134.3,114.3,0.4454,0.4454,0,-1.7667,178.2333,-4,-21.7);

	this.instance_256 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_256.setTransform(-306.45,82.75,0.4448,0.4447,0,84.5603,-95.4411,33.6,10.2);

	this.instance_257 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_257.setTransform(-304.5,152.9,0.4446,0.4445,0,122.4594,-57.5443,14.6,-0.1);

	this.instance_258 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_258.setTransform(-304.6,152.85,0.4447,0.4447,0,115.9557,-64.0469,5,-8.8);

	this.instance_259 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_259.setTransform(-302.35,114.6,0.4447,0.4447,0,98.3917,-81.6069,44.6,7.6);

	this.instance_260 = new lib.ch1_headcopy_2("synched",0);
	this.instance_260.setTransform(-333.4,52.1,0.445,0.445,0,11.862,-168.1367,2,51);

	this.instance_261 = new lib.ch1_uBodycopy("synched",0);
	this.instance_261.setTransform(-329.6,72.1,0.4458,0.4458,0,0,180,0,-39.7);

	this.instance_262 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_262.setTransform(-343.55,127.4,0.4435,0.4435,0,8.9704,-171.0287,-0.1,4.3);

	this.instance_263 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_263.setTransform(-319.4,128.3,0.4438,0.4439,0,-3.9366,176.0629,1.4,-42.6);

	this.instance_264 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_264.setTransform(-314.5,170.8,0.4436,0.4437,0,-6.4612,173.5379,1.6,-51.6);

	this.instance_265 = new lib.ch1_neckcopy("synched",0);
	this.instance_265.setTransform(-331,61.7,0.445,0.445,0,-11.3539,168.6454,-1.2,7.5);

	this.instance_266 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_266.setTransform(-347.95,170.85,0.4435,0.4436,0,3.3941,-176.6075,3.5,-50.5);

	this.instance_267 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_267.setTransform(-345.8,149.8,0.4447,0.4446,0,-118.0214,61.9805,-10.4,10.7);

	this.instance_268 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_268.setTransform(-346.1,148.35,0.4447,0.4446,0,-82.7169,97.2821,-7.7,13.2);

	this.instance_269 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_269.setTransform(-352.7,110.4,0.4447,0.4447,0,-105.8433,74.1572,-45.8,13);

	this.instance_270 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_270.setTransform(-354.2,78.8,0.4449,0.4448,0,-93.2291,86.7693,-33,13.7);

	this.instance_271 = new lib.ch1_lBodycopy("synched",0);
	this.instance_271.setTransform(-328.65,110.05,0.4455,0.4456,0,-1.7759,178.2238,-4,-21.9);

	this.instance_272 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_272.setTransform(-354.95,3.55,0.4445,0.4449,0,65.921,-114.1366,33.9,10.2);

	this.instance_273 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_273.setTransform(-354.95,68.3,0.4447,0.4444,0,146.6416,-33.2855,14.2,0);

	this.instance_274 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_274.setTransform(-355,68.2,0.4446,0.4447,0,131.7411,-48.1787,4.5,-8.8);

	this.instance_275 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_275.setTransform(-340.8,32.6,0.4445,0.4449,0,116.8507,-63.0857,44.1,7.8);

	this.instance_276 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_276.setTransform(-381.05,-27.1,0.4453,0.4447,0,12.0456,-167.9881,1.9,51.2);

	this.instance_277 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_277.setTransform(-378.1,-6.95,0.4462,0.4456,0,0,180,0,-39.6);

	this.instance_278 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_278.setTransform(-392.25,48.45,0.4438,0.4432,0,9.1733,-170.8489,0.3,4.6);

	this.instance_279 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_279.setTransform(-367.85,49.2,0.4442,0.4436,0,-4.0123,175.9991,1.4,-42.6);

	this.instance_280 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_280.setTransform(-362.5,91.85,0.444,0.4434,0,-3.4371,176.5716,0.7,-51.1);

	this.instance_281 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_281.setTransform(-379.35,-17.4,0.4453,0.4447,0,-5.7341,174.2816,-1.5,7.4);

	this.instance_282 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_282.setTransform(-396.6,91.7,0.4438,0.4432,0,2.2927,-177.7144,3.6,-50.9);

	this.instance_283 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_283.setTransform(-409.95,70.95,0.4444,0.4448,0,-65.551,114.507,-10.1,10.1);

	this.instance_284 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_284.setTransform(-409.8,69.35,0.4444,0.4449,0,-72.4189,107.6256,-7.7,13.5);

	this.instance_285 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_285.setTransform(-404.25,31.4,0.4444,0.445,0,-87.2997,92.708,-45.5,13.2);

	this.instance_286 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_286.setTransform(-402.7,-0.3,0.4445,0.4451,0,-88.1062,91.9003,-32.8,13.7);

	this.instance_287 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_287.setTransform(-377.1,31,0.4459,0.4453,0,-1.7162,178.2882,-4.2,-21.9);

	this.instance_288 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_288.setTransform(-283.6,-0.9,0.4448,0.4447,0,84.5603,-95.4411,33.6,10.2);

	this.instance_289 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_289.setTransform(-281.65,69.25,0.4446,0.4445,0,122.4594,-57.5443,14.6,-0.1);

	this.instance_290 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_290.setTransform(-281.75,69.2,0.4447,0.4447,0,115.9557,-64.0469,5,-8.8);

	this.instance_291 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_291.setTransform(-279.5,30.95,0.4447,0.4447,0,98.3917,-81.6069,44.6,7.6);

	this.instance_292 = new lib.ch1_headcopy_2("synched",0);
	this.instance_292.setTransform(-310.55,-31.55,0.445,0.445,0,11.862,-168.1367,2,51);

	this.instance_293 = new lib.ch1_uBodycopy("synched",0);
	this.instance_293.setTransform(-306.75,-11.55,0.4458,0.4458,0,0,180,0,-39.7);

	this.instance_294 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_294.setTransform(-320.7,43.75,0.4435,0.4435,0,8.9704,-171.0287,-0.1,4.3);

	this.instance_295 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_295.setTransform(-296.55,44.65,0.4438,0.4439,0,-3.9366,176.0629,1.4,-42.6);

	this.instance_296 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_296.setTransform(-291.65,87.15,0.4436,0.4437,0,-6.4612,173.5379,1.6,-51.6);

	this.instance_297 = new lib.ch1_neckcopy("synched",0);
	this.instance_297.setTransform(-308.15,-21.95,0.445,0.445,0,-11.3539,168.6454,-1.2,7.5);

	this.instance_298 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_298.setTransform(-325.1,87.2,0.4435,0.4436,0,3.3941,-176.6075,3.5,-50.5);

	this.instance_299 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_299.setTransform(-322.95,66.15,0.4447,0.4446,0,-118.0214,61.9805,-10.4,10.7);

	this.instance_300 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_300.setTransform(-323.25,64.7,0.4447,0.4446,0,-82.7169,97.2821,-7.7,13.2);

	this.instance_301 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_301.setTransform(-329.85,26.75,0.4447,0.4447,0,-105.8433,74.1572,-45.8,13);

	this.instance_302 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_302.setTransform(-331.35,-4.85,0.4449,0.4448,0,-93.2291,86.7693,-33,13.7);

	this.instance_303 = new lib.ch1_lBodycopy("synched",0);
	this.instance_303.setTransform(-305.8,26.4,0.4455,0.4456,0,-1.7759,178.2238,-4,-21.9);

	this.instance_304 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_304.setTransform(-136.3,9.55,0.4448,0.4447,0,84.5603,-95.4411,33.6,10.2);

	this.instance_305 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_305.setTransform(-134.35,79.7,0.4446,0.4445,0,122.4594,-57.5443,14.6,-0.1);

	this.instance_306 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_306.setTransform(-134.45,79.65,0.4447,0.4447,0,115.9557,-64.0469,5,-8.8);

	this.instance_307 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_307.setTransform(-132.2,41.4,0.4447,0.4447,0,98.3917,-81.6069,44.6,7.6);

	this.instance_308 = new lib.ch1_headcopy_2("synched",0);
	this.instance_308.setTransform(-163.25,-21.1,0.445,0.445,0,11.862,-168.1367,2,51);

	this.instance_309 = new lib.ch1_uBodycopy("synched",0);
	this.instance_309.setTransform(-159.45,-1.1,0.4458,0.4458,0,0,180,0,-39.7);

	this.instance_310 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_310.setTransform(-173.4,54.2,0.4435,0.4435,0,8.9704,-171.0287,-0.1,4.3);

	this.instance_311 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_311.setTransform(-149.25,55.1,0.4438,0.4439,0,-3.9366,176.0629,1.4,-42.6);

	this.instance_312 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_312.setTransform(-144.35,97.6,0.4436,0.4437,0,-6.4612,173.5379,1.6,-51.6);

	this.instance_313 = new lib.ch1_neckcopy("synched",0);
	this.instance_313.setTransform(-160.85,-11.5,0.445,0.445,0,-11.3539,168.6454,-1.2,7.5);

	this.instance_314 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_314.setTransform(-177.8,97.65,0.4435,0.4436,0,3.3941,-176.6075,3.5,-50.5);

	this.instance_315 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_315.setTransform(-175.65,76.6,0.4447,0.4446,0,-118.0214,61.9805,-10.4,10.7);

	this.instance_316 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_316.setTransform(-175.95,75.15,0.4447,0.4446,0,-82.7169,97.2821,-7.7,13.2);

	this.instance_317 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_317.setTransform(-182.55,37.2,0.4447,0.4447,0,-105.8433,74.1572,-45.8,13);

	this.instance_318 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_318.setTransform(-184.05,5.6,0.4449,0.4448,0,-93.2291,86.7693,-33,13.7);

	this.instance_319 = new lib.ch1_lBodycopy("synched",0);
	this.instance_319.setTransform(-158.5,36.85,0.4455,0.4456,0,-1.7759,178.2238,-4,-21.9);

	this.instance_320 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_320.setTransform(-211.2,77.45,0.4445,0.4449,0,65.921,-114.1366,33.9,10.2);

	this.instance_321 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_321.setTransform(-211.2,142.2,0.4447,0.4444,0,146.6416,-33.2855,14.2,0);

	this.instance_322 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_322.setTransform(-211.25,142.1,0.4446,0.4447,0,131.7411,-48.1787,4.5,-8.8);

	this.instance_323 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_323.setTransform(-197.05,106.5,0.4445,0.4449,0,116.8507,-63.0857,44.1,7.8);

	this.instance_324 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_324.setTransform(-237.3,46.8,0.4453,0.4447,0,12.0456,-167.9881,1.9,51.2);

	this.instance_325 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_325.setTransform(-234.35,66.95,0.4462,0.4456,0,0,180,0,-39.6);

	this.instance_326 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_326.setTransform(-248.5,122.35,0.4438,0.4432,0,9.1733,-170.8489,0.3,4.6);

	this.instance_327 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_327.setTransform(-224.1,123.1,0.4442,0.4436,0,-4.0123,175.9991,1.4,-42.6);

	this.instance_328 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_328.setTransform(-218.75,165.75,0.444,0.4434,0,-3.4371,176.5716,0.7,-51.1);

	this.instance_329 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_329.setTransform(-235.6,56.5,0.4453,0.4447,0,-5.7341,174.2816,-1.5,7.4);

	this.instance_330 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_330.setTransform(-252.85,165.6,0.4438,0.4432,0,2.2927,-177.7144,3.6,-50.9);

	this.instance_331 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_331.setTransform(-266.2,144.85,0.4444,0.4448,0,-65.551,114.507,-10.1,10.1);

	this.instance_332 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_332.setTransform(-266.05,143.25,0.4444,0.4449,0,-72.4189,107.6256,-7.7,13.5);

	this.instance_333 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_333.setTransform(-260.5,105.3,0.4444,0.445,0,-87.2997,92.708,-45.5,13.2);

	this.instance_334 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_334.setTransform(-258.95,73.6,0.4445,0.4451,0,-88.1062,91.9003,-32.8,13.7);

	this.instance_335 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_335.setTransform(-233.35,104.9,0.4459,0.4453,0,-1.7162,178.2882,-4.2,-21.9);

	this.instance_336 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_336.setTransform(-198.6,-61.2,0.4449,0.4448,0,67.692,-112.3072,33.9,10.3);

	this.instance_337 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_337.setTransform(-218.35,-11.85,0.4446,0.4446,0,155.764,-24.2368,14.4,-0.1);

	this.instance_338 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_338.setTransform(-218.3,-11.9,0.4448,0.4448,0,168.7737,-11.227,4.7,-8.8);

	this.instance_339 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_339.setTransform(-185.2,-31.9,0.4448,0.4448,0,153.9439,-26.0587,44.8,7.7);

	this.instance_340 = new lib.ch1_headcopy_3("synched",0);
	this.instance_340.setTransform(-225.55,-91.7,0.4451,0.4451,0,11.481,-168.5182,1.9,51);

	this.instance_341 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_341.setTransform(-221.65,-71.85,0.4458,0.4459,0,0,180,0,-39.8);

	this.instance_342 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_342.setTransform(-236.35,-16.85,0.4435,0.4435,0,11.3733,-168.6243,-0.1,5);

	this.instance_343 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_343.setTransform(-212,-15.45,0.4439,0.4439,0,-2.1354,177.8643,1.4,-42.8);

	this.instance_344 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_344.setTransform(-208.35,27.25,0.4437,0.4437,0,-8.0081,171.9931,1.2,-51.7);

	this.instance_345 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_345.setTransform(-223.05,-82.25,0.4451,0.4451,0,-11.793,168.2043,-1.4,7.4);

	this.instance_346 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_346.setTransform(-242.55,26.15,0.4435,0.4436,0,2.6401,-177.3597,3.7,-50.5);

	this.instance_347 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_347.setTransform(-264.1,2.9,0.4447,0.4447,0,-53.3806,126.6167,-10.5,10.6);

	this.instance_348 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_348.setTransform(-263.3,1.55,0.4447,0.4447,0,-49.1433,130.8538,-8.1,13.5);

	this.instance_349 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_349.setTransform(-247.45,-33.45,0.4448,0.4448,0,-71.3879,108.6121,-45.8,13);

	this.instance_350 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_350.setTransform(-246.2,-65.2,0.4449,0.4449,0,-88.3235,91.6765,-33.1,13.7);

	this.instance_351 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_351.setTransform(-220.7,-33.85,0.4456,0.4456,0,-1.7758,178.2241,-4,-21.9);

	this.instance_352 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_352.setTransform(-303.7,-129.1,0.4449,0.4448,0,67.692,-112.3072,33.9,10.3);

	this.instance_353 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_353.setTransform(-323.45,-79.75,0.4446,0.4446,0,155.764,-24.2368,14.4,-0.1);

	this.instance_354 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_354.setTransform(-323.4,-79.8,0.4448,0.4448,0,168.7737,-11.227,4.7,-8.8);

	this.instance_355 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_355.setTransform(-290.3,-99.8,0.4448,0.4448,0,153.9439,-26.0587,44.8,7.7);

	this.instance_356 = new lib.ch1_headcopy_3("synched",0);
	this.instance_356.setTransform(-330.65,-159.6,0.4451,0.4451,0,11.481,-168.5182,1.9,51);

	this.instance_357 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_357.setTransform(-326.75,-139.75,0.4458,0.4459,0,0,180,0,-39.8);

	this.instance_358 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_358.setTransform(-341.45,-84.75,0.4435,0.4435,0,11.3733,-168.6243,-0.1,5);

	this.instance_359 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_359.setTransform(-317.1,-83.35,0.4439,0.4439,0,-2.1354,177.8643,1.4,-42.8);

	this.instance_360 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_360.setTransform(-313.45,-40.65,0.4437,0.4437,0,-8.0081,171.9931,1.2,-51.7);

	this.instance_361 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_361.setTransform(-328.15,-150.15,0.4451,0.4451,0,-11.793,168.2043,-1.4,7.4);

	this.instance_362 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_362.setTransform(-347.65,-41.75,0.4435,0.4436,0,2.6401,-177.3597,3.7,-50.5);

	this.instance_363 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_363.setTransform(-369.2,-65,0.4447,0.4447,0,-53.3806,126.6167,-10.5,10.6);

	this.instance_364 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_364.setTransform(-368.4,-66.35,0.4447,0.4447,0,-49.1433,130.8538,-8.1,13.5);

	this.instance_365 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_365.setTransform(-352.55,-101.35,0.4448,0.4448,0,-71.3879,108.6121,-45.8,13);

	this.instance_366 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_366.setTransform(-351.3,-133.1,0.4449,0.4449,0,-88.3235,91.6765,-33.1,13.7);

	this.instance_367 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_367.setTransform(-325.8,-101.75,0.4456,0.4456,0,-1.7758,178.2241,-4,-21.9);

	this.instance_368 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_368.setTransform(298.75,-80.5,0.4445,0.4449,0,65.921,-114.1366,33.9,10.2);

	this.instance_369 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_369.setTransform(298.75,-15.75,0.4447,0.4444,0,146.6416,-33.2855,14.2,0);

	this.instance_370 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_370.setTransform(298.7,-15.85,0.4446,0.4447,0,131.7411,-48.1787,4.5,-8.8);

	this.instance_371 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_371.setTransform(312.9,-51.45,0.4445,0.4449,0,116.8507,-63.0857,44.1,7.8);

	this.instance_372 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_372.setTransform(272.65,-111.15,0.4453,0.4447,0,12.0456,-167.9881,1.9,51.2);

	this.instance_373 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_373.setTransform(275.6,-91,0.4462,0.4456,0,0,180,0,-39.6);

	this.instance_374 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_374.setTransform(261.45,-35.6,0.4438,0.4432,0,9.1733,-170.8489,0.3,4.6);

	this.instance_375 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_375.setTransform(285.85,-34.85,0.4442,0.4436,0,-4.0123,175.9991,1.4,-42.6);

	this.instance_376 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_376.setTransform(291.2,7.8,0.444,0.4434,0,-3.4371,176.5716,0.7,-51.1);

	this.instance_377 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_377.setTransform(274.35,-101.45,0.4453,0.4447,0,-5.7341,174.2816,-1.5,7.4);

	this.instance_378 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_378.setTransform(257.1,7.65,0.4438,0.4432,0,2.2927,-177.7144,3.6,-50.9);

	this.instance_379 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_379.setTransform(243.75,-13.1,0.4444,0.4448,0,-65.551,114.507,-10.1,10.1);

	this.instance_380 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_380.setTransform(243.9,-14.7,0.4444,0.4449,0,-72.4189,107.6256,-7.7,13.5);

	this.instance_381 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_381.setTransform(249.45,-52.65,0.4444,0.445,0,-87.2997,92.708,-45.5,13.2);

	this.instance_382 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_382.setTransform(251,-84.35,0.4445,0.4451,0,-88.1062,91.9003,-32.8,13.7);

	this.instance_383 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_383.setTransform(276.6,-53.05,0.4459,0.4453,0,-1.7162,178.2882,-4.2,-21.9);

	this.instance_384 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_384.setTransform(118.9,148.35,0.4445,0.4449,0,65.921,-114.1366,33.9,10.2);

	this.instance_385 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_385.setTransform(118.9,213.1,0.4447,0.4444,0,146.6416,-33.2855,14.2,0);

	this.instance_386 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_386.setTransform(118.85,213,0.4446,0.4447,0,131.7411,-48.1787,4.5,-8.8);

	this.instance_387 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_387.setTransform(133.05,177.4,0.4445,0.4449,0,116.8507,-63.0857,44.1,7.8);

	this.instance_388 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_388.setTransform(92.8,117.7,0.4453,0.4447,0,12.0456,-167.9881,1.9,51.2);

	this.instance_389 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_389.setTransform(95.75,137.85,0.4462,0.4456,0,0,180,0,-39.6);

	this.instance_390 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_390.setTransform(81.6,193.25,0.4438,0.4432,0,9.1733,-170.8489,0.3,4.6);

	this.instance_391 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_391.setTransform(106,194,0.4442,0.4436,0,-4.0123,175.9991,1.4,-42.6);

	this.instance_392 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_392.setTransform(111.35,236.65,0.444,0.4434,0,-3.4371,176.5716,0.7,-51.1);

	this.instance_393 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_393.setTransform(94.5,127.4,0.4453,0.4447,0,-5.7341,174.2816,-1.5,7.4);

	this.instance_394 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_394.setTransform(77.25,236.5,0.4438,0.4432,0,2.2927,-177.7144,3.6,-50.9);

	this.instance_395 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_395.setTransform(63.9,215.75,0.4444,0.4448,0,-65.551,114.507,-10.1,10.1);

	this.instance_396 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_396.setTransform(64.05,214.15,0.4444,0.4449,0,-72.4189,107.6256,-7.7,13.5);

	this.instance_397 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_397.setTransform(69.6,176.2,0.4444,0.445,0,-87.2997,92.708,-45.5,13.2);

	this.instance_398 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_398.setTransform(71.15,144.5,0.4445,0.4451,0,-88.1062,91.9003,-32.8,13.7);

	this.instance_399 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_399.setTransform(96.75,175.8,0.4459,0.4453,0,-1.7162,178.2882,-4.2,-21.9);

	this.instance_400 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_400.setTransform(150.15,-0.7,0.4445,0.4449,0,65.921,-114.1366,33.9,10.2);

	this.instance_401 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_401.setTransform(150.15,64.05,0.4447,0.4444,0,146.6416,-33.2855,14.2,0);

	this.instance_402 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_402.setTransform(150.1,63.95,0.4446,0.4447,0,131.7411,-48.1787,4.5,-8.8);

	this.instance_403 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_403.setTransform(164.3,28.35,0.4445,0.4449,0,116.8507,-63.0857,44.1,7.8);

	this.instance_404 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_404.setTransform(124.05,-31.35,0.4453,0.4447,0,12.0456,-167.9881,1.9,51.2);

	this.instance_405 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_405.setTransform(127,-11.2,0.4462,0.4456,0,0,180,0,-39.6);

	this.instance_406 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_406.setTransform(112.85,44.2,0.4438,0.4432,0,9.1733,-170.8489,0.3,4.6);

	this.instance_407 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_407.setTransform(137.25,44.95,0.4442,0.4436,0,-4.0123,175.9991,1.4,-42.6);

	this.instance_408 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_408.setTransform(142.6,87.6,0.444,0.4434,0,-3.4371,176.5716,0.7,-51.1);

	this.instance_409 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_409.setTransform(125.75,-21.65,0.4453,0.4447,0,-5.7341,174.2816,-1.5,7.4);

	this.instance_410 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_410.setTransform(108.5,87.45,0.4438,0.4432,0,2.2927,-177.7144,3.6,-50.9);

	this.instance_411 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_411.setTransform(95.15,66.7,0.4444,0.4448,0,-65.551,114.507,-10.1,10.1);

	this.instance_412 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_412.setTransform(95.3,65.1,0.4444,0.4449,0,-72.4189,107.6256,-7.7,13.5);

	this.instance_413 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_413.setTransform(100.85,27.15,0.4444,0.445,0,-87.2997,92.708,-45.5,13.2);

	this.instance_414 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_414.setTransform(102.4,-4.55,0.4445,0.4451,0,-88.1062,91.9003,-32.8,13.7);

	this.instance_415 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_415.setTransform(128,26.75,0.4459,0.4453,0,-1.7162,178.2882,-4.2,-21.9);

	this.instance_416 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_416.setTransform(-126,-92.8,0.4445,0.4449,0,65.921,-114.1366,33.9,10.2);

	this.instance_417 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_417.setTransform(-126,-28.05,0.4447,0.4444,0,146.6416,-33.2855,14.2,0);

	this.instance_418 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_418.setTransform(-126.05,-28.15,0.4446,0.4447,0,131.7411,-48.1787,4.5,-8.8);

	this.instance_419 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_419.setTransform(-111.85,-63.75,0.4445,0.4449,0,116.8507,-63.0857,44.1,7.8);

	this.instance_420 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_420.setTransform(-152.1,-123.45,0.4453,0.4447,0,12.0456,-167.9881,1.9,51.2);

	this.instance_421 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_421.setTransform(-149.15,-103.3,0.4462,0.4456,0,0,180,0,-39.6);

	this.instance_422 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_422.setTransform(-163.3,-47.9,0.4438,0.4432,0,9.1733,-170.8489,0.3,4.6);

	this.instance_423 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_423.setTransform(-138.9,-47.15,0.4442,0.4436,0,-4.0123,175.9991,1.4,-42.6);

	this.instance_424 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_424.setTransform(-133.55,-4.5,0.444,0.4434,0,-3.4371,176.5716,0.7,-51.1);

	this.instance_425 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_425.setTransform(-150.4,-113.75,0.4453,0.4447,0,-5.7341,174.2816,-1.5,7.4);

	this.instance_426 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_426.setTransform(-167.65,-4.65,0.4438,0.4432,0,2.2927,-177.7144,3.6,-50.9);

	this.instance_427 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_427.setTransform(-181,-25.4,0.4444,0.4448,0,-65.551,114.507,-10.1,10.1);

	this.instance_428 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_428.setTransform(-180.85,-27,0.4444,0.4449,0,-72.4189,107.6256,-7.7,13.5);

	this.instance_429 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_429.setTransform(-175.3,-64.95,0.4444,0.445,0,-87.2997,92.708,-45.5,13.2);

	this.instance_430 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_430.setTransform(-173.75,-96.65,0.4445,0.4451,0,-88.1062,91.9003,-32.8,13.7);

	this.instance_431 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_431.setTransform(-148.15,-65.35,0.4459,0.4453,0,-1.7162,178.2882,-4.2,-21.9);

	this.instance_432 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_432.setTransform(388.1,47.45,0.4449,0.4445,0,76.5591,-103.4194,33.5,10.1);

	this.instance_433 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_433.setTransform(404.5,116.2,0.4446,0.4443,0,109.041,-70.9911,14.4,0.3);

	this.instance_434 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_434.setTransform(404.65,116.2,0.4448,0.4445,0,89.64,-90.3597,4.5,-8.9);

	this.instance_435 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_435.setTransform(396.7,78.55,0.4448,0.4444,0,83.4028,-96.5859,43.8,8.1);

	this.instance_436 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_436.setTransform(364.25,16.7,0.4448,0.4452,0,3.8817,-176.111,1.8,50.8);

	this.instance_437 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_437.setTransform(364.75,36.9,0.4457,0.446,0,0,180,0.4,-39.9);

	this.instance_438 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_438.setTransform(350.7,92.4,0.4432,0.4436,0,8.9549,-171.0299,0.4,4.9);

	this.instance_439 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_439.setTransform(375,93.6,0.4437,0.444,0,-3.9174,176.0754,1.8,-41.8);

	this.instance_440 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_440.setTransform(380.15,135.75,0.4434,0.4437,0,-20.8881,159.0803,1.6,-51.6);

	this.instance_441 = new lib.ch1_neckcopy2("synched",0);
	this.instance_441.setTransform(363.55,26.3,0.4448,0.4452,0,6.7755,-173.2131,-1.2,6.9);

	this.instance_442 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_442.setTransform(346.3,135.55,0.4433,0.4437,0,0.4059,-179.5918,4.3,-50.9);

	this.instance_443 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_443.setTransform(333.6,113.5,0.4446,0.4445,0,-127.0973,52.9515,-10.3,11);

	this.instance_444 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_444.setTransform(332.05,113.2,0.4444,0.4446,0,-146.9023,33.1423,-7.6,13.3);

	this.instance_445 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_445.setTransform(337.35,75,0.4448,0.4445,0,-87.6231,92.3729,-45.5,12.1);

	this.instance_446 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_446.setTransform(340,43.75,0.4449,0.4446,0,-85.6873,94.3054,-32.2,12.9);

	this.instance_447 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_447.setTransform(366.05,74.95,0.4455,0.4458,0,-1.7691,178.2276,-4.5,-21.9);

	this.instance_448 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_448.setTransform(-248.15,-178.9,0.4449,0.4445,0,76.5591,-103.4194,33.5,10.1);

	this.instance_449 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_449.setTransform(-231.75,-110.15,0.4446,0.4443,0,109.041,-70.9911,14.4,0.3);

	this.instance_450 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_450.setTransform(-231.6,-110.15,0.4448,0.4445,0,89.64,-90.3597,4.5,-8.9);

	this.instance_451 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_451.setTransform(-239.55,-147.8,0.4448,0.4444,0,83.4028,-96.5859,43.8,8.1);

	this.instance_452 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_452.setTransform(-272,-209.65,0.4448,0.4452,0,3.8817,-176.111,1.8,50.8);

	this.instance_453 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_453.setTransform(-271.5,-189.45,0.4457,0.446,0,0,180,0.4,-39.9);

	this.instance_454 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_454.setTransform(-285.55,-133.95,0.4432,0.4436,0,8.9549,-171.0299,0.4,4.9);

	this.instance_455 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_455.setTransform(-261.25,-132.75,0.4437,0.444,0,-3.9174,176.0754,1.8,-41.8);

	this.instance_456 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_456.setTransform(-256.1,-90.6,0.4434,0.4437,0,-20.8881,159.0803,1.6,-51.6);

	this.instance_457 = new lib.ch1_neckcopy2("synched",0);
	this.instance_457.setTransform(-272.7,-200.05,0.4448,0.4452,0,6.7755,-173.2131,-1.2,6.9);

	this.instance_458 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_458.setTransform(-289.95,-90.8,0.4433,0.4437,0,0.4059,-179.5918,4.3,-50.9);

	this.instance_459 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_459.setTransform(-302.65,-112.85,0.4446,0.4445,0,-127.0973,52.9515,-10.3,11);

	this.instance_460 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_460.setTransform(-304.2,-113.15,0.4444,0.4446,0,-146.9023,33.1423,-7.6,13.3);

	this.instance_461 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_461.setTransform(-298.9,-151.35,0.4448,0.4445,0,-87.6231,92.3729,-45.5,12.1);

	this.instance_462 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_462.setTransform(-296.25,-182.6,0.4449,0.4446,0,-85.6873,94.3054,-32.2,12.9);

	this.instance_463 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_463.setTransform(-270.2,-151.4,0.4455,0.4458,0,-1.7691,178.2276,-4.5,-21.9);

	this.instance_464 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_464.setTransform(-407.45,-99.75,0.4449,0.4445,0,76.5591,-103.4194,33.5,10.1);

	this.instance_465 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_465.setTransform(-391.05,-31,0.4446,0.4443,0,109.041,-70.9911,14.4,0.3);

	this.instance_466 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_466.setTransform(-390.9,-31,0.4448,0.4445,0,89.64,-90.3597,4.5,-8.9);

	this.instance_467 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_467.setTransform(-398.85,-68.65,0.4448,0.4444,0,83.4028,-96.5859,43.8,8.1);

	this.instance_468 = new lib.ch1_headcopy2_2("synched",0);
	this.instance_468.setTransform(-431.3,-130.5,0.4448,0.4452,0,3.8817,-176.111,1.8,50.8);

	this.instance_469 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_469.setTransform(-430.8,-110.3,0.4457,0.446,0,0,180,0.4,-39.9);

	this.instance_470 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_470.setTransform(-444.85,-54.8,0.4432,0.4436,0,8.9549,-171.0299,0.4,4.9);

	this.instance_471 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_471.setTransform(-420.55,-53.6,0.4437,0.444,0,-3.9174,176.0754,1.8,-41.8);

	this.instance_472 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_472.setTransform(-415.4,-11.45,0.4434,0.4437,0,-20.8881,159.0803,1.6,-51.6);

	this.instance_473 = new lib.ch1_neckcopy2("synched",0);
	this.instance_473.setTransform(-432,-120.9,0.4448,0.4452,0,6.7755,-173.2131,-1.2,6.9);

	this.instance_474 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_474.setTransform(-449.25,-11.65,0.4433,0.4437,0,0.4059,-179.5918,4.3,-50.9);

	this.instance_475 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_475.setTransform(-461.95,-33.7,0.4446,0.4445,0,-127.0973,52.9515,-10.3,11);

	this.instance_476 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_476.setTransform(-463.5,-34,0.4444,0.4446,0,-146.9023,33.1423,-7.6,13.3);

	this.instance_477 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_477.setTransform(-458.2,-72.2,0.4448,0.4445,0,-87.6231,92.3729,-45.5,12.1);

	this.instance_478 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_478.setTransform(-455.55,-103.45,0.4449,0.4446,0,-85.6873,94.3054,-32.2,12.9);

	this.instance_479 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_479.setTransform(-429.5,-72.25,0.4455,0.4458,0,-1.7691,178.2276,-4.5,-21.9);

	this.instance_480 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_480.setTransform(395.5,-36.35,0.4448,0.4447,0,84.5603,-95.4411,33.6,10.2);

	this.instance_481 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_481.setTransform(397.45,33.8,0.4446,0.4445,0,122.4594,-57.5443,14.6,-0.1);

	this.instance_482 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_482.setTransform(397.35,33.75,0.4447,0.4447,0,115.9557,-64.0469,5,-8.8);

	this.instance_483 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_483.setTransform(399.6,-4.5,0.4447,0.4447,0,98.3917,-81.6069,44.6,7.6);

	this.instance_484 = new lib.ch1_headcopy_2("synched",0);
	this.instance_484.setTransform(368.55,-67,0.445,0.445,0,11.862,-168.1367,2,51);

	this.instance_485 = new lib.ch1_uBodycopy("synched",0);
	this.instance_485.setTransform(372.35,-47,0.4458,0.4458,0,0,180,0,-39.7);

	this.instance_486 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_486.setTransform(358.4,8.3,0.4435,0.4435,0,8.9704,-171.0287,-0.1,4.3);

	this.instance_487 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_487.setTransform(382.55,9.2,0.4438,0.4439,0,-3.9366,176.0629,1.4,-42.6);

	this.instance_488 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_488.setTransform(387.45,51.7,0.4436,0.4437,0,-6.4612,173.5379,1.6,-51.6);

	this.instance_489 = new lib.ch1_neckcopy("synched",0);
	this.instance_489.setTransform(370.95,-57.4,0.445,0.445,0,-11.3539,168.6454,-1.2,7.5);

	this.instance_490 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_490.setTransform(354,51.75,0.4435,0.4436,0,3.3941,-176.6075,3.5,-50.5);

	this.instance_491 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_491.setTransform(356.15,30.7,0.4447,0.4446,0,-118.0214,61.9805,-10.4,10.7);

	this.instance_492 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_492.setTransform(355.85,29.25,0.4447,0.4446,0,-82.7169,97.2821,-7.7,13.2);

	this.instance_493 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_493.setTransform(349.25,-8.7,0.4447,0.4447,0,-105.8433,74.1572,-45.8,13);

	this.instance_494 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_494.setTransform(347.75,-40.3,0.4449,0.4448,0,-93.2291,86.7693,-33,13.7);

	this.instance_495 = new lib.ch1_lBodycopy("synched",0);
	this.instance_495.setTransform(373.3,-9.05,0.4455,0.4456,0,-1.7759,178.2238,-4,-21.9);

	this.instance_496 = new lib.ch1_uArm_rcopy("synched",0);
	this.instance_496.setTransform(91,-92.85,0.4448,0.4447,0,84.5603,-95.4411,33.6,10.2);

	this.instance_497 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_497.setTransform(92.95,-22.7,0.4446,0.4445,0,122.4594,-57.5443,14.6,-0.1);

	this.instance_498 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_498.setTransform(92.85,-22.75,0.4447,0.4447,0,115.9557,-64.0469,5,-8.8);

	this.instance_499 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_499.setTransform(95.1,-61,0.4447,0.4447,0,98.3917,-81.6069,44.6,7.6);

	this.instance_500 = new lib.ch1_headcopy_2("synched",0);
	this.instance_500.setTransform(64.05,-123.5,0.445,0.445,0,11.862,-168.1367,2,51);

	this.instance_501 = new lib.ch1_uBodycopy("synched",0);
	this.instance_501.setTransform(67.85,-103.5,0.4458,0.4458,0,0,180,0,-39.7);

	this.instance_502 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_502.setTransform(53.9,-48.2,0.4435,0.4435,0,8.9704,-171.0287,-0.1,4.3);

	this.instance_503 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_503.setTransform(78.05,-47.3,0.4438,0.4439,0,-3.9366,176.0629,1.4,-42.6);

	this.instance_504 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_504.setTransform(82.95,-4.8,0.4436,0.4437,0,-6.4612,173.5379,1.6,-51.6);

	this.instance_505 = new lib.ch1_neckcopy("synched",0);
	this.instance_505.setTransform(66.45,-113.9,0.445,0.445,0,-11.3539,168.6454,-1.2,7.5);

	this.instance_506 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_506.setTransform(49.5,-4.75,0.4435,0.4436,0,3.3941,-176.6075,3.5,-50.5);

	this.instance_507 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_507.setTransform(51.65,-25.8,0.4447,0.4446,0,-118.0214,61.9805,-10.4,10.7);

	this.instance_508 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_508.setTransform(51.35,-27.25,0.4447,0.4446,0,-82.7169,97.2821,-7.7,13.2);

	this.instance_509 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_509.setTransform(44.75,-65.2,0.4447,0.4447,0,-105.8433,74.1572,-45.8,13);

	this.instance_510 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_510.setTransform(43.25,-96.8,0.4449,0.4448,0,-93.2291,86.7693,-33,13.7);

	this.instance_511 = new lib.ch1_lBodycopy("synched",0);
	this.instance_511.setTransform(68.8,-65.55,0.4455,0.4456,0,-1.7759,178.2238,-4,-21.9);

	this.instance_512 = new lib.ch1_uArm_rcopy_2("synched",0);
	this.instance_512.setTransform(359.8,-130.7,0.4446,0.4446,0,74.6386,-105.3608,33.7,9.8);

	this.instance_513 = new lib.ch1_hand_rcopy_2("synched",0);
	this.instance_513.setTransform(348.05,-67.9,0.4444,0.4443,0,131.1071,-48.8942,14.4,-0.4);

	this.instance_514 = new lib.ch1_thumb_rcopy_2("synched",0);
	this.instance_514.setTransform(348,-67.8,0.4445,0.4445,0,110.4605,-69.542,4.5,-9.1);

	this.instance_515 = new lib.ch1_lArm_rcopy_2("synched",0);
	this.instance_515.setTransform(369.45,-99.9,0.4445,0.4445,0,128.9037,-51.0975,44.4,7.6);

	this.instance_516 = new lib.ch1_headcopy("synched",0);
	this.instance_516.setTransform(332.85,-158.65,0.4448,0.4448,0,11.855,-168.1446,2.1,50.5);

	this.instance_517 = new lib.ch1_uBodycopy_2("synched",0);
	this.instance_517.setTransform(336.7,-138.6,0.4456,0.4457,0,0,180,-0.4,-39.7);

	this.instance_518 = new lib.ch1_uLeg_lcopy_2("synched",0);
	this.instance_518.setTransform(322.7,-83.2,0.4433,0.4434,0,8.9653,-171.034,-0.1,4.5);

	this.instance_519 = new lib.ch1_uLeg_rcopy_2("synched",0);
	this.instance_519.setTransform(346.9,-82.3,0.4437,0.4437,0,-3.928,176.0719,1.4,-42.5);

	this.instance_520 = new lib.ch1_lLeg_rcopy_2("synched",0);
	this.instance_520.setTransform(352.15,-39.6,0.4435,0.4436,0,-2.5552,177.4446,0.5,-51);

	this.instance_521 = new lib.ch1_neckcopy_2("synched",0);
	this.instance_521.setTransform(335.25,-148.95,0.4449,0.4449,0,-11.3442,168.6558,-1.4,7.4);

	this.instance_522 = new lib.ch1_lLeg_lcopy_2("synched",0);
	this.instance_522.setTransform(318.4,-39.75,0.4434,0.4435,0,4.2505,-175.7493,3.3,-50.5);

	this.instance_523 = new lib.ch1_hand_lcopy_2("synched",0);
	this.instance_523.setTransform(296.15,-62.55,0.4444,0.4444,0,-55.1319,124.8654,-10.5,11);

	this.instance_524 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_524.setTransform(296.45,-64.2,0.4444,0.4444,0,-65.9203,114.0789,-8,13.6);

	this.instance_525 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_525.setTransform(309.1,-100.35,0.4445,0.4445,0,-76.1956,103.8078,-45.5,12.9);

	this.instance_526 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_526.setTransform(312.1,-131.95,0.4447,0.4446,0,-85.481,94.5189,-32.9,13.8);

	this.instance_527 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_527.setTransform(337.6,-100.6,0.4454,0.4454,0,-1.7667,178.2333,-4,-21.9);

	this.instance_528 = new lib.ch1_uArm_rcopy_2("synched",0);
	this.instance_528.setTransform(223.05,-52,0.4446,0.4446,0,74.6386,-105.3608,33.6,9.6);

	this.instance_529 = new lib.ch1_hand_rcopy_2("synched",0);
	this.instance_529.setTransform(211.35,10.75,0.4444,0.4443,0,131.1071,-48.8942,14.3,-1);

	this.instance_530 = new lib.ch1_thumb_rcopy_2("synched",0);
	this.instance_530.setTransform(211.2,10.85,0.4445,0.4445,0,110.4605,-69.542,4.2,-9.6);

	this.instance_531 = new lib.ch1_lArm_rcopy_2("synched",0);
	this.instance_531.setTransform(232.7,-21.25,0.4445,0.4445,0,128.9037,-51.0975,44.6,7.2);

	this.instance_532 = new lib.ch1_headcopy("synched",0);
	this.instance_532.setTransform(196.05,-79.95,0.4448,0.4448,0,11.855,-168.1446,1.7,50.5);

	this.instance_533 = new lib.ch1_uBodycopy_2("synched",0);
	this.instance_533.setTransform(199.9,-59.95,0.4456,0.4457,0,0,180,-0.5,-39.7);

	this.instance_534 = new lib.ch1_uLeg_lcopy_2("synched",0);
	this.instance_534.setTransform(185.95,-4.5,0.4433,0.4434,0,8.9653,-171.034,-0.6,4.5);

	this.instance_535 = new lib.ch1_uLeg_rcopy_2("synched",0);
	this.instance_535.setTransform(210.1,-3.65,0.4437,0.4437,0,-3.928,176.0719,1,-42);

	this.instance_536 = new lib.ch1_lLeg_rcopy_2("synched",0);
	this.instance_536.setTransform(215.4,39.05,0.4435,0.4436,0,-2.5552,177.4446,0.2,-50.6);

	this.instance_537 = new lib.ch1_neckcopy_2("synched",0);
	this.instance_537.setTransform(198.5,-70.35,0.4449,0.4449,0,-11.3442,168.6558,-1.8,7.5);

	this.instance_538 = new lib.ch1_lLeg_lcopy_2("synched",0);
	this.instance_538.setTransform(181.65,38.9,0.4434,0.4435,0,4.2505,-175.7493,2.8,-50.1);

	this.instance_539 = new lib.ch1_hand_lcopy_2("synched",0);
	this.instance_539.setTransform(159.35,16.1,0.4444,0.4444,0,-55.1319,124.8654,-10.2,11.3);

	this.instance_540 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_540.setTransform(159.7,14.45,0.4444,0.4444,0,-65.9203,114.0789,-7.8,14.1);

	this.instance_541 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_541.setTransform(172.4,-21.65,0.4445,0.4445,0,-76.1956,103.8078,-45.5,13.1);

	this.instance_542 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_542.setTransform(175.35,-53.35,0.4447,0.4446,0,-85.481,94.5189,-33,14.2);

	this.instance_543 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_543.setTransform(200.8,-21.95,0.4454,0.4454,0,-1.7667,178.2333,-4.4,-21.9);

	this.instance_544 = new lib.ch1_uArm_rcopy_2("synched",0);
	this.instance_544.setTransform(-122.6,-184.85,0.4446,0.4446,0,74.6386,-105.3608,33.8,10);

	this.instance_545 = new lib.ch1_hand_rcopy_2("synched",0);
	this.instance_545.setTransform(-134.25,-122.05,0.4444,0.4443,0,131.1071,-48.8942,14.3,-0.4);

	this.instance_546 = new lib.ch1_thumb_rcopy_2("synched",0);
	this.instance_546.setTransform(-134.35,-121.95,0.4445,0.4445,0,110.4605,-69.542,4.5,-9.1);

	this.instance_547 = new lib.ch1_lArm_rcopy_2("synched",0);
	this.instance_547.setTransform(-112.9,-154.05,0.4445,0.4445,0,128.9037,-51.0975,44.4,7.6);

	this.instance_548 = new lib.ch1_headcopy("synched",0);
	this.instance_548.setTransform(-149.5,-212.8,0.4448,0.4448,0,11.855,-168.1446,2.1,50.5);

	this.instance_549 = new lib.ch1_uBodycopy_2("synched",0);
	this.instance_549.setTransform(-145.7,-192.75,0.4456,0.4457,0,0,180,0,-39.7);

	this.instance_550 = new lib.ch1_uLeg_lcopy_2("synched",0);
	this.instance_550.setTransform(-159.65,-137.35,0.4433,0.4434,0,8.9653,-171.034,-0.1,4.5);

	this.instance_551 = new lib.ch1_uLeg_rcopy_2("synched",0);
	this.instance_551.setTransform(-135.45,-136.45,0.4437,0.4437,0,-3.928,176.0719,1.4,-42.5);

	this.instance_552 = new lib.ch1_lLeg_rcopy_2("synched",0);
	this.instance_552.setTransform(-130.2,-93.8,0.4435,0.4436,0,-2.5552,177.4446,0.7,-51.1);

	this.instance_553 = new lib.ch1_neckcopy_2("synched",0);
	this.instance_553.setTransform(-147.1,-203.1,0.4449,0.4449,0,-11.3442,168.6558,-1.4,7.4);

	this.instance_554 = new lib.ch1_lLeg_lcopy_2("synched",0);
	this.instance_554.setTransform(-163.95,-93.9,0.4434,0.4435,0,4.2505,-175.7493,3.3,-50.5);

	this.instance_555 = new lib.ch1_hand_lcopy_2("synched",0);
	this.instance_555.setTransform(-186.2,-116.65,0.4444,0.4444,0,-55.1319,124.8654,-10.3,10.8);

	this.instance_556 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_556.setTransform(-185.85,-118.35,0.4444,0.4444,0,-65.9203,114.0789,-8,13.5);

	this.instance_557 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_557.setTransform(-173.25,-154.45,0.4445,0.4445,0,-76.1956,103.8078,-45.4,12.6);

	this.instance_558 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_558.setTransform(-170.25,-186.1,0.4447,0.4446,0,-85.481,94.5189,-32.9,13.8);

	this.instance_559 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_559.setTransform(-144.75,-154.75,0.4454,0.4454,0,-1.7667,178.2333,-4,-21.9);

	this.instance_560 = new lib.ch1_uArm_rcopy_2("synched",0);
	this.instance_560.setTransform(-344.5,-203.85,0.4446,0.4446,0,74.6373,-105.3617,33.8,10);

	this.instance_561 = new lib.ch1_hand_rcopy_2("synched",0);
	this.instance_561.setTransform(-356.15,-141.05,0.4444,0.4444,0,131.1073,-48.8953,14.3,-0.4);

	this.instance_562 = new lib.ch1_thumb_rcopy_2("synched",0);
	this.instance_562.setTransform(-356.25,-140.95,0.4445,0.4445,0,110.4635,-69.5409,4.5,-9.1);

	this.instance_563 = new lib.ch1_lArm_rcopy_2("synched",0);
	this.instance_563.setTransform(-334.8,-173.05,0.4445,0.4445,0,128.904,-51.0972,44.4,7.7);

	this.instance_564 = new lib.ch1_headcopy("synched",0);
	this.instance_564.setTransform(-371.4,-231.8,0.4448,0.4449,0,11.8561,-168.1431,2.1,50.5);

	this.instance_565 = new lib.ch1_uBodycopy_2("synched",0);
	this.instance_565.setTransform(-367.6,-211.8,0.4457,0.4457,0,0,180,0,-39.9);

	this.instance_566 = new lib.ch1_uLeg_lcopy_2("synched",0);
	this.instance_566.setTransform(-381.55,-156.3,0.4434,0.4434,0,8.967,-171.0327,-0.1,4.5);

	this.instance_567 = new lib.ch1_uLeg_rcopy_2("synched",0);
	this.instance_567.setTransform(-357.35,-155.45,0.4437,0.4438,0,-3.9297,176.0701,1.4,-42.6);

	this.instance_568 = new lib.ch1_lLeg_rcopy_2("synched",0);
	this.instance_568.setTransform(-352.1,-112.8,0.4436,0.4436,0,-2.5571,177.4428,0.7,-51.1);

	this.instance_569 = new lib.ch1_neckcopy_2("synched",0);
	this.instance_569.setTransform(-369,-222.2,0.4449,0.4449,0,-11.3458,168.6542,-1.4,7.2);

	this.instance_570 = new lib.ch1_lLeg_lcopy_2("synched",0);
	this.instance_570.setTransform(-385.85,-112.9,0.4435,0.4435,0,4.2523,-175.7475,3.3,-50.6);

	this.instance_571 = new lib.ch1_hand_lcopy_2("synched",0);
	this.instance_571.setTransform(-408.1,-135.75,0.4445,0.4445,0,-55.1298,124.8658,-10.5,10.7);

	this.instance_572 = new lib.ch1_thumb_lcopy_2("synched",0);
	this.instance_572.setTransform(-407.75,-137.35,0.4445,0.4444,0,-65.9175,114.0809,-8,13.5);

	this.instance_573 = new lib.ch1_lArm_lcopy_2("synched",0);
	this.instance_573.setTransform(-395.1,-173.45,0.4446,0.4445,0,-76.1922,103.8087,-45.5,12.6);

	this.instance_574 = new lib.ch1_uArm_lcopy_2("synched",0);
	this.instance_574.setTransform(-392.15,-205.15,0.4447,0.4447,0,-85.4792,94.5205,-33,13.8);

	this.instance_575 = new lib.ch1_lBodycopy_2("synched",0);
	this.instance_575.setTransform(-366.65,-173.75,0.4454,0.4454,0,-1.7686,178.2314,-4,-21.9);

	this.instance_576 = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance_576.setTransform(-199.6,-225.3,0.4445,0.4449,0,65.921,-114.1366,33.9,10.2);

	this.instance_577 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_577.setTransform(-199.6,-160.55,0.4447,0.4444,0,146.6416,-33.2855,14.2,0);

	this.instance_578 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_578.setTransform(-199.65,-160.65,0.4446,0.4447,0,131.7411,-48.1787,4.5,-8.8);

	this.instance_579 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_579.setTransform(-185.45,-196.25,0.4445,0.4449,0,116.8507,-63.0857,44.1,7.8);

	this.instance_580 = new lib.ch1_headcopy2_3("synched",0);
	this.instance_580.setTransform(-225.7,-255.95,0.4453,0.4447,0,12.0456,-167.9881,1.9,51.2);

	this.instance_581 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_581.setTransform(-222.75,-235.8,0.4462,0.4456,0,0,180,0,-39.6);

	this.instance_582 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_582.setTransform(-236.9,-180.4,0.4438,0.4432,0,9.1733,-170.8489,0.3,4.6);

	this.instance_583 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_583.setTransform(-212.5,-179.65,0.4442,0.4436,0,-4.0123,175.9991,1.4,-42.6);

	this.instance_584 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_584.setTransform(-207.15,-137,0.444,0.4434,0,-3.4371,176.5716,0.7,-51.1);

	this.instance_585 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_585.setTransform(-224,-246.25,0.4453,0.4447,0,-5.7341,174.2816,-1.5,7.4);

	this.instance_586 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_586.setTransform(-241.25,-137.15,0.4438,0.4432,0,2.2927,-177.7144,3.6,-50.9);

	this.instance_587 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_587.setTransform(-254.6,-157.9,0.4444,0.4448,0,-65.551,114.507,-10.1,10.1);

	this.instance_588 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_588.setTransform(-254.45,-159.5,0.4444,0.4449,0,-72.4189,107.6256,-7.7,13.5);

	this.instance_589 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_589.setTransform(-248.9,-197.45,0.4444,0.445,0,-87.2997,92.708,-45.5,13.2);

	this.instance_590 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_590.setTransform(-247.35,-229.15,0.4445,0.4451,0,-88.1062,91.9003,-32.8,13.7);

	this.instance_591 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_591.setTransform(-221.75,-197.85,0.4459,0.4453,0,-1.7162,178.2882,-4.2,-21.9);

	this.instance_592 = new lib.ch1_uArm_rcopy_1("synched",0);
	this.instance_592.setTransform(-54.25,-212.35,0.4449,0.4448,0,67.692,-112.3072,33.9,10.3);

	this.instance_593 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_593.setTransform(-74,-163,0.4446,0.4446,0,155.764,-24.2368,14.4,-0.1);

	this.instance_594 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_594.setTransform(-73.95,-163.05,0.4448,0.4448,0,168.7737,-11.227,4.7,-8.8);

	this.instance_595 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_595.setTransform(-40.85,-183.05,0.4448,0.4448,0,153.9439,-26.0587,44.8,7.7);

	this.instance_596 = new lib.ch1_headcopy_3("synched",0);
	this.instance_596.setTransform(-81.2,-242.85,0.4451,0.4451,0,11.481,-168.5182,1.9,51);

	this.instance_597 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_597.setTransform(-77.3,-223,0.4458,0.4459,0,0,180,0,-39.8);

	this.instance_598 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_598.setTransform(-92,-168,0.4435,0.4435,0,11.3733,-168.6243,-0.1,5);

	this.instance_599 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_599.setTransform(-67.65,-166.6,0.4439,0.4439,0,-2.1354,177.8643,1.4,-42.8);

	this.instance_600 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_600.setTransform(-64,-123.9,0.4437,0.4437,0,-8.0081,171.9931,1.2,-51.7);

	this.instance_601 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_601.setTransform(-78.7,-233.4,0.4451,0.4451,0,-11.793,168.2043,-1.4,7.4);

	this.instance_602 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_602.setTransform(-98.2,-125,0.4435,0.4436,0,2.6401,-177.3597,3.7,-50.5);

	this.instance_603 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_603.setTransform(-119.75,-148.25,0.4447,0.4447,0,-53.3806,126.6167,-10.5,10.6);

	this.instance_604 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_604.setTransform(-118.95,-149.6,0.4447,0.4447,0,-49.1433,130.8538,-8.1,13.5);

	this.instance_605 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_605.setTransform(-103.1,-184.6,0.4448,0.4448,0,-71.3879,108.6121,-45.8,13);

	this.instance_606 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_606.setTransform(-101.85,-216.35,0.4449,0.4449,0,-88.3235,91.6765,-33.1,13.7);

	this.instance_607 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_607.setTransform(-76.35,-185,0.4456,0.4456,0,-1.7758,178.2241,-4,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_607},{t:this.instance_606},{t:this.instance_605},{t:this.instance_604},{t:this.instance_603},{t:this.instance_602},{t:this.instance_601},{t:this.instance_600},{t:this.instance_599},{t:this.instance_598},{t:this.instance_597},{t:this.instance_596},{t:this.instance_595},{t:this.instance_594},{t:this.instance_593},{t:this.instance_592},{t:this.instance_591},{t:this.instance_590},{t:this.instance_589},{t:this.instance_588},{t:this.instance_587},{t:this.instance_586},{t:this.instance_585},{t:this.instance_584},{t:this.instance_583},{t:this.instance_582},{t:this.instance_581},{t:this.instance_580},{t:this.instance_579},{t:this.instance_578},{t:this.instance_577},{t:this.instance_576},{t:this.instance_575},{t:this.instance_574},{t:this.instance_573},{t:this.instance_572},{t:this.instance_571},{t:this.instance_570},{t:this.instance_569},{t:this.instance_568},{t:this.instance_567},{t:this.instance_566},{t:this.instance_565},{t:this.instance_564},{t:this.instance_563},{t:this.instance_562},{t:this.instance_561},{t:this.instance_560},{t:this.instance_559},{t:this.instance_558},{t:this.instance_557},{t:this.instance_556},{t:this.instance_555},{t:this.instance_554},{t:this.instance_553},{t:this.instance_552},{t:this.instance_551},{t:this.instance_550},{t:this.instance_549},{t:this.instance_548},{t:this.instance_547},{t:this.instance_546},{t:this.instance_545},{t:this.instance_544},{t:this.instance_543},{t:this.instance_542},{t:this.instance_541},{t:this.instance_540},{t:this.instance_539},{t:this.instance_538},{t:this.instance_537},{t:this.instance_536},{t:this.instance_535},{t:this.instance_534},{t:this.instance_533},{t:this.instance_532},{t:this.instance_531},{t:this.instance_530},{t:this.instance_529},{t:this.instance_528},{t:this.instance_527},{t:this.instance_526},{t:this.instance_525},{t:this.instance_524},{t:this.instance_523},{t:this.instance_522},{t:this.instance_521},{t:this.instance_520},{t:this.instance_519},{t:this.instance_518},{t:this.instance_517},{t:this.instance_516},{t:this.instance_515},{t:this.instance_514},{t:this.instance_513},{t:this.instance_512},{t:this.instance_511},{t:this.instance_510},{t:this.instance_509},{t:this.instance_508},{t:this.instance_507},{t:this.instance_506},{t:this.instance_505},{t:this.instance_504},{t:this.instance_503},{t:this.instance_502},{t:this.instance_501},{t:this.instance_500},{t:this.instance_499},{t:this.instance_498},{t:this.instance_497},{t:this.instance_496},{t:this.instance_495},{t:this.instance_494},{t:this.instance_493},{t:this.instance_492},{t:this.instance_491},{t:this.instance_490},{t:this.instance_489},{t:this.instance_488},{t:this.instance_487},{t:this.instance_486},{t:this.instance_485},{t:this.instance_484},{t:this.instance_483},{t:this.instance_482},{t:this.instance_481},{t:this.instance_480},{t:this.instance_479},{t:this.instance_478},{t:this.instance_477},{t:this.instance_476},{t:this.instance_475},{t:this.instance_474},{t:this.instance_473},{t:this.instance_472},{t:this.instance_471},{t:this.instance_470},{t:this.instance_469},{t:this.instance_468},{t:this.instance_467},{t:this.instance_466},{t:this.instance_465},{t:this.instance_464},{t:this.instance_463},{t:this.instance_462},{t:this.instance_461},{t:this.instance_460},{t:this.instance_459},{t:this.instance_458},{t:this.instance_457},{t:this.instance_456},{t:this.instance_455},{t:this.instance_454},{t:this.instance_453},{t:this.instance_452},{t:this.instance_451},{t:this.instance_450},{t:this.instance_449},{t:this.instance_448},{t:this.instance_447},{t:this.instance_446},{t:this.instance_445},{t:this.instance_444},{t:this.instance_443},{t:this.instance_442},{t:this.instance_441},{t:this.instance_440},{t:this.instance_439},{t:this.instance_438},{t:this.instance_437},{t:this.instance_436},{t:this.instance_435},{t:this.instance_434},{t:this.instance_433},{t:this.instance_432},{t:this.instance_431},{t:this.instance_430},{t:this.instance_429},{t:this.instance_428},{t:this.instance_427},{t:this.instance_426},{t:this.instance_425},{t:this.instance_424},{t:this.instance_423},{t:this.instance_422},{t:this.instance_421},{t:this.instance_420},{t:this.instance_419},{t:this.instance_418},{t:this.instance_417},{t:this.instance_416},{t:this.instance_415},{t:this.instance_414},{t:this.instance_413},{t:this.instance_412},{t:this.instance_411},{t:this.instance_410},{t:this.instance_409},{t:this.instance_408},{t:this.instance_407},{t:this.instance_406},{t:this.instance_405},{t:this.instance_404},{t:this.instance_403},{t:this.instance_402},{t:this.instance_401},{t:this.instance_400},{t:this.instance_399},{t:this.instance_398},{t:this.instance_397},{t:this.instance_396},{t:this.instance_395},{t:this.instance_394},{t:this.instance_393},{t:this.instance_392},{t:this.instance_391},{t:this.instance_390},{t:this.instance_389},{t:this.instance_388},{t:this.instance_387},{t:this.instance_386},{t:this.instance_385},{t:this.instance_384},{t:this.instance_383},{t:this.instance_382},{t:this.instance_381},{t:this.instance_380},{t:this.instance_379},{t:this.instance_378},{t:this.instance_377},{t:this.instance_376},{t:this.instance_375},{t:this.instance_374},{t:this.instance_373},{t:this.instance_372},{t:this.instance_371},{t:this.instance_370},{t:this.instance_369},{t:this.instance_368},{t:this.instance_367},{t:this.instance_366},{t:this.instance_365},{t:this.instance_364},{t:this.instance_363},{t:this.instance_362},{t:this.instance_361},{t:this.instance_360},{t:this.instance_359},{t:this.instance_358},{t:this.instance_357},{t:this.instance_356},{t:this.instance_355},{t:this.instance_354},{t:this.instance_353},{t:this.instance_352},{t:this.instance_351},{t:this.instance_350},{t:this.instance_349},{t:this.instance_348},{t:this.instance_347},{t:this.instance_346},{t:this.instance_345},{t:this.instance_344},{t:this.instance_343},{t:this.instance_342},{t:this.instance_341},{t:this.instance_340},{t:this.instance_339},{t:this.instance_338},{t:this.instance_337},{t:this.instance_336},{t:this.instance_335},{t:this.instance_334},{t:this.instance_333},{t:this.instance_332},{t:this.instance_331},{t:this.instance_330},{t:this.instance_329},{t:this.instance_328},{t:this.instance_327},{t:this.instance_326},{t:this.instance_325},{t:this.instance_324},{t:this.instance_323},{t:this.instance_322},{t:this.instance_321},{t:this.instance_320},{t:this.instance_319},{t:this.instance_318},{t:this.instance_317},{t:this.instance_316},{t:this.instance_315},{t:this.instance_314},{t:this.instance_313},{t:this.instance_312},{t:this.instance_311},{t:this.instance_310},{t:this.instance_309},{t:this.instance_308},{t:this.instance_307},{t:this.instance_306},{t:this.instance_305},{t:this.instance_304},{t:this.instance_303},{t:this.instance_302},{t:this.instance_301},{t:this.instance_300},{t:this.instance_299},{t:this.instance_298},{t:this.instance_297},{t:this.instance_296},{t:this.instance_295},{t:this.instance_294},{t:this.instance_293},{t:this.instance_292},{t:this.instance_291},{t:this.instance_290},{t:this.instance_289},{t:this.instance_288},{t:this.instance_287},{t:this.instance_286},{t:this.instance_285},{t:this.instance_284},{t:this.instance_283},{t:this.instance_282},{t:this.instance_281},{t:this.instance_280},{t:this.instance_279},{t:this.instance_278},{t:this.instance_277},{t:this.instance_276},{t:this.instance_275},{t:this.instance_274},{t:this.instance_273},{t:this.instance_272},{t:this.instance_271},{t:this.instance_270},{t:this.instance_269},{t:this.instance_268},{t:this.instance_267},{t:this.instance_266},{t:this.instance_265},{t:this.instance_264},{t:this.instance_263},{t:this.instance_262},{t:this.instance_261},{t:this.instance_260},{t:this.instance_259},{t:this.instance_258},{t:this.instance_257},{t:this.instance_256},{t:this.instance_255},{t:this.instance_254},{t:this.instance_253},{t:this.instance_252},{t:this.instance_251},{t:this.instance_250},{t:this.instance_249},{t:this.instance_248},{t:this.instance_247},{t:this.instance_246},{t:this.instance_245},{t:this.instance_244},{t:this.instance_243},{t:this.instance_242},{t:this.instance_241},{t:this.instance_240},{t:this.instance_239},{t:this.instance_238},{t:this.instance_237},{t:this.instance_236},{t:this.instance_235},{t:this.instance_234},{t:this.instance_233},{t:this.instance_232},{t:this.instance_231},{t:this.instance_230},{t:this.instance_229},{t:this.instance_228},{t:this.instance_227},{t:this.instance_226},{t:this.instance_225},{t:this.instance_224},{t:this.instance_223},{t:this.instance_222},{t:this.instance_221},{t:this.instance_220},{t:this.instance_219},{t:this.instance_218},{t:this.instance_217},{t:this.instance_216},{t:this.instance_215},{t:this.instance_214},{t:this.instance_213},{t:this.instance_212},{t:this.instance_211},{t:this.instance_210},{t:this.instance_209},{t:this.instance_208},{t:this.instance_207},{t:this.instance_206},{t:this.instance_205},{t:this.instance_204},{t:this.instance_203},{t:this.instance_202},{t:this.instance_201},{t:this.instance_200},{t:this.instance_199},{t:this.instance_198},{t:this.instance_197},{t:this.instance_196},{t:this.instance_195},{t:this.instance_194},{t:this.instance_193},{t:this.instance_192},{t:this.instance_191},{t:this.instance_190},{t:this.instance_189},{t:this.instance_188},{t:this.instance_187},{t:this.instance_186},{t:this.instance_185},{t:this.instance_184},{t:this.instance_183},{t:this.instance_182},{t:this.instance_181},{t:this.instance_180},{t:this.instance_179},{t:this.instance_178},{t:this.instance_177},{t:this.instance_176},{t:this.instance_175},{t:this.instance_174},{t:this.instance_173},{t:this.instance_172},{t:this.instance_171},{t:this.instance_170},{t:this.instance_169},{t:this.instance_168},{t:this.instance_167},{t:this.instance_166},{t:this.instance_165},{t:this.instance_164},{t:this.instance_163},{t:this.instance_162},{t:this.instance_161},{t:this.instance_160},{t:this.instance_159},{t:this.instance_158},{t:this.instance_157},{t:this.instance_156},{t:this.instance_155},{t:this.instance_154},{t:this.instance_153},{t:this.instance_152},{t:this.instance_151},{t:this.instance_150},{t:this.instance_149},{t:this.instance_148},{t:this.instance_147},{t:this.instance_146},{t:this.instance_145},{t:this.instance_144},{t:this.instance_143},{t:this.instance_142},{t:this.instance_141},{t:this.instance_140},{t:this.instance_139},{t:this.instance_138},{t:this.instance_137},{t:this.instance_136},{t:this.instance_135},{t:this.instance_134},{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_123},{t:this.instance_122},{t:this.instance_121},{t:this.instance_120},{t:this.instance_119},{t:this.instance_118},{t:this.instance_117},{t:this.instance_116},{t:this.instance_115},{t:this.instance_114},{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101},{t:this.instance_100},{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94},{t:this.instance_93},{t:this.instance_92},{t:this.instance_91},{t:this.instance_90},{t:this.instance_89},{t:this.instance_88},{t:this.instance_87},{t:this.instance_86},{t:this.instance_85},{t:this.instance_84},{t:this.instance_83},{t:this.instance_82},{t:this.instance_81},{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65},{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_608 = new lib.CharacterCivilian_08();
	this.instance_608.setTransform(-122.15,177.8,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_609 = new lib.CharacterCivilian_07();
	this.instance_609.setTransform(59.5,271.85,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_610 = new lib.CharacterCivilian_07();
	this.instance_610.setTransform(3.4,100.3,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_611 = new lib.CharacterCivilian_06();
	this.instance_611.setTransform(-235.45,101.75,0.4457,0.4457,0,0,180,-4.7,42.2);

	this.instance_612 = new lib.CharacterCivilian_04();
	this.instance_612.setTransform(-128.45,113.4,0.4457,0.4457,0,0,180,-22.7,46.9);

	this.instance_613 = new lib.CharacterCivilian_09();
	this.instance_613.setTransform(-160.6,32.85,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_614 = new lib.CharacterCivilian_09();
	this.instance_614.setTransform(-330.75,106.05,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_615 = new lib.CharacterCivilian_06();
	this.instance_615.setTransform(-379.3,28,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_616 = new lib.CharacterCivilian_08();
	this.instance_616.setTransform(240.75,335,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_617 = new lib.CharacterCivilian_09();
	this.instance_617.setTransform(147.45,294.15,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_618 = new lib.CharacterCivilian_07();
	this.instance_618.setTransform(342,294.75,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_619 = new lib.CharacterCivilian_06();
	this.instance_619.setTransform(274.45,246.9,0.4457,0.4457,0,0,180,-4.7,42.2);

	this.instance_620 = new lib.CharacterCivilian_07();
	this.instance_620.setTransform(191.9,239.95,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_621 = new lib.CharacterCivilian_09();
	this.instance_621.setTransform(216.2,185.1,0.4457,0.4457,0,0,180,-4.6,40);

	this.instance_622 = new lib.CharacterCivilian_08();
	this.instance_622.setTransform(268.8,123.85,0.4457,0.4457,0,0,180,-4.6,40);

	this.instance_623 = new lib.CharacterCivilian_04();
	this.instance_623.setTransform(176.3,150.7,0.4457,0.4457,0,0,180,-22.8,46.9);

	this.instance_624 = new lib.CharacterCivilian_06();
	this.instance_624.setTransform(94.6,172.8,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_625 = new lib.CharacterCivilian_09();
	this.instance_625.setTransform(334.95,117.85,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_626 = new lib.CharacterCivilian_07();
	this.instance_626.setTransform(215.15,59.2,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_627 = new lib.CharacterCivilian_06();
	this.instance_627.setTransform(125.9,23.65,0.4457,0.4457,0,0,180,-4.7,42.3);

	this.instance_628 = new lib.CharacterCivilian_07();
	this.instance_628.setTransform(263.8,10.1,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_629 = new lib.CharacterCivilian_04();
	this.instance_629.setTransform(206.7,-22.95,0.4457,0.4457,0,0,180,-22.7,46.9);

	this.instance_630 = new lib.CharacterCivilian_07();
	this.instance_630.setTransform(363.7,71.85,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_631 = new lib.CharacterCivilian_09();
	this.instance_631.setTransform(371.15,-13.05,0.4457,0.4457,0,0,180,-4.6,40);

	this.instance_632 = new lib.CharacterCivilian_06();
	this.instance_632.setTransform(274.4,-56.05,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_633 = new lib.CharacterCivilian_04();
	this.instance_633.setTransform(343.5,-101.65,0.4457,0.4457,0,0,180,-22.8,46.8);

	this.instance_634 = new lib.CharacterCivilian_07();
	this.instance_634.setTransform(-431.8,-75.3,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_635 = new lib.CharacterCivilian_09();
	this.instance_635.setTransform(-307.95,22.1,0.4457,0.4457,0,0,180,-4.6,40);

	this.instance_636 = new lib.CharacterCivilian_08();
	this.instance_636.setTransform(-222.85,-37.85,0.4457,0.4457,0,0,180,-4.6,40);

	this.instance_637 = new lib.CharacterCivilian_08();
	this.instance_637.setTransform(-327.95,-105.7,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_638 = new lib.CharacterCivilian_04();
	this.instance_638.setTransform(-360.75,-174.7,0.4457,0.4457,0,0,180,-22.8,46.9);

	this.instance_639 = new lib.CharacterCivilian_07();
	this.instance_639.setTransform(-272.6,-154.5,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_640 = new lib.CharacterCivilian_07();
	this.instance_640.setTransform(-67.4,-25.9,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_641 = new lib.CharacterCivilian_06();
	this.instance_641.setTransform(-150.35,-68.35,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_642 = new lib.CharacterCivilian_06();
	this.instance_642.setTransform(-223.9,-200.85,0.4457,0.4457,0,0,180,-4.7,42.3);

	this.instance_643 = new lib.CharacterCivilian_09();
	this.instance_643.setTransform(66.65,-69.6,0.4457,0.4457,0,0,180,-4.6,40);

	this.instance_644 = new lib.CharacterCivilian_04();
	this.instance_644.setTransform(-138.85,-155.7,0.4457,0.4457,0,0,180,-22.8,46.8);

	this.instance_645 = new lib.CharacterCivilian_08();
	this.instance_645.setTransform(-78.5,-189,0.4457,0.4457,0,0,180,-4.7,40.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_645},{t:this.instance_644},{t:this.instance_643},{t:this.instance_642},{t:this.instance_641},{t:this.instance_640},{t:this.instance_639},{t:this.instance_638},{t:this.instance_637},{t:this.instance_636},{t:this.instance_635},{t:this.instance_634},{t:this.instance_633},{t:this.instance_632},{t:this.instance_631},{t:this.instance_630},{t:this.instance_629},{t:this.instance_628},{t:this.instance_627},{t:this.instance_626},{t:this.instance_625},{t:this.instance_624},{t:this.instance_623},{t:this.instance_622},{t:this.instance_621},{t:this.instance_620},{t:this.instance_619},{t:this.instance_618},{t:this.instance_617},{t:this.instance_616},{t:this.instance_615},{t:this.instance_614},{t:this.instance_613},{t:this.instance_612},{t:this.instance_611},{t:this.instance_610},{t:this.instance_609},{t:this.instance_608}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-470.2,-313.9,883.0999999999999,764.2);


// stage content:
(lib.LessonChapter1_02 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,176];
	this.streamSoundSymbolsList[0] = [{id:"beforewar2edit_02wav",startFrame:0,endFrame:177,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("beforewar2edit_02wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,177,1);
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
			document.location.replace("/LessonChapter1_03.html");
			}, 500);
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("/LessonChapter1_01.html");
			}, 500);
			
		}
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_176 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(176).call(this.frame_176).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_1582();
	this.instance.setTransform(195.55,597,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1581();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(177));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(177));

	// Interaction
	this.instance_2 = new lib.companions_button();
	this.instance_2.setTransform(908.35,292.85);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 1);

	this.instance_3 = new lib.Rasulullah_icon_button();
	this.instance_3.setTransform(251.4,433.8,0.7471,0.7471);
	new cjs.ButtonHelper(this.instance_3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},176).wait(1));

	// People
	this.instance_4 = new lib.CharacterCivilian_08();
	this.instance_4.setTransform(786.2,470.65,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_5 = new lib.CharacterCivilian_07();
	this.instance_5.setTransform(967.85,564.7,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_6 = new lib.CharacterCivilian_07();
	this.instance_6.setTransform(911.75,393.15,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_7 = new lib.CharacterCivilian_06();
	this.instance_7.setTransform(672.9,394.6,0.4457,0.4457,0,0,180,-4.7,42.2);

	this.instance_8 = new lib.CharacterCivilian_04();
	this.instance_8.setTransform(779.9,406.25,0.4457,0.4457,0,0,180,-22.7,46.9);

	this.instance_9 = new lib.CharacterCivilian_09();
	this.instance_9.setTransform(747.75,325.7,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_10 = new lib.CharacterCivilian_09();
	this.instance_10.setTransform(577.6,398.9,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_11 = new lib.CharacterCivilian_06();
	this.instance_11.setTransform(529.05,320.85,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_12 = new lib.CharacterCivilian_08();
	this.instance_12.setTransform(1149.1,627.85,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_13 = new lib.CharacterCivilian_09();
	this.instance_13.setTransform(1055.8,587,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_14 = new lib.CharacterCivilian_07();
	this.instance_14.setTransform(1250.35,587.6,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_15 = new lib.CharacterCivilian_06();
	this.instance_15.setTransform(1182.8,539.75,0.4457,0.4457,0,0,180,-4.7,42.2);

	this.instance_16 = new lib.CharacterCivilian_07();
	this.instance_16.setTransform(1100.25,532.8,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_17 = new lib.CharacterCivilian_09();
	this.instance_17.setTransform(1124.55,477.95,0.4457,0.4457,0,0,180,-4.6,40);

	this.instance_18 = new lib.CharacterCivilian_08();
	this.instance_18.setTransform(1177.15,416.7,0.4457,0.4457,0,0,180,-4.6,40);

	this.instance_19 = new lib.CharacterCivilian_06();
	this.instance_19.setTransform(1002.95,465.65,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_20 = new lib.CharacterCivilian_04();
	this.instance_20.setTransform(1084.65,443.55,0.4457,0.4457,0,0,180,-22.8,46.9);

	this.instance_21 = new lib.CharacterCivilian_09();
	this.instance_21.setTransform(1243.3,410.7,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_22 = new lib.CharacterCivilian_07();
	this.instance_22.setTransform(1123.5,352.05,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_23 = new lib.CharacterCivilian_06();
	this.instance_23.setTransform(1034.25,316.5,0.4457,0.4457,0,0,180,-4.7,42.3);

	this.instance_24 = new lib.CharacterCivilian_07();
	this.instance_24.setTransform(1172.15,302.95,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_25 = new lib.CharacterCivilian_04();
	this.instance_25.setTransform(1115.05,269.9,0.4457,0.4457,0,0,180,-22.7,46.9);

	this.instance_26 = new lib.CharacterCivilian_07();
	this.instance_26.setTransform(1272.05,364.7,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_27 = new lib.CharacterCivilian_09();
	this.instance_27.setTransform(1279.5,279.8,0.4457,0.4457,0,0,180,-4.6,40);

	this.instance_28 = new lib.CharacterCivilian_06();
	this.instance_28.setTransform(1182.75,236.8,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_29 = new lib.CharacterCivilian_04();
	this.instance_29.setTransform(1251.85,191.2,0.4457,0.4457,0,0,180,-22.8,46.8);

	this.instance_30 = new lib.CharacterCivilian_07();
	this.instance_30.setTransform(476.55,217.55,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_31 = new lib.CharacterCivilian_09();
	this.instance_31.setTransform(600.4,314.95,0.4457,0.4457,0,0,180,-4.6,40);

	this.instance_32 = new lib.CharacterCivilian_08();
	this.instance_32.setTransform(685.5,255,0.4457,0.4457,0,0,180,-4.6,40);

	this.instance_33 = new lib.CharacterCivilian_08();
	this.instance_33.setTransform(580.4,187.15,0.4457,0.4457,0,0,180,-4.7,40);

	this.instance_34 = new lib.CharacterCivilian_04();
	this.instance_34.setTransform(547.6,118.15,0.4457,0.4457,0,0,180,-22.8,46.9);

	this.instance_35 = new lib.CharacterCivilian_07();
	this.instance_35.setTransform(635.75,138.35,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_36 = new lib.CharacterCivilian_07();
	this.instance_36.setTransform(840.95,266.95,0.4457,0.4457,0,0,180,-4.5,42.2);

	this.instance_37 = new lib.CharacterCivilian_06();
	this.instance_37.setTransform(758,224.5,0.4457,0.4457,0,0,180,-4.6,42.3);

	this.instance_38 = new lib.CharacterCivilian_06();
	this.instance_38.setTransform(684.45,92,0.4457,0.4457,0,0,180,-4.7,42.3);

	this.instance_39 = new lib.CharacterCivilian_09();
	this.instance_39.setTransform(975,223.25,0.4457,0.4457,0,0,180,-4.6,40);

	this.instance_40 = new lib.CharacterCivilian_04();
	this.instance_40.setTransform(769.5,137.15,0.4457,0.4457,0,0,180,-22.8,46.8);

	this.instance_41 = new lib.CharacterCivilian_08();
	this.instance_41.setTransform(829.85,103.85,0.4457,0.4457,0,0,180,-4.7,40.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4}]}).to({state:[]},176).wait(1));

	// Layer_3
	this.instance_42 = new lib.Rasulullah_icon();
	this.instance_42.setTransform(251.4,433.8,0.7469,0.7469);

	this.timeline.addTween(cjs.Tween.get(this.instance_42).to({_off:true},176).wait(1));

	// Background
	this.instance_43 = new lib.Chap1Scene2();
	this.instance_43.setTransform(1,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(177));

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
		{src:"images/LessonChapter1_02_atlas_1.png", id:"LessonChapter1_02_atlas_1"},
		{src:"images/LessonChapter1_02_atlas_2.png", id:"LessonChapter1_02_atlas_2"},
		{src:"sounds/beforewar2edit_02wav.mp3", id:"beforewar2edit_02wav"},
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