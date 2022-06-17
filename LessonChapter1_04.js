(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter1_04_atlas_1", frames: [[661,1537,163,120],[826,1537,163,120],[1282,638,134,50],[1614,613,132,102],[0,1558,134,130],[1282,0,330,317],[1781,990,228,432],[1614,319,331,292],[1614,0,330,317],[0,1124,228,432],[793,1124,317,265],[1947,179,38,176],[1987,179,38,176],[1947,357,38,176],[1987,357,38,176],[1860,613,106,91],[1112,1366,276,240],[1418,638,122,50],[1668,1424,175,145],[793,1391,202,144],[661,1418,115,48],[1845,1424,175,145],[460,1418,199,144],[1282,319,330,317],[230,1124,228,432],[460,1124,331,292],[1670,1124,38,176],[1710,1124,38,176],[997,1391,38,176],[1037,1391,38,176],[1916,706,106,91],[1390,1366,276,240],[136,1558,38,176],[176,1558,38,176],[216,1558,38,176],[256,1558,38,176],[1916,799,106,91],[1112,1124,277,240],[296,1558,38,176],[336,1558,38,176],[376,1558,38,176],[416,1558,38,176],[1916,892,106,91],[1391,1124,277,240],[0,990,1779,132],[0,722,1914,266],[1946,90,91,87],[1946,0,91,88],[1748,613,110,107],[0,0,1280,720]]}
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



(lib.CachedBmp_1687 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1686 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2853 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1684 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2852 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1682 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2851 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2850 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1679 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2849 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1677 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1676 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1675 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1674 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1673 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1672 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1671 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1670 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1669 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2848 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2847 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1666 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2846 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1664 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2845 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2844 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1661 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1660 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1659 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1658 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1657 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1656 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1655 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1654 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1653 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1652 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1651 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1650 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1649 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1648 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1647 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1646 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1645 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1644 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1643 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1642 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.Chap1Scene4 = function() {
	this.initialize(ss["LessonChapter1_04_atlas_1"]);
	this.gotoAndStop(49);
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
	this.instance = new lib.CachedBmp_1686();
	this.instance.setTransform(-40.65,-35.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1687();
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
	this.instance = new lib.CachedBmp_2852();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_2853();
	this.instance_1.setTransform(-33,10.75,0.4875,0.4875);

	this.instance_2 = new lib.CachedBmp_1684();
	this.instance_2.setTransform(-33.1,-28.2,0.4875,0.4875);

	this.instance_3 = new lib.CompoundPath();
	this.instance_3.setTransform(-159.75,-154.3,3.5001,3.5001);

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
	this.instance = new lib.CachedBmp_1682();
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
	this.instance = new lib.CachedBmp_2851();
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
	this.instance = new lib.CachedBmp_2850();
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
	this.instance = new lib.CachedBmp_1679();
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
	this.instance = new lib.CachedBmp_2849();
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
	this.instance_1 = new lib.CachedBmp_1677();
	this.instance_1.setTransform(-75.25,-66.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

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
	this.instance = new lib.CachedBmp_1676();
	this.instance.setTransform(-9.5,-43.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,-43.9,19,88);


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
	this.instance = new lib.CachedBmp_1675();
	this.instance.setTransform(-9.5,-44,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,-44,19,88);


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
	this.instance = new lib.CachedBmp_1674();
	this.instance.setTransform(-9.45,-44,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,19,88);


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
	this.instance = new lib.CachedBmp_1673();
	this.instance.setTransform(-9.45,-44,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,19,88);


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
	this.instance = new lib.CachedBmp_1672();
	this.instance.setTransform(-26.5,-22.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.5,-22.6,53,45.5);


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
	this.instance = new lib.CachedBmp_1671();
	this.instance.setTransform(-69.15,-73.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.1,-73.1,138,120);


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
	this.instance = new lib.CachedBmp_2848();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1670();
	this.instance_1.setTransform(-3.8,-12.5,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1669();
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
	this.instance = new lib.CachedBmp_2846();
	this.instance.setTransform(-55.95,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2847();
	this.instance_1.setTransform(-55.95,-12,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_1666();
	this.instance_2.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(216.45,-207.05,4.7383,4.7383,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,416.9);


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
	this.shape_1.graphics.f("#2B241C").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
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
	this.shape_1.graphics.f("#2B241C").s().p("AjxL4QhihnAGiOIAhwvQAEiABchZQBdhZCAABIAGAAQCDACBbBeQBbBegCCDQgFDpAAFXQAAEgACDJQACCMhiBiQhiBjiKAAQiOAAhihmg");
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
	this.instance_1 = new lib.CachedBmp_1664();
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
	this.shape_1.graphics.f("#2B241C").s().p("AEqDnIqVg8QhOgIg0g5Qg1g5AAhNQAAhPA4g4QA4g5BPgBIKVgKQBjgBBHBFQBHBFAABiQgBBkhJBEQhCA8hVAAIgYgBg");
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
	this.shape_1.graphics.f("#2B241C").s().p("AnYCsQhJhEgBhkQAAhiBHhFQBHhFBjABIKVAKQBPABA4A5QA3A4AABPQAABNg0A5Qg1A5hNAIIqVA8IgYABQhVAAhCg8g");
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
	this.shape_2.graphics.f("#2B241C").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape_2.setTransform(-0.4374,-21.3926,0.5879,0.5879);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1B1810").s().p("AAQF8QgTgBgKgLQgMgOAAgdQAAiogkjTIg9lFIDFAAIgHKfQA+AegHAfQgDAMgPAHQgOAIgTAAg");
	this.shape_3.setTransform(0.8902,22.975);

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
	this.shape_2.graphics.f("#2B241C").s().p("AAlRQQkJAAlCglQAUjggFoKQgKphgDkCQgCjmChikQChijDlAAIAVAAQDpAACaCpQCYCogKDtIgxZaQkjAHiaAAIgUAAg");
	this.shape_2.setTransform(-1.3874,-21.3426,0.5879,0.5879);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1B1810").s().p("AAQF8QgTgBgKgLQgMgOAAgdQAAiogkjTIg9lFIDFAAIgHKfQA+AegHAfQgDAMgPAHQgOAIgTAAg");
	this.shape_3.setTransform(-0.0598,23.025);

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
	this.instance_1 = new lib.CachedBmp_2845();
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
	this.shape_2.graphics.f("#2B241C").s().p("AEUDHIrkgfIAAlDILmgrQBZgDA0A+QAuA2AABLQACBQg4BAQg4BBhMAAIgDAAg");
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
	this.shape_2.graphics.f("#2B241C").s().p("AmaCGQg4hAAChQQAAhLAug2QA0g+BZADILmArIAAFDIrkAfIgDAAQhMAAg4hBg");
	this.shape_2.setTransform(-13.6284,12.5688);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#7C6253").s().p("AAYBKQkfgCiagNQgfgDgSgRQgQgQAAgVQAAgUAQgQQASgRAegDQDYgUIzAAQA7AAAWAJQApAPAAAyQAAAzgpAPQgWAIg7AAIjSABIh/gBg");
	this.shape_3.setTransform(0.0758,4.22,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

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
	this.instance = new lib.CachedBmp_2844();
	this.instance.setTransform(-78.3,-67.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

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


(lib.camel_tailcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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


(lib.camel_neckcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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


(lib.camel_leg_f_r_ucopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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


(lib.camel_leg_f_r_bcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1661();
	this.instance.setTransform(-9.5,-43.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,-43.9,19,88);


(lib.camel_leg_f_l_ucopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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


(lib.camel_leg_f_l_bcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1660();
	this.instance.setTransform(-9.5,-44,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,-44,19,88);


(lib.camel_leg_b_r_ucopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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


(lib.camel_leg_b_r_bcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1659();
	this.instance.setTransform(-9.45,-44,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,19,88);


(lib.camel_leg_b_l_ucopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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


(lib.camel_leg_b_l_bcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1658();
	this.instance.setTransform(-9.45,-44,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,19,88);


(lib.camel_headcopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1657();
	this.instance.setTransform(-26.5,-22.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.5,-22.6,53,45.5);


(lib.camel_bodycopy2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.CachedBmp_1656();
	this.instance.setTransform(-69.15,-73.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.1,-73.1,138,120);


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
	this.instance = new lib.CachedBmp_1655();
	this.instance.setTransform(-9.5,-43.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,-43.9,19,88);


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
	this.instance = new lib.CachedBmp_1654();
	this.instance.setTransform(-9.5,-44,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,-44,19,88);


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
	this.instance = new lib.CachedBmp_1653();
	this.instance.setTransform(-9.45,-44,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,19,88);


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
	this.instance = new lib.CachedBmp_1652();
	this.instance.setTransform(-9.45,-44,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,19,88);


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
	this.instance = new lib.CachedBmp_1651();
	this.instance.setTransform(-26.5,-22.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.5,-22.6,53,45.5);


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
	this.instance = new lib.CachedBmp_1650();
	this.instance.setTransform(-69.15,-73.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.1,-73.1,138.5,120);


(lib.camel_tailcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_2.graphics.f("#C19A6B").s().p("ADVLIQADlKgCh1QgIoOholkQgyiwhJh1QhdiUiIhAQgRgIAJgQQAKgPARAFQEbBSB9JFQBXGXgCI4QgBCfgMC+QgNCzgTCVQgGilACkag");
	this.shape_2.setTransform(-1.7953,-4.629,0.274,0.274);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2B2012").s().p("AgjDbIgOhHQgGgjAHgSQgmAWgbBDQgYA6ACApQgXgmAEgvQACgfAUg2QAWhAAFgZQALgzgNgrQAFASgbAfQgfAjgBAOQgbijBhiXQAwhMA1grQBcA6AoBTQAvBiglB1QAAgPgDgQQgFgigMgJQgZBJgHBKQgDAagCBTQgCA3gJAbQgOAmgmAbQAQgMACghQABghgPgaQgbAUgKAxQgRBMgpBVQAohYgQhjg");
	this.shape_3.setTransform(4.374,25.2694,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-36.4,18,72.8);


(lib.camel_neckcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_1.graphics.f("#C19A6B").s().p("AA3QvQhZgpg8hEQgvg1gnhUQgrhkgYgzQgphagwg7Qg7hJhVilIh3jwQgOgcg+hqQg2hcgchAQhajJAZjDQAajHB1iBQBsh1CcgfQCZgfCRA9QCXBABcCQQAeAvAqBxQAZBBA0CUQBpEWBkBJQC3CFBhDiQBOC3gMCKQgJBtg0B3Qg7CHhbBcQhrBriCAcQgsAKguAAQhvAAh6g4g");
	this.shape_1.setTransform(0.0062,0.0052,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.7,-30.8,45.4,61.7);


(lib.camel_leg_f_r_ucopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_1.graphics.f("#B78A52").s().p("AmuWZQgti5AKiGQAEgvAPhkQATh6AJhQQAKhTgqnMQgvoGgCheQgKmQAjkVQARiSBLh0QBGhuBqg8QBrg9BzAFQB7AEBrBOIAIAFQCFBeBCChQBECjgaCvQg5GOjeInQg6CQhuEIQhYDagkCDQgLBPAFBJQAEAqAJBLQALCQhODhQgMAhgoAZQgpAZgwAEIgNAAQhuAAgeh7g");
	this.shape_1.setTransform(-0.0363,0.0095,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.8,-42.6,27.6,85.30000000000001);


(lib.camel_leg_f_r_bcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance_1 = new lib.CachedBmp_1649();
	this.instance_1.setTransform(-9.5,-43.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,-43.9,19,88);


(lib.camel_leg_f_l_ucopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_1.graphics.f("#C19A6B").s().p("AmuWZQgti5ALiGQAEgvAPhkQASh6AKhQQAJhTgqnMQgvoGgCheQgKmLAjkaQARiSBLh0QBGhuBqg8QBrg9BzAFQB7AEBrBOIAIAFQCFBeBDChQBDCjgZCvQg6GOjeInQg6CQhuEIQhYDagkCDQgLBPAGBJQADAqAJBLQALCQhODhQgMAhgoAZQgpAagwADIgOAAQhtAAgeh7g");
	this.shape_1.setTransform(0.0135,0.0285,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-42.6,27.5,85.30000000000001);


(lib.camel_leg_f_l_bcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance_1 = new lib.CachedBmp_1648();
	this.instance_1.setTransform(-9.5,-44,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,-44,19,88);


(lib.camel_leg_b_r_ucopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_1.graphics.f("#9E7542").s().p("AmuWZQgti4ALiHQADguAQhlQASh5AJhRQAKhTgqnMQgvoHgChdQgKmLAjkaQARiSBLh0QBGhuBqg8QBrg9BzAFQB7AEBrBOIAIAFQCFBeBCChQBECjgaCvQg5GOjeInQg6CRhuEHQhYDagkCDQgLBPAFBJQAEAqAJBLQALCQhODhQgMAhgoAZQgpAagwADIgNAAQhuAAgeh7g");
	this.shape_1.setTransform(-0.0062,-0.0063,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-42.6,27.5,85.2);


(lib.camel_leg_b_r_bcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance_1 = new lib.CachedBmp_1647();
	this.instance_1.setTransform(-9.45,-44,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,19,88);


(lib.camel_leg_b_l_ucopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape_1.graphics.f("#C19A6B").s().p("AmuWZQgti5AKiGQAEgvAPhkQATh6AJhQQAKhTgqnMQgvoFgChfQgKmKAikbQASiSBKh0QBHhuBqg8QBrg9BzAFQB7AEBrBOIAIAFQCFBeBCChQBECjgaCvQg5GOjeInQg7CQhuEIQhXDagkCDQgLBPAFBJQADAqAJBLQALCQhODhQgLAhgpAZQgpAZgvAEIgOAAQhtAAgeh7g");
	this.shape_1.setTransform(-0.0167,0.0244,0.274,0.274);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-42.6,27.5,85.30000000000001);


(lib.camel_leg_b_l_bcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance_1 = new lib.CachedBmp_1646();
	this.instance_1.setTransform(-9.45,-44,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-44,19,88);


(lib.camel_headcopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance_1 = new lib.CachedBmp_1645();
	this.instance_1.setTransform(-26.5,-22.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.5,-22.6,53,45.5);


(lib.camel_bodycopy_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance_1 = new lib.CachedBmp_1644();
	this.instance_1.setTransform(-69.15,-73.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.1,-73.1,138.5,120);


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
	this.instance.setTransform(-59.05,-12.35,0.9975,0.9975,-85.9658,0,0,33.6,10.2);

	this.instance_1 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_1.setTransform(-14.75,128.15,0.9971,0.9971,-148.2218,0,0,14.6,-0.2);

	this.instance_2 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_2.setTransform(-14.5,128.35,0.9974,0.9974,-147.3549,0,0,4.4,-9);

	this.instance_3 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_3.setTransform(-66.95,59.75,0.9973,0.9973,-132.5794,0,0,44.2,7.7);

	this.instance_4 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_4.setTransform(-6.05,-81.45,0.9981,0.9981,-3.8973,0,0,1.4,51);

	this.instance_5 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_5.setTransform(-7.35,-36,1,1,0,0,0,-0.1,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_6.setTransform(24.15,88.2,0.9946,0.9946,-8.9655,0,0,0.1,4.7);

	this.instance_7 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_7.setTransform(-30.25,90.85,0.9955,0.9955,3.9288,0,0,1.4,-41.8);

	this.instance_8 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_8.setTransform(-42.1,185.75,0.9949,0.9949,15.6982,0,0,0.8,-51.1);

	this.instance_9 = new lib.ch1_neckcopy2("synched",0);
	this.instance_9.setTransform(-4.4,-59.6,0.9982,0.9982,-6.7895,0,0,-1.4,7.2);

	this.instance_10 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_10.setTransform(33.7,185.25,0.9948,0.9948,-13.6112,0,0,3.5,-50.8);

	this.instance_11 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_11.setTransform(21.9,136.7,0.9972,0.9972,64.3289,0,0,-10.5,10.8);

	this.instance_12 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_12.setTransform(22.35,133.85,0.9972,0.9972,85.6806,0,0,-7.5,13.7);

	this.instance_13 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_13.setTransform(37.85,48.4,0.9974,0.9974,105.8101,0,0,-45.9,12.8);

	this.instance_14 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_14.setTransform(48.15,-21.35,0.9976,0.9976,98.8301,0,0,-32.4,13.6);

	this.instance_15 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_15.setTransform(-9.8,49,0.9995,0.9995,1.7768,0,0,-4.5,-21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4.5,rotation:1.7768,x:-9.8,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:98.8301,x:48.15,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9974,scaleY:0.9974,rotation:105.8101,x:37.85,y:48.4,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:85.6806,x:22.35,y:133.85,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.5,scaleX:0.9972,scaleY:0.9972,rotation:64.3289,x:21.9,y:136.7}},{t:this.instance_10,p:{regX:3.5,rotation:-13.6112,x:33.7,y:185.25,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-6.7895,x:-4.4,y:-59.6,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:15.6982,x:-42.1,y:185.75,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9288,x:-30.25,y:90.85}},{t:this.instance_6,p:{regX:0.1,scaleX:0.9946,scaleY:0.9946,rotation:-8.9655,y:88.2,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.8973,x:-6.05,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.7,rotation:-132.5794,x:-66.95,y:59.75,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9974,scaleY:0.9974,rotation:-147.3549,x:-14.5,y:128.35,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.9971,scaleY:0.9971,rotation:-148.2218,x:-14.75,y:128.15,regX:14.6}},{t:this.instance,p:{scaleX:0.9975,scaleY:0.9975,rotation:-85.9658,x:-59.05,regY:10.2,regX:33.6,y:-12.35}}]}).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7751,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:98.2636,x:48.05,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:103.8585,x:38.55,y:48.5,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:85.0443,x:25.9,y:134.35,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9971,scaleY:0.9971,rotation:64.4839,x:25.65,y:137.5}},{t:this.instance_10,p:{regX:3.4,rotation:-12.7834,x:33.5,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-6.9981,x:-4.3,y:-59.55,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:15.2508,x:-42,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9282,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9642,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.456,x:-6.1,y:-81.5,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-130.2107,x:-68.15,y:59.6,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-144.9872,x:-18.55,y:130.3,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-145.8559,x:-18.7,y:130.05,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-85.0194,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7751,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:97.698,x:48.1,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:101.907,x:39.25,y:48.55,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:84.4085,x:29.5,y:134.8,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:64.638,x:29.15,y:137.85}},{t:this.instance_10,p:{regX:3.4,rotation:-11.9584,x:33.5,y:185.2,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.2092,x:-4.3,y:-59.4,regY:7.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:14.8021,x:-41.95,y:185.75,scaleX:0.9948,scaleY:0.9948,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9282,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9642,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.0163,x:-6.15,y:-81.3,regY:51.1}},{t:this.instance_3,p:{regY:7.7,rotation:-127.8432,x:-69.3,y:59.4,scaleX:0.9972,scaleY:0.9972,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-142.6192,x:-22.7,y:132.15,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-143.4875,x:-22.85,y:131.8,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-84.0701,x:-59.1,regY:10.1,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7751,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:97.1333,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:99.9551,x:39.95,y:48.6,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:83.7714,x:33.15,y:135.15,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:64.7929,x:32.9,y:138.2}},{t:this.instance_10,p:{regX:3.4,rotation:-11.1303,x:33.45,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.4176,x:-4.3,y:-59.35,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:14.3545,x:-41.95,y:185.75,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9282,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9642,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.5761,x:-6.25,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-125.4755,x:-70.65,y:59.3,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-140.2522,x:-26.95,y:133.9,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-141.12,x:-27.2,y:133.55,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-83.121,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7751,x:-9.9,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:96.5666,x:48.1,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:98.0043,x:40.55,y:48.65,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:83.134,x:36.75,y:135.45,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:64.9467,x:36.55,y:138.45}},{t:this.instance_10,p:{regX:3.4,rotation:-10.304,x:33.5,y:185.2,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.6286,x:-4.3,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:13.9069,x:-41.95,y:185.8,scaleX:0.9948,scaleY:0.9948,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9273,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9642,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.1369,x:-6.35,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-123.1077,x:-71.75,y:59.05,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-137.8849,x:-31.1,y:135.35,regY:-9,regX:4.3}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-138.7523,x:-31.45,y:135.1,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-82.1709,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7751,x:-9.9,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:96.0006,x:48.15,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:96.0513,x:41.35,y:48.85,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9971,rotation:82.497,x:40.25,y:135.6,regY:13.8,regX:-7.5}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9971,scaleY:0.9971,rotation:65.1017,x:40.25,y:138.75}},{t:this.instance_10,p:{regX:3.5,rotation:-9.4769,x:33.6,y:185.2,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.8381,x:-4.3,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:13.4591,x:-41.95,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9273,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9642,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.697,x:-6.45,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-120.7387,x:-73,y:58.85,scaleX:0.9972,scaleY:0.9972,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-135.5164,x:-35.6,y:136.7,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-136.3848,x:-35.85,y:136.5,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-81.222,x:-59,regY:10.2,regX:33.5,y:-12.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7751,x:-9.9,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:95.4359,x:48.05,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:94.1,x:41.95,y:48.85,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:81.8596,x:44.05,y:135.65,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:65.2566,x:43.85,y:138.75}},{t:this.instance_10,p:{regX:3.4,rotation:-8.651,x:33.5,y:185.25,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-8.0495,x:-4.3,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:13.0112,x:-41.9,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9273,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9642,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.2562,x:-6.5,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-118.3719,x:-74.1,y:58.6,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-133.1481,x:-39.95,y:138,regY:-9,regX:4.3}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-134.0165,x:-40.2,y:137.75,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-80.2727,x:-59,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7751,x:-9.9,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:94.8701,x:48.2,y:-21.35,regY:13.5,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:92.1491,x:42.65,y:48.85,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:81.2232,x:47.65,y:135.55,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:65.4104,x:47.55,y:138.6}},{t:this.instance_10,p:{regX:3.4,rotation:-7.8225,x:33.45,y:185.2,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-8.2602,x:-4.3,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:12.5626,x:-41.9,y:185.8,scaleX:0.9948,scaleY:0.9948,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9273,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9642,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.8173,x:-6.55,y:-81.35,regY:51}},{t:this.instance_3,p:{regY:7.5,rotation:-116.0044,x:-75.45,y:58.4,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-130.7816,x:-44.45,y:139.05,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-131.6496,x:-44.6,y:138.7,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-79.3234,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7751,x:-9.9,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:94.3047,x:48.05,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:90.1981,x:43.4,y:48.95,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:80.5858,x:51.25,y:135.35,regY:13.8,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:65.5661,x:51.2,y:138.4}},{t:this.instance_10,p:{regX:3.4,rotation:-6.9965,x:33.45,y:185.2,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-8.47,x:-4.3,y:-59.55,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:12.1153,x:-41.9,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9273,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9642,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.3775,x:-6.65,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-113.6355,x:-76.45,y:57.95,scaleX:0.9972,scaleY:0.9972,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-128.4135,x:-49.05,y:140,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-129.2809,x:-49.15,y:139.7,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-78.3736,x:-59,regY:10.2,regX:33.5,y:-12.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7751,x:-9.9,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:93.7389,x:48.05,y:-21.45,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:88.25,x:44.05,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:79.9487,x:54.9,y:135.1,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9971,scaleY:0.9971,rotation:65.72,x:55,y:138.3}},{t:this.instance_10,p:{regX:3.4,rotation:-6.1693,x:33.4,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-8.6807,x:-4.3,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:11.6674,x:-41.75,y:185.85,scaleX:0.9948,scaleY:0.9948,regX:0.9}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9273,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9642,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.0587,x:-6.75,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-111.2678,x:-77.65,y:57.7,scaleX:0.9972,scaleY:0.9972,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-126.0446,x:-53.45,y:140.85,regY:-9,regX:4.3}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-126.9148,x:-53.7,y:140.35,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-77.4251,x:-58.9,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7751,x:-9.9,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:93.1734,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:86.2989,x:44.8,y:48.95,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:79.3115,x:58.55,y:134.7,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9972,scaleY:0.9972,rotation:65.875,x:58.5,y:137.8}},{t:this.instance_10,p:{regX:3.4,rotation:-5.3424,x:33.4,y:185.25,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-8.8901,x:-4.3,y:-59.55,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:11.2196,x:-41.8,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.9}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9273,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9634,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.4993,x:-6.85,y:-81.35,regY:51}},{t:this.instance_3,p:{regY:7.5,rotation:-108.9007,x:-78.9,y:57.5,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-123.6779,x:-58.1,y:141.45,regY:-9,regX:4.3}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-124.546,x:-58.3,y:141,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-76.4765,x:-58.9,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7742,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:92.6074,x:48.05,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:84.347,x:45.45,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.6755,x:62.05,y:134.2,regY:13.8,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:66.0292,x:62.15,y:137.35}},{t:this.instance_10,p:{regX:3.4,rotation:-4.5167,x:33.45,y:185.2,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-9.101,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:10.7713,x:-41.9,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9273,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9634,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.9382,x:-6.9,y:-81.35,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-106.5337,x:-79.95,y:57.1,scaleX:0.9972,scaleY:0.9972,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-121.3095,x:-62.8,y:141.75,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-122.1781,x:-62.95,y:141.5,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-75.5256,x:-58.95,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7742,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:92.0425,x:48.1,y:-21.45,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:82.3957,x:46.2,y:49.15,regX:-45.8,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.038,x:65.75,y:133.65,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:66.1839,x:65.75,y:136.75}},{t:this.instance_10,p:{regX:3.5,rotation:-3.6894,x:33.55,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-9.3095,x:-4.25,y:-59.35,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:10.3236,x:-41.9,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9273,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9634,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.3789,x:-7,y:-81.2,regY:51.1}},{t:this.instance_3,p:{regY:7.6,rotation:-104.1645,x:-81.05,y:56.75,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-118.942,x:-67.4,y:142.05,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-119.8108,x:-67.55,y:141.7,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-74.5773,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7742,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:91.4761,x:48.2,y:-21.35,regY:13.5,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:80.4426,x:46.85,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:77.401,x:69.15,y:132.95,regY:13.8,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:66.3378,x:69.4,y:136}},{t:this.instance_10,p:{regX:3.5,rotation:-2.8628,x:33.55,y:185.2,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-9.5208,x:-4.25,y:-59.35,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:9.8754,x:-41.9,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9273,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9634,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.8197,x:-7.05,y:-81.2,regY:51.1}},{t:this.instance_3,p:{regY:7.6,rotation:-101.798,x:-82.25,y:56.35,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.5756,x:-72.1,y:142.15,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-117.4435,x:-72.3,y:141.9,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-73.6286,x:-59,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7742,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:90.9106,x:48.1,y:-21.3,regY:13.6,regX:-32.3}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:78.4922,x:47.7,y:49.2,regX:-45.8,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.764,x:72.8,y:132.1,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:66.4925,x:72.85,y:135.3}},{t:this.instance_10,p:{regX:3.4,rotation:-2.0359,x:33.4,y:185.2,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-9.7307,x:-4.3,y:-59.5,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:9.4279,x:-41.75,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.9}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9273,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9634,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.2588,x:-7.15,y:-81.35,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-99.4306,x:-83.25,y:55.95,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-114.2078,x:-76.95,y:142.1,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-115.0751,x:-76.95,y:141.8,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-72.6786,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7742,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:90.3462,x:48.1,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:76.5402,x:48.2,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.1264,x:76.3,y:131.25,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:66.6476,x:76.45,y:134.35}},{t:this.instance_10,p:{regX:3.5,rotation:-1.2094,x:33.55,y:185.2,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-9.9413,x:-4.25,y:-59.35,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:8.9801,x:-41.75,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.9}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9272,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9634,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.6998,x:-7.2,y:-81.35,regY:51}},{t:this.instance_3,p:{regY:7.5,rotation:-97.0618,x:-84.65,y:55.45,scaleX:0.9973,scaleY:0.9973,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-111.8398,x:-81.5,y:141.95,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-112.7075,x:-81.6,y:141.6,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-71.7297,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7742,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:89.7835,x:48.15,y:-21.4,regY:13.5,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:74.5893,x:48.95,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:75.4897,x:79.8,y:130.05,regY:13.7,regX:-7.6}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:66.8023,x:80,y:133.3}},{t:this.instance_10,p:{regX:3.4,rotation:-0.3814,x:33.4,y:185.2,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-10.1521,x:-4.25,y:-59.55,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:8.532,x:-41.75,y:185.9,scaleX:0.9949,scaleY:0.9949,regX:0.9}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9264,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9634,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:3.1392,x:-7.3,y:-81.15,regY:51.1}},{t:this.instance_3,p:{regY:7.6,rotation:-94.6937,x:-85.55,y:55.1,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-109.4718,x:-86.2,y:141.5,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-110.3398,x:-86.3,y:141.1,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-70.7797,x:-58.9,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7742,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:89.2191,x:48.05,y:-21.25,regY:13.6,regX:-32.3}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:72.6363,x:49.65,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:74.8519,x:83.2,y:129.1,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:66.9567,x:83.5,y:132.2}},{t:this.instance_10,p:{regX:3.5,rotation:0.4403,x:33.5,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-10.3613,x:-4.2,y:-59.5,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:8.0844,x:-41.85,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9264,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9634,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:3.5789,x:-7.4,y:-81.25,regY:51}},{t:this.instance_3,p:{regY:7.5,rotation:-92.3255,x:-86.85,y:54.7,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-107.1047,x:-91,y:140.9,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-107.9721,x:-90.95,y:140.55,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-69.8309,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7742,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:88.6519,x:48.05,y:-21.45,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:70.6848,x:50.25,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:74.2161,x:86.6,y:127.85,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:67.1111,x:86.85,y:131}},{t:this.instance_10,p:{regX:3.4,rotation:1.2674,x:33.4,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-10.5713,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:7.6356,x:-41.85,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9264,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9634,y:88.1,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:4.0187,x:-7.45,y:-81.25,regY:51}},{t:this.instance_3,p:{regY:7.7,rotation:-89.9632,x:-87.7,y:54.05,scaleX:0.9973,scaleY:0.9973,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-104.7373,x:-95.55,y:140.2,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-105.6045,x:-95.6,y:139.95,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-68.8822,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7742,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:88.0873,x:48,y:-21.45,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:68.7332,x:51,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:73.5792,x:90,y:126.55,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:67.266,x:90.25,y:129.7}},{t:this.instance_10,p:{regX:3.4,rotation:2.0948,x:33.4,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-10.7809,x:-4.2,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:7.188,x:-41.9,y:185.85,scaleX:0.9948,scaleY:0.9948,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9264,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9634,y:88.05,x:24.15}},{t:this.instance_5},{t:this.instance_4,p:{rotation:4.4586,x:-7.55,y:-81.25,regY:51}},{t:this.instance_3,p:{regY:7.5,rotation:-87.5947,x:-89.05,y:53.6,scaleX:0.9973,scaleY:0.9973,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-102.3689,x:-100.2,y:139.3,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-103.2359,x:-100.2,y:139.15,regX:14.5}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-67.9328,x:-58.9,regY:10.2,regX:33.6,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7707,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:88.4143,x:48.1,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:70.2831,x:50.65,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:73.8825,x:87.5,y:127.6,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:66.8251,x:87.75,y:130.7}},{t:this.instance_10,p:{regX:3.4,rotation:1.4898,x:33.4,y:185.2,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-10.607,x:-4.2,y:-59.5,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:7.6302,x:-41.85,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.93,x:-30.25,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9733,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:4.1749,x:-7.45,y:-81.3,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-89.3311,x:-87.8,y:54.25,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-104.116,x:-96.45,y:140.2,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-105.4545,x:-96.55,y:139.8,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-68.8889,x:-58.95,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7681,x:-9.95,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:88.7414,x:48.05,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:71.8328,x:50.25,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:74.187,x:84.9,y:128.45,regY:13.7,regX:-7.6}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:66.3857,x:85.2,y:131.7}},{t:this.instance_10,p:{regX:3.5,rotation:0.8824,x:33.6,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-10.4318,x:-4.2,y:-59.5,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:8.0737,x:-41.85,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9343,x:-30.25,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-8.9831,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:3.8922,x:-7.4,y:-81.25,regY:51}},{t:this.instance_3,p:{regY:7.7,rotation:-91.0617,x:-86.55,y:54.7,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-105.8621,x:-92.85,y:140.9,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-107.6712,x:-92.8,y:140.55,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-69.8454,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7655,x:-10,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:89.0683,x:48.1,y:-21.4,regY:13.5,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:73.3809,x:49.8,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:74.491,x:82.35,y:129.5,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9972,scaleY:0.9972,rotation:65.9448,x:82.55,y:132.7}},{t:this.instance_10,p:{regX:3.4,rotation:0.2786,x:33.45,y:185,regY:-50.9,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-10.2562,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:8.5159,x:-41.75,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.9}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9378,x:-30.25,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9946,scaleY:0.9946,rotation:-8.9926,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:3.6087,x:-7.35,y:-81.3,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-92.7968,x:-85.6,y:55.1,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-107.6088,x:-89.05,y:141.45,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-109.8907,x:-89.1,y:141.1,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-70.8003,x:-58.95,regY:10.2,regX:33.5,y:-12.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.7,rotation:1.7637,x:-10,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:89.3953,x:48.1,y:-21.3,regY:13.6,regX:-32.3}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:74.9308,x:49.35,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:74.7958,x:79.75,y:130.4,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.5,scaleX:0.9971,scaleY:0.9971,rotation:65.505,x:79.95,y:133.4}},{t:this.instance_10,p:{regX:3.4,rotation:-0.3234,x:33.5,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-10.082,x:-4.25,y:-59.45,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:8.9586,x:-41.9,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9432,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9946,scaleY:0.9946,rotation:-9.0025,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:3.3252,x:-7.2,y:-81.3,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-94.5327,x:-84.5,y:55.6,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-109.3559,x:-85.25,y:141.9,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-112.1067,x:-85.4,y:141.65,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-71.7574,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7602,x:-9.9,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:89.7222,x:48.05,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:76.4804,x:49.05,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:75.0999,x:77.15,y:131.1,regY:13.7,regX:-7.6}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9971,scaleY:0.9971,rotation:65.0652,x:77.45,y:134.4}},{t:this.instance_10,p:{regX:3.5,rotation:-0.9281,x:33.65,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-9.9048,x:-4.25,y:-59.35,regY:7.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:9.4012,x:-41.9,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9475,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.0133,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:3.0418,x:-7.2,y:-81.3,regY:51}},{t:this.instance_3,p:{regY:7.7,rotation:-96.2666,x:-83.2,y:55.95,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-111.103,x:-81.5,y:142.45,regY:-9,regX:4.3}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-114.326,x:-81.65,y:142.05,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-72.7127,x:-59.1,regY:10.1,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7567,x:-9.9,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:90.0447,x:48.2,y:-21.25,regY:13.5,regX:-32.3}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:78.0302,x:48.6,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:75.4051,x:74.55,y:131.9,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:64.6251,x:74.75,y:135.05}},{t:this.instance_10,p:{regX:3.4,rotation:-1.5329,x:33.55,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-9.7307,x:-4.3,y:-59.5,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:9.8443,x:-41.9,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.951,x:-30.25,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.024,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7586,x:-7.15,y:-81.35,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-98.0036,x:-82.2,y:56.4,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-112.8502,x:-77.8,y:142.65,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-116.5423,x:-77.9,y:142.4,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-73.6688,x:-59.05,regY:10.1,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7541,x:-9.9,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:90.3716,x:48.05,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:79.579,x:48.25,y:49.25,regX:-45.8,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:75.7088,x:71.9,y:132.45,regY:13.7,regX:-7.6}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:64.1866,x:72.05,y:135.7}},{t:this.instance_10,p:{regX:3.4,rotation:-2.1396,x:33.55,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-9.5546,x:-4.25,y:-59.35,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:10.2867,x:-41.8,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.9}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9555,x:-30.25,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.0338,y:88.1,x:24.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.4762,x:-7.05,y:-81.3,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-99.7392,x:-81.05,y:56.65,scaleX:0.9973,scaleY:0.9973,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-114.5958,x:-74,y:142.85,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-118.7609,x:-74.1,y:142.55,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-74.6256,x:-59.05,regY:10.2,regX:33.5,y:-12.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7515,x:-9.9,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:90.6994,x:48.05,y:-21.25,regY:13.6,regX:-32.3}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:81.129,x:47.85,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.0142,x:69.25,y:133.2,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:63.7471,x:69.35,y:136.3}},{t:this.instance_10,p:{regX:3.5,rotation:-2.744,x:33.7,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-9.3807,x:-4.25,y:-59.4,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:10.7295,x:-41.95,y:185.85,scaleX:0.9948,scaleY:0.9948,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9598,x:-30.25,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.0435,y:88.1,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.193,x:-7,y:-81.35,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-101.4741,x:-79.85,y:57.15,scaleX:0.9972,scaleY:0.9972,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-116.3428,x:-70.35,y:143,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-120.9789,x:-70.35,y:142.55,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-75.5815,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7488,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:91.0263,x:48.2,y:-21.4,regY:13.5,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:82.6786,x:47.45,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.3187,x:66.6,y:133.75,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9971,scaleY:0.9971,rotation:63.3059,x:66.8,y:136.9}},{t:this.instance_10,p:{regX:3.5,rotation:-3.3504,x:33.75,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-9.2057,x:-4.3,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:11.1724,x:-41.95,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9642,x:-30.15,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9946,scaleY:0.9946,rotation:-9.0541,y:88.1,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.909,x:-6.95,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-103.2106,x:-78.65,y:57.5,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-118.0903,x:-66.45,y:143.05,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-123.1961,x:-66.6,y:142.65,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-76.538,x:-59,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7453,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:91.3533,x:48.05,y:-21.3,regY:13.6,regX:-32.3}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:84.2271,x:47,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.6217,x:63.85,y:134.2,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.5,scaleX:0.9971,scaleY:0.9971,rotation:62.8656,x:63.95,y:137.2}},{t:this.instance_10,p:{regX:3.4,rotation:-3.9537,x:33.65,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-9.03,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:11.6145,x:-41.85,y:185.85,scaleX:0.9948,scaleY:0.9948,regX:0.9}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9678,x:-30.15,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9946,scaleY:0.9946,rotation:-9.0639,y:88.1,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.6251,x:-6.9,y:-81.25,regY:51.1}},{t:this.instance_3,p:{regY:7.5,rotation:-104.9453,x:-77.55,y:57.8,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-119.8373,x:-62.75,y:142.9,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-125.4142,x:-62.85,y:142.55,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-77.4933,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7427,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:91.6804,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:85.776,x:46.6,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.9263,x:61.15,y:134.65,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:62.4268,x:61.3,y:137.7}},{t:this.instance_10,p:{regX:3.4,rotation:-4.5599,x:33.65,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-8.8536,x:-4.35,y:-59.5,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:12.0579,x:-41.95,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9722,x:-30.15,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9946,scaleY:0.9946,rotation:-9.0756,y:88.1,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.3421,x:-6.8,y:-81.2,regY:51.1}},{t:this.instance_3,p:{regY:7.6,rotation:-106.6807,x:-76.35,y:58.05,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-121.5815,x:-59,y:142.7,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-127.6319,x:-59.1,y:142.3,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-78.4504,x:-59.1,regY:10.1,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7401,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:92.0083,x:48.25,y:-21.4,regY:13.5,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:87.3271,x:46.25,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:77.2309,x:58.45,y:134.95,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:61.9859,x:58.6,y:138.05}},{t:this.instance_10,p:{regX:3.4,rotation:-5.1659,x:33.7,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-8.6798,x:-4.35,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:12.5013,x:-41.95,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9765,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9946,scaleY:0.9946,rotation:-9.0844,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.0591,x:-6.75,y:-81.2,regY:51.1}},{t:this.instance_3,p:{regY:7.6,rotation:-108.4169,x:-75.2,y:58.4,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-123.3288,x:-55.3,y:142.5,regY:-9.1,regX:4.3}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-129.8501,x:-55.45,y:142.2,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-79.4052,x:-59,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7375,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:92.3346,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:88.8752,x:45.85,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:77.5348,x:55.75,y:135.3,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9972,scaleY:0.9972,rotation:61.5466,x:55.9,y:138.45}},{t:this.instance_10,p:{regX:3.4,rotation:-5.7699,x:33.65,y:185,regY:-50.9,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-8.5034,x:-4.3,y:-59.55,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:12.9436,x:-41.95,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9801,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9946,scaleY:0.9946,rotation:-9.0942,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.7752,x:-6.7,y:-81.35,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-110.1521,x:-74.05,y:58.65,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-125.0763,x:-51.55,y:142.05,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-132.0676,x:-51.6,y:141.8,regX:14.5}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-80.3624,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7357,x:-9.8,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:92.6618,x:48.05,y:-21.45,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:90.4217,x:45.55,y:49.05,regX:-45.9,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:77.839,x:52.95,y:135.55,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.5,scaleX:0.9971,scaleY:0.9971,rotation:61.1056,x:52.95,y:138.5}},{t:this.instance_10,p:{regX:3.4,rotation:-6.3761,x:33.75,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-8.3292,x:-4.3,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:13.3857,x:-42.05,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9846,x:-30.15,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9946,scaleY:0.9946,rotation:-9.1041,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.4923,x:-6.6,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.7,rotation:-111.8877,x:-72.75,y:58.9,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-126.824,x:-47.85,y:141.7,regY:-9.1,regX:4.3}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-134.2857,x:-47.95,y:141.25,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-81.3186,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7322,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:92.9882,x:48.1,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:91.971,x:45.05,y:49,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.1444,x:50.25,y:135.7,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:60.6667,x:50.3,y:138.75}},{t:this.instance_10,p:{regX:3.4,rotation:-6.9813,x:33.75,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-8.153,x:-4.3,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:13.8289,x:-42.05,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:3.9889,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9946,scaleY:0.9946,rotation:-9.1139,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.2085,x:-6.55,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-113.6221,x:-71.65,y:58.95,scaleX:0.9972,scaleY:0.9972,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-128.5682,x:-44.15,y:141,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-136.5032,x:-44.35,y:140.7,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-82.2751,x:-59,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7296,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:93.3156,x:48.1,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:93.5201,x:44.65,y:49,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.4492,x:47.5,y:135.75,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:60.2266,x:47.55,y:138.8}},{t:this.instance_10,p:{regX:3.4,rotation:-7.5874,x:33.8,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.9787,x:-4.3,y:-59.6,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:14.2709,x:-42,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9924,x:-30.2,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1254,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.0701,x:-6.5,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-115.359,x:-70.45,y:59.3,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-130.3164,x:-40.55,y:140.3,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-138.7206,x:-40.75,y:140,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-83.2304,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.727,x:-9.8,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:93.6423,x:48.1,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:95.0701,x:44.35,y:49,regX:-45.9,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.7533,x:44.7,y:135.65,regY:13.7,regX:-7.6}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:59.7867,x:44.75,y:138.85}},{t:this.instance_10,p:{regX:3.4,rotation:-8.1906,x:33.8,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.8028,x:-4.3,y:-59.55,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:14.714,x:-42.05,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.9969,x:-30.25,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9946,scaleY:0.9946,rotation:-9.1341,y:88.05,x:24.2}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.3539,x:-6.4,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-117.0943,x:-69.2,y:59.45,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-132.0629,x:-36.9,y:139.55,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-140.9391,x:-37.1,y:139.35,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-84.1864,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7243,x:-9.8,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:93.9708,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:96.6183,x:43.75,y:49.1,regX:-45.8,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:79.0579,x:42.05,y:135.75,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9971,scaleY:0.9971,rotation:59.3465,x:42.1,y:138.9}},{t:this.instance_10,p:{regX:3.4,rotation:-8.7969,x:33.8,y:185.1,regY:-50.8,scaleX:0.9947,scaleY:0.9947}},{t:this.instance_9,p:{rotation:-7.6286,x:-4.3,y:-59.55,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:15.1559,x:-42.05,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9955,scaleY:0.9955,rotation:4.0012,x:-30.25,y:90.8}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9946,scaleY:0.9946,rotation:-9.145,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.6368,x:-6.35,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-118.829,x:-68.05,y:59.65,scaleX:0.9972,scaleY:0.9972,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-133.8091,x:-33.3,y:138.7,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-143.1566,x:-33.4,y:138.4,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-85.1434,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7208,x:-9.8,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:94.2977,x:48.05,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:98.168,x:43.45,y:48.95,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:79.3622,x:39.2,y:135.55,regY:13.8,regX:-7.6}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:58.9065,x:39.3,y:138.65}},{t:this.instance_10,p:{regX:3.4,rotation:-9.4029,x:33.85,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.4529,x:-4.3,y:-59.45,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:15.5998,x:-42.05,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0056,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9946,scaleY:0.9946,rotation:-9.1546,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.9207,x:-6.3,y:-81.3,regY:51.1}},{t:this.instance_3,p:{regY:7.6,rotation:-120.5661,x:-66.75,y:59.8,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-135.556,x:-29.8,y:137.8,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-145.3745,x:-29.85,y:137.55,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-86.099,x:-59,regY:10.2,regX:33.6,y:-12.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.8,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:94.6247,x:48.1,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:99.7177,x:43,y:49,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9971,rotation:79.6673,x:36.5,y:135.5,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:58.4662,x:36.55,y:138.55}},{t:this.instance_10,p:{regX:3.4,rotation:-10.0083,x:33.9,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.2781,x:-4.35,y:-59.45,regY:7.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:16.0412,x:-42.15,y:185.75,scaleX:0.9948,scaleY:0.9948,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.2028,x:-6.2,y:-81.5,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-122.2997,x:-65.6,y:59.95,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-137.3029,x:-26.15,y:136.7,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-147.593,x:-26.35,y:136.5,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-87.0535,x:-59.15,regY:10.1,regX:33.6,y:-12.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.8,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:94.3161,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:98.1982,x:43.4,y:49.1,regX:-45.8,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:79.4061,x:39.1,y:135.7,regY:13.8,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:59.4058,x:39.2,y:138.7}},{t:this.instance_10,p:{regX:3.5,rotation:-9.4209,x:34.05,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.3,x:-4.3,y:-59.45,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:15.6126,x:-42.05,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.9732,x:-6.2,y:-81.35,regY:51.1}},{t:this.instance_3,p:{regY:7.7,rotation:-120.3135,x:-67,y:59.65,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-135.313,x:-30.3,y:137.9,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-146.4169,x:-30.55,y:137.65,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-85.8917,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.8,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:94.0068,x:48.1,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:96.6802,x:43.7,y:48.95,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:79.1428,x:41.9,y:135.7,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:60.3476,x:41.85,y:138.8}},{t:this.instance_10,p:{regX:3.4,rotation:-8.8348,x:33.9,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.3196,x:-4.3,y:-59.45,regY:7.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:15.1824,x:-42.05,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.7437,x:-6.25,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.5,rotation:-118.3253,x:-68.65,y:59.65,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-133.323,x:-34.55,y:139.05,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-145.2422,x:-34.55,y:138.7,regX:14.5}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-84.728,x:-58.95,regY:10.2,regX:33.5,y:-12.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.8,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:93.6993,x:48.1,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:95.1616,x:44.15,y:48.95,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.8809,x:44.55,y:135.8,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.5,scaleX:0.9971,scaleY:0.9971,rotation:61.2865,x:44.5,y:138.7}},{t:this.instance_10,p:{regX:3.4,rotation:-8.2486,x:33.85,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.3416,x:-4.3,y:-59.4,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:14.753,x:-42.05,y:185.8,scaleX:0.9948,scaleY:0.9948,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.5133,x:-6.25,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-116.3373,x:-69.95,y:59.4,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-131.3328,x:-38.75,y:140,regY:-9,regX:4.3}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-144.0667,x:-38.9,y:139.6,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-83.564,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.8,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:93.3911,x:48.05,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:93.6414,x:44.55,y:49,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.6208,x:47.2,y:135.75,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.5,scaleX:0.9971,scaleY:0.9971,rotation:62.2272,x:47.2,y:138.7}},{t:this.instance_10,p:{regX:3.4,rotation:-7.6619,x:33.9,y:185.05,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.3637,x:-4.3,y:-59.4,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:14.3225,x:-42.1,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.2829,x:-6.25,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-114.3482,x:-71.45,y:59.15,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-129.343,x:-43,y:140.65,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-142.8918,x:-43,y:140.4,regX:14.5}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-82.4007,x:-58.9,regY:10.2,regX:33.6,y:-12.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:93.083,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:92.1228,x:44.9,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.3585,x:49.9,y:135.7,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:63.1671,x:49.95,y:138.7}},{t:this.instance_10,p:{regX:3.4,rotation:-7.0761,x:33.85,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.3848,x:-4.25,y:-59.4,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:13.8941,x:-42.05,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.0526,x:-6.25,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-112.3604,x:-72.9,y:58.9,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-127.3533,x:-47.35,y:141.4,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-141.7159,x:-47.45,y:141.1,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-81.2362,x:-58.95,regY:10.2,regX:33.5,y:-12.25}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:92.7741,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:90.6049,x:45.4,y:49.1,regX:-45.9,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.0978,x:52.55,y:135.55,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.5,scaleX:0.9971,scaleY:0.9971,rotation:64.1078,x:52.55,y:138.5}},{t:this.instance_10,p:{regX:3.4,rotation:-6.4884,x:33.85,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.4052,x:-4.25,y:-59.4,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:13.4635,x:-42.05,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.1726,x:-6.25,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-110.3742,x:-74.4,y:58.6,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-125.3636,x:-51.6,y:141.8,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-140.5409,x:-51.8,y:141.6,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-80.0725,x:-59,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:92.4661,x:48.1,y:-21.45,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:89.09,x:45.65,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:77.8354,x:55.2,y:135.35,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9972,scaleY:0.9972,rotation:65.0471,x:55.35,y:138.4}},{t:this.instance_10,p:{regX:3.4,rotation:-5.9032,x:33.8,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.4282,x:-4.25,y:-59.35,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:13.0338,x:-42,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.4038,x:-6.25,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.7,rotation:-108.3853,x:-75.7,y:58.15,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-123.3737,x:-56,y:142.35,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-139.3658,x:-56.1,y:142,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-78.9091,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:92.1583,x:48.05,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:87.571,x:46,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:77.5733,x:57.9,y:135.05,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9971,scaleY:0.9971,rotation:65.9857,x:57.95,y:138.2}},{t:this.instance_10,p:{regX:3.4,rotation:-5.3159,x:33.8,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.4495,x:-4.25,y:-59.4,regY:7.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:12.6038,x:-41.95,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.9}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.6324,x:-6.25,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-106.3983,x:-77.25,y:57.7,scaleX:0.9973,scaleY:0.9973,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-121.3838,x:-60.3,y:142.5,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-138.19,x:-60.4,y:142.3,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-77.7445,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:91.8487,x:48.05,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:86.0529,x:46.4,y:49.25,regX:-45.8,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:77.3119,x:60.5,y:134.7,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:66.9272,x:60.6,y:137.75}},{t:this.instance_10,p:{regX:3.4,rotation:-4.731,x:33.8,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.4705,x:-4.25,y:-59.4,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:12.1739,x:-42,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.8628,x:-6.25,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-104.4096,x:-78.7,y:57.35,scaleX:0.9973,scaleY:0.9973,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-119.3944,x:-64.65,y:142.75,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-137.015,x:-64.8,y:142.45,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-76.5803,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:91.5409,x:48.1,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:84.5345,x:46.8,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:77.0511,x:63.15,y:134.3,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:67.8674,x:63.25,y:137.45}},{t:this.instance_10,p:{regX:3.4,rotation:-4.1431,x:33.8,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.4917,x:-4.25,y:-59.45,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:11.7446,x:-42,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.0932,x:-6.25,y:-81.25,regY:51.1}},{t:this.instance_3,p:{regY:7.6,rotation:-102.4229,x:-80.05,y:57.05,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-117.4041,x:-69,y:142.75,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-135.8396,x:-69.15,y:142.4,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-75.4176,x:-59,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:91.2323,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:83.0151,x:47.3,y:49.05,regX:-45.9,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.79,x:65.75,y:133.7,regY:13.7,regX:-7.6}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:68.808,x:65.9,y:137}},{t:this.instance_10,p:{regX:3.4,rotation:-3.5573,x:33.85,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.5129,x:-4.25,y:-59.45,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:11.3149,x:-42,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.3228,x:-6.3,y:-81.25,regY:51.1}},{t:this.instance_3,p:{regY:7.6,rotation:-100.4348,x:-81.5,y:56.65,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-115.4151,x:-73.4,y:142.6,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-134.6652,x:-73.55,y:142.35,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-74.2534,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:90.9247,x:48.1,y:-21.3,regY:13.6,regX:-32.3}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:81.497,x:47.6,y:49.2,regX:-45.8,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.5288,x:68.4,y:133.35,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9972,scaleY:0.9972,rotation:69.7476,x:68.5,y:136.45}},{t:this.instance_10,p:{regX:3.5,rotation:-2.9702,x:34,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.535,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:10.886,x:-42,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.5532,x:-6.25,y:-81.3,regY:51.1}},{t:this.instance_3,p:{regY:7.6,rotation:-98.4474,x:-82.85,y:56.15,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-113.4248,x:-77.8,y:142.35,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-133.4906,x:-77.9,y:142.05,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-73.0895,x:-58.9,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:90.6161,x:48.05,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:79.9781,x:48,y:49.05,regX:-45.9,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.2672,x:71,y:132.75,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.5,scaleX:0.9972,scaleY:0.9972,rotation:70.6878,x:71.2,y:135.75}},{t:this.instance_10,p:{regX:3.4,rotation:-2.3842,x:33.8,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.5571,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:10.4558,x:-41.9,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.9}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.7828,x:-6.3,y:-81.3,regY:51.1}},{t:this.instance_3,p:{regY:7.7,rotation:-96.4598,x:-84.1,y:55.65,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-111.4345,x:-82.2,y:142,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-132.3147,x:-82.2,y:141.75,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-71.9254,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:90.3085,x:48.1,y:-21.3,regY:13.6,regX:-32.3}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:78.4583,x:48.35,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.0046,x:73.65,y:132.1,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9972,scaleY:0.9972,rotation:71.6272,x:73.75,y:135.2}},{t:this.instance_10,p:{regX:3.4,rotation:-1.7984,x:33.8,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.5783,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:10.0259,x:-42,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.0125,x:-6.35,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-94.472,x:-85.6,y:55.15,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-109.4452,x:-86.55,y:141.45,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-131.139,x:-86.5,y:141.25,regX:14.5}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-70.762,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:90,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:76.941,x:48.6,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:75.7432,x:76.2,y:131.4,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.3,scaleX:0.9971,scaleY:0.9971,rotation:72.5683,x:76.35,y:134.65}},{t:this.instance_10,p:{regX:3.5,rotation:-1.212,x:33.9,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.5986,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:9.5964,x:-42.05,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.243,x:-6.35,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-92.4835,x:-87,y:54.4,scaleX:0.9973,scaleY:0.9973,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-107.4555,x:-90.85,y:140.85,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-129.9635,x:-90.9,y:140.55,regX:14.5}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-69.5983,x:-58.9,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:89.695,x:48.15,y:-21.4,regY:13.5,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:75.4216,x:49.1,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:75.4825,x:78.75,y:130.5,regY:13.7,regX:-7.6}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:73.5082,x:78.9,y:133.75}},{t:this.instance_10,p:{regX:3.4,rotation:-0.6249,x:33.8,y:185,regY:-50.9,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.6207,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:9.167,x:-41.95,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.4736,x:-6.35,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-90.4962,x:-88.35,y:53.95,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-105.466,x:-95.2,y:140.05,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-128.7884,x:-95.2,y:139.7,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-68.4343,x:-59.1,regY:10.1,regX:33.6,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:89.3874,x:48.1,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:73.9024,x:49.45,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:75.2214,x:81.3,y:129.8,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:74.4487,x:81.4,y:132.95}},{t:this.instance_10,p:{regX:3.4,rotation:-0.0395,x:33.75,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.6429,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:8.7365,x:-42,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.7042,x:-6.35,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.7,rotation:-88.5121,x:-89.55,y:53.35,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-103.4751,x:-99.5,y:139.2,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-127.6132,x:-99.5,y:138.75,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-67.2693,x:-58.95,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:89.0788,x:48.15,y:-21.45,regY:13.5,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:72.3845,x:49.85,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:74.96,x:83.7,y:128.95,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:75.3885,x:83.95,y:132}},{t:this.instance_10,p:{regX:3.5,rotation:0.5423,x:33.9,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.6631,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:8.3063,x:-41.95,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.933,x:-6.35,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-86.5246,x:-90.95,y:52.7,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-101.4844,x:-103.75,y:138.2,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-126.4385,x:-103.9,y:137.8,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-66.1059,x:-59.1,regY:10.1,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:88.7712,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:70.8651,x:50.2,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:74.6977,x:86.15,y:128.05,regY:13.8,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9972,scaleY:0.9972,rotation:76.3297,x:86.45,y:131.1}},{t:this.instance_10,p:{regX:3.4,rotation:1.1294,x:33.8,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.6842,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:7.8766,x:-42,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:3.1638,x:-6.35,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-84.5364,x:-92.3,y:51.9,scaleX:0.9973,scaleY:0.9973,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-99.4953,x:-108.1,y:137,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.1,scaleX:0.997,scaleY:0.997,rotation:-125.2626,x:-108.05,y:136.55,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-64.9424,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:48.95}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:88.4626,x:48.2,y:-21.4,regY:13.5,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:69.3465,x:50.5,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:74.4357,x:88.7,y:127,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9972,scaleY:0.9972,rotation:77.27,x:88.9,y:130.1}},{t:this.instance_10,p:{regX:3.4,rotation:1.7149,x:33.75,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.7072,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:7.4467,x:-41.95,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:3.3928,x:-6.35,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.5,rotation:-82.5484,x:-93.7,y:51.4,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-97.5053,x:-112.3,y:135.7,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-124.0872,x:-112.35,y:135.3,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-63.7784,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:48.95}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:88.9666,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:71.1506,x:49.9,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:74.9827,x:85.55,y:128.2,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:76.6147,x:85.8,y:131.3}},{t:this.instance_10,p:{regX:3.5,rotation:0.9422,x:33.95,y:184.95,regY:-50.9,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.6641,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:7.8766,x:-42,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:3.0225,x:-6.3,y:-81.35,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-85.0398,x:-92.35,y:52.05,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-99.9925,x:-107.45,y:137.1,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-125.3035,x:-107.45,y:136.75,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-64.8859,x:-59.05,regY:10.1,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:89.4715,x:48.1,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:72.9557,x:49.35,y:49.2,regX:-45.8,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:75.5295,x:82.35,y:129.2,regY:13.8,regX:-7.6}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:75.9587,x:82.65,y:132.4}},{t:this.instance_10,p:{regX:3.4,rotation:0.1679,x:33.8,y:184.95,regY:-50.9,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.6234,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:8.3063,x:-41.95,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.6525,x:-6.3,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-87.5297,x:-91.1,y:52.7,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-102.4791,x:-102.4,y:138.3,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-126.5195,x:-102.45,y:137.95,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-65.9948,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:89.9763,x:48.15,y:-21.4,regY:13.5,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:74.7594,x:48.8,y:49.25,regX:-45.8,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.0769,x:79.3,y:130.3,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9972,scaleY:0.9972,rotation:75.3043,x:79.45,y:133.4}},{t:this.instance_10,p:{regX:3.4,rotation:-0.6011,x:33.75,y:185,regY:-50.9,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.581,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:8.7365,x:-42,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:2.2825,x:-6.35,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.7,rotation:-90.0158,x:-89.7,y:53.25,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-104.9673,x:-97.45,y:139.25,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-127.7344,x:-97.5,y:139,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-67.1027,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:90.4759,x:48.05,y:-21.3,regY:13.6,regX:-32.3}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:76.5627,x:48.1,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.6226,x:76.1,y:131.2,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:74.6486,x:76.25,y:134.35}},{t:this.instance_10,p:{regX:3.5,rotation:-1.3729,x:33.9,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.5402,x:-4.25,y:-59.5,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:9.167,x:-41.95,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.9117,x:-6.3,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.5,rotation:-92.5062,x:-88.75,y:53.7,scaleX:0.9973,scaleY:0.9973,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-107.4555,x:-92.45,y:140.15,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-128.9492,x:-92.45,y:139.9,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-68.2113,x:-58.95,regY:10.2,regX:33.6,y:-12.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:90.9808,x:48.1,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:78.367,x:47.55,y:49.05,regX:-45.9,regY:12.7}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:77.1715,x:72.95,y:132.05,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9972,scaleY:0.9972,rotation:73.9943,x:73,y:135.25}},{t:this.instance_10,p:{regX:3.4,rotation:-2.1485,x:33.8,y:185.05,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.4979,x:-4.25,y:-59.45,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:9.5964,x:-42.05,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.5418,x:-6.25,y:-81.3,regY:51.1}},{t:this.instance_3,p:{regY:7.6,rotation:-94.9963,x:-87.35,y:54.5,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-109.9415,x:-87.45,y:140.8,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-130.1652,x:-87.5,y:140.5,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-69.32,x:-59,regY:10.2,regX:33.5,y:-12.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:91.4848,x:48.2,y:-21.35,regY:13.5,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:80.1703,x:46.85,y:49.1,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:77.7178,x:69.65,y:132.8,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:73.3406,x:69.75,y:135.95}},{t:this.instance_10,p:{regX:3.4,rotation:-2.9209,x:33.8,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.4564,x:-4.25,y:-59.4,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:10.0259,x:-42,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:1.1712,x:-6.3,y:-81.25,regY:51.1}},{t:this.instance_3,p:{regY:7.6,rotation:-97.4879,x:-86.05,y:54.95,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-112.4293,x:-82.35,y:141.25,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-131.3801,x:-82.4,y:141,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-70.4288,x:-58.9,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:91.9899,x:48.1,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:81.9752,x:46.25,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.2645,x:66.45,y:133.5,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:72.6844,x:66.45,y:136.6}},{t:this.instance_10,p:{regX:3.5,rotation:-3.6956,x:33.9,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.4141,x:-4.25,y:-59.35,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:10.4558,x:-41.9,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.9}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.8006,x:-6.25,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-99.9777,x:-84.7,y:55.5,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-114.9163,x:-77.45,y:141.55,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-132.5959,x:-77.4,y:141.25,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-71.5368,x:-59,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9975,rotation:92.4942,x:48.1,y:-21.45,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:83.7794,x:45.6,y:49.15,regX:-45.8,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:78.8103,x:63.1,y:134.05,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:72.0292,x:63.15,y:137.15}},{t:this.instance_10,p:{regX:3.4,rotation:-4.4683,x:33.75,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.3735,x:-4.25,y:-59.4,regY:7.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:10.886,x:-42,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.431,x:-6.25,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-102.468,x:-83.4,y:55.9,scaleX:0.9973,scaleY:0.9973,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-117.4037,x:-72.2,y:141.75,regY:-9,regX:4.3}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-133.8119,x:-72.45,y:141.35,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-72.6456,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:92.9979,x:48.05,y:-21.45,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:85.5827,x:44.9,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:79.3579,x:59.7,y:134.45,regY:13.8,regX:-7.6}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:71.3743,x:59.85,y:137.65}},{t:this.instance_10,p:{regX:3.4,rotation:-5.2427,x:33.8,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.3311,x:-4.25,y:-59.4,regY:7.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:11.3149,x:-42,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:0.0596,x:-6.2,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.5,rotation:-104.958,x:-82.15,y:56.4,scaleX:0.9972,scaleY:0.9972,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-119.8919,x:-67.3,y:141.5,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-135.0273,x:-67.4,y:141.25,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-73.7535,x:-59,regY:10.2,regX:33.5,y:-12.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:93.5026,x:48,y:-21.45,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:87.3867,x:44.35,y:49.05,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:79.9042,x:56.5,y:134.95,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:70.7208,x:56.45,y:138.05}},{t:this.instance_10,p:{regX:3.4,rotation:-6.0154,x:33.8,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.2913,x:-4.3,y:-59.4,regY:7.3,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:11.7446,x:-42,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.3066,x:-6.25,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-107.4485,x:-80.7,y:56.85,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-122.3775,x:-62.25,y:141.25,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-136.2427,x:-62.4,y:141,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-74.8624,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:94.0068,x:48.1,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:89.1917,x:43.8,y:49.15,regX:-45.8,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:80.4505,x:53.2,y:135.25,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9972,scaleY:0.9971,rotation:70.0646,x:53.1,y:138.3}},{t:this.instance_10,p:{regX:3.4,rotation:-6.7884,x:33.85,y:185.05,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.248,x:-4.3,y:-59.4,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:12.1739,x:-42,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-0.6771,x:-6.2,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-109.9391,x:-79.4,y:57.1,scaleX:0.9973,scaleY:0.9973,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-124.8653,x:-57.2,y:140.75,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-137.4575,x:-57.35,y:140.5,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-75.9701,x:-59.1,regY:10.1,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:94.5113,x:48.2,y:-21.25,regY:13.5,regX:-32.3}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:90.9898,x:43.15,y:49.1,regX:-45.8,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:80.9971,x:49.75,y:135.45,regY:13.8,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:69.4102,x:49.7,y:138.55}},{t:this.instance_10,p:{regX:3.4,rotation:-7.5636,x:33.85,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.2074,x:-4.3,y:-59.4,regY:7.3,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:12.6038,x:-41.95,y:185.85,scaleX:0.9949,scaleY:0.9949,regX:0.9}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.15,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.0459,x:-6.15,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-112.4292,x:-78.05,y:57.65,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-127.3528,x:-52.35,y:140.15,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-138.6739,x:-52.5,y:139.85,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-77.0791,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:95.0161,x:48.1,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:92.7949,x:42.5,y:49,regX:-45.8,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:81.5453,x:46.5,y:135.55,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:68.7556,x:46.4,y:138.65}},{t:this.instance_10,p:{regX:3.4,rotation:-8.3346,x:33.8,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.166,x:-4.3,y:-59.55,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:13.0338,x:-42,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.4174,x:-6.15,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.5,rotation:-114.9201,x:-76.75,y:58.05,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-129.8398,x:-47.35,y:139.3,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-139.8896,x:-47.6,y:139,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-78.1872,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:95.5205,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:94.5994,x:41.9,y:48.8,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:82.0925,x:43.05,y:135.65,regY:13.8,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:68.1011,x:43.05,y:138.65}},{t:this.instance_10,p:{regX:3.4,rotation:-9.1099,x:33.85,y:185.05,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.1245,x:-4.3,y:-59.55,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:13.4635,x:-42.05,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-1.7872,x:-6.15,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.7,rotation:-117.4104,x:-75.2,y:58.3,scaleX:0.9972,scaleY:0.9972,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-132.3267,x:-42.5,y:138.25,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-141.1049,x:-42.7,y:138,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-79.2966,x:-58.95,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:96.0252,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:96.404,x:41.3,y:48.8,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:82.6384,x:39.8,y:135.55,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9972,scaleY:0.9972,rotation:67.4459,x:39.6,y:138.6}},{t:this.instance_10,p:{regX:3.5,rotation:-9.8825,x:33.95,y:184.95,regY:-50.9,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.0821,x:-4.3,y:-59.55,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:13.8941,x:-42.05,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.158,x:-6.15,y:-81.5,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-119.9006,x:-73.95,y:58.5,scaleX:0.9973,scaleY:0.9973,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-134.8146,x:-37.7,y:137.1,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-142.32,x:-37.8,y:136.8,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-80.4042,x:-58.9,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:96.5304,x:48.1,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:98.2071,x:40.7,y:48.8,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:83.1854,x:36.45,y:135.3,regY:13.7,regX:-7.6}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9972,scaleY:0.9972,rotation:66.7909,x:36.2,y:138.45}},{t:this.instance_10,p:{regX:3.4,rotation:-10.6577,x:33.85,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-7.0397,x:-4.3,y:-59.55,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:14.3225,x:-42.1,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.5288,x:-6.1,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.6,rotation:-122.3916,x:-72.55,y:58.95,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-137.3017,x:-32.95,y:135.65,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-143.5352,x:-33.1,y:135.45,regX:14.5}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-81.5128,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:97.0344,x:48.1,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:100.0121,x:40.05,y:48.65,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:83.7325,x:33.1,y:135.15,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:66.1364,x:32.9,y:138.2}},{t:this.instance_10,p:{regX:3.4,rotation:-11.4289,x:33.85,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-6.999,x:-4.3,y:-59.55,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:14.753,x:-42.05,y:185.8,scaleX:0.9948,scaleY:0.9948,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-2.898,x:-6.05,y:-81.35,regY:51.1}},{t:this.instance_3,p:{regY:7.6,rotation:-124.8816,x:-71.25,y:59.05,scaleX:0.9973,scaleY:0.9973,regX:44.3}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-139.7887,x:-28.3,y:134.1,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-144.751,x:-28.5,y:133.9,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-82.6211,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9976,scaleY:0.9976,rotation:97.5389,x:48.1,y:-21.4,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:101.8157,x:39.4,y:48.6,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:84.2782,x:29.8,y:134.8,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.5,scaleX:0.9972,scaleY:0.9972,rotation:65.4814,x:29.45,y:137.75}},{t:this.instance_10,p:{regX:3.4,rotation:-12.203,x:33.9,y:185.15,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-6.9559,x:-4.35,y:-59.55,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:15.1824,x:-42.05,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.2691,x:-6.15,y:-81.5,regY:51}},{t:this.instance_3,p:{regY:7.5,rotation:-127.3726,x:-69.9,y:59.45,scaleX:0.9972,scaleY:0.9972,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-142.276,x:-23.7,y:132.4,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-145.967,x:-23.8,y:132.2,regX:14.5}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-83.7298,x:-59,regY:10.2,regX:33.6,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:98.0431,x:48.05,y:-21.35,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:103.6195,x:38.85,y:48.45,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:84.8252,x:26.5,y:134.4,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:64.8275,x:26.2,y:137.45}},{t:this.instance_10,p:{regX:3.4,rotation:-12.9772,x:33.9,y:185.1,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-6.9153,x:-4.35,y:-59.55,regY:7.2,scaleX:0.9981,scaleY:0.9981}},{t:this.instance_8,p:{rotation:15.6126,x:-42.05,y:185.8,scaleX:0.9949,scaleY:0.9949,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-3.6394,x:-6.05,y:-81.45,regY:51}},{t:this.instance_3,p:{regY:7.5,rotation:-129.8616,x:-68.5,y:59.65,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-144.7644,x:-19.25,y:130.6,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-147.1824,x:-19.4,y:130.35,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-84.838,x:-58.95,regY:10.2,regX:33.6,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-4.6,rotation:1.7182,x:-9.85,y:49}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:98.5472,x:48.15,y:-21.3,regY:13.6,regX:-32.4}},{t:this.instance_13,p:{scaleX:0.9973,scaleY:0.9973,rotation:105.4233,x:38.15,y:48.35,regX:-45.9,regY:12.8}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:85.3717,x:23.25,y:133.9,regY:13.7,regX:-7.5}},{t:this.instance_11,p:{regX:-10.4,scaleX:0.9971,scaleY:0.9971,rotation:64.1737,x:22.8,y:136.9}},{t:this.instance_10,p:{regX:3.5,rotation:-13.7498,x:34.05,y:185.05,regY:-50.8,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_9,p:{rotation:-6.8738,x:-4.35,y:-59.55,regY:7.2,scaleX:0.9982,scaleY:0.9982}},{t:this.instance_8,p:{rotation:16.0412,x:-42.15,y:185.75,scaleX:0.9948,scaleY:0.9948,regX:0.8}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:4.0092,x:-30.2,y:90.75}},{t:this.instance_6,p:{regX:0.2,scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,y:88.05,x:24.25}},{t:this.instance_5},{t:this.instance_4,p:{rotation:-4.009,x:-6.1,y:-81.4,regY:51}},{t:this.instance_3,p:{regY:7.5,rotation:-132.3527,x:-67.05,y:59.85,scaleX:0.9973,scaleY:0.9973,regX:44.2}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-147.2509,x:-14.7,y:128.55,regY:-9,regX:4.4}},{t:this.instance_1,p:{regY:-0.2,scaleX:0.997,scaleY:0.997,rotation:-148.3969,x:-14.95,y:128.25,regX:14.6}},{t:this.instance,p:{scaleX:0.9974,scaleY:0.9974,rotation:-85.946,x:-59.05,regY:10.2,regX:33.6,y:-12.4}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-119.9,-204.3,236.10000000000002,501.7);


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
p.nominalBounds = new cjs.Rectangle(-80.2,-71.5,171.10000000000002,152.5);


(lib.camel_02_interact = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.camel_leg_b_l_bcopy2("synched",0);
	this.instance.setTransform(76.35,42.15,0.9976,0.9976,-4.5599,0,0,4.9,-38.1);

	this.instance_1 = new lib.camel_leg_f_l_bcopy2("synched",0);
	this.instance_1.setTransform(-3.8,67.3,0.9989,0.9989,-14.471,0,0,3.8,-38.6);

	this.instance_2 = new lib.camel_leg_b_l_ucopy2("synched",0);
	this.instance_2.setTransform(53.95,-21.25,0.9983,0.9983,-27.6441,0,0,2.2,-27.9);

	this.instance_3 = new lib.camel_leg_f_l_ucopy2("synched",0);
	this.instance_3.setTransform(0.85,3.9,0.9991,0.9991,-2.5745,0,0,-0.7,-24.9);

	this.instance_4 = new lib.camel_headcopy2("synched",0);
	this.instance_4.setTransform(-63.75,-67.35,0.9989,0.9989,-11.7568,0,0,12.5,11.5);

	this.instance_5 = new lib.camel_neckcopy2("synched",0);
	this.instance_5.setTransform(-57.9,-33.7,0.9988,0.9988,19.9871,0,0,9.5,12.8);

	this.instance_6 = new lib.camel_bodycopy2("synched",0);
	this.instance_6.setTransform(-4.15,-35.75);

	this.instance_7 = new lib.camel_leg_f_r_bcopy2("synched",0);
	this.instance_7.setTransform(-36.75,58.2,0.9991,0.9991,-0.9635,0,0,3.4,-38.1);

	this.instance_8 = new lib.camel_leg_f_r_ucopy2("synched",0);
	this.instance_8.setTransform(-35.2,-9.4,0.9994,0.9994,-3.582,0,0,-1,-27.9);

	this.instance_9 = new lib.camel_tailcopy2("synched",0);
	this.instance_9.setTransform(55.8,-36.7,0.9992,0.9992,-1.9324,0,0,-8.4,-35.8);

	this.instance_10 = new lib.camel_leg_b_r_bcopy2("synched",0);
	this.instance_10.setTransform(59.4,33.1,0.9979,0.9979,-5.9258,0,0,4.7,-37.3);

	this.instance_11 = new lib.camel_leg_b_r_ucopy2("synched",0);
	this.instance_11.setTransform(32.45,-29.1,0.9974,0.9974,-29.7281,0,0,0.4,-28.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11,p:{scaleX:0.9974,scaleY:0.9974,rotation:-29.7281,x:32.45,y:-29.1,regX:0.4}},{t:this.instance_10,p:{regY:-37.3,rotation:-5.9258,x:59.4,y:33.1}},{t:this.instance_9,p:{scaleX:0.9992,scaleY:0.9992,rotation:-1.9324,x:55.8,y:-36.7,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-3.582,x:-35.2,y:-9.4}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-0.9635,x:-36.75,y:58.2}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.8,scaleX:0.9988,scaleY:0.9988,rotation:19.9871,x:-57.9,y:-33.7,regX:9.5}},{t:this.instance_4,p:{regX:12.5,scaleX:0.9989,scaleY:0.9989,rotation:-11.7568,x:-63.75,y:-67.35,regY:11.5}},{t:this.instance_3,p:{regY:-24.9,scaleX:0.9991,scaleY:0.9991,rotation:-2.5745,x:0.85,y:3.9}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-27.6441,x:53.95,y:-21.25,regX:2.2}},{t:this.instance_1,p:{x:-3.8,y:67.3,scaleX:0.9989,scaleY:0.9989,rotation:-14.471}},{t:this.instance,p:{rotation:-4.5599,x:76.35,y:42.15}}]}).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-29.05,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9253,x:59.35,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.4666,x:55.7,y:-36.75,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5814,x:-35.15,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9627,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9097,x:-57.8,y:-33.65,regX:9.5}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-11.1357,x:-63.8,y:-67.35,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5738,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6442,x:53.9,y:-21.3,regX:2.2}},{t:this.instance_1,p:{x:-3.85,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.471}},{t:this.instance,p:{rotation:-4.5585,x:76.25,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-29.05,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9253,x:59.35,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-3.0029,x:55.7,y:-36.6,regY:-35.7,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5814,x:-35.15,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9618,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.8311,x:-57.8,y:-33.7,regX:9.5}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-10.513,x:-63.8,y:-67.25,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5738,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6442,x:53.9,y:-21.3,regX:2.2}},{t:this.instance_1,p:{x:-3.85,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.471}},{t:this.instance,p:{rotation:-4.5585,x:76.25,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-29.05,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9253,x:59.35,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-3.5392,x:55.7,y:-36.7,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5814,x:-35.15,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9618,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.7533,x:-57.8,y:-33.65,regX:9.5}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-9.8901,x:-63.9,y:-67.3,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5729,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6442,x:53.9,y:-21.35,regX:2.2}},{t:this.instance_1,p:{x:-3.9,y:67.25,scaleX:0.9988,scaleY:0.9988,rotation:-14.4704}},{t:this.instance,p:{rotation:-4.5585,x:76.25,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-29.05,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9253,x:59.35,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-4.0741,x:55.75,y:-36.65,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5805,x:-35.15,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9618,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.6744,x:-57.75,y:-33.65,regX:9.5}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-9.2682,x:-63.95,y:-67.25,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5729,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6442,x:53.9,y:-21.35,regX:2.2}},{t:this.instance_1,p:{x:-3.9,y:67.25,scaleX:0.9988,scaleY:0.9988,rotation:-14.4704}},{t:this.instance,p:{rotation:-4.5585,x:76.25,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-29,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9253,x:59.35,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-4.6104,x:55.8,y:-36.7,regY:-35.8,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5805,x:-35.15,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9609,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.5971,x:-57.8,y:-33.65,regX:9.5}},{t:this.instance_4,p:{regX:12.5,scaleX:0.9988,scaleY:0.9988,rotation:-8.6451,x:-63.85,y:-67.3,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5729,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6442,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-3.9,y:67.25,scaleX:0.9988,scaleY:0.9988,rotation:-14.4704}},{t:this.instance,p:{rotation:-4.5576,x:76.25,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-29,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9245,x:59.35,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-5.1452,x:55.7,y:-36.65,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5805,x:-35.15,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9609,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.519,x:-57.8,y:-33.7,regX:9.5}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-8.0233,x:-64,y:-67.25,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.572,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6442,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-3.95,y:67.25,scaleX:0.9988,scaleY:0.9988,rotation:-14.4704}},{t:this.instance,p:{rotation:-4.5576,x:76.25,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-28.95,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9245,x:59.35,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-5.6824,x:55.65,y:-36.65,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5796,x:-35.15,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.96,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.441,x:-57.75,y:-33.7,regX:9.5}},{t:this.instance_4,p:{regX:12.5,scaleX:0.9988,scaleY:0.9988,rotation:-7.3996,x:-63.85,y:-67.2,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.572,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-3.95,y:67.25,scaleX:0.9988,scaleY:0.9988,rotation:-14.4704}},{t:this.instance,p:{rotation:-4.5576,x:76.25,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-28.95,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9245,x:59.35,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-6.2163,x:55.65,y:-36.6,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5796,x:-35.15,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.96,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.3635,x:-57.8,y:-33.7,regX:9.5}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-6.7778,x:-64.1,y:-67.25,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.572,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-3.95,y:67.25,scaleX:0.9988,scaleY:0.9988,rotation:-14.4704}},{t:this.instance,p:{rotation:-4.5576,x:76.25,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.35,y:-28.95,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9237,x:59.35,y:33.05}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-6.7536,x:55.6,y:-36.5,regY:-35.7,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5787,x:-35.15,y:-9.5}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.96,x:-36.65,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.2851,x:-57.9,y:-33.7,regX:9.4}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-6.1549,x:-64.05,y:-67.2,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5711,x:0.75,y:3.85}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9988,scaleY:0.9988,rotation:-14.4704}},{t:this.instance,p:{rotation:-4.5567,x:76.25,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.35,y:-28.9,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9237,x:59.3,y:33.05}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-7.5067,x:55.75,y:-36.55,regY:-35.8,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5787,x:-35.1,y:-9.5}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.96,x:-36.65,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.3502,x:-57.8,y:-33.6,regX:9.5}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-7.269,x:-64.05,y:-67.15,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5711,x:0.75,y:3.85}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9988,scaleY:0.9988,rotation:-14.4704}},{t:this.instance,p:{rotation:-4.5567,x:76.2,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.35,y:-28.9,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9237,x:59.3,y:33.05}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-8.2603,x:55.65,y:-36.6,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5787,x:-35.1,y:-9.5}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9592,x:-36.65,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.4152,x:-57.8,y:-33.7,regX:9.5}},{t:this.instance_4,p:{regX:12.3,scaleX:0.9988,scaleY:0.9988,rotation:-8.3833,x:-64.1,y:-67.2,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5711,x:0.75,y:3.85}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9988,scaleY:0.9988,rotation:-14.4704}},{t:this.instance,p:{rotation:-4.5567,x:76.2,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.35,y:-28.9,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9237,x:59.3,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-9.0153,x:55.6,y:-36.6,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5787,x:-35.1,y:-9.5}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9592,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.48,x:-57.8,y:-33.65,regX:9.5}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-9.4979,x:-63.95,y:-67.2,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5711,x:0.75,y:3.85}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4702}},{t:this.instance,p:{rotation:-4.5567,x:76.2,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-28.9,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9237,x:59.3,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-9.7685,x:55.75,y:-36.65,regY:-35.8,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5787,x:-35.1,y:-9.5}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9592,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.5451,x:-57.8,y:-33.7,regX:9.5}},{t:this.instance_4,p:{regX:12.3,scaleX:0.9988,scaleY:0.9988,rotation:-10.6109,x:-64.1,y:-67.15,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5711,x:0.75,y:3.85}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4693}},{t:this.instance,p:{rotation:-4.5567,x:76.2,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-28.9,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9237,x:59.3,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-10.5222,x:55.65,y:-36.45,regY:-35.7,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5787,x:-35.1,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9592,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.6101,x:-57.75,y:-33.65,regX:9.5}},{t:this.instance_4,p:{regX:12.5,scaleX:0.9988,scaleY:0.9988,rotation:-11.726,x:-63.85,y:-67.15,regY:11.6}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5711,x:0.75,y:3.85}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4693}},{t:this.instance,p:{rotation:-4.5567,x:76.2,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-28.85,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9237,x:59.3,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-11.2761,x:55.6,y:-36.6,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5787,x:-35.1,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9592,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.6744,x:-57.75,y:-33.65,regX:9.5}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-12.8395,x:-63.9,y:-67.2,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5711,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4693}},{t:this.instance,p:{rotation:-4.5567,x:76.2,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-28.85,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9237,x:59.3,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-12.03,x:55.6,y:-36.55,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5787,x:-35.1,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9592,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.7403,x:-57.8,y:-33.65,regX:9.5}},{t:this.instance_4,p:{regX:12.3,scaleX:0.9988,scaleY:0.9988,rotation:-13.952,x:-64.05,y:-67.15,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5711,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4693}},{t:this.instance,p:{rotation:-4.5567,x:76.2,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-28.85,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9237,x:59.3,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-12.7827,x:55.6,y:-36.6,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5787,x:-35.1,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9592,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.8053,x:-57.75,y:-33.6,regX:9.5}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-15.0676,x:-63.85,y:-67.05,regY:11.6}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5711,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4693}},{t:this.instance,p:{rotation:-4.5567,x:76.2,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-28.85,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9237,x:59.3,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-13.5371,x:55.7,y:-36.6,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5787,x:-35.1,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9592,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.8704,x:-57.8,y:-33.65,regX:9.5}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-16.1803,x:-63.8,y:-67.15,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5711,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4693}},{t:this.instance,p:{rotation:-4.5559,x:76.2,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-28.85,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9237,x:59.3,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-14.2907,x:55.55,y:-36.6,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5787,x:-35.1,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9592,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9346,x:-57.8,y:-33.65,regX:9.5}},{t:this.instance_4,p:{regX:12.3,scaleX:0.9988,scaleY:0.9988,rotation:-17.2953,x:-63.9,y:-67.2,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5711,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4693}},{t:this.instance,p:{rotation:-4.5559,x:76.2,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7285,x:32.4,y:-28.8,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9237,x:59.25,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-15.0459,x:55.65,y:-36.55,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5787,x:-35.05,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9592,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9984,x:-57.9,y:-33.8,regX:9.4}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-18.4095,x:-63.75,y:-67.2,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5703,x:0.8,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6431,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4693}},{t:this.instance,p:{rotation:-4.5559,x:76.2,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7336,x:32.4,y:-28.9,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.9077,x:59.35,y:33.15}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-14.0199,x:55.6,y:-36.6,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5674,x:-35.15,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.9294,x:-36.65,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9984,x:-57.9,y:-33.8,regX:9.4}},{t:this.instance_4,p:{regX:12.5,scaleX:0.9988,scaleY:0.9988,rotation:-17.8777,x:-63.6,y:-67.15,regY:11.6}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5492,x:0.75,y:3.9}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6313,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4576}},{t:this.instance,p:{rotation:-4.5585,x:76.2,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7378,x:32.4,y:-28.9,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.8928,x:59.35,y:33.15}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-12.9944,x:55.6,y:-36.6,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5569,x:-35.1,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.8997,x:-36.7,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9984,x:-57.95,y:-33.8,regX:9.4}},{t:this.instance_4,p:{regX:12.3,scaleX:0.9988,scaleY:0.9988,rotation:-17.3479,x:-63.85,y:-67.2,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5273,x:0.75,y:3.95}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6203,x:53.9,y:-21.45,regX:2.2}},{t:this.instance_1,p:{x:-3.95,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4468}},{t:this.instance,p:{rotation:-4.5593,x:76.15,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7426,x:32.4,y:-28.9,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.8778,x:59.35,y:33.05}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-11.9686,x:55.65,y:-36.6,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5454,x:-35.05,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.8699,x:-36.75,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9984,x:-57.95,y:-33.8,regX:9.4}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-16.8185,x:-63.8,y:-67.25,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.5072,x:0.75,y:3.95}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.6098,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4.05,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4351}},{t:this.instance,p:{rotation:-4.5612,x:76.15,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7477,x:32.3,y:-28.85,regX:0.3}},{t:this.instance_10,p:{regY:-37.3,rotation:-5.8638,x:59.35,y:33.05}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-10.9442,x:55.6,y:-36.6,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.534,x:-35.1,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.8401,x:-36.7,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9984,x:-57.95,y:-33.8,regX:9.4}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-16.2867,x:-63.75,y:-67.15,regY:11.6}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.4853,x:0.85,y:3.95}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.5996,x:53.9,y:-21.4,regX:2.2}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4241}},{t:this.instance,p:{rotation:-4.5629,x:76.2,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7536,x:32.4,y:-28.95,regX:0.4}},{t:this.instance_10,p:{regY:-37.3,rotation:-5.8486,x:59.35,y:33}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-9.9192,x:55.65,y:-36.65,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5227,x:-35.1,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.8104,x:-36.75,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9984,x:-57.95,y:-33.8,regX:9.4}},{t:this.instance_4,p:{regX:12.3,scaleX:0.9988,scaleY:0.9988,rotation:-15.7559,x:-63.9,y:-67.2,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.4634,x:0.8,y:3.95}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.5886,x:54,y:-21.45,regX:2.3}},{t:this.instance_1,p:{x:-4.05,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4133}},{t:this.instance,p:{rotation:-4.5655,x:76.15,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7587,x:32.4,y:-28.95,regX:0.4}},{t:this.instance_10,p:{regY:-37.3,rotation:-5.8338,x:59.3,y:32.95}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-8.8939,x:55.65,y:-36.65,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5122,x:-35.1,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.7806,x:-36.75,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9984,x:-57.95,y:-33.8,regX:9.4}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-15.2265,x:-63.8,y:-67.2,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.4424,x:0.8,y:3.95}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.5784,x:54,y:-21.4,regX:2.3}},{t:this.instance_1,p:{x:-4.05,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.4016}},{t:this.instance,p:{rotation:-4.5673,x:76.15,y:42.1}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7638,x:32.4,y:-29,regX:0.4}},{t:this.instance_10,p:{regY:-37.3,rotation:-5.8188,x:59.35,y:33}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-7.8687,x:55.7,y:-36.7,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.5008,x:-35.1,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.7509,x:-36.75,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9984,x:-57.95,y:-33.8,regX:9.4}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-14.6954,x:-63.75,y:-67.25,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.4205,x:0.8,y:3.95}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.5682,x:54,y:-21.4,regX:2.3}},{t:this.instance_1,p:{x:-4.05,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.3908}},{t:this.instance,p:{rotation:-4.569,x:76.15,y:42.15}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7677,x:32.4,y:-29,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.8038,x:59.35,y:33.15}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-6.8426,x:55.65,y:-36.65,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.4911,x:-35.15,y:-9.45}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.7211,x:-36.8,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9984,x:-57.95,y:-33.8,regX:9.4}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-14.1638,x:-63.8,y:-67.25,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.3985,x:0.8,y:3.95}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.5561,x:54,y:-21.45,regX:2.3}},{t:this.instance_1,p:{x:-4,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.3791}},{t:this.instance,p:{rotation:-4.5708,x:76.15,y:42.15}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7736,x:32.4,y:-29.05,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.7889,x:59.35,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-5.8178,x:55.65,y:-36.7,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.4797,x:-35.15,y:-9.4}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-0.6905,x:-36.8,y:58.15}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9984,x:-57.95,y:-33.8,regX:9.4}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.6337,x:-63.75,y:-67.25,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.3775,x:0.8,y:3.95}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.5451,x:53.9,y:-21.3,regX:2.2}},{t:this.instance_1,p:{x:-4.05,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.3691}},{t:this.instance,p:{rotation:-4.5735,x:76.15,y:42.15}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7787,x:32.4,y:-29.05,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.7721,x:59.35,y:33.15}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-4.7931,x:55.75,y:-36.7,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.4692,x:-35.15,y:-9.4}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.6607,x:-36.85,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9984,x:-57.95,y:-33.8,regX:9.4}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-13.1029,x:-63.8,y:-67.25,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.3557,x:0.8,y:3.95}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.5345,x:53.95,y:-21.3,regX:2.2}},{t:this.instance_1,p:{x:-4.1,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.3572}},{t:this.instance,p:{rotation:-4.5753,x:76.15,y:42.15}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.783,x:32.4,y:-29.05,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.758,x:59.4,y:33.15}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-3.7671,x:55.75,y:-36.7,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.4578,x:-35.15,y:-9.4}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-0.631,x:-36.8,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9984,x:-57.95,y:-33.8,regX:9.4}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-12.5731,x:-63.8,y:-67.25,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.3346,x:0.8,y:4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.5244,x:53.95,y:-21.3,regX:2.2}},{t:this.instance_1,p:{x:-4.05,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.3455}},{t:this.instance,p:{rotation:-4.577,x:76.15,y:42.15}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7882,x:32.4,y:-29.05,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.7431,x:59.4,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.7426,x:55.7,y:-36.75,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.4473,x:-35.15,y:-9.4}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.6012,x:-36.85,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:19.9984,x:-57.95,y:-33.8,regX:9.4}},{t:this.instance_4,p:{regX:12.4,scaleX:0.9988,scaleY:0.9988,rotation:-12.0421,x:-63.8,y:-67.3,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.3128,x:0.8,y:4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.5126,x:53.95,y:-21.3,regX:2.2}},{t:this.instance_1,p:{x:-4.1,y:67.25,scaleX:0.9989,scaleY:0.9989,rotation:-14.3356}},{t:this.instance,p:{rotation:-4.5796,x:76.15,y:42.15}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9973,scaleY:0.9973,rotation:-29.7933,x:32.4,y:-29.1,regX:0.4}},{t:this.instance_10,p:{regY:-37.2,rotation:-5.7281,x:59.45,y:33.1}},{t:this.instance_9,p:{scaleX:0.9991,scaleY:0.9991,rotation:-1.718,x:55.85,y:-36.7,regY:-35.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9993,scaleY:0.9993,rotation:-3.4359,x:-35.1,y:-9.4}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-0.5715,x:-36.9,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{regY:12.7,scaleX:0.9987,scaleY:0.9987,rotation:20.0524,x:-57.8,y:-33.75,regX:9.5}},{t:this.instance_4,p:{regX:12.5,scaleX:0.9988,scaleY:0.9988,rotation:-11.4574,x:-63.55,y:-67.4,regY:11.5}},{t:this.instance_3,p:{regY:-24.8,scaleX:0.999,scaleY:0.999,rotation:-2.2909,x:0.8,y:4}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.502,x:53.95,y:-21.25,regX:2.2}},{t:this.instance_1,p:{x:-4.1,y:67.25,scaleX:0.9988,scaleY:0.9988,rotation:-14.323}},{t:this.instance,p:{rotation:-4.5813,x:76.15,y:42.25}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-111.4,-108.8,199,259.3);


(lib.camel_02_button = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.camel_leg_b_l_bcopy2("synched",0);
	this.instance.setTransform(77.1,27.6,0.9976,0.9976,-4.5599,0,0,4.9,-38.1);

	this.instance_1 = new lib.camel_leg_f_l_bcopy2("synched",0);
	this.instance_1.setTransform(-3.05,52.75,0.9989,0.9989,-14.471,0,0,3.8,-38.6);

	this.instance_2 = new lib.camel_leg_b_l_ucopy2("synched",0);
	this.instance_2.setTransform(54.7,-35.8,0.9983,0.9983,-27.6441,0,0,2.2,-27.9);

	this.instance_3 = new lib.camel_leg_f_l_ucopy2("synched",0);
	this.instance_3.setTransform(1.6,-10.55,0.9991,0.9991,-2.5745,0,0,-0.7,-24.8);

	this.instance_4 = new lib.camel_headcopy2("synched",0);
	this.instance_4.setTransform(-63,-81.8,0.9989,0.9989,-11.7568,0,0,12.5,11.6);

	this.instance_5 = new lib.camel_neckcopy2("synched",0);
	this.instance_5.setTransform(-57.25,-48.4,0.9988,0.9988,19.9871,0,0,9.4,12.7);

	this.instance_6 = new lib.camel_bodycopy2("synched",0);
	this.instance_6.setTransform(-3.4,-50.3);

	this.instance_7 = new lib.camel_leg_f_r_bcopy2("synched",0);
	this.instance_7.setTransform(-36,43.65,0.9991,0.9991,-0.9635,0,0,3.4,-38.1);

	this.instance_8 = new lib.camel_leg_f_r_ucopy2("synched",0);
	this.instance_8.setTransform(-34.45,-23.95,0.9994,0.9994,-3.582,0,0,-1,-27.9);

	this.instance_9 = new lib.camel_tailcopy2("synched",0);
	this.instance_9.setTransform(56.55,-51.25,0.9992,0.9992,-1.9324,0,0,-8.4,-35.8);

	this.instance_10 = new lib.camel_leg_b_r_bcopy2("synched",0);
	this.instance_10.setTransform(60.15,18.65,0.9979,0.9979,-5.9258,0,0,4.7,-37.2);

	this.instance_11 = new lib.camel_leg_b_r_ucopy2("synched",0);
	this.instance_11.setTransform(33.2,-43.65,0.9974,0.9974,-29.7281,0,0,0.4,-28.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[]},1).wait(1));

	// Layer_1
	this.instance_12 = new lib.camel_02_interact();
	this.instance_12.setTransform(-5.25,6.25,1,1,0,0,0,-6,20.8);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-108,-123.4,205.6,259.4);


(lib.camel_02 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.camel_leg_b_l_bcopy_1("synched",0);
	this.instance.setTransform(76.25,42.15,0.9977,0.9977,-4.5607,0,0,4.8,-38.1);

	this.instance_1 = new lib.camel_leg_f_l_bcopy_1("synched",0);
	this.instance_1.setTransform(-3.8,67.3,0.999,0.999,-14.4714,0,0,3.8,-38.6);

	this.instance_2 = new lib.camel_leg_b_l_ucopy_1("synched",0);
	this.instance_2.setTransform(53.95,-21.2,0.9983,0.9983,-27.6445,0,0,2.2,-27.9);

	this.instance_3 = new lib.camel_leg_f_l_ucopy_1("synched",0);
	this.instance_3.setTransform(0.85,3.9,0.9991,0.9991,-2.5753,0,0,-0.7,-24.9);

	this.instance_4 = new lib.camel_headcopy_1("synched",0);
	this.instance_4.setTransform(-63.75,-67.35,0.9989,0.9989,-11.7583,0,0,12.5,11.5);

	this.instance_5 = new lib.camel_neckcopy_1("synched",0);
	this.instance_5.setTransform(-57.8,-33.65,0.9988,0.9988,19.9877,0,0,9.6,12.8);

	this.instance_6 = new lib.camel_bodycopy_1("synched",0);
	this.instance_6.setTransform(-4.15,-35.75);

	this.instance_7 = new lib.camel_leg_f_r_bcopy_1("synched",0);
	this.instance_7.setTransform(-35.9,58.2,0.9991,0.9991,-44.552,0,0,3.4,-38.1);

	this.instance_8 = new lib.camel_leg_f_r_ucopy_1("synched",0);
	this.instance_8.setTransform(-35.2,-9.3,0.9994,0.9994,-4.3343,0,0,-1,-27.9);

	this.instance_9 = new lib.camel_tailcopy_1("synched",0);
	this.instance_9.setTransform(55.8,-36.8,0.9992,0.9992,-1.9332,0,0,-8.4,-35.9);

	this.instance_10 = new lib.camel_leg_b_r_bcopy_1("synched",0);
	this.instance_10.setTransform(59.4,33,0.998,0.998,-5.9283,0,0,4.7,-37.4);

	this.instance_11 = new lib.camel_leg_b_r_ucopy_1("synched",0);
	this.instance_11.setTransform(32.45,-29.2,0.9974,0.9974,-29.7285,0,0,0.4,-29);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11,p:{regY:-29,rotation:-29.7285,y:-29.2,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.4,scaleX:0.998,scaleY:0.998,rotation:-5.9283,x:59.4,y:33,regX:4.7}},{t:this.instance_9,p:{regY:-35.9,scaleX:0.9992,scaleY:0.9992,rotation:-1.9332,x:55.8,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{rotation:-4.3343,x:-35.2,y:-9.3,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-44.552,x:-35.9,y:58.2,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:19.9877,y:-33.65,regX:9.6,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.7583,x:-63.75,y:-67.35,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-2.5753,x:0.85,y:3.9,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-27.6445,x:53.95,y:-21.2,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.999,scaleY:0.999,rotation:-14.4714,x:-3.8,y:67.3}},{t:this.instance,p:{regX:4.8,regY:-38.1,scaleX:0.9977,scaleY:0.9977,rotation:-4.5607,x:76.25,y:42.15}}]}).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-28.9065,y:-29.15,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-5.6761,x:58.45,y:33.45,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.0025,x:55.7,y:-36.75,regX:-8.4}},{t:this.instance_8,p:{rotation:-4.0511,x:-35.15,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-42.7569,x:-36.25,y:58.2,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:19.8028,y:-33.5,regX:9.6,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-12.3901,x:-63.8,y:-67.3,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-3.0556,x:0.8,y:3.8,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-28.0924,x:53.85,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-14.4425,x:-3.3,y:67.25}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-4.7263,x:76.75,y:42}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-28.0843,y:-29.15,regX:0.3,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-5.4251,x:57.6,y:33.8,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.0725,x:55.7,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{rotation:-3.7689,x:-35.2,y:-9.35,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-40.9621,x:-36.6,y:58.15,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:19.6181,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.85,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-13.0239,x:-63.95,y:-67.2,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-3.5377,x:0.8,y:3.8,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-28.5403,x:53.9,y:-21.3,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-14.4137,x:-2.85,y:67.3}},{t:this.instance,p:{regX:4.8,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-4.8934,x:77.2,y:41.95}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-27.2629,y:-29.1,regX:0.3,x:32.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.2,scaleX:0.9979,scaleY:0.9979,rotation:-5.1725,x:56.65,y:34.3,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.1426,x:55.7,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{rotation:-3.4874,x:-35.15,y:-9.4,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-39.167,x:-36.9,y:58.2,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:19.434,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.85,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-13.6579,x:-64.05,y:-67.25,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-4.0192,x:0.8,y:3.8,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-28.9887,x:53.8,y:-21.3,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-14.3846,x:-2.3,y:67.3}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-5.0605,x:77.75,y:41.65}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-26.4408,y:-29.15,regX:0.4,x:32.45,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-4.921,x:55.75,y:34.45,regX:4.7}},{t:this.instance_9,p:{regY:-35.9,scaleX:0.9991,scaleY:0.9991,rotation:-2.2126,x:55.7,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{rotation:-3.2053,x:-35.2,y:-9.4,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-37.3724,x:-37.2,y:58.15,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:19.2482,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.85,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-14.2899,x:-64.15,y:-67.1,regY:11.6,regX:12.5}},{t:this.instance_3,p:{rotation:-4.5018,x:0.8,y:3.8,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-29.4357,x:53.8,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-14.3549,x:-1.7,y:67.35}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-5.2294,x:78.25,y:41.45}}]},1).to({state:[{t:this.instance_11,p:{regY:-29,rotation:-25.6183,y:-29.25,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-4.6696,x:54.8,y:34.75,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.2827,x:55.75,y:-36.75,regX:-8.4}},{t:this.instance_8,p:{rotation:-2.9232,x:-35.15,y:-9.4,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-35.5778,x:-37.55,y:58.15,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:19.0633,y:-33.55,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.9,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-14.9226,x:-64.3,y:-67.15,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-4.983,x:0.85,y:3.8,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-29.886,x:53.8,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-14.326,x:-1.25,y:67.35}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-5.3949,x:78.8,y:41.35}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-24.7972,y:-29.1,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.2,scaleX:0.9979,scaleY:0.9979,rotation:-4.4173,x:54.05,y:35.2,regX:4.8}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.3519,x:55.75,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{rotation:-2.6411,x:-35.2,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-33.7845,x:-37.9,y:58.1,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:18.8798,y:-33.65,regX:9.6,scaleX:0.9988,scaleY:0.9988,x:-57.7,regY:12.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-15.5569,x:-64.35,y:-67.15,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-5.4656,x:0.8,y:3.8,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-30.3326,x:53.75,y:-21.35,regY:-28,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-14.2959,x:-0.5,y:67.35}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-5.5631,x:79.25,y:41.1}}]},1).to({state:[{t:this.instance_11,p:{regY:-29,rotation:-23.9757,y:-29.25,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-4.1652,x:53.05,y:35.4,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9992,scaleY:0.9992,rotation:-2.4219,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{rotation:-2.3592,x:-35.2,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-31.9889,x:-38.2,y:58.05,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{rotation:18.6938,y:-33.6,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-16.1901,x:-64.4,y:-67.05,regY:11.6,regX:12.5}},{t:this.instance_3,p:{rotation:-5.9474,x:0.75,y:3.75,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-30.7814,x:53.8,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-14.267,x:-0.1,y:67.35}},{t:this.instance,p:{regX:4.8,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-5.7295,x:79.6,y:40.95}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-23.1532,y:-29.2,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-3.9131,x:52.1,y:35.7,regX:4.7}},{t:this.instance_9,p:{regY:-35.9,scaleX:0.9991,scaleY:0.9991,rotation:-2.4911,x:55.7,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{rotation:-2.0755,x:-35.15,y:-9.3,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-30.1938,x:-38.55,y:58.1,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:18.5094,y:-33.6,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-16.8237,x:-64.75,y:-67.1,regY:11.5,regX:12.4}},{t:this.instance_3,p:{rotation:-6.4298,x:0.75,y:3.85,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-31.2284,x:53.75,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-14.2392,x:0.45,y:67.35}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-5.8969,x:80.2,y:40.7}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-22.3309,y:-29.15,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-3.6611,x:51.15,y:35.95,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.5612,x:55.7,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{rotation:-1.7937,x:-35.15,y:-9.3,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-28.3989,x:-38.9,y:58.1,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:18.3239,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-17.4567,x:-64.7,y:-67.1,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-6.911,x:0.75,y:3.8,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-31.6786,x:53.65,y:-21.45,regY:-28,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-14.2095,x:1.1,y:67.3}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-6.0635,x:80.65,y:40.5}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-21.5097,y:-29.1,regX:0.3,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-3.4092,x:50.3,y:36.2,regX:4.8}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.6322,x:55.7,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{rotation:-1.511,x:-35.2,y:-9.35,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-26.6038,x:-39.2,y:58.1,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:18.1407,y:-33.6,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.85,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.0901,x:-64.95,y:-67.05,regY:11.5,regX:12.4}},{t:this.instance_3,p:{rotation:-7.3933,x:0.8,y:3.9,scaleX:0.999,scaleY:0.999,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-32.1251,x:53.7,y:-21.4,regY:-28,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-14.1804,x:1.55,y:67.3}},{t:this.instance,p:{regX:4.9,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:-6.2318,x:81.15,y:40.1}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-20.6878,y:-29.2,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-3.1573,x:49.25,y:36.4,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.7022,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{rotation:-1.231,x:-35.15,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-24.8103,x:-39.5,y:58,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{rotation:17.9547,y:-33.7,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.7228,x:-64.9,y:-67,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-7.8755,x:0.75,y:3.75,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-32.5738,x:53.75,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-14.1507,x:2.05,y:67.3}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-6.3976,x:81.65,y:40.1}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-19.8655,y:-29.15,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-2.9047,x:48.3,y:36.6,regX:4.7}},{t:this.instance_9,p:{regY:-35.9,scaleX:0.9991,scaleY:0.9991,rotation:-2.7715,x:55.7,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{rotation:-0.9484,x:-35.15,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-23.0143,x:-39.9,y:57.95,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:17.7703,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-19.3573,x:-64.95,y:-66.9,regY:11.6,regX:12.5}},{t:this.instance_3,p:{rotation:-8.3581,x:0.75,y:3.75,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-33.0213,x:53.7,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-14.1218,x:2.7,y:67.25}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-6.5651,x:82.15,y:39.8}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-19.0434,y:-29.2,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-2.653,x:47.5,y:36.8,regX:4.8}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.8416,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{rotation:-0.6658,x:-35.2,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-21.2203,x:-40.3,y:57.9,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:17.5851,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-19.9899,x:-65.1,y:-67,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-8.8388,x:0.75,y:3.7,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-33.4702,x:53.8,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-14.0927,x:3.15,y:67.3}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-6.7327,x:82.55,y:39.65}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-18.2221,y:-29.2,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-2.4012,x:46.4,y:37.05,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.9116,x:55.75,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{rotation:-0.3832,x:-35.15,y:-9.5,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-19.4265,x:-40.55,y:57.9,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:17.3999,y:-33.55,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-20.6234,x:-65.2,y:-66.95,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-9.3216,x:0.75,y:3.7,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-33.9186,x:53.7,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-14.0632,x:3.75,y:67.25}},{t:this.instance,p:{regX:4.9,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:-6.8995,x:83.1,y:39.2}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-17.3993,y:-29.15,regX:0.4,x:32.45,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.4,scaleX:0.9979,scaleY:0.9979,rotation:-2.1478,x:45.45,y:37.1,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.9809,x:55.7,y:-36.75,regX:-8.4}},{t:this.instance_8,p:{rotation:-0.1006,x:-35.15,y:-9.45,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-17.6313,x:-40.9,y:57.9,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:17.2155,y:-33.6,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.85,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-21.2567,x:-65.35,y:-66.95,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-9.8029,x:0.7,y:3.7,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-34.3656,x:53.75,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-14.0343,x:4.15,y:67.3}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-7.0683,x:83.55,y:39.2}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-16.5777,y:-29.15,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-1.898,x:44.5,y:37.4,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.051,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{rotation:0.1758,x:-35.15,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-15.8355,x:-41.2,y:57.85,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:17.0314,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.85,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-21.8898,x:-65.4,y:-66.9,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-10.2854,x:0.7,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-34.8153,x:53.7,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-14.0053,x:4.7,y:67.25}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-7.2344,x:84.05,y:38.9}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-15.756,y:-29.15,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-1.6447,x:43.65,y:37.55,regX:4.8}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.1211,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{rotation:0.4584,x:-35.2,y:-9.5,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-14.0413,x:-41.5,y:57.8,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:16.8464,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-22.5223,x:-65.55,y:-66.9,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-10.7666,x:0.7,y:3.7,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-35.2631,x:53.75,y:-21.45,regY:-27.9,regX:2.3}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-13.9757,x:5.25,y:67.2}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-7.4013,x:84.45,y:38.65}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-14.9345,y:-29.2,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-1.3923,x:42.6,y:37.75,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.1903,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{rotation:0.741,x:-35.2,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-12.2465,x:-41.85,y:57.8,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:16.6614,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-23.1554,x:-65.65,y:-66.85,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-11.2492,x:0.7,y:3.7,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-35.7108,x:53.7,y:-21.4,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-13.9469,x:5.8,y:67.15}},{t:this.instance,p:{regX:4.9,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:-7.5684,x:84.95,y:38.25}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-14.1115,y:-29.2,regX:0.4,x:32.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-1.1416,x:41.6,y:37.85,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.2605,x:55.75,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{rotation:1.0227,x:-35.15,y:-9.5,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-10.4525,x:-42.15,y:57.7,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:16.4753,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-23.7897,x:-65.75,y:-66.85,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-11.7304,x:0.7,y:3.7,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-36.1583,x:53.65,y:-21.45,regY:-28,regX:2.3}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-13.9172,x:6.5,y:67.05}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-7.7354,x:85.4,y:38.15}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-13.2913,y:-29.2,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.2,scaleX:0.9979,scaleY:0.9979,rotation:-0.8893,x:40.6,y:38.15,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.3305,x:55.7,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{rotation:1.3054,x:-35.2,y:-9.35,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-8.6581,x:-42.5,y:57.65,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:16.2919,y:-33.7,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-24.4229,x:-65.9,y:-66.8,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-12.2134,x:0.7,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-36.6082,x:53.65,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-13.8883,x:6.9,y:67}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-7.9026,x:85.9,y:37.9}}]},1).to({state:[{t:this.instance_11,p:{regY:-29,rotation:-12.4677,y:-29.3,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-0.6378,x:39.7,y:38.1,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.3989,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{rotation:1.5872,x:-35.2,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-6.8622,x:-42.9,y:57.65,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:16.106,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-25.057,x:-66.05,y:-66.75,regY:11.5,regX:12.4}},{t:this.instance_3,p:{rotation:-12.6947,x:0.75,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-37.0549,x:53.65,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-13.8584,x:7.45,y:66.95}},{t:this.instance,p:{regX:4.9,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:-8.0699,x:86.3,y:37.5}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-11.6465,y:-29.2,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-0.3855,x:38.7,y:38.2,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.4699,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{rotation:1.869,x:-35.15,y:-9.5,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-5.0673,x:-43,y:57.55,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{rotation:15.9215,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-25.6893,x:-66,y:-66.75,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-13.1772,x:0.7,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-37.5031,x:53.65,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-13.8297,x:8.1,y:66.8}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-8.2372,x:86.8,y:37.45}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-10.8241,y:-29.15,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.2,scaleX:0.9979,scaleY:0.9979,rotation:-0.134,x:37.7,y:38.4,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.54,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:2.1517,x:-35.15,y:-9.5,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-3.2729,x:-43.4,y:57.55,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{rotation:15.7367,y:-33.65,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.75,regY:12.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-26.3227,x:-66.15,y:-66.75,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-13.6593,x:0.7,y:3.7,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-37.952,x:53.65,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-13.8002,x:8.5,y:66.8}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-8.4055,x:87.25,y:37.1}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-10.0024,y:-29.15,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:0.113,x:36.75,y:38.35,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.6101,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{rotation:2.4345,x:-35.15,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-1.4782,x:-43.8,y:57.5,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:15.5529,y:-33.55,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-26.9569,x:-66.2,y:-66.7,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-14.1417,x:0.7,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-38.401,x:53.6,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-13.7711,x:9.05,y:66.7}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-8.5721,x:87.7,y:36.8}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-9.1819,y:-29.2,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.2,scaleX:0.9979,scaleY:0.9979,rotation:0.3671,x:35.8,y:38.5,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.6804,x:55.7,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{rotation:2.7164,x:-35.25,y:-9.5,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:0.3115,x:-44.2,y:57.45,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:15.3669,y:-33.45,regX:9.6,scaleX:0.9988,scaleY:0.9988,x:-57.7,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-27.5903,x:-66.45,y:-66.65,regY:11.5,regX:12.4}},{t:this.instance_3,p:{rotation:-14.6233,x:0.65,y:3.7,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-38.8484,x:53.65,y:-21.4,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-13.7424,x:9.6,y:66.65}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-8.7388,x:88.2,y:36.6}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-8.3589,y:-29.2,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:0.6185,x:34.8,y:38.45,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.7487,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:2.9976,x:-35.15,y:-9.5,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:2.1068,x:-44.5,y:57.35,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:15.1817,y:-33.45,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-28.2235,x:-66.4,y:-66.65,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-15.1048,x:0.6,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-39.2961,x:53.65,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-13.7125,x:10.1,y:66.55}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-8.9063,x:88.6,y:36.35}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-7.5375,y:-29.15,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:0.8691,x:33.8,y:38.4,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.8188,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:3.2798,x:-35.2,y:-9.6,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:3.9008,x:-44.8,y:57.4,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:14.9976,y:-33.55,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-28.8557,x:-66.5,y:-66.65,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-15.5867,x:0.65,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-39.7447,x:53.6,y:-21.4,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-13.6837,x:10.7,y:66.45}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-9.0732,x:89,y:36.05}}]},1).to({state:[{t:this.instance_11,p:{regY:-29,rotation:-6.7159,y:-29.25,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:1.1224,x:33,y:38.5,regX:4.8}},{t:this.instance_9,p:{regY:-35.9,scaleX:0.9991,scaleY:0.9991,rotation:-3.89,x:55.75,y:-37,regX:-8.4}},{t:this.instance_8,p:{rotation:3.5637,x:-35.15,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:5.6967,x:-45,y:57.2,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{rotation:14.8129,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-29.4897,x:-66.7,y:-66.55,regY:11.5,regX:12.4}},{t:this.instance_3,p:{rotation:-16.0687,x:0.75,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.8,regX:-0.6}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-40.1923,x:53.7,y:-21.3,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-13.6541,x:11.15,y:66.35}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-9.2409,x:89.45,y:35.8}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-5.8932,y:-29.2,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:1.373,x:31.85,y:38.45,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.9592,x:55.85,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{rotation:3.8451,x:-35.2,y:-9.45,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:7.4914,x:-45.5,y:57.2,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:14.6288,y:-33.65,regX:9.6,scaleX:0.9988,scaleY:0.9988,x:-57.6,regY:12.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-30.1229,x:-66.8,y:-66.55,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-16.5503,x:0.8,y:3.6,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.6}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-40.6409,x:53.55,y:-21.4,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-13.6253,x:11.65,y:66.25}},{t:this.instance,p:{regX:4.8,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-9.4069,x:89.8,y:35.55}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-5.0724,y:-29.2,regX:0.4,x:32.3,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:1.6254,x:30.9,y:38.4,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9992,scaleY:0.9992,rotation:-4.0293,x:55.9,y:-36.9,regX:-8.3}},{t:this.instance_8,p:{rotation:4.1276,x:-35.2,y:-9.4,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:9.2854,x:-45.8,y:57.2,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:14.4437,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-30.7555,x:-66.85,y:-66.55,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-17.0331,x:0.75,y:3.55,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.6}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-41.0885,x:53.65,y:-21.5,regY:-28,regX:2.3}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-13.5955,x:12.3,y:66.1}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-9.575,x:90.35,y:35.2}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-6.7469,y:-29.25,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:0.7359,x:33,y:38.45,regX:4.8}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.09,x:55.8,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:3.5515,x:-35.3,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1.1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:8.1247,x:-45.15,y:57.3,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:14.0182,y:-33.45,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-29.6497,x:-67.15,y:-66.45,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-16.0469,x:0.8,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.8,regX:-0.6}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-39.9928,x:53.55,y:-21.4,regY:-28,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-14.9091,x:11.15,y:66.35}},{t:this.instance,p:{regX:4.8,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-9.4708,x:89.15,y:35.85}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-8.4209,y:-29.25,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.2,scaleX:0.9979,scaleY:0.9979,rotation:-0.1481,x:34.85,y:38.5,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.1505,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:2.9731,x:-35.15,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:6.9655,x:-44.5,y:57.35,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:13.5936,y:-33.4,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-28.5447,x:-67.4,y:-66.35,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-15.0621,x:0.65,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-38.8963,x:53.6,y:-21.4,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-16.2221,x:10.1,y:66.55}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9977,scaleY:0.9977,rotation:-9.3677,x:88.2,y:36.5}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-10.097,y:-29.2,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-1.0382,x:36.95,y:38.2,regX:4.8}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.211,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{rotation:2.3969,x:-35.2,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:5.8058,x:-43.8,y:57.45,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:13.1689,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-27.4396,x:-67.55,y:-66.3,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-14.0759,x:0.6,y:3.55,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-37.799,x:53.55,y:-21.45,regY:-28,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-17.5373,x:8.9,y:66.7}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-9.2641,x:87,y:37.15}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-11.7719,y:-29.2,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-1.9269,x:38.8,y:38.1,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.2716,x:55.85,y:-36.9,regX:-8.3}},{t:this.instance_8,p:{rotation:1.8199,x:-35.15,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:4.6458,x:-42.95,y:57.55,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{rotation:12.7434,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-26.3337,x:-67.85,y:-66.25,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-13.0898,x:0.6,y:3.6,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-36.7021,x:53.55,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-18.8496,x:8,y:66.8}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-9.1611,x:85.95,y:37.85}}]},1).to({state:[{t:this.instance_11,p:{regY:-29,rotation:-13.4471,y:-29.35,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.4,scaleX:0.9979,scaleY:0.9979,rotation:-2.8169,x:40.75,y:37.7,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.333,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:1.2441,x:-35.15,y:-9.6,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:3.4842,x:-42.5,y:57.6,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:12.3193,y:-33.55,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-25.2273,x:-68.1,y:-66.15,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-12.1044,x:0.65,y:3.8,scaleX:0.999,scaleY:0.999,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-35.6058,x:53.6,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-20.1634,x:6.75,y:66.95}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-9.0563,x:84.85,y:38.45}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-15.1214,y:-29.3,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-3.7068,x:42.85,y:37.6,regX:4.8}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.3926,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:0.6666,x:-35.2,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:2.3249,x:-41.8,y:57.7,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:11.8938,y:-33.5,regX:9.6,scaleX:0.9988,scaleY:0.9988,x:-57.65,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-24.1224,x:-68.35,y:-66.1,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-11.1181,x:0.65,y:3.8,scaleX:0.999,scaleY:0.999,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-34.5082,x:53.6,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-21.4768,x:5.85,y:66.95}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-8.9526,x:83.65,y:39.05}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-16.7965,y:-29.3,regX:0.4,x:32.3,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-4.5965,x:44.7,y:37.2,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.4533,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:0.0901,x:-35.15,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:1.1648,x:-41.15,y:57.75,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:11.4701,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-23.0165,x:-68.55,y:-66.05,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-10.1323,x:0.65,y:3.65,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-33.4102,x:53.6,y:-21.45,regY:-28,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-22.7914,x:4.65,y:67.15}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-8.8487,x:82.5,y:39.6}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-18.4724,y:-29.35,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-5.4859,x:46.6,y:36.8,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.5147,x:55.85,y:-36.9,regX:-8.3}},{t:this.instance_8,p:{rotation:-0.482,x:-35.25,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:0.0044,x:-40.45,y:57.85,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:11.0462,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-21.9102,x:-68.8,y:-65.95,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-9.147,x:0.65,y:3.7,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-32.3143,x:53.55,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-24.1046,x:3.5,y:67.15}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-8.745,x:81.35,y:40.1}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-20.1461,y:-29.3,regX:0.4,x:32.3,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-6.3746,x:48.5,y:36.4,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.5761,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{rotation:-1.0586,x:-35.15,y:-9.6,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-1.1508,x:-39.75,y:57.9,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:10.62,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-20.8048,x:-69.1,y:-65.75,regY:11.6,regX:12.5}},{t:this.instance_3,p:{rotation:-8.1608,x:0.7,y:3.8,scaleX:0.999,scaleY:0.999,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-31.2162,x:53.6,y:-21.35,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-25.4185,x:2.45,y:67.2}},{t:this.instance,p:{regX:4.9,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:-8.6422,x:80.1,y:40.45}}]},1).to({state:[{t:this.instance_11,p:{regY:-29,rotation:-21.8229,y:-29.3,regX:0.3,x:32.3,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-7.264,x:50.45,y:35.95,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.6367,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:-1.6344,x:-35.2,y:-9.4,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-2.3109,x:-39.1,y:57.9,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:10.1964,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-19.6986,x:-69.35,y:-65.85,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-7.1746,x:0.65,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-30.1202,x:53.6,y:-21.5,regY:-28,regX:2.3}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-26.7318,x:1.35,y:67.2}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-8.5375,x:78.95,y:41.05}}]},1).to({state:[{t:this.instance_11,p:{regY:-29,rotation:-23.4968,y:-29.35,regX:0.4,x:32.25,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-8.1517,x:52.35,y:35.4,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.6964,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:-2.2112,x:-35.25,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-3.4719,x:-38.45,y:58,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:9.7699,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.5938,x:-69.45,y:-65.6,regY:11.6,regX:12.5}},{t:this.instance_3,p:{rotation:-6.1895,x:0.7,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-29.0228,x:53.55,y:-21.4,regY:-28,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-28.0456,x:0.25,y:67.2}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-8.4339,x:77.8,y:41.6}}]},1).to({state:[{t:this.instance_11,p:{regY:-29,rotation:-25.1729,y:-29.4,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-9.0422,x:54.25,y:34.75,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.7578,x:55.9,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{rotation:-2.7891,x:-35.15,y:-9.5,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-4.6317,x:-37.65,y:58,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{rotation:9.3465,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-17.4871,x:-69.75,y:-65.6,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-5.2035,x:0.7,y:3.7,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.927,x:53.8,y:-21.4,regY:-27.9,regX:2.3}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-29.3606,x:-0.85,y:67.2}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-8.3303,x:76.6,y:42.05}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-26.8469,y:-29.3,regX:0.3,x:32.3,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-9.9314,x:56.1,y:34.05,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.8193,x:55.8,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{rotation:-3.3639,x:-35.25,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-5.7917,x:-37.1,y:58.05,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:8.9209,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-16.3815,x:-69.95,y:-65.5,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-4.2184,x:0.65,y:3.75,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-26.8302,x:53.65,y:-21.3,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-30.6735,x:-1.95,y:67.15}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-8.2274,x:75.35,y:42.45}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-28.5236,y:-29.3,regX:0.3,x:32.3,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-10.8204,x:57.95,y:33.3,regX:4.7}},{t:this.instance_9,p:{regY:-35.9,scaleX:0.9991,scaleY:0.9991,rotation:-4.8799,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{rotation:-3.9425,x:-35.15,y:-9.5,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-6.9515,x:-36.45,y:58.05,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:8.4968,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-15.2762,x:-70.2,y:-65.4,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-3.2326,x:0.7,y:3.65,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-25.7339,x:53.65,y:-21.4,regY:-28,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-31.9865,x:-3.05,y:67.2}},{t:this.instance,p:{regX:4.9,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:-8.123,x:74.15,y:42.75}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-30.1957,y:-29.35,regX:0.4,x:32.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-11.7111,x:59.8,y:32.55,regX:4.7}},{t:this.instance_9,p:{regY:-35.9,scaleX:0.9991,scaleY:0.9991,rotation:-4.9404,x:55.7,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{rotation:-4.517,x:-35.2,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-8.1123,x:-35.7,y:58,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:8.073,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-14.1711,x:-70.45,y:-65.3,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-2.2461,x:0.7,y:3.85,scaleX:0.9991,scaleY:0.9991,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-24.6368,x:53.7,y:-21.25,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-33.3009,x:-4.15,y:67}},{t:this.instance,p:{regX:4.9,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:-8.0194,x:72.9,y:43.15}}]},1).to({state:[{t:this.instance_11,p:{regY:-29,rotation:-30.4702,y:-29.5,regX:0.4,x:32.3,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-11.7971,x:60.1,y:32.4,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.6621,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{rotation:-5.1878,x:-35.2,y:-9.35,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-8.6624,x:-34.9,y:58.1,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:8.1836,y:-33.45,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-14.6846,x:-70.4,y:-65.35,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-1.9431,x:0.65,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-24.2174,x:53.7,y:-21.25,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-31.9425,x:-4.5,y:67.05}},{t:this.instance,p:{regX:4.9,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:-7.5983,x:72.4,y:43.25}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-30.7438,y:-29.4,regX:0.4,x:32.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.2,scaleX:0.9979,scaleY:0.9979,rotation:-11.8849,x:60.4,y:32.45,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.3839,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:-5.8593,x:-35.25,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-9.2134,x:-34.15,y:58.1,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:8.2959,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-15.2002,x:-70.35,y:-65.35,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-1.6384,x:0.7,y:3.65,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-23.7964,x:53.7,y:-21.3,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-30.5835,x:-4.8,y:66.95}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-7.1787,x:71.9,y:43.6}}]},1).to({state:[{t:this.instance_11,p:{regY:-29,rotation:-31.0158,y:-29.45,regX:0.4,x:32.3,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.2,scaleX:0.9979,scaleY:0.9979,rotation:-11.9716,x:60.75,y:32.3,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-4.1066,x:55.9,y:-37,regX:-8.3}},{t:this.instance_8,p:{rotation:-6.5298,x:-35.2,y:-9.5,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-9.7636,x:-33.3,y:58.05,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:8.4083,y:-33.5,regX:9.6,scaleX:0.9988,scaleY:0.9988,x:-57.65,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-15.7141,x:-70.4,y:-65.4,regY:11.5,regX:12.4}},{t:this.instance_3,p:{rotation:-1.3338,x:0.65,y:3.7,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-23.3759,x:53.65,y:-21.2,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-29.2257,x:-5.2,y:66.95}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-6.7592,x:71.45,y:43.6}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-31.2892,y:-29.45,regX:0.4,x:32.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-12.0593,x:61,y:32,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.8294,x:55.75,y:-37,regX:-8.4}},{t:this.instance_8,p:{rotation:-7.2005,x:-35.25,y:-9.35,regY:-27.8,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-10.3164,x:-32.55,y:58.05,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:8.5214,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-16.2296,x:-70.15,y:-65.45,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-1.0309,x:0.65,y:3.75,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-22.9561,x:53.65,y:-21.35,regY:-28,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-27.867,x:-5.45,y:66.95}},{t:this.instance,p:{regX:4.9,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:-6.3394,x:71,y:43.65}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-31.563,y:-29.35,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.4,scaleX:0.9979,scaleY:0.9979,rotation:-12.146,x:61.25,y:31.75,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.5524,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{rotation:-7.871,x:-35.3,y:-9.4,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-10.8656,x:-31.7,y:58,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:8.6331,y:-33.45,regX:9.6,scaleX:0.9988,scaleY:0.9988,x:-57.6,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-16.744,x:-70.15,y:-65.55,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-0.7264,x:0.65,y:3.7,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-22.5361,x:53.7,y:-21.25,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-26.5091,x:-5.8,y:66.9}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-5.9181,x:70.5,y:43.95}}]},1).to({state:[{t:this.instance_11,p:{regY:-29,rotation:-31.835,y:-29.5,regX:0.4,x:32.3,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.4,scaleX:0.9979,scaleY:0.9979,rotation:-12.2321,x:61.55,y:31.7,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-3.2744,x:55.7,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{rotation:-8.5411,x:-35.4,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1.1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-11.4177,x:-30.95,y:58,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:8.7456,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-17.2576,x:-70.15,y:-65.5,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-0.4218,x:0.65,y:3.65,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-22.1155,x:53.7,y:-21.25,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-25.1503,x:-6.15,y:66.9}},{t:this.instance,p:{regX:4.8,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-5.4989,x:69.9,y:44.05}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-32.1091,y:-29.35,regX:0.4,x:32.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-12.3199,x:61.85,y:31.65,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.9966,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{rotation:-9.2124,x:-35.25,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-11.9673,x:-30.2,y:57.9,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:8.8572,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-17.7725,x:-70.05,y:-65.5,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-0.1173,x:0.65,y:3.65,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-21.6949,x:53.65,y:-21.2,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-23.7927,x:-6.5,y:66.85}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-5.0781,x:69.55,y:44.15}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-32.381,y:-29.4,regX:0.4,x:32.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-12.4062,x:62.15,y:31.5,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.7189,x:55.75,y:-37,regX:-8.4}},{t:this.instance_8,p:{rotation:-9.8829,x:-35.35,y:-9.4,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1.1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-12.5181,x:-29.4,y:57.85,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:8.9706,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.2874,x:-70,y:-65.55,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:0.182,x:0.65,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-21.2758,x:53.7,y:-21.25,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-22.4335,x:-6.8,y:66.85}},{t:this.instance,p:{regX:4.8,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:-4.6586,x:68.9,y:44.15}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-32.6524,y:-29.4,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-12.4932,x:62.4,y:31.35,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.4412,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{rotation:-10.5531,x:-35.35,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1.1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-13.069,x:-28.6,y:57.8,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:9.0823,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.8023,x:-70,y:-65.6,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:0.4866,x:0.6,y:3.75,scaleX:0.9991,scaleY:0.9991,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-20.8552,x:53.7,y:-21.25,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-21.0755,x:-7.15,y:66.8}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-4.2384,x:68.55,y:44.45}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-32.9276,y:-29.4,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-12.5812,x:62.75,y:31.15,regX:4.8}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-2.1636,x:55.75,y:-37,regX:-8.4}},{t:this.instance_8,p:{rotation:-11.2231,x:-35.35,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-13.6204,x:-27.8,y:57.7,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:9.1948,y:-33.6,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-19.3183,x:-69.85,y:-65.5,regY:11.6,regX:12.5}},{t:this.instance_3,p:{rotation:0.7894,x:0.6,y:3.85,scaleX:0.999,scaleY:0.999,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-20.435,x:53.65,y:-21.2,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-19.7165,x:-7.55,y:66.75}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-3.8184,x:68.15,y:44.55}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-33.2007,y:-29.4,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-12.669,x:63,y:31.05,regX:4.8}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-1.8861,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:-11.894,x:-35.35,y:-9.45,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1.1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-14.1702,x:-26.8,y:57.6,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{rotation:9.3073,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-19.8321,x:-69.8,y:-65.65,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:1.0939,x:0.6,y:3.85,scaleX:0.9991,scaleY:0.9991,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-20.0152,x:53.65,y:-21.2,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-18.358,x:-7.85,y:66.7}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-3.3987,x:67.7,y:44.55}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-33.4727,y:-29.45,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-12.7561,x:63.2,y:30.9,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-1.6094,x:55.85,y:-37,regX:-8.4}},{t:this.instance_8,p:{rotation:-12.5652,x:-35.25,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-14.7216,x:-26.05,y:57.5,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{rotation:9.4192,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-20.3463,x:-69.8,y:-65.75,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:1.3985,x:0.6,y:3.85,scaleX:0.9991,scaleY:0.9991,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-19.5944,x:53.65,y:-21.25,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-16.9997,x:-7.9,y:66.65}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-2.9783,x:67.15,y:44.7}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-33.7467,y:-29.35,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-12.8424,x:63.5,y:30.75,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-1.3302,x:55.85,y:-37,regX:-8.4}},{t:this.instance_8,p:{rotation:-13.2374,x:-35.25,y:-9.5,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-15.2722,x:-25.35,y:57.45,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:9.5315,y:-33.65,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-20.861,x:-69.7,y:-65.7,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:1.7024,x:0.6,y:3.8,scaleX:0.999,scaleY:0.999,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-19.1733,x:53.65,y:-21.2,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-15.6415,x:-8.4,y:66.65}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-2.5589,x:66.65,y:44.9}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-34.0205,y:-29.45,regX:0.4,x:32.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.4,scaleX:0.9979,scaleY:0.9979,rotation:-12.9295,x:63.75,y:30.55,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-1.0536,x:55.85,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{rotation:-13.9068,x:-35.2,y:-9.35,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-15.8228,x:-24.6,y:57.3,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:9.6428,y:-33.45,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-21.377,x:-69.65,y:-65.7,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:2.0071,x:0.5,y:3.8,scaleX:0.999,scaleY:0.999,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-18.7543,x:53.75,y:-21.25,regY:-27.9,regX:2.3}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-14.2835,x:-8.6,y:66.6}},{t:this.instance,p:{regX:4.9,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:-2.1379,x:66.2,y:44.8}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-34.292,y:-29.35,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-13.0169,x:64.05,y:30.5,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-0.7762,x:55.85,y:-37,regX:-8.4}},{t:this.instance_8,p:{rotation:-14.5773,x:-35.2,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-16.3739,x:-23.85,y:57.2,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:9.7563,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-21.8921,x:-69.6,y:-65.75,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:2.3109,x:0.55,y:3.65,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-18.3339,x:53.75,y:-21.2,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-12.9253,x:-8.95,y:66.5}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-1.7179,x:65.75,y:45}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-34.5658,y:-29.5,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-13.104,x:64.3,y:30.35,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9992,scaleY:0.9992,rotation:-0.4988,x:55.9,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{rotation:-15.2477,x:-35.25,y:-9.5,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-16.9257,x:-23.1,y:57.05,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:9.8684,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-22.4061,x:-69.5,y:-65.8,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:2.6149,x:0.55,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-17.9137,x:53.75,y:-21.15,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-11.5678,x:-9.5,y:66.55}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-1.2971,x:65.2,y:45.2}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-34.8377,y:-29.5,regX:0.4,x:32.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-13.1916,x:64.65,y:30.2,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-0.2196,x:55.85,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{rotation:-15.9188,x:-35.25,y:-9.45,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-17.476,x:-22.3,y:56.95,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:9.9804,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-22.9204,x:-69.55,y:-65.7,regY:11.5,regX:12.4}},{t:this.instance_3,p:{rotation:2.9189,x:0.55,y:3.65,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-17.4924,x:53.7,y:-21.15,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-10.2084,x:-9.75,y:66.45}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-0.8773,x:64.75,y:45.3}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-35.1108,y:-29.45,regX:0.4,x:32.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.4,scaleX:0.9979,scaleY:0.9979,rotation:-13.278,x:64.9,y:29.95,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:0.0525,x:55.9,y:-37,regX:-8.4}},{t:this.instance_8,p:{rotation:-16.5877,x:-35.25,y:-9.35,regY:-27.8,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-18.027,x:-21.5,y:56.75,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:10.0932,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-23.4358,x:-69.55,y:-65.8,regY:11.5,regX:12.4}},{t:this.instance_3,p:{rotation:3.223,x:0.6,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-17.0736,x:53.65,y:-21.15,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-8.8506,x:-10.15,y:66.35}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-0.4575,x:64.25,y:45.3}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-35.3834,y:-29.5,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-13.3654,x:65.2,y:29.95,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:0.3308,x:55.8,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{rotation:-17.2588,x:-35.2,y:-9.45,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-18.5777,x:-20.75,y:56.55,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:10.2064,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-23.9508,x:-69.35,y:-65.85,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:3.528,x:0.65,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-16.6527,x:53.7,y:-21.3,regY:-28,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-7.4924,x:-10.45,y:66.3}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-0.0359,x:63.85,y:45.35}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-35.6585,y:-29.5,regX:0.4,x:32.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-13.4519,x:65.5,y:29.75,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:0.6082,x:55.85,y:-37,regX:-8.4}},{t:this.instance_8,p:{rotation:-17.9292,x:-35.25,y:-9.45,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-19.1279,x:-19.85,y:56.45,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:10.3182,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-24.4644,x:-69.35,y:-65.85,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:3.8314,x:0.6,y:3.75,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-16.2321,x:53.65,y:-21.25,regY:-28,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-6.1331,x:-10.75,y:66.2}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9977,scaleY:0.9977,rotation:0.3786,x:63.25,y:45.5}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-35.93,y:-29.45,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-13.5384,x:65.75,y:29.6,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:0.8865,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{rotation:-18.6009,x:-35.25,y:-9.55,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-19.6793,x:-19.1,y:56.2,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:10.4304,y:-33.65,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-24.9795,x:-69.3,y:-65.9,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:4.1359,x:0.6,y:3.75,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-15.8129,x:53.7,y:-21.2,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-4.7755,x:-11.1,y:66.15}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:0.7993,x:62.85,y:45.55}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-36.2035,y:-29.5,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.2,scaleX:0.9979,scaleY:0.9979,rotation:-13.6257,x:66.05,y:29.55,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:1.163,x:55.85,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{rotation:-19.2718,x:-35.3,y:-9.3,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1.1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-20.2296,x:-18.35,y:56.1,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:10.5425,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-25.4932,x:-69.2,y:-65.9,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:4.4394,x:0.6,y:3.75,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-15.3922,x:53.65,y:-21.2,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-3.4163,x:-11.4,y:66}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:1.2191,x:62.35,y:45.55}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-36.4763,y:-29.5,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-13.7122,x:66.35,y:29.35,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:1.4405,x:55.9,y:-37,regX:-8.4}},{t:this.instance_8,p:{rotation:-19.9426,x:-35.25,y:-9.4,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-20.7807,x:-17.5,y:55.8,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{rotation:10.655,y:-33.55,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-26.0096,x:-69.15,y:-65.95,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:4.745,x:0.6,y:3.7,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-14.9731,x:53.65,y:-21.15,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-2.059,x:-11.75,y:66}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:1.6399,x:61.85,y:45.65}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-36.7493,y:-29.45,regX:0.4,x:32.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-13.8006,x:66.55,y:29.15,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:1.7188,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{rotation:-20.6118,x:-35.3,y:-9.45,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-21.3311,x:-16.85,y:55.65,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:10.7661,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-26.5239,x:-69.05,y:-65.9,regY:11.6,regX:12.5}},{t:this.instance_3,p:{rotation:5.0481,x:0.6,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-14.5509,x:53.75,y:-21.15,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-0.7002,x:-11.95,y:66}},{t:this.instance,p:{regX:4.9,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:2.0599,x:61.35,y:45.6}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-37.0224,y:-29.5,regX:0.4,x:32.35,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.4,scaleX:0.9979,scaleY:0.9979,rotation:-13.8871,x:66.85,y:28.85,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:1.9964,x:55.85,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{rotation:-21.284,x:-35.25,y:-9.45,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-21.8827,x:-16.05,y:55.45,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:10.8787,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-27.0379,x:-69.05,y:-66,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:5.3522,x:0.55,y:3.8,scaleX:0.999,scaleY:0.999,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-14.1314,x:53.85,y:-21.15,regY:-27.9,regX:2.3}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:0.6547,x:-12.45,y:65.85}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:2.48,x:60.9,y:45.75}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-37.2957,y:-29.5,regX:0.4,x:32.4,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-13.9746,x:67.2,y:28.8,regX:4.7}},{t:this.instance_9,p:{regY:-35.9,scaleX:0.9991,scaleY:0.9991,rotation:2.2739,x:55.8,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{rotation:-21.9544,x:-35.25,y:-9.45,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-22.4326,x:-15.15,y:55.1,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{rotation:10.9918,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-27.5539,x:-69,y:-66,regY:11.5,regX:12.4}},{t:this.instance_3,p:{rotation:5.6572,x:0.55,y:3.7,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-13.7117,x:53.85,y:-21.2,regY:-27.9,regX:2.3}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:2.0125,x:-12.8,y:65.85}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:2.9011,x:60.4,y:45.8}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-37.5671,y:-29.45,regX:0.4,x:32.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-14.0622,x:67.4,y:28.6,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:2.5516,x:55.85,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{rotation:-22.6238,x:-35.3,y:-9.5,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-22.9832,x:-14.4,y:54.9,regX:3.5}},{t:this.instance_6},{t:this.instance_5,p:{rotation:11.1041,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-28.0684,x:-68.95,y:-66,regY:11.5,regX:12.4}},{t:this.instance_3,p:{rotation:5.9605,x:0.6,y:3.7,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-13.2911,x:53.75,y:-21.15,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:3.3707,x:-13.15,y:65.75}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:3.3197,x:59.9,y:45.9}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-37.8408,y:-29.5,regX:0.4,x:32.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-14.1489,x:67.7,y:28.45,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:2.8302,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{rotation:-23.2949,x:-35.2,y:-9.3,regY:-27.8,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-23.5345,x:-13.75,y:54.7,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:11.2172,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-28.583,x:-68.85,y:-66.05,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:6.2643,x:0.55,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-12.8713,x:53.85,y:-21.15,regY:-27.9,regX:2.3}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:4.7299,x:-13.25,y:65.65}},{t:this.instance,p:{regX:4.9,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:3.7403,x:59.45,y:45.8}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-38.1144,y:-29.5,regX:0.4,x:32.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-14.2347,x:68,y:28.25,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:3.107,x:55.9,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{rotation:-23.966,x:-35.3,y:-9.45,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-24.0854,x:-13,y:54.45,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:11.3281,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-29.0978,x:-68.8,y:-66.05,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:6.5689,x:0.6,y:3.8,scaleX:0.999,scaleY:0.999,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-12.4512,x:53.85,y:-21.1,regY:-27.9,regX:2.3}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:6.0873,x:-13.8,y:65.6}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9977,scaleY:0.9977,rotation:4.1601,x:58.9,y:46}}]},1).to({state:[{t:this.instance_11,p:{regY:-29,rotation:-38.3871,y:-29.5,regX:0.3,x:32.3,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.2,scaleX:0.9979,scaleY:0.9979,rotation:-14.3216,x:68.25,y:28.25,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:3.3849,x:55.85,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{rotation:-24.6366,x:-35.25,y:-9.5,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.9991,scaleY:0.9991,rotation:-24.6365,x:-12.3,y:54.2,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:11.4407,y:-33.5,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-29.6124,x:-68.65,y:-66.1,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:6.8731,x:0.6,y:3.65,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-12.0308,x:53.7,y:-21.1,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:7.4465,x:-14.1,y:65.55}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:4.5812,x:58.4,y:46.05}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-37.8158,y:-29.45,regX:0.4,x:32.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-13.7492,x:67.65,y:28.55,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:3.0439,x:55.85,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{rotation:-23.2996,x:-35.2,y:-9.3,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-25.9737,x:-13.7,y:54.75,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:12.0111,y:-33.7,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-28.4056,x:-68.4,y:-66.25,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:6.2608,x:0.55,y:3.7,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-13.0629,x:53.7,y:-21.15,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:5.9941,x:-13.35,y:65.7}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:3.9704,x:59.6,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-37.2407,y:-29.45,regX:0.4,x:32.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-13.178,x:67.1,y:28.85,regX:4.7}},{t:this.instance_9,p:{regY:-35.9,scaleX:0.9991,scaleY:0.9991,rotation:2.7032,x:55.85,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{rotation:-21.9626,x:-35.3,y:-9.45,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-27.3098,x:-15.25,y:55.25,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:12.5818,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-27.1992,x:-68.05,y:-66.35,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:5.6509,x:0.6,y:3.7,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-14.0927,x:53.7,y:-21.15,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:4.5428,x:-12.8,y:65.85}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:3.3593,x:60.85,y:45.8}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-36.6679,y:-29.4,regX:0.4,x:32.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.2,scaleX:0.9979,scaleY:0.9979,rotation:-12.6035,x:66.65,y:29.3,regX:4.8}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:2.3624,x:55.85,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{rotation:-20.6263,x:-35.25,y:-9.4,regY:-27.9,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-28.6468,x:-16.8,y:55.65,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:13.152,y:-33.55,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-25.9931,x:-67.7,y:-66.4,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:5.0393,x:0.65,y:3.7,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-15.1254,x:53.65,y:-21.25,regY:-28,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:3.0911,x:-12,y:66}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:2.7475,x:62.05,y:45.65}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-36.096,y:-29.45,regX:0.4,x:32.35,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-12.0297,x:66,y:29.55,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:2.0235,x:55.8,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{rotation:-19.2884,x:-35.35,y:-9.25,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1.1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-29.9841,x:-18.3,y:56.15,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:13.7225,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-24.786,x:-67.35,y:-66.45,regY:11.6,regX:12.5}},{t:this.instance_3,p:{rotation:4.4281,x:0.6,y:3.75,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-16.1566,x:53.75,y:-21.15,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:1.6404,x:-11.45,y:66.1}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:2.1371,x:63.25,y:45.45}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-35.5216,y:-29.45,regX:0.4,x:32.4,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.4,scaleX:0.9979,scaleY:0.9979,rotation:-11.4579,x:65.4,y:29.75,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:1.6821,x:55.8,y:-37,regX:-8.4}},{t:this.instance_8,p:{rotation:-17.9516,x:-35.25,y:-9.4,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-31.3217,x:-19.85,y:56.5,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:14.2936,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-23.5785,x:-67,y:-66.5,regY:11.6,regX:12.5}},{t:this.instance_3,p:{rotation:3.8175,x:0.65,y:3.8,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-17.188,x:53.75,y:-21.15,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:0.1882,x:-10.65,y:66.25}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:1.525,x:64.4,y:45.3}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-34.95,y:-29.45,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-10.8854,x:64.75,y:30.25,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:1.3415,x:55.85,y:-37,regX:-8.4}},{t:this.instance_8,p:{rotation:-16.6149,x:-35.25,y:-9.25,regY:-27.8,scaleX:0.9993,scaleY:0.9993,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-32.6587,x:-21.45,y:56.8,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:14.8636,y:-33.55,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.85,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-22.3719,x:-66.75,y:-66.7,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:3.2063,x:0.7,y:3.7,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-18.2186,x:53.85,y:-21.2,regY:-27.9,regX:2.3}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-1.2587,x:-10.1,y:66.4}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:0.9141,x:65.6,y:45.1}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-34.3767,y:-29.4,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-10.3104,x:64.2,y:30.6,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:1.0028,x:55.85,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:-15.2765,x:-35.25,y:-9.4,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-33.9952,x:-23,y:57.1,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:15.4348,y:-33.5,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-21.1647,x:-66.4,y:-66.75,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:2.5939,x:0.7,y:3.7,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9983,scaleY:0.9983,rotation:-19.2514,x:53.75,y:-21.2,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-2.7099,x:-9.35,y:66.5}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9977,scaleY:0.9977,rotation:0.3032,x:66.85,y:44.9}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-33.8034,y:-29.3,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.4,scaleX:0.9979,scaleY:0.9979,rotation:-9.7393,x:63.6,y:30.75,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:0.6615,x:55.8,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:-13.941,x:-35.2,y:-9.3,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-35.3318,x:-24.6,y:57.45,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:16.0049,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-19.9584,x:-66.05,y:-66.85,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:1.9834,x:0.6,y:3.9,scaleX:0.9991,scaleY:0.9991,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-20.282,x:53.75,y:-21.2,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-4.1619,x:-8.75,y:66.6}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-0.305,x:68.05,y:44.65}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-33.2311,y:-29.25,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-9.1665,x:63.05,y:31.2,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:0.3211,x:55.8,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{rotation:-12.6028,x:-35.25,y:-9.35,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-36.6688,x:-26.15,y:57.55,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:16.5767,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.75,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-18.7519,x:-65.8,y:-66.85,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:1.3723,x:0.65,y:3.95,scaleX:0.9991,scaleY:0.9991,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-21.3135,x:53.85,y:-21.25,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-5.614,x:-7.95,y:66.75}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-0.9158,x:69.2,y:44.35}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-32.658,y:-29.3,regX:0.4,x:32.45,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-8.5918,x:62.45,y:31.5,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-0.0149,x:55.85,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{rotation:-11.2669,x:-35.35,y:-9.4,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1.1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-38.0057,x:-27.7,y:57.8,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:17.1477,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.8,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-17.5458,x:-65.45,y:-66.95,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:0.7605,x:0.7,y:3.95,scaleX:0.999,scaleY:0.999,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-22.3453,x:53.85,y:-21.25,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-7.0653,x:-7.45,y:66.85}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-1.5259,x:70.35,y:44.05}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-32.085,y:-29.25,regX:0.4,x:32.45,scaleX:0.9973,scaleY:0.9973}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-8.0208,x:61.85,y:31.9,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-0.3561,x:55.85,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{rotation:-9.9299,x:-35.3,y:-9.4,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-39.3424,x:-29.25,y:57.95,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:17.7183,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.85,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-16.3377,x:-65.05,y:-67.1,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:0.1496,x:0.7,y:3.75,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-23.3759,x:53.8,y:-21.2,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-8.5168,x:-6.85,y:66.85}},{t:this.instance,p:{regX:4.9,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:-2.1379,x:71.55,y:43.6}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-31.5114,y:-29.2,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-7.4468,x:61.25,y:32.2,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-0.6965,x:55.75,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{rotation:-8.5932,x:-35.2,y:-9.3,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-40.6791,x:-30.8,y:58.1,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:18.2882,y:-33.55,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.85,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-15.1311,x:-64.7,y:-67.1,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-0.4568,x:0.7,y:3.8,scaleX:0.9991,scaleY:0.9991,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-24.4076,x:53.85,y:-21.25,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.9,scaleX:0.9989,scaleY:0.9989,rotation:-9.9682,x:-6,y:67}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-2.7484,x:72.8,y:43.5}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-30.9391,y:-29.2,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-6.874,x:60.65,y:32.5,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-1.0379,x:55.8,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{rotation:-7.256,x:-35.2,y:-9.2,regY:-27.8,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-42.0173,x:-32.5,y:58.15,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:18.8576,y:-33.65,regX:9.6,scaleX:0.9988,scaleY:0.9988,x:-57.7,regY:12.7}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-13.9239,x:-64.55,y:-67.15,regY:11.5,regX:12.4}},{t:this.instance_3,p:{rotation:-1.0686,x:0.75,y:3.85,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-25.4385,x:53.9,y:-21.25,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-11.4203,x:-5.5,y:67.1}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-3.361,x:73.9,y:43.05}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-30.3657,y:-29.25,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-6.3015,x:60,y:32.75,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9992,scaleY:0.9992,rotation:-1.3765,x:55.85,y:-36.75,regX:-8.4}},{t:this.instance_8,p:{rotation:-5.9182,x:-35.2,y:-9.35,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-43.3532,x:-34.05,y:58.15,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:19.4293,y:-33.55,regX:9.5,scaleX:0.9988,scaleY:0.9988,x:-57.85,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-12.7177,x:-64.05,y:-67.2,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-1.6796,x:0.8,y:3.8,scaleX:0.999,scaleY:0.999,regY:-24.9,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-26.4695,x:53.8,y:-21.35,regY:-28,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-12.8718,x:-4.9,y:67.15}},{t:this.instance,p:{regX:4.9,regY:-38,scaleX:0.9976,scaleY:0.9976,rotation:-3.9722,x:75.05,y:42.75}}]},1).to({state:[{t:this.instance_11,p:{regY:-28.9,rotation:-29.7935,y:-29.15,regX:0.4,x:32.45,scaleX:0.9974,scaleY:0.9974}},{t:this.instance_10,p:{regY:-37.3,scaleX:0.9979,scaleY:0.9979,rotation:-5.7289,x:59.4,y:33.05,regX:4.7}},{t:this.instance_9,p:{regY:-35.8,scaleX:0.9991,scaleY:0.9991,rotation:-1.7179,x:55.85,y:-36.75,regX:-8.4}},{t:this.instance_8,p:{rotation:-4.5819,x:-35.25,y:-9.35,regY:-27.9,scaleX:0.9994,scaleY:0.9994,regX:-1}},{t:this.instance_7,p:{scaleX:0.999,scaleY:0.999,rotation:-44.69,x:-35.6,y:58.25,regX:3.4}},{t:this.instance_6},{t:this.instance_5,p:{rotation:20.0529,y:-33.65,regX:9.5,scaleX:0.9987,scaleY:0.9987,x:-57.85,regY:12.8}},{t:this.instance_4,p:{scaleX:0.9988,scaleY:0.9988,rotation:-11.4581,x:-63.6,y:-67.4,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-2.2899,x:0.85,y:4,scaleX:0.9991,scaleY:0.9991,regY:-24.8,regX:-0.7}},{t:this.instance_2,p:{scaleX:0.9982,scaleY:0.9982,rotation:-27.5024,x:53.9,y:-21.25,regY:-27.9,regX:2.2}},{t:this.instance_1,p:{regX:3.8,scaleX:0.9989,scaleY:0.9989,rotation:-14.3224,x:-4.15,y:67.25}},{t:this.instance,p:{regX:4.8,regY:-38.1,scaleX:0.9976,scaleY:0.9976,rotation:-4.5812,x:76.05,y:42.15}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-119.4,-108.8,228,259.4);


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
	this.instance_4.setTransform(-63.7,-67.4,0.999,0.999,-11.7603,0,0,12.6,11.5);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11,p:{scaleX:0.9976,scaleY:0.9976,rotation:-38.5177,x:32.4,y:-29.5,regX:0.4}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-14.7197,x:68.4,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9993,scaleY:0.9993,rotation:-1.9365,x:55.85,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7536,x:-35.3,y:-9.45}},{t:this.instance_7,p:{regX:3.6,regY:-38.1,scaleX:0.9993,scaleY:0.9993,rotation:-24.9747,x:-12.15,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.999,scaleY:0.999,rotation:19.9889,x:-57.75,y:-33.7}},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-11.7603,x:-63.7,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.6753,x:0.6,y:3.75,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.2,scaleX:0.9985,scaleY:0.9985,rotation:-11.9453,x:53.6,y:-21.25}},{t:this.instance_1,p:{scaleX:0.9991,scaleY:0.9991,rotation:7.1205,x:-13.95,y:65.7,regX:3.9}},{t:this.instance,p:{scaleX:0.9978,scaleY:0.9978,rotation:4.4785,x:58.25,y:46}}]}).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7187,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.6065,x:55.8,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9742,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9884,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.4667,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.6747,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7187,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.2784,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9742,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9895,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.1733,x:-63.8,regX:12.5,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6747,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7187,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.95,x:55.85,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9901,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.8806,x:-63.85,regX:12.5,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6747,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-4.6229,x:55.85,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9912,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.5877,x:-63.7,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6738,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.2948,x:55.9,y:-37.15,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9923,x:-57.7,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.2951,x:-63.65,regX:12.6,y:-67.2,regY:11.6}},{t:this.instance_3,p:{rotation:6.6738,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4779,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-5.9666,x:55.75,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9923,x:-57.7,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.0025,x:-63.7,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.6738,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.12,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-6.6383,x:55.8,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9931,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.7101,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.6738,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-7.3098,x:55.7,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9939,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.4178,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.6738,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9452,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.9826,x:55.75,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9948,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.1252,x:-63.8,regX:12.5,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.673,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.6538,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.35,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9959,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.8329,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.673,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7181,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-9.3261,x:55.7,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7531,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9967,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.5404,x:-63.65,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.673,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1192,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7172,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-9.9989,x:55.7,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7515,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9967,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.2478,x:-63.6,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.673,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1183,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.477,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7172,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-10.6704,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7515,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9975,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.9554,x:-63.65,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.6721,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1183,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4761,x:58.1,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5179,x:32.35,y:-29.4,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.7172,x:68.35,y:27.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-11.3417,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7519,x:-35.2,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9738,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-21.6633,x:-63.6,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.6721,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9436,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1183,x:-13.85,y:65.65,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4761,x:58.05,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5099,x:32.3,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.6909,x:68.4,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-10.7016,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7433,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9496,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.9862,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6855,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9488,x:53.7,y:-21.35}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1395,x:-14,y:65.55,regX:3.8}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4822,x:58.15,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.5012,x:32.3,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.6645,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-10.0584,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7359,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.9284,x:-12.4,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.3085,x:-63.6,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.6986,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9543,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1614,x:-13.9,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4902,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4923,x:32.3,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.6384,x:68.35,y:28,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-9.4166,x:55.65,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.728,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-24.9057,x:-12.4,y:54.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.6323,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.7118,x:0.75,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9598,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.1836,x:-13.9,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.4972,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4824,x:32.35,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.612,x:68.35,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.7759,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7214,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8838,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.9553,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.7251,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9668,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2047,x:-13.95,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5042,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4743,x:32.4,y:-29.45,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.5867,x:68.3,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.1337,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.7136,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8607,x:-12.4,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.2786,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.7384,x:0.7,y:3.65,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9721,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2268,x:-13.9,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5112,x:58.15,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4663,x:32.35,y:-29.4,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.5602,x:68.3,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.4916,x:55.75,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7049,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8384,x:-12.5,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.6013,x:-63.65,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.7524,x:0.7,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9783,x:53.75,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2489,x:-13.95,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5191,x:58.2,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4575,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.5332,x:68.3,y:28.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.8497,x:55.7,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6971,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8165,x:-12.4,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.9253,x:-63.65,regX:12.6,y:-67.3,regY:11.5}},{t:this.instance_3,p:{rotation:6.7657,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9836,x:53.6,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2718,x:-14,y:65.6,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5262,x:58.2,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4494,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.5071,x:68.3,y:28.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.2076,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6889,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.7941,x:-12.4,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.2482,x:-63.6,regX:12.6,y:-67.25,regY:11.6}},{t:this.instance_3,p:{rotation:6.7788,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9893,x:53.6,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.2929,x:-14.15,y:65.6,regX:3.8}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5333,x:58.2,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4407,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.4809,x:68.25,y:28.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.5673,x:55.75,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.6818,x:-35.3,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-24.771,x:-12.3,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.5718,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.7929,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-11.9945,x:53.7,y:-21.3}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.315,x:-14,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5402,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4325,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.4546,x:68.35,y:28.1,regX:4.6}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-4.9241,x:55.75,y:-37.3,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6748,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-24.7487,x:-12.35,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.8945,x:-63.7,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.8062,x:0.6,y:3.65,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0008,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.337,x:-14,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5473,x:58.15,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4226,x:32.35,y:-29.35,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.4285,x:68.25,y:28.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.2834,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.6674,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-24.7264,x:-12.25,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.2177,x:-63.7,regX:12.6,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.8194,x:0.65,y:3.65,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.007,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.3592,x:-14.15,y:65.5,regX:3.8}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5543,x:58.2,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4151,x:32.35,y:-29.45,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.4021,x:68.2,y:28.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.6413,x:55.75,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.6591,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.7037,x:-12.3,y:54.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.5402,x:-63.65,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.8325,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0134,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.3812,x:-14.05,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5613,x:58.25,y:46}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.4058,x:32.35,y:-29.45,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.3762,x:68.25,y:28.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.9998,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6517,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.6818,x:-12.4,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.864,x:-63.8,regX:12.5,y:-67.35,regY:11.5}},{t:this.instance_3,p:{rotation:6.8458,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0187,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.4024,x:-14.1,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5685,x:58.3,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.397,x:32.4,y:-29.5,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.3496,x:68.2,y:28.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-2.3586,x:55.75,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-24.6443,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.6587,x:-12.35,y:54.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.9987,x:-57.65,y:-33.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.1872,x:-63.7,regX:12.6,y:-67.4,regY:11.5}},{t:this.instance_3,p:{rotation:6.8599,x:0.65,y:3.65,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0249,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.4235,x:-14.05,y:65.55,regX:3.9}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5754,x:58.3,y:45.95}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.3888,x:32.35,y:-29.45,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.3226,x:68.2,y:28.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-1.7169,x:55.9,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6372,x:-35.25,y:-9.5}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.6372,x:-12.25,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:20.0518,x:-57.7,y:-33.65}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.4574,x:-63.6,regX:12.6,y:-67.5,regY:11.5}},{t:this.instance_3,p:{rotation:6.8731,x:0.65,y:3.65,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0293,x:53.7,y:-21.25}},{t:this.instance_1,p:{scaleX:0.999,scaleY:0.999,rotation:7.4457,x:-14.2,y:65.55,regX:3.8}},{t:this.instance,p:{scaleX:0.9977,scaleY:0.9977,rotation:4.5824,x:58.25,y:45.95}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-112.5,-108.8,206.5,257.3);


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
	this.instance_4.setTransform(-147.85,-121,0.999,0.999,-11.7603,0,0,12.6,11.5);

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
p.nominalBounds = new cjs.Rectangle(-193,-162.4,202.9,257.3);


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
	this.instance_4.setTransform(-63.7,-67.4,0.999,0.999,-11.7603,0,0,12.6,11.5);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11,p:{scaleX:0.9976,scaleY:0.9976,rotation:-38.5177,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.9981,scaleY:0.9981,rotation:-14.7197,x:68.4,y:28.05,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9993,scaleY:0.9993,rotation:-1.9365,x:55.85,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.7536,x:-35.3,y:-9.45,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.1,scaleX:0.9993,scaleY:0.9993,rotation:-24.9747,x:-12.15,y:54.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.999,scaleY:0.999,rotation:19.9889,x:-57.75,y:-33.7,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-11.7603,x:-63.7,y:-67.4,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:6.6753,x:0.6,y:3.75,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.2,scaleX:0.9985,scaleY:0.9985,rotation:-11.9453,x:53.6,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.9991,scaleY:0.9991,rotation:7.1205,x:-13.95,y:65.7,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:4.4785,x:58.25,y:46,scaleX:0.9978,scaleY:0.9978}}]}).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.89,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.0915,x:67.75,y:28.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.4164,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-23.2952,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-26.3706,x:-13.8,y:54.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.4693,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.093,x:-64,y:-67.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:6.0145,x:0.7,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.8634,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:5.5774,x:-13.1,y:65.65,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:3.1315,x:59.4,y:45.85,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.262,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.4636,x:67.1,y:28.85,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8973,x:55.8,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-21.8363,x:-35.35,y:-9.45,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-27.77,x:-15.4,y:55.25}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.9517,x:-57.75,y:-33.5,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.4274,x:-64.3,y:-67.25,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:5.3542,x:0.7,y:3.8,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-13.7833,x:53.7,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:4.0351,x:-12.35,y:65.9,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:1.7825,x:60.5,y:45.75,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.6343,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.8347,x:66.5,y:29.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.3793,x:55.8,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-20.3772,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-29.1681,x:-17.05,y:55.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.4322,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.7619,x:-64.55,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:4.6926,x:0.7,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-14.7021,x:53.75,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:2.4932,x:-11.7,y:66.05,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:0.4338,x:61.45,y:45.7,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.0059,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.2076,x:65.85,y:29.55,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.8588,x:56,y:-37.1,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-18.919,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-30.567,x:-18.75,y:56.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.9135,x:-57.85,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.0958,x:-64.9,y:-67.1,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:4.0319,x:0.7,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-15.6212,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:0.9496,x:-10.95,y:66.2,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-0.9096,x:62.5,y:45.55,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.378,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.58,x:65.15,y:29.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.3404,x:55.95,y:-37,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-17.4606,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-31.9654,x:-20.4,y:56.45}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.3953,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.4313,x:-65.2,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:3.3708,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-16.5406,x:53.5,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-0.5881,x:-10.2,y:66.3,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-2.2595,x:63.6,y:45.3,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.7507,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-10.951,x:64.5,y:30.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.8205,x:55.9,y:-37.05,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-16.0016,x:-35.25,y:-9.45,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-33.3642,x:-22.1,y:56.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.876,x:-57.8,y:-33.45,regY:12.9,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.7662,x:-65.5,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:2.7101,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-17.4591,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-2.1306,x:-9.5,y:66.4,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-3.6065,x:64.65,y:45.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.1228,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-10.3236,x:63.9,y:30.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.3027,x:55.9,y:-37.05,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-14.5435,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-34.762,x:-23.8,y:57.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.3584,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.0997,x:-65.8,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:2.0488,x:0.65,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-18.3782,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-3.6737,x:-8.75,y:66.5,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-4.9553,x:65.65,y:45,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-33.4949,y:-29.4,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-9.6955,x:63.4,y:30.95,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-5.7835,x:55.9,y:-37,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-13.0842,x:-35.15,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-36.161,x:-25.55,y:57.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.839,x:-57.75,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-14.4347,x:-66.1,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:1.3879,x:0.65,y:3.8,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-19.2973,x:53.75,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-5.216,x:-8.05,y:66.65,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-6.3034,x:66.75,y:44.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.8679,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-9.066,x:62.6,y:31.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.2648,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-11.6252,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-37.559,x:-27.25,y:57.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.3202,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.7694,x:-66.4,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:0.7272,x:0.65,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-20.2166,x:53.6,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-6.7577,x:-7.35,y:66.75,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-7.6524,x:67.8,y:44.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.2392,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-8.4393,x:61.95,y:31.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-6.7455,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-10.167,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-38.9577,x:-28.95,y:57.75}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.8026,x:-57.8,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.103,x:-66.65,y:-66.55,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:0.0656,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-21.1358,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-8.3016,x:-6.65,y:66.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.0012,x:68.85,y:44.3,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.611,y:-29.4,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.812,x:61.25,y:31.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.2261,x:55.75,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-8.7083,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-40.3565,x:-30.65,y:57.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.2829,x:-57.8,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.4376,x:-66.95,y:-66.6,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-0.5906,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-22.0546,x:53.65,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-9.8439,x:-5.9,y:66.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.3496,x:69.85,y:44.05,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.9837,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.1847,x:60.55,y:32.25,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.708,x:55.9,y:-37,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-7.2491,x:-35.35,y:-9.35,regX:-1.1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-41.7544,x:-32.4,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.7649,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.7718,x:-67.4,y:-66.45,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-1.2514,x:0.7,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-22.9736,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-11.386,x:-5.2,y:66.95,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.6985,x:70.95,y:43.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.3565,y:-29.45,x:32.4,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-6.5554,x:59.85,y:32.55,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.1885,x:55.85,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-5.791,x:-35.35,y:-9.55,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-43.1529,x:-34.1,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.2463,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.107,x:-67.5,y:-66.35,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-1.9131,x:0.7,y:3.8,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-23.893,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-12.9293,x:-4.5,y:67,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.0462,x:71.95,y:43.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-29.7286,y:-29.35,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.9281,x:59.25,y:32.85,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.6689,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-4.3324,x:-35.15,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-44.5508,x:-35.85,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.7274,x:-57.8,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.4418,x:-67.85,y:-66.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-2.5734,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-24.8139,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.4716,x:-3.9,y:67.05,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-14.3948,x:73,y:43.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-28.9069,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.6762,x:58.35,y:33.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.4672,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-4.0508,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-42.756,x:-36.2,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:12.9633,x:-57.65,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.0989,x:-67.7,y:-66.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-3.0562,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-25.3561,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.4419,x:-3.3,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-14.2337,x:73.6,y:43,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-28.0849,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.4236,x:57.35,y:33.6,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.2672,x:55.85,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.7685,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-40.9615,x:-36.45,y:58.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.199,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.7582,x:-67.7,y:-66.35,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-3.5374,x:0.75,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-25.8973,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.413,x:-2.8,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-14.0728,x:74.15,y:42.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-27.2624,y:-29.35,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.172,x:56.5,y:33.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-8.0648,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.4871,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-39.1668,x:-36.9,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.4353,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.4176,x:-67.4,y:-66.45,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-4.0196,x:0.75,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-26.4401,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.3831,x:-2.25,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.913,x:74.8,y:42.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-26.4408,y:-29.45,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.9205,x:55.6,y:34.25,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.8616,x:55.85,y:-36.9,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.205,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-37.3718,x:-37.1,y:58.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.6715,x:-57.85,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.0758,x:-67.3,y:-66.4,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-4.5014,x:0.8,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-26.9821,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.3542,x:-1.65,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.7515,x:75.4,y:42.45,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-25.6188,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.6681,x:54.85,y:34.6,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.6603,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.9229,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-35.5774,x:-37.55,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:13.9082,x:-57.8,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.734,x:-67.2,y:-66.5,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-4.9834,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-27.5257,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.3253,x:-1.1,y:67.2,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.5916,x:76,y:42.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-24.7971,y:-29.4,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.4168,x:53.8,y:34.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.4589,x:55.85,y:-36.85,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-2.64,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-33.7833,x:-37.75,y:58.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.1439,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.3924,x:-66.9,y:-66.45,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-5.465,x:0.7,y:3.75,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-28.0686,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.2954,x:-0.5,y:67.2,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.4305,x:76.6,y:42,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-23.9753,y:-29.3,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.1638,x:53,y:35.15,regX:4.6}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-7.256,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.3572,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-31.9879,x:-38.15,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.3801,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.0511,x:-66.85,y:-66.6,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-5.9477,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-28.6105,x:53.6,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.2665,x:0,y:67.2,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.2703,x:77.2,y:41.75,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-23.1522,y:-29.45,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.9127,x:52.05,y:35.5,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-7.0551,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.0753,x:-35.2,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-30.1936,x:-38.5,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.6164,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.7104,x:-66.7,y:-66.6,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-6.4301,x:0.75,y:3.75,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-29.1533,x:53.65,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.2377,x:0.55,y:67.25,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-13.1083,x:77.85,y:41.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-22.3312,y:-29.4,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.6598,x:51,y:35.75,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.8532,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.7935,x:-35.25,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-28.3986,x:-38.8,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.8533,x:-57.85,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.3691,x:-66.6,y:-66.6,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-6.9102,x:0.75,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-29.6959,x:53.6,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.208,x:1.05,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.9484,x:78.45,y:41.35,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-21.5093,y:-29.4,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.408,x:50.05,y:36.05,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-6.6513,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.5117,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-26.6034,x:-39.15,y:57.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.0888,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.0275,x:-66.45,y:-66.65,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-7.3934,x:0.7,y:3.7,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-30.2373,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.1791,x:1.55,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.7882,x:79,y:41.05,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-20.686,y:-29.35,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.1569,x:49.25,y:36.3,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.4489,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.2291,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.8106,x:-39.55,y:57.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.3257,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.6865,x:-66.3,y:-66.7,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-7.8754,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-30.7798,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.1498,x:2.1,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-12.6273,x:79.7,y:40.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-19.8649,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.9043,x:48.2,y:36.45,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.2473,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.9474,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-23.0149,x:-39.8,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.5616,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.3438,x:-66.15,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-8.3571,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-31.3234,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.1201,x:2.65,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.4657,x:80.2,y:40.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-19.0444,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.6518,x:47.25,y:36.75,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-6.0466,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.6648,x:-35.35,y:-9.6,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-21.2212,x:-40.2,y:57.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.7972,x:-57.8,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.0044,x:-66,y:-66.8,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-8.8387,x:0.7,y:3.55,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-31.8659,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.0914,x:3.15,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.306,x:80.8,y:40.3,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-18.2218,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.4001,x:46.4,y:36.9,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-5.8442,x:55.75,y:-36.95,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.3823,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-19.4261,x:-40.5,y:57.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.0335,x:-57.7,y:-33.5,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.663,x:-65.9,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-9.3216,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-32.4081,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.0617,x:3.75,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-12.1455,x:81.4,y:40.05,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-17.3989,y:-29.3,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.1485,x:45.35,y:37.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.642,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.0997,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-17.6314,x:-40.65,y:57.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.27,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.3225,x:-65.75,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-9.8025,x:0.7,y:3.75,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-32.95,x:53.7,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.0331,x:4.25,y:67.05,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.9832,x:81.9,y:39.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-16.5779,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.8969,x:44.4,y:37.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.4408,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.1776,x:-35.15,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-15.8365,x:-41.15,y:57.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.5073,x:-57.75,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-10.9811,x:-65.65,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-10.2843,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-33.4926,x:53.55,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.0042,x:4.75,y:67,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.8239,x:82.55,y:39.55,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-15.7555,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.6445,x:43.4,y:37.45,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.2385,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.4592,x:-35.35,y:-9.55,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-14.0424,x:-41.5,y:57.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.7422,x:-57.7,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-10.6378,x:-65.6,y:-66.9,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-10.7666,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-34.0357,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.9753,x:5.35,y:67,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.6627,x:83.1,y:39.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-14.9357,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.3921,x:42.5,y:37.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-5.0374,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.7427,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-12.247,x:-41.8,y:57.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.9787,x:-57.75,y:-33.5,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-10.2979,x:-65.3,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-11.2488,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-34.578,x:53.7,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.9462,x:5.85,y:66.95,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.5019,x:83.65,y:38.95,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-14.1128,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.1406,x:41.5,y:37.8,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.8346,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.0235,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-10.4524,x:-42,y:57.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.2151,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-9.9566,x:-65.15,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-11.7311,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-35.1209,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.9167,x:6.45,y:66.9,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.3419,x:84.25,y:38.7,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-13.291,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.8892,x:40.55,y:37.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.6336,x:55.8,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.3061,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-8.6576,x:-42.5,y:57.55}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.4515,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-9.6156,x:-65.2,y:-67,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-12.2131,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-35.664,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.8877,x:7,y:66.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.1804,x:84.85,y:38.4,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-12.4671,y:-29.4,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.6369,x:39.65,y:38.05,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.4325,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.5896,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-6.8638,x:-42.85,y:57.55}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.6876,x:-57.7,y:-33.4,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-9.274,x:-65.05,y:-66.9,regY:11.6,regX:12.5}},{t:this.instance_3,p:{rotation:-12.6953,x:0.7,y:3.75,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-36.206,x:53.65,y:-21.5}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.8573,x:7.5,y:66.75,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-11.0205,x:85.4,y:38.1,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-11.6463,y:-29.3,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.3854,x:38.65,y:38.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.2298,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.8697,x:-35.25,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-5.0674,x:-42.95,y:57.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.9235,x:-57.85,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-8.9318,x:-64.75,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-13.1765,x:0.75,y:3.75,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-36.7487,x:53.55,y:-21.5}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.8291,x:8.05,y:66.7,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.8597,x:85.95,y:37.75,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-10.8244,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.1332,x:37.65,y:38.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.0272,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.1524,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-3.2733,x:-43.45,y:57.45}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.1601,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-8.5909,x:-64.65,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-13.6593,x:0.7,y:3.7,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-37.2913,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.8002,x:8.55,y:66.6,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.699,x:86.5,y:37.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-10.0018,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.1139,x:36.65,y:38.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.8255,x:55.8,y:-36.9,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.4343,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-1.4788,x:-43.8,y:57.4}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.3954,x:-57.7,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-8.2503,x:-64.5,y:-67.15,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-14.1417,x:0.65,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-37.8335,x:53.6,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.7705,x:9.05,y:66.55,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.5385,x:87.05,y:37.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-9.1814,y:-29.25,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.367,x:35.75,y:38.35,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.6239,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.7179,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:0.3106,x:-44.1,y:57.35}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.6317,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-7.9082,x:-64.4,y:-67.05,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-14.6235,x:0.75,y:3.7,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-38.3754,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.7414,x:9.6,y:66.5,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.3773,x:87.6,y:36.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-8.3584,y:-29.25,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.6185,x:34.7,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.4222,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.9991,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9993,scaleY:0.9993,rotation:2.1065,x:-44.4,y:57.35}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.8684,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-7.5672,x:-64.2,y:-67.15,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-15.1051,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-38.9194,x:53.55,y:-21.55}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.7119,x:10.1,y:66.5,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.2169,x:88.15,y:36.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9976,scaleY:0.9976,rotation:-7.538,y:-29.3,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.8708,x:33.75,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.2206,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:3.2812,x:-35.15,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:3.9001,x:-44.7,y:57.25}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.1053,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-7.2265,x:-64.05,y:-67.25,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-15.587,x:0.75,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-39.4619,x:53.5,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.6831,x:10.65,y:66.35,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-10.0567,x:88.7,y:36.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-6.7157,y:-29.35,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:1.1222,x:32.9,y:38.5,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.0191,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:3.5642,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:5.6957,x:-45,y:57.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.3409,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-6.8843,x:-63.9,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-16.0687,x:0.7,y:3.55,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-40.0037,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.6533,x:11.15,y:66.35,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.8948,x:89.25,y:35.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-5.8921,y:-29.25,x:32.3,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:1.3737,x:31.85,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8167,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:3.8465,x:-35.2,y:-9.45,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:7.49,x:-45.5,y:57.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.5762,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-6.5425,x:-63.85,y:-67.35,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-16.5502,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-40.5454,x:53.55,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.6245,x:11.65,y:66.25,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.7347,x:89.75,y:35.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-5.0706,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:1.6261,x:30.85,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.6144,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:4.1279,x:-35.2,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:9.2855,x:-45.75,y:57.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.8126,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-6.2016,x:-63.7,y:-67.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-17.0327,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-41.0899,x:53.6,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-13.5948,x:12.2,y:66.15,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.5755,x:90.35,y:35.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-6.7457,y:-29.3,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:0.7367,x:32.95,y:38.4,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.7239,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:3.552,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:8.1259,x:-45.1,y:57.2}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.4865,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-7.2591,x:-63.85,y:-67.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-16.0471,x:0.7,y:3.55,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-39.9918,x:53.65,y:-21.5}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.9093,x:11.15,y:66.3,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-9.4701,x:89.35,y:35.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9976,scaleY:0.9976,rotation:-8.4213,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-0.148,x:34.8,y:38.4,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8325,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.9746,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:6.966,x:-44.45,y:57.3}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.1607,x:-57.7,y:-33.5,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-8.3158,x:-64.05,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-15.0613,x:0.8,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-38.8963,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-16.2224,x:9.95,y:66.5,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-9.368,x:88.15,y:36.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-10.0962,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.0372,x:36.8,y:38.25,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.942,x:55.75,y:-36.8,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:2.3983,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:5.8048,x:-43.7,y:57.45}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.833,x:-57.8,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-9.3733,x:-64.45,y:-67.15,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-14.0759,x:0.65,y:3.55,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-37.7978,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-17.5366,x:8.9,y:66.6,regX:3.8}},{t:this.instance,p:{regX:4.8,rotation:-9.2631,x:87.15,y:37.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-11.7716,y:-29.25,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-1.9267,x:38.8,y:38.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.0497,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.8215,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:4.6459,x:-43.05,y:57.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.5069,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-10.4288,x:-64.45,y:-67.05,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-13.0893,x:0.65,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-36.7018,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-18.8495,x:7.9,y:66.7,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-9.1591,x:86,y:37.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-13.4476,y:-29.4,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-2.8166,x:40.75,y:37.85,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.1584,x:55.75,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:1.2457,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:3.4845,x:-42.45,y:57.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.1803,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.4859,x:-64.6,y:-67.1,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-12.104,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-35.6057,x:53.5,y:-21.35}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-20.1632,x:6.75,y:66.7,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-9.0562,x:84.75,y:38.4,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-15.1217,y:-29.25,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-3.7055,x:42.75,y:37.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.267,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.6683,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:2.3245,x:-41.7,y:57.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.854,x:-57.75,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.5428,x:-64.8,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-11.1179,x:0.65,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-34.5081,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-21.4775,x:5.7,y:66.95,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-8.9515,x:83.75,y:39,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-16.7973,y:-29.3,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-4.5952,x:44.75,y:37.3,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-3.3774,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:0.0918,x:-35.2,y:-9.6,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:1.1646,x:-40.95,y:57.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.5265,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.5996,x:-65.05,y:-67,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-10.1321,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-33.4098,x:53.6,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-22.791,x:4.6,y:67.05,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-8.8486,x:82.45,y:39.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-18.4718,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-5.4844,x:46.55,y:36.85,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.4853,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-0.4802,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:0.0035,x:-40.35,y:57.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.201,x:-57.75,y:-33.65,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.6563,x:-65.25,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-9.146,x:0.75,y:3.75,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-32.3134,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-24.1045,x:3.4,y:67.1,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-8.744,x:81.25,y:40.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-20.1475,y:-29.35,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-6.3739,x:48.5,y:36.45,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.5931,x:55.7,y:-36.85,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.0576,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-1.1524,x:-39.65,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.8743,x:-57.8,y:-33.45,regY:12.9,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.713,x:-65.5,y:-66.9,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-8.1608,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-31.217,x:53.6,y:-21.5}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-25.4182,x:2.3,y:67.15,regX:3.8}},{t:this.instance,p:{regX:4.8,rotation:-8.642,x:80.2,y:40.6,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-21.8213,y:-29.45,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-7.2632,x:50.4,y:36,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.7018,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-1.6351,x:-35.2,y:-9.45,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-2.3114,x:-39.05,y:57.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.5481,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.7694,x:-65.65,y:-66.9,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-7.1747,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-30.1196,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-26.733,x:1.3,y:67.25,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-8.5366,x:78.9,y:41.15,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-23.4965,y:-29.25,x:32.3,regY:-29.2,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-8.1517,x:52.45,y:35.35,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.8105,x:55.7,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.211,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-3.4723,x:-38.35,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.2218,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.8263,x:-65.8,y:-66.8,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-6.1888,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-29.0228,x:53.7,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-28.0454,x:0.25,y:67.15,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-8.433,x:77.85,y:41.55,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-25.1723,y:-29.3,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-9.0428,x:54.2,y:34.75,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-3.9193,x:55.9,y:-37.05,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-2.788,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-4.6318,x:-37.65,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.8944,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.8833,x:-66.05,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-5.2039,x:0.8,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-27.9276,x:53.6,y:-21.55}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-29.3603,x:-0.95,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-8.3292,x:76.5,y:42,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-26.8469,y:-29.35,x:32.3,regY:-29.2,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-9.932,x:56.05,y:34.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.0281,x:55.75,y:-36.9,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.3645,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-5.7924,x:-36.85,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.5682,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.9399,x:-66.2,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-4.2178,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-26.8298,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-30.6733,x:-1.95,y:67.1,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-8.2256,x:75.25,y:42.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-28.5237,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-10.8215,x:57.9,y:33.35,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9993,scaleY:0.9993,rotation:-4.1377,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-3.9412,x:-35.35,y:-9.45,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-6.953,x:-36.3,y:58.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.2415,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.9959,x:-66.4,y:-66.7,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-3.2322,x:0.75,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-25.7321,x:53.55,y:-21.3}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-31.9871,x:-3.15,y:67,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-8.122,x:74.15,y:42.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.197,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.7114,x:59.75,y:32.55,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.2457,x:55.85,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-4.5166,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-8.1125,x:-35.65,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:14.9149,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-22.0525,x:-66.7,y:-66.6,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:-2.245,x:0.7,y:3.75,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-24.6368,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-33.3005,x:-4.3,y:67.1,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-8.0186,x:72.8,y:43.25,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.4712,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.798,x:60.15,y:32.4,regX:4.6}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9993,scaleY:0.9993,rotation:-4.1614,x:55.85,y:-37.05,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-5.1882,x:-35.2,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-8.6627,x:-34.9,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.0845,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-21.7018,x:-66.5,y:-66.7,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-1.9411,x:0.75,y:3.75,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-24.2159,x:53.65,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-31.9415,x:-4.5,y:67.05,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-7.5983,x:72.3,y:43.45,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-30.7443,y:-29.45,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.8843,x:60.3,y:32.35,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-4.0781,x:55.85,y:-36.95,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-5.8587,x:-35.15,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-9.2146,x:-34.05,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.254,x:-57.75,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-21.3506,x:-66.4,y:-66.6,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-1.6374,x:0.75,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-23.7953,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-30.5839,x:-4.8,y:66.95,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-7.1778,x:71.85,y:43.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.0179,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-11.9719,x:60.6,y:32.1,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.993,x:55.9,y:-36.9,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-6.5292,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-9.7645,x:-33.25,y:58.05}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.4236,x:-57.7,y:-33.5,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-21.0003,x:-66.3,y:-66.75,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-1.3327,x:0.7,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-23.3745,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-29.2243,x:-5.25,y:66.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-6.7575,x:71.4,y:43.65,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.2899,y:-29.45,x:32.35,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.0597,x:60.9,y:32.05,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-3.908,x:55.9,y:-37.1,regX:-8.3}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-7.1998,x:-35.2,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-10.3164,x:-32.45,y:58}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.5937,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.6485,x:-66.15,y:-66.65,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:-1.0299,x:0.7,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-22.9555,x:53.65,y:-21.45}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-27.8681,x:-5.45,y:66.95,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-6.3378,x:70.9,y:43.8,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.5626,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.1466,x:61.2,y:31.9,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.8237,x:55.75,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-7.8712,x:-35.35,y:-9.4,regX:-1.1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-10.8657,x:-31.7,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.7617,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-20.2963,x:-66.1,y:-66.8,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-0.7254,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-22.5336,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-26.5091,x:-5.85,y:66.9,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-5.9166,x:70.45,y:43.9,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-31.8369,y:-29.5,x:32.4,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.2334,x:61.5,y:31.8,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.7404,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-8.5411,x:-35.25,y:-9.4,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-11.4177,x:-30.8,y:57.95}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:15.9316,x:-57.75,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.9454,x:-66,y:-66.8,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-0.4209,x:0.7,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-22.1143,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-25.1493,x:-6.15,y:66.8,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-5.4973,x:69.95,y:44,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.1081,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.3214,x:61.8,y:31.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.6554,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-9.2122,x:-35.35,y:-9.45,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-11.9678,x:-30.15,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.1022,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.5944,x:-65.9,y:-66.9,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:-0.1164,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-21.6943,x:53.65,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-23.7914,x:-6.6,y:66.85,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-5.0776,x:69.45,y:44.2,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.3824,y:-29.45,x:32.3,regY:-29.3,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.4066,x:62.2,y:31.45,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.5713,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-9.8827,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-12.5177,x:-29.3,y:57.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.2711,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-19.2418,x:-65.8,y:-66.85,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:0.1829,x:0.7,y:3.6,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-21.2747,x:53.55,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-22.4336,x:-6.85,y:66.75,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-4.6581,x:68.95,y:44.3,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.655,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.4942,x:62.5,y:31.3,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.487,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-10.5537,x:-35.3,y:-9.5,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-13.0694,x:-28.55,y:57.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.4398,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.8916,x:-65.85,y:-66.9,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:0.4874,x:0.65,y:3.6,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:1.9,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-20.8531,x:53.55,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-21.0746,x:-7.15,y:66.75,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-4.237,x:68.65,y:44.45,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-32.9282,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.5814,x:62.8,y:31.2,regX:4.6}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.4038,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-11.2238,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-13.6207,x:-27.75,y:57.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.6093,x:-57.65,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.5385,x:-65.6,y:-66.9,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:0.791,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-20.4341,x:53.65,y:-21.35}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-19.7172,x:-7.7,y:66.6,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:-3.8163,x:68.05,y:44.5,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-33.2017,y:-29.35,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.6691,x:62.9,y:31.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.3188,x:55.7,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-11.8944,x:-35.35,y:-9.45,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-14.1716,x:-26.95,y:57.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.7793,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-18.1878,x:-65.5,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:1.0947,x:0.75,y:3.8,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-20.0138,x:53.7,y:-21.4}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-18.3577,x:-7.85,y:66.6,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-3.3975,x:67.6,y:44.55,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-33.474,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.7554,x:63.2,y:30.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.2338,x:55.7,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-12.5656,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-14.7219,x:-26.15,y:57.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:16.9485,x:-57.8,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.8357,x:-65.45,y:-66.95,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:1.3993,x:0.65,y:3.8,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-19.5925,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-16.9998,x:-8.1,y:66.6,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-2.9762,x:67.2,y:44.7,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-33.7472,y:-29.35,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.8427,x:63.5,y:30.75,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.1496,x:55.75,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-13.2362,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-15.2733,x:-25.4,y:57.5}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.1188,x:-57.8,y:-33.7,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.4845,x:-65.35,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:1.7039,x:0.65,y:3.8,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-19.1726,x:53.7,y:-21.35}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-15.6415,x:-8.45,y:66.45,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-2.556,x:66.55,y:44.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.0211,y:-29.4,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-12.9297,x:63.8,y:30.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-3.0655,x:55.8,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-13.9075,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-15.8229,x:-24.6,y:57.3}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.2879,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-17.134,x:-65.2,y:-66.95,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:2.0086,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-18.7526,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-14.2829,x:-8.75,y:66.5,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-2.1359,x:66.25,y:44.9,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.2937,y:-29.35,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.0172,x:64.1,y:30.5,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.9823,x:55.85,y:-37,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-14.576,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-16.3748,x:-23.75,y:57.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.4576,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.7816,x:-65.2,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:2.3116,x:0.65,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.2,scaleX:0.9984,scaleY:0.9984,rotation:-18.333,x:53.65,y:-21.5}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-12.9248,x:-9.1,y:66.45,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-1.7151,x:65.65,y:44.95,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.5649,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.1043,x:64.35,y:30.35,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8973,x:55.8,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-15.2467,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-16.9254,x:-22.95,y:57.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.6259,x:-57.65,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.4311,x:-65.05,y:-67.05,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:2.6163,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-17.913,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-11.5663,x:-9.45,y:66.45,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-1.2952,x:65.1,y:45.1,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-34.8387,y:-29.5,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.1917,x:64.65,y:30.2,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.8123,x:55.8,y:-37.2,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-15.918,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-17.477,x:-22.15,y:56.85}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.7959,x:-57.65,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-16.0796,x:-65,y:-67,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:2.9203,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-17.492,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-10.2083,x:-9.75,y:66.4,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-0.8754,x:64.65,y:45.25,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.1118,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.2781,x:64.9,y:30.05,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.7282,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-16.5887,x:-35.15,y:-9.35,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-18.0263,x:-21.35,y:56.7}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:17.9661,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.7274,x:-65,y:-67.1,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:3.2243,x:0.6,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-17.0721,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-8.8497,x:-10.1,y:66.35,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:-0.4548,x:64.15,y:45.25,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.3841,y:-29.45,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.3646,x:65.2,y:29.9,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.6432,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-17.2587,x:-35.15,y:-9.35,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-18.5774,x:-20.65,y:56.6}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.1355,x:-57.7,y:-33.65,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.3766,x:-64.75,y:-67.1,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:3.5286,x:0.7,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-16.6519,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-7.4905,x:-10.45,y:66.25,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:-0.0342,x:63.85,y:45.4,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.6594,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.4526,x:65.45,y:29.75,regX:4.5}},{t:this.instance_9,p:{regY:-36.1,scaleX:0.9992,scaleY:0.9992,rotation:-2.5592,x:55.8,y:-37.25,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-17.9298,x:-35.2,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-19.1283,x:-19.85,y:56.35}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.3049,x:-57.8,y:-33.45,regY:12.9,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-15.0251,x:-64.7,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:3.8328,x:0.7,y:3.8,regY:-25,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-16.2321,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-6.1324,x:-10.9,y:66.25,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:0.3812,x:63.2,y:45.45,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-35.9301,y:-29.45,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.5393,x:65.75,y:29.5,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.4751,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-18.6004,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-19.6788,x:-19.05,y:56.15}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.4737,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.6754,x:-64.55,y:-67.2,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:4.1372,x:0.7,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-15.8112,x:53.65,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-4.7742,x:-11.1,y:66.15,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:0.8009,x:62.85,y:45.45,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.2048,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.6266,x:66,y:29.45,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-2.391,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-19.2709,x:-35.2,y:-9.35,regX:-1,regY:-28}},{t:this.instance_7,p:{regX:3.5,regY:-38.1,scaleX:0.9992,scaleY:0.9992,rotation:-20.2304,x:-18.25,y:56.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.6439,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-14.3217,x:-64.45,y:-67.15,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:4.4406,x:0.7,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-15.3922,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-3.4159,x:-11.4,y:66,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:1.2207,x:62.25,y:45.55,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.4764,y:-29.5,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.7133,x:66.3,y:29.3,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-2.307,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-19.9425,x:-35.25,y:-9.55,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-20.7797,x:-17.55,y:55.8}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.8128,x:-57.75,y:-33.65,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.9711,x:-64.5,y:-67.2,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:4.7445,x:0.65,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-14.9718,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:-2.057,x:-11.75,y:65.9,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:1.6414,x:61.75,y:45.6,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-36.7505,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.8008,x:66.6,y:29.15,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.2229,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-20.611,x:-35.3,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-21.332,x:-16.75,y:55.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:18.9833,x:-57.85,y:-33.5,regY:12.9,regX:9.6}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.6195,x:-64.25,y:-67.25,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:5.0492,x:0.7,y:3.7,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-14.5506,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:-0.6992,x:-12.05,y:66,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:2.0605,x:61.25,y:45.6,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.0231,y:-29.45,x:32.35,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.8873,x:66.85,y:28.95,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9993,scaleY:0.9993,rotation:-2.1379,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-21.2834,x:-35.35,y:-9.5,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-21.8826,x:-16.05,y:55.4}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.1524,x:-57.75,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-13.2676,x:-64.15,y:-67.3,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:5.3542,x:0.7,y:3.8,regY:-25,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-14.1314,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:0.6555,x:-12.4,y:65.95,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:2.4806,x:60.8,y:45.7,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.2957,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-13.9748,x:67.15,y:28.8,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-2.0539,x:55.8,y:-37.15,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-21.9549,x:-35.3,y:-9.45,regX:-1.1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-22.4325,x:-15.2,y:55.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.3212,x:-57.7,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.9171,x:-64.2,y:-67.25,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:5.6574,x:0.65,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-13.7104,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:2.0132,x:-12.75,y:65.85,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:2.9025,x:60.25,y:45.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.5697,y:-29.45,x:32.4,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.0624,x:67.45,y:28.65,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-1.969,x:55.8,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9994,scaleY:0.9994,rotation:-22.6245,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-22.9839,x:-14.45,y:54.9}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.4909,x:-57.65,y:-33.6,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.5655,x:-64.05,y:-67.35,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:5.9618,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-13.2906,x:53.7,y:-21.3}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:3.3721,x:-13.05,y:65.75,regX:3.9}},{t:this.instance,p:{regX:4.7,rotation:3.322,x:59.8,y:45.85,scaleX:0.9977,scaleY:0.9977}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-37.8419,y:-29.5,x:32.45,regY:-29.2,regX:0.4}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.1484,x:67.7,y:28.5,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-1.8859,x:55.8,y:-37.05,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-23.296,x:-35.2,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-23.5338,x:-13.75,y:54.65}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.6601,x:-57.7,y:-33.55,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-12.2132,x:-63.9,y:-67.25,regY:11.6,regX:12.6}},{t:this.instance_3,p:{rotation:6.2662,x:0.65,y:3.65,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.87,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.9,scaleX:0.999,scaleY:0.999,rotation:4.7303,x:-13.4,y:65.5,regX:3.9}},{t:this.instance,p:{regX:4.8,rotation:3.7416,x:59.45,y:45.85,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.1154,y:-29.4,x:32.3,regY:-29.2,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.2357,x:67.95,y:28.4,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-1.8027,x:55.9,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-23.9654,x:-35.25,y:-9.45,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.5,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.0866,x:-13,y:54.4}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:19.83,x:-57.8,y:-33.6,regY:12.8,regX:9.6}},{t:this.instance_4,p:{scaleX:0.999,scaleY:0.999,rotation:-11.8619,x:-63.9,y:-67.35,regY:11.5,regX:12.5}},{t:this.instance_3,p:{rotation:6.5691,x:0.65,y:3.75,regY:-25.1,scaleX:0.9992,scaleY:0.9992}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.4506,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:6.0883,x:-13.85,y:65.6,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:4.1632,x:58.8,y:45.95,scaleX:0.9978,scaleY:0.9978}}]},1).to({state:[{t:this.instance_11,p:{scaleX:0.9975,scaleY:0.9975,rotation:-38.3888,y:-29.45,x:32.35,regY:-29.2,regX:0.3}},{t:this.instance_10,p:{scaleX:0.998,scaleY:0.998,rotation:-14.3226,x:68.2,y:28.2,regX:4.5}},{t:this.instance_9,p:{regY:-36,scaleX:0.9992,scaleY:0.9992,rotation:-1.7169,x:55.9,y:-37.1,regX:-8.4}},{t:this.instance_8,p:{scaleX:0.9995,scaleY:0.9995,rotation:-24.6372,x:-35.25,y:-9.5,regX:-1,regY:-28.1}},{t:this.instance_7,p:{regX:3.6,regY:-38.2,scaleX:0.9992,scaleY:0.9992,rotation:-24.6372,x:-12.25,y:54.1}},{t:this.instance_6},{t:this.instance_5,p:{scaleX:0.9989,scaleY:0.9989,rotation:20.0518,x:-57.7,y:-33.65,regY:12.8,regX:9.7}},{t:this.instance_4,p:{scaleX:0.9989,scaleY:0.9989,rotation:-11.4574,x:-63.6,y:-67.5,regY:11.5,regX:12.6}},{t:this.instance_3,p:{rotation:6.8731,x:0.65,y:3.65,regY:-25.1,scaleX:0.9991,scaleY:0.9991}},{t:this.instance_2,p:{regX:2,regY:-28.1,scaleX:0.9984,scaleY:0.9984,rotation:-12.0293,x:53.7,y:-21.25}},{t:this.instance_1,p:{regY:-38.8,scaleX:0.999,scaleY:0.999,rotation:7.4457,x:-14.2,y:65.55,regX:3.8}},{t:this.instance,p:{regX:4.7,rotation:4.5824,x:58.25,y:45.95,scaleX:0.9977,scaleY:0.9977}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-115.5,-108.8,224.3,259.5);


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
	this.instance = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance.setTransform(-59.7,-12.4,0.9974,0.9974,-92.6463,0,0,33.6,9.5);

	this.instance_1 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1.setTransform(2.55,120.6,0.9969,0.9969,-132.2022,0,0,14.5,-0.4);

	this.instance_2 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2.setTransform(3,120.8,0.9973,0.9973,-102.4158,0,0,4.4,-9.1);

	this.instance_3 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_3.setTransform(-58.4,59.6,0.9972,0.9972,-140.2196,0,0,44.5,7.5);

	this.instance_4 = new lib.ch1_headcopy3("synched",0);
	this.instance_4.setTransform(1.45,-81.45,0.9979,0.9979,-11.8556,0,0,2.1,50.4);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-14.75,-33.45,1,1,0,0,0,-7.3,-36.1);

	this.instance_6 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_6.setTransform(24.9,88.35,0.9945,0.9945,-8.9646,0,0,0.8,4.7);

	this.instance_7 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_7.setTransform(-29.95,90.35,0.9954,0.9954,3.931,0,0,1.4,-42.2);

	this.instance_8 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_8.setTransform(-41.5,185.5,0.9949,0.9949,8.7322,0,0,1.2,-51.4);

	this.instance_9 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_9.setTransform(-4.05,-59.4,0.998,0.998,11.3493,0,0,-1.3,7.4);

	this.instance_10 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(33.9,185.75,0.9947,0.9947,-14.5568,0,0,3.4,-50.4);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(56.7,130.1,0.9971,0.9971,124.9995,0,0,-10.2,10.7);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(59.7,129.55,0.9972,0.9972,150.1937,0,0,-7.1,13.2);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(30.55,48.1,0.9972,0.9972,75.9986,0,0,-45.1,12.8);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(48.2,-21.25,0.9975,0.9975,104.8947,0,0,-33.1,13.3);

	this.instance_15 = new lib.ch1_lBodycopy2_1("synched",0);
	this.instance_15.setTransform(-10.2,49.1,0.9994,0.9994,1.7753,0,0,-4.9,-21.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4.9,scaleX:0.9994,scaleY:0.9994,rotation:1.7753,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:104.8947,regX:-33.1,regY:13.3,x:48.2,y:-21.25}},{t:this.instance_13,p:{rotation:75.9986,x:30.55,y:48.1,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9972,scaleY:0.9972,rotation:150.1937,x:59.7,y:129.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:124.9995,x:56.7,y:130.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-14.5568,x:33.9,y:185.75,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:11.3493,x:-4.05,y:-59.4}},{t:this.instance_8,p:{rotation:8.7322,x:-41.5,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.931,x:-29.95,y:90.35}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9646,x:24.9,y:88.35}},{t:this.instance_5,p:{y:-33.45}},{t:this.instance_4,p:{regY:50.4,rotation:-11.8556,x:1.45,y:-81.45,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-140.2196,x:-58.4,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-102.4158,x:3,y:120.8,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9969,scaleY:0.9969,rotation:-132.2022,x:2.55,y:120.6}},{t:this.instance,p:{regX:33.6,regY:9.5,rotation:-92.6463,x:-59.7,y:-12.4}}]}).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7736,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:105.6651,regX:-33.1,regY:13.3,x:48.2,y:-21.25}},{t:this.instance_13,p:{rotation:73.1761,x:29.65,y:47.8,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:147.371,x:62.7,y:127.7,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:122.1755,x:59.7,y:128.4,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.8,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-4,y:-59.35}},{t:this.instance_8,p:{rotation:8.7309,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8545,x:1.5,y:-81.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.839,x:-58.5,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.0336,x:2.4,y:121.15,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-131.8205,x:2,y:121.05}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.5472,x:-59.9,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7727,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:106.4388,regX:-33,regY:13.2,x:48.15,y:-21.15}},{t:this.instance_13,p:{rotation:70.3525,x:28.8,y:47.5,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:144.5472,x:65.6,y:125.75,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:119.3528,x:62.75,y:126.55,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.8,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-4,y:-59.35}},{t:this.instance_8,p:{rotation:8.7309,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8536,x:1.5,y:-81.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.4565,x:-58.55,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.6511,x:1.8,y:121.5,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-131.4397,x:1.45,y:121.45}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.4481,x:-59.9,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7727,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:107.2111,regX:-33.1,regY:13.3,x:48.15,y:-21.3}},{t:this.instance_13,p:{rotation:67.5284,x:27.8,y:47.25,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:141.7228,x:68.55,y:123.5,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:116.5282,x:65.6,y:124.6,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.8,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-4,y:-59.35}},{t:this.instance_8,p:{rotation:8.7309,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8536,x:1.5,y:-81.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.0748,x:-58.75,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.269,x:1.3,y:121.9,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-131.0581,x:0.9,y:121.85}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-92.3499,x:-59.85,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7727,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:107.9842,regX:-33,regY:13.2,x:48.25,y:-21.1}},{t:this.instance_13,p:{rotation:64.7047,x:26.9,y:46.95,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:138.8985,x:71.35,y:121.1,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:113.7047,x:68.6,y:122.3,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.8,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-4,y:-59.35}},{t:this.instance_8,p:{rotation:8.73,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8536,x:1.5,y:-81.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.6932,x:-58.9,y:59.5,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.8875,x:0.75,y:122.35,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.6758,x:0.4,y:122.25}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.2525,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7727,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:108.7573,regX:-33,regY:13.3,x:48.1,y:-21.15}},{t:this.instance_13,p:{rotation:61.8808,x:25.95,y:46.65,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:136.0752,x:74,y:118.5,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:110.8806,x:71.3,y:119.85,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.8,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-4,y:-59.35}},{t:this.instance_8,p:{rotation:8.73,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8536,x:1.55,y:-81.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.3125,x:-58.95,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.5065,x:0.15,y:122.8,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.295,x:-0.2,y:122.65}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.1534,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7727,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:109.5294,regX:-33,regY:13.3,x:48.1,y:-21.2}},{t:this.instance_13,p:{rotation:59.0583,x:25.05,y:46.35,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:133.2507,x:76.5,y:115.85,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:108.0567,x:73.9,y:117.25,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.8,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-4,y:-59.35}},{t:this.instance_8,p:{rotation:8.73,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8536,x:1.55,y:-81.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.9313,x:-59.05,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.1243,x:-0.35,y:123.2,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.9128,x:-0.7,y:123.05}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-92.0551,x:-59.85,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7718,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:110.3033,regX:-33,regY:13.3,x:48.05,y:-21.15}},{t:this.instance_13,p:{rotation:56.2326,x:24.2,y:45.95,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:130.4269,x:79.1,y:112.75,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:105.233,x:76.4,y:114.45,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-4,y:-59.35}},{t:this.instance_8,p:{rotation:8.73,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8536,x:1.55,y:-81.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.549,x:-59.15,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.7425,x:-1,y:123.6,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.531,x:-1.25,y:123.45}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.9578,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7718,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:111.0758,regX:-33,regY:13.3,x:48.05,y:-21.15}},{t:this.instance_13,p:{rotation:53.4091,x:23.25,y:45.65,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:127.6026,x:81.3,y:109.65,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:102.4097,x:78.85,y:111.4,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5558,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.73,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9625,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8536,x:1.55,y:-81.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.168,x:-59.2,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.361,x:-1.5,y:123.8,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.1502,x:-1.8,y:123.8}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.8587,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7718,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:111.8483,regX:-33,regY:13.3,x:48.15,y:-21.2}},{t:this.instance_13,p:{rotation:50.5849,x:22.35,y:45.2,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:124.7789,x:83.5,y:106.4,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:99.5867,x:81.15,y:108.15,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.73,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8527,x:1.5,y:-81.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.7858,x:-59.45,y:59.45,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.9791,x:-2.1,y:124.2,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.7679,x:-2.35,y:124.15}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.7604,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7718,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:112.6211,regX:-33,regY:13.3,x:48.05,y:-21.2}},{t:this.instance_13,p:{rotation:47.7618,x:21.45,y:44.85,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:121.9546,x:85.55,y:102.95,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:96.7623,x:83.2,y:104.9,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7291,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8527,x:1.55,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.405,x:-59.5,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.5977,x:-2.45,y:124.6,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.3859,x:-2.9,y:124.55}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.6622,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7718,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:113.3941,regX:-33,regY:13.3,x:48.05,y:-21.15}},{t:this.instance_13,p:{rotation:44.9374,x:20.5,y:44.6,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:119.1313,x:87.4,y:99.3,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:93.9384,x:85.2,y:101.4,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7291,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8527,x:1.55,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.0236,x:-59.6,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.2158,x:-3.25,y:125.05,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.0051,x:-3.5,y:124.95}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.564,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:114.1665,regX:-33.1,regY:13.3,x:48.1,y:-21.25}},{t:this.instance_13,p:{rotation:42.1128,x:19.65,y:44.15,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:116.3078,x:89.15,y:95.6,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:91.1154,x:87.1,y:97.9,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7291,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8527,x:1.55,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-135.6417,x:-59.65,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-97.8343,x:-3.75,y:125.35,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-127.6231,x:-4,y:125.35}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.4658,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:114.94,regX:-33,regY:13.3,x:48.05,y:-21.2}},{t:this.instance_13,p:{rotation:39.2905,x:18.75,y:43.75,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:113.483,x:90.7,y:91.65,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:88.2943,x:88.75,y:94,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7291,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.85,y:88.3}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8527,x:1.55,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-135.2604,x:-59.65,y:59.45,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-97.452,x:-4.35,y:125.75,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-127.2414,x:-4.6,y:125.65}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.3676,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:115.712,regX:-33,regY:13.3,x:48.05,y:-21.15}},{t:this.instance_13,p:{rotation:36.4655,x:17.9,y:43.3,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:110.659,x:92.15,y:87.7,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:85.4724,x:90.3,y:90.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.75,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3491,x:-3.9,y:-59.35}},{t:this.instance_8,p:{rotation:8.7291,x:-41.4,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8527,x:1.55,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-134.8772,x:-59.85,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-97.0702,x:-4.85,y:126.1,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-126.8594,x:-5.15,y:126}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.2694,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:113.5503,regX:-33,regY:13.3,x:48.05,y:-21.15}},{t:this.instance_13,p:{rotation:28.0776,x:20.35,y:44.3,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:102.2728,x:100.25,y:77.45,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:77.085,x:98.8,y:80.2,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.7,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3482,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7291,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8527,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-135.7204,x:-59.65,y:59.45,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-97.6712,x:-3.75,y:125.25,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-127.2302,x:-4.05,y:125.2}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.4053,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:111.3907,regX:-33,regY:13.3,x:48.05,y:-21.25}},{t:this.instance_13,p:{rotation:19.6919,x:22.75,y:45.3,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:93.8855,x:106.65,y:66.4,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:68.6978,x:105.45,y:69.25,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.7,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3482,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7291,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8527,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.5625,x:-59.5,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.2726,x:-2.65,y:124.4,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-127.6,x:-2.85,y:124.45}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.5412,x:-59.75,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:109.2291,regX:-33,regY:13.3,x:48,y:-21.2}},{t:this.instance_13,p:{rotation:11.3065,x:25.4,y:46.2,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:85.5043,x:111.4,y:55,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:60.3119,x:110.7,y:57.8,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.7,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3482,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7291,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9617,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8527,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.4056,x:-59.25,y:59.45,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.8735,x:-1.5,y:123.6,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-127.97,x:-1.8,y:123.55}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.678,x:-59.85,y:-12.3}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.771,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:107.0677,regX:-33,regY:13.3,x:48,y:-21.2}},{t:this.instance_13,p:{rotation:2.9191,x:27.9,y:47.05,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:77.1163,x:114.2,y:43.1,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:51.9247,x:113.9,y:46.1,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.7,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3482,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7291,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8527,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.2479,x:-59.15,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.474,x:-0.35,y:122.7,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.3404,x:-0.65,y:122.7}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.813,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:104.9064,regX:-33,regY:13.2,x:48.15,y:-21.15}},{t:this.instance_13,p:{rotation:-5.4626,x:30.55,y:47.75,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.997,scaleY:0.997,rotation:68.7301,x:115.35,y:31.15,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:43.5384,x:115.5,y:34.25,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.7,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3482,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8527,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.091,x:-59,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.0745,x:0.7,y:121.9,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.7099,x:0.4,y:121.8}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.949,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:102.7463,regX:-33,regY:13.3,x:47.95,y:-21.25}},{t:this.instance_13,p:{rotation:-13.8498,x:33.1,y:48.35,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:60.3442,x:114.6,y:19.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:35.1524,x:115.3,y:22.5,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5549,x:33.7,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3482,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8527,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.9324,x:-58.8,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.6751,x:1.9,y:120.95,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.0798,x:1.5,y:120.9}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.0858,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:100.5847,regX:-33,regY:13.3,x:48,y:-21.25}},{t:this.instance_13,p:{rotation:-22.2356,x:35.75,y:48.8,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:51.957,x:112.15,y:8.5,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:26.7658,x:113.2,y:11.35,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.65,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3482,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8527,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-140.7736,x:-58.55,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.2754,x:2.8,y:120.1,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.45,x:2.6,y:120.05}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.2209,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:98.4233,regX:-33,regY:13.2,x:48.05,y:-21.3}},{t:this.instance_13,p:{rotation:-30.6212,x:38.35,y:49.25,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:43.5713,x:108.05,y:-1.7,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:18.3787,x:109.55,y:0.9,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.65,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3482,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-141.6168,x:-58.5,y:59.55,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.876,x:3.85,y:119.2,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.8188,x:3.6,y:119.15}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-92.3586,x:-59.85,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:96.2614,regX:-33,regY:13.3,x:48,y:-21.25}},{t:this.instance_13,p:{rotation:-39.0082,x:40.95,y:49.55,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:35.1837,x:102.45,y:-11.1,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:9.9925,x:104.35,y:-8.65,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.65,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3482,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-142.4595,x:-58.25,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.4768,x:4.95,y:118.25,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.1899,x:4.65,y:118.2}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.4937,x:-59.85,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9975,scaleY:0.9975,rotation:94.1012,regX:-33,regY:13.3,x:48,y:-21.25}},{t:this.instance_13,p:{rotation:-47.3944,x:43.65,y:49.8,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:26.7976,x:95.7,y:-19.15,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:1.6057,x:97.85,y:-17.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.65,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3482,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-143.302,x:-58.1,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-103.0774,x:5.95,y:117.35,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.5594,x:5.65,y:117.25}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-92.6289,x:-59.9,y:-12.45}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:90.44,regX:-33,regY:13.3,x:47.95,y:-21.25}},{t:this.instance_13,p:{rotation:-47.9859,x:48.25,y:49.9,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:26.0565,x:99.5,y:-19.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:2.1146,x:101.7,y:-17.5,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-142.8292,x:-58.5,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.7652,x:5,y:117.85,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.4014,x:4.7,y:117.8}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.2218,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:86.7849,regX:-33,regY:13.3,x:48,y:-21.3}},{t:this.instance_13,p:{rotation:-48.5772,x:52.75,y:49.7,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:25.3152,x:103.2,y:-20.25,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:2.6245,x:105.55,y:-18.2,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-142.3569,x:-59.1,y:59.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.4534,x:3.95,y:118.35,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.2421,x:3.7,y:118.35}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.8139,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:83.1237,regX:-33,regY:13.3,x:48,y:-21.25}},{t:this.instance_13,p:{rotation:-49.1674,x:57.25,y:49.2,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:24.5742,x:107.15,y:-21.2,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:3.1328,x:109.35,y:-19.2,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-141.8834,x:-59.55,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.1428,x:3.1,y:118.95,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.0859,x:2.75,y:118.85}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.4079,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:79.4643,regX:-33,regY:13.3,x:47.95,y:-21.25}},{t:this.instance_13,p:{rotation:-49.7594,x:61.7,y:48.5,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:23.8344,x:110.9,y:-22.4,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:3.6424,x:113.15,y:-20.55,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-141.4115,x:-60.1,y:59.55,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.8309,x:1.9,y:119.4,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.9271,x:1.7,y:119.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.0011,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:75.8037,regX:-33,regY:13.3,x:48.05,y:-21.25}},{t:this.instance_13,p:{rotation:-50.35,x:66.1,y:47.4,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:23.0934,x:114.65,y:-24,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:4.1521,x:116.85,y:-22.05,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-140.9369,x:-60.6,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.5194,x:0.95,y:119.9,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.7702,x:0.65,y:119.9}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-90.5934,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7701,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:72.143,regX:-33.1,regY:13.3,x:48,y:-21.35}},{t:this.instance_13,p:{rotation:-50.9413,x:70.5,y:46.1,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:22.3518,x:118.2,y:-25.8,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:4.6613,x:120.45,y:-23.75,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-140.4641,x:-61,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.2083,x:0,y:120.45,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.612,x:-0.3,y:120.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-90.1858,x:-59.65,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:68.4826,regX:-33,regY:13.3,x:48,y:-21.3}},{t:this.instance_13,p:{rotation:-51.5326,x:74.8,y:44.55,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:21.6114,x:121.7,y:-27.8,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:5.1701,x:124,y:-25.95,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9608,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.9921,x:-61.6,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.8947,x:-1.05,y:120.85,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.455,x:-1.3,y:120.8}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-89.7817,x:-59.65,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:64.8224,regX:-33,regY:13.2,x:48.1,y:-21.3}},{t:this.instance_13,p:{rotation:-52.1232,x:78.9,y:42.8,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:20.8702,x:125.2,y:-30.1,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:5.6791,x:127.5,y:-28.35,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9599,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.5193,x:-62.05,y:59.45,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.5833,x:-1.95,y:121.35,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.2973,x:-2.35,y:121.35}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-89.3741,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:61.1631,regX:-33,regY:13.2,x:48.1,y:-21.3}},{t:this.instance_13,p:{rotation:-52.7135,x:82.9,y:40.75,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:20.1296,x:128.3,y:-32.75,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:6.1895,x:130.75,y:-30.95,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9599,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.0463,x:-62.55,y:59.45,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.2724,x:-3.15,y:121.85,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.139,x:-3.35,y:121.8}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.9674,x:-59.85,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:57.502,regX:-33,regY:13.3,x:48,y:-21.15}},{t:this.instance_13,p:{rotation:-53.3056,x:86.85,y:38.35,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:19.3883,x:131.5,y:-35.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:6.697,x:133.95,y:-33.85,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9599,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.5752,x:-63.1,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.9606,x:-4.1,y:122.3,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.9813,x:-4.4,y:122.25}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.5614,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:53.8408,regX:-33,regY:13.3,x:48.05,y:-21.1}},{t:this.instance_13,p:{rotation:-53.8962,x:90.5,y:35.75,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:18.6471,x:134.5,y:-38.6,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:7.2076,x:136.85,y:-36.8,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5543,x:33.6,y:185.75,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9599,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.102,x:-63.55,y:59.45,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.6483,x:-5.2,y:122.65,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.824,x:-5.4,y:122.65}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.1536,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:50.1819,regX:-33,regY:13.3,x:48,y:-21.2}},{t:this.instance_13,p:{rotation:-54.4873,x:94.15,y:32.85,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:17.9073,x:137.15,y:-41.95,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:7.7169,x:139.65,y:-40.2,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5532,x:33.65,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7285,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9598,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.6,y:-81.55,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.629,x:-64.1,y:59.35,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.3371,x:-6.25,y:123.1,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.6668,x:-6.4,y:123.2}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-87.7458,x:-59.85,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:46.5212,regX:-33,regY:13.3,x:48,y:-21.2}},{t:this.instance_13,p:{rotation:-55.0774,x:97.4,y:29.8,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:17.1655,x:139.85,y:-45.35,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:8.2252,x:142.35,y:-43.75,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5532,x:33.65,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7277,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9598,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.65,y:-81.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.1562,x:-64.6,y:59.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.0255,x:-7.3,y:123.5,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.5083,x:-7.45,y:123.6}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-87.3378,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:42.8611,regX:-33,regY:13.2,x:48.05,y:-21.3}},{t:this.instance_13,p:{rotation:-55.6687,x:100.65,y:26.55,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:16.4243,x:142.25,y:-49.1,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:8.735,x:144.7,y:-47.5,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5532,x:33.65,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3476,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7277,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9598,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.8519,x:1.65,y:-81.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.6822,x:-65.15,y:59.3,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.713,x:-8.15,y:124.05,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.3511,x:-8.5,y:124.05}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-86.9322,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:39.2005,regX:-33,regY:13.3,x:48,y:-21.2}},{t:this.instance_13,p:{rotation:-56.2603,x:103.5,y:23.1,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:15.6833,x:144.4,y:-52.95,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:9.2445,x:146.85,y:-51.35,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.553,x:33.65,y:185.7,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3474,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7277,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9304,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9598,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.3,rotation:-11.851,x:1.65,y:-81.5,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.2103,x:-65.65,y:59.2,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.402,x:-9.4,y:124.45,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.1924,x:-9.45,y:124.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-86.5241,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7666,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:42.4821,regX:-33,regY:13.3,x:48.05,y:-21.2}},{t:this.instance_13,p:{rotation:-49.6363,x:100.95,y:26.2,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:22.4048,x:150.3,y:-44.7,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:15.0276,x:152.65,y:-42.7,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5686,x:33.65,y:185.65,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3519,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7213,x:-41.45,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.933,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9695,x:24.8,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.86,x:1.75,y:-81.4,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.4193,x:-65.2,y:59.35,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.6101,x:-8.6,y:124.35,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.4015,x:-8.9,y:124.3}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-86.8393,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.764,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:45.7655,regX:-33,regY:13.3,x:48.05,y:-21.2}},{t:this.instance_13,p:{rotation:-43.0132,x:98.15,y:29.25,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:29.1273,x:155.35,y:-35.5,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:20.8115,x:157.4,y:-33.4,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.5859,x:33.75,y:185.65,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3572,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7141,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9374,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9794,x:24.75,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.8691,x:1.65,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.6271,x:-64.85,y:59.35,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.8176,x:-7.95,y:124.25,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-128.6089,x:-8.25,y:124.2}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-87.1534,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7614,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:49.0489,regX:-33,regY:13.3,x:48.05,y:-21.2}},{t:this.instance_13,p:{rotation:-36.3898,x:95.2,y:32,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:35.8492,x:159.45,y:-25.7,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:26.5929,x:161.2,y:-23.3,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.6031,x:33.65,y:185.7,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3616,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.7079,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9419,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.991,x:24.75,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.878,x:1.65,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.8348,x:-64.5,y:59.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.0255,x:-7.45,y:123.85,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.8165,x:-7.65,y:123.9}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-87.4685,x:-59.8,y:-12.5}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7587,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:52.3319,regX:-33,regY:13.3,x:48.05,y:-21.2}},{t:this.instance_13,p:{rotation:-29.7659,x:92.05,y:34.6,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.2}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:42.5707,x:162.6,y:-15.25,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:32.3776,x:164.15,y:-12.7,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.6206,x:33.8,y:185.65,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3673,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.6999,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9454,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.8868,x:1.6,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.0432,x:-64.05,y:59.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.2332,x:-6.8,y:123.8,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.025,x:-7.05,y:123.75}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-87.7835,x:-59.85,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7561,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:55.6134,regX:-33,regY:13.3,x:48.05,y:-21.15}},{t:this.instance_13,p:{rotation:-23.1431,x:88.85,y:37,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:49.2927,x:164.65,y:-4.35,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:38.1601,x:165.85,y:-1.65,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.6379,x:33.8,y:185.65,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3726,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.693,x:-41.4,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9489,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0107,x:24.75,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.8957,x:1.6,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.2529,x:-63.75,y:59.45,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.4419,x:-6.15,y:123.65,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.2325,x:-6.4,y:123.6}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.0984,x:-59.85,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7535,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:58.8963,regX:-33,regY:13.3,x:48.05,y:-21.3}},{t:this.instance_13,p:{rotation:-16.5184,x:85.5,y:39.25,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:56.0154,x:165.55,y:6.8,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:43.9434,x:166.35,y:9.75,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.6541,x:33.75,y:185.65,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3778,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.6876,x:-41.5,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9524,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0212,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.9055,x:1.6,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.4602,x:-63.4,y:59.45,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.6483,x:-5.55,y:123.35,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.4407,x:-5.75,y:123.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.4132,x:-59.8,y:-12.4}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7508,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:62.1793,regX:-33,regY:13.3,x:48.05,y:-21.2}},{t:this.instance_13,p:{rotation:-9.896,x:81.95,y:41.3,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:62.7365,x:165.2,y:18.3,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:49.727,x:165.7,y:21.3,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.6722,x:33.9,y:185.6,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3848,x:-4,y:-59.35}},{t:this.instance_8,p:{rotation:8.6804,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9569,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0309,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.9137,x:1.6,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.6687,x:-63,y:59.45,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.8583,x:-4.9,y:123.3,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.6494,x:-5.1,y:123.2}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.7289,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7482,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:65.4612,regX:-33,regY:13.3,x:48.1,y:-21.25}},{t:this.instance_13,p:{rotation:-3.2729,x:78.35,y:43.15,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:69.4578,x:163.7,y:29.8,regX:-7.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:55.509,x:163.9,y:32.9,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.6895,x:33.85,y:185.6,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3905,x:-4,y:-59.35}},{t:this.instance_8,p:{rotation:8.6741,x:-41.5,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9603,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0417,x:24.8,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.9227,x:1.6,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.8766,x:-62.65,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.0648,x:-4.25,y:123.1,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.8561,x:-4.5,y:123.05}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-89.0427,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7456,x:-10.25,y:49.05,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:68.7455,regX:-33,regY:13.3,x:48.05,y:-21.3}},{t:this.instance_13,p:{rotation:3.3467,x:74.65,y:44.85,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:76.1792,x:160.95,y:41.55,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:61.2933,x:160.75,y:44.45,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.7067,x:33.8,y:185.5,regX:3.3,regY:-50.5}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.395,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.667,x:-41.5,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9647,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0523,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.9316,x:1.6,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.0853,x:-62.2,y:59.4,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.2724,x:-3.65,y:122.9,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.0659,x:-3.9,y:122.8}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-89.3583,x:-59.9,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.743,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:72.028,regX:-33,regY:13.2,x:48.2,y:-21.25}},{t:this.instance_13,p:{rotation:9.9701,x:70.85,y:46.15,scaleX:0.9971,scaleY:0.9971,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:82.9014,x:157,y:53,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:67.0758,x:156.35,y:55.95,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.7232,x:33.8,y:185.5,regX:3.3,regY:-50.5}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.401,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.6599,x:-41.5,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9691,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0623,x:24.8,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.9406,x:1.6,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.2926,x:-61.9,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.4807,x:-2.95,y:122.75,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.2732,x:-3.25,y:122.6}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-89.673,x:-59.75,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7403,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:75.3111,regX:-33.1,regY:13.3,x:48.05,y:-21.35}},{t:this.instance_13,p:{rotation:16.5933,x:66.95,y:47.5,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:89.6238,x:151.75,y:63.95,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:72.8604,x:150.7,y:66.9,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.7404,x:33.95,y:185.55,regX:3.4,regY:-50.5}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4063,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.6538,x:-41.5,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9727,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0728,x:24.85,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.9497,x:1.55,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.5014,x:-61.45,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.6877,x:-2.2,y:122.5,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.481,x:-2.6,y:122.45}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-89.9877,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7377,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:78.5929,regX:-33,regY:13.3,x:48.1,y:-21.3}},{t:this.instance_13,p:{rotation:23.2166,x:62.95,y:48.45,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:96.341,x:145.3,y:74.6,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:78.6431,x:144.1,y:77.4,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.7577,x:34.05,y:185.65,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.412,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.6467,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.977,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0836,x:24.85,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.9586,x:1.55,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.7094,x:-61.15,y:59.45,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.8956,x:-1.7,y:122.3,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.6888,x:-2,y:122.2}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-90.2989,x:-59.7,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7351,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:81.8752,regX:-33.1,regY:13.3,x:48.05,y:-21.35}},{t:this.instance_13,p:{rotation:29.8401,x:59,y:49.2,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:103.0628,x:137.75,y:84.7,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:84.4257,x:136.2,y:87.4,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.775,x:33.9,y:185.65,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4173,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.6394,x:-41.5,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9806,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0933,x:24.85,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.9675,x:1.6,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-138.9175,x:-60.75,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.1038,x:-1.05,y:122.15,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.8977,x:-1.4,y:122}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-90.6145,x:-59.75,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7325,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:85.1592,regX:-33,regY:13.3,x:48.1,y:-21.3}},{t:this.instance_13,p:{rotation:36.4641,x:54.95,y:49.7,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:109.7846,x:129.15,y:94.1,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:90.2052,x:127.25,y:96.45,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.7922,x:34,y:185.6,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4242,x:-4,y:-59.35}},{t:this.instance_8,p:{rotation:8.6342,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.985,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1039,x:24.9,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.9771,x:1.65,y:-81.4,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.1258,x:-60.3,y:59.5,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.3111,x:-0.4,y:121.9,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-131.106,x:-0.75,y:121.8}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-90.9283,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7298,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:88.4414,regX:-33,regY:13.3,x:48.1,y:-21.2}},{t:this.instance_13,p:{rotation:43.087,x:50.9,y:50.1,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:116.5066,x:119.45,y:102.7,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:95.9894,x:117.3,y:104.95,regX:-10.1,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8095,x:34.1,y:185.6,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:11.4293,x:-4,y:-59.35}},{t:this.instance_8,p:{rotation:8.627,x:-41.55,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9885,x:-29.9,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.113,x:24.85,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.9854,x:1.6,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.3353,x:-59.95,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.5194,x:0.2,y:121.65,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-131.3136,x:-0.2,y:121.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.2431,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7272,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:91.72,regX:-33,regY:13.3,x:48.1,y:-21.2}},{t:this.instance_13,p:{rotation:49.7121,x:46.9,y:50.1,scaleX:0.9972,scaleY:0.9972,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:123.2275,x:108.95,y:110.3,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:101.772,x:106.45,y:112.1,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.827,x:34,y:185.6,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4343,x:-4,y:-59.35}},{t:this.instance_8,p:{rotation:8.6208,x:-41.5,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9929,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1237,x:24.85,y:88.2}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-11.9943,x:1.55,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.5417,x:-59.55,y:59.45,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.7274,x:0.8,y:121.45,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-131.5212,x:0.5,y:121.35}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.5579,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7254,x:-10.25,y:49.1,regY:-21.8}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:95.0026,regX:-33,regY:13.3,x:48.1,y:-21.2}},{t:this.instance_13,p:{rotation:56.3352,x:42.75,y:49.95,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:129.9515,x:97.5,y:116.8,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:107.5556,x:94.85,y:118.45,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8443,x:34.05,y:185.6,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4403,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.6137,x:-41.55,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9973,x:-29.95,y:90.35}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1344,x:24.85,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-12.0041,x:1.5,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.7513,x:-59.2,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.936,x:1.4,y:121.15,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-131.7292,x:1.1,y:121.15}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.8727,x:-59.85,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.722,x:-10.25,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:98.2851,regX:-33,regY:13.3,x:48.1,y:-21.15}},{t:this.instance_13,p:{rotation:62.9585,x:38.75,y:49.5,scaleX:0.9972,scaleY:0.9972,regY:12.7,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:136.6718,x:85.3,y:122.4,regX:-7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:113.3387,x:82.45,y:123.6,regX:-10.2,regY:10.8}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8615,x:34.15,y:185.65,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4457,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.6067,x:-41.55,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0008,x:-29.95,y:90.35}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1442,x:24.9,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-12.0118,x:1.5,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-139.9586,x:-58.85,y:59.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.1428,x:2.25,y:121.05,regX:4.4,regY:-9}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-131.9379,x:1.65,y:120.85}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.1875,x:-59.9,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7194,x:-10.25,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:101.5671,regX:-33,regY:13.3,x:48.1,y:-21.2}},{t:this.instance_13,p:{rotation:69.5812,x:34.65,y:48.9,scaleX:0.9971,scaleY:0.9971,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:143.394,x:72.65,y:126.65,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:119.1219,x:69.7,y:127.5,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8786,x:34.25,y:185.6,regX:3.4,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4512,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.6005,x:-41.55,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0053,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1549,x:24.9,y:88.25}},{t:this.instance_5,p:{y:-33.5}},{t:this.instance_4,p:{regY:50.4,rotation:-12.021,x:1.5,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-140.167,x:-58.45,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.35,x:2.75,y:120.85,regX:4.4,regY:-9.1}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-132.1454,x:2.3,y:120.6}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.5034,x:-59.8,y:-12.35}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.25,y:49,regY:-21.9}},{t:this.instance_14,p:{scaleX:0.9974,scaleY:0.9974,rotation:104.8505,regX:-33,regY:13.2,x:48.2,y:-21.15}},{t:this.instance_13,p:{rotation:76.2045,x:30.65,y:48.1,scaleX:0.9972,scaleY:0.9972,regY:12.8,regX:-45.1}},{t:this.instance_12,p:{scaleX:0.9971,scaleY:0.9971,rotation:150.1157,x:59.45,y:129.6,regX:-7.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:124.9037,x:56.4,y:130.15,regX:-10.2,regY:10.7}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8959,x:34.1,y:185.6,regX:3.3,regY:-50.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.95,y:-59.35}},{t:this.instance_8,p:{rotation:8.5932,x:-41.55,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,x:-29.95,y:90.3}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.9,y:88.25}},{t:this.instance_5,p:{y:-33.45}},{t:this.instance_4,p:{regY:50.4,rotation:-12.0297,x:1.55,y:-81.4,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-140.3744,x:-58.15,y:59.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.5568,x:3.25,y:120.55,regX:4.5,regY:-9.1}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-132.354,x:2.95,y:120.55}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.8175,x:-59.9,y:-12.2}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-98.4,-212.2,298,509.3);


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
	this.instance = new lib.ch1_uArm_rcopy2_1("synched",0);
	this.instance.setTransform(20.25,-4.4,0.4406,0.4406,0,92.644,-87.356,33.5,9.2);

	this.instance_1 = new lib.ch1_hand_rcopy2_1("synched",0);
	this.instance_1.setTransform(-7.4,54.4,0.4404,0.4404,0,132.2024,-47.7976,14.2,-0.5);

	this.instance_2 = new lib.ch1_thumb_rcopy2_1("synched",0);
	this.instance_2.setTransform(-7.55,54.45,0.4405,0.4405,0,102.4134,-77.5866,4.3,-9.1);

	this.instance_3 = new lib.ch1_lArm_rcopy2_1("synched",0);
	this.instance_3.setTransform(19.6,27.35,0.4405,0.4405,0,140.2183,-39.7817,44.6,7.5);

	this.instance_4 = new lib.ch1_headcopy3("synched",0);
	this.instance_4.setTransform(-6.85,-34.95,0.4408,0.4408,0,11.8537,-168.1463,2.1,50.2);

	this.instance_5 = new lib.ch1_uBodycopy2_1("synched",0);
	this.instance_5.setTransform(-3,-14.85,0.4417,0.4417,0,0,180,0,-39.6);

	this.instance_6 = new lib.ch1_uLeg_lcopy2_1("synched",0);
	this.instance_6.setTransform(-17.2,40.2,0.4393,0.4393,0,8.9643,-171.0357,0.8,4.9);

	this.instance_7 = new lib.ch1_uLeg_rcopy2_1("synched",0);
	this.instance_7.setTransform(7.05,41,0.4397,0.4397,0,-3.9282,176.0718,1.2,-42.1);

	this.instance_8 = new lib.ch1_lLeg_rcopy2_1("synched",0);
	this.instance_8.setTransform(12.15,83.05,0.4395,0.4395,0,-8.731,171.269,1.2,-51.2);

	this.instance_9 = new lib.ch1_neckcopy2_1("synched",0);
	this.instance_9.setTransform(-4.4,-25.15,0.4408,0.4408,0,-11.3484,168.6516,-1.3,7.3);

	this.instance_10 = new lib.ch1_lLeg_lcopy2_1("synched",0);
	this.instance_10.setTransform(-21.25,83.05,0.4394,0.4394,0,14.5546,-165.4454,3.5,-50.4);

	this.instance_11 = new lib.ch1_hand_lcopy2_1("synched",0);
	this.instance_11.setTransform(-31.25,58.55,0.4404,0.4404,0,-124.9989,55.0011,-10.1,10.7);

	this.instance_12 = new lib.ch1_thumb_lcopy2_1("synched",0);
	this.instance_12.setTransform(-32.55,58.25,0.4405,0.4405,0,-150.195,29.805,-7,13.2);

	this.instance_13 = new lib.ch1_lArm_lcopy2_1("synched",0);
	this.instance_13.setTransform(-19.75,22.25,0.4405,0.4405,0,-75.9999,104.0001,-45.1,12.8);

	this.instance_14 = new lib.ch1_uArm_lcopy2_1("synched",0);
	this.instance_14.setTransform(-27.55,-8.25,0.4406,0.4406,0,-104.8938,75.1062,-32.9,13.2);

	this.instance_15 = new lib.ch1_lBodycopy2_1("synched",0);
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

	this.instance_4 = new lib.ch1_headcopy_1("synched",0);
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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15,p:{regX:-4.9,scaleX:0.9994,scaleY:0.9994,rotation:1.7753,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9975,scaleY:0.9975,rotation:104.8947,x:48.2,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:75.9986,x:30.55,y:48.1,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9972,scaleY:0.9972,rotation:150.1937,x:59.7,y:129.55}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:124.9995,x:56.7,y:130.1,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9947,scaleY:0.9947,rotation:-14.5568,x:33.9,y:185.75,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:11.3493,x:-4.05,y:-59.4,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:8.7322,x:-41.5,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9954,scaleY:0.9954,rotation:3.931,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9646,x:24.9,y:88.35}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-11.8556,y:-81.45,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-140.2196,x:-58.4,y:59.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:-102.4158,x:3,y:120.8,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9969,scaleY:0.9969,rotation:-132.2022,x:2.55,y:120.6,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.5,rotation:-92.6463,y:-12.4,x:-59.7,scaleX:0.9974,scaleY:0.9974}}]}).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7718,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.4446,x:48.05,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:74.8345,x:32.4,y:48.45,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:146.4199,x:62.95,y:129.3}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:121.9198,x:60.2,y:130,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.6406,x:33.95,y:185.7,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3548,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:8.4234,x:-41.45,y:185.35,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9348,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.975,x:24.85,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-11.5635,y:-81.4,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-138.1492,x:-60.5,y:59.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.3417,x:-1.45,y:123,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-130.1307,x:-1.75,y:122.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-90.9669,y:-12.3,x:-59.7,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7692,x:-10.2,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:101.9943,x:48.05,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:73.6693,x:34.1,y:48.85,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:142.647,x:66.5,y:128.95}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:118.8374,x:63.6,y:130,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-12.7233,x:33.95,y:185.75,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3592,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:8.1137,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9392,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-8.9855,x:24.85,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-11.2725,y:-81.3,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-136.0757,x:-62.5,y:59.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-98.269,x:-5.9,y:125,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-128.0561,x:-6.15,y:124.8,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-89.2908,y:-12.35,x:-59.75,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7657,x:-10.15,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:100.5446,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:72.5044,x:35.85,y:49.05,regX:-45.2,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.997,scaleY:0.997,rotation:138.8731,x:69.9,y:128.6}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:115.7576,x:67.05,y:129.8,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-11.8068,x:33.95,y:185.7,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3653,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.8046,x:-41.45,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9436,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-8.9955,x:24.85,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-10.9786,y:-81.3,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-134.0024,x:-64.65,y:59.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-96.1955,x:-10.15,y:126.9,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-125.9856,x:-10.5,y:126.8,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-87.6124,y:-12.35,x:-59.7,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.764,x:-10.15,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:99.0944,x:48.05,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:71.3385,x:37.65,y:49.45,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:135.0992,x:73.2,y:128.25}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:112.6762,x:70.55,y:129.55,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-10.8886,x:33.9,y:185.6,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3706,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.4964,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9471,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0062,x:24.85,y:88.3}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-10.6867,y:-81.45,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-131.9303,x:-66.8,y:59.25,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-94.1223,x:-14.85,y:128.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-123.9114,x:-15.15,y:128.45,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-85.931,y:-12.45,x:-59.65,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7596,x:-10.15,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:97.6449,x:48.1,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:70.1731,x:39.55,y:49.65,regX:-45.1,regY:12.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7,scaleX:0.997,scaleY:0.997,rotation:131.3257,x:76.55,y:127.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:109.5947,x:74.05,y:129.25,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.9724,x:34,y:185.65,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3771,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.1879,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9506,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0169,x:24.8,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-10.3944,y:-81.45,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-129.8572,x:-68.85,y:59,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9973,rotation:-92.0484,x:-19.4,y:130.05,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-121.8388,x:-19.75,y:130,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-84.2523,y:-12.4,x:-59.65,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.757,x:-10.1,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:96.196,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:69.0068,x:41.3,y:49.8,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:127.5512,x:79.95,y:127.15}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:106.5138,x:77.55,y:128.8,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.0545,x:34,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3831,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.8789,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9551,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0283,x:24.8,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-10.1017,y:-81.4,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-127.7842,x:-70.95,y:58.7,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-89.9798,x:-24.2,y:131.6,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-119.7665,x:-24.6,y:131.5,regY:-0.5}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-82.5712,y:-12.45,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7535,x:-10.1,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:94.7457,x:48.2,y:-21.3,regY:13.2}},{t:this.instance_13,p:{rotation:67.843,x:43.1,y:49.95,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:123.7774,x:83.4,y:126.4}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:103.4327,x:80.95,y:128.35,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-8.1381,x:33.95,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3893,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.5691,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9594,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9944,scaleY:0.9944,rotation:-9.0383,x:24.85,y:88.25}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.8099,y:-81.25,x:1.55,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-125.7113,x:-73.1,y:58.25,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-87.9068,x:-29,y:132.7,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-117.6932,x:-29.15,y:132.8,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-80.8926,y:-12.4,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7508,x:-10.05,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:93.2967,x:48.1,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:66.6774,x:44.85,y:50.05,regX:-45.1,regY:12.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:120.003,x:86.8,y:125.55}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:100.3514,x:84.45,y:127.9,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.2209,x:34,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3941,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.2598,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.963,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0488,x:24.8,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.5175,y:-81.25,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-123.639,x:-75.05,y:57.85,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-85.8337,x:-33.8,y:133.95,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-115.6213,x:-34,y:133.75,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-79.213,y:-12.3,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7474,x:-10.05,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:91.8454,x:48.05,y:-21.4,regY:13.3}},{t:this.instance_13,p:{rotation:65.5112,x:46.75,y:50.05,regX:-45.1,regY:12.7,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:116.2294,x:90.1,y:124.85}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.997,rotation:97.2703,x:88,y:127.1,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-6.3037,x:34,y:185.65,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3994,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:5.9521,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9674,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0595,x:24.8,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.2252,y:-81.25,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-121.566,x:-77.15,y:57.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-83.7595,x:-38.45,y:134.9,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-113.5473,x:-38.8,y:134.7,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-77.5334,y:-12.35,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7447,x:-10.05,y:49.05,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:90.3953,x:48.15,y:-21.3,regY:13.2}},{t:this.instance_13,p:{rotation:64.347,x:48.5,y:50.15,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:112.4563,x:93.45,y:123.8}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:94.189,x:91.4,y:126.35,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-5.3865,x:33.95,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4055,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.643,x:-41.35,y:185.35,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9718,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0702,x:24.8,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.9325,y:-81.2,x:1.6,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-119.493,x:-79.15,y:56.85,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-81.6866,x:-43.5,y:135.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-111.4739,x:-43.65,y:135.45,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-75.8526,y:-12.4,x:-59.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7412,x:-10,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:88.9507,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:63.1809,x:50.25,y:50.05,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:108.6823,x:96.65,y:123}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:91.1084,x:94.9,y:125.55,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-4.4698,x:34,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4108,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:5.3348,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9762,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0818,x:24.75,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.6399,y:-81.2,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-117.4207,x:-81.15,y:56.15,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-79.6127,x:-48.4,y:136.25,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-109.4007,x:-48.6,y:136.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-74.1725,y:-12.35,x:-59.55,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7386,x:-10,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:87.5002,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:62.0154,x:52.05,y:49.9,regX:-45.2,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:104.908,x:99.95,y:121.9}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:88.0319,x:98.3,y:124.55,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-3.5526,x:34.05,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4173,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:5.0251,x:-41.3,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9797,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.0916,x:24.75,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.3485,y:-81.15,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-115.3475,x:-83.15,y:55.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.5394,x:-53.3,y:136.75,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-107.328,x:-53.6,y:136.5,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-72.4934,y:-12.4,x:-59.5,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7351,x:-9.95,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:86.0507,x:48.05,y:-21.45,regY:13.3}},{t:this.instance_13,p:{rotation:60.8513,x:53.85,y:49.8,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:101.1347,x:103.2,y:120.85}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:84.9497,x:101.6,y:123.5,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-2.6353,x:34.05,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4233,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.7165,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9841,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1022,x:24.8,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.0555,y:-81.1,x:1.6,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-113.275,x:-85.15,y:54.8,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-75.4664,x:-58.3,y:136.95,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-105.2546,x:-58.55,y:136.8,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-70.8138,y:-12.4,x:-59.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7325,x:-9.95,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:84.5995,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:59.6854,x:55.65,y:49.7,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:97.3601,x:106.4,y:119.6}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:81.8704,x:105.2,y:122.45,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-1.7187,x:34,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:11.4285,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.4079,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9885,y:90.4,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1121,x:24.75,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-7.7626,y:-81.05,x:1.7,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-111.2022,x:-87.1,y:54.05,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.393,x:-63.25,y:137.1,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-103.1817,x:-63.35,y:136.9,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-69.1349,y:-12.45,x:-59.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7289,x:-9.95,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:83.1502,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:58.5202,x:57.4,y:49.45,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:93.5877,x:109.6,y:118.5}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:78.7886,x:108.55,y:121.25,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-0.8017,x:34.1,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4343,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.0986,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9921,y:90.4,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1225,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-7.471,y:-81.2,x:1.75,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-109.1303,x:-89.05,y:53.2,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-71.3202,x:-68.15,y:137.05,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-101.109,x:-68.3,y:136.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-67.4545,y:-12.4,x:-59.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7263,x:-9.9,y:49.1,regY:-21.8}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:81.6991,x:48.05,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:57.3537,x:59.25,y:49.25,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:89.8176,x:112.85,y:117.05}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:75.7083,x:111.9,y:120,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:0.1116,x:34.1,y:185.35,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4397,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:3.7894,x:-41.3,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:3.9965,y:90.4,x:-29.9}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1334,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-7.1777,y:-81.05,x:1.8,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-107.0574,x:-90.9,y:52.3,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-69.2458,x:-73.2,y:136.8,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-99.036,x:-73.25,y:136.55,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-65.7741,y:-12.35,x:-59.3,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7237,x:-9.9,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:80.2516,x:48.1,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:56.1888,x:61,y:48.9,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:86.0432,x:115.9,y:115.6}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:72.6271,x:115.25,y:118.6,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:1.0276,x:34.05,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4457,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:3.4804,x:-41.3,y:185.3,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0008,y:90.4,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1442,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.8856,y:-81.05,x:1.65,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-104.9841,x:-92.85,y:51.25,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-67.1734,x:-78.1,y:136.4,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-96.9634,x:-78.25,y:136.25,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-64.0943,y:-12.4,x:-59.35,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7202,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:78.8013,x:48.05,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:55.0237,x:62.75,y:48.45,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:82.2701,x:119.05,y:114.1}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:69.5451,x:118.6,y:117.15,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:1.9456,x:34.05,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4512,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:3.1722,x:-41.3,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0053,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1549,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.5936,y:-81,x:1.6,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.9125,x:-94.5,y:50.25,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-65.0996,x:-83.05,y:135.85,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-94.8903,x:-83.1,y:135.7,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-62.4149,y:-12.45,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:77.3519,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:53.858,x:64.55,y:48.15,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:78.4952,x:122.15,y:112.5}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:66.4634,x:121.85,y:115.7,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:2.8624,x:34.05,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:2.8634,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.7,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-100.8383,x:-96.45,y:49.15,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-63.0268,x:-88,y:135.15,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-92.8173,x:-88,y:134.8,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-60.7353,y:-12.4,x:-59.3,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:79.0129,x:48.1,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:55.5772,x:62.45,y:48.55,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:79.7862,x:118.15,y:114.8}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:66.8082,x:117.8,y:117.75,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:2.2324,x:34.05,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:3.1494,x:-41.35,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.1284,x:-95.15,y:49.9,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-65.1475,x:-84.7,y:135.7,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-94.335,x:-84.8,y:135.65,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-61.9663,y:-12.45,x:-59.2,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:80.6747,x:47.95,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:57.2963,x:60.55,y:48.85,regX:-45.1,regY:12.7,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:81.0748,x:114.1,y:116.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:67.152,x:113.6,y:119.85,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:1.6017,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:3.4363,x:-41.35,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-103.4168,x:-93.85,y:50.7,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-67.2665,x:-81.3,y:136.1,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9969,scaleY:0.9969,rotation:-95.8539,x:-81.55,y:136.05,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-63.199,y:-12.45,x:-59.3,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:82.3364,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:59.0155,x:58.4,y:49.3,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:82.3639,x:110,y:118.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:67.4956,x:109.55,y:121.8,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:0.9722,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:3.7225,x:-41.35,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-104.7067,x:-92.35,y:51.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-69.3868,x:-78.1,y:136.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-97.3727,x:-78.25,y:136.5,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-64.4303,y:-12.55,x:-59.3,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:83.9978,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:60.7347,x:56.3,y:49.55,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:83.6528,x:105.8,y:120.4}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:67.84,x:105.3,y:123.45,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:0.3411,x:34.15,y:185.3,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.0088,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-105.9957,x:-91.05,y:52.15,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-71.5079,x:-74.8,y:137,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-98.8912,x:-74.95,y:136.75,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-65.6633,y:-12.45,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:85.6596,x:47.95,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:62.4527,x:54.3,y:49.8,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:84.942,x:101.65,y:122.05}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:68.1826,x:101,y:125.1,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-0.2848,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.2961,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-107.2845,x:-89.65,y:52.9,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.6262,x:-71.5,y:137.35,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-100.4091,x:-71.65,y:137.15,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.4,rotation:-66.8951,y:-12.45,x:-59.25,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:87.3212,x:47.95,y:-21.5,regY:13.3}},{t:this.instance_13,p:{rotation:64.1729,x:52.2,y:49.9,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:86.2322,x:97.35,y:123.6}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:68.527,x:96.75,y:126.7,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-0.9142,x:34.1,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.5823,x:-41.3,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-108.5736,x:-88.3,y:53.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-75.7479,x:-68.2,y:137.5,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-101.9281,x:-68.35,y:137.35,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-68.1268,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:88.9823,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:65.8911,x:50.15,y:50,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:87.5213,x:93.1,y:125.05}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:68.8701,x:92.35,y:128,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-1.5455,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.8681,x:-41.3,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-109.8641,x:-86.85,y:54,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.8661,x:-64.9,y:137.7,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-103.4464,x:-65.15,y:137.6,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-69.3591,y:-12.35,x:-59.25,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:90.6408,x:47.95,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:67.6099,x:48.05,y:50.05,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:88.8101,x:88.75,y:126.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:69.2144,x:88,y:129.45,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-2.1752,x:34.1,y:185.35,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.1549,x:-41.3,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-111.1526,x:-85.4,y:54.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-79.9869,x:-61.65,y:137.75,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-104.9648,x:-61.8,y:137.65,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-70.5904,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:92.3023,x:48,y:-21.45,regY:13.3}},{t:this.instance_13,p:{rotation:69.3292,x:46,y:50,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:90.0947,x:84.35,y:127.5}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:69.5582,x:83.45,y:130.5,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-2.8051,x:34.2,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:5.4417,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-112.4421,x:-84,y:55.25,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-82.1065,x:-58.25,y:137.75,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-106.4828,x:-58.5,y:137.65,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-71.8223,y:-12.4,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9975,scaleY:0.9975,rotation:93.9633,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:71.0482,x:43.95,y:49.9,regX:-45.1,regY:12.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:91.3846,x:79.95,y:128.5}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:69.9019,x:79,y:131.45,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-3.4364,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.7277,x:-41.4,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-113.7309,x:-82.55,y:55.75,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-84.2276,x:-54.95,y:137.7,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-108.0017,x:-55.2,y:137.5,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-73.0541,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:95.6249,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:72.7673,x:41.85,y:49.8,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:92.6744,x:75.5,y:129.55}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:70.2461,x:74.45,y:132.35,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-4.0671,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.0148,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-115.0208,x:-81,y:56.2,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-86.3469,x:-51.6,y:137.4,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-109.52,x:-51.95,y:137.4,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-74.2865,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:97.2861,x:48.05,y:-21.25,regY:13.2}},{t:this.instance_13,p:{rotation:74.4861,x:39.75,y:49.55,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:93.9629,x:71.05,y:130.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:70.5895,x:69.95,y:133.1,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-4.6966,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.9,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.3021,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-116.3094,x:-79.5,y:56.55,regX:44.6,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-88.4673,x:-48.35,y:137.3,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-111.0385,x:-48.55,y:137.25,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-75.5188,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:98.9487,x:48.1,y:-21.25,regY:13.2}},{t:this.instance_13,p:{rotation:76.2045,x:37.75,y:49.35,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:95.2517,x:66.6,y:130.8}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:70.9339,x:65.45,y:133.7,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-5.3274,x:34.1,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.5877,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-117.5991,x:-78.05,y:57.1,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-90.5839,x:-45,y:137.1,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-112.5575,x:-45.2,y:136.95,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-76.75,y:-12.3,x:-59.35,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:100.6106,x:47.95,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:77.9239,x:35.6,y:48.95,regX:-45.2,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:96.5421,x:62,y:131.35}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:71.2781,x:60.85,y:134.1,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-5.9572,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.8744,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-118.8885,x:-76.6,y:57.45,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-92.703,x:-41.75,y:136.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-114.0759,x:-41.95,y:136.6,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-77.9818,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:102.2714,x:48,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:79.6415,x:33.6,y:48.65,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:97.8308,x:57.5,y:131.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:71.6219,x:56.35,y:134.5,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-6.5877,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.1606,x:-41.45,y:185.45,scaleX:0.9948,scaleY:0.9948}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-120.1791,x:-75.15,y:57.8,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-94.8224,x:-38.45,y:136.3,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-115.5946,x:-38.65,y:136.15,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-79.2139,y:-12.35,x:-59.4,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.9336,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:81.361,x:31.75,y:48.2,regX:-45.1,regY:12.7,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:99.1205,x:52.95,y:131.95}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:71.9655,x:51.55,y:134.8,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.2182,x:34.2,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.4466,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-121.4669,x:-73.6,y:58.15,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-96.9431,x:-35.25,y:135.8,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-117.1126,x:-35.4,y:135.65,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-80.4459,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:105.5941,x:48.05,y:-21.2,regY:13.3}},{t:this.instance_13,p:{rotation:83.0804,x:29.75,y:47.75,regX:-45.1,regY:12.7,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:100.4088,x:48.55,y:132}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:72.3093,x:47.05,y:134.8,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.8485,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.7339,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-122.7555,x:-72.1,y:58.4,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.0628,x:-31.9,y:135.05,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-118.6306,x:-32.25,y:135.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-81.6774,y:-12.35,x:-59.25,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:107.256,x:48.15,y:-21.3,regY:13.2}},{t:this.instance_13,p:{rotation:84.7989,x:27.6,y:47.15,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:101.6974,x:43.95,y:131.95}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:72.6518,x:42.5,y:134.85,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-8.4783,x:34.2,y:185.35,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:8.0204,x:-41.4,y:185.35,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-124.0453,x:-70.6,y:58.7,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-101.1832,x:-28.7,y:134.5,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-120.1497,x:-28.9,y:134.45,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-82.9089,y:-12.35,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:108.9187,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:86.5188,x:25.6,y:46.45,regX:-45.2,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:102.9873,x:39.45,y:131.8}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:72.9952,x:37.9,y:134.5,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.1087,x:34.15,y:185.35,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:8.3063,x:-41.35,y:185.35,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-125.3341,x:-69.05,y:58.9,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-103.3033,x:-25.45,y:133.8,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-121.6665,x:-25.75,y:133.8,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-84.1403,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:110.5789,x:48.05,y:-21.2,regY:13.2}},{t:this.instance_13,p:{rotation:88.2374,x:23.65,y:45.85,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:104.2774,x:34.9,y:131.5}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:73.34,x:33.35,y:134.15,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.7388,x:34.2,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:8.5932,x:-41.45,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3009,y:-81.05,x:1.65,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-126.6228,x:-67.55,y:59.15,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-105.423,x:-22.25,y:133,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-123.1851,x:-22.5,y:132.95,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-85.3728,y:-12.35,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:108.9187,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:87.0335,x:25.6,y:46.6,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:102.5862,x:38.6,y:132.05}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.997,rotation:72.4508,x:37.15,y:134.6,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.0233,x:34.25,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3994,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:8.1633,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.329,y:-81.05,x:1.7,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-124.3892,x:-68.95,y:59,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.3579,x:-26.5,y:134.55,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-120.7213,x:-26.8,y:134.45,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-84.2557,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:107.256,x:48.15,y:-21.3,regY:13.2}},{t:this.instance_13,p:{rotation:85.8309,x:27.6,y:47.15,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:100.8962,x:42.45,y:132.25}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:71.5628,x:41,y:134.95,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-8.3066,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3446,x:-4.05,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.7339,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3581,y:-81.05,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-122.154,x:-70.3,y:58.7,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.2918,x:-30.9,y:135.9,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-118.2582,x:-31.15,y:135.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-83.1384,y:-12.35,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:105.5941,x:48.05,y:-21.2,regY:13.3}},{t:this.instance_13,p:{rotation:84.6272,x:29.6,y:47.75,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:99.2052,x:46.2,y:132.5}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:70.676,x:44.85,y:135.3,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.5903,x:34.2,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:11.2864,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:7.3039,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.3871,y:-81,x:1.7,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-119.9191,x:-71.7,y:58.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-96.2264,x:-35.4,y:137.2,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-115.7947,x:-35.55,y:137,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-82.021,y:-12.35,x:-59.35,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.9336,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:83.4231,x:31.55,y:48.15,regX:-45.2,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:97.5149,x:50,y:132.75}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:69.787,x:48.8,y:135.45,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-6.8745,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.2295,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:6.8744,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.4155,y:-81,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-117.685,x:-73.15,y:58.25,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-93.1613,x:-39.8,y:138.2,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-113.3306,x:-40.1,y:138.1,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-80.9043,y:-12.5,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:102.2714,x:48,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:82.2193,x:33.6,y:48.75,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:95.8244,x:53.75,y:132.65}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:68.8996,x:52.65,y:135.55,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-6.1578,x:34,y:185.45,regY:-50.4,regX:3.3}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.1715,x:-4.15,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:6.4434,x:-41.35,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-6.4446,y:-81.15,x:1.6,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-115.4506,x:-74.45,y:58,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-90.0956,x:-44.2,y:139,regY:-9,regX:4.5}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-110.8675,x:-44.5,y:139.2,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.4,rotation:-79.7864,y:-12.45,x:-59.25,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:100.6106,x:47.95,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:81.0178,x:35.7,y:49.05,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:94.1343,x:57.55,y:132.6}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:68.0107,x:56.45,y:135.5,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-5.4413,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.1144,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.0148,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-6.4726,y:-81.15,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-113.2149,x:-75.85,y:57.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-87.0354,x:-48.75,y:139.95,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-108.4022,x:-49.15,y:139.95,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-78.6693,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:98.9487,x:48.1,y:-21.25,regY:13.2}},{t:this.instance_13,p:{rotation:79.8145,x:37.75,y:49.4,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:92.4435,x:61.35,y:132.65}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:67.1237,x:60.35,y:135.45,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-4.7255,x:34.05,y:185.5,regY:-50.4,regX:3.3}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.0581,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.5847,x:-41.4,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.5018,y:-81.05,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-110.9805,x:-77.15,y:57.25,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-83.9692,x:-53.45,y:140.6,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-105.9391,x:-53.7,y:140.45,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-77.553,y:-12.4,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.8,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:97.2861,x:48.05,y:-21.25,regY:13.2}},{t:this.instance_13,p:{rotation:78.6115,x:39.75,y:49.6,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:90.7541,x:65.15,y:132.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:66.2348,x:64.25,y:135.15,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-4.0089,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.9993,x:-4.05,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.1549,x:-41.35,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.5301,y:-81.05,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-108.7469,x:-78.5,y:57,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-80.9036,x:-58.1,y:140.9,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-103.4744,x:-58.3,y:140.9,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-76.4349,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:95.6249,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:77.4076,x:41.9,y:49.65,regX:-45.2,regY:12.7,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:89.0688,x:69,y:131.75}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:65.347,x:68.1,y:134.85,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-3.2928,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.9421,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.7252,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.5592,y:-81.05,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-106.511,x:-79.85,y:56.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-77.8383,x:-62.75,y:141.35,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-101.0106,x:-62.95,y:141.2,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-75.3166,y:-12.35,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9975,scaleY:0.9975,rotation:93.9633,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:76.2045,x:43.9,y:49.95,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:87.3774,x:72.75,y:131.45}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:64.4589,x:72,y:134.4,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-2.5773,x:34.2,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.8864,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:4.2961,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.5883,y:-81.05,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-104.2774,x:-81.2,y:56.15,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-74.7733,x:-67.4,y:141.5,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-98.5471,x:-67.6,y:141.4,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-74.201,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:92.3023,x:48,y:-21.45,regY:13.3}},{t:this.instance_13,p:{rotation:75.0023,x:45.95,y:50,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:85.688,x:76.5,y:130.9}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:63.571,x:75.8,y:133.9,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-1.8603,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.8277,x:-4.15,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:3.8661,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.6181,y:-81.05,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.0414,x:-82.5,y:55.75,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-71.7084,x:-71.95,y:141.6,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-96.0833,x:-72.25,y:141.5,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-73.0837,y:-12.35,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:90.6408,x:47.95,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:73.7987,x:48.05,y:50.05,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:83.9968,x:80.25,y:130.25}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:62.6828,x:79.7,y:133.3,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-1.1446,x:34.1,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.7706,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.5,rotation:3.4363,x:-41.4,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.6455,y:-81.05,x:1.35,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-99.8073,x:-83.8,y:55.3,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-68.6419,x:-76.7,y:141.3,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-93.6194,x:-76.95,y:141.25,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-71.9662,y:-12.4,x:-59.3,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:88.9823,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:72.5954,x:50.1,y:50,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:82.3073,x:84,y:129.55}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:61.7947,x:83.45,y:132.65,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-0.4281,x:34.2,y:185.4,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.7137,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:3.0068,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.6739,y:-81.05,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-97.5719,x:-85.15,y:54.7,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-65.5762,x:-81.45,y:141.1,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-91.1552,x:-81.6,y:140.95,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-70.8487,y:-12.35,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:87.3212,x:47.95,y:-21.5,regY:13.3}},{t:this.instance_13,p:{rotation:71.3923,x:52.15,y:49.95,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:80.6164,x:87.75,y:128.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:60.9052,x:87.45,y:131.9,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:0.2839,x:34.1,y:185.3,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.6567,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:2.5774,x:-41.35,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.703,y:-81.05,x:1.3,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-95.3376,x:-86.4,y:54.2,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-62.5112,x:-86,y:140.7,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9969,rotation:-88.6966,x:-86.25,y:140.5,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-69.731,y:-12.4,x:-59.35,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:85.6596,x:47.95,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:70.1889,x:54.2,y:49.8,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:78.9262,x:91.5,y:127.8}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:60.0184,x:91.2,y:131,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:0.9995,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.5988,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:2.1473,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.7302,y:-81.1,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-93.1044,x:-87.7,y:53.7,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-59.4454,x:-90.7,y:140,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-86.2321,x:-90.9,y:139.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-68.6132,y:-12.35,x:-59.3,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:83.9978,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:68.986,x:56.35,y:49.5,regX:-45.2,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:77.2367,x:95.15,y:126.8}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:59.1302,x:94.95,y:129.85,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:1.7161,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.5409,x:-4.05,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:1.7174,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.7593,y:-81.1,x:1.3,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-90.8698,x:-88.8,y:53.1,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-56.3797,x:-95.35,y:139.3,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-83.7685,x:-95.6,y:139.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-67.4954,y:-12.4,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:82.3364,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:67.7824,x:58.5,y:49.25,regX:-45.1,regY:12.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:75.5452,x:98.85,y:125.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:58.242,x:98.7,y:128.75,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:2.433,x:34.15,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.4838,x:-4.1,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:1.2866,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.3,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.7876,y:-81.1,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-88.6383,x:-90.2,y:52.6,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-53.314,x:-100.15,y:138.35,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-81.3049,x:-100.3,y:138.1,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-66.3791,y:-12.4,x:-59.3,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:80.6747,x:47.95,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:66.5792,x:60.45,y:48.95,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:73.8562,x:102.45,y:124.45}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:57.3538,x:102.4,y:127.65,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:3.1484,x:34.1,y:185.45,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.4275,x:-4.05,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.5,rotation:0.8586,x:-41.35,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.8168,y:-81.1,x:1.25,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-86.4038,x:-91.45,y:51.8,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-50.249,x:-104.75,y:137.3,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-78.8407,x:-104.75,y:136.95,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-65.2609,y:-12.45,x:-59.35,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:79.0129,x:48.1,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:65.3759,x:62.45,y:48.55,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:72.1648,x:106.05,y:123.2}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:56.4653,x:106.15,y:126.25,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:3.8662,x:34.05,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.3696,x:-4.05,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:0.428,x:-41.3,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.845,y:-81.1,x:1.35,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-84.1699,x:-92.75,y:51.25,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-47.1827,x:-109.2,y:136.1,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-76.3758,x:-109.3,y:135.8,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-64.1438,y:-12.4,x:-59.35,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:77.3519,x:48,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:64.1729,x:64.5,y:48.1,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:70.4742,x:109.65,y:121.9}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:55.5771,x:109.9,y:125,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:4.5818,x:33.95,y:185.45,regY:-50.4,regX:3.3}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.3117,x:-4.05,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:0,x:-41.35,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.05}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-6.8741,y:-81.1,x:1.2,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-81.9351,x:-93.95,y:50.45,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-44.1178,x:-113.75,y:134.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-73.9129,x:-113.8,y:134.5,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-63.0276,y:-12.4,x:-59.25,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.85,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:78.7263,x:48.05,y:-21.35,regY:13.3}},{t:this.instance_13,p:{rotation:64.7741,x:62.8,y:48.45,regX:-45.2,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:74.4566,x:107.25,y:122.8}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:59.0441,x:107.1,y:125.8,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:3.6072,x:34.05,y:185.35,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.3696,x:-4.05,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:0.428,x:-41.35,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-7.1319,y:-81.15,x:1.4,scaleX:0.9978,scaleY:0.9978,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-84.8578,x:-92.35,y:51.35,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-47.04,x:-107.85,y:136.45,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-76.8357,x:-107.95,y:136.2,regY:-0.5}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-64.5166,y:-12.45,x:-59.35,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.9,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:80.1012,x:48.1,y:-21.35,regY:13.2}},{t:this.instance_13,p:{rotation:65.3759,x:61.15,y:48.8,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:78.4388,x:104.75,y:123.45}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:62.511,x:104.5,y:126.6,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:2.6335,x:34.1,y:185.4,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.4275,x:-4.05,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.5,rotation:0.8586,x:-41.35,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.3,rotation:-7.3897,y:-81.2,x:1.25,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-87.7795,x:-90.75,y:52.3,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-49.9626,x:-101.8,y:138,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-79.7576,x:-101.85,y:137.85,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-66.0071,y:-12.4,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.9,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:81.4767,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:65.9774,x:59.5,y:49.15,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:82.4215,x:102.3,y:124.35}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:65.9773,x:101.75,y:127.25,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:1.6589,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.4838,x:-4.1,y:-59.4,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:1.2866,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-7.6479,y:-81.15,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.2}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-90.6962,x:-88.95,y:53.2,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-52.8844,x:-95.7,y:139.25,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-82.6786,x:-95.8,y:139.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-67.4954,y:-12.4,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.9,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:82.8517,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:66.5792,x:57.8,y:49.4,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:86.4044,x:99.8,y:125.05}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:69.4447,x:99.15,y:128,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:0.6856,x:34.15,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.5409,x:-4.05,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:1.7174,x:-41.35,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.7,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-7.9061,y:-81.2,x:1.25,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-93.6199,x:-87.3,y:53.85,regX:44.6,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-55.8076,x:-89.6,y:140.25,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-85.6024,x:-89.65,y:140.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-68.9868,y:-12.4,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.95,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:84.227,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:67.1802,x:56.1,y:49.65,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:90.3814,x:97.35,y:125.45}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:72.91,x:96.5,y:128.6,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-0.2848,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.5988,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:2.1473,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.1643,y:-81.15,x:1.3,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-96.5417,x:-85.4,y:54.65,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-58.7294,x:-83.4,y:140.95,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9969,scaleY:0.9969,rotation:-88.5247,x:-83.6,y:140.8,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-70.4761,y:-12.55,x:-59.4,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-9.95,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:85.6024,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:67.7824,x:54.5,y:49.75,regX:-45.1,regY:12.7,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:94.3638,x:94.85,y:126.25}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:76.377,x:93.75,y:129.05,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-1.2588,x:34.2,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.6567,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:2.5774,x:-41.4,y:185.4,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.1}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.4212,y:-81.2,x:1.25,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-99.463,x:-83.75,y:55.3,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-61.6514,x:-77.35,y:141.5,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9969,scaleY:0.9969,rotation:-91.4411,x:-77.45,y:141.25,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-71.9662,y:-12.4,x:-59.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:86.9772,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:68.3835,x:52.75,y:49.95,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:98.3464,x:92.35,y:126.75}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:79.8427,x:91.05,y:129.65,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-2.2323,x:34.2,y:185.4,regY:-50.5,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.7137,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:3.0068,x:-41.4,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.679,y:-81.2,x:1.3,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-102.385,x:-82.05,y:55.85,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-64.5744,x:-71.1,y:141.75,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-94.3641,x:-71.35,y:141.6,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-73.4562,y:-12.45,x:-59.45,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:88.3528,x:48.05,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:68.986,x:51,y:50,regX:-45.2,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:102.3283,x:89.8,y:127.4}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:83.311,x:88.15,y:130,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-3.2074,x:34.15,y:185.5,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.7706,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.5,rotation:3.4363,x:-41.45,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.75,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-8.937,y:-81.2,x:1.3,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-105.3073,x:-80.3,y:56.55,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-67.4953,x:-65.05,y:141.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-97.2861,x:-65.2,y:141.4,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-74.9445,y:-12.35,x:-59.5,scaleX:0.9973,scaleY:0.9973}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:89.7274,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:69.5875,x:49.3,y:50.1,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:106.3111,x:87.25,y:127.75}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:86.7767,x:85.65,y:130.3,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-4.1807,x:34.2,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.8277,x:-4.15,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:3.8661,x:-41.45,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.8,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.1951,y:-81.25,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-108.2298,x:-78.5,y:56.95,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-70.4183,x:-58.95,y:141.25,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-100.2111,x:-59.1,y:141,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-76.4349,y:-12.35,x:-59.55,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.05,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:91.0984,x:48.2,y:-21.25,regY:13.2}},{t:this.instance_13,p:{rotation:70.1889,x:47.5,y:50.15,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:110.2925,x:84.75,y:128.2}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:90.2394,x:82.9,y:130.6,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-5.1554,x:34.2,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:10.8864,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:4.2961,x:-41.45,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.8,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.4528,y:-81.25,x:1.35,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-111.1526,x:-76.7,y:57.5,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-73.34,x:-52.9,y:140.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-103.1302,x:-53.05,y:140.45,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-77.9252,y:-12.35,x:-59.55,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.05,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:92.4734,x:48,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:70.7906,x:45.85,y:50.1,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:114.276,x:82.25,y:128.5}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:93.7056,x:80.2,y:130.8,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-6.1287,x:34.2,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.9421,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:4.7252,x:-41.4,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.8,y:88.15}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.7104,y:-81.3,x:1.4,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-114.0755,x:-74.85,y:57.95,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-76.2621,x:-46.7,y:139.8,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-106.0532,x:-47,y:139.6,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-79.4157,y:-12.35,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.05,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:93.8482,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:71.3923,x:44.1,y:50.05,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:118.2581,x:79.75,y:128.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:97.1721,x:77.35,y:130.95,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-7.103,x:34.2,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:10.9993,x:-4,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.1549,x:-41.4,y:185.35,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.8,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-9.968,y:-81.25,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-116.9968,x:-73.05,y:58.3,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-79.1847,x:-40.9,y:138.65,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-108.9755,x:-41.05,y:138.55,regY:-0.4}},{t:this.instance,p:{regX:33.6,regY:9.3,rotation:-80.9043,y:-12.5,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.1,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:95.2235,x:48.1,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:71.9931,x:42.45,y:49.95,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:122.2395,x:77.15,y:129.05}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:100.6387,x:74.7,y:131,regY:10.8,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-8.0759,x:34.2,y:185.55,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.0581,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.5,rotation:5.5847,x:-41.45,y:185.3,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-29.95}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.8,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-10.2262,y:-81.25,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-119.9191,x:-71.2,y:58.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-82.1065,x:-34.95,y:137.25,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.3,scaleX:0.9968,scaleY:0.9968,rotation:-111.8978,x:-35.1,y:137.1,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-82.3934,y:-12.3,x:-59.55,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.1,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:96.599,x:48.1,y:-21.25,regY:13.3}},{t:this.instance_13,p:{rotation:72.5954,x:40.75,y:49.8,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.2,scaleX:0.9971,scaleY:0.9971,rotation:126.2223,x:74.7,y:129.15}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:104.1054,x:72.15,y:131.1,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-9.0509,x:34.2,y:185.65,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.1144,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:6.0148,x:-41.5,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-10.4846,y:-81.35,x:1.4,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-122.8411,x:-69.3,y:58.9,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-85.0289,x:-29.1,y:135.6,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-114.8201,x:-29.35,y:135.35,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-83.8829,y:-12.35,x:-59.7,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.1,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:97.9742,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:73.1964,x:39.15,y:49.6,regX:-45.1,regY:12.7,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.997,scaleY:0.997,rotation:130.2047,x:72,y:129.45}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:107.5725,x:69.5,y:131.15,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-10.025,x:34.2,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.1715,x:-4.15,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:6.4434,x:-41.45,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-10.742,y:-81.35,x:1.4,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-125.7646,x:-67.55,y:59.2,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-87.9516,x:-23.35,y:133.7,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-117.743,x:-23.65,y:133.55,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-85.3728,y:-12.35,x:-59.65,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.15,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:99.3502,x:48.1,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:73.7987,x:37.35,y:49.35,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:134.1865,x:69.55,y:129.55}},{t:this.instance_11,p:{scaleX:0.9971,scaleY:0.9971,rotation:111.0382,x:66.85,y:130.95,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-10.9996,x:34.3,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.2295,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:6.8744,x:-41.55,y:185.45,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-10.9993,y:-81.35,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-128.6858,x:-65.65,y:59.3,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-90.8697,x:-17.65,y:131.55,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-120.6643,x:-18,y:131.35,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-86.8638,y:-12.35,x:-59.7,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.15,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:100.7258,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:74.4004,x:35.6,y:49.2,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7,scaleX:0.9971,scaleY:0.9971,rotation:138.1693,x:66.9,y:129.7}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:114.5046,x:64.2,y:131.05,regY:10.7,regX:-10.1}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-11.974,x:34.3,y:185.6,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.998,scaleY:0.998,rotation:11.2864,x:-4.1,y:-59.35,regX:-1.4}},{t:this.instance_8,p:{regY:-51.4,rotation:7.3039,x:-41.55,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-11.258,y:-81.35,x:1.45,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9972,scaleY:0.9972,rotation:-131.6081,x:-63.75,y:59.4,regX:44.5,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-93.7919,x:-12.3,y:129.15,regY:-9.1,regX:4.4}},{t:this.instance_1,p:{regX:14.5,scaleX:0.9968,scaleY:0.9968,rotation:-123.5869,x:-12.65,y:128.9,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-88.3536,y:-12.35,x:-59.75,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.15,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33.1,scaleX:0.9974,scaleY:0.9974,rotation:102.1,x:48.15,y:-21.4,regY:13.3}},{t:this.instance_13,p:{rotation:75.0023,x:33.95,y:48.8,regX:-45.1,regY:12.8,scaleX:0.9971,scaleY:0.9971}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:142.1525,x:64.5,y:129.6}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:117.9726,x:61.6,y:130.7,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-12.9478,x:34.3,y:185.65,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3446,x:-4.05,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:7.7339,x:-41.5,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.85,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-11.5156,y:-81.3,x:1.5,scaleX:0.9978,scaleY:0.9978,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-134.5307,x:-61.9,y:59.4,regX:44.6,regY:7.6}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-96.7134,x:-6.85,y:126.6,regY:-9,regX:4.4}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-126.5091,x:-7.3,y:126.4,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.4,rotation:-89.8422,y:-12.3,x:-59.6,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.2,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:103.4754,x:48.05,y:-21.3,regY:13.3}},{t:this.instance_13,p:{rotation:75.6031,x:32.3,y:48.45,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:146.1329,x:61.95,y:129.55}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:121.4375,x:59.05,y:130.5,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-13.9211,x:34.3,y:185.7,regY:-50.4,regX:3.4}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.3994,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:8.1633,x:-41.55,y:185.5,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.9,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-11.7739,y:-81.35,x:1.5,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-137.4534,x:-60.1,y:59.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-99.6357,x:-1.8,y:123.6,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-129.4307,x:-2.1,y:123.55,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-91.3281,y:-12.3,x:-59.75,scaleX:0.9974,scaleY:0.9974}}]},1).to({state:[{t:this.instance_15,p:{regX:-5,scaleX:0.9993,scaleY:0.9993,rotation:1.7167,x:-10.2,y:49,regY:-21.9}},{t:this.instance_14,p:{regX:-33,scaleX:0.9974,scaleY:0.9974,rotation:104.8505,x:48.2,y:-21.15,regY:13.2}},{t:this.instance_13,p:{rotation:76.2045,x:30.65,y:48.15,regX:-45.1,regY:12.8,scaleX:0.9972,scaleY:0.9972}},{t:this.instance_12,p:{regX:-7.1,scaleX:0.9971,scaleY:0.9971,rotation:150.1157,x:59.45,y:129.55}},{t:this.instance_11,p:{scaleX:0.997,scaleY:0.997,rotation:124.9037,x:56.45,y:130.15,regY:10.7,regX:-10.2}},{t:this.instance_10,p:{scaleX:0.9946,scaleY:0.9946,rotation:-14.8959,x:34.2,y:185.6,regY:-50.4,regX:3.3}},{t:this.instance_9,p:{scaleX:0.9979,scaleY:0.9979,rotation:11.4565,x:-3.95,y:-59.35,regX:-1.3}},{t:this.instance_8,p:{regY:-51.4,rotation:8.5932,x:-41.55,y:185.55,scaleX:0.9949,scaleY:0.9949}},{t:this.instance_7,p:{scaleX:0.9953,scaleY:0.9953,rotation:4.0088,y:90.35,x:-30}},{t:this.instance_6,p:{scaleX:0.9945,scaleY:0.9945,rotation:-9.1656,x:24.9,y:88.2}},{t:this.instance_5},{t:this.instance_4,p:{regY:50.4,rotation:-12.0297,y:-81.35,x:1.55,scaleX:0.9979,scaleY:0.9979,regX:2.1}},{t:this.instance_3,p:{scaleX:0.9971,scaleY:0.9971,rotation:-140.3744,x:-58.2,y:59.65,regX:44.5,regY:7.5}},{t:this.instance_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:-102.5568,x:3.25,y:120.6,regY:-9.1,regX:4.5}},{t:this.instance_1,p:{regX:14.4,scaleX:0.9968,scaleY:0.9968,rotation:-132.354,x:2.95,y:120.55,regY:-0.4}},{t:this.instance,p:{regX:33.5,regY:9.3,rotation:-92.8175,y:-12.2,x:-59.85,scaleX:0.9974,scaleY:0.9974}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-131.4,-212.2,278.70000000000005,509.7);


// stage content:
(lib.LessonChapter1_04 = function(mode,startPosition,loop,reversed) {
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
	this.streamSoundSymbolsList[0] = [{id:"beforewar2edit_04wav",startFrame:0,endFrame:192,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("beforewar2edit_04wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,192,1);
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
			document.location.replace("/LessonChapter1_05.html");
			}, 500);	
			
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("/LessonChapter1_03.html");
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
	this.instance = new lib.CachedBmp_1643();
	this.instance.setTransform(195.55,597,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1642();
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

	// interaction
	this.instance_2 = new lib.characterCivilian_09_button();
	this.instance_2.setTransform(411.75,425.95,0.8944,0.8943);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 1);

	this.instance_3 = new lib.camel_02_button();
	this.instance_3.setTransform(1052.6,262.95,0.7289,0.7287,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.instance_3, 0, 1, 1);

	this.instance_4 = new lib.camel_01_button();
	this.instance_4.setTransform(929.45,319.7,0.81,0.8097,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.instance_4, 0, 1, 1);

	this.instance_5 = new lib.camel_02_button();
	this.instance_5.setTransform(662.35,321.25,0.8998,0.8999);
	new cjs.ButtonHelper(this.instance_5, 0, 1, 1);

	this.instance_6 = new lib.camel_01_button();
	this.instance_6.setTransform(545.2,396.7);
	new cjs.ButtonHelper(this.instance_6, 0, 1, 1);

	this.instance_7 = new lib.ch1_uArm_rcopy2("synched",0);
	this.instance_7.setTransform(1004.75,247.95,0.2833,0.2833,0,85.9966,-94.0034,33.5,10.1);

	this.instance_8 = new lib.ch1_hand_rcopy2("synched",0);
	this.instance_8.setTransform(992.15,287.85,0.2831,0.2831,0,148.2375,-31.7625,14.6,-0.7);

	this.instance_9 = new lib.ch1_thumb_rcopy2("synched",0);
	this.instance_9.setTransform(992.05,287.95,0.2832,0.2832,0,147.3718,-32.6282,4.2,-9.4);

	this.instance_10 = new lib.ch1_lArm_rcopy2("synched",0);
	this.instance_10.setTransform(1007,268.4,0.2831,0.2831,0,132.5736,-47.4264,44.1,7.2);

	this.instance_11 = new lib.ch1_headcopy2_1("synched",0);
	this.instance_11.setTransform(989.65,228.35,0.2835,0.2835,0,3.8645,-176.1355,1.3,51.4);

	this.instance_12 = new lib.ch1_uBodycopy2("synched",0);
	this.instance_12.setTransform(990,241.2,0.284,0.284,0,0,180,0,-39.5);

	this.instance_13 = new lib.ch1_uLeg_lcopy2("synched",0);
	this.instance_13.setTransform(981.05,276.5,0.2825,0.2825,0,8.9382,-171.0618,0.1,4.9);

	this.instance_14 = new lib.ch1_uLeg_rcopy2("synched",0);
	this.instance_14.setTransform(996.55,277.3,0.2827,0.2827,0,-3.8964,176.1036,1.4,-41.4);

	this.instance_15 = new lib.ch1_lLeg_rcopy2("synched",0);
	this.instance_15.setTransform(999.9,304.25,0.2825,0.2825,0,-15.6772,164.3228,0.8,-51.1);

	this.instance_16 = new lib.ch1_neckcopy2("synched",0);
	this.instance_16.setTransform(989.25,234.55,0.2835,0.2835,0,6.7605,-173.2395,-1.7,7.8);

	this.instance_17 = new lib.ch1_lLeg_lcopy2("synched",0);
	this.instance_17.setTransform(978.4,304.1,0.2825,0.2825,0,13.5866,-166.4134,3.2,-50.4);

	this.instance_18 = new lib.ch1_hand_lcopy2("synched",0);
	this.instance_18.setTransform(981.75,290.35,0.2831,0.2831,0,-64.352,115.648,-10,11.1);

	this.instance_19 = new lib.ch1_thumb_lcopy2("synched",0);
	this.instance_19.setTransform(981.6,289.5,0.2832,0.2832,0,-85.7138,94.2862,-7.2,13.8);

	this.instance_20 = new lib.ch1_lArm_lcopy2("synched",0);
	this.instance_20.setTransform(977.15,265.25,0.2832,0.2832,0,-105.7893,74.2107,-45.4,12.7);

	this.instance_21 = new lib.ch1_uArm_lcopy2("synched",0);
	this.instance_21.setTransform(974.25,245.4,0.2833,0.2833,0,-98.8022,81.1978,-32.2,13.6);

	this.instance_22 = new lib.ch1_lBodycopy2("synched",0);
	this.instance_22.setTransform(990.75,265.4,0.2839,0.2839,0,-1.7435,178.2565,-4.5,-21.7);

	this.instance_23 = new lib.camel_01_button();
	this.instance_23.setTransform(1190.9,236.05,0.6559,0.6558,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.instance_23, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]},191).wait(1));

	// people
	this.instance_24 = new lib.CharacterCivilian_09();
	this.instance_24.setTransform(668.1,378.4,0.3951,0.3951,0,0,180,-5,40.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).to({x:408.2,y:442.7},190).to({_off:true},1).wait(1));

	// Camel
	this.instance_25 = new lib.camel_02();
	this.instance_25.setTransform(1266.2,221.1,0.7289,0.7287,0,0,0,-7.4,19.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).to({x:1047.7,y:266.8},190).to({_off:true},1).wait(1));

	// Layer_5
	this.instance_26 = new lib.camel_01();
	this.instance_26.setTransform(1360.4,160.65,0.656,0.6559,0,0,0,0.2,0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).to({x:1135.8,y:201},190).to({_off:true},1).wait(1));

	// Layer_3
	this.instance_27 = new lib.camel_01();
	this.instance_27.setTransform(1079.8,230.6,0.8101,0.8099,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).to({x:861.3,y:276.3},190).to({_off:true},1).wait(1));

	// people2
	this.instance_28 = new lib.CharacterCivilian_07();
	this.instance_28.setTransform(1215.8,204.5,0.2841,0.2842,0,0,180,-4.6,42.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).to({x:989.25,y:263.45},190).to({_off:true},1).wait(1));

	// Layer_2
	this.instance_29 = new lib.camel_02();
	this.instance_29.setTransform(874.85,280.25,0.9001,0.8999,0,0,0,-7.5,19.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).to({x:656.35,y:325.95},190).to({_off:true},1).wait(1));

	// Layer_1
	this.instance_30 = new lib.camel_01();
	this.instance_30.setTransform(679.55,297.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).to({x:461.05,y:343.1},190).to({_off:true},1).wait(1));

	// Background
	this.instance_31 = new lib.Chap1Scene4();

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(192));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(515.3,267.8,906.6000000000001,572.2);
// library properties:
lib.properties = {
	id: 'A6F1A483617F544186FFC32FE4892FD2',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/LessonChapter1_04_atlas_1.png", id:"LessonChapter1_04_atlas_1"},
		{src:"sounds/beforewar2edit_04wav.mp3", id:"beforewar2edit_04wav"},
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