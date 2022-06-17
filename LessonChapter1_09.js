(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter1_09_atlas_1", frames: [[1459,473,163,120],[1624,474,163,120],[1864,417,134,50],[1459,595,132,102],[1789,474,134,130],[1686,606,122,50],[1282,465,175,145],[1282,319,202,144],[1810,606,115,48],[1687,327,175,145],[1486,327,199,144],[1282,0,330,317],[1781,990,228,432],[1614,0,315,325],[0,990,1779,132],[0,722,1914,266],[1593,596,91,87],[1864,327,91,88],[1282,612,110,107],[0,0,1280,720]]}
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



(lib.CachedBmp_1833 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1832 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1831 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1830 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1829 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1828 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1827 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1826 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1825 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1824 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1823 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1822 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1821 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1820 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1819 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1818 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.Chap1Scene9 = function() {
	this.initialize(ss["LessonChapter1_09_atlas_1"]);
	this.gotoAndStop(19);
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
	this.instance = new lib.CachedBmp_1832();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1833();
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
	this.instance = new lib.CachedBmp_1829();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_1831();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_1830();
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
	this.instance = new lib.CachedBmp_1826();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1828();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1827();
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
	this.instance = new lib.CachedBmp_1823();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1825();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1824();
	this.instance_2.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(216.45,-207.05,4.7384,4.7384,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


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
	this.shape.graphics.f("#2B241C").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
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
	this.shape.graphics.f("#2B241C").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
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
	this.instance = new lib.CachedBmp_1822();
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
	this.shape.graphics.f("#2B241C").s().p("AEqDnIqVg8QhOgIg0g5Qg1g5AAhNQAAhPA4g4QA4g5BPgBIKVgKQBjgBBHBFQBHBFAABiQgBBkhJBEQhCA8hVAAIgYgBg");
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
	this.shape.graphics.f("#2B241C").s().p("AnYCsQhJhEgBhkQAAhiBHhFQBHhFBjABIKVAKQBPABA4A5QA3A4AABPQAABNg0A5Qg1A5hNAIIqVA8IgYABQhVAAhCg8g");
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
	this.shape.graphics.f("#2B241C").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape.setTransform(-0.4374,-21.3926,0.5879,0.5879);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1810").s().p("AAQF8QgTgBgKgLQgMgOAAgdQAAiogkjTIg9lFIDFAAIgHKfQA+AegHAfQgDAMgPAHQgOAIgTAAg");
	this.shape_1.setTransform(0.9098,22.975,1,1,0,0,180);

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
	this.shape.graphics.f("#2B241C").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape.setTransform(-1.3874,-21.3426,0.5879,0.5879);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1810").s().p("AAQF8QgTgBgKgLQgMgOAAgdQAAiogkjTIg9lFIDFAAIgHKfQA+AegHAfQgDAMgPAHQgOAIgTAAg");
	this.shape_1.setTransform(-0.0402,23.025,1,1,0,0,180);

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
	this.instance = new lib.CachedBmp_1821();
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
	this.shape.graphics.f("#2B241C").s().p("AEUDHIrkgfIAAlDILmgrQBZgDA0A+QAuA2AABLQACBQg4BAQg4BBhMAAIgDAAg");
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
	this.shape.graphics.f("#2B241C").s().p("AmaCGQg4hAAChQQAAhLAug2QA0g+BZADILmArIAAFDIrkAfIgDAAQhMAAg4hBg");
	this.shape.setTransform(-13.6284,12.5688);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_1.setTransform(0.0758,4.22,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.1,-7.3,108.5,39.8);


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
	this.instance = new lib.CachedBmp_1820();
	this.instance.setTransform(-74.4,-80.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-74.4,-80.7,157.5,162.5);


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


(lib.CharacterCivilian_09_back = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-59.35,-11.9,0.9974,0.9974,-59.5241,0,0,33.2,9.8);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-163.7,-7.3,0.9969,0.9969,0,-133.3242,46.6758,14.2,-0.1);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-163.5,-6.85,0.9973,0.9973,0,-139.8296,40.1704,4.8,-9.2);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-97.95,48.75,0.9972,0.9972,35.135,0,0,44.3,7.4);

	this.instance_4 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_4.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_5 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_5.setTransform(24.8,88.25,0.9946,0.9946,-8.9623,0,0,0.7,4.7);

	this.instance_6 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_6.setTransform(-30,90.45,0.9955,0.9955,3.9272,0,0,1.4,-42.2);

	this.instance_7 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_7.setTransform(-41.75,185.9,0.995,0.995,6.4525,0,0,1,-51);

	this.instance_8 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_8.setTransform(34,185.75,0.9948,0.9948,-3.3795,0,0,3.6,-50.3);

	this.instance_9 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_9.setTransform(-10,49,0.9995,0.9995,1.7768,0,0,-4.7,-21.9);

	this.instance_10 = new lib.ch1_headcopy3("synched",0);
	this.instance_10.setTransform(-9.15,-76.6,0.998,0.998,0,11.8542,-168.1458,2.5,50.8);

	this.instance_11 = new lib.ch1_neckcopy2("synched",0);
	this.instance_11.setTransform(-3.95,-59.4,0.9981,0.9981,11.3457,0,0,-1.4,7.4);

	this.instance_12 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_12.setTransform(89.45,36.95,0.9972,0.9972,130.7553,0,0,-45.5,12.8);

	this.instance_13 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_13.setTransform(38.85,109.05,0.9971,0.9971,0,-69.9378,110.0622,-9.8,10.6);

	this.instance_14 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_14.setTransform(41,106.1,0.9971,0.9971,0,-34.6385,145.3615,-7.4,13.3);

	this.instance_15 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_15.setTransform(48.15,-20.8,0.9974,0.9974,54.8655,0,0,-32.6,13.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regY:13.4,scaleX:0.9974,scaleY:0.9974,rotation:54.8655,x:48.15,y:-20.8,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.6385,skewY:145.3615,x:41,y:106.1,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.6,scaleX:0.9971,scaleY:0.9971,skewX:-69.9378,skewY:110.0622,x:38.85,y:109.05}},{t:this.instance_12,p:{rotation:130.7553,x:89.45,y:36.95,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.9981,scaleY:0.9981,rotation:11.3457,x:-3.95,regX:-1.4,y:-59.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,skewX:11.8542,skewY:-168.1458,x:-9.15,y:-76.6,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.7,regY:-21.9,rotation:1.7768,x:-10,y:49}},{t:this.instance_8,p:{scaleX:0.9948,scaleY:0.9948,rotation:-3.3795,x:34,y:185.75}},{t:this.instance_7,p:{rotation:6.4525,x:-41.75,y:185.9,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9272,x:-30,y:90.45}},{t:this.instance_5,p:{regX:0.7,scaleX:0.9946,scaleY:0.9946,rotation:-8.9623,y:88.25,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.3,regY:7.4,scaleX:0.9972,scaleY:0.9972,rotation:35.135,x:-97.95,y:48.75}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9973,scaleY:0.9973,skewX:-139.8296,skewY:40.1704,x:-163.5,y:-6.85}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.9969,scaleY:0.9969,skewX:-133.3242,skewY:46.6758,x:-163.7,y:-7.3,regX:14.2}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-59.5241,x:-59.35,y:-11.9,regX:33.2}}]}).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:53.9052,x:48.1,y:-20.8,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.7303,skewY:145.2697,x:42,y:105.5,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.0287,skewY:109.9713,x:40.05,y:108.5}},{t:this.instance_12,p:{rotation:130.6637,x:90.25,y:36.25,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.3635,x:-3.9,regX:-1.4,y:-59.4}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:11.3598,skewY:-168.6402,x:-9.3,y:-76.5,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3788,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9265,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.962,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:27.5658,x:-96.45,y:49.8}},{t:this.instance_2,p:{regX:4.9,scaleX:0.9972,scaleY:0.9972,skewX:-147.3984,skewY:32.6016,x:-168.75,y:3.3}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9968,scaleY:0.9968,skewX:-140.895,skewY:39.105,x:-169.15,y:2.85,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-60.8623,x:-59.3,y:-11.85,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9974,scaleY:0.9974,rotation:52.9457,x:48.05,y:-20.8,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.821,skewY:145.179,x:43.05,y:104.95,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.1205,skewY:109.8795,x:41.1,y:107.85}},{t:this.instance_12,p:{rotation:130.5723,x:91.2,y:35.55,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.3812,x:-3.9,regX:-1.4,y:-59.4}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:10.8651,skewY:-169.1349,x:-9.3,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3788,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9265,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9611,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:19.9942,x:-94.95,y:50.65}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:-154.9705,skewY:25.0295,x:-172.85,y:13.95}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:-148.466,skewY:31.534,x:-173.2,y:13.55,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-62.1995,x:-59.35,y:-11.9,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:51.9857,x:48.05,y:-20.8,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.9122,skewY:145.0878,x:44.1,y:104.25,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.2118,skewY:109.7882,x:42.1,y:107.15}},{t:this.instance_12,p:{rotation:130.4796,x:92.15,y:34.8,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.3993,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:10.3702,skewY:-169.6298,x:-9.25,y:-76.55,regY:50.7,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.378,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9611,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:12.4229,x:-93.45,y:51.35}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:-162.5407,skewY:17.4593,x:-175.5,y:25.3}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9968,scaleY:0.9968,skewX:-156.0371,skewY:23.9629,x:-175.9,y:25,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-63.5377,x:-59.25,y:-12,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9974,scaleY:0.9974,rotation:51.026,x:48.1,y:-20.8,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.0037,skewY:144.9963,x:45.1,y:103.55,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.3041,skewY:109.6959,x:43.2,y:106.55}},{t:this.instance_12,p:{rotation:130.3881,x:93.15,y:34.05,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.4163,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:9.8746,skewY:-170.1254,x:-9.25,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.378,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9611,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.3,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:4.8527,x:-92.1,y:52.2}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:-170.1108,skewY:9.8892,x:-176.75,y:37.05}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:-163.6086,skewY:16.3914,x:-177.05,y:36.95,regX:14.3}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-64.8759,x:-59.3,y:-11.9,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.2,scaleX:0.9973,scaleY:0.9973,rotation:50.0658,x:48.15,y:-20.85,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.0949,skewY:144.9051,x:46.1,y:102.85,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.3954,skewY:109.6046,x:44.2,y:105.8}},{t:this.instance_12,p:{rotation:130.2973,x:93.95,y:33.25,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.4341,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:9.3805,skewY:-170.6195,x:-9.25,y:-76.5,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7751,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.378,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9611,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.4,scaleX:0.9971,scaleY:0.9971,rotation:-2.7137,x:-90.5,y:52.75}},{t:this.instance_2,p:{regX:4.9,scaleX:0.9973,scaleY:0.9973,skewX:-177.6831,skewY:2.3169,x:-176.3,y:49.1}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:-171.1774,skewY:8.8226,x:-176.85,y:49,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-66.214,x:-59.35,y:-11.85,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9974,scaleY:0.9974,rotation:49.1075,x:48.05,y:-20.8,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.1861,skewY:144.8139,x:47.1,y:102.3,regX:-7.3,regY:13.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.486,skewY:109.514,x:45.15,y:105.1}},{t:this.instance_12,p:{rotation:130.2064,x:94.9,y:32.45,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.4512,x:-3.7,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:8.8869,skewY:-171.113,x:-9.2,y:-76.45,regY:50.8,regX:2.4}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.378,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9611,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9972,scaleY:0.9972,rotation:-10.2854,x:-88.95,y:53.55}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:174.7518,skewY:-5.2482,x:-174.65,y:61.15}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:-178.7493,skewY:1.2507,x:-175.15,y:61.15,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-67.5522,x:-59.25,y:-11.85,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:48.1467,x:48.05,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.2788,skewY:144.7212,x:48.15,y:101.45,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.5781,skewY:109.4219,x:46.2,y:104.45}},{t:this.instance_12,p:{rotation:130.1132,x:95.8,y:31.7,scaleX:0.9972,scaleY:0.9972,regX:-45.6,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.469,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:8.3917,skewY:-171.6083,x:-9.25,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.378,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9611,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-17.8557,x:-87.35,y:54.25}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:167.1812,skewY:-12.8188,x:-171.35,y:73.15}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:173.6859,skewY:-6.3141,x:-171.85,y:73.1,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-68.8909,x:-59.25,y:-12,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:47.1867,x:48.05,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.3705,skewY:144.6295,x:49.15,y:100.65,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.6705,skewY:109.3295,x:47.15,y:103.75}},{t:this.instance_12,p:{rotation:130.0223,x:96.75,y:30.8,scaleX:0.9972,scaleY:0.9972,regX:-45.6,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.4869,x:-3.7,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:7.8978,skewY:-172.1022,x:-9.15,y:-76.55,regY:50.7,regX:2.4}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.378,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9611,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-25.4263,x:-85.75,y:54.85}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:159.6107,skewY:-20.3893,x:-166.55,y:84.6}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:166.1137,skewY:-13.8863,x:-167.05,y:84.7,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-70.2288,x:-59.25,y:-11.95,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9974,scaleY:0.9974,rotation:46.2261,x:48.05,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.4603,skewY:144.5397,x:50,y:100,regX:-7.3,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.762,skewY:109.238,x:48.05,y:102.9}},{t:this.instance_12,p:{rotation:129.9307,x:97.45,y:30.05,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.5048,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:7.4028,skewY:-172.5972,x:-9.1,y:-76.4,regY:50.8,regX:2.4}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.378,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9256,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9611,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-32.9963,x:-84.25,y:55.45}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:152.039,skewY:-27.961,x:-160.35,y:95.55}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:158.5432,skewY:-21.4568,x:-160.85,y:95.7,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-71.5681,x:-59.3,y:-11.85,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:45.2665,x:48.1,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.5515,skewY:144.4485,x:51,y:99.15,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.8532,skewY:109.1468,x:49.1,y:102.15}},{t:this.instance_12,p:{rotation:129.84,x:98.35,y:29.15,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.5226,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:6.9085,skewY:-173.0915,x:-9.15,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.378,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9611,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-40.5683,x:-82.6,y:56}},{t:this.instance_2,p:{regX:4.9,scaleX:0.9972,scaleY:0.9972,skewX:144.4689,skewY:-35.5311,x:-152.7,y:105.75}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.9969,scaleY:0.9969,skewX:150.9734,skewY:-29.0266,x:-153.25,y:105.95,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-72.9058,x:-59.25,y:-12.05,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9974,scaleY:0.9974,rotation:44.3058,x:48.2,y:-20.65,regX:-32.5}},{t:this.instance_14,p:{skewX:-35.6438,skewY:144.3562,x:52,y:98.4,regX:-7.4,regY:13.3,scaleX:0.997,scaleY:0.997}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.945,skewY:109.055,x:50.05,y:101.4}},{t:this.instance_12,p:{rotation:129.7478,x:99.15,y:28.4,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.5396,x:-3.7,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:6.4144,skewY:-173.5856,x:-9.2,y:-76.5,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.378,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9611,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-48.1387,x:-81.05,y:56.55}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:136.8992,skewY:-43.1008,x:-144.05,y:115.15}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9968,scaleY:0.9968,skewX:143.4022,skewY:-36.5978,x:-144.45,y:115.4,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-74.2439,x:-59.25,y:-11.9,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:43.3466,x:48.05,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.7345,skewY:144.2655,x:52.9,y:97.65,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-71.0368,skewY:108.9632,x:50.95,y:100.6}},{t:this.instance_12,p:{rotation:129.6564,x:99.95,y:27.45,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.5575,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:5.92,skewY:-174.08,x:-9.25,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.378,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9611,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-55.7081,x:-79.35,y:56.95}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:129.3284,skewY:-50.6716,x:-134.15,y:123.35}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:135.8316,skewY:-44.1684,x:-134.45,y:123.75,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-75.5813,x:-59.3,y:-11.9,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9974,scaleY:0.9974,rotation:42.3865,x:48.05,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.8268,skewY:144.1732,x:53.85,y:96.85,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-71.128,skewY:108.872,x:51.85,y:99.75}},{t:this.instance_12,p:{rotation:129.5641,x:100.7,y:26.55,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.5754,x:-3.7,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:5.4242,skewY:-174.5758,x:-9.15,y:-76.55,regY:50.7,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.378,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9604,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-63.2785,x:-77.75,y:57.4}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:121.7578,skewY:-58.2422,x:-123.3,y:130.5}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:128.2608,skewY:-51.7392,x:-123.6,y:130.9,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-76.9195,x:-59.3,y:-11.95,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:41.4274,x:48.05,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.9178,skewY:144.0822,x:54.75,y:96,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-71.2195,skewY:108.7805,x:52.75,y:99}},{t:this.instance_12,p:{rotation:129.4726,x:101.55,y:25.8,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.5932,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:4.9308,skewY:-175.0692,x:-9.2,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3771,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9604,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.4,scaleX:0.9972,scaleY:0.9972,rotation:-70.8503,x:-76.3,y:57.85}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:114.1876,skewY:-65.8124,x:-111.7,y:136.2}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9968,scaleY:0.9968,skewX:120.69,skewY:-59.31,x:-111.9,y:136.65,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-78.2579,x:-59.3,y:-11.9,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:40.4686,x:48.1,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-36.0093,skewY:143.9907,x:55.55,y:95.2,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-71.3113,skewY:108.6887,x:53.6,y:98.15}},{t:this.instance_12,p:{rotation:129.3805,x:102.3,y:24.9,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.6111,x:-3.8,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:4.4359,skewY:-175.5641,x:-9.2,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3771,x:33.95,y:185.7}},{t:this.instance_7,p:{rotation:6.4519,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9247,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9604,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-78.4198,x:-74.5,y:58.25}},{t:this.instance_2,p:{regX:4.9,scaleX:0.9972,scaleY:0.9972,skewX:106.6168,skewY:-73.3832,x:-99.35,y:140.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:113.1197,skewY:-66.8803,x:-99.55,y:141.1,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-79.5961,x:-59.25,y:-11.95,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:39.5071,x:48.1,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-36.1005,skewY:143.8995,x:56.4,y:94.3,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-71.4028,skewY:108.5972,x:54.45,y:97.35}},{t:this.instance_12,p:{rotation:129.2894,x:103.05,y:23.9,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.629,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:3.9414,skewY:-176.0586,x:-9.2,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3771,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.2,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9972,scaleY:0.9972,rotation:-85.9917,x:-72.85,y:58.5}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:99.0465,skewY:-80.9535,x:-86.65,y:143.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9968,scaleY:0.9968,skewX:105.5488,skewY:-74.4512,x:-86.75,y:143.9,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9974,rotation:-80.9341,x:-59.25,y:-11.95,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:40.6892,x:48.1,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.9881,skewY:144.0119,x:55.3,y:95.35,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-71.2908,skewY:108.7092,x:53.4,y:98.35}},{t:this.instance_12,p:{rotation:129.4029,x:102.2,y:25.1,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.7}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.6468,x:-3.8,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:3.447,skewY:-176.553,x:-9.2,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3771,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9972,scaleY:0.9972,rotation:-87.6821,x:-74.75,y:58.05}},{t:this.instance_2,p:{regX:4.9,scaleX:0.9972,scaleY:0.9972,skewX:97.3555,skewY:-82.6445,x:-86,y:143.25}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:103.8584,skewY:-76.1416,x:-86.1,y:143.85,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-79.3919,x:-59.25,y:-11.95,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9974,scaleY:0.9974,rotation:41.8701,x:48.2,y:-20.6,regX:-32.5}},{t:this.instance_14,p:{skewX:-35.8745,skewY:144.1255,x:54.25,y:96.4,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-71.1782,skewY:108.8218,x:52.3,y:99.4}},{t:this.instance_12,p:{rotation:129.5149,x:101.15,y:26.2,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.6647,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:2.9529,skewY:-177.0471,x:-9.2,y:-76.5,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49.05}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3771,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.3,regY:7.5,scaleX:0.9972,scaleY:0.9972,rotation:-89.3722,x:-76.55,y:57.8}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:95.664,skewY:-84.336,x:-85.4,y:143.2}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:102.1677,skewY:-77.8323,x:-85.45,y:143.7,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-77.8492,x:-59.3,y:-11.95,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:43.0514,x:48.15,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.764,skewY:144.236,x:53.15,y:97.3,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-71.0648,skewY:108.9352,x:51.15,y:100.35}},{t:this.instance_12,p:{rotation:129.6283,x:100.15,y:27.25,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.6826,x:-3.8,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:2.4591,skewY:-177.5409,x:-9.15,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3771,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9972,scaleY:0.9972,rotation:-91.0592,x:-78.5,y:57.15}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:93.9729,skewY:-86.0271,x:-84.75,y:142.9}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:100.4762,skewY:-79.5238,x:-84.8,y:143.45,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-76.3076,x:-59.25,y:-11.95,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:44.2339,x:48.1,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.6503,skewY:144.3497,x:52,y:98.3,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.9533,skewY:109.0467,x:50.1,y:101.35}},{t:this.instance_12,p:{rotation:129.7409,x:99.15,y:28.35,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.7006,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:1.9646,skewY:-178.0354,x:-9.2,y:-76.55,regY:50.7,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3771,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.3,regY:7.5,scaleX:0.9972,scaleY:0.9972,rotation:-92.7506,x:-80.4,y:56.75}},{t:this.instance_2,p:{regX:4.9,scaleX:0.9972,scaleY:0.9972,skewX:92.2818,skewY:-87.7182,x:-84.1,y:142.45}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:98.7871,skewY:-81.2129,x:-84.1,y:143,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-74.7652,x:-59.25,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:45.4153,x:48.15,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.5372,skewY:144.4628,x:50.85,y:99.3,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.8396,skewY:109.1604,x:48.85,y:102.25}},{t:this.instance_12,p:{rotation:129.8537,x:98.2,y:29.25,scaleX:0.9972,scaleY:0.9972,regX:-45.6,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.7185,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:1.4703,skewY:-178.5297,x:-9.15,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3771,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-94.4409,x:-82.25,y:55.95}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9973,scaleY:0.9973,skewX:90.5909,skewY:-89.4091,x:-83.4,y:142}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9968,scaleY:0.9968,skewX:97.0949,skewY:-82.9051,x:-83.4,y:142.3,regX:14.3}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-73.2247,x:-59.25,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9974,scaleY:0.9974,rotation:46.5963,x:48.1,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.4258,skewY:144.5742,x:49.65,y:100.25,regX:-7.3,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.6,scaleX:0.997,scaleY:0.997,skewX:-70.7287,skewY:109.2713,x:47.6,y:103.2}},{t:this.instance_12,p:{rotation:129.9658,x:97.2,y:30.4,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.7}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.7363,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:0.976,skewY:-179.024,x:-9.15,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3771,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-96.1324,x:-84.1,y:55.4}},{t:this.instance_2,p:{regX:4.9,scaleX:0.9972,scaleY:0.9972,skewX:88.9041,skewY:-91.0959,x:-82.65,y:141.2}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:95.4034,skewY:-84.5966,x:-82.65,y:141.7,regX:14.3}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-71.6818,x:-59.2,y:-12.1,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:13.2,scaleX:0.9973,scaleY:0.9973,rotation:47.7774,x:48.2,y:-20.8,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.3126,skewY:144.6874,x:48.45,y:101.1,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.6147,skewY:109.3853,x:46.5,y:104.1}},{t:this.instance_12,p:{rotation:130.0796,x:96.05,y:31.45,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.7542,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:0.481,skewY:-179.519,x:-9.2,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3771,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-97.8242,x:-85.95,y:54.7}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:87.2136,skewY:-92.7864,x:-81.95,y:140.6}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:93.7123,skewY:-86.2877,x:-81.95,y:140.9,regX:14.3}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-70.1392,x:-59.2,y:-12.1,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:48.9584,x:48.1,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.2,skewY:144.8,x:47.2,y:102.1,regX:-7.3,regY:13.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.5021,skewY:109.4979,x:45.25,y:104.95}},{t:this.instance_12,p:{rotation:130.1916,x:95.05,y:32.45,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.7}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.7721,x:-3.8,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:-0.007,skewY:179.993,x:-9.15,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3771,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9972,scaleY:0.9972,rotation:-99.5136,x:-87.6,y:53.9}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:85.5216,skewY:-94.4784,x:-81.1,y:139.7}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:92.0219,skewY:-87.9781,x:-81.15,y:140.1,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-68.5973,x:-59.25,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:50.1404,x:48.1,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.0866,skewY:144.9134,x:46,y:102.85,regX:-7.4,regY:13.3,scaleX:0.997,scaleY:0.997}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.3898,skewY:109.6102,x:44.05,y:105.85}},{t:this.instance_12,p:{rotation:130.3053,x:93.85,y:33.3,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.7899,x:-3.75,regX:-1.4,y:-59.4}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:-0.502,skewY:179.498,x:-9.15,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3771,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-101.2056,x:-89.45,y:53.1}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:83.8319,skewY:-96.1681,x:-80.45,y:138.6}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:90.3306,skewY:-89.6694,x:-80.35,y:139.1,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-67.0559,x:-59.2,y:-12.1,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:51.3228,x:48.15,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.9759,skewY:145.0241,x:44.75,y:103.6,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.2769,skewY:109.7231,x:42.75,y:106.65}},{t:this.instance_12,p:{rotation:130.4168,x:92.75,y:34.2,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.808,x:-3.8,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:-0.9962,skewY:179.0038,x:-9.1,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3762,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-102.8966,x:-91.2,y:52.3}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:82.1403,skewY:-97.8597,x:-79.65,y:137.5}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:88.644,skewY:-91.356,x:-79.6,y:137.9,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-65.5128,x:-59.25,y:-12.05,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:13.2,scaleX:0.9974,scaleY:0.9974,rotation:52.5028,x:48.2,y:-20.8,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.8626,skewY:145.1374,x:43.45,y:104.5,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.164,skewY:109.836,x:41.45,y:107.45}},{t:this.instance_12,p:{rotation:130.5293,x:91.65,y:35.15,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.8259,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:-1.4904,skewY:178.5096,x:-9.15,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7734,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3762,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9972,scaleY:0.9972,rotation:-104.5879,x:-92.95,y:51.4}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:80.4498,skewY:-99.5502,x:-78.85,y:136.25}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:86.9536,skewY:-93.0464,x:-78.8,y:136.65,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-63.9709,x:-59.2,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:53.6852,x:48.1,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.749,skewY:145.251,x:42.15,y:105.25,regX:-7.4,regY:13.3,scaleX:0.997,scaleY:0.997}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.0531,skewY:109.9469,x:40.2,y:108.25}},{t:this.instance_12,p:{rotation:130.6437,x:90.5,y:36,scaleX:0.9972,scaleY:0.9972,regX:-45.6,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.8437,x:-3.75,regX:-1.4,y:-59.4}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:-1.9848,skewY:178.0152,x:-9.15,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3762,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9972,scaleY:0.9972,rotation:-106.2779,x:-94.65,y:50.45}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:78.758,skewY:-101.242,x:-78.1,y:134.8}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:85.263,skewY:-94.737,x:-78,y:135.25,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-62.4293,x:-59.3,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.8659,x:48.2,y:-20.65,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.6383,skewY:145.3617,x:40.9,y:106,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.6,scaleX:0.997,scaleY:0.997,skewX:-69.9399,skewY:110.0601,x:38.8,y:108.95}},{t:this.instance_12,p:{rotation:130.7555,x:89.25,y:36.9,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.8616,x:-3.75,regX:-1.3,y:-59.3}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:-2.4793,skewY:177.5207,x:-9.15,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7742,x:-10.15,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3762,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4519,x:-41.65,y:185.8,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9239,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9602,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-107.9686,x:-96.3,y:49.5}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:77.067,skewY:-102.933,x:-77.25,y:133.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:83.5728,skewY:-96.4272,x:-77.2,y:133.7,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-60.8862,x:-59.25,y:-12.05,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.8695,x:48.2,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.651,skewY:145.349,x:40.9,y:106,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-69.9596,skewY:110.0404,x:38.85,y:109}},{t:this.instance_12,p:{rotation:130.7506,x:89.3,y:36.9,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.8482,x:-3.75,regX:-1.4,y:-59.4}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:-1.9918,skewY:178.0082,x:-9.15,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7716,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.378,x:33.95,y:185.65}},{t:this.instance_7,p:{rotation:6.4458,x:-41.65,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9265,x:-29.9,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9665,y:88.15,x:24.85}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-108.8691,x:-96.8,y:49.15}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:76.1713,skewY:-103.8287,x:-76.5,y:132.65}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:82.6702,skewY:-97.3298,x:-76.4,y:132.95,regX:14.3}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-60.3941,x:-59.3,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.8753,x:48.2,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.6648,skewY:145.3352,x:40.85,y:106,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-69.9812,skewY:110.0188,x:38.9,y:109}},{t:this.instance_12,p:{rotation:130.7468,x:89.3,y:36.9,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.8348,x:-3.75,regX:-1.4,y:-59.4}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:-1.5053,skewY:178.4947,x:-9.1,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7699,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3798,x:34,y:185.65}},{t:this.instance_7,p:{rotation:6.4412,x:-41.7,y:185.9,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9293,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9727,y:88.15,x:24.85}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.3,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-109.7692,x:-97.35,y:48.85}},{t:this.instance_2,p:{regX:4.9,scaleX:0.9972,scaleY:0.9972,skewX:75.2754,skewY:-104.7246,x:-75.8,y:131.9}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:81.7665,skewY:-98.2335,x:-75.65,y:132.4,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-59.9016,x:-59.25,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.8797,x:48.2,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.6767,skewY:145.3233,x:40.9,y:106.05,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.9971,scaleY:0.9971,skewX:-70.0021,skewY:109.9979,x:38.95,y:109}},{t:this.instance_12,p:{rotation:130.7432,x:89.3,y:36.9,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.8205,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:-1.0181,skewY:178.9819,x:-9.1,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7681,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3815,x:34,y:185.65}},{t:this.instance_7,p:{rotation:6.436,x:-41.65,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9319,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9799,y:88.15,x:24.85}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-110.6691,x:-97.9,y:48.5}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:74.379,skewY:-105.621,x:-74.95,y:131.35}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:80.8641,skewY:-99.1359,x:-74.8,y:131.7,regX:14.3}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-59.4108,x:-59.25,y:-12.05,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.8841,x:48.2,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.6906,skewY:145.3094,x:40.9,y:106.15,regX:-7.4,regY:13.4,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.0239,skewY:109.9761,x:38.95,y:109}},{t:this.instance_12,p:{rotation:130.7387,x:89.3,y:36.85,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.8071,x:-3.8,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:-0.5318,skewY:179.4682,x:-9.1,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.8,rotation:1.7664,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3833,x:34.05,y:185.65}},{t:this.instance_7,p:{rotation:6.4307,x:-41.65,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9345,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9861,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-111.5687,x:-98.45,y:48.2}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:73.4839,skewY:-106.5161,x:-74.15,y:130.65}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:79.9614,skewY:-100.0386,x:-74.05,y:130.9,regX:14.3}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-58.9182,x:-59.2,y:-12.05,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.8885,x:48.2,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.703,skewY:145.297,x:40.9,y:106.05,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.0436,skewY:109.9564,x:38.95,y:109}},{t:this.instance_12,p:{rotation:130.7351,x:89.25,y:36.85,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.7936,x:-3.75,regX:-1.4,y:-59.4}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:-0.0447,skewY:179.9553,x:-9.1,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7637,x:-10.1,y:48.9}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.385,x:34.05,y:185.65}},{t:this.instance_7,p:{rotation:6.427,x:-41.6,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9371,x:-29.95,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-8.9932,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-112.4691,x:-98.95,y:47.85}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:72.5884,skewY:-107.4116,x:-73.4,y:129.9}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:79.0587,skewY:-100.9413,x:-73.25,y:130.25,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-58.4249,x:-59.2,y:-12.05,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.8936,x:48.2,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.7176,skewY:145.2824,x:40.85,y:106.05,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.065,skewY:109.935,x:39,y:109}},{t:this.instance_12,p:{rotation:130.7306,x:89.25,y:36.85,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.7802,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:0.4372,skewY:-179.5628,x:-9.15,y:-76.35,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.762,x:-10.1,y:48.9}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3877,x:34.05,y:185.65}},{t:this.instance_7,p:{rotation:6.4219,x:-41.6,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9398,x:-29.9,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-9.0003,y:88.2,x:24.85}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-113.3689,x:-99.5,y:47.5}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:71.6915,skewY:-108.3085,x:-72.6,y:129.15}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:78.1558,skewY:-101.8442,x:-72.45,y:129.6,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-57.9316,x:-59.15,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.8985,x:48.15,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.7303,skewY:145.2697,x:40.9,y:106,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.0858,skewY:109.9142,x:38.95,y:109.05}},{t:this.instance_12,p:{rotation:130.727,x:89.25,y:36.85,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.7668,x:-3.8,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:0.9244,skewY:-179.0756,x:-9.1,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7602,x:-10.1,y:48.95}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3894,x:34,y:185.65}},{t:this.instance_7,p:{rotation:6.4166,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9425,x:-29.9,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-9.0065,y:88.2,x:24.85}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.4,scaleX:0.9971,scaleY:0.9971,rotation:-114.2691,x:-100,y:47.1}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:70.7957,skewY:-109.2043,x:-71.85,y:128.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:77.2527,skewY:-102.7473,x:-71.7,y:128.8,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-57.4401,x:-59.2,y:-12.05,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.9028,x:48.15,y:-20.65,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.7434,skewY:145.2566,x:40.85,y:106,regX:-7.4,regY:13.3,scaleX:0.997,scaleY:0.997}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.106,skewY:109.894,x:38.95,y:109.05}},{t:this.instance_12,p:{rotation:130.7232,x:89.25,y:36.85,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.7525,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:1.4098,skewY:-178.5902,x:-9.1,y:-76.35,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7585,x:-10.1,y:48.95}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3912,x:34.05,y:185.65}},{t:this.instance_7,p:{rotation:6.412,x:-41.6,y:185.75,regY:-51.1,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9451,x:-29.9,y:90.35}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-9.0137,y:88.2,x:24.85}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.4,scaleX:0.9971,scaleY:0.9971,rotation:-115.169,x:-100.55,y:46.75}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:69.9,skewY:-110.1,x:-71.05,y:127.55}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:76.3511,skewY:-103.6489,x:-70.95,y:127.95,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-56.9465,x:-59.2,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.9079,x:48.15,y:-20.7,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.7573,skewY:145.2427,x:40.9,y:106,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.1272,skewY:109.8728,x:38.95,y:109.05}},{t:this.instance_12,p:{rotation:130.7189,x:89.25,y:36.8,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.7391,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:1.898,skewY:-178.102,x:-9.2,y:-76.5,regY:50.7,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7558,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3929,x:34.1,y:185.65}},{t:this.instance_7,p:{rotation:6.4069,x:-41.7,y:185.85,regY:-51,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9477,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-9.0199,y:88.15,x:24.75}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.4,scaleX:0.9971,scaleY:0.9971,rotation:-116.0694,x:-101,y:46.45}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:69.0033,skewY:-110.9967,x:-70.3,y:126.8}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:75.4477,skewY:-104.5523,x:-70.15,y:127.15,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-56.4534,x:-59.2,y:-12.05,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.9123,x:48.15,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.7706,skewY:145.2294,x:40.85,y:106,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.1477,skewY:109.8523,x:38.95,y:109.05}},{t:this.instance_12,p:{rotation:130.7146,x:89.3,y:36.8,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.7255,x:-3.8,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:2.3846,skewY:-177.6154,x:-9.15,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7541,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3947,x:34.1,y:185.65}},{t:this.instance_7,p:{rotation:6.4015,x:-41.65,y:185.75,regY:-51.1,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9503,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-9.0261,y:88.15,x:24.75}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.4,scaleX:0.9971,scaleY:0.9971,rotation:-116.9693,x:-101.6,y:46.1}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:68.1077,skewY:-111.8923,x:-69.55,y:125.9}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:74.5453,skewY:-105.4547,x:-69.4,y:126.25,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-55.961,x:-59.15,y:-12.1,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.9167,x:48.15,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.7845,skewY:145.2155,x:40.9,y:106.1,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.169,skewY:109.831,x:39,y:109}},{t:this.instance_12,p:{rotation:130.7108,x:89.3,y:36.85,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.713,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:2.8722,skewY:-177.1278,x:-9.2,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7523,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.3974,x:34.1,y:185.65}},{t:this.instance_7,p:{rotation:6.3962,x:-41.65,y:185.75,regY:-51.1,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9531,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-9.0334,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-117.8681,x:-102,y:45.65}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:67.2107,skewY:-112.7893,x:-68.75,y:125}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:73.6425,skewY:-106.3575,x:-68.65,y:125.4,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-55.4682,x:-59.2,y:-12.05,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.9218,x:48.15,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.7974,skewY:145.2026,x:40.85,y:106.1,regX:-7.4,regY:13.3,scaleX:0.997,scaleY:0.997}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.1901,skewY:109.8099,x:39,y:109.05}},{t:this.instance_12,p:{rotation:130.7071,x:89.25,y:36.85,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.6979,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:3.3592,skewY:-176.6408,x:-9.15,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7497,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4,x:34.15,y:185.65}},{t:this.instance_7,p:{rotation:6.3918,x:-41.65,y:185.75,regY:-51.1,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9566,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-9.0394,y:88.15,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-118.7692,x:-102.45,y:45.3}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:66.3156,skewY:-113.6844,x:-68.05,y:124.05}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:72.7402,skewY:-107.2598,x:-67.9,y:124.55,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-54.9752,x:-59.25,y:-12.05,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.9262,x:48.15,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.8103,skewY:145.1897,x:40.85,y:106.1,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.2106,skewY:109.7894,x:38.95,y:109.05}},{t:this.instance_12,p:{rotation:130.7028,x:89.25,y:36.85,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.6845,x:-3.8,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:3.8447,skewY:-176.1553,x:-9.1,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.748,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4018,x:34.1,y:185.65}},{t:this.instance_7,p:{rotation:6.3865,x:-41.65,y:185.7,regY:-51.1,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9592,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-9.0465,y:88.1,x:24.8}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-119.6681,x:-102.95,y:44.95}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:65.4196,skewY:-114.5804,x:-67.25,y:123.2}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9968,scaleY:0.9968,skewX:71.8368,skewY:-108.1632,x:-67.15,y:123.6,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-54.4827,x:-59.15,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.9306,x:48.15,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.8241,skewY:145.1759,x:40.85,y:106.1,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.2323,skewY:109.7677,x:39,y:109.05}},{t:this.instance_12,p:{rotation:130.6996,x:89.2,y:36.9,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.6719,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:4.3322,skewY:-175.6678,x:-9.2,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7462,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4035,x:34.1,y:185.65}},{t:this.instance_7,p:{rotation:6.3811,x:-41.7,y:185.7,regY:-51.1,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9618,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-9.0529,y:88.1,x:24.75}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-120.5678,x:-103.4,y:44.55}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:64.5238,skewY:-115.4762,x:-66.5,y:122.25}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:70.9347,skewY:-109.0653,x:-66.35,y:122.65,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-53.9903,x:-59.2,y:-12.05,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.9357,x:48.15,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.838,skewY:145.162,x:40.9,y:106.05,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.2528,skewY:109.7472,x:39,y:109.1}},{t:this.instance_12,p:{rotation:130.6947,x:89.2,y:36.95,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.6575,x:-3.75,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:4.8191,skewY:-175.1809,x:-9.15,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7445,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4053,x:34.15,y:185.65}},{t:this.instance_7,p:{rotation:6.3768,x:-41.65,y:185.75,regY:-51.1,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9644,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-9.0601,y:88.1,x:24.75}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-121.4666,x:-103.9,y:44.2}},{t:this.instance_2,p:{regX:4.9,scaleX:0.9972,scaleY:0.9972,skewX:63.6278,skewY:-116.3722,x:-65.9,y:121.15}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:70.0317,skewY:-109.9683,x:-65.65,y:121.7,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-53.4986,x:-59.25,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.94,x:48.1,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.8519,skewY:145.1481,x:40.95,y:106.1,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.2742,skewY:109.7258,x:39.05,y:109.05}},{t:this.instance_12,p:{rotation:130.6903,x:89.25,y:36.95,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.6443,x:-3.85,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:5.3046,skewY:-174.6954,x:-9.2,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7427,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4079,x:34.2,y:185.65}},{t:this.instance_7,p:{rotation:6.3705,x:-41.65,y:185.75,regY:-51.1,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9672,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-9.0672,y:88.15,x:24.85}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.3,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-111.0391,x:-103.5,y:44.55}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:74.0599,skewY:-105.9401,x:-80,y:127.25}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9968,scaleY:0.9968,skewX:80.4577,skewY:-99.5423,x:-79.95,y:127.6,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-53.9031,x:-59.2,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.2,scaleX:0.9973,scaleY:0.9973,rotation:54.9444,x:48.2,y:-20.8,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.865,skewY:145.135,x:40.95,y:106.1,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.2944,skewY:109.7056,x:39.05,y:109.1}},{t:this.instance_12,p:{rotation:130.6866,x:89.25,y:36.95,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.6317,x:-3.8,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:5.7932,skewY:-174.2068,x:-9.1,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.741,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4097,x:34.15,y:185.65}},{t:this.instance_7,p:{rotation:6.3652,x:-41.65,y:185.75,regY:-51.1,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9707,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-9.0741,y:88.1,x:24.85}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.3,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-100.6109,x:-103.1,y:44.9}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:84.4936,skewY:-95.5064,x:-94.95,y:130.45}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:90.8788,skewY:-89.1212,x:-95,y:130.9,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-54.3093,x:-59.15,y:-12.05,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:13.2,scaleX:0.9973,scaleY:0.9973,rotation:54.9488,x:48.2,y:-20.8,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.8777,skewY:145.1223,x:41,y:106.2,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.3149,skewY:109.6851,x:39.05,y:109.15}},{t:this.instance_12,p:{rotation:130.6836,x:89.25,y:36.95,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.6171,x:-3.8,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:6.2787,skewY:-173.7213,x:-9.2,y:-76.4,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7392,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4115,x:34.15,y:185.65}},{t:this.instance_7,p:{rotation:6.3609,x:-41.7,y:185.85,regY:-51,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9732,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.8,scaleX:0.9945,scaleY:0.9945,rotation:-9.0814,y:88.1,x:24.85}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.3,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-90.1824,x:-102.7,y:45.35}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:94.9208,skewY:-85.0792,x:-110.2,y:130.95}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:101.3061,skewY:-78.6939,x:-110.35,y:131.3,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-54.716,x:-59.2,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.9539,x:48.15,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.8922,skewY:145.1078,x:40.95,y:106.2,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.3366,skewY:109.6634,x:39,y:109.15}},{t:this.instance_12,p:{rotation:130.6798,x:89.25,y:36.95,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.6039,x:-3.85,regX:-1.4,y:-59.45}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:6.7672,skewY:-173.2328,x:-9.15,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7375,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4141,x:34.15,y:185.65}},{t:this.instance_7,p:{rotation:6.3563,x:-41.75,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9759,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.7,scaleX:0.9945,scaleY:0.9945,rotation:-9.0886,y:88.15,x:24.7}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-79.7581,x:-102.35,y:45.55}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:105.3528,skewY:-74.6472,x:-125.2,y:128.5}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:111.7304,skewY:-68.2696,x:-125.3,y:128.75,regX:14.3}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-55.1219,x:-59.2,y:-11.95,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.9583,x:48.15,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.9061,skewY:145.0939,x:41,y:106.2,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.3571,skewY:109.6429,x:39,y:109.15}},{t:this.instance_12,p:{rotation:130.6755,x:89.25,y:36.95,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.5903,x:-3.75,regX:-1.3,y:-59.4}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:7.2526,skewY:-172.7474,x:-9.1,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7366,x:-10.1,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4159,x:34.15,y:185.65}},{t:this.instance_7,p:{rotation:6.3502,x:-41.7,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9795,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.7,scaleX:0.9945,scaleY:0.9945,rotation:-9.0948,y:88.15,x:24.7}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.4,scaleX:0.9971,scaleY:0.9971,rotation:-69.3286,x:-102,y:45.85}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:115.786,skewY:-64.214,x:-139.4,y:123.25}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.9969,scaleY:0.9969,skewX:122.1575,skewY:-57.8425,x:-139.7,y:123.55,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-55.5275,x:-59.25,y:-11.95,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.9627,x:48.15,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.9185,skewY:145.0815,x:40.95,y:106.2,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.379,skewY:109.621,x:39.05,y:109.15}},{t:this.instance_12,p:{rotation:130.6717,x:89.25,y:36.95,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.5769,x:-3.75,regX:-1.3,y:-59.4}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:7.7396,skewY:-172.2604,x:-9.15,y:-76.4,regY:50.8,regX:2.4}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.734,x:-10.05,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4176,x:34.2,y:185.65}},{t:this.instance_7,p:{rotation:6.3467,x:-41.75,y:185.85,regY:-51,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9821,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.7,scaleX:0.9945,scaleY:0.9945,rotation:-9.1017,y:88.15,x:24.75}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.3,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-58.9017,x:-101.6,y:46.25}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:126.2185,skewY:-53.7815,x:-152.4,y:115.5}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:132.5826,skewY:-47.4174,x:-152.7,y:115.9,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-55.9345,x:-59.2,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.967,x:48.15,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.9331,skewY:145.0669,x:41,y:106.2,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.3987,skewY:109.6013,x:39.05,y:109.15}},{t:this.instance_12,p:{rotation:130.6673,x:89.25,y:36.95,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.5635,x:-3.75,regX:-1.3,y:-59.4}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:8.2261,skewY:-171.7739,x:-9.25,y:-76.5,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7322,x:-10.05,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4202,x:34.25,y:185.65}},{t:this.instance_7,p:{rotation:6.3414,x:-41.75,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9847,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.7,scaleX:0.9945,scaleY:0.9945,rotation:-9.1088,y:88.15,x:24.75}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.4,scaleX:0.9971,scaleY:0.9971,rotation:-48.4734,x:-101.2,y:46.45}},{t:this.instance_2,p:{regX:4.9,scaleX:0.9972,scaleY:0.9972,skewX:136.6511,skewY:-43.3489,x:-163.65,y:105.35}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9968,scaleY:0.9968,skewX:143.0075,skewY:-36.9925,x:-164.15,y:105.7,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-56.3396,x:-59.15,y:-12.05,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9973,scaleY:0.9973,rotation:54.9714,x:48.1,y:-20.75,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.9463,skewY:145.0537,x:40.95,y:106.15,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.6,scaleX:0.997,scaleY:0.997,skewX:-70.4211,skewY:109.5789,x:38.9,y:109.15}},{t:this.instance_12,p:{rotation:130.6623,x:89.2,y:36.95,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.5501,x:-3.8,regX:-1.3,y:-59.4}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:8.7142,skewY:-171.2858,x:-9.1,y:-76.45,regY:50.8,regX:2.4}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7305,x:-10.05,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.422,x:34.25,y:185.65}},{t:this.instance_7,p:{rotation:6.337,x:-41.75,y:185.85,regY:-51,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9882,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.7,scaleX:0.9945,scaleY:0.9945,rotation:-9.1162,y:88.15,x:24.75}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-38.0446,x:-100.7,y:46.8}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:147.0844,skewY:-32.9156,x:-172.95,y:93.45}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:153.4338,skewY:-26.5662,x:-173.4,y:93.6,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-56.7461,x:-59.25,y:-12,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.2,scaleX:0.9973,scaleY:0.9973,rotation:54.9758,x:48.15,y:-20.85,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.9589,skewY:145.0411,x:41,y:106.15,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.4397,skewY:109.5603,x:39,y:109.2}},{t:this.instance_12,p:{rotation:130.6592,x:89.2,y:36.95,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.5367,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:9.2012,skewY:-170.7988,x:-9.25,y:-76.5,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7287,x:-10.05,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4238,x:34.25,y:185.65}},{t:this.instance_7,p:{rotation:6.3317,x:-41.8,y:185.85,regY:-51,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9909,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.7,scaleX:0.9945,scaleY:0.9945,rotation:-9.1224,y:88.2,x:24.7}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-27.6168,x:-100.25,y:47.15}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:157.5164,skewY:-22.4836,x:-179.85,y:79.9}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:163.859,skewY:-16.141,x:-180.25,y:80,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-57.1524,x:-59.3,y:-11.95,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.2,scaleX:0.9974,scaleY:0.9974,rotation:54.9802,x:48.15,y:-20.85,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.9728,skewY:145.0272,x:40.95,y:106.15,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.4622,skewY:109.5378,x:38.95,y:109.2}},{t:this.instance_12,p:{rotation:130.6543,x:89.2,y:37,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.5233,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:9.6879,skewY:-170.3121,x:-9.15,y:-76.45,regY:50.8,regX:2.4}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.727,x:-10.05,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4264,x:34.25,y:185.65}},{t:this.instance_7,p:{rotation:6.3263,x:-41.75,y:185.85,regY:-51,scaleX:0.995,scaleY:0.995}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9936,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.7,scaleX:0.9945,scaleY:0.9945,rotation:-9.1302,y:88.2,x:24.7}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:-17.1883,x:-99.9,y:47.4}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:167.9487,skewY:-12.0513,x:-184.05,y:65.3}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:174.2856,skewY:-5.7144,x:-184.55,y:65.3,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-57.5581,x:-59.25,y:-11.95,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.2,scaleX:0.9973,scaleY:0.9973,rotation:54.9841,x:48.15,y:-20.85,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.9871,skewY:145.0129,x:41,y:106.25,regX:-7.4,regY:13.3,scaleX:0.997,scaleY:0.997}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.4816,skewY:109.5184,x:39,y:109.15}},{t:this.instance_12,p:{rotation:130.6511,x:89.2,y:37.05,scaleX:0.9971,scaleY:0.9971,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.5099,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:10.1752,skewY:-169.8248,x:-9.25,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7252,x:-10.05,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4282,x:34.25,y:185.65}},{t:this.instance_7,p:{rotation:6.322,x:-41.8,y:185.9,regY:-51,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9971,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.7,scaleX:0.9945,scaleY:0.9945,rotation:-9.1374,y:88.2,x:24.75}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.3,regY:7.5,scaleX:0.9972,scaleY:0.9972,rotation:-6.7589,x:-99.5,y:47.75}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:178.3823,skewY:-1.6177,x:-185.45,y:50}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:-175.2939,skewY:4.7061,x:-185.95,y:49.95,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-57.964,x:-59.25,y:-11.9,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.2,scaleX:0.9973,scaleY:0.9973,rotation:54.9884,x:48.15,y:-20.85,regX:-32.6}},{t:this.instance_14,p:{skewX:-34.9993,skewY:145.0007,x:40.95,y:106.25,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.503,skewY:109.497,x:39,y:109.2}},{t:this.instance_12,p:{rotation:130.6474,x:89.2,y:37.05,scaleX:0.9972,scaleY:0.9972,regX:-45.5,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.4965,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:10.6608,skewY:-169.3392,x:-9.3,y:-76.45,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7235,x:-10.05,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4299,x:34.3,y:185.7}},{t:this.instance_7,p:{rotation:6.3166,x:-41.75,y:185.9,regY:-51,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9996,x:-30,y:90.45}},{t:this.instance_5,p:{regX:0.7,scaleX:0.9945,scaleY:0.9945,rotation:-9.1447,y:88.2,x:24.75}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:3.6657,x:-99.05,y:48}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:-171.1904,skewY:8.8096,x:-184.1,y:34.7}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:-164.8683,skewY:15.1317,x:-184.5,y:34.5,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-58.371,x:-59.25,y:-11.9,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.2,scaleX:0.9973,scaleY:0.9973,rotation:54.994,x:48.15,y:-20.85,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.0139,skewY:144.9861,x:40.95,y:106.3,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.5235,skewY:109.4765,x:39,y:109.25}},{t:this.instance_12,p:{rotation:130.6425,x:89.3,y:36.95,scaleX:0.9972,scaleY:0.9972,regX:-45.6,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.4831,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:11.1479,skewY:-168.8521,x:-9.25,y:-76.5,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7217,x:-10.05,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4326,x:34.35,y:185.7}},{t:this.instance_7,p:{rotation:6.3114,x:-41.8,y:185.9,regY:-51,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0032,x:-30,y:90.4}},{t:this.instance_5,p:{regX:0.7,scaleX:0.9945,scaleY:0.9945,rotation:-9.1517,y:88.2,x:24.75}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.4,scaleX:0.9971,scaleY:0.9971,rotation:14.0937,x:-98.6,y:48.25}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:-160.7577,skewY:19.2423,x:-179.9,y:19.85}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9968,scaleY:0.9968,skewX:-154.4414,skewY:25.5586,x:-180.3,y:19.55,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-58.7771,x:-59.25,y:-11.9,regX:33.2}}]},1).to({state:[{t:this.instance_15,p:{regY:13.2,scaleX:0.9974,scaleY:0.9974,rotation:54.9984,x:48.15,y:-20.85,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.0277,skewY:144.9723,x:40.95,y:106.3,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.5445,skewY:109.4555,x:39,y:109.3}},{t:this.instance_12,p:{rotation:130.6393,x:89.3,y:36.95,scaleX:0.9972,scaleY:0.9972,regX:-45.6,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.4706,x:-3.8,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:11.6342,skewY:-168.3658,x:-9.25,y:-76.55,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.72,x:-10.05,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4343,x:34.35,y:185.7}},{t:this.instance_7,p:{rotation:6.307,x:-41.85,y:185.9,regY:-51,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0059,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.7,scaleX:0.9945,scaleY:0.9945,rotation:-9.1587,y:88.2,x:24.7}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:24.5217,x:-98.2,y:48.6}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:-150.325,skewY:29.675,x:-172.95,y:5.95}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9969,scaleY:0.9969,skewX:-144.0163,skewY:35.9837,x:-173.3,y:5.65,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-59.1833,x:-59.2,y:-11.95,regX:33.3}}]},1).to({state:[{t:this.instance_15,p:{regY:13.3,scaleX:0.9974,scaleY:0.9974,rotation:55.0028,x:48.1,y:-20.8,regX:-32.6}},{t:this.instance_14,p:{skewX:-35.0401,skewY:144.9599,x:40.95,y:106.25,regX:-7.4,regY:13.3,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_13,p:{regY:10.7,scaleX:0.997,scaleY:0.997,skewX:-70.5662,skewY:109.4338,x:39.05,y:109.3}},{t:this.instance_12,p:{rotation:130.6338,x:89.3,y:36.9,scaleX:0.9972,scaleY:0.9972,regX:-45.6,regY:12.8}},{t:this.instance_11,p:{scaleX:0.998,scaleY:0.998,rotation:11.4563,x:-3.75,regX:-1.3,y:-59.35}},{t:this.instance_10,p:{scaleX:0.9979,scaleY:0.9979,skewX:12.1203,skewY:-167.8797,x:-9.2,y:-76.55,regY:50.8,regX:2.5}},{t:this.instance_9,p:{regX:-4.8,regY:-21.9,rotation:1.7182,x:-10.05,y:49}},{t:this.instance_8,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.4361,x:34.35,y:185.7}},{t:this.instance_7,p:{rotation:6.3017,x:-41.85,y:185.9,regY:-51,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_6,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0085,x:-29.95,y:90.4}},{t:this.instance_5,p:{regX:0.7,scaleX:0.9945,scaleY:0.9945,rotation:-9.166,y:88.2,x:24.7}},{t:this.instance_4},{t:this.instance_3,p:{regX:44.4,regY:7.5,scaleX:0.9971,scaleY:0.9971,rotation:34.9501,x:-97.85,y:48.95}},{t:this.instance_2,p:{regX:4.8,scaleX:0.9972,scaleY:0.9972,skewX:-139.8917,skewY:40.1083,x:-163.65,y:-6.6}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9968,scaleY:0.9968,skewX:-133.5902,skewY:46.4098,x:-163.85,y:-6.9,regX:14.2}},{t:this.instance,p:{scaleX:0.9973,scaleY:0.9973,rotation:-59.588,x:-59.3,y:-11.85,regX:33.2}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-220.3,-221.7,345,518.5999999999999);


(lib.abuSufyan_close_button = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-25.25,-30.8,0.4217,0.4217,-59.5273,0,0,33.4,9.1);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-69.4,-28.75,0.4215,0.4215,0,-133.3232,46.6768,13.7,-0.4);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-69.3,-28.65,0.4216,0.4216,0,-139.8312,40.1688,4.2,-9.2);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-41.6,-5.1,0.4216,0.4216,35.1298,0,0,43.6,7.4);

	this.instance_4 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_4.setTransform(-3.25,-41,0.4228,0.4228,0,0,0,-0.5,-40.1);

	this.instance_5 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_5.setTransform(10.35,11.55,0.4205,0.4205,-8.9561,0,0,0.7,4.7);

	this.instance_6 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_6.setTransform(-12.8,12.5,0.4209,0.4209,3.9167,0,0,1.1,-42.1);

	this.instance_7 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_7.setTransform(-17.8,52.85,0.4207,0.4207,6.446,0,0,0.6,-50.9);

	this.instance_8 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_8.setTransform(14.25,52.8,0.4206,0.4206,-3.3717,0,0,3.8,-50.1);

	this.instance_9 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_9.setTransform(-4.4,-4.95,0.4226,0.4226,1.7692,0,0,-5.2,-21.8);

	this.instance_10 = new lib.ch1_headcopy3("synched",0);
	this.instance_10.setTransform(-3.95,-58.2,0.4219,0.4219,0,11.85,-168.15,2.6,50.2);

	this.instance_11 = new lib.ch1_neckcopy2("synched",0);
	this.instance_11.setTransform(-1.85,-50.8,0.422,0.422,11.3408,0,0,-1.9,7.2);

	this.instance_12 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_12.setTransform(37.7,-10.15,0.4216,0.4216,130.754,0,0,-45.5,12.7);

	this.instance_13 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_13.setTransform(16.3,20.4,0.4215,0.4215,0,-69.9435,110.0565,-9.7,10.7);

	this.instance_14 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_14.setTransform(17.2,19.15,0.4216,0.4216,0,-34.6357,145.3643,-7.3,13.4);

	this.instance_15 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_15.setTransform(20.25,-34.6,0.4217,0.4217,54.8682,0,0,-32.9,12.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_16 = new lib.CharacterCivilian_09_back();
	this.instance_16.setTransform(-4.3,-8.7,0.4229,0.4229,0,0,0,-9.7,40.5);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83,-119.5,133,219.7);


// stage content:
(lib.LessonChapter1_09 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,211];
	this.streamSoundSymbolsList[0] = [{id:"beforewar2edit_09wav",startFrame:0,endFrame:212,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("beforewar2edit_09wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,212,1);
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
			document.location.replace("/LessonChapter1_10.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("/LessonChapter1_08.html");
			}, 500);
			
		}
		
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_211 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(211).call(this.frame_211).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_1819();
	this.instance.setTransform(195.55,597,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1818();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(212));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(212));

	// interaction
	this.instance_2 = new lib.abuSufyan_close_button();
	this.instance_2.setTransform(830.9,449.15);
	this.instance_2._off = true;
	new cjs.ButtonHelper(this.instance_2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(211).to({_off:false},0).wait(1));

	// abuSufyan
	this.instance_3 = new lib.CharacterCivilian_09_back();
	this.instance_3.setTransform(826.7,440.55,0.4229,0.4229,0,0,0,-9.7,40.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},211).wait(1));

	// Background
	this.instance_4 = new lib.Chap1Scene9();
	this.instance_4.setTransform(1,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(212));

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
		{src:"images/LessonChapter1_09_atlas_1.png", id:"LessonChapter1_09_atlas_1"},
		{src:"sounds/beforewar2edit_09wav.mp3", id:"beforewar2edit_09wav"},
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