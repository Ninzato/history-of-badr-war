(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter1_05_atlas_1", frames: [[1092,1692,163,120],[490,1704,163,120],[1687,638,134,50],[1314,1712,132,102],[655,1705,134,130],[1687,0,330,317],[1781,990,228,432],[1354,1124,331,292],[1687,319,330,317],[664,1124,228,432],[1354,1418,331,292],[1916,638,55,257],[1973,638,55,257],[1687,1124,55,257],[905,1705,55,256],[1092,1558,155,132],[1282,0,403,350],[1541,1712,122,50],[738,1558,175,145],[333,1443,202,144],[1665,1718,115,48],[915,1558,175,145],[537,1558,199,144],[0,1124,330,317],[894,1124,228,432],[1687,1424,331,292],[332,1124,330,317],[1124,1124,228,432],[0,1443,331,292],[1257,1558,55,257],[791,1705,55,257],[848,1705,55,257],[962,1705,55,256],[333,1589,155,132],[1282,352,403,350],[0,990,1779,132],[0,722,1914,266],[1448,1712,91,87],[1916,897,91,88],[537,1443,110,107],[0,0,1280,720]]}
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



(lib.CachedBmp_1724 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1723 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1722 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1721 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1720 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1719 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1718 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1717 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1716 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1715 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1714 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1713 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1712 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1711 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1710 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1709 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1708 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1707 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1706 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1705 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1704 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1703 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1702 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1701 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1700 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1699 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1698 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1697 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1696 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1695 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1694 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1693 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1692 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1691 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1690 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1689 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1688 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.Chap1Scene5 = function() {
	this.initialize(ss["LessonChapter1_05_atlas_1"]);
	this.gotoAndStop(40);
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
	this.instance = new lib.CachedBmp_1723();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1724();
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
	this.instance = new lib.CachedBmp_1720();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_1722();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_1721();
	this.instance_2.setTransform(-33.05,-28.15,0.4875,0.4875);

	this.instance_3 = new lib.CompoundPath();
	this.instance_3.setTransform(-159.75,-154.3,3.5004,3.5004);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

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
	this.instance = new lib.CachedBmp_1719();
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
	this.instance = new lib.CachedBmp_1718();
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
	this.instance = new lib.CachedBmp_1717();
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
	this.instance_1 = new lib.CachedBmp_1716();
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
	this.instance_1 = new lib.CachedBmp_1715();
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
	this.instance_1 = new lib.CachedBmp_1714();
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


(lib.camel_tail = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#C19A6B").s().p("ADVLIQADlKgCh1QgIoOholkQgyiwhJh1QhdiUiIhAQgRgIAJgQQAKgPARAFQEbBSB9JFQBXGXgCI4QgBCfgMC+QgNCzgTCVQgGilACkag");
	this.shape.setTransform(-1.7953,-4.629,0.274,0.274);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B2012").s().p("AgjDbIgOhHQgGgjAHgSQgmAWgbBDQgYA6ACApQgXgmAEgvQACgfAUg2QAWhAAFgZQALgzgNgrQAFASgbAfQgfAjgBAOQgbijBhiXQAwhMA1grQBcA6AoBTQAvBiglB1QAAgPgDgQQgFgigMgJQgZBJgHBKQgDAagCBTQgCA3gJAbQgOAmgmAbQAQgMACghQABghgPgaQgbAUgKAxQgRBMgpBVQAohYgQhjg");
	this.shape_1.setTransform(4.374,25.2694,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-36.4,18,72.8);


(lib.camel_neck = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#C19A6B").s().p("AA3QvQhZgpg8hEQgvg1gnhUQgrhkgYgzQgphagwg7Qg7hJhVilIh3jwQgOgcg+hqQg2hcgchAQhajJAZjDQAajHB1iBQBsh1CcgfQCZgfCRA9QCXBABcCQQAeAvAqBxQAZBBA0CUQBpEWBkBJQC3CFBhDiQBOC3gMCKQgJBtg0B3Qg7CHhbBcQhrBriCAcQgsAKguAAQhvAAh6g4g");
	this.shape.setTransform(0.0062,0.0052,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.7,-30.8,45.4,61.7);


(lib.camel_leg_f_r_u = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#B78A52").s().p("AmuWZQgti5AKiGQAEgvAPhkQATh6AJhQQAKhTgqnMQgvoGgCheQgKmQAjkVQARiSBLh0QBGhuBqg8QBrg9BzAFQB7AEBrBOIAIAFQCFBeBCChQBECjgaCvQg5GOjeInQg6CQhuEIQhYDagkCDQgLBPAFBJQAEAqAJBLQALCQhODhQgMAhgoAZQgpAZgwAEIgNAAQhuAAgeh7g");
	this.shape.setTransform(-0.0363,0.0095,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.8,-42.6,27.6,85.30000000000001);


(lib.camel_leg_f_r_b = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1713();
	this.instance.setTransform(-9.45,-43.95,0.3429,0.3429);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-43.9,18.8,88.1);


(lib.camel_leg_f_l_u = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#C19A6B").s().p("AmuWZQgti5ALiGQAEgvAPhkQASh6AKhQQAJhTgqnMQgvoGgCheQgKmLAjkaQARiSBLh0QBGhuBqg8QBrg9BzAFQB7AEBrBOIAIAFQCFBeBDChQBDCjgZCvQg6GOjeInQg6CQhuEIQhYDagkCDQgLBPAGBJQADAqAJBLQALCQhODhQgMAhgoAZQgpAagwADIgOAAQhtAAgeh7g");
	this.shape.setTransform(0.0135,0.0285,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-42.6,27.5,85.30000000000001);


(lib.camel_leg_f_l_b = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1712();
	this.instance.setTransform(-9.45,-44,0.343,0.343);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,18.8,88.2);


(lib.camel_leg_b_r_u = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#9E7542").s().p("AmuWZQgti4ALiHQADguAQhlQASh5AJhRQAKhTgqnMQgvoHgChdQgKmLAjkaQARiSBLh0QBGhuBqg8QBrg9BzAFQB7AEBrBOIAIAFQCFBeBCChQBECjgaCvQg5GOjeInQg6CRhuEHQhYDagkCDQgLBPAFBJQAEAqAJBLQALCQhODhQgMAhgoAZQgpAagwADIgNAAQhuAAgeh7g");
	this.shape.setTransform(-0.0062,-0.0063,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-42.6,27.5,85.2);


(lib.camel_leg_b_r_b = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1711();
	this.instance.setTransform(-9.45,-43.95,0.3433,0.3433);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-43.9,18.9,88.19999999999999);


(lib.camel_leg_b_l_u = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#C19A6B").s().p("AmuWZQgti5AKiGQAEgvAPhkQATh6AJhQQAKhTgqnMQgvoFgChfQgKmKAikbQASiSBKh0QBHhuBqg8QBrg9BzAFQB7AEBrBOIAIAFQCFBeBCChQBECjgaCvQg5GOjeInQg7CQhuEIQhXDagkCDQgLBPAFBJQADAqAJBLQALCQhODhQgLAhgpAZQgpAZgvAEIgOAAQhtAAgeh7g");
	this.shape.setTransform(-0.0167,0.0244,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-42.6,27.5,85.30000000000001);


(lib.camel_leg_b_l_b = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1710();
	this.instance.setTransform(-9.45,-44,0.3434,0.3434);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,18.9,87.9);


(lib.camel_head = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1709();
	this.instance.setTransform(-26.5,-22.65,0.343,0.343);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.5,-22.6,53.2,45.3);


(lib.camel_body = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_1708();
	this.instance.setTransform(-69.1,-73.05,0.3427,0.3427);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.1,-73,138.1,119.9);


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
	this.instance = new lib.CachedBmp_1705();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1707();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1706();
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
	this.instance = new lib.CachedBmp_1702();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1704();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1703();
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
	this.instance = new lib.CachedBmp_1701();
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
	this.shape_1.setTransform(0.8902,22.975);

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
	this.shape_1.setTransform(-0.0598,23.025);

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
	this.instance = new lib.CachedBmp_1700();
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
	this.instance = new lib.CachedBmp_1699();
	this.instance.setTransform(-78.3,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.3,-67.4,165.5,146);


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
	this.shape_1.graphics.f("#4F1006").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
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
	this.shape_1.graphics.f("#4F1006").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
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
	this.instance_1 = new lib.CachedBmp_1698();
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
	this.shape_1.graphics.f("#4F1006").s().p("AEqDnIqVg8QhOgIg0g5Qg1g5AAhNQAAhPA4g4QA4g5BPgBIKVgKQBjgBBHBFQBHBFAABiQgBBkhJBEQhCA8hVAAIgYgBg");
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
	this.shape_1.graphics.f("#4F1006").s().p("AnYCsQhJhEgBhkQAAhiBHhFQBHhFBjABIKVAKQBPABA4A5QA3A4AABPQAABNg0A5Qg1A5hNAIIqVA8IgYABQhVAAhCg8g");
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
	this.shape_2.graphics.f("#4F1006").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
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
	this.shape_2.graphics.f("#4F1006").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
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
	this.instance_1 = new lib.CachedBmp_1697();
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
	this.shape_2.graphics.f("#4F1006").s().p("AEUDHIrkgfIAAlDILmgrQBZgDA0A+QAuA2AABLQACBQg4BAQg4BBhMAAIgDAAg");
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
	this.shape_2.graphics.f("#4F1006").s().p("AmaCGQg4hAAChQQAAhLAug2QA0g+BZADILmArIAAFDIrkAfIgDAAQhMAAg4hBg");
	this.shape_2.setTransform(-13.6284,12.5688);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_3.setTransform(0.0758,4.22,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.1,-7.3,108.5,39.8);


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
	this.instance_1 = new lib.CachedBmp_1696();
	this.instance_1.setTransform(-78.3,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.3,-67.4,165.5,146);


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


(lib.camel_tailcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#C19A6B").s().p("ADVLIQADlKgCh1QgIoOholkQgyiwhJh1QhdiUiIhAQgRgIAJgQQAKgPARAFQEbBSB9JFQBXGXgCI4QgBCfgMC+QgNCzgTCVQgGilACkag");
	this.shape.setTransform(-1.7953,-4.629,0.274,0.274);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B2012").s().p("AgjDbIgOhHQgGgjAHgSQgmAWgbBDQgYA6ACApQgXgmAEgvQACgfAUg2QAWhAAFgZQALgzgNgrQAFASgbAfQgfAjgBAOQgbijBhiXQAwhMA1grQBcA6AoBTQAvBiglB1QAAgPgDgQQgFgigMgJQgZBJgHBKQgDAagCBTQgCA3gJAbQgOAmgmAbQAQgMACghQABghgPgaQgbAUgKAxQgRBMgpBVQAohYgQhjg");
	this.shape_1.setTransform(4.374,25.2694,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-36.4,18,72.8);


(lib.camel_neckcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#C19A6B").s().p("AA3QvQhZgpg8hEQgvg1gnhUQgrhkgYgzQgphagwg7Qg7hJhVilIh3jwQgOgcg+hqQg2hcgchAQhajJAZjDQAajHB1iBQBsh1CcgfQCZgfCRA9QCXBABcCQQAeAvAqBxQAZBBA0CUQBpEWBkBJQC3CFBhDiQBOC3gMCKQgJBtg0B3Qg7CHhbBcQhrBriCAcQgsAKguAAQhvAAh6g4g");
	this.shape.setTransform(0.0062,0.0052,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.7,-30.8,45.4,61.7);


(lib.camel_leg_f_r_ucopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#B78A52").s().p("AmuWZQgti5AKiGQAEgvAPhkQATh6AJhQQAKhTgqnMQgvoGgCheQgKmQAjkVQARiSBLh0QBGhuBqg8QBrg9BzAFQB7AEBrBOIAIAFQCFBeBCChQBECjgaCvQg5GOjeInQg6CQhuEIQhYDagkCDQgLBPAFBJQAEAqAJBLQALCQhODhQgMAhgoAZQgpAZgwAEIgNAAQhuAAgeh7g");
	this.shape.setTransform(-0.0363,0.0095,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.8,-42.6,27.6,85.30000000000001);


(lib.camel_leg_f_r_bcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1695();
	this.instance.setTransform(-9.45,-43.95,0.3429,0.3429);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-43.9,18.8,88.1);


(lib.camel_leg_f_l_ucopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#C19A6B").s().p("AmuWZQgti5ALiGQAEgvAPhkQASh6AKhQQAJhTgqnMQgvoGgCheQgKmLAjkaQARiSBLh0QBGhuBqg8QBrg9BzAFQB7AEBrBOIAIAFQCFBeBDChQBDCjgZCvQg6GOjeInQg6CQhuEIQhYDagkCDQgLBPAGBJQADAqAJBLQALCQhODhQgMAhgoAZQgpAagwADIgOAAQhtAAgeh7g");
	this.shape.setTransform(0.0135,0.0285,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-42.6,27.5,85.30000000000001);


(lib.camel_leg_f_l_bcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1694();
	this.instance.setTransform(-9.45,-44,0.343,0.343);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,18.8,88.2);


(lib.camel_leg_b_r_ucopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#9E7542").s().p("AmuWZQgti4ALiHQADguAQhlQASh5AJhRQAKhTgqnMQgvoHgChdQgKmLAjkaQARiSBLh0QBGhuBqg8QBrg9BzAFQB7AEBrBOIAIAFQCFBeBCChQBECjgaCvQg5GOjeInQg6CRhuEHQhYDagkCDQgLBPAFBJQAEAqAJBLQALCQhODhQgMAhgoAZQgpAagwADIgNAAQhuAAgeh7g");
	this.shape.setTransform(-0.0062,-0.0063,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-42.6,27.5,85.2);


(lib.camel_leg_b_r_bcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1693();
	this.instance.setTransform(-9.45,-43.95,0.3433,0.3433);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-43.9,18.9,88.19999999999999);


(lib.camel_leg_b_l_ucopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f("#C19A6B").s().p("AmuWZQgti5AKiGQAEgvAPhkQATh6AJhQQAKhTgqnMQgvoFgChfQgKmKAikbQASiSBKh0QBHhuBqg8QBrg9BzAFQB7AEBrBOIAIAFQCFBeBCChQBECjgaCvQg5GOjeInQg7CQhuEIQhXDagkCDQgLBPAFBJQADAqAJBLQALCQhODhQgLAhgpAZQgpAZgvAEIgOAAQhtAAgeh7g");
	this.shape.setTransform(-0.0167,0.0244,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-42.6,27.5,85.30000000000001);


(lib.camel_leg_b_l_bcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1692();
	this.instance.setTransform(-9.45,-44,0.3434,0.3434);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,18.9,87.9);


(lib.camel_headcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1691();
	this.instance.setTransform(-26.5,-22.65,0.343,0.343);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.5,-22.6,53.2,45.3);


(lib.camel_bodycopy = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_1690();
	this.instance.setTransform(-69.1,-73.05,0.3427,0.3427);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.1,-73,138.1,119.9);


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


(lib.camel_01_interact = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_5
	this.instance = new lib.camel_leg_b_l_bcopy("synched",0);
	this.instance.setTransform(58.25,46,0.9978,0.9978,4.4785,0,0,4.7,-38.1);

	this.instance_1 = new lib.camel_leg_f_l_bcopy("synched",0);
	this.instance_1.setTransform(-13.95,65.7,0.9991,0.9991,7.1205,0,0,3.9,-38.8);

	this.instance_2 = new lib.camel_leg_b_l_ucopy("synched",0);
	this.instance_2.setTransform(53.6,-21.25,0.9985,0.9985,-11.9453,0,0,1.9,-28.2);

	this.instance_3 = new lib.camel_leg_f_l_ucopy("synched",0);
	this.instance_3.setTransform(0.6,3.75,0.9992,0.9992,6.6753,0,0,-0.8,-25.1);

	this.instance_4 = new lib.camel_headcopy("synched",0);
	this.instance_4.setTransform(-63.7,-67.4,0.999,0.999,-11.7605,0,0,12.6,11.5);

	this.instance_5 = new lib.camel_neckcopy("synched",0);
	this.instance_5.setTransform(-57.75,-33.7,0.999,0.999,19.9889,0,0,9.7,12.8);

	this.instance_6 = new lib.camel_bodycopy("synched",0);
	this.instance_6.setTransform(-4.15,-35.75);

	this.instance_7 = new lib.camel_leg_f_r_bcopy("synched",0);
	this.instance_7.setTransform(-12.15,54.2,0.9993,0.9993,-24.9747,0,0,3.6,-38.1);

	this.instance_8 = new lib.camel_leg_f_r_ucopy("synched",0);
	this.instance_8.setTransform(-35.3,-9.45,0.9995,0.9995,-24.7536,0,0,-1,-28.1);

	this.instance_9 = new lib.camel_tailcopy("synched",0);
	this.instance_9.setTransform(55.85,-37.25,0.9993,0.9993,-1.9365,0,0,-8.4,-36.1);

	this.instance_10 = new lib.camel_leg_b_r_bcopy("synched",0);
	this.instance_10.setTransform(68.4,28.05,0.9981,0.9981,-14.7197,0,0,4.5,-37.6);

	this.instance_11 = new lib.camel_leg_b_r_ucopy("synched",0);
	this.instance_11.setTransform(32.4,-29.5,0.9976,0.9976,-38.5177,0,0,0.4,-29.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11,p:{scaleX:0.9976,scaleY:0.9976,rotation:-38.5177,x:32.4,y:-29.5,regX:0.4}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-14.7197,x:68.4,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9993,scaleY:0.9993,rotation:-1.9365,x:55.85,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7536,x:-35.3,y:-9.45}},{t:this.instance_7,p:{regX:3.6,regY:-38.1,scaleX:0.9993,scaleY:0.9993,rotation:-24.9747,x:-12.15,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.999,scaleY:0.999,rotation:19.9889,x:-57.75,y:-33.7}},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-11.7605,x:-63.7,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.6753,x:0.6,y:3.75,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.2,scaleX:0.9985,scaleY:0.9985,rotation:-11.9453,x:53.6,y:-21.25}},{t:this.instance_1,p:{scaleX:0.9991,scaleY:0.9991,rotation:7.1205,x:-13.95,y:65.7,regX:3.9}},{t:this.instance,p:{scaleX:0.9978,scaleY:0.9978,rotation:4.4785,x:58.25,y:46}}]}).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7187,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.6065,x:55.8,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9742,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9884,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.4667,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.6748,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7187,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.2784,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9742,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9895,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.1733,x:-63.8,regX:12.5,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6748,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7187,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.95,x:55.85,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9734,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9901,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.8806,x:-63.85,regX:12.5,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6748,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-4.6229,x:55.85,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9734,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9912,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.5877,x:-63.7,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.674,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.2948,x:55.9,y:-37.15,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9734,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9923,x:-57.7,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.2951,x:-63.65,regX:12.6,y:-67.2,regY:11.6}},{t:this.instance_3,p:{rotation:6.674,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-5.9666,x:55.75,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9734,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9923,x:-57.7,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.0025,x:-63.7,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.674,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-6.6383,x:55.8,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9734,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9931,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.7101,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.674,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-7.3098,x:55.7,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9734,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9939,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.4178,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.674,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.9826,x:55.75,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9734,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9948,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.1255,x:-63.8,regX:12.5,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6731,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.6538,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9734,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9959,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.8332,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6731,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-9.327,x:55.7,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9734,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9967,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.5404,x:-63.65,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.6731,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7172,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-9.9989,x:55.7,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7515,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9734,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9967,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.2478,x:-63.6,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.6731,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1183,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7172,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-10.6704,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7515,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9734,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9975,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.9554,x:-63.65,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.6722,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1183,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4761,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.4,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7172,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-11.3417,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7519,x:-35.2,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9734,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-21.6633,x:-63.6,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.6722,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1183,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4761,x:58.05,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5099,x:32.3,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.6909,x:68.4,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-10.7016,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7433,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9496,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.9862,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6855,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9488,x:53.7,y:-21.35}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1395,x:-14,y:65.55,regX:3.8}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4822,x:58.15,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5012,x:32.3,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.6645,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-10.0584,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7359,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9284,x:-12.4,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.3085,x:-63.6,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6986,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9543,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1615,x:-13.9,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4902,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4923,x:32.3,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.6384,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-9.4166,x:55.65,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.728,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-24.9057,x:-12.4,y:54.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.6323,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.7118,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9598,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1836,x:-13.9,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4972,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4824,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.612,x:68.35,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.7759,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7214,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8838,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.9553,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.7251,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9668,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2047,x:-13.95,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5042,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4743,x:32.4,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.5867,x:68.3,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.1337,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7136,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8607,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.2786,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.7384,x:0.7,y:3.65,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9721,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2268,x:-13.9,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5113,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4663,x:32.35,y:-29.4,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.5602,x:68.3,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.4916,x:55.75,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7049,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8384,x:-12.5,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.6013,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.7524,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9783,x:53.75,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2489,x:-13.95,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5191,x:58.2,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4575,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.5332,x:68.3,y:28.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.8497,x:55.7,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6971,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8165,x:-12.4,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.925,x:-63.65,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.7657,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9836,x:53.6,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2718,x:-14,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5262,x:58.2,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4494,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.5071,x:68.3,y:28.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.2076,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6889,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.7941,x:-12.4,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.2482,x:-63.6,regX:12.6,y:-67.25,regY:11.6}},{t:this.instance_3,p:{rotation:6.7788,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9893,x:53.6,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2929,x:-14.15,y:65.6,regX:3.8}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5333,x:58.2,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4407,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.4809,x:68.25,y:28.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.5673,x:55.75,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.6818,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-24.771,x:-12.3,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.5718,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.792,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9945,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.315,x:-14,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5402,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4325,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.4546,x:68.35,y:28.1,regX:4.6}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-4.9241,x:55.75,y:-37.3,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6748,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-24.7487,x:-12.35,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.8945,x:-63.7,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.8062,x:0.6,y:3.65,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0008,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.337,x:-14,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5474,x:58.15,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4226,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.4285,x:68.25,y:28.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.2834,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.6674,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-24.7264,x:-12.25,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.2177,x:-63.7,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.8194,x:0.65,y:3.65,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0072,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.3592,x:-14.15,y:65.5,regX:3.8}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5544,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4151,x:32.35,y:-29.45,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.4021,x:68.2,y:28.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.6413,x:55.75,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.6591,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.7037,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.5402,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.8325,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0134,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.3812,x:-14.05,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5613,x:58.25,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4058,x:32.35,y:-29.45,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.3762,x:68.25,y:28.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.9998,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6517,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.6818,x:-12.4,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.864,x:-63.8,regX:12.5,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.8458,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0187,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.4024,x:-14.1,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5685,x:58.3,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.397,x:32.4,y:-29.5,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.3496,x:68.2,y:28.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-2.3586,x:55.75,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.6443,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.6587,x:-12.35,y:54.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.1872,x:-63.7,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.8599,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0249,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.4235,x:-14.05,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5754,x:58.3,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.3888,x:32.35,y:-29.45,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.3226,x:68.2,y:28.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-1.7169,x:55.9,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6372,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.6372,x:-12.25,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:20.0518,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.4574,x:-63.6,regX:12.6,y:-67.5,regY:11.5}},{t:this.instance_3,p:{rotation:6.8732,x:0.65,y:3.65,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0293,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.4457,x:-14.2,y:65.55,regX:3.8}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5824,x:58.25,y:45.95}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-112.5,-108.8,206.5,257.4);


(lib.camel_01_button = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_5
	this.instance = new lib.camel_leg_b_l_b("synched",0);
	this.instance.setTransform(-25.9,-7.6,0.9978,0.9978,4.4785,0,0,4.7,-38.1);

	this.instance_1 = new lib.camel_leg_f_l_b("synched",0);
	this.instance_1.setTransform(-98.1,12.1,0.9991,0.9991,7.1205,0,0,3.9,-38.8);

	this.instance_2 = new lib.camel_leg_b_l_u("synched",0);
	this.instance_2.setTransform(-30.4,-74.75,0.9985,0.9985,-11.9453,0,0,2,-28.1);

	this.instance_3 = new lib.camel_leg_f_l_u("synched",0);
	this.instance_3.setTransform(-83.55,-49.85,0.9992,0.9992,6.6753,0,0,-0.8,-25.1);

	this.instance_4 = new lib.camel_head("synched",0);
	this.instance_4.setTransform(-147.85,-121,0.999,0.999,-11.7605,0,0,12.6,11.5);

	this.instance_5 = new lib.camel_neck("synched",0);
	this.instance_5.setTransform(-141.9,-87.3,0.999,0.999,19.9889,0,0,9.7,12.8);

	this.instance_6 = new lib.camel_body("synched",0);
	this.instance_6.setTransform(-88.3,-89.35);

	this.instance_7 = new lib.camel_leg_f_r_b("synched",0);
	this.instance_7.setTransform(-96.45,0.5,0.9993,0.9993,-24.9747,0,0,3.5,-38.2);

	this.instance_8 = new lib.camel_leg_f_r_u("synched",0);
	this.instance_8.setTransform(-119.45,-63.05,0.9995,0.9995,-24.7536,0,0,-1,-28.1);

	this.instance_9 = new lib.camel_tail("synched",0);
	this.instance_9.setTransform(-28.3,-90.75,0.9993,0.9993,-1.9365,0,0,-8.4,-36);

	this.instance_10 = new lib.camel_leg_b_r_b("synched",0);
	this.instance_10.setTransform(-15.75,-25.55,0.9981,0.9981,-14.7197,0,0,4.5,-37.6);

	this.instance_11 = new lib.camel_leg_b_r_u("synched",0);
	this.instance_11.setTransform(-51.75,-83.1,0.9976,0.9976,-38.5177,0,0,0.4,-29.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_12 = new lib.camel_01_interact();
	this.instance_12.setTransform(-91.65,-33.8,1,1,0,0,0,-7.5,19.8);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-193,-162.4,202.9,257.4);


(lib.camel_01 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_5
	this.instance = new lib.camel_leg_b_l_b("synched",0);
	this.instance.setTransform(58.25,46,0.9978,0.9978,4.4785,0,0,4.7,-38.1);

	this.instance_1 = new lib.camel_leg_f_l_b("synched",0);
	this.instance_1.setTransform(-13.95,65.7,0.9991,0.9991,7.1205,0,0,3.9,-38.8);

	this.instance_2 = new lib.camel_leg_b_l_u("synched",0);
	this.instance_2.setTransform(53.6,-21.25,0.9985,0.9985,-11.9453,0,0,1.9,-28.2);

	this.instance_3 = new lib.camel_leg_f_l_u("synched",0);
	this.instance_3.setTransform(0.6,3.75,0.9992,0.9992,6.6753,0,0,-0.8,-25.1);

	this.instance_4 = new lib.camel_head("synched",0);
	this.instance_4.setTransform(-63.7,-67.4,0.999,0.999,-11.7605,0,0,12.6,11.5);

	this.instance_5 = new lib.camel_neck("synched",0);
	this.instance_5.setTransform(-57.75,-33.7,0.999,0.999,19.9889,0,0,9.7,12.8);

	this.instance_6 = new lib.camel_body("synched",0);
	this.instance_6.setTransform(-4.15,-35.75);

	this.instance_7 = new lib.camel_leg_f_r_b("synched",0);
	this.instance_7.setTransform(-12.15,54.2,0.9993,0.9993,-24.9747,0,0,3.6,-38.1);

	this.instance_8 = new lib.camel_leg_f_r_u("synched",0);
	this.instance_8.setTransform(-35.3,-9.45,0.9995,0.9995,-24.7536,0,0,-1,-28.1);

	this.instance_9 = new lib.camel_tail("synched",0);
	this.instance_9.setTransform(55.85,-37.25,0.9993,0.9993,-1.9365,0,0,-8.4,-36.1);

	this.instance_10 = new lib.camel_leg_b_r_b("synched",0);
	this.instance_10.setTransform(68.4,28.05,0.9981,0.9981,-14.7197,0,0,4.5,-37.6);

	this.instance_11 = new lib.camel_leg_b_r_u("synched",0);
	this.instance_11.setTransform(32.4,-29.5,0.9976,0.9976,-38.5177,0,0,0.4,-29.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11,p:{scaleX:0.9976,scaleY:0.9976,rotation:-38.5177,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-14.7197,x:68.4,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9993,scaleY:0.9993,rotation:-1.9365,x:55.85,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7536,x:-35.3,y:-9.45,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.1,scaleX:0.9993,scaleY:0.9993,rotation:-24.9747,x:-12.15,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.999,scaleY:0.999,rotation:19.9889,x:-57.75,y:-33.7,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-11.7605,x:-63.7,y:-67.4,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:6.6753,x:0.6,y:3.75,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.2,scaleX:0.9985,scaleY:0.9985,rotation:-11.9453,x:53.6,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.9991,scaleY:0.9991,rotation:7.1205,x:-13.95,y:65.7,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:4.4785,x:58.25,y:46,scaleX:0.9978,scaleY:0.9978}}]}).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.89,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.0915,x:67.75,y:28.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.4164,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-23.2952,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-26.3706,x:-13.8,y:54.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.4693,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.0932,x:-64,y:-67.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:6.0145,x:0.7,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.8634,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:5.5774,x:-13.1,y:65.65,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:3.1315,x:59.4,y:45.85,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.262,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.4636,x:67.1,y:28.85,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8973,x:55.8,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-21.8363,x:-35.35,y:-9.45,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-27.77,x:-15.4,y:55.25}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.9517,x:-57.75,y:-33.5,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.4274,x:-64.3,y:-67.25,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:5.3542,x:0.7,y:3.8,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-13.7833,x:53.7,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:4.0351,x:-12.35,y:65.9,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:1.7826,x:60.5,y:45.75,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.6343,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.8347,x:66.5,y:29.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.3793,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-20.3772,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-29.1681,x:-17.05,y:55.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.4322,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.7619,x:-64.55,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:4.6926,x:0.7,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-14.7021,x:53.75,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:2.4932,x:-11.7,y:66.05,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:0.4338,x:61.45,y:45.7,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.0059,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.2076,x:65.85,y:29.55,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.8588,x:56,y:-37.1,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-18.919,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-30.567,x:-18.75,y:56.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.9135,x:-57.85,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.0958,x:-64.9,y:-67.1,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:4.0319,x:0.7,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-15.6212,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:0.9496,x:-10.95,y:66.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-0.9096,x:62.5,y:45.55,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.378,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.58,x:65.15,y:29.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.3404,x:55.95,y:-37,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-17.4606,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-31.9654,x:-20.4,y:56.45}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.3953,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.4313,x:-65.2,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:3.3708,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-16.5406,x:53.5,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-0.5881,x:-10.2,y:66.3,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-2.2596,x:63.6,y:45.3,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.7507,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-10.951,x:64.5,y:30.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.8205,x:55.9,y:-37.05,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-16.0016,x:-35.25,y:-9.45,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-33.3642,x:-22.1,y:56.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.876,x:-57.8,y:-33.45,regY:12.9,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.7662,x:-65.5,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:2.7101,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-17.4591,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-2.1306,x:-9.5,y:66.4,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-3.6065,x:64.65,y:45.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.1228,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-10.3236,x:63.9,y:30.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.3027,x:55.9,y:-37.05,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-14.5435,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-34.762,x:-23.8,y:57.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.3584,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.0997,x:-65.8,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:2.0488,x:0.65,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-18.3782,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-3.6737,x:-8.75,y:66.5,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-4.9553,x:65.65,y:45,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-33.4949,y:-29.4,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-9.6955,x:63.4,y:30.95,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-5.7835,x:55.9,y:-37,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-13.0842,x:-35.15,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-36.161,x:-25.55,y:57.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.839,x:-57.7,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-14.4347,x:-66.1,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:1.3879,x:0.65,y:3.8,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-19.2973,x:53.75,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-5.2159,x:-8.05,y:66.65,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-6.3033,x:66.75,y:44.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.8679,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-9.066,x:62.6,y:31.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.2648,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-11.6252,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-37.559,x:-27.25,y:57.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.3202,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.7686,x:-66.4,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:0.7272,x:0.65,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-20.2166,x:53.6,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-6.7577,x:-7.35,y:66.75,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-7.6524,x:67.8,y:44.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.2392,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-8.4393,x:61.95,y:31.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-6.7455,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-10.167,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-38.9577,x:-28.95,y:57.75}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.8026,x:-57.8,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.103,x:-66.65,y:-66.55,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:0.0656,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-21.1358,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-8.3016,x:-6.65,y:66.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.0012,x:68.85,y:44.3,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.611,y:-29.4,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.812,x:61.25,y:31.9,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.2261,x:55.75,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-8.7083,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-40.3565,x:-30.65,y:57.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.2829,x:-57.8,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.4376,x:-66.95,y:-66.6,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-0.5906,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-22.0546,x:53.65,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-9.8439,x:-5.9,y:66.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.3496,x:69.85,y:44.05,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.9837,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1847,x:60.55,y:32.25,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.708,x:55.9,y:-37,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-7.2491,x:-35.35,y:-9.4,regX:-1.1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-41.7544,x:-32.4,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.7649,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.7718,x:-67.4,y:-66.45,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-1.2514,x:0.7,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-22.9736,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-11.386,x:-5.2,y:66.95,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.6985,x:70.95,y:43.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.3565,y:-29.45,x:32.4,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5554,x:59.85,y:32.55,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.1885,x:55.85,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-5.791,x:-35.35,y:-9.55,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-43.1529,x:-34.1,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.2463,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.107,x:-67.5,y:-66.35,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-1.9131,x:0.7,y:3.8,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-23.893,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-12.9293,x:-4.5,y:67,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.0462,x:71.95,y:43.45,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-29.7286,y:-29.35,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.9281,x:59.25,y:32.85,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.6689,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-4.3324,x:-35.15,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-44.5508,x:-35.85,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.7274,x:-57.8,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.4418,x:-67.85,y:-66.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-2.5734,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-24.8139,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.4716,x:-3.9,y:67.05,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-14.3948,x:73,y:43.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-28.9069,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.6762,x:58.35,y:33.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.4672,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-4.0508,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-42.756,x:-36.2,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.9633,x:-57.65,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.0989,x:-67.7,y:-66.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-3.0562,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-25.3561,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.4419,x:-3.3,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-14.2337,x:73.6,y:43,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-28.0849,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.4236,x:57.35,y:33.6,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.2672,x:55.85,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.7685,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-40.9615,x:-36.45,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.199,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.7582,x:-67.7,y:-66.35,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-3.5374,x:0.75,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-25.8973,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.413,x:-2.8,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-14.0728,x:74.15,y:42.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-27.2624,y:-29.35,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.172,x:56.5,y:33.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.0648,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.4871,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-39.1668,x:-36.9,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.4353,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.4176,x:-67.4,y:-66.45,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-4.0196,x:0.75,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-26.4401,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.3831,x:-2.25,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.913,x:74.8,y:42.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-26.4408,y:-29.45,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.9204,x:55.6,y:34.25,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.8616,x:55.85,y:-36.9,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.205,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-37.3718,x:-37.1,y:58.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.6715,x:-57.85,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.0758,x:-67.3,y:-66.4,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-4.5014,x:0.8,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-26.9821,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.3542,x:-1.65,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.7515,x:75.4,y:42.45,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-25.6188,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.6681,x:54.85,y:34.6,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.6603,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.9229,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-35.5774,x:-37.55,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.9082,x:-57.8,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.7342,x:-67.2,y:-66.5,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-4.9834,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-27.5257,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.3253,x:-1.1,y:67.2,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.5916,x:76,y:42.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-24.7971,y:-29.4,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.4168,x:53.8,y:34.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.4589,x:55.85,y:-36.85,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-2.64,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-33.7833,x:-37.75,y:58.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.1439,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.3924,x:-66.9,y:-66.45,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-5.465,x:0.7,y:3.75,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-28.0686,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.2954,x:-0.5,y:67.2,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.4305,x:76.6,y:42,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-23.9753,y:-29.3,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.1638,x:53,y:35.15,regX:4.6}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-7.2561,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.3572,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-31.9879,x:-38.15,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.3801,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.0511,x:-66.85,y:-66.6,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-5.9477,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-28.6105,x:53.6,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.2665,x:0,y:67.2,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.2703,x:77.2,y:41.75,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-23.1522,y:-29.45,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.9127,x:52.05,y:35.5,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.0551,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.0753,x:-35.2,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-30.1936,x:-38.5,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.6164,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.7104,x:-66.7,y:-66.6,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-6.4301,x:0.75,y:3.75,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-29.1533,x:53.65,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.2377,x:0.55,y:67.25,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.1083,x:77.85,y:41.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-22.3312,y:-29.4,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.6598,x:51,y:35.75,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.8532,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.7935,x:-35.25,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-28.3986,x:-38.8,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.8533,x:-57.85,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.3691,x:-66.6,y:-66.6,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-6.9102,x:0.75,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-29.6959,x:53.6,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.208,x:1.05,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.9484,x:78.45,y:41.35,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-21.5093,y:-29.4,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.408,x:50.05,y:36.05,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-6.6514,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.5117,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-26.6034,x:-39.15,y:57.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.0888,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.0275,x:-66.45,y:-66.65,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-7.3934,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-30.2373,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.1791,x:1.55,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.7882,x:79,y:41.05,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-20.686,y:-29.35,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.1569,x:49.25,y:36.3,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.4489,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.2291,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8106,x:-39.55,y:57.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.3257,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.6865,x:-66.3,y:-66.7,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-7.8754,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-30.7798,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.15,x:2.1,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-12.6273,x:79.7,y:40.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-19.8649,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.9043,x:48.2,y:36.45,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.2473,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.9474,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-23.0149,x:-39.8,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.5616,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.3436,x:-66.15,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-8.3571,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-31.3234,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.1201,x:2.65,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.4657,x:80.2,y:40.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-19.0444,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.6518,x:47.25,y:36.75,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.0466,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.6648,x:-35.35,y:-9.6,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-21.2212,x:-40.2,y:57.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.7972,x:-57.8,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.0044,x:-66,y:-66.8,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-8.8387,x:0.7,y:3.55,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-31.8659,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.0912,x:3.15,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.3058,x:80.8,y:40.3,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-18.2218,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.4001,x:46.4,y:36.9,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-5.8451,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.3823,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-19.4261,x:-40.5,y:57.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.0338,x:-57.7,y:-33.5,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.663,x:-65.85,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-9.3216,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-32.4081,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.0617,x:3.75,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.1455,x:81.4,y:40.05,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-17.3989,y:-29.3,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.1485,x:45.35,y:37.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.642,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.0997,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-17.6317,x:-40.65,y:57.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.27,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.3225,x:-65.75,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-9.8025,x:0.7,y:3.75,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-32.95,x:53.7,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.0331,x:4.25,y:67.05,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.9832,x:81.9,y:39.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-16.5779,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.8969,x:44.4,y:37.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.4408,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.1776,x:-35.15,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-15.8365,x:-41.15,y:57.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.5073,x:-57.75,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-10.9811,x:-65.65,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-10.2843,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-33.4926,x:53.55,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.0042,x:4.75,y:67,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.8239,x:82.55,y:39.55,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-15.7555,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.6445,x:43.4,y:37.45,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.2385,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.4592,x:-35.35,y:-9.55,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-14.0424,x:-41.5,y:57.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.7422,x:-57.7,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-10.6379,x:-65.6,y:-66.9,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-10.7666,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-34.0357,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.9753,x:5.35,y:67,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.6627,x:83.1,y:39.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-14.9357,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.3921,x:42.5,y:37.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.0374,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.7427,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-12.247,x:-41.8,y:57.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.9787,x:-57.75,y:-33.5,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-10.2979,x:-65.3,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-11.2488,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-34.578,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.9462,x:5.85,y:66.95,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.5019,x:83.65,y:38.95,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-14.1128,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.1406,x:41.5,y:37.8,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.8346,x:55.7,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.0235,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-10.4524,x:-42,y:57.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.2151,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-9.9566,x:-65.15,y:-67,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-11.7311,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-35.1209,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.9167,x:6.45,y:66.9,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.3419,x:84.25,y:38.7,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-13.291,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.8892,x:40.55,y:37.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.6336,x:55.8,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.3061,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-8.6576,x:-42.5,y:57.55}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.4515,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-9.6156,x:-65.2,y:-67,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-12.2131,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-35.664,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.8877,x:7,y:66.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.1804,x:84.85,y:38.4,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-12.4671,y:-29.4,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.6369,x:39.65,y:38.05,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.4325,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.5896,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-6.8638,x:-42.85,y:57.55}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.6876,x:-57.7,y:-33.4,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-9.274,x:-65.05,y:-66.9,regY:11.6,regX:12.5}},{t:this.instance_3,p:{rotation:-12.6953,x:0.7,y:3.75,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-36.206,x:53.65,y:-21.5}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.8573,x:7.5,y:66.75,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.0205,x:85.4,y:38.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-11.6463,y:-29.3,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.3854,x:38.65,y:38.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.2298,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.8697,x:-35.25,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-5.0674,x:-42.95,y:57.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.9235,x:-57.85,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-8.9318,x:-64.75,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-13.1765,x:0.75,y:3.75,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-36.7487,x:53.55,y:-21.5}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.8291,x:8.05,y:66.7,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.8597,x:85.95,y:37.75,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-10.8244,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.1332,x:37.65,y:38.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.0272,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.1524,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-3.2733,x:-43.45,y:57.45}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.1601,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-8.5909,x:-64.65,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-13.6593,x:0.7,y:3.7,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-37.2913,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.8002,x:8.55,y:66.6,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.699,x:86.5,y:37.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-10.0018,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.1139,x:36.65,y:38.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.8255,x:55.8,y:-36.9,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.4343,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-1.4788,x:-43.8,y:57.4}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.3954,x:-57.7,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-8.2503,x:-64.5,y:-67.15,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-14.1417,x:0.65,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-37.8335,x:53.6,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.7713,x:9.05,y:66.55,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.5385,x:87.05,y:37.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-9.1814,y:-29.25,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.367,x:35.75,y:38.35,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.6239,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.7179,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9993,scaleY:0.9993,rotation:0.3106,x:-44.1,y:57.35}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.6317,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-7.9082,x:-64.4,y:-67.05,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-14.6235,x:0.75,y:3.7,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-38.3754,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.7414,x:9.6,y:66.45,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.3773,x:87.6,y:36.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-8.3584,y:-29.25,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.6185,x:34.7,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.4222,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.9991,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9993,scaleY:0.9993,rotation:2.1065,x:-44.4,y:57.35}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.8684,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-7.5672,x:-64.2,y:-67.15,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-15.1051,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-38.9194,x:53.55,y:-21.55}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.7119,x:10.1,y:66.5,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.2169,x:88.15,y:36.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.538,y:-29.3,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.8708,x:33.75,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.2206,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:3.2812,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:3.9,x:-44.7,y:57.25}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.1053,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-7.2265,x:-64.05,y:-67.25,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-15.587,x:0.75,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-39.4619,x:53.5,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.6831,x:10.65,y:66.35,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.0567,x:88.7,y:36.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-6.7157,y:-29.35,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:1.1222,x:32.9,y:38.45,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.0191,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:3.5642,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:5.6957,x:-45,y:57.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.3409,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-6.8843,x:-63.9,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-16.0687,x:0.7,y:3.55,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-40.0037,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.6533,x:11.15,y:66.3,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.8948,x:89.25,y:35.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-5.8922,y:-29.25,x:32.3,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:1.3737,x:31.85,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8167,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:3.8465,x:-35.2,y:-9.45,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:7.49,x:-45.5,y:57.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.5762,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-6.5425,x:-63.85,y:-67.35,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-16.5502,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-40.5454,x:53.55,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.6245,x:11.65,y:66.25,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.7347,x:89.75,y:35.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-5.0706,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:1.6261,x:30.85,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.6144,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:4.1279,x:-35.2,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:9.2855,x:-45.75,y:57.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.8126,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-6.2016,x:-63.7,y:-67.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-17.0327,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-41.0899,x:53.6,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.5948,x:12.2,y:66.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.5745,x:90.35,y:35.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-6.7457,y:-29.35,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.7367,x:32.95,y:38.4,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.7239,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:3.552,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:8.1259,x:-45.1,y:57.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.4865,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-7.2591,x:-63.85,y:-67.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-16.0471,x:0.7,y:3.55,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-39.9918,x:53.65,y:-21.5}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.9093,x:11.15,y:66.3,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-9.4701,x:89.35,y:35.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.4213,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.148,x:34.8,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8325,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.9745,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:6.966,x:-44.45,y:57.3}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.1607,x:-57.7,y:-33.5,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-8.3156,x:-64.05,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-15.0613,x:0.8,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-38.8963,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-16.2224,x:9.95,y:66.5,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-9.368,x:88.15,y:36.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-10.0962,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.0372,x:36.8,y:38.25,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.942,x:55.75,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.3983,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:5.8048,x:-43.7,y:57.45}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.833,x:-57.8,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-9.3733,x:-64.45,y:-67.15,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-14.0759,x:0.65,y:3.55,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-37.7978,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-17.5366,x:8.9,y:66.6,regX:3.8}},{t:this.instance,p:{regX:4.8,rotation:-9.2631,x:87.15,y:37.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-11.7716,y:-29.25,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.9267,x:38.8,y:38.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.0497,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.8215,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:4.6459,x:-43.05,y:57.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.5069,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-10.4288,x:-64.45,y:-67.05,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-13.0893,x:0.65,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-36.7018,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-18.8495,x:7.9,y:66.7,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-9.1592,x:86,y:37.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-13.4476,y:-29.4,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.8166,x:40.75,y:37.85,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.1584,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.2457,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:3.4845,x:-42.45,y:57.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.1803,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.4859,x:-64.6,y:-67.1,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-12.104,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-35.6057,x:53.5,y:-21.35}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-20.1632,x:6.75,y:66.7,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.0562,x:84.75,y:38.4,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-15.1217,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.7055,x:42.75,y:37.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.267,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.6683,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:2.3245,x:-41.7,y:57.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.854,x:-57.75,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.5419,x:-64.8,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-11.1179,x:0.65,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-34.5081,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-21.4775,x:5.7,y:66.95,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-8.9515,x:83.75,y:39,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-16.7973,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.5952,x:44.75,y:37.3,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.3775,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.0918,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:1.1646,x:-40.95,y:57.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.5265,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.5996,x:-65.05,y:-67,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-10.1321,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-33.4098,x:53.6,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-22.791,x:4.6,y:67.05,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-8.8485,x:82.45,y:39.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-18.4718,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.4844,x:46.55,y:36.85,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.4852,x:55.7,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.4802,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:0.0035,x:-40.35,y:57.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.201,x:-57.75,y:-33.65,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.6563,x:-65.25,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-9.146,x:0.75,y:3.75,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-32.3134,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-24.1045,x:3.4,y:67.1,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-8.744,x:81.25,y:40.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-20.1475,y:-29.35,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-6.3739,x:48.5,y:36.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.5931,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.0576,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-1.1524,x:-39.65,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.8743,x:-57.8,y:-33.45,regY:12.9,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.713,x:-65.5,y:-66.9,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-8.1608,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-31.217,x:53.6,y:-21.55}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-25.4182,x:2.3,y:67.15,regX:3.8}},{t:this.instance,p:{regX:4.8,rotation:-8.642,x:80.2,y:40.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-21.8213,y:-29.45,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.2631,x:50.4,y:35.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.7018,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.6351,x:-35.2,y:-9.45,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-2.3114,x:-39.05,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.5481,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.7694,x:-65.65,y:-66.9,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-7.1747,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-30.1196,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-26.733,x:1.3,y:67.25,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-8.5366,x:78.9,y:41.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-23.4965,y:-29.25,x:32.3,regY:-29.2,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-8.1515,x:52.45,y:35.35,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.8106,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.211,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-3.4723,x:-38.35,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.2218,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.8263,x:-65.8,y:-66.8,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-6.1888,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-29.0228,x:53.7,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-28.0454,x:0.25,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-8.433,x:77.85,y:41.55,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-25.1723,y:-29.3,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-9.0437,x:54.2,y:34.75,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9993,scaleY:0.9993,rotation:-3.9192,x:55.9,y:-37.05,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.788,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-4.6318,x:-37.65,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.8944,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.8833,x:-66.05,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-5.2039,x:0.8,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-27.9276,x:53.6,y:-21.55}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-29.3603,x:-0.95,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-8.3301,x:76.5,y:42,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-26.8469,y:-29.35,x:32.3,regY:-29.2,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-9.932,x:56.05,y:34.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.0281,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.3645,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-5.7924,x:-36.85,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.5682,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.9399,x:-66.2,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-4.2178,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-26.8298,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-30.6733,x:-1.95,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-8.2256,x:75.25,y:42.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-28.5237,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-10.8215,x:57.9,y:33.35,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9993,scaleY:0.9993,rotation:-4.1377,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.9412,x:-35.35,y:-9.45,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-6.953,x:-36.3,y:58.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.2415,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.9959,x:-66.4,y:-66.7,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-3.2322,x:0.75,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-25.7321,x:53.55,y:-21.3}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-31.9871,x:-3.15,y:67,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-8.122,x:74.15,y:42.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.197,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.7114,x:59.75,y:32.55,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.2457,x:55.85,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-4.5166,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-8.1127,x:-35.65,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.9149,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-22.0525,x:-66.7,y:-66.6,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-2.245,x:0.7,y:3.75,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-24.6368,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-33.3005,x:-4.35,y:67.1,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-8.0186,x:72.8,y:43.25,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.4712,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.798,x:60.15,y:32.4,regX:4.6}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9993,scaleY:0.9993,rotation:-4.1614,x:55.85,y:-37.05,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-5.1882,x:-35.2,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-8.6627,x:-34.9,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.0845,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-21.7018,x:-66.5,y:-66.7,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-1.9411,x:0.75,y:3.75,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-24.2159,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-31.9415,x:-4.5,y:67.05,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-7.5983,x:72.3,y:43.4,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.7443,y:-29.45,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.8843,x:60.3,y:32.35,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.0781,x:55.85,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-5.8587,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-9.2146,x:-34.05,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.254,x:-57.75,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-21.3506,x:-66.4,y:-66.6,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-1.6374,x:0.75,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-23.7953,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-30.5839,x:-4.8,y:66.95,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-7.1778,x:71.85,y:43.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.0179,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.9719,x:60.6,y:32.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.993,x:55.9,y:-36.9,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-6.5292,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-9.7645,x:-33.25,y:58.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.4236,x:-57.7,y:-33.5,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-21.0003,x:-66.3,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-1.3327,x:0.7,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-23.3745,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-29.225,x:-5.25,y:66.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-6.7575,x:71.4,y:43.65,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.2899,y:-29.45,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.0597,x:60.9,y:32,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-3.9079,x:55.9,y:-37.1,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-7.1998,x:-35.2,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-10.3164,x:-32.45,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.5937,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.6485,x:-66.1,y:-66.65,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-1.0299,x:0.7,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-22.9555,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-27.8681,x:-5.45,y:66.9,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-6.3378,x:70.9,y:43.75,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.5626,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.1466,x:61.2,y:31.9,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.8237,x:55.75,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-7.8712,x:-35.35,y:-9.45,regX:-1.1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-10.8657,x:-31.7,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.7617,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.2963,x:-66.1,y:-66.8,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-0.7254,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-22.5336,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-26.5091,x:-5.85,y:66.9,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-5.9166,x:70.45,y:43.9,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.8369,y:-29.5,x:32.4,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.2334,x:61.5,y:31.8,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.7404,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-8.5411,x:-35.25,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-11.4177,x:-30.8,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.9316,x:-57.75,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.9454,x:-66,y:-66.8,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-0.4209,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-22.1143,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-25.1493,x:-6.15,y:66.8,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-5.4973,x:69.95,y:44,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.1081,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.3205,x:61.8,y:31.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.6554,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-9.2122,x:-35.35,y:-9.45,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-11.9678,x:-30.15,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.1022,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.5944,x:-65.9,y:-66.9,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-0.1164,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-21.6943,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-23.7914,x:-6.6,y:66.85,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-5.0776,x:69.45,y:44.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.3824,y:-29.45,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.4066,x:62.2,y:31.45,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.5713,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-9.8828,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-12.5177,x:-29.3,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.2711,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.2418,x:-65.8,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:0.1829,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-21.2747,x:53.55,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-22.4336,x:-6.85,y:66.75,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-4.6581,x:68.95,y:44.3,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.655,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.4942,x:62.5,y:31.3,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.487,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-10.5537,x:-35.3,y:-9.5,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-13.0694,x:-28.55,y:57.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.4398,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.8916,x:-65.85,y:-66.9,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:0.4874,x:0.65,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-20.8531,x:53.55,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-21.0746,x:-7.15,y:66.75,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-4.237,x:68.65,y:44.45,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.9282,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.5814,x:62.8,y:31.2,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.4038,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-11.2238,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-13.6207,x:-27.75,y:57.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.6093,x:-57.65,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.5385,x:-65.6,y:-66.9,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:0.791,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-20.4341,x:53.65,y:-21.35}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-19.7172,x:-7.7,y:66.55,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-3.8163,x:68.05,y:44.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-33.2017,y:-29.35,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.6691,x:62.9,y:31.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.3187,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-11.8944,x:-35.4,y:-9.5,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-14.1716,x:-26.95,y:57.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.7793,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.1878,x:-65.5,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:1.0947,x:0.75,y:3.8,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-20.0138,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-18.3577,x:-7.85,y:66.6,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-3.3975,x:67.6,y:44.55,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-33.474,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.7554,x:63.2,y:30.9,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.2338,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-12.5656,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-14.7219,x:-26.15,y:57.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.9485,x:-57.8,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.8357,x:-65.45,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:1.3993,x:0.65,y:3.8,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-19.5925,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-16.9998,x:-8.1,y:66.6,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-2.9762,x:67.2,y:44.7,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-33.7472,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.8427,x:63.5,y:30.75,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.1496,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-13.2353,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-15.2733,x:-25.4,y:57.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.1188,x:-57.8,y:-33.7,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.4845,x:-65.35,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:1.7039,x:0.65,y:3.8,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-19.1726,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-15.6415,x:-8.45,y:66.45,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-2.556,x:66.55,y:44.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.0211,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.9297,x:63.8,y:30.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-3.0654,x:55.8,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-13.9075,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-15.8229,x:-24.6,y:57.3}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.2879,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.134,x:-65.2,y:-66.95,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:2.0086,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-18.7526,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.2829,x:-8.75,y:66.5,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-2.1359,x:66.25,y:44.9,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.2937,y:-29.35,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.0172,x:64.1,y:30.5,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.9823,x:55.8,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-14.576,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-16.3748,x:-23.75,y:57.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.4576,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.7816,x:-65.2,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:2.3116,x:0.65,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-18.333,x:53.65,y:-21.5}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-12.9248,x:-9.1,y:66.45,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-1.7151,x:65.65,y:44.95,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.5649,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.1043,x:64.35,y:30.35,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8973,x:55.8,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-15.2467,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-16.9254,x:-22.95,y:57.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.6259,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.4311,x:-65.05,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:2.6163,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-17.9127,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-11.5663,x:-9.45,y:66.45,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-1.2952,x:65.1,y:45.1,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.8387,y:-29.5,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.1917,x:64.6,y:30.2,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8123,x:55.8,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-15.918,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-17.477,x:-22.15,y:56.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.7959,x:-57.65,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.0796,x:-65,y:-67,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:2.9203,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-17.492,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-10.2083,x:-9.75,y:66.4,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-0.8754,x:64.65,y:45.25,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.1118,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.2781,x:64.9,y:30.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.7282,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-16.5887,x:-35.15,y:-9.35,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-18.0263,x:-21.35,y:56.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.9661,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.7274,x:-65,y:-67.1,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:3.2243,x:0.6,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-17.0721,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-8.8497,x:-10.1,y:66.35,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-0.4548,x:64.15,y:45.25,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.3841,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.3646,x:65.2,y:29.9,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.6432,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-17.2587,x:-35.15,y:-9.35,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-18.5774,x:-20.65,y:56.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.1355,x:-57.7,y:-33.65,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.3766,x:-64.75,y:-67.1,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:3.5286,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-16.6519,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-7.4906,x:-10.45,y:66.25,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-0.0342,x:63.85,y:45.4,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.6594,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.4526,x:65.45,y:29.75,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.5592,x:55.8,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-17.9298,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-19.1283,x:-19.85,y:56.35}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.3049,x:-57.8,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.0251,x:-64.7,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:3.8328,x:0.7,y:3.8,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-16.2321,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-6.1323,x:-10.9,y:66.25,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:0.3812,x:63.2,y:45.45,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.9301,y:-29.45,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.5393,x:65.75,y:29.5,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.4751,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-18.6004,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-19.6788,x:-19.05,y:56.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.4737,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.6746,x:-64.55,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:4.1372,x:0.7,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-15.8112,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-4.7742,x:-11.1,y:66.15,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:0.8009,x:62.85,y:45.45,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.2048,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.6266,x:66,y:29.45,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.391,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-19.2709,x:-35.2,y:-9.35,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-20.2304,x:-18.25,y:56.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.6439,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.3217,x:-64.45,y:-67.15,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:4.4407,x:0.7,y:3.7,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-15.3922,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-3.4159,x:-11.4,y:66,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:1.2207,x:62.25,y:45.55,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.4764,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.7133,x:66.3,y:29.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-2.307,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-19.9425,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-20.7797,x:-17.55,y:55.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.8128,x:-57.75,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.9711,x:-64.5,y:-67.2,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:4.7445,x:0.65,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-14.9726,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-2.057,x:-11.75,y:65.9,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:1.6414,x:61.75,y:45.6,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.7505,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.8008,x:66.6,y:29.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.2229,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-20.611,x:-35.3,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-21.332,x:-16.75,y:55.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.9833,x:-57.85,y:-33.5,regY:12.9,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.6195,x:-64.25,y:-67.25,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:5.0492,x:0.7,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-14.5506,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-0.6992,x:-12.05,y:66,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:2.0605,x:61.25,y:45.6,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.0231,y:-29.45,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.8873,x:66.85,y:28.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-2.1379,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-21.2834,x:-35.35,y:-9.5,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-21.8826,x:-16.05,y:55.4}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.1524,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.2676,x:-64.15,y:-67.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:5.3542,x:0.7,y:3.8,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-14.1314,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:0.6555,x:-12.4,y:65.9,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:2.4806,x:60.8,y:45.7,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.2957,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.9748,x:67.15,y:28.8,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.0539,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-21.9549,x:-35.3,y:-9.45,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-22.4325,x:-15.2,y:55.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.3212,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.9171,x:-64.2,y:-67.25,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:5.6574,x:0.65,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-13.7104,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:2.0132,x:-12.75,y:65.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:2.9025,x:60.25,y:45.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.5697,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.0624,x:67.45,y:28.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-1.969,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-22.6245,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-22.9839,x:-14.45,y:54.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.4909,x:-57.65,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.5655,x:-64.05,y:-67.35,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:5.9618,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-13.2906,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:3.3721,x:-13.05,y:65.75,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:3.322,x:59.8,y:45.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.8419,y:-29.5,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.1484,x:67.7,y:28.5,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-1.8859,x:55.8,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-23.296,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-23.5338,x:-13.75,y:54.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.6601,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.2132,x:-63.9,y:-67.25,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:6.2662,x:0.65,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.87,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:4.7303,x:-13.4,y:65.5,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:3.7416,x:59.45,y:45.8,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.1154,y:-29.4,x:32.3,regY:-29.2,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.2357,x:67.95,y:28.35,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-1.8027,x:55.9,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-23.9654,x:-35.25,y:-9.45,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.0866,x:-13,y:54.4}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.83,x:-57.8,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-11.8619,x:-63.9,y:-67.35,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:6.5691,x:0.65,y:3.75,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.4506,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:6.0883,x:-13.85,y:65.6,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:4.1632,x:58.8,y:45.95,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.3888,y:-29.45,x:32.35,regY:-29.2,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.3226,x:68.2,y:28.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-1.7169,x:55.9,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6372,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.6372,x:-12.25,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:20.0518,x:-57.7,y:-33.65,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.4574,x:-63.6,y:-67.5,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:6.8732,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0293,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:7.4457,x:-14.2,y:65.55,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:4.5824,x:58.25,y:45.95,scaleX:0.9977,scaleY:0.9977}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-115.5,-108.8,224.2,259.6);


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
	this.instance = new lib.ch1_headcopy("synched",0);
	this.instance.setTransform(-0.15,51.35,0.999,0.999,2.3215,0,0,0.9,52.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.2,-71.5,171.10000000000002,152.5);


(lib.ch1_headcopy3_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance_1 = new lib.ch1_headcopy_1("synched",0);
	this.instance_1.setTransform(-0.15,51.35,0.999,0.999,2.3215,0,0,0.9,52.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.2,-71.5,171.10000000000002,152.5);


(lib.CharacterCivilian_09_interact = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-59.7,-12.4,0.9974,0.9974,-92.6463,0,0,33.6,9.5);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(2.55,120.6,0.9969,0.9969,-132.2022,0,0,14.5,-0.4);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(3,120.8,0.9973,0.9973,-102.4158,0,0,4.4,-9.1);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-58.4,59.6,0.9972,0.9972,-140.2196,0,0,44.5,7.5);

	this.instance_4 = new lib.ch1_headcopy3("synched",0);
	this.instance_4.setTransform(1.45,-81.45,0.9979,0.9979,-11.8556,0,0,2.1,50.4);

	this.instance_5 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_5.setTransform(-14.75,-33.45,1,1,0,0,0,-7.3,-36.1);

	this.instance_6 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_6.setTransform(24.9,88.35,0.9945,0.9945,-8.9646,0,0,0.8,4.7);

	this.instance_7 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_7.setTransform(-29.95,90.35,0.9954,0.9954,3.931,0,0,1.4,-42.2);

	this.instance_8 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_8.setTransform(-41.5,185.5,0.9949,0.9949,8.7322,0,0,1.2,-51.4);

	this.instance_9 = new lib.ch1_neckcopy2("synched",0);
	this.instance_9.setTransform(-4.05,-59.4,0.998,0.998,11.3493,0,0,-1.3,7.4);

	this.instance_10 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_10.setTransform(33.9,185.75,0.9947,0.9947,-14.5568,0,0,3.4,-50.4);

	this.instance_11 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_11.setTransform(56.7,130.1,0.9971,0.9971,124.9995,0,0,-10.2,10.7);

	this.instance_12 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_12.setTransform(59.7,129.55,0.9972,0.9972,150.1937,0,0,-7.1,13.2);

	this.instance_13 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_13.setTransform(30.55,48.1,0.9972,0.9972,75.9986,0,0,-45.1,12.8);

	this.instance_14 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_14.setTransform(48.2,-21.25,0.9975,0.9975,104.8947,0,0,-33.1,13.3);

	this.instance_15 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_15.setTransform(-10.2,49.1,0.9994,0.9994,1.7753,0,0,-4.9,-21.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4.9,scaleX:0.9994,scaleY:0.9994,rotation:1.7753,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:104.8947,regX:-33.1,regY:13.3,x:48.2,y:-21.25}},{t:this.instance_13,p:{rotation:75.9986,x:30.55,y:48.1,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:150.1937,x:59.7,y:129.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:124.9995,x:56.7,y:130.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-14.5568,x:33.9,y:185.75,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.998,scaleY:0.998,rotation:11.3493,x:-4.05,y:-59.4,regY:7.4}},{t:this.instance_8,p:{rotation:8.7322,x:-41.5,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.931,x:-29.95,y:90.35}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9646,x:24.9,y:88.35}},{t:this.instance_5,p:{y:-33.45}},{t:this.instance_4,p:{rotation:-11.8556,y:-81.45,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.45,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-140.2196,x:-58.4,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-102.4158,x:3,y:120.8,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9969,scaleY:0.9969,rotation:-132.2022,x:2.55,y:120.6}},{t:this.instance,p:{regX:33.6,regY:9.5,rotation:-92.6463,x:-59.7,y:-12.4}}]}).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7736,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:105.6651,regX:-33.1,regY:13.3,x:48.2,y:-21.25}},{t:this.instance_13,p:{rotation:73.1761,x:29.65,y:47.8,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:147.371,x:62.7,y:127.7,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:122.1755,x:59.7,y:128.4,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.8,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:11.3063,x:-4.1,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7309,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.1472,y:-81.4,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.45,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.839,x:-58.5,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.0328,x:2.4,y:121.15,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-131.8205,x:2,y:121.05}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.5472,x:-59.9,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7727,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:106.4388,regX:-33,regY:13.2,x:48.15,y:-21.15}},{t:this.instance_13,p:{rotation:70.3525,x:28.8,y:47.5,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:144.5472,x:65.6,y:125.75,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:119.3528,x:62.75,y:126.55,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.8,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:11.2634,x:-4.1,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7309,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-10.4408,y:-81.4,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.45,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.4565,x:-58.55,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.6511,x:1.8,y:121.5,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-131.4397,x:1.45,y:121.45}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.4481,x:-59.9,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7727,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:107.2111,regX:-33.1,regY:13.3,x:48.15,y:-21.3}},{t:this.instance_13,p:{rotation:67.5284,x:27.8,y:47.25,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:141.7228,x:68.55,y:123.5,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:116.5282,x:65.6,y:124.6,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.8,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.998,scaleY:0.998,rotation:11.2196,x:-4.1,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7309,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-9.7327,y:-81.4,scaleX:0.9978,scaleY:0.9978,regY:50.4,x:1.45,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.0748,x:-58.75,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.269,x:1.3,y:121.9,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-131.0581,x:0.9,y:121.85}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-92.3499,x:-59.85,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7727,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:107.9842,regX:-33,regY:13.2,x:48.25,y:-21.1}},{t:this.instance_13,p:{rotation:64.7047,x:26.9,y:46.95,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:138.8985,x:71.35,y:121.1,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:113.7047,x:68.6,y:122.3,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.8,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.998,scaleY:0.998,rotation:11.1757,x:-4.15,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.73,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-9.0247,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.6932,x:-58.9,y:59.5,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.8875,x:0.75,y:122.35,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.6758,x:0.4,y:122.25}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.2525,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7727,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:108.7573,regX:-33,regY:13.3,x:48.1,y:-21.15}},{t:this.instance_13,p:{rotation:61.8808,x:25.95,y:46.65,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:136.0752,x:74,y:118.5,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:110.8806,x:71.3,y:119.85,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.8,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:11.1323,x:-4.15,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.73,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-8.3184,y:-81.4,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.3125,x:-58.95,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.5065,x:0.15,y:122.8,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.295,x:-0.2,y:122.65}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.1534,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7727,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:109.5294,regX:-33,regY:13.3,x:48.1,y:-21.2}},{t:this.instance_13,p:{rotation:59.0576,x:25.05,y:46.35,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:133.2507,x:76.5,y:115.85,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:108.0567,x:73.9,y:117.25,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.8,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.998,scaleY:0.998,rotation:11.0892,x:-4,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.73,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-7.6098,y:-81.4,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.9313,x:-59.05,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.1243,x:-0.35,y:123.2,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.9128,x:-0.7,y:123.05}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-92.0551,x:-59.85,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7718,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:110.3033,regX:-33,regY:13.3,x:48.05,y:-21.15}},{t:this.instance_13,p:{rotation:56.2326,x:24.2,y:45.95,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:130.4269,x:79.1,y:112.75,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:105.233,x:76.4,y:114.45,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.0464,x:-4,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.73,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-6.9033,y:-81.4,scaleX:0.9978,scaleY:0.9978,regY:50.4,x:1.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.549,x:-59.15,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.7425,x:-1,y:123.6,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.531,x:-1.25,y:123.45}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.9578,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7718,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:111.0758,regX:-33,regY:13.3,x:48.05,y:-21.15}},{t:this.instance_13,p:{rotation:53.4091,x:23.25,y:45.65,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:127.6026,x:81.3,y:109.65,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:102.4097,x:78.85,y:111.4,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.0038,x:-4,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.73,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-6.1967,y:-81.45,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.168,x:-59.2,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.361,x:-1.5,y:123.8,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.1502,x:-1.8,y:123.8}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.8587,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7718,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:111.8483,regX:-33,regY:13.3,x:48.15,y:-21.2}},{t:this.instance_13,p:{rotation:50.5849,x:22.35,y:45.2,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:124.7789,x:83.5,y:106.4,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:99.5867,x:81.15,y:108.15,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.998,scaleY:0.998,rotation:10.9596,x:-4,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.73,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-5.4878,y:-81.45,scaleX:0.9978,scaleY:0.9978,regY:50.4,x:1.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.7858,x:-59.45,y:59.45,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.9792,x:-2.1,y:124.2,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.7679,x:-2.35,y:124.15}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.7604,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7718,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:112.6211,regX:-33,regY:13.3,x:48.05,y:-21.2}},{t:this.instance_13,p:{rotation:47.7618,x:21.45,y:44.85,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:121.9546,x:85.55,y:102.95,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:96.7623,x:83.2,y:104.9,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.998,scaleY:0.998,rotation:10.917,x:-4.1,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7291,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-4.7805,y:-81.6,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.55,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.405,x:-59.5,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.5977,x:-2.45,y:124.6,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.3859,x:-2.9,y:124.55}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.6622,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7718,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:113.3941,regX:-33,regY:13.3,x:48.05,y:-21.15}},{t:this.instance_13,p:{rotation:44.9374,x:20.5,y:44.6,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:119.1313,x:87.4,y:99.3,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:93.9384,x:85.2,y:101.4,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:10.8742,x:-4.1,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7291,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-4.0739,y:-81.45,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.0236,x:-59.6,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.2158,x:-3.25,y:125.05,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.0051,x:-3.5,y:124.95}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.564,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:114.1665,regX:-33.1,regY:13.3,x:48.1,y:-21.25}},{t:this.instance_13,p:{rotation:42.1128,x:19.65,y:44.15,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:116.3078,x:89.15,y:95.6,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:91.1154,x:87.1,y:97.9,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:10.8313,x:-4.05,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7291,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-3.3654,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.45,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-135.6417,x:-59.65,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-97.8343,x:-3.75,y:125.35,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-127.6231,x:-4,y:125.35}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.4658,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:114.94,regX:-33,regY:13.3,x:48.05,y:-21.2}},{t:this.instance_13,p:{rotation:39.2905,x:18.75,y:43.75,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:113.483,x:90.7,y:91.65,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:88.2943,x:88.75,y:94,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.998,scaleY:0.998,rotation:10.7876,x:-4.1,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7291,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-2.6583,y:-81.45,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.55,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-135.2604,x:-59.65,y:59.45,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-97.452,x:-4.35,y:125.75,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-127.2414,x:-4.6,y:125.65}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.3676,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:115.712,regX:-33,regY:13.3,x:48.05,y:-21.15}},{t:this.instance_13,p:{rotation:36.4655,x:17.9,y:43.3,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:110.659,x:92.1,y:87.65,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:85.4724,x:90.3,y:90.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:10.7459,x:-4.05,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7291,x:-41.4,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-1.9516,y:-81.45,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.45,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-134.8772,x:-59.85,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-97.0702,x:-4.85,y:126.1,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-126.8594,x:-5.15,y:126}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.2694,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:113.5503,regX:-33,regY:13.3,x:48.05,y:-21.15}},{t:this.instance_13,p:{rotation:28.0776,x:20.35,y:44.3,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:102.2728,x:100.25,y:77.45,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:77.085,x:98.8,y:80.2,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.7,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:10.8055,x:-4.05,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7291,x:-41.4,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-2.9407,y:-81.4,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.6,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-135.7204,x:-59.65,y:59.45,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-97.6712,x:-3.75,y:125.25,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-127.2302,x:-4.05,y:125.2}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.4053,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:111.3907,regX:-33,regY:13.3,x:48.05,y:-21.25}},{t:this.instance_13,p:{rotation:19.6919,x:22.75,y:45.3,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:93.8855,x:106.65,y:66.4,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:68.6978,x:105.45,y:69.25,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.7,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:10.8654,x:-4.1,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7291,x:-41.4,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-3.9317,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.5625,x:-59.5,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.2726,x:-2.65,y:124.4,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-127.6,x:-2.85,y:124.45}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.5412,x:-59.75,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:109.2291,regX:-33,regY:13.3,x:48,y:-21.2}},{t:this.instance_13,p:{rotation:11.3065,x:25.4,y:46.2,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:85.5043,x:111.4,y:55,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:60.3119,x:110.7,y:57.8,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.7,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:10.9259,x:-4.05,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7291,x:-41.4,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-4.923,y:-81.45,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.4056,x:-59.25,y:59.45,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.8735,x:-1.5,y:123.6,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-127.97,x:-1.8,y:123.55}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.678,x:-59.85,y:-12.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:107.0677,regX:-33,regY:13.3,x:48,y:-21.2}},{t:this.instance_13,p:{rotation:2.9191,x:27.9,y:47.05,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:77.1163,x:114.2,y:43.1,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:51.9247,x:113.9,y:46.1,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.7,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:10.985,x:-3.9,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7291,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-5.9114,y:-81.45,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.2479,x:-59.15,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.474,x:-0.35,y:122.7,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.3404,x:-0.65,y:122.7}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.813,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:104.9064,regX:-33,regY:13.2,x:48.15,y:-21.15}},{t:this.instance_13,p:{rotation:-5.4626,x:30.55,y:47.75,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:68.7301,x:115.35,y:31.15,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:43.5384,x:115.5,y:34.25,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.7,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.0455,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-6.9025,y:-81.4,scaleX:0.9978,scaleY:0.9978,regY:50.4,x:1.7,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.091,x:-59,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.0745,x:0.7,y:121.9,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.7099,x:0.4,y:121.8}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.949,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:102.7463,regX:-33,regY:13.3,x:47.95,y:-21.25}},{t:this.instance_13,p:{rotation:-13.8498,x:33.1,y:48.35,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:60.3442,x:114.6,y:19.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:35.1524,x:115.3,y:22.5,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.7,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.1055,x:-3.9,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-7.8926,y:-81.45,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.65,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.9324,x:-58.8,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.6751,x:1.9,y:120.95,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.0798,x:1.5,y:120.9}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.0858,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:100.5847,regX:-33,regY:13.3,x:48,y:-21.25}},{t:this.instance_13,p:{rotation:-22.2356,x:35.75,y:48.8,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:51.957,x:112.15,y:8.5,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:26.7658,x:113.2,y:11.35,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.65,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.998,scaleY:0.998,rotation:11.166,x:-4.1,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-8.882,y:-81.35,scaleX:0.9978,scaleY:0.9978,regY:50.4,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-140.7736,x:-58.55,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.2754,x:2.8,y:120.1,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.45,x:2.6,y:120.05}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.2209,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:98.4233,regX:-33,regY:13.2,x:48.05,y:-21.3}},{t:this.instance_13,p:{rotation:-30.6212,x:38.35,y:49.25,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:43.5713,x:108.05,y:-1.7,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:18.3787,x:109.55,y:0.9,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.65,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.998,scaleY:0.998,rotation:11.2276,x:-4.05,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-9.8721,y:-81.35,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-141.6168,x:-58.5,y:59.55,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.876,x:3.85,y:119.2,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.8188,x:3.6,y:119.15}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-92.3586,x:-59.85,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:96.2614,regX:-33,regY:13.3,x:48,y:-21.25}},{t:this.instance_13,p:{rotation:-39.0082,x:40.95,y:49.55,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:35.1837,x:102.45,y:-11.1,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:9.9925,x:104.35,y:-8.65,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.65,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:11.2866,x:-4.05,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-10.8625,y:-81.4,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.7,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-142.4595,x:-58.25,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.4768,x:4.95,y:118.25,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.1899,x:4.65,y:118.2}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.4937,x:-59.85,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:94.1012,regX:-33,regY:13.3,x:48,y:-21.25}},{t:this.instance_13,p:{rotation:-47.3944,x:43.65,y:49.8,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:26.7976,x:95.7,y:-19.15,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:1.6057,x:97.85,y:-17.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.65,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3482,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-143.302,x:-58.1,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-103.0774,x:5.95,y:117.35,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.5594,x:5.65,y:117.25}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-92.6289,x:-59.9,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:93.3977,regX:-33,regY:13.3,x:47.95,y:-21.25}},{t:this.instance_13,p:{rotation:-40.314,x:44.5,y:49.8,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:31.5208,x:104.55,y:-12.2,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:6.1939,x:106.6,y:-9.9,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-142.8292,x:-58.5,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.7652,x:5,y:117.85,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.4014,x:4.7,y:117.8}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.2218,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:92.6946,regX:-33,regY:13.3,x:48,y:-21.3}},{t:this.instance_13,p:{rotation:-33.2314,x:45.45,y:49.85,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:36.2442,x:112.75,y:-4.25,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:10.7834,x:114.45,y:-1.8,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-142.3569,x:-59.1,y:59.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.4534,x:3.95,y:118.35,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.2421,x:3.7,y:118.35}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.8139,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:91.991,regX:-33,regY:13.3,x:48,y:-21.25}},{t:this.instance_13,p:{rotation:-26.1518,x:46.35,y:49.85,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:40.9677,x:119.7,y:4.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:15.3711,x:121.3,y:7.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-141.8834,x:-59.55,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.1428,x:3.1,y:118.95,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.0859,x:2.75,y:118.85}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.4079,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:91.2868,regX:-33,regY:13.3,x:48,y:-21.25}},{t:this.instance_13,p:{rotation:-19.0699,x:47.15,y:49.75,scaleX:0.9972,scaleY:0.9972,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:45.6913,x:125.7,y:13.95,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:19.9603,x:127,y:16.55,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-141.4115,x:-60.1,y:59.55,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.8311,x:1.9,y:119.4,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.9271,x:1.7,y:119.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.0011,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:90.5838,regX:-33,regY:13.2,x:48.05,y:-21.3}},{t:this.instance_13,p:{rotation:-11.9893,x:48.05,y:49.85,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:50.4151,x:130.35,y:23.85,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:24.5486,x:131.45,y:26.55,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-140.9369,x:-60.6,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.5195,x:0.95,y:119.9,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.7702,x:0.65,y:119.9}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-90.5934,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:89.8843,regX:-33,regY:13.2,x:48.1,y:-21.2}},{t:this.instance_13,p:{rotation:-4.908,x:48.95,y:49.85,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:55.1381,x:133.8,y:34.15,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:29.1384,x:134.75,y:37,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-140.4641,x:-61,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.2083,x:0,y:120.45,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.612,x:-0.3,y:120.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-90.1858,x:-59.65,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:89.1813,regX:-33,regY:13.2,x:48.1,y:-21.25}},{t:this.instance_13,p:{rotation:2.1679,x:49.65,y:49.85,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:59.8618,x:135.95,y:44.75,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:33.7258,x:136.7,y:47.7,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.9921,x:-61.6,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.8947,x:-1.05,y:120.85,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.455,x:-1.3,y:120.8}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-89.7817,x:-59.65,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9974,rotation:88.4773,regX:-33,regY:13.3,x:48.05,y:-21.3}},{t:this.instance_13,p:{rotation:9.2494,x:50.7,y:49.8,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:64.5832,x:136.8,y:55.4,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:38.3131,x:137.2,y:58.35,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9599,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.5193,x:-62.05,y:59.45,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.5833,x:-1.95,y:121.35,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.2973,x:-2.35,y:121.35}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-89.3741,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:87.774,regX:-33.1,regY:13.3,x:48,y:-21.35}},{t:this.instance_13,p:{rotation:16.3307,x:51.55,y:49.75,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:69.3072,x:136.45,y:66.05,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:42.9025,x:136.6,y:68.9,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9599,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.0463,x:-62.55,y:59.45,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.2724,x:-3.15,y:121.85,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.139,x:-3.35,y:121.8}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.9674,x:-59.85,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:87.0702,regX:-33,regY:13.3,x:47.95,y:-21.2}},{t:this.instance_13,p:{rotation:23.4121,x:52.45,y:49.6,scaleX:0.9972,scaleY:0.9972,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:74.0297,x:134.6,y:76.25,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:47.4915,x:134.6,y:79.2,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9599,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.5752,x:-63.1,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.9606,x:-4.1,y:122.3,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.9813,x:-4.4,y:122.25}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.5614,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:86.367,regX:-33,regY:13.3,x:47.9,y:-21.3}},{t:this.instance_13,p:{rotation:30.4939,x:53.25,y:49.7,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.7537,x:131.6,y:86.05,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:52.0803,x:131.3,y:89.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9599,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.102,x:-63.55,y:59.45,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.6483,x:-5.2,y:122.65,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.824,x:-5.4,y:122.65}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.1536,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:85.6632,regX:-33,regY:13.3,x:47.9,y:-21.25}},{t:this.instance_13,p:{rotation:37.5755,x:54.05,y:49.55,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:83.4764,x:127.3,y:95.4,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:56.6684,x:126.75,y:98.3,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5532,x:33.65,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9598,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.629,x:-64.1,y:59.35,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.3371,x:-6.25,y:123.1,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.6668,x:-6.4,y:123.2}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-87.7458,x:-59.85,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:84.9595,regX:-33.1,regY:13.3,x:47.95,y:-21.35}},{t:this.instance_13,p:{rotation:44.6565,x:54.9,y:49.5,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:88.1996,x:121.95,y:103.9,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:61.2572,x:121.2,y:106.95,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5532,x:33.65,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7277,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9598,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.1562,x:-64.6,y:59.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.0255,x:-7.3,y:123.5,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.5083,x:-7.45,y:123.6}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-87.3378,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:84.2561,regX:-33,regY:13.3,x:48,y:-21.25}},{t:this.instance_13,p:{rotation:51.7385,x:55.8,y:49.35,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:92.9193,x:115.6,y:111.9,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:65.8466,x:114.6,y:114.5,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5532,x:33.65,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7277,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9598,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.8521,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.6822,x:-65.15,y:59.3,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.713,x:-8.15,y:124.05,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.3511,x:-8.5,y:124.05}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-86.9322,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:83.5528,regX:-33,regY:13.3,x:47.95,y:-21.3}},{t:this.instance_13,p:{rotation:58.8181,x:56.65,y:49.35,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:97.6414,x:108.3,y:118.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:70.4345,x:107.05,y:121.2,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.553,x:33.65,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3474,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7277,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9598,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.851,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.2103,x:-65.65,y:59.2,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.402,x:-9.4,y:124.45,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.1924,x:-9.45,y:124.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-86.5241,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7666,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:84.618,regX:-33,regY:13.3,x:48,y:-21.25}},{t:this.instance_13,p:{rotation:59.6885,x:55.4,y:49.5,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:100.2654,x:105.95,y:119.5,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:73.1586,x:104.6,y:122.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5686,x:33.65,y:185.65,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.3929,x:-3.9,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7213,x:-41.45,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.933,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9687,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-9.633,y:-81.35,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.75,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.4193,x:-65.2,y:59.35,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.6101,x:-8.65,y:124.3,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.4015,x:-8.9,y:124.3}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-86.8402,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.764,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:85.6843,regX:-33,regY:13.3,x:47.9,y:-21.3}},{t:this.instance_13,p:{rotation:60.5565,x:54.1,y:49.6,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:102.8899,x:103.6,y:120.35,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:75.8829,x:102.05,y:122.95,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5859,x:33.75,y:185.65,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.4397,x:-3.9,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.7141,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9365,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9786,x:24.7,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-7.4135,y:-81.55,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.9,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.6271,x:-64.85,y:59.3,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.8167,x:-8,y:124.2,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-128.6089,x:-8.25,y:124.2}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-87.1544,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7605,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:86.7499,regX:-33,regY:13.3,x:48,y:-21.25}},{t:this.instance_13,p:{rotation:61.427,x:52.75,y:49.7,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:105.5123,x:101.2,y:121.3,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:78.6065,x:99.65,y:123.75,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.6023,x:33.6,y:185.7,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.4869,x:-3.85,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.707,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9401,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9893,x:24.7,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-5.194,y:-81.35,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.8,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.8361,x:-64.45,y:59.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.0244,x:-7.5,y:123.85,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.8177,x:-7.65,y:123.85}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-87.4703,x:-59.8,y:-12.55}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7578,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9974,rotation:87.8152,regX:-33,regY:13.3,x:48,y:-21.3}},{t:this.instance_13,p:{rotation:62.2966,x:51.45,y:49.85,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:108.136,x:98.9,y:121.95,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:81.3298,x:97,y:124.5,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.6195,x:33.75,y:185.65,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:11.5352,x:-3.95,y:-59.3,regY:7.5}},{t:this.instance_8,p:{rotation:8.7001,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9446,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9991,x:24.7,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-2.9749,y:-81.4,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.85,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.0432,x:-64,y:59.35,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.2332,x:-6.85,y:123.75,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.0261,x:-7.05,y:123.75}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-87.7861,x:-59.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7552,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:88.8806,regX:-33,regY:13.3,x:48,y:-21.25}},{t:this.instance_13,p:{rotation:63.166,x:50.15,y:49.85,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:110.7594,x:96.45,y:122.9,regX:-7}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:84.0538,x:94.6,y:125.2,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.6368,x:33.8,y:185.65,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:11.5833,x:-3.9,y:-59.35,regY:7.5}},{t:this.instance_8,p:{rotation:8.6921,x:-41.35,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9471,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0088,x:24.7,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-0.757,y:-81.4,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.85,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.2529,x:-63.65,y:59.45,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.441,x:-6.2,y:123.6,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.2337,x:-6.4,y:123.6}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.1019,x:-59.85,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7526,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:89.9457,regX:-33,regY:13.3,x:47.95,y:-21.25}},{t:this.instance_13,p:{rotation:64.0349,x:48.8,y:49.85,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:113.3836,x:94,y:123.65,regX:-7}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:86.7767,x:92.1,y:125.8,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.6541,x:33.65,y:185.65,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:11.5735,x:-3.95,y:-59.35,regY:7.5}},{t:this.instance_8,p:{rotation:8.6866,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9515,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0195,x:24.75,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-1.508,y:-81.3,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.9,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-137.4614,x:-63.3,y:59.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.6474,x:-5.6,y:123.3,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.4413,x:-5.75,y:123.35}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.4158,x:-59.85,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.75,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:91.0063,regX:-33,regY:13.2,x:48.1,y:-21.3}},{t:this.instance_13,p:{rotation:64.9047,x:47.5,y:49.9,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:116.0067,x:91.55,y:124.35,regX:-7}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:89.5002,x:89.55,y:126.6,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.6714,x:33.8,y:185.6,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:11.5656,x:-3.95,y:-59.35,regY:7.5}},{t:this.instance_8,p:{rotation:8.6794,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9551,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.031,x:24.75,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-2.2593,y:-81.35,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:2,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.6693,x:-62.95,y:59.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.8564,x:-4.95,y:123.25,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.6494,x:-5.15,y:123.2}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.7306,x:-59.8,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7474,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:92.0708,regX:-33.1,regY:13.3,x:48.05,y:-21.45}},{t:this.instance_13,p:{rotation:65.7741,x:46.2,y:49.95,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:118.6305,x:89.2,y:124.9,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:92.2208,x:87.05,y:127.05,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.6886,x:33.8,y:185.6,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:11.5575,x:-4,y:-59.3,regY:7.5}},{t:this.instance_8,p:{rotation:8.6732,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9594,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0409,x:24.75,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-3.0109,y:-81.4,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.85,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.8766,x:-62.6,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.0638,x:-4.25,y:123.05,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.8561,x:-4.5,y:123}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-89.0445,x:-59.85,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7447,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:93.1352,regX:-33,regY:13.3,x:48.05,y:-21.25}},{t:this.instance_13,p:{rotation:66.6432,x:44.9,y:49.9,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:121.2547,x:86.75,y:125.5,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:94.9447,x:84.35,y:127.5,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.7059,x:33.75,y:185.5,regX:3.3,regY:-50.5}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:11.5494,x:-3.95,y:-59.3,regY:7.5}},{t:this.instance_8,p:{rotation:8.6661,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9638,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0507,x:24.75,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-3.7631,y:-81.35,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.8,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.0853,x:-62.15,y:59.35,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.2714,x:-3.65,y:122.85,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.0659,x:-3.9,y:122.8}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-89.3601,x:-59.85,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7421,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:94.2007,regX:-33,regY:13.3,x:47.95,y:-21.25}},{t:this.instance_13,p:{rotation:67.5123,x:43.6,y:49.9,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:123.8793,x:84.3,y:126.05,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:97.6683,x:81.95,y:127.95,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.7232,x:33.75,y:185.5,regX:3.3,regY:-50.5}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:11.5415,x:-4,y:-59.3,regY:7.5}},{t:this.instance_8,p:{rotation:8.6592,x:-41.4,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9674,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0614,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-4.515,y:-81.35,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.8,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.2939,x:-61.85,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.4807,x:-2.95,y:122.7,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.2732,x:-3.3,y:122.6}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-89.6748,x:-59.75,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7395,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:95.2658,regX:-33,regY:13.2,x:48.15,y:-21.2}},{t:this.instance_13,p:{rotation:68.3813,x:42.3,y:49.8,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:126.5018,x:81.8,y:126.6,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:100.3916,x:79.35,y:128.4,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.7396,x:33.85,y:185.5,regX:3.4,regY:-50.5}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:11.5326,x:-4,y:-59.3,regY:7.5}},{t:this.instance_8,p:{rotation:8.653,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9718,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0719,x:24.85,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-5.2661,y:-81.35,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.75,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.5013,x:-61.45,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.6877,x:-2.25,y:122.45,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.4822,x:-2.6,y:122.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-89.9895,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7377,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:96.3308,regX:-33,regY:13.3,x:48.05,y:-21.2}},{t:this.instance_13,p:{rotation:69.2501,x:40.95,y:49.7,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:129.1257,x:79.4,y:127.1,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:103.1147,x:76.8,y:128.95,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.7571,x:34,y:185.6,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.4,scaleX:0.9979,scaleY:0.9979,rotation:11.5237,x:-4,y:-59.3,regY:7.5}},{t:this.instance_8,p:{rotation:8.6459,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9762,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0835,x:24.8,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-6.0179,y:-81.35,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.7,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.7094,x:-61.15,y:59.45,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.8947,x:-1.75,y:122.25,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.6888,x:-2,y:122.2}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-90.3007,x:-59.75,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7351,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:97.3956,regX:-33,regY:13.3,x:48.05,y:-21.25}},{t:this.instance_13,p:{rotation:70.1195,x:39.65,y:49.4,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:131.75,x:76.9,y:127.6,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:105.8389,x:74.3,y:129.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.7743,x:33.85,y:185.6,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.5161,x:-3.9,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.6394,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9797,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0925,x:24.8,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-6.77,y:-81.35,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.75,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.9188,x:-60.75,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.1036,x:-1.1,y:122.1,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.8977,x:-1.4,y:122}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-90.6154,x:-59.75,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7325,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:98.4605,regX:-33,regY:13.3,x:48.05,y:-21.2}},{t:this.instance_13,p:{rotation:70.9895,x:38.5,y:49.45,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:134.3738,x:74.45,y:128,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:108.5628,x:71.75,y:129.4,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.7916,x:33.95,y:185.6,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.5082,x:-3.9,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.6332,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9841,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.103,x:24.9,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-7.5215,y:-81.35,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.85,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.1258,x:-60.3,y:59.45,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.3111,x:-0.45,y:121.9,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-131.106,x:-0.75,y:121.8}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-90.9292,x:-59.85,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7298,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:99.5253,regX:-33,regY:13.3,x:48,y:-21.2}},{t:this.instance_13,p:{rotation:71.8578,x:37.05,y:49.2,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:136.9975,x:72,y:128.35,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:111.2864,x:69.05,y:129.55,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8087,x:34.05,y:185.6,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.4984,x:-3.9,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.627,x:-41.5,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9885,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.113,x:24.85,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-8.2732,y:-81.4,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.7,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.3353,x:-59.95,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.5195,x:0.15,y:121.65,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-131.3136,x:-0.2,y:121.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.2439,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7272,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:100.591,regX:-33,regY:13.3,x:48.1,y:-21.2}},{t:this.instance_13,p:{rotation:72.7288,x:35.7,y:48.95,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:139.6211,x:69.45,y:128.7,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:114.0101,x:66.5,y:129.75,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8259,x:34,y:185.6,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.4903,x:-3.9,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.6199,x:-41.5,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9929,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1237,x:24.85,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-9.0247,y:-81.5,scaleX:0.9979,scaleY:0.9979,regY:50.3,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.543,x:-59.55,y:59.45,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.7274,x:0.8,y:121.45,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-131.5212,x:0.5,y:121.35}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.5587,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7254,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:101.6556,regX:-33.1,regY:13.3,x:48.1,y:-21.35}},{t:this.instance_13,p:{rotation:73.5972,x:34.45,y:48.85,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:142.245,x:66.95,y:128.95,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:116.7341,x:63.95,y:129.95,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8432,x:34.05,y:185.6,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.4816,x:-3.9,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.6137,x:-41.55,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9964,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1334,x:24.85,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-9.7769,y:-81.35,scaleX:0.9978,scaleY:0.9978,regY:50.4,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.7513,x:-59.2,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.9349,x:1.4,y:121.15,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-131.7292,x:1.1,y:121.15}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.8736,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.722,x:-10.25,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:102.72,regX:-33,regY:13.3,x:48.05,y:-21.25}},{t:this.instance_13,p:{rotation:74.467,x:33.1,y:48.5,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:144.8691,x:64.5,y:129.25,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:119.4584,x:61.5,y:130.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8605,x:34.15,y:185.65,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.4735,x:-4,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.6067,x:-41.55,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0008,x:-29.95,y:90.35}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1442,x:24.85,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-10.5274,y:-81.4,scaleX:0.9978,scaleY:0.9978,regY:50.4,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.9586,x:-58.85,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.1428,x:2.25,y:121.05,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-131.9379,x:1.65,y:120.85}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.1884,x:-59.9,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7194,x:-10.25,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:103.7858,regX:-33,regY:13.3,x:48.1,y:-21.15}},{t:this.instance_13,p:{rotation:75.336,x:31.85,y:48.35,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:147.4929,x:61.95,y:129.4,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:122.1811,x:58.95,y:130.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8777,x:34.25,y:185.6,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.4665,x:-4,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.6005,x:-41.55,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0052,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1549,x:24.9,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{rotation:-11.2795,y:-81.35,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.6,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-140.167,x:-58.45,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.35,x:2.7,y:120.85,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-132.1454,x:2.3,y:120.6}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.5034,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.25,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:104.8505,regX:-33,regY:13.2,x:48.2,y:-21.15}},{t:this.instance_13,p:{rotation:76.2036,x:30.65,y:48.1,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:150.1157,x:59.45,y:129.6,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:124.9037,x:56.4,y:130.15,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8959,x:34.1,y:185.6,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{regX:-1.3,scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.95,y:-59.35,regY:7.4}},{t:this.instance_8,p:{rotation:8.5932,x:-41.55,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.9,y:88.25}},{t:this.instance_5,p:{y:-33.45}},{t:this.instance_4,p:{rotation:-12.0297,y:-81.4,scaleX:0.9979,scaleY:0.9979,regY:50.4,x:1.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-140.3744,x:-58.15,y:59.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.5568,x:3.25,y:120.55,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-132.354,x:2.95,y:120.55}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.8176,x:-59.9,y:-12.2}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-98.4,-212.2,269.4,509.3);


(lib.characterCivilian_09_button = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(20.25,-4.4,0.4406,0.4406,0,92.644,-87.356,33.5,9.2);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-7.4,54.4,0.4404,0.4404,0,132.2024,-47.7976,14.2,-0.5);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-7.55,54.45,0.4405,0.4405,0,102.4134,-77.5866,4.3,-9.1);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(19.6,27.35,0.4405,0.4405,0,140.2183,-39.7817,44.6,7.5);

	this.instance_4 = new lib.ch1_headcopy3("synched",0);
	this.instance_4.setTransform(-6.85,-34.95,0.4408,0.4408,0,11.8537,-168.1463,2.1,50.2);

	this.instance_5 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_5.setTransform(-3,-14.85,0.4417,0.4417,0,0,180,0,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_6.setTransform(-17.2,40.2,0.4393,0.4393,0,8.9643,-171.0357,0.8,4.9);

	this.instance_7 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_7.setTransform(7.05,41,0.4397,0.4397,0,-3.9282,176.0718,1.2,-42.1);

	this.instance_8 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_8.setTransform(12.15,83.05,0.4395,0.4395,0,-8.731,171.269,1.2,-51.2);

	this.instance_9 = new lib.ch1_neckcopy2("synched",0);
	this.instance_9.setTransform(-4.4,-25.15,0.4408,0.4408,0,-11.3484,168.6516,-1.3,7.3);

	this.instance_10 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_10.setTransform(-21.25,83.05,0.4394,0.4394,0,14.5546,-165.4454,3.5,-50.4);

	this.instance_11 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_11.setTransform(-31.25,58.55,0.4404,0.4404,0,-124.9989,55.0011,-10.1,10.7);

	this.instance_12 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_12.setTransform(-32.55,58.25,0.4405,0.4405,0,-150.195,29.805,-7,13.2);

	this.instance_13 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_13.setTransform(-19.75,22.25,0.4405,0.4405,0,-75.9999,104.0001,-45.1,12.8);

	this.instance_14 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_14.setTransform(-27.55,-8.25,0.4406,0.4406,0,-104.8938,75.1062,-32.9,13.2);

	this.instance_15 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_15.setTransform(-1.7,22.75,0.4414,0.4414,0,-1.7748,178.2252,-4.9,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_16 = new lib.CharacterCivilian_09_interact();
	this.instance_16.setTransform(-2.3,19.45,0.4417,0.4417,0,0,180,-8.8,41.6);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.3,-92.5,82.5,225.1);


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
	this.instance.setTransform(-59.7,-12.4,0.9974,0.9974,-92.6463,0,0,33.6,9.5);

	this.instance_1 = new lib.ch1_hand_rcopy("synched",0);
	this.instance_1.setTransform(2.55,120.6,0.9969,0.9969,-132.2022,0,0,14.5,-0.4);

	this.instance_2 = new lib.ch1_thumb_rcopy("synched",0);
	this.instance_2.setTransform(3,120.8,0.9973,0.9973,-102.4158,0,0,4.4,-9.1);

	this.instance_3 = new lib.ch1_lArm_rcopy("synched",0);
	this.instance_3.setTransform(-58.4,59.6,0.9972,0.9972,-140.2196,0,0,44.5,7.5);

	this.instance_4 = new lib.ch1_headcopy_2("synched",0);
	this.instance_4.setTransform(1.45,-81.45,0.9979,0.9979,-11.8556,0,0,2.1,50.4);

	this.instance_5 = new lib.ch1_uBodycopy("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy("synched",0);
	this.instance_6.setTransform(24.9,88.35,0.9945,0.9945,-8.9646,0,0,0.8,4.7);

	this.instance_7 = new lib.ch1_uLeg_rcopy("synched",0);
	this.instance_7.setTransform(-29.95,90.35,0.9954,0.9954,3.931,0,0,1.4,-42.2);

	this.instance_8 = new lib.ch1_lLeg_rcopy("synched",0);
	this.instance_8.setTransform(-41.5,185.5,0.9949,0.9949,8.7322,0,0,1.2,-51.4);

	this.instance_9 = new lib.ch1_neckcopy("synched",0);
	this.instance_9.setTransform(-4.05,-59.4,0.998,0.998,11.3493,0,0,-1.3,7.4);

	this.instance_10 = new lib.ch1_lLeg_lcopy("synched",0);
	this.instance_10.setTransform(33.9,185.75,0.9947,0.9947,-14.5568,0,0,3.4,-50.4);

	this.instance_11 = new lib.ch1_hand_lcopy("synched",0);
	this.instance_11.setTransform(56.7,130.1,0.9971,0.9971,124.9995,0,0,-10.2,10.7);

	this.instance_12 = new lib.ch1_thumb_lcopy("synched",0);
	this.instance_12.setTransform(59.7,129.55,0.9972,0.9972,150.1937,0,0,-7.1,13.2);

	this.instance_13 = new lib.ch1_lArm_lcopy("synched",0);
	this.instance_13.setTransform(30.55,48.1,0.9972,0.9972,75.9986,0,0,-45.1,12.8);

	this.instance_14 = new lib.ch1_uArm_lcopy("synched",0);
	this.instance_14.setTransform(48.2,-21.25,0.9975,0.9975,104.8947,0,0,-33.1,13.3);

	this.instance_15 = new lib.ch1_lBodycopy("synched",0);
	this.instance_15.setTransform(-10.2,49.1,0.9994,0.9994,1.7753,0,0,-4.9,-21.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4.9,scaleX:0.9994,scaleY:0.9994,rotation:1.7753,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9975,scaleY:0.9975,rotation:104.8947,x:48.2,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:75.9986,x:30.55,y:48.1,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9972,scaleY:0.9972,rotation:150.1937,x:59.7,y:129.55}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:124.9995,x:56.7,y:130.1,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-14.5568,x:33.9,y:185.75,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:11.3493,x:-4.05,y:-59.4,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:8.7322,x:-41.5,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.931,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9646,x:24.9,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-11.8556,y:-81.45,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-140.2196,x:-58.4,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-102.4158,x:3,y:120.8,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9969,scaleY:0.9969,rotation:-132.2022,x:2.55,y:120.6,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.5,rotation:-92.6463,y:-12.4,x:-59.7,scaleX:0.9974,scaleY:0.9974}}]}).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7718,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.4446,x:48.05,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:74.8345,x:32.4,y:48.45,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:146.4199,x:62.95,y:129.3}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:121.9198,x:60.2,y:130,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6406,x:33.95,y:185.7,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3548,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:8.4235,x:-41.45,y:185.35,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9348,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.975,x:24.85,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-11.5635,y:-81.4,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.1492,x:-60.5,y:59.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.3417,x:-1.45,y:123,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.1307,x:-1.75,y:122.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-90.9669,y:-12.3,x:-59.7,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:101.9943,x:48.05,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:73.6693,x:34.1,y:48.85,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:142.647,x:66.5,y:128.95}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:118.8374,x:63.6,y:130,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-12.7233,x:33.95,y:185.75,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3592,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:8.1137,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9392,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9855,x:24.85,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-11.2725,y:-81.3,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.0757,x:-62.5,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.269,x:-5.9,y:125,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.0561,x:-6.15,y:124.8,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-89.2908,y:-12.35,x:-59.75,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7657,x:-10.15,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:100.5446,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:72.5044,x:35.85,y:49.05,regX:-45.2,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.997,scaleY:0.997,rotation:138.8731,x:69.9,y:128.6}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:115.7576,x:67.05,y:129.8,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-11.8068,x:33.95,y:185.7,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3653,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.8047,x:-41.45,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9436,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9955,x:24.85,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-10.9786,y:-81.3,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-134.0024,x:-64.65,y:59.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-96.1955,x:-10.15,y:126.9,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-125.9856,x:-10.5,y:126.8,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-87.6124,y:-12.35,x:-59.7,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7631,x:-10.15,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:99.0944,x:48.05,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:71.3385,x:37.65,y:49.45,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:135.0992,x:73.2,y:128.25}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:112.6762,x:70.55,y:129.55,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-10.8886,x:33.9,y:185.6,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3706,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.4964,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9471,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0062,x:24.85,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-10.6867,y:-81.45,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-131.9303,x:-66.8,y:59.25,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-94.1223,x:-14.85,y:128.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-123.9114,x:-15.15,y:128.45,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-85.931,y:-12.45,x:-59.65,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7596,x:-10.15,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:97.6449,x:48.1,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:70.1731,x:39.55,y:49.65,regX:-45.1,regY:12.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7,scaleX:0.997,scaleY:0.997,rotation:131.3257,x:76.55,y:127.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:109.5947,x:74.05,y:129.25,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.9724,x:34,y:185.65,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3771,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.1879,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9506,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0169,x:24.8,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-10.3944,y:-81.45,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.8572,x:-68.85,y:59,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9973,rotation:-92.0484,x:-19.4,y:130.05,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-121.8388,x:-19.75,y:130,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-84.2523,y:-12.4,x:-59.65,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.757,x:-10.1,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:96.196,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:69.0068,x:41.3,y:49.8,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:127.5512,x:79.95,y:127.15}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:106.5138,x:77.55,y:128.8,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.0545,x:34,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3831,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.8789,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9551,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0284,x:24.8,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-10.1017,y:-81.4,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.7842,x:-70.95,y:58.7,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-89.9798,x:-24.2,y:131.6,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-119.7665,x:-24.6,y:131.5,regY:-0.5}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-82.5712,y:-12.45,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7535,x:-10.1,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:94.7457,x:48.2,y:-21.3,regY:13.2}},{t:this.instance_13,p:{rotation:67.843,x:43.1,y:49.95,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:123.7774,x:83.4,y:126.4}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:103.4327,x:80.95,y:128.35,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-8.1381,x:33.95,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3893,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.5691,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9594,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0383,x:24.85,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.8099,y:-81.25,x:1.55,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-125.7113,x:-73.1,y:58.25,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-87.9068,x:-29,y:132.7,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-117.6932,x:-29.15,y:132.8,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-80.8926,y:-12.4,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7508,x:-10.05,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:93.2967,x:48.1,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:66.6774,x:44.85,y:50.05,regX:-45.1,regY:12.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:120.003,x:86.8,y:125.55}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:100.3514,x:84.45,y:127.9,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.2209,x:34,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3941,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.2598,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.963,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0488,x:24.8,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.5175,y:-81.25,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-123.639,x:-75.05,y:57.85,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-85.8337,x:-33.8,y:133.95,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-115.6213,x:-34,y:133.75,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-79.213,y:-12.3,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7474,x:-10.05,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:91.8454,x:48.05,y:-21.4,regY:13.3}},{t:this.instance_13,p:{rotation:65.5112,x:46.75,y:50.05,regX:-45.1,regY:12.7,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:116.2294,x:90.1,y:124.85}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.997,rotation:97.2703,x:88,y:127.1,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-6.3037,x:34,y:185.65,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3994,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:5.9521,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9674,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0595,x:24.8,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.2252,y:-81.25,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.566,x:-77.15,y:57.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-83.7595,x:-38.45,y:134.9,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-113.5473,x:-38.8,y:134.7,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-77.5334,y:-12.35,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7447,x:-10.05,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:90.3953,x:48.15,y:-21.3,regY:13.2}},{t:this.instance_13,p:{rotation:64.347,x:48.5,y:50.15,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:112.4563,x:93.45,y:123.8}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:94.189,x:91.4,y:126.35,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-5.3865,x:33.95,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4055,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.643,x:-41.35,y:185.35,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9718,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0702,x:24.8,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.9325,y:-81.2,x:1.6,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-119.493,x:-79.15,y:56.85,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-81.6866,x:-43.5,y:135.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-111.4739,x:-43.65,y:135.45,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-75.8526,y:-12.4,x:-59.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7412,x:-10,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:88.9507,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:63.1809,x:50.25,y:50.05,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:108.6823,x:96.65,y:123}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:91.1084,x:94.9,y:125.55,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-4.4698,x:34,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4108,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:5.3348,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9762,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0818,x:24.75,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.6399,y:-81.2,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-117.4207,x:-81.15,y:56.15,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-79.6127,x:-48.4,y:136.25,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-109.4007,x:-48.6,y:136.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-74.1725,y:-12.35,x:-59.55,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7386,x:-10,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:87.5002,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:62.0154,x:52.05,y:49.9,regX:-45.2,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:104.908,x:99.95,y:121.9}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:88.0319,x:98.3,y:124.55,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-3.5526,x:34.05,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4173,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:5.0251,x:-41.3,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9797,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0916,x:24.75,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.3485,y:-81.15,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-115.3475,x:-83.15,y:55.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.5394,x:-53.3,y:136.75,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-107.328,x:-53.6,y:136.5,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-72.4934,y:-12.4,x:-59.5,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7351,x:-9.95,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:86.0507,x:48.05,y:-21.45,regY:13.3}},{t:this.instance_13,p:{rotation:60.8513,x:53.85,y:49.8,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:101.1347,x:103.2,y:120.85}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:84.9497,x:101.6,y:123.5,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-2.6353,x:34.05,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4233,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.7165,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9841,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1022,x:24.8,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.0555,y:-81.1,x:1.6,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-113.275,x:-85.15,y:54.8,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-75.4664,x:-58.3,y:136.95,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-105.2546,x:-58.55,y:136.8,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-70.8138,y:-12.4,x:-59.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7325,x:-9.95,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:84.5995,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:59.6854,x:55.65,y:49.7,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:97.3601,x:106.4,y:119.6}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:81.8704,x:105.2,y:122.45,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-1.7187,x:34,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:11.4285,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.4079,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9885,y:90.4,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1121,x:24.75,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-7.7627,y:-81.05,x:1.7,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-111.2022,x:-87.1,y:54.05,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.393,x:-63.25,y:137.1,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-103.1817,x:-63.35,y:136.9,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-69.1349,y:-12.45,x:-59.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7289,x:-9.95,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:83.1502,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:58.5202,x:57.4,y:49.45,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:93.5877,x:109.6,y:118.5}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:78.7886,x:108.55,y:121.25,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-0.8017,x:34.1,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4343,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.0986,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9921,y:90.4,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1227,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-7.471,y:-81.2,x:1.75,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-109.1303,x:-89.05,y:53.2,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-71.3202,x:-68.15,y:137.05,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-101.109,x:-68.3,y:136.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-67.4545,y:-12.4,x:-59.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7263,x:-9.9,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:81.6999,x:48.05,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:57.3537,x:59.25,y:49.25,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:89.8176,x:112.85,y:117.05}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:75.7083,x:111.9,y:120,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:0.1116,x:34.1,y:185.35,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4397,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:3.7894,x:-41.3,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9964,y:90.4,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1334,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-7.1777,y:-81.05,x:1.8,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-107.0574,x:-90.9,y:52.3,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-69.2458,x:-73.2,y:136.8,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-99.036,x:-73.25,y:136.55,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-65.7741,y:-12.35,x:-59.3,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7237,x:-9.9,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:80.2516,x:48.1,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:56.1888,x:61,y:48.9,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:86.0432,x:115.9,y:115.6}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:72.6271,x:115.25,y:118.6,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:1.0276,x:34.05,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4457,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:3.4804,x:-41.3,y:185.3,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0008,y:90.4,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1442,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.8856,y:-81.05,x:1.65,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-104.9841,x:-92.85,y:51.25,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-67.1734,x:-78.1,y:136.4,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-96.9634,x:-78.25,y:136.25,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-64.0943,y:-12.4,x:-59.35,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7202,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:78.8013,x:48.05,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:55.0237,x:62.75,y:48.45,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:82.2709,x:119.05,y:114.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:69.5451,x:118.6,y:117.15,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:1.9456,x:34.05,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4512,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:3.1722,x:-41.3,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0052,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1549,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.5936,y:-81,x:1.6,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.9123,x:-94.5,y:50.25,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-65.0996,x:-83.05,y:135.85,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-94.8903,x:-83.1,y:135.7,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-62.4149,y:-12.45,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:77.3519,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:53.858,x:64.55,y:48.15,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:78.4961,x:122.15,y:112.45}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:66.4634,x:121.85,y:115.7,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:2.8624,x:34.05,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:2.8634,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.7,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.8391,x:-96.45,y:49.15,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-63.0268,x:-88,y:135.15,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-92.8173,x:-88,y:134.8,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-60.7353,y:-12.4,x:-59.3,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:79.0129,x:48.1,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:55.5772,x:62.45,y:48.55,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:79.7862,x:118.15,y:114.8}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:66.8082,x:117.8,y:117.75,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:2.2324,x:34.05,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:3.1494,x:-41.35,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.1284,x:-95.15,y:49.9,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-65.1475,x:-84.7,y:135.7,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-94.3351,x:-84.8,y:135.65,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-61.9663,y:-12.45,x:-59.2,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:80.6747,x:47.95,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:57.2963,x:60.55,y:48.85,regX:-45.1,regY:12.7,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:81.0748,x:114.1,y:116.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:67.152,x:113.6,y:119.85,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:1.6017,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:3.4363,x:-41.35,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-103.4168,x:-93.85,y:50.7,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-67.2665,x:-81.3,y:136.1,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9969,scaleY:0.9969,rotation:-95.8539,x:-81.55,y:136.05,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-63.199,y:-12.45,x:-59.3,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:82.3364,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:59.0155,x:58.4,y:49.3,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:82.3639,x:110,y:118.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:67.4956,x:109.55,y:121.8,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:0.9722,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:3.7225,x:-41.35,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-104.7067,x:-92.35,y:51.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-69.3865,x:-78.1,y:136.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-97.3727,x:-78.25,y:136.5,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-64.4303,y:-12.55,x:-59.3,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:83.9978,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:60.7347,x:56.3,y:49.55,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:83.6528,x:105.8,y:120.4}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:67.84,x:105.3,y:123.45,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:0.3411,x:34.15,y:185.3,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.0088,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-105.9957,x:-91.05,y:52.15,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-71.5079,x:-74.8,y:137,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-98.8912,x:-74.95,y:136.75,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-65.6633,y:-12.45,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:85.6596,x:47.95,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:62.4527,x:54.3,y:49.8,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:84.942,x:101.65,y:122.05}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:68.1826,x:101,y:125.1,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-0.2848,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.2961,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-107.2845,x:-89.65,y:52.9,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.6262,x:-71.5,y:137.35,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-100.4091,x:-71.65,y:137.15,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.4,rotation:-66.8951,y:-12.45,x:-59.25,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:87.3212,x:47.95,y:-21.5,regY:13.3}},{t:this.instance_13,p:{rotation:64.1729,x:52.2,y:49.9,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:86.2322,x:97.35,y:123.6}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:68.527,x:96.75,y:126.7,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-0.9142,x:34.1,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.5824,x:-41.3,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-108.5736,x:-88.3,y:53.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-75.7479,x:-68.2,y:137.5,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-101.9281,x:-68.35,y:137.35,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-68.1268,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:88.9823,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:65.8911,x:50.15,y:50,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:87.5213,x:93.1,y:125.05}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:68.8701,x:92.35,y:128,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-1.5455,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.8681,x:-41.3,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-109.8641,x:-86.85,y:54,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.867,x:-64.9,y:137.7,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-103.4464,x:-65.15,y:137.6,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-69.3591,y:-12.35,x:-59.25,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:90.6408,x:47.95,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:67.6099,x:48.05,y:50.05,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:88.8101,x:88.75,y:126.2}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:69.2136,x:88,y:129.45,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-2.1752,x:34.1,y:185.35,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.1549,x:-41.3,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-111.1526,x:-85.4,y:54.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-79.9869,x:-61.65,y:137.75,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-104.9648,x:-61.8,y:137.65,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-70.5904,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:92.3023,x:48,y:-21.45,regY:13.3}},{t:this.instance_13,p:{rotation:69.3292,x:46,y:50,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:90.0947,x:84.35,y:127.5}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:69.5582,x:83.45,y:130.5,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-2.8051,x:34.2,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:5.4417,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-112.4421,x:-84,y:55.25,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-82.1065,x:-58.25,y:137.75,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-106.4828,x:-58.5,y:137.65,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-71.8223,y:-12.4,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9975,scaleY:0.9975,rotation:93.9633,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:71.0482,x:43.95,y:49.9,regX:-45.1,regY:12.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:91.3846,x:79.95,y:128.5}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:69.9019,x:79,y:131.45,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-3.4364,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.7277,x:-41.4,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-113.7309,x:-82.55,y:55.75,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-84.2276,x:-54.95,y:137.7,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-108.0017,x:-55.2,y:137.5,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-73.0541,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:95.6249,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:72.7673,x:41.85,y:49.8,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:92.6744,x:75.5,y:129.55}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:70.2461,x:74.45,y:132.35,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-4.0671,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.0148,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-115.0208,x:-81,y:56.2,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-86.3469,x:-51.6,y:137.4,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-109.52,x:-51.95,y:137.4,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-74.2865,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:97.2861,x:48.05,y:-21.25,regY:13.2}},{t:this.instance_13,p:{rotation:74.4861,x:39.75,y:49.55,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:93.9629,x:71.05,y:130.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:70.5895,x:69.95,y:133.1,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-4.6966,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.3013,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-116.3094,x:-79.5,y:56.55,regX:44.6,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-88.4673,x:-48.35,y:137.3,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-111.0385,x:-48.55,y:137.25,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-75.5188,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:98.9487,x:48.1,y:-21.25,regY:13.2}},{t:this.instance_13,p:{rotation:76.2036,x:37.75,y:49.35,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:95.2517,x:66.6,y:130.8}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:70.9339,x:65.45,y:133.7,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-5.3274,x:34.1,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.5877,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-117.5991,x:-78.05,y:57.1,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-90.5839,x:-45,y:137.1,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-112.5575,x:-45.2,y:136.95,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-76.75,y:-12.3,x:-59.35,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:100.6106,x:47.95,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:77.9239,x:35.6,y:48.95,regX:-45.2,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:96.5421,x:62,y:131.35}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:71.2781,x:60.85,y:134.1,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-5.9572,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.8744,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-118.8885,x:-76.6,y:57.45,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-92.703,x:-41.75,y:136.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-114.0759,x:-41.95,y:136.6,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-77.9818,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:102.2714,x:48,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:79.6415,x:33.6,y:48.65,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:97.8308,x:57.5,y:131.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:71.6219,x:56.35,y:134.5,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-6.5877,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.1606,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-120.1791,x:-75.15,y:57.8,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-94.8224,x:-38.45,y:136.3,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-115.5946,x:-38.65,y:136.15,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-79.2139,y:-12.35,x:-59.4,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.9336,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:81.361,x:31.75,y:48.2,regX:-45.1,regY:12.7,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:99.1205,x:52.95,y:131.95}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:71.9655,x:51.55,y:134.8,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.2182,x:34.2,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.4466,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-121.4669,x:-73.6,y:58.15,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-96.9431,x:-35.25,y:135.8,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-117.1122,x:-35.4,y:135.65,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-80.4459,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:105.5941,x:48.05,y:-21.2,regY:13.3}},{t:this.instance_13,p:{rotation:83.0804,x:29.75,y:47.75,regX:-45.1,regY:12.7,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:100.4088,x:48.55,y:132}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:72.3093,x:47.05,y:134.8,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.8485,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.7339,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-122.7555,x:-72.1,y:58.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.0628,x:-31.9,y:135.05,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-118.6306,x:-32.25,y:135.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-81.6774,y:-12.35,x:-59.25,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:107.256,x:48.15,y:-21.3,regY:13.2}},{t:this.instance_13,p:{rotation:84.7989,x:27.6,y:47.15,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:101.6974,x:43.95,y:131.95}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:72.6518,x:42.5,y:134.85,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-8.4783,x:34.2,y:185.35,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:8.0204,x:-41.4,y:185.35,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-124.0453,x:-70.6,y:58.7,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.1832,x:-28.7,y:134.5,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-120.1497,x:-28.9,y:134.45,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-82.9088,y:-12.35,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:108.9187,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:86.5188,x:25.6,y:46.45,regX:-45.2,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:102.9873,x:39.45,y:131.8}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:72.9952,x:37.9,y:134.5,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.1087,x:34.15,y:185.35,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:8.3063,x:-41.35,y:185.35,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-125.3341,x:-69.05,y:58.9,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-103.3033,x:-25.45,y:133.8,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-121.6665,x:-25.75,y:133.8,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-84.1403,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:110.5789,x:48.05,y:-21.2,regY:13.2}},{t:this.instance_13,p:{rotation:88.2374,x:23.65,y:45.85,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:104.2774,x:34.9,y:131.5}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:73.34,x:33.35,y:134.15,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.7388,x:34.2,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:8.5932,x:-41.45,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.6228,x:-67.55,y:59.15,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-105.423,x:-22.25,y:133,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-123.1851,x:-22.5,y:132.95,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-85.3728,y:-12.35,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:108.9187,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:87.0335,x:25.6,y:46.6,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:102.5862,x:38.6,y:132.05}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.997,rotation:72.4508,x:37.15,y:134.6,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.0233,x:34.25,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3994,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:8.1633,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.329,y:-81.05,x:1.7,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-124.3892,x:-68.95,y:59,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.3579,x:-26.5,y:134.55,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-120.7213,x:-26.8,y:134.45,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-84.2557,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:107.256,x:48.15,y:-21.3,regY:13.2}},{t:this.instance_13,p:{rotation:85.8309,x:27.6,y:47.15,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:100.8962,x:42.45,y:132.25}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:71.5628,x:41,y:134.95,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-8.3066,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3446,x:-4.05,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.7339,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3581,y:-81.05,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-122.154,x:-70.3,y:58.7,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.2918,x:-30.9,y:135.9,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-118.2582,x:-31.15,y:135.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-83.1384,y:-12.35,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:105.5941,x:48.05,y:-21.2,regY:13.3}},{t:this.instance_13,p:{rotation:84.6272,x:29.6,y:47.75,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:99.2052,x:46.2,y:132.5}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:70.676,x:44.85,y:135.3,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.5903,x:34.2,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.2866,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:7.3039,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3871,y:-81,x:1.7,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-119.9191,x:-71.7,y:58.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-96.2264,x:-35.4,y:137.2,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-115.7947,x:-35.55,y:137,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-82.021,y:-12.35,x:-59.35,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.9336,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:83.4231,x:31.55,y:48.15,regX:-45.2,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:97.5149,x:50,y:132.75}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:69.787,x:48.8,y:135.45,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-6.8745,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.2295,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:6.8744,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.4155,y:-81,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-117.685,x:-73.15,y:58.25,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-93.1613,x:-39.8,y:138.2,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-113.3306,x:-40.1,y:138.1,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-80.9043,y:-12.5,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:102.2714,x:48,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:82.2193,x:33.6,y:48.75,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:95.8244,x:53.75,y:132.65}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.997,rotation:68.8996,x:52.65,y:135.55,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-6.1578,x:34,y:185.45,regY:-50.4,regX:3.3}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.1715,x:-4.15,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:6.4434,x:-41.35,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-6.4446,y:-81.15,x:1.6,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-115.4506,x:-74.45,y:58,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-90.0956,x:-44.2,y:139,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.8675,x:-44.5,y:139.2,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.4,rotation:-79.7864,y:-12.45,x:-59.25,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:100.6106,x:47.95,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:81.0178,x:35.7,y:49.05,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:94.1343,x:57.55,y:132.6}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:68.0107,x:56.45,y:135.5,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-5.4413,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.1144,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.0148,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-6.4726,y:-81.15,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-113.2149,x:-75.85,y:57.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-87.0354,x:-48.75,y:139.95,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-108.4022,x:-49.15,y:139.95,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-78.6693,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:98.9487,x:48.1,y:-21.25,regY:13.2}},{t:this.instance_13,p:{rotation:79.8145,x:37.75,y:49.4,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:92.4435,x:61.35,y:132.65}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:67.1237,x:60.35,y:135.45,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-4.7255,x:34.05,y:185.5,regY:-50.4,regX:3.3}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.0581,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.5847,x:-41.4,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.5018,y:-81.05,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-110.9805,x:-77.15,y:57.25,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-83.9692,x:-53.45,y:140.6,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-105.9391,x:-53.7,y:140.45,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-77.553,y:-12.4,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:97.2861,x:48.05,y:-21.25,regY:13.2}},{t:this.instance_13,p:{rotation:78.6115,x:39.75,y:49.6,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:90.7541,x:65.15,y:132.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:66.2348,x:64.25,y:135.15,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-4.0089,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.9993,x:-4.05,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.1549,x:-41.35,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.5301,y:-81.05,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-108.7469,x:-78.5,y:57,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-80.9036,x:-58.1,y:140.9,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-103.4744,x:-58.3,y:140.9,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-76.4349,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:95.6249,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:77.4076,x:41.9,y:49.65,regX:-45.2,regY:12.7,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:89.0688,x:69,y:131.75}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:65.347,x:68.1,y:134.85,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-3.2928,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.9421,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.7252,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.5592,y:-81.05,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-106.511,x:-79.85,y:56.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.8383,x:-62.75,y:141.35,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-101.0108,x:-62.95,y:141.2,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-75.3166,y:-12.35,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9975,scaleY:0.9975,rotation:93.9633,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:76.2036,x:43.9,y:49.95,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:87.3774,x:72.75,y:131.45}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:64.4589,x:72,y:134.4,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-2.5772,x:34.2,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.8866,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:4.2961,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.5883,y:-81.05,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-104.2774,x:-81.2,y:56.15,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-74.7733,x:-67.4,y:141.5,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-98.5471,x:-67.6,y:141.4,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-74.201,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:92.3023,x:48,y:-21.45,regY:13.3}},{t:this.instance_13,p:{rotation:75.0023,x:45.95,y:50,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:85.688,x:76.5,y:130.9}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:63.571,x:75.8,y:133.9,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-1.8603,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.8278,x:-4.15,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:3.8661,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.6173,y:-81.05,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.0414,x:-82.5,y:55.75,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-71.7084,x:-71.95,y:141.6,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-96.0833,x:-72.25,y:141.5,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-73.0837,y:-12.35,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:90.6408,x:47.95,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:73.7987,x:48.05,y:50.05,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:83.9968,x:80.25,y:130.25}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:62.6828,x:79.7,y:133.3,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-1.1446,x:34.1,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.7708,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.5,rotation:3.4363,x:-41.4,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.6455,y:-81.05,x:1.35,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-99.8073,x:-83.8,y:55.3,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-68.6419,x:-76.7,y:141.3,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-93.6194,x:-76.95,y:141.25,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-71.9662,y:-12.4,x:-59.3,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:88.9823,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:72.5954,x:50.1,y:50,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:82.3073,x:84,y:129.55}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:61.7947,x:83.45,y:132.65,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-0.4281,x:34.2,y:185.4,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.7137,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:3.0068,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.6739,y:-81.05,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-97.5719,x:-85.15,y:54.7,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-65.5762,x:-81.45,y:141.1,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-91.1552,x:-81.6,y:140.95,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-70.8487,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:87.3212,x:47.95,y:-21.5,regY:13.3}},{t:this.instance_13,p:{rotation:71.3923,x:52.15,y:49.95,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:80.6164,x:87.75,y:128.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:60.9052,x:87.45,y:131.9,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:0.2839,x:34.1,y:185.3,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.6567,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:2.5774,x:-41.35,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.703,y:-81.05,x:1.3,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-95.3376,x:-86.4,y:54.2,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-62.5112,x:-86,y:140.7,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9969,rotation:-88.6966,x:-86.25,y:140.5,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-69.731,y:-12.4,x:-59.35,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:85.6596,x:47.95,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:70.1889,x:54.2,y:49.8,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:78.9262,x:91.5,y:127.8}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:60.0184,x:91.2,y:131,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:0.9995,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.5988,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:2.1473,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.7302,y:-81.1,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-93.1044,x:-87.7,y:53.7,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-59.4454,x:-90.7,y:140,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-86.2321,x:-90.9,y:139.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-68.6132,y:-12.35,x:-59.3,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:83.9978,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:68.986,x:56.35,y:49.5,regX:-45.2,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:77.2367,x:95.15,y:126.8}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:59.1302,x:94.95,y:129.85,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:1.7161,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.5409,x:-4.05,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:1.7174,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.7593,y:-81.1,x:1.3,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-90.8698,x:-88.8,y:53.1,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-56.3797,x:-95.35,y:139.3,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-83.7685,x:-95.6,y:139.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-67.4954,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:82.3364,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:67.7824,x:58.5,y:49.25,regX:-45.1,regY:12.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:75.5452,x:98.85,y:125.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:58.242,x:98.7,y:128.75,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:2.433,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.4838,x:-4.1,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:1.2866,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.7876,y:-81.1,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-88.6383,x:-90.2,y:52.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-53.314,x:-100.15,y:138.35,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-81.3049,x:-100.3,y:138.1,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-66.3791,y:-12.4,x:-59.3,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:80.6747,x:47.95,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:66.5792,x:60.45,y:48.95,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:73.8562,x:102.45,y:124.45}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:57.3538,x:102.4,y:127.65,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:3.1484,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.4275,x:-4.05,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.5,rotation:0.8586,x:-41.35,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.8168,y:-81.1,x:1.25,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9972,rotation:-86.4038,x:-91.45,y:51.8,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-50.249,x:-104.75,y:137.3,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-78.8407,x:-104.75,y:136.95,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-65.2609,y:-12.45,x:-59.35,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:79.0129,x:48.1,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:65.3759,x:62.45,y:48.55,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:72.1648,x:106.05,y:123.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:56.4653,x:106.15,y:126.25,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:3.8662,x:34.05,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.3696,x:-4.05,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:0.428,x:-41.3,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.845,y:-81.1,x:1.35,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-84.1699,x:-92.75,y:51.25,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-47.1827,x:-109.2,y:136.1,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-76.3758,x:-109.3,y:135.8,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-64.1438,y:-12.4,x:-59.35,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:77.3519,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:64.1729,x:64.5,y:48.1,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:70.4742,x:109.65,y:121.9}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:55.5771,x:109.9,y:125,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:4.5818,x:33.95,y:185.45,regY:-50.4,regX:3.3}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.3117,x:-4.05,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:0,x:-41.35,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.8741,y:-81.1,x:1.2,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-81.9351,x:-93.95,y:50.45,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-44.1178,x:-113.75,y:134.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-73.9129,x:-113.8,y:134.5,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-63.0276,y:-12.4,x:-59.25,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:78.7263,x:48.05,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:64.7741,x:62.8,y:48.45,regX:-45.2,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:74.4566,x:107.25,y:122.8}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:59.0441,x:107.1,y:125.8,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:3.6072,x:34.05,y:185.35,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.3696,x:-4.05,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:0.428,x:-41.35,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-7.1319,y:-81.15,x:1.4,scaleX:0.9978,scaleY:0.9978,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-84.8578,x:-92.35,y:51.35,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-47.04,x:-107.85,y:136.45,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-76.8357,x:-107.95,y:136.2,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-64.5166,y:-12.45,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.9,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:80.1012,x:48.1,y:-21.35,regY:13.2}},{t:this.instance_13,p:{rotation:65.3759,x:61.15,y:48.8,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:78.4388,x:104.75,y:123.45}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:62.511,x:104.5,y:126.6,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:2.6335,x:34.1,y:185.4,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.4275,x:-4.05,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.5,rotation:0.8586,x:-41.35,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-7.3897,y:-81.2,x:1.25,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-87.7795,x:-90.75,y:52.3,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-49.9626,x:-101.8,y:138,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-79.7576,x:-101.85,y:137.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-66.0071,y:-12.4,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.9,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:81.4767,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:65.9774,x:59.5,y:49.15,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:82.4215,x:102.3,y:124.35}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:65.9773,x:101.75,y:127.25,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:1.6589,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.4838,x:-4.1,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:1.2866,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-7.6479,y:-81.15,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-90.6962,x:-88.95,y:53.2,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-52.8844,x:-95.7,y:139.25,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-82.6786,x:-95.8,y:139.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-67.4954,y:-12.4,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.9,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:82.8517,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:66.5792,x:57.8,y:49.4,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:86.4044,x:99.8,y:125.05}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:69.4447,x:99.15,y:128,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:0.6856,x:34.15,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.5409,x:-4.05,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:1.7174,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-7.9061,y:-81.2,x:1.25,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-93.6199,x:-87.3,y:53.85,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-55.8076,x:-89.6,y:140.25,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-85.6024,x:-89.65,y:140.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-68.9868,y:-12.4,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.95,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:84.227,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:67.1802,x:56.1,y:49.65,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:90.3814,x:97.35,y:125.45}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:72.91,x:96.5,y:128.6,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-0.2848,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.5988,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:2.1473,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.1643,y:-81.15,x:1.3,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-96.5417,x:-85.4,y:54.65,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-58.7294,x:-83.4,y:140.95,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9969,scaleY:0.9969,rotation:-88.5247,x:-83.6,y:140.8,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-70.4764,y:-12.55,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.95,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:85.6024,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:67.7824,x:54.5,y:49.75,regX:-45.1,regY:12.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:94.3638,x:94.85,y:126.25}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:76.377,x:93.75,y:129.05,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-1.2588,x:34.2,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.6567,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:2.5774,x:-41.4,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.4212,y:-81.2,x:1.25,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-99.463,x:-83.75,y:55.3,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-61.6514,x:-77.35,y:141.5,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9969,scaleY:0.9969,rotation:-91.4411,x:-77.45,y:141.25,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-71.9662,y:-12.4,x:-59.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:86.9772,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:68.3835,x:52.75,y:49.95,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:98.3464,x:92.35,y:126.75}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:79.8427,x:91.05,y:129.65,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-2.2323,x:34.2,y:185.4,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.7137,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:3.0068,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.679,y:-81.2,x:1.3,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-102.385,x:-82.05,y:55.85,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-64.5744,x:-71.1,y:141.75,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-94.3641,x:-71.35,y:141.6,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-73.4562,y:-12.45,x:-59.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:88.3528,x:48.05,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:68.986,x:51,y:50,regX:-45.2,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:102.3283,x:89.8,y:127.4}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:83.311,x:88.15,y:130,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-3.2074,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.7708,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.5,rotation:3.4363,x:-41.45,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.937,y:-81.2,x:1.3,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-105.3073,x:-80.3,y:56.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-67.4953,x:-65.05,y:141.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-97.2861,x:-65.2,y:141.4,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-74.9445,y:-12.35,x:-59.5,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:89.7274,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:69.5875,x:49.3,y:50.1,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:106.3111,x:87.25,y:127.75}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:86.7767,x:85.65,y:130.3,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-4.1808,x:34.2,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.8278,x:-4.15,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:3.8661,x:-41.45,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.8,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.1951,y:-81.25,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-108.2298,x:-78.5,y:56.95,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-70.4183,x:-58.95,y:141.25,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-100.2102,x:-59.1,y:141,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-76.4349,y:-12.35,x:-59.55,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.05,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:91.0984,x:48.2,y:-21.25,regY:13.2}},{t:this.instance_13,p:{rotation:70.1889,x:47.5,y:50.15,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:110.2925,x:84.75,y:128.2}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:90.2394,x:82.9,y:130.6,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-5.1554,x:34.2,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.8866,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:4.2961,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.8,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.4528,y:-81.25,x:1.35,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-111.1526,x:-76.7,y:57.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.34,x:-52.9,y:140.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-103.1302,x:-53.05,y:140.45,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-77.9252,y:-12.35,x:-59.55,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.05,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:92.4734,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:70.7906,x:45.85,y:50.1,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:114.276,x:82.25,y:128.5}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:93.7056,x:80.2,y:130.8,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-6.1287,x:34.2,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.9421,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.7252,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.8,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.7104,y:-81.3,x:1.4,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-114.0755,x:-74.85,y:57.95,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-76.2621,x:-46.7,y:139.8,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-106.0532,x:-47,y:139.6,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-79.4157,y:-12.35,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.05,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9975,scaleY:0.9974,rotation:93.8482,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:71.3923,x:44.1,y:50.05,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:118.2581,x:79.75,y:128.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:97.1721,x:77.35,y:130.95,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.103,x:34.2,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.9993,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.1549,x:-41.4,y:185.35,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.8,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.968,y:-81.25,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-116.9968,x:-73.05,y:58.3,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-79.1847,x:-40.9,y:138.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-108.9755,x:-41.05,y:138.55,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-80.9043,y:-12.5,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.1,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:95.2235,x:48.1,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:71.9931,x:42.45,y:49.95,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:122.2395,x:77.15,y:129.05}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:100.6387,x:74.7,y:131,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-8.0759,x:34.2,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.0581,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.5847,x:-41.45,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.8,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-10.2263,y:-81.25,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-119.9191,x:-71.2,y:58.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-82.1065,x:-34.95,y:137.25,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.8978,x:-35.1,y:137.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-82.3934,y:-12.3,x:-59.55,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.1,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:96.599,x:48.1,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:72.5954,x:40.75,y:49.8,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:126.2223,x:74.7,y:129.15}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:104.1054,x:72.15,y:131.1,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.0509,x:34.2,y:185.65,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.1144,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.0148,x:-41.5,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-10.4846,y:-81.35,x:1.4,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-122.8411,x:-69.3,y:58.9,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-85.0289,x:-29.1,y:135.6,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-114.8201,x:-29.35,y:135.35,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-83.8838,y:-12.35,x:-59.7,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.1,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:97.9742,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:73.1964,x:39.15,y:49.6,regX:-45.1,regY:12.7,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.997,scaleY:0.997,rotation:130.2047,x:72,y:129.45}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:107.5725,x:69.5,y:131.15,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-10.025,x:34.2,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.1715,x:-4.15,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:6.4434,x:-41.45,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-10.742,y:-81.35,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-125.7646,x:-67.55,y:59.2,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-87.9516,x:-23.35,y:133.7,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-117.743,x:-23.65,y:133.55,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-85.3728,y:-12.35,x:-59.65,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.15,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:99.3502,x:48.1,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:73.7987,x:37.35,y:49.35,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:134.1865,x:69.55,y:129.55}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:111.0382,x:66.85,y:130.95,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-10.9996,x:34.3,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.2295,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:6.8744,x:-41.55,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-10.9993,y:-81.35,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.6858,x:-65.65,y:59.3,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-90.8697,x:-17.65,y:131.55,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-120.6643,x:-18,y:131.35,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-86.8638,y:-12.35,x:-59.7,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.15,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:100.7258,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:74.4004,x:35.6,y:49.2,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:138.1693,x:66.9,y:129.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:114.5046,x:64.2,y:131.05,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-11.974,x:34.3,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.2866,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:7.3039,x:-41.55,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-11.258,y:-81.35,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-131.6081,x:-63.75,y:59.4,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-93.7919,x:-12.3,y:129.15,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-123.5869,x:-12.65,y:128.9,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.3536,y:-12.35,x:-59.75,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.15,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:102.1,x:48.15,y:-21.4,regY:13.3}},{t:this.instance_13,p:{rotation:75.0023,x:33.95,y:48.8,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:142.1525,x:64.5,y:129.6}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:117.9726,x:61.6,y:130.7,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-12.9478,x:34.3,y:185.65,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3446,x:-4.05,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.7339,x:-41.5,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-11.5156,y:-81.3,x:1.5,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-134.5307,x:-61.9,y:59.4,regX:44.6,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-96.7134,x:-6.85,y:126.6,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-126.5091,x:-7.3,y:126.4,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-89.8422,y:-12.3,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.2,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.4754,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:75.6031,x:32.3,y:48.45,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:146.1329,x:61.95,y:129.55}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:121.4375,x:59.05,y:130.5,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.9211,x:34.3,y:185.7,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3994,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:8.1633,x:-41.55,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.9,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-11.7739,y:-81.35,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.4534,x:-60.1,y:59.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.6357,x:-1.8,y:123.6,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.4307,x:-2.1,y:123.55,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.3281,y:-12.3,x:-59.75,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.2,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:104.8505,x:48.2,y:-21.15,regY:13.2}},{t:this.instance_13,p:{rotation:76.2036,x:30.65,y:48.15,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:150.1157,x:59.45,y:129.55}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:124.9037,x:56.45,y:130.15,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8959,x:34.2,y:185.6,regY:-50.4,regX:3.3}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4567,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:8.5932,x:-41.55,y:185.55,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.9,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-12.0297,y:-81.35,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-140.3744,x:-58.2,y:59.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.5568,x:3.25,y:120.6,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-132.354,x:2.95,y:120.55,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.8176,y:-12.2,x:-59.85,scaleX:0.9974,scaleY:0.9974}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-131.4,-212.2,278.70000000000005,509.7);


(lib.CharacterCivilian_08_interact = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-59.1,-12.2,0.9975,0.9975,-60.0842,0,0,33.5,10.2);

	this.instance_1 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1.setTransform(-91.65,135.5,0.9971,0.9971,-100.7599,0,0,14.2,-0.4);

	this.instance_2 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2.setTransform(-91.2,135.4,0.9974,0.9974,-113.7705,0,0,4.5,-9);

	this.instance_3 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_3.setTransform(-97.3,49.15,0.9974,0.9974,-98.9366,0,0,44.5,7.4);

	this.instance_4 = new lib.ch1_headcopy3_1("synched",0);
	this.instance_4.setTransform(1.25,-81.2,0.9981,0.9981,-11.862,0,0,2,50.7);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_6.setTransform(27.05,85.75,0.9947,0.9947,-13.6764,0,0,-0.4,4.9);

	this.instance_7 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_7.setTransform(-30.25,90.75,0.9956,0.9956,3.9312,0,0,1.4,-41.9);

	this.instance_8 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_8.setTransform(-42.1,185.7,0.9951,0.9951,0.4085,0,0,0.7,-51.1);

	this.instance_9 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_9.setTransform(-4.05,-59.45,0.9982,0.9982,11.3494,0,0,-1.4,7.4);

	this.instance_10 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(44.7,181.65,0.9948,0.9948,3.6505,0,0,3.5,-50.6);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(135.1,101.55,0.9972,0.9972,51.5682,0,0,-10.5,10.5);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(134.6,98.15,0.9973,0.9973,69.6456,0,0,-7.8,13.5);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(64.55,47.8,0.9974,0.9974,41.3706,0,0,-45.6,12.9);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(48,-21.25,0.9977,0.9977,76.9908,0,0,-32.6,13.5);

	this.instance_15 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_15.setTransform(-9.8,49,0.9995,0.9995,1.7768,0,0,-4.5,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{rotation:1.7768,x:-9.8,y:49}},{t:this.instance_14,p:{regY:13.5,scaleX:0.9977,scaleY:0.9977,rotation:76.9908,y:-21.25,regX:-32.6,x:48}},{t:this.instance_13,p:{rotation:41.3706,x:64.55,y:47.8,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:69.6456,x:134.6,y:98.15,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:51.5682,x:135.1,y:101.55,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:3.6505,x:44.7,y:181.65,regX:3.5}},{t:this.instance_9,p:{regY:7.4,rotation:11.3494,x:-4.05,y:-59.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4085,x:-42.1,y:185.7,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9956,scaleY:0.9956,rotation:3.9312,x:-30.25,y:90.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-13.6764,x:27.05,y:85.75,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.7,rotation:-11.862,x:1.25,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-98.9366,x:-97.3,y:49.15,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9974,scaleY:0.9974,rotation:-113.7705,x:-91.2,y:135.4,regX:4.5}},{t:this.instance_1,p:{rotation:-100.7599,x:-91.65,y:135.5,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.5,rotation:-60.0842,x:-59.1,y:-12.2,scaleX:0.9975,scaleY:0.9975}}]}).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.75,y:48.95}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:76.9486,y:-21.4,regX:-32.6,x:48}},{t:this.instance_13,p:{rotation:35.3112,x:64.65,y:47.7,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:63.5871,x:139.6,y:90.45,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:45.509,x:140.45,y:93.8,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6499,x:44.6,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3431,x:-4.05,y:-59.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4077,x:-42.05,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9297,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-11.3371,x:1.3,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-99.4718,x:-96.95,y:49.35,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9.1,scaleX:0.9973,scaleY:0.9973,rotation:-114.3076,x:-90.1,y:135.55,regX:4.5}},{t:this.instance_1,p:{rotation:-101.2976,x:-90.4,y:135.65,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-60.3713,x:-59.15,y:-12.1,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.75,y:48.95}},{t:this.instance_14,p:{regY:13.3,scaleX:0.9976,scaleY:0.9976,rotation:76.9046,y:-21.35,regX:-32.5,x:48.1}},{t:this.instance_13,p:{rotation:29.2502,x:64.6,y:47.75,regY:13,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:57.5267,x:143.55,y:82.3,regY:13.6,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:39.4476,x:144.85,y:85.45,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6499,x:44.6,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3378,x:-4.05,y:-59.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4068,x:-42.05,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9297,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-10.8129,x:1.3,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-100.0117,x:-96.65,y:49.5,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-114.8465,x:-88.95,y:135.6,regX:4.5}},{t:this.instance_1,p:{rotation:-101.8361,x:-89.3,y:135.75,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-60.6579,x:-59.2,y:-12.2,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.75,y:48.95}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:76.8605,y:-21.3,regX:-32.5,x:48}},{t:this.instance_13,p:{rotation:23.1918,x:64.75,y:47.6,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:51.4675,x:146.9,y:73.7,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:33.3888,x:148.5,y:76.75,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:3.6498,x:44.6,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3314,x:-4.05,y:-59.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4068,x:-42.05,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9297,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-10.2894,x:1.3,y:-81.15,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-100.5499,x:-96.4,y:49.7,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-115.3842,x:-87.75,y:135.8,regX:4.5}},{t:this.instance_1,p:{rotation:-102.3736,x:-88.2,y:135.85,scaleX:0.997,scaleY:0.997,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-60.9451,x:-59.15,y:-12.1,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.75,y:48.95}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:76.8182,y:-21.3,regX:-32.5,x:48}},{t:this.instance_13,p:{rotation:17.1306,x:64.8,y:47.6,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:45.4073,x:149.25,y:64.75,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:27.3289,x:151.15,y:67.7,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:3.6489,x:44.65,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3259,x:-4,y:-59.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4068,x:-42.05,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9289,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-9.7653,x:1.2,y:-81.2,scaleX:0.998,scaleY:0.998,regX:1.9}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-101.0878,x:-96,y:49.85,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-115.9237,x:-86.65,y:135.8,regX:4.5}},{t:this.instance_1,p:{rotation:-102.911,x:-87.05,y:135.95,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-61.2303,x:-59.1,y:-12.2,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.75,y:48.9}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:76.7742,y:-21.35,regX:-32.5,x:48}},{t:this.instance_13,p:{rotation:11.0706,x:64.85,y:47.55,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:39.3473,x:150.65,y:55.7,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:21.2688,x:152.8,y:58.4,scaleX:0.9971,scaleY:0.9971,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:3.6489,x:44.65,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3199,x:-4,y:-59.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4068,x:-42.05,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9289,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-9.242,x:1.2,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:1.9}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-101.6254,x:-95.7,y:50.1,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9.1,scaleX:0.9973,scaleY:0.9973,rotation:-116.4616,x:-85.6,y:136.05,regX:4.5}},{t:this.instance_1,p:{rotation:-103.4512,x:-86.05,y:136.1,scaleX:0.9971,scaleY:0.9971,regY:-0.5,regX:14.2}},{t:this.instance,p:{regX:33.5,rotation:-61.5174,x:-59.05,y:-12.25,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.75,y:48.9}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:76.7309,y:-21.35,regX:-32.5,x:47.95}},{t:this.instance_13,p:{rotation:5.0125,x:64.9,y:47.55,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:33.2879,x:151.05,y:46.65,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:15.2091,x:153.45,y:49.05,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:3.6489,x:44.65,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3153,x:-4,y:-59.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4059,x:-42.05,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9289,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-8.7181,x:1.2,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:1.9}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-102.1637,x:-95.35,y:50.2,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-116.9994,x:-84.45,y:135.95,regX:4.5}},{t:this.instance_1,p:{rotation:-103.9873,x:-84.8,y:136.15,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-61.8049,x:-59.15,y:-12.2,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.75,y:48.9}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:76.6867,y:-21.35,regX:-32.5,x:47.95}},{t:this.instance_13,p:{rotation:-1.0432,x:64.95,y:47.5,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:27.2276,x:150.55,y:37.5,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:9.1493,x:153.15,y:39.8,scaleX:0.9972,scaleY:0.9972,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:3.6489,x:44.65,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3089,x:-4,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4059,x:-42.05,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9289,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-8.1937,x:1.4,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-102.7022,x:-95.1,y:50.45,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-117.5377,x:-83.25,y:136.1,regX:4.5}},{t:this.instance_1,p:{rotation:-104.5264,x:-83.8,y:136.25,scaleX:0.9971,scaleY:0.9971,regY:-0.5,regX:14.2}},{t:this.instance,p:{regX:33.5,rotation:-62.0907,x:-59,y:-12.3,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.75,y:48.9}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:76.6427,y:-21.35,regX:-32.5,x:47.9}},{t:this.instance_13,p:{rotation:-7.1035,x:64.95,y:47.35,regY:12.8,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:21.1678,x:149.05,y:28.5,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:3.0903,x:151.85,y:30.35,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:3.6489,x:44.65,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3036,x:-4.05,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4059,x:-42.05,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.928,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-7.6701,x:1.4,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-103.2396,x:-94.75,y:50.6,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-118.0757,x:-82.15,y:136.15,regX:4.5}},{t:this.instance_1,p:{rotation:-105.0635,x:-82.6,y:136.3,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-62.3785,x:-59.15,y:-12.15,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:76.5995,y:-21.4,regX:-32.5,x:47.9}},{t:this.instance_13,p:{rotation:-13.1633,x:64.95,y:47.5,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:15.1083,x:146.6,y:19.7,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:-2.9664,x:149.65,y:21.3,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6481,x:44.65,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.2974,x:-4.05,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4059,x:-42.05,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.928,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-7.1456,x:1.4,y:-81.25,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-103.7786,x:-94.4,y:50.8,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9.1,scaleX:0.9973,scaleY:0.9973,rotation:-118.6147,x:-81.15,y:136.25,regX:4.5}},{t:this.instance_1,p:{rotation:-105.6019,x:-81.45,y:136.3,scaleX:0.997,scaleY:0.997,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.5,rotation:-62.6647,x:-59,y:-12.35,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7734,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:76.5553,y:-21.5,regX:-32.6,x:47.9}},{t:this.instance_13,p:{rotation:-19.2241,x:65.05,y:47.6,regY:13,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:9.0478,x:143.2,y:11.45,regY:13.6,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:-9.0257,x:146.4,y:12.45,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6481,x:44.65,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.291,x:-4.05,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4059,x:-42.05,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.928,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-6.6213,x:1.3,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-104.3158,x:-94.05,y:51.05,regX:44.4,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-119.1526,x:-79.95,y:136.25,regX:4.5}},{t:this.instance_1,p:{rotation:-106.1404,x:-80.4,y:136.35,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-62.952,x:-59.1,y:-12.15,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7734,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.3,scaleX:0.9976,scaleY:0.9976,rotation:76.5119,y:-21.5,regX:-32.6,x:47.95}},{t:this.instance_13,p:{rotation:-25.2838,x:65.1,y:47.4,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:2.9881,x:139,y:3.25,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:-15.0846,x:142.35,y:4.05,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6481,x:44.65,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.2849,x:-4,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4051,x:-42.05,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.928,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-6.0968,x:1.4,y:-81.15,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-104.8533,x:-93.7,y:51.15,regX:44.5,regY:7.5}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-119.6907,x:-78.8,y:136.25,regX:4.5}},{t:this.instance_1,p:{rotation:-106.6781,x:-79.2,y:136.4,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-63.237,x:-59.1,y:-12.2,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7734,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:76.4686,y:-21.35,regX:-32.5,x:47.85}},{t:this.instance_13,p:{rotation:-31.3433,x:65.1,y:47.35,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:-3.0672,x:133.95,y:-4.3,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:-21.1456,x:137.3,y:-3.75,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6481,x:44.65,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.2804,x:-4,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4051,x:-42.05,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9271,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-5.573,x:1.4,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-105.3926,x:-93.45,y:51.3,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-120.2299,x:-77.7,y:136.3,regX:4.5}},{t:this.instance_1,p:{rotation:-107.2159,x:-78.2,y:136.55,scaleX:0.9971,scaleY:0.9971,regY:-0.5,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-63.5251,x:-59.05,y:-12.15,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7734,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:76.4252,y:-21.35,regX:-32.5,x:47.9}},{t:this.instance_13,p:{rotation:-37.4029,x:65.1,y:47.3,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:-9.1285,x:128.1,y:-11.3,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:-27.2058,x:131.5,y:-11.15,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6481,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.2742,x:-3.95,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4051,x:-42,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9271,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:26.95,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-5.0495,x:1.4,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-105.9309,x:-93.1,y:51.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-120.7671,x:-76.5,y:136.45,regX:4.4}},{t:this.instance_1,p:{rotation:-107.7537,x:-77,y:136.4,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-63.8112,x:-59.05,y:-12.15,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7734,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.3,scaleX:0.9976,scaleY:0.9976,rotation:75.0719,y:-21.45,regX:-32.5,x:48}},{t:this.instance_13,p:{rotation:-33.2709,x:66.75,y:46.9,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:-4.9946,x:133.75,y:-7.1,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:-23.0732,x:137.15,y:-6.6,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6481,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.2812,x:-4,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4051,x:-42,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9271,x:-30.15,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:26.95,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-5.1523,x:1.35,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.6466,x:-93.3,y:51.4,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-122.4831,x:-74.15,y:135.7,regX:4.5}},{t:this.instance_1,p:{rotation:-109.4707,x:-74.6,y:135.85,scaleX:0.997,scaleY:0.997,regY:-0.5,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-63.685,x:-59.1,y:-12.2,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:73.7206,y:-21.4,regX:-32.5,x:47.85}},{t:this.instance_13,p:{rotation:-29.1395,x:68.4,y:46.5,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:-0.8635,x:139.15,y:-2.55,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:-18.9412,x:142.5,y:-1.95,scaleX:0.9971,scaleY:0.9971,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6472,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.2876,x:-4,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4051,x:-42,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9271,x:-30.15,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:26.95,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-5.2562,x:1.45,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-109.3625,x:-93.4,y:51.35,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-124.1989,x:-71.7,y:135.1,regX:4.4}},{t:this.instance_1,p:{rotation:-111.1856,x:-72.15,y:135.25,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-63.5572,x:-59.1,y:-12.2,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:72.3674,y:-21.4,regX:-32.5,x:47.85}},{t:this.instance_13,p:{rotation:-25.0074,x:69.95,y:45.85,regY:12.9,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_12,p:{rotation:3.2639,x:144.15,y:2.15,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:-14.8097,x:147.45,y:3.05,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6472,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.2946,x:-4,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4051,x:-42,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9271,x:-30.15,y:90.6}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-5.3599,x:1.4,y:-81.2,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-111.0777,x:-93.55,y:51.3,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-125.9145,x:-69.45,y:134.25,regX:4.5}},{t:this.instance_1,p:{rotation:-112.9012,x:-69.8,y:134.4,scaleX:0.997,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-63.4302,x:-59.1,y:-12.15,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:71.0146,y:-21.4,regX:-32.5,x:47.8}},{t:this.instance_13,p:{rotation:-20.8758,x:71.65,y:45.35,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:7.3959,x:148.7,y:7.1,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:-10.6784,x:151.95,y:8.25,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6472,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3019,x:-4,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4051,x:-42,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9271,x:-30.15,y:90.6}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-5.4638,x:1.4,y:-81.25,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-112.7938,x:-93.7,y:51.3,regX:44.4,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-127.6312,x:-67.05,y:133.55,regX:4.4}},{t:this.instance_1,p:{rotation:-114.6185,x:-67.45,y:133.6,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-63.304,x:-59.1,y:-12.2,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.5,scaleX:0.9976,scaleY:0.9976,rotation:69.6621,y:-21.35,regX:-32.5,x:47.75}},{t:this.instance_13,p:{rotation:-16.7436,x:73.2,y:44.8,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:11.5278,x:152.85,y:12.05,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:-6.546,x:155.95,y:13.35,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6472,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3089,x:-3.95,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4042,x:-42,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9271,x:-30.15,y:90.6}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-5.5668,x:1.45,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-114.5088,x:-93.8,y:51.1,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-129.347,x:-64.8,y:132.6,regX:4.5}},{t:this.instance_1,p:{rotation:-116.3341,x:-65.15,y:132.7,scaleX:0.997,scaleY:0.997,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.5,rotation:-63.1766,x:-58.95,y:-12.25,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:68.3089,y:-21.4,regX:-32.5,x:47.85}},{t:this.instance_13,p:{rotation:-12.6119,x:74.65,y:44.15,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:15.6605,x:156.45,y:17.15,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.9}},{t:this.instance_11,p:{rotation:-2.4144,x:159.55,y:18.85,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6472,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3153,x:-3.95,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4042,x:-42,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9271,x:-30.15,y:90.6}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-5.6707,x:1.45,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.2252,x:-94,y:51.05,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-131.0626,x:-62.45,y:131.55,regX:4.5}},{t:this.instance_1,p:{rotation:-118.0498,x:-62.85,y:131.75,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-63.0492,x:-59.1,y:-12.15,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:66.9571,y:-21.4,regX:-32.5,x:47.8}},{t:this.instance_13,p:{rotation:-8.4793,x:76.2,y:43.5,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:19.7921,x:159.85,y:22.55,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:1.7134,x:162.7,y:24.35,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6472,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3223,x:-3.95,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4042,x:-42,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9271,x:-30.15,y:90.6}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-5.7745,x:1.45,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-117.9408,x:-94.15,y:51,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-132.7785,x:-60.25,y:130.5,regX:4.5}},{t:this.instance_1,p:{rotation:-119.7662,x:-60.6,y:130.65,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-62.9218,x:-59.1,y:-12.1,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.3,scaleX:0.9976,scaleY:0.9976,rotation:65.6048,y:-21.45,regX:-32.5,x:47.9}},{t:this.instance_13,p:{rotation:-4.3484,x:77.85,y:42.9,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:23.9244,x:162.65,y:27.95,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:5.8459,x:165.4,y:29.95,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6472,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3278,x:-3.95,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4042,x:-42,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9271,x:-30.15,y:90.6}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-5.8793,x:1.45,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-119.6569,x:-94.2,y:50.9,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-134.4942,x:-57.95,y:129.45,regX:4.4}},{t:this.instance_1,p:{rotation:-121.4823,x:-58.35,y:129.55,scaleX:0.997,scaleY:0.997,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.5,rotation:-62.796,x:-58.95,y:-12.25,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:64.2518,y:-21.4,regX:-32.5,x:47.75}},{t:this.instance_13,p:{rotation:-0.2165,x:79.3,y:42,regY:12.8,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:28.0574,x:164.95,y:33.45,regY:13.6,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:9.9778,x:167.65,y:35.55,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6472,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3357,x:-4,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4042,x:-42,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9262,x:-30.15,y:90.6}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.7,rotation:-5.9832,x:1.45,y:-81.05,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-121.3719,x:-94.35,y:50.8,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-136.2101,x:-55.7,y:128.2,regX:4.4}},{t:this.instance_1,p:{rotation:-123.1976,x:-56.15,y:128.35,scaleX:0.997,scaleY:0.997,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.5,rotation:-62.669,x:-59,y:-12.3,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:62.9003,y:-21.4,regX:-32.5,x:47.8}},{t:this.instance_13,p:{rotation:3.9116,x:80.75,y:41.35,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:32.1887,x:166.85,y:38.8,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:14.1107,x:169.25,y:41.15,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6472,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3421,x:-4,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4042,x:-42,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9262,x:-30.15,y:90.6}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-6.0855,x:1.45,y:-81.15,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-123.0888,x:-94.45,y:50.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-137.9264,x:-53.65,y:126.95,regX:4.5}},{t:this.instance_1,p:{rotation:-124.9129,x:-53.95,y:127.2,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.1}},{t:this.instance,p:{regX:33.4,rotation:-62.5412,x:-59.1,y:-12.1,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.3,scaleX:0.9976,scaleY:0.9976,rotation:61.5475,y:-21.45,regX:-32.5,x:47.85}},{t:this.instance_13,p:{rotation:8.0444,x:82.2,y:40.65,regY:13,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:36.3204,x:168.3,y:44.25,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:18.2425,x:170.4,y:46.75,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.6}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6472,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3482,x:-4,y:-59.35,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4042,x:-42,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9262,x:-30.15,y:90.6}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-6.1894,x:1.45,y:-81.2,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-124.8049,x:-94.65,y:50.7,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9.1,scaleX:0.9973,scaleY:0.9973,rotation:-139.6411,x:-51.55,y:125.65,regX:4.5}},{t:this.instance_1,p:{rotation:-126.6291,x:-51.75,y:125.85,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.1}},{t:this.instance,p:{regX:33.5,rotation:-62.4142,x:-59.05,y:-12.25,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:60.1944,y:-21.4,regX:-32.5,x:47.85}},{t:this.instance_13,p:{rotation:12.1757,x:83.7,y:39.7,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:40.4531,x:169.25,y:49.6,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:22.374,x:171.25,y:52.25,scaleX:0.9971,scaleY:0.9971,regY:10.5,regX:-10.6}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6472,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3548,x:-3.95,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4042,x:-42,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9262,x:-30.15,y:90.6}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6753,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.7,rotation:-6.2943,x:1.45,y:-81.1,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-126.5198,x:-94.75,y:50.6,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-141.3573,x:-49.4,y:124.15,regX:4.5}},{t:this.instance_1,p:{rotation:-128.3451,x:-49.75,y:124.4,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-62.2872,x:-59.05,y:-12.15,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7725,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:58.8425,y:-21.45,regX:-32.6,x:47.65}},{t:this.instance_13,p:{rotation:16.307,x:85.1,y:38.85,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:44.584,x:169.75,y:54.85,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:26.5051,x:171.65,y:57.7,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6472,x:44.65,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3616,x:-3.9,y:-59.4,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4042,x:-41.95,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9262,x:-30.1,y:90.6}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6753,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.7,rotation:-6.3974,x:1.5,y:-81.1,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-128.2365,x:-94.9,y:50.55,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9.1,scaleX:0.9973,scaleY:0.9973,rotation:-143.0736,x:-47.4,y:122.75,regX:4.5}},{t:this.instance_1,p:{rotation:-130.061,x:-47.65,y:122.9,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-62.1597,x:-59.1,y:-12.1,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7681,x:-9.75,y:48.85}},{t:this.instance_14,p:{regY:13.5,scaleX:0.9976,scaleY:0.9976,rotation:60.1233,y:-21.35,regX:-32.5,x:47.7}},{t:this.instance_13,p:{rotation:18.089,x:83.7,y:39.8,regY:13,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:46.3515,x:167.85,y:58.35,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:28.2544,x:169.7,y:61.15,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6323,x:44.65,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3673,x:-3.95,y:-59.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4147,x:-42,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9315,x:-30.15,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6791,x:27.05,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-6.7995,x:1.5,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-126.1567,x:-95.1,y:50.4,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-140.9988,x:-50.2,y:124.35,regX:4.5}},{t:this.instance_1,p:{rotation:-127.973,x:-50.5,y:124.5,scaleX:0.997,scaleY:0.997,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-62.017,x:-59.05,y:-12.2,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7646,x:-9.8,y:48.85}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:61.4047,y:-21.4,regX:-32.5,x:47.85}},{t:this.instance_13,p:{rotation:19.8707,x:82.45,y:40.5,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:48.1197,x:165.9,y:61.7,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:30.003,x:167.6,y:64.65,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6173,x:44.7,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.375,x:-4,y:-59.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.427,x:-41.95,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9376,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6847,x:27.05,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-7.2028,x:1.5,y:-81.2,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-124.0771,x:-95.2,y:50.35,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-138.9231,x:-53.05,y:125.8,regX:4.5}},{t:this.instance_1,p:{rotation:-125.8876,x:-53.35,y:126,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-61.8747,x:-59.1,y:-12.2,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7602,x:-9.8,y:48.9}},{t:this.instance_14,p:{regY:13.5,scaleX:0.9976,scaleY:0.9976,rotation:62.686,y:-21.3,regX:-32.5,x:47.75}},{t:this.instance_13,p:{rotation:21.6534,x:81.1,y:41.15,regY:12.8,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:49.8877,x:163.8,y:65.05,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:31.7533,x:165.45,y:68.1,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.6023,x:44.65,y:181.6,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3824,x:-4,y:-59.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:0.4393,x:-42,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9429,x:-30.15,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6898,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-7.6046,x:1.5,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-121.9974,x:-95.4,y:50.25,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-136.8469,x:-55.95,y:127.15,regX:4.5}},{t:this.instance_1,p:{rotation:-123.7993,x:-56.35,y:127.35,scaleX:0.997,scaleY:0.997,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.5,rotation:-61.7308,x:-59.05,y:-12.25,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7567,x:-9.8,y:48.9}},{t:this.instance_14,p:{regY:13.3,scaleX:0.9976,scaleY:0.9976,rotation:63.9668,y:-21.5,regX:-32.6,x:47.95}},{t:this.instance_13,p:{rotation:23.4348,x:79.6,y:42,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:51.6548,x:161.6,y:68.4,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:33.5026,x:163.1,y:71.4,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.6}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.5874,x:44.7,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3884,x:-4,y:-59.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4507,x:-42,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9491,x:-30.15,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6953,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-8.0062,x:1.5,y:-81.2,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-119.9169,x:-95.6,y:50.15,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-134.7713,x:-58.9,y:128.45,regX:4.5}},{t:this.instance_1,p:{rotation:-121.7113,x:-59.35,y:128.65,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-61.5892,x:-59.1,y:-12.1,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7523,x:-9.8,y:48.95}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:65.2483,y:-21.35,regX:-32.5,x:47.85}},{t:this.instance_13,p:{rotation:25.2156,x:78.15,y:42.7,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:53.4219,x:159.35,y:71.65,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:35.2512,x:160.8,y:74.75,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.5715,x:44.7,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.3958,x:-3.95,y:-59.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:0.463,x:-42.05,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9552,x:-30.15,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7017,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-8.4097,x:1.4,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-117.8385,x:-95.65,y:50.05,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-132.696,x:-62,y:129.7,regX:4.5}},{t:this.instance_1,p:{rotation:-119.6248,x:-62.35,y:129.85,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-61.4456,x:-59.1,y:-12.15,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7488,x:-9.8,y:48.95}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:66.5291,y:-21.5,regX:-32.6,x:47.85}},{t:this.instance_13,p:{rotation:26.9978,x:76.75,y:43.4,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:55.1897,x:157,y:74.8,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:37.0012,x:158.3,y:78,scaleX:0.9971,scaleY:0.9971,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.5565,x:44.7,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.4027,x:-3.95,y:-59.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4762,x:-42.05,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9614,x:-30.1,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7071,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-8.812,x:1.35,y:-81.15,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-115.7566,x:-95.9,y:50,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-130.6208,x:-65.05,y:130.7,regX:4.5}},{t:this.instance_1,p:{rotation:-117.5372,x:-65.35,y:131.05,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.1}},{t:this.instance,p:{regX:33.4,rotation:-61.3021,x:-59.15,y:-12.15,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7445,x:-9.8,y:48.95}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:67.8108,y:-21.3,regX:-32.5,x:47.85}},{t:this.instance_13,p:{rotation:28.7809,x:75.3,y:44.1,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:56.9565,x:154.45,y:78.05,regY:13.6,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:38.7502,x:155.8,y:81.1,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.5416,x:44.7,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.409,x:-3.95,y:-59.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.4876,x:-42.05,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9667,x:-30.15,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7118,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-9.2155,x:1.4,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-113.6773,x:-96,y:49.9,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-128.5454,x:-68.1,y:131.8,regX:4.4}},{t:this.instance_1,p:{rotation:-115.4497,x:-68.55,y:131.85,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-61.1605,x:-59.15,y:-12.2,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.741,x:-9.8,y:48.95}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:69.0911,y:-21.45,regX:-32.6,x:47.85}},{t:this.instance_13,p:{rotation:30.5618,x:73.8,y:44.75,regY:13,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:58.7241,x:152,y:81.05,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:40.4981,x:153.15,y:84.2,scaleX:0.9971,scaleY:0.9971,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.5266,x:44.75,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.4164,x:-4,y:-59.45,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:0.4999,x:-42.05,y:185.6,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9729,x:-30.15,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7169,x:27.05,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-9.6179,x:1.4,y:-81.2,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-111.5981,x:-96.15,y:49.9,regX:44.4,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-126.4702,x:-71.25,y:132.65,regX:4.4}},{t:this.instance_1,p:{rotation:-113.3628,x:-71.65,y:132.7,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-61.0177,x:-59.1,y:-12.2,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7375,x:-9.8,y:48.95}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:70.3719,y:-21.35,regX:-32.5,x:47.85}},{t:this.instance_13,p:{rotation:32.3445,x:72.4,y:45.15,regY:12.8,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:60.4912,x:149.35,y:84.1,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.8}},{t:this.instance_11,p:{rotation:42.2482,x:150.35,y:87.25,scaleX:0.9971,scaleY:0.9971,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.5116,x:44.9,y:181.55,regX:3.6}},{t:this.instance_9,p:{regY:7.3,rotation:11.4233,x:-4,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.5122,x:-42.1,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9791,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7235,x:27.05,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-10.0195,x:1.35,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-109.5178,x:-96.4,y:49.7,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-124.3944,x:-74.55,y:133.35,regX:4.5}},{t:this.instance_1,p:{rotation:-111.2747,x:-74.9,y:133.5,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-60.8749,x:-59.15,y:-12.15,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.734,x:-9.75,y:49}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:71.654,y:-21.3,regX:-32.5,x:47.85}},{t:this.instance_13,p:{rotation:34.1262,x:70.9,y:45.8,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:62.2595,x:146.65,y:86.9,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:43.9975,x:147.45,y:90.35,scaleX:0.9971,scaleY:0.9971,regY:10.6,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.4967,x:44.8,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.4307,x:-4,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:0.5237,x:-42.1,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9843,x:-30.15,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7288,x:27,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-10.4219,x:1.4,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-107.4381,x:-96.55,y:49.6,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-122.3192,x:-77.75,y:134,regX:4.5}},{t:this.instance_1,p:{rotation:-109.1878,x:-78.15,y:134.2,scaleX:0.9971,scaleY:0.9971,regY:-0.5,regX:14.1}},{t:this.instance,p:{regX:33.5,rotation:-60.7324,x:-59.05,y:-12.25,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7304,x:-9.75,y:49}},{t:this.instance_14,p:{regY:13.5,scaleX:0.9976,scaleY:0.9976,rotation:72.9351,y:-21.4,regX:-32.6,x:47.75}},{t:this.instance_13,p:{rotation:35.9079,x:69.3,y:46.3,regY:12.9,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_12,p:{rotation:64.0274,x:143.85,y:89.75,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:45.7465,x:144.65,y:93.1,scaleX:0.9971,scaleY:0.9971,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.4826,x:44.85,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.4367,x:-3.95,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.5351,x:-42.15,y:185.6,scaleX:0.995,scaleY:0.995}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9905,x:-30.15,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7335,x:26.95,y:85.7,regX:-0.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-10.8239,x:1.4,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-105.3581,x:-96.75,y:49.5,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-120.2433,x:-80.95,y:134.5,regX:4.5}},{t:this.instance_1,p:{rotation:-107.1005,x:-81.35,y:134.6,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-60.5892,x:-59.15,y:-12.15,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7261,x:-9.75,y:49}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:74.2157,y:-21.3,regX:-32.5,x:47.95}},{t:this.instance_13,p:{rotation:37.6897,x:67.8,y:46.8,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:65.795,x:140.85,y:92.4,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.9}},{t:this.instance_11,p:{rotation:47.4949,x:141.75,y:95.9,scaleX:0.9971,scaleY:0.9971,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:3.4676,x:44.9,y:181.55,regX:3.6}},{t:this.instance_9,p:{regY:7.3,rotation:11.4432,x:-3.95,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:0.5474,x:-42.1,y:185.6,scaleX:0.995,scaleY:0.995}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9966,x:-30.15,y:90.7}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7386,x:26.95,y:85.7,regX:-0.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-11.2263,x:1.35,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-103.2789,x:-96.85,y:49.4,regX:44.5,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-118.1679,x:-84.15,y:135.05,regX:4.4}},{t:this.instance_1,p:{rotation:-105.0135,x:-84.6,y:135.15,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.5,rotation:-60.446,x:-59.1,y:-12.3,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7226,x:-9.75,y:49}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:75.4966,y:-21.3,regX:-32.5,x:47.95}},{t:this.instance_13,p:{rotation:39.4712,x:66.25,y:47.35,regY:13,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:67.5622,x:138.05,y:95.25,regY:13.5,scaleX:0.9973,scaleY:0.9973,regX:-7.8}},{t:this.instance_11,p:{rotation:49.2444,x:138.55,y:98.55,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.6}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:3.4517,x:44.95,y:181.55,regX:3.6}},{t:this.instance_9,p:{regY:7.3,rotation:11.4501,x:-3.95,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:0.5588,x:-42.15,y:185.6,scaleX:0.995,scaleY:0.995}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:4.0028,x:-30.25,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7442,x:26.95,y:85.7,regX:-0.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-11.6303,x:1.4,y:-81.25,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-101.1989,x:-96.9,y:49.25,regX:44.5,regY:7.5}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-116.0934,x:-87.5,y:135.25,regX:4.5}},{t:this.instance_1,p:{rotation:-102.9256,x:-87.9,y:135.35,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.4,rotation:-60.3043,x:-59.15,y:-12.15,scaleX:0.9975,scaleY:0.9975}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7182,x:-9.75,y:49}},{t:this.instance_14,p:{regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:76.7787,y:-21.3,regX:-32.5,x:48}},{t:this.instance_13,p:{rotation:41.2536,x:64.8,y:47.6,regY:12.9,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_12,p:{rotation:69.3294,x:134.85,y:97.85,regY:13.5,scaleX:0.9972,scaleY:0.9972,regX:-7.9}},{t:this.instance_11,p:{rotation:50.9942,x:135.5,y:101.25,scaleX:0.9972,scaleY:0.9972,regY:10.5,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:3.4359,x:44.85,y:181.55,regX:3.5}},{t:this.instance_9,p:{regY:7.3,rotation:11.4575,x:-3.95,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:0.5711,x:-42.15,y:185.65,scaleX:0.9951,scaleY:0.9951}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:4.008,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7503,x:27,y:85.7,regX:-0.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.7,rotation:-12.0303,x:1.35,y:-81.15,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-99.119,x:-97.1,y:49.35,regX:44.4,regY:7.4}},{t:this.instance_2,p:{regY:-9,scaleX:0.9973,scaleY:0.9973,rotation:-114.0179,x:-90.9,y:135.4,regX:4.5}},{t:this.instance_1,p:{rotation:-100.8382,x:-91.25,y:135.5,scaleX:0.9971,scaleY:0.9971,regY:-0.4,regX:14.2}},{t:this.instance,p:{regX:33.5,rotation:-60.1617,x:-59.05,y:-12.25,scaleX:0.9975,scaleY:0.9975}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118.2,-212.3,325.1,509.6);


(lib.CharacterCivilian_08_button = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-54.65,-76.4,0.9975,0.9975,-60.0842,0,0,33.4,10.2);

	this.instance_1 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1.setTransform(-87.15,71.25,0.9971,0.9971,-100.7599,0,0,14.2,-0.4);

	this.instance_2 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2.setTransform(-86.7,71.15,0.9974,0.9974,-113.7705,0,0,4.5,-9);

	this.instance_3 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_3.setTransform(-92.8,-15.1,0.9974,0.9974,-98.9366,0,0,44.5,7.4);

	this.instance_4 = new lib.ch1_headcopy3_1("synched",0);
	this.instance_4.setTransform(5.75,-145.45,0.9981,0.9981,-11.862,0,0,2,50.7);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-2.85,-100.25,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_6.setTransform(31.55,21.5,0.9947,0.9947,-13.6764,0,0,-0.4,4.9);

	this.instance_7 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_7.setTransform(-25.75,26.5,0.9956,0.9956,3.9312,0,0,1.4,-41.9);

	this.instance_8 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_8.setTransform(-37.6,121.45,0.9951,0.9951,0.4085,0,0,0.7,-51.1);

	this.instance_9 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_9.setTransform(0.45,-123.8,0.9982,0.9982,11.3494,0,0,-1.4,7.3);

	this.instance_10 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(49.2,117.4,0.9948,0.9948,3.6505,0,0,3.5,-50.6);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(139.6,37.3,0.9972,0.9972,51.5682,0,0,-10.5,10.5);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(139.1,33.9,0.9973,0.9973,69.6456,0,0,-7.8,13.5);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(69.05,-16.45,0.9974,0.9974,41.3706,0,0,-45.6,12.9);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(52.55,-85.45,0.9977,0.9977,76.9908,0,0,-32.5,13.4);

	this.instance_15 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_15.setTransform(-5.3,-15.25,0.9995,0.9995,1.7768,0,0,-4.5,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_16 = new lib.CharacterCivilian_08_interact();
	this.instance_16.setTransform(25.1,-25.15,1,1,0,0,0,20.6,39.1);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-121.6,-276.4,293.4,509.5);


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
	this.instance.setTransform(-59.1,-12.2,0.9975,0.9975,-60.0842,0,0,33.5,10.2);

	this.instance_1 = new lib.ch1_hand_rcopy_1("synched",0);
	this.instance_1.setTransform(-91.65,135.5,0.9971,0.9971,-100.7599,0,0,14.2,-0.4);

	this.instance_2 = new lib.ch1_thumb_rcopy_1("synched",0);
	this.instance_2.setTransform(-91.2,135.4,0.9974,0.9974,-113.7705,0,0,4.5,-9);

	this.instance_3 = new lib.ch1_lArm_rcopy_1("synched",0);
	this.instance_3.setTransform(-97.3,49.15,0.9974,0.9974,-98.9366,0,0,44.5,7.4);

	this.instance_4 = new lib.ch1_headcopy_3("synched",0);
	this.instance_4.setTransform(1.25,-81.2,0.9981,0.9981,-11.862,0,0,2,50.7);

	this.instance_5 = new lib.ch1_uBodycopy_1("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy_1("synched",0);
	this.instance_6.setTransform(27.05,85.75,0.9947,0.9947,-13.6764,0,0,-0.4,4.9);

	this.instance_7 = new lib.ch1_uLeg_rcopy_1("synched",0);
	this.instance_7.setTransform(-30.25,90.75,0.9956,0.9956,3.9312,0,0,1.4,-41.9);

	this.instance_8 = new lib.ch1_lLeg_rcopy_1("synched",0);
	this.instance_8.setTransform(-42.1,185.7,0.9951,0.9951,0.4085,0,0,0.7,-51.1);

	this.instance_9 = new lib.ch1_neckcopy_1("synched",0);
	this.instance_9.setTransform(-4.05,-59.45,0.9982,0.9982,11.3494,0,0,-1.4,7.4);

	this.instance_10 = new lib.ch1_lLeg_lcopy_1("synched",0);
	this.instance_10.setTransform(44.7,181.65,0.9948,0.9948,3.6505,0,0,3.5,-50.6);

	this.instance_11 = new lib.ch1_hand_lcopy_1("synched",0);
	this.instance_11.setTransform(135.1,101.55,0.9972,0.9972,51.5682,0,0,-10.5,10.5);

	this.instance_12 = new lib.ch1_thumb_lcopy_1("synched",0);
	this.instance_12.setTransform(134.6,98.15,0.9973,0.9973,69.6456,0,0,-7.8,13.5);

	this.instance_13 = new lib.ch1_lArm_lcopy_1("synched",0);
	this.instance_13.setTransform(64.55,47.8,0.9974,0.9974,41.3706,0,0,-45.6,12.9);

	this.instance_14 = new lib.ch1_uArm_lcopy_1("synched",0);
	this.instance_14.setTransform(48,-21.25,0.9977,0.9977,76.9908,0,0,-32.6,13.5);

	this.instance_15 = new lib.ch1_lBodycopy_1("synched",0);
	this.instance_15.setTransform(-9.8,49,0.9995,0.9995,1.7768,0,0,-4.5,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{rotation:1.7768,x:-9.8,y:49}},{t:this.instance_14,p:{regX:-32.6,regY:13.5,scaleX:0.9977,scaleY:0.9977,rotation:76.9908,x:48,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:41.3706,x:64.55,y:47.8,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:69.6456,x:134.6,y:98.15,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:51.5682,x:135.1,y:101.55,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:3.6505,y:181.65,regY:-50.6,regX:3.5,x:44.7}},{t:this.instance_9,p:{regY:7.4,rotation:11.3494,x:-4.05,y:-59.45,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.4085,x:-42.1,y:185.7,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9956,scaleY:0.9956,rotation:3.9312,x:-30.25,y:90.75}},{t:this.instance_6,p:{scaleX:0.9947,scaleY:0.9947,rotation:-13.6764,x:27.05,y:85.75,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.7,rotation:-11.862,x:1.25,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-98.9366,x:-97.3,y:49.15,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9974,scaleY:0.9974,rotation:-113.7705,x:-91.2,y:135.4,regY:-9}},{t:this.instance_1,p:{rotation:-100.7599,x:-91.65,y:135.5,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.5,rotation:-60.0842,x:-59.1,y:-12.2}}]}).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.7,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:79.8243,x:47.95,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:43.6586,x:61.15,y:48.5,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:71.9346,x:129,y:101.55,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.6,rotation:53.8573,x:129.3,y:105.1,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:2.518,y:181.6,regY:-50.6,regX:3.5,x:44.7}},{t:this.instance_9,p:{regY:7.3,rotation:11.3527,x:-4,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:0.7644,x:-42.05,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9297,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-11.5185,x:1.35,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-100.4627,x:-94.6,y:50.7,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9973,scaleY:0.9973,rotation:-115.2975,x:-86.25,y:136.95,regY:-9}},{t:this.instance_1,p:{rotation:-102.2872,x:-86.6,y:136.95,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-62.5549,x:-59.15,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.7,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:82.6579,x:47.95,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:45.9471,x:57.7,y:49.05,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:74.2227,x:123.4,y:104.8,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.6,rotation:56.1446,x:123.55,y:108.35,scaleX:0.9971,scaleY:0.9971,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:1.3844,y:181.75,regY:-50.5,regX:3.5,x:44.7}},{t:this.instance_9,p:{regY:7.3,rotation:11.3572,x:-4,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:1.1221,x:-42.05,y:185.5,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9297,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-11.1708,x:1.35,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-101.9925,x:-91.85,y:52.2,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-116.8273,x:-81.25,y:138.05,regY:-9}},{t:this.instance_1,p:{rotation:-103.8157,x:-81.6,y:138.2,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-65.025,x:-59.2,y:-12.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.7,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:85.4909,x:47.95,y:-21.2}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:48.2366,x:54.2,y:49.45,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:76.5126,x:117.65,y:107.8,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:58.4352,x:117.8,y:111.35,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:0.2514,y:181.55,regY:-50.6,regX:3.5,x:44.7}},{t:this.instance_9,p:{regY:7.3,rotation:11.3625,x:-4,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:1.4798,x:-42.1,y:185.5,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9297,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-10.8255,x:1.35,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-103.5224,x:-89.05,y:53.55,regY:7.5,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-118.3561,x:-76.15,y:139,regY:-9}},{t:this.instance_1,p:{rotation:-105.3443,x:-76.6,y:139.2,regY:-0.5,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-67.4969,x:-59.1,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.7,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:88.3241,x:48,y:-21.2}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.5256,x:50.7,y:49.7,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:78.8013,x:111.75,y:110.4,regX:-7.9,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:60.7237,x:111.7,y:113.95,scaleX:0.9971,scaleY:0.9971,regX:-10.6}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-0.8763,y:181.55,regY:-50.6,regX:3.6,x:44.8}},{t:this.instance_9,p:{regY:7.3,rotation:11.3661,x:-4,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:1.8375,x:-42.05,y:185.6,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9297,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-10.4807,x:1.3,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-105.0494,x:-86.15,y:54.85,regY:7.5,regX:44.4}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-119.8851,x:-71,y:139.9,regY:-9}},{t:this.instance_1,p:{rotation:-106.8739,x:-71.35,y:140,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-69.9664,x:-59.1,y:-12.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.7,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:91.1525,x:48,y:-21.15}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:52.8142,x:47.2,y:49.75,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:81.0897,x:105.8,y:112.95,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:63.0115,x:105.5,y:116.35,scaleX:0.9972,scaleY:0.9972,regX:-10.6}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-2.0104,y:181.65,regY:-50.5,regX:3.6,x:44.8}},{t:this.instance_9,p:{regY:7.3,rotation:11.3706,x:-4,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:2.1954,x:-42.1,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9289,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-10.1362,x:1.35,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-106.579,x:-83.35,y:55.9,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-121.4148,x:-65.8,y:140.6,regY:-9}},{t:this.instance_1,p:{rotation:-108.4031,x:-66.15,y:140.7,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-72.4357,x:-59.1,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.7,y:48.95}},{t:this.instance_14,p:{regX:-32.6,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:93.9855,x:47.95,y:-21.35}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:55.1023,x:43.7,y:49.55,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:83.3788,x:99.7,y:115.05,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:65.3009,x:99.4,y:118.55,scaleX:0.9971,scaleY:0.9971,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-3.1436,y:181.55,regY:-50.6,regX:3.6,x:44.8}},{t:this.instance_9,p:{regY:7.3,rotation:11.3761,x:-4.05,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:2.5542,x:-42.05,y:185.7,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9289,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-9.7911,x:1.35,y:-81.25,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-108.1065,x:-80.35,y:56.85,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9973,scaleY:0.9973,rotation:-122.9436,x:-60.6,y:141.15,regY:-9.1}},{t:this.instance_1,p:{rotation:-109.9322,x:-60.9,y:141.35,regY:-0.4,regX:14.1,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-74.9082,x:-59.15,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7751,x:-9.7,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:96.8192,x:48,y:-21.2}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:57.3914,x:40.2,y:49.3,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:85.6677,x:93.55,y:117,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:67.5905,x:93.05,y:120.4,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-4.2754,y:181.55,regY:-50.6,regX:3.5,x:44.65}},{t:this.instance_9,p:{regY:7.3,rotation:11.3816,x:-4.05,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:2.9122,x:-42,y:185.6,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9289,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-9.4453,x:1.35,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9974,rotation:-109.6356,x:-77.35,y:57.65,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9973,scaleY:0.9973,rotation:-124.4729,x:-55.3,y:141.5,regY:-9}},{t:this.instance_1,p:{rotation:-111.4601,x:-55.7,y:141.45,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-77.3774,x:-59.05,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.75,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:99.6525,x:48,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:59.6791,x:36.65,y:48.85,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:87.9561,x:87.3,y:118.65,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:69.8777,x:86.65,y:121.9,scaleX:0.9972,scaleY:0.9972,regX:-10.6}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-5.408,y:181.55,regY:-50.6,regX:3.5,x:44.65}},{t:this.instance_9,p:{regY:7.3,rotation:11.386,x:-4.05,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:3.2703,x:-42.1,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9289,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-9.1001,x:1.35,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-111.1643,x:-74.25,y:58.45,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-126.0017,x:-50.1,y:141.45,regY:-9}},{t:this.instance_1,p:{rotation:-112.9888,x:-50.5,y:141.6,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-79.8482,x:-59.15,y:-12.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.75,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:102.4853,x:48,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:61.9682,x:33.35,y:48.1,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:90.2402,x:81.1,y:119.9,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:72.1667,x:80.3,y:123.3,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-6.5426,y:181.55,regY:-50.6,regX:3.5,x:44.6}},{t:this.instance_9,p:{regY:7.3,rotation:11.3914,x:-4,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:3.6277,x:-42.1,y:185.6,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.928,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6757,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-8.7552,x:1.35,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-112.6932,x:-71.25,y:59,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-127.5307,x:-44.8,y:141.35,regY:-9}},{t:this.instance_1,p:{rotation:-114.5177,x:-45.2,y:141.5,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-82.3185,x:-59.05,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.75,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:105.3178,x:47.95,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:64.2566,x:29.85,y:47.4,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:92.5291,x:74.75,y:121,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:74.4564,x:73.8,y:124.25,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-7.6754,y:181.55,regY:-50.6,regX:3.5,x:44.65}},{t:this.instance_9,p:{regY:7.3,rotation:11.3958,x:-3.95,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:3.9852,x:-42,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.928,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-8.4097,x:1.35,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-114.2228,x:-68.1,y:59.5,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-129.0592,x:-39.55,y:141,regY:-9}},{t:this.instance_1,p:{rotation:-116.0474,x:-39.85,y:141.3,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.5,rotation:-84.7891,x:-59,y:-12.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.75,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:108.1525,x:47.95,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:66.5447,x:26.5,y:46.4,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:94.8177,x:68.4,y:121.7,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:76.7438,x:67.35,y:125,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.8069,y:181.5,regY:-50.6,regX:3.5,x:44.65}},{t:this.instance_9,p:{regY:7.3,rotation:11.3994,x:-3.95,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:4.343,x:-42.05,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.928,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-8.0654,x:1.4,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-115.7516,x:-65.05,y:59.85,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9973,scaleY:0.9973,rotation:-130.5878,x:-34.2,y:140.7,regY:-9}},{t:this.instance_1,p:{rotation:-117.5753,x:-34.6,y:140.8,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-87.2591,x:-59,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.75,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:110.9838,x:48,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:68.8347,x:23.2,y:45.2,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:97.1069,x:62,y:122.2,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.6,rotation:79.0324,x:60.75,y:125.4,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-9.9409,y:181.5,regY:-50.6,regX:3.5,x:44.65}},{t:this.instance_9,p:{regY:7.3,rotation:11.4039,x:-3.95,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:4.7015,x:-42.05,y:185.55,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.928,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.7,rotation:-7.7194,x:1.4,y:-81.1,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-117.2801,x:-62,y:60,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-132.1165,x:-29,y:139.85,regY:-9}},{t:this.instance_1,p:{rotation:-119.1046,x:-29.4,y:140.15,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-89.73,x:-59.05,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.75,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.5,scaleX:0.9976,scaleY:0.9976,rotation:113.8182,x:47.95,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:71.1235,x:20,y:43.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:99.3943,x:55.5,y:122.35,regX:-7.8,regY:13.6}},{t:this.instance_11,p:{regY:10.5,rotation:81.3221,x:54.4,y:125.55,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-11.0734,y:181.55,regY:-50.6,regX:3.5,x:44.6}},{t:this.instance_9,p:{regY:7.3,rotation:11.409,x:-3.95,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:5.0596,x:-42,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9271,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.7,rotation:-7.3742,x:1.4,y:-81.15,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-118.8088,x:-58.85,y:60,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-133.6455,x:-23.8,y:139.1,regY:-9}},{t:this.instance_1,p:{rotation:-120.6326,x:-24.1,y:139.25,regY:-0.4,regX:14.2,scaleX:0.997,scaleY:0.997}},{t:this.instance,p:{regX:33.4,rotation:-92.1961,x:-59.05,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7742,x:-9.75,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:116.6517,x:47.95,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:73.4117,x:16.65,y:42.4,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:101.6844,x:49.35,y:122.25,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:83.611,x:47.9,y:125.35,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-12.2059,y:181.5,regY:-50.6,regX:3.5,x:44.6}},{t:this.instance_9,p:{regY:7.3,rotation:11.4144,x:-3.95,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:5.416,x:-42,y:185.6,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9271,x:-30.15,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6749,x:26.95,y:85.6,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-7.0289,x:1.45,y:-81.3,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-120.3379,x:-55.75,y:59.95,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-135.1742,x:-18.6,y:138,regY:-9}},{t:this.instance_1,p:{rotation:-122.1614,x:-18.95,y:138.25,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-94.6672,x:-58.95,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7699,x:-9.75,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:113.9927,x:48.05,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:71.2682,x:19.65,y:43.85,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:99.5269,x:55.25,y:122.35,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:81.4374,x:54,y:125.5,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-11.1629,y:181.5,regY:-50.6,regX:3.5,x:44.6}},{t:this.instance_9,p:{regY:7.3,rotation:11.4173,x:-4,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:5.0931,x:-42.05,y:185.6,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9315,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6791,x:27.05,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.7,rotation:-7.3634,x:1.45,y:-81.15,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-118.9234,x:-58.6,y:60.05,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-133.7639,x:-23.4,y:139,regY:-9}},{t:this.instance_1,p:{rotation:-120.7415,x:-23.75,y:139.25,regY:-0.4,regX:14.2,scaleX:0.997,scaleY:0.997}},{t:this.instance,p:{regX:33.4,rotation:-92.3663,x:-59.05,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7664,x:-9.8,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:111.3342,x:47.95,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:69.1242,x:22.8,y:45.1,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:97.3693,x:61.25,y:122.2,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:79.2611,x:60.1,y:125.4,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-10.1202,y:181.55,regY:-50.6,regX:3.5,x:44.65}},{t:this.instance_9,p:{regY:7.3,rotation:11.4197,x:-4,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:4.7704,x:-42.05,y:185.6,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9376,x:-30.25,y:90.7}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6836,x:27.05,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-7.6966,x:1.35,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-117.5095,x:-61.5,y:60.05,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-132.3535,x:-28.25,y:139.85,regY:-9}},{t:this.instance_1,p:{rotation:-119.3185,x:-28.65,y:140,regY:-0.4,regX:14.2,scaleX:0.997,scaleY:0.997}},{t:this.instance,p:{regX:33.4,rotation:-90.0649,x:-59.05,y:-12.1}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7629,x:-9.8,y:48.95}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:108.6758,x:48.05,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:66.9806,x:25.75,y:46.2,regY:13}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:95.2129,x:67.15,y:121.85,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:77.0877,x:66.15,y:125.15,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-9.0773,y:181.5,regY:-50.6,regX:3.5,x:44.65}},{t:this.instance_9,p:{regY:7.3,rotation:11.4233,x:-4,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:4.4469,x:-42.1,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9429,x:-30.2,y:90.7}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6892,x:27.05,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-8.0289,x:1.4,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.0942,x:-64.35,y:59.85,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-130.9433,x:-33.2,y:140.5,regY:-9}},{t:this.instance_1,p:{rotation:-117.8973,x:-33.45,y:140.8,regY:-0.4,regX:14.1,scaleX:0.997,scaleY:0.997}},{t:this.instance,p:{regX:33.4,rotation:-87.7688,x:-59,y:-12.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7585,x:-9.8,y:49}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:106.0168,x:48,y:-21.2}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:64.8362,x:29,y:47.1,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:93.054,x:73.1,y:121.25,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:74.9128,x:72.25,y:124.5,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-8.0339,y:181.5,regY:-50.6,regX:3.5,x:44.65}},{t:this.instance_9,p:{regY:7.3,rotation:11.4262,x:-4,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:4.1244,x:-42.05,y:185.6,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9482,x:-30.2,y:90.7}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6936,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-8.362,x:1.35,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-114.6794,x:-67.3,y:59.55,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.4,scaleX:0.9973,scaleY:0.9973,rotation:-129.5326,x:-37.95,y:141,regY:-9}},{t:this.instance_1,p:{rotation:-116.4764,x:-38.35,y:141.2,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-85.4682,x:-59.05,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.755,x:-9.8,y:49}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:103.3582,x:47.95,y:-21.2}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:62.6924,x:32.2,y:47.95,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:90.8977,x:79.05,y:120.3,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:72.7382,x:78.3,y:123.6,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-6.9914,y:181.65,regY:-50.5,regX:3.5,x:44.7}},{t:this.instance_9,p:{regY:7.3,rotation:11.4286,x:-4,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:3.8012,x:-42.1,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9535,x:-30.15,y:90.7}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.699,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-8.6967,x:1.35,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-113.2647,x:-70.15,y:59.15,regY:7.5,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-128.1223,x:-42.9,y:141.25,regY:-9}},{t:this.instance_1,p:{rotation:-115.0532,x:-43.3,y:141.4,regY:-0.4,regX:14.2,scaleX:0.997,scaleY:0.997}},{t:this.instance,p:{regX:33.5,rotation:-83.1674,x:-59.1,y:-12.25}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7515,x:-9.8,y:49}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:100.7003,x:47.9,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:60.5477,x:35.4,y:48.65,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:88.7445,x:85.05,y:119.1,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:70.5641,x:84.3,y:122.55,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-5.9468,y:181.55,regY:-50.6,regX:3.5,x:44.7}},{t:this.instance_9,p:{regY:7.3,rotation:11.4314,x:-4,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:3.478,x:-42.1,y:185.6,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9588,x:-30.2,y:90.7}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7045,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.7,rotation:-9.0291,x:1.4,y:-81.15,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-111.8507,x:-73,y:58.65,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-126.7119,x:-47.85,y:141.4,regY:-9}},{t:this.instance_1,p:{rotation:-113.6325,x:-48.2,y:141.6,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-80.8669,x:-59.05,y:-12.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.748,x:-9.8,y:49}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:98.0409,x:48,y:-21.2}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:58.4036,x:38.65,y:49.15,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:86.5868,x:90.8,y:117.7,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:68.3899,x:90.35,y:121.1,scaleX:0.9971,scaleY:0.9971,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-4.904,y:181.5,regY:-50.6,regX:3.5,x:44.7}},{t:this.instance_9,p:{regY:7.3,rotation:11.4352,x:-4,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:3.155,x:-42.1,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.965,x:-30.15,y:90.7}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7096,x:27,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.7,rotation:-9.363,x:1.3,y:-81.1,scaleX:0.9981,scaleY:0.9981,regX:1.9}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-110.4365,x:-75.95,y:58.05,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-125.3013,x:-52.8,y:141.5,regY:-9.1}},{t:this.instance_1,p:{rotation:-112.2117,x:-53.05,y:141.55,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-78.5677,x:-59.1,y:-12.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7436,x:-9.8,y:49}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:95.3827,x:48,y:-21.2}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:56.2603,x:41.95,y:49.45,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:84.4305,x:96.65,y:116.1,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:66.2148,x:96.25,y:119.5,scaleX:0.9972,scaleY:0.9972,regX:-10.6}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-3.8621,y:181.55,regY:-50.6,regX:3.5,x:44.7}},{t:this.instance_9,p:{regY:7.3,rotation:11.4376,x:-3.95,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:2.8321,x:-42.15,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9702,x:-30.15,y:90.7}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7143,x:27.05,y:85.65,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-9.6969,x:1.25,y:-81.15,scaleX:0.998,scaleY:0.998,regX:1.9}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-109.0221,x:-78.65,y:57.3,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-123.8909,x:-57.6,y:141.15,regY:-9}},{t:this.instance_1,p:{rotation:-110.7892,x:-57.95,y:141.35,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-76.2658,x:-59.1,y:-12.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7401,x:-9.8,y:49}},{t:this.instance_14,p:{regX:-32.6,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:92.7239,x:48,y:-21.35}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:54.116,x:45.3,y:49.7,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:82.2725,x:102.35,y:114.25,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:64.0396,x:102.15,y:117.75,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-2.8189,y:181.65,regY:-50.5,regX:3.6,x:44.9}},{t:this.instance_9,p:{regY:7.3,rotation:11.4403,x:-3.95,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:2.5084,x:-42.1,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9755,x:-30.2,y:90.7}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.719,x:27.05,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-10.0303,x:1.35,y:-81.2,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-107.6066,x:-81.3,y:56.45,regY:7.5,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-122.4804,x:-62.45,y:140.85,regY:-9}},{t:this.instance_1,p:{rotation:-109.368,x:-62.9,y:141.05,regY:-0.5,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-73.9647,x:-59.1,y:-12.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7366,x:-9.8,y:49}},{t:this.instance_14,p:{regX:-32.5,regY:13.3,scaleX:0.9976,scaleY:0.9976,rotation:90.0657,x:48.1,y:-21.2}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:51.9723,x:48.55,y:49.8,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:80.1155,x:108,y:112.1,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:61.8656,x:107.95,y:115.55,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-1.7756,y:181.55,regY:-50.6,regX:3.6,x:44.9}},{t:this.instance_9,p:{regY:7.3,rotation:11.4422,x:-3.95,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:2.1857,x:-42.15,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9808,x:-30.2,y:90.7}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7252,x:27.05,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.7,rotation:-10.3638,x:1.35,y:-81.1,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-106.1926,x:-84.15,y:55.7,regY:7.4,regX:44.4}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-121.0699,x:-67.35,y:140.45,regY:-9.1}},{t:this.instance_1,p:{rotation:-107.9461,x:-67.65,y:140.55,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-71.6643,x:-59.1,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7331,x:-9.75,y:49}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:87.4103,x:47.95,y:-21.25}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.8292,x:51.7,y:49.65,regY:13}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:77.9573,x:113.65,y:109.75,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.6,rotation:59.6905,x:113.6,y:113.2,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:-0.7321,y:181.5,regY:-50.6,regX:3.5,x:44.8}},{t:this.instance_9,p:{regY:7.3,rotation:11.4465,x:-3.95,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:1.863,x:-42.1,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9861,x:-30.15,y:90.7}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7297,x:27.05,y:85.7,regX:-0.4}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-10.6973,x:1.35,y:-81.2,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-104.7781,x:-86.9,y:54.45,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-119.6593,x:-72.1,y:139.75,regY:-9}},{t:this.instance_1,p:{rotation:-106.5261,x:-72.5,y:139.8,regY:-0.4,regX:14.2,scaleX:0.997,scaleY:0.997}},{t:this.instance,p:{regX:33.4,rotation:-69.364,x:-59.15,y:-12.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7296,x:-9.75,y:49}},{t:this.instance_14,p:{regX:-32.6,regY:13.3,scaleX:0.9976,scaleY:0.9976,rotation:84.7537,x:48.15,y:-21.4}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:47.6849,x:55.2,y:49.3,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:75.8013,x:119.15,y:107.05,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:57.5166,x:119.15,y:110.5,scaleX:0.9971,scaleY:0.9971,regX:-10.6}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:0.3076,y:181.5,regY:-50.6,regX:3.5,x:44.8}},{t:this.instance_9,p:{regY:7.3,rotation:11.4484,x:-3.95,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:1.5404,x:-42.2,y:185.5,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9923,x:-30.15,y:90.7}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7344,x:26.95,y:85.7,regX:-0.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-11.0308,x:1.35,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-103.3635,x:-89.5,y:53.3,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9974,scaleY:0.9974,rotation:-118.2498,x:-76.85,y:138.9,regY:-9}},{t:this.instance_1,p:{rotation:-105.1026,x:-77.35,y:139.05,regY:-0.5,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.5,rotation:-67.0628,x:-59.1,y:-12.3}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7261,x:-9.75,y:49}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:82.0946,x:48,y:-21.15}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:45.5405,x:58.4,y:49,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:73.643,x:124.5,y:104.25,regX:-7.8,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:55.3431,x:124.85,y:107.7,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:1.3492,y:181.7,regY:-50.5,regX:3.6,x:44.95}},{t:this.instance_9,p:{regY:7.3,rotation:11.4522,x:-3.95,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:1.2179,x:-42.1,y:185.55,regY:-51.2}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9975,x:-30.25,y:90.7}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7386,x:26.95,y:85.7,regX:-0.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-11.364,x:1.35,y:-81.25,scaleX:0.998,scaleY:0.998,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-101.9488,x:-92.25,y:52,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-116.8379,x:-81.65,y:137.85,regY:-9}},{t:this.instance_1,p:{rotation:-103.6822,x:-82.05,y:138,regY:-0.5,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-64.7627,x:-59.15,y:-12.15}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7226,x:-9.75,y:49}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:79.4358,x:48,y:-21.2}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:43.3969,x:61.6,y:48.4,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9973,scaleY:0.9973,rotation:71.486,x:129.75,y:101.1,regX:-7.9,regY:13.5}},{t:this.instance_11,p:{regY:10.6,rotation:53.1678,x:130.1,y:104.7,scaleX:0.9971,scaleY:0.9971,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:2.3939,y:181.55,regY:-50.6,regX:3.5,x:44.85}},{t:this.instance_9,p:{regY:7.3,rotation:11.4537,x:-3.95,y:-59.5,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{scaleX:0.995,scaleY:0.995,rotation:0.8936,x:-42.15,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:4.0028,x:-30.25,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7444,x:26.95,y:85.7,regX:-0.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.6,rotation:-11.6984,x:1.35,y:-81.25,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9973,scaleY:0.9973,rotation:-100.5337,x:-94.7,y:50.65,regY:7.4,regX:44.5}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-115.4281,x:-86.3,y:136.75,regY:-9}},{t:this.instance_1,p:{rotation:-102.2596,x:-86.6,y:136.85,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.4,rotation:-62.4612,x:-59.15,y:-12.2}}]},1).to({state:[{t:this.instance_15,p:{rotation:1.7182,x:-9.75,y:49}},{t:this.instance_14,p:{regX:-32.5,regY:13.4,scaleX:0.9976,scaleY:0.9976,rotation:76.7787,x:48,y:-21.3}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:41.2536,x:64.8,y:47.6,regY:12.9}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:69.3294,x:134.8,y:97.8,regX:-7.9,regY:13.5}},{t:this.instance_11,p:{regY:10.5,rotation:50.9942,x:135.5,y:101.25,scaleX:0.9972,scaleY:0.9972,regX:-10.5}},{t:this.instance_10,p:{scaleX:0.9948,scaleY:0.9948,rotation:3.4359,y:181.55,regY:-50.6,regX:3.5,x:44.85}},{t:this.instance_9,p:{regY:7.3,rotation:11.4575,x:-3.95,y:-59.5,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{scaleX:0.9951,scaleY:0.9951,rotation:0.5711,x:-42.15,y:185.65,regY:-51.1}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:4.008,x:-30.2,y:90.65}},{t:this.instance_6,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.7503,x:27,y:85.7,regX:-0.5}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.7,rotation:-12.0303,x:1.35,y:-81.15,scaleX:0.9981,scaleY:0.9981,regX:2}},{t:this.instance_3,p:{scaleX:0.9974,scaleY:0.9974,rotation:-99.119,x:-97.1,y:49.35,regY:7.4,regX:44.4}},{t:this.instance_2,p:{regX:4.5,scaleX:0.9973,scaleY:0.9973,rotation:-114.0179,x:-90.95,y:135.4,regY:-9}},{t:this.instance_1,p:{rotation:-100.8382,x:-91.25,y:135.5,regY:-0.4,regX:14.2,scaleX:0.9971,scaleY:0.9971}},{t:this.instance,p:{regX:33.5,rotation:-60.1617,x:-59.05,y:-12.25}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118.2,-212.3,284.6,509.8);


// stage content:
(lib.LessonChapter1_05 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,200];
	this.streamSoundSymbolsList[0] = [{id:"beforewar2edit_05wav",startFrame:0,endFrame:201,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("beforewar2edit_05wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,201,1);
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
			document.location.replace("/LessonChapter1_06.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("/LessonChapter1_04.html");
			}, 500);
			
		}
		
		
		this.replaybtn.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_200 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(200).call(this.frame_200).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_1689();
	this.instance.setTransform(195.55,597,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1688();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(201));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn},{t:this.replaybtn}]}).wait(201));

	// interaction
	this.instance_2 = new lib.CharacterCivilian_08_button();
	this.instance_2.setTransform(461.95,418.1,0.5746,0.5745,0,0,0,0,0.1);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 1);

	this.instance_3 = new lib.characterCivilian_09_button();
	this.instance_3.setTransform(840.25,380,1.3049,1.3048);
	new cjs.ButtonHelper(this.instance_3, 0, 1, 1);

	this.instance_4 = new lib.camel_01_button();
	this.instance_4.setTransform(1081.6,355.45,1.459,1.459);
	new cjs.ButtonHelper(this.instance_4, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]},200).wait(1));

	// people2
	this.instance_5 = new lib.CharacterCivilian_08();
	this.instance_5.setTransform(164.9,405.75,0.5746,0.5746,0,0,0,-4.5,40.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({x:461.95,y:404.2},199).to({_off:true},1).wait(1));

	// people1
	this.instance_6 = new lib.CharacterCivilian_09();
	this.instance_6.setTransform(1059,406.1,0.5762,0.5762,0,0,180,-5.2,40.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({x:835.15},199).to({_off:true},1).wait(1));

	// camel1
	this.instance_7 = new lib.camel_01();
	this.instance_7.setTransform(1138.5,277.4,1.4589,1.4589,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({x:958.95},199).to({_off:true},1).wait(1));

	// Background
	this.instance_8 = new lib.Chap1Scene5();

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(201));

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
		{src:"images/LessonChapter1_05_atlas_1.png", id:"LessonChapter1_05_atlas_1"},
		{src:"sounds/beforewar2edit_05wav.mp3", id:"beforewar2edit_05wav"},
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